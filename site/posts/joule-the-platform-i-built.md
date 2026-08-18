---
title: "Joule: The Platform I Built by Rebuilding Everything I Kept Rebuilding"
date: 2026-08-18
categories: ["ai"]
description: "Every AI project I built started the same way: week two, and I am writing the same components again. If you keep rebuilding the same thing, at some point it should become a product."
permalink: "/ai/joule-the-platform-i-built/"
---
Every AI project I built started the same way: week two, and I am writing the same components again. Agent orchestration. Search with real context. Document generation. Workflow logic. Different projects, different codebases, same patterns.

If you keep rebuilding the same thing, at some point it should become a product.

<figure class="video" data-youtube="R8HEWlsWraE">
  <button class="video-play" type="button" aria-label="Play the video: Joule.sh - The AI Workspace">
    <img src="/images/joule-video-poster.jpg" alt="The Joule workspace, running a research task" width="1280" height="720" loading="lazy" decoding="async">
    <span class="video-play-icon" aria-hidden="true"></span>
  </button>
</figure>

## What Joule is

Joule is an AI platform and workspace for individuals and enterprises to build, maintain and deploy AI workflows and agents.

Each word in that sentence is deliberate.

Platform, because the components work together as one system, not as a bag of SDKs you have to glue yourself.

Workspace, because it is where you actually operate day to day, not a control panel you visit once a month.

Build, maintain and deploy, because most AI tools stop at the demo stage and leave the operational reality to you.

And workflows and agents together, because real systems need both: agents for judgment, workflows for structure.

The distinction matters. The market is full of chatbots with plugins on one side and low-level frameworks on the other. The chatbots cap what you can build. The frameworks hand you a box of parts and a wish of good luck. Joule sits in the space between: the pieces every serious AI system needs, already built, already integrated, already running in production.

## The main components

### Lumen Agents

The backend and the core of the platform. It orchestrates agents and manages all configuration around them. It is open source, part of the Lumen standard contrib packages: Lumen - std-contrib

### The workflow engine

Written in Lumen as well, it serves as the backbone of every agent workflow. Every step an agent takes runs through it. One core, one mental model, one place to look when something behaves unexpectedly.

### The search engine

It provides RAG context to the models. We index 1 million pages each day and growing, with a fallback strategy born from a cost problem that turned into a product of its own. We never planned to build it. It is now one of the strongest parts of the platform.

### The frontend

It runs on our own full stack web framework and design system. Owning the UI layer end to end means the platform evolves at the speed we decide, not at the speed of a dependency's release cycle.

### The MCP server

It lets you integrate Joule directly into coding agents like Claude Code and Codex, and deploy or manage workflows and agents from inside your coding session. Everything through natural language.

### Tasks

Tasks let agents work without you in the loop. A task runs on a schedule or on a trigger, executes its workflow, and delivers the result. You do not prompt it. You define it once, and it works while you do something else.

### Document generation

It turns agent output into real deliverables. Not text in a chat window, but actual documents, produced through a self-correcting loop where the agent fixes its own failures. The reliability comes from the loop design, not from prompt engineering.

### Knowledge

Knowledge gives every agent its own grounded context through a file sync model. Folders attach to agents, agents become specialists, and specialists compose as sub-agents inside the workflow graph.

### Connectors

Connectors link Joule to Atlassian, Asana, Linear and the other platforms where work already happens. The difference from every chat product: connectors in Joule are not just conversation features. They are tasks and nodes in the workflow itself.

### Discover

A feed of fresh, synthesized content, in the spirit of Perplexity's feed. It is the direct fruit of combining two components we already had: our own search engine, which knows what is fresh and in demand, and our agents, which turn that signal into substance. Nobody planned it. The architecture produced it.

### Live environments

Live environments give agents a real place to execute. You define an environment per project: runtime, dependencies, credentials and tools, and everything that runs in that project runs inside it. Agents stop working in the abstract and start working in your actual context.

Joule is live at [joule.sh](https://joule.sh/). Try it, break it, tell me what's missing.

Ask. Search. Make.
