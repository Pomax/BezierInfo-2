var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");

var sin = Math.sin;
var tau = Math.PI*2;

var ArclengthApprox = React.createClass({
  getDefaultProps: function() {
    return {
      title: "Approximated arc length"
    };
  },

  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    api.setCurve(curve);
    api.steps = 10;
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
    api.steps = 16;
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);

    var pts = curve.getLUT(api.steps);

    var step = 1 / api.steps;
    var p0 = curve.points[0], pc;
    for(var t=step; t<1.0+step; t+=step) {
      pc = curve.get(Math.min(t,1));
      api.setColor("red");
      api.drawLine(p0,pc);
      p0 = pc;
    }

    var len = curve.length();
    var alen = 0;
    for(var i=0,p0,p1,dx,dy; i<pts.length-1; i++) {
      p0 = pts[i];
      p1 = pts[i+1];
      dx = p1.x-p0.x;
      dy = p1.y-p0.y;
      alen += Math.sqrt(dx*dx+dy*dy);
    }
    alen = ((100*alen)|0)/100;
    len = ((100*len)|0)/100;

    api.text("Approximate length, "+api.steps+" steps: "+alen+" (true: "+len+")", {x:10, y: 15});
  },

  values: {
    "38": 1,   // up arrow
    "40": -1,  // down arrow
  },

  onKeyDown: function(e, api) {
    var v = this.values[e.keyCode];
    if(v) {
      e.preventDefault();
      api.steps += v;
      if (api.steps < 1) {
        api.steps = 1;
      }
      console.log(api.steps);
    }
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>Sometimes, we don't actually need the precision of a true arc length, and we can get away with simply computing the
        approximate arc length instead. The by far fastest way to do this is to flatten the curve and then simply calculate
        the linear distance from point to point. This will come with an error, but this can be made arbitrarily small by
        increasing the segment count.</p>

        <p>If we combine the work done in the previous sections on curve flattening and arc length computation, we can
        implement these with minimal effort:</p>

        <Graphic preset="twopanel" title="Approximate quadratic curve arc length" setup={this.setupQuadratic} draw={this.draw} onKeyDown={this.onKeyDown} />
        <Graphic preset="twopanel" title="Approximate cubic curve arc length" setup={this.setupCubic} draw={this.draw} onKeyDown={this.onKeyDown} />

        <p>Try clicking on the sketch and using your up and down arrow keys to lower the number of segments for both
        the quadratic and cubic curve. You may notice that the error in length is actually pretty significant, even if
        the percentage is fairly low: if the number of segments used yields an error of 0.1% or higher, the flattened
        curve already looks fairly obviously flattened. And of course, the longer the curve, the more significant the
        error will be.</p>
      </section>
    );
  }
});

module.exports = ArclengthApprox;

/*

        void setupCurve() {
          setupDefaultQuadratic();
          offsetting();
          offset = 16;
        }

        void drawCurve(BezierCurve curve) {
          additionals();
          curve.draw();

          nextPanel();
          stroke(0);
          float x = curve.getXValue(0),
                y = curve.getYValue(0),
                x2, y2, step = 1/offset, t,
                length=0;
          for(int i=1; i<=offset; i++) {
            t = i*step;
            x2 = curve.getXValue(t);
            y2 = curve.getYValue(t);
            line(x,y,x2,y2);
            length += dist(x,y,x2,y2);
            x = x2;
            y = y2;
          }

          float arclength = curve.getCurveLength();
          float error = 100 * (arclength - length) / arclength;

          length = nfc(length, 3, 3);
          arclength = nfc(arclength, 3, 3);
          error = nfc(error, 3, 3);
          if(error.indexOf(".")===0) { error = "0" + error; }

          fill(0);
          text("Approximate arc length based on "+offset+" segments: " + length, -dim/4, dim-20);
          text("True length: " + arclength + ", error: " + error + "%", -dim/4, dim-5);
        }</textarea>


        void setupCurve() {
          setupDefaultCubic();
          offsetting();
          offset = 24;
        }

        void drawCurve(BezierCurve curve) {
          additionals();
          curve.draw();

          nextPanel();
          stroke(0);
          float x = curve.getXValue(0),
                y = curve.getYValue(0),
                x2, y2, step = 1/offset, t,
                length=0;
          for(int i=1; i<=offset; i++) {
            t = i*step;
            x2 = curve.getXValue(t);
            y2 = curve.getYValue(t);
            line(x,y,x2,y2);
            length += dist(x,y,x2,y2);
            x = x2;
            y = y2;
          }

          float arclength = curve.getCurveLength();
          float error = 100 * (arclength - length) / arclength;

          length = nfc(length, 3, 3);
          arclength = nfc(arclength, 3, 3);
          error = nfc(error, 3, 3);
          if(error.indexOf(".")===0) { error = "0" + error; }

          fill(0);
          text("Approximate arc length based on "+offset+" segments: " + length, -dim/4, dim-20);
          text("True length: " + arclength + ", error: " + error + "%", -dim/4, dim-5);
        }</textarea>

 */