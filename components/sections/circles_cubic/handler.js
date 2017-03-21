var sin = Math.sin, cos = Math.cos, tan = Math.tan;

module.exports = {
  setup: function(api) {
    api.setSize(400,400);
    api.w = api.getPanelWidth();
    api.h = api.getPanelHeight();
    api.pad = 80;
    api.r = api.w/2 - api.pad;
    api.mousePt = false;
    api.angle = 0;
    var spt = { x: api.w-api.pad, y: api.h/2 };
    api.setCurve(new api.Bezier(spt, spt, spt, spt));
  },

  guessCurve: function(S, B, E)  {
    var C = {
          x: (S.x + E.x)/2,
          y: (S.y + E.y)/2
        },
        A = {
          x: B.x + (B.x-C.x)/3, // cubic ratio at t=0.5 is 1/3
          y: B.y + (B.y-C.y)/3
        },
        bx = (E.x-S.x)/4,
        by = (E.y-S.y)/4,
        e1 = {
          x: B.x - bx,
          y: B.y - by
        },
        e2 = {
          x: B.x + bx,
          y: B.y + by
        },

        v1 = {
          x: A.x + (e1.x-A.x)*2,
          y: A.y + (e1.y-A.y)*2
        },
        v2 = {
          x: A.x + (e2.x-A.x)*2,
          y: A.y + (e2.y-A.y)*2
        },

        nc1 = {
          x: S.x + (v1.x-S.x)*2,
          y: S.y + (v1.y-S.y)*2
        },
        nc2 = {
          x: E.x + (v2.x-E.x)*2,
          y: E.y + (v2.y-E.y)*2
        };
    return [nc1, nc2];
  },

  draw: function(api, curve) {
    api.reset();

    api.setColor("lightgrey");
    api.drawGrid(1,1);
    api.setColor("rgba(255,0,0,0.4)");
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

    // guessed curve
    var B = {
      x: api.w/2 + api.r * cos(api.angle/2),
      y: api.w/2 + api.r * sin(api.angle/2)
    };
    var S = curve.points[0],
        E = curve.points[3],
        nc = this.guessCurve(S,B,E);
    var guess = new api.Bezier([S, nc[0], nc[1], E]);
    api.setColor("rgb(140,140,255)");
    api.drawLine(guess.points[0], guess.points[1]);
    api.drawLine(guess.points[1], guess.points[2]);
    api.drawLine(guess.points[2], guess.points[3]);
    api.setColor("blue");
    api.drawCurve(guess);
    api.drawCircle(guess.points[1], 3);
    api.drawCircle(guess.points[2], 3);

    // real curve
    api.drawSkeleton(curve);
    api.setColor("black");
    api.drawLine(curve.points[1], curve.points[2]);
    api.drawCurve(curve);
  },

  onMouseMove: function(evt, api) {
    var x = evt.offsetX - api.w/2,
        y = evt.offsetY - api.h/2;
    if (x>api.w/2) return;

    var angle = Math.atan2(y,x);
    if (angle < 0) {
      angle = 2*Math.PI + angle;
    }
    var pts = api.curve.points;
    // new control 1
    var r = api.r,
        f = (4 * tan(angle/4)) /3;
    pts[1] = {
      x: api.w/2 + r,
      y: api.w/2 + r * f
    };
    // new control 2
    pts[2] = {
      x: api.w/2 + api.r * (cos(angle) + f*sin(angle)),
      y: api.w/2 + api.r * (sin(angle) - f*cos(angle))
    };
    // new endpoint
    pts[3] = {
      x: api.w/2 + api.r * cos(angle),
      y: api.w/2 + api.r * sin(angle)
    };
    api.setCurve(new api.Bezier(pts));
    api.angle = angle;
  },

  drawCircle: function(api) {
    api.setSize(325,325);
    api.reset();

    var w = api.getPanelWidth(),
        h = api.getPanelHeight(),
        pad = 60,
        r = w/2 - pad,
        k = 0.55228,
        offset = {x: -pad/2, y:-pad/4};

    var curve = new api.Bezier([
      {x:w/2 + r,   y:h/2},
      {x:w/2 + r,   y:h/2 + k*r},
      {x:w/2 + k*r, y:h/2 + r},
      {x:w/2,       y:h/2 + r}
    ]);

    api.setColor("lightgrey");
    api.drawLine({x:0,y:h/2}, {x:w+pad,y:h/2}, offset);
    api.drawLine({x:w/2,y:0}, {x:w/2,y:h+pad}, offset);

    var pts = curve.points;

    api.setColor("red");
    api.drawPoint(pts[0], offset);
    api.drawPoint(pts[1], offset);
    api.drawPoint(pts[2], offset);
    api.drawPoint(pts[3], offset);
    api.drawCurve(curve, offset);
    api.setColor("rgb(255,160,160)");
    api.drawLine(pts[0],pts[1],offset);
    api.drawLine(pts[1],pts[2],offset);
    api.drawLine(pts[2],pts[3],offset);

    api.setFill("red");
    api.text((pts[0].x - w/2) + "," + (pts[0].y - h/2), {x: pts[0].x + 7, y: pts[0].y + 3}, offset);
    api.text((pts[1].x - w/2) + "," + (pts[1].y - h/2), {x: pts[1].x + 7, y: pts[1].y + 3}, offset);
    api.text((pts[2].x - w/2) + "," + (pts[2].y - h/2), {x: pts[2].x + 7, y: pts[2].y + 7}, offset);
    api.text((pts[3].x - w/2) + "," + (pts[3].y - h/2), {x: pts[3].x, y: pts[3].y + 13}, offset);

    pts.forEach(p => { p.x = -(p.x - w); });
    api.setColor("blue");
    api.drawCurve(curve, offset);
    api.drawLine(pts[2],pts[3],offset);
    api.drawPoint(pts[2],offset);
    api.setFill("blue");
    api.text("reflected", {x: pts[2].x - pad/2, y: pts[2].y + 13}, offset);
    api.setColor("rgb(200,200,255)");
    api.drawLine(pts[1],pts[0],offset);
    api.drawPoint(pts[1],offset);

    pts.forEach(p => { p.y = -(p.y - h); });
    api.setColor("green");
    api.drawCurve(curve, offset);

    pts.forEach(p => { p.x = -(p.x - w); });
    api.setColor("purple");
    api.drawCurve(curve, offset);
    api.drawLine(pts[1],pts[0],offset);
    api.drawPoint(pts[1],offset);
    api.setFill("purple");
    api.text("reflected", {x: pts[1].x + 10, y: pts[1].y + 3}, offset);
    api.setColor("rgb(200,200,255)");
    api.drawLine(pts[2],pts[3],offset);
    api.drawPoint(pts[2],offset);



    api.setColor("black");
    api.setFill("black");
    api.drawLine({x:w/2, y:h/2}, {x:w/2 + r -2, y:h/2}, offset);
    api.drawLine({x:w/2, y:h/2}, {x:w/2, y:h/2 + r -2}, offset);
    api.text("r = " + r, {x:w/2 + r/3, y:h/2 + 10}, offset);
  }
};
