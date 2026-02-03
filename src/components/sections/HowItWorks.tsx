"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ClipboardList, Paintbrush, ShoppingCart } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Registrate y configura tu menu",
    description:
      "Crea tu cuenta, sube tus productos con fotos, precios y variantes. Organiza por categorias.",
  },
  {
    icon: Paintbrush,
    step: "02",
    title: "Personaliza tu tienda",
    description:
      "Agrega tu logo, colores y dominio. Define zonas de delivery, horarios y metodos de pago.",
  },
  {
    icon: ShoppingCart,
    step: "03",
    title: "Empieza a recibir pedidos",
    description:
      "Comparte el link de tu tienda, recibe pedidos al instante y gestiona todo desde el dashboard.",
  },
];

export function HowItWorks() {
  return (
    <Section className="bg-white">
      <Container>
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Empieza en 3 simples pasos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            No necesitas conocimientos tecnicos. Configura tu tienda online y
            empieza a vender hoy.
          </p>
        </AnimatedSection>

        <div className="relative mt-16 grid gap-8 sm:grid-cols-3">
          {/* Connector line - desktop */}
          <div className="absolute top-12 right-[16.67%] left-[16.67%] hidden h-0.5 sm:block">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-primary-300 via-primary-400 to-accent-400" />
          </div>

          {steps.map((step, i) => (
            <AnimatedSection key={step.step} delay={i * 0.15}>
              <div className="relative flex flex-col items-center text-center">
                <div className="group relative z-10">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/25 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary-500/35">
                    <step.icon
                      className="h-10 w-10 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white shadow-sm">
                    {step.step}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}

          {/* Mobile vertical connector */}
          <div className="absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary-200 via-primary-300 to-accent-300 sm:hidden" />
        </div>
      </Container>
    </Section>
  );
}
