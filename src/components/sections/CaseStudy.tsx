"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { TrendingUp, Users, Clock, ShoppingBag } from "lucide-react";
import { useInView } from "framer-motion";

function AnimatedValue({ value, inView }: { value: string; inView: boolean }) {
  const [display, setDisplay] = useState(value.startsWith("+") || value.startsWith("S") ? "0" : value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    // Extract numeric part
    const match = value.match(/(\d[\d,]*)/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const numStr = match[1].replace(",", "");
    const target = parseInt(numStr, 10);
    const prefix = value.substring(0, value.indexOf(match[1]));
    const suffix = value.substring(value.indexOf(match[1]) + match[1].length);
    const hasComma = match[1].includes(",");
    const duration = 1500;
    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      const formatted = hasComma ? current.toLocaleString() : String(current);
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (step >= steps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, value]);

  return <>{display}</>;
}

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
  const metricsRef = useRef(null);
  const isInView = useInView(metricsRef, { once: true, margin: "-100px" });

  return (
    <Section className="relative bg-slate-900 overflow-hidden">
      {/* Dark dot grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <AnimatedSection>
            <span className="inline-block rounded-full bg-accent-500/10 px-4 py-1.5 text-sm font-semibold text-accent-400 ring-1 ring-accent-500/20">
              Caso de exito
            </span>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Wantan Clan: de depender de Rappi a vender directo
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Wantan Clan es una cadena de comida china-peruana en Lima con 3 locales.
              Antes pagaban mas de S/ 8,000/mes en comisiones a agregadores.
            </p>
            <p className="mt-4 leading-relaxed text-slate-400">
              Con Pedily activaron su tienda web, el bot de WhatsApp y el kiosko en
              su local principal. En 3 meses, el 60% de sus pedidos ya vienen por
              canales propios.
            </p>
            <blockquote className="relative mt-8 border-l-4 border-accent-500 pl-6">
              {/* Large decorative quote mark */}
              <span className="absolute -left-2 -top-6 text-7xl font-serif leading-none text-accent-500/10">
                &ldquo;
              </span>
              <p className="relative text-lg italic leading-relaxed text-white">
                &ldquo;Antes perdiamos plata con cada pedido de delivery. Ahora tenemos
                control total y conocemos a nuestros clientes. El bot de WhatsApp
                es una maravilla, toma pedidos mientras dormimos.&rdquo;
              </p>
              <footer className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-accent-600 text-sm font-bold text-white">
                  CW
                </div>
                <div>
                  <p className="font-semibold text-white">Carlos Wong</p>
                  <p className="text-sm text-slate-400">Fundador, Wantan Clan</p>
                </div>
              </footer>
            </blockquote>
          </AnimatedSection>

          <div ref={metricsRef}>
            <div className="grid gap-4 sm:grid-cols-2">
              {metrics.map((metric, i) => {
                const Icon = metric.icon;
                return (
                  <AnimatedSection key={metric.label} delay={i * 0.1} variant="scale-up">
                    <div className="group rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur transition-all duration-300 hover:border-accent-500/30 hover:shadow-lg hover:shadow-accent-500/10">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10 transition-colors group-hover:bg-accent-500/20">
                        <Icon className="h-6 w-6 text-accent-400" />
                      </div>
                      <p className="mt-4 text-3xl font-extrabold text-white">
                        <AnimatedValue value={metric.value} inView={isInView} />
                      </p>
                      <p className="mt-1 font-semibold text-slate-200">
                        {metric.label}
                      </p>
                      <p className="mt-0.5 text-sm text-slate-400">
                        {metric.description}
                      </p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
