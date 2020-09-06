let shape1, shape2, ox=50, oy=50;

setup() {
    let d = 30;

    let p = [
        { x: d*2, y: d*1},  { x: d*1, y: d*2},  { x: d*1, y: d*4},
        { x: d*2, y: d*5},  { x: d*3, y: d*4},  { x: d*5, y: d*4},
        { x: d*6, y: d*5},  { x: d*7, y: d*4},  { x: d*7, y: d*2},
        { x: d*6, y: d*1},  { x: d*5, y: d*2},  { x: d*3, y: d*2},
    ]

    shape1 = [
        new Bezier(this, p[0].x, p[0].y, p[1].x, p[1].y, p[2].x, p[2].y, p[3].x, p[3].y),
        new Bezier(this, p[3].x, p[3].y, p[4].x, p[4].y, p[5].x, p[5].y, p[6].x, p[6].y),
        new Bezier(this, p[6].x, p[6].y, p[7].x, p[7].y, p[8].x, p[8].y, p[9].x, p[9].y),
        new Bezier(this, p[9].x, p[9].y, p[10].x, p[10].y, p[11].x, p[11].y, p[0].x, p[0].y),
    ];

    shape2 = [
        new Bezier(this, p[0].x, p[0].y, p[1].x, p[1].y, p[2].x, p[2].y, p[3].x, p[3].y),
        new Bezier(this, p[3].x, p[3].y, p[4].x, p[4].y, p[5].x, p[5].y, p[6].x, p[6].y),
        new Bezier(this, p[6].x, p[6].y, p[7].x, p[7].y, p[8].x, p[8].y, p[9].x, p[9].y),
        new Bezier(this, p[9].x, p[9].y, p[10].x, p[10].y, p[11].x, p[11].y, p[0].x, p[0].y),
    ];

    // link the curves into paths
    shape1.forEach((s, i) => (s.next = shape1[(i+1) % shape1.length]));
    shape2.forEach((s, i) => (s.next = shape2[(i+1) % shape2.length]));
    shape2.forEach(s => s.points.forEach(p => { p.x += ox; p.y += oy; }));
}

draw() {
    clear();
/*
    noFill();
    shape2.forEach(c => c.points.forEach(p => {
        p.x -= ox;
        p.y -= oy;
    }));

    if (this.cursor.down) {
        ox += this.cursor.diff.x;
        oy += this.cursor.diff.y;
    }

    shape2.forEach(c => c.points.forEach(p => {
        p.x += ox;
        p.y += oy;
    }));

    shape1.forEach(curve => this.drawSegment(curve));
    shape2.forEach(curve => this.drawSegment(curve));

    this.drawBoolean(shape1, shape2);
*/
}


drawSegment(segment) {
    setStroke(randomColor(0.2) );
    start()
    segment.getLUT(16).forEach(p => vertex(p.x, p.y))
    end();
}

drawBoolean(s1, s2) {
    let intersections = [];

    // We're going to test for intersections in an *incredibly* naive fashion,
    // simply checking each curve against each other curve. Normally you'd first
    // throw way all curves that can't intersect, using bounding box checks or
    // oct-tree space reduction, etc.
    s1.forEach(curve1 => {
        s2.forEach(curve2 => {
            let ti = curve1.intersects(curve2);
            if (ti.length) {
                ti = ti.map(s => s.split(`/`).map(parseFloat));
                // remove "near enough to be considered duplicate" t pairs
                for(let i=ti.length-1; i>0; i--) {
                    if (abs(ti[i][0] - ti[i-1][0]) < 0.01 && abs(ti[i][1] - ti[i-1][1]) < 0.01) {
                        ti.splice(i,1);
                    }
                }
                // store this curve pair with intersection t value(s)
                intersections.push({ curve1, curve2, ti })
            }
        });
    });

    intersections.forEach(i => {
        const { curve1, curve2, ti } = i;

        ti.forEach(t => {
            let c1 = curve1.get(t[0]); circle(c1.x, c1.y, 3);
            let c2 = curve2.get(t[1]); circle(c2.x, c2.y, 3);
        });
    });

    let nodes = [...s1, ...s2];
    let sequence = [];
    let node = nodes[0];

    for(let i=0; i<2; i++) {
        let entry = intersections.find(v => v.curve1 === node || v.curve2 === node);
        if (entry) {
            const { curve1, curve2, ti } = entry;
            console.log(ti);

            let c1, c2;

            c1 = curve1.split(t[0]);
            c2 = curve2.split(t[1]);


            // resolve the intersections
            console.log(`resolve `,entry);
            sequence.push(node);
            node = node.next;
        } else {
            sequence.push(node);
            node = node.next;
        }
    }

    sequence.forEach(c => c.drawCurve(`black`));
}

onMouseMove() {
    if (this.cursor.down) {
        redraw();
    }
}
