"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Que incluye Pedily exactamente?",
    answer:
      "Tres canales de venta en uno: tu tienda web, un bot de WhatsApp con IA que atiende solo, y un kiosko de autoservicio para tu local. Todo llega al mismo Hub donde gestionas pedidos, pagos y delivery.",
  },
  {
    question: "Necesito saber de tecnologia?",
    answer:
      "Para nada. Si sabes usar WhatsApp y redes sociales, puedes usar Pedily. Es subir fotos, poner precios y listo. Ademas tenemos guias y soporte si te trabas en algo.",
  },
  {
    question: "Como funciona el kiosko?",
    answer:
      "Es una app para tablet. La pones en tu local y tus clientes piden solos: ven el menu, eligen, personalizan, pagan con tarjeta o Yape, y el pedido llega a cocina. Sin cajero, sin colas.",
  },
  {
    question: "Que formas de pago aceptan?",
    answer:
      "Todas las que necesitas: tarjeta (Culqi en web, IZIPAY en kiosko), Yape, Plin, y efectivo contra entrega. Y lo mejor: la boleta o factura sale automatica, directo a SUNAT.",
  },
  {
    question: "Puedo probar antes de pagar?",
    answer:
      "Claro. 14 dias gratis, sin meter tarjeta. Pruebas todo y si no te convence, no pagas nada. Sin letra chica.",
  },
  {
    question: "El bot de WhatsApp realmente funciona?",
    answer:
      "Si, y bastante bien. Usa Claude AI (la misma IA de Anthropic). Entiende como escriben tus clientes, responde preguntas, recomienda platos y toma pedidos completos. Y si el bot no puede con algo, tu intervienes desde el Hub.",
  },
  {
    question: "Solo funciona en Peru?",
    answer:
      "Por ahora si. Tenemos todo integrado para Peru: Culqi, IZIPAY, Yape, Plin y facturacion SUNAT. Estamos trabajando en Colombia, Chile y Mexico. Si estas en otro pais, escribenos.",
  },
  {
    question: "Cuanto me cobran por pedido?",
    answer:
      "Cero. Nada. A diferencia de Rappi o PedidosYa que te cobran 25%, nosotros cobramos una tarifa fija al mes. Vendas 10 o 10,000 pedidos, pagas lo mismo.",
  },
];

export function FAQ() {
  return (
    <Section id="faq">
      <Container className="max-w-3xl">
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Dudas? Aqui las respuestas
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Lo que mas nos preguntan antes de empezar.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <Accordion.Root type="single" collapsible className="mt-12 space-y-3">
            {faqs.map((faq, i) => (
              <Accordion.Item
                key={i}
                value={`item-${i}`}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 data-[state=open]:border-primary-200 data-[state=open]:shadow-md data-[state=open]:shadow-primary-500/5"
              >
                <Accordion.Trigger className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-semibold text-slate-900 transition-colors hover:text-primary-600">
                  {faq.question}
                  <ChevronDown
                    className="h-4 w-4 flex-shrink-0 text-slate-400 transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary-500"
                    aria-hidden="true"
                  />
                </Accordion.Trigger>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[accordion-up_300ms_ease-in-out] data-[state=open]:animate-[accordion-down_300ms_ease-in-out]">
                  <div className="border-t border-slate-100 px-6 py-4 text-sm leading-relaxed text-slate-500">
                    {faq.answer}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
