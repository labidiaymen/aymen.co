---
title: "Node.js Events"
date: 2016-01-27
categories: ["log"]
permalink: "/log/node-js-events/"
---

All objects that emit events are instances of the EventEmitter class. These objects expose an eventEmitter.on() function that allows one or more Functions to be attached to named events emitted by the object. Typically, event names are camel-cased strings but any valid JavaScript property key can be used.

When the EventEmitter object emits an event, all of the Functions attached to that specific event are called synchronously. Any values returned by the called listeners are ignored and will be discarded.

[Ref : nodejs.org](https://nodejs.org/api/events.html)

To use events in Node we need to include _events_ module, also we will need _util_ module for the inherit :

\[js\] var events = require('events'), util = require('util'); \[/js\]

Then  we init our _Observed_ object :

\[js\] var Observed = function() {}; \[/js\]

Now we need to inherit _EventEmitter_ Object from _events_ module :

\[js\] util.inherits(Observed, events.EventEmitter); \[/js\]

Next, defining our listner :

\[js\] var ob = new Observed(); ob.on('data', function(data) { console.log(data.message); }); \[/js\]

To fire the event all what we need is to emit an action :

\[js\] ob.emit('data', { message: "Hello world ! " }); \[/js\]

Full source :

\[js\] var events = require('events'), util = require('util'); var Observed = function() {}; var EventEmitter = events.EventEmitter; util.inherits(Observed, events.EventEmitter); var ob = new Observed(); ob.on('data', function(data) { console.log(data.message); }); setTimeout(function() { ob.emit('data', { message: "hello world" }); }, 1000); \[/js\]
