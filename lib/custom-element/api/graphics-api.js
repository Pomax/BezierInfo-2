import { enrich } from "../lib/enrich.js";
import { Point } from "./types/point.js";
import { Bezier } from "./types/bezier/base.js";
import { Shape } from "./util/shape.js";
import { BaseAPI } from "./base-api.js";

/**
 * Our Graphics API, which is the "public" side of the API.
 */
class GraphicsAPI extends BaseAPI {
  static get constants() {
    return [`POINTER`, `HAND`, `PI`, `TAU`, `POLYGON`, `CURVE`, `BEZIER`];
  }

  get PI() {
    return 3.14159265358979;
  }
  get TAU() {
    return 6.28318530717958;
  }
  get POINTER() {
    return `default`;
  }
  get HAND() {
    return `pointer`;
  }
  get POLYGON() {
    return Shape.POLYGON;
  }
  get CURVE() {
    return Shape.CURVE;
  }
  get BEZIER() {
    return Shape.BEZIER;
  }

  /**
   * custom element scoped querySelector
   */
  find(qs) {
    return enrich(this.element.querySelector(qs));
  }

  /**
   * custom element scoped querySelectorAll
   */
  findAll(qs) {
    return Array.from(this.element.querySelectorAll(qs)).map((e) => enrich(e));
  }

  /**
   * Set a (CSS) border on the canvas
   */
  setBorder(width = 1, color = `black`) {
    if (width === false) {
      this.canvas.style.border = `none`;
    } else {
      this.canvas.style.border = `${width}px solid ${color}`;
    }
  }

  /**
   * Set the cursor type while the cursor is over the canvas
   */
  setCursor(type) {
    this.canvas.style.cursor = type;
  }

  /**
   * Set the context fillStyle
   */
  setFill(color) {
    if (color === false) color = `transparent`;
    this.ctx.fillStyle = color;
  }

  /**
   * Convenience alias
   */
  noFill() {
    this.setFill(false);
  }

  /**
   * Set the context strokeStyle
   */
  setStroke(color) {
    if (color === false) color = `transparent`;
    this.ctx.strokeStyle = color;
  }

  /**
   * Convenience alias
   */
  noStroke() {
    this.setStroke(false);
  }

  /**
   * Set the context lineWidth
   */
  setWidth(width) {
    this.ctx.lineWidth = `${width}px`;
  }

  /**
   * Reset the canvas bitmap to a uniform color.
   */
  clear(color=`white`) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draw a Point (or {x,y,z?} conformant) object on the canvas
   */
  point(point) {
    point.draw(this.ctx);
  }

  /**
   * Draw a line between two Points
   */
  line(p1, p2) {
    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.stroke();
  }

  /**
   * Draw a circle around a Point
   */
  circle(p, r) {
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, r, 0, this.TAU);
    this.ctx.fill();
    this.ctx.stroke();
  }

  /**
   * Draw text on the canvas
   */
  text(str, x, y) {
    this.ctx.fillText(str, x, y);
  }

  /**
   * Draw a rectangle start with {p} in the upper left
   */
  rect(p, w, h) {
    this.ctx.fillRect(p.x, p.y, w, h);
    this.ctx.strokeRect(p.x, p.y, w, h);
  }

  /**
   * A signal for starting a complex shape
   */
  start(type) {
    this.currentShape = new Shape(type || this.POLYGON);
  }

  /**
   * A signal for starting a new segment of a complex shape
   */
  segment(type, factor) {
    this.currentShape.addSegment(type, factor);
  }

  /**
   * Add a plain point to the current shape
   */
  vertex(p) {
    this.currentShape.vertex(p);
  }

  /**
   * A signal to draw the current complex shape
   */
  end() {
    this.ctx.beginPath();
    let first = this.currentShape.first;
    this.ctx.moveTo(first.x, first.y);
    this.currentShape.segments.forEach((s) =>
      this[`draw${s.type}`](this.ctx, s.points, s.factor)
    );
    this.ctx.fill();
    this.ctx.stroke();
  }

  /**
   * Yield a snapshot of the current shape.
   */
  save() {
    return this.currentShape;
  }

  /**
   * Draw a previously created shape
   */
  drawShape(shape) {
    this.currentShape = shape;
    this.end();
  }

  /**
   * Polygon draw function
   */
  drawPolygon(ctx, points) {
    points.forEach((p) => ctx.lineTo(p.x, p.y));
  }

  /**
   * Curve draw function, which draws a CR curve as a series of Beziers
   */
  drawCatmullRom(ctx, points, f) {
    // invent a virtual first and last point
    const f0 = points[0],
      f1 = points[1],
      fn = f0.reflect(f1),
      l1 = points[points.length - 2],
      l0 = points[points.length - 1],
      ln = l0.reflect(l1),
      cpoints = [fn, ...points, ln];

    // four point sliding window over the segment
    for (let i = 0, e = cpoints.length - 3; i < e; i++) {
      let [c1, c2, c3, c4] = cpoints.slice(i, i + 4);
      let p2 = {
        x: c2.x + (c3.x - c1.x)/(6*f),
        y: c2.y + (c3.y - c1.y)/(6*f)
      };
      let p3 = {
        x: c3.x - (c4.x - c2.x)/(6*f),
        y: c3.y - (c4.y - c2.y)/(6*f)
      };
      ctx.bezierCurveTo(p2.x, p2.y, p3.x, p3.y, c3.x, c3.y);
    }
  }

  /**
   * Curve draw function, which assumes Bezier coordinates
   */
  drawBezier(ctx, points) {
    for (let i = 0, e = points.length; i < e; i+=3) {
      let [p1, p2, p3] = points.slice(i, i + 3);
      ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    }
  }

  /**
   * convenient grid drawing function
   */
  drawGrid(division=20) {
    for(let x=(division/2)|0; x<this.width; x+=division) {
      this.line({x,y:0}, {x,y:this.height});
    }
    for(let y=(division/2)|0; y<this.height; y+=division) {
      this.line({x:0,y}, {x:this.width,y});
    }
  }

  // TODO: add in transform functions (translate, rotate, scale, skew)
}

export { GraphicsAPI, Bezier, Point };
