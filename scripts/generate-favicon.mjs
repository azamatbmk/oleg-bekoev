/**
 * Generates favicon assets for Yandex (min 120×120) and browsers.
 * Run: node scripts/generate-favicon.mjs
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const accent = { r: 8, g: 195, b: 220, alpha: 1 };
const white = { r: 255, g: 255, b: 255, alpha: 1 };

function markSvg(size) {
  const fontSize = Math.round(size * 0.42);
  const y = Math.round(size * 0.66);
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.18)}" fill="#08c3dc"/>
  <text x="50%" y="${y}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" fill="#ffffff">ОБ</text>
</svg>`);
}

async function pngFromSvg(size, outPath) {
  const buf = await sharp(markSvg(size)).png().toBuffer();
  writeFileSync(outPath, buf);
  console.log("wrote", outPath, buf.length);
}

async function main() {
  await pngFromSvg(120, join(root, "public", "favicon-120.png"));
  await pngFromSvg(32, join(root, "app", "icon.png"));
  await pngFromSvg(180, join(root, "app", "apple-icon.png"));

  // Multi-size ICO for older crawlers / bookmarks
  const icoPng = await sharp(markSvg(32)).png().toBuffer();
  // Sharp can't write .ico; place 32 PNG as public/favicon.png and keep app/favicon.ico via copy of PNG renamed for Next
  writeFileSync(join(root, "public", "favicon.png"), icoPng);

  // Replace tiny default favicon.ico with a valid ICO-like PNG served as icon
  // Prefer a real ICO: pack single 32x32 PNG into minimal ICO container
  const ico = pngToIco(icoPng);
  writeFileSync(join(root, "app", "favicon.ico"), ico);
  writeFileSync(join(root, "public", "favicon.ico"), ico);
  console.log("wrote favicon.ico");
}

/** Minimal single-image ICO from PNG buffer */
function pngToIco(png) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type icon
  header.writeUInt16LE(1, 4); // count

  const entry = Buffer.alloc(16);
  entry[0] = 32; // width
  entry[1] = 32; // height
  entry[2] = 0; // colors
  entry[3] = 0;
  entry.writeUInt16LE(1, 4); // planes
  entry.writeUInt16LE(32, 6); // bit count
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(6 + 16, 12); // offset

  return Buffer.concat([header, entry, png]);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
