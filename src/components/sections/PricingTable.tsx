"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Check, Sparkles, Zap, Building2 } from "lucide-react";

const plans = [
  {
    name: "Inicio",
    description: "Ideal si recien empiezas a vender online",
    monthlyPrice: 249,
    annualPrice: 199,
    icon: Zap,
    popular: false,
    features: [
      "Tu tienda web con tu menu completo",
      "Carrito y checkout funcionando",
      "Pagos con Yape, Plin y efectivo",
      "Hub de pedidos en tiempo real",
      "Notificaciones al toque",
      "3 zonas de delivery",
      "Cupones de descuento",
      "2 usuarios para tu equipo",
      "Soporte por email",
    ],
  },
  {
    name: "Crecimiento",
    description: "Para negocios que quieren escalar",
    monthlyPrice: 499,
    annualPrice: 399,
    icon: Sparkles,
    popular: true,
    features: [
      "Todo de Inicio, mas:",
      "Bot WhatsApp con IA (Claude)",
      "Tu intervienes cuando quieras",
      "Cobros con tarjeta (Culqi)",
      "Boleta y Factura SUNAT automatica",
      "Zonas de delivery ilimitadas",
      "Puntos de fidelizacion",
      "Hub completo con 5 roles",
      "Base de datos de clientes",
      "Reportes de ventas",
      "5 usuarios con roles",
      "Pedidos ilimitados",
      "Soporte prioritario",
    ],
  },
  {
    name: "Empresa",
    description: "Para locales con alto volumen",
    monthlyPrice: 999,
    annualPrice: 799,
    icon: Building2,
    popular: false,
    features: [
      "Todo de Crecimiento, mas:",
      "Kiosko de autoservicio con IZIPAY",
      "Delivery con PedidosYa Envios",
      "Programa de referidos",
      "Exporta reportes a Excel",
      "Usuarios y locales ilimitados",
      "Tu propio dominio",
      "Soporte dedicado + onboarding",
      "Acceso a funciones nuevas primero",
      "API para integraciones",
    ],
  },
];

export function PricingTable() {
  const [annual, setAnnual] = useState(false);

  return (
    <Section id="precios" className="bg-slate-50">
      <Container>
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Elige tu plan, empieza a vender
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Tarifa fija, sin comisiones. Vendas 10 o 10,000 pedidos, pagas lo mismo.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-slate-200 p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                !annual
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                annual ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
              }`}
            >
              Anual
              <span className="ml-1.5 rounded-full bg-accent-100 px-2 py-0.5 text-xs font-semibold text-accent-700">
                -20%
              </span>
            </button>
          </div>
        </AnimatedSection>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <AnimatedSection key={plan.name} delay={i * 0.1}>
                <div
                  className={`group relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    plan.popular
                      ? "border-primary-300 bg-white shadow-xl shadow-primary-500/10 ring-1 ring-primary-300"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 px-4 py-1 text-xs font-semibold text-white shadow-md shadow-primary-500/20">
                      Mas popular
                    </span>
                  )}

                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${
                        plan.popular
                          ? "bg-primary-100 text-primary-600"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {plan.name}
                      </h3>
                      <p className="mt-0.5 text-sm text-slate-500">
                        {plan.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-slate-900">
                        S/ {annual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-sm text-slate-500">/mes</span>
                    </div>
                    {annual && (
                      <p className="mt-1 text-xs text-slate-400">
                        Facturado anualmente (S/ {plan.annualPrice * 12}/ano)
                      </p>
                    )}
                    {!annual && (
                      <p className="mt-1 text-xs text-accent-600">
                        S/ {plan.annualPrice}/mes si pagas anual
                      </p>
                    )}
                  </div>

                  <a
                    href="#cta"
                    className={`mt-6 block rounded-xl py-3 text-center text-sm font-semibold transition-all active:scale-[0.98] ${
                      plan.popular
                        ? "bg-primary-600 text-white shadow-md shadow-primary-500/20 hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/25"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Probar 14 dias gratis
                  </a>

                  <ul className="mt-8 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-slate-600"
                      >
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-slate-400">
          Precios en Soles peruanos (PEN), incluyen IGV. Todos los planes incluyen: SSL,
          hosting, soporte tecnico y actualizaciones automaticas.
        </p>
      </Container>
    </Section>
  );
}
