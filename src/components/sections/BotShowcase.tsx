"use client";

import { Container } from "@/components/layout/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";
import {
  Mic,
  Image as ImageIcon,
  MessageCircle,
  Gift,
  UserCheck,
  ShieldCheck,
} from "lucide-react";
import { whatsappLink } from "@/lib/site";

const capabilities = [
  {
    icon: MessageCircle,
    title: "Entiende cómo escriben tus clientes",
    description:
      "“Quiero un lomo saltado y dos chichas”, y el bot arma el carrito.",
  },
  {
    icon: Gift,
    title: "Clientes que vuelven",
    description:
      "Cupones y, si quieres, saldo a favor en cada compra. Tu base de clientes es tuya.",
  },
  {
    icon: UserCheck,
    title: "Un humano toma el control cuando hace falta",
    description:
      "Si el cliente lo pide o el bot detecta fricción, tu equipo retoma el chat con un resumen del contexto ya hecho. Nada se pierde.",
  },
  {
    icon: ShieldCheck,
    title: "Nunca inventa precios ni productos",
    description:
      "La IA valida cada respuesta contra tu catálogo y el carrito real. Sin alucinaciones, sin cobros equivocados.",
  },
];

const chat: { from: "user" | "bot"; text: string; typing?: boolean }[] = [
  { from: "user", text: "¡Hola! Quiero pedir para la casa 🍜" },
  {
    from: "bot",
    text: "¡Hola! 👋 Claro que sí. ¿Te muestro lo más pedido o ya sabes qué quieres?",
  },
  { from: "user", text: "un lomo saltado y dos chichas moradas" },
  {
    from: "bot",
    text: "Listo ✅ Agregué:\n• Lomo saltado — S/ 32\n• Chicha morada x2 — S/ 16\nTotal: S/ 48. ¿Delivery o recojo?",
  },
  { from: "user", text: "delivery, pago con Yape" },
  {
    from: "bot",
    text: "¡Perfecto! Te envío el link de pago Yape 💚 Apenas confirmes, tu pedido entra directo a cocina. 🛵",
  },
];

export function BotShowcase() {
  const botDemoHref = whatsappLink(
    "Hola Pedily 👋 Quiero ver el bot de WhatsApp con IA en acción."
  );
  return (
    <section
      id="bot-ia"
      className="relative overflow-hidden bg-primary-900 py-20 text-white sm:py-28"
    >
      {/* warm glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_0%,rgba(242,65,25,0.18),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_100%,rgba(90,228,188,0.12),transparent)]" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimatedSection>
            <span className="mb-4 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-200">
              Un bot que toma pedidos
            </span>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
              Toma pedidos por WhatsApp a cualquier hora,{" "}
              <span className="bg-gradient-to-r from-primary-300 to-accent-300 bg-clip-text text-transparent">
                y te pasa la conversación cuando hace falta
              </span>
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-primary-100/90">
              El bot de Pedily usa IA de verdad (Claude de Anthropic) para
              conversar con tus clientes en español peruano y llevarlos del
              “hola” al pago confirmado. Y cuando hace falta, un humano toma el
              control.
            </p>

            <div className="mt-8 space-y-4">
              {capabilities.map((cap, i) => (
                <AnimatedSection key={cap.title} delay={i * 0.08}>
                  <div className="flex gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                      <cap.icon className="h-5 w-5 text-primary-200" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{cap.title}</h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-primary-100/75">
                        {cap.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <a
              href={botDemoHref ?? "/contacto"}
              {...(botDemoHref
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="mt-9 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-primary-800 shadow-warm transition-all hover:bg-primary-50 active:scale-[0.98]"
            >
              Ver el bot en acción
            </a>
          </AnimatedSection>

          {/* Phone mockup */}
          <AnimatedSection delay={0.15}>
            <div className="relative mx-auto w-full max-w-sm">
              <div className="overflow-hidden rounded-[2rem] border-[6px] border-sand-800 bg-sand-800 shadow-elevated">
                {/* whatsapp header */}
                <div className="bg-[#075E54] px-4 pb-3 pt-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm">
                      🥡
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Restaurante Demo
                      </p>
                      <p className="text-[11px] text-green-100">
                        en línea · responde al instante
                      </p>
                    </div>
                  </div>
                </div>
                {/* chat */}
                <div className="space-y-2.5 bg-[#e5ddd5] p-3.5">
                  {chat.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.18 }}
                      className={
                        m.from === "user"
                          ? "ml-auto max-w-[80%] whitespace-pre-line rounded-lg rounded-tr-sm bg-[#dcf8c6] px-3 py-2 text-[13px] text-sand-800 shadow-sm"
                          : "max-w-[82%] whitespace-pre-line rounded-lg rounded-tl-sm bg-white px-3 py-2 text-[13px] text-sand-800 shadow-sm"
                      }
                    >
                      {m.text}
                    </motion.div>
                  ))}
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-3 py-2">
                      <span className="text-[13px] text-sand-400">
                        Escribe un mensaje
                      </span>
                      <Mic className="ml-auto h-4 w-4 text-sand-400" />
                      <ImageIcon className="h-4 w-4 text-sand-400" />
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#075E54]">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                        <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
