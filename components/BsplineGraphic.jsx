var React = require('react');

var interpolate = require("../lib/spline");

var BSplineGraphic = React.createClass({

  componentWillMount() {
    // lots of instance binding, because we want instance binding, not proto/class binding.
    this.cvs = undefined;
    this.ctx = undefined;
    this.key = undefined;
    this.keyCode = undefined;
    this.mouseX = undefined;
    this.mouseY = undefined;
    this.isMouseDown = undefined;
    this.width = 0;
    this.height = 0;
    this.activeDistance = 9;
    this.points = [];
    this.knots = [];
    this.weights = [];
    this.nodes = [];
    this.cp = undefined;
    this.dx = undefined;
    this.dy = undefined;
    // and sketch value binding.
    var sketch = this.props.sketch;
    Object.keys(sketch).forEach(fn => {
      this[fn] = sketch[fn];
      // rebind "this" if we're dealing with a function
      if (typeof this[fn] === "function") {
        this[fn] = this[fn].bind(this);
      }
    });
  },

  render: function() {
    return <canvas className="bspline-graphic" ref="sketch" />;
  },

  keydownlisten(e)   { this.setKeyboardValues(e); this.keyDown(); },
  keyuplisten(e)     { this.setKeyboardValues(e); this.keyUp(); },
  keypresslisten(e)  { this.setKeyboardValues(e); this.keyPressed(); },
  mousedownlisten(e) { this.setMouseValues(e); this.mouseDown(); },
  mouseuplisten(e)   { this.setMouseValues(e); this.mouseUp(); },
  mousemovelisten(e) { this.setMouseValues(e); this.mouseMove(); if(this.isMouseDown && this.mouseDrag) { this.mouseDrag(); }},
  wheellissten(e)    { e.preventDefault(); this.scrolled(e.deltaY < 0 ? 1 : -1); },

  componentDidMount() {
    var cvs = this.cvs = this.refs.sketch;
    // Keyboard event handling
    cvs.addEventListener("keydown",  this.keydownlisten);
    cvs.addEventListener("keyup",    this.keyuplisten);
    cvs.addEventListener("keypress", this.keypresslisten);
    // Mouse event handling
    cvs.addEventListener("mousedown", this.mousedownlisten);
    cvs.addEventListener("mouseup",   this.mouseuplisten);
    cvs.addEventListener("mousemove", this.mousemovelisten);
    // Scroll event handling
    if (this.props.scrolling) { cvs.addEventListener("wheel", this.wheellissten); }
    // Boom let's go
    this.setup();
  },

  componentWillUnmount() {
    var cvs = this.cvs = this.refs.sketch;
    cvs.removeEventListener("keydown",  this.keydownlisten);
    cvs.removeEventListener("keyup",    this.keyuplisten);
    cvs.removeEventListener("keypress", this.keypresslisten);
    cvs.removeEventListener("mousedown", this.mousedownlisten);
    cvs.removeEventListener("mouseup",   this.mouseuplisten);
    cvs.removeEventListener("mousemove", this.mousemovelisten);
    if (this.props.scrolling) { cvs.removeEventListener("wheel", this.wheellissten); }
  },

  // base API

  drawCurve(points) {
    points = points || this.points;
    var ctx = this.ctx;
    var weights = this.weights.length>0 ? this.weights : false;
    ctx.beginPath();
    var p = interpolate(0, this.degree, points, this.knots, weights);
    ctx.moveTo(p[0], p[1]);
    for(let t=0.01; t<1; t+=0.01) {
      p = interpolate(t, this.degree, points, this.knots, weights);
      ctx.lineTo(p[0], p[1]);
    }
    p = interpolate(1, this.degree, points, this.knots, weights);
    ctx.lineTo(p[0], p[1]);
    ctx.stroke();
    ctx.closePath();
  },

  drawKnots(points) {
    var knots = this.knots;
    var weights = this.weights.length>0 ? this.weights : false;
    knots.forEach((knot,i) => {
      if (i < this.degree) return;
      if (i > knots.length - 1 - this.degree) return;
      var p = interpolate(knot, this.degree, points, knots, weights, false, true);
      this.circle(p[0], p[1], 3);
    });
  },

  // FIXME: TODO: these do not seem correct using uniform knots
  drawNodes(points) {
    var i = 0, p;
    this.stroke(150);
    this.nodes.forEach((node,i) => {
      try {
        p = interpolate(node, this.degree, points, this.knots, false, false, true);
        this.line(p[0],p[1], points[i][0], points[i++][1]);
      } catch (e) { console.error(e); }
    });
  },

  // FIXME: this doesn't work with a degree change
  formKnots(points, open) {
    open = (open===true) ? true: false;
    if(!open) return this.formUniformKnots(points);

    var l = points.length,
        knots = [],
        m = l - this.degree,
        i;

    // form the open-uniform knot vector
    for (i=1; i < l - this.degree; i++) { knots.push(i + this.degree); }
    // add [degree] zeroes at the front
    for (i=0; i <= this.degree; i++)  { knots = [this.degree].concat(knots); }
    // add [degree] max-values to the back
    for (i=0; i <= this.degree; i++)  { knots.push(m + this.degree); }

    return knots;
  },

  formUniformKnots(points) {
    var knots = [];
    for(var i = this.points.length + this.degree; i >= 0; i--) {
      knots.push(i);
    }
    return knots.reverse();
  },

  formNodes(knots, points) {
    var domain = [
      this.degree,
      knots.length - 1 - this.degree
    ];
    var nodes = [], node, k, offset;
    for (k=0; k < this.points.length; k++) {
      node = 0;
      for (offset=1; offset <= this.degree; offset++) {
        node += knots[k+offset];
      }
      node /= this.degree;
      if (node < knots[domain[0]]) continue;
      if (node > knots[domain[1]]) continue;
      nodes.push(node);
    }
    return nodes;
  },

  formWeights(points) {
    var weights = [];
    points.forEach(p => weights.push(1));
    return weights;
  },

  setDegree(d) {
    this.degree += d;
    this.knots = this.formKnots(this.points);
    this.nodes = this.formNodes(this.knots, this.points);
  },

  near(p, x, y) {
    var dx = p.x-x,
        dy = p.y-y,
        d = Math.sqrt(dx*dx + dy*dy);
    return d < this.activeDistance;
  },

  getCurrentPoint(x,y) {
    for(let i=0; i < this.points.length; i++) {
      if (this.near(this.points[i],x,y)) {
        return this.points[i];
      }
    }
  },

  // Interaction stuffs

  keyDown() {
    if (this.key === 'ArrowUp') {
      this.setDegree(1);
    }
    if (this.key === 'ArrowDown') {
      if(this.degree>1) {
        this.setDegree(-1);
      }
    }
    this.redraw();
  },

  keyUp() {
    // ... do nothing?
  },

  keyPressed() {
    // ... do nothing?
  },

  mouseDown() {
    this.isMouseDown = true;
    this.cp = this.getCurrentPoint(this.mouseX, this.mouseY);
    if (!this.cp) {
      this.points.push({ x: this.mouseX, y: this.mouseY});
      this.knots = this.formKnots(this.points);
      this.nodes = this.formNodes(this.knots, this.points);
    }
    this.redraw();
  },

  mouseUp() {
    this.isMouseDown = false;
    this.cp = false;
    this.redraw();
  },

  mouseDrag() {
    if (this.cp) {
      this.cp.x = this.mouseX;
      this.cp.y = this.mouseY;
      this.redraw();
    }
  },

  mouseMove() {
    // ... do nothing?
  },

  scrolled(direction) {
    this.cp = this.getCurrentPoint(this.mouseX, this.mouseY);
    if (!this.cp) return;
    // base case
    var pos = this.points.indexOf(this.cp);
    if (this.weights.length>pos) {
      this.weights[pos] += direction * 0.1;
      if (this.weights[pos] < 0) {
        this.weights[pos] = 0;
      }
    }
    // possible multiplicity due to "closed" curves
    pos = this.points.indexOf(this.cp, pos+1);
    if (pos!==-1 && this.weights.length>pos) {
      this.weights[pos] += direction * 0.1;
      if (this.weights[pos] < 0) {
        this.weights[pos] = 0;
      }
    }
    this.redraw();
  },

  // keyboard events
  setKeyboardValues(e) {
    if (!e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
    }
    this.key = e.key;
    this.keyCode = e.code;
  },

  // mouse events
  setMouseValues(e) {
    var brect = this.cvs.getBoundingClientRect();
    this.mouseX = e.clientX - brect.left;
    this.mouseY = e.clientY - brect.top;
  },

  // API stuffs

  size(w,h) {
    this.width = w|0;
    this.height = (h||w)|0;
    this.cvs.width = this.width;
    this.cvs.height = this.height;
    this.ctx = this.cvs.getContext("2d");
  },

  redraw() { this.draw(); },

  clear() {
    this.ctx.clearRect(0,0,this.width,this.height);
  },

  grid(spacing) {
    spacing = ((spacing || 10)|0) + 0.5;
    this.stroke(200,200,220);
    for(let x=spacing; x<this.width-1; x+=spacing) { this.line(x,0,x,this.height); }
    for(let y=spacing; y<this.height-1; y+=spacing) { this.line(0,y,this.width,y); }
  },

  circle(x,y,r) {
    let hr = r/2;
    var ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.stroke();
    ctx.closePath();
  },

  line(a,b,c,d) {
    var ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(a,b);
    ctx.lineTo(c,d);
    ctx.stroke();
    ctx.closePath();
  },

  stroke(r,g,b,a) {
    if (typeof r === "string") {
      return (this.ctx.strokeStyle = r);
    }
    if (g===undefined) { g=r; b=r; }
    if (a===undefined) { a = 1; }
    this.ctx.strokeStyle = this.rgba(r,g,b,a);
  },

  noStroke() { this.ctx.strokeStyle = "none"; },

  fill(r,g,b,a) {
    if (typeof r === "string") {
      return (this.ctx.fillStyle = r);
    }
    if (g===undefined) { g=r; b=r; }
    if (a===undefined) { a = 1; }
    this.ctx.fillStyle = this.rgba(r,g,b,a);
  },

  noFill() { this.ctx.fillStyle = "none"; },

  rgba(r,g,b,a) { return "rgba("+r+","+g+","+b+","+a+")"; },

  beginPath() {
    this.ctx.beginPath(); this.bp = true;
  },

  vertex(x,y) {
    if (!this.bp) {
      return this.ctx.lineTo(x,y);
    }
    this.ctx.moveTo(x,y);
    this.bp = false;
  },

  endPath() {
    this.ctx.stroke();
    this.ctx.closePath();
  }
});

module.exports = BSplineGraphic;
