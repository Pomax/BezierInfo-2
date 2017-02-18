var React = require('react');
var Graphic = require("../../components/Graphic.jsx");
var SectionHeader = require("../../components/SectionHeader.jsx");

module.exports = {
  "preface": {
    "locale": "en-GB",
    "title": "Preface",
    "getContent": function(handler) { return <section>
<SectionHeader name="preface" title="Preface"/>
<p>In order to draw things in 2D, we usually rely on lines, which typically get classified into two categories: straight lines, and curves. The first of these are as easy to draw as they are easy to make a computer draw. Give a computer the first and last point in the line, and BAM! straight line. No questions asked.</p>
<p>Curves, however, are a much bigger problem. While we can draw curves with ridiculous ease freehand, computers are a bit handicapped in that they can't draw curves unless there is a mathematical function that describes how it should be drawn. In fact, they even need this for straight lines, but the function is ridiculously easy, so we tend to ignore that as far as computers are concerned, all lines are "functions", regardless of whether they're straight or curves. However, that does mean that we need to come up with fast-to-compute functions that lead to nice looking curves on a computer. There's a number of these, and in this article we'll focus on a particular function that has received quite a bit of attention, and is used in pretty much anything that can draw curves: "Bézier" curves</p>
<p>They're named after <a href="https://en.wikipedia.org/wiki/Pierre_B%C3%A9zier">Pierre Bézier</a>, who is principally responsible for getting them known to the world as a curve well-suited for design work (working for Renault and publishing his investigations in 1962), although he was not the first, or only one, to "invent" these type of curves. One might be tempted to say that the mathematician <a href="https://en.wikipedia.org/wiki/Paul_de_Casteljau">Paul de Casteljau</a> was first, investigating the nature of these curves in 1959 while working at Citroën, coming up with a really elegant way of figuring out how to draw them. However, de Casteljau did not publish his work, making the question "who was first" hard to answer in any absolute sense. Or is it? Bézier curves are, at their core, "Bernstein polynomials", a family of mathematical functions investigated by <a href="https://en.wikipedia.org/wiki/Sergei_Natanovich_Bernstein">Sergei Natanovich Bernstein</a>, with publications on them at least as far back as 1912. Anyway, that's mostly trivia, what you are more likely to care about is that these curves are handy: you can link up multiple Bézier curves so that the combination looks like a single curve. If you've ever drawn Photoshop "paths" or worked with vector drawing programs like Flash, Illustrator or nkscape, those curves you've been drawing are Bézier curves.</p>
<p>So, what if you need to program them yourself? What are the pitfalls? How do you draw them? What are the bounding boxes, how do you determine intersections, how can you extrude a curve, in short: how do you do everything that you might want when you do with these curves? That's what this page is for. Prepare to be mathed!</p>
<p>—Pomax (or in the tweetworld, <a href="https://twitter.com/TheRealPomax">@TheRealPomax</a>)</p>

<div className="note">
<h2 id="note-virtually-all-b-zier-graphics-are-interactive-">Note: virtually all Bézier graphics are interactive.</h2>
<p>This page uses interactive examples, relying heavily on <a href="http://pomax.github.io/bezierjs">Bezier.js</a>, as well as "real" maths (in LaTeX form) which is typeset using the most excellent <a href="http://MathJax.org">MathJax</a> library. The page is generated offline as a React application, using Webpack, which has made adding "view source" options considerably more challenging. I'm still trying to figure out how to add them back in, but it didn't feel like it should hold up deploying this update compared to the previous years' version.</p>
<h2 id="this-book-is-open-source-">This book is open source.</h2>
<p>This book is an open source software project, and lives on two github repositorites. The first is <a href="https://github.com/pomax/bezierinfo">https://github.com/pomax/bezierinfo</a> and is the purely-for-presentation version you are viewing right now. The other repository is <a href="https://github.com/pomax/BezierInfo-2">https://github.com/pomax/BezierInfo-2</a>, which is the development version, housing all the html, javascript, and css. You can fork either of these, and pretty much do with them as you please, except for passing it off as your own work wholesale, of course =)</p>
<h2 id="how-complicated-is-the-maths-going-to-be-">How complicated is the maths going to be?</h2>
<p>Most of the mathematics in this Primer are early high school maths. If you understand basic arithmetic, and you know how to read English, you should be able to get by just fine. There will at times be <em>far</em> more complicated maths, but if you don't feel like digesting them, you can safely skip over them by either skipping over the "detail boxes" in section or by just jumping to the end of a section with maths that looks too involving. The end of sections typically simply list the conclusions so you can just work with those values directly.</p>
<h2 id="questions-comments-">Questions, comments:</h2>
<p>If you have suggestions for new sections, hit up the <a href="https://github.com/pomax/BezierInfo-2/issues">Github issue tracker</a> (also reachable from the repo linked to in the upper right). If you have questions about the material, there's currently no comment section while I'm doing the rewrite, but you can use the issue tracker for that as well. Once the rewrite is done, I'll add a general comment section back in, and maybe a more topical "select this section of text and hit the 'question' button to ask a question about it" system. We'll see.</p>
<h2 id="buy-me-a-coffee-">Buy me a coffee?</h2>
<p>If you enjoyed this book, or you simply found it useful for something you were trying to get done, and you were wondering how to let me know you appreciated this book, you can always <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QPRDLNGDANJSW">buy me a coffee</a>, however-much a coffee is where you live. This work has grown over the years, from a small primer to a 70ish print-page-equivalent reader on the subject of Bézier curves, and a lot of coffee went into the making of it. I don't regret a minute I spent on writing it, but I can always do with some more coffee to keep on writing!</p>
</div>
</section>; }

  },
  "introduction": {
    "locale": "ja-JP",
    "title": "バッとした導入",
    "getContent": function(handler) { return <section>
<SectionHeader name="introduction" title="バッとした導入" number="1"/>
<p>まずは良い例から始めましょう。ベジエ曲線というのは、下の図に表示されているもののことです。ベジエ曲線はある始点からある終点へと延びており、その曲率は1個以上の「中間」制御点に左右されています。さて、このページの図はどれもインタラクティブになっていますので、ここで曲線をちょっと操作してみましょう。点をドラッグしたとき、曲線の形がそれに応じてどう変化するのか、確かめてみてください。</p>

<div className="figure">
  <Graphic inline={true} title="2次のベジエ曲線" setup={ handler.drawQuadratic } draw={ handler.drawCurve }/>
  <Graphic inline={true} title="3次のベジエ曲線" setup={ handler.drawCubic } draw={ handler.drawCurve }/>
</div>
<p>ベジエ曲線は、CAD（computer aided designやCAM（computer aided manufacturing）のアプリケーションで多用されています。もちろん、Adobe Illustrator・Photoshop・Inkscape・Gimp などのグラフィックデザインアプリケーションや、SVG（scalable vector graphics）・OpenTypeフォント（otf/ttf）のようなグラフィック技術でも利用されています。ベジエ曲線はたくさんのものに使われていますので、これについてもっと詳しく学びたいのであれば……さあ、準備しましょう！</p>
</section>; }

  },
  "whatis": {
    "locale": "ja-JP",
    "title": "ではベジエ曲線はどうやってできるのでしょう？",
    "getContent": function(handler) { return <section>
<SectionHeader name="whatis" title="ではベジエ曲線はどうやってできるのでしょう？" number="2"/>
<p>ベジエ曲線がどのように動くのか、点を触ってみて感覚が摑めたかもしれません。では、実際のところベジエ曲線<em>とは</em>いったい何でしょうか？これを説明する方法は2通りありますが、どちらの説明でも行き着く先はまったく同じです。一方は複雑な数学を使うのに対し、もう一方はとても簡単です。というわけで……簡単な説明の方から始めましょう。</p>
<p>ベジエ曲線は、<a href="https://ja.wikipedia.org/wiki/%E7%B7%9A%E5%BD%A2%E8%A3%9C%E9%96%93">線形補間</a>の結果です。というと難しそうに聞こえますが、誰でも幼い頃から線形補間をやってきています。例えば、何か2つのものの間を指し示すときには、いつも線形補間を行っています。線形補間とは、単純に「2点の間から点を得る」ことなのです。</p>
<p>例えば、2点間の距離がわかっているとして、一方の点から距離の20%だけ離れた（すなわち、もう一方の点から80%離れた）新しい点を求めたい場合、次のようにとても簡単に計算できます。</p>
\[
Given \left (
  \begin{align}
    p_1 &= some\ point \\
    p_2 &= some\ other\ point \\
    distance &= (p_2 - p_1) \\
    ratio &= \frac{percentage}{100} \\
  \end{align}
\right ),\ our\ new\ point = p_1 + distance \cdot ratio
\]<p>では、実際に見てみましょう。下の図はインタラクティブになっています。上下キーで補間の比率が増減しますので、どうなるか確かめてみましょう。最初に3点があり、それを結んで2本の直線が引かれています。この直線の上でそれぞれ線形補間を行うと、2つの点が得られます。この2点の間でさらに線形補間を行うと、1つの点を得ることができます。そして、あらゆる比率に対して同様に点を求め、それをすべて集めると、このようにベジエ曲線ができるのです。</p>
<Graphic title="線形補間でベジエ曲線を得る" setup={handler.setup} draw={handler.draw} onKeyDown={handler.onKeyDown}/>
<p>また、これが複雑な方の数学につながっていきます。微積分です。</p>
<p>いま上で行ったものとは似つかないように思えますが、実はあれは2次曲線を描いていたのです。ただし一発で描きあげるのではなく、手順を追って描いていきました。ベジエ曲線は多項式関数で表現できますが、その一方で、とても単純な補間の補間の補間の……というふうにも説明できます。これがベジエ曲線のおもしろいところです。これはまた、ベジェ曲線は「本当の数学」で見る（関数を調べたり微分を調べたり、あらゆる方法で）ことも可能ですし、「機械的」な組み立て操作として見る（例えば、ベジエ曲線は組み立てに使う点の間からは決してはみ出ないということがわかります）ことも可能だということを意味しています。</p>
<p>それでは、もう少し詳しくベジエ曲線を見ていきましょう。数学的な表現やそこから導かれる性質、さらには、ベジエ曲線に対して／ベジエ曲線を使ってできるさまざまな内容についてです。</p>
</section>; }

  },
  "explanation": {
    "locale": "en-GB",
    "title": "The mathematics of Bézier curves",
    "getContent": function(handler) { return <section>
<SectionHeader name="explanation" title="The mathematics of Bézier curves" number="3"/>
<p>Bézier curves are a form of "parametric" function. Mathematically speaking, parametric functions are cheats: a "function" is actually a well defined term representing a mapping from any number of inputs to a <strong>single</strong> output. Numbers go in, a single number comes out. Change the numbers that go in, and the number that comes out is still a single number. Parametric functions cheat. They basically say "alright, well, we want multiple values coming out, so we'll just use more than one function". An illustration: Let's say we have a function that maps some value, let's call it <i>x</i>, to some other value, using some kind of number manipulation:</p>
\[
  f(x) = \cos(x)
\]<p>The notation <i>f(x)</i> is the standard way to show that it's a function (by convention called <i>f</i> if we're only listing one) and its output changes based on one variable (in this case, <i>x</i>). Change <i>x</i>, and the output for <i>f(x)</i> changes.</p>
<p>So far so good. Now, let's look at parametric functions, and how they cheat. Let's take the following two functions:</p>
\[
\begin{matrix}
  f(a) = \cos(a) \\
  f(b) = \sin(b)
\end{matrix}
\]<p>There's nothing really remarkable about them, they're just a sine and cosine function, but you'll notice the inputs have different names. If we change the value for <i>a</i>, we're not going to change the output value for <i>f(b)</i>, since <i>a</i> isn't used in that function. Parametric functions cheat by changing that. In a parametric function all the different functions share a variable, like this:</p>
\[
\left \{ \begin{matrix}
  f_a(t) = \cos(t) \\
  f_b(t) = \sin(t)
\end{matrix} \right.
\]<p>Multiple functions, but only one variable. If we change the value for <i>t</i>, we change the outcome of both <i>f<sub>a</sub>(t)</i> and <i>f<sub>b</sub>(t)</i>. You might wonder how that's useful, and the answer is actually pretty simple: if we change the labels <i>f<sub>a</sub>(t)</i> and <i>f<sub>b</sub>(t)</i> with what we usually mean with them for parametric curves, things might be a lot more obvious:</p>
\[
\left \{ \begin{matrix}
  x = \cos(t) \\
  y = \sin(t)
\end{matrix} \right.
\]<p>There we go. <i>x</i>/<i>y</i> coordinates, linked through some mystery value <i>t</i>.</p>
<p>So, parametric curves don't define a <i>y</i> coordinate in terms of an <i>x</i> coordinate, like normal functions do, but they instead link the values to a "control" variable. If we vary the value of <i>t</i>, then with every change we get <strong>two</strong> values, which we can use as (<i>x</i>,<i>y</i>) coordinates in a graph. The above set of functions, for instance, generates points on a circle: We can range <i>t</i> from negative to positive infinity, and the resulting (<i>x</i>,<i>y</i>) coordinates will always lie on a circle with radius 1 around the origin (0,0). If we plot it for <i>t</i> from 0 to 5, we get this (use your up and down arrow keys to change the plot end value):</p>
<Graphic preset="empty" title="A (partial) circle: x=sin(t), y=cos(t)" static={true} setup={handler.setup} draw={handler.draw} onKeyDown={handler.props.onKeyDown}/>
<p>Bézier curves are (one in many classes of) parametric functions, and are characterised by using the same base function for all its dimensions. Unlike the above example, where the <i>x</i> and <i>y</i> values use different functions (one uses a sine, the other a cosine), Bézier curves use the "binomial polynomial" for both <i>x</i> and <i>y</i>. So what are binomial polynomials?</p>
<p>You may remember polynomials from high school, where they're those sums that look like:</p>
\[
  f(x) = a \cdot x^3 + b \cdot x^2 + c \cdot x + d
\]<p>If they have a highest order term <i>x³</i> they're called "cubic" polynomials, if it's <i>x²</i> it's a "square" polynomial, if it's just <i>x</i> it's a line (and if there aren't even any terms with <i>x</i> it's not a polynomial!)</p>
<p>Bézier curves are polynomials of <i>t</i>, rather than <i>x</i>, with the value for <i>t</i> fixed being between 0 and 1, with coefficients <i>a</i>, <i>b</i> etc. taking the "binomial" form, which sounds fancy but is actually a pretty simple description for mixing values:</p>
\[
\begin{align*}
  linear &= (1-t) + t \\
  square &= (1-t)^2 + 2 \cdot (1-t) \cdot t + t^2 \\
  cubic &= (1-t)^3 + 3 \cdot (1-t)^2 \cdot t + 3 \cdot (1-t) \cdot t^2 + t^3
\end{align*}
\]<p>I know what you're thinking: that doesn't look too simple, but if we remove <i>t</i> and add in "times one", things suddenly look pretty easy. Check out these binomial terms:</p>
\[
\begin{align*}
  linear &= \hskip{2.5em} 1 + 1 \\
  square &= \hskip{1.7em} 1 + 2 + 1\\
  cubic &= \hskip{0.85em} 1 + 3 + 3 + 1\\
  hypercubic &= 1 + 4 + 6 + 4 + 1
\end{align*}
\]<p>Notice that 2 is the same as 1+1, and 3 is 2+1 and 1+2, and 6 is 3+3... As you can see, each time we go up a dimension, we simply start and end with 1, and everything in between is just "the two numbers above it, added together". Now <i>that's</i> easy to remember.</p>
<p>There's an equally simple way to figure out how the polynomial terms work: if we rename <i>(1-t)</i> to <i>a</i> and <i>t</i> to <i>b</i>, and remove the weights for a moment, we get this:</p>
\[
\begin{align*}
  linear &= BLUE[a] + RED[b] \\
  square &= BLUE[a] \cdot BLUE[a] + BLUE[a] \cdot RED[b] + RED[b] \cdot RED[b] \\
  cubic &= BLUE[a] \cdot BLUE[a] \cdot BLUE[a] + BLUE[a] \cdot BLUE[a] \cdot RED[b] + BLUE[a] \cdot RED[b] \cdot RED[b] + RED[b] \cdot RED[b] \cdot RED[b]\\
\end{align*}
\]<p>It's basically just a sum of "every combination of <i>a</i> and <i>b</i>", progressively replacing <i>a</i>'s with <i>b</i>'s after every + sign. So that's actually pretty simple too. So now you know binomial polynomials, and just for completeness I'm going to show you the generic function for this:</p>
\[
  Bézier(n,t) = \sum_{i=0}^{n}
                \underset{binomial\ term}{\underbrace{\binom{n}{i}}}
                \cdot\
                \underset{polynomial\ term}{\underbrace{(1-t)^{n-i} \cdot t^{i}}}
\]<p>And that's the full description for Bézier curves. Σ in this function indicates that this is a series of additions (using the variable listed below the Σ, starting at ...=&lt;value&gt; and ending at the value listed on top of the Σ).</p>

<div className="howtocode">
<h3 id="how-to-implement-the-basis-function">How to implement the basis function</h3>
<p>We could naively implement the basis function as a mathematical construct, using the function as our guide, like this:</p>
<pre>function Bezier(n,t):
  sum = 0
  for(k=0; k&lt;n; k++):
    sum += n!/(k!*(n-k)!) * (1-t)^(n-k) * t^(k)
  return sum
</pre>
<p>I say we could, because we're not going to: the factorial function is <em>incredibly</em> expensive. And, as we can see from the above explanation, we can actually create Pascal's triangle quite easily without it: just start at [1], then [1,1], then [1,2,1], then [1,3,3,1], and so on, with each next row fitting 1 more number than the previous row, starting and ending with "1", with all the numbers in between being the sum of the previous row's elements on either side "above" the one we're computing.</p>
<p>We can generate this as a list of lists lightning fast, and then never have to compute the binomial terms because we have a lookup table:</p>
<pre>lut = [      [1],           // n=0
            [1,1],          // n=1
           [1,2,1],         // n=2
          [1,3,3,1],        // n=3
         [1,4,6,4,1],       // n=4
        [1,5,10,10,5,1],    // n=5
       [1,6,15,20,15,6,1]]  // n=6

binomial(n,k):
  while(n &gt;= lut.length):
    s = lut.length
    nextRow = new array(size=s+1)
    nextRow[0] = 1
    for(i=1, prev=s-1; i&ltprev; i++):
      nextRow[i] = lut[prev][i-1] + lut[prev][i]
    nextRow[s] = 1
    lut.add(nextRow)
  return lut[n][k]
</pre>
<p>So what's going on here? First, we declare a lookup table with a size that's reasonably large enough to accommodate most lookups. Then, we declare a function to get us the values we need, and we make sure that if an n/k pair is requested that isn't in the LUT yet, we expand it first. Our basis function now looks like this:</p>
<pre>function Bezier(n,t):
  sum = 0
  for(k=0; k&lt;=n; k++):
    sum += binomial(n,k) * (1-t)^(n-k) * t^(k)
  return sum
</pre>
<p>Perfect. Of course, we can optimize further. For most computer graphics purposes, we don't need arbitrary curves. We need quadratic and  cubic curves (this primer actually does do arbitrary curves, so you'll find code similar to shown here), which means we can drastically simplify the code:</p>
<pre>function Bezier(2,t):
  t2 = t * t
  mt = 1-t
  mt2 = mt * mt
  return mt2 + 2*mt*t + t2

function Bezier(3,t):
  t2 = t * t
  t3 = t2 * t
  mt = 1-t
  mt2 = mt * mt
  mt3 = mt2 * mt
  return mt3 + 3*mt2*t + 3*mt*t2 + t3
</pre>
<p>And now we know how to program the basis function. Exellent.</p>
</div>
<p>So, now we know what the base function(s) look(s) like, time to add in the magic that makes Bézier curves so special: control points.</p>
</section>; }

  },
  "control": {
    "locale": "en-GB",
    "title": "Controlling Bézier curvatures",
    "getContent": function(handler) { return <section>
<SectionHeader name="control" title="Controlling Bézier curvatures" number="4"/>
<p>Bézier curves are (like all "splines") interpolation functions, meaning they take a set of points, and generate values somewhere "between" those points. (One of the consequences of this is that you'll never be able to generate a point that lies outside the outline for the control points, commonly called the "hull" for the curve. Useful information!). In fact, we can visualize how each point contributes to the value generated by the function, so we can see which points are important, where, in the curve.</p>
<p>The following graphs show the interpolation functions for quadratic and cubic curves, with "S" being the strength of a point's contribution to the total sum of the Bézier function. Click or click-drag to see the interpolation percentages for each curve-defining point at a specific <i>t</i> value.</p>

<div className="figure">
  <Graphic inline={true} preset="simple" title="Quadratic interpolations"  draw={handler.drawQuadraticLerp}/>
  <Graphic inline={true} preset="simple" title="Cubic interpolations"      draw={handler.drawCubicLerp}/>
  <Graphic inline={true} preset="simple" title="15th order interpolations" draw={handler.draw15thLerp}/>
</div>
<p>Also shown is the interpolation function for a 15<sup>th</sup> order Bézier function. As you can see, the start and end point contribute considerably more to the curve's shape than any other point in the control point set.</p>
<p>If we want to change the curve, we need to change the weights of each point, effectively changing the interpolations. The way to do this is about as straight forward as possible: just multiply each point with a value that changes its strength. These values are conventionally called "Weights", and we can add them to our original Bézier function:</p>
\[
  Bézier(n,t) = \sum_{i=0}^{n}
                \underset{binomial\ term}{\underbrace{\binom{n}{i}}}
                \cdot\
                \underset{polynomial\ term}{\underbrace{(1-t)^{n-i} \cdot t^{i}}}
                \cdot\
                \underset{weight}{\underbrace{w_i}}
\]<p>That looks complicated, but as it so happens, the "weights" are actually just the coordinate values we want our curve to have: for an <i>n<sup>th</sup>
</i> order curve, w<sub>0</sub> is our start coordinate, w<sub>n</sub> is our last coordinate, and everything in between is a controlling coordinate. Say we want a cubic curve that starts at (120,160), is controlled by (35,200) and (220,260) and ends at (220,40), we use this Bézier curve:</p>
\[
\left \{ \begin{matrix}
  x = BLUE[120] \cdot (1-t)^3 + BLUE[35] \cdot 3 \cdot (1-t)^2 \cdot t + BLUE[220] \cdot 3 \cdot (1-t) \cdot t^2 + BLUE[220] \cdot t^3 \\
  y = BLUE[160] \cdot (1-t)^3 + BLUE[200] \cdot 3 \cdot (1-t)^2 \cdot t + BLUE[260] \cdot 3 \cdot (1-t) \cdot t^2 + BLUE[40] \cdot t^3
\end{matrix} \right.
\]<p>Which gives us the curve we saw at the top of the article:</p>
<Graphic preset="simple" title="Our cubic Bézier curve" setup={handler.drawCubic} draw={handler.drawCurve}/>
<p>What else can we do with Bézier curves? Quite a lot, actually. The rest of this article covers a multitude of possible operations and algorithms that we can apply, and the tasks they achieve.</p>

<div className="howtocode">
<h3 id="how-to-implement-the-weighted-basis-function">How to implement the weighted basis function</h3>
<p>Given that we already know how to implement basis function, adding in the control points is remarkably easy:</p>
<pre>function Bezier(n,t,w[]):
  sum = 0
  for(k=0; k&lt;n; k++):
    sum += w[k] * binomial(n,k) * (1-t)^(n-k) * t^(k)
  return sum
</pre>
<p>And for the extremely optimized versions:</p>
<pre>function Bezier(2,t,w[]):
  t2 = t * t
  mt = 1-t
  mt2 = mt * mt
  return w[0]*mt2 + w[1]*2*mt*t + w[2]*t2

function Bezier(3,t,w[]):
  t2 = t * t
  t3 = t2 * t
  mt = 1-t
  mt2 = mt * mt
  mt3 = mt2 * mt
  return w[0]*mt3 + 3*w[1]*mt2*t + 3*w[2]*mt*t2 + w[3]*t3
</pre>
<p>And now we know how to program the weighted basis function.</p>
</div>
</section>; }

  },
  "extended": {
    "locale": "en-GB",
    "title": "The Bézier interval [0,1]",
    "getContent": function(handler) { return <section>
<SectionHeader name="extended" title="The Bézier interval [0,1]" number="5"/>
<p>Now that we know the mathematics behind Bézier curves, there's one curious thing that you may have noticed: they always run from <code>t=0</code> to <code>t=1</code>. Why that particular interval?</p>
<p>It all has to do with how we run from "the start" of our curve to "the end" of our curve. If we have a value that is a mixture of two other values, then the general formula for this is:</p>
\[
  mixture = a \cdot value_1 + b \cdot value_2
\]<p>The obvious start and end values here need to be <code>a=1, b=0</code>, so that the mixed value is 100% value 1, and 0% value 2, and <code>a=0, b=1</code>, so that the mixed value is 0% value 1 and 100% value 2. Additionally, we don't want "a" and "b" to be independent: if they are, then we could just pick whatever values we like, and end up with a mixed value that is, for example, 100% value 1 <strong>and</strong> 100% value 2. In principle that's fine, but for Bézier curves we always want mixed values <em>between</em> the start and end point, so we need to make sure we can never set "a" and "b" to some values that lead to a mix value that sums to more than 100%. And that's easy:</p>
\[
  m = a \cdot value_1 + (1 - a) \cdot value_2
\]<p>With this we can guarantee that we never sum above 100%. By restricting <code>a</code> to values in the interval [0,1], we will always be somewhere between our two values (inclusively), and we will always sum to a 100% mix.</p>
<p>But... what if we use this form, used in the assumption that we will only ever use values between 0 and 1, and instead use values outside of that interval? Do things go horribly wrong? Well... not really, but we get to "see more".</p>
<p>In the case of Bézier curves, extending the interval simply makes our curve "keep going". Bézier curves are simply segments on some polynomial curve, so if we pick a wider interval we simply get to see more of the curve. So what do they look like?</p>
<p>The following two graphics show you Bézier curves rendered "the usual way", as well as the curves they "lie on" if we were to extend the <code>t</code> values much further. As you can see, there's a lot more "shape" hidden in the rest of the curve, and we can model those parts by moving the curve points around.</p>
<Graphic preset="simple" title="Quadratic infinite interval Bézier curve" setup={handler.setupQuadratic} draw={handler.draw} />
<Graphic preset="simple" title="Cubic infinite interval Bézier curve" setup={handler.setupCubic} draw={handler.draw} />
<p>In fact, there are curves used in graphics design and computer modelling that do the opposite of Bézier curves, where rather than fixing the interval, and giving you free coordinates, they fix the coordinates, but give you freedom over the interval. A great example of this is the <a href="http://levien.com/phd/phd.html">"Spiro" curve</a>, which is a curve based on part of a <a href="https://en.wikipedia.org/wiki/Euler_spiral">Cornu Spiral, also known as Euler's Spiral</a>. It's a very aesthetically pleasing curve and you'll find it in quite a few graphics packages like <a href="https://fontforge.github.io">FontForge</a> and <a href="https://inkscape.org">Inkscape</a>, having even been used in font design (such as for the Inconsolata font).</p>
</section>; }

  },
  "matrix": {
    "locale": "en-GB",
    "title": "Bézier curvatures as matrix operations",
    "getContent": function(handler) { return <section>
<SectionHeader name="matrix" title="Bézier curvatures as matrix operations" number="6"/>
<p>We can also represent Bézier as matrix operations, by expressing the Bézier formula as a polynomial basis function, the weight matrix, and the actual coordinates as matrix. Let's look at what this means for the cubic curve:</p>
\[
  B(t) = P_1 \cdot (1-t)^3 + P_2 \cdot 3 \cdot (1-t)^2 \cdot t + P_3 \cdot 3 \cdot (1-t) \cdot t^2 + P_4 \cdot t^3
\]<p>Disregarding our actual coordinates for a moment, we have:</p>
\[
  B(t) = (1-t)^3 + 3 \cdot (1-t)^2 \cdot t + 3 \cdot (1-t) \cdot t^2 + t^3
\]<p>We can write this as a sum of four expressions:</p>
\[
  \begin{matrix}
   ... & = & (1-t)^3 \\
     & + & 3 \cdot (1-t)^2 \cdot t \\
     & + & 3 \cdot (1-t) \cdot t^2 \\
     & + & t^3 \\
  \end{matrix}
\]<p>And we can expand these expressions:</p>
\[
  \begin{matrix}
   ... & = & (1-t) \cdot (1-t) \cdot (1-t) & = & -t^3 + 3 \cdot t^2 - 3 \cdot t + 1 \\
     & + & 3 \cdot (1-t) \cdot (1-t) \cdot t & = & 3 \cdot t^3 - 6 \cdot t^2 + 3 \cdot t \\
     & + & 3 \cdot (1-t) \cdot t \cdot t & = & -3 \cdot t^3 + 3 \cdot t^2 \\
     & + & t \cdot t \cdot t & = & t^3 \\
  \end{matrix}
\]<p>Furthermore, we can make all the 1 and 0 factors explicit:</p>
\[
  \begin{matrix}
   ... & = & -1 \cdot t^3 + 3 \cdot t^2 - 3 \cdot t + 1 \\
     & + & +3 \cdot t^3 - 6 \cdot t^2 + 3 \cdot t + 0 \\
     & + & -3 \cdot t^3 + 3 \cdot t^2 + 0 \cdot t + 0 \\
     & + & +1 \cdot t^3 + 0 \cdot t^2 + 0 \cdot t + 0 \\
  \end{matrix}
\]<p>And <em>that</em>, we can view as a series of four matrix operations:</p>
\[
  \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}-1 \\ 3 \\ -3 \\ 1\end{bmatrix}
  + \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}3 \\ -6 \\ 3 \\ 0\end{bmatrix}
  + \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}-3 \\ 3 \\ 0 \\ 0\end{bmatrix}
  + \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}1 \\ 0 \\ 0 \\ 0\end{bmatrix}
\]<p>If we compact this into a single matrix operation, we get:</p>
\[
  \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}
      -1 &  3 & -3 & 1 \\
       3 & -6 &  3 & 0 \\
      -3 &  3 &  0 & 0 \\
       1 &  0 &  0 & 0
    \end{bmatrix}
\]<p>This kind of polynomial basis representation is generally written with the bases in increasing order, which means we need to flip our <code>t</code> matrix horizontally, and our big "mixing" matrix upside down:</p>
\[
  \begin{bmatrix}1 & t & t^2 & t^3\end{bmatrix} \cdot \begin{bmatrix}
       1 &  0 &  0 & 0 \\
      -3 &  3 &  0 & 0 \\
       3 & -6 &  3 & 0 \\
      -1 &  3 & -3 & 1
    \end{bmatrix}
\]<p>And then finally, we can add in our original coordinates as a single third matrix:</p>
\[
  B(t) = \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 & 0 \\
  -3 &  3 &  0 & 0 \\
   3 & -6 &  3 & 0 \\
  -1 &  3 & -3 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]<p>We can perform the same trick for the quadratic curve, in which case we end up with:</p>
