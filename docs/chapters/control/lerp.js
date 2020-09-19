setup() {
    const w = this.width,
          h = this.height;

    const degree = this.parameters.degree ?? 3;

    if (degree === 3) {
        // there are three interpolation functions for quadratic curves
        this.interpolationFunctions = [
            t => ({ x: t * w, y: h * (1-t) ** 2 }),
            t => ({ x: t * w, y: h * 2 * (1-t) * t }),
            t => ({ x: t * w, y: h * t ** 2 })
        ];
    } else if (degree === 4) {
        // there are four interpolation functions for cubic curves
        this.interpolationFunctions = [
            t => ({ x: t * w, y: h * (1-t) ** 3 }),
            t => ({ x: t * w, y: h * 3 * (1-t) ** 2 * t }),
            t => ({ x: t * w, y: h * 3 * (1-t) * t ** 2 }),
            t => ({ x: t * w, y: h * t ** 3})
        ];
    } else {
        // there are many interpolations functions for more complex curves
        this.interpolationFunctions = [...new Array(degree + 1)].map((_,i) => {
            return t => ({
                x: t * w,
                y: h * binomial(degree,i) * (1-t) ** (degree-i) * t ** (i)
            });
        });
    }

    // Build the graph for each interpolation function by plotting them,
    // and capturing the resulting Shape object that yields. We'll draw
    // those in the draw() function.
    this.shapes = this.interpolationFunctions.map(f => plot(f, 0, 1, degree*5) );

    setSlider(`.slide-control`, `position`, 0)
}

draw() {
    clear();
    setFill(`black`);
    setStroke(`black`);

    // In order to plot things nicely, lets scale
    // down, and plot things in a graph:
    scale(0.8, 0.9);
    translate(40,20);
    drawAxes(`t`, 0, 1, `S`, `0%`, `100%`);

    noFill();

    // draw each of the function plots we built in setup()
    this.shapes.forEach((shape,i) => {
        // first, draw that plot's mid-line
        setStroke(randomColor(0.2));
        line(
            i/(this.shapes.length-1) * this.width, 0,
            i/(this.shapes.length-1) * this.width, this.height
        )
        // and then draw the plot itself
        setStroke(randomColor(1.0, false ));
        drawShape(shape);
    })

    // depending on the slider, also highlight all values at t=...
    this.drawHighlight();
}

drawHighlight() {
    const t = this.position;

    // 0 and 1 are not meaningful to look at. They're just "100% start/end"
    if (t===0) return;
    if (t===1) return;

    // draw a little highlighting bar that runs frop top to bottom
    noStroke();
    setFill(`rgba(255,0,0,0.3)`);
    rect(t*this.width - 2, 0, 5, this.height);

    // then calculate each interpolation point for our `t` value
    // and draw it, with a label that says how much it contributes
    const points = this.interpolationFunctions.map(f => f(t));
    setFill(`black`);
    points.forEach(p => {
        circle(p.x, p.y, 3);
        text(`${ round(100 * p.y/this.height) }%`, p.x + 10, p.y);
    });
}
