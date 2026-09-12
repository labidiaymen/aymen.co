// Cover art for the roles piece. Three roles on one node. Two stop where their
// limit says. The third has no limit drawn and runs straight out of the node,
// which is the whole argument and the one thing the figure inside does not show.
// Writes public/images/one-cluster-cover.png.
import sharp from "sharp";

let seed = 7730264;
const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
const j = (n = 2) => (rnd() - 0.5) * n * 2;

const PAPER = "#fbfaf8", INK = "#1b1a18", MUTED = "#6f6b64", ACCENT = "#0d7377", FAIL = "#b3402f";

function box(x, y, w, h, amt = 2.8) {
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
// where a role is told to stop
const stopMark = (x, y, h) =>
  `<path class="ln lim" d="M${x + j(1.5)},${y - 12} C${x + j(2)},${y + h * 0.4} ${x + j(2)},${y + h * 0.7} ${x + j(1.5)},${y + h + 12}"/>`;

const NX = 596, NY = 148, NW = 520, NH = 306;
let g = "";

g += `<path class="bx zone" d="${box(NX, NY, NW, NH)}"/>`;
g += t(NX + 16, NY + 30, "one node", "note");

// two roles that stop where they are told
g += sk(620, 192, 252, 54);
g += t(636, 226, "role", "role");
g += stopMark(896, 192, 54);

g += sk(620, 272, 196, 54);
g += t(636, 306, "role", "role");
g += stopMark(896, 272, 54);
g += t(908, 262, "limit", "acc");

// and the one that was never given one
g += sk(620, 352, 526, 54, "fail");
g += t(636, 386, "role", "role fail-text");
g += t(908, 430, "no limit", "failtxt");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="12" fill="${ACCENT}"/>
  <style>
    .bx,.ln{fill:none;stroke:${INK};stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
    .bx2{opacity:.4}
    .zone{stroke:${MUTED};stroke-width:2;stroke-dasharray:3 9;opacity:.8}
    .fail{stroke:${FAIL}}
    .lim{stroke:${ACCENT};stroke-width:3}
    .role{fill:${INK};font-family:'DejaVu Sans Mono',monospace;font-size:19px}
    .fail-text{fill:${FAIL}}
    .failtxt{fill:${FAIL};font-family:'DejaVu Sans Mono',monospace;font-size:19px}
    .acc{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:19px}
    .note{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:18px}
    .sub{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:18px}
    .kick{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px;letter-spacing:3px}
    .head{fill:${INK};font-family:'DejaVu Serif',Georgia,serif;font-size:46px}
    .foot{fill:${MUTED};font-family:'DejaVu Sans',sans-serif;font-size:22px}
    .footacc{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px}
  </style>
  ${t(76, 128, "ROLES", "kick")}
  ${t(76, 240, "One project,", "head")}
  ${t(76, 302, "one cluster", "head")}
  ${t(76, 382, "A role without a limit", "sub")}
  ${t(76, 412, "takes the whole node.", "sub")}
  <path class="ln" style="stroke:#e6e3dc;stroke-width:2;stroke-dasharray:none" d="M76,540 C400,543 800,538 1124,541"/>
  ${t(76, 580, "aymen.co", "footacc")}
  ${t(1124, 580, "September 2026", "foot", "end")}
  ${g}
</svg>`;

await sharp(Buffer.from(svg), { density: 300 }).resize(1200, 630).png({ compressionLevel: 9 })
  .toFile("public/images/one-cluster-cover.png");
console.log("wrote public/images/one-cluster-cover.png");
