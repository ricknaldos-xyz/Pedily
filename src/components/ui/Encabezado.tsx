import { clsx } from "clsx";

interface Props {
  etiqueta?: string;
  titulo: React.ReactNode;
  bajada?: React.ReactNode;
  centrado?: boolean;
  oscuro?: boolean;
  id?: string;
  /** h1 en las cabeceras de página; h2 en las secciones. */
  nivel?: 1 | 2;
  className?: string;
}

/**
 * Encabezado de sección del sistema «la comanda»: rótulo en mono con número
 * de comanda, titular en Bricolage con interletrado cerrado y bajada en Figtree.
 */
export function Encabezado({
  etiqueta,
  titulo,
  bajada,
  centrado = false,
  oscuro = false,
  id,
  nivel = 2,
  className,
}: Props) {
  const H = nivel === 1 ? "h1" : "h2";
  return (
    <div className={clsx(centrado && "mx-auto text-center", "max-w-3xl", className)}>
      {etiqueta && (
        <p
          className={clsx(
            "mb-3 inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs",
            oscuro ? "text-aji-400" : "text-chicha-600"
          )}
        >
          <span aria-hidden className={clsx("h-px w-6", oscuro ? "bg-aji-400" : "bg-chicha-600")} />
          {etiqueta}
        </p>
      )}
      <H
        id={id}
        className={clsx(
          "font-display font-extrabold tracking-[-0.025em] text-balance",
          nivel === 1
            ? "text-[2.35rem] leading-[1.02] sm:text-6xl lg:text-[4.4rem]"
            : "text-[1.9rem] leading-[1.05] sm:text-5xl",
          oscuro ? "text-white" : "text-tinta"
        )}
      >
        {titulo}
      </H>
      {bajada && (
        <p
          className={clsx(
            "mt-4 text-[1.05rem] leading-relaxed text-pretty sm:text-lg",
            oscuro ? "text-chicha-100" : "text-humo",
            centrado && "mx-auto max-w-2xl"
          )}
        >
          {bajada}
        </p>
      )}
    </div>
  );
}
