# Circles and cubic Bézier curves

In the previous section we tried to approximate a circular arc with a quadratic curve, and it mostly made us unhappy. Cubic curves are much better suited to this task, so what do we need to do?

For cubic curves, we basically want the curve to pass through three points on the circle: the start point, the mid point at "angle/2", and the end point at "angle". We then also need to make sure the control points are such that the start and end tangent lines line up with the circle's tangent lines at the start and end point.

The first thing we can do is "guess" what the curve should look like, based on the previously outlined curve-through-three-points procedure. This will give use a curve with correct start, mid and end points, but possibly incorrect derivatives at the start and end, because the control points might not be in the right spot. We can then slide the control points along the lines that connect them to their respective end point, until they effect the corrected derivative at the start and end points.  However, if you look back at the section on fitting curves through three points, the rules used were such that they optimized for a near perfect hemisphere, so using the same guess won't be all that useful: guessing the solution based on knowing the solution is not really guessing.

So have a graphical look at a "bad" guess versus the true fit, where we'll be using the bad guess and the description in the second paragraph to derive the maths for the true fit:

<graphics-element title="Cubic Bézier arc approximation" width="400" height="400" src="./arc-approximation.js">
  <input type="range" min="-3.1415" max="3.1415" step="0.01" value="-0.7854" class="slide-control">
</graphics-element>

We see two curves here; in blue, our "guessed" curve and its control points, and in grey/black, the true curve fit, with proper control points that were shifted in, along line between our guessed control points, such that the derivatives at the start and end points are correct.

We can already see that cubic curves are a lot better than quadratic curves, and don't look all that wrong until we go well past a quarter circle; ⅜th starts to hint at problems, and half a circle has an obvious "gap" between the real circle and the cubic approximation. Anything past that just looks plain ridiculous... but quarter curves actually look pretty okay!

So, maths time again: how okay is "okay"? Let's apply some more maths to find out.

Unlike for the quadratic curve, we can't use <i>t=0.5</i> as our reference point because by its very nature it's one of the three points that are actually guaranteed to lie on the circular curve. Instead, we need a different <i>t</i> value. If we run some analysis on the curve we find that the actual <i>t</i> value at which the curve is furthest from what it should be is 0.211325 (rounded), but we don't know "why", since finding this value involves root-finding, and is nearly impossible to do symbolically without pages and pages of math just to express one of the possible solutions.

So instead of walking you through the derivation for that value, let's simply take that <i>t</i> value and see what the error is for circular arcs with an angle ranging from 0 to 2π:

<table><tbody><tr><td>
  <img src="images/arc-c-2pi.gif" height="187"/>
  plotted for 0 ≤ φ ≤ 2π:
</td><td>
  <img src="images/arc-c-pi.gif" height="187"/>
  plotted for 0 ≤ φ ≤ π:
</td><td>
  <img src="images/arc-c-pi2.gif" height="187"/>
  plotted for 0 ≤ φ ≤ ½π:
</td></tr></tbody></table>

We see that cubic Bézier curves are much better when it comes to approximating circular arcs, with an error of less than 0.027 at the two "bulge" points for a quarter circle (which had an error of 0.06 for quadratic curves at the mid point), and an error near 0.001 for an eighth of a circle, so we're getting less than half the error for a quarter circle, or: at a slightly lower error, we're getting twice the arc. This makes cubic curves quite useful!

In fact, the precision of a cubic curve at a quarter circle is considered "good enough" by so many people that it's generally considered "just fine" to use four cubic Bézier curves to fake a full circle when no circle primitives are available; generally, people won't notice that it's not a real circle unless you also happen to overlay an actual circle, so that the difference becomes obvious.

So with the error analysis out of the way, how do we actually compute the coordinates needed to get that "true fit" cubic curve? The first observation is that we already know the start and end points, because they're the same as for the quadratic attempt:

\[ S = \begin{pmatrix} 1 \\ 0 \end{pmatrix} \ , \ \  E = \begin{pmatrix} cos(φ) \\ sin(φ) \end{pmatrix} \]

