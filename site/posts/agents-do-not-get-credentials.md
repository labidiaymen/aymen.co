---
title: "Agents Do Not Get Credentials"
seoTitle: "Infrastructure as code with Argo: why an agent proposes a change instead of applying it"
date: 2026-09-09
categories: ["ai"]
unlisted: true
description: "An agent that applies its own change also grades its own work."
cover: "/images/credentials-cover.png"
permalink: "/ai/agents-do-not-get-credentials-4d1c7e93/"
---
An agent working on my code opens a merge request. It does not merge it. Nobody argues about that one. Handing an agent commit rights on the main branch is not a position anyone defends out loud.

Infrastructure is where the same rule gets quietly dropped. The agent gets a shell, or a cloud token, or a kubeconfig, because that is the fastest way to get the change applied.

It is faster in the way that editing production by hand is faster.

## What infrastructure as code is actually for

Not that the config lives in git. That is where it sits, not what it buys.

What it buys is a definition of the cluster that is not inside the cluster. The running system becomes derived state, something you can throw away and rebuild from a source you can read. If the only place the current shape of production exists is production, you do not have infrastructure as code. You have a wiki page and a habit.

That is the same property I want from an index or a build. The authoritative copy is the one you can review.

## Why a credential is the wrong thing to hand an agent

Give an agent a token and every change it makes is an event, not an artefact. It happened. There is a line in an audit log saying it happened. There is no diff, no review, and nothing left behind that tells the next person why.

The problem is not that the agent is careless. Assume it is careful. The problem is that an imperative change has no shape you can inspect before it lands. A person with a token has exactly the same problem, and we spent fifteen years building process to stop people from doing it.

There is a second thing, and it is worse. An agent that applies its own change also grades its own work. It reads back the state it just wrote and reports success. A background command's own success message is not proof it ran to completion, and neither is an agent's.

## What Argo changes

Argo moves the credential off the actor and onto a controller.

Nothing pushes to the cluster. The controller sits inside it, watches a repository, and reconciles what is running against what is written. The direction matters more than it sounds. The cluster pulls its own definition instead of accepting whatever arrives holding a valid token.

So the agent's job changes shape. It cannot apply anything. It can only propose a diff, and that diff gets read before it becomes real. The pipeline is what applies. The agent is upstream of the pipeline like everyone else.

