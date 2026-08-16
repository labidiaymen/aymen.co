---
title: "NODE.JS 4 CLASSES"
date: 2015-10-18
categories: ["log"]
permalink: "/log/node-js-4-classes/"
---

ES6 classes are not something new, they mainly provide more convenient syntax to create old-school constructor functions.

We also use es6 string template in the example :

\[js\] 'use strict'

class Person{ constructor(p){ this.name = p.name; this.lastname = p.lastname; }

fullName(){ return \`${this.name} ${this.lastname}\` } }

console.log( new Person({ name : "Aymen", lastname : "Labidi" }).fullName() );

\[/js\]

 

  Classic class and subclass example :

 

\[js\] class Point { constructor(x, y) { this.x = x; this.y = y; } toString() { return \`(${this.x}, ${this.y})\`; } }

class ColorPoint extends Point { constructor(x, y, color) { super(x, y); this.color = color; } toString() { return super.toString() + ' in ' + this.color; } } \[/js\]
