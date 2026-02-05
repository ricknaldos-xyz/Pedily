"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { TrendingUp, Users, Clock, ShoppingBag } from "lucide-react";

const metrics = [
  {
    icon: TrendingUp,
    value: "+40%",
    label: "Aumento en pedidos",
    description: "en los primeros 3 meses",
  },
  {
    icon: ShoppingBag,
    value: "S/ 85",
    label: "Ticket promedio",
    description: "vs S/ 62 antes",
  },
  {
    icon: Users,
    value: "2,400+",
    label: "Clientes recurrentes",
    description: "en su base de datos",
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Pedidos automaticos",
    description: "con el bot de WhatsApp",
  },
];

export function CaseStudy() {
  return (
    <Section className="bg-slate-900">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <AnimatedSection>
            <span className="inline-block rounded-full bg-accent-500/10 px-4 py-1.5 text-sm font-semibold text-accent-400">
              Caso de exito
            </span>
            <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
              Wantan Clan: de depender de Rappi a vender directo
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Wantan Clan es una cadena de comida china-peruana en Lima con 3 locales.
              Antes pagaban mas de S/ 8,000/mes en comisiones a agregadores.
            </p>
            <p className="mt-4 text-slate-400">
              Con Pedily activaron su tienda web, el bot de WhatsApp y el kiosko en
              su local principal. En 3 meses, el 60% de sus pedidos ya vienen por
              canales propios.
            </p>
            <blockquote className="mt-8 border-l-4 border-accent-500 pl-6">
              <p className="text-lg italic text-white">
                &ldquo;Antes perdiamos plata con cada pedido de delivery. Ahora tenemos
                control total y conocemos a nuestros clientes. El bot de WhatsApp
                es una maravilla, toma pedidos mientras dormimos.&rdquo;
              </p>
              <footer className="mt-4">
                <p className="font-semibold text-white">Carlos Wong</p>
                <p className="text-sm text-slate-400">Fundador, Wantan Clan</p>
              </footer>
            </blockquote>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid gap-4 sm:grid-cols-2">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.label}
                    className="rounded-2xl bg-slate-800/50 p-6 backdrop-blur"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10">
                      <Icon className="h-6 w-6 text-accent-400" />
                    </div>
                    <p className="mt-4 text-3xl font-extrabold text-white">
                      {metric.value}
                    </p>
                    <p className="mt-1 font-semibold text-slate-200">
                      {metric.label}
                    </p>
                    <p className="mt-0.5 text-sm text-slate-400">
                      {metric.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </Section>
  );
}
