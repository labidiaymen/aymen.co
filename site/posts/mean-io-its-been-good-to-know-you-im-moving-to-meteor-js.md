---
title: "Mean.io it’s been good to know you, i’m moving to Meteor.js"
date: 2016-03-29
categories: ["thoughts"]
cover: "/images/meteor.png"
permalink: "/thoughts/mean-io-its-been-good-to-know-you-im-moving-to-meteor-js/"
---

I have been  using Mean.io for 7 months building scalable application, i followed the default package system of mean.io and it seemed organased.

The application like other app has a backoffice and admin panel, i used the built-in role system to seprate the admin from the users.

And the first problem was : The packages(modules) name are public, Mean.io load all the modules name whether logged or not using this url (/\_getModules)

The second is by accessing to this link (/api/admin/menu/admin) you can know which are the admin modules and the users modules.

**Mean.io** loads everything he needs to the client browser then he manages everything, it's really great to use this strategy but the app will be vulnerable if standard users can see the admin modules and know how to access to them.

Then i Found **Meteor.js**.

**Meteor** is a complete platform for building web and mobile apps in pure _JavaScript_. ([https://www.meteor.com](https://www.meteor.com))

Why i moved to **Meteor.js** ?

_**Metoer**_ is using DDP, the Distributed Data _Protocol , why ? _

**DDP** is a simple _protocol_ for fetching structured data from a server, and receiving live updates when that data changes.

Still don't get it ? Meteor synchronise your data (mongodb collections ...)  between the server and the client and it handle everything by itself.

** Socket.io** Meteor use socket.io than Http requests and all of us know that socket.io is so much faster than Http requests.

**Meteor.****i****sServer** **and**** Me****teor.****isClient**,__ you will use this if you will build one file app, in the same file you can define wich code will run on server and wich code will run on the client, and there's other ways relieve you from using this method.__

**Structure** with Meteor  you can define your file structure, you can use one file to build your app or use known folders name, Ok how? when we create a **client** folder, Meteor will considaret that all file in this folder belongs to the client, also with the server, when we create a s**erver** folder Meteor will considaret that all file in this folder belongs to the server.

**Collections** Metoer use Schema to define collections, when you put them in a folder named **collections  **Meteor will run these files on both side, on the server and the client.

**Atmospherejs** Metoer has a greet community that already built a banch modules that let you kicksatrt your project,

these module are hosted on [atmospherejs.com](http://atmospherejs.com)

**Conclusion**

Meteor is much more richer than you think and you can build and maintain scalable web and mobile applications with it.![meteor](http://aymen.co/wp-content/uploads/2016/03/meteor-300x187.png)
