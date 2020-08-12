class Vector {
  constructor(x, y, z) {
    if (arguments.length === 1) {
      z = x.z;
      y = x.y;
      x = x.x;
    }
    this.x = x;
    this.y = y;
    if (z !== undefined) {
      this.z = z;
    }
  }
  dist(other, y, z = 0) {
    if (y !== undefined) other = { x: other, y, z };
    let sum = 0;
    sum += (this.x - other.x) ** 2;
    sum += (this.y - other.y) ** 2;
    let z1 = this.z ? this.z : 0;
    let z2 = other.z ? other.z : 0;
    sum += (z1 - z2) ** 2;
    return sum ** 0.5;
  }
  normalize(f) {
    let mag = this.dist(0, 0, 0);
    return new Vector(
      (f * this.x) / mag,
      (f * this.y) / mag,
      (f * this.z) / mag
    );
  }
  getAngle() {
    return -Math.atan2(this.y, this.x);
  }
  reflect(other) {
    let p = new Vector(other.x - this.x, other.y - this.y);
    if (other.z !== undefined) {
      p.z = other.z;
      if (this.z !== undefined) {
        p.z -= this.z;
      }
    }
    return this.subtract(p);
  }
  add(other) {
    let p = new Vector(this.x + other.x, this.y + other.y);
    if (this.z !== undefined) {
      p.z = this.z;
      if (other.z !== undefined) {
        p.z += other.z;
      }
    }
    return p;
  }
  subtract(other) {
    let p = new Vector(this.x - other.x, this.y - other.y);
    if (this.z !== undefined) {
      p.z = this.z;
      if (other.z !== undefined) {
        p.z -= other.z;
      }
    }
    return p;
  }
  scale(f = 1) {
    if (f === 0) {
      return new Vector(0, 0, this.z === undefined ? undefined : 0);
    }
    let p = new Vector(this.x * f, this.y * f);
    if (this.z !== undefined) {
      p.z = this.z * f;
    }
    return p;
  }
}

export { Vector };
