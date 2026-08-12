---
title: "What is Reactive programming ?"
date: 2017-01-05
categories: ["javascript"]
cover: "/images/reactive-programming-thumb-1.jpg"
permalink: "/javascript/what-is-reactive-programming/"
---

> **Reactive programming** is learning to program completely around **synchronous** data **streams**

## So what the deference between Imperative programming and Reactive programming ?

Imperative programming focuses on the order in witch computer does things, Reactive programming only care about order in witch thing need to happen, they are written ignorant of the time and context in witch they are run.

If you are a Front-end developer, you probably already wrote a reactive code without even realizing it, YES, DOM events like key-press wait for stream of input data and respond accordingly .

> **Reactive programming** is completely different from the **sequential work flow**. They **react** when something is done.

Let's take an example from  Rx(Reactive-Extensions) : The **_combineLatest _**operator combine the latest expression is used to synchronize 2 **Observable streams** into single Observable stream.

The **Combine Latest** doesn’t using queue, as it name suggest it only remember the latest value of each stream.

 

![reactive-programming](/images/reactive-programming-1.jpg) We can see that when the **y stream** observed the **b** value, the **result stream ****combine** it with the **latest** value observed on **x stream** (3) and latter the same value will be **combine** into the result stream when the **x stream** will **observed** the **4** value.

The **Combine Latest** processing will come to end either when one of the stream

will **complete** or **throw exception,** in this case y Stream run **complete**(**onComplete** before **RxJS5**)

\---

## Did you feel lost ?

I felt the same thing the first time i read about reactive programming and RxJS, the hardest part of the learning journey is **thinking in Reactive**. It's a lot about letting go of old imperative and stateful habits of typical programming, and forcing your brain to work in a different paradigm.

What about you? it worth learning nowadays ?

 

If you have any corrections you can pull a request on GitHub : [What is Reactive programming ? on GitHub](https://github.com/labidiaymen/aymen.co/blob/master/javascript/what-is-reactive-programming.md)
