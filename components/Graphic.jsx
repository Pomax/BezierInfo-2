var React = require("react");

var baseClass = {
  render: function() {
    var cprops = {
      tabIndex: 0,
      style: {
        width: this.panelCount * this.defaultWidth + "px",
        height: this.defaultHeight + "px"
      }
    };

    var handlers = {
      onMouseDown: this.mouseDown,
      onMouseMove: this.mouseMove,
      onMouseUp: this.mouseUp,
      onClick: this.onClick,
      onKeyUp: this.onKeyUp,
      onKeyDown: this.onKeyDown,
      onKeyPress: this.onKeyPress
    };

    var sourceLink = `https://github.com/Pomax/BezierInfo-2/tree/master/components/sections/${this.props.section}/handler.js`;

    return (
      <figure className={this.props.inline ? "inline": false}>
        <canvas ref="canvas" {...cprops} {...handlers} />
        <figcaption>
          <a className="source" href={sourceLink}>view source</a>
          {this.state.sliders && this.renderSliders(this.state.sliders)}
          {this.props.title}
          {this.props.children}
        </figcaption>
      </figure>
    );
  },

  // Note: requires `sliders` and `onSlide` _and_ `context` to be set!
  renderSliders: function(sliders) {
    var api = this;
    var onSlide = this.props.onSlide.bind(this.props.context);
    return sliders.map(function(v, pos) {
      var handle = function(evt) { onSlide(api, parseFloat(evt.target.value), pos); };
      return <input type="range" min={v.min} max={v.max} value={v.value} step={v.step} onChange={handle} />;
    });
  },

  componentDidMount: function() {
    var cvs = this.refs.canvas;
    var dpr = this.getPixelRatio();
    cvs.width = this.defaultWidth * dpr;
    cvs.height = this.defaultHeight * dpr;
    this.cvs = cvs;
    var ctx = cvs.getContext("2d");
    this.ctx = ctx;
    this.ctx.scale(dpr, dpr);

    if (this.props.paperjs) {
      var Paper = this.Paper = require("paper/dist/paper-core");
      Paper.setup(cvs);
    }

    if (this.props.setup) {
      this.props.setup(this);
    }

    if (this.props.draw) {
      this.props.draw(this, this.curve);
    }

    if (this.props.autoplay) {
      this.play();
    }

    if (this.props.sliders) {
      this.setState({
        sliders: this.props.sliders
      });
    }
  }
};

// For some reason we can copy from gfx into base but
// not the other way around, while preserving context.
var gfxObject = require("./gfx-api");
Object.keys(gfxObject).forEach(fname => {
  baseClass[fname] = gfxObject[fname];
});

module.exports = React.createClass(baseClass);
