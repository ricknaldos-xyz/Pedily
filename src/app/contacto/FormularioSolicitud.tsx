"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2, Store } from "lucide-react";
import clsx from "clsx";
import {
  DISTRITOS_CALLAO,
  DISTRITOS_LIMA,
  FUERA_DE_LIMA,
  ORDEN_CAMPOS,
  PREGUNTAS,
  planDesdeUrl,
  validarSolicitud,
  type CampoSolicitud,
  type ErroresSolicitud,
  type ModoSolicitud,
  type Periodicidad,
  type PlanId,
  type ResultadoEnvio,
} from "@/lib/solicitud";
import { MESES_PAGADOS_ANUAL, PLANES, precioAnual, soles } from "@/lib/planes";

interface Props {
  waHref: string | null;
}

interface Exito {
  resultado: ResultadoEnvio;
  nombre: string;
  email: string;
}

const campoBase =
  "mt-1.5 block w-full rounded-xl border-2 bg-white px-4 py-3 text-base transition-colors focus:outline-none focus:ring-2 sm:text-sm";
const campoNormal =
  "border-tinta/15 focus:border-chicha-600 focus:ring-chicha-600/20";
const campoConError =
  "border-rocoto-500 focus:border-rocoto-500 focus:ring-rocoto-500/20";

function primerNombre(nombre: string): string {
  return nombre.split(/\s+/)[0] || nombre;
}

