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
    bg: "from-red-50 to-red-100/50",
    iconColor: "text-red-500",
    borderHover: "hover:border-red-200",
    shadowHover: "hover:shadow-red-200/50",
    accentColor: "bg-red-400",
  },
  {
    icon: Layers,
    title: "3 canales, 1 Hub",
    description:
      "Web, WhatsApp y kiosko llegan al mismo lugar. El bot atiende 24/7 y el kiosko vende solo. Tu solo gestionas desde el Hub.",
    bg: "from-purple-50 to-purple-100/50",
    iconColor: "text-purple-500",
    borderHover: "hover:border-purple-200",
    shadowHover: "hover:shadow-purple-200/50",
    accentColor: "bg-purple-400",
  },
  {
    icon: Palette,
    title: "Tu marca, tus clientes",
    description:
      "Tu dominio, tu logo, tus datos. Tus clientes te compran a ti, no a un agregador. Construye lealtad directa.",
    bg: "from-primary-50 to-primary-100/50",
    iconColor: "text-primary-500",
    borderHover: "hover:border-primary-200",
    shadowHover: "hover:shadow-primary-200/50",
    accentColor: "bg-primary-400",
  },
  {
    icon: Zap,
    title: "Al toque",
    description:
      "Pedido nuevo? Te llega la notificacion al instante. Cocina, delivery y tu equipo siempre sincronizados en tiempo real.",
    bg: "from-amber-50 to-amber-100/50",
    iconColor: "text-amber-500",
    borderHover: "hover:border-amber-200",
    shadowHover: "hover:shadow-amber-200/50",
    accentColor: "bg-amber-400",
  },
];

export function BenefitsGrid() {
  return (
    <Section>
      <Container>
        <AnimatedSection className="text-center">
          <span className="mb-4 inline-flex items-center rounded-full bg-gradient-to-r from-primary-50 to-accent-50 px-4 py-1.5 text-sm font-semibold text-primary-700 ring-1 ring-primary-200/50">
            Ventajas
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
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
                className={`group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 ${benefit.borderHover} hover:-translate-y-1 hover:shadow-xl ${benefit.shadowHover}`}
              >
                {/* Top accent line on hover */}
                <div className={`absolute inset-x-0 top-0 h-0.5 ${benefit.accentColor} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                <div
                  className={`inline-flex rounded-xl bg-gradient-to-br ${benefit.bg} p-3 transition-transform duration-300 group-hover:scale-110`}
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
