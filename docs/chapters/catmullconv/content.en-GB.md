# Bézier curves and Catmull-Rom curves

Taking an excursion to different splines, the other common design curve is the [Catmull-Rom spline](https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Catmull.E2.80.93Rom_spline), which unlike Bézier curves pass _through_ the points you define. In fact, let's start with just playing with one: the following graphic has a predefined curve that you manipulate the points for, or you can click/tap somewhere to extend the curve.

<graphics-element title="A Catmull-Rom curve" src="./catmull-rom.js">
  <input type="range" min="0.1" max="1" step="0.01" value="0.5" class="slide-control tension">
</graphics-element>

You may have noticed the slider that seems to control the "tension" of the curve: that's a feature of Catmull-Rom curves; because Catmull-Rom curves pass through points, the curve tightness is controlled by a tension factor, rather than by moving control points around.

What you may _also_ have noticed is that the Catmull-Rom curve seems to just go on forever: add as many points as you like, same curve, rigth? Well, sort of. Catmull-Rom curves are splines, a type of curve with arbitrary number of points, technically consisting of "segments between sets of points", but with maths that makes all the segments line up neatly. As such, at its core a Catmull-Rom consists of two points, and draws a curve between them based on the tangents at those points.

Now, a Catmull-Rom spline is a form of [cubic Hermite spline](https://en.wikipedia.org/wiki/Cubic_Hermite_spline), and as it so happens, the cubic Bézier curve is _also_ a cubic Hermite spline, so in an interesting bit of programming maths: we can losslessly convert between the two, and the maths (well, the final maths) is surprisingly simple!

The main difference between Catmull-Rom curves and Bezier curves is "what the points mean". A cubic Bézier curve is defined by a start point, a control point that implies the tangent at the start, a control point that implies the tangent at the end, and an end point. A Catmull-Rom curve is defined by a start point, a tangent that for that starting point, an end point, and a tangent for that end point. Those are _very_ similar, so let's see exactly _how_ similar they are.

We start with the matrix form of thee Catmull-Rom curve, which looks similar to the Bézier matrix form, with slightly different values in the matrix, and a slightly different coordinate vector:

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

So the question is: how can we convert that expression with Catmull-Rom matrix and vector into an expression that uses Bézier matrix and vector? The short answer is of course "by using linear algebra", but the real answer is a bit longer, and involves some maths that you may not even care for: just skip over the next bit to see the incredibly simple conversions between the formats, but if you want to know _why_... let's go!

<div class="note">

## Deriving the conversion formulae

In order to convert between Catmull-Rom curves and Bézier curves, we need to know two things. Firstly, how to express the Catmull-Rom curve using a "set of four coordinates", rather than a mix of coordinates and tangents, and secondly, how to convert those Catmull-Rom coordinates to and from Bézier form.

So, let's start with the first, where we want to satisfy the following equality:

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

This mapping says that in order to map a Catmull-Rom "point + tangent" vector to something based on an "all coordinates" vector, we need to determine the mapping matrix such that applying <em>T</em> yields P2 as start point, P3 as end point, and two tangents based on the lines between P1 and P3, and P2 nd P4, respectively.

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

However, we're not <em>quite</em> done, because Catmull-Rom curves have a parameter called "tension", written as τ ("tau"), which is a scaling factor for the tangent vectors: the bigger the tension, the smaller the tangents, and the smaller the tension, the bigger the tangents. As such, the tension factor goes in the denominator for the tangents, and before we continue, let's add that tension factor into both our coordinate vector representation, and mapping matrix <em>T</em>:

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
