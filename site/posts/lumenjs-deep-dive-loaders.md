---
title: "LumenJS deep dive — Loaders"
date: 2026-04-12
categories: ["lumen"]
series: "LumenJS deep dive"
og: "/images/lumenjs-deep-dive-loaders-og.png"
permalink: "/lumen/lumenjs-deep-dive-loaders/"
---
One of the best things about building a framework is that you get to fix what bothers you in others, and simplify what was never meant to be complex. Everything has tradeoffs. This is about one feature that made LumenJS work for us.

## Loaders

Grouping related logic into a single unit is one of the best architectural decisions you can make. It helps with maintenance, onboarding whether that's a human or an agent.

For the web, we have components. Angular, React, Vue, and also Web Components the native browser primitive. What we did is take Web Components, enhance them with server-side logic, and add loaders.

Each page can export a loader(). It runs on the server, on every request, and the returned properties are injected into the component. It's a layer on top not a rewrite. The component keeps working exactly as before, with either injected properties from the parent or data loaded from the server.

![Code sample from loaders](/images/lumenjs-deep-dive-loaders-1.png)

Each key in the return object becomes a reactive property on the component. No wiring. No boilerplate.

![Code sample from loaders](/images/lumenjs-deep-dive-loaders-2.png)

## When loaders grow

When everything lives in one file, it grows fast. For pages with complex server logic, this becomes unmaintainable. Two options:

Split logic into service functions inside the same file. Or move the loader out entirely place a \_loader.ts file in the page folder and LumenJS picks it up automatically. No import, no wrapper.

![Code sample from loaders](/images/lumenjs-deep-dive-loaders-3.png)

The page file stays clean. The loader lives where it belongs.

## The same idea, at component scale

Page loaders solve the data-fetching problem at the route level. But the same pattern works for any component in your project.

A sidebar needs user preferences. A dashboard widget needs its own slice of data. Each of these can export a loader() same syntax, same server-side guarantees, automatically stripped from the client bundle. No mixin, no wiring.

Where it gets interesting is with lazy components. A heavy comments section think Disqus-style, loaded only when the user scrolls down can own its backend logic too. The loader runs when the component enters the viewport, not on page load. The database query, the auth check, the pagination all of it stays collocated inside the component and executes only when needed. You save execution time and keep the first paint fast.

![Code sample from loaders](/images/lumenjs-deep-dive-loaders-4.png)

![Code sample from loaders](/images/lumenjs-deep-dive-loaders-5.png)

## Conclusion

The boundary between "page data" and "component data" disappears. Every unit owns its server logic collocated, self-contained, deferred until needed.

Co-location at every scale: page, component, viewport. The tradeoff is real though you give up the familiar separation of frontend and backend files. And loaders can be misused. A component with a loader rendered inside a map triggers one server call per instance. N+1.

The rule is simple: loaders are for components that own their data independently. If the data belongs to the list, load it in the page loader and pass it down.

When used in the right place, the tradeoff is worth it.

Loader examples : [https://github.com/Nuralyio/lumenjs/tree/main/examples/loaders](https://github.com/Nuralyio/lumenjs/tree/main/examples/loaders)

Documentation: [https://lumenjs.dev](https://lumenjs.dev)
