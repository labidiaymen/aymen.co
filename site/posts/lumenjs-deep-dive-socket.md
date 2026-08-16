---
title: "LumenJS deep dive \u2014 Socket"
date: 2026-04-26
categories: ["lumen"]
series: "LumenJS deep dive"
cover: "/images/lumenjs-deep-dive-socket-cover.png"
permalink: "/lumen/lumenjs-deep-dive-socket/"
---
This article is part of the LumenJS deep dive series a series about the architectural decisions behind LumenJS, an open-source full-stack web framework designed for agent-driven development.

-   [Loaders](https://www.linkedin.com/posts/labidi-aymen_lumenjs-opensource-fullstack-activity-7449086801660727296-Z1mk?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAwYWYkBJCNcptQuOElbelqXoOJ3m3fc5-k&trk=article-ssr-frontend-pulse_little-text-block)
-   [Subscribe](https://www.linkedin.com/posts/labidi-aymen_lumenjs-activity-7451555202505170944-vZ80?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAwYWYkBJCNcptQuOElbelqXoOJ3m3fc5-k&trk=article-ssr-frontend-pulse_little-text-block)

subscribe() solved one direction. Server pushes, client listens. But some features need both sides talking. Chat, collaborative editing, presence, games. For that we added socket().

## Socket

Same pattern, different primitive. Each page can export a socket() function. It runs on the server, sets up event listeners, and gives you a two-way channel — the client can send, the server can respond or broadcast.

![Code sample from socket](/images/lumenjs-deep-dive-socket-1.png)

The server listens with on(). It pushes back with push(). It broadcasts to a room with room.broadcast(). The cleanup function runs when the client disconnects.

On the component side, the framework injects an emit() method automatically, no wiring, no import.

![Code sample from socket](/images/lumenjs-deep-dive-socket-2.png)

That's the full loop. Client emits, server receives, server broadcasts, components update.

![Code sample from socket](/images/lumenjs-deep-dive-socket-3.png)

## Rooms

Rooms are first-class. Join on connect, leave on disconnect, broadcast to everyone or everyone except the sender.

![Code sample from socket](/images/lumenjs-deep-dive-socket-4.png)

broadcast() excludes the sender. broadcastAll() includes everyone. Pick what fits.

## When to use subscribe vs socket

The decision is simple. If the data only flows one way, server to client, use subscribe(). It uses native SSE, zero dependencies. If the client needs to send events too, use socket(). It uses [Socket.IO](https://socket.io), installed separately with lumenjs add socketio.

No overhead either way. [Socket.IO](https://socket.io) client is only loaded on pages that export a socket() function.

## When socket grows

Same rule as loaders and subscribe. Move the handler out to \_socket.ts in the page folder. LumenJS picks it up automatically.

![Code sample from socket](/images/lumenjs-deep-dive-socket-5.png)

## Conclusion

Three primitives. loader() for initial data. subscribe() for server push. socket() for bidirectional communication. Each one follows the same convention, a named export, collocated with the component, stripped from the client bundle.

The tradeoff here is infrastructure. [Socket.IO](https://socket.io) needs a stateful server with sticky sessions. Traditional serverless functions don't fit. Plan for it before you reach for it.
