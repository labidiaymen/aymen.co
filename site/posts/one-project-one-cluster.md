---
title: "One Project, One Cluster"
seoTitle: "Re-engineering the team: roles, limits and what a Kubernetes cluster teaches about team structure"
date: 2026-09-12
categories: ["ai"]
unlisted: true
description: "Every container declares what it needs and what it may never exceed. Roles are fluent in the first and have no words for the second."
cover: "/images/one-cluster-cover.png"
permalink: "/ai/one-project-one-cluster-a37f5e02/"
---
Every project I run gets its own machine. It carries the exact runtime, the database, the credentials and the test data that project needs, and nothing is shared with any other project.

I did that for the code long before I did it for the people.

The roles did not get the same treatment. A pool of specialists, allocated by percentage, three of them at forty per cent each on something that needed one at full attention. The machines got clean isolation and a declared shape. The roles got a spreadsheet.

## The unit is the role, not the person

Kubernetes does not schedule containers. It schedules pods, and a pod is the thing that carries a replica count. You do not scale a container. You scale a pod.

That is the part worth stealing. A role is a pod. It holds a piece of work and whatever runs it, and how many of it there are is a separate decision from what it is. Some roles run at one because a second would only negotiate with the first. Some run at forty because the work divides cleanly and none of it needs a person.

So the shape is three deep. The company schedules clusters. A cluster is one project and the team that ships it. Inside are the roles, each with a count, and the count is the part that changed.

A project gets scheduled as a cluster. Not staffed. Scheduled.

