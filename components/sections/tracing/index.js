var React = require("react");

var Locale = require("../../../lib/locale");
var locale = new Locale();
var page = "tracing";

var keyHandling = require("../../decorators/keyhandling-decorator.jsx");

var Tracing = React.createClass({
  statics: {
    keyHandlingOptions: {
      propName: "steps",
      values: {
        "38": 1,  // up arrow
        "40": -1 // down arrow
      },
      controller: function(api) {
        if (api.steps < 1) {
          api.steps = 1;
        }
      }
    }
  },

  getDefaultProps: function() {
    return {
      title: locale.getTitle(page)
    };
  },

  setup: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
    api.steps = 8;
  },

  generate: function(api, curve, offset, pad, fwh) {
    offset.x += pad;
    offset.y += pad;
    var len = curve.length();
    var pts = [{x:0, y:0, d:0}];
    for(var v=1, t, d; v<=100; v++) {
      t = v/100;
      d = curve.split(t).left.length();
      pts.push({
        x: api.utils.map(t, 0,1,   0,fwh),
        y: api.utils.map(d, 0,len, 0,fwh),
        d: d,
        t: t
      });
    }
    return pts;
  },

  draw: function(api, curve, offset) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var len = curve.length();
    var w = api.getPanelWidth();
    var h = api.getPanelHeight();
    var pad = 20;
    var fwh = w - 2*pad;

    offset.x += w;
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);
    api.drawAxes(pad, "t",0,1, "d",0,len, offset);

    return this.generate(api, curve, offset, pad, fwh);
  },

  plotOnly: function(api, curve) {
    api.setPanelCount(2);
    var offset = {x:0, y:0};
    var pts = this.draw(api, curve, offset);
    for(var i=0; i<pts.length-1; i++) {
      api.drawLine(pts[i], pts[i+1], offset);
    }
  },

  drawColoured: function(api, curve) {
    api.setPanelCount(3);
    var w = api.getPanelWidth();
    var h = api.getPanelHeight();
    var pad = 20;
    var fwh = w - 2*pad;

    var offset = {x:0, y:0};
    var len = curve.length();
    var pts = this.draw(api, curve, offset);
    var s = api.steps, i, p, ts=[];
    for(i=0; i<=s; i++) {
      var target = (i * len)/s;
      // find the t nearest our target distance
      for (p=0; p<pts.length; p++) {
        if (pts[p].d > target) {
          p--;
          break;
        }
      }
      if(p<0) p=0;
      if(p===pts.length) p=pts.length-1;
      ts.push(pts[p]);
    }

    for(i=0; i<pts.length-1; i++) {
      api.drawLine(pts[i], pts[i+1], offset);
    }

    ts.forEach(p => {
      var pt = { x: api.utils.map(p.t,0,1,0,fwh), y: 0 };
      var pd = { x: 0, y: api.utils.map(p.d,0,len,0,fwh) };
      api.setColor("black");
      api.drawCircle(pt, 3, offset);
      api.drawCircle(pd, 3, offset);
      api.setColor("lightgrey");
      api.drawLine(pt, {x:pt.x, y:pd.y}, offset);
      api.drawLine(pd, {x:pt.x, y:pd.y}, offset);
    });

    offset = {x:2*w, y:0};
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);

    var idx=0, colors = ["rgb(240,0,200)", "rgb(0,40,200)"];
    api.setColor(colors[idx]);
    var p0 = curve.get(pts[0].t), p1;
    api.drawCircle(curve.get(0), 4, offset);

    for (i=1, p1; i<pts.length; i++) {
      p1 = curve.get(pts[i].t);
      api.drawLine(p0, p1, offset);
      if (ts.indexOf(pts[i]) !== -1) {
        api.setColor(colors[++idx % colors.length]);
        api.drawCircle(p1, 4, offset);
      }
      p0 = p1;
    }
  },

  render: function() {
    return <section>{ locale.getContent(page, this) }</section>;
  }
});

module.exports = keyHandling(Tracing);
