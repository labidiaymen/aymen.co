// Cover art for the SDD article, redrawn in the house pen. The article's own
// claim: four of the five stages produce the description, and only the last
// produces code. So the accent divider is the line between the two artifacts.
// Writes public/images/spec-driven-development-sdd-cover.png.
import sharp from "sharp";

let seed = 7143620;
const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
const j = (n = 2) => (rnd() - 0.5) * n * 2;

const PAPER = "#fbfaf8", INK = "#1b1a18", MUTED = "#6f6b64", ACCENT = "#0d7377";

function box(x, y, w, h) {
  const o = () => j(2.6);
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

function arrow(x1, y1, x2, y2) {
  const mx = (x1 + x2) / 2 + j(4), my = (y1 + y2) / 2 + j(2);
  const a = Math.atan2(y2 - my, x2 - mx), h = 10;
  const p1 = [x2 - h * Math.cos(a - 0.42), y2 - h * Math.sin(a - 0.42)];
  const p2 = [x2 - h * Math.cos(a + 0.42), y2 - h * Math.sin(a + 0.42)];
  return `<path class="ln" d="M${x1},${y1} Q${mx},${my} ${x2},${y2}"/>` +
         `<path class="ln" d="M${p1[0].toFixed(1)},${p1[1].toFixed(1)} L${x2},${y2} L${p2[0].toFixed(1)},${p2[1].toFixed(1)}"/>`;
}
const t = (x, y, s, cls = "lbl", anchor = "start") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${s}</text>`;

const CX = 830, BW = 230, BH = 48, X = CX - BW / 2;
const SPEC = ["/constitution", "/specify", "/plan", "/tasks"];
const ROWS = [112, 182, 252, 322];
const IMPL = 406;

let g = "";
SPEC.forEach((s, i) => {
  g += sk(X, ROWS[i], BW, BH);
  g += t(CX, ROWS[i] + 31, s, "lbl", "middle");
  if (i < SPEC.length - 1) g += arrow(CX, ROWS[i] + BH, CX, ROWS[i + 1] - 2);
});

// the boundary between the two artifacts
g += `<path class="ln div" d="M690,388 C820,391 1000,385 1124,389"/>`;
g += arrow(CX, ROWS[3] + BH, CX, IMPL - 2);

g += sk(X, IMPL, BW, BH, "acs");
g += t(CX, IMPL + 31, "/implement", "lblacc", "middle");

g += t(1124, 253, "the description", "muted", "end");
g += t(1124, 437, "the code", "acc", "end");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="12" fill="${ACCENT}"/>
  <style>
    .bx,.ln{fill:none;stroke:${INK};stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
    .bx2{opacity:.4}
    .acs{stroke:${ACCENT}}
    .div{stroke:${ACCENT};stroke-width:2;stroke-dasharray:7 6}
    .lbl{fill:${INK};font-family:'DejaVu Sans Mono',monospace;font-size:20px}
    .lblacc{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:20px}
    .muted{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:18px}
    .acc{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:18px}
    .sub{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:18px}
    .kick{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px;letter-spacing:3px}
    .head{fill:${INK};font-family:'DejaVu Serif',Georgia,serif;font-size:44px}
    .foot{fill:${MUTED};font-family:'DejaVu Sans',sans-serif;font-size:22px}
    .footacc{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px}
  </style>
  ${t(76, 128, "THE SPEC", "kick")}
  ${t(76, 236, "Spec-Driven", "head")}
  ${t(76, 292, "Development", "head")}
  ${t(76, 372, "You stop owning three", "sub")}
  ${t(76, 402, "implementations and start", "sub")}
  ${t(76, 432, "owning one description.", "sub")}
  <path class="ln" style="stroke:#e6e3dc;stroke-width:2;stroke-dasharray:none" d="M76,540 C400,543 800,538 1124,541"/>
  ${t(76, 580, "aymen.co", "footacc")}
  ${t(1124, 580, "May 2026", "foot", "end")}
  ${g}
</svg>`;

await sharp(Buffer.from(svg), { density: 300 }).resize(1200, 630).png({ compressionLevel: 9 })
  .toFile("public/images/spec-driven-development-sdd-cover.png");
console.log("wrote public/images/spec-driven-development-sdd-cover.png");
