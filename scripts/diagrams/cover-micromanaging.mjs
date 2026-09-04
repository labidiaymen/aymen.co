// Cover art for the micromanaging piece. Same run, twice: once interrupted at
// every step, once reviewed at the end. Same pen as the other covers.
// Writes public/images/micromanaging-cover.png.
import sharp from "sharp";

let seed = 3390714;
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

// A line from a step down into me: the direction the attention actually travels.
function pull(x1, y1, x2, y2) {
  const mx = (x1 + x2) / 2 + j(6), my = (y1 + y2) / 2 + j(4);
  const a = Math.atan2(y2 - my, x2 - mx), h = 11;
  const p1 = [x2 - h * Math.cos(a - 0.42), y2 - h * Math.sin(a - 0.42)];
  const p2 = [x2 - h * Math.cos(a + 0.42), y2 - h * Math.sin(a + 0.42)];
  return `<path class="ln back" d="M${x1},${y1} Q${mx},${my} ${x2},${y2}"/>` +
         `<path class="ln back" d="M${p1[0].toFixed(1)},${p1[1].toFixed(1)} L${x2},${y2} L${p2[0].toFixed(1)},${p2[1].toFixed(1)}"/>`;
}
const t = (x, y, s, cls = "lbl", anchor = "start") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${s}</text>`;

const SW = 82, SH = 46;                       // a step in the run
const steps = [0, 1, 2, 3, 4].map((i) => 620 + i * 100);  // 620 .. 1102
const ME = { x: 815, y: 0, w: 92, h: 46 };    // the only node that is scarce
let g = "";

// Every interruption is a line back to me. Five of them, and nothing is left.
g += t(861, 152, "interrupting", "acc", "middle");
steps.forEach((x) => g += sk(x, 170, SW, SH));
g += sk(ME.x, 262, ME.w, ME.h, "acclbx");
g += t(861, 292, "me", "lblacc", "middle");
steps.forEach((x, i) => g += pull(x + SW / 2, 216, 825 + i * 18, 258));

g += `<path class="ln div" d="M624,330 C780,333 980,327 1124,331"/>`;

// One line, at the end. The rest of the attention is not in this picture.
g += t(861, 372, "reviewing", "muted", "middle");
steps.forEach((x) => g += sk(x, 390, SW, SH));
g += sk(ME.x, 466, ME.w, ME.h);
g += t(861, 496, "me", "lbl", "middle");
g += pull(steps[4] + SW / 2, 436, 861, 462);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="12" fill="${ACCENT}"/>
  <style>
    .bx,.ln{fill:none;stroke:${INK};stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
    .bx2{opacity:.4}
    .back{stroke:${ACCENT};stroke-dasharray:8 6}
    .div{stroke:#e6e3dc;stroke-width:2;stroke-dasharray:4 8}
    .lbl{fill:${INK};font-family:'DejaVu Sans Mono',monospace;font-size:20px}
    .lblacc{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:20px}
    .acclbx{stroke:${ACCENT}}
    .muted{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:21px}
    .acc{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:21px}
    .sub{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:18px}
    .kick{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px;letter-spacing:3px}
    .head{fill:${INK};font-family:'DejaVu Serif',Georgia,serif;font-size:38px}
    .foot{fill:${MUTED};font-family:'DejaVu Sans',sans-serif;font-size:22px}
    .footacc{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px}
  </style>
  ${t(76, 128, "DELEGATION", "kick")}
  ${t(76, 224, "Micromanaging agents", "head")}
  ${t(76, 274, "is still micromanaging", "head")}
  ${t(76, 356, "Tokens are cheap.", "sub")}
  ${t(76, 386, "Attention is not.", "sub")}
  <path class="ln" style="stroke:#e6e3dc;stroke-width:2;stroke-dasharray:none" d="M76,540 C400,543 800,538 1124,541"/>
  ${t(76, 580, "aymen.co", "footacc")}
  ${t(1124, 580, "September 2026", "foot", "end")}
  ${g}
</svg>`;

await sharp(Buffer.from(svg), { density: 300 }).resize(1200, 630).png({ compressionLevel: 9 })
  .toFile("public/images/micromanaging-cover.png");
console.log("wrote public/images/micromanaging-cover.png");
