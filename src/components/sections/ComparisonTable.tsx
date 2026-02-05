"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Check, X } from "lucide-react";

const comparisons = [
  {
    feature: "Comisiones por pedido",
    pedily: "0%",
    aggregators: "15-30%",
  },
  {
    feature: "Tu propia marca",
    pedily: true,
    aggregators: false,
  },
  {
    feature: "Datos de tus clientes",
    pedily: true,
    aggregators: false,
  },
  {
    feature: "3 canales (Web, WhatsApp, Kiosko)",
    pedily: true,
    aggregators: false,
  },
  {
    feature: "Bot WhatsApp con IA (Claude)",
    pedily: true,
    aggregators: false,
  },
  {
    feature: "Kiosko de autoservicio en tienda",
    pedily: true,
    aggregators: false,
  },
  {
    feature: "Notificaciones en tiempo real",
    pedily: true,
    aggregators: "Solo estado basico",
  },
  {
    feature: "Programa de fidelizacion y referidos",
    pedily: true,
    aggregators: false,
  },
  {
    feature: "Roles de equipo (cocina, operador, admin)",
    pedily: true,
    aggregators: false,
  },
  {
    feature: "Costo mensual fijo",
    pedily: "Desde S/ 249/mes",
    aggregators: "Variable (% de ventas)",
  },
  {
    feature: "Facturacion electronica SUNAT",
    pedily: true,
    aggregators: "Limitada",
  },
];

function CellValue({ value, winner }: { value: boolean | string; winner?: boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <div className="flex justify-center">
        <div className="rounded-full bg-accent-50 p-1">
          <Check className="h-4 w-4 text-accent-600" aria-label="Incluido" />
        </div>
      </div>
    ) : (
      <div className="flex justify-center">
        <div className="rounded-full bg-red-50 p-1">
          <X className="h-4 w-4 text-red-400" aria-label="No incluido" />
        </div>
      </div>
    );
  }
  return (
    <span className={winner ? "font-semibold text-slate-800" : "text-slate-400"}>
      {value}
    </span>
  );
}

export function ComparisonTable() {
  return (
    <Section className="bg-slate-50">
      <Container>
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Por que dejar de depender de Rappi?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Mira lo que obtienes con Pedily vs lo que te dan (y te quitan) los agregadores.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-500">
                      Caracteristica
                    </th>
                    <th className="px-6 py-4 text-center">
                      <span className="rounded-full bg-primary-100 px-4 py-1 text-sm font-bold text-primary-700">
                        Pedily
                      </span>
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-400">
                      Agregadores
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`transition-colors hover:bg-slate-50/50 ${
                        i < comparisons.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <CellValue value={row.pedily} winner />
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <CellValue value={row.aggregators} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
