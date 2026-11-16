"use client";

import { useId, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Bloque } from "@/components/layout/Bloque";
import { Encabezado } from "@/components/ui/Encabezado";
import {
  CULQI_FIJO_USD,
  CULQI_PORCENTAJE,
  PLANES,
  SOLES_POR_DOLAR,
  soles,
} from "@/lib/planes";

// Supuestos editables por defecto (no son datos de ningún restaurante).
const SUPUESTOS = { ticket: 60, pedidos: 100, comision: 30 };

function Campo({
  etiqueta,
  valor,
  onChange,
  min,
  max,
  paso,
  sufijo,
}: {
  etiqueta: string;
  valor: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  paso: number;
  sufijo: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-semibold text-sand-800">
        {etiqueta}
        <span className="text-base text-primary-700">
          {sufijo === "S/" ? `S/ ${valor}` : `${valor} ${sufijo}`}
        </span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={paso}
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-primary-600"
      />
    </div>
  );
}

export function Calculadora() {
  const [ticket, setTicket] = useState(SUPUESTOS.ticket);
  const [pedidos, setPedidos] = useState(SUPUESTOS.pedidos);
  const [comision, setComision] = useState(SUPUESTOS.comision);
  const [planId, setPlanId] = useState<(typeof PLANES)[number]["id"]>("whatsapp");
  const plan = PLANES.find((p) => p.id === planId)!;

  const ventas = ticket * pedidos;
  const comisionApps = ventas * (comision / 100);
  const culqi = ventas * (CULQI_PORCENTAJE / 100) + pedidos * CULQI_FIJO_USD * SOLES_POR_DOLAR;
  const conPedily = plan.precioMensual + culqi;
  const diferencia = comisionApps - conPedily;

  return (
    <Bloque id="calculadora" className="bg-sand-50">
      <Container className="max-w-3xl">
        <Encabezado
          etiqueta="Haz tu cuenta"
          titulo="¿Cuánto te queda si el pedido llega directo?"
          bajada="Pon los números de tu restaurante. Los de partida son supuestos, no datos de nadie."
        />
        <div className="mt-5 rounded-2xl bg-white p-4 shadow-card sm:p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Campo etiqueta="Ticket promedio" valor={ticket} onChange={setTicket} min={20} max={200} paso={5} sufijo="S/" />
            <Campo etiqueta="Pedidos al mes" valor={pedidos} onChange={setPedidos} min={10} max={1500} paso={10} sufijo="pedidos" />
            <Campo etiqueta="Comisión de la app" valor={comision} onChange={setComision} min={5} max={35} paso={1} sufijo="%" />
          </div>

          <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Plan para comparar">
            {PLANES.map((p) => (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={planId === p.id}
                onClick={() => setPlanId(p.id)}
                className={
                  planId === p.id
                    ? "rounded-full bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white"
                    : "rounded-full border border-sand-300 px-3 py-1.5 text-xs font-semibold text-sand-700"
                }
              >
                {p.nombre} · {soles(p.precioMensual)}
              </button>
            ))}
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-2 text-sm sm:gap-3">
            <div className="rounded-xl bg-accent-50 p-3 sm:p-4">
              <dt className="text-xs text-sand-600 sm:text-sm">Comisión de la app</dt>
              <dd className="mt-1 text-xl font-extrabold text-accent-700 sm:text-2xl">{soles(comisionApps)}<span className="text-sm font-semibold"> /mes</span></dd>
            </div>
            <div className="rounded-xl bg-primary-50 p-3 sm:p-4">
              <dt className="text-xs text-sand-600 sm:text-sm">Pedily ({plan.nombre}) + Culqi</dt>
              <dd className="mt-1 text-xl font-extrabold text-primary-700 sm:text-2xl">{soles(conPedily)}<span className="text-sm font-semibold"> /mes</span></dd>
            </div>
          </dl>
          <p className="mt-3 text-center text-base font-semibold text-sand-900" aria-live="polite">
            {diferencia > 0
              ? `Te quedarían unos ${soles(diferencia)} más al mes.`
              : "Con estos números, el plan cuesta más que la comisión. Prueba con tus pedidos reales."}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-sand-500">
            Estimación, no promesa de ventas. Culqi{" "}
            {String(CULQI_PORCENTAJE).replace(".", ",")} % + US$ 0,20 por venta
            (S/ {String(SOLES_POR_DOLAR).replace(".", ",")} por dólar), todo con
            tarjeta o Yape. Sin Nubefact ni mensajes de Meta sobre los gratuitos.
          </p>
        </div>
        <p className="mt-4 text-center text-sm text-sand-600">
          Más cuentas, gratis y con fuentes oficiales:{" "}
          <a href="/herramientas/calculadora-comision-delivery" className="font-semibold text-primary-700 underline underline-offset-2">comisión de apps</a>
          {" · "}
          <a href="/herramientas/calculadora-igv-restaurantes" className="font-semibold text-primary-700 underline underline-offset-2">IGV 2027 de restaurantes</a>
          {" · "}
          <a href="/herramientas/costo-mensajes-whatsapp" className="font-semibold text-primary-700 underline underline-offset-2">mensajes de WhatsApp</a>
        </p>
      </Container>
    </Bloque>
  );
}
