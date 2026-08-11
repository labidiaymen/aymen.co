---
title: "A NativeScript plugin that works - Making a NativeScript plugin"
date: 2018-01-17
categories: ["javascript", "nativescript"]
permalink: "/javascript/a-nativescript-plugin-that-works-make-a-nativescript-plugin/"
---

Before that this pass through my mind I lost a half day searching for plugin to JUST works without any additional tricks to continue my journey, but I didn't, so that's why I created this plugin and I call it "A NativeScript plugin that works", just kidding I call it "nativescript-google-places-autocomplete".

In the current app that I'm working on with a Client, we just want to display autocomplete a search input, with list of place predictions so I tried some plugins and some vanilla Javascript code (not good for code maintainability) but no, I choose to create my own plugin and share it with the community.

To start off I need a kickstart project or file structures, I never start a project with plain files, it took times to implement the essential need, so I found a seed project (That I contributed to it[????](https://www.google.tn/url?sa=t&rct=j&q=&esrc=s&source=web&cd=8&ved=0ahUKEwjJjriVmd_YAhWEOxQKHV7WAC4QFgg8MAc&url=https%3A%2F%2Femojipedia.org%2Fsmiling-face-with-open-mouth-and-smiling-eyes%2F&usg=AOvVaw3FsYUcJ_jXLdva7w3mRdau)) on the Nativescript GitHub account: [https://github.com/NativeScript/nativescript-plugin-seed](https://github.com/NativeScript/nativescript-plugin-seed)

Then I created my own API key and I start implementing my own things.

![](https://aymen.co/wp-content/uploads/2018/01/Capture-d’écran-2018-01-17-à-15.31.37.png)

So we will work on some of these files, all files are generated from the seed except this one

> google-places-autocomplete.static.ts

This file holds static variable to keep the structure and the code clean.

Ok,

> google-places-autocomplete.android.ts
> 
> google-places-autocomplete.common.ts
> 
> google-places-autocomplete.ios.ts

when we have a common functionality between iOS & Android, we put in: _google-places-autocomplete.common.ts, _otherwise we implement each file with the platform needs.

> google-places-autocomplete.android.ts
> 
> google-places-autocomplete.common.d.ts
> 
> google-places-autocomplete.ios.d.ts

These files are auto-generated with Typescript and hold the types & definition of the TS files.

So all work will be on the _google-places-autocomplete.common.ts_ file because we will use the Nativescript modules that support both of the platforms and here's our file.

First, let's _import_ the module that we will use

![](https://aymen.co/wp-content/uploads/2018/01/Capture-d’écran-2018-01-17-à-17.13.45.png)

The plugin does two things, search places from a query, and display place detail from place id.

![](https://aymen.co/wp-content/uploads/2018/01/Capture-d’écran-2018-01-17-à-17.13.55.png)

![](https://aymen.co/wp-content/uploads/2018/01/Capture-d’écran-2018-01-17-à-17.14.04.png)

In this two functions, we did two simple requests (using HTTP module from nativescript) to the google places API

Here's the final product and to know more about the module or to check to demo go to this link: [https://github.com/labidiaymen/nativescript-google-places-autocomplete](https://github.com/labidiaymen/nativescript-google-places-autocomplete)

 

![](https://user-images.githubusercontent.com/3775924/35034560-e0519724-fb6e-11e7-857c-0caaa6499d6a.gif)

This package is hosted on npmjs.com

![](https://badge.fury.io/js/nativescript-google-places-autocomplete.svg)

[https://www.npmjs.com/package/nativescript-google-places-autocomplete](https://www.npmjs.com/package/nativescript-google-places-autocomplete)

**Hope it helps, ****thanks**
