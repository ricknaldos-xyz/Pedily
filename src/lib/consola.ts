/**
 * Consola de altas (tarea X-007 del plan): recibe las solicitudes «Crear mi
 * tienda». Existe en `pedily/pedily-consola`; todo queda detrás de
 * CONSOLA_SOLICITUDES_URL:
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
 * Contrato de la consola (`pedily-consola` en `main`: `app/api/solicitudes`,
 * `lib/solicitudes/esquema.ts`, `lib/web.ts`): POST JSON a la URL configurada con
 * {
 *   origen: "landing", modo: "tienda" | "demo", negocio, nombre, email,
 *   whatsapp ("+51" y 9 dígitos), distrito,
 *   respuestas: { canalHoy, prioridad, cuando }, mensaje,
 *   plan? ("tienda" | "whatsapp" | "completo"), periodicidad ("mensual" | "anual"),
 *   enviadaEn (ISO)
 * }
 * y responde 2xx si la guardó. Con `CONSOLA_TOKEN_LANDING`, además
 * `Authorization: Bearer <token>` y `x-pedily-ip-cliente: <IP del visitante>`.
 * Los valores de las respuestas son los de PREGUNTAS en src/lib/solicitud.ts.
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

/**
 * Q-06 (L1 de P-07) — cuerpo que acepta la consola (`pedily-consola`
 * `lib/solicitudes/esquema.ts`): el de siempre más `plan` (solo si el
 * restaurante eligió uno; si no, la consola sugiere uno) y `periodicidad`.
 */
export function cuerpoParaConsola(solicitud: Solicitud, ahora: Date) {
  return {
    origen: "landing" as const,
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
    ...(solicitud.plan ? { plan: solicitud.plan } : {}),
    periodicidad: solicitud.periodicidad,
    enviadaEn: ahora.toISOString(),
  };
}

const IP_VALIDA = /^[0-9a-fA-F.:]{2,64}$/;

/**
 * Q-06 (L2 de P-07) — IP pública del visitante que envió el formulario.
 * En Vercel, `x-vercel-forwarded-for`, `x-forwarded-for` y `x-real-ip` traen
 * la IP pública del cliente y Vercel sobrescribe la que mande el cliente
 * («to prevent IP spoofing»); `x-vercel-forwarded-for` no la cambia un proxy
 * delante de Vercel (https://vercel.com/docs/headers/request-headers,
 * consultada el 17-nov-2026). Se toma la primera de la lista y solo si parece
 * una IP; si no, null.
 */
export function ipDelVisitante(headers: Headers): string | null {
  for (const nombre of ["x-vercel-forwarded-for", "x-forwarded-for", "x-real-ip"]) {
    const primera = (headers.get(nombre) ?? "").split(",")[0].trim();
    if (primera) return IP_VALIDA.test(primera) ? primera : null;
  }
  return null;
}

/**
 * Cabeceras para la consola. Con `CONSOLA_TOKEN_LANDING` (el mismo valor que
 * en la consola) va como portador, y la IP del visitante en
 * `x-pedily-ip-cliente`: así la consola cuenta su límite «5 por hora» por
 * visitante y no por la IP de esta función (`pedily-consola` `lib/web.ts`
 * `ipParaLimite`). Sin token no se manda la IP: la consola la ignoraría.
 */
function cabecerasParaConsola(ipCliente: string | null): Record<string, string> {
  const cabeceras: Record<string, string> = { "Content-Type": "application/json" };
  const token = process.env.CONSOLA_TOKEN_LANDING?.trim();
  if (token) {
    cabeceras.Authorization = `Bearer ${token}`;
    if (ipCliente) cabeceras["x-pedily-ip-cliente"] = ipCliente;
  }
  return cabeceras;
}

/** Envía la solicitud a la consola. true solo si respondió 2xx a tiempo. */
export async function enviarAConsola(
  url: string,
  solicitud: Solicitud,
  ipCliente: string | null
): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: cabecerasParaConsola(ipCliente),
      body: JSON.stringify(cuerpoParaConsola(solicitud, new Date())),
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
