/**
 * Consola de altas (tarea X-007 del plan): recibe las solicitudes «Crear mi
 * tienda». Aún no existe, así que todo queda detrás de CONSOLA_SOLICITUDES_URL:
 *
 * - sin la variable, «Crear mi tienda» y «Prefiero una demo» van solo por
 *   correo y la pantalla de gracias dice «te escribimos para crear tu tienda»
 *   (L-18);
 * - con la variable, /api/contact envía la solicitud a esa URL y, además, el
 *   correo; si la consola falla, la solicitud se queda en el correo.
 *
 * Solo se usa en el servidor (página /contacto y /api/contact). La página se
 * genera al compilar: cambiar la variable exige volver a desplegar.
 *
 * Contrato que X-007 debe aceptar: POST JSON a la URL configurada con
 * {
 *   origen: "landing", modo: "tienda" | "demo", negocio, nombre, email,
 *   whatsapp ("+51" y 9 dígitos), distrito,
 *   respuestas: { canalHoy, prioridad, cuando }, mensaje, enviadaEn (ISO)
 * }
 * y responder 2xx si la guardó. Los valores de las respuestas son los de
 * PREGUNTAS en src/lib/solicitud.ts.
 */

import type { Solicitud } from "@/lib/solicitud";

const TIEMPO_MAXIMO_MS = 8000;

/** URL de la consola si está configurada y es válida; si no, null. */
export function consolaSolicitudesUrl(): string | null {
  const valor = process.env.CONSOLA_SOLICITUDES_URL?.trim();
  if (!valor) return null;
  try {
    const url = new URL(valor);
    const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (url.protocol === "https:" || (local && url.protocol === "http:")) {
      return url.toString();
    }
  } catch {
    // URL mal escrita: se trata como si no hubiera consola.
  }
  console.warn("[consola] CONSOLA_SOLICITUDES_URL no es una URL https válida.");
  return null;
}

/** Envía la solicitud a la consola. true solo si respondió 2xx a tiempo. */
export async function enviarAConsola(
  url: string,
  solicitud: Solicitud
): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origen: "landing",
        modo: solicitud.modo,
        negocio: solicitud.negocio,
        nombre: solicitud.nombre,
        email: solicitud.email,
        whatsapp: `+51${solicitud.whatsapp}`,
        distrito: solicitud.distrito,
        respuestas: {
          canalHoy: solicitud.canalHoy,
          prioridad: solicitud.prioridad,
          cuando: solicitud.cuando,
        },
        mensaje: solicitud.mensaje,
        enviadaEn: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(TIEMPO_MAXIMO_MS),
    });
    if (!res.ok) {
      console.error("[consola] respuesta", res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[consola] sin respuesta:", err);
    return false;
  }
}
