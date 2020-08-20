module.exports = {
  setupCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
    api.forward = true;
  },

  drawSplit: function(api, curve) {
    api.setPanelCount(2);
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    var offset = {x:0, y:0};
    var t = 0.5;
    var pt = curve.get(0.5);
    var split = curve.split(t);
    api.drawCurve(split.left);
    api.drawCurve(split.right);
    api.setColor("red");
    api.drawCircle(pt,3);

    api.setColor("black");
    offset.x = api.getPanelWidth();
    api.drawLine({x:0,y:0},{x:0,y:api.getPanelHeight()}, offset);

    api.setColor("lightgrey");
    api.drawCurve(curve, offset);
    api.drawCircle(pt,4);

    offset.x -= 20;
    offset.y -= 20;
    api.drawSkeleton(split.left, offset, true);
    api.drawCurve(split.left, offset);

    offset.x += 40;
    offset.y += 40;
    api.drawSkeleton(split.right, offset, true);
    api.drawCurve(split.right, offset);
  },

  drawAnimated: function(api, curve) {
    api.setPanelCount(3);
    api.reset();

    var frame = api.getFrame();
    var interval = 5 * api.getPlayInterval();
    var t = (frame%interval)/interval;
    var forward = (frame%(2*interval)) < interval;
    if (forward) { t = t%1; } else { t = 1 - t%1; }
    var offset = {x:0, y:0};

    api.setColor("lightblue");
    api.drawHull(curve, t);
    api.drawSkeleton(curve);
    api.drawCurve(curve);
    var pt = curve.get(t);
    api.drawCircle(pt, 4);

    api.setColor("black");
    offset.x += api.getPanelWidth();
    api.drawLine({x:0,y:0},{x:0,y:api.getPanelHeight()}, offset);

    var split = curve.split(t);

    api.setColor("lightgrey");
    api.drawCurve(curve, offset);
    api.drawHull(curve, t, offset);
    api.setColor("black");
    api.drawCurve(split.left, offset);
    api.drawPoints(split.left.points, offset);
    api.setFill("black");
    api.text("Left side of curve split at t = " + (((100*t)|0)/100), {x: 10 + offset.x, y: 15 + offset.y});

    offset.x += api.getPanelWidth();
    api.drawLine({x:0,y:0},{x:0,y:api.getPanelHeight()}, offset);

    api.setColor("lightgrey");
    api.drawCurve(curve, offset);
    api.drawHull(curve, t, offset);
    api.setColor("black");
    api.drawCurve(split.right, offset);
    api.drawPoints(split.right.points, offset);
    api.setFill("black");
    api.text("Right side of curve split at t = " + (((100*t)|0)/100), {x: 10 + offset.x, y: 15 + offset.y});
  },

  togglePlay: function(evt, api) {
    if (api.playing) { api.pause(); } else { api.play(); }
  }
};
