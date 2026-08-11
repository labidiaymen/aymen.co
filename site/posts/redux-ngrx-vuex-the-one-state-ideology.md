---
title: "[Redux, NGRX, VUEX] The one State ideology"
date: 2018-05-17
categories: ["javascript", "redux", "rxjs"]
cover: "/images/the-state-id-aymen.co_-1.png"
permalink: "/javascript/redux-ngrx-vuex-the-one-state-ideology/"
---

Ahh, **Managing states**, how it was **awful** before the one State ideology.

Back in the days, we used to create a state for every **block** or area that get updated from the same place and does not know **anything** about the others blocks, or manually update the view and here we need also to update the state of the same block, what a mess. It's hard when you start **growing** your app using these techniques.

Then I discovered (forced myself to use) Redux or the one state manager, at the beginning I found myself writing more code than I usually do, creating the **actions**, the **reducers**, and the **effects** and so on.

And to create an action I need to pass by **many files** to do a single **interaction**, it was like another hell, but when the app starts growing I didn't feel _**exhausted**_ like before, when I wanna get some **data** I know **exactly how and where to find it**,  and also I can easily plug any other blocks into the apps I just need to connect it to the State manager and I get the access to all what I need, Isn't That cool?

But wait I'm an **Angular** Developer and Redux made for the **React** Community, well there's an implementation of **Redux** philosophy for Angular folks and it calls [NGRX](https://github.com/ngrx) and I used it in production and everything seems **alright**.

How about **Vue.js** developers? [Vuex](https://vuex.vuejs.org/en/) is the implementation of Redux for the Vue.js framework, I tried it and it does what I need.

> **Using a state Manager really helped me a lot and boost my skills and it reduced the development time.**

Forced your self to use it and feel the difference.

Did you try a State Manager **before**?
