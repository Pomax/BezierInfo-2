/**
 * A shape subpath
 */
class Segment {
  constructor(type, factor) {
    this.type = type;
    this.factor = factor;
    this.points = [];
  }
  add(p) {
    this.points.push(p);
  }
}

/**
 * A complex shape, represented as a collection of paths
 * that can be either polygon, Catmull-Rom curves, or
 * cubic Bezier curves.
 */
class Shape {
  constructor(type, factor) {
    this.first = false;
    this.segments = [];
    this.addSegment(type, factor);
  }
  addSegment(type, factor) {
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

export { Shape, Segment };
