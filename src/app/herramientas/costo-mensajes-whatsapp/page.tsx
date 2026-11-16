import type { Metadata } from "next";
import { PaginaHerramienta } from "@/components/herramientas/PaginaHerramienta";
import { CalculadoraWhatsapp } from "@/components/herramientas/CalculadoraWhatsapp";
import { herramienta, META, SITE_URL } from "@/lib/herramientas";
import { soles } from "@/lib/planes";

const h = herramienta("costo-mensajes-whatsapp");

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
        <p>
          Desde el 1 de octubre de 2026 Meta cobra las respuestas de tu negocio
          por WhatsApp después de las primeras 1.000 de cada mes. Calcula
          cuánto pagarías por tus conversaciones, avisos de pedido y campañas.
        </p>
      }
      comoSeCalcula={
        <>
          <p>
            <strong>Servicio</strong> = conversaciones × respuestas. Las
            primeras {META.servicioGratisMes.toLocaleString("es-PE").replace(/,/g, ".")} del mes
            son gratis; cada una de las siguientes cuesta {soles(META.servicio, 4)}.
          </p>
          <p>
            <strong>Utilidad</strong> = pedidos × avisos con plantilla, a{" "}
            {soles(META.utilidad, 4)} cada uno.
          </p>
          <p>
            <strong>Marketing</strong> = mensajes de campaña × {soles(META.marketing, 4)}.
          </p>
          <p>
            Cuantas menos respuestas necesite un pedido, menos pagas: por eso
            conviene un asistente que agrupe lo que pregunta en pocos mensajes.
          </p>
        </>
      }
    >
      <CalculadoraWhatsapp />
    </PaginaHerramienta>
  );
}
