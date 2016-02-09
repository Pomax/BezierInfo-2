var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");

var Explanation = React.createClass({
  getDefaultProps: function() {
    return {
      title: "The Bézier interval [0,1]"
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
        noticed: they always run from <i>t-0</i> to <i>t=1</i>. Why that particular interval?</p>

        <p>It all has to do with how we run from "the start" of our curve to "the end" of our curve. If we have
        a value that is a mixture of two other values, then the general formula for this is:</p>

        <p>\[
          mixture = a \cdot value_1 + b \cdot value_2
        \]</p>

        <p>The obvious start and end values here need to be <i>a=1, b=0</i>, so that the mixed value is 100%
        value 1, and 0% value 2, and <i>a=0, b=1</i>, so that the mixed value is 0% value 1 and 100% value 2.
        Additionally, we don't want "a" and "b" to be independent: if they are, then we could just pick
        whatever values we like, and end up with a mixed value that is, for example, 100% value
        1 <strong>and</strong> 100% value 2. In principle that's fine, but for Bézier curves we always
        want mixed values <em>between</em> the start and end point, so we need to make sure we can
        never set "a" and "b" to some values that lead to a mix value that sums to more than 100%. And
        that's easy:</p>

        <p>\[
          m = a \cdot value_1 + (1 - a) \cdot value_2
        \]</p>

        <p>With this we can guarantee that we never sum above 100%. By restricting <i>a</i> to values
        in the interval [0,1], we will always be somewhere between our two values (inclusively), and
        we will always sum to a 100% mix.</p>

        <p>But... what if we use this form, used in the assumption that we will only ever use values
        between 0 and 1, and instead use values outside of that interval? Do things go horribly wrong?
        Well... not really, but we get to "see more".</p>

        <p>In the case of Bézier curves, extending the interval simply makes our curve "keep going".
        Bézier curves are simply segments on some polynomial curve, so if we pick a wider interval
        we simply get to see more of the curve. So what do they look like?</p>

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
        quite a few graphics packages
        like <a href="https://fontforge.github.io">FontForge</a> and <a href="https://inkscape.org">Inkscape</a>, having
        even been used in font design (such as for the Inconsolata font).</p>
      </section>
    );
  }
});

module.exports = Explanation;
