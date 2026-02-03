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
      "A diferencia de Rappi o PedidosYa, no cobramos porcentaje por pedido. Paga una tarifa fija mensual y quedate con todas tus ganancias.",
    bg: "bg-red-50",
    iconColor: "text-red-500",
    borderHover: "hover:border-red-200",
  },
  {
    icon: Layers,
    title: "3 canales, 1 sistema",
    description:
      "Vende por web, WhatsApp y kiosko en tienda. Los 3 canales llegan al mismo Hub de pedidos. Bot con IA atiende WhatsApp 24/7 y el kiosko funciona sin personal.",
    bg: "bg-purple-50",
    iconColor: "text-purple-500",
    borderHover: "hover:border-purple-200",
  },
  {
    icon: Palette,
    title: "Tu marca, tu control",
    description:
      "Tu dominio, tu logo, tus colores. Tus clientes ven tu marca, no la nuestra. Accede a todos los datos de tus clientes y construye lealtad directa.",
    bg: "bg-primary-50",
    iconColor: "text-primary-500",
    borderHover: "hover:border-primary-200",
  },
  {
    icon: Zap,
    title: "Tiempo real",
    description:
      "Notificaciones instantaneas cuando llega un pedido de cualquier canal. Dashboard en vivo con estados de cocina, despacho y delivery. Tu equipo siempre sincronizado.",
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
            Por que elegir Pedily
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Todo lo que necesitas para llevar tu negocio al mundo digital, sin
            complicaciones.
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
