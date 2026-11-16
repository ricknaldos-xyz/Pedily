import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bike, MessageCircle, Receipt, type LucideIcon } from "lucide-react";
import { Boton } from "@/components/marca/Boton";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { HERRAMIENTAS, LEIDO_EL, SITE_URL } from "@/lib/herramientas";

const TITULO = "Herramientas gratis para restaurantes en Perú | Pedily";
const DESCRIPCION =
  "Calculadoras gratis con fuentes oficiales: comisión de apps de delivery, IGV de restaurantes MYPE 2026–2027 y costo de mensajes de WhatsApp Business.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: `${SITE_URL}/herramientas` },
  openGraph: { title: TITULO, description: DESCRIPCION, url: `${SITE_URL}/herramientas`, images: ["/og-image.png"] },
};

const ICONO: Record<string, LucideIcon> = {
  "calculadora-comision-delivery": Bike,
  "calculadora-igv-restaurantes": Receipt,
  "costo-mensajes-whatsapp": MessageCircle,
};

export default function HerramientasPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Herramientas gratis", url: `${SITE_URL}/herramientas` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Herramientas gratis para restaurantes",
            itemListElement: HERRAMIENTAS.map((h, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: h.titulo,
              url: `${SITE_URL}/herramientas/${h.slug}`,
            })),
          }),
        }}
      />

      <section className="papel-trama">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-chicha-700">Herramientas gratis</p>
          <h1 className="mt-3 max-w-4xl font-display text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-tinta text-balance sm:text-6xl">
            Haz las cuentas de tu restaurante con datos oficiales
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sand-700">
            Sin registrarte. Cada calculadora cita su fuente oficial, leída el {LEIDO_EL}.
          </p>

          <ul className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
            {HERRAMIENTAS.map((h) => {
              const I = ICONO[h.slug] ?? Receipt;
              return (
                <li key={h.slug}>
                  <Link
                    href={`/herramientas/${h.slug}`}
                    className="group block h-full text-tinta [filter:drop-shadow(0_12px_18px_rgba(36,16,46,0.14))] transition-transform hover:-translate-y-1"
                  >
                    <span className="ticket flex h-full flex-col px-5 py-7">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-aji-500">
                        <I aria-hidden className="h-6 w-6" />
                      </span>
                      <span className="mt-5 font-display text-xl font-bold leading-snug">{h.titulo}</span>
                      <span className="mt-2 flex-1 text-[0.96rem] leading-relaxed text-sand-700">{h.resumen}</span>
                      <span aria-hidden className="punteado my-4 text-tinta/30" />
                      <span className="inline-flex items-center gap-1.5 font-semibold text-chicha-700">
                        Abrir la calculadora
                        <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-14 flex flex-col items-start gap-4 rounded-3xl bg-tinta p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="max-w-2xl font-display text-xl font-bold leading-snug sm:text-2xl">
              ¿Las cuentas dicen que la comisión te pesa? Vende por tu web y tu WhatsApp con 0 % de comisión.
            </p>
            <Boton href="/precios" flecha className="shrink-0">
              Ver precios
            </Boton>
          </div>
        </div>
      </section>
    </>
  );
}
