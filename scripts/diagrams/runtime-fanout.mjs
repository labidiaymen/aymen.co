// Second diagram: the two shapes side by side. Left, a job whose steps you know
// before you see the input. Right, one where the node count is a runtime fact.
let seed = 771131;
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
  const mx = (x1 + x2) / 2 + j(2.5);
  const my = (y1 + y2) / 2 + bow + j(2.5);
  const a = Math.atan2(y2 - my, x2 - mx);
  const h = 7.5;
  const p1 = [x2 - h * Math.cos(a - 0.42), y2 - h * Math.sin(a - 0.42)];
  const p2 = [x2 - h * Math.cos(a + 0.42), y2 - h * Math.sin(a + 0.42)];
  return (
    `<path class="dg-line ${cls}" d="M${x1},${y1} Q${mx},${my} ${x2},${y2}"/>` +
    `<path class="dg-line ${cls}" d="M${p1[0].toFixed(1)},${p1[1].toFixed(1)} L${x2},${y2} L${p2[0].toFixed(1)},${p2[1].toFixed(1)}"/>`
  );
}
const label = (x, y, t, cls = "dg-label") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="middle">${t}</text>`;

let s = "";

/* Only the dynamic shape. The fixed one is the pipeline diagram further up,
   so the contrast is between the two figures rather than inside one. */
const RC = 310;
s += sketchBox(RC - 75, 24, 150, 40);
s += label(RC, 49, "a goal");
s += arrow(RC, 64, RC, 112);

s += sketchBox(RC - 75, 114, 150, 46);
s += label(RC, 142, "agent");

// the agent decides how many times it goes round
s += `<path class="dg-line dg-back" d="M${RC - 75},142 C${RC - 128},138 ${RC - 132},100 ${RC - 70},108"/>`;
s += `<path class="dg-line dg-back dg-head" d="M${RC - 80},102 L${RC - 70},108 L${RC - 81},115"/>`;
s += label(RC - 148, 168, "loops until done", "dg-edge dg-edge-back");

// fan-out decided at runtime: three real, one that stands for the rest
const kids = [RC - 211, RC - 89, RC + 33];
kids.forEach((x, i) => {
  s += sketchBox(x, 226, 96, 36, "dg-runtime");
  s += label(x + 48, 249, "step " + (i + 1), "dg-sub");
  s += arrow(RC, 160, x + 48, 224, (i - 1) * 8, "dg-back");
  s += arrow(x + 48, 262, RC, 306, (i - 1) * -6, "dg-back");
});
s += `<path class="dg-box dg-runtime dg-ghost" d="${box(RC + 155, 226, 56, 36)}"/>`;
s += label(RC + 183, 250, "...", "dg-sub");
s += arrow(RC, 160, RC + 176, 224, 14, "dg-back");

s += sketchBox(RC - 105, 308, 210, 40);
s += label(RC, 333, "a check that ends it");
s += label(RC, 382, "how many, and which, is a runtime answer", "dg-edge dg-edge-back");

console.log(
  `<svg viewBox="0 0 620 400" role="img" aria-labelledby="dg2-title dg2-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg2-title">A job whose node count is decided at runtime</title>
  <desc id="dg2-desc">A goal feeds an agent that loops on itself until it is done. The agent fans out at runtime into three steps and an unknown number more, drawn dashed, and all of them feed a check that ends the run. How many nodes there are, and which, is only answered while it runs.</desc>
  ${s}
</svg>`
);
