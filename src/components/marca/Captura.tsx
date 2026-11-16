import fs from "node:fs";
import path from "node:path";
import Image, { getImageProps } from "next/image";
import { CAPTURAS, type CapturaInfo, type ClaveCaptura } from "@/lib/capturas";

/**
 * Captura real del producto, o su reemplazo mientras no exista.
 *
 * Cada captura tiene un nombre de archivo esperado en `src/lib/capturas.ts`
 * (bajo `public/`). Al compilar se mira si el archivo existe y se leen sus
 * medidas reales: si está, se pinta con next/image (WebP/AVIF, tamaños y carga
 * diferida); si no, se pinta `reemplazo` (una mini-interfaz con datos de la
 * demo, marcada como tal). Cuando lleguen las capturas de LV2-C basta con
 * copiarlas con su nombre: no hay que tocar código.
 */

function medidas(archivo: string): { ancho: number; alto: number } | null {
  let b: Buffer;
  try {
    b = fs.readFileSync(archivo);
  } catch {
    return null;
  }
  // PNG
  if (b.length > 24 && b.toString("ascii", 1, 4) === "PNG") {
    return { ancho: b.readUInt32BE(16), alto: b.readUInt32BE(20) };
  }
  // WebP
  if (b.length > 30 && b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
    const tipo = b.toString("ascii", 12, 16);
    if (tipo === "VP8X") {
      return { ancho: 1 + b.readUIntLE(24, 3), alto: 1 + b.readUIntLE(27, 3) };
    }
    if (tipo === "VP8 ") {
      return { ancho: b.readUInt16LE(26) & 0x3fff, alto: b.readUInt16LE(28) & 0x3fff };
    }
    if (tipo === "VP8L") {
      const bits = b.readUInt32LE(21);
      return { ancho: (bits & 0x3fff) + 1, alto: ((bits >> 14) & 0x3fff) + 1 };
    }
  }
  return null;
}

export function existeCaptura(clave: ClaveCaptura): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", CAPTURAS[clave].src));
}

/**
 * Pinta la captura con next/image (AVIF/WebP al tamaño justo y carga diferida).
 * Si la captura del panel tiene versión de celular y `movil` no es false, en
 * pantallas de menos de 640 px se ve esa (legible) en lugar de la de escritorio.
 */
export function Captura({
  clave,
  reemplazo,
  sizes,
  prioridad = false,
  className,
  movil = true,
  decorativa = false,
}: {
  clave: ClaveCaptura;
  reemplazo?: React.ReactNode;
  sizes: string;
  prioridad?: boolean;
  className?: string;
  movil?: boolean;
  /** El texto de al lado ya la describe (pie de foto): alt vacío. */
  decorativa?: boolean;
}) {
  const c: CapturaInfo = CAPTURAS[clave];
  const m = medidas(path.join(process.cwd(), "public", c.src));
  if (!m) return <>{reemplazo ?? null}</>;
  const clase = className ?? "h-auto w-full";
  const alt = decorativa ? "" : c.alt;
  const mm = movil && c.movil ? medidas(path.join(process.cwd(), "public", c.movil)) : null;
  if (!mm || !c.movil) {
    return <Image src={c.src} alt={alt} width={m.ancho} height={m.alto} sizes={sizes} priority={prioridad} className={clase} />;
  }
  const comun = { alt, priority: prioridad };
  const {
    props: { srcSet: srcMovil },
  } = getImageProps({ ...comun, src: c.movil, width: mm.ancho, height: mm.alto, sizes: "100vw" });
  const { props: escritorio } = getImageProps({ ...comun, src: c.src, width: m.ancho, height: m.alto, sizes });
  return (
    <picture>
      <source media="(max-width: 639px)" srcSet={srcMovil} width={mm.ancho} height={mm.alto} />
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img {...escritorio} className={clase} />
    </picture>
  );
}
