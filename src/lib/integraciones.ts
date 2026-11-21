/**
 * Catálogo de integraciones (/integraciones, ficha L-02, 16-nov-2026).
 *
 * Una sola fuente para la página /integraciones, la banda de la portada, las
 * funciones «INT-…» de las páginas de solución y el bloque «Integraciones» de
 * la comparativa de /precios.
 *
 * Reglas (encargo L-02 y regla del dueño del 13-nov):
 * - Cada integración existe en `main` de pedily-backend (B:), pedily-web (W:)
 *   o pedily-kiosk (K:): la evidencia ruta:línea va en `evidencia` y en
 *   `docs/PROMESAS.md` (filas 84–99). No se pinta en la página.
 * - Se presenta como hecha. Si necesita el alta del restaurante o del
 *   proveedor, `conecta` dice la condición real de activación, sin fechas inventadas.
 * - Todas nacen apagadas por instalación (flags del backend): se encienden
 *   por restaurante.
 * - El plan de cada una es la PROPUESTA de L-02 al coordinador (informe
 *   `pedily/_notas/plan/wip/L-02-informe.md`), coherente con
 *   `pedily/_notas/plan/D-decisiones-2026-11-15.md`. Si el coordinador cambia
 *   un plan, se cambia aquí y la página, la portada y la comparativa siguen.
 * - Sin logos de terceros: los nombres van en texto.
 */
import type { PlanMinimo } from "./soluciones";

export type CategoriaId = "apps" | "reparto" | "pagos" | "impresion" | "contabilidad" | "marketing" | "plataforma";

export const CATEGORIAS: { id: CategoriaId; nombre: string; bajada: string }[] = [
  { id: "apps", nombre: "Apps de delivery", bajada: "Los pedidos de Rappi y PedidosYa, en tu mismo panel" },
  { id: "reparto", nombre: "Reparto", bajada: "Motorizado a pedido cuando no tienes repartidor" },
  { id: "pagos", nombre: "Pagos y caja", bajada: "Cobras en tu cuenta, en línea y en el mostrador" },
  { id: "impresion", nombre: "Impresoras y cajón", bajada: "Comanda y ticket por USB, por red o desde la nube" },
  { id: "contabilidad", nombre: "SUNAT y contador", bajada: "Comprobantes, SIRE y asientos para tu contador" },
  { id: "marketing", nombre: "Google, Meta y TikTok", bajada: "Que te encuentren y medir lo que venden tus anuncios" },
  { id: "plataforma", nombre: "API y webhooks", bajada: "Conecta tus propios sistemas" },
];

export type IntegracionId =
  | "rappi"
  | "pedidosya"
  | "pedidosya-envios"
  | "yango"
  | "culqi"
  | "izipay"
  | "terminal-pos"
  | "impresoras"
  | "impresoras-nube"
  | "nubefact"
  | "contador"
  | "google"
  | "meta-tiktok"
  | "whatsapp-meta"
  | "api-webhooks";

export interface Integracion {
  id: IntegracionId;
  categoria: CategoriaId;
  nombre: string;
  /** Con quién se conecta, en texto (sin logos). */
  con: string;
  /** Qué hace, en una línea (portada y comparativa). */
  resumen: string;
  /** Qué hace, en detalle. */
  hace: string[];
  /** Condición real de activación. */
  conecta: string;
  /** Lo que pone o hace el restaurante. */
  pones: string;
  plan: PlanMinimo;
  /** Aclaración cuando una parte va en otro plan. */
  notaPlan?: string;
  /** Página de solución donde se explica dentro del flujo. */
  solucion: string;
  /** ruta:línea en `main` (B: backend, W: web, K: kiosko). No se publica. */
  evidencia: string[];
}

