---
title: "Phone Programming"
date: 2026-09-01
categories: ["ai"]
description: "Claude Code did not move programming from the IDE to the terminal. It moved programming from writing to reviewing."
permalink: "/ai/phone-programming/"
---
When Claude Code launched, I asked the obvious question. Why do we need a terminal? We have an IDE.

That was the wrong angle.

Today I ask the opposite. Why do we need an IDE, now that we have Claude Code?

## What I actually built

A few months ago I started an experiment. One small VM per project. Each VM carries the exact environment that project needs: the runtime, the database, the credentials, the test data. Nothing shared.

On each VM, an agent. It gets a task, works in a branch, and opens a merge request when it is done. The pipeline takes over from there. SonarQube runs. The e2e suite runs. Coverage is checked.

Then my phone buzzes. A merge request is waiting for final validation. I read the diff, the pipeline report, the agent's summary. I approve or I send it back with a comment.

That is the whole loop. The phone is not a gimmick. It is the last step of the pipeline, and the only step that still needs me.

## Why I started, and why I stayed

I started to offload work. R&D spikes, debugging sessions that eat an afternoon, the small tickets nobody wants. The goal was to free my hours, not to change how I program.

The turn came a few weeks in. I was reviewing a merge request on my phone, at a café, and I realised I had not opened my IDE in days. The project had moved every one of them. Nothing was blocked on me except approval.

I had not stopped working on the project. I had stopped typing in it.

## The IDE was built for a job I no longer do

An IDE is a machine for writing code. Autocomplete, refactoring, go to definition, inline errors. Every feature exists to help a human produce text faster and with fewer mistakes.

But I don't produce the text anymore. I review it.

Review needs different tools. A clear diff. The pipeline verdict next to it. The reasoning the agent followed. A way to say "no, try again" in one sentence. My phone does all of that. My IDE does none of it well.

The terminal question was never the point. Claude Code did not move programming from the IDE to the terminal. It moved programming from writing to reviewing. The terminal was just where that shift happened to appear first.

## What this changes for a team

The question I hear from engineers is the same one I asked at launch, in a different form. "If the agent writes the code, what do we do?"

We do the part that was always the hard part.

We decide what to build. We define the environment the agent works in, and that environment is now the real codebase. We write the pipeline that decides what is acceptable. We read the diff and we say yes or no.

Those are senior skills. They are the skills of an architect and a reviewer, not a typist. The engineers who struggle in this model are not the juniors. They are the people who measured their value in lines written.

## The downside

My screen time went up. Not the laptop. The phone.

The loop I built rewards checking. A merge request can land at any moment, and every buzz might be one. So I look. At lunch. In the car. At night, when nothing is waiting and I look anyway.

I traded hours at a desk for a habit in my pocket. That is not a clean win. The desk had edges. The phone has none.

## The questions it opens

If review fits in a pocket, what is a workday? What does a team look like when nobody shares a screen, a room, or a schedule? Who is responsible for a line that no human typed?

And the one I keep coming back to. If the phone is where I say yes or no, how long before that step goes away too?

I don't have the answers. I have a pipeline that works and a phone that buzzes too often. That is enough to keep going, and not enough to go back.
