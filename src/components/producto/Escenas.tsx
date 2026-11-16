import { clsx } from "clsx";
import { Captura } from "@/components/marca/Captura";
import { MarcoCelular, MarcoKiosko, MarcoNavegador } from "@/components/marca/Marcos";
import { Corte, FilaTicket, Ticket } from "@/components/marca/Ticket";
import { Sello } from "@/components/marca/Sello";
import { Clip } from "@/components/marca/Clip";
import { CLIPS } from "@/lib/capturas";
import type { Escena } from "@/lib/soluciones";
import { ChatWhatsApp } from "./Chat";

export { ChatWhatsApp };

/**
 * Escenas de producto para el hero de cada página de solución: un marco de
 * dispositivo con la captura o el clip real del producto (LV2-C, datos de
 * «Restaurante Demo») y una o dos piezas de comanda flotando.
 */

// ── Piezas flotantes ────────────────────────────────────────────────────────
function TicketPago({ className }: { className?: string }) {
  return (
    <Ticket className={clsx("w-44", className)}>
      <p className="font-mono text-[10px] uppercase tracking-wider text-humo">Pago recibido</p>
      <FilaTicket concepto="Yape · Culqi" monto="S/ 56,00" fuerte />
      <div className="mt-2">
        <Sello tono="pagado" giro={-6}>
          Pagado
        </Sello>
      </div>
    </Ticket>
  );
}

function TicketComanda({ className, numero = "1043" }: { className?: string; numero?: string }) {
  return (
    <Ticket className={clsx("w-48", className)}>
      <p className="font-mono text-[10px] uppercase tracking-wider text-humo">Comanda #{numero}</p>
      <p className="mt-1 font-mono text-[12px] font-bold">1× Medio pollo a la brasa</p>
      <p className="font-mono text-[11px] text-humo">Mayonesa · Ají de la casa</p>
      <p className="font-mono text-[12px] font-bold">1× Chicha morada 1 L</p>
      <div className="mt-2">
        <Sello tono="cocina" giro={5}>
          En cocina
        </Sello>
      </div>
    </Ticket>
  );
}

function TicketBoleta({ className }: { className?: string }) {
  return (
    <Ticket className={clsx("w-52", className)}>
      <p className="text-center font-mono text-[10px] font-bold uppercase tracking-wider">Boleta electrónica</p>
      <p className="text-center font-mono text-[11px]">B001-000381</p>
      <Corte />
      <FilaTicket concepto="Medio pollo" monto="34,00" />
      <FilaTicket concepto="Chicha 1 L" monto="14,00" />
      <FilaTicket concepto="Delivery" monto="8,00" />
      <Corte />
      <FilaTicket concepto="TOTAL S/" monto="56,00" fuerte />
      <div className="mt-2 text-center">
        <Sello tono="boleta" giro={-4}>
          SUNAT ✓
        </Sello>
      </div>
    </Ticket>
  );
}

function Demo({ children, oscuro = false }: { children: React.ReactNode; oscuro?: boolean }) {
  return (
    <p className={clsx("mt-3 text-center font-mono text-[10px] uppercase tracking-wider", oscuro ? "text-chicha-100" : "text-humo")}>
      {children}
    </p>
  );
}

