import { clsx } from "clsx";
import { Captura } from "@/components/marca/Captura";
import { MarcoCelular, MarcoKiosko, MarcoNavegador } from "@/components/marca/Marcos";
import { CAPTURAS, type ClaveCaptura } from "@/lib/capturas";

/**
 * «Así se ve»: fila de capturas reales con su marco (celular, kiosko o
 * navegador del panel). En celulares es un carrusel con desplazamiento
 * lateral; en escritorio, una cuadrícula donde el panel ocupa dos columnas.
 */
export function Galeria({ claves, oscuro = false }: { claves: ClaveCaptura[]; oscuro?: boolean }) {
  return (
    <ul className="sin-barra -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:items-end lg:overflow-visible lg:px-0">
      {claves.map((k) => {
        const c = CAPTURAS[k];
        const ancho = c.tipo === "panel" ? "w-[84vw] sm:w-[30rem] lg:col-span-2 lg:w-auto" : "w-[62vw] sm:w-[15rem] lg:w-auto";
        return (
          <li key={k} className={clsx("shrink-0 snap-center", ancho)}>
            <figure>
              {c.tipo === "panel" ? (
                <MarcoNavegador oscuro url={`mirestaurante · panel`}>
                  <Captura clave={k} sizes="(max-width: 640px) 84vw, (max-width: 1024px) 480px, 600px" />
                </MarcoNavegador>
              ) : c.tipo === "kiosko" ? (
                <MarcoKiosko className="mx-auto max-w-[15rem]">
                  <Captura clave={k} sizes="(max-width: 640px) 62vw, 240px" />
                </MarcoKiosko>
              ) : (
                <MarcoCelular className="mx-auto max-w-[15rem]">
                  <Captura clave={k} sizes="(max-width: 640px) 62vw, 240px" />
                </MarcoCelular>
              )}
              <figcaption className={clsx("mt-3 text-sm leading-snug", oscuro ? "text-chicha-100" : "text-sand-700")}>{c.alt}</figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
