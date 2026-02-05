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
  Check,
} from "lucide-react";

// Costos de mercado para armar una solucion similar (USD convertido a PEN ~3.78)
const costosPorSeparado = [
  {
    nombre: "Tienda Web con Checkout",
    descripcion: "ChowNow, GloriaFood Pro, etc.",
    costoUSD: 150,
    costoPEN: 570,
    icon: ShoppingBag,
  },
  {
    nombre: "Bot WhatsApp con IA",
    descripcion: "OrderOnWhats, Botsify, etc.",
    costoUSD: 100,
    costoPEN: 380,
    icon: MessageCircle,
  },
  {
    nombre: "Kiosko de Autoservicio",
    descripcion: "Con integracion de pagos",
    costoUSD: 70,
    costoPEN: 265,
    icon: Monitor,
  },
  {
    nombre: "Hub Administrativo",
    descripcion: "Dashboard de operaciones",
    costoUSD: 75,
    costoPEN: 285,
    icon: LayoutDashboard,
  },
  {
    nombre: "Facturacion SUNAT",
    descripcion: "Nubefact, Efact, etc.",
    costoUSD: 15,
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
    <Section className="bg-gradient-to-b from-primary-50 to-white">
      <Container>
        <AnimatedSection className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100">
            <Calculator className="h-7 w-7 text-primary-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Cuanto vale lo que te da Pedily?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Compara el costo de armar tu propia solucion vs Pedily todo-en-uno.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          {/* Tabs */}
          <div className="mx-auto mt-10 flex max-w-md justify-center gap-2 rounded-xl bg-slate-100 p-1">
            <button
              onClick={() => setTab("build")}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                tab === "build"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              vs Armar por separado
            </button>
            <button
              onClick={() => setTab("aggregators")}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                tab === "aggregators"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              vs Agregadores
            </button>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="mx-auto mt-8 max-w-5xl">
            {tab === "build" ? (
              /* Comparacion vs armar por separado */
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Costos por separado */}
                <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-red-100 p-1">
                      <span className="text-lg">😰</span>
                    </div>
                    <h3 className="text-lg font-bold text-red-700">
                      Si armas tu propia solucion
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">
                    Contratar cada servicio por separado te costaria:
                  </p>

                  <div className="mt-4 space-y-3">
                    {costosPorSeparado.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.nombre}
                          className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-slate-400" />
                            <div>
                              <p className="text-sm font-medium text-slate-700">
                                {item.nombre}
                              </p>
                              <p className="text-xs text-slate-400">
                                {item.descripcion}
                              </p>
                            </div>
                          </div>
                          <p className="font-semibold text-slate-700">
                            {formatCurrency(item.costoPEN)}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                    <p className="font-semibold text-slate-700">Total mensual</p>
                    <p className="text-2xl font-extrabold text-red-600">
                      {formatCurrency(totalPorSeparado)}/mes
                    </p>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">
                    + Setup fees, integracion, mantenimiento...
                  </p>
                </div>

                {/* Pedily */}
                <div className="rounded-2xl border-2 border-accent-300 bg-gradient-to-br from-accent-50 to-white p-6 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-accent-100 p-1">
                      <span className="text-lg">🎉</span>
                    </div>
                    <h3 className="text-lg font-bold text-accent-700">
                      Con Pedily Empresa
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">
                    Todo incluido en una sola plataforma:
                  </p>

                  <div className="mt-4 space-y-2">
                    {costosPorSeparado.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.nombre}
                          className="flex items-center gap-3 rounded-lg bg-white/60 px-4 py-2"
                        >
                          <Check className="h-5 w-5 text-accent-600" />
                          <span className="text-sm font-medium text-slate-700">
                            {item.nombre}
                          </span>
                        </div>
                      );
                    })}
                    <div className="flex items-center gap-3 rounded-lg bg-white/60 px-4 py-2">
                      <Check className="h-5 w-5 text-accent-600" />
                      <span className="text-sm font-medium text-slate-700">
                        CRM + Fidelizacion + Referidos
                      </span>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-white/60 px-4 py-2">
                      <Check className="h-5 w-5 text-accent-600" />
                      <span className="text-sm font-medium text-slate-700">
                        Soporte dedicado + Onboarding
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-accent-200 pt-4">
                    <p className="font-semibold text-slate-700">Todo por</p>
                    <p className="text-2xl font-extrabold text-accent-600">
                      {formatCurrency(pedilyEmpresa)}/mes
                    </p>
                  </div>

                  {/* Ahorro */}
                  <div className="mt-4 rounded-xl bg-accent-600 p-4 text-center text-white">
                    <p className="text-sm font-medium opacity-90">
                      Te ahorras cada mes
                    </p>
                    <p className="text-3xl font-extrabold">
                      {formatCurrency(ahorroVsBuild)}
                    </p>
                    <p className="mt-1 text-sm opacity-90">
                      = {formatCurrency(ahorroVsBuild * 12)} al ano
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Comparacion vs agregadores */
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
                <div className="grid gap-8 lg:grid-cols-2">
                  {/* Input */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700">
                      Tus ventas mensuales online
                    </label>
                    <div className="relative mt-3">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        S/
                      </span>
                      <input
                        type="number"
                        value={ventasMensuales}
                        onChange={(e) =>
                          setVentasMensuales(Number(e.target.value) || 0)
                        }
                        className="w-full rounded-xl border border-slate-200 py-4 pl-10 pr-4 text-2xl font-bold text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      />
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="100000"
                      step="1000"
                      value={ventasMensuales}
                      onChange={(e) => setVentasMensuales(Number(e.target.value))}
                      className="mt-4 w-full accent-primary-600"
                    />
                    <div className="mt-2 flex justify-between text-xs text-slate-400">
                      <span>S/ 5,000</span>
                      <span>S/ 100,000</span>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="space-y-4">
                    <div className="rounded-xl bg-red-50 p-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-red-600">
                        <span>Con Rappi/PedidosYa (25% comision)</span>
                      </div>
                      <p className="mt-1 text-2xl font-bold text-red-700">
                        {formatCurrency(costoRappi)}/mes
                      </p>
                      <p className="mt-1 text-xs text-red-500">
                        + pierdes datos de clientes y control de marca
                      </p>
                    </div>

                    <div className="rounded-xl bg-accent-50 p-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-accent-600">
                        <span>Con Pedily Empresa (0% comision)</span>
                      </div>
                      <p className="mt-1 text-2xl font-bold text-accent-700">
                        {formatCurrency(pedilyEmpresa)}/mes
                      </p>
                      <p className="mt-1 text-xs text-accent-600">
                        Tarifa fija, sin importar cuanto vendas
                      </p>
                    </div>
                  </div>
                </div>

                {/* Savings */}
                <div className="mt-8 grid gap-4 border-t border-slate-100 pt-8 sm:grid-cols-3">
                  <div className="rounded-xl bg-accent-50 p-4 text-center">
                    <PiggyBank className="mx-auto h-6 w-6 text-accent-600" />
                    <p className="mt-2 text-sm font-medium text-accent-700">
                      Ahorro mensual
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-accent-700">
                      {formatCurrency(Math.max(0, ahorroVsRappi))}
                    </p>
                  </div>

                  <div className="rounded-xl bg-accent-50 p-4 text-center">
                    <TrendingUp className="mx-auto h-6 w-6 text-accent-600" />
                    <p className="mt-2 text-sm font-medium text-accent-700">
                      Ahorro anual
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-accent-700">
                      {formatCurrency(Math.max(0, ahorroVsRappi * 12))}
                    </p>
                  </div>

                  <div className="rounded-xl bg-accent-50 p-4 text-center">
                    <Calculator className="mx-auto h-6 w-6 text-accent-600" />
                    <p className="mt-2 text-sm font-medium text-accent-700">
                      Te ahorras
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-accent-700">
                      {ahorroVsRappi > 0
                        ? `${((ahorroVsRappi / costoRappi) * 100).toFixed(0)}%`
                        : "0%"}
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-center text-xs text-slate-400">
                  * Calculo basado en comision promedio de 25% de agregadores vs
                  Plan Empresa S/ 999/mes
                </p>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Bottom note */}
        <AnimatedSection delay={0.3}>
          <p className="mt-8 text-center text-sm text-slate-500">
            <strong>Nota:</strong> Pedily te da los 3 canales de venta (Web +
            WhatsApp + Kiosko) + Hub + SUNAT + CRM + Fidelizacion.{" "}
            <span className="text-primary-600 font-medium">
              Todo en una sola plataforma, un solo precio.
            </span>
          </p>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
