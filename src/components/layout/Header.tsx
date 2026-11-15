"use client";

import { useEffect, useState } from "react";
import { Container } from "./Container";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { DEMO } from "@/lib/site";

// Con «/» delante para que funcionen también fuera de la portada.
const landingLinks = [
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/#precios", label: "Precios" },
  { href: "/#fundadores", label: "Fundadores" },
  { href: "/#faq", label: "Preguntas" },
  { href: "/herramientas", label: "Herramientas" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-sm backdrop-blur-xl"
          : "bg-white/60 backdrop-blur-md"
      }`}
    >

      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 shadow-md">
              <span className="text-sm font-bold text-white">P</span>
            </div>
            <span className="text-xl font-bold text-sand-900">
              Pedily
            </span>
          </Link>
        </div>

                  <>
            <nav className="hidden items-center gap-1 md:flex">
              {landingLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link rounded-lg px-3 py-2 text-sm font-medium text-sand-600 transition-colors hover:bg-sand-50 hover:text-primary-600"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <a
                href={DEMO.tiendaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-4 py-2 text-sm font-medium text-sand-600 transition-all hover:bg-sand-100 hover:text-primary-600"
              >
                Tienda de ejemplo
              </a>
              <a
                href="/contacto"
                className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md active:scale-[0.98]"
              >
                Crear mi tienda
              </a>
            </div>

            <button
              className="rounded-lg p-2 transition-colors hover:bg-sand-100 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileOpen ? (
                <X className="h-5 w-5 text-sand-700" />
              ) : (
                <Menu className="h-5 w-5 text-sand-700" />
              )}
            </button>
          </>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 left-0 z-50 border-b border-sand-200 bg-white shadow-lg md:hidden"
            >
              <Container className="flex flex-col gap-1 py-4">
                {landingLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-sand-600 transition-colors hover:bg-sand-50 hover:text-primary-600"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="/contacto"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: landingLinks.length * 0.05 }}
                  className="mt-2 rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-semibold text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Crear mi tienda
                </motion.a>
              </Container>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
