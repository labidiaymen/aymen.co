To learn more about Angular : <a href="https://aymen.co/javascript/angular-4-wheres-the-version-3-why-the-hurry/" target="_blank">Angular4 ? Where’s the version 3 ? why the hurry ?</a>

Let's start :

These steps are for discovering how the Angular work.

To run Angular 2, we depend on these four libraries:
<ul>
 	<li>core-js</li>
 	<li>zone.js</li>
 	<li>reflect-metadata</li>
 	<li>SystemJS</li>
</ul>
<strong>CoreJS ES6 Shim </strong>

ES6 provides shims so that legacy JavaScript engines behave as closely as possible to ECMAScript 6. This shim isn’t strictly needed for newer versions of Safari, Chrome, etc. but it is required for older versions of IE.

<strong>Zone.js</strong>

A library used by Angular, primarily for detecting changes to data. (If you’re coming from Angular 1, you can think of zones as an automatic version of $digest.)

<strong>Reflect Metadata</strong>

Angular itself was written in Typescript, and Typescript provides annotations for adding metadata to code. Roughly speaking, the reflect-metadata package is a polyfill that lets us use this metadata.

Find more about TypeScript : <a href="https://aymen.co/javascript/what-is-typescript-its-worth-learning/" target="_blank">What is Typescript ? it’s worth learning ?</a>

First let's create our <strong>index.html</strong> to host the App:
<pre class="lang:markup">&lt;!doctype html&gt;
&lt;html&gt;
&lt;head&gt;
	&lt;title&gt;Our first Angular App &lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
&nbsp;

Then we need to include the libraries, add the following inside your:
<pre class="lang:markup">&lt;script src="node_modules/core-js/client/shim.min.js"&gt;&lt;/script&gt;
&lt;script src="node_modules/zone.js/dist/zone.js"&gt;&lt;/script&gt;
&lt;script src="node_modules/reflect-metadata/Reflect.js"&gt;&lt;/script&gt;
&lt;script src="node_modules/systemjs/dist/system.src.js"&gt;&lt;/script&gt;</pre>
we’re loading these .js files directly from node_modules directory (where Node.js install packages), so we need to install them.
<pre class="lang:javascript">npm install core-js zone.js reflect-metadata systemjs</pre>
Our index.html should look like :
<pre class="lang:markup">&lt;!doctype html&gt;
&lt;html&gt;
&lt;head&gt;
	&lt;title&gt;Our first Angular App&lt;/title&gt;
	&lt;script src="node_modules/core-js/client/shim.min.js"&gt;&lt;/script&gt;
	&lt;script src="node_modules/zone.js/dist/zone.js"&gt;&lt;/script&gt;
	&lt;script src="node_modules/reflect-metadata/Reflect.js"&gt;&lt;/script&gt;
	&lt;script src="node_modules/systemjs/dist/system.src.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
Now we need to define our Angular app, so let's create a file called app.ts ( .ts for TypeScript files)
<pre class="lang:javascript">import { NgModule, Component} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

 @Component({
 selector: 'hello-angular',
 template: `
 &lt;div&gt; Hello Angular developers&lt;/div&gt;
 `
 })
 class HelloAngular {
 }

 @NgModule({
 declarations: [ HelloAngular ],
 imports: [ BrowserModule ],
 bootstrap: [ HelloAngular ],
 })
 class HelloAngularAppModule {}

 platformBrowserDynamic().bootstrapModule(HelloAngularAppModule);</pre>
Wow what was that ?

Don’t worry. We’re going to walk through it step by step :

The <span style="color: #ff6600;"><em>import</em> </span>statements define the modules we want to use to write our code, in this case we’re importing  <strong><em>NgModule</em></strong>, <strong><em>Component </em></strong> from the module "<strong>@angular/core</strong>", <strong><em>BrowserModule  </em></strong>from the module <strong>"@angular/platform-browser</strong>" and  <strong><em>platformBrowserDynamic</em></strong> from the module "<strong>@angular/platform-browser-dynamic</strong>".
<blockquote>import { <em><strong>things</strong> </em>} from <em><strong>wherever </strong></em>is called destructuring and it's a feature provided by ES6</blockquote>
Now we need a <strong>Component</strong>, a what ? yes a Component : One of the big ideas behind Angular 2 is the idea of components.

So what's a component ?

The idea behind components is that when we create a component we teach the browser new tags that have new functionality, example : &lt;login&gt;&lt;/login&gt;
<blockquote>If you have a background in <strong>Angular 1</strong>, Components are the new version of <strong>directives</strong>.</blockquote>
Acctualy we already created a one :
<pre class="lang:markup">&lt;hello-angular&gt;&lt;/hello-angular&gt;</pre>
So how do we actually define a new Component?

A basic Component has two parts:
<ul>
 	<li> A Component annotation</li>
 	<li> A component definition class</li>
</ul>
A Component annotation ? What is going on here?

