var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");

var Components = React.createClass({
  getDefaultProps: function() {
    return {
      title: "Component functions"
    };
  },

  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    curve.points[2].x = 210;
    api.setCurve(curve);
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
  },

  draw: function(api, curve) {
    api.setPanelCount(3);
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var tf = curve.order + 1,
        pad = 20,
        pts = curve.points,
        w = api.getPanelWidth(),
        h = api.getPanelHeight(),
        offset = { x: w, y: 0 };

    var x_pts = JSON.parse(JSON.stringify(pts)).map((p,t) => { return {x:w*t/tf, y:p.x}; });
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);
    api.drawAxes(pad, "t",0,1, "x",0,w, offset);
    offset.x += pad;
    api.drawCurve(new api.Bezier(x_pts), offset);

    offset.x += w-pad;
    var y_pts = JSON.parse(JSON.stringify(pts)).map((p,t) => { return {x:w*t/tf, y:p.y}; });
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);
    api.drawAxes(pad, "t",0,1, "y",0,w, offset);
    offset.x += pad;
    api.drawCurve(new api.Bezier(y_pts), offset);
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>One of the first things people run into when they start using Bézier curves in their own programs is
        "I know how to draw the curve, but how do I determine the bounding box?". It's actually reasonably straight
        forward to do so, but it requires having some knowledge on exploiting math to get the values we need.
        For bounding boxes, we aren't actually interested in the curve itself, but only in its "extremities": the
        minimum and maximum values the curve has for its x- and y-axis values. If you remember your calculus
        (provided you ever took calculus, otherwise it's going to be hard to remember) we can determine function
        extremities using the first derivative of that function, but this poses a problem, since our function is
        parametric: every axis has its own function.</p>

        <p>The solution: compute the derivative for each axis separately, and then fit them back together in the same
        way we do for the original.</p>

        <p>Let's look at how a parametric Bézier curve "splits up" into two normal functions, one for the x-axis and
        one for the y-axis. Note the left-most figure is again an interactive curve, without labeled axes (you
        get coordinates in the graph instead).  The center and right-most figures are the component functions for
        computing the x-axis value, given a value for <i>t</i> (between 0 and 1 inclusive), and the y-axis value,
        respectively.</p>

        <p>If you move points in a curve sideways, you should only see the middle graph change; likely, moving
        points vertically should only show a change in the right graph.</p>

        <Graphic preset="simple" title="Quadratic Bézier curve components" setup={this.setupQuadratic} draw={this.draw}/>
        <Graphic preset="simple" title="Cubic Bézier curve components" setup={this.setupCubic} draw={this.draw}/>

      </section>
    );
  }
});

module.exports = Components;
