var sketch = {
  getCurve: api => {
    if (!sketch.curve) {
      sketch.curve = new api.Bezier(20, 250, 30, 20, 200, 250, 250, 20);
    }
    return sketch.curve;
  },

  onMouseMove: function(evt, api) {
    api.redraw();
  },

  tforx: {
    setup: function(api) {
      api.setPanelCount(2);
      api.setCurve(sketch.getCurve(api));
    },

    draw: function(api, curve) {
      api.reset();
      api.drawSkeleton(curve);
      api.drawCurve(curve);

      let w = api.defaultWidth;
      let h = api.defaultHeight;
      let bbox = curve.bbox();
      let x = api.mx;
      if (bbox.x.min < x && x < bbox.x.max) {
        api.setColor("red");
        api.drawLine({ x: x, y: 0 }, { x: x, y: h });
        api.text(`x=${x | 0}`, { x: x + 5, y: h - 30 });
      }

      api.setColor("black");
      api.drawLine({ x: w, y: 0 }, { x: w, y: h });
      api.setOffset({ x: w, y: 0 });

      // draw x = t(x)
      api.drawLine({x:0,y:h-20}, {x:w, y:h-20});
      api.text('0', {x:10,y:h-10});
      api.text('⅓', {x:10 + (w-10)/3,y:h-10});
      api.text('⅔', {x:10 + 2*(w-10)/3,y:h-10});
      api.text('1', {x:w-10,y:h-10});
      let p, s = { x: 0, y: h - curve.get(0).x };

      for (let step = 0.05, t = step; t < 1 + step; t += step) {
        p = {x: t * w, y: h - curve.get(t).x };
        api.drawLine(s, p);
        s = p;
      }

      api.setColor("black");
      api.text("↑\nx", {x:10,y:h/2});
      api.text("t →", {x:w/2,y:h-10});

      if (bbox.x.min < x && x < bbox.x.max) {
        api.setColor("red");
        api.drawLine({ x: 0, y: h-x }, { x: w, y: h-x });
      }
    }
  },

  yforx: {
    setup: function(api) {
      api.setCurve(sketch.getCurve(api));
    },

    draw: function(api, curve) {
      api.reset();
      api.drawSkeleton(curve);
      api.drawCurve(curve);

      let w = api.defaultWidth;
      let h = api.defaultHeight;
      let bbox = curve.bbox();
      let x = api.mx;
      if (bbox.x.min < x && x < bbox.x.max) {
        api.setColor("red");
        // The root finder is based on normal x/y coordinates,
        // so we can "trick" it by giving it "t" values as x
        // values, and "x" values as y values. Since it won't
        // even look at the x dimension, we can also just leave it.
        let roots = api.utils.roots(curve.points.map(v => {
          return { x: v.x, y: v.x-x};
        }));
        roots = roots.filter(t => t>=0 && t<=1.0);
        let t = roots[0];
        let p = curve.get(t);
        api.drawLine({ x: p.x, y: p.y }, { x: p.x, y: h });
        api.drawLine({ x: p.x, y: p.y }, { x: 0, y: p.y });
        api.text(`y=${p.y|0}`, { x: p.x/2, y: p.y - 5 });
        api.text(`x=${p.x|0}`, { x: x + 5, y: h - (h-p.y)/2 });
        api.text(`t=${((t*100)|0)/100}`, { x: x + 15, y: p.y });
      }
    }
  }
};

module.exports = sketch;
