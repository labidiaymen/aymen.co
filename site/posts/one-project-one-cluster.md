---
title: "One Project, One Cluster"
seoTitle: "Re-engineering the team: roles, limits and what a Kubernetes cluster teaches about team structure"
date: 2026-09-12
categories: ["ai"]
unlisted: true
description: "Every container declares what it needs and what it may never exceed. Roles are fluent in the first and have no words for the second."
permalink: "/ai/one-project-one-cluster-a37f5e02/"
---
Every project I run gets its own machine. It carries the exact runtime, the database, the credentials and the test data that project needs, and nothing is shared with any other project.

I did that for the code long before I did it for the people.

The roles did not get the same treatment. A pool of specialists, allocated by percentage, three of them at forty per cent each on something that needed one at full attention. The machines got clean isolation and a declared shape. The roles got a spreadsheet.

## The unit is the role, not the person

Kubernetes does not schedule containers. It schedules pods, and a pod is the set of things that have to live and die together. Put two things in one pod because they cannot function apart, not because they happen to be related.

That is the part worth stealing. The unit of a team is not a person and it is not a discipline. It is the smallest set of roles that has to ship together, and the test is the same one: if one of them stops, does the rest of it become pointless? If yes, they are one pod. If no, you have put two things in a box for administrative convenience.

A project gets scheduled as a cluster. Not staffed. Scheduled.

