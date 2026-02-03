"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Que canales de venta incluye Pedily?",
    answer:
      "Pedily es una plataforma multicanal. Incluye: 1) Tienda web para pedidos online, 2) Bot de WhatsApp con IA para pedidos conversacionales, y 3) Kiosko de autoservicio para que tus clientes ordenen en el local. Los 3 canales llegan al mismo Hub de pedidos.",
  },
  {
    question: "Necesito conocimientos tecnicos para usar Pedily?",
    answer:
      "No. Pedily esta disenado para que cualquier persona pueda configurar su tienda online sin conocimientos de programacion. Nuestra interfaz es intuitiva y ofrecemos guias paso a paso.",
  },
  {
    question: "Como funciona el kiosko de autoservicio?",
    answer:
      "El kiosko es una aplicacion para tablets que tus clientes usan para ordenar en el local sin hacer cola. Muestra tu catalogo, permite personalizar pedidos, y acepta pagos con tarjeta, QR y Yape/Plin via IZIPAY. Los pedidos llegan directo al Hub y a cocina.",
  },
  {
    question: "Que metodos de pago soportan?",
    answer:
      "Soportamos: tarjetas de credito y debito (Culqi para web/WhatsApp, IZIPAY para kiosko), Yape, Plin con verificacion de comprobante, y pago contra entrega. Todos los canales generan facturacion electronica SUNAT automatica (Boleta/Factura).",
  },
  {
    question: "Tienen periodo de prueba?",
    answer:
      "Si! Todos los planes incluyen 14 dias de prueba gratuita sin necesidad de tarjeta de credito. Puedes probar todas las funcionalidades de tu plan elegido sin compromiso.",
  },
  {
    question: "Como funciona el bot de WhatsApp con IA?",
    answer:
      "Nuestro bot usa inteligencia artificial (Claude AI de Anthropic) para entender lo que tus clientes escriben en lenguaje natural. Puede responder preguntas sobre tu menu, recomendar platos, tomar pedidos completos y procesar pagos. Cuando el bot no puede resolver algo, un operador puede tomar el control de la conversacion desde el Hub.",
  },
  {
    question: "En que paises funciona Pedily?",
    answer:
      "Actualmente operamos en Peru con soporte completo para pagos locales (Culqi, IZIPAY, Yape, Plin) y facturacion electronica SUNAT. Estamos expandiendonos a Colombia, Chile y Mexico. Contactanos si estas en otro pais de Latam.",
  },
  {
    question: "Cobran comision por cada pedido?",
    answer:
      "No. A diferencia de los agregadores, cobramos una tarifa fija mensual. No importa si recibes 10 o 10,000 pedidos, tu costo no cambia. Sin comisiones ocultas.",
  },
];

export function FAQ() {
  return (
    <Section id="faq">
      <Container className="max-w-3xl">
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Resolvemos tus dudas sobre Pedily.
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