But we now need to find two control points, rather than one. If we want the derivatives at the start and end point to match the circle, then the first control point can only lie somewhere on the vertical line through S, and the second control point can only lie somewhere on the line tangent to point E, which means:

\[
  C_1 = S + a \cdot \begin{pmatrix} 0 \\ 1 \end{pmatrix}
\]

where "a" is some scaling factor we'll need to find the expression for, and:

\[
  C_2 = E + a \cdot \begin{pmatrix} sin(φ) \\ cos(φ) \end{pmatrix}
\]

using the same scaling factor, because circular arcs are symmetrical, so our approximation will need to be symmetrical, too.

Starting with this information, we slowly maths our way to success, but I won't lie: the maths for this is pretty trig-heavy, and it's easy to get lost if you remember (or know!) some of the core trigonometric identities, so if you just want to see the final result just skip past the next section!

<div class="note">

## Let's do this thing.

Unlike for the quadratic case, we need some more information in order to compute <i>a</i> and <i>b</i>, since they're no longer dependent variables. First, we observe that the curve is symmetrical, so whatever values we end up finding for C<sub>1</sub> will apply to C<sub>2</sub> as well (rotated along its tangent), so we'll focus on finding the location of C<sub>1</sub> only. So here's where we do something that you might not expect: we're going to ignore for a moment, because we're going to have a much easier time if we just solve this problem with geometry first, then move to calculus to solve a much simpler problem.

If we look at the triangle that is formed between our starting point, or initial guess C<sub>1</sub> and our real C<sub>1</sub>, there's something funny going on: if we treat the line {start,guess} as our opposite side, the line {guess,real} as our adjacent side, with {start,real} our hypotenuse, then the angle for the corner hypotenuse/adjacent is half that of the arc we're covering. Try it: if you place the end point at a quarter circle (pi/2, or 90 degrees), the angle in our triangle is half a quarter (pi/4, or 45 degrees). With that knowledge, and a knowledge of what the length of any of our lines segments are (as a function), we can determine where our control points are, and thus have everything we need to find the error distance function. Of the three lines, the one we can easiest determine is {start,guess}, so let's find out what the guessed control point is. Again geometrically, because we have the benefit of an on-curve <i>t=0.5</i> value.

The distance from our guessed point to the start point is exactly the same as the projection distance we looked at earlier. Using <i>t=0.5</i> as our point "B" in the "A,B,C" projection, then we know the length of the line segment {C,A}, since it's d<sub>1</sub> = {A,B} + d<sub>2</sub> = {B,C}:

\[
  ||{A,C}|| = d_2 + d_1 = d_2 + d_2 \cdot ratio_3 \left(\frac{1}{2}\right) = d_2 + \frac{1}{3}d_2 = \frac{4}{3}d_2
\]

So that just leaves us to find the distance from <i>t=0.5</i> to the baseline for an arbitrary angle φ, which is the distance from the centre of the circle to our <i>t=0.5</i> point, minus the distance from the centre to the line that runs from start point to end point. The first is the same as the point P we found for the quadratic curve:

\[
  P_x = cos(\frac{φ}{2}) \ , \ \  P_y = sin(\frac{φ}{2})
\]

And the distance from the origin to the line start/end is another application of angles, since the triangle {origin,start,C} has known angles, and two known sides. We can find the length of the line {origin,C}, which lets us trivially compute the coordinate for C:

