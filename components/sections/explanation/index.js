var React = require("react");
var keyHandling = require("../../decorators/keyhandling-decorator.jsx");

var Locale = require("../../../lib/locale");
var locale = new Locale();
var page = "explanation";

var Explanation = React.createClass({
  statics: {
    keyHandlingOptions: {
      propName: "step",
      values: {
        "38": 0.1,  // up arrow
        "40": -0.1  // down arrow
      },
      controller: function(api) {
        if (api.step < 0.1) {
          api.step = 0.1;
        }
      }
    }
  },

  getDefaultProps: function() {
    return {
      title: locale.getTitle(page)
    };
  },

  setup: function(api) {
    api.step = 5;
  },

  draw: function(api, curve) {
    var dim = api.getPanelWidth(),
        w = dim,
        h = dim,
        w2 = w/2,
        h2 = h/2,
        w4 = w2/2,
        h4 = h2/2;

    api.reset();
    api.setColor("black");
    api.drawLine({x:0,y:h2},{x:w,y:h2});
    api.drawLine({x:w2,y:0},{x:w2,y:h});

    var offset = {x:w2, y:h2};
    for(var t=0, p; t<=api.step; t+=0.1) {
      p = {
        x: w4 * Math.cos(t),
        y: h4 * Math.sin(t)
      };
      api.drawPoint(p, offset);
      var modulo = t % 1;
      if(modulo<0.05 || modulo> 0.95) {
        api.text("t = " + Math.round(t), {
          x: offset.x + 1.25 * w4 * Math.cos(t) - 10,
          y: offset.y + 1.25 * h4 * Math.sin(t) + 5
        });
        api.drawCircle(p, 2, offset);
      }
    }
  },

  render: function() {
    return (
      <section>{ locale.getContent(page, this) }</section>
    );
  }
});

module.exports = keyHandling(Explanation);
