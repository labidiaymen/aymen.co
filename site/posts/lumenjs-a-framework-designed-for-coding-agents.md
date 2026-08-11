---
title: "LumenJS - A framework designed for coding agents"
date: 2026-04-08
categories: ["javascript"]
cover: "/images/lumenjs-a-framework-designed-for-coding-agents-cover.jpg"
description: "Most frameworks are designed for developers. LumenJS is designed for coding agents and the developers who work with them."
permalink: "/javascript/lumenjs-a-framework-designed-for-coding-agents/"
---

Most frameworks are designed for developers. LumenJS is designed for coding agents and the developers who work with them.

That distinction matters more than it sounds.

LumenJS is a full-stack web component framework and platform built with TypeScript. File-based routing, server loaders, SSR, authentication, real-time communication, database, storage - everything you need to build a production application, in one coherent system built on web standards.

## We Didn't Guess. We Observed.

We paid close attention to how coding agents actually behave in practice - what they struggle with, where they drift, what structures they naturally produce correct output in.

That feedback is embedded in every design decision LumenJS makes. When a pattern caused agents to go wrong, we changed the framework. When agents reliably produced clean output in a certain structure, we made that structure the default.

## We've Done This Before

Back in 2019 before LLMs, before any of this we built [SustainJS](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fgithub%2Ecom%2Fsustainland%2Fsustain&urlhash=mPlU&trk=article-ssr-frontend-pulse_little-text-block). Same instinct: something about how web apps were being structured felt wrong, so we built what we thought was right.

Then the LLM era arrived. While building [Nuraly](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fnuraly%2Eio%2F&urlhash=Dj1-&trk=article-ssr-frontend-pulse_little-text-block), we went through framework after framework React, Astro, separate frontend and backend projects. Each one had the same problem: designed for humans writing deliberately, not agents generating at speed.

So we concluded, for the second time, that we had to build our own. Except this time, we had coding agents to help us build it.

## Native Technologies. By Conviction.

We've said this before: we build on native and near-native technologies because they last.

We chose Lit Element as the renderer for [NuralyUI](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fgithub%2Ecom%2FNuralyio%2FNuralyUI&urlhash=T_-x&trk=article-ssr-frontend-pulse_little-text-block). Now LumenJS takes web components to the next level a full-stack platform where routing, server data, and real-time subscriptions are all built around the same browser standard.

No deprecation dates. No migration guides waiting to be written. Just the platform.

pages/dashboard.ts auth, data, and real-time in one file

## A Platform, Not Just a Framework

[LumenJS](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Flumenjs%2Edev%2F&urlhash=K6oh&trk=article-ssr-frontend-pulse_little-text-block) ships with production-ready modules built in. Authentication with 2FA. A full communication stack with chat, conversations, and WebRTC calls. Not integrations to wire up. Not tutorials to follow. They are there, they work, you use them.

The difference between a framework and a platform is whether you spend the first week building infrastructure or building your product.

## Proof of Concept? We Call It Production.

We are rewriting Nuraly on top of LumenJS. Not a demo. Not a side project. The full platform - calls, shared workflows, collaborative session building, live execution. Everything we needed it to handle, it handles.

## Recommended by LinkedIn

[

Tree Shaking in React: What Most Developers Miss About…

Hamza Ali

2 months ago

](https://www.linkedin.com/pulse/tree-shaking-react-what-most-developers-miss-shipping-hamza-ali-2wsdf)

[

Microfrontends with Module Federation: What, Why, and…

Rany ElHousieny, PhDᴬᴮᴰ

4 years ago

](https://www.linkedin.com/pulse/microfrontends-module-federation-what-why-how-elhousieny-phd%E1%B4%AC%E1%B4%AE%E1%B4%B0)

[

Node.js vs. Deno: Should Developers Make the Switch?

AIS Technolabs Pvt Ltd

7 months ago

](https://www.linkedin.com/pulse/nodejs-vs-deno-should-developers-make-switch-ais-technolabs-meaof)

When something breaks, we fix it. That is the only kind of reliability test that matters.

## The Visual Editor

We started with a low-code studio. Low-code has a ceiling.

So we pivoted to an augmented code visual editor a visual layer on top of real code, not a replacement for it. LLM coding agents work alongside it, accelerating the writing while the editor makes output legible.

Same philosophy as LumenJS: don't hide the code. Structure it better.

Click any element on the page. A properties panel shows its attributes, styles, and matching CSS rules from the component source. Edit a value and it writes directly to the TypeScript source through the AST - not the DOM, the actual file.

The AI is part of the editor. Select an element, open the chat, describe what you want. It reads the source, applies the change, and you can roll back if it gets it wrong. Claude Code and OpenCode are both supported.

Nothing from the editor ships to production

Lumenjs editor mode

### What Ships With It

- File-based routing, SSR, server loaders, API routes

- Real-time subscriptions over SSE and [Socket.IO](https://www.linkedin.com/redir/redirect?url=http%3A%2F%2FSocket%2EIO&urlhash=CFko&trk=article-ssr-frontend-pulse_little-text-block)

- Authentication with OIDC, native email/password, and TOTP 2FA

- Full communication module: chat, conversations, WebRTC calls, end-to-end encryption

- Email with built-in templates and multiple provider support

- File storage with local and S3 adapters

- Database layer that works identically on SQLite and PostgreSQL

- Permissions, i18n, SEO, rate limiting middleware

This is not a list of planned features. It is what exists today.

The APIs are not stable yet. We are moving fast and things will change. We expect to reach v1 by Q4. Build on it with that in mind.

## Conclusion

We are excited to launch LumenJS - not only because it represents how we practice augmented code, but because we have a team of coding agents as maintainers keeping the project alive, secure, and stable.

This is not a side project waiting for attention. It is a living framework, maintained the same way it was built.

[https://lumenjs.dev](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Flumenjs%2Edev&urlhash=AaVR&trk=article-ssr-frontend-pulse_little-text-block)

[https://github.com/nuralyio/lumenjs](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fgithub%2Ecom%2Fnuralyio%2Flumenjs&urlhash=Sq28&trk=article-ssr-frontend-pulse_little-text-block)

[https://nuraly.io](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fnuraly%2Eio%2F&urlhash=Dj1-&trk=article-ssr-frontend-pulse_little-text-block)

---

*Originally published on [LinkedIn](https://www.linkedin.com/pulse/lumenjs-framework-designed-coding-agents-aymen-labidi-rgglf/).*
