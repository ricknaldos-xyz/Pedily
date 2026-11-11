"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "Que incluye Pedily exactamente?",
    answer:
      "Es el sistema operativo de tu restaurante. Por un lado vendes en varios canales: tu tienda web, un bot de WhatsApp con IA que atiende solo, kiosko de autoservicio y marketplaces. Por el otro, operas todo desde un Hub: pedidos en tiempo real, cocina, inventario, recetas, caja, finanzas, planilla y facturacion SUNAT.",
  },
  {
    question: "Pedily maneja inventario y finanzas, no solo pedidos?",
    answer:
      "Si. Ademas de vender, controlas tu negocio: inventario por almacen con alertas de stock, recetas con costo de ingredientes (sabes tu margen real), caja con cierre cuadrado, P&L, flujo de caja, compras a proveedores y hasta planilla de tu equipo. Lo que otros venden por separado, aqui viene integrado.",
  },
  {
    question: "¿También recibe pedidos de marketplaces?",
    answer:
      "Hoy el bot atiende WhatsApp. El panel puede recibir también pedidos de PedidosYa y Rappi; esa conexión la activamos y probamos contigo.",
  },
  {
    question: "Necesito saber de tecnologia?",
    answer:
      "Para nada. Tú nos das tu carta, tus fotos y tus horarios; nosotros lo dejamos configurado y te enseñamos a usarlo.",
  },
  {
    question: "Como funciona el kiosko?",
    answer:
      "Es una pantalla táctil con navegador. Tus clientes ven el menú, personalizan y pagan con tarjeta o Yape, o eligen pagar en caja. Para imprimir tickets hace falta un PC con Windows y una impresora térmica.",
  },
  {
    question: "Que formas de pago aceptan?",
    answer:
      "Tarjeta y Yape con Culqi, y Yape o Plin por QR con verificación del comprobante. El dinero llega a la cuenta de tu restaurante.",
  },
  {
    question: "¿Puedo verlo antes de decidir?",
    answer:
      "Sí. Te mostramos una tienda de demostración completa y resolvemos tus dudas. La puesta en marcha la hacemos contigo, paso a paso.",
  },
  {
    question: "El bot de WhatsApp realmente funciona?",
    answer:
      "Si, y bastante bien. Usa Claude AI (la misma IA de Anthropic). Entiende como escriben tus clientes, responde preguntas, recomienda platos y toma pedidos completos. Y si el bot no puede con algo, tu intervienes desde el Hub.",
  },
  {
    question: "Solo funciona en Peru?",
    answer:
      "Por ahora solo Perú: Culqi, Yape, Plin y facturación electrónica SUNAT.",
  },
  {
    question: "Cuanto me cobran por pedido?",
    answer:
      "No cobramos comisión por pedido.",
  },
];

export function FAQ() {
  return (
    <Section id="faq">
      <Container className="max-w-3xl">
        <AnimatedSection className="text-center">
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            FAQ
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-sand-900 sm:text-4xl lg:text-5xl">
            Dudas? Aqui las respuestas
          </h2>
          <p className="mt-4 text-lg text-sand-500">
            Lo que mas nos preguntan antes de empezar.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <Accordion.Root type="single" collapsible className="mt-12 space-y-3">
            {faqs.map((faq, i) => (
              <Accordion.Item
                key={i}
                value={`item-${i}`}
                className="group relative overflow-hidden rounded-xl border border-sand-200 bg-white transition-all duration-300 data-[state=open]:border-primary-300 data-[state=open]:shadow-sm"
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl bg-primary-500 opacity-0 transition-opacity duration-300 group-data-[state=open]:opacity-100" />

                <Accordion.Trigger className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-semibold text-sand-900 transition-colors hover:text-primary-600">
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 text-xs font-medium text-sand-300 group-data-[state=open]:text-primary-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {faq.question}
                  </div>
                  <ChevronDown
                    className="h-4 w-4 flex-shrink-0 text-sand-400 transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary-500"
                    aria-hidden="true"
                  />
                </Accordion.Trigger>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[accordion-up_300ms_ease-in-out] data-[state=open]:animate-[accordion-down_300ms_ease-in-out]">
                  <div className="border-t border-sand-100 px-6 py-4 pl-14 text-sm leading-relaxed text-sand-500">
                    {faq.answer}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </AnimatedSection>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.2} className="mt-10 text-center">
          <p className="text-sm text-sand-500">
            Tienes mas preguntas?{" "}
            <a
              href="/contacto"
              className="inline-flex items-center gap-1 font-semibold text-primary-600 transition-colors hover:text-primary-700"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Escribenos
            </a>
          </p>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
