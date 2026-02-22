"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { Menu, X, Search, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

const landingLinks = [
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#precios", label: "Precios" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#faq", label: "FAQ" },
  { href: "/docs", label: "Docs" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isDocs = pathname.startsWith("/docs");
  const isLanding = pathname === "/";

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
      {/* Scroll progress bar */}
      {isLanding && (
        <motion.div
          className="absolute top-0 right-0 left-0 h-[2px] origin-left bg-gradient-to-r from-primary-500 to-accent-500"
          style={{ scaleX }}
        />
      )}

      {/* Gradient border bottom when scrolled */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary-300/50 to-transparent" />
      )}

      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 transition-transform hover:scale-105"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 shadow-md">
              <span className="text-sm font-extrabold text-white">P</span>
            </div>
            <span className="text-2xl font-extrabold text-primary-600">
              Pedily
            </span>
          </Link>

          {isDocs && (
            <>
              <span className="hidden text-slate-300 sm:block">/</span>
              <span className="hidden text-sm font-medium text-slate-600 sm:block">
                Docs
              </span>
            </>
          )}
        </div>

        {isDocs ? (
          /* Docs-specific header */
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const fn = (window as unknown as Record<string, unknown>)
                  .__docsOpenSearch;
                if (typeof fn === "function") fn();
              }}
              className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-400 transition-all hover:border-slate-300 hover:bg-slate-50 sm:flex"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Buscar...</span>
              <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium">
                ⌘K
              </kbd>
            </button>
            <Link
              href="/"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-primary-600"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Inicio</span>
            </Link>
          </div>
        ) : (
          /* Landing page header */
          <>
            <nav className="hidden items-center gap-8 md:flex">
              {landingLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link text-sm font-medium text-slate-600 transition-colors hover:text-primary-600"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <a
                href="#precios"
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-100 hover:text-primary-600"
              >
                Ver precios
              </a>
              <a
                href="#cta"
                className="btn-shimmer animate-glow-pulse rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-500/20 transition-all hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/30 active:scale-95"
              >
                Empieza gratis
              </a>
            </div>

            <button
              className="rounded-lg p-2 transition-colors hover:bg-slate-100 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
            >
              {mobileOpen ? (
                <X className="h-5 w-5 text-slate-700" />
              ) : (
                <Menu className="h-5 w-5 text-slate-700" />
              )}
            </button>
          </>
        )}
      </Container>

      <AnimatePresence>
        {mobileOpen && !isDocs && (
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
              className="absolute right-0 left-0 z-50 border-b border-slate-200 bg-white shadow-lg md:hidden"
            >
              <Container className="flex flex-col gap-1 py-4">
                {landingLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-primary-600"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#cta"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: landingLinks.length * 0.05 }}
                  className="mt-2 rounded-xl bg-primary-600 px-5 py-2.5 text-center text-sm font-semibold text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Empieza gratis
                </motion.a>
              </Container>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
