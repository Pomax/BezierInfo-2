setup() {
    setSlider(`.slide-control`, `steps`, 5);
}

draw() {
    clear();

    const dim = this.height,
        w = dim,
        h = dim,
        // midpoints
        w2 = w/2,
        h2 = h/2,
        // quarterpoints
        q = dim/4;

    // draw axes with (0,0) in the middle of the graphic
    setStroke(`black`);
    line(0, h2, w, h2);
    line(w2, 0, w2, h);

    for(let t=0, p, step=0.1; t<=this.steps; t+=step) {
      // create a point at distance 'q' from the midpoint
      p = {
        x: w2 + q * cos(t),
        y: h2 + q * sin(t)
      };

      // and draw it.
      circle(p.x, p.y, 1);

      // then add a text label too, but only "near" each integer
      // step of `t`. Since we're using floating point numbers,
      // we can't rely on x * 1/x to actually be x (if only life
      // were that easy) so we need to check whether `t` is "near"
      // an integer value instead.
      if(approx(t % 1, 1, step)) {
        text(`t = ${round(t)}`,
            w2 + 1.25 * q * cos(t) - 10,
            h2 + 1.25 * q * sin(t) + 10
        );
        circle(p.x, p.y, 2);
      }
    }
}
