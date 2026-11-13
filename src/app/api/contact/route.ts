import { NextResponse } from "next/server";
import { CONTACT_EMAIL } from "@/lib/site";
import { consolaSolicitudesUrl, enviarAConsola } from "@/lib/consola";
import {
  PREGUNTAS,
  textoRespuesta,
  validarSolicitud,
  type ResultadoEnvio,
  type Solicitud,
} from "@/lib/solicitud";

export const runtime = "nodejs";

const NO_DISPONIBLE =
  "El formulario no está disponible en este momento. Inténtalo más tarde.";
const NO_SE_PUDO = "No se pudo enviar el mensaje. Inténtalo más tarde.";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type EstadoConsola = "recibida" | "falló" | "no configurada" | "no aplica";

function armarCorreo(s: Solicitud, consola: EstadoConsola) {
  const pide = s.modo === "tienda" ? "Crear su tienda" : "Una demo";
  const subject = `Nueva solicitud Pedily (${pide.toLowerCase()}): ${s.negocio} · ${s.nombre}`;
  const filas: [string, string][] = [
    ["Pide", pide],
    ["Negocio", s.negocio],
    ["Nombre", s.nombre],
    ["Correo", s.email],
    ["WhatsApp", `+51 ${s.whatsapp}`],
    ["Distrito", s.distrito],
    ...PREGUNTAS.map(
      (p) => [`${p.numero}. ${p.titulo}`, textoRespuesta(p.id, s[p.id])] as [string, string]
    ),
    ["Consola de altas", consola],
  ];
  const text = [
    ...filas.map(([k, v]) => `${k}: ${v}`),
    "",
    "Mensaje:",
    s.mensaje || "—",
  ].join("\n");
  const html = `<div style="font-family:sans-serif;line-height:1.6">
    <h2>Nueva solicitud desde la landing</h2>
    ${filas
      .map(([k, v]) => `<p><strong>${escapeHtml(k)}:</strong> ${escapeHtml(v)}</p>`)
      .join("\n    ")}
    <p><strong>Mensaje:</strong></p>
    <p>${s.mensaje ? escapeHtml(s.mensaje).replace(/\n/g, "<br/>") : "—"}</p>
  </div>`;
  return { subject, text, html };
}

async function enviarCorreo(
  apiKey: string,
  destino: string,
  s: Solicitud,
  consola: EstadoConsola
): Promise<boolean> {
  const FROM = process.env.RESEND_FROM || "Pedily <onboarding@resend.dev>";
  const { subject, text, html } = armarCorreo(s, consola);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [destino],
        reply_to: s.email,
        subject,
        text,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend error:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[contact] Resend exception:", err);
    return false;
  }
}

export async function POST(request: Request) {
  let entrada: Record<string, unknown>;
  try {
    const cuerpo = await request.json();
    if (!cuerpo || typeof cuerpo !== "object") throw new Error("no es objeto");
    entrada = cuerpo as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  // Honeypot: si viene relleno, lo tratamos como spam (respuesta OK falsa).
  if (entrada.website) {
    return NextResponse.json({ ok: true, resultado: "demo" });
  }

  const validacion = validarSolicitud(entrada);
  if (!validacion.ok) {
    return NextResponse.json(
      { error: "Revisa los campos marcados.", campos: validacion.errores },
      { status: 400 }
    );
  }
  const solicitud = validacion.datos;

  const consolaUrl = consolaSolicitudesUrl();
  // «Crear mi tienda» solo existe con consola; sin ella, es un pedido de demo.
  if (solicitud.modo === "tienda" && !consolaUrl) solicitud.modo = "demo";

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const hayCorreo = Boolean(RESEND_API_KEY && CONTACT_EMAIL);

  if (!hayCorreo && solicitud.modo === "demo") {
    // Sin proveedor de correo ni buzón de destino, el mensaje no llega a
    // nadie: se lo decimos al usuario en vez de fingir un envío correcto.
    console.warn(
      "[contact] Falta RESEND_API_KEY o NEXT_PUBLIC_CONTACT_EMAIL: mensaje no enviado."
    );
    return NextResponse.json({ error: NO_DISPONIBLE }, { status: 503 });
  }

  let consolaOk = false;
  let estadoConsola: EstadoConsola = consolaUrl ? "no aplica" : "no configurada";
  if (solicitud.modo === "tienda" && consolaUrl) {
    consolaOk = await enviarAConsola(consolaUrl, solicitud);
    estadoConsola = consolaOk ? "recibida" : "falló";
  }

  const correoOk = hayCorreo
    ? await enviarCorreo(RESEND_API_KEY!, CONTACT_EMAIL!, solicitud, estadoConsola)
    : false;

  let resultado: ResultadoEnvio | null = null;
  if (consolaOk) resultado = "tienda";
  else if (correoOk)
    resultado = solicitud.modo === "tienda" ? "tienda-por-correo" : "demo";

  if (!resultado) {
    return NextResponse.json({ error: NO_SE_PUDO }, { status: 502 });
  }
  return NextResponse.json({ ok: true, resultado });
}
