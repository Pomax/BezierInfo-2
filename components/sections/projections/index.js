var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");

var Projections = React.createClass({
  getDefaultProps: function() {
    return {
      title: "Projecting a point onto a Bézier curve"
    };
  },

  setup: function(api) {
    api.setSize(320,320);
    var curve = new api.Bezier([
      {x:248,y:188},
      {x:218,y:294},
      {x:45,y:290},
      {x:12,y:236},
      {x:14,y:82},
      {x:186,y:177},
      {x:221,y:90},
      {x:18,y:156},
      {x:34,y:57},
      {x:198,y:18}
    ]);
    api.setCurve(curve);
    api._lut = curve.getLUT();
  },

  findClosest: function(LUT, p, dist) {
    var i,
        end = LUT.length,
        d,
        dd = dist(LUT[0],p),
        f = 0;
    for(i=1; i<end; i++) {
      d = dist(LUT[i],p);
      if(d<dd) {f = i;dd = d;}
    }
    return f/(end-1);
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);
    if (api.mousePt) {
      api.setColor("red");
      api.setFill("red");
      api.drawCircle(api.mousePt, 3);
      // naive t value
      var t = this.findClosest(api._lut, api.mousePt, api.utils.dist);
      // no real point in refining for illustration purposes
      var p = curve.get(t);
      api.drawLine(p, api.mousePt);
      api.drawCircle(p, 3);
      api.text("t = "+api.utils.round(t,2), p, {x:10, y:3});
    }
  },

  onMouseMove: function(evt, api) {
    api.mousePt = {x: evt.offsetX, y: evt.offsetY };
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>Say we have a Bézier curve and some point, not on the curve, of which we want to know
        which <i>t</i> value on the curve gives us an on-curve point closest to our off-curve point.
        Or: say we want to find the projection of a random point onto a curve. How do we do that?</p>

        <p>If the Bézier curve is of low enough order, we might be able
        to <a href="http://jazzros.blogspot.ca/2011/03/projecting-point-on-bezier-curve.html">work out
        the maths for how to do this</a>, and get a perfect <i>t</i> value back, but in general this is
        an incredibly hard problem and the easiest solution is, really, a numerical approach again. We'll
        be finding our ideal <i>t</i> value using a <a href="https://en.wikipedia.org/wiki/Binary_search_algorithm">binary
        search</a>. First, we do a coarse distance-check based on <i>t</i> values associated with the
        curve's "to draw" coordinates (using a lookup table, or LUT). This is pretty fast. Then we run
        this algorithm:</p>

        <ol>
          <li>with the <i>t</i> value we found, start with some small interval around <i>t</i> (1/length_of_LUT on either side is a reasonable start),</li>
          <li>if the distance to <i>t ± interval/2</i> is larger than the distance to <i>t</i>, try again with the interval reduced to half its original length.</li>
          <li>if the distance to <i>t ± interval/2</i> is smaller than the distance to <i>t</i>, replace <i>t</i> with the smaller-distance value.</li>
          <li>after reducing the interval, or changing <i>t</i>, go back to step 1.</li>
        </ol>

        <p>We keep repeating this process until the interval is small enough to claim the difference
        in precision found is irrelevant for the purpose we're trying to find <i>t</i> for. In this
        case, I'm arbitrarily fixing it at 0.0001.</p>

        <p>The following graphic demonstrates the result of this procedure.Simply move the cursor
        around, and if it does not lie on top of the curve, you will see a line that projects the
        cursor onto the curve based on an iteratively found "ideal" <i>t</i> value.</p>

        <Graphic preset="simple" title="Projecting a point onto a Bézier curve" setup={this.setup} draw={this.draw} onMouseMove={this.onMouseMove}/>
      </section>
    );
  }
});

module.exports = Projections;
