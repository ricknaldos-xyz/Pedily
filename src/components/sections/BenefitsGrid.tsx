"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Store, Bot, LayoutDashboard, Ban } from "lucide-react";

const benefits = [
  {
    icon: Store,
    title: "Vende en todos lados",
    description:
      "Web, WhatsApp con IA, kiosko de autoservicio y marketplaces (PedidosYa, Rappi). Una sola marca, un solo catálogo, un solo Hub.",
  },
  {
    icon: Bot,
    title: "Un bot que toma pedidos",
    description:
      "IA que responde por WhatsApp a cualquier hora y toma pedidos en lenguaje natural. Cuando hace falta, pasa la conversación a una persona de tu equipo.",
  },
  {
    icon: LayoutDashboard,
    title: "Controla todo el negocio",
    description:
      "Pedidos en tiempo real, cocina, inventario, recetas, caja, finanzas, planilla y facturación SUNAT. No solo vendes: operas todo desde un lugar.",
  },
  {
    icon: Ban,
    title: "Sin comisiones por pedido",
    description:
      "Nada de 25% por pedido como los agregadores. Te preparamos una cotización según lo que uses.",
  },
];

export function BenefitsGrid() {
  return (
    <Section className="bg-sand-50">
      <Container>
        <AnimatedSection className="text-center">
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            Ventajas
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-sand-900 sm:text-4xl lg:text-5xl">
            Por qué negocios como el tuyo eligen Pedily
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sand-500">
            Vende más, gestiona menos. El sistema completo para operar tu
            restaurante en un solo lugar.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <AnimatedSection key={benefit.title} delay={i * 0.1}>
              <div
                className="group relative h-full overflow-hidden rounded-2xl border border-sand-200 bg-white p-8 transition-all duration-300 hover:border-sand-300 hover:shadow-md"
              >
                <div
                  className="inline-flex rounded-xl bg-primary-50 p-3"
                >
                  <benefit.icon
                    className="h-6 w-6 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-4 text-lg font-bold text-sand-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sand-500">
                  {benefit.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}
