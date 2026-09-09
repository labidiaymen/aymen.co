// Cover art for the permission model piece. Everything that reaches for the
// cluster stops short. One route arrives, and it goes through the repo. The
// picture is the refusal, not an inventory of who holds what.
// Writes public/images/credentials-cover.png.
import sharp from "sharp";

let seed = 4482013;
const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
const j = (n = 2) => (rnd() - 0.5) * n * 2;

const PAPER = "#fbfaf8", INK = "#1b1a18", MUTED = "#6f6b64", ACCENT = "#0d7377";

function box(x, y, w, h, amt = 3) {
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

// a reach that leaves the agent and gives out before it lands
const OX = 714, OY = 388;
function stub(x1, y1) {
  const mx = OX + (x1 - OX) * 0.55 + j(6);
  const my = OY + (y1 - OY) * 0.35 + j(6);
  return `<path class="ln stop" d="M${OX + j(2)},${OY + j(2)} Q${mx},${my} ${x1 + j(2)},${y1 + j(2)}"/>`;
}

let g = "";

// every direct reach, and none of them arrive
[[862, 144], [886, 198], [894, 250], [882, 300], [854, 342]].forEach(([x, y]) => g += stub(x, y));

// the cluster
g += sk(946, 178, 170, 118);
g += t(1031, 244, "cluster", "lbl", "middle");

// the one route that arrives
g += sk(596, 386, 118, 56);
g += t(655, 420, "agent", "lbl", "middle");
g += `<path class="ln acs" d="M714,414 C734,416 748,414 764,414"/>`;
g += `<path class="ln acs" d="M757,410 L765,414 L757,418"/>`;
g += sk(768, 386, 132, 56, "acs");
g += t(834, 420, "the repo", "lblacc", "middle");
g += `<path class="ln acs" d="M900,410 C950,406 986,378 1016,300"/>`;
g += `<path class="ln acs" d="M1007,314 L1017,298 L1025,315"/>`;
g += t(596, 486, "the only way in", "acc");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="12" fill="${ACCENT}"/>
  <style>
    .bx,.ln{fill:none;stroke:${INK};stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
    .bx2{opacity:.4}
    .stop{stroke:${MUTED};stroke-width:2.6;opacity:.55}
    .acs{stroke:${ACCENT}}
    .lbl{fill:${INK};font-family:'DejaVu Sans Mono',monospace;font-size:23px}
    .lblacc{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:21px}
    .sub{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:18px}
    .acc{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:19px}
    .kick{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px;letter-spacing:3px}
    .head{fill:${INK};font-family:'DejaVu Serif',Georgia,serif;font-size:40px}
    .foot{fill:${MUTED};font-family:'DejaVu Sans',sans-serif;font-size:22px}
    .footacc{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px}
  </style>
  ${t(76, 128, "AI", "kick")}
  ${t(76, 232, "Infrastructure as code", "head")}
  ${t(76, 286, "is the permission model", "head")}
  ${t(76, 372, "An agent can write anything.", "sub")}
  ${t(76, 402, "It cannot apply anything.", "sub")}
  <path class="ln" style="stroke:#e6e3dc;stroke-width:2" d="M76,540 C400,543 800,538 1124,541"/>
  ${t(76, 580, "aymen.co", "footacc")}
  ${t(1124, 580, "September 2026", "foot", "end")}
  ${g}
</svg>`;

await sharp(Buffer.from(svg), { density: 300 }).resize(1200, 630).png({ compressionLevel: 9 })
  .toFile("public/images/credentials-cover.png");
console.log("wrote public/images/credentials-cover.png");
