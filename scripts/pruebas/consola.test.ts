/**
 * Q-06 (L1 y L2 de P-07): lo que la landing manda a la consola de altas.
 * Contrato: `pedily-consola` en `main`, `lib/solicitudes/esquema.ts` (plan y
 * periodicidad opcionales) y `lib/web.ts` `ipParaLimite` (portador
 * `CONSOLA_TOKEN_LANDING` + `x-pedily-ip-cliente`).
 */
import { afterEach, test } from "node:test";
import assert from "node:assert/strict";
import { cuerpoParaConsola, enviarAConsola, ipDelVisitante } from "@/lib/consola";
import type { Solicitud } from "@/lib/solicitud";

const SOLICITUD: Solicitud = {
  modo: "tienda",
  negocio: "Chifa de Prueba",
  nombre: "Ana Prueba",
  email: "ana@example.com",
  whatsapp: "900000001",
  distrito: "Miraflores",
  canalHoy: "whatsapp",
  prioridad: "web-sin-comision",
  cuando: "este-mes",
  mensaje: "",
  plan: "completo",
  periodicidad: "anual",
};

const fetchOriginal = globalThis.fetch;
const tokenOriginal = process.env.CONSOLA_TOKEN_LANDING;
afterEach(() => {
  globalThis.fetch = fetchOriginal;
  if (tokenOriginal === undefined) delete process.env.CONSOLA_TOKEN_LANDING;
  else process.env.CONSOLA_TOKEN_LANDING = tokenOriginal;
});

interface Llamada {
  url: string;
  headers: Headers;
  cuerpo: Record<string, unknown>;
}

function capturarFetch(status = 201): Llamada[] {
  const llamadas: Llamada[] = [];
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    llamadas.push({ url, headers: new Headers(init.headers), cuerpo: JSON.parse(String(init.body)) });
    return new Response("{}", { status });
  }) as typeof fetch;
  return llamadas;
}

test("el cuerpo lleva el plan y la periodicidad", () => {
  const c = cuerpoParaConsola(SOLICITUD, new Date("2026-11-17T15:00:00.000Z"));
  assert.equal(c.plan, "completo");
  assert.equal(c.periodicidad, "anual");
  assert.equal(c.origen, "landing");
  assert.equal(c.whatsapp, "+51900000001");
  assert.equal(c.enviadaEn, "2026-11-17T15:00:00.000Z");
  assert.deepEqual(c.respuestas, { canalHoy: "whatsapp", prioridad: "web-sin-comision", cuando: "este-mes" });
});

test("sin plan elegido no se manda la clave plan (la consola sugiere uno)", () => {
  const c = cuerpoParaConsola({ ...SOLICITUD, plan: null, periodicidad: "mensual" }, new Date());
  assert.equal("plan" in c, false);
  assert.equal(c.periodicidad, "mensual");
});

test("con CONSOLA_TOKEN_LANDING manda el portador y la IP del visitante", async () => {
  process.env.CONSOLA_TOKEN_LANDING = "  token-de-prueba  ";
  const llamadas = capturarFetch();
  const ok = await enviarAConsola("https://consola.example.com/api/solicitudes", SOLICITUD, "203.0.113.7");
  assert.equal(ok, true);
  assert.equal(llamadas.length, 1);
  assert.equal(llamadas[0].headers.get("authorization"), "Bearer token-de-prueba");
  assert.equal(llamadas[0].headers.get("x-pedily-ip-cliente"), "203.0.113.7");
  assert.equal(llamadas[0].headers.get("content-type"), "application/json");
  assert.equal(llamadas[0].cuerpo.plan, "completo");
  assert.equal(llamadas[0].cuerpo.periodicidad, "anual");
});

test("con token y sin IP conocida no inventa la cabecera (la consola cuenta por correo)", async () => {
  process.env.CONSOLA_TOKEN_LANDING = "token-de-prueba";
  const llamadas = capturarFetch();
  await enviarAConsola("https://consola.example.com/api/solicitudes", SOLICITUD, null);
  assert.equal(llamadas[0].headers.get("authorization"), "Bearer token-de-prueba");
  assert.equal(llamadas[0].headers.has("x-pedily-ip-cliente"), false);
});

test("sin token no manda portador ni IP", async () => {
  delete process.env.CONSOLA_TOKEN_LANDING;
  const llamadas = capturarFetch();
  await enviarAConsola("https://consola.example.com/api/solicitudes", SOLICITUD, "203.0.113.7");
  assert.equal(llamadas[0].headers.has("authorization"), false);
  assert.equal(llamadas[0].headers.has("x-pedily-ip-cliente"), false);
});

test("respuesta no 2xx → false", async () => {
  capturarFetch(429);
  assert.equal(await enviarAConsola("https://consola.example.com/api/solicitudes", SOLICITUD, null), false);
});

test("ipDelVisitante: la de Vercel primero, la primera de la lista, y nada raro", () => {
  assert.equal(
    ipDelVisitante(new Headers({ "x-vercel-forwarded-for": "203.0.113.7", "x-forwarded-for": "198.51.100.1" })),
    "203.0.113.7"
  );
  assert.equal(ipDelVisitante(new Headers({ "x-forwarded-for": "198.51.100.4, 10.0.0.1" })), "198.51.100.4");
  assert.equal(ipDelVisitante(new Headers({ "x-real-ip": "2001:db8::1" })), "2001:db8::1");
  assert.equal(ipDelVisitante(new Headers({ "x-forwarded-for": "<script>" })), null);
  assert.equal(ipDelVisitante(new Headers()), null);
});
