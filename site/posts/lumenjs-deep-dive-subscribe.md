---
title: "LumenJS deep dive \u2014 Subscribe"
date: 2026-04-19
categories: ["lumen"]
series: "LumenJS deep dive"
cover: "/images/lumenjs-deep-dive-subscribe-cover.png"
permalink: "/lumen/lumenjs-deep-dive-subscribe/"
---
One of the decisions you make early when building a framework is how to handle real-time data. Most solutions reach for WebSockets, third-party libraries, or client-side polling. We went a different direction.

## Subscribe

The same colocation principle behind loaders applies here. Each page can export a subscribe() function. It runs on the server, stays alive for the entire duration the user is on the page, and pushes data to the client over SSE, Server-Sent Events, native to the browser, zero dependencies.

![Code sample from subscribe](/images/lumenjs-deep-dive-subscribe-1.png)

The function starts when the user lands on the page. Every call to push() delivers data to the client. Each key in the pushed object becomes a reactive property on the component - same pattern as loader(). The function ends when the user navigates away.

![Code sample from subscribe](/images/lumenjs-deep-dive-subscribe-2.png)

## Cleanup

subscribe() is not a one-shot handler. It is a persistent process. Which means you are responsible for what you start. Always return a cleanup function — it runs when the client disconnects.

![Code sample from subscribe](/images/lumenjs-deep-dive-subscribe-3.png)

No cleanup means leaked connections and dangling intervals. The framework gives you the hook - use it.

## Loader and subscribe together

They are designed to work on the same page. loader() handles the initial data. subscribe() handles what changes after. The component declares the properties once and receives data from both sources.

![Code sample from subscribe](/images/lumenjs-deep-dive-subscribe-4.png)

![Code sample from subscribe](/images/lumenjs-deep-dive-subscribe-5.png)

Page loads with real data. Updates arrive as they happen. No client-side fetching logic, no state management, no polling.

## When subscribe grows

Same rule as loaders. When the handler gets complex, move it out. Place a \_subscribe.ts file in the page folder and LumenJS picks it up automatically.

![Code sample from subscribe](/images/lumenjs-deep-dive-subscribe-6.png)

The page stays focused on rendering. The server logic lives where it belongs.

## Conclusion

Subscribe extends the loader idea into the time dimension. Loaders answer the question: what does this page need to render? Subscribe answers: what does this page need to stay current?

Both follow the same principle server logic collocated with the component that needs it, stripped from the client bundle, with no wiring required.

The tradeoff is the same too. A subscribe handler is a persistent server process. Every active user keeps it alive. For pages with heavy watchers or expensive streams, that cost adds up. Design for it.
