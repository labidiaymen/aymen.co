// The timeline of a run that went through first time. Structured like Temporal's
// own timeline view: the top row is the whole execution, every row under it is
// one activity spanning scheduled to completed. The top row carries the accent
// because the pair of drawings is an argument about that row.
let seed = 4471028;
const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
const j = (n = 2) => (rnd() - 0.5) * n * 2;

function bar(x, y, w, h) {
  const o = () => j(1.8);
  return [
    `M${x + o()},${y + o()}`,
    `C${x + w * 0.4 + o()},${y + o()} ${x + w * 0.7 + o()},${y + o()} ${x + w + o()},${y + o()}`,
    `C${x + w + o()},${y + h * 0.5 + o()} ${x + w + o()},${y + h * 0.7 + o()} ${x + w + o()},${y + h + o()}`,
    `C${x + w * 0.6 + o()},${y + h + o()} ${x + w * 0.3 + o()},${y + h + o()} ${x + o()},${y + h + o()}`,
    `C${x + o()},${y + h * 0.6 + o()} ${x + o()},${y + h * 0.3 + o()} ${x + o()},${y - 1 + o()}`,
  ].join(" ");
}
const span = (x, y, w, cls = "", h = 20) =>
  `<path class="dg-box ${cls}" d="${bar(x, y, w, h)}"/><path class="dg-box dg-box2 ${cls}" d="${bar(x, y, w, h)}"/>`;
const label = (x, y, t, cls = "dg-label", anchor = "end") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${t}</text>`;

const LX = 162, H = 20;
const rows = [
  [36, "the run", 182, 424, "dg-human"],
  [76, "read the invoice", 190, 62, ""],
  [110, "look up the order", 260, 78, ""],
  [144, "check the totals", 346, 78, ""],
  [178, "wait for approval", 432, 124, "dg-ghost"],
  [212, "post the payment", 564, 40, ""],
];

let s = "";
for (const [y, name, x, w, cls] of rows) {
  s += label(LX, y + 15, name, cls === "dg-human" ? "dg-label dg-human-text" : "dg-label");
  s += span(x, y, w, cls);
}
s += `<path class="dg-line dg-divider" d="M180,250 C300,252 460,248 600,250"/>`;
s += label(606, 268, "time", "dg-edge");

console.log(
  `<svg viewBox="0 0 624 278" role="img" aria-labelledby="dg14-title dg14-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg14-title">The timeline of a run that went through first time</title>
  <desc id="dg14-desc">A timeline with one row per step. The top row is the whole run, drawn as a single unbroken span. Below it: read the invoice, look up the order, check the totals, a faint span for waiting on approval, and post the payment. Each one runs once and completes.</desc>
  ${s}
</svg>`
);