<figure class="diagram">
<svg viewBox="0 0 624 300" role="img" aria-labelledby="dg16-title dg16-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg16-title">One project, scheduled as a cluster</title>
  <desc id="dg16-desc">A dashed boundary holds one project. Inside it, a solid box is the control plane, holding the spec, the checks and one human. Below it five dashed architect replicas, each running its own agents, all feed into that one box. Adding replicas does not change the size of the control plane.</desc>
  <path class="dg-box dg-zone" d="M15.246001216231846,23.526860619488573 C252.0056669244569,25.69985103798092 432.53427868063295,21.63806362153872 611.8283568699976,22.770085716792423 C607.8359525681641,130.04473643449356 610.9546432510739,189.57254791454062 610.8444686904757,258.19789581419803 C373.35426483347743,257.77505035501673 193.88598480386938,259.1169021622822 15.44470672786455,258.7769668593896 C13.763633729034865,165.47438507241867 16.22909393526106,94.31892242548938 11.805540466404306,22.93596968782878"/><text class="dg-edge" x="28" y="46" text-anchor="start">one project</text><path class="dg-box dg-human" d="M200.21967334869302,55.856824685193985 C288.2442110066508,57.89939837655956 355.45244331408867,54.65443472911345 424.29232416278325,56.72971878197497 C422.8639839178249,83.60513382056037 425.0717231766655,100.68621292285911 425.99684524740877,116.96201858583932 C334.3471626292668,115.88411331189988 269.24298796860637,116.425681496051 201.9824161073111,116.8994228369088 C201.5623119372699,94.58675499138735 201.72995414926203,73.33944358878742 198.45894904176654,55.526181127236306"/><path class="dg-box dg-box2 dg-human" d="M201.07598724527097,57.99591827597279 C289.4512130747788,56.20490875365441 357.75305023349495,56.989533998160404 421.87407684338933,57.24080977609419 C423.794117928573,86.28065891488487 422.4640174869746,98.17910552079748 421.85780735027873,117.57319674583766 C336.6023250601265,118.73021659996836 265.40867576627465,118.63338141582598 198.70493450216247,117.29501719553723 C202.14149627897027,91.42077789335546 200.7577867045802,76.33991565897125 199.76167392831374,54.40246601211953"/><text class="dg-label dg-human-text" x="312" y="84" text-anchor="middle">the control plane</text><text class="dg-sub" x="312" y="104" text-anchor="middle">spec, checks, one human</text><path class="dg-box dg-runtime" d="M55.88513126386569,169.95540957467418 C92.88930501960652,170.7394016748012 120.93619194074356,172.77561316638048 151.29178905658972,172.17388210416487 C151.05600872200728,193.1121068959181 150.6951674952615,207.85905075225003 148.0619499208694,220.26858458550115 C114.72899446670384,221.10939903329563 84.85440483170301,223.13581810162208 58.07002067680937,221.85513267622102 C55.748746872017506,202.04097571486653 57.97568187824249,185.29007473024078 59.45538020313502,168.34957962047756"/><path class="dg-box dg-box2 dg-runtime" d="M57.91006560433193,173.3433938997534 C96.49431781959457,171.2938531883498 124.06547413061627,173.5991098422553 150.90329303895277,174.28933963993998 C149.2469352729837,194.9194877637641 150.1558341991882,205.7832206731584 150.02147140615688,220.7814262395638 C115.59462814554321,221.84926071271732 85.3073356638231,221.07813034126448 55.72287521368027,223.86569150288855 C57.31250991901034,203.1616554276839 56.4560157779865,185.9287942415703 58.758252908269995,171.11863727710147"/><text class="dg-label dg-muted-label" x="104" y="202" text-anchor="middle">architect</text><path class="dg-line " d="M104,170 Q191.37967634265297,138.5744414332204 280,122"/><path class="dg-line " d="M274.2,126.0 L280,122 L273.2,120.4"/><path class="dg-box dg-runtime" d="M162.7478068843241,169.9500644685468 C198.79435935131943,172.9589513794328 225.4918409354481,169.8154745102932 253.70676875212544,173.77749405101756 C254.24805069093037,193.7137245185737 251.84717178356237,205.367923879981 252.5640088085849,219.69236855511198 C216.27725771138316,220.94605379167294 187.80949029950867,219.67426514629008 162.26511896376735,221.28640709001868 C160.64515800524742,204.08728919238192 162.611350823851,189.2154897711312 162.8131193175973,171.82153682882037"/><path class="dg-box dg-box2 dg-runtime" d="M163.9199049016088,169.65569667818755 C197.04723504215818,174.18718166564926 225.2712858205993,172.73043575432638 253.9836378108634,170.42133388557534 C254.34544062742285,193.29272842462768 252.30859756502724,205.41333403625214 252.26371583969507,224.31043496351245 C216.3964954383655,222.38892860542467 188.6696125037361,222.5602512373404 162.71409187461904,223.17256508039895 C162.139113236656,202.12645607112276 163.00854377905304,188.68344764899624 163.9284381886611,169.30350074824108"/><text class="dg-label dg-muted-label" x="208" y="202" text-anchor="middle">architect</text><path class="dg-line " d="M208,170 Q252.6954488766824,143.15209484200557 296,122"/><path class="dg-line " d="M291.5,127.4 L296,122 L289.0,122.2"/><path class="dg-box dg-runtime" d="M265.67977485753585,170.78982276971908 C305.02176399446176,171.5057010659509 328.1103107452906,169.85885975968972 357.0016392475933,171.389313221811 C360.22906503892926,193.4762710577698 358.7940414443584,207.5700759901526 358.4156539930104,221.68521881200616 C323.53809662085865,224.16584015105192 292.17269744918343,223.84670577247007 267.1680315034315,222.8434885040128 C266.69369220877707,203.33347416097925 267.13572254345553,188.37649936851884 265.1528139121611,172.81992740850893"/><path class="dg-box dg-box2 dg-runtime" d="M263.7575645447511,173.12339110538522 C302.2794672021081,173.03802662055847 332.33545627795877,169.73067951208478 357.3275904961524,171.93362140764185 C358.59200687547775,193.9970384606612 358.7161844268051,206.6097352990926 356.330608558995,223.80305972295025 C319.76129570052086,220.38379797971984 291.2183091163721,223.02965682308638 267.231751062177,220.09106884025553 C267.7141288299645,199.64575805666192 267.8845307668133,186.8484115611056 265.15891876293296,168.71201629667172"/><text class="dg-label dg-muted-label" x="312" y="202" text-anchor="middle">architect</text><path class="dg-line " d="M312,170 Q311.0426751380054,145.835633755585 312,122"/><path class="dg-line " d="M314.6,128.5 L312,122 L308.9,128.3"/><path class="dg-box dg-runtime" d="M368.2976999286086,171.29648776133382 C407.1160457623732,173.90077324113844 433.0743495946165,171.56682868095433 460.3256864551109,169.93198008552753 C463.2454516427803,192.14512519838527 461.52863515109226,206.88215675460276 463.8111682911455,224.37576942666237 C426.07276191863826,222.79103737026037 399.8072803518769,221.11760902475456 368.7864032750886,222.16857032895487 C371.7364978809545,202.8179447189057 371.22611885239655,187.7381931319545 372.05350837914904,168.73771400481357"/><path class="dg-box dg-box2 dg-runtime" d="M371.93409629069924,171.05746517249264 C405.35328197523637,172.7672355189767 436.4687622091121,172.1388580334088 462.2527404797509,170.2706146243357 C463.1298341290699,192.8360536578745 463.0243098751755,208.10060920878342 464.0810794851189,219.98280830401126 C426.7923436660284,221.890022851103 398.4137876525586,221.13969783854657 370.7385175719571,221.3422903069026 C369.58750286194845,203.81996822553685 368.52705211682576,185.5503684525147 370.82868986280107,171.4188724533277"/><text class="dg-label dg-muted-label" x="416" y="202" text-anchor="middle">architect</text><path class="dg-line " d="M416,170 Q373.6268682496747,150.25883770140766 328,122"/><path class="dg-line " d="M334.9,122.9 L328,122 L331.9,127.8"/><path class="dg-box dg-runtime" d="M474.97142830052013,170.11598548913187 C511.9906880872281,173.65097103307534 536.37042064684,173.0603507534882 568.1433227560219,171.4909576424821 C566.3565979016743,194.71607360961664 563.7098632813012,207.1251252484159 567.8638351460285,223.21821441818878 C527.0908676148816,221.94912886728957 500.31652393393057,220.72603869490607 473.3101447113371,223.6378809947697 C472.74922142082323,199.9684827329444 472.7341034894502,187.63327469966993 472.99989452427246,169.1073781971854"/><path class="dg-box dg-box2 dg-runtime" d="M473.9570830832967,172.53831863540145 C509.32324295086937,173.04874358337779 536.1811685562977,172.49613070622837 563.9474391938874,171.7867200384786 C565.4844694146349,194.1174474725581 564.5179151539309,206.90756449806855 568.0536834737536,220.60308837937336 C529.8054109110523,223.89111042222527 502.69893436594816,220.68025989582773 475.4529460448087,221.828982926453 C473.8402210246027,200.06751747153118 474.09829917070374,185.55870418593227 474.1289596092556,171.20332870627908"/><text class="dg-label dg-muted-label" x="520" y="202" text-anchor="middle">architect</text><path class="dg-line " d="M520,170 Q430.02536201478233,151.94319354088194 344,122"/><path class="dg-line " d="M351.0,121.4 L344,122 L349.1,126.8"/><text class="dg-sub" x="312" y="244" text-anchor="middle">each one runs its own agents</text><text class="dg-edge dg-edge-back" x="312" y="292" text-anchor="middle">add architects. the control plane is the same size.</text>
