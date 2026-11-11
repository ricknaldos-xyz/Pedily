"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Check, Sparkles } from "lucide-react";

// Sin decisión de precio del dueño (docs/DECISIONES.md, nº 1): no se publica
// ningún precio ni plan. Solo lo que el sistema ya hace.
const features = [
  "Tienda web con tu marca y tu dominio",
  "Panel de pedidos en tiempo real y vista de cocina",
  "Cobro con tarjeta y Yape en tu propia cuenta",
  "Boletas y facturas electrónicas con tu RUC",
  "Zonas y tarifas de reparto",
  "Cupones de descuento",
  "Inventario, recetas, caja y finanzas",
  "Opcional: bot de WhatsApp",
  "Opcional: kiosko de autoservicio",
];

export function PricingTable() {
  return (
    <Section id="precios" className="relative bg-white">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(59,168,137,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(59,168,137,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <Container className="relative">
        <AnimatedSection className="text-center">
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            Precios
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-sand-900 sm:text-4xl lg:text-5xl">
            Un solo sistema, a la medida de tu restaurante
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sand-500">
            Sin comisión por pedido. Te preparamos una cotización según lo que
            necesita tu negocio.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="mx-auto mt-12 flex max-w-2xl flex-col overflow-hidden rounded-2xl border-2 border-primary-500 bg-white p-8 shadow-xl shadow-primary-500/10">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-sand-900">
                  Todo lo que incluye
                </h3>
                <p className="mt-0.5 text-sm text-sand-500">
                  Lo configuramos contigo y te enseñamos a usarlo.
                </p>
              </div>
            </div>

            <ul className="mt-8 grid flex-1 gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-sand-600"
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-50">
                    <Check className="h-3 w-3 text-primary-600" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href="/contacto"
              className="mt-8 block rounded-lg bg-primary-600 py-3 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md active:scale-[0.98]"
            >
              Pide tu cotización
            </a>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
