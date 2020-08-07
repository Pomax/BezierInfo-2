# The projection identity

De Casteljau's algorithm is the pivotal algorithm when it comes to Bézier curves. You can use it not just to split curves, but also to draw them efficiently (especially for high-order Bézier curves), as well as to come up with curves based on three points and a tangent. Particularly this last thing is really useful because it lets us "mould" a curve, by picking it up at some point, and dragging that point around to change the curve's shape.

How does that work? Succinctly: we run de Casteljau's algorithm in reverse!

In order to run de Casteljau's algorithm in reverse, we need a few basic things: a start and end point, a point on the curve that want to be moving around, which has an associated *t* value, and a point we've not explicitly talked about before, and as far as I know has no explicit name, but lives one iteration higher in the de Casteljau process then our on-curve point does. I like to call it "A" for reasons that will become obvious.

So let's use graphics instead of text to see where this "A" is, because text only gets us so far: in the following graphic, click anywhere on the curves to see the identity information that we'll be using to run de Casteljau in reverse (you can manipulate the curve even after picking a point. Note the "ratio" value when you do so: does it change?):

<graphics-element title="Projections in a quadratic Bézier curve" width="275" height="275" src="./quadratic.js"></graphics-element>
<graphics-element title="Projections in a cubic Bézier curve" width="275" height="275" src="./cubic.js"></graphics-element>

Clicking anywhere on the curves shows us three things:

1. our on-curve point; let's call that <b>B</b>,
2. a point at the tip of B's "hat", on de Casteljau step up; let's call that <b>A</b>, and
3. a point that we get by projecting B onto the start--end baseline; let's call that <b>C</b>.

These three values A, B, and C hide an important identity formula for quadratic and cubic Bézier curves: for any point on the curve with some *t* value, the ratio distance of C along the baseline is fixed: if some *t* value sets up a C that is 20% away from the start and 80% away from the end, then it doesn't matter where the start, end, or control points are; for that *t* value, C will *always* lie at 20% from the start and 80% from the end point. Go ahead, pick an on-curve point in either graphic and then move all the other points around: if you only move the control points, start and end won't move, and so neither will C, and if you move either start or end point, C will move but its relative position will not change. The following function stays true:

\[
  C = u \cdot P_{start} + (1-u) \cdot P_{end}
\]

So that just leaves finding A.

<div class="note">

While that relation is fixed, the function *u(t)* differs depending on whether we're working
with quadratic or cubic curves:

\[
\begin{aligned}
& u(t)_{quadratic} &= \frac{(1-t)^2}{t^2 + (1-t)^2} \\
& u(t)_{cubic} &= \frac{(1-t)^3}{t^3 + (1-t)^3}
\end{aligned}
\]

So, if we know the start and end coordinates, and we know the *t* value, we know C:

<graphics-element title="Quadratic value of C for t" width="275" height="275" src="./qct.js"></graphics-element>
<graphics-element title="Cubic value of C for t" width="275" height="275" src="./cct.js"></graphics-element>

Mouse-over the graphs to see the expression for C, given the *t* value at the mouse pointer.

</div>

There's also another important bit of information that is inherent to the ABC values: while the distances between A and B, and B and C, are dynamic (based on where we put B), the *ratio* between the two distances is stable. Given some *t* value, the following always holds:

\[
  ratio(t) = \frac{distance(B,C)}{distance(A,B)} = Constant
\]

This leads to a pretty powerful bit of knowledge: merely by knowing the *t* value of some on curve point, we know where C has to be (as per the above note), and because we know B and C, and thus have the distance between them, we know where A has to be:

\[
  A = B - \frac{C - B}{ratio(t)} = B + \frac{B - C}{ratio(t)}
\]

And that's it, all values found.

<div class="note">

Much like the *u(t)* function in the above note, the *ratio(t)* function depends on whether we're looking at quadratic or cubic curves. Their form is intrinsically related to the *u(t)* function in that they both come rolling out of the same function evaluation, explained over on [MathOverflow](http://mathoverflow.net/questions/122257/finding-the-formula-for-Bézier-curve-ratios-hull-point-point-baseline) by Boris Zbarsky and myself. The ratio functions are the "s(t)" functions from the answers there, while the "u(t)" functions have the same name both here and on MathOverflow.

\[
  ratio(t)_{quadratic} = \left | \frac{t^2 + (1-t)^2 - 1}{t^2 + (1-t)^2} \right |
\]

\[
  ratio(t)_{cubic} = \left | \frac{t^3 + (1-t)^3 - 1}{t^3 + (1-t)^3} \right |
\]

Unfortunately, this trick only works for quadratic and cubic curves. Once we hit higher order curves, things become a lot less predictable; the "fixed point *C*" is no longer fixed, moving around as we move the control points, and projections of *B* onto the line between start and end may actually lie on that line before the start, or after the end, and there are no simple ratios that we can exploit.

</div>

So: if we know B and its corresponding *t* value, then we know all the ABC values, which —together with a start and end coordinate— gives us the necessary information to reconstruct a curve's "de Casteljau skeleton", which means that two points and a value between 0 and 1, we can come up with a curve. And that opens up possibilities: curve manipulation by dragging an on-curve point, as well as curve fitting of "a bunch of coordinates". These are useful things, and we'll look at both in the next sections.
