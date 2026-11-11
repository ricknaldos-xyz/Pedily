"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Send, MessageCircle, Mail, MapPin } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_LOCATION, whatsappLink } from "@/lib/site";

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const waHref = whatsappLink();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSending(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      nombre: String(formData.get("nombre") || ""),
      negocio: String(formData.get("negocio") || ""),
      email: String(formData.get("email") || ""),
      telefono: String(formData.get("telefono") || ""),
      mensaje: String(formData.get("mensaje") || ""),
      website: String(formData.get("website") || ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "No se pudo enviar el mensaje.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo enviar el mensaje."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-sand-50 to-white py-16 sm:py-24">
        <Container className="max-w-4xl">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-sand-900 sm:text-4xl">
              Hablemos
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-sand-500">
              Tienes dudas? Quieres una demo personalizada? Escribenos y te
              respondemos en menos de 24 horas.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-5">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-sand-200 bg-white p-6">
                <h2 className="text-lg font-bold text-sand-900">
                  Otras formas de contactarnos
                </h2>

                <div className="mt-6 space-y-4">
                  {waHref && (
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-sand-50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                        <MessageCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sand-900">WhatsApp</p>
                        <p className="text-sm text-sand-500">
                          Respuesta rápida, de lunes a sábado
                        </p>
                      </div>
                    </a>
                  )}

                  {CONTACT_EMAIL && (
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-sand-50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                        <Mail className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sand-900">Email</p>
                        <p className="text-sm text-sand-500">{CONTACT_EMAIL}</p>
                      </div>
                    </a>
                  )}

                  <div className="flex items-start gap-3 rounded-xl p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream-300">
                      <MapPin className="h-5 w-5 text-cream-700" />
                    </div>
                    <div>
                      <p className="font-medium text-sand-900">Ubicación</p>
                      <p className="text-sm text-sand-500">{CONTACT_LOCATION}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-sand-200 bg-white p-6 sm:p-8">
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-100">
                      <Send className="h-8 w-8 text-accent-600" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-sand-900">
                      Mensaje enviado
                    </h3>
                    <p className="mt-2 text-sand-500">
                      Listo, recibimos tu mensaje. Te respondemos pronto.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot anti-spam (oculto) */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="hidden"
                    />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="nombre"
                          className="block text-sm font-medium text-sand-700"
                        >
                          Tu nombre
                        </label>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          required
                          className="mt-1.5 block w-full rounded-xl border border-sand-200 px-4 py-3 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                          placeholder="Juan Perez"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="negocio"
                          className="block text-sm font-medium text-sand-700"
                        >
                          Nombre de tu negocio
                        </label>
                        <input
                          type="text"
                          id="negocio"
                          name="negocio"
                          className="mt-1.5 block w-full rounded-xl border border-sand-200 px-4 py-3 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                          placeholder="Mi Restaurante"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-sand-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="mt-1.5 block w-full rounded-xl border border-sand-200 px-4 py-3 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        placeholder="tu@correo.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="telefono"
                        className="block text-sm font-medium text-sand-700"
                      >
                        Telefono / WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        className="mt-1.5 block w-full rounded-xl border border-sand-200 px-4 py-3 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        placeholder="900 000 000"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="mensaje"
                        className="block text-sm font-medium text-sand-700"
                      >
                        Como te podemos ayudar?
                      </label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        rows={4}
                        required
                        className="mt-1.5 block w-full resize-none rounded-xl border border-sand-200 px-4 py-3 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        placeholder="Cuentanos sobre tu negocio y que necesitas..."
                      />
                    </div>

                    {error && (
                      <div className="rounded-xl border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-accent-700">
                        {error}
                        {waHref && (
                          <>
                            {" "}
                            <a
                              href={waHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold underline"
                            >
                              Escríbenos por WhatsApp
                            </a>
                            .
                          </>
                        )}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-sm font-semibold text-white shadow-warm transition-all hover:bg-primary-700 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {sending ? "Enviando..." : "Enviar mensaje"}
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
