"use client";

import { Container } from "@/components/layout/Container";
import { Bloque } from "@/components/layout/Bloque";
import { Encabezado } from "@/components/ui/Encabezado";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { MessageCircle, Bot, ChefHat, Receipt, Bike } from "lucide-react";

interface Paso {
  icon: typeof MessageCircle;
  titulo: string;
  texto: string;
  mini: React.ReactNode;
}

const pasos: Paso[] = [
  {
    icon: MessageCircle,
    titulo: "Tu cliente escribe como habla",
    texto: "Por WhatsApp, en tu web o en el kiosko. Todo entra al mismo panel.",
    mini: (
      <span className="rounded-lg rounded-tr-sm bg-[#d9fdd3] px-2.5 py-1.5 text-xs text-sand-800">
        «medio pollo y una jarra de chicha pa’ Jesús María»
      </span>
    ),
  },
  {
    icon: Bot,
    titulo: "El asistente arma el pedido y cobra",
    texto:
      "Solo ofrece lo que está en tu carta, con tus precios, y cobra en tu cuenta Culqi.",
    mini: (
      <span className="rounded-lg bg-white px-2.5 py-1.5 text-xs text-sand-800 ring-1 ring-sand-200">
        Total S/ 56 · <strong className="text-primary-700">Pagado con Yape</strong>
      </span>
    ),
  },
  {
    icon: ChefHat,
    titulo: "Llega a cocina con aviso",
    texto: "Suena en tu panel y en la vista de cocina, con su estado.",
    mini: (
      <span className="rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-semibold text-yellow-800">
        #1042 · En cocina
      </span>
    ),
  },
  {
    icon: Receipt,
    titulo: "La boleta sale sola",
    texto: "Boleta o factura electrónica con tu RUC, a través de tu Nubefact.",
    mini: (
      <span className="rounded-md bg-sand-100 px-2.5 py-1 font-mono text-xs text-sand-700">
        B001-000123 · SUNAT ✓
      </span>
    ),
  },
  {
    icon: Bike,
    titulo: "Sale a reparto o a recojo",
    texto:
      "Con tus zonas y tarifas. ¿Sin motorizado? Pides uno con PedidosYa Envíos.",
    mini: (
      <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800">
        En camino · 45 min
      </span>
    ),
  },
];

export function RecorridoPedido() {
  return (
    <Bloque id="como-funciona" className="bg-sand-50">
      <Container className="max-w-5xl">
        <Encabezado
          etiqueta="Cómo funciona"
          titulo="Así viaja un pedido, sin que nadie lo anote a mano"
          bajada="Del «hola» del cliente a la boleta, en un solo sistema."
        />

        <ol className="relative mx-auto mt-6 max-w-2xl space-y-2.5">
          {pasos.map((p, i) => (
            <AnimatedSection key={p.titulo} delay={i * 0.06}>
              <li className="flex gap-3 rounded-2xl bg-white p-3.5 shadow-card">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                  <p.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sand-900">
                    <span className="mr-1 text-primary-600">{i + 1}.</span>
                    {p.titulo}
                  </h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-sand-600">{p.texto}</p>
                  <div className="mt-1.5 hidden sm:block">{p.mini}</div>
                </div>
              </li>
            </AnimatedSection>
          ))}
        </ol>

        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-sand-600">
          ¿El cliente pide hablar con alguien? El asistente te avisa y tu equipo
          sigue el chat. Asistente desde el plan de S/ 499.
        </p>
      </Container>
    </Bloque>
  );
}
