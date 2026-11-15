import { CONTACT_EMAIL, EMPRESA, WHATSAPP_TEL, whatsappLink } from "@/lib/site";
import { FAQS } from "@/lib/faq";
import { PLANES } from "@/lib/planes";

const SITE_URL = "https://pedily.com";

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
          description: `${plan.paraQuien} Precio al mes con IGV incluido.`,
        })),
        featureList: [
          "Tienda web con pedido y pago online",
          "Asistente de pedidos por WhatsApp con IA (desde el plan de S/ 499)",
          "Kiosko de autoservicio (plan de S/ 999)",
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

/** Mismo contenido que la FAQ visible (src/lib/faq.ts). */
export function FAQPageJsonLd() {
  return (
    <Script
      schema={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
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
