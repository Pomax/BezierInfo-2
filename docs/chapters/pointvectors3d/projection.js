/**
 * A cabinet projection utility
 */

// Universal projector function
function project(point3d, offset = { x: 0, y: 0 }, phi = -Math.PI / 6) {
  // what they rarely tell you: if you want Z to "go up",
  // X to "come out of the screen", and Y to be the "left/right",
  // we need to switch some coordinates around:
  const x = point3d.y,
    y = -point3d.z,
    z = -point3d.x;

  return {
    x: offset.x + x + (z / 2) * Math.cos(phi),
    y: offset.y + y + (z / 2) * Math.sin(phi),
  };
}

// and some rebuilt planar projectors
function projectXY(p, offset, phi) {
  return project({ x: p.x, y: p.y, z: 0 }, offset, phi);
}

function projectXZ(p, offset, phi) {
  return project({ x: p.x, y: 0, z: p.z }, offset, phi);
}

function projectYZ(p, offset, phi) {
  return project({ x: 0, y: p.y, z: p.z }, offset, phi);
}


export { project, projectXY, projectXZ, projectYZ }

