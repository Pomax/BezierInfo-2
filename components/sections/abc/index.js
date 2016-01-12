var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");

var ABC = React.createClass({
  getDefaultProps: function() {
    return {
      title: "The projection identity"
    };
  },

  onClick: function(evt, api) {
    api.t = api.curve.on({x: evt.offsetX, y: evt.offsetY},7);
    if (api.t < 0.05 || api.t > 0.95) api.t = false;
    api.redraw();
  },

  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    curve.points[0].y -= 10;
    api.setCurve(curve);
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    curve.points[2].y -= 20;
    api.setCurve(curve);
    api.lut = curve.getLUT(100);
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var h = api.getPanelHeight();

    api.setColor("black");
    if (api.t) {
      api.drawCircle(api.curve.get(api.t),3);
      api.setColor("lightgrey");
      var hull = api.drawHull(curve, api.t);
      var utils = api.utils;

      var A, B, C;

      if(hull.length === 6) {
        A = curve.points[1];
        B = hull[5];
        C = utils.lli4(A, B, curve.points[0], curve.points[2]);
        api.setColor("lightgrey");
        api.drawLine(curve.points[0], curve.points[2]);
      } else if(hull.length === 10) {
        A = hull[5];
        B = hull[9];
        C = utils.lli4(A, B, curve.points[0], curve.points[3]);
        api.setColor("lightgrey");
        api.drawLine(curve.points[0], curve.points[3]);
      }

      api.setColor("#00FF00");
      api.drawLine(A,B);
      api.setColor("red");
      api.drawLine(B,C);
      api.setColor("black");
      api.drawCircle(C,3);

      api.setFill("black");
      api.text("A", {x:10 + A.x, y: A.y});
      api.text("B (t = " + api.utils.round(api.t,2) + ")", {x:10 + B.x, y: B.y});
      api.text("C", {x:10 + C.x, y: C.y});

      var d1 = utils.dist(A, B);
      var d2 = utils.dist(B, C);
      var ratio = d1/d2;

      api.text("d1 (A-B): " + utils.round(d1,2) + ", d2 (B-C): "+ utils.round(d2,2) + ", ratio (d1/d2): " + utils.round(ratio,4), {x:10, y:h-7});
    }
  },

  setCT: function(evt,api) {
    api.t = evt.offsetX / api.getPanelWidth();
  },

  drawCTgraph: function(api) {
    api.reset();
    api.setColor("black");
    var w = api.getPanelWidth();
    var pad = 20;
    var fwh = w - 2*pad;
    api.drawAxes(pad, "t",0,1, "u",0,1);
    api.setColor("blue");
    var uPoint = function(t) {
      var value = api.u(t),
          res = { x: pad + t*fwh, y: pad + value*fwh };
      return res;
    };
    api.drawFunction(uPoint);
    if (api.t) {
      var v = api.u(api.t),
          v1 = api.utils.round(v,3),
          v2 = api.utils.round(1-v,3),
          up = uPoint(api.t);
      api.drawLine({x:up.x,y:pad}, up);
      api.drawLine({x:pad,y:up.y}, up);
      api.drawCircle(up,3);
      api.setFill("blue");
      api.text("    t = " + api.utils.round(api.t,3), {x:up.x+10, y:up.y-7});
      api.text("u(t) = " + api.utils.round(v,3), {x:up.x+10, y:up.y+7});
      api.setFill("black");
      api.text("C = "+v1+" * start + "+v2+" * end", {x:w/2 - pad, y:pad+fwh});
    }
  },

  drawQCT: function(api) {
    api.u = api.u || function(t) {
      var top = (t-1) * (t-1),
          bottom = 2*t*t - 2*t + 1;
      return top/bottom;
    };
    this.drawCTgraph(api);
  },

  drawCCT: function(api) {
    api.u = api.u || function(t) {
      var top = (1-t) * (1-t) * (1-t),
          bottom = t*t*t + top;
      return top/bottom;
    };
    this.drawCTgraph(api);
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>De Casteljau's algorithm is the pivotal algorithm when it comes to Bézier curves. You can use it not just to split
        curves, but also to draw them efficiently (especially for high-order Bézier curves), as well as to come up with curves
        based on three points and a tangent. Particularly this last thing is really useful because it lets us "mould" a curve,
        by picking it up at some point, and dragging that point around to change the curve's shape.</p>

        <p>How does that work? Succinctly: we run de Casteljau's algorithm in reverse!</p>

        <p>In order to run de Casteljau's algorithm in reverse, we need a few basic things: a start and end point, a point
        on the curve that want to be moving around, which has an associated <i>t</i> value, and a point we've not explicitly
        talked about before, and as far as I know has no explicit name, but lives one iteration higher in the de Casteljau
        process then our on-curve point does. I like to call it "A" for reasons that will become obvious.</p>

        <p>So let's use graphics instead of text to see where this "A" is, because text only gets us so far: in the
        following graphic, click anywhere on the curves to see the identity information that we'll be using to run
        de Casteljau in reverse (you can manipulate the curve even after picking a point. Note the "ratio" value
        when you do so: does it change?):</p>

        <div className="figure">
          <Graphic inline={true} preset="abc" title="Projections in a quadratic Bézier curve"
                   setup={this.setupQuadratic} draw={this.draw} onClick={this.onClick} />
          <Graphic inline={true} preset="abc" title="Projections in a cubic Bézier curve"
                   setup={this.setupCubic} draw={this.draw} onClick={this.onClick} />
        </div>

        <p>Clicking anywhere on the curves shows us three things:</p>

        <ol>
          <li>our on-curve point; let's call that <b>B</b>,</li>
          <li>a point at the tip of B's "hat", on de Casteljau step up; let's call that <b>A</b>, and</li>
          <li>a point that we get by projecting B onto the start--end baseline; let's call that <b>C</b>.</li>
        </ol>

        <p>These three values ABC hide an important identity formula for quadratic and cubic Bézier curves:
        for any point on the curve with some <i>t</i> value, the ratio distance of C along baseline is fixed:
        if some <i>t</i> value sets up a C that is 20% away from the start and 80% away from the end, then it
        doesn't matter where the start, end, or control points are: for that <i>t</i> value, C will <em>always</em> lie
        at 20% from the start and 80% from the end point. Go ahead, pick an on-curve point in either graphic
        and then move all the other points around: if you only move the control points, start and end won't move,
        and so neither will C, and if you move either start or end point, C will move but its relative position
        will not change. The following function stays true:</p>

        <p>\[
          C = u \cdot P_{start} + (1-u) \cdot P_{end}
        \]</p>

        <p>So that just leaves finding A.</p>

        <div className="note">
          <p>While that relation is fixed, the function <i>u(t)</i> differs depending on whether we're working
          with quadratic or cubic curves:</p>

          <p>\[\begin{align}
            & u(t)_{quadratic} = \frac{(t-1)^2}{2t^2 - 2t + 1} \\
            & u(t)_{cubic} = \frac{(1-t)^3}{t^3 + (1-t)^3}
          \end{align}\]</p>

          <p>So, if we know the start and end coordinates, and we know the <i>t</i> value, we know C:</p>

          <div className="figure">
            <Graphic inline={true} preset="abc" title="Quadratic value of C for t" draw={this.drawQCT} onMouseMove={this.setCT}/>
            <Graphic inline={true} preset="abc" title="Cubic value of C for t" draw={this.drawCCT} onMouseMove={this.setCT}/>
          </div>

          <p>Mouse-over the graphs to see the expression for C, given the <i>t</i> value at the mouse pointer.</p>
        </div>

        <p>There's also another important bit of information that is inherent to the ABC values: while the distances
        between A and B, and B and C, are dynamic (based on where we put B), the <em>ratio</em> between the two
        distances is stable: given some <i>t</i> value, the following always holds:</p>

        <p>\[
          ratio(t) = \frac{distance(B,C)}{distance(A,B)} = Constant
        \]</p>

        <p>This leads to a pretty powerful bit of knowledge: merely by knowing the <i>t</i> value of some on curve
        point, we know where C has to be (as per the above note), and because we know B and C, and thus have the
        distance between them, we know where A has to be:</p>

        <p>\[
          A = B - \frac{C - B}{ratio(t)} = B + \frac{B - C}{ratio(t)}
        \]</p>

        <p>And that's it, all values found.</p>

        <div className="note">
          <p>Much like the <i>u(t)</i> function in the above note, the <i>ratio(t)</i> function depends
          on whether we're looking at quadratic or cubic curves. Their form is intrinsically related to
          the <i>u(t)</i> function in that they both come rolling out of the same function evalution,
          explained over on <a href="http://mathoverflow.net/questions/122257/finding-the-formula-for-Bézier-curve-ratios-hull-point-point-baseline">MathOverflow</a> by
          Boris Zbarsky and myself. The ratio functions are the "s(t)" functions from the answers there,
          while the "u(t)" functions have the same name both here and on MathOverflow.</p>

          <p>\[
            ratio(t)_{quadratic} = \left | \frac{2t^2 - 2t}{2t^2 - 2t + 1} \right |
          \]</p>

          <p>\[
            ratio(t)_{cubic} = \left | \frac{t^3 + (1-t)^3 - 1}{t^3 + (1-t)^3} \right |
          \]</p>

          <p>Unfortunately, this trick only works for quadratic and cubic curves. Once we hit higher order curves,
          things become a lot less predictable; the "fixed point <i>C</i>" is no longer fixed, moving around as we
          move the control points, and projections of <i>B</i> onto the line between start and end may actually
          lie on that line before the start, or after the end, and there are no simple ratios that we can exploit.</p>
        </div>

        <p>So: if we know B and its corresponding <i>t</i> value, then we know all the ABC values, which
        —together with a start and end coordinate— gives us the necessary information to reconstruct a curve's
        "de Casteljau skeleton", which means that two points and a value between 0 and 1, we can come up with
        a curve. And that opens up possibilities: curve manipulation by dragging an on-curve point, curve fitting
        of "a bunch of coordinates", these are useful things, and we'll look at both in the next sections.</p>
      </section>
    );
  }
});

module.exports = ABC;

