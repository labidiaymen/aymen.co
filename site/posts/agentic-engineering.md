---
title: "Agentic Engineering Is Building the Check"
seoTitle: "Agentic engineering: the work moved from writing the thing to checking it"
date: 2026-09-11
categories: ["ai"]
unlisted: true
description: "A check that a tired person performs at midnight is not a check. It is a hope with a timestamp."
permalink: "/ai/agentic-engineering-5c20b7f1/"
---
I wrote about four systems this month. A delivery pipeline, a search index, a cluster, and a backend moved from Java to TypeScript. Different problems, different stacks, nothing in common on the surface.

By the fourth one I noticed I kept writing the same paragraph.

Every one of them turned on a check. Not on the model, not on the prompt, not on the framework. On whether something at the end could tell finished from finished-looking, without me in the room.

## The word is not the point

Agentic engineering, agent-native, whatever it settles on. I am not going to argue about the name, and I am not going to define it. Name a thing once and then go after the substance.

The substance is that the expensive part of the work moved. It used to be producing the thing. Producing the thing is now cheap and getting cheaper, and what is left is deciding what should exist, bounding what may be attempted, and proving that what came back is real.

Two of those three I have written about. The third is the one nobody wants to do.

## A check a person performs is not a check

This is where it gets uncomfortable, because the obvious answer is to read the output.

I do read it. That is not a check. A check that a tired person performs at midnight is not a check, it is a hope with a timestamp. It works on the days it works, and the day it fails is the day it was needed.

An agent produces more output than a person can read with attention. That is the entire reason to use one. So any verification that scales with output volume and depends on a human staying sharp is already broken, and it breaks quietly, at exactly the moment the volume gets interesting.

<figure class="diagram">
<svg viewBox="0 0 624 268" role="img" aria-labelledby="dg10-title dg10-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg10-title">What a check has to separate</title>
  <desc id="dg10-desc">Two things arrive at the check: work that is finished, and work that is finished-looking, drawn faintly because from outside the two are indistinguishable. The check runs without a person. One edge leaves it towards done, and a second edge sends the other back to the agent.</desc>
  <path class="dg-box " d="M22.283498895114054,35.89235954484546 C97.35256920035583,33.38182792746547 151.6093105320862,33.3775708683662 210.19658489348208,33.9599096309207 C208.13066539789116,55.194216108831675 209.2580843933197,68.07287664482038 209.60691175554268,82.97982473437666 C133.50370664685207,81.83085851680062 76.00896725720212,84.1043872844914 20.13351478694636,83.9263813029632 C21.107425309860812,65.52794075195116 19.2164676673787,47.77137031609722 18.351852798812022,32.79866232997676"/><path class="dg-box dg-box2 " d="M17.64985103609499,35.484278805872556 C94.51479549450558,35.7741622467405 150.83666610728795,34.445461417569526 211.48513126554207,35.5554094332994 C212.23018284059603,57.85587482627289 209.97387943378365,71.15239734861646 208.75655307823632,85.69116854858173 C131.922188949735,83.23756842689475 79.16756878111863,84.20340328337784 20.35272350439463,83.75479946236815 C20.333813287100668,62.69436702779232 19.831834364976658,48.3198020943067 20.566658784340444,31.808412934145153"/><text class="dg-label" x="115" y="65" text-anchor="middle">finished</text><path class="dg-box dg-ghost" d="M22.306490328119366,150.30630111820358 C97.70755233955921,149.42831039513848 152.8878135691806,152.13303451749172 210.23399276856054,151.97281723226087 C209.5515586862115,172.44375228990975 209.61473007295967,186.03568344276198 210.71647567894146,202.38220443948273 C135.21851425339398,201.81065902906036 75.3013145450043,197.9921411039271 18.973217487974658,202.3750206969562 C19.828015900695704,178.57524490401858 18.691956472905332,163.96637392107695 21.176728154894302,147.20866012624867"/><path class="dg-box dg-box2 dg-ghost" d="M20.66937194013473,148.136690712225 C93.7144519329604,152.38273456915408 150.79239692696947,151.9031285782825 211.91870327196955,150.23057842377133 C209.64801693058016,171.56092357703528 212.28766994694604,185.37450790534473 210.69521713400968,200.3743980420634 C132.48949203532632,200.83161254079621 76.84122867688593,199.3231523521818 20.404786111230397,198.46575641672396 C19.866598082644213,180.52096138136505 20.891653825385333,164.08384895393803 19.58546180817553,149.16673164510482"/><text class="dg-label dg-muted-label" x="115" y="181" text-anchor="middle">finished-looking</text><path class="dg-line " d="M210,59 Q240.00128913135327,72.28812670767685 266,100"/><path class="dg-line " d="M259.1,97.1 L266,100 L263.5,92.9"/><path class="dg-line dg-ghost" d="M210,175 Q239.25117659743464,158.02879023553282 266,134"/><path class="dg-line dg-ghost" d="M262.9,140.9 L266,134 L258.9,136.3"/><path class="dg-box dg-human" d="M271.25072377494104,86.25544166781728 C324.2523487094102,86.35506034118825 367.7527034769546,84.47771415844453 412.31715965490656,82.6643749242017 C410.3053708565912,111.63693981312073 408.7656270986263,124.32027583155794 407.95914106385743,145.2876633184439 C353.6351875314653,142.36007766759028 313.179352714298,145.62068882175754 270.94446430362035,146.08481998652445 C270.70585498954443,117.72562351232656 267.7182833970144,103.3750070947106 267.85649528515364,84.60586524219525"/><path class="dg-box dg-box2 dg-human" d="M267.96270275132855,82.50816264194816 C326.6626315131144,84.56538734574121 369.8317401905692,82.99779396122219 411.6593738574811,81.99892616290549 C410.5905965342143,110.21286678389313 410.9514326111187,128.0375295659702 411.50608196440436,145.13259029552927 C352.0403577806616,143.98818583599672 312.6882843031959,144.68395385885796 271.341622926547,145.76348877147004 C270.76405334619994,120.29902954227246 271.2161224382073,104.0901855489659 268.25525207550044,84.79594130734723"/><text class="dg-label dg-human-text" x="340" y="112" text-anchor="middle">the check</text><text class="dg-sub" x="340" y="130" text-anchor="middle">runs without me</text><path class="dg-line " d="M412,114 Q438.1977725032241,115.99106946796694 468,114"/><path class="dg-line " d="M461.4,117.5 L468,114 L461.0,111.4"/><path class="dg-box " d="M469.46987705317787,86.2966066382344 C519.8464599610522,85.77666335300387 562.9263765355229,82.73669071250441 600.7144519343574,82.18273429897741 C597.6065427303345,109.66467445765839 597.641076707859,125.7158408949691 600.1056246769175,145.53914222900715 C549.5085224169812,143.35455665670082 506.98400764483216,142.07150931380295 468.098766422504,143.4709875592361 C468.6609869008237,119.2590255268193 472.2367637655869,104.00610580649511 470.68626327658365,83.10780258318772"/><path class="dg-box dg-box2 " d="M472.15246200773515,83.0797142035699 C521.522078705729,82.47418441813168 561.7005822672977,83.54642887206116 599.0274736411067,85.66330661962894 C598.5819917683406,111.72375140335586 601.5881732959245,126.10525245783164 597.7035999298578,142.7258183782575 C549.3298160570347,142.8669696813761 509.1003086101731,143.24597053604478 470.1004642498216,145.17074775862076 C467.85274391186084,122.08954367846695 471.1746679322676,100.03307018300195 467.67508769038835,83.11683681747729"/><text class="dg-label" x="535" y="120" text-anchor="middle">done</text><path class="dg-line dg-back" d="M322,146 C288,222 184,238 118,204"/><path class="dg-line dg-back" d="M128.0,204.6 L118,204 L124.2,211.8"/><text class="dg-edge dg-edge-back" x="258" y="250" text-anchor="middle">back to the agent</text>
