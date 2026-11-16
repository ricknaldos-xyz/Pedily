import { ExternalLink } from "lucide-react";
import { Encabezado } from "@/components/ui/Encabezado";
import { Corte, FilaTicket } from "@/components/marca/Ticket";
import { Sello } from "@/components/marca/Sello";
import {
  altaProporcional,
  COSTOS_APARTE,
  EJEMPLO_ALTA,
  MESES_PERMANENCIA_ALTA_GRATIS,
  PLANES,
  soles,
} from "@/lib/planes";

const MESES = Array.from({ length: MESES_PERMANENCIA_ALTA_GRATIS + 1 }, (_, i) => i);
/** Las dos altas distintas: S/ 490 (Tienda y Tienda + WhatsApp) y S/ 790 (Completo). */
const ALTAS = Array.from(new Set(PLANES.map((p) => p.alta))).map((alta) => ({
  alta,
  planes: PLANES.filter((p) => p.alta === alta).map((p) => p.nombre),
}));

/** Alta con su cálculo proporcional, mes por mes (todo sale de `planes.ts`). */
export function Alta() {
  const faltan = MESES_PERMANENCIA_ALTA_GRATIS - EJEMPLO_ALTA.mesesPagados;
  return (
    <section id="alta" aria-labelledby="t-alta" className="scroll-mt-16 py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:px-8">
        <div>
          <Encabezado
            id="t-alta"
            etiqueta="El alta"
            titulo={`Alta gratis si te quedas ${MESES_PERMANENCIA_ALTA_GRATIS} meses`}
            bajada="El alta es la instalación de tu Pedily, una sola vez. En Completo incluye dejar configurados el kiosko y la impresora en remoto. Si te vas antes de los 6 meses, pagas solo la parte de los meses que faltan, redondeada a sol entero. No hay ningún otro cargo por irte."
          />
          <ul className="mt-8 space-y-3">
            {ALTAS.map((a) => (
              <li key={a.alta} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-dashed border-tinta/20 pb-3">
                <span className="text-[0.98rem] text-sand-700">{a.planes.join(" y ")}</span>
                <span className="font-mono text-lg font-bold text-tinta">{soles(a.alta)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl bg-aji-100 px-4 py-3 text-[0.98rem] leading-relaxed text-tinta">
            <strong>Ejemplo:</strong> plan {EJEMPLO_ALTA.plan}, te vas tras {EJEMPLO_ALTA.mesesPagados} meses →{" "}
            {soles(EJEMPLO_ALTA.alta)} × {faltan}/{MESES_PERMANENCIA_ALTA_GRATIS} ={" "}
            <strong className="font-mono">{soles(altaProporcional(EJEMPLO_ALTA.alta, EJEMPLO_ALTA.mesesPagados))}</strong>.
          </p>
        </div>

        <div className="relative text-tinta [filter:drop-shadow(0_14px_20px_rgba(36,16,46,0.16))]">
          <div className="ticket px-5 py-7 sm:px-7">
            <p className="text-center font-mono text-[11px] font-bold uppercase tracking-[0.14em]">Si te vas en el mes…</p>
            <Corte />
            <table className="w-full font-mono text-[13px]">
              <caption className="sr-only">Lo que pagas del alta según los meses que te quedaste</caption>
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-humo">
                  <th scope="col" className="py-1.5 text-left font-semibold">
                    Meses pagados
                  </th>
                  {ALTAS.map((a) => (
                    <th key={a.alta} scope="col" className="py-1.5 text-right font-semibold">
                      Alta {soles(a.alta)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MESES.map((m) => (
                  <tr key={m} className={m === EJEMPLO_ALTA.mesesPagados ? "bg-aji-100" : undefined}>
                    <th scope="row" className="py-1.5 pl-1 text-left font-normal">
                      {m === MESES_PERMANENCIA_ALTA_GRATIS ? `${m} o más` : m}
                    </th>
                    {ALTAS.map((a) => (
                      <td key={a.alta} className="py-1.5 pr-1 text-right font-bold">
                        {altaProporcional(a.alta, m) === 0 ? "S/ 0" : soles(altaProporcional(a.alta, m))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <Corte />
            <FilaTicket concepto="Fórmula" monto={`alta × faltan ÷ ${MESES_PERMANENCIA_ALTA_GRATIS}`} />
          </div>
          <div className="absolute -right-1 -top-4 sm:-right-4">
            <Sello tono="pagado" giro={7}>
              {MESES_PERMANENCIA_ALTA_GRATIS} meses = S/ 0
            </Sello>
          </div>
        </div>
      </div>
    </section>
  );
}

const DOMINIO = (url: string) => new URL(url).hostname.replace(/^www\./, "");

/** Lo que el restaurante paga aparte, directo a cada proveedor, con su fuente. */
export function CostosAparte() {
  return (
    <section id="pagas-aparte" aria-labelledby="t-aparte" className="scroll-mt-16 bg-tinta py-16 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Encabezado
          oscuro
          id="t-aparte"
          etiqueta="Lo que pagas aparte"
          titulo="Lo que cobra cada proveedor, directo a él"
          bajada="Pedily nunca toca tu dinero ni le suma nada a estas tarifas. Son los precios públicos de cada proveedor, leídos en noviembre de 2026; pueden cambiar, así que te dejamos el enlace a su tarifa."
        />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {COSTOS_APARTE.map((c) => (
            <li key={c.proveedor} className="flex flex-col rounded-2xl border border-white/15 p-5 sm:p-6">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-aji-400">{c.proveedor}</p>
              <p className="mt-3 font-display text-xl font-bold leading-snug">{c.precio}</p>
              <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-chicha-100">{c.que}</p>
              <a
                href={c.fuente}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-10 items-center gap-1.5 self-start text-sm font-semibold text-aji-400 underline underline-offset-2"
              >
                Su tarifa en {DOMINIO(c.fuente)} <ExternalLink aria-hidden className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-chicha-100">
          El equipo del kiosko (la pantalla, y una PC con Windows e impresora térmica si quieres ticket impreso) lo compras tú.
          Sin asistente de WhatsApp no pagas nada a Meta.
        </p>
      </div>
    </section>
  );
}
