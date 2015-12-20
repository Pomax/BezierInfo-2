        <p>What if we want to do graduated offsetting, starting at some distance <i>s</i> but ending
        at some other distance <i>e</i>? well, if we can compute the length of a curve (which we can
        if we use the Legendre-Gauss quadrature approach) then we can also determine how far "along the
        line" any point on the curve is. With that knowledge, we can offset a curve so that its offset
        curve is not uniformly wide, but graduated between with two different offset widths at the
        start and end.</p>

        <p>Like normal offsetting we cut up our curve in sub-curves, and then check at which distance
        along the original curve each sub-curve starts and ends, as well as to which point on the curve
        each of the control points map. This gives us the distance-along-the-curve for each interesting
        point in the sub-curve. If we call the total length of all sub-curves seen prior to seeing "the\
        current" sub-curve <i>S</i> (and if the current sub-curve is the first one, <i>S</i> is zero),
        and we call the full length of our original curve <i>L</i>, then we get the following graduation
        values:</p>

        <ul>
          <li>start: map <i>S</i> from interval (<i>0,L</i>) to interval <i>(s,e)</i></li>
          <li>c1: <i>map(<strong>S+d1</strong>, 0,L, s,e)</i>, d1 = distance along curve to projection of c1</li>
          <li>c2: <i>map(<strong>S+d2</strong>, 0,L, s,e)</i>, d2 = distance along curve to projection of c2</li>
          <li>...</li>
          <li>end: <i>map(<strong>S+length(subcurve)</strong>, 0,L, s,e)</i></li>
        </ul>

        At each of the relevant points (start, end, and the projections of the control points onto
        the curve) we know the curve's normal, so offsetting is simply a matter of taking our original
        point, and moving it along the normal vector by the offset distance for each point. Doing so
        will give us the following result (these have with a starting width of 0, and an end width
        of 40 pixels, but can be controlled with your + and - keys):</p>

        <textarea class="sketch-code" data-sketch-preset="simple" data-sketch-title="Graduated offsetting a quadratic Bézier curve">
        void setupCurve() {
          setupDefaultQuadratic();
          offsetting();
          offset = 20;
        }

        void drawCurve(BezierCurve curve) {
          additionals();
          curve.draw();
          if(offset>0) {
            noAdditionals();
            BezierCurve[] offsetCurve = curve.offset(offset, 0, 1);
            for(BezierCurve b: offsetCurve) { b.draw(); b.getPoint(0).draw(); b.getPoint(1).draw();}
            offsetCurve = curve.offset(-offset, 0, 1);
            for(BezierCurve b: offsetCurve) { b.draw(); b.getPoint(0).draw(); b.getPoint(1).draw();}
          }
        }</textarea>

        <textarea class="sketch-code" data-sketch-preset="simple" data-sketch-title="Graduated offsetting a cubic Bézier curve">
        void setupCurve() {
          setupDefaultCubic();
          offsetting();
          offset = 20;
        }

        void drawCurve(BezierCurve curve) {
          additionals();
          curve.draw();
          if(offset>0) {
            noAdditionals();
            BezierCurve[] offsetCurve = curve.offset(offset, 0, 1);
            for(BezierCurve b: offsetCurve) { b.draw(); b.getPoint(0).draw(); b.getPoint(1).draw();}
            offsetCurve = curve.offset(-offset, 0, 1);
            for(BezierCurve b: offsetCurve) { b.draw(); b.getPoint(0).draw(); b.getPoint(1).draw();}
          }
        }</textarea>
