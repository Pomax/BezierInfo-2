
        <p>If we have the extremities, and the start/end points, a simple for loop that tests for min/max values for
        x and y means we have the four values we need to box in our curve:

        <p id="bounds_p"><i>Computing the bounding box for a Bézier curve</i></p>
        <ol>
          <li>Find all <i>t</i> value(s) for the curve derivative's x- and y-roots.</li>
          <li>Discard any <i>t</i> value that's lower than 0 or higher than 1, because Bézier curves only use the interval [0,1].</li>
          <li>Determine the lowest and highest value when plugging the values <i>t=0</i>, <i>t=1</i> and each of the found
          roots into the original functions: the lowest value is the lower bound, and the highest value is the upper
          bound for the bounding box we want to construct.</li>
        </ol>

        <p>Applying this approach to our previous root finding, we get the following bounding boxes (with curve
        extremities coloured the same as in the root finding graphics):</p>

        <textarea class="sketch-code" data-sketch-preset="simple" data-sketch-title="Quadratic Bézier bounding box">
        void setupCurve() {
          setupDefaultQuadratic();
        }

        void drawCurve(BezierCurve curve) {
          curve.draw();

          stroke(255,0,0);
          BezierCurve x_only = curve.justX(dim-2*pad);
          float[] tx = x_only.getInflections();
          for(float t: tx) {
            if(t==0 || t==1) continue;
            Point p = curve.getPoint(t);
            ellipse(p.x,p.y,5,5);
          }

          stroke(255,0,255);
          BezierCurve y_only = curve.justY(dim-2*pad);
          float[] ty = y_only.getInflections();
          for(float t: ty) {
            if(t==0 || t==1) continue;
            Point p = curve.getPoint(t);
            ellipse(p.x,p.y,5,5);
          }

          drawBoundingBox(curve.generateBoundingBox());
        }</textarea>

        <textarea class="sketch-code" data-sketch-preset="simple" data-sketch-title="Cubic Bézier bounding box">
        void setupCurve() {
          setupDefaultCubic();
        }

        void drawCurve(BezierCurve curve) {
          curve.draw();

          stroke(255,0,0);
          BezierCurve x_only = curve.justX(dim-2*pad);
          float[] tx = x_only.getInflections();
          for(float t: tx) {
            if(t==0 || t==1) continue;
            Point p = curve.getPoint(t);
            ellipse(p.x,p.y,5,5);
          }

          stroke(255,0,255);
          BezierCurve y_only = curve.justY(dim-2*pad);
          float[] ty = y_only.getInflections();
          for(float t: ty) {
            if(t==0 || t==1) continue;
            Point p = curve.getPoint(t);
            ellipse(p.x,p.y,5,5);
          }

          drawBoundingBox(curve.generateBoundingBox());
        }</textarea>

        <p>We can construct even nicer boxes by aligning them along our curve, rather than along the x- and y-axis,
        but in order to do so we first need to look at how aligning works.</p>
