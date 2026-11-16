"use client";

import { Container } from "@/components/layout/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { ArrowRight, Check } from "lucide-react";
import { DEMO, demoBotLink, whatsappLink } from "@/lib/site";
import { MESES_PERMANENCIA_ALTA_GRATIS } from "@/lib/planes";

const garantias = [
  "0 % de comisión",
  "Cobras en tu cuenta",
  `Alta gratis con ${MESES_PERMANENCIA_ALTA_GRATIS} meses`,
  "Empresa peruana",
];

export function FinalCTA() {
  const botHref = demoBotLink();
  const waHref = whatsappLink();
  return (
    <section id="cta" className="bg-sand-900 py-10 sm:py-20">
      <Container className="text-center">
        <AnimatedSection>
          <h2 className="text-[1.8rem] font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Tu próximo pedido puede llegar sin comisión
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-sand-300 sm:text-lg">
            Crea tu tienda hoy. El alta es gratis y te acompañamos en cada paso.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/contacto"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary-400 active:scale-[0.98] sm:w-auto"
            >
              Crear mi tienda
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            {botHref ? (
              <a
                href={botHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-4 text-base font-semibold text-white hover:bg-white/10 sm:w-auto"
              >
                <WhatsAppGlyph /> Prueba el bot por WhatsApp
              </a>
            ) : waHref ? (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-4 text-base font-semibold text-white hover:bg-white/10 sm:w-auto"
              >
                <WhatsAppGlyph /> Escríbenos por WhatsApp
              </a>
            ) : (
              <a
                href={DEMO.tiendaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-4 text-base font-semibold text-white hover:bg-white/10 sm:w-auto"
              >
                Mira una tienda de ejemplo
              </a>
            )}
          </div>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-sand-300">
            {garantias.map((g) => (
              <li key={g} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary-400" />
                {g}
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </Container>
    </section>
  );
}
