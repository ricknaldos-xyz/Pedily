"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ClipboardList, Paintbrush, ShoppingCart } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Crea tu cuenta y sube tu menu",
    description:
      "Registrate gratis, agrega tus productos con fotos y precios. Es como armar un album, bien facil.",
  },
  {
    icon: Paintbrush,
    step: "02",
    title: "Personaliza todo a tu gusto",
    description:
      "Tu logo, tus colores, tu dominio. Configura zonas de delivery, horarios y como quieres cobrar.",
  },
  {
    icon: ShoppingCart,
    step: "03",
    title: "Listo, a vender",
    description:
      "Comparte tu link y empieza a recibir pedidos. Los ves todos en el Hub, en tiempo real.",
  },
];

export function HowItWorks() {
  return (
    <Section className="bg-white">
      <Container>
        <AnimatedSection className="text-center">
          <span className="mb-4 inline-flex items-center rounded-full bg-gradient-to-r from-primary-50 to-accent-50 px-4 py-1.5 text-sm font-semibold text-primary-700 ring-1 ring-primary-200/50">
            Como funciona
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            Tu tienda lista en 3 pasos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Sin codigo, sin complicaciones. Si sabes usar WhatsApp, puedes usar Pedily.
          </p>
        </AnimatedSection>

        <div className="relative mt-16 grid gap-8 sm:grid-cols-3">
          {/* Connector line - desktop with shimmer */}
          <div className="absolute top-14 right-[16.67%] left-[16.67%] hidden h-0.5 overflow-hidden sm:block">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-primary-200 via-primary-300 to-accent-300" />
            <div className="absolute inset-0 animate-shimmer">
              <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          </div>

          {steps.map((step, i) => (
            <AnimatedSection key={step.step} delay={i * 0.2} variant="scale-up">
              <div className="relative flex flex-col items-center text-center">
                <div className="group relative z-10">
                  {/* Gradient ring */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-400 opacity-20 blur-sm transition-opacity group-hover:opacity-40" />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/25 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary-500/35">
                    <step.icon
                      className="h-10 w-10 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-accent-600 text-xs font-bold text-white shadow-md ring-2 ring-white">
                    {step.step}
                  </span>
                </div>

                {/* Card body */}
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary-200 hover:shadow-lg">
                  <h3 className="text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {step.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}

          {/* Mobile vertical connector */}
          <div className="absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 overflow-hidden bg-gradient-to-b from-primary-200 via-primary-300 to-accent-300 sm:hidden">
            <div className="absolute inset-0 animate-shimmer rotate-90">
              <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
