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
}

// Custom SVG logos for integrations
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
  },
  {
    name: "IZIPAY",
    description: "Pagos en kiosko",
    logo: <IzipayLogo />,
    brandColor: "hover:text-[#FF6B00]",
  },
  {
    name: "Nubefact",
    description: "Facturacion SUNAT",
    logo: <NubefactLogo />,
    brandColor: "hover:text-[#2563EB]",
  },
  {
    name: "WhatsApp Business",
    description: "Pedidos por chat",
    logo: <MessageCircle className="h-8 w-8" />,
    brandColor: "hover:text-[#25D366]",
  },
  {
    name: "PedidosYa",
    description: "Delivery integrado",
    logo: <Bike className="h-8 w-8" />,
    brandColor: "hover:text-[#FA0050]",
  },
  {
    name: "Claude AI",
    description: "Bot inteligente",
    logo: <Bot className="h-8 w-8" />,
    brandColor: "hover:text-[#D97706]",
  },
];

export function IntegrationLogos() {
  return (
    <Section className="bg-slate-50">
      <Container>
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Integrado con las mejores plataformas
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Conectamos con los servicios que ya usas
          </p>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {integrations.map((integration, i) => (
            <AnimatedSection key={integration.name} delay={i * 0.08}>
              <div
                className={`group flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50`}
              >
                <div
                  className={`text-slate-400 transition-colors duration-300 ${integration.brandColor}`}
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
