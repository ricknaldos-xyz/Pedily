"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Mendoza",
    role: "Dueno - Polleria El Lenadito, San Juan de Lurigancho",
    initials: "CM",
    color: "bg-amber-500",
    quote:
      "Teniamos 3 telefonos para atender pedidos y siempre se nos pasaba alguno. Desde que usamos el bot de WhatsApp de Pedily, no perdemos ni un pedido. Aumentamos 35% las ventas en el primer mes y mis hijos ya no tienen que contestar llamadas todo el dia.",
    metric: "+35% ventas",
    rating: 5,
  },
  {
    name: "Rosa Chen",
    role: "Administradora - Chifa Dragon Dorado, La Victoria",
    initials: "RC",
    color: "bg-red-500",
    quote:
      "Rappi nos cobraba casi S/ 6,000 en comisiones al mes. Ahora con Pedily pagamos una fraccion y nuestros clientes piden directo. El bot atiende en chino y espanol, mis clientes mayores lo adoran.",
    metric: "-S/ 5,200/mes",
    rating: 5,
  },
  {
    name: "Miguel Paredes",
    role: "Chef y dueno - Cevicheria Mar Brava, Chorrillos",
    initials: "MP",
    color: "bg-cyan-500",
    quote:
      "Mis clientes me escriben por WhatsApp y el bot les muestra la carta completa con fotos. Recibo el pedido listo en mi cocina. Simple y efectivo.",
    metric: "Automatizado",
    rating: 5,
  },
  {
    name: "Patricia Huaman",
    role: "Fundadora - Dulces de la Abuela, Arequipa",
    initials: "PH",
    color: "bg-pink-500",
    quote:
      "Pense que la tecnologia no era para mi, tengo 58 anos. Pero el equipo de Pedily me ayudo a configurar todo en una tarde. Ahora vendo mis tortas y cupcakes por WhatsApp sin problemas. Mis nietas no lo pueden creer.",
    metric: "Facil de usar",
    rating: 5,
  },
  {
    name: "Fernando Quispe",
    role: "Gerente - Sangucheria El Gordito, Trujillo",
    initials: "FQ",
    color: "bg-orange-500",
    quote:
      "Tenemos 3 locales y antes era un caos coordinar pedidos. Con el dashboard de Pedily veo todo en tiempo real. Ahorramos S/ 4,000 al mes solo en delivery y comisiones de apps.",
    metric: "-S/ 4,000/mes",
    rating: 5,
  },
  {
    name: "Lucia Fernandez",
    role: "Propietaria - Cafe Molido, Miraflores",
    initials: "LF",
    color: "bg-emerald-500",
    quote:
      "El programa de fidelidad de Pedily fue un cambio total. Mis clientes acumulan puntos y regresan mas seguido. Las ventas recurrentes subieron 45% en 3 meses.",
    metric: "+45% recurrencia",
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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.1}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10">
                {/* Decorative quote mark */}
                <div className="absolute -right-2 -top-2 text-8xl font-serif leading-none text-primary-50 transition-colors group-hover:text-primary-100">
                  &ldquo;
                </div>

                {/* Quote icon */}
                <Quote
                  className="relative z-10 h-8 w-8 text-primary-300 transition-colors group-hover:text-primary-400"
                  aria-hidden="true"
                />

                {/* Testimonial text */}
                <blockquote className="relative z-10 mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Star rating */}
                <div className="relative z-10 mt-6 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Author info */}
                <div className="relative z-10 mt-4 flex items-start justify-between gap-3 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${t.color} text-sm font-bold text-white shadow-md ring-2 ring-white`}
                    >
                      {t.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {t.name}
                      </p>
                      <p className="text-xs leading-tight text-slate-400">
                        {t.role}
                      </p>
                    </div>
                  </div>
                  <span className="flex-shrink-0 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
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
