# Curvature of a curve

If we have two curves, and we want to line them in up in a way that "looks right", what would we use as metric to let a computer decide what "looks right" means?

For instance, we can start by ensuring that the two curves share an end coordinate, so that there is no "gap" between the end of one and the start of the next curve, but that won't guarantee that things look right: both curves can be going in wildly different directions, and the resulting joined geometry will have a corner in it, rather than a smooth transition from one curve to the next.

What we want is to ensure that the [curvature](https://en.wikipedia.org/wiki/Curvature) at the transition from one curve to the next "looks good". So, we start with a shared coordinate, and then also require that  derivatives for both curves match at that coordinate. That way, we're assured that their tangents line up, which must mean the curve transition is perfectly smooth. We can even make the second, third, etc. derivatives match up for better and better transitions.

Problem solved!

However, there's a problem with this approach: if we think about this a little more, we realise that "what a curve looks like" and its derivative values are pretty much entirely unrelated. After all, the section on [reordering curves](#reordering) showed us that the same looking curve can have an infinite number of curve expressions of arbitraryly high Bézier degree, and each of those will have _widly_ different derivative values.

So what we really want is some kind of expression that's not based on any particular expression of `t`, but is based on something that is invariant to the _kind_ of function(s) we use to draw our curve. And the prime candidate for this is our curve expression, reparameterised for distance: no matter what order of Bézier curve we use, if we were able to rewrite it as a function of distance-along-the-curve, all those different degree Bézier functions would end up being _the same_ function for "coordinate at some distance D along the curve".

We've seen this before... that's the arc length function.

So you might think that in order to find the curvature of a curve, we now need to solve the arc length function itself, and that this would be quite a problem because we just saw that there is no way to actually do that. Thankfully, we don't. We only need to know the _form_ of the arc length function, which we saw above and is fairly simple, rather than needing to _solve_ the arc length function. If we start with the arc length expression and the [run through the steps necessary](https://mathworld.wolfram.com/Curvature.html) to determine _its_ derivative (with an alternative, shorter demonstration of how to do this found [over on Stackexchange](https://math.stackexchange.com/questions/275248/deriving-curvature-formula/275324#275324)), then the integral that was giving us so much problems in solving the arc length function disappears entirely (because of the [fundamental theorem of calculus](https://en.wikipedia.org/wiki/Fundamental_theorem_of_calculus)), and what we're left with us some surprisingly simple maths that relates curvature (denoted as κ, "kappa") to—and this is the truly surprising bit—a specific combination of derivatives of our original function.

Let me highlight what just happened, because it's pretty special:

1. we wanted to make curves line up, and initially thought to match the curves' derivatives, but
2. that turned out to be a really bad choice, so instead
3. we picked a function that is basically impossible to work with, and then _worked with that_, which
4. gives us a simple formula that is _and expression using the curves' derivatives_.

*That's crazy!*

But that's also one of the things that  makes maths so powerful: even if your initial ideas are off the mark, you might be much closer than you thought you were, and the journey from "thinking we're completely wrong" to "actually being remarkably close to being right" is where we can find a lot of insight.

So, what does the function look like? This:

\[
  \kappa = \frac{{x}'{y}'' - {x}''{y}'}{({x}'^2+{y}'^2)^{\frac{3}{2}}}
\]

Which is really just a "short form" that glosses over the fact that we're dealing with functions of `t`, so let's expand that a tiny bit:

\[
  \kappa(t) = \frac{{B_x}'(t){B_y}''(t) - {B_x}''(t){B_y}'(t)}{({B_x}'(t)^2+{B_y}'(t)^2)^{\frac{3}{2}}}
\]

And while that's a litte more verbose, it's still just as simple to work with as the first function: the curvature at some point on any (and this cannot be overstated: _any_) curve is a ratio between the first and second derivative cross product, and something that looks oddly similar to the standard Euclidean distance function. And nothing in these functions is hard to calculate either: for Bézier curves, simply knowing our curve coordinates means [we know what the first and second derivatives are](#derivatives), and so evaluating this function for any **t** value is just a matter of basic arithematics.

In fact, let's just implement it right now:

```
function kappa(t, B):
  d = B.getDerivative(t)
  dd = B.getSecondDerivative(t)
  numerator = d.x * dd.y - dd.x * d.y
  denominator = pow(d.x*d.x + d.y*d.y, 3/2)
  if denominator is 0: return NaN;
  return numerator / denominator
```

That was easy! (Well okay, that "not a number" value will need to be taken into account by downstream code, but that's a reality of programming anwyay)

With all of that covered, let's line up some curves! The following graphic gives you two curves that look identical, but use quadratic and cubic functions, respectively. As you can see, despite their derivatives being necessarily different, their curvature (thanks to being derived based on maths that "ignores" specific function derivative, and instead gives a formulat that smooths out any differences) is exactly the same. And because of that, we can put them together such that the point where they overlap has the same curvature for both curves, giving us the smoothest transition.

<graphics-element title="Matching curvatures for a quadratic and cubic Bézier curve" width="825" src="./curvature.js"></graphics-element>

One thing you may have noticed in this sketch is that sometimes the curvature looks fine, but seems to be pointing in the wrong direction, making it hard to line up the curves properly. A way around that, of course, is to show the curvature on both sides of the curve, so let's just do that. But let's take it one step further: we can also compute the associated "radius of curvature", which gives us the implicit circle that "fits" the curve's curvature at any point, using what is possibly the simplest bit of maths found in this entire primer:

\[
  R(t) = \frac{1}{\kappa(t)}
\]

So let's revisit the previous graphic with the curvature visualised on both sides of our curves, as well as showing the circle that "fits" our curve at some point that we can control by using a slider:

<graphics-element title="(Easier) curvature matching for a quadratic and cubic Bézier curve" width="825" src="./curvature.js" data-omni="true">
  <input type="range" min="0" max="2" step="0.0005" value="0" class="slide-control">
</graphics-element>
