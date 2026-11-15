"use client";

import { Container } from "@/components/layout/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { DEMO, demoBotLink } from "@/lib/site";
import { MESES_PERMANENCIA_ALTA_GRATIS } from "@/lib/planes";

const garantias = [
  "0 % de comisión al restaurante y al comensal",
  "El dinero va directo a tu cuenta",
  `Alta gratis si te quedas ${MESES_PERMANENCIA_ALTA_GRATIS} meses`,
];

// Ejemplo de conversación con el asistente. Platos, precios, cremas y zona
// salen de la carta y la configuración de la demo publicada
// (pedily-backend/config/ejemplos/carta.demo.json y restaurante.demo.config.json:
// medio pollo S/ 34 con 2 cremas incluidas, chicha morada jarra 1 L S/ 14,
// reparto a Jesús María S/ 8 y 45 min). No es una captura: el bot de
// demostración se prueba con el botón «Prueba el bot por WhatsApp» cuando el
// número está configurado.
const chat: { de: "cliente" | "bot"; texto: string }[] = [
  { de: "cliente", texto: "hola, medio pollo y una jarra de chicha pa’ Jesús María" },
  {
    de: "bot",
    texto:
      "¡Hola! El medio pollo trae 2 cremas: mayonesa, kétchup, mostaza, ají de la casa u ocopa (+S/ 1). ¿Cuáles te pongo?",
  },
  { de: "cliente", texto: "mayo y ají nomás" },
  {
    de: "bot",
    texto:
      "Te anoto:\n• Medio pollo a la brasa (mayonesa, ají) — S/ 34\n• Chicha morada, jarra 1 L — S/ 14\nEnvío a Jesús María — S/ 8\nTotal: S/ 56. Aquí tu enlace para pagar con Yape o tarjeta 👇",
  },
  {
    de: "bot",
    texto: "Pago recibido ✅ Tu pedido ya está en cocina. Llega en unos 45 min 🛵",
  },
];

function Garantias({ className }: { className: string }) {
  return (
    <ul className={`space-y-1.5 text-sm text-sand-600 ${className}`}>
      {garantias.map((g) => (
        <li key={g} className="flex items-center gap-2">
          <Check className="h-4 w-4 flex-shrink-0 text-primary-600" />
          {g}
        </li>
      ))}
    </ul>
  );
}

export function Hero() {
  const botHref = demoBotLink();
  return (
    <section className="relative overflow-hidden bg-cream-50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,168,137,0.14),transparent)]" />

      <Container className="relative pb-8 pt-6 sm:pb-20 sm:pt-16 lg:pt-20">
        <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <AnimatedSection>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/70 px-3 py-1 text-xs font-semibold text-primary-700 sm:text-sm">
              Tienda desde S/ 249 · asistente de WhatsApp desde S/ 499 · al mes con IGV
            </p>

            <h1 className="mt-4 text-[2.1rem] font-extrabold leading-[1.06] tracking-tight text-sand-900 sm:text-5xl lg:text-[3.4rem]">
              Tu WhatsApp toma pedidos solo.{" "}
              <span className="text-primary-600">Tu web vende sin comisión.</span>{" "}
              La boleta sale sola.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-sand-600 sm:text-lg">
              Un asistente de WhatsApp que conversa de verdad y cobra, no un
              formulario. Con tu tienda web, kiosko y boletas SUNAT, y el cobro
              en tu cuenta. Sin pagarle el 30 % a nadie.
            </p>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
              <a
                href="/contacto"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-7 py-4 text-base font-semibold text-white shadow-warm transition-all hover:bg-primary-700 active:scale-[0.98]"
              >
                Crear mi tienda
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              {botHref && (
                <a
                  href={botHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary-200 bg-white px-6 py-4 text-base font-semibold text-primary-700 transition-all hover:bg-primary-50 active:scale-[0.98]"
                >
                  <span className="text-[#25D366]">
                    <WhatsAppGlyph />
                  </span>
                  Prueba el bot por WhatsApp
                </a>
              )}
              <a
                href={DEMO.tiendaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-sand-700 underline-offset-4 hover:underline"
              >
                Mira una tienda de ejemplo
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <Garantias className="mt-5 hidden lg:block" />
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="mx-auto w-full max-w-[22rem] overflow-hidden rounded-[1.6rem] border border-sand-200 bg-[#efeae2] shadow-elevated">
              <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                  RD
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">Restaurante Demo</p>
                  <p className="text-[11px] text-green-100">asistente de pedidos</p>
                </div>
              </div>
              <div className="space-y-2 px-3 py-3">
                {chat.map((m, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.35 }}
                    className={
                      m.de === "cliente"
                        ? "ml-auto w-fit max-w-[85%] whitespace-pre-line rounded-lg rounded-tr-sm bg-[#d9fdd3] px-3 py-2 text-[13px] text-sand-800 shadow-sm"
                        : "w-fit max-w-[88%] whitespace-pre-line rounded-lg rounded-tl-sm bg-white px-3 py-2 text-[13px] text-sand-800 shadow-sm"
                    }
                  >
                    {m.texto}
                  </motion.p>
                ))}
              </div>
              <p className="border-t border-black/5 bg-white/60 px-4 py-2 text-center text-[11px] text-sand-500">
                Ejemplo de conversación · asistente desde el plan de S/ 499
              </p>
            </div>
            <Garantias className="mx-auto mt-4 w-fit lg:hidden" />
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
