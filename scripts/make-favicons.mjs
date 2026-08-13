// Regenerates favicon.ico and apple-touch-icon.png from public/favicon.svg.
//
//   node scripts/make-favicons.mjs
//
// Not part of `npm run build` — the outputs are committed, and this only needs
// running when the mark itself changes. favicon.svg carries the "A." as outlined
// paths rather than <text>, so nothing here depends on a font being installed.
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const SOURCE = "public/favicon.svg";
const ICO_SIZES = [16, 32, 48];
const TOUCH_SIZE = 180;

const svg = readFileSync(SOURCE);

// density high enough that the smallest size still rasterises from a clean curve
const render = (size, source = svg) =>
  sharp(source, { density: 1200 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

// ICO: 6-byte header, then a 16-byte directory entry per image, then the PNG
// payloads. PNG-in-ICO is understood by every browser in use.
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // 0 means 256
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // palette colours
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const images = [];
for (const size of ICO_SIZES) images.push({ size, data: await render(size) });
writeFileSync("public/favicon.ico", buildIco(images));

// iOS masks the corners itself, so the touch icon ships square to avoid a
// rounded shape being rounded twice.
const square = Buffer.from(
  readFileSync(SOURCE, "utf8").replace(/ rx="\d+"/, "")
);
writeFileSync("public/apple-touch-icon.png", await render(TOUCH_SIZE, square));

console.log(`✓ favicon.ico (${ICO_SIZES.join(", ")}px) and apple-touch-icon.png (${TOUCH_SIZE}px)`);
