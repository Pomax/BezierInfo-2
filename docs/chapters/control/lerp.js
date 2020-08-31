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
                y: h * this.binomial(degree,i) * (1-t) ** (degree-i) * t ** (i)
            });
        });
    }

    this.s = this.f.map(f => plot(f, 0, 1, degree*4) );
    setSlider(`.slide-control`, `position`, 0)
}

binomial(n,k) {
    if (!this.triangle[n]) {
        while(!this.triangle[n]) {
            let last = this.triangle.slice(-1)[0];
            let next = last.map((v,i) => v + last[i+1]);
            next.pop();
            this.triangle.push([1, ...next, 1]);
        }
    }
    return this.triangle[n][k];
}

draw() {
    clear();
    setFill(`black`);
    setStroke(`black`);

    scale(0.8, 0.9);
    translate(40,20);
    drawAxes(`t`, 0, 1, `S`, `0%`, `100%`);

    noFill();

    this.s.forEach(s => {
        setStroke( randomColor() );
        drawShape(s);
    })

    this.drawHighlight();
}

drawHighlight() {
    let c = screenToWorld({
        x: map(this.position, 0, 1, -10, this.width + 10),
        y: this.height/2
    });

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
