// Where the line falls. The workflow is solid because it has to be replayable.
// Everything that cannot be replayed hangs off it as an activity, dashed, and
// what comes back is a recorded answer rather than a second question.
let seed = 9314507;
const rnd = () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
};
const j = (n = 2) => (rnd() - 0.5) * n * 2;

function box(x, y, w, h) {
  const o = () => j(2.4);
  return [
    `M${x + o()},${y + o()}`,
    `C${x + w * 0.4 + o()},${y + o()} ${x + w * 0.7 + o()},${y + o()} ${x + w + o()},${y + o()}`,
    `C${x + w + o()},${y + h * 0.45 + o()} ${x + w + o()},${y + h * 0.7 + o()} ${x + w + o()},${y + h + o()}`,
    `C${x + w * 0.6 + o()},${y + h + o()} ${x + w * 0.3 + o()},${y + h + o()} ${x + o()},${y + h + o()}`,
    `C${x + o()},${y + h * 0.6 + o()} ${x + o()},${y + h * 0.3 + o()} ${x + o()},${y - 1.5 + o()}`,
  ].join(" ");
}
const sketchBox = (x, y, w, h, cls = "") =>
  `<path class="dg-box ${cls}" d="${box(x, y, w, h)}"/>` +
  `<path class="dg-box dg-box2 ${cls}" d="${box(x, y, w, h)}"/>`;

function arrow(x1, y1, x2, y2, bow = 0, cls = "") {
  const mx = (x1 + x2) / 2 + j(2), my = (y1 + y2) / 2 + bow + j(2);
  const a = Math.atan2(y2 - my, x2 - mx);
  const h = 7;
  const p1 = [x2 - h * Math.cos(a - 0.42), y2 - h * Math.sin(a - 0.42)];
  const p2 = [x2 - h * Math.cos(a + 0.42), y2 - h * Math.sin(a + 0.42)];
  return (
    `<path class="dg-line ${cls}" d="M${x1},${y1} Q${mx},${my} ${x2},${y2}"/>` +
    `<path class="dg-line ${cls}" d="M${p1[0].toFixed(1)},${p1[1].toFixed(1)} L${x2},${y2} L${p2[0].toFixed(1)},${p2[1].toFixed(1)}"/>`
  );
}
const label = (x, y, t, cls = "dg-label", anchor = "middle") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${t}</text>`;

let s = "";

// the part that has to survive a replay
s += sketchBox(20, 96, 190, 96);
s += label(115, 138, "the workflow");
s += label(115, 158, "replayable", "dg-sub");

// the part that cannot be
const acts = [
  [40, "the model call"],
  [122, "the order lookup"],
  [204, "the payment"],
];
for (const [y, name] of acts) {
  s += sketchBox(300, y, 210, 58, "dg-runtime");
  s += label(405, y + 34, name, "dg-label dg-muted-label");
  s += arrow(210, 144, 296, y + 29, (y - 130) * 0.12);
}

s += label(300, 306, "each answer is written down once, not asked again", "dg-edge");

console.log(
  `<svg viewBox="0 0 624 326" role="img" aria-labelledby="dg13-title dg13-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg13-title">Where the line between workflow and activity falls</title>
  <desc id="dg13-desc">A solid box on the left holds the workflow, which has to be replayable. Three dashed boxes on the right hold the things that cannot be replayed: the model call, the order lookup and the payment. Each answer is written down once rather than asked again.</desc>
  ${s}
</svg>`
);
