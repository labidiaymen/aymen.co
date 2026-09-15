// Share image for the event card at /hi/. The site default is a good card but it
// frames the site as a blog and has no face on it. This one leads with the photo,
// because whoever pastes this link met the person ten minutes ago. The line
// names the work, not the argument of whatever was published last.
// Writes public/images/hi-card.png.
import sharp from "sharp";

const PAPER = "#fbfaf8", INK = "#1b1a18", MUTED = "#6f6b64", ACCENT = "#0d7377";
const t = (x, y, s, cls, anchor = "start") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${s}</text>`;

const R = 300, PX = 800, PY = 158;

const photo = await sharp("public/images/avatar.jpg")
  .resize(R, R, { fit: "cover" })
  .composite([{
    input: Buffer.from(`<svg width="${R}" height="${R}"><circle cx="${R / 2}" cy="${R / 2}" r="${R / 2}" fill="#fff"/></svg>`),
    blend: "dest-in",
  }])
  .png()
  .toBuffer();

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="12" fill="${ACCENT}"/>
  <circle cx="${PX + R / 2}" cy="${PY + R / 2}" r="${R / 2 + 6}" fill="none" stroke="#e6e3dc" stroke-width="2"/>
  <style>
    .name{fill:${INK};font-family:'DejaVu Serif',Georgia,serif;font-size:62px}
    .role{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:21px}
    .line{fill:${INK};font-family:'DejaVu Serif',Georgia,serif;font-size:27px}
    .foot{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:24px}
  </style>
  ${t(76, 214, "Labidi Aymen", "name")}
  ${t(76, 266, "Architect &amp; Engineering Manager @Inetum", "role")}
  ${t(76, 300, "Founder of Nuraly", "role")}
  <path d="M76,364 C260,367 520,362 700,365" fill="none" stroke="#e6e3dc" stroke-width="2"/>
  ${t(76, 428, "Architecture, platforms, and the", "line")}
  ${t(76, 470, "agents that run in them.", "line")}
  ${t(76, 566, "aymen.co/hi", "foot")}
</svg>`;

await sharp(Buffer.from(svg), { density: 300 })
  .resize(1200, 630)
  .composite([{ input: photo, left: PX, top: PY }])
  .png({ compressionLevel: 9 })
  .toFile("public/images/hi-card.png");
console.log("wrote public/images/hi-card.png");
