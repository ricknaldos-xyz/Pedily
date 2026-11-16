import { CONTACT_EMAIL, EMPRESA, WHATSAPP_TEL, whatsappLink } from "@/lib/site";
import { FAQS, type Pregunta } from "@/lib/faq";
import type { Herramienta } from "@/lib/herramientas";
import { PLANES } from "@/lib/planes";

const SITE_URL = "https://pedily.vercel.app";

const DESCRIPCION =
  "Tienda web, asistente de pedidos por WhatsApp con IA, kiosko y boletas SUNAT para restaurantes en Perú. Desde S/ 249 al mes con IGV, 0 % de comisión por pedido.";

function Script({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationJsonLd() {
  const wa = whatsappLink();
  return (
    <Script
      schema={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Pedily",
        legalName: EMPRESA.razonSocial,
        ...(EMPRESA.ruc ? { taxID: EMPRESA.ruc } : {}),
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.svg`,
        description: DESCRIPCION,
        address: {
          "@type": "PostalAddress",
          ...(EMPRESA.domicilioFiscal
            ? { streetAddress: EMPRESA.domicilioFiscal }
            : {}),
          addressLocality: "Lima",
          addressCountry: "PE",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          ...(CONTACT_EMAIL ? { email: CONTACT_EMAIL } : {}),
          ...(WHATSAPP_TEL ? { telephone: WHATSAPP_TEL } : {}),
          availableLanguage: ["Spanish"],
        },
        ...(wa ? { sameAs: [wa] } : {}),
      }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <Script
      schema={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Pedily",
        url: SITE_URL,
        inLanguage: "es-PE",
        description: DESCRIPCION,
        publisher: { "@type": "Organization", name: "Pedily" },
      }}
    />
  );
}

export function SoftwareApplicationJsonLd() {
  return (
    <Script
      schema={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Pedily",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: DESCRIPCION,
        offers: PLANES.map((plan) => ({
          "@type": "Offer",
          name: plan.nombre,
          price: plan.precioMensual,
          priceCurrency: "PEN",
          description: `${plan.paraQuien} Precio al mes con IGV incluido. Alta S/ ${plan.alta}, gratis con 6 meses de permanencia.`,
        })),
        featureList: [
          "Tienda web con pedido y pago online",
          "Asistente de pedidos por WhatsApp con IA (desde el plan de S/ 499)",
          "Kiosko de autoservicio y QR de mesa que cobra (plan de S/ 999)",
          "Pedidos programados para la hora que elija el cliente",
          "Panel de pedidos de todos tus canales al instante",
          "Boletas y facturas electrónicas SUNAT (con Nubefact)",
          "Cobros con Culqi, Yape y Plin en tu propia cuenta",
          "Cupones, referidos y saldo a favor",
          "Envíos con PedidosYa",
        ],
      }}
    />
  );
}

/**
 * Mismo contenido que la FAQ visible (src/lib/faq.ts por defecto, o las
 * preguntas de una herramienta).
 */
export function FAQPageJsonLd({ preguntas = FAQS }: { preguntas?: Pregunta[] } = {}) {
  return (
    <Script
      schema={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: preguntas.map((f) => ({
          "@type": "Question",
          name: f.pregunta,
          acceptedAnswer: { "@type": "Answer", text: f.respuesta },
        })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <Script
      schema={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

/** Calculadora gratis: WebApplication gratuita + migas de pan. */
export function HerramientaJsonLd({ h }: { h: Herramienta }) {
  const url = `${SITE_URL}/herramientas/${h.slug}`;
  return (
    <>
      <Script
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: h.titulo,
          url,
          description: h.descripcion,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          inLanguage: "es-PE",
          isAccessibleForFree: true,
          offers: { "@type": "Offer", price: "0", priceCurrency: "PEN" },
          publisher: { "@type": "Organization", name: "Pedily", url: SITE_URL },
          citation: h.fuentes.map((f) => ({
            "@type": "CreativeWork",
            name: f.nombre,
            url: f.url,
          })),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Herramientas gratis", url: `${SITE_URL}/herramientas` },
          { name: h.titulo, url },
        ]}
      />
    </>
  );
}

/**
 * Página de solución: Service con su oferta mínima (plan con IGV) + migas.
 * El precio sale de PLANES (src/lib/planes.ts), igual que en la página.
 */
export function SolucionJsonLd({
  slug,
  nombre,
  descripcion,
  precioDesde,
  grupo,
}: {
  slug: string;
  nombre: string;
  descripcion: string;
  precioDesde: number;
  grupo: string;
}) {
  const url = `${SITE_URL}/soluciones/${slug}`;
  return (
    <>
      <Script
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: nombre,
          serviceType: grupo,
          url,
          description: descripcion,
          areaServed: { "@type": "Country", name: "Perú" },
          provider: { "@type": "Organization", name: "Pedily", url: SITE_URL },
          offers: {
            "@type": "Offer",
            price: String(precioDesde),
            priceCurrency: "PEN",
            url: `${SITE_URL}/precios`,
          },
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Soluciones", url: `${SITE_URL}/soluciones` },
          { name: nombre, url },
        ]}
      />
    </>
  );
}

/** Página simple con migas de pan (panel, demo, índice de soluciones). */
export function PaginaJsonLd({ ruta, nombre, descripcion }: { ruta: string; nombre: string; descripcion: string }) {
  const url = `${SITE_URL}${ruta}`;
  return (
    <>
      <Script
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: nombre,
          url,
          description: descripcion,
          inLanguage: "es-PE",
          isPartOf: { "@type": "WebSite", name: "Pedily", url: SITE_URL },
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: nombre, url },
        ]}
      />
    </>
  );
}
