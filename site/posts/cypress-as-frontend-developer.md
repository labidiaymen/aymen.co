---
title: "Cypress as Frontend developer"
date: 2018-09-09
categories: ["javascript", "angular"]
cover: "/images/cypress.jpg"
permalink: "/javascript/cypress-as-frontend-developer/"
---

As a **frontend** developer you will interact with **backend** developers more than you will interact with your family members, so keeping the good **relationship** is the main thing you need to **focus** on.

When everything goes right, everybody is happy, but when one thing goes wrong, not nesserely everybody should feel sad.

To keep the good relationship we need to remove all the **confusing** things from the workflow and **everybody should speak the same language**.

Let's pick a case that everybody will pass on :

You create a view with **Angular**, Vue or React, you consumed mock services and everything looks OK,

Then it comes the moment of truth when you will connect the frontend view with the backend service/**API**, you implemented it and it didn't work you will contact the backend developer and he will tell you that his service work like a charm.

You invite him to look at the result and he admitted that there's a **bug need to fix**.

After he fixes his code, two things can happen :

The bug fixed and everything goes right.

The bug persists and you show him the **scenario** again and we loop through this until we get everything OK, if we did not break other parts of the **App**.

That's Ok but, this takes time and energy.

Here's I start a searching for **automation**, then to end to end **testing**, to simulate everything, and here's my experience :

I found **[Cypress](https://www.cypress.io/)** and start writing my tests for my views and after each view or service **implementation**, then the worrying start decreasing.

With the (**e2e**) end to end testing, you stop worrying about **regression** and focusing on the new **functionalities** that need to implement.

With that, the relation between the front and back Team **start recovering**.

If the **test fails** I made a video of the issue and send it the concerned person, **otherwise** I invite him to watch the scenario fails ?

I start being less exhausted as a Front-end developer.

**Next step**, is to add the e2e test, to the **DevOps** pipeline.

And you, how are you dealing with the **regressions?**
