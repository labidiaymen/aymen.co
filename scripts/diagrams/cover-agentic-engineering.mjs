// Cover art for the agentic engineering piece. Not the gate from inside the
// article -- the proportion. Producing used to be most of the work and checking
// was the tax at the end. The bars trade places.
// Writes public/images/agentic-engineering-cover.png.
import sharp from "sharp";

let seed = 8825061;
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

const X0 = 610, W = 500, H = 66;
let g = "";

// then: producing is most of it, checking is the tax at the end
const y1 = 186, cut1 = X0 + 380;
g += t(X0, 170, "then", "rowlbl");
g += sk(X0, y1, cut1 - X0, H);
g += t((X0 + cut1) / 2, y1 + 40, "producing", "seg", "middle");
g += sk(cut1, y1, X0 + W - cut1, H);
g += t((cut1 + X0 + W) / 2, y1 + 40, "checking", "seg", "middle");

// now: the halves trade places
const y2 = 326, cut2 = X0 + 120;
g += t(X0, 310, "now", "rowacc");
g += sk(X0, y2, cut2 - X0, H);
g += t((X0 + cut2) / 2, y2 + 40, "producing", "seg", "middle");
g += sk(cut2, y2, X0 + W - cut2, H, "acs");
g += t((cut2 + X0 + W) / 2, y2 + 40, "checking", "segacc", "middle");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="12" fill="${ACCENT}"/>
  <style>
    .bx,.ln{fill:none;stroke:${INK};stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
    .bx2{opacity:.4}
    .acs{stroke:${ACCENT}}
    .seg{fill:${INK};font-family:'DejaVu Sans Mono',monospace;font-size:15px}
    .segacc{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:15px}
    .rowlbl{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:17px}
    .rowacc{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:17px}
    .sub{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:18px}
    .kick{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px;letter-spacing:3px}
    .head{fill:${INK};font-family:'DejaVu Serif',Georgia,serif;font-size:40px}
    .foot{fill:${MUTED};font-family:'DejaVu Sans',sans-serif;font-size:22px}
    .footacc{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px}
  </style>
  ${t(76, 128, "AI", "kick")}
  ${t(76, 232, "Agentic engineering", "head")}
  ${t(76, 286, "is building the check", "head")}
  ${t(76, 366, "Producing it is the cheap half.", "sub")}
  ${t(76, 396, "Proving it is the job.", "sub")}
  <path class="ln" style="stroke:#e6e3dc;stroke-width:2" d="M76,540 C400,543 800,538 1124,541"/>
  ${t(76, 580, "aymen.co", "footacc")}
  ${t(1124, 580, "September 2026", "foot", "end")}
  ${g}
</svg>`;

await sharp(Buffer.from(svg), { density: 300 }).resize(1200, 630).png({ compressionLevel: 9 })
  .toFile("public/images/agentic-engineering-cover.png");
console.log("wrote public/images/agentic-engineering-cover.png");
