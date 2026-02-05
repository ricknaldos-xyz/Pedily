export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pedily",
    legalName: "Hub de Innovacion Digital SAC",
    url: "https://pedily.com",
    logo: "https://pedily.com/favicon.svg",
    description:
      "Plataforma multicanal para restaurantes. Recibe pedidos por web, WhatsApp y kiosko. Sin comisiones.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lima",
      addressCountry: "PE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hola@pedily.com",
      availableLanguage: ["Spanish"],
    },
    sameAs: ["https://wa.me/51999999999"],
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
      "Plataforma multicanal para restaurantes. Tienda web, bot de WhatsApp con IA y kiosko de autoservicio. Todo integrado en un solo hub.",
    offers: [
      {
        "@type": "Offer",
        name: "Plan Inicio",
        price: "249",
        priceCurrency: "PEN",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Plan Crecimiento",
        price: "499",
        priceCurrency: "PEN",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Plan Empresa",
        price: "999",
        priceCurrency: "PEN",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "48",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "Tienda web con checkout",
      "Bot de WhatsApp con IA",
      "Kiosko de autoservicio",
      "Hub de pedidos multicanal",
      "Facturacion electronica SUNAT",
      "Integracion con Culqi e IZIPAY",
      "Programa de fidelizacion",
      "Integracion PedidosYa",
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
          text: "Pedily incluye tu tienda web con carrito y checkout, bot de WhatsApp con IA que toma pedidos automaticamente, kiosko de autoservicio para tu local, hub de gestion de pedidos, facturacion electronica SUNAT, sistema de fidelizacion y mas. Todo en una sola plataforma.",
        },
      },
      {
        "@type": "Question",
        name: "Cuanto cuesta Pedily?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pedily tiene 3 planes: Inicio a S/ 249/mes, Crecimiento a S/ 499/mes y Empresa a S/ 999/mes. Todos sin comisiones por pedido. Con pago anual obtienes 20% de descuento.",
        },
      },
      {
        "@type": "Question",
        name: "Pedily cobra comision por pedido?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Pedily cobra una tarifa fija mensual, sin comisiones por pedido. Vendas 10 o 10,000 pedidos, pagas lo mismo. Solo pagas las comisiones de las pasarelas de pago (Culqi, IZIPAY) que son del proveedor, no de Pedily.",
        },
      },
      {
        "@type": "Question",
        name: "Puedo probar Pedily gratis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Si. Ofrecemos 14 dias de prueba gratis con todas las funcionalidades del plan Crecimiento. No necesitas tarjeta de credito para empezar.",
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
          text: "Si. Pedily esta integrado con Nubefact para emitir boletas y facturas electronicas automaticamente, directo a SUNAT. Disponible en los planes Crecimiento y Empresa.",
        },
      },
      {
        "@type": "Question",
        name: "Necesito conocimientos tecnicos para usar Pedily?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Pedily esta disenado para que cualquier persona pueda configurar su tienda sin conocimientos tecnicos. Ademas, el plan Empresa incluye onboarding personalizado donde te ayudamos a configurar todo.",
        },
      },
      {
        "@type": "Question",
        name: "Puedo cancelar en cualquier momento?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Si. No hay contratos de permanencia. Puedes cancelar tu suscripcion cuando quieras desde tu panel de administracion.",
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
    telephone: "+51999999999",
    email: "hola@pedily.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lima",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -12.0464,
      longitude: -77.0428,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "S/ 249 - S/ 999",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
