"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Check, Sparkles, Zap, Building2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

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
      "Vista de cocina y notificaciones",
      "3 zonas de delivery",
      "Cupones de descuento",
      "Libro de Reclamaciones",
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
      "Bot con IA en WhatsApp, Instagram y Messenger",
      "Tu equipo interviene cuando quiera (takeover)",
      "Cobros con tarjeta (Culqi)",
      "Boleta y Factura SUNAT automatica",
      "Zonas de delivery ilimitadas + condominios",
      "Inventario con alertas de stock",
      "Puntos, cupones y base de clientes",
      "Reportes y analitica de ventas",
      "Hub completo con 5 roles",
      "5 usuarios con permisos por modulo",
      "Pedidos ilimitados",
      "Soporte prioritario",
    ],
  },
  {
    name: "Empresa",
    description: "Para operaciones que quieren control total",
    monthlyPrice: 999,
    annualPrice: 799,
    icon: Building2,
    popular: false,
    features: [
      "Todo de Crecimiento, mas:",
      "Kiosko de autoservicio con IZIPAY",
      "Marketplaces: PedidosYa y Rappi en el Hub",
      "Inventario avanzado, recetas y costos (COGS)",
      "Finanzas: caja, P&L, flujo de caja y compras",
      "Planilla y gestion de tu equipo",
      "Notas de credito y anulaciones SUNAT",
      "Programa de referidos y win-back",
      "Exporta reportes a Excel",
      "Usuarios y locales ilimitados",
      "Tu propio dominio + API",
      "Soporte dedicado + onboarding",
    ],
  },
];

export function PricingTable() {
  const [annual, setAnnual] = useState(false);

  return (
    <Section id="precios" className="relative bg-white">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(59,168,137,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(59,168,137,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <Container className="relative">
        <AnimatedSection className="text-center">
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            Precios
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-sand-900 sm:text-4xl lg:text-5xl">
            Elige tu plan, empieza a vender
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sand-500">
            Tarifa fija, sin comisiones. Vendas 10 o 10,000 pedidos, pagas lo mismo.
          </p>

          <div className="mt-8 inline-flex items-center rounded-full bg-sand-200/80 p-1">
            {[
              { id: false, label: "Mensual" },
              { id: true, label: "Anual" },
            ].map((opt) => (
              <button
                key={String(opt.id)}
                onClick={() => setAnnual(opt.id)}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  annual === opt.id ? "text-sand-900" : "text-sand-500 hover:text-sand-700"
                }`}
              >
                {annual === opt.id && (
                  <motion.div
                    layoutId="pricingToggle"
                    className="absolute inset-0 rounded-full bg-white shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{opt.label}</span>
                {opt.id === true && (
                  <span className="relative z-10 ml-1.5 rounded-full bg-accent-100 px-2 py-0.5 text-xs font-semibold text-accent-700">
                    -20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const price = annual ? plan.annualPrice : plan.monthlyPrice;
            return (
              <AnimatedSection key={plan.name} delay={i * 0.1}>
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-8 transition-all duration-300 ${
                    plan.popular
                      ? "border-2 border-primary-500 bg-white shadow-xl shadow-primary-500/10"
                      : "border-sand-200 bg-white shadow-sm hover:border-sand-300 hover:shadow-md"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary-600 px-4 py-1 text-xs font-semibold text-white shadow-sm">
                      Mas popular
                    </span>
                  )}

                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
                        plan.popular
                          ? "bg-primary-100 text-primary-600"
                          : "bg-sand-100 text-sand-600"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-sand-900">
                        {plan.name}
                      </h3>
                      <p className="mt-0.5 text-sm text-sand-500">
                        {plan.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-sand-100 pt-6">
                    <div className="flex items-baseline gap-1">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={price}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="text-4xl font-bold text-sand-900"
                        >
                          S/ {price}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-sm text-sand-500">/mes</span>
                    </div>
                    {annual && (
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm text-sand-400 line-through">
                          S/ {plan.monthlyPrice}
                        </span>
                        <span className="rounded-full bg-accent-100 px-2 py-0.5 text-xs font-semibold text-accent-700">
                          Ahorras {Math.round((1 - plan.annualPrice / plan.monthlyPrice) * 100)}%
                        </span>
                      </div>
                    )}
                    {!annual && (
                      <p className="mt-1 text-xs text-accent-600">
                        S/ {plan.annualPrice}/mes si pagas anual
                      </p>
                    )}
                  </div>

                  <a
                    href="#cta"
                    className={`mt-6 block rounded-lg py-3 text-center text-sm font-semibold transition-all active:scale-[0.98] ${
                      plan.popular
                        ? "bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:shadow-md"
                        : "border border-sand-200 bg-white text-sand-700 hover:border-sand-300 hover:bg-sand-50"
                    }`}
                  >
                    Probar 14 dias gratis
                  </a>

                  <ul className="mt-8 flex-1 space-y-3">
                    {plan.features.map((feature, fi) => {
                      const isInherit = feature.startsWith("Todo de ");
                      return (
                        <li
                          key={feature}
                          className={`flex items-start gap-2.5 text-sm ${
                            isInherit
                              ? "font-medium text-sand-900"
                              : "text-sand-600"
                          } ${fi === 0 && isInherit ? "pb-2 border-b border-sand-100" : ""}`}
                        >
                          {!isInherit && (
                            <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                              plan.popular ? "bg-primary-50" : "bg-sand-100"
                            }`}>
                              <Check className={`h-3 w-3 ${
                                plan.popular ? "text-primary-600" : "text-sand-500"
                              }`} />
                            </span>
                          )}
                          {feature}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-sand-400">
          Precios en Soles peruanos (PEN), incluyen IGV. Todos los planes incluyen: SSL,
          hosting, soporte tecnico y actualizaciones automaticas.
        </p>
      </Container>
    </Section>
  );
}
