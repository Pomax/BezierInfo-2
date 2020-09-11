# The canonical form (for cubic curves)

While quadratic curves are relatively simple curves to analyze, the same cannot be said of the cubic curve. As a curvature is controlled by more than one control point, it exhibits all kinds of features like loops, cusps, odd colinear features, and as many as two inflection points because the curvature can change direction up to three times. Now, knowing what kind of curve we're dealing with means that some algorithms can be run more efficiently than if we have to implement them as generic solvers, so is there a way to determine the curve type without lots of work?

As it so happens, the answer is yes, and the solution we're going to look at was presented by Maureen C. Stone from Xerox PARC and Tony D. deRose from the University of Washington in their joint paper ["A Geometric Characterization of Parametric Cubic curves"](https://graphics.pixar.com/people/derose/publications/CubicClassification/paper.pdf). It was published in 1989, and defines curves as having a "canonical" form (i.e. a form that all curves can be reduced to) from which we can immediately tell what features a curve will have. So how does it work?

The first observation that makes things work is that if we have a cubic curve with four points, we can apply a linear transformation to these points such that three of the points end up on (0,0), (0,1) and (1,1), with the last point then being "somewhere". After applying that transformation, the location of that last point can then tell us what kind of curve we're dealing with. Specifically, we see the following breakdown:

<graphics-element title="The canonical curve map" width="400" height="400" src="./canonical.js"></graphics-element>

This is a fairly funky image, so let's see what the various parts of it mean...

We see the three fixed points at (0,0), (0,1) and (1,1). The various regions and boundaries indicate what property the original curve will have, if the fourth point is in/on that region or boundary. Specifically, if the fourth point is...

1. ...anywhere inside the red zone, but not on its boundaries, the curve will either be self-intersecting (yielding a loop). We won't know *where* it self-intersects (in terms of *t* values), but we are guaranteed that it does.

2. ...on the left (red) edge of the red zone, the curve will have a cusp. We again don't know _where_, but we know there is one. This edge is described by the function:

  \[
    y = \frac{-x^2 + 2x + 3}{4}, \{ x \leq 1 \}
  \]

3. ...on the almost circular, lower right (pink) edge, the curve's end point touches the curve, forming a loop. This edge is described by the function:

  \[
    y = \frac{\sqrt{3(4x - x^2)} - x}{2}, \{ 0 \leq x \leq 1 \}
  \]

4. ...on the top (blue) edge, the curve's start point touches the curve, forming a loop. This edge is described by the function:

  \[
    y = \frac{-x^2 + 3x}{3}, \{ x \leq 0 \}
  \]

5. ...inside the lower (green) zone, past `y=1`, the curve will have a single inflection (switching concave/convex once).

6. ...between the left and lower boundaries (below the cusp line but above the single-inflection line), the curve will have two inflections (switching from concave to convex and then back again, or from convex to concave and then back again).

7. ...anywhere on the right of self-intersection zone, the curve will have no inflections. It'll just be a simple arch.

Of course, this map is fairly small, but the regions extend to infinity, with well defined boundaries.

<div class="note">

### Wait, where do those lines come from?

Without repeating the paper mentioned at the top of this section, the loop-boundaries come from rewriting the curve into canonical form, and then solving the formulae for which constraints must hold for which possible curve properties. In the paper these functions yield formulae for where you will find cusp points, or loops where we know t=0 or t=1, but those functions are derived for the full cubic expression, meaning they apply to t=-∞ to t=∞... For Bézier curves we only care about the "clipped interval" t=0 to t=1, so some of the properties that apply when you look at the curve over an infinite interval simply don't apply to the Bézier curve interval.

The right bound for the loop region, indicating where the curve switches from "having inflections" to "having a loop", for the general cubic curve, is actually mirrored over x=1, but for Bézier curves this right half doesn't apply, so we don't need to pay attention to it. Similarly, the boundaries for t=0 and t=1 loops are also nice clean curves but get "cut off" when we only look at what the general curve does over the interval t=0 to t=1.

For the full details, head over to the paper and read through sections 3 and 4. If you still remember your high school precalculus, you can probably follow along with this paper, although you might have to read it a few times before all the bits "click".

</div>

So now the question becomes: how do we manipulate our curve so that it fits this canonical form, with three fixed points, and one "free" point? Enter linear algebra. Don't worry, I'll be doing all the math for you, as well as show you what the effect is on our curves, but basically we're going to be using linear algebra, rather than calculus, because "it's way easier". Sometimes a calculus approach is very hard to work with, when the equivalent geometrical solution is super obvious.

The approach is going to start with a curve that doesn't have all-colinear points (so we need to make sure the points don't all fall on a straight line), and then applying three graphics operations that you will probably have heard of: translation (moving all points by some fixed x- and y-distance), scaling (multiplying all points by some x and y scale factor), and shearing (an operation that turns rectangles into parallelograms).

