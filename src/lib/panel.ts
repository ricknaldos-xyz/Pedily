/**
 * Las 48 pantallas del panel de gestión, en los 8 grupos del inventario
 * vendible (`research_notes/Pedily landing v2 2026-11-15/02_inventario_vendible.md`
 * §3.1–3.8). Cada pantalla trae lo que ve el dueño y la decisión que le
 * permite tomar, con la ruta del código en el inventario. Las 3 pantallas de
 * uso técnico (Interruptores, Observabilidad y Planificación, que redirige a
 * Producción diaria) cuentan en las 48 pero no se describen (§3.7, §3.8, §3.4).
 */
import type { ClaveCaptura } from "./capturas";

export interface Pantalla {
  nombre: string;
  ve: string;
  /** Nace apagada o necesita algo del restaurante. */
  opcion?: boolean;
  /** Plan mínimo si no es Tienda. */
  /** «mesa» = complemento QR de mesa (+S/ 150) o incluido en Completo (16-nov). */
  plan?: "whatsapp" | "completo" | "mesa";
  /** Uso técnico: cuenta en las 48, no se vende. */
  tecnica?: boolean;
}

export interface GrupoPanel {
  id: string;
  nombre: string;
  decide: string;
  captura?: ClaveCaptura;
  /** Otras pantallas reales del área, en pequeño. */
  extra?: ClaveCaptura[];
  solucion?: string;
  pantallas: Pantalla[];
}

