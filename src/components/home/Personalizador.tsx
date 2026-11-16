"use client";

import { useEffect, useId, useState } from "react";
import { clsx } from "clsx";
import { ImagePlus, Lock, ShoppingBag } from "lucide-react";
import { Encabezado } from "@/components/ui/Encabezado";
import { MarcoCelular } from "@/components/marca/Marcos";
import { ChatWhatsApp } from "@/components/producto/Chat";

/**
 * «Ve tu tienda con tu marca» (benchmark §5.3 n.º 8, patrón D11 mejorado):
 * nombre, color y logo → la tienda web y el saludo del asistente cambian al
 * instante. Todo ocurre en el navegador: el logo se lee con un enlace local
 * (URL.createObjectURL) y no se sube a ningún servidor.
 *
 * Los platos y precios son los de la carta de la demo
 * (pedily-backend/config/ejemplos/carta.demo.json). La marca propia en
 * tienda, mini-app, kiosko y mesa existe (inventario 16.1); el saludo del
 * asistente se edita en «Mensajes» del panel (inventario 16.4).
 */

const COLORES = [
  { nombre: "Chicha", hex: "#5B2A86" },
  { nombre: "Rocoto", hex: "#B4232A" },
  { nombre: "Brasa", hex: "#D9541E" },
  { nombre: "Hierbabuena", hex: "#147A52" },
  { nombre: "Mar", hex: "#0E5A8A" },
  { nombre: "Carbón", hex: "#2A2A2A" },
];

const PLATOS = [
  { n: "Medio pollo a la brasa", d: "Con papas fritas y ensalada. 2 cremas incluidas.", p: "S/ 34" },
  { n: "Combo familiar", d: "Pollo entero, papas familiares, ensalada y bebida.", p: "S/ 79" },
  { n: "Chicha morada", d: "Vaso o jarra de 1 L.", p: "desde S/ 5" },
];

function textoSobre(hex: string): string {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const l = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return l > 0.4 ? "#24102E" : "#FFFFFF";
}

function iniciales(nombre: string): string {
  return (
    nombre
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? "")
      .join("") || "TR"
  );
}

