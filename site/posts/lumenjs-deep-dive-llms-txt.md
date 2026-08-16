---
title: "LumenJS deep dive — llms.txt"
date: 2026-05-02
categories: ["lumen"]
series: "LumenJS deep dive"
og: "/images/lumenjs-deep-dive-llms-txt-og.png"
permalink: "/lumen/lumenjs-deep-dive-llms-txt/"
---
This article is part of the LumenJS deep dive series — a series about the architectural decisions behind LumenJS, an open-source full-stack web framework designed for agent-driven development.

-   [Loaders](/lumen/lumenjs-deep-dive-loaders/)
-   [Subscribe](/lumen/lumenjs-deep-dive-subscribe/)
-   [Socket](/lumen/lumenjs-deep-dive-socket/)

We build LumenJS to be agent-ready. Not as a feature - as a principle. One small example of that is how we handle /llms.txt.

## llms.txt

Every LumenJS project automatically serves a /llms.txt endpoint. No config. No setup. An AI tool hitting that URL gets a plain text map of your entire application pages, routes, data, features.

The idea comes from the [llmstxt.org](https://llmstxt.org) convention. We just made it automatic.

When a request hits /llms.txt, LumenJS scans every page and API route in your project, calls their loaders, expands dynamic routes by discovering all entries, and renders everything as readable plain text.

![Code sample from llmstxt](/images/lumenjs-deep-dive-llms-txt-1.png)

![Code sample from llmstxt](/images/lumenjs-deep-dive-llms-txt-2.png)

## Why it matters

An agent working on your codebase does not need to read every file to understand what the application does. It reads /llms.txt and gets the full picture in seconds - routes, data shapes, active features.

This is the same reason we built loaders the way we did. Colocation. Every unit tells the full story of what it contains. /llms.txt is that principle applied at the application level.

## Dynamic routes

For routes like /blog/:slug, LumenJS does not just list them. It calls the parent loader to discover all entries, then calls each dynamic page's loader to render the full content. The result is a real map of your data, not just your code structure.

If the database is empty or a loader fails, the route falls back to - Dynamic route. No crash, no incomplete output.

Routes that export auth = true are excluded. The expansion mechanism detects the auth flag and skips them private data stays private, even in a public endpoint.

## Override

If you need a hand-crafted version, place a file at public/llms.txt. LumenJS detects it and serves it as-is, skipping auto-generation entirely.

![Code sample from llmstxt](/images/lumenjs-deep-dive-llms-txt-3.png)

## Conclusion

/llms.txt is a small feature with a clear purpose. It makes your application readable to the tools that will work on it agents, assistants, pipelines. Zero configuration because it should not require any. The framework knows your routes, your loaders, your data. It does the work.

Agent-ready is not a mode you turn on. It is how the framework is built.
