setup() {
    this.curve = Bezier.defaultCubic(this);
    this.curve.points = this.curve.points.map(p => ({ x: p.x + 50, y: p.y + 50 }));
    setMovable(this.curve.points);
    const unit = this.unit = this.height/5;
    this.labels = [];
    this.canonical = new Bezier(this,
        [
            {x: 0, y: 0},
            {x: 0, y: unit},
            {x: unit, y: unit},
            {x: unit, y: 0},
        ]
    );
}

draw() {
    clear();

    const w = this.width/2,
          h = this.height,
          unit = this.unit;

    translate(w,0);

    setStroke(`black`);
    line(0,0,0,h);

    if (!this.canonicalMap) {
        // axes + gridlines
        setStroke(`lightgrey`);
        for(let x=0; x<w; x+= unit/2) { line(x, 0, x, h); }
        for(let y=0; y<h; y+= unit/2) { line(0, y, w, y); }
        setStroke(`grey`);
        line(w/2, 0, w/2, h);
        line(0, h/2, w, h/2);

        // canonical boundaries and regions
        translate(w/2, h/2);
        let shapes = this.drawBoundaries(w,h,unit);
        this.drawRegions(shapes, w,h,unit);

        // Let's never draw this again:
        this.cacheMap();
    }

    resetTransform();
    image(this.canonicalMap);
    setFont(`normal 10px Arial`);
    setFill(`white`);
    rect(0,0,h,h);

    const curve = this.curve;
    curve.drawSkeleton();
    curve.drawCurve();
    curve.drawPoints();

    translate(w + w/2, h/2);
    let p = this.canonical.points
    p[3] = this.forwardTransform(this.curve.points, unit);
    this.canonical.drawCurve(`blue`);
    setStroke(`blue`);
    setFill(`blue`);
    circle(p[3].x, p[3].y, 3);

    setFill(`black`);
    let x = p[3].x / unit;
    let y = p[3].y / unit;
    setFontSize(10);
    text(`(${x.toFixed(2)}, ${y.toFixed(2)})`, p[3].x, p[3].y - 5, RIGHT);
    setFontSize(16);
    setTextStroke(`white`, 3);
    text(this.determineRegion(x,y), p[3].x + 5, p[3].y - 5, LEFT);
    noTextStroke();
}

determineRegion(x, y) {
    if (y > 1) return `single inflection`;

    if (y <= 1 && x <= 1) {
        let c = this.cuspFunction(x);

        if (x <= 0) {
            let l1 = this.loopFunction0(x);
            let diff = abs(y - l1.y);
            if (diff < 0.06) return `loop at t=0`;
            if (l1.y < y && y < c.y) return `loop`;
        }

        if (0 <= x && x <= 1) {
            let l0 = this.loopFunction1(x);
            let diff = abs(y - l0.y);
            if (diff < 0.06) return `loop at t=1`;
            if (l0.y < y && y < c.y) return `loop`;
        }

        let diff = abs(y - c.y);
        if (diff < 0.06) return `cusp`;

        if (y > c.y) return `double inflection`;
        if (y < c.y) return `plain curve`;
    }

    return `plain curve`;
}

drawRegions(shapes, w,h,unit) {
    // Plain arch region
    noStroke();
    noFill(); // setFill(HATCH1);
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
    noFill(); // setFill(HATCH2);
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
        text(`↔ Plain curve ↕`, unit/2, -h/3);
        text(`↕ Double inflection`, -w/2 + 10, 10 + unit * 0.5);
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
        text(`Curve has a cusp ⭧`, -unit, 15, RIGHT);
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
        text(`⭩ Curve forms a loop at t = 0`, -unit+10, -unit*1.25);
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

forwardTransform(points, s=1) {
    var p1 = points[0], p2 = points[1], p3 = points[2], p4 = points[3];

    var xn = -p1.x + p4.x - (-p1.x+p2.x)*(-p1.y+p4.y)/(-p1.y+p2.y);
    var xd = -p1.x + p3.x - (-p1.x+p2.x)*(-p1.y+p3.y)/(-p1.y+p2.y);
    var np4x = s*xn/xd;

    var yt1 = s*(-p1.y+p4.y) / (-p1.y+p2.y);
    var yt2 = s - (s*(-p1.y+p3.y)/(-p1.y+p2.y));
    var yp = yt2 * xn / xd;
    var np4y = yt1 + yp;

    return {x:np4x, y:np4y};
}
