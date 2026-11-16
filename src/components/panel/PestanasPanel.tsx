"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { MarcoNavegador } from "@/components/marca/Marcos";

export interface PestanaPanel {
  id: string;
  nombre: string;
  url: string;
  texto: string;
  dato: { valor: string; nombre: string };
  enlace?: { href: string; texto: string };
  /** Captura real o mini-interfaz (se arma en el servidor). */
  contenido: React.ReactNode;
}

/**
 * Navegador con el panel y pestañas clicables (patrón de pestañas WAI-ARIA:
 * flechas para moverse, Inicio/Fin). Todas las pantallas están en el HTML;
 * las que no se ven llevan `hidden`, así el contenido llega a buscadores y
 * a quien no tiene JS (ve la primera).
 */
export function PestanasPanel({ pestanas, oscuro = false }: { pestanas: PestanaPanel[]; oscuro?: boolean }) {
  const [activa, setActiva] = useState(0);
  const base = useId();
  const botones = useRef<(HTMLButtonElement | null)[]>([]);

  const mover = (i: number) => {
    const n = (i + pestanas.length) % pestanas.length;
    setActiva(n);
    botones.current[n]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Pantallas del panel"
        className="sin-barra -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-3 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {pestanas.map((p, i) => (
          <button
            key={p.id}
            ref={(el) => {
              botones.current[i] = el;
            }}
            role="tab"
            id={`${base}-t-${p.id}`}
            aria-selected={activa === i}
            aria-controls={`${base}-p-${p.id}`}
            tabIndex={activa === i ? 0 : -1}
            onClick={() => setActiva(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") mover(i + 1);
              else if (e.key === "ArrowLeft") mover(i - 1);
              else if (e.key === "Home") mover(0);
              else if (e.key === "End") mover(pestanas.length - 1);
              else return;
              e.preventDefault();
            }}
            className={clsx(
              "min-h-11 shrink-0 snap-start rounded-full border-2 px-4 text-[0.92rem] font-semibold transition-colors",
              activa === i
                ? "border-tinta bg-aji-500 text-tinta"
                : oscuro
                  ? "border-white/20 text-white hover:border-white/50"
                  : "border-tinta/10 bg-white text-sand-700 hover:border-tinta/30"
            )}
          >
            {p.nombre}
          </button>
        ))}
      </div>

      {pestanas.map((p, i) => (
        <div
          key={p.id}
          role="tabpanel"
          id={`${base}-p-${p.id}`}
          aria-labelledby={`${base}-t-${p.id}`}
          hidden={activa !== i}
          className="mt-3"
        >
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_17rem]">
            <div className="relative">
              <MarcoNavegador url={p.url} oscuro>
                {p.contenido}
              </MarcoNavegador>
              <div className="absolute -bottom-5 left-4 rotate-[-3deg] sm:-left-4">
                <div className="ticket px-4 py-2.5 [filter:drop-shadow(0_10px_14px_rgba(36,16,46,0.25))]">
                  <p className="font-mono text-xl font-bold text-tinta">{p.dato.valor}</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-humo">{p.dato.nombre}</p>
                </div>
              </div>
            </div>
            <div className={clsx("pt-6 lg:pt-2", oscuro ? "text-chicha-100" : "text-sand-700")}>
              <p className={clsx("font-display text-xl font-bold", oscuro ? "text-white" : "text-tinta")}>{p.nombre}</p>
              <p className="mt-2 text-[0.98rem] leading-relaxed">{p.texto}</p>
              {p.enlace && (
                <Link
                  href={p.enlace.href}
                  className={clsx("mt-3 inline-block font-semibold underline underline-offset-2", oscuro ? "text-aji-400" : "text-chicha-700")}
                >
                  {p.enlace.texto} →
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
      <p className={clsx("mt-8 font-mono text-[10px] uppercase tracking-wider", oscuro ? "text-chicha-100" : "text-humo")}>
        Panel de la demo · datos de demostración
      </p>
    </div>
  );
}
