setup() {
    const points = this.points = [],
          w = this.width,
          h = this.height;
    for (let i=0; i<10; i++) {
      points.push({
        x: w/2 + random() * 20 + cos(PI*2 * i/10) * (w/2 - 40),
        y: h/2 + random() * 20 + sin(PI*2 * i/10) * (h/2 - 40)
      });
    }
    setMovable(points);
    this.bindButtons();
  }

bindButtons() {
    let rbutton = find(`.raise`);
    if (rbutton) rbutton.listen(`click`, v => this.raise());

    let lbutton = find(`.lower`);
    if (lbutton) lbutton.listen(`click`, v => this.lower());
}

draw() {
    clear();
    this.drawCurve();
}

drawCurve() {
    // we can't "just draw" this curve, since it'll be an arbitrary order,
    // And the canvas only does 2nd and 3rd - we use de Casteljau's algorithm:
    const pts = this.points;

    start();
    noFill();
    for(let t=0; t<=1; t+=0.01) {
      let q = JSON.parse(JSON.stringify(pts));
      while(q.length > 1) {
        for (let i=0; i<q.length-1; i++) {
          q[i] = {
            x: q[i].x + (q[i+1].x - q[i].x) * t,
            y: q[i].y + (q[i+1].y - q[i].y) * t
          };
        }
        q.splice(q.length-1, 1);
      }
      vertex(q[0].x, q[0].y);
    }
    end();

    start();
    setStroke(`lightgrey`);
    pts.forEach(p => vertex(p.x, p.y));
    end();

    setStroke(`black`);
    pts.forEach(p => circle(p.x, p.y, 3));
}

raise() {
    const p = this.points,
        np = [p[0]],
        k = p.length;
    for (let i = 1, pi, pim; i < k; i++) {
        pi = p[i];
        pim = p[i - 1];
        np[i] = {
            x: ((k - i) / k) * pi.x + (i / k) * pim.x,
            y: ((k - i) / k) * pi.y + (i / k) * pim.y,
        };
    }
    np[k] = p[k - 1];
    this.points = np;

    resetMovable(this.points);
    redraw();
}

lower() {
    // Based on http://www.sirver.net/blog/2011/08/23/degree-reduction-of-bezier-curves/

    // TODO: FIXME: this is the same code as in the old codebase,
    //              and it does something odd to the either the
    //              first or last point... it starts to travel
    //              A LOT more than it looks like it should... O_o

    const pts = this.points,
        k = pts.length,
        data = [],
        n = k-1;

    if (k <= 3) return;

    // build M, which will be (k) rows by (k-1) columns
    for(let i=0; i<k; i++) {
      data[i] = (new Array(k - 1)).fill(0);
      if(i===0) { data[i][0] = 1; }
      else if(i===n) { data[i][i-1] = 1; }
      else {
        data[i][i-1] = i / k;
        data[i][i] = 1 - data[i][i-1];
      }
    }

    // Apply our matrix operations:
    const M = new Matrix(data);
    const Mt = M.transpose(M);
    const Mc = Mt.multiply(M);
    const Mi = Mc.invert();

    if (!Mi) {
      console.error('MtM has no inverse?');
      return curve;
    }

    // And then we map our k-order list of coordinates
    // to an n-order list of coordinates, instead:
    const V = Mi.multiply(Mt);
    const x = new Matrix(pts.map(p => [p.x]));
    const nx = V.multiply(x);
    const y = new Matrix(pts.map(p => [p.y]));
    const ny = V.multiply(y);

    this.points = nx.data.map((x,i) => ({
        x: x[0],
        y: ny.data[i][0]
    }));

    resetMovable(this.points);
    redraw();
}

onMouseMove() {
  redraw();
}
