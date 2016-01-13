var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");
var keyHandling = require("../../decorators/keyhandling-decorator.jsx");

var GraduatedOffsetting = React.createClass({
  statics: {
    keyHandlingOptions: {
      propName: "distance",
      values: {
        "38": 1,  // up arrow
        "40": -1 // down arrow
      }
    }
  },

  getDefaultProps: function() {
    return {
      title: "Graduated curve offsetting"
    };
  },

  setup: function(api, curve) {
    api.setCurve(curve);
    api.distance = 20;
  },

  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    this.setup(api, curve);
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    this.setup(api, curve);
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);


    api.setColor("blue");
    var outline = curve.outline(0,0,api.distance,api.distance);
    outline.curves.forEach(c => api.drawCurve(c));
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

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

        <p>At each of the relevant points (start, end, and the projections of the control points onto
        the curve) we know the curve's normal, so offsetting is simply a matter of taking our original
        point, and moving it along the normal vector by the offset distance for each point. Doing so
        will give us the following result (these have with a starting width of 0, and an end width
        of 40 pixels, but can be controlled with your up and down cursor keys):</p>

        <Graphic preset="simple" title="Offsetting a quadratic Bézier curve" setup={this.setupQuadratic} draw={this.draw} onKeyDown={this.props.onKeyDown}/>
        <Graphic preset="simple" title="Offsetting a cubic Bézier curve" setup={this.setupCubic} draw={this.draw} onKeyDown={this.props.onKeyDown}/>
      </section>
    );
  }
});

module.exports = keyHandling(GraduatedOffsetting);