<figure class="diagram">
<svg viewBox="0 0 624 300" role="img" aria-labelledby="dg16-title dg16-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg16-title">One project, scheduled as a cluster</title>
  <desc id="dg16-desc">A dashed boundary holds one project. Inside it, a solid box is the control plane, holding the spec, the checks and one human. Below it six dashed agent replicas all feed into that one box. Adding replicas does not change the size of the control plane.</desc>
  <path class="dg-box dg-zone" d="M15.246001216231846,23.526860619488573 C252.0056669244569,25.69985103798092 432.53427868063295,21.63806362153872 611.8283568699976,22.770085716792423 C607.8359525681641,130.04473643449356 610.9546432510739,189.57254791454062 610.8444686904757,258.19789581419803 C373.35426483347743,257.77505035501673 193.88598480386938,259.1169021622822 15.44470672786455,258.7769668593896 C13.763633729034865,165.47438507241867 16.22909393526106,94.31892242548938 11.805540466404306,22.93596968782878"/><text class="dg-edge" x="28" y="46" text-anchor="start">one project</text><path class="dg-box dg-human" d="M200.21967334869302,55.856824685193985 C288.2442110066508,57.89939837655956 355.45244331408867,54.65443472911345 424.29232416278325,56.72971878197497 C422.8639839178249,83.60513382056037 425.0717231766655,100.68621292285911 425.99684524740877,116.96201858583932 C334.3471626292668,115.88411331189988 269.24298796860637,116.425681496051 201.9824161073111,116.8994228369088 C201.5623119372699,94.58675499138735 201.72995414926203,73.33944358878742 198.45894904176654,55.526181127236306"/><path class="dg-box dg-box2 dg-human" d="M201.07598724527097,57.99591827597279 C289.4512130747788,56.20490875365441 357.75305023349495,56.989533998160404 421.87407684338933,57.24080977609419 C423.794117928573,86.28065891488487 422.4640174869746,98.17910552079748 421.85780735027873,117.57319674583766 C336.6023250601265,118.73021659996836 265.40867576627465,118.63338141582598 198.70493450216247,117.29501719553723 C202.14149627897027,91.42077789335546 200.7577867045802,76.33991565897125 199.76167392831374,54.40246601211953"/><text class="dg-label dg-human-text" x="312" y="84" text-anchor="middle">the control plane</text><text class="dg-sub" x="312" y="104" text-anchor="middle">spec, checks, one human</text><path class="dg-box dg-runtime" d="M56.88513126386569,169.95540957467418 C87.48930501960652,170.7394016748012 110.73619194074355,172.77561316638048 136.29178905658972,172.17388210416487 C136.05600872200728,193.1121068959181 135.6951674952615,207.85905075225003 133.0619499208694,220.26858458550115 C106.12899446670384,221.10939903329563 81.05440483170301,223.13581810162208 59.07002067680937,221.85513267622102 C56.748746872017506,202.04097571486653 58.97568187824249,185.29007473024078 60.45538020313502,168.34957962047756"/><path class="dg-box dg-box2 dg-runtime" d="M58.91006560433193,173.3433938997534 C91.09431781959456,171.2938531883498 113.86547413061626,173.5991098422553 135.90329303895277,174.28933963993998 C134.2469352729837,194.9194877637641 135.1558341991882,205.7832206731584 135.02147140615688,220.7814262395638 C106.99462814554322,221.84926071271732 81.5073356638231,221.07813034126448 56.72287521368027,223.86569150288855 C58.31250991901034,203.1616554276839 57.4560157779865,185.9287942415703 59.758252908269995,171.11863727710147"/><text class="dg-label dg-muted-label" x="97" y="202" text-anchor="middle">agent</text><path class="dg-line " d="M97,170 Q186.37967634265297,137.0744414332204 277,122"/><path class="dg-line " d="M271.2,125.9 L277,122 L270.2,120.2"/><path class="dg-box dg-runtime" d="M145.7478068843241,169.9500644685468 C175.39435935131942,172.9589513794328 197.2918409354481,169.8154745102932 220.70676875212544,173.77749405101756 C221.24805069093037,193.7137245185737 218.84717178356237,205.367923879981 219.5640088085849,219.69236855511198 C189.67725771138316,220.94605379167294 166.00949029950868,219.67426514629008 145.26511896376735,221.28640709001868 C143.64515800524742,204.08728919238192 145.611350823851,189.2154897711312 145.8131193175973,171.82153682882037"/><path class="dg-box dg-box2 dg-runtime" d="M146.9199049016088,169.65569667818755 C173.64723504215817,174.18718166564926 197.07128582059931,172.73043575432638 220.9836378108634,170.42133388557534 C221.34544062742285,193.29272842462768 219.30859756502724,205.41333403625214 219.26371583969507,224.31043496351245 C189.7964954383655,222.38892860542467 166.8696125037361,222.5602512373404 145.71409187461904,223.17256508039895 C145.139113236656,202.12645607112276 146.00854377905304,188.68344764899624 146.9284381886611,169.30350074824108"/><text class="dg-label dg-muted-label" x="183" y="202" text-anchor="middle">agent</text><path class="dg-line " d="M183,170 Q237.6954488766824,141.65209484200557 291,122"/><path class="dg-line " d="M286.0,126.9 L291,122 L284.0,121.5"/><path class="dg-box dg-runtime" d="M230.67977485753585,170.78982276971908 C263.62176399446173,171.5057010659509 281.9103107452906,169.85885975968972 306.0016392475933,171.389313221811 C309.22906503892926,193.4762710577698 307.7940414443584,207.5700759901526 307.4156539930104,221.68521881200616 C278.9380966208587,224.16584015105192 252.37269744918342,223.84670577247007 232.1680315034315,222.8434885040128 C231.69369220877704,203.33347416097925 232.13572254345553,188.37649936851884 230.15281391216106,172.81992740850893"/><path class="dg-box dg-box2 dg-runtime" d="M228.75756454475112,173.12339110538522 C260.87946720210806,173.03802662055847 286.1354562779588,169.73067951208478 306.3275904961524,171.93362140764185 C307.59200687547775,193.9970384606612 307.7161844268051,206.6097352990926 305.330608558995,223.80305972295025 C275.1612957005209,220.38379797971984 251.41830911637206,223.02965682308638 232.231751062177,220.09106884025553 C232.7141288299645,199.64575805666192 232.88453076681333,186.8484115611056 230.15891876293296,168.71201629667172"/><text class="dg-label dg-muted-label" x="269" y="202" text-anchor="middle">agent</text><path class="dg-line " d="M269,170 Q286.0426751380054,144.335633755585 305,122"/><path class="dg-line " d="M303.0,128.7 L305,122 L298.7,125.0"/><path class="dg-box dg-runtime" d="M315.2976999286086,171.29648776133382 C347.71604576237314,173.90077324113844 368.8743495946165,171.56682868095433 391.3256864551109,169.93198008552753 C394.2454516427803,192.14512519838527 392.52863515109226,206.88215675460276 394.8111682911455,224.37576942666237 C363.4727619186383,222.79103737026037 342.0072803518769,221.11760902475456 315.7864032750886,222.16857032895487 C318.7364978809545,202.8179447189057 318.22611885239655,187.7381931319545 319.05350837914904,168.73771400481357"/><path class="dg-box dg-box2 dg-runtime" d="M318.93409629069924,171.05746517249264 C345.95328197523634,172.7672355189767 372.2687622091122,172.1388580334088 393.2527404797509,170.2706146243357 C394.1298341290699,192.8360536578745 394.0243098751755,208.10060920878342 395.0810794851189,219.98280830401126 C364.1923436660284,221.890022851103 340.6137876525586,221.13969783854657 317.7385175719571,221.3422903069026 C316.58750286194845,203.81996822553685 315.52705211682576,185.5503684525147 317.82868986280107,171.4188724533277"/><text class="dg-label dg-muted-label" x="355" y="202" text-anchor="middle">agent</text><path class="dg-line " d="M355,170 Q338.6268682496747,148.75883770140766 319,122"/><path class="dg-line " d="M325.1,125.5 L319,122 L320.5,128.8"/><path class="dg-box dg-runtime" d="M403.97142830052013,170.11598548913187 C434.59068808722805,173.65097103307534 454.17042064683994,173.0603507534882 481.1433227560219,171.4909576424821 C479.35659790167426,194.71607360961664 476.7098632813012,207.1251252484159 480.86383514602846,223.21821441818878 C446.49086761488155,221.94912886728957 424.51652393393056,220.72603869490607 402.3101447113371,223.6378809947697 C401.74922142082323,199.9684827329444 401.7341034894502,187.63327469966993 401.99989452427246,169.1073781971854"/><path class="dg-box dg-box2 dg-runtime" d="M402.9570830832967,172.53831863540145 C431.92324295086934,173.04874358337779 453.98116855629775,172.49613070622837 476.94743919388736,171.7867200384786 C478.4844694146349,194.1174474725581 477.51791515393086,206.90756449806855 481.0536834737536,220.60308837937336 C449.20541091105224,223.89111042222527 426.89893436594815,220.68025989582773 404.4529460448087,221.828982926453 C402.8402210246027,200.06751747153118 403.09829917070374,185.55870418593227 403.1289596092556,171.20332870627908"/><text class="dg-label dg-muted-label" x="441" y="202" text-anchor="middle">agent</text><path class="dg-line " d="M441,170 Q385.02536201478233,150.44319354088194 333,122"/><path class="dg-line " d="M340.0,122.6 L333,122 L337.2,127.6"/><path class="dg-box dg-runtime" d="M490.62028885074903,173.23924637010285 C521.6493659994794,169.62115554810555 542.4399667096511,169.8358512879516 564.6863336095988,173.67613773535757 C567.3923021338844,195.42492523348187 562.9239089967328,206.7209519873005 565.4093065274923,221.52215366453032 C532.8541322711176,219.8886287213716 509.8301138879872,223.0590527073755 488.66995124913285,221.56123695464862 C490.5043476122917,203.93700294696586 489.95815315402956,184.99086952227674 491.037422706763,172.84191951972522"/><path class="dg-box dg-box2 dg-runtime" d="M489.54318008559903,173.32657852346384 C519.417008210354,174.17384414885836 541.5689613350523,171.33673477253726 565.324039460497,170.4402503971198 C566.6072427291457,193.66851291729535 566.0088533417363,204.6235376358142 563.340141612636,221.82239627941624 C536.2251085300115,220.77894687707487 509.49146747593375,220.06754105708913 490.5210451859613,222.22731456878935 C488.51960048764926,201.04400005407817 490.514099695121,185.00456981677775 486.87323527348843,171.32586088330757"/><text class="dg-label dg-muted-label" x="527" y="202" text-anchor="middle">agent</text><path class="dg-line " d="M527,170 Q435.4345426561472,152.9379264122983 347,122"/><path class="dg-line " d="M354.0,121.4 L347,122 L352.1,126.8"/><text class="dg-edge dg-edge-back" x="312" y="288" text-anchor="middle">add replicas. the control plane is the same size.</text>
