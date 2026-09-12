// The shape a project gets scheduled into. The replicas are dashed because their
// number is decided while the work runs. The control plane is solid and the same
// size no matter how many there are, which is the only claim the drawing makes.
let seed = 3096418;
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
s += `<path class="dg-box dg-zone" d="${box(14, 24, 596, 234)}"/>`;
s += label(28, 46, "one project", "dg-edge", "start");

s += sketchBox(200, 56, 224, 62, "dg-human");
s += label(312, 84, "the control plane", "dg-label dg-human-text");
s += label(312, 104, "spec, checks, one human", "dg-sub");

const PW = 76, GAP = 10, N = 6;
const X0 = 312 - (N * PW + (N - 1) * GAP) / 2;
for (let i = 0; i < N; i++) {
  const x = X0 + i * (PW + GAP);
  s += sketchBox(x, 172, PW, 50, "dg-runtime");
  s += label(x + PW / 2, 202, "agent", "dg-label dg-muted-label");
  s += arrow(x + PW / 2, 170, 312 + (i - 2.5) * 14, 122, (i - 2.5) * 3);
}

s += label(312, 288, "add replicas. the control plane is the same size.", "dg-edge dg-edge-back");

console.log(
  `<svg viewBox="0 0 624 300" role="img" aria-labelledby="dg16-title dg16-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg16-title">One project, scheduled as a cluster</title>
  <desc id="dg16-desc">A dashed boundary holds one project. Inside it, a solid box is the control plane, holding the spec, the checks and one human. Below it six dashed agent replicas all feed into that one box. Adding replicas does not change the size of the control plane.</desc>
  ${s}
</svg>`
);
