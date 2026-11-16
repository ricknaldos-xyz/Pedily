import { Container } from "@/components/layout/Container";
import { Bloque } from "@/components/layout/Bloque";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Building2, Store } from "lucide-react";
import { EMPRESA, RESTAURANTE_ORIGEN } from "@/lib/site";

/** Caso de origen (sin cifras, decisión del 15-nov) y quién está detrás. */
export function Origen() {
  return (
    <Bloque id="quien" className="bg-white">
      <Container className="max-w-4xl">
        <div className="grid gap-4 md:grid-cols-2">
          <AnimatedSection>
            <div className="h-full rounded-2xl bg-sand-900 p-5 text-white sm:p-6">
              <Store className="h-6 w-6 text-primary-300" />
              <h2 className="mt-3 text-2xl font-extrabold leading-tight">
                Nació en {RESTAURANTE_ORIGEN.nombre}
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-sand-200">
                Pedily no se diseñó en una oficina. Nació y se probó en{" "}
                {RESTAURANTE_ORIGEN.nombre}, un restaurante de{" "}
                {RESTAURANTE_ORIGEN.ciudad} que vende así todos los días: web,
                WhatsApp, kiosko y reparto en un solo panel. Es el mismo sistema
                que usa su cocina.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <div className="h-full rounded-2xl border border-sand-200 bg-sand-50 p-5 sm:p-6">
              <Building2 className="h-6 w-6 text-primary-600" />
              <h2 className="mt-3 text-2xl font-extrabold leading-tight text-sand-900">
                Quién está detrás
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-sand-700">
                Una empresa peruana: <strong>{EMPRESA.razonSocial}</strong>.
                Contratos bajo ley peruana, precios en soles con IGV y atención
                en español de aquí.
              </p>
              {(EMPRESA.ruc || EMPRESA.domicilioFiscal) && (
                <dl className="mt-3 space-y-1 text-sm text-sand-600">
                  {EMPRESA.ruc && (
                    <div>
                      <dt className="inline font-semibold">RUC: </dt>
                      <dd className="inline">{EMPRESA.ruc}</dd>
                    </div>
                  )}
                  {EMPRESA.domicilioFiscal && (
                    <div>
                      <dt className="inline font-semibold">Domicilio fiscal: </dt>
                      <dd className="inline">{EMPRESA.domicilioFiscal}</dd>
                    </div>
                  )}
                </dl>
              )}
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </Bloque>
  );
}
