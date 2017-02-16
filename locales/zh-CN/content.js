var React = require('react');
var Graphic = require("../../components/Graphic.jsx");
var SectionHeader = require("../../components/SectionHeader.jsx");

module.exports = {
  "preface": {
    "locale": "zh-CN",
    "title": "序言",
    "getContent": function(handler) { return <section>
<SectionHeader name="preface" title="序言"/>
<p>我们通常用线条来绘制2D图形，大致分为两种线条：直线和曲线。不论我们动手还是用电脑，都能很容易地画出第一种线条。只要给电脑起点和终点，砰！直线就画出来了。没什么好疑问的。</p>
<p>然而，绘制曲线却是个大问题。虽然我们可以很容易地徒手画出曲线，但除非给出描述曲线的数学函数，不然计算机无法画出曲线。实际上，画直线时也需要数学函数，但画直线所需的方程式很简单，我们在这里不去考虑。在计算机看来，所有线条都是“函数”，不管它们是直线还是曲线。然而，这就表示我们需要找到能在计算机上表现良好的曲线方程。这样的曲线有很多种，在本文我们主要关注一类特殊的、备受关注的函数，基本上任何画曲线的地方都会用到它：贝塞尔曲线。</p>
<p>它们是以<a href="https://en.wikipedia.org/wiki/Pierre_B%C3%A9zier">Pierre Bézier</a>命名的，尽管他并不是第一个，或者说唯一“发明”了这种曲线的人，但他让世界知道了这种曲线十分适合设计工作（在1962年为Renault工作并发表了他的研究）。有人也许会说数学家<a href="https://en.wikipedia.org/wiki/Paul_de_Casteljau">Paul de Casteljau</a>是第一个发现这类曲线特性的人，在Citroën工作时，他提出了一种很优雅的方法来画这些曲线。然而，de Casteljau没有发表他的工作，这使得“谁先发现”这一问题很难有一个确切的答案。
贝塞尔曲线本质上是伯恩斯坦多项式，这是<a href="https://en.wikipedia.org/wiki/Sergei_Natanovich_Bernstein">Sergei Natanovich Bernstein</a>研究的一种数学函数，关于它们的出版物至少可以追溯到1912年。无论如何，这些都只是一些冷知识，你可能更在意的是这些曲线很方便：你可以连接多条贝塞尔曲线，并且连接起来的曲线看起来就像是一条曲线。甚至，在你在Photoshop中画“路径”或使用一些像Flash、Illustrator和Inkscape这样的矢量绘图程序时，所画的曲线都是贝塞尔曲线。</p>
<p>那么，要是你自己想编程实现它们呢？有哪些陷阱？你怎么画它们？包围盒是怎么样的，怎么确定交点，怎么拉伸曲线，简单来说：你怎么对曲线做一切你想做的事？这就是这篇文章想说的。准备好学习一些数学吧!</p>
<p>—Pomax (推特账号, <a href="https://twitter.com/TheRealPomax">@TheRealPomax</a>)</p>

<div className="note">
<h2 id="-">注意：几乎所有的贝塞尔图形都是可交互的。</h2>
<p>这个页面使用了基于<a href="http://pomax.github.io/bezierjs">Bezier.js</a> 的可交互例子，还有一些用<a href="http://MathJax.org">MathJax</a> 排版的“真正的”数学（LaTeX形式）。这个页面是用Webpack离线生成的React应用，这便让加入“查看源码”选项更具挑战性了。我仍然试图将它们添加回来，但跟前几年的版本相比，不觉得它能够支撑部署这个更新。</p>
<h2 id="-">这本书是开源的。</h2>
<p>这本书是开源的软件项目，现有两个github仓库。第一个<a href="https://github.com/pomax/bezierinfo">https://github.com/pomax/bezierinfo</a>，它是你现在在看的这个，纯粹用来展示的版本。另外一个<a href="https://github.com/pomax/BezierInfo-2">https://github.com/pomax/BezierInfo-2</a>，是带有所有html, javascript和css的开发版本。你可以fork任意一个，随便做些什么，当然除了把它当作自己的作品来商用。 =)</p>
<h2 id="-">用到的数学将有多复杂？</h2>
<p>这份入门读物用到的大部分数学知识都是高中所学的。如果你理解基本的计算并能看懂英文的话，就能上手这份材料。有时候会用到<em>复杂</em>一点的数学，但如果你不想深究它们，可以选择跳过段落里的“详解”部分，或者直接跳到章节末尾，避开那些看起来很深入的数学。章节的末尾往往会列出一些结论，因此你可以直接利用这些结论。</p>
<h2 id="-">问题，评论：</h2>
<p>如果你有对于新章节的一些建议，点击 <a href="https://github.com/pomax/BezierInfo-2/issues">Github issue tracker</a> （也可以点右上角的repo链接）。如果你有关于材料的一些问题，由于我现在在做改写工作，目前没有评论功能，但你可以用issue跟踪来发表评论。一旦完成重写工作，我会把评论功能加上，或者会有“选择文字段落，点击‘问题’按钮来提问”的系统。到时候我们看看。</p>
<h2 id="-">给我买杯咖啡？</h2>
<p>如果你很喜欢这本书，或发现它对你要做的事很有帮助，或者你想知道怎么表达自己对这本书的感激，你可以 <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QPRDLNGDANJSW">给我买杯咖啡</a> ，所少钱取决于你。这份工作持续了很多年，从一份小小的简要到70多页关于贝塞尔曲线的读物，在完成它的过程中倾注了很多咖啡。我从未后悔花在这上面的每一分钟，但如果有更多咖啡的话，我可以坚持写下去!</p>
</div>
</section>; }

  },
  "introduction": {
    "locale": "en-GB",
    "title": "A lightning introduction",
    "getContent": function(handler) { return <section>
<SectionHeader name="introduction" title="A lightning introduction" number="1"/>
<p>Let's start with the good stuff: when we're talking about Bézier curves, we're talking about the things that you can see in the following graphics. They run from some start point to some end point, with their curvature influenced by one or more "intermediate" control points. Now, because all the graphics on this page are interactive, go manipulate those curves a bit: click-drag the points, and see how their shape changes based on what you do.</p>

<div className="figure">
  <Graphic inline={true} title="Quadratic Bézier curves" setup={ handler.drawQuadratic } draw={ handler.drawCurve }/>
  <Graphic inline={true} title="Cubic Bézier curves" setup={ handler.drawCubic } draw={ handler.drawCurve }/>
</div>
<p>These curves are used a lot in computer aided design and computer aided manufacturing (CAD/CAM) applications, as well as in graphic design programs like Adobe Illustrator and Photoshop, Inkscape, the Gimp, etc. and in graphic technologies like scalable vector graphics (SVG) and OpenType fonts (ttf/otf). A lot of things use Bézier curves, so if you want to learn more about them... prepare to get your learn on!</p>
</section>; }

  },
  "whatis": {
    "locale": "en-GB",
    "title": "So what makes a Bézier Curve?",
    "getContent": function(handler) { return <section>
<SectionHeader name="whatis" title="So what makes a Bézier Curve?" number="2"/>
<p>Playing with the points for curves may have given you a feel for how Bézier curves behave, but what <em>are</em> Bézier curves, really? There are two ways to explain what a Bézier curve is, and they turn out to be the entirely equivalent, but one of them uses complicated maths, and the other uses really simple maths. So... let's start with the simple explanation:</p>
<p>Bezier curves are the result of <a href="https://en.wikipedia.org/wiki/Linear_interpolation">linear interpolations</a>. That sounds complicated but you've been doing linear interpolation since you were very young: any time you had to point at something between two other things, you've been applying linear interpolation. It's simply "picking a point between two points".</p>
<p>If we know the distance between those two points, and we want a new point that is, say, 20% the distance away from the first point (and thus 80% the distance away from the second point) then we can compute that really easily:</p>

\[
Given \left (
  \begin{align}
    p_1 &= some\ point \\
    p_2 &= some\ other\ point \\
    distance &= (p_2 - p_1) \\
    ratio &= \frac{percentage}{100} \\
  \end{align}
\right ),\ our\ new\ point = p_1 + distance \cdot ratio
\]
<p>So let's look at that in action: the following graphic is interactive in that you can use your up and down arrow keys to increase or decrease the interpolation ratio, to see what happens. We start with three points, which gives us two lines. Linear interpolation over those lines gives use two points, between which we can again perform linear interpolation, yielding a single point. And that point —and all points we can form in this way for all ratios taken together— form our Bézier curve:</p>
<Graphic title="Linear Interpolation leading to Bézier curves" setup={handler.setup} draw={handler.draw} onKeyDown={handler.onKeyDown}/>
<p>And that brings us to the complicated maths: calculus.</p>
<p>While it doesn't look like that's what we've just done, we actually just drew a quadratic curve, in steps, rather than in a single go. One of the fascinating parts about Bézier curves is that they can both be described in terms of polynomial functions, as well as in terms of very simple interpolations of interpolations of [...]. That, in turn, means we can look at what these curves can do based on both "real maths" (by examining the functions, their derivatives, and all that stuff), as well as by looking at the "mechanical" composition (which tells us that a curve will never extend beyond the points we used to construct it, for instance)</p>
<p>So let's start looking at Bézier curves a bit more in depth. Their mathematical expressions, the properties we can derive from those, and the various things we can do to, and with, Bézier curves.</p>
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
\]
<p>The notation <i>f(x)</i> is the standard way to show that it's a function (by convention called <i>f</i> if we're only listing one) and its output changes based on one variable (in this case, <i>x</i>). Change <i>x</i>, and the output for <i>f(x)</i> changes.</p>
<p>So far so good. Now, let's look at parametric functions, and how they cheat. Let's take the following two functions:</p>

\[
\begin{matrix}
  f(a) = \cos(a) \\
  f(b) = \sin(b)
\end{matrix}
\]
<p>There's nothing really remarkable about them, they're just a sine and cosine function, but you'll notice the inputs have different names. If we change the value for <i>a</i>, we're not going to change the output value for <i>f(b)</i>, since <i>a</i> isn't used in that function. Parametric functions cheat by changing that. In a parametric function all the different functions share a variable, like this:</p>

\[
\left \{ \begin{matrix}
  f_a(t) = \cos(t) \\
  f_b(t) = \sin(t)
\end{matrix} \right.
\]
<p>Multiple functions, but only one variable. If we change the value for <i>t</i>, we change the outcome of both <i>f<sub>a</sub>(t)</i> and <i>f<sub>b</sub>(t)</i>. You might wonder how that's useful, and the answer is actually pretty simple: if we change the labels <i>f<sub>a</sub>(t)</i> and <i>f<sub>b</sub>(t)</i> with what we usually mean with them for parametric curves, things might be a lot more obvious:</p>

\[
\left \{ \begin{matrix}
  x = \cos(t) \\
  y = \sin(t)
\end{matrix} \right.
\]
<p>There we go. <i>x</i>/<i>y</i> coordinates, linked through some mystery value <i>t</i>.</p>
<p>So, parametric curves don't define a <i>y</i> coordinate in terms of an <i>x</i> coordinate, like normal functions do, but they instead link the values to a "control" variable. If we vary the value of <i>t</i>, then with every change we get <strong>two</strong> values, which we can use as (<i>x</i>,<i>y</i>) coordinates in a graph. The above set of functions, for instance, generates points on a circle: We can range <i>t</i> from negative to positive infinity, and the resulting (<i>x</i>,<i>y</i>) coordinates will always lie on a circle with radius 1 around the origin (0,0). If we plot it for <i>t</i> from 0 to 5, we get this (use your up and down arrow keys to change the plot end value):</p>
<Graphic preset="empty" title="A (partial) circle: x=sin(t), y=cos(t)" static={true} setup={handler.setup} draw={handler.draw} onKeyDown={handler.props.onKeyDown}/>
<p>Bézier curves are (one in many classes of) parametric functions, and are characterised by using the same base function for all its dimensions. Unlike the above example, where the <i>x</i> and <i>y</i> values use different functions (one uses a sine, the other a cosine), Bézier curves use the "binomial polynomial" for both <i>x</i> and <i>y</i>. So what are binomial polynomials?</p>
<p>You may remember polynomials from high school, where they're those sums that look like:</p>

\[
  f(x) = a \cdot x^3 + b \cdot x^2 + c \cdot x + d
\]
<p>If they have a highest order term <i>x³</i> they're called "cubic" polynomials, if it's <i>x²</i> it's a "square" polynomial, if it's just <i>x</i> it's a line (and if there aren't even any terms with <i>x</i> it's not a polynomial!)</p>
<p>Bézier curves are polynomials of <i>t</i>, rather than <i>x</i>, with the value for <i>t</i> fixed being between 0 and 1, with coefficients <i>a</i>, <i>b</i> etc. taking the "binomial" form, which sounds fancy but is actually a pretty simple description for mixing values:</p>

\[
\begin{align*}
  linear &= (1-t) + t \\
  square &= (1-t)^2 + 2 \cdot (1-t) \cdot t + t^2 \\
  cubic &= (1-t)^3 + 3 \cdot (1-t)^2 \cdot t + 3 \cdot (1-t) \cdot t^2 + t^3
\end{align*}
\]
<p>I know what you're thinking: that doesn't look too simple, but if we remove <i>t</i> and add in "times one", things suddenly look pretty easy. Check out these binomial terms:</p>

\[
\begin{align*}
  linear &= \hskip{2.5em} 1 + 1 \\
  square &= \hskip{1.7em} 1 + 2 + 1\\
  cubic &= \hskip{0.85em} 1 + 3 + 3 + 1\\
  hypercubic &= 1 + 4 + 6 + 4 + 1
\end{align*}
\]
<p>Notice that 2 is the same as 1+1, and 3 is 2+1 and 1+2, and 6 is 3+3... As you can see, each time we go up a dimension, we simply start and end with 1, and everything in between is just "the two numbers above it, added together". Now <i>that's</i> easy to remember.</p>
<p>There's an equally simple way to figure out how the polynomial terms work: if we rename <i>(1-t)</i> to <i>a</i> and <i>t</i> to <i>b</i>, and remove the weights for a moment, we get this:</p>

\[
\begin{align*}
  linear &= BLUE[a] + RED[b] \\
  square &= BLUE[a] \cdot BLUE[a] + BLUE[a] \cdot RED[b] + RED[b] \cdot RED[b] \\
  cubic &= BLUE[a] \cdot BLUE[a] \cdot BLUE[a] + BLUE[a] \cdot BLUE[a] \cdot RED[b] + BLUE[a] \cdot RED[b] \cdot RED[b] + RED[b] \cdot RED[b] \cdot RED[b]\\
\end{align*}
\]
<p>It's basically just a sum of "every combination of <i>a</i> and <i>b</i>", progressively replacing <i>a</i>'s with <i>b</i>'s after every + sign. So that's actually pretty simple too. So now you know binomial polynomials, and just for completeness I'm going to show you the generic function for this:</p>

\[
  Bézier(n,t) = \sum_{i=0}^{n}
                \underset{binomial\ term}{\underbrace{\binom{n}{i}}}
                \cdot\
                \underset{polynomial\ term}{\underbrace{(1-t)^{n-i} \cdot t^{i}}}
\]
<p>And that's the full description for Bézier curves. Σ in this function indicates that this is a series of additions (using the variable listed below the Σ, starting at ...=&lt;value&gt; and ending at the value listed on top of the Σ).</p>

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
\]
<p>That looks complicated, but as it so happens, the "weights" are actually just the coordinate values we want our curve to have: for an <i>n<sup>th</sup>
</i> order curve, w<sub>0</sub> is our start coordinate, w<sub>n</sub> is our last coordinate, and everything in between is a controlling coordinate. Say we want a cubic curve that starts at (120,160), is controlled by (35,200) and (220,260) and ends at (220,40), we use this Bézier curve:</p>

\[
\left \{ \begin{matrix}
  x = BLUE[120] \cdot (1-t)^3 + BLUE[35] \cdot 3 \cdot (1-t)^2 \cdot t + BLUE[220] \cdot 3 \cdot (1-t) \cdot t^2 + BLUE[220] \cdot t^3 \\
  y = BLUE[160] \cdot (1-t)^3 + BLUE[200] \cdot 3 \cdot (1-t)^2 \cdot t + BLUE[260] \cdot 3 \cdot (1-t) \cdot t^2 + BLUE[40] \cdot t^3
\end{matrix} \right.
\]
<p>Which gives us the curve we saw at the top of the article:</p>
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
\]
<p>The obvious start and end values here need to be <code>a=1, b=0</code>, so that the mixed value is 100% value 1, and 0% value 2, and <code>a=0, b=1</code>, so that the mixed value is 0% value 1 and 100% value 2. Additionally, we don't want "a" and "b" to be independent: if they are, then we could just pick whatever values we like, and end up with a mixed value that is, for example, 100% value 1 <strong>and</strong> 100% value 2. In principle that's fine, but for Bézier curves we always want mixed values <em>between</em> the start and end point, so we need to make sure we can never set "a" and "b" to some values that lead to a mix value that sums to more than 100%. And that's easy:</p>

\[
  m = a \cdot value_1 + (1 - a) \cdot value_2
\]
<p>With this we can guarantee that we never sum above 100%. By restricting <code>a</code> to values in the interval [0,1], we will always be somewhere between our two values (inclusively), and we will always sum to a 100% mix.</p>
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
\]
<p>Disregarding our actual coordinates for a moment, we have:</p>

\[
  B(t) = (1-t)^3 + 3 \cdot (1-t)^2 \cdot t + 3 \cdot (1-t) \cdot t^2 + t^3
\]
<p>We can write this as a sum of four expressions:</p>

\[
  \begin{matrix}
   ... & = & (1-t)^3 \\
     & + & 3 \cdot (1-t)^2 \cdot t \\
     & + & 3 \cdot (1-t) \cdot t^2 \\
     & + & t^3 \\
  \end{matrix}
\]
<p>And we can expand these expressions:</p>

\[
  \begin{matrix}
   ... & = & (1-t) \cdot (1-t) \cdot (1-t) & = & -t^3 + 3 \cdot t^2 - 3 \cdot t + 1 \\
     & + & 3 \cdot (1-t) \cdot (1-t) \cdot t & = & 3 \cdot t^3 - 6 \cdot t^2 + 3 \cdot t \\
     & + & 3 \cdot (1-t) \cdot t \cdot t & = & -3 \cdot t^3 + 3 \cdot t^2 \\
     & + & t \cdot t \cdot t & = & t^3 \\
  \end{matrix}
\]
<p>Furthermore, we can make all the 1 and 0 factors explicit:</p>

\[
  \begin{matrix}
   ... & = & -1 \cdot t^3 + 3 \cdot t^2 - 3 \cdot t + 1 \\
     & + & +3 \cdot t^3 - 6 \cdot t^2 + 3 \cdot t + 0 \\
     & + & -3 \cdot t^3 + 3 \cdot t^2 + 0 \cdot t + 0 \\
     & + & +1 \cdot t^3 + 0 \cdot t^2 + 0 \cdot t + 0 \\
  \end{matrix}
\]
<p>And <em>that</em>, we can view as a series of four matrix operations:</p>

\[
  \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}-1 \\ 3 \\ -3 \\ 1\end{bmatrix}
  + \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}3 \\ -6 \\ 3 \\ 0\end{bmatrix}
  + \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}-3 \\ 3 \\ 0 \\ 0\end{bmatrix}
  + \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}1 \\ 0 \\ 0 \\ 0\end{bmatrix}
