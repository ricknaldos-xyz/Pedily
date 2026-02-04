"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Ban, Layers, Palette, Zap } from "lucide-react";

const benefits = [
  {
    icon: Ban,
    title: "Cero comisiones",
    description:
      "Nada de 25% por pedido como Rappi. Pagas una tarifa fija y listo, todas las ganancias son tuyas.",
    bg: "bg-red-50",
    iconColor: "text-red-500",
    borderHover: "hover:border-red-200",
  },
  {
    icon: Layers,
    title: "3 canales, 1 Hub",
    description:
      "Web, WhatsApp y kiosko llegan al mismo lugar. El bot atiende 24/7 y el kiosko vende solo. Tu solo gestionas desde el Hub.",
    bg: "bg-purple-50",
    iconColor: "text-purple-500",
    borderHover: "hover:border-purple-200",
  },
  {
    icon: Palette,
    title: "Tu marca, tus clientes",
    description:
      "Tu dominio, tu logo, tus datos. Tus clientes te compran a ti, no a un agregador. Construye lealtad directa.",
    bg: "bg-primary-50",
    iconColor: "text-primary-500",
    borderHover: "hover:border-primary-200",
  },
  {
    icon: Zap,
    title: "Al toque",
    description:
      "Pedido nuevo? Te llega la notificacion al instante. Cocina, delivery y tu equipo siempre sincronizados en tiempo real.",
    bg: "bg-amber-50",
    iconColor: "text-amber-500",
    borderHover: "hover:border-amber-200",
  },
];

export function BenefitsGrid() {
  return (
    <Section>
      <Container>
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Por que negocios como el tuyo eligen Pedily
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Vende mas, gestiona menos. Todo lo que necesitas en un solo lugar.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <AnimatedSection key={benefit.title} delay={i * 0.1}>
              <div
                className={`group relative h-full rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 ${benefit.borderHover} hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50`}
              >
                <div
                  className={`inline-flex rounded-xl ${benefit.bg} p-3 transition-transform duration-300 group-hover:scale-110`}
                >
                  <benefit.icon
                    className={`h-6 w-6 ${benefit.iconColor}`}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
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
