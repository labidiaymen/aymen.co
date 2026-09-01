---
title: "The loop lasted six weeks"
seoTitle: "Graph engineering, loop engineering, and what the new name is actually pointing at"
date: 2026-09-01
categories: ["ai"]
series: "Agent-native delivery"
unlisted: true
description: "A graph is not an upgrade on a loop. It is a claim that you already know the shape of the work."
permalink: "/ai/graph-engineering-bf9cea68/"
---
In the second week of June the idea was loop engineering. Stop prompting your coding agent. Design the loop that prompts it for you.

It was a good idea. By 21 July the headlines read "Forget About Loop Engineering, Think About Graph Engineering."

Six weeks. That is the shelf life of a name in this field right now.

I am not going to argue about the word. I want to know what it is pointing at, because underneath the churn there is something real, and I hit it before it had a name.

## The ladder, written out

A prompt is the smallest unit. Context engineering decides what surrounds it. Harness engineering builds the system it runs inside. Loop engineering automates the repetition for one agent. Graph engineering connects many of those into one structure.

In a graph, nodes do the work. A node is deterministic code, or an LLM call, or a tool, or a whole agent. Edges decide what happens next, and an edge can be fixed or conditional. State flows along the edges.

That is a state machine. We have had those for fifty years. What is new is that some of the nodes are non-deterministic, and you are deciding, node by node, whether they get to be.

## The graph you already have

Most teams reading this already run one. They just drew it in a CI config instead of a diagram.

Mine looks like this. A ticket arrives. An agent picks it up on a VM that carries the exact environment that project needs: the runtime, the database, the credentials, the test data. Nothing shared. It works in a branch and opens a merge request. SonarQube runs. The e2e suite runs. Coverage is checked. My phone buzzes. I read the diff and I answer. Yes, no, or here is what you missed. On no, it goes back to the agent with my sentence attached.

Count the nodes. Agent. Three checks. One human. Count the edges. Most are fixed, because the order is not negotiable: you do not run e2e before the branch exists. One is conditional, and it is the only interesting one in the whole diagram. It is the edge out of me.

