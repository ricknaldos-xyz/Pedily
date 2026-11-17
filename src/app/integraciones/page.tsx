import type { Metadata } from "next";
import { OG_IMAGEN } from "@/lib/site";
import Link from "next/link";
import { clsx } from "clsx";
import {
  ArrowRight,
  ArrowUpRight,
  Ban,
  Bell,
  Bike,
  Calculator,
  ChefHat,
  ChevronRight,
  Code2,
  Globe,
  MessageCircle,
  MonitorSmartphone,
  Plug,
  Printer,
  QrCode,
  Receipt,
  Store,
  UserRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Boton } from "@/components/marca/Boton";
import { Captura } from "@/components/marca/Captura";
import { MarcoNavegador } from "@/components/marca/Marcos";
import { PieCaptura, urlMarco } from "@/components/producto/Galeria";
import { Encabezado } from "@/components/ui/Encabezado";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQPageJsonLd, PaginaJsonLd } from "@/components/seo/JsonLd";
import { PREGUNTAS_INTEGRACIONES } from "@/lib/faq";
import { CAPTURAS, infoCaptura, type ClaveCaptura } from "@/lib/capturas";
import { CATEGORIAS, INTEGRACIONES, RUTA_INTEGRACIONES, integracionesDe, type CategoriaId, type IntegracionId } from "@/lib/integraciones";
import { PLANES, soles } from "@/lib/planes";
import { RUTA_SOLUCION, solucionPorSlug } from "@/lib/soluciones";

/**
 * /integraciones (ficha L-02, 16-nov-2026): todo lo que Pedily conecta, cada
 * integración con lo que hace, su condición real de activación, lo que pone el
 * restaurante y su plan. Fuente: `src/lib/integraciones.ts` (evidencia
 * ruta:línea en `main` y en `docs/PROMESAS.md`, filas 84–99).
 *
 * Capturas (L-04): pantallas reales de la demo con cada proveedor en modo
 * simulado (fichas J-01…J-04); el pie lo dice. Las que faltan están en
 * `docs/CAPTURAS-PENDIENTES.md`. El diagrama de la cabecera es un esquema, no
 * una pantalla.
 */

const TITULO = "Integraciones de Pedily: Rappi, PedidosYa, Yango, Izipay, SUNAT y más";
const DESCRIPCION =
  "Los pedidos de Rappi y PedidosYa en tu mismo panel, motorizado de PedidosYa Envíos o Yango, Culqi, Izipay y terminal POS, impresoras en red o en la nube, SIRE para tu contador, Google, Meta, TikTok y API con webhooks. Cada una con cómo se conecta.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: RUTA_INTEGRACIONES },
  openGraph: { title: TITULO, description: DESCRIPCION, url: RUTA_INTEGRACIONES, locale: "es_PE", type: "website", images: [OG_IMAGEN] },
};

const ICONO_CATEGORIA: Record<CategoriaId, LucideIcon> = {
  apps: Plug,
  reparto: Bike,
  pagos: Wallet,
  impresion: Printer,
  contabilidad: Calculator,
  marketing: Globe,
  plataforma: Code2,
};

/**
 * Capturas de cada integración. `par`: las dos caben lado a lado (pantallas
 * estrechas); si no, van una debajo de otra.
 */
const CAPTURAS_INTEGRACION: Partial<Record<IntegracionId, { claves: ClaveCaptura[]; par?: boolean }>> = {
  rappi: { claves: ["int-rappi-alarma", "int-rappi-integraciones"] },
  pedidosya: { claves: ["int-pedidosya-pedido"] },
  yango: { claves: ["int-repartos"] },
  izipay: { claves: ["int-checkout-izipay"] },
  "terminal-pos": { claves: ["int-caja-terminal", "int-kiosko-terminal"], par: true },
  impresoras: { claves: ["int-ticket-cliente", "int-ticket-comanda"], par: true },
  "impresoras-nube": { claves: ["int-impresoras-nube"] },
  contador: { claves: ["int-contabilidad"] },
  google: { claves: ["int-medicion-google", "int-tienda-cookies"], par: true },
  "meta-tiktok": { claves: ["int-conversiones"] },
  "api-webhooks": { claves: ["int-api-permisos", "int-webhooks-receptor"] },
};

