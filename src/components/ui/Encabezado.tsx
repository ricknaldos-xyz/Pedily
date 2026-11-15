import { clsx } from "clsx";
import { AnimatedSection } from "./AnimatedSection";

interface Props {
  etiqueta?: string;
  titulo: React.ReactNode;
  bajada?: React.ReactNode;
  centrado?: boolean;
  oscuro?: boolean;
}

/** Encabezado de sección compacto (móvil primero). */
export function Encabezado({ etiqueta, titulo, bajada, centrado = true, oscuro = false }: Props) {
  return (
    <AnimatedSection className={clsx(centrado && "text-center")}>
      {etiqueta && (
        <p
          className={clsx(
            "mb-2 text-xs font-bold uppercase tracking-wider",
            oscuro ? "text-primary-300" : "text-primary-600"
          )}
        >
          {etiqueta}
        </p>
      )}
      <h2
        className={clsx(
          "text-[1.7rem] font-extrabold leading-tight tracking-tight sm:text-4xl",
          oscuro ? "text-white" : "text-sand-900"
        )}
      >
        {titulo}
      </h2>
      {bajada && (
        <p
          className={clsx(
            "mt-3 text-base leading-relaxed sm:text-lg",
            oscuro ? "text-primary-100/85" : "text-sand-600",
            centrado && "mx-auto max-w-2xl"
          )}
        >
          {bajada}
        </p>
      )}
    </AnimatedSection>
  );
}
