import type { Metadata } from "next";
import { OG_IMAGEN } from "@/lib/site";
import Link from "next/link";
import { clsx } from "clsx";
import { ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { Boton } from "@/components/marca/Boton";
import { Captura } from "@/components/marca/Captura";
import { Clip } from "@/components/marca/Clip";
import { MarcoCelular, MarcoNavegador } from "@/components/marca/Marcos";
import { IconoSolucion } from "@/components/marca/IconoSolucion";
import { Sello } from "@/components/marca/Sello";
import { Encabezado } from "@/components/ui/Encabezado";
import { Galeria } from "@/components/producto/Galeria";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQPageJsonLd, PaginaJsonLd } from "@/components/seo/JsonLd";
import { CLIPS } from "@/lib/capturas";
import { PREGUNTA_CARTA_QR, PREGUNTA_MESA_PRECIO } from "@/lib/faq";
import { COMPLEMENTO_MESA, PLANES, precioComplemento, soles } from "@/lib/planes";
import { RUTA_SOLUCION, solucionPorSlug, type Icono } from "@/lib/soluciones";
import { RUTA_SALON } from "@/lib/para";

/**
 * Página para restaurantes con salón (decisión del dueño, 16-nov:
 * `pedily/_notas/plan/D-decisiones-2026-11-15.md`, «Añadido 16-nov»).
 * Junta lo que ya existe y tiene su página de solución: QR de mesa que cobra
 * (complemento «Mesa» de +S/ 150 o incluido en Completo), carta digital por QR
 * (todos los planes), cocina, caja y cierre del día, boletas SUNAT y el panel.
 * Capturas y clip reales con datos de «Restaurante Demo» (LV2-C).
 */


const TITULO = "Sistema para restaurantes con salón: QR de mesa que cobra, cocina y caja";
const DESCRIPCION =
  "Para restaurantes con mesas en Perú: carta digital por QR, QR de mesa para pedir por rondas y pagar desde el celular, pantalla de cocina, caja con cierre del día y boletas SUNAT. Sin comisión.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: RUTA_SALON },
  openGraph: { title: TITULO, description: DESCRIPCION, url: RUTA_SALON, locale: "es_PE", type: "website", images: [OG_IMAGEN] },
};

const [TIENDA, WHATSAPP, COMPLETO] = PLANES;

const PIEZAS: { slug: string; icono: Icono; titulo: string; texto: string; marca: string }[] = [
  {
    slug: "qr-de-mesa",
    icono: "qr",
    titulo: "QR de mesa que cobra",
    texto: "Cada mesa con su QR. El comensal pide por rondas, ve la cuenta en vivo y paga todo, en partes iguales o sus platos.",
    marca: `${precioComplemento()} o incluido en ${COMPLETO.nombre}`,
  },
  {
    slug: "tienda-web",
    icono: "tienda",
    titulo: "Carta digital por QR",
    texto: "Un QR en el mostrador o en la mesa abre tu carta con fotos y precios. Lo generas desde tu panel en PNG o en PDF A4 listo para imprimir, con tu logo y tus colores.",
    marca: "En todos los planes",
  },
  {
    slug: "cocina",
    icono: "cocina",
    titulo: "Cocina en pantalla",
    texto: "Cada ronda entra con «Mesa 4 · Terraza», tamaño y cremas, y un reloj de demora. Sin comandas de papel perdidas.",
    marca: "En todos los planes",
  },
  {
    slug: "caja-y-pagos",
    icono: "caja",
    titulo: "Caja y cierre del día",
    texto: "Cobras en caja si hace falta, verificas el Yape o Plin y al cierre comparas lo vendido con lo que de verdad cobraste.",
    marca: "En todos los planes",
  },
  {
    slug: "boletas-sunat",
    icono: "boleta",
    titulo: "Boletas SUNAT",
    texto: "Boleta o factura electrónica por cada ronda pagada, con tu RUC y a través de tu Nubefact.",
    marca: "En todos los planes",
  },
  {
    slug: "reportes",
    icono: "reportes",
    titulo: "El panel que lo une",
    texto: "Mesas abiertas, avisos de «llama al mozo» y «pide la cuenta», pedidos, inventario y reportes en un solo lugar.",
    marca: "En todos los planes",
  },
];

const SERVICIO = [
  { titulo: "Escanea", texto: "El comensal escanea el QR de su mesa. Sin app ni registro." },
  { titulo: "Pide por rondas", texto: "Elige tamaños y cremas, deja una nota y manda la ronda a cocina." },
  { titulo: "Cocina la ve al instante", texto: "Entra a Pedidos y Cocina con el nombre de la mesa." },
  { titulo: "Llama al mozo si quiere", texto: "«Llamar al mozo» y «Pedir la cuenta» aparecen en «Mesas»." },
  { titulo: "Paga desde la mesa", texto: "Todo, en partes iguales o sus platos, con propina opcional." },
  { titulo: "Boleta y mesa cerrada", texto: "La boleta sale por ronda pagada y tu equipo cierra la mesa." },
];