function CapturasIntegracion({ id }: { id: IntegracionId }) {
  const grupo = CAPTURAS_INTEGRACION[id];
  if (!grupo) return null;
  const sizes = grupo.par ? "(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 280px" : "(max-width: 1024px) 92vw, 768px";
  return (
    <div
      className={clsx(
        // Tope de 768 px: las capturas son de pantalla estrecha y no se estiran (la tarjeta de API va a lo ancho).
        "mt-5 grid max-w-3xl gap-4",
        // Tickets: lado a lado siempre (son angostos). Pantallas: lado a lado desde 640 px; en celular, una
        // debajo de otra para que se lean.
        grupo.par && (CAPTURAS[grupo.claves[0]].tipo === "ticket" ? "grid-cols-2 items-start" : "items-start sm:grid-cols-2")
      )}
    >
      {grupo.claves.map((k) => (
        <figure key={k} className="min-w-0">
          {CAPTURAS[k].tipo === "ticket" ? (
            <div className="rounded-xl bg-sand-100 p-3 ring-1 ring-tinta/10">
              <Captura
                clave={k}
                sizes={sizes}
                // A escala: el papel de 58 mm mide 2/3 del de 80 mm (384 frente a 576 px en la vista previa).
                className={clsx("mx-auto h-auto max-w-[17rem] shadow-sm", k === "int-ticket-comanda" ? "w-2/3" : "w-full")}
                decorativa
              />
            </div>
          ) : (
            <MarcoNavegador oscuro={infoCaptura(k).donde !== "tienda" && infoCaptura(k).donde !== "kiosko"} url={urlMarco(k)}>
              <Captura clave={k} sizes={sizes} decorativa />
            </MarcoNavegador>
          )}
          <PieCaptura clave={k} className="mt-2 text-[0.82rem]" />
        </figure>
      ))}
    </div>
  );
}

const PRECIO = Object.fromEntries(PLANES.map((p) => [p.id, p]));

/** Lo que entra y lo que sale del panel (esquema de la cabecera). */
const ENTRAN: { i: LucideIcon; t: string }[] = [
  { i: Store, t: "Tu tienda web" },
  { i: MessageCircle, t: "WhatsApp" },
  { i: MonitorSmartphone, t: "Kiosko" },
  { i: QrCode, t: "QR de mesa" },
  { i: Plug, t: "Rappi" },
  { i: Plug, t: "PedidosYa" },
];
const SALEN: { i: LucideIcon; t: string }[] = [
  { i: ChefHat, t: "Cocina e impresora" },
  { i: Wallet, t: "Culqi, Izipay o POS" },
  { i: Receipt, t: "Boleta SUNAT" },
  { i: Bike, t: "Motorizado" },
  { i: Calculator, t: "Tu contador" },
  { i: Code2, t: "Tus sistemas" },
];

const RAPPI_PASOS = [
  { titulo: "Entra con alarma", texto: "El pedido de Rappi aparece en tu panel con sonido y la cuenta atrás de los 4 minutos que da Rappi para aceptar." },
  { titulo: "Se acepta solo o lo aceptas tú", texto: "Con «aceptar automáticamente» no se te pasa ninguno. Si lo rechazas, eliges el motivo de Rappi y los productos que faltan." },
  { titulo: "Pasa a cocina con tu carta", texto: "Cada producto de Rappi va asociado al tuyo, así cocina lo ve con su nombre de siempre, junto a los pedidos de tus otros canales." },
  { titulo: "Avisas que está listo", texto: "Desde el mismo panel le dices a Rappi que el pedido está listo para recoger." },
  { titulo: "Si se cancela, te enteras", texto: "Si el cliente cancela en Rappi, el pedido se cancela en tu panel y te avisamos. Ningún pedido de app pide además tu motorizado." },
];

const NO_HACE = [
  "La carta de Rappi y PedidosYa se sigue editando en cada app; en Pedily asocias sus productos con tu carta.",
  "No conecta DiDi Food ni otras apps de delivery distintas de Rappi y PedidosYa.",
  "Las apps, las pasarelas y los proveedores de reparto te cobran lo suyo, según tu contrato con cada uno.",
  "La API es de lectura: tus sistemas consultan y reciben avisos, no crean pedidos.",
];

