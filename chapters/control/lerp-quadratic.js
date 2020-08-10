setup() {
    const w = this.width,
          h = this.height;

    this.f = [
        t => ({ x: t * w, y: h * (1-t) ** 2 }),
        t => ({ x: t * w, y: h * 2 * (1-t) * t }),
        t => ({ x: t * w, y: h * t ** 2 })
    ];

    this.s = this.f.map(f => plot(f) );
}

draw() {
    resetTransform();
    clear();
    setFill(`black`);
    setStroke(`black`);

    scale(0.8, 0.9);
    translate(40,20);
    drawAxes(`t`, 0, 10, `S`, `0%`, `100%`, 40, 20);

    noFill();

    this.s.forEach(s => {
        setStroke( randomColor() );
        drawShape(s);
    })

    this.drawHighlight();
}

drawHighlight() {
    if (this.cursor.down) {

        let c = screenToWorld(this.cursor);
        if (c.x < 0) return;
        if (c.x > this.width) return;

        noStroke();
        setFill(`rgba(255,0,0,0.3)`);
        rect(c.x - 2, 0, 5, this.height);

        const p = this.f.map(f => f(c.x / this.width));

        setFill(`black`);
        p.forEach(p => {
            circle(p.x, p.y, 3);
            text(`${ round(100 * p.y/this.height) }%`, p.x + 10, p.y);
        });
    }
}

onMouseMove() {
    redraw();
}

onMouseUp() {
    redraw();
}
