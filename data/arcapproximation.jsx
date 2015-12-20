        <p>Let's look at converting Bézier curves into sequences of circular arcs. We already saw in the
          section on circle approximation that this will never yield a perfect equivalent, but sometimes
          you need circular arcs, such as when you're working with fabrication machinery, or simple vector
          languages that understand lines and circles, but not much else.</p>

        <p>The approach is fairly simple: pick a starting point on the curve, and pick two points that are
          further along the curve. Determine the circle that goes through those three points, and see if
          it fits the part of the curve we're trying to approximate. Decent fit? Try spacing the points
          further apart. Bad fit? Try spacing the points closer together. Keep doing this until you've
          found the "good approximation/bad approximation" boundary, record the "good" arc, and then move
          the starting point up to overlap the end point we previously found. Rinse and repeat until we've
          covered the entire curve.</p>

        <p>So: step 1, how do we find a circle through three points? That part is actually really simple.
          You may remember (if you ever learned it!) that a line between two points on a circle is called
          a <a href="https://en.wikipedia.org/wiki/Chord_%28geometry%29">chord</a>, and one property of
          chords is that the line from the center of the chord, perpendicular to the chord, passes through
          the center of the circle. So: if we have have three points, we have two (different) chords, and
          consequently, two (different) lines that go from those chords through the center of the circle:
          find the centers of the chords, find the perpendicular lines, find the intersection of those lines,
          find the center of the circle that goes through all three points.</p>

        <textarea class="sketch-code" data-sketch-preset="simple" data-sketch-title="Finding a circle through three points">
        void setupCurve() {
          setupDefaultQuadratic();
        }

        void drawCurve(BezierCurve curve) {
          curve.drawPoints();
          CircleAbstractor ca = new CircleAbstractor(curve);
          Point[] p = curve.points;
          CircleAbstractor.Point cp = ca.getCCenter(p[0], p[1], p[2]);
          stroke(0,100);
          noFill();
          ellipse(cp.x, cp.y, cp.r*2, cp.r*2);
          ellipse(cp.x, cp.y, 5, 5);
          fill(0);
          text((int)cp.x+","+(int)cp.y, cp.x + 5, cp.y+5);

          stroke(200,0,0);
          line(cp.x, cp.y, (p[0].x+p[1].x)/2, (p[0].y+p[1].y)/2);
          line(p[0].x,p[0].y,p[1].x,p[1].y);

          stroke(0,0,255);
          line(cp.x, cp.y, (p[1].x+p[2].x)/2, (p[1].y+p[2].y)/2);
          line(p[2].x,p[2].y,p[1].x,p[1].y);
        }</textarea>

        <p>So, with the procedure on how to find a circle through three points, finding the arc through those points
          is straight-forward. Let's apply this to a Bezier curve:</p>

        <ul>
          <li>Start at <em>t=0</em></li>
          <li>Pick two points further down the curve at some value <em>m = t + n</em> and <em>e = t + 2n</em></li>
          <li>Find the arc that these points define</li>
          <li>Determine how close the found arc is to the curve:
            <ul>
              <li>Pick two additional points <em>e1 = t + n/2</em> and <em>e2 = t + n + n/2</em>.</li>
              <li>These points, if the arc is a good approximation of the curve interval chosen, should
                  lie <em>on</em> the circle, so their distance to the center of the circle should be the
                  same as the distance from any of the three other points to the center.</li>
              <li>For point points, determine the (absolute) error between the radius of the circle, and the
                <em>actual</em> distance from the center of the circle to the point on the curve.</li>
              <li>If this error is too high, we consider the arc bad, and try a smaller interval.</li>
            </ul>
          </li>
        </ul>

        <p>The result of this is shown in the next graphic: we start at a guaranteed failure: s=0, e=1. That's
          the entire curve. The midpoint is simply at <em>t=0.5</em>, and then we start performing a
          <a href="https://en.wikipedia.org/wiki/Binary_search_algorithm">Binary Search</a>.</p>

        <ol>
          <li>We start with {0, 0.5, 1}</li>
          <li>That'll fail, so we retry with the interval halved: {0, 0.25, 0.5}</li>
          <ul>
            <li>If that arc's good, we move back up by half distance: {0, 0.375, 0.75}.</li>
            <li>However, if the arc was still bad, we move <em>down</em> by half the distance: {0, 0.125, 0.25}.</li>
          </ul>
          <li>We keep doing this over and over until we have two arcs found in sequence of which the first arc is good, and
            the second arc is bad. When we find that pair, we've found the boundary between a good approximation and a
            bad approximation, and we pick the former</li>
        </ol>

        <p>The following graphic shows the result of this approach, with a default error threshold of 0.5, meaning that
          if an arc is off by a <em>combined</em> half pixel over both verification points, then we treat the arc as bad.
          This is an extremely simple error policy, but already works really well. Note that the graphic is still interactive,
          and you can use your '+' and '-' keys to increase to decrease the error threshold, to see what the effect
          of a smaller or larger error threshold is.</p>

        <textarea class="sketch-code" data-sketch-preset="simple" data-sketch-title="Arc approximation of a Bézier curve">
        void setupCurve() {
          setupDefaultCubic();
          offsetting();
          offset = 5;
        }

        void drawCurve(BezierCurve curve) {
          double threshold = 0.5;
          if (offset < 1) offset = 1;
          if (0 < offset && offset < 10) threshold = offset/10;
          else if (10 < offset && offset < 110) threshold = offset-10;
          else if (110 < offset) threshold = 100 + (offset-110)*10;

          curve.draw();
          CircleAbstractor ca = new CircleAbstractor(curve, threshold);
          stroke(255,0,0);
          fill(0,50);
          for (CircleAbstractor.Point c : ca.getCircles()) {
            arc(c.x, c.y, 2*c.r, 2*c.r, c.s, c.e);
            break;
          }
          fill(0);
          text("error threshold: "+ca.errorThreshold, 5, 15);
        }</textarea>

        <p>With that in place, all that's left now is to "restart" the procedure by treating the found arc's
          end point as the new to-be-determined arc's starting point, and using points further down the curve. We
          keep trying this until the found end point is for <em>t=1</em>, at which point we are done. Again,
          the following graphic allows for '+' and '-' key input to increase or decrease the error threshold,
          so you can see how picking a different threshold changes the number of arcs that are necessary to
          reasonably approximate a curve:</p>

        <textarea class="sketch-code" data-sketch-preset="simple" data-sketch-title="Arc approximation of a Bézier curve">
        void setupCurve() {
          setupDefaultCubic();
          offsetting();
          offset = 5;
        }

        void drawCurve(BezierCurve curve) {
          double threshold = 0.5;
          if (offset < 1) offset = 1;
          if (0 < offset && offset < 10) threshold = offset/10;
          else if (10 < offset && offset < 110) threshold = offset-10;
          else if (110 < offset) threshold = 100 + (offset-110)*10;

          CircleAbstractor ca = new CircleAbstractor(curve, threshold);
          stroke(255,0,0);
          fill(0,50);
          ArrayList<CircleAbstractor.Point> circles = ca.getCircles();
          for (CircleAbstractor.Point c : circles) {
            arc(c.x, c.y, 2*c.r, 2*c.r, c.s, c.e);
          }
          curve.drawControlLines();
          curve.drawPoints();
          fill(0);
          text("error threshold: "+ca.errorThreshold, 5, 15);
          text("Approximated the curve using " + circles.size() + " arcs.", 5, dim-5);
        }</textarea>

        <p>So... what is this good for? Obviously, If you're working with technologies that can't do curves,
          but can do lines and circles, then the answer is pretty straight-forward, but what else? There are
          some reasons why you might need this technique: using circular arcs means you can determine whether
          a coordinate lies "on" your curve really easily: simply compute the distance to each circular arc
          center, and if any of those are close to the arc radii, at an angle betwee the arc start and end:
          bingo, this point can be treated as lying "on the curve". Another benefit is that this approximation
          is "linear": you can almost trivially travel along the arcs at fixed speed. You can also trivially
          compute the arc length of the approximated curve (it's a bit like curve flattening). The only
          thing to bear in mind is that this is a lossy equivalence: things that you compute based on the
          approximation are guaranteed "off" by some small value, and depending on how much precision you
          need, arc approximation is either going to be super useful, or completely useless. It's up to you
          to decide which, based on your application!</p>
