"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { ArrowRight, ChevronDown, LayoutDashboard, Menu, PlayCircle, X } from "lucide-react";
import { Logo } from "@/components/marca/Logo";
import { IconoSolucion } from "@/components/marca/IconoSolucion";
import { GRUPOS, RUTA_SOLUCION, solucionesDe } from "@/lib/soluciones";
import { TINTE_GRUPO } from "@/lib/tintes";
import { HERRAMIENTAS } from "@/lib/herramientas";


const ENLACES = [
  { href: "/panel", label: "Panel" },
  { href: "/precios", label: "Precios" },
  { href: "/demo", label: "Demo" },
];

export function Header() {
  const [mega, setMega] = useState(false);
  const [movil, setMovil] = useState(false);
  const [conSombra, setConSombra] = useState(false);
  const pathname = usePathname();
  const disparador = useRef<HTMLButtonElement>(null);
  const panelMega = useRef<HTMLDivElement>(null);
  const cerrarTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Momento en que el ratón abrió el menú: el clic que llega justo después
  // (mismo gesto) no debe cerrarlo.
  const abiertoPorHover = useRef(0);

  // Cerrar menús al navegar.
  useEffect(() => {
    setMega(false);
    setMovil(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setConSombra(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquear el scroll del fondo con el menú móvil abierto.
  useEffect(() => {
    document.documentElement.style.overflow = movil ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [movil]);

  const cerrarTodo = useCallback(() => {
    setMega(false);
    setMovil(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (mega) disparador.current?.focus();
        cerrarTodo();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!mega) return;
      const t = e.target as Node;
      if (!panelMega.current?.contains(t) && !disparador.current?.contains(t)) setMega(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [mega, cerrarTodo]);

  const abrirConHover = () => {
    if (cerrarTimer.current) clearTimeout(cerrarTimer.current);
    if (!mega) abiertoPorHover.current = Date.now();
    setMega(true);
  };
  const cerrarConHover = () => {
    cerrarTimer.current = setTimeout(() => setMega(false), 160);
  };

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 border-b bg-papel transition-shadow",
        conSombra || mega ? "border-tinta/10 shadow-[0_8px_24px_-18px_rgba(36,16,46,0.5)]" : "border-transparent"
      )}
    >
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-tinta focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Pedily, inicio" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          <div onMouseEnter={abrirConHover} onMouseLeave={cerrarConHover}>
            <button
              ref={disparador}
              type="button"
              aria-expanded={mega}
              aria-controls="menu-producto"
              onClick={() => {
                if (Date.now() - abiertoPorHover.current < 600) return setMega(true);
                setMega((v) => !v);
              }}
              className={clsx(
                "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[0.95rem] font-semibold transition-colors",
                mega ? "bg-tinta/5 text-tinta" : "text-sand-700 hover:text-tinta"
              )}
            >
              Producto
              <ChevronDown aria-hidden className={clsx("h-4 w-4 transition-transform", mega && "rotate-180")} />
            </button>
          </div>
          {ENLACES.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
              className={clsx(
                "rounded-lg px-3 py-2 text-[0.95rem] font-semibold transition-colors",
                pathname === l.href ? "text-tinta underline decoration-aji-500 decoration-[3px] underline-offset-8" : "text-sand-700 hover:text-tinta"
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/herramientas" className="rounded-lg px-3 py-2 text-[0.95rem] font-semibold text-sand-700 hover:text-tinta">
            Herramientas
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contacto"
            className="hidden min-h-11 items-center gap-2 rounded-xl border-2 border-tinta bg-aji-500 px-5 text-[0.95rem] font-semibold text-tinta shadow-[0_3px_0_0_#24102e] transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Crear mi tienda
          </Link>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-tinta hover:bg-tinta/5 lg:hidden"
            aria-expanded={movil}
            aria-controls="menu-movil"
            onClick={() => setMovil((v) => !v)}
          >
            {movil ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
            {movil ? "Cerrar" : "Menú"}
          </button>
        </div>
      </div>

      {/* ── Menú grande (escritorio) ── */}
      <div
        id="menu-producto"
        ref={panelMega}
        hidden={!mega}
        onMouseEnter={abrirConHover}
        onMouseLeave={cerrarConHover}
        className="absolute inset-x-0 top-full hidden border-b border-tinta/10 bg-papel shadow-elevated lg:block"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_1fr_1fr_17rem] gap-6 px-8 py-7">
          {GRUPOS.map((g) => (
            <div key={g.id}>
              <p className={clsx("font-mono text-[11px] font-bold uppercase tracking-[0.14em]", TINTE_GRUPO[g.id].texto)}>{g.nombre}</p>
              <p className="mt-0.5 text-xs text-humo">{g.bajada}</p>
              <ul className="mt-3 space-y-1">
                {solucionesDe(g.id).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={RUTA_SOLUCION(s.slug)}
                      className="group flex gap-3 rounded-xl p-2.5 transition-colors hover:bg-white"
                    >
                      <span className={clsx("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", TINTE_GRUPO[g.id].fondo, TINTE_GRUPO[g.id].texto)}>
                        <IconoSolucion icono={s.icono} className="h-[18px] w-[18px]" />
                      </span>
                      <span>
                        <span className="block text-[0.93rem] font-semibold text-tinta group-hover:underline">{s.nombre}</span>
                        <span className="block text-[0.8rem] leading-snug text-humo">{s.linea}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex flex-col gap-3">
            <Link href="/panel" className="group rounded-2xl bg-tinta p-5 text-white">
              <LayoutDashboard aria-hidden className="h-6 w-6 text-aji-400" />
              <p className="mt-3 font-display text-xl font-extrabold leading-tight">El panel, por dentro</p>
              <p className="mt-1 text-sm text-chicha-100">48 pantallas para operar todo tu restaurante.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-aji-400">
                Recorrerlo <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link href="/demo" className="flex items-center gap-2 rounded-xl border border-tinta/10 bg-white p-3 text-sm font-semibold text-tinta hover:border-tinta/30">
              <PlayCircle aria-hidden className="h-5 w-5 text-chicha-600" /> Prueba las demos
            </Link>
          </div>
        </div>
        <div className="border-t border-dashed border-tinta/15">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-1 px-8 py-3 text-sm">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-humo">Herramientas gratis</span>
            {HERRAMIENTAS.map((h) => (
              <Link key={h.slug} href={`/herramientas/${h.slug}`} className="text-sand-700 hover:text-tinta hover:underline">
                {h.titulo}
              </Link>
            ))}
            <Link href="/soluciones" className="ml-auto font-semibold text-chicha-700 hover:underline">
              Ver todas las soluciones →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Menú móvil ── */}
      <div
        id="menu-movil"
        hidden={!movil}
        className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col bg-papel lg:hidden"
      >
        <nav aria-label="Menú móvil" className="flex-1 overflow-y-auto px-4 pb-6 pt-2">
          {GRUPOS.map((g, i) => (
            <details key={g.id} open={i === 0} className="group border-b border-dashed border-tinta/15 py-1">
              <summary className="flex min-h-14 cursor-pointer items-center justify-between">
                <span>
                  <span className={clsx("block font-mono text-[11px] font-bold uppercase tracking-[0.14em]", TINTE_GRUPO[g.id].texto)}>{g.nombre}</span>
                  <span className="block text-sm text-humo">{g.bajada}</span>
                </span>
                <ChevronDown aria-hidden className="h-5 w-5 text-humo transition-transform group-open:rotate-180" />
              </summary>
              <ul className="pb-3">
                {solucionesDe(g.id).map((s) => (
                  <li key={s.slug}>
                    <Link href={RUTA_SOLUCION(s.slug)} className="flex min-h-12 items-center gap-3 rounded-xl px-1 py-2 active:bg-white">
                      <span className={clsx("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", TINTE_GRUPO[g.id].fondo, TINTE_GRUPO[g.id].texto)}>
                        <IconoSolucion icono={s.icono} className="h-[18px] w-[18px]" />
                      </span>
                      <span>
                        <span className="block font-semibold text-tinta">{s.nombre}</span>
                        <span className="block text-[0.8rem] leading-snug text-humo">{s.linea}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
          <ul className="mt-2 grid grid-cols-2 gap-2">
            {[...ENLACES, { href: "/herramientas", label: "Herramientas" }, { href: "/contacto", label: "Contacto" }].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="flex min-h-12 items-center rounded-xl border border-tinta/10 bg-white px-4 font-semibold text-tinta"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid grid-cols-2 gap-2 border-t border-tinta/10 bg-papel px-4 py-3">
          <Link href="/demo" className="flex min-h-12 items-center justify-center rounded-xl border-2 border-tinta/15 bg-white font-semibold text-tinta">
            Ver la demo
          </Link>
          <Link
            href="/contacto"
            className="flex min-h-12 items-center justify-center rounded-xl border-2 border-tinta bg-aji-500 font-semibold text-tinta"
          >
            Crear mi tienda
          </Link>
        </div>
      </div>
    </header>
  );
}
