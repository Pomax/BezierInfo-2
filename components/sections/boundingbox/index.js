var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");

var BoundingBox = React.createClass({
  getDefaultProps: function() {
    return {
      title: "Bounding boxes"
    };
  },

  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    api.setCurve(curve);
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);
    api.setColor("#00FF00");
    api.drawbbox(curve.bbox());
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>If we have the extremities, and the start/end points, a simple for loop that tests for min/max values for
        x and y means we have the four values we need to box in our curve:</p>

        <p><i>Computing the bounding box for a Bézier curve</i>:</p>

        <ol>
          <li>Find all <i>t</i> value(s) for the curve derivative's x- and y-roots.</li>
          <li>Discard any <i>t</i> value that's lower than 0 or higher than 1, because Bézier curves only use the interval [0,1].</li>
          <li>Determine the lowest and highest value when plugging the values <i>t=0</i>, <i>t=1</i> and each of the found
          roots into the original functions: the lowest value is the lower bound, and the highest value is the upper
          bound for the bounding box we want to construct.</li>
        </ol>

        <p>Applying this approach to our previous root finding, we get the following bounding boxes (with curve
        extremities coloured the same as in the root finding graphics):</p>

        <Graphic preset="simple" title="Quadratic Bézier bounding box" setup={this.setupQuadratic} draw={this.draw} />

        <Graphic preset="simple" title="Cubic Bézier bounding box" setup={this.setupCubic} draw={this.draw} />


        <p>We can construct even nicer boxes by aligning them along our curve, rather than along the x- and y-axis,
        but in order to do so we first need to look at how aligning works.</p>
      </section>
    );
  }
});

module.exports = BoundingBox;
