// Cover art for the graph engineer piece. Same pen as the diagrams inside it,
// but composed for a 1200x630 frame with the title set into the drawing.
// Writes public/images/graph-engineer-cover.png.
import sharp from "sharp";

let seed = 6620194;
const rnd = () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
};
const j = (n = 2) => (rnd() - 0.5) * n * 2;

const PAPER = "#fbfaf8";
const INK = "#1b1a18";
const MUTED = "#6f6b64";
const ACCENT = "#0d7377";

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
const sketchBox = (x, y, w, h, cls = "") =>
  `<path class="bx ${cls}" d="${box(x, y, w, h)}"/><path class="bx bx2 ${cls}" d="${box(x, y, w, h)}"/>`;

function arrow(x1, y1, x2, y2, bow = 0, cls = "") {
  const mx = (x1 + x2) / 2 + j(3);
  const my = (y1 + y2) / 2 + bow + j(3);
  const a = Math.atan2(y2 - my, x2 - mx);
  const h = 11;
  const p1 = [x2 - h * Math.cos(a - 0.42), y2 - h * Math.sin(a - 0.42)];
  const p2 = [x2 - h * Math.cos(a + 0.42), y2 - h * Math.sin(a + 0.42)];
  return (
    `<path class="ln ${cls}" d="M${x1},${y1} Q${mx},${my} ${x2},${y2}"/>` +
    `<path class="ln ${cls}" d="M${p1[0].toFixed(1)},${p1[1].toFixed(1)} L${x2},${y2} L${p2[0].toFixed(1)},${p2[1].toFixed(1)}"/>`
  );
}
const t = (x, y, s, cls = "lbl", anchor = "start") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${s}</text>`;

const CX = 830; // centre of the drawing half
let g = "";

// the goal
g += sketchBox(CX - 155, 118, 310, 62);
g += t(CX, 156, "the goal", "lbl", "middle");
g += arrow(CX, 180, CX, 226);

// the interior nobody draws
g += `<path class="bx zone" d="${box(CX - 215, 228, 430, 190)}"/>`;
g += t(CX, 262, "the model chooses", "acc", "middle");
[-160, -42, 76].forEach((dx) => {
  g += `<path class="bx runtime ghost" d="${box(CX + dx, 296, 100, 44)}"/>`;
  g += t(CX + dx + 50, 325, "?", "sub", "middle");
});
g += `<path class="ln back" d="M${CX - 120},372 C${CX - 50},392 ${CX + 60},392 ${CX + 130},374"/>`;
g += `<path class="ln back" d="M${CX - 110},362 L${CX - 121},373 L${CX - 107},380"/>`;

g += arrow(CX, 418, CX, 462);

// what ends it
g += sketchBox(CX - 175, 464, 350, 62);
g += t(CX, 502, "a check that ends it", "lbl", "middle");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="12" fill="${ACCENT}"/>
  <style>
    .bx,.ln{fill:none;stroke:${INK};stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
    .bx2{opacity:.4}
    .runtime,.back{stroke:${ACCENT}}
    .back{stroke-dasharray:8 6}
    .runtime{stroke-dasharray:9 6}
    .ghost{opacity:.45}
    .zone{stroke:${ACCENT};opacity:.5;stroke-dasharray:3 10}
    .lbl{fill:${INK};font-family:'DejaVu Sans Mono',monospace;font-size:21px}
    .sub{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:17px}
    .acc{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:17px}
    .kick{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px;letter-spacing:3px}
    .head{fill:${INK};font-family:'DejaVu Serif',Georgia,serif;font-size:58px}
    .foot{fill:${MUTED};font-family:'DejaVu Sans',sans-serif;font-size:22px}
    .footacc{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px}
  </style>
  ${t(76, 128, "THE GRAPH ENGINEER", "kick")}
  ${t(76, 232, "Where the", "head")}
  ${t(76, 302, "leverage went", "head")}
  ${t(76, 392, "You own the boundary,", "sub")}
  ${t(76, 424, "not the interior.", "sub")}
  <path class="ln" style="stroke:#e6e3dc;stroke-width:2" d="M76,540 C400,543 800,538 1124,541"/>
  ${t(76, 580, "aymen.co", "footacc")}
  ${t(1124, 580, "September 2026", "foot", "end")}
  ${g}
</svg>`;

await sharp(Buffer.from(svg), { density: 300 })
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile("public/images/graph-engineer-cover.png");
console.log("wrote public/images/graph-engineer-cover.png");
