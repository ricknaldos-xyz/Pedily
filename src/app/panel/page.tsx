import type { Metadata } from "next";
import { OG_IMAGEN } from "@/lib/site";
import Link from "next/link";
import { clsx } from "clsx";
import { Download, KeyRound, Power, ShieldCheck } from "lucide-react";
import { Boton } from "@/components/marca/Boton";
import { Captura } from "@/components/marca/Captura";
import { MarcoNavegador } from "@/components/marca/Marcos";
import { Encabezado } from "@/components/ui/Encabezado";
import { PanelSeis } from "@/components/panel/PanelSeis";
import { Clip } from "@/components/marca/Clip";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PaginaJsonLd } from "@/components/seo/JsonLd";
import { PANEL, TOTAL_PANTALLAS } from "@/lib/panel";
import { CAPTURAS } from "@/lib/capturas";
import { RUTA_SOLUCION, solucionPorSlug } from "@/lib/soluciones";

const TITULO = "El panel de Pedily por dentro: tu día entero en una pantalla";
const DESCRIPCION = `Las ${TOTAL_PANTALLAS} pantallas del panel de Pedily en 8 áreas: pedidos en vivo, cocina, caja y cierre del día, carta y recetas, inventario, equipo, clientes y campañas, asistente de WhatsApp y reportes.`;

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: "/panel" },
  openGraph: { title: TITULO, description: DESCRIPCION, url: "/panel", locale: "es_PE", type: "website", images: [OG_IMAGEN] },
};

const MOMENTOS = [
  { h: "11:30", t: "Abres", d: "Haces el conteo de apertura y abres la tienda desde «Ahora».", p: "Conteo diario · Ahora" },
  { h: "12:00", t: "Vendes", d: "Entran pedidos de la web, WhatsApp, kiosko y mesa al mismo tablero, con sonido.", p: "Pedidos" },
  { h: "12:05", t: "Cocinas", d: "Cocina ve cada pedido con tamaño y cremas, y lo pasa a listo.", p: "Cocina" },
  { h: "12:20", t: "Cobras", d: "Verificas los cobros por QR, emites boleta o nota de crédito desde el pedido.", p: "Pedidos · Mesas" },
  { h: "22:10", t: "Cierras", d: "El cierre del día compara lo vendido con lo que cobraron Culqi y el banco.", p: "Cierre del día" },
  { h: "Lunes", t: "Decides", d: "Miras qué plato deja más, a qué hora reforzar y a quién mandarle una campaña.", p: "Reportes · Recetas · Campañas" },
];

