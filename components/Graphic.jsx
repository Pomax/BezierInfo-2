var React = require("react");

var baseClass = {
  render: function() {
    var cprops = {
      'data-section': this.props.fragmentid,
      'data-setup': this.props.sname,
      'data-draw': this.props.dname
    };
    console.log(cprops);
    return (
      <figure className={this.props.inline ? "inline": false}>
        {/*
        <ui-canvas {...cprops} />
        */}
        <canvas ref="canvas"
                tabIndex="0"
                style={{
                  width: this.panelCount * this.defaultWidth + "px",
                  height: this.defaultHeight + "px"
                }}
                onMouseDown={this.mouseDown}
                onMouseMove={this.mouseMove}
                onMouseUp={this.mouseUp}
                onClick={this.onClick}
                onKeyUp={this.onKeyUp}
                onKeyDown={this.onKeyDown}
                onKeyPress={this.onKeyPress}
        />
        <figcaption>{this.props.title} {this.props.children}</figcaption>
      </figure>
    );
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
      var Paper = this.Paper = require("../lib/vendor/paperjs/paper-core");
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
  }
};

// For some reason we can copy from gfx into base but
// not the other way around, while preserving context.
var gfxObject = require("./gfx-api");
Object.keys(gfxObject).forEach(fname => {
  baseClass[fname] = gfxObject[fname];
});

module.exports = React.createClass(baseClass);
