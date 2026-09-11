// Two things arrive at the check and they look identical from outside. Only one
// leaves toward done. The accent sits on the check and on the edge that sends
// the other one back, because those are the two the caption is about.
let seed = 3157742;
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
  const mx = (x1 + x2) / 2 + j(2.5), my = (y1 + y2) / 2 + bow + j(2.5);
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

let s = "";

// the two things that look the same from outside
s += sketchBox(20, 34, 190, 50);
s += label(115, 65, "finished");
s += sketchBox(20, 150, 190, 50, "dg-ghost");
s += label(115, 181, "finished-looking", "dg-label dg-muted-label");

s += arrow(210, 59, 266, 100, -6);
s += arrow(210, 175, 266, 134, 6, "dg-ghost");

// the check
s += sketchBox(270, 84, 140, 60, "dg-human");
s += label(340, 112, "the check", "dg-label dg-human-text");
s += label(340, 130, "runs without me", "dg-sub");

s += arrow(412, 114, 468, 114);
s += sketchBox(470, 84, 130, 60);
s += label(535, 120, "done");

// only one of them leaves this way
s += `<path class="dg-line dg-back" d="M322,146 C288,222 184,238 118,204"/>`;
s += `<path class="dg-line dg-back" d="M128.0,204.6 L118,204 L124.2,211.8"/>`;
s += label(258, 250, "back to the agent", "dg-edge dg-edge-back");

console.log(
  `<svg viewBox="0 0 624 268" role="img" aria-labelledby="dg10-title dg10-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg10-title">What a check has to separate</title>
  <desc id="dg10-desc">Two things arrive at the check: work that is finished, and work that is finished-looking, drawn faintly because from outside the two are indistinguishable. The check runs without a person. One edge leaves it towards done, and a second edge sends the other back to the agent.</desc>
  ${s}
</svg>`
);
