// Cover art for the Discover piece. Same pen as the diagram inside it, redrawn
// at cover weight. Writes public/images/discover-cover.png.
import sharp from "sharp";

let seed = 2298317;
const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
const j = (n = 2) => (rnd() - 0.5) * n * 2;

const PAPER = "#fbfaf8", INK = "#1b1a18", MUTED = "#6f6b64", ACCENT = "#0d7377";

function box(x, y, w, h) {
  const o = () => j(3);
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
function arrow(x1, y1, x2, y2, cls = "") {
  const mx = (x1 + x2) / 2 + j(3), my = (y1 + y2) / 2 + j(3);
  const a = Math.atan2(y2 - my, x2 - mx), h = 12;
  const p1 = [x2 - h * Math.cos(a - 0.42), y2 - h * Math.sin(a - 0.42)];
  const p2 = [x2 - h * Math.cos(a + 0.42), y2 - h * Math.sin(a + 0.42)];
  return `<path class="ln ${cls}" d="M${x1},${y1} Q${mx},${my} ${x2},${y2}"/>` +
         `<path class="ln ${cls}" d="M${p1[0].toFixed(1)},${p1[1].toFixed(1)} L${x2},${y2} L${p2[0].toFixed(1)},${p2[1].toFixed(1)}"/>`;
}
const t = (x, y, s, cls = "lbl", anchor = "start") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${s}</text>`;

const BW = 150, BH = 74;
const col = [612, 786, 960];
let g = "";

// the owned path completes
g += t(612, 148, "what we own", "acc");
[0, 1].forEach((i) => (g += arrow(col[i] + BW, 205, col[i + 1], 205)));
g += sk(col[0], 168, BW, BH);
g += t(col[0] + BW / 2, 212, "index", "lbl", "middle");
g += sk(col[1], 168, BW, BH);
g += t(col[1] + BW / 2, 212, "agents", "lbl", "middle");
g += sk(col[2], 168, BW, BH, "acclbx");
g += t(col[2] + BW / 2, 212, "Discover", "lblacc", "middle");

// the rented path stops one box short
g += t(612, 356, "what renting gives you", "muted");
g += arrow(col[0] + BW, 413, col[1], 413);
g += sk(col[0], 376, BW, BH, "runtime");
g += t(col[0] + BW / 2, 420, "an API", "muted", "middle");
g += sk(col[1], 376, BW, BH, "runtime");
g += t(col[1] + BW / 2, 420, "answers", "muted", "middle");
g += `<path class="ln runtime" style="opacity:.45" d="M${col[1] + BW},413 L${col[2] + 34},413"/>`;
g += `<path class="ln stop" d="M${col[2] + 46},393 L${col[2] + 82},433"/>`;
g += `<path class="ln stop" d="M${col[2] + 82},393 L${col[2] + 46},433"/>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="12" fill="${ACCENT}"/>
  <style>
    .bx,.ln{fill:none;stroke:${INK};stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
    .bx2{opacity:.4}
    .acclbx,.runtime{stroke:${ACCENT}} .runtime{stroke-dasharray:10 7}
    .stop{stroke:${MUTED};stroke-width:3}
    .lbl{fill:${INK};font-family:'DejaVu Sans Mono',monospace;font-size:24px}
    .lblacc{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:24px}
    .muted{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:21px}
    .acc{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:21px}
    .sub{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:18px}
    .kick{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px;letter-spacing:3px}
    .head{fill:${INK};font-family:'DejaVu Serif',Georgia,serif;font-size:44px}
    .foot{fill:${MUTED};font-family:'DejaVu Sans',sans-serif;font-size:22px}
    .footacc{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px}
  </style>
  ${t(76, 128, "DISCOVER", "kick")}
  ${t(76, 228, "What happens when", "head")}
  ${t(76, 284, "you own both halves", "head")}
  ${t(76, 380, "Every component you own is a", "sub")}
  ${t(76, 410, "factory for features you have", "sub")}
  ${t(76, 440, "not imagined yet.", "sub")}
  <path class="ln" style="stroke:#e6e3dc;stroke-width:2" d="M76,540 C400,543 800,538 1124,541"/>
  ${t(76, 580, "aymen.co", "footacc")}
  ${t(1124, 580, "September 2026", "foot", "end")}
  ${g}
</svg>`;

await sharp(Buffer.from(svg), { density: 300 }).resize(1200, 630).png({ compressionLevel: 9 })
  .toFile("public/images/discover-cover.png");
console.log("wrote public/images/discover-cover.png");
