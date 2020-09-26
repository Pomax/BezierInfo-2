# Creating a curve from three points

Given the preceding section, you might be wondering if we can use that knowledge to just "create" curves by placing some points and having the computer do the rest, to which the answer is: that's exactly what we can now do!

For quadratic curves, things are pretty easy. Technically, we'll need a `t` value in order to compute the ratio function used in computing the ABC coordinates, but we can just as easily approximate one by treating the distance between the start and `B` point, and `B` and end point as a ratio, using

\[
  \left \{ \begin{aligned}
    d_1 &= ||\textit{Start} - B||\\
    d_2 &= ||\textit{End} - B||\\
    t &= \frac{d_1}{d_1+d_2}
  \end{aligned} \right .
\]

With this code in place, creating a quadratic curve from three points is literally just computing the ABC values, and using `A` as our curve's control point:

<graphics-element title="Fitting a quadratic Bézier curve" src="./quadratic.js"></graphics-element>

For cubic curves we need to do a little more work, but really only just a little. We're first going to assume that a decent curve through the three points should approximate a circular arc, which first requires knowing how to fit a circle to three points. You may remember (if you ever learned it!) that a line between two points on a circle is called a [chord](https://en.wikipedia.org/wiki/Chord_%28geometry%29), and that one property of chords is that the line from the center of any chord, perpendicular to that chord, passes through the center of the circle.

That means that if we have have three points on a circle, we have three (different) chords, and consequently, three (different) lines that go from those chords through the center of the circle: if we find two of those lines, then their intersection will be our circle's center, and the circle's radius will—by definition!—be the distance from the center to any of our three points:

<graphics-element title="Finding a circle through three points" src="./circle.js"></graphics-element>

With that covered, we now also know the tangent line to our point `B`, because the tangent to any point on the circle is a line through that point, perpendicular to the line from that point to the center. That just leaves marking appropriate points `e1` and `e2` on that tangent, so that we can construct a new cubic curve hull. We use the approach as we did for quadratic curves to automatically determine a reasonable `t` value, and then our `e1` and `e2` coordinates must obey the standard de Casteljau rule for linear interpolation:

\[
  \left \{ \begin{aligned}
    e_1 &= B + t \cdot d\\
    e_2 &= B - (1-t) \cdot d
  \end{aligned} \right .
\]

Where `d` is the total length of the line segment from `e1` to `e2`. So how long do we make that? There are again all kinds of approaches we can take, and a simple-but-effective one is to set the length of that segment to "one third the length of the baseline". This forces `e1` and `e2` to always be the "linear curve" distance apart, which means if we place our three points on a line, it will actually _look_ like a line. Nice! The last thing we'll need to do is make sure to flip the sign of `d` depending on which side of the baseline our `B` is located, so we don't up creating a funky curve with a loop in it. To do this, we can use the [atan2](https://en.wikipedia.org/wiki/Atan2) function:

\[
  \phi = \left ( atan2(E_y-S_y, E_x-S_x) - atan2(B_y-S_y, B_x-S_x) + 2 \pi \right ) \textit{ mod } 2 \pi
\]

This angle φ will be between 0 and π if `B` is "above" the baseline (rotating all three points so that the start is on the left and the end is the right), so we can use a relatively straight forward check to make sure we're using the correct sign for our value `d`:

\[
  d = \left \{ \begin{aligned}
     d & \textit{ if } 0 \leq \phi \leq \pi \\
    -d & \textit{ if } \phi < 0 \lor \phi > \pi
  \end{aligned} \right .
\]

The result of this approach looks as follows:

<graphics-element title="Finding the cubic e₁ and e₂ given three points " src="./circle.js" data-show-curve="true"></graphics-element>

It is important to remember that even though we're using a circular arc to come up with decent `e1` and `e2` terms, we're _not_ trying to perfectly create a circular arc with a cubic curve (which is good, because we can't; [more on that later](#arcapproximation)), we're _only_ trying to come up with some reasonable `e1` and `e2` points so we can construct a new cubic curve... so now that we have those: let's see what kind of cubic curve that gives us:

<graphics-element title="Fitting a quadratic Bézier curve" src="./cubic.js"></graphics-element>

That looks perfectly serviceable!

Of course, we can take this one step further: we can't just "create" curves, we also have (almost!) all the tools available to "mold" curves, where we can reshape a curve by dragging a point on the curve around while leaving the start and end fixed, effectively molding the shape as if it were clay or the like. We'll see the last tool we need to do that in the next section, and then we'll look at implementing curve molding in the section after that, so read on!
