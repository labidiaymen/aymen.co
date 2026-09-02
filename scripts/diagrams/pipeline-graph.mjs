// Generates the hand-drawn pipeline graph as inline SVG.
// Seeded, so the wobble is identical on every run and the file stays stable.
let seed = 20260901;
const rnd = () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
};
const j = (n = 2) => (rnd() - 0.5) * n * 2;

// A rectangle drawn the way a hand draws one: corners overshoot, sides bow.
function box(x, y, w, h, pass = 0) {
  const o = () => j(2.4);
  const p = [
    `M${x + o()},${y + o()}`,
    `C${x + w * 0.4 + o()},${y + o(0)} ${x + w * 0.7 + o()},${y + o()} ${x + w + o()},${y + o()}`,
    `C${x + w + o()},${y + h * 0.45 + o()} ${x + w + o()},${y + h * 0.7 + o()} ${x + w + o()},${y + h + o()}`,
    `C${x + w * 0.6 + o()},${y + h + o()} ${x + w * 0.3 + o()},${y + h + o()} ${x + o()},${y + h + o()}`,
    `C${x + o()},${y + h * 0.6 + o()} ${x + o()},${y + h * 0.3 + o()} ${x + o()},${y - 1.5 + o()}`,
  ].join(" ");
  return p;
}

const sketchBox = (x, y, w, h, cls = "") =>
  `<path class="dg-box ${cls}" d="${box(x, y, w, h)}"/>` +
  `<path class="dg-box dg-box2 ${cls}" d="${box(x, y, w, h)}"/>`;

// A line with a bow in it and a two-stroke arrowhead.
function arrow(x1, y1, x2, y2, bow = 0) {
  const mx = (x1 + x2) / 2 + j(3);
  const my = (y1 + y2) / 2 + bow + j(3);
  const a = Math.atan2(y2 - my, x2 - mx);
  const head = 8;
  const h1 = [x2 - head * Math.cos(a - 0.42), y2 - head * Math.sin(a - 0.42)];
  const h2 = [x2 - head * Math.cos(a + 0.42), y2 - head * Math.sin(a + 0.42)];
  return (
    `<path class="dg-line" d="M${x1},${y1} Q${mx},${my} ${x2},${y2}"/>` +
    `<path class="dg-line" d="M${h1[0].toFixed(1)},${h1[1].toFixed(1)} L${x2},${y2} L${h2[0].toFixed(1)},${h2[1].toFixed(1)}"/>`
  );
}

const label = (x, y, text, cls = "dg-label") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="middle">${text}</text>`;

const N = {
  ticket: { x: 16, y: 168, w: 104, h: 52 },
  agent: { x: 160, y: 156, w: 138, h: 76 },
  mr: { x: 338, y: 168, w: 112, h: 52 },
  c1: { x: 492, y: 96, w: 126, h: 40 },
  c2: { x: 492, y: 174, w: 126, h: 40 },
  c3: { x: 492, y: 252, w: 126, h: 40 },
  you: { x: 664, y: 156, w: 112, h: 76 },
  merged: { x: 820, y: 168, w: 120, h: 52 },
};
const mid = (n) => [n.x + n.w / 2, n.y + n.h / 2];
const right = (n) => [n.x + n.w, n.y + n.h / 2];
const left = (n) => [n.x, n.y + n.h / 2];

let s = "";
// edges first, so the boxes sit on top of any overshoot
s += arrow(...right(N.ticket), ...left(N.agent));
s += arrow(...right(N.agent), ...left(N.mr));
s += arrow(N.mr.x + N.mr.w, N.mr.y + 20, N.c1.x, N.c1.y + N.c1.h / 2, -14);
s += arrow(...right(N.mr), ...left(N.c2));
s += arrow(N.mr.x + N.mr.w, N.mr.y + 34, N.c3.x, N.c3.y + N.c3.h / 2, 14);
s += arrow(N.c1.x + N.c1.w, N.c1.y + N.c1.h / 2, N.you.x, N.you.y + 20, -14);
s += arrow(...right(N.c2), ...left(N.you));
s += arrow(N.c3.x + N.c3.w, N.c3.y + N.c3.h / 2, N.you.x, N.you.y + 56, 14);
s += arrow(...right(N.you), ...left(N.merged));

// the one conditional edge: back to the agent
const [yx, yy] = [N.you.x + N.you.w / 2, N.you.y + N.you.h];
const [ax, ay] = [N.agent.x + N.agent.w / 2, N.agent.y + N.agent.h];
s +=
  `<path class="dg-line dg-back" d="M${yx},${yy} C${yx - 40},${yy + 100} ${ax + 110},${ay + 108} ${ax},${ay + 4}"/>` +
  `<path class="dg-line dg-back dg-head" d="M${ax - 7},${ay + 14} L${ax},${ay + 4} L${ax + 8},${ay + 13}"/>`;

s += sketchBox(N.ticket.x, N.ticket.y, N.ticket.w, N.ticket.h);
s += sketchBox(N.agent.x, N.agent.y, N.agent.w, N.agent.h);
s += sketchBox(N.mr.x, N.mr.y, N.mr.w, N.mr.h);
for (const k of ["c1", "c2", "c3"]) s += sketchBox(N[k].x, N[k].y, N[k].w, N[k].h);
s += sketchBox(N.you.x, N.you.y, N.you.w, N.you.h, "dg-human");
s += sketchBox(N.merged.x, N.merged.y, N.merged.w, N.merged.h);

s += label(...mid(N.ticket).map((v, i) => (i ? v + 5 : v)), "ticket");
s += label(N.agent.x + N.agent.w / 2, N.agent.y + 32, "agent");
s += label(N.agent.x + N.agent.w / 2, N.agent.y + 52, "on its own VM", "dg-sub");
s += label(N.mr.x + N.mr.w / 2, N.mr.y + 32, "merge request");
s += label(N.c1.x + N.c1.w / 2, N.c1.y + 25, "SonarQube");
s += label(N.c2.x + N.c2.w / 2, N.c2.y + 25, "e2e suite");
s += label(N.c3.x + N.c3.w / 2, N.c3.y + 25, "coverage");
s += label(N.you.x + N.you.w / 2, N.you.y + 32, "you", "dg-label dg-human-text");
s += label(N.you.x + N.you.w / 2, N.you.y + 52, "on a phone", "dg-sub");
s += label(N.merged.x + N.merged.w / 2, N.merged.y + 32, "merged");

s += label(798, 172, "yes", "dg-edge");
s += label(455, 350, "no, here is what you missed", "dg-edge dg-edge-back");

console.log(
  `<svg viewBox="0 0 960 380" role="img" aria-labelledby="dg-title dg-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg-title">The delivery pipeline drawn as a graph</title>
  <desc id="dg-desc">A ticket goes to an agent running on its own VM, which opens a merge request. Three checks run in parallel: SonarQube, the e2e suite and coverage. All three feed a human node, marked "you, on a phone". From there one edge leads to merged, and a second conditional edge loops back to the agent carrying the rejection.</desc>
  ${s}
</svg>`
);
