import { clsx } from "clsx";
import { Captura } from "@/components/marca/Captura";
import { MarcoCelular, MarcoKiosko, MarcoNavegador } from "@/components/marca/Marcos";
import { Corte, FilaTicket, Ticket } from "@/components/marca/Ticket";
import { Sello } from "@/components/marca/Sello";
import {
  PanelCaja,
  PanelClientes,
  PanelCocina,
  PanelInventario,
  PanelReportes,
} from "./MiniPanel";
import type { Escena } from "@/lib/soluciones";
import { ChatWhatsApp } from "./Chat";

export { ChatWhatsApp };

/**
 * Escenas de producto para el hero de cada página de solución: un marco de
 * dispositivo con la captura real (o su mini-interfaz con datos de la demo) y
 * una o dos piezas de comanda flotando. Todo es HTML visible sin JS.
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

// ── Mini-interfaces del lado del cliente ────────────────────────────────────
function MesaMini() {
  return (
    <div aria-hidden className="bg-white px-3 pb-4 pt-8 text-left text-tinta">
      <p className="font-mono text-[10px] uppercase tracking-wider text-humo">Mesa 4 · Terraza</p>
      <p className="font-display text-lg font-extrabold">Tu cuenta</p>
      <div className="mt-2 space-y-1 font-mono text-[11px]">
        <FilaTicket concepto="Ronda 1 · Pollo entero" monto="62,00" />
        <FilaTicket concepto="Ronda 1 · Chicha 1 L" monto="14,00" />
        <FilaTicket concepto="Ronda 2 · Anticuchos ×2" monto="48,00" />
      </div>
      <Corte />
      <div className="grid grid-cols-3 gap-1 text-center font-mono text-[11px]">
        <div className="rounded-lg bg-sand-100 p-1.5">
          <p className="text-[9px] text-humo">Total</p>
          <p className="font-bold">124,00</p>
        </div>
        <div className="rounded-lg bg-hierba-50 p-1.5">
          <p className="text-[9px] text-humo">Pagado</p>
          <p className="font-bold text-hierba-700">62,00</p>
        </div>
        <div className="rounded-lg bg-aji-100 p-1.5">
          <p className="text-[9px] text-humo">Falta</p>
          <p className="font-bold">62,00</p>
        </div>
      </div>
      <p className="mt-3 text-[11px] font-semibold">¿Cómo pagan?</p>
      <div className="mt-1 grid grid-cols-3 gap-1 text-[10px] font-semibold">
        <span className="rounded-lg border border-tinta/15 py-1.5 text-center">Todo</span>
        <span className="rounded-lg border-2 border-tinta bg-aji-500 py-1.5 text-center">Partes iguales</span>
        <span className="rounded-lg border border-tinta/15 py-1.5 text-center">Mis platos</span>
      </div>
      <p className="mt-2 text-[10px] text-humo">Propina opcional: 5 % · 10 % · 15 %</p>
      <div className="mt-3 grid grid-cols-2 gap-1 text-[10px] font-semibold">
        <span className="rounded-lg bg-sand-100 py-1.5 text-center">🙋 Llamar al mozo</span>
        <span className="rounded-lg bg-sand-100 py-1.5 text-center">🧾 Pedir la cuenta</span>
      </div>
    </div>
  );
}

function ProgramarMini() {
  const franjas = [
    { h: "12:00 – 12:30", estado: "lleno" },
    { h: "12:30 – 13:00", estado: "libre" },
    { h: "13:00 – 13:30", estado: "elegido" },
    { h: "13:30 – 14:00", estado: "libre" },
  ];
  return (
    <div aria-hidden className="bg-white px-3 pb-4 pt-8 text-left text-tinta">
      <p className="font-display text-lg font-extrabold">¿Para cuándo?</p>
      <div className="mt-2 grid grid-cols-2 gap-1 text-[11px] font-semibold">
        <span className="rounded-lg border border-tinta/15 py-2 text-center">Lo antes posible</span>
        <span className="rounded-lg border-2 border-tinta bg-aji-500 py-2 text-center">Programar</span>
      </div>
      <div className="mt-3 flex gap-1 text-[10px]">
        {["Hoy", "Mañana", "Sáb 21"].map((d, i) => (
          <span key={d} className={clsx("rounded-full px-2.5 py-1", i === 1 ? "bg-tinta text-white" : "bg-sand-100")}>
            {d}
          </span>
        ))}
      </div>
      <div className="mt-2 space-y-1">
        {franjas.map((f) => (
          <div
            key={f.h}
            className={clsx(
              "flex items-center justify-between rounded-lg border px-2.5 py-1.5 font-mono text-[11px]",
              f.estado === "lleno" && "border-tinta/10 text-humo line-through",
              f.estado === "elegido" && "border-2 border-chicha-600 bg-chicha-50 font-bold",
              f.estado === "libre" && "border-tinta/15"
            )}
          >
            {f.h}
            <span className="font-sans text-[10px] no-underline">{f.estado === "lleno" ? "Lleno" : f.estado === "elegido" ? "✓" : ""}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 rounded-lg bg-tinta py-2 text-center text-[11px] font-semibold text-white">Pagar S/ 79,00</p>
    </div>
  );
}

function ZonasMini() {
  const zonas = [
    { z: "Jesús María", t: "S/ 8,00", m: "45 min" },
    { z: "Lince", t: "S/ 7,00", m: "40 min" },
    { z: "Pueblo Libre", t: "S/ 9,00", m: "50 min" },
    { z: "San Isidro", t: "S/ 10,00", m: "55 min" },
  ];
  return (
    <div aria-hidden className="bg-[#0b0a0d] p-3 text-left text-white sm:p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-bold">Zonas de reparto</p>
        <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-black">+ Agregar zona</span>
      </div>
      <div className="mb-2 grid grid-cols-3 gap-1.5 text-center">
        {[
          ["4", "Zonas activas"],
          ["S/ 7,00", "Envío mínimo"],
          ["S/ 10,00", "Envío máximo"],
        ].map(([v, n]) => (
          <div key={n} className="rounded-lg border border-white/10 p-1.5">
            <p className="font-mono text-sm font-bold">{v}</p>
            <p className="text-[9px] text-white/70">{n}</p>
          </div>
        ))}
      </div>
      <div className="space-y-1">
        {zonas.map((z) => (
          <div key={z.z} className="grid grid-cols-[1fr_auto_auto] gap-3 rounded-md border border-white/10 px-2 py-1.5 text-[11px]">
            <span>{z.z}</span>
            <span className="font-mono">{z.t}</span>
            <span className="font-mono text-white/75">{z.m}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 rounded-md border border-sky-300/30 bg-sky-300/10 px-2 py-1.5 text-[10px] text-sky-100">
        #RD000149 · Motorizado de PedidosYa Envíos solicitado
      </p>
    </div>
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
  switch (escena) {
    case "chat":
      return (
        <figure className="relative mx-auto w-full max-w-[19rem]">
          <MarcoCelular>
            <Captura clave="wa-chat" sizes="300px" reemplazo={<ChatWhatsApp className="min-h-[30rem]" />} />
          </MarcoCelular>
          <TicketComanda className="absolute -right-10 bottom-16 hidden rotate-2 lg:block" />
          <figcaption>
            <Demo>Ejemplo con la carta de la demo</Demo>
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
            <Demo>Tienda de ejemplo, a 390 px</Demo>
          </figcaption>
        </figure>
      );
    case "kiosko":
      return (
        <figure className="relative mx-auto w-full max-w-[22rem]">
          <MarcoKiosko>
            <Captura clave="kiosko-carta" sizes="(max-width: 640px) 80vw, 360px" prioridad />
          </MarcoKiosko>
          <TicketComanda numero="K-012" className="absolute -right-12 top-10 hidden rotate-3 lg:block" />
          <figcaption>
            <Demo>Kiosko de ejemplo</Demo>
          </figcaption>
        </figure>
      );
    case "mesa":
      return (
        <figure className="relative mx-auto w-full max-w-[18rem]">
          <MarcoCelular>
            <Captura clave="mesa-cuenta" sizes="300px" reemplazo={<MesaMini />} />
          </MarcoCelular>
          <div className="absolute -right-8 top-16 hidden lg:block">
            <Sello tono="cocina" giro={8}>
              Ronda 2 · En cocina
            </Sello>
          </div>
          <figcaption>
            <Demo>Datos de demostración</Demo>
          </figcaption>
        </figure>
      );
    case "programados":
      return (
        <figure className="relative mx-auto w-full max-w-[18rem]">
          <MarcoCelular>
            <Captura clave="tienda-programar" sizes="300px" reemplazo={<ProgramarMini />} />
          </MarcoCelular>
          <div className="absolute -left-10 bottom-24 hidden lg:block">
            <Sello tono="programado" giro={-7}>
              Mañana · 13:00
            </Sello>
          </div>
          <figcaption>
            <Demo>Datos de demostración</Demo>
          </figcaption>
        </figure>
      );
    case "boleta":
      return (
        <figure className="relative mx-auto flex w-full max-w-sm justify-center py-4">
          <TicketBoleta className="w-64 rotate-[-2deg]" />
          <TicketPago className="absolute -right-2 bottom-0 rotate-3 sm:-right-6" />
          <figcaption className="sr-only">Ejemplo de boleta con datos de la demo</figcaption>
        </figure>
      );
    case "delivery":
      return (
        <PanelFigura url="mirestaurante · panel/codigos-postales" captura={<Captura clave="panel-zonas" sizes="(max-width: 1024px) 92vw, 640px" reemplazo={<ZonasMini />} />}>
          <Sello tono="camino" giro={-6}>
            En camino · 45 min
          </Sello>
        </PanelFigura>
      );
    case "cocina":
      return (
        <PanelFigura url="mirestaurante · panel/cocina" captura={<Captura clave="panel-cocina" sizes="(max-width: 1024px) 92vw, 640px" reemplazo={<PanelCocina />} />}>
          <Sello tono="listo" giro={-6}>
            Listo
          </Sello>
        </PanelFigura>
      );
    case "caja":
      return (
        <PanelFigura url="mirestaurante · panel/caja" captura={<Captura clave="panel-caja" sizes="(max-width: 1024px) 92vw, 640px" reemplazo={<PanelCaja />} />}>
          <Sello tono="pagado" giro={-5}>
            Coincide
          </Sello>
        </PanelFigura>
      );
    case "inventario":
      return (
        <PanelFigura url="mirestaurante · panel/inventario" captura={<Captura clave="panel-inventario" sizes="(max-width: 1024px) 92vw, 640px" reemplazo={<PanelInventario />} />}>
          <Sello tono="agotado" giro={6}>
            Agotado
          </Sello>
        </PanelFigura>
      );
    case "clientes":
      return (
        <PanelFigura url="mirestaurante · panel/clientes" captura={<Captura clave="panel-clientes" sizes="(max-width: 1024px) 92vw, 640px" reemplazo={<PanelClientes />} />}>
          <Sello tono="pagado" giro={-5}>
            Volvió a pedir
          </Sello>
        </PanelFigura>
      );
    case "reportes":
      return (
        <PanelFigura url="mirestaurante · panel/reportes" captura={<Captura clave="panel-reportes" sizes="(max-width: 1024px) 92vw, 640px" reemplazo={<PanelReportes />} />}>
          <Sello tono="boleta" giro={-4}>
            CSV para tu contador
          </Sello>
        </PanelFigura>
      );
  }
}

function PanelFigura({ url, captura, children }: { url: string; captura: React.ReactNode; children?: React.ReactNode }) {
  return (
    <figure className="relative w-full">
      <MarcoNavegador url={url} oscuro>
        {captura}
      </MarcoNavegador>
      {children && <div className="absolute -bottom-4 right-4 sm:-right-3">{children}</div>}
      <figcaption>
        <Demo>Panel con datos de demostración</Demo>
      </figcaption>
    </figure>
  );
}

export { TicketBoleta, TicketComanda, TicketPago };
