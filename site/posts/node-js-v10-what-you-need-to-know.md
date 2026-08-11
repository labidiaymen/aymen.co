---
title: "Node.js v10 What you need to know"
date: 2018-05-23
categories: ["javascript", "node-js"]
cover: "/images/node.js-10-aymen.co_-1.png"
permalink: "/javascript/node-js-v10-what-you-need-to-know/"
---

**Node.js** 10 IS here, and here's what you need to know:

**HTTP/2**

Node.js has stabilized the Http2 **protocol** and there are already **frameworks** that support it, right now, like [**Koa**](https://koajs.com/) (Made by TJ Holowaychuk who's also made Express.js), [**Hapi.js**](https://hapijs.com/) and also [**Express.js**](http://expressjs.com/fr/) using [**express-http2-workaround**](https://www.npmjs.com/package/express-http2-workaround) middleware.

**Enhanced support for ESM modules**

As we know Node.js has it's own module system (**[CommonJS](http://requirejs.org/docs/commonjs.html)**), but it's not quite common as it only supports Node **environment** so you can't run CommonJS file in the **browser**.

[**ECMAScript**](https://en.wikipedia.org/wiki/ECMAScript) 6 brought us a **module system** to JavaScript and Node.js 10 support it.

**N-API**

Node.js has introduced N-API in the Node v8 release AND now it's **Stable**. And if you don't already know what N-API is :

It is intended to insulate Add-ons from changes in the underlying JavaScript engine and allow modules compiled for one version to run on later versions of Node.js without recompilation.

**NPM ? Node.js**

How come Node get updated and **NPM** not?  NPMJS has realized also a new version and _**I personally like it**_, and it comes with:

- **Security**, security, and security.
- A new **command** to find security **vulnerabilities** `npm audit`
- Optimizations for **continuous integration** (CI)
- ...

**New methods (will cover some)**

- [**Console.table**](https://nodejs.org/api/console.html#console_console_table_tabulardata_properties) and it displays tabular data as a table and I LOVE it
- The Argument`(e)` in `try {} catch(e)` {} is now optional
- ...

 

**Finally the Deprecations**

- Using `require()` to access several of Node.js' own internal dependencies will emit a runtime deprecation.
- Use of non-string values for `process.env` has been deprecated in the documentation.
- The `enroll()` and `unenroll()` methods have been deprecated.

 

For further **details**, you can check Node.js **announcement** [Node v10.0.0](https://nodejs.org/en/blog/release/v10.0.0/)
