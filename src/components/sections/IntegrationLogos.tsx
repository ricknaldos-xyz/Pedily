"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  CreditCard,
  FileText,
  MessageCircle,
  Bike,
  Bot,
  Wallet,
  MapPin,
} from "lucide-react";

const integrations = [
  {
    name: "Culqi",
    category: "Pagos",
    description: "Cobra con tarjeta en tu web y bot de WhatsApp",
    icon: CreditCard,
    iconBg: "bg-primary-50",
    iconColor: "text-primary-600",
    hoverBorder: "hover:border-primary-300",
  },
  {
    name: "Yape y Plin",
    category: "Pagos",
    description: "Billeteras digitales, automatico o con comprobante",
    icon: Wallet,
    iconBg: "bg-primary-50",
    iconColor: "text-primary-600",
    hoverBorder: "hover:border-primary-300",
  },
  {
    name: "Nubefact · SUNAT",
    category: "Facturacion",
    description: "Boleta, factura, nota de credito y anulacion",
    icon: FileText,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    hoverBorder: "hover:border-blue-300",
  },
  {
    name: "WhatsApp Business",
    category: "Canal",
    description: "Pedidos por chat con IA",
    icon: MessageCircle,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    hoverBorder: "hover:border-green-300",
  },
  {
    name: "PedidosYa Envíos",
    category: "Delivery",
    description: "Motorizados para tus pedidos cuando no tienes repartidor propio",
    icon: Bike,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    hoverBorder: "hover:border-rose-300",
  },
  {
    name: "Claude AI",
    category: "IA",
    description: "El cerebro del bot que atiende y toma pedidos 24/7",
    icon: Bot,
    iconBg: "bg-cream-200",
    iconColor: "text-cream-700",
    hoverBorder: "hover:border-cream-400",
  },
  {
    name: "Google Maps",
    category: "Delivery",
    description: "Direcciones, cobertura por zona y costo de envio",
    icon: MapPin,
    iconBg: "bg-primary-50",
    iconColor: "text-primary-600",
    hoverBorder: "hover:border-primary-300",
  },
];

const extras = ["Tu dominio propio", "SSL incluido"];

export function IntegrationLogos() {
  return (
    <Section className="bg-white">
      <Container>
        <AnimatedSection className="text-center">
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            Integraciones
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-sand-900 sm:text-4xl lg:text-5xl">
            Todo conectado, listo para usar
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sand-500">
            Pagos, facturación SUNAT, delivery e IA, conectados
            entre sí.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration, i) => {
            const Icon = integration.icon;
            return (
              <AnimatedSection
                key={integration.name}
                delay={i * 0.08}
                className="sm:last:col-span-2 sm:last:mx-auto sm:last:w-full sm:last:max-w-md lg:last:col-span-1 lg:last:col-start-2 lg:last:max-w-none"
              >
                <div
                  className={`group flex items-start gap-4 rounded-2xl border border-sand-200 bg-white p-6 transition-all duration-300 hover:shadow-md ${integration.hoverBorder}`}
                >
                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${integration.iconBg}`}
                  >
                    <Icon
                      className={`h-6 w-6 ${integration.iconColor}`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-sand-900">
                        {integration.name}
                      </h3>
                      <span className="rounded-full bg-sand-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-sand-500">
                        {integration.category}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-sand-500">
                      {integration.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={0.5}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-medium text-sand-400">
              Tambien compatible con
            </span>
            {extras.map((extra) => (
              <span
                key={extra}
                className="rounded-full border border-sand-200 bg-sand-50 px-3 py-1 text-xs font-medium text-sand-500"
              >
                {extra}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