If you’ve been programming in JavaScript for a while then this next statement might seem a little weird:
<pre class="lang:javascript">@Component({
 ...
})</pre>
If you have a Java background it may look familiar to you: they are <strong>annotations</strong>.

Think of <strong>annotations</strong> as metadata added to your code. When we use <strong>@Component</strong> on the HelloAngular class, we are “<strong>decorating</strong>” the HelloAngular as a Component. We want to be able to use this component in our markup by using a tag.

To do that we configure the <strong>@Component</strong> and specify the selector as hello-angular.
<pre class="lang:php">@Component({
 selector: 'hello-angular'
})</pre>
Each component has a template, and we can add a template to our @Component by passing the <em>template</em> option like :
<pre class="lang:javascript">@Component({
	selector: 'hello-angular',
	template: `
	&lt;div&gt;
	Hello Angular developers
	&lt;/div&gt;
	`
})</pre>
<blockquote>Notice that we’re defining our template string between backticks (` … `). This is a new  feature of ES6 that allows us to do multiline strings.</blockquote>
now what ? run the app.

To run our application, we need to do two things:
<ul>
 	<li>we need to tell our HTML document to import our app file</li>
 	<li> we need to use our &lt;hello-angular&gt; component</li>
</ul>
<pre class="lang:javascript">&lt;!doctype html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;Our first Angular App&lt;/title&gt;
&lt;script src="node_modules/core-js/client/shim.min.js"&gt;&lt;/script&gt;
&lt;script src="node_modules/zone.js/dist/zone.js"&gt;&lt;/script&gt;
&lt;script src="node_modules/reflect-metadata/Reflect.js"&gt;&lt;/script&gt;
&lt;script src="node_modules/systemjs/dist/system.src.js"&gt;&lt;/script&gt;
 &lt;/head&gt;
 &lt;body&gt;
 &lt;script&gt;
 System.import('app.js')
 .then(null, console.error.bind(console));
 &lt;/script&gt;

 &lt;hello-angular&gt;&lt;/hello-angular&gt;

 &lt;/body&gt;
 &lt;/html&gt;</pre>
Since our application is written in TypeScript, we used a file called<strong> app.ts</strong>. The next step is to <strong>compile</strong> it to JavaScript, so that the browser can understand it.

If you don't have TypeScript complier you can install it from <strong>NPM</strong> (node package mannger):
<pre class="lang:php">npm install -g typescript</pre>
Create a new file that hold typescript configurtaion : tsconfig.json
<pre class="lang:php">{
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
  "exclude": [
    "node_modules"
  ]
}</pre>
Then run on the root folder of our application
<pre class="lang:javascript">tsc app.ts</pre>
Also we need to add SystemJS config file (don't worry about this file)
<pre class="lang:javascript">System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
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
            rxjs: 'node_modules/rxjs'
        },
        packages: { 
             rxjs: { defaultExtension: 'js' },       
          app: {
            format: 'register',
            defaultExtension: 'js'
          }
        }
      });</pre>
Now add the systemjsconfig.js file to our index.html
<pre class="lang:markup">&lt;!doctype html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;Our first Angular App&lt;/title&gt;
&lt;script src="node_modules/core-js/client/shim.min.js"&gt;&lt;/script&gt;
&lt;script src="node_modules/zone.js/dist/zone.js"&gt;&lt;/script&gt;
&lt;script src="node_modules/reflect-metadata/Reflect.js"&gt;&lt;/script&gt;
&lt;script src="node_modules/systemjs/dist/system.src.js"&gt;&lt;/script&gt;
 &lt;/head&gt;
 &lt;body&gt;
&lt;script src="resources/systemjsconfig.js" &gt; &lt;/script&gt;
 &lt;script&gt;
   
 System.import('app.js')
 .then(null, console.error.bind(console));
 &lt;/script&gt;

 &lt;hello-angular&gt;&lt;/hello-angular&gt;

 &lt;/body&gt;
 &lt;/html&gt;</pre>
Last things we need to install angular modules and a webserver
<pre class="lang:javascript">npm install live-server -g</pre>
<pre class="lang:clike">npm install @angular/core @angular/common @angular/compiler @angular/platform-browser @angular/platform-browser-dynamic</pre>
&nbsp;

Finnaly run then App
<pre class="lang:javascript">live-server</pre>
<img class="aligncenter size-full wp-image-453" src="https://aymen.co/wp-content/uploads/2017/01/Hello-Angular.png" alt="hello-angular" width="524" height="207" />
<h3 style="text-align: center;">Source on</h3>
<h3 style="text-align: center;"> <a href="http://aymen.co/l/wwSpWa" target="_blank"><img class="wp-image-455 alignnone" src="https://aymen.co/wp-content/uploads/2017/01/github.jpg" alt="github" width="122" height="39" /></a></h3>
&nbsp;

&nbsp;
<p style="text-align: center;"><strong>Lazy ? try <a href="http://aymen.co/l/IKMiYd" target="_blank">Angular CLI</a></strong></p>