\[
  B(t) = \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 & 0 \\
  -2 &  2 & 0 \\
   1 & -2 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
\]<p>If we plug in a <code>t</code> value, and then multiply the matrices, we will get exactly the same values as when we evaluate the original polynomial function, or as when we evaluate the curve using progessive linear interpolation.</p>
<p>
<strong>So: why would we bother with matrices?</strong> Matrix representations allow us to discover things about functions that would otherwise be hard to tell. It turns out that the curves form <a href="https://en.wikipedia.org/wiki/Triangular_matrix">triangular matrices</a>, and they have a determinant equal to the product of the actual coordinates we use for our curve. It's also invertible, which means there's <a href="https://en.wikipedia.org/wiki/Invertible_matrix#The_invertible_matrix_theorem">a ton of properties</a> that are all satisfied. Of course, the main question is: "Why is this useful to us, now?", and the answer to that is that it's not immediately useful, but you'll be seeing some instances where certain curve properties can be either computed via function manipulation, or via clever use of matrices, and sometimes the matrix approach can be (drastically) faster.</p>
<p>So for now, just remember that we can represent curves this way, and let's move on.</p>
</section>; }

  },
  "decasteljau": {
    "locale": "en-GB",
    "title": "de Casteljau's algorithm",
    "getContent": function(handler) { return <section>
<SectionHeader name="decasteljau" title="de Casteljau's algorithm" number="7"/>
<p>If we want to draw Bézier curves we can run through all values of <code>t</code> from 0 to 1 and then compute the weighted basis function, getting the <code>x/y</code> values we need to plot, but the more complex the curve gets, the more expensive this becomes. Instead, we can use "de Casteljau's algorithm" to draw curves, which is a geometric approach to drawing curves, and really easy to implement. So easy, in fact, you can do it by hand with a pencil and ruler.</p>
<p>Rather than using our calculus function to find <code>x/y</code> values for <code>t</code>, let's do this instead:</p>
<ul>
<li>treat <code>t</code> as a ratio (which it is). t=0 is 0% along a line, t=1 is 100% along a line.</li>
<li>Take all lines between the curve's defining points. For an order <code>n</code> curve, that's <code>n</code> lines.</li>
<li>Place markers along each of these line, at distance <code>t</code>. So if <code>t</code> is 0.2, place the mark at 20% from the start, 80% from the end.</li>
<li>Now form lines between <code>those</code> points. This gives <code>n-1</code> lines.</li>
<li>Place markers along each of these line at distance <code>t</code>.</li>
<li>Form lines between <code>those</code> points. This'll be <code>n-2</code> lines.</li>
<li>place markers, form lines, place markers, etc.</li>
<li>repeat this until you have only one line left. The point <code>t</code> on that line coincides with the original curve point at <code>t</code>.</li>
</ul>

<div className="howtocode">
<h3 id="how-to-implement-de-casteljau-s-algorithm">How to implement de Casteljau's algorithm</h3>
<p>Let's just use the algorithm we just specified, and implement that:</p>
<pre>function drawCurve(points[], t):
  if(points.length==1):
    draw(points[0])
  else:
    newpoints=array(points.size-1)
    for(i=0; i&lt;newpoints.length; i++):
      newpoints[i] = (1-t) * points[i] + t * points[i+1]
    drawCurve(newpoints, t)
</pre>
<p>And done, that's the algorithm implemented. Except usually you don't get the luxury of overloading the "+" operator, so let's also give the code for when you need to work with <code>x</code> and <code>y</code> values:</p>
<pre>function drawCurve(points[], t):
  if(points.length==1):
    draw(points[0])
  else:
    newpoints=array(points.size-1)
    for(i=0; i&lt;newpoints.length; i++):
      x = (1-t) * points[i].x + t * points[i+1].x
      y = (1-t) * points[i].y + t * points[i+1].y
      newpoints[i] = new point(x,y)
    drawCurve(newpoints, t)
</pre>
<p>So what does this do? This draws a point, if the passed list of points is only 1 point long. Otherwise it will create a new list of points that sit at the <i>t</i> ratios (i.e. the "markers" outlined in the above algorithm), and then call the draw function for this new list.</p>
</div>
<p>To see this in action, mouse-over the following sketch. Moving the mouse changes which curve point is explicitly evaluated using de Casteljau's algorithm, moving the cursor left-to-right (or, of course, right-to-left), shows you how a curve is generated using this approach.</p>
<Graphic preset="simple"title="Traversing a curve using de Casteljau's algorithm" setup={handler.setup} draw={handler.draw}/>
</section>; }

  },
  "flattening": {
    "locale": "en-GB",
    "title": "Simplified drawing",
    "getContent": function(handler) { return <section>
<SectionHeader name="flattening" title="Simplified drawing" number="8"/>
<p>We can also simplify the drawing process by "sampling" the curve at certain points, and then joining those points up with straight lines, a process known as "flattening", as we are reducing a curve to a simple sequence of straight, "flat" lines.</p>
<p>We can do this is by saying "we want X segments", and then sampling the curve at intervals that are spaced such that we end up with the number of segments we wanted. The advantage of this method is that it's fast: instead of evaluating 100 or even 1000 curve coordinates, we can sample a much lower number and still end up with a curve that sort-of-kind-of looks good enough. The disadvantage of course is that we lose the precision of working with "the real curve", so we usually can't use the flattened for for doing true intersection detection, or curvature alignment.</p>
<Graphic preset="twopanel" title="Flattening a quadratic curve" setup={handler.setupQuadratic} draw={handler.drawFlattened} onKeyDown={handler.onKeyDown}/>
<Graphic preset="twopanel" title="Flattening a cubic curve" setup={handler.setupCubic} draw={handler.drawFlattened} onKeyDown={handler.onKeyDown} />
<p>Try clicking on the sketch and using your up and down arrow keys to lower the number of segments for both the quadratic and cubic curve. You'll notice that for certain curvatures, a low number of segments works quite well, but for more complex curvatures (try this for the cubic curve), a higher number is required to capture the curvature changes properly.</p>

<div className="howtocode">
<h3 id="how-to-implement-curve-flattening">How to implement curve flattening</h3>
<p>Let's just use the algorithm we just specified, and implement that:</p>
<pre>function flattenCurve(curve, segmentCount):
  step = 1/segmentCount;
  coordinates = [curve.getXValue(0), curve.getYValue(0)]
  for(i=1; i &lt;= segmentCount; i++):
    t = i*step;
    coordinates.push[curve.getXValue(t), curve.getYValue(t)]
  return coordinates;
</pre>
<p>And done, that's the algorithm implemented. That just leaves drawing the resulting "curve" as a sequence of lines:</p>
<pre>function drawFlattenedCurve(curve, segmentCount):
  coordinates = flattenCurve(curve, segmentCount)
  coord = coordinates[0], _coords;
  for(i=1; i &lt; coordinates.length; i++):
    _coords = coordinates[i]
    line(coords, _coords)
    coords = _coords
</pre>
<p>We start with the first coordinate as reference point, and then just draw lines between each point and its next point.</p>
</div>
</section>; }

  },
  "splitting": {
    "locale": "en-GB",
    "title": "Splitting curves",
    "getContent": function(handler) { return <section>
<SectionHeader name="splitting" title="Splitting curves" number="9"/>
<p>With de Casteljau's algorithm we also find all the points we need to split up a Bézier curve into two, smaller curves, which taken together form the original curve. When we construct de Casteljau's skeleton for some value <code>t</code>, the procedure gives us all the points we need to split a curve at that <code>t</code> value: one curve is defined by all the inside skeleton points found prior to our on-curve point, with the other curve being defined by all the inside skeleton points after our on-curve point.</p>
<Graphic title="Splitting a curve" setup={handler.setupCubic} draw={handler.drawSplit} />
<div className="howtocode">
<h3 id="implementing-curve-splitting">implementing curve splitting</h3>
<p>We can implement curve splitting by bolting some extra logging onto the de Casteljau function:</p>
<pre>left=[]
right=[]
function drawCurve(points[], t):
  if(points.length==1):
    left.add(points[0])
    right.add(points[0])
    draw(points[0])
  else:
    newpoints=array(points.size-1)
    for(i=0; i&lt;newpoints.length; i++):
      if(i==0):
        left.add(points[i])
      if(i==newpoints.length-1):
        right.add(points[i+1])
      newpoints[i] = (1-t) * points[i] + t * points[i+1]
    drawCurve(newpoints, t)
</pre>
<p>After running this function for some value <code>t</code>, the <code>left</code> and <code>right</code> arrays will contain all the coordinates for two new curves - one to the "left" of our <code>t</code> value, the other on the "right", of the same order as the original curve, and overlayed exactly on the original curve.</p>
</div>
<p>This is best illustrated with an animated graphic (click to play/pause):</p>
<Graphic preset="threepanel" title="Bézier curve splitting" setup={handler.setupCubic} draw={handler.drawAnimated} onClick={handler.togglePlay} />
</section>; }

  },
  "matrixsplit": {
    "locale": "en-GB",
    "title": "Splitting curves using matrices",
    "getContent": function(handler) { return <section>
<SectionHeader name="matrixsplit" title="Splitting curves using matrices" number="10"/>
<p>Another way to split curves is to exploit the matrix representation of a Bézier curve. In <a href="#matrix">the section on matrices</a> we saw that we can represent curves as matrix multiplications. Specifically, we saw these two forms for the quadratic, and cubic curves, respectively (using the reversed Bézier coefficients vector for legibility):</p>
\[
  B(t) = \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 & 0 \\
  -2 &  2 & 0 \\
   1 & -2 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
\]<p>and</p>
\[
  B(t) = \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 & 0\\
  -3 &  3 &  0 & 0\\
   3 & -6 &  3 & 0\\
  -1 &  3 & -3 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]<p>Let's say we want to split the curve at some point <code>t = z</code>, forming two new (obviously smaller) Bézier curves. To find the coordinates for these two Bézier curves, we can use the matrix representation and some linear algebra. First, we split out the the actual "point on the curve" information as a new matrix multiplication:</p>
\[
  B(t) =
  \begin{bmatrix}
  1 & (z \cdot t) & (z \cdot t)^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 & 0 \\
  -2 &  2 & 0 \\
   1 & -2 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  1 & 0 & 0 \\
  0 & z & 0 \\
  0 & 0 & z^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 & 0 \\
  -2 &  2 & 0 \\
   1 & -2 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
\]<p>and</p>
\[
  B(t) =
  \begin{bmatrix}
  1 & (z \cdot t) & (z \cdot t)^2 & (z \cdot t)^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 & 0 \\
  -3 &  3 &  0 & 0 \\
   3 & -6 &  3 & 0 \\
  -1 &  3 & -3 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
  =
  \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  1 & 0 & 0   & 0\\
  0 & z & 0   & 0\\
  0 & 0 & z^2 & 0\\
  0 & 0 & 0   & z^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 & 0 \\
  -3 &  3 &  0 & 0 \\
   3 & -6 &  3 & 0 \\
  -1 &  3 & -3 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]<p>If we could compact these matrices back to a form <strong>[t values] · [bezier matrix] · [column matrix]</strong>, with the first two staying the same, then that column matrix on the right would be the coordinates of a new Bézier curve that describes the first segment, from <code>t = 0</code> to <code>t = z</code>. As it turns out, we can do this quite easily, by exploiting some simple rules of linear algebra (and if you don't care about the derivations, just skip to the end of the box for the results!).</p>

<div className="note">
<h2 id="deriving-new-hull-coordinates">Deriving new hull coordinates</h2>
<p>Deriving the two segments upon splitting a curve takes a few steps, and the higher the curve order, the more work it is, so let's look at the quadratic curve first:</p>
\[
  B(t) =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  1 & 0 & 0 \\
  0 & z & 0 \\
  0 & 0 & z^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 & 0 \\
  -2 &  2 & 0 \\
   1 & -2 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
\]\[
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \underset{we\ turn\ this...}{\underbrace{\kern 2.25em Z \cdot M \kern 2.25em}}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
\]\[
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \underset{...into\ this...}{\underbrace{ M \cdot M^{-1} \cdot Z \cdot M }}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
\]\[
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  M
  \underset{...to\ get\ this!}{\underbrace{ \kern 1.25em \cdot \kern 1.25em Q \kern 1.25em \cdot \kern 1.25em}}
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
\]<p>We do this, because [<em>M · M<sup>-1</sup>
</em>] is the identity matrix (a bit like multiplying something by x/x in calculus. It doesn't do anything to the function, but it does allow you to rewrite it to something that may be easier to work with, or can be broken up differently). Adding that as matrix multiplication has no effect on the total formula, but it does allow us to change the matrix sequence [<em>something · M</em>] to a sequence [<em>M · something</em>], and that makes a world of difference: if we know what [<em>M<sup>-1</sup> · Z · M</em>] is, we can apply that to our coordinates, and be left with a proper matrix representation of a quadratic Bézier curve (which is [<em>T · M · P</em>]), with a new set of coordinates that represent the curve from <em>t = 0</em> to <em>t = z</em>. So let's get computing:</p>
\[
  Q = M^{-1} \cdot Z \cdot M =
  \begin{bmatrix}
  1 & 0 & 0 \\
  1 & \frac{1}{2} & 0 \\
  1 & 1 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  1 & 0 & 0 \\
  0 & z & 0 \\
  0 & 0 & z^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 & 0 \\
  -2 &  2 & 0 \\
   1 & -2 & 1
  \end{bmatrix}
  =
  \begin{bmatrix}
  1 & 0 & 0 \\
  -(z-1) & z & 0 \\
  (z - 1)^2 & -2 \cdot (z-1) \cdot z & z^2
  \end{bmatrix}
\]<p>Excellent! Now we can form our new quadratic curve:</p>
\[
  B(t) =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot M \cdot Q \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  M
  \cdot
  \left (
  Q
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
  \right )
\]\[
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 & 0 \\
  -2 &  2 & 0 \\
   1 & -2 & 1
  \end{bmatrix}
  \cdot
  \left (
  \begin{bmatrix}
  1 & 0 & 0 \\
  -(z-1) & z & 0 \\
  (z - 1)^2 & -2 \cdot (z-1) \cdot z & z^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
  \right )
\]\[
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 & 0 \\
  -2 &  2 & 0 \\
   1 & -2 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
    P_1 \\
    z \cdot P_2 - (z-1) \cdot P_1 \\
    z^2 \cdot P_3 - 2 \cdot z \cdot (z-1) \cdot P_2 + (z - 1)^2 \cdot P_1
  \end{bmatrix}
\]<p>
<strong>
<em>Brilliant</em>
</strong>: if we want a subcurve from <code>t = 0</code> to <code>t = z</code>, we can keep the first coordinate the same (which makes sense), our control point becomes a z-ratio mixture of the original control point and the start point, and the new end point is a mixture that looks oddly similar to a bernstein polynomial of degree two, except it uses (z-1) rather than (1-z)... These new coordinates are actually really easy to compute directly!</p>
<p>Of course, that's only one of the two curves. Getting the section from <code>t = z</code> to <code>t = 1</code> requires doing this again. We first observe what what we just did is actually evaluate the general interval [0,<code>z</code>], which we wrote down simplified becuase of that zero, but we actually evaluated this:</p>
\[
  B(t) =
  \begin{bmatrix}
  1 & ( 0 + z \cdot t) & ( 0 + z \cdot t)^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 & 0 \\
  -2 &  2 & 0 \\
   1 & -2 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
\]\[
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  1 & 0 & 0 \\
  0 & z & 0 \\
  0 & 0 & z^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 & 0 \\
  -2 &  2 & 0 \\
   1 & -2 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
\]<p>If we want the interval [<em>z</em>,1], we will be evaluating this instead:</p>
\[
  B(t) =
  \begin{bmatrix}
  1 & ( z + (1-z) \cdot t) & ( z + (1-z) \cdot t)^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 & 0 \\
  -2 &  2 & 0 \\
   1 & -2 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
\]\[
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  1 & z & z^2 \\
  0 & 1-z & 2 \cdot z \cdot (1-z) \\
  0 & 0 & (1-z)^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 & 0 \\
  -2 &  2 & 0 \\
   1 & -2 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
\]<p>We're going to do the same trick, to turn <code>[something · M]</code> into <code>[M · something]</code>:</p>
\[
  Q' = M^{-1} \cdot Z' \cdot M =
  \begin{bmatrix}
  1 & 0 & 0 \\
  1 & \frac{1}{2} & 0 \\
  1 & 1 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  1 & z & z^2 \\
  0 & 1-z & 2 \cdot z \cdot (1-z) \\
  0 & 0 & (1-z)^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 & 0 \\
  -2 &  2 & 0 \\
   1 & -2 & 1
  \end{bmatrix}
  =
  \begin{bmatrix}
  (z-1)^2 & -2 \cdot z \cdot (z-1) & z^2 \\
  0 & -(z-1) & z \\
  0 & 0 & 1
  \end{bmatrix}
\]<p>So, our final second curve looks like:</p>
\[
  B(t) =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot M \cdot Q \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  M
  \cdot
  \left (
  Q'
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
  \right )
\]\[
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 & 0 \\
  -2 &  2 & 0 \\
   1 & -2 & 1
  \end{bmatrix}
  \cdot
  \left (
  \begin{bmatrix}
  (z-1)^2 & -2 \cdot z \cdot (z-1) & z^2 \\
  0 & -(z-1) & z \\
  0 & 0 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
  \right )
\]\[
  =
  \begin{bmatrix}
  1 & t & t^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 & 0 \\
  -2 &  2 & 0 \\
   1 & -2 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
    z^2 \cdot P_3 - 2 \cdot z \cdot (z-1) \cdot P_2 + (z-1)^2 \cdot P_1 \\
    z \cdot P_3  - (z-1) \cdot P_2 \\
    P_3
  \end{bmatrix}
\]<p>
<strong>
<em>Nice</em>
</strong>: we see the same as before; can keep the last coordinate the same (which makes sense), our control point becomes a z-ratio mixture of the original control point and the end point, and the new start point is a mixture that looks oddly similar to a bernstein polynomial of degree two, except it uses (z-1) rather than (1-z). These new coordinates are <em>also</em> really easy to compute directly!</p>
</div>
<p>So, using linear algebra rather than de Casteljau's algorithm, we have determined that for any quadratic curve split at some value <code>t = z</code>, we get two subcurves that are described as Bézier curves with simple-to-derive coordinates.</p>
\[
  \begin{bmatrix}
  1 & 0 & 0 \\
  -(z-1) & z & 0 \\
  (z - 1)^2 & -2 \cdot (z-1) \cdot z & z^2
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
  =
  \begin{bmatrix}
    P_1 \\
    z \cdot P_2 - (z-1) \cdot P_1 \\
    z^2 \cdot P_3 - 2 \cdot z \cdot (z-1) \cdot P_2 + (z - 1)^2 \cdot P_1
  \end{bmatrix}
\]<p>and</p>
\[
  \begin{bmatrix}
  (z-1)^2 & -2 \cdot z \cdot (z-1) & z^2 \\
  0 & -(z-1) & z \\
  0 & 0 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3
  \end{bmatrix}
  =
  \begin{bmatrix}
    z^2 \cdot P_3 - 2 \cdot z \cdot (z-1) \cdot P_2 + (z-1)^2 \cdot P_1 \\
    z \cdot P_3  - (z-1) \cdot P_2 \\
    P_3
  \end{bmatrix}
\]<p>We can do the same for cubic curves. However, I'll spare you the actual derivation (don't let that stop you from writing that out yourself, though) and simply show you the resulting new coordinate sets:</p>
\[
  \begin{bmatrix}
    1 & 0 & 0 & 0 \\
    -(z-1) & z & 0 & 0 \\
    (z-1)^2 & -2 \cdot (z-1) \cdot z & z^2 & 0 \\
    -(z-1)^3 & 3 \cdot (z-1)^2 \cdot z & -3 \cdot (z-1) \cdot z^2 & z^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
  =
  \begin{bmatrix}
    P_1 \\
    z \cdot P_2 - (z-1) \cdot P_1 \\
    z^2 \cdot P_3 - 2 \cdot z \cdot (z-1) \cdot P_2 + (z-1)^2 \cdot P_1 \\
    z^3 \cdot P_4 - 3 \cdot z^2 \cdot (z-1) \cdot P_3 + 3 \cdot z \cdot (z-1)^2 \cdot P_2 - (z-1)^3 \cdot P_1
  \end{bmatrix}
\]<p>and</p>
\[
  \begin{bmatrix}
    -(z-1)^3 & 3 \cdot (z-1)^2 \cdot z & -3 \cdot (z-1)^3 \cdot z^2 & z^3 \\
    0 & (z-1)^2 & -2 \cdot (z-1) \cdot z & z^2 \\
    0 & 0 & -(z-1) & z \\
    0 & 0 & 0 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
  =
  \begin{bmatrix}
    z^3 \cdot P_4 - 3 \cdot z^2 \cdot (z-1) \cdot P_3 + 3 \cdot z \cdot (z-1)^2 \cdot P_2 - (z-1)^3 \cdot P_1 \\
    z^2 \cdot P_4 - 2 \cdot z \cdot (z-1) \cdot P_3 + (z-1)^2 \cdot P_2 \\
    z \cdot P_4 - (z-1) \cdot P_3 \\
    P_4
  \end{bmatrix}
\]<p>So, looking at our matrices, did we really need to compute the second segment matrix? No, we didn't. Actually having one segment's matrix means we implicitly have the other: push the values of each row in the matrix <strong>
<em>Q</em>
</strong> to the right, with zeroes getting pushed off the right edge and appearing back on the left, and then flip the matrix vertically. Presto, you just "calculated" <strong>
<em>Q'</em>
</strong>.</p>
<p>Implementing curve splitting this way requires less recursion, and is just straight arithmetic with cached values, so can be cheaper on systems were recursion is expensive. If you're doing computation with devices that are good at matrix multiplication, chopping up a Bézier curve with this method will be a lot faster than applying de Casteljau.</p>
</section>; }

  },
  "reordering": {
    "locale": "en-GB",
    "title": "Lowering and elevating curve order",
    "getContent": function(handler) { return <section>
<SectionHeader name="reordering" title="Lowering and elevating curve order" number="11"/>
<p>One interesting property of Bézier curves is that an <em>n<sup>th</sup>
</em> order curve can always be perfectly represented by an <em>(n+1)<sup>th</sup>
</em> order curve, by giving the higher order curve specific control points.</p>
<p>If we have a curve with three points, then we can create a four point curve that exactly reproduce the original curve as long as we give it the same start and end points, and for its two control points we pick "1/3<sup>rd</sup> start + 2/3<sup>rd</sup> control" and "2/3<sup>rd</sup> control + 1/3<sup>rd</sup> end", and now we have exactly the same curve as before, except represented as a cubic curve, rather than a quadratic curve.</p>
<p>The general rule for raising an <em>n<sup>th</sup>
</em> order curve to an <em>(n+1)<sup>th</sup>
</em> order curve is as follows (observing that the start and end weights are the same as the start and end weights for the old curve):</p>
\[
  Bézier(k,t) = \sum_{i=0}^{k}
                \underset{binomial\ term}{\underbrace{\binom{k}{i}}}
                \cdot\
                \underset{polynomial\ term}{\underbrace{(1-t)^{k-i} \cdot t^{i}}}
                \ \cdot \
                \underset{new\ weights}{\underbrace{\left ( \frac{(k-i) \cdot w_i + i \cdot w_{i-1}}{k} \right )}}
  \ ,\ with\ k = n+1\ and\ w_{i-1}=0\ when\ i = 0
\]<p>However, this rule also has as direct consequence that you <strong>cannot</strong> generally safely lower a curve from <em>n<sup>th</sup>
</em> order to <em>(n-1)<sup>th</sup>
</em> order, because the control points cannot be "pulled apart" cleanly. We can try to, but the resulting curve will not be identical to the original, and may in fact look completely different.</p>
<p>We can apply this to a (semi) random curve, as is done in the following graphic. Select the sketch and press your up and down arrow keys to elevate or lower the curve order.</p>
<Graphic preset="simple" title={"A " + handler.getOrder() + " order Bézier curve"} setup={handler.setup} draw={handler.draw} onKeyDown={handler.props.onKeyDown} />
<p>There is a good, if mathematical, explanation on the matrices necessary for optimal reduction over on <a href="http://www.sirver.net/blog/2011/08/23/degree-reduction-of-bezier-curves">Sirver's Castle</a>, which given time will find its way in a more direct description into this article.</p>
</section>; }

  },
  "derivatives": {
    "locale": "en-GB",
    "title": "Derivatives",
    "getContent": function(handler) { return <section>
<SectionHeader name="derivatives" title="Derivatives" number="12"/>
<p>There's a number of useful things that you can do with Bézier curves based on their derivative, and one of the more amusing observations about Bézier curves is that their derivatives are, in fact, also Bézier curves. In fact, the derivation of a Bézier curve is relatively straight forward, although we do need a bit of math. First, let's look at the derivative rule for Bézier curves, which is:</p>
\[
  Bézier'(n,t) = n \cdot \sum_{i=0}^{n-1} (b_{i+1}-b_i) \cdot Bézier(n-1,t)_i
\]<p>which we can also write (observing that <i>b</i> in this formula is the same as our <i>w</i> weights, and that <i>n</i> times a summation is the same as a summation where each term is multiplied by <i>n</i>) as:</p>
\[
  Bézier'(n,t) = \sum_{i=0}^{n-1} Bézier(n-1,t)_i \cdot n \cdot (w_{i+1}-w_i)
\]<p>Or, in plain text: the derivative of an n<sup>th</sup> degree Bézier curve is an (n-1)<sup>th</sup> degree Bézier curve, with one fewer term, and new weights w'<sub>0</sub>...w'<sub>n-1</sub> derived from the original weights as n(w<sub>i+1</sub> - w<sub>i</sub>), so for a 3rd degree curve, with four weights, the derivative has three new weights w'<sub>0</sub> = 3(w<sub>1</sub>-w<sub>0</sub>), w'<sub>1</sub> = 3(w<sub>2</sub>-w<sub>1</sub>) and w'<sub>2</sub> = 3(w<sub>3</sub>-w<sub>2</sub>).</p>

<div className="note">
<h3 id="-slow-down-why-is-that-true-">"Slow down, why is that true?"</h3>
<p>Sometimes just being told "this is the derivative" is nice, but you might want to see why this is indeed the case. As such, let's have a look at the proof for this derivative. First off, the weights are independent of the full Bézier function, so the derivative involves only the derivative of the polynomial basis function. So, let's find that:</p>
\[
  B_{n,k}(t) \frac{d}{dt} = {n \choose k} t^k (1-t)^{n-k} \frac{d}{dt}
\]<p>Applying the <a href="http://en.wikipedia.org/wiki/Product_rule">product</a> and <a href="http://en.wikipedia.org/wiki/Chain_rule">chain</a> rules gives us:</p>
\[\begin{array}{l}
  ... &= {n \choose k} \left (
    k \cdot t^{k-1} (1-t)^{n-k} + t^k \cdot (1-t)^{n-k-1} \cdot (n-k) \cdot -1
  \right )
\end{array}\]<p>Which is hard to work with, so let's expand that properly:</p>
\[\begin{array}{l}
  ... &= \frac{kn!}{k!(n-k)!} t^{k-1} (1-t)^{n-k} - \frac{(n-k)n!}{k!(n-k)!} t^k (1-t)^{n-1-k}
\end{array}\]<p>Now, the trick is to turn this expression into something that has binomial coefficients again, so we want to end up with things that look like "x! over y!(x-y)!". If we can do that in a way that involves terms of <i>n-1</i> and <i>k-1</i>, we'll be on the right track.</p>
\[\begin{array}{l}
  ... &= \frac{n!}{(k-1)!(n-k)!} t^{k-1} (1-t)^{n-k} - \frac{(n-k)n!}{k!(n-k)!} t^k (1-t)^{n-1-k} \\

  ... &= n \left (
    \frac{(n-1)!}{(k-1)!(n-k)!} t^{k-1} (1-t)^{n-k} - \frac{(n-k)(n-1)!}{k!(n-k)!} t^k (1-t)^{n-1-k}
  \right ) \\

  ... &= n \left (
    \frac{(n-1)!}{(k-1)!((n-1)-(k-1))!} t^{(k-1)} (1-t)^{(n-1)-(k-1)} - \frac{(n-1)!}{k!((n-1)-k)!} t^k (1-t)^{(n-1)-k}
  \right )
\end{array}\]<p>And that's the first part done: the two components inside the parentheses are actually regular, lower order Bezier expressions:</p>
\[\begin{array}{l}
  ... &= n \left (
    \frac{x!}{y!(x-y)!} t^{y} (1-t)^{x-y} - \frac{x!}{k!(x-k)!} t^k (1-t)^{x-k}
  \right )
  \ ,\ with\ x=n-1,\ y=k-1
  \\


  ... &= n \left ( B_{(n-1),(k-1)}(t) - B_{(n-1),k}(t) \right )
\end{array}\]<p>Now to apply this to our weighted Bezier curves. We'll write out the plain curve formula that we saw earlier, and then work our way through to its derivative:</p>
\[\begin{array}{l}
  Bézier_{n,k}(t) &=& B_{n,0}(t) \cdot w_0 + B_{n,1}(t) \cdot w_1 + B_{n,2}(t) \cdot w_2 + B_{n,3}(t) \cdot w_3 + ... \\
  Bézier_{n,k}(t) \frac{d}{dt} &=& n \cdot (B_{n-1,-1}(t) - B_{n-1,0}(t)) \cdot w_0 + \\
                               & & n \cdot (B_{n-1,0}(t) - B_{n-1,1}(t)) \cdot w_1 + \\
                               & & n \cdot (B_{n-1,1}(t) - B_{n-1,2}(t)) \cdot w_2 + \\
                               & & n \cdot (B_{n-1,2}(t) - B_{n-1,3}(t)) \cdot w_3 + \\
                               & & ...
\end{array}\]<p>If we expand this (with some color to show how terms line up), and reorder the terms by increasing values for <i>k</i> we see the following:</p>
\[\begin{array}{l}
  n \cdot B_{n-1,-1}(t) \cdot w_0 &+& & \\
  n \cdot B_{n-1,BLUE[0]}(t) \cdot w_1 &-& n \cdot B_{n-1,BLUE[0]}(t) \cdot w_0 & + \\
  n \cdot B_{n-1,RED[1]}(t) \cdot w_2 &-& n \cdot B_{n-1,RED[1]}(t) \cdot w_1 & + \\
  n \cdot B_{n-1,MAGENTA[2]}(t) \cdot w_3 &-& n \cdot B_{n-1,MAGENTA[2]}(t) \cdot w_2 & + \\
  ... &-& n \cdot B_{n-1,3}(t) \cdot w_3 & + \\
  ... & & &
\end{array}\]<p>Two of these terms fall way: the first term falls away because there is no -1<sup>st</sup> term in a summation. As such, it always contributes "nothing", so we can safely completely ignore it for the purpose of finding the derivative function. The other term is the very last term in this expansion: one involving <i>B<sub>n-1,n</sub>
</i>. This term would have a binomial coefficient of [<i>i</i> choose <i>i+1</i>], which is a non-existent binomial coefficient. Again, this term would contribute "nothing", so we can ignore it, too. This means we're left with:</p>
\[\begin{array}{l}
  n \cdot B_{n-1,BLUE[0]}(t) \cdot w_1 &-& n \cdot B_{n-1,BLUE[0]}(t) \cdot w_0 &+ \\
  n \cdot B_{n-1,RED[1]}(t) \cdot w_2 &-& \ n \cdot B_{n-1,RED[1]}(t) \cdot w_1 &+ \\
  n \cdot B_{n-1,MAGENTA[2]}(t) \cdot w_3 &-& n \cdot B_{n-1,MAGENTA[2]}(t) \cdot w_2 &+ \\
  ...
\end{array}\]<p>And that's just a summation of lower order curves:</p>
\[
  Bézier_{n,k}(t) \frac{d}{dt} = n \cdot B_{(n-1),BLUE[0]}(t) \cdot (w_1 - w_0)
                            + n \cdot B_{(n-1),RED[1]}(t) \cdot (w_2 - w_1)
                            + n \cdot B_{(n-1),MAGENTA[2]}(t) \cdot (w_3 - w_2)
                            \ + \ ...
\]<p>We can rewrite this as a normal summation, and we're done:</p>
\[
  Bézier_{n,k}(t) \frac{d}{dt} = \sum_{k=0}^{n-1} n \cdot B_{n-1,k}(t) \cdot (w_{k+1} - w_k)
                               = \sum_{k=0}^{n-1} B_{n-1,k}(t) \cdot \underset{derivative\ weights}
                                 {\underbrace{n \cdot (w_{k+1} - w_k)}}
\]</div>
<p>Let's rewrite that in a form similar to our original formula, so we can see the difference. We will first list our original formula for Bézier curves, and then the derivative:</p>
\[
  Bézier(n,t) = \sum_{i=0}^{n}
                \underset{binomial\ term}{\underbrace{\binom{n}{i}}}
                \cdot\
                \underset{polynomial\ term}{\underbrace{(1-t)^{n-i} \cdot t^{i}}}
                \cdot\
                \underset{weight}{\underbrace{w_i}}
\]\[
  Bézier'(n,t) = \sum_{i=0}^{k}
                \underset{binomial\ term}{\underbrace{\binom{k}{i}}}
                \cdot\
                \underset{polynomial\ term}{\underbrace{(1-t)^{k-i} \cdot t^{i}}}
                \cdot\
                \underset{derivative\ weight}{\underbrace{n \cdot (w_{i+1} - w_i)}}
                {\ , \ with \ k=n-1}
\]<p>What are the differences? In terms of the actual Bézier curve, virtually nothing! We lowered the order (rather than <i>n</i>, it's now <i>n-1</i>), but it's still the same Bézier function. The only real difference is in how the weights change when we derive the curve's function. If we have four points A, B, C, and D, then the derivative will have three points, the second derivative two, and the third derivative one:</p>
\[ \begin{array}{l}
  B(n,t),    &        & w = \{A,B,C,D\} \\
  B'(n,t),   & n = 3, & w' = \{A',B',C'\}    &= \{3 \cdot (B-A), {\ } 3 \cdot (C-B), {\ } 3 \cdot (D-C)\} \\
  B''(n,t),  & n = 2, & w'' = \{A'',B''\}    &= \{2 \cdot (B'-A'), {\ } 2 \cdot (C'-B')\} \\
  B'''(n,t), & n = 1, & w''' = \{A'''\} &= \{1 \cdot (B''-A'')\}
\end{array} \]<p>We can keep performing this trick for as long as we have more than one weight. Once we have one weight left, the next step will see <i>k = 0</i>, and the result of our "Bézier function" summation is zero, because we're not adding anything at all. As such, a quadratic curve has no second derivative, a cubic curve has no third derivative, and generalized: an <i>n<sup>th</sup>
</i> order curve has <i>n-1</i> (meaningful) derivatives, with any further derivative being zero.</p>
</section>; }

  },
  "pointvectors": {
    "locale": "en-GB",
    "title": "Tangents and normals",
    "getContent": function(handler) { return <section>
<SectionHeader name="pointvectors" title="Tangents and normals" number="13"/>
<p>If you want to move objects along a curve, or "away from" a curve, the two vectors you're most interested in are the tangent vector and normal vector for curve points. These are actually really easy to find. For moving, and orienting, along a curve we use the tangent, which indicates the direction travel at specific points, and is literally just the first derivative of our curve:</p>
\[
\left \{ \begin{matrix}
  tangent_x(t) = B'_x(t) \\
  tangent_y(t) = B'_y(t)
\end{matrix} \right.
\]<p>This gives us the directional vector we want. We can normalize it to give us uniform directional vectors (having a length of 1.0) at each point, and then do whatever it is we want to do based on those directions:</p>
\[
  d = || tangent(t) || = \sqrt{B'_x(t)^2 + B'_y(t)^2}
\]\[
\left \{ \begin{matrix}
  \hat{x}(t) = || tangent_x(t) ||
             =\frac{tangent_x(t)}{ || tangent(t) || }
             = \frac{B'_x(t)}{d} \\
  \hat{y}(t) = || tangent_y(t) ||
             = \frac{tangent_y(t)}{ || tangent(t) || }
             = \frac{B'_y(t)}{d}
\end{matrix} \right.
\]<p>The tangent is very useful for moving along a line, but what if we want to move away from the curve instead, perpendicular to the curve at some point <i>t</i>? In that case we want the "normal" vector. This vector runs at a right angle to the direction of the curve, and is typically of length 1.0, so all we have to do is rotate the normalized directional vector and we're done:</p>
\[
\left \{ \begin{array}{l}
  normal_x(t) = \hat{x}(t) \cdot \cos{\frac{\pi}{2}} - \hat{y}(t) \cdot \sin{\frac{\pi}{2}} = - \hat{y}(t) \\
  normal_y(t) = \underset{quarter\ circle\ rotation} {\underbrace{ \hat{x}(t) \cdot \sin{\frac{\pi}{2}} + \hat{y}(t) \cdot \cos{\frac{\pi}{2}} }} = \hat{x}(t)
\end{array} \right.
\]
<div className="note">
<p>Rotating coordinates is actually very easy, if you know the rule for it. You might find it explained as "applying a <a href="https://en.wikipedia.org/wiki/Rotation_matrix">rotation matrix</a>, which is what we'll look at here, too. Essentially, the idea is to take the circles over which we can rotate, and simply "sliding the coordinates" over these circles by the desired
angle. If we want a quarter circle turn, we take the coordinate, slide it along the cirle by a quarter turn, and done.</p>
<p>To turn any point <i>(x,y)</i> into a rotated point <i>(x',y')</i> (over 0,0) by some angle φ, we apply this nicely easy computation:</p>
\[\begin{array}{l}
  x' = x \cdot \cos(\phi) - y \cdot \sin(\phi) \\
  y' = x \cdot \sin(\phi) + y \cdot \cos(\phi)
\end{array}\]<p>Which is the "long" version of the following matrix transformation:</p>
\[
  \begin{bmatrix}
    x' \\ y'
  \end{bmatrix}
  =
  \begin{bmatrix}
   \cos(\phi) & -\sin(\phi) \\
   \sin(\phi) & \cos(\phi)
  \end{bmatrix}
  \begin{bmatrix}
    x \\ y
  \end{bmatrix}
\]<p>And that's all we need to rotate any coordinate. Note that for quarter, half and three quarter turns these functions become even easier, since <em>sin</em> and <em>cos</em> for these angles are, respectively: 0 and 1, -1 and 0, and 0 and -1.</p>
<p>But <strong>
<em>why</em>
</strong> does this work? Why this matrix multiplication? <a href="http://en.wikipedia.org/wiki/Rotation_matrix#Decomposition_into_shears">Wikipedia</a> (Technically, Thomas Herter and Klaus Lott) tells us that a rotation matrix can be
treated as a sequence of three (elementary) shear operations. When we combine this into a single matrix operation (because all matrix multiplications can be collapsed), we get the matrix that you see above. <a href="http://datagenetics.com/blog/august32013/index.html">DataGenetics</a> have an excellent article about this very thing: it's really quite cool, and I strongly recommend taking a quick break from this primer to read that article.</p>
</div>
<p>The following two graphics show the tangent and normal along a quadratic and cubic curve, with the direction vector coloured blue, and the normal vector coloured red (the markers are spaced out evenly as <em>t</em>-intervals, not spaced equidistant).</p>

<div className="figure">
  <Graphic preset="simple" title="Quadratic Bézier tangents and normals" inline={true} setup={handler.setupQuadratic} draw={handler.draw}/>
  <Graphic preset="simple" title="Cubic Bézier tangents and normals" inline={true} setup={handler.setupCubic} draw={handler.draw}/>
</div>
</section>; }

  },
  "components": {
    "locale": "en-GB",
    "title": "Component functions",
    "getContent": function(handler) { return <section>
<SectionHeader name="components" title="Component functions" number="14"/>
<p>One of the first things people run into when they start using Bézier curves in their own programs is "I know how to draw the curve, but how do I determine the bounding box?". It's actually reasonably straight forward to do so, but it requires having some knowledge on exploiting math to get the values we need. For bounding boxes, we aren't actually interested in the curve itself, but only in its "extremities": the minimum and maximum values the curve has for its x- and y-axis values. If you remember your calculus (provided you ever took calculus, otherwise it's going to be hard to remember) we can determine function extremities using the first derivative of that function, but this poses a problem, since our function is parametric: every axis has its own function.</p>
<p>The solution: compute the derivative for each axis separately, and then fit them back together in the same way we do for the original.</p>
<p>Let's look at how a parametric Bézier curve "splits up" into two normal functions, one for the x-axis and one for the y-axis. Note the left-most figure is again an interactive curve, without labeled axes (you get coordinates in the graph instead).  The center and right-most figures are the component functions for computing the x-axis value, given a value for <i>t</i> (between 0 and 1 inclusive), and the y-axis value, respectively.</p>
<p>If you move points in a curve sideways, you should only see the middle graph change; likely, moving points vertically should only show a change in the right graph.</p>
<Graphic preset="simple" title="Quadratic Bézier curve components" setup={handler.setupQuadratic} draw={handler.draw}/>
<Graphic preset="simple" title="Cubic Bézier curve components" setup={handler.setupCubic} draw={handler.draw}/>
</section>; }

  },
  "extremities": {
    "locale": "en-GB",
    "title": "Finding extremities: root finding",
    "getContent": function(handler) { return <section>
<SectionHeader name="extremities" title="Finding extremities: root finding" number="15"/>
<p>Now that we understand (well, superficially anyway) the component functions, we can find the extremities of our Bézier curve by finding maxima and minima on the component functions, by solving the equations B'(t) = 0 and B''(t) = 0. Although, in the case of quadratic curves there is no B''(t), so we only need to compute B'(t) = 0. So, how do we compute the first and second derivatives? Fairly easily, actually, until our derivatives are 4th order or higher... then things get really hard. But let's start simple:</p>
<h3 id="quadratic-curves-linear-derivatives-">Quadratic curves: linear derivatives.</h3>
<p>Finding the solution for "where is this line 0" should be trivial:</p>
\[
\begin{align}
  l(x) = ax + b &= 0,\\
  ax + b &= 0,\\
  ax &= -b \\
  x &= \frac{-b}{a}
\end{align}
\]<p>Done. And quadratic curves have no meaningful second derivative, so we're <em>really</em> done.</p>
<h3 id="cubic-curves-the-quadratic-formula-">Cubic curves: the quadratic formula.</h3>
<p>The derivative of a cubic curve is a quadratic curve, and finding the roots for a quadratic Bézier curve means we can apply the <a href="https://en.wikipedia.org/wiki/Quadratic_formula">Quadratic formula</a>. If you've seen it before, you'll remember it, and if you haven't, it looks like this:</p>
\[
  Given\ f(t) = at^2 + bt + c,\ f(t)=0\ when\ t = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
\]<p>So, if we can express a Bézier component function as a plain polynomial, we're done: we just plug in the values into the quadratic formula, check if that square root is negative or not (if it is, there are no roots) and then just compute the two values that come out (because of that plus/minus sign we get two). Any value between 0 and 1 is a root that matters for Bézier curves, anything below or above that is irrelevant (because Bézier curves are only defined over the interval [0,1]). So, how do we convert?</p>
<p>First we turn our cubic Bézier function into a quadratic one, by following the rule mentioned at the end of the <a href="#derivatives">derivatives section</a>:</p>
\[
\begin{align}
  B(t)\ uses\ \{ p_1,p_2,p_3,p_4 \} \\
  B'(t)\ uses\ \{ v_1.v_2,v_3 \},\ where\ v_1 = 3(p_2-p_1),\ v_2 = 3(p_3-p_2),\ v_3 = 3(p_4-p_3)
\end{align}
\]<p>And then, using these <em>v</em> values, we can find out what our <em>a</em>, <em>b</em>, and <em>c</em> should be:</p>
\[
\begin{align}
  B'(t) &= v_1(1-t)^2 + 2v_2(1-t)t + v_3t^2 \\
  ... &= v_1(t^2 - 2t + 1) + 2v_2(t-t^2) + v_3t^2 \\
  ... &= v_1t^2 - 2v_1t + v_1 + 2v_2t - 2v_2t^2 + v_3t^2 \\
  ... &= v_1t^2 - 2v_2t^2 + v_3t^2 - 2v_1t + v_1 + 2v_2t \\
  ... &= (v_1-2v_2+v_3)t^2 + 2(v_2-v_1)t + v_1
\end{align}
\]<p>This gives us thee coefficients <em>a</em>, <em>b</em>, and <em>c</em> that are expressed in terms of <em>v</em> values, where the <em>v</em> values are just convenient expressions of our original <em>p</em> values, so we can do some trivial substitution to get:</p>
\[
\begin{align}
  a &= v_1-2v_2+v_3 = 3(-p_1 + 3p_2 - 3p_3 + p_4) \\
  b &= 2(v_2-v_1) = 6(p_1 - 2p_2 + p_3) \\
  c &= v_1 = 3(p_2-p_1)
\end{align}
\]<p>Easy peasy. We can now almost trivially find the roots by plugging those values into the quadratic formula. We also note that the second derivative of a cubic curve means computing the first derivative of a quadratic curve, and we just saw how to do that in the section above.</p>
<h3 id="quartic-curves-cardano-s-algorithm-">Quartic curves: Cardano's algorithm.</h3>
<p>Quartic—fourth degree—curves have a cubic function as derivative. Now, cubic functions are a bit of a problem because they're really hard to solve. But, way back in the 16<sup>th</sup> century, <a href="https://en.wikipedia.org/wiki/Gerolamo_Cardano">Gerolamo Cardano</a> figured out that even if the general cubic function is really hard to solve, it can be rewritten to a form for which finding the roots is "easy", and then the only hard part is figuring out how to go from that form to the
generic form. So:</p>
\[
  very\ hard:\ solve\ at^3 + bt^2 + ct + d = 0\\
  easier:\ solve\ t^3 + pt + q = 0
\]<p>This is easier because for the "easier formula" we can use <a href="http://www.wolframalpha.com/input/?i=t^3+%2B+pt+%2B+q">regular calculus</a> to find the roots (as a cubic function, however, it can have up to three roots, but two of those can be complex. For the purpose of Bézier curve extremities, we can completely ignore those complex roots, since our <em>t</em> is a plain real number from 0 to 1).</p>
<p>So, the trick is to figure out how to turn the first formula into the second formula, and to then work out the maths that gives us the roots. This is explained in detail over at <a href="http://www.trans4mind.com/personal_development/mathematics/polynomials/cubicAlgebra.htm">Ken J. Ward's page</a> for solving the cubic equation, so instead of showing the maths, I'm simply going to show the programming code for solving the cubic equation, with the complex roots getting totally ignored.</p>

<div className="howtocode">
<h3 id="implementing-cardano-s-algorithm-for-finding-all-real-roots">Implementing Cardano's algorithm for finding all real roots</h3>
<p>The "real roots" part is fairly important, because while you cannot take a square, cube, etc. root of a negative number in the "real" number space (denoted with ℝ), this is perfectly fine in the <a href="https://en.wikipedia.org/wiki/Complex_number">"complex" number</a> space (denoted with ℂ). And, as it so happens, Cardano is also attributed as the first mathematician in history to have made use of complex numbers in his calculations. For this very algorithm!</p>
<pre>// A helper function to filter for values in the [0,1] interval:
function accept(t) {
  return 0&lt;=t && t &lt;=1;
}

// A real-cuberoots-only function:
function crt(v) {
  if(v&lt;0) return -Math.pow(-v,1/3);
  return Math.pow(v,1/3);
}

// Now then: given cubic coordinates {pa, pb, pc, pd} find all roots.
function getCubicRoots(pa, pb, pc, pd) {
  var d = (-pa + 3*pb - 3*pc + pd),
  a = (3*pa - 6*pb + 3*pc) / d,
  b = (-3*pa + 3*pb) / d,
  c = pa / d;

  var p = (3*b - a*a)/3,
  p3 = p/3,
  q = (2*a*a*a - 9*a*b + 27*c)/27,
  q2 = q/2,
  discriminant = q2*q2 + p3*p3*p3;

  // and some variables we're going to use later on:
  var u1,v1,root1,root2,root3;

  // three possible real roots:
  if (discriminant &lt; 0) {
    var mp3  = -p/3,
    mp33 = mp3*mp3*mp3,
    r    = sqrt( mp33 ),
    t    = -q / (2*r),
    cosphi = t&lt;-1 ? -1 : t&gt;1 ? 1 : t,
    phi  = acos(cosphi),
    crtr = cuberoot(r),
    t1   = 2*crtr;
    root1 = t1 * cos(phi/3) - a/3;
    root2 = t1 * cos((phi+2*pi)/3) - a/3;
    root3 = t1 * cos((phi+4*pi)/3) - a/3;
    return [root1, root2, root3].filter(accept);
  }

  // three real roots, but two of them are equal:
  if(discriminant === 0) {
    u1 = q2 &lt; 0 ? cuberoot(-q2) : -cuberoot(q2);
    root1 = 2*u1 - a/3;
    root2 = -u1 - a/3;
    return [root1, root2].filter(accept);
  }

  // one real root, two complex roots
  var sd = sqrt(discriminant);
  u1 = cuberoot(sd - q2);
  v1 = cuberoot(sd + q2);
  root1 = u1 - v1 - a/3;
  return [root1].filter(accept);
}
</pre>
</div>
<p>And that's it. The maths is complicated, but the code is pretty much just "follow the maths, while caching as many values as we can to reduce recomputing things as much as possible" and now we have a way to find all roots for a cubic function and can just move on with using that to find extremities of our curves.</p>
<h3 id="quintic-and-higher-order-curves-finding-numerical-solutions">Quintic and higher order curves: finding numerical solutions</h3>
<p>The problem with this is that as the order of the curve goes up, we can't actually solve those equations the normal way. We can't take the function, and then work out what the solutions are. Not to mention that even solving a third order derivative (for a fourth order curve) is already a royal pain in the backside. We need a better solution. We need numerical approaches.</p>
<p>That's a fancy word for saying "rather than solve the function, treat the problem as a sequence of identical operations, the performing of which gets us closer and closer to the real answer". As it turns out, there is a really nice numerical root finding algorithm, called the <a href="http://en.wikipedia.org/wiki/Newton-Raphson">Newton-Raphson</a> root finding method (yes, after <em>
<a href="https://en.wikipedia.org/wiki/Isaac_Newton">that</a>
</em> Newton), which we can make use of.</p>
<p>The Newton-Raphson approach consists of picking a value <em>t</em> (any will do), and getting the corresponding value at that <em>t</em> value. For normal functions, we can treat that value as a height. If the height is zero, we're done, we have found a root. If it's not, we take the tangent of the curve at that point, and extend it until it passes the x-axis, which will be at some new point <em>t</em>. We then repeat the procedure with this new value, and we keep doing this until we find our root.</p>
<p>Mathematically, this means that for some <em>t</em>, at step <em>n=1</em>, we perform the following calculation until <em>f<sub>y</sub>
</em>(<em>t</em>) is zero, so that the next <em>t</em> is the same as the one we already have:</p>
\[
  t_{n+1} = t_n - \frac{f_y(t_n)}{f'_y(t_n)}
\]<p>(The wikipedia article has a decent animation for this process, so I'm not adding a sketch for that here unless there are requests for it)</p>
<p>Now, this works well only if we can pick good starting points, and our curve is continuously differentiable and doesn't have oscillations. Glossing over the exact meaning of those terms, the curves we're dealing with conform to those constraints, so as long as we pick good starting points, this will work. So the question is: which starting points do we pick?</p>
<p>As it turns out, Newton-Raphson is so blindingly fast, so we could get away with just not picking: we simply run the algorithm from <em>t=0</em> to <em>t=1</em> at small steps (say, 1/200<sup>th</sup>) and the result will be all the roots we want. Of course, this may pose problems for high order Bézier curves: 200 steps for a 200<sup>th</sup> order Bézier curve is going to go wrong, but that's okay: there is no reason, ever, to use Bézier curves of crazy high orders. You might use a fifth order curve to get the "nicest still remotely workable" approximation of a full circle with a single Bézier curve, that's pretty much as high as you'll ever need to go.</p>
<h3 id="in-conclusion-">In conclusion:</h3>
<p>So now that we know how to do root finding, we can determine the first and second derivative roots for our Bézier curves, and show those roots overlaid on the previous graphics:</p>
<Graphic preset="simple" title="Quadratic Bézier curve extremities" setup={handler.setupQuadratic} draw={handler.draw}/>
<Graphic preset="simple" title="Cubic Bézier curve extremities" setup={handler.setupCubic} draw={handler.draw}/>
</section>; }

  },
  "boundingbox": {
    "locale": "en-GB",
    "title": "Bounding boxes",
    "getContent": function(handler) { return <section>
<SectionHeader name="boundingbox" title="Bounding boxes" number="16"/>
<p>If we have the extremities, and the start/end points, a simple for loop that tests for min/max values for x and y means we have the four values we need to box in our curve:</p>
<p>
<em>Computing the bounding box for a Bézier curve</em>:</p>
<ol>
<li>Find all <em>t</em> value(s) for the curve derivative's x- and y-roots.</li>
<li>Discard any <em>t</em> value that's lower than 0 or higher than 1, because Bézier curves only use the interval [0,1].</li>
<li>Determine the lowest and highest value when plugging the values <em>t=0</em>, <em>t=1</em> and each of the found roots into the original functions: the lowest value is the lower bound, and the highest value is the upper bound for the bounding box we want to construct.</li>
</ol>
<p>Applying this approach to our previous root finding, we get the following bounding boxes (with all curve extremity points shown on the curve):</p>
<Graphic preset="simple" title="Quadratic Bézier bounding box" setup={handler.setupQuadratic} draw={handler.draw} />
<Graphic preset="simple" title="Cubic Bézier bounding box" setup={handler.setupCubic} draw={handler.draw} />
<p>We can construct even nicer boxes by aligning them along our curve, rather than along the x- and y-axis, but in order to do so we first need to look at how aligning works.</p>
</section>; }

  },
  "aligning": {
    "locale": "en-GB",
    "title": "Aligning curves",
    "getContent": function(handler) { return <section>
<SectionHeader name="aligning" title="Aligning curves" number="17"/>
<p>While there are an incredible number of curves we can define by varying the x- and y-coordinates for the control points, not all curves are actually distinct. For instance, if we define a curve, and then rotate it 90 degrees, it's still the same curve, and we'll find its extremities in the same spots, just at different draw coordinates. As such, one way to make sure we're working with a "unique" curve is to "axis-align" it.</p>
<p>Aligning also simplifies a curve's functions. We can translate (move) the curve so that the first point lies on (0,0), which turns our <em>n</em> term polynomial functions into <em>n-1</em> term functions. The order stays the same, but we have less terms. Then, we can rotate the curves so that the last point always lies on the x-axis, too, making its coordinate (...,0). This further simplifies the function for the y-component to an <em>n-2</em> term function. For instance, if we have a cubic curve such as this:</p>
\[
\left \{ \begin{matrix}
  x = BLUE[120] \cdot (1-t)^3 BLUE[+ 35] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 220] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[+ 220] \cdot t^3 \\
  y = BLUE[160] \cdot (1-t)^3 BLUE[+ 200] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 260] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[+ 40] \cdot t^3
\end{matrix} \right.
\]<p>Then translating it so that the first coordinate lies on (0,0), moving all <em>x</em> coordinates by -120, and all <em>y</em> coordinates by -160, gives us:</p>
\[
\left \{ \begin{matrix}
  x = BLUE[0] \cdot (1-t)^3 BLUE[- 85] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 100] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[+ 100] \cdot t^3 \\
  y = BLUE[0] \cdot (1-t)^3 BLUE[+ 40] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 100] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[- 120] \cdot t^3
\end{matrix} \right.
\]<p>If we then rotate the curve so that its end point lies on the x-axis, the coordinates (integer-rounded for illustrative purposes here) become:</p>
\[
\left \{ \begin{matrix}
  x = BLUE[0] \cdot (1-t)^3 BLUE[+ 85] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 12] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[- 156] \cdot t^3 \\
  y = BLUE[0] \cdot (1-t)^3 BLUE[+ 40] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[- 140] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[+ 0] \cdot t^3
\end{matrix} \right.
\]<p>If we drop all the zero-terms, this gives us:</p>
\[
\left \{ \begin{array}{l}
  x = BLUE[85] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[+ 13] \cdot 3 \cdot (1-t) \cdot t^2 BLUE[- 156] \cdot t^3 \\
  y = BLUE[40] \cdot 3 \cdot (1-t)^2 \cdot t BLUE[- 141] \cdot 3 \cdot (1-t) \cdot t^2
\end{array} \right.
\]<p>We can see that our original curve definition has been simplified considerably. The following graphics illustrate the result of aligning our example curves to the x-axis, with the cubic case using the coordinates that were just used in the example formulae:</p>
<Graphic preset="twopanel" title="Aligning a quadratic curve" setup={handler.setupQuadratic} draw={handler.draw} />
<Graphic preset="twopanel" title="Aligning a cubic curve" setup={handler.setupCubic} draw={handler.draw} />
</section>; }

  },
  "tightbounds": {
    "locale": "en-GB",
    "title": "Tight boxes",
    "getContent": function(handler) { return <section>
<SectionHeader name="tightbounds" title="Tight boxes" number="18"/>
<p>With our knowledge of bounding boxes, and curve alignment, We can now form the "tight" bounding box for curves. We first align  our curve, recording the translation we performed, "T", and the rotation angle we used, "R". We then determine the aligned curve's normal bounding box. Once we have that, we can map that bounding box back to our original curve by rotating it by -R, and then translating it by -T. We now have nice tight bounding boxes for our curves:</p>
<Graphic preset="twopanel" title="Aligning a quadratic curve" setup={handler.setupQuadratic} draw={handler.draw} />
<Graphic preset="twopanel" title="Aligning a cubic curve" setup={handler.setupCubic} draw={handler.draw} />
<p>These are, strictly speaking, not necessarily the tightest possible bounding boxes. It is possible to compute the optimal bounding box by determining which spanning lines we need to effect a minimal box area, but because of the parametric nature of Bézier curves this is actually a rather costly operation, and the gain in bounding precision is often not worth it. If there is high demand for it, I'll add a section on how to precisely compute the best fit bounding box, but the maths is fairly gruelling and just not really worth spending time on.</p>
</section>; }

  },
  "inflections": {
    "locale": "en-GB",
    "title": "Curve inflections",
    "getContent": function(handler) { return <section>
<SectionHeader name="inflections" title="Curve inflections" number="19"/>
<p>Now that we know how to align a curve, there's one more thing we can calculate: inflection points. Imagine we have a variable size circle that we can slide up against our curve. We place it against the curve and adjust its radius so that where it touches the curve, the curvatures of the curve and the circle are the same, and then we start to slide the circle along the curve - for quadratic curves, we can always do this without the circle behaving oddly: we might have to change the radius of the circle as we slide it along, but it'll always sit against the same side of the curve.</p>
<p>But what happens with cubic curves? Imagine we have an S curve and we place our circle at the start of the curve, and start sliding it along. For a while we can simply adjust the radius and things will be fine, but once we get to the midpoint of that S, something odd happens: the circle "flips" from one side of the curve to the other side, in order for the curvatures to keep matching. This is called an inflection, and we can find out where those happen relatively easily.</p>
<p>What we need to do is solve a simple equation:</p>
\[
  C(t) = 0
\]<p>What we're saying here is that given the curvature function <em>C(t)</em>, we want to know for which values of <em>t</em> this function is zero, meaning there is no "curvature", which will be exactly at the point between our circle being on one side of the curve, and our circle being on the other side of the curve. So what does <em>C(t)</em> look like? Actually something that seems not too hard:</p>
\[
  C(t) = Bézier_x\prime(t) \cdot Bézier_y{\prime\prime}(t) - Bézier_y\prime(t) \cdot Bézier_x{\prime\prime}(t)
\]<p>So the function <em>C(t)</em> is wholly defined by the first and second derivative functions for the parametric dimensions of our curve. And as already shown, derivatives of Bézier curves are just simpler Bézier curves, with very easy to compute new coefficients, so this should be pretty easy.</p>
<p>However as we've seen in the section on aligning, aligning lets us simplify things <em>a lot</em>, by completely removing the contributions of the first coordinate from most mathematical evaluations, and removing the last <em>y</em> coordinate as well by virtue of the last point lying on the x-axis. So, while we can evaluate <em>C(t) = 0</em> for our curve, it'll be much easier to first axis-align the curve and <em>then</em> evalutating the curvature function.</p>

<div className="note">
<h3 id="let-s-derive-the-full-formula-anyway">Let's derive the full formula anyway</h3>
<p>Of course, before we do our aligned check, let's see what happens if we compute the curvature function without axis-aligning. We start with the first and second derivatives, given our basis functions:</p>
\[
\begin{align*}
  & Bézier(t) = x_1(1-t)^3 + 3x_2(1-t)^2t + 3x_3(1-t)t^2 + x_4t^3 \\
  & Bézier^\prime(t) = a(1-t)^2 + 2b(1-t)^t + ct^2\  \left\{ a=3(x_2-x_1),b=3(x_3-x_2),c=3(x_4-x_3) \right\} \\
  & Bézier^{\prime\prime}(t) = u(1-t) + vt\ \left\{ u=2(b-a),v=2(c-b) \right\}\
\end{align*}
\]<p>And of course the same functions for <em>y</em>:</p>
\[
\begin{align*}
  & Bézier(t) = y_1(1-t)^3 + 3y_2(1-t)^2t + 3y_3(1-t)t^2 + y_4t^3 \\
  & Bézier^\prime(t) = d(1-t)^2 + 2e(1-t)^t + ft^2\\
  & Bézier^{\prime\prime}(t) = w(1-t) + zt
\end{align*}
\]<p>Asking a computer to now compose the <em>C(t)</em> function for us (and to expand it to a readable form of simple terms) gives us this rather overly complicated set of arithmetic expressions:</p>
\[
\begin{array}
  -18 t^2 x_2 y_1+36 t^2 x_3 y_1-18 t^2 x_4 y_1+18 t^2 x_1 y_2-54 t^2 x_3 y_2 \\
  +36 t^2 x_4 y_2-36 t^2 x_1 y_3+54 t^2 x_2 y_3-18 t^2 x_4 y_3+18 t^2 x_1 y_4 \\
  -36 t^2 x_2 y_4+18 t^2 x_3 y_4+36 t x_2 y_1-54 t x_3 y_1+18 t x_4 y_1-36 t x_1 y_2 \\
  +54 t x_3 y_2-18 t x_4 y_2+54 t x_1 y_3-54 t x_2 y_3-18 t x_1 y_4+18 t x_2 y_4 \\
  -18 x_2 y_1+18 x_3 y_1+18 x_1 y_2-18 x_3 y_2-18 x_1 y_3+18 x_2 y_3
\end{array}
\]<p>That is... unwieldy. So, we note that there are a lot of terms that involve multiplications involving x1, y1, and y4, which would all disappear if we axis-align our curve, which is why aligning is a great idea.</p>
</div>
<p>Aligning our curve so that three of the eight coefficients become zero, we end up with the following simple term function for <em>C(t)</em>:</p>
\[
  18 \left ( (3 x_3 y_2+2 x_4 y_2+3 x_2 y_3-x_4 y_3)t^2 + (3 x_3 y_2-x_4 y_2-3 x_2 y_3)t + (x_2 y_3-x_3 y_2) \right )
\]<p>That's a lot easier to work with: we see a fair number of terms that we can compute and then cache, giving us the following simplification:</p>
\[
  \left.\begin{matrix}
    a = x_3 \cdot y_2 \\
    b = x_4 \cdot y_2 \\
    c = x_2 \cdot y_3 \\
    d = x_4 \cdot y_3
  \end{matrix}\right\}
  \ C(t) = 18 \cdot \left ( (-3a + 2b + 3c - d)t^2 + (3a - b - 3c)t + (c - a) \right )
\]<p>This is a plain quadratic curve, and we know how to solve <em>C(t) = 0</em>; we use the quadratic formula:</p>
\[
  \left.\begin{matrix}
    x =& 18(-3a + 2b + 3c - d) \\
    y =& 18(3a - b - 3c) \\
    z =& 18(c - a)
  \end{matrix}\right\}
  \ C(t) = 0 \ \Rightarrow\ t = \frac{-y \pm \sqrt{y^2 - 4 x z}}{2x}
\]<p>We can easily compute this value <em>if</em> the descriminator isn't a negative number (because we only want real roots, not complex roots), and <em>if</em> <em>x</em> is not zero, because divisions by zero are rather useless.</p>
<p>Taking that into account, we compute <em>t</em>, we disregard any <em>t</em> value that isn't in the Bézier interval [0,1], and we now know at which <em>t</em> value(s) our curve will inflect.</p>
<Graphic title="Finding cubic Bézier curve inflections" setup={handler.setupCubic} draw={handler.draw}/>
</section>; }

  },
  "canonical": {
    "locale": "en-GB",
    "title": "Canonical form (for cubic curves)",
    "getContent": function(handler) { return <section>
<SectionHeader name="canonical" title="Canonical form (for cubic curves)" number="20"/>
<p>While quadratic curves are relatively simple curves to analyze, the same cannot be said of the cubic curve. As a curvature controlled by more than one control points, it exhibits all kinds of features like loops, cusps, odd colinear features, and up to two inflection points because the curvature can change direction up to three times. Now, knowing what kind of curve we're dealing with means that some algorithms can be run more efficiently than if we have to implement them as generic solvers, so is there a way to determine the curve type without lots of work?</p>
<p>As it so happens, the answer is yes and the solution we're going to look at was presented by Maureen C. Stone from Xerox PARC and Tony D. deRose from the University of Washington in their joint paper <a href="http://graphics.pixar.com/people/derose/publications/CubicClassification/paper.pdf">"A Geometric Characterization of Parametric Cubic curves"</a>. It was published in 1989, and defines curves as having a "canonical" form (i.e. a form that all curves can be reduced to) from which we can immediately tell which features a curve will have. So how does it work?</p>
<p>The first observation that makes things work is that if we have a cubic curve with four points, we can apply a linear transformation to these points such that three of the points end up on (0,0), (0,1) and (1,1), with the last point then being "somewhere". After applying that transformation, the location of that last point can then tell us what kind of curve we're dealing with. Specifically, we see the following breakdown:</p>
<Graphic static={true} preset="simple" title="The canonical curve map" setup={handler.setup} draw={handler.drawBase} />
<p>This is a fairly funky image, so let's see how it breaks down. We see the three fixed points at (0,0), (0,1) and (1,1), and then the fourth point is somewhere. Depending on where it is, our curve will have certain features. Namely, if the fourth point is...</p>
<ol>
<li>anywhere on and in the red zone, the curve will be self-intersecting, yielding either a cusp or a loop. Anywhere inside the the red zone, this will be a loop. We won't know <i>where</i> that loop is (in terms of <i>t</i> values), but we are guaranteed that there is one.</li>
<li>on the left (red) edge, the curve will have a cusp. We again don't know <em>where</em>, just that it
has one. This edge is described by the function:</li>
</ol>
\[
    y = \frac{-x^2 + 2x + 3}{4}, \{ x \leq 1 \}
  \]<ol>
<li>on the lower right (pink) edge, the curve will have a loop at t=1, so we know the end coordinate of
the curve also lies <em>on</em> the curve. This edge is described by the function:</li>
</ol>
\[
    y = \frac{\sqrt{3(4x - x^2)} - x}{2}, \{ 0 \leq x \leq 1 \}
  \]<ol>
<li>on the top (blue) edge, the curve will have a loop at t=0, so we know the start coordinate of
the curve also lies <em>on</em> the curve. This edge is described by the function:</li>
</ol>
\[
    y = \frac{-x^2 + 3x}{3}, \{ x \leq 0 \}
  \]<ol>
<li>inside the green zone, the curve will have a single inflection, switching concave/convex once.</li>
<li>between the red and green zones, the curve has two inflections, meaning its curvature switches between
concave/convex form twice.</li>
<li>anywhere on the right of the red zone, the curve will have no inflections. It'll just be a well-behaved arch.</li>
</ol>
<p>Of course, this map is fairly small, but the regions extend to infinity, with well defined boundaries.</p>

<div className="note">
<h3 id="wait-where-do-those-lines-come-from-">Wait, where do those lines come from?</h3>
<p>Without repeating the paper mentioned at the top of this section, the loop-boundaries come from rewriting the curve into canonical form, and then solving the formulae for which constraints must hold for which possible curve properties. In the paper these functions yield formulae for where you will find cusp points, or loops where we know t=0 or t=1, but those functions are derived for the full cubic expression, meaning they apply to t=-∞ to t=∞... For Bézier curves we only care about the "clipped interval" t=0 to t=1, so some of the properties that apply when you look at the curve over an infinite interval simply don't apply to the Bézier curve interval.</p>
<p>The right bound for the loop region, indicating where the curve switches from "having inflections" to "having a loop", for the general cubic curve, is actually mirrored over x=1, but for Bézier curves this right half doesn't apply, so we don't need to pay attention to it. Similarly, the boundaries for t=0 and t=1 loops are also nice clean curves but get "cut off" when we only look at what the general curve does over the interval t=0 to t=1.</p>
<p>For the full details, head over to the paper and read through sections 3 and 4. If you still remember your high school precalculus, you can probably follow along with this paper, although you might have to read it a few times before all the bits "click".</p>
</div>
<p>So now the question becomes: how do we manipulate our curve so that it fits this canonical form, with three fixed points, and one "free" point? Enter linear algerba. Don't worry, I'll be doing all the math for you, as well as show you what the effect is on our curves, but basically we're going to be using linear algebra, rather than calculus, because "it's way easier". Sometimes a calculus approach is very hard to work with, when the equivalent geometrical solution is super obvious.</p>
<p>The approach is going to start with a curve that doesn't have all-colinear points (so we need to make sure the points don't all fall on a straight line), and then applying four graphics operations that you will probably have heard of: translation (moving all points by some fixed x- and y-distance), scaling (multiplying all points by some x and y scale factor), and shearing (an operation that turns rectangles into parallelograms).</p>
<p>Step 1: we translate any curve by -p1.x and -p1.y, so that the curve starts at (0,0). We're going to make use of an interesting trick here, by pretending our 2D coordinates are 3D, with the <i>z</i> coordinate simply always being 1. This is an old trick in graphics to overcome the limitations of 2D transformations: without it, we can only turn (x,y) coordinates into new coordinates of the form (ax + by, cx + dy), which means we can't do translation, since that requires we end up with some kind of (x + a, y + b). If we add a bogus <i>z</i> coordinate that is always 1, then we can suddenly add arbitrary values. For example:</p>
\[
\left [ \begin{array}
    01 & 0 & a \\
    0 & 1 & b \\
    0 & 0 & 1
  \end{array} \right ]
\cdot
\left [
  \begin{matrix}
    x \\
    y \\
    z=1
  \end{matrix}
\right ]
=
\left [
  \begin{matrix}
    1 \cdot x + 0 \cdot y + a \cdot z \\
    0 \cdot x + 1 \cdot y + b \cdot z \\
    0 \cdot x + 0 \cdot y + 1 \cdot z
  \end{matrix}
\right ]
=
\left [
  \begin{matrix}
    x + a \cdot 1 \\
    y + b \cdot 1 \\
    1 \cdot z
  \end{matrix}
\right ]
=
\left [
  \begin{matrix}
    x + a \\
    y + b \\
    z=1
  \end{matrix}
\right ]
\]<p>Sweet! <i>z</i> stays 1, so we can effectively ignore it entirely, but we added some plain values to our x and y coordinates. So, if we want to subtract p1.x and p1.y, we use:</p>
\[
T_1 =
\left [ \begin{array}
    01 & 0 & -{P_1}_x \\
    0 & 1 & -{P_1}_y \\
    0 & 0 & 1
  \end{array} \right ]
\cdot
\left [
  \begin{matrix}
    x \\
    y \\
    1
  \end{matrix}
\right ]
=
\left [
  \begin{matrix}
    1 \cdot x + 0 \cdot y - {P_1}_x \cdot 1 \\
    0 \cdot x + 1 \cdot y - {P_1}_y \cdot 1 \\
    0 \cdot x + 0 \cdot y + 1 \cdot 1
  \end{matrix}
\right ]
=
\left [
  \begin{matrix}
    x - {P_1}_x \\
    y - {P_1}_y \\
    1
  \end{matrix}
\right ]
\]<p>Running all our coordinates through this transformation gives a new set of coordinates, let's call those <b>U</b>, where the first coordinate lies on (0,0), and the rest is still somewhat free. Our next job is to make sure point 2 ends up lying on the <i>x=0</i> line, so what we want is a transformation matrix that, when we run it, subtracts <i>x</i> from whatever <i>x</i> we currently have. This is called <a href="https://en.wikipedia.org/wiki/Shear_matrix">shearing</a>, and the typical x-shear matrix and its transformation looks like this:</p>
\[
\left [
  \begin{matrix}
    1 & S & 0 \\
    0 & 1 & 0 \\
    0 & 0 & 1
  \end{matrix}
\right ]
\cdot
\left [
  \begin{matrix}
    x \\
    y \\
    1
  \end{matrix}
\right ]
=
\left [
  \begin{matrix}
    x + S \cdot y \\
    y \\
    1
  \end{matrix}
\right ]
\]<p>So we want some shearing value that, when multiplied by <i>y</i>, yields <i>-x</i>, so our x coordinate becomes zero. That value is simpy <i>-x/y</i>, because <i>-x/y * y = -x</i>. Done:</p>
\[
T_2 =
\left [
  \begin{matrix}
    1 & -\frac{ {U_2}_x }{ {U_2}_y } & 0 \\
    0 & 1 & 0 \\
    0 & 0 & 1
  \end{matrix}
\right ]
\]<p>Now, running this on all our points generates a new set of coordinates, let's call those V, which now have point 1 on (0,0) and point 2 on (0, some-value), and we wanted it at (0,1), so we need to <a href="https://en.wikipedia.org/wiki/Scaling_%28geometry%29">do some scaling</a> to make sure it ends up at (0,1). Additionally, we want point 3 to end up on (1,1), so we can also scale x to make sure its x-coordinate will be 1 after we run the transform. That means we'll be x-scaling by 1/point3<sub>x</sub>, and y-scaling by point2<sub>y</sub>. This is really easy:</p>
\[
T_3 =
\left [
  \begin{matrix}
    \frac{1}{ {V_3}_x } & 0 & 0 \\
    0 & \frac{1}{ {V_2}_y } & 0 \\
    0 & 0 & 1
  \end{matrix}
\right ]
\]<p>Then, finally, this generates a new set of coordinates, let's call those W, of which point 1 lies on (0,0), point 2 lies on (0,1), and point three lies on (1, ...) so all that's left is to make sure point 3 ends up at (1,1) - but we can't scale! Point 2 is already in the right place, and y-scaling would move it out of (0,1) again, so our only option is to y-shear point three, just like how we x-sheared point 2 earlier. In this case, we do the same trick, but with <code>y/x</code> rather than <code>x/y</code> because we're not x-shearing but y-shearing. Additionally, we don't actually want to end up at zero (which is what we did before) so we need to shear towards an offset, in this case 1:</p>
\[
T_4 =
\left [
  \begin{matrix}
    1 & 0 & 0 \\
    \frac{1 - {W_3}_y}{ {W_3}_x } & 1 & 0 \\
    0 & 0 & 1
  \end{matrix}
\right ]
\]<p>And this generates our final set of four coordinates. Of these, we already know that points 1 through 3 are (0,0), (0,1) and (1,1), and only the last coordinate is "free". In fact, given any four starting coordinates, the resulting "transformation mapped" coordinate will be:</p>
\[
mapped_4 = \left (
  \begin{matrix}
   x =  \left (
    \frac
    {
      -x_1 + x_4 - \frac{(-x_1+x_2)(-y_1+y_4)}{-y_1+y_2}
    }
    {
      -x_1+x_3-\frac{(-x_1+x_2)(-y_1+y_3)}{-y_1+y_2}
    }
    \right )
\\
   y = \left (
    \frac{(-y_1+y_4)}{-y_1+y_2}
    +
    \frac
    {
      \left ( 1 - \frac{-y_1+y_3}{-y_1+y_2} \right )
      \left ( -x_1 + x_4 - \frac{(-x_1+x_2)(-y_1+y_4)}{-y_1+y_2} \right )
    }
    {
      -x_1+x_3-\frac{(-x_1+x_2)(-y_1+y_3)}{-y_1+y_2}
    }
    \right )
  \end{matrix}
\right )
\]<p>That looks very complex, but notice that every coordinate value is being offset by the initial translation, and a lot of terms in there repeat: it's pretty easy to calculate this fast, since there's so much we can cache and reuse while we compute this mapped coordinate!</p>
<p>First, let's just do that translation step as a "preprocessing" operation so we don't have to subtract the values all the time. What does that leave?</p>
\[
... = \left (
  \begin{matrix}
   x = \left (  x_4 - \frac{x_2 \cdot y_4}{y_2} \middle/ x_3-\frac{x_2 \cdot y_3}{y_2} \right )
\\
   y =
    \frac{y_4}{y_2}
    +
    \left ( 1 - \frac{y_3}{y_2} \right )
    \cdot
    \left (  x_4 - \frac{x_2 \cdot y_4}{y_2} \middle/ x_3-\frac{x_2 \cdot y_3}{y_2} \right )
  \end{matrix}
\right )
\]<p>Suddenly things look a lot simpler: the mapped x is fairly straight forward to compute, and we see that the mapped y actually contains the mapped x in its entirety, so we'll have that part already available when we need to evaluate it. In fact, let's pull out all those common factors to see just how simple this is:</p>
\[
... = \left (
  \begin{matrix}
   x = (x_4 - x_2 \cdot f_{42}) / ( x_3- x_2 \cdot f_{32} )
\\
   y =
    f_{42}
    +
    \left ( 1 - f_{32} \right )
    \cdot
    x
  \end{matrix}
\right ), f_{32} = \frac{y_3}{y_2}, f_{42} = \frac{y_4}{y_2}
\]<p>That's kind of super-simple to write out in code, I think you'll agree. Coding math tends to be easier than the formulae initially make it look!</p>

<div className="note">
<h3 id="how-do-you-track-all-that-">How do you track all that?</h3>
<p>Doing maths can be a pain, so whenever possible, I like to make computers do the work for me. Especially for things like this, I simply use <a href="http://www.wolfram.com/mathematica">Mathematica</a>. Tracking all this math by hand is insane, and we invented computers, literally, to do this for us. I have no reason to use pen and paper when I can write out what I want to do in a program, and have the program do the math for me. And real math, too, with symbols, not with numbers. In fact, <a href="http://pomax.github.io/gh-weblog/downloads/canonical-curve.nb">here's</a> the Mathematica notebook if you want to see how this works for yourself.</p>
<p>Now, I know, you're thinking "but Mathematica is super expensive!" and that's true, it's <a href="http://www.wolfram.com/mathematica-home-edition">$295 for home use</a>, but it's <strong>also</strong> <a href="http://www.wolfram.com/raspberry-pi">free when you buy a $35 raspberry pi</a>. Obviously, I bought a raspberry pi, and I encourage you to do the same. With that, as long as you know what you want to <em>do</em>, Mathematica can just do it for you. And we don't have to be geniusses to work out what the maths looks like. That's what we have computers for.</p>
</div>
<p>So, let's write up a sketch that'll show us the canonical form for any curve drawn in blue, overlaid on our canonical map, so that we can immediately tell which features our curve must have, based on where the fourth coordinate is located on the map:</p>
<Graphic preset="simple" title="A cubic curve mapped to canonical form" setup={handler.setup} draw={handler.draw} />
</section>; }

  },
  "arclength": {
    "locale": "en-GB",
    "title": "Unknown title (arclength)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "arclengthapprox": {
    "locale": "en-GB",
    "title": "Unknown title (arclengthapprox)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "tracing": {
    "locale": "en-GB",
    "title": "Unknown title (tracing)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "intersections": {
    "locale": "en-GB",
    "title": "Unknown title (intersections)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "curveintersection": {
    "locale": "en-GB",
    "title": "Unknown title (curveintersection)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "abc": {
    "locale": "en-GB",
    "title": "Unknown title (abc)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "moulding": {
    "locale": "en-GB",
    "title": "Unknown title (moulding)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "pointcurves": {
    "locale": "en-GB",
    "title": "Unknown title (pointcurves)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "catmullconv": {
    "locale": "en-GB",
    "title": "Unknown title (catmullconv)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "catmullmoulding": {
    "locale": "en-GB",
    "title": "Unknown title (catmullmoulding)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "polybezier": {
    "locale": "en-GB",
    "title": "Unknown title (polybezier)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "shapes": {
    "locale": "en-GB",
    "title": "Unknown title (shapes)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "projections": {
    "locale": "en-GB",
    "title": "Unknown title (projections)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "offsetting": {
    "locale": "en-GB",
    "title": "Unknown title (offsetting)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "graduatedoffset": {
    "locale": "en-GB",
    "title": "Unknown title (graduatedoffset)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "circles": {
    "locale": "en-GB",
    "title": "Unknown title (circles)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "circles_cubic": {
    "locale": "en-GB",
    "title": "Unknown title (circles_cubic)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "arcapproximation": {
    "locale": "en-GB",
    "title": "Unknown title (arcapproximation)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "bsplines": {
    "locale": "en-GB",
    "title": "Unknown title (bsplines)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "comments": {
    "locale": "en-GB",
    "title": "Unknown title (comments)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "locale-switcher": {
    "locale": "en-GB",
    "title": "locale-switcher",
    "getContent": function(handler) { return <section>
<p>Read this in your own language:</p>
<ul>
<li>
<a href="?locale=en-GB">English</a>
</li>
<li>
<a href="?locale=ja-JP">日本語</a>
</li>
<li>
<a href="?locale=zh-CN">中文</a>
</li>
</ul>
<p>Don't see your language listed? <a href="https://github.com/Pomax/BezierInfo-2/wiki/localize">Help translate this content!</a>
</p>
</section>; }

  }
};
