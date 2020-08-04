import { Point } from "../point.js";
import { Quadratic } from "./bezier-quadratic.js";
import { Cubic } from "./bezier-cubic.js";

class Bezier {
  static create(apiInstance, ...points) {
    let coords = [];
    if (points.length === 9 || points.length === 12) {
      for(let i=0, e=points.length; i<e; i += 3) {
        coords.push(new Point(points[i], points[i+1], points[i+2]));
      }
    }

    if (points.length === 6 || points.length === 8) {
      for(let i=0, e=points.length; i<e; i += 2) {
        coords.push(new Point(points[i], points[i+1]));
      }
    }

    if  (coords.length === 3) {
      return new Quadratic(apiInstance, coords);
    }

    if  (coords.length === 4) {
      return new Cubic(apiInstance, coords);
    }

    throw new Error(`Cannot create a Bezier curve for ${points.length} values`);
  }
}

export { Bezier };
