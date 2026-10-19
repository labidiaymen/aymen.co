---
title: "A Misspelled Output Still Compiles"
seoTitle: "Angular strictUnclaimedEventNames: catching a misspelled output binding at build time"
date: 2026-10-19
categories: ["javascript", "angular"]
unlisted: true
description: "Angular 22.2 adds a compiler option that fails the build on an event binding nobody claims. It is off by default."
permalink: "/javascript/misspelled-output-compiles-5e8a2c17/"
---
I used to have `(valueChnage)` in a template.

Not `valueChange`. A binding for an event nobody fires.

## What the compiler does with a name it does not know

You write `(valueChange)="save()"` on an element. Angular looks for an output called `valueChange` on the directives on that element. If it finds one, the binding is wired to it.

If it does not, Angular treats the name as a DOM event and attaches a listener. A misspelling lands there. `valueChnage` is a perfectly valid event name, so the compiler has nothing to object to. The listener is added, and nothing ever fires the event.

<figure class="diagram">
<svg viewBox="0 0 624 262" role="img" aria-labelledby="dg17-title dg17-desc" preserveAspectRatio="xMidYMid meet">
  <title id="dg17-title">Who claims an event name</title>
  <desc id="dg17-desc">An event binding, written with a typo, can be claimed by an output on the directive or by a native DOM event. If neither claims it, the outcome depends on one flag. With it off, the template compiles and listens for an event nothing fires. With it on, the build fails.</desc>
  <path class="dg-box " d="M17.72425538270001,103.76349125009193 C96.58883533691468,104.72204380180781 155.24840717522818,103.5458429345609 213.66360645483417,101.70178318028421 C211.07593720624035,129.89052219492874 211.48911457149737,144.0282617577483 213.38632068810347,164.23544712282506 C131.4468690873342,162.46569171085287 73.32372932477097,162.46367240085436 17.557042505199576,162.36736736426474 C15.159573937188636,136.5909498215611 17.424593307368735,120.04107360888324 14.834863424876175,104.70924701905308"/><path class="dg-box dg-box2 " d="M14.3273859027435,103.50179019062863 C95.17291679530075,105.10049705668375 152.12940177979385,102.04954795858336 211.0243878848033,104.14182720302689 C212.98975887456433,132.11392040458225 209.60494899749986,145.1860503530996 213.4486612337868,162.7465822234501 C134.8062982575997,162.22511158111743 75.84021701972941,162.01210041158464 17.814968301828472,162.89358387146777 C18.35838413460105,137.6532539373512 16.27931594973398,120.72632522663396 14.931586456918897,101.06131057784022"/><text class="dg-label" x="114" y="130" text-anchor="middle">(valueChnage)</text><text class="dg-sub" x="114" y="148" text-anchor="middle">an event binding</text><path class="dg-box " d="M329.7324899206555,11.756394386364331 C441.9051211844688,14.249276353162376 527.7713451404923,12.14637413050345 609.0034406191685,15.983575250759523 C608.5652959828103,33.672465467673014 612.070467664893,45.79179344204803 607.6869580746102,60.56354072734879 C498.51267027990554,62.83745975645141 414.2545274746858,62.02311191671673 332.3929567359355,59.86737060559325 C329.19967360571013,40.90324420952389 328.50901751560576,27.17592992837351 330.0076884280926,11.273075485775749"/><path class="dg-box dg-box2 " d="M332.2865444205173,12.402314377204661 C441.71577124694164,14.045582390970356 527.2826681154233,12.552746391740044 610.214325667645,15.897682191942671 C607.9653549196037,33.43074507724063 610.7251912131558,48.451485063159595 610.8156101241781,63.15446052716787 C498.8539981857194,59.87157173169384 411.89568228735385,64.0195580503063 328.40446243323595,61.49229216663739 C329.3060892113047,42.32810688108583 331.0768610016801,29.1133256926729 328.9149301535054,12.727707101138172"/><text class="dg-label" x="470" y="35" text-anchor="middle">an output on the directive</text><text class="dg-sub" x="470" y="52" text-anchor="middle">claimed</text><path class="dg-line " d="M212,133 Q267.7920603755825,81.70867617270382 326,38"/><path class="dg-line " d="M322.6,44.1 L326,38 L319.2,39.6"/><path class="dg-box " d="M330.36106681952305,73.18853721692625 C441.31171684344844,73.7890773783387 525.9565319072253,75.34110679800673 609.6511760721221,75.51200828734413 C610.0403759014049,97.87697715977066 609.5204204568269,107.13152122587502 608.6016613011257,123.20396094490027 C498.8301343932888,123.53321132843067 414.70883159782215,121.13698787760781 329.13063182902084,119.82024440775636 C328.2720000746995,102.32677106947021 332.19527120804196,86.22252807627551 328.8962129122094,71.62290363382684"/><path class="dg-box dg-box2 " d="M330.6112695707992,76.23417225099828 C440.95126743379575,72.97128315035779 526.9268243805165,72.02808399220373 610.9173350826452,75.96770057881609 C611.6745075244803,93.83755836516505 610.0093190681233,108.90518551045338 607.6344861984413,123.70443337750828 C496.0581281664121,122.36422038207027 412.7338623052155,122.5535188211843 331.6536226291459,121.45651493158961 C329.8252916346422,101.0551553729247 328.3294436935007,88.1723052034957 328.13407773996425,71.49130787914214"/><text class="dg-label" x="470" y="95" text-anchor="middle">a native DOM event</text><text class="dg-sub" x="470" y="112" text-anchor="middle">claimed</text><path class="dg-line " d="M212,133 Q267.00587844848906,113.2216332550727 326,98"/><path class="dg-line " d="M320.5,102.4 L326,98 L319.1,96.8"/><path class="dg-box dg-ghost" d="M329.3877676972131,133.4745677003053 C440.1082289698106,134.67554974699186 527.3810192125761,136.37272300942462 609.4098430641973,133.4692104348304 C607.9879100801367,153.7207028868239 611.4581315058555,169.1437347430474 608.7624267583537,180.0420442106398 C495.9778904916616,182.69492516661757 414.3063188565459,183.83868503767937 331.2544893281788,184.0572351476444 C330.0850450527319,163.32452793257522 328.9223024374444,147.54105167460676 328.6694841389868,134.8080760500897"/><path class="dg-box dg-box2 dg-ghost" d="M329.87409095870055,133.47418403712763 C441.14292335582104,135.8222278614632 524.8187625890685,135.2465168016248 612.2678195975105,135.9640430470761 C612.042242815179,153.85898628265548 610.0176183234983,166.92933559498252 612.2957517645767,181.73316040138394 C499.8613861103828,183.84892578322857 411.6829376221089,180.3386658969981 331.9194534321872,182.66654510640845 C331.6261001605662,161.01291351346902 330.06463179703087,147.66884327012528 329.64134616946865,134.58205280512666"/><text class="dg-label dg-muted-label" x="470" y="155" text-anchor="middle">neither, flag off</text><text class="dg-sub" x="470" y="172" text-anchor="middle">compiles, listens for nothing</text><path class="dg-line dg-ghost" d="M212,133 Q268.5409617431187,147.40142507678894 326,158"/><path class="dg-line dg-ghost" d="M319.2,159.6 L326,158 L320.2,154.0"/><path class="dg-box dg-fail" d="M330.0885171901847,194.3346315396645 C442.8724237457255,191.82653980265675 524.5146434311357,194.72743597176273 609.7945030222621,194.7371849074667 C608.1613853457204,217.0336083906859 612.1119012853652,227.21709156130305 610.2222848904423,241.18874836042 C495.7758447647914,240.61036868142446 415.7032851238285,243.0179199234666 328.37829895055773,242.70805068160783 C329.7897829065983,223.9464227692906 328.1049333574739,209.0220408930546 328.9462589270185,192.69049263121119"/><path class="dg-box dg-box2 dg-fail" d="M329.6705600748167,195.58463020510257 C441.77061805826173,192.04876289388574 526.9626439587039,194.60900478503154 612.2140684149293,192.97655086581435 C608.8367475515403,217.10560817900375 612.1204008123467,226.41209468897995 608.2500867846655,243.1173972623038 C499.46607971371435,244.0824035665404 412.0163909914048,241.48195815174 330.33007221349055,240.13483219171633 C327.600935697556,224.91727741794534 332.2756782553511,208.6923164380213 331.13712845013345,191.72788772658814"/><text class="dg-label dg-fail-text" x="470" y="215" text-anchor="middle">neither, flag on</text><text class="dg-sub" x="470" y="232" text-anchor="middle">the build fails</text><path class="dg-line " d="M212,133 Q269.1682491312587,179.8878108988459 326,218"/><path class="dg-line " d="M319.1,216.8 L326,218 L322.3,212.1"/>
