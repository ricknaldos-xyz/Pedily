import type { Metadata } from "next";
import Link from "next/link";
import { Check, Mail, MapPin } from "lucide-react";
import { Sello } from "@/components/marca/Sello";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { PaginaJsonLd } from "@/components/seo/JsonLd";
import { MESES_PERMANENCIA_ALTA_GRATIS, PLANES, soles } from "@/lib/planes";
import { CONTACT_EMAIL, CONTACT_LOCATION, DEMO, OG_IMAGEN, whatsappLink } from "@/lib/site";
import { FormularioSolicitud } from "./FormularioSolicitud";

const TITULO = "Crea tu tienda con Pedily: cuéntanos de tu restaurante";
const DESCRIPCION =
  "Cuéntanos de tu restaurante en tres preguntas y te preparamos tu tienda o te mostramos Pedily: tienda web, WhatsApp, kiosko, caja y boletas en un solo sistema.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: "/contacto" },
  openGraph: { title: TITULO, description: DESCRIPCION, url: "/contacto", locale: "es_PE", type: "website", images: [OG_IMAGEN] },
};

const GARANTIAS = [
  `Alta gratis si te quedas ${MESES_PERMANENCIA_ALTA_GRATIS} meses`,
  "0 % de comisión al restaurante y al comensal",
  "Cobras en tu propia cuenta",
  `Desde ${soles(PLANES[0].precioMensual)} al mes con IGV`,
];

const PASOS = [
  { t: "Nos cuentas de tu restaurante", d: "Tus datos y tres preguntas rápidas, en este formulario." },
  { t: "Preparamos tu tienda", d: "O, si prefieres, primero te la mostramos con la demo." },
  { t: "Subes tu carta y conectas tus cobros", d: "Te acompañamos paso a paso, sin reunión obligatoria." },
];

export default function ContactoPage() {
  const waHref = whatsappLink();

  return (
    <>
      <PaginaJsonLd ruta="/contacto" nombre="Contacto" descripcion={DESCRIPCION} />
      <section className="papel-trama">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[0.85fr_1.15fr] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-0 lg:px-8 lg:pb-24 [&>*]:min-w-0">
          <div className="lg:col-start-1 lg:row-start-1">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-chicha-700">Crear mi tienda</p>
            <h1 className="mt-3 font-display text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-tinta text-balance sm:text-6xl">
              Cuéntanos de tu restaurante
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-sand-700">
              Tus datos y tres preguntas rápidas. Con eso preparamos tu tienda o, si prefieres, te la mostramos antes.
            </p>
          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:pt-4">
            <FormularioSolicitud waHref={waHref} />
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            <ol className="space-y-4 lg:mt-8">
              {PASOS.map((p, i) => (
                <li key={p.t} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-tinta bg-aji-500 font-mono text-sm font-bold text-tinta">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-display text-lg font-bold leading-tight text-tinta">{p.t}</span>
                    <span className="mt-0.5 block text-[0.95rem] text-sand-700">{p.d}</span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="relative mt-10 max-w-sm text-tinta [filter:drop-shadow(0_12px_18px_rgba(36,16,46,0.14))]">
              <div className="ticket px-5 py-6">
                <ul className="space-y-2.5">
                  {GARANTIAS.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-[0.95rem] leading-snug">
                      <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-hierba-600" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute -right-2 -top-4">
                <Sello tono="pagado" giro={6}>
                  Sin comisión
                </Sello>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-chicha-700">Otras formas de hablarnos</h2>
              <ul className="mt-3 divide-y divide-dashed divide-tinta/20 border-y border-dashed border-tinta/20">
                {waHref && (
                  <li>
                    <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center gap-3 py-3 hover:text-chicha-700">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#075e54] text-white">
                        <WhatsAppGlyph className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-semibold text-tinta">WhatsApp</span>
                        <span className="block text-sm text-sand-700">Escríbenos por chat</span>
                      </span>
                    </a>
                  </li>
                )}
                {CONTACT_EMAIL && (
                  <li>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="flex min-h-14 items-center gap-3 py-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-chicha-50 text-chicha-700">
                        <Mail aria-hidden className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold text-tinta">Correo</span>
                        <span className="block break-all text-sm text-sand-700">{CONTACT_EMAIL}</span>
                      </span>
                    </a>
                  </li>
                )}
                <li className="flex min-h-14 items-center gap-3 py-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-aji-100 text-tinta">
                    <MapPin aria-hidden className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-semibold text-tinta">Dónde estamos</span>
                    <span className="block text-sm text-sand-700">{CONTACT_LOCATION}</span>
                  </span>
                </li>
              </ul>
              <p className="mt-5 text-sm text-sand-700">
                ¿Quieres verlo antes?{" "}
                <Link href="/demo" className="font-semibold text-chicha-700 underline underline-offset-2">
                  Prueba la demo
                </Link>{" "}
                o abre la{" "}
                <a href={DEMO.tiendaUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-chicha-700 underline underline-offset-2">
                  tienda de ejemplo
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
