---
title: "[My experience] The marriage of Angular and NativeScript"
date: 2018-05-25
categories: ["angular", "javascript", "nativescript"]
cover: "/images/angular-nativescript-aymen.co_.png"
permalink: "/angular/my-experience-the-marriage-of-angular-and-nativescript/"
---

**Building** apps can cost you Time and Money if you don't know which technologies you need to use, which is maintainable and which is scalable.

We all agreed that **hybrid apps** do not cost much, but when it comes to **performance** you need to be **careful**.

[**PhoneGap**](https://phonegap.com/) open's the door for **JavaScript** and HTML/CSS to enter the **mobile** world, then Apache Cordova (which is a fork from PhoneGap) Then it's comes the famous [Ionic](https://ionicframework.com/) which is [**Angular**](https://angular.io/) Framework build for [Cordova](https://cordova.apache.org/) platform.

But the performance was **not quite good**, and sometimes not acceptable at all.

So as Always I start for **Alternatives**, there's **Xamarain** with C# (I'm Sorry I'm not a C# developer). I moved on and I found [**ReactNative**](https://facebook.github.io/react-native/) And [NativeScript](https://www.nativescript.org/), I choose the second because I'm an **Angular** developer.

**Initially**, NativeScript lets developer create Native **mobile views** and using Javascript as **Code behind**, then They introduced building apps with Angular, which helps the Angular developer to give a try the mobile development.

**Personally**, I didn't try NativeScript with Angular.js, the first app I've Made is with **Angular2+**.

As I mention the **layout rendering** is Good and fluid, but I've got some complication when using Nativescript:

 

**Garbage Collector (Android Only)**

We all know that **Angular output** is quite big than a plain Javascript app. when exploring the app that I've made, I experience a random UI freeze, and it's remarkable and it affected the user experience.

After an Investigation, I found that the JavaScript GC(Garbage Collector) triggered when no more RAM is available and that causes the freeze ( from 0.5s to 2ssecondsd on Angular). After many issues opened on Github [Panayot Cankov](https://github.com/PanayotCankov) wrote a blog ([Deep Dive into NativeScript 3.1 Performance Improvements](https://www.nativescript.org/blog/deep-dive-into-nativescript-3.1-performance-improvements) ) about performance and **explained** why and when this issue happens.

Then in the **announcement** of NativeScript 3.2 ([Announcing the Release of NativeScript 3.2](https://www.nativescript.org/blog/announcing-the-release-of-nativescript-3.2)) they introduce an experimental flag `"markingMode": "none"` for Android, I Tired and the freezes are gone.

**Launch Time**

Using Angular with NativeScript will affect the launch time **especially on Android**, and it will take longer than **[Vanilla Javascript](http://vanilla-js.com/)** .

Using [**Webpack**](https://webpack.js.org/) to **minify and uglify** speed up the App, but when I tried the **Snapshot** flag(Just for Android) I felt the difference.

So what's [**Snapshot**](https://v8project.blogspot.bg/2015/09/custom-startup-snapshots.html)?

It's a **previously prepared** JavaScript **context**. Instead of fetching, parsing, and executing scripts on every startup, the NativeScript _**Android runtime**_ looks for a previously prepared binary file that is the result of those tasks, to reduce the amount of time it takes for your app **to get up and running**.

 

_**Angular 2+**_ is very structured and it _has **clean Architecture patterns**_ and it helps you build a _**scalable application**_ without **struggling.**

 

**Conclusion**

I found that **NativeScript and Angular is a successful marriage** and I hope it continues.

Other **opinions**? leave a comment.
