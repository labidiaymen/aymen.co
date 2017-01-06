One of the easiest ways to start a new Angular application is to use Angular’s <a href="https://github.com/angular/angular-cli">command-line interface</a> (CLI).

To work with the command line we need to install it from the NPM(Node Package Manager):
<pre class="lang:javascript">npm install -g angular-cli</pre>
A new global command  <code class=" language-undefined">ng</code> will be available in our system.

To verify whether your installation completed successfully, run:
<pre class="lang:php">ng version</pre>
If you see an output like bellow everything is OK:
<pre class="lang:php">angular-cli: 1.0.0-beta.21
node: 6.9.1
os: win32 x64</pre>
Let's make our new App:
<pre class="lang:clike">ng new hello-app</pre>
This creates a new directory with all files you need to get started:
<pre class="lang:clike">hello-app
├── README.md
├── angular-cli.json
├── e2e
│   ├── app.e2e-spec.ts
│   ├── app.po.ts
│   └── tsconfig.json
├── karma.conf.js
├── package.json
├── protractor.conf.js
├── src
│   ├── app
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   └── index.ts
│   ├── assets
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.css
│   ├── test.ts
│   ├── tsconfig.json
│   └── typings.d.ts
└── tslint.json</pre>
You can now navigate to the new directory:
<pre class="lang:javascript">cd hello-app</pre>
and start the Angular CLI development server:
<pre class="lang:javascript">ng serve</pre>
You should see you app working :

&nbsp;

<img class="size-full wp-image-483 aligncenter" src="https://aymen.co/wp-content/uploads/2017/01/ng-app.png" alt="ng-app" width="412" height="208" />
<h3 style="text-align: center;">Source on</h3>
<h3 style="text-align: center;"> <a href="http://aymen.co/l/4GRQcB" target="_blank"><img class="wp-image-455 alignnone" src="https://aymen.co/wp-content/uploads/2017/01/github.jpg" alt="github" width="122" height="39" /></a></h3>
<p style="text-align: center;"><strong>Wanna know more details, check : <a href="http://aymen.co/l/sbd431" target="_blank">Start your Angular WebApp</a></strong></p>