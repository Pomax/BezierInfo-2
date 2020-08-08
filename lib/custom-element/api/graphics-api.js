import { enrich } from "../lib/enrich.js";
import { Bezier } from "./types/bezier.js";
import { Vector } from "./types/vector.js";
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

  onMouseDown(evt) {
    super.onMouseDown(evt);

    const cdist = evt.targetTouches ? 10 : 5;

    for (let i = 0, e = this.moveable.length, p; i < e; i++) {
      p = this.moveable[i];

      console.log(`m check:`, p);

      if (new Vector(p).dist(this.cursor) <= cdist) {
        this.currentPoint = p;
        console.log(`current point found`);

        break;
      }
    }
  }

  onMouseMove(evt) {
    super.onMouseMove(evt);
    if (this.currentPoint) {
      this.currentPoint.x = this.cursor.x;
      this.currentPoint.y = this.cursor.y;
    } else {
      for (let i = 0, e = this.moveable.length, p; i < e; i++) {
        p = this.moveable[i];
        if (new Vector(p).dist(this.cursor) <= 5) {
          this.setCursor(this.HAND);
          return; // NOTE: this is a return, not a break.
        }
      }
      this.setCursor(this.POINTER);
    }
  }

  onMouseUp(evt) {
    super.onMouseUp(evt);
    this.currentPoint = undefined;
  }

  setMovable(points) {
    points.forEach((p) => this.moveable.push(p));
  }

  /**
   * transforms: translate
   */
  translate(x, y) {
    this.ctx.translate(x, y);
  }

  /**
   * transforms: rotate
   */
  rotate(angle) {
    this.ctx.rotate(angle);
  }

  /**
   * transforms: reset
   */
  resetTransform() {
    this.ctx.resetTransform();
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
  clear(color = `white`) {
    this.ctx.cacheStyle();
    this.resetTransform();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restoreStyle();
  }

  /**
   * Draw a Point (or {x,y,z?} conformant) object on the canvas
   */
  point(x, y) {
    this.circle(x, y, 5);
  }

  /**
   * Draw a line between two Points
   */
  line(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1 + 0.5, y1 + 0.5);
    this.ctx.lineTo(x2 + 0.5, y2 + 0.5);
    this.ctx.stroke();
  }

  /**
   * Draw a circle around a Point
   */
  circle(x, y, r) {
    this.ctx.beginPath();
    this.ctx.arc(x + 0.5, y + 0.5, r, 0, this.TAU);
    this.ctx.fill();
    this.ctx.stroke();
  }

  /**
   * Draw text on the canvas
   */
  text(str, x, y) {
    if (y === undefined) {
      y = x.y;
      x = x.x;
    }
    this.ctx.fillText(str, x + 0.5, y + 0.5);
  }

  /**
   * Draw a rectangle start with {p} in the upper left
   */
  rect(x, y, w, h) {
    this.ctx.fillRect(x + 0.5, y + 0.5, w, h);
    this.ctx.strokeRect(x + 0.5, y + 0.5, w, h);
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
  vertex(x, y) {
    this.currentShape.vertex({ x, y });
  }

  /**
   * A signal to draw the current complex shape
   */
  end() {
    this.ctx.beginPath();
    let { x, y } = this.currentShape.first;
    this.ctx.moveTo(x, y);
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
   * convenient grid drawing function
   */
  drawGrid(division = 20) {
    for (let x = (division / 2) | 0; x < this.width; x += division) {
      this.line({ x, y: 0 }, { x, y: this.height });
    }
    for (let y = (division / 2) | 0; y < this.height; y += division) {
      this.line({ x: 0, y }, { x: this.width, y });
    }
  }

  /**
   * math functions
   */
  floor(v) {
    return Math.floor(v);
  }

  ceil(v) {
    return Math.ceil(v);
  }

  round(v) {
    return Math.round(v);
  }

  abs(v) {
    return Math.abs(v);
  }

  sin(v) {
    return Math.sin(v);
  }

  cos(v) {
    return Math.cos(v);
  }

  tan(v) {
    return Math.tan(v);
  }

  sqrt(v) {
    return Math.sqrt(v);
  }

  atan2(dy, dx) {
    return Math.atan2(dy, dx);
  }

  pow(v, p) {
    return Math.pow(v, p);
  }

  map(v, s, e, ns, ne, constrain = false) {
    const i1 = e - s,
      i2 = ne - ns,
      p = v - s;
    let r = ns + (p * i2) / i1;
    if (constrain) r = r < ns ? ns : r > ne ? ne : r;
    return r;
  }
}

export { GraphicsAPI, Bezier, Vector };
