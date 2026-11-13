import { Footer } from "@/components/layout/Footer";
import { PricingTable } from "@/components/sections/PricingTable";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/layout/Container";

export const metadata = {
  title: "Precios | Pedily - Sin comisiones para tu restaurante",
  description:
    "Sin comisiones por pedido. Tienda web, panel de pedidos, cobros y facturación SUNAT, y como opción bot de WhatsApp y kiosko. Pide tu cotización.",
};

export default function PreciosPage() {
  return (
    <>
      <main>
        <section className="bg-gradient-to-b from-primary-50 to-white py-16 sm:py-24">
          <Container className="text-center">
            <h1 className="text-4xl font-extrabold text-sand-900 sm:text-5xl">
              Un precio a la medida de tu restaurante
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-sand-500">
              Sin comisión por pedido. Te preparamos una cotización según lo que
              necesita tu negocio.
            </p>
          </Container>
        </section>

        <PricingTable />

        <section className="bg-white py-16">
          <Container>
            <h2 className="text-center text-2xl font-bold text-sand-900">
              ¿Qué incluye la instalación?
            </h2>
            <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "SSL y hosting incluido",
                "Soporte tecnico",
                "Demostración guiada",
                "Capacitacion inicial",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-sand-200 bg-sand-50 px-4 py-3 text-center text-sm font-medium text-sand-600"
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
