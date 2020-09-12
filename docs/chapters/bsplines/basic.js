let points=[];

setup() {
  points = [
    {x:25, y:160},
    {x:90, y:75},
    {x:190,y:245},
    {x:290,y:25},
    {x:400,y:255},
    {x:480,y:70},
    {x:560,y:170}
  ];
  setMovable(points);
  if (this.parameters.showCurves) {
    addSlider(`highlight`, `highlight`, 1, 4, 1, 1);
  }
}

draw() {
    clear();

    setStroke(this.parameters.showCurves ? `transparent` : `#CC00CC99`);
    for (let i=0, e=points.length-1, p, n; i<e; i++) {
      p = points[i];
      n = points[i+1];
      line(p.x, p.y, n.x, n.y);
    }

    this.drawSplineData();

    points.forEach((p,i) => {
      if (this.parameters.showCurves) {
        if (this.highlight - 1 <= i && i <= this.highlight + 2) {
          setColor(`red`);
          circle(p.x, p.y, 5);
        }
      }
      setColor(`black`);
      circle(p.x, p.y, 3);
      text(`${i+1}`, p.x+5, p.y+5);
    });
}

drawSplineData() {
    // we'll need at least 4 points
    if (points.length <= 3) return;

    if (this.parameters.showCurves) {
      for(let i=0; i<points.length-3; i++) {
        const c = new Bezier(this, points.slice(i,i+4));
        const highlight  = this.highlight === i+1;
        if (highlight) c.drawSkeleton();
        setWidth(highlight ? 3 : 1);
        c.drawCurve(randomColor(highlight? 1 : 0.4));
      }
      setWidth(1);
    }

    let spline = new BSpline(this, points);

    noFill();
    setStroke(this.parameters.showCurves ? `#000000CC` : `black`);
    start();
    spline.getLUT((points.length - 3) * 20).forEach(p => vertex(p.x, p.y));
    end();
}

onMouseDown() {
  if (!this.currentPoint) {
    points.push({
      x: this.cursor.x,
      y: this.cursor.y
    });
    resetMovable(points);
    if (this.parameters.showCurves) {
      updateSlider(`highlight`, 1, points.length-3, 1, 1);
    }
    redraw();
  }
}
