"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Send, MessageCircle, Mail, MapPin } from "lucide-react";

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with form backend
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 sm:py-24">
        <Container className="max-w-4xl">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Hablemos
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
              Tienes dudas? Quieres una demo personalizada? Escribenos y te
              respondemos en menos de 24 horas.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-5">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Otras formas de contactarnos
                </h2>

                <div className="mt-6 space-y-4">
                  <a
                    href="https://wa.me/51999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                      <MessageCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">WhatsApp</p>
                      <p className="text-sm text-slate-500">
                        Respuesta rapida, de lunes a sabado
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:hola@pedily.com"
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                      <Mail className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Email</p>
                      <p className="text-sm text-slate-500">hola@pedily.com</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 rounded-xl p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                      <MapPin className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Ubicacion</p>
                      <p className="text-sm text-slate-500">
                        Lima, Peru
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-100">
                      <Send className="h-8 w-8 text-accent-600" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-slate-900">
                      Mensaje enviado
                    </h3>
                    <p className="mt-2 text-slate-500">
                      Listo, recibimos tu mensaje. Te respondemos pronto.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="nombre"
                          className="block text-sm font-medium text-slate-700"
                        >
                          Tu nombre
                        </label>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          required
                          className="mt-1.5 block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                          placeholder="Juan Perez"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="negocio"
                          className="block text-sm font-medium text-slate-700"
                        >
                          Nombre de tu negocio
                        </label>
                        <input
                          type="text"
                          id="negocio"
                          name="negocio"
                          className="mt-1.5 block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                          placeholder="Mi Restaurante"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="mt-1.5 block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        placeholder="tu@correo.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="telefono"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Telefono / WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        className="mt-1.5 block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        placeholder="999 999 999"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="mensaje"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Como te podemos ayudar?
                      </label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        rows={4}
                        required
                        className="mt-1.5 block w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        placeholder="Cuentanos sobre tu negocio y que necesitas..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-700 hover:shadow-xl active:scale-[0.98]"
                    >
                      Enviar mensaje
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
