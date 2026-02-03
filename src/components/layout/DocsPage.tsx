"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark-dimmed.min.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  ArrowUp,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  ShoppingCart,
  CreditCard,
  MessageCircle,
  LayoutDashboard,
  Shield,
  Truck,
  Heart,
  Puzzle,
  Code2,
  FileCode2,
  Tags,
  BookOpen,
  FileText,
  Hash,
  Sparkles,
  CheckCircle2,
  Monitor,
} from "lucide-react";

const sections = [
  { id: "1-vision-general", title: "Vision General", icon: Eye, num: "1" },
  { id: "2-tienda-online", title: "Tienda Online", icon: ShoppingCart, num: "2" },
  { id: "3-proceso-de-compra", title: "Proceso de Compra", icon: CreditCard, num: "3" },
  { id: "4-metodos-de-pago", title: "Metodos de Pago", icon: Tags, num: "4" },
  { id: "5-bot-de-whatsapp", title: "Bot de WhatsApp", icon: MessageCircle, num: "5" },
  { id: "6-kiosko-de-autoservicio", title: "Kiosko Autoservicio", icon: Monitor, num: "6" },
  { id: "7-dashboard-de-operaciones", title: "Dashboard", icon: LayoutDashboard, num: "7" },
  { id: "8-sistema-de-roles", title: "Roles y Permisos", icon: Shield, num: "8" },
  { id: "9-delivery", title: "Delivery", icon: Truck, num: "9" },
  { id: "10-fidelizacion", title: "Fidelizacion", icon: Heart, num: "10" },
  { id: "11-integraciones", title: "Integraciones", icon: Puzzle, num: "11" },
  { id: "12-stack-tecnologico", title: "Stack Tecnologico", icon: Code2, num: "12" },
  { id: "13-api-reference", title: "API Reference", icon: FileCode2, num: "13" },
  { id: "14-planes-y-precios", title: "Planes y Precios", icon: BookOpen, num: "14" },
];

const skeletonWidths = [80, 72, 88, 68, 76, 84, 70, 92, 78, 86, 74, 96, 82];

interface SearchResult {
  sectionId: string;
  sectionTitle: string;
  snippet: string;
  matchStart: number;
  matchEnd: number;
}

