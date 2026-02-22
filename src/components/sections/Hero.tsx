"use client";

import { Container } from "@/components/layout/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { ArrowRight, Play, Globe, MessageCircle, Monitor, Bell } from "lucide-react";
import { motion } from "framer-motion";

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
    bg: "bg-green-50",
    text: "text-green-700",
    ring: "ring-green-200",
  },
  {
    icon: Monitor,
    label: "Kiosko Autoservicio",
    bg: "bg-purple-50",
    text: "text-purple-700",
    ring: "ring-purple-200",
  },
];

const avatars = [
  { initials: "WC", gradient: "from-indigo-400 to-indigo-600" },
  { initials: "DT", gradient: "from-emerald-400 to-emerald-600" },
  { initials: "CE", gradient: "from-amber-400 to-amber-600" },
  { initials: "PF", gradient: "from-rose-400 to-rose-600" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.12),transparent)]" />
      {/* Dot grid pattern */}
      <div className="absolute inset-0 dot-grid" />

      {/* Decorative floating elements */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 h-24 w-24 rounded-2xl bg-gradient-to-br from-primary-300/30 to-primary-100/20 blur-xl"
      />
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-20 bottom-20 h-36 w-36 rounded-full bg-gradient-to-br from-accent-300/30 to-accent-100/20 blur-xl"
      />
      <motion.div
        animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-1/4 h-20 w-20 rounded-full bg-gradient-to-br from-purple-200/20 to-pink-200/20 blur-xl"
      />

      <Container className="relative py-20 sm:py-28 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary-200/60 bg-gradient-to-r from-primary-50 to-accent-50 px-4 py-1.5 text-sm font-medium text-primary-700 shadow-sm"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent-500" />
              La plataforma que usan los restaurantes top de Peru
            </motion.div>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Recibe pedidos por{" "}
              <span className="animate-gradient bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 bg-clip-text text-transparent">
                web, WhatsApp y kiosko
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
              Un solo sistema para tus 3 canales de venta. Bot con IA que
              atiende WhatsApp 24/7, kiosko de autoservicio y tienda web.
              Pagos, facturacion SUNAT y delivery integrados.{" "}
              <strong>Sin comisiones.</strong>
            </p>

            {/* 3 Channels badges with staggered animation */}
            <div className="mt-6 flex flex-wrap gap-2">
              {channels.map((ch, i) => {
                const Icon = ch.icon;
                return (
                  <motion.span
                    key={ch.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.3, ease: "easeOut" }}
                    className={`inline-flex items-center gap-1.5 rounded-full ${ch.bg} px-3 py-1.5 text-xs font-medium ${ch.text} ring-1 ${ch.ring}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {ch.label}
                  </motion.span>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#cta"
                className="btn-shimmer group inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-500/30 active:scale-[0.98]"
              >
                Prueba gratis 14 dias
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#funcionalidades"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-md active:scale-[0.98]"
              >
                <Play className="h-4 w-4 text-primary-500 transition-transform group-hover:scale-110" />
                Ver demo
              </a>
            </div>

            <TrustBadges className="mt-5" />

            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {avatars.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.08, type: "spring", stiffness: 300, damping: 20 }}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br ${a.gradient} text-xs font-bold text-white shadow-md`}
                  >
                    {a.initials}
                  </motion.div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.svg
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 400, damping: 15 }}
                      className="h-4 w-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>
                <p className="text-sm text-slate-500">
                  +50 negocios ya venden con Pedily
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="relative">
              {/* Floating notification card */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
                className="absolute -right-2 -top-4 z-10 hidden rounded-xl border border-green-200 bg-white p-3 shadow-lg sm:block"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-700">Nuevo pedido por WhatsApp</p>
                    <p className="text-[10px] text-slate-400">Ana pidio Pollo a la Brasa x2</p>
                  </div>
                  <Bell className="h-3.5 w-3.5 text-green-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="animate-float relative mx-auto max-w-md overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-300/40 lg:max-w-none"
              >
                <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-slate-400">
                    hub.pedily.com
                  </span>
                </div>
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800">
                      Hub de Pedidos
                    </h3>
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
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
                      WhatsApp
                    </span>
                    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-medium text-purple-700">
                      Kiosko
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        id: "#1042",
                        name: "Maria Garcia",
                        total: "S/ 85.00",
                        status: "En cocina",
                        source: "Web",
                        color: "bg-yellow-100 text-yellow-700",
                        sourceColor: "bg-blue-50 text-blue-600",
                      },
                      {
                        id: "#1041",
                        name: "Carlos Lopez",
                        total: "S/ 42.50",
                        status: "En camino",
                        source: "WhatsApp",
                        color: "bg-blue-100 text-blue-700",
                        sourceColor: "bg-green-50 text-green-600",
                      },
                      {
                        id: "#1040",
                        name: "Mesa 5",
                        total: "S/ 120.00",
                        status: "Listo",
                        source: "Kiosko",
                        color: "bg-green-100 text-green-700",
                        sourceColor: "bg-purple-50 text-purple-600",
                      },
                    ].map((order, idx) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.15 }}
                        className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3 transition-all hover:border-slate-200 hover:bg-white hover:shadow-sm"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-slate-400">
                              {order.id}
                            </span>
                            <span
                              className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${order.sourceColor}`}
                            >
                              {order.source}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-slate-700">
                            {order.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-800">
                            {order.total}
                          </p>
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

              <div className="absolute -right-4 -bottom-4 -z-10 h-full w-full rounded-2xl bg-gradient-to-br from-primary-200/60 to-accent-200/60 blur-sm" />
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
