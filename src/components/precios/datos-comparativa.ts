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
 * Lo que nace apagado (`opcion`) se marca «se enciende».
 */
import { GRUPOS, SOLUCIONES, type GrupoId, type Icono, type PlanMinimo } from "@/lib/soluciones";

export type Celda = "si" | "enciende" | "no";

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
  filas: FilaComparativa[];
}

const ORDEN: PlanMinimo[] = ["tienda", "whatsapp", "completo"];

export function planDeFuncion(ref: string, planSolucion: PlanMinimo): PlanMinimo {
  const r = ref.trim();
  if (/^(4|5)\./.test(r) || r.startsWith("3.1 Mesas")) return "completo";
  if (/^(2|10)\./.test(r) || r.startsWith("3.7") || r === "12.2") return "whatsapp";
  // Si no, el plan mínimo de su página (p. ej. el asistente, desde S/ 499).
  return planSolucion;
}

function celdas(plan: PlanMinimo, opcion: boolean): [Celda, Celda, Celda] {
  const desde = ORDEN.indexOf(plan);
  return ORDEN.map((_, i) => (i < desde ? "no" : opcion ? "enciende" : "si")) as [Celda, Celda, Celda];
}

/** Primero lo que trae Tienda; el asistente y el plan Completo, después. */
export function comparativa(): BloqueComparativa[] {
  const orden = [...SOLUCIONES].sort((a, b) => ORDEN.indexOf(a.plan) - ORDEN.indexOf(b.plan));
  return orden.map((s) => ({
    slug: s.slug,
    nombre: s.nombre,
    icono: s.icono,
    grupoId: s.grupo,
    grupo: GRUPOS.find((g) => g.id === s.grupo)?.nombre ?? "",
    filas: s.funciones.map((f) => {
      const plan = planDeFuncion(f.ref, s.plan);
      const opcion = Boolean(f.opcion);
      return { texto: f.texto, ref: f.ref, plan, opcion, celdas: celdas(plan, opcion) };
    }),
  }));
}

/** Cuántas funciones de la lista trae cada plan (incluidas las que se encienden). */
export function totalesPorPlan(bloques: BloqueComparativa[]): [number, number, number] {
  const t: [number, number, number] = [0, 0, 0];
  for (const b of bloques) for (const f of b.filas) f.celdas.forEach((c, i) => c !== "no" && t[i]++);
  return t;
}
