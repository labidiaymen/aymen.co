---
title: "Claude Code is Awesome. Still Not Enough."
date: 2026-04-27
categories: ["ai"]
cover: "/images/claude-code-is-awesome-still-not-enough-cover.jpg"
description: "In the last two years I've generated thousands, probably millions of lines of code. Long-running agents."
permalink: "/ai/claude-code-is-awesome-still-not-enough/"
---

In the last two years I've generated thousands, probably millions of lines of code. Long-running agents. Live sessions. Like every developer right now.

To ship production, that's not enough.

Vendors will sell you anything. They'll tell you they put agents in their pipeline and ship production code. Not true yet. I'm working across multiple projects, from products and tooling used inside big tech companies to startup R&D. I invest heavily in coding agents and live coding. Here's what I've learned so far.

---

## Code is cheap. That doesn't mean you should buy it.

A beautifully generated piece of code is compelling. Watching it build, run, ship on the first try feels great.

Then ask yourself: from that moment, what's the drift from version one? 50%? 60%? I'd say 80%.

Why? Because the first version is never mature. And now you're in the rewrite loop.

Even with a clean instruction.md or claude.md, you still get code duplication. You still get drift. You still get the "yes, you're right…" message. And you start losing track of what state your code is actually in.

Say you land on a good version. You wrote unit tests. You feel solid. Then you read through the full thing and decide it could be more maintainable. Even if you asked for maintainable code from the start. Another rewrite. Update the tests. Run QA again.

You're in a cycle. You're not shipping.

The code is cheap. The rewrite is cheap too. Nothing feels stable anymore.

---

## What you gain, what you lose

You do learn. New patterns. New ways of doing things. That's real.

But that's not the point. The point is to ship a working, maintainable application.

I lived this on one of my own projects. The agent generated a working module on the first pass. I ran it. It built. It passed tests. Then I read it and saw three places where the same logic was reimplemented with different names. I asked for a refactor. The refactor introduced a new pattern that conflicted with how the rest of the codebase handled errors. Another pass. By the time the module looked clean, the test suite needed a rewrite to match the new shape.

Net progress: zero features shipped. Net learning: a lot. Net feeling: busy.

Right now everyone feels busy and building. A small portion is shipping real production. Incremental shipping has never been easier, and yet the loop is so compelling it pulls you away from shipping.

## Recommended by LinkedIn

[

The review bottleneck

Guy Vago

5 months ago

](https://www.linkedin.com/pulse/review-bottleneck-guy-vago--nyqnf)

[

Why should we standardize our delivery?

Juan Pablo Bosnjak

10 years ago

](https://www.linkedin.com/pulse/why-should-we-standardize-our-delivery-juan-pablo-bosnjak)

[

How to Conquer Go Codebase Complexity as a Junior…

Stella Oiro

1 year ago

](https://www.linkedin.com/pulse/how-conquer-go-codebase-complexity-junior-developer-guide-stella-oiro-0oosf)

---

## When the loop works

It would be dishonest to stop here. The loop does work. I've seen it.

On my own agentic coding pipeline, I built two workflows that handle GitHub issues end to end. One for immediate bug fixes. One for plan-first feature work. Both run with quality gates, Docker testing, and notifications back to me. The agent does the heavy lifting. I review and merge.

The reason it works isn't the agent. It's the surrounding infrastructure. The pipeline has clear contracts. The quality gates are non-negotiable. The agent operates inside a frame I designed before I let it touch anything.

Same story with LumenJS, the framework I open-sourced this year. Web components on web standards, file-based routing, server boundaries the framework physically enforces. Half the reasons I built it that way exist because an agent is the primary developer. Less room to go wrong. The framework is the structured surface. The agent is the worker. The structure came first.

That's the pattern. The agent isn't the system. The agent works inside one.

---

## So how do you survive

You stick with a stack you actually know. The moment you let the agent pick everything, you lose ownership. You also lose the ability to debug it when it breaks.

You resist the buzz from the magic generation. That feeling is a fake sense of accomplishment. Too good to be true. 99% of the time, the real work is still ahead of you. The build passing is not the finish line. It's barely the start.

You invest in infrastructure more than before. Start with a solid layer: architecture, must-use and must-not-use patterns, data flow, component responsibilities, testing infrastructure, CI. Everything from day one. That's what lets you plug in a coding agent and actually get value out of it. Small, validated, incremental steps. You leverage the agent and you keep ownership and control.

This is the part most teams skip. They want the agent first and the structure later. It doesn't work in that order. The structure is what makes the agent useful.

You still need to learn how to code, more than before. You still need to try patterns and learn their tradeoffs. You still need to master the agent's tools and make them work for you. The skill ceiling went up, not down. The agent makes the floor higher and the ceiling further away at the same time.

And you still own the agent's output. If you ship code you don't understand and it breaks, that's on you. Not the agent. Not the vendor. You.

---

## What this means for engineering leaders

If you run a team and you're being pitched on agent-driven development as a productivity multiplier, ask one question: what's the infrastructure my team needs in place before the agent makes us faster?

If the answer is "none, just turn it on," walk away.

The teams getting real leverage from coding agents right now are not the teams with the most agents. They're the teams with the cleanest contracts, the strictest quality gates, and the engineers who still read every diff before it merges.

Code is cheap. Judgment is not. Infrastructure is not. Ownership is not.

---

*Originally published on [LinkedIn](https://www.linkedin.com/pulse/claude-code-awesome-still-enough-aymen-labidi-silif/).*
