// Cover art for the roles piece, as an exploded view three levels deep: the
// company schedules clusters, one cluster is one project and one team, and the
// roles inside it are pods, each carrying a count.
// Writes public/images/one-cluster-cover.png.
import sharp from "sharp";

let seed = 1147902;
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
const sk = (x, y, w, h, cls = "", amt) =>
  `<path class="bx ${cls}" d="${box(x, y, w, h, amt)}"/><path class="bx bx2 ${cls}" d="${box(x, y, w, h, amt)}"/>`;
const t = (x, y, s, cls = "lbl", anchor = "start") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${s}</text>`;

let g = "";

// the company, holding one cluster per project
const AX = 596, AY = 158, AW = 194, AH = 182;
g += `<path class="bx zone" d="${box(AX, AY, AW, AH)}"/>`;
g += t(AX, AY - 32, "the company", "note");
g += t(AX, AY - 10, "many clusters", "gloss");
[[608, 176], [700, 176], [608, 258], [700, 258]].forEach(([x, y], i) => {
  g += sk(x, y, 80, 70, i === 3 ? "acs" : "", 2);
});
g += t(AX, AY + AH + 24, "one to a project", "gloss");

// one of them, opened
g += `<path class="ln lead" d="M782,260 C818,232 842,208 868,184"/>`;
g += `<path class="ln lead" d="M782,328 C820,336 844,344 868,352"/>`;

const BX = 868, BY = 172, BW = 258, BH = 186;
g += sk(BX, BY, BW, BH, "acs");
g += t(BX, BY - 32, "one project, one team", "acclbl");
g += t(BX, BY - 10, "one cluster", "gloss");

const ROLES = [["reviewer", "1"], ["check author", "1"], ["architect", "6"]];
ROLES.forEach(([name, n], i) => {
  const y = BY + 22 + i * 50;
  g += sk(BX + 20, y, 218, 38, "", 1.8);
  g += t(BX + 34, y + 26, name, "role");
  g += t(BX + 224, y + 26, n, "count", "end");
});

g += t(AX, 434, "one role scales. it runs the agents.", "acc");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="12" fill="${ACCENT}"/>
  <style>
    .bx,.ln{fill:none;stroke:${INK};stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
    .bx2{opacity:.4}
    .zone{stroke:${MUTED};stroke-width:2;stroke-dasharray:3 9;opacity:.85}
    .acs{stroke:${ACCENT}}
    .lead{stroke:${ACCENT};stroke-width:2;stroke-dasharray:7 6;opacity:.8}
    .role{fill:${INK};font-family:'DejaVu Sans Mono',monospace;font-size:16px}
    .count{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:16px}
    .note{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:18px}
    .gloss{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:14px;opacity:.75}
    .acclbl{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:18px}
    .acc{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:19px}
    .sub{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:18px}
    .kick{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px;letter-spacing:3px}
    .head{fill:${INK};font-family:'DejaVu Serif',Georgia,serif;font-size:46px}
    .foot{fill:${MUTED};font-family:'DejaVu Sans',sans-serif;font-size:22px}
    .footacc{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px}
  </style>
  ${t(76, 128, "ROLES", "kick")}
  ${t(76, 240, "One project,", "head")}
  ${t(76, 302, "one cluster", "head")}
  ${t(76, 382, "A project gets scheduled.", "sub")}
  ${t(76, 412, "Not staffed.", "sub")}
  <path class="ln" style="stroke:#e6e3dc;stroke-width:2;stroke-dasharray:none" d="M76,540 C400,543 800,538 1124,541"/>
  ${t(76, 580, "aymen.co", "footacc")}
  ${t(1124, 580, "September 2026", "foot", "end")}
  ${g}
</svg>`;

await sharp(Buffer.from(svg), { density: 300 }).resize(1200, 630).png({ compressionLevel: 9 })
  .toFile("public/images/one-cluster-cover.png");
console.log("wrote public/images/one-cluster-cover.png");
