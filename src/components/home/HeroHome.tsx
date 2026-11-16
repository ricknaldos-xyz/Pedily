import Link from "next/link";
import { Check } from "lucide-react";
import { Boton } from "@/components/marca/Boton";
import { MarcoCelular, MarcoPortatil } from "@/components/marca/Marcos";
import { Captura } from "@/components/marca/Captura";
import { ChatWhatsApp, TicketBoleta, TicketComanda, TicketPago } from "@/components/producto/Escenas";
import { PanelPedidos } from "@/components/producto/MiniPanel";
import { MESES_PERMANENCIA_ALTA_GRATIS } from "@/lib/planes";

const GARANTIAS = [
  "0 % de comisión al restaurante y al comensal",
  "El dinero va directo a tu cuenta",
  `Alta gratis si te quedas ${MESES_PERMANENCIA_ALTA_GRATIS} meses`,
];

/**
 * Hero «el pedido en vivo» (benchmark §5.3 n.º 1): el titular es texto real
 * (y el LCP); la escena se arma con HTML. Las tres piezas de comanda entran
 * en orden al cargar (pago → cocina → boleta), sin depender del scroll; con
 * prefers-reduced-motion se ven quietas desde el principio.
 */
export function HeroHome() {
  return (
    <section className="papel-trama relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 [&>*]:min-w-0 pb-12 pt-8 sm:px-6 sm:pt-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="relative z-10 lg:pt-6">
          <p className="inline-flex flex-wrap items-center gap-x-2 rounded-full border border-tinta/15 bg-white px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-chicha-700 sm:text-xs">
            Desde S/ 249 al mes con IGV <span aria-hidden>·</span> 0 % de comisión
          </p>
          <h1 className="mt-5 font-display text-[2.6rem] font-extrabold leading-[0.98] tracking-[-0.035em] text-tinta text-balance sm:text-6xl lg:text-[4.6rem]">
            Todo tu restaurante, del <span className="whitespace-nowrap">«hola»</span>{" "}
            <span className="relative inline-block">
              a la boleta
              <svg aria-hidden viewBox="0 0 300 18" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-3 w-full text-aji-500 sm:h-4">
                <path d="M2 12c60-8 140-11 296-4" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </span>
            .
          </h1>
          <p className="mt-5 max-w-xl text-[1.08rem] leading-relaxed text-sand-700 text-pretty sm:text-lg">
            Un asistente de WhatsApp que conversa y cobra, tu tienda web, kiosko y QR de mesa para vender. Cocina, caja,
            boletas SUNAT, inventario y reportes para operar. En un solo panel, y sin pagarle comisión a nadie.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
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
            ¿Quieres ver el panel primero?{" "}
            <Link href="/panel" className="font-semibold text-chicha-700 underline underline-offset-2">
              Recórrelo por dentro
            </Link>
          </p>
        </div>

        {/* ── Escena ── */}
        <div className="relative">
          {/* Escritorio: portátil con el panel + celular con el chat + tickets */}
          <div className="relative hidden lg:block lg:h-[36rem]">
            <MarcoPortatil className="absolute right-0 top-4 w-[36rem] xl:w-[39rem]">
              <Captura clave="panel-pedidos" sizes="640px" reemplazo={<PanelPedidos />} />
            </MarcoPortatil>
            <MarcoCelular className="absolute bottom-0 left-0 w-[16.5rem] rotate-[-3deg]">
              <ChatWhatsApp animado className="h-[30rem]" />
            </MarcoCelular>
            <TicketPago className="absolute right-[18rem] top-0 rotate-[-4deg] animate-entra [animation-delay:3.4s]" />
            <TicketComanda className="absolute right-[-1rem] top-[17rem] rotate-[3deg] animate-entra [animation-delay:4.2s]" />
            <TicketBoleta className="absolute bottom-[-1rem] right-[9rem] w-48 rotate-[-2deg] animate-entra [animation-delay:5s]" />
          </div>

          {/* Pantallas chicas y medianas: celular a lo ancho y tickets debajo */}
          <div className="lg:hidden">
            <MarcoCelular className="mx-auto w-full max-w-[19rem]">
              <ChatWhatsApp animado className="min-h-[29rem]" />
            </MarcoCelular>
            <ol
              aria-label="Lo que pasa después del chat"
              className="sin-barra -mx-4 mt-6 flex snap-x gap-3 overflow-x-auto px-4 pb-4 sm:justify-center"
            >
              <li className="snap-start">
                <TicketPago className="w-40" />
              </li>
              <li className="snap-start">
                <TicketComanda className="w-48" />
              </li>
              <li className="snap-start">
                <TicketBoleta className="w-48" />
              </li>
            </ol>
          </div>
          <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-wider text-humo lg:mt-6">
            Ejemplo con la carta de la demo · asistente desde S/ 499
          </p>
        </div>
      </div>
    </section>
  );
}
