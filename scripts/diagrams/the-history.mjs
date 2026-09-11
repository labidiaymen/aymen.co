// The history as the thing it actually is: a list. The worker dies partway down
// it and the list does not care, which is the whole argument in one column.
let seed = 2740916;
const rnd = () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
};
const j = (n = 2) => (rnd() - 0.5) * n * 2;

const label = (x, y, t, cls = "dg-label", anchor = "start") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${t}</text>`;

const SPINE = 50;
const rows = [
  [50, "WorkflowExecutionStarted", ""],
  [82, "ActivityTaskScheduled", "read the repo"],
  [114, "ActivityTaskCompleted", ""],
  [146, "ActivityTaskScheduled", "ask the model"],
  [178, "ActivityTaskCompleted", ""],
  [246, "TimerStarted", "waiting on a person"],
  [278, "TimerFired", ""],
  [310, "WorkflowExecutionCompleted", ""],
];

let s = "";

// the spine, drawn in two passes like everything else
for (let p = 0; p < 2; p++) {
  const o = () => j(1.6);
  s += `<path class="dg-line ${p ? "dg-box2" : ""}" d="M${SPINE + o()},34 C${SPINE + o()},120 ${SPINE + o()},240 ${SPINE + o()},322"/>`;
}

for (const [y, name, gloss] of rows) {
  s += `<path class="dg-line" d="M${44 + j(1)},${y - 4 + j(1)} C${48},${y - 4 + j(1.4)} ${54},${y - 4 + j(1.4)} ${58 + j(1)},${y - 4 + j(1)}"/>`;
  s += label(70, y, name);
  if (gloss) s += label(340, y, gloss, "dg-sub");
}

// the moment the process stops mattering
s += `<path class="dg-line dg-back" d="M22,214 C120,217 300,211 404,215"/>`;
s += label(70, 206, "the worker dies here", "dg-edge dg-edge-back");

s += label(70, 348, "a new worker replays everything above and carries on", "dg-edge");

console.log(
  `<svg viewBox="0 0 624 366" role="img" aria-labelledby="dg12-title dg12-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg12-title">The history of one run</title>
  <desc id="dg12-desc">A vertical list of events for a single run: execution started, an activity scheduled to read the repository and completed, an activity scheduled to ask the model and completed. A line crosses the list marking where the worker dies. Below it the list continues: a timer started while waiting on a person, the timer fired, and the execution completed. A new worker replays everything above the line and carries on.</desc>
  ${s}
</svg>`
);
