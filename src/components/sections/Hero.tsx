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

// Ejemplo de conversación con el asistente (precios coherentes con el resto
// de la página). No es una captura: el bot de demostración se prueba con el
// botón «Prueba el bot por WhatsApp» cuando el número está configurado.
const chat: { de: "cliente" | "bot"; texto: string }[] = [
  { de: "cliente", texto: "hola, un lomo saltado y dos chichas para delivery" },
  {
    de: "bot",
    texto:
      "¡Hola! Te anoto:\n• Lomo saltado — S/ 32\n• Chicha morada x2 — S/ 16\nEnvío a Surquillo — S/ 6\nTotal: S/ 54. ¿Pagas con Yape o tarjeta?",
  },
  { de: "cliente", texto: "yape" },
  {
    de: "bot",
    texto: "Listo, pago recibido ✅ Tu pedido ya está en cocina. Llega en 35–45 min 🛵",
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
              Para restaurantes en Perú · desde S/ 249 al mes con IGV
            </p>

            <h1 className="mt-4 text-[2.1rem] font-extrabold leading-[1.06] tracking-tight text-sand-900 sm:text-5xl lg:text-[3.4rem]">
              Tu WhatsApp toma pedidos solo.{" "}
              <span className="text-primary-600">Tu web vende sin comisión.</span>{" "}
              La boleta sale sola.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-sand-600 sm:text-lg">
              La tienda propia de tu restaurante: web, asistente de WhatsApp
              con IA y kiosko, con el cobro en tu cuenta y boletas SUNAT. Sin
              pagarle el 30 % a nadie.
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
