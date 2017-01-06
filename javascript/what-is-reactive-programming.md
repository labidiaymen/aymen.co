<blockquote><strong>Reactive programming</strong> is learning to program completely around <strong>synchronous</strong> data <strong>streams</strong></blockquote>
<h2>So what the deference between Imperative programming and Reactive programming ?</h2>
Imperative programming focuses on the order in witch computer does things, Reactive programming only care about order in witch thing need to happen, they are written ignorant of the time and context in witch they are run.

If you are a Front-end developer, you probably already wrote a reactive code without even realizing it, YES, DOM events like key-press wait for stream of input data and respond accordingly .
<blockquote><strong>Reactive programming</strong> is completely different from the<strong> sequential work flow</strong>. They <strong>react</strong> when something is done.</blockquote>
Let's take an example from  Rx(Reactive-Extensions) :
The <strong><em>combineLatest </em></strong>operator combine the latest expression is used to synchronize 2 <strong>Observable streams</strong> into single Observable stream.

The <strong>Combine Latest</strong> doesn’t using queue, as it name suggest it only remember the latest value of each stream.

&nbsp;

<img class="alignright size-full wp-image-516" src="https://aymen.co/wp-content/uploads/2017/01/reactive-programming-1.jpg" alt="reactive-programming" width="909" height="405" />
We can see that when the <strong>y stream</strong> observed the<strong> b </strong>value, the <strong>result stream </strong><strong>combine</strong> it with the <strong>latest</strong> value observed on <strong>x stream</strong> (3) and latter the same value will be <strong>combine</strong> into the result stream when the <strong>x stream</strong> will <strong>observed</strong> the <strong>4</strong> value.

The <strong>Combine Latest</strong> processing will come to end either when one of the stream

will <strong>complete</strong> or <strong>throw exception, </strong>in this case y Stream run <strong>complete</strong>(<strong>onComplete</strong> before <strong>RxJS5</strong>)

---
<h2>Did you feel lost ?</h2>
I felt the same thing the first time i read about reactive programming and RxJS, the hardest part of the learning journey is <strong>thinking in Reactive</strong>. It's a lot about letting go of old imperative and stateful habits of typical programming, and forcing your brain to work in a different paradigm.

What about you? it worth learning nowadays ?

&nbsp;