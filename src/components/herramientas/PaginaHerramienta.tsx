import Link from "next/link";
import { ArrowUpRight, ChevronRight, ExternalLink, Plus } from "lucide-react";
import { Boton } from "@/components/marca/Boton";
import { FAQPageJsonLd, HerramientaJsonLd } from "@/components/seo/JsonLd";
import { HERRAMIENTAS, LEIDO_EL, type Herramienta } from "@/lib/herramientas";
import { PLANES, soles } from "@/lib/planes";

/**
 * Esqueleto común de las herramientas gratis con el sistema «la comanda»:
 * migas, título, la calculadora, cómo se calcula, preguntas (las mismas que el
 * JSON-LD), fuentes oficiales con fecha de lectura, enlace a Pedily y a las
 * otras herramientas.
 */
export function PaginaHerramienta({
  h,
  intro,
  comoSeCalcula,
  children,
}: {
  h: Herramienta;
  intro: React.ReactNode;
  comoSeCalcula: React.ReactNode;
  children: React.ReactNode;
}) {
  const otras = HERRAMIENTAS.filter((x) => x.slug !== h.slug);
  return (
    <>
      <HerramientaJsonLd h={h} />
      <FAQPageJsonLd preguntas={h.preguntas} />

      <section className="papel-trama">
        <div className="mx-auto max-w-4xl px-4 pb-14 pt-6 sm:px-6 sm:pb-20 sm:pt-10">
          <nav aria-label="Migas de pan" className="text-sm text-humo">
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link href="/" className="hover:text-tinta hover:underline">
                  Inicio
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li>
                <Link href="/herramientas" className="hover:text-tinta hover:underline">
                  Herramientas gratis
                </Link>
              </li>
            </ol>
          </nav>

          <p className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.14em] text-chicha-700">
            Herramienta gratis · con fuentes oficiales
          </p>
          <h1 className="mt-3 font-display text-[2.1rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-tinta text-balance sm:text-5xl">
            {h.titulo}
          </h1>
          <div className="mt-4 max-w-3xl space-y-2 text-[1.05rem] leading-relaxed text-sand-700">{intro}</div>

          <div className="mt-8">{children}</div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-tinta sm:text-3xl">Cómo se calcula</h2>
            <div className="mt-4 space-y-3 text-[0.98rem] leading-relaxed text-sand-700">{comoSeCalcula}</div>

            <h2 className="mt-12 font-display text-2xl font-extrabold tracking-[-0.02em] text-tinta sm:text-3xl">Fuentes</h2>
            <p className="mt-1 font-mono text-xs text-humo">Leídas el {LEIDO_EL}.</p>
            <ul className="mt-4 divide-y divide-dashed divide-tinta/20 border-y border-dashed border-tinta/20">
              {h.fuentes.map((f) => (
                <li key={f.url} className="py-3">
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-1 break-words font-semibold text-chicha-700 underline underline-offset-2"
                  >
                    {f.nombre}
                    <ExternalLink aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0" />
                  </a>
                  <p className="mt-0.5 text-sm leading-relaxed text-sand-700">{f.dato}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-sand-700">
              Es una estimación para orientarte, no asesoría tributaria ni financiera. Para tu caso, consulta a tu contador.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-tinta sm:text-3xl">Preguntas frecuentes</h2>
            <div className="mt-4 divide-y divide-dashed divide-tinta/20 border-y border-dashed border-tinta/20">
              {h.preguntas.map((p) => (
                <details key={p.pregunta} className="group">
                  <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-left font-display text-[1.05rem] font-bold text-tinta">
                    {p.pregunta}
                    <Plus aria-hidden className="h-5 w-5 shrink-0 text-chicha-600 transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="pb-5 pr-6 text-[0.96rem] leading-relaxed text-sand-700">{p.respuesta}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-tinta py-14 text-white sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:px-8">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-aji-400">Pedily</p>
            <h2 className="mt-3 font-display text-[1.9rem] font-extrabold leading-[1.05] tracking-[-0.025em] text-balance sm:text-4xl">
              Vende por tu web y tu WhatsApp, sin comisión por pedido
            </h2>
            <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-chicha-100">
              Pedily es la tienda propia de tu restaurante: web, asistente de WhatsApp que conversa y cobra, kiosko y boletas
              SUNAT, con el dinero directo a tu cuenta. Desde {soles(PLANES[0].precioMensual)} al mes con IGV.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Boton href="/contacto" tam="lg" flecha>
                Crear mi tienda
              </Boton>
              <Boton href="/precios" variante="borde-claro" tam="lg">
                Ver precios
              </Boton>
            </div>
          </div>
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-aji-400">Otras herramientas gratis</h2>
            <ul className="mt-4 space-y-3">
              {otras.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/herramientas/${o.slug}`}
                    className="group flex items-start gap-3 rounded-2xl border border-white/15 p-4 transition-colors hover:border-aji-400"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-bold leading-snug">{o.titulo}</span>
                      <span className="mt-1 block text-sm text-chicha-100">{o.resumen}</span>
                    </span>
                    <ArrowUpRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-aji-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
