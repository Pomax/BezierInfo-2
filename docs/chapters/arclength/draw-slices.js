setup() {
    this.steps = this.parameters.steps ?? 10;
}

draw() {
    clear();

    const w = this.width;
    const h = this.height;
    const a = h/3;

    let trueArea = (4 * a).toFixed(2);
    let computedArea = this.drawSlices(w, h, a, this.steps).toFixed(2);

    setStroke(`black`);
    line(0, h/2, w, h/2);

    noFill();
    setStroke(`black`);
    start();
    for(let i=0, f=TAU/w; i<w; i++) {
        vertex(i, sin(i*f) * a + h/2);
    }
    end();

    setFill(`black`);
    text(`Approximating with ${this.steps} strips : ${computedArea} (true area: ${trueArea})`, w/2, h-10, CENTER);
}

drawSlices(w, h, a, n) {
    if (n < 50) setStroke(`white`);

    let area = 0;
    let step = w/n;
    for(let i=0, f=TAU/w, c, y; i<w; i += step) {
        c = `rgba(150,150,255,${random(0.4, 0.7)}`;
        if (n > 50) setStroke(c);
        setFill(c);
        y = sin((i+step/2) * f) * a;
        rect(i, h/2, step, y);
        area += abs(step * f * y);
    }

    return area;
}
