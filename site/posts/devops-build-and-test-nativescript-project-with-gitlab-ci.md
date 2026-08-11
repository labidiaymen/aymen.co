---
title: "[DevOps] Build and Test  Nativescript Project with Gitlab-CI"
date: 2018-05-19
categories: ["devops", "javascript"]
cover: "/images/devops-gitlab-ci-nativescript-aymen.co_-2.png"
permalink: "/devops/devops-build-and-test-nativescript-project-with-gitlab-ci/"
---

To get more things _**Done**_ we need more _**time**_, and to get more time there are things you **must** do, one of them is the **automation**.

Did you hear about _**DevOps**_? Yeah, me too, here's what **Amazon** says about :

**_DevOps is the combination of cultural philosophies, practices, and tools that increase an organization’s ability to deliver applications and services at high velocity_**

When I start coding in a new project the first thing I do is to prepare the git **repository**, there are many services allow you to host your repositories int they servers, the Famous one is **[Github](https://github.com/)** but you need a membership to host **private** repositories, like all developers I start looking for an Alternatives until I found [Gitlab](https://about.gitlab.com/) , There's an open source version (Community) and  I installed on my oven server but It took all of the **memory** that I have, so I stick with the hosting they provide.

Everything seems Ok until start working with **NativeScript** and **Angular** to build **mobile** Apps, in the **DEV** world there's always more than environment, at least we have a development environment and production environment when you are in dev environment, you can't know how your code or the plugin that you've just installed **gonna behave** or will it work in prod environment.

Here there are two main **roads**, build the application each time I add a NativeScript plugin or code for days then build the App and I found out if everything seems Ok, If not,  you maybe need to change some plugins and rewrite a **bunch of lines** of code.

_**The solution?**_

While browsing the web I found some services contain a CI into they names, like [CircleCI](https://circleci.com/) , [Travis CI](https://travis-ci.org/) , and others, I got curious until I got deep into the subject, And found out that these are tools for _**Continuous Integration**_ and delivery.

**_How does it work?_**

To Deliver a good product you need to do your **test** the app, by writing the unit tests or/and real humans **interaction**, you need to run your unit tests each time you add code to find out if you or somebody else broke the app.

Ok, but running tests and building each time in **your machine** will reduce the **performance** of your development environment, and for sure will make your nervous, How about building in somebody else machine? that's when I start looking for alternatives solutions, in the meanwhile **Gitlab** introduce the Continuous Integration **feature**, and it's for **FREE**.

Now when I (or anyone else in the same repository ) push a commit, Gitlab will run the test, build and generate an APK file (for Android) for me and show me If there are issues white building.

I will share with you how I've Done it.

You can achieve this **workflow** by adding .gitlab-ci.yml

<script src="https://gist.github.com/labidiaymen/27f0e2dd6f2de278ca68c550d89c78fb.js"></script>

Let's break this file down.

First, we created a **Job**, then we pull a [Docker](https://www.docker.com/) image that contains a fresh Installed version of **Android**.

Then we installed the **Node.js**, after that, we installed NativeScript, updating the Android SDK and installing Node modules with **NPM**.

When everything is done, we build the App with NativeScript CLI (command line tools).

In the build process of NativeScript we pass by the unit tests, if there's an error it will be thrown with an Exception.

If there's no error and everything is fine we will get our APK available to download, This all happens while you're writing your code in peace, you didn't stress your machine but you got visibilities about what's gonna happen when you build for production.

**Isn't a big deal? how do you think?**
