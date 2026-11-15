"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Container } from "@/components/layout/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowRight, Check, Info } from "lucide-react";
import {
  COSTOS_APARTE,
  MESES_PAGADOS_ANUAL,
  MESES_PERMANENCIA_ALTA_GRATIS,
  PLANES,
  precioAnual,
  soles,
} from "@/lib/planes";

interface Props {
  /** En /precios el título va en la cabecera de la página. */
  sinTitulo?: boolean;
}

export function PricingTable({ sinTitulo = false }: Props) {
  const [anual, setAnual] = useState(false);

  return (
    <section id="precios" className="scroll-mt-16 bg-white py-14 sm:py-20">
      <Container>
        {!sinTitulo && (
          <AnimatedSection className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-sand-900 sm:text-4xl">
              Precios claros, con IGV. 0 % de comisión.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-sand-500 sm:text-lg">
              Una cuota fija al mes. Ni el restaurante ni el comensal pagan
              comisión por pedido.
            </p>
          </AnimatedSection>
        )}

        <div className="mt-8 flex justify-center">
          <div
            role="radiogroup"
            aria-label="Forma de pago"
            className="inline-flex rounded-full border border-sand-200 bg-sand-50 p-1 text-sm font-semibold"
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
                  "rounded-full px-4 py-2 transition-colors",
                  anual === op.valor
                    ? "bg-primary-600 text-white shadow-sm"
                    : "text-sand-600 hover:text-sand-900"
                )}
              >
                {op.texto}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 lg:grid-cols-3">
          {PLANES.map((plan, i) => (
            <AnimatedSection key={plan.id} delay={i * 0.06}>
              <div
                className={clsx(
                  "relative flex h-full flex-col rounded-2xl border bg-white p-6",
                  plan.destacado
                    ? "border-2 border-primary-500 shadow-lg shadow-primary-500/10"
                    : "border-sand-200"
                )}
              >
                {plan.destacado && (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white">
                    Con asistente de WhatsApp
                  </span>
                )}
                <h3 className="text-lg font-bold text-sand-900">{plan.nombre}</h3>
                <p className="mt-1 text-sm text-sand-500">{plan.paraQuien}</p>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-sand-900">
                    {soles(anual ? precioAnual(plan) : plan.precioMensual)}
                  </span>
                  <span className="text-sm text-sand-500">
                    {anual ? "al año" : "al mes"}
                  </span>
                </p>
                <p className="mt-1 text-xs text-sand-400">
                  {anual
                    ? `Pagas ${MESES_PAGADOS_ANUAL} meses y usas 12. IGV incluido.`
                    : "IGV incluido."}
                </p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.incluye.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-sand-700">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                      {item}
                    </li>
                  ))}
                  {!plan.conBot && (
                    <li className="flex items-start gap-2.5 text-sm text-sand-400">
                      <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      Sin asistente de WhatsApp
                    </li>
                  )}
                </ul>
                <a
                  href="/contacto"
                  className={clsx(
                    "mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all active:scale-[0.98]",
                    plan.destacado
                      ? "bg-primary-600 text-white hover:bg-primary-700"
                      : "border border-sand-300 text-sand-800 hover:bg-sand-50"
                  )}
                >
                  Crear mi tienda <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-sand-600">
          <strong className="text-sand-800">Alta gratis</strong> si te quedas al
          menos {MESES_PERMANENCIA_ALTA_GRATIS} meses. Si te vas antes, pagas la
          parte proporcional del alta.
        </p>

        <AnimatedSection>
          <div
            id="pagas-aparte"
            className="mx-auto mt-8 max-w-5xl rounded-2xl border border-cream-400 bg-cream-50 p-5 sm:p-6"
          >
            <h3 className="text-base font-bold text-sand-900">
              Lo que pagas aparte, directo a cada proveedor
            </h3>
            <p className="mt-1 text-sm text-sand-600">
              Pedily nunca toca tu dinero. Estos son los precios públicos de
              cada proveedor (noviembre de 2026):
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {COSTOS_APARTE.map((c) => (
                <li key={c.proveedor} className="rounded-xl bg-white p-4 text-sm">
                  <p className="font-semibold text-sand-900">{c.proveedor}</p>
                  <p className="mt-0.5 text-sand-500">{c.que}</p>
                  <p className="mt-2 font-semibold text-sand-800">{c.precio}</p>
                  <a
                    href={c.fuente}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-xs text-primary-700 underline"
                  >
                    Ver su tarifa
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
