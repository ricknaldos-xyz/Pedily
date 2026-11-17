/**
 * Registro de capturas reales del producto que usa la landing.
 *
 * Todas salen del producto real (`main` de pedily-web, pedily-kiosk y
 * pedily-backend) corriendo en local con datos ficticios de «Restaurante Demo»
 * (LV2-C, 15-nov-2026): `research_notes/Pedily landing v2 2026-11-15/capturas-producto/`.
 * Se copian optimizadas con `scripts/copiar-capturas.sh` (WebP; next/image
 * sirve AVIF/WebP al tamaño de cada pantalla).
 *
 * - `src`: ruta bajo `public/`.
 * - `movil`: la misma pantalla del panel a 390 px (recortada arriba en 4:5),
 *   que se muestra en celulares en lugar de la de escritorio.
 * - Si un archivo no existe al compilar, <Captura> pinta su `reemplazo`.
 *
 * No se usan (LV2-C): la impresora («POS Bridge no disponible»), el checkout
 * con mapa (clave de Maps ficticia), las vistas que salieron vacías
 * (sugerencias de compra, comisiones), la consola de altas en móvil, el
 * cierre del día (en local dice «Culqi no responde») ni el seguimiento web
 * (muestra el código del cargo como número de pedido).
 */
export interface CapturaInfo {
  src: string;
  alt: string;
  /** De dónde sale (para quien la regenere). */
  origen: string;
  movil?: string;
  /**
   * Tipo de marco que le corresponde. `recorte`: trozo de una pantalla de la
   * demo publicada (fichas J, 16-nov), sin versión de celular aparte;
   * `ticket`: vista previa ESC/POS del papel térmico.
   */
  tipo: "panel" | "celular" | "kiosko" | "recorte" | "ticket";
  /** Dónde se ve (rótulo de la barra del marco), para los recortes. */
  donde?: "panel" | "tienda" | "kiosko" | "caja";
  /**
   * Si la pantalla es de la demo con un proveedor simulado, lo que lleva su
   * rótulo. Se añade al pie («Demo: …»): no se engaña a nadie (regla J).
   */
  demo?: string;
}

const panel = (n: string, alt: string, origen: string): CapturaInfo => ({
  src: `/capturas/panel/${n}.webp`,
  movil: `/capturas/panel/${n}-movil.webp`,
  alt,
  origen,
  tipo: "panel",
});
const cel = (n: string, alt: string, origen: string): CapturaInfo => ({ src: `/capturas/cliente/${n}.webp`, alt, origen, tipo: "celular" });
const rec = (n: string, donde: NonNullable<CapturaInfo["donde"]>, alt: string, origen: string, demo?: string): CapturaInfo => ({
  src: `/capturas/integraciones/${n}.webp`,
  alt,
  origen,
  tipo: "recorte",
  donde,
  demo,
});
const kio = (n: string, alt: string, origen: string): CapturaInfo => ({ src: `/capturas/cliente/${n}.webp`, alt, origen, tipo: "kiosko" });

