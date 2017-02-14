var React = require('react');
var Graphic = require("../../components/Graphic.jsx");
var SectionHeader = require("../../components/SectionHeader.jsx");

module.exports = {
  "preface": {
    "title": "Preface",
    "getContent": function(handler) { return <section>
<SectionHeader name="preface" title="Preface" number="0"/>
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
<p>If you enjoyed this book, or you simply found it useful for something you were trying to get done, and you were wondering how to let me know you appreciated this book, you can
always <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QPRDLNGDANJSW">buy me a coffee</a>, however-much a coffee is where you live. This work has grown over the years, from a small primer to a 70ish print-page-equivalent reader on the subject of Bézier curves, and a lot of coffee went into the making of it. I don't regret a minute I spent on writing it, but I can always do with some more coffee to keep on writing!</p>
</div>
</section>; }

  },
  "introduction": {
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
### How to implement the basis function

We could naively implement the basis function as a mathematical construct, using the function as our guide, like this:

<pre>function Bezier(n,t):
  sum = 0
  for(k=0; k<n; k++):
    sum += n!/(k!*(n-k)!) * (1-t)^(n-k) * t^(k)
  return sum</pre>

I say we could, because we're not going to: the factorial function is <em>incredibly</em> expensive. And, as we can see from the above explanation, we can actually create Pascal's triangle quite easily without it: just start at [1], then [1,1], then [1,2,1], then [1,3,3,1], and so on, with each next row fitting 1 more number than the previous row, starting and ending with "1", with all the numbers in between being the sum of the previous row's elements on either side "above" the one we're computing.

We can generate this as a list of lists lightning fast, and then never have to compute the binomial terms because we have a lookup table:

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
  return lut[n][k]</pre>

So what's going on here? First, we declare a lookup table with a size that's reasonably large enough to accommodate most lookups. Then, we declare a function to get us the values we need, and we make sure that if an n/k pair is requested that isn't in the LUT yet, we expand it first. Our basis function now looks like this:

<pre>function Bezier(n,t):
  sum = 0
  for(k=0; k&lt;=n; k++):
    sum += binomial(n,k) <em> (1-t)^(n-k) </em> t^(k)
  return sum</pre>

Perfect. Of course, we can optimize further. For most computer graphics purposes, we don't need arbitrary curves. We need quadratic and  cubic curves (this primer actually does do arbitrary curves, so you'll find code similar to shown here), which means we can drastically simplify the code:

<pre>function Bezier(2,t):
  t2 = t <em> t
  mt = 1-t
  mt2 = mt </em> mt
  return mt2 + 2<em>mt</em>t + t2

function Bezier(3,t):
  t2 = t <em> t
  t3 = t2 </em> t
  mt = 1-t
  mt2 = mt <em> mt
  mt3 = mt2 </em> mt
  return mt3 + 3<em>mt2</em>t + 3<em>mt</em>t2 + t3</pre>

And now we know how to program the basis function. Exellent.
</div>

<p>So, now we know what the base function(s) look(s) like, time to add in the magic that makes Bézier curves so special: control points.</p>
</section>; }

  },
  "control": {
    "title": "Unknown title (control)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "extended": {
    "title": "Unknown title (extended)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "matrix": {
    "title": "Unknown title (matrix)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "decasteljau": {
    "title": "Unknown title (decasteljau)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "flattening": {
    "title": "Unknown title (flattening)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "splitting": {
    "title": "Unknown title (splitting)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "matrixsplit": {
    "title": "Unknown title (matrixsplit)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "reordering": {
    "title": "Unknown title (reordering)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "derivatives": {
    "title": "Unknown title (derivatives)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "pointvectors": {
    "title": "Unknown title (pointvectors)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "components": {
    "title": "Unknown title (components)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "extremities": {
    "title": "Unknown title (extremities)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "boundingbox": {
    "title": "Unknown title (boundingbox)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "aligning": {
    "title": "Unknown title (aligning)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "tightbounds": {
    "title": "Unknown title (tightbounds)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "inflections": {
    "title": "Unknown title (inflections)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "canonical": {
    "title": "Unknown title (canonical)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "arclength": {
    "title": "Unknown title (arclength)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "arclengthapprox": {
    "title": "Unknown title (arclengthapprox)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "tracing": {
    "title": "Unknown title (tracing)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "intersections": {
    "title": "Unknown title (intersections)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "curveintersection": {
    "title": "Unknown title (curveintersection)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "abc": {
    "title": "Unknown title (abc)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "moulding": {
    "title": "Unknown title (moulding)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "pointcurves": {
    "title": "Unknown title (pointcurves)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "catmullconv": {
    "title": "Unknown title (catmullconv)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "catmullmoulding": {
    "title": "Unknown title (catmullmoulding)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "polybezier": {
    "title": "Unknown title (polybezier)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "shapes": {
    "title": "Unknown title (shapes)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "projections": {
    "title": "Unknown title (projections)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "offsetting": {
    "title": "Unknown title (offsetting)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "graduatedoffset": {
    "title": "Unknown title (graduatedoffset)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "circles": {
    "title": "Unknown title (circles)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "circles_cubic": {
    "title": "Unknown title (circles_cubic)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "arcapproximation": {
    "title": "Unknown title (arcapproximation)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "bsplines": {
    "title": "Unknown title (bsplines)",
    "getContent": function(handler) { return <section>
</section>; }

  },
  "comments": {
    "title": "Unknown title (comments)",
    "getContent": function(handler) { return <section>
</section>; }

  }
};
