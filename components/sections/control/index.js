var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");
var LaTeX = require("../../LaTeX.jsx");

var Control = React.createClass({
  statics: {
    title: "Controlling Bézier curvatures"
  },

  drawCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
  },

  drawCurve: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);
  },

  drawGraphBasics: function(api, dim, pad, fwh) {
    api.drawLine({x:pad, y:pad}, {x:dim-pad, y:pad});
    api.drawLine({x:pad, y:pad}, {x:pad, y:dim-pad});

    api.setFill("black");

    api.text("t →", {x:dim/2, y: 15});
    api.text("0", {x:pad, y: 15});
    api.text("1", {x:dim-pad, y: 15});

    api.text("S", {x:5, y: dim/2-pad});
    api.text("↓", {x:5, y: dim/2});
    api.text("0%", {x:4, y: pad+5});
    api.text("100%", {x:2, y: dim-pad+10});
  },

  drawFunction: function(api, label, where, generator) {
    api.setRandomColor();
    api.drawFunction(generator);
    api.setFill(api.getColor());
    if (!!label) api.text(label, where);
  },

  drawLerpBox: function(api, dim, pad, p) {
    api.noColor();
    api.setFill("rgba(0,0,100,0.2)");
    var p1 = {x: p.x-5, y:pad},
        p2 = {x:p.x + 5, y:dim};
    api.drawRect(p1, p2);
    api.setColor("black");
  },

  drawLerpPoint: function(api, tf, pad, fwh, p) {
    p.y = pad + tf*fwh;
    api.drawCircle(p, 3)
    api.setFill("black");
    api.text(((tf*10000)|0)/100 + "%", {x:p.x+10, y:p.y+4});
    api.noFill();
  },

  drawQuadraticLerp: function(api) {
    api.reset();

    var dim = api.getPanelWidth(),
        pad = 20,
        fwh = dim - pad*2;
    this.drawGraphBasics(api, dim, pad, fwh);

    var p = api.hover;
    if (p && p.x >= pad && p.x <= dim-pad) {
      this.drawLerpBox(api, dim, pad, p);
      var t = (p.x-pad)/fwh, tf;
      this.drawLerpPoint(api, (1-t)*(1-t), pad, fwh, p);
      this.drawLerpPoint(api, 2*(1-t)*(t), pad, fwh, p);
      this.drawLerpPoint(api, (t)*(t), pad, fwh, p);
    }

    this.drawFunction(api, "first term", {x: pad*2, y: fwh}, function(t) {
      return {
        x: pad + t * fwh,
        y: pad + fwh * (1-t) * (1-t)
      };
    });
    this.drawFunction(api, "second term", {x: dim/2 - 1.5*pad, y: dim/2 + pad}, function(t) {
      return {
        x: pad + t * fwh,
        y: pad + fwh * 2 * (1-t) * (t)
      };
    });
    this.drawFunction(api, "third term", {x: fwh - pad*2.5, y: fwh}, function(t) {
      return {
        x: pad + t * fwh,
        y: pad + fwh * (t) * (t)
      };
    });
  },

  drawCubicLerp: function(api) {
    api.reset();

    var dim = api.getPanelWidth(),
        pad = 20,
        fwh = dim - pad*2;
    this.drawGraphBasics(api, dim, pad, fwh);

    var p = api.hover;
    if (p && p.x >= pad && p.x <= dim-pad) {
      this.drawLerpBox(api, dim, pad, p);
      var t = (p.x-pad)/fwh, tf;
      this.drawLerpPoint(api, (1-t)*(1-t)*(1-t), pad, fwh, p);
      this.drawLerpPoint(api, 2*(1-t)*(1-t)*(t), pad, fwh, p);
      this.drawLerpPoint(api, 3*(1-t)*(t)*(t), pad, fwh, p);
      this.drawLerpPoint(api, (t)*(t)*(t), pad, fwh, p);
    }

    this.drawFunction(api, "first term", {x: pad*2, y: fwh}, function(t) {
      return {
        x: pad + t * fwh,
        y: pad + fwh * (1-t) * (1-t) * (1-t)
      };
    });
    this.drawFunction(api, "second term", {x: dim/2 - 4*pad, y: dim/2 }, function(t) {
      return {
        x: pad + t * fwh,
        y: pad + fwh * 3 * (1-t) * (1-t) * (t)
      };
    });
    this.drawFunction(api, "third term", {x: dim/2 + 2*pad, y: dim/2}, function(t) {
      return {
        x: pad + t * fwh,
        y: pad + fwh * 3 * (1-t) * (t) * (t)
      };
    });
    this.drawFunction(api, "fourth term", {x: fwh - pad*2.5, y: fwh}, function(t) {
      return {
        x: pad + t * fwh,
        y: pad + fwh * (t) * (t) * (t)
      };
    });
  },

  draw15thLerp: function(api) {
    api.reset();

    var dim = api.getPanelWidth(),
        pad = 20,
        fwh = dim - pad*2;
    this.drawGraphBasics(api, dim, pad, fwh);

    var factors = [1,15,105,455,1365,3003,5005,6435,6435,5005,3003,1365,455,105,15,1]

    var p = api.hover;
    if (p && p.x >= pad && p.x <= dim-pad) {
      this.drawLerpBox(api, dim, pad, p);
      for(var n=0; n<=15; n++) {
        var t = (p.x-pad)/fwh,
            tf = factors[n] * Math.pow(1-t, 15-n) * Math.pow(t, n);
        this.drawLerpPoint(api, tf, pad, fwh, p);
      }
    }

    for(var n=0; n<=15; n++) {
      var label = false, position = false;
      if (n===0) {
        label = "first term";
        position = {x: pad + 5, y: fwh};
      }
      if (n===15) {
        label = "last term";
        position = {x: dim - 3.5*pad, y: fwh};
      }
      this.drawFunction(api, label, position, function(t) {
        return {
          x: pad + t * fwh,
          y: pad + fwh * factors[n] * Math.pow(1-t, 15-n) * Math.pow(t, n)
        };
      });
    }
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props}>{ Control.title }</SectionHeader>

        <p>Bézier curves are (like all "splines") interpolation functions, meaning they take a set of
        points, and generate values somewhere "between" those points. (One of the consequences of this
        is that you'll never be able to generate a point that lies outside the outline for the control
        points, commonly called the "hull" for the curve. Useful information!). In fact, we can visualize
        how each point contributes to the value generated by the function, so we can see which points are
        important, where, in the curve.</p>

        <p>The following graphs show the interpolation functions for quadratic and cubic curves, with "S"
        being the strength of a point's contribution to the total sum of the Bézier function. Click or
        click-drag to see the interpolation percentages for each curve-defining point at a
        specific <i>t</i> value.</p>

        <div className="figure">
          <Graphic inline={true} preset="simple" title="Quadratic interpolations"  draw={this.drawQuadraticLerp}/>
          <Graphic inline={true} preset="simple" title="Cubic interpolations"      draw={this.drawCubicLerp}/>
          <Graphic inline={true} preset="simple" title="15th order interpolations" draw={this.draw15thLerp}/>
        </div>

        <p>Also shown is the interpolation function for a 15<sup>th</sup> order Bézier function. As you can see,
        the start and end point contribute considerably more to the curve's shape than any other point
        in the control point set.</p>

        <p>If we want to change the curve, we need to change the weights of each point, effectively changing
        the interpolations. The way to do this is about as straight forward as possible: just multiply each
        point with a value that changes its strength. These values are conventionally called "Weights", and
        we can add them to our original Bézier function:</p>

        <LaTeX>\[
          Bézier(n,t) = \sum_{i=0}^{n}
                        \underset{binomial\ term}{\underbrace{\binom{n}{i}}}
                        \cdot\
                        \underset{polynomial\ term}{\underbrace{(1-t)^{n-i} \cdot t^{i}}}
                        \cdot\
                        \underset{weight}{\underbrace{w_i}}
        \]</LaTeX>

        <p>That looks complicated, but as it so happens, the "weights" are actually just the coordinate values
        we want our curve to have: for an <i>n<sup>th</sup></i> order curve, w<sub>0</sub> is our start coordinate,
        w<sub>n</sub> is our last coordinate, and everything in between is a controlling coordinate. Say we want
        a cubic curve that starts at (120,160), is controlled by (35,200) and (220,260) and ends at (220,40),
        we use this Bézier curve:</p>

        <LaTeX>\[
        \left \{ \begin{matrix}
          x = BLUE[120] \cdot (1-t)^3 + BLUE[35] \cdot 3 \cdot (1-t)^2 \cdot t + BLUE[220] \cdot 3 \cdot (1-t) \cdot t^2 + BLUE[220] \cdot t^3 \\
          y = BLUE[160] \cdot (1-t)^3 + BLUE[200] \cdot 3 \cdot (1-t)^2 \cdot t + BLUE[260] \cdot 3 \cdot (1-t) \cdot t^2 + BLUE[40] \cdot t^3
        \end{matrix} \right. \]</LaTeX>

        <p>Which gives us the curve we saw at the top of the article:</p>

        <Graphic preset="simple" title="Our cubic Bézier curve" setup={this.drawCubic} draw={this.drawCurve}/>

        <p>What else can we do with Bézier curves? Quite a lot, actually. The rest of this article covers
        a multitude of possible operations and algorithms that we can apply, and the tasks they achieve.</p>

        <div className="howtocode">
          <h3>How to implement the weighted basis function</h3>

          <p>Given that we already know how to implement basis function, adding in the control points
          is remarkably easy:</p>

<pre>function Bezier(n,t,w[]):
  sum = 0
  for(k=0; k&lt;n; k++):
    sum += w[k] * binomial(n,k) * (1-t)^(n-k) * t^(k)
  return sum</pre>

          <p>And for the extremely optimized versions:</p>

<pre>function Bezier(2,t,w[]):
  t2 = t * t
  mt = 1-t
  mt2 = mt * mt
  return w[0]*mt2 + w[1]*2*mt*t + w[2]*t2

function Bezier(3,t,w[]):
  t2 = t * t
  t3 = t2 * t
  mt = 1-t
  mt2 = mt * mt
  mt3 = mt2 * mt
  return w[0]*mt3 + 3*w[1]*mt2*t + 3*w[2]*mt*t2 + w[3]*t3</pre>

          <p>And now we know how to program the weighted basis function.</p>
        </div>


      </section>
    );
  }
});

module.exports = Control;





/**

        <textarea class="sketch-code" data-sketch-preset="ratios" data-sketch-title="Quadratic interpolations">
        int order = 3;
        </textarea>

        <textarea class="sketch-code" data-sketch-preset="ratios" data-sketch-title="Cubic interpolations">
        int order = 4;
        </textarea>

        <textarea class="sketch-code" data-sketch-preset="ratios" data-sketch-title="15th order interpolations">
        int order = 15;
        </textarea>

 **/

/**

        void setupCurve() {
          setupDefaultCubic();
        }

        void drawCurve(BezierCurve curve) {
          curve.draw();
        }</Graphic>


**/

