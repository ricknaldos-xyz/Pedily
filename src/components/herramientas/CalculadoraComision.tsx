"use client";

import { useState } from "react";
import { CampoNumero, Resultado, Tarjeta } from "./campos";
import {
  CULQI_FIJO_USD,
  CULQI_PORCENTAJE,
  PLANES,
  SOLES_POR_DOLAR,
  soles,
} from "@/lib/planes";

const IGV_COMISION = 18;

/** Cálculo puro (exportado para poder probarlo y reutilizarlo). */
export function calcularComision(e: {
  pedidos: number;
  ticket: number;
  comision: number;
  conIgv: boolean;
  porcentajePropio: number;
  cuotaPlan: number;
}) {
  const comisionPorPedido =
    e.ticket * (e.comision / 100) * (e.conIgv ? 1 + IGV_COMISION / 100 : 1);
  const comisionMes = comisionPorPedido * e.pedidos;
  const culqiPorPedido =
    e.ticket * (CULQI_PORCENTAJE / 100) + CULQI_FIJO_USD * SOLES_POR_DOLAR;
  const pedidosPropios = Math.round((e.pedidos * e.porcentajePropio) / 100);
  const ahorroBruto = pedidosPropios * (comisionPorPedido - culqiPorPedido);
  const ahorroNeto = ahorroBruto - e.cuotaPlan;
  const margenPorPedido = comisionPorPedido - culqiPorPedido;
  const equilibrio = margenPorPedido > 0 ? Math.ceil(e.cuotaPlan / margenPorPedido) : null;
  return {
    comisionPorPedido,
    comisionMes,
    comisionAnio: comisionMes * 12,
    culqiPorPedido,
    pedidosPropios,
    ahorroNeto,
    equilibrio,
  };
}

export function CalculadoraComision() {
  const [pedidos, setPedidos] = useState(300);
  const [ticket, setTicket] = useState(45);
  const [comision, setComision] = useState(25);
  const [conIgv, setConIgv] = useState(true);
  const [porcentajePropio, setPorcentajePropio] = useState(30);
  const [planId, setPlanId] = useState<(typeof PLANES)[number]["id"]>("tienda");
  const plan = PLANES.find((p) => p.id === planId)!;

  const r = calcularComision({
    pedidos,
    ticket,
    comision,
    conIgv,
    porcentajePropio,
    cuotaPlan: plan.precioMensual,
  });

  return (
    <Tarjeta>
      <div className="grid gap-4 sm:grid-cols-2">
        <CampoNumero etiqueta="Pedidos por apps al mes" valor={pedidos} onChange={setPedidos} sufijo="pedidos" max={100000} />
        <CampoNumero etiqueta="Ticket promedio" valor={ticket} onChange={setTicket} prefijo="S/" max={10000} />
        <CampoNumero
          etiqueta="Comisión de la app"
          ayuda="Pon la de tu contrato o tu liquidación. La de partida es un supuesto."
          valor={comision}
          onChange={setComision}
          sufijo="%"
          max={100}
          paso={0.5}
        />
        <CampoNumero
          etiqueta="Pedidos que podrías pasar a tu canal propio"
          ayuda="Clientes que ya te conocen y pedirían por tu web o tu WhatsApp."
          valor={porcentajePropio}
          onChange={setPorcentajePropio}
          sufijo="%"
          max={100}
        />
      </div>

      <label className="mt-4 flex items-start gap-2 text-sm text-sand-700">
        <input
          type="checkbox"
          checked={conIgv}
          onChange={(e) => setConIgv(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-chicha-600"
        />
        La comisión me la facturan con IGV aparte (18 %)
      </label>

      <fieldset className="mt-4">
        <legend className="text-sm font-semibold text-tinta">Canal propio con</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {PLANES.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={planId === p.id}
              onClick={() => setPlanId(p.id)}
              className={
                planId === p.id
                  ? "min-h-10 rounded-full border-2 border-tinta bg-aji-500 px-3.5 py-1.5 text-xs font-semibold text-tinta"
                  : "min-h-10 rounded-full border-2 border-tinta/15 px-3.5 py-1.5 text-xs font-semibold text-sand-700 hover:border-tinta/40"
              }
            >
              Pedily {p.nombre} · {soles(p.precioMensual)}
            </button>
          ))}
        </div>
      </fieldset>

      <dl className="mt-5 grid grid-cols-2 gap-2 sm:gap-3" aria-live="polite">
        <Resultado
          etiqueta="Comisión al mes"
          valor={soles(r.comisionMes)}
          tono="malo"
          detalle={`${soles(r.comisionPorPedido, 2)} por pedido`}
        />
        <Resultado etiqueta="Comisión al año" valor={soles(r.comisionAnio)} tono="malo" />
        <Resultado
          etiqueta={`Te quedarían al mes con ${r.pedidosPropios} pedidos propios`}
          valor={soles(r.ahorroNeto)}
          tono={r.ahorroNeto > 0 ? "bueno" : "neutro"}
          detalle={`Ya restados Culqi (${soles(r.culqiPorPedido, 2)} por pedido) y el plan`}
        />
        <Resultado
          etiqueta="Pedidos propios al mes que pagan el plan"
          valor={r.equilibrio === null ? "—" : String(r.equilibrio)}
          tono="neutro"
          detalle={
            r.equilibrio === null
              ? "Con estos números, la comisión por pedido es menor que Culqi."
              : "Desde ahí, cada pedido propio es ahorro."
          }
        />
      </dl>
    </Tarjeta>
  );
}
