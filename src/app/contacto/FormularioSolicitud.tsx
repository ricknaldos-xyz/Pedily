"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2, Store } from "lucide-react";
import clsx from "clsx";
import {
  DISTRITOS_CALLAO,
  DISTRITOS_LIMA,
  FUERA_DE_LIMA,
  ORDEN_CAMPOS,
  PREGUNTAS,
  validarSolicitud,
  type CampoSolicitud,
  type ErroresSolicitud,
  type ModoSolicitud,
  type ResultadoEnvio,
} from "@/lib/solicitud";

interface Props {
  /** true si la consola de altas está configurada: enseña «Crear mi tienda». */
  consolaActiva: boolean;
  waHref: string | null;
}

interface Exito {
  resultado: ResultadoEnvio;
  nombre: string;
  email: string;
}

const campoBase =
  "mt-1.5 block w-full rounded-xl border bg-white px-4 py-3 text-base transition-colors focus:outline-none focus:ring-2 sm:text-sm";
const campoNormal =
  "border-sand-200 focus:border-primary-500 focus:ring-primary-500/20";
const campoConError =
  "border-accent-400 focus:border-accent-500 focus:ring-accent-500/20";

function primerNombre(nombre: string): string {
  return nombre.split(/\s+/)[0] || nombre;
}

