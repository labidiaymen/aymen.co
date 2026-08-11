---
title: "Nuraly | How We Ship Code with AI Agents"
date: 2026-02-23
categories: ["ai"]
cover: "/images/nuraly-ship-code-ai-agents-cover.jpg"
description: "How we use Claude Code and AI agents in our development cycle at Nuraly — from GitHub tickets to deployment, with quality gates, human review, and dedicated QA VMs."
permalink: "/ai/nuraly-how-we-ship-code-with-ai-agents/"
---

We've been heavily using code agents especially Claude Code in our development cycle at Nuraly. But not alone. The agent is equipped with other tools, and the real value comes from how they work together.

## The Workflow

It starts with a GitHub ticket, created by a PM or QA. Claude Code with the Ralph Wiggum plugin activated spins up a fresh environment, initializes it with the latest codebase, and analyzes the ticket. It loads the relevant Claude Code skills and gets to work.

It creates a branch. It starts coding. When needed, it commits progressively and updates the checklist in GitHub to keep the status visible especially if other agents are working on related issues at the same time.

Once the work is ready, the agent creates a pull request and starts collaborating with other agents. GitHub Copilot steps in for a diff model review a second pair of AI eyes on the code.

![Nuraly Workflow](/images/nuraly-workflow.jpg)

At the end of each execution, a summarized version of the conversation is saved. So when work continues on the ticket through a PR comment or a follow-up task the agent picks up the compact context from the previous run. This way, we keep working on the ticket without losing context.

## Quality Gates

This is where SonarQube enters. It analyzes the PR and flags the pipeline status. If it fails, Claude Code reads the issues and quality gate results, creates a separate branch to fix them, validates the fixes, then merges them back into the ticket branch.

If the pipeline passes, a Telegram message is sent to the collaborators who worked on the ticket this also doubles as a way to test our own workflow engine in a real scenario.

Why Telegram? Because we've made a deliberate choice about where our developers spend their time. The old model has engineers glued to screens, refreshing CI dashboards, waiting for pipelines, context-switching between Slack threads and terminal windows. We don't want that. We want our team talking to clients, understanding problems firsthand, sitting in the room where decisions are made. The agents handle the waiting. The notifications come to you not the other way around. Build the feedback loop around people, not around screens.

Then comes the human review. We still keep this step. We value the human eye.

![Quality Gates](/images/nuraly-quality-gates.jpg)

## After the Merge

Once the ticket is merged, Claude Code spins up a dedicated QA VM for that specific ticket launched from a pre-built image, which makes it extremely fast. After validation, the VM is carefully destroyed. Clean in, clean out.

We chose this over resetting environments because resets are fragile. You can miss something a stale config, a leftover dependency or add a feature and forget to update the reinit script. Starting from a fresh image for QA removes that risk entirely. It was one of our best decisions.

![QA VM](/images/nuraly-qa-vm.jpg)

The deployment itself is triggered from the GitHub issue. When the issue is flagged as ready for test, an agent worker detects it, prepares the environment, and comments back on the issue with the VM details. Everything stays in the ticket no separate workflows, no context switching.

With this cycle, a QA engineer can test a ticket before the code review is even done — and continue working on it by adding comments directly on the issue. No need to wait on an engineer, no getting blocked. The feedback loop between QA and the agent stays continuous.

## Why We Still Read Every Line

This is how we ship working code at Nuraly while keeping quality and ownership intact. Every agent code is reviewed. SonarQube's pipeline needs to be green. But after all, we still read the new and modified code line by line.

Not because we don't trust the tools but because the code is ours. Agents accelerate the work. The ownership stays with us.
