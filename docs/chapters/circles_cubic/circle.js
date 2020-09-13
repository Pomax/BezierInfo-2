let curve, r, kappa = 0.5519768352769461;

setup() {
    r = 100;
    curve = new Bezier(this, [
        { x: r, y: 0 },
        { x: r, y: kappa * r },
        { x: kappa * r, y: r},
        { x: 0, y: r }
    ]);
}

draw() {
    clear();
    translate(this.width/2,  this.height/2);
    const w = this.width, h = this.height;

    setStroke(`lightgrey`);
    line(0,-h,0,h);
    line(-w,0,w,0);

    setStroke(`black`);
    line(-r,0,r,0);
    line(0,-r,0,r);

    setColor(`black`);
    text(`r = ${r}`, r/2, 15, CENTER);

    setColor(`red`);
    curve.drawSkeleton(`red`);
    curve.points.forEach(p => {
      circle(p.x, p.y, 2);
      text(`(${p.x},${p.y})`, p.x+5, p.y+15);
    });
    curve.drawCurve();

    curve.points.forEach(p => p.y = -p.y);
    curve.drawCurve(`#CC00CC40`);

    setColor(`#CC00CC`);
    line(r, 0, r, -kappa * r);
    circle(r, -kappa * r, 2);
    text(`reflected`, r + 7, -kappa * r + 3, LEFT);

    setColor(`#CC00CC40`);
    line(0, -r, kappa * r, -r);

    curve.points.forEach(p => {
        p.x = -p.x;
        p.y = -p.y;
    });
    curve.drawCurve(`#0000CC40`);

    setColor(`#0000CC`);
    line(0, r, -kappa * r, r);
    circle(-kappa * r, r, 2);
    text(`reflected`, -kappa * r - 5, r + 3, RIGHT);

    setColor(`#0000CC40`);
    line(-r, 0, -r, kappa * r);

    curve.points.forEach(p => p.y = -p.y);
    curve.drawCurve(`#00000040`);
}
