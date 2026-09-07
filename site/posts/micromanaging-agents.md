---
title: "Micromanaging Agents Is Still Micromanaging"
date: 2026-09-07
categories: ["ai"]
pinned: true
description: "Tokens are the cheap half of the bill. Attention is the other half."
cover: "/images/micromanaging-cover.png"
permalink: "/ai/micromanaging-agents/"
---
Four questions. That is everything 156 agents needed from me over three days.

The rest they decided. Twenty-four million tokens, one backend moved from Java to TypeScript, and four moments where the work stopped and waited for a human.

I did not get there by being relaxed. My instinct runs the other way. I stop agents that are doing fine.

They take a path I did not expect. They name something differently than I would have. Nothing is broken. I stop them anyway.

I tell myself it is about tokens. Catch the drift early, kill the wasted generation, keep the bill down.

That is the wrong bill.

## Tokens are cheap. Attention is not.

Models self-correct now. They catch their own mistakes, backtrack, retry. A wasted generation costs a fraction of a cent.

My attention has no such price. I get a few hours of real focus in a day, and redirecting an agent mid-task burns them exactly as fast as redirecting a person does.

Twenty-four million tokens was the cheap half of that port. The expensive half was every time I looked.

So the number I watch is not how much the agents got through. It is how little came back.

## A manager who hovers is not managing

Nobody stands behind a senior engineer correcting each line as it is typed. A good manager plans with the team up front, sets the checkpoints, and shows up at a real blocker. Otherwise people work, and the work gets reviewed when it is done.

That is not hands-off. That is the job.

## The same discipline, pointed at an agent

Set the scope up front. Say what done looks like. Decide where the real blockers are, the ones that need a human, not the ones where the agent picked a different name than I would have. Then step back.

Giving a task and watching it happen anyway is not delegation. It is supervision with extra steps, and it costs the exact thing delegation was supposed to buy back.

## What the checkpoints actually were

The planning was [spec-kit](/ai/spec-driven-development-sdd/), run literally: spec, clarify, plan, tasks, implement. That reads as ceremony until you see what it buys.

Every behavioral decision in the research had to cite the exact lines in the Java it matched, or deliberately broke from. Not a paraphrase of what the old code did. Line numbers. It turns "did we port this correctly" from a feeling into something checkable.

Each feature got its own spec, its own branch, its own test suite. Nothing landed mid-flight. A branch was committed when its suite went green, and not before.

So the checkpoints were never me watching. They were the spec, the green suite, and one pass at the end that read every feature together and surfaced the four questions the agents could not answer on their own. Those four came to me. Everything else they closed.

Plan hard enough that the agents have somewhere to stop. Make the check cheap enough that you do not have to watch.

## What it costs to stop interrupting

Sometimes the run goes wrong and I find out twenty minutes later instead of twenty seconds in. That is real. On a bad day it is a bad trade.

The sharpest version happened on that same port. A background agent kept retrying a Docker bring-up and let a virtual disk grow past its own cap until the host had zero bytes free. Another leaked three Node processes across retries until the machine was down to 0.36GB of memory. I was not watching. Finding out late cost an afternoon.

One line from that day is worth more than the rest of it. A background command's own success message is not proof it ran to completion. I issued a shutdown right after a prune, the prune died mid-flight, and the whole sequence looked identical to success until I read the numbers.

So the checkpoints tell me themselves now. ntfy, one line each: a suite going green, a branch giving up after its retries. I do not watch, and I do not have to keep asking.

That does not close the hole. An agent killed by the OOM reaper never gets to send anything. The runs I most need to hear about are the ones that cannot speak, so silence is not a green light. It is just silence.

## The other failure

Stop interrupting and it gets easy to stop reading. An approval that is not a real read is worse than any interruption.

Plan well. Check in at the real blockers. Let the agent carry the work. Do not carry it twice.

Trust is not naive if it ends in a review. Without one, it is.
