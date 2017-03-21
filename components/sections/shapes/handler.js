var modes;

module.exports = {
  getInitialState: function() {
    modes = this.modes = ["unite","intersect","exclude","subtract"];
    return {
      mode: modes[0]
    };
  },

  setMode: function(mode) {
    this.setState({ mode: mode });
  },

  formPath: function(api, mx, my, w, h) {
    mx = mx || 0;
    my = my || 0;
    var unit  = 30;
    var unit2 = unit/2;
    w = w || 8 * unit;
    h = h || 4 * unit;
    var w2 = w/2;
    var h2 = h/2;
    var ow3 = w2/3;
    var oh3 = h2/3;

    var Paper = api.Paper;
    var Path = Paper.Path;
    var Point = Paper.Point;
    var path = new Path();

    path.moveTo(
      new Point(mx-w2 + unit*2, my-h2)
    );
    path.cubicCurveTo(
      new Point(mx-w2 + unit2, my-h2 + unit2),
      new Point(mx-w2 + unit2, my+h2 - unit2),
      new Point(mx-w2 + unit*2,  my+h2)
    );
    path.cubicCurveTo(
      new Point(mx-ow3,       my+oh3),
      new Point(mx+ow3,       my+oh3),
      new Point(mx+w2 - unit*2, my+h2)
    );
    path.cubicCurveTo(
      new Point(mx+w2 - unit2, my+h2 - unit2),
      new Point(mx+w2 - unit2, my-h2 + unit2),
      new Point(mx+w2 - unit*2,  my-h2)
    );
    path.cubicCurveTo(
      new Point(mx+ow3,       my-oh3),
      new Point(mx-ow3,       my-oh3),
      new Point(mx-w2 + unit*2, my-h2)
    );
    path.closePath(true);
    path.strokeColor = "rgb(100,100,255)";
    return path;
  },

  setup: function(api) {
    var dim = api.getPanelWidth();
    var pad = 40;
    var cx = dim/2;
    var cy = dim/2;
    api.c1 = this.formPath(api, cx, cy);
    cx += pad;
    cy += pad;
    api.c2 = this.formPath(api, cx, cy);
    this.state.mode = modes[0];
  },

  onMouseMove: function(evt, api) {
    var cx = evt.offsetX;
    var cy = evt.offsetY;
    api.c2.position = {x:cx, y:cy};
  },

  draw: function(api) {
    if (api.c3) { api.c3.remove(); }
    var c1 = api.c1,
        c2 = api.c2,
        fn = c1[this.state.mode].bind(c1),
        c3 = api.c3 = fn(c2);

    c3.strokeColor = "red";
    c3.fillColor = "rgba(255,100,100,0.4)";
    api.Paper.view.draw();
  }
};
