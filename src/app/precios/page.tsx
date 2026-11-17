import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Boton } from "@/components/marca/Boton";
import { Sello } from "@/components/marca/Sello";
import { PricingTable } from "@/components/sections/PricingTable";
import { Fundadores } from "@/components/sections/Fundadores";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ComparativaCanales } from "@/components/sections/ComparativaCanales";
import { AbreTuTienda } from "@/components/sections/AbreTuTienda";
import { Comparativa } from "@/components/precios/Comparativa";
import { Alta, CostosAparte } from "@/components/precios/AltaYCostos";
import { FAQPageJsonLd, PaginaJsonLd } from "@/components/seo/JsonLd";
import { FAQS, PREGUNTA_CARTA_QR, PREGUNTA_DESCARGAR, PREGUNTA_MESA_PRECIO } from "@/lib/faq";
import { MESES_PAGADOS_ANUAL, MESES_PERMANENCIA_ALTA_GRATIS, PLANES, soles } from "@/lib/planes";

const TITULO = "Precios de Pedily: desde S/ 249 al mes con IGV, 0 % de comisión";
const DESCRIPCION =
  "Planes de S/ 249, 499 y 999 al mes con IGV y 0 % de comisión, comparados función por función. Alta gratis si te quedas 6 meses, programa de fundadores y lo que pagas aparte a Culqi, Nubefact y Meta, con su fuente.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: "/precios" },
  openGraph: { title: TITULO, description: DESCRIPCION, url: "/precios", locale: "es_PE", type: "website" },
};

/** Preguntas de dinero de la FAQ general (mismo texto que el JSON-LD). */
const PREGUNTAS_PRECIO = [
  "¿Cuánto cuesta Pedily?",
  "¿Qué pago aparte?",
  "¿Cuánto cuesta el alta y hay permanencia?",
  "¿Qué es el programa de fundadores?",
  "¿El dinero pasa por Pedily?",
  "¿Puedo vender antes de que Culqi me apruebe?",
  PREGUNTA_DESCARGAR.pregunta,
  "¿Cómo funcionan el kiosko y el QR de mesa?",
  PREGUNTA_CARTA_QR.pregunta,
  PREGUNTA_MESA_PRECIO.pregunta,
].map((q) => {
  const f = FAQS.find((x) => x.pregunta === q);
  if (!f) throw new Error(`Falta en la FAQ: ${q}`);
  return f;
});

const NO_PAGAS = [
  "Comisión por pedido, ni tú ni tu cliente",
  "Cargo por irte después de 6 meses",
  "Intermediación en tus cobros: el dinero va directo a tu cuenta",
];

export default function PreciosPage() {
  return (
    <>
      <PaginaJsonLd ruta="/precios" nombre="Precios" descripcion={DESCRIPCION} />
      <FAQPageJsonLd preguntas={PREGUNTAS_PRECIO} />

      {/* ── Cabecera ── */}
      <section className="papel-trama overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-4 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[1.3fr_0.7fr] lg:px-8">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-chicha-700">Precios</p>
            <h1 className="mt-3 max-w-4xl font-display text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-tinta text-balance sm:text-6xl">
              Precios claros, con IGV. 0 % de comisión.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sand-700">
              Una cuota fija al mes. Ni tu restaurante ni tus clientes pagan comisión por pedido, y lo que cobran Culqi, Nubefact y
              Meta te lo decimos aquí mismo, con su fuente.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Boton href="/contacto" tam="lg" flecha>
                Crear mi tienda
              </Boton>
              <Boton href="#comparativa" variante="borde" tam="lg">
                Comparar función por función
              </Boton>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xs text-tinta [filter:drop-shadow(0_14px_20px_rgba(36,16,46,0.16))]">
            <div className="ticket px-5 py-6">
              <p className="text-center font-mono text-[11px] font-bold uppercase tracking-[0.14em]">Lo que no pagas</p>
              <div aria-hidden className="punteado my-3 text-tinta/30" />
              <ul className="space-y-2.5">
                {NO_PAGAS.map((t) => (
                  <li key={t} className="flex gap-2 text-[0.95rem] leading-snug">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-hierba-600" />
                    {t}
                  </li>
                ))}
              </ul>
              <div aria-hidden className="punteado my-3 text-tinta/30" />
              <p className="font-mono text-[12px] leading-relaxed text-sand-700">
                Anual: pagas {MESES_PAGADOS_ANUAL} meses y usas 12. Desde {soles(PLANES[0].precioMensual)} al mes.
              </p>
            </div>
            <div className="absolute -left-3 -top-4">
              <Sello tono="pagado" giro={-7}>
                0 % comisión
              </Sello>
            </div>
          </div>
        </div>
      </section>

      <h2 className="sr-only">Los tres planes</h2>
      <PricingTable sinTitulo soloPlanes />
      <Comparativa />
      <ComparativaCanales />
      <AbreTuTienda />
      <Alta />
      <Fundadores />
      <CostosAparte />
      <FAQ
        preguntas={PREGUNTAS_PRECIO}
        titulo="Preguntas sobre precios"
        bajada={`Cuota, alta, permanencia de ${MESES_PERMANENCIA_ALTA_GRATIS} meses, fundadores y dinero, sin letra chica.`}
      />
      <FinalCTA />
    </>
  );
}
