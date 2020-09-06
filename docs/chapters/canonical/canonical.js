setup() {
    this.unit = this.height/5;
    this.labels = [];
}

draw() {
    clear();

    if (this.canonicalMap) {
        return image(this.canonicalMap);
    }

    const w = this.width,
          h = this.height,
          unit = this.unit;

    // axes + gridlines
    setStroke(`lightgrey`);
    for(let x=0; x<w; x+= unit/2) { line(x, 0, x, h); }
    for(let y=0; y<h; y+= unit/2) { line(0, y, w, y); }
    setStroke(`grey`);
    line(w/2, 0, w/2, h);
    line(0, h/2, w, h/2);

    // canonical boundaries and regions
    translate(w/2, h/2);
    setTextStroke(`white`, 5);
    let shapes = this.drawBoundaries(w,h,unit);
    this.drawPoints(w,h,unit);
    this.drawRegions(shapes, w,h,unit);

    setFontSize(12);
    setFontWeight(`bold`);
    this.labels.forEach(fn => fn());

    // Let's never draw this again:
    this.cacheMap();
}

drawRegions(shapes, w,h,unit) {
    // Plain arch region
    noStroke();
    noFill();
    drawShape(shapes.loop1, shapes.loop0, [
        {x: w, y: -h},
        {x: w, y: unit},
        {x: unit, y: unit},
    ]);

    // Self-intersection region
    noStroke();
    setFill(`rgba(255,0,0,0.2)`);
    drawShape(shapes.cusp, shapes.loop1, shapes.loop0);

    // Double inflection region
    noStroke();
    noFill();
    drawShape([{x: unit, y: unit}, {x: -w, y: unit}], shapes.cusp);

    // Single inflection region
    setStroke(`green`);
    setFill(`#00FF0030`);
    rect(-w/2 - 1, unit, w + 2, h);

    // further labels
    this.labels.push(() => {
        setFontSize(18);
        setFontWeight(`normal`);
        setStroke(`black`);
        setFill(`black`);
        text(`← Single inflection →`, 0, unit*1.75, CENTER);
        text(`Plain curve`, unit/2, -h/3);
        text(`Double inflection`, -w/2 + 10, 10 + unit * 0.5);
    });
}

cuspFunction(x) {
    return { x, y: (-x*x + 2*x + 3)/4 };
}

loopFunction0(x) {
    return { x, y: (-x*x + 3*x)/3 };
}

loopFunction1(x) {
    return { x, y: (sqrt(3) * sqrt(4*x - x*x) - x) / 2 };
}


drawBoundaries(w,h,unit) {
    setWidth(1.5);

    // cusp parabola:
    setStroke(`red`);
    noFill();
    let cusp = plot(x => this.cuspFunction(x), -5, 1, 50, unit, unit);
    this.labels.push(() => {
      setFill(`red`);
        text(`Curve has a cusp →`, -unit, 15, RIGHT);
    });

    // loop/arch transition boundary, elliptical section
    setStroke(`magenta`);
    noFill();
    let loop1 = plot(x => this.loopFunction1(x), 1, 0, 50, unit, unit);
    this.labels.push(() => {
        setFill(`magenta`);
        text(`← Curve forms a loop at t = 1`, unit/4, unit/2 - 1);
    });

    // loop/arch transition boundary, parabolic section
    setStroke(`#3300FF`);
    noFill();
    let loop0 = plot(x => this.loopFunction0(x), 0, -5, 100, unit, unit);
    this.labels.push(() => {
        setFill(`#3300FF`);
        text(`← Curve forms a loop at t = 0`, -unit+10, -unit*1.25);
    });

    setWidth(1);
    return { cusp, loop0, loop1 };
}

drawPoints(w,h,unit) {
    // the three stable points
    setStroke(`black`);
    setFill(`black`);
    circle(0, 0, 3);
    circle(0, unit, 3);
    circle(unit, unit, 3);

    this.labels.push(() => {
        setFill(`black`);
        text(`(0,0)`, 5, 15);
        text(`(0,1)`, 5, unit+15);
        text(`(1,1)`, unit+5, unit+15);
    });
}

cacheMap() {
    const img = this.canonicalMap = new Image();
    img.src = toDataURL();
}
