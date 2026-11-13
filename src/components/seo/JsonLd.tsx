import { CONTACT_EMAIL, WHATSAPP_TEL, whatsappLink } from "@/lib/site";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pedily",
    legalName: "Hub de Innovacion Digital SAC",
    url: "https://pedily.com",
    logo: "https://pedily.com/favicon.svg",
    description:
      "El sistema operativo de tu restaurante. Vende por web, WhatsApp con IA y kiosko, y opera pedidos, inventario, finanzas y facturacion SUNAT desde un solo Hub. Sin comisiones.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lima",
      addressCountry: "PE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      ...(CONTACT_EMAIL ? { email: CONTACT_EMAIL } : {}),
      availableLanguage: ["Spanish"],
    },
    ...(whatsappLink() ? { sameAs: [whatsappLink()] } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pedily",
    url: "https://pedily.com",
    description:
      "Plataforma de pedidos online para restaurantes, pastelerias y negocios de comida. Sin comisiones por pedido.",
    publisher: {
      "@type": "Organization",
      name: "Pedily",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareApplicationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Pedily",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "El sistema operativo de tu restaurante: tienda web, bot de WhatsApp con IA, kiosko de autoservicio, Hub de pedidos en tiempo real, inventario, finanzas y facturacion SUNAT. Todo integrado.",
    featureList: [
      "Tienda web con checkout",
      "Bot de WhatsApp con IA",
      "Kiosko de autoservicio",
      "Panel de pedidos de todos tus canales en tiempo real",
      "Facturacion electronica SUNAT (Nubefact)",
      "Cobros con Culqi, Yape y Plin",
      "Inventario, recetas y control de costos",
      "Finanzas: caja, P&L y planilla",
      "Cupones y base de clientes propia",
      "Envíos con PedidosYa",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQPageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Que incluye Pedily exactamente?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pedily es el sistema operativo de tu restaurante. Es para un local. Por un lado vendes en varios canales: tienda web, bot de WhatsApp con IA y kiosko de autoservicio. Por el otro, operas todo desde un Hub en tiempo real: pedidos, cocina, inventario, recetas, caja, finanzas (P&L y planilla), facturacion SUNAT y fidelizacion.",
        },
      },
      {
        "@type": "Question",
        name: "Pedily maneja inventario y finanzas, no solo pedidos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Si. Ademas de vender, controlas tu negocio: inventario por almacen con alertas de stock, recetas con costo de ingredientes para conocer tu margen real, caja con cierre cuadrado, P&L, flujo de caja, compras a proveedores y planilla de tu equipo. Lo que otros venden por separado, aqui viene integrado.",
        },
      },
      {
        "@type": "Question",
        name: "¿Pedily también recibe pedidos de marketplaces?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Los pedidos de Rappi y PedidosYa se siguen atendiendo en sus propias plataformas. Pedily es para vender por tus canales propios (web, WhatsApp y kiosko) sin comisión por pedido. Para el reparto sí puedes usar PedidosYa Envíos.",
        },
      },
      {
        "@type": "Question",
        name: "Cuanto cuesta Pedily?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Te preparamos una cotización a la medida de tu restaurante. No cobramos comisión por pedido.",
        },
      },
      {
        "@type": "Question",
        name: "Pedily cobra comision por pedido?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. No cobramos comisión por pedido. Solo pagas las comisiones de la pasarela de pago (Culqi), que son del proveedor.",
        },
      },
      {
        "@type": "Question",
        name: "¿Puedo verlo antes de decidir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Te mostramos una tienda de demostración completa y resolvemos tus dudas. La puesta en marcha la hacemos contigo, paso a paso.",
        },
      },
      {
        "@type": "Question",
        name: "Como funciona el bot de WhatsApp?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El bot usa inteligencia artificial (Claude de Anthropic) para conversar con tus clientes y tomar pedidos automaticamente. Entiende lenguaje natural, muestra el menu, agrega productos al carrito y procesa el pedido. Tu puedes intervenir en cualquier momento si lo deseas.",
        },
      },
      {
        "@type": "Question",
        name: "Pedily emite boletas y facturas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Si. Pedily esta integrado con Nubefact para emitir boletas y facturas electronicas automaticamente, directo a SUNAT.",
        },
      },
      {
        "@type": "Question",
        name: "Necesito conocimientos tecnicos para usar Pedily?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Tú nos das tu carta, tus fotos y tus horarios; nosotros lo dejamos configurado y te enseñamos a usarlo.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://pedily.com",
    name: "Pedily",
    description:
      "Plataforma de pedidos online para restaurantes en Peru. Sin comisiones.",
    url: "https://pedily.com",
    ...(WHATSAPP_TEL ? { telephone: WHATSAPP_TEL } : {}),
    ...(CONTACT_EMAIL ? { email: CONTACT_EMAIL } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lima",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
