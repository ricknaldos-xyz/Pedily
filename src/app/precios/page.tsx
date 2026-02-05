import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PricingTable } from "@/components/sections/PricingTable";
import { ROICalculator } from "@/components/sections/ROICalculator";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/layout/Container";

export const metadata = {
  title: "Precios | Pedily - Planes sin comisiones para tu restaurante",
  description:
    "Planes desde S/ 249/mes. Sin comisiones por pedido. Incluye tienda web, bot WhatsApp con IA, kiosko y mas. Compara cuanto ahorras vs Rappi.",
};

export default function PreciosPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-gradient-to-b from-primary-50 to-white py-16 sm:py-24">
          <Container className="text-center">
            <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
              Precios simples, sin sorpresas
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
              Tarifa fija mensual. Vendas 10 pedidos o 10,000, pagas lo mismo.
              Sin comisiones, sin letra chica.
            </p>
          </Container>
        </section>

        <PricingTable />
        <ROICalculator />

        <section className="bg-white py-16">
          <Container>
            <h2 className="text-center text-2xl font-bold text-slate-900">
              Que incluyen todos los planes?
            </h2>
            <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "SSL y hosting incluido",
                "Soporte tecnico",
                "Actualizaciones automaticas",
                "Sin contratos de permanencia",
                "Backups diarios",
                "14 dias de prueba gratis",
                "Migracion asistida",
                "Capacitacion inicial",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-medium text-slate-600"
                >
                  {item}
                </div>
              ))}
            </div>
          </Container>
        </section>

        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
