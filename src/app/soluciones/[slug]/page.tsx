import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { clsx } from "clsx";
import { ArrowUpRight, Ban, Check, ChevronRight, Power } from "lucide-react";
import { Boton } from "@/components/marca/Boton";
import { IconoSolucion } from "@/components/marca/IconoSolucion";
import { Encabezado } from "@/components/ui/Encabezado";
import { EscenaSolucion } from "@/components/producto/Escenas";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQPageJsonLd, SolucionJsonLd } from "@/components/seo/JsonLd";
import { GRUPOS, RUTA_SOLUCION, SOLUCIONES, solucionPorSlug, type PlanMinimo } from "@/lib/soluciones";
import { TINTE_GRUPO } from "@/lib/tintes";
import { PLANES, soles } from "@/lib/planes";

export const dynamicParams = false;

export function generateStaticParams() {
  return SOLUCIONES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = solucionPorSlug(slug);
  if (!s) return {};
  return {
    title: s.seo.titulo,
    description: s.seo.descripcion,
    alternates: { canonical: RUTA_SOLUCION(s.slug) },
    openGraph: { title: s.seo.titulo, description: s.seo.descripcion, url: RUTA_SOLUCION(s.slug), locale: "es_PE", type: "website" },
  };
}

const PLAN: Record<PlanMinimo, (typeof PLANES)[number]> = {
  tienda: PLANES[0],
  whatsapp: PLANES[1],
  completo: PLANES[2],
};

/**
 * Plantilla de solución (benchmark §5.2): rótulo + H1 + escena, qué es,
 * cómo funciona en 4 pasos, TODAS las funciones (con lo que se enciende por
 * restaurante marcado), cómo se conecta, qué necesitas, lo que no hace,
 * preguntas y cierre. Todo el texto está en el HTML.
 */
