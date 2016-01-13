var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");
var keyHandling = require("../../decorators/keyhandling-decorator.jsx");

var Tracing = React.createClass({
  statics: {
    keyHandlingOptions: {
      propName: "steps",
      values: {
        "38": 1,  // up arrow
        "40": -1 // down arrow
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
      title: "Tracing a curve at fixed distance intervals"
    };
  },

  setup: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
    api.steps = 8;
  },

  generate: function(api, curve, offset, pad, fwh) {
    offset.x += pad;
    offset.y += pad;
    var len = curve.length();
    var pts = [{x:0, y:0, d:0}];
    for(var v=1, t, d; v<=100; v++) {
      t = v/100;
      d = curve.split(t).left.length();
      pts.push({
        x: api.utils.map(t, 0,1,   0,fwh),
        y: api.utils.map(d, 0,len, 0,fwh),
        d: d,
        t: t
      });
    }
    return pts;
  },

  draw: function(api, curve, offset) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var len = curve.length();
    var w = api.getPanelWidth();
    var h = api.getPanelHeight();
    var pad = 20;
    var fwh = w - 2*pad;

    offset.x += w;
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);
    api.drawAxes(pad, "t",0,1, "d",0,len, offset);

    return this.generate(api, curve, offset, pad, fwh);
  },

  plotOnly: function(api, curve) {
    api.setPanelCount(2);
    var offset = {x:0, y:0};
    var pts = this.draw(api, curve, offset);
    for(var i=0; i<pts.length-1; i++) {
      api.drawLine(pts[i], pts[i+1], offset);
    }
  },

  drawColoured: function(api, curve) {
    api.setPanelCount(3);
    var w = api.getPanelWidth();
    var h = api.getPanelHeight();
    var pad = 20;
    var fwh = w - 2*pad;

    var offset = {x:0, y:0};
    var len = curve.length();
    var pts = this.draw(api, curve, offset);
    var s = api.steps, i, p, ts=[];
    for(i=0; i<=s; i++) {
      var target = (i * len)/s;
      // find the t nearest our target distance
      for (p=0; p<pts.length; p++) {
        if (pts[p].d > target) {
          p--;
          break;
        }
      }
      if(p<0) p=0;
      if(p===pts.length) p=pts.length-1;
      ts.push(pts[p]);
    }

    for(i=0; i<pts.length-1; i++) {
      api.drawLine(pts[i], pts[i+1], offset);
    }

    ts.forEach(p => {
      var pt = { x: api.utils.map(p.t,0,1,0,fwh), y: 0 };
      var pd = { x: 0, y: api.utils.map(p.d,0,len,0,fwh) };
      api.setColor("black");
      api.drawCircle(pt, 3, offset);
      api.drawCircle(pd, 3, offset);
      api.setColor("lightgrey");
      api.drawLine(pt, {x:pt.x, y:pd.y}, offset);
      api.drawLine(pd, {x:pt.x, y:pd.y}, offset);
    });

    offset = {x:2*w, y:0};
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);

    var idx=0, colors = ["rgb(240,0,200)", "rgb(0,40,200)"];
    api.setColor(colors[idx]);
    var p0 = curve.get(pts[0].t), p1;
    api.drawCircle(curve.get(0), 4, offset);

    for (i=1, p1; i<pts.length; i++) {
      p1 = curve.get(pts[i].t);
      api.drawLine(p0, p1, offset);
      if (ts.indexOf(pts[i]) !== -1) {
        api.setColor(colors[++idx % colors.length]);
        api.drawCircle(p1, 4, offset);
      }
      p0 = p1;
    }
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>Say you want to draw a curve with a dashed line, rather than a solid line,
        or you want to move something along the curve at fixed distance intervals over
        time, like a train along a track, and you want to use Bézier curves.</p>

        <p>Now you have a problem.</p>

        <p>The reason you have a problem is that Bézier curves are parametric functions
        with non-linear behaviour, whereas moving a train along a track is about as
        close to a practical example of linear behaviour as you can get. The problem
        we're faced with is that we can't just pick <i>t</i> values at some fixed interval
        and expect the Bézier functions to generate points that are spaced a fixed distance
        apart. In fact, let's look at the relation between "distance long a curve" and
        "<i>t</i> value", by plotting them against one another.</p>

        <p>The following graphic shows a particularly illustrative curve, and it's length-to-t plot.
        For linear traversal, this line needs to be straight, running from (0,0) to (length,1). This is,
        it's safe to say, not what we'll see, we'll see something wobbly instead. To make matters even
        worse, the length-to-<i>t</i> function is also of a much higher order than our curve is: while
        the curve we're using for this exercise is a cubic curve, which can switch concave/convex form once
        at best, the plot shows that the distance function along the curve is able to switch forms three
        times (to see this, try creating an S curve with the start/end close together, but the control
        points far apart).</p>

        <Graphic preset="twopanel" title="The t-for-distance function" setup={this.setup} draw={this.plotOnly}/>

        <p>We see a function that might be invertible, but we won't be able to do so, symbolically.
        You may remember from the section on arc length that we cannot actually compute the true
        arc length function as an expression of <i>t</i>, which means we also can't compute the true
        inverted function that gives <i>t</i> as an expression of length. So how do we fix this?</p>

        <p>One way is to do what the graphic does: simply run through the curve, determine its
        <i>t</i>-for-length values as a set of discrete values at some high resolution (the graphic
        uses 100 discrete points), and then use those as a basis for finding an appropriate <i>t</i> value,
        given a distance along the curve. This works quite well, actually, and is fairly fast.</p>

        <p>We can use some colour to show the difference between distance-based and time based intervals:
        the following graph is similar to the previous one, except it segments the curve in terms of
        equal-distance intervals. This shows as regular colour intervals going down the graph, but
        the mapping to <i>t</i> values is not linear, so there will be (highly) irregular intervals
        along the horizontal axis. It also shows the curve in an alternating colouring based on the
        t-for-distance values we find our LUT:</p>

        <Graphic preset="threepanel" title="Fixed-interval coloring a curve" setup={this.setup} draw={this.drawColoured} onKeyDown={this.props.onKeyDown}/>

        <p>Use your up and down arrow keys to increase or decrease the number of equidistant segments
        used to colour the curve.</p>

        <p>However, are there better ways? One such way is discussed
        in "<a href="http://www.geometrictools.com/Documentation/MovingAlongCurveSpecifiedSpeed.pdf">Moving
        Along a Curve with Specified Speed</a>" by David Eberly of Geometric Tools, LLC, but basically because
        we have no explicit length function (or rather, one we don't have to constantly compute for different
        intervals), you may simply be better off with a traditional lookup table (LUT).</p>

      </section>
    );
  }
});

module.exports = keyHandling(Tracing);
