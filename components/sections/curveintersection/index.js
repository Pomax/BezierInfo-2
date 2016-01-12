var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");

var abs = Math.abs;

var CurveIntersections = React.createClass({
  getDefaultProps: function() {
    return {
      title: "Curve/curve intersection"
    };
  },

  setup: function(api) {
    this.api = api;
    api.setPanelCount(3);
    var curve1 = new api.Bezier(10,100,90,30,40,140,220,220);
    var curve2 = new api.Bezier(5,150,180,20,80,250,210,190);
    api.setCurve(curve1, curve2);
    this.pairReset();
  },

  pairReset: function() {
    this.prevstep = 0;
    this.step = 0;
  },

  draw: function(api, curves) {
    api.reset();
    var offset = {x:0, y:0};
    curves.forEach(curve => {
      api.drawSkeleton(curve);
      api.drawCurve(curve);
    });

    // next panel: iterations
    var w = api.getPanelWidth();
    var h = api.getPanelHeight();
    offset.x += w;
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);

    if (this.step === 0) {
      this.pairs = [{c1: curves[0], c2: curves[1]}];
    }

    if(this.step !== this.prevstep) {
      var pairs = this.pairs;
      this.pairs = [];
      this.finals = [];
      pairs.forEach(p => {

        if(p.c1.length() < 0.6 && p.c2.length() < 0.6) {
          return this.finals.push(p);
        }

        var s1 = p.c1.split(0.5);
        api.setColor("black");
        api.drawCurve(p.c1, offset);
        api.setColor("red");
        api.drawbbox(s1.left.bbox(), offset);
        api.drawbbox(s1.right.bbox(), offset);

        var s2 = p.c2.split(0.5);
        api.setColor("black");
        api.drawCurve(p.c2, offset);
        api.setColor("blue");
        api.drawbbox(s2.left.bbox(), offset);
        api.drawbbox(s2.right.bbox(), offset);

        if (s1.left.overlaps(s2.left)) { this.pairs.push({c1: s1.left, c2: s2.left}); }
        if (s1.left.overlaps(s2.right)) { this.pairs.push({c1: s1.left, c2: s2.right}); }
        if (s1.right.overlaps(s2.left)) { this.pairs.push({c1: s1.right, c2: s2.left}); }
        if (s1.right.overlaps(s2.right)) { this.pairs.push({c1: s1.right, c2: s2.right}); }
      });
      this.prevstep = this.step;
    } else {
      this.pairs.forEach(p => {
        api.setColor("black");
        api.drawCurve(p.c1, offset);
        api.drawCurve(p.c2, offset);
        api.setColor("red");
        api.drawbbox(p.c1.bbox(), offset);
        api.setColor("blue");
        api.drawbbox(p.c2.bbox(), offset);
      });
    }

    if (this.pairs.length === 0) {
      this.pairReset();
      this.draw(api, curves);
    }

    // next panel: results
    offset.x += w;
    api.setColor("black");
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);

    // get intersections as coordinates
    var results = curves[0].intersects(curves[1]).map(s => {
      var tvals = s.split('/').map(v => parseFloat(v));
      return {t1: tvals[0], t2: tvals[1]};
    });

    // filter out likely duplicates
    var curr = results[0], _, i, same = ((a,b) => abs(a.t1-b.t1) < 0.01 && abs(a.t2-b.t2) < 0.01);
    for(i=1; i<results.length; i++) {
      _ = results[i];
      if (same(curr, _)) {
        results.splice(i--,1);
      } else { curr = _; }
    }

    api.setColor("lightblue");
    api.drawCurve(curves[0], offset);
    api.drawCurve(curves[1], offset);

    api.setColor("blue");
    results.forEach(tvals => {
      api.drawCircle(curves[0].get(tvals.t1), 3, offset);
    });
  },

  stepUp: function() {
    this.step++;
    this.api.redraw();
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>Using de Casteljau's algorithm to split the curve we can now implement curve/curve intersection
        finding using a "divide and conquer" technique:</p>

        <ul>
          <li>Take two curves <i>C<sub>1</sub></i> and <i>C<sub>2</sub></i>, and treat them as a pair.</li>
          <li>If their bounding boxes overlap, split up each curve into two sub-curves</li>
          <li>With <i>C<sub>1.1</sub></i>, <i>C<sub>1.2</sub></i>, <i>C<sub>2.1</sub></i> and <i>C<sub>2.2</sub></i>, form
              four new pairs (<i>C<sub>1.1</sub></i>,<i>C<sub>2.1</sub></i>), (<i>C<sub>1.1</sub></i>, <i>C<sub>2.2</sub></i>), (<i>C<sub>1.2</sub></i>,<i>C<sub>2.1</sub></i>), and (<i>C<sub>1.2</sub></i>,<i>C<sub>2.2</sub></i>).</li>
          <li>For each pair, check whether their bounding boxes overlap.
            <ul>
              <li>If their bounding boxes do not overlap, discard the pair, as there is no intersection between this pair of curves.</li>
              <li>If there <em>is</em> overlap, rerun all steps for this pair.</li>
            </ul>
          </li>
          <li>Once the sub-curves we form are so small that they effectively occupy sub-pixel areas, we consider an intersection found.</li>
        </ul>

        <p>This algorithm will start with a single pair, "balloon" until it runs in parallel for a large
        number of potential sub-pairs, and then taper back down as it homes in on intersection coordinates,
        ending up with as many pairs as there are intersections.</p>

        <p>The following graphic applies this algorithm to a pair of cubic curves, one step at a time, so
        you can see the algorithm in action. Click the button to run a single step in the algorithm,
        after setting up your curves in some creative arrangement. The algorithm resets once it's found
        a solution, so you can try this with lots of different curves (can you find the configuration
        that yields the maximum number of intersections between two cubic curves? Nine intersections!)</p>

        <Graphic preset="clipping" title="Curve/curve intersections" setup={this.setup} draw={this.draw}>
          <button onClick={this.stepUp}>advance one step</button>
        </Graphic>

        <p>Self-intersection is dealt with in the same way, except we turn a curve into two or more curves first
        based on the inflection points. We then form all possible curve pairs with the resultant segments, and
        run exactly the same algorithm. All non-overlapping curve pairs will be removed after the first iteration,
        and the remaining steps home in on the curve's self-intersection points.</p>
      </section>
    );
  }
});

module.exports = CurveIntersections;
