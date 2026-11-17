import Link from "next/link";
import { clsx } from "clsx";
import { ArrowRight, ExternalLink } from "lucide-react";

type Variante = "aji" | "tinta" | "borde" | "borde-claro" | "texto";

const ESTILOS: Record<Variante, string> = {
  // CTA principal: ají con texto morado (10,9:1) y sombra dura de comanda.
  aji: "bg-aji-500 text-tinta shadow-[0_4px_0_0_#24102e] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#24102e] active:translate-y-0.5 active:shadow-[0_1px_0_0_#24102e] border-2 border-tinta",
  tinta: "bg-tinta text-white hover:bg-chicha-800 border-2 border-tinta",
  borde: "border-2 border-tinta/15 bg-white text-tinta hover:border-tinta/40",
  "borde-claro": "border-2 border-white/25 text-white hover:border-white/60 hover:bg-white/5",
  texto: "text-chicha-700 underline-offset-4 hover:underline px-1",
};

interface Props {
  href: string;
  children: React.ReactNode;
  variante?: Variante;
  tam?: "md" | "lg";
  className?: string;
  flecha?: boolean;
  /** Enlace a otro sitio (abre en pestaña nueva con icono). */
  externo?: boolean;
  ancho?: boolean;
}

/** Botón-enlace de la marca. Todo CTA de la landing es un enlace real. */
export function Boton({
  href,
  children,
  variante = "aji",
  tam = "md",
  className,
  flecha = false,
  externo = false,
  ancho = false,
}: Props) {
  const clases = clsx(
    "group inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-150",
    tam === "lg" ? "min-h-[3.25rem] px-6 text-base sm:px-7" : "min-h-11 px-5 text-[0.95rem]",
    variante === "texto" && "min-h-0 px-1",
    ancho && "w-full sm:w-auto",
    ESTILOS[variante],
    className
  );
  const contenido = (
    <>
      {children}
      {flecha && <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
      {externo && <ExternalLink aria-hidden className="h-4 w-4 opacity-70" />}
    </>
  );
  if (externo || href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={clases}>
        {contenido}
      </a>
    );
  }
  return (
    <Link href={href} className={clases}>
      {contenido}
    </Link>
  );
}
