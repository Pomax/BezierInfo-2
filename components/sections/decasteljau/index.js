var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");

var deCasteljau = React.createClass({
  getDefaultProps: function() {
    return {
      title: "de Casteljau's algorithm"
    };
  },

  setup: function(api) {
    var points = [
      {x: 90, y:110},
      {x: 25, y: 40},
      {x:230, y: 40},
      {x:150, y:240}
    ];
    api.setCurve(new api.Bezier(points));
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    if (api.hover) {
      api.setColor("rgb(200,100,100)");
      var dim = api.getPanelWidth();
      var t = api.hover.x / dim;
      var hull = api.drawHull(curve, t);

      for(var i=4; i<=8; i++) {
        api.drawCircle(hull[i],3);
      }

      var p = curve.get(t);
      api.drawCircle(p, 5);
      api.setFill("black");
      api.drawCircle(p, 3);
      var perc = (t*100)|0;
      t = perc/100;
      api.text("Sequential interpolation for "+perc+"% (t="+t+")", {x: 10, y:15});
    }
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />
        <p>If we want to draw Bézier curves we can run through all values of <i>t</i> from 0 to 1 and then
        compute the weighted basis function, getting the <i>x</i>/<i>y</i> values we need to plot, but the
        more complex the curve gets, the more expensive this becomes. Instead, we can use "de Casteljau's
        algorithm" to draw curves, which is a geometric approach to drawing curves, and really easy to
        implement. So easy, in fact, you can do it by hand with a pencil and ruler.</p>

        <p>Rather than using our calculus function to find <i>x</i>/<i>y</i> values for <i>t</i>, let's
        do this instead:</p>

        <ul>
          <li>treat <i>t</i> as a ratio (which it is). t=0 is 0% along a line, t=1 is 100% along a line.</li>
          <li>Take all lines between the curve's defining points. For an order <i>n</i> curve, that's <i>n</i> lines.</li>
          <li>Place markers along each of these line, at distance <i>t</i>. So if <i>t</i> is 0.2, place the mark
              at 20% from the start, 80% from the end.</li>
          <li>Now form lines between <i>those</i> points. This gives <i>n-1</i> lines.</li>
          <li>Place markers along each of these line at distance <i>t</i>.</li>
          <li>Form lines between <i>those</i> points. This'll be <i>n-2</i> lines.</li>
          <li>place markers, form lines, place markers, etc.</li>
          <li>repeat this until you have only one line left. The point <i>t</i> on that line coincides with the
              original curve point at <i>t</i>.</li>
        </ul>

        <div className="howtocode">
          <h3>How to implement de Casteljau's algorithm</h3>

          <p>Let's just use the algorithm we just specified, and implement that:</p>

<pre>function drawCurve(points[], t):
  if(points.length==1):
    draw(points[0])
  else:
    newpoints=array(points.size-1)
    for(i=0; i<newpoints.length; i++):
      newpoints[i] = (1-t) * points[i] + t * points[i+1]
    drawCurve(newpoints, t)</pre>

          <p>And done, that's the algorithm implemented. Except usually you don't get the luxury of
          overloading the "+" operator, so let's also give the code for when you need to work with
          <i>x</i> and <i>y</i> values:</p>

<pre>function drawCurve(points[], t):
  if(points.length==1):
    draw(points[0])
  else:
    newpoints=array(points.size-1)
    for(i=0; i<newpoints.length; i++):
      x = (1-t) * points[i].x + t * points[i+1].x
      y = (1-t) * points[i].y + t * points[i+1].y
      newpoints[i] = new point(x,y)
    drawCurve(newpoints, t)</pre>

          <p>So what does this do? This draws a point, if the passed list of points is only 1 point
          long. Otherwise it will create a new list of points that sit at the <i>t</i> ratios (i.e.
          the "markers" outlined in the above algorithm), and then call the draw function for this
          new list.</p>
        </div>

        <p>To see this in action, mouse-over the following sketch. Moving the mouse changes which curve point is
        explicitly evaluated using de Casteljau's algorithm, moving the cursor left-to-right (or, of course,
        right-to-left), shows you how a curve is generated using this approach.</p>

        <Graphic preset="simple"title="Traversing a curve using de Casteljau's algorithm" setup={this.setup} draw={this.draw}/>

      </section>
    );
  }
});

module.exports = deCasteljau;
