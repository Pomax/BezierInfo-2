module.exports = {
  basicSketch: require('./basic-sketch'),
  interpolationGraph: require('./interpolation-graph'),
  uniformBSpline: require('./uniform-bspline'),
  centerCutBSpline: require('./center-cut-bspline'),
  openUniformBSpline: require('./open-uniform-bspline'),
  rationalUniformBSpline: require('./rational-uniform-bspline'),

  bindKnots: function(owner, knots, ref) {
    this.refs[ref].bindKnots(owner, knots);
  },

  bindWeights: function(owner, weights, closed, ref) {
    this.refs[ref].bindWeights(owner, weights, closed);
  }
};
