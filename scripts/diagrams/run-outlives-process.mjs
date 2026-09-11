// Workers are dashed accent because they are ephemeral. The history is the only
// solid box in the drawing, because it is the only thing that survives them. The path straight from one worker to the
// next is drawn stopping, because nothing crosses that way.
let seed = 5903318;
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

s += label(205, 44, "writes every step", "dg-edge");
s += label(426, 44, "replays from it", "dg-edge");

// the worker that dies
s += sketchBox(16, 60, 170, 70, "dg-runtime");
s += label(101, 90, "a worker", "dg-label dg-muted-label");
s += label(101, 110, "ephemeral", "dg-sub");
s += arrow(186, 95, 224, 95);

// the only thing that survives it
s += sketchBox(226, 60, 180, 70);
s += label(316, 90, "the history", "dg-label");
s += label(316, 110, "outside the process", "dg-sub");
s += arrow(406, 95, 444, 95);

// whatever picks the run back up
s += sketchBox(446, 60, 170, 70, "dg-runtime dg-ghost");
s += label(531, 90, "another worker", "dg-label dg-muted-label");
s += label(531, 110, "same place", "dg-sub");

// the way nothing travels
s += `<path class="dg-line dg-stop" d="M186,130 C286,206 392,208 470,182"/>`;
s += label(316, 240, "the process carries nothing across", "dg-edge");

console.log(
  `<svg viewBox="0 0 624 258" role="img" aria-labelledby="dg11-title dg11-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg11-title">Where the state of a run lives</title>
  <desc id="dg11-desc">A worker, drawn dashed because it is ephemeral, writes every step into a history that sits outside the process. Another worker replays from that history and carries on from the same place. A second path runs directly from one worker to the other but stops before arriving, because the process carries nothing across.</desc>
  ${s}
</svg>`
);
