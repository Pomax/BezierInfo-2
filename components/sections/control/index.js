var React = require("react");

var Locale = require("../../../lib/locale");
var locale = new Locale();
var page = "control";

var Control = React.createClass({
  getDefaultProps: function() {
    return {
      title: locale.getTitle(page)
    };
  },

  drawCubic: function(api) {
    var curve = api.getDefaultCubic();
    api.setCurve(curve);
  },

  drawCurve: function(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);
  },

  drawFunction: function(api, label, where, generator) {
    api.setRandomColor();
    api.drawFunction(generator);
    api.setFill(api.getColor());
    if (label) api.text(label, where);
  },

  drawLerpBox: function(api, dim, pad, p) {
    api.noColor();
    api.setFill("rgba(0,0,100,0.2)");
    var p1 = {x: p.x-5, y:pad},
        p2 = {x:p.x + 5, y:dim};
    api.drawRect(p1, p2);
    api.setColor("black");
  },

  drawLerpPoint: function(api, tf, pad, fwh, p) {
    p.y = pad + tf*fwh;
    api.drawCircle(p, 3);
    api.setFill("black");
    api.text(((tf*10000)|0)/100 + "%", {x:p.x+10, y:p.y+4});
    api.noFill();
  },

  drawQuadraticLerp: function(api) {
    api.reset();

    var dim = api.getPanelWidth(),
        pad = 20,
        fwh = dim - pad*2;

    api.drawAxes(pad, "t",0,1, "S","0%","100%");

    var p = api.hover;
    if (p && p.x >= pad && p.x <= dim-pad) {
      this.drawLerpBox(api, dim, pad, p);
      var t = (p.x-pad)/fwh;
      this.drawLerpPoint(api, (1-t)*(1-t), pad, fwh, p);
      this.drawLerpPoint(api, 2*(1-t)*(t), pad, fwh, p);
      this.drawLerpPoint(api, (t)*(t), pad, fwh, p);
    }

    this.drawFunction(api, "first term", {x: pad*2, y: fwh}, function(t) {
      return {
        x: pad + t * fwh,
        y: pad + fwh * (1-t) * (1-t)
      };
    });
    this.drawFunction(api, "second term", {x: dim/2 - 1.5*pad, y: dim/2 + pad}, function(t) {
      return {
        x: pad + t * fwh,
        y: pad + fwh * 2 * (1-t) * (t)
      };
    });
    this.drawFunction(api, "third term", {x: fwh - pad*2.5, y: fwh}, function(t) {
      return {
        x: pad + t * fwh,
        y: pad + fwh * (t) * (t)
      };
    });
  },

  drawCubicLerp: function(api) {
    api.reset();

    var dim = api.getPanelWidth(),
        pad = 20,
        fwh = dim - pad*2;

    api.drawAxes(pad, "t",0,1, "S","0%","100%");

    var p = api.hover;
    if (p && p.x >= pad && p.x <= dim-pad) {
      this.drawLerpBox(api, dim, pad, p);
      var t = (p.x-pad)/fwh;
      this.drawLerpPoint(api, (1-t)*(1-t)*(1-t), pad, fwh, p);
      this.drawLerpPoint(api, 3*(1-t)*(1-t)*(t), pad, fwh, p);
      this.drawLerpPoint(api, 3*(1-t)*(t)*(t), pad, fwh, p);
      this.drawLerpPoint(api, (t)*(t)*(t), pad, fwh, p);
    }

    this.drawFunction(api, "first term", {x: pad*2, y: fwh}, function(t) {
      return {
        x: pad + t * fwh,
        y: pad + fwh * (1-t) * (1-t) * (1-t)
      };
    });
    this.drawFunction(api, "second term", {x: dim/2 - 4*pad, y: dim/2 }, function(t) {
      return {
        x: pad + t * fwh,
        y: pad + fwh * 3 * (1-t) * (1-t) * (t)
      };
    });
    this.drawFunction(api, "third term", {x: dim/2 + 2*pad, y: dim/2}, function(t) {
      return {
        x: pad + t * fwh,
        y: pad + fwh * 3 * (1-t) * (t) * (t)
      };
    });
    this.drawFunction(api, "fourth term", {x: fwh - pad*2.5, y: fwh}, function(t) {
      return {
        x: pad + t * fwh,
        y: pad + fwh * (t) * (t) * (t)
      };
    });
  },

  draw15thLerp: function(api) {
    api.reset();

    var dim = api.getPanelWidth(),
        pad = 20,
        fwh = dim - pad*2;

    api.drawAxes(pad, "t",0,1, "S","0%","100%");

    var factors = [1,15,105,455,1365,3003,5005,6435,6435,5005,3003,1365,455,105,15,1];

    var p = api.hover, n;
    if (p && p.x >= pad && p.x <= dim-pad) {
      this.drawLerpBox(api, dim, pad, p);
      for(n=0; n<=15; n++) {
        var t = (p.x-pad)/fwh,
            tf = factors[n] * Math.pow(1-t, 15-n) * Math.pow(t, n);
        this.drawLerpPoint(api, tf, pad, fwh, p);
      }
    }

    for(n=0; n<=15; n++) {
      var label = false, position = false;
      if (n===0) {
        label = "first term";
        position = {x: pad + 5, y: fwh};
      }
      if (n===15) {
        label = "last term";
        position = {x: dim - 3.5*pad, y: fwh};
      }
      this.drawFunction(api, label, position, function(t) {
        return {
          x: pad + t * fwh,
          y: pad + fwh * factors[n] * Math.pow(1-t, 15-n) * Math.pow(t, n)
        };
      });
    }
  },

  render: function() {
    return <section>{ locale.getContent(page, this) }</section>;
  }
});

module.exports = Control;
