var React = require("react");

var Locale = require("../../../lib/locale");
var locale = new Locale();
var page = "abc";

var ABC = React.createClass({
  getDefaultProps: function() {
    return {
      title: locale.getTitle(page)
    };
  },

  onClick: function(evt, api) {
    api.t = api.curve.on({x: evt.offsetX, y: evt.offsetY},7);
    if (api.t < 0.05 || api.t > 0.95) api.t = false;
    api.redraw();
  },

  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    curve.points[0].y -= 10;
    api.setCurve(curve);
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    curve.points[2].y -= 20;
    api.setCurve(curve);
    api.lut = curve.getLUT(100);
  },

  draw: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var h = api.getPanelHeight();

    api.setColor("black");
    if (api.t) {
      api.drawCircle(api.curve.get(api.t),3);
      api.setColor("lightgrey");
      var hull = api.drawHull(curve, api.t);
      var utils = api.utils;

      var A, B, C;

      if(hull.length === 6) {
        A = curve.points[1];
        B = hull[5];
        C = utils.lli4(A, B, curve.points[0], curve.points[2]);
        api.setColor("lightgrey");
        api.drawLine(curve.points[0], curve.points[2]);
      } else if(hull.length === 10) {
        A = hull[5];
        B = hull[9];
        C = utils.lli4(A, B, curve.points[0], curve.points[3]);
        api.setColor("lightgrey");
        api.drawLine(curve.points[0], curve.points[3]);
      }

      api.setColor("#00FF00");
      api.drawLine(A,B);
      api.setColor("red");
      api.drawLine(B,C);
      api.setColor("black");
      api.drawCircle(C,3);

      api.setFill("black");
      api.text("A", {x:10 + A.x, y: A.y});
      api.text("B (t = " + api.utils.round(api.t,2) + ")", {x:10 + B.x, y: B.y});
      api.text("C", {x:10 + C.x, y: C.y});

      var d1 = utils.dist(A, B);
      var d2 = utils.dist(B, C);
      var ratio = d1/d2;

      api.text("d1 (A-B): " + utils.round(d1,2) + ", d2 (B-C): "+ utils.round(d2,2) + ", ratio (d1/d2): " + utils.round(ratio,4), {x:10, y:h-7});
    }
  },

  setCT: function(evt,api) {
    api.t = evt.offsetX / api.getPanelWidth();
  },

  drawCTgraph: function(api) {
    api.reset();
    api.setColor("black");
    var w = api.getPanelWidth();
    var pad = 20;
    var fwh = w - 2*pad;
    api.drawAxes(pad, "t",0,1, "u",0,1);
    api.setColor("blue");
    var uPoint = function(t) {
      var value = api.u(t),
          res = { x: pad + t*fwh, y: pad + value*fwh };
      return res;
    };
    api.drawFunction(uPoint);
    if (api.t) {
      var v = api.u(api.t),
          v1 = api.utils.round(v,3),
          v2 = api.utils.round(1-v,3),
          up = uPoint(api.t);
      api.drawLine({x:up.x,y:pad}, up);
      api.drawLine({x:pad,y:up.y}, up);
      api.drawCircle(up,3);
      api.setFill("blue");
      api.text("    t = " + api.utils.round(api.t,3), {x:up.x+10, y:up.y-7});
      api.text("u(t) = " + api.utils.round(v,3), {x:up.x+10, y:up.y+7});
      api.setFill("black");
      api.text("C = "+v1+" * start + "+v2+" * end", {x:w/2 - pad, y:pad+fwh});
    }
  },

  drawQCT: function(api) {
    api.u = api.u || function(t) {
      var top = (t-1) * (t-1),
          bottom = 2*t*t - 2*t + 1;
      return top/bottom;
    };
    this.drawCTgraph(api);
  },

  drawCCT: function(api) {
    api.u = api.u || function(t) {
      var top = (1-t) * (1-t) * (1-t),
          bottom = t*t*t + top;
      return top/bottom;
    };
    this.drawCTgraph(api);
  },

  render: function() {
    return <section>{ locale.getContent(page, this) }</section>;
  }
});

module.exports = ABC;

