---
title: "Node.js 4 generators"
date: 2015-10-16
categories: ["log"]
permalink: "/log/node-js-4-generators/"
---

Node.js version 4 contains V8 v4.5 shipped with a raft of new ES6 features that are enabled by default including block scoping, classes, typed arrays (Node's Buffer is now backed by Uint8Array), generators, Promises, Symbols, template strings, collections (Map, Set, etc.) and, new to V8 v4.5, arrow functions.

Example of using generators :

\[js\]

'use strict' var unirest = require('unirest'), co = require('co');

co(function\*(){ console.log("Start loading www.google.tn"); yield loadGoogle().then(function(body){ console.log(body); }); console.log("end");

}).catch(function(err){ console.log(err.stack) });

function loadGoogle(){ var deffered = Promise.defer(); unirest.get('http://www.google.tn/') .end(function (response) { if (response.statusCode == 200) { deffered.resolve(response.body); }else{ deffered.reject(err); } }); return deffered.promise; }

\[/js\]
