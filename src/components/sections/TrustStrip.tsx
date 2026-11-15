"use client";

import { Container } from "@/components/layout/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

// Integraciones reales del producto (no logos de clientes inventados).
const integrations = [
  "Culqi",
  "Yape",
  "Plin",
  "Nubefact · SUNAT",
  "WhatsApp Business",
  "PedidosYa Envíos",
  "Claude (Anthropic)",
];

function Item({ name }: { name: string }) {
  return (
    <div className="flex h-12 items-center justify-center px-7">
      <span className="whitespace-nowrap text-base font-semibold text-sand-500 transition-colors hover:text-primary-700">
        {name}
      </span>
    </div>
  );
}

export function TrustStrip() {
  return (
    <section className="border-y border-sand-200 bg-white py-8 overflow-hidden">
      <Container>
        <AnimatedSection>
          <p className="mb-5 text-center text-xs font-medium uppercase tracking-wider text-sand-400">
            Funciona con lo que ya usas en Perú
          </p>
        </AnimatedSection>
      </Container>
      <div className="relative">
        {/* Gradient masks on edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent" />

        <div className="animate-marquee flex w-max">
          {[...integrations, ...integrations].map((name, i) => (
            <Item key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}
