// Cover art for the own-stack piece. The in-article drawing leans on the
// paragraph above it, so this one carries its own labels.
// Writes public/images/own-stack-cover.png.
import sharp from "sharp";

let seed = 7130558;
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
const t = (x, y, s, cls = "lbl", anchor = "start") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${s}</text>`;

let g = "";

// ours: one box, read end to end
g += t(725, 158, "ours", "acc", "middle");
g += sk(620, 178, 210, 196, "acclbx");
g += t(725, 252, "one language", "lbl", "middle");
g += t(725, 292, "one model", "lbl", "middle");
g += t(725, 332, "errors we wrote", "lbl", "middle");

// assembled: ten pieces and the gaps between them
g += t(1000, 158, "assembled", "muted", "middle");
const cells = [
  [878, 178], [962, 184], [1046, 176],
  [886, 240], [970, 246], [1054, 238],
  [880, 302], [964, 308], [1048, 300],
  [962, 360],
];
cells.forEach(([x, y]) => (g += sk(x, y, 72, 44, "runtime ghost")));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="12" fill="${ACCENT}"/>
  <style>
    .bx{fill:none;stroke:${INK};stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
    .bx2{opacity:.4}
    .acclbx{stroke:${ACCENT}}
    .runtime{stroke:${ACCENT};stroke-dasharray:9 7} .ghost{opacity:.45}
    .lbl{fill:${INK};font-family:'DejaVu Sans Mono',monospace;font-size:19px}
    .muted{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:21px}
    .acc{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:21px}
    .sub{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:18px}
    .kick{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px;letter-spacing:3px}
    .head{fill:${INK};font-family:'DejaVu Serif',Georgia,serif;font-size:44px}
    .foot{fill:${MUTED};font-family:'DejaVu Sans',sans-serif;font-size:22px}
    .footacc{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px}
  </style>
  ${t(76, 128, "BUILD VERSUS ADOPT", "kick")}
  ${t(76, 228, "Why Joule runs", "head")}
  ${t(76, 284, "on its own stack", "head")}
  ${t(76, 372, "They cannot copy two years", "sub")}
  ${t(76, 402, "of bugs we fixed in layers", "sub")}
  ${t(76, 432, "they have never read.", "sub")}
  <path class="bx" style="stroke:#e6e3dc;stroke-width:2" d="M76,540 C400,543 800,538 1124,541"/>
  ${t(76, 580, "aymen.co", "footacc")}
  ${t(1124, 580, "September 2026", "foot", "end")}
  ${g}
</svg>`;

await sharp(Buffer.from(svg), { density: 300 }).resize(1200, 630).png({ compressionLevel: 9 })
  .toFile("public/images/own-stack-cover.png");
console.log("wrote public/images/own-stack-cover.png");
