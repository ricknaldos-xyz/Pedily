import type { Metadata } from "next";
import { PaginaHerramienta } from "@/components/herramientas/PaginaHerramienta";
import { CalculadoraIgv } from "@/components/herramientas/CalculadoraIgv";
import { herramienta, SITE_URL } from "@/lib/herramientas";

const h = herramienta("calculadora-igv-restaurantes");

export const metadata: Metadata = {
  title: h.tituloSeo,
  description: h.descripcion,
  alternates: { canonical: `${SITE_URL}/herramientas/${h.slug}` },
  openGraph: { title: h.tituloSeo, description: h.descripcion, url: `${SITE_URL}/herramientas/${h.slug}`, images: ["/og-image.png"] },
};

export default function Page() {
  return (
    <PaginaHerramienta
      h={h}
      intro={
        <>
          <p>
            Los restaurantes MYPE que cumplen los requisitos pagan una tasa
            especial: <strong>10,5 % en 2026</strong> (8 % de IGV + 2,5 % de
            IPM) y <strong>15 % en 2027</strong> (12 % + 3 %). Desde 2028 la ley
            no prevé tasa especial y se aplica la general de 18 %.
          </p>
          <p>Pon tus ventas y mira cuánto te cambia y a cuánto ajustar tus precios.</p>
        </>
      }
      comoSeCalcula={
        <>
          <p>
            Tus precios ya incluyen el impuesto. Por eso:{" "}
            <strong>base = ventas ÷ (1 + tasa)</strong> e{" "}
            <strong>impuesto = ventas − base</strong>.
          </p>
          <p>
            <strong>Precio en 2027 para recibir lo mismo</strong> = precio de
            hoy × 1,15 ÷ 1,105.
          </p>
          <p>
            La tasa especial viene de la Ley 31556, modificada por la Ley 32219,
            que fija el IGV en 8 % para 2026 y 12 % para 2027. El IPM sube por la
            Ley 32387; las tasas totales (10,5 % y 15 %) son las de la tabla de
            SUNAT.
          </p>
        </>
      }
    >
      <CalculadoraIgv />
    </PaginaHerramienta>
  );
}
