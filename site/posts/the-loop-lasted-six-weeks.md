---
title: "The loop lasted six weeks"
seoTitle: "Graph engineering, loop engineering, and what the new name is actually pointing at"
date: 2026-09-01
categories: ["ai"]
series: "Agent-native delivery"
unlisted: true
description: "A graph is not an upgrade on a loop. It is a claim that you already know the shape of the work."
permalink: "/ai/graph-engineering-bf9cea68/"
---
In the second week of June the idea was loop engineering. Stop prompting your coding agent. Design the loop that prompts it for you.

It was a good idea. By 21 July the headlines read "Forget About Loop Engineering, Think About Graph Engineering."

Six weeks. That is the shelf life of a name in this field right now.

I am not going to argue about the word. I want to know what it is pointing at, because underneath the churn there is something real, and I hit it before it had a name.

## The ladder, written out

A prompt is the smallest unit. Context engineering decides what surrounds it. Harness engineering builds the system it runs inside. Loop engineering automates the repetition for one agent. Graph engineering connects many of those into one structure.

In a graph, nodes do the work. A node is deterministic code, or an LLM call, or a tool, or a whole agent. Edges decide what happens next, and an edge can be fixed or conditional. State flows along the edges.

That is a state machine. We have had those for fifty years. What is new is that some of the nodes are non-deterministic, and you are deciding, node by node, whether they get to be.

## The graph you already have

Most teams reading this already run one. They just drew it in a CI config instead of a diagram.

Mine looks like this. A ticket arrives. An agent picks it up on a VM that carries the exact environment that project needs: the runtime, the database, the credentials, the test data. Nothing shared. It works in a branch and opens a merge request. SonarQube runs. The e2e suite runs. Coverage is checked. My phone buzzes. I read the diff and I answer. Yes, no, or here is what you missed. On no, it goes back to the agent with my sentence attached.

Count the nodes. Agent. Three checks. One human. Count the edges. Most are fixed, because the order is not negotiable: you do not run e2e before the branch exists. One is conditional, and it is the only interesting one in the whole diagram. It is the edge out of me.

That is what graph engineering is. Not a framework. The recognition that this drawing exists, that you are responsible for it, and that every arrow in it is a decision.

## The only question that matters

Where does the model choose, and where does the system decide for it?

That is the whole job. Everything else is syntax.

A support agent classifies before it responds. Always. That order is not a preference, it is domain knowledge, and hardcoding it into an edge is not a limitation. It is the thing you know, written down.

Compare two versions of the same task. A migration that runs overnight: read the schema, plan the change, write it, run it against a copy, diff the result, report. You know every one of those steps and their order. Draw all of it. Give the model the inside of the nodes and none of the routing.

Now a bug that a customer reported in prose. You do not know if it is one file or nine, whether it needs a repro first, whether the fix is in the API or the client. Draw that as a fixed sequence and you will spend a week adding branches for cases you did not think of. Give the agent a goal, a working environment, and a check that tells it when it is done.

So a graph is not an upgrade on a loop. It is a claim that you know the shape of the work. Where you know it, draw it. Where you don't, leave the model room and let it find out.

## Three edges worth arguing about

**The retry.** Every graph has one, and most have it wrong. An agent fails a check, so you route it back to try again. Fine. Now cap it. Without a cap, a flaky e2e suite and a stubborn model will burn a night's budget in a loop that looks healthy from the outside. Three attempts, then the edge goes somewhere else. A capped retry is engineering. An uncapped one is a bill.

**The failure path.** Ask what happens when a node fails for a reason nobody planned. The database is not there. The credentials expired. The model returns something that does not parse. If your answer is that the run stops and someone notices eventually, you have a demo. A graph without a recovery path is a demo that survived contact with a happy input.

**The escape.** Somewhere in the graph, an agent should be able to say "I cannot do this" and route to a human without failing. If the only way out is failure, the model learns to fake success, because every path it has leads through appearing to be finished.

## State is where people get hurt

The tempting mistake is to let everything travel. The task, the full repository, every previous message, the output of every node. It works in a demo of four steps and it collapses at twelve. Costs climb, latency climbs, and the model starts answering with the wrong half of what you sent it.

Decide, per edge, what actually needs to cross it.

My review node needs the diff, the check results, and the agent's reasoning. It does not need the repository. The e2e node needs a running environment and a branch name. It does not need the ticket text. The agent that picks up my rejection needs my sentence and the diff it wrote. It does not need the other eleven merge requests open that week.

The rule I use: if I cannot say out loud why a piece of state is crossing an edge, it is not crossing.

## The human is a node

This is the part people leave off the diagram, and it is the part with the worst latency in the system.

I am a node. My inputs are a diff and a pipeline verdict. My output is one of three tokens. My response time is however long it takes me to look at my phone, which at night is hours.

Once you write yourself into the graph, the design consequences are immediate. Work that blocks on me should not be work that could have run in parallel. Anything sitting behind my approval should be visible as sitting there, not silently stalled. And the moment I notice I am approving without reading, my node has become a rubber stamp and the graph has a hole in it exactly where its guarantee was supposed to be.

That last one is not a tooling problem. It is the reason the checks in front of me have to be real, and the reason I would rather have three that mean something than nine I have learned to scroll past.

## Where it goes wrong

The failure mode is drawing the graph too early.

The people building deep research learned this in public. They started with predefined workflows and moved back to letting the agent plan, delegate and manage its own context, because those parts work better when they emerge than when they are wired. The graph was the wrong tool for a task whose shape changes with every question.

That is the trap. A graph looks like control, and control feels like engineering. But every edge you draw is a decision you are making on the model's behalf, forever, for every input. Draw enough of them and you have written the program you were trying not to write, in a worse language, with a model in the middle of it.

The honest test: could you write down the steps for this task, in order, before seeing the input? If yes, draw it. If you find yourself writing "it depends" more than twice, stop drawing and give the agent room.

## What this does to the job

I said in another post that we decide what to build, we design the systems, the loops and the graphs, we define the environment the agent works in, and then we read the diff and say yes or no.

The graph is where most of that lands.

Choosing which steps are deterministic. Deciding what state travels and what stays local. Placing the validators, and making them mean something. Capping the retries. Drawing the failure paths, because those are the ones you will actually live in. Putting yourself in the diagram honestly, latency and all.

None of that is prompting. None of it is typing code into a function body. It is systems design, and the artefact is a diagram that happens to execute.

The engineers who are good at this are the ones who were already good at distributed systems, pipelines and state machines. They are not learning a new discipline. They are applying an old one to a runtime that occasionally makes things up.

## The name will change again

By winter there will be another word. Someone will point out that a graph is a poor model for agents that spawn other agents at runtime, and they will be right, and there will be a fresh set of guides with 2027 in the title.

Do not wait for it to settle. The teams shipping this way are not sitting out the naming cycle, and the vocabulary was never the hard part.

Draw the parts you know. Leave the rest open. Cap the retries. Put a human on the edge that matters, and make sure that human is still reading.
