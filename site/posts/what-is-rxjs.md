---
title: "What is RxJS?"
date: 2017-01-06
categories: ["javascript", "rxjs"]
cover: "/images/reactive-js-thmb-1.jpg"
permalink: "/javascript/what-is-rxjs/"
---

> RxJS it's **Reactive Extensions for JavaScript** , you can treat **events** as collections and you can manipulate these sets of events with **operators.**

More details about Reactive programming : [What is Reactive programming ?](https://aymen.co/javascript/what-is-reactive-programming/)

RxJS is like Lodash or Underscore for async, because you can treat all events as a set.

When working with RxJS you will use Observables :

> **Observable** streams or sets of **zero or n things** over any amount of **time**

Huh ?!

They're lazy, and cancelable.

You didn't understand anything ? yeah me too, let's break it up

When working with JavaScript we usually do some **Synchronous** code using **callbacks** and it's easy to get to the **callback-hell** case, so what are callbacks and what the hell is the callback-hell :

**What are callbacks ? **

> A callback function is a function which is passed as an argument to another function, and,is invoked after some kind of event

Example of callback :

getData('/api/users', function(err, data) {  
    console.log('users object:', data);
});

And here's the callback-hell :

getData(function(a){  
    getMoreData(a, function(b){
        getMoreData(b, function(c){ 
            getMoreData(c, function(d){ 
                getMoreData(d, function(e){ 
                    ...
                });
            });
        });
    });
});

As you can see, this code is hard to maintain so to avoid this we usually use **Promises .**

## What are promises ?

> Promises are read-only view to a single future value.

- They have success and error semantics via .then()
- They are not lazy.
- They also have mapping semantics,
- Immutable
- Will be resolved or rejected and only once.

getData().then(function(){
	// resolved
}, function(){
	// rejected
});

That's what a **Promise** is.

Ok the why we you use **RxJS** and in witch cases?:

We have in **modern web application** that the five most common will you run into :

- Ajax  calls
- User events like mouse clicks mouse movements , keyup ...
- Animations
- Sockets
- Workers (JavaScript running in the background, without affecting the performance of the page)

Only one of these are works well with single value, it's **Ajax**.

## So how about a cancelable streams?

RxJS Observables provide a feed, so that you can receive data from the same object multiple time,so Observables work like streams of data.

So when we use Observable we stream data over events and we can cancel to stop receiving data over the stream.

## What are Observables ?

Observables are just function, there's no deep magic inside of them.

to receive data from Obeservables we need to subscribe to them, and if we want to stop receiving data we call unsubscribe method or compete() to end the stream.

If error, complete, unsubscribe, the observer is done and it will die.

Here's an example:

var source = Rx.Observable.create(function (observer) {
  // Yield a single value and complete
  // here we pass the data
  observer.onNext("Jhon");
  observer.onCompleted();

  // Any cleanup logic might go here
  return function () {
    console.log('unsubscribe');
  }
});

var subscription = source.subscribe(
  function (x) { console.log('name: %s', x); },
  function (e) { console.log('onError: %s', e); },
  function () { console.log('onCompleted'); });
// we can unsubscribe when we are done with the stream
subscription.unsubscribe();

But wait don't Rx everything,  Rx is a domain-specific language, it's take a while to learn it.

You need to think about your Goal and you think about what all of your event streams that you'r going to read to reach your Goal, to build together like Lego pieces to get that Goal.

> A value that changes over Time, it' can be represented as an Observable
