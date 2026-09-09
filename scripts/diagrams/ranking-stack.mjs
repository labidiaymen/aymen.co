// The ranking stack. Two rank lists fuse into one, and everything after that is
// a layer on top of relevance rather than a replacement for it. The fusion node
// carries the accent because it is the only place two orderings become one.
let seed = 2298137;
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

let s = "";

// the two rank lists
s += sketchBox(20, 40, 156, 54);
s += label(98, 64, "bm25");
s += label(98, 82, "title weighted 5x", "dg-sub");

s += sketchBox(20, 162, 156, 54);
s += label(98, 186, "vector knn");
s += label(98, 204, "nearest neighbours", "dg-sub");

// they meet exactly once
s += arrow(176, 76, 232, 118, -8);
s += arrow(176, 180, 232, 140, 8);
s += sketchBox(232, 102, 128, 54, "dg-human");
s += label(296, 126, "fusion", "dg-label dg-human-text");
s += label(296, 144, "rrf, k=60", "dg-sub");

// layers on top, not instead
s += arrow(360, 129, 412, 129);
s += sketchBox(412, 102, 192, 54);
s += label(508, 126, "recency");
s += label(508, 144, "re-sort inside an 8x pool", "dg-sub");

s += arrow(508, 156, 508, 208);
s += sketchBox(412, 210, 192, 54);
s += label(508, 234, "curation");
s += label(508, 252, "pins and excludes, last", "dg-sub");

s += label(20, 296, "relevance decides the pool. everything after it only reorders one.", "dg-edge dg-edge-back", "start");

console.log(
  `<svg viewBox="0 0 624 316" role="img" aria-labelledby="dg8-title dg8-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg8-title">The ranking stack</title>
  <desc id="dg8-desc">A bm25 rank list with the title weighted five times, and a vector nearest-neighbour rank list, both feeding one fusion node using reciprocal rank fusion at k equals 60. From there a recency step re-sorts inside an eight times overfetched pool, and curation, the manual pins and excludes, is applied last. Relevance decides the pool and the later stages only reorder it.</desc>
  ${s}
</svg>`
);
