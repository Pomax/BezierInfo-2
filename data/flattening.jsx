        <p>We can also simplify the drawing process by "sampling" the curve at certain points, and then joining those points up with straight lines, a process known as "flattening", as we are reducing a curve to a simple sequence of straight, "flat" lines.</p>

        <p>We can do this is by saying "we want X segments", and then sampling the curve at intervals that are spaced such that we end up with the number of segments we wanted. The advantage of this method is that it's fast: instead of evaluating 100 or even 1000 curve coordinates, we can sample a much lower number and still end up with a curve that sort-of-kind-of looks good enough. The disadvantage of course is that we lose the precision of working with "the real curve", so we usually can't use the flattened for for doing true intersection detection, or curvature alignment.</p>

        <textarea class="sketch-code" data-sketch-preset="twopanel" data-sketch-title="Flattening a quadratic curve">
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
                x2, y2, step = 1/offset, t;
          for(int i=1; i<=offset; i++) {
            t = i*step;
            x2 = curve.getXValue(t);
            y2 = curve.getYValue(t);
            line(x,y,x2,y2);
            x = x2;
            y = y2;
          }

          fill(0);
          text("Flattened using "+offset+" segments", dim/4, dim-20);
        }</textarea>


        <textarea class="sketch-code" data-sketch-preset="twopanel" data-sketch-title="Flattening a cubic curve">
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
                x2, y2, step = 1/offset, t;
          for(int i=1; i<=offset; i++) {
            t = i*step;
            x2 = curve.getXValue(t);
            y2 = curve.getYValue(t);
            line(x,y,x2,y2);
            x = x2;
            y = y2;
          }

          fill(0);
          text("Flattened using "+offset+" segments", dim/4, dim-20);
        }</textarea>

        <p>Try clicking on the sketch and using your '+' and '-' keys to lower the number of segments for both the quadratic and cubic curve. You'll notice that for certain curvatures, a low number of segments works quite well, but for more complex curvatures (try this for the cubic curve), a higher number is required to capture the curvature changes properly.</p>

        <div class="howtocode">
          <h3>How to implement curve flattening</h3>

          <p>Let's just use the algorithm we just specified, and implement that:</p>

<pre>function flattenCurve(curve, segmentCount):
  step = 1/segmentCount;
  coordinates = [curve.getXValue(0), curve.getYValue(0)]
  for(i=1; i <= segmentCount; i++):
    t = i*step;
    coordinates.push[curve.getXValue(t), curve.getYValue(t)]
  return coordinates;</pre>

          <p>And done, that's the algorithm implemented. That just leaves drawing the resulting "curve" as a sequence of lines:</p>

<pre>function drawFlattenedCurve(curve, segmentCount):
  coordinates = flattenCurve(curve, segmentCount)
  coord = coordinates[0], _coords;
  for(i=1; i < coordinates.length; i++):
    _coords = coordinates[i]
    line(coords, _coords)
    coords = _coords</pre>

          <p>We start with the first coordinate as reference point, and then just draw lines between each point and its next point.</p>
        </div>