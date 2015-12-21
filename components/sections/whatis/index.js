var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");
var LaTeX = require("../../LaTeX.jsx");


var Whatis = React.createClass({
  interpolation: require("./interpolation"),

  componentWillMount: function() {
    this.setup = this.interpolation.setup.bind(this);
    this.draw = this.interpolation.draw.bind(this);
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props}>What is a Bézier Curve?</SectionHeader>

        <p>Playing with the points for curves may have given you a feel for how Bézier curves behaves, but
        what <em>are</em> Bézier curves, really?</p>

        <p>There are two ways to explain what a Bézier curve is, and they turn out to be the entirely equivalent,
        but one of them uses complicated maths, and the other uses really simple maths. So... let's start
        with the simple explanation:</p>

        <p>Bezier curves are the result of <a href="https://en.wikipedia.org/wiki/Linear_interpolation">linear
        interpolations</a>. That sounds complicated but you've been doing linear interpolation since you were
        very young: any time you had to point at something between two other things, you've been applying
        linear interpolation. It's simply "picking a point between two, points". If we know the distance
        between those two points, and we want a new point that is, say, 20% the distance away from
        the first point (and thus 80% the distance away from the second point) then we can compute that
        really easily:</p>

        <LaTeX>\[
          p_1 = some\ point, \\
          p_2 = some\ other\ point, \\
          distance = (p_2 - p_1), \\
          ratio = \frac{percentage}{100}, \\
          new\ point = p_1 + distance \cdot ratio
        \]</LaTeX>

        <p>So let's look at that in action: the following graphic is interactive in that you can use your
        '+' and '-' keys to increase or decrease the interpolation distance, to see what happens. We start
        with three points, which gives us two lines. Linear interpolation over those lines gives use two
        points, between which we can again perform linear interpolation, yielding a single point. And that
        point, and all points we can form in this way for all distances taken together, form our Bézier curve:</p>

        <Graphic title="Linear Interpolation leading to Bézier curves" setup={this.setup} draw={this.draw}/>

        <p>And that brings us to the complicated maths: calculus. While it doesn't look like that's what we've just done,
        we actually just drew a quadratic curve, in steps, rather than in a single go. One of the fascinating parts
        about Bézier curves is that they can both be described in terms of polynomial functions, as well as in terms
        of very simple interpolations of interpolations of [...]. That it turn means we can look at what these curves
        can do based on both "real maths" (by examining the functions, their derivatives, and all that stuff), as well
        as by looking at the "mechanical" composition (which tells us that a curve will never extend beyond the points
        we used to construct it, for instance)</p>

        <p>So let's start looking at Bézier curves a bit more in depth. Their mathematical expressions, the properties we
        can derive from those, and the various things we can do to, and with, Bézier curves.</p>
      </section>
    );
  }
});

module.exports = Whatis;
