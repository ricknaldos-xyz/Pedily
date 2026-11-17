import type { MetadataRoute } from "next";

/** Manifest con la marca «la comanda» (L-04). Iconos de scripts/generar-marca.cjs. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pedily · Sistema para restaurantes",
    short_name: "Pedily",
    description: "Vende directo. La comisión se queda contigo.",
    start_url: "/",
    display: "browser",
    background_color: "#fbf7f0",
    theme_color: "#24102e",
    lang: "es-PE",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
