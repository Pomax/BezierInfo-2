var React = require("react");
var ReactDOM = require("react-dom");

var fix = function(e) {
  e = e || window.event;
  var target = e.target || e.srcElement,
      rect = target.getBoundingClientRect();
  e.offsetX = e.clientX - rect.left;
  e.offsetY = e.clientY - rect.top;
};

var defaultWidth = 275;
var defaultHeight = 275;

var Graphic = React.createClass({
  Bezier: require("bezier-js"),
  curve: false,
  mx:0,
  my:0,
  cx:0,
  cy:0,
  mp: { x: 0, y: 0},
  offset: { x: 0, y: 0},
  lpts: [],

  render: function() {
    var href = "data:text/plain," + this.props.code;
    return (
      <figure className={this.props.inline ? "inline": false}>
        <canvas ref="canvas"
                onMouseDown={this.mouseDown}
                onMouseMove={this.mouseMove}
                onMouseUp={this.mouseUp}
                onClick={this.mouseClick}
                />
        <figcaption>{this.props.title}</figcaption>
      </figure>
    );
  },

  componentDidMount: function() {
    var cvs = this.refs.canvas;
    cvs.width = defaultWidth;
    cvs.height = defaultHeight;
    this.cvs = cvs;
    var ctx = cvs.getContext("2d");
    this.ctx = ctx;

    if (this.props.setup) {
      this.props.setup(this);
    }

    if (this.props.draw) {
      this.props.draw(this,this.curve);
    }
  },

  mouseDown: function(evt) {
    fix(evt);
    this.mx = evt.offsetX;
    this.my = evt.offsetY;
    this.lpts.forEach(p => {
      if(Math.abs(this.mx - p.x)<10 && Math.abs(this.my - p.y)<10) {
        this.moving = true;
        this.mp = p;
        this.cx = p.x;
        this.cy = p.y;
      }
    });
  },

  mouseMove: function(evt) {
    fix(evt);
    var found = false;
    this.lpts.forEach(p => {
      var mx = evt.offsetX;
      var my = evt.offsetY;
      if(Math.abs(mx-p.x)<10 && Math.abs(my-p.y)<10) {
        found = found || true;
      }
    });
    this.cvs.style.cursor = found ? "pointer" : "default";

    if(!this.moving) return;
    this.ox = evt.offsetX - this.mx;
    this.oy = evt.offsetY - this.my;
    this.mp.x = this.cx + this.ox;
    this.mp.y = this.cy + this.oy;
    this.curve.update();

    if (this.props.draw) {
      this.props.draw(this, this.curve);
    }
  },

  mouseUp: function(evt) {
    if(!this.moving) return;
    this.moving = false;
    this.mp = false;
  },

  mouseClick: function(evt) {
    fix(evt);
    this.mx = evt.offsetX;
    this.my = evt.offsetY;
  },



  /**
   * API for curve drawing.
   */



  reset: function() {
    this.refs.canvas.width = this.refs.canvas.width;
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;
    this.ctx.fillStyle = "none";
    this.offset = {x:0, y:0};
  },

  getPanelWidth: function() {
    return defaultWidth;
  },

  getPanelHeight: function() {
    return defaultHeight;
  },

  getDefaultQuadratic: function() {
    return new this.Bezier(70,250,20,110,250,60);
  },

  getDefaultCubic: function() {
    return new this.Bezier(120,160,35,200,220,260,220,40);
  },

  setPanelCount: function(c) {
    var cvs = this.refs.canvas;
    cvs.width = c*defaultWidth;
  },

  setCurve: function(c) {
    this.curve = c;
    this.lpts = c.points;
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

  setRandomColor: function() {
    var r = ((205*Math.random())|0),
        g = ((155*Math.random())|0),
        b = ((255*Math.random())|0);
    this.ctx.strokeStyle = "rgb("+r+","+g+","+b+")";
  },

  setRandomFill: function(a) {
    a = (typeof a === "undefined") ? 1 : a;
    var r = ((255*Math.random())|0),
        g = ((255*Math.random())|0),
        b = ((255*Math.random())|0);
    this.ctx.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
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

  drawSkeleton: function(curve, offset) {
    offset = offset || { x:0, y:0 };
    var pts = curve.points;
    this.ctx.strokeStyle = "lightgrey";
    this.drawLine(pts[0], pts[1], offset);
    if(pts.length === 3) { this.drawLine(pts[1], pts[2], offset); }
    else {this.drawLine(pts[2], pts[3], offset); }
    this.ctx.strokeStyle = "black";
    this.drawPoints(pts, offset);
    this.drawCoordinates(curve, offset);
  },

  drawCoordinates: function(curve, offset) {
    offset = offset || { x:0, y:0 };
    var pts = curve.points;
    this.setFill("black");
    pts.forEach(p => {
      this.text(`(${p.x},${p.y})`, {x:p.x + 5, y:p.y + 10});
    });
  },

  drawFunction: function(generator, offset) {
    var p0 = generator(0),
        plast = generator(1),
        step = generator.step || 0.01,
        p, t;
    for (t=step; t<1.0; t+=step) {
      p = generator(t);
      this.drawLine(p0, p, offset);
      p0 = p;
    }
    this.drawLine(p, plast, offset);
  },

  drawCurve: function(curve, offset) {
    offset = offset || { x:0, y:0 };
    var ox = offset.x + this.offset.x;
    var oy = offset.y + this.offset.y;
    this.ctx.beginPath();
    var p = curve.points, i;
    this.ctx.moveTo(p[0].x + ox, p[0].y + oy);
    if(p.length === 3) {
      this.ctx.quadraticCurveTo(
        p[1].x + ox, p[1].y + oy,
        p[2].x + ox, p[2].y + oy
      );
    }
    if(p.length === 4) {
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
      this.drawCircle(p, 3, offset);
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

  text: function(text, offset) {
    offset = offset || { x:0, y:0 };
    if (this.offset) {
      offset.x += this.offset.x;
      offset.y += this.offset.y;
    }
    this.ctx.fillText(text, offset.x, offset.y);
  }
});

module.exports = Graphic;
