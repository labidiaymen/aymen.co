// The same run with a step that failed twice before it held. The failed attempts
// are outlined in the failure colour so they read as failures rather than as gaps.
// The top row is still one span,
// which is the entire point of putting these two drawings next to each other.
let seed = 8820471;
const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
const j = (n = 2) => (rnd() - 0.5) * n * 2;

function bar(x, y, w, h) {
  const o = () => j(1.8);
  return [
    `M${x + o()},${y + o()}`,
    `C${x + w * 0.4 + o()},${y + o()} ${x + w * 0.7 + o()},${y + o()} ${x + w + o()},${y + o()}`,
    `C${x + w + o()},${y + h * 0.5 + o()} ${x + w + o()},${y + h * 0.7 + o()} ${x + w + o()},${y + h + o()}`,
    `C${x + w * 0.6 + o()},${y + h + o()} ${x + w * 0.3 + o()},${y + h + o()} ${x + o()},${y + h + o()}`,
    `C${x + o()},${y + h * 0.6 + o()} ${x + o()},${y + h * 0.3 + o()} ${x + o()},${y - 1 + o()}`,
  ].join(" ");
}
const span = (x, y, w, cls = "", h = 20) =>
  `<path class="dg-box ${cls}" d="${bar(x, y, w, h)}"/><path class="dg-box dg-box2 ${cls}" d="${bar(x, y, w, h)}"/>`;
const label = (x, y, t, cls = "dg-label", anchor = "end") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${t}</text>`;

const LX = 162;
let s = "";

// the run still completes, and it is still one span
s += label(LX, 51, "the run", "dg-label dg-human-text");
s += span(182, 36, 424, "dg-human");

s += label(LX, 91, "read the repo");
s += span(190, 76, 60);

s += label(LX, 125, "ask the model");
s += span(258, 110, 82);

// two that failed, then one that held
s += label(LX, 159, "run the suite");
s += span(348, 144, 40, "dg-fail");
s += span(398, 144, 40, "dg-fail");
s += span(448, 144, 76);
s += label(368, 138, "1", "dg-edge dg-fail-text", "middle");
s += label(418, 138, "2", "dg-edge dg-fail-text", "middle");
s += label(486, 138, "3", "dg-edge", "middle");
s += label(534, 159, "two retries", "dg-edge dg-fail-text", "start");

s += label(LX, 193, "wait for a person");
s += span(534, 178, 44, "dg-ghost");

s += label(LX, 227, "open the request");
s += span(586, 212, 20);

s += `<path class="dg-line dg-divider" d="M180,250 C300,252 460,248 600,250"/>`;
s += label(606, 268, "time", "dg-edge");
s += label(182, 268, "the failed attempts left nothing behind", "dg-edge", "start");

console.log(
  `<svg viewBox="0 0 624 278" role="img" aria-labelledby="dg15-title dg15-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg15-title">The timeline of a run whose step failed twice</title>
  <desc id="dg15-desc">The same timeline. Reading the repo and asking the model complete as before. Running the suite now shows three attempts: the first two outlined in red because they failed, the third completing, marked as two retries. Everything after it shifts later. The top row, the whole run, is still a single unbroken span.</desc>
  ${s}
</svg>`
);
