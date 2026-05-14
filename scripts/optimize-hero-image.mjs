/**
 * Собирает doctor.avif и doctor.webp из public/images/doctor.png
 * (высокое качество — для «без потери» на экране; перезапускайте после смены PNG).
 */
import { readFileSync, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const input = join(root, "public/images/doctor.png");
const outDir = join(root, "public/images");

if (!existsSync(input)) {
  console.error("Нет файла:", input);
  process.exit(1);
}

const buf = readFileSync(input);
const meta = await sharp(buf).metadata();

await sharp(buf)
  .webp({ quality: 92, effort: 6, smartSubsample: true })
  .toFile(join(outDir, "doctor.webp"));

await sharp(buf)
  .avif({ quality: 88, effort: 6, chromaSubsampling: "4:4:4" })
  .toFile(join(outDir, "doctor.avif"));

const pngKb = (buf.length / 1024).toFixed(1);
const webpStat = await stat(join(outDir, "doctor.webp"));
const avifStat = await stat(join(outDir, "doctor.avif"));

console.log("Исходник PNG:", pngKb, "KB", `(${meta.width}×${meta.height})`);
console.log("doctor.webp:", (webpStat.size / 1024).toFixed(1), "KB");
console.log("doctor.avif:", (avifStat.size / 1024).toFixed(1), "KB");
console.log("Готово. Подставьте в Hero width/height:", meta.width, meta.height);