Step 1: we translate any curve by -p1.x and -p1.y, so that the curve starts at (0,0). We're going to make use of an interesting trick here, by pretending our 2D coordinates are 3D, with the *z* coordinate simply always being 1. This is an old trick in graphics to overcome the limitations of 2D transformations: without it, we can only turn (x,y) coordinates into new coordinates of the form (ax + by, cx + dy), which means we can't do translation, since that requires we end up with some kind of (x + a, y + b). If we add a bogus *z* coordinate that is always 1, then we can suddenly add arbitrary values. For example:

\[
\left [ \begin{array}{ccc}
    1 & 0 & a \\
    0 & 1 & b \\
    0 & 0 & 1
  \end{array} \right ]
\cdot
\left [
  \begin{matrix}
    x \\
    y \\
    z=1
  \end{matrix}
\right ]
=
\left [
  \begin{matrix}
    1 \cdot x + 0 \cdot y + a \cdot z \\
    0 \cdot x + 1 \cdot y + b \cdot z \\
    0 \cdot x + 0 \cdot y + 1 \cdot z
  \end{matrix}
\right ]
=
\left [
  \begin{matrix}
    x + a \cdot 1 \\
    y + b \cdot 1 \\
    1 \cdot z
  \end{matrix}
\right ]
=
\left [
  \begin{matrix}
    x + a \\
    y + b \\
    z=1
  \end{matrix}
\right ]
\]

Sweet! *z* stays 1, so we can effectively ignore it entirely, but we added some plain values to our x and y coordinates. So, if we want to subtract p1.x and p1.y, we use:

\[
T_1 =
\left [ \begin{array}{ccc}
    1 & 0 & -{P_1}_x \\
    0 & 1 & -{P_1}_y \\
    0 & 0 & 1
  \end{array} \right ]
\cdot
\left [
  \begin{matrix}
    x \\
    y \\
    1
  \end{matrix}
\right ]
=
\left [
  \begin{matrix}
    1 \cdot x + 0 \cdot y - {P_1}_x \cdot 1 \\
    0 \cdot x + 1 \cdot y - {P_1}_y \cdot 1 \\
    0 \cdot x + 0 \cdot y + 1 \cdot 1
  \end{matrix}
\right ]
=
\left [
  \begin{matrix}
    x - {P_1}_x \\
    y - {P_1}_y \\
    1
  \end{matrix}
\right ]
\]

Running all our coordinates through this transformation gives a new set of coordinates, let's call those **U**, where the first coordinate lies on (0,0), and the rest is still somewhat free. Our next job is to make sure point 2 ends up lying on the *x=0* line, so what we want is a transformation matrix that, when we run it, subtracts *x* from whatever *x* we currently have. This is called [shearing](https://en.wikipedia.org/wiki/Shear_matrix), and the typical x-shear matrix and its transformation looks like this:

\[
\left [
  \begin{matrix}
    1 & S & 0 \\
    0 & 1 & 0 \\
    0 & 0 & 1
  \end{matrix}
\right ]
\cdot
\left [
  \begin{matrix}
    x \\
    y \\
    1
  \end{matrix}
\right ]
=
\left [
  \begin{matrix}
    x + S \cdot y \\
    y \\
    1
  \end{matrix}
\right ]
\]

So we want some shearing value that, when multiplied by *y*, yields *-x*, so our x coordinate becomes zero. That value is simply *-x/y*, because *-x/y * y = -x*. Done:

\[
T_2 =
\left [
  \begin{matrix}
    1 & -\frac{ {U_2}_x }{ {U_2}_y } & 0 \\
    0 & 1 & 0 \\
    0 & 0 & 1
  \end{matrix}
\right ]
\]

Now, running this on all our points generates a new set of coordinates, let's call those **V**, which now have point 1 on (0,0) and point 2 on (0, some-value), and we wanted it at (0,1), so we need to [do some scaling](https://en.wikipedia.org/wiki/Scaling_%28geometry%29) to make sure it ends up at (0,1). Additionally, we want point 3 to end up on (1,1), so we can also scale x to make sure its x-coordinate will be 1 after we run the transform. That means we'll be x-scaling by 1/point3<sub>x</sub>, and y-scaling by point2<sub>y</sub>. This is really easy:

\[
T_3 =
\left [
  \begin{matrix}
    \frac{1}{ {V_3}_x } & 0 & 0 \\
    0 & \frac{1}{ {V_2}_y } & 0 \\
    0 & 0 & 1
  \end{matrix}
\right ]
\]

Then, finally, this generates a new set of coordinates, let's call those W, of which point 1 lies on (0,0), point 2 lies on (0,1), and point three lies on (1, ...) so all that's left is to make sure point 3 ends up at (1,1) - but we can't scale! Point 2 is already in the right place, and y-scaling would move it out of (0,1) again, so our only option is to y-shear point three, just like how we x-sheared point 2 earlier. In this case, we do the same trick, but with `y/x` rather than `x/y` because we're not x-shearing but y-shearing. Additionally, we don't actually want to end up at zero (which is what we did before) so we need to shear towards an offset, in this case 1:

