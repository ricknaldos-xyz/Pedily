"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Wantan Clan",
    role: "Comida china - Lima",
    initials: "WC",
    color: "bg-indigo-500",
    quote:
      "Antes dependiamos de Rappi y nos comian las comisiones. Ahora vendemos directo, nuestros clientes nos escriben por WhatsApp y el bot los atiende de una. 40% mas pedidos en 3 meses.",
    metric: "+40% pedidos",
    rating: 5,
  },
  {
    name: "Dulce Tentacion",
    role: "Pasteleria artesanal - Arequipa",
    initials: "DT",
    color: "bg-emerald-500",
    quote:
      "Pense que iba a ser complicado pero no. En un dia tenia mi tienda lista con todas mis tortas. Y el bot de WhatsApp es genial, mis clientas lo aman.",
    metric: "Listo en 1 dia",
    rating: 5,
  },
  {
    name: "Cafe La Esquina",
    role: "Cafeteria - Miraflores",
    initials: "CE",
    color: "bg-amber-500",
    quote:
      "Con lo que pagaba de comisiones en Rappi ahora pago Pedily todo el ano y me sobra. Los numeros no mienten, ahorramos mas de 3 mil soles al mes.",
    metric: "-S/ 3,500/mes",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <Section id="testimonios">
      <Container>
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Negocios reales, resultados reales
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Mira lo que dicen los que ya venden con Pedily.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.1}>
              <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/5">
                <Quote
                  className="h-8 w-8 text-primary-200 transition-colors group-hover:text-primary-300"
                  aria-hidden="true"
                />

                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                  {t.quote}
                </blockquote>

                <div className="mt-6 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${t.color} text-sm font-bold text-white shadow-sm`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {t.name}
                      </p>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-bold text-accent-700">
                    {t.metric}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}
