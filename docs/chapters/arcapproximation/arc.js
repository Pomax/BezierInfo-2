// setup={this.setupCubic} draw={this.drawSingleArc} onKeyDown={this.props.onKeyDown}

let curve, utils = Bezier.getUtils();

setup() {
    curve = Bezier.defaultCubic(this);
    setMovable(curve.points);
    setSlider(`.slide-control`, `error`, 0.5);
}

draw() {
    clear();

    curve.drawSkeleton();
    curve.drawCurve();

    setColor(`#FF000040`);
    let a = this.getArc(curve);
    arc(
        a.x, a.y, a.r, a.s, a.e,
        // draw a wedge, not just the arc
        a.x, a.y
    );

    setColor("black");
    text(`Arc approximation with total error ${this.error}`, this.width/2, 15, CENTER);
    curve.drawPoints();
}

getArc(curve) {
    let ts = 0,
        te = 1,
        tm = te,
        safety = 0,
        np1 = curve.get(ts), np2, np3,
        arc,
        currGood = false,
        prevGood = false,
        done,
        prev_e = 1,
        step = 0;

    // Find where the good/bad boundary is
    te = 1;

    // step 2: find the best possible arc
    do {
        prevGood = currGood;
        tm = (ts + te) / 2;
        step++;

        np2 = curve.get(tm);
        np3 = curve.get(te);

        arc = utils.getccenter(np1, np2, np3);
        arc.interval = { start: ts, end: te, };

        let error = this.computeError(arc, np1, ts, te);
        currGood = (error <= this.error);

        done = prevGood && !currGood;
        if (!done) prev_e = te;

        // this arc is fine: try a wider arc
        if (currGood) {
            // if e is already at max, then we're done for this arc.
            if (te >= 1) {
                // make sure we cap at t=1
                arc.interval.end = prev_e = 1;
                // if we capped the arc segment to t=1 we also need to make sure that
                // the arc's end angle is correct with respect to the bezier end point.
                if (te > 1) {
                    let d = {
                        x: arc.x + arc.r * cos(arc.e),
                        y: arc.y + arc.r * sin(arc.e),
                    };
                    arc.e += utils.angle({ x: arc.x, y: arc.y }, d, curve.points[3]);
                }
                done = true;
                break;
            }
            // if not, move it up by half the iteration distance
            te = te + (te - ts) / 2;
        }

        // This is a bad arc: we need to move 'e' down to find a good arc
        else { te = tm; }
    } while (!done && safety++ < 100);

    return arc;
}

computeError(pc, np1, s, e) {
    const q = (e - s) / 4,
          c1 = curve.get(s + q),
          c2 = curve.get(e - q),
          ref = dist(pc.x, pc.y, np1.x, np1.y),
          d1 = dist(pc.x, pc.y, c1.x, c1.y),
          d2 = dist(pc.x, pc.y, c2.x, c2.y);
    return abs(d1 - ref) + abs(d2 - ref);
}
