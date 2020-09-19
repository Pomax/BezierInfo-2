/**
 * A complex shape, represented as a collection of paths
 * that can be either polygon, Catmull-Rom curves, or
 * cubic Bezier curves.
 */
class Shape {
  constructor(type, factor, points = []) {
    this.first = false;
    this.segments = [];
    this.newSegment(type, factor);
    points.forEach((p) => this.vertex(p));
  }
  merge(other) {
    if (!other.segments) {
      other = { segments: [new Segment(Shape.POLYGON, undefined, other)] };
    }
    other.segments.forEach((s) => this.segments.push(s));
  }
  copy() {
    const copy = new Shape(this.type, this.factor);
    copy.first = this.first;
    copy.segments = this.segments.map((s) => s.copy());
    return copy;
  }
  newSegment(type, factor) {
    this.currentSegment = new Segment(type, factor);
    this.segments.push(this.currentSegment);
  }
  vertex(p) {
    if (!this.first) this.first = p;
    else this.currentSegment.add(p);
  }
}

/**
 * Pathing type constants
 */
Shape.POLYGON = `Polygon`;
Shape.CURVE = `CatmullRom`;
Shape.BEZIER = `Bezier`;

/**
 * A shape subpath
 */
class Segment {
  constructor(type, factor, points = []) {
    this.type = type;
    this.factor = factor;
    this.points = points;
  }
  copy() {
    const copy = new Segment(this.type, this.factor);
    copy.points = JSON.parse(JSON.stringify(this.points));
    return copy;
  }
  add(p) {
    this.points.push(p);
  }
}

export { Shape, Segment };
