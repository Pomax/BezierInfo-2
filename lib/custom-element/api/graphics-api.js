import { enrich } from "../lib/enrich.js";
import { Bezier } from "./types/bezier.js";
import { Vector } from "./types/vector.js";
import { Shape } from "./util/shape.js";
import { BaseAPI } from "./base-api.js";

const MOUSE_PRECISION_ZONE = 5;
const TOUCH_PRECISION_ZONE = 30;

let CURRENT_HUE = 0;

/**
 * Our Graphics API, which is the "public" side of the API.
 */
class GraphicsAPI extends BaseAPI {
  static get constants() {
    return [
      `POINTER`,
      `HAND`,
      `PI`,
      `TAU`,
      `POLYGON`,
      `CURVE`,
      `BEZIER`,
      `CENTER`,
      `LEFT`,
      `RIGHT`,
    ];
  }

  draw() {
    CURRENT_HUE = 0;
    super.draw();
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
  get CENTER() {
    return `center`;
  }
  get LEFT() {
    return `left`;
  }
  get RIGHT() {
    return `right`;
  }

  onMouseDown(evt) {
    super.onMouseDown(evt);

    const cdist = evt.targetTouches
      ? TOUCH_PRECISION_ZONE
      : MOUSE_PRECISION_ZONE;

    for (let i = 0, e = this.moveable.length, p, d; i < e; i++) {
      p = this.moveable[i];
      d = new Vector(p).dist(this.cursor);
      if (d <= cdist) {
        this.currentPoint = p;
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
   * transforms: scale
   */
  scale(x, y) {
    y = y ?? x;
    this.ctx.scale(x, y);
  }
  /**
   * transforms: screen to world
   */
  screenToWorld(x, y) {
    if (y === undefined) {
      y = x.y;
      x = x.x;
    }

    let M = this.ctx.getTransform().invertSelf();

    let ret = {
      x: x * M.a + y * M.c + M.e,
      y: x * M.b + y * M.d + M.f,
    };

    return ret;
  }

  /**
   * transforms: world to screen
   */
  worldToScreen(x, y) {
    if (y === undefined) {
      y = x.y;
      x = x.x;
    }

    let M = this.ctx.getTransform();

    let ret = {
      x: x * M.a + y * M.c + M.e,
      y: x * M.b + y * M.d + M.f,
    };

    return ret;
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
    if (!this.element) return false;
    return enrich(this.element.querySelector(qs));
  }

  /**
   * custom element scoped querySelectorAll
   */
  findAll(qs) {
    if (!this.element) return false;
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
   * Get a random color
   */
  randomColor(a = 1.0) {
    CURRENT_HUE = (CURRENT_HUE + 73) % 360;
    return `hsla(${CURRENT_HUE},50%,50%,${a})`;
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
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  /**
   * Draw a circle around a Point
   */
  circle(x, y, r) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, this.TAU);
    this.ctx.fill();
    this.ctx.stroke();
  }

  /**
   * Draw text on the canvas
   */
  text(str, x, y, alignment) {
    if (y === undefined) {
      y = x.y;
      x = x.x;
    }
    const ctx = this.ctx;
    if (alignment) {
      ctx.cacheStyle();
      ctx.textAlign = alignment;
    }
    this.ctx.fillText(str, x, y);
    if (alignment) ctx.restoreStyle();
  }

  /**
   * Draw a rectangle start with {p} in the upper left
   */
  rect(x, y, w, h) {
    this.ctx.fillRect(x, y, w, h);
    this.ctx.strokeRect(x, y, w, h);
  }

  /**
   * Draw a function plot from [start] to [end] in [steps] steps.
   * Returns the plot shape so that it can be cached for redrawing.
   */
  plot(fn, start = 0, end = 1, steps = 24) {
    const ctx = this.ctx;
    ctx.cacheStyle();
    ctx.fillStyle = `transparent`;
    const interval = end - start;
    this.start();
    for (let i = 0, e = steps - 1, v; i < steps; i++) {
      v = fn(start + (interval * i) / e);
      this.vertex(v.x, v.y);
    }
    this.end();
    ctx.restoreStyle();
    return this.currentShape;
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
   * Draw a previously created shape
   */
  drawShape(shape) {
    this.currentShape = shape;
    this.end();
  }

  /**
   * A signal to draw the current complex shape
   */
  end() {
    this.ctx.beginPath();
    let { x, y } = this.currentShape.first;
    this.ctx.moveTo(x, y);
    this.currentShape.segments.forEach((s) =>
      this[`draw${s.type}`](s.points, s.factor)
    );
    this.ctx.fill();
    this.ctx.stroke();
  }

  /**
   * Polygon draw function
   */
  drawPolygon(points) {
    points.forEach((p) => this.ctx.lineTo(p.x, p.y));
  }

  /**
   * Curve draw function, which draws a CR curve as a series of Beziers
   */
  drawCatmullRom(points, f) {
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
        x: c2.x + (c3.x - c1.x) / (6 * f),
        y: c2.y + (c3.y - c1.y) / (6 * f),
      };
      let p3 = {
        x: c3.x - (c4.x - c2.x) / (6 * f),
        y: c3.y - (c4.y - c2.y) / (6 * f),
      };
      this.ctx.bezierCurveTo(p2.x, p2.y, p3.x, p3.y, c3.x, c3.y);
    }
  }

  /**
   * Curve draw function, which assumes Bezier coordinates
   */
  drawBezier(points) {
    for (let i = 0, e = points.length; i < e; i += 3) {
      let [p1, p2, p3] = points.slice(i, i + 3);
      this.ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    }
  }
  /**
   * Yield a snapshot of the current shape.
   */
  save() {
    return this.currentShape;
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
   * convenient axis drawing function
   *
   *    api.drawAxes(pad, "t",0,1, "S","0%","100%");
   *
   */
  drawAxes(hlabel, hs, he, vlabel, vs, ve) {
    const h = this.height;
    const w = this.width;

    this.line(0, 0, w, 0);
    this.line(0, 0, 0, h);

    const hpos = 0 - 5;
    this.text(`${hlabel} →`, this.width / 2, hpos, this.CENTER);
    this.text(hs, 0, hpos, this.CENTER);
    this.text(he, w, hpos, this.CENTER);

    const vpos = -10;
    this.text(`${vlabel}\n↓`, vpos, this.height / 2, this.RIGHT);
    this.text(vs, vpos, 0 + 5, this.RIGHT);
    this.text(ve, vpos, h, this.RIGHT);
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
