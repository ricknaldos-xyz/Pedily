"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { Pause, Play } from "lucide-react";
import { CLIPS, type ClaveClip } from "@/lib/capturas";

/**
 * Clip corto del producto real, mudo (LV2-C). Liviano a propósito:
 * `preload="none"` y póster en WebP; solo se descarga y reproduce cuando entra
 * en pantalla, y se pausa al salir. Con `prefers-reduced-motion` no arranca
 * solo: queda el póster y el botón para reproducirlo. Siempre hay botón de
 * pausa (WCAG 2.2.2).
 */
export function Clip({
  clave,
  className,
  inmediato = false,
}: {
  clave: ClaveClip;
  className?: string;
  /** Arriba del todo (hero): el póster va en el HTML desde el principio. */
  inmediato?: boolean;
}) {
  const c = CLIPS[clave];
  const ref = useRef<HTMLVideoElement>(null);
  const [andando, setAndando] = useState(false);
  // El póster tampoco se pide hasta que el clip está cerca de la pantalla
  // (un <video> oculto o lejos no debe competir con lo primero que se ve).
  const [cerca, setCerca] = useState(inmediato);
  const manual = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (typeof IntersectionObserver === "undefined") {
      setCerca(true);
      return;
    }
    const acercar = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setCerca(true);
          acercar.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    acercar.observe(v);
    let reducido = false;
    try {
      reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {}
    if (reducido) return () => acercar.disconnect();
    const io = new IntersectionObserver(
      ([e]) => {
        if (manual.current) return;
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 }
    );
    io.observe(v);
    return () => {
      acercar.disconnect();
      io.disconnect();
    };
  }, []);

  const alternar = () => {
    const v = ref.current;
    if (!v) return;
    manual.current = true;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <div className={clsx("relative", className)}>
      <video
        ref={ref}
        muted
        playsInline
        loop
        preload="none"
        poster={cerca ? `/clips/${clave}.webp` : undefined}
        width={c.ancho}
        height={c.alto}
        aria-label={c.titulo}
        onPlay={() => setAndando(true)}
        onPause={() => setAndando(false)}
        className="block h-auto w-full bg-[#0b0a0d]"
        style={{ aspectRatio: `${c.ancho} / ${c.alto}` }}
      >
        <source src={`/clips/${clave}.webm`} type="video/webm" />
        <source src={`/clips/${clave}.mp4`} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={alternar}
        aria-label={andando ? "Pausar el video" : "Reproducir el video"}
        className="absolute bottom-2.5 right-2.5 flex h-11 w-11 items-center justify-center rounded-full border-2 border-tinta bg-aji-500 text-tinta shadow-md transition-transform hover:scale-105"
      >
        {andando ? <Pause aria-hidden className="h-4 w-4" /> : <Play aria-hidden className="h-4 w-4 translate-x-px" />}
      </button>
    </div>
  );
}
