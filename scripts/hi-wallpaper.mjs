// Lock screen wallpaper carrying the QR for aymen.co/hi, so the phone itself is
// the badge. Everything sits below the clock and above the torch and camera
// buttons, which is the only real constraint an iPhone lock screen imposes.
// Writes public/images/hi-wallpaper.png and public/images/hi-qr.svg.
import QRCode from "qrcode";
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const URL = "https://aymen.co/hi";
const W = 1290, H = 2796;                 // iPhone Pro Max, scales down cleanly
const DARK = process.argv.includes("--dark");
// The card behind the code stays white in both: scanners want the quiet zone
// bright, and that is not the place to be clever.
const PAPER = DARK ? "#111314" : "#fbfaf8";
const INK = DARK ? "#e9e7e3" : "#1b1a18";
const MUTED = DARK ? "#96928a" : "#6f6b64";
const ACCENT = DARK ? "#4fd1c5" : "#0d7377";
const CODE = "#1b1a18";                      // the code itself is always dark on white
const OUT = DARK ? "hi-wallpaper-dark" : "hi-wallpaper";

// Error correction Q: still reads with a thumb over a corner or a scuffed screen.
const QR_PX = 720;
const qr = await QRCode.toBuffer(URL, {
  errorCorrectionLevel: "Q",
  margin: 1,
  width: QR_PX,
  color: { dark: CODE, light: "#ffffff" },
});
writeFileSync(
  "public/images/hi-qr.svg",
  await QRCode.toString(URL, { type: "svg", errorCorrectionLevel: "Q", margin: 1, color: { dark: CODE, light: "#ffffff" } }),
);

const CARD = 880, CARD_X = (W - CARD) / 2, CARD_Y = 1360;
const QR_X = Math.round(CARD_X + (CARD - QR_PX) / 2);
const QR_Y = Math.round(CARD_Y + (CARD - QR_PX) / 2);

const t = (x, y, s, cls, anchor = "middle") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${s}</text>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <rect width="${W}" height="14" fill="${ACCENT}"/>
  <style>
    .name{fill:${INK};font-family:'DejaVu Serif',Georgia,serif;font-size:82px}
    .role{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:34px}
    .url{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:52px}
    .hint{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:34px}
  </style>
  ${t(W / 2, 1150, "Labidi Aymen", "name")}
  ${t(W / 2, 1222, "Architecture, platforms, agents", "role")}
  <rect x="${CARD_X}" y="${CARD_Y}" width="${CARD}" height="${CARD}" rx="48" fill="#ffffff" stroke="${DARK ? "#26292c" : "#e6e3dc"}" stroke-width="2"/>
  ${t(W / 2, 2400, "aymen.co/hi", "url")}
  ${t(W / 2, 2470, "scan to save my contact", "hint")}
</svg>`;

await sharp(Buffer.from(svg))
  .composite([{ input: qr, left: QR_X, top: QR_Y }])
  .png({ compressionLevel: 9 })
  .toFile(`public/images/${OUT}.png`);

console.log(`wrote public/images/${OUT}.png`);
