        <p>While quadratic curves are relatively simple curves to analyze, the same cannot be said of the cubic curve.
           As a curvature controlled by more than one control points, it exhibits all kinds of features like loops,
           cusps, odd colinear features, and up to two inflection points because the curvature can change direction
           up to three times. Now, knowing what kind of curve we're dealing with means that some algorithms can be
           run more efficiently than if we have to implement them as generic solvers, so is there a way to determine
           the curve type without lots of work?</p>

        <p>As it so happens, the answer is yes and the solution we're going to look at was presented by Maureen C. Stone
          from Xerox PARC and Tony D. deRose from the University of Washington in their joint paper
          <a href="http://graphics.pixar.com/people/derose/publications/CubicClassification/paper.pdf">"A Geometric
          Characterization of Parametric Cubic curves"</a>. It was published in 1989, and defines curves as having a
          "canonical" form (i.e. a form that all curves can be reduces to) from which we can immediately tell which
          features a curve will have. So how does it work?</p>

        <p>The first observation that makes things work is that if we have a cubic curve with four points, we can apply
          a linear transformation to these points so that three of the points end up on (0,0), (0,1) and (1,1), with the
          last point then being "somewhere". After applying that transformation, where that last point can then tell us
          what kind of curve we're dealing with. Specifically, we see the following breakdown:</p>

        <textarea class="sketch-code" data-sketch-preset="simple" data-sketch-title="The canonical curve map">
        PGraphics mapping;
        void setupCurve() {
          setupDefaultCubic();
          mapping = CanonicalLayout.create(sketch,width,height,width/5)
        }

        void drawCurve(BezierCurve curve) {
          image(mapping,0,0,width,height);
        }</textarea>

        <p>This is a fairly funky image, so let's see how it breaks down. We see the three fixed points at (0,0),
          (0,1) and (1,1), and then the fourth point is somewhere. Depending on where it is, our curve will have
          certain features. Namely, if the fourth point is...</p>

        <ol>
          <li>anywhere inside of the red zone, the curve will have a loop. We won't know <i>where</i> that loop
            is (in terms of <i>t</i> values), but we are guaranteed that there is one.</li>
          <li>on the edges of the red zone, we know the loop will be at <i>t</i>=0 or <i>t</i>=1, depending on
            whether it's on the long right edge or the short round right edge, respectively. If it's on the left
            edge, we know the curve has a cusp point rather than a loop.</li>
          <li>on the left of the red zone, the curve will have two inflections, meaning its curvature has two
            concave/convex switches.</li>
          <li>inside the green zone, the curve will have a single inflection, switching concave/convex once.</li>
          <li>on the right of the red zone, the curve will have no inflections, it'll just be a well-behaved arch.</li>
        </ol>

        <p>Of course, this map is fairly small, but the regions extend to infinity, with well defined boundaries.</p>

        <div class="note">
          <h3>Wait, where do those lines come from?</h3>

          <p>Without repeating the paper mentioned at the top of this section, the loop-boundaries come from
            rewriting the curve into canonical form, and then solving the formulae for which constraints must
            hold for which possible curve properties. In the paper these functions yield formulae for where
            you will find cusp points, or loops where we know t=0 or t=1, but those functions are derived
            for the full cubic expression, meaning they apply to t=-∞ to t=∞... For Bézier curves we only care
            about the "clipped interval" t=0 to t=1, so some of the properties that apply when you look at
            the curve over an infinite interval simply don't apply to the Bézier curve interval.</p>

          <p>The right bound for the loop region, indicating where the curve switches from "having inflections"
            to "having a loop", for the general cubic curve, is actually mirrored over x=1, but for Bézier curves
            this right half doesn't apply, so we don't need to pay attention to it. Similarly, the boundaries for
            t=0 and t=1 loops are also nice clean curves but get "cut off" when we only look at what the general
            curve does over the internval t=0 to t=1.</p>

          <p>For the full details, head over to the paper and read through sections 3 and 4. If you still remember
            your high school precalculus, you can probably follow along with this paper, although you might have
            to read it a few times before all the bits "click".</p>
        </div>

        <p>So now the question becomes: how do we manipulate our curve so that it fits this canonical form,
          with three fixed points, and one "free" point? Enter linear algerba. Don't worry, I'll be doing all
          the math for you, as well as show you what the effect is on our curves, but basically we're going
          to be using linear algebra, rather than calculus, because "it's way easier". Sometimes a calculus
          approach is very hard to work with, when the equivalent geometrical solution is super obvious.</p>

        <p>The approach is going to start with a curve that doesn't have all-colinear points (so we
          need to make sure the points don't all fall on a straight line), and then applying four graphics
          operations that you will probably have heard of: translation (moving all points by some fixed x-
          and y-distance), scaling (multiplying all points by some x and y scale factor), and shearing (an
          operation that turns rectangles into parallelograms).</p>

        <p>Step 1: we translate any curve by -p1.x and -p1.y, so that the curve starts at (0,0). We're going
          to make use of an interesting trick here, by pretending our 2D coordinates are 3D, with the <i>z</i>
          coordinate simply always being 1. This is an old trick in graphics to overcome the limitations of 2D
          transformations: without it, we can only turn (x,y) coordinates into new coordinates of the form
          (ax + by, cx + dy), which means we can't do translation, since that requires we end up with some kind
          of (x + a, y + b). If we add a bogus <i>z</i> coordinate that is always 1, then we can suddenly add
          arbitrary values. For example:</p>

        <p>\[
        \left [ \begin{array}
            01 & 0 & a \\\\
            0 & 1 & b \\\\
            0 & 0 & 1
          \end{array} \right ]
        \cdot
        \left [
          \begin{matrix}
            x \\\\
            y \\\\
            z=1
          \end{matrix}
        \right ]
        =
        \left [
          \begin{matrix}
            1 \cdot x + 0 \cdot y + a \cdot z \\\\
            0 \cdot x + 1 \cdot y + b \cdot z \\\\
            0 \cdot x + 0 \cdot y + 1 \cdot z
          \end{matrix}
        \right ]
        =
        \left [
          \begin{matrix}
            x + a \cdot 1 \\\\
            y + b \cdot 1 \\\\
            1 \cdot z
          \end{matrix}
        \right ]
        =
        \left [
          \begin{matrix}
            x + a \\\\
            y + b \\\\
            z=1
          \end{matrix}
        \right ]
        \]</p>

        <p>Sweet! <i>z</i> stays 1, so we can effectively ignore it entirely, but we added some plain values
          to our x and y coordinates. So, if we want to subtract p1.x and p1.y, we use:</p>

        <p>\[ T_1 =
        \left [ \begin{array}
            01 & 0 & -{P_1}_x \\\\
            0 & 1 & -{P_1}_y \\\\
            0 & 0 & 1
          \end{array} \right ]
        \cdot
        \left [
          \begin{matrix}
            x \\\\
            y \\\\
            1
          \end{matrix}
        \right ]
        =
        \left [
          \begin{matrix}
            1 \cdot x + 0 \cdot y - {P_1}_x \cdot 1 \\\\
            0 \cdot x + 1 \cdot y - {P_1}_y \cdot 1 \\\\
            0 \cdot x + 0 \cdot y + 1 \cdot 1
          \end{matrix}
        \right ]
        =
        \left [
          \begin{matrix}
            x - {P_1}_x \\\\
            y - {P_1}_y \\\\
            1
          \end{matrix}
        \right ]
        \]</p>

        <p>Running all our coordinates through this transformation gives a new set of coordinates, let's call those <b>U</b>, where the first coordinate lies on (0,0), and the rest is still somewhat free. Our next job is to make sure point 2 ends up lying on the <i>x=0</i> line, so what we want is a transformation matrix that, when we run it, subtracts <i>x</i> from whatever <i>x</i> we currently have. This is called <a href="https://en.wikipedia.org/wiki/Shear_matrix">shearing</a>, and the typical x-shear matrix and its transformation looks like this:</p>

        <p>\[
        \left [
          \begin{matrix}
            1 & S & 0 \\\\
            0 & 1 & 0 \\\\
            0 & 0 & 1
          \end{matrix}
        \right ]
        \cdot
        \left [
          \begin{matrix}
            x \\\\
            y \\\\
            1
          \end{matrix}
        \right ]
        =
        \left [
          \begin{matrix}
            x + S \cdot y \\\\
            y \\\\
            1
          \end{matrix}
        \right ]
        \]</p>

        <p>So we want some shearing value that, when multiplied by <i>y</i>, yields <i>-x</i>, so our x coordinate becomes zero. That value is simpy <i>-x/y</i>, because <i>-x/y * y = -x</i>. Done:</p>

        <p>\[ T_2 =
        \left [
          \begin{matrix}
            1 & -\frac{ {U_2}_x }{ {U_2}_y } & 0 \\\\
            0 & 1 & 0 \\\\
            0 & 0 & 1
          \end{matrix}
        \right ]
        \]</p>

        <p>Now, running this on all our points generates a new set of coordinates, let's call those V, which now have point 1 on (0,0) and point 2 on (0, some-value), and we wanted it at (0,1), so we need to [do some scaling](https://en.wikipedia.org/wiki/Scaling_%28geometry%29) to make sure it ends up at (0,1). Additionally, we want point 3 to end up on (1,1), so we can also scale x to make sure its x-coordinate will be 1 after we run the transform. That means we'll be x-scaling by 1/point3<sub>x</sub>, and y-scaling by point2<sub>y</sub>. This is really easy:</p>

        <p>\[ T_3 =
        \left [
          \begin{matrix}
            \frac{1}{ {V_3}_x } & 0 & 0 \\\\
            0 & \frac{1}{ {V_2}_y } & 0 \\\\
            0 & 0 & 1
          \end{matrix}
        \right ]
        \]</p>

        <p>Then, finally, this generates a new set of coordinates, let's call those W, of which point 1 lies on (0,0), point 2 lies on (0,1), and point three lies on (1, ...) so all that's left is to make sure point 3 ends up at (1,1) - but we can't scale! Point 2 is already in the right place, and y-scaling would move it out of (0,1) again, so our only option is to y-shear point three, just like how we x-sheared point 2 earlier. In this case, we do the same trick, but with `y/x` rather than `x/y` because we're not x-shearing but y-shearing. Additionally, we don't actually want to end up at zero (which is what we did before) so we need to shear towards an offset, in this case 1:</p>

        <p>\[ T_4 =
        \left [
          \begin{matrix}
            1 & 0 & 0 \\\\
            \frac{1 - {W_3}_y}{ {W_3}_x } & 1 & 0 \\\\
            0 & 0 & 1
          \end{matrix}
        \right ]
        \]</p>

        <p>And this generates our final set of four coordinates. Of these, we already know that points 1 through 3 are (0,0), (0,1) and (1,1), and only the last coordinate is "free". In fact, given any four starting coordinates, the resulting "transformation mapped" coordinate will be:</p>

        <p>\[
        mapped_4 = \left (
          \begin{matrix}
           x =  \left (
            \frac
            {
              -x_1 + x_4 - \frac{(-x_1+x_2)(-y_1+y_4)}{-y_1+y_2}
            }
            {
              -x_1+x_3-\frac{(-x_1+x_2)(-y_1+y_3)}{-y_1+y_2}
            }
            \right )
        \\\\
           y = \left (
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
            \right )
          \end{matrix}
        \right )
        \]</p>

        <p>That looks very complex, but notice that every coordinate value is being offset by the initial translation, and a lot of terms in there repeat: it's pretty easy to calculate this fast, since there's so much we can cache and reuse while we compute this mapped coordinate!</p>

        <p>First, let's just do that translation step as a "preprocessing" operation so we don't have to subtract the values all the time. What does that leave?</p>

        <p>\[
        ... = \left (
          \begin{matrix}
           x = \left (  x_4 - \frac{x_2 \cdot y_4}{y_2} \middle/ x_3-\frac{x_2 \cdot y_3}{y_2} \right )
        \\\\
           y =
            \frac{y_4}{y_2}
            +
            \left ( 1 - \frac{y_3}{y_2} \right )
            \cdot
            \left (  x_4 - \frac{x_2 \cdot y_4}{y_2} \middle/ x_3-\frac{x_2 \cdot y_3}{y_2} \right )
          \end{matrix}
        \right )
        \]</p>

        <p>Suddenly things look a lot simpler: the mapped x is fairly straight forward to compute, and we see that the mapped
          y actually contains the mapped x in its entirety, so we'll have that part already available when we need to evaluate
          it. In fact, let's pull out all those common factors to see just how simple this is:</p>

        <p>\[
        ... = \left (
          \begin{matrix}
           x = (x_4 - x_2 \cdot f_{42}) / ( x_3- x_2 \cdot f_{32} )
        \\\\
           y =
            f_{42}
            +
            \left ( 1 - f_{32} \right )
            \cdot
            x
          \end{matrix}
        \right ), f_{32} = \frac{y_3}{y_2}, f_{42} = \frac{y_4}{y_2}
        \]</p>

        <p>That's kind of super-simple to write out in code, I think you'll agree. Coding math tends to be easier than the formulae initially make it look!</p>

        <div class="note">
          <h3>How do you track all that?</h3>

          <p>Doing maths can be a pain, so whenever possible, I like to make computers do the work for me. Especially for things like this, I simply use <a href="http://www.wolfram.com/mathematica">Mathematica</a>. Tracking all this math by hand is insane, and we invented computers, literally, to do this for us. I have no reason to use pen and paper when I can write out what I want to do in a program, and have the program do the math for me. And real math, too, with symbols, not with numbers. In fact, <a href="http://pomax.github.io/gh-weblog/downloads/canonical-curve.nb">here's</a> the Mathematica notebook if you want to see how this works for yourself.</p>

          <p>Now, I know, you're thinking "but Mathematica is super expensive!" and that's true, it's <a href="http://www.wolfram.com/mathematica-home-edition">$295 for home use</a>, but it's <strong>also</strong> <a href="http://www.wolfram.com/raspberry-pi">free when you buy a $35 raspberry pi</a>. Obviously, I bought a raspberry pi, and I encourage you to do the same. With that, as long as you know what you want to <em>do</em>, Mathematica can just do it for you. And we don't have to be geniusses to work out what the maths looks like. That's what we have computers for.</p>
        </div>

        <p>So, let's write up a sketch that'll show us the canonical form for any curve drawn in blue, overlaid on our
          canonical map, so that we can immediately tell which features our curve must have, based on where the fourth
          coordinate is located on the map:</p>

        <textarea class="sketch-code" data-sketch-preset="twopanel" data-sketch-title="Canonical curve mapping">
        PGraphics mapping;
        float s;
        void setupCurve() {
          setupDefaultCubic();
          s = dim/5;
          mapping = CanonicalLayout.create(sketch,dim,dim,s);
        }

        void drawCurve(BezierCurve curve) { try {
          curve.draw();
          nextPanel();
          image(mapping,0,0,dim,dim);
          int w=dim/2, h=dim/2;
          translate(w,h);
          Point[] p = curve.points;
          Point np4 = CanonicalLayout.forwardTransform(p[0], p[1], p[2], p[3], s);
          bezier(0,0, 0,s, s,s, np4.x, np4.y);
          ellipse(np4.x, np4.y, 4, 4);
          String label = nf(np4.x/s,1,3) + "," + nf(np4.y/s,1,3);
          text(label, np4.x, np4.y);
        } catch(e) {}}</textarea>
