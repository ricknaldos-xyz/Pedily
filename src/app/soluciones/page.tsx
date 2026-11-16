import type { Metadata } from "next";
import { Mosaico } from "@/components/home/Mosaico";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PaginaJsonLd } from "@/components/seo/JsonLd";

const TITULO = "Soluciones para restaurantes | Pedily";
const DESCRIPCION =
  "Asistente de WhatsApp con IA, tienda web, kiosko, QR de mesa, pedidos programados, cocina, caja, boletas SUNAT, delivery, inventario, clientes y reportes. Cada una con todas sus funciones.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: "/soluciones" },
};

export default function Soluciones() {
  return (
    <>
      <PaginaJsonLd ruta="/soluciones" nombre="Soluciones" descripcion={DESCRIPCION} />
      <section className="papel-trama">
        <div className="mx-auto max-w-7xl px-4 pb-4 pt-10 sm:px-6 sm:pt-16 lg:px-8">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-chicha-700">Soluciones</p>
          <h1 className="mt-3 max-w-4xl font-display text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-tinta text-balance sm:text-6xl">
            Todo lo que tu restaurante necesita para vender, operar y que vuelvan
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sand-700">
            Doce piezas que trabajan juntas en un mismo panel. Entra a cada una para ver todas sus funciones, lo que necesitas y lo que no hace.
          </p>
        </div>
      </section>
      <Mosaico />
      <FinalCTA />
    </>
  );
}
