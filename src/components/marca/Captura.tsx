import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { CAPTURAS, type ClaveCaptura } from "@/lib/capturas";

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

export function Captura({
  clave,
  reemplazo,
  sizes,
  prioridad = false,
  className,
}: {
  clave: ClaveCaptura;
  reemplazo?: React.ReactNode;
  sizes: string;
  prioridad?: boolean;
  className?: string;
}) {
  const c = CAPTURAS[clave];
  const m = medidas(path.join(process.cwd(), "public", c.src));
  if (!m) return <>{reemplazo ?? null}</>;
  return (
    <Image
      src={c.src}
      alt={c.alt}
      width={m.ancho}
      height={m.alto}
      sizes={sizes}
      priority={prioridad}
      className={className ?? "h-auto w-full"}
    />
  );
}
