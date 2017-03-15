var React = require("react");

var Locale = require("../../../lib/locale");
var locale = new Locale();
var page = "graduatedoffset";

var keyHandling = require("../../decorators/keyhandling-decorator.jsx");

var GraduatedOffsetting = React.createClass({
  statics: {
    keyHandlingOptions: {
      propName: "distance",
      values: {
        "38": 1,  // up arrow
        "40": -1 // down arrow
      }
    }
  },

  getDefaultProps: function() {
    return {
      title: locale.getTitle(page)
    };
  },

  setup: function(api, curve) {
    api.setCurve(curve);
    api.distance = 20;
  },

  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    this.setup(api, curve);
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    this.setup(api, curve);
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);


    api.setColor("blue");
    var outline = curve.outline(0,0,api.distance,api.distance);
    outline.curves.forEach(c => api.drawCurve(c));
  },

  render: function() {
    return locale.getContent(page, this);
  }
});

module.exports = keyHandling(GraduatedOffsetting);
