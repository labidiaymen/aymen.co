---
title: "Angular 14: Standalone components"
date: 2022-06-13
categories: ["javascript", "angular"]
cover: "/images/angular-standalone-component.PNG"
permalink: "/javascript/angular-standalone-components/"
---

##

At ReactConfg 2018 Event, Dan Abramov explained the Logo of React, he said that the user interface can be splitted into small independent units called components - similar to an Atom - and they will focus, in the next few years, on Hooks: “Electrons” as he named them.
 
On the other side of the Javascript world, Angular started focusing on smaller units as Component, Directive and Pipes rather than modules.
 
Starting from Angular 14, Components can be standalone and imported into modules or other components without the need for a dedicated module.

## Standalone Component in Action.

To test this feature, I created a blank project and activated the routing option.
 
Then, I created a basic component `UserDetailComponent ` , the metadata looks like the following.

<script src="https://gist.github.com/labidiaymen/2dd68d910b2d68e230ee15d2b66964ea.js"></script>

##
 
Then, created a service for the User.
For the sake of the demo, this service is not provided in the root `providedIn: 'root'`

<script src="https://gist.github.com/labidiaymen/5706440fbf88bf979b264b6413d90b36.js"></script>

So now, all we have to do is to use the service in the component. Before Angular 14, we had to create a module that defines all providers components and other dependencies or import everything in the `AppModule`.

Now, we can declare Components as standalone and provide the service directly into the Component
<script src="https://gist.github.com/labidiaymen/20ceddab8dbf00204621cd5c3e12f146.js"></script>

##

In the Route Module, we can directly import the component rather than the Module.

<script src="https://gist.github.com/labidiaymen/35fd2acb26b0577ddfaa4f1d1cf42ae1.js"></script>

##

[Github Srouce](https://github.com/labidiaymen/angular-standalone-components)

<!-- [Demo on Stackblitz](https://stackblitz.com/github/labidiaymen/angular-standalone-components) -->

You can play with the demo directly on Stackblitz

<iframe loading="lazy" style="width: 100%;height: 313px;" src="https://stackblitz.com/edit/github-vpsfla?embed=1&file=src/app/user-detail/user-detail.component.ts"></iframe>

## Motivation

Have you ever thought: why a framework like Angular started to review their vision about modularity?

In most Angular applications we are used to find some CoreModule, SharedModule and others that contain the common unit which is used in more than one module.


Everytime the application grows, there's a chance that these modules will grow too.

That's fine until we start thinking about performance.
 
In the chart below, we will demonstrate the use of a common NgModule and how to import a component directly inside another module without the middle man, Thanks to Angular 14 of course.

### Sharing standard component

![aa](/images/Angular-14-Standalone-components-1.drawio.png)
##
In this case we have three components, two services and more than two modules.

These units are used in more than one place, so we created a ``SharedModule`` to package them.
This ShareModule has been imported in the two modules.
 
When lazyloading the module with LazLoading routes, the SharedModule alongs with the components and services and every unit exported, will be loaded in each module.

### Sharing standalone component

![aa](/images/Angular-14-Standalone-components-2.drawio.png)

##

In this case we have the same unit (components, pipes, services and modules) but we ditched the SharedModule.

We transformed the component in Standalone mode, which means that every component will load the needed providers.

The ``FormatDatePipe`` load the ``DateTimeService`` and ``DocumentViwerComponent`` load ``DocumentService``.

Now When lazyloading a Component, only the component that is directly linked to it will be loaded.

### Conclusion

Angular started approaching ReactJS with the small independent unit approach by introducing Standalone Component, which seems a big step toward enhancing web application performance and building a better and more maintainable web.

Personally, I'm not fan of the idea of working with only one Framework, since we can explore multiple paths at the same time then adopt what was a success in each Framework.
