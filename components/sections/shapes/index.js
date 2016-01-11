var React = require("react");
var Graphic = require("../../Graphic.jsx");
var SectionHeader = require("../../SectionHeader.jsx");

var Shapes = React.createClass({
  getDefaultProps: function() {
    return {
      title: "Boolean shape operations"
    };
  },

  formPath: function(api, mx, my, w, h) {
    mx = mx || 0;
    my = my || 0;
    var unit  = 30;
    var unit2 = unit/2;
    w = w || 8 * unit;
    h = h || 4 * unit;
    var w2 = w/2;
    var h2 = h/2;
    var ow3 = w2/3;
    var oh3 = h2/3;

    var Paper = api.Paper;
    var Path = Paper.Path;
    var Point = Paper.Point;
    var path = new Path();

    path.moveTo(
      new Point(mx-w2 + unit*2, my-h2)
    );
    path.cubicCurveTo(
      new Point(mx-w2 + unit2, my-h2 + unit2),
      new Point(mx-w2 + unit2, my+h2 - unit2),
      new Point(mx-w2 + unit*2,  my+h2)
    );
    path.cubicCurveTo(
      new Point(mx-ow3,       my+oh3),
      new Point(mx+ow3,       my+oh3),
      new Point(mx+w2 - unit*2, my+h2)
    );
    path.cubicCurveTo(
      new Point(mx+w2 - unit2, my+h2 - unit2),
      new Point(mx+w2 - unit2, my-h2 + unit2),
      new Point(mx+w2 - unit*2,  my-h2)
    );
    path.cubicCurveTo(
      new Point(mx+ow3,       my-oh3),
      new Point(mx-ow3,       my-oh3),
      new Point(mx-w2 + unit*2, my-h2)
    );
    path.closePath(true);
    path.strokeColor = "rgb(100,100,255)";
    return path;
  },

  setup: function(api) {
    var dim = api.getPanelWidth();
    var pad = 40;
    var cx = dim/2;
    var cy = dim/2;
    api.c1 = this.formPath(api, cx, cy);
    cx += pad;
    cy += pad;
    api.c2 = this.formPath(api, cx, cy);
  },

  onMouseMove: function(evt, api) {
    var cx = evt.offsetX;
    var cy = evt.offsetY;
    api.c2.position = {x:cx, y:cy};
  },

  draw: function(api) {
    if (api.c3) { api.c3.remove(); }
    var c1 = api.c1,
        c2 = api.c2,
        c3 = api.c3 = c1.unite(c2);
    c3.strokeColor = "red";
    api.Paper.view.draw();
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>We can apply the topics covered so far in this primer to effect boolean shape operations:
        getting the union, intersection, or exclusion, between two or more shapes that involve Bézier
        curves. For simplicity (well.. sort of, more homogeneity), we'll be looking at Poly-Bézier
        shapes only, but a shape that consists of a mix of lines and Bézier curves is technically a
        simplification (although it does mean we need to write a definition for the class of shapes
        that mix lines and Bézier curves. Since poly-Bézier curves are a superset, we'll be using
        those in the following examples)</p>

        <p>The procedure for performing boolean operations consists, broadly, of four steps:</p>

        <ol>
          <li>Find the intersection points between both shapes,</li>
          <li>cut up the shapes into multiple sections between these intersections,</li>
          <li>discard any section that isn't part of the desired operation's resultant shape, and</li>
          <li>link up the remaining sections to form the new shape.</li>
        </ol>

        <p>Finding all intersections between two poly-Bézier curves, or any poly-line-section shape,
        is similar to the iterative algorithm discussed in the section on curve/curve intersection.
        For each segment in the poly-Bézier curve we check whether its bounding box overlaps with
        any of the segment bounding boxes in the other poly-Bézier curve. If so, we run normal
        intersection detection.</p>

        <p>After we found all intersection points, we split up our poly-Bézier curves, making sure to
        record which of the newly formed poly-Bézier curves might potentially link up at the points
        we split the originals up at. This will let us quickly glue poly-Bézier curves back together
        after the next step.</p>

        <p>Once we have all the new poly-Bézier curves, we run the first step of the desired boolean
        operation.</p>

        <ul>
          <li>Union: discard all poly-Bézier curves that lie "inside" our union of our shapes. E.g. if
          we want the union of two overlapping circles, the resulting shape is the outline.</li>
          <li>Intersection: discard all poly-Bézier curves that lie "outside" the intersection of the
          two shapes. E.g. if we want the intersection of two overlapping circles, the resulting
          shape is the tapered ellipse where they overlap.</li>
          <li>Exclusion: none of the sections are discarded, but we will need to link the shapes back
          up in a special way. Flip any section that would qualify for removal under UNION rules.</li>
        </ul>

        <table className="sketch"><tbody><tr><td className="labeled-image">
          <img src="images/op_base.gif" height="169px"/>
          <p>Two overlapping shapes.</p>
        </td><td className="labeled-image">
          <img src="images/op_union.gif" height="169px"/>
          <p>The unified region.</p>
        </td><td className="labeled-image">
          <img src="images/op_intersection.gif" height="169px"/>
          <p>Their intersection.</p>
        </td><td className="labeled-image">
          <img src="images/op_exclusion.gif" height="169px"/>
          <p>Their exclusion regions.</p>
        </td></tr></tbody></table>

        <p>The main complication in the outlined procedure here is determining how sections qualify
        in terms of being "inside" and "outside" of our shapes. For this, we need to be able to
        perform point-in-shape detection, for which we'll use a classic algorithm: getting the
        "crossing number" by using ray casting, and then testing for "insidedness" by applying
        the <a href="http://folk.uio.no/bjornw/doc/bifrost-ref/bifrost-ref-12.html">even-odd
        rule</a>: For any point and any shape, we can cast a ray from our point, to some point that we know
        lies outside of the shape (such as a corner of our drawing surface). We then count how many
        times that line crosses our shape (remember that we can perform line/curve intersection
        detection quite easily). If the number of times it crosses the shape's outline is even,
        the point did not actually lie inside our shape. If the number of intersections is odd,
        our point did lie inside out shape. With that knowledge, we can decide whether to treat
        a section that such a point lies on "needs removal" (under union rules), "needs preserving"
        (under intersection rules), or "needs flipping" (under exclusion rules).</p>

        <p>These operations are expensive, and implementing your own code for this is generally
        a bad idea if there is already a geometry package available for your language of choice.
        In this case, for JavaScript the most excellent <a href="http://paperjs.org">Paper.js</a> already
        comes with all the code in place to perform efficient boolean shape operations, so rather
        that implement an inferior version here, I can strongly recommend the Paper.js library
        if you intend to do any boolean shape work.</p>

        <p>The following graphic shows Paper.js doing its thing for two shapes: one static, and
        one that is linked to your mouse pointer. If you move the mouse around, you'll see how
        the shape intersections are resolved, with segments that lie inside each other's shapes
        marked light blue, and segments that exist outside of the other shape marked in red.</p>

        <Graphic preset="simple" title="Boolean shape operations with Paper.js" paperjs={true}
                 setup={this.setup} draw={this.draw} onMouseMove={this.onMouseMove}/>
      </section>
    );
  }
});

module.exports = Shapes;
