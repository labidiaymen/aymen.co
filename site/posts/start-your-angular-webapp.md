---
title: "Start your Angular WebApp"
date: 2017-01-03
categories: ["angular", "javascript"]
cover: "/images/Start-your-angular-webapp-thumb2.jpg"
permalink: "/angular/start-your-angular-webapp/"
---

To learn more about Angular : [Angular4 ? Where’s the version 3 ? why the hurry ?](https://aymen.co/javascript/angular-4-wheres-the-version-3-why-the-hurry/)

Let's start :

These steps are for discovering how the Angular work.

To run Angular 2, we depend on these four libraries:

- core-js
- zone.js
- reflect-metadata
- SystemJS

**CoreJS ES6 Shim**

ES6 provides shims so that legacy JavaScript engines behave as closely as possible to ECMAScript 6. This shim isn’t strictly needed for newer versions of Safari, Chrome, etc. but it is required for older versions of IE.

**Zone.js**

A library used by Angular, primarily for detecting changes to data. (If you’re coming from Angular 1, you can think of zones as an automatic version of $digest.)

**Reflect Metadata**

Angular itself was written in Typescript, and Typescript provides annotations for adding metadata to code. Roughly speaking, the reflect-metadata package is a polyfill that lets us use this metadata.

Find more about TypeScript : [What is Typescript ? it’s worth learning ?](https://aymen.co/javascript/what-is-typescript-its-worth-learning/)

First let's create our **index.html** to host the App:

<!doctype html>
<html>
<head>
	<title>Our first Angular App </title>
</head>
<body>
</body>
</html>

 

Then we need to include the libraries, add the following inside your:

<script src="node\_modules/core-js/client/shim.min.js"></script>
<script src="node\_modules/zone.js/dist/zone.js"></script>
<script src="node\_modules/reflect-metadata/Reflect.js"></script>
<script src="node\_modules/systemjs/dist/system.src.js"></script>

we’re loading these .js files directly from node\_modules directory (where Node.js install packages), so we need to install them.

npm install core-js zone.js reflect-metadata systemjs

Our index.html should look like :

<!doctype html>
<html>
<head>
	<title>Our first Angular App</title>
	<script src="node\_modules/core-js/client/shim.min.js"></script>
	<script src="node\_modules/zone.js/dist/zone.js"></script>
	<script src="node\_modules/reflect-metadata/Reflect.js"></script>
	<script src="node\_modules/systemjs/dist/system.src.js"></script>
</head>
<body>
</body>
</html>

Now we need to define our Angular app, so let's create a file called app.ts ( .ts for TypeScript files)

import { NgModule, Component} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

 @Component({
 selector: 'hello-angular',
 template: \`
 <div> Hello Angular developers</div>
 \`
 })
 class HelloAngular {
 }

 @NgModule({
 declarations: \[ HelloAngular \],
 imports: \[ BrowserModule \],
 bootstrap: \[ HelloAngular \],
 })
 class HelloAngularAppModule {}

 platformBrowserDynamic().bootstrapModule(HelloAngularAppModule);

Wow what was that ?

Don’t worry. We’re going to walk through it step by step :

The _import_ statements define the modules we want to use to write our code, in this case we’re importing  **_NgModule_**, **_Component _** from the module "**@angular/core**", **_BrowserModule  _**from the module **"@angular/platform-browser**" and  **_platformBrowserDynamic_** from the module "**@angular/platform-browser-dynamic**".

> import { _**things**_ } from _**wherever **_is called destructuring and it's a feature provided by ES6

Now we need a **Component**, a what ? yes a Component : One of the big ideas behind Angular 2 is the idea of components.

So what's a component ?

The idea behind components is that when we create a component we teach the browser new tags that have new functionality, example : <login></login>

> If you have a background in **Angular 1**, Components are the new version of **directives**.

Acctualy we already created a one :

<hello-angular></hello-angular>

So how do we actually define a new Component?

A basic Component has two parts:

-  A Component annotation
-  A component definition class

A Component annotation ? What is going on here?

If you’ve been programming in JavaScript for a while then this next statement might seem a little weird:

@Component({
 ...
})

If you have a Java background it may look familiar to you: they are **annotations**.

Think of **annotations** as metadata added to your code. When we use **@Component** on the HelloAngular class, we are “**decorating**” the HelloAngular as a Component. We want to be able to use this component in our markup by using a tag.

To do that we configure the **@Component** and specify the selector as hello-angular.

@Component({
 selector: 'hello-angular'
})

Each component has a template, and we can add a template to our @Component by passing the _template_ option like :

@Component({
	selector: 'hello-angular',
	template: \`
	<div>
	Hello Angular developers
	</div>
	\`
})

> Notice that we’re defining our template string between backticks (\` … \`). This is a new  feature of ES6 that allows us to do multiline strings.

now what ? run the app.

To run our application, we need to do two things:

- we need to tell our HTML document to import our app file
-  we need to use our <hello-angular> component

<!doctype html>
<html>
<head>
<title>Our first Angular App</title>
<script src="node\_modules/core-js/client/shim.min.js"></script>
<script src="node\_modules/zone.js/dist/zone.js"></script>
<script src="node\_modules/reflect-metadata/Reflect.js"></script>
<script src="node\_modules/systemjs/dist/system.src.js"></script>
 </head>
 <body>
 <script>
 System.import('app.js')
 .then(null, console.error.bind(console));
 </script>

 <hello-angular></hello-angular>

 </body>
 </html>

Since our application is written in TypeScript, we used a file called **app.ts**. The next step is to **compile** it to JavaScript, so that the browser can understand it.

If you don't have TypeScript complier you can install it from **NPM** (node package mannger):

npm install -g typescript

Create a new file that hold typescript configurtaion : tsconfig.json

{
  "compilerOptions": {
    "target": "ES5",
    "module": "system",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false
  },
  "exclude": \[
    "node\_modules"
  \]
}

Then run on the root folder of our application

tsc app.ts

Also we need to add SystemJS config file (don't worry about this file)

System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node\_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            // other libraries
            rxjs: 'node\_modules/rxjs'
        },
        packages: { 
             rxjs: { defaultExtension: 'js' },       
          app: {
            format: 'register',
            defaultExtension: 'js'
          }
        }
      });

Now add the systemjsconfig.js file to our index.html

<!doctype html>
<html>
<head>
<title>Our first Angular App</title>
<script src="node\_modules/core-js/client/shim.min.js"></script>
<script src="node\_modules/zone.js/dist/zone.js"></script>
<script src="node\_modules/reflect-metadata/Reflect.js"></script>
<script src="node\_modules/systemjs/dist/system.src.js"></script>
 </head>
 <body>
<script src="resources/systemjsconfig.js" > </script>
 <script>
   
 System.import('app.js')
 .then(null, console.error.bind(console));
 </script>

 <hello-angular></hello-angular>

 </body>
 </html>

Last things we need to install angular modules and a webserver

npm install live-server -g

npm install @angular/core @angular/common @angular/compiler @angular/platform-browser @angular/platform-browser-dynamic

 

Finnaly run then App

live-server

![hello-angular](https://aymen.co/wp-content/uploads/2017/01/Hello-Angular.png)

### Source on

###  [![github](https://aymen.co/wp-content/uploads/2017/01/github.jpg)](http://aymen.co/l/wwSpWa)

 

 

**Lazy ? try [Angular CLI](http://aymen.co/l/IKMiYd)**

If you have any corrections you can pull a request on GitHub : [Start your Angular WebApp on GitHub](https://github.com/labidiaymen/aymen.co/blob/master/javascript/start-your-angular-webapp.md)
