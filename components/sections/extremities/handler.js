module.exports = {
  setupQuadratic: function(api) {
    var curve = api.getDefaultQuadratic();
    curve.points[2].x = 210;
    api.setCurve(curve);
  },

  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
  },

  draw: function(api, curve) {
    api.setPanelCount(3);
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var tf = curve.order + 1,
        pad = 20,
        pts = curve.points,
        w = api.getPanelWidth(),
        h = api.getPanelHeight(),
        offset = { x: w, y: 0 };

    var x_pts = JSON.parse(JSON.stringify(pts)).map((p,t) => { return {x:w*t/tf, y:p.x}; });
    api.setColor("black");
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);
    api.drawAxes(pad, "t",0,1, "x",0,w, offset);
    offset.x += pad;
    var xcurve = new api.Bezier(x_pts);
    api.drawCurve(xcurve, offset);
    api.setColor("red");
    xcurve.extrema().y.forEach(t => {
      var p = xcurve.get(t);
      api.drawCircle(p, 3, offset);
    });

    offset.x += w-pad;
    var y_pts = JSON.parse(JSON.stringify(pts)).map((p,t) => { return {x:w*t/tf, y:p.y}; });
    api.setColor("black");
    api.drawLine({x:0,y:0}, {x:0,y:h}, offset);
    api.drawAxes(pad, "t",0,1, "y",0,w, offset);
    offset.x += pad;
    var ycurve = new api.Bezier(y_pts);
    api.drawCurve(ycurve, offset);
    api.setColor("red");
    ycurve.extrema().y.forEach(t => {
      var p = ycurve.get(t);
      api.drawCircle(p, 3, offset);
    });
  }
};
