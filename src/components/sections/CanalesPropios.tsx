import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Bloque } from "@/components/layout/Bloque";
import { Encabezado } from "@/components/ui/Encabezado";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ExternalLink } from "lucide-react";
import { DEMO } from "@/lib/site";

export function CanalesPropios() {
  return (
    <Bloque id="tienda" className="bg-white">
      <Container className="max-w-5xl">
        <Encabezado
          etiqueta="Tu tienda y tu kiosko"
          titulo="Una carta, tu marca, tus precios"
          bajada="Tu tienda web para pedir desde el celular y, en tu local, un kiosko donde el cliente pide y paga solo. Lo que cambias en la carta se ve en los dos."
        />

        <div className="mt-6 grid grid-cols-2 items-end gap-3 sm:grid-cols-[16rem_1fr] sm:gap-8 lg:mx-auto lg:max-w-3xl">
          <AnimatedSection>
            <figure className="mx-auto w-full sm:max-w-[16rem]">
              <div className="overflow-hidden rounded-[1.4rem] border-4 border-sand-900 bg-white shadow-elevated">
                <Image
                  src="/capturas/tienda-carta.webp"
                  alt="Carta de la tienda de ejemplo en un celular, con categorías, platos y precios"
                  width={560}
                  height={1106}
                  sizes="(max-width: 640px) 45vw, 300px"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-2 text-center text-xs text-sand-500">
                Tienda web (celular)
              </figcaption>
            </figure>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <figure>
              <div className="overflow-hidden rounded-xl border-4 border-sand-800 bg-white shadow-elevated">
                <Image
                  src="/capturas/kiosko-carta.webp"
                  alt="Pantalla del kiosko de autoservicio con la carta y el botón Agregar"
                  width={760}
                  height={820}
                  sizes="(max-width: 640px) 45vw, 420px"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-2 text-center text-xs text-sand-500">
                Kiosko de autoservicio (plan de S/ 999)
              </figcaption>
            </figure>
          </AnimatedSection>
        </div>

        <ul className="mx-auto mt-5 grid max-w-3xl gap-2 text-sm text-sand-700 sm:grid-cols-2">
          <li>• Tamaños, extras y notas como «sin cebolla».</li>
          <li>• Pago con tarjeta, Yape o QR de Plin; en el kiosko, también en caja.</li>
          <li className="hidden sm:list-item">• Para imprimir en el kiosko: PC con Windows e impresora térmica.</li>
        </ul>

        <p className="mt-5 text-center">
          <a
            href={DEMO.tiendaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-sand-300 px-5 py-3 text-sm font-semibold text-sand-800 hover:bg-sand-50"
          >
            Mira una tienda de ejemplo <ExternalLink className="h-4 w-4" />
          </a>
        </p>
      </Container>
    </Bloque>
  );
}
