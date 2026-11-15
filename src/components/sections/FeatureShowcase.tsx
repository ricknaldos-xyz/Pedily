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
    title: "Tu carta, siempre al día",
    description:
      "Arma tu carta con categorías, tamaños y extras. Tus clientes ven fotos y precios y piden desde el celular o la compu.",
    bullets: [
      "Categorías ordenadas como tú quieras",
      "Variantes (tamaños, sabores, presentaciones)",
      "Extras y notas como «sin cebolla» o «extra queso»",
      "Stock que se actualiza solo",
      "Fotos que cargan rápido en cualquier conexión",
    ],
    mockup: "catalog",
  },
  {
    icon: LayoutDashboard,
    title: "Todos tus pedidos en un solo panel",
    description:
      "Web, WhatsApp o kiosko, da igual: todo llega al mismo panel, con aviso al instante y estados claros. Tu equipo siempre al día.",
    bullets: [
      "3 canales, un solo panel",
      "Aviso al toque cuando entra un pedido",
      "10 estados: por verificar, confirmado, en cocina, listo, en camino, entregado...",
      "Roles para tu equipo: admin, cocina, operador",
      "Historial completo de cada pedido",
      "Verificación de pagos Yape/Plin con foto",
    ],
    mockup: "dashboard",
  },
  {
    icon: CreditCard,
    title: "Cobra como quieras",
    description:
      "Tarjeta, Yape o Plin, directo a tu cuenta. Y la boleta o factura sale automática, directo a SUNAT.",
    bullets: [
      "Tarjetas con Culqi (web y WhatsApp)",
      "Tarjeta y Yape también en el kiosko",
      "Yape y Plin por QR con verificación del comprobante",
      "Boleta y factura electrónica automáticas",
      "Conectado con Nubefact y SUNAT",
    ],
    mockup: "payments",
  },
  {
    icon: Monitor,
    title: "Kiosko: tus clientes piden solos",
    description:
      "Una pantalla táctil en tu local: el cliente pide y paga solo, o paga en caja. El pedido llega a cocina.",
    bullets: [
      "Pantalla táctil fácil de usar",
      "Tu carta completa con fotos",
      "Personalizaciones y extras",
      "Paga con tarjeta o Yape en pantalla, o en caja",
      "Ticket y boleta impresos (requiere PC con Windows e impresora térmica)",
      "El pedido aparece en el panel al instante",
    ],
    mockup: "kiosk",
  },
  {
    icon: MessageCircle,
    title: "Asistente de WhatsApp (desde el plan de S/ 499)",
    description:
      "Tu asistente con IA atiende WhatsApp a cualquier hora: responde preguntas, recomienda platos y cierra pedidos. Cuando hace falta, pasa la conversación a tu equipo.",
    bullets: [
      "Entiende pedidos escritos en lenguaje natural",
      "Toma el pedido completo por chat, del «hola» al pago",
      "Tu equipo toma el chat cuando quiera",
      "Nunca inventa precios: valida contra tu catálogo",
    ],
    mockup: "whatsapp",
  },
  {
    icon: MapPin,
    title: "Delivery bajo control",
    description:
      "Define tus zonas de reparto con su tarifa y su tiempo de entrega. Si necesitas repartidores, conecta con PedidosYa Envíos.",
    bullets: [
      "Tarifa y tiempo por zona",
      "El costo de envío se calcula solo",
      "Envíos con PedidosYa cuando no tienes repartidor",
      "Opción de recojo en tienda",
      "Clientes guardan varias direcciones",
      "Tu cliente ve el estado de su pedido",
    ],
    mockup: "delivery",
  },
  {
    icon: Gift,
    title: "Clientes que vuelven",
    description:
      "Cupones, referidos y saldo a favor para que tus clientes repitan. Los enciendes tú desde «Opciones de tu tienda».",
    bullets: [
      "Cupones de descuento (% o monto fijo)",
      "Descuentos por categoría o producto",
      "Vencimiento y límite de usos",
      "Referidos y saldo a favor, si los enciendes",
      "Tus clientes repiten su último pedido en dos toques",
    ],
    mockup: "loyalty",
  },
];