function VistaTienda({ nombre, color, logo }: { nombre: string; color: string; logo: string | null }) {
  const sobre = textoSobre(color);
  return (
    <div className="min-h-[30rem] bg-[#f7f7f8] pt-6 text-left text-[#1a1a1a]">
      <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: color, color: sobre }}>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/90 text-[11px] font-bold" style={{ color }}>
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="" className="h-full w-full object-cover" />
          ) : (
            iniciales(nombre)
          )}
        </span>
        <span className="min-w-0 flex-1 truncate text-[13px] font-bold">{nombre || "Tu restaurante"}</span>
        <ShoppingBag aria-hidden className="h-4 w-4" />
      </div>
      <div className="mx-3 mt-3 rounded-xl p-3" style={{ background: `${color}14` }}>
        <p className="text-[15px] font-extrabold leading-tight">Pide online, sin comisión</p>
        <p className="mt-0.5 text-[11px] text-[#555]">Delivery o recojo · Yape y tarjeta</p>
      </div>
      <div className="mt-3 flex gap-1.5 overflow-hidden px-3 text-[11px] font-semibold">
        {["Pollos a la brasa", "Combos", "Bebidas"].map((c, i) => (
          <span
            key={c}
            className="shrink-0 rounded-full px-2.5 py-1"
            style={i === 0 ? { background: color, color: sobre } : { background: "#fff", border: "1px solid #e5e5e5" }}
          >
            {c}
          </span>
        ))}
      </div>
      <ul className="mt-3 space-y-2 px-3">
        {PLATOS.map((p) => (
          <li key={p.n} className="flex gap-2.5 rounded-xl bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
            <span aria-hidden className="h-14 w-14 shrink-0 rounded-lg bg-[radial-gradient(circle_at_35%_35%,#f3c27a,#b8642a)]" />
            <span className="min-w-0 flex-1">
              <span className="block text-[12.5px] font-bold leading-tight">{p.n}</span>
              <span className="block text-[10.5px] leading-snug text-[#666]">{p.d}</span>
              <span className="mt-1 flex items-center justify-between">
                <span className="font-mono text-[12px] font-bold">{p.p}</span>
                <span className="rounded-md px-2 py-0.5 text-[10.5px] font-bold" style={{ background: color, color: sobre }}>
                  Agregar
                </span>
              </span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mx-3 mb-3 mt-3 rounded-xl py-2.5 text-center text-[12px] font-bold" style={{ background: color, color: sobre }}>
        Ver carrito · S/ 34
      </div>
    </div>
  );
}

export function Personalizador() {
  const [nombre, setNombre] = useState("Pollería La Esquina");
  const [color, setColor] = useState(COLORES[1].hex);
  const [logo, setLogo] = useState<string | null>(null);
  const [vista, setVista] = useState<"tienda" | "whatsapp">("tienda");
  const idNombre = useId();
  const idLogo = useId();
  const idColor = useId();

  useEffect(() => {
    return () => {
      if (logo) URL.revokeObjectURL(logo);
    };
  }, [logo]);

  const nombreVisible = nombre.trim() || "Tu restaurante";
  const saludo = [
    {
      de: "bot" as const,
      texto: `¡Hola! 👋 Soy el asistente de pedidos de ${nombreVisible}. ¿Qué se te antoja hoy? Te muestro la carta o te tomo el pedido aquí mismo.`,
      hora: "19:30",
      boton: "Ver la carta",
    },
    { de: "cliente" as const, texto: "un medio pollo para recoger", hora: "19:31" },
    {
      de: "bot" as const,
      texto: "¡Va! El medio pollo trae 2 cremas. ¿Cuáles te pongo: mayonesa, kétchup, mostaza, ají de la casa u ocopa?",
      hora: "19:31",
    },
  ];

  return (
    <section id="tu-marca" className="scroll-mt-16 bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <Encabezado
            etiqueta="Pruébalo con tu marca"
            titulo="Ve tu tienda con tu nombre y tus colores, ahora mismo"
            bajada="Escribe el nombre de tu restaurante, elige un color y, si quieres, sube tu logo. Tu tienda y el saludo de tu asistente cambian al instante."
          />
          <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor={idNombre} className="block text-sm font-semibold text-tinta">
                Nombre de tu restaurante
              </label>
              <input
                id={idNombre}
                value={nombre}
                maxLength={40}
                onChange={(e) => setNombre(e.target.value)}
                className="mt-1.5 block min-h-12 w-full rounded-xl border-2 border-tinta/15 bg-white px-4 text-base text-tinta outline-none focus:border-chicha-500"
              />
            </div>
            <fieldset>
              <legend className="text-sm font-semibold text-tinta">Color de tu marca</legend>
              <div className="mt-2 flex flex-wrap items-center gap-2.5">
                {COLORES.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => setColor(c.hex)}
                    aria-pressed={color.toLowerCase() === c.hex.toLowerCase()}
                    aria-label={c.nombre}
                    className={clsx(
                      "h-11 w-11 rounded-full border-[3px] transition-transform hover:scale-105",
                      color.toLowerCase() === c.hex.toLowerCase() ? "border-tinta ring-2 ring-aji-500 ring-offset-2" : "border-white shadow-card"
                    )}
                    style={{ background: c.hex }}
                  />
                ))}
                <label htmlFor={idColor} className="flex min-h-11 cursor-pointer items-center gap-2 rounded-full border-2 border-tinta/15 px-3 text-sm font-semibold text-sand-700">
                  Otro
                  <input id={idColor} type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-6 w-6 cursor-pointer border-0 bg-transparent p-0" />
                </label>
              </div>
            </fieldset>
            <div>
              <label
                htmlFor={idLogo}
                className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-tinta/25 px-4 py-3 text-sm font-semibold text-tinta hover:border-tinta/50"
              >
                <ImagePlus aria-hidden className="h-5 w-5 text-chicha-600" />
                {logo ? "Cambiar logo" : "Subir tu logo (opcional)"}
              </label>
              <input
                id={idLogo}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  setLogo(URL.createObjectURL(f));
                }}
              />
              <p className="mt-2 flex items-center gap-1.5 text-xs text-humo">
                <Lock aria-hidden className="h-3.5 w-3.5" /> Todo pasa en tu navegador: tu logo no se sube a ningún lado.
              </p>
            </div>
          </form>
          <a
            href="/contacto"
            className="mt-8 inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border-2 border-tinta bg-aji-500 px-6 font-semibold text-tinta shadow-[0_4px_0_0_#24102e] transition-transform hover:-translate-y-0.5"
          >
            Quiero mi tienda así
          </a>
        </div>

        <div>
          <div role="group" aria-label="Vista previa" className="mx-auto mb-5 flex w-fit rounded-full border-2 border-tinta/10 bg-papel p-1 sm:hidden">
            {(["tienda", "whatsapp"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={vista === v}
                onClick={() => setVista(v)}
                className={clsx("min-h-10 rounded-full px-4 text-sm font-semibold", vista === v ? "bg-tinta text-white" : "text-sand-700")}
              >
                {v === "tienda" ? "Tu tienda web" : "Tu WhatsApp"}
              </button>
            ))}
          </div>
          <div className="grid items-start gap-6 sm:grid-cols-2" aria-live="polite">
            <figure className={clsx(vista !== "tienda" && "hidden sm:block")}>
              <MarcoCelular className="mx-auto w-full max-w-[17.5rem]">
                <VistaTienda nombre={nombreVisible} color={color} logo={logo} />
              </MarcoCelular>
              <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-wider text-humo">Tu tienda web</figcaption>
            </figure>
            <figure className={clsx("sm:mt-14", vista !== "whatsapp" && "hidden sm:block")}>
              <MarcoCelular className="mx-auto w-full max-w-[17.5rem]">
                <ChatWhatsApp nombre={nombreVisible} iniciales={iniciales(nombreVisible)} logo={logo} mensajes={saludo} className="min-h-[30rem]" />
              </MarcoCelular>
              <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-wider text-humo">El saludo de tu asistente</figcaption>
            </figure>
          </div>
          <p className="mt-4 text-center text-xs text-humo">Vista previa de ejemplo con la carta de la demo.</p>
        </div>
      </div>
    </section>
  );
}
