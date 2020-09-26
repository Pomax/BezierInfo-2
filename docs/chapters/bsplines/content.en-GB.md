# B-Splines

No discussion on Bézier curves is complete without also giving mention of that other beast in the curve design space: B-Splines. Easily confused to mean Bézier splines, that's not actually what they are; they are "basis function" splines, which makes a lot of difference, and we'll be looking at those differences in this section. We're not going to dive as deep into B-Splines as we have for Bézier curves (that would be an entire primer on its own) but we'll be looking at how B-Splines work, what kind of maths is involved in computing them, and how to draw them based on a number of parameters that you can pick for individual B-Splines.

First off: B-Splines are [piecewise](https://en.wikipedia.org/wiki/Piecewise), [polynomial interpolation curves](https://en.wikipedia.org/wiki/Spline_(mathematics)), where the "single curve" is built by performing polynomial interpolation over a set of points, using a sliding window of a fixed number of points. For instance, a "cubic" B-Spline defined by twelve points will have its curve built by evaluating the polynomial interpolation of four points, and the curve can be treated as a lot of different sections, each controlled by four points at a time, such that the full curve consists of smoothly connected sections defined by points {1,2,3,4}, {2,3,4,5}, ..., {8,9,10,11}, and finally {9,10,11,12}, for eight sections.

What do they look like? They look like this! Tap on the graphic to add more points, and move points around to see how they map to the spline curve drawn.

<graphics-element title="A B-Spline example" width="600" height="300" src="./basic.js"></graphics-element>

The important part to notice here is that we are **not** doing the same thing with B-Splines that we do for poly-Béziers or Catmull-Rom curves: both of the latter simply define new sections as literally "new sections based on new points", so a 12 point cubic poly-Bézier curve is actually impossible, because we start with a four point curve, and then add three more points for each section that follows, so we can only have 4, 7, 10, 13, 16, etc. point Poly-Béziers. Similarly, while Catmull-Rom curves can grow by adding single points, this addition of a single point introduces three implicit Bézier points. Cubic B-Splines, on the other hand, are smooth interpolations of *each possible curve involving four consecutive points*, such that at any point along the curve except for our start and end points, our on-curve coordinate is defined by four control points.

Consider the difference to be this:

- for Bézier curves, the curve is defined as an interpolation of points, but:
- for B-Splines, the curve is defined as an interpolation of *curves*.

In fact, let's look at that again, but this time with the base curves shown, too. Each consecutive four points define one curve:

<graphics-element title="The components of a B-Spline " width="600" height="300" src="./basic.js" data-show-curves="true">
  <!-- basis curve highlighter goes here -->
</graphics-element>

In order to make this interpolation of curves work, the maths is necessarily more complex than the maths for Bézier curves, so let's have a look at how things work.


## How to compute a B-Spline curve: some maths

Given a B-Spline of degree `d` and thus order `k=d+1` (so a quadratic B-Spline is degree 2 and order 3, a cubic B-Spline is degree 3 and order 4, etc) and `n` control points `P<sub>0</sub>` through `P<sub>n-1</sub>`, we can compute a point on the curve for some value `t` in the interval [0,1] (where 0 is the start of the curve, and 1 the end, just like for Bézier curves), by evaluating the following function:

\[
  Point(t) = \sum^n_{i=0} P_i \cdot N_{i,k}(t)
\]

Which, honestly, doesn't tell us all that much. All we can see is that a point on a B-Spline curve is defined as "a mix of all the control points, weighted somehow", where the weighting is achieved through the *N(...)* function, subscripted with an obvious parameter `i`, which comes from our summation, and some magical parameter `k`. So we need to know two things: 1. what does N(t) do, and 2. what is that `k`? Let's cover both, in reverse order.

The parameter `k` represents the "knot interval" over which a section of curve is defined. As we learned earlier, a B-Spline curve is itself an interpolation of curves, and we can treat each transition where a control point starts or stops influencing the total curvature as a "knot on the curve".
Doing so for a degree `d` B-Spline with `n` control point gives us `d + n + 1` knots, defining `d + n` intervals along the curve, and it is these intervals that the above `k` subscript to the N() function applies to.

Then the N() function itself. What does it look like?

\[
  N_{i,k}(t) = \left ( \frac{t-knot_i}{knot_{(i+k-1)} - knot_i}\right ) \cdot N_{i,k-1}(t) + \left ( \frac{knot_{(i+k)}-t}{knot_{(i+k)} - knot_{(i+1)}} \right ) \cdot N_{i+1,k-1}(t)
\]

So this is where we see the interpolation: N(t) for an `(i,k)` pair (that is, for a step in the above summation, on a specific knot interval) is a mix between N(t) for `(i,k-1)` and N(t) for `(i+1,k-1)`, so we see that this is a recursive iteration where `i` goes up, and `k` goes down, so it seem reasonable to expect that this recursion has to stop at some point; obviously, it does, and specifically it does so for the following `i`/`k` values:

\[
  N_{i,1}(t) = \left\{\begin{matrix}
               1& \text{if } t \in [knot_i,knot_{i+1}) \\
               0& \text{otherwise}
               \end{matrix}\right.
\]

And this function finally has a straight up evaluation: if a `t` value lies within a knot-specific interval once we reach a `k=1` value, it "counts", otherwise it doesn't. We did cheat a little, though, because for all these values we need to scale our `t` value first, so that it lies in the interval bounded by `knots[d]` and `knots[n]`, which are the start point and end point where curvature is controlled by exactly `order` control points. For instance, for degree 3 (=order 4) and 7 control points, with knot vector [1,2,3,4,5,6,7,8,9,10,11], we map `t` from [the interval 0,1] to the interval [4,8], and then use that value in the functions above, instead.


## Can we simplify that?

We can, yes.

People far smarter than us have looked at this work, and two in particular — [Maurice Cox](https://www.npl.co.uk/people/maurice-cox) and [Carl de Boor](https://en.wikipedia.org/wiki/Carl_R._de_Boor) — came to a mathematically pleasing solution: to compute a point P(t), we can compute this point by evaluating *d(t)* on a curve section between knots `i` and `i+1`:

\[
  d^k_i(t) = \alpha_{i,k} \cdot d^{k-1}_i(t) + (1-\alpha_{i,k}) \cdot d^{k-1}_{i-1}(t)
\]

This is another recursive function, with *k* values decreasing from the curve order to 1, and the value *α* (alpha) defined by:

\[
  \alpha_{i,k} = \frac{t - knots[i]}{knots[i+1+n-k] - knots[i]}
\]

That looks complicated, but it's not. Computing alpha is just a fraction involving known, plain numbers. And, once we have our alpha value, we also have `(1-alpha)` because it's a trivial subtraction. Computing the `d()` function is thus mostly a matter of computing pretty simple arithmetical statements, with some caching of results so we can refer to them as we recurve. While the recursion might see computationally expensive, the total algorithm is cheap, as each step only involves very simple maths.

Of course, the recursion does need a stop condition:

\[
  d^k_0(t) = 0, \ d^0_i(t) = N_{i,1}(t) =
  \left\{\begin{matrix}
    1& \text{if } t \in [knot_i,knot_{i+1}) \\
    0& \text{otherwise}
  \end{matrix}\right.
\]

So, we actually see two stopping conditions: either `i` becomes 0, in which case `d()` is zero, or `k` becomes zero, in which case we get the same "either 1 or 0" that we saw in the N() function above.

Thanks to Cox and de Boor, we can compute points on a B-Spline pretty easily using the same kind of linear interpolation we saw in de Casteljau's algorithm. For instance, if we write out `d()` for `i=3` and `k=3`, we get the following recursion diagram:

\[
  d^3_3 = \left \{
    \begin{aligned}
      \alpha^3_3 \times d^2_3, & \ \textit{ with } d^2_3 = \left \{
        \begin{aligned}
          \alpha^2_3 \times d^1_3, & \ \textit{ with } d^1_3 =
            \left \{
              \begin{aligned}
                \alpha^1_3 \times d^0_3, & \ \textit{ with } d^0_3 \textit{ either 0 or 1} \\
                + & \\
                \left ( 1 - \alpha^1_3 \right ) \times d^0_2, & \ \textit{ with } d^0_2 \textit{ either 0 or 1} \\
              \end{aligned}
            \right . \\
          + & \\
          \left ( 1 - \alpha^2_3 \right ) \times d^1_2, & \ \textit{ with } d^1_2 =
            \left \{
              \begin{aligned}
                \alpha^1_2 \times d^0_2 & \\
                + & \\
                \left ( 1 - \alpha^1_2 \right ) \times d^0_1, & \ \textit{ with } d^0_1 \textit{ either 0 or 1} \\
              \end{aligned}
            \right . \\
        \end{aligned}
      \right . \\
      + & \\
      \left ( 1 - \alpha^3_3 \right ) \times d^2_2, & \ \textit{ with } d^2_2 = \left \{
        \begin{aligned}
          \alpha^2_2 \times d^1_2 & \\
          & \\
          + & \\
          \left ( 1 - \alpha^2_2 \right ) \times d^1_1, & \ \textit{ with } d^1_1 =
            \left \{
              \begin{aligned}
                \alpha^1_1 \times d^0_1 \\
                + & \\
                \left ( 1 - \alpha^1_1 \right ) \times d^0_0, & \ \textit{ with } d^0_0 \textit{ either 0 or 1} \\
              \end{aligned}
            \right . \\
        \end{aligned}
      \right .
    \end{aligned}
  \right .
\]

That is, we compute `d(3,3)` as a mixture of `d(2,3)` and `d(2,2)`, where those two are themselves a mixture of `d(1,3)` and `d(1,2)`, and `d(1,2)` and `d(1,1)`, respectively, which are themselves a mixture of etc. etc. We simply keep expanding our terms until we reach the stop conditions, and then sum everything back up. It's really quite elegant.

One thing we need to keep in mind is that we're working with a spline that is constrained by its control points, so even though the `d(..., k)` values are zero or one at the lowest level, they are really "zero or one, times their respective control point", so in the next section you'll see the algorithm for running through the computation in a way that starts with a copy of the control point vector and then works its way up to that single point, rather than first starting "on the left", working our way "to the right" and then summing back up "to the left". We can just start on the right and work our way left immediately.

## Running the computation

Unlike the de Casteljau algorithm, where the `t` value stays the same at every iteration, for B-Splines that is not the case, and so we end having to (for each point we evaluate) run a fairly involving bit of recursive computation. The algorithm is discussed on [this Michigan Tech](https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/de-Boor.html) page, but an easier to read version is implemented by [b-spline.js](https://github.com/thibauts/b-spline/blob/master/index.js#L59-L71), so we'll look at its code.

Given an input value `t`, we first map the input to a value from the domain `[0,1]` to the domain `[knots[degree], knots[knots.length - 1 - degree]`. Then, we find the section number `s` that this mapped `t` value lies on:

```
for(s=domain[0]; s < domain[1]; s++) {
  if(knots[s] <= t && t <= knots[s+1]) break;
}
```

after running this code, `s` is the index for the section the point will lie on. We then run the algorithm mentioned on the MU page (updated to use this description's variable names):

```
let v = copy of control points

for(let L = 1; L <= order; L++) {
  for(let i=s; i > s + L - order; i--) {
    let numerator = t - knots[i]
    let denominator = knots[i - L + order] - knots[i]
    let alpha = numerator / denominator
    let v[i] = alpha * v[i] + (1-alpha) * v[i-1]
  }
}
```

(A nice bit of behaviour in this code is that we work the interpolation "backwards", starting at `i=s` at each level of the interpolation, and we stop when `i = s - order + level`, so we always end up with a value for `i` such that those `v[i-1]` don't try to use an array index that doesn't exist)


## Open vs. closed paths

Much like poly-Béziers, B-Splines can be either open, running from the first point to the last point, or closed, where the first and last point are the same coordinate. However, because B-Splines are an interpolation of curves, not just points, we can't simply make the first and last point the same, we need to link as many points as are necessary to form "a curve" that the spline performs interpolation with. As such, for an order `d` B-Spline, we need to make the first and last `d` points the same. This is of course hardly more work than before (simply append `points.splice(0,d)` to `points`) but it's important to remember that you need more than just a single point.

Of course if we want to manipulate these kind of curves we need to make sure to mark them as "closed" so that we know the coordinate for `points[0]` and `points[n-k]` etc. don't just happen to have the same x/y values, but really are the same coordinate, so that manipulating one will equally manipulate the other, but programming generally makes this really easy by storing references to points, rather than copies (or other linked values such as coordinate weights, discussed in the NURBS section) rather than separate coordinate objects.


## Manipulating the curve through the knot vector

The most important thing to understand when it comes to B-Splines is that they work *because* of the concept of a knot vector. As mentioned above, knots represent "where individual control points start/stop influencing the curve", but we never looked at the *values* that go in the knot vector. If you look back at the N() and a() functions, you see that interpolations are based on intervals in the knot vector, rather than the actual values in the knot vector, and we can exploit this to do some pretty interesting things with clever manipulation of the knot vector. Specifically there are four things we can do that are worth looking at:

1. we can use a uniform knot vector, with equally spaced intervals,
2. we can use a non-uniform knot vector, without enforcing equally spaced intervals,
3. we can collapse sequential knots to the same value, locally lowering curve complexity using "null" intervals, and
4. we can form a special case non-uniform vector, by combining (1) and (3) to for a vector with collapsed start and end knots, with a uniform vector in between.


### Uniform B-Splines

The most straightforward type of B-Spline is the uniform spline. In a uniform spline, the knots are distributed uniformly over the entire curve interval. For instance, if we have a knot vector of length twelve, then a uniform knot vector would be [0,1,2,3,...,9,10,11]. Or [4,5,6,...,13,14,15], which defines *the same intervals*, or even [0,2,3,...,18,20,22], which also defines *the same intervals*, just scaled by a constant factor, which becomes normalised during interpolation and so does not contribute to the curvature.

<graphics-element title="A uniform B-Spline" width="400" height="400" src="./uniform.js">
  <!-- knot sliders go here -->
</graphics-element>

This is an important point: the intervals that the knot vector defines are *relative* intervals, so it doesn't matter if every interval is size 1, or size 100 - the relative differences between the intervals is what shapes any particular curve.

The problem with uniform knot vectors is that, as we need `order` control points before we have any curve with which we can perform interpolation, the curve does not "start" at the first point, nor "ends" at the last point. Instead there are "gaps". We can get rid of these, by being clever about how we apply the following uniformity-breaking approach instead...


### Reducing local curve complexity by collapsing intervals

Collapsing knot intervals, by making two or more consecutive knots have the same value, allows us to reduce the curve complexity in the sections that are affected by the knots involved. This can have drastic effects: for every interval collapse, the curve order goes down, and curve continuity goes down, to the point where collapsing `order` knots creates a situation where all continuity is lost and the curve "kinks".

<graphics-element title="A reduced uniform B-Spline" width="400" height="400" src="./reduced.js">
  <!-- knot sliders go here -->
</graphics-element>


### Open-Uniform B-Splines

By combining knot interval collapsing at the start and end of the curve, with uniform knots in between, we can overcome the problem of the curve not starting and ending where we'd kind of like it to:

For any curve of degree `D` with control points `N`, we can define a knot vector of length `N+D+1` in which the values `0 ... D+1` are the same, the values `D+1 ... N+1` follow the "uniform" pattern, and the values `N+1 ... N+D+1` are the same again. For example, a cubic B-Spline with 7 control points can have a knot vector [0,0,0,0,1,2,3,4,4,4,4], or it might have the "identical" knot vector [0,0,0,0,2,4,6,8,8,8,8], etc. Again, it is the relative differences that determine the curve shape.

<graphics-element title="An open, uniform B-Spline" width="400" height="400" src="./uniform.js" data-open="true">
  <!-- knot sliders go here -->
</graphics-element>


### Non-uniform B-Splines

This is essentially the "free form" version of a B-Spline, and also the least interesting to look at, as without any specific reason to pick specific knot intervals, there is nothing particularly interesting going on. There is one constraint to the knot vector, other than that any value `knots[k+1]` should be greater than or equal to `knots[k]`.

## One last thing: Rational B-Splines

While it is true that this section on B-Splines is running quite long already, there is one more thing we need to talk about, and that's "Rational" splines, where the rationality applies to the "ratio", or relative weights, of the control points themselves. By introducing a ratio vector with weights to apply to each control point, we greatly increase our influence over the final curve shape: the more weight a control point carries, the closer to that point the spline curve will lie, a bit like turning up the gravity of a control point, just like for rational Bézier curves.

<graphics-element title="A (closed) rational, uniform B-Spline" width="400" height="400" src="rational-uniform.js">
  <!-- knot sliders go here -->
</graphics-element>

Of course this brings us to the final topic that any text on B-Splines must touch on before calling it a day: the [NURBS](https://en.wikipedia.org/wiki/Non-uniform_rational_B-spline), or Non-Uniform Rational B-Spline (NURBS is not a plural, the capital S actually just stands for "spline", but a lot of people mistakenly treat it as if it is, so now you know better). NURBS is an important type of curve in computer-facilitated design, used a lot in 3D modelling (typically as NURBS surfaces) as well as in arbitrary-precision 2D design due to the level of control a NURBS curve offers designers.

While a true non-uniform rational B-Spline would be hard to work with, when we talk about NURBS we typically mean the Open-Uniform Rational B-Spline, or OURBS, but that doesn't roll off the tongue nearly as nicely, and so remember that when people talk about NURBS, they typically mean open-uniform, which has the useful property of starting the curve at the first control point, and ending it at the last.

## Extending our implementation to cover rational splines

The algorithm for working with Rational B-Splines is virtually identical to the regular algorithm, and the extension to work in the control point weights is fairly simple: we extend each control point from a point in its original number of dimensions (2D, 3D, etc.) to one dimension higher, scaling the original dimensions by the control point's weight, and then assigning that weight as its value for the extended dimension.

For example, a 2D point `(x,y)` with weight `w` becomes a 3D point `(w * x, w * y, w)`.

We then run the same algorithm as before, which will automatically perform weight interpolation in addition to regular coordinate interpolation, because all we've done is pretended we have coordinates in a higher dimension. The algorithm doesn't really care about how many dimensions it needs to interpolate.

In order to recover our "real" curve point, we take the final result of the point generation algorithm, and "unweigh" it: we take the final point's derived weight `w'` and divide all the regular coordinate dimensions by it, then throw away the weight information.

Based on our previous example, we take the final 3D point `(x', y', w')`, which we then turn back into a 2D point by computing `(x'/w', y'/w')`. And that's it, we're done!
