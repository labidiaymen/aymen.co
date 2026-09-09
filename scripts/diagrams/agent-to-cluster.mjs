// The long way round, and the short way that is not restricted but absent.
// The accent goes on the two nodes the argument is about: the human who reads
// the diff, and the controller that is the only thing holding a credential.
let seed = 6640281;
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

const Y = 66, H = 48, MID = Y + H / 2;
const N = [
  { x: 9, w: 96, t: "agent" },
  { x: 129, w: 104, t: "review", cls: "dg-human" },
  { x: 257, w: 90, t: "the repo" },
  { x: 371, w: 116, t: "argo", cls: "dg-human" },
  { x: 511, w: 104, t: "cluster" },
];

let s = "";
N.forEach((n, i) => {
  s += sketchBox(n.x, Y, n.w, H, n.cls || "");
  s += label(n.x + n.w / 2, MID + 4, n.t, n.cls ? "dg-label dg-human-text" : "dg-label");
  if (i < N.length - 1) s += arrow(n.x + n.w, MID, N[i + 1].x - 2, MID);
});

s += label(429, 142, "watches the repo, holds the credentials", "dg-sub");

// the edge that is absent rather than restricted
s += `<path class="dg-line dg-stop" d="M57,116 C64,172 300,208 470,186"/>`;
s += label(286, 226, "the edge that does not exist", "dg-edge");

console.log(
  `<svg viewBox="0 0 624 240" role="img" aria-labelledby="dg9-title dg9-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg9-title">How a change reaches the cluster</title>
  <desc id="dg9-desc">An agent's change goes to a human review, then into the repository. Argo watches that repository and holds the only credentials, and it is what reaches the cluster. A second path leaves the agent and heads towards the cluster directly, but it stops partway and never arrives: that edge does not exist.</desc>
  ${s}
</svg>`
);
