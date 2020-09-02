import fit from "./curve-fitter.js";

let points = [], curve, sliders;

setup() {
  let btn = find(`.toggle`);
  if (btn) btn.listen(`click`, evt => this.toggle());
  sliders = find(`.sliders`);
  this.mode = 0;
  this.label = `Using equidistant t values`;
}

toggle() {
  this.mode = (this.mode + 1) % 2;
  if (sliders) this.setSliderValues(this.mode);
  redraw();
}

draw() {
  clear();
  setColor('lightgrey');
  drawGrid(10);

  setColor('black');
  setFontSize(16);
  setTextStroke(`white`, 4);
  if (points.length > 2) {
    curve = this.fitCurve(points);
    curve.drawSkeleton(`blue`);
    curve.drawCurve();

    text(this.label, this.width/2, 20, CENTER);
  }

  points.forEach(p => circle(p.x, p.y, 3));
}

fitCurve(points) {
  let n = points.length;
  let tvalues = sliders ? sliders.values : [...new Array(n)].map((_,i) =>i/(n-1));
  let bestFitData = fit(points, tvalues),
      x = bestFitData.C.x,
      y = bestFitData.C.y,
      bpoints = x.map((r,i) => (
        {x: r[0], y: y[i][0]}
      ));
  return new Bezier(this, bpoints);
}

updateSliders() {
  if (sliders && points.length > 2) {
    sliders.innerHTML = ``;
    sliders.values = [];
    this.sliders = points.map((p,i) => {
      // TODO: this should probably be built into the graphics API as a
      //       things that you can do, e.g. clearSliders() and addSlider()
      let s = document.createElement(`input`);
      s.setAttribute(`type`, `range`);
      s.setAttribute(`min`, `0`);
      s.setAttribute(`max`, `1`);
      s.setAttribute(`step`, `0.01`);
      s.classList.add(`slide-control`);
      sliders.values[i] =  i/(points.length-1);
      s.setAttribute(`value`, sliders.values[i]);
      s.addEventListener(`input`, evt => {
        this.label = `Using custom t values`;
        sliders.values[i] = parseFloat(evt.target.value);
        redraw();
      });
      sliders.append(s);
    });
  }
}

setSliderValues(mode) {
  let n = points.length;

  // equidistant
  if (mode === 0) {
    this.label = `Using equidistant t values`;
    sliders.values = [...new Array(n)].map((_,i) =>i/(n-1));
  }

  // polygonal distance
  if (mode === 1) {
    this.label = `Using polygonal distance t values`;
    const D = [0];
    for(let i = 1; i<n; i++) {
      D[i] = D[i-1] + dist(
        points[i-1].x, points[i-1].y,
        points[i].x, points[i].y
      );
    }
    const S = [], len = D[n-1];
    D.forEach((v,i) => { S[i] = v/len; });
    sliders.values = S;
  }

  findAll(`.sliders input[type=range]`).forEach((s,i) => {
    s.setAttribute(`value`, sliders.values[i]);
    s.value = sliders.values[i];
  });
}

onMouseDown() {
  if (!this.currentPoint) {
    const {x, y} = this.cursor;
    points.push({ x, y });
    resetMovable(points);
    this.updateSliders();
    redraw();
  }
}
