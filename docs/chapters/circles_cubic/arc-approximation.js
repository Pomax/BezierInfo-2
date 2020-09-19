let guess, w, h, pad = 75, r;

setup() {
    w = this.width;
    h = this.height;
    r = w/2 - pad;
    guess = new Bezier(this,
      { x: w - pad, y: h/2},
      { x: w - pad, y: h/2},
      { x: w - pad, y: h/2},
      { x: w - pad, y: h/2}
    );
    setSlider(`.slide-control`, `angle`, -PI/4, v => this.updateCurve(v));
}

draw() {
  clear();
  setColor(`lightgrey`);
  line(0, h/2, w, h/2);
  line(w/2, 0, w/2, h);

  noFill();
  setStroke(`red`);
  circle(w/2, h/2, r);

  noStroke();
  setFill(`rgba(100,255,100,0.4)`);
  let a = this.angle;
  wedge(w/2, h/2, r, a < 0 ? a : 0, a < 0 ? 0 : a);

  guess.drawSkeleton(`lightblue`);
  guess.drawCurve(`lightblue`);

  let real = this.getRealCurve(guess.points[0], guess.points[3], this.angle);
  real.drawSkeleton();
  real.drawCurve();

  setColor(`black`);
  real.points.forEach(p => {
    circle(p.x, p.y, 2);
    text(`(${p.x|0},${p.y|0})`, p.x+5, p.y);
  });
}

updateCurve(a) {
  let angle = -a;

  const S = guess.points[0],
        B = {
          x: w/2 + r * cos(angle/2),
          y: h/2 + r * sin(angle/2)
        },
        E = guess.points[3] = {
          x: w/2 + r * cos(angle),
          y: h/2 + r * sin(angle)
        };

  guess = this.guessCurve(S,B,E);

  return angle;
}

guessCurve(S, B, E)  {
  const C = { x: (S.x + E.x)/2, y: (S.y + E.y)/2 }, // we know we're working with t=0.5
        A = { x: B.x + (B.x-C.x)/3, y: B.y + (B.y-C.y)/3 },  // cubic ratio at t=0.5 is 1/3
        bx = (E.x-S.x)/4,
        by = (E.y-S.y)/4,
        e1 = { x: B.x - bx, y: B.y - by },
        e2 = { x: B.x + bx, y: B.y + by },
        v1 = { x: A.x + (e1.x-A.x)*2, y: A.y + (e1.y-A.y)*2 },
        v2 = { x: A.x + (e2.x-A.x)*2, y: A.y + (e2.y-A.y)*2 },
        C1 = { x: S.x + (v1.x-S.x)*2, y: S.y + (v1.y-S.y)*2 },
        C2 = { x: E.x + (v2.x-E.x)*2, y: E.y + (v2.y-E.y)*2 };
  return new Bezier(this, [S, C1, C2, E]);
}

getRealCurve(S, E, angle) {
  const f = 4/3 * tan(angle/4);
  const C1 = { x: w/2 + r, y: h/2 + r * f };
  const C2 = {
    x: w/2 + r * (cos(angle) + f * sin(angle)),
    y: h/2 + r * (sin(angle) - f * cos(angle))
  };
  return new Bezier(this, [S, C1, C2, E]);
}
