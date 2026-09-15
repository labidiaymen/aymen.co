// The QR is the one asset that fails silently: it looks fine and simply does not
// scan, and nobody standing in front of you says so. Decode it back at the sizes
// a camera actually sees, and fail loudly if any of them stops reading.
import jsQR from "jsqr";
import sharp from "sharp";

const EXPECTED = "https://aymen.co/hi";
const FILES = ["hi-wallpaper", "hi-wallpaper-dark"];
const WIDTHS = [1290, 800, 500, 320];

let bad = 0;
for (const f of FILES) {
  for (const w of WIDTHS) {
    const { data, info } = await sharp(`public/images/${f}.png`)
      .resize(w)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const got = jsQR(new Uint8ClampedArray(data), info.width, info.height)?.data;
    if (got !== EXPECTED) {
      console.error(`  ${f} at ${w}px -> ${got ?? "no read"}`);
      bad++;
    }
  }
}
if (bad) {
  console.error(`\n${bad} QR read(s) failed`);
  process.exit(1);
}
console.log(`QR reads back as ${EXPECTED} in ${FILES.length} wallpapers at ${WIDTHS.length} sizes each`);
