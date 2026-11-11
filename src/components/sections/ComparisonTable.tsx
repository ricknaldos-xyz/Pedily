"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Check, X } from "lucide-react";

const comparisons = [
  { feature: "Comisiones por pedido", pedily: "0%", aggregators: "15-30%" },
  { feature: "Tu propia marca", pedily: true, aggregators: false },
  { feature: "Datos de tus clientes", pedily: true, aggregators: false },
  { feature: "3 canales (Web, WhatsApp, Kiosko)", pedily: true, aggregators: false },
  { feature: "Bot WhatsApp con IA (Claude)", pedily: true, aggregators: false },
  { feature: "Kiosko de autoservicio en tienda", pedily: true, aggregators: false },
  { feature: "Notificaciones en tiempo real", pedily: true, aggregators: "Solo estado basico" },
  { feature: "Cupones y base de clientes propia", pedily: true, aggregators: false },
  { feature: "Inventario, recetas y control de costos", pedily: true, aggregators: false },
  { feature: "Finanzas: caja, P&L y planilla", pedily: true, aggregators: false },
  { feature: "Pedidos de Rappi y PedidosYa en tu Hub", pedily: true, aggregators: "N/A" },
  { feature: "Roles de equipo (cocina, operador, admin)", pedily: true, aggregators: false },
  { feature: "Facturacion electronica SUNAT", pedily: true, aggregators: "Limitada" },
];

function CellValue({ value, winner }: { value: boolean | string; winner?: boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <div className="flex justify-center">
        <div className="rounded-full bg-accent-50 p-1.5 shadow-sm shadow-accent-200/50">
          <Check className="h-4 w-4 text-accent-600" aria-label="Incluido" />
        </div>
      </div>
    ) : (
      <div className="flex justify-center">
        <div className="rounded-full bg-sand-50 p-1.5">
          <X className="h-4 w-4 text-sand-300" aria-label="No incluido" />
        </div>
      </div>
    );
  }
  return (
    <span className={winner ? "font-semibold text-sand-800" : "text-sm text-sand-400"}>
      {value}
    </span>
  );
}

export function ComparisonTable() {
  return (
    <Section className="bg-sand-50">
      <Container>
        <AnimatedSection className="text-center">
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            Comparativa
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-sand-900 sm:text-4xl lg:text-5xl">
            Por que dejar de depender de Rappi?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sand-500">
            Mira lo que obtienes con Pedily vs lo que te dan (y te quitan) los agregadores.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2} variant="scale-up">
          <div className="relative mt-12">
            {/* Scroll indicators for mobile */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-4 bg-gradient-to-r from-sand-50 to-transparent sm:hidden" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-4 bg-gradient-to-l from-sand-50 to-transparent sm:hidden" />

            <div className="overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-sand-200 bg-sand-50/80">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-sand-500">
                        Caracteristica
                      </th>
                      <th className="bg-sand-50 px-6 py-4 text-center">
                        <span className="rounded-full bg-primary-600 px-4 py-1 text-sm font-semibold text-white">
                          Pedily
                        </span>
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-sand-400">
                        Agregadores
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((row, i) => (
                      <tr
                        key={row.feature}
                        className={`transition-colors hover:bg-sand-50 ${
                          i < comparisons.length - 1 ? "border-b border-sand-100" : ""
                        } ${i % 2 === 1 ? "bg-sand-50/30" : ""}`}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-sand-700">
                          {row.feature}
                        </td>
                        <td className="bg-sand-50/50 px-6 py-4 text-center text-sm">
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
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
