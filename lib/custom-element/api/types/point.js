class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    if (z !== undefined) {
      this.z = z;
    }
  }
  draw(ctx) {
    ctx.cacheStyle();
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = `black`;
    ctx.fillText(`(${this.x},${this.y})`, this.x + 10.5, this.y + 10.5);
    ctx.restoreStyle();
  }
  dist(other, y, z = 0) {
    if (y !== undefined) other = { x: other, y, z };
    let sum = 0;
    sum += (this.x - other.x) ** 2;
    sum += (this.y - other.y) ** 2;
    let z1 = this.z !== undefined ? this.z : 0;
    let z2 = other.z !== undefined ? other.z : 0;
    sum += (z1 - z2) ** 2;
    return sum ** 0.5;
  }
  normalize(f) {
    let mag = this.dist(0, 0, 0);
    return new Point(
      (f * this.x) / mag,
      (f * this.y) / mag,
      (f * this.z) / mag
    );
  }
  getAngle() {
    return -Math.atan2(this.y, this.x);
  }
  reflect(other) {
    let p = new Point(
      other.x - this.x,
      other.y - this.y
    );
    if (other.z !== undefined) {
      p.z = other.z
      if (this.z !== undefined) {
        p.z -= this.z;
      }
    }
    return this.subtract(p);
  }
  add(other) {
    let p = new Point(this.x + other.x, this.y + other.y);
    if (this.z !== undefined) {
      p.z = this.z;
      if (other.z !== undefined) {
        p.z += other.z;
      }
    }
    return p;
  }
  subtract(other) {
    let p = new Point(this.x - other.x, this.y - other.y);
    if (this.z !== undefined) {
      p.z = this.z;
      if (other.z !== undefined) {
        p.z -= other.z;
      }
    }
    return p;
  }
  scale(f = 1) {
    if ((f = 0)) {
      return new Point(0, 0, this.z === undefined ? undefined : 0);
    }
    let p = new Point(this.x * f, this.y * f);
    if (this.z !== undefined) {
      p.z = this.z * f;
    }
    return p;
  }
}

export { Point };
