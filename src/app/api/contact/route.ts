import { NextResponse } from "next/server";
import { CONTACT_EMAIL } from "@/lib/site";

export const runtime = "nodejs";

interface ContactPayload {
  nombre?: string;
  negocio?: string;
  email?: string;
  telefono?: string;
  mensaje?: string;
  // honeypot anti-spam (debe venir vacío)
  website?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let data: ContactPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  // Honeypot: si viene relleno, lo tratamos como spam (respuesta OK falsa).
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const nombre = (data.nombre || "").trim();
  const email = (data.email || "").trim();
  const mensaje = (data.mensaje || "").trim();
  const negocio = (data.negocio || "").trim();
  const telefono = (data.telefono || "").trim();

  if (!nombre || !email || !mensaje) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios" },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  const subject = `Nuevo lead Pedily: ${nombre}${negocio ? ` · ${negocio}` : ""}`;
  const lines = [
    `Nombre: ${nombre}`,
    `Negocio: ${negocio || "—"}`,
    `Email: ${email}`,
    `Teléfono/WhatsApp: ${telefono || "—"}`,
    "",
    "Mensaje:",
    mensaje,
  ];
  const text = lines.join("\n");
  const html = `<div style="font-family:sans-serif;line-height:1.6">
    <h2>Nuevo lead desde pedily.com</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
    <p><strong>Negocio:</strong> ${escapeHtml(negocio) || "—"}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Teléfono/WhatsApp:</strong> ${escapeHtml(telefono) || "—"}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${escapeHtml(mensaje).replace(/\n/g, "<br/>")}</p>
  </div>`;

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM = process.env.RESEND_FROM || "Pedily <onboarding@resend.dev>";

  // Si Resend está configurado, enviamos el correo.
  if (RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM,
          to: [CONTACT_EMAIL],
          reply_to: email,
          subject,
          text,
          html,
        }),
      });
      if (!res.ok) {
        const detail = await res.text();
        console.error("[contact] Resend error:", res.status, detail);
        return NextResponse.json(
          { error: "No se pudo enviar el mensaje. Intenta por WhatsApp." },
          { status: 502 }
        );
      }
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[contact] Resend exception:", err);
      return NextResponse.json(
        { error: "No se pudo enviar el mensaje. Intenta por WhatsApp." },
        { status: 502 }
      );
    }
  }

  // Sin proveedor de email configurado: registramos el lead en los logs del
  // servidor para no perderlo. TODO(PENDIENTE): definir RESEND_API_KEY,
  // RESEND_FROM y NEXT_PUBLIC_CONTACT_EMAIL en producción.
  console.warn(
    "[contact] RESEND_API_KEY no configurada — lead registrado en logs:\n" + text
  );
  return NextResponse.json({ ok: true, delivered: false });
}
