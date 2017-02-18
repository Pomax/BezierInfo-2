var React = require("react");

var Locale = require("../../../lib/locale");
var locale = new Locale();
var page = "whatis";

var Whatis = React.createClass({
  getDefaultProps: function() {
    return {
      title: locale.getTitle(page)
    };
  },

  setup: function(api) {
    api.setPanelCount(3);
    var curve = api.getDefaultQuadratic();
    api.setCurve(curve);
    api.step = 25;
  },

  draw: function(api, curve) {
    var dim = api.getPanelWidth(),
        pts = curve.points,
        p1 = pts[0],
        p2=pts[1],
        p3 = pts[2],
        p1e, p2e, m, t, i,
        offset = {x:0, y:0},
        d,v,tvp;

    api.reset();

    api.setColor("black");
    api.setFill("black");
    api.drawSkeleton(curve, offset);
    api.text("First linear interpolation at "+api.step+"% steps", {x:5, y:15}, offset);

    offset.x += dim;
    api.drawLine({x:0, y:0}, {x:0, y:this.dim}, offset);
    api.drawSkeleton(curve, offset);
    api.text("Second interpolation at "+api.step+"% steps", {x:5, y:15}, offset);

    offset.x += dim;
    api.drawLine({x:0, y:0}, {x:0, y:this.dim}, offset);
    api.drawSkeleton(curve, offset);
    api.text("Curve points generated this way", {x:5, y:15}, offset);

    api.setColor("lightgrey");
    for(t=1,d=20,v,tvp; t<d; t++) {
      v = t/d;
      tvp = curve.get(v);
      api.drawCircle(tvp,2,offset);
    }

    for(i = 3*api.step; i>0; i -= api.step) {
      t = i/100;
      if (t>1) continue;
      api.setRandomColor();

      p1e = {
        x: p1.x + t * (p2.x - p1.x),
        y: p1.y + t * (p2.y - p1.y)
      };

      p2e = {
        x: p2.x + t * (p3.x - p2.x),
        y: p2.y + t * (p3.y - p2.y)
      };

      m = {
        x: p1e.x + t * (p2e.x - p1e.x),
        y: p1e.y + t * (p2e.y - p1e.y)
      };

      offset = {x:0, y:0};
      api.drawCircle(p1e,3, offset);
      api.drawCircle(p2e,3, offset);
      api.setWeight(0.5);
      api.drawLine(p1e, p2e, offset);
      api.setWeight(1.5);
      api.drawLine(p1, p1e, offset);
      api.drawLine(p2, p2e, offset);
      api.setWeight(1);

      offset.x += dim;
      api.drawCircle(p1e,3, offset);
      api.drawCircle(p2e,3, offset);
      api.setWeight(0.5);
      api.drawLine(p1e, p2e, offset);
      api.setWeight(1.5);
      api.drawLine(p1e, m, offset);
      api.setWeight(1);
      api.drawCircle(m,3,offset);

      offset.x += dim;
      api.drawCircle(m,3,offset);

      api.text(i+"%, or t = " + api.utils.round(t,2), {x: m.x + 10 + offset.x, y: m.y + 10 + offset.y});
    }
  },

  values: {
    "38": 1,  // up arrow
    "40": -1  // down arrow
  },

  onKeyDown: function(e, api) {
    var v = this.values[e.keyCode];
    if(v) {
      e.preventDefault();
      api.step += v;
      if (api.step < 1) {
        api.step = 1;
      }
    }
  },

  render: function() {
    return (
      <section>{ locale.getContent(page, this) }</section>
    );
  }
});

module.exports = Whatis;
