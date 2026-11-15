"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  ShoppingBag,
  MessageCircle,
  Monitor,
  LayoutDashboard,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Precios de ejemplo, iguales en todas las maquetas.
const PRECIOS: Record<string, string> = {
  "Lomo saltado": "S/ 32.00",
  "Ají de gallina": "S/ 28.00",
  "Chicha morada": "S/ 8.00",
  "Arroz con leche": "S/ 9.00",
};

const screenshots = [
  {
    id: "web",
    name: "Tienda Web",
    icon: ShoppingBag,
    description: "Tu carta en línea con pedido y pago integrados",
    mockup: (
      <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-2xl">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-sand-100 bg-sand-50 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="ml-4 flex-1 rounded-lg bg-white px-3 py-1 text-xs text-sand-400">
            turestaurante.pe
          </div>
        </div>
        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-sand-800">Restaurante Demo</div>
            <div className="rounded-full bg-accent-100 px-2 py-0.5 text-xs font-medium text-accent-700">
              Abierto
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {["Lomo saltado", "Ají de gallina", "Chicha morada", "Arroz con leche"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-xl border border-sand-100 bg-sand-50 p-3"
                >
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-orange-100 to-orange-200" />
                  <p className="mt-2 text-sm font-medium text-sand-700">
                    {item}
                  </p>
                  <p className="text-xs text-sand-400">{PRECIOS[item]}</p>
                </div>
              )
            )}
          </div>
          <div className="mt-4 rounded-xl bg-primary-600 py-3 text-center text-sm font-semibold text-white">
            Ver carrito (2)
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "whatsapp",
    name: "Bot WhatsApp",
    icon: MessageCircle,
    description: "Asistente con IA que toma pedidos (desde el plan de S/ 499); tú intervienes cuando quieras",
    mockup: (
      <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl border-4 border-sand-800 bg-sand-800 shadow-2xl">
        {/* Phone notch */}
        <div className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-sand-800" />
        {/* WhatsApp header */}
        <div className="bg-green-600 px-4 pb-3 pt-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20" />
            <div>
              <p className="font-semibold text-white">Restaurante Demo</p>
              <p className="text-xs text-green-100">en línea</p>
            </div>
          </div>
        </div>
        {/* Chat */}
        <div className="h-80 space-y-3 bg-[#e5ddd5] p-4">
          <div className="ml-auto max-w-[75%] rounded-lg bg-[#dcf8c6] px-3 py-2 text-sm">
            Hola, quiero hacer un pedido
          </div>
          <div className="max-w-[75%] rounded-lg bg-white px-3 py-2 text-sm">
            ¡Hola! Claro, con gusto te ayudo. ¿Te muestro nuestra carta?
          </div>
          <div className="ml-auto max-w-[75%] rounded-lg bg-[#dcf8c6] px-3 py-2 text-sm">
            Sí, porfa, quiero un lomo saltado
          </div>
          <div className="max-w-[75%] rounded-lg bg-white px-3 py-2 text-sm">
            ¡Perfecto! Lomo saltado x1 (S/ 32). ¿Deseas agregar algo más?
          </div>
          <div className="ml-auto max-w-[75%] rounded-lg bg-[#dcf8c6] px-3 py-2 text-sm">
            Una chicha morada
          </div>
          <div className="max-w-[75%] rounded-lg bg-white px-3 py-2 text-sm">
            ¡Listo! Tu pedido: lomo saltado + chicha morada = S/ 40. ¿Pagas con Yape?
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "kiosko",
    name: "Kiosko",
    icon: Monitor,
    description: "Autoservicio en tu local, con pago en pantalla o en caja",
    mockup: (
      <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border-8 border-sand-800 bg-white shadow-2xl">
        {/* Kiosk header */}
        <div className="bg-sand-900 px-6 py-4 text-center">
          <p className="text-xl font-bold text-white">Restaurante Demo</p>
          <p className="text-sm text-sand-400">Toca para ordenar</p>
        </div>
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto border-b border-sand-100 px-4 py-3">
          {["Entradas", "Platos", "Bebidas", "Postres"].map((cat, i) => (
            <button
              key={cat}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                i === 0
                  ? "bg-primary-600 text-white"
                  : "bg-sand-100 text-sand-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 p-4">
          {["Lomo saltado", "Ají de gallina", "Chicha morada", "Arroz con leche"].map((item) => (
            <button
              key={item}
              className="rounded-xl border-2 border-sand-100 p-4 text-center transition-all hover:border-primary-300 hover:bg-primary-50"
            >
              <div className="mx-auto h-16 w-16 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200" />
              <p className="mt-2 font-semibold text-sand-700">{item}</p>
              <p className="text-sm text-primary-600">{PRECIOS[item]}</p>
            </button>
          ))}
        </div>
        {/* Footer */}
        <div className="border-t border-sand-100 bg-sand-50 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-sand-500">Tu orden</p>
              <p className="text-lg font-bold text-sand-800">S/ 36.00</p>
            </div>
            <button className="rounded-xl bg-accent-500 px-6 py-3 font-semibold text-white">
              Pagar
            </button>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "hub",
    name: "Panel",
    icon: LayoutDashboard,
    description: "Gestiona pedidos de todos tus canales en un solo lugar",
    mockup: (
      <div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sand-100 bg-sand-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-600" />
            <span className="font-bold text-sand-700">Panel</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              3 nuevos
            </span>
          </div>
        </div>
        {/* Content */}
        <div className="flex">
          {/* Sidebar */}
          <div className="w-16 border-r border-sand-100 bg-sand-50 py-4">
            {["inbox", "done", "stats", "menu"].map((_, i) => (
              <div
                key={i}
                className={`mx-auto mb-3 h-10 w-10 rounded-lg ${
                  i === 0 ? "bg-primary-100" : "bg-sand-200"
                }`}
              />
            ))}
          </div>
          {/* Orders */}
          <div className="flex-1 p-4">
            <p className="text-sm font-semibold text-sand-500">
              Pedidos de hoy
            </p>
            <div className="mt-3 space-y-2">
              {[
                { id: "#142", status: "Nuevo", channel: "Web", time: "Hace 2m" },
                {
                  id: "#141",
                  status: "Preparando",
                  channel: "WhatsApp",
                  time: "Hace 8m",
                },
                {
                  id: "#140",
                  status: "Listo",
                  channel: "Kiosko",
                  time: "Hace 15m",
                },
              ].map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border border-sand-100 p-3"
                >
                  <div>
                    <p className="font-semibold text-sand-700">{order.id}</p>
                    <p className="text-xs text-sand-400">
                      {order.channel} - {order.time}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      order.status === "Nuevo"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "Preparando"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export function ProductScreenshots() {
  const [active, setActive] = useState("web");

  const activeScreenshot = screenshots.find((s) => s.id === active);

  return (
    <Section id="omnicanal" className="overflow-hidden bg-white">
      <Container>
        <AnimatedSection className="text-center">
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            Vende en todos lados
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-sand-900 sm:text-4xl lg:text-5xl">
            Un canal para cada cliente. Un solo lugar para ti.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sand-500">
            Web, WhatsApp con IA y kiosko de autoservicio. El mismo menú y los
            mismos precios, y todos los pedidos caen en el mismo panel.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          {/* Segmented control tabs */}
          <div className="mt-12 flex justify-center">
            <div className="relative inline-flex rounded-2xl bg-sand-100 p-1">
              {screenshots.map((screenshot) => {
                const Icon = screenshot.icon;
                const isActive = active === screenshot.id;
                return (
                  <button
                    key={screenshot.id}
                    onClick={() => setActive(screenshot.id)}
                    className={`relative z-10 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-sand-600 hover:text-sand-800"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-xl bg-sand-900 shadow-md"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <Icon className="relative z-10 h-4 w-4" />
                    <span className="relative z-10 hidden sm:inline">{screenshot.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        <div className="mt-12 flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full"
            >
              <p className="mb-6 text-center text-sm text-sand-500">
                {activeScreenshot?.description}
              </p>
              <div className="flex justify-center">
                <div className="w-full max-w-2xl">
                  {activeScreenshot?.mockup}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
