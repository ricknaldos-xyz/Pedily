import { clsx } from "clsx";

/**
 * Marca de Pedily: una comanda con el borde dentado y la «P» en Bricolage.
 * SVG propio, sin dependencias.
 */
export function LogoMarca({ className, claro = false }: { className?: string; claro?: boolean }) {
  return (
    <svg viewBox="0 0 32 36" aria-hidden className={clsx("h-8 w-auto", className)}>
      <path
        d="M2 3.5 5 1l3 2.5L11 1l3 2.5L17 1l3 2.5L23 1l3 2.5L29 1l1 1v32l-1 1-3-2.5L23 35l-3-2.5L17 35l-3-2.5L11 35l-3-2.5L5 35l-3-2.5L2 34Z"
        fill={claro ? "#FBF7F0" : "#24102E"}
      />
      <path d="M10 9h7.2c3.9 0 6.3 2.2 6.3 5.6 0 3.5-2.4 5.7-6.3 5.7h-2.6V27H10Zm4.6 7.6h2.2c1.5 0 2.2-.7 2.2-2s-.7-1.9-2.2-1.9h-2.2Z" fill="#FFC21A" />
    </svg>
  );
}

export function Logo({ claro = false, className }: { claro?: boolean; className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-2", className)}>
      <LogoMarca claro={claro} />
      <span
        className={clsx(
          "font-display text-[1.45rem] font-extrabold tracking-[-0.03em]",
          claro ? "text-white" : "text-tinta"
        )}
      >
        Pedily
      </span>
    </span>
  );
}
