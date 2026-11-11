"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  Globe,
  MessageCircle,
  Monitor,
  Truck,
  Layers,
  Bot,
  ReceiptText,
  Users,
} from "lucide-react";

const channels = [
  { icon: Globe, label: "Tienda Web" },
  { icon: MessageCircle, label: "WhatsApp + IA" },
  { icon: Monitor, label: "Kiosko" },
  { icon: Truck, label: "Delivery propio" },
];

const facts = [
  {
    icon: Layers,
    value: "1",
    label: "restaurante en operación diaria",
    description: "desde el primer pedido",
  },
  {
    icon: Bot,
    value: "24/7",
    label: "bot con IA",
    description: "toma pedidos por WhatsApp",
  },
  {
    icon: ReceiptText,
    value: "SUNAT",
    label: "facturación electrónica",
    description: "boletas y facturas al instante",
  },
  {
    icon: Users,
    value: "100%",
    label: "clientes propios",
    description: "su base de datos, no de un tercero",
  },
];

export function CaseStudy() {
  return (
    <Section className="relative overflow-hidden bg-primary-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_0%,rgba(242,65,25,0.14),transparent)]" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left: Story */}
          <AnimatedSection>
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-200">
              Caso real
            </span>

            <h2 className="mt-6 flex items-center gap-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-2xl">
                🥡
              </span>
              Probado en un restaurante real
            </h2>
            <p className="mt-2 text-sm font-medium text-primary-200/80">
              Restaurante de comida china-peruana &middot; Lima
            </p>

            <p className="mt-6 text-lg leading-relaxed text-primary-100/85">
              Pedily nació operando este restaurante de punta a punta. Hoy vende
              por su web, por un bot de WhatsApp con IA y por un kiosko de
              autoservicio en su local, con delivery propio — y gestiona todo
              (cocina, inventario, finanzas y facturación SUNAT) desde un solo
              panel.
            </p>

            {/* Channels activated */}
            <div className="mt-6 flex flex-wrap gap-2">
              {channels.map((ch) => {
                const Icon = ch.icon;
                return (
                  <span
                    key={ch.label}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-primary-100 ring-1 ring-white/10"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {ch.label}
                  </span>
                );
              })}
            </div>

            <blockquote className="mt-8 border-l-2 border-accent-400/50 pl-5">
              <p className="text-base leading-relaxed text-primary-100/85">
                La idea detrás de Pedily es simple: dejar de pagar comisiones por
                cada pedido y ser dueño de tu canal, tu marca y tus clientes. Lo
                construimos para un restaurante real, no para una demo.
              </p>
            </blockquote>
          </AnimatedSection>

          {/* Right: Facts about the real deployment */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {facts.map((fact, i) => {
                const Icon = fact.icon;
                return (
                  <AnimatedSection
                    key={fact.label}
                    delay={0.1 + i * 0.1}
                    variant="scale-up"
                  >
                    <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/15 transition-colors group-hover:bg-accent-500/25">
                        <Icon className="h-5 w-5 text-accent-300" />
                      </div>
                      <p className="mt-3 text-2xl font-extrabold text-white">
                        {fact.value}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-primary-100">
                        {fact.label}
                      </p>
                      <p className="text-xs text-primary-200/70">
                        {fact.description}
                      </p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

            <AnimatedSection delay={0.5}>
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm leading-relaxed text-primary-100/85">
                  <strong className="text-white">El modelo:</strong> tarifa fija
                  mensual en lugar de hasta 25% de comisión por pedido como en
                  los agregadores. Cuanto más vendes, más se nota la diferencia.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </Container>
    </Section>
  );
}
