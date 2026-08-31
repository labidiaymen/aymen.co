---
title: "The Search Engine We Never Planned to Build"
date: 2026-08-31
categories: ["ai"]
unlisted: true
description: "Constraints did the product design for us."
permalink: "/ai/search-engine-3f68b2df/"
---
Nobody wakes up and decides to compete with search APIs. We did not either. This article is the story of how Joule ended up with its own search engine anyway, why cost forced the decision, how the 80/20 indexing strategy works, and how an internal fix became a product we now offer over an API.

## The starting point

Joule's agents need web context. This is not optional. An agent answering a real question, drafting a real document, or executing a real workflow has to know what is on the web right now, not what a model memorized during training. Without retrieval, an agent is a very articulate liability.

The obvious solution was a search engine API. Clean integration, someone else's infrastructure, someone else's crawling problem, pay per query. Industry standard. So that is exactly what we did, and for a while it was the right call. When you are validating a product, buying beats building on almost every axis. You want your engineering hours on the parts that differentiate you, not on rebuilding commodity infrastructure.

## Where it broke

It worked. Then usage grew, and the flaw in the model showed itself.

The problem with pay-per-query is that your costs scale linearly with your success. Every new user added queries. Every new agent added queries. And agents are hungrier than humans: a single workflow with a retry loop can fire dozens of searches for one task. Humans search a few times and stop. Agents search as many times as the workflow graph tells them to.

There is a second problem that shows up later: dependency. Your latency is their latency. Your uptime includes their downtime. Your roadmap quietly inherits their pricing decisions. For a feature, that is acceptable. For infrastructure sitting under every agent on the platform, it is a strategic weakness.

We looked at the numbers, projected the growth curve, and made the call: build our own indexing strategy.

## The 80/20 indexing strategy

We did not try to index the whole web. That is the trap that kills these projects. Indexing the web is a billion-dollar problem, and pretending otherwise is how side quests become graveyards.

Instead we built around a simple observation: a relatively small index can answer a very large share of real queries. Query distributions are heavily skewed. The pages that answer today's questions look a lot like the pages that answered yesterday's.

The architecture that came out of it:

1. We build and maintain our own index, currently at [1 million? pages] and growing.
2. Around 80% of requests are served directly from our index. Fast, and at a marginal cost close to zero.
3. The remaining [20%] fall back to a search engine API when there is no match.

The fallback is not a failure mode. It is the growth mechanism. Every query that misses our index tells us exactly what is missing, and the index expands along the paths where real demand exists. We do not sit in a room guessing what to crawl. Usage decides, and the 80% number holds while the index compounds underneath it.

There is also a storage discipline behind this. We keep the index lean, which keeps the cost per indexed page low enough that growing the index is always cheaper than renting the queries.

## From cost fix to product

The index kept improving as the agents evolved. Better coverage, better freshness, better relevance on the query patterns that actually occur.

At some point we looked at what we had built and realized it had crossed a line. It was no longer an internal cost optimization. It was a capability: a search and retrieval layer designed for agents, tuned by agent usage, with an economic structure that improves with scale instead of degrading.

So now we are offering it over an API, for anyone.

The pattern here is worth naming, because it repeats across the industry. We set out to remove a line item from our infrastructure bill. We ended up with a search product. Constraints did the product design for us. Some of the best components in any platform are the ones nobody planned, born from a bill that grew too fast.

## The lesson for builders

Buy first. Prove the product. But watch the cost curve of every external dependency sitting under your core loop, and know in advance which line, once crossed, means you build.

For us that line was the point where our own 80% index cost less than the queries it replaced. We crossed it, we built, and the accident became an asset.
