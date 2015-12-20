        <p>One interesting property of Bézier curves is that an <i>n<sup>th</sup></i> order curve can
        always be perfectly represented by an <i>(n+1)<sup>th</sup></i> order curve, by giving the
        higher order curve specific control points.</p>

        <p>If we have a curve with three points, then we can create a four point curve that exactly
        reproduce the original curve as long as we give it the same start and end points, and for
        its two control points we pick "1/3<sup>rd</sup> start + 2/3<sup>rd</sup> control" and
        "2/3<sup>rd</sup> control + 1/3<sup>rd</sup> end", and now we have exactly the same curve as
        before, except represented as a cubic curve, rather than a quadratic curve.</p>

        <p>The general rule for raising an <i>n<sup>th</sup></i> order curve to an <i>(n+1)<sup>th</sup></i>
        order curve is as follows (observing that the start and end weights are the same as the start and
        end weights for the old curve):</p>

        <p>\[
          Bézier(k,t) = \sum_{i=0}^{k}
                        \underset{binomial\ term}{\underbrace{\binom{k}{i}}}
                        \cdot\
                        \underset{polynomial\ term}{\underbrace{(1-t)^{k-i} \cdot t^{i}}}
                        \ \cdot \
                        \underset{new\ weights}{\underbrace{\left ( \frac{(k-i) \cdot w_i + i \cdot w_{i-1}}{k} \right )}}
          \ ,\ with\ k = n+1
        \]</p>

        <p>However, this rule also has as direct consequence that you <strong>cannot</strong> generally
        safely lower a curve from <i>n<sup>th</sup></i> order to <i>(n-1)<sup>th</sup></i> order, because
        the control points cannot be "pulled apart" cleanly. We can try to, but the resulting curve will
        not be identical to the original, and may in fact look completely different.</p>

        <p>We can apply this to a (semi) random curve, as is done in the following graphic. Select the sketch
        and press your up and down cursor keys to elevate or lower the curve order.</p>

        <textarea class="sketch-code" data-sketch-preset="simple" data-sketch-title="A tenth order Bézier curve">
        void setupCurve() {
          int d = dim - 2*pad;
          int order = 10;
          ArrayList<Point> pts = new ArrayList<Point>();

          float dst = d/2.5, nx, ny, a=0, step = 2*PI/order, r;
          for(a=0; a<2*PI; a+=step) {
            r = random(-dst/4,dst/4);
            pts.add(new Point(d/2 + cos(a) * (r+dst), d/2 + sin(a) * (r+dst)));
            dst -= 1.2;
          }

          Point[] points = new Point[pts.size()];
          for(int p=0,last=points.length; p<last; p++) { points[p] = pts.get(p); }
          curves.add(new BezierCurve(points));
          reorder();
        }

        void drawCurve(BezierCurve curve) {
          curve.draw();
        }</textarea>
