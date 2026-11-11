"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  Bell,
  ChefHat,
  Boxes,
  Wallet,
  FileText,
  Users,
  BarChart3,
  ReceiptText,
} from "lucide-react";

const modules = [
  {
    icon: Bell,
    title: "Hub de pedidos en tiempo real",
    description:
      "Todos los canales en un tablero. Pedido nuevo → notificación al instante con sonido. Flujo claro: por confirmar, en cocina, listo, en camino, entregado.",
  },
  {
    icon: ChefHat,
    title: "Cocina y producción",
    description:
      "Vista de cocina con comandas, lotes de producción y conteos diarios. Tu equipo siempre sabe qué preparar.",
  },
  {
    icon: Boxes,
    title: "Inventario, recetas y costos",
    description:
      "Stock por almacén con alertas de mínimos, recetas con escandallo y descuento automático de insumos por cada venta. Sabes tu margen real.",
  },
  {
    icon: Wallet,
    title: "Finanzas tipo ERP",
    description:
      "Caja con apertura y cierre cuadrado, P&L, flujo de caja, impuestos, compras a proveedores y planilla de tu equipo. Exporta a Excel.",
  },
  {
    icon: ReceiptText,
    title: "Facturación SUNAT (Nubefact)",
    description:
      "Boleta y factura electrónica automáticas, notas de crédito y anulaciones, con validación de RUC. Incluye Libro de Reclamaciones.",
  },
  {
    icon: BarChart3,
    title: "Reportes y analítica",
    description:
      "Ventas por día, canal, hora y categoría, productos top, heatmap de demanda y estadísticas de cupones. Decisiones con datos, no con olfato.",
  },
  {
    icon: Users,
    title: "Roles y permisos",
    description:
      "Admin, cocina, operador, contabilidad… cada quien ve solo lo suyo, con permisos por módulo. Tu negocio crece con orden.",
  },
  {
    icon: FileText,
    title: "Fidelización y crecimiento",
    description:
      "Puntos, cupones, referidos y vouchers de compensación, integrados con el bot y la tienda. Vende más a quienes ya te compran.",
  },
];

export function OperationsShowcase() {
  return (
    <Section id="operacion" className="bg-cream-100">
      <Container>
        <AnimatedSection className="text-center">
          <span className="mb-4 inline-block rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-600">
            Controla todo el negocio
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-sand-900 sm:text-4xl lg:text-5xl">
            No solo vendes. Operas todo desde un lugar.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sand-500">
            Pedily es el sistema operativo de tu restaurante: pedidos, cocina,
            inventario, finanzas, facturación y equipo. Lo que otros venden por
            separado, aquí viene integrado.
          </p>
        </AnimatedSection>

        {/* Mini dashboard mockup */}
        <AnimatedSection delay={0.1}>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Ventas de hoy", value: "S/ 4,280", trend: "+18%", tone: "text-primary-600" },
              { label: "Pedidos", value: "127", trend: "+12%", tone: "text-primary-600" },
              { label: "Ticket promedio", value: "S/ 85", trend: "+9%", tone: "text-primary-600" },
              { label: "Margen estimado", value: "62%", trend: "COGS auto", tone: "text-sand-400" },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-2xl border border-sand-200 bg-white p-5 shadow-card"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-sand-400">
                  {kpi.label}
                </p>
                <p className="mt-2 text-2xl font-extrabold text-sand-900">
                  {kpi.value}
                </p>
                <p className={`mt-1 text-xs font-semibold ${kpi.tone}`}>
                  {kpi.trend}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-sand-400">Datos de ejemplo</p>
        </AnimatedSection>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((m, i) => (
            <AnimatedSection key={m.title} delay={i * 0.06}>
              <div className="group h-full rounded-2xl border border-sand-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-card-hover">
                <div className="inline-flex rounded-xl bg-primary-50 p-3 ring-1 ring-primary-100 transition-colors group-hover:bg-primary-100">
                  <m.icon className="h-5 w-5 text-primary-600" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-bold text-sand-900">{m.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-sand-500">
                  {m.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}