const OPCIONES = [
  {
    nombre: `${TIENDA.nombre} + Mesa`,
    precio: TIENDA.precioMensual + COMPLEMENTO_MESA.precioMensual,
    detalle: `${soles(TIENDA.precioMensual)} del plan + ${soles(COMPLEMENTO_MESA.precioMensual)} del complemento`,
    para: "Salón con tienda web propia, sin asistente de WhatsApp.",
  },
  {
    nombre: `${WHATSAPP.nombre} + Mesa`,
    precio: WHATSAPP.precioMensual + COMPLEMENTO_MESA.precioMensual,
    detalle: `${soles(WHATSAPP.precioMensual)} del plan + ${soles(COMPLEMENTO_MESA.precioMensual)} del complemento`,
    para: "Salón que además vende por WhatsApp con el asistente y su mini-app.",
    destacado: true,
  },
  {
    nombre: COMPLETO.nombre,
    precio: COMPLETO.precioMensual,
    detalle: "QR de mesa incluido, más kiosko de autoservicio",
    para: "Salón con mucho movimiento y una pantalla de autoservicio.",
  },
];

export default function RestaurantesConSalon() {
  const qr = solucionPorSlug("qr-de-mesa");
  const preguntas = [PREGUNTA_MESA_PRECIO, PREGUNTA_CARTA_QR, ...(qr?.preguntas.filter((p) => p !== PREGUNTA_MESA_PRECIO && p !== PREGUNTA_CARTA_QR) ?? [])];
  return (
    <>
      <PaginaJsonLd ruta={RUTA_SALON} nombre="Para restaurantes con salón" descripcion={DESCRIPCION} />
      <FAQPageJsonLd preguntas={preguntas} />

      {/* ── Hero ── */}
      <section className="papel-trama overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-14 pt-6 [&>*]:min-w-0 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-20 lg:pt-10">
          <div>
            <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-1 text-sm text-humo">
              <Link href="/" className="hover:text-tinta hover:underline">
                Inicio
              </Link>
              <ChevronRight aria-hidden className="h-3.5 w-3.5" />
              <span aria-current="page" className="text-sand-700">
                Restaurantes con salón
              </span>
            </nav>
            <p className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.14em] text-chicha-700">Para restaurantes con salón</p>
            <h1 className="mt-4 font-display text-[2.2rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-tinta text-balance sm:text-5xl lg:text-[3.6rem]">
              Tu salón pide y paga desde la mesa. Tu cocina y tu caja, en orden.
            </h1>
            <p className="mt-5 max-w-2xl text-[1.08rem] leading-relaxed text-sand-700 text-pretty sm:text-lg">
              Carta digital por QR, QR de mesa que cobra, pantalla de cocina, caja con cierre del día y boletas SUNAT, en el mismo
              panel donde ya ves tus pedidos de web y WhatsApp. Sin comisión por pedido.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Boton href="/contacto" tam="lg" flecha>
                Crear mi tienda
              </Boton>
              <Boton href="#precios-salon" variante="borde" tam="lg">
                Ver precios para salón
              </Boton>
            </div>
            <p className="mt-5 text-sm text-sand-700">
              <span className="font-mono font-semibold text-tinta">
                Desde {soles(TIENDA.precioMensual + COMPLEMENTO_MESA.precioMensual)} al mes
              </span>{" "}
              con IGV ({TIENDA.nombre} + complemento Mesa), o {COMPLETO.nombre} a {soles(COMPLETO.precioMensual)} con el QR de mesa y el kiosko incluidos.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <MarcoNavegador oscuro url="mirestaurante · panel · mesas" className="hidden sm:block">
              <Captura clave="panel-mesas" sizes="(max-width: 1024px) 90vw, 560px" prioridad decorativa />
            </MarcoNavegador>
            <figure className="relative mx-auto w-[15.5rem] sm:absolute sm:-bottom-10 sm:-left-6 sm:mx-0 sm:w-[12.5rem] lg:-left-10">
              <MarcoCelular>
                <Clip clave="mesa" inmediato />
              </MarcoCelular>
              <div className="absolute -right-6 bottom-20 sm:-right-16 sm:bottom-24">
                <Sello tono="cocina" giro={8}>
                  Mesa 4 · En cocina
                </Sello>
              </div>
            </figure>
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-wider text-humo sm:mt-14 sm:text-right">
              {CLIPS.mesa.nota} · panel real
            </p>
          </div>
        </div>
      </section>

      {/* ── Las piezas ── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Encabezado
            etiqueta="Lo que trae para tu salón"
            titulo="De la mesa a la cocina y a la caja, sin papelitos"
            bajada="Cada pieza tiene su página con todas sus funciones, lo que necesitas y lo que no hace."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PIEZAS.map((p, i) => (
              <li key={p.slug + p.titulo}>
                <Link
                  href={RUTA_SOLUCION(p.slug)}
                  className={clsx(
                    "group flex h-full flex-col rounded-2xl border bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-hover",
                    i === 0 ? "border-2 border-tinta shadow-[0_6px_0_0_#24102e]" : "border-tinta/10"
                  )}
                >
                  <span className="flex items-start justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-chicha-50 text-chicha-700">
                      <IconoSolucion icono={p.icono} className="h-5 w-5" />
                    </span>
                    <ArrowUpRight aria-hidden className="h-4 w-4 text-humo" />
                  </span>
                  <span className="mt-3 font-display text-xl font-bold text-tinta">{p.titulo}</span>
                  <span className="mt-1 flex-1 text-[0.96rem] leading-relaxed text-sand-700">{p.texto}</span>
                  <span className="mt-4 border-t border-dashed border-tinta/15 pt-2.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-chicha-700">
                    {p.marca}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Un servicio ── */}
      <section className="bg-tinta py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Encabezado oscuro etiqueta="Un servicio, paso a paso" titulo="Así se atiende una mesa con Pedily" />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICIO.map((p, i) => (
              <li key={p.titulo} className="rounded-2xl border border-white/15 p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-aji-500 font-mono text-sm font-bold text-tinta">{i + 1}</span>
                <h3 className="mt-4 font-display text-lg font-bold">{p.titulo}</h3>
                <p className="mt-1.5 text-[0.96rem] leading-relaxed text-chicha-100">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Así se ve ── */}
      <section aria-labelledby="asi-se-ve" className="overflow-hidden bg-papel py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-chicha-700">Así se ve</p>
              <h2 id="asi-se-ve" className="mt-2 font-display text-3xl font-extrabold tracking-[-0.02em] text-tinta sm:text-4xl">
                En la mesa y en tu panel
              </h2>
            </div>
            <p className="max-w-sm font-mono text-[11px] uppercase tracking-wider text-humo">Producto real · datos de demostración de «Restaurante Demo»</p>
          </div>
          <Galeria claves={["mesa-carta", "mesa-ronda", "mesa-cuenta", "mesa-mis-platos", "panel-mesas", "panel-cocina"]} />
        </div>
      </section>

      {/* ── Precios ── */}
      <section id="precios-salon" className="scroll-mt-16 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Encabezado
            etiqueta="Precios para salón · con IGV"
            titulo="Elige cómo sumar el salón"
            bajada={`La carta digital por QR viene en todos los planes. El QR de mesa que cobra se suma por ${precioComplemento()}, o viene incluido en ${COMPLETO.nombre}. 0 % de comisión por pedido.`}
          />
          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {OPCIONES.map((o) => (
              <li
                key={o.nombre}
                className={clsx(
                  "relative flex flex-col rounded-2xl bg-white p-6",
                  o.destacado ? "border-2 border-tinta shadow-[0_8px_0_0_#24102e]" : "border border-tinta/10"
                )}
              >
                <h3 className="font-display text-xl font-bold text-tinta">{o.nombre}</h3>
                <p className="mt-0.5 text-sm text-sand-700">{o.para}</p>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-extrabold tracking-tight text-tinta">{soles(o.precio)}</span>
                  <span className="text-sm text-sand-700">al mes</span>
                </p>
                <p className="mt-1 font-mono text-[11px] text-humo">{o.detalle}</p>
                <ul className="mt-4 space-y-2 text-sm text-sand-700">
                  {["QR de mesa que cobra", "Carta digital por QR", "Cocina, caja y cierre del día", "Boletas SUNAT y panel completo"].map((t) => (
                    <li key={t} className="flex gap-2">
                      <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-hierba-600" />
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-[0.95rem] text-sand-700">
            Aparte pagas a Culqi y a Nubefact sus tarifas públicas.{" "}
            <Link href="/precios" className="font-semibold text-chicha-700 underline underline-offset-2">
              Ver todos los precios y la comparativa función por función
            </Link>
            .
          </p>
        </div>
      </section>

      <FAQ preguntas={preguntas} titulo="Preguntas de restaurantes con salón" bajada="Lo que suelen preguntar antes de poner QR en las mesas." />
      <FinalCTA titulo="Tu salón, sin esperar al mozo para pedir ni para pagar" />
    </>
  );
}
