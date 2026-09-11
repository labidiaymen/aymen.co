---
title: "The Run Has to Outlive the Process"
seoTitle: "Temporal and agent workflows: durable execution, retries and recovery"
date: 2026-09-11
categories: ["ai"]
unlisted: true
description: "A run that lives only in a process is not a workflow. It is a session that has not crashed yet."
cover: "/images/durable-run-cover.png"
permalink: "/ai/durable-runs-8e41b209/"
---
An agent killed by the OOM reaper never gets to tell you. I wrote that about a run I was not watching, and the honest conclusion was that silence is not a green light.

The fix I reached for was better notifications. That was the wrong layer.

The run had no memory outside the process. Everything it had done lived in the heap of the thing that died, so there was nothing to ask, nothing to resume, and no way to know how far it got. A run like that is not a workflow. It is a session that has not crashed yet.

## What an agent run actually is

Look at what you are asking for. Read this repository, plan a change, edit twenty files, run a suite, fix what failed, run it again, wait for a human, then open a merge request.

That is a long-lived process with external side effects, non-deterministic steps, and waits measured in hours. Every property that makes distributed systems hard, in one job. We have known how to run those for a long time. We just did not used to point them at a model.

The properties you need are not new either. The work has to survive the machine it started on. A step that half-finished must be knowable as half-finished. A retry must not repeat a side effect that already landed. And a wait for a human must not cost a running process for six hours.

## Durable execution

Temporal's answer is to stop keeping the run in memory.

Every step a workflow takes is appended to a history that lives outside the worker. The worker is disposable. Kill it and another one picks the run up by replaying that history, which puts it back exactly where the first one was, with the same local variables and the same place in the code.

<figure class="diagram">
<svg viewBox="0 0 624 258" role="img" aria-labelledby="dg11-title dg11-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg11-title">Where the state of a run lives</title>
  <desc id="dg11-desc">A worker, drawn dashed because it is ephemeral, writes every step into a history that sits outside the process. Another worker replays from that history and carries on from the same place. A second path runs directly from one worker to the other but stops before arriving, because the process carries nothing across.</desc>
  <text class="dg-edge" x="205" y="44" text-anchor="middle">writes every step</text><text class="dg-edge" x="426" y="44" text-anchor="middle">replays from it</text><path class="dg-box dg-runtime" d="M16.22175350683823,61.28099956683861 C84.15329647183106,58.75826854759747 135.28264689570415,60.18297729612467 185.23517761306613,58.66094970752529 C186.68729567671534,90.99154987423287 183.92183475509373,108.25140261726985 186.5416088117946,129.93011436570907 C116.35612602269097,129.99217810742192 68.86611767013842,131.36945095237783 15.691763115903253,132.2530859015198 C17.430628778334068,99.65897426607971 15.251367122703869,80.74695339302856 13.608279228214304,57.84709237522776"/><path class="dg-box dg-box2 dg-runtime" d="M14.38935136831801,60.194941951052726 C84.74330463555795,60.20216617705401 132.86533985150297,62.303223755165575 186.85456581267275,62.0678180715385 C184.73340797477096,91.48192648998551 184.5443944935428,108.63326563929826 183.85549850475763,128.1435052397398 C116.31097078356471,131.24794259241222 68.73717136575709,128.36449909245806 18.12329974385132,131.12019233867534 C14.051578140469072,100.08434958480501 16.892887212379318,82.2340599076981 15.520760346353407,59.30548324734228"/><text class="dg-label dg-muted-label" x="101" y="90" text-anchor="middle">a worker</text><text class="dg-sub" x="101" y="110" text-anchor="middle">ephemeral</text><path class="dg-line " d="M186,95 Q206.15596199182605,93.99890327500128 224,95"/><path class="dg-line " d="M217.0,97.7 L224,95 L217.3,91.6"/><path class="dg-box " d="M228.07727890223137,61.62850570866303 C296.8091026311783,57.65354232790579 350.26934445531543,58.25286941558722 407.55927825158426,59.78569736582492 C408.22102070069917,93.40759220323879 407.7036516208684,106.68858127598119 406.4213046385075,128.73244724326415 C332.9183200365483,129.0426387793583 278.1087871553883,132.16974158499843 223.6080366134681,129.8761161181499 C226.19903307082086,99.77446632393378 223.71041159634964,81.5398964716773 224.50693054241452,56.94451918641316"/><path class="dg-box dg-box2 " d="M224.86797533094324,59.328234959453454 C300.2107922575487,62.16363945219835 353.0392665879052,58.405280685799795 407.67034888457056,62.10079479427114 C404.1820699694483,90.54379878111361 405.32939224323695,108.30807876666452 404.5974098210211,130.89699492608057 C331.9233774186687,128.42345919647414 279.721557522808,130.47289304867056 226.58623848100484,128.659982681768 C225.42231955613119,102.11598873255588 228.13078747006637,81.34502163061174 225.0242795950846,60.0864446658578"/><text class="dg-label" x="316" y="90" text-anchor="middle">the history</text><text class="dg-sub" x="316" y="110" text-anchor="middle">outside the process</text><path class="dg-line " d="M406,95 Q423.728788853031,94.33131849827772 444,95"/><path class="dg-line " d="M437.1,97.8 L444,95 L437.3,91.7"/><path class="dg-box dg-runtime dg-ghost" d="M446.1390502941511,58.11275939965284 C516.2704896471791,60.87688007507328 566.1962640779076,60.368885995246885 613.9991281511258,60.07091403122568 C617.2722591417247,91.29678154093995 617.6330043811505,109.47895012035917 615.5315670022422,128.32071342501823 C547.4134549626212,128.84154491482374 498.82227077680744,129.75537395577663 443.76791744239995,130.70351710464038 C446.4941581739551,103.71365890694487 444.4298637394001,81.07431578751388 444.39432010687625,59.03980593818231"/><path class="dg-box dg-box2 dg-runtime dg-ghost" d="M446.6150707258913,61.22496299912453 C512.2321269991958,61.66378455351283 566.1087202088482,61.50062771025143 614.1275297167374,58.73914561324713 C617.9077441235574,89.99125556987303 616.0880956184529,109.70198574210609 617.7927427311394,127.62080135346427 C548.2538009000261,131.00989132086275 496.41304454887893,130.22041835906936 446.56439800400494,128.54372615858153 C447.8151046295721,101.03688583440933 447.25691147020876,83.31158066015298 447.7048973102611,59.823287202661525"/><text class="dg-label dg-muted-label" x="531" y="90" text-anchor="middle">another worker</text><text class="dg-sub" x="531" y="110" text-anchor="middle">same place</text><path class="dg-line dg-stop" d="M186,130 C286,206 392,208 470,182"/><text class="dg-edge" x="316" y="240" text-anchor="middle">the process carries nothing across</text>
