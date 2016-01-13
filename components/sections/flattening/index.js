var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");
var keyHandling = require("../../decorators/keyhandling-decorator.jsx");

var Flattening = React.createClass({
  statics: {
    keyHandlingOptions: {
      propName: "steps",
      values: {
        "38": 1,  // up arrow
        "40": -1  // down arrow
      },
      controller: function(api) {
        if (api.steps < 1) {
          api.steps = 1;
        }
      }
    }
  },

  getDefaultProps: function() {
    return {
      title: "Simplified drawing"
    };
  },

  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    api.setCurve(curve);
    api.steps = 3;
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
    api.steps = 5;
  },

  drawFlattened: function(api, curve) {
    api.reset();
    api.setColor("#DDD");
    api.drawSkeleton(curve);
    api.setColor("#DDD");
    api.drawCurve(curve);
    var step = 1 / api.steps;
    var p0 = curve.points[0], pc;
    for(var t=step; t<1.0+step; t+=step) {
      pc = curve.get(Math.min(t,1));
      api.setColor("red");
      api.drawLine(p0,pc);
      p0 = pc;
    }
    api.setFill("black");
    api.text("Curve approximation using "+api.steps+" segments", {x:10, y:15});
  },

  values: {
    "38": 1,  // up arrow
    "40": -1  // down arrow
  },

  onKeyDown: function(e, api) {
    var v = this.values[e.keyCode];
    if(v) {
      e.preventDefault();
      api.steps += v;
      if (api.steps < 1) {
        api.steps = 1;
      }
    }
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>We can also simplify the drawing process by "sampling" the curve at certain points, and then joining those points up with straight lines, a process known as "flattening", as we are reducing a curve to a simple sequence of straight, "flat" lines.</p>

        <p>We can do this is by saying "we want X segments", and then sampling the curve at intervals that are spaced such that we
        end up with the number of segments we wanted. The advantage of this method is that it's fast: instead of evaluating 100 or
        even 1000 curve coordinates, we can sample a much lower number and still end up with a curve that sort-of-kind-of looks good
        enough. The disadvantage of course is that we lose the precision of working with "the real curve", so we usually can't use
        the flattened for for doing true intersection detection, or curvature alignment.</p>

        <Graphic preset="twopanel" title="Flattening a quadratic curve" setup={this.setupQuadratic} draw={this.drawFlattened} onKeyDown={this.onKeyDown}/>
        <Graphic preset="twopanel" title="Flattening a cubic curve" setup={this.setupCubic} draw={this.drawFlattened} onKeyDown={this.onKeyDown} />

        <p>Try clicking on the sketch and using your up and down arrow keys to lower the number of segments for both the quadratic
        and cubic curve. You'll notice that for certain curvatures, a low number of segments works quite well, but for more complex
        curvatures (try this for the cubic curve), a higher number is required to capture the curvature changes properly.</p>

        <div className="howtocode">
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

      </section>
    );
  }
});

module.exports = keyHandling(Flattening);
