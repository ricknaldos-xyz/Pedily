"use client";

import { Container } from "@/components/layout/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const clients = [
  { name: "Wantan Clan", style: "font-extrabold tracking-tight" },
  { name: "La Polleria", style: "font-bold italic" },
  { name: "Sabor Criollo", style: "font-extrabold uppercase tracking-widest text-sm" },
  { name: "El Buen Gusto", style: "font-bold" },
  { name: "Casa del Pollo", style: "font-extrabold tracking-tight" },
  { name: "Don Pedrito", style: "font-bold italic" },
  { name: "Mar Brava", style: "font-extrabold uppercase tracking-widest text-sm" },
  { name: "Dulces de la Abuela", style: "font-bold" },
];

function LogoItem({ name, style }: { name: string; style: string }) {
  return (
    <div className="flex h-12 items-center justify-center px-8 opacity-40 transition-all duration-500 hover:opacity-100">
      <span className={`whitespace-nowrap text-lg text-slate-500 hover:text-slate-800 transition-colors ${style}`}>
        {name}
      </span>
    </div>
  );
}

export function LogoBar() {
  return (
    <section className="border-y border-slate-100 bg-white py-8 overflow-hidden">
      <Container>
        <AnimatedSection>
          <p className="text-center text-sm font-medium text-slate-400 mb-6">
            Restaurantes que ya venden con Pedily
          </p>
        </AnimatedSection>
      </Container>
      <div className="relative">
        {/* Gradient masks on edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent" />
        
        <div className="animate-marquee flex w-max">
          {/* Duplicate logos for seamless loop */}
          {[...clients, ...clients].map((client, i) => (
            <LogoItem key={`${client.name}-${i}`} name={client.name} style={client.style} />
          ))}
        </div>
      </div>
    </section>
  );
}
