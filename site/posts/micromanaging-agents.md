---
title: "Micromanaging Agents Is Still Micromanaging"
date: 2026-09-02
categories: ["ai"]
unlisted: true
description: "Optimizing for token cost while draining your own attention is optimizing the wrong variable."
cover: "/images/micromanaging-cover.png"
permalink: "/ai/micromanaging-agents-7c00d470/"
---
I stop agents that are not doing anything wrong.

They take a path I did not expect. They name something differently than I would have. Nothing is broken. I stop them anyway.

I tell myself I am saving tokens. Catch the drift early, avoid the wasted generation, keep things efficient.

That is not the real cost. The real cost is my attention. Every interruption pulls it back into the loop, and I stop thinking about the problem I was trying to solve to babysit a process instead.

## Tokens are cheap. Attention is not.

Models self-correct now. They catch their own mistakes, backtrack, retry. A wasted generation costs a fraction of a cent.

My attention does not have that price tag. I get a certain number of hours of real focus in a day, and redirecting an agent mid-task burns them exactly as fast as redirecting a person does.

Optimizing for token cost while draining your own attention is optimizing the wrong variable.

One port ran to 24 million tokens across 156 agents. That is the cheap half of the bill.

Four questions came back to me. Four, against 156 agents, and everything else was decided without me.

That ratio is the only measure of delegation I trust. Not how much the agents got through. How little came back.

## A manager who hovers is not managing

Nobody stands behind a senior engineer correcting each line as it is typed. A good manager plans with the team up front, sets the checkpoints, and shows up when there is a real blocker. Outside of that, people work, and the output gets reviewed when it is done.

That is not hands-off. That is the job.

## The same discipline, pointed at an agent

Set the scope up front. Define what done looks like. Decide where the real blockers are, the ones that actually need you, not the ones where the agent chose a different name than you would have. Then step back and let it run.

Giving a task and watching it happen anyway is not delegating. It is supervision with extra steps, and it costs the exact thing delegation was supposed to buy back.

## What the checkpoints actually were

That port was a backend moved from Java to TypeScript. Three days. Sixteen feature slices, each with its own spec, its own branch, and its own test suite. Nothing landed mid-flight. A branch was committed when its suite went green, and not before.

The planning was spec-kit, applied literally: spec, clarify, plan, tasks, implement. That reads as ceremony until you see what it buys. Every behavioral decision in the research had to cite the exact source lines in the Java it matched, or deliberately broke from. Not a paraphrase of what the old code did. Line numbers. It turns "did we port this correctly" from a feeling into something checkable.

The checkpoints were not me watching. They were the spec, the green suite, and one pass at the end that read all sixteen features together and surfaced four questions the agents could not answer on their own. Those four came to me. Everything else they decided.

Plan hard enough that the agents have somewhere to stop. Make the check cheap enough that you do not have to watch.

## What it costs to stop interrupting

Sometimes the run goes wrong and I find out twenty minutes later instead of twenty seconds in. That is real. It is the trade, and on a bad day it is a bad trade.

The sharpest version of that happened on the same port. A background agent retrying a Docker bring-up let a virtual disk grow past its own cap until the host had zero bytes free. Another leaked three Node processes across retries until the machine was down to 0.36GB of memory. I was not watching. Finding out late cost an afternoon.

One line from that day is worth more than the rest of it. A background command's own success message is not proof it ran to completion. I issued a shutdown straight after a prune, the prune died mid-flight, and the whole sequence looked identical to success until I checked the numbers.

The other failure is the one to watch. Stop interrupting and it gets easy to stop reading. An approval that is not a real read is worse than any interruption.

Plan well. Check in at the real blockers. Let the agent carry the work. Do not carry it twice.

Trust is not naive if it ends in a review. Without one, it is.
