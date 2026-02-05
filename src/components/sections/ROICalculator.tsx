"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Calculator, TrendingUp, PiggyBank } from "lucide-react";

export function ROICalculator() {
  const [ventasMensuales, setVentasMensuales] = useState(30000);
  const comisionRappi = 0.25;
  const pedilyEmpresa = 999;

  const costoRappi = ventasMensuales * comisionRappi;
  const ahorro = costoRappi - pedilyEmpresa;
  const ahorroAnual = ahorro * 12;
  const porcentajeAhorro = ((ahorro / costoRappi) * 100).toFixed(0);

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
            Cuanto te ahorras con Pedily?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Compara lo que pagas a los agregadores vs una tarifa fija sin comisiones.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="mx-auto mt-12 max-w-4xl">
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
                      onChange={(e) => setVentasMensuales(Number(e.target.value) || 0)}
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
                      <span>Con Rappi/PedidosYa (25%)</span>
                    </div>
                    <p className="mt-1 text-2xl font-bold text-red-700">
                      {formatCurrency(costoRappi)}/mes
                    </p>
                  </div>

                  <div className="rounded-xl bg-primary-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-primary-600">
                      <span>Con Pedily Empresa</span>
                    </div>
                    <p className="mt-1 text-2xl font-bold text-primary-700">
                      {formatCurrency(pedilyEmpresa)}/mes
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
                    {formatCurrency(Math.max(0, ahorro))}
                  </p>
                </div>

                <div className="rounded-xl bg-accent-50 p-4 text-center">
                  <TrendingUp className="mx-auto h-6 w-6 text-accent-600" />
                  <p className="mt-2 text-sm font-medium text-accent-700">
                    Ahorro anual
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-accent-700">
                    {formatCurrency(Math.max(0, ahorroAnual))}
                  </p>
                </div>

                <div className="rounded-xl bg-accent-50 p-4 text-center">
                  <Calculator className="mx-auto h-6 w-6 text-accent-600" />
                  <p className="mt-2 text-sm font-medium text-accent-700">
                    Te ahorras
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-accent-700">
                    {ahorro > 0 ? `${porcentajeAhorro}%` : "0%"}
                  </p>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-slate-400">
                * Calculo basado en comision promedio de 25% de agregadores vs Plan Empresa S/ 999/mes
              </p>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
