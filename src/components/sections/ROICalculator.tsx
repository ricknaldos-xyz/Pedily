"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  Calculator,
  TrendingUp,
  PiggyBank,
  ShoppingBag,
  MessageCircle,
  Monitor,
  LayoutDashboard,
  FileText,
  Boxes,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";

const costosPorSeparado = [
  {
    nombre: "Tienda Web con Checkout",
    descripcion: "ChowNow, GloriaFood Pro, etc.",
    costoPEN: 570,
    icon: ShoppingBag,
  },
  {
    nombre: "Bot WhatsApp con IA",
    descripcion: "OrderOnWhats, Botsify, etc.",
    costoPEN: 380,
    icon: MessageCircle,
  },
  {
    nombre: "Kiosko de Autoservicio",
    descripcion: "Con integracion de pagos",
    costoPEN: 265,
    icon: Monitor,
  },
  {
    nombre: "Hub Administrativo",
    descripcion: "Dashboard de operaciones",
    costoPEN: 285,
    icon: LayoutDashboard,
  },
  {
    nombre: "Inventario y Finanzas (POS/ERP)",
    descripcion: "Stock, recetas, caja, P&L",
    costoPEN: 350,
    icon: Boxes,
  },
  {
    nombre: "Facturacion SUNAT",
    descripcion: "Nubefact, Efact, etc.",
    costoPEN: 60,
    icon: FileText,
  },
];

const totalPorSeparado = costosPorSeparado.reduce((acc, item) => acc + item.costoPEN, 0);

