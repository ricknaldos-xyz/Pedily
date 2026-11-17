/**
 * Comparativa de planes función por función para /precios.
 *
 * No es una lista aparte: sale de las funciones de cada página de solución
 * (`src/lib/soluciones.ts`), que a su vez citan su fila del inventario vendible
 * (`research_notes/Pedily landing v2 2026-11-15/02_inventario_vendible.md`).
 * Así, si una función cambia en su página, cambia aquí.
 *
 * Plan de cada función (inventario, columna «Plan» y §«Resumen»; decisiones
 * del 15-nov en `src/lib/planes.ts`):
 * - Asistente de WhatsApp (§2), campañas (§10), configuración y analíticas del
 *   asistente en el panel (§3.7) y programar por chat (12.2): desde Tienda +
 *   WhatsApp (S/ 499).
 * - Kiosko (§4), QR de mesa (§5) y la pantalla Mesas (§3.1 Mesas): Completo
 *   (S/ 999).
 * - Todo lo demás: desde Tienda (S/ 249), y por tanto en los tres.
 * - 16-nov: el QR de mesa que cobra (§5 y §3.1 Mesas) es complemento de
 *   +S/ 150 al mes en Tienda y Tienda + WhatsApp (celda «complemento»), e
 *   incluido en Completo.
 * Lo que nace apagado (`opcion`) se marca «se enciende».
 * - 16-nov (L-02): las funciones «INT-…» de las soluciones son integraciones
 *   (`src/lib/integraciones.ts`). No se repiten en cada bloque: van juntas en
 *   el bloque «Integraciones», una fila por integración, con el plan de su
 *   ficha (propuesta L-02 al coordinador).
 */
import { GRUPOS, SOLUCIONES, type GrupoId, type Icono, type PlanMinimo } from "@/lib/soluciones";
import { INTEGRACIONES, PREFIJO_REF, RUTA_INTEGRACIONES, planDeRefIntegracion } from "@/lib/integraciones";

export type Celda = "si" | "enciende" | "complemento" | "no";

export interface FilaComparativa {
  texto: string;
  ref: string;
  plan: PlanMinimo;
  opcion: boolean;
  celdas: [Celda, Celda, Celda];
}

export interface BloqueComparativa {
  slug: string;
  nombre: string;
  icono: Icono;
  grupoId: GrupoId;
  grupo: string;
  /** Enlace del bloque; por defecto, su página de solución. */
  href?: string;
  filas: FilaComparativa[];
}

const ORDEN: PlanMinimo[] = ["tienda", "whatsapp", "completo"];

export function planDeFuncion(ref: string, planSolucion: PlanMinimo): PlanMinimo {
  const r = ref.trim();
  const int = planDeRefIntegracion(r);
  if (int) return ORDEN[Math.max(ORDEN.indexOf(int), ORDEN.indexOf(planSolucion))];
  if (/^(4|5)\./.test(r) || r.startsWith("3.1 Mesas")) return "completo";
  if (/^(2|10)\./.test(r) || r.startsWith("3.7") || r === "12.2") return "whatsapp";
  // Si no, el plan mínimo de su página (p. ej. el asistente, desde S/ 499).
  return planSolucion;
}

/** Funciones del complemento «Mesa» (QR de mesa que cobra). */
export function esComplementoMesa(ref: string): boolean {
  const r = ref.trim();
  return /^5\./.test(r) || r.startsWith("3.1 Mesas");
}

function celdas(plan: PlanMinimo, opcion: boolean, complemento: boolean): [Celda, Celda, Celda] {
  const desde = ORDEN.indexOf(plan);
  return ORDEN.map((_, i) => (i < desde ? (complemento ? "complemento" : "no") : opcion ? "enciende" : "si")) as [Celda, Celda, Celda];
}

/** Primero lo que trae Tienda; el asistente y el plan Completo, después. */
export function comparativa(): BloqueComparativa[] {
  const orden = [...SOLUCIONES].sort((a, b) => ORDEN.indexOf(a.plan) - ORDEN.indexOf(b.plan));
  const bloques: BloqueComparativa[] = orden.map((s) => ({
    slug: s.slug,
    nombre: s.nombre,
    icono: s.icono,
    grupoId: s.grupo,
    grupo: GRUPOS.find((g) => g.id === s.grupo)?.nombre ?? "",
    filas: s.funciones.filter((f) => !f.ref.startsWith(PREFIJO_REF)).map((f) => {
      const plan = planDeFuncion(f.ref, s.plan);
      const opcion = Boolean(f.opcion);
      return { texto: f.texto, ref: f.ref, plan, opcion, celdas: celdas(plan, opcion, esComplementoMesa(f.ref)) };
    }),
  }));
  // Culqi, Nubefact y PedidosYa Envíos ya salen en sus bloques (7.x, 8.x, 11.6).
  const yaListadas = new Set(["culqi", "nubefact", "pedidosya-envios"]);
  bloques.push({
    slug: "integraciones",
    nombre: "Integraciones",
    icono: "enchufe",
    grupoId: "opera",
    grupo: "Con lo que ya usas",
    href: RUTA_INTEGRACIONES,
    filas: INTEGRACIONES.filter((i) => !yaListadas.has(i.id)).map((i) => ({
      texto: `${i.nombre}: ${i.resumen.charAt(0).toLowerCase()}${i.resumen.slice(1)}`,
      ref: `${PREFIJO_REF}${i.id}`,
      plan: i.plan,
      opcion: true,
      celdas: celdas(i.plan, true, false),
    })),
  });
  return bloques;
}

/** Cuántas funciones de la lista trae cada plan (incluidas las que se encienden; sin complementos). */
export function totalesPorPlan(bloques: BloqueComparativa[]): [number, number, number] {
  const t: [number, number, number] = [0, 0, 0];
  for (const b of bloques) for (const f of b.filas) f.celdas.forEach((c, i) => (c === "si" || c === "enciende") && t[i]++);
  return t;
}
