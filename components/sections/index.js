/**
 * This is an ordered list of all sections for the article
 * @type {Object}
 */
module.exports = {
  preface: require("./preface"),
  introduction: require("./introduction"),
  whatis: require("./whatis"),
  explanation: require("./explanation"),

  control: require("./control"),
  matrix: require("./matrix"),
  decasteljau: require("./decasteljau"),
  flattening: require("./flattening"),
  splitting: require("./splitting"),
  matrixsplit: require("./matrixsplit"),
  reordering: require("./reordering"),

  derivatives: require("./derivatives"),
  pointvectors: require("./pointvectors"),
  components: require("./components"),
  extremities: require("./extremities"),
  boundingbox: require("./boundingbox"),
  aligning: require("./aligning"),
  tightbounds: require("./tightbounds"),
  canonical: require("./canonical"),

  arclength: require("./arclength"),
  arclengthapprox: require("./arclengthapprox"),
  tracing: require("./tracing"),

  intersections: require("./intersections"),
  curveintersection: require("./curveintersection"),
  moulding: require("./moulding")
};


/*
  pointcurves: require("./pointcurves"),

  catmullconv: require("./catmullconv"),
  catmullmoulding: require("./catmullmoulding"),

  polybezier: require("./polybezier"),
  shapes: require("./shapes"),

  projections: require("./projections"),

  offsetting: require("./offsetting"),
  graduatedoffset: require("./graduatedoffset"),

  circles: require("./circles"),
  circles_cubic: require("./circles_cubic"),
  arcapproximation: require("./arcapproximation")
*/

/*
  Curve moulding (using the projection ratio)
  Creating a curve from three points
  Bézier curves and Catmull-Rom curves
  Creating a Catmull-Rom curve from three points
  Forming poly-Bézier curves
  Boolean shape operations
  Projecting a point onto a Bézier curve
  Curve offsetting
  Graduated curve offsetting
  Circles and quadratic Bézier curves
  Circles and cubic Bézier curves
  Approximating Bézier curves with circular arcs
*/