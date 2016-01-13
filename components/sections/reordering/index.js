var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");
var keyHandling = require("../../decorators/keyhandling-decorator.jsx");

var Reordering = React.createClass({
  statics: {
    // Improve this based on http://www.sirver.net/blog/2011/08/23/degree-reduction-of-bezier-curves/
    lower: function(curve) {
      var pts = curve.points, q=[], n = pts.length;
      pts.forEach((p,k) => {
        if (!k) { return (q[k] = p); }
        var f1 = k/n, f2 = 1 - f1;
        q[k] = {
          x: f1 * p.x + f2 * pts[k-1].x,
          y: f1 * p.y + f2 * pts[k-1].y
        };
      });
      q.splice(n-1,1);
      q[n-2] = pts[n-1];
      curve.points = q;
      return curve;
    },

    keyHandlingOptions: {
      values: {
        "38": function(api) {
          api.setCurve(api.curve.raise());
        },
        "40": function(api) {
          api.setCurve(Reordering.lower(api.curve));
        }
      }
    }
  },

  getDefaultProps: function() {
    return {
      title: "Lowering and elevating curve order"
    };
  },

  getInitialState: function() {
    return {
      order: 0
    };
  },

  setup: function(api) {
    var points = [];
    var w = api.getPanelWidth(),
        h = api.getPanelHeight();
    for (var i=0; i<10; i++) {
      points.push({
        x: w/2 + (Math.random() * 20) + Math.cos(Math.PI*2 * i/10) * (w/2 - 40),
        y: h/2 + (Math.random() * 20) + Math.sin(Math.PI*2 * i/10) * (h/2 - 40)
      });
    }
    var curve = new api.Bezier(points);
    api.setCurve(curve);
  },

  draw: function(api, curve) {
    api.reset();
    var pts = curve.points;

    this.setState({
      order: pts.length
    });

    var p0 = pts[0];

    // we can't "just draw" this curve, since it'll be an arbitrary order,
    // And the canvas only does 2nd and 3rd - we use de Casteljau's algorithm:
    for(var t=0; t<=1; t+=0.01) {
      var q = JSON.parse(JSON.stringify(pts));
      while(q.length > 1) {
        for (var i=0; i<q.length-1; i++) {
          q[i] = {
            x: q[i].x + (q[i+1].x - q[i].x) * t,
            y: q[i].y + (q[i+1].y - q[i].y) * t
          };
        }
        q.splice(q.length-1, 1);
      }
      api.drawLine(p0, q[0]);
      p0 = q[0];
    }

    p0 = pts[0];
    api.setColor("black");
    api.drawCircle(p0,3);
    pts.forEach(p => {
      if(p===p0) return;
      api.setColor("#DDD");
      api.drawLine(p0,p);
      api.setColor("black");
      api.drawCircle(p,3);
      p0 = p;
    });
  },

  getOrder: function() {
    var order = this.state.order;
    if (order%10 === 1 && order !== 11) {
      order += "st";
    } else if (order%10 === 2 && order !== 12) {
      order += "nd";
    } else if (order%10 === 3 && order !== 13) {
      order += "rd";
    } else {
      order += "th";
    }
    return order;
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>One interesting property of Bézier curves is that an <i>n<sup>th</sup></i> order curve can
        always be perfectly represented by an <i>(n+1)<sup>th</sup></i> order curve, by giving the
        higher order curve specific control points.</p>

        <p>If we have a curve with three points, then we can create a four point curve that exactly
        reproduce the original curve as long as we give it the same start and end points, and for
        its two control points we pick "1/3<sup>rd</sup> start + 2/3<sup>rd</sup> control" and
        "2/3<sup>rd</sup> control + 1/3<sup>rd</sup> end", and now we have exactly the same curve as
        before, except represented as a cubic curve, rather than a quadratic curve.</p>

        <p>The general rule for raising an <i>n<sup>th</sup></i> order curve to an <i>(n+1)<sup>th</sup></i>
        order curve is as follows (observing that the start and end weights are the same as the start and
        end weights for the old curve):</p>

        <p>\[
          Bézier(k,t) = \sum_{i=0}^{k}
                        \underset{binomial\ term}{\underbrace{\binom{k}{i}}}
                        \cdot\
                        \underset{polynomial\ term}{\underbrace{(1-t)^{k-i} \cdot t^{i}}}
                        \ \cdot \
                        \underset{new\ weights}{\underbrace{\left ( \frac{(k-i) \cdot w_i + i \cdot w_{i-1}}{k} \right )}}
          \ ,\ with\ k = n+1
        \]</p>

        <p>However, this rule also has as direct consequence that you <strong>cannot</strong> generally
        safely lower a curve from <i>n<sup>th</sup></i> order to <i>(n-1)<sup>th</sup></i> order, because
        the control points cannot be "pulled apart" cleanly. We can try to, but the resulting curve will
        not be identical to the original, and may in fact look completely different.</p>

        <p>We can apply this to a (semi) random curve, as is done in the following graphic. Select the sketch
        and press your up and down cursor keys to elevate or lower the curve order.</p>

        <Graphic preset="simple" title={"A " + this.getOrder() + " order Bézier curve"} setup={this.setup} draw={this.draw} onKeyDown={this.props.onKeyDown} />

        <p>There is a good, if mathematical, explanation on the matrices necessary for optimal reduction
        over on <a href="http://www.sirver.net/blog/2011/08/23/degree-reduction-of-bezier-curves/">Sirver's Castle</a>,
        which given time will find its way in a more direct description into this article.</p>

      </section>
    );
  }
});

module.exports = keyHandling(Reordering);
