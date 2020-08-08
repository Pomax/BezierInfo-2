setup() {
    this.step = 5;
}

draw() {
    clear();

    const dim = this.height,
        w = dim,
        h = dim,
        w2 = w/2,
        h2 = h/2,
        w4 = w2/2,
        h4 = h2/2;

    setStroke(`black`);
    line(0, h2, w, h2);
    line(w2, 0, w2, h);

    var offset = {x:w2, y:h2};

    for(let t=0, p, mod; t<=this.step; t+=0.1) {
      p = {
        x: w2 + w4 * cos(t),
        y: h2 + h4 * sin(t)
      };
      circle(p.x, p.y, 1);

      mod = t % 1;
      if(mod >= 0.9) {
        text(`t = ${ round(t) }`,
            w2 + 1.25 * w4 * cos(t) - 10,
            h2 + 1.25 * h4 * sin(t) + 10
        );
        circle(p.x, p.y, 2);
      }
    }
}

onKeyDown() {
    const key = this.keyboard.currentKey;

    if (key === `ArrowUp`) { this.step++; }
    if (key === `ArrowDown`) { this.step--; }

    if (this.step < 1) this.step = 1;
    redraw();
}

onMouseDown() {
    this.mark = this.cursor.y;
}

onMouseUp() {
    this.mark = false;
}

onMouseMove() {
    if (this.mark) {
        let diff = this.mark - this.cursor.y,
            mapped = map(diff, -this.height/2, this.height/2, 1, 10, true);
        this.step = mapped | 0;
        redraw();
    }
}
