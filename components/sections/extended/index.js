var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");

var Explanation = React.createClass({
  getDefaultProps: function() {
    return {
      title: "The Bézier interval"
    };
  },

  setupQuadratic: function(api) {
    var curve = new api.Bezier(70, 155, 20, 110, 100,75);
    api.setCurve(curve);
  },

  setupCubic: function(api) {
    var curve = new api.Bezier(60,105, 75,30, 215,115, 140,160);
    api.setCurve(curve);
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);
    api.setColor("lightgrey");

    var t, step=0.05, min=-10;
    var pt = curve.get(min - step), pn;
    for (t=min; t<=step; t+=step) {
      pn = curve.get(t);
      api.drawLine(pt, pn);
      pt = pn;
    }

    pt = curve.get(1);
    var max = 10;
    for (t=1+step; t<=max; t+=step) {
      pn = curve.get(t);
      api.drawLine(pt, pn);
      pt = pn;
    }
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>Now that we know the mathematics behind Bézier curves, there's one curious thing that you may have
        noticed: they always run from <i>t-0</i> to <i>t=1</i>. That might seem obvious, but even if you're
        a seasoned mathematician, the first question you should have when you see that is "Why?", because
        it's fairly arbitrary. Or, at least, it would seem arbitrary.</p>

        <p>It's actually mostly to do with how we run from "the start" of our curve to "the end" of our curve.
        We want the curve to start at the first coordinate we define, and end at the last coordinate we define,
        and that pretty much tells us we want the interval [0,1], because of interpolation. If we want to mix
        two values, the easiest way to do that is to use the super simple formula</p>

        <p>\[
          mixture = a \cdot value_1 + b \cdot value_2
        \]</p>

        <p>but this is two variables, and that's inconvenient. If we can express that <i>b</i> in terms
        of <i>a</i> we'll be much better off, and the easiest way to do that is to do something like this:</p>

        <p>\[
          m = a \cdot value_1 + f(a) \cdot value_2
        \]</p>

        <p>Now, if we pick the following, things get really easy:</p>

        <p>\[
          m = a \cdot value_1 + f(a)=(C-a) \cdot value_2, C = constant
        \]</p>

        <p>I know, that doesn't look easier, but the important part is the "C - a" part. All we're doing is
        subtracting <i>a</i> from a constant, plain number. And the most obvious number in mathematics is
        the "unit" number. That would be 1.</p>

        <p>\[
          m = a \cdot value_1 + (1-a) \cdot value_2
        \]</p>

        <p>By picking any number <i>a</i> between 0 and 1, we can now cover the full mix of 100% value 1, 0% value 2,
        to 0% value 1 and 100% value 2.</p>

        <p>but... it's just an "artificial" restriction, what if we use the functions that assume our values
        are going to be between 0 and 1, and instead feed them values outside of that interval? In the case
        of Bézier curves, not a whole lot: the curve simply "keeps going" in what become more and more of a
        straight line, as the polynomials "straighten out". Because of the polynomial form that Bézier curves
        use, most of the curvy bits are in the [0,1] interval, but let's plot some Bézier curves without
        that interval restriction. What do they look like?</p>

        <p>The following two graphics show you Bézier curves rendered "the usual way", as well as the curves
        they "lie on" if we were to extend the <i>t</i> values much further. As you can see, there's a lot
        more "shape" hidden in the rest of the curve, and we can model those parts by moving the curve
        points around.</p>

        <Graphic preset="simple" title="Quadratic infinite internval Bézier curve" setup={this.setupQuadratic} draw={this.draw} />
        <Graphic preset="simple" title="Cubic infinite internval Bézier curve" setup={this.setupCubic} draw={this.draw} />

        <p>In fact, there are curves used in graphics design and computer modelling that do the opposite
        of Bézier curves, where rather than fixing the interval, and giving you free coordinates, they fix
        the coordinates, but give you freedom over the interval. A great example of this is the <a href="http://levien.com/phd/phd.html">"Spiro"
        curve</a>, which is a curve based on part of a <a href="https://en.wikipedia.org/wiki/Euler_spiral">Cornu Spiral, also
        known as Euler's Spiral</a>. It's a very easthetically pleasing curve and you'll find it in
        quite a few graphics packages like Illustrator and Inkscape, having even been used in font
        design (such as for the Inconsolata font).</p>
      </section>
    );
  }
});

module.exports = Explanation;
