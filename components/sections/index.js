/**
 * This is an ordered list of all sections used in the Bezier primer.
 *
 * The ordering you see here reflects the ordering in which sections
 * are present on the Primer page: do not change them unless there is
 * a REALLY good reason to =)
 *
 */
module.exports = {
  preface: require("./preface"),

  // the basic topic(s) introduction(s)
  introduction: require("./introduction"),
  whatis: require("./whatis"),
  explanation: require("./explanation"),
  control: require("./control"),
  extended: require("./extended"),

  // basic operations
  matrix: require("./matrix"),
  decasteljau: require("./decasteljau"),
  flattening: require("./flattening"),
  splitting: require("./splitting"),
  matrixsplit: require("./matrixsplit"),
  reordering: require("./reordering"),

  // information that can be obtained through analysis
  derivatives: require("./derivatives"),
  pointvectors: require("./pointvectors"),
  pointvectors3d: require("./pointvectors3d"),
  components: require("./components"),
  extremities: require("./extremities"),
  boundingbox: require("./boundingbox"),
  aligning: require("./aligning"),
  tightbounds: require("./tightbounds"),
  inflections: require("./inflections"),
  canonical: require("./canonical"),
  yforx: require('./yforx'),

  // accurate arc length is hard, yo
  arclength: require("./arclength"),
  arclengthapprox: require("./arclengthapprox"),
  curvature: require("./curvature"),
  tracing: require("./tracing"),

  // curve intersections
  intersections: require("./intersections"),
  curveintersection: require("./curveintersection"),

  // curve manipulation
  abc: require("./abc"),
  moulding: require("./moulding"),
  pointcurves: require("./pointcurves"),
  curvefitting: require("./curvefitting"),

  // A quick foray into Catmull-Rom splines
  catmullconv: require("./catmullconv"),
  catmullmoulding: require("./catmullmoulding"),

  // "things made of more than on curve"
  polybezier: require("./polybezier"),
  shapes: require("./shapes"),
  //drawing: require("./drawing"),

  // curve offsetting
  projections: require("./projections"),
  offsetting: require("./offsetting"),
  graduatedoffset: require("./graduatedoffset"),

  // circle and arc approximation
  circles: require("./circles"),
  circles_cubic: require("./circles_cubic"),
  arcapproximation: require("./arcapproximation"),

  // A quick foray in to B-Spline land
  bsplines: require("./bsplines"),

  // comments come last for obvious reasons
  comments: require("./comments")
};
