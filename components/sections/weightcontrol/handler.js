var ratios;

module.exports = {
  drawCubic: function(api) {
    var curve = new api.Bezier(
      120, 160,
      35,  200,
      220, 260,
      220, 40
    );
    api.setCurve(curve);
  },

  drawCurve: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);
  },

  setRatio: function(api, values) {
    ratios = values;
    this.update(api);
  },

  changeRatio: function(api, value, pos) {
    ratios[pos] = parseFloat(value) || 0.00001;
    this.update(api);
  },

  update: function(api) {
    api.curve.setRatios(ratios.slice());
    this.drawCurve(api, api.curve);
  },

  // ======

  drawConic(api) {
    api.setSize(1.25 * api.getPanelWidth(), api.getPanelHeight());

    var vectorOffset = {
      x: 2.5/5 * api.getPanelWidth(),
      y: 4/5 * api.getPanelHeight()
    };

    var prj = this.prj = p => api.project(p, vectorOffset);

    var r = this.r = 60;
    var h = this.h = 160;

    this.cone = [];
    this.density =  50;
    for(var i=0, e=this.density; i<=e; i++) {
      let cx = r * Math.cos(Math.PI * 2 * i / e);
      let cy = r * Math.sin(Math.PI * 2 * i / e);
      this.cone.push(
        {x:cx, y:cy, z:0},
        {x:0, y:0, z:h}
      );
    }

    this.cone = this.cone.map(p => prj(p));
  },

  drawCone(api) {
    api.reset();

    var i, c = this.cone;

    var center = this.prj({x:0, y:0, z:0});
    api.setColor("blue");
    api.drawLine(center, this.prj({x:400, y:0, z:0}));
    api.drawLine(center, this.prj({x:0, y:400, z:0}));
    api.drawLine(center, this.prj({x:0, y:0, z:400}));

    api.setColor("red");
    api.drawLine(center, this.prj({x:-400, y:0, z:0}));
    api.drawLine(center, this.prj({x:0, y:-400, z:0}));
    api.drawLine(center, this.prj({x:0, y:0, z:-400}));

    // cone
    api.setColor("rgba(200,100,200,0.6)");
    for(i=0; i<c.length-2; i++) {
      api.drawLine(c[i],   c[i+1]);
      api.drawLine(c[i+1], c[i+2]);  
      api.drawLine(c[i],   c[i+2]);
    }

    let slice = 4 * (api.mx / api.getPanelWidth()) - 2;
    this.drawParabola(api, slice * this.r);
  },

  drawParabola(api, oy) {
    var x = this.r * Math.sin(Math.acos( oy/this.r ));
    var y = this.r * (this.r - oy)/this.r;
    var h = this.h * (this.r - oy)/this.r;

    // plane
    api.setColor("green");
    api.drawLine(
      this.prj({x:-this.r, y: oy, z: 0}),
      this.prj({x:this.r,  y: oy, z: 0})
    );
    api.drawLine(
      this.prj({x:this.r, y: oy, z: 0}),
      this.prj({x:this.r, y: oy + this.r, z: this.h})
    );
    api.drawLine(
      this.prj({x:this.r, y: oy + this.r, z: this.h}),
      this.prj({x:-this.r, y: oy + this.r, z: this.h})
    );
    api.drawLine(
      this.prj({x:-this.r, y: oy + this.r, z: this.h}),     
      this.prj({x:-this.r, y: oy, z: 0})
    );

    // conic angle
    api.drawLine(
      this.prj({x:0, y: -2 * this.r, z: -this.h}),     
      this.prj({x:0, y:      this.r, z: 2 * this.h})
    );

    var coords = [
      {x: x,  y: oy, z: 0 },
      {x: 0,  y: oy + y, z: h },
      {x: -x, y: oy, z: 0 }
    ];

    // parabola
    var quad = new api.Bezier(
      coords[0],
      coords[1],
      coords[2]
    );

    api.setColor("black");
    var lut = quad.getLUT(21).map(this.prj);
    for(var i=0; i<lut.length-1; i++) {
      api.drawLine(lut[i], lut[i+1]);
    }

    var ry = Math.sqrt(coords[1].y * coords[1].y + coords[1].z * coords[1].z);
    var mp = {x: coords[1].x, y: ry, z: 0};
    var quad2 = new api.Bezier(
      {x: coords[0].x, y: coords[0].y, z: 0},
      {x: coords[1].x, y: coords[1].y, z: 0},
      {x: coords[2].x, y: coords[2].y, z: 0}
    );

    quad2.setRatios([1,1,1]);

    api.setColor("purple");
    var lut2 = quad2.getLUT(21).map(this.prj);
    for(var j=0; j<lut2.length-1; j++) {
      api.drawLine(lut2[j], lut2[j+1]);
    }
  }

};
