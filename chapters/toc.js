/**
 * This is an ordered list of all sections used in the Bezier primer.
 *
 * The ordering you see here reflects the ordering in which sections
 '* are present on the Primer page',
 * a REALLY good reason to =)
 *
 */
export default [
  'preface',

  // the basic topic(s) introduction(s)
  'introduction',
  'whatis',
  'explanation',
  'control',
  'weightcontrol',
  'extended',

  // basic operations
  'matrix',
  'decasteljau',
  'flattening',
  'splitting',
  'matrixsplit',
  'reordering',

  // information that can be obtained through analysis
  'derivatives',
  'pointvectors',
  'pointvectors3d',
  'components',
  'extremities',
  'boundingbox',
  'aligning',
  'tightbounds',
  'inflections',
  'canonical',
  'yforx',

  // accurate arc length is hard, yo
  'arclength',
  'arclengthapprox',
  'curvature',
  'tracing',

  // curve intersections
  'intersections',
  'curveintersection',

  // curve manipulation
  'abc',
  'moulding',
  'pointcurves',
  'curvefitting',

  // A quick foray into Catmull-Rom splines
  'catmullconv',
  'catmullmoulding',

  // "things made of more than on curve"
  'polybezier',
  'shapes',
  // 'drawing',

  // curve offsetting
  'projections',
  'offsetting',
  'graduatedoffset',

  // circle and arc approximation
  'circles',
  'circles_cubic',
  'arcapproximation',

  // A quick foray in to B-Spline land
  'bsplines',

  // comments come last for obvious reasons
  'comments',
];