</svg>
  <figcaption>The only solid box is the one that survives. Workers come and go around it.</figcaption>
</figure>

The consequence is the interesting part. A crash stops being an event you have to handle. It becomes a delay.

## The model does not go in the workflow

Replay only works if re-running the code produces the same decisions. So workflow code has to be deterministic, and an LLM call is the least deterministic thing in the building.

That forces a split, and the split is the good part. The workflow holds the shape of the job: what happens, in what order, what waits for what, what happens when something fails. Everything non-deterministic goes in an activity: the model call, the tool call, the shell command, the HTTP request. The result of an activity is written to the history, so on replay the workflow does not call the model again. It reads what the model said last time.

Which means the durable part of your system is the part you designed, and the part that varies is quarantined behind a boundary with a timeout on it. That is the same line I keep drawing in every one of these systems, only here the runtime enforces it instead of me.

## Retries, with the cap in the right place

Every activity carries its own retry policy. Attempts, backoff, a ceiling, which errors are worth retrying at all.

I have written before that a capped retry is engineering and an uncapped one is a bill. The difference here is where the cap lives. Not in the agent's prompt, not in a loop somebody wrote at two in the morning, but in the configuration of the step, outside the code that fails. A model asked to limit its own retries is being asked to be careful. A policy does not have to be careful.

Heartbeats matter more than they sound. A long activity reports progress, and an activity that stops reporting is detected as dead rather than assumed alive. That is the direct answer to the failure I hit: a background command's own success message is not proof it ran to completion. Nothing has to be taken on trust if the thing is being watched from outside.

## Waiting is free

A workflow can sleep for a day. It can block on a signal that arrives whenever a person gets to it. Neither holds a process open, because the wait is a row in a database and not a thread parked in memory.

That changes what a human checkpoint costs. I have described myself as a node in my own pipeline with hours of latency, which is true and which I am not going to fix by being faster. If waiting for me is free, then putting me in the path stops being a performance decision and goes back to being a correctness one.

## What it does not fix

It does not make the agent right. A durable workflow will reliably, repeatedly, and with excellent observability carry out a bad plan. Recovery is not judgment.

Activities run at least once, not exactly once. A worker can die after a side effect lands and before the result is recorded, so the step runs again. If that step charged a card or sent an email, you now have two. Idempotency is your problem, and the machinery that makes recovery possible is the same machinery that makes duplicates possible.

Determinism is a real constraint on how you write. No clocks, no random, no direct network in workflow code, and a change to a workflow that is already running has to be versioned or it breaks on replay. Those rules are not heavy, but they are rules, and they will catch you the first time.

And you are now running another thing. A service, a database behind it, workers to deploy, a history that grows until you reset it. For a script you run once, all of this is absurd. Build the script.

## Where the line is

The line is whether losing the run costs you more than standing this up.

For a short job, nothing. Run it again. For twenty-four million tokens of work spread across three days and a hundred and fifty six agents, losing the run is not an inconvenience, it is the whole bill and the whole afternoon.

An agent that cannot survive a restart is a demo. Everything else is a question of how much you are prepared to lose.
