# So what makes a Bézier Curve?

Playing with the points for curves may have given you a feel for how Bézier curves behave, but what *are* Bézier curves, really? There are two ways to explain what a Bézier curve is, and they turn out to be the entirely equivalent, but one of them uses complicated maths, and the other uses really simple maths. So... let's start with the simple explanation:

Bézier curves are the result of [linear interpolations](https://en.wikipedia.org/wiki/Linear_interpolation). That sounds complicated but you've been doing linear interpolation since you were very young: any time you had to point at something between two other things, you've been applying linear interpolation. It's simply "picking a point between two points".

If we know the distance between those two points, and we want a new point that is, say, 20% the distance away from the first point (and thus 80% the distance away from the second point) then we can compute that really easily:

\[
Given \left (
  \begin{aligned}
    p_1 &= some\ point \\
    p_2 &= some\ other\ point \\
    distance &= (p_2 - p_1) \\
    ratio &= \frac{percentage}{100} \\
  \end{aligned}
\right ),\ our\ new\ point = p_1 + distance \cdot ratio
\]

So let's look at that in action: the following graphic is interactive in that you can use your up and down arrow keys to increase or decrease the interpolation ratio, to see what happens. We start with three points, which gives us two lines. Linear interpolation over those lines gives us two points, between which we can again perform linear interpolation, yielding a single point. And that point —and all points we can form in this way for all ratios taken together— form our Bézier curve:

<graphics-element title="Linear Interpolation leading to Bézier curves" width="825" src="./interpolation.js">
  <input type="range" min="10" max="90" step="1" value="25" class="slide-control">
</graphics-element>

And that brings us to the complicated maths: calculus.

While it doesn't look like that's what we've just done, we actually just drew a quadratic curve, in steps, rather than in a single go. One of the fascinating parts about Bézier curves is that they can both be described in terms of polynomial functions, as well as in terms of very simple interpolations of interpolations of [...]. That, in turn, means we can look at what these curves can do based on both "real maths" (by examining the functions, their derivatives, and all that stuff), as well as by looking at the "mechanical" composition (which tells us, for instance, that a curve will never extend beyond the points we used to construct it).

So let's start looking at Bézier curves a bit more in depth: their mathematical expressions, the properties we can derive from them, and the various things we can do to, and with, Bézier curves.
