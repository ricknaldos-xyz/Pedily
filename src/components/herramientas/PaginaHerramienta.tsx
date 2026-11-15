import { Container } from "@/components/layout/Container";
import { FAQPageJsonLd, HerramientaJsonLd } from "@/components/seo/JsonLd";
import { HERRAMIENTAS, LEIDO_EL, type Herramienta } from "@/lib/herramientas";
import { ArrowRight, ChevronRight, ExternalLink } from "lucide-react";

/**
 * Esqueleto común de las herramientas gratis: migas, título, la calculadora,
 * cómo se calcula, preguntas (las mismas que el JSON-LD), fuentes oficiales
 * con fecha de lectura, enlace a Pedily y a las otras herramientas.
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
    <div className="bg-cream-50">
      <HerramientaJsonLd h={h} />
      <FAQPageJsonLd preguntas={h.preguntas} />

      <Container className="max-w-3xl pb-12 pt-6 sm:pb-20 sm:pt-12">
        <nav aria-label="Migas de pan" className="text-xs text-sand-500">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <a href="/" className="hover:text-primary-700">Inicio</a>
            </li>
            <li aria-hidden><ChevronRight className="h-3 w-3" /></li>
            <li>
              <a href="/herramientas" className="hover:text-primary-700">Herramientas gratis</a>
            </li>
          </ol>
        </nav>

        <h1 className="mt-3 text-[1.85rem] font-extrabold leading-tight tracking-tight text-sand-900 sm:text-4xl">
          {h.titulo}
        </h1>
        <div className="mt-3 space-y-2 text-base leading-relaxed text-sand-600">{intro}</div>

        <div className="mt-6">{children}</div>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-sand-900">Cómo se calcula</h2>
          <div className="mt-2 space-y-2 text-sm leading-relaxed text-sand-700">{comoSeCalcula}</div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-sand-900">Preguntas frecuentes</h2>
          <div className="mt-3 space-y-2">
            {h.preguntas.map((p) => (
              <details
                key={p.pregunta}
                className="group rounded-xl border border-sand-200 bg-white px-4 py-3 open:border-primary-300"
              >
                <summary className="cursor-pointer list-none text-[15px] font-semibold text-sand-900 marker:hidden">
                  {p.pregunta}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-sand-700">{p.respuesta}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-sand-900">Fuentes</h2>
          <p className="mt-1 text-xs text-sand-500">Leídas el {LEIDO_EL}.</p>
          <ul className="mt-2 space-y-2 text-sm text-sand-700">
            {h.fuentes.map((f) => (
              <li key={f.url} className="rounded-xl bg-white p-3">
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-1 break-words font-semibold text-primary-700 underline underline-offset-2"
                >
                  {f.nombre}
                  <ExternalLink className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                </a>
                <p className="mt-0.5 text-xs leading-relaxed text-sand-600">{f.dato}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-sand-500">
            Es una estimación para orientarte, no asesoría tributaria ni
            financiera. Para tu caso, consulta a tu contador.
          </p>
        </section>

        <section className="mt-10 rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 p-5 text-white sm:p-7">
          <h2 className="text-xl font-extrabold sm:text-2xl">
            Vende por tu web y tu WhatsApp, sin comisión por pedido
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-primary-50/90">
            Pedily es la tienda propia de tu restaurante: web, asistente de
            WhatsApp que conversa y cobra, kiosko y boletas SUNAT, con el dinero
            directo a tu cuenta.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <a
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary-800 hover:bg-primary-50"
            >
              Crear mi tienda <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/precios"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Ver precios
            </a>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-base font-bold text-sand-900">Otras herramientas gratis</h2>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {otras.map((o) => (
              <li key={o.slug}>
                <a
                  href={`/herramientas/${o.slug}`}
                  className="block h-full rounded-xl border border-sand-200 bg-white p-3 hover:border-primary-300"
                >
                  <span className="text-sm font-semibold text-sand-900">{o.titulo}</span>
                  <span className="mt-0.5 block text-xs text-sand-600">{o.resumen}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </div>
  );
}
