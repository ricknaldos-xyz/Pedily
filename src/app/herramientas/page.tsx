import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { HERRAMIENTAS, SITE_URL } from "@/lib/herramientas";
import { ArrowRight, Calculator } from "lucide-react";

const TITULO = "Herramientas gratis para restaurantes en Perú | Pedily";
const DESCRIPCION =
  "Calculadoras gratis con fuentes oficiales: comisión de apps de delivery, IGV de restaurantes MYPE 2026–2027 y costo de mensajes de WhatsApp Business.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: `${SITE_URL}/herramientas` },
  openGraph: { title: TITULO, description: DESCRIPCION, url: `${SITE_URL}/herramientas`, images: ["/og-image.png"] },
};

export default function HerramientasPage() {
  return (
    <div className="bg-cream-50">
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
      <Container className="max-w-3xl pb-14 pt-8 sm:pb-20 sm:pt-14">
        <h1 className="text-[1.85rem] font-extrabold leading-tight tracking-tight text-sand-900 sm:text-4xl">
          Herramientas gratis para restaurantes
        </h1>
        <p className="mt-3 text-base leading-relaxed text-sand-600">
          Haz las cuentas de tu restaurante con datos oficiales. Sin registrarte:
          cada calculadora cita su fuente.
        </p>
        <ul className="mt-6 space-y-3">
          {HERRAMIENTAS.map((h) => (
            <li key={h.slug}>
              <a
                href={`/herramientas/${h.slug}`}
                className="group flex items-start gap-3 rounded-2xl bg-white p-4 shadow-card transition hover:ring-2 hover:ring-primary-200"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                  <Calculator className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-sand-900">{h.titulo}</span>
                  <span className="mt-0.5 block text-sm text-sand-600">{h.resumen}</span>
                </span>
                <ArrowRight className="mt-2 h-4 w-4 flex-shrink-0 text-primary-600 transition-transform group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
