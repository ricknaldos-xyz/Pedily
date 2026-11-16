import { Captura } from "@/components/marca/Captura";
import {
  PanelCaja,
  PanelClientes,
  PanelCocina,
  PanelInventario,
  PanelPedidos,
  PanelReportes,
} from "@/components/producto/MiniPanel";
import { RUTA_SOLUCION } from "@/lib/soluciones";
import { PestanasPanel, type PestanaPanel } from "./PestanasPanel";

const T = "(max-width: 1024px) 92vw, 900px";

/** Las 6 pestañas del panel (benchmark §5.3 n.º 6), con captura real o mini-interfaz. */
export function pestanasPanel(): PestanaPanel[] {
  return [
    {
      id: "pedidos",
      nombre: "Operación en vivo",
      url: "mirestaurante · panel/pedidos",
      texto:
        "Todos tus canales en un tablero por columnas, en vivo y con sonido. Verificas pagos, emites boleta o nota de crédito, pides motorizado y escribes al cliente desde el pedido.",
      dato: { valor: "38", nombre: "pedidos hoy" },
      enlace: { href: RUTA_SOLUCION("cocina"), texto: "Cocina y operación" },
      contenido: <Captura clave="panel-pedidos" sizes={T} reemplazo={<PanelPedidos />} />,
    },
    {
      id: "cocina",
      nombre: "Cocina",
      url: "mirestaurante · panel/cocina",
      texto:
        "Por cocinar → en cocina → listo, con tamaño, partes del combo, cremas y un reloj de demora por colores. Sin papelitos.",
      dato: { valor: "14 min", nombre: "confirmado → listo" },
      enlace: { href: RUTA_SOLUCION("cocina"), texto: "La pantalla de cocina" },
      contenido: <Captura clave="panel-cocina" sizes={T} reemplazo={<PanelCocina />} />,
    },
    {
      id: "caja",
      nombre: "Caja y finanzas",
      url: "mirestaurante · panel/caja",
      texto:
        "El cierre del día compara lo vendido con lo que cobraron Culqi y el banco, medio por medio. Finanzas te da el estado de resultados, impuestos y cuentas por pagar.",
      dato: { valor: "Coincide", nombre: "Yape y tarjeta" },
      enlace: { href: RUTA_SOLUCION("caja-y-pagos"), texto: "Caja y pagos" },
      contenido: <Captura clave="panel-caja" sizes={T} reemplazo={<PanelCaja />} />,
    },
    {
      id: "inventario",
      nombre: "Inventario y recetas",
      url: "mirestaurante · panel/inventario",
      texto:
        "Recetas con costo y food cost, stock que baja con cada venta, conteos con merma en soles, compras, proveedores y producción diaria.",
      dato: { valor: "35 %", nombre: "food cost del plato" },
      enlace: { href: RUTA_SOLUCION("inventario-y-recetas"), texto: "Inventario y recetas" },
      contenido: <Captura clave="panel-inventario" sizes={T} reemplazo={<PanelInventario />} />,
    },
    {
      id: "clientes",
      nombre: "Clientes y campañas",
      url: "mirestaurante · panel/clientes",
      texto:
        "Nuevos, recurrentes y los que no vuelven. Cupones, referidos, saldo a favor y campañas por WhatsApp solo a quien dio su permiso, con su costo estimado antes de enviar.",
      dato: { valor: "7", nombre: "pedidos de la campaña" },
      enlace: { href: RUTA_SOLUCION("clientes-y-campanas"), texto: "Clientes y campañas" },
      contenido: <Captura clave="panel-clientes" sizes={T} reemplazo={<PanelClientes />} />,
    },
    {
      id: "reportes",
      nombre: "Reportes",
      url: "mirestaurante · panel/reportes",
      texto:
        "Ventas por día, hora, canal y zona, mapa de calor, platos por popularidad y margen, recompra y tiempos. Todo exportable en CSV para tu contador.",
      dato: { valor: "S/ 43,70", nombre: "ticket promedio" },
      enlace: { href: RUTA_SOLUCION("reportes"), texto: "Reportes y finanzas" },
      contenido: <Captura clave="panel-reportes" sizes={T} reemplazo={<PanelReportes />} />,
    },
  ];
}

export function PanelSeis({ oscuro = false }: { oscuro?: boolean }) {
  return <PestanasPanel pestanas={pestanasPanel()} oscuro={oscuro} />;
}
