/**
 * This is the section ordering used in the Primer.
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
  'pointcurves',
  'projections',
  'circleintersection',
  'molding',
  'curvefitting',

  // A quick foray into Catmull-Rom splines
  'catmullconv',
  'catmullfitting',

  // "things made of more than on curve"
  'polybezier',
  // 'shapes',  // I am not happy with how this section basically doesn't teach anything
  // 'drawing', // still just waiting to be finished......

  // curve offsetting
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
