        <p>Sometimes, we don't actually need the precision of a true arc length, and we can get away with simply computing the approximate arc length instead. The by far fastest way to do this is to flatten the curve and then simply calculate the linear distance from point to point. This will come with an error, but this can be made arbitrarily small by increasing the segment count.</p>

        <textarea class="sketch-code" data-sketch-preset="twopanel" data-sketch-title="Approximate quadratic curve arc length">
        void setupCurve() {
          setupDefaultQuadratic();
          offsetting();
          offset = 16;
        }

        void drawCurve(BezierCurve curve) {
          additionals();
          curve.draw();

          nextPanel();
          stroke(0);
          float x = curve.getXValue(0),
                y = curve.getYValue(0),
                x2, y2, step = 1/offset, t,
                length=0;
          for(int i=1; i<=offset; i++) {
            t = i*step;
            x2 = curve.getXValue(t);
            y2 = curve.getYValue(t);
            line(x,y,x2,y2);
            length += dist(x,y,x2,y2);
            x = x2;
            y = y2;
          }

          float arclength = curve.getCurveLength();
          float error = 100 * (arclength - length) / arclength;

          length = nfc(length, 3, 3);
          arclength = nfc(arclength, 3, 3);
          error = nfc(error, 3, 3);
          if(error.indexOf(".")===0) { error = "0" + error; }

          fill(0);
          text("Approximate arc length based on "+offset+" segments: " + length, -dim/4, dim-20);
          text("True length: " + arclength + ", error: " + error + "%", -dim/4, dim-5);
        }</textarea>


        <textarea class="sketch-code" data-sketch-preset="twopanel" data-sketch-title="Approximate cubic curve arc length">
        void setupCurve() {
          setupDefaultCubic();
          offsetting();
          offset = 24;
        }

        void drawCurve(BezierCurve curve) {
          additionals();
          curve.draw();

          nextPanel();
          stroke(0);
          float x = curve.getXValue(0),
                y = curve.getYValue(0),
                x2, y2, step = 1/offset, t,
                length=0;
          for(int i=1; i<=offset; i++) {
            t = i*step;
            x2 = curve.getXValue(t);
            y2 = curve.getYValue(t);
            line(x,y,x2,y2);
            length += dist(x,y,x2,y2);
            x = x2;
            y = y2;
          }

          float arclength = curve.getCurveLength();
          float error = 100 * (arclength - length) / arclength;

          length = nfc(length, 3, 3);
          arclength = nfc(arclength, 3, 3);
          error = nfc(error, 3, 3);
          if(error.indexOf(".")===0) { error = "0" + error; }

          fill(0);
          text("Approximate arc length based on "+offset+" segments: " + length, -dim/4, dim-20);
          text("True length: " + arclength + ", error: " + error + "%", -dim/4, dim-5);
        }</textarea>

        <p>Try clicking on the sketch and using your '+' and '-' keys to lower the number of segments for both the quadratic and cubic curve. You may notice that the error in length is actually pretty significant, even if the percentage is fairly low: if the number of segments used yields an error of 0.1% or higher, the flattened curve already looks fairly obviously flattened. And of course, the longer the curve, the more significant the error will be.</p>
