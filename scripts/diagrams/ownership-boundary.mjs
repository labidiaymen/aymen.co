// Third diagram: what the engineer owns and what the agent owns.
// Solid dark = drawn by a person. Dashed accent = decided while running.
let seed = 5540912;
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
const label = (x, y, t, cls = "dg-label", anchor = "middle") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${t}</text>`;

const C = 268;
let s = "";

// what goes in
s += sketchBox(C - 120, 16, 240, 50);
s += label(C, 38, "the goal");
s += label(C, 56, "and the state you let in", "dg-sub");
s += arrow(C, 66, C, 104);

// the interior nobody draws
s += `<path class="dg-box dg-runtime dg-zone" d="${box(88, 106, 360, 156)}"/>`;
s += label(C, 130, "the model chooses", "dg-edge dg-edge-back");
[110, 232, 354].forEach((x, i) => {
  s += `<path class="dg-box dg-runtime dg-ghost" d="${box(x, 168, 84, 34)}"/>`;
  s += label(x + 42, 190, "?", "dg-sub");
});
s += `<path class="dg-line dg-back" d="M152,218 C210,236 330,236 392,220"/>`;
s += `<path class="dg-line dg-back dg-head" d="M160,210 L151,219 L163,225"/>`;
s += label(C, 254, "as many times as it takes", "dg-sub");

// the two things the engineer still owns on the way out
s += arrow(C, 262, C, 300);
s += sketchBox(C - 120, 302, 240, 50);
s += label(C, 324, "a check that ends it");
s += label(C, 342, "strong enough to trust", "dg-sub");

s += arrow(448, 176, 502, 176, 0);
s += sketchBox(504, 154, 126, 44);
s += label(567, 181, "a human");
s += label(567, 216, "the way out", "dg-sub");
s += label(475, 160, "cap", "dg-edge");

s += label(C, 392, "you own the boundary, not the interior", "dg-edge");

console.log(
  `<svg viewBox="0 0 646 410" role="img" aria-labelledby="dg3-title dg3-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg3-title">What the engineer owns and what the agent owns</title>
  <desc id="dg3-desc">Three boxes are drawn solid because a person designed them: the goal and the state allowed in at the top, a check that ends the run at the bottom, and a human as the way out on the right, reached once a cap is hit. Between them sits a dashed region labelled "the model chooses", holding unnamed nodes and a loop that runs as many times as it takes. The boundary is designed; the interior is not.</desc>
  ${s}
</svg>`
);
