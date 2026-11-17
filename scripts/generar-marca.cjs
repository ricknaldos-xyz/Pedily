/**
 * Genera las imágenes de marca de la landing por código (ficha L-04, 16-nov-2026):
 *
 *   public/og-image.png         1200×630, para compartir en WhatsApp, Facebook, X, LinkedIn
 *   public/favicon.svg          la comanda con la «P» (la misma de `LogoMarca`)
 *   public/favicon.ico          PNG de 16, 32 y 48 px dentro de un ICO
 *   public/apple-touch-icon.png 180×180
 *   public/icon-192.png, public/icon-512.png  (manifest)
 *
 * Sin imágenes de terceros: HTML con los colores de `src/app/globals.css`
 * («la comanda») y las fuentes del repo (`src/app/fonts/*.woff2`), capturado con
 * Playwright (Chromium). La landing no depende de Playwright; se usa el de otro
 * repo del monorepo:
 *
 *   NODE_PATH=../../pedily-web/node_modules node scripts/generar-marca.cjs
 *   (o PLAYWRIGHT=/ruta/a/node_modules/playwright)
 */
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT || "playwright");

const RAIZ = path.resolve(__dirname, "..");
const PUB = path.join(RAIZ, "public");
const FUENTES = path.join(RAIZ, "src/app/fonts");

// Colores de globals.css (@theme)
const C = {
  tinta: "#24102e",
  papel: "#fbf7f0",
  humo: "#6e6378",
  chicha600: "#5b2a86",
  chicha100: "#ede2f6",
  aji: "#ffc21a",
  hierba700: "#0f5e3f",
  hierba50: "#ecf7f1",
  rocoto600: "#971c22",
  sand700: "#4a3e55",
};

// Marca: la comanda dentada con la «P» (copiado de src/components/marca/Logo.tsx).
const COMANDA =
  "M2 3.5 5 1l3 2.5L11 1l3 2.5L17 1l3 2.5L23 1l3 2.5L29 1l1 1v32l-1 1-3-2.5L23 35l-3-2.5L17 35l-3-2.5L11 35l-3-2.5L5 35l-3-2.5L2 34Z";
const LETRA_P = "M10 9h7.2c3.9 0 6.3 2.2 6.3 5.6 0 3.5-2.4 5.7-6.3 5.7h-2.6V27H10Zm4.6 7.6h2.2c1.5 0 2.2-.7 2.2-2s-.7-1.9-2.2-1.9h-2.2Z";
const marcaSvg = (fondo = C.tinta) =>
  `<path d="${COMANDA}" fill="${fondo}"/><path d="${LETRA_P}" fill="${C.aji}"/>`;

const fuente = (familia, archivo, peso) =>
  `@font-face{font-family:"${familia}";src:url("data:font/woff2;base64,${fs
    .readFileSync(path.join(FUENTES, archivo))
    .toString("base64")}") format("woff2");font-weight:${peso};font-style:normal;}`;

const CSS_FUENTES = [
  fuente("Bricolage", "bricolage-grotesque-latin-800-normal.woff2", 800),
  fuente("Figtree", "figtree-latin-500-normal.woff2", 500),
  fuente("Figtree", "figtree-latin-700-normal.woff2", 700),
  fuente("JetBrains", "jetbrains-mono-latin-500-normal.woff2", 500),
  fuente("JetBrains", "jetbrains-mono-latin-700-normal.woff2", 700),
].join("\n");

