---
title: "Hybrid mobile framework - NativeScript, Ionic, ReactNative"
date: 2018-01-15
categories: ["angular", "ionic", "javascript", "nativescript"]
permalink: "/angular/hybrid-mobile-framework-nativescript-ionic-reactnative/"
---

Nowadays if you wanna make a low budget mobile App, definitely you will pass by one of the hybrid mobile application frameworks, let's cite some :

**Ionic**, any web developer wants to make a mobile app he will occur this framework, why?, because Ionic is built on top of [Apache Cordova](https://cordova.apache.org/) using [Angular](https://angular.io/) and WebView, the Ionic team made Ionic1 with Angularjs 1.\* and the Ionic 2&3 with Angular 2+, to know more: [ionicframework.com  ](https://ionicframework.com)

**Nativescript** (my favorite one, keep reading to know why): _is how you build cross-platform, native iOS and Android apps without web views._ ([https://www.nativescript.org/about](https://www.nativescript.org/about)), with Nativescript you get access to native APIs via JavaScript, also you can use [npmjs.com](https://www.npmjs.com/) packages, CocoaPods(iOS) and Gradle (Android) _I will explain how (next article)_.

**Xamarin** I didn't use it until now but here's what they said about it: _Xamarin's_ mobile application development platform with native user interfaces enables sharing of code across all platforms with a single C# codebase ([www.xamarin.com/platform](https://www.xamarin.com/platform))

**ReactNative** made by Facebook based on React.js philosophies same like Nativescript but it required some Objective-C or Swift for iOS and/or Java for Androids skills to write Bridge, (ReactNative Bridge) and that's the main difference between Nativescript and ReactNative, the first does not require to write bridges the second does.

> _If you know other mobile frameworks put them in comments ..._

There are two main sides, the first side has **Nativescript & Reactnative & Xamarin** and the other side has only **Ionic,** the first use Native UI like UILabel(iOS) TextView(Android) with single XML tag [_text-view_](https://docs.nativescript.org/cookbook/ui/text-view) the other side use WebView (HTML input & tags) which make the first side much better and smoother for complex UI even hot performance for simple UI.

And of course, I definitely choose native UI  over Web UI.

 

Let's talk about why I choose **Nativescript** and talk about my **experience**.

Android & iOS, each mobile platform has its own ecosystem and offers completely different development tools and languages, in order to translate JavaScript code to the corresponding native APIs so they made a runtime for each platform, let's call it **the Bridge**

Let's take an example, if we want to use [sentry.io](https://sentry.io/) (Open-source error tracking) to track bugs on mobile devices in real-time, we can use this plugin [npmjs.com/package/nativescript-sentry.io](https://www.npmjs.com/package/nativescript-sentry.io) which is hosted on [npmjs](https://www.npmjs.com/) and immediately we can start using it in Javascript or Typescript.

So how this plugin made?

This plugin adds some **dependencies** with Gradle in Android And CocoaPods in iOS, and with **The bridge,** we can immediately start using them in plain Javascript code without any tweaks,(_**that's the main part**_ why I love Nativescript over all other platforms/frameworks) then we have the implementations parts wich done with javascript, no other languages or skills required .

### **My Experience**

**The Garbage collector**: I wrote two application with NativeScript one of them is in production right now, with iOS always works like charm but the Android version with google machine V8 I've got some lags, and that because the synchronisation between garbage collector of the JavaScript and the garbage collector of Java (GC), they announce a fix for that on the version 3.2 of Nativescript ([Announcing the Release of NativeScript 3.2 & New Experimental GC Mode for Android](https://www.nativescript.org/blog/announcing-the-release-of-nativescript-3.2)), they add an experimental flag and it solves the lags for now.

**Google maps:** Also when I used Google maps plugin I had some issues, one of them is (Of course it works like a charm on iOS, I got the issue on Android) when you create a page that contains a Google map card and you enter to a child route (i'm using Angular with Nativescript) and you press back button the app crash, so I switch to MapBox.

I started making plugins for Nativescript, you can follow them at [Github.com/labidiaymen](https://github.com/labidiaymen)

If you wanna contribute to this articles or to one of my plugins you can make a comment or you can reach me: labidi{at}aymen.co

**Thanks**
