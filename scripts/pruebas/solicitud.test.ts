/**
 * Q-06 (L1 de P-07): la solicitud lleva el plan y la periodicidad que eligió
 * el restaurante, para que la consola no tenga que adivinarlos.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { enlaceSolicitud, planDesdeUrl, validarSolicitud } from "@/lib/solicitud";

const BASE = {
  modo: "tienda",
  negocio: "Chifa de Prueba",
  nombre: "Ana Prueba",
  email: "ana@example.com",
  whatsapp: "900 000 001",
  distrito: "Miraflores",
  canalHoy: "whatsapp",
  prioridad: "web-sin-comision",
  cuando: "este-mes",
  mensaje: "",
};

test("guarda el plan y la periodicidad elegidos", () => {
  const r = validarSolicitud({ ...BASE, plan: "completo", periodicidad: "anual" });
  assert.ok(r.ok);
  assert.equal(r.datos.plan, "completo");
  assert.equal(r.datos.periodicidad, "anual");
});

test("sin plan: plan null y periodicidad mensual", () => {
  const r = validarSolicitud(BASE);
  assert.ok(r.ok);
  assert.equal(r.datos.plan, null);
  assert.equal(r.datos.periodicidad, "mensual");
});

test("un plan desconocido no se inventa", () => {
  const r = validarSolicitud({ ...BASE, plan: "oro", periodicidad: "semanal" });
  assert.ok(r.ok);
  assert.equal(r.datos.plan, null);
  assert.equal(r.datos.periodicidad, "mensual");
});

test("planDesdeUrl lee ?plan= y ?periodicidad= de /contacto", () => {
  assert.deepEqual(planDesdeUrl("?plan=whatsapp&periodicidad=anual"), { plan: "whatsapp", periodicidad: "anual" });
  assert.deepEqual(planDesdeUrl("?plan=tienda"), { plan: "tienda", periodicidad: "mensual" });
  assert.deepEqual(planDesdeUrl("?plan=<x>&periodicidad=1"), { plan: null, periodicidad: "mensual" });
  assert.deepEqual(planDesdeUrl(""), { plan: null, periodicidad: "mensual" });
});

test("enlaceSolicitud arma el enlace de «Crear mi tienda» de cada plan", () => {
  assert.equal(enlaceSolicitud("completo", true), "/contacto?plan=completo&periodicidad=anual");
  assert.equal(enlaceSolicitud("tienda", false), "/contacto?plan=tienda&periodicidad=mensual");
  // Lo que arma uno lo lee el otro.
  assert.deepEqual(planDesdeUrl(enlaceSolicitud("whatsapp", true).split("?")[1]), { plan: "whatsapp", periodicidad: "anual" });
});