<figure class="diagram">
<svg viewBox="0 0 624 240" role="img" aria-labelledby="dg9-title dg9-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg9-title">How a change reaches the cluster</title>
  <desc id="dg9-desc">An agent's change goes to a human review, then into the repository. Argo watches that repository and holds the only credentials, and it is what reaches the cluster. A second path leaves the agent and heads towards the cluster directly, but it stops partway and never arrives: that edge does not exist.</desc>
  <path class="dg-box " d="M9.211666127765396,65.09721736977679 C49.65814647891473,66.13184108852029 77.99853801922804,68.37280025704429 105.13574295162024,65.21124343947099 C104.63454666232437,89.89334793309371 107.24643631197812,100.80181961227292 104.63234939669834,115.37884597954286 C68.3907234211409,114.65411453389288 37.957495881317875,113.14481277537756 9.30610427982458,115.95562820637394 C8.447486115362256,95.07874832278058 8.93007888902448,78.49386062645068 10.139820243576457,66.82727451544594"/><path class="dg-box dg-box2 " d="M9.665430451866905,67.74718094065189 C47.45173416251863,68.16678543303478 76.6511238111421,65.91275711167266 105.72453689720693,64.02728347798217 C103.87041106283218,88.59917392888998 105.38996601234655,97.82263126402285 106.14290957615846,113.92680473435988 C65.10865745586746,115.76576056674391 36.08113689454325,112.71045298628064 8.445872784520441,113.50040502636712 C10.294224073222942,94.54921074013654 10.754037096050585,82.05276603887452 7.233752060231637,65.79013495617087"/><text class="dg-label" x="57" y="94" text-anchor="middle">agent</text><path class="dg-line " d="M105,90 Q115.95479822249841,90.42141771429284 127,90"/><path class="dg-line " d="M120.7,93.1 L127,90 L120.5,87.4"/><path class="dg-box dg-human" d="M127.78914012964309,66.89139919434274 C172.4466215153442,64.14515132929438 201.8282607566697,64.572466278529 235.30549254636537,66.13008728145161 C232.36235351644567,87.17156066986338 234.0235778824536,98.77314148022474 234.1615112321272,115.26100158861885 C189.72888793979254,112.68318800976648 159.22193956441336,112.06814889929638 127.26297440559742,111.68091259006454 C128.00709756082253,93.24696178475719 127.57677226112074,78.53795499826687 127.23502278357512,65.97119751156829"/><path class="dg-box dg-box2 dg-human" d="M129.4324310315924,68.31782226782191 C169.51765441955888,66.54779663223205 200.7129852301036,66.40447998177468 232.14459533763332,67.64060669133468 C231.46053161661166,85.69328627609335 231.36483812367769,101.44252953726915 232.55925769897144,115.8918314000088 C192.87400531949197,115.67979068946083 160.3326616299025,114.12254734156772 129.7579805388851,112.45027713815229 C129.78912234454842,94.54055900673407 131.0531856557602,79.65839653092362 128.6771633157866,63.95789909449308"/><text class="dg-label dg-human-text" x="181" y="94" text-anchor="middle">review</text><path class="dg-line " d="M233,90 Q242.57510852840502,88.32894241825163 255,90"/><path class="dg-line " d="M248.3,92.0 L255,90 L249.0,86.3"/><path class="dg-box " d="M255.9185914045752,66.1971447956735 C292.7635662088932,67.96878318990058 317.9100902558817,66.53209204810304 349.1182996770918,65.22760219649766 C346.79431133372447,88.31365413810762 347.2591291439995,100.660826684656 344.84234294902643,115.84441294867752 C312.56000824159014,113.68545684911565 283.9171676646532,113.57520904632993 258.67203216742354,116.38981476053121 C254.7109298706571,94.13903973779595 258.4250457781484,81.8440795916338 257.78595276027266,62.87356567418834"/><path class="dg-box dg-box2 " d="M255.0780610563597,64.68810167363291 C294.20481896568316,67.44411792934133 319.83065891369745,64.91401691497957 348.99261722769245,67.15106678174392 C349.2427713415785,88.49520893250369 348.9847345372591,97.29029102329643 348.4479014712609,111.61704883576233 C310.76450303521216,113.29316797335314 284.4709126485842,114.50074653760565 255.23823585539975,115.61129050441612 C258.68569698523993,92.76336193101636 259.142513229578,78.31934509292215 256.89145522224317,63.90275287712121"/><text class="dg-label" x="302" y="94" text-anchor="middle">the repo</text><path class="dg-line " d="M347,90 Q357.62043714598775,89.32908773484132 369,90"/><path class="dg-line " d="M362.5,92.5 L369,90 L362.8,86.8"/><path class="dg-box dg-human" d="M369.3883554462289,63.787314176646674 C418.0380003943285,67.49641571226363 454.33824615689844,64.96807708803941 485.2837112429942,65.4706468114027 C487.63229236743985,85.60886020679439 486.8613955985109,100.37068748621768 488.3426586168551,111.80704307565793 C442.8538556597447,113.76631450753953 403.62137508402645,113.97258753887033 371.42127304208526,112.79886703547038 C371.95348739780184,94.06648178178187 371.4547447217883,79.20978012141296 370.25551376419867,63.14985580493224"/><path class="dg-box dg-box2 dg-human" d="M370.65501341915456,64.06067447683806 C418.93649478141987,64.73696708732143 454.33822913381186,66.93255443728182 486.82043361767217,67.67074871252791 C489.3468908332041,88.3522407546417 486.83762893780954,101.57619095052415 488.88570022782574,113.5034614571852 C439.09568557780966,116.17936492179491 406.265769387626,111.62699604035681 373.07452958434567,113.42966938104 C373.34717350227163,97.17738876565238 369.13423080469215,81.45188841980504 372.5200494784489,63.90836963737773"/><text class="dg-label dg-human-text" x="429" y="94" text-anchor="middle">argo</text><path class="dg-line " d="M487,90 Q496.0935168266732,91.84985123754007 509,90"/><path class="dg-line " d="M503.1,93.7 L509,90 L502.3,88.1"/><path class="dg-box " d="M510.55515842528786,68.09071369380258 C550.7338159563643,65.99797854535187 585.3465099353094,64.52996177716645 613.6926190858206,65.21965341643414 C616.4191540735862,88.84382744005127 614.5735073098789,98.75626945568074 612.6718746185637,114.47674382462947 C571.9599864964187,113.69890723326192 542.0667799006528,113.46507167903012 509.66910991718487,115.244824935703 C511.8314773574618,96.97090301726521 509.2198623660113,81.97674422449282 510.1500352866715,65.63346347973378"/><path class="dg-box dg-box2 " d="M509.9212770468189,63.754284095836006 C553.936818267655,66.23160209778305 581.7253200532521,68.10073371143115 613.7369596486618,67.46388316334406 C613.463511658117,88.52357955133708 612.9628984452984,97.38711047181259 613.0482184412183,114.34416775831215 C575.3248355885618,111.87409858716377 542.8273595347197,115.10362758799624 510.15607891155224,112.12132015252547 C511.36972499022716,93.34988021894817 509.84517455158993,81.72573795492097 511.61591358325256,66.07201023286768"/><text class="dg-label" x="563" y="94" text-anchor="middle">cluster</text><text class="dg-sub" x="429" y="142" text-anchor="middle">watches the repo, holds the credentials</text><path class="dg-line dg-stop" d="M57,116 C64,172 300,208 470,186"/><text class="dg-edge" x="286" y="226" text-anchor="middle">the edge that does not exist</text>
</svg>
  <figcaption>The short path is not scoped down or rate limited. It is absent, which is a different kind of safety.</figcaption>
</figure>

That distinction is the whole point. A narrow permission is a permission, and permissions get widened at three in the morning by someone who needs the thing to work. An edge that does not exist has nothing to widen.

## What the agent is actually good at here

This is not a downgrade for the agent. Manifests are close to the best work you can give one.

They are repetitive, they are schema-bound, and they fail loudly. A change that has to land the same way across a dozen services is exactly the job I do not want to do by hand, and exactly the job an agent finishes without getting bored on the ninth one.

The feedback loop is real too. A rendered diff, a dry run, a policy check. The agent can iterate against all three on its own until they pass, and none of it reaches a cluster, because rendering is not applying.

## What this does not fix

Automatic sync means the merge is the deploy. Once the controller applies on merge, the review is the only gate left, and an approval that is not a real read is the entire safety story.

Rollback is not always a revert. Reverting a manifest restores the old shape. It does not restore a dropped column, a released address, or a certificate that has already been reissued. Some changes are not symmetric, and the diff will not tell you which ones.

Drift still happens, because someone will eventually fix production by hand. The controller notices. That is the good version. The bad version is that it notices at four in the morning and quietly undoes the fix.

## The rule

An agent can write anything. It cannot apply anything.

Everything else is detail. Which tool holds the credential, which branch is authoritative, how the sync gets triggered. Get that one sentence right and the tooling is replaceable. Get it wrong and no amount of scoped permissions puts it back.
