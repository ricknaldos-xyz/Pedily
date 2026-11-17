/**
 * Catálogo de páginas de solución (/soluciones/<slug>). Una sola fuente para
 * el menú grande, el mosaico de la portada, el pie, el sitemap y la plantilla.
 *
 * Regla: cada función publicada sale del inventario vendible
 * (`research_notes/Pedily landing v2 2026-11-15/02_inventario_vendible.md`,
 * LV2-B, 15-nov-2026), que trae la ruta del código de cada una. La columna
 * `ref` de cada función apunta a su fila del inventario (p. ej. «2.7»). Lo que
 * nace apagado lleva `opcion: true` y se presenta como «se enciende en tu
 * restaurante». Nada de cifras de clientes.
 */
import { PREGUNTA_CARTA_QR, PREGUNTA_DESCARGAR, PREGUNTA_MESA_PRECIO, PREGUNTA_RAPPI_PEDIDOSYA, type Pregunta } from "./faq";
import type { IntegracionId } from "./integraciones";

export type GrupoId = "vende" | "opera" | "vuelven";

export const GRUPOS: { id: GrupoId; nombre: string; bajada: string }[] = [
  { id: "vende", nombre: "Vende", bajada: "Tus canales propios, sin comisión" },
  { id: "opera", nombre: "Opera", bajada: "Cocina, caja, boletas y almacén" },
  { id: "vuelven", nombre: "Haz que vuelvan", bajada: "Clientes, promos y números" },
];

export type PlanMinimo = "tienda" | "whatsapp" | "completo";

export type Escena =
  | "chat"
  | "tienda"
  | "kiosko"
  | "mesa"
  | "programados"
  | "cocina"
  | "caja"
  | "boleta"
  | "delivery"
  | "inventario"
  | "clientes"
  | "reportes";

export type Icono =
  | "chat"
  | "tienda"
  | "kiosko"
  | "qr"
  | "reloj"
  | "cocina"
  | "caja"
  | "boleta"
  | "moto"
  | "almacen"
  | "clientes"
  | "reportes"
  | "enchufe";

export interface Funcion {
  texto: string;
  /** Fila del inventario vendible (02_inventario_vendible.md). */
  ref: string;
  /** Nace apagada: se enciende por restaurante. */
  opcion?: boolean;
  /**
   * Integración con un tercero (L-02, 16-nov): `ref` es «INT-<id>» y la
   * página enlaza a /integraciones#<id>, donde está su condición de activación.
   */
  integracion?: IntegracionId;
}

export interface Solucion {
  slug: string;
  grupo: GrupoId;
  nombre: string;
  /** Una línea para el menú grande y el mosaico. */
  linea: string;
  icono: Icono;
  plan: PlanMinimo;
  /** Aclaración del plan cuando una parte va en otro plan. */
  notaPlan?: string;
  /** Se suma al plan como complemento de pago (16-nov: «mesa», +S/ 150 al mes). */
  complemento?: "mesa";
  titulo: string;
  bajada: string;
  /** «Qué es», en una frase (definición para buscadores). */
  definicion: string;
  escena: Escena;
  pasos: { titulo: string; texto: string }[];
  funciones: Funcion[];
  necesitas: { item: string; detalle: string }[];
  /** Lo que no hace, dicho claro (inventario §20). */
  noHace?: string[];
  vecinos: string[];
  preguntas: Pregunta[];
  /** Palabras clave para la etiqueta <meta>. */
  seo: { titulo: string; descripcion: string };
}