export const INTEGRACIONES: Integracion[] = [
  // ─────────────────────────────── Apps de delivery ───────────────────────────────
  {
    id: "rappi",
    categoria: "apps",
    nombre: "Pedidos de Rappi en tu panel",
    con: "Rappi",
    resumen: "Los pedidos de Rappi entran al mismo panel y a cocina, con alarma y aceptación automática",
    hace: [
      "Cada pedido de Rappi entra a tu panel y a la pantalla de cocina junto con los de tu web y tu WhatsApp",
      "Alarma con sonido y cuenta atrás de los 4 minutos que da Rappi para aceptar",
      "Aceptar automáticamente, o aceptar y rechazar tú, con el motivo de Rappi y los productos que faltan",
      "Avisas a Rappi que el pedido está listo para recoger desde el mismo panel",
      "Si el cliente cancela en Rappi, el pedido se cancela en tu panel y te avisamos",
      "Asocias cada producto de Rappi con tu carta; lo que no asocies entra como producto genérico",
      "Ve cuántas peticiones a Rappi salieron bien en el último día y la última semana",
    ],
    conecta:
      "Se conecta cuando Rappi aprueba la integración de tu local. Necesitas ser aliado de Rappi y darnos el identificador de tu tienda en Rappi.",
    pones: "Tu cuenta de aliado de Rappi y el identificador de tu tienda. La carta de Rappi la sigues editando en Rappi.",
    plan: "tienda",
    solucion: "cocina",
    evidencia: [
      "B:src/order/marketplace/rappi/rappi-config.ts:29 (FEATURE_RAPPI_ORDERS) y :37 (4 min)",
      "B:src/order/marketplace/rappi/rappi-orders.service.ts:138 (webhook), :240 (pedido nuevo), :384-387 (aceptar solo), :448 aceptar, :468 rechazar, :503 listo, :533 cancelaciones, :627 barrido",
      "B:src/order/marketplace/integrations/marketplace-integrations.controller.ts:46-108 (pendientes, aceptar, rechazar, asociación, métricas)",
      "W:components/dashboard/MarketplaceOrderAlarm.tsx:49,92,152 (alarma, sonido, silenciar) montada en W:app/dashboard/DashboardShell.tsx:136",
      "W:app/dashboard/integraciones/page.tsx; W:components/layout/Dashboard/IntegrationsPage/IntegrationCard.tsx:232 (producto genérico), :487 (aceptar automáticamente)",
    ],
  },
  {
    id: "pedidosya",
    categoria: "apps",
    nombre: "Pedidos de PedidosYa en tu panel",
    con: "PedidosYa",
    resumen: "Aceptas en PedidosYa como siempre y el pedido entra solo a tu panel y a cocina",
    hace: [
      "El pedido que aceptas en PedidosYa entra solo a tu panel y a la pantalla de cocina, sin tipearlo de nuevo",
      "Marcas «listo» o «entregado» en Pedily y PedidosYa se entera",
      "Si PedidosYa cancela, el pedido se cancela en tu panel",
      "Asocias cada producto de PedidosYa con tu carta, igual que con Rappi",
      "Un pedido con repartidor de PedidosYa nunca pide además un motorizado tuyo",
    ],
    conecta:
      "Se conecta cuando PedidosYa aprueba la integración y vincula tu local a Pedily. Lo pides a tu ejecutivo de PedidosYa.",
    pones: "Tu local en PedidosYa y el pedido de vinculación a tu ejecutivo. La carta la sigues editando en PedidosYa.",
    plan: "tienda",
    solucion: "cocina",
    evidencia: [
      "B:src/order/marketplace/pedidosya-pos/peya-pos.config.ts:17 (FEATURE_PEDIDOSYA_POS)",
      "B:src/order/marketplace/pedidosya-pos/peya-pos.controller.ts:61 (pedido), :75 (estados), :114-124 (panel)",
      "B:src/order/marketplace/pedidosya-pos/peya-pos.service.ts:234 (pedido), :390 (indirect: se acepta en PedidosYa), :435 listo, :455 recogido, :512 cancelación",
      "B:src/order/delivery/marketplace-courier-guard.ts:36 (no pide courier propio en pedidos de apps)",
      "W:components/layout/Dashboard/IntegrationsPage/IntegrationsPage.tsx:27",
    ],
  },
  // ─────────────────────────────── Reparto ───────────────────────────────
  {
    id: "pedidosya-envios",
    categoria: "reparto",
    nombre: "Motorizado de PedidosYa Envíos",
    con: "PedidosYa Envíos",
    resumen: "Cotizas, pides, sigues y cancelas un motorizado desde el pedido",
    hace: [
      "Desde el pedido cotizas, pides, sigues y cancelas un motorizado",
      "Con el asistente, tu cliente recibe el enlace de seguimiento por WhatsApp",
    ],
    conecta: "Con tu cuenta de PedidosYa Envíos.",
    pones: "Tu cuenta de PedidosYa Envíos. Cada viaje lo cobra PedidosYa, según tu contrato.",
    plan: "tienda",
    solucion: "delivery",
    evidencia: [
      "B:src/courier/pedidosya-envios.provider.ts:27",
      "Inventario vendible 11.6 y 11.7 (PROMESAS fila 18)",
    ],
  },
  {
    id: "yango",
    categoria: "reparto",
    nombre: "Motorizado de Yango Delivery",
    con: "Yango Delivery",
    resumen: "Pedily compara Yango con PedidosYa Envíos y pide el más barato",
    hace: [
      "Al pedir motorizado, Pedily cotiza Yango y PedidosYa Envíos y pide el que sale más barato",
      "Si Yango no puede tomar el viaje, lo pide a PedidosYa Envíos",
      "El pedido pasa solo a «en camino» y a «entregado» según avanza el viaje",
      "Cancelas el viaje desde el pedido",
    ],
    conecta: "Se conecta con tu cuenta de empresa de Yango Delivery: dejamos tu llave de acceso guardada y cifrada en tu Pedily.",
    pones: "Tu cuenta de empresa de Yango Delivery. Cada viaje lo cobra Yango, según tu contrato.",
    plan: "tienda",
    solucion: "delivery",
    evidencia: [
      "B:src/courier/courier.config.ts:15 (FEATURE_COURIER_YANGO)",
      "B:src/courier/yango/yango.provider.ts:146; B:src/courier/yango/yango.client.ts:6-7 (check-price, claims/create)",
      "B:src/courier/courier-router.ts:21 (elección por precio); B:src/courier/courier-alterno.service.ts:140",
      "B:src/courier/courier.controller.ts:72 (token), :121 (seguimiento)",
    ],
  },
  // ─────────────────────────────── Pagos ───────────────────────────────
  {
    id: "culqi",
    categoria: "pagos",
    nombre: "Tarjeta y Yape automático",
    con: "Culqi",
    resumen: "Tarjeta y Yape confirmado sin capturas, en tu cuenta Culqi",
    hace: [
      "Tarjeta de crédito o débito y Yape confirmado automáticamente, en la web, la mini-app de WhatsApp, el kiosko y la mesa",
      "Cada pago se comprueba con Culqi antes de darlo por bueno",
      "Devolución automática al rechazar o cancelar un pedido cobrado",
    ],
    conecta: "Se conecta cuando Culqi te aprueba como comercio. Mientras, cobras con el QR de tu Yape o Plin.",
    pones: "Tu cuenta Culqi. Culqi cobra su comisión por venta directo a ti.",
    plan: "tienda",
    solucion: "caja-y-pagos",
    evidencia: ["Inventario vendible 7.1–7.14 (PROMESAS filas 6, 7 y 73)", "B:src/pagos/pasarela/pasarela-pagos.ts:145 (Culqi detrás de la capa PasarelaPagos)"],
  },
  {
    id: "izipay",
    categoria: "pagos",
    nombre: "Izipay como pasarela de pagos",
    con: "Izipay",
    resumen: "Si ya trabajas con Izipay, cobras en línea con tu comercio Izipay",
    hace: [
      "Eliges por restaurante si cobras en línea con Culqi o con Izipay",
      "Pedily solo da por bueno un pago que llega firmado por Izipay",
      "Devoluciones y anulaciones desde Pedily",
    ],
    conecta:
      "Se conecta cuando Izipay afilia tu comercio y aprueba la integración con Pedily. Mientras, cobras con Culqi o con el QR de tu Yape o Plin.",
    pones: "Tu comercio afiliado a Izipay. Izipay cobra su comisión directo a ti.",
    plan: "tienda",
    solucion: "caja-y-pagos",
    evidencia: [
      "B:src/pagos/pasarela/pasarela-pagos.ts:22 (culqi | izipay)",
      "B:src/pagos/pasarela/pasarelas.service.ts:26,31 (FEATURE_PASARELA_IZIPAY + PASARELA_PAGOS)",
      "B:src/pagos/pasarela/izipay/izipay.pasarela.ts:133 (adaptador: sesión, respuesta firmada, IPN, devolución, anulación)",
      "W:components/features/checkout/PaymentForm/PaymentForm.tsx:60-63; W:lib/pagos/izipay-checkout.ts:53; W:lib/backend/izipay.ts:34 (checkout web, J-03 d230034; simulado en la demo)",
      "En real: trámite nº 4 + homologación de Izipay (PROMESAS fila 88)",
    ],
  },
  {
    id: "terminal-pos",
    categoria: "pagos",
    nombre: "Terminal POS en caja y kiosko",
    con: "Izipay o Niubiz",
    resumen: "El monto viaja solo al terminal y el pedido queda pagado al aprobarse",
    hace: [
      "«Cobrar con terminal» desde la caja: el monto sale del pedido, no se tipea",
      "En el kiosko, «Pagar con terminal» en vez de ir a la caja",
      "Aprobado, rechazado o tiempo agotado: el panel lo dice y deja reintentar o cancelar",
      "Con cualquier POS que ya tengas, anotas el número de operación del voucher y queda en el pedido, sin repetirse",
    ],
    conecta:
      "El cobro con terminal se conecta cuando tu proveedor de POS, Izipay o Niubiz, habilita la integración de su terminal con Pedily. El número de operación del voucher lo anotas desde el primer día.",
    pones: "Tu terminal POS y tu contrato con Izipay o Niubiz.",
    plan: "tienda",
    notaPlan: "En el kiosko, con el plan Completo",
    solucion: "caja-y-pagos",
    evidencia: [
      "Plan: límite técnico (R-01); el terminal del kiosko solo cobra en Completo, B:src/plan/plan-matriz.ts:162 y B:src/pagos/pagos.controller.ts:106,112 (403 PLAN_NO_INCLUYE)",
      "B:src/pagos/terminal/terminal-pago.ts:66 (interfaz), B:src/pagos/terminal/terminal-pago.service.ts:156 (iniciar), :5 (FEATURE_TERMINAL_PAGO)",
      "B:src/pagos/terminal/terminal-simulado.ts:29 (terminal implementado hoy: el simulado)",
      "B:src/order/order.service.ts:8130 (counterOperationNumber → posTransactionId)",
      "W:components/layout/Dashboard/HubPage/CobroTerminalPanel.tsx:100; W:components/layout/Dashboard/HubPage/CounterPaymentMethodDialog.tsx:9",
      "K:src/app/checkout/page.tsx:1069; K:src/app/payment/terminal/page.tsx:256",
    ],
  },
  // ─────────────────────────────── Impresión ───────────────────────────────
  {
    id: "impresoras",
    categoria: "impresion",
    nombre: "Impresora térmica por USB o por red, y cajón",
    con: "Impresoras térmicas ESC/POS",
    resumen: "Comanda y ticket automáticos, impresora por USB o por red y cajón que se abre solo",
    hace: [
      "Comanda y ticket automáticos al entrar el pedido, por USB o por la red de tu local",
      "Abre el cajón de dinero desde el panel, o al imprimir el ticket de los pagos que elijas",
      "Vista previa de cada ticket en 58 y 80 mm, antes de imprimir",
    ],
    conecta: "Con una PC con Windows en tu local y una impresora térmica. El cajón va conectado a la impresora.",
    pones: "La impresora térmica (y el cajón, si quieres) y una PC con Windows.",
    plan: "tienda",
    solucion: "cocina",
    evidencia: [
      "K:scripts/pos-bridge/lib/network-printer.js:2 (red TCP 9100)",
      "K:scripts/pos-bridge/lib/drawer.js:30-36 (pulso al cajón); K:scripts/pos-bridge/lib/websocket-server.js:172 (OPEN_DRAWER)",
      "W:components/layout/Dashboard/PrinterPage/PrinterPage.tsx:131-134 (conexión por red), :615 (Abrir cajón ahora)",
      "B:src/impresion/render/escpos-render.ts:113 (vista previa 58/80 mm); B:src/impresion/impresion-config.ts:12 (FEATURE_IMPRESION_VISTA_PREVIA)",
    ],
  },
  {
    id: "impresoras-nube",
    categoria: "impresion",
    nombre: "Impresoras en la nube, sin PC",
    con: "Star CloudPRNT y Epson Server Direct Print",
    resumen: "La impresora pide sus tickets por internet: no necesitas una PC encendida",
    hace: [
      "La impresora consulta a Pedily por internet y saca la comanda, el ticket y el cierre de caja",
      "Si un ticket no sale, se vuelve a mandar; desde el panel ves la cola y reintentas",
      "Varias impresoras, cada una con los tickets que le tocan",
    ],
    conecta: "Con una impresora Star compatible con CloudPRNT o una Epson con Server Direct Print: pegas en la impresora la dirección que te da el panel.",
    pones: "Una impresora Star o Epson compatible, conectada a internet.",
    plan: "tienda",
    solucion: "cocina",
    evidencia: [
      "B:src/impresion/impresion-publica.controller.ts:32 (CloudPRNT), :89 (Server Direct Print)",
      "B:src/impresion/impresion-config.ts:6 (FEATURE_IMPRESION_NUBE)",
      "W:components/layout/Dashboard/PrinterPage/ImpresionNube.tsx:9 (impresoras en la nube en el panel)",
    ],
  },
  // ─────────────────────────────── SUNAT y contador ───────────────────────────────
  {
    id: "nubefact",
    categoria: "contabilidad",
    nombre: "Boletas y facturas SUNAT",
    con: "Nubefact",
    resumen: "La boleta o factura sale sola al cobrar, con tu RUC",
    hace: [
      "Boleta o factura automática en todos tus canales, con tu RUC",
      "Notas de crédito, bajas y consulta del estado en SUNAT desde el panel",
    ],
    conecta: "Con tu cuenta de Nubefact, que conectas desde «Empezar».",
    pones: "Tu cuenta de Nubefact. Nubefact cobra su plan directo a ti.",
    plan: "tienda",
    solucion: "boletas-sunat",
    evidencia: ["Inventario vendible 8.1–8.10 (PROMESAS fila 9)"],
  },
  {
    id: "contador",
    categoria: "contabilidad",
    nombre: "Archivos para tu contador: SIRE y asientos",
    con: "SIRE de SUNAT · Concar · Starsoft · Contasis · Siscont",
    resumen: "TXT del Registro de Ventas para SIRE, hoja de cálculo y asientos para el programa de tu contador",
    hace: [
      "TXT del Registro de Ventas para reemplazar la propuesta en SIRE, con el nombre oficial y revisado campo por campo antes de descargar",
      "Las 33 columnas oficiales del Registro de Ventas también en hoja de cálculo (.xlsx) y CSV",
      "Registro de Compras en CSV con las compras de tu inventario",
      "Asientos de ventas listos para importar en Concar, Starsoft, Contasis o Siscont, con tus cuentas y tu subdiario",
    ],
    conecta:
      "Se enciende en tu restaurante. Los asientos se ajustan con tu contador (cuentas, códigos y subdiario) antes de importarlos en su programa.",
    pones: "Las cuentas y el subdiario que use tu contador.",
    plan: "tienda",
    solucion: "boletas-sunat",
    evidencia: [
      "B:src/contabilidad/sire/rvie-estructura.ts:225 (nombre oficial); B:src/contabilidad/sire/rvie-validador.ts",
      "B:src/contabilidad/contabilidad.controller.ts:68 (resumen y validación), :80 (txt|zip|xlsx|csv), :99 (compras)",
      "B:src/contabilidad/asientos/config.ts:108-110; B:src/contabilidad/asientos/salidas.ts:83 (Concar, Starsoft, Contasis, Siscont)",
      "W:components/layout/Dashboard/FinancesPage/ContabilidadTab.tsx:150-152 (TXT para SIRE, Excel para el contador)",
    ],
  },
  // ─────────────────────────────── Google, Meta y TikTok ───────────────────────────────
  {
    id: "google",
    categoria: "marketing",
    nombre: "Google: botón «Pedir en línea» y Analytics",
    con: "Perfil de Empresa de Google · Google Analytics 4 · Tag Manager",
    resumen: "Tu carta en el botón de pedir de Google Maps y tus ventas medidas en Google Analytics",
    hace: [
      "Guía paso a paso para poner tu tienda en el botón «Pedir en línea» de tu Perfil de Empresa de Google",
      "Comprueba desde el panel que Google puede abrir tu carta, sin bloqueos",
      "Google Analytics 4 y Tag Manager en tu tienda: producto visto, carrito y compra",
      "Aviso de cookies: nada se mide hasta que el cliente acepta",
    ],
    conecta:
      "El botón de pedir: desde tu Perfil de Empresa de Google verificado, en «Pedidos de comida». Analytics y Tag Manager: pegas sus identificadores en tu panel.",
    pones: "Tu Perfil de Empresa de Google verificado y, si quieres medir, tu propiedad de Google Analytics.",
    plan: "tienda",
    solucion: "tienda-web",
    evidencia: [
      "B:src/store/medicion/medicion.controller.ts:71 (comprobar-google); B:src/store/medicion/googlebot-check.ts:11",
      "B:src/store/medicion/medicion.ts:7-8 (GA4, GTM)",
      "W:components/layout/Dashboard/StorePage/MedicionCard.tsx:203 (botón «Pedir en línea»), :228 (comprobar)",
      "W:lib/medicion/cargador.ts:36-37; W:components/shared/Medicion/Medicion.tsx:55-57 (aviso de cookies)",
    ],
  },
  {
    id: "meta-tiktok",
    categoria: "marketing",
    nombre: "Píxel y conversiones de Meta y TikTok",
    con: "Meta (Facebook e Instagram) · TikTok",
    resumen: "Tus anuncios saben qué vendieron: píxel en la tienda y la compra enviada desde el servidor",
    hace: [
      "Píxel de Meta y de TikTok en tu tienda, solo con el permiso del cliente",
      "La compra se envía también desde el servidor (Conversions API de Meta y Events API de TikTok) con el mismo número de pedido, para no contarla dos veces",
      "Verificación de tu dominio en Meta desde el panel",
    ],
    conecta: "Con tu píxel y tu token de conversiones de Meta y de TikTok, que pegas en tu Pedily.",
    pones: "Tus cuentas publicitarias de Meta y TikTok.",
    plan: "tienda",
    solucion: "tienda-web",
    evidencia: [
      "W:lib/medicion/cargador.ts:38-39 (Meta y TikTok, tras el consentimiento)",
      "B:src/conversiones/conversiones.config.ts:18 (FEATURE_META_CAPI_WEB); B:src/conversiones/conversiones.service.ts:158 (reportarCompra)",
      "B:src/order/order.service.ts:8512,9810; B:src/order/system-event-emitter.service.ts:195 (Purchase también en cobros manuales y QR/Yape/Plin verificados, J-04 bf6e884)",
      "B:src/conversiones/meta-capi.builder.ts:6; B:src/conversiones/tiktok-events.builder.ts:13",
      "B:src/store/medicion/event-id.ts (event_id = número de pedido)",
    ],
  },
  {
    id: "whatsapp-meta",
    categoria: "marketing",
    nombre: "WhatsApp: tu carta en el chat y anuncios medidos",
    con: "WhatsApp Business de Meta",
    resumen: "Tus platos en el carrito de WhatsApp y las ventas de tus anuncios que abren WhatsApp, medidas",
    hace: [
      "El asistente muestra hasta 30 platos de tu catálogo dentro del chat, para agregarlos al carrito de WhatsApp",
      "Formulario de pedido de WhatsApp (Flows) para quien prefiere tocar en vez de escribir",
      "La venta que llega desde un anuncio que abre WhatsApp se informa a Meta",
    ],
    conecta:
      "El catálogo, con tu catálogo de Meta conectado a tu WhatsApp. El formulario, al publicarlo en tu cuenta de WhatsApp. La medición de anuncios, cuando Meta aprueba ese permiso para Pedily.",
    pones: "Tu catálogo en el Administrador de comercio de Meta.",
    plan: "whatsapp",
    solucion: "asistente-whatsapp",
    evidencia: [
      "B:src/whatsapp-flows/catalogo-en-chat.service.ts:6-7, :84 (product_list, FEATURE_WA_CATALOG_MESSAGES)",
      "B:src/whatsapp-flows/pedido-flow.service.ts:7 (FEATURE_WHATSAPP_ORDER_FLOW); B:src/whatsapp-flows/definitions/pedido.json",
      "B:src/conversiones/conversiones.config.ts:19 (FEATURE_META_CAPI_WHATSAPP); B:src/conversiones/meta-capi.builder.ts:13-14 (business_messaging, ctwa_clid)",
    ],
  },
  // ─────────────────────────────── API y webhooks ───────────────────────────────
  {
    id: "api-webhooks",
    categoria: "plataforma",
    nombre: "API, webhooks y Zapier",
    con: "Tus sistemas · Zapier",
    resumen: "Lee pedidos, ventas y comprobantes desde tus sistemas y recibe un aviso firmado en cada venta",
    hace: [
      "API de lectura: pedidos, ventas por día, comprobantes, productos y clientes que dieron su permiso",
      "Llaves por restaurante con permisos por recurso, que se ven una sola vez y se revocan desde el panel",
      "Avisos firmados (webhooks) a la dirección que elijas: pedido creado, cambio de estado, pagado, comprobante emitido y stock bajo",
      "Reintentos durante unos 3 días y registro de cada entrega, con reenvío a mano",
      "Documentación pública de la API",
    ],
    conecta:
      "Se enciende en tu restaurante y creas tus llaves en el panel. La app de Pedily en Zapier se conecta cuando Zapier la aprueba.",
    pones: "El sistema o la herramienta que quieras conectar.",
    plan: "completo",
    solucion: "reportes",
    evidencia: [
      "B:src/plataforma-abierta/plataforma-config.ts:23,25 (FEATURE_PUBLIC_API, FEATURE_OUTBOUND_WEBHOOKS)",
      "B:src/plataforma-abierta/public-api.controller.ts:84-91 (/api/v1/me, /orders…)",
      "B:src/plataforma-abierta/webhooks/eventos.ts:15-19; B:src/plataforma-abierta/webhooks/firma.ts:35",
      "B:src/plataforma-abierta/plataforma-publico.controller.ts:4,29 (OpenAPI y docs)",
      "W:components/layout/Dashboard/PlataformaPage/PlataformaPage.tsx:81; B:integraciones/zapier/triggers.js:1",
      "Plan Completo: límite técnico (R-01); fuera de Completo se leen apagadas y el panel no las enciende (B:src/plan/plan-matriz.ts:183-188; B:src/feature-flag/feature-flag.service.ts:161; B:src/feature-flag/feature-flag.controller.ts:122-123, 403 PLAN_NO_INCLUYE)",
    ],
  },
];

export const RUTA_INTEGRACIONES = "/integraciones";
export const RUTA_INTEGRACION = (id: IntegracionId) => `${RUTA_INTEGRACIONES}#${id}`;

export function integracionPorId(id: string): Integracion | undefined {
  return INTEGRACIONES.find((i) => i.id === id);
}

export function integracionesDe(c: CategoriaId): Integracion[] {
  return INTEGRACIONES.filter((i) => i.categoria === c);
}

/** «INT-rappi» → plan de la integración (funciones de las páginas de solución). */
export const PREFIJO_REF = "INT-";
export function planDeRefIntegracion(ref: string): PlanMinimo | undefined {
  if (!ref.startsWith(PREFIJO_REF)) return undefined;
  return integracionPorId(ref.slice(PREFIJO_REF.length))?.plan;
}
