        <p>For cubic curves the control points must be each other's mirror around the line running
        through the baseline midpoint, at a right angle, and again the derivatives at the start and
        end points must agree. Again we don't have altogether that much choice: there is only one
        pair of control points that guarantees correct derivatives for the start and end points,
        while also making the midpoint of the curve lie on top of the curve.</p>

        <p>In order to find a cubic curve, we first "guess" the curve, based on the previously outlined
        curve-through-three-points procedure. This will give use a curve with correct start, mid and
        end points, but incorrect derivatives for start and end, given the control points. We then
        slide the control points along the line that connects them until they effect the corrected
        derivative at the start and end points (you may remember that the derivative at the start
        is aligned with the line from start point to control point 1, and that the derivative at the
        end is aligned with the line from control point 2 to the end point).</p>

        <textarea class="sketch-code" data-sketch-preset="arcfitting" data-sketch-title="Cubic Bézier arc approximation">
        void setupCurve() { order = 3; }

        void checkConnect() {
          if(e < PI) { noConnect(); } else { connect(); }
        }

        void findArcFitting() {
          // guess the curve based on the start/mid/end points:
          Point p1 = new Point(dim/2 + dim/f2,dim/2),
                p2 = new Point(dim/2 + dim/f2*cos((s+e)/2), dim/2 + dim/f2*sin((s+e)/2)),
                p3 = new Point(dim/2 + dim/f2*cos(ax), dim/2 + dim/f2*sin(ay));
          BezierCurve guess = comp.generateCurve(3,p1,p2,p3);

          Point oc1 = guess.points[1];

          drawGuess(guess);

          // then, move the control points so that B'(0) and B'(1) are correct:
          Point c1 = comp.lli(new Point[]{
            guess.points[0],
            new Point(p1.x, p1.y+10),
            guess.points[1],
            guess.points[2],
          });

          // taking advantage of symmetry, we trivially know c2 now, too:
          dx = guess.points[1].x - c1.x;
          dy = guess.points[1].y - c1.y;
          Point c2 = new Point(guess.points[2].x + dx,
                               guess.points[2].y + dy);

          // replace, update, and draw.
          guess.points[1] = c1;
          guess.points[2] = c2;
          guess.update();
          guess.draw();

          float a = 0.211325;
          Point pa = guess.getPoint(a);
          pa.draw();
          guess.getPoint(1-a).draw();
        }</textarea>

        <p>We see two curves here; very faintly the "guessed" curve, and drawn normally, the proper curve
        with the control points shifted along the control line so that the derivatives at the start and end
        points are correct. With this, we can see that cubic curves are actually a lot better than quadratic
        curves, and don't look all that wrong until we go past a quarter circle; ⅜th starts to hint at
        problems, and half a circle has an obvious "gap" between the real circle and the cubic approximation.
        Anything past that just looks plain ridiculous... but quarter curves actually look pretty okay!
        Again, how okay is okay? Let's apply some more maths to find out.</p>

        <p>Unlike for the quadratic curve, we can't use <i>t=0.5</i> as our reference point because by its
        very nature it's one of the three points that are actually guaranteed to lie on the circular curve.
        Instead, we need a different <i>t</i> value. If we run some analysis on the curve we find that the
        actual <i>t</i> value at which the curve is furthest from what it should be is 0.211325 (rounded),
        but we don't know "why", since finding this value involves root-finding, and is nearly impossible
        to do symbolically without pages and pages of math just to express one of the possible solutions.</p>

        <p>So instead, let's simply take that <i>t</i> value and see what the error is for circular arcs
        with an angle ranging from 0 to 2π:</p>

        <table><tr><td>
          <p><img src="images/arc-c-2pi.gif"></p>
          <p>plotted for 0 ≤ φ ≤ 2π:</p>
        </td><td>
          <p><img src="images/arc-c-pi.gif"></p>
          <p>plotted for 0 ≤ φ ≤ π:</p>
        </td><td>
          <p><img src="images/arc-c-pi2.gif"></p>
          <p>plotted for 0 ≤ φ ≤ ½π:</p>
        </td></tr></table>

        <p>We see that cubic Bézier curves are much better when it comes to approximating circular arcs,
        with an error of less than 0.027 at the two "bulge" points for a quarter circle (which had an
        error of 0.06 for quadratic curves at the mid point), and an error near 0.001 for an eighth
        of a circle, so we're getting less than half the error for a quarter circle, or: at a slightly
        lower error, we're getting twice the arc. This makes cubic curves quite useful.
        In fact, the precision of a cubic curve at a quarter circle is considered "good enough" by many
        to justify using four cubic Bézier curves to fake a full circle when no circle primitives are
        available; generally, people will not notice it's not a real circle unless you overlay the
        actual circle so they can see the difference.</p>

        <p>So if we want to use a cubic Bézier curve, where do the curve's points go?
        The start and end point are the same as before:</p>

        <p>\[ S = \begin{pmatrix} 1 \\ 0 \end{pmatrix} \ , \ \  E = \begin{pmatrix} cos(φ) \\ sin(φ) \end{pmatrix} \]</p>

        <p>But we now need to find two control points, rather than one:</p>

        <p>\[
          C_1 = S + a \cdot \begin{pmatrix} 0 \\ 1 \end{pmatrix} \ \ , \ \
          C_2 = E + b \cdot \begin{pmatrix} -sin(φ) \\ cos(φ) \end{pmatrix}
        \]</p>

        <div class="note">
                <h2>Let's do this thing.</h2>
        
                <p>Unlike for the quadratic case, we need some more information in order to compute <i>a</i> and <i>b</i>,
                since they're no longer dependent variables. First, we observe that the curve is symmetrical, so whatever
                values we end up finding for C<sub>1</sub> will apply to C<sub>2</sub> as well (rotated along its tangent),
                so we'll focus on finding the location of C<sub>1</sub> only. So here's where we do something that you might
                not expect: we're going to ignore for a moment, because we're going to have a much easier time if we just
                solve this problem with geometry first, then move to calculus to solve a much simpler problem.</p>
        
                <p>If we look at the triangle that is formed between our starting point, or initial guess C<sub>1</sub>
                and our real C<sub>1</sub>, there's something funny going on: if we treat the line {start,guess} as
                our opposite side, the line {guess,real} as our adjacent side, with {start,real} our hypothenuse, then
                the angle for the corner hypothenuse/adjacent is half that of the arc we're covering. Try it: if you
                place the end point at a quarter circle (pi/2, or 90 degrees), the angle in our triangle is half a
                quarter (pi/4, or 45 degrees). With that knowledge, and a knowledge of what the length of any of
                our lines segments are (as a function), we can determine where our control points are, and thus have
                everything we need to find the error distance function. Of the three lines, the one we can easiest
                determine is {start,guess}, so let's find out what the guessed control point is. Again geometrically,
                because we have the benefit of an on-curve <i>t=0.5</i> value.</p>
        
                <p>The distance from our guessed point to the start point is exactly the same as the projection distance
                we looked at earlier. Using <i>t=0.5</i> as our point "B" in the "A,B,C" projection, then we know the
                length of the line segment {C,A}, since it's d<sub>1</sub> = {A,B} + d<sub>2</sub> = {B,C}:</p>
        
                <p>\[
                  ||{A,C}|| = d_2 + d_1 = d_2 + d_2 \cdot ratio_3 \left(\frac{1}{2}\right) = d_2 + \frac{1}{3}d_2 = \frac{4}{3}d_2
                \]</p>
        
                <p>So that just leaves us to find the distance from <i>t=0.5</i> to the baseline for an arbitrary
                angle φ, which is the distance from the centre of the circle to our <i>t=0.5</i> point, minus the
                distance from the centre to the line that runs from start point to end point. The first is the
                same as the point P we found for the quadratic curve:</p>
        
                <p>\[
                  P_x = cos(\frac{φ}{2}) \ , \ \  P_y = sin(\frac{φ}{2})
                \]</p>
        
                <p>And the distance from the origin to the line start/end is another application of angles,
                since the triangle {origin,start,C} has known angles, and two known sides. We can find
                the length of the line {origin,C}, which lets us trivially compute the coordinate for C:</p>
        
                <p>\[\begin{array}{l}
                  l = cos(\frac{φ}{2}) \ , \\
                  \left\{\begin{array}{l}
                    C_x = l \cdot cos\left(\frac{φ}{2}\right) = cos^2\left(\frac{φ}{2}\right)\ , \\
                    C_y = l \cdot sin\left(\frac{φ}{2}\right) = cos(\frac{φ}{2}) \cdot sin\left(\frac{φ}{2}\right)\ , \\
                  \end{array}\right.
                \end{array}\]</p>
        
                <p>With the coordinate C, and knowledge of coordinate B, we can determine coordinate A, and get a vector
                that is identical to the vector {start,guess}:</p>
        
                <p>\[\left\{\begin{array}{l}
                  B_x - C_x = cos\left(\frac{φ}{2}\right) - cos^2\left(\frac{φ}{2}\right) \\
                  B_y - C_y = sin\left(\frac{φ}{2}\right) - cos(\frac{φ}{2}) \cdot sin\left(\frac{φ}{2}\right)
                            = sin\left(\frac{φ}{2}\right) - \frac{sin(φ)}{2}
                \end{array}\right.\]</p>
        
                <p>\[\left\{\begin{array}{l}
                  \vec{v}_x = \{C,A\}_x = \frac{4}{3} \cdot (B_x - C_x) \\
                  \vec{v}_y = \{C,A\}_y = \frac{4}{3} \cdot (B_y - C_y)
                \end{array}\right.\]</p>
        
                <p>Which means we can now determine the distance {start,guessed}, which is the same as the distance
                  {C,A}, and use that to determine the vertical distance from our start point to our C<sub>1</sub>:</p>
        
                <p>\[\left\{\begin{array}{l}
                  C_{1x} = 1 \\
                  C_{1y} = \frac{d}{sin\left(\frac{φ}{2}\right)}
                         = \frac{\sqrt{\vec{v}^2_x + \vec{v}^2_y}}{sin\left(\frac{φ}{2}\right)}
                         = \frac{4}{3} tan \left( \frac{φ}{4} \right)
                \end{array}\right.\]</p>
        
                <p>And after this tedious detour to find the coordinate for C<sub>1</sub>, we can find C<sub>2</sub>
                fairly simply, since it's lies at distance -C<sub>1y</sub> along the end point's tangent:</p>
        
                <p>\[\begin{array}{l}
                  E'_x = -sin(φ) \ , \ E'_y = cos(φ) \ , \ ||E'|| = \sqrt{ (-sin(φ))^2 + cos^2(φ)} = 1 \ , \\
                  \left\{\begin{array}{l}
                    C_2x = E_x - C_{1y} \cdot \frac{E_x'}{||E'||}
                         = cos(φ) + C_{1y} \cdot sin(φ)
                         = cos(φ) + \frac{4}{3} tan \left( \frac{φ}{4} \right) \cdot sin(φ) \\
                    C_2y = E_y - C_{1y} \cdot \frac{E_y'}{||E'||}
                         = sin(φ) - C_{1y} \cdot cos(φ)
                         = sin(φ) - \frac{4}{3} tan \left( \frac{φ}{4} \right) \cdot cos(φ)
                  \end{array}\right.
                \end{array}\]</p>
        
                <p>And that's it, we have all four points now for an approximation of an arbitrary
                  circular arc with angle φ.</p>
        </div>

        <p>If you skipped the derivation for the "true" formula in the hopes of finding some useful
        information, then you're in luck: there are many possible angles with which to approximate
        sections of a circle, but by far the most common one is using one curve for each quarter
        circle, and it turns that while deriving the function to get the right value is a bit of a
        pain, the actual final values are pretty simple, even as precise functions. So, which
        values do we plug in?:</p>

        <p>\[\begin{array}{l}
          S = (1, 0) \ , \
          C_1 = \left ( 1, 4 \frac{\sqrt{2}-1}{3} \right ) \ , \
          C_2 = \left ( 4 \frac{\sqrt{2}-1}{3} , 1 \right ) \ , \
          E = (0, 1)
        \end{array}\]</p>

        <p>Which, in decimal values, rounded to six significant digits, is:</p>

        <p>\[\begin{array}{l}
          S = (1, 0) \ , \
          C_1 = (1, 0.55228) \ , \
          C_2 = (0.55228 , 1) \ , \
          E = (0, 1)
        \end{array}\]</p>
        
        <p>Note that this is for a circle with radius 1, so if you have a different radius circle,
        simply multiply the coordinate by the radius you need, and done! Finally, forming the
        full curve is  now a simple a matter of mirroring these coordinates about the origin:</p>

        <textarea class="sketch-code" data-sketch-preset="simple" data-sketch-title="Cubic Bézier circle approximation">
        void setupCurve() {
          setupDefaultCubic();
          noLabels();
        }

        void drawCurve(BezierCurve curve) {
          float ox = dim/2, oy = dim/2, r = dim/2.5;

          stroke(150);
          line(0,dim/2,dim,dim/2);
          line(dim/2,0,dim/2,dim);

          (new BezierCurve(new Point[]{
            new Point(ox + r*1,       oy + r*0),
            new Point(ox + r*1,       oy + r*0.55228),
            new Point(ox + r*0.55228, oy + r*1),
            new Point(ox + r*0,       oy + r*1)
          })).draw(color(255,0,0));

          (new BezierCurve(new Point[]{
            new Point(ox + r*0,       oy + r*1),
            new Point(ox - r*0.55228, oy + r*1),
            new Point(ox - r*1,       oy + r*0.55228),
            new Point(ox - r*1,       oy + r*0)
          })).draw();

          (new BezierCurve(new Point[]{
            new Point(ox - r*1,       oy + r*0),
            new Point(ox - r*1,       oy - r*0.55228),
            new Point(ox - r*0.55228, oy - r*1),
            new Point(ox + r*0,       oy - r*1)
          })).draw();

          (new BezierCurve(new Point[]{
            new Point(ox + r*0,       oy - r*1),
            new Point(ox + r*0.55228, oy - r*1),
            new Point(ox + r*1,       oy - r*0.55228),
            new Point(ox + r*1,       oy + r*0)
          })).draw();
        }</textarea>
