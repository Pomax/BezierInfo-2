        <p>With de Casteljau's algorithm we also find all the points we need to split up a Bézier curve into two, smaller
        curves, which taken together form the original curve. When we construct de Casteljau's skeleton for some value
        <i>t</i>, the procedure gives us all the points we need to split a curve at that <i>t</i> value: one curve is defined
        by all the inside skeleton points found prior to our on-curve point, with the other curve being defined by all the
        inside skeleton points after our on-curve point.</p>

        <div class="howtocode">
          <h3>implementing curve splitting</h3>

          <p>We can implement curve splitting by bolting some extra logging onto the de Casteljau function:</p>

<pre>left=[]
right=[]
function drawCurve(points[], t):
  if(points.length==1):
    left.add(points[0])
    right.add(points[0])
    draw(points[0])
  else:
    newpoints=array(points.size-1)
    for(i=0; i&lt;newpoints.length; i++):
      if(i==0):
        left.add(points[i])
      if(i==newpoints.length-1):
        right.add(points[i+1])
      newpoints[i] = (1-t) * points[i] + t * points[i+1]
    drawCurve(newpoints, t)</pre>

          <p>After running this function for some value <i>t</i>, the <i>left</i> and <i>right</i> arrays
          will contain all the coordinates for two new curves - one to the "left" of our <i>t</i> value,
          the other on the "right", of the same order as the original curve, and overlayed exactly on the
          original curve.</p>
        </div>

        <p>This is best illustrated with an animated graphic:</p>

        <textarea class="sketch-code" data-sketch-preset="threepanel" data-sketch-title="Bézier curve splitting. Curve order can be lowered/elevated.">
        void setupCurve() {
          setupDefaultCubic();
          reorder();
          animate();
          pause();
          span();
        }

        void drawCurve(BezierCurve curve) {
          curve.draw();
          Point p = curve.getPoint(t);
          ellipse(p.x, p.y, 5, 5);
          drawSpan(curve, t);

          BezierCurve[] segments = curve.split(t);
          usePanelPadding();

          nextPanel();
          drawAxes("first curve x",0,panelDim, "first\ncurve\ny",0,panelDim);
          drawSpan(curve, t);
          segments[0].draw();

          nextPanel();
          drawAxes("second curve x",0,panelDim, "second\ncurve\ny",0,panelDim);
          drawSpan(curve, t);
          segments[1].draw();
        }</textarea>
