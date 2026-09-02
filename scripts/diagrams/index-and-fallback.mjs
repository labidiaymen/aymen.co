// The 80/20 index. The fallback is not the failure path, it is the edge that
// makes the index grow, so it carries the accent.
let seed = 8802461;
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

// a query arrives
s += sketchBox(20, 112, 112, 50);
s += label(76, 143, "a query");
s += arrow(132, 137, 186, 137);

// our index
s += sketchBox(186, 100, 160, 74, "dg-human");
s += label(266, 130, "our index", "dg-label dg-human-text");
s += label(266, 150, "ours to read", "dg-sub");

// the hit
s += arrow(346, 122, 434, 74, -10);
s += label(392, 82, "80%", "dg-edge dg-edge-back");
s += sketchBox(436, 48, 164, 50);
s += label(518, 79, "answered");
s += label(518, 118, "marginal cost near zero", "dg-sub");

// the miss
s += arrow(346, 154, 434, 208, 10);
s += label(392, 220, "the rest", "dg-edge");
s += sketchBox(436, 184, 164, 50, "dg-runtime");
s += label(518, 215, "a rented API", "dg-label dg-muted-label");

// the miss is the growth mechanism
s += `<path class="dg-line dg-back" d="M436,234 C360,286 300,282 266,186"/>`;
s += `<path class="dg-line dg-back dg-head" d="M258,198 L266,186 L276,196"/>`;
s += label(300, 300, "every miss says what to crawl next", "dg-edge dg-edge-back", "start");

console.log(
  `<svg viewBox="0 0 624 320" role="img" aria-labelledby="dg6-title dg6-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg6-title">The 80/20 index and its fallback</title>
  <desc id="dg6-desc">A query reaches our index. Around 80% are answered straight from it, at a marginal cost near zero. The rest fall through to a rented API, and that miss loops back into the index, because every miss says what to crawl next.</desc>
  ${s}
</svg>`
);
