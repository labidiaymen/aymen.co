---
title: "React fiber [work in progress]"
date: 2017-03-31
categories: ["javascript", "react"]
cover: "/images/react-fiber2.jpg"
permalink: "/javascript/react-fiber-work-in-progress/"
---

> **React Fiber** is  **complete rewrite for ReactJS **shipped with a new reconciliation algorithm.

So what the strongest feature of the React fiber

React **Fiber** is different in how it manages the update, to dig deep, it split the updates in two main parts:

**High priority tasks**: it when are you typing: in this case we need immediate feedback.

**Low priority tasks**: when it comes to network request

 

**Fiber** has enhanced the user experience by letting the interaction with the user inputs **high priority**.

To make this happened, react fiber come with **two phases**:

**Render:** the magic function in react world, it can be interrupting.

**Commit:**  it's not interruptible

 

Ok when the Fiber interrupt a render phase, where it goes?

It’s goes to the **requestIdleCallback** this api manage the low priority function to be called during an **idle** period.

With these features we notice that React has a smarter **algorithms and api**.

**React fiber is not ready yet** but it could be the **next version** of Reactjs and the new foundation of react.

You can follow the state here : [isfiberreadyyet.com](http://isfiberreadyyet.com/)

 

**Another** thing worth mentioning that the Fiber can render **multiples components**, also it's written in [**flow**](https://flow.org/) to make change with more confidence.

Have  you tried React Fiber ? if yes , share your experience with us

> **This is a work in progress. If you know something about this topic please feel free to contribute to this article**
