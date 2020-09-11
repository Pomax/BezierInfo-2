# Circles and quadratic Bézier curves

Circles and Bézier curves are very different beasts, and circles are infinitely easier to work with than Bézier curves. Their formula is much simpler, and they can be drawn more efficiently. But, sometimes you don't have the luxury of using circles, or ellipses, or arcs. Sometimes, all you have are Bézier curves. For instance, if you're doing font design, fonts have no concept of geometric shapes, they only know straight lines, and Bézier curves. OpenType fonts with TrueType outlines only know quadratic Bézier curves, and OpenType fonts with Type 2 outlines only know cubic Bézier curves. So how do you draw a circle, or an ellipse, or an arc?

You approximate.

We already know that Bézier curves cannot model all curves that we can think of, and this includes perfect circles, as well as ellipses, and their arc counterparts. However, we can certainly approximate them to a degree that is visually acceptable. Quadratic and cubic curves offer us different curvature control, so in order to approximate a circle we will first need to figure out what the error is if we try to approximate arcs of increasing degree with quadratic and cubic curves, and where the coordinates even lie.

Since arcs are mid-point-symmetrical, we need the control points to set up a symmetrical curve. For quadratic curves this means that the control point will be somewhere on a line that intersects the baseline at a right angle. And we don't get any choice on where that will be, since the derivatives at the start and end point have to line up, so our control point will lie at the intersection of the tangents at the start and end point.

First, let's try to fit the quadratic curve onto a circular arc. In the following sketch you can move the mouse around over a unit circle, to see how well, or poorly, a quadratic curve can approximate the arc from (1,0) to where your mouse cursor is:

<graphics-element title="Quadratic Bézier arc approximation" width="400" height="400" src="./arc-approximation.js">
  <input type="range" min="-3.1415" max="3.1415" step="0.01" value="-0.7854" class="slide-control">
</graphics-element>

As you can see, things go horribly wrong quite quickly; even trying to approximate a quarter circle using a quadratic curve is a bad idea. An eighth of a turns might look okay, but how okay is okay? Let's apply some maths and find out. What we're interested in is how far off our on-curve coordinates are with respect to a circular arc, given a specific start and end angle. We'll be looking at how much space there is between the circular arc, and the quadratic curve's midpoint.

We start out with our start and end point, and for convenience we will place them on a unit circle (a circle around 0,0 with radius 1), at some angle *φ*:

\[
  S = \begin{pmatrix} 1 \\ 0 \end{pmatrix} \ , \ \  E = \begin{pmatrix} cos(φ) \\ sin(φ) \end{pmatrix}
\]

What we want to find is the intersection of the tangents, so we want a point C such that:

\[
  C = S + a \cdot \begin{pmatrix} 0 \\ 1 \end{pmatrix} \ , \ \ C = E + b \cdot \begin{pmatrix} -sin(φ) \\ cos(φ) \end{pmatrix}
\]

i.e. we want a point that lies on the vertical line through S (at some distance *a* from S) and also lies on the tangent line through E (at some distance *b* from E). Solving this gives us:

