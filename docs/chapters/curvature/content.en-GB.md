# Curvature of a curve

Imagine we have two curves, and we want to line them in up in a way that "looks right". What would we use as metric to let a computer decide what "looks right" means? For instance, we can start by ensuring that the two curves share an end coordinate, so that there is no "gap" between leaving one curve and entering the next, but that won't guarantee that things look right: both curves can be going in wildly different directions, and the resulting joined geometry will have a corner in it, rather than a smooth transition from one curve to the next. What we want is to ensure that the [_curvature_](https://en.wikipedia.org/wiki/Curvature) at the transition from one curve to the next "looks good". So, we could have them share an end coordinate, and then ensure that the derivatives for both curves match at that coordinate, and at a casual glance, that seems the perfect solution: if we make the derivatives match, then both the "direction" in which we travel from one curve to the next is the same, and the "speed" at which we travel the curve will be the same.

Problem solved!

But, if we think about this a little more, this cannot possible work, because of something that you may have noticed in the section on [reordering curves](#reordering): what a curve looks like, and the function that draws that curve, are not in some kind of universal, fixed, one-to-one relation. If we have some quadratic curve, then simply by raising the curve order we can get corresponding cubic, quartic, and higher and higher mathematical expressions that all draw the _exact same curve_ but with wildly different derivatives. So: if we want to make a transition from one curve to the next look good, and we want to use the derivative, then we suddenly need to answer the question: "Which derivative?".

How would you even decide? What makes the cubic derivatives better or less suited than, say, quintic derivatives? Wouldn't it be nicer if we could use something that was inherent to the curve, without being tied to the functions that yield that curve? And (of course) as it turns out, there is a way to define curvature in such a way that it only relies on what the curve actually looks like, and given where this section is in the larger body of this Primer, it should hopefully not be surprising that thee thing we can use to define curvature is the thing we talked about in the previous section: arc length.

Intuitively, this should make sense, even if we have no idea what the maths would look like: if we travel some fixed distance along some curve, then the point at that distance is simply the point at that distance. It doesn't matter what function we used to draw the curve: once we know what the curve looks like, the function(s) used to draw it become irrelevant: a point a third along the full distance of the curve is simply the point a third along the distance of the curve.

You might think that in order to find the curvature of a curve, we now need to find and then solve the arc length function, and that would be a problem because we just saw that there is no way to actually do that: don't worry, we don't. We do need to know the _form_ of the arc length function, which we saw above, but it's not the thing we're actually interested in, and we're going to be rewriting it in a way that makes most of the crazy complex things about it just... disappear.

In fact, after [running through the steps necessary](http://mathworld.wolfram.com/Curvature.html) to determine what we're left with if we use the arclength function's derivative (with another run-through of the maths [here](https://math.stackexchange.com/a/275324/71940)), rather than the curve's original function's derivative, then the integral disappears entirely (because of the [fundamental theorem of calculus](https://en.wikipedia.org/wiki/Fundamental_theorem_of_calculus)), and we're left with some surprisingly simple maths that relates curvature (denoted as κ, "kappa") to—and this is the truly surprising bit—a specific combination of derivatives of our original function.

Let me just highlight that before we move on: we calculate the curvature of a curve using the arc length function derivative, because the original function's derivative is entirely unreliable, and in doing so we end up with a formula that expresses curvature in terms of the original function's derivatives.

*That's crazy!*

But, that's what makes maths such an interesting thing: it can show you that all your assumptions are completely wrong, only to then go "but actually, you were on the right track all along, here: ..." with a solution that is so easy to work with as to almost seem mundane. So: enough of all this text, how do we calculate curvature? What is the function for κ? Concisely, the function is this:

\[
  \kappa = \frac{{x}'{y}'' - {x}''{y}'}{({x}'^2+{y}'^2)^{\frac{3}{2}}}
\]

Which is really just a "short form" that glosses over the fact that we're dealing with functions:

\[
  \kappa(t) = \frac{{B_x}'(t){B_y}''(t) - {B_x}''(t){B_y}'(t)}{({B_x}'(t)^2+{B_y}'(t)^2)^{\frac{3}{2}}}
\]

And while that's a litte more verbose, it's still just as simple to work with as the first function: the curvature at some point on any (and this cannot be overstated: _any_) curve is a ratio between the first and second derivative cross product, and something that looks oddly similar to the standard Euclidean distance function. And nothing in these functions is hard to calculate either: for Bézier curves, simply knowing our curve coordinates means [we know what the first and second derivatives are](#derivatives), and so evaluating this function for any **t** value is just a matter of basic arithematics.

<div class="howtocode">

### Implement the kappa function

In fact, let's just implement it right now:

```
function kappa(t, B):
  d = B.getDerivative()
  dd = d.getDerivative()
  dx = d.getX(t)
  dy = d.getY(t)
  ddx = dd.getX(t)
  ddy = dd.getY(t)
  numerator = dx * ddy - ddx * dy
  denominator = pow(dx*dx + dy*dy, 1.5)
  return numerator / denominator
```
That was easy!

In fact, it stays easy because we can also compute the associated "radius of curvature", which gives us the implicit circle that "fits" the curve's curvature at any point, using what is possibly the simplest relation in this entire primer:

\[
  R(t) = \frac{1}{\kappa(t)}
\]

So that's a rather convenient fact to know, too.

</div>

So with all of that covered, let's line up some curves! The following graphic gives you two curves that look identical, but use quadratic and cubic functions, respectively. As you can see, despite their derivatives being necessarily different, their curvature (thanks to being derived based on maths that "ignores" specific function derivative, and instead gives a formulat that smooths out any differences) is exactly the same. And because of that, we can put them together such that the point where they overlap has the same curvature for both curves, giving us the smoothest looking transition we could ask for.

<Graphic title="Matching curvatures for a quadratic and cubic Bézier curve" setup={this.setup} draw={this.draw} />

One thing you may have noticed in this sketch is that sometimes the curvature looks fine, but seems to be pointing in the wrong direction, making it hard to line up the curves properly. In your code you typically solve this by matching absolute values, but that's not super easy to program visually... however, we _can_ just show the curvature on both sides of the curve, making lining things up a bit easier:

<Graphic title="(Easier) curvature matching for a quadratic and cubic Bézier curve" setup={this.setup} draw={this.drawOmni} />
