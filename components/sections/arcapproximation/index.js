var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");
var keyHandling = require("../../decorators/keyhandling-decorator.jsx");
var atan2 = Math.atan2, PI = Math.PI, TAU = 2*PI, cos = Math.cos, sin = Math.sin;

var Introduction = React.createClass({
  statics: {
    keyHandlingOptions: {
      propName: "error",
      values: {
        "38": 0.1,  // up arrow
        "40": -0.1  // down arrow
      },
      controller: function(api) {
        if (api.error < 0.1) {
          api.error = 0.1;
        }
      }
    }
  },

  getDefaultProps: function() {
    return {
      title: "Approximating Bézier curves with circular arcs"
    };
  },

  setupCircle: function(api) {
    var curve = new api.Bezier(70,70, 140,40, 240,130);
    api.setCurve(curve);
  },

  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    api.setCurve(curve);
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
    api.error = 0.5;
  },

  getCCenter: function(api, p1, p2, p3) {
    // deltas
    var dx1 = (p2.x - p1.x),
        dy1 = (p2.y - p1.y),
        dx2 = (p3.x - p2.x),
        dy2 = (p3.y - p2.y);

    // perpendiculars (quarter circle turned)
    var dx1p = dx1 * cos(PI/2) - dy1 * sin(PI/2),
        dy1p = dx1 * sin(PI/2) + dy1 * cos(PI/2),
        dx2p = dx2 * cos(PI/2) - dy2 * sin(PI/2),
        dy2p = dx2 * sin(PI/2) + dy2 * cos(PI/2);

    // chord midpoints
    var mx1 = (p1.x + p2.x)/2,
        my1 = (p1.y + p2.y)/2,
        mx2 = (p2.x + p3.x)/2,
        my2 = (p2.y + p3.y)/2;

    // midpoint offsets
    var mx1n = mx1 + dx1p,
        my1n = my1 + dy1p,
        mx2n = mx2 + dx2p,
        my2n = my2 + dy2p;

    // intersection of these lines:
    var i = api.utils.lli8(mx1,my1,mx1n,my1n, mx2,my2,mx2n,my2n);
    var r = api.utils.dist(i,p1);

    // arc start/end values, over mid point
    var s = atan2(p1.y - i.y, p1.x - i.x),
        m = atan2(p2.y - i.y, p2.x - i.x),
        e = atan2(p3.y - i.y, p3.x - i.x);

    // determine arc direction (cw/ccw correction)
    var __;
    if (s<e) {
      // if s<m<e, arc(s, e)
      // if m<s<e, arc(e, s + TAU)
      // if s<e<m, arc(e, s + TAU)
      if (s>m || m>e) { s += TAU; }
      if (s>e) { __=e; e=s; s=__; }
    } else {
      // if e<m<s, arc(e, s)
      // if m<e<s, arc(s, e + TAU)
      // if e<s<m, arc(s, e + TAU)
      if (e<m && m<s) { __=e; e=s; s=__; } else { e += TAU; }
    }

    // assign and done.
    i.s = s;
    i.e = e;
    i.r = r;
    return i;
  },

  drawCircle: function(api, curve) {
    api.reset();
    var pts = curve.points;

    // get center
    var C = this.getCCenter(api, pts[0], pts[1], pts[2]);
    api.setColor("black");
    pts.forEach(p => api.drawCircle(p,3));
    api.drawCircle(C, 3);

    // chords and perpendicular lines
    api.setColor("blue");
    api.drawLine(pts[0], pts[1]);
    api.drawLine({x: (pts[0].x + pts[1].x)/2, y: (pts[0].y + pts[1].y)/2}, C);

    api.setColor("red");
    api.drawLine(pts[1], pts[2]);
    api.drawLine({x: (pts[1].x + pts[2].x)/2, y: (pts[1].y + pts[2].y)/2}, C);

    api.setColor("green");
    api.drawLine(pts[2], pts[0]);
    api.drawLine({x: (pts[2].x + pts[0].x)/2, y: (pts[2].y + pts[0].y)/2}, C);

    api.setColor("grey");
    api.drawCircle(C, api.utils.dist(C,pts[0]));
  },

  drawSingleArc: function(api, curve) {
    api.reset();
    var arcs = curve.arcs(api.error);
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var a = arcs[0];
    api.setColor("red");
    api.setFill("rgba(200,0,0,0.4)");
    api.debug = true;
    api.drawArc(a);

    api.setFill("black");
    api.text("Arc approximation with total error " + api.utils.round(api.error,1), {x:10, y:15});
  },

  drawArcs: function(api, curve) {
    api.reset();
    var arcs = curve.arcs(api.error);
    api.drawSkeleton(curve);
    api.drawCurve(curve);
    arcs.forEach(a => {
      api.setRandomColor(0.3);
      api.setFill(api.getColor());
      api.drawArc(a);
    });

    api.setFill("black");
    api.text("Arc approximation with total error " + api.utils.round(api.error,1) + " per arc segment", {x:10, y:15});
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>Let's look at converting Bézier curves into sequences of circular arcs. We already saw in the
          section on circle approximation that this will never yield a perfect equivalent, but sometimes
          you need circular arcs, such as when you're working with fabrication machinery, or simple vector
          languages that understand lines and circles, but not much else.</p>

        <p>The approach is fairly simple: pick a starting point on the curve, and pick two points that are
          further along the curve. Determine the circle that goes through those three points, and see if
          it fits the part of the curve we're trying to approximate. Decent fit? Try spacing the points
          further apart. Bad fit? Try spacing the points closer together. Keep doing this until you've
          found the "good approximation/bad approximation" boundary, record the "good" arc, and then move
          the starting point up to overlap the end point we previously found. Rinse and repeat until we've
          covered the entire curve.</p>

        <p>So: step 1, how do we find a circle through three points? That part is actually really simple.
          You may remember (if you ever learned it!) that a line between two points on a circle is called
          a <a href="https://en.wikipedia.org/wiki/Chord_%28geometry%29">chord</a>, and one property of
          chords is that the line from the center of any chord, perpendicular to that chord, passes through
          the center of the circle.</p>

        <p>So: if we have have three points, we have three (different) chords, and consequently, three
          (different) lines that go from those chords through the center of the circle. So we find the
          centers of the chords, find the perpendicular lines, find the intersection of those lines,
          and thus find the center of the circle.</p>

        <p>The following graphic shows this procedure with a different colour for each chord and its
          associated perpendicular through the center. You can move the points around as much as you
          like, those lines will always meet!</p>

        <Graphic preset="simple" title="Finding a circle through three points" setup={this.setupCircle} draw={this.drawCircle} />

        <p>So, with the procedure on how to find a circle through three points, finding the arc through those points
          is straight-forward: pick one of the three points as start point, pick another as an end point, and
          the arc has to necessarily go from the start point, over the remaining point, to the end point.</p>

        <p>So how can we convert a Bezier curve into a (sequence of) circular arc(s)?</p>

        <ul>
          <li>Start at <em>t=0</em></li>
          <li>Pick two points further down the curve at some value <em>m = t + n</em> and <em>e = t + 2n</em></li>
          <li>Find the arc that these points define</li>
          <li>Determine how close the found arc is to the curve:
            <ul>
              <li>Pick two additional points <em>e1 = t + n/2</em> and <em>e2 = t + n + n/2</em>.</li>
              <li>These points, if the arc is a good approximation of the curve interval chosen, should
                  lie <em>on</em> the circle, so their distance to the center of the circle should be the
                  same as the distance from any of the three other points to the center.</li>
              <li>For point points, determine the (absolute) error between the radius of the circle, and the
                <em>actual</em> distance from the center of the circle to the point on the curve.</li>
              <li>If this error is too high, we consider the arc bad, and try a smaller interval.</li>
            </ul>
          </li>
        </ul>

        <p>The result of this is shown in the next graphic: we start at a guaranteed failure: s=0, e=1. That's
          the entire curve. The midpoint is simply at <em>t=0.5</em>, and then we start performing
          a <a href="https://en.wikipedia.org/wiki/Binary_search_algorithm">Binary Search</a>.</p>

        <ol>
          <li>We start with {0, 0.5, 1}</li>
          <li>That'll fail, so we retry with the interval halved: {0, 0.25, 0.5}</li>
          <ul>
            <li>If that arc's good, we move back up by half distance: {0, 0.375, 0.75}.</li>
            <li>However, if the arc was still bad, we move <em>down</em> by half the distance: {0, 0.125, 0.25}.</li>
          </ul>
          <li>We keep doing this over and over until we have two arcs found in sequence of which the first arc is good, and
            the second arc is bad. When we find that pair, we've found the boundary between a good approximation and a
            bad approximation, and we pick the former</li>
        </ol>

        <p>The following graphic shows the result of this approach, with a default error threshold of 0.5, meaning that
          if an arc is off by a <em>combined</em> half pixel over both verification points, then we treat the arc as bad.
          This is an extremely simple error policy, but already works really well. Note that the graphic is still
          interactive, and you can use your up and down cursor keys keys to increase or decrease the error threshold,
          to see what the effect of a smaller or larger error threshold is.</p>

        <Graphic preset="simple" title="Arc approximation of a Bézier curve" setup={this.setupCubic} draw={this.drawSingleArc} onKeyDown={this.props.onKeyDown} />

        <p>With that in place, all that's left now is to "restart" the procedure by treating the found arc's
          end point as the new to-be-determined arc's starting point, and using points further down the curve. We
          keep trying this until the found end point is for <em>t=1</em>, at which point we are done. Again,
          the following graphic allows for '+' and '-' key input to increase or decrease the error threshold,
          so you can see how picking a different threshold changes the number of arcs that are necessary to
          reasonably approximate a curve:</p>

        <Graphic preset="simple" title="Arc approximation of a Bézier curve" setup={this.setupCubic} draw={this.drawArcs} onKeyDown={this.props.onKeyDown} />

        <p>So... what is this good for? Obviously, If you're working with technologies that can't do curves,
          but can do lines and circles, then the answer is pretty straight-forward, but what else? There are
          some reasons why you might need this technique: using circular arcs means you can determine whether
          a coordinate lies "on" your curve really easily: simply compute the distance to each circular arc
          center, and if any of those are close to the arc radii, at an angle betwee the arc start and end:
          bingo, this point can be treated as lying "on the curve". Another benefit is that this approximation
          is "linear": you can almost trivially travel along the arcs at fixed speed. You can also trivially
          compute the arc length of the approximated curve (it's a bit like curve flattening). The only
          thing to bear in mind is that this is a lossy equivalence: things that you compute based on the
          approximation are guaranteed "off" by some small value, and depending on how much precision you
          need, arc approximation is either going to be super useful, or completely useless. It's up to you
          to decide which, based on your application!</p>
      </section>
    );
  }
});

module.exports = keyHandling(Introduction);
