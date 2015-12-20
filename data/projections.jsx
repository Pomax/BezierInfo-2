        <p>Say we have a Bézier curve and some point, not on the curve, of which we want to know which
        <i>t</i> value on the curve gives us an on-curve point closest to our off-curve point. Or: say
        we want to find the projection of a random point onto a curve. How do we do that?</p>

        <p>If the Bézier curve is of low enough order, we might be able to <a href="http://jazzros.blogspot.ca/2011/03/projecting-point-on-bezier-curve.html">work out the maths for how
        to do this</a>, and get a perfect <i>t</i> value back, but in general this is an incredibly hard
        problem and the easiest solution is, really, a numerical approach again. We'll be finding our
        ideal <i>t</i> value using a <a href="https://en.wikipedia.org/wiki/Binary_search_algorithm">binary
        search</a>. First, we do a coarse distance-check based on <i>t</i> values associated with the
        curve's "to draw" coordinates (using a lookup table, or LUT). This is pretty fast. Then we run
        this algorithm:</p>

        <ol>
          <li>with the <i>t</i> value we found, start with some small interval around <i>t</i>
          (1/length_of_LUT on either side is a reasonable start),</li>
          <li>if the distance to <i>t ± interval/2</i> is larger than the distance to <i>t</i>,
          try again with the interval reduced to half its original length.</li>
          <li>if the distance to <i>t ± interval/2</i> is smaller than the distance to <i>t</i>,
          replace <i>t</i> with the smaller-distance value.</li>
          <li>after reducing the interval, or changing <i>t</i>, go back to step 1.</li>
        </ol>

        <p>We keep repeating this process until the interval is small enough to claim the difference
        in precision found is irrelevant for the purpose we're trying to find <i>t</i> for. In this
        case, I'm arbitrarily fixing it at 0.0001.</p>

        <p>The following graphic demonstrates the result of this procedure.Simply move the cursor
        around, and if it does not lie on top of the curve, you will see a line that projects the
        cursor onto the curve based on an iteratively found "ideal" <i>t</i> value.</p>

        <textarea class="sketch-code" data-sketch-preset="simple" data-sketch-title="Projecting a point onto a Bézier curve">
        void setupCurve() {
          int d = dim - 2*pad;
          int order = 10;
          int[] c = {248,188, 218,294, 45,290, 12,236, 14,82, 186,177, 221,90, 18,156, 34,57, 198,18};
          Point[] points = new Point[c.length/2];
          for(int i=0, e=c.length; i<e; i+=2) {
            points[i/2] = new Point(c[i], c[i+1]);
          }
          curves.add(new BezierCurve(points));
          redrawOnMove();
        }

        void drawCurve(BezierCurve curve) {
          additionals();
          curve.draw();

          if(curve.over(mouseX,mouseY) == -1) {
            float t = curve.getPointProjection(new Point(mouseX, mouseY));
            Point p = curve.getPoint(t);
            stroke(255,0,0);
            line(mouseX, mouseY, p.x, p.y);
            fill(150,0,0);
            text("t ≈ " + (int(1000*t)/1000.0), p.x+10, p.y);
            text("p: "+mouseX+"/"+mouseY, mouseX+10, mouseY);
          }
        }</textarea>