export function ROICalculator() {
  const [tab, setTab] = useState<"build" | "aggregators">("build");
  const [ventasMensuales, setVentasMensuales] = useState(30000);

  const comisionRappi = 0.25;
  const pedilyEmpresa = 999;

  const costoRappi = ventasMensuales * comisionRappi;
  const ahorroVsRappi = costoRappi - pedilyEmpresa;
  const ahorroVsBuild = totalPorSeparado - pedilyEmpresa;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Section className="bg-sand-50">
      <Container>
        <AnimatedSection className="text-center">
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            Calculadora
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-sand-900 sm:text-4xl lg:text-5xl">
            Cuanto vale lo que te da Pedily?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sand-500">
            Compara el costo de armar tu propia solucion vs Pedily todo-en-uno.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          {/* Segmented control tabs */}
          <div className="mt-10 flex justify-center">
            <div className="relative inline-flex rounded-2xl bg-sand-100 p-1">
              {[
                { id: "build" as const, label: "vs Armar por separado" },
                { id: "aggregators" as const, label: "vs Agregadores" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative z-10 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                    tab === t.id ? "text-white" : "text-sand-600 hover:text-sand-800"
                  }`}
                >
                  {tab === t.id && (
                    <motion.div
                      layoutId="roiTab"
                      className="absolute inset-0 rounded-xl bg-primary-600 shadow-md"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="mx-auto mt-8 max-w-5xl">
            {tab === "build" ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Costos por separado */}
                <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-sand-900">
                      Si armas tu propia solucion
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-sand-500">
                    Contratar cada servicio por separado te costaria:
                  </p>

                  <div className="mt-4 space-y-3">
                    {costosPorSeparado.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.nombre}
                          className="flex items-center justify-between rounded-xl bg-sand-50 px-4 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-4 w-4 text-sand-400" />
                            <div>
                              <p className="text-sm font-medium text-sand-700">
                                {item.nombre}
                              </p>
                              <p className="text-xs text-sand-400">
                                {item.descripcion}
                              </p>
                            </div>
                          </div>
                          <p className="font-semibold text-sand-700">
                            {formatCurrency(item.costoPEN)}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-sand-200 pt-4">
                    <p className="font-semibold text-sand-700">Total mensual</p>
                    <p className="text-2xl font-bold text-sand-900">
                      {formatCurrency(totalPorSeparado)}/mes
                    </p>
                  </div>
                  <p className="mt-2 text-xs text-sand-400">
                    + Setup fees, integracion, mantenimiento...
                  </p>
                </div>

                {/* Pedily */}
                <div className="rounded-2xl border-2 border-primary-500 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-sand-900">
                      Con Pedily Empresa
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-sand-500">
                    Todo incluido en una sola plataforma:
                  </p>

                  <div className="mt-4 space-y-2">
                    {costosPorSeparado.map((item) => (
                      <div
                        key={item.nombre}
                        className="flex items-center gap-3 rounded-xl bg-white/60 px-4 py-2"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-100">
                          <Check className="h-3 w-3 text-accent-600" />
                        </span>
                        <span className="text-sm font-medium text-sand-700">
                          {item.nombre}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center gap-3 rounded-xl bg-white/60 px-4 py-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-100">
                        <Check className="h-3 w-3 text-accent-600" />
                      </span>
                      <span className="text-sm font-medium text-sand-700">
                        CRM + Fidelizacion + Referidos
                      </span>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-white/60 px-4 py-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-100">
                        <Check className="h-3 w-3 text-accent-600" />
                      </span>
                      <span className="text-sm font-medium text-sand-700">
                        Soporte dedicado + Onboarding
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-sand-200 pt-4">
                    <p className="font-semibold text-sand-700">Todo por</p>
                    <p className="text-2xl font-bold text-primary-600">
                      {formatCurrency(pedilyEmpresa)}/mes
                    </p>
                  </div>

                  <div className="mt-4 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 p-4 text-center text-white">
                    <p className="text-sm font-medium opacity-90">
                      Te ahorras cada mes
                    </p>
                    <p className="text-3xl font-bold">
                      {formatCurrency(ahorroVsBuild)}
                    </p>
                    <p className="mt-1 text-sm opacity-90">
                      = {formatCurrency(ahorroVsBuild * 12)} al ano
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="grid gap-8 lg:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-sand-700">
                      Tus ventas mensuales online
                    </label>
                    <div className="relative mt-3">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sand-400">
                        S/
                      </span>
                      <input
                        type="number"
                        value={ventasMensuales}
                        onChange={(e) =>
                          setVentasMensuales(Number(e.target.value) || 0)
                        }
                        className="w-full rounded-xl border border-sand-200 py-4 pl-10 pr-4 text-2xl font-bold text-sand-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      />
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="100000"
                      step="1000"
                      value={ventasMensuales}
                      onChange={(e) => setVentasMensuales(Number(e.target.value))}
                      className="mt-4 w-full"
                    />
                    <div className="mt-2 flex justify-between text-xs text-sand-400">
                      <span>S/ 5,000</span>
                      <span>S/ 100,000</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-xl border border-sand-200 bg-white p-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-sand-600">
                        <span>Con Rappi/PedidosYa (25% comision)</span>
                      </div>
                      <p className="mt-1 text-2xl font-bold text-sand-900">
                        {formatCurrency(costoRappi)}/mes
                      </p>
                      <p className="mt-1 text-xs text-sand-400">
                        + pierdes datos de clientes y control de marca
                      </p>
                    </div>

                    <div className="rounded-xl border-2 border-primary-500 bg-white p-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-primary-600">
                        <span>Con Pedily Empresa (0% comision)</span>
                      </div>
                      <p className="mt-1 text-2xl font-bold text-sand-900">
                        {formatCurrency(pedilyEmpresa)}/mes
                      </p>
                      <p className="mt-1 text-xs text-sand-500">
                        Tarifa fija, sin importar cuanto vendas
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 border-t border-sand-100 pt-8 sm:grid-cols-3">
                  <div className="rounded-xl bg-sand-50 p-4 text-center">
                    <PiggyBank className="mx-auto h-6 w-6 text-sand-600" />
                    <p className="mt-2 text-sm font-medium text-sand-700">
                      Ahorro mensual
                    </p>
                    <p className="mt-1 text-2xl font-bold text-sand-900">
                      {formatCurrency(Math.max(0, ahorroVsRappi))}
                    </p>
                  </div>

                  <div className="rounded-xl bg-sand-50 p-4 text-center">
                    <TrendingUp className="mx-auto h-6 w-6 text-sand-600" />
                    <p className="mt-2 text-sm font-medium text-sand-700">
                      Ahorro anual
                    </p>
                    <p className="mt-1 text-2xl font-bold text-sand-900">
                      {formatCurrency(Math.max(0, ahorroVsRappi * 12))}
                    </p>
                  </div>

                  <div className="rounded-xl bg-sand-50 p-4 text-center">
                    <Calculator className="mx-auto h-6 w-6 text-sand-600" />
                    <p className="mt-2 text-sm font-medium text-sand-700">
                      Te ahorras
                    </p>
                    <p className="mt-1 text-2xl font-bold text-sand-900">
                      {ahorroVsRappi > 0
                        ? `${((ahorroVsRappi / costoRappi) * 100).toFixed(0)}%`
                        : "0%"}
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-center text-xs text-sand-400">
                  * Calculo basado en comision promedio de 25% de agregadores vs
                  Plan Empresa S/ 999/mes
                </p>
              </div>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <p className="mt-8 text-center text-sm text-sand-500">
            <strong>Nota:</strong> Pedily te da los canales de venta (Web +
            WhatsApp + Kiosko) + Hub + facturación SUNAT + inventario + finanzas
            + fidelización.{" "}
            <span className="text-primary-600 font-medium">
              Todo en una sola plataforma, un solo precio.
            </span>
          </p>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