\[
T_4 =
\left [
  \begin{matrix}
    1 & 0 & 0 \\
    \frac{1 - {W_3}_y}{ {W_3}_x } & 1 & 0 \\
    0 & 0 & 1
  \end{matrix}
\right ]
\]

And this generates our final set of four coordinates. Of these, we already know that points 1 through 3 are (0,0), (0,1) and (1,1), and only the last coordinate is "free". In fact, given any four starting coordinates, the resulting "transformation mapped" coordinate will be:

\[
mapped_4 = \left (
  \begin{matrix}
  x \\
  y
  \end{matrix}
\right ) = \left (
  \begin{matrix}
    \frac
    {
      -x_1 + x_4 - \frac{(-x_1+x_2)(-y_1+y_4)}{-y_1+y_2}
    }
    {
      -x_1+x_3-\frac{(-x_1+x_2)(-y_1+y_3)}{-y_1+y_2}
    }
\\
    \frac{(-y_1+y_4)}{-y_1+y_2}
    +
    \frac
    {
      \left ( 1 - \frac{-y_1+y_3}{-y_1+y_2} \right )
      \left ( -x_1 + x_4 - \frac{(-x_1+x_2)(-y_1+y_4)}{-y_1+y_2} \right )
    }
    {
      -x_1+x_3-\frac{(-x_1+x_2)(-y_1+y_3)}{-y_1+y_2}
    }
  \end{matrix}
\right )
\]

Okay, well, that looks plain ridiculous, but: notice that every coordinate value is being offset by the initial translation, and also notice that _a lot_ of terms in that expression are repeated. Even though the maths looks crazy as a single expression, we can just pull this apart a little and end up with an easy-to-calculate bit of code!

First, let's just do that translation step as a "preprocessing" operation so we don't have to subtract the values all the time. What does that leave?

\[
... = \left (
  \begin{matrix}
   x_4 - \frac{x_2 \cdot y_4}{y_2} / x_3-\frac{x_2 \cdot y_3}{y_2}
\\
\\
    \frac{y_4}{y_2}
    +
    \left ( 1 - \frac{y_3}{y_2} \right )
    \cdot
    \left (  x_4 - \frac{x_2 \cdot y_4}{y_2} / x_3-\frac{x_2 \cdot y_3}{y_2} \right )
  \end{matrix}
\right ) = \left (
  \begin{matrix}
   x_{43}
\\
\\
    \frac{y_4}{y_2}
    +
    x_{43}
    \left ( 1 - \frac{y_3}{y_2} \right )
  \end{matrix}
\right ),\textit{ where } x_{43} = \left (
  x_4 - \frac{x_2 \cdot y_4}{y_2} \middle / x_3-\frac{x_2 \cdot y_3}{y_2}
\right )
\]

Suddenly things look a lot simpler: the mapped x is fairly straight forward to compute, and we see that the mapped y actually contains the mapped x in its entirety, so we'll have that part already available when we need to evaluate it. In fact, let's pull out all those common factors to see just how simple this is:

\[
... = \left (
  \begin{matrix}
   x_{43}
\\
\\
    y_{42}
    +
    x_{43}
    \left ( 1 - y_{32} \right )
  \end{matrix}
\right ), \textit{ where } x_{43} = \left (
  \frac{x_4 - x_2 \cdot y_{42}}{x_3 - x_2 \cdot y_{32}}
\right ), \textit{ } y_{42} = \frac{y_4}{y_2}, \textit{ and } y_{32} = \frac{y_3}{y_2}
\]

That's kind of super-simple to write out in code, I think you'll agree. Coding math tends to be easier than the formulae initially make it look!

<div class="note">

### How do you track all that?

Doing maths can be a pain, so whenever possible, I like to make computers do the work for me. Especially for things like this, I simply use [Mathematica](https://www.wolfram.com/mathematica/). Tracking all this math by hand is insane, and we invented computers, literally, to do this for us. I have no reason to use pen and paper when I can write out what I want to do in a program, and have the program do the math for me. And real math, too, with symbols, not with numbers. In fact, [here's](https://pomax.github.io/gh-weblog-2/downloads/canonical-curve.nb) the Mathematica notebook if you want to see how this works for yourself.

Now, I know, you're thinking "but Mathematica is super expensive!" and that's true, it's [$344 for home use, up from $295 when I original wrote this](https://www.wolfram.com/mathematica-home-edition/), but it's **also** [free when you buy a $35 raspberry pi](https://www.wolfram.com/raspberry-pi/). Obviously, I bought a raspberry pi, and I encourage you to do the same. With that, as long as you know what you want to *do*, Mathematica can just do it for you. And we don't have to be geniuses to work out what the maths looks like. That's what we have computers for.

</div>

So, let's write up a sketch that'll show us the canonical form for any curve drawn in blue, overlaid on our canonical map, so that we can immediately tell which features our curve must have, based on where the fourth coordinate is located on the map:

<graphics-element title="A cubic curve mapped to canonical form" width="800" height="400" src="./interactive.js"></graphics-element>
