// Renders public/icon.svg into the PNG sizes Android and iOS need.
// Usage: npm run icons   (needs Playwright + Chromium available)
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "public");
const svg = await readFile(path.join(pub, "icon.svg"), "utf8");

// Maskable icons get cropped to a circle/squircle: full-bleed background, mark inside the 80% safe zone.
const maskable = svg
  .replace('rx="112"', 'rx="0"')
  .replace("<g ", '<g transform="translate(256 256) scale(0.72) translate(-256 -256)" ')
  .replace('<circle cx="256" cy="256" r="16"', '<circle cx="256" cy="256" r="12"');

const targets = [
  { file: "icon-192.png", size: 192, src: svg },
  { file: "icon-512.png", size: 512, src: svg },
  { file: "apple-touch-icon.png", size: 180, src: maskable }, // iOS rounds corners itself
  { file: "icon-maskable-512.png", size: 512, src: maskable },
];

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });
for (const t of targets) {
  await page.setViewportSize({ width: t.size, height: t.size });
  await page.setContent(
    `<html><body style="margin:0;background:transparent">${t.src.replace("<svg ", `<svg width="${t.size}" height="${t.size}" `)}</body></html>`,
  );
  await page.screenshot({ path: path.join(pub, t.file), omitBackground: true });
  console.log("wrote", t.file);
}
await browser.close();