export function DocsPage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");
  const [activeH3, setActiveH3] = useState("");
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedSearchIdx, setSelectedSearchIdx] = useState(0);
  const [readProgress, setReadProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [subHeadings, setSubHeadings] = useState<{ id: string; text: string }[]>([]);
  const [showToc, setShowToc] = useState(true);
  const searchOverlayRef = useRef<HTMLInputElement>(null);

  const strippedContent = useMemo(() => {
    if (!content) return "";
    const firstH2 = content.indexOf("\n## 1.");
    if (firstH2 === -1) return content;
    return content.slice(firstH2);
  }, [content]);

  useEffect(() => {
    fetch("/docs/DOCUMENTATION.md")
      .then((res) => res.text())
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Track scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowBackToTop(scrollTop > 500);

      // Hide TOC after scrolling past header
      setShowToc(scrollTop < 200);

      let currentSection = sections[0]?.id ?? "";
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top <= 120) {
          currentSection = sections[i].id;
          break;
        }
      }

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
        setVisitedSections((prev) => new Set([...prev, currentSection]));
      }

      // Collect h3 sub-headings
      const h3s = document.querySelectorAll("article h3[id]");
      const sectionIdx = sections.findIndex((s) => s.id === currentSection);
      const nextSectionEl = sectionIdx < sections.length - 1
        ? document.getElementById(sections[sectionIdx + 1]?.id)
        : null;
      const currentSectionEl = document.getElementById(currentSection);

      const visible: { id: string; text: string }[] = [];
      let currentH3 = "";

      if (currentSectionEl) {
        const sectionTop = currentSectionEl.getBoundingClientRect().top;
        const sectionBottom = nextSectionEl ? nextSectionEl.getBoundingClientRect().top : Infinity;

        h3s.forEach((h3) => {
          const rect = h3.getBoundingClientRect();
          if (rect.top >= sectionTop - 300 && rect.top < sectionBottom) {
            const rawText = h3.textContent ?? "";
            const cleanText = rawText.replace(/#$/, "").trim();
            visible.push({ id: h3.id, text: cleanText });
            if (rect.top <= 140) currentH3 = h3.id;
          }
        });
      }
      setSubHeadings(visible);
      setActiveH3(currentH3);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const timer = setTimeout(handleScroll, 200);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [strippedContent, activeSection]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchOverlayRef.current?.focus(), 100);
      setSelectedSearchIdx(0);
    } else {
      setSearchQuery("");
    }
  }, [searchOpen]);

  useEffect(() => {
    setSelectedSearchIdx(0);
  }, [searchQuery]);

  const scrollToId = useCallback((id: string, closeOverlays = true) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      if (closeOverlays) {
        setMobileMenuOpen(false);
        setSearchOpen(false);
        setSearchQuery("");
      }
    }
  }, []);

  const copyCode = useCallback((code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  }, []);

  // Full-text search with highlight positions
  const searchResults = useMemo<SearchResult[]>(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    const lines = content.split("\n");
    const results: SearchResult[] = [];
    let curSectionId = "";
    let curSectionTitle = "";

    for (let i = 0; i < lines.length && results.length < 8; i++) {
      const line = lines[i];
      const h2Match = line.match(/^## (\d+)\. (.+)/);
      if (h2Match) {
        const section = sections.find((s) => s.id.startsWith(`${h2Match[1]}-`) || s.title === h2Match[2]);
        if (section) {
          curSectionId = section.id;
          curSectionTitle = section.title;
        }
      }

      if (line.toLowerCase().includes(query) && !line.startsWith("#") && line.trim().length > 10) {
        const idx = line.toLowerCase().indexOf(query);
        const start = Math.max(0, idx - 30);
        const end = Math.min(line.length, idx + query.length + 30);
        let snippet = line.slice(start, end).trim().replace(/[*_`#|]/g, "");
        if (start > 0) snippet = "..." + snippet;
        if (end < line.length) snippet = snippet + "...";

        const matchStart = start > 0 ? idx - start + 3 : idx - start;
        results.push({
          sectionId: curSectionId,
          sectionTitle: curSectionTitle || "Inicio",
          snippet,
          matchStart,
          matchEnd: matchStart + query.length,
        });
      }
    }
    return results;
  }, [searchQuery, content]);

  const paletteItems = useMemo(() => {
    if (searchQuery.length >= 2) {
      return searchResults.map((r) => ({
        id: r.sectionId,
        label: r.snippet,
        meta: r.sectionTitle,
        matchStart: r.matchStart,
        matchEnd: r.matchEnd,
      }));
    }
    return sections.map((s) => ({
      id: s.id,
      label: s.title,
      meta: "",
      matchStart: -1,
      matchEnd: -1,
    }));
  }, [searchQuery, searchResults]);

  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSearchIdx((i) => (i < paletteItems.length - 1 ? i + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSearchIdx((i) => (i > 0 ? i - 1 : paletteItems.length - 1));
    } else if (e.key === "Enter" && paletteItems[selectedSearchIdx]) {
      e.preventDefault();
      scrollToId(paletteItems[selectedSearchIdx].id);
    }
  }, [paletteItems, selectedSearchIdx, scrollToId]);

  const currentSectionIndex = sections.findIndex((s) => s.id === activeSection);
  const prevSection = currentSectionIndex > 0 ? sections[currentSectionIndex - 1] : null;
  const nextSection = currentSectionIndex < sections.length - 1 ? sections[currentSectionIndex + 1] : null;

  // Expose search for Header
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__docsOpenSearch = () => setSearchOpen(true);
    return () => { delete (window as unknown as Record<string, unknown>).__docsOpenSearch; };
  }, []);

  // Highlight text helper
  const highlightMatch = (text: string, start: number, end: number) => {
    if (start < 0) return text;
    return (
      <>
        {text.slice(0, start)}
        <mark className="rounded bg-yellow-200/80 px-0.5 text-yellow-900">{text.slice(start, end)}</mark>
        {text.slice(end)}
      </>
    );
  };

  /* ─── Loading skeleton ─── */
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto flex max-w-7xl">
          <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 flex-shrink-0 border-r border-slate-100 bg-slate-50/80 p-4 pt-6 lg:block">
            <div className="mb-5 h-9 w-full animate-pulse rounded-lg bg-slate-200" />
            <div className="space-y-1">
              {skeletonWidths.map((w, i) => (
                <div
                  key={i}
                  className="h-9 animate-pulse rounded-lg bg-slate-200"
                  style={{ animationDelay: `${i * 50}ms`, width: `${w}%` }}
                />
              ))}
            </div>
          </aside>
          <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <div className="mb-3 flex gap-2">
                <div className="h-6 w-14 animate-pulse rounded-full bg-primary-100" />
                <div className="h-6 w-32 animate-pulse rounded bg-slate-100" />
              </div>
              <div className="mb-2 h-10 w-2/3 animate-pulse rounded bg-slate-200" />
              <div className="mb-6 h-5 w-full animate-pulse rounded bg-slate-100" />
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-14 animate-pulse rounded-lg bg-slate-100" style={{ animationDelay: `${i * 80}ms` }} />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  /* ─── Main render ─── */
  return (
    <div className="min-h-screen bg-white">
      {/* Reading progress */}
      <div className="fixed top-16 right-0 left-0 z-40 h-[3px] bg-slate-100">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
          initial={{ width: 0 }}
          animate={{ width: `${readProgress}%` }}
          transition={{ duration: 0.15 }}
        />
      </div>

      {/* ─── Command palette ─── */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm"
              onClick={() => setSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.15 }}
              className="fixed top-[10%] right-4 left-4 z-[70] mx-auto max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:top-[15%]"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
                <Search className="h-5 w-5 flex-shrink-0 text-slate-400" />
                <input
                  ref={searchOverlayRef}
                  type="text"
                  placeholder="Buscar en la documentacion..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  className="flex-1 bg-transparent text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
                <kbd className="hidden rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] text-slate-400 sm:inline">ESC</kbd>
              </div>

              <div className="max-h-[min(60vh,22rem)] overflow-y-auto p-1.5">
                {searchQuery.length >= 2 && searchResults.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Search className="mb-3 h-10 w-10 text-slate-200" />
                    <p className="text-sm text-slate-400">Sin resultados para &ldquo;{searchQuery}&rdquo;</p>
                    <p className="mt-1 text-xs text-slate-300">Intenta con otra palabra clave</p>
                  </div>
                ) : (
                  <ul>
                    {searchQuery.length < 2 && (
                      <li className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Secciones</li>
                    )}
                    {paletteItems.map((item, i) => {
                      const section = sections.find((s) => s.id === item.id);
                      const Icon = section?.icon ?? FileText;
                      const isSelected = i === selectedSearchIdx;
                      return (
                        <li key={`${item.id}-${i}`}>
                          <button
                            onClick={() => scrollToId(item.id)}
                            onMouseEnter={() => setSelectedSearchIdx(i)}
                            className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
                              isSelected ? "bg-primary-50 shadow-sm" : "hover:bg-slate-50"
                            }`}
                          >
                            <span className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg ${
                              isSelected ? "bg-primary-100 text-primary-600" : "bg-slate-100 text-slate-400"
                            }`}>
                              <Icon className="h-3.5 w-3.5" />
                            </span>
                            <div className="min-w-0 flex-1">
                              {item.meta && (
                                <span className="mb-0.5 block text-[11px] font-medium text-primary-500">{item.meta}</span>
                              )}
                              <span className={`line-clamp-1 text-sm ${isSelected ? "font-medium text-primary-700" : "text-slate-600"}`}>
                                {highlightMatch(item.label, item.matchStart, item.matchEnd)}
                              </span>
                            </div>
                            {isSelected && <span className="mt-1 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-400">↵</span>}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div className="flex items-center gap-4 border-t border-slate-100 bg-slate-50/50 px-4 py-2 text-[11px] text-slate-400">
                <span><kbd className="rounded border border-slate-200 bg-white px-1 py-0.5">↑↓</kbd> navegar</span>
                <span><kbd className="rounded border border-slate-200 bg-white px-1 py-0.5">↵</kbd> ir</span>
                <span><kbd className="rounded border border-slate-200 bg-white px-1 py-0.5">esc</kbd> cerrar</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="mx-auto flex max-w-7xl">
        {/* ─── Left Sidebar ─── */}
        <aside className="docs-scrollbar sticky top-16 hidden h-[calc(100vh-4rem)] w-60 flex-shrink-0 overflow-y-auto border-r border-slate-100 bg-slate-50/80 lg:block">
          <div className="p-4 pt-6">
            <button
              onClick={() => setSearchOpen(true)}
              className="group mb-5 flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-400 shadow-sm transition-all hover:border-slate-300 hover:shadow"
            >
              <Search className="h-4 w-4 transition-colors group-hover:text-primary-500" />
              <span className="flex-1 text-left text-[13px]">Buscar...</span>
              <kbd className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">⌘K</kbd>
            </button>

            <nav className="space-y-0.5">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                const isVisited = visitedSections.has(section.id);
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToId(section.id)}
                    className={`group relative flex w-full items-center gap-2.5 rounded-xl py-2 pr-3 pl-3 text-left text-[13px] transition-all ${
                      isActive
                        ? "bg-primary-50 font-semibold text-primary-700 shadow-sm"
                        : "text-slate-500 hover:bg-white hover:text-slate-800 hover:shadow-sm"
                    }`}
                  >
                    {/* Active bar */}
                    <span className={`absolute top-2 bottom-2 left-0 w-[3px] rounded-r-full transition-all ${
                      isActive ? "bg-primary-500" : "bg-transparent"
                    }`} />
                    <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg transition-colors ${
                      isActive ? "bg-primary-100 text-primary-600" : "bg-slate-100 text-slate-400 group-hover:bg-white"
                    }`}>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="flex-1 truncate">{section.title}</span>
                    {isVisited && !isActive && (
                      <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-accent-500" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Progress */}
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-3">
              <div className="mb-2 flex items-center justify-between text-[11px]">
                <span className="font-medium text-slate-500">Progreso</span>
                <span className="tabular-nums text-slate-400">{Math.round(readProgress)}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${readProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="mt-2 text-[10px] text-slate-400">
                {visitedSections.size} de {sections.length} secciones vistas
              </p>
            </div>
          </div>
        </aside>

        {/* ─── Mobile menu ─── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="docs-scrollbar fixed top-16 right-0 bottom-0 z-50 w-72 overflow-y-auto bg-white p-5 shadow-2xl lg:hidden"
              >
                <button
                  onClick={() => { setMobileMenuOpen(false); setSearchOpen(true); }}
                  className="mb-4 flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-400"
                >
                  <Search className="h-4 w-4" />
                  Buscar en docs...
                </button>
                <nav className="space-y-0.5">
                  {sections.map((s) => {
                    const Icon = s.icon;
                    const isActive = activeSection === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => scrollToId(s.id)}
                        className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm ${
                          isActive ? "bg-primary-50 font-semibold text-primary-700" : "text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                          isActive ? "bg-primary-100 text-primary-600" : "bg-slate-100 text-slate-400"
                        }`}>
                          <Icon className="h-4 w-4" />
                        </span>
                        {s.title}
                      </button>
                    );
                  })}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed right-4 bottom-20 z-50 rounded-full bg-primary-600 p-3 text-white shadow-lg shadow-primary-500/30 transition-all hover:bg-primary-700 lg:hidden"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* ─── Main content ─── */}
        <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl">
            {/* Hero header */}
            <div className="relative mb-10 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 via-white to-accent-50 p-6 sm:p-8">
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary-100/50 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-accent-100/50 blur-3xl" />

              <div className="relative">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary-100 px-2.5 py-1 text-[11px] font-bold text-primary-700">
                    <Sparkles className="h-3 w-3" />
                    v2.0
                  </span>
                  <span className="text-xs text-slate-400">Actualizado Feb 2026</span>
                </div>
                <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  Documentacion de Pedily
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
                  Guia completa de la plataforma. Aprende a configurar tu tienda, gestionar pedidos y conectar el bot de WhatsApp con IA.
                </p>

                {/* Quick TOC */}
                <AnimatePresence>
                  {showToc && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-5 overflow-hidden"
                    >
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Ir a seccion</p>
                      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                        {sections.slice(0, 6).map((s) => {
                          const Icon = s.icon;
                          return (
                            <button
                              key={s.id}
                              onClick={() => scrollToId(s.id)}
                              className="group flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 text-left text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200/80 transition-all hover:bg-white hover:text-primary-600 hover:shadow-md hover:ring-primary-200"
                            >
                              <Icon className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover:text-primary-500" />
                              <span className="truncate">{s.title}</span>
                            </button>
                          );
                        })}
                      </div>
                      <button
                        onClick={() => setShowToc(false)}
                        className="mt-2 text-xs text-slate-400 hover:text-slate-600"
                      >
                        Ver todas las secciones →
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mobile search */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="mt-4 inline-flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-400 shadow-sm transition-all hover:shadow-md sm:hidden"
                >
                  <Search className="h-4 w-4" />
                  Buscar en la documentacion...
                </button>
              </div>
            </div>

            <article className="docs-prose prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-h2:mt-14 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-4 prose-h2:text-[1.5rem] prose-h2:font-extrabold prose-h3:mt-8 prose-h3:text-base prose-h3:font-bold prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[13px] prose-code:font-medium prose-code:text-primary-700 prose-code:before:content-none prose-code:after:content-none prose-pre:relative prose-pre:rounded-xl prose-pre:bg-[#22272e] prose-table:overflow-hidden prose-table:rounded-xl prose-table:border prose-table:border-slate-200 prose-th:bg-slate-50 prose-th:px-4 prose-th:py-2.5 prose-th:text-left prose-th:text-[11px] prose-th:font-semibold prose-th:uppercase prose-th:tracking-wider prose-th:text-slate-500 prose-td:px-4 prose-td:py-2.5 prose-td:text-sm prose-td:border-t prose-td:border-slate-100 prose-blockquote:rounded-r-xl prose-blockquote:border-l-[3px] prose-blockquote:border-primary-400 prose-blockquote:bg-primary-50/60 prose-blockquote:py-0.5 prose-blockquote:not-italic prose-blockquote:text-slate-600 prose-li:marker:text-slate-400 prose-hr:border-slate-200">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h2: ({ children, ...props }) => {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/^(\d+)-/, "$1-");
                    const matchedSection = sections.find((s) => s.id === id || text.includes(s.title));
                    const sectionId = matchedSection?.id ?? id;
                    const Icon = matchedSection?.icon;
                    return (
                      <h2 id={sectionId} className="group" {...props}>
                        <span className="flex items-center gap-3">
                          {Icon && (
                            <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 shadow-sm">
                              <Icon className="h-4.5 w-4.5" />
                            </span>
                          )}
                          <span className="flex-1">{children}</span>
                          <a href={`#${sectionId}`} className="text-slate-300 opacity-0 transition-opacity group-hover:opacity-100" aria-label="Enlace">
                            <Hash className="h-4 w-4" />
                          </a>
                        </span>
                      </h2>
                    );
                  },
                  h3: ({ children, ...props }) => {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                    return (
                      <h3 id={id} className="group" {...props}>
                        {children}
                        <a href={`#${id}`} className="ml-2 inline-block text-slate-300 opacity-0 transition-opacity group-hover:opacity-100" aria-label="Enlace">
                          <Hash className="inline h-3.5 w-3.5" />
                        </a>
                      </h3>
                    );
                  },
                  pre: ({ children, ...props }) => {
                    const codeEl = (children as React.ReactElement<{ children?: string; className?: string }>)?.props;
                    const codeText = codeEl?.children ? String(codeEl.children) : "";
                    const langMatch = codeEl?.className?.match(/language-(\w+)/);
                    const lang = langMatch?.[1];
                    const isCopied = copiedCode === codeText;
                    return (
                      <div className="not-prose group relative my-6">
                        <div className="flex items-center justify-between rounded-t-xl bg-[#2d333b] px-4 py-2.5">
                          <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                            <span className="h-2 w-2 rounded-full bg-slate-500" />
                            {lang || "code"}
                          </span>
                          <button
                            onClick={() => copyCode(codeText)}
                            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] transition-all ${
                              isCopied ? "bg-accent-500/20 text-accent-400" : "text-slate-400 hover:bg-white/10 hover:text-slate-200"
                            }`}
                          >
                            {isCopied ? <><Check className="h-3 w-3" /> Copiado</> : <><Copy className="h-3 w-3" /> Copiar</>}
                          </button>
                        </div>
                        <pre className="!mt-0 !rounded-t-none !rounded-b-xl !bg-[#22272e]" {...props}>{children}</pre>
                      </div>
                    );
                  },
                  table: ({ children, ...props }) => (
                    <div className="my-6 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                      <table className="!my-0 !border-0" {...props}>{children}</table>
                    </div>
                  ),
                  tr: ({ children, ...props }) => (
                    <tr className="transition-colors hover:bg-slate-50/80" {...props}>{children}</tr>
                  ),
                }}
              >
                {strippedContent}
              </ReactMarkdown>
            </article>

            {/* Prev / Next */}
            <nav className="mt-14 grid grid-cols-2 gap-3 border-t border-slate-200 pt-8">
              {prevSection ? (
                <button
                  onClick={() => scrollToId(prevSection.id)}
                  className="group flex flex-col items-start gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-5 text-left shadow-sm transition-all hover:border-primary-200 hover:bg-primary-50/30 hover:shadow-md"
                >
                  <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400 group-hover:text-primary-500">
                    <ChevronLeft className="h-3 w-3" /> Anterior
                  </span>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-primary-700">{prevSection.title}</span>
                </button>
              ) : <div />}
              {nextSection ? (
                <button
                  onClick={() => scrollToId(nextSection.id)}
                  className="group flex flex-col items-end gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-5 text-right shadow-sm transition-all hover:border-primary-200 hover:bg-primary-50/30 hover:shadow-md"
                >
                  <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400 group-hover:text-primary-500">
                    Siguiente <ChevronRight className="h-3 w-3" />
                  </span>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-primary-700">{nextSection.title}</span>
                </button>
              ) : <div />}
            </nav>
          </div>
        </main>

        {/* ─── Right sidebar ─── */}
        <aside className="docs-scrollbar sticky top-16 hidden h-[calc(100vh-4rem)] w-48 flex-shrink-0 overflow-y-auto py-8 pr-4 xl:block">
          {subHeadings.length > 0 ? (
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">En esta pagina</p>
              <nav className="space-y-px border-l-2 border-slate-100">
                {subHeadings.map((h) => {
                  const isActive = activeH3 === h.id;
                  return (
                    <button
                      key={h.id}
                      onClick={() => scrollToId(h.id, false)}
                      className={`-ml-px block w-full truncate border-l-2 py-1.5 pl-3 pr-1 text-left text-[12px] transition-all ${
                        isActive ? "border-primary-500 font-medium text-primary-700" : "border-transparent text-slate-400 hover:border-slate-300 hover:text-slate-700"
                      }`}
                      title={h.text}
                    >
                      {h.text}
                    </button>
                  );
                })}
              </nav>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-[11px] text-slate-300">Desplazate para ver</p>
              <p className="text-[11px] text-slate-300">los subtitulos</p>
            </div>
          )}
        </aside>
      </div>

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed right-4 bottom-4 z-40 rounded-full bg-white p-2.5 shadow-lg ring-1 ring-slate-200 transition-all hover:-translate-y-0.5 hover:shadow-xl lg:right-6 lg:bottom-6"
            aria-label="Volver arriba"
          >
            <ArrowUp className="h-4 w-4 text-slate-600" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