<figure class="diagram">
<svg viewBox="0 0 960 380" role="img" aria-labelledby="dg-title dg-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg-title">The delivery pipeline drawn as a graph</title>
  <desc id="dg-desc">A ticket goes to an agent running on its own VM, which opens a merge request. Three checks run in parallel: SonarQube, the e2e suite and coverage. All three feed a human node, marked "you, on a phone". From there one edge leads to merged, and a second conditional edge loops back to the agent carrying the rejection.</desc>
  <path class="dg-line" d="M120,194 Q138.85074851748104,193.75046336778928 160,194"/><path class="dg-line" d="M152.7,197.2 L160,194 L152.7,190.7"/><path class="dg-line" d="M298,194 Q318.7561687248555,195.74011278373195 338,194"/><path class="dg-line" d="M331.0,197.9 L338,194 L330.4,191.4"/><path class="dg-line" d="M450,188 Q469.4318490035049,140.16996449472848 492,116"/><path class="dg-line" d="M489.4,123.6 L492,116 L484.6,119.1"/><path class="dg-line" d="M450,194 Q469.3849589831126,193.85277551545425 492,194"/><path class="dg-line" d="M484.7,197.2 L492,194 L484.7,190.7"/><path class="dg-line" d="M450,202 Q472.4005937596786,250.5959062588382 492,272"/><path class="dg-line" d="M484.7,268.8 L492,272 L489.5,264.4"/><path class="dg-line" d="M618,116 Q641.8849687594385,129.3927812578123 664,176"/><path class="dg-line" d="M657.9,170.8 L664,176 L663.8,168.0"/><path class="dg-line" d="M618,194 Q641.744343938187,193.38855862728718 664,194"/><path class="dg-line" d="M656.6,197.1 L664,194 L656.8,190.5"/><path class="dg-line" d="M618,272 Q641.5603220479378,254.17950749452203 664,212"/><path class="dg-line" d="M663.4,220.0 L664,212 L657.7,216.9"/><path class="dg-line" d="M776,194 Q798.1907410040454,194.17120504526943 820,194"/><path class="dg-line" d="M812.7,197.3 L820,194 L812.7,190.8"/><path class="dg-line dg-back" d="M720,232 C680,332 339,340 229,236"/><path class="dg-line dg-back dg-head" d="M222,246 L229,236 L237,245"/><path class="dg-box " d="M15.87695884810619,167.15279960704632 C56.4077236181161,166.91709709228812 89.40833702227489,170.232395555746 121.45555687130222,169.8652965565516 C120.40895347726017,191.40896415822627 119.22340965346592,206.64562492586936 121.86162071426475,218.0090679170606 C80.10659461212651,221.40626659570555 46.5394338615888,219.8386503230029 15.307541466554413,219.73503551582576 C17.633058740586534,200.54532451804042 14.005341148565217,183.4592635642082 14.015834808543248,166.51547484510368"/><path class="dg-box dg-box2 " d="M17.444719888570123,167.01619434422636 C58.40886325985606,167.12266559671735 87.03219852476948,168.02480349653624 120.11105461237536,168.49345665112764 C119.77918510538488,192.5493679063159 118.50944938702017,202.26536231053313 118.98538370196958,220.186098958266 C77.79628868186674,219.13787651133626 46.39673118665662,221.82204704481273 16.88850670013973,219.19901542738035 C16.282748032865463,200.98225822643482 17.248400499135442,181.98681449926775 17.724722053541207,167.05090770858848"/><path class="dg-box " d="M160.69906520987817,155.5572172174031 C213.77508297011957,157.36580958541754 257.9402885454429,158.27311935642413 296.7173027043777,157.38641295609364 C296.9691614157377,187.82875843049433 298.85803635868155,206.89518909458778 298.1864787411813,230.03290882130756 C240.9854289534434,231.48837041942792 201.6754206669868,233.0332332627071 160.8742107406604,231.57903709503776 C159.7777660380014,201.85875206117458 161.2151348130848,180.7116359730771 160.16541862607255,154.4597591411135"/><path class="dg-box dg-box2 " d="M160.7342815413765,154.22050437956142 C213.31645026231018,156.6781891837149 257.44174041899004,156.62238922259883 299.90842132768984,157.17498321699676 C299.13804168865926,192.462977602269 295.60130462646543,208.393013128635 295.71531896596554,229.72140620356492 C244.80909418072977,234.01041507926323 199.87853260081192,232.17404589772877 160.95074196017848,234.19633064484051 C160.0803409587966,199.5554340364204 161.59917350001595,179.0125997555501 159.5902952203482,153.58214778969165"/><path class="dg-box " d="M337.70618724921076,170.0464101812087 C382.6021940241578,167.37442989431995 417.45399913948677,166.465718651221 448.65838007976225,169.2781291025123 C450.610483933897,192.9359401721209 448.1208263399642,204.68045020228274 451.9049634953518,220.0770833980651 C403.2283872606365,221.45605540455136 370.10559845012875,219.90010237800894 340.01169910636344,221.15794468091704 C336.43035297432465,197.47168536217495 337.05828771659094,182.5049998289463 339.29408102207543,164.72717285185456"/><path class="dg-box dg-box2 " d="M336.9493684298123,166.3262300494715 C384.59572406010506,168.3831928266134 416.1123813638987,169.23065071275022 451.724353410734,170.39341621622137 C448.1673557284136,193.15098166659055 450.6651586546866,206.61530895448072 448.08286342643333,219.27403559762706 C404.59395523154825,219.5391944894284 373.5077735920939,222.27039566257523 339.0337013260618,222.32151870947402 C338.2311134350631,201.564438631369 335.9343849183686,183.34603057007587 340.0120126744788,167.6534517304755"/><path class="dg-box " d="M491.1253870017479,95.76984729867887 C541.099222755944,96.27028842096696 579.9118801126777,96.46702995433799 615.8103939057377,95.92847113717743 C618.2212766659545,114.09662532922654 618.9717390076125,123.32905178150584 618.1976285946545,135.31429805835444 C566.1871290211506,138.31437602262682 531.80863952842,137.45579834163925 492.86329651030866,136.8040344253201 C489.7991546631787,121.22819838692816 492.3952577603959,109.26505680254895 493.520417978205,92.60673923516029"/><path class="dg-box dg-box2 " d="M490.1786471846414,95.83079824551511 C542.4988818180276,94.76276435906196 578.5700536254654,96.37290887961765 616.6290779118561,95.49725432484283 C618.5313394560159,115.27725849322847 617.5937616357551,125.32736988241196 616.2801218036004,137.58047213739738 C569.0703426379107,138.31913261633326 527.8755214693376,136.8945630565726 492.84873333128576,134.74408931785453 C492.9062514797348,120.39220504890764 491.60076828096095,108.3247856152825 491.62080001925153,93.80199508746247"/><path class="dg-box " d="M491.45538253870575,173.81523971660772 C540.667797088934,172.2621758940919 577.8616971016218,174.1802362752055 617.265419197858,174.4962472929136 C616.731900215676,190.4356471542435 619.7191855449785,203.35067520316255 617.0060462958207,213.4914955147968 C569.4554603596476,214.7776283278957 529.3439369210712,212.72157363943828 492.13397612689715,211.99495334643635 C489.85336031925556,197.44640493478926 490.6343859677363,184.47959218066165 493.8909805317833,170.31612396250299"/><path class="dg-box dg-box2 " d="M493.7208207626458,174.97469043888836 C542.3349374781991,176.11475544186064 578.619991493607,176.34423709136632 615.7793163300396,174.58398413797096 C620.3557874701711,192.87002105865162 618.8127914443671,199.8138259888691 620.3844041369783,211.73809127814047 C565.3586175263666,212.38832175768368 527.7640741826799,215.9111398716975 491.1301912314865,212.1243677141724 C494.305620147989,195.66694450381536 490.0948300661961,188.27748077133552 490.5595550541578,171.48684096400945"/><path class="dg-box " d="M492.66229877614524,253.04752750557267 C544.5847246191393,252.99116306462844 581.7558443087879,251.56117801757586 616.7460680013271,249.88227953923973 C617.5575842866476,267.8822321893099 618.988189746527,282.1042869588846 617.0692588812994,290.4105735782583 C567.9857507241824,292.273540688806 530.2514116300509,293.2662973421003 492.626730538824,290.54402713819593 C493.4078723448365,275.9843090068476 491.8219356547212,264.85214653166577 492.5959133162144,249.3016490941875"/><path class="dg-box dg-box2 " d="M490.7588802343043,253.0884809033426 C542.5373411190404,251.7226507196774 580.0835065852309,252.4867177976699 619.0582242981802,254.29422970036708 C617.4746772774843,271.39570999322257 619.9695259114585,277.67171096805095 618.0411324810428,293.8410453816136 C567.5681144725384,289.9342704774506 530.2484002603443,293.6882776279414 490.9249254232854,290.40273838080594 C491.7534915457263,277.58102073854815 492.8033580794946,265.4701595324418 490.6429241185276,250.93754553926993"/><path class="dg-box dg-human" d="M662.7080427174959,158.2986564181273 C708.4061401376529,154.0755523683855 741.6649232395296,154.9201417929121 774.961791420617,155.6613664636674 C777.1294992463335,192.331363107884 774.2521020892319,208.02866702136987 778.0790538808699,232.8147518172929 C732.8222332019462,230.42598533668834 697.9576245797601,233.5349393862928 663.7030492792386,233.14538707898248 C666.061379053286,200.7322385795099 663.4789739617514,177.58523998315692 665.7881582279634,153.37773113310232"/><path class="dg-box dg-box2 dg-human" d="M664.5329748167344,156.36039562353884 C706.5879354477803,154.80501093920554 740.3858924867519,155.46348052111617 776.454682351488,155.43257160272103 C777.8150781651098,188.49930896791597 777.9011699219706,210.41976051499122 774.4818531040484,234.11478934498263 C731.0319143305682,231.36902141653422 695.3679906845875,234.1740005037626 662.5893486027556,232.45191588534598 C664.2714807522816,200.2940660481779 664.2390666497122,177.17237892186847 666.0016347428791,154.72696895721694"/><path class="dg-box " d="M820.680756951813,165.6823202133562 C867.9679503749907,166.58890285537993 905.0276458279359,170.22653274751573 942.3979560874393,165.6643501282038 C941.0575509385474,190.27440719663838 941.9733024617533,202.89351120036724 941.1243890301904,219.11480350564923 C890.4849962238618,217.9442058087998 855.6512976655976,217.7657404900369 819.7843445311228,220.50390854017058 C819.4717613228931,200.2520896927696 818.9047569280978,181.70486068749094 821.7880456467103,168.64868717405417"/><path class="dg-box dg-box2 " d="M821.3673784273525,170.3316782019714 C869.4782447833,167.42050552452937 903.7894264231387,168.21430435302403 940.8884986892755,168.6881813063697 C941.3160865800995,189.5702613833222 937.8378152371561,203.97279176803903 942.2278359434697,219.79972152812394 C894.3091270468706,220.44370346201757 856.3344078076698,222.0055564900886 819.2576377876371,218.09387435936083 C822.0155358811912,199.07012271986812 818.6288530354523,183.75741076588508 819.3672000893239,167.5262043015222"/><text class="dg-label" x="68" y="199" text-anchor="middle">ticket</text><text class="dg-label" x="229" y="188" text-anchor="middle">agent</text><text class="dg-sub" x="229" y="208" text-anchor="middle">on its own VM</text><text class="dg-label" x="394" y="200" text-anchor="middle">merge request</text><text class="dg-label" x="555" y="121" text-anchor="middle">SonarQube</text><text class="dg-label" x="555" y="199" text-anchor="middle">e2e suite</text><text class="dg-label" x="555" y="277" text-anchor="middle">coverage</text><text class="dg-label dg-human-text" x="720" y="188" text-anchor="middle">you</text><text class="dg-sub" x="720" y="208" text-anchor="middle">on a phone</text><text class="dg-label" x="880" y="200" text-anchor="middle">merged</text><text class="dg-edge" x="798" y="172" text-anchor="middle">yes</text><text class="dg-edge dg-edge-back" x="455" y="350" text-anchor="middle">no, here is what you missed</text>