export const SOLUCIONES: Solucion[] = [
  // ───────────────────────────────── VENDE ─────────────────────────────────
  {
    slug: "asistente-whatsapp",
    grupo: "vende",
    nombre: "Asistente de WhatsApp con IA",
    linea: "Chat que conversa + mini-app para comprar dentro de WhatsApp",
    icono: "chat",
    plan: "whatsapp",
    titulo: "Tu WhatsApp atiende en hora punta: un chat que conversa y una mini-app para comprar",
    bajada:
      "Tu cliente escribe como habla y el asistente arma el pedido con tu carta y tus precios. Desde el mismo chat se abre tu mini-app, dentro de WhatsApp y sin descargar nada: ahí elige, pone su dirección y paga. El pedido entra a cocina. Si pide una persona, tu equipo sigue el chat.",
    definicion:
      "Un asistente de pedidos por WhatsApp es un programa con inteligencia artificial que atiende el número de WhatsApp Business de tu restaurante: entiende lo que escribe el cliente, consulta tu carta y arma el pedido. Para elegir y pagar le abre una mini-app con la marca de tu restaurante dentro del mismo WhatsApp, y el pedido pagado queda en tu panel, listo para cocina.",
    escena: "chat",
    pasos: [
      {
        titulo: "Entiende como habla tu cliente",
        texto:
          "«medio pollo y una jarra pa’ Jesús María». Encuentra los platos aunque los escriban mal, entiende notas de voz y cambia o quita lo que el cliente diga.",
      },
      {
        titulo: "Pregunta lo que falta y no inventa precios",
        texto:
          "Cremas y tamaño. Recomienda acompañamientos y bebidas. Solo ofrece lo que está en tu carta, con tus precios: el total lo calcula el servidor y una guarda corrige cualquier precio que no cuadre.",
      },
      {
        titulo: "Abre la mini-app para comprar",
        texto:
          "Con el botón «Ver carta» se abre tu mini-app dentro de WhatsApp, con el carrito del chat ya cargado. Ahí elige delivery o recojo y paga con Yape o tarjeta en tu cuenta Culqi, o con el QR de tu Yape o Plin. El pedido entra al panel con aviso.",
      },
      {
        titulo: "Tu equipo nunca pierde el control",
        texto:
          "Si el cliente pide una persona, te avisa y tu equipo sigue el chat desde el panel; luego lo devuelve al asistente. Antes de abrirlo, lo pruebas en el Playground.",
      },
    ],
    funciones: [
      { texto: "Arma el pedido conversando, sobre tu carta real", ref: "2.1" },
      { texto: "Pregunta cremas y tamaño antes de cerrar", ref: "2.2" },
      { texto: "Cambia o quita lo que el cliente diga («sácale la chicha»)", ref: "2.3" },
      { texto: "Encuentra platos aunque los escriban mal", ref: "2.4" },
      { texto: "Entiende notas de voz", ref: "2.11" },
      { texto: "Entiende la foto de un plato que manda el cliente", ref: "2.12", opcion: true },
      { texto: "Mini-app con tu marca dentro de WhatsApp, sin descargar nada: carta con fotos, tamaños y cremas", ref: "2.5" },
      { texto: "Carrito unido entre chat y mini-app: empiezas escribiendo y terminas tocando", ref: "2.6" },
      { texto: "En la mini-app: delivery con su dirección o recojo en tu local", ref: "2.7" },
      { texto: "Cobra en la mini-app con Yape o tarjeta, o con el QR de Yape o Plin de tu local", ref: "2.7" },
      { texto: "En la mini-app: programar para más tarde", ref: "12.2", opcion: true },
      { texto: "Nunca inventa precios: el total lo calcula el servidor", ref: "2.8" },
      { texto: "Pocos mensajes por pedido: texto, foto y botones viajan juntos", ref: "2.9" },
      { texto: "Avisa lo importante: confirmado, en camino, listo para recoger", ref: "2.10" },
      { texto: "Responde «¿y mi pedido?» con el estado real", ref: "2.14" },
      { texto: "Repite «lo de siempre» en un mensaje", ref: "2.16" },
      { texto: "Dice si llega a la dirección, cuánto cuesta el envío y cuánto demora", ref: "2.17" },
      { texto: "Contesta horarios y preguntas frecuentes de tu local", ref: "2.18" },
      { texto: "Sugiere acompañamientos y bebidas", ref: "2.19" },
      { texto: "Aplica y quita cupones en la conversación", ref: "2.20" },
      { texto: "Programa pedidos por chat («para mañana a la 1»)", ref: "2.13", opcion: true },
      { texto: "Con la tienda cerrada, avisa y ofrece programar", ref: "2.28" },
      { texto: "Pasa el chat a una persona y tu equipo lo devuelve al terminar", ref: "2.22" },
      { texto: "Resumen de la conversación y respuestas sugeridas para tu operador", ref: "2.23", opcion: true },
      { texto: "Avisa que es una IA y solo habla de tu restaurante", ref: "2.24–2.25" },
      { texto: "Freno de abuso: máximo 30 turnos de IA por hora y cliente", ref: "2.26" },
      { texto: "«BAJA» registrada: deja de recibir promociones", ref: "2.27" },
      { texto: "Modelo rápido para lo simple y uno más capaz para quejas o pedidos largos", ref: "2.29" },
      { texto: "Vale de compensación automático ante una queja", ref: "2.30", opcion: true },
      { texto: "Tope mensual de gasto con avisos al 50, 80 y 100 %", ref: "10.8–10.10", opcion: true },
      { texto: "Tus platos del catálogo de Meta dentro del chat, al carrito de WhatsApp", ref: "INT-whatsapp-meta", opcion: true, integracion: "whatsapp-meta" },
      { texto: "Formulario de pedido de WhatsApp (Flows) para quien prefiere tocar", ref: "INT-whatsapp-meta", opcion: true, integracion: "whatsapp-meta" },
      { texto: "Las ventas de tus anuncios que abren WhatsApp, informadas a Meta", ref: "INT-whatsapp-meta", opcion: true, integracion: "whatsapp-meta" },
    ],
    necesitas: [
      {
        item: "Un número de WhatsApp Business en la API oficial de Meta",
        detalle: "Es el número de tu restaurante. Lo conectamos contigo en el alta.",
      },
      {
        item: "Tu cuenta Culqi para cobrar con enlace",
        detalle: "Mientras Culqi te aprueba, el asistente cobra con el QR de tu Yape o Plin y tú verificas el comprobante en el panel.",
      },
      {
        item: "Los mensajes de Meta, a tu tarjeta",
        detalle: "1.000 mensajes de servicio gratis al mes; luego S/ 0,0998 por mensaje (precio público de Meta, noviembre de 2026).",
      },
      {
        item: "Plan Tienda + WhatsApp o Completo",
        detalle: "Incluye un cupo mensual de conversaciones; en Completo es 3 veces mayor.",
      },
    ],
    noHace: [
      "No atiende otras redes sociales: solo WhatsApp.",
      "No cobra escribiendo en el chat: la dirección y el pago se hacen en la mini-app, que se abre desde el mismo chat.",
    ],
    vecinos: ["tienda-web", "cocina", "caja-y-pagos", "clientes-y-campanas"],
    preguntas: [
      {
        pregunta: "¿El asistente de WhatsApp es un formulario o conversa?",
        respuesta:
          "Conversa. Tu cliente escribe como le escribiría a tu cajero («medio pollo y una jarra de chicha»), el asistente le pregunta lo que falta (cremas, tamaño), arma el pedido solo con los platos y precios de tu carta y le abre la mini-app para poner su dirección y pagar con Yape, tarjeta o QR. El pedido pagado pasa a cocina.",
      },
      PREGUNTA_DESCARGAR,
      {
        pregunta: "¿Puede equivocarse con los precios?",
        respuesta:
          "El total no lo escribe la IA: lo calcula el servidor con tu carta. Además, una guarda revisa cada precio que aparece en la respuesta y corrige el que no cuadre antes de enviarla.",
      },
      {
        pregunta: "¿Qué pasa si el cliente quiere hablar con una persona?",
        respuesta:
          "El asistente te avisa y el chat aparece en «Conversaciones», en la sección «Necesita una persona». Tu equipo lo toma, responde desde el panel y, cuando termina, lo devuelve al asistente.",
      },
      {
        pregunta: "¿Cuánto me cuestan los mensajes de WhatsApp?",
        respuesta:
          "Meta los cobra directo a tu tarjeta: 1.000 mensajes de servicio gratis al mes y luego S/ 0,0998 por mensaje. El asistente junta texto, foto y botones para gastar pocos mensajes por pedido, y puedes ponerle un tope mensual de gasto con avisos al 50, 80 y 100 %.",
      },
      {
        pregunta: "¿Lo puedo probar antes de abrirlo a mis clientes?",
        respuesta:
          "Sí. En el Playground del panel chateas con el asistente sin usar WhatsApp, simulas un pago bueno o fallido y ves el carrito, la dirección y el pedido que va armando.",
      },
    ],
    seo: {
      titulo: "Asistente de pedidos por WhatsApp con IA para restaurantes",
      descripcion:
        "Un asistente de WhatsApp que conversa y arma el pedido, más una mini-app con tu marca dentro de WhatsApp para elegir, pagar con Yape o tarjeta y mandar a cocina. Para restaurantes en Perú, desde S/ 499 al mes con IGV.",
    },
  },
  {
    slug: "tienda-web",
    grupo: "vende",
    nombre: "Tienda web con tu marca",
    linea: "Tu carta online y tu pedido, sin comisión",
    icono: "tienda",
    plan: "tienda",
    titulo: "Tu propia tienda online: tu marca, tu carta y 0 % de comisión",
    bajada:
      "Tus clientes piden desde el celular, eligen tamaño y cremas, pagan con Yape o tarjeta y el dinero va directo a tu cuenta. Sin apps de por medio y sin registrarse si no quieren.",
    definicion:
      "Una tienda web de pedidos es la página de tu restaurante donde el cliente ve tu carta, arma su pedido, elige delivery o recojo y paga en línea. Con Pedily es tuya: tu marca, tu dirección y tus clientes.",
    escena: "tienda",
    pasos: [
      {
        titulo: "Tu carta, como en tu local",
        texto:
          "Categorías, fotos y ficha de cada plato. Tamaños, extras y notas, con cremas que tienen mínimo, máximo e incluidas gratis.",
      },
      {
        titulo: "Comprar es fácil",
        texto:
          "Sin registrarse, con un carrito que recuerda el pedido. Delivery o recojo, y si lo enciendes, para la hora que elija tu cliente.",
      },
      {
        titulo: "Paga y el dinero va a tu cuenta",
        texto:
          "Yape (hasta S/ 2 000) o tarjeta, cobrados en tu cuenta Culqi, o el QR de tu Yape o Plin con verificación en el panel. Si el banco pide verificación, se abre su formulario sin perder la venta.",
      },
      {
        titulo: "Y vuelve a pedir",
        texto:
          "Cuenta del cliente, «Mis pedidos» con su estado, repetir el último pedido, cupones y saldo a favor.",
      },
    ],
    funciones: [
      { texto: "Carta online con categorías, fotos y ficha de cada plato", ref: "1.1" },
      { texto: "Carta digital por QR: un QR en tu local abre tu carta para verla, en todos los planes", ref: "1.1" },
      { texto: "Tamaños o presentaciones por plato, cada uno a su precio", ref: "1.2" },
      { texto: "Cremas y extras con mínimo, máximo e incluidas gratis", ref: "1.3" },
      { texto: "«Agotado» automático cuando se acaba el insumo, con «Solo quedan N»", ref: "1.4", opcion: true },
      { texto: "Carrito que recuerda el pedido", ref: "1.5" },
      { texto: "Compra como invitado, sin registrarse", ref: "1.6" },
      { texto: "Delivery o recojo en tienda, a elección del cliente", ref: "1.7" },
      { texto: "Entrega en condominios (portería, torre, departamento)", ref: "1.8", opcion: true },
      { texto: "Pedir para lo antes posible o programar día y hora", ref: "1.9", opcion: true },
      { texto: "Cupón de descuento en el checkout", ref: "1.10" },
      { texto: "Pago con Yape o tarjeta en tu cuenta Culqi", ref: "1.11" },
      { texto: "Pago con el QR de tu Yape o Plin: el cliente manda su número de operación o la captura y tú verificas en el panel", ref: "G-09" },
      { texto: "Verificación del banco (3D Secure) sin perder la venta", ref: "1.12", opcion: true },
      { texto: "Cuenta del cliente: registro, recuperar clave y cerrar sesiones", ref: "1.13" },
      { texto: "Entrar con Google", ref: "1.14", opcion: true },
      { texto: "Tarjetas guardadas para volver a pagar rápido", ref: "1.16" },
      { texto: "Varias direcciones guardadas", ref: "1.17" },
      { texto: "«Mis pedidos» con el estado al día", ref: "1.18" },
      { texto: "Repetir el último pedido en dos toques", ref: "1.19" },
      { texto: "El cliente califica su pedido", ref: "1.20" },
      { texto: "Página de promociones y combos", ref: "1.21", opcion: true },
      { texto: "Libro de Reclamaciones virtual con copia al cliente", ref: "1.23" },
      { texto: "Términos, privacidad, cookies y política de delivery", ref: "1.24" },
      { texto: "Lista para Google: platos en el mapa del sitio y vista previa al compartir", ref: "1.25" },
      { texto: "Se instala como acceso directo en el celular", ref: "1.26" },
      { texto: "Tu logo, tus colores y tu tipografía, sin «Desarrollado por…»", ref: "16.1" },
      { texto: "Botón «Pedir en línea» de Google: guía y comprobación desde el panel", ref: "INT-google", opcion: true, integracion: "google" },
      { texto: "Google Analytics 4 y Tag Manager: producto visto, carrito y compra", ref: "INT-google", opcion: true, integracion: "google" },
      { texto: "Píxel de Meta y de TikTok, y la compra enviada también desde el servidor", ref: "INT-meta-tiktok", opcion: true, integracion: "meta-tiktok" },
      { texto: "Aviso de cookies: nada se mide hasta que el cliente acepta", ref: "INT-google", opcion: true, integracion: "google" },
    ],
    necesitas: [
      {
        item: "Tu cuenta Culqi para cobrar en línea",
        detalle: "Culqi cobra 3,44 % + US$ 0,20 por venta con tarjeta o Yape (precio público, noviembre de 2026).",
      },
      {
        item: "Tu carta",
        detalle: "Una foto o PDF que la IA convierte en platos y precios para que los revises, o la plantilla de carta.",
      },
      {
        item: "Tu logo y tus colores",
        detalle: "Tu tienda sale con tu marca y con tu dirección dentro de Pedily.",
      },
    ],
    noHace: [
      "Un pago con el QR de tu Yape o Plin no se confirma solo: alguien de tu equipo verifica el comprobante en el panel. La boleta sale después de verificarlo.",
      "No es una app de tienda de aplicaciones: es una web que se instala como acceso directo.",
    ],
    vecinos: ["asistente-whatsapp", "pedidos-programados", "caja-y-pagos", "delivery"],
    preguntas: [
      PREGUNTA_CARTA_QR,
      {
        pregunta: "¿Mis clientes tienen que registrarse para pedir?",
        respuesta:
          "No. Pueden comprar como invitados. Si crean su cuenta, guardan direcciones y tarjetas, ven el estado de sus pedidos y repiten el último en dos toques.",
      },
      {
        pregunta: "¿Puedo cambiar precios, fotos y platos yo mismo?",
        respuesta:
          "Sí, desde «Productos» en el panel: precio, precio promocional, foto, tamaños, cremas y extras. Lo que cambias se ve en la tienda, en el kiosko y en el asistente.",
      },
      {
        pregunta: "¿Cómo se marca un plato agotado?",
        respuesta:
          "Si cargas tus recetas, la tienda marca «Agotado» sola cuando se acaba un insumo, incluso por tamaño, y avisa «Solo quedan N». Es una opción que se enciende al cargar los insumos.",
      },
      {
        pregunta: "¿Mi tienda aparece en Google?",
        respuesta:
          "Está preparada para eso: tiene mapa del sitio con tus platos, títulos por página y vista previa con foto cuando alguien comparte el enlace por WhatsApp. Además, el panel te guía para poner tu tienda en el botón «Pedir en línea» de tu Perfil de Empresa de Google y comprueba antes que Google puede abrir tu carta.",
      },
      {
        pregunta: "¿Puedo cobrar con el QR de mi Yape en la tienda web?",
        respuesta:
          "Sí. Si subes tu QR o tu número de cobro en el panel, el checkout ofrece «Yape o Plin con el QR del local». El cliente paga, manda su número de operación o la captura desde la página de su pedido, y tú lo verificas en el panel; al verificar o rechazar le llega un correo. Yape y tarjeta por Culqi se confirman solos.",
      },
    ],
    seo: {
      titulo: "Tienda web de pedidos para restaurantes, sin comisión",
      descripcion:
        "Tu tienda online con tu marca: carta con tamaños y cremas, delivery o recojo, pago con Yape o tarjeta en tu cuenta y 0 % de comisión. Desde S/ 249 al mes con IGV.",
    },
  },
  {
    slug: "kiosko",
    grupo: "vende",
    nombre: "Kiosko de autoservicio",
    linea: "Tu cliente pide y paga solo en tu local",
    icono: "kiosko",
    plan: "completo",
    titulo: "Un kiosko donde tu cliente pide y paga solo, con tu marca",
    bajada:
      "Cola más corta en hora punta: la misma carta y precios que tu web, combos y cremas bien cobrados, pago con tarjeta o Yape, o «pagar en caja». El pedido entra al panel y a cocina.",
    definicion:
      "Un kiosko de autoservicio es una pantalla táctil en tu local donde el cliente arma su pedido y paga sin pasar por el cajero. El de Pedily funciona en el navegador de la pantalla, en modo kiosko.",
    escena: "kiosko",
    pasos: [
      {
        titulo: "Bienvenida y carta con fotos",
        texto: "Con tu logo y tus colores. Si el cliente se va a mitad, la pantalla vuelve sola al inicio.",
      },
      {
        titulo: "Combos y cremas, igual que en caja",
        texto: "«Las N primeras gratis» se cobran exacto. Los agotados se ven al instante: la carta se relee cada 30 segundos.",
      },
      {
        titulo: "Paga ahí mismo o en caja",
        texto:
          "Tarjeta o Yape en la misma pantalla, con tu cuenta Culqi. Si prefiere pagar con el cajero, el pedido entra marcado «Por cobrar en caja».",
      },
      {
        titulo: "Número de pedido y comanda impresa",
        texto: "El cliente recibe su número para el mostrador; con impresora térmica, cocina recibe el papel sin que nadie toque nada.",
      },
    ],
    funciones: [
      { texto: "Bienvenida, carta, carrito, pago y «gracias»", ref: "4.1" },
      { texto: "Vuelve solo al inicio si el cliente se va", ref: "4.2" },
      { texto: "Combos y cremas con «las N primeras gratis», igual que en caja", ref: "4.3" },
      { texto: "Agotados al instante: la carta se relee cada 30 segundos", ref: "4.4" },
      { texto: "Paga con tarjeta o Yape en la misma pantalla", ref: "4.5" },
      { texto: "Verificación del banco (3D Secure)", ref: "4.6", opcion: true },
      { texto: "«Pagar en caja»: entra al panel marcado «Por cobrar en caja»", ref: "4.7" },
      { texto: "«Pagar con terminal»: el monto viaja solo a tu terminal POS", ref: "INT-terminal-pos", opcion: true, integracion: "terminal-pos" },
      { texto: "Cupones también en el kiosko", ref: "4.8" },
      { texto: "Boleta o factura con DNI o RUC desde la pantalla", ref: "4.9" },
      { texto: "Comanda y ticket en impresora térmica", ref: "4.10" },
      { texto: "Con tu logo y tus colores", ref: "4.11" },
      { texto: "Número de pedido para llamar al cliente", ref: "4.12" },
      { texto: "Aviso de privacidad en pantalla", ref: "4.13" },
      { texto: "Aviso de comanda no impresa y cancelación tardía en caja", ref: "6.13", opcion: true },
    ],
    necesitas: [
      {
        item: "Una pantalla táctil con navegador",
        detalle: "El equipo lo compras tú. La licencia del plan Completo cubre 1 pantalla.",
      },
      {
        item: "PC con Windows e impresora térmica, si quieres ticket",
        detalle: "Para imprimir comanda y ticket desde el kiosko. Con una impresora Star o Epson compatible con impresión en la nube, no necesitas la PC.",
      },
      {
        item: "Tu cuenta Culqi y tu Nubefact",
        detalle: "Para cobrar con tarjeta o Yape y emitir la boleta o factura.",
      },
    ],
    noHace: [
      "No funciona sin internet.",
      "El kiosko pide solo para ahora (los pedidos programados van por la web y WhatsApp).",
    ],
    vecinos: ["tienda-web", "cocina", "boletas-sunat", "qr-de-mesa"],
    preguntas: [
      {
        pregunta: "¿Qué equipo necesito para el kiosko?",
        respuesta:
          "Una pantalla táctil con navegador, que compras tú. Para imprimir comanda y ticket, además, un PC con Windows y una impresora térmica, o una impresora Star o Epson con impresión en la nube, sin PC. En el alta del plan Completo te lo dejamos configurado en remoto.",
      },
      {
        pregunta: "¿Qué pasa si un cliente deja el pedido a medias?",
        respuesta: "La pantalla vuelve sola al inicio después de un rato sin uso, lista para el siguiente cliente.",
      },
      {
        pregunta: "¿El cliente puede pagar con el cajero?",
        respuesta:
          "Sí. Si elige «pagar en caja», el pedido entra al panel marcado «Por cobrar en caja» y tu cajero lo confirma al cobrar. Con el terminal POS conectado, el kiosko muestra «Pagar con terminal» y el monto viaja solo al terminal; se conecta cuando tu proveedor, Izipay o Niubiz, habilita la integración de su terminal con Pedily.",
      },
      {
        pregunta: "¿El kiosko se entera si se acaba un plato?",
        respuesta: "Sí. Relee la carta cada 30 segundos, así que un agotado deja de venderse casi al instante.",
      },
    ],
    seo: {
      titulo: "Kiosko de autoservicio para restaurantes",
      descripcion:
        "Pantalla de autoservicio con tu marca: tu cliente pide, paga con tarjeta o Yape, o en caja, y el pedido llega a cocina. En el plan Completo de Pedily (S/ 999 al mes con IGV).",
    },
  },
  {
    slug: "qr-de-mesa",
    grupo: "vende",
    nombre: "QR de mesa que cobra",
    linea: "El comensal pide por rondas y paga desde su celular",
    icono: "qr",
    plan: "tienda",
    complemento: "mesa",
    notaPlan: "Se suma a Tienda o a Tienda + WhatsApp como complemento; viene incluido en Completo.",
    titulo: "El comensal escanea, pide por rondas y paga desde la mesa",
    bajada:
      "Sin app ni registro. Cada ronda llega a cocina con «Mesa 4 · Terraza», la cuenta se ve en vivo y el grupo paga todo, en partes iguales o cada uno sus platos.",
    definicion:
      "Un QR de mesa es un código pegado en cada mesa que abre tu carta en el celular del comensal para pedir y pagar sin esperar al mozo. El de Pedily cobra: Yape o tarjeta en tu cuenta Culqi, o el QR de tu Yape o Plin con número de operación.",
    escena: "mesa",
    pasos: [
      {
        titulo: "Un QR por mesa",
        texto:
          "Con un código aleatorio que puedes cambiar, para que nadie pida desde fuera ni con un QR viejo. Los imprimes en PNG por mesa o en un PDF A4 con todas.",
      },
      {
        titulo: "Pide por rondas",
        texto:
          "Opciones, tamaños y cremas con las mismas reglas del kiosko, y una nota para cocina en cada ronda. «Enviar a cocina» y listo.",
      },
      {
        titulo: "Cuenta en vivo y pago dividido",
        texto:
          "Total, pagado y lo que falta. Pagan todo, en partes iguales o «mis platos», con propina opcional del 5, 10 o 15 %.",
      },
      {
        titulo: "Tu equipo, en control",
        texto:
          "En «Mesas» ves cada mesa abierta, los avisos de «llama al mozo» y «pide la cuenta», cobras en caja si hace falta y cierras la mesa.",
      },
    ],
    funciones: [
      { texto: "Un QR por mesa, con código aleatorio que se puede cambiar", ref: "5.1", opcion: true },
      { texto: "QR para imprimir: PNG por mesa o PDF A4 con todas", ref: "5.2", opcion: true },
      { texto: "Carta en el celular del comensal, sin app ni registro", ref: "5.3", opcion: true },
      { texto: "Tamaños y cremas con las mismas reglas del kiosko", ref: "5.4", opcion: true },
      { texto: "Nota para cocina en cada ronda", ref: "5.5", opcion: true },
      { texto: "Cada ronda entra a Pedidos y Cocina con «Mesa 4 · Terraza»", ref: "5.6", opcion: true },
      { texto: "Cuenta en vivo: total, pagado y lo que falta", ref: "5.7", opcion: true },
      { texto: "Pagar todo, en partes iguales o «mis platos»", ref: "5.8", opcion: true },
      { texto: "Propina opcional del 5, 10 o 15 %, fuera de la boleta", ref: "5.9", opcion: true },
      { texto: "Yape o tarjeta con Culqi, o el QR del local con número de operación", ref: "5.10", opcion: true },
      { texto: "Dos celulares pagando a la vez = un solo cobro", ref: "5.11", opcion: true },
      { texto: "Boleta o factura por ronda pagada", ref: "5.12", opcion: true },
      { texto: "«Llamar al mozo» y «Pedir la cuenta», máximo una vez por minuto", ref: "5.13", opcion: true },
      { texto: "Paga al final o paga cada ronda antes de cocina", ref: "5.14", opcion: true },
      { texto: "Descuenta insumos al confirmar cada ronda", ref: "5.15", opcion: true },
      { texto: "Mesas en el panel: cobrar en caja, verificar Yape o Plin y cerrar mesa", ref: "3.1 Mesas", opcion: true },
    ],
    necesitas: [
      {
        item: "El complemento Mesa, o el plan Completo",
        detalle: "En Tienda (S/ 249) y Tienda + WhatsApp (S/ 499) se suma por +S/ 150 al mes. En Completo (S/ 999) ya viene incluido.",
      },
      { item: "Tu cuenta Culqi", detalle: "Para cobrar Yape y tarjeta desde la mesa. Sin Culqi, cobras con el QR de tu Yape o Plin." },
      { item: "Imprimir y pegar los QR", detalle: "Salen del panel en PNG o en un PDF A4." },
    ],
    noHace: [
      "No viene en Tienda ni en Tienda + WhatsApp sin el complemento: ahí el QR que trae el plan es la carta digital, para ver la carta.",
      "No trae plano del salón ni une mesas.",
      "En la mesa no hay verificación 3D Secure de la tarjeta.",
    ],
    vecinos: ["cocina", "caja-y-pagos", "kiosko", "boletas-sunat"],
    preguntas: [
      PREGUNTA_MESA_PRECIO,
      PREGUNTA_CARTA_QR,
      {
        pregunta: "¿El comensal tiene que descargar una app?",
        respuesta: "No. Escanea el QR con la cámara del celular y se abre tu carta. No tiene que registrarse.",
      },
      {
        pregunta: "¿Y si dos personas pagan a la vez?",
        respuesta:
          "Pedily lo controla: aunque dos celulares paguen en el mismo momento, se hace un solo cobro por lo que falta.",
      },
      {
        pregunta: "¿Se paga al final o antes de cocinar?",
        respuesta:
          "Lo eliges tú: paga al final, como en un salón, o paga cada ronda antes de que vaya a cocina, como en un patio de comidas.",
      },
      {
        pregunta: "¿Cómo se entera mi equipo?",
        respuesta:
          "Cada ronda entra a Pedidos y a Cocina con el nombre de la mesa, y los avisos «llama al mozo» y «pide la cuenta» aparecen en la pantalla «Mesas» hasta que alguien los marca como atendidos.",
      },
    ],
    seo: {
      titulo: "QR de mesa para pedir y pagar en restaurantes",
      descripcion:
        "Carta QR que cobra: el comensal pide por rondas, ve la cuenta en vivo y paga todo, en partes o por platos, con Yape o tarjeta. Complemento de +S/ 150 al mes, o incluido en el plan Completo de Pedily.",
    },
  },
  {
    slug: "pedidos-programados",
    grupo: "vende",
    nombre: "Pedidos programados",
    linea: "Vende para mañana, también con la tienda cerrada",
    icono: "reloj",
    plan: "tienda",
    notaPlan: "Por chat, con el asistente (desde S/ 499).",
    titulo: "Vende para más tarde, incluso cuando estás cerrado",
    bajada:
      "Tu cliente elige el día y la franja en tu web, y por WhatsApp si tienes el asistente. Tú pones el tope por franja y el pedido pasa a cocina justo a su hora.",
    definicion:
      "Un pedido programado es un pedido que se hace y se paga ahora para entregarlo o recogerlo a una hora futura, dentro del horario y la capacidad que tú defines.",
    escena: "programados",
    pasos: [
      {
        titulo: "El cliente elige día y franja",
        texto: "«Lo antes posible» o programar, en el checkout de tu web y en la mini-app de WhatsApp. Se puede pedir y pagar con la tienda cerrada.",
      },
      {
        titulo: "Tú pones las reglas",
        texto: "Preparación mínima, cuántos días por delante, largo de cada franja y tope de pedidos por franja.",
      },
      {
        titulo: "Nunca te saturan",
        texto: "Las franjas llenas salen tachadas, y si dos clientes van por la última plaza, entra uno.",
      },
      {
        titulo: "A cocina, a su hora",
        texto: "El pedido espera en la pestaña «Programados» y pasa a cocina cuando toca: la hora de la franja menos la preparación.",
      },
    ],
    funciones: [
      { texto: "El cliente elige día y franja en el checkout web", ref: "12.1", opcion: true },
      { texto: "Lo mismo en la mini-app de WhatsApp y por chat", ref: "12.2", opcion: true },
      { texto: "Se pide y se paga con la tienda cerrada", ref: "12.3", opcion: true },
      { texto: "Preparación mínima, días por delante, largo y tope de franja", ref: "12.4", opcion: true },
      { texto: "Franjas llenas tachadas; por la última plaza entra uno", ref: "12.5", opcion: true },
      { texto: "Pasa a cocina a la hora justa", ref: "12.6", opcion: true },
      { texto: "Pestaña «Programados» en Pedidos", ref: "12.7", opcion: true },
      { texto: "Confirmación y correo con la hora programada", ref: "12.8", opcion: true },
      { texto: "Tu política de delivery se actualiza sola según la opción", ref: "12.9" },
    ],
    necesitas: [
      { item: "Encenderlo en «Opciones de tu tienda»", detalle: "Viene en todos los planes; por chat, con el asistente desde S/ 499." },
      { item: "Tu horario en «Mi negocio»", detalle: "Las franjas salen de tu horario de atención." },
    ],
    noHace: ["El kiosko pide solo para ahora."],
    vecinos: ["tienda-web", "asistente-whatsapp", "cocina", "delivery"],
    preguntas: [
      {
        pregunta: "¿Mis clientes pueden pedir para más tarde?",
        respuesta:
          "Sí. Con los pedidos programados tu cliente elige el día y la hora de entrega o de recojo dentro de tu horario, y el pedido entra al panel para prepararlo a tiempo. Viene en todos los planes.",
      },
      {
        pregunta: "¿Y si me llegan demasiados pedidos para la misma hora?",
        respuesta:
          "Le pones tope a cada franja. Cuando se llena, sale tachada y nadie más puede elegirla; si dos clientes van por la última plaza, entra solo uno.",
      },
      {
        pregunta: "¿Cuándo ve cocina el pedido programado?",
        respuesta:
          "Espera en la pestaña «Programados» y pasa a cocina a la hora de su franja menos el tiempo de preparación que tú fijas.",
      },
    ],
    seo: {
      titulo: "Pedidos programados para restaurantes",
      descripcion:
        "Tus clientes piden y pagan hoy para mañana, también con la tienda cerrada. Franjas con tope y paso a cocina a su hora. En todos los planes de Pedily.",
    },
  },

  // ───────────────────────────────── OPERA ─────────────────────────────────
  {
    slug: "cocina",
    grupo: "opera",
    nombre: "Cocina y operación",
    linea: "Todos los canales en una pantalla, con alarma y comanda",
    icono: "cocina",
    plan: "tienda",
    titulo: "Todos tus pedidos en una pantalla, y una cocina sin papelitos",
    bajada:
      "Web, WhatsApp, kiosko, mesa, Rappi y PedidosYa entran al mismo panel en vivo, con sonido. La alarma no para hasta que alguien atiende el pedido, y cocina ve qué empezar con tamaño, cremas y minutos de espera.",
    definicion:
      "Una pantalla de cocina (KDS) reemplaza la comanda de papel: muestra cada pedido con sus platos y opciones, y el cocinero lo pasa de «por cocinar» a «en cocina» y a «listo».",
    escena: "cocina",
    pasos: [
      {
        titulo: "Pedidos en vivo, de todos tus canales",
        texto:
          "Tablero por columnas (por confirmar, en cocina, listo, en camino) con contadores del día, búsqueda por pedido, teléfono o nombre, y filtros por canal y medio de pago. Los pedidos de Rappi y PedidosYa entran aquí también, con su propia alarma.",
      },
      {
        titulo: "Una alarma que no se calla",
        texto: "Suena hasta que alguien atiende el pedido pagado. Ningún pedido cobrado se queda sin preparar.",
      },
      {
        titulo: "La pantalla de cocina",
        texto: "Por cocinar → en cocina → listo, con tamaño, partes del combo, cremas y un reloj de demora por colores. Avisa si se queda sin conexión.",
      },
      {
        titulo: "«Ahora»: cómo va el día en 10 segundos",
        texto:
          "Tienda abierta o en pausa, meta del día, «qué hay que hacer» con su botón, cobrado contra otro día, tiempo de cocina, stock bajo y agotados.",
      },
    ],
    funciones: [
      { texto: "Todos los pedidos (web, WhatsApp, kiosko, mesa) en una pantalla, con sonido", ref: "6.1" },
      { texto: "Tablero por columnas: por confirmar, en cocina, listo, en camino", ref: "6.2" },
      { texto: "Alarma que suena hasta que alguien atiende el pedido pagado", ref: "6.3" },
      { texto: "Pantalla de cocina con tamaño, partes del combo, cremas y número de ticket", ref: "6.4" },
      { texto: "«Ahora»: cobrado hoy, pedidos en curso, stock bajo y agotados", ref: "6.5" },
      { texto: "Meta de ventas del día con barra de avance", ref: "6.6" },
      { texto: "10 estados del pedido con historial de quién cambió qué", ref: "6.7" },
      { texto: "Imprime comanda, ticket, cuadre de caja, cierre Z y receta", ref: "6.8" },
      { texto: "Comanda automática al entrar el pedido", ref: "6.9" },
      { texto: "Pedidos programados en su pestaña y a cocina a su hora", ref: "6.10", opcion: true },
      { texto: "Abrir o pausar la tienda al instante, con motivo", ref: "6.11" },
      { texto: "Pedidos atascados resaltados y barrido de pagos pendientes", ref: "6.12" },
      { texto: "Por pedido: verificar pago, boleta, nota de crédito, reembolso e historial", ref: "3.1 Pedidos" },
      { texto: "Escribir al cliente o rechazar el pedido con motivo", ref: "3.1 Pedidos" },
      { texto: "Pedir, reintentar o cancelar un motorizado de PedidosYa Envíos", ref: "3.1 Pedidos" },
      { texto: "Mesas abiertas con «llama al mozo» y «pide la cuenta»", ref: "3.1 Mesas", opcion: true },
      { texto: "Pedidos de Rappi en el mismo panel, con alarma de 4 minutos y aceptación automática", ref: "INT-rappi", opcion: true, integracion: "rappi" },
      { texto: "Pedidos de PedidosYa en el mismo panel y en cocina", ref: "INT-pedidosya", opcion: true, integracion: "pedidosya" },
      { texto: "Asociar los productos de cada app con tu carta", ref: "INT-rappi", opcion: true, integracion: "rappi" },
      { texto: "Impresora térmica por red y cajón que se abre desde el panel", ref: "INT-impresoras", opcion: true, integracion: "impresoras" },
      { texto: "Vista previa de cada ticket en 58 y 80 mm", ref: "INT-impresoras", opcion: true, integracion: "impresoras" },
      { texto: "Impresoras Star o Epson en la nube, sin PC en el local", ref: "INT-impresoras-nube", opcion: true, integracion: "impresoras-nube" },
    ],
    necesitas: [
      { item: "Una pantalla con navegador", detalle: "Computadora, laptop o pantalla de cocina: el panel funciona en el navegador." },
      {
        item: "PC con Windows e impresora térmica, para la comanda en papel",
        detalle: "Opcional: la pantalla de cocina ya reemplaza el papel. Con una impresora Star o Epson compatible con impresión en la nube, no necesitas la PC.",
      },
      {
        item: "Para Rappi y PedidosYa: tu local en cada app",
        detalle: "Se conectan cuando cada app aprueba la integración de tu local. La carta de cada app se sigue editando en esa app.",
      },
    ],
    vecinos: ["asistente-whatsapp", "caja-y-pagos", "inventario-y-recetas", "reportes"],
    preguntas: [
      {
        pregunta: "¿Los pedidos de WhatsApp, web y kiosko llegan al mismo lugar?",
        respuesta:
          "Sí. Todo entra al mismo panel, en vivo y con aviso sonoro, con una etiqueta del canal. Las rondas del QR de mesa entran con el nombre de la mesa, y los pedidos de Rappi y PedidosYa, con el de su app.",
      },
      PREGUNTA_RAPPI_PEDIDOSYA,
      {
        pregunta: "¿Y si nadie ve un pedido pagado?",
        respuesta: "La alarma sigue sonando hasta que alguien lo atiende. Además, los pedidos atascados salen resaltados.",
      },
      {
        pregunta: "¿Puedo pausar la tienda si se acaba algo o llueve?",
        respuesta:
          "Sí. Con «Pausar pedidos» cierras la tienda al instante con un motivo, y con «Volver al horario» la reabres.",
      },
      {
        pregunta: "¿Necesito impresora?",
        respuesta:
          "No es obligatoria: la pantalla de cocina reemplaza el papel. Si quieres comanda impresa automática, sirve una impresora térmica por USB o por la red de tu local, con un PC con Windows, o una impresora Star o Epson compatible con impresión en la nube, sin PC. El cajón de dinero se abre desde el panel.",
      },
    ],
    seo: {
      titulo: "Pantalla de cocina y pedidos en vivo para restaurantes",
      descripcion:
        "Todos tus canales en un panel en vivo, también Rappi y PedidosYa, alarma hasta atender el pedido, pantalla de cocina con cremas y tiempos, y comanda automática por USB, red o nube. En todos los planes de Pedily.",
    },
  },
  {
    slug: "caja-y-pagos",
    grupo: "opera",
    nombre: "Caja y pagos",
    linea: "Yape, tarjeta y QR a tu cuenta; cierre del día que cuadra",
    icono: "caja",
    plan: "tienda",
    titulo: "Cobras en tu cuenta y el cierre del día cuadra solo",
    bajada:
      "Yape confirmado sin capturas, tarjeta con Culqi y el QR de tu Yape o Plin con verificación. Pedily nunca toca tu dinero. Al cierre comparas pedidos, sistema y proveedor en una sola pantalla.",
    definicion:
      "El cierre del día compara lo que vendiste con lo que realmente cobraron Culqi y el banco, medio por medio, para encontrar diferencias el mismo día y cerrar la caja con motivo.",
    escena: "caja",
    pasos: [
      {
        titulo: "Tú eliges cómo te pagan",
        texto: "Yape confirmado automáticamente, tarjeta de crédito o débito, y el QR de tu Yape o Plin con número de operación.",
      },
      {
        titulo: "Nadie te engaña con un pago falso",
        texto: "Cada pago se comprueba con Culqi antes de darlo por bueno. Los QR se verifican en el panel: aprobar, rechazar o pedir otra foto.",
      },
      {
        titulo: "Devoluciones sin llamadas",
        texto: "Si rechazas o cancelas un pedido cobrado, la devolución sale sola. Y los cobros sin pedido se detectan y se devuelven.",
      },
      {
        titulo: "Cierre del día con un clic",
        texto:
          "Venta del día en cascada, por medio de pago, con «Coincide» o «Requiere atención». Gastos del día, exportar CSV, cerrar y reabrir con motivo.",
      },
    ],
    funciones: [
      { texto: "Tú eliges qué medios ofrecer: Yape, tarjeta, QR", ref: "7.1" },
      { texto: "Tarjeta de crédito o débito con Culqi", ref: "7.2" },
      { texto: "Yape confirmado automáticamente, hasta S/ 2 000", ref: "7.3" },
      { texto: "QR de tu Yape o Plin con verificación en el panel", ref: "7.4" },
      { texto: "Verificación del banco (3D Secure) y reintento", ref: "7.5", opcion: true },
      { texto: "Tarjetas guardadas del cliente", ref: "7.6" },
      { texto: "Cada pago se comprueba con Culqi", ref: "7.7" },
      { texto: "Devolución automática al rechazar o cancelar", ref: "7.8" },
      { texto: "Devolución manual registrada", ref: "7.9" },
      { texto: "Cobros sin pedido: el cliente pide su devolución desde la web", ref: "7.10" },
      { texto: "Devolución automática de cobros sin pedido", ref: "7.11", opcion: true },
      { texto: "Cuadre de Culqi contra pedidos cada 15 minutos", ref: "7.12" },
      { texto: "Rescate si se pierde el aviso de Culqi", ref: "7.13", opcion: true },
      { texto: "El panel te dice si falta configurar tu Culqi", ref: "7.14" },
      { texto: "Cierre del día por medio de pago, con gastos y CSV", ref: "3.2 Caja" },
      { texto: "Cerrar y reabrir el día con motivo", ref: "3.2 Caja" },
      { texto: "0 % de comisión de Pedily por venta", ref: "7.16" },
      { texto: "Número de operación del voucher de tu POS, guardado en el pedido y sin repetirse", ref: "INT-terminal-pos", integracion: "terminal-pos" },
      { texto: "«Cobrar con terminal»: el monto viaja solo a tu POS y el pedido queda pagado al aprobarse", ref: "INT-terminal-pos", opcion: true, integracion: "terminal-pos" },
      { texto: "Izipay como pasarela en vez de Culqi, si ya trabajas con Izipay", ref: "INT-izipay", opcion: true, integracion: "izipay" },
    ],
    necesitas: [
      {
        item: "Tu cuenta Culqi",
        detalle: "3,44 % + US$ 0,20 por venta con tarjeta o Yape, que cobra Culqi directo (precio público, noviembre de 2026).",
      },
      {
        item: "Tu QR de Yape o Plin",
        detalle: "Para cobrar en la tienda web, por WhatsApp y en la mesa sin pasar por Culqi; verificas el comprobante en el panel.",
      },
      {
        item: "Si cobras con POS: tu terminal de Izipay o Niubiz",
        detalle: "El número de operación lo anotas desde el primer día. El cobro con terminal se conecta cuando tu proveedor habilita la integración de su terminal con Pedily.",
      },
    ],
    vecinos: ["boletas-sunat", "cocina", "reportes", "tienda-web"],
    preguntas: [
      {
        pregunta: "¿El dinero pasa por Pedily?",
        respuesta:
          "No. Tu cliente te paga directo en tu cuenta de Culqi o en tu Yape o Plin. Pedily nunca toca tu dinero.",
      },
      {
        pregunta: "¿Puedo vender antes de que Culqi me apruebe?",
        respuesta:
          "Sí: en la tienda web, el asistente de WhatsApp y el QR de mesa cobras con el QR de tu Yape o Plin y verificas el comprobante en el panel. El kiosko cobra en línea cuando Culqi te aprueba, o «pagar en caja».",
      },
      {
        pregunta: "¿Qué pasa si cancelo un pedido que ya se pagó?",
        respuesta: "La devolución a la tarjeta o al Yape del cliente sale sola, y queda registrada en el pedido.",
      },
      {
        pregunta: "¿Funciona con el POS que ya tengo?",
        respuesta:
          "Sí. Al confirmar un cobro en caja anotas el número de operación del voucher y queda guardado en el pedido; Pedily no deja usar el mismo número dos veces. Con «Cobrar con terminal», el monto viaja solo al POS y el pedido queda pagado al aprobarse: se conecta cuando tu proveedor, Izipay o Niubiz, habilita la integración de su terminal con Pedily.",
      },
      {
        pregunta: "¿Puedo cobrar en línea con Izipay en vez de Culqi?",
        respuesta:
          "Sí. Eliges la pasarela por restaurante. Izipay se conecta cuando afilia tu comercio y aprueba la integración con Pedily; mientras, cobras con Culqi o con el QR de tu Yape o Plin.",
      },
      {
        pregunta: "¿Cómo sé que un pago es real?",
        respuesta:
          "Pedily no se cree un aviso a ciegas: consulta a Culqi antes de dar el pago por bueno, y cada 15 minutos cuadra lo cobrado en Culqi contra tus pedidos.",
      },
    ],
    seo: {
      titulo: "Cobros con Yape y tarjeta y cierre de caja para restaurantes",
      descripcion:
        "Cobra con Yape, tarjeta y QR en tu propia cuenta, con devoluciones automáticas y un cierre del día que compara pedidos, sistema y proveedor. 0 % de comisión.",
    },
  },
  {
    slug: "boletas-sunat",
    grupo: "opera",
    nombre: "Boletas y facturas SUNAT",
    linea: "La boleta sale sola en todos tus canales",
    icono: "boleta",
    plan: "tienda",
    titulo: "La boleta sale sola, en todos tus canales",
    bajada:
      "Boleta o factura electrónica con tu RUC, emitida por tu cuenta de Nubefact al cobrar: web, WhatsApp, kiosko, mesa y QR verificado. Notas de crédito y bajas desde el panel.",
    definicion:
      "La facturación electrónica es la emisión de boletas y facturas a SUNAT en formato digital. Pedily se conecta a tu cuenta de Nubefact, un servicio de facturación electrónica, y emite el comprobante cada vez que cobras.",
    escena: "boleta",
    pasos: [
      {
        titulo: "Automática al cobrar",
        texto: "En todos los canales, también al verificar un pago con QR. Cero boletas a mano.",
      },
      {
        titulo: "Factura sin tipear",
        texto: "El cliente pone su RUC y la razón social aparece sola.",
      },
      {
        titulo: "Numeración en orden",
        texto: "Series configurables (B001, F001…) y una numeración sin saltos ni duplicados.",
      },
      {
        titulo: "Corriges sin enredos",
        texto: "Nota de crédito desde el panel (o automática al cancelar, si la enciendes), comunicación de baja, reintentos y consulta de estado en SUNAT sin reemitir.",
      },
    ],
    funciones: [
      { texto: "Boleta automática en web, WhatsApp, kiosko, mesa y QR verificado", ref: "8.1" },
      { texto: "Factura con RUC y razón social automática", ref: "8.2" },
      { texto: "Numeración sin saltos ni duplicados", ref: "8.3" },
      { texto: "Series configurables (B001, F001…)", ref: "8.4" },
      { texto: "Nota de crédito desde el panel", ref: "8.5" },
      { texto: "Nota de crédito automática al cancelar", ref: "8.6", opcion: true },
      { texto: "Comunicación de baja", ref: "8.7" },
      { texto: "Reintentos y consulta del estado en SUNAT sin reemitir", ref: "8.8" },
      { texto: "IGV reducido de restaurantes MYPE según la fecha de cobro", ref: "8.9", opcion: true },
      { texto: "Conectas tu Nubefact desde «Empezar»", ref: "8.10", opcion: true },
      { texto: "Comprobantes del mes con exportación, en Finanzas", ref: "3.2 Finanzas" },
      { texto: "TXT del Registro de Ventas para SIRE, revisado campo por campo antes de descargar", ref: "INT-contador", opcion: true, integracion: "contador" },
      { texto: "Las 33 columnas oficiales del Registro de Ventas en Excel y CSV", ref: "INT-contador", opcion: true, integracion: "contador" },
      { texto: "Registro de Compras en CSV con las compras de tu inventario", ref: "INT-contador", opcion: true, integracion: "contador" },
      { texto: "Asientos de ventas para Concar, Starsoft, Contasis o Siscont", ref: "INT-contador", opcion: true, integracion: "contador" },
    ],
    necesitas: [
      {
        item: "Tu cuenta de Nubefact",
        detalle: "Desde S/ 70 al mes hasta 500 comprobantes, que pagas directo a Nubefact (precio público, noviembre de 2026).",
      },
      { item: "Tu RUC", detalle: "Los comprobantes salen a nombre de tu empresa." },
      {
        item: "Confirmar el régimen con tu contador",
        detalle: "El IGV reducido MYPE (10,5 % en 2026 y 15 % en 2027) se aplica solo si te corresponde.",
      },
    ],
    vecinos: ["caja-y-pagos", "reportes", "kiosko", "qr-de-mesa"],
    preguntas: [
      {
        pregunta: "¿Necesito una cuenta de Nubefact?",
        respuesta:
          "Sí. Pedily emite a través de tu propia cuenta de Nubefact, que cuesta desde S/ 70 al mes. La conectas desde el asistente «Empezar» del panel.",
      },
      {
        pregunta: "¿Qué IGV se aplica?",
        respuesta:
          "Si tu contador confirma que estás en el régimen de restaurantes MYPE, Pedily aplica el IGV reducido según la fecha de cobro: 10,5 % en 2026 y 15 % en 2027. Puedes calcularlo con nuestra herramienta gratis.",
      },
      {
        pregunta: "¿Qué pasa si SUNAT no responde en ese momento?",
        respuesta: "Pedily reintenta y consulta el estado del comprobante sin volver a emitirlo, así no se duplica.",
      },
      {
        pregunta: "¿Y si tengo que anular una venta?",
        respuesta: "Emites la nota de crédito desde el pedido en el panel, o la dejas automática al cancelar.",
      },
      {
        pregunta: "¿Qué le paso a mi contador?",
        respuesta:
          "Desde Finanzas descargas el TXT del Registro de Ventas para reemplazar la propuesta en SIRE, con el nombre oficial y revisado campo por campo, y las mismas 33 columnas en Excel y CSV. También el Registro de Compras y los asientos de ventas para Concar, Starsoft, Contasis o Siscont, que tu contador ajusta a sus cuentas antes de importarlos.",
      },
    ],
    seo: {
      titulo: "Boletas y facturas electrónicas SUNAT automáticas para restaurantes",
      descripcion:
        "Boleta o factura con tu RUC en cada cobro, por tu Nubefact: web, WhatsApp, kiosko y mesa. Notas de crédito, bajas e IGV reducido MYPE. En todos los planes de Pedily.",
    },
  },
  {
    slug: "delivery",
    grupo: "opera",
    nombre: "Delivery y zonas",
    linea: "Tus zonas y tarifas, y motorizado de PedidosYa Envíos o Yango",
    icono: "moto",
    plan: "tienda",
    titulo: "Reparto con tus zonas y tarifas, y motorizado cuando lo necesites",
    bajada:
      "Defines hasta dónde llegas y cuánto cobras por zona. El cliente paga lo mismo en la web, en WhatsApp y en el panel. ¿Sin motorizado? Pides uno de PedidosYa Envíos o de Yango desde el panel, y Pedily elige el más barato.",
    definicion:
      "Las zonas de reparto son las áreas a las que entregas, por código postal o distrito, cada una con su tarifa y su tiempo estimado. Pedily usa la misma tarifa en todos tus canales.",
    escena: "delivery",
    pasos: [
      {
        titulo: "Tus zonas, tus tarifas",
        texto: "Por código postal o distrito, cada una con su tarifa y su tiempo. O, si lo enciendes, una tarifa por distancia desde tu local.",
      },
      {
        titulo: "El cliente paga lo que vio",
        texto: "La tarifa se recalcula en el servidor y es la misma en la web, en WhatsApp y en el panel.",
      },
      {
        titulo: "Direcciones que se encuentran",
        texto: "Con Google Maps y un mapa de cobertura, para menos «no te encuentro».",
      },
      {
        titulo: "Motorizado a pedido",
        texto:
          "Desde el pedido cotizas, pides, sigues y cancelas un motorizado de PedidosYa Envíos. Con el asistente, el cliente recibe el enlace de seguimiento por WhatsApp.",
      },
    ],
    funciones: [
      { texto: "Zonas por código postal o distrito, cada una con su tarifa", ref: "11.1" },
      { texto: "La misma tarifa en panel, web y WhatsApp, recalculada en el servidor", ref: "11.2" },
      { texto: "Direcciones con Google Maps y mapa de cobertura", ref: "11.3" },
      { texto: "Tarifa por distancia en km desde tu local", ref: "11.4", opcion: true },
      { texto: "Recojo en tienda", ref: "11.5" },
      { texto: "Motorizado de PedidosYa Envíos: cotiza, crea, sigue y cancela", ref: "11.6" },
      { texto: "Enlace de seguimiento de PedidosYa al cliente por WhatsApp", ref: "11.7" },
      { texto: "Tiempo estimado de entrega por zona", ref: "11.8" },
      { texto: "Entrega en condominios con su tarifa", ref: "1.8", opcion: true },
      { texto: "Motorizado de Yango Delivery: Pedily compara con PedidosYa Envíos y pide el más barato", ref: "INT-yango", opcion: true, integracion: "yango" },
      { texto: "Un pedido de Rappi o PedidosYa nunca pide además tu motorizado", ref: "INT-pedidosya", opcion: true, integracion: "pedidosya" },
    ],
    necesitas: [
      { item: "Tus zonas y tarifas", detalle: "Las cargas en «Códigos postales» del panel." },
      {
        item: "Tu propio repartidor o una cuenta de PedidosYa Envíos o de Yango Delivery",
        detalle: "Pedily no tiene flota propia: avisa a tu repartidor desde el panel o pide un motorizado de PedidosYa Envíos o de Yango.",
      },
    ],
    noHace: [
      "No tiene app de repartidor propia.",
    ],
    vecinos: ["tienda-web", "asistente-whatsapp", "cocina", "pedidos-programados"],
    preguntas: [
      {
        pregunta: "¿Tengo que usar PedidosYa Envíos?",
        respuesta: "No. Puedes repartir con tu propio equipo y usar PedidosYa Envíos solo cuando te falte un motorizado.",
      },
      {
        pregunta: "¿Cómo defino hasta dónde reparto?",
        respuesta:
          "Por código postal o distrito, cada zona con su tarifa y su tiempo estimado, o por distancia en kilómetros desde tu local si encendiste esa opción.",
      },
      {
        pregunta: "¿Puedo usar Yango en vez de PedidosYa Envíos?",
        respuesta:
          "Sí, o los dos. Con tu cuenta de empresa de Yango Delivery, al pedir motorizado Pedily cotiza Yango y PedidosYa Envíos y pide el más barato; si Yango no puede tomar el viaje, lo pide a PedidosYa Envíos. Cada viaje lo cobra el proveedor, según tu contrato.",
      },
      PREGUNTA_RAPPI_PEDIDOSYA,
    ],
    seo: {
      titulo: "Zonas de reparto y delivery para restaurantes",
      descripcion:
        "Zonas por distrito o código postal con su tarifa, la misma en web y WhatsApp, y motorizado de PedidosYa Envíos o Yango desde el panel. En todos los planes de Pedily.",
    },
  },
  {
    slug: "inventario-y-recetas",
    grupo: "opera",
    nombre: "Inventario y recetas",
    linea: "Costo por plato, stock por receta y «Agotado» real",
    icono: "almacen",
    plan: "tienda",
    titulo: "Sabes cuánto te cuesta cada plato y qué se acaba antes de que se acabe",
    bajada:
      "Recetas con costo y food cost, stock que baja con cada venta, «Agotado» automático en web y kiosko, conteos con merma en soles, compras, proveedores y producción diaria.",
    definicion:
      "Una receta estándar (o escandallo) lista los insumos y cantidades de un plato. Con ella Pedily calcula su costo, su food cost y cuánto stock descuenta cada venta.",
    escena: "inventario",
    pasos: [
      {
        titulo: "Recetas con costo",
        texto: "Insumos con cantidad y costo, subrecetas, rendimiento y merma. Costo por plato y food cost, y la lista de platos que aún no tienen receta.",
      },
      {
        titulo: "Stock que baja solo",
        texto:
          "Cada venta descuenta sus insumos. Cuando algo se acaba, la web y el kiosko marcan «Agotado», incluso por tamaño. Se activa al cargar tus insumos.",
      },
      {
        titulo: "Conteo y merma en soles",
        texto: "Conteo de apertura o cierre: esperado contra contado, la diferencia y la merma valorizada en soles.",
      },
      {
        titulo: "Compras, proveedores y producción",
        texto:
          "Compras por estado y cuentas por pagar, proveedores con RUC validado y «Preparar hoy» según tu nivel objetivo o tus ventas.",
      },
    ],
    funciones: [
      { texto: "Recetas: insumos con cantidad y costo, subrecetas y rendimiento", ref: "3.3 Recetas" },
      { texto: "Costo por plato y food cost; recalcular todas", ref: "3.3 Recetas" },
      { texto: "«Platos sin receta» con sus ventas de 90 días", ref: "3.3 Recetas" },
      { texto: "Costos de insumos con historial de precios y merma %", ref: "3.3 Costos" },
      { texto: "Margen y costo por plato en Productos", ref: "3.3 Productos" },
      { texto: "Costo y ganancia de cada combo", ref: "3.3 Combo", opcion: true },
      { texto: "Stock por receta que baja con cada venta", ref: "1.4 / G-05" },
      { texto: "«Agotado» automático por tamaño en web y kiosko", ref: "1.4, 4.4", opcion: true },
      { texto: "Inventario: críticos, preparados, almacén y kárdex", ref: "3.4 Inventario" },
      { texto: "Totales OK, bajo mínimo y agotado", ref: "3.4 Inventario" },
      { texto: "Conteo y merma con motivo", ref: "3.4 Inventario", opcion: true },
      { texto: "Conteo diario con merma valorizada en soles", ref: "3.4 Conteo" },
      { texto: "Compras con líneas, documento, recepción y pago", ref: "3.4 Compras" },
      { texto: "«Compra en 60 segundos» con aviso de precio ±10 %", ref: "3.4 Compras", opcion: true },
      { texto: "Proveedores con RUC validado", ref: "3.4 Proveedores" },
      { texto: "Producción diaria: qué preparar hoy y lotes con vencimiento", ref: "3.4 Producción" },
      { texto: "Ficha de cocina sin costos, escalable de ×½ a ×3, para imprimir", ref: "3.4 Ficha" },
      { texto: "Menaje y equipos por estado y ubicación", ref: "3.4 Menaje" },
      { texto: "Descuenta insumos también por cada ronda de la mesa", ref: "5.15", opcion: true },
    ],
    necesitas: [
      { item: "Cargar tus insumos y recetas", detalle: "Si prefieres, lo hacemos contigo en el alta." },
      { item: "Viene en todos los planes", detalle: "Desde Tienda (S/ 249 al mes con IGV)." },
    ],
    noHace: [
      "No envía la orden de compra al proveedor.",
      "Un almacén por local (con ubicaciones y envases).",
    ],
    vecinos: ["cocina", "reportes", "tienda-web", "caja-y-pagos"],
    preguntas: [
      {
        pregunta: "¿Cómo sabe Pedily cuánto me cuesta un plato?",
        respuesta:
          "Con su receta: los insumos, sus cantidades y el costo de cada insumo. Si cambias el precio de un insumo, recalculas y ves el nuevo costo y food cost de cada plato.",
      },
      {
        pregunta: "¿El stock baja solo con cada venta?",
        respuesta:
          "Sí, cuando cargas tus insumos y recetas. Antes de activarlo, el panel te muestra qué bajaría del stock con cada venta para que lo revises.",
      },
      {
        pregunta: "¿Puedo saber cuánto pierdo por merma?",
        respuesta:
          "Sí. El conteo de apertura o cierre compara lo esperado con lo contado y te da la merma valorizada en soles, insumo por insumo.",
      },
    ],
    seo: {
      titulo: "Inventario, recetas y costo por plato para restaurantes",
      descripcion:
        "Recetas con costo y food cost, stock que baja con cada venta, «Agotado» automático, conteos con merma en soles, compras y producción diaria. En todos los planes de Pedily.",
    },
  },

  // ───────────────────────────── HAZ QUE VUELVAN ───────────────────────────
  {
    slug: "clientes-y-campanas",
    grupo: "vuelven",
    nombre: "Clientes y campañas",
    linea: "Ficha de cliente, cupones, referidos y WhatsApp con permiso",
    icono: "clientes",
    plan: "tienda",
    notaPlan: "Campañas por WhatsApp desde S/ 499.",
    titulo: "Que el que ya te compró te vuelva a pedir directo",
    bajada:
      "Ficha de cada cliente, nuevos, recurrentes y los que no vuelven, cupones, referidos y saldo a favor. Y campañas por WhatsApp solo a quien dio su permiso, con «BAJA» al pie.",
    definicion:
      "Fidelizar es lograr que un cliente vuelva a pedir por tu canal propio, sin comisión. Pedily guarda el historial de cada cliente y te da cupones, referidos, saldo a favor y campañas para traerlo de vuelta.",
    escena: "clientes",
    pasos: [
      {
        titulo: "Conoces a tus clientes",
        texto:
          "Ficha con pedidos, gasto y último pedido. Si lo enciendes, une web, WhatsApp y kiosko por teléfono y los separa en nuevos, recurrentes y los que no vuelven.",
      },
      {
        titulo: "Promos que controlas",
        texto:
          "Cupones por %, monto o precio especial, con tope, compra mínima, usos y vencimiento. Descuentos por categoría y cupón de bienvenida.",
      },
      {
        titulo: "Clientes que traen clientes",
        texto: "Referidos: el que invita gana un cupón cuando su amigo recibe su pedido. Y saldo a favor para la próxima compra.",
      },
      {
        titulo: "Campañas por WhatsApp, con permiso",
        texto:
          "«Tu pedido», «te extrañamos» y carrito abandonado, con vista previa, a quién va hoy, costo estimado y modo prueba. Resultados de 30 días.",
      },
    ],
    funciones: [
      { texto: "Lista y ficha de cada cliente con sus pedidos y su gasto", ref: "9.1" },
      { texto: "Nuevos, recurrentes y los que no vuelven en 30 días", ref: "9.2", opcion: true },
      { texto: "«Abrir conversación» y «Crear cupón para…» desde la ficha", ref: "3.6 Clientes v2", opcion: true },
      { texto: "Derechos del cliente (Ley 29733): descargar o anonimizar sus datos", ref: "9.3", opcion: true },
      { texto: "Cupones: %, monto o precio especial, con tope, usos y vencimiento", ref: "9.4" },
      { texto: "Descuentos por categoría con fechas", ref: "9.5" },
      { texto: "Cupón de bienvenida para el primer pedido", ref: "9.6", opcion: true },
      { texto: "Referidos: el que invita gana un cupón", ref: "9.7", opcion: true },
      { texto: "Saldo a favor por cada compra en tus canales", ref: "9.8", opcion: true },
      { texto: "Vales de compensación", ref: "9.9" },
      { texto: "Permiso de promociones registrado con cuándo y cómo", ref: "9.10" },
      { texto: "«Antes y después» al encender cada opción", ref: "9.11" },
      { texto: "Campaña «tu pedido» por plantilla", ref: "10.1", opcion: true },
      { texto: "Campaña «te extrañamos» a quien no pide hace 30 a 60 días", ref: "10.2", opcion: true },
      { texto: "Campaña de carrito abandonado", ref: "10.3", opcion: true },
      { texto: "Máximo 2 por semana por cliente y 200 envíos al día", ref: "10.4" },
      { texto: "Vista previa, costo estimado y modo Apagada, Prueba o Encendida", ref: "10.5", opcion: true },
      { texto: "«Enviar prueba» a tu número antes del envío real", ref: "10.6", opcion: true },
      { texto: "Resultados: enviados, entregados, leídos y pedidos atribuidos", ref: "10.7", opcion: true },
      { texto: "Libro de Reclamaciones con el plazo legal que queda", ref: "3.6 Reclamos" },
    ],
    necesitas: [
      {
        item: "Para campañas: plan Tienda + WhatsApp o Completo",
        detalle: "Y plantillas aprobadas por Meta en tu cuenta. Meta cobra S/ 0,2339 por mensaje de marketing (precio público, noviembre de 2026).",
      },
      { item: "Encender las opciones", detalle: "Todo nace apagado; lo enciendes en «Opciones de tu tienda» cuando quieras." },
    ],
    noHace: [
      "No envía campañas por correo, SMS ni notificaciones.",
      "No tiene membresías ni tarjetas de regalo.",
    ],
    vecinos: ["asistente-whatsapp", "reportes", "tienda-web", "caja-y-pagos"],
    preguntas: [
      {
        pregunta: "¿A quién le llegan las campañas?",
        respuesta:
          "Solo a quien dio su permiso, y cada mensaje lleva «BAJA» para salir. Además, nadie recibe más de 2 por semana, y salen como máximo 200 envíos al día.",
      },
      {
        pregunta: "¿Cómo sé si una promoción funcionó?",
        respuesta:
          "Al encender una opción (bienvenida, referidos, saldo a favor…), el panel compara tus pedidos antes y después. Las campañas muestran enviados, leídos y pedidos atribuidos.",
      },
      {
        pregunta: "¿Puedo probar una campaña sin enviarla a todos?",
        respuesta:
          "Sí. Cada campaña tiene modo Prueba y un botón «Enviar prueba a tu número». El envío real se enciende aparte.",
      },
      {
        pregunta: "¿Mis clientes son míos?",
        respuesta: "Sí. Puedes exportar todo tu negocio en un archivo ZIP, clientes incluidos, cuando quieras.",
      },
    ],
    seo: {
      titulo: "Fidelización, cupones y campañas de WhatsApp para restaurantes",
      descripcion:
        "Ficha de cliente, nuevos y los que no vuelven, cupones, referidos, saldo a favor y campañas de WhatsApp con permiso. Haz que tus clientes vuelvan a pedir directo.",
    },
  },
  {
    slug: "reportes",
    grupo: "vuelven",
    nombre: "Reportes y finanzas",
    linea: "Qué vender, a qué hora reforzar y si el mes gana plata",
    icono: "reportes",
    plan: "tienda",
    titulo: "Decide con tus números: qué vender, a qué hora reforzar y cuánto ganas",
    bajada:
      "Ventas por día, hora, canal y zona, mapa de calor, platos por popularidad y margen, recompra de clientes y tiempos de cocina. Y en Finanzas: estado de resultados, impuestos y cuentas por pagar.",
    definicion:
      "Los reportes de Pedily reúnen las ventas de todos tus canales en un solo lugar y las cruzan con costos, tiempos y clientes, para que decidas con datos y no de memoria.",
    escena: "reportes",
    pasos: [
      {
        titulo: "Resumen del periodo",
        texto: "Total cobrado, pedidos, ticket promedio, ventas por día y por hora, top platos (también por canal), medios de pago y zonas.",
      },
      {
        titulo: "Cuándo reforzar",
        texto: "Mapa de calor día × hora, rendimiento por día de la semana, platos por franja y tiempos de preparación por franja.",
      },
      {
        titulo: "Qué vender más",
        texto: "Tu carta por popularidad y margen, recompra por mes de primer pedido y clientes nuevos por canal.",
      },
      {
        titulo: "Si el mes gana plata",
        texto:
          "Finanzas por mes: ingresos, food cost, prime cost, margen, estado de resultados, impuestos, flujo de caja, cuentas por pagar y planilla.",
      },
    ],
    funciones: [
      { texto: "Total cobrado, pedidos, ticket promedio y delivery del periodo", ref: "3.8 Resumen" },
      { texto: "Ventas por día y por hora", ref: "3.8 Resumen" },
      { texto: "Top platos, también por canal", ref: "3.8 Resumen" },
      { texto: "Ventas por canal, medio de pago, tipo de pedido y categoría", ref: "3.8 Resumen" },
      { texto: "Cupones y descuentos usados", ref: "3.8 Resumen" },
      { texto: "Mapa de calor día × hora y recomendaciones", ref: "3.8 Análisis" },
      { texto: "Recompra por mes de primer pedido y nuevos por canal", ref: "3.8 Clientes" },
      { texto: "Pedidos por zona", ref: "3.8 Zonas" },
      { texto: "Tiempos de preparación y tiempo total al cliente por canal", ref: "3.8 Tiempos" },
      { texto: "Carta por popularidad × margen", ref: "3.8 Menú" },
      { texto: "Exportar CSV para el contador", ref: "18.2" },
      { texto: "Meta de ventas del día con barra de avance", ref: "6.6" },
      { texto: "Finanzas: ingresos, food cost, prime cost, margen bruto y neto", ref: "3.2 Finanzas" },
      { texto: "Estado de resultados anual con CSV", ref: "3.2 Finanzas" },
      { texto: "Impuestos: ventas por comprobante y crédito fiscal de compras", ref: "3.2 Finanzas" },
      { texto: "Flujo de caja, cuentas por pagar y planilla", ref: "3.2 Finanzas" },
      { texto: "Analíticas del asistente: ventas, resueltos sin persona y costo de IA", ref: "3.7 Analíticas" },
      { texto: "Resultados de tus opciones: antes y después", ref: "9.11" },
      { texto: "API de lectura de pedidos, ventas, comprobantes y productos, con llaves por restaurante", ref: "INT-api-webhooks", opcion: true, integracion: "api-webhooks" },
      { texto: "Avisos firmados (webhooks) en cada pedido, pago, comprobante y stock bajo", ref: "INT-api-webhooks", opcion: true, integracion: "api-webhooks" },
    ],
    necesitas: [
      { item: "Nada extra para las ventas", detalle: "Se registran solas desde todos tus canales." },
      { item: "Recetas e insumos para los costos", detalle: "El food cost y el margen salen de tus recetas." },
    ],
    noHace: ["No es un chat de IA al que le preguntas por tu negocio: son reportes y recomendaciones a partir de tus ventas."],
    vecinos: ["cocina", "caja-y-pagos", "inventario-y-recetas", "clientes-y-campanas"],
    preguntas: [
      {
        pregunta: "¿Puedo pasarle los datos a mi contador?",
        respuesta: "Sí. Los reportes se exportan en CSV, y Finanzas tiene el estado de resultados, los comprobantes del mes, el TXT del Registro de Ventas para SIRE, su versión en Excel y los asientos para el programa de tu contador.",
      },
      {
        pregunta: "¿Tengo que cargar algo para ver mis reportes?",
        respuesta: "Las ventas se registran solas desde todos tus canales. Para ver costos y márgenes, carga tus recetas e insumos.",
      },
      {
        pregunta: "¿Me dice qué hacer?",
        respuesta:
          "El análisis operativo trae recomendaciones a partir de tus ventas (por ejemplo, en qué franjas se te junta el trabajo). No es un chat de IA: son reportes.",
      },
    ],
    seo: {
      titulo: "Reportes de ventas y finanzas para restaurantes",
      descripcion:
        "Ventas por día, hora, canal y zona, mapa de calor, platos por margen, recompra, estado de resultados e impuestos. Exporta en CSV; en el plan Completo, también por API y webhooks.",
    },
  },
];

export function solucionPorSlug(slug: string): Solucion | undefined {
  return SOLUCIONES.find((s) => s.slug === slug);
}

export function solucionesDe(grupo: GrupoId): Solucion[] {
  return SOLUCIONES.filter((s) => s.grupo === grupo);
}

export const RUTA_SOLUCION = (slug: string) => `/soluciones/${slug}`;