/** Escena principal de una página de solución. */
export function EscenaSolucion({ escena }: { escena: Escena }) {
  const P = "(max-width: 1024px) 92vw, 640px";
  switch (escena) {
    case "chat":
      return (
        <figure className="relative mx-auto w-full max-w-[19rem]">
          <MarcoCelular>
            <Clip clave="whatsapp" />
          </MarcoCelular>
          <TicketComanda className="absolute -right-10 bottom-16 hidden rotate-2 lg:block" />
          <figcaption>
            <Demo>{CLIPS.whatsapp.nota}</Demo>
          </figcaption>
        </figure>
      );
    case "tienda":
      return (
        <figure className="relative mx-auto w-full max-w-[17rem]">
          <MarcoCelular>
            <Captura clave="tienda-carta" sizes="(max-width: 640px) 70vw, 280px" prioridad />
          </MarcoCelular>
          <TicketPago className="absolute -left-14 bottom-10 hidden -rotate-3 lg:block" />
          <figcaption>
            <Demo>Tienda de la demo, en un celular</Demo>
          </figcaption>
        </figure>
      );
    case "kiosko":
      return (
        <figure className="relative mx-auto w-full max-w-[20rem]">
          <MarcoKiosko>
            <Clip clave="kiosko" />
          </MarcoKiosko>
          <TicketComanda numero="K-012" className="absolute -right-12 top-10 hidden rotate-3 lg:block" />
          <figcaption>
            <Demo>{CLIPS.kiosko.nota}</Demo>
          </figcaption>
        </figure>
      );
    case "mesa":
      return (
        <figure className="relative mx-auto w-full max-w-[18rem]">
          <MarcoCelular>
            <Clip clave="mesa" />
          </MarcoCelular>
          <div className="absolute -right-8 top-16 hidden lg:block">
            <Sello tono="cocina" giro={8}>
              Ronda 2 · En cocina
            </Sello>
          </div>
          <figcaption>
            <Demo>{CLIPS.mesa.nota}</Demo>
          </figcaption>
        </figure>
      );
    case "programados":
      return (
        <figure className="relative mx-auto w-full max-w-[17rem]">
          <MarcoCelular>
            <Captura clave="tienda-programar" sizes="(max-width: 640px) 70vw, 280px" prioridad />
          </MarcoCelular>
          <div className="absolute -left-10 bottom-24 hidden lg:block">
            <Sello tono="programado" giro={-7}>
              Martes · 12:00
            </Sello>
          </div>
          <figcaption>
            <Demo>Tienda de la demo · datos de demostración</Demo>
          </figcaption>
        </figure>
      );
    case "boleta":
      return (
        <figure className="relative mx-auto w-full max-w-[17rem]">
          <MarcoKiosko>
            <Captura clave="kiosko-comprobante" sizes="(max-width: 640px) 70vw, 280px" prioridad />
          </MarcoKiosko>
          <TicketBoleta className="absolute -right-16 bottom-20 hidden w-48 rotate-3 lg:block" />
          <figcaption>
            <Demo>Kiosko de la demo: boleta o factura</Demo>
          </figcaption>
        </figure>
      );
    case "delivery":
      return (
        <PanelFigura url="mirestaurante · panel/codigos-postales" captura={<Captura clave="panel-zonas" sizes={P} prioridad />}>
          <Sello tono="camino" giro={-6}>
            En camino
          </Sello>
        </PanelFigura>
      );
    case "cocina":
      return (
        <PanelFigura url="mirestaurante · panel/cocina" captura={<Clip clave="cocina" />} nota={CLIPS.cocina.nota}>
          <Sello tono="listo" giro={-6}>
            Listo
          </Sello>
        </PanelFigura>
      );
    case "caja":
      return (
        <figure className="relative mx-auto w-full max-w-[17rem]">
          <MarcoCelular>
            <Captura clave="tienda-pago" sizes="(max-width: 640px) 70vw, 280px" prioridad />
          </MarcoCelular>
          <TicketPago className="absolute -right-14 bottom-24 hidden rotate-3 lg:block" />
          <figcaption>
            <Demo>Pago en la tienda de la demo</Demo>
          </figcaption>
        </figure>
      );
    case "inventario":
      return (
        <PanelFigura url="mirestaurante · panel/inventario" captura={<Captura clave="panel-inventario" sizes={P} prioridad />}>
          <Sello tono="agotado" giro={6}>
            Agotado
          </Sello>
        </PanelFigura>
      );
    case "clientes":
      return (
        <PanelFigura url="mirestaurante · panel/clientes" captura={<Captura clave="panel-cliente-ficha" sizes={P} prioridad />}>
          <Sello tono="pagado" giro={-5}>
            Volvió a pedir
          </Sello>
        </PanelFigura>
      );
    case "reportes":
      return (
        <PanelFigura url="mirestaurante · panel/reportes" captura={<Captura clave="panel-reportes" sizes={P} prioridad />}>
          <Sello tono="boleta" giro={-4}>
            CSV para tu contador
          </Sello>
        </PanelFigura>
      );
  }
}

function PanelFigura({
  url,
  captura,
  children,
  nota = "Panel real con datos de demostración",
}: {
  url: string;
  captura: React.ReactNode;
  children?: React.ReactNode;
  nota?: string;
}) {
  return (
    <figure className="relative w-full">
      <MarcoNavegador url={url} oscuro>
        {captura}
      </MarcoNavegador>
      {children && <div className="absolute -top-4 right-4 sm:-right-3">{children}</div>}
      <figcaption>
        <Demo>{nota}</Demo>
      </figcaption>
    </figure>
  );
}

export { TicketBoleta, TicketComanda, TicketPago };
