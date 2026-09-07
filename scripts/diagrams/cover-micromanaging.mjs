// Cover art for the micromanaging piece. The run drawn at its real size --
// 13 x 12 is exactly the 156 agents -- and the four edges that reached a human.
// The ratio is the whole argument, so the picture is the ratio.
// Writes public/images/micromanaging-cover.png.
import sharp from "sharp";

let seed = 5514098;
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

// The one edge that costs something: an agent handing a decision back.
function back(x1, y1, x2, y2) {
  const mx = (x1 + x2) / 2 + j(5), my = (y1 + y2) / 2 + j(4);
  const a = Math.atan2(y2 - my, x2 - mx), h = 10;
  const p1 = [x2 - h * Math.cos(a - 0.42), y2 - h * Math.sin(a - 0.42)];
  const p2 = [x2 - h * Math.cos(a + 0.42), y2 - h * Math.sin(a + 0.42)];
  return `<path class="ln acs" d="M${x1},${y1} Q${mx},${my} ${x2},${y2}"/>` +
         `<path class="ln acs" d="M${p1[0].toFixed(1)},${p1[1].toFixed(1)} L${x2},${y2} L${p2[0].toFixed(1)},${p2[1].toFixed(1)}"/>`;
}
const t = (x, y, s, cls = "lbl", anchor = "start") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${s}</text>`;

const COLS = 13, ROWS = 12;            // 156, drawn rather than claimed
const BW = 30, BH = 14, GX = 38, GY = 19;
const X0 = 861 - (COLS * GX - (GX - BW)) / 2; // field centred on the human below
const Y0 = 130;
const ASK = [1, 4, 8, 11];             // the four that came back
const LAST = ROWS - 1;

let g = "";
g += t(861, 112, "156 agents", "muted", "middle");

for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const on = r === LAST && ASK.includes(c);
    g += sk(X0 + c * GX, Y0 + r * GY, BW, BH, on ? "acs" : "quiet", 1.3);
  }
}

const fieldBottom = Y0 + LAST * GY + BH;
ASK.forEach((c, i) => g += back(X0 + c * GX + BW / 2, fieldBottom + 2, 840 + i * 14, 420));

g += sk(815, 424, 92, 46);
g += t(861, 454, "me", "lbl", "middle");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="12" fill="${ACCENT}"/>
  <style>
    .bx,.ln{fill:none;stroke:${INK};stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
    .bx2{opacity:.4}
    .quiet{stroke-width:1.6;opacity:.55}
    .quiet.bx2{opacity:.22}
    .acs{stroke:${ACCENT}}
    .ln.acs{stroke-dasharray:7 5}
    .lbl{fill:${INK};font-family:'DejaVu Sans Mono',monospace;font-size:20px}
    .muted{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:19px}
    .acc{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:20px}
    .sub{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:18px}
    .kick{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px;letter-spacing:3px}
    .head{fill:${INK};font-family:'DejaVu Serif',Georgia,serif;font-size:38px}
    .foot{fill:${MUTED};font-family:'DejaVu Sans',sans-serif;font-size:22px}
    .footacc{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px}
  </style>
  ${t(76, 128, "DELEGATION", "kick")}
  ${t(76, 232, "Micromanaging agents", "head")}
  ${t(76, 282, "is still micromanaging", "head")}
  ${t(76, 364, "Not how much they got through.", "sub")}
  ${t(76, 394, "How little came back.", "sub")}
  <path class="ln" style="stroke:#e6e3dc;stroke-width:2" d="M76,540 C400,543 800,538 1124,541"/>
  ${t(76, 580, "aymen.co", "footacc")}
  ${t(1124, 580, "September 2026", "foot", "end")}
  ${g}
</svg>`;

await sharp(Buffer.from(svg), { density: 300 }).resize(1200, 630).png({ compressionLevel: 9 })
  .toFile("public/images/micromanaging-cover.png");
console.log("wrote public/images/micromanaging-cover.png");
