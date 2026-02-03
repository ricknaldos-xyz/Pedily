"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Wantan Clan",
    role: "Restaurante de comida china - Lima",
    initials: "WC",
    color: "bg-indigo-500",
    quote:
      "Desde que usamos Pedily, nuestros pedidos online crecieron un 40%. Ya no dependemos de agregadores y nuestros clientes nos encuentran directamente.",
    metric: "+40% pedidos",
    rating: 5,
  },
  {
    name: "Dulce Tentacion",
    role: "Pasteleria artesanal - Arequipa",
    initials: "DT",
    color: "bg-emerald-500",
    quote:
      "Configurar nuestra tienda fue super facil. En un dia ya teniamos todo listo con nuestro menu de tortas y postres. El bot de WhatsApp con IA es increible.",
    metric: "Setup en 1 dia",
    rating: 5,
  },
  {
    name: "Cafe La Esquina",
    role: "Cafeteria - Miraflores",
    initials: "CE",
    color: "bg-amber-500",
    quote:
      "Ahorramos miles de soles al mes al no pagar comisiones por cada pedido. Pedily se paga solo con lo que nos ahorramos versus Rappi.",
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
            Negocios que ya confian en Pedily
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Restaurantes, pastelerias y cafeterias que transformaron su negocio
            con nuestra plataforma.
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
