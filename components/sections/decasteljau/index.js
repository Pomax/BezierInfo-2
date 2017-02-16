var React = require("react");

var Locale = require("../../../lib/locale");
var locale = new Locale("en-GB");
var page = "decasteljau";

var deCasteljau = React.createClass({
  getDefaultProps: function() {
    return {
      title: locale.getTitle(page)
    };
  },

  setup: function(api) {
    var points = [
      {x: 90, y:110},
      {x: 25, y: 40},
      {x:230, y: 40},
      {x:150, y:240}
    ];
    api.setCurve(new api.Bezier(points));
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    if (api.hover) {
      api.setColor("rgb(200,100,100)");
      var dim = api.getPanelWidth();
      var t = api.hover.x / dim;
      var hull = api.drawHull(curve, t);

      for(var i=4; i<=8; i++) {
        api.drawCircle(hull[i],3);
      }

      var p = curve.get(t);
      api.drawCircle(p, 5);
      api.setFill("black");
      api.drawCircle(p, 3);
      var perc = (t*100)|0;
      t = perc/100;
      api.text("Sequential interpolation for "+perc+"% (t="+t+")", {x: 10, y:15});
    }
  },

  render: function() {
    return (
      <section>{ locale.getContent(page, this) }</section>
    );
  }
});

module.exports = deCasteljau;
