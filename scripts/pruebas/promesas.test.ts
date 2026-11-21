/**
 * Q-06: las 9 filas que P-07 encontró desfasadas frente a `main` de los repos
 * (pedily/_notas/plan/wip/P-07-informe.md, §1 bis «Filas de PROMESAS para
 * corregir»). Si alguien vuelve a escribir el estado viejo, falla.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { INTEGRACIONES } from "@/lib/integraciones";

interface Fila {
  estado: string;
  tarea: string;
}

const filas = new Map<number, Fila>();
for (const linea of readFileSync(new URL("../../docs/PROMESAS.md", import.meta.url), "utf8").split("\n")) {
  const m = /^\| *(\d+) *\|/.exec(linea);
  if (!m) continue;
  const celdas = linea.split("|").map((c) => c.trim());
  filas.set(Number(m[1]), { estado: celdas[4], tarea: celdas[5] });
}

function fila(n: number): Fila {
  const f = filas.get(n);
  assert.ok(f, `falta la fila ${n}`);
  return f;
}

const evidencia = (id: string) => {
  const i = INTEGRACIONES.find((x) => x.id === id);
  assert.ok(i, `falta la integración ${id}`);
  return i.evidencia.join(" ");
};

test("38: la landing manda plan, periodicidad, token e IP a la consola", () => {
  const t = fila(38).tarea;
  for (const s of ["plan", "periodicidad", "CONSOLA_TOKEN_LANDING", "x-pedily-ip-cliente"]) assert.match(t, new RegExp(s));
});

test("46: topes 10/30 y modo simulado de la lectura de carta", () => {
  const t = fila(46).tarea;
  assert.match(t, /CARTA_IA_MODO/);
  assert.match(t, /10 al día/);
  assert.match(t, /30 en el alta/);
});

test("48 y 98: el límite por plan es técnico (R-01) y cita el código", () => {
  for (const n of [48, 98]) {
    assert.match(fila(n).tarea, /Límite técnico \(R-01\)|límite técnico \(R-01\)/);
    assert.doesNotMatch(fila(n).tarea, /límite comercial/i);
    assert.match(fila(n).tarea, /B:src\/plan\/plan-matriz\.ts:\d+/);
  }
  assert.match(fila(48).tarea, /kiosko-licencia\.service\.ts/);
  assert.match(fila(98).tarea, /PLAN_NO_INCLUYE/);
});

test("53: el plan llega a la instalación → Existe", () => {
  assert.equal(fila(53).estado, "Existe");
  assert.match(fila(53).tarea, /consola\/plan/);
});

test("58: la exportación al irte ya existe en la consola y el backend", () => {
  assert.notEqual(fila(58).estado, "Por construir");
  assert.match(fila(58).tarea, /consola\/exportacion/);
});

test("69: cita la consola (credenciales del almacén de la instalación)", () => {
  assert.match(fila(69).tarea, /pedily-consola/);
});

test("88: Izipay ya está en el checkout web (J-03)", () => {
  assert.doesNotMatch(fila(88).tarea, /Falta conectarlo al checkout/);
  assert.match(fila(88).tarea, /PaymentForm\.tsx/);
});

test("96: Purchase también en QR/Yape/Plin verificados y cobros manuales (J-04)", () => {
  assert.doesNotMatch(fila(96).tarea, /POR COMPROBAR: solo el webhook de Culqi/);
  assert.match(fila(96).tarea, /reportarCompraVerificada/);
});

test("integraciones.ts izipay: evidencia del checkout web, no «J-03 Parcial»", () => {
  const e = evidencia("izipay");
  assert.doesNotMatch(e, /ficha J-03 \(PROMESAS fila 88, Parcial\)/);
  assert.match(e, /W:components\/features\/checkout\/PaymentForm\/PaymentForm\.tsx/);
});
