var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");

var Splitting = React.createClass({
  getDefaultProps: function() {
    return {
      title: "Splitting curves"
    };
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
    api.forward = true;
  },

  drawSplit: function(api, curve) {
    api.setPanelCount(2);
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var offset = {x:0, y:0};
    var t = 0.5;
    var pt = curve.get(0.5);
    var split = curve.split(t);
    api.drawCurve(split.left);
    api.drawCurve(split.right);
    api.setColor("red");
    api.drawCircle(pt,3);

    api.setColor("black");
    offset.x = api.getPanelWidth();
    api.drawLine({x:0,y:0},{x:0,y:api.getPanelHeight()}, offset);

    api.setColor("lightgrey");
    api.drawCurve(curve, offset);
    api.drawCircle(pt,4);

    offset.x -= 20;
    offset.y -= 20;
    api.drawSkeleton(split.left, offset, true);
    api.drawCurve(split.left, offset);

    offset.x += 40;
    offset.y += 40;
    api.drawSkeleton(split.right, offset, true);
    api.drawCurve(split.right, offset);
  },

  drawAnimated: function(api, curve) {
    api.setPanelCount(3);
    api.reset();

    var frame = api.getFrame();
    var interval = 5 * api.getPlayInterval();
    var t = (frame%interval)/interval;
    var forward = (frame%(2*interval)) < interval;
    if (forward) { t = t%1; } else { t = 1 - t%1; }
    var offset = {x:0, y:0};

    api.setColor("lightblue");
    api.drawHull(curve, t);
    api.drawSkeleton(curve);
    api.drawCurve(curve);
    var pt = curve.get(t);
    api.drawCircle(pt, 4);

    api.setColor("black");
    offset.x += api.getPanelWidth();
    api.drawLine({x:0,y:0},{x:0,y:api.getPanelHeight()}, offset);

    var split = curve.split(t);

    api.setColor("lightgrey");
    api.drawCurve(curve, offset);
    api.drawHull(curve, t, offset);
    api.setColor("black");
    api.drawCurve(split.left, offset);
    api.drawPoints(split.left.points, offset);
    api.setFill("black");
    api.text("Left side of curve split at t = " + (((100*t)|0)/100), {x: 10 + offset.x, y: 15 + offset.y});

    offset.x += api.getPanelWidth();
    api.drawLine({x:0,y:0},{x:0,y:api.getPanelHeight()}, offset);

    api.setColor("lightgrey");
    api.drawCurve(curve, offset);
    api.drawHull(curve, t, offset);
    api.setColor("black");
    api.drawCurve(split.right, offset);
    api.drawPoints(split.right.points, offset);
    api.setFill("black");
    api.text("Right side of curve split at t = " + (((100*t)|0)/100), {x: 10 + offset.x, y: 15 + offset.y});
  },

  togglePlay: function(evt, api) {
    if (api.playing) { api.pause(); } else { api.play(); }
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>With de Casteljau's algorithm we also find all the points we need to split up a Bézier curve into two, smaller
        curves, which taken together form the original curve. When we construct de Casteljau's skeleton for some value
        <i>t</i>, the procedure gives us all the points we need to split a curve at that <i>t</i> value: one curve is defined
        by all the inside skeleton points found prior to our on-curve point, with the other curve being defined by all the
        inside skeleton points after our on-curve point.</p>

        <Graphic title="Splitting a curve" setup={this.setupCubic} draw={this.drawSplit} />

        <div className="howtocode">
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
    for(i=0; i<newpoints.length; i++):
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

        <p>This is best illustrated with an animated graphic (click to play/pause):</p>

        <Graphic preset="threepanel" title="Bézier curve splitting" setup={this.setupCubic} draw={this.drawAnimated} onClick={this.togglePlay} />

      </section>
    );
  }
});

module.exports = Splitting;
