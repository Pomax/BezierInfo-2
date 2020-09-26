# Bézier curves and Catmull-Rom curves

Taking an excursion to different splines, the other common design curve is the [Catmull-Rom spline](https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Catmull.E2.80.93Rom_spline), which unlike Bézier curves pass _through_ each control point, so they offer a kind of "built-in" curve fitting.

In fact, let's start with just playing with one: the following graphic has a predefined curve that you manipulate the points for, and lets you add points by clicking/tapping the background, as well as let you control "how fast" the curve passes through its point using the tension slider. The tenser the curve, the more the curve tends towards straight lines from one point to the next.

<graphics-element title="A Catmull-Rom curve" src="./catmull-rom.js">
  <input type="range" min="0.1" max="1" step="0.01" value="0.5" class="slide-control tension">
</graphics-element>

Now, it may look like Catmull-Rom curves are very different from Bézier curves, because these curves can get very long indeed, but what looks like a single Catmull-Rom curve is actually a [spline](https://en.wikipedia.org/wiki/Spline_(mathematics)): a single curve built up of lots of identically-computed pieces, similar to if you just took a whole bunch of Bézier curves, placed them end to end, and lined up their control points so that things look like a single curve. For a Catmull-Rom curve, each "piece" between two points is defined by the point's coordinates, and the tangent for those points, the latter of which [can trivially be derived](https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Catmull%E2%80%93Rom_spline) from knowing the previous and next point:

\[
  \begin{bmatrix}
    P_1 \\
    P_2 \\
    P_3 \\
    P_4
  \end{bmatrix}_{points}
  =
  \left [
    \begin{array}{rl}
      V_1 &= P_2 \\
      V_2 &= P_3 \\
      V'_1 &= \frac{P_3 - P_1}{2} \\
      V'_2 &= \frac{P_4 - P_2}{2}
    \end{array}
  \right ]_{point-tangent}
\]

One downside of this is that—as you may have noticed from the graphic—the first and last point of the overall curve don't actually join up with the rest of the curve: they don't have a previous/next point respectively, and so there is no way to calculate what their tangent should be. Which also makes it rather tricky to fit a Catmull-Rom curve to three points like we were able to do for Bézier curves. More on that in [the next section](#catmullfitting).

In fact, before we move on, let's look at how to actually draw the basic form of these curves (I say basic, because there are a number of variations that make things [considerable](https://en.wikipedia.org/wiki/Centripetal_Catmull%E2%80%93Rom_spline#Definition) more [complex](https://en.wikipedia.org/wiki/Kochanek%E2%80%93Bartels_spline)):

```
tension = some value greater than 0, defaulting to 1
points = a list of at least 4 coordinates

for p = 1 to points.length-3 (inclusive):
       p0 = points[p-1]
  v1 = p1 = points[p]
  v2 = p2 = points[p+1]
       p3 = points[p+2]

  s = 2 * tension
  dv1 = (p2-p0) / s
  dv2 = (p3-p1) / s

  for t = 0 to 1 (inclusive):
    c0 = 2*t^3 - 3*t^2 + 1,
    c1 = t^3 - 2*t^2 + t,
    c2 = -2*t^3 + 3*t^2,
    c3 = t^3 - t^2
    point(c0 * v1 + c1 * dv1 + c2 * v2 + c3 * dv2)
```

Now, since a Catmull-Rom curve is a form of [cubic Hermite spline](https://en.wikipedia.org/wiki/Cubic_Hermite_spline), and as cubic Bézier curves are _also_ a form of cubic Hermite spline, we run into an interesting bit of maths programming: we can convert one to the other and back, and the maths for doing so is surprisingly simple!

The main difference between Catmull-Rom curves and Bézier curves is "what the points mean":

- A cubic Bézier curve is defined by a start point, a control point that implies the tangent at the start, a control point that implies the tangent at the end, and an end point, plus a characterizing matrix that we can multiply by that point vector to get on-curve coordinates.
- A Catmull-Rom curve is defined by a start point, a tangent that for that starting point, an end point, and a tangent for that end point, plus a characteristic matrix that we can multiple by the point vector to get on-curve coordinates.

Those are _very_ similar, so let's see exactly _how_ similar they are. We've already see the matrix form for Bézier curves, so how different is the matrix form for Catmull-Rom curves?:

\[
  CatmullRom(t) =
  \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 &  0 \\
   0 &  0 &  1 &  0 \\
  -3 &  3 & -2 & -1 \\
   2 & -2 &  1 &  1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  V_1 \\ V_2 \\ V'_1 \\ V'_2
  \end{bmatrix}
\]

That's pretty dang similar. So the question is: how can we convert that expression with Catmull-Rom matrix and vector into an expression of the Bézier matrix and vector? The short answer is of course "by using linear algebra", but the longer answer is the rest of this section, and involves some maths that you may not even care for: if you just want to know the (incredibly simple) conversions between the two curve forms, feel free to skip to the end of the following explanation, but if you want to _how_ we can get one from the other... let's get mathing!

<div class="note">

## Deriving the conversion formulae

In order to convert between Catmull-Rom curves and Bézier curves, we need to know two things. Firstly, how to express the Catmull-Rom curve using a "set of four coordinates", rather than a mix of coordinates and tangents, and secondly, how to convert those Catmull-Rom coordinates to and from Bézier form.

We start with the first part, to figure out how we can go from Catmull-Rom **V** coordinates to Bézier **P** coordinates, by applying "some matrix **T**". We don't know what that **T** is yet, but we'll get to that:

\[
  \begin{bmatrix}
  V_1 \\ V_2 \\ V'_1 \\ V'_2
  \end{bmatrix}
  =
  T
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
  =
  \begin{bmatrix}
  P_2 \\ P_3 \\ \frac{P_3 - P_1}{2} \\ \frac{P_4 - P_2}{2}
  \end{bmatrix}
\]

So, this mapping says that in order to map a Catmull-Rom "point + tangent" vector to something based on an "all coordinates" vector, we need to determine the mapping matrix such that applying <em>T</em> yields P2 as start point, P3 as end point, and two tangents based on the lines between P1 and P3, and P2 nd P4, respectively.

Computing <em>T</em> is really more "arranging the numbers":

\[
  T
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
  =
  \begin{bmatrix}
  P_2 \\ P_3 \\ \frac{P_3 - P_1}{2} \\ \frac{P_4 - P_2}{2}
  \end{bmatrix}
  =
  \begin{bmatrix}
   0 \cdot P1 &+ 1 \cdot P2 &+ 0 \cdot P3 &+ 0 \cdot P4 \\
   0 \cdot P1 &+ 0 \cdot P2 &+ 1 \cdot P3 &+ 0 \cdot P4 \\
  \frac{-1}{2} \cdot P1 &+ 0 \cdot P2 &+ \frac{1}{2} \cdot P3 &+ 0 \cdot P4 \\
   0 \cdot P1 & \frac{-1}{2} \cdot P2 &+ 0 \cdot P3 &+ \frac{1}{2} \cdot P4
  \end{bmatrix}
  =
  \begin{bmatrix}
   0 &  1 & 0 & 0 \\
   0 &  0 & 1 & 0 \\
  \frac{-1}{2} &  0 & \frac{1}{2} & 0 \\
   0 & \frac{-1}{2} & 0 & \frac{1}{2}
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]

Thus:

\[
  T
  =
  \begin{bmatrix}
   0 &  1 & 0 & 0 \\
   0 &  0 & 1 & 0 \\
  \frac{-1}{2} &  0 & \frac{1}{2} & 0 \\
   0 & \frac{-1}{2} & 0 & \frac{1}{2}
  \end{bmatrix}
\]

However, we're not <em>quite</em> done, because Catmull-Rom curves have that "tension" parameter, written as τ (a lowercase"tau"), which is a scaling factor for the tangent vectors: the bigger the tension, the smaller the tangents, and the smaller the tension, the bigger the tangents. As such, the tension factor goes in the denominator for the tangents, and before we continue, let's add that tension factor into both our coordinate vector representation, and mapping matrix <em>T</em>:

\[
  \begin{bmatrix}
  V_1 \\ V_2 \\ V'_1 \\ V'_2
  \end{bmatrix}
  =
  \begin{bmatrix}
  P_2 \\ P_3 \\ \frac{P_3 - P_1}{2τ} \\ \frac{P_4 - P_2}{2τ}
  \end{bmatrix}
  ,\
  T
  =
  \begin{bmatrix}
   0 &  1 & 0 & 0 \\
   0 &  0 & 1 & 0 \\
  \frac{-1}{2τ} &  0 & \frac{1}{2τ} & 0 \\
   0 & \frac{-1}{2τ} & 0 & \frac{1}{2τ}
  \end{bmatrix}
\]

With the mapping matrix properly done, let's rewrite the "point + tangent" Catmull-Rom matrix form to a matrix form in terms of four coordinates, and see what we end up with:

\[
  CatmullRom(t)
  =
  \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 &  0 \\
   0 &  0 &  1 &  0 \\
  -3 &  3 & -2 & -1 \\
   2 & -2 &  1 &  1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  V_1 \\ V_2 \\ V'_1 \\ V'_2
  \end{bmatrix}
\]

Replace point/tangent vector with the expression for all-coordinates:

\[
  CatmullRom(t)
  =
  \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 &  0 \\
   0 &  0 &  1 &  0 \\
  -3 &  3 & -2 & -1 \\
   2 & -2 &  1 &  1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   0 &  1 & 0 & 0 \\
   0 &  0 & 1 & 0 \\
  \frac{-1}{2τ} &  0 & \frac{1}{2τ} & 0 \\
   0 & \frac{-1}{2τ} & 0 & \frac{1}{2τ}
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]

and merge the matrices:

\[
  CatmullRom(t)
  =
  \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
    0 &    1 &       0 &  0 \\
   \frac{-1}{2τ} &    0 &  \frac{1}{2τ} &  0 \\
   \frac{1}{τ} &  \frac{1}{2t} - 3 & 3 - \frac{1}{t} & \frac{-1}{2t} \\
   \frac{-1}{2t} &  2 - \frac{1}{2τ} & \frac{1}{2τ} - 2 &  \frac{1}{2t}
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]

This looks a lot like the Bézier matrix form, which as we saw in the chapter on Bézier curves, should look like this:

\[
  Bézier(t)
  =
  \begin{bmatrix}
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

So, if we want to express a Catmull-Rom curve using a Bézier curve, we'll need to turn this Catmull-Rom bit:

\[
  \begin{bmatrix}
    0 &    1 &       0 &  0 \\
   \frac{-1}{2τ} &    0 &  \frac{1}{2τ} &  0 \\
   \frac{1}{τ} &  \frac{1}{2t} - 3 & 3 - \frac{1}{t} & \frac{-1}{2t} \\
   \frac{-1}{2t} &  2 - \frac{1}{2τ} & \frac{1}{2τ} - 2 &  \frac{1}{2t}
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]

Into something that looks like this:

\[
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

And the way we do that is with a fairly straight forward bit of matrix rewriting. We start with the equality we need to ensure:

\[
  \begin{bmatrix}
    0 &    1 &       0 &  0 \\
  \frac{-1}{2τ} &    0 &  \frac{1}{2τ} &  0 \\
  \frac{1}{τ} &  \frac{1}{2t} - 3 & 3 - \frac{1}{t} & \frac{-1}{2t} \\
  \frac{-1}{2t} &  2 - \frac{1}{2τ} & \frac{1}{2τ} - 2 &  \frac{1}{2t}
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
  =
  \begin{bmatrix}
  1 &  0 &  0 & 0 \\
  -3 &  3 &  0 & 0 \\
  3 & -6 &  3 & 0 \\
  -1 &  3 & -3 & 1
  \end{bmatrix}
  \cdot
  V
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]

Then we remove the coordinate vector from both sides without affecting the equality:

\[
    \begin{bmatrix}
      0 &    1 &       0 &  0 \\
    \frac{-1}{2τ} &    0 &  \frac{1}{2τ} &  0 \\
    \frac{1}{τ} &  \frac{1}{2t} - 3 & 3 - \frac{1}{t} & \frac{-1}{2t} \\
    \frac{-1}{2t} &  2 - \frac{1}{2τ} & \frac{1}{2τ} - 2 &  \frac{1}{2t}
    \end{bmatrix}
  =
    \begin{bmatrix}
    1 &  0 &  0 & 0 \\
    -3 &  3 &  0 & 0 \\
    3 & -6 &  3 & 0 \\
    -1 &  3 & -3 & 1
    \end{bmatrix}
    \cdot
    V
\]

Then we can "get rid of" the Bézier matrix on the right by left-multiply both with the inverse of the Bézier matrix:

\[
  {
  \begin{bmatrix}
   1 &  0 &  0 & 0 \\
  -3 &  3 &  0 & 0 \\
   3 & -6 &  3 & 0 \\
  -1 &  3 & -3 & 1
  \end{bmatrix}
  }^{-1}
  \cdot
  \begin{bmatrix}
    0 &    1 &       0 &  0 \\
   \frac{-1}{2τ} &    0 &  \frac{1}{2τ} &  0 \\
   \frac{1}{τ} &  \frac{1}{2t} - 3 & 3 - \frac{1}{t} & \frac{-1}{2t} \\
   \frac{-1}{2t} &  2 - \frac{1}{2τ} & \frac{1}{2τ} - 2 &  \frac{1}{2t}
  \end{bmatrix}
  =
  {
  \begin{bmatrix}
   1 &  0 &  0 & 0 \\
  -3 &  3 &  0 & 0 \\
   3 & -6 &  3 & 0 \\
  -1 &  3 & -3 & 1
  \end{bmatrix}
  }^{-1}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 & 0 \\
  -3 &  3 &  0 & 0 \\
   3 & -6 &  3 & 0 \\
  -1 &  3 & -3 & 1
  \end{bmatrix}
  \cdot
  V
\]

A matrix times its inverse is the matrix equivalent of 1, and because "something times 1" is the same as "something", so we can just outright remove any matrix/inverse pair:

\[
  {
  \begin{bmatrix}
   1 &  0 &  0 & 0 \\
  -3 &  3 &  0 & 0 \\
   3 & -6 &  3 & 0 \\
  -1 &  3 & -3 & 1
  \end{bmatrix}
  }^{-1}
  \cdot
  \begin{bmatrix}
    0 &    1 &       0 &  0 \\
   \frac{-1}{2τ} &    0 &  \frac{1}{2τ} &  0 \\
   \frac{1}{τ} &  \frac{1}{2t} - 3 & 3 - \frac{1}{t} & \frac{-1}{2t} \\
   \frac{-1}{2t} &  2 - \frac{1}{2τ} & \frac{1}{2τ} - 2 &  \frac{1}{2t}
  \end{bmatrix}
  =
  V
\]

And now we're <em>basically</em> done. We just multiply those two matrices and we know what <em>V</em> is:

\[
  \begin{bmatrix}
  0 & 1 & 0 & 0 \\
  \frac{-1}{6τ} & 1 & \frac{1}{6τ} & 0 \\
  0 & \frac{1}{6τ} & 1 & \frac{-1}{6τ} \\
  0 & 0 & 1 & 0
  \end{bmatrix}
  =
  V
\]

We now have the final piece of our function puzzle. Let's run through each step.

1. Start with the Catmull-Rom function:

\[
  CatmullRom(t)
  =
  \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 &  0 \\
   0 &  0 &  1 &  0 \\
  -3 &  3 & -2 & -1 \\
   2 & -2 &  1 &  1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  V_1 \\ V_2 \\ V'_1 \\ V'_2
  \end{bmatrix}
\]

2. rewrite to pure coordinate form:

\[
  =
  \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 &  0 \\
   0 &  0 &  1 &  0 \\
  -3 &  3 & -2 & -1 \\
   2 & -2 &  1 &  1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_2 \\ P_3 \\ \frac{P_3 - P_1}{2τ} \\ \frac{P_4 - P_2}{2τ}
  \end{bmatrix}
\]

3. rewrite for "normal" coordinate vector:

\[
  =
  \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   1 &  0 &  0 &  0 \\
   0 &  0 &  1 &  0 \\
  -3 &  3 & -2 & -1 \\
   2 & -2 &  1 &  1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
   0 &  1 & 0 & 0 \\
   0 &  0 & 1 & 0 \\
  \frac{-1}{2τ} &  0 & \frac{1}{2τ} & 0 \\
   0 & \frac{-1}{2τ} & 0 & \frac{1}{2τ}
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]

4. merge the inner matrices:

\[
  =
  \begin{bmatrix}
  1 & t & t^2 & t^3
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
    0 &    1 &       0 &  0 \\
   \frac{-1}{2τ} &    0 &  \frac{1}{2τ} &  0 \\
   \frac{1}{τ} &  \frac{1}{2t} - 3 & 3 - \frac{1}{t} & \frac{-1}{2t} \\
   \frac{-1}{2t} &  2 - \frac{1}{2τ} & \frac{1}{2τ} - 2 &  \frac{1}{2t}
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]

5. rewrite for Bézier matrix form:

\[
  =
  \begin{bmatrix}
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
  0 & 1 & 0 & 0 \\
  \frac{-1}{6τ} & 1 & \frac{1}{6τ} & 0 \\
  0 & \frac{1}{6τ} & 1 & \frac{-1}{6τ} \\
  0 & 0 & 1 & 0
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
  P_1 \\ P_2 \\ P_3 \\ P_4
  \end{bmatrix}
\]

6. and transform the coordinates so we have a "pure" Bézier expression:

\[
  =
  \begin{bmatrix}
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
  P_2 \\
  P_2 + \frac{P_3-P_1}{6 \cdot τ} \\
  P_3 - \frac{P_4-P_2}{6 \cdot τ} \\
  P_3
  \end{bmatrix}
\]

And we're done: we finally know how to convert these two curves!

</div>

If we have a Catmull-Rom curve defined by four coordinates P<sub>1</sub> through P<sub>4</sub>, then we can draw that curve using a Bézier curve that has the vector:

\[
  \begin{bmatrix}
  P_1 \\
  P_2 \\
  P_3 \\
  P_4
  \end{bmatrix}_{CatmullRom}
  \Rightarrow
  \begin{bmatrix}
  P_2 \\
  P_2 + \frac{P_3-P_1}{6 \cdot τ} \\
  P_3 - \frac{P_4-P_2}{6 \cdot τ} \\
  P_3
  \end{bmatrix}_{Bézier}
\]

Similarly, if we have a Bézier curve defined by four coordinates P<sub>1</sub> through P<sub>4</sub>, we can draw that using a standard tension Catmull-Rom curve with the following coordinate values:

\[
  \begin{bmatrix}
  P_1 \\
  P_2 \\
  P_3 \\
  P_4
  \end{bmatrix}_{Bézier}
  \Rightarrow
  \begin{bmatrix}
  P_1 \\
  P_4 \\
  P_4 + 3(P_1 - P_2) \\
  P_1 + 3(P_4 - P_3)
  \end{bmatrix}_{CatmullRom}
\]

Or, if your API allows you to specify Catmull-Rom curves using plain coordinates:

\[
  \begin{bmatrix}
  P_1 \\
  P_2 \\
  P_3 \\
  P_4
  \end{bmatrix}_{Bézier}
  \Rightarrow
  \begin{bmatrix}
  P_4 + 6(P_1 - P_2) \\
  P_1 \\
  P_4 \\
  P_1 + 6(P_4 - P_3)
  \end{bmatrix}_{CatmullRom}
\]
