// Cover art for the durable execution piece. A row of steps, the process it was
// running in cut off partway, and the row carrying on regardless because the
// history is not in the process. Writes public/images/durable-run-cover.png.
import sharp from "sharp";

let seed = 6148277;
const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
const j = (n = 2) => (rnd() - 0.5) * n * 2;

const PAPER = "#fbfaf8", INK = "#1b1a18", MUTED = "#6f6b64", ACCENT = "#0d7377";

function box(x, y, w, h, amt = 2.6) {
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
const t = (x, y, s, cls = "lbl", anchor = "start") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${s}</text>`;

const SW = 62, SH = 62, GAP = 26;
const X0 = 612, Y = 238;
const N = 6;
let g = "";

// the steps of one run, all the same, all still there
for (let i = 0; i < N; i++) {
  const x = X0 + i * (SW + GAP);
  g += sk(x, Y, SW, SH);
  if (i < N - 1) {
    const a = x + SW, b = x + SW + GAP;
    g += `<path class="ln" d="M${a + 2},${Y + SH / 2 + j(1)} C${a + 9},${Y + SH / 2 + j(2)} ${b - 11},${Y + SH / 2 + j(2)} ${b - 4},${Y + SH / 2 + j(1)}"/>`;
    g += `<path class="ln" d="M${b - 11},${Y + SH / 2 - 5} L${b - 3},${Y + SH / 2} L${b - 11},${Y + SH / 2 + 5}"/>`;
  }
}

// the process it happened to be running in, cut off partway
const PX = 596, PW = 268;
g += `<path class="ln proc" d="M${PX},${Y - 46} C${PX + 90},${Y - 49} ${PX + 180},${Y - 43} ${PX + PW},${Y - 46}"/>`;
g += `<path class="ln proc" d="M${PX},${Y - 46} C${PX - 3},${Y + 30} ${PX + 2},${Y + 80} ${PX},${Y + SH + 46}"/>`;
g += `<path class="ln proc" d="M${PX},${Y + SH + 46} C${PX + 96},${Y + SH + 43} ${PX + 172},${Y + SH + 49} ${PX + PW},${Y + SH + 46}"/>`;
g += t(PX + 8, Y - 62, "the process", "proclbl");
g += t(PX + PW + 16, Y + SH + 50, "ends here", "proclbl");

g += t(X0, Y + SH + 96, "the run does not", "acc");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="12" fill="${ACCENT}"/>
  <style>
    .bx,.ln{fill:none;stroke:${INK};stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
    .bx2{opacity:.4}
    .proc{stroke:${MUTED};stroke-width:2.4;stroke-dasharray:9 7;opacity:.75}
    .proclbl{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:17px}
    .acc{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:20px}
    .sub{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:18px}
    .kick{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px;letter-spacing:3px}
    .head{fill:${INK};font-family:'DejaVu Serif',Georgia,serif;font-size:40px}
    .foot{fill:${MUTED};font-family:'DejaVu Sans',sans-serif;font-size:22px}
    .footacc{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px}
  </style>
  ${t(76, 128, "AI", "kick")}
  ${t(76, 236, "Temporal keeps the run", "head")}
  ${t(76, 292, "outside the process", "head")}
  ${t(76, 372, "A crash stops being an event.", "sub")}
  ${t(76, 402, "It becomes a delay.", "sub")}
  <path class="ln" style="stroke:#e6e3dc;stroke-width:2;stroke-dasharray:none" d="M76,540 C400,543 800,538 1124,541"/>
  ${t(76, 580, "aymen.co", "footacc")}
  ${t(1124, 580, "September 2026", "foot", "end")}
  ${g}
</svg>`;

await sharp(Buffer.from(svg), { density: 300 }).resize(1200, 630).png({ compressionLevel: 9 })
  .toFile("public/images/durable-run-cover.png");
console.log("wrote public/images/durable-run-cover.png");
