var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");

var atan2 = Math.atan2, sqrt = Math.sqrt, sin = Math.sin, cos = Math.cos;

var PolyBezier = React.createClass({
  getDefaultProps: function() {
    return {
      title: "Forming poly-Bézier curves"
    };
  },

  setupQuadratic: function(api) {
    var w = api.getPanelWidth(),
        h = api.getPanelHeight(),
        cx = w/2, cy = h/2, pad = 40,
        pts = [
          // first curve:
          {x:cx,y:pad}, {x:w-pad,y:pad}, {x:w-pad,y:cy},
          // subsequent curve
          {x:w-pad,y:h-pad}, {x:cx,y:h-pad},
          // subsequent curve
          {x:pad,y:h-pad}, {x:pad,y:cy},
          // final curve control point
          {x:pad,y:pad}
        ];
    api.lpts = pts;
  },

  setupCubic: function(api) {
    var w = api.getPanelWidth(),
        h = api.getPanelHeight(),
        cx = w/2, cy = h/2, pad = 40,
        r = (w - 2*pad)/2,
        k = 0.55228,
        kr = k*r,
        pts = [
          // first curve:
          {x:cx,y:pad}, {x:cx+kr,y:pad}, {x:w-pad,y:cy-kr}, {x:w-pad,y:cy},
          // subsequent curve
          {x:w-pad,y:cy+kr}, {x:cx+kr,y:h-pad}, {x:cx,y:h-pad},
          // subsequent curve
          {x:cx-kr,y:h-pad}, {x:pad,y:cy+kr}, {x:pad,y:cy},
          // final curve control point
          {x:pad,y:cy-kr}, {x:cx-kr,y:pad}
        ];
    api.lpts = pts;
  },

  movePointsQuadraticLD: function(api, i) {
    // ...we need to move _everything_
    var anchor, fixed, toMove;
    for(var p=1; p<4; p++) {
      anchor = i + (2*p - 2) + api.lpts.length;
      anchor = api.lpts[anchor % api.lpts.length];
      fixed = i + (2*p - 1);
      fixed = api.lpts[fixed % api.lpts.length];
      toMove = i + 2*p;
      toMove = api.lpts[toMove % api.lpts.length];
      toMove.x = fixed.x + (fixed.x - anchor.x);
      toMove.y = fixed.y + (fixed.y - anchor.y);
    }
  },

  movePointsCubicLD: function(api, i) {
    var toMove, fixed;
    if (i%3 === 1) {
      fixed = i-1;
      fixed += (fixed < 0) ? api.lpts.length : 0;
      toMove = i-2;
      toMove += (toMove < 0) ? api.lpts.length : 0;
    } else {
      fixed = (i+1) % api.lpts.length;
      toMove = (i+2) % api.lpts.length;
    }
    fixed = api.lpts[fixed];
    toMove = api.lpts[toMove];
    toMove.x = fixed.x + (fixed.x - api.mp.x);
    toMove.y = fixed.y + (fixed.y - api.mp.y);
  },

  linkDerivatives: function(evt, api) {
    if (api.mp) {
      var quad = api.lpts.length === 8;
      var i = api.mp_idx;
      if (quad && i%2 !== 0) { this.movePointsQuadraticLD(api, i); }
      else if(i%3 !== 0) { this.movePointsCubicLD(api, i); }
    }
  },

  movePointsQuadraticDirOnly: function(api, i) {
    // ...we need to move _everything_  ...again
    var anchor, fixed, toMove;

    // move left and right
    [-1,1].forEach(v => {
      anchor = api.mp;
      fixed = i + v + api.lpts.length;
      fixed = api.lpts[fixed % api.lpts.length];
      toMove = i + 2*v + api.lpts.length;
      toMove = api.lpts[toMove % api.lpts.length];
      var a = atan2(fixed.y - anchor.y, fixed.x - anchor.x),
          dx = toMove.x - fixed.x,
          dy = toMove.y - fixed.y,
          d = sqrt(dx*dx + dy*dy);
      toMove.x = fixed.x + d*cos(a);
      toMove.y = fixed.y + d*sin(a);
    });

    // then, the furthest point cannot be computed properly!
    toMove = i + 4;
    toMove = api.lpts[toMove % api.lpts.length];
    api.problem = toMove;
  },

  movePointsCubicDirOnly: function(api, i) {
    var toMove, fixed;
    if (i%3 === 1) {
      fixed = i-1;
      fixed += (fixed < 0) ? api.lpts.length : 0;
      toMove = i-2;
      toMove += (toMove < 0) ? api.lpts.length : 0;
    } else {
      fixed = (i+1) % api.lpts.length;
      toMove = (i+2) % api.lpts.length;
    }
    fixed = api.lpts[fixed];
    toMove = api.lpts[toMove];
    var a = atan2(fixed.y - api.mp.y, fixed.x - api.mp.x),
        dx = toMove.x - fixed.x,
        dy = toMove.y - fixed.y,
        d = sqrt(dx*dx + dy*dy);
    toMove.x = fixed.x + d*cos(a);
    toMove.y = fixed.y + d*sin(a);
  },

  linkDirection: function(evt, api) {
    if (api.mp) {
      var quad = api.lpts.length === 8;
      var i = api.mp_idx;
      if (quad && i%2 !== 0) { this.movePointsQuadraticDirOnly(api, i); }
      else if(i%3 !== 0) { this.movePointsCubicDirOnly(api, i); }
    }
  },

  bufferPoints: function(evt, api) {
    api.bpts = JSON.parse(JSON.stringify(api.lpts));
  },

  moveQuadraticPoint: function(api, i) {
    this.moveCubicPoint(api,i);

    // then move the other control points
    [-1,1].forEach(v => {
      var anchor = i - v + api.lpts.length;
      anchor = api.lpts[anchor % api.lpts.length];
      var fixed = i - 2*v + api.lpts.length;
      fixed = api.lpts[fixed % api.lpts.length];
      var toMove = i - 3*v + api.lpts.length;
      toMove = api.lpts[toMove % api.lpts.length];
      var a = atan2(fixed.y - anchor.y, fixed.x - anchor.x),
          dx = toMove.x - fixed.x,
          dy = toMove.y - fixed.y,
          d = sqrt(dx*dx + dy*dy);
      toMove.x = fixed.x + d*cos(a);
      toMove.y = fixed.y + d*sin(a);
    });

    // then signal a problem
    var toMove = i + 4;
    toMove = api.lpts[toMove % api.lpts.length];
    api.problem = toMove;
  },

  moveCubicPoint: function(api, i) {
    var op = api.bpts[i],
        np = api.lpts[i],
        dx = np.x - op.x,
        dy = np.y - op.y,
        len = api.lpts.length,
        l = i-1+len,
        r = i+1,
        // original left and right
        ol = api.bpts[l % len],
        or = api.bpts[r % len],
        // current left and right
        nl = api.lpts[l % len],
        nr = api.lpts[r % len];
    // update current left
    nl.x = ol.x + dx;
    nl.y = ol.y + dy;
    // update current right
    nr.x = or.x + dx;
    nr.y = or.y + dy;
    return {x:dx, y:dy};
  },

  modelCurve: function(evt, api) {
    if (api.mp) {
      var quad = api.lpts.length === 8;
      var i = api.mp_idx;
      if (quad) {
        if (i%2 !== 0) { this.movePointsQuadraticDirOnly(api, i); }
        else { this.moveQuadraticPoint(api, i); }
      }
      else {
        if(i%3 !== 0) { this.movePointsCubicDirOnly(api, i); }
        else { this.moveCubicPoint(api, i); }
      }
    }
  },

  draw: function(api, curves) {
    api.reset();
    var pts = api.lpts;
    var quad = pts.length === 8;

    var c1 = quad ? new api.Bezier(pts[0],pts[1],pts[2]) : new api.Bezier(pts[0],pts[1],pts[2],pts[3]);
    api.drawSkeleton(c1, false, true);
    api.drawCurve(c1);

    var c2 = quad ? new api.Bezier(pts[2],pts[3],pts[4]) : new api.Bezier(pts[3],pts[4],pts[5],pts[6]);
    api.drawSkeleton(c2, false, true);
    api.drawCurve(c2);

    var c3 = quad ? new api.Bezier(pts[4],pts[5],pts[6]) : new api.Bezier(pts[6],pts[7],pts[8],pts[9]);
    api.drawSkeleton(c3, false, true);
    api.drawCurve(c3);

    var c4 = quad ? new api.Bezier(pts[6],pts[7],pts[0]) : new api.Bezier(pts[9],pts[10],pts[11],pts[0]);
    api.drawSkeleton(c4, false, true);
    api.drawCurve(c4);

    if (api.problem) {
      api.setColor("red");
      api.drawCircle(api.problem,5);
    }
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>Much like lines can be chained together to form polygons, Bézier curves can be chained together
        to form poly-Béziers, and the only trick required is to make sure that:</p>

        <ol>
          <li>the end point of each section is the starting point of the following section, and</li>
          <li>the derivatives across that dual point line up.</li>
        </ol>

        <p>Unless, of course, you want discontinuities; then you don't even need 2.</p>

        <p>We'll cover three forms of poly-Bézier curves in this section. First, we'll look at the kind
        that just follows point 1. where the end point of a segment is the same point as the start point
        of the next segment. This leads to poly-Béziers that are pretty hard to work with, but they're
        the easiest to implement:</p>

        <Graphic preset="poly" title="Loosely connected quadratic poly-Bézier" setup={this.setupQuadratic} draw={this.draw}/>
        <Graphic preset="poly" title="Loosely connected cubic poly-Bézier" setup={this.setupCubic} draw={this.draw}/>

        <p>Dragging the control points around only affects the curve segments that the control point belongs
        to, and moving an on-curve point leaves the control points where they are, which is not the most useful
        for practical modelling purposes. So, let's add in the logic we need to make things a little better.
        We'll start by linking up control points by ensuring that the "incoming" derivative at an on-curve
        point is the same as it's "outgoing" derivative:</p>

        <p>\[
          B'(1)_n = B'(0)_{n+1}
        \]</p>

        <p>We can effect this quite easily, because we know that the vector from a curve's last control point
        to its last on-curve point is equal to the derivative vector. If we want to ensure that the first control
        point of the next curve matches that, all we have to do is mirror that last control point through the
        last on-curve point. And mirroring any point A through any point B is really simple:</p>

        <p>\[
          Mirrored = \left [
            \begin{matrix} B_x + (B_x - A_x) \\  B_y + (B_y - A_y) \end{matrix}
          \right ] = \left [
            \begin{matrix} 2B_x - A_x \\  2B_y - A_y \end{matrix}
          \right ]
        \]</p>

        <p>So let's implement that and see what it gets us. The following two graphics show a quadratic
        and a cubic poly-Bézier curve again, but this time moving the control points around moves others,
        too. However, you might see something unexpected going on for quadratic curves...</p>

        <Graphic preset="poly" title="Loosely connected quadratic poly-Bézier" setup={this.setupQuadratic} draw={this.draw}
                 onMouseMove={this.linkDerivatives}/>
        <Graphic preset="poly" title="Loosely connected cubic poly-Bézier" setup={this.setupCubic} draw={this.draw}
                 onMouseMove={this.linkDerivatives}/>

        <p>As you can see, quadratic curves are particularly ill-suited for poly-Bézier curves, as all
        the control points are effectively linked. Move one of them, and you move all of them. This means
        that we cannot use quadratic poly-Béziers for anything other than really, really simple shapes.
        And even then, they're probably the wrong choice. Cubic curves are pretty decent, but the fact
        that the derivatives are linked means we can't manipulate curves as well as we might if we
        relaxed the constraints a little.</p>

        <p>So: let's relax the requirement a little.</p>

        <p>We can change the constraint so that we still preserve the <em>angle</em> of the derivatives across
        sections (so transitions from one section to the next will still look natural), but give up the
        requirement that they should also have the same <em>vector length</em>. Doing so will give us a much
        more useful kind of poly-Bézier curve:</p>

        <Graphic preset="poly" title="Loosely connected quadratic poly-Bézier" setup={this.setupQuadratic} draw={this.draw} onMouseMove={this.linkDirection}/>
        <Graphic preset="poly" title="Loosely connected cubic poly-Bézier" setup={this.setupCubic} draw={this.draw} onMouseMove={this.linkDirection}/>

        <p>Cubic curves are now better behaved when it comes to dragging control points around, but the
        quadratic poly-Bézier has a problem: in the example shape, moving one control points will move
        the control points around it properly, but they in turn define "the next" control point and they
        do so in incompatible ways! This is one of the many reasons why quadratic curves are not really
        useful to work with.</p>

        <p>Finally, we also want to make sure that moving the on-curve coordinates preserves the relative
        positions of the associated control points. With that, we get to the kind of curve control that you
        might be familiar with from applications like Photoshop, Inkscape, Blender, etc.</p>

        <Graphic preset="poly" title="Loosely connected quadratic poly-Bézier" setup={this.setupQuadratic} draw={this.draw}
                 onMouseDown={this.bufferPoints} onMouseMove={this.modelCurve}/>
        <Graphic preset="poly" title="Loosely connected cubic poly-Bézier" setup={this.setupCubic} draw={this.draw}
                 onMouseDown={this.bufferPoints} onMouseMove={this.modelCurve}/>

        <p>Again, we see that cubic curves are now rather nice to work with, but quadratic curves have a
        serious problem: we can move an on-curve point in such a way that we can't compute what needs to
        "happen next". Move the top point down, below the left and right points, for instance. There
        is no way to preserve correct control points without a kink at the bottom point. Quadratic curves:
        just not that good...</p>

        <p>A final improvement is to offer fine-level control over which points behave which, so that you can
        have "kinks" or individually controlled segments when you need them, with nicely well-behaved curves
        for the rest of the path. Implementing that, is left as an excercise for the reader.</p>
      </section>
    );
  }
});

module.exports = PolyBezier;
