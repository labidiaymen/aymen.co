// Cover art for the search engine piece. The distinctive decision in the whole
// system is what gets written down: a page as the web serves it, and the same
// page as we keep it. Everything that is not the article is gone before storage.
// Writes public/images/search-engine-cover.png.
import sharp from "sharp";

let seed = 3308517;
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
const sk = (x, y, w, h, cls = "", amt) =>
  `<path class="bx ${cls}" d="${box(x, y, w, h, amt)}"/><path class="bx bx2 ${cls}" d="${box(x, y, w, h, amt)}"/>`;
// a drawn line of body copy
const rule = (x, y, w, cls = "cl") =>
  `<path class="${cls}" d="M${x + j(1.5)},${y + j(1)} C${x + w * 0.4},${y + j(1.6)} ${x + w * 0.7},${y + j(1.6)} ${x + w + j(1.5)},${y + j(1)}"/>`;
const t = (x, y, s, cls = "lbl", anchor = "start") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${s}</text>`;

let g = "";

// left panel: the page as it is served
g += sk(606, 140, 224, 320);
g += sk(618, 152, 200, 26, "ghost", 1.8);            // nav
[196, 214, 232, 250, 268].forEach((y) => g += rule(620, y, 108));   // the article, buried
g += sk(742, 190, 76, 62, "ghost", 1.8);             // ad
g += sk(742, 264, 76, 52, "ghost", 1.8);             // ad
g += sk(628, 322, 150, 58, "ghost", 1.8);            // modal
[342, 360].forEach((y) => g += rule(642, y, 90, "cl ghost"));
g += sk(618, 420, 200, 26, "ghost", 1.8);            // cookie strip

// the funnel
g += `<path class="ln" d="M840,298 C856,301 868,299 884,300"/>`;
g += `<path class="ln" d="M876,295 L884,300 L876,305"/>`;

// right panel: what is actually written down
g += sk(900, 140, 224, 320, "acclbx");
g += t(916, 206, "# how bread rises", "md acc");
g += t(916, 240, "yeast eats the sugar", "md");
g += t(916, 268, "and gives off gas.", "md");
g += t(916, 296, "the dough traps it.", "md");

g += t(718, 496, "served as html", "sub", "middle");
g += t(1012, 496, "kept as markdown", "acc", "middle");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="12" fill="${ACCENT}"/>
  <style>
    .bx,.ln,.cl{fill:none;stroke:${INK};stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
    .bx2{opacity:.4}
    .cl{stroke-width:3;stroke:${MUTED}}
    .ghost{opacity:.4}
    .acclbx{stroke:${ACCENT}}
    .md{fill:${INK};font-family:'DejaVu Sans Mono',monospace;font-size:16px}
    .md.acc{fill:${ACCENT}}
    .sub{fill:${MUTED};font-family:'DejaVu Sans Mono',monospace;font-size:18px}
    .acc{fill:${ACCENT};font-family:'DejaVu Sans Mono',monospace;font-size:18px}
    .kick{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px;letter-spacing:3px}
    .head{fill:${INK};font-family:'DejaVu Serif',Georgia,serif;font-size:44px}
    .foot{fill:${MUTED};font-family:'DejaVu Sans',sans-serif;font-size:22px}
    .footacc{fill:${ACCENT};font-family:'DejaVu Sans',sans-serif;font-size:22px}
  </style>
  ${t(76, 128, "AI", "kick")}
  ${t(76, 222, "The search engine", "head")}
  ${t(76, 276, "we never planned", "head")}
  ${t(76, 330, "to build", "head")}
  ${t(76, 404, "Constraints did the product", "sub")}
  ${t(76, 434, "design for us.", "sub")}
  <path class="ln" style="stroke:#e6e3dc;stroke-width:2" d="M76,540 C400,543 800,538 1124,541"/>
  ${t(76, 580, "aymen.co", "footacc")}
  ${t(1124, 580, "August 2026", "foot", "end")}
  ${g}
</svg>`;

await sharp(Buffer.from(svg), { density: 300 }).resize(1200, 630).png({ compressionLevel: 9 })
  .toFile("public/images/search-engine-cover.png");
console.log("wrote public/images/search-engine-cover.png");
