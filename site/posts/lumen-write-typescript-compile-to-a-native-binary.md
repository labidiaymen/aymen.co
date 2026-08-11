---
title: "Lumen - Write TypeScript, Compile to a native binary"
date: 2026-07-08
categories: ["lumen"]
cover: "/images/lumen-write-typescript-compile-to-a-native-binary-cover.jpg"
description: "Recently I've been designing a programming language. Here's why."
permalink: "/lumen/lumen-write-typescript-compile-to-a-native-binary/"
---

Recently I've been designing a programming language. Here's why.

I love how Zig and Rust are fast and flexible. The control, the performance, the fact that what you ship is a real native binary. No runtime hiding behind it, no engine deciding things for you at 2am in production.

But every time I sat down to actually build something, I felt the tax.

More ceremony. More time fighting the compiler over things that had nothing to do with the problem I was solving. And a smaller pool of people who could read my code back to me.

Then I looked at the other side.

TypeScript's syntax is something most of the industry already speaks fluently. Interfaces, generics, async/await, arrow functions. Expressive without being exotic. Nobody needs a course to read it.

And that's when it clicked: the syntax was never the hard part of Rust or Zig. The runtime was.

TypeScript's problem was never how it looked. It was everything underneath it: a JS engine, a garbage collector, dynamic prototypes, and an npm install that pulls in a universe of transitive dependencies you never asked for.

So I started asking a different question.

This isn't the first time I've written a lexer, an AST, a type checker, a compiler. I've built that pipeline before. I know what it costs and I know what it takes. So this wasn't a leap into the unknown. It was pointing something I already knew how to build at a problem I'd actually felt.

What if you kept the syntax everyone already knows, and swapped out everything underneath it for something with Zig's discipline?

That's Lumen.

### What it actually is

Lumen type-checks familiar TypeScript syntax, emits Zig, and compiles that straight to a small, dependency-free native binary. No VM. No garbage collector. No runtime.

You write this:

And you get a native executable. Not a bundle. Not a container with Node inside it. A binary.

Zig is the backend. Your TypeScript is type-checked, emitted as Zig, and compiled to a native binary from there.

The syntax you already know is all there: records and interfaces, generics, classes with extends and #private fields, template literals, try/catch/finally, async/await, map/filter/reduce. But it's a deliberate, static subset. No prototypes. No eval. No dynamic shapes that make the compiler guess.

### The decisions that make it different

Generics are monomorphized. Write once over a type parameter, and each instantiation compiles to specialized code. No boxing, no runtime type juggling.

Closures compile. Capture your locals, and they get lowered to a heap environment, with no garbage collector waiting behind them.

Concurrency is real. Worker.run(fn) spawns an actual detached OS thread and hands you back a Promise<T>. Genuine CPU parallelism, not a simulated one, because there's no per-thread interpreter overhead to pay in the first place.

It talks to C directly. Write a declare function, link a C library, and call it. No bindings generator, no FFI ceremony. Strings and scalars marshal across the boundary for you.

And because there's no interpreter in the middle, some of this ends up faster than the runtime it borrows its syntax from. Anchored regex patterns compile to specialized native matchers at build time, around 3× faster than V8 on checks like semver and identifiers. A typed EventEmitter runs about 3.5× faster than Node's on a tight emit loop.

The standard library lives in the open, in std-contrib. Take the markdown package. Rendering a typical 3 KB document in a tight loop, it does about 6,775 renders/sec, against 2,020 for markdown-it and 1,064 for marked. That's roughly 3.4× faster than markdown-it and 6.4× faster than marked on the same document. Same reason every time: it compiles the parser instead of interpreting one.

Standard library: [github.com/lumen-lang-org/std-contrib](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fgithub%2Ecom%2Flumen-lang-org%2Fstd-contrib&urlhash=UtLG&trk=article-ssr-frontend-pulse_little-text-block)

### A package is just a URL

There's no package manager. No install step. No node_modules.

A simple module is just an import over HTTPS:

Lumen import with url

The .ts is fetched over HTTPS and inlined at compile time. A remote module can pull in its own siblings by relative path, fetched recursively, each URL fetched once per build. Only https:// is allowed, and remote code runs at build time. So you import from sources you trust, and you know exactly what went into your binary.

And it's not just source modules. You can pull in a C library the same way. The quickjs package embeds a full QuickJS sandbox through Lumen's FFI:

A C engine, embedded and running, imported from a URL. No build script, no bindings step, no package manager. That's the whole point.

### What I'm deliberately not doing

I'm building out the standard library piece by piece: crypto, filesystem, networking, worker threads, all backed by real OS primitives, not polyfills.

But I'm being deliberate about what not to bring over from Node.js. I'm not chasing 100% API parity for its own sake.

Parity was never the goal. Discipline was.

std - lumen

### The same source, native or in the browser

Lumen compiles to a native binary, or to WebAssembly, from the same source. The standard library is honest about the line between them: every function is marked for its target, so you know up front what runs everywhere and what's native-only. Pure computation, crypto, string and URL work, the event emitter, runs identically on both. The things that can't cross, raw syscalls, threads, direct filesystem access, are labeled, not silently broken.

This is also why the playground works the way it does. When you compile to WASM, a C dependency like the QuickJS engine gets linked straight into the compiled module. The whole program becomes one self-contained wasm file. So the QuickJS example above, a full JavaScript sandbox embedded through the FFI, runs in your browser with nothing installed. You're not looking at a simulation of the language. You're running the real compiler output.

The full standard library surface is at [lumen-lang.org/stdlib](https://www.linkedin.com/redir/redirect?url=http%3A%2F%2Flumen-lang%2Eorg%2Fstdlib&urlhash=VKEn&trk=article-ssr-frontend-pulse_little-text-block).

### The bet

The core bet is simple: remove the runtime tax without asking anyone to learn a new mental model.

You already know the syntax. You shouldn't have to trade it away to ship a real binary.

There's a playground. Write Lumen and watch it compile in the browser, no install:

[https://lumen-lang.org/play](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Flumen-lang%2Eorg%2Fplay&urlhash=gyUu&trk=article-ssr-frontend-pulse_little-text-block)

It's still early, and it's open. If that's a problem you've felt too, come look at the rest:

I'd love to hear what you think.
