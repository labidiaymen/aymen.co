// Cover art for the search engine piece. Same pen as the diagram inside it,
// redrawn at cover weight: thicker strokes, larger type, no fine labels.
// Writes public/images/search-engine-cover.png.
import sharp from "sharp";

let seed = 5514082;
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
function arrow(x1, y1, x2, y2, bow = 0, cls = "") {
  const mx = (x1 + x2) / 2 + j(3), my = (y1 + y2) / 2 + bow + j(3);
  const a = Math.atan2(y2 - my, x2 - mx), h = 12;
  const p1 = [x2 - h * Math.cos(a - 0.42), y2 - h * Math.sin(a - 0.42)];
  const p2 = [x2 - h * Math.cos(a + 0.42), y2 - h * Math.sin(a + 0.42)];
  return `<path class="ln ${cls}" d="M${x1},${y1} Q${mx},${my} ${x2},${y2}"/>` +
         `<path class="ln ${cls}" d="M${p1[0].toFixed(1)},${p1[1].toFixed(1)} L${x2},${y2} L${p2[0].toFixed(1)},${p2[1].toFixed(1)}"/>`;
}
const t = (x, y, s, cls = "lbl", anchor = "start") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${s}</text>`;

let g = "";
g += sk(640, 180, 250, 86, "acclbx");
g += t(765, 218, "our index", "lblacc", "middle");
g += t(765, 248, "ours to read", "sub", "middle");

g += arrow(890, 200, 986, 148, -14);
g += t(930, 160, "80%", "acc", "middle");
g += sk(988, 108, 150, 68);
g += t(1063, 150, "answered", "lbl", "middle");

g += arrow(890, 250, 986, 318, 14);
g += sk(988, 296, 150, 68, "runtime");
g += t(1063, 338, "rented", "muted", "middle");

g += `<path class="ln back" d="M988,364 C880,430 760,410 762,272"/>`;
g += `<path class="ln back" d="M752,288 L762,272 L775,286"/>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="12" fill="${ACCENT}"/>
  <style>
    .bx,.ln{fill:none;stroke:${INK};stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
    .bx2{opacity:.4}
    .acclbx,.runtime,.back{stroke:${ACCENT}}
    .runtime{stroke-dasharray:10 7} .back{stroke-dasharray:9 7}
    .lbl{fill:${INK};font-family:'DejaVu Sans Mono',monospace;font-size:23px}
    .lblacc{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:23px}
    .muted{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:21px}
    .sub{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:18px}
    .acc{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:20px}
    .kick{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px;letter-spacing:3px}
    .head{fill:${INK};font-family:'DejaVu Serif',Georgia,serif;font-size:50px}
    .foot{fill:${MUTED};font-family:'DejaVu Sans',sans-serif;font-size:22px}
    .footacc{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px}
  </style>
  ${t(76, 128, "AI", "kick")}
  ${t(76, 226, "The search engine", "head")}
  ${t(76, 288, "we never planned", "head")}
  ${t(76, 350, "to build", "head")}
  ${t(76, 424, "Constraints did the product", "sub")}
  ${t(76, 454, "design for us.", "sub")}
  <path class="ln" style="stroke:#e6e3dc;stroke-width:2" d="M76,540 C400,543 800,538 1124,541"/>
  ${t(76, 580, "aymen.co", "footacc")}
  ${t(1124, 580, "August 2026", "foot", "end")}
  ${g}
</svg>`;

await sharp(Buffer.from(svg), { density: 300 }).resize(1200, 630).png({ compressionLevel: 9 })
  .toFile("public/images/search-engine-cover.png");
console.log("wrote public/images/search-engine-cover.png");