export const CAPTURAS = {
  // ── G-08 (demo publicada) ───────────────────────────────────────────────
  "tienda-carta": {
    src: "/capturas/tienda-carta.webp",
    alt: "Carta de la tienda de ejemplo en un celular: acompañamientos con foto, tamaños y precio",
    origen: "DEMO-WEB /menu a 390 px (G-08)",
    tipo: "celular",
  },
  "kiosko-carta": {
    src: "/capturas/kiosko-carta.webp",
    alt: "Kiosko de autoservicio con la misma carta: acompañamientos con foto, precio y botón Agregar",
    origen: "DEMO-KIOSKO /menu (G-08)",
    tipo: "kiosko",
  },
  "panel-opciones": {
    src: "/capturas/panel-opciones.webp",
    alt: "Pantalla «Opciones de tu tienda» del panel, con saldo a favor y referidos",
    origen: "DEMO-WEB /dashboard/opciones-tienda (G-08)",
    tipo: "panel",
  },
  "panel-empezar": {
    src: "/capturas/panel-empezar.webp",
    alt: "Asistente «Empezar» del panel con el avance de la tienda y los pasos Tu negocio, Tu carta, Horarios y Cobros",
    origen: "DEMO-WEB /dashboard/empezar (G-08)",
    tipo: "panel",
  },

  // ── Panel (LV2-C, 1440×900 y 390×844) ───────────────────────────────────
  "panel-pedidos": panel(
    "pedidos",
    "Pedidos en vivo: alarma «Nuevo pedido pagado», 54 pedidos hoy, meta del día cumplida y tablero por columnas",
    "panel-pedidos-en-vivo"
  ),
  "panel-ahora": panel("ahora", "Panel «Ahora»: meta del día, qué hay que hacer, cobrado hoy frente a otro día, inventario y caja", "panel-panel-ahora"),
  "panel-cocina": panel(
    "cocina",
    "Pantalla de cocina: pedidos por cocinar y en cocina con tamaño, partes del combo, cremas y minutos de espera",
    "panel-cocina-kds"
  ),
  "panel-finanzas": panel("finanzas", "Finanzas: ingresos, costo de alimentos, margen bruto de 61,6 % y tendencia de seis meses", "panel-finanzas"),
  "panel-estado-resultados": panel("estado-resultados", "Estado de resultados por mes: ventas por medio de pago, costos y resultado", "panel-finanzas-estado-resultados"),
  "panel-inventario": panel("inventario", "Inventario: insumos activos, con stock bajo mínimo y agotados, con su costo", "panel-inventario-todos"),
  "panel-recetas": panel("recetas", "Recetas: cada plato con su costo por porción y su food cost", "panel-recetas"),
  "panel-receta-detalle": panel("receta-detalle", "Detalle de una receta con sus insumos, cantidades y costo", "panel-receta-detalle"),
  "panel-produccion": panel("produccion", "Producción del día: lotes por vencer y qué preparar hoy según las ventas", "panel-produccion-diaria"),
  "panel-compras": panel("compras", "Compras a proveedores", "panel-compras"),
  "panel-clientes": panel("clientes", "Clientes: 63 clientes con sus pedidos, gasto, último pedido y canales", "panel-clientes"),
  "panel-cliente-ficha": panel("cliente-ficha", "Ficha de un cliente: pedidos, saldo a favor, permiso para promociones y botón para crearle un cupón", "panel-cliente-ficha"),
  "panel-campanas": panel("campanas", "Campañas de WhatsApp en modo prueba, con vista previa y costo estimado", "panel-campanas"),
  "panel-promociones": panel("promociones", "Promociones: descuentos por categoría y cupones", "panel-promociones"),
  "panel-reportes": panel("reportes", "Reportes: resumen de 28 días comparado con el periodo anterior y cascada de venta", "panel-reportes"),
  "panel-reportes-menu": panel("reportes-menu", "Reportes del menú: cada plato por popularidad y margen, con una pista de qué hacer", "panel-reportes-menu"),
  "panel-reportes-tiempos": panel("reportes-tiempos", "Reportes de tiempos por etapa del pedido", "panel-reportes-tiempos"),
  "panel-reportes-clientes": panel("reportes-clientes", "Reportes de clientes: recompra por cohorte", "panel-reportes-clientes"),
  "panel-reportes-zonas": panel("reportes-zonas", "Reportes por zona de reparto", "panel-reportes-zonas"),
  "panel-mesas": panel("mesas", "Mesas abiertas con su total, lo pagado y lo que falta, avisos de «llamó al mozo» y QR por mesa", "panel-mesas"),
  "panel-conversaciones": panel(
    "conversaciones",
    "Conversación de WhatsApp en el panel: el chat del asistente, el pedido y la ficha del cliente",
    "panel-conversacion-abierta"
  ),
  "panel-atencion": panel("atencion", "Cliente que pide hablar con una persona: la cola de atención y «Tomar control»", "panel-conversacion-atencion"),
  "panel-playground": panel("playground", "Playground del asistente: probar una conversación sin pasar por WhatsApp", "panel-bot-playground-conversacion"),
  "panel-gasto-asistente": panel("gasto-asistente", "Gasto del asistente en el mes (IA y Meta) frente al tope mensual", "panel-bot-gasto-asistente"),
  "panel-roles": panel("roles", "Roles: administrador, operador, caja, cocina y mozo, con sus permisos", "panel-roles"),
  "panel-programados": panel("programados", "Pestaña «Programados» de Pedidos: pedidos pagados para más tarde", "panel-pedidos-programados"),
  "panel-zonas": panel("zonas", "Zonas de reparto con su tarifa y envío mínimo, máximo y promedio", "panel-codigos-postales"),
  "panel-mi-negocio": panel("mi-negocio", "Mi negocio: datos para la boleta, horario, tipos de entrega, zonas y medios de pago", "panel-tienda-marca"),

  // ── Lado del cliente (LV2-C, 390×844) ───────────────────────────────────
  "tienda-inicio": cel("tienda-inicio", "Inicio de la tienda web: delivery o recojo y la carta", "tienda-01-inicio-movil"),
  "tienda-cremas": cel("tienda-cremas", "Ficha del plato: cremas incluidas y extra con su precio", "tienda-03b-plato-cremas-movil"),
  "tienda-carrito": cel("tienda-carrito", "Carrito con el pollo y la chicha, y el descuento en bebidas", "tienda-04-carrito-movil"),
  "tienda-comprobante": cel("tienda-comprobante", "Checkout: datos del cliente y DNI para la boleta", "tienda-05-checkout-datos-movil"),
  "tienda-programar": cel("tienda-programar", "Checkout: «Programar para más tarde» con el día y la franja", "tienda-07-checkout-programar-movil"),
  "tienda-pago": cel("tienda-pago", "Checkout: pago con Yape o con tarjeta", "tienda-08-pago-yape-movil"),
  "tienda-mis-pedidos": cel("tienda-mis-pedidos", "«Mis pedidos»: el pedido en curso con su estado y su detalle", "tienda-10-mis-pedidos-movil"),
  "tienda-beneficios": cel("tienda-beneficios", "Beneficios: saldo por cada compra y programa de referidos", "tienda-11-beneficios-movil"),
  "wa-carta": cel("wa-carta", "Carta que se abre desde el chat de WhatsApp", "webview-01-carta-movil"),
  "wa-plato": cel("wa-plato", "Mini-app de WhatsApp: el plato con sus cremas incluidas e indicaciones para cocina", "webview-02-plato-movil"),
  "wa-bebidas": cel("wa-bebidas", "Mini-app de WhatsApp: bebidas con descuento, tamaños y el botón «Ver carrito»", "webview-03-agregado-movil"),
  "wa-carrito": cel("wa-carrito", "Mini-app de WhatsApp: el carrito con el pollo pedido por chat y la chicha agregada tocando", "webview-04-carrito-movil"),
  "wa-confirmar": cel("wa-confirmar", "Mini-app de WhatsApp: resumen, cupón, saldo, delivery o recojo y dirección de envío", "webview-05-checkout-movil"),
  "wa-entrega": cel("wa-entrega", "Desde WhatsApp: recojo y «Programar para más tarde»", "webview-06-entrega-movil"),
  "wa-pago": cel("wa-pago", "Desde WhatsApp: pagar con Yape, con tarjeta o con el QR de Yape o Plin del local", "webview-07-pago-movil"),
  "mesa-carta": cel("mesa-carta", "QR de mesa: la carta de la mesa con «Llamar al mozo»", "mesa-01-carta-movil"),
  "mesa-ronda": cel("mesa-ronda", "QR de mesa: «Tu ronda ya está en cocina» y la cuenta por rondas", "mesa-04-ronda-enviada-movil"),
  "mesa-cuenta": cel("mesa-cuenta", "QR de mesa: la cuenta con lo pagado, lo que falta y cómo pagar", "mesa-05-cuenta-movil"),
  "mesa-mis-platos": cel("mesa-mis-platos", "QR de mesa: pagar solo mis platos, con propina opcional", "mesa-07-mis-platos-movil"),
  "kiosko-plato": kio("kiosko-plato", "Kiosko: plato personalizable con cremas", "kiosko-03-plato-kiosko"),
  "kiosko-comprobante": kio("kiosko-comprobante", "Kiosko: el cliente elige boleta o factura", "kiosko-06-comprobante-kiosko"),
  "kiosko-pago": kio("kiosko-pago", "Kiosko: resumen, cupón y pagar con Culqi o en caja", "kiosko-07-pago-kiosko"),
  "kiosko-ticket": kio("kiosko-ticket", "Kiosko: pedido registrado con su número para pagar en caja", "kiosko-08-ticket-pagar-en-caja-kiosko"),

  // ── Integraciones (L-04): capturas de las fichas J-01…J-04 con la demo en ─
  // modo simulado (`research_notes/Pedily demo 100 2026-11-16/capturas/`),
  // recortadas y optimizadas con `scripts/copiar-capturas-integraciones.sh`.
  "int-rappi-alarma": rec(
    "rappi-alarma",
    "panel",
    "Alarma de pedido de Rappi en el panel: cuenta atrás para aceptar, aviso de productos sin asociar, Aceptar y Rechazar",
    "J-02/03-alarma-rappi-plazo-4min.jpg",
    "Rappi simulado"
  ),
  "int-rappi-integraciones": rec(
    "rappi-integraciones",
    "panel",
    "Pantalla «Integraciones» del panel: Rappi con su estado y el rótulo del modo demo",
    "J-02/01-integraciones-rappi-modo-demo.jpg",
    "Rappi simulado"
  ),
  "int-pedidosya-pedido": rec(
    "pedidosya-pedido",
    "panel",
    "Pedido de PedidosYa en el panel: sus platos, «Marcar listo» y los avisos de la app (repartidor y cancelación)",
    "J-02/10-hub-pedidosya-sin-alerta-repartidor-botones-demo.jpg",
    "PedidosYa simulado"
  ),
  "int-repartos": rec(
    "repartos-cotizar",
    "panel",
    "Repartos: Yango y PedidosYa Envíos cotizan el mismo envío y se elige el más barato",
    "J-02/04-repartos-cotizar-prueba.jpg",
    "Yango y PedidosYa Envíos simulados"
  ),
  "int-caja-terminal": rec(
    "caja-terminal",
    "caja",
    "Cobro en caja con el terminal POS: el terminal rechazó la tarjeta y la caja ofrece volver a cobrar",
    "J-03/04-caja-terminal-rechazado.jpg",
    "terminal de pago (POS) simulado"
  ),
  "int-kiosko-terminal": rec(
    "kiosko-terminal",
    "kiosko",
    "Kiosko: «Pagar en el terminal» con el monto, o pagar en caja",
    "J-03/01-kiosko-terminal-rotulo.jpg",
    "terminal de pago (POS) simulado"
  ),
  "int-checkout-izipay": rec(
    "checkout-izipay",
    "tienda",
    "Checkout de la tienda web con Izipay: tarjeta, Yape o Plin en el formulario seguro de Izipay",
    "J-03/13-web-checkout-izipay-rotulo.jpg",
    "Izipay simulado, no se cobra dinero"
  ),
  "int-impresoras-nube": rec(
    "impresoras-nube",
    "panel",
    "Impresoras en la nube: una Star CloudPRNT de cocina, sin computadora ni puente de impresión",
    "J-03/10-panel-impresoras-nube-rotulo.jpg",
    "impresoras Star CloudPRNT y Epson SDP simuladas"
  ),
  "int-ticket-cliente": {
    src: "/capturas/integraciones/ticket-cliente-80mm.webp",
    alt: "Vista previa del ticket del cliente en papel de 80 mm, con tildes y ñ, total y QR",
    origen: "J-01/despues/cliente-80mm.png",
    tipo: "ticket",
  },
  "int-ticket-comanda": {
    src: "/capturas/integraciones/ticket-comanda-58mm.webp",
    alt: "Vista previa de la comanda de cocina en papel de 58 mm, con el número grande y las indicaciones",
    origen: "J-01/despues/comanda-58mm.png",
    tipo: "ticket",
  },
  "int-contabilidad": rec(
    "contabilidad",
    "panel",
    "Contabilidad: comprobantes del mes, archivo SIRE revisado contra el Anexo 3 y descargas TXT, Excel, CSV y Registro de Compras",
    "J-04/10-contabilidad-descargas-rvie.jpg",
    "Nubefact/SUNAT simulado, comprobantes de ejemplo no emitidos"
  ),
  "int-medicion-google": rec(
    "medicion-google",
    "panel",
    "Medición y Google: los identificadores de Google Analytics 4 y Tag Manager de la tienda",
    "J-04/03-panel-medicion-rotulo.jpg",
    "Google, Meta y TikTok simulados"
  ),
  "int-tienda-cookies": rec(
    "tienda-cookies",
    "tienda",
    "Aviso de cookies en la tienda web: aceptar, rechazar o configurar antes de medir",
    "J-04/01-tienda-aviso-cookies.jpg",
    "tienda de prueba, los pagos no son reales"
  ),
  "int-conversiones": rec(
    "conversiones-eventos",
    "panel",
    "Eventos que se habrían enviado: compras para TikTok y Meta con el código del pedido, también la de un QR Yape verificado",
    "J-04/05-panel-conversiones-eventos.jpg",
    "Meta y TikTok sin credenciales, nada se envía"
  ),
  "int-api-permisos": rec(
    "api-permisos",
    "panel",
    "API: crear una llave eligiendo qué puede leer (pedidos, ventas, comprobantes, productos, clientes con consentimiento)",
    "J-04/13-api-llaves-ejemplo.jpg",
    "envío de webhooks simulado"
  ),
  "int-webhooks-receptor": rec(
    "webhooks-receptor",
    "panel",
    "Receptor de prueba: webhooks firmados que llegan con firma válida y uno con el cuerpo alterado que se rechaza",
    "J-04/15-receptor-firma-valida-y-alterada.jpg",
    "envío de webhooks simulado"
  ),
} satisfies Record<string, CapturaInfo>;