\[
  \left\{ \begin{array}{l}
    C_x = 1 = cos(φ) + b \cdot -sin(φ)\\
    C_y = a = sin(φ) + b \cdot cos(φ)
  \end{array} \right.
\]

First we solve for *b*:

\[
  \begin{array}{l}
    1 = cos(φ) + b \cdot -sin(φ) \ → \
    1 - cos(φ) = -b \cdot sin(φ) \ → \
    -1 + cos(φ) = b \cdot sin(φ)
  \end{array}
\]

which yields:

\[
  b = \frac{cos(φ)-1}{sin(φ)}
\]

which we can then substitute in the expression for *a*:

\[
  \begin{aligned}
    a &= sin(φ) + b \cdot cos(φ) \\
    .. &= sin(φ) + \frac{-1 + cos(φ)}{sin(φ)} \cdot cos(φ) \\
    .. &= sin(φ) + \frac{-cos(φ) + cos^2(φ)}{sin(φ)} \\
    .. &= \frac{sin^2(φ) + cos^2(φ) - cos(φ)}{sin(φ)} \\
    a &= \frac{1 - cos(φ)}{sin(φ)}
  \end{aligned}
\]

A quick check shows that plugging these values for *a* and *b* into the expressions for C<sub>x</sub> and C<sub>y</sub> give the same x/y coordinates for both "*a* away from A" and "*b* away from B", so let's continue: now that we know the coordinate values for C, we know where our on-curve point T for *t=0.5* (or angle φ/2) is, because we can just evaluate the Bézier polynomial, and we know where the circle arc's actual point P is for angle φ/2:

\[
  P_x = cos(\frac{φ}{2}) \ , \ \  P_y = sin(\frac{φ}{2})
\]

We compute T, observing that if *t=0.5*, the polynomial values (1-t)², 2(1-t)t, and t² are 0.25, 0.5, and 0.25 respectively:

\[
  T = \frac{1}{4}S + \frac{2}{4}C + \frac{1}{4}E = \frac{1}{4}(S + 2C + E)
\]

Which, worked out for the x and y components, gives:

\[
  \begin{array}{l}
    \left\{\begin{aligned}
    T_x &= \frac{1}{4}(3 + cos(φ))\\
    T_y &= \frac{1}{4}\left(\frac{2-2cos(φ)}{sin(φ)} + sin(φ)\right)
         = \frac{1}{4}\left(2tan\left(\frac{φ}{2}\right) + sin(φ)\right)
    \end{aligned}\right.
  \end{array}
\]

And the distance between these two is the standard Euclidean distance:

\[
  \begin{aligned}
    d_x(φ) &= T_x - P_x = \frac{1}{4}(3 + cos(φ)) - cos(\frac{φ}{2}) = 2sin^4\left(\frac{φ}{4}\right) \ , \\
    d_y(φ) &= T_y - P_y = \frac{1}{4}\left(2tan\left(\frac{φ}{2}\right) + sin(φ)\right) - sin(\frac{φ}{2}) \ , \\
    &⇓\\
    d(φ) &= \sqrt{d^2_x + d^2_y} = \ ... \  = 2sin^4(\frac{φ}{4})\sqrt{\frac{1}{cos^2(\frac{φ}{2})}}
  \end{aligned}
\]

So, what does this distance function look like when we plot it for a number of ranges for the angle φ, such as a half circle, quarter circle and eighth circle?

<table><tbody><tr><td>
  <img src="images/arc-q-pi.gif" height="190"/>
  plotted for 0 ≤ φ ≤ π:
</td><td>
  <img src="images/arc-q-pi2.gif" height="187"/>
  plotted for 0 ≤ φ ≤ ½π:
</td><td>
  <a href="https://www.wolframalpha.com/input/?i=plot+sqrt%28%281%2F4+*+%28sin%28x%29+%2B+2tan%28x%2F2%29%29+-+sin%28x%2F2%29%29%5E2+%2B+%282sin%5E4%28x%2F4%29%29%5E2%29+for+0+%3C%3D+x+%3C%3D+pi%2F4">
    <img src="images/arc-q-pi4.gif" height="174"/>
  </a>
  plotted for 0 ≤ φ ≤ ¼π:
</td></tr></tbody></table>

We now see why the eighth circle arc looks decent, but the quarter circle arc doesn't: an error of roughly 0.06 at *t=0.5* means we're 6% off the mark... we will already be off by one pixel on a circle with pixel radius 17. Any decent sized quarter circle arc, say with radius 100px, will be way off if approximated by a quadratic curve! For the eighth circle arc, however, the error is only roughly 0.003, or 0.3%, which explains why it looks so close to the actual eighth circle arc. In fact, if we want a truly tiny error, like 0.001, we'll have to contend with an angle of (rounded) 0.593667, which equates to roughly 34 degrees. We'd need 11 quadratic curves to form a full circle with that precision! (technically, 10 and ten seventeenth, but we can't do partial curves, so we have to round up). That's a whole lot of curves just to get a shape that can be drawn using a simple function!

In fact, let's flip the function around, so that if we plug in the precision error, labelled ε, we get back the maximum angle for that precision:

\[
  φ = 4 \cdot arccos \left(\frac{\sqrt{2+ε-\sqrt{ε(2+ε)}}}{\sqrt{2}}\right)
\]

And frankly, things are starting to look a bit ridiculous at this point, we're doing way more maths than we've ever done, but thankfully this is as far as we need the maths to take us: If we plug in the precisions 0.1, 0.01, 0.001 and 0.0001 we get the radians values 1.748, 1.038, 0.594 and 0.3356; in degrees, that means we can cover roughly 100 degrees (requiring four curves), 59.5 degrees (requiring six curves), 34 degrees (requiring 11 curves), and 19.2 degrees (requiring a whopping nineteen curves).

The bottom line? **Quadratic curves are kind of lousy** if you want circular (or elliptical, which are circles that have been squashed in one dimension) curves. We can do better, even if it's just by raising the order of our curve once. So let's try the same thing for cubic curves.
