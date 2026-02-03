"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  ShoppingBag,
  LayoutDashboard,
  CreditCard,
  MapPin,
  MessageCircle,
  Gift,
  Check,
  Monitor,
} from "lucide-react";

const features = [
  {
    icon: ShoppingBag,
    title: "Menu y catalogo digital",
    description:
      "Crea un catalogo atractivo con categorias, variantes de productos, modificadores y precios promocionales. Tus clientes navegan y piden desde cualquier dispositivo.",
    bullets: [
      "Categorias y subcategorias organizadas",
      "Variantes de producto (tamanios, sabores)",
      "Modificadores y personalizaciones",
      "Control de stock en tiempo real",
      "Imagenes optimizadas de productos",
    ],
    mockup: "catalog",
  },
  {
    icon: LayoutDashboard,
    title: "Hub de gestion de pedidos",
    description:
      "Gestiona todos tus pedidos desde un solo lugar. Pedidos de web, WhatsApp y kiosko llegan al mismo dashboard con notificaciones en tiempo real.",
    bullets: [
      "Pedidos de 3 canales en un solo dashboard",
      "Notificaciones en tiempo real (nuevos pedidos al instante)",
      "9 estados de pedido: revision, cocina, listo, en camino, entregado",
      "5 roles de equipo: Super Admin, Admin, Operador, Cocina, Cliente",
      "Historial completo con timeline de cada pedido",
      "Pre-ordenes con verificacion de comprobantes Yape/Plin",
    ],
    mockup: "dashboard",
  },
  {
    icon: CreditCard,
    title: "Pagos integrados",
    description:
      "Acepta pagos con tarjeta (Culqi), POS (IZIPAY), Yape, Plin o efectivo. Facturacion electronica con SUNAT incluida.",
    bullets: [
      "Tarjetas de credito y debito (Culqi)",
      "POS y QR en kiosko (IZIPAY)",
      "Yape, Plin con verificacion de comprobante",
      "Pago contra entrega en efectivo",
      "Facturacion electronica SUNAT (Boleta/Factura)",
      "Nubefact para emision automatica de comprobantes",
    ],
    mockup: "payments",
  },
  {
    icon: Monitor,
    title: "Kiosko de autoservicio",
    description:
      "Terminal de autoservicio para que tus clientes ordenen en el local sin hacer cola. Ideal para restaurantes de alto trafico y patios de comida.",
    bullets: [
      "Interfaz tactil optimizada para tablets",
      "Catalogo visual con fotos y precios",
      "Carrito con personalizaciones y modificadores",
      "Pago con tarjeta, QR y Yape/Plin (IZIPAY)",
      "Emision automatica de ticket y boleta",
      "Pedidos llegan directo al Hub y cocina",
    ],
    mockup: "kiosk",
  },
  {
    icon: MessageCircle,
    title: "Bot de WhatsApp con IA",
    description:
      "Un asistente virtual potenciado por Claude AI que atiende a tus clientes por WhatsApp 24/7. Entiende preguntas, recomienda platos y toma pedidos completos de forma conversacional.",
    bullets: [
      "IA conversacional que entiende lenguaje natural",
      "Responde preguntas sobre el menu y horarios",
      "Flujo completo: catalogo, carrito, direccion, pago",
      "Toma de control humano cuando necesites",
      "Gestion centralizada de todas las conversaciones",
      "Deteccion automatica de intencion de compra",
    ],
    mockup: "whatsapp",
  },
  {
    icon: MapPin,
    title: "Delivery inteligente",
    description:
      "Define tu zona de cobertura en el mapa, calcula costos de delivery automaticamente e integra con PedidosYa para despacho con repartidores externos.",
    bullets: [
      "Mapa de cobertura interactivo con Google Maps",
      "Calculo automatico de costo por zona/distrito",
      "Integracion con PedidosYa (tracking en vivo)",
      "Recojo en tienda como opcion",
      "Multiples direcciones guardadas por cliente",
      "Seguimiento del pedido en tiempo real",
    ],
    mockup: "delivery",
  },
  {
    icon: Gift,
    title: "Fidelizacion y referidos",
    description:
      "Fideliza a tus clientes con puntos por cada compra, cupones de descuento y un programa de referidos que crece tu base de clientes organicamente.",
    bullets: [
      "Acumulacion automatica de puntos por compra",
      "Cupones y codigos de descuento (fijo y porcentaje)",
      "Descuentos por categoria o producto",
      "Programa de referidos (cada cliente trae mas clientes)",
      "Dashboard de beneficios visible para el cliente",
      "Notificaciones por WhatsApp y email",
    ],
    mockup: "loyalty",
  },
];

