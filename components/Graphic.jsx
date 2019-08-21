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
          {this.props.title}
          {this.renderSliders()}
          {this.props.children}
        </figcaption>
      </figure>
    );
  },

  // Note: requires `sliders` and `onSlide` _and_ `context` to be set!
  renderSliders: function() {
    if (!this.state) return;
    if (!this.state.sliders) return;

    var sliders = this.state.sliders;
    var api = this;
    var onSlide = this.props.onSlide.bind(this.props.context);
    return sliders.map(function(v, pos) {
      var handle = function(evt) {
        evt.preventDefault();
        var value = parseFloat(evt.target.value);
        v.value = value;
        onSlide(api, value, pos);
        api.setState({ sliders: sliders });
      };
      return (
        <div className="slider">
          { v.label && <label>{v.label}</label> }
          <span className="min val">{v.min}</span>
          <input type="range" min={v.min} max={v.max} value={v.value} step={v.step} onChange={handle} />
          <span className="max val">{v.max}</span>
        </div>
      );
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
      var sliders = this.props.sliders;
      this.setState({
        sliders: sliders
      });
      this.props.setSliders(this, sliders.map(v => v.value));
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
