import Link from "next/link";
import { clsx } from "clsx";
import { Encabezado } from "@/components/ui/Encabezado";
import { Sello, type TonoSello } from "@/components/marca/Sello";
import { Corte, FilaTicket, Ticket } from "@/components/marca/Ticket";
import { RUTA_SOLUCION } from "@/lib/soluciones";
import { Clip } from "@/components/marca/Clip";
import { MarcoCelular, MarcoKiosko, MarcoNavegador } from "@/components/marca/Marcos";
import { CLIPS } from "@/lib/capturas";

interface Parada {
  titulo: string;
  texto: string;
  enlace: { href: string; texto: string };
  sello: { texto: string; tono: TonoSello };
  mini: React.ReactNode;
}

const PARADAS: Parada[] = [
  {
    titulo: "Tu cliente escribe como habla",
    texto: "Por WhatsApp, en tu web, en el kiosko o desde la mesa. Todo entra al mismo panel.",
    enlace: { href: RUTA_SOLUCION("asistente-whatsapp"), texto: "Asistente de WhatsApp" },
    sello: { texto: "Nuevo", tono: "cocina" },
    mini: (
      <p className="w-fit rounded-lg rounded-tr-sm bg-[#d9fdd3] px-2.5 py-1.5 text-[12px] text-[#111b21]">
        «medio pollo y una jarra de chicha pa’ Jesús María»
      </p>
    ),
  },
  {
    titulo: "Arma el pedido y abre la mini-app para pagar",
    texto: "Solo ofrece lo de tu carta, con tus precios. Desde el chat se abre tu mini-app: entrega y pago, a tu cuenta.",
    enlace: { href: RUTA_SOLUCION("caja-y-pagos"), texto: "Caja y pagos" },
    sello: { texto: "Pagado", tono: "pagado" },
    mini: (
      <div className="space-y-0.5">
        <FilaTicket concepto="Medio pollo" monto="34,00" />
        <FilaTicket concepto="Chicha 1 L" monto="14,00" />
        <FilaTicket concepto="Envío" monto="8,00" />
        <FilaTicket concepto="Yape" monto="S/ 56,00" fuerte />
      </div>
    ),
  },
  {
    titulo: "Llega a cocina con alarma",
    texto: "Suena hasta que alguien lo atiende. Cocina lo ve con tamaño y cremas.",
    enlace: { href: RUTA_SOLUCION("cocina"), texto: "Cocina y operación" },
    sello: { texto: "En cocina", tono: "cocina" },
    mini: (
      <div className="font-mono text-[12px]">
        <p className="font-bold">#RD000146 · ⏱ 4 min</p>
        <p>1× Medio pollo a la brasa</p>
        <p className="text-humo">Mayonesa · Ají de la casa</p>
      </div>
    ),
  },
  {
    titulo: "La boleta sale sola",
    texto: "Boleta o factura electrónica con tu RUC, a través de tu Nubefact.",
    enlace: { href: RUTA_SOLUCION("boletas-sunat"), texto: "Boletas SUNAT" },
    sello: { texto: "SUNAT ✓", tono: "boleta" },
    mini: (
      <div className="text-center font-mono text-[12px]">
        <p className="font-bold">BOLETA ELECTRÓNICA</p>
        <p>B001-000381</p>
      </div>
    ),
  },
  {
    titulo: "Sale a reparto o a recojo",
    texto: "Con tus zonas y tarifas. ¿Sin motorizado? Pides uno con PedidosYa Envíos o Yango.",
    enlace: { href: RUTA_SOLUCION("delivery"), texto: "Delivery y zonas" },
    sello: { texto: "En camino", tono: "camino" },
    mini: (
      <div className="space-y-0.5">
        <FilaTicket concepto="Jesús María" monto="S/ 8" />
        <FilaTicket concepto="Llega en" monto="45 min" />
      </div>
    ),
  },
  {
    titulo: "Y vuelve a pedir directo",
    texto: "Repite «lo de siempre», usa su cupón o su saldo a favor. Sin app de por medio.",
    enlace: { href: RUTA_SOLUCION("clientes-y-campanas"), texto: "Clientes y campañas" },
    sello: { texto: "Volvió", tono: "listo" },
    mini: (
      <p className="w-fit rounded-lg rounded-tr-sm bg-[#d9fdd3] px-2.5 py-1.5 text-[12px] text-[#111b21]">«lo de siempre porfa»</p>
    ),
  },
];

