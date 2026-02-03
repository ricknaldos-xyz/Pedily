"use client";

import { Container } from "@/components/layout/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-20 sm:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(16,185,129,0.2),transparent)]" />

      {/* Decorative elements */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-[10%] h-40 w-40 rounded-full bg-white/5 blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[15%] bottom-10 h-32 w-32 rounded-full bg-accent-400/10 blur-2xl"
      />

      <Container className="relative text-center">
        <AnimatedSection>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Empieza a vender online hoy
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
            14 dias gratis, sin tarjeta de credito. Configura tu tienda en
            minutos y empieza a recibir pedidos.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-primary-700 shadow-lg transition-all hover:bg-primary-50 hover:shadow-xl active:scale-[0.98]"
            >
              Crear mi tienda gratis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20"
            >
              <MessageCircle className="h-4 w-4" />
              Contactar ventas
            </a>
          </div>

          <p className="mt-8 text-sm text-primary-200/80">
            Sin compromisos. Cancela cuando quieras.
          </p>
        </AnimatedSection>
      </Container>
    </section>
  );
}
