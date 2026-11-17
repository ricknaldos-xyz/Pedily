import type { Metadata } from "next";
import { ArrowUpRight, LayoutDashboard, MonitorSmartphone, Store } from "lucide-react";
import { Boton } from "@/components/marca/Boton";
import { Captura } from "@/components/marca/Captura";
import { MarcoCelular, MarcoKiosko, MarcoNavegador } from "@/components/marca/Marcos";
import { Clip } from "@/components/marca/Clip";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Personalizador } from "@/components/home/Personalizador";
import { RecorridoGuiado } from "@/components/producto/RecorridoGuiado";
import { TOTAL_PANTALLAS } from "@/lib/panel";
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
 * L-03 (16-nov): entradas directas a la carta de cada demo, recorrido guiado
 * del panel que se puede tocar (capturas reales, sin cuentas), el
 * personalizador (antes en la home) y un CTA final sin «Ver la demo».
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
                <Captura clave="tienda-carta" sizes="240px" prioridad />
              </MarcoCelular>
            </div>
            <Boton href={DEMO.tiendaUrl} externo variante="aji" ancho>
              Abrir la tienda
            </Boton>
            <a href={DEMO.tiendaCartaUrl} target="_blank" rel="noopener noreferrer" className="mt-3 text-center text-sm font-semibold text-chicha-700 underline underline-offset-2">
              Ir directo a la carta
            </a>
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
            <a href={DEMO.kioskoCartaUrl} target="_blank" rel="noopener noreferrer" className="mt-3 text-center text-sm font-semibold text-chicha-700 underline underline-offset-2">
              Ir directo a la carta del kiosko
            </a>
          </article>

          <article className="flex flex-col rounded-3xl bg-tinta p-6 text-white">
            <LayoutDashboard aria-hidden className="h-7 w-7 text-aji-400" />
            <h2 className="mt-4 font-display text-2xl font-extrabold">El panel</h2>
            <p className="mt-2 flex-1 text-[0.98rem] leading-relaxed text-chicha-100">
              Donde llega todo: pedidos en vivo, cocina, caja, inventario, clientes y reportes. Tócalo en el recorrido guiado o mira
              sus {TOTAL_PANTALLAS} pantallas, con datos de demostración.
            </p>
            <figure className="my-6">
              <MarcoNavegador url="mirestaurante · panel" oscuro>
                <Clip clave="panel" />
              </MarcoNavegador>
              <figcaption className="mt-2 text-center font-mono text-[10px] uppercase tracking-wider text-chicha-100">
                Pedidos en vivo → reportes → finanzas
              </figcaption>
            </figure>
            <Boton href="#recorrido" variante="aji" ancho flecha>
              Tocar el panel
            </Boton>
            <a href="/panel" className="mt-3 text-center text-sm font-semibold text-aji-400 underline underline-offset-2">
              Ver las {TOTAL_PANTALLAS} pantallas
            </a>
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

      <section id="recorrido" aria-labelledby="t-recorrido" className="scroll-mt-16 bg-[#160a1d] py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-aji-400">Recorrido guiado · panel real con datos de la demo</p>
          <h2 id="t-recorrido" className="mt-3 max-w-3xl font-display text-[1.9rem] font-extrabold leading-[1.05] tracking-[-0.025em] text-balance sm:text-5xl">
            Toca el panel: de la alarma al cierre del mes
          </h2>
          <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-chicha-100">
            Cinco pantallas del panel de la demo, en el orden en que las usa tu equipo. Toca el punto amarillo como si fuera el
            panel de verdad.
          </p>
          <div className="mt-10">
            <RecorridoGuiado />
          </div>
        </div>
      </section>

      <Personalizador />

      <FinalCTA
        titulo="¿Te gustó? Ahora con tu carta"
        bajada="Crea tu tienda y te ayudamos a dejarla lista. El alta es gratis si te quedas 6 meses."
        secundario={{ href: "/precios", texto: "Ver precios" }}
      />
    </>
  );
}