export default function IntegracionesPage() {
  const tienda = PLANES[0];
  return (
    <>
      <PaginaJsonLd ruta={RUTA_INTEGRACIONES} nombre="Integraciones" descripcion={DESCRIPCION} />
      <FAQPageJsonLd preguntas={PREGUNTAS_INTEGRACIONES} />

      {/* ── Cabecera ── */}
      <section className="papel-trama overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-14 pt-6 [&>*]:min-w-0 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8 lg:pb-20 lg:pt-10">
          <div>
            <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-1 text-sm text-humo">
              <Link href="/" className="hover:text-tinta hover:underline">
                Inicio
              </Link>
              <ChevronRight aria-hidden className="h-3.5 w-3.5" />
              <span aria-current="page" className="text-sand-700">
                Integraciones
              </span>
            </nav>
            <p className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.14em] text-chicha-700">
              Integraciones · {INTEGRACIONES.length} conexiones
            </p>
            <h1 className="mt-4 font-display text-[2.2rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-tinta text-balance sm:text-5xl lg:text-[3.5rem]">
              Rappi, PedidosYa, tu POS y tu contador, en un solo panel
            </h1>
            <p className="mt-5 max-w-2xl text-[1.08rem] leading-relaxed text-sand-700 text-pretty sm:text-lg">
              Los pedidos de las apps entran junto a los de tu web y tu WhatsApp, el motorizado se pide desde el pedido, la boleta
              sale con tu Nubefact y tu contador descarga su archivo. Cada integración dice claro qué hace, cómo se conecta y en
              qué plan viene.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Boton href="/contacto" tam="lg" flecha>
                Crear mi tienda
              </Boton>
              <Boton href="#por-plan" variante="borde" tam="lg">
                Ver qué trae cada plan
              </Boton>
            </div>
            <p className="mt-5 text-sm text-sand-700">
              <span className="font-mono font-semibold text-tinta">Desde {soles(tienda.precioMensual)} al mes</span> con IGV, sin
              comisión de Pedily por pedido ni por conectar nada.
            </p>
          </div>

          {/* Esquema (no es una pantalla del producto) */}
          <figure aria-labelledby="t-esquema" className="relative mx-auto w-full max-w-xl">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
              <ul className="space-y-2">
                {ENTRAN.map(({ i: I, t }) => (
                  <li
                    key={t}
                    className={clsx(
                      "flex items-center gap-2 rounded-xl border bg-white px-2.5 py-2 text-[0.8rem] font-semibold text-tinta sm:px-3 sm:text-sm",
                      t === "Rappi" || t === "PedidosYa" ? "border-2 border-tinta" : "border-tinta/10"
                    )}
                  >
                    <I aria-hidden className="h-4 w-4 shrink-0 text-chicha-600" />
                    <span className="min-w-0 leading-tight">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col items-center gap-2">
                <ArrowRight aria-hidden className="h-4 w-4 text-humo" />
                <div className="flex h-28 w-24 flex-col items-center justify-center rounded-2xl border-2 border-tinta bg-tinta p-2 text-center text-white shadow-[0_6px_0_0_#ffb200] sm:h-36 sm:w-32">
                  <Bell aria-hidden className="h-6 w-6 text-aji-400" />
                  <span className="mt-2 font-display text-sm font-extrabold leading-tight sm:text-base">Tu panel Pedily</span>
                  <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-chicha-100 sm:text-[10px]">una alarma</span>
                </div>
                <ArrowRight aria-hidden className="h-4 w-4 text-humo" />
              </div>
              <ul className="space-y-2">
                {SALEN.map(({ i: I, t }) => (
                  <li key={t} className="flex items-center gap-2 rounded-xl border border-tinta/10 bg-white px-2.5 py-2 text-[0.8rem] font-semibold text-tinta sm:px-3 sm:text-sm">
                    <I aria-hidden className="h-4 w-4 shrink-0 text-rocoto-500" />
                    <span className="min-w-0 leading-tight">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <figcaption id="t-esquema" className="mt-4 text-center font-mono text-[10px] uppercase tracking-wider text-humo">
              Esquema: lo que entra y lo que sale de tu panel
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Índice por tipo ── */}
      <nav aria-label="Integraciones por tipo" className="sticky top-16 z-20 border-y border-tinta/10 bg-papel/95 backdrop-blur">
        <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:px-6 xl:justify-center xl:px-8">
          {CATEGORIAS.map((c) => {
            const I = ICONO_CATEGORIA[c.id];
            return (
              <li key={c.id} className="shrink-0">
                <a
                  href={`#${c.id}`}
                  className="inline-flex min-h-10 items-center gap-1.5 whitespace-nowrap rounded-full border border-tinta/15 bg-white px-3 text-[13px] font-semibold text-tinta hover:border-tinta/40"
                >
                  <I aria-hidden className="h-4 w-4 text-chicha-600" />
                  {c.nombre}
                  <span className="font-mono text-[11px] text-humo">{integracionesDe(c.id).length}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Categorías ── */}
      {CATEGORIAS.map((c, ci) => {
        const I = ICONO_CATEGORIA[c.id];
        const lista = integracionesDe(c.id);
        return (
          <section
            key={c.id}
            id={c.id}
            aria-labelledby={`t-${c.id}`}
            className={clsx("scroll-mt-32 py-14 sm:py-20", ci % 2 === 1 && "bg-white")}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-chicha-50 text-chicha-700">
                  <I aria-hidden className="h-6 w-6" />
                </span>
                <div>
                  <h2 id={`t-${c.id}`} className="font-display text-3xl font-extrabold tracking-[-0.02em] text-tinta sm:text-4xl">
                    {c.nombre}
                  </h2>
                  <p className="mt-1 text-[1.02rem] text-humo">{c.bajada}</p>
                </div>
              </div>
              <ul className={clsx("mt-8 grid gap-5", lista.length > 1 && "lg:grid-cols-2")}>
                {lista.map((it) => {
                  const plan = PRECIO[it.plan];
                  const sol = solucionPorSlug(it.solucion);
                  return (
                    <li key={it.id} id={it.id} className="scroll-mt-32">
                      <article className="flex h-full flex-col rounded-2xl border border-tinta/10 bg-white p-5 sm:p-6">
                        <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-chicha-700">{it.con}</p>
                        <h3 className="mt-1.5 font-display text-xl font-bold leading-tight text-tinta sm:text-2xl">{it.nombre}</h3>
                        <ul className="mt-4 space-y-2">
                          {it.hace.map((h) => (
                            <li key={h} className="flex gap-2.5 text-[0.96rem] leading-snug text-sand-800">
                              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hierba-600" />
                              {h}
                            </li>
                          ))}
                        </ul>
                        <CapturasIntegracion id={it.id} />
                        <div className="mt-5 rounded-xl bg-aji-100 p-4">
                          <p className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-tinta">
                            <Plug aria-hidden className="h-4 w-4" /> Cómo se conecta
                          </p>
                          <p className="mt-1.5 text-[0.95rem] leading-relaxed text-sand-800">{it.conecta}</p>
                        </div>
                        <p className="mb-5 mt-3 flex gap-2 text-sm leading-relaxed text-sand-700">
                          <UserRound aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-humo" />
                          <span>
                            <span className="font-semibold text-tinta">Lo pones tú: </span>
                            {it.pones}
                          </span>
                        </p>
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-tinta/15 pt-3">
                          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-chicha-700">
                            {it.plan === "tienda" ? "En todos los planes" : `Desde ${plan.nombre} · ${soles(plan.precioMensual)}`}
                            {it.notaPlan ? ` · ${it.notaPlan}` : ""}
                          </span>
                          {sol && (
                            <Link href={RUTA_SOLUCION(sol.slug)} className="inline-flex items-center gap-1 text-sm font-semibold text-chicha-700 hover:underline">
                              {sol.nombre} <ArrowUpRight aria-hidden className="h-4 w-4" />
                            </Link>
                          )}
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        );
      })}

      {/* ── Un pedido de Rappi ── */}
      <section aria-labelledby="t-rappi" className="bg-tinta py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Encabezado
            oscuro
            id="t-rappi"
            etiqueta="Un pedido de Rappi, paso a paso"
            titulo="Una alarma, una pantalla, cero pedidos perdidos"
            bajada="Rappi da 4 minutos para aceptar cada pedido. Pedily los cuenta por ti y, si quieres, acepta solo."
          />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {RAPPI_PASOS.map((p, i) => (
              <li key={p.titulo} className="rounded-2xl border border-white/15 p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-aji-500 font-mono text-sm font-bold text-tinta">{i + 1}</span>
                <h3 className="mt-4 font-display text-lg font-bold">{p.titulo}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-chicha-100">{p.texto}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl text-[0.98rem] leading-relaxed text-chicha-100">
            Con PedidosYa es aún más simple: aceptas en PedidosYa como siempre y el pedido entra solo a tu panel y a cocina. Marcas
            «listo» o «entregado» en Pedily y PedidosYa se entera.
          </p>
        </div>
      </section>

      {/* ── Por plan ── */}
      <section id="por-plan" aria-labelledby="t-por-plan" className="scroll-mt-32 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Encabezado
            id="t-por-plan"
            etiqueta="Por plan · con IGV"
            titulo="Qué integración trae cada plan"
            bajada="Sin comisión de Pedily ni cargo por conectar. Cada integración se enciende en tu restaurante cuando la quieras usar."
          />
          <div className="mt-8 overflow-hidden rounded-2xl border border-tinta/10 bg-white">
            <table className="w-full table-fixed border-collapse text-left">
              <caption className="sr-only">Integraciones por plan</caption>
              <colgroup>
                <col />
                {PLANES.map((p) => (
                  <col key={p.id} className="w-[3.6rem] sm:w-[8rem]" />
                ))}
              </colgroup>
              <thead>
                <tr className="border-b-2 border-tinta">
                  <th scope="col" className="py-3 pl-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-humo sm:pl-4 sm:text-xs">
                    Integración
                  </th>
                  {PLANES.map((p) => (
                    <th key={p.id} scope="col" className="py-3 text-center">
                      <span className="block font-display text-[11px] font-bold leading-tight text-tinta sm:text-base">
                        <span className="sm:hidden">{["Tienda", "+ WhatsApp", "Completo"][PLANES.indexOf(p)]}</span>
                        <span className="hidden sm:inline">{p.nombre}</span>
                      </span>
                      <span className="block font-mono text-[10px] text-humo sm:text-xs">{soles(p.precioMensual)}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INTEGRACIONES.map((it) => {
                  const desde = PLANES.findIndex((p) => p.id === it.plan);
                  return (
                    <tr key={it.id} className="border-t border-tinta/[0.06] odd:bg-papel/60">
                      <th scope="row" className="py-2.5 pl-3 pr-2 text-[0.92rem] font-normal leading-snug text-sand-800 sm:pl-4">
                        <a href={`#${it.id}`} className="hover:underline">
                          {it.nombre}
                        </a>
                        {it.notaPlan && <span className="block text-xs text-humo">{it.notaPlan}</span>}
                      </th>
                      {PLANES.map((p, i) => (
                        <td key={p.id} className="py-2 text-center align-middle">
                          {i >= desde ? (
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-hierba-50 text-hierba-600">
                              <span aria-hidden>✓</span>
                              <span className="sr-only">Incluida en {p.nombre}</span>
                            </span>
                          ) : (
                            <span className="text-tinta/25">
                              <span aria-hidden>—</span>
                              <span className="sr-only">No viene en {p.nombre}</span>
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-center text-[0.95rem] text-sand-700">
            <Link href="/precios#comparativa" className="font-semibold text-chicha-700 underline underline-offset-2">
              Ver la comparativa completa, función por función
            </Link>
          </p>
        </div>
      </section>

      {/* ── Lo que no hace ── */}
      <section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-dashed border-tinta/25 p-6 sm:p-7">
            <h2 className="font-display text-2xl font-extrabold text-tinta">Lo que no hace</h2>
            <p className="mt-1 text-sm text-sand-700">Para que decidas con todo claro.</p>
            <ul className="mt-4 space-y-3">
              {NO_HACE.map((n) => (
                <li key={n} className="flex gap-2.5 text-[0.96rem] leading-snug text-sand-700">
                  <Ban aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-rocoto-500" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FAQ preguntas={PREGUNTAS_INTEGRACIONES} titulo="Preguntas sobre las integraciones" bajada="Lo que suelen preguntar antes de conectar sus apps y proveedores." />
      <FinalCTA titulo="Tus pedidos y los de las apps, en un solo panel" />
    </>
  );
}
