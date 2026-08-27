---
title: "Joule Code - Always-on agents"
date: 2026-08-26
categories: ["ai"]
unlisted: true
thumb: "/images/joule-code-cover.png"
description: "What happens when the task is longer than your session?"
permalink: "/ai/joule-code-9af28346/"
---
Joule Code is an agentic coding tool built to run autonomously on servers, VMs and your own machine, connected to a Joule server for knowledge, work context and preconfigured agents.

## What Joule Code is not

It is not here to replace Claude Code or Codex. If you want an interactive pair programmer for your daily work, those tools are excellent, and Joule already plugs into them through its MCP server.

Joule Code answers a different question: what happens when the task is longer than your session?

A DevOps agent that watches a deployment and reacts, not one that observes and reports. A worker that runs a migration overnight. A node in a workflow graph that gets an environment, a goal and the freedom to use both until the job is done. That is where Joule Code lives.

It also handles lightweight development. Small features, fixes, scripted changes. But the design center is long-running, unattended work.

## What it connects to

Joule Code is a client of the Joule platform. Link it to a Joule server and it gets three things a standalone coding tool does not have:

- Knowledge attached to your agents.
- The work already in progress on the platform: tasks, workflows, conversations.
- Preconfigured agents you can hand a job to instead of describing it from scratch.

Run it alone and it is a coding agent. Run it attached and it is a hand on the platform.

## Sessions that outlive the terminal

Joule Code runs its conversations behind a daemon. Quit the terminal and the session does not die. Configure an agent, give it the task, close the laptop. It keeps going.

Session state is owned by the daemon and bound to your account, not to the client that started it. Reconnect from the terminal or open the same conversation in the Console web; either way you attach to the same running session, with its full history and current state. Switching clients is not a resume. Nothing was interrupted.

## Skills, plus Knowledge

Joule Code supports skills, the same way every coding tool does now. Skills stay. They are the right way to teach an agent a procedure.

What skills do not solve is context. The usual pattern is to ship a folder of markdown files into the repository and hope the agent reads the right one. It goes stale, it duplicates across repos, and it grows until nobody wants to maintain it.

Joule Code adds the Knowledge feature of the platform on top of skills. You move the heavy part of that context, architecture notes, domain rules, API references, past decisions, into Knowledge and keep the repository light. The agent runs RAG over the knowledge attached to its Joule server, so that context lives in one place, stays current, and is shared across every session and every project that needs it. Skills tell the agent how to do the work. Knowledge tells it what it is working with.

## Checkpoints

A checkpoint is a saved state of a conversation. Start a new session from it and the agent already knows the project, the conventions and the decisions made so far. No re-reading the folder tree, no rebuilding context from markdown files.

There is a second benefit. Checkpoints make requests cacheable, so the same grounded context does not get paid for twice.

## Session pools

Real work is several features at once, in several conversations, and one of them usually depends on another.

Sessions are independent by default. When they belong together, you group them into a pool: the same feature, a shared subsystem, a set of related tasks. Inside a pool, a session can sneak peek another one: its status, its tasks, where it stands. Enough to know whether the thing you depend on is done, without merging the two conversations or asking a human to relay.

## The search engine

Joule Code has access to the search engine we run on Joule. When the task needs fresh data, a new API version, a changelog, a breaking change from last week, the agent goes and gets it. It does not have to guess from training data.

## Interfaces

The daemon owns the session, so the interface is your choice. The TUI, the Console web, and a VS Code extension, now in preview, all attach to the same running session. Pick the one that fits the moment, or use several at once.

## Built with Lumen

Joule Code is written in Lumen, our programming language. TypeScript syntax, native binary. The same language that runs the Joule backend and the workflow engine. One stack, one mental model, end to end.

## Early adopters

We are looking for early adopters. There is a [Telegram group](https://t.me/+ZVbEIHk64UA5ZDc0) where we discuss features, bugs and releases, and you are invited.

The first 20 users get free access to the coding model for three months.

Ask. Search. Make.
