"use client";

import { Container } from "@/components/layout/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const clients = [
  { name: "Wantan Clan", logo: "/logos/wantan-clan.svg" },
  { name: "La Polleria", logo: "/logos/la-polleria.svg" },
  { name: "Sabor Criollo", logo: "/logos/sabor-criollo.svg" },
  { name: "El Buen Gusto", logo: "/logos/el-buen-gusto.svg" },
  { name: "Casa del Pollo", logo: "/logos/casa-del-pollo.svg" },
];

export function LogoBar() {
  return (
    <section className="border-y border-slate-100 bg-white py-10">
      <Container>
        <AnimatedSection>
          <p className="text-center text-sm font-medium text-slate-400">
            Restaurantes que ya venden con Pedily
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {clients.map((client) => (
              <div
                key={client.name}
                className="flex h-10 items-center justify-center grayscale opacity-60 transition-all hover:grayscale-0 hover:opacity-100"
              >
                <span className="text-lg font-bold text-slate-400 hover:text-slate-600">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
