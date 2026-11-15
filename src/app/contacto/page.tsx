import { Container } from "@/components/layout/Container";
import { Check, MessageCircle, Mail, MapPin } from "lucide-react";
import { MESES_PERMANENCIA_ALTA_GRATIS } from "@/lib/planes";
import { CONTACT_EMAIL, CONTACT_LOCATION, whatsappLink } from "@/lib/site";
import { FormularioSolicitud } from "./FormularioSolicitud";

export const metadata = {
  title: "Contacto | Pedily",
  description:
    "Cuéntanos de tu restaurante en tres preguntas y te mostramos Pedily: tienda web, WhatsApp, kiosko, caja y boletas en un solo sistema.",
};

export default function ContactoPage() {
  const waHref = whatsappLink();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-sand-50 to-white py-12 sm:py-24">
        <Container className="max-w-5xl">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-sand-900 sm:text-4xl">
              Cuéntanos de tu restaurante
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-sand-500">
              Tus datos y tres preguntas rápidas. Con eso preparamos tu tienda o,
              si prefieres, te la mostramos antes.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <FormularioSolicitud waHref={waHref} />
            </div>

            <div className="space-y-4 lg:col-span-2">
              <ul className="space-y-2 rounded-2xl border border-primary-200 bg-primary-50 p-5 text-sm text-sand-800">
                {[
                  `Alta gratis si te quedas ${MESES_PERMANENCIA_ALTA_GRATIS} meses`,
                  "0 % de comisión al restaurante y al comensal",
                  "Cobras en tu propia cuenta",
                  "Desde S/ 249 al mes con IGV",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="h-4 w-4 flex-shrink-0 text-primary-600" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl border border-sand-200 bg-white p-6">
                <h2 className="text-lg font-bold text-sand-900">
                  Otras formas de contactarnos
                </h2>

                <div className="mt-6 space-y-4">
                  {waHref && (
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-sand-50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                        <MessageCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sand-900">WhatsApp</p>
                        <p className="text-sm text-sand-500">
                          Escríbenos por chat
                        </p>
                      </div>
                    </a>
                  )}

                  {CONTACT_EMAIL && (
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-sand-50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                        <Mail className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sand-900">Correo</p>
                        <p className="break-all text-sm text-sand-500">
                          {CONTACT_EMAIL}
                        </p>
                      </div>
                    </a>
                  )}

                  <div className="flex items-start gap-3 rounded-xl p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream-300">
                      <MapPin className="h-5 w-5 text-cream-700" />
                    </div>
                    <div>
                      <p className="font-medium text-sand-900">Ubicación</p>
                      <p className="text-sm text-sand-500">{CONTACT_LOCATION}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
