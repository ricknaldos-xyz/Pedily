/**
 * «Así se ve»: capturas reales extra de cada página de solución (LV2-E).
 * Todas son del producto real con datos ficticios de «Restaurante Demo»
 * (LV2-C) o de la demo en modo simulado (`int-*`, fichas J, L-04). El orden es el del recorrido: lo que ve el cliente y luego el panel.
 */
import type { ClaveCaptura } from "./capturas";

export const GALERIAS: Record<string, ClaveCaptura[]> = {
  "asistente-whatsapp": ["panel-conversaciones", "panel-atencion", "panel-playground", "panel-gasto-asistente"],
  "tienda-web": ["tienda-inicio", "tienda-cremas", "tienda-carrito", "tienda-beneficios", "panel-pedidos", "panel-promociones", "int-tienda-cookies"],
  kiosko: ["kiosko-plato", "kiosko-pago", "kiosko-ticket", "panel-cocina", "int-kiosko-terminal"],
  "qr-de-mesa": ["mesa-carta", "mesa-ronda", "mesa-mis-platos", "panel-mesas"],
  "pedidos-programados": ["wa-entrega", "panel-programados"],
  cocina: ["panel-pedidos", "panel-cocina", "panel-ahora", "panel-produccion", "int-rappi-alarma", "int-pedidosya-pedido"],
  "caja-y-pagos": ["wa-pago", "kiosko-pago", "panel-finanzas", "panel-estado-resultados", "int-caja-terminal"],
  "boletas-sunat": ["tienda-comprobante", "kiosko-pago", "panel-mi-negocio", "int-contabilidad"],
  delivery: ["tienda-inicio", "tienda-mis-pedidos", "panel-pedidos", "panel-reportes-zonas", "int-repartos"],
  "inventario-y-recetas": ["panel-recetas", "panel-receta-detalle", "panel-produccion", "panel-compras"],
  "clientes-y-campanas": ["tienda-beneficios", "panel-clientes", "panel-campanas", "panel-promociones"],
  reportes: ["panel-reportes-menu", "panel-reportes-tiempos", "panel-reportes-clientes", "panel-estado-resultados", "int-api-permisos"],
};
