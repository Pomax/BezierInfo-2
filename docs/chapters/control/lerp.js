setup() {
    const w = this.width,
          h = this.height;

    const degree = this.parameters.degree ?? 3;

    if (degree === 3) {
        this.f = [
            t => ({ x: t * w, y: h * (1-t) ** 2 }),
            t => ({ x: t * w, y: h * 2 * (1-t) * t }),
            t => ({ x: t * w, y: h * t ** 2 })
        ];
    } else if (degree === 4) {
        this.f = [
            t => ({ x: t * w, y: h * (1-t) ** 3 }),
            t => ({ x: t * w, y: h * 3 * (1-t) ** 2 * t }),
            t => ({ x: t * w, y: h * 3 * (1-t) * t ** 2 }),
            t => ({ x: t * w, y: h * t ** 3})
        ];
    } else {
        this.triangle = [[1], [1,1]];
        this.f = [...new Array(degree + 1)].map((_,i) => {
            return t => ({
                x: t * w,
                y: h * binomial(degree,i) * (1-t) ** (degree-i) * t ** (i)
            });
        });
    }

    this.s = this.f.map(f => plot(f, 0, 1, degree*5) );
    setSlider(`.slide-control`, `position`, 0)
}

draw() {
    clear();
    setFill(`black`);
    setStroke(`black`);

    scale(0.8, 0.9);
    translate(40,20);
    drawAxes(`t`, 0, 1, `S`, `0%`, `100%`);

    noFill();

    this.s.forEach((s,i) => {
        setStroke(randomColor(0.2));
        line(
            i/(this.s.length-1) * this.width, 0,
            i/(this.s.length-1) * this.width, this.height
        )
        setStroke(randomColor(1.0, false ));
        drawShape(s);
    })

    this.drawHighlight();
}

drawHighlight() {
    const t = this.position;

    if (t===0) return;
    if (t===1) return;

    noStroke();
    setFill(`rgba(255,0,0,0.3)`);
    rect(t*this.width - 2, 0, 5, this.height);

    const p = this.f.map(f => f(t));

    setFill(`black`);
    p.forEach(p => {
        circle(p.x, p.y, 3);
        text(`${ round(100 * p.y/this.height) }%`, p.x + 10, p.y);
    });
}