export default function Panel() {
  const grupos = PANEL.map((g) => ({ ...g, visibles: g.pantallas.filter((p) => !p.tecnica) }));

  return (
    <>
      <PaginaJsonLd ruta="/panel" nombre="El panel por dentro" descripcion={DESCRIPCION} />

      {/* ── Hero ── */}
      <section className="overflow-hidden bg-[#160a1d] text-white">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pt-16 lg:px-8 lg:pb-20">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-aji-400">
            El panel · {TOTAL_PANTALLAS} pantallas en {PANEL.length} áreas
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-balance sm:text-6xl">
            Tu día entero en una pantalla
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-chicha-100">
            Pedidos en vivo, cocina, caja, carta y costos, almacén, equipo, clientes, el asistente de WhatsApp y tus números. Un
            solo panel, con roles para tu equipo.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Boton href="/contacto" tam="lg" flecha>
              Crear mi tienda
            </Boton>
            <Boton href="/demo" variante="borde-claro" tam="lg">
              Ver la demo
            </Boton>
          </div>
          <div className="mt-12">
            <PanelSeis oscuro />
          </div>
        </div>
      </section>

      {/* ── Un día con Pedily ── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Encabezado etiqueta="Un día con Pedily" titulo="De la apertura al cierre, sin cuadernos ni hojas sueltas" />
          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_1.05fr]">
          <ol className="relative space-y-4 border-l-2 border-dashed border-tinta/20 pl-6 sm:pl-8">
            {MOMENTOS.map((m) => (
              <li key={m.t} className="relative grid gap-1 sm:grid-cols-[5rem_7rem_1fr] sm:items-baseline sm:gap-4">
                <span aria-hidden className="absolute -left-[2.05rem] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-tinta bg-aji-500 sm:-left-[2.55rem]" />
                <span className="font-mono text-sm font-bold text-chicha-700">{m.h}</span>
                <span className="font-display text-xl font-bold text-tinta">{m.t}</span>
                <span className="text-[0.98rem] leading-relaxed text-sand-700">
                  {m.d} <span className="font-mono text-xs text-humo">· {m.p}</span>
                </span>
              </li>
            ))}
          </ol>
          <figure className="lg:sticky lg:top-24">
            <MarcoNavegador url="mirestaurante · panel" oscuro>
              <Clip clave="panel" />
            </MarcoNavegador>
            <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-wider text-humo">
              Recorrido del panel real · datos de demostración
            </figcaption>
          </figure>
          </div>
        </div>
      </section>

      {/* ── Índice de áreas ── */}
      <nav aria-label="Áreas del panel" className="sticky top-16 z-30 border-y border-tinta/10 bg-papel/95 backdrop-blur">
        <ul className="sin-barra mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8">
          {grupos.map((g) => (
            <li key={g.id} className="shrink-0">
              <a href={`#${g.id}`} className="flex min-h-10 items-center rounded-full border border-tinta/10 bg-white px-3.5 text-sm font-semibold text-sand-700 hover:border-tinta/30 hover:text-tinta">
                {g.nombre}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Las 8 áreas ── */}
      <div className="bg-white">
        {grupos.map((g, i) => {
          const sol = g.solucion ? solucionPorSlug(g.solucion) : undefined;
          return (
            <section key={g.id} id={g.id} aria-labelledby={`t-${g.id}`} className="scroll-mt-32 border-b border-dashed border-tinta/15 py-14 sm:py-20">
              <div className={clsx("mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8")}>
                <div className={clsx(i % 2 === 1 && "lg:order-2")}>
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-chicha-700">
                    Área {i + 1} de {PANEL.length} · {g.pantallas.length} pantallas
                  </p>
                  <h2 id={`t-${g.id}`} className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-[-0.02em] text-tinta sm:text-4xl">
                    {g.nombre}
                  </h2>
                  <p className="mt-3 rounded-xl bg-aji-100 px-4 py-3 text-[0.98rem] leading-relaxed text-tinta">
                    <strong>Lo que decides aquí:</strong> {g.decide}
                  </p>
                  <dl className="mt-6 divide-y divide-dashed divide-tinta/15">
                    {g.visibles.map((p) => (
                      <div key={p.nombre} className="py-3">
                        <dt className="flex flex-wrap items-center gap-2 font-semibold text-tinta">
                          {p.nombre}
                          {p.plan && (
                            <span className="rounded-full bg-chicha-50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-chicha-700">
                              {p.plan === "whatsapp" ? "Con asistente" : p.plan === "mesa" ? "Complemento Mesa o Completo" : "Plan Completo"}
                            </span>
                          )}
                          {p.opcion && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-papel px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-sand-700">
                              <Power aria-hidden className="h-3 w-3" /> Se enciende
                            </span>
                          )}
                        </dt>
                        <dd className="mt-0.5 text-[0.95rem] leading-relaxed text-sand-700">{p.ve}</dd>
                      </div>
                    ))}
                  </dl>
                  {sol && (
                    <Link href={RUTA_SOLUCION(sol.slug)} className="mt-5 inline-block font-semibold text-chicha-700 underline underline-offset-2">
                      Ver {sol.nombre.toLowerCase()} →
                    </Link>
                  )}
                </div>
                <figure className={clsx("lg:sticky lg:top-36", i % 2 === 1 && "lg:order-1")}>
                  {g.captura && (
                    <MarcoNavegador url={`mirestaurante · panel/${g.id}`} oscuro>
                      <Captura clave={g.captura} sizes="(max-width: 1024px) 92vw, 600px" />
                    </MarcoNavegador>
                  )}
                  {g.extra && g.extra.length > 0 && (
                    <ul className="mt-4 grid grid-cols-2 gap-3">
                      {g.extra.map((k) => (
                        <li key={k}>
                          <div className="overflow-hidden rounded-xl bg-[#0b0a0d] shadow-md ring-1 ring-tinta/10">
                            <Captura clave={k} sizes="(max-width: 1024px) 46vw, 290px" decorativa />
                          </div>
                          <p className="mt-1.5 text-xs leading-snug text-humo">{CAPTURAS[k].alt}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                  <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-wider text-humo">
                    Panel de la demo · datos de demostración
                  </figcaption>
                </figure>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── Roles y datos ── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            {
              I: KeyRound,
              t: "Roles para tu equipo",
              d: "Cada usuario ve solo lo suyo: 23 módulos con permisos de ver, crear, editar y borrar por rol. Cocina no ve la caja.",
            },
            {
              I: Download,
              t: "Tus datos son tuyos",
              d: "Desde «Mi negocio» descargas todo tu negocio en un ZIP de tablas CSV: carta, pedidos, clientes y más. Para irte cuando quieras o para tu contador.",
            },
            {
              I: ShieldCheck,
              t: "Tus llaves, protegidas",
              d: "Las llaves de Culqi y Nubefact no quedan a la vista en el panel: solo se muestra una máscara. Y cada cambio de pago o estado queda con su autor.",
            },
          ].map(({ I, t, d }) => (
            <div key={t} className="rounded-2xl border border-tinta/10 bg-white p-6">
              <I aria-hidden className="h-7 w-7 text-chicha-600" />
              <h2 className="mt-4 font-display text-xl font-bold text-tinta">{t}</h2>
              <p className="mt-2 text-[0.96rem] leading-relaxed text-sand-700">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <FinalCTA titulo="¿Te lo enseñamos con tu carta?" bajada="Crea tu tienda y recorre el panel con tus propios platos. Te acompañamos en cada paso." />
    </>
  );
}
