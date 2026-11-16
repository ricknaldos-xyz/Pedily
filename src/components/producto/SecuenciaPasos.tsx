"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { Pause, Play } from "lucide-react";
import { MarcoCelular } from "@/components/marca/Marcos";

export interface PasoSecuencia {
  /** Rótulo corto del botón (una o dos palabras). */
  corto: string;
  titulo: string;
  texto: string;
  /** De dónde sale la pantalla (recreación o producto real). */
  nota: string;
  pantalla: React.ReactNode;
  /** Se monta solo cuando el paso está activo (p. ej. sellos que «caen»). */
  extra?: React.ReactNode;
}

/**
 * Un celular que cambia de estado, paso a paso. Todas las pantallas están en
 * el HTML (las inactivas, ocultas e `inert`). Avanza solo mientras se ve en
 * pantalla; con `prefers-reduced-motion` no avanza solo. Siempre hay botón de
 * pausa (WCAG 2.2.2) y cada paso se puede elegir a mano.
 */
export function SecuenciaPasos({
  pasos,
  oscuro = false,
  intervalo = 3600,
  etiqueta,
}: {
  pasos: PasoSecuencia[];
  oscuro?: boolean;
  intervalo?: number;
  etiqueta: string;
}) {
  const [activo, setActivo] = useState(0);
  const [andando, setAndando] = useState(false);
  const [visible, setVisible] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let reducido = false;
    try {
      reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {}
    if (!reducido) setAndando(true);
    const el = raiz.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!andando || !visible) return;
    const t = window.setTimeout(() => setActivo((a) => (a + 1) % pasos.length), activo === pasos.length - 1 ? intervalo * 1.6 : intervalo);
    return () => window.clearTimeout(t);
  }, [andando, visible, activo, intervalo, pasos.length]);

  const actual = pasos[activo];

  return (
    <div ref={raiz} role="group" aria-label={etiqueta} className="mx-auto w-full max-w-[19rem]">
      <MarcoCelular oscuro={!oscuro}>
        <div className="relative aspect-[390/844] w-full overflow-hidden bg-white">
          {pasos.map((p, i) => (
            <div
              key={p.corto}
              aria-hidden={i !== activo}
              inert={i !== activo}
              className={clsx(
                "absolute inset-0 overflow-hidden transition-opacity duration-500 motion-reduce:transition-none",
                i === activo ? "opacity-100" : "opacity-0"
              )}
            >
              {p.pantalla}
              {i === activo && p.extra}
            </div>
          ))}
        </div>
      </MarcoCelular>

      <div className="mt-5 flex items-start gap-2">
        <ol className="grid min-w-0 flex-1 grid-cols-5 gap-1">
          {pasos.map((p, i) => (
            <li key={p.corto} className="min-w-0">
              <button
                type="button"
                onClick={() => {
                  setActivo(i);
                  setAndando(false);
                }}
                aria-current={i === activo ? "step" : undefined}
                className={clsx(
                  "flex w-full flex-col items-center gap-1 rounded-lg px-0.5 py-1.5 text-center transition-colors",
                  oscuro ? "hover:bg-white/10" : "hover:bg-tinta/5"
                )}
              >
                <span
                  className={clsx(
                    "flex h-7 w-7 items-center justify-center rounded-full border-2 font-mono text-xs font-bold",
                    i === activo
                      ? "border-aji-500 bg-aji-500 text-tinta"
                      : oscuro
                        ? "border-white/40 text-white"
                        : "border-tinta/30 text-tinta"
                  )}
                >
                  {i + 1}
                </span>
                <span
                  className={clsx(
                    "w-full truncate text-[11px] font-semibold leading-tight",
                    oscuro ? (i === activo ? "text-white" : "text-chicha-100") : i === activo ? "text-tinta" : "text-humo"
                  )}
                >
                  {p.corto}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={() => setAndando((a) => !a)}
          aria-label={andando ? "Pausar la secuencia" : "Reproducir la secuencia"}
          className={clsx(
            "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
            oscuro ? "border-white/40 text-white hover:border-white" : "border-tinta/30 text-tinta hover:border-tinta"
          )}
        >
          {andando ? <Pause aria-hidden className="h-3.5 w-3.5" /> : <Play aria-hidden className="h-3.5 w-3.5" />}
        </button>
      </div>

      <div className="mt-3 min-h-[6.5rem] text-center">
        <p className={clsx("font-display text-lg font-bold leading-tight", oscuro ? "text-white" : "text-tinta")}>
          {activo + 1}. {actual.titulo}
        </p>
        <p className={clsx("mt-1 text-[0.93rem] leading-snug", oscuro ? "text-chicha-100" : "text-sand-700")}>{actual.texto}</p>
        <p className={clsx("mt-2 font-mono text-[10px] uppercase tracking-wider", oscuro ? "text-chicha-100" : "text-humo")}>
          {actual.nota}
        </p>
      </div>
    </div>
  );
}
