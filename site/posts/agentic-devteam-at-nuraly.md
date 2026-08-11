---
title: "Agentic DevTeam @Nuraly"
date: 2026-04-22
categories: ["ai"]
cover: "/images/agentic-devteam-at-nuraly-cover.jpg"
description: "One of the most challenging parts of the software development cycle is maintenance. Over time, teams face turnover, loss of expertise, and shrinking bandwidth leaving little room to secure, enhance, or fix what's already in production."
permalink: "/ai/agentic-devteam-at-nuraly/"
---

One of the most challenging parts of the software development cycle is maintenance. Over time, teams face turnover, loss of expertise, and shrinking bandwidth leaving little room to secure, enhance, or fix what's already in production.

We faced these exact problems. Here's how we overcame them using coding agents.

---

## Humans are mission-driven. So are our agents.

At work, at home, in life we each operate around a set of missions. We applied the same model to our agents. We built an agentic team around our tools and gave each agent a defined set of missions to carry out over time.

Our job as humans doesn't disappear it shifts. We create missions, specify timing and frequency, and let agents execute. Then we observe for drift, update missions that are complete, and retire ones that no longer fit the current state of the project.

---

## Start small. Start safe.

We began by identifying mission types with low risk and clear scope: daily improvements, security checks, bug detection. The kind of work a single agent can handle with little chance of going off course.

---

## The code flow: GitHub as source of truth

Here's the pipeline we use to develop and maintain both LumenJS and the Nuraly platform.

1. Issue creation A mission scans the codebase and creates a ticket for a specific task. If a similar ticket already exists, the agent skips it.

2. Implementation Another mission picks up the ticket, creates a branch, implements the fix or feature, opens a PR, and iterates until checks pass build, tests, and SonarQube pipelines. If something breaks, a separate agent takes over to fix it.

3. PR review On our SaaS, we maintain a next branch before anything goes live. A review agent inspects each PR: if the changes are small and obvious, it merges to next. Otherwise, it leaves a comment requesting improvements. The cycle stays open another agent picks up the PR, evaluates the feedback, and either pushes back (if the change isn't worth it) or implements what's requested. To avoid burning tokens, we cap the number of retry attempts.

4. Human validation Once the PR is green, a human steps in to validate what the agent has done before anything ships.

---

## Missions are scoped by project.

Each project has its own set of missions. What we've found: small, incremental changes over time give us more control and visibility than large codebases nobody has the bandwidth to manage.

---

## The human role doesn't disappear, it shifts.

This is the part people often misunderstand about agentic systems. Agents don't replace human judgment. They replace human execution of repetitive, well-defined tasks.

Here's how the responsibility actually divides:

- Humans define the mission its scope, timing, retry limits, and success criteria. Humans observe for drift and decide when a mission is stale or needs updating. Humans do the final validation before anything ships.

- Agents execute they create tickets, open branches, push code, iterate through fix loops, and auto-merge small obvious changes. They work continuously, within the boundaries they've been given.

The key insight: as long as missions stay small and well-scoped, agents stay predictable. The human overhead doesn't scale with the number of agents it scales with the number of missions you define, which is a much smaller number.

---

## The shift is worth it.

We didn't need more developers or more sprints. We needed a different model small missions, running continuously, with humans staying in the loop at the right moments.

What surprised us most wasn't what the agents could do. It was the clarity the mission model forced on us. When you define work precisely enough for an agent to execute it, vague tickets stop being acceptable.

Small changes compound. Drift is the real risk. And the loop never fully closes without a human that's not a limitation, it's the point.
