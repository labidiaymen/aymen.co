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

// The real Jira-ticket-to-merge-request graph, cut down to its shape:
// two questions, two capped loops, a shortcut, and three ways to end.
let g = "";
const pill = (x, y, w, h) => {
  const r = h / 2, o = () => j(2);
  return `M${x + r + o()},${y + o()} L${x + w - r + o()},${y + o()} Q${x + w + 4 + o()},${y + h / 2 + o()} ${x + w - r + o()},${y + h + o()} L${x + r + o()},${y + h + o()} Q${x - 4 + o()},${y + h / 2 + o()} ${x + r + o()},${y + o()}`;
};
const pillBox = (x, y, w, h, cls = "") =>
  `<path class="bx ${cls}" d="${pill(x, y, w, h)}"/><path class="bx bx2 ${cls}" d="${pill(x, y, w, h)}"/>`;

const RY = 380, RH = 60;
const N = {
  ticket: [76, 88], project: [190, 112], mr: [328, 112], plan: [466, 96],
  build: [588, 96], review: [710, 104], verdict: [840, 104],
};
const mid = (k) => N[k][0] + N[k][1] / 2;
const L = { ticket: "ticket", project: "project?", mr: "open MR?", plan: "plan",
  build: "build", review: "review", verdict: "verdict" };
const order = Object.keys(N);
order.forEach((k, i) => {
  const [x, w] = N[k];
  g += sketchBox(x, RY, w, RH);
  g += t(x + w / 2, RY + 37, L[k], "nd", "middle");
  if (i < order.length - 1) g += arrow(x + w, RY + RH / 2, N[order[i + 1]][0] - 2, RY + RH / 2);
});

// done: a draft merge request
g += pillBox(970, RY + 2, 154, RH - 4);
g += t(1047, RY + 37, "draft MR", "nd", "middle");
g += arrow(944, RY + RH / 2, 968, RY + RH / 2);

// project unclear: ask a person, who can end it
g += sketchBox(190, 272, 112, 50, "human");
g += t(246, 303, "ask", "acc nd", "middle");
g += arrow(mid("project") - 20, RY, 226, 324, 0);
g += arrow(mid("project") + 20, 324, mid("project") + 20, RY - 2, 0);
g += pillBox(26 + 4, 272, 136, 50);
g += t(98, 303, "needs info", "sm", "middle");
g += arrow(190, 297, 168, 297);

// shortcut: an MR already exists, resume it
const sx = mid("mr"), ex = mid("review");
g += `<path class="ln" d="M${sx},${RY + RH} C${sx + 60},${RY + RH + 78} ${ex - 60},${RY + RH + 78} ${ex},${RY + RH + 6}"/>`;
g += `<path class="ln" d="M${ex - 9},${RY + RH + 17} L${ex},${RY + RH + 6} L${ex + 8},${RY + RH + 18}"/>`;
g += t((sx + ex) / 2, RY + RH + 80, "MR exists: resume", "sm", "middle");

// two capped loops, decided while running
const loop = (k, lbl) => {
  const c = mid(k);
  g += `<path class="ln back" d="M${c - 26},${RY} C${c - 40},${RY - 70} ${c + 40},${RY - 70} ${c + 26},${RY - 4}"/>`;
  g += `<path class="ln back" d="M${c + 18},${RY - 16} L${c + 26},${RY - 4} L${c + 34},${RY - 15}"/>`;
  g += t(c, RY - 62, lbl, "acc", "middle");
};
loop("plan", "re-plan once");
loop("review", "max 6");

// still open: it waits for you
const vx = mid("verdict");
g += sketchBox(vx - 48, 470, 96, 50, "human");
g += t(vx, 501, "you", "acc nd", "middle");
g += arrow(vx, RY + RH, vx, 468);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="12" fill="${ACCENT}"/>
  <style>
    .bx,.ln{fill:none;stroke:${INK};stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
    .bx2{opacity:.4}
    .runtime,.back,.human{stroke:${ACCENT}}
    .back{stroke-dasharray:8 6}
    .runtime{stroke-dasharray:9 6}
    .ghost{opacity:.45}
    .zone{stroke:${ACCENT};opacity:.5;stroke-dasharray:3 10}
    .lbl{fill:${INK};font-family:'DejaVu Sans Mono',monospace;font-size:21px}
    .sub{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:17px}
    .acc{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:17px}
    .big{font-size:21px}
    .nd{fill:${INK};font-family:'DejaVu Sans Mono',monospace;font-size:19px}
    .nd.acc{fill:${ACCENT}}
    .sm{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:15px}
    .kick{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px;letter-spacing:3px}
    .head{fill:${INK};font-family:'DejaVu Serif',Georgia,serif;font-size:58px}
    .foot{fill:${MUTED};font-family:'DejaVu Sans',sans-serif;font-size:22px}
    .footacc{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px}
  </style>
  ${t(76, 104, "THE GRAPH ENGINEER", "kick")}
  ${t(76, 184, "Where the leverage went", "head")}
  ${t(76, 232, "The agent writes the code. The drawing decides what it may touch.", "sub")}
  <path class="ln" style="stroke:#e6e3dc;stroke-width:2" d="M76,540 C400,543 800,538 1124,541"/>
  ${t(76, 580, "aymen.co", "footacc")}
  ${t(1124, 580, "November 2026", "foot", "end")}
  ${g}
</svg>`;

await sharp(Buffer.from(svg), { density: 300 })
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile("public/images/graph-engineer-cover.png");
console.log("wrote public/images/graph-engineer-cover.png");
