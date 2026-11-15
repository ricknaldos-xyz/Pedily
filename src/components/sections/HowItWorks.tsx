"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ClipboardList, Paintbrush, ShoppingCart } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Nos envías tu carta y los datos de tu negocio",
    description:
      "Tus productos con fotos, precios, presentaciones y extras, tus zonas de delivery, tus horarios y cómo quieres cobrar.",
  },
  {
    icon: Paintbrush,
    step: "02",
    title: "Configuramos tu tienda con tu marca y conectamos tus cobros",
    description:
      "Tu logo, tus colores y tu dominio: lo configuramos nosotros con lo que nos envíes.",
  },
  {
    icon: ShoppingCart,
    step: "03",
    title: "Vendes y operas desde el panel",
    description:
      "Los pedidos de todos los canales llegan en tiempo real. Gestiona cocina, inventario, finanzas y facturación desde un solo lugar.",
  },
];

export function HowItWorks() {
  return (
    <Section id="como-funciona" className="bg-sand-50">
      <Container>
        <AnimatedSection className="text-center">
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            Cómo funciona
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-sand-900 sm:text-4xl lg:text-5xl">
            Así es la puesta en marcha
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sand-500">
            Sin código, sin complicaciones. Si sabes usar WhatsApp, puedes usar Pedily.
          </p>
        </AnimatedSection>

        <div className="relative mt-16 grid gap-8 sm:grid-cols-3">
          {/* Connector line - desktop */}
          <div className="absolute top-14 right-[16.67%] left-[16.67%] hidden h-0.5 sm:block">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-sand-200 via-sand-300 to-sand-200" />
          </div>

          {steps.map((step, i) => (
            <AnimatedSection key={step.step} delay={i * 0.2} variant="scale-up">
              <div className="relative flex flex-col items-center text-center">
                <div className="relative z-10">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-warm">
                    <step.icon
                      className="h-10 w-10 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white shadow-sm">
                    {step.step}
                  </span>
                </div>

                {/* Card body */}
                <div className="mt-6 rounded-2xl border border-sand-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-sand-300 hover:shadow-md">
                  <h3 className="text-lg font-bold text-sand-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-sand-500">
                    {step.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}

          {/* Mobile vertical connector */}
          <div className="absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-sand-200 via-sand-300 to-sand-200 sm:hidden" />
        </div>
      </Container>
    </Section>
  );
}
