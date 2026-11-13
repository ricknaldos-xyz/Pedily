/**
 * Solicitud «Quiero Pedily» (tarea L-13; diseño en el plan, D-alta-autonoma §2,
 * etapa 0). La usan a la vez el formulario de /contacto y la ruta
 * /api/contact, para que las dos validen exactamente lo mismo.
 */

export type ModoSolicitud = "tienda" | "demo";

export interface Opcion {
  valor: string;
  texto: string;
}

export interface Pregunta {
  id: "canalHoy" | "prioridad" | "cuando";
  numero: 1 | 2 | 3;
  titulo: string;
  opciones: readonly Opcion[];
}

export const PREGUNTAS: readonly Pregunta[] = [
  {
    id: "canalHoy",
    numero: 1,
    titulo: "¿Hoy recibes pedidos por delivery o para recoger?",
    opciones: [
      { valor: "whatsapp", texto: "Sí, por WhatsApp" },
      { valor: "agregadores", texto: "Sí, por agregadores" },
      { valor: "solo-local", texto: "Solo en el local" },
      { valor: "aun-no-abro", texto: "Aún no abro" },
    ],
  },
  {
    id: "prioridad",
    numero: 2,
    titulo: "¿Qué quieres mejorar primero?",
    opciones: [
      { valor: "web-sin-comision", texto: "Vender por mi web sin comisión" },
      { valor: "bot-whatsapp", texto: "Que WhatsApp tome pedidos solo" },
      { valor: "kiosko", texto: "Kiosko en el local" },
      { valor: "operacion", texto: "Ordenar caja, inventario y boletas" },
    ],
  },
  {
    id: "cuando",
    numero: 3,
    titulo: "¿Cuándo quieres empezar?",
    opciones: [
      { valor: "esta-semana", texto: "Esta semana" },
      { valor: "este-mes", texto: "Este mes" },
      { valor: "solo-mirando", texto: "Solo estoy mirando" },
    ],
  },
];

/** Los 43 distritos de la provincia de Lima y los 7 del Callao. */
export const DISTRITOS_LIMA: readonly string[] = [
  "Ancón",
  "Ate",
  "Barranco",
  "Breña",
  "Carabayllo",
  "Cercado de Lima",
  "Chaclacayo",
  "Chorrillos",
  "Cieneguilla",
  "Comas",
  "El Agustino",
  "Independencia",
  "Jesús María",
  "La Molina",
  "La Victoria",
  "Lince",
  "Los Olivos",
  "Lurigancho-Chosica",
  "Lurín",
  "Magdalena del Mar",
  "Miraflores",
  "Pachacámac",
  "Pucusana",
  "Pueblo Libre",
  "Puente Piedra",
  "Punta Hermosa",
  "Punta Negra",
  "Rímac",
  "San Bartolo",
  "San Borja",
  "San Isidro",
  "San Juan de Lurigancho",
  "San Juan de Miraflores",
  "San Luis",
  "San Martín de Porres",
  "San Miguel",
  "Santa Anita",
  "Santa María del Mar",
  "Santa Rosa",
  "Santiago de Surco",
  "Surquillo",
  "Villa El Salvador",
  "Villa María del Triunfo",
];

export const DISTRITOS_CALLAO: readonly string[] = [
  "Bellavista",
  "Callao",
  "Carmen de la Legua-Reynoso",
  "La Perla",
  "La Punta",
  "Mi Perú",
  "Ventanilla",
];

export const FUERA_DE_LIMA = "Otro lugar del Perú";

const DISTRITOS_VALIDOS = new Set<string>([
  ...DISTRITOS_LIMA,
  ...DISTRITOS_CALLAO,
  FUERA_DE_LIMA,
]);

export interface Solicitud {
  modo: ModoSolicitud;
  negocio: string;
  nombre: string;
  email: string;
  /** Celular peruano normalizado: 9 dígitos que empiezan por 9. */
  whatsapp: string;
  distrito: string;
  canalHoy: string;
  prioridad: string;
  cuando: string;
  mensaje: string;
}

