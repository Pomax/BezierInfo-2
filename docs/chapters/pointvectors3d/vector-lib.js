function normalize(v) {
  let z = v.z || 0;
  var d = Math.sqrt(v.x * v.x + v.y * v.y + z * z);
  let r = { x: v.x / d, y: v.y / d };
  if (v.z !== undefined) r.z = z / d;
  return r;
}

function dot(v1, v2) {
  let z1 = v1.z || 0;
  let z2 = v2.z || 0;
  return v1.x * v2.x + v1.y * v2.y + z1 * z2;
}

function scale(v, s) {
  let r = {
    x: s * v.x,
    y: s * v.y,
  };
  if (v.z !== undefined) {
    r.z = s * v.z;
  }
  return r;
}

function plus(v1, v2) {
  let r = {
    x: v1.x + v2.x,
    y: v1.y + v2.y,
  };
  if (v1.z !== undefined || v2.z !== undefined) {
    r.z = (v1.z || 0) + (v2.z || 0);
  }
  return r;
}

function minus(v1, v2) {
  let r = {
    x: v1.x - v2.x,
    y: v1.y - v2.y,
  };
  if (v1.z !== undefined || v2.z !== undefined) {
    r.z = (v1.z || 0) - (v2.z || 0);
  }
  return r;
}

function cross(v1, v2) {
  if (v1.z === undefined || v2.z === undefined) {
    throw new Error(`Cross product is not defined for 2D vectors.`);
  }
  return {
    x: v1.y * v2.z - v1.z * v2.y,
    y: v1.z * v2.x - v1.x * v2.z,
    z: v1.x * v2.y - v1.y * v2.x,
  };
}

function lerp(t, v1, v2) {
  let r = {
    x: (1 - t) * v1.x + t * v2.x,
    y: (1 - t) * v1.y + t * v2.y,
  };
  if (v1.z !== undefined || v2.z !== undefined) {
    r.z = (1 - t) * (v1.z || 0) + t * (v2.z || 0);
  }
  return r;
}

export default { normalize, dot, scale, plus, minus, cross, lerp };
