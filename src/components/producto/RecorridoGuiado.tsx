"use client";

import { useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { MarcoNavegador } from "@/components/marca/Marcos";
import { CAPTURAS, type ClaveCaptura } from "@/lib/capturas";

/**
 * Recorrido guiado del panel que se puede tocar (auditoría L-01 §4 P1-5a),
 * hecho con las capturas reales del panel de la demo (LV2-C, 1600×1000) y sin
 * cuentas. Cada paso marca con un punto la zona que se tocaría en el panel
 * real; tocarla (o «Siguiente») avanza. Las posiciones están medidas sobre
 * las capturas, en % del ancho y del alto; si se regeneran las capturas hay
 * que volver a medirlas. El pedido #RD001412 es el mismo en los pasos 1 y 2.
 */
interface Paso {
  clave: ClaveCaptura;
  url: string;
  titulo: string;
  texto: string;
  /** Zona que se toca, en % de la captura. */
  x: number;
  y: number;
  accion: string;
}

const PASOS: Paso[] = [
  {
    clave: "panel-pedidos",
    url: "panel/pedidos",
    titulo: "Suena la alarma",
    texto: "Entra el pedido #RD001412 de S/ 119, ya pagado. La alarma suena hasta que alguien lo atiende.",
    x: 94.2,
    y: 23.3,
    accion: "Atender",
  },
  {
    clave: "panel-cocina",
    url: "panel/cocina",
    titulo: "Cocina lo ve al momento",
    texto: "El mismo pedido llega a la pantalla de cocina con el combo, el tamaño y las cremas, y cuánto lleva esperando.",
    x: 36.3,
    y: 49.6,
    accion: "Empezar",
  },
  {
    clave: "panel-mesas",
    url: "panel/mesas",
    titulo: "Las mesas piden por QR",
    texto: "Cada mesa abierta con su total, lo pagado y lo que falta. Salón 4 llama al mozo y pide la cuenta.",
    x: 84.4,
    y: 36.3,
    accion: "Pide la cuenta",
  },
  {
    clave: "panel-reportes-menu",
    url: "panel/reportes",
    titulo: "Qué plato te deja más",
    texto: "Cada plato por popularidad y margen, con una pista de qué hacer: mantener, revisar receta o precio.",
    x: 35,
    y: 81.9,
    accion: "Pollo entero · Estrella",
  },
  {
    clave: "panel-finanzas",
    url: "panel/finanzas",
    titulo: "Y el mes, cuadrado",
    texto: "Ingresos, costo de alimentos, margen y resultado del mes, listos para tu contador.",
    x: 83.8,
    y: 44,
    accion: "Resultado del mes",
  },
];

export function RecorridoGuiado() {
  const [i, setI] = useState(0);
  const p = PASOS[i];
  const ultimo = i === PASOS.length - 1;
  const c = CAPTURAS[p.clave];
  const siguiente = () => setI((n) => (n + 1) % PASOS.length);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-center">
      <MarcoNavegador url={`mirestaurante · ${p.url}`} oscuro>
        <div className="relative">
          <Image
            key={c.src}
            src={c.src}
            alt={c.alt}
            width={1600}
            height={1000}
            sizes="(max-width: 1024px) 92vw, 860px"
            className="block h-auto w-full"
          />
          <button
            type="button"
            onClick={siguiente}
            aria-label={`Tocar «${p.accion}» y seguir`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            className="group absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          >
            <span aria-hidden className="absolute inset-0 rounded-full bg-aji-400/60 motion-safe:animate-ping" />
            <span aria-hidden className="relative h-5 w-5 rounded-full border-[3px] border-white bg-aji-500 shadow-lg" />
          </button>
        </div>
      </MarcoNavegador>

      <div aria-live="polite">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-aji-400">
          Paso {i + 1} de {PASOS.length}
        </p>
        <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight text-white">{p.titulo}</h3>
        <p className="mt-2 text-[0.98rem] leading-relaxed text-chicha-100">{p.texto}</p>
        <p className="mt-3 text-sm text-white">
          Toca el punto amarillo: <strong className="text-aji-400">«{p.accion}»</strong>
        </p>
        <ol aria-hidden className="mt-5 flex gap-1.5">
          {PASOS.map((x, n) => (
            <li key={x.clave} className={clsx("h-1.5 flex-1 rounded-full", n <= i ? "bg-aji-500" : "bg-white/20")} />
          ))}
        </ol>
        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={() => setI((n) => Math.max(0, n - 1))}
            disabled={i === 0}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border-2 border-white/25 px-4 text-sm font-semibold text-white disabled:opacity-40"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" /> Anterior
          </button>
          <button
            type="button"
            onClick={siguiente}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border-2 border-tinta bg-aji-500 px-4 text-sm font-semibold text-tinta"
          >
            {ultimo ? (
              <>
                <RotateCcw aria-hidden className="h-4 w-4" /> Volver a empezar
              </>
            ) : (
              <>
                Siguiente <ArrowRight aria-hidden className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