/**
 * «Un pedido, de punta a punta» (benchmark §5.3 n.º 4). L-03 (auditoría L-01
 * §4 P1-6): el pedido se cuenta una sola vez. En móvil, los 6 pasos son un
 * carrusel «Paso n de 6» y los clips reales (kiosko, mesa y cocina) van en el
 * mismo bloque, también deslizables; en escritorio, como antes.
 */
export function RecorridoPedido() {
  return (
    <section id="como-funciona" className="scroll-mt-16 bg-white py-14 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Encabezado
          etiqueta="Un pedido, de punta a punta"
          titulo="Así viaja un pedido, sin que nadie lo anote a mano"
          bajada="Del primer mensaje del cliente a la boleta y de vuelta a tu tienda. Cada parada es una parte de Pedily."
        />

        <ol
          aria-label="Los 6 pasos de un pedido"
          className="sin-barra relative -mx-4 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 lg:mx-0 lg:mt-12 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          <span aria-hidden className="punteado absolute left-6 right-6 top-[1.05rem] hidden text-tinta/25 lg:block" />
          {PARADAS.map((p, i) => (
            <li
              key={p.titulo}
              className="relative w-[80%] max-w-[19rem] shrink-0 snap-start rounded-2xl border border-tinta/10 bg-papel p-4 lg:w-auto lg:max-w-none lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:pt-12"
            >
              <span className="flex items-center gap-2 lg:block">
                <span
                  aria-hidden
                  className={clsx(
                    "flex h-[2.1rem] w-[2.1rem] shrink-0 items-center justify-center rounded-full border-2 border-tinta font-mono text-sm font-bold lg:absolute lg:left-0 lg:top-0",
                    i === 0 ? "bg-aji-500" : "bg-white lg:bg-papel"
                  )}
                >
                  {i + 1}
                </span>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-humo lg:hidden">
                  Paso {i + 1} de {PARADAS.length}
                </span>
              </span>
              <h3 className="mt-3 font-display text-lg font-bold leading-tight text-tinta lg:mt-0">{p.titulo}</h3>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-sand-700">{p.texto}</p>
              <Ticket className="mt-4 max-w-xs">
                {p.mini}
                <Corte />
                <Sello tono={p.sello.tono} giro={i % 2 ? 4 : -5}>
                  {p.sello.texto}
                </Sello>
              </Ticket>
              <Link href={p.enlace.href} className="mt-3 inline-block text-sm font-semibold text-chicha-700 underline-offset-2 hover:underline">
                {p.enlace.texto} →
              </Link>
            </li>
          ))}
        </ol>
        <p aria-hidden className="mt-1 text-center font-mono text-[10px] uppercase tracking-wider text-humo lg:hidden">
          Desliza para ver los 6 pasos →
        </p>

        {/* ── En video: el mismo recorrido en el producto real ── */}
        <div className="mt-10 rounded-3xl bg-papel p-5 sm:p-8 lg:mt-16">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-chicha-700">Míralo funcionando</p>
          <p className="mt-2 max-w-2xl font-display text-2xl font-bold leading-tight text-tinta">
            Pasos 1 y 3 en el producto real: del kiosko y la mesa a la cocina
          </p>
          <ul className="sin-barra -mx-5 mt-6 flex snap-x snap-mandatory items-end gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 lg:mt-8 lg:grid-cols-[0.8fr_0.8fr_1.6fr]">
            <li className="w-[58%] shrink-0 snap-start sm:w-auto">
              <MarcoKiosko className="mx-auto max-w-[14rem]">
                <Clip clave="kiosko" />
              </MarcoKiosko>
              <p className="mt-3 text-center text-sm text-sand-700">{CLIPS.kiosko.titulo}</p>
            </li>
            <li className="w-[52%] shrink-0 snap-start sm:w-auto">
              <MarcoCelular className="mx-auto max-w-[13rem]">
                <Clip clave="mesa" />
              </MarcoCelular>
              <p className="mt-3 text-center text-sm text-sand-700">{CLIPS.mesa.titulo}</p>
            </li>
            <li className="w-[88%] shrink-0 snap-start sm:col-span-2 sm:w-auto lg:col-span-1">
              <MarcoNavegador url="mirestaurante · panel/cocina" oscuro>
                <Clip clave="cocina" />
              </MarcoNavegador>
              <p className="mt-3 text-center text-sm text-sand-700">{CLIPS.cocina.titulo}</p>
            </li>
          </ul>
          <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-wider text-humo">Producto real · datos de demostración</p>
        </div>
      </div>
    </section>
  );
}
