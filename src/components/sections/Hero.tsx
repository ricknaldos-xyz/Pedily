"use client";

import { Container } from "@/components/layout/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { ArrowRight, Globe, MessageCircle, Monitor, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/site";

const WhatsAppGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
  </svg>
);

const channels = [
  {
    icon: Globe,
    label: "Tienda Web",
    bg: "bg-blue-50",
    text: "text-blue-700",
    ring: "ring-blue-200",
  },
  {
    icon: MessageCircle,
    label: "Bot WhatsApp + IA",
    bg: "bg-primary-100",
    text: "text-primary-800",
    ring: "ring-primary-200",
  },
  {
    icon: Monitor,
    label: "Kiosko Autoservicio",
    bg: "bg-cream-200",
    text: "text-cream-800",
    ring: "ring-cream-400",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream-50">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,168,137,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(59,168,137,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Top radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,168,137,0.10),transparent)]" />

      <Container className="relative py-20 sm:py-28 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
              </span>
              Creado y probado con Wantan Clan 🥡
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-sand-900 sm:text-5xl lg:text-[3.5rem]">
              Vende más.{" "}
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-400 bg-clip-text text-transparent">
                Opera todo
              </span>{" "}
              desde un lugar.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-sand-600">
              El sistema operativo de tu restaurante: vende por{" "}
              <strong className="text-sand-800">web, WhatsApp con IA y kiosko</strong>, y maneja
              pedidos, cocina, inventario, finanzas y facturación SUNAT desde un
              solo Hub. <strong className="text-sand-800">Sin comisiones por pedido.</strong>
            </p>

            {/* 3 Channels badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {channels.map((ch) => {
                const Icon = ch.icon;
                return (
                  <span
                    key={ch.label}
                    className={`inline-flex items-center gap-1.5 rounded-full ${ch.bg} px-3 py-1.5 text-xs font-medium ${ch.text} ring-1 ${ch.ring}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {ch.label}
                  </span>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contacto"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-warm transition-all hover:bg-primary-700 hover:shadow-md active:scale-[0.98]"
              >
                Agenda una demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-primary-200 bg-white px-7 py-3.5 text-sm font-semibold text-primary-700 shadow-sm transition-all hover:border-primary-300 hover:bg-primary-50 hover:shadow-md active:scale-[0.98]"
              >
                <span className="text-[#25D366]">
                  <WhatsAppGlyph />
                </span>
                Hablar por WhatsApp
              </a>
            </div>

            <TrustBadges className="mt-5" />

            <div className="mt-8 flex items-center gap-3 rounded-xl border border-sand-200 bg-white/60 p-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 text-base font-bold text-white shadow-sm">
                🥡
              </div>
              <p className="text-sm leading-snug text-sand-600">
                <strong className="text-sand-800">Wantan Clan</strong> opera sus 3 locales en
                Lima con Pedily: web, WhatsApp, kiosko y delivery, todos en un
                solo Hub.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="relative">
              {/* Floating notification card */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
                className="absolute -right-2 -top-4 z-10 hidden rounded-xl border border-primary-200 bg-white p-3 shadow-lg shadow-primary-500/10 sm:block"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100">
                    <MessageCircle className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-sand-700">Nuevo pedido por WhatsApp</p>
                    <p className="text-[10px] text-sand-400">Ana pidió Chaufa Familiar x2</p>
                  </div>
                  <Bell className="h-3.5 w-3.5 text-primary-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-sand-200/80 bg-white shadow-elevated lg:max-w-none"
              >
                <div className="flex items-center gap-2 border-b border-sand-100 bg-sand-50/80 px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-sand-400">hub.pedily.com</span>
                </div>
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-sand-800">Hub de Pedidos</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="animate-pulse-soft rounded-full bg-accent-100 px-2.5 py-1 text-xs font-medium text-accent-700">
                        15 nuevos
                      </span>
                    </div>
                  </div>
                  {/* Channel filters */}
                  <div className="mb-4 flex gap-1.5">
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                      Web
                    </span>
                    <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-medium text-primary-700">
                      WhatsApp
                    </span>
                    <span className="rounded-full bg-cream-300 px-2 py-0.5 text-[10px] font-medium text-cream-800">
                      Kiosko
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        id: "#1042",
                        name: "María García",
                        total: "S/ 85.00",
                        status: "En cocina",
                        source: "Web",
                        color: "bg-yellow-100 text-yellow-700",
                        sourceColor: "bg-blue-50 text-blue-600",
                      },
                      {
                        id: "#1041",
                        name: "Carlos López",
                        total: "S/ 42.50",
                        status: "En camino",
                        source: "WhatsApp",
                        color: "bg-blue-100 text-blue-700",
                        sourceColor: "bg-primary-50 text-primary-600",
                      },
                      {
                        id: "#1040",
                        name: "Kiosko · Ticket 5",
                        total: "S/ 120.00",
                        status: "Listo",
                        source: "Kiosko",
                        color: "bg-green-100 text-green-700",
                        sourceColor: "bg-cream-200 text-cream-800",
                      },
                    ].map((order, idx) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.15 }}
                        className="flex items-center justify-between rounded-xl border border-sand-100 bg-sand-50/50 p-3 transition-all hover:border-sand-200 hover:bg-white hover:shadow-sm"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-sand-400">{order.id}</span>
                            <span
                              className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${order.sourceColor}`}
                            >
                              {order.source}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-sand-700">{order.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-sand-800">{order.total}</p>
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${order.color}`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