function FeatureMockup({ type }: { type: string }) {
  const mockups: Record<string, React.ReactNode> = {
    catalog: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-700">Menu</h4>
          <span className="text-xs text-slate-400">12 productos</span>
        </div>
        <div className="flex gap-2 overflow-hidden">
          {["Entradas", "Platos", "Bebidas", "Postres"].map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 whitespace-nowrap"
            >
              {cat}
            </span>
          ))}
        </div>
        {[
          { name: "Lomo Saltado", price: "S/ 32.00" },
          { name: "Ceviche Clasico", price: "S/ 38.00" },
          { name: "Arroz con Pollo", price: "S/ 28.00" },
        ].map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-3 rounded-lg border border-slate-100 p-2"
          >
            <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-700">{item.name}</p>
              <p className="text-xs text-slate-400">Incluye guarnicion</p>
            </div>
            <span className="text-sm font-bold text-primary-600">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    ),
    dashboard: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-700">Pedidos hoy</h4>
          <span className="rounded-full bg-accent-100 px-2 py-0.5 text-xs font-medium text-accent-700">
            +18%
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Nuevos", value: "8", color: "text-blue-600" },
            { label: "En proceso", value: "5", color: "text-yellow-600" },
            { label: "Entregados", value: "23", color: "text-green-600" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg bg-slate-50 p-2 text-center"
            >
              <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
        </div>
        <p className="text-xs text-slate-400">
          Meta del dia: 75% completado (S/ 2,340 de S/ 3,100)
        </p>
      </div>
    ),
    payments: (
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-slate-700">Metodos de pago</h4>
        {[
          { name: "Tarjeta (Culqi)", icon: "💳", status: "Web/Bot" },
          { name: "POS/QR (IZIPAY)", icon: "🏪", status: "Kiosko" },
          { name: "Yape / Plin", icon: "📱", status: "Todos" },
          { name: "Efectivo", icon: "💵", status: "Delivery" },
        ].map((method) => (
          <div
            key={method.name}
            className="flex items-center justify-between rounded-lg border border-slate-100 p-2"
          >
            <div className="flex items-center gap-2">
              <span>{method.icon}</span>
              <span className="text-sm text-slate-700">{method.name}</span>
            </div>
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              {method.status}
            </span>
          </div>
        ))}
        <div className="mt-2 rounded-lg bg-primary-50 p-2 text-center">
          <p className="text-xs text-primary-700">
            Facturacion electronica SUNAT incluida
          </p>
        </div>
      </div>
    ),
    kiosk: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-700">Kiosko</h4>
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
            Autoservicio
          </span>
        </div>
        <div className="rounded-xl border-2 border-slate-200 bg-slate-900 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-medium text-slate-400">
              WANTAN CLAN
            </span>
            <span className="rounded bg-green-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
              PEDIR
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {["Entradas", "Platos", "Bebidas", "Postres"].map((cat) => (
              <div
                key={cat}
                className="rounded-lg bg-slate-800 p-2 text-center"
              >
                <div className="mb-1 h-6 w-full rounded bg-gradient-to-br from-orange-400/30 to-orange-600/30" />
                <span className="text-[9px] font-medium text-white">{cat}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between rounded-lg bg-primary-600 p-2">
            <span className="text-[10px] text-white">2 items</span>
            <span className="text-xs font-bold text-white">S/ 45.00</span>
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <span className="rounded bg-slate-100 px-2 py-1 text-[10px] text-slate-500">
            Tarjeta
          </span>
          <span className="rounded bg-slate-100 px-2 py-1 text-[10px] text-slate-500">
            QR
          </span>
          <span className="rounded bg-slate-100 px-2 py-1 text-[10px] text-slate-500">
            Yape
          </span>
        </div>
      </div>
    ),
    delivery: (
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-slate-700">Zona de cobertura</h4>
        <div className="flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-green-50">
          <div className="relative">
            <div className="h-20 w-20 rounded-full border-2 border-dashed border-primary-300 bg-primary-50/50" />
            <MapPin className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-primary-600" />
          </div>
        </div>
        <div className="flex justify-between text-xs text-slate-400">
          <span>Radio: 5 km</span>
          <span>Costo base: S/ 5.00</span>
        </div>
      </div>
    ),
    whatsapp: (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-green-500 p-1.5">
              <MessageCircle className="h-full w-full text-white" />
            </div>
            <h4 className="text-sm font-bold text-slate-700">
              WhatsApp + IA
            </h4>
          </div>
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-medium text-purple-700">
            Claude AI
          </span>
        </div>
        <div className="space-y-2 rounded-lg bg-slate-50 p-3">
          <div className="ml-auto w-3/4 rounded-lg rounded-br-sm bg-green-100 p-2 text-xs text-slate-700">
            Que me recomiendas para cenar?
          </div>
          <div className="w-3/4 rounded-lg rounded-bl-sm bg-white p-2 text-xs text-slate-700">
            Te recomiendo nuestro Lomo Saltado, es el favorito! Viene con arroz y papas fritas. Quieres que te lo agregue al carrito?
          </div>
          <div className="ml-auto w-3/4 rounded-lg rounded-br-sm bg-green-100 p-2 text-xs text-slate-700">
            Si, dale! Y una gaseosa
          </div>
          <div className="w-3/4 rounded-lg rounded-bl-sm bg-white p-2 text-xs text-slate-700">
            Listo! Tu carrito:
            <div className="mt-1 space-y-0.5 text-[10px]">
              <p>1x Lomo Saltado - S/ 32.00</p>
              <p>1x Inca Kola 500ml - S/ 5.00</p>
              <p className="font-bold">Total: S/ 37.00</p>
            </div>
          </div>
        </div>
      </div>
    ),
    loyalty: (
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-slate-700">
          Programa de puntos
        </h4>
        <div className="rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 p-4 text-white">
          <p className="text-xs opacity-80">Puntos acumulados</p>
          <p className="text-2xl font-bold">1,250</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/30">
            <div className="h-full w-3/5 rounded-full bg-white" />
          </div>
          <p className="mt-1 text-xs opacity-80">
            750 mas para tu proximo descuento
          </p>
        </div>
        <div className="flex justify-between text-xs text-slate-400">
          <span>10 pts / S/ 1 gastado</span>
          <span>2,000 pts = 15% dcto</span>
        </div>
      </div>
    ),
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      {mockups[type]}
    </div>
  );
}

export function FeatureShowcase() {
  return (
    <Section id="funcionalidades" className="bg-slate-50">
      <Container>
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Todo lo que tu negocio necesita
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Desde el catalogo hasta la gestion de pedidos, todo integrado en una
            sola plataforma.
          </p>
        </AnimatedSection>

        <div className="mt-16 space-y-20">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title}>
              <div
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="inline-flex rounded-xl bg-primary-50 p-3">
                    <feature.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-slate-500">{feature.description}</p>
                  <ul className="mt-6 space-y-2">
                    {feature.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-500" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <FeatureMockup type={feature.mockup} />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}
