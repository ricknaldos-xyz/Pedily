"use client";

import { Container } from "@/components/layout/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowRight, MessageCircle, Shield, X as XIcon, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const trustItems = [
  { icon: Shield, text: "Sin tarjeta de credito" },
  { icon: XIcon, text: "Cancela cuando quieras" },
  { icon: Headphones, text: "Soporte incluido" },
];

export function FinalCTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-20 sm:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(16,185,129,0.2),transparent)]" />

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Decorative elements */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-[10%] h-48 w-48 rounded-full bg-gradient-to-br from-white/10 to-accent-400/10 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[15%] bottom-10 h-40 w-40 rounded-full bg-gradient-to-br from-accent-400/15 to-primary-300/10 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, 8, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl"
      />

      <Container className="relative text-center">
        <AnimatedSection variant="scale-up">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
            Listo para vender mas?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-primary-100">
            Crea tu tienda gratis, sin tarjeta. En unos minutos estas
            recibiendo pedidos por web, WhatsApp y kiosko.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#"
              className="btn-shimmer group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-primary-700 shadow-lg transition-all hover:bg-primary-50 hover:shadow-xl active:scale-[0.98]"
            >
              Empezar gratis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/contacto"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20"
            >
              <MessageCircle className="h-4 w-4" />
              Contactar ventas
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.text}
                  className="flex items-center gap-2 text-sm text-primary-200/80"
                >
                  <Icon className="h-4 w-4" />
                  {item.text}
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
