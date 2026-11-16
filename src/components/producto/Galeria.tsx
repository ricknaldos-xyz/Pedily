import { clsx } from "clsx";
import { Captura } from "@/components/marca/Captura";
import { MarcoCelular, MarcoKiosko, MarcoNavegador } from "@/components/marca/Marcos";
import { CAPTURAS, type ClaveCaptura } from "@/lib/capturas";

/**
 * «Así se ve»: capturas reales con su marco. Primero lo que ve el cliente
 * (celular o kiosko), luego el panel. En celulares cada grupo es un carrusel
 * con desplazamiento lateral; en escritorio, una fila de equipos centrada y
 * el panel en dos columnas (si sobra uno, va centrado y más ancho).
 */
export function Galeria({ claves }: { claves: ClaveCaptura[] }) {
  const equipos = claves.filter((k) => CAPTURAS[k].tipo !== "panel");
  const paneles = claves.filter((k) => CAPTURAS[k].tipo === "panel");
  const pie = (k: ClaveCaptura) => <figcaption className="mt-3 text-sm leading-snug text-sand-700">{CAPTURAS[k].alt}</figcaption>;

  return (
    <div className="space-y-10">
      {equipos.length > 0 && (
        <ul className="sin-barra -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 lg:gap-8">
          {equipos.map((k) => (
            <li key={k} className="w-[62vw] max-w-[15rem] shrink-0 snap-center sm:w-[14rem]">
              <figure>
                {CAPTURAS[k].tipo === "kiosko" ? (
                  <MarcoKiosko>
                    <Captura clave={k} sizes="(max-width: 640px) 62vw, 240px" decorativa />
                  </MarcoKiosko>
                ) : (
                  <MarcoCelular>
                    <Captura clave={k} sizes="(max-width: 640px) 62vw, 240px" decorativa />
                  </MarcoCelular>
                )}
                {pie(k)}
              </figure>
            </li>
          ))}
        </ul>
      )}
      {paneles.length > 0 && (
        <ul className="sin-barra -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:gap-8">
          {paneles.map((k, i) => {
            const sola = paneles.length % 2 === 1 && i === paneles.length - 1;
            return (
              <li
                key={k}
                className={clsx("w-[84vw] shrink-0 snap-center sm:w-auto", sola && "sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-3xl")}
              >
                <figure>
                  <MarcoNavegador oscuro url="mirestaurante · panel">
                    <Captura clave={k} sizes={sola ? "(max-width: 640px) 84vw, 768px" : "(max-width: 640px) 84vw, 620px"} decorativa />
                  </MarcoNavegador>
                  {pie(k)}
                </figure>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