export function FormularioSolicitud({ consolaActiva, waHref }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errores, setErrores] = useState<ErroresSolicitud>({});
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);
  const [enviando, setEnviando] = useState<ModoSolicitud | null>(null);
  const [exito, setExito] = useState<Exito | null>(null);

  const enfocarPrimerError = (errs: ErroresSolicitud) => {
    const primero = ORDEN_CAMPOS.find((c) => errs[c]);
    if (!primero || !formRef.current) return;
    const el = formRef.current.querySelector<HTMLElement>(
      `[name="${primero}"]`
    );
    el?.focus();
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  const limpiarError = (campo: CampoSolicitud) => {
    if (errores[campo]) {
      setErrores((prev) => {
        const sig = { ...prev };
        delete sig[campo];
        return sig;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (enviando) return;
    setErrorGeneral(null);

    const submitter = (e.nativeEvent as SubmitEvent).submitter as
      | HTMLButtonElement
      | null;
    const modo: ModoSolicitud =
      consolaActiva && submitter?.value === "tienda" ? "tienda" : "demo";

    const fd = new FormData(e.currentTarget);
    const entrada: Record<string, unknown> = { modo };
    for (const campo of [...ORDEN_CAMPOS, "website"]) {
      entrada[campo] = String(fd.get(campo) ?? "");
    }

    const validacion = validarSolicitud(entrada);
    if (!validacion.ok) {
      setErrores(validacion.errores);
      enfocarPrimerError(validacion.errores);
      return;
    }
    setErrores({});
    setEnviando(modo);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entrada),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (body.campos) {
          setErrores(body.campos);
          enfocarPrimerError(body.campos);
        }
        throw new Error(body.error || "No se pudo enviar el mensaje.");
      }
      setExito({
        resultado: (body.resultado as ResultadoEnvio) || "demo",
        nombre: validacion.datos.nombre,
        email: validacion.datos.email,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setErrorGeneral(
        err instanceof Error ? err.message : "No se pudo enviar el mensaje."
      );
    } finally {
      setEnviando(null);
    }
  };

  if (exito) return <PantallaGracias exito={exito} />;

  const nErrores = Object.keys(errores).length;

  const propsCampo = (campo: CampoSolicitud) => ({
    id: campo,
    name: campo,
    "aria-invalid": errores[campo] ? true : undefined,
    "aria-describedby": errores[campo] ? `${campo}-error` : undefined,
    onChange: () => limpiarError(campo),
  });

  const mensajeError = (campo: CampoSolicitud) =>
    errores[campo] ? (
      <p id={`${campo}-error`} className="mt-1.5 text-sm text-accent-600">
        {errores[campo]}
      </p>
    ) : null;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-sand-200 bg-white p-5 sm:p-8"
    >
      {/* Honeypot anti-spam (oculto) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <fieldset>
        <legend className="text-base font-bold text-sand-900">
          Tu negocio
        </legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="negocio" className="block text-sm font-medium text-sand-700">
              Nombre del negocio
            </label>
            <input
              type="text"
              autoComplete="organization"
              maxLength={80}
              placeholder="Mi Restaurante"
              className={clsx(campoBase, errores.negocio ? campoConError : campoNormal)}
              {...propsCampo("negocio")}
            />
            {mensajeError("negocio")}
          </div>
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-sand-700">
              Tu nombre
            </label>
            <input
              type="text"
              autoComplete="name"
              maxLength={80}
              placeholder="Juan Pérez"
              className={clsx(campoBase, errores.nombre ? campoConError : campoNormal)}
              {...propsCampo("nombre")}
            />
            {mensajeError("nombre")}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-sand-700">
              Correo
            </label>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              className={clsx(campoBase, errores.email ? campoConError : campoNormal)}
              {...propsCampo("email")}
            />
            {mensajeError("email")}
          </div>
          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium text-sand-700">
              WhatsApp
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 mt-1.5 flex items-center pl-4 text-base text-sand-500 sm:text-sm">
                +51
              </span>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="900 000 000"
                maxLength={15}
                className={clsx(
                  campoBase,
                  "pl-14",
                  errores.whatsapp ? campoConError : campoNormal
                )}
                {...propsCampo("whatsapp")}
              />
            </div>
            {mensajeError("whatsapp")}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="distrito" className="block text-sm font-medium text-sand-700">
              Distrito del local
            </label>
            <select
              defaultValue=""
              className={clsx(campoBase, errores.distrito ? campoConError : campoNormal)}
              {...propsCampo("distrito")}
            >
              <option value="" disabled>
                Elige un distrito
              </option>
              <optgroup label="Lima">
                {DISTRITOS_LIMA.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Callao">
                {DISTRITOS_CALLAO.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </optgroup>
              <option value={FUERA_DE_LIMA}>{FUERA_DE_LIMA}</option>
            </select>
            {mensajeError("distrito")}
          </div>
        </div>
      </fieldset>

      {PREGUNTAS.map((pregunta) => (
        <fieldset
          key={pregunta.id}
          className="mt-8 border-t border-sand-100 pt-6"
          aria-describedby={errores[pregunta.id] ? `${pregunta.id}-error` : undefined}
        >
          <legend className="float-left w-full text-base font-bold text-sand-900">
            <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
              {pregunta.numero}
            </span>
            {pregunta.titulo}
          </legend>
          <div className="clear-both grid gap-2.5 pt-4 sm:grid-cols-2">
            {pregunta.opciones.map((opcion) => (
              <label
                key={opcion.valor}
                className={clsx(
                  "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm text-sand-800 transition-colors",
                  "has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:font-semibold has-[:checked]:text-primary-800",
                  "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-500/30",
                  errores[pregunta.id]
                    ? "border-accent-300"
                    : "border-sand-200 hover:border-sand-300 hover:bg-sand-50"
                )}
              >
                <input
                  type="radio"
                  name={pregunta.id}
                  value={opcion.valor}
                  onChange={() => limpiarError(pregunta.id)}
                  className="h-4 w-4 shrink-0 accent-primary-600"
                />
                {opcion.texto}
              </label>
            ))}
          </div>
          {mensajeError(pregunta.id)}
        </fieldset>
      ))}

      <div className="mt-8 border-t border-sand-100 pt-6">
        <label htmlFor="mensaje" className="block text-sm font-medium text-sand-700">
          ¿Algo más que debamos saber? <span className="font-normal text-sand-400">(opcional)</span>
        </label>
        <textarea
          rows={3}
          maxLength={1000}
          placeholder="Por ejemplo, cuántas personas trabajan contigo o qué sistema usas hoy."
          className={clsx(
            campoBase,
            "resize-none",
            errores.mensaje ? campoConError : campoNormal
          )}
          {...propsCampo("mensaje")}
        />
        {mensajeError("mensaje")}
      </div>

      <div aria-live="polite" className="mt-6 space-y-3 empty:hidden">
        {nErrores > 0 && (
          <p className="rounded-xl border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-accent-700">
            {nErrores === 1
              ? "Falta un dato: está marcado arriba."
              : `Faltan ${nErrores} datos: están marcados arriba.`}
          </p>
        )}
        {errorGeneral && nErrores === 0 && (
          <p className="rounded-xl border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-accent-700">
            {errorGeneral}
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
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {consolaActiva ? (
          <>
            <button
              type="submit"
              name="modo"
              value="tienda"
              disabled={enviando !== null}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-sm font-semibold text-white shadow-warm transition-all hover:bg-primary-700 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {enviando === "tienda" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
                </>
              ) : (
                <>
                  <Store className="h-4 w-4" /> Crear mi tienda
                </>
              )}
            </button>
            <button
              type="submit"
              name="modo"
              value="demo"
              disabled={enviando !== null}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-sand-200 bg-white px-6 py-3.5 text-sm font-semibold text-sand-800 transition-all hover:bg-sand-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {enviando === "demo" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
                </>
              ) : (
                "Prefiero que me muestren una demo"
              )}
            </button>
          </>
        ) : (
          <button
            type="submit"
            name="modo"
            value="demo"
            disabled={enviando !== null}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-sm font-semibold text-white shadow-warm transition-all hover:bg-primary-700 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {enviando ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
              </>
            ) : (
              <>
                Pedir una demo <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        )}
        <p className="text-center text-xs text-sand-400">
          Tratamos tus datos según nuestra{" "}
          <Link href="/legal/privacidad" className="underline hover:text-sand-600">
            política de privacidad
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

function PantallaGracias({ exito }: { exito: Exito }) {
  const nombre = primerNombre(exito.nombre);
  let titulo: string;
  let texto: React.ReactNode;

  if (exito.resultado === "tienda") {
    titulo = `Listo, ${nombre}`;
    texto = (
      <>
        Estamos preparando tu tienda. Te llegará un correo a{" "}
        <strong className="text-sand-800">{exito.email}</strong> para entrar a
        tu panel. Mientras tanto, ten a la mano el logo de tu negocio y una
        foto de tu carta.
      </>
    );
  } else if (exito.resultado === "tienda-por-correo") {
    titulo = `Gracias, ${nombre}`;
    texto = (
      <>
        Recibimos tus datos; te escribimos a{" "}
        <strong className="text-sand-800">{exito.email}</strong> para crear tu
        tienda. Mientras tanto, ten a la mano el logo de tu negocio y una foto
        de tu carta.
      </>
    );
  } else {
    titulo = `Gracias, ${nombre}`;
    texto = (
      <>
        Recibimos tu pedido de demo. Te escribimos a{" "}
        <strong className="text-sand-800">{exito.email}</strong> o por WhatsApp
        para coordinarla.
      </>
    );
  }

  return (
    <div
      role="status"
      className="rounded-2xl border border-sand-200 bg-white p-6 py-12 text-center sm:p-10"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
        <CheckCircle2 className="h-8 w-8 text-primary-600" />
      </div>
      <h2 className="mt-4 text-xl font-bold text-sand-900">{titulo}</h2>
      <p className="mx-auto mt-3 max-w-md text-sand-500">{texto}</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800"
      >
        Volver al inicio <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
