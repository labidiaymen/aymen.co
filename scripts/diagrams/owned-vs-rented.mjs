// Two paths for the same job. The one you own completes; the one you rent
// dead-ends, because the signal never reaches you.
let seed = 3310277;
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

const BW = 168, BH = 58;
const cols = [26, 234, 442];
let s = "";

/* ---- the owned path ---- */
s += label(26, 34, "what we own", "dg-edge", "start");
cols.forEach((x, i) => {
  if (i) s += arrow(cols[i - 1] + BW, 92, x, 92);
});
s += sketchBox(cols[0], 62, BW, BH);
s += label(cols[0] + BW / 2, 88, "our index");
s += label(cols[0] + BW / 2, 106, "what is fresh", "dg-sub");

s += sketchBox(cols[1], 62, BW, BH);
s += label(cols[1] + BW / 2, 88, "agents");
s += label(cols[1] + BW / 2, 106, "read and synthesize", "dg-sub");

s += sketchBox(cols[2], 62, BW, BH, "dg-human");
s += label(cols[2] + BW / 2, 88, "Discover", "dg-label dg-human-text");
s += label(cols[2] + BW / 2, 106, "a feed you browse", "dg-sub");

s += label(cols[0] + BW / 2, 146, "the shape of demand", "dg-edge dg-edge-back");
s += label(cols[1] + BW / 2, 146, "signal into substance", "dg-edge dg-edge-back");

/* ---- the divider ---- */
s += `<path class="dg-line dg-divider" d="M24,186 C220,189 420,183 620,187"/>`;

/* ---- the rented path ---- */
s += label(26, 224, "what renting gives you", "dg-edge", "start");
s += arrow(cols[0] + BW, 282, cols[1], 282);
s += sketchBox(cols[0], 252, BW, BH, "dg-runtime");
s += label(cols[0] + BW / 2, 278, "a search API", "dg-label dg-muted-label");
s += label(cols[0] + BW / 2, 296, "their ranking", "dg-sub");

s += sketchBox(cols[1], 252, BW, BH, "dg-runtime");
s += label(cols[1] + BW / 2, 278, "answers", "dg-label dg-muted-label");
s += label(cols[1] + BW / 2, 296, "to your queries", "dg-sub");

// the edge that never arrives
s += `<path class="dg-line dg-runtime dg-ghost" d="M${cols[1] + BW},282 L${cols[2] + 34},282"/>`;
s += `<path class="dg-line dg-stop" d="M${cols[2] + 44},268 L${cols[2] + 66},296"/>`;
s += `<path class="dg-line dg-stop" d="M${cols[2] + 66},268 L${cols[2] + 44},296"/>`;
s += label(cols[2] + BW / 2 + 24, 330, "the signal never arrives", "dg-edge");

s += label(324, 372, "same models, same budget, different architecture", "dg-edge");

console.log(
  `<svg viewBox="0 0 648 392" role="img" aria-labelledby="dg4-title dg4-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg4-title">Owning the index and the agents, against renting search</title>
  <desc id="dg4-desc">Two paths. Above, what we own: our index, which shows what is fresh and what is being asked, feeds agents that read, synthesize and connect, which feed Discover, a feed you browse. Below, what renting gives you: a search API returns answers to the queries you sent, and the path to a feed is crossed out because the underlying signal never reaches you.</desc>
  ${s}
</svg>`
);
