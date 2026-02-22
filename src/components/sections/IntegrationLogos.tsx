"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { MessageCircle, Bike, Bot } from "lucide-react";

interface Integration {
  name: string;
  description: string;
  logo: React.ReactNode;
  brandColor: string;
  hoverBg: string;
}

function CulqiLogo() {
  return (
    <svg viewBox="0 0 100 32" className="h-8 w-auto" fill="currentColor">
      <text x="0" y="24" fontSize="22" fontWeight="700" fontFamily="system-ui">
        culqi
      </text>
    </svg>
  );
}

function IzipayLogo() {
  return (
    <svg viewBox="0 0 100 32" className="h-8 w-auto" fill="currentColor">
      <text x="0" y="24" fontSize="20" fontWeight="700" fontFamily="system-ui">
        IZIPAY
      </text>
    </svg>
  );
}

function NubefactLogo() {
  return (
    <svg viewBox="0 0 120 32" className="h-8 w-auto" fill="currentColor">
      <text x="0" y="24" fontSize="20" fontWeight="600" fontFamily="system-ui">
        nubefact
      </text>
    </svg>
  );
}

const integrations: Integration[] = [
  {
    name: "Culqi",
    description: "Pagos online",
    logo: <CulqiLogo />,
    brandColor: "hover:text-[#00D1A1]",
    hoverBg: "hover:bg-[#00D1A1]/5",
  },
  {
    name: "IZIPAY",
    description: "Pagos en kiosko",
    logo: <IzipayLogo />,
    brandColor: "hover:text-[#FF6B00]",
    hoverBg: "hover:bg-[#FF6B00]/5",
  },
  {
    name: "Nubefact",
    description: "Facturacion SUNAT",
    logo: <NubefactLogo />,
    brandColor: "hover:text-[#2563EB]",
    hoverBg: "hover:bg-[#2563EB]/5",
  },
  {
    name: "WhatsApp Business",
    description: "Pedidos por chat",
    logo: <MessageCircle className="h-8 w-8" />,
    brandColor: "hover:text-[#25D366]",
    hoverBg: "hover:bg-[#25D366]/5",
  },
  {
    name: "PedidosYa",
    description: "Delivery integrado",
    logo: <Bike className="h-8 w-8" />,
    brandColor: "hover:text-[#FA0050]",
    hoverBg: "hover:bg-[#FA0050]/5",
  },
  {
    name: "Claude AI",
    description: "Bot inteligente",
    logo: <Bot className="h-8 w-8" />,
    brandColor: "hover:text-[#D97706]",
    hoverBg: "hover:bg-[#D97706]/5",
  },
];

export function IntegrationLogos() {
  return (
    <Section className="bg-slate-50">
      <Container>
        <AnimatedSection className="text-center">
          <span className="mb-4 inline-flex items-center rounded-full bg-gradient-to-r from-primary-50 to-accent-50 px-4 py-1.5 text-sm font-semibold text-primary-700 ring-1 ring-primary-200/50">
            Integraciones
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            Integrado con las mejores plataformas
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Conectamos con los servicios que ya usas
          </p>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {integrations.map((integration, i) => (
            <AnimatedSection key={integration.name} delay={i * 0.08} variant="scale-up">
              <div
                className={`group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg ${integration.hoverBg}`}
              >
                <div
                  className={`text-slate-400 transition-all duration-300 ${integration.brandColor} group-hover:scale-110`}
                >
                  {integration.logo}
                </div>
                <span className="mt-3 text-sm font-semibold text-slate-700">
                  {integration.name}
                </span>
                <span className="mt-1 text-xs text-slate-400">
                  {integration.description}
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}
