import { PricingTable } from "@/components/sections/PricingTable";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/layout/Container";

export const metadata = {
  title: "Precios | Pedily · Desde S/ 249 al mes con IGV, 0 % de comisión",
  description:
    "Planes de S/ 249, S/ 499 y S/ 999 al mes con IGV incluido y 0 % de comisión por pedido. Alta gratis si te quedas 6 meses; pago anual con 2 meses gratis. Lo que pagas aparte a Culqi, Nubefact y Meta, dicho claro.",
};

export default function PreciosPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-50 to-white pt-14 sm:pt-20">
        <Container className="text-center">
          <h1 className="text-3xl font-extrabold text-sand-900 sm:text-5xl">
            Precios claros, con IGV. 0 % de comisión.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-sand-500 sm:text-lg">
            Una cuota fija al mes. Ni tu restaurante ni tus clientes pagan
            comisión por pedido. Y lo que cobran Culqi, Nubefact y Meta te lo
            decimos aquí mismo.
          </p>
        </Container>
      </section>

      <PricingTable sinTitulo />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
