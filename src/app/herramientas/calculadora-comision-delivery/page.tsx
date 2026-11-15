import type { Metadata } from "next";
import { PaginaHerramienta } from "@/components/herramientas/PaginaHerramienta";
import { CalculadoraComision } from "@/components/herramientas/CalculadoraComision";
import { herramienta, SITE_URL } from "@/lib/herramientas";
import { CULQI_PORCENTAJE, SOLES_POR_DOLAR } from "@/lib/planes";

const h = herramienta("calculadora-comision-delivery");

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
          Pon tus pedidos, tu ticket y la comisión de tu contrato. Verás cuánto
          se lleva la app al mes y al año, y cuánto te quedaría si una parte de
          esos clientes te pide directo por tu web o tu WhatsApp.
        </p>
      }
      comoSeCalcula={
        <>
          <p>
            <strong>Comisión por pedido</strong> = ticket × comisión de la app
            (× 1,18 si te la facturan con IGV).
          </p>
          <p>
            <strong>Costo de un pedido propio</strong> = Culqi:{" "}
            {String(CULQI_PORCENTAJE).replace(".", ",")} % del ticket + US$ 0,20
            (a S/ {String(SOLES_POR_DOLAR).replace(".", ",")} por dólar). Culqi
            no suma IGV a su comisión.
          </p>
          <p>
            <strong>Lo que te queda</strong> = pedidos propios × (comisión por
            pedido − costo de Culqi) − la cuota del plan.
          </p>
          <p>
            No incluye el costo del reparto, que existe en los dos casos, ni
            los mensajes de WhatsApp si usas el asistente.
          </p>
        </>
      }
    >
      <CalculadoraComision />
    </PaginaHerramienta>
  );
}