export default async function PaginaSolucion({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = solucionPorSlug(slug);
  if (!s) notFound();

  const grupo = GRUPOS.find((g) => g.id === s.grupo)!;
  const tinte = TINTE_GRUPO[s.grupo];
  const plan = PLAN[s.plan];
  const vecinos = s.vecinos.map(solucionPorSlug).filter((v): v is NonNullable<typeof v> => Boolean(v));
  const base = s.funciones.filter((f) => !f.opcion);
  const opcionales = s.funciones.filter((f) => f.opcion);

  return (
    <>
      <SolucionJsonLd slug={s.slug} nombre={s.nombre} descripcion={s.definicion} precioDesde={plan.precioMensual} grupo={grupo.nombre} />
      {s.preguntas.length > 0 && <FAQPageJsonLd preguntas={s.preguntas} />}

      {/* ── Hero ── */}
      <section className="papel-trama overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-6 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-20 lg:pt-10">
          <div>
            <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-1 text-sm text-humo">
              <Link href="/" className="hover:text-tinta hover:underline">
                Inicio
              </Link>
              <ChevronRight aria-hidden className="h-3.5 w-3.5" />
              <Link href="/soluciones" className="hover:text-tinta hover:underline">
                Soluciones
              </Link>
              <ChevronRight aria-hidden className="h-3.5 w-3.5" />
              <span aria-current="page" className="text-sand-700">
                {s.nombre}
              </span>
            </nav>
            <p className={clsx("mt-6 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em]", tinte.texto)}>
              <span className={clsx("flex h-7 w-7 items-center justify-center rounded-lg", tinte.fondo)}>
                <IconoSolucion icono={s.icono} className="h-4 w-4" />
              </span>
              {grupo.nombre} · {s.nombre}
            </p>
            <h1 className="mt-4 font-display text-[2.2rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-tinta text-balance sm:text-5xl lg:text-[3.6rem]">
              {s.titulo}
            </h1>
            <p className="mt-5 max-w-2xl text-[1.08rem] leading-relaxed text-sand-700 text-pretty sm:text-lg">{s.bajada}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Boton href="/contacto" tam="lg" flecha>
                Crear mi tienda
              </Boton>
              <Boton href="/demo" variante="borde" tam="lg">
                Ver la demo
              </Boton>
            </div>
            <p className="mt-5 text-sm text-sand-700">
              <span className="font-mono font-semibold text-tinta">Desde {soles(plan.precioMensual)} al mes</span> con IGV, en el plan{" "}
              {plan.nombre}. 0 % de comisión.{s.notaPlan ? ` ${s.notaPlan}` : ""}
            </p>
          </div>
          <div className="lg:pl-8">
            <EscenaSolucion escena={s.escena} />
          </div>
        </div>
      </section>

      {/* ── Qué es ── */}
      <section className="border-y border-tinta/10 bg-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[14rem_1fr] lg:px-8">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-chicha-700">Qué es</h2>
          <p className="max-w-4xl font-display text-xl font-semibold leading-snug text-tinta sm:text-2xl">{s.definicion}</p>
        </div>
      </section>

      {/* ── Cómo funciona ── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Encabezado etiqueta="Cómo funciona" titulo={`${s.nombre}, paso a paso`} />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.pasos.map((p, i) => (
              <li key={p.titulo} className="relative rounded-2xl border border-tinta/10 bg-white p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-tinta bg-aji-500 font-mono text-sm font-bold text-tinta">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold leading-tight text-tinta">{p.titulo}</h3>
                <p className="mt-2 text-[0.96rem] leading-relaxed text-sand-700">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Todas las funciones ── */}
      <section id="funciones" className="scroll-mt-16 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Encabezado
            etiqueta={`Todas las funciones · ${s.funciones.length}`}
            titulo="Todo lo que hace, sin letra chica"
            bajada={
              opcionales.length
                ? "Las marcadas «Se enciende en tu restaurante» vienen apagadas: las activamos contigo cuando las quieras usar."
                : undefined
            }
          />
          <ul className="mt-10 grid gap-x-8 gap-y-0 md:grid-cols-2">
            {[...base, ...opcionales].map((f) => (
              <li key={f.texto} className="flex gap-3 border-b border-dashed border-tinta/15 py-3.5 text-[0.98rem] leading-snug text-sand-800">
                {f.opcion ? (
                  <Power aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-chicha-600" />
                ) : (
                  <Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-hierba-600" />
                )}
                <span>
                  {f.texto}
                  {f.opcion && (
                    <span className="ml-2 inline-block rounded-full bg-chicha-50 px-2 py-0.5 align-middle font-mono text-[10px] font-bold uppercase tracking-wider text-chicha-700">
                      Se enciende en tu restaurante
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Qué necesitas + Lo que no hace ── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="ticket px-6 py-7 [filter:drop-shadow(0_10px_16px_rgba(36,16,46,0.12))]">
            <h2 className="font-display text-2xl font-extrabold text-tinta">Qué necesitas</h2>
            <dl className="mt-4 space-y-4">
              {s.necesitas.map((n) => (
                <div key={n.item}>
                  <dt className="font-semibold text-tinta">{n.item}</dt>
                  <dd className="mt-0.5 text-[0.96rem] leading-relaxed text-sand-700">{n.detalle}</dd>
                </div>
              ))}
            </dl>
          </div>
          {s.noHace && s.noHace.length > 0 && (
            <div className="rounded-2xl border border-dashed border-tinta/25 p-6 sm:p-7">
              <h2 className="font-display text-2xl font-extrabold text-tinta">Lo que no hace</h2>
              <p className="mt-1 text-sm text-sand-700">Para que decidas con todo claro.</p>
              <ul className="mt-4 space-y-3">
                {s.noHace.map((n) => (
                  <li key={n} className="flex gap-2.5 text-[0.96rem] leading-snug text-sand-700">
                    <Ban aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-rocoto-500" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ── Cómo se conecta ── */}
      {vecinos.length > 0 && (
        <section className="bg-tinta py-16 text-white sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Encabezado oscuro etiqueta="Cómo se conecta" titulo="Funciona junto con el resto de Pedily" bajada="Todo entra al mismo panel: nada se copia a mano de un sistema a otro." />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {vecinos.map((v) => (
                <li key={v.slug}>
                  <Link href={RUTA_SOLUCION(v.slug)} className="group flex h-full flex-col rounded-2xl border border-white/15 p-5 transition-colors hover:border-aji-400">
                    <span className="flex items-center justify-between">
                      <IconoSolucion icono={v.icono} className="h-6 w-6 text-aji-400" />
                      <ArrowUpRight aria-hidden className="h-4 w-4 text-chicha-100" />
                    </span>
                    <span className="mt-4 font-display text-lg font-bold">{v.nombre}</span>
                    <span className="mt-1 text-sm text-chicha-100">{v.linea}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/panel" className="flex h-full flex-col rounded-2xl bg-aji-500 p-5 text-tinta">
                  <span className="font-display text-lg font-bold">El panel por dentro</span>
                  <span className="mt-1 text-sm">Las pantallas donde se ve todo esto.</span>
                  <span className="mt-auto pt-3 text-sm font-semibold">Recorrerlo →</span>
                </Link>
              </li>
            </ul>
          </div>
        </section>
      )}

      {s.preguntas.length > 0 && (
        <FAQ preguntas={s.preguntas} titulo={`Preguntas sobre ${s.nombre.toLowerCase()}`} bajada="Lo que suelen preguntar los dueños antes de encenderlo." />
      )}
      <FinalCTA />
    </>
  );
}