</svg>
  <figcaption>The same pipeline as a drawing. Five nodes, one human, and exactly one edge that is not fixed.</figcaption>
</figure>

That is what graph engineering is. Not a framework. The recognition that this drawing exists, that you are responsible for it, and that every arrow in it is a decision.

## The only question that matters

Where does the model choose, and where does the system decide for it?

That is the whole job. Everything else is syntax.

A support agent classifies before it responds. Always. That order is not a preference, it is domain knowledge, and hardcoding it into an edge is not a limitation. It is the thing you know, written down.

Compare two versions of the same task. A migration that runs overnight: read the schema, plan the change, write it, run it against a copy, diff the result, report. You know every one of those steps and their order. Draw all of it. Give the model the inside of the nodes and none of the routing.

Now a bug that a customer reported in prose. You do not know if it is one file or nine, whether it needs a repro first, whether the fix is in the API or the client. Draw that as a fixed sequence and you will spend a week adding branches for cases you did not think of. Give the agent a goal, a working environment, and a check that tells it when it is done.

So a graph is not an upgrade on a loop. It is a claim that you know the shape of the work. Where you know it, draw it. Where you don't, leave the model room and let it find out.

## Three edges worth arguing about

**The retry.** Every graph has one, and most have it wrong. An agent fails a check, so you route it back to try again. Fine. Now cap it. Without a cap, a flaky e2e suite and a stubborn model will burn a night's budget in a loop that looks healthy from the outside. Three attempts, then the edge goes somewhere else. A capped retry is engineering. An uncapped one is a bill.

