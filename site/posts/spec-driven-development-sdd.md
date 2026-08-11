---
title: "Spec-Driven Development (SDD)"
date: 2026-05-14
categories: ["ai"]
cover: "/images/spec-driven-development-sdd-cover.jpg"
description: "There is a new artifact in the loop, and it sits above the code. Code used to be the only thing we wrote, the only thing we reviewed, the only thing we shipped."
permalink: "/ai/spec-driven-development-sdd/"
---

There is a new artifact in the loop, and it sits above the code.

Code used to be the only thing we wrote, the only thing we reviewed, the only thing we shipped. Process and ceremony existed because code was expensive to produce and hard to change. That cost has dropped. A description of what we want can now generate working code in seconds, and we can iterate on the description faster than we used to iterate on the code itself.

So the loop has two artifacts now. The description, and the code generated from it. Both have to be right. Neither one replaces the other.

Which forces two questions to the surface. Is what the agent produced actually a reply to what we asked? And is the input we gave it clean enough to be worth replying to?

The first question I will cover in another article. This one is about the second. The spec.

---

### Spec-driven is not vibe coding

The opposite of spec-driven is not test-driven. It is vibe coding. Describe the goal, get a block of code back, hope it is what you meant. Fast, fun, and unreliable the moment the system has more than one moving part.

Spec-driven changes the order. You write the description first. The agent generates code from it. You review the code, you test it, you ship it. Both artifacts are real, both have to be right. The spec is what you start from. The code is what runs.

What changes is the relationship between them. The spec is the source the code is generated from, and the place fixes start. The code is still the thing that runs in production, and it still earns the same review and the same tests as anything you wrote by hand. Neither one carries the system alone.

---

### The canonical workflow

Two tools have made spec-driven a real workflow rather than a philosophy.

Spec Kit, from GitHub, formalized the approach. It splits the description into four artifacts: a constitution for non-negotiable principles the agent must respect across every feature, a spec for the what, a plan for the how, and a tasks breakdown for execution. The flow runs /constitution → /specify → /plan → /tasks → /implement, with clear phase gates. Thorough, opinionated, greenfield-friendly. The cost is weight. A Spec Kit change can generate eight hundred lines of markdown before any code is written.

OpenSpec, from Fission AI, is the lighter cousin. TypeScript instead of Python, npm install instead of toolchain setup, no rigid phase gates. Its distinctive idea is the delta spec. Instead of rewriting the whole description on every change, you describe what is being added, modified, or removed, and the deltas merge into the main specs after the change ships. Specs live alongside the code in the repository, which makes it brownfield-friendly in a way Spec Kit is not. Same change, around two hundred and fifty lines.

The two tools are not competing philosophies. They are different points on the same curve. Spec Kit treats specification as a first-class engineering phase with its own ceremony. OpenSpec treats it as a lightweight layer that sits next to the code and evolves with it. Same source-of-truth idea, different appetite for process.

Both are designed for the same shape of problem: one project, one codebase, one target. The spec exists so the agent does not drift, so requirements survive past the chat session, so the team aligns before code is written. That is the canonical use case.

---

### Where we pushed it further

The methodology has a principle inside it that is bigger than the tooling. The spec is the source of truth. The code is regenerated output. Fix the spec, not the code.

Once you internalize that principle, a question follows. If the code is regenerated output, why does there have to be only one of it?

We were writing a native mobile application. Android and iOS, sharing one project. For some features iOS owned its own behavior. Fine at first, the diff stayed small. Then it grew. Each platform needed its own visual identity, its own feel. The "shared project with platform branches" model started to bend.

The standard alternatives were the usual ones. Own three codebases and pay the synchronization cost forever. Or pick a cross-platform framework (Flutter, React Native, Kotlin Multiplatform) and accept the shared runtime, the shared idioms, the not-quite-native feel.

We tried a third path. One description. Multiple targets. Same source of truth, regenerated as native code for each platform. The agent writes idiomatic code for each one because it is generating, not transpiling. The spec never runs. There is no shared runtime. The cost is a regeneration step instead of a compile step, and the discipline of keeping the description honest across all three.