</svg>
  <figcaption>The architects are dashed because how many there are is a runtime answer. The box above them is not.</figcaption>
</figure>

## The roles, and what each one is not allowed to do

Kubernetes makes you declare two numbers for every container. A request, which is what it needs, and a limit, which is what it may never exceed. Teams are good at the first one and have almost nothing for the second.

The limit is the interesting half. A container with no limit will consume the node and take everything else down with it, and it will do that while behaving exactly as designed.

**The graph engineer.** Draws the boundary. What the work is, in what order, where it stops, what happens when it fails. *Limit: does not write the interior.* The moment they start editing the inside of nodes they stop maintaining the shape, and the shape is the only thing nobody else is doing.

**The spec owner.** Says what done means, before anything runs, in terms a machine could check. *Limit: cannot also be the one who decides it passed.* Writing the target and grading the shot is one person holding both ends, and it fails the way it always has.

**The check author.** Builds the thing that separates finished from finished-looking without a human in the loop. *Limit: may not accept a check that only a person can perform.* If the answer is "someone will notice", there is no check.

**The platform owner.** Environments, credentials, durability. One environment per project, up in seconds, thrown away without ceremony. *Limit: does not decide product.* A platform that starts choosing features has stopped being a platform.

**The reviewer.** Reads the diff and answers. Yes, no, or here is what you missed. *Limit: must be able to say no often enough that yes means something.* A reviewer who approves everything is not slow, they are absent.