</svg>
  <figcaption>The two arriving on the left are indistinguishable from outside. Everything rests on whether the check can separate them without me.</figcaption>
</figure>

## What makes a check real

Four properties, and I have watched all four fail.

**It runs without me.** A green suite. A policy gate. A score threshold. If the last step is a person saying yes, the person is the bottleneck and the guarantee is only as good as their afternoon.

**It fails specifically.** Not "the port is wrong" but the file, the line, the expected value. In that backend port every behavioural decision in the research had to cite the exact lines in the Java it matched, or deliberately broke from. Not a paraphrase. Line numbers. That is what turns "did we get this right" from a feeling into something with an answer.

**It is cheap enough to run every time.** A rendered diff, a dry run, a lint pass. An expensive check gets run at the end, and a check at the end is a check you will be tempted to skip when you are close.

**It cannot be satisfied by looking finished.** This is the hard one. An agent optimises for the check, so a weak check teaches it to produce work that passes rather than work that is correct. The check is not a measurement sitting outside the system. It is part of the system, and the agent will find its edges.

## The check you cannot write

Some things have no automatic check. Whether this is the right feature. Whether the tone is right. Whether a migration that passes every test is still a bad idea.

That is where a person belongs, and only there. The mistake is not putting humans in the loop. It is putting them everywhere in the loop, which spreads attention so thin that the places that needed it get the same glance as the places that did not.

Every review slot you spend on something a machine could have checked is a slot not spent on something no machine can.

## What it costs

Writing the check is slower than writing the thing. That is a real trade and on a small job it is a bad one. For something you run once and throw away, build it and look at it.

The worse cost is subtler. A check that exists but is weak is more dangerous than no check, because it licenses you to stop reading. No check at all keeps you nervous, and nervous is a kind of safety. A green tick you have not earned is the most expensive thing on this list.

## What is actually new

None of the skills. Specification, boundaries, test design, failure paths, verification. This is the oldest part of the discipline and it has been the least fashionable part of it for twenty years.

What is new is the ratio. Producing the thing used to be most of the work and checking it was the tax you paid at the end. Now producing it is the cheap half and the checking is the job.

Build the check first. If you cannot describe how you would know it worked, you are not ready to ask for it, and no agent is going to tell you that.
