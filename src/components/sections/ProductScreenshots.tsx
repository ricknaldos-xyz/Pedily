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

const screenshots = [
  {
    id: "web",
    name: "Tienda Web",
    icon: ShoppingBag,
    description: "Tu menu digital con carrito, checkout y pagos integrados",
    mockup: (
      <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="ml-4 flex-1 rounded-lg bg-white px-3 py-1 text-xs text-slate-400">
            wantanclan.pedily.com
          </div>
        </div>
        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-slate-800">Wantan Clan</div>
            <div className="rounded-full bg-accent-100 px-2 py-0.5 text-xs font-medium text-accent-700">
              Abierto
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {["Wantan Frito", "Arroz Chaufa", "Tallarín", "Aeropuerto"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-3"
                >
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-orange-100 to-orange-200" />
                  <p className="mt-2 text-sm font-medium text-slate-700">
                    {item}
                  </p>
                  <p className="text-xs text-slate-400">S/ 18.00</p>
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
    description: "IA que toma pedidos 24/7, tu intervienes cuando quieras",
    mockup: (
      <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl border-4 border-slate-800 bg-slate-800 shadow-2xl">
        {/* Phone notch */}
        <div className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-slate-800" />
        {/* WhatsApp header */}
        <div className="bg-green-600 px-4 pb-3 pt-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20" />
            <div>
              <p className="font-semibold text-white">Wantan Clan</p>
              <p className="text-xs text-green-100">en linea</p>
            </div>
          </div>
        </div>
        {/* Chat */}
        <div className="h-80 space-y-3 bg-[#e5ddd5] p-4">
          <div className="ml-auto max-w-[75%] rounded-lg bg-[#dcf8c6] px-3 py-2 text-sm">
            Hola, quiero hacer un pedido
          </div>
          <div className="max-w-[75%] rounded-lg bg-white px-3 py-2 text-sm">
            Hola! Claro, con gusto te ayudo. Te muestro nuestro menu?
          </div>
          <div className="ml-auto max-w-[75%] rounded-lg bg-[#dcf8c6] px-3 py-2 text-sm">
            Si porfa, quiero wantan frito
          </div>
          <div className="max-w-[75%] rounded-lg bg-white px-3 py-2 text-sm">
            Perfecto! Wantan Frito x1 (S/ 18). Deseas agregar algo mas?
          </div>
          <div className="ml-auto max-w-[75%] rounded-lg bg-[#dcf8c6] px-3 py-2 text-sm">
            Una chicha morada
          </div>
          <div className="max-w-[75%] rounded-lg bg-white px-3 py-2 text-sm">
            Listo! Tu pedido: Wantan Frito + Chicha = S/ 26. Pago con Yape?
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "kiosko",
    name: "Kiosko",
    icon: Monitor,
    description: "Autoservicio en tu local con pago integrado IZIPAY",
    mockup: (
      <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border-8 border-slate-800 bg-white shadow-2xl">
        {/* Kiosk header */}
        <div className="bg-slate-900 px-6 py-4 text-center">
          <p className="text-xl font-bold text-white">Wantan Clan</p>
          <p className="text-sm text-slate-400">Toca para ordenar</p>
        </div>
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto border-b border-slate-100 px-4 py-3">
          {["Entradas", "Platos", "Bebidas", "Postres"].map((cat, i) => (
            <button
              key={cat}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                i === 0
                  ? "bg-primary-600 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 p-4">
          {["Wantan Frito", "Siu Mai", "Enrollado", "Kam Lu"].map((item) => (
            <button
              key={item}
              className="rounded-xl border-2 border-slate-100 p-4 text-center transition-all hover:border-primary-300 hover:bg-primary-50"
            >
              <div className="mx-auto h-16 w-16 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200" />
              <p className="mt-2 font-semibold text-slate-700">{item}</p>
              <p className="text-sm text-primary-600">S/ 18.00</p>
            </button>
          ))}
        </div>
        {/* Footer */}
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Tu orden</p>
              <p className="text-lg font-bold text-slate-800">S/ 36.00</p>
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
    name: "Hub Admin",
    icon: LayoutDashboard,
    description: "Gestiona pedidos de todos tus canales en un solo lugar",
    mockup: (
      <div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-600" />
            <span className="font-bold text-slate-700">Hub Pedily</span>
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
          <div className="w-16 border-r border-slate-100 bg-slate-50 py-4">
            {["inbox", "done", "stats", "menu"].map((_, i) => (
              <div
                key={i}
                className={`mx-auto mb-3 h-10 w-10 rounded-lg ${
                  i === 0 ? "bg-primary-100" : "bg-slate-200"
                }`}
              />
            ))}
          </div>
          {/* Orders */}
          <div className="flex-1 p-4">
            <p className="text-sm font-semibold text-slate-500">
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
                  className="flex items-center justify-between rounded-lg border border-slate-100 p-3"
                >
                  <div>
                    <p className="font-semibold text-slate-700">{order.id}</p>
                    <p className="text-xs text-slate-400">
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
    <Section className="overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <Container>
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Mira como funciona
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            3 canales de venta, un solo lugar para gestionar todo.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {screenshots.map((screenshot) => {
              const Icon = screenshot.icon;
              const isActive = active === screenshot.id;
              return (
                <button
                  key={screenshot.id}
                  onClick={() => setActive(screenshot.id)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary-600 text-white shadow-lg shadow-primary-500/25"
                      : "bg-white text-slate-600 shadow-sm hover:bg-slate-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {screenshot.name}
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="mt-10 flex flex-col items-center">
            <p className="mb-6 text-center text-sm text-slate-500">
              {activeScreenshot?.description}
            </p>
            <div className="w-full max-w-2xl">{activeScreenshot?.mockup}</div>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
