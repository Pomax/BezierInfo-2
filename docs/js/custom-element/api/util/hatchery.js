const HATCHING = [];

/**
 * Build hatching patterns. These are built fully unrolled,
 * mostly because they're small and there's no actual benefit
 * to abstracting the drawing for only six patterns.
 */
function hatch(canvasBuildFunction) {
  if (HATCHING.length > 0) {
    return HATCHING;
  }

  let cvs,
    ctx,
    w = 9,
    h = 9;

  if (canvasBuildFunction) {
    let b = canvasBuildFunction(w, h);
    cvs = b.canvas;
    ctx = b.ctx;
  } else {
    cvs = document.createElement("canvas");
    cvs.width = w;
    cvs.height = h;
    ctx = cvs.getContext(`2d`);
  }

  ctx.fillStyle = `#0000FF30`;
  ctx.lineWidth = 1;

  const paint = (x, y) => ctx.fillRect(x, y, 1, 1);

  // pattern: \
  ctx.clearRect(0, 0, w, h);
  paint(0, 0);
  paint(1, 1);
  paint(2, 2);
  paint(3, 3);
  paint(4, 4);
  paint(5, 5);
  paint(6, 6);
  paint(7, 7);
  paint(8, 8);
  HATCHING.push(ctx.createPattern(cvs, "repeat"));

  // pattern: /
  ctx.clearRect(0, 0, w, h);
  paint(0, 8);
  paint(1, 7);
  paint(2, 6);
  paint(3, 5);
  paint(4, 4);
  paint(5, 3);
  paint(6, 2);
  paint(7, 1);
  paint(8, 0);
  HATCHING.push(ctx.createPattern(cvs, "repeat"));

  // pattern: x (without clearing, because we can overlay)
  paint(0, 0);
  paint(1, 1);
  paint(2, 2);
  paint(3, 3);
  paint(5, 5);
  paint(6, 6);
  paint(7, 7);
  paint(8, 8);
  HATCHING.push(ctx.createPattern(cvs, "repeat"));

  // pattern: |
  ctx.clearRect(0, 0, w, h);
  paint(4, 0);
  paint(4, 1);
  paint(4, 2);
  paint(4, 3);
  paint(4, 4);
  paint(4, 5);
  paint(4, 6);
  paint(4, 7);
  paint(4, 8);
  HATCHING.push(ctx.createPattern(cvs, "repeat"));

  // pattern: -
  ctx.clearRect(0, 0, w, h);
  paint(0, 4);
  paint(1, 4);
  paint(2, 4);
  paint(3, 4);
  paint(4, 4);
  paint(5, 4);
  paint(6, 4);
  paint(7, 4);
  paint(8, 4);
  HATCHING.push(ctx.createPattern(cvs, "repeat"));

  // pattern: + (without clearing, because we can overlap)
  paint(4, 0);
  paint(4, 1);
  paint(4, 2);
  paint(4, 3);
  paint(4, 5);
  paint(4, 6);
  paint(4, 7);
  paint(4, 8);
  HATCHING.push(ctx.createPattern(cvs, "repeat"));

  return HATCHING;
}

export { hatch };
