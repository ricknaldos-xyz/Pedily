import { Captura } from "@/components/marca/Captura";
import { RUTA_SOLUCION } from "@/lib/soluciones";
import { PestanasPanel, type PestanaPanel } from "./PestanasPanel";

const T = "(max-width: 1024px) 92vw, 900px";

/**
 * Las 6 pestañas del panel (benchmark §5.3 n.º 6), con capturas reales del
 * panel (LV2-C, datos ficticios de «Restaurante Demo»). Las cifras de la
 * etiqueta salen de cada captura.
 */
export function pestanasPanel(): PestanaPanel[] {
  return [
    {
      id: "pedidos",
      nombre: "Operación en vivo",
      url: "mirestaurante · panel/pedidos",
      texto:
        "Todos tus canales en un tablero por columnas, en vivo y con sonido. Verificas pagos, emites boleta o nota de crédito, pides motorizado y escribes al cliente desde el pedido.",
      dato: { valor: "54", nombre: "pedidos hoy" },
      enlace: { href: RUTA_SOLUCION("cocina"), texto: "Cocina y operación" },
      contenido: <Captura clave="panel-pedidos" sizes={T} />,
    },
    {
      id: "cocina",
      nombre: "Cocina",
      url: "mirestaurante · panel/cocina",
      texto:
        "Por cocinar → en cocina → listo, con tamaño, partes del combo, cremas y un reloj de demora por colores. Sin papelitos.",
      dato: { valor: "≈ 16 min", nombre: "reloj de cada pedido" },
      enlace: { href: RUTA_SOLUCION("cocina"), texto: "La pantalla de cocina" },
      contenido: <Captura clave="panel-cocina" sizes={T} />,
    },
    {
      id: "caja",
      nombre: "Caja y finanzas",
      url: "mirestaurante · panel/finanzas",
      texto:
        "Finanzas te da ingresos, costo de alimentos, márgenes, estado de resultados, impuestos y cuentas por pagar. El cierre del día compara lo vendido con lo que cobraron Culqi y el banco, medio por medio.",
      dato: { valor: "61,6 %", nombre: "margen bruto del mes" },
      enlace: { href: RUTA_SOLUCION("caja-y-pagos"), texto: "Caja y pagos" },
      contenido: <Captura clave="panel-finanzas" sizes={T} />,
    },
    {
      id: "inventario",
      nombre: "Inventario y recetas",
      url: "mirestaurante · panel/recetas",
      texto:
        "Recetas con costo y food cost, stock que baja con cada venta, conteos con merma en soles, compras, proveedores y producción diaria.",
      dato: { valor: "25,2 %", nombre: "food cost del plato" },
      enlace: { href: RUTA_SOLUCION("inventario-y-recetas"), texto: "Inventario y recetas" },
      contenido: <Captura clave="panel-recetas" sizes={T} />,
    },
    {
      id: "clientes",
      nombre: "Clientes y campañas",
      url: "mirestaurante · panel/clientes",
      texto:
        "Nuevos, recurrentes y los que no vuelven. Cupones, referidos, saldo a favor y campañas por WhatsApp solo a quien dio su permiso, con su costo estimado antes de enviar.",
      dato: { valor: "63", nombre: "clientes con su ficha" },
      enlace: { href: RUTA_SOLUCION("clientes-y-campanas"), texto: "Clientes y campañas" },
      contenido: <Captura clave="panel-clientes" sizes={T} />,
    },
    {
      id: "reportes",
      nombre: "Reportes",
      url: "mirestaurante · panel/reportes",
      texto:
        "Ventas por día, hora, canal y zona, mapa de calor, platos por popularidad y margen, recompra y tiempos. Todo exportable en CSV para tu contador.",
      dato: { valor: "Estrella", nombre: "popular y con buen margen" },
      enlace: { href: RUTA_SOLUCION("reportes"), texto: "Reportes y finanzas" },
      contenido: <Captura clave="panel-reportes-menu" sizes={T} />,
    },
  ];
}

export function PanelSeis({ oscuro = false }: { oscuro?: boolean }) {
  return <PestanasPanel pestanas={pestanasPanel()} oscuro={oscuro} />;
}
