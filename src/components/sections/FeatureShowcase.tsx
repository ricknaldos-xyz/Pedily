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
    title: "Tu menu, siempre actualizado",
    description:
      "Arma tu catalogo con categorias, variantes y personalizaciones. Tus clientes ven fotos, precios y piden desde el celular o la compu.",
    bullets: [
      "Categorias organizadas como tu quieras",
      "Variantes (tamanos, sabores, presentaciones)",
      "Modificadores tipo 'sin cebolla', 'extra queso'",
      "Stock que se actualiza solo",
      "Fotos que cargan rapido en cualquier conexion",
    ],
    mockup: "catalog",
  },
  {
    icon: LayoutDashboard,
    title: "Hub: todos tus pedidos en un lugar",
    description:
      "Web, WhatsApp o kiosko, da igual. Todo llega al mismo Hub. Notificacion instantanea, estados claros, tu equipo siempre al dia.",
    bullets: [
      "3 canales, 1 solo dashboard",
      "Notificacion al toque cuando entra un pedido",
      "9 estados: nuevo, cocina, listo, en camino, entregado...",
      "Roles para tu equipo: admin, cocina, operador",
      "Historial completo de cada pedido",
      "Verificacion de pagos Yape/Plin con foto",
    ],
    mockup: "dashboard",
  },
  {
    icon: CreditCard,
    title: "Cobra como quieras",
    description:
      "Tarjeta, Yape, Plin, efectivo o POS. Tu eliges. Y la boleta o factura sale automatica, directo a SUNAT.",
    bullets: [
      "Tarjetas con Culqi (web y WhatsApp)",
      "POS y QR con IZIPAY (kiosko)",
      "Yape y Plin con verificacion de comprobante",
      "Efectivo contra entrega",
      "Boleta y Factura electronica automatica",
      "Integracion con Nubefact y SUNAT",
    ],
    mockup: "payments",
  },
  {
    icon: Monitor,
    title: "Kiosko: tus clientes piden solos",
    description:
      "Una tablet en tu local y listo. El cliente ordena, paga y el pedido llega a cocina. Sin cajero, sin colas.",
    bullets: [
      "Pantalla tactil facil de usar",
      "Tu menu completo con fotos",
      "Personalizaciones y modificadores",
      "Paga con tarjeta, QR o Yape (IZIPAY)",
      "Ticket y boleta automaticos",
      "El pedido aparece en el Hub al instante",
    ],
    mockup: "kiosk",
  },
  {
    icon: MessageCircle,
    title: "Bot WhatsApp que vende por ti",
    description:
      "Tu asistente con IA (Claude) atiende WhatsApp 24/7. Responde preguntas, recomienda platos y cierra pedidos. Tu solo supervisas.",
    bullets: [
      "Entiende como hablan tus clientes",
      "Responde dudas sobre menu, horarios, delivery",
      "Toma el pedido completo por chat",
      "Tu puedes intervenir cuando quieras",
      "Todas las conversaciones en un solo lugar",
      "Detecta cuando el cliente quiere comprar",
    ],
    mockup: "whatsapp",
  },
  {
    icon: MapPin,
    title: "Delivery bajo control",
    description:
      "Dibuja tu zona en el mapa, el sistema calcula el costo. Si necesitas repartidores, conecta con PedidosYa Envios.",
    bullets: [
      "Mapa interactivo para definir cobertura",
      "Costo automatico por zona o distrito",
      "Tracking en vivo con PedidosYa",
      "Opcion de recojo en tienda",
      "Clientes guardan varias direcciones",
      "Tu cliente sigue su pedido en tiempo real",
    ],
    mockup: "delivery",
  },
  {
    icon: Gift,
    title: "Clientes que vuelven",
    description:
      "Puntos por cada compra, cupones y referidos. Tus clientes ganan, tu vendes mas. Todos felices.",
    bullets: [
      "Puntos automaticos por cada sol gastado",
      "Cupones de descuento (% o monto fijo)",
      "Descuentos por categoria o producto",
      "Programa de referidos que crece solo",
      "El cliente ve sus puntos en su perfil",
      "Le avisas por WhatsApp cuando tiene beneficios",
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
            Todo integrado, nada extra que instalar
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Catalogo, pedidos, pagos, delivery, fidelizacion. Un solo sistema, una sola cuenta.
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