function FeatureMockup({ type }: { type: string }) {
  const mockups: Record<string, React.ReactNode> = {
    catalog: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-sand-700">Carta</h4>
          <span className="text-xs text-sand-400">12 productos</span>
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
          { name: "Lomo saltado", price: "S/ 32.00" },
          { name: "Ceviche clásico", price: "S/ 38.00" },
          { name: "Arroz con Pollo", price: "S/ 28.00" },
        ].map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-3 rounded-lg border border-sand-100 p-2"
          >
            <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200" />
            <div className="flex-1">
              <p className="text-sm font-medium text-sand-700">{item.name}</p>
              <p className="text-xs text-sand-400">Incluye guarnición</p>
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
          <h4 className="text-sm font-bold text-sand-700">Pedidos hoy</h4>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Nuevos", value: "8", color: "text-blue-600" },
            { label: "En proceso", value: "5", color: "text-yellow-600" },
            { label: "Entregados", value: "23", color: "text-green-600" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg bg-sand-50 p-2 text-center"
            >
              <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-sand-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    payments: (
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-sand-700">Formas de pago</h4>
        {[
          { name: "Tarjeta (Culqi)", icon: "💳", status: "Web/Bot" },
          { name: "Yape / Plin", icon: "📱", status: "Todos" },
        ].map((method) => (
          <div
            key={method.name}
            className="flex items-center justify-between rounded-lg border border-sand-100 p-2"
          >
            <div className="flex items-center gap-2">
              <span>{method.icon}</span>
              <span className="text-sm text-sand-700">{method.name}</span>
            </div>
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              {method.status}
            </span>
          </div>
        ))}
        <div className="mt-2 rounded-lg bg-primary-50 p-2 text-center">
          <p className="text-xs text-primary-700">
            Boletas SUNAT automáticas
          </p>
        </div>
      </div>
    ),
    kiosk: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-sand-700">Kiosko</h4>
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
            Autoservicio
          </span>
        </div>
        <div className="rounded-xl border-2 border-sand-200 bg-sand-900 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-medium text-sand-400">
              RESTAURANTE DEMO
            </span>
            <span className="rounded bg-green-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
              PEDIR
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {["Entradas", "Platos", "Bebidas", "Postres"].map((cat) => (
              <div
                key={cat}
                className="rounded-lg bg-sand-800 p-2 text-center"
              >
                <div className="mb-1 h-6 w-full rounded bg-gradient-to-br from-orange-400/30 to-orange-600/30" />
                <span className="text-[9px] font-medium text-white">{cat}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between rounded-lg bg-primary-600 p-2">
            <span className="text-[10px] text-white">2 platos</span>
            <span className="text-xs font-bold text-white">S/ 45.00</span>
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <span className="rounded bg-sand-100 px-2 py-1 text-[10px] text-sand-500">
            Tarjeta
          </span>
          <span className="rounded bg-sand-100 px-2 py-1 text-[10px] text-sand-500">
            En caja
          </span>
          <span className="rounded bg-sand-100 px-2 py-1 text-[10px] text-sand-500">
            Yape
          </span>
        </div>
      </div>
    ),
    delivery: (
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-sand-700">Zona de cobertura</h4>
        <div className="flex h-32 platos-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-green-50">
          <div className="relative">
            <div className="h-20 w-20 rounded-full border-2 border-dashed border-primary-300 bg-primary-50/50" />
            <MapPin className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-primary-600" />
          </div>
        </div>
        <div className="flex justify-between text-xs text-sand-400">
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
            <h4 className="text-sm font-bold text-sand-700">
              WhatsApp + IA
            </h4>
          </div>
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-medium text-purple-700">
            Desde S/ 499
          </span>
        </div>
        <div className="space-y-2 rounded-lg bg-sand-50 p-3">
          <div className="ml-auto w-3/4 rounded-lg rounded-br-sm bg-green-100 p-2 text-xs text-sand-700">
            ¿Qué me recomiendas para cenar?
          </div>
          <div className="w-3/4 rounded-lg rounded-bl-sm bg-white p-2 text-xs text-sand-700">
            ¡Te recomiendo el lomo saltado, es el favorito! Viene con arroz y papas fritas. ¿Te lo agrego al pedido?
          </div>
          <div className="ml-auto w-3/4 rounded-lg rounded-br-sm bg-green-100 p-2 text-xs text-sand-700">
            ¡Sí, dale! Y una gaseosa
          </div>
          <div className="w-3/4 rounded-lg rounded-bl-sm bg-white p-2 text-xs text-sand-700">
            ¡Listo! Tu pedido:
            <div className="mt-1 space-y-0.5 text-[10px]">
              <p>1x Lomo saltado - S/ 32.00</p>
              <p>1x Inca Kola 500ml - S/ 5.00</p>
              <p className="font-bold">Total: S/ 37.00</p>
            </div>
          </div>
        </div>
      </div>
    ),
    loyalty: (
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-sand-700">
          Cupón de descuento
        </h4>
        <div className="rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 p-4 text-white">
          <p className="text-xs opacity-80">Tu cupón</p>
          <p className="text-2xl font-bold">10 % en tu próximo pedido</p>
          <p className="mt-1 text-xs opacity-80">Código: VUELVE10</p>
        </div>
        <div className="flex justify-between text-xs text-sand-400">
          <span>Válido 30 días</span>
          <span>1 uso por cliente</span>
        </div>
      </div>
    ),
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-sand-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
      {mockups[type]}
    </div>
  );
}

export function FeatureShowcase() {
  return (
    <Section id="funcionalidades" className="bg-sand-50">
      <Container>
        <AnimatedSection className="text-center">
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            Funcionalidades
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-sand-900 sm:text-4xl lg:text-5xl">
            Todo lo que necesitas para vender por tu cuenta
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sand-500">
            Catálogo, pedidos, pagos, delivery, fidelización y operación. Un
            solo sistema, una sola cuenta.
          </p>
        </AnimatedSection>

        <div className="mt-16 space-y-24">
          {features.map((feature, i) => {
            const isOdd = i % 2 === 1;
            return (
              <div
                key={feature.title}
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16`}
              >
                <AnimatedSection
                  variant={isOdd ? "fade-right" : "fade-left"}
                  className={isOdd ? "lg:order-2" : ""}
                >
                  <div className="inline-flex rounded-xl bg-primary-50 p-3">
                    <feature.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-sand-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-sand-500">{feature.description}</p>
                  <ul className="mt-6 space-y-2.5">
                    {feature.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-sm text-sand-600"
                      >
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-50">
                          <Check className="h-3 w-3 text-accent-600" />
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </AnimatedSection>
                <AnimatedSection
                  variant={isOdd ? "fade-left" : "fade-right"}
                  delay={0.1}
                  className={isOdd ? "lg:order-1" : ""}
                >
                  <FeatureMockup type={feature.mockup} />
                </AnimatedSection>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