const OG_HTML = `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
${CSS_FUENTES}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1200px;height:630px}
body{background:${C.papel};background-image:radial-gradient(rgba(36,16,46,.06) 1.2px,transparent 1.2px);background-size:20px 20px;
  font-family:Figtree,sans-serif;color:${C.tinta};position:relative;overflow:hidden}
.izq{position:absolute;left:72px;top:60px;width:680px}
.logo{display:flex;align-items:center;gap:12px}
.logo svg{height:50px;width:auto}
.logo span{font-family:Bricolage;font-weight:800;font-size:40px;letter-spacing:-.03em}
h1{margin-top:38px;font-family:Bricolage;font-weight:800;font-size:76px;line-height:.98;letter-spacing:-.035em}
h1 .b{color:${C.chicha600}}
h1 .sub{background:linear-gradient(transparent 68%,${C.aji} 68%,${C.aji} 92%,transparent 92%)}
p.bajada{margin-top:26px;font-size:26px;line-height:1.35;font-weight:500;color:${C.sand700};max-width:620px}
.chip{position:absolute;left:72px;bottom:56px;display:flex;gap:10px;align-items:center;background:${C.tinta};color:#fff;border-radius:999px;padding:13px 24px;
  font-family:JetBrains;font-weight:700;font-size:20px;letter-spacing:.01em}
.chip b{color:${C.aji};font-weight:700}
.comanda{position:absolute;right:78px;top:96px;width:340px;transform:rotate(3deg);background:#fff;border:3px solid ${C.tinta};border-radius:18px;
  box-shadow:0 12px 0 0 ${C.tinta};overflow:hidden}
.comanda .alarma{background:${C.rocoto600};color:#fff;font-family:JetBrains;font-weight:700;font-size:15px;letter-spacing:.12em;padding:12px 18px;text-transform:uppercase}
.comanda .cuerpo{padding:18px 20px 20px}
.mono{font-family:JetBrains;font-weight:500;font-size:16px;color:${C.sand700}}
.total{font-family:Bricolage;font-weight:800;font-size:56px;letter-spacing:-.02em;margin-top:6px;line-height:1}
.linea{border-top:2px dashed rgba(36,16,46,.25);margin:16px 0 12px}
.fila{display:flex;justify-content:space-between;font-family:JetBrains;font-size:16px;font-weight:500;padding:5px 0;color:${C.sand700}}
.fila.cero{background:${C.hierba50};color:${C.hierba700};font-weight:700;margin:6px -10px 0;padding:10px;border-radius:10px;font-size:17px}
.canales{position:absolute;right:84px;top:428px;width:330px;display:grid;grid-template-columns:1fr 1fr;gap:10px;text-align:center}
.canales span{background:#fff;border:2px solid rgba(36,16,46,.12);border-radius:999px;padding:7px 14px;font-weight:700;font-size:17px;white-space:nowrap}
</style></head><body>
<div class="izq">
  <div class="logo"><svg viewBox="0 0 32 36">${marcaSvg()}</svg><span>Pedily</span></div>
  <h1>Vende directo.<br><span class="b">La comisión se<br>queda <span class="sub">contigo.</span></span></h1>
  <p class="bajada">WhatsApp que cobra, tienda web, kiosko, cocina, caja y boletas SUNAT en un solo panel.</p>
</div>
<div class="chip">Desde <b>S/ 249</b> al mes con IGV · <b>0 %</b> de comisión</div>
<div class="comanda">
  <div class="alarma">● Nuevo pedido pagado</div>
  <div class="cuerpo">
    <div class="mono">#RD001412 · Delivery</div>
    <div class="total">S/ 119,00</div>
    <div class="linea"></div>
    <div class="fila"><span>Cobrado</span><span>S/ 119,00</span></div>
    <div class="fila cero"><span>Comisión Pedily</span><span>S/ 0,00</span></div>
  </div>
</div>
<div class="canales"><span>WhatsApp</span><span>Tienda web</span><span>Kiosko</span><span>QR de mesa</span></div>
</body></html>`;

/** Icono cuadrado: la comanda centrada, con fondo (para iOS y el manifest) o sin él. */
const iconoHtml = (lado, fondo) => `<!doctype html><html><head><style>
*{margin:0;padding:0}html,body{width:${lado}px;height:${lado}px;background:${fondo || "transparent"}}
svg{display:block;width:${lado}px;height:${lado}px}</style></head><body>
<svg viewBox="${fondo ? "-7 -5 46 46" : "-2 0 36 36"}">${marcaSvg()}</svg></body></html>`;

/** ICO con imágenes PNG dentro (formato admitido desde Windows Vista y por todos los navegadores). */
function ico(pngs) {
  const cab = Buffer.alloc(6);
  cab.writeUInt16LE(0, 0);
  cab.writeUInt16LE(1, 2);
  cab.writeUInt16LE(pngs.length, 4);
  let desplazamiento = 6 + 16 * pngs.length;
  const dir = pngs.map(({ lado, buf }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(lado >= 256 ? 0 : lado, 0);
    e.writeUInt8(lado >= 256 ? 0 : lado, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(desplazamiento, 12);
    desplazamiento += buf.length;
    return e;
  });
  return Buffer.concat([cab, ...dir, ...pngs.map((p) => p.buf)]);
}

(async () => {
  const nav = await chromium.launch();
  const foto = async (html, ancho, alto, transparente = false) => {
    const p = await nav.newPage({ viewport: { width: ancho, height: alto }, deviceScaleFactor: 1 });
    await p.setContent(html, { waitUntil: "load" });
    await p.evaluate(() => document.fonts.ready);
    const buf = await p.screenshot({ type: "png", omitBackground: transparente });
    await p.close();
    return buf;
  };

  fs.writeFileSync(path.join(PUB, "og-image.png"), await foto(OG_HTML, 1200, 630));

  fs.writeFileSync(
    path.join(PUB, "favicon.svg"),
    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="-2 0 36 36">${marcaSvg()}</svg>\n`
  );
  const pngs = [];
  for (const lado of [16, 32, 48]) pngs.push({ lado, buf: await foto(iconoHtml(lado), lado, lado, true) });
  fs.writeFileSync(path.join(PUB, "favicon.ico"), ico(pngs));
  fs.writeFileSync(path.join(PUB, "apple-touch-icon.png"), await foto(iconoHtml(180, C.papel), 180, 180));
  fs.writeFileSync(path.join(PUB, "icon-192.png"), await foto(iconoHtml(192, C.papel), 192, 192));
  fs.writeFileSync(path.join(PUB, "icon-512.png"), await foto(iconoHtml(512, C.papel), 512, 512));

  await nav.close();
  console.log("Listo: og-image.png, favicon.svg, favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
