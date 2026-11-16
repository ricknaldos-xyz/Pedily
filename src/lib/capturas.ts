/**
 * Registro de capturas reales del producto que usa la landing.
 *
 * `src` es la ruta bajo `public/`. Si el archivo no existe al compilar, el
 * componente <Captura> pinta su reemplazo (mini-interfaz con datos de la demo).
 * Las capturas «esperadas» las genera LV2-C con datos vivos en
 * `research_notes/Pedily landing v2 2026-11-15/capturas-producto/`; se copian
 * aquí optimizadas (WebP, máx. 1600 px de ancho, calidad 80) con este nombre.
 *
 * Estado al 15-nov-2026 (LV2-D):
 *   existe   = ya está en public/
 *   esperada = aún no; se ve el reemplazo
 */
export interface CapturaInfo {
  src: string;
  alt: string;
  /** De dónde sale (para quien la regenere). */
  origen: string;
}

export const CAPTURAS = {
  // ── Ya en el repo (G-08) ────────────────────────────────────────────────
  "tienda-carta": {
    src: "/capturas/tienda-carta.webp",
    alt: "Carta de la tienda de ejemplo en un celular: acompañamientos con foto, tamaños y precio",
    origen: "DEMO-WEB /menu a 390 px (G-08)",
  },
  "kiosko-carta": {
    src: "/capturas/kiosko-carta.webp",
    alt: "Kiosko de autoservicio con la misma carta: acompañamientos con foto, precio y botón Agregar",
    origen: "DEMO-KIOSKO /menu (G-08)",
  },
  "panel-opciones": {
    src: "/capturas/panel-opciones.webp",
    alt: "Pantalla «Opciones de tu tienda» del panel, con saldo a favor y referidos",
    origen: "DEMO-WEB /dashboard/opciones-tienda (G-08)",
  },
  "panel-empezar": {
    src: "/capturas/panel-empezar.webp",
    alt: "Asistente «Empezar» del panel con el avance de la tienda y los pasos Tu negocio, Tu carta, Horarios y Cobros",
    origen: "DEMO-WEB /dashboard/empezar (G-08)",
  },

  // ── Esperadas de LV2-C (panel con datos sembrados, 1440×900) ────────────
  "panel-pedidos": {
    src: "/capturas/panel/pedidos.webp",
    alt: "Pedidos en vivo: contadores del día y tablero por columnas, de pendientes a listos",
    origen: "/dashboard (tablero, con pedidos sembrados)",
  },
  "panel-ahora": {
    src: "/capturas/panel/ahora.webp",
    alt: "Panel «Ahora»: tienda abierta, meta del día, qué hay que hacer, cobrado hoy y stock bajo",
    origen: "/dashboard/operaciones",
  },
  "panel-cocina": {
    src: "/capturas/panel/cocina.webp",
    alt: "Pantalla de cocina: pedidos por cocinar y en cocina, con tamaño, cremas y minutos de espera",
    origen: "/dashboard/cocina",
  },
  "panel-caja": {
    src: "/capturas/panel/caja.webp",
    alt: "Cierre del día: venta del día por medio de pago, lo del sistema frente a lo del proveedor",
    origen: "/dashboard/caja",
  },
  "panel-finanzas": {
    src: "/capturas/panel/finanzas.webp",
    alt: "Finanzas: ingresos, costo de alimentos, margen y tendencia de seis meses",
    origen: "/dashboard/finanzas",
  },
  "panel-inventario": {
    src: "/capturas/panel/inventario.webp",
    alt: "Inventario: insumos con stock, mínimo y estado OK, bajo mínimo o agotado",
    origen: "/dashboard/inventario",
  },
  "panel-recetas": {
    src: "/capturas/panel/recetas.webp",
    alt: "Recetas: insumos de un plato con su costo y el food cost",
    origen: "/dashboard/recetas",
  },
  "panel-clientes": {
    src: "/capturas/panel/clientes.webp",
    alt: "Clientes: nuevos, recurrentes y los que no vuelven, con su ficha",
    origen: "/dashboard/clientes (clientes v2 encendido)",
  },
  "panel-campanas": {
    src: "/capturas/panel/campanas.webp",
    alt: "Campañas de WhatsApp en modo prueba, con vista previa y costo estimado",
    origen: "/dashboard/campanas",
  },
  "panel-reportes": {
    src: "/capturas/panel/reportes.webp",
    alt: "Reportes: ventas por día y por hora, top platos y ventas por canal",
    origen: "/dashboard/reportes",
  },
  "panel-mesas": {
    src: "/capturas/panel/mesas.webp",
    alt: "Mesas abiertas con su total, lo pagado y lo que falta",
    origen: "/dashboard/mesas (FEATURE_TABLE_QR encendido)",
  },
  "panel-conversaciones": {
    src: "/capturas/panel/conversaciones.webp",
    alt: "Bandeja de conversaciones de WhatsApp con la cola de atención",
    origen: "/dashboard/conversaciones",
  },
  "panel-playground": {
    src: "/capturas/panel/playground.webp",
    alt: "Playground del asistente: chat de prueba con el carrito al lado",
    origen: "/dashboard/bot/playground",
  },
  "panel-roles": {
    src: "/capturas/panel/roles.webp",
    alt: "Roles: permisos por módulo para ver, crear, editar y borrar",
    origen: "/dashboard/roles",
  },
  "panel-programados": {
    src: "/capturas/panel/programados.webp",
    alt: "Pestaña «Programados» de Pedidos con los pedidos para más tarde",
    origen: "/dashboard (pestaña Programados)",
  },
  "panel-zonas": {
    src: "/capturas/panel/zonas.webp",
    alt: "Zonas de reparto con su tarifa",
    origen: "/dashboard/codigos-postales",
  },

  // ── Esperadas de LV2-C (cliente, 390 px) ────────────────────────────────
  "mesa-cuenta": {
    src: "/capturas/mesa/cuenta.webp",
    alt: "QR de mesa en el celular del comensal: cuenta en vivo y opciones para pagar",
    origen: "/mesa/<token> a 390 px",
  },
  "tienda-programar": {
    src: "/capturas/tienda/programar.webp",
    alt: "Checkout de la tienda: elegir lo antes posible o programar día y hora",
    origen: "/checkout a 390 px con programados encendido",
  },
  "wa-chat": {
    src: "/capturas/wa/chat.webp",
    alt: "Conversación con el asistente de WhatsApp que arma el pedido y manda el enlace para pagar",
    origen: "número demo o Playground a 390 px",
  },
} satisfies Record<string, CapturaInfo>;

export type ClaveCaptura = keyof typeof CAPTURAS;
