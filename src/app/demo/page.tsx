import type { Metadata } from "next";
import { ArrowUpRight, LayoutDashboard, MonitorSmartphone, Store } from "lucide-react";
import { Boton } from "@/components/marca/Boton";
import { Captura } from "@/components/marca/Captura";
import { MarcoCelular, MarcoKiosko, MarcoNavegador } from "@/components/marca/Marcos";
import { Clip } from "@/components/marca/Clip";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PaginaJsonLd } from "@/components/seo/JsonLd";
import { DEMO, demoBotLink } from "@/lib/site";

const TITULO = "Demo de Pedily: prueba la tienda, el kiosko y el panel";
const DESCRIPCION =
  "Haz un pedido en la tienda de ejemplo, prueba el kiosko de autoservicio y recorre el panel de Pedily por dentro. Sin registrarte.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: "/demo" },
  openGraph: { title: TITULO, description: DESCRIPCION, url: "/demo", locale: "es_PE", type: "website" },
};

/**
 * Demos publicadas (Tramo D, 14-nov): tienda y kiosko con la carta de
 * «Restaurante Demo». El bot solo aparece con NEXT_PUBLIC_DEMO_BOT_WHATSAPP.
 */
export default function Demo() {
  const bot = demoBotLink();
  return (
    <>
      <PaginaJsonLd ruta="/demo" nombre="Demo" descripcion={DESCRIPCION} />
      <section className="papel-trama">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pt-16 lg:px-8">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-chicha-700">Demo</p>
          <h1 className="mt-3 max-w-4xl font-display text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-tinta text-balance sm:text-6xl">
            Pruébalo tú mismo, sin registrarte
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sand-700">
            Pide en la tienda de ejemplo, arma un pedido en el kiosko y recorre el panel. Usan la carta de «Restaurante Demo»; el
            cobro de la demo no está conectado, así que no se cobra nada.
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <article className="flex flex-col rounded-3xl border border-tinta/10 bg-white p-6">
            <Store aria-hidden className="h-7 w-7 text-chicha-600" />
            <h2 className="mt-4 font-display text-2xl font-extrabold text-tinta">La tienda web</h2>
            <p className="mt-2 flex-1 text-[0.98rem] leading-relaxed text-sand-700">
              Lo que ve tu cliente en su celular: carta con fotos, tamaños y cremas, carrito, delivery o recojo y pago.
            </p>
            <div className="my-6">
              <MarcoCelular className="mx-auto w-full max-w-[14rem]">
                <Captura clave="tienda-carta" sizes="240px" />
              </MarcoCelular>
            </div>
            <Boton href={DEMO.tiendaUrl} externo variante="aji" ancho>
              Abrir la tienda
            </Boton>
          </article>

          <article className="flex flex-col rounded-3xl border border-tinta/10 bg-white p-6">
            <MonitorSmartphone aria-hidden className="h-7 w-7 text-chicha-600" />
            <h2 className="mt-4 font-display text-2xl font-extrabold text-tinta">El kiosko</h2>
            <p className="mt-2 flex-1 text-[0.98rem] leading-relaxed text-sand-700">
              La pantalla de autoservicio de tu local: el cliente pide y paga solo. Se ve mejor en una pantalla grande o en modo
              horizontal.
            </p>
            <div className="my-6">
              <MarcoKiosko className="mx-auto w-full max-w-[17rem]">
                <Captura clave="kiosko-carta" sizes="280px" />
              </MarcoKiosko>
            </div>
            <Boton href={DEMO.kioskoUrl} externo variante="aji" ancho>
              Abrir el kiosko
            </Boton>
          </article>

          <article className="flex flex-col rounded-3xl bg-tinta p-6 text-white">
            <LayoutDashboard aria-hidden className="h-7 w-7 text-aji-400" />
            <h2 className="mt-4 font-display text-2xl font-extrabold">El panel</h2>
            <p className="mt-2 flex-1 text-[0.98rem] leading-relaxed text-chicha-100">
              Donde llega todo: pedidos en vivo, cocina, caja, inventario, clientes y reportes. Recórrelo pantalla por pantalla, con
              datos de demostración.
            </p>
            <figure className="my-6">
              <MarcoNavegador url="mirestaurante · panel" oscuro>
                <Clip clave="panel" />
              </MarcoNavegador>
              <figcaption className="mt-2 text-center font-mono text-[10px] uppercase tracking-wider text-chicha-100">
                Pedidos en vivo → reportes → finanzas
              </figcaption>
            </figure>
            <Boton href="/panel" variante="aji" ancho flecha>
              Recorrer el panel
            </Boton>
          </article>
        </div>

        {bot && (
          <div className="mx-auto mt-5 max-w-7xl px-4 sm:px-6 lg:px-8">
            <a
              href={bot}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-[#075e54] p-6 text-white sm:flex-row sm:items-center"
            >
              <span className="flex items-center gap-4">
                <WhatsAppGlyph className="h-10 w-10 shrink-0" />
                <span>
                  <span className="block font-display text-2xl font-extrabold">Prueba el asistente por WhatsApp</span>
                  <span className="block text-sm text-white/80">Escríbele como a un restaurante: te arma el pedido con la carta de la demo.</span>
                </span>
              </span>
              <span className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-5 font-semibold text-[#075e54]">
                Abrir WhatsApp <ArrowUpRight aria-hidden className="h-4 w-4" />
              </span>
            </a>
          </div>
        )}
      </section>

      <FinalCTA titulo="¿Te gustó? Ahora con tu carta" bajada="Crea tu tienda y te ayudamos a dejarla lista. El alta es gratis si te quedas 6 meses." />
    </>
  );
}
