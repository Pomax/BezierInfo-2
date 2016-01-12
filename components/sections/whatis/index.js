var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");


var Whatis = React.createClass({
  getDefaultProps: function() {
    return {
      title: "So what makes a Bézier Curve?"
    };
  },

  setup: function(api) {
    api.setPanelCount(3);
    var curve = api.getDefaultQuadratic();
    api.setCurve(curve);
    api.step = 25;
  },

  draw: function(api, curve) {
    var dim = api.getPanelWidth(),
        pts = curve.points,
        p1 = pts[0],
        p2=pts[1],
        p3 = pts[2],
        p1e, p2e, m, t, i,
        offset = {x:0, y:0},
        d,v,tvp;

    api.reset();

    api.setColor("black");
    api.setFill("black");
    api.drawSkeleton(curve, offset);
    api.text("First linear interpolation at "+api.step+"% steps", {x:5, y:15}, offset);

    offset.x += dim;
    api.drawLine({x:0, y:0}, {x:0, y:this.dim}, offset);
    api.drawSkeleton(curve, offset);
    api.text("Second interpolation at "+api.step+"% steps", {x:5, y:15}, offset);

    offset.x += dim;
    api.drawLine({x:0, y:0}, {x:0, y:this.dim}, offset);
    api.drawSkeleton(curve, offset);
    api.text("Curve points generated this way", {x:5, y:15}, offset);

    api.setColor("lightgrey");
    for(t=1,d=20,v,tvp; t<d; t++) {
      v = t/d;
      tvp = curve.get(v);
      api.drawCircle(tvp,2,offset);
    }

    for(i = 3*api.step; i>0; i -= api.step) {
      t = i/100;
      if (t>1) continue;
      api.setRandomColor();

      p1e = {
        x: p1.x + t * (p2.x - p1.x),
        y: p1.y + t * (p2.y - p1.y)
      };

      p2e = {
        x: p2.x + t * (p3.x - p2.x),
        y: p2.y + t * (p3.y - p2.y)
      };

      m = {
        x: p1e.x + t * (p2e.x - p1e.x),
        y: p1e.y + t * (p2e.y - p1e.y)
      };

      offset = {x:0, y:0};
      api.drawCircle(p1e,3, offset);
      api.drawCircle(p2e,3, offset);
      api.setWeight(0.5);
      api.drawLine(p1e, p2e, offset);
      api.setWeight(1.5);
      api.drawLine(p1, p1e, offset);
      api.drawLine(p2, p2e, offset);
      api.setWeight(1);

      offset.x += dim;
      api.drawCircle(p1e,3, offset);
      api.drawCircle(p2e,3, offset);
      api.setWeight(0.5);
      api.drawLine(p1e, p2e, offset);
      api.setWeight(1.5);
      api.drawLine(p1e, m, offset);
      api.setWeight(1);
      api.drawCircle(m,3,offset);

      offset.x += dim;
      api.drawCircle(m,3,offset);

      api.text(i+"%, or t = " + api.utils.round(t,2), {x: m.x + 10 + offset.x, y: m.y + 10 + offset.y});
    }
  },

  values: {
    "38": 1,  // up arrow
    "40": -1  // down arrow
  },

  onKeyDown: function(e, api) {
    var v = this.values[e.keyCode];
    if(v) {
      e.preventDefault();
      api.step += v;
      if (api.step < 1) {
        api.step = 1;
      }
    }
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>Playing with the points for curves may have given you a feel for how Bézier curves behaves, but
        what <em>are</em> Bézier curves, really? There are two ways to explain what a Bézier curve is, and
        they turn out to be the entirely equivalent, but one of them uses complicated maths, and the other
        uses really simple maths. So... let's start with the simple explanation:</p>

        <p>Bezier curves are the result of <a href="https://en.wikipedia.org/wiki/Linear_interpolation">linear
        interpolations</a>. That sounds complicated but you've been doing linear interpolation since you were
        very young: any time you had to point at something between two other things, you've been applying
        linear interpolation. It's simply "picking a point between two, points".</p>

        <p>If we know the distance between those two points, and we want a new point that is, say, 20% the
        distance away from the first point (and thus 80% the distance away from the second point) then we
        can compute that really easily:</p>

        <p>\[
        Given \left (
          \begin{align}
            p_1 &= some\ point \\
            p_2 &= some\ other\ point \\
            distance &= (p_2 - p_1) \\
            ratio &= \frac{percentage}{100} \\
          \end{align}
        \right ),\ our\ new\ point = p_1 + distance \cdot ratio

        \]</p>

        <p>So let's look at that in action: the following graphic is interactive in that you can use your
        '+' and '-' keys to increase or decrease the interpolation distance, to see what happens. We start
        with three points, which gives us two lines. Linear interpolation over those lines gives use two
        points, between which we can again perform linear interpolation, yielding a single point. And that
        point —and all points we can form in this way for all distances taken together— form our Bézier curve:</p>

        <Graphic title="Linear Interpolation leading to Bézier curves" setup={this.setup} draw={this.draw} onKeyDown={this.onKeyDown}/>

        <p>And that brings us to the complicated maths: calculus.</p>

        <p>While it doesn't look like that's what we've just done, we actually just drew a quadratic curve, in steps,
        rather than in a single go. One of the fascinating parts about Bézier curves is that they can both be described
        in terms of polynomial functions, as well as in terms of very simple interpolations of interpolations of [...].
        That, in turn, means we can look at what these curves can do based on both "real maths" (by examining the functions,
        their derivatives, and all that stuff), as well as by looking at the "mechanical" composition (which tells us
        that a curve will never extend beyond the points we used to construct it, for instance)</p>

        <p>So let's start looking at Bézier curves a bit more in depth. Their mathematical expressions, the properties we
        can derive from those, and the various things we can do to, and with, Bézier curves.</p>
      </section>
    );
  }
});

module.exports = Whatis;