export type ClaveCaptura = keyof typeof CAPTURAS;

/** Clips mudos (LV2-C `video/`, versión liviana), con su póster. */
export const CLIPS = {
  kiosko: { ancho: 540, alto: 960, titulo: "Pedido en el kiosko, del plato con cremas al ticket para pagar en caja", nota: "Kiosko real con la carta de la demo" },
  mesa: { ancho: 540, alto: 1168, titulo: "Una mesa divide la cuenta en partes iguales y deja propina", nota: "QR de mesa real con datos de la demo" },
  cocina: { ancho: 960, alto: 600, titulo: "Un pedido pagado entra a la pantalla de cocina y pasa a «En cocina»", nota: "Panel real con datos de la demo" },
  alarma: { ancho: 960, alto: 600, titulo: "Alarma «Nuevo pedido pagado» en la pantalla de pedidos", nota: "Panel real con datos de la demo" },
  panel: { ancho: 960, alto: 600, titulo: "Recorrido del panel: pedidos en vivo, reportes y finanzas", nota: "Panel real con datos de la demo" },
} as const;

export type ClaveClip = keyof typeof CLIPS;

/** La ficha de una captura con todos sus campos opcionales a la vista. */
export const infoCaptura = (k: ClaveCaptura): CapturaInfo => CAPTURAS[k];
