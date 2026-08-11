---
title: "The power of lodash"
date: 2016-01-05
categories: ["log"]
permalink: "/log/the-power-of-lodash/"
---

A JavaScript utility library delivering consistency, modularity, performance, & extras.

 - Source : lodash.com

In production life, it's a waste of time doing what is already done. In javascript we have a pretty cool  library called "Lodash" it's tiny and smart, let's see how :

Example :

Really famous routine, removing an element from simple Javascript Array

Native javascript :

\[js\] for (var i = 0; i < tagContainer.length; i++) { if (tagContainer\[i\] == removedTag) { tagContainer.splice(i, 1); break; } }; \[/js\]

 With lodash : 

\[js\] \_.pull(tagContainer ,removedTag); \[/js\]

How about assigning/getting a value to an element using a string as a name/key?

\[js\] var user = {}; \_.set(user,'fullname.name', 'Aymen' ); // get name \_.get(user,'fullname.name'); // Aymen \[/js\]

Download : [lodash.com](https://lodash.com/)