\]
<p>If we compact this into a single matrix operation, we get:</p>

\[
  \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}
      -1 &  3 & -3 & 1 \\
       3 & -6 &  3 & 0 \\
      -3 &  3 &  0 & 0 \\
       1 &  0 &  0 & 0
    \end{bmatrix}
\]
<p>This kind of polynomial basis representation is generally written with the bases in increasing order, which means we need to flip our <code>t</code> matrix horizontally, and our big "mixing" matrix upside down:</p>

\[
  \begin{bmatrix}1 & t & t^2 & t^3\end{bmatrix} \cdot \begin{bmatrix}
       1 &  0 &  0 & 0 \\
      -3 &  3 &  0 & 0 \\
       3 & -6 &  3 & 0 \\
      -1 &  3 & -3 & 1
    \end{bmatrix}
\]
<p>And then finally, we can add in our original coordinates as a single third matrix:</p>

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
\]
<p>We can perform the same trick for the quadratic curve, in which case we end up with:</p>

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
\]
<p>If we plug in a <code>t</code> value, and then multiply the matrices, we will get exactly the same values as when we evaluate the original polynomial function, or as when we evaluate the curve using progessive linear interpolation.</p>
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
\]
<p>and</p>

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
\]
<p>Let's say we want to split the curve at some point <code>t = z</code>, forming two new (obviously smaller) Bézier curves. To find the coordinates for these two Bézier curves, we can use the matrix representation and some linear algebra. First, we split out the the actual "point on the curve" information as a new matrix multiplication:</p>

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
\]
<p>and</p>

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
\]
<p>If we could compact these matrices back to a form <strong>[t values] · [bezier matrix] · [column matrix]</strong>, with the first two staying the same, then that column matrix on the right would be the coordinates of a new Bézier curve that describes the first segment, from <code>t = 0</code> to <code>t = z</code>. As it turns out, we can do this quite easily, by exploiting some simple rules of linear algebra (and if you don't care about the derivations, just skip to the end of the box for the results!).</p>

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
\]