</svg>
  <figcaption>The replicas are dashed because how many there are is a runtime answer. The box above them is not.</figcaption>
</figure>

## The roles, and what each one is not allowed to do

Kubernetes makes you declare two numbers for every container. A request, which is what it needs, and a limit, which is what it may never exceed. Teams are good at the first one and have almost nothing for the second.

The limit is the interesting half. A container with no limit will consume the node and take everything else down with it, and it will do that while behaving exactly as designed.

**The graph engineer.** Draws the boundary. What the work is, in what order, where it stops, what happens when it fails. *Limit: does not write the interior.* The moment they start editing the inside of nodes they stop maintaining the shape, and the shape is the only thing nobody else is doing.

**The spec owner.** Says what done means, before anything runs, in terms a machine could check. *Limit: cannot also be the one who decides it passed.* Writing the target and grading the shot is one person holding both ends, and it fails the way it always has.

**The check author.** Builds the thing that separates finished from finished-looking without a human in the loop. *Limit: may not accept a check that only a person can perform.* If the answer is "someone will notice", there is no check.

**The platform owner.** Environments, credentials, durability. One environment per project, up in seconds, thrown away without ceremony. *Limit: does not decide product.* A platform that starts choosing features has stopped being a platform.

**The reviewer.** Reads the diff and answers. Yes, no, or here is what you missed. *Limit: must be able to say no often enough that yes means something.* A reviewer who approves everything is not slow, they are absent.