export type CampoSolicitud = Exclude<keyof Solicitud, "modo">;
export type ErroresSolicitud = Partial<Record<CampoSolicitud, string>>;

/** Orden en el que aparecen los campos en pantalla (para enfocar el primero con error). */
export const ORDEN_CAMPOS: readonly CampoSolicitud[] = [
  "negocio",
  "nombre",
  "email",
  "whatsapp",
  "distrito",
  "canalHoy",
  "prioridad",
  "cuando",
  "mensaje",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_TEXTO = 80;
const MAX_MENSAJE = 1000;

/** Quita espacios, guiones y el prefijo +51; devuelve solo dígitos. */
export function normalizarWhatsapp(valor: string): string {
  const digitos = valor.replace(/\D/g, "");
  return digitos.length === 11 && digitos.startsWith("51")
    ? digitos.slice(2)
    : digitos;
}

function texto(valor: unknown): string {
  return typeof valor === "string" ? valor.trim() : "";
}

export type ResultadoValidacion =
  | { ok: true; datos: Solicitud }
  | { ok: false; errores: ErroresSolicitud };

export function validarSolicitud(
  entrada: Record<string, unknown>
): ResultadoValidacion {
  const errores: ErroresSolicitud = {};

  const negocio = texto(entrada.negocio);
  const nombre = texto(entrada.nombre);
  const email = texto(entrada.email);
  const whatsapp = normalizarWhatsapp(texto(entrada.whatsapp));
  const distrito = texto(entrada.distrito);
  const mensaje = texto(entrada.mensaje);
  const modo: ModoSolicitud = entrada.modo === "tienda" ? "tienda" : "demo";

  if (!negocio) errores.negocio = "Escribe el nombre de tu negocio.";
  else if (negocio.length > MAX_TEXTO)
    errores.negocio = `Máximo ${MAX_TEXTO} caracteres.`;

  if (!nombre) errores.nombre = "Escribe tu nombre.";
  else if (nombre.length > MAX_TEXTO)
    errores.nombre = `Máximo ${MAX_TEXTO} caracteres.`;

  if (!email) errores.email = "Escribe tu correo.";
  else if (email.length > 254 || !EMAIL_RE.test(email))
    errores.email = "Revisa el correo: debe ser como nombre@correo.com.";

  if (!whatsapp) errores.whatsapp = "Escribe tu número de WhatsApp.";
  else if (!/^9\d{8}$/.test(whatsapp))
    errores.whatsapp = "Debe ser un celular de 9 dígitos que empiece por 9.";

  if (!DISTRITOS_VALIDOS.has(distrito))
    errores.distrito = "Elige el distrito de tu local.";

  const respuestas: Record<Pregunta["id"], string> = {
    canalHoy: "",
    prioridad: "",
    cuando: "",
  };
  for (const pregunta of PREGUNTAS) {
    const valor = texto(entrada[pregunta.id]);
    if (pregunta.opciones.some((o) => o.valor === valor)) {
      respuestas[pregunta.id] = valor;
    } else {
      errores[pregunta.id] = "Elige una respuesta.";
    }
  }

  if (mensaje.length > MAX_MENSAJE)
    errores.mensaje = `Máximo ${MAX_MENSAJE} caracteres.`;

  if (Object.keys(errores).length > 0) return { ok: false, errores };

  return {
    ok: true,
    datos: {
      modo,
      negocio,
      nombre,
      email,
      whatsapp,
      distrito,
      ...respuestas,
      mensaje,
    },
  };
}

/** Texto visible de una respuesta, p. ej. para el correo. */
export function textoRespuesta(id: Pregunta["id"], valor: string): string {
  const pregunta = PREGUNTAS.find((p) => p.id === id);
  return pregunta?.opciones.find((o) => o.valor === valor)?.texto ?? valor;
}

/** Respuesta de /api/contact cuando la solicitud llegó a alguien. */
export type ResultadoEnvio =
  /** La consola de altas la recibió: el alta sigue su curso. */
  | "tienda"
  /** Se pidió crear la tienda, la consola falló y quedó en el correo. */
  | "tienda-por-correo"
  /** Pedido de demo recibido por correo. */
  | "demo";
