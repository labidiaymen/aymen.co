// What is owned and what is rebuildable. The corpus is solid because it is the
// source of truth. The two indexes are dashed because they hold nothing that
// only exists in them, which is the whole reason an engine swap survives.
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

// the crawl
s += sketchBox(20, 66, 116, 52);
s += label(78, 97, "the crawl");
s += arrow(136, 92, 174, 92);

// extraction
s += sketchBox(174, 66, 172, 52);
s += label(260, 90, "extract");
s += label(260, 108, "markdown, gates, simhash", "dg-sub");
s += arrow(346, 92, 384, 92);

// the corpus, owned
s += sketchBox(384, 66, 160, 52, "dg-human");
s += label(464, 90, "the corpus", "dg-label dg-human-text");
s += label(464, 108, "source of truth", "dg-sub");

// the derived half
s += arrow(438, 118, 314, 202, 14);
s += arrow(494, 118, 484, 202, -10);
s += sketchBox(232, 204, 164, 52, "dg-runtime");
s += label(314, 235, "the text index", "dg-label dg-muted-label");
s += sketchBox(418, 204, 132, 52, "dg-runtime");
s += label(484, 235, "the vectors", "dg-label dg-muted-label");
s += label(391, 292, "rebuilt from the corpus", "dg-edge");

console.log(
  `<svg viewBox="0 0 624 310" role="img" aria-labelledby="dg7-title dg7-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg7-title">The corpus and the indexes derived from it</title>
  <desc id="dg7-desc">The crawl feeds an extraction step that produces markdown, applies quality gates and computes a simhash. That writes to the corpus, drawn solid because it is the source of truth. Two dashed boxes hang below it, the text index and the vectors, both rebuilt from the corpus and holding nothing of their own.</desc>
  ${s}
</svg>`
);
