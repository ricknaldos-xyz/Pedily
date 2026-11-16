"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Encabezado } from "@/components/ui/Encabezado";
import { ArrowRight, Check, Info } from "lucide-react";
import { FUNDADORES } from "@/lib/site";
import {
  altaProporcional,
  COSTOS_APARTE,
  EJEMPLO_ALTA,
  MESES_PAGADOS_ANUAL,
  MESES_PERMANENCIA_ALTA_GRATIS,
  PLANES,
  precioAnual,
  soles,
} from "@/lib/planes";

interface Props {
  /** En /precios el título va en la cabecera de la página. */
  sinTitulo?: boolean;
  /** En /precios el alta y los costos aparte tienen su propia sección. */
  soloPlanes?: boolean;
}

export function PricingTable({ sinTitulo = false, soloPlanes = false }: Props) {
  const [anual, setAnual] = useState(false);
  // En móvil la lista de cada plan se abre a pedido; en escritorio siempre se ve.
  const [abiertos, setAbiertos] = useState<Record<string, boolean>>({});

  return (
    <section id="precios" className="scroll-mt-16 bg-papel py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!sinTitulo && (
          <Encabezado
            centrado
            etiqueta="Precios"
            titulo="Precios claros, con IGV. 0 % de comisión."
            bajada="Cuota fija al mes. Ni tu restaurante ni tus clientes pagan comisión por pedido."
          />
        )}

        <div className="mt-8 flex justify-center">
          <div
            role="radiogroup"
            aria-label="Forma de pago"
            className="inline-flex rounded-full border-2 border-tinta/10 bg-white p-1 text-sm font-semibold"
          >
            {[
              { valor: false, texto: "Mensual" },
              { valor: true, texto: "Anual · 2 meses gratis" },
            ].map((op) => (
              <button
                key={op.texto}
                type="button"
                role="radio"
                aria-checked={anual === op.valor}
                onClick={() => setAnual(op.valor)}
                className={clsx(
                  "min-h-10 rounded-full px-4 py-2 transition-colors",
                  anual === op.valor ? "bg-tinta text-white" : "text-sand-700 hover:text-tinta",
                )}
              >
                {op.texto}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-6xl gap-5 lg:grid-cols-3">
          {PLANES.map((plan) => (
            <div key={plan.id}>
              <div
                className={clsx(
                  "relative flex h-full flex-col rounded-2xl bg-white p-5 sm:p-6",
                  plan.destacado ? "border-2 border-tinta shadow-[0_8px_0_0_#24102e]" : "border border-tinta/10",
                )}
              >
                {plan.destacado && (
                  <span className="absolute -top-3.5 left-6 rounded-full border-2 border-tinta bg-aji-500 px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-tinta">
                    Con asistente de WhatsApp
                  </span>
                )}
                <h3 className="font-display text-xl font-bold text-tinta">{plan.nombre}</h3>
                <p className="mt-0.5 text-sm text-sand-700">{plan.paraQuien}</p>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-extrabold tracking-tight text-tinta">
                    {soles(anual ? precioAnual(plan) : plan.precioMensual)}
                  </span>
                  <span className="text-sm text-sand-700">{anual ? "al año" : "al mes"}</span>
                </p>
                <p className="mt-1 text-xs text-sand-700">
                  {anual ? `Pagas ${MESES_PAGADOS_ANUAL} meses y usas 12. IGV incluido.` : "IGV incluido."}
                </p>
                <p className="mt-1 font-mono text-[11px] text-humo">
                  Alta {soles(plan.alta)} · gratis si te quedas {MESES_PERMANENCIA_ALTA_GRATIS} meses
                </p>
                <button
                  type="button"
                  aria-expanded={Boolean(abiertos[plan.id])}
                  onClick={() => setAbiertos((a) => ({ ...a, [plan.id]: !a[plan.id] }))}
                  className="mt-3 min-h-10 self-start text-sm font-semibold text-chicha-700 underline underline-offset-2 lg:hidden"
                >
                  {abiertos[plan.id] ? "Ocultar lo que incluye" : "Ver lo que incluye"}
                </button>
                <ul className={clsx("mt-3 flex-1 space-y-2 lg:mt-5 lg:block", abiertos[plan.id] ? "block" : "hidden")}>
                  {plan.incluye.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-sand-700">
                      <Check aria-hidden className="mt-0.5 h-4 w-4 flex-shrink-0 text-hierba-600" />
                      {item}
                    </li>
                  ))}
                  {!plan.conBot && (
                    <li className="flex items-start gap-2.5 text-sm text-humo">
                      <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      Sin asistente de WhatsApp
                    </li>
                  )}
                </ul>
                <a
                  href="/contacto"
                  className={clsx(
                    "mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 px-5 text-[0.95rem] font-semibold transition-all",
                    plan.destacado
                      ? "border-tinta bg-aji-500 text-tinta hover:-translate-y-0.5"
                      : "border-tinta/15 text-tinta hover:border-tinta/40",
                  )}
                >
                  Crear mi tienda <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {!soloPlanes && (
          <>
            <div
              id="alta"
              className="mx-auto mt-10 max-w-3xl scroll-mt-20 text-center text-[0.95rem] leading-relaxed text-sand-700"
            >
              <p>
                <strong className="text-tinta">Alta gratis</strong> si te quedas {MESES_PERMANENCIA_ALTA_GRATIS} meses.
                Si te vas antes, pagas solo la parte de los meses que faltan: alta × (meses que faltan ÷{" "}
                {MESES_PERMANENCIA_ALTA_GRATIS}). Ejemplo: {EJEMPLO_ALTA.plan}, te vas tras {EJEMPLO_ALTA.mesesPagados}{" "}
                meses → {soles(EJEMPLO_ALTA.alta)} × {MESES_PERMANENCIA_ALTA_GRATIS - EJEMPLO_ALTA.mesesPagados}/
                {MESES_PERMANENCIA_ALTA_GRATIS} ={" "}
                <strong className="text-tinta">
                  {soles(altaProporcional(EJEMPLO_ALTA.alta, EJEMPLO_ALTA.mesesPagados))}
                </strong>
                .
              </p>
              {FUNDADORES.activo && (
                <p className="mt-1.5">
                  <strong className="text-tinta">Fundadores</strong> (los primeros {FUNDADORES.cupos}): alta gratis sin
                  permanencia y precio congelado {FUNDADORES.mesesPrecioCongelado} meses.
                </p>
              )}
            </div>

            <div>
              <div
                id="pagas-aparte"
                className="mx-auto mt-6 max-w-6xl rounded-2xl border border-dashed border-tinta/25 bg-white p-4 sm:p-6"
              >
                <h3 className="font-display text-lg font-bold text-tinta">
                  Lo que pagas aparte, directo a cada proveedor
                </h3>
                <p className="mt-1 text-sm text-sand-700">
                  Pedily nunca toca tu dinero. Precios públicos a noviembre de 2026:
                </p>
                <ul className="mt-3 divide-y divide-dashed divide-tinta/15 sm:grid sm:grid-cols-3 sm:gap-3 sm:divide-y-0">
                  {COSTOS_APARTE.map((c) => (
                    <li key={c.proveedor} className="py-2.5 text-sm sm:rounded-xl sm:bg-papel sm:p-4">
                      <p>
                        <strong className="text-tinta">{c.proveedor}:</strong>{" "}
                        <span className="font-mono text-[13px] font-semibold text-tinta">{c.precio}</span>
                      </p>
                      <p className="mt-0.5 text-xs text-sand-700">
                        {c.que} ·{" "}
                        <a
                          href={c.fuente}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-chicha-700 underline"
                        >
                          ver su tarifa
                        </a>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