export function FormularioSolicitud({ waHref }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errores, setErrores] = useState<ErroresSolicitud>({});
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);
  const [enviando, setEnviando] = useState<ModoSolicitud | null>(null);
  const [exito, setExito] = useState<Exito | null>(null);
  // Q-06: plan y periodicidad. Si se llega desde «Crear mi tienda» de un plan
  // (`/contacto?plan=…&periodicidad=…`, `enlaceSolicitud`), vienen elegidos.
  // La página se genera al compilar: se leen del enlace al montar.
  const [plan, setPlan] = useState<PlanId | "">("");
  const [periodicidad, setPeriodicidad] = useState<Periodicidad>("mensual");
  useEffect(() => {
    const desdeUrl = planDesdeUrl(window.location.search);
    if (desdeUrl.plan) setPlan(desdeUrl.plan);
    setPeriodicidad(desdeUrl.periodicidad);
  }, []);

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
      submitter?.value === "tienda" ? "tienda" : "demo";

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
      <p id={`${campo}-error`} className="mt-1.5 text-sm text-rocoto-600">
        {errores[campo]}
      </p>
    ) : null;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border-2 border-tinta bg-white p-5 shadow-[0_8px_0_0_#24102e] sm:p-8"
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
        <legend className="font-display text-xl font-extrabold text-tinta">
          Tu negocio
        </legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="negocio" className="block text-sm font-semibold text-tinta">
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
            <label htmlFor="nombre" className="block text-sm font-semibold text-tinta">
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
            <label htmlFor="email" className="block text-sm font-semibold text-tinta">
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
            <label htmlFor="whatsapp" className="block text-sm font-semibold text-tinta">
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
            <label htmlFor="distrito" className="block text-sm font-semibold text-tinta">
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
          className="mt-8 border-t border-dashed border-tinta/20 pt-6"
          aria-describedby={errores[pregunta.id] ? `${pregunta.id}-error` : undefined}
        >
          <legend className="float-left w-full font-display text-lg font-bold leading-snug text-tinta">
            <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-tinta bg-aji-500 font-mono text-xs font-bold text-tinta">
              {pregunta.numero}
            </span>
            {pregunta.titulo}
          </legend>
          <div className="clear-both grid gap-2.5 pt-4 sm:grid-cols-2">
            {pregunta.opciones.map((opcion) => (
              <label
                key={opcion.valor}
                className={clsx(
                  "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 text-sm text-sand-800 transition-colors",
                  "has-[:checked]:border-tinta has-[:checked]:bg-aji-100 has-[:checked]:font-semibold has-[:checked]:text-tinta",
                  "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-chicha-600/30",
                  errores[pregunta.id]
                    ? "border-rocoto-300"
                    : "border-tinta/10 hover:border-tinta/30 hover:bg-papel"
                )}
              >
                <input
                  type="radio"
                  name={pregunta.id}
                  value={opcion.valor}
                  onChange={() => limpiarError(pregunta.id)}
                  className="h-4 w-4 shrink-0 accent-chicha-600"
                />
                {opcion.texto}
              </label>
            ))}
          </div>
          {mensajeError(pregunta.id)}
        </fieldset>
      ))}

      <fieldset className="mt-8 border-t border-dashed border-tinta/20 pt-6">
        <legend className="float-left w-full font-display text-lg font-bold leading-snug text-tinta">
          Tu plan <span className="font-sans text-sm font-normal text-sand-400">(opcional)</span>
        </legend>
        <div className="clear-both flex flex-wrap items-center justify-between gap-3 pt-3">
          <p className="text-sm text-sand-700">Si no lo tienes claro, te ayudamos a elegir.</p>
          <div className="inline-flex rounded-full border-2 border-tinta/15 p-1">
            {(
              [
                { valor: "mensual", texto: "Mensual" },
                { valor: "anual", texto: "Anual · 2 meses gratis" },
              ] as const
            ).map((op) => (
              <label
                key={op.valor}
                className={clsx(
                  "cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
                  "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-chicha-600/30",
                  periodicidad === op.valor ? "bg-tinta text-white" : "text-sand-700 hover:text-tinta"
                )}
              >
                <input
                  type="radio"
                  name="periodicidad"
                  value={op.valor}
                  checked={periodicidad === op.valor}
                  onChange={() => setPeriodicidad(op.valor)}
                  className="sr-only"
                />
                {op.texto}
              </label>
            ))}
          </div>
        </div>
        <div className="grid gap-2.5 pt-4 sm:grid-cols-2">
          {[
            ...PLANES.map((p) => ({
              valor: p.id as PlanId | "",
              titulo: p.nombre,
              detalle:
                periodicidad === "anual"
                  ? `${soles(precioAnual(p))} al año (pagas ${MESES_PAGADOS_ANUAL} meses)`
                  : `${soles(p.precioMensual)} al mes`,
            })),
            { valor: "" as PlanId | "", titulo: "Aún no lo sé", detalle: "Lo vemos contigo" },
          ].map((op) => (
            <label
              key={op.valor || "sin-plan"}
              className={clsx(
                "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 text-sm text-sand-800 transition-colors",
                "has-[:checked]:border-tinta has-[:checked]:bg-aji-100 has-[:checked]:text-tinta",
                "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-chicha-600/30",
                "border-tinta/10 hover:border-tinta/30 hover:bg-papel"
              )}
            >
              <input
                type="radio"
                name="plan"
                value={op.valor}
                checked={plan === op.valor}
                onChange={() => setPlan(op.valor)}
                className="h-4 w-4 shrink-0 accent-chicha-600"
              />
              <span>
                <span className="block font-semibold text-tinta">{op.titulo}</span>
                <span className="block text-xs text-sand-700">{op.detalle}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 border-t border-dashed border-tinta/20 pt-6">
        <label htmlFor="mensaje" className="block text-sm font-semibold text-tinta">
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
          <p className="rounded-xl border-2 border-rocoto-300 bg-rocoto-50 px-4 py-3 text-sm text-rocoto-700">
            {nErrores === 1
              ? "Falta un dato: está marcado arriba."
              : `Faltan ${nErrores} datos: están marcados arriba.`}
          </p>
        )}
        {errorGeneral && nErrores === 0 && (
          <p className="rounded-xl border-2 border-rocoto-300 bg-rocoto-50 px-4 py-3 text-sm text-rocoto-700">
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
        <>
            <button
              type="submit"
              name="modo"
              value="tienda"
              disabled={enviando !== null}
              className="inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-xl border-2 border-tinta bg-aji-500 px-6 text-base font-semibold text-tinta shadow-[0_4px_0_0_#24102e] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#24102e] active:translate-y-0.5 active:shadow-[0_1px_0_0_#24102e] disabled:cursor-not-allowed disabled:opacity-60"
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
              className="inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-xl border-2 border-tinta/15 bg-white px-6 text-base font-semibold text-tinta transition-all hover:border-tinta/40 disabled:cursor-not-allowed disabled:opacity-60"
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
        <p className="text-center text-xs text-sand-700">
          Tratamos tus datos según nuestra{" "}
          <Link href="/legal/privacidad" className="font-semibold text-chicha-700 underline">
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
      className="rounded-3xl border-2 border-tinta bg-white p-6 py-12 text-center shadow-[0_8px_0_0_#24102e] sm:p-10"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-hierba-50">
        <CheckCircle2 aria-hidden className="h-8 w-8 text-hierba-600" />
      </div>
      <h2 className="mt-4 font-display text-2xl font-extrabold text-tinta">{titulo}</h2>
      <p className="mx-auto mt-3 max-w-md text-sand-700">{texto}</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-chicha-700 underline underline-offset-2"
      >
        Volver al inicio <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
