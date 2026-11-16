"use client";

import { Container } from "@/components/layout/Container";
import { Bloque } from "@/components/layout/Bloque";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { FAQS } from "@/lib/faq";

export function FAQ() {
  return (
    <Bloque id="faq" className="bg-white">
      <Container className="max-w-3xl">
        <AnimatedSection className="text-center">
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            Preguntas frecuentes
          </span>
          <h2 className="text-[1.7rem] font-extrabold leading-tight tracking-tight text-sand-900 sm:text-4xl">
            Lo que todos preguntan antes de empezar
          </h2>
          <p className="mt-4 text-lg text-sand-500">
            Precio, permanencia, dinero y lo que pagas aparte, sin letra chica.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <Accordion.Root type="single" collapsible className="mt-6 space-y-2">
            {FAQS.map((faq, i) => (
              <Accordion.Item
                key={i}
                value={`item-${i}`}
                className="group relative overflow-hidden rounded-xl border border-sand-200 bg-white transition-all duration-300 data-[state=open]:border-primary-300 data-[state=open]:shadow-sm"
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl bg-primary-500 opacity-0 transition-opacity duration-300 group-data-[state=open]:opacity-100" />

                <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-4 text-left text-[15px] sm:px-6 font-semibold text-sand-900 transition-colors hover:text-primary-600">
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 text-xs font-medium text-sand-300 group-data-[state=open]:text-primary-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {faq.pregunta}
                  </div>
                  <ChevronDown
                    className="h-4 w-4 flex-shrink-0 text-sand-400 transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary-500"
                    aria-hidden="true"
                  />
                </Accordion.Trigger>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[accordion-up_300ms_ease-in-out] data-[state=open]:animate-[accordion-down_300ms_ease-in-out]">
                  <div className="border-t border-sand-100 px-4 py-4 text-sm sm:px-6 sm:pl-14 leading-relaxed text-sand-500">
                    {faq.respuesta}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </AnimatedSection>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.2} className="mt-6 text-center">
          <p className="text-sm text-sand-500">
            ¿Tienes otra pregunta?{" "}
            <a
              href="/contacto"
              className="inline-flex items-center gap-1 font-semibold text-primary-600 transition-colors hover:text-primary-700"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Escríbenos
            </a>
          </p>
        </AnimatedSection>
      </Container>
    </Bloque>
  );
}