**The agents.** Do the work. As many as the job needs. *Limit: propose, never apply.* They write anything and they land nothing on their own.

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

**Scale the replicas, not the control plane.** Add agents freely. Adding a second person to the control plane of one project is usually a sign the boundary was never drawn properly, and two people negotiating a shape is slower than one person owning it.

**No shared state between projects.** Same rule as the machines. A person on three clusters at thirty per cent is shared mutable state, and they will be the reason all three are late.

**Every role gets a limit, written down.** Not a job description. One sentence saying what this role may never do. If you cannot write it, the role is not a role yet.

## Where it breaks

The metaphor gets dangerous exactly where it gets satisfying.

A role is a slot. A person is not. Everything above describes slots: what each one does, what it may never do. A slot can be split, doubled, merged into another, or left empty for a week and nothing strange happens. The person standing in it can do none of those things.

The failure is quiet. You draw the roles well, and then you start talking about people as though they were the roles. Two people at half a role is not one role. Someone holding three roles is not three replicas, it is one person carrying three limits in their head, and the first limit they drop is the one nobody is checking.

Roles are also the part that survives a person leaving, which is the only reason to write them down. A slot with one name in it and nothing else written has one person's worth of failure in it: holidays, a bad week, a better offer. Kubernetes answers that with more control plane nodes. Here you answer it by making the spec and the checks good enough that whoever steps into the slot can read them and carry on, which is a documentation problem wearing an availability costume.

Draw the boundary. Give every role a limit. Add replicas, not managers.
