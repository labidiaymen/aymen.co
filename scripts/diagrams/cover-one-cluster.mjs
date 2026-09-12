// Cover art for the roles piece, drawn as an exploded view: the cluster, one pod
// pulled out of it, and what is inside that pod. The accent follows the zoom.
// Writes public/images/one-cluster-cover.png.
import sharp from "sharp";

let seed = 5528193;
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

// the cluster: one team, and as many replicas as the work needs
const AX = 596, AY = 150, AW = 220, AH = 192;
g += `<path class="bx zone" d="${box(AX, AY, AW, AH)}"/>`;
g += t(AX, AY - 32, "one project", "note");
g += t(AX, AY - 10, "the cluster", "gloss");

g += sk(614, 174, 184, 58, "acs", 2.2);
g += t(706, 210, "the team", "podlbl", "middle");

[614, 662, 710, 758].forEach((x) => {
  g += sk(x, 262, 40, 36, "dash", 1.6);
});
g += t(614, 324, "agents", "gloss");

// the team, opened up
g += `<path class="ln lead" d="M798,178 C838,178 856,178 882,176"/>`;
g += `<path class="ln lead" d="M798,230 C842,268 858,308 882,344"/>`;

const BX = 884, BY = 168, BW = 242, BH = 182;
g += sk(BX, BY, BW, BH, "acs");
g += t(BX, BY - 32, "the team that ships it", "acclbl");
g += t(BX, BY - 10, "one pod", "gloss");
[0, 1, 2].forEach((i) => {
  const y = BY + 22 + i * 48;
  g += sk(BX + 22, y, 198, 34, "", 1.8);
  g += t(BX + 36, y + 24, ["graph engineer", "check author", "reviewer"][i], "role");
});

g += t(AX, 424, "one team to a project. the agents scale.", "acc");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="12" fill="${ACCENT}"/>
  <style>
    .bx,.ln{fill:none;stroke:${INK};stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
    .bx2{opacity:.4}
    .zone{stroke:${MUTED};stroke-width:2;stroke-dasharray:3 9;opacity:.85}
    .acs{stroke:${ACCENT}}
    .dash{stroke:${ACCENT};stroke-dasharray:6 5;opacity:.6}
    .podlbl{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:17px}
    .lead{stroke:${ACCENT};stroke-width:2;stroke-dasharray:7 6;opacity:.8}
    .role{fill:${INK};font-family:'DejaVu Sans Mono',monospace;font-size:16px}
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
