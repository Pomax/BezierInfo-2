var hasWindow = (typeof window !== "undefined");
var chroma = hasWindow && window.chroma? window.chroma : require("chroma-js");
var Bezier = hasWindow && window.Bezier? window.Bezier : require("bezier-js");

var sin = Math.sin;
var cos = Math.cos;
var PI = Math.PI;

var API = {
  Paper: false,

  defaultWidth: 275,
  defaultHeight: 275,
  panelCount: 1,

  Bezier: Bezier,
  utils: Bezier.getUtils(),
  curve: false,
  mx:0,
  my:0,
  hover: { x: 0, y: 0 },
  cx:0,
  cy:0,
  mp: false,
  offset: { x: 0, y: 0},
  lpts: [],
  colorSeed: 0,
  playing: false,
  frame: 0,
  playinterval: 33,

  animate: function animate() {
    if (this.playing) {
      this.frame++;
      // requestAnimationFrame is spectacularly too fast
      setTimeout(this.animate, this.playinterval);
      this.props.draw(this,this.curve);
    }
  },

  getFrame: function() { return this.frame; },
  getPlayInterval: function() { return this.playinterval; },
  play: function() { this.playing = true; this.animate(); },
  pause: function() { this.playing = false; },
  redraw: function() { if (this.props.draw) { this.props.draw(this, this.curve); }},

  mouseDown: function(evt) {
    this.mx = evt.offsetX;
    this.my = evt.offsetY;

    this.movingPoint = false;
    this.dragging = false;
    this.down = true;

    this.lpts.forEach((p,idx) => {
      if(Math.abs(this.mx - p.x)<10 && Math.abs(this.my - p.y)<10) {
        this.movingPoint = true;
        this.mp = p;
        this.mp_idx = idx;
        this.cx = p.x;
        this.cy = p.y;
      }
    });

    if (this.props.onMouseDown) {
      this.props.onMouseDown(evt, this);
    }

    if ('setCapture' in evt.target) {
      evt.target.setCapture();
    }
  },

  mouseMove: function(evt) {

    if(!this.props.static) {

      if (this.down) {
        this.dragging = true;
      }

      var found = false;
      this.lpts.forEach(p => {
        var mx = evt.offsetX;
        var my = evt.offsetY;
        if(Math.abs(mx-p.x)<10 && Math.abs(my-p.y)<10) {
          found = found || true;
        }
      });

      this.cvs.style.cursor = found ? !this.noDrag? "pointer" : "default": "default";

      this.hover = {
        x: evt.offsetX,
        y: evt.offsetY
      };

      if(!this.noDrag && this.movingPoint) {
        this.ox = evt.offsetX - this.mx;
        this.oy = evt.offsetY - this.my;
        this.mp.x = Math.max(0, Math.min(this.defaultWidth, this.cx + this.ox));
        this.mp.y = Math.max(0, Math.min(this.defaultHeight, this.cy + this.oy));
        if (this.curve.forEach) {
          for (var i=0, c, _pts; i<this.curve.length; i++) {
            c = this.curve[i];
            _pts = c.points;
            if (_pts.indexOf(this.mp)>-1) {
              c.update();
              break;
            }
          }
        } else if (this.curve && this.curve.update) { this.curve.update(); }
      } else {
        this.mx = evt.offsetX;
        this.my = evt.offsetY;
      }
    }

    if (this.props.onMouseMove) {
      this.props.onMouseMove(evt, this);
    }

    if (!this.noDrag && this.dragging && this.props.onMouseDrag) {
      this.props.onMouseDrag(evt, this);
    }

    if (!this.props.static && !this.playing && this.props.draw) {
      this.props.draw(this, this.curve);
    }
  },

  mouseUp: function(evt) {
    this.down = false;
    if(!this.movingPoint) {
      if (this.props.onMouseUp) {
        this.props.onMouseUp(evt, this);
      }
      return;
    }
    this.movingPoint = false;
    this.mp = false;
    if (this.props.onMouseUp) {
      this.props.onMouseUp(evt, this);
    }
  },

  onClick: function(evt) {
    this.mx = evt.offsetX;
    this.my = evt.offsetY;
    if (!this.dragging && this.props.onClick) {
      this.props.onClick(evt, this);
    }
  },


  onKeyUp: function(evt) {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(evt, this);
      if (!this.playing && this.props.draw) {
        this.props.draw(this, this.curve);
      }
    }
  },

  onKeyDown: function(evt) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(evt, this);
      if (!this.playing && this.props.draw) {
        this.props.draw(this, this.curve);
      }
    }
  },

  onKeyPress: function(evt) {
    if (this.props.onKeyPress) {
      this.props.onKeyPress(evt, this);
      if (!this.playing && this.props.draw) {
        this.props.draw(this, this.curve);
      }
    }
  },


  /**
   * API for curve drawing.
   */


  reset: function() {
    this.refs.canvas.width = this.refs.canvas.width;
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;
    this.ctx.fillStyle = "none";
    var dpr = this.getPixelRatio();
    this.ctx.scale(dpr, dpr);
    this.offset = {x:0, y:0};
    this.colorSeed = 0;
  },

  setSize: function(w,h) {
    this.defaultWidth = w;
    this.defaultHeight = h;

    var cvs = this.refs.canvas;
    cvs.style.width = this.panelCount * w + "px";
    cvs.style.height = h + "px";

    cvs.parentNode.style.setProperty(`--figurewidth`, cvs.style.width);

    var dpr = this.getPixelRatio();
    cvs.width = this.panelCount * w * dpr;
    cvs.height = h * dpr;
    this.ctx.scale(dpr, dpr);
  },

  setCurves: function(c) {
    this.setCurve(c);
  },

  setCurve: function(c) {
    if (!c) {
      this.curve = false;
      this.lpts = [];
      return;
    }

    var pts = [];
    c = (c instanceof Array) ? c : Array.from(arguments);
    c.forEach(nc => {
      pts = pts.concat(nc.points);
    });
    this.curve = (c.length === 1) ? c[0] : c;
    this.lpts = pts;
  },

  getPanelWidth: function() {
    return this.defaultWidth;
  },

  getPanelHeight: function() {
    return this.defaultHeight;
  },

  getDefaultQuadratic: function() {
    return new this.Bezier(70,250,  20,110,  250,60);
  },

  getDefaultCubic: function() {
    return new this.Bezier(120,160,  35,200,  220,260,  220,40);
  },

  getDefault3DCubic: function() {
    return new this.Bezier(120,0,0,  120,120,30,  0,120,100,  0,0,200);
  },

  getPixelRatio: function () {
    return window.devicePixelRatio || 1;
  },

  toImage: function() {
    var dataURL = this.refs.canvas.toDataURL();
    var img = new Image();
    img.src = dataURL;
    img.devicePixelRatio = this.getPixelRatio();
    return img;
  },

  setPanelCount: function(c) {
    this.panelCount = c;
    var cvs = this.refs.canvas;
    cvs.width = c * this.defaultWidth * this.getPixelRatio();
    cvs.style.width = c * this.defaultWidth + "px";
  },

  setOffset: function(f) {
    this.offset = f;
  },

  setColor: function(c) {
    this.ctx.strokeStyle = c;
  },

  getColor: function() {
    return this.ctx.strokeStyle || "black";
  },

  setWeight: function(c) {
    this.ctx.lineWidth = c;
  },

  noColor: function(c) {
    this.ctx.strokeStyle = "transparent";
  },

  setRandomColor: function(a) {
    a = (typeof a === "undefined") ? 1 : a;
    var h = this.colorSeed % 360,
        s = 1.0,
        l = 0.34;
    this.colorSeed += 87;
    this.ctx.strokeStyle = chroma.hsl(h,s,l).alpha(a).css();
  },

  setRandomFill: function(a) {
    a = (typeof a === "undefined") ? 1 : a;
    var h = this.colorSeed % 360,
        s = 1.0,
        l = 0.34;
    this.colorSeed += 87;
    this.ctx.fillStyle = chroma.hsl(h,s,l).alpha(a).css();
  },

  setFill: function(c) {
    this.ctx.fillStyle = c;
  },

  getFill: function() {
    return this.ctx.fillStyle || "transparent";
  },

  noFill: function() {
    this.ctx.fillStyle = "transparent";
  },

  // cabinet projection is good enough
  project: function(p, offset, phi) {
    offset = offset || {x:0, y:0};
    phi = phi || -PI/6;

    // what they rarely tell you: if you want
    // z to "go up", x "come out of the screen"
    // and y to be the "left/right", we need this:
    var x=p.y, y=-p.z, z=-p.x;

    return {
      x: offset.x + x + z/2 * cos(phi),
      y: offset.y + y + z/2 * sin(phi)
    };
  },

  projectXY: function(p, offset, phi) {
    return API.project({x:p.x, y:p.y, z:0}, offset, phi);
  },

  projectXZ: function(p, offset, phi) {
    return API.project({x:p.x, y:0, z:p.z}, offset, phi);
  },

  projectYZ: function(p, offset, phi) {
    return API.project({x:0, y:p.y, z:p.z}, offset, phi);
  },

  drawSkeleton: function(curve, offset, nocoords) {
    offset = offset || { x:0, y:0 };
    var pts = curve.points;
    if(pts.length>2) {
      this.ctx.strokeStyle = "lightgrey";
      this.drawLine(pts[0], pts[1], offset);
      var last = pts.length-2;
      for (var i=1; i<last; i++) {
        this.drawLine(pts[i], pts[i+1], offset);
      }
      this.drawLine(pts[last], pts[last+1], offset);
    }
    this.ctx.strokeStyle = "black";
    this.drawPoints(pts, offset);
    if (!nocoords) {
      this.drawCoordinates(curve, offset);
    }
  },

  drawGrid: function(xcount, ycount, offset) {
    var w = this.defaultWidth,
        h = this.defaultHeight,
        xstep = w/xcount,
        ox = xstep/2,
        ystep = h/ycount,
        oy = ystep/2,
        x, xv, y, yv, p1, p2;
    for (x=0; x<xcount; x++) {
      xv = ox + (x*xstep);
      p1 = {x:xv, y:0};
      p2 = {x:xv, y:h};
      this.drawLine(p1, p2, offset);
    }
    for (y=0; y<ycount; y++) {
      yv = oy + (y*ystep);
      p1 = {x:0, y:yv};
      p2 = {x:w, y:yv};
      this.drawLine(p1, p2, offset);
    }
  },

  drawHull: function(curve, t, offset) {
    var hull = (curve instanceof Array) ? curve : curve.hull(t);
    if(hull.length === 6) {
      this.drawLine(hull[0], hull[1], offset);
      this.drawLine(hull[1], hull[2], offset);
      this.drawLine(hull[3], hull[4], offset);
    } else {
      this.drawLine(hull[0], hull[1], offset);
      this.drawLine(hull[1], hull[2], offset);
      this.drawLine(hull[2], hull[3], offset);
      this.drawLine(hull[4], hull[5], offset);
      this.drawLine(hull[5], hull[6], offset);
      this.drawLine(hull[7], hull[8], offset);
    }
    return hull;
  },

  drawCoordinates: function(curve, offset) {
    offset = offset || { x:0, y:0 };
    var pts = curve.points;
    this.setFill("black");
    pts.forEach(p => {
      let txt = `(${p.x | 0},${p.y | 0})`;
      let x = p.x + offset.x + 5;
      let y = p.y + offset.y + 10;
      this.text(txt, {x, y});
    });
  },

  drawFunction: function(generator, offset) {
    var start = generator.start || 0,
        p0 = generator(start),
        end = generator.end || 1,
        plast = generator(end),
        step = generator.step || 0.01,
        scale = generator.scale || 1,
        p, t;
    for (t=step; t<end; t+=step) {
      p = generator(t, scale);
      this.drawLine(p0, p, offset);
      p0 = p;
    }
    this.drawLine(p, plast, offset);
  },

  drawCurve: function(curve, offset) {
    offset = offset || { x:0, y:0 };
    var p = curve.points;

    if (curve.getLUT) {
      var points = curve.getLUT(100);
      var p0 = points[0];
      points.forEach((p1,i) => {
        if(!i) return;
        this.drawLine(p0, p1, offset);
        p0 = p1;
      });
      return;
    }

    var ox = offset.x + this.offset.x;
    var oy = offset.y + this.offset.y;
    this.ctx.beginPath();
    this.ctx.moveTo(p[0].x + ox, p[0].y + oy);
    if(p.length === 3) {
      this.ctx.quadraticCurveTo(
        p[1].x + ox, p[1].y + oy,
        p[2].x + ox, p[2].y + oy
      );
    }
    else if(p.length === 4) {
      this.ctx.bezierCurveTo(
        p[1].x + ox, p[1].y + oy,
        p[2].x + ox, p[2].y + oy,
        p[3].x + ox, p[3].y + oy
      );
    }
    this.ctx.stroke();
    this.ctx.closePath();
  },

  drawLine: function(p1, p2, offset) {
    offset = offset || { x:0, y:0 };
    var ox = offset.x + this.offset.x;
    var oy = offset.y + this.offset.y;
    this.ctx.beginPath();
    this.ctx.moveTo(p1.x + ox,p1.y + oy);
    this.ctx.lineTo(p2.x + ox,p2.y + oy);
    this.ctx.stroke();
  },

  drawPoint: function(p, offset) {
    this.drawCircle(p, 1, offset);
  },

  drawPoints: function(points, offset) {
    offset = offset || { x:0, y:0 };
    points.forEach(function(p) {
      this.drawCircle(p, (offset.x!==0||offset.y!==0)? 1.5: 3, offset);
    }.bind(this));
  },

  drawArc: function(p, offset) {
    offset = offset || { x:0, y:0 };
    var ox = offset.x + this.offset.x;
    var oy = offset.y + this.offset.y;
    this.ctx.beginPath();
    this.ctx.moveTo(p.x + ox, p.y + oy);
    this.ctx.arc(p.x + ox, p.y + oy, p.r, p.s, p.e);
    this.ctx.lineTo(p.x + ox, p.y + oy);
    this.ctx.fill();
    this.ctx.stroke();
  },

  drawCircle: function(p, r, offset) {
    offset = offset || { x:0, y:0 };
    var ox = offset.x + this.offset.x;
    var oy = offset.y + this.offset.y;
    this.ctx.beginPath();
    this.ctx.arc(p.x + ox, p.y + oy, r, 0, 2*Math.PI);
    this.ctx.stroke();
  },

  drawbbox: function(bbox, offset) {
    offset = offset || { x:0, y:0 };
    var ox = offset.x + this.offset.x;
    var oy = offset.y + this.offset.y;
    this.ctx.beginPath();
    this.ctx.moveTo(bbox.x.min + ox, bbox.y.min + oy);
    this.ctx.lineTo(bbox.x.min + ox, bbox.y.max + oy);
    this.ctx.lineTo(bbox.x.max + ox, bbox.y.max + oy);
    this.ctx.lineTo(bbox.x.max + ox, bbox.y.min + oy);
    this.ctx.closePath();
    this.ctx.stroke();
  },

  drawRect: function(p1, p2, offset) {
    offset = offset || { x:0, y:0 };
    var ox = offset.x + this.offset.x;
    var oy = offset.y + this.offset.y;
    var x = p1.x + ox,
        y = p1.y + oy,
        w = p2.x-p1.x,
        h = p2.y-p1.y;
    this.ctx.beginPath();
    this.ctx.moveTo(x,y);
    this.ctx.lineTo(x+w, y);
    this.ctx.lineTo(x+w, y+h);
    this.ctx.lineTo(x,y+h);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  },

  drawPath: function(path, offset) {
    offset = offset || { x:0, y:0 };
    var ox = offset.x + this.offset.x;
    var oy = offset.y + this.offset.y;
    this.ctx.beginPath();
    path.forEach((p,idx) => {
      if (idx === 0) {
        return this.ctx.moveTo(p.x + ox, p.y + oy);
      }
      this.ctx.lineTo(p.x + ox, p.y + oy);
    });
    if (closed) this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  },

  drawShape: function(shape, offset) {
    offset = offset || { x:0, y:0 };
    var ox = offset.x + this.offset.x;
    var oy = offset.y + this.offset.y;
    var order = shape.forward.points.length - 1;
    this.ctx.beginPath();
    this.ctx.moveTo(ox + shape.startcap.points[0].x, oy + shape.startcap.points[0].y);
    this.ctx.lineTo(ox + shape.startcap.points[3].x, oy + shape.startcap.points[3].y);
    if(order === 3) {
      this.ctx.bezierCurveTo(
        ox + shape.forward.points[1].x, oy + shape.forward.points[1].y,
        ox + shape.forward.points[2].x, oy + shape.forward.points[2].y,
        ox + shape.forward.points[3].x, oy + shape.forward.points[3].y
      );
    } else {
      this.ctx.quadraticCurveTo(
        ox + shape.forward.points[1].x, oy + shape.forward.points[1].y,
        ox + shape.forward.points[2].x, oy + shape.forward.points[2].y
      );
    }
    this.ctx.lineTo(ox + shape.endcap.points[3].x, oy + shape.endcap.points[3].y);
    if(order === 3) {
      this.ctx.bezierCurveTo(
        ox + shape.back.points[1].x, oy + shape.back.points[1].y,
        ox + shape.back.points[2].x, oy + shape.back.points[2].y,
        ox + shape.back.points[3].x, oy + shape.back.points[3].y
      );
    } else {
      this.ctx.quadraticCurveTo(
        ox + shape.back.points[1].x, oy + shape.back.points[1].y,
        ox + shape.back.points[2].x, oy + shape.back.points[2].y
      );
    }
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  },

  text: function(text, coord, offset) {
    offset = offset || { x:0, y:0 };
    if (this.offset) {
      offset.x += this.offset.x;
      offset.y += this.offset.y;
    }
    this.ctx.fillText(text, coord.x + offset.x, coord.y + offset.y);
  },

  image: function(image, offset) {
    offset = offset || { x:0, y:0 };
    if (this.offset) {
      offset.x += this.offset.x;
      offset.y += this.offset.y;
    }
    var dpr = image.devicePixelRatio || 1;
    if (image.loaded) {
      this.ctx.drawImage(image,offset.x,offset.y, image.width/dpr, image.height/dpr);
    } else {
      image.onload = () => {
        image.loaded = true;
        this.ctx.drawImage(image,offset.x,offset.y, image.width/dpr, image.height/dpr);
      };
    }
  },

  drawAxes: function(pad, xlabel, xs, xe, ylabel, ys, ye, offset) {
    offset = offset || { x:0, y:0 };
    var dim = this.getPanelWidth();

    this.drawLine({x:pad, y:pad}, {x:dim-pad, y:pad}, offset);
    this.drawLine({x:pad, y:pad}, {x:pad, y:dim-pad}, offset);

    this.setFill("black");

    this.text(xlabel + " →", {x: offset.x + dim/2,     y: offset.y + 15});
    this.text(xs,            {x: offset.x + pad,       y: offset.y + 15});
    this.text(xe,            {x: offset.x + dim - pad, y: offset.y + 15});

    this.text(ylabel, {x: offset.x + 5, y: offset.y + dim/2 - pad});
    this.text("↓",    {x: offset.x + 5, y: offset.y + dim/2});
    this.text(ys,     {x: offset.x + 4, y: offset.y + pad + 5});
    this.text(ye,     {x: offset.x + 2, y: offset.y + dim - pad + 10});
  }
};

if (hasWindow) { window["Bezier Graphics API"] = API; }
if (typeof module !== "undefined") { module.exports = API; }