</svg>
  <figcaption>Two things can claim a name. When neither does, one flag decides whether anyone finds out.</figcaption>
</figure>

## The option

Angular 22.2 adds `strictUnclaimedEventNames`. [Aamir Mukaram wrote it up](https://aamirmukaram.com/notes/angular-strict-unclaimed-event-names/), and the change itself is [pull request #70527](https://github.com/angular/angular/pull/70527).

```json
{
  "angularCompilerOptions": {
    "strictTemplates": true,
    "strictUnclaimedEventNames": true
  }
}
```

With it on, a binding on an element with a matched directive is reported when its name matches neither an output of those directives nor a known native event. The error is NG8030 and the build fails.

It is off by default, and `strictTemplates` does not turn it on. Upgrading breaks nothing until you ask it to.

## Why a person does not catch this

A reviewer reading a diff does not see a missing handler. They see a line that looks right. The binding is there, the method is there, the two names are almost the same. There is no warning and no red, and no test fails unless one happens to exercise that exact path.

That is the finished-looking problem from [the article on checks](/ai/agentic-engineering/) in its smallest form. The work looks done and nothing in the build can tell otherwise.

## What it does not catch

The pull request calls it a heuristic, and it is one.

Only plain camelCase names are reported, so an all-lowercase misspelling is not. Dash-case names are skipped, because bubbling custom events conventionally use them. An element with no directive on it is out of scope, so a typo on a bare `<div>` goes through. `NO_ERRORS_SCHEMA` disables the check entirely, and with `CUSTOM_ELEMENTS_SCHEMA` an element without a matched component is exempt.

## What it costs to turn on

A camelCase custom event on an element that also carries a directive matches no output and no native event, so it is reported. That includes the ones you meant.

On an existing app, expect a list on the first build. Each line is either a real bug or a deliberate event that now has to be renamed to dash-case or left alone with the flag off. Both are worth knowing, and neither is free.

## Where it earns its keep

New code is the weaker case. A misspelled output is a typing slip, and templates that are generated rather than typed make fewer of them.

The strong case is the app that already exists. Years of hand-typed bindings, written before anything checked event names, and nobody has read them for this. That is where a `valueChnage` can still be sitting, and where turning the flag on once will find it.

## What I would do

On an existing app, turn it on in a branch and read the list once.

On a new project, turn it on anyway. There is nothing to clean up, so it costs nothing.

`valueChnage` was a perfectly valid event name. That is the whole problem.
