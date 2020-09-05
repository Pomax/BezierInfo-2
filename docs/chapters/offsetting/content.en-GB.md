# Curve offsetting

Perhaps you're like me, and you've been writing various small programs that use Bézier curves in some way or another, and at some point you make the step to implementing path extrusion. But you don't want to do it pixel based; you want to stay in the vector world. You find that extruding lines is relatively easy, and tracing outlines is coming along nicely (although junction caps and fillets are a bit of a hassle), and then you decide to do things properly and add Bézier curves to the mix. Now you have a problem.

Unlike lines, you can't simply extrude a Bézier curve by taking a copy and moving it around, because of the curvatures; rather than a uniform thickness, you get an extrusion that looks too thin in places, if you're lucky, but more likely will self-intersect. The trick, then, is to scale the curve, rather than simply copying it. But how do you scale a Bézier curve?

Bottom line: **you can't**. So you cheat. We're not going to do true curve scaling, or rather curve offsetting, because that's impossible. Instead we're going to try to generate 'looks good enough' offset curves.

<div class="note">

### "What do you mean, you can't? Prove it."

First off, when I say "you can't," what I really mean is "you can't offset a Bézier curve with another Bézier curve", not even by using a really high order curve. You can find the function that describes the offset curve, but it won't be a polynomial, and as such it cannot be represented as a Bézier curve, which **has** to be a polynomial. Let's look at why this is:

From a mathematical point of view, an offset curve `O(t)` is a curve such that, given our original curve `B(t)`, any point on `O(t)` is a fixed distance `d` away from coordinate `B(t)`. So let's math that:

\[
  O(t) = B(t) + d
\]

However, we're working in 2D, and `d` is a single value, so we want to turn it into a vector. If we want a point distance `d` "away" from the curve `B(t)` then what we really mean is that we want a point at `d` times the "normal vector" from point `B(t)`, where the "normal" is a vector that runs perpendicular ("at a right angle") to the tangent at `B(t)`. Easy enough:

\[
  O(t) = B(t) + d \cdot N(t)
\]

Now this still isn't very useful unless we know what the formula for `N(t)` is, so let's find out. `N(t)` runs perpendicular to the original curve tangent, and we know that the tangent is simply `B'(t)`, so we could just rotate that 90 degrees and be done with it. However, we need to ensure that `N(t)` has the same magnitude for every `t`, or the offset curve won't be at a uniform distance, thus not being an offset curve at all. The easiest way to guarantee this is to make sure `N(t)` always has length 1, which we can achieve by dividing `B'(t)` by its magnitude:

\[
  N(t) \bot \left ( \frac{B'(t)}{\left || B'(t) \right || } \right )
\]

Determining the length requires computing an arc length, and this is where things get Tricky with a capital T. First off, to compute arc length from some start `a` to end `b`, we must use the formula we saw earlier. Noting that "length" is usually denoted with double vertical bars:

\[
  \left || f(x,y) \right || = \int^b_a \sqrt{ f_x'^2 + f_y'^2}
\]

So if we want the length of the tangent, we plug in `B'(t)`, with `t = 0` as start and
`t = 1` as end:

\[
  \left || B'(t) \right || = \int^1_0 \sqrt{ B_x''(t)^2 + B_y''(t)^2}
\]

And that's where things go wrong. It doesn't even really matter what the second derivative for `B(t)` is, that square root is screwing everything up, because it turns our nice polynomials into things that are no longer polynomials.

There is a small class of polynomials where the square root is also a polynomial, but they're utterly useless to us: any polynomial with unweighted binomial coefficients has a square root that is also a polynomial. Now, you might think that Bézier curves are just fine because they do, but they don't; remember that only the **base** function has binomial coefficients. That's before we factor in our coordinates, which turn it into a non-binomial polygon. The only way to make sure the functions stay binomial is to make all our coordinates have the same value. And that's not a curve, that's a point. We can already create offset curves for points, we call them circles, and they have much simpler functions than Bézier curves.

So, since the tangent length isn't a polynomial, the normalised tangent won't be a polynomial either, which means `N(t)` won't be a polynomial, which means that `d` times `N(t)` won't be a polynomial, which means that, ultimately, `O(t)` won't be a polynomial, which means that even if we can determine the function for `O(t)` just fine (and that's far from trivial!), it simply cannot be represented as a Bézier curve.

And that's one reason why Bézier curves are tricky: there are actually a *lot* of curves that cannot be represented as a Bézier curve at all. They can't even model their own offset curves. They're weird that way. So how do all those other programs do it? Well, much like we're about to do, they cheat. We're going to approximate an offset curve in a way that will look relatively close to what the real offset curve would look like, if we could compute it.

</div>

So, you cannot offset a Bézier curve perfectly with another Bézier curve, no matter how high-order you make that other Bézier curve. However, we can chop up a curve into "safe" sub-curves (where "safe" means that all the control points are always on a single side of the baseline, and the midpoint of the curve at `t=0.5` is roughly in the center of the polygon defined by the curve coordinates) and then point-scale each sub-curve with respect to its scaling origin (which is the intersection of the point normals at the start and end points).

A good way to do this reduction is to first find the curve's extreme points, as explained in the earlier section on curve extremities, and use these as initial splitting points. After this initial split, we can check each individual segment to see if it's "safe enough" based on where the center of the curve is. If the on-curve point for `t=0.5` is too far off from the center, we simply split the segment down the middle. Generally this is more than enough to end up with safe segments.

The following graphics show off curve offsetting, and you can use the slider to control the distance at which the curve gets offset. The curve first gets reduced to safe segments, each of which is then offset at the desired distance. Especially for simple curves, particularly easily set up for quadratic curves, no reduction is necessary, but the more twisty the curve gets, the more the curve needs to be reduced in order to get segments that can safely be scaled.

<graphics-element title="Offsetting a quadratic Bézier curve" src="./offsetting.js" data-type="quadratic">
  <input type="range" min="5" max="50" step="1" value="20" class="slide-control">
</graphics-element>

<graphics-element title="Offsetting a cubic Bézier curve" src="./offsetting.js" data-type="cubic">
  <input type="range" min="5" max="50" step="1" value="20" class="slide-control">
</graphics-element>

You may notice that this may still lead to small 'jumps' in the sub-curves when moving the curve around. This is caused by the fact that we're still performing a naive form of offsetting, moving the control points the same distance as the start and end points. If the curve is large enough, this may still lead to incorrect offsets.