**The failure path.** Ask what happens when a node fails for a reason nobody planned. The database is not there. The credentials expired. The model returns something that does not parse. If your answer is that the run stops and someone notices eventually, you have a demo. A graph without a recovery path is a demo that survived contact with a happy input.

**The escape.** Somewhere in the graph, an agent should be able to say "I cannot do this" and route to a human without failing. If the only way out is failure, the model learns to fake success, because every path it has leads through appearing to be finished.

## State is where people get hurt

The tempting mistake is to let everything travel. The task, the full repository, every previous message, the output of every node. It works in a demo of four steps and it collapses at twelve. Costs climb, latency climbs, and the model starts answering with the wrong half of what you sent it.

Decide, per edge, what actually needs to cross it.

My review node needs the diff, the check results, and the agent's reasoning. It does not need the repository. The e2e node needs a running environment and a branch name. It does not need the ticket text. The agent that picks up my rejection needs my sentence and the diff it wrote. It does not need the other eleven merge requests open that week.

The rule I use: if I cannot say out loud why a piece of state is crossing an edge, it is not crossing.

## The human is a node

This is the part people leave off the diagram, and it is the part with the worst latency in the system.

I am a node. My inputs are a diff and a pipeline verdict. My output is one of three tokens. My response time is however long it takes me to look at my phone, which at night is hours.