\[
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
\]

\[
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
\]

\[
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
\]
<p>We do this, because [<em>M · M<sup>-1</sup>
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
\]
<p>Excellent! Now we can form our new quadratic curve:</p>

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
\]

\[
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
\]

\[
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
\]
<p>
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
\]

\[
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
\]
<p>If we want the interval [<em>z</em>,1], we will be evaluating this instead:</p>

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
\]

\[
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
\]
<p>We're going to do the same trick, to turn <code>[something · M]</code> into <code>[M · something]</code>:</p>

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
\]
<p>So, our final second curve looks like:</p>

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
\]

\[
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
\]

\[
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
\]
<p>
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
\]
<p>and</p>

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
\]
<p>We can do the same for cubic curves. However, I'll spare you the actual derivation (don't let that stop you from writing that out yourself, though) and simply show you the resulting new coordinate sets:</p>

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
\]
<p>and</p>

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
\]
<p>So, looking at our matrices, did we really need to compute the second segment matrix? No, we didn't. Actually having one segment's matrix means we implicitly have the other: push the values of each row in the matrix <strong>
<em>Q</em>
</strong> to the right, with zeroes getting pushed off the right edge and appearing back on the left, and then flip the matrix vertically. Presto, you just "calculated" <strong>
<em>Q'</em>
</strong>.</p>
<p>Implementing curve splitting this way requires less recursion, and is just straight arithmetic with cached values, so can be cheaper on systems were recursion is expensive. If you're doing computation with devices that are good at matrix multiplication, chopping up a Bézier curve with this method will be a lot faster than applying de Casteljau.</p>
</section>; }

  },
  "reordering": {
    "locale": "en-GB",
    "title": "Unknown title (reordering)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "derivatives": {
    "locale": "en-GB",
    "title": "Unknown title (derivatives)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "pointvectors": {
    "locale": "en-GB",
    "title": "Unknown title (pointvectors)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "components": {
    "locale": "en-GB",
    "title": "Unknown title (components)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "extremities": {
    "locale": "en-GB",
    "title": "Unknown title (extremities)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "boundingbox": {
    "locale": "en-GB",
    "title": "Unknown title (boundingbox)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "aligning": {
    "locale": "en-GB",
    "title": "Unknown title (aligning)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "tightbounds": {
    "locale": "en-GB",
    "title": "Unknown title (tightbounds)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "inflections": {
    "locale": "en-GB",
    "title": "Unknown title (inflections)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "canonical": {
    "locale": "en-GB",
    "title": "Unknown title (canonical)",
    "getContent": function(handler) { return <section>
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

  }
};
