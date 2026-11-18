// Q-06 (17-nov): permite correr con `node --test` los módulos de src/lib en
// TypeScript (Node 24 quita los tipos solo): resuelve el alias `@/` a src/ y
// las importaciones relativas sin extensión a su `.ts`. Sin dependencias.
import { registerHooks } from "node:module";
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../src");

function conExtension(ruta) {
  if (/\.[cm]?[jt]sx?$/.test(ruta) && existsSync(ruta)) return ruta;
  for (const candidata of [`${ruta}.ts`, path.join(ruta, "index.ts")]) {
    if (existsSync(candidata)) return candidata;
  }
  return null;
}

registerHooks({
  resolve(especificador, contexto, siguiente) {
    let ruta = null;
    if (especificador.startsWith("@/")) {
      ruta = conExtension(path.join(SRC, especificador.slice(2)));
    } else if (especificador.startsWith(".") && contexto.parentURL?.startsWith("file:")) {
      const base = path.dirname(fileURLToPath(contexto.parentURL));
      ruta = conExtension(path.resolve(base, especificador));
    }
    if (ruta) return siguiente(pathToFileURL(ruta).href, contexto);
    return siguiente(especificador, contexto);
  },
});
