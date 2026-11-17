import { clsx } from "clsx";

export type TonoSello = "pagado" | "cocina" | "boleta" | "listo" | "agotado" | "camino" | "programado";

const TONOS: Record<TonoSello, string> = {
  pagado: "text-hierba-600 border-hierba-600",
  listo: "text-hierba-600 border-hierba-600",
  cocina: "text-chicha-600 border-chicha-600",
  boleta: "text-tinta border-tinta",
  agotado: "text-rocoto-500 border-rocoto-500",
  camino: "text-chicha-600 border-chicha-600",
  programado: "text-chicha-600 border-chicha-600",
};

/**
 * Sello de goma ligeramente girado («PAGADO», «EN COCINA»…). Sustituye al
 * círculo trazado a mano de otros: es lo que se ve en una comanda real.
 * Si `animado`, «cae» al cargar; sin movimiento se ve quieto.
 */
export function Sello({
  children,
  tono = "pagado",
  giro = -8,
  animado = false,
  retraso = 0,
  className,
}: {
  children: React.ReactNode;
  tono?: TonoSello;
  giro?: number;
  animado?: boolean;
  retraso?: number;
  className?: string;
}) {
  return (
    <span
      style={
        {
          "--giro": `${giro}deg`,
          transform: `rotate(${giro}deg)`,
          animationDelay: animado ? `${retraso}ms` : undefined,
        } as React.CSSProperties
      }
      className={clsx(
        "inline-block rounded-md border-[2.5px] bg-[#fffdf8] px-2 py-0.5 font-mono text-[11px] font-bold uppercase leading-tight tracking-[0.12em] shadow-[0_6px_14px_-6px_rgba(36,16,46,0.35)] sm:text-xs",
        TONOS[tono],
        animado && "animate-sello",
        className
      )}
    >
      {children}
    </span>
  );
}