\[
  \begin{array}{l}
    l = cos(\frac{φ}{2}) \ , \\
    \left\{\begin{array}{l}
      C_x = l \cdot cos\left(\frac{φ}{2}\right) = cos^2\left(\frac{φ}{2}\right)\ , \\
      C_y = l \cdot sin\left(\frac{φ}{2}\right) = cos(\frac{φ}{2}) \cdot sin\left(\frac{φ}{2}\right)\ , \\
    \end{array}\right.
  \end{array}
\]

With the coordinate C, and knowledge of coordinate B, we can determine coordinate A, and get a vector that is identical to the vector {start,guess}:

\[
  \left\{\begin{array}{l}
    B_x - C_x = cos\left(\frac{φ}{2}\right) - cos^2\left(\frac{φ}{2}\right) \\
    B_y - C_y = sin\left(\frac{φ}{2}\right) - cos(\frac{φ}{2}) \cdot sin\left(\frac{φ}{2}\right)
              = sin\left(\frac{φ}{2}\right) - \frac{sin(φ)}{2}
  \end{array}\right.
\]

\[
  \left\{\begin{array}{l}
    \vec{v}_x = \{C,A\}_x = \frac{4}{3} \cdot (B_x - C_x) \\
    \vec{v}_y = \{C,A\}_y = \frac{4}{3} \cdot (B_y - C_y)
  \end{array}\right.
\]

Which means we can now determine the distance {start,guessed}, which is the same as the distance {C,A}, and use that to determine the vertical distance from our start point to our C<sub>1</sub>:

\[
  \left\{\begin{array}{l}
    C_{1x} = 1 \\
    C_{1y} = \frac{d}{sin\left(\frac{φ}{2}\right)}
           = \frac{\sqrt{\vec{v}^2_x + \vec{v}^2_y}}{sin\left(\frac{φ}{2}\right)}
           = \frac{4}{3} tan \left( \frac{φ}{4} \right)
  \end{array}\right.
\]

And after this tedious detour to find the coordinate for C<sub>1</sub>, we can find C<sub>2</sub> fairly simply, since it's lies at distance -C<sub>1y</sub> along the end point's tangent:

\[
  \begin{array}{l}
    E'_x = -sin(φ) \ ,\\
    E'_y = cos(φ) \ , \\
    ||E'|| = \sqrt{ (-sin(φ))^2 + cos^2(φ)} = 1 \ , \\
    \\
    \left\{\begin{array}{l}
      C_2x = E_x - C_{1y} \cdot \frac{E_x'}{||E'||}
           = cos(φ) + C_{1y} \cdot sin(φ)
           = cos(φ) + \frac{4}{3} tan \left( \frac{φ}{4} \right) \cdot sin(φ) \\
      C_2y = E_y - C_{1y} \cdot \frac{E_y'}{||E'||}
           = sin(φ) - C_{1y} \cdot cos(φ)
           = sin(φ) - \frac{4}{3} tan \left( \frac{φ}{4} \right) \cdot cos(φ)
    \end{array}\right.
  \end{array}
\]

And that's it, we have all four points now for an approximation of an arbitrary circular arc with angle φ.

</div>

So, to recap, given an angle φ, the new control coordinates are:

\[
  C_1 = \left [ \begin{matrix}
    1 \\
    f
  \end{matrix} \right ],\ with\ f = \frac{4}{3} tan \left( \frac{φ}{4} \right)
\]

and

\[
  C_2 = \left [ \begin{matrix}
    cos(φ) + f \cdot sin(φ) \\
    sin(φ) - f \cdot cos(φ)
  \end{matrix} \right ],\ with\ f = \frac{4}{3} tan \left( \frac{φ}{4} \right)
\]

And, because the "quarter curve" special case comes up so incredibly often, let's look at what these new control points mean for the curve coordinates of a quarter curve, by simply filling in φ = π/2:

\[
  \begin{array}{l}
    S = (1, 0) \ , \
    C_1 = \left ( 1, 4 \frac{\sqrt{2}-1}{3} \right ) \ , \
    C_2 = \left ( 4 \frac{\sqrt{2}-1}{3} , 1 \right ) \ , \
    E = (0, 1)
  \end{array}
\]

Which, in decimal values, rounded to six significant digits, is:

\[
  \begin{array}{l}
    S = (1, 0) \ , \
    C_1 = (1, 0.55228) \ , \
    C_2 = (0.55228 , 1) \ , \
    E = (0, 1)
  \end{array}
\]

Of course, this is for a circle with radius 1, so if you have a different radius circle, simply multiply the coordinate by the radius you need. And then finally, forming a full curve is now a simple a matter of mirroring these coordinates about the origin:

<graphics-element title="Cubic Bézier circle approximation" width="340" height="300" src="./circle.js"></graphics-element>