export const PANEL: GrupoPanel[] = [
  {
    id: "operacion",
    nombre: "Operación en vivo y tienda",
    decide: "Qué atender ya, qué cobro verificar, si pausar la tienda y cómo vende cada canal.",
    captura: "panel-pedidos",
    extra: ["panel-mesas", "panel-ahora"],
    solucion: "cocina",
    pantallas: [
      {
        nombre: "Pedidos",
        ve: "Contadores del día, tablero por columnas, pestañas de entregados, cancelados, problemas, envíos, pagos fallidos y programados; por pedido: estado, pago, boleta, nota de crédito, motorizado, reembolso e historial.",
      },
      { nombre: "Cocina", ve: "Por cocinar → en cocina → listo, con tamaño, combo, cremas, reloj de demora y sonido al entrar un pedido." },
      {
        nombre: "Mesas",
        ve: "Mesas abiertas con rondas, total, pagado y lo que falta; avisos del comensal; cobrar en caja, cerrar mesa y QR en PNG o PDF.",
        opcion: true,
        plan: "mesa",
      },
      { nombre: "Ahora", ve: "Tienda abierta o en pausa, meta del día, «qué hay que hacer», cobrado contra otro día, tiempo de cocina, stock bajo y caja." },
      { nombre: "Mi negocio", ve: "Datos, horario por día, «Cerrar por hoy», delivery y recojo, medios de pago, meta del día y exportar todos tus datos." },
      { nombre: "Códigos postales", ve: "Zonas de reparto en tabla o mapa, con su tarifa y envío mínimo, máximo y promedio." },
      { nombre: "Opciones de tu tienda", ve: "Saldo a favor, referidos, cupón de bienvenida, promociones, condominios y programados, con sus resultados antes y después." },
      { nombre: "Empezar", ve: "Los 14 pasos para abrir tu tienda, con su avance: lo mínimo para vender, completar y opcionales." },
      { nombre: "Impresora", ve: "Estado de la impresión en esta PC, elegir impresora, probar, datos del ticket y comanda automática." },
    ],
  },
  {
    id: "dinero",
    nombre: "Ventas y caja",
    decide: "Si lo cobrado cuadra con Culqi y el banco, si el mes gana plata y cuánto se debe.",
    captura: "panel-estado-resultados",
    extra: ["panel-finanzas"],
    solucion: "caja-y-pagos",
    pantallas: [
      { nombre: "Cierre del día", ve: "Venta del día en cascada y por medio de pago, «Coincide» o «Requiere atención», gastos, CSV, cerrar y reabrir con motivo." },
      {
        nombre: "Finanzas",
        ve: "Por mes: dashboard de costos y márgenes, estado de resultados, impuestos, flujo de caja, cuentas por pagar, planilla y comprobantes electrónicos.",
      },
    ],
  },
  {
    id: "carta",
    nombre: "Carta y costos",
    decide: "Qué vender, a qué precio y con qué margen.",
    captura: "panel-recetas",
    extra: ["panel-receta-detalle", "panel-reportes-menu"],
    solucion: "inventario-y-recetas",
    pantallas: [
      { nombre: "Productos", ve: "Platos con foto, precio, promo, etiquetas y tiempo de preparación; margen y costo por plato; ordenar arrastrando." },
      { nombre: "Ítems del combo", ve: "Platos del combo, cuánto ahorra el cliente y la ganancia del combo." },
      { nombre: "Modificadores del plato", ve: "Grupos de cremas y extras, obligatorios u opcionales, con mínimo, máximo e incluidas gratis." },
      { nombre: "Tamaños del plato", ve: "Cada tamaño con foto, precio, promo y agotado por tamaño." },
      { nombre: "Categorías", ve: "Categorías con foto, orden y «mostrar en inicio»." },
      { nombre: "Presentaciones", ve: "Lista maestra de tamaños y en cuántos platos se usa cada uno." },
      { nombre: "Modificadores", ve: "Opciones con precio, opción por defecto e insumo que se descuenta al elegirla." },
      { nombre: "Recetas", ve: "Insumos con cantidad y costo, subrecetas, costo por plato, food cost, platos sin receta y merma." },
      { nombre: "Costos de insumos", ve: "Cada insumo con unidad, empaque, precio, merma, mínimo y proveedor, con historial de costos." },
    ],
  },
  {
    id: "almacen",
    nombre: "Inventario, compras y producción",
    decide: "Qué falta, dónde se pierde, qué comprar y qué preparar hoy.",
    captura: "panel-inventario",
    extra: ["panel-produccion", "panel-compras"],
    solucion: "inventario-y-recetas",
    pantallas: [
      { nombre: "Inventario", ve: "Críticos, todos, preparados, almacén y platos; OK, bajo mínimo o agotado; ajustes y kárdex." },
      { nombre: "Conteo diario", ve: "Apertura o cierre: esperado contra contado, diferencia y merma valorizada en soles." },
      { nombre: "Compras", ve: "Compras por estado y proveedor, recepción y pago o cuenta por pagar." },
      { nombre: "Proveedores", ve: "Proveedor con RUC validado, contacto, notas y número de compras." },
      { nombre: "Menaje", ve: "Equipos y menaje por categoría y estado, con cantidad, precio y ubicación." },
      { nombre: "Producción diaria", ve: "Qué preparar hoy, «Producir» en 3 pasos y lotes con vencimiento." },
      { nombre: "Ficha de cocina", ve: "Ficha técnica sin costos, escalable de ×½ a ×3, para imprimir." },
      { nombre: "Planificación de producción", ve: "Redirige a Producción diaria.", tecnica: true },
    ],
  },
  {
    id: "equipo",
    nombre: "Equipo y accesos",
    decide: "Quién entra al panel, qué toca cada uno y cuánto cuesta tu planilla.",
    captura: "panel-roles",
    pantallas: [
      { nombre: "Empleados", ve: "Ficha de cada empleado, contrato, sueldo o tarifa por hora, horario semanal y turnos." },
      { nombre: "Usuarios", ve: "Crear usuarios, cambiar su rol y darles permisos personalizados." },
      { nombre: "Roles", ve: "23 módulos × 4 acciones (ver, crear, editar y borrar) por rol." },
      { nombre: "Entrar", ve: "Acceso al panel con correo y contraseña." },
      { nombre: "Salir", ve: "Cierra la sesión y limpia los datos de esta computadora." },
    ],
  },
  {
    id: "clientes",
    nombre: "Clientes y promociones",
    decide: "A quién premiar, a quién recuperar y si vale la pena pagar WhatsApp para traerlo.",
    captura: "panel-clientes",
    extra: ["panel-cliente-ficha", "panel-campanas"],
    solucion: "clientes-y-campanas",
    pantallas: [
      { nombre: "Clientes", ve: "Ficha con pedidos, gasto, saldo y último pedido; nuevos, recurrentes y los que no vuelven." },
      { nombre: "Promociones", ve: "Descuentos por categoría con fechas y cupones con tope, usos, vencimiento y alcance." },
      {
        nombre: "Campañas",
        ve: "Tres campañas con modo Apagada, Prueba o Encendida, vista previa, costo estimado y resultados de 30 días.",
        opcion: true,
        plan: "whatsapp",
      },
      { nombre: "Reclamos", ve: "Libro de Reclamaciones con los días que quedan del plazo legal y respuesta por correo o carta." },
    ],
  },
  {
    id: "asistente",
    nombre: "Asistente de WhatsApp",
    decide: "Cómo y cuándo atiende el asistente, cuánto gasta y cuándo lo toma una persona.",
    captura: "panel-conversaciones",
    extra: ["panel-atencion", "panel-gasto-asistente"],
    solucion: "asistente-whatsapp",
    pantallas: [
      {
        nombre: "Bot IA",
        ve: "Configuración, analíticas (ventas, resueltos sin persona, costo de IA), canales conectados y gasto del mes con su tope.",
        plan: "whatsapp",
      },
      { nombre: "Playground", ve: "Chatear con el asistente sin WhatsApp, simular pagos y ver carrito, dirección y pedido.", plan: "whatsapp" },
      { nombre: "Conversaciones", ve: "Cola de atención, «Necesita una persona», tomar control, devolver al bot, notas y pedido actual.", plan: "whatsapp" },
      { nombre: "Respuestas rápidas", ve: "Respuestas guardadas para que el equipo conteste igual y rápido.", opcion: true, plan: "whatsapp" },
      { nombre: "Mensajes", ve: "Los textos del asistente, editables, con dos saludos para comparar.", plan: "whatsapp" },
      { nombre: "Plantillas", ve: "Plantillas de Meta con su tipo y estado.", plan: "whatsapp" },
      { nombre: "Horarios", ve: "El horario que usan el asistente, la mini-app y la web.", plan: "whatsapp" },
      { nombre: "Compensación", ve: "Qué ofrecer según la queja y su gravedad: disculpa, vale, delivery gratis o pasar a persona.", opcion: true, plan: "whatsapp" },
      { nombre: "Interruptores", ve: "Opciones de la instalación (uso del equipo de alta).", tecnica: true },
    ],
  },
  {
    id: "reportes",
    nombre: "Reportes",
    decide: "Qué vender más, a qué hora reforzar personal y qué canal y zona rinden.",
    captura: "panel-reportes",
    extra: ["panel-reportes-tiempos", "panel-reportes-clientes"],
    solucion: "reportes",
    pantallas: [
      {
        nombre: "Reportes",
        ve: "Resumen, análisis operativo con mapa de calor, clientes, zonas, tiempos y carta por popularidad y margen; exportar CSV.",
      },
      { nombre: "Observabilidad", ve: "Conversiones enviadas a herramientas de anuncios (uso técnico).", tecnica: true },
    ],
  },
];

export const TOTAL_PANTALLAS = PANEL.reduce((n, g) => n + g.pantallas.length, 0);
