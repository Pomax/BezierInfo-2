# The projection identity

De Casteljau's algorithm is the pivotal algorithm when it comes to Bézier curves. You can use it not just to split curves, but also to draw them efficiently (especially for high-order Bézier curves), as well as to come up with curves based on three points and a tangent. Particularly this last thing is really useful because it lets us "mold" a curve, by picking it up at some point, and dragging that point around to change the curve's shape.

How does that work? Succinctly: we run de Casteljau's algorithm in reverse!

In order to run de Casteljau's algorithm in reverse, we need a few basic things: a start and end point, a point on the curve that want to be moving around, which has an associated *t* value, and a point we've not explicitly talked about before, and as far as I know has no explicit name, but lives one iteration higher in the de Casteljau process then our on-curve point does. I like to call it "A" for reasons that will become obvious.

So let's use graphics instead of text to see where this "A" is, because text only gets us so far: move the sliders for the following graphics to see what, given specific `t` value, our `A` coordinate is. As well as some other coordinates, which taken together let us derive a value that the graphics call "ratio": if you move the curve's points around, A, B, and C will move, what happens to that value?

<div class="figure">

<graphics-element inline={true} title="Projections in a quadratic Bézier curve" src="./abc.js" data-type="quadratic">
  <input type="range" min="0" max="1" step="0.01" value="0.5" class="slide-control">
</graphics-element>
<graphics-element inline={true} title="Projections in a cubic Bézier curve" src="./abc.js" data-type="cubic">
  <input type="range" min="0" max="1" step="0.01" value="0.5" class="slide-control">
</graphics-element>

</div>

So these graphics show us several things:

1. a point at the tip of the curve construction's "hat": let's call that `A`, as well as
2. our on-curve point give our chosen `t` value: let's call that `B`, and finally,
3. a point that we get by projecting A, through B, onto the line between the curve's start and end points: let's call that `C`.
4. for both quadratic and cubic curves, two points `e1` and `e2`, which represent the single-to-last step in de Casteljau's algorithm: in the last step, we find `B` at `(1-t) * e1 + t * e2`.
4. for cubic curves, also the points `v1` and `v2`, which together with `A` represent the first step in de Casteljau's algorithm: in the next step, we find `e1` and `e2`.

These three values A, B, and C allow us to derive an important identity formula for quadratic and cubic Bézier curves: for any point on the curve with some `t` value, the ratio of distances from A to B and B to C is fixed: if some `t` value sets up a C that is 20% away from the start and 80% away from the end, then _it doesn't matter where the start, end, or control points are_; for that `t` value, `C` will *always* lie at 20% from the start and 80% from the end point. Go ahead, pick an on-curve point in either graphic and then move all the other points around: if you only move the control points, start and end won't move, and so neither will C, and if you move either start or end point, C will move but its relative position will not change.

So, how can we compute `C`? We start with our observation that `C` always lies somewhere between the start and ends points, so logically `C` will have a function that interpolates between those two coordinates:

\[
  C = u(t) \cdot P_{start} + (1-u(t)) \cdot P_{end}
\]

If we can figure out what the function `u(t)` looks like, we'll be done. Although we do need to remember that this `u(t)` will have a different for depending on whether we're working with quadratic or cubic curves. [Running through the maths](https://mathoverflow.net/questions/122257/finding-the-formula-for-bezier-curve-ratios-hull-point-point-baseline) (with thanks to Boris Zbarsky) shows us the following two formulae:

\[
  u(t)_{quadratic} = \frac{(1-t)^2}{t^2 + (1-t)^2}
\]

And

\[
  u(t)_{cubic} = \frac{(1-t)^3}{t^3 + (1-t)^3}
\]

So, if we know the start and end coordinates, and we know the *t* value, we know C, without having to calculate the `A` or even `B` coordinates. In fact, we can do the same for the ratio function: as another function of `t`, we technically don't need to know what `A` or `B` or `C` are, we can express it was a pure function of `t`, too.

We start by observing that, given `A`, `B`, and `C`, the following always holds:

\[
  ratio(t) = \frac{distance(B,C)}{distance(A,B)} = Constant
\]

Working out the maths for this, we see the following two formulae for quadratic and cubic curves:

\[
  ratio(t)_{quadratic} = \left | \frac{t^2 + (1-t)^2 - 1}{t^2 + (1-t)^2} \right |
\]

And

\[
  ratio(t)_{cubic} = \left | \frac{t^3 + (1-t)^3 - 1}{t^3 + (1-t)^3} \right |
\]

Which now leaves us with some powerful tools: given thee points (start, end, and "some point on the curve"), as well as a `t` value, we can _construct_ curves: we can compute `C` using the start and end points, and our `u(t)` function, and once we have `C`, we can use our on-curve point (`B`) and the `ratio(t)` function to find `A`:

\[
  A = B - \frac{C - B}{ratio(t)} = B + \frac{B - C}{ratio(t)}
\]

With `A` found, finding `e1` and `e2` for quadratic curves is a matter of running the linear interpolation with `t` between start and `A` to yield `e1`, and between `A` and end to yield `e2`. For cubic curves, there is no single pair of points that can act as `e1` and `e2`: as long as the distance ratio between  `e1` to `B` and `B` to `e2` is the Bézier ratio `(1-t):t`, we can reverse engineer `v1` and `v2`:

\[
    \left \{ \begin{aligned}
    v_1 &= A' - \frac{A' - e_1}{1 - t} \\
    v_2 &= A' - \frac{A' - e_2}{t}
    \end{aligned} \right .
\]

And then reverse engineer the curve's control control points:

\[
    \left \{ \begin{aligned}
    C_1' &= start + \frac{v_1 - start}{t} \\
    C_2' &= end + \frac{v_2 - end}{1 - t}
    \end{aligned} \right .
\]

So: if we have a curve's start and end point, then for any `t` value we implicitly know all the ABC values, which  (combined with an educated guess on appropriate `e1` and `e2` coordinates for cubic curves) gives us the necessary information to reconstruct a curve's "de Casteljau skeleton". Which means that we can now do several things: we can "fit" curves using only three points, which means we can also "mold" curves by moving an on-curve point but leaving its start and end point, and then reconstructing the curve based on where we moved the on-curve point to. These are very useful things, and we'll look at both in the next few sections.
