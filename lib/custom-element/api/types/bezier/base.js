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

  static defaultQuadratic(apiInstance) {
    return this.create(apiInstance, 70,250,  20,110,  220,60);
  }

  static defaultCubic(apiInstance) {
    return this.create(apiInstance, 110,150,  25,190,  210,250,  210,30);
  }
}

export { Bezier };
