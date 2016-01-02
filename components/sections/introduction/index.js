var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");

var Introduction = React.createClass({
  getDefaultProps: function() {
    return {
      title: "A lightning introduction"
    };
  },

  drawQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    api.setCurve(curve);
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

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>Let's start with the good stuff: when we're talking about Bézier curves, we're talking about the
        things that you can see in the following graphics. They run from some start point to some end point,
        with their curvature influenced by one or more "intermediate" control points. Now, because all the
        graphics on this page are interactive, go manipulate those curves a bit: click-drag the points,
        and see how their shape changes based on what you do.</p>

        <div className="figure">
          <Graphic inline={true} title="Quadratic Bézier curves" setup={ this.drawQuadratic } draw={ this.drawCurve }/>
          <Graphic inline={true} title="Cubic Bézier curves" setup={ this.drawCubic } draw={ this.drawCurve }/>
        </div>

        <p>These curves are used a lot in computer aided design and computer aided manufacturing (CAD/CAM)
        applications, as well as in graphic design programs like Adobe Illustrator and Photoshop, Inkscape,
        the Gimp, etc. and in graphic technologies like scalable vector graphics (SVG) and OpenType fonts
        (ttf/otf). A lot of things use Bézier curves, so if you want to learn more about them... prepare
        to get your learn on!</p>
      </section>
    );
  }
});

module.exports = Introduction;
