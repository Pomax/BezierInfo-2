var sin = Math.sin,
    cos = Math.cos;

module.exports = {
  setup: function(api) {
    api.w = api.getPanelWidth();
    api.h = api.getPanelHeight();
    api.pad = 20;
    api.r = api.w/2 - api.pad;
    api.mousePt = false;
    api.angle = 0;
    var spt = { x: api.w-api.pad, y: api.h/2 };
    api.setCurve(new api.Bezier(spt, spt, spt));
  },

  draw: function(api, curve) {
    api.reset();
    api.setColor("lightgrey");
    api.drawGrid(1,1);
    api.setColor("red");
    api.drawCircle({x:api.w/2,y:api.h/2},api.r);
    api.setColor("transparent");
    api.setFill("rgba(100,255,100,0.4)");
    var p = {
      x: api.w/2,
      y: api.h/2,
      r: api.r,
      s: api.angle < 0 ? api.angle : 0,
      e: api.angle < 0 ? 0 : api.angle
    };
    api.drawArc(p);
    api.setColor("black");
    api.drawSkeleton(curve);
    api.drawCurve(curve);
  },

  onMouseMove: function(evt, api) {
    var x = evt.offsetX - api.w/2,
        y = evt.offsetY - api.h/2;
    var angle = Math.atan2(y,x);
    var pts = api.curve.points;
    // new control
    var r = api.r,
        b = (cos(angle) - 1) / sin(angle);
    pts[1] = {
      x: api.w/2 + r * (cos(angle) - b * sin(angle)),
      y: api.w/2 + r * (sin(angle) + b * cos(angle))
    };
    // new endpoint
    pts[2] = {
      x: api.w/2 + api.r * cos(angle),
      y: api.w/2 + api.r * sin(angle)
    };
    api.setCurve(new api.Bezier(pts));
    api.angle = angle;
  }
};
