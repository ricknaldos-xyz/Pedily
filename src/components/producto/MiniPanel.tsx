import { clsx } from "clsx";

/**
 * Mini-interfaces del panel en HTML, fieles a las pantallas reales de
 * `pedily-web/components/layout/Dashboard/**` (mismo menú, mismos nombres y
 * mismo tema oscuro), con datos de la carta de la demo
 * (`pedily-backend/config/ejemplos/carta.demo.json`). Son el reemplazo de las
 * capturas mientras LV2-C no las entregue; van siempre marcadas «Datos de
 * demostración». Decorativas para lectores de pantalla (la sección que las usa
 * describe lo que se ve).
 */

const MENU = [
  { titulo: "Operaciones", items: ["Empezar", "Panel", "Pedidos", "Cocina", "Mesas", "Conversaciones", "Cierre del día", "Conteo diario", "Reportes", "Finanzas"] },
  { titulo: "Carta", items: ["Productos", "Recetas", "Inventario", "Compras"] },
  { titulo: "Clientes", items: ["Clientes", "Promociones", "Campañas"] },
];

export function PanelShell({
  activo,
  children,
  className,
}: {
  activo: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div aria-hidden className={clsx("flex bg-[#0b0a0d] text-left text-white", className)}>
      <div className="hidden w-[9.5rem] shrink-0 border-r border-white/10 bg-[#0e0c11] px-2.5 py-3 md:block">
        <div className="mb-3 flex items-center gap-1.5 px-1.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white font-display text-[10px] font-extrabold text-tinta">RD</span>
          <span className="text-[10px] font-bold leading-tight">Restaurante Demo</span>
        </div>
        {MENU.map((g) => (
          <div key={g.titulo} className="mb-2">
            <p className="px-1.5 pb-1 text-[8px] font-semibold uppercase tracking-wider text-white/60">{g.titulo}</p>
            {g.items.map((i) => (
              <p
                key={i}
                className={clsx(
                  "rounded-md px-1.5 py-[3px] text-[10px]",
                  i === activo ? "bg-white/12 font-semibold text-white" : "text-white/75"
                )}
              >
                {i}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className="min-w-0 flex-1 p-3 sm:p-4">{children}</div>
    </div>
  );
}

function Etiqueta({ children, tono = "gris" }: { children: React.ReactNode; tono?: "gris" | "verde" | "ambar" | "rojo" | "morado" | "azul" }) {
  const t = {
    gris: "bg-white/10 text-white/80",
    verde: "bg-emerald-500/15 text-emerald-300",
    ambar: "bg-amber-400/20 text-amber-200",
    rojo: "bg-red-500/15 text-red-300",
    morado: "bg-violet-400/20 text-violet-200",
    azul: "bg-sky-400/15 text-sky-200",
  }[tono];
  return <span className={clsx("inline-block rounded px-1.5 py-[1px] text-[9px] font-semibold", t)}>{children}</span>;
}

function Caja({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx("rounded-lg border border-white/10 bg-white/[0.03] p-2.5", className)}>{children}</div>;
}

function Cifra({ valor, nombre, tono }: { valor: string; nombre: string; tono: string }) {
  return (
    <Caja className="min-w-0">
      <p className={clsx("font-mono text-base font-bold sm:text-lg", tono)}>{valor}</p>
      <p className="truncate text-[9px] text-white/70 sm:text-[10px]">{nombre}</p>
    </Caja>
  );
}

function Titulo({ children, extra }: { children: React.ReactNode; extra?: React.ReactNode }) {
  return (
    <div className="mb-2.5 flex items-center justify-between gap-2">
      <p className="text-[13px] font-bold sm:text-sm">{children}</p>
      {extra}
    </div>
  );
}

const PEDIDOS = [
  { n: "RD000146", quien: "Lucía A.", canal: "WhatsApp", plato: "Medio pollo a la brasa + Chicha jarra 1 L", total: "56,00", min: 4 },
  { n: "RD000147", quien: "Kiosko #012", canal: "Kiosko", plato: "Combo pareja · Ají de la casa, Mayonesa", total: "45,00", min: 2 },
  { n: "RD000148", quien: "Mesa 4 · Terraza", canal: "Mesa", plato: "Anticuchos de corazón ×2 · Ronda 2", total: "48,00", min: 1 },
  { n: "RD000149", quien: "Diego R.", canal: "Web", plato: "Pollo entero a la brasa · Papas familiar", total: "62,00", min: 9 },
];

export function PanelPedidos() {
  return (
    <PanelShell activo="Pedidos">
      <Titulo extra={<Etiqueta tono="verde">● En vivo</Etiqueta>}>Pedidos</Titulo>
      <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5">
        <Cifra valor="38" nombre="Hoy" tono="text-sky-300" />
        <Cifra valor="2" nombre="Pendientes" tono="text-amber-300" />
        <Cifra valor="3" nombre="En cocina" tono="text-orange-300" />
        <Cifra valor="4" nombre="Listos" tono="text-emerald-300" />
        <Cifra valor="5" nombre="En delivery" tono="text-sky-300 hidden sm:block" />
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {[
          { col: "Pendientes", p: PEDIDOS[0], tono: "ambar" as const },
          { col: "Confirmados", p: PEDIDOS[1], tono: "azul" as const },
          { col: "En cocina", p: PEDIDOS[2], tono: "morado" as const },
          { col: "Listos", p: PEDIDOS[3], tono: "verde" as const },
        ].map(({ col, p, tono }, i) => (
          <div key={col} className={clsx("rounded-lg border border-white/10 bg-white/[0.02] p-1.5", i > 1 && "hidden sm:block")}>
            <p className="mb-1.5 flex items-center justify-between text-[10px] font-semibold text-white/85">
              {col} <Etiqueta>{i + 1}</Etiqueta>
            </p>
            <div className="rounded-md bg-white/[0.06] p-1.5">
              <p className="flex flex-wrap justify-between gap-x-1.5 font-mono text-[10px] font-semibold">
                <span>#{p.n}</span> <span className="whitespace-nowrap">S/ {p.total}</span>
              </p>
              <p className="mt-0.5 truncate text-[9px] text-white/75">{p.quien}</p>
              <p className="mt-0.5 line-clamp-2 text-[9px] text-white/70">{p.plato}</p>
              <div className="mt-1 flex flex-wrap items-center gap-1 whitespace-nowrap">
                <Etiqueta tono={tono}>{p.canal}</Etiqueta>
                <Etiqueta tono="verde">{p.min} min</Etiqueta>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

export function PanelCocina() {
  const tickets = [
    { n: "RD000148", quien: "Mesa 4 · Terraza", items: ["2× Anticuchos de corazón"], nota: "Sin cebolla", min: 3, estado: "Por cocinar" },
    { n: "RD000149", quien: "Diego R. · Delivery", items: ["1× Pollo entero a la brasa", "1× Papas fritas · FAMILIAR"], cremas: "Mayonesa · Ají de la casa · Ocopa", min: 6, estado: "Por cocinar" },
    { n: "RD000146", quien: "Lucía A. · WhatsApp", items: ["1× Medio pollo a la brasa", "1× Chicha morada · JARRA 1 L"], cremas: "Mayonesa · Ají de la casa", min: 12, estado: "En cocina" },
  ];
  return (
    <PanelShell activo="Cocina">
      <div className="grid gap-2 sm:grid-cols-2">
        {["Por cocinar", "En cocina"].map((col) => (
          <div key={col} className={clsx(col === "En cocina" && "hidden sm:block")}>
            <p className="mb-1.5 text-[12px] font-bold uppercase">
              {col} ({tickets.filter((t) => t.estado === col).length})
            </p>
            <div className="space-y-1.5">
              {tickets
                .filter((t) => t.estado === col)
                .map((t) => (
                  <div key={t.n} className="rounded-lg border border-white/15 p-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-mono text-[12px] font-bold">#{t.n}</p>
                      <span
                        className={clsx(
                          "rounded-full px-1.5 py-[1px] font-mono text-[10px] font-bold",
                          t.min > 10 ? "bg-red-500/25 text-red-200" : t.min > 5 ? "bg-amber-400/25 text-amber-100" : "bg-white/10"
                        )}
                      >
                        ⏱ {t.min} min
                      </span>
                    </div>
                    <p className="text-[10px] text-white/75">{t.quien}</p>
                    {t.items.map((i) => (
                      <p key={i} className="mt-0.5 text-[11px]">
                        {i}
                      </p>
                    ))}
                    {t.cremas && <p className="text-[10px] text-amber-300">{t.cremas}</p>}
                    {t.nota && <p className="text-[10px] text-amber-300">Nota: {t.nota}</p>}
                    <p className="mt-1.5 rounded-md bg-white py-1 text-center text-[11px] font-semibold text-black">
                      {col === "Por cocinar" ? "Empezar" : "Listo"}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

export function PanelCaja() {
  const filas = [
    { m: "Yape (Culqi)", p: 14, s: "742,00", v: "742,00", ok: true },
    { m: "Tarjeta (Culqi)", p: 11, s: "689,50", v: "689,50", ok: true },
    { m: "QR (Yape/Plin)", p: 9, s: "402,00", v: "396,00", ok: false },
    { m: "Pagar en caja (kiosko)", p: 4, s: "186,00", v: "186,00", ok: true },
  ];
  return (
    <PanelShell activo="Cierre del día">
      <Titulo extra={<Etiqueta tono="ambar">● Por cerrar</Etiqueta>}>Cierre del día</Titulo>
      <Caja>
        <div className="flex items-baseline justify-between">
          <p className="text-[9px] uppercase tracking-wide text-white/70">Venta del día · 38 pedidos</p>
          <p className="font-mono text-sm font-bold">S/ 2 019,50</p>
        </div>
        <p className="mt-1 hidden text-[9px] text-white/70 sm:block">
          Venta de carta − Descuentos − Saldo canjeado = Venta neta + Delivery = Total cobrado
        </p>
      </Caja>
      <div className="mt-2 space-y-1">
        <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-2 text-[9px] text-white/60 sm:grid-cols-[1fr_auto_auto_auto]">
          <span>Medio</span>
          <span className="hidden sm:block">Sistema</span>
          <span>Proveedor</span>
          <span>Dif.</span>
        </div>
        {filas.map((f) => (
          <div key={f.m} className="grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-md border border-white/10 px-2 py-1.5 font-mono text-[10px] sm:grid-cols-[1fr_auto_auto_auto]">
            <span className="font-sans">{f.m}</span>
            <span className="hidden sm:block">S/ {f.s}</span>
            <span>S/ {f.v}</span>
            <span>{f.ok ? <Etiqueta tono="verde">Coincide</Etiqueta> : <Etiqueta tono="rojo">−6,00</Etiqueta>}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-end gap-1.5">
        <span className="rounded-md border border-white/15 px-2 py-1 text-[10px]">Exportar CSV</span>
        <span className="rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-black">Cerrar el día</span>
      </div>
    </PanelShell>
  );
}

export function PanelInventario() {
  const filas = [
    { i: "Pollo entero", s: "18 u", min: "12 u", e: "OK" },
    { i: "Papa amarilla", s: "6,5 kg", min: "10 kg", e: "Bajo mínimo" },
    { i: "Corazón de res", s: "0 kg", min: "2 kg", e: "Agotado" },
    { i: "Maíz morado", s: "4 kg", min: "2 kg", e: "OK" },
  ];
  return (
    <PanelShell activo="Inventario">
      <Titulo extra={<span className="text-[10px] text-white/75">Compras →</span>}>Inventario</Titulo>
      <div className="mb-2 grid grid-cols-3 gap-1.5">
        <Cifra valor="41" nombre="OK" tono="text-emerald-300" />
        <Cifra valor="3" nombre="Bajo mínimo" tono="text-amber-300" />
        <Cifra valor="1" nombre="Agotado" tono="text-red-300" />
      </div>
      <div className="space-y-1">
        {filas.map((f) => (
          <div key={f.i} className="grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-md border border-white/10 px-2 py-1.5 text-[10px]">
            <span>{f.i}</span>
            <span className="font-mono text-white/80">
              {f.s} <span className="hidden text-white/60 sm:inline">/ mín. {f.min}</span>
            </span>
            <Etiqueta tono={f.e === "OK" ? "verde" : f.e === "Agotado" ? "rojo" : "ambar"}>{f.e}</Etiqueta>
          </div>
        ))}
      </div>
      <Caja className="mt-2">
        <p className="text-[10px] font-semibold">Receta · Medio pollo a la brasa</p>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-[10px] text-white/80">
          <span>Costo S/ 11,90</span>
          <span>Precio S/ 34,00</span>
          <span className="text-emerald-300">Food cost 35 %</span>
        </div>
      </Caja>
    </PanelShell>
  );
}

export function PanelClientes() {
  const clientes = [
    { n: "Lucía A.", p: 14, g: "S/ 712", u: "hoy", seg: "Recurrente" },
    { n: "Diego R.", p: 1, g: "S/ 62", u: "hoy", seg: "Nuevo" },
    { n: "Carmen V.", p: 9, g: "S/ 455", u: "hace 41 días", seg: "No vuelve" },
  ];
  return (
    <PanelShell activo="Clientes">
      <Titulo>Clientes</Titulo>
      <div className="mb-2 flex gap-1 overflow-hidden">
        {["Todos", "Nuevos", "Recurrentes", "No vuelven"].map((s, i) => (
          <span key={s} className={clsx("rounded-full px-2 py-0.5 text-[10px]", i === 3 ? "bg-white text-black" : "bg-white/10")}>
            {s}
          </span>
        ))}
      </div>
      <div className="space-y-1">
        {clientes.map((c) => (
          <div key={c.n} className="grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-md border border-white/10 px-2 py-1.5 text-[10px]">
            <span>
              {c.n} <span className="text-white/60">· {c.p} pedidos</span>
            </span>
            <span className="hidden font-mono sm:inline">{c.g}</span>
            <Etiqueta tono={c.seg === "No vuelve" ? "rojo" : c.seg === "Nuevo" ? "azul" : "verde"}>{c.seg}</Etiqueta>
          </div>
        ))}
      </div>
      <Caja className="mt-2">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold">Campaña «Te extrañamos»</p>
          <Etiqueta tono="ambar">Prueba</Etiqueta>
        </div>
        <p className="mt-1 text-[10px] text-white/75">Hoy va a 12 clientes con permiso · costo estimado de Meta S/ 2,81</p>
        <p className="mt-0.5 text-[10px] text-white/75">30 días: 48 enviados · 41 leídos · 7 pedidos</p>
      </Caja>
    </PanelShell>
  );
}

const HORAS = [
  { h: "12", v: 38 },
  { h: "13", v: 72 },
  { h: "14", v: 64 },
  { h: "15", v: 22 },
  { h: "16", v: 14 },
  { h: "17", v: 20 },
  { h: "18", v: 41 },
  { h: "19", v: 88 },
  { h: "20", v: 96 },
  { h: "21", v: 52 },
];

export function PanelReportes() {
  return (
    <PanelShell activo="Reportes">
      <Titulo extra={<span className="rounded-md border border-white/15 px-1.5 py-0.5 text-[9px]">Exportar CSV</span>}>Reportes · Este mes</Titulo>
      <div className="grid grid-cols-3 gap-1.5">
        <Cifra valor="S/ 48,2 mil" nombre="Total cobrado" tono="text-white" />
        <Cifra valor="1 104" nombre="Pedidos" tono="text-white" />
        <Cifra valor="S/ 43,70" nombre="Ticket promedio" tono="text-white" />
      </div>
      <Caja className="mt-2">
        <p className="text-[10px] font-semibold">Ventas por hora</p>
        <div className="mt-1.5 flex h-16 items-end gap-1 sm:h-20">
          {HORAS.map((x) => (
            <div key={x.h} className="flex flex-1 flex-col items-center gap-0.5">
              <div className={clsx("w-full rounded-sm", x.v > 80 ? "bg-amber-300" : "bg-violet-400/70")} style={{ height: `${x.v}%` }} />
              <span className="font-mono text-[8px] text-white/70">{x.h}</span>
            </div>
          ))}
        </div>
      </Caja>
      <div className="mt-2 grid grid-cols-2 gap-1.5 text-[10px]">
        <Caja>
          <p className="font-semibold">Top platos</p>
          <p className="mt-0.5 text-white/80">1. Medio pollo a la brasa</p>
          <p className="text-white/80">2. Combo familiar</p>
        </Caja>
        <Caja>
          <p className="font-semibold">Por canal</p>
          <p className="mt-0.5 text-white/80">Web 41 % · WhatsApp 33 %</p>
          <p className="text-white/80">Kiosko 17 % · Mesa 9 %</p>
        </Caja>
      </div>
    </PanelShell>
  );
}

export function PanelAhora() {
  return (
    <PanelShell activo="Panel">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-mono text-sm font-bold">Ahora · 13:42</p>
          <p className="text-[9px] text-white/70">Hora de Lima</p>
        </div>
        <p className="text-[10px]">
          Tienda: <span className="text-emerald-300">ABIERTA hasta 22:00</span>
        </p>
      </div>
      <Caja className="mt-2">
        <div className="flex justify-between text-[10px]">
          <span>Meta del día</span>
          <span className="font-mono">S/ 1 454 de S/ 2 000 · 72 %</span>
        </div>
        <div className="mt-1 h-1.5 rounded-full bg-white/10">
          <div className="h-full w-[72%] rounded-full bg-amber-300" />
        </div>
      </Caja>
      <p className="mt-2 text-[9px] font-semibold uppercase text-white/70">Qué hay que hacer (2)</p>
      <div className="mt-1 space-y-1">
        <div className="flex items-center justify-between rounded-md border border-amber-300/30 bg-amber-300/10 px-2 py-1 text-[10px]">
          Verificar 1 pago con QR <span className="rounded bg-white px-1.5 text-[9px] font-semibold text-black">Verificar</span>
        </div>
        <div className="flex items-center justify-between rounded-md border border-red-400/30 bg-red-400/10 px-2 py-1 text-[10px]">
          Agotado: Corazón de res <span className="rounded bg-white px-1.5 text-[9px] font-semibold text-black">Ver stock</span>
        </div>
      </div>
      <Caja className="mt-2">
        <p className="font-mono text-[10px]">Cobrado S/ 1 454 (+S/ 212) · Pedidos 31 (+4) · Ticket S/ 46,90</p>
        <p className="mt-0.5 text-[9px] text-white/70">Confirmado → listo: 14 min (mediana)</p>
      </Caja>
    </PanelShell>
  );
}

export function PanelFinanzas() {
  const filas = [
    { c: "Ingresos", v: "48 210" },
    { c: "Costo de alimentos", v: "−16 390" },
    { c: "Planilla", v: "−9 800" },
    { c: "Gastos fijos", v: "−7 450" },
  ];
  return (
    <PanelShell activo="Finanzas">
      <Titulo extra={<Etiqueta>Noviembre</Etiqueta>}>Finanzas · Estado de resultados</Titulo>
      <div className="grid grid-cols-3 gap-1.5">
        <Cifra valor="34 %" nombre="Food cost" tono="text-amber-300" />
        <Cifra valor="54 %" nombre="Prime cost" tono="text-white" />
        <Cifra valor="30 %" nombre="Margen neto" tono="text-emerald-300" />
      </div>
      <div className="mt-2 space-y-1 font-mono text-[10px]">
        {filas.map((f) => (
          <div key={f.c} className="flex justify-between rounded-md border border-white/10 px-2 py-1">
            <span className="font-sans">{f.c}</span>
            <span>S/ {f.v}</span>
          </div>
        ))}
        <div className="flex justify-between rounded-md bg-white/10 px-2 py-1 font-bold">
          <span className="font-sans">Utilidad</span>
          <span>S/ 14 570</span>
        </div>
      </div>
    </PanelShell>
  );
}
