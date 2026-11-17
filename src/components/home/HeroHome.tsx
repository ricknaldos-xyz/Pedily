import Link from "next/link";
import { Check } from "lucide-react";
import { Boton } from "@/components/marca/Boton";
import { MarcoCelular, MarcoPortatil } from "@/components/marca/Marcos";
import { Clip } from "@/components/marca/Clip";
import { ChatWhatsApp, TicketBoleta, TicketComanda } from "@/components/producto/Escenas";
import { TarjetaAlarma } from "@/components/producto/TarjetaAlarma";
import { MESES_PERMANENCIA_ALTA_GRATIS } from "@/lib/planes";

const GARANTIAS = [
  "0 % de comisión al restaurante y al comensal",
  "El dinero va directo a tu cuenta",
  `Alta gratis si te quedas ${MESES_PERMANENCIA_ALTA_GRATIS} meses`,
];

/**
 * L-03 (16-nov): titular propio y de resultado (auditoría L-01 §4 P1-2: el de
 * antes se parecía al H1 de Fudo y a un H2 de Quick eat!). En móvil el
 * producto asoma dentro de los primeros 844 px (P1-1): la escena va justo
 * después del titular y los botones y garantías, debajo. El dato clave del
 * panel va en grande en <TarjetaAlarma> (P1-7).
 *
 * Hero «el pedido en vivo» (benchmark §5.3 n.º 1): el titular es texto real
 * (y el LCP); la escena se arma con HTML. Las tres piezas de comanda entran
 * en orden al cargar (pago → cocina → boleta), sin depender del scroll; con
 * prefers-reduced-motion se ven quietas desde el principio.
 */
export function HeroHome() {
  return (
    <section className="papel-trama relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 [&>*]:min-w-0 pb-10 pt-6 sm:px-6 sm:pt-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-x-6 lg:gap-y-0 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="relative z-10 lg:row-span-2 lg:pt-6">
          <p className="inline-flex flex-wrap items-center gap-x-2 rounded-full border border-tinta/15 bg-white px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-chicha-700 sm:text-xs">
            Desde S/ 249 al mes con IGV <span aria-hidden>·</span> 0 % de comisión
          </p>
          <h1 className="mt-4 font-display text-[2.45rem] font-extrabold leading-[0.98] tracking-[-0.035em] text-tinta text-balance sm:mt-5 sm:text-6xl lg:text-[3.7rem] xl:text-[4.1rem]">
            Vende directo. La comisión{" "}
            <span className="relative inline-block">
              se queda contigo
              <svg aria-hidden viewBox="0 0 300 18" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-3 w-full text-aji-500 sm:h-4">
                <path d="M2 12c60-8 140-11 296-4" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </span>
            .
          </h1>
          <p className="mt-4 max-w-xl text-[1.02rem] leading-snug text-sand-700 text-pretty sm:mt-5 sm:text-lg sm:leading-relaxed">
            <span className="lg:hidden">WhatsApp con IA que cobra, tienda web, kiosko y QR de mesa, con cocina, caja y boletas SUNAT en un panel.</span>
            <span className="hidden lg:inline">
              Un asistente de WhatsApp que conversa y cobra, tu tienda web, kiosko y QR de mesa para vender. Cocina, caja,
              boletas SUNAT, inventario y reportes para operar. En un solo panel, y sin pagarle comisión a nadie.
            </span>
          </p>
          {/* En escritorio, los botones van aquí; en móvil, debajo de la escena. */}
          <div className="hidden lg:block">
            <Acciones />
          </div>
        </div>

        {/* ── Escena ── */}
        <div className="relative">
          {/* Escritorio: portátil con el panel + celular con el chat + dato legible + tickets */}
          <div className="relative hidden lg:block lg:h-[40rem]">
            <div className="absolute right-0 top-4 w-[36rem] xl:w-[39rem]">
              <MarcoPortatil>
                <Clip clave="alarma" inmediato />
              </MarcoPortatil>
            </div>
            <div className="absolute bottom-0 left-[-2rem] z-10 w-[14.5rem] rotate-[-3deg] xl:left-[-3rem]">
              <MarcoCelular>
                <ChatWhatsApp animado className="h-[26rem]" />
              </MarcoCelular>
            </div>
            <TarjetaAlarma className="absolute right-[-1rem] top-[-1.25rem] z-20 w-[15.5rem] rotate-[2deg]" />
            <div aria-hidden>
              <TicketComanda className="absolute bottom-[2.5rem] right-0 z-20 rotate-[3deg] animate-entra [animation-delay:4.2s]" />
              <TicketBoleta className="absolute bottom-0 right-[12.5rem] z-20 w-48 rotate-[-2deg] animate-entra [animation-delay:5s]" />
            </div>
          </div>

          {/* Pantallas chicas y medianas: celular con el chat + el dato del panel, dentro del primer pantallazo */}
          <div className="relative mx-auto h-[25rem] max-w-[24rem] overflow-hidden sm:h-[30rem] lg:hidden">
            <MarcoCelular className="absolute left-0 top-0 w-[63%] max-w-[15.5rem] rotate-[-2deg]">
              <ChatWhatsApp animado className="h-[30rem]" />
            </MarcoCelular>
            <TarjetaAlarma compacta className="absolute right-0 top-8 z-10 w-[56%] max-w-[13.5rem] rotate-[3deg]" />
            <div aria-hidden>
              <TicketComanda className="absolute bottom-3 right-1 z-10 w-[52%] max-w-[12.5rem] rotate-[-3deg]" />
            </div>
            <div aria-hidden className="absolute inset-x-0 bottom-0 z-20 h-10 bg-gradient-to-t from-papel to-transparent" />
          </div>
          <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-wider text-humo lg:mt-6 lg:text-right">
            Panel real con datos de la demo · chat de ejemplo · asistente desde S/ 499
          </p>
        </div>

        <div className="lg:hidden">
          <Acciones />
        </div>
      </div>
    </section>
  );
}

function Acciones() {
  return (
    <>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-7">
        <Boton href="/contacto" tam="lg" flecha ancho>
          Crear mi tienda
        </Boton>
        <Boton href="/demo" variante="borde" tam="lg" ancho>
          Ver la demo
        </Boton>
      </div>
      <ul className="mt-6 space-y-1.5 text-[0.95rem] text-sand-700">
        {GARANTIAS.map((g) => (
          <li key={g} className="flex items-center gap-2">
            <Check aria-hidden className="h-4 w-4 shrink-0 text-hierba-600" />
            {g}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm text-humo">
        ¿Cuánto te cobran hoy las apps?{" "}
        <Link href="#calculadora" className="font-semibold text-chicha-700 underline underline-offset-2">
          Haz la cuenta
        </Link>
        {" · "}
        <Link href="/panel" className="font-semibold text-chicha-700 underline underline-offset-2">
          Recorre el panel por dentro
        </Link>
      </p>
    </>
  );
}