**The architect.** Owns a slice of the work and runs the agents that do it. Splits it, points them at it, reads what comes back. This is the role you add when you need more through the cluster, and it is the only one whose count goes above one without something being wrong. *Limit: does not sign off their own slice.* The agents underneath are not a role. They are how many of this one is running.

## Scrum wrote down the first half

Naming roles is not new. Scrum has been doing it for decades, and a good part of its value was simply that the accountabilities were written down at all rather than assumed.

Read those definitions and look for the other half. Almost everything in them is what a role is accountable for. There are a few boundaries, and they are real, but they mostly protect a role from interference rather than protect the system from the role. Nothing says the person who owns the backlog may not also decide the work is finished.

That gap did not cost much when the output was bounded by how fast a person could type. A role without a limit still could not consume the whole node, because the person in it went home. It costs now, because the thing on the other side of the boundary produces as much as you let it, and an unbounded role sitting in front of an unbounded producer is how a project quietly turns into one person's opinion at scale.

The second difference is the count. Three roles, the same three, on every project. A cluster takes the roles the work needs, and the number is a property of the job rather than of the framework. Some projects need a check author and no spec owner because the spec is a paragraph. Some need two platform owners and no reviewer worth the name yet.

Keep the habit of writing roles down. Add the sentence Scrum never had to write.

## What I stopped staffing

The role that translated a specification into a task list. That was a real job when the translation was slow and needed judgment. It is now a step in a plan the agents execute, and paying attention to it is paying attention to a formatting pass.

The role whose value was throughput. Someone who could produce a lot of correct code quickly used to be the most valuable person on a project. That is now the cheapest input in the building, and organising a team around it is organising around the wrong scarcity.

Line-by-line review as a standing duty. Not review. Review matters more than it ever has. But reading every line as a person is a check that does not scale past the first agent, and the duty has to become designing the thing that reads the lines.

None of those people go away. The work they were doing does.

## What I had to add

**Someone who owns evaluation.** Not "did this run pass" but "is the system better than last month". Nobody owned that, everybody assumed somebody did, and it is the single most common empty seat in a cluster that otherwise looks healthy.

**Someone who owns the cost line.** Tokens, environments, retries, the rented queries. It moves fast enough that if it is nobody's job it becomes a surprise, and the surprise arrives as a number rather than as a decision.

**Someone who owns the environments.** This used to hide inside other roles. It cannot now. Ten agents working at once need ten trustworthy environments, and how quickly those come up sets the ceiling on everything else.

## How the cluster stays healthy

**Declare the desired state, not the daily assignment.** Say what the project has to be true of. Let the scheduling happen underneath. A standup that reallocates people every morning is a control loop running at the wrong frequency.

**Scale the architects, not the control plane.** More capacity means another architect with their own agents under them. It does not mean a second person on the boundary: two people negotiating one shape is slower than one owning it, and a second reviewer means neither of them reads properly.

**No shared state between projects.** Same rule as the machines. A person on three clusters at thirty per cent is shared mutable state, and they will be the reason all three are late.

**Every role gets a limit, written down.** Not a job description. One sentence saying what this role may never do. If you cannot write it, the role is not a role yet.

## Where it breaks

The metaphor gets dangerous exactly where it gets satisfying.

A role is a slot. A person is not. Everything above describes slots: what each one does, what it may never do. A slot can be split, doubled, merged into another, or left empty for a week and nothing strange happens. The person standing in it can do none of those things.

The failure is quiet. You draw the roles well, and then you start talking about people as though they were the roles. Two people at half a role is not one role. Someone holding three roles is not three replicas, it is one person carrying three limits in their head, and the first limit they drop is the one nobody is checking.

Roles are also the part that survives a person leaving, which is the only reason to write them down. A slot with one name in it and nothing else written has one person's worth of failure in it: holidays, a bad week, a better offer. Kubernetes answers that with more control plane nodes. Here you answer it by making the spec and the checks good enough that whoever steps into the slot can read them and carry on, which is a documentation problem wearing an availability costume.

Draw the boundary. Give every role a limit. Add architects, not managers.
