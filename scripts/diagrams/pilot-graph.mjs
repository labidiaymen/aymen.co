// Generates the ticket-to-merge-request graph of the agent platform as inline SVG.
// Seeded, so the wobble is identical on every run and the file stays stable.
let seed = 20261123;
const rnd = () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
};
const j = (n = 2) => (rnd() - 0.5) * n * 2;

// A rectangle drawn the way a hand draws one: corners overshoot, sides bow.
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

// A line with a bow in it and a two-stroke arrowhead.
function arrow(x1, y1, x2, y2, bow = 0) {
  const mx = (x1 + x2) / 2 + j(3);
  const my = (y1 + y2) / 2 + bow + j(3);
  const a = Math.atan2(y2 - my, x2 - mx);
  const head = 8;
  const h1 = [x2 - head * Math.cos(a - 0.42), y2 - head * Math.sin(a - 0.42)];
  const h2 = [x2 - head * Math.cos(a + 0.42), y2 - head * Math.sin(a + 0.42)];
  return (
    `<path class="dg-line" d="M${x1},${y1} Q${mx.toFixed(1)},${my.toFixed(1)} ${x2},${y2}"/>` +
    `<path class="dg-line" d="M${h1[0].toFixed(1)},${h1[1].toFixed(1)} L${x2},${y2} L${h2[0].toFixed(1)},${h2[1].toFixed(1)}"/>`
  );
}

const label = (x, y, text, cls = "dg-label") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="middle">${text}</text>`;

const N = {
  item: { x: 12, y: 168, w: 92, h: 52 },
  plan: { x: 132, y: 168, w: 92, h: 52 },
  build: { x: 252, y: 156, w: 124, h: 76 },
  verdict: { x: 404, y: 156, w: 124, h: 76 },
  review: { x: 556, y: 168, w: 104, h: 52 },
  finish: { x: 688, y: 168, w: 104, h: 52 },
  you: { x: 832, y: 156, w: 116, h: 76 },
};
const right = (n) => [n.x + n.w, n.y + n.h / 2];
const left = (n) => [n.x, n.y + n.h / 2];
const cx = (n) => n.x + n.w / 2;

let s = "";
// edges first, so the boxes sit on top of any overshoot
s += arrow(...right(N.item), ...left(N.plan));
s += arrow(...right(N.plan), ...left(N.build));
s += arrow(...right(N.build), ...left(N.verdict));
s += arrow(...right(N.verdict), ...left(N.review));
s += arrow(...right(N.review), ...left(N.finish));
s += arrow(...right(N.finish), ...left(N.you));

// the escape: review can stop and hand the item to a person without failing
const ry = N.review.y;
s +=
  `<path class="dg-line" d="M${cx(N.review)},${ry} C${cx(N.review) + 40},${ry - 96} ${cx(N.you) - 50},${N.you.y - 100} ${cx(N.you)},${N.you.y - 4}"/>` +
  `<path class="dg-line" d="M${cx(N.you) - 8},${N.you.y - 13} L${cx(N.you)},${N.you.y - 4} L${cx(N.you) + 6},${N.you.y - 14}"/>`;

// the capped retry: a red verdict goes back to the build
const [vx, vy] = [cx(N.verdict), N.verdict.y + N.verdict.h];
const [bx, by] = [cx(N.build), N.build.y + N.build.h];
s +=
  `<path class="dg-line dg-back" d="M${vx},${vy} C${vx - 10},${vy + 96} ${bx + 20},${by + 96} ${bx},${by + 4}"/>` +
  `<path class="dg-line dg-back dg-head" d="M${bx - 7},${by + 14} L${bx},${by + 4} L${bx + 8},${by + 13}"/>`;

s += sketchBox(N.item.x, N.item.y, N.item.w, N.item.h);
s += sketchBox(N.plan.x, N.plan.y, N.plan.w, N.plan.h);
s += sketchBox(N.build.x, N.build.y, N.build.w, N.build.h);
s += sketchBox(N.verdict.x, N.verdict.y, N.verdict.w, N.verdict.h);
s += sketchBox(N.review.x, N.review.y, N.review.w, N.review.h);
s += sketchBox(N.finish.x, N.finish.y, N.finish.w, N.finish.h);
s += sketchBox(N.you.x, N.you.y, N.you.w, N.you.h, "dg-human");

s += label(cx(N.item), N.item.y + 31, "work item");
s += label(cx(N.plan), N.plan.y + 31, "plan");
s += label(cx(N.build), N.build.y + 32, "build");
s += label(cx(N.build), N.build.y + 52, "own container", "dg-sub");
s += label(cx(N.verdict), N.verdict.y + 32, "verdict");
s += label(cx(N.verdict), N.verdict.y + 52, "no model in it", "dg-sub");
s += label(cx(N.review), N.review.y + 31, "review");
s += label(cx(N.finish), N.finish.y + 31, "draft MR");
s += label(cx(N.you), N.you.y + 32, "you", "dg-label dg-human-text");
s += label(cx(N.you), N.you.y + 52, "merge or not", "dg-sub");

s += label(744, 74, "needs info", "dg-edge");
s += label(cx(N.verdict) - 76, 352, "red: back to the build, three rounds at most", "dg-edge dg-edge-back");

console.log(
  `<svg viewBox="0 0 960 380" role="img" aria-labelledby="dg-title dg-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg-title">The ticket-to-merge-request graph</title>
  <desc id="dg-desc">A work item goes to a plan, then to a build step where an agent works in its own container. A verdict step made of fixed steps, with no model in it, reads the pipeline. Green goes on to review, then to a draft merge request, then to a person who merges or not. Red goes back to the build, at most three rounds. From review, a second edge marked needs info goes straight to the person without failing the run.</desc>
  ${s}
</svg>`
);
