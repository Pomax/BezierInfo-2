        <p>Given the preceding section on curve moulding, we can also generate quadratic and cubic
        curves from any three points. However, unlike circle-fitting, which requires only three points,
        Bézier curve fitting requires three points, as well as a tangent and <i>t</i> value. We can
        come up with "default" values, where the <i>t</i> value for our middle point is simply 0.5,
        and the tangent is identical to the baseline for quadratic curves, or half the baseline for
        cubic curves.</p>

        <p>Using these "default" values for curve creation, we can already get fairly respectable
        curves; Click three times on each of the following sketches to set up the points
        that should be used to form a quadratic and cubic curve, respectively</p>

        <textarea class="sketch-code" data-sketch-preset="generate" data-sketch-title="Fitting a quadratic Bézier curve">
        void setupCurve() { span(); }

        void drawCurve(BezierCurve curve) {
          recordPoint(mouseX,mouseY);
          if(p1!=null) { p1.draw(); }
          if(p2!=null) { p2.draw(); }
          if(p3!=null) { p3.draw(); }
          if(p1!=null && p2!=null && p3!=null) {
            BezierCurve c = comp.generateCurve(2, p1, p2, p3);
            c.draw();
          }
        }</textarea>

        <textarea class="sketch-code" data-sketch-preset="generate" data-sketch-title="Fitting a cubic Bézier curve">
        void setupCurve() { span(); }

        void drawCurve(BezierCurve curve) {
          recordPoint(mouseX,mouseY);
          if(p1!=null) { p1.draw(); }
          if(p2!=null) { p2.draw(); }
          if(p3!=null) { p3.draw(); }
          if(p1!=null && p2!=null && p3!=null) {
            BezierCurve c = comp.generateCurve(3, p1, p2, p3);
            c.draw();
          }
        }</textarea>

        <p>(There are many ways to determine a combination of <i>t</i> and tangent values that lead
        to a more "aesthetic" curve, but this will be left as an exercise, since there are too many,
        and aesthetics are a personal choice)</p>
