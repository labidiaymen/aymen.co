---
title: "The Search Engine We Never Planned to Build"
date: 2026-08-31
categories: ["ai"]
unlisted: true
description: "Constraints did the product design for us."
cover: "/images/search-engine-cover.png"
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

<figure class="diagram">
<svg viewBox="0 0 624 320" role="img" aria-labelledby="dg6-title dg6-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg6-title">The 80/20 index and its fallback</title>
  <desc id="dg6-desc">A query reaches our index. Around 80% are answered straight from it, at a marginal cost near zero. The rest fall through to a rented API, and that miss loops back into the index, because every miss says what to crawl next.</desc>
  <path class="dg-box " d="M21.056789244830977,112.64672622822539 C64.22248306359282,113.09247818155795 99.98444595522453,112.42143325937047 129.81554946909452,111.48671660511135 C130.96554050509144,133.23173542075406 134.3270595095712,144.60500679016346 130.0713536585082,160.10814771675885 C87.89423222685896,161.51916732877453 53.62246933096203,160.41676254310494 19.841597891897706,162.1171319973269 C19.43411426629597,142.98713474431406 22.27925739506225,125.72570495657888 18.778430319381147,112.50178852286273"/><path class="dg-box dg-box2 " d="M19.583159829109515,114.07489795893193 C64.00130710676375,111.41779499138603 98.7450525296596,114.19463978027676 131.65785312748415,110.69224872639973 C129.95269732491704,134.83546667226378 133.6268806476271,146.18275222852023 130.81650466975594,161.26427078324568 C85.86452713062266,162.8112191692047 53.80350742461323,162.19356708647385 20.721398355030175,161.28977222521314 C19.831977273073036,143.38271808800414 21.306044961747734,124.63968982698381 21.92768357597649,110.70236072661466"/><text class="dg-label" x="76" y="143" text-anchor="middle">a query</text><path class="dg-line " d="M132,137 Q160.53261602112678,138.9724720737303 186,137"/><path class="dg-line " d="M179.4,140.6 L186,137 L178.9,134.5"/><path class="dg-box dg-human" d="M187.34393863852318,101.23103809525773 C251.02683200995756,97.68125934604615 296.3189173999796,97.60387897491636 345.95320695375705,98.90173854888498 C347.0298612610576,134.949533655145 345.1121839530357,152.44223842762517 345.8459104548422,173.86920833693316 C281.9207868586857,174.16276760220657 235.11015300914187,172.46695919077237 183.76469264038127,175.71541700554798 C185.03970909185693,146.08945121955568 187.56212425416433,122.81864128253359 184.51102867168888,96.27266058929854"/><path class="dg-box dg-box2 dg-human" d="M185.61292734239854,101.17976198363107 C249.7688396463957,102.24358787752855 297.96380119433803,100.88658409271696 347.39882621942036,98.68399925282411 C344.90301642478585,131.46702556636512 348.0973182222328,152.5391830458954 344.3780105594443,175.51802230063734 C280.5899705891451,174.71453662063672 233.5829807290728,171.65410652163163 187.04666188519758,174.9048831955087 C185.48991279690057,144.9292331709197 187.96437263692002,121.2594181067587 187.6873432178457,97.63977394175706"/><text class="dg-label dg-human-text" x="266" y="130" text-anchor="middle">our index</text><text class="dg-sub" x="266" y="150" text-anchor="middle">ours to read</text><path class="dg-line " d="M346,122 Q391.0327518002748,87.08913970067591 434,74"/><path class="dg-line " d="M428.3,78.9 L434,74 L426.6,73.1"/><text class="dg-edge dg-edge-back" x="392" y="82" text-anchor="middle">80%</text><path class="dg-box " d="M433.9014728547546,48.62052970073211 C502.3810506835492,48.3795713437626 548.9788702013803,49.402055312973474 600.6457603468773,46.63048324632947 C599.5121545323693,70.78280582552907 599.2675615318434,80.90788669600519 599.4162204274052,99.78878135876208 C534.0133281717139,95.63971214296282 484.3507214851448,96.00948905963892 434.1618741514915,99.25361185243987 C434.2026550295775,76.70505080274542 437.1612339990033,61.28249244721722 435.75088400940916,48.004514123827455"/><path class="dg-box dg-box2 " d="M437.155055047737,47.36518764578047 C503.69737529964067,48.92887630617659 552.0745954530661,46.17790432003229 600.6100554957102,47.06543655463747 C597.8697212220494,71.59300017519529 600.720762063526,83.31494770176474 601.6800104160235,97.74411182503407 C533.6081186302043,99.77275104717015 485.99776249080793,98.05252552146675 436.42989902628113,97.85775165662996 C433.75501651771134,79.64165225217195 436.3835063947288,62.70788841345715 437.9256847401735,44.92251548805391"/><text class="dg-label" x="518" y="79" text-anchor="middle">answered</text><text class="dg-sub" x="518" y="118" text-anchor="middle">marginal cost near zero</text><path class="dg-line " d="M346,154 Q391.5557016451171,190.9742633115846 434,208"/><path class="dg-line " d="M426.5,208.3 L434,208 L428.8,202.6"/><text class="dg-edge" x="392" y="220" text-anchor="middle">the rest</text><path class="dg-box dg-runtime" d="M436.6781316771536,186.27468090275056 C500.09346771281844,186.35128951293942 552.0957847612424,181.9706443788347 599.9272180091251,184.71222477104152 C599.9117265712059,206.10937595461002 598.616049385544,217.09853167557088 599.0517233855331,231.9129252435234 C534.2126389036945,235.57002639955377 482.9200141907297,234.22493375065966 436.81913376004394,232.2484977725188 C435.5898004064289,211.97901859301098 433.7313159466401,196.76153705723655 435.60999300573485,183.23895988610525"/><path class="dg-box dg-box2 dg-runtime" d="M438.14763145658543,183.44673881616757 C500.225222397328,183.64008917903533 548.7767057420577,185.8462073822721 599.1868515022038,182.61762237596216 C597.8044602871893,206.30546159846963 599.8400193224847,221.30544405202636 601.087716294959,235.53004875366113 C536.038817979786,232.39856987036697 482.93730750090316,233.62897194122382 434.17514114406663,232.60877165841347 C437.6648541469429,212.5641979222019 433.851702642558,197.34022989307542 433.8330839635027,181.47051067416115"/><text class="dg-label dg-muted-label" x="518" y="215" text-anchor="middle">a rented API</text><path class="dg-line dg-back" d="M436,234 C360,286 300,282 266,186"/><path class="dg-line dg-back dg-head" d="M258,198 L266,186 L276,196"/><text class="dg-edge dg-edge-back" x="300" y="300" text-anchor="start">every miss says what to crawl next</text>
</svg>
  <figcaption>The fallback is the growth mechanism, not the failure path. Usage decides what gets crawled next.</figcaption>
</figure>

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
