// Cover art for the credentials piece. Not the chain from inside the article --
// just what each side is holding. The agent has the diff. The controller has the
// only key. Writes public/images/credentials-cover.png.
import sharp from "sharp";

let seed = 7719340;
const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
const j = (n = 2) => (rnd() - 0.5) * n * 2;

const PAPER = "#fbfaf8", INK = "#1b1a18", MUTED = "#6f6b64", ACCENT = "#0d7377";

function box(x, y, w, h, amt = 3) {
  const o = () => j(amt);
  return [
    `M${x + o()},${y + o()}`,
    `C${x + w * 0.4 + o()},${y + o()} ${x + w * 0.7 + o()},${y + o()} ${x + w + o()},${y + o()}`,
    `C${x + w + o()},${y + h * 0.45 + o()} ${x + w + o()},${y + h * 0.7 + o()} ${x + w + o()},${y + h + o()}`,
    `C${x + w * 0.6 + o()},${y + h + o()} ${x + w * 0.3 + o()},${y + h + o()} ${x + o()},${y + h + o()}`,
    `C${x + o()},${y + h * 0.6 + o()} ${x + o()},${y + h * 0.3 + o()} ${x + o()},${y - 2 + o()}`,
  ].join(" ");
}
const sk = (x, y, w, h, cls = "") =>
  `<path class="bx ${cls}" d="${box(x, y, w, h)}"/><path class="bx bx2 ${cls}" d="${box(x, y, w, h)}"/>`;
const rule = (x, y, w) =>
  `<path class="cl" d="M${x + j(1.5)},${y + j(1)} C${x + w * 0.4},${y + j(1.8)} ${x + w * 0.7},${y + j(1.8)} ${x + w + j(1.5)},${y + j(1)}"/>`;
const t = (x, y, s, cls = "lbl", anchor = "start") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${s}</text>`;

// a key, drawn rather than set: bow, shaft, two teeth
function key(cx, cy) {
  const r = 27, o = () => j(2.2);
  let p = `<path class="bx acs" d="M${cx - r + o()},${cy + o()}`;
  p += ` C${cx - r + o()},${cy - r * 0.8 + o()} ${cx + r * 0.2 + o()},${cy - r * 0.9 + o()} ${cx + r * 0.18 + o()},${cy + o()}`;
  p += ` C${cx + r * 0.2 + o()},${cy + r * 0.9 + o()} ${cx - r + o()},${cy + r * 0.8 + o()} ${cx - r + o()},${cy - 1 + o()}"/>`;
  p += `<path class="bx acs" d="M${cx + r * 0.15},${cy + o()} C${cx + 34},${cy + o()} ${cx + 62},${cy + o()} ${cx + 96},${cy + o()}"/>`;
  p += `<path class="bx acs" d="M${cx + 62},${cy} C${cx + 63},${cy + 12} ${cx + 62},${cy + 18} ${cx + 63},${cy + 26}"/>`;
  p += `<path class="bx acs" d="M${cx + 88},${cy} C${cx + 89},${cy + 10} ${cx + 88},${cy + 14} ${cx + 89},${cy + 20}"/>`;
  return p;
}

let g = "";

// what the agent holds
g += sk(618, 176, 210, 196);
[228, 258, 288, 318].forEach((y, i) => g += rule(i < 2 ? 664 : 646, y, i < 2 ? 138 : 156));
g += t(646, 236, "+", "mk");
g += t(646, 266, "-", "mk");
g += t(723, 412, "writes the change", "sub", "middle");

// what the controller holds
g += sk(892, 176, 210, 196, "acs");
g += key(962, 274);
g += t(997, 412, "holds the key", "acc", "middle");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="12" fill="${ACCENT}"/>
  <style>
    .bx,.cl{fill:none;stroke:${INK};stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
    .bx2{opacity:.4}
    .cl{stroke-width:3;stroke:${MUTED}}
    .acs{stroke:${ACCENT}}
    .mk{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:20px}
    .sub{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:18px}
    .acc{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:18px}
    .kick{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px;letter-spacing:3px}
    .head{fill:${INK};font-family:'DejaVu Serif',Georgia,serif;font-size:40px}
    .foot{fill:${MUTED};font-family:'DejaVu Sans',sans-serif;font-size:22px}
    .footacc{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px}
  </style>
  ${t(76, 128, "AI", "kick")}
  ${t(76, 232, "Infrastructure as code", "head")}
  ${t(76, 286, "is the permission model", "head")}
  ${t(76, 372, "An agent can write anything.", "sub")}
  ${t(76, 402, "It cannot apply anything.", "sub")}
  <path class="cl" style="stroke:#e6e3dc;stroke-width:2" d="M76,540 C400,543 800,538 1124,541"/>
  ${t(76, 580, "aymen.co", "footacc")}
  ${t(1124, 580, "September 2026", "foot", "end")}
  ${g}
</svg>`;

await sharp(Buffer.from(svg), { density: 300 }).resize(1200, 630).png({ compressionLevel: 9 })
  .toFile("public/images/credentials-cover.png");
console.log("wrote public/images/credentials-cover.png");
