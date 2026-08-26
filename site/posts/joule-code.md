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

When you come back, the session is where you left it. And because sessions are tied to your account, you can open the same conversation from the Console web and follow it from there. Terminal in the morning, browser in the afternoon, same agent, same state.

## Knowledge instead of markdown folders

Every coding tool now supports skills, and so does Joule Code. The difference is what happens to context.

The usual pattern is to ship a folder of markdown files into the repository and hope the agent reads the right one. Joule Code uses the Knowledge feature of the platform instead. Nothing ships with the repo. The agent runs RAG over the knowledge attached to its Joule server, so the context lives in one place, stays current, and is shared across every session that needs it.

## Checkpoints

A checkpoint is a saved state of a conversation. Start a new session from it and the agent already knows the project, the conventions and the decisions made so far. No re-reading the folder tree, no rebuilding context from markdown files.

There is a second benefit. Checkpoints make requests cacheable, so the same grounded context does not get paid for twice.

## A pool of sessions

Real work is several features at once, in several conversations, and one of them usually depends on another.

Joule Code keeps a pool of sessions. A session can sneak peek another one: its status, its tasks, where it stands. Enough to know whether the thing you depend on is done, without merging the two conversations or asking a human to relay.

## The search engine

Joule Code has access to the search engine we run on Joule. When the task needs fresh data, a new API version, a changelog, a breaking change from last week, the agent goes and gets it. It does not have to guess from training data.

## VS Code extension

A VS Code extension is available in preview. The TUI is the primary interface, but if you prefer to work from the editor, you can.

## Built with Lumen

Joule Code is written in Lumen, our programming language. TypeScript syntax, native binary. The same language that runs the Joule backend and the workflow engine. One stack, one mental model, end to end.

## Early adopters

We are looking for early adopters. There is a [Telegram group](https://t.me/+ZVbEIHk64UA5ZDc0) where we discuss features, bugs and releases, and you are invited.

The first 20 users get free access to the coding model for three months.

Ask. Search. Make.