Once you write yourself into the graph, the design consequences are immediate. Work that blocks on me should not be work that could have run in parallel. Anything sitting behind my approval should be visible as sitting there, not silently stalled. And the moment I notice I am approving without reading, my node has become a rubber stamp and the graph has a hole in it exactly where its guarantee was supposed to be.

That last one is not a tooling problem. It is the reason the checks in front of me have to be real, and the reason I would rather have three that mean something than nine I have learned to scroll past.

## Where it goes wrong

The failure mode is drawing the graph too early.

The people building deep research learned this in public. They started with predefined workflows and moved back to letting the agent plan, delegate and manage its own context, because those parts work better when they emerge than when they are wired. The graph was the wrong tool for a task whose shape changes with every question.

That is the trap. A graph looks like control, and control feels like engineering. But every edge you draw is a decision you are making on the model's behalf, forever, for every input. Draw enough of them and you have written the program you were trying not to write, in a worse language, with a model in the middle of it.

The honest test: could you write down the steps for this task, in order, before seeing the input? If yes, draw it. If you find yourself writing "it depends" more than twice, stop drawing and give the agent room.

## What this does to the job

I said in another post that we decide what to build, we design the systems, the loops and the graphs, we define the environment the agent works in, and then we read the diff and say yes or no.

The graph is where most of that lands.

Choosing which steps are deterministic. Deciding what state travels and what stays local. Placing the validators, and making them mean something. Capping the retries. Drawing the failure paths, because those are the ones you will actually live in. Putting yourself in the diagram honestly, latency and all.

None of that is prompting. None of it is typing code into a function body. It is systems design, and the artefact is a diagram that happens to execute.

The engineers who are good at this are the ones who were already good at distributed systems, pipelines and state machines. They are not learning a new discipline. They are applying an old one to a runtime that occasionally makes things up.

## The name will change again

By winter there will be another word. Someone will point out that a graph is a poor model for agents that spawn other agents at runtime, and they will be right, and there will be a fresh set of guides with 2027 in the title.

Do not wait for it to settle. The teams shipping this way are not sitting out the naming cycle, and the vocabulary was never the hard part.

Draw the parts you know. Leave the rest open. Cap the retries. Put a human on the edge that matters, and make sure that human is still reading.
