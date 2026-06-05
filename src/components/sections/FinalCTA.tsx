"use client";

import { Container } from "@/components/layout/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowRight, Shield, X as XIcon, Headphones } from "lucide-react";
import { whatsappLink } from "@/lib/site";

const trustItems = [
  { icon: Shield, text: "Sin tarjeta de crédito" },
  { icon: XIcon, text: "Cancela cuando quieras" },
  { icon: Headphones, text: "Onboarding y soporte en Perú" },
];

const WhatsAppGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
  </svg>
);

export function FinalCTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-primary-900 py-20 sm:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(242,65,25,0.16),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_120%,rgba(90,228,188,0.12),transparent)]" />

      <Container className="relative text-center">
        <AnimatedSection variant="scale-up">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
            ¿Listo para vender más y operar mejor?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-primary-100/85">
            Empieza tu prueba gratis o escríbenos por WhatsApp. En minutos
            puedes estar recibiendo pedidos por web, WhatsApp y kiosko.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/contacto"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-primary-800 shadow-warm transition-all hover:bg-primary-50 active:scale-[0.98]"
            >
              Empezar prueba gratis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1ebe5b] active:scale-[0.98]"
            >
              <WhatsAppGlyph />
              Hablar por WhatsApp
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.text}
                  className="flex items-center gap-2 text-sm text-primary-100/70"
                >
                  <Icon className="h-4 w-4" />
                  {item.text}
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
