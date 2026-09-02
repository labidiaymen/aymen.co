// What makes a codebase operable by an agent: one set of conventions, or ten.
// The right-hand side is deliberately ragged - that is the argument.
let seed = 4471903;
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
const label = (x, y, t, cls = "dg-label", anchor = "middle") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${t}</text>`;

let s = "";

/* ---- one stack ---- */
s += label(148, 34, "one stack", "dg-edge");
s += sketchBox(40, 56, 216, 176, "dg-human");
s += label(148, 108, "one language");
s += label(148, 140, "one mental model");
s += label(148, 172, "errors we wrote");
s += label(148, 268, "an agent reads it end to end", "dg-edge dg-edge-back");

/* ---- ten frameworks ---- */
s += label(470, 34, "ten frameworks", "dg-edge");
// Ten, because the sentence says ten.
const cells = [
  [318, 58], [396, 64], [474, 56], [552, 62],
  [326, 116], [404, 122], [482, 114], [560, 120],
  [356, 176], [470, 180],
];
cells.forEach(([x, y]) => {
  s += sketchBox(x, y, 62, 40, "dg-runtime dg-ghost");
});
s += label(470, 268, "and ten boundaries where errors turn vague", "dg-edge");

console.log(
  `<svg viewBox="0 0 624 290" role="img" aria-labelledby="dg5-title dg5-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg5-title">One stack against ten frameworks</title>
  <desc id="dg5-desc">On the left, a single solid box holding one language, one mental model and errors we wrote, with the note that an agent reads it end to end. On the right, ten small dashed boxes scattered with gaps between them, standing for ten frameworks and the boundaries between them where errors turn vague.</desc>
  ${s}
</svg>`
);
