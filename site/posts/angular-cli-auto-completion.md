---
title: "Angular 14: CLI Auto completion"
date: 2022-06-12
categories: ["javascript", "angular"]
cover: "/images/angular-cli-auto-complete.PNG"
permalink: "/javascript/angular-cli-auto-completion/"
---

## Introduction
As Front-end Architect, choosing the right Framework can impact the whole company even the group, that’s why we choose carefully the technologies that we adopt.

For many years Angular prove how stable, it is, and when braking change happens, it will be accompanied by a great documentation.

Even there a tool to assist you when updating project. [``` ng update ```](https://angular.io/cli/update)

## Angular CLI auto completion

Bootstraping Component, Pipe and Service is a daily task when starting a new feature with Angular projet.
So we use ``ng`` command to generate our static files.

If you use VS Code or Intellij or any IDE there's extentions that execute ng generate command for you.
But if you want use the command line in your Terminal you will have hard time to remember the arguments to pass.

That's why Angular has introduce **CLI auto completion**

To use this feature on Winsows you need to activate WSL(Windows Subsystem for Linux) or Use GIT Bash.


![adding profile for windows](/images/ng-completion-1.PNG)

Double check if the command has added the command to the ``.bashrc``


![bashrc example](/images/ng-completion-2.PNG)


And than we can use TAB key to autocomplete, it's a bit slow on windows but it works.
![ng completion demo](/images/ng-completion-3.PNG)

We can go even further with the list of available flags.

![ng completion flags](/images/ng-completion-4.PNG)

## Conclusion

Tools make the life of developers easier, every improvement can affect their productivity. This makes us sometimes choose a framework among others in order to get a richer toolkit.