This is not what Spec Kit or OpenSpec ship out of the box. Neither tool advertises multi-target generation as a feature. We took the principle they encode (intent as source, code as output) and pushed it past the canonical workflow. The tools gave us the discipline. The discipline gave us the architecture.

We applied it to Android, iOS, and eventually web. Same description, three outputs. The agent is the compiler. That arrangement was not realistic three years ago. It is now.

---

### Where we landed on the artifacts

We did not start with Spec Kit or OpenSpec. We started with one file and let it grow. As the project grew, the file split itself almost naturally. Principles drifted into their own document, the architectural how drifted into another, feature behavior stayed in the middle, change-by-change deltas appeared on their own. By the time we read the docs of both tools, we recognized most of what was already on disk. The shape is convergent because the pressures are real.

The rest of this article uses "spec" loosely. It means the full description, across whatever files it ended up in.

---

### What goes in the spec

The first instinct is to put everything in. Resist it.

A spec is not documentation. Documentation describes what exists for a human reader. A spec describes what should exist for an agent that will build it. Different audience, different rules.

What goes in:

- Behavior. What the feature does, in plain language. Not what it looks like, not how it is implemented. What it does, when, in response to what.

- Abstractions and data shapes. The objects the feature works with, the contracts between them, the invariants the agent must respect. This is the part the agent leans on hardest.

- Algorithm snippets. Small, high-density pieces of logic the agent should not reinvent. Sorting rules, eligibility checks, pricing formulas. If it has subtle correctness requirements, it belongs in the spec.

- Platform-divergent behavior. When iOS and Android genuinely diverge in what the feature does, name it once and explain why. Not a list of differences. A rule the agent can apply.

What stays out:

- UI pixels. Spacing, colors, exact paddings. That belongs in a design system the agent reads separately. Mixing them turns every spec change into a visual review.

- Prose explanation of why decisions were made. Useful for humans, noise for agents. Keep it in a sibling doc if you need it.

- Platform-idiomatic UI and gestures. Navigation patterns, gesture handling, animation curves, lifecycle quirks. These live in per-platform layers the agent reads alongside the spec. The spec owns behavior and contracts. The platform layer owns feel.

The test I use: would removing this line make the agent's output worse? If yes, keep it. If no, it does not belong.

---

### What broke first

Drift between platforms. A prompt-driven change to one platform's code does not automatically update the spec, and does not automatically propagate. You patch iOS, the spec is now a lie, Android falls behind, the next web regeneration is wrong. The rule we landed on: a change starts in the spec, the spec updates first, then the agent regenerates each platform from the new source. The regenerated code goes through the same review and tests as anything else.

That sounds obvious until you watch yourself break it. The agent will happily edit the generated code in place if you ask. Sometimes that is the right move for a one-off fix. But if the change has any chance of being relevant to the other platforms, it has to start at the spec, or the divergence is back. Discipline has to be wired into the prompt and the workflow. It is not the default.

Context window pressure. As the spec grew, the agent started going back and forth before committing to a solution. Propose, second-guess, re-read, propose again. Useful in small doses, expensive when the spec is large and most of it is irrelevant to the task at hand.

We started scoping which parts of the spec load for which task. Keep the relevant section dense, keep the rest out of the way. Code generation went back to working like before. Sometimes better, because the agent was not drowning in spec it did not need.

---

### What actually changes

You now have two artifacts to keep right instead of one. The spec, and the code generated from it.

Reviews split along that line. You review the spec for intent. Does it describe the system you want, in a way an agent can build from. You review the generated code for correctness. Does it do what the spec says, does it run, does it pass the tests. Both reviews matter. Skipping the code review because the spec is good is how regressions ship. Skipping the spec review because the code looks fine is how the next regeneration silently breaks something.

You stop owning three implementations of the same feature and start owning one description of it. You stop arguing about which platform got it right and start arguing about what right means, once, in the spec. The code still has to be read. It just gets read against the spec instead of against itself.

When something is wrong, you check both. If the spec is wrong, you fix it there and regenerate. If the spec is right and the code drifted, you regenerate. If the spec is right and the code is right but the behavior is wrong, the spec was incomplete. Fix the spec, regenerate. The fix almost always lands in the spec, but the code is what tells you it landed.

If you are running a spec-driven loop and have hit different walls than these, I want to hear about it.
