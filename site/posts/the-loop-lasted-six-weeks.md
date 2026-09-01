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

## The only question that matters

Where does the model choose, and where does the system decide for it?

That is the whole job. Everything else is syntax.

A support agent classifies before it responds. That order is not a preference, it is domain knowledge, and hardcoding it into an edge is not a limitation. It is the thing you know, written down. A graph is where you put what you already know.

So a graph is not an upgrade on a loop. It is a claim that you know the shape of the work. Where you know it, draw it. Where you don't, leave the model room and let it find out.

## Where it goes wrong

The failure mode is drawing the graph too early.

The people building deep research learned this in public. They started with predefined workflows and moved back to letting the agent plan, delegate and manage its own context, because those parts work better when they emerge than when they are wired. The graph was the wrong tool for a task whose shape changes with every question.

That is the trap. A graph looks like control, and control feels like engineering. But every edge you draw is a decision you are making on the model's behalf, forever, for every input. Draw enough of them and you have written the program you were trying not to write.

## What this does to the job

I said in another post that we decide what to build, we design the systems, the loops and the graphs, we define the environment the agent works in, and then we read the diff and say yes or no.

The graph is where most of that lands.

Choosing which steps are deterministic. Deciding what state travels between nodes and what stays local. Placing the validators. Deciding what happens on failure, because a graph without a recovery path is a demo. Deciding where a human sits in it, and being honest that this is a node like any other, with a latency measured in however long it takes you to look at your phone.

None of that is prompting. None of it is typing code into a function body. It is systems design, and the artefact is a diagram that happens to execute.

The engineers who are good at this are the ones who were already good at distributed systems, pipelines and state machines. They are not learning a new discipline. They are applying an old one to a runtime that occasionally makes things up.

## The name will change again

By winter there will be another word. Someone will point out that a graph is a poor model for agents that spawn other agents, and they will be right, and there will be a fresh set of guides with 2027 in the title.

Do not wait for it to settle. The teams shipping this way are not sitting out the naming cycle, and the vocabulary was never the hard part.

Draw the parts you know. Leave the rest open. Put a human on the edge that matters.
