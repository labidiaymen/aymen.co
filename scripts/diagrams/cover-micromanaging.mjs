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

// A short stab downward into a box.
function stab(x, y1, y2, cls = "") {
  const mx = x + j(4);
  return `<path class="ln ${cls}" d="M${x + j(3)},${y1} Q${mx},${(y1 + y2) / 2} ${x},${y2}"/>` +
         `<path class="ln ${cls}" d="M${x - 8},${y2 - 11} L${x},${y2} L${x + 8},${y2 - 11}"/>`;
}
const t = (x, y, s, cls = "lbl", anchor = "start") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${s}</text>`;

const BW = 88, BH = 46, GAP = 14;
const xs = [0, 1, 2, 3, 4].map((i) => 620 + i * (BW + GAP)); // 620 .. 1128
let g = "";

// interrupted at every step
g += t(874, 166, "interrupting", "acc", "middle");
xs.forEach((x) => {
  g += sk(x, 214, BW, BH);
  g += stab(x + BW / 2, 182, 210, "back");
});

g += `<path class="ln div" d="M624,306 C780,309 980,303 1124,307"/>`;

// reviewed once, at the end
g += t(874, 356, "reviewing", "muted", "middle");
xs.forEach((x) => g += sk(x, 404, BW, BH));
g += stab(xs[4] + BW / 2, 372, 400, "back");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="12" fill="${ACCENT}"/>
  <style>
    .bx,.ln{fill:none;stroke:${INK};stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
    .bx2{opacity:.4}
    .back{stroke:${ACCENT};stroke-dasharray:8 6}
    .div{stroke:#e6e3dc;stroke-width:2;stroke-dasharray:4 8}
    .lbl{fill:${INK};font-family:'DejaVu Sans Mono',monospace;font-size:20px}
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
