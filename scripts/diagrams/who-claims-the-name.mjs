// An event binding has to be claimed by something. Two things can claim it. When
// neither does, the compiler used to say nothing, and with the flag on it fails
// the build. The failure box is the only one in the failure colour, and the quiet
// outcome is drawn faint because it leaves nothing behind.
let seed = 6021774;
const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
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
  `<path class="dg-box ${cls}" d="${box(x, y, w, h)}"/><path class="dg-box dg-box2 ${cls}" d="${box(x, y, w, h)}"/>`;
function arrow(x1, y1, x2, y2, bow = 0, cls = "") {
  const mx = (x1 + x2) / 2 + j(2), my = (y1 + y2) / 2 + bow + j(2);
  const a = Math.atan2(y2 - my, x2 - mx), h = 7;
  const p1 = [x2 - h * Math.cos(a - 0.42), y2 - h * Math.sin(a - 0.42)];
  const p2 = [x2 - h * Math.cos(a + 0.42), y2 - h * Math.sin(a + 0.42)];
  return `<path class="dg-line ${cls}" d="M${x1},${y1} Q${mx},${my} ${x2},${y2}"/>` +
         `<path class="dg-line ${cls}" d="M${p1[0].toFixed(1)},${p1[1].toFixed(1)} L${x2},${y2} L${p2[0].toFixed(1)},${p2[1].toFixed(1)}"/>`;
}
const label = (x, y, t, cls = "dg-label", anchor = "middle") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${t}</text>`;

let s = "";

// the binding
s += sketchBox(16, 104, 196, 58);
s += label(114, 130, "(valueChnage)");
s += label(114, 148, "an event binding", "dg-sub");

const rows = [
  [14,  "an output on the directive", "claimed",                       "",             "dg-label"],
  [74,  "a native DOM event",         "claimed",                       "",             "dg-label"],
  [134, "neither, flag off",          "compiles, listens for nothing", "dg-ghost",     "dg-label dg-muted-label"],
  [194, "neither, flag on",           "the build fails",               "dg-fail",      "dg-label dg-fail-text"],
];
for (const [y, name, sub, cls, lcls] of rows) {
  s += sketchBox(330, y, 280, 48, cls);
  s += label(470, y + 21, name, lcls);
  s += label(470, y + 38, sub, "dg-sub");
  s += arrow(212, 133, 326, y + 24, (y - 110) * 0.05, cls === "dg-ghost" ? "dg-ghost" : "");
}

console.log(
  `<svg viewBox="0 0 624 262" role="img" aria-labelledby="dg17-title dg17-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg17-title">Who claims an event name</title>
  <desc id="dg17-desc">An event binding, written with a typo, can be claimed by an output on the directive or by a native DOM event. If neither claims it, the outcome depends on one flag. With it off, the template compiles and listens for an event nothing fires. With it on, the build fails.</desc>
  ${s}
</svg>`
);
