module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var ReactRouter = __webpack_require__(3);
	var Router = ReactRouter.Router;
	var Route = ReactRouter.Route;

	var Page = __webpack_require__(4);

	// get all the sections, and generate <Route> objects for each.
	var sections = __webpack_require__(8);
	var generateSingleSection = __webpack_require__(55);
	var pageIDs = Object.keys(sections);

	// Then we generate each page's <Route>
	var rootComponent = generateSingleSection(false);
	var root = React.createElement(Route, { path: '/', component: rootComponent, key: '/' });
	var pages = [root].concat(pageIDs.map(function (id) {
	  return React.createElement(Route, { path: id, component: generateSingleSection(id), key: id });
	}));

	// And finally, the full app's route set, set to use "URL" rather than "hash" navigation.
	// var createBrowserHistory = require('history/lib/createBrowserHistory');
	// var history = createBrowserHistory();
	module.exports = {
	  sections: sections,
	  paths: pageIDs,
	  routes: pages,
	  rootComponent: rootComponent,
	  RouteSet: React.createElement(
	    Router,
	    null,
	    pages
	  )
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);

	var Ribbon = __webpack_require__(5);
	var Header = __webpack_require__(6);
	var Relatives = __webpack_require__(7);
	var Navigation = __webpack_require__(53);
	var Footer = __webpack_require__(54);

	var Page = React.createClass({
	  displayName: "Page",

	  renderCompactContent: function renderCompactContent(nav) {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(Relatives, { prev: this.props.prev, next: this.props.next, position: "before" }),
	      this.props.children,
	      React.createElement(Relatives, { prev: this.props.prev, next: this.props.next, position: "after" })
	    );
	  },

	  renderCompactRoot: function renderCompactRoot(nav) {
	    return React.createElement(
	      "div",
	      null,
	      this.props.children,
	      nav
	    );
	  },

	  renderPageContent: function renderPageContent(nav) {
	    return React.createElement(
	      "div",
	      null,
	      nav,
	      this.props.children
	    );
	  },

	  render: function render() {
	    var content;
	    var compact = this.props.compact;
	    var isRoot = this.props.name === '/';
	    var nav = React.createElement(Navigation, { compact: compact && !isRoot });

	    if (compact) {
	      if (isRoot) {
	        content = this.renderCompactRoot(nav);
	      } else {
	        content = this.renderCompactContent(nav);
	      }
	    } else {
	      content = this.renderPageContent(nav);
	    }

	    return React.createElement(
	      "div",
	      null,
	      React.createElement(Ribbon, null),
	      React.createElement(Header, null),
	      content,
	      React.createElement(Footer, null)
	    );
	  }
	});

	module.exports = Page;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);

	var Ribbon = React.createClass({
	  displayName: "Ribbon",

	  getInitialState: function getInitialState() {
	    return {
	      href: "http://github.com/pomax/BezierInfo-2"
	    };
	  },

	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "ribbon" },
	      React.createElement("img", { src: "images/ribbon.png", alt: "This page on GitHub", border: 0, useMap: "#githubmap", width: "200px", height: "149px" }),
	      React.createElement(
	        "map",
	        { name: "githubmap" },
	        React.createElement("area", { shape: "poly", coords: "30,0, 200,0, 200,114", href: this.state.href, alt: "This page on GitHub" })
	      )
	    );
	  }
	});

	module.exports = Ribbon;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);

	var Header = React.createClass({
	  displayName: 'Header',

	  render: function render() {
	    return React.createElement(
	      'header',
	      null,
	      React.createElement(
	        'h1',
	        null,
	        'A Primer on Bézier Curves'
	      ),
	      React.createElement(
	        'h2',
	        null,
	        'A free, online book for when you really need to know how to do Bézier things.'
	      )
	    );
	  }
	});

	module.exports = Header;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var ReactRouter = __webpack_require__(3);
	var Link = ReactRouter.Link;

	var sections = __webpack_require__(8);
	var pageIDs = Object.keys(sections);

	var Relatives = React.createClass({
	  displayName: 'Relatives',
	  getInitialState: function getInitialState() {
	    var prev = this.props.prev;
	    if (prev > -1) {
	      prev = {
	        to: pageIDs[prev],
	        title: sections[pageIDs[prev]].getDefaultProps().title
	      };
	    } else {
	      prev = false;
	    }

	    var next = this.props.next;
	    if (next < pageIDs.length) {
	      next = {
	        to: pageIDs[next],
	        title: sections[pageIDs[next]].getDefaultProps().title
	      };
	    } else {
	      next = false;
	    }

	    return {
	      prev: prev,
	      next: next
	    };
	  },

	  render: function render() {
	    if (!this.props.prev && !this.props.next) return null;
	    return React.createElement(
	      'table',
	      { className: "relatives " + this.props.position },
	      React.createElement(
	        'tbody',
	        null,
	        React.createElement(
	          'tr',
	          null,
	          React.createElement(
	            'td',
	            null,
	            !this.state.prev ? null : React.createElement(
	              Link,
	              { className: 'prev', to: this.state.prev.to },
	              this.props.prev + ". " + this.state.prev.title
	            )
	          ),
	          React.createElement(
	            'td',
	            { className: 'toc' },
	            React.createElement(
	              Link,
	              { to: '/' },
	              'ToC'
	            )
	          ),
	          React.createElement(
	            'td',
	            null,
	            !this.state.next ? null : React.createElement(
	              Link,
	              { className: 'next', to: this.state.next.to },
	              this.props.next + ". " + this.state.next.title
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = Relatives;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * This is an ordered list of all sections for the article
	 * @type {Object}
	 */
	module.exports = {
	  preface: __webpack_require__(9),
	  introduction: __webpack_require__(10),
	  whatis: __webpack_require__(16),
	  explanation: __webpack_require__(17),

	  control: __webpack_require__(20),
	  matrix: __webpack_require__(21),
	  decasteljau: __webpack_require__(22),
	  flattening: __webpack_require__(23),
	  splitting: __webpack_require__(24),
	  matrixsplit: __webpack_require__(25),
	  reordering: __webpack_require__(26),

	  derivatives: __webpack_require__(27),
	  pointvectors: __webpack_require__(28),
	  components: __webpack_require__(29),
	  extremities: __webpack_require__(30),
	  boundingbox: __webpack_require__(31),
	  aligning: __webpack_require__(32),
	  tightbounds: __webpack_require__(33),
	  canonical: __webpack_require__(34),

	  arclength: __webpack_require__(35),
	  arclengthapprox: __webpack_require__(36),
	  tracing: __webpack_require__(37),

	  intersections: __webpack_require__(38),
	  curveintersection: __webpack_require__(39),

	  abc: __webpack_require__(40),
	  moulding: __webpack_require__(41),
	  pointcurves: __webpack_require__(42),

	  catmullconv: __webpack_require__(43),
	  catmullmoulding: __webpack_require__(44),

	  polybezier: __webpack_require__(45),

	  shapes: __webpack_require__(46),

	  projections: __webpack_require__(47),
	  offsetting: __webpack_require__(48),
	  graduatedoffset: __webpack_require__(49),

	  circles: __webpack_require__(50),
	  circles_cubic: __webpack_require__(51),
	  arcapproximation: __webpack_require__(52)
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);

	var Preface = React.createClass({
	  displayName: "Preface",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Preface"
	    };
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(
	        "h2",
	        null,
	        this.props.title
	      ),
	      React.createElement(
	        "p",
	        null,
	        "In order to draw things in 2D, we usually rely on lines, which typically get classified into two categories: straight lines, and curves. The first of these are as easy to draw as they are easy to make a computer draw. Give a computer the first and last point in the line, and BAM! straight line. No questions asked."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Curves, however, are a much bigger problem. While we can draw curves with ridiculous ease freehand, computers are a bit handicapped in that they can't draw curves unless there is a mathematical function that describes how it should be drawn. In fact, they even need this for straight lines, but the function is ridiculously easy, so we tend to ignore that as far as computers are concerned, all lines are \"functions\", regardless of whether they're straight or curves. However, that does mean that we need to come up with fast-to-compute functions that lead to nice looking curves on a computer. There's a number of these, and in this article we'll focus on a particular function that has received quite a bit of attention, and is used in pretty much anything that can draw curves: \"Bézier\" curves"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "They're named after ",
	        React.createElement(
	          "a",
	          { href: "https://en.wikipedia.org/wiki/Pierre_B%C3%A9zier" },
	          "Pierre Bézier"
	        ),
	        ", who is principally responsible for getting them known to the world as a curve well-suited for design work (working for Renault and publishing his investigations in 1962), although he was not the first, or only one, to \"invent\" these type of curves. One might be tempted to say that the mathematician ",
	        React.createElement(
	          "a",
	          { href: "https://en.wikipedia.org/wiki/Paul_de_Casteljau" },
	          "Paul de Casteljau"
	        ),
	        " was first, investigating the nature of these curves in 1959 while working at Citroën, coming up with a really elegant way of figuring out how to draw them. However, de Casteljau did not publish his work, making the question \"who was first\" hard to answer in any absolute sense. Or is it? Bézier curves are, at their core, \"Bernstein polynomials\", a family of mathematical functions investigated by ",
	        React.createElement(
	          "a",
	          { href: "https://en.wikipedia.org/wiki/Sergei_Natanovich_Bernstein" },
	          "Sergei Natanovich Bernstein"
	        ),
	        ", with publications on them at least as far back as 1912. Anyway, that's mostly trivia, what you are more likely to care about is that these curves are handy: you can link up multiple Bézier curves so that the combination looks like a single curve. If you've ever drawn Photoshop \"paths\" or worked with vector drawing programs like Flash, Illustrator or Inkscape, those curves you've been drawing are Bézier curves."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So, what if you need to program them yourself? What are the pitfalls? How do you draw them? What are the bounding boxes, how do you determine intersections, how can you extrude a curve, in short: how do you do everything that you might want when you do with these curves? That's what this page is for. Prepare to be mathed!"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "—Pomax (or in the tweetworld, ",
	        React.createElement(
	          "a",
	          { href: "https://twitter.com/TheRealPomax" },
	          "@TheRealPomax"
	        ),
	        ")"
	      ),
	      React.createElement(
	        "div",
	        { className: "note" },
	        React.createElement(
	          "h2",
	          null,
	          "Note: virtually all Bézier graphics are interactive."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "This page uses interactive examples, relying heavily on ",
	          React.createElement(
	            "a",
	            { href: "http://pomax.github.io/bezierjs/" },
	            "Bezier.js"
	          ),
	          ", as well as \"real\" maths (in LaTeX form) which is typeset using the most excellent ",
	          React.createElement(
	            "a",
	            { href: "http://MathJax.org" },
	            "MathJax"
	          ),
	          " library. The page is generated offline as a React application, using Webpack, which has made adding \"view source\" options considerably more challenging. I'm still trying to figure out how to add them back in, but it didn't feel like it should hold up deploying this update compared to the previous years' version."
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "This book is open source."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "This book is an open source software project, and lives on two github repositorites. The first is ",
	          React.createElement(
	            "a",
	            { href: "https://github.com/pomax/bezierinfo" },
	            "https://github.com/pomax/bezierinfo"
	          ),
	          " and is the purely-for-presentation version you are viewing right now. The other repository is",
	          React.createElement(
	            "a",
	            { href: "https://github.com/pomax/BezierInfo-2" },
	            "https://github.com/pomax/BezierInfo-2"
	          ),
	          ", which is the development version, housing all the html, javascript, and css. You can fork either of these, and pretty much do with them as you please, except for passing it off as your own work wholesale, of course =)"
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "How complicated is the maths going to be?"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Most of the mathematics in this Primer are early high school maths. If you understand basic arithmetic, and you know how to read English, you should be able to get by just fine. There will at times be ",
	          React.createElement(
	            "em",
	            null,
	            "far"
	          ),
	          " more complicated maths, but if you don't feel like digesting them, you can safely skip over them by either skipping over the \"detail boxes\" in section or by just jumping to the end of a section with maths that looks too involving. The end of sections typically simply list the conclusions so you can just work with those values directly."
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "Questions, comments:"
	        ),
	        "If you have suggestions for new sections, hit up the ",
	        React.createElement(
	          "a",
	          { href: "https://github.com/pomax/BezierInfo-2/issues" },
	          "github issue tracker"
	        ),
	        " (also reachable from the repo linked to in the upper right). If you have questions about the material, there's currently no comment section while I'm doing the rewrite, but you can use the issue tracker for that as well. Once the rewrite is done, I'll add a general comment section back in, and maybe a more topical \"select this section of text and hit the 'question' button to ask a question about it\" system. We'll see."
	      )
	    );
	  }
	});

	module.exports = Preface;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var Introduction = React.createClass({
	  displayName: "Introduction",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "A lightning introduction"
	    };
	  },

	  drawQuadratic: function drawQuadratic(api) {
	    var curve = api.getDefaultQuadratic();
	    api.setCurve(curve);
	  },

	  drawCubic: function drawCubic(api) {
	    var curve = api.getDefaultCubic();
	    api.setCurve(curve);
	  },

	  drawCurve: function drawCurve(api, curve) {
	    api.reset();
	    api.drawSkeleton(curve);
	    api.drawCurve(curve);
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "Let's start with the good stuff: when we're talking about Bézier curves, we're talking about the things that you can see in the following graphics. They run from some start point to some end point, with their curvature influenced by one or more \"intermediate\" control points. Now, because all the graphics on this page are interactive, go manipulate those curves a bit: click-drag the points, and see how their shape changes based on what you do."
	      ),
	      React.createElement(
	        "div",
	        { className: "figure" },
	        React.createElement(Graphic, { inline: true, title: "Quadratic Bézier curves", setup: this.drawQuadratic, draw: this.drawCurve }),
	        React.createElement(Graphic, { inline: true, title: "Cubic Bézier curves", setup: this.drawCubic, draw: this.drawCurve })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "These curves are used a lot in computer aided design and computer aided manufacturing (CAD/CAM) applications, as well as in graphic design programs like Adobe Illustrator and Photoshop, Inkscape, the Gimp, etc. and in graphic technologies like scalable vector graphics (SVG) and OpenType fonts (ttf/otf). A lot of things use Bézier curves, so if you want to learn more about them... prepare to get your learn on!"
	      )
	    );
	  }
	});

	module.exports = Introduction;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var chroma = __webpack_require__(12);
	var Bezier = __webpack_require__(13);

	// event coordinate fix
	var fix = function fix(e) {
	  e = e || window.event;
	  var target = e.target || e.srcElement,
	      rect = target.getBoundingClientRect();
	  e.offsetX = e.clientX - rect.left;
	  e.offsetY = e.clientY - rect.top;
	};

	var Graphic = React.createClass({
	  displayName: "Graphic",

	  Paper: false,

	  defaultWidth: 275,
	  defaultHeight: 275,

	  Bezier: Bezier,
	  utils: Bezier.getUtils(),
	  curve: false,
	  mx: 0,
	  my: 0,
	  cx: 0,
	  cy: 0,
	  mp: false,
	  offset: { x: 0, y: 0 },
	  lpts: [],
	  colorSeed: 0,
	  playing: false,
	  frame: 0,
	  playinterval: 33,

	  animate: function animate() {
	    if (this.playing) {
	      this.frame++;
	      // requestAnimationFrame is spectacularly too fast
	      setTimeout(this.animate, this.playinterval);
	      this.props.draw(this, this.curve);
	    }
	  },

	  getFrame: function getFrame() {
	    return this.frame;
	  },
	  getPlayInterval: function getPlayInterval() {
	    return this.playinterval;
	  },
	  play: function play() {
	    this.playing = true;this.animate();
	  },
	  pause: function pause() {
	    this.playing = false;
	  },
	  redraw: function redraw() {
	    if (this.props.draw) {
	      this.props.draw(this, this.curve);
	    }
	  },

	  render: function render() {
	    //var href = "data:text/plain," + this.props.code;
	    return React.createElement(
	      "figure",
	      { className: this.props.inline ? "inline" : false },
	      React.createElement("canvas", { ref: "canvas",
	        tabIndex: "0",
	        onMouseDown: this.mouseDown,
	        onMouseMove: this.mouseMove,
	        onMouseUp: this.mouseUp,
	        onClick: this.onClick,
	        onKeyUp: this.onKeyUp,
	        onKeyDown: this.onKeyDown,
	        onKeyPress: this.onKeyPress
	      }),
	      React.createElement(
	        "figcaption",
	        null,
	        this.props.title,
	        " ",
	        this.props.children
	      )
	    );
	  },

	  componentDidMount: function componentDidMount() {
	    var cvs = this.refs.canvas;
	    cvs.width = this.defaultWidth;
	    cvs.height = this.defaultHeight;
	    this.cvs = cvs;
	    var ctx = cvs.getContext("2d");
	    this.ctx = ctx;

	    if (this.props.paperjs) {
	      var Paper = this.Paper = __webpack_require__(14);
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
	  },

	  mouseDown: function mouseDown(evt) {
	    var _this = this;

	    fix(evt);
	    this.mx = evt.offsetX;
	    this.my = evt.offsetY;

	    this.movingPoint = false;
	    this.dragging = false;
	    this.down = true;

	    this.lpts.forEach(function (p, idx) {
	      if (Math.abs(_this.mx - p.x) < 10 && Math.abs(_this.my - p.y) < 10) {
	        _this.movingPoint = true;
	        _this.mp = p;
	        _this.mp_idx = idx;
	        _this.cx = p.x;
	        _this.cy = p.y;
	      }
	    });

	    if (this.props.onMouseDown) {
	      this.props.onMouseDown(evt, this);
	    }
	  },

	  mouseMove: function mouseMove(evt) {
	    fix(evt);

	    if (!this.props.static) {

	      if (this.down) {
	        this.dragging = true;
	      }

	      var found = false;
	      this.lpts.forEach(function (p) {
	        var mx = evt.offsetX;
	        var my = evt.offsetY;
	        if (Math.abs(mx - p.x) < 10 && Math.abs(my - p.y) < 10) {
	          found = found || true;
	        }
	      });
	      this.cvs.style.cursor = found ? "pointer" : "default";

	      this.hover = {
	        x: evt.offsetX,
	        y: evt.offsetY
	      };

	      if (this.movingPoint) {
	        this.ox = evt.offsetX - this.mx;
	        this.oy = evt.offsetY - this.my;
	        this.mp.x = this.cx + this.ox;
	        this.mp.y = this.cy + this.oy;
	        if (this.curve.forEach) {
	          for (var i = 0, c, _pts; i < this.curve.length; i++) {
	            c = this.curve[i];
	            _pts = c.points;
	            if (_pts.indexOf(this.mp) > -1) {
	              c.update();
	              break;
	            }
	          }
	        } else if (this.curve && this.curve.update) {
	          this.curve.update();
	        }
	      }
	    }

	    if (this.props.onMouseMove) {
	      this.props.onMouseMove(evt, this);
	    }

	    if (this.dragging && this.props.onMouseDrag) {
	      this.props.onMouseDrag(evt, this);
	    }

	    if (!this.props.static && !this.playing && this.props.draw) {
	      this.props.draw(this, this.curve);
	    }
	  },

	  mouseUp: function mouseUp(evt) {
	    this.down = false;
	    if (!this.movingPoint) {
	      if (this.props.onMouseUp) {
	        this.props.onMouseUp(evt, this);
	      }
	      return;
	    }
	    this.movingPoint = false;
	    this.mp = false;
	    if (this.props.onMouseUp) {
	      this.props.onMouseUp(evt, this);
	    }
	  },

	  onClick: function onClick(evt) {
	    fix(evt);
	    this.mx = evt.offsetX;
	    this.my = evt.offsetY;
	    if (!this.dragging && this.props.onClick) {
	      this.props.onClick(evt, this);
	    }
	  },

	  onKeyUp: function onKeyUp(evt) {
	    if (this.props.onKeyUp) {
	      this.props.onKeyUp(evt, this);
	      if (!this.playing && this.props.draw) {
	        this.props.draw(this, this.curve);
	      }
	    }
	  },

	  onKeyDown: function onKeyDown(evt) {
	    if (this.props.onKeyDown) {
	      this.props.onKeyDown(evt, this);
	      if (!this.playing && this.props.draw) {
	        this.props.draw(this, this.curve);
	      }
	    }
	  },

	  onKeyPress: function onKeyPress(evt) {
	    if (this.props.onKeyPress) {
	      this.props.onKeyPress(evt, this);
	      if (!this.playing && this.props.draw) {
	        this.props.draw(this, this.curve);
	      }
	    }
	  },

	  /**
	   * API for curve drawing.
	   */

	  reset: function reset() {
	    this.refs.canvas.width = this.refs.canvas.width;
	    this.ctx.strokeStyle = "black";
	    this.ctx.lineWidth = 1;
	    this.ctx.fillStyle = "none";
	    this.offset = { x: 0, y: 0 };
	    this.colorSeed = 0;
	  },

	  setSize: function setSize(w, h) {
	    this.defaultWidth = w;
	    this.defaultHeight = h;
	    this.refs.canvas.width = w;
	    this.refs.canvas.height = h;
	  },

	  setCurves: function setCurves(c) {
	    this.setCurve(c);
	  },

	  setCurve: function setCurve(c) {
	    var pts = [];
	    c = c instanceof Array ? c : Array.prototype.slice.call(arguments);
	    c.forEach(function (nc) {
	      pts = pts.concat(nc.points);
	    });
	    this.curve = c.length === 1 ? c[0] : c;
	    this.lpts = pts;
	  },

	  getPanelWidth: function getPanelWidth() {
	    return this.defaultWidth;
	  },

	  getPanelHeight: function getPanelHeight() {
	    return this.defaultHeight;
	  },

	  getDefaultQuadratic: function getDefaultQuadratic() {
	    return new this.Bezier(70, 250, 20, 110, 250, 60);
	  },

	  getDefaultCubic: function getDefaultCubic() {
	    return new this.Bezier(120, 160, 35, 200, 220, 260, 220, 40);
	  },

	  toImage: function toImage() {
	    var dataURL = this.refs.canvas.toDataURL();
	    var img = new Image();
	    img.src = dataURL;
	    return img;
	  },

	  setPanelCount: function setPanelCount(c) {
	    var cvs = this.refs.canvas;
	    cvs.width = c * this.defaultWidth;
	  },

	  setOffset: function setOffset(f) {
	    this.offset = f;
	  },

	  setColor: function setColor(c) {
	    this.ctx.strokeStyle = c;
	  },

	  getColor: function getColor() {
	    return this.ctx.strokeStyle || "black";
	  },

	  setWeight: function setWeight(c) {
	    this.ctx.lineWidth = c;
	  },

	  noColor: function noColor(c) {
	    this.ctx.strokeStyle = "transparent";
	  },

	  setRandomColor: function setRandomColor(a) {
	    a = typeof a === "undefined" ? 1 : a;
	    var h = this.colorSeed % 360,
	        s = 1.0,
	        l = 0.34;
	    this.colorSeed += 87;
	    this.ctx.strokeStyle = chroma.hsl(h, s, l).alpha(a).css();
	  },

	  setRandomFill: function setRandomFill(a) {
	    a = typeof a === "undefined" ? 1 : a;
	    var h = this.colorSeed % 360,
	        s = 1.0,
	        l = 0.34;
	    this.colorSeed += 87;
	    this.ctx.fillStyle = chroma.hsl(h, s, l).alpha(a).css();
	  },

	  setFill: function setFill(c) {
	    this.ctx.fillStyle = c;
	  },

	  getFill: function getFill() {
	    return this.ctx.fillStyle || "transparent";
	  },

	  noFill: function noFill() {
	    this.ctx.fillStyle = "transparent";
	  },

	  drawSkeleton: function drawSkeleton(curve, offset, nocoords) {
	    offset = offset || { x: 0, y: 0 };
	    var pts = curve.points;
	    if (pts.length > 2) {
	      this.ctx.strokeStyle = "lightgrey";
	      this.drawLine(pts[0], pts[1], offset);
	      var last = pts.length - 2;
	      for (var i = 1; i < last; i++) {
	        this.drawLine(pts[i], pts[i + 1], offset);
	      }
	      this.drawLine(pts[last], pts[last + 1], offset);
	    }
	    this.ctx.strokeStyle = "black";
	    this.drawPoints(pts, offset);
	    if (!nocoords) {
	      this.drawCoordinates(curve, offset);
	    }
	  },

	  drawGrid: function drawGrid(xcount, ycount, offset) {
	    var w = this.defaultWidth,
	        h = this.defaultHeight,
	        xstep = w / xcount,
	        ox = xstep / 2,
	        ystep = h / ycount,
	        oy = ystep / 2,
	        x,
	        xv,
	        y,
	        yv,
	        p1,
	        p2;
	    for (x = 0; x < xcount; x++) {
	      xv = ox + x * xstep;
	      p1 = { x: xv, y: 0 };
	      p2 = { x: xv, y: h };
	      this.drawLine(p1, p2, offset);
	    }
	    for (y = 0; y < ycount; y++) {
	      yv = oy + y * ystep;
	      p1 = { x: 0, y: yv };
	      p2 = { x: w, y: yv };
	      this.drawLine(p1, p2, offset);
	    }
	  },

	  drawHull: function drawHull(curve, t, offset) {
	    var hull = curve instanceof Array ? curve : curve.hull(t);
	    if (hull.length === 6) {
	      this.drawLine(hull[0], hull[1], offset);
	      this.drawLine(hull[1], hull[2], offset);
	      this.drawLine(hull[3], hull[4], offset);
	    } else {
	      this.drawLine(hull[0], hull[1], offset);
	      this.drawLine(hull[1], hull[2], offset);
	      this.drawLine(hull[2], hull[3], offset);
	      this.drawLine(hull[4], hull[5], offset);
	      this.drawLine(hull[5], hull[6], offset);
	      this.drawLine(hull[7], hull[8], offset);
	    }
	    return hull;
	  },

	  drawCoordinates: function drawCoordinates(curve, offset) {
	    var _this2 = this;

	    offset = offset || { x: 0, y: 0 };
	    var pts = curve.points;
	    this.setFill("black");
	    pts.forEach(function (p) {
	      _this2.text("(" + p.x + "," + p.y + ")", { x: p.x + offset.x + 5, y: p.y + offset.y + 10 });
	    });
	  },

	  drawFunction: function drawFunction(generator, offset) {
	    var start = generator.start || 0,
	        p0 = generator(start),
	        end = generator.end || 1,
	        plast = generator(end),
	        step = generator.step || 0.01,
	        scale = generator.scale || 1,
	        p,
	        t;
	    for (t = step; t < end; t += step) {
	      p = generator(t, scale);
	      this.drawLine(p0, p, offset);
	      p0 = p;
	    }
	    this.drawLine(p, plast, offset);
	  },

	  drawCurve: function drawCurve(curve, offset) {
	    var _this3 = this;

	    offset = offset || { x: 0, y: 0 };
	    var p = curve.points;

	    if (p.length <= 3 || 5 <= p.length) {
	      var points = curve.getLUT(100);
	      var p0 = points[0];
	      points.forEach(function (p1, i) {
	        if (!i) return;
	        _this3.drawLine(p0, p1, offset);
	        p0 = p1;
	      });
	      return;
	    }

	    var ox = offset.x + this.offset.x;
	    var oy = offset.y + this.offset.y;
	    this.ctx.beginPath();
	    this.ctx.moveTo(p[0].x + ox, p[0].y + oy);
	    if (p.length === 3) {
	      this.ctx.quadraticCurveTo(p[1].x + ox, p[1].y + oy, p[2].x + ox, p[2].y + oy);
	    } else if (p.length === 4) {
	      this.ctx.bezierCurveTo(p[1].x + ox, p[1].y + oy, p[2].x + ox, p[2].y + oy, p[3].x + ox, p[3].y + oy);
	    }
	    this.ctx.stroke();
	    this.ctx.closePath();
	  },

	  drawLine: function drawLine(p1, p2, offset) {
	    offset = offset || { x: 0, y: 0 };
	    var ox = offset.x + this.offset.x;
	    var oy = offset.y + this.offset.y;
	    this.ctx.beginPath();
	    this.ctx.moveTo(p1.x + ox, p1.y + oy);
	    this.ctx.lineTo(p2.x + ox, p2.y + oy);
	    this.ctx.stroke();
	  },

	  drawPoint: function drawPoint(p, offset) {
	    this.drawCircle(p, 1, offset);
	  },

	  drawPoints: function drawPoints(points, offset) {
	    offset = offset || { x: 0, y: 0 };
	    points.forEach(function (p) {
	      this.drawCircle(p, offset.x !== 0 || offset.y !== 0 ? 1.5 : 3, offset);
	    }.bind(this));
	  },

	  drawArc: function drawArc(p, offset) {
	    offset = offset || { x: 0, y: 0 };
	    var ox = offset.x + this.offset.x;
	    var oy = offset.y + this.offset.y;
	    this.ctx.beginPath();
	    this.ctx.moveTo(p.x + ox, p.y + oy);
	    this.ctx.arc(p.x + ox, p.y + oy, p.r, p.s, p.e);
	    this.ctx.lineTo(p.x + ox, p.y + oy);
	    this.ctx.fill();
	    this.ctx.stroke();
	  },

	  drawCircle: function drawCircle(p, r, offset) {
	    offset = offset || { x: 0, y: 0 };
	    var ox = offset.x + this.offset.x;
	    var oy = offset.y + this.offset.y;
	    this.ctx.beginPath();
	    this.ctx.arc(p.x + ox, p.y + oy, r, 0, 2 * Math.PI);
	    this.ctx.stroke();
	  },

	  drawbbox: function drawbbox(bbox, offset) {
	    offset = offset || { x: 0, y: 0 };
	    var ox = offset.x + this.offset.x;
	    var oy = offset.y + this.offset.y;
	    this.ctx.beginPath();
	    this.ctx.moveTo(bbox.x.min + ox, bbox.y.min + oy);
	    this.ctx.lineTo(bbox.x.min + ox, bbox.y.max + oy);
	    this.ctx.lineTo(bbox.x.max + ox, bbox.y.max + oy);
	    this.ctx.lineTo(bbox.x.max + ox, bbox.y.min + oy);
	    this.ctx.closePath();
	    this.ctx.stroke();
	  },

	  drawRect: function drawRect(p1, p2, offset) {
	    offset = offset || { x: 0, y: 0 };
	    var ox = offset.x + this.offset.x;
	    var oy = offset.y + this.offset.y;
	    var x = p1.x + ox,
	        y = p1.y + oy,
	        w = p2.x - p1.x,
	        h = p2.y - p1.y;
	    this.ctx.beginPath();
	    this.ctx.moveTo(x, y);
	    this.ctx.lineTo(x + w, y);
	    this.ctx.lineTo(x + w, y + h);
	    this.ctx.lineTo(x, y + h);
	    this.ctx.closePath();
	    this.ctx.fill();
	    this.ctx.stroke();
	  },

	  drawPath: function drawPath(path, offset) {
	    var _this4 = this;

	    offset = offset || { x: 0, y: 0 };
	    var ox = offset.x + this.offset.x;
	    var oy = offset.y + this.offset.y;
	    this.ctx.beginPath();
	    path.forEach(function (p, idx) {
	      if (idx === 0) {
	        return _this4.ctx.moveTo(p.x + ox, p.y + oy);
	      }
	      _this4.ctx.lineTo(p.x + ox, p.y + oy);
	    });
	    if (closed) this.ctx.closePath();
	    this.ctx.fill();
	    this.ctx.stroke();
	  },

	  drawShape: function drawShape(shape, offset) {
	    offset = offset || { x: 0, y: 0 };
	    var ox = offset.x + this.offset.x;
	    var oy = offset.y + this.offset.y;
	    var order = shape.forward.points.length - 1;
	    this.ctx.beginPath();
	    this.ctx.moveTo(ox + shape.startcap.points[0].x, oy + shape.startcap.points[0].y);
	    this.ctx.lineTo(ox + shape.startcap.points[3].x, oy + shape.startcap.points[3].y);
	    if (order === 3) {
	      this.ctx.bezierCurveTo(ox + shape.forward.points[1].x, oy + shape.forward.points[1].y, ox + shape.forward.points[2].x, oy + shape.forward.points[2].y, ox + shape.forward.points[3].x, oy + shape.forward.points[3].y);
	    } else {
	      this.ctx.quadraticCurveTo(ox + shape.forward.points[1].x, oy + shape.forward.points[1].y, ox + shape.forward.points[2].x, oy + shape.forward.points[2].y);
	    }
	    this.ctx.lineTo(ox + shape.endcap.points[3].x, oy + shape.endcap.points[3].y);
	    if (order === 3) {
	      this.ctx.bezierCurveTo(ox + shape.back.points[1].x, oy + shape.back.points[1].y, ox + shape.back.points[2].x, oy + shape.back.points[2].y, ox + shape.back.points[3].x, oy + shape.back.points[3].y);
	    } else {
	      this.ctx.quadraticCurveTo(ox + shape.back.points[1].x, oy + shape.back.points[1].y, ox + shape.back.points[2].x, oy + shape.back.points[2].y);
	    }
	    this.ctx.closePath();
	    this.ctx.fill();
	    this.ctx.stroke();
	  },

	  text: function text(_text, coord, offset) {
	    offset = offset || { x: 0, y: 0 };
	    if (this.offset) {
	      offset.x += this.offset.x;
	      offset.y += this.offset.y;
	    }
	    this.ctx.fillText(_text, coord.x + offset.x, coord.y + offset.y);
	  },

	  image: function image(_image, offset) {
	    var _this5 = this;

	    offset = offset || { x: 0, y: 0 };
	    if (this.offset) {
	      offset.x += this.offset.x;
	      offset.y += this.offset.y;
	    }
	    if (_image.loaded) {
	      this.ctx.drawImage(_image, offset.x, offset.y);
	    } else {
	      _image.onload = function () {
	        _image.loaded = true;
	        _this5.ctx.drawImage(_image, offset.x, offset.y);
	      };
	    }
	  },

	  drawAxes: function drawAxes(pad, xlabel, xs, xe, ylabel, ys, ye, offset) {
	    offset = offset || { x: 0, y: 0 };
	    var dim = this.getPanelWidth();

	    this.drawLine({ x: pad, y: pad }, { x: dim - pad, y: pad }, offset);
	    this.drawLine({ x: pad, y: pad }, { x: pad, y: dim - pad }, offset);

	    this.setFill("black");

	    this.text(xlabel + " →", { x: offset.x + dim / 2, y: offset.y + 15 });
	    this.text(xs, { x: offset.x + pad, y: offset.y + 15 });
	    this.text(xe, { x: offset.x + dim - pad, y: offset.y + 15 });

	    this.text(ylabel, { x: offset.x + 5, y: offset.y + dim / 2 - pad });
	    this.text("↓", { x: offset.x + 5, y: offset.y + dim / 2 });
	    this.text(ys, { x: offset.x + 4, y: offset.y + pad + 5 });
	    this.text(ye, { x: offset.x + 2, y: offset.y + dim - pad + 10 });
	  }

	});

	module.exports = Graphic;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("chroma-js");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("bezier-js");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * Paper.js v0.9.25 - The Swiss Army Knife of Vector Graphics Scripting.
	 * http://paperjs.org/
	 *
	 * Copyright (c) 2011 - 2014, Juerg Lehni & Jonathan Puckey
	 * http://scratchdisk.com/ & http://jonathanpuckey.com/
	 *
	 * Distributed under the MIT license. See LICENSE file for details.
	 *
	 * All rights reserved.
	 *
	 * Date: Sun Oct 25 11:23:38 2015 +0100
	 *
	 ***
	 *
	 * Straps.js - Class inheritance library with support for bean-style accessors
	 *
	 * Copyright (c) 2006 - 2013 Juerg Lehni
	 * http://scratchdisk.com/
	 *
	 * Distributed under the MIT license.
	 *
	 ***
	 *
	 * Acorn.js
	 * http://marijnhaverbeke.nl/acorn/
	 *
	 * Acorn is a tiny, fast JavaScript parser written in JavaScript,
	 * created by Marijn Haverbeke and released under an MIT license.
	 *
	 */

	var paper = new function(undefined) {

	var Base = new function() {
		var hidden = /^(statics|enumerable|beans|preserve)$/,

			forEach = [].forEach || function(iter, bind) {
				for (var i = 0, l = this.length; i < l; i++)
					iter.call(bind, this[i], i, this);
			},

			forIn = function(iter, bind) {
				for (var i in this)
					if (this.hasOwnProperty(i))
						iter.call(bind, this[i], i, this);
			},

			create = Object.create || function(proto) {
				return { __proto__: proto };
			},

			describe = Object.getOwnPropertyDescriptor || function(obj, name) {
				var get = obj.__lookupGetter__ && obj.__lookupGetter__(name);
				return get
						? { get: get, set: obj.__lookupSetter__(name),
							enumerable: true, configurable: true }
						: obj.hasOwnProperty(name)
							? { value: obj[name], enumerable: true,
								configurable: true, writable: true }
							: null;
			},

			_define = Object.defineProperty || function(obj, name, desc) {
				if ((desc.get || desc.set) && obj.__defineGetter__) {
					if (desc.get)
						obj.__defineGetter__(name, desc.get);
					if (desc.set)
						obj.__defineSetter__(name, desc.set);
				} else {
					obj[name] = desc.value;
				}
				return obj;
			},

			define = function(obj, name, desc) {
				delete obj[name];
				return _define(obj, name, desc);
			};

		function inject(dest, src, enumerable, beans, preserve) {
			var beansNames = {};

			function field(name, val) {
				val = val || (val = describe(src, name))
						&& (val.get ? val : val.value);
				if (typeof val === 'string' && val[0] === '#')
					val = dest[val.substring(1)] || val;
				var isFunc = typeof val === 'function',
					res = val,
					prev = preserve || isFunc && !val.base
							? (val && val.get ? name in dest : dest[name])
							: null,
					bean;
				if (!preserve || !prev) {
					if (isFunc && prev)
						val.base = prev;
					if (isFunc && beans !== false
							&& (bean = name.match(/^([gs]et|is)(([A-Z])(.*))$/)))
						beansNames[bean[3].toLowerCase() + bean[4]] = bean[2];
					if (!res || isFunc || !res.get || typeof res.get !== 'function'
							|| !Base.isPlainObject(res))
						res = { value: res, writable: true };
					if ((describe(dest, name)
							|| { configurable: true }).configurable) {
						res.configurable = true;
						res.enumerable = enumerable;
					}
					define(dest, name, res);
				}
			}
			if (src) {
				for (var name in src) {
					if (src.hasOwnProperty(name) && !hidden.test(name))
						field(name);
				}
				for (var name in beansNames) {
					var part = beansNames[name],
						set = dest['set' + part],
						get = dest['get' + part] || set && dest['is' + part];
					if (get && (beans === true || get.length === 0))
						field(name, { get: get, set: set });
				}
			}
			return dest;
		}

		function each(obj, iter, bind) {
			if (obj)
				('length' in obj && !obj.getLength
						&& typeof obj.length === 'number'
					? forEach
					: forIn).call(obj, iter, bind = bind || obj);
			return bind;
		}

		function set(obj, props, exclude) {
			for (var key in props)
				if (props.hasOwnProperty(key) && !(exclude && exclude[key]))
					obj[key] = props[key];
			return obj;
		}

		return inject(function Base() {
			for (var i = 0, l = arguments.length; i < l; i++)
				set(this, arguments[i]);
		}, {
			inject: function(src) {
				if (src) {
					var statics = src.statics === true ? src : src.statics,
						beans = src.beans,
						preserve = src.preserve;
					if (statics !== src)
						inject(this.prototype, src, src.enumerable, beans, preserve);
					inject(this, statics, true, beans, preserve);
				}
				for (var i = 1, l = arguments.length; i < l; i++)
					this.inject(arguments[i]);
				return this;
			},

			extend: function() {
				var base = this,
					ctor,
					proto;
				for (var i = 0, l = arguments.length; i < l; i++)
					if (ctor = arguments[i].initialize)
						break;
				ctor = ctor || function() {
					base.apply(this, arguments);
				};
				proto = ctor.prototype = create(this.prototype);
				define(proto, 'constructor',
						{ value: ctor, writable: true, configurable: true });
				inject(ctor, this, true);
				if (arguments.length)
					this.inject.apply(ctor, arguments);
				ctor.base = base;
				return ctor;
			}
		}, true).inject({
			inject: function() {
				for (var i = 0, l = arguments.length; i < l; i++) {
					var src = arguments[i];
					if (src)
						inject(this, src, src.enumerable, src.beans, src.preserve);
				}
				return this;
			},

			extend: function() {
				var res = create(this);
				return res.inject.apply(res, arguments);
			},

			each: function(iter, bind) {
				return each(this, iter, bind);
			},

			set: function(props) {
				return set(this, props);
			},

			clone: function() {
				return new this.constructor(this);
			},

			statics: {
				each: each,
				create: create,
				define: define,
				describe: describe,
				set: set,

				clone: function(obj) {
					return set(new obj.constructor(), obj);
				},

				isPlainObject: function(obj) {
					var ctor = obj != null && obj.constructor;
					return ctor && (ctor === Object || ctor === Base
							|| ctor.name === 'Object');
				},

				pick: function(a, b) {
					return a !== undefined ? a : b;
				}
			}
		});
	};

	if (true)
		module.exports = Base;

	Base.inject({
		toString: function() {
			return this._id != null
				?  (this._class || 'Object') + (this._name
					? " '" + this._name + "'"
					: ' @' + this._id)
				: '{ ' + Base.each(this, function(value, key) {
					if (!/^_/.test(key)) {
						var type = typeof value;
						this.push(key + ': ' + (type === 'number'
								? Formatter.instance.number(value)
								: type === 'string' ? "'" + value + "'" : value));
					}
				}, []).join(', ') + ' }';
		},

		getClassName: function() {
			return this._class || '';
		},

		exportJSON: function(options) {
			return Base.exportJSON(this, options);
		},

		toJSON: function() {
			return Base.serialize(this);
		},

		_set: function(props, exclude, dontCheck) {
			if (props && (dontCheck || Base.isPlainObject(props))) {
				var keys = Object.keys(props._filtering || props);
				for (var i = 0, l = keys.length; i < l; i++) {
					var key = keys[i];
					if (!(exclude && exclude[key])) {
						var value = props[key];
						if (value !== undefined)
							this[key] = value;
					}
				}
				return true;
			}
		},

		statics: {

			exports: {
				enumerable: true
			},

			extend: function extend() {
				var res = extend.base.apply(this, arguments),
					name = res.prototype._class;
				if (name && !Base.exports[name])
					Base.exports[name] = res;
				return res;
			},

			equals: function(obj1, obj2) {
				if (obj1 === obj2)
					return true;
				if (obj1 && obj1.equals)
					return obj1.equals(obj2);
				if (obj2 && obj2.equals)
					return obj2.equals(obj1);
				if (obj1 && obj2
						&& typeof obj1 === 'object' && typeof obj2 === 'object') {
					if (Array.isArray(obj1) && Array.isArray(obj2)) {
						var length = obj1.length;
						if (length !== obj2.length)
							return false;
						while (length--) {
							if (!Base.equals(obj1[length], obj2[length]))
								return false;
						}
					} else {
						var keys = Object.keys(obj1),
							length = keys.length;
						if (length !== Object.keys(obj2).length)
							return false;
						while (length--) {
							var key = keys[length];
							if (!(obj2.hasOwnProperty(key)
									&& Base.equals(obj1[key], obj2[key])))
								return false;
						}
					}
					return true;
				}
				return false;
			},

			read: function(list, start, options, length) {
				if (this === Base) {
					var value = this.peek(list, start);
					list.__index++;
					return value;
				}
				var proto = this.prototype,
					readIndex = proto._readIndex,
					index = start || readIndex && list.__index || 0;
				if (!length)
					length = list.length - index;
				var obj = list[index];
				if (obj instanceof this
					|| options && options.readNull && obj == null && length <= 1) {
					if (readIndex)
						list.__index = index + 1;
					return obj && options && options.clone ? obj.clone() : obj;
				}
				obj = Base.create(this.prototype);
				if (readIndex)
					obj.__read = true;
				obj = obj.initialize.apply(obj, index > 0 || length < list.length
					? Array.prototype.slice.call(list, index, index + length)
					: list) || obj;
				if (readIndex) {
					list.__index = index + obj.__read;
					obj.__read = undefined;
				}
				return obj;
			},

			peek: function(list, start) {
				return list[list.__index = start || list.__index || 0];
			},

			remain: function(list) {
				return list.length - (list.__index || 0);
			},

			readAll: function(list, start, options) {
				var res = [],
					entry;
				for (var i = start || 0, l = list.length; i < l; i++) {
					res.push(Array.isArray(entry = list[i])
							? this.read(entry, 0, options)
							: this.read(list, i, options, 1));
				}
				return res;
			},

			readNamed: function(list, name, start, options, length) {
				var value = this.getNamed(list, name),
					hasObject = value !== undefined;
				if (hasObject) {
					var filtered = list._filtered;
					if (!filtered) {
						filtered = list._filtered = Base.create(list[0]);
						filtered._filtering = list[0];
					}
					filtered[name] = undefined;
				}
				return this.read(hasObject ? [value] : list, start, options, length);
			},

			getNamed: function(list, name) {
				var arg = list[0];
				if (list._hasObject === undefined)
					list._hasObject = list.length === 1 && Base.isPlainObject(arg);
				if (list._hasObject)
					return name ? arg[name] : list._filtered || arg;
			},

			hasNamed: function(list, name) {
				return !!this.getNamed(list, name);
			},

			isPlainValue: function(obj, asString) {
				return this.isPlainObject(obj) || Array.isArray(obj)
						|| asString && typeof obj === 'string';
			},

			serialize: function(obj, options, compact, dictionary) {
				options = options || {};

				var root = !dictionary,
					res;
				if (root) {
					options.formatter = new Formatter(options.precision);
					dictionary = {
						length: 0,
						definitions: {},
						references: {},
						add: function(item, create) {
							var id = '#' + item._id,
								ref = this.references[id];
							if (!ref) {
								this.length++;
								var res = create.call(item),
									name = item._class;
								if (name && res[0] !== name)
									res.unshift(name);
								this.definitions[id] = res;
								ref = this.references[id] = [id];
							}
							return ref;
						}
					};
				}
				if (obj && obj._serialize) {
					res = obj._serialize(options, dictionary);
					var name = obj._class;
					if (name && !compact && !res._compact && res[0] !== name)
						res.unshift(name);
				} else if (Array.isArray(obj)) {
					res = [];
					for (var i = 0, l = obj.length; i < l; i++)
						res[i] = Base.serialize(obj[i], options, compact,
								dictionary);
					if (compact)
						res._compact = true;
				} else if (Base.isPlainObject(obj)) {
					res = {};
					var keys = Object.keys(obj);
					for (var i = 0, l = keys.length; i < l; i++) {
						var key = keys[i];
						res[key] = Base.serialize(obj[key], options, compact,
								dictionary);
					}
				} else if (typeof obj === 'number') {
					res = options.formatter.number(obj, options.precision);
				} else {
					res = obj;
				}
				return root && dictionary.length > 0
						? [['dictionary', dictionary.definitions], res]
						: res;
			},

			deserialize: function(json, create, _data, _isDictionary) {
				var res = json,
					isRoot = !_data;
				_data = _data || {};
				if (Array.isArray(json)) {
					var type = json[0],
						isDictionary = type === 'dictionary';
					if (json.length == 1 && /^#/.test(type))
						return _data.dictionary[type];
					type = Base.exports[type];
					res = [];
					if (_isDictionary)
						_data.dictionary = res;
					for (var i = type ? 1 : 0, l = json.length; i < l; i++)
						res.push(Base.deserialize(json[i], create, _data,
								isDictionary));
					if (type) {
						var args = res;
						if (create) {
							res = create(type, args);
						} else {
							res = Base.create(type.prototype);
							type.apply(res, args);
						}
					}
				} else if (Base.isPlainObject(json)) {
					res = {};
					if (_isDictionary)
						_data.dictionary = res;
					for (var key in json)
						res[key] = Base.deserialize(json[key], create, _data);
				}
				return isRoot && json && json.length && json[0][0] === 'dictionary'
						? res[1]
						: res;
			},

			exportJSON: function(obj, options) {
				var json = Base.serialize(obj, options);
				return options && options.asString === false
						? json
						: JSON.stringify(json);
			},

			importJSON: function(json, target) {
				return Base.deserialize(
						typeof json === 'string' ? JSON.parse(json) : json,
						function(type, args) {
							var obj = target && target.constructor === type
									? target
									: Base.create(type.prototype),
								isTarget = obj === target;
							if (args.length === 1 && obj instanceof Item
									&& (isTarget || !(obj instanceof Layer))) {
								var arg = args[0];
								if (Base.isPlainObject(arg))
									arg.insert = false;
							}
							type.apply(obj, args);
							if (isTarget)
								target = null;
							return obj;
						});
			},

			splice: function(list, items, index, remove) {
				var amount = items && items.length,
					append = index === undefined;
				index = append ? list.length : index;
				if (index > list.length)
					index = list.length;
				for (var i = 0; i < amount; i++)
					items[i]._index = index + i;
				if (append) {
					list.push.apply(list, items);
					return [];
				} else {
					var args = [index, remove];
					if (items)
						args.push.apply(args, items);
					var removed = list.splice.apply(list, args);
					for (var i = 0, l = removed.length; i < l; i++)
						removed[i]._index = undefined;
					for (var i = index + amount, l = list.length; i < l; i++)
						list[i]._index = i;
					return removed;
				}
			},

			capitalize: function(str) {
				return str.replace(/\b[a-z]/g, function(match) {
					return match.toUpperCase();
				});
			},

			camelize: function(str) {
				return str.replace(/-(.)/g, function(all, chr) {
					return chr.toUpperCase();
				});
			},

			hyphenate: function(str) {
				return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
			}
		}
	});

	var Emitter = {
		on: function(type, func) {
			if (typeof type !== 'string') {
				Base.each(type, function(value, key) {
					this.on(key, value);
				}, this);
			} else {
				var types = this._eventTypes,
					entry = types && types[type],
					handlers = this._callbacks = this._callbacks || {};
				handlers = handlers[type] = handlers[type] || [];
				if (handlers.indexOf(func) === -1) {
					handlers.push(func);
					if (entry && entry.install && handlers.length === 1)
						entry.install.call(this, type);
				}
			}
			return this;
		},

		off: function(type, func) {
			if (typeof type !== 'string') {
				Base.each(type, function(value, key) {
					this.off(key, value);
				}, this);
				return;
			}
			var types = this._eventTypes,
				entry = types && types[type],
				handlers = this._callbacks && this._callbacks[type],
				index;
			if (handlers) {
				if (!func || (index = handlers.indexOf(func)) !== -1
						&& handlers.length === 1) {
					if (entry && entry.uninstall)
						entry.uninstall.call(this, type);
					delete this._callbacks[type];
				} else if (index !== -1) {
					handlers.splice(index, 1);
				}
			}
			return this;
		},

		once: function(type, func) {
			return this.on(type, function() {
				func.apply(this, arguments);
				this.off(type, func);
			});
		},

		emit: function(type, event) {
			var handlers = this._callbacks && this._callbacks[type];
			if (!handlers)
				return false;
			var args = [].slice.call(arguments, 1);
			handlers = handlers.slice();
			for (var i = 0, l = handlers.length; i < l; i++) {
				if (handlers[i].apply(this, args) === false) {
					if (event && event.stop)
						event.stop();
					break;
				}
			}
			return true;
		},

		responds: function(type) {
			return !!(this._callbacks && this._callbacks[type]);
		},

		attach: '#on',
		detach: '#off',
		fire: '#emit',

		_installEvents: function(install) {
			var handlers = this._callbacks,
				key = install ? 'install' : 'uninstall';
			for (var type in handlers) {
				if (handlers[type].length > 0) {
					var types = this._eventTypes,
						entry = types && types[type],
						func = entry && entry[key];
					if (func)
						func.call(this, type);
				}
			}
		},

		statics: {
			inject: function inject(src) {
				var events = src._events;
				if (events) {
					var types = {};
					Base.each(events, function(entry, key) {
						var isString = typeof entry === 'string',
							name = isString ? entry : key,
							part = Base.capitalize(name),
							type = name.substring(2).toLowerCase();
						types[type] = isString ? {} : entry;
						name = '_' + name;
						src['get' + part] = function() {
							return this[name];
						};
						src['set' + part] = function(func) {
							var prev = this[name];
							if (prev)
								this.off(type, prev);
							if (func)
								this.on(type, func);
							this[name] = func;
						};
					});
					src._eventTypes = types;
				}
				return inject.base.apply(this, arguments);
			}
		}
	};

	var PaperScope = Base.extend({
		_class: 'PaperScope',

		initialize: function PaperScope() {
			paper = this;
			this.settings = new Base({
				applyMatrix: true,
				handleSize: 4,
				hitTolerance: 0
			});
			this.project = null;
			this.projects = [];
			this.tools = [];
			this.palettes = [];
			this._id = PaperScope._id++;
			PaperScope._scopes[this._id] = this;
			var proto = PaperScope.prototype;
			if (!this.support) {
				var ctx = CanvasProvider.getContext(1, 1);
				proto.support = {
					nativeDash: 'setLineDash' in ctx || 'mozDash' in ctx,
					nativeBlendModes: BlendMode.nativeModes
				};
				CanvasProvider.release(ctx);
			}

			if (!this.browser) {
				var agent = navigator.userAgent.toLowerCase(),
					platform = (/(win)/.exec(agent)
							|| /(mac)/.exec(agent)
							|| /(linux)/.exec(agent)
							|| [])[0],
					browser = proto.browser = { platform: platform };
				if (platform)
					browser[platform] = true;
				agent.replace(
					/(opera|chrome|safari|webkit|firefox|msie|trident|atom)\/?\s*([.\d]+)(?:.*version\/([.\d]+))?(?:.*rv\:([.\d]+))?/g,
					function(all, n, v1, v2, rv) {
						if (!browser.chrome) {
							var v = n === 'opera' ? v2 : v1;
							if (n === 'trident') {
								v = rv;
								n = 'msie';
							}
							browser.version = v;
							browser.versionNumber = parseFloat(v);
							browser.name = n;
							browser[n] = true;
						}
					}
				);
				if (browser.chrome)
					delete browser.webkit;
				if (browser.atom)
					delete browser.chrome;
			}
		},

		version: "0.9.25",

		getView: function() {
			return this.project && this.project.getView();
		},

		getPaper: function() {
			return this;
		},

		execute: function(code, url, options) {
			paper.PaperScript.execute(code, this, url, options);
			View.updateFocus();
		},

		install: function(scope) {
			var that = this;
			Base.each(['project', 'view', 'tool'], function(key) {
				Base.define(scope, key, {
					configurable: true,
					get: function() {
						return that[key];
					}
				});
			});
			for (var key in this)
				if (!/^_/.test(key) && this[key])
					scope[key] = this[key];
		},

		setup: function(element) {
			paper = this;
			this.project = new Project(element);
			return this;
		},

		activate: function() {
			paper = this;
		},

		clear: function() {
			for (var i = this.projects.length - 1; i >= 0; i--)
				this.projects[i].remove();
			for (var i = this.tools.length - 1; i >= 0; i--)
				this.tools[i].remove();
			for (var i = this.palettes.length - 1; i >= 0; i--)
				this.palettes[i].remove();
		},

		remove: function() {
			this.clear();
			delete PaperScope._scopes[this._id];
		},

		statics: new function() {
			function handleAttribute(name) {
				name += 'Attribute';
				return function(el, attr) {
					return el[name](attr) || el[name]('data-paper-' + attr);
				};
			}

			return {
				_scopes: {},
				_id: 0,

				get: function(id) {
					return this._scopes[id] || null;
				},

				getAttribute: handleAttribute('get'),
				hasAttribute: handleAttribute('has')
			};
		}
	});

	var PaperScopeItem = Base.extend(Emitter, {

		initialize: function(activate) {
			this._scope = paper;
			this._index = this._scope[this._list].push(this) - 1;
			if (activate || !this._scope[this._reference])
				this.activate();
		},

		activate: function() {
			if (!this._scope)
				return false;
			var prev = this._scope[this._reference];
			if (prev && prev !== this)
				prev.emit('deactivate');
			this._scope[this._reference] = this;
			this.emit('activate', prev);
			return true;
		},

		isActive: function() {
			return this._scope[this._reference] === this;
		},

		remove: function() {
			if (this._index == null)
				return false;
			Base.splice(this._scope[this._list], null, this._index, 1);
			if (this._scope[this._reference] == this)
				this._scope[this._reference] = null;
			this._scope = null;
			return true;
		}
	});

	var Formatter = Base.extend({
		initialize: function(precision) {
			this.precision = precision || 5;
			this.multiplier = Math.pow(10, this.precision);
		},

		number: function(val) {
			return Math.round(val * this.multiplier) / this.multiplier;
		},

		pair: function(val1, val2, separator) {
			return this.number(val1) + (separator || ',') + this.number(val2);
		},

		point: function(val, separator) {
			return this.number(val.x) + (separator || ',') + this.number(val.y);
		},

		size: function(val, separator) {
			return this.number(val.width) + (separator || ',')
					+ this.number(val.height);
		},

		rectangle: function(val, separator) {
			return this.point(val, separator) + (separator || ',')
					+ this.size(val, separator);
		}
	});

	Formatter.instance = new Formatter();

	var Numerical = new function() {

		var abscissas = [
			[  0.5773502691896257645091488],
			[0,0.7745966692414833770358531],
			[  0.3399810435848562648026658,0.8611363115940525752239465],
			[0,0.5384693101056830910363144,0.9061798459386639927976269],
			[  0.2386191860831969086305017,0.6612093864662645136613996,0.9324695142031520278123016],
			[0,0.4058451513773971669066064,0.7415311855993944398638648,0.9491079123427585245261897],
			[  0.1834346424956498049394761,0.5255324099163289858177390,0.7966664774136267395915539,0.9602898564975362316835609],
			[0,0.3242534234038089290385380,0.6133714327005903973087020,0.8360311073266357942994298,0.9681602395076260898355762],
			[  0.1488743389816312108848260,0.4333953941292471907992659,0.6794095682990244062343274,0.8650633666889845107320967,0.9739065285171717200779640],
			[0,0.2695431559523449723315320,0.5190961292068118159257257,0.7301520055740493240934163,0.8870625997680952990751578,0.9782286581460569928039380],
			[  0.1252334085114689154724414,0.3678314989981801937526915,0.5873179542866174472967024,0.7699026741943046870368938,0.9041172563704748566784659,0.9815606342467192506905491],
			[0,0.2304583159551347940655281,0.4484927510364468528779129,0.6423493394403402206439846,0.8015780907333099127942065,0.9175983992229779652065478,0.9841830547185881494728294],
			[  0.1080549487073436620662447,0.3191123689278897604356718,0.5152486363581540919652907,0.6872929048116854701480198,0.8272013150697649931897947,0.9284348836635735173363911,0.9862838086968123388415973],
			[0,0.2011940939974345223006283,0.3941513470775633698972074,0.5709721726085388475372267,0.7244177313601700474161861,0.8482065834104272162006483,0.9372733924007059043077589,0.9879925180204854284895657],
			[  0.0950125098376374401853193,0.2816035507792589132304605,0.4580167776572273863424194,0.6178762444026437484466718,0.7554044083550030338951012,0.8656312023878317438804679,0.9445750230732325760779884,0.9894009349916499325961542]
		];

		var weights = [
			[1],
			[0.8888888888888888888888889,0.5555555555555555555555556],
			[0.6521451548625461426269361,0.3478548451374538573730639],
			[0.5688888888888888888888889,0.4786286704993664680412915,0.2369268850561890875142640],
			[0.4679139345726910473898703,0.3607615730481386075698335,0.1713244923791703450402961],
			[0.4179591836734693877551020,0.3818300505051189449503698,0.2797053914892766679014678,0.1294849661688696932706114],
			[0.3626837833783619829651504,0.3137066458778872873379622,0.2223810344533744705443560,0.1012285362903762591525314],
			[0.3302393550012597631645251,0.3123470770400028400686304,0.2606106964029354623187429,0.1806481606948574040584720,0.0812743883615744119718922],
			[0.2955242247147528701738930,0.2692667193099963550912269,0.2190863625159820439955349,0.1494513491505805931457763,0.0666713443086881375935688],
			[0.2729250867779006307144835,0.2628045445102466621806889,0.2331937645919904799185237,0.1862902109277342514260976,0.1255803694649046246346943,0.0556685671161736664827537],
			[0.2491470458134027850005624,0.2334925365383548087608499,0.2031674267230659217490645,0.1600783285433462263346525,0.1069393259953184309602547,0.0471753363865118271946160],
			[0.2325515532308739101945895,0.2262831802628972384120902,0.2078160475368885023125232,0.1781459807619457382800467,0.1388735102197872384636018,0.0921214998377284479144218,0.0404840047653158795200216],
			[0.2152638534631577901958764,0.2051984637212956039659241,0.1855383974779378137417166,0.1572031671581935345696019,0.1215185706879031846894148,0.0801580871597602098056333,0.0351194603317518630318329],
			[0.2025782419255612728806202,0.1984314853271115764561183,0.1861610000155622110268006,0.1662692058169939335532009,0.1395706779261543144478048,0.1071592204671719350118695,0.0703660474881081247092674,0.0307532419961172683546284],
			[0.1894506104550684962853967,0.1826034150449235888667637,0.1691565193950025381893121,0.1495959888165767320815017,0.1246289712555338720524763,0.0951585116824927848099251,0.0622535239386478928628438,0.0271524594117540948517806]
		];

		var abs = Math.abs,
			sqrt = Math.sqrt,
			pow = Math.pow,
			EPSILON = 1e-12,
			MACHINE_EPSILON = 1.12e-16;

		function clip(value, min, max) {
			return value < min ? min : value > max ? max : value;
		}

		return {
			TOLERANCE: 1e-6,
			EPSILON: EPSILON,
			MACHINE_EPSILON: MACHINE_EPSILON,
			CURVETIME_EPSILON: 4e-7,
			GEOMETRIC_EPSILON: 2e-7,
			WINDING_EPSILON: 2e-7,
			TRIGONOMETRIC_EPSILON: 1e-7,
			CLIPPING_EPSILON: 1e-7,
			KAPPA: 4 * (sqrt(2) - 1) / 3,

			isZero: function(val) {
				return val >= -EPSILON && val <= EPSILON;
			},

			integrate: function(f, a, b, n) {
				var x = abscissas[n - 2],
					w = weights[n - 2],
					A = (b - a) * 0.5,
					B = A + a,
					i = 0,
					m = (n + 1) >> 1,
					sum = n & 1 ? w[i++] * f(B) : 0;
				while (i < m) {
					var Ax = A * x[i];
					sum += w[i++] * (f(B + Ax) + f(B - Ax));
				}
				return A * sum;
			},

			findRoot: function(f, df, x, a, b, n, tolerance) {
				for (var i = 0; i < n; i++) {
					var fx = f(x),
						dx = fx / df(x),
						nx = x - dx;
					if (abs(dx) < tolerance)
						return nx;
					if (fx > 0) {
						b = x;
						x = nx <= a ? (a + b) * 0.5 : nx;
					} else {
						a = x;
						x = nx >= b ? (a + b) * 0.5 : nx;
					}
				}
				return x;
			},

			solveQuadratic: function(a, b, c, roots, min, max) {
				var count = 0,
					eMin = min - EPSILON,
					eMax = max + EPSILON,
					x1, x2 = Infinity,
					B = b,
					D;
				b /= -2;
				D = b * b - a * c;
				if (D !== 0 && abs(D) < MACHINE_EPSILON) {
					var gmC = pow(abs(a * b * c), 1 / 3);
					if (gmC < 1e-8) {
						var mult = pow(10,
								abs(Math.floor(Math.log(gmC) * Math.LOG10E)));
						if (!isFinite(mult))
							mult = 0;
						a *= mult;
						b *= mult;
						c *= mult;
						D = b * b - a * c;
					}
				}
				if (abs(a) < EPSILON) {
					if (abs(B) < EPSILON)
						return abs(c) < EPSILON ? -1 : 0;
					x1 = -c / B;
				} else if (D >= -MACHINE_EPSILON) {
					var Q = D < 0 ? 0 : sqrt(D),
						R = b + (b < 0 ? -Q : Q);
					if (R === 0) {
						x1 = c / a;
						x2 = -x1;
					} else {
						x1 = R / a;
						x2 = c / R;
					}
				}
				if (isFinite(x1) && (min == null || x1 > eMin && x1 < eMax))
					roots[count++] = min == null ? x1 : clip(x1, min, max);
				if (x2 !== x1
						&& isFinite(x2) && (min == null || x2 > eMin && x2 < eMax))
					roots[count++] = min == null ? x2 : clip(x2, min, max);
				return count;
			},

			solveCubic: function(a, b, c, d, roots, min, max) {
				var count = 0,
					x, b1, c2;
				if (abs(a) < EPSILON) {
					a = b;
					b1 = c;
					c2 = d;
					x = Infinity;
				} else if (abs(d) < EPSILON) {
					b1 = b;
					c2 = c;
					x = 0;
				} else {
					var ec = 1 + MACHINE_EPSILON,
						x0, q, qd, t, r, s, tmp;
					x = -(b / a) / 3;
					tmp = a * x,
					b1 = tmp + b,
					c2 = b1 * x + c,
					qd = (tmp + b1) * x + c2,
					q = c2 * x + d;
					t = q /a;
					r = pow(abs(t), 1/3);
					s = t < 0 ? -1 : 1;
					t = -qd / a;
					r = t > 0 ? 1.3247179572 * Math.max(r, sqrt(t)) : r;
					x0 = x - s * r;
					if (x0 !== x) {
						do {
							x = x0;
							tmp = a * x,
							b1 = tmp + b,
							c2 = b1 * x + c,
							qd = (tmp + b1) * x + c2,
							q = c2 * x + d;
							x0 = qd === 0 ? x : x - q / qd / ec;
							if (x0 === x) {
								x = x0;
								break;
							}
						} while (s * x0 > s * x);
						if (abs(a) * x * x > abs(d / x)) {
							c2 = -d / x;
							b1 = (c2 - c) / x;
						}
					}
				}
				var count = Numerical.solveQuadratic(a, b1, c2, roots, min, max);
				if (isFinite(x) && (count === 0 || x !== roots[count - 1])
						&& (min == null || x > min - EPSILON && x < max + EPSILON))
					roots[count++] = min == null ? x : clip(x, min, max);
				return count;
			}
		};
	};

	var UID = {
		_id: 1,
		_pools: {},

		get: function(ctor) {
			if (ctor) {
				var name = ctor._class,
					pool = this._pools[name];
				if (!pool)
					pool = this._pools[name] = { _id: 1 };
				return pool._id++;
			} else {
				return this._id++;
			}
		}
	};

	var Point = Base.extend({
		_class: 'Point',
		_readIndex: true,

		initialize: function Point(arg0, arg1) {
			var type = typeof arg0;
			if (type === 'number') {
				var hasY = typeof arg1 === 'number';
				this.x = arg0;
				this.y = hasY ? arg1 : arg0;
				if (this.__read)
					this.__read = hasY ? 2 : 1;
			} else if (type === 'undefined' || arg0 === null) {
				this.x = this.y = 0;
				if (this.__read)
					this.__read = arg0 === null ? 1 : 0;
			} else {
				if (Array.isArray(arg0)) {
					this.x = arg0[0];
					this.y = arg0.length > 1 ? arg0[1] : arg0[0];
				} else if (arg0.x != null) {
					this.x = arg0.x;
					this.y = arg0.y;
				} else if (arg0.width != null) {
					this.x = arg0.width;
					this.y = arg0.height;
				} else if (arg0.angle != null) {
					this.x = arg0.length;
					this.y = 0;
					this.setAngle(arg0.angle);
				} else {
					this.x = this.y = 0;
					if (this.__read)
						this.__read = 0;
				}
				if (this.__read)
					this.__read = 1;
			}
		},

		set: function(x, y) {
			this.x = x;
			this.y = y;
			return this;
		},

		equals: function(point) {
			return this === point || point
					&& (this.x === point.x && this.y === point.y
						|| Array.isArray(point)
							&& this.x === point[0] && this.y === point[1])
					|| false;
		},

		clone: function() {
			return new Point(this.x, this.y);
		},

		toString: function() {
			var f = Formatter.instance;
			return '{ x: ' + f.number(this.x) + ', y: ' + f.number(this.y) + ' }';
		},

		_serialize: function(options) {
			var f = options.formatter;
			return [f.number(this.x), f.number(this.y)];
		},

		getLength: function() {
			return Math.sqrt(this.x * this.x + this.y * this.y);
		},

		setLength: function(length) {
			if (this.isZero()) {
				var angle = this._angle || 0;
				this.set(
					Math.cos(angle) * length,
					Math.sin(angle) * length
				);
			} else {
				var scale = length / this.getLength();
				if (Numerical.isZero(scale))
					this.getAngle();
				this.set(
					this.x * scale,
					this.y * scale
				);
			}
		},
		getAngle: function() {
			return this.getAngleInRadians.apply(this, arguments) * 180 / Math.PI;
		},

		setAngle: function(angle) {
			this.setAngleInRadians.call(this, angle * Math.PI / 180);
		},

		getAngleInDegrees: '#getAngle',
		setAngleInDegrees: '#setAngle',

		getAngleInRadians: function() {
			if (!arguments.length) {
				return this.isZero()
						? this._angle || 0
						: this._angle = Math.atan2(this.y, this.x);
			} else {
				var point = Point.read(arguments),
					div = this.getLength() * point.getLength();
				if (Numerical.isZero(div)) {
					return NaN;
				} else {
					var a = this.dot(point) / div;
					return Math.acos(a < -1 ? -1 : a > 1 ? 1 : a);
				}
			}
		},

		setAngleInRadians: function(angle) {
			this._angle = angle;
			if (!this.isZero()) {
				var length = this.getLength();
				this.set(
					Math.cos(angle) * length,
					Math.sin(angle) * length
				);
			}
		},

		getQuadrant: function() {
			return this.x >= 0 ? this.y >= 0 ? 1 : 4 : this.y >= 0 ? 2 : 3;
		}
	}, {
		beans: false,

		getDirectedAngle: function() {
			var point = Point.read(arguments);
			return Math.atan2(this.cross(point), this.dot(point)) * 180 / Math.PI;
		},

		getDistance: function() {
			var point = Point.read(arguments),
				x = point.x - this.x,
				y = point.y - this.y,
				d = x * x + y * y,
				squared = Base.read(arguments);
			return squared ? d : Math.sqrt(d);
		},

		normalize: function(length) {
			if (length === undefined)
				length = 1;
			var current = this.getLength(),
				scale = current !== 0 ? length / current : 0,
				point = new Point(this.x * scale, this.y * scale);
			if (scale >= 0)
				point._angle = this._angle;
			return point;
		},

		rotate: function(angle, center) {
			if (angle === 0)
				return this.clone();
			angle = angle * Math.PI / 180;
			var point = center ? this.subtract(center) : this,
				sin = Math.sin(angle),
				cos = Math.cos(angle);
			point = new Point(
				point.x * cos - point.y * sin,
				point.x * sin + point.y * cos
			);
			return center ? point.add(center) : point;
		},

		transform: function(matrix) {
			return matrix ? matrix._transformPoint(this) : this;
		},

		add: function() {
			var point = Point.read(arguments);
			return new Point(this.x + point.x, this.y + point.y);
		},

		subtract: function() {
			var point = Point.read(arguments);
			return new Point(this.x - point.x, this.y - point.y);
		},

		multiply: function() {
			var point = Point.read(arguments);
			return new Point(this.x * point.x, this.y * point.y);
		},

		divide: function() {
			var point = Point.read(arguments);
			return new Point(this.x / point.x, this.y / point.y);
		},

		modulo: function() {
			var point = Point.read(arguments);
			return new Point(this.x % point.x, this.y % point.y);
		},

		negate: function() {
			return new Point(-this.x, -this.y);
		},

		isInside: function() {
			return Rectangle.read(arguments).contains(this);
		},

		isClose: function() {
			var point = Point.read(arguments),
				tolerance = Base.read(arguments);
			return this.getDistance(point) < tolerance;
		},

		isCollinear: function() {
			var point = Point.read(arguments);
			return Point.isCollinear(this.x, this.y, point.x, point.y);
		},

		isColinear: '#isCollinear',

		isOrthogonal: function() {
			var point = Point.read(arguments);
			return Point.isOrthogonal(this.x, this.y, point.x, point.y);
		},

		isZero: function() {
			return Numerical.isZero(this.x) && Numerical.isZero(this.y);
		},

		isNaN: function() {
			return isNaN(this.x) || isNaN(this.y);
		},

		dot: function() {
			var point = Point.read(arguments);
			return this.x * point.x + this.y * point.y;
		},

		cross: function() {
			var point = Point.read(arguments);
			return this.x * point.y - this.y * point.x;
		},

		project: function() {
			var point = Point.read(arguments),
				scale = point.isZero() ? 0 : this.dot(point) / point.dot(point);
			return new Point(
				point.x * scale,
				point.y * scale
			);
		},

		statics: {
			min: function() {
				var point1 = Point.read(arguments),
					point2 = Point.read(arguments);
				return new Point(
					Math.min(point1.x, point2.x),
					Math.min(point1.y, point2.y)
				);
			},

			max: function() {
				var point1 = Point.read(arguments),
					point2 = Point.read(arguments);
				return new Point(
					Math.max(point1.x, point2.x),
					Math.max(point1.y, point2.y)
				);
			},

			random: function() {
				return new Point(Math.random(), Math.random());
			},

			isCollinear: function(x1, y1, x2, y2) {
				return Math.abs(x1 * y2 - y1 * x2)
						<= Math.sqrt((x1 * x1 + y1 * y1) * (x2 * x2 + y2 * y2))
							* 1e-7;
			},

			isOrthogonal: function(x1, y1, x2, y2) {
				return Math.abs(x1 * x2 + y1 * y2)
						<= Math.sqrt((x1 * x1 + y1 * y1) * (x2 * x2 + y2 * y2))
							* 1e-7;
			}
		}
	}, Base.each(['round', 'ceil', 'floor', 'abs'], function(name) {
		var op = Math[name];
		this[name] = function() {
			return new Point(op(this.x), op(this.y));
		};
	}, {}));

	var LinkedPoint = Point.extend({
		initialize: function Point(x, y, owner, setter) {
			this._x = x;
			this._y = y;
			this._owner = owner;
			this._setter = setter;
		},

		set: function(x, y, _dontNotify) {
			this._x = x;
			this._y = y;
			if (!_dontNotify)
				this._owner[this._setter](this);
			return this;
		},

		getX: function() {
			return this._x;
		},

		setX: function(x) {
			this._x = x;
			this._owner[this._setter](this);
		},

		getY: function() {
			return this._y;
		},

		setY: function(y) {
			this._y = y;
			this._owner[this._setter](this);
		}
	});

	var Size = Base.extend({
		_class: 'Size',
		_readIndex: true,

		initialize: function Size(arg0, arg1) {
			var type = typeof arg0;
			if (type === 'number') {
				var hasHeight = typeof arg1 === 'number';
				this.width = arg0;
				this.height = hasHeight ? arg1 : arg0;
				if (this.__read)
					this.__read = hasHeight ? 2 : 1;
			} else if (type === 'undefined' || arg0 === null) {
				this.width = this.height = 0;
				if (this.__read)
					this.__read = arg0 === null ? 1 : 0;
			} else {
				if (Array.isArray(arg0)) {
					this.width = arg0[0];
					this.height = arg0.length > 1 ? arg0[1] : arg0[0];
				} else if (arg0.width != null) {
					this.width = arg0.width;
					this.height = arg0.height;
				} else if (arg0.x != null) {
					this.width = arg0.x;
					this.height = arg0.y;
				} else {
					this.width = this.height = 0;
					if (this.__read)
						this.__read = 0;
				}
				if (this.__read)
					this.__read = 1;
			}
		},

		set: function(width, height) {
			this.width = width;
			this.height = height;
			return this;
		},

		equals: function(size) {
			return size === this || size && (this.width === size.width
					&& this.height === size.height
					|| Array.isArray(size) && this.width === size[0]
						&& this.height === size[1]) || false;
		},

		clone: function() {
			return new Size(this.width, this.height);
		},

		toString: function() {
			var f = Formatter.instance;
			return '{ width: ' + f.number(this.width)
					+ ', height: ' + f.number(this.height) + ' }';
		},

		_serialize: function(options) {
			var f = options.formatter;
			return [f.number(this.width),
					f.number(this.height)];
		},

		add: function() {
			var size = Size.read(arguments);
			return new Size(this.width + size.width, this.height + size.height);
		},

		subtract: function() {
			var size = Size.read(arguments);
			return new Size(this.width - size.width, this.height - size.height);
		},

		multiply: function() {
			var size = Size.read(arguments);
			return new Size(this.width * size.width, this.height * size.height);
		},

		divide: function() {
			var size = Size.read(arguments);
			return new Size(this.width / size.width, this.height / size.height);
		},

		modulo: function() {
			var size = Size.read(arguments);
			return new Size(this.width % size.width, this.height % size.height);
		},

		negate: function() {
			return new Size(-this.width, -this.height);
		},

		isZero: function() {
			return Numerical.isZero(this.width) && Numerical.isZero(this.height);
		},

		isNaN: function() {
			return isNaN(this.width) || isNaN(this.height);
		},

		statics: {
			min: function(size1, size2) {
				return new Size(
					Math.min(size1.width, size2.width),
					Math.min(size1.height, size2.height));
			},

			max: function(size1, size2) {
				return new Size(
					Math.max(size1.width, size2.width),
					Math.max(size1.height, size2.height));
			},

			random: function() {
				return new Size(Math.random(), Math.random());
			}
		}
	}, Base.each(['round', 'ceil', 'floor', 'abs'], function(name) {
		var op = Math[name];
		this[name] = function() {
			return new Size(op(this.width), op(this.height));
		};
	}, {}));

	var LinkedSize = Size.extend({
		initialize: function Size(width, height, owner, setter) {
			this._width = width;
			this._height = height;
			this._owner = owner;
			this._setter = setter;
		},

		set: function(width, height, _dontNotify) {
			this._width = width;
			this._height = height;
			if (!_dontNotify)
				this._owner[this._setter](this);
			return this;
		},

		getWidth: function() {
			return this._width;
		},

		setWidth: function(width) {
			this._width = width;
			this._owner[this._setter](this);
		},

		getHeight: function() {
			return this._height;
		},

		setHeight: function(height) {
			this._height = height;
			this._owner[this._setter](this);
		}
	});

	var Rectangle = Base.extend({
		_class: 'Rectangle',
		_readIndex: true,
		beans: true,

		initialize: function Rectangle(arg0, arg1, arg2, arg3) {
			var type = typeof arg0,
				read = 0;
			if (type === 'number') {
				this.x = arg0;
				this.y = arg1;
				this.width = arg2;
				this.height = arg3;
				read = 4;
			} else if (type === 'undefined' || arg0 === null) {
				this.x = this.y = this.width = this.height = 0;
				read = arg0 === null ? 1 : 0;
			} else if (arguments.length === 1) {
				if (Array.isArray(arg0)) {
					this.x = arg0[0];
					this.y = arg0[1];
					this.width = arg0[2];
					this.height = arg0[3];
					read = 1;
				} else if (arg0.x !== undefined || arg0.width !== undefined) {
					this.x = arg0.x || 0;
					this.y = arg0.y || 0;
					this.width = arg0.width || 0;
					this.height = arg0.height || 0;
					read = 1;
				} else if (arg0.from === undefined && arg0.to === undefined) {
					this.x = this.y = this.width = this.height = 0;
					this._set(arg0);
					read = 1;
				}
			}
			if (!read) {
				var point = Point.readNamed(arguments, 'from'),
					next = Base.peek(arguments);
				this.x = point.x;
				this.y = point.y;
				if (next && next.x !== undefined || Base.hasNamed(arguments, 'to')) {
					var to = Point.readNamed(arguments, 'to');
					this.width = to.x - point.x;
					this.height = to.y - point.y;
					if (this.width < 0) {
						this.x = to.x;
						this.width = -this.width;
					}
					if (this.height < 0) {
						this.y = to.y;
						this.height = -this.height;
					}
				} else {
					var size = Size.read(arguments);
					this.width = size.width;
					this.height = size.height;
				}
				read = arguments.__index;
			}
			if (this.__read)
				this.__read = read;
		},

		set: function(x, y, width, height) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			return this;
		},

		clone: function() {
			return new Rectangle(this.x, this.y, this.width, this.height);
		},

		equals: function(rect) {
			var rt = Base.isPlainValue(rect)
					? Rectangle.read(arguments)
					: rect;
			return rt === this
					|| rt && this.x === rt.x && this.y === rt.y
						&& this.width === rt.width && this.height === rt.height
					|| false;
		},

		toString: function() {
			var f = Formatter.instance;
			return '{ x: ' + f.number(this.x)
					+ ', y: ' + f.number(this.y)
					+ ', width: ' + f.number(this.width)
					+ ', height: ' + f.number(this.height)
					+ ' }';
		},

		_serialize: function(options) {
			var f = options.formatter;
			return [f.number(this.x),
					f.number(this.y),
					f.number(this.width),
					f.number(this.height)];
		},

		getPoint: function(_dontLink) {
			var ctor = _dontLink ? Point : LinkedPoint;
			return new ctor(this.x, this.y, this, 'setPoint');
		},

		setPoint: function() {
			var point = Point.read(arguments);
			this.x = point.x;
			this.y = point.y;
		},

		getSize: function(_dontLink) {
			var ctor = _dontLink ? Size : LinkedSize;
			return new ctor(this.width, this.height, this, 'setSize');
		},

		setSize: function() {
			var size = Size.read(arguments);
			if (this._fixX)
				this.x += (this.width - size.width) * this._fixX;
			if (this._fixY)
				this.y += (this.height - size.height) * this._fixY;
			this.width = size.width;
			this.height = size.height;
			this._fixW = 1;
			this._fixH = 1;
		},

		getLeft: function() {
			return this.x;
		},

		setLeft: function(left) {
			if (!this._fixW)
				this.width -= left - this.x;
			this.x = left;
			this._fixX = 0;
		},

		getTop: function() {
			return this.y;
		},

		setTop: function(top) {
			if (!this._fixH)
				this.height -= top - this.y;
			this.y = top;
			this._fixY = 0;
		},

		getRight: function() {
			return this.x + this.width;
		},

		setRight: function(right) {
			if (this._fixX !== undefined && this._fixX !== 1)
				this._fixW = 0;
			if (this._fixW)
				this.x = right - this.width;
			else
				this.width = right - this.x;
			this._fixX = 1;
		},

		getBottom: function() {
			return this.y + this.height;
		},

		setBottom: function(bottom) {
			if (this._fixY !== undefined && this._fixY !== 1)
				this._fixH = 0;
			if (this._fixH)
				this.y = bottom - this.height;
			else
				this.height = bottom - this.y;
			this._fixY = 1;
		},

		getCenterX: function() {
			return this.x + this.width * 0.5;
		},

		setCenterX: function(x) {
			this.x = x - this.width * 0.5;
			this._fixX = 0.5;
		},

		getCenterY: function() {
			return this.y + this.height * 0.5;
		},

		setCenterY: function(y) {
			this.y = y - this.height * 0.5;
			this._fixY = 0.5;
		},

		getCenter: function(_dontLink) {
			var ctor = _dontLink ? Point : LinkedPoint;
			return new ctor(this.getCenterX(), this.getCenterY(), this, 'setCenter');
		},

		setCenter: function() {
			var point = Point.read(arguments);
			this.setCenterX(point.x);
			this.setCenterY(point.y);
			return this;
		},

		getArea: function() {
			return this.width * this.height;
		},

		isEmpty: function() {
			return this.width === 0 || this.height === 0;
		},

		contains: function(arg) {
			return arg && arg.width !== undefined
					|| (Array.isArray(arg) ? arg : arguments).length == 4
					? this._containsRectangle(Rectangle.read(arguments))
					: this._containsPoint(Point.read(arguments));
		},

		_containsPoint: function(point) {
			var x = point.x,
				y = point.y;
			return x >= this.x && y >= this.y
					&& x <= this.x + this.width
					&& y <= this.y + this.height;
		},

		_containsRectangle: function(rect) {
			var x = rect.x,
				y = rect.y;
			return x >= this.x && y >= this.y
					&& x + rect.width <= this.x + this.width
					&& y + rect.height <= this.y + this.height;
		},

		intersects: function() {
			var rect = Rectangle.read(arguments);
			return rect.x + rect.width > this.x
					&& rect.y + rect.height > this.y
					&& rect.x < this.x + this.width
					&& rect.y < this.y + this.height;
		},

		touches: function() {
			var rect = Rectangle.read(arguments);
			return rect.x + rect.width >= this.x
					&& rect.y + rect.height >= this.y
					&& rect.x <= this.x + this.width
					&& rect.y <= this.y + this.height;
		},

		intersect: function() {
			var rect = Rectangle.read(arguments),
				x1 = Math.max(this.x, rect.x),
				y1 = Math.max(this.y, rect.y),
				x2 = Math.min(this.x + this.width, rect.x + rect.width),
				y2 = Math.min(this.y + this.height, rect.y + rect.height);
			return new Rectangle(x1, y1, x2 - x1, y2 - y1);
		},

		unite: function() {
			var rect = Rectangle.read(arguments),
				x1 = Math.min(this.x, rect.x),
				y1 = Math.min(this.y, rect.y),
				x2 = Math.max(this.x + this.width, rect.x + rect.width),
				y2 = Math.max(this.y + this.height, rect.y + rect.height);
			return new Rectangle(x1, y1, x2 - x1, y2 - y1);
		},

		include: function() {
			var point = Point.read(arguments);
			var x1 = Math.min(this.x, point.x),
				y1 = Math.min(this.y, point.y),
				x2 = Math.max(this.x + this.width, point.x),
				y2 = Math.max(this.y + this.height, point.y);
			return new Rectangle(x1, y1, x2 - x1, y2 - y1);
		},

		expand: function() {
			var amount = Size.read(arguments),
				hor = amount.width,
				ver = amount.height;
			return new Rectangle(this.x - hor / 2, this.y - ver / 2,
					this.width + hor, this.height + ver);
		},

		scale: function(hor, ver) {
			return this.expand(this.width * hor - this.width,
					this.height * (ver === undefined ? hor : ver) - this.height);
		}
	}, Base.each([
			['Top', 'Left'], ['Top', 'Right'],
			['Bottom', 'Left'], ['Bottom', 'Right'],
			['Left', 'Center'], ['Top', 'Center'],
			['Right', 'Center'], ['Bottom', 'Center']
		],
		function(parts, index) {
			var part = parts.join('');
			var xFirst = /^[RL]/.test(part);
			if (index >= 4)
				parts[1] += xFirst ? 'Y' : 'X';
			var x = parts[xFirst ? 0 : 1],
				y = parts[xFirst ? 1 : 0],
				getX = 'get' + x,
				getY = 'get' + y,
				setX = 'set' + x,
				setY = 'set' + y,
				get = 'get' + part,
				set = 'set' + part;
			this[get] = function(_dontLink) {
				var ctor = _dontLink ? Point : LinkedPoint;
				return new ctor(this[getX](), this[getY](), this, set);
			};
			this[set] = function() {
				var point = Point.read(arguments);
				this[setX](point.x);
				this[setY](point.y);
			};
		}, {
			beans: true
		}
	));

	var LinkedRectangle = Rectangle.extend({
		initialize: function Rectangle(x, y, width, height, owner, setter) {
			this.set(x, y, width, height, true);
			this._owner = owner;
			this._setter = setter;
		},

		set: function(x, y, width, height, _dontNotify) {
			this._x = x;
			this._y = y;
			this._width = width;
			this._height = height;
			if (!_dontNotify)
				this._owner[this._setter](this);
			return this;
		}
	},
	new function() {
		var proto = Rectangle.prototype;

		return Base.each(['x', 'y', 'width', 'height'], function(key) {
			var part = Base.capitalize(key);
			var internal = '_' + key;
			this['get' + part] = function() {
				return this[internal];
			};

			this['set' + part] = function(value) {
				this[internal] = value;
				if (!this._dontNotify)
					this._owner[this._setter](this);
			};
		}, Base.each(['Point', 'Size', 'Center',
				'Left', 'Top', 'Right', 'Bottom', 'CenterX', 'CenterY',
				'TopLeft', 'TopRight', 'BottomLeft', 'BottomRight',
				'LeftCenter', 'TopCenter', 'RightCenter', 'BottomCenter'],
			function(key) {
				var name = 'set' + key;
				this[name] = function() {
					this._dontNotify = true;
					proto[name].apply(this, arguments);
					this._dontNotify = false;
					this._owner[this._setter](this);
				};
			}, {
				isSelected: function() {
					return this._owner._boundsSelected;
				},

				setSelected: function(selected) {
					var owner = this._owner;
					if (owner.setSelected) {
						owner._boundsSelected = selected;
						owner.setSelected(selected || owner._selectedSegmentState > 0);
					}
				}
			})
		);
	});

	var Matrix = Base.extend({
		_class: 'Matrix',

		initialize: function Matrix(arg) {
			var count = arguments.length,
				ok = true;
			if (count === 6) {
				this.set.apply(this, arguments);
			} else if (count === 1) {
				if (arg instanceof Matrix) {
					this.set(arg._a, arg._c, arg._b, arg._d, arg._tx, arg._ty);
				} else if (Array.isArray(arg)) {
					this.set.apply(this, arg);
				} else {
					ok = false;
				}
			} else if (count === 0) {
				this.reset();
			} else {
				ok = false;
			}
			if (!ok)
				throw new Error('Unsupported matrix parameters');
		},

		set: function(a, c, b, d, tx, ty, _dontNotify) {
			this._a = a;
			this._c = c;
			this._b = b;
			this._d = d;
			this._tx = tx;
			this._ty = ty;
			if (!_dontNotify)
				this._changed();
			return this;
		},

		_serialize: function(options) {
			return Base.serialize(this.getValues(), options);
		},

		_changed: function() {
			var owner = this._owner;
			if (owner) {
				if (owner._applyMatrix) {
					owner.transform(null, true);
				} else {
					owner._changed(9);
				}
			}
		},

		clone: function() {
			return new Matrix(this._a, this._c, this._b, this._d,
					this._tx, this._ty);
		},

		equals: function(mx) {
			return mx === this || mx && this._a === mx._a && this._b === mx._b
					&& this._c === mx._c && this._d === mx._d
					&& this._tx === mx._tx && this._ty === mx._ty
					|| false;
		},

		toString: function() {
			var f = Formatter.instance;
			return '[[' + [f.number(this._a), f.number(this._b),
						f.number(this._tx)].join(', ') + '], ['
					+ [f.number(this._c), f.number(this._d),
						f.number(this._ty)].join(', ') + ']]';
		},

		reset: function(_dontNotify) {
			this._a = this._d = 1;
			this._c = this._b = this._tx = this._ty = 0;
			if (!_dontNotify)
				this._changed();
			return this;
		},

		apply: function(recursively, _setApplyMatrix) {
			var owner = this._owner;
			if (owner) {
				owner.transform(null, true, Base.pick(recursively, true),
						_setApplyMatrix);
				return this.isIdentity();
			}
			return false;
		},

		translate: function() {
			var point = Point.read(arguments),
				x = point.x,
				y = point.y;
			this._tx += x * this._a + y * this._b;
			this._ty += x * this._c + y * this._d;
			this._changed();
			return this;
		},

		scale: function() {
			var scale = Point.read(arguments),
				center = Point.read(arguments, 0, { readNull: true });
			if (center)
				this.translate(center);
			this._a *= scale.x;
			this._c *= scale.x;
			this._b *= scale.y;
			this._d *= scale.y;
			if (center)
				this.translate(center.negate());
			this._changed();
			return this;
		},

		rotate: function(angle ) {
			angle *= Math.PI / 180;
			var center = Point.read(arguments, 1),
				x = center.x,
				y = center.y,
				cos = Math.cos(angle),
				sin = Math.sin(angle),
				tx = x - x * cos + y * sin,
				ty = y - x * sin - y * cos,
				a = this._a,
				b = this._b,
				c = this._c,
				d = this._d;
			this._a = cos * a + sin * b;
			this._b = -sin * a + cos * b;
			this._c = cos * c + sin * d;
			this._d = -sin * c + cos * d;
			this._tx += tx * a + ty * b;
			this._ty += tx * c + ty * d;
			this._changed();
			return this;
		},

		shear: function() {
			var shear = Point.read(arguments),
				center = Point.read(arguments, 0, { readNull: true });
			if (center)
				this.translate(center);
			var a = this._a,
				c = this._c;
			this._a += shear.y * this._b;
			this._c += shear.y * this._d;
			this._b += shear.x * a;
			this._d += shear.x * c;
			if (center)
				this.translate(center.negate());
			this._changed();
			return this;
		},

		skew: function() {
			var skew = Point.read(arguments),
				center = Point.read(arguments, 0, { readNull: true }),
				toRadians = Math.PI / 180,
				shear = new Point(Math.tan(skew.x * toRadians),
					Math.tan(skew.y * toRadians));
			return this.shear(shear, center);
		},

		concatenate: function(mx) {
			var a1 = this._a,
				b1 = this._b,
				c1 = this._c,
				d1 = this._d,
				a2 = mx._a,
				b2 = mx._b,
				c2 = mx._c,
				d2 = mx._d,
				tx2 = mx._tx,
				ty2 = mx._ty;
			this._a = a2 * a1 + c2 * b1;
			this._b = b2 * a1 + d2 * b1;
			this._c = a2 * c1 + c2 * d1;
			this._d = b2 * c1 + d2 * d1;
			this._tx += tx2 * a1 + ty2 * b1;
			this._ty += tx2 * c1 + ty2 * d1;
			this._changed();
			return this;
		},

		preConcatenate: function(mx) {
			var a1 = this._a,
				b1 = this._b,
				c1 = this._c,
				d1 = this._d,
				tx1 = this._tx,
				ty1 = this._ty,
				a2 = mx._a,
				b2 = mx._b,
				c2 = mx._c,
				d2 = mx._d,
				tx2 = mx._tx,
				ty2 = mx._ty;
			this._a = a2 * a1 + b2 * c1;
			this._b = a2 * b1 + b2 * d1;
			this._c = c2 * a1 + d2 * c1;
			this._d = c2 * b1 + d2 * d1;
			this._tx = a2 * tx1 + b2 * ty1 + tx2;
			this._ty = c2 * tx1 + d2 * ty1 + ty2;
			this._changed();
			return this;
		},

		chain: function(mx) {
			var a1 = this._a,
				b1 = this._b,
				c1 = this._c,
				d1 = this._d,
				tx1 = this._tx,
				ty1 = this._ty,
				a2 = mx._a,
				b2 = mx._b,
				c2 = mx._c,
				d2 = mx._d,
				tx2 = mx._tx,
				ty2 = mx._ty;
			return new Matrix(
					a2 * a1 + c2 * b1,
					a2 * c1 + c2 * d1,
					b2 * a1 + d2 * b1,
					b2 * c1 + d2 * d1,
					tx1 + tx2 * a1 + ty2 * b1,
					ty1 + tx2 * c1 + ty2 * d1);
		},

		isIdentity: function() {
			return this._a === 1 && this._c === 0 && this._b === 0 && this._d === 1
					&& this._tx === 0 && this._ty === 0;
		},

		orNullIfIdentity: function() {
			return this.isIdentity() ? null : this;
		},

		isInvertible: function() {
			return !!this._getDeterminant();
		},

		isSingular: function() {
			return !this._getDeterminant();
		},

		transform: function( src, dst, count) {
			return arguments.length < 3
				? this._transformPoint(Point.read(arguments))
				: this._transformCoordinates(src, dst, count);
		},

		_transformPoint: function(point, dest, _dontNotify) {
			var x = point.x,
				y = point.y;
			if (!dest)
				dest = new Point();
			return dest.set(
				x * this._a + y * this._b + this._tx,
				x * this._c + y * this._d + this._ty,
				_dontNotify
			);
		},

		_transformCoordinates: function(src, dst, count) {
			var i = 0,
				j = 0,
				max = 2 * count;
			while (i < max) {
				var x = src[i++],
					y = src[i++];
				dst[j++] = x * this._a + y * this._b + this._tx;
				dst[j++] = x * this._c + y * this._d + this._ty;
			}
			return dst;
		},

		_transformCorners: function(rect) {
			var x1 = rect.x,
				y1 = rect.y,
				x2 = x1 + rect.width,
				y2 = y1 + rect.height,
				coords = [ x1, y1, x2, y1, x2, y2, x1, y2 ];
			return this._transformCoordinates(coords, coords, 4);
		},

		_transformBounds: function(bounds, dest, _dontNotify) {
			var coords = this._transformCorners(bounds),
				min = coords.slice(0, 2),
				max = min.slice();
			for (var i = 2; i < 8; i++) {
				var val = coords[i],
					j = i & 1;
				if (val < min[j])
					min[j] = val;
				else if (val > max[j])
					max[j] = val;
			}
			if (!dest)
				dest = new Rectangle();
			return dest.set(min[0], min[1], max[0] - min[0], max[1] - min[1],
					_dontNotify);
		},

		inverseTransform: function() {
			return this._inverseTransform(Point.read(arguments));
		},

		_getDeterminant: function() {
			var det = this._a * this._d - this._b * this._c;
			return isFinite(det) && !Numerical.isZero(det)
					&& isFinite(this._tx) && isFinite(this._ty)
					? det : null;
		},

		_inverseTransform: function(point, dest, _dontNotify) {
			var det = this._getDeterminant();
			if (!det)
				return null;
			var x = point.x - this._tx,
				y = point.y - this._ty;
			if (!dest)
				dest = new Point();
			return dest.set(
				(x * this._d - y * this._b) / det,
				(y * this._a - x * this._c) / det,
				_dontNotify
			);
		},

		decompose: function() {
			var a = this._a, b = this._b, c = this._c, d = this._d;
			if (Numerical.isZero(a * d - b * c))
				return null;

			var scaleX = Math.sqrt(a * a + b * b);
			a /= scaleX;
			b /= scaleX;

			var shear = a * c + b * d;
			c -= a * shear;
			d -= b * shear;

			var scaleY = Math.sqrt(c * c + d * d);
			c /= scaleY;
			d /= scaleY;
			shear /= scaleY;

			if (a * d < b * c) {
				a = -a;
				b = -b;
				shear = -shear;
				scaleX = -scaleX;
			}

			return {
				scaling: new Point(scaleX, scaleY),
				rotation: -Math.atan2(b, a) * 180 / Math.PI,
				shearing: shear
			};
		},

		getValues: function() {
			return [ this._a, this._c, this._b, this._d, this._tx, this._ty ];
		},

		getTranslation: function() {
			return new Point(this._tx, this._ty);
		},

		getScaling: function() {
			return (this.decompose() || {}).scaling;
		},

		getRotation: function() {
			return (this.decompose() || {}).rotation;
		},

		inverted: function() {
			var det = this._getDeterminant();
			return det && new Matrix(
					this._d / det,
					-this._c / det,
					-this._b / det,
					this._a / det,
					(this._b * this._ty - this._d * this._tx) / det,
					(this._c * this._tx - this._a * this._ty) / det);
		},

		shiftless: function() {
			return new Matrix(this._a, this._c, this._b, this._d, 0, 0);
		},

		applyToContext: function(ctx) {
			ctx.transform(this._a, this._c, this._b, this._d, this._tx, this._ty);
		}
	}, Base.each(['a', 'c', 'b', 'd', 'tx', 'ty'], function(name) {
		var part = Base.capitalize(name),
			prop = '_' + name;
		this['get' + part] = function() {
			return this[prop];
		};
		this['set' + part] = function(value) {
			this[prop] = value;
			this._changed();
		};
	}, {}));

	var Line = Base.extend({
		_class: 'Line',

		initialize: function Line(arg0, arg1, arg2, arg3, arg4) {
			var asVector = false;
			if (arguments.length >= 4) {
				this._px = arg0;
				this._py = arg1;
				this._vx = arg2;
				this._vy = arg3;
				asVector = arg4;
			} else {
				this._px = arg0.x;
				this._py = arg0.y;
				this._vx = arg1.x;
				this._vy = arg1.y;
				asVector = arg2;
			}
			if (!asVector) {
				this._vx -= this._px;
				this._vy -= this._py;
			}
		},

		getPoint: function() {
			return new Point(this._px, this._py);
		},

		getVector: function() {
			return new Point(this._vx, this._vy);
		},

		getLength: function() {
			return this.getVector().getLength();
		},

		intersect: function(line, isInfinite) {
			return Line.intersect(
					this._px, this._py, this._vx, this._vy,
					line._px, line._py, line._vx, line._vy,
					true, isInfinite);
		},

		getSide: function(point, isInfinite) {
			return Line.getSide(
					this._px, this._py, this._vx, this._vy,
					point.x, point.y, true, isInfinite);
		},

		getDistance: function(point) {
			return Math.abs(Line.getSignedDistance(
					this._px, this._py, this._vx, this._vy,
					point.x, point.y, true));
		},

		isCollinear: function(line) {
			return Point.isCollinear(this._vx, this._vy, line._vx, line._vy);
		},

		isOrthogonal: function(line) {
			return Point.isOrthogonal(this._vx, this._vy, line._vx, line._vy);
		},

		statics: {
			intersect: function(p1x, p1y, v1x, v1y, p2x, p2y, v2x, v2y, asVector,
					isInfinite) {
				if (!asVector) {
					v1x -= p1x;
					v1y -= p1y;
					v2x -= p2x;
					v2y -= p2y;
				}
				var cross = v1x * v2y - v1y * v2x;
				if (!Numerical.isZero(cross)) {
					var dx = p1x - p2x,
						dy = p1y - p2y,
						u1 = (v2x * dy - v2y * dx) / cross,
						u2 = (v1x * dy - v1y * dx) / cross,
						epsilon = 1e-12,
						uMin = -epsilon,
						uMax = 1 + epsilon;
					if (isInfinite
							|| uMin < u1 && u1 < uMax && uMin < u2 && u2 < uMax) {
						if (!isInfinite) {
							u1 = u1 <= 0 ? 0 : u1 >= 1 ? 1 : u1;
						}
						return new Point(
								p1x + u1 * v1x,
								p1y + u1 * v1y);
					}
				}
			},

			getSide: function(px, py, vx, vy, x, y, asVector, isInfinite) {
				if (!asVector) {
					vx -= px;
					vy -= py;
				}
				var v2x = x - px,
					v2y = y - py,
					ccw = v2x * vy - v2y * vx;
				if (ccw === 0 && !isInfinite) {
					ccw = (v2x * vx + v2x * vx) / (vx * vx + vy * vy);
					if (ccw >= 0 && ccw <= 1)
						ccw = 0;
				}
				return ccw < 0 ? -1 : ccw > 0 ? 1 : 0;
			},

			getSignedDistance: function(px, py, vx, vy, x, y, asVector) {
				if (!asVector) {
					vx -= px;
					vy -= py;
				}
				return vx === 0 ? vy > 0 ? x - px : px - x
					 : vy === 0 ? vx < 0 ? y - py : py - y
					 : ((x-px) * vy - (y-py) * vx) / Math.sqrt(vx * vx + vy * vy);
			}
		}
	});

	var Project = PaperScopeItem.extend({
		_class: 'Project',
		_list: 'projects',
		_reference: 'project',

		initialize: function Project(element) {
			PaperScopeItem.call(this, true);
			this.layers = [];
			this._activeLayer = null;
			this.symbols = [];
			this._currentStyle = new Style(null, null, this);
			this._view = View.create(this,
					element || CanvasProvider.getCanvas(1, 1));
			this._selectedItems = {};
			this._selectedItemCount = 0;
			this._updateVersion = 0;
		},

		_serialize: function(options, dictionary) {
			return Base.serialize(this.layers, options, true, dictionary);
		},

		clear: function() {
			for (var i = this.layers.length - 1; i >= 0; i--)
				this.layers[i].remove();
			this.symbols = [];
		},

		isEmpty: function() {
			return this.layers.length === 0;
		},

		remove: function remove() {
			if (!remove.base.call(this))
				return false;
			if (this._view)
				this._view.remove();
			return true;
		},

		getView: function() {
			return this._view;
		},

		getCurrentStyle: function() {
			return this._currentStyle;
		},

		setCurrentStyle: function(style) {
			this._currentStyle.initialize(style);
		},

		getIndex: function() {
			return this._index;
		},

		getOptions: function() {
			return this._scope.settings;
		},

		getActiveLayer: function() {
			return this._activeLayer || new Layer({ project: this });
		},

		getSelectedItems: function() {
			var items = [];
			for (var id in this._selectedItems) {
				var item = this._selectedItems[id];
				if (item.isInserted())
					items.push(item);
			}
			return items;
		},

		insertChild: function(index, item, _preserve) {
			if (item instanceof Layer) {
				item._remove(false, true);
				Base.splice(this.layers, [item], index, 0);
				item._setProject(this, true);
				if (this._changes)
					item._changed(5);
				if (!this._activeLayer)
					this._activeLayer = item;
			} else if (item instanceof Item) {
				(this._activeLayer
					|| this.insertChild(index, new Layer(Item.NO_INSERT)))
						.insertChild(index, item, _preserve);
			} else {
				item = null;
			}
			return item;
		},

		addChild: function(item, _preserve) {
			return this.insertChild(undefined, item, _preserve);
		},

		_updateSelection: function(item) {
			var id = item._id,
				selectedItems = this._selectedItems;
			if (item._selected) {
				if (selectedItems[id] !== item) {
					this._selectedItemCount++;
					selectedItems[id] = item;
				}
			} else if (selectedItems[id] === item) {
				this._selectedItemCount--;
				delete selectedItems[id];
			}
		},

		selectAll: function() {
			var layers = this.layers;
			for (var i = 0, l = layers.length; i < l; i++)
				layers[i].setFullySelected(true);
		},

		deselectAll: function() {
			var selectedItems = this._selectedItems;
			for (var i in selectedItems)
				selectedItems[i].setFullySelected(false);
		},

		hitTest: function() {
			var point = Point.read(arguments),
				options = HitResult.getOptions(Base.read(arguments));
			for (var i = this.layers.length - 1; i >= 0; i--) {
				var res = this.layers[i]._hitTest(point, options);
				if (res) return res;
			}
			return null;
		},

		getItems: function(match) {
			return Item._getItems(this.layers, match);
		},

		getItem: function(match) {
			return Item._getItems(this.layers, match, null, null, true)[0] || null;
		},

		importJSON: function(json) {
			this.activate();
			var layer = this._activeLayer;
			return Base.importJSON(json, layer && layer.isEmpty() && layer);
		},

		draw: function(ctx, matrix, pixelRatio) {
			this._updateVersion++;
			ctx.save();
			matrix.applyToContext(ctx);
			var param = new Base({
				offset: new Point(0, 0),
				pixelRatio: pixelRatio,
				viewMatrix: matrix.isIdentity() ? null : matrix,
				matrices: [new Matrix()],
				updateMatrix: true
			});
			for (var i = 0, layers = this.layers, l = layers.length; i < l; i++)
				layers[i].draw(ctx, param);
			ctx.restore();

			if (this._selectedItemCount > 0) {
				ctx.save();
				ctx.strokeWidth = 1;
				var items = this._selectedItems,
					size = this._scope.settings.handleSize,
					version = this._updateVersion;
				for (var id in items)
					items[id]._drawSelection(ctx, matrix, size, items, version);
				ctx.restore();
			}
		}
	});

	var Symbol = Base.extend({
		_class: 'Symbol',

		initialize: function Symbol(item, dontCenter) {
			this._id = UID.get();
			this.project = paper.project;
			this.project.symbols.push(this);
			if (item)
				this.setDefinition(item, dontCenter);
		},

		_serialize: function(options, dictionary) {
			return dictionary.add(this, function() {
				return Base.serialize([this._class, this._definition],
						options, false, dictionary);
			});
		},

		_changed: function(flags) {
			if (flags & 8) {
				Item._clearBoundsCache(this);
			}
			if (flags & 1) {
				this.project._needsUpdate = true;
			}
		},

		getDefinition: function() {
			return this._definition;
		},

		setDefinition: function(item, _dontCenter) {
			if (item._parentSymbol)
				item = item.clone();
			if (this._definition)
				this._definition._parentSymbol = null;
			this._definition = item;
			item.remove();
			item.setSelected(false);
			if (!_dontCenter)
				item.setPosition(new Point());
			item._parentSymbol = this;
			this._changed(9);
		},

		place: function(position) {
			return new PlacedSymbol(this, position);
		},

		clone: function() {
			return new Symbol(this._definition.clone(false));
		},

		equals: function(symbol) {
			return symbol === this
					|| symbol && this.definition.equals(symbol.definition)
					|| false;
		}
	});

	var Item = Base.extend(Emitter, {
		statics: {
			extend: function extend(src) {
				if (src._serializeFields)
					src._serializeFields = new Base(
							this.prototype._serializeFields, src._serializeFields);
				return extend.base.apply(this, arguments);
			},

			NO_INSERT: { insert: false }
		},

		_class: 'Item',
		_applyMatrix: true,
		_canApplyMatrix: true,
		_boundsSelected: false,
		_selectChildren: false,
		_serializeFields: {
			name: null,
			applyMatrix: null,
			matrix: new Matrix(),
			pivot: null,
			locked: false,
			visible: true,
			blendMode: 'normal',
			opacity: 1,
			guide: false,
			selected: false,
			clipMask: false,
			data: {}
		},

		initialize: function Item() {
		},

		_initialize: function(props, point) {
			var hasProps = props && Base.isPlainObject(props),
				internal = hasProps && props.internal === true,
				matrix = this._matrix = new Matrix(),
				project = hasProps && props.project || paper.project;
			if (!internal)
				this._id = UID.get();
			this._applyMatrix = this._canApplyMatrix && paper.settings.applyMatrix;
			if (point)
				matrix.translate(point);
			matrix._owner = this;
			this._style = new Style(project._currentStyle, this, project);
			if (!this._project) {
				if (internal || hasProps && props.insert === false) {
					this._setProject(project);
				} else if (hasProps && props.parent) {
					this.setParent(props.parent);
				} else {
					(project._activeLayer || new Layer()).addChild(this);
				}
			}
			if (hasProps && props !== Item.NO_INSERT)
				this._set(props, { insert: true, project: true, parent: true },
						true);
			return hasProps;
		},

		_events: Base.each(['onMouseDown', 'onMouseUp', 'onMouseDrag', 'onClick',
				'onDoubleClick', 'onMouseMove', 'onMouseEnter', 'onMouseLeave'],
			function(name) {
				this[name] = {
					install: function(type) {
						this.getView()._installEvent(type);
					},

					uninstall: function(type) {
						this.getView()._uninstallEvent(type);
					}
				};
			}, {
				onFrame: {
					install: function() {
						this.getView()._animateItem(this, true);
					},

					uninstall: function() {
						this.getView()._animateItem(this, false);
					}
				},

				onLoad: {}
			}
		),

		_serialize: function(options, dictionary) {
			var props = {},
				that = this;

			function serialize(fields) {
				for (var key in fields) {
					var value = that[key];
					if (!Base.equals(value, key === 'leading'
							? fields.fontSize * 1.2 : fields[key])) {
						props[key] = Base.serialize(value, options,
								key !== 'data', dictionary);
					}
				}
			}

			serialize(this._serializeFields);
			if (!(this instanceof Group))
				serialize(this._style._defaults);
			return [ this._class, props ];
		},

		_changed: function(flags) {
			var symbol = this._parentSymbol,
				cacheParent = this._parent || symbol,
				project = this._project;
			if (flags & 8) {
				this._bounds = this._position = this._decomposed =
						this._globalMatrix = this._currentPath = undefined;
			}
			if (cacheParent
					&& (flags & 40)) {
				Item._clearBoundsCache(cacheParent);
			}
			if (flags & 2) {
				Item._clearBoundsCache(this);
			}
			if (project) {
				if (flags & 1) {
					project._needsUpdate = true;
				}
				if (project._changes) {
					var entry = project._changesById[this._id];
					if (entry) {
						entry.flags |= flags;
					} else {
						entry = { item: this, flags: flags };
						project._changesById[this._id] = entry;
						project._changes.push(entry);
					}
				}
			}
			if (symbol)
				symbol._changed(flags);
		},

		set: function(props) {
			if (props)
				this._set(props);
			return this;
		},

		getId: function() {
			return this._id;
		},

		getName: function() {
			return this._name;
		},

		setName: function(name, unique) {

			if (this._name)
				this._removeNamed();
			if (name === (+name) + '')
				throw new Error(
						'Names consisting only of numbers are not supported.');
			var parent = this._parent;
			if (name && parent) {
				var children = parent._children,
					namedChildren = parent._namedChildren,
					orig = name,
					i = 1;
				while (unique && children[name])
					name = orig + ' ' + (i++);
				(namedChildren[name] = namedChildren[name] || []).push(this);
				children[name] = this;
			}
			this._name = name || undefined;
			this._changed(128);
		},

		getStyle: function() {
			return this._style;
		},

		setStyle: function(style) {
			this.getStyle().set(style);
		}
	}, Base.each(['locked', 'visible', 'blendMode', 'opacity', 'guide'],
		function(name) {
			var part = Base.capitalize(name),
				name = '_' + name;
			this['get' + part] = function() {
				return this[name];
			};
			this['set' + part] = function(value) {
				if (value != this[name]) {
					this[name] = value;
					this._changed(name === '_locked'
							? 128 : 129);
				}
			};
		},
	{}), {
		beans: true,

		_locked: false,

		_visible: true,

		_blendMode: 'normal',

		_opacity: 1,

		_guide: false,

		isSelected: function() {
			if (this._selectChildren) {
				var children = this._children;
				for (var i = 0, l = children.length; i < l; i++)
					if (children[i].isSelected())
						return true;
			}
			return this._selected;
		},

		setSelected: function(selected, noChildren) {
			if (!noChildren && this._selectChildren) {
				var children = this._children;
				for (var i = 0, l = children.length; i < l; i++)
					children[i].setSelected(selected);
			}
			if ((selected = !!selected) ^ this._selected) {
				this._selected = selected;
				this._project._updateSelection(this);
				this._changed(129);
			}
		},

		_selected: false,

		isFullySelected: function() {
			var children = this._children;
			if (children && this._selected) {
				for (var i = 0, l = children.length; i < l; i++)
					if (!children[i].isFullySelected())
						return false;
				return true;
			}
			return this._selected;
		},

		setFullySelected: function(selected) {
			var children = this._children;
			if (children) {
				for (var i = 0, l = children.length; i < l; i++)
					children[i].setFullySelected(selected);
			}
			this.setSelected(selected, true);
		},

		isClipMask: function() {
			return this._clipMask;
		},

		setClipMask: function(clipMask) {
			if (this._clipMask != (clipMask = !!clipMask)) {
				this._clipMask = clipMask;
				if (clipMask) {
					this.setFillColor(null);
					this.setStrokeColor(null);
				}
				this._changed(129);
				if (this._parent)
					this._parent._changed(1024);
			}
		},

		_clipMask: false,

		getData: function() {
			if (!this._data)
				this._data = {};
			return this._data;
		},

		setData: function(data) {
			this._data = data;
		},

		getPosition: function(_dontLink) {
			var position = this._position,
				ctor = _dontLink ? Point : LinkedPoint;
			if (!position) {
				var pivot = this._pivot;
				position = this._position = pivot
						? this._matrix._transformPoint(pivot)
						: this.getBounds().getCenter(true);
			}
			return new ctor(position.x, position.y, this, 'setPosition');
		},

		setPosition: function() {
			this.translate(Point.read(arguments).subtract(this.getPosition(true)));
		},

		getPivot: function(_dontLink) {
			var pivot = this._pivot;
			if (pivot) {
				var ctor = _dontLink ? Point : LinkedPoint;
				pivot = new ctor(pivot.x, pivot.y, this, 'setPivot');
			}
			return pivot;
		},

		setPivot: function() {
			this._pivot = Point.read(arguments, 0, { clone: true, readNull: true });
			this._position = undefined;
		},

		_pivot: null,
	}, Base.each(['bounds', 'strokeBounds', 'handleBounds', 'roughBounds',
			'internalBounds', 'internalRoughBounds'],
		function(key) {
			var getter = 'get' + Base.capitalize(key),
				match = key.match(/^internal(.*)$/),
				internalGetter = match ? 'get' + match[1] : null;
			this[getter] = function(_matrix) {
				var boundsGetter = this._boundsGetter,
					name = !internalGetter && (typeof boundsGetter === 'string'
							? boundsGetter : boundsGetter && boundsGetter[getter])
							|| getter,
					bounds = this._getCachedBounds(name, _matrix, this,
							internalGetter);
				return key === 'bounds'
						? new LinkedRectangle(bounds.x, bounds.y, bounds.width,
								bounds.height, this, 'setBounds')
						: bounds;
			};
		},
	{
		beans: true,

		_getBounds: function(getter, matrix, cacheItem) {
			var children = this._children;
			if (!children || children.length == 0)
				return new Rectangle();
			Item._updateBoundsCache(this, cacheItem);
			var x1 = Infinity,
				x2 = -x1,
				y1 = x1,
				y2 = x2;
			for (var i = 0, l = children.length; i < l; i++) {
				var child = children[i];
				if (child._visible && !child.isEmpty()) {
					var rect = child._getCachedBounds(getter,
							matrix && matrix.chain(child._matrix), cacheItem);
					x1 = Math.min(rect.x, x1);
					y1 = Math.min(rect.y, y1);
					x2 = Math.max(rect.x + rect.width, x2);
					y2 = Math.max(rect.y + rect.height, y2);
				}
			}
			return isFinite(x1)
					? new Rectangle(x1, y1, x2 - x1, y2 - y1)
					: new Rectangle();
		},

		setBounds: function() {
			var rect = Rectangle.read(arguments),
				bounds = this.getBounds(),
				matrix = new Matrix(),
				center = rect.getCenter();
			matrix.translate(center);
			if (rect.width != bounds.width || rect.height != bounds.height) {
				matrix.scale(
						bounds.width != 0 ? rect.width / bounds.width : 1,
						bounds.height != 0 ? rect.height / bounds.height : 1);
			}
			center = bounds.getCenter();
			matrix.translate(-center.x, -center.y);
			this.transform(matrix);
		},

		_getCachedBounds: function(getter, matrix, cacheItem, internalGetter) {
			matrix = matrix && matrix.orNullIfIdentity();
			var _matrix = internalGetter ? null : this._matrix.orNullIfIdentity(),
				cache = (!matrix || matrix.equals(_matrix)) && getter;
			Item._updateBoundsCache(this._parent || this._parentSymbol, cacheItem);
			if (cache && this._bounds && this._bounds[cache])
				return this._bounds[cache].clone();
			var bounds = this._getBounds(internalGetter || getter,
					matrix || _matrix, cacheItem);
			if (cache) {
				if (!this._bounds)
					this._bounds = {};
				var cached = this._bounds[cache] = bounds.clone();
				cached._internal = !!internalGetter;
			}
			return bounds;
		},

		statics: {
			_updateBoundsCache: function(parent, item) {
				if (parent) {
					var id = item._id,
						ref = parent._boundsCache = parent._boundsCache || {
							ids: {},
							list: []
						};
					if (!ref.ids[id]) {
						ref.list.push(item);
						ref.ids[id] = item;
					}
				}
			},

			_clearBoundsCache: function(item) {
				var cache = item._boundsCache;
				if (cache) {
					item._bounds = item._position = item._boundsCache = undefined;
					for (var i = 0, list = cache.list, l = list.length; i < l; i++){
						var other = list[i];
						if (other !== item) {
							other._bounds = other._position = undefined;
							if (other._boundsCache)
								Item._clearBoundsCache(other);
						}
					}
				}
			}
		}

	}), {
		beans: true,

		_decompose: function() {
			return this._decomposed = this._matrix.decompose();
		},

		getRotation: function() {
			var decomposed = this._decomposed || this._decompose();
			return decomposed && decomposed.rotation;
		},

		setRotation: function(rotation) {
			var current = this.getRotation();
			if (current != null && rotation != null) {
				var decomposed = this._decomposed;
				this.rotate(rotation - current);
				decomposed.rotation = rotation;
				this._decomposed = decomposed;
			}
		},

		getScaling: function(_dontLink) {
			var decomposed = this._decomposed || this._decompose(),
				scaling = decomposed && decomposed.scaling,
				ctor = _dontLink ? Point : LinkedPoint;
			return scaling && new ctor(scaling.x, scaling.y, this, 'setScaling');
		},

		setScaling: function() {
			var current = this.getScaling();
			if (current) {
				var scaling = Point.read(arguments, 0, { clone: true }),
					decomposed = this._decomposed;
				this.scale(scaling.x / current.x, scaling.y / current.y);
				decomposed.scaling = scaling;
				this._decomposed = decomposed;
			}
		},

		getMatrix: function() {
			return this._matrix;
		},

		setMatrix: function() {
			var matrix = this._matrix;
			matrix.initialize.apply(matrix, arguments);
			if (this._applyMatrix) {
				this.transform(null, true);
			} else {
				this._changed(9);
			}
		},

		getGlobalMatrix: function(_dontClone) {
			var matrix = this._globalMatrix,
				updateVersion = this._project._updateVersion;
			if (matrix && matrix._updateVersion !== updateVersion)
				matrix = null;
			if (!matrix) {
				matrix = this._globalMatrix = this._matrix.clone();
				var parent = this._parent;
				if (parent)
					matrix.preConcatenate(parent.getGlobalMatrix(true));
				matrix._updateVersion = updateVersion;
			}
			return _dontClone ? matrix : matrix.clone();
		},

		getApplyMatrix: function() {
			return this._applyMatrix;
		},

		setApplyMatrix: function(apply) {
			if (this._applyMatrix = this._canApplyMatrix && !!apply)
				this.transform(null, true);
		},

		getTransformContent: '#getApplyMatrix',
		setTransformContent: '#setApplyMatrix',
	}, {
		getProject: function() {
			return this._project;
		},

		_setProject: function(project, installEvents) {
			if (this._project !== project) {
				if (this._project)
					this._installEvents(false);
				this._project = project;
				var children = this._children;
				for (var i = 0, l = children && children.length; i < l; i++)
					children[i]._setProject(project);
				installEvents = true;
			}
			if (installEvents)
				this._installEvents(true);
		},

		getView: function() {
			return this._project.getView();
		},

		_installEvents: function _installEvents(install) {
			_installEvents.base.call(this, install);
			var children = this._children;
			for (var i = 0, l = children && children.length; i < l; i++)
				children[i]._installEvents(install);
		},

		getLayer: function() {
			var parent = this;
			while (parent = parent._parent) {
				if (parent instanceof Layer)
					return parent;
			}
			return null;
		},

		getParent: function() {
			return this._parent;
		},

		setParent: function(item) {
			return item.addChild(this);
		},

		getChildren: function() {
			return this._children;
		},

		setChildren: function(items) {
			this.removeChildren();
			this.addChildren(items);
		},

		getFirstChild: function() {
			return this._children && this._children[0] || null;
		},

		getLastChild: function() {
			return this._children && this._children[this._children.length - 1]
					|| null;
		},

		getNextSibling: function() {
			return this._parent && this._parent._children[this._index + 1] || null;
		},

		getPreviousSibling: function() {
			return this._parent && this._parent._children[this._index - 1] || null;
		},

		getIndex: function() {
			return this._index;
		},

		equals: function(item) {
			return item === this || item && this._class === item._class
					&& this._style.equals(item._style)
					&& this._matrix.equals(item._matrix)
					&& this._locked === item._locked
					&& this._visible === item._visible
					&& this._blendMode === item._blendMode
					&& this._opacity === item._opacity
					&& this._clipMask === item._clipMask
					&& this._guide === item._guide
					&& this._equals(item)
					|| false;
		},

		_equals: function(item) {
			return Base.equals(this._children, item._children);
		},

		clone: function(insert) {
			return this._clone(new this.constructor(Item.NO_INSERT), insert);
		},

		_clone: function(copy, insert, includeMatrix) {
			var keys = ['_locked', '_visible', '_blendMode', '_opacity',
					'_clipMask', '_guide'],
				children = this._children;
			copy.setStyle(this._style);
			for (var i = 0, l = children && children.length; i < l; i++) {
				copy.addChild(children[i].clone(false), true);
			}
			for (var i = 0, l = keys.length; i < l; i++) {
				var key = keys[i];
				if (this.hasOwnProperty(key))
					copy[key] = this[key];
			}
			if (includeMatrix !== false)
				copy._matrix.initialize(this._matrix);
			copy.setApplyMatrix(this._applyMatrix);
			copy.setPivot(this._pivot);
			copy.setSelected(this._selected);
			copy._data = this._data ? Base.clone(this._data) : null;
			if (insert || insert === undefined)
				copy.insertAbove(this);
			if (this._name)
				copy.setName(this._name, true);
			return copy;
		},

		copyTo: function(itemOrProject) {
			return itemOrProject.addChild(this.clone(false));
		},

		rasterize: function(resolution) {
			var bounds = this.getStrokeBounds(),
				scale = (resolution || this.getView().getResolution()) / 72,
				topLeft = bounds.getTopLeft().floor(),
				bottomRight = bounds.getBottomRight().ceil(),
				size = new Size(bottomRight.subtract(topLeft)),
				canvas = CanvasProvider.getCanvas(size.multiply(scale)),
				ctx = canvas.getContext('2d'),
				matrix = new Matrix().scale(scale).translate(topLeft.negate());
			ctx.save();
			matrix.applyToContext(ctx);
			this.draw(ctx, new Base({ matrices: [matrix] }));
			ctx.restore();
			var raster = new Raster(Item.NO_INSERT);
			raster.setCanvas(canvas);
			raster.transform(new Matrix().translate(topLeft.add(size.divide(2)))
					.scale(1 / scale));
			raster.insertAbove(this);
			return raster;
		},

		contains: function() {
			return !!this._contains(
					this._matrix._inverseTransform(Point.read(arguments)));
		},

		_contains: function(point) {
			if (this._children) {
				for (var i = this._children.length - 1; i >= 0; i--) {
					if (this._children[i].contains(point))
						return true;
				}
				return false;
			}
			return point.isInside(this.getInternalBounds());
		},

		isInside: function() {
			return Rectangle.read(arguments).contains(this.getBounds());
		},

		_asPathItem: function() {
			return new Path.Rectangle({
				rectangle: this.getInternalBounds(),
				matrix: this._matrix,
				insert: false,
			});
		},

		intersects: function(item, _matrix) {
			if (!(item instanceof Item))
				return false;
			return this._asPathItem().getIntersections(item._asPathItem(), null,
					_matrix || item._matrix, true).length > 0;
		},

		hitTest: function() {
			return this._hitTest(
					Point.read(arguments),
					HitResult.getOptions(Base.read(arguments)));
		},

		_hitTest: function(point, options) {
			if (this._locked || !this._visible || this._guide && !options.guides
					|| this.isEmpty())
				return null;

			var matrix = this._matrix,
				parentTotalMatrix = options._totalMatrix,
				view = this.getView(),
				totalMatrix = options._totalMatrix = parentTotalMatrix
						? parentTotalMatrix.chain(matrix)
						: this.getGlobalMatrix().preConcatenate(view._matrix),
				tolerancePadding = options._tolerancePadding = new Size(
							Path._getPenPadding(1, totalMatrix.inverted())
						).multiply(
							Math.max(options.tolerance, 1e-6)
						);
			point = matrix._inverseTransform(point);

			if (!this._children && !this.getInternalRoughBounds()
					.expand(tolerancePadding.multiply(2))._containsPoint(point))
				return null;
			var checkSelf = !(options.guides && !this._guide
					|| options.selected && !this._selected
					|| options.type && options.type !== Base.hyphenate(this._class)
					|| options.class && !(this instanceof options.class)),
				that = this,
				res;

			function checkBounds(type, part) {
				var pt = bounds['get' + part]();
				if (point.subtract(pt).divide(tolerancePadding).length <= 1)
					return new HitResult(type, that,
							{ name: Base.hyphenate(part), point: pt });
			}

			if (checkSelf && (options.center || options.bounds) && this._parent) {
				var bounds = this.getInternalBounds();
				if (options.center)
					res = checkBounds('center', 'Center');
				if (!res && options.bounds) {
					var points = [
						'TopLeft', 'TopRight', 'BottomLeft', 'BottomRight',
						'LeftCenter', 'TopCenter', 'RightCenter', 'BottomCenter'
					];
					for (var i = 0; i < 8 && !res; i++)
						res = checkBounds('bounds', points[i]);
				}
			}

			var children = !res && this._children;
			if (children) {
				var opts = this._getChildHitTestOptions(options);
				for (var i = children.length - 1; i >= 0 && !res; i--)
					res = children[i]._hitTest(point, opts);
			}
			if (!res && checkSelf)
				res = this._hitTestSelf(point, options);
			if (res && res.point)
				res.point = matrix.transform(res.point);
			options._totalMatrix = parentTotalMatrix;
			return res;
		},

		_getChildHitTestOptions: function(options) {
			return options;
		},

		_hitTestSelf: function(point, options) {
			if (options.fill && this.hasFill() && this._contains(point))
				return new HitResult('fill', this);
		},

		matches: function(name, compare) {
			function matchObject(obj1, obj2) {
				for (var i in obj1) {
					if (obj1.hasOwnProperty(i)) {
						var val1 = obj1[i],
							val2 = obj2[i];
						if (Base.isPlainObject(val1) && Base.isPlainObject(val2)) {
							if (!matchObject(val1, val2))
								return false;
						} else if (!Base.equals(val1, val2)) {
							return false;
						}
					}
				}
				return true;
			}
			var type = typeof name;
			if (type === 'object') {
				for (var key in name) {
					if (name.hasOwnProperty(key) && !this.matches(key, name[key]))
						return false;
				}
			} else if (type === 'function') {
				return name(this);
			} else {
				var value = /^(empty|editable)$/.test(name)
						? this['is' + Base.capitalize(name)]()
						: name === 'type'
							? Base.hyphenate(this._class)
							: this[name];
				if (/^(constructor|class)$/.test(name)) {
					if (!(this instanceof compare))
						return false;
				} else if (compare instanceof RegExp) {
					if (!compare.test(value))
						return false;
				} else if (typeof compare === 'function') {
					if (!compare(value))
						return false;
				} else if (Base.isPlainObject(compare)) {
					if (!matchObject(compare, value))
						return false;
				} else if (!Base.equals(value, compare)) {
					return false;
				}
			}
			return true;
		},

		getItems: function(match) {
			return Item._getItems(this._children, match, this._matrix);
		},

		getItem: function(match) {
			return Item._getItems(this._children, match, this._matrix, null, true)
					[0] || null;
		},

		statics: {
			_getItems: function _getItems(children, match, matrix, param,
					firstOnly) {
				if (!param && typeof match === 'object') {
					var overlapping = match.overlapping,
						inside = match.inside,
						bounds = overlapping || inside,
						rect = bounds && Rectangle.read([bounds]);
					param = {
						items: [],
						inside: !!inside,
						overlapping: !!overlapping,
						rect: rect,
						path: overlapping && new Path.Rectangle({
							rectangle: rect,
							insert: false
						})
					};
					if (bounds)
						match = Base.set({}, match,
								{ inside: true, overlapping: true });
				}
				var items = param && param.items,
					rect = param && param.rect;
				matrix = rect && (matrix || new Matrix());
				for (var i = 0, l = children && children.length; i < l; i++) {
					var child = children[i],
						childMatrix = matrix && matrix.chain(child._matrix),
						add = true;
					if (rect) {
						var bounds = child.getBounds(childMatrix);
						if (!rect.intersects(bounds))
							continue;
						if (!(param.inside && rect.contains(bounds))
								&& !(param.overlapping && (bounds.contains(rect)
									|| param.path.intersects(child, childMatrix))))
							add = false;
					}
					if (add && child.matches(match)) {
						items.push(child);
						if (firstOnly)
							break;
					}
					_getItems(child._children, match,
							childMatrix, param,
							firstOnly);
					if (firstOnly && items.length > 0)
						break;
				}
				return items;
			}
		}
	}, {

		importJSON: function(json) {
			var res = Base.importJSON(json, this);
			return res !== this
					? this.addChild(res)
					: res;
		},

		addChild: function(item, _preserve) {
			return this.insertChild(undefined, item, _preserve);
		},

		insertChild: function(index, item, _preserve) {
			var res = item ? this.insertChildren(index, [item], _preserve) : null;
			return res && res[0];
		},

		addChildren: function(items, _preserve) {
			return this.insertChildren(this._children.length, items, _preserve);
		},

		insertChildren: function(index, items, _preserve, _proto) {
			var children = this._children;
			if (children && items && items.length > 0) {
				items = Array.prototype.slice.apply(items);
				for (var i = items.length - 1; i >= 0; i--) {
					var item = items[i];
					if (_proto && !(item instanceof _proto)) {
						items.splice(i, 1);
					} else {
						var shift = item._parent === this && item._index < index;
						if (item._remove(false, true) && shift)
							index--;
					}
				}
				Base.splice(children, items, index, 0);
				var project = this._project,
					notifySelf = project && project._changes;
				for (var i = 0, l = items.length; i < l; i++) {
					var item = items[i];
					item._parent = this;
					item._setProject(this._project, true);
					if (item._name)
						item.setName(item._name);
					if (notifySelf)
						this._changed(5);
				}
				this._changed(11);
			} else {
				items = null;
			}
			return items;
		},

		_insertSibling: function(index, item, _preserve) {
			return this._parent
					? this._parent.insertChild(index, item, _preserve)
					: null;
		},

		insertAbove: function(item, _preserve) {
			return item._insertSibling(item._index + 1, this, _preserve);
		},

		insertBelow: function(item, _preserve) {
			return item._insertSibling(item._index, this, _preserve);
		},

		sendToBack: function() {
			return (this._parent || this instanceof Layer && this._project)
					.insertChild(0, this);
		},

		bringToFront: function() {
			return (this._parent || this instanceof Layer && this._project)
					.addChild(this);
		},

		appendTop: '#addChild',

		appendBottom: function(item) {
			return this.insertChild(0, item);
		},

		moveAbove: '#insertAbove',

		moveBelow: '#insertBelow',

		reduce: function() {
			if (this._children && this._children.length === 1) {
				var child = this._children[0].reduce();
				child.insertAbove(this);
				child.setStyle(this._style);
				this.remove();
				return child;
			}
			return this;
		},

		_removeNamed: function() {
			var parent = this._parent;
			if (parent) {
				var children = parent._children,
					namedChildren = parent._namedChildren,
					name = this._name,
					namedArray = namedChildren[name],
					index = namedArray ? namedArray.indexOf(this) : -1;
				if (index !== -1) {
					if (children[name] == this)
						delete children[name];
					namedArray.splice(index, 1);
					if (namedArray.length) {
						children[name] = namedArray[namedArray.length - 1];
					} else {
						delete namedChildren[name];
					}
				}
			}
		},

		_remove: function(notifySelf, notifyParent) {
			var parent = this._parent;
			if (parent) {
				if (this._name)
					this._removeNamed();
				if (this._index != null)
					Base.splice(parent._children, null, this._index, 1);
				this._installEvents(false);
				if (notifySelf) {
					var project = this._project;
					if (project && project._changes)
						this._changed(5);
				}
				if (notifyParent)
					parent._changed(11);
				this._parent = null;
				return true;
			}
			return false;
		},

		remove: function() {
			return this._remove(true, true);
		},

		replaceWith: function(item) {
			var ok = item && item.insertBelow(this);
			if (ok)
				this.remove();
			return ok;
		},

		removeChildren: function(from, to) {
			if (!this._children)
				return null;
			from = from || 0;
			to = Base.pick(to, this._children.length);
			var removed = Base.splice(this._children, null, from, to - from);
			for (var i = removed.length - 1; i >= 0; i--) {
				removed[i]._remove(true, false);
			}
			if (removed.length > 0)
				this._changed(11);
			return removed;
		},

		clear: '#removeChildren',

		reverseChildren: function() {
			if (this._children) {
				this._children.reverse();
				for (var i = 0, l = this._children.length; i < l; i++)
					this._children[i]._index = i;
				this._changed(11);
			}
		},

		isEmpty: function() {
			return !this._children || this._children.length === 0;
		},

		isEditable: function() {
			var item = this;
			while (item) {
				if (!item._visible || item._locked)
					return false;
				item = item._parent;
			}
			return true;
		},

		hasFill: function() {
			return this.getStyle().hasFill();
		},

		hasStroke: function() {
			return this.getStyle().hasStroke();
		},

		hasShadow: function() {
			return this.getStyle().hasShadow();
		},

		_getOrder: function(item) {
			function getList(item) {
				var list = [];
				do {
					list.unshift(item);
				} while (item = item._parent);
				return list;
			}
			var list1 = getList(this),
				list2 = getList(item);
			for (var i = 0, l = Math.min(list1.length, list2.length); i < l; i++) {
				if (list1[i] != list2[i]) {
					return list1[i]._index < list2[i]._index ? 1 : -1;
				}
			}
			return 0;
		},

		hasChildren: function() {
			return this._children && this._children.length > 0;
		},

		isInserted: function() {
			return this._parent ? this._parent.isInserted() : false;
		},

		isAbove: function(item) {
			return this._getOrder(item) === -1;
		},

		isBelow: function(item) {
			return this._getOrder(item) === 1;
		},

		isParent: function(item) {
			return this._parent === item;
		},

		isChild: function(item) {
			return item && item._parent === this;
		},

		isDescendant: function(item) {
			var parent = this;
			while (parent = parent._parent) {
				if (parent == item)
					return true;
			}
			return false;
		},

		isAncestor: function(item) {
			return item ? item.isDescendant(this) : false;
		},

		isSibling: function(item) {
			return this._parent === item._parent;
		},

		isGroupedWith: function(item) {
			var parent = this._parent;
			while (parent) {
				if (parent._parent
					&& /^(Group|Layer|CompoundPath)$/.test(parent._class)
					&& item.isDescendant(parent))
						return true;
				parent = parent._parent;
			}
			return false;
		},

		translate: function() {
			var mx = new Matrix();
			return this.transform(mx.translate.apply(mx, arguments));
		},

		rotate: function(angle ) {
			return this.transform(new Matrix().rotate(angle,
					Point.read(arguments, 1, { readNull: true })
						|| this.getPosition(true)));
		}
	}, Base.each(['scale', 'shear', 'skew'], function(name) {
		this[name] = function() {
			var point = Point.read(arguments),
				center = Point.read(arguments, 0, { readNull: true });
			return this.transform(new Matrix()[name](point,
					center || this.getPosition(true)));
		};
	}, {

	}), {
		transform: function(matrix, _applyMatrix, _applyRecursively,
				_setApplyMatrix) {
			if (matrix && matrix.isIdentity())
				matrix = null;
			var _matrix = this._matrix,
				applyMatrix = (_applyMatrix || this._applyMatrix)
						&& ((!_matrix.isIdentity() || matrix)
							|| _applyMatrix && _applyRecursively && this._children);
			if (!matrix && !applyMatrix)
				return this;
			if (matrix)
				_matrix.preConcatenate(matrix);
			if (applyMatrix = applyMatrix && this._transformContent(_matrix,
						_applyRecursively, _setApplyMatrix)) {
				var pivot = this._pivot,
					style = this._style,
					fillColor = style.getFillColor(true),
					strokeColor = style.getStrokeColor(true);
				if (pivot)
					_matrix._transformPoint(pivot, pivot, true);
				if (fillColor)
					fillColor.transform(_matrix);
				if (strokeColor)
					strokeColor.transform(_matrix);
				_matrix.reset(true);
				if (_setApplyMatrix && this._canApplyMatrix)
					this._applyMatrix = true;
			}
			var bounds = this._bounds,
				position = this._position;
			this._changed(9);
			var decomp = bounds && matrix && matrix.decompose();
			if (decomp && !decomp.shearing && decomp.rotation % 90 === 0) {
				for (var key in bounds) {
					var rect = bounds[key];
					if (applyMatrix || !rect._internal)
						matrix._transformBounds(rect, rect);
				}
				var getter = this._boundsGetter,
					rect = bounds[getter && getter.getBounds || getter || 'getBounds'];
				if (rect)
					this._position = rect.getCenter(true);
				this._bounds = bounds;
			} else if (matrix && position) {
				this._position = matrix._transformPoint(position, position);
			}
			return this;
		},

		_transformContent: function(matrix, applyRecursively, setApplyMatrix) {
			var children = this._children;
			if (children) {
				for (var i = 0, l = children.length; i < l; i++)
					children[i].transform(matrix, true, applyRecursively,
							setApplyMatrix);
				return true;
			}
		},

		globalToLocal: function() {
			return this.getGlobalMatrix(true)._inverseTransform(
					Point.read(arguments));
		},

		localToGlobal: function() {
			return this.getGlobalMatrix(true)._transformPoint(
					Point.read(arguments));
		},

		parentToLocal: function() {
			return this._matrix._inverseTransform(Point.read(arguments));
		},

		localToParent: function() {
			return this._matrix._transformPoint(Point.read(arguments));
		},

		fitBounds: function(rectangle, fill) {
			rectangle = Rectangle.read(arguments);
			var bounds = this.getBounds(),
				itemRatio = bounds.height / bounds.width,
				rectRatio = rectangle.height / rectangle.width,
				scale = (fill ? itemRatio > rectRatio : itemRatio < rectRatio)
						? rectangle.width / bounds.width
						: rectangle.height / bounds.height,
				newBounds = new Rectangle(new Point(),
						new Size(bounds.width * scale, bounds.height * scale));
			newBounds.setCenter(rectangle.getCenter());
			this.setBounds(newBounds);
		},

		_setStyles: function(ctx) {
			var style = this._style,
				fillColor = style.getFillColor(),
				strokeColor = style.getStrokeColor(),
				shadowColor = style.getShadowColor();
			if (fillColor)
				ctx.fillStyle = fillColor.toCanvasStyle(ctx);
			if (strokeColor) {
				var strokeWidth = style.getStrokeWidth();
				if (strokeWidth > 0) {
					ctx.strokeStyle = strokeColor.toCanvasStyle(ctx);
					ctx.lineWidth = strokeWidth;
					var strokeJoin = style.getStrokeJoin(),
						strokeCap = style.getStrokeCap(),
						miterLimit = style.getMiterLimit();
					if (strokeJoin)
						ctx.lineJoin = strokeJoin;
					if (strokeCap)
						ctx.lineCap = strokeCap;
					if (miterLimit)
						ctx.miterLimit = miterLimit;
					if (paper.support.nativeDash) {
						var dashArray = style.getDashArray(),
							dashOffset = style.getDashOffset();
						if (dashArray && dashArray.length) {
							if ('setLineDash' in ctx) {
								ctx.setLineDash(dashArray);
								ctx.lineDashOffset = dashOffset;
							} else {
								ctx.mozDash = dashArray;
								ctx.mozDashOffset = dashOffset;
							}
						}
					}
				}
			}
			if (shadowColor) {
				var shadowBlur = style.getShadowBlur();
				if (shadowBlur > 0) {
					ctx.shadowColor = shadowColor.toCanvasStyle(ctx);
					ctx.shadowBlur = shadowBlur;
					var offset = this.getShadowOffset();
					ctx.shadowOffsetX = offset.x;
					ctx.shadowOffsetY = offset.y;
				}
			}
		},

		draw: function(ctx, param, parentStrokeMatrix) {
			var updateVersion = this._updateVersion = this._project._updateVersion;
			if (!this._visible || this._opacity === 0)
				return;
			var matrices = param.matrices,
				viewMatrix = param.viewMatrix,
				matrix = this._matrix,
				globalMatrix = matrices[matrices.length - 1].chain(matrix);
			if (!globalMatrix.isInvertible())
				return;

			function getViewMatrix(matrix) {
				return viewMatrix ? viewMatrix.chain(matrix) : matrix;
			}

			matrices.push(globalMatrix);
			if (param.updateMatrix) {
				globalMatrix._updateVersion = updateVersion;
				this._globalMatrix = globalMatrix;
			}

			var blendMode = this._blendMode,
				opacity = this._opacity,
				normalBlend = blendMode === 'normal',
				nativeBlend = BlendMode.nativeModes[blendMode],
				direct = normalBlend && opacity === 1
						|| param.dontStart
						|| param.clip
						|| (nativeBlend || normalBlend && opacity < 1)
							&& this._canComposite(),
				pixelRatio = param.pixelRatio || 1,
				mainCtx, itemOffset, prevOffset;
			if (!direct) {
				var bounds = this.getStrokeBounds(getViewMatrix(globalMatrix));
				if (!bounds.width || !bounds.height)
					return;
				prevOffset = param.offset;
				itemOffset = param.offset = bounds.getTopLeft().floor();
				mainCtx = ctx;
				ctx = CanvasProvider.getContext(bounds.getSize().ceil().add(1)
						.multiply(pixelRatio));
				if (pixelRatio !== 1)
					ctx.scale(pixelRatio, pixelRatio);
			}
			ctx.save();
			var strokeMatrix = parentStrokeMatrix
					? parentStrokeMatrix.chain(matrix)
					: !this.getStrokeScaling(true) && getViewMatrix(globalMatrix),
				clip = !direct && param.clipItem,
				transform = !strokeMatrix || clip;
			if (direct) {
				ctx.globalAlpha = opacity;
				if (nativeBlend)
					ctx.globalCompositeOperation = blendMode;
			} else if (transform) {
				ctx.translate(-itemOffset.x, -itemOffset.y);
			}
			if (transform)
				(direct ? matrix : getViewMatrix(globalMatrix)).applyToContext(ctx);
			if (clip)
				param.clipItem.draw(ctx, param.extend({ clip: true }));
			if (strokeMatrix) {
				ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
				var offset = param.offset;
				if (offset)
					ctx.translate(-offset.x, -offset.y);
			}
			this._draw(ctx, param, strokeMatrix);
			ctx.restore();
			matrices.pop();
			if (param.clip && !param.dontFinish)
				ctx.clip();
			if (!direct) {
				BlendMode.process(blendMode, ctx, mainCtx, opacity,
						itemOffset.subtract(prevOffset).multiply(pixelRatio));
				CanvasProvider.release(ctx);
				param.offset = prevOffset;
			}
		},

		_isUpdated: function(updateVersion) {
			var parent = this._parent;
			if (parent instanceof CompoundPath)
				return parent._isUpdated(updateVersion);
			var updated = this._updateVersion === updateVersion;
			if (!updated && parent && parent._visible
					&& parent._isUpdated(updateVersion)) {
				this._updateVersion = updateVersion;
				updated = true;
			}
			return updated;
		},

		_drawSelection: function(ctx, matrix, size, selectedItems, updateVersion) {
			if ((this._drawSelected || this._boundsSelected)
					&& this._isUpdated(updateVersion)) {
				var color = this.getSelectedColor(true)
						|| this.getLayer().getSelectedColor(true),
					mx = matrix.chain(this.getGlobalMatrix(true));
				ctx.strokeStyle = ctx.fillStyle = color
						? color.toCanvasStyle(ctx) : '#009dec';
				if (this._drawSelected)
					this._drawSelected(ctx, mx, selectedItems);
				if (this._boundsSelected) {
					var half = size / 2,
						coords = mx._transformCorners(this.getInternalBounds());
					ctx.beginPath();
					for (var i = 0; i < 8; i++)
						ctx[i === 0 ? 'moveTo' : 'lineTo'](coords[i], coords[++i]);
					ctx.closePath();
					ctx.stroke();
					for (var i = 0; i < 8; i++)
						ctx.fillRect(coords[i] - half, coords[++i] - half,
								size, size);
				}
			}
		},

		_canComposite: function() {
			return false;
		}
	}, Base.each(['down', 'drag', 'up', 'move'], function(name) {
		this['removeOn' + Base.capitalize(name)] = function() {
			var hash = {};
			hash[name] = true;
			return this.removeOn(hash);
		};
	}, {

		removeOn: function(obj) {
			for (var name in obj) {
				if (obj[name]) {
					var key = 'mouse' + name,
						project = this._project,
						sets = project._removeSets = project._removeSets || {};
					sets[key] = sets[key] || {};
					sets[key][this._id] = this;
				}
			}
			return this;
		}
	}));

	var Group = Item.extend({
		_class: 'Group',
		_selectChildren: true,
		_serializeFields: {
			children: []
		},

		initialize: function Group(arg) {
			this._children = [];
			this._namedChildren = {};
			if (!this._initialize(arg))
				this.addChildren(Array.isArray(arg) ? arg : arguments);
		},

		_changed: function _changed(flags) {
			_changed.base.call(this, flags);
			if (flags & 1026) {
				this._clipItem = undefined;
			}
		},

		_getClipItem: function() {
			var clipItem = this._clipItem;
			if (clipItem === undefined) {
				clipItem = null;
				for (var i = 0, l = this._children.length; i < l; i++) {
					var child = this._children[i];
					if (child._clipMask) {
						clipItem = child;
						break;
					}
				}
				this._clipItem = clipItem;
			}
			return clipItem;
		},

		isClipped: function() {
			return !!this._getClipItem();
		},

		setClipped: function(clipped) {
			var child = this.getFirstChild();
			if (child)
				child.setClipMask(clipped);
		},

		_draw: function(ctx, param) {
			var clip = param.clip,
				clipItem = !clip && this._getClipItem(),
				draw = true;
			param = param.extend({ clipItem: clipItem, clip: false });
			if (clip) {
				if (this._currentPath) {
					ctx.currentPath = this._currentPath;
					draw = false;
				} else {
					ctx.beginPath();
					param.dontStart = param.dontFinish = true;
				}
			} else if (clipItem) {
				clipItem.draw(ctx, param.extend({ clip: true }));
			}
			if (draw) {
				for (var i = 0, l = this._children.length; i < l; i++) {
					var item = this._children[i];
					if (item !== clipItem)
						item.draw(ctx, param);
				}
			}
			if (clip) {
				this._currentPath = ctx.currentPath;
			}
		}
	});

	var Layer = Group.extend({
		_class: 'Layer',

		initialize: function Layer(arg) {
			var props = Base.isPlainObject(arg)
					? new Base(arg)
					: { children: Array.isArray(arg) ? arg : arguments },
				insert = props.insert;
			props.insert = false;
			Group.call(this, props);
			if (insert || insert === undefined) {
				this._project.addChild(this);
				this.activate();
			}
		},

		_remove: function _remove(notifySelf, notifyParent) {
			if (this._parent)
				return _remove.base.call(this, notifySelf, notifyParent);
			if (this._index != null) {
				var project = this._project;
				if (project._activeLayer === this)
					project._activeLayer = this.getNextSibling()
							|| this.getPreviousSibling();
				Base.splice(project.layers, null, this._index, 1);
				this._installEvents(false);
				if (notifySelf && project._changes)
					this._changed(5);
				if (notifyParent) {
					project._needsUpdate = true;
				}
				return true;
			}
			return false;
		},

		getNextSibling: function getNextSibling() {
			return this._parent ? getNextSibling.base.call(this)
					: this._project.layers[this._index + 1] || null;
		},

		getPreviousSibling: function getPreviousSibling() {
			return this._parent ? getPreviousSibling.base.call(this)
					: this._project.layers[this._index - 1] || null;
		},

		isInserted: function isInserted() {
			return this._parent ? isInserted.base.call(this) : this._index != null;
		},

		activate: function() {
			this._project._activeLayer = this;
		},

		_insertSibling: function _insertSibling(index, item, _preserve) {
			return !this._parent
					? this._project.insertChild(index, item, _preserve)
					: _insertSibling.base.call(this, index, item, _preserve);
		}
	});

	var Shape = Item.extend({
		_class: 'Shape',
		_applyMatrix: false,
		_canApplyMatrix: false,
		_boundsSelected: true,
		_serializeFields: {
			type: null,
			size: null,
			radius: null
		},

		initialize: function Shape(props) {
			this._initialize(props);
		},

		_equals: function(item) {
			return this._type === item._type
				&& this._size.equals(item._size)
				&& Base.equals(this._radius, item._radius);
		},

		clone: function(insert) {
			var copy = new Shape(Item.NO_INSERT);
			copy.setType(this._type);
			copy.setSize(this._size);
			copy.setRadius(this._radius);
			return this._clone(copy, insert);
		},

		getType: function() {
			return this._type;
		},

		setType: function(type) {
			this._type = type;
		},

		getShape: '#getType',
		setShape: '#setType',

		getSize: function() {
			var size = this._size;
			return new LinkedSize(size.width, size.height, this, 'setSize');
		},

		setSize: function() {
			var size = Size.read(arguments);
			if (!this._size) {
				this._size = size.clone();
			} else if (!this._size.equals(size)) {
				var type = this._type,
					width = size.width,
					height = size.height;
				if (type === 'rectangle') {
					var radius = Size.min(this._radius, size.divide(2));
					this._radius.set(radius.width, radius.height);
				} else if (type === 'circle') {
					width = height = (width + height) / 2;
					this._radius = width / 2;
				} else if (type === 'ellipse') {
					this._radius.set(width / 2, height / 2);
				}
				this._size.set(width, height);
				this._changed(9);
			}
		},

		getRadius: function() {
			var rad = this._radius;
			return this._type === 'circle'
					? rad
					: new LinkedSize(rad.width, rad.height, this, 'setRadius');
		},

		setRadius: function(radius) {
			var type = this._type;
			if (type === 'circle') {
				if (radius === this._radius)
					return;
				var size = radius * 2;
				this._radius = radius;
				this._size.set(size, size);
			} else {
				radius = Size.read(arguments);
				if (!this._radius) {
					this._radius = radius.clone();
				} else {
					if (this._radius.equals(radius))
						return;
					this._radius.set(radius.width, radius.height);
					if (type === 'rectangle') {
						var size = Size.max(this._size, radius.multiply(2));
						this._size.set(size.width, size.height);
					} else if (type === 'ellipse') {
						this._size.set(radius.width * 2, radius.height * 2);
					}
				}
			}
			this._changed(9);
		},

		isEmpty: function() {
			return false;
		},

		toPath: function(insert) {
			var path = this._clone(new Path[Base.capitalize(this._type)]({
				center: new Point(),
				size: this._size,
				radius: this._radius,
				insert: false
			}), insert);
			if (paper.settings.applyMatrix)
				path.setApplyMatrix(true);
			return path;
		},

		_draw: function(ctx, param, strokeMatrix) {
			var style = this._style,
				hasFill = style.hasFill(),
				hasStroke = style.hasStroke(),
				dontPaint = param.dontFinish || param.clip,
				untransformed = !strokeMatrix;
			if (hasFill || hasStroke || dontPaint) {
				var type = this._type,
					radius = this._radius,
					isCircle = type === 'circle';
				if (!param.dontStart)
					ctx.beginPath();
				if (untransformed && isCircle) {
					ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
				} else {
					var rx = isCircle ? radius : radius.width,
						ry = isCircle ? radius : radius.height,
						size = this._size,
						width = size.width,
						height = size.height;
					if (untransformed && type === 'rectangle' && rx === 0 && ry === 0) {
						ctx.rect(-width / 2, -height / 2, width, height);
					} else {
						var x = width / 2,
							y = height / 2,
							kappa = 1 - 0.5522847498307936,
							cx = rx * kappa,
							cy = ry * kappa,
							c = [
								-x, -y + ry,
								-x, -y + cy,
								-x + cx, -y,
								-x + rx, -y,
								x - rx, -y,
								x - cx, -y,
								x, -y + cy,
								x, -y + ry,
								x, y - ry,
								x, y - cy,
								x - cx, y,
								x - rx, y,
								-x + rx, y,
								-x + cx, y,
								-x, y - cy,
								-x, y - ry
							];
						if (strokeMatrix)
							strokeMatrix.transform(c, c, 32);
						ctx.moveTo(c[0], c[1]);
						ctx.bezierCurveTo(c[2], c[3], c[4], c[5], c[6], c[7]);
						if (x !== rx)
							ctx.lineTo(c[8], c[9]);
						ctx.bezierCurveTo(c[10], c[11], c[12], c[13], c[14], c[15]);
						if (y !== ry)
							ctx.lineTo(c[16], c[17]);
						ctx.bezierCurveTo(c[18], c[19], c[20], c[21], c[22], c[23]);
						if (x !== rx)
							ctx.lineTo(c[24], c[25]);
						ctx.bezierCurveTo(c[26], c[27], c[28], c[29], c[30], c[31]);
					}
				}
				ctx.closePath();
			}
			if (!dontPaint && (hasFill || hasStroke)) {
				this._setStyles(ctx);
				if (hasFill) {
					ctx.fill(style.getWindingRule());
					ctx.shadowColor = 'rgba(0,0,0,0)';
				}
				if (hasStroke)
					ctx.stroke();
			}
		},

		_canComposite: function() {
			return !(this.hasFill() && this.hasStroke());
		},

		_getBounds: function(getter, matrix) {
			var rect = new Rectangle(this._size).setCenter(0, 0);
			if (getter !== 'getBounds' && this.hasStroke())
				rect = rect.expand(this.getStrokeWidth());
			return matrix ? matrix._transformBounds(rect) : rect;
		}
	},
	new function() {
		function getCornerCenter(that, point, expand) {
			var radius = that._radius;
			if (!radius.isZero()) {
				var halfSize = that._size.divide(2);
				for (var i = 0; i < 4; i++) {
					var dir = new Point(i & 1 ? 1 : -1, i > 1 ? 1 : -1),
						corner = dir.multiply(halfSize),
						center = corner.subtract(dir.multiply(radius)),
						rect = new Rectangle(corner, center);
					if ((expand ? rect.expand(expand) : rect).contains(point))
						return center;
				}
			}
		}

		function getEllipseRadius(point, radius) {
			var angle = point.getAngleInRadians(),
				width = radius.width * 2,
				height = radius.height * 2,
				x = width * Math.sin(angle),
				y = height * Math.cos(angle);
			return width * height / (2 * Math.sqrt(x * x + y * y));
		}

		return {
			_contains: function _contains(point) {
				if (this._type === 'rectangle') {
					var center = getCornerCenter(this, point);
					return center
							? point.subtract(center).divide(this._radius)
								.getLength() <= 1
							: _contains.base.call(this, point);
				} else {
					return point.divide(this.size).getLength() <= 0.5;
				}
			},

			_hitTestSelf: function _hitTestSelf(point, options) {
				var hit = false;
				if (this.hasStroke()) {
					var type = this._type,
						radius = this._radius,
						strokeWidth = this.getStrokeWidth() + 2 * options.tolerance;
					if (type === 'rectangle') {
						var center = getCornerCenter(this, point, strokeWidth);
						if (center) {
							var pt = point.subtract(center);
							hit = 2 * Math.abs(pt.getLength()
									- getEllipseRadius(pt, radius)) <= strokeWidth;
						} else {
							var rect = new Rectangle(this._size).setCenter(0, 0),
								outer = rect.expand(strokeWidth),
								inner = rect.expand(-strokeWidth);
							hit = outer._containsPoint(point)
									&& !inner._containsPoint(point);
						}
					} else {
						if (type === 'ellipse')
							radius = getEllipseRadius(point, radius);
						hit = 2 * Math.abs(point.getLength() - radius)
								<= strokeWidth;
					}
				}
				return hit
						? new HitResult('stroke', this)
						: _hitTestSelf.base.apply(this, arguments);
			}
		};
	}, {

	statics: new function() {
		function createShape(type, point, size, radius, args) {
			var item = new Shape(Base.getNamed(args));
			item._type = type;
			item._size = size;
			item._radius = radius;
			return item.translate(point);
		}

		return {
			Circle: function() {
				var center = Point.readNamed(arguments, 'center'),
					radius = Base.readNamed(arguments, 'radius');
				return createShape('circle', center, new Size(radius * 2), radius,
						arguments);
			},

			Rectangle: function() {
				var rect = Rectangle.readNamed(arguments, 'rectangle'),
					radius = Size.min(Size.readNamed(arguments, 'radius'),
							rect.getSize(true).divide(2));
				return createShape('rectangle', rect.getCenter(true),
						rect.getSize(true), radius, arguments);
			},

			Ellipse: function() {
				var ellipse = Shape._readEllipse(arguments),
					radius = ellipse.radius;
				return createShape('ellipse', ellipse.center, radius.multiply(2),
						radius, arguments);
			},

			_readEllipse: function(args) {
				var center,
					radius;
				if (Base.hasNamed(args, 'radius')) {
					center = Point.readNamed(args, 'center');
					radius = Size.readNamed(args, 'radius');
				} else {
					var rect = Rectangle.readNamed(args, 'rectangle');
					center = rect.getCenter(true);
					radius = rect.getSize(true).divide(2);
				}
				return { center: center, radius: radius };
			}
		};
	}});

	var Raster = Item.extend({
		_class: 'Raster',
		_applyMatrix: false,
		_canApplyMatrix: false,
		_boundsGetter: 'getBounds',
		_boundsSelected: true,
		_serializeFields: {
			crossOrigin: null,
			source: null
		},

		initialize: function Raster(object, position) {
			if (!this._initialize(object,
					position !== undefined && Point.read(arguments, 1))) {
				if (typeof object === 'string') {
					this.setSource(object);
				} else {
					this.setImage(object);
				}
			}
			if (!this._size) {
				this._size = new Size();
				this._loaded = false;
			}
		},

		_equals: function(item) {
			return this.getSource() === item.getSource();
		},

		clone: function(insert) {
			var copy = new Raster(Item.NO_INSERT),
				image = this._image,
				canvas = this._canvas;
			if (image) {
				copy.setImage(image);
			} else if (canvas) {
				var copyCanvas = CanvasProvider.getCanvas(this._size);
				copyCanvas.getContext('2d').drawImage(canvas, 0, 0);
				copy.setImage(copyCanvas);
			}
			copy._crossOrigin = this._crossOrigin;
			return this._clone(copy, insert);
		},

		getSize: function() {
			var size = this._size;
			return new LinkedSize(size ? size.width : 0, size ? size.height : 0,
					this, 'setSize');
		},

		setSize: function() {
			var size = Size.read(arguments);
			if (!size.equals(this._size)) {
				if (size.width > 0 && size.height > 0) {
					var element = this.getElement();
					this.setImage(CanvasProvider.getCanvas(size));
					if (element)
						this.getContext(true).drawImage(element, 0, 0,
								size.width, size.height);
				} else {
					if (this._canvas)
						CanvasProvider.release(this._canvas);
					this._size = size.clone();
				}
			}
		},

		getWidth: function() {
			return this._size ? this._size.width : 0;
		},

		setWidth: function(width) {
			this.setSize(width, this.getHeight());
		},

		getHeight: function() {
			return this._size ? this._size.height : 0;
		},

		setHeight: function(height) {
			this.setSize(this.getWidth(), height);
		},

		isEmpty: function() {
			var size = this._size;
			return !size || size.width === 0 && size.height === 0;
		},

		getResolution: function() {
			var matrix = this._matrix,
				orig = new Point(0, 0).transform(matrix),
				u = new Point(1, 0).transform(matrix).subtract(orig),
				v = new Point(0, 1).transform(matrix).subtract(orig);
			return new Size(
				72 / u.getLength(),
				72 / v.getLength()
			);
		},

		getPpi: '#getResolution',

		getImage: function() {
			return this._image;
		},

		setImage: function(image) {
			if (this._canvas)
				CanvasProvider.release(this._canvas);
			if (image && image.getContext) {
				this._image = null;
				this._canvas = image;
				this._loaded = true;
			} else {
				this._image = image;
				this._canvas = null;
				this._loaded = image && image.complete;
			}
			this._size = new Size(
					image ? image.naturalWidth || image.width : 0,
					image ? image.naturalHeight || image.height : 0);
			this._context = null;
			this._changed(521);
		},

		getCanvas: function() {
			if (!this._canvas) {
				var ctx = CanvasProvider.getContext(this._size);
				try {
					if (this._image)
						ctx.drawImage(this._image, 0, 0);
					this._canvas = ctx.canvas;
				} catch (e) {
					CanvasProvider.release(ctx);
				}
			}
			return this._canvas;
		},

		setCanvas: '#setImage',

		getContext: function(modify) {
			if (!this._context)
				this._context = this.getCanvas().getContext('2d');
			if (modify) {
				this._image = null;
				this._changed(513);
			}
			return this._context;
		},

		setContext: function(context) {
			this._context = context;
		},

		getSource: function() {
			return this._image && this._image.src || this.toDataURL();
		},

		setSource: function(src) {
			var that = this,
				crossOrigin = this._crossOrigin,
				image;

			function loaded() {
				var view = that.getView();
				if (view) {
					paper = view._scope;
					that.setImage(image);
					that.emit('load');
					view.update();
				}
			}

			image = document.getElementById(src) || new Image();
			if (crossOrigin)
				image.crossOrigin = crossOrigin;
			if (image.naturalWidth && image.naturalHeight) {
				setTimeout(loaded, 0);
			} else {
				DomEvent.add(image, { load: loaded });
				if (!image.src)
					image.src = src;
			}
			this.setImage(image);
		},

		getCrossOrigin: function() {
			return this._image && this._image.crossOrigin || this._crossOrigin || '';
		},

		setCrossOrigin: function(crossOrigin) {
			this._crossOrigin = crossOrigin;
			if (this._image)
				this._image.crossOrigin = crossOrigin;
		},

		getElement: function() {
			return this._canvas || this._loaded && this._image;
		}
	}, {
		beans: false,

		getSubCanvas: function() {
			var rect = Rectangle.read(arguments),
				ctx = CanvasProvider.getContext(rect.getSize());
			ctx.drawImage(this.getCanvas(), rect.x, rect.y,
					rect.width, rect.height, 0, 0, rect.width, rect.height);
			return ctx.canvas;
		},

		getSubRaster: function() {
			var rect = Rectangle.read(arguments),
				raster = new Raster(Item.NO_INSERT);
			raster.setImage(this.getSubCanvas(rect));
			raster.translate(rect.getCenter().subtract(this.getSize().divide(2)));
			raster._matrix.preConcatenate(this._matrix);
			raster.insertAbove(this);
			return raster;
		},

		toDataURL: function() {
			var src = this._image && this._image.src;
			if (/^data:/.test(src))
				return src;
			var canvas = this.getCanvas();
			return canvas ? canvas.toDataURL.apply(canvas, arguments) : null;
		},

		drawImage: function(image ) {
			var point = Point.read(arguments, 1);
			this.getContext(true).drawImage(image, point.x, point.y);
		},

		getAverageColor: function(object) {
			var bounds, path;
			if (!object) {
				bounds = this.getBounds();
			} else if (object instanceof PathItem) {
				path = object;
				bounds = object.getBounds();
			} else if (object.width) {
				bounds = new Rectangle(object);
			} else if (object.x) {
				bounds = new Rectangle(object.x - 0.5, object.y - 0.5, 1, 1);
			}
			var sampleSize = 32,
				width = Math.min(bounds.width, sampleSize),
				height = Math.min(bounds.height, sampleSize);
			var ctx = Raster._sampleContext;
			if (!ctx) {
				ctx = Raster._sampleContext = CanvasProvider.getContext(
						new Size(sampleSize));
			} else {
				ctx.clearRect(0, 0, sampleSize + 1, sampleSize + 1);
			}
			ctx.save();
			var matrix = new Matrix()
					.scale(width / bounds.width, height / bounds.height)
					.translate(-bounds.x, -bounds.y);
			matrix.applyToContext(ctx);
			if (path)
				path.draw(ctx, new Base({ clip: true, matrices: [matrix] }));
			this._matrix.applyToContext(ctx);
			var element = this.getElement(),
				size = this._size;
			if (element)
				ctx.drawImage(element, -size.width / 2, -size.height / 2);
			ctx.restore();
			var pixels = ctx.getImageData(0.5, 0.5, Math.ceil(width),
					Math.ceil(height)).data,
				channels = [0, 0, 0],
				total = 0;
			for (var i = 0, l = pixels.length; i < l; i += 4) {
				var alpha = pixels[i + 3];
				total += alpha;
				alpha /= 255;
				channels[0] += pixels[i] * alpha;
				channels[1] += pixels[i + 1] * alpha;
				channels[2] += pixels[i + 2] * alpha;
			}
			for (var i = 0; i < 3; i++)
				channels[i] /= total;
			return total ? Color.read(channels) : null;
		},

		getPixel: function() {
			var point = Point.read(arguments);
			var data = this.getContext().getImageData(point.x, point.y, 1, 1).data;
			return new Color('rgb', [data[0] / 255, data[1] / 255, data[2] / 255],
					data[3] / 255);
		},

		setPixel: function() {
			var point = Point.read(arguments),
				color = Color.read(arguments),
				components = color._convert('rgb'),
				alpha = color._alpha,
				ctx = this.getContext(true),
				imageData = ctx.createImageData(1, 1),
				data = imageData.data;
			data[0] = components[0] * 255;
			data[1] = components[1] * 255;
			data[2] = components[2] * 255;
			data[3] = alpha != null ? alpha * 255 : 255;
			ctx.putImageData(imageData, point.x, point.y);
		},

		createImageData: function() {
			var size = Size.read(arguments);
			return this.getContext().createImageData(size.width, size.height);
		},

		getImageData: function() {
			var rect = Rectangle.read(arguments);
			if (rect.isEmpty())
				rect = new Rectangle(this._size);
			return this.getContext().getImageData(rect.x, rect.y,
					rect.width, rect.height);
		},

		setImageData: function(data ) {
			var point = Point.read(arguments, 1);
			this.getContext(true).putImageData(data, point.x, point.y);
		},

		_getBounds: function(getter, matrix) {
			var rect = new Rectangle(this._size).setCenter(0, 0);
			return matrix ? matrix._transformBounds(rect) : rect;
		},

		_hitTestSelf: function(point) {
			if (this._contains(point)) {
				var that = this;
				return new HitResult('pixel', that, {
					offset: point.add(that._size.divide(2)).round(),
					color: {
						get: function() {
							return that.getPixel(this.offset);
						}
					}
				});
			}
		},

		_draw: function(ctx) {
			var element = this.getElement();
			if (element) {
				ctx.globalAlpha = this._opacity;
				ctx.drawImage(element,
						-this._size.width / 2, -this._size.height / 2);
			}
		},

		_canComposite: function() {
			return true;
		}
	});

	var PlacedSymbol = Item.extend({
		_class: 'PlacedSymbol',
		_applyMatrix: false,
		_canApplyMatrix: false,
		_boundsGetter: { getBounds: 'getStrokeBounds' },
		_boundsSelected: true,
		_serializeFields: {
			symbol: null
		},

		initialize: function PlacedSymbol(arg0, arg1) {
			if (!this._initialize(arg0,
					arg1 !== undefined && Point.read(arguments, 1)))
				this.setSymbol(arg0 instanceof Symbol ? arg0 : new Symbol(arg0));
		},

		_equals: function(item) {
			return this._symbol === item._symbol;
		},

		getSymbol: function() {
			return this._symbol;
		},

		setSymbol: function(symbol) {
			this._symbol = symbol;
			this._changed(9);
		},

		clone: function(insert) {
			var copy = new PlacedSymbol(Item.NO_INSERT);
			copy.setSymbol(this._symbol);
			return this._clone(copy, insert);
		},

		isEmpty: function() {
			return this._symbol._definition.isEmpty();
		},

		_getBounds: function(getter, matrix, cacheItem) {
			var definition = this.symbol._definition;
			return definition._getCachedBounds(getter,
					matrix && matrix.chain(definition._matrix), cacheItem);
		},

		_hitTestSelf: function(point, options) {
			var res = this._symbol._definition._hitTest(point, options);
			if (res)
				res.item = this;
			return res;
		},

		_draw: function(ctx, param) {
			this.symbol._definition.draw(ctx, param);
		}

	});

	var HitResult = Base.extend({
		_class: 'HitResult',

		initialize: function HitResult(type, item, values) {
			this.type = type;
			this.item = item;
			if (values) {
				values.enumerable = true;
				this.inject(values);
			}
		},

		statics: {
			getOptions: function(options) {
				return new Base({
					type: null,
					tolerance: paper.settings.hitTolerance,
					fill: !options,
					stroke: !options,
					segments: !options,
					handles: false,
					ends: false,
					center: false,
					bounds: false,
					guides: false,
					selected: false
				}, options);
			}
		}
	});

	var Segment = Base.extend({
		_class: 'Segment',
		beans: true,

		initialize: function Segment(arg0, arg1, arg2, arg3, arg4, arg5) {
			var count = arguments.length,
				point, handleIn, handleOut;
			if (count === 0) {
			} else if (count === 1) {
				if ('point' in arg0) {
					point = arg0.point;
					handleIn = arg0.handleIn;
					handleOut = arg0.handleOut;
				} else {
					point = arg0;
				}
			} else if (count === 2 && typeof arg0 === 'number') {
				point = arguments;
			} else if (count <= 3) {
				point = arg0;
				handleIn = arg1;
				handleOut = arg2;
			} else {
				point = arg0 !== undefined ? [ arg0, arg1 ] : null;
				handleIn = arg2 !== undefined ? [ arg2, arg3 ] : null;
				handleOut = arg4 !== undefined ? [ arg4, arg5 ] : null;
			}
			new SegmentPoint(point, this, '_point');
			new SegmentPoint(handleIn, this, '_handleIn');
			new SegmentPoint(handleOut, this, '_handleOut');
		},

		_serialize: function(options) {
			return Base.serialize(this.hasHandles()
					? [this._point, this._handleIn, this._handleOut]
					: this._point,
					options, true);
		},

		_changed: function(point) {
			var path = this._path;
			if (!path)
				return;
			var curves = path._curves,
				index = this._index,
				curve;
			if (curves) {
				if ((!point || point === this._point || point === this._handleIn)
						&& (curve = index > 0 ? curves[index - 1] : path._closed
							? curves[curves.length - 1] : null))
					curve._changed();
				if ((!point || point === this._point || point === this._handleOut)
						&& (curve = curves[index]))
					curve._changed();
			}
			path._changed(25);
		},

		getPoint: function() {
			return this._point;
		},

		setPoint: function() {
			var point = Point.read(arguments);
			this._point.set(point.x, point.y);
		},

		getHandleIn: function() {
			return this._handleIn;
		},

		setHandleIn: function() {
			var point = Point.read(arguments);
			this._handleIn.set(point.x, point.y);
		},

		getHandleOut: function() {
			return this._handleOut;
		},

		setHandleOut: function() {
			var point = Point.read(arguments);
			this._handleOut.set(point.x, point.y);
		},

		hasHandles: function() {
			return !this._handleIn.isZero() || !this._handleOut.isZero();
		},

		clearHandles: function() {
			this._handleIn.set(0, 0);
			this._handleOut.set(0, 0);
		},

		_selectionState: 0,

		isSelected: function(_point) {
			var state = this._selectionState;
			return !_point ? !!(state & 7)
				: _point === this._point ? !!(state & 4)
				: _point === this._handleIn ? !!(state & 1)
				: _point === this._handleOut ? !!(state & 2)
				: false;
		},

		setSelected: function(selected, _point) {
			var path = this._path,
				selected = !!selected,
				state = this._selectionState,
				oldState = state,
				flag = !_point ? 7
						: _point === this._point ? 4
						: _point === this._handleIn ? 1
						: _point === this._handleOut ? 2
						: 0;
			if (selected) {
				state |= flag;
			} else {
				state &= ~flag;
			}
			this._selectionState = state;
			if (path && state !== oldState) {
				path._updateSelection(this, oldState, state);
				path._changed(129);
			}
		},

		getIndex: function() {
			return this._index !== undefined ? this._index : null;
		},

		getPath: function() {
			return this._path || null;
		},

		getCurve: function() {
			var path = this._path,
				index = this._index;
			if (path) {
				if (index > 0 && !path._closed
						&& index === path._segments.length - 1)
					index--;
				return path.getCurves()[index] || null;
			}
			return null;
		},

		getLocation: function() {
			var curve = this.getCurve();
			return curve
					? new CurveLocation(curve, this === curve._segment1 ? 0 : 1)
					: null;
		},

		getNext: function() {
			var segments = this._path && this._path._segments;
			return segments && (segments[this._index + 1]
					|| this._path._closed && segments[0]) || null;
		},

		getPrevious: function() {
			var segments = this._path && this._path._segments;
			return segments && (segments[this._index - 1]
					|| this._path._closed && segments[segments.length - 1]) || null;
		},

		isFirst: function() {
			return this._index === 0;
		},

		isLast: function() {
			var path = this._path;
			return path && this._index === path._segments.length - 1 || false;
		},

		reverse: function() {
			var handleIn = this._handleIn,
				handleOut = this._handleOut,
				inX = handleIn._x,
				inY = handleIn._y;
			handleIn.set(handleOut._x, handleOut._y);
			handleOut.set(inX, inY);
		},

		reversed: function() {
			return new Segment(this._point, this._handleOut, this._handleIn);
		},

		remove: function() {
			return this._path ? !!this._path.removeSegment(this._index) : false;
		},

		clone: function() {
			return new Segment(this._point, this._handleIn, this._handleOut);
		},

		equals: function(segment) {
			return segment === this || segment && this._class === segment._class
					&& this._point.equals(segment._point)
					&& this._handleIn.equals(segment._handleIn)
					&& this._handleOut.equals(segment._handleOut)
					|| false;
		},

		toString: function() {
			var parts = [ 'point: ' + this._point ];
			if (!this._handleIn.isZero())
				parts.push('handleIn: ' + this._handleIn);
			if (!this._handleOut.isZero())
				parts.push('handleOut: ' + this._handleOut);
			return '{ ' + parts.join(', ') + ' }';
		},

		transform: function(matrix) {
			this._transformCoordinates(matrix, new Array(6), true);
			this._changed();
		},

		_transformCoordinates: function(matrix, coords, change) {
			var point = this._point,
				handleIn = !change || !this._handleIn.isZero()
						? this._handleIn : null,
				handleOut = !change || !this._handleOut.isZero()
						? this._handleOut : null,
				x = point._x,
				y = point._y,
				i = 2;
			coords[0] = x;
			coords[1] = y;
			if (handleIn) {
				coords[i++] = handleIn._x + x;
				coords[i++] = handleIn._y + y;
			}
			if (handleOut) {
				coords[i++] = handleOut._x + x;
				coords[i++] = handleOut._y + y;
			}
			if (matrix) {
				matrix._transformCoordinates(coords, coords, i / 2);
				x = coords[0];
				y = coords[1];
				if (change) {
					point._x = x;
					point._y = y;
					i  = 2;
					if (handleIn) {
						handleIn._x = coords[i++] - x;
						handleIn._y = coords[i++] - y;
					}
					if (handleOut) {
						handleOut._x = coords[i++] - x;
						handleOut._y = coords[i++] - y;
					}
				} else {
					if (!handleIn) {
						coords[i++] = x;
						coords[i++] = y;
					}
					if (!handleOut) {
						coords[i++] = x;
						coords[i++] = y;
					}
				}
			}
			return coords;
		}
	});

	var SegmentPoint = Point.extend({
		initialize: function SegmentPoint(point, owner, key) {
			var x, y, selected;
			if (!point) {
				x = y = 0;
			} else if ((x = point[0]) !== undefined) {
				y = point[1];
			} else {
				var pt = point;
				if ((x = pt.x) === undefined) {
					pt = Point.read(arguments);
					x = pt.x;
				}
				y = pt.y;
				selected = pt.selected;
			}
			this._x = x;
			this._y = y;
			this._owner = owner;
			owner[key] = this;
			if (selected)
				this.setSelected(true);
		},

		set: function(x, y) {
			this._x = x;
			this._y = y;
			this._owner._changed(this);
			return this;
		},

		_serialize: function(options) {
			var f = options.formatter,
				x = f.number(this._x),
				y = f.number(this._y);
			return this.isSelected()
					? { x: x, y: y, selected: true }
					: [x, y];
		},

		getX: function() {
			return this._x;
		},

		setX: function(x) {
			this._x = x;
			this._owner._changed(this);
		},

		getY: function() {
			return this._y;
		},

		setY: function(y) {
			this._y = y;
			this._owner._changed(this);
		},

		isZero: function() {
			return Numerical.isZero(this._x) && Numerical.isZero(this._y);
		},

		setSelected: function(selected) {
			this._owner.setSelected(selected, this);
		},

		isSelected: function() {
			return this._owner.isSelected(this);
		}
	});

	var Curve = Base.extend({
		_class: 'Curve',

		initialize: function Curve(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
			var count = arguments.length,
				seg1, seg2,
				point1, point2,
				handle1, handle2;
			if (count === 3) {
				this._path = arg0;
				seg1 = arg1;
				seg2 = arg2;
			} else if (count === 0) {
				seg1 = new Segment();
				seg2 = new Segment();
			} else if (count === 1) {
				if ('segment1' in arg0) {
					seg1 = new Segment(arg0.segment1);
					seg2 = new Segment(arg0.segment2);
				} else if ('point1' in arg0) {
					point1 = arg0.point1;
					handle1 = arg0.handle1;
					handle2 = arg0.handle2;
					point2 = arg0.point2;
				} else if (Array.isArray(arg0)) {
					point1 = [arg0[0], arg0[1]];
					point2 = [arg0[6], arg0[7]];
					handle1 = [arg0[2] - arg0[0], arg0[3] - arg0[1]];
					handle2 = [arg0[4] - arg0[6], arg0[5] - arg0[7]];
				}
			} else if (count === 2) {
				seg1 = new Segment(arg0);
				seg2 = new Segment(arg1);
			} else if (count === 4) {
				point1 = arg0;
				handle1 = arg1;
				handle2 = arg2;
				point2 = arg3;
			} else if (count === 8) {
				point1 = [arg0, arg1];
				point2 = [arg6, arg7];
				handle1 = [arg2 - arg0, arg3 - arg1];
				handle2 = [arg4 - arg6, arg5 - arg7];
			}
			this._segment1 = seg1 || new Segment(point1, null, handle1);
			this._segment2 = seg2 || new Segment(point2, handle2, null);
		},

		_serialize: function(options) {
			return Base.serialize(this.hasHandles()
					? [this.getPoint1(), this.getHandle1(), this.getHandle2(),
						this.getPoint2()]
					: [this.getPoint1(), this.getPoint2()],
					options, true);
		},

		_changed: function() {
			this._length = this._bounds = undefined;
		},

		clone: function() {
			return new Curve(this._segment1, this._segment2);
		},

		toString: function() {
			var parts = [ 'point1: ' + this._segment1._point ];
			if (!this._segment1._handleOut.isZero())
				parts.push('handle1: ' + this._segment1._handleOut);
			if (!this._segment2._handleIn.isZero())
				parts.push('handle2: ' + this._segment2._handleIn);
			parts.push('point2: ' + this._segment2._point);
			return '{ ' + parts.join(', ') + ' }';
		},

		remove: function() {
			var removed = false;
			if (this._path) {
				var segment2 = this._segment2,
					handleOut = segment2._handleOut;
				removed = segment2.remove();
				if (removed)
					this._segment1._handleOut.set(handleOut.x, handleOut.y);
			}
			return removed;
		},

		getPoint1: function() {
			return this._segment1._point;
		},

		setPoint1: function() {
			var point = Point.read(arguments);
			this._segment1._point.set(point.x, point.y);
		},

		getPoint2: function() {
			return this._segment2._point;
		},

		setPoint2: function() {
			var point = Point.read(arguments);
			this._segment2._point.set(point.x, point.y);
		},

		getHandle1: function() {
			return this._segment1._handleOut;
		},

		setHandle1: function() {
			var point = Point.read(arguments);
			this._segment1._handleOut.set(point.x, point.y);
		},

		getHandle2: function() {
			return this._segment2._handleIn;
		},

		setHandle2: function() {
			var point = Point.read(arguments);
			this._segment2._handleIn.set(point.x, point.y);
		},

		getSegment1: function() {
			return this._segment1;
		},

		getSegment2: function() {
			return this._segment2;
		},

		getPath: function() {
			return this._path;
		},

		getIndex: function() {
			return this._segment1._index;
		},

		getNext: function() {
			var curves = this._path && this._path._curves;
			return curves && (curves[this._segment1._index + 1]
					|| this._path._closed && curves[0]) || null;
		},

		getPrevious: function() {
			var curves = this._path && this._path._curves;
			return curves && (curves[this._segment1._index - 1]
					|| this._path._closed && curves[curves.length - 1]) || null;
		},

		isFirst: function() {
			return this._segment1._index === 0;
		},

		isLast: function() {
			var path = this._path;
			return path && this._segment1._index === path._curves.length - 1
					|| false;
		},

		isSelected: function() {
			return this.getPoint1().isSelected()
					&& this.getHandle2().isSelected()
					&& this.getHandle2().isSelected()
					&& this.getPoint2().isSelected();
		},

		setSelected: function(selected) {
			this.getPoint1().setSelected(selected);
			this.getHandle1().setSelected(selected);
			this.getHandle2().setSelected(selected);
			this.getPoint2().setSelected(selected);
		},

		getValues: function(matrix) {
			return Curve.getValues(this._segment1, this._segment2, matrix);
		},

		getPoints: function() {
			var coords = this.getValues(),
				points = [];
			for (var i = 0; i < 8; i += 2)
				points.push(new Point(coords[i], coords[i + 1]));
			return points;
		},

		getLength: function() {
			if (this._length == null)
				this._length = Curve.getLength(this.getValues(), 0, 1);
			return this._length;
		},

		getArea: function() {
			return Curve.getArea(this.getValues());
		},

		getLine: function() {
			return new Line(this._segment1._point, this._segment2._point);
		},

		getPart: function(from, to) {
			return new Curve(Curve.getPart(this.getValues(), from, to));
		},

		getPartLength: function(from, to) {
			return Curve.getLength(this.getValues(), from, to);
		},

		getIntersections: function(curve) {
			return Curve._getIntersections(this.getValues(),
					curve && curve !== this ? curve.getValues() : null,
					this, curve, [], {});
		},

		_getParameter: function(offset, isParameter) {
			return isParameter
					? offset
					: offset && offset.curve === this
						? offset.parameter
						: offset === undefined && isParameter === undefined
							? 0.5
							: this.getParameterAt(offset, 0);
		},

		divide: function(offset, isParameter, _setHandles) {
			var parameter = this._getParameter(offset, isParameter),
				tMin = 4e-7,
				tMax = 1 - tMin,
				res = null;
			if (parameter >= tMin && parameter <= tMax) {
				var parts = Curve.subdivide(this.getValues(), parameter),
					left = parts[0],
					right = parts[1],
					setHandles = _setHandles || this.hasHandles(),
					segment1 = this._segment1,
					segment2 = this._segment2,
					path = this._path;
				if (setHandles) {
					segment1._handleOut.set(left[2] - left[0],
							left[3] - left[1]);
					segment2._handleIn.set(right[4] - right[6],
							right[5] - right[7]);
				}
				var x = left[6], y = left[7],
					segment = new Segment(new Point(x, y),
							setHandles && new Point(left[4] - x, left[5] - y),
							setHandles && new Point(right[2] - x, right[3] - y));
				if (path) {
					path.insert(segment1._index + 1, segment);
					res = this.getNext();
				} else {
					this._segment2 = segment;
					res = new Curve(segment, segment2);
				}
			}
			return res;
		},

		split: function(offset, isParameter) {
			return this._path
				? this._path.split(this._segment1._index,
						this._getParameter(offset, isParameter))
				: null;
		},

		reversed: function() {
			return new Curve(this._segment2.reversed(), this._segment1.reversed());
		},

		clearHandles: function() {
			this._segment1._handleOut.set(0, 0);
			this._segment2._handleIn.set(0, 0);
		},

	statics: {
		getValues: function(segment1, segment2, matrix) {
			var p1 = segment1._point,
				h1 = segment1._handleOut,
				h2 = segment2._handleIn,
				p2 = segment2._point,
				values = [
					p1._x, p1._y,
					p1._x + h1._x, p1._y + h1._y,
					p2._x + h2._x, p2._y + h2._y,
					p2._x, p2._y
				];
			if (matrix)
				matrix._transformCoordinates(values, values, 4);
			return values;
		},

		subdivide: function(v, t) {
			var p1x = v[0], p1y = v[1],
				c1x = v[2], c1y = v[3],
				c2x = v[4], c2y = v[5],
				p2x = v[6], p2y = v[7];
			if (t === undefined)
				t = 0.5;
			var u = 1 - t,
				p3x = u * p1x + t * c1x, p3y = u * p1y + t * c1y,
				p4x = u * c1x + t * c2x, p4y = u * c1y + t * c2y,
				p5x = u * c2x + t * p2x, p5y = u * c2y + t * p2y,
				p6x = u * p3x + t * p4x, p6y = u * p3y + t * p4y,
				p7x = u * p4x + t * p5x, p7y = u * p4y + t * p5y,
				p8x = u * p6x + t * p7x, p8y = u * p6y + t * p7y;
			return [
				[p1x, p1y, p3x, p3y, p6x, p6y, p8x, p8y],
				[p8x, p8y, p7x, p7y, p5x, p5y, p2x, p2y]
			];
		},

		solveCubic: function (v, coord, val, roots, min, max) {
			var p1 = v[coord],
				c1 = v[coord + 2],
				c2 = v[coord + 4],
				p2 = v[coord + 6],
				c = 3 * (c1 - p1),
				b = 3 * (c2 - c1) - c,
				a = p2 - p1 - c - b;
			return Numerical.solveCubic(a, b, c, p1 - val, roots, min, max);
		},

		getParameterOf: function(v, point) {
			var p1 = new Point(v[0], v[1]),
				p2 = new Point(v[6], v[7]),
				epsilon = 1e-12,
				t = point.isClose(p1, epsilon) ? 0
				  : point.isClose(p2, epsilon) ? 1
				  : null;
			if (t !== null)
				return t;
			var coords = [point.x, point.y],
				roots = [],
				geomEpsilon = 2e-7;
			for (var c = 0; c < 2; c++) {
				var count = Curve.solveCubic(v, c, coords[c], roots, 0, 1);
				for (var i = 0; i < count; i++) {
					t = roots[i];
					if (point.isClose(Curve.getPoint(v, t), geomEpsilon))
						return t;
				}
			}
			return point.isClose(p1, geomEpsilon) ? 0
				 : point.isClose(p2, geomEpsilon) ? 1
				 : null;
		},

		getNearestParameter: function(v, point) {
			if (Curve.isStraight(v)) {
				var p1x = v[0], p1y = v[1],
					p2x = v[6], p2y = v[7],
					vx = p2x - p1x, vy = p2y - p1y,
					det = vx * vx + vy * vy;
				if (det === 0)
					return 0;
				var u = ((point.x - p1x) * vx + (point.y - p1y) * vy) / det;
				return u < 1e-12 ? 0
					 : u > 0.999999999999 ? 1
					 : Curve.getParameterOf(v,
						new Point(p1x + u * vx, p1y + u * vy));
			}

			var count = 100,
				minDist = Infinity,
				minT = 0;

			function refine(t) {
				if (t >= 0 && t <= 1) {
					var dist = point.getDistance(Curve.getPoint(v, t), true);
					if (dist < minDist) {
						minDist = dist;
						minT = t;
						return true;
					}
				}
			}

			for (var i = 0; i <= count; i++)
				refine(i / count);

			var step = 1 / (count * 2);
			while (step > 4e-7) {
				if (!refine(minT - step) && !refine(minT + step))
					step /= 2;
			}
			return minT;
		},

		getPart: function(v, from, to) {
			var flip = from > to;
			if (flip) {
				var tmp = from;
				from = to;
				to = tmp;
			}
			if (from > 0)
				v = Curve.subdivide(v, from)[1];
			if (to < 1)
				v = Curve.subdivide(v, (to - from) / (1 - from))[0];
			return flip
					? [v[6], v[7], v[4], v[5], v[2], v[3], v[0], v[1]]
					: v;
		},

		hasHandles: function(v) {
			var isZero = Numerical.isZero;
			return !(isZero(v[0] - v[2]) && isZero(v[1] - v[3])
					&& isZero(v[4] - v[6]) && isZero(v[5] - v[7]));
		},

		isFlatEnough: function(v, tolerance) {
			var p1x = v[0], p1y = v[1],
				c1x = v[2], c1y = v[3],
				c2x = v[4], c2y = v[5],
				p2x = v[6], p2y = v[7],
				ux = 3 * c1x - 2 * p1x - p2x,
				uy = 3 * c1y - 2 * p1y - p2y,
				vx = 3 * c2x - 2 * p2x - p1x,
				vy = 3 * c2y - 2 * p2y - p1y;
			return Math.max(ux * ux, vx * vx) + Math.max(uy * uy, vy * vy)
					< 10 * tolerance * tolerance;
		},

		getArea: function(v) {
			var p1x = v[0], p1y = v[1],
				p2x = v[6], p2y = v[7],
				h1x = (v[2] + p1x) / 2,
				h1y = (v[3] + p1y) / 2,
				h2x = (v[4] + v[6]) / 2,
				h2y = (v[5] + v[7]) / 2;
			return 6 * ((p1x - h1x) * (h1y + p1y)
					  + (h1x - h2x) * (h2y + h1y)
					  + (h2x - p2x) * (p2y + h2y)) / 10;
		},

		getBounds: function(v) {
			var min = v.slice(0, 2),
				max = min.slice(),
				roots = [0, 0];
			for (var i = 0; i < 2; i++)
				Curve._addBounds(v[i], v[i + 2], v[i + 4], v[i + 6],
						i, 0, min, max, roots);
			return new Rectangle(min[0], min[1], max[0] - min[0], max[1] - min[1]);
		},

		_addBounds: function(v0, v1, v2, v3, coord, padding, min, max, roots) {
			function add(value, padding) {
				var left = value - padding,
					right = value + padding;
				if (left < min[coord])
					min[coord] = left;
				if (right > max[coord])
					max[coord] = right;
			}
			var a = 3 * (v1 - v2) - v0 + v3,
				b = 2 * (v0 + v2) - 4 * v1,
				c = v1 - v0,
				count = Numerical.solveQuadratic(a, b, c, roots),
				tMin = 4e-7,
				tMax = 1 - tMin;
			add(v3, 0);
			for (var i = 0; i < count; i++) {
				var t = roots[i],
					u = 1 - t;
				if (tMin < t && t < tMax)
					add(u * u * u * v0
						+ 3 * u * u * t * v1
						+ 3 * u * t * t * v2
						+ t * t * t * v3,
						padding);
			}
		}
	}}, Base.each(
		['getBounds', 'getStrokeBounds', 'getHandleBounds', 'getRoughBounds'],
		function(name) {
			this[name] = function() {
				if (!this._bounds)
					this._bounds = {};
				var bounds = this._bounds[name];
				if (!bounds) {
					var path = this._path;
					bounds = this._bounds[name] = Path[name](
							[this._segment1, this._segment2], false,
							path && path.getStyle());
				}
				return bounds.clone();
			};
		},
	{

	}), Base.each({
		isStraight: function(l, h1, h2) {
			if (h1.isZero() && h2.isZero()) {
				return true;
			} else if (l.isZero()) {
				return false;
			} else if (h1.isCollinear(l) && h2.isCollinear(l)) {
				var div = l.dot(l),
					p1 = l.dot(h1) / div,
					p2 = l.dot(h2) / div;
				return p1 >= 0 && p1 <= 1 && p2 <= 0 && p2 >= -1;
			}
			return false;
		},

		isLinear: function(l, h1, h2) {
			var third = l.divide(3);
			return h1.equals(third) && h2.negate().equals(third);
		}
	}, function(test, name) {
		this[name] = function() {
			var seg1 = this._segment1,
				seg2 = this._segment2;
			return test(seg2._point.subtract(seg1._point),
					seg1._handleOut, seg2._handleIn);
		};

		this.statics[name] = function(v) {
			var p1x = v[0], p1y = v[1],
				p2x = v[6], p2y = v[7];
			return test(new Point(p2x - p1x, p2y - p1y),
					new Point(v[2] - p1x, v[3] - p1y),
					new Point(v[4] - p2x, v[5] - p2y));
		};
	}, {
		statics: {},

		hasHandles: function() {
			return !this._segment1._handleOut.isZero()
					|| !this._segment2._handleIn.isZero();
		},

		isCollinear: function(curve) {
			return curve && this.isStraight() && curve.isStraight()
					&& this.getLine().isCollinear(curve.getLine());
		},

		isHorizontal: function() {
			return this.isStraight() && Math.abs(this.getTangentAt(0.5, true).y)
					< 1e-7;
		},

		isVertical: function() {
			return this.isStraight() && Math.abs(this.getTangentAt(0.5, true).x)
					< 1e-7;
		}
	}), {
		beans: false,

		getParameterAt: function(offset, start) {
			return Curve.getParameterAt(this.getValues(), offset, start);
		},

		getParameterOf: function() {
			return Curve.getParameterOf(this.getValues(), Point.read(arguments));
		},

		getLocationAt: function(offset, isParameter) {
			var t = isParameter ? offset : this.getParameterAt(offset);
			return t != null && t >= 0 && t <= 1
					? new CurveLocation(this, t)
					: null;
		},

		getLocationOf: function() {
			return this.getLocationAt(this.getParameterOf(Point.read(arguments)),
					true);
		},

		getOffsetOf: function() {
			var loc = this.getLocationOf.apply(this, arguments);
			return loc ? loc.getOffset() : null;
		},

		getNearestLocation: function() {
			var point = Point.read(arguments),
				values = this.getValues(),
				t = Curve.getNearestParameter(values, point),
				pt = Curve.getPoint(values, t);
			return new CurveLocation(this, t, pt, null, point.getDistance(pt));
		},

		getNearestPoint: function() {
			return this.getNearestLocation.apply(this, arguments).getPoint();
		}

	},
	new function() {
		var methods = ['getPoint', 'getTangent', 'getNormal', 'getWeightedTangent',
			'getWeightedNormal', 'getCurvature'];
		return Base.each(methods,
		function(name) {
			this[name + 'At'] = function(offset, isParameter) {
				var values = this.getValues();
				return Curve[name](values, isParameter ? offset
						: Curve.getParameterAt(values, offset, 0));
			};
		}, {
			statics: {
				evaluateMethods: methods
			}
		})
	},
	new function() {

		function getLengthIntegrand(v) {
			var p1x = v[0], p1y = v[1],
				c1x = v[2], c1y = v[3],
				c2x = v[4], c2y = v[5],
				p2x = v[6], p2y = v[7],

				ax = 9 * (c1x - c2x) + 3 * (p2x - p1x),
				bx = 6 * (p1x + c2x) - 12 * c1x,
				cx = 3 * (c1x - p1x),

				ay = 9 * (c1y - c2y) + 3 * (p2y - p1y),
				by = 6 * (p1y + c2y) - 12 * c1y,
				cy = 3 * (c1y - p1y);

			return function(t) {
				var dx = (ax * t + bx) * t + cx,
					dy = (ay * t + by) * t + cy;
				return Math.sqrt(dx * dx + dy * dy);
			};
		}

		function getIterations(a, b) {
			return Math.max(2, Math.min(16, Math.ceil(Math.abs(b - a) * 32)));
		}

		function evaluate(v, t, type, normalized) {
			if (t == null || t < 0 || t > 1)
				return null;
			var p1x = v[0], p1y = v[1],
				c1x = v[2], c1y = v[3],
				c2x = v[4], c2y = v[5],
				p2x = v[6], p2y = v[7],
				tMin = 4e-7,
				tMax = 1 - tMin,
				x, y;

			if (type === 0 && (t < tMin || t > tMax)) {
				var isZero = t < tMin;
				x = isZero ? p1x : p2x;
				y = isZero ? p1y : p2y;
			} else {
				var cx = 3 * (c1x - p1x),
					bx = 3 * (c2x - c1x) - cx,
					ax = p2x - p1x - cx - bx,

					cy = 3 * (c1y - p1y),
					by = 3 * (c2y - c1y) - cy,
					ay = p2y - p1y - cy - by;
				if (type === 0) {
					x = ((ax * t + bx) * t + cx) * t + p1x;
					y = ((ay * t + by) * t + cy) * t + p1y;
				} else {
					if (t < tMin) {
						x = cx;
						y = cy;
					} else if (t > tMax) {
						x = 3 * (p2x - c2x);
						y = 3 * (p2y - c2y);
					} else {
						x = (3 * ax * t + 2 * bx) * t + cx;
						y = (3 * ay * t + 2 * by) * t + cy;
					}
					if (normalized) {
						if (x === 0 && y === 0 && (t < tMin || t > tMax)) {
							x = c2x - c1x;
							y = c2y - c1y;
						}
						var len = Math.sqrt(x * x + y * y);
						if (len) {
							x /= len;
							y /= len;
						}
					}
					if (type === 3) {
						var x2 = 6 * ax * t + 2 * bx,
							y2 = 6 * ay * t + 2 * by,
							d = Math.pow(x * x + y * y, 3 / 2);
						x = d !== 0 ? (x * y2 - y * x2) / d : 0;
						y = 0;
					}
				}
			}
			return type === 2 ? new Point(y, -x) : new Point(x, y);
		}

		return { statics: {

			getLength: function(v, a, b) {
				if (a === undefined)
					a = 0;
				if (b === undefined)
					b = 1;
				if (a === 0 && b === 1 && Curve.isStraight(v)) {
					var dx = v[6] - v[0],
						dy = v[7] - v[1];
					return Math.sqrt(dx * dx + dy * dy);
				}
				var ds = getLengthIntegrand(v);
				return Numerical.integrate(ds, a, b, getIterations(a, b));
			},

			getParameterAt: function(v, offset, start) {
				if (start === undefined)
					start = offset < 0 ? 1 : 0
				if (offset === 0)
					return start;
				var abs = Math.abs,
					forward = offset > 0,
					a = forward ? start : 0,
					b = forward ? 1 : start,
					ds = getLengthIntegrand(v),
					rangeLength = Numerical.integrate(ds, a, b,
							getIterations(a, b));
				if (abs(offset - rangeLength) < 1e-12) {
					return forward ? b : a;
				} else if (abs(offset) > rangeLength) {
					return null;
				}
				var guess = offset / rangeLength,
					length = 0;
				function f(t) {
					length += Numerical.integrate(ds, start, t,
							getIterations(start, t));
					start = t;
					return length - offset;
				}
				return Numerical.findRoot(f, ds, start + guess, a, b, 32,
						1e-12);
			},

			getPoint: function(v, t) {
				return evaluate(v, t, 0, false);
			},

			getTangent: function(v, t) {
				return evaluate(v, t, 1, true);
			},

			getWeightedTangent: function(v, t) {
				return evaluate(v, t, 1, false);
			},

			getNormal: function(v, t) {
				return evaluate(v, t, 2, true);
			},

			getWeightedNormal: function(v, t) {
				return evaluate(v, t, 2, false);
			},

			getCurvature: function(v, t) {
				return evaluate(v, t, 3, false).x;
			}
		}};
	},
	new function() {

		function addLocation(locations, param, v1, c1, t1, p1, v2, c2, t2, p2,
				overlap) {
			var startConnected = param.startConnected,
				endConnected = param.endConnected,
				tMin = 4e-7,
				tMax = 1 - tMin;
			if (t1 == null)
				t1 = Curve.getParameterOf(v1, p1);
			if (t1 !== null && t1 >= (startConnected ? tMin : 0) &&
				t1 <= (endConnected ? tMax : 1)) {
				if (t2 == null)
					t2 = Curve.getParameterOf(v2, p2);
				if (t2 !== null && t2 >= (endConnected ? tMin : 0) &&
					t2 <= (startConnected ? tMax : 1)) {
					var renormalize = param.renormalize;
					if (renormalize) {
						var res = renormalize(t1, t2);
						t1 = res[0];
						t2 = res[1];
					}
					var loc1 = new CurveLocation(c1, t1,
							p1 || Curve.getPoint(v1, t1), overlap),
						loc2 = new CurveLocation(c2, t2,
							p2 || Curve.getPoint(v2, t2), overlap),
						flip = loc1.getPath() === loc2.getPath()
							&& loc1.getIndex() > loc2.getIndex(),
						loc = flip ? loc2 : loc1,
						include = param.include;
					loc1._intersection = loc2;
					loc2._intersection = loc1;
					if (!include || include(loc)) {
						CurveLocation.insert(locations, loc, true);
					}
				}
			}
		}

		function addCurveIntersections(v1, v2, c1, c2, locations, param,
				tMin, tMax, uMin, uMax, oldTDiff, reverse, recursion) {
			if (++recursion >= 24)
				return;
			var q0x = v2[0], q0y = v2[1], q3x = v2[6], q3y = v2[7],
				getSignedDistance = Line.getSignedDistance,
				d1 = getSignedDistance(q0x, q0y, q3x, q3y, v2[2], v2[3]),
				d2 = getSignedDistance(q0x, q0y, q3x, q3y, v2[4], v2[5]),
				factor = d1 * d2 > 0 ? 3 / 4 : 4 / 9,
				dMin = factor * Math.min(0, d1, d2),
				dMax = factor * Math.max(0, d1, d2),
				dp0 = getSignedDistance(q0x, q0y, q3x, q3y, v1[0], v1[1]),
				dp1 = getSignedDistance(q0x, q0y, q3x, q3y, v1[2], v1[3]),
				dp2 = getSignedDistance(q0x, q0y, q3x, q3y, v1[4], v1[5]),
				dp3 = getSignedDistance(q0x, q0y, q3x, q3y, v1[6], v1[7]),
				hull = getConvexHull(dp0, dp1, dp2, dp3),
				top = hull[0],
				bottom = hull[1],
				tMinClip,
				tMaxClip;
			if ((tMinClip = clipConvexHull(top, bottom, dMin, dMax)) == null ||
				(tMaxClip = clipConvexHull(top.reverse(), bottom.reverse(),
					dMin, dMax)) == null)
				return;
			v1 = Curve.getPart(v1, tMinClip, tMaxClip);
			var tDiff = tMaxClip - tMinClip,
				tMinNew = tMin + (tMax - tMin) * tMinClip,
				tMaxNew = tMin + (tMax - tMin) * tMaxClip;
			if (oldTDiff > 0.5 && tDiff > 0.5) {
				if (tMaxNew - tMinNew > uMax - uMin) {
					var parts = Curve.subdivide(v1, 0.5),
						t = tMinNew + (tMaxNew - tMinNew) / 2;
					addCurveIntersections(
						v2, parts[0], c2, c1, locations, param,
						uMin, uMax, tMinNew, t, tDiff, !reverse, recursion);
					addCurveIntersections(
						v2, parts[1], c2, c1, locations, param,
						uMin, uMax, t, tMaxNew, tDiff, !reverse, recursion);
				} else {
					var parts = Curve.subdivide(v2, 0.5),
						t = uMin + (uMax - uMin) / 2;
					addCurveIntersections(
						parts[0], v1, c2, c1, locations, param,
						uMin, t, tMinNew, tMaxNew, tDiff, !reverse, recursion);
					addCurveIntersections(
						parts[1], v1, c2, c1, locations, param,
						t, uMax, tMinNew, tMaxNew, tDiff, !reverse, recursion);
				}
			} else if (Math.max(uMax - uMin, tMaxNew - tMinNew)
					< 1e-7) {
				var t1 = tMinNew + (tMaxNew - tMinNew) / 2,
					t2 = uMin + (uMax - uMin) / 2;
				v1 = c1.getValues();
				v2 = c2.getValues();
				addLocation(locations, param,
					reverse ? v2 : v1, reverse ? c2 : c1, reverse ? t2 : t1, null,
					reverse ? v1 : v2, reverse ? c1 : c2, reverse ? t1 : t2, null);
			} else if (tDiff > 1e-12) {
				addCurveIntersections(v2, v1, c2, c1, locations, param,
						uMin, uMax, tMinNew, tMaxNew, tDiff, !reverse, recursion);
			}
		}

		function getConvexHull(dq0, dq1, dq2, dq3) {
			var p0 = [ 0, dq0 ],
				p1 = [ 1 / 3, dq1 ],
				p2 = [ 2 / 3, dq2 ],
				p3 = [ 1, dq3 ],
				dist1 = dq1 - (2 * dq0 + dq3) / 3,
				dist2 = dq2 - (dq0 + 2 * dq3) / 3,
				hull;
			if (dist1 * dist2 < 0) {
				hull = [[p0, p1, p3], [p0, p2, p3]];
			} else {
				var distRatio = dist1 / dist2;
				hull = [
					distRatio >= 2 ? [p0, p1, p3]
					: distRatio <= .5 ? [p0, p2, p3]
					: [p0, p1, p2, p3],
					[p0, p3]
				];
			}
			return (dist1 || dist2) < 0 ? hull.reverse() : hull;
		}

		function clipConvexHull(hullTop, hullBottom, dMin, dMax) {
			if (hullTop[0][1] < dMin) {
				return clipConvexHullPart(hullTop, true, dMin);
			} else if (hullBottom[0][1] > dMax) {
				return clipConvexHullPart(hullBottom, false, dMax);
			} else {
				return hullTop[0][0];
			}
		}

		function clipConvexHullPart(part, top, threshold) {
			var px = part[0][0],
				py = part[0][1];
			for (var i = 1, l = part.length; i < l; i++) {
				var qx = part[i][0],
					qy = part[i][1];
				if (top ? qy >= threshold : qy <= threshold) {
					return qy === threshold ? qx
							: px + (threshold - py) * (qx - px) / (qy - py);
				}
				px = qx;
				py = qy;
			}
			return null;
		}

		function addCurveLineIntersections(v1, v2, c1, c2, locations, param) {
			var flip = Curve.isStraight(v1),
				vc = flip ? v2 : v1,
				vl = flip ? v1 : v2,
				lx1 = vl[0], ly1 = vl[1],
				lx2 = vl[6], ly2 = vl[7],
				ldx = lx2 - lx1,
				ldy = ly2 - ly1,
				angle = Math.atan2(-ldy, ldx),
				sin = Math.sin(angle),
				cos = Math.cos(angle),
				rvc = [];
			for(var i = 0; i < 8; i += 2) {
				var x = vc[i] - lx1,
					y = vc[i + 1] - ly1;
				rvc.push(
					x * cos - y * sin,
					x * sin + y * cos);
			}
			var roots = [],
				count = Curve.solveCubic(rvc, 1, 0, roots, 0, 1);
			for (var i = 0; i < count; i++) {
				var tc = roots[i],
					pc = Curve.getPoint(vc, tc),
					tl = Curve.getParameterOf(vl, pc);
				if (tl !== null) {
					var pl = Curve.getPoint(vl, tl),
						t1 = flip ? tl : tc,
						t2 = flip ? tc : tl;
					if (!param.endConnected || t2 > Numerical.CURVETIME_EPSILON) {
						addLocation(locations, param,
								v1, c1, t1, flip ? pl : pc,
								v2, c2, t2, flip ? pc : pl);
					}
				}
			}
		}

		function addLineIntersection(v1, v2, c1, c2, locations, param) {
			var pt = Line.intersect(
					v1[0], v1[1], v1[6], v1[7],
					v2[0], v2[1], v2[6], v2[7]);
			if (pt) {
				addLocation(locations, param, v1, c1, null, pt, v2, c2, null, pt);
			}
		}

		return { statics: {
			_getIntersections: function(v1, v2, c1, c2, locations, param) {
				if (!v2) {
					return Curve._getSelfIntersection(v1, c1, locations, param);
				}
				var c1p1x = v1[0], c1p1y = v1[1],
					c1p2x = v1[6], c1p2y = v1[7],
					c2p1x = v2[0], c2p1y = v2[1],
					c2p2x = v2[6], c2p2y = v2[7],
					c1s1x = (3 * v1[2] + c1p1x) / 4,
					c1s1y = (3 * v1[3] + c1p1y) / 4,
					c1s2x = (3 * v1[4] + c1p2x) / 4,
					c1s2y = (3 * v1[5] + c1p2y) / 4,
					c2s1x = (3 * v2[2] + c2p1x) / 4,
					c2s1y = (3 * v2[3] + c2p1y) / 4,
					c2s2x = (3 * v2[4] + c2p2x) / 4,
					c2s2y = (3 * v2[5] + c2p2y) / 4,
					min = Math.min,
					max = Math.max;
				if (!(	max(c1p1x, c1s1x, c1s2x, c1p2x) >=
						min(c2p1x, c2s1x, c2s2x, c2p2x) &&
						min(c1p1x, c1s1x, c1s2x, c1p2x) <=
						max(c2p1x, c2s1x, c2s2x, c2p2x) &&
						max(c1p1y, c1s1y, c1s2y, c1p2y) >=
						min(c2p1y, c2s1y, c2s2y, c2p2y) &&
						min(c1p1y, c1s1y, c1s2y, c1p2y) <=
						max(c2p1y, c2s1y, c2s2y, c2p2y)))
					return locations;
				if (!param.startConnected && !param.endConnected) {
					var overlaps = Curve.getOverlaps(v1, v2);
					if (overlaps) {
						for (var i = 0; i < 2; i++) {
							var overlap = overlaps[i];
							addLocation(locations, param,
								v1, c1, overlap[0], null,
								v2, c2, overlap[1], null, true);
						}
						return locations;
					}
				}

				var straight1 = Curve.isStraight(v1),
					straight2 = Curve.isStraight(v2),
					straight = straight1 && straight2,
					epsilon = 1e-12,
					before = locations.length;
				(straight
					? addLineIntersection
					: straight1 || straight2
						? addCurveLineIntersections
						: addCurveIntersections)(
							v1, v2, c1, c2, locations, param,
							0, 1, 0, 1, 0, false, 0);
				if (straight && locations.length > before)
					return locations;
				var c1p1 = new Point(c1p1x, c1p1y),
					c1p2 = new Point(c1p2x, c1p2y),
					c2p1 = new Point(c2p1x, c2p1y),
					c2p2 = new Point(c2p2x, c2p2y);
				if (c1p1.isClose(c2p1, epsilon))
					addLocation(locations, param, v1, c1, 0, c1p1, v2, c2, 0, c2p1);
				if (!param.startConnected && c1p1.isClose(c2p2, epsilon))
					addLocation(locations, param, v1, c1, 0, c1p1, v2, c2, 1, c2p2);
				if (!param.endConnected && c1p2.isClose(c2p1, epsilon))
					addLocation(locations, param, v1, c1, 1, c1p2, v2, c2, 0, c2p1);
				if (c1p2.isClose(c2p2, epsilon))
					addLocation(locations, param, v1, c1, 1, c1p2, v2, c2, 1, c2p2);
				return locations;
			},

			_getSelfIntersection: function(v1, c1, locations, param) {
				var p1x = v1[0], p1y = v1[1],
					h1x = v1[2], h1y = v1[3],
					h2x = v1[4], h2y = v1[5],
					p2x = v1[6], p2y = v1[7];
				var line = new Line(p1x, p1y, p2x, p2y, false),
					side1 = line.getSide(new Point(h1x, h1y), true),
					side2 = line.getSide(new Point(h2x, h2y), true);
				if (side1 === side2) {
					var edgeSum = (p1x - h2x) * (h1y - p2y)
								+ (h1x - p2x) * (h2y - p1y);
					if (edgeSum * side1 > 0)
						return locations;
				}
				var ax = p2x - 3 * h2x + 3 * h1x - p1x,
					bx = h2x - 2 * h1x + p1x,
					cx = h1x - p1x,
					ay = p2y - 3 * h2y + 3 * h1y - p1y,
					by = h2y - 2 * h1y + p1y,
					cy = h1y - p1y,
					ac = ay * cx - ax * cy,
					ab = ay * bx - ax * by,
					bc = by * cx - bx * cy;
				if (ac * ac - 4 * ab * bc < 0) {
					var roots = [],
						tSplit,
						count = Numerical.solveCubic(
								ax * ax	 + ay * ay,
								3 * (ax * bx + ay * by),
								2 * (bx * bx + by * by) + ax * cx + ay * cy,
								bx * cx + by * cy,
								roots, 0, 1);
					if (count > 0) {
						for (var i = 0, maxCurvature = 0; i < count; i++) {
							var curvature = Math.abs(
									c1.getCurvatureAt(roots[i], true));
							if (curvature > maxCurvature) {
								maxCurvature = curvature;
								tSplit = roots[i];
							}
						}
						var parts = Curve.subdivide(v1, tSplit);
						param.endConnected = true;
						param.renormalize = function(t1, t2) {
							return [t1 * tSplit, t2 * (1 - tSplit) + tSplit];
						};
						Curve._getIntersections(parts[0], parts[1], c1, c1,
								locations, param);
					}
				}
				return locations;
			},

			getOverlaps: function(v1, v2) {
				var abs = Math.abs,
					timeEpsilon = 4e-7,
					geomEpsilon = 2e-7,
					straight1 = Curve.isStraight(v1),
					straight2 = Curve.isStraight(v2),
					straight =	straight1 && straight2;

				function getLineLengthSquared(v) {
					var x = v[6] - v[0],
						y = v[7] - v[1];
					return x * x + y * y;
				}

				if (straight) {
					var flip = getLineLengthSquared(v1) < getLineLengthSquared(v2),
						l1 = flip ? v2 : v1,
						l2 = flip ? v1 : v2,
						line = new Line(l1[0], l1[1], l1[6], l1[7]);
					if (line.getDistance(new Point(l2[0], l2[1])) > geomEpsilon ||
						line.getDistance(new Point(l2[6], l2[7])) > geomEpsilon)
						return null;
				} else if (straight1 ^ straight2) {
					return null;
				}

				var v = [v1, v2],
					pairs = [];
				for (var i = 0, t1 = 0;
						i < 2 && pairs.length < 2;
						i += t1 === 0 ? 0 : 1, t1 = t1 ^ 1) {
					var t2 = Curve.getParameterOf(v[i ^ 1], new Point(
							v[i][t1 === 0 ? 0 : 6],
							v[i][t1 === 0 ? 1 : 7]));
					if (t2 != null) {
						var pair = i === 0 ? [t1, t2] : [t2, t1];
						if (pairs.length === 0 ||
							abs(pair[0] - pairs[0][0]) > timeEpsilon &&
							abs(pair[1] - pairs[0][1]) > timeEpsilon)
							pairs.push(pair);
					}
					if (i === 1 && pairs.length === 0)
						break;
				}
				if (pairs.length !== 2) {
					pairs = null;
				} else if (!straight) {
					var o1 = Curve.getPart(v1, pairs[0][0], pairs[1][0]),
						o2 = Curve.getPart(v2, pairs[0][1], pairs[1][1]);
					if (abs(o2[2] - o1[2]) > geomEpsilon ||
						abs(o2[3] - o1[3]) > geomEpsilon ||
						abs(o2[4] - o1[4]) > geomEpsilon ||
						abs(o2[5] - o1[5]) > geomEpsilon)
						pairs = null;
				}
				return pairs;
			}
		}};
	});

	var CurveLocation = Base.extend({
		_class: 'CurveLocation',
		beans: true,

		initialize: function CurveLocation(curve, parameter, point,
				_overlap, _distance) {
			if (parameter > 0.9999996) {
				var next = curve.getNext();
				if (next) {
					parameter = 0;
					curve = next;
				}
			}
			this._id = UID.get(CurveLocation);
			this._setCurve(curve);
			this._parameter = parameter;
			this._point = point || curve.getPointAt(parameter, true);
			this._overlap = _overlap;
			this._distance = _distance;
			this._intersection = this._next = this._prev = null;
		},

		_setCurve: function(curve) {
			var path = curve._path;
			this._version = path ? path._version : 0;
			this._curve = curve;
			this._segment = null;
			this._segment1 = curve._segment1;
			this._segment2 = curve._segment2;
		},

		_setSegment: function(segment) {
			this._setCurve(segment.getCurve());
			this._segment = segment;
			this._parameter = segment === this._segment1 ? 0 : 1;
			this._point = segment._point.clone();
		},

		getSegment: function() {
			var curve = this.getCurve(),
				segment = this._segment;
			if (!segment) {
				var parameter = this.getParameter();
				if (parameter === 0) {
					segment = curve._segment1;
				} else if (parameter === 1) {
					segment = curve._segment2;
				} else if (parameter != null) {
					segment = curve.getPartLength(0, parameter)
						< curve.getPartLength(parameter, 1)
							? curve._segment1
							: curve._segment2;
				}
				this._segment = segment;
			}
			return segment;
		},

		getCurve: function() {
			var curve = this._curve,
				path = curve && curve._path,
				that = this;
			if (path && path._version !== this._version) {
				curve = this._parameter = this._curve = this._offset = null;
			}

			function trySegment(segment) {
				var curve = segment && segment.getCurve();
				if (curve && (that._parameter = curve.getParameterOf(that._point))
						!= null) {
					that._setCurve(curve);
					that._segment = segment;
					return curve;
				}
			}

			return curve
				|| trySegment(this._segment)
				|| trySegment(this._segment1)
				|| trySegment(this._segment2.getPrevious());
		},

		getPath: function() {
			var curve = this.getCurve();
			return curve && curve._path;
		},

		getIndex: function() {
			var curve = this.getCurve();
			return curve && curve.getIndex();
		},

		getParameter: function() {
			var curve = this.getCurve(),
				parameter = this._parameter;
			return curve && parameter == null
				? this._parameter = curve.getParameterOf(this._point)
				: parameter;
		},

		getPoint: function() {
			return this._point;
		},

		getOffset: function() {
			var offset = this._offset;
			if (offset == null) {
				offset = 0;
				var path = this.getPath(),
					index = this.getIndex();
				if (path && index != null) {
					var curves = path.getCurves();
					for (var i = 0; i < index; i++)
						offset += curves[i].getLength();
				}
				this._offset = offset += this.getCurveOffset();
			}
			return offset;
		},

		getCurveOffset: function() {
			var curve = this.getCurve(),
				parameter = this.getParameter();
			return parameter != null && curve && curve.getPartLength(0, parameter);
		},

		getIntersection: function() {
			return this._intersection;
		},

		getDistance: function() {
			return this._distance;
		},

		divide: function() {
			var curve = this.getCurve(),
				res = null;
			if (curve) {
				res = curve.divide(this.getParameter(), true);
				if (res)
					this._setSegment(res._segment1);
			}
			return res;
		},

		split: function() {
			var curve = this.getCurve();
			return curve ? curve.split(this.getParameter(), true) : null;
		},

		equals: function(loc, _ignoreOther) {
			var res = this === loc,
				epsilon = 2e-7;
			if (!res && loc instanceof CurveLocation
					&& this.getPath() === loc.getPath()
					&& this.getPoint().isClose(loc.getPoint(), epsilon)) {
				var c1 = this.getCurve(),
					c2 = loc.getCurve(),
					abs = Math.abs,
					diff = abs(
						((c1.isLast() && c2.isFirst() ? -1 : c1.getIndex())
								+ this.getParameter()) -
						((c2.isLast() && c1.isFirst() ? -1 : c2.getIndex())
								+ loc.getParameter()));
				res = (diff < 4e-7
					|| ((diff = abs(this.getOffset() - loc.getOffset())) < epsilon
						|| abs(this.getPath().getLength() - diff) < epsilon))
					&& (_ignoreOther
						|| (!this._intersection && !loc._intersection
							|| this._intersection && this._intersection.equals(
									loc._intersection, true)));
			}
			return res;
		},

		toString: function() {
			var parts = [],
				point = this.getPoint(),
				f = Formatter.instance;
			if (point)
				parts.push('point: ' + point);
			var index = this.getIndex();
			if (index != null)
				parts.push('index: ' + index);
			var parameter = this.getParameter();
			if (parameter != null)
				parts.push('parameter: ' + f.number(parameter));
			if (this._distance != null)
				parts.push('distance: ' + f.number(this._distance));
			return '{ ' + parts.join(', ') + ' }';
		},

		isTouching: function() {
			var inter = this._intersection;
			if (inter && this.getTangent().isCollinear(inter.getTangent())) {
				var curve1 = this.getCurve(),
					curve2 = inter.getCurve();
				return !(curve1.isStraight() && curve2.isStraight()
						&& curve1.getLine().intersect(curve2.getLine()));
			}
			return false;
		},

		isCrossing: function() {
			var inter = this._intersection;
			if (!inter)
				return false;
			var t1 = this.getParameter(),
				t2 = inter.getParameter(),
				tMin = 4e-7,
				tMax = 1 - tMin;
			if (t1 >= tMin && t1 <= tMax || t2 >= tMin && t2 <= tMax)
				return !this.isTouching();
			var c2 = this.getCurve(),
				c1 = c2.getPrevious(),
				c4 = inter.getCurve(),
				c3 = c4.getPrevious(),
				PI = Math.PI;
			if (!c1 || !c3)
				return false;

			function isInRange(angle, min, max) {
				return min < max
					? angle > min && angle < max
					: angle > min && angle <= PI || angle >= -PI && angle < max;
			}

			var a1 = c1.getTangentAt(tMax, true).negate().getAngleInRadians(),
				a2 = c2.getTangentAt(tMin, true).getAngleInRadians(),
				a3 = c3.getTangentAt(tMax, true).negate().getAngleInRadians(),
				a4 = c4.getTangentAt(tMin, true).getAngleInRadians();

			return (isInRange(a3, a1, a2) ^ isInRange(a4, a1, a2))
				&& (isInRange(a3, a2, a1) ^ isInRange(a4, a2, a1));
		},

		isOverlap: function() {
			return !!this._overlap;
		}
	}, Base.each(Curve.evaluateMethods, function(name) {
		var get = name + 'At';
		this[name] = function() {
			var parameter = this.getParameter(),
				curve = this.getCurve();
			return parameter != null && curve && curve[get](parameter, true);
		};
	}, {
		preserve: true
	}),
	new function() {

		function insert(locations, loc, merge) {
			var length = locations.length,
				l = 0,
				r = length - 1;

			function search(index, dir) {
				for (var i = index + dir; i >= -1 && i <= length; i += dir) {
					var loc2 = locations[((i % length) + length) % length];
					if (!loc.getPoint().isClose(loc2.getPoint(),
							2e-7))
						break;
					if (loc.equals(loc2))
						return loc2;
				}
				return null;
			}

			while (l <= r) {
				var m = (l + r) >>> 1,
					loc2 = locations[m],
					found;
				if (merge && (found = loc.equals(loc2) ? loc2
						: (search(m, -1) || search(m, 1)))) {
					if (loc._overlap) {
						found._overlap = found._intersection._overlap = true;
					}
					return found;
				}
			var path1 = loc.getPath(),
				path2 = loc2.getPath(),
				diff = path1 === path2
					? (loc.getIndex() + loc.getParameter())
					- (loc2.getIndex() + loc2.getParameter())
					: path1._id - path2._id;
				if (diff < 0) {
					r = m - 1;
				} else {
					l = m + 1;
				}
			}
			locations.splice(l, 0, loc);
			return loc;
		}

		return { statics: {
			insert: insert,

			expand: function(locations) {
				var expanded = locations.slice();
				for (var i = 0, l = locations.length; i < l; i++) {
					insert(expanded, locations[i]._intersection, false);
				}
				return expanded;
			}
		}};
	});

	var PathItem = Item.extend({
		_class: 'PathItem',

		initialize: function PathItem() {
		},

		getIntersections: function(path, include, _matrix, _returnFirst) {
			var self = this === path || !path,
				matrix1 = this._matrix.orNullIfIdentity(),
				matrix2 = self ? matrix1
					: (_matrix || path._matrix).orNullIfIdentity();
			if (!self && !this.getBounds(matrix1).touches(path.getBounds(matrix2)))
				return [];
			var curves1 = this.getCurves(),
				curves2 = self ? curves1 : path.getCurves(),
				length1 = curves1.length,
				length2 = self ? length1 : curves2.length,
				values2 = [],
				arrays = [],
				locations,
				path;
			for (var i = 0; i < length2; i++)
				values2[i] = curves2[i].getValues(matrix2);
			for (var i = 0; i < length1; i++) {
				var curve1 = curves1[i],
					values1 = self ? values2[i] : curve1.getValues(matrix1),
					path1 = curve1.getPath();
				if (path1 !== path) {
					path = path1;
					locations = [];
					arrays.push(locations);
				}
				if (self) {
					Curve._getSelfIntersection(values1, curve1, locations, {
						include: include,
						startConnected: length1 === 1 &&
								curve1.getPoint1().equals(curve1.getPoint2())
					});
				}
				for (var j = self ? i + 1 : 0; j < length2; j++) {
					if (_returnFirst && locations.length)
						return locations;
					var curve2 = curves2[j];
					Curve._getIntersections(
						values1, values2[j], curve1, curve2, locations,
						{
							include: include,
							startConnected: self && curve1.getPrevious() === curve2,
							endConnected: self && curve1.getNext() === curve2
						}
					);
				}
			}
			locations = [];
			for (var i = 0, l = arrays.length; i < l; i++) {
				locations.push.apply(locations, arrays[i]);
			}
			return locations;
		},

		getCrossings: function(path) {
			return this.getIntersections(path, function(inter) {
				return inter.isCrossing();
			});
		},

		_asPathItem: function() {
			return this;
		},

		setPathData: function(data) {

			var parts = data.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/ig),
				coords,
				relative = false,
				previous,
				control,
				current = new Point(),
				start = new Point();

			function getCoord(index, coord) {
				var val = +coords[index];
				if (relative)
					val += current[coord];
				return val;
			}

			function getPoint(index) {
				return new Point(
					getCoord(index, 'x'),
					getCoord(index + 1, 'y')
				);
			}

			this.clear();

			for (var i = 0, l = parts && parts.length; i < l; i++) {
				var part = parts[i],
					command = part[0],
					lower = command.toLowerCase();
				coords = part.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g);
				var length = coords && coords.length;
				relative = command === lower;
				if (previous === 'z' && !/[mz]/.test(lower))
					this.moveTo(current = start);
				switch (lower) {
				case 'm':
				case 'l':
					var move = lower === 'm';
					for (var j = 0; j < length; j += 2)
						this[j === 0 && move ? 'moveTo' : 'lineTo'](
								current = getPoint(j));
					control = current;
					if (move)
						start = current;
					break;
				case 'h':
				case 'v':
					var coord = lower === 'h' ? 'x' : 'y';
					for (var j = 0; j < length; j++) {
						current[coord] = getCoord(j, coord);
						this.lineTo(current);
					}
					control = current;
					break;
				case 'c':
					for (var j = 0; j < length; j += 6) {
						this.cubicCurveTo(
								getPoint(j),
								control = getPoint(j + 2),
								current = getPoint(j + 4));
					}
					break;
				case 's':
					for (var j = 0; j < length; j += 4) {
						this.cubicCurveTo(
								/[cs]/.test(previous)
										? current.multiply(2).subtract(control)
										: current,
								control = getPoint(j),
								current = getPoint(j + 2));
						previous = lower;
					}
					break;
				case 'q':
					for (var j = 0; j < length; j += 4) {
						this.quadraticCurveTo(
								control = getPoint(j),
								current = getPoint(j + 2));
					}
					break;
				case 't':
					for (var j = 0; j < length; j += 2) {
						this.quadraticCurveTo(
								control = (/[qt]/.test(previous)
										? current.multiply(2).subtract(control)
										: current),
								current = getPoint(j));
						previous = lower;
					}
					break;
				case 'a':
					for (var j = 0; j < length; j += 7) {
						this.arcTo(current = getPoint(j + 5),
								new Size(+coords[j], +coords[j + 1]),
								+coords[j + 2], +coords[j + 4], +coords[j + 3]);
					}
					break;
				case 'z':
					this.closePath(true);
					break;
				}
				previous = lower;
			}
		},

		_canComposite: function() {
			return !(this.hasFill() && this.hasStroke());
		},

		_contains: function(point) {
			var winding = this._getWinding(point, false, true);
			return !!(this.getWindingRule() === 'evenodd' ? winding & 1 : winding);
		}

	});

	var Path = PathItem.extend({
		_class: 'Path',
		_serializeFields: {
			segments: [],
			closed: false
		},

		initialize: function Path(arg) {
			this._closed = false;
			this._segments = [];
			this._version = 0;
			var segments = Array.isArray(arg)
				? typeof arg[0] === 'object'
					? arg
					: arguments
				: arg && (arg.size === undefined && (arg.x !== undefined
						|| arg.point !== undefined))
					? arguments
					: null;
			if (segments && segments.length > 0) {
				this.setSegments(segments);
			} else {
				this._curves = undefined;
				this._selectedSegmentState = 0;
				if (!segments && typeof arg === 'string') {
					this.setPathData(arg);
					arg = null;
				}
			}
			this._initialize(!segments && arg);
		},

		_equals: function(item) {
			return this._closed === item._closed
					&& Base.equals(this._segments, item._segments);
		},

		clone: function(insert) {
			var copy = new Path(Item.NO_INSERT);
			copy.setSegments(this._segments);
			copy._closed = this._closed;
			if (this._clockwise !== undefined)
				copy._clockwise = this._clockwise;
			return this._clone(copy, insert);
		},

		_changed: function _changed(flags) {
			_changed.base.call(this, flags);
			if (flags & 8) {
				var parent = this._parent;
				if (parent)
					parent._currentPath = undefined;
				this._length = this._area = this._clockwise = this._monoCurves =
						undefined;
				if (flags & 16) {
					this._version++;
				} else if (this._curves) {
				   for (var i = 0, l = this._curves.length; i < l; i++)
						this._curves[i]._changed();
				}
			} else if (flags & 32) {
				this._bounds = undefined;
			}
		},

		getStyle: function() {
			var parent = this._parent;
			return (parent instanceof CompoundPath ? parent : this)._style;
		},

		getSegments: function() {
			return this._segments;
		},

		setSegments: function(segments) {
			var fullySelected = this.isFullySelected();
			this._segments.length = 0;
			this._selectedSegmentState = 0;
			this._curves = undefined;
			if (segments && segments.length > 0)
				this._add(Segment.readAll(segments));
			if (fullySelected)
				this.setFullySelected(true);
		},

		getFirstSegment: function() {
			return this._segments[0];
		},

		getLastSegment: function() {
			return this._segments[this._segments.length - 1];
		},

		getCurves: function() {
			var curves = this._curves,
				segments = this._segments;
			if (!curves) {
				var length = this._countCurves();
				curves = this._curves = new Array(length);
				for (var i = 0; i < length; i++)
					curves[i] = new Curve(this, segments[i],
						segments[i + 1] || segments[0]);
			}
			return curves;
		},

		getFirstCurve: function() {
			return this.getCurves()[0];
		},

		getLastCurve: function() {
			var curves = this.getCurves();
			return curves[curves.length - 1];
		},

		isClosed: function() {
			return this._closed;
		},

		setClosed: function(closed) {
			if (this._closed != (closed = !!closed)) {
				this._closed = closed;
				if (this._curves) {
					var length = this._curves.length = this._countCurves();
					if (closed)
						this._curves[length - 1] = new Curve(this,
							this._segments[length - 1], this._segments[0]);
				}
				this._changed(25);
			}
		}
	}, {
		beans: true,

		getPathData: function(_matrix, _precision) {
			var segments = this._segments,
				length = segments.length,
				f = new Formatter(_precision),
				coords = new Array(6),
				first = true,
				curX, curY,
				prevX, prevY,
				inX, inY,
				outX, outY,
				parts = [];

			function addSegment(segment, skipLine) {
				segment._transformCoordinates(_matrix, coords, false);
				curX = coords[0];
				curY = coords[1];
				if (first) {
					parts.push('M' + f.pair(curX, curY));
					first = false;
				} else {
					inX = coords[2];
					inY = coords[3];
					if (inX === curX && inY === curY
							&& outX === prevX && outY === prevY) {
						if (!skipLine)
							parts.push('l' + f.pair(curX - prevX, curY - prevY));
					} else {
						parts.push('c' + f.pair(outX - prevX, outY - prevY)
								+ ' ' + f.pair(inX - prevX, inY - prevY)
								+ ' ' + f.pair(curX - prevX, curY - prevY));
					}
				}
				prevX = curX;
				prevY = curY;
				outX = coords[4];
				outY = coords[5];
			}

			if (length === 0)
				return '';

			for (var i = 0; i < length; i++)
				addSegment(segments[i]);
			if (this._closed && length > 0) {
				addSegment(segments[0], true);
				parts.push('z');
			}
			return parts.join('');
		}
	}, {

		isEmpty: function() {
			return this._segments.length === 0;
		},

		_transformContent: function(matrix) {
			var coords = new Array(6);
			for (var i = 0, l = this._segments.length; i < l; i++)
				this._segments[i]._transformCoordinates(matrix, coords, true);
			return true;
		},

		_add: function(segs, index) {
			var segments = this._segments,
				curves = this._curves,
				amount = segs.length,
				append = index == null,
				index = append ? segments.length : index;
			for (var i = 0; i < amount; i++) {
				var segment = segs[i];
				if (segment._path)
					segment = segs[i] = segment.clone();
				segment._path = this;
				segment._index = index + i;
				if (segment._selectionState)
					this._updateSelection(segment, 0, segment._selectionState);
			}
			if (append) {
				segments.push.apply(segments, segs);
			} else {
				segments.splice.apply(segments, [index, 0].concat(segs));
				for (var i = index + amount, l = segments.length; i < l; i++)
					segments[i]._index = i;
			}
			if (curves) {
				var total = this._countCurves(),
					from = index + amount - 1 === total ? index - 1 : index,
					start = from,
					to = Math.min(from + amount, total);
				if (segs._curves) {
					curves.splice.apply(curves, [from, 0].concat(segs._curves));
					start += segs._curves.length;
				}
				for (var i = start; i < to; i++)
					curves.splice(i, 0, new Curve(this, null, null));
				this._adjustCurves(from, to);
			}
			this._changed(25);
			return segs;
		},

		_adjustCurves: function(from, to) {
			var segments = this._segments,
				curves = this._curves,
				curve;
			for (var i = from; i < to; i++) {
				curve = curves[i];
				curve._path = this;
				curve._segment1 = segments[i];
				curve._segment2 = segments[i + 1] || segments[0];
				curve._changed();
			}
			if (curve = curves[this._closed && from === 0 ? segments.length - 1
					: from - 1]) {
				curve._segment2 = segments[from] || segments[0];
				curve._changed();
			}
			if (curve = curves[to]) {
				curve._segment1 = segments[to];
				curve._changed();
			}
		},

		_countCurves: function() {
			var length = this._segments.length;
			return !this._closed && length > 0 ? length - 1 : length;
		},

		add: function(segment1 ) {
			return arguments.length > 1 && typeof segment1 !== 'number'
				? this._add(Segment.readAll(arguments))
				: this._add([ Segment.read(arguments) ])[0];
		},

		insert: function(index, segment1 ) {
			return arguments.length > 2 && typeof segment1 !== 'number'
				? this._add(Segment.readAll(arguments, 1), index)
				: this._add([ Segment.read(arguments, 1) ], index)[0];
		},

		addSegment: function() {
			return this._add([ Segment.read(arguments) ])[0];
		},

		insertSegment: function(index ) {
			return this._add([ Segment.read(arguments, 1) ], index)[0];
		},

		addSegments: function(segments) {
			return this._add(Segment.readAll(segments));
		},

		insertSegments: function(index, segments) {
			return this._add(Segment.readAll(segments), index);
		},

		removeSegment: function(index) {
			return this.removeSegments(index, index + 1)[0] || null;
		},

		removeSegments: function(from, to, _includeCurves) {
			from = from || 0;
			to = Base.pick(to, this._segments.length);
			var segments = this._segments,
				curves = this._curves,
				count = segments.length,
				removed = segments.splice(from, to - from),
				amount = removed.length;
			if (!amount)
				return removed;
			for (var i = 0; i < amount; i++) {
				var segment = removed[i];
				if (segment._selectionState)
					this._updateSelection(segment, segment._selectionState, 0);
				segment._index = segment._path = null;
			}
			for (var i = from, l = segments.length; i < l; i++)
				segments[i]._index = i;
			if (curves) {
				var index = from > 0 && to === count + (this._closed ? 1 : 0)
						? from - 1
						: from,
					curves = curves.splice(index, amount);
				if (_includeCurves)
					removed._curves = curves.slice(1);
				this._adjustCurves(index, index);
			}
			this._changed(25);
			return removed;
		},

		clear: '#removeSegments',

		hasHandles: function() {
			var segments = this._segments;
			for (var i = 0, l = segments.length; i < l; i++) {
				if (segments[i].hasHandles())
					return true;
			}
			return false;
		},

		clearHandles: function() {
			var segments = this._segments;
			for (var i = 0, l = segments.length; i < l; i++)
				segments[i].clearHandles();
		},

		getLength: function() {
			if (this._length == null) {
				var curves = this.getCurves(),
					length = 0;
				for (var i = 0, l = curves.length; i < l; i++)
					length += curves[i].getLength();
				this._length = length;
			}
			return this._length;
		},

		getArea: function() {
			if (this._area == null) {
				var segments = this._segments,
					count = segments.length,
					last = count - 1,
					area = 0;
				for (var i = 0, l = this._closed ? count : last; i < l; i++) {
					area += Curve.getArea(Curve.getValues(
							segments[i], segments[i < last ? i + 1 : 0]));
				}
				this._area = area;
			}
			return this._area;
		},

		isClockwise: function() {
			if (this._clockwise !== undefined)
				return this._clockwise;
			return this.getArea() >= 0;
		},

		setClockwise: function(clockwise) {
			if (this.isClockwise() != (clockwise = !!clockwise))
				this.reverse();
			this._clockwise = clockwise;
		},

		isFullySelected: function() {
			var length = this._segments.length;
			return this._selected && length > 0 && this._selectedSegmentState
					=== length * 7;
		},

		setFullySelected: function(selected) {
			if (selected)
				this._selectSegments(true);
			this.setSelected(selected);
		},

		setSelected: function setSelected(selected) {
			if (!selected)
				this._selectSegments(false);
			setSelected.base.call(this, selected);
		},

		_selectSegments: function(selected) {
			var length = this._segments.length;
			this._selectedSegmentState = selected
					? length * 7 : 0;
			for (var i = 0; i < length; i++)
				this._segments[i]._selectionState = selected
						? 7 : 0;
		},

		_updateSelection: function(segment, oldState, newState) {
			segment._selectionState = newState;
			var total = this._selectedSegmentState += newState - oldState;
			if (total > 0)
				this.setSelected(true);
		},

		flatten: function(maxDistance) {
			var iterator = new PathIterator(this, 64, 0.1),
				pos = 0,
				step = iterator.length / Math.ceil(iterator.length / maxDistance),
				end = iterator.length + (this._closed ? -step : step) / 2;
			var segments = [];
			while (pos <= end) {
				segments.push(new Segment(iterator.getPointAt(pos)));
				pos += step;
			}
			this.setSegments(segments);
		},

		reduce: function() {
			var curves = this.getCurves();
			for (var i = curves.length - 1; i >= 0; i--) {
				var curve = curves[i];
				if (!curve.hasHandles() && (curve.getLength() === 0
						|| curve.isCollinear(curve.getNext())))
					curve.remove();
			}
			return this;
		},

		simplify: function(tolerance) {
			if (this._segments.length > 2) {
				var fitter = new PathFitter(this, tolerance || 2.5);
				this.setSegments(fitter.fit());
			}
		},

		split: function(index, parameter) {
			if (parameter === null)
				return null;
			if (arguments.length === 1) {
				var arg = index;
				if (typeof arg === 'number')
					arg = this.getLocationAt(arg);
				if (!arg)
					return null
				index = arg.index;
				parameter = arg.parameter;
			}
			var tMin = 4e-7,
				tMax = 1 - tMin;
			if (parameter >= tMax) {
				index++;
				parameter--;
			}
			var curves = this.getCurves();
			if (index >= 0 && index < curves.length) {
				if (parameter >= tMin) {
					curves[index++].divide(parameter, true);
				}
				var segs = this.removeSegments(index, this._segments.length, true),
					path;
				if (this._closed) {
					this.setClosed(false);
					path = this;
				} else {
					path = new Path(Item.NO_INSERT);
					path.insertAbove(this, true);
					this._clone(path);
				}
				path._add(segs, 0);
				this.addSegment(segs[0]);
				return path;
			}
			return null;
		},

		reverse: function() {
			this._segments.reverse();
			for (var i = 0, l = this._segments.length; i < l; i++) {
				var segment = this._segments[i];
				var handleIn = segment._handleIn;
				segment._handleIn = segment._handleOut;
				segment._handleOut = handleIn;
				segment._index = i;
			}
			this._curves = null;
			if (this._clockwise !== undefined)
				this._clockwise = !this._clockwise;
			this._changed(9);
		},

		join: function(path) {
			if (path) {
				var segments = path._segments,
					last1 = this.getLastSegment(),
					last2 = path.getLastSegment();
				if (!last2)
					return this;
				if (last1 && last1._point.equals(last2._point))
					path.reverse();
				var first2 = path.getFirstSegment();
				if (last1 && last1._point.equals(first2._point)) {
					last1.setHandleOut(first2._handleOut);
					this._add(segments.slice(1));
				} else {
					var first1 = this.getFirstSegment();
					if (first1 && first1._point.equals(first2._point))
						path.reverse();
					last2 = path.getLastSegment();
					if (first1 && first1._point.equals(last2._point)) {
						first1.setHandleIn(last2._handleIn);
						this._add(segments.slice(0, segments.length - 1), 0);
					} else {
						this._add(segments.slice());
					}
				}
				if (path._closed)
					this._add([segments[0]]);
				path.remove();
			}
			var first = this.getFirstSegment(),
				last = this.getLastSegment();
			if (first !== last && first._point.equals(last._point)) {
				first.setHandleIn(last._handleIn);
				last.remove();
				this.setClosed(true);
			}
			return this;
		},

		toShape: function(insert) {
			if (!this._closed)
				return null;

			var segments = this._segments,
				type,
				size,
				radius,
				topCenter;

			function isCollinear(i, j) {
				var seg1 = segments[i],
					seg2 = seg1.getNext(),
					seg3 = segments[j],
					seg4 = seg3.getNext();
				return seg1._handleOut.isZero() && seg2._handleIn.isZero()
						&& seg3._handleOut.isZero() && seg4._handleIn.isZero()
						&& seg2._point.subtract(seg1._point).isCollinear(
							seg4._point.subtract(seg3._point));
			}

			function isOrthogonal(i) {
				var seg2 = segments[i],
					seg1 = seg2.getPrevious(),
					seg3 = seg2.getNext();
				return seg1._handleOut.isZero() && seg2._handleIn.isZero()
						&& seg2._handleOut.isZero() && seg3._handleIn.isZero()
						&& seg2._point.subtract(seg1._point).isOrthogonal(
							seg3._point.subtract(seg2._point));
			}

			function isArc(i) {
				var seg1 = segments[i],
					seg2 = seg1.getNext(),
					handle1 = seg1._handleOut,
					handle2 = seg2._handleIn,
					kappa = 0.5522847498307936;
				if (handle1.isOrthogonal(handle2)) {
					var pt1 = seg1._point,
						pt2 = seg2._point,
						corner = new Line(pt1, handle1, true).intersect(
								new Line(pt2, handle2, true), true);
					return corner && Numerical.isZero(handle1.getLength() /
							corner.subtract(pt1).getLength() - kappa)
						&& Numerical.isZero(handle2.getLength() /
							corner.subtract(pt2).getLength() - kappa);
				}
				return false;
			}

			function getDistance(i, j) {
				return segments[i]._point.getDistance(segments[j]._point);
			}

			if (!this.hasHandles() && segments.length === 4
					&& isCollinear(0, 2) && isCollinear(1, 3) && isOrthogonal(1)) {
				type = Shape.Rectangle;
				size = new Size(getDistance(0, 3), getDistance(0, 1));
				topCenter = segments[1]._point.add(segments[2]._point).divide(2);
			} else if (segments.length === 8 && isArc(0) && isArc(2) && isArc(4)
					&& isArc(6) && isCollinear(1, 5) && isCollinear(3, 7)) {
				type = Shape.Rectangle;
				size = new Size(getDistance(1, 6), getDistance(0, 3));
				radius = size.subtract(new Size(getDistance(0, 7),
						getDistance(1, 2))).divide(2);
				topCenter = segments[3]._point.add(segments[4]._point).divide(2);
			} else if (segments.length === 4
					&& isArc(0) && isArc(1) && isArc(2) && isArc(3)) {
				if (Numerical.isZero(getDistance(0, 2) - getDistance(1, 3))) {
					type = Shape.Circle;
					radius = getDistance(0, 2) / 2;
				} else {
					type = Shape.Ellipse;
					radius = new Size(getDistance(2, 0) / 2, getDistance(3, 1) / 2);
				}
				topCenter = segments[1]._point;
			}

			if (type) {
				var center = this.getPosition(true),
					shape = this._clone(new type({
						center: center,
						size: size,
						radius: radius,
						insert: false
					}), insert, false);
				shape.rotate(topCenter.subtract(center).getAngle() + 90);
				return shape;
			}
			return null;
		},

		_hitTestSelf: function(point, options) {
			var that = this,
				style = this.getStyle(),
				segments = this._segments,
				numSegments = segments.length,
				closed = this._closed,
				tolerancePadding = options._tolerancePadding,
				strokePadding = tolerancePadding,
				join, cap, miterLimit,
				area, loc, res,
				hitStroke = options.stroke && style.hasStroke(),
				hitFill = options.fill && style.hasFill(),
				hitCurves = options.curves,
				radius = hitStroke
						? style.getStrokeWidth() / 2
						: hitFill && options.tolerance > 0 || hitCurves
							? 0 : null;
			if (radius !== null) {
				if (radius > 0) {
					join = style.getStrokeJoin();
					cap = style.getStrokeCap();
					miterLimit = radius * style.getMiterLimit();
					strokePadding = tolerancePadding.add(new Point(radius, radius));
				} else {
					join = cap = 'round';
				}
			}

			function isCloseEnough(pt, padding) {
				return point.subtract(pt).divide(padding).length <= 1;
			}

			function checkSegmentPoint(seg, pt, name) {
				if (!options.selected || pt.isSelected()) {
					var anchor = seg._point;
					if (pt !== anchor)
						pt = pt.add(anchor);
					if (isCloseEnough(pt, strokePadding)) {
						return new HitResult(name, that, {
							segment: seg,
							point: pt
						});
					}
				}
			}

			function checkSegmentPoints(seg, ends) {
				return (ends || options.segments)
					&& checkSegmentPoint(seg, seg._point, 'segment')
					|| (!ends && options.handles) && (
						checkSegmentPoint(seg, seg._handleIn, 'handle-in') ||
						checkSegmentPoint(seg, seg._handleOut, 'handle-out'));
			}

			function addToArea(point) {
				area.add(point);
			}

			function checkSegmentStroke(segment) {
				if (join !== 'round' || cap !== 'round') {
					area = new Path({ internal: true, closed: true });
					if (closed || segment._index > 0
							&& segment._index < numSegments - 1) {
						if (join !== 'round' && (segment._handleIn.isZero()
								|| segment._handleOut.isZero()))
							Path._addBevelJoin(segment, join, radius, miterLimit,
									addToArea, true);
					} else if (cap !== 'round') {
						Path._addSquareCap(segment, cap, radius, addToArea, true);
					}
					if (!area.isEmpty()) {
						var loc;
						return area.contains(point)
							|| (loc = area.getNearestLocation(point))
								&& isCloseEnough(loc.getPoint(), tolerancePadding);
					}
				}
				return isCloseEnough(segment._point, strokePadding);
			}

			if (options.ends && !options.segments && !closed) {
				if (res = checkSegmentPoints(segments[0], true)
						|| checkSegmentPoints(segments[numSegments - 1], true))
					return res;
			} else if (options.segments || options.handles) {
				for (var i = 0; i < numSegments; i++)
					if (res = checkSegmentPoints(segments[i]))
						return res;
			}
			if (radius !== null) {
				loc = this.getNearestLocation(point);
				if (loc) {
					var parameter = loc.getParameter();
					if (parameter === 0 || parameter === 1 && numSegments > 1) {
						if (!checkSegmentStroke(loc.getSegment()))
							loc = null;
					} else if (!isCloseEnough(loc.getPoint(), strokePadding)) {
						loc = null;
					}
				}
				if (!loc && join === 'miter' && numSegments > 1) {
					for (var i = 0; i < numSegments; i++) {
						var segment = segments[i];
						if (point.getDistance(segment._point) <= miterLimit
								&& checkSegmentStroke(segment)) {
							loc = segment.getLocation();
							break;
						}
					}
				}
			}
			return !loc && hitFill && this._contains(point)
					|| loc && !hitStroke && !hitCurves
						? new HitResult('fill', this)
						: loc
							? new HitResult(hitStroke ? 'stroke' : 'curve', this, {
								location: loc,
								point: loc.getPoint()
							})
							: null;
		}

	}, Base.each(Curve.evaluateMethods,
		function(name) {
			this[name + 'At'] = function(offset, isParameter) {
				var loc = this.getLocationAt(offset, isParameter);
				return loc && loc[name]();
			};
		},
	{
		beans: false,

		getLocationOf: function() {
			var point = Point.read(arguments),
				curves = this.getCurves();
			for (var i = 0, l = curves.length; i < l; i++) {
				var loc = curves[i].getLocationOf(point);
				if (loc)
					return loc;
			}
			return null;
		},

		getOffsetOf: function() {
			var loc = this.getLocationOf.apply(this, arguments);
			return loc ? loc.getOffset() : null;
		},

		getLocationAt: function(offset, isParameter) {
			var curves = this.getCurves(),
				length = 0;
			if (isParameter) {
				var index = ~~offset,
					curve = curves[index];
				return curve ? curve.getLocationAt(offset - index, true) : null;
			}
			for (var i = 0, l = curves.length; i < l; i++) {
				var start = length,
					curve = curves[i];
				length += curve.getLength();
				if (length > offset) {
					return curve.getLocationAt(offset - start);
				}
			}
			if (curves.length > 0 && offset <= this.getLength())
				return new CurveLocation(curves[curves.length - 1], 1);
			return null;
		},

		getNearestLocation: function() {
			var point = Point.read(arguments),
				curves = this.getCurves(),
				minDist = Infinity,
				minLoc = null;
			for (var i = 0, l = curves.length; i < l; i++) {
				var loc = curves[i].getNearestLocation(point);
				if (loc._distance < minDist) {
					minDist = loc._distance;
					minLoc = loc;
				}
			}
			return minLoc;
		},

		getNearestPoint: function() {
			return this.getNearestLocation.apply(this, arguments).getPoint();
		}
	}),
	new function() {

		function drawHandles(ctx, segments, matrix, size) {
			var half = size / 2;

			function drawHandle(index) {
				var hX = coords[index],
					hY = coords[index + 1];
				if (pX != hX || pY != hY) {
					ctx.beginPath();
					ctx.moveTo(pX, pY);
					ctx.lineTo(hX, hY);
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(hX, hY, half, 0, Math.PI * 2, true);
					ctx.fill();
				}
			}

			var coords = new Array(6);
			for (var i = 0, l = segments.length; i < l; i++) {
				var segment = segments[i];
				segment._transformCoordinates(matrix, coords, false);
				var state = segment._selectionState,
					pX = coords[0],
					pY = coords[1];
				if (state & 1)
					drawHandle(2);
				if (state & 2)
					drawHandle(4);
				ctx.fillRect(pX - half, pY - half, size, size);
				if (!(state & 4)) {
					var fillStyle = ctx.fillStyle;
					ctx.fillStyle = '#ffffff';
					ctx.fillRect(pX - half + 1, pY - half + 1, size - 2, size - 2);
					ctx.fillStyle = fillStyle;
				}
			}
		}

		function drawSegments(ctx, path, matrix) {
			var segments = path._segments,
				length = segments.length,
				coords = new Array(6),
				first = true,
				curX, curY,
				prevX, prevY,
				inX, inY,
				outX, outY;

			function drawSegment(segment) {
				if (matrix) {
					segment._transformCoordinates(matrix, coords, false);
					curX = coords[0];
					curY = coords[1];
				} else {
					var point = segment._point;
					curX = point._x;
					curY = point._y;
				}
				if (first) {
					ctx.moveTo(curX, curY);
					first = false;
				} else {
					if (matrix) {
						inX = coords[2];
						inY = coords[3];
					} else {
						var handle = segment._handleIn;
						inX = curX + handle._x;
						inY = curY + handle._y;
					}
					if (inX === curX && inY === curY
							&& outX === prevX && outY === prevY) {
						ctx.lineTo(curX, curY);
					} else {
						ctx.bezierCurveTo(outX, outY, inX, inY, curX, curY);
					}
				}
				prevX = curX;
				prevY = curY;
				if (matrix) {
					outX = coords[4];
					outY = coords[5];
				} else {
					var handle = segment._handleOut;
					outX = prevX + handle._x;
					outY = prevY + handle._y;
				}
			}

			for (var i = 0; i < length; i++)
				drawSegment(segments[i]);
			if (path._closed && length > 0)
				drawSegment(segments[0]);
		}

		return {
			_draw: function(ctx, param, strokeMatrix) {
				var dontStart = param.dontStart,
					dontPaint = param.dontFinish || param.clip,
					style = this.getStyle(),
					hasFill = style.hasFill(),
					hasStroke = style.hasStroke(),
					dashArray = style.getDashArray(),
					dashLength = !paper.support.nativeDash && hasStroke
							&& dashArray && dashArray.length;

				if (!dontStart)
					ctx.beginPath();

				if (!dontStart && this._currentPath) {
					ctx.currentPath = this._currentPath;
				} else if (hasFill || hasStroke && !dashLength || dontPaint) {
					drawSegments(ctx, this, strokeMatrix);
					if (this._closed)
						ctx.closePath();
					if (!dontStart)
						this._currentPath = ctx.currentPath;
				}

				function getOffset(i) {
					return dashArray[((i % dashLength) + dashLength) % dashLength];
				}

				if (!dontPaint && (hasFill || hasStroke)) {
					this._setStyles(ctx);
					if (hasFill) {
						ctx.fill(style.getWindingRule());
						ctx.shadowColor = 'rgba(0,0,0,0)';
					}
					if (hasStroke) {
						if (dashLength) {
							if (!dontStart)
								ctx.beginPath();
							var iterator = new PathIterator(this, 32, 0.25,
									strokeMatrix),
								length = iterator.length,
								from = -style.getDashOffset(), to,
								i = 0;
							from = from % length;
							while (from > 0) {
								from -= getOffset(i--) + getOffset(i--);
							}
							while (from < length) {
								to = from + getOffset(i++);
								if (from > 0 || to > 0)
									iterator.drawPart(ctx,
											Math.max(from, 0), Math.max(to, 0));
								from = to + getOffset(i++);
							}
						}
						ctx.stroke();
					}
				}
			},

			_drawSelected: function(ctx, matrix) {
				ctx.beginPath();
				drawSegments(ctx, this, matrix);
				ctx.stroke();
				drawHandles(ctx, this._segments, matrix, paper.settings.handleSize);
			}
		};
	},
	new function() {
		function getFirstControlPoints(rhs) {
			var n = rhs.length,
				x = [],
				tmp = [],
				b = 2;
			x[0] = rhs[0] / b;
			for (var i = 1; i < n; i++) {
				tmp[i] = 1 / b;
				b = (i < n - 1 ? 4 : 2) - tmp[i];
				x[i] = (rhs[i] - x[i - 1]) / b;
			}
			for (var i = 1; i < n; i++) {
				x[n - i - 1] -= tmp[n - i] * x[n - i];
			}
			return x;
		}

		return {
			smooth: function() {
				var segments = this._segments,
					size = segments.length,
					closed = this._closed,
					n = size,
					overlap = 0;
				if (size <= 2)
					return;
				if (closed) {
					overlap = Math.min(size, 4);
					n += Math.min(size, overlap) * 2;
				}
				var knots = [];
				for (var i = 0; i < size; i++)
					knots[i + overlap] = segments[i]._point;
				if (closed) {
					for (var i = 0; i < overlap; i++) {
						knots[i] = segments[i + size - overlap]._point;
						knots[i + size + overlap] = segments[i]._point;
					}
				} else {
					n--;
				}
				var rhs = [];

				for (var i = 1; i < n - 1; i++)
					rhs[i] = 4 * knots[i]._x + 2 * knots[i + 1]._x;
				rhs[0] = knots[0]._x + 2 * knots[1]._x;
				rhs[n - 1] = 3 * knots[n - 1]._x;
				var x = getFirstControlPoints(rhs);

				for (var i = 1; i < n - 1; i++)
					rhs[i] = 4 * knots[i]._y + 2 * knots[i + 1]._y;
				rhs[0] = knots[0]._y + 2 * knots[1]._y;
				rhs[n - 1] = 3 * knots[n - 1]._y;
				var y = getFirstControlPoints(rhs);

				if (closed) {
					for (var i = 0, j = size; i < overlap; i++, j++) {
						var f1 = i / overlap,
							f2 = 1 - f1,
							ie = i + overlap,
							je = j + overlap;
						x[j] = x[i] * f1 + x[j] * f2;
						y[j] = y[i] * f1 + y[j] * f2;
						x[je] = x[ie] * f2 + x[je] * f1;
						y[je] = y[ie] * f2 + y[je] * f1;
					}
					n--;
				}
				var handleIn = null;
				for (var i = overlap; i <= n - overlap; i++) {
					var segment = segments[i - overlap];
					if (handleIn)
						segment.setHandleIn(handleIn.subtract(segment._point));
					if (i < n) {
						segment.setHandleOut(
								new Point(x[i], y[i]).subtract(segment._point));
						handleIn = i < n - 1
								? new Point(
									2 * knots[i + 1]._x - x[i + 1],
									2 * knots[i + 1]._y - y[i + 1])
								: new Point(
									(knots[n]._x + x[n - 1]) / 2,
									(knots[n]._y + y[n - 1]) / 2);
					}
				}
				if (closed && handleIn) {
					var segment = this._segments[0];
					segment.setHandleIn(handleIn.subtract(segment._point));
				}
			}
		};
	},
	new function() {
		function getCurrentSegment(that) {
			var segments = that._segments;
			if (segments.length === 0)
				throw new Error('Use a moveTo() command first');
			return segments[segments.length - 1];
		}

		return {
			moveTo: function() {
				var segments = this._segments;
				if (segments.length === 1)
					this.removeSegment(0);
				if (!segments.length)
					this._add([ new Segment(Point.read(arguments)) ]);
			},

			moveBy: function() {
				throw new Error('moveBy() is unsupported on Path items.');
			},

			lineTo: function() {
				this._add([ new Segment(Point.read(arguments)) ]);
			},

			cubicCurveTo: function() {
				var handle1 = Point.read(arguments),
					handle2 = Point.read(arguments),
					to = Point.read(arguments),
					current = getCurrentSegment(this);
				current.setHandleOut(handle1.subtract(current._point));
				this._add([ new Segment(to, handle2.subtract(to)) ]);
			},

			quadraticCurveTo: function() {
				var handle = Point.read(arguments),
					to = Point.read(arguments),
					current = getCurrentSegment(this)._point;
				this.cubicCurveTo(
					handle.add(current.subtract(handle).multiply(1 / 3)),
					handle.add(to.subtract(handle).multiply(1 / 3)),
					to
				);
			},

			curveTo: function() {
				var through = Point.read(arguments),
					to = Point.read(arguments),
					t = Base.pick(Base.read(arguments), 0.5),
					t1 = 1 - t,
					current = getCurrentSegment(this)._point,
					handle = through.subtract(current.multiply(t1 * t1))
						.subtract(to.multiply(t * t)).divide(2 * t * t1);
				if (handle.isNaN())
					throw new Error(
						'Cannot put a curve through points with parameter = ' + t);
				this.quadraticCurveTo(handle, to);
			},

			arcTo: function() {
				var current = getCurrentSegment(this),
					from = current._point,
					to = Point.read(arguments),
					through,
					peek = Base.peek(arguments),
					clockwise = Base.pick(peek, true),
					center, extent, vector, matrix;
				if (typeof clockwise === 'boolean') {
					var middle = from.add(to).divide(2),
					through = middle.add(middle.subtract(from).rotate(
							clockwise ? -90 : 90));
				} else if (Base.remain(arguments) <= 2) {
					through = to;
					to = Point.read(arguments);
				} else {
					var radius = Size.read(arguments);
					if (radius.isZero())
						return this.lineTo(to);
					var rotation = Base.read(arguments),
						clockwise = !!Base.read(arguments),
						large = !!Base.read(arguments),
						middle = from.add(to).divide(2),
						pt = from.subtract(middle).rotate(-rotation),
						x = pt.x,
						y = pt.y,
						abs = Math.abs,
						rx = abs(radius.width),
						ry = abs(radius.height),
						rxSq = rx * rx,
						rySq = ry * ry,
						xSq =  x * x,
						ySq =  y * y;
					var factor = Math.sqrt(xSq / rxSq + ySq / rySq);
					if (factor > 1) {
						rx *= factor;
						ry *= factor;
						rxSq = rx * rx;
						rySq = ry * ry;
					}
					factor = (rxSq * rySq - rxSq * ySq - rySq * xSq) /
							(rxSq * ySq + rySq * xSq);
					if (abs(factor) < 1e-12)
						factor = 0;
					if (factor < 0)
						throw new Error(
								'Cannot create an arc with the given arguments');
					center = new Point(rx * y / ry, -ry * x / rx)
							.multiply((large === clockwise ? -1 : 1)
								* Math.sqrt(factor))
							.rotate(rotation).add(middle);
					matrix = new Matrix().translate(center).rotate(rotation)
							.scale(rx, ry);
					vector = matrix._inverseTransform(from);
					extent = vector.getDirectedAngle(matrix._inverseTransform(to));
					if (!clockwise && extent > 0)
						extent -= 360;
					else if (clockwise && extent < 0)
						extent += 360;
				}
				if (through) {
					var l1 = new Line(from.add(through).divide(2),
								through.subtract(from).rotate(90), true),
						l2 = new Line(through.add(to).divide(2),
								to.subtract(through).rotate(90), true),
						line = new Line(from, to),
						throughSide = line.getSide(through);
					center = l1.intersect(l2, true);
					if (!center) {
						if (!throughSide)
							return this.lineTo(to);
						throw new Error(
								'Cannot create an arc with the given arguments');
					}
					vector = from.subtract(center);
					extent = vector.getDirectedAngle(to.subtract(center));
					var centerSide = line.getSide(center);
					if (centerSide === 0) {
						extent = throughSide * Math.abs(extent);
					} else if (throughSide === centerSide) {
						extent += extent < 0 ? 360 : -360;
					}
				}
				var ext = Math.abs(extent),
					count = ext >= 360 ? 4 : Math.ceil(ext / 90),
					inc = extent / count,
					half = inc * Math.PI / 360,
					z = 4 / 3 * Math.sin(half) / (1 + Math.cos(half)),
					segments = [];
				for (var i = 0; i <= count; i++) {
					var pt = to,
						out = null;
					if (i < count) {
						out = vector.rotate(90).multiply(z);
						if (matrix) {
							pt = matrix._transformPoint(vector);
							out = matrix._transformPoint(vector.add(out))
									.subtract(pt);
						} else {
							pt = center.add(vector);
						}
					}
					if (i === 0) {
						current.setHandleOut(out);
					} else {
						var _in = vector.rotate(-90).multiply(z);
						if (matrix) {
							_in = matrix._transformPoint(vector.add(_in))
									.subtract(pt);
						}
						segments.push(new Segment(pt, _in, out));
					}
					vector = vector.rotate(inc);
				}
				this._add(segments);
			},

			lineBy: function() {
				var to = Point.read(arguments),
					current = getCurrentSegment(this)._point;
				this.lineTo(current.add(to));
			},

			curveBy: function() {
				var through = Point.read(arguments),
					to = Point.read(arguments),
					parameter = Base.read(arguments),
					current = getCurrentSegment(this)._point;
				this.curveTo(current.add(through), current.add(to), parameter);
			},

			cubicCurveBy: function() {
				var handle1 = Point.read(arguments),
					handle2 = Point.read(arguments),
					to = Point.read(arguments),
					current = getCurrentSegment(this)._point;
				this.cubicCurveTo(current.add(handle1), current.add(handle2),
						current.add(to));
			},

			quadraticCurveBy: function() {
				var handle = Point.read(arguments),
					to = Point.read(arguments),
					current = getCurrentSegment(this)._point;
				this.quadraticCurveTo(current.add(handle), current.add(to));
			},

			arcBy: function() {
				var current = getCurrentSegment(this)._point,
					point = current.add(Point.read(arguments)),
					clockwise = Base.pick(Base.peek(arguments), true);
				if (typeof clockwise === 'boolean') {
					this.arcTo(point, clockwise);
				} else {
					this.arcTo(point, current.add(Point.read(arguments)));
				}
			},

			closePath: function(join) {
				this.setClosed(true);
				if (join)
					this.join();
			}
		};
	}, {

		_getBounds: function(getter, matrix) {
			return Path[getter](this._segments, this._closed, this.getStyle(),
					matrix);
		},

	statics: {
		getBounds: function(segments, closed, style, matrix, strokePadding) {
			var first = segments[0];
			if (!first)
				return new Rectangle();
			var coords = new Array(6),
				prevCoords = first._transformCoordinates(matrix, new Array(6), false),
				min = prevCoords.slice(0, 2),
				max = min.slice(),
				roots = new Array(2);

			function processSegment(segment) {
				segment._transformCoordinates(matrix, coords, false);
				for (var i = 0; i < 2; i++) {
					Curve._addBounds(
						prevCoords[i],
						prevCoords[i + 4],
						coords[i + 2],
						coords[i],
						i, strokePadding ? strokePadding[i] : 0, min, max, roots);
				}
				var tmp = prevCoords;
				prevCoords = coords;
				coords = tmp;
			}

			for (var i = 1, l = segments.length; i < l; i++)
				processSegment(segments[i]);
			if (closed)
				processSegment(first);
			return new Rectangle(min[0], min[1], max[0] - min[0], max[1] - min[1]);
		},

		getStrokeBounds: function(segments, closed, style, matrix) {
			if (!style.hasStroke())
				return Path.getBounds(segments, closed, style, matrix);
			var length = segments.length - (closed ? 0 : 1),
				radius = style.getStrokeWidth() / 2,
				padding = Path._getPenPadding(radius, matrix),
				bounds = Path.getBounds(segments, closed, style, matrix, padding),
				join = style.getStrokeJoin(),
				cap = style.getStrokeCap(),
				miterLimit = radius * style.getMiterLimit();
			var joinBounds = new Rectangle(new Size(padding).multiply(2));

			function add(point) {
				bounds = bounds.include(matrix
					? matrix._transformPoint(point, point) : point);
			}

			function addRound(segment) {
				bounds = bounds.unite(joinBounds.setCenter(matrix
					? matrix._transformPoint(segment._point) : segment._point));
			}

			function addJoin(segment, join) {
				var handleIn = segment._handleIn,
					handleOut = segment._handleOut;
				if (join === 'round' || !handleIn.isZero() && !handleOut.isZero()
						&& handleIn.isCollinear(handleOut)) {
					addRound(segment);
				} else {
					Path._addBevelJoin(segment, join, radius, miterLimit, add);
				}
			}

			function addCap(segment, cap) {
				if (cap === 'round') {
					addRound(segment);
				} else {
					Path._addSquareCap(segment, cap, radius, add);
				}
			}

			for (var i = 1; i < length; i++)
				addJoin(segments[i], join);
			if (closed) {
				addJoin(segments[0], join);
			} else if (length > 0) {
				addCap(segments[0], cap);
				addCap(segments[segments.length - 1], cap);
			}
			return bounds;
		},

		_getPenPadding: function(radius, matrix) {
			if (!matrix)
				return [radius, radius];
			var mx = matrix.shiftless(),
				hor = mx.transform(new Point(radius, 0)),
				ver = mx.transform(new Point(0, radius)),
				phi = hor.getAngleInRadians(),
				a = hor.getLength(),
				b = ver.getLength();
			var sin = Math.sin(phi),
				cos = Math.cos(phi),
				tan = Math.tan(phi),
				tx = -Math.atan(b * tan / a),
				ty = Math.atan(b / (tan * a));
			return [Math.abs(a * Math.cos(tx) * cos - b * Math.sin(tx) * sin),
					Math.abs(b * Math.sin(ty) * cos + a * Math.cos(ty) * sin)];
		},

		_addBevelJoin: function(segment, join, radius, miterLimit, addPoint, area) {
			var curve2 = segment.getCurve(),
				curve1 = curve2.getPrevious(),
				point = curve2.getPointAt(0, true),
				normal1 = curve1.getNormalAt(1, true),
				normal2 = curve2.getNormalAt(0, true),
				step = normal1.getDirectedAngle(normal2) < 0 ? -radius : radius;
			normal1.setLength(step);
			normal2.setLength(step);
			if (area) {
				addPoint(point);
				addPoint(point.add(normal1));
			}
			if (join === 'miter') {
				var corner = new Line(
						point.add(normal1),
						new Point(-normal1.y, normal1.x), true
					).intersect(new Line(
						point.add(normal2),
						new Point(-normal2.y, normal2.x), true
					), true);
				if (corner && point.getDistance(corner) <= miterLimit) {
					addPoint(corner);
					if (!area)
						return;
				}
			}
			if (!area)
				addPoint(point.add(normal1));
			addPoint(point.add(normal2));
		},

		_addSquareCap: function(segment, cap, radius, addPoint, area) {
			var point = segment._point,
				loc = segment.getLocation(),
				normal = loc.getNormal().multiply(radius);
			if (area) {
				addPoint(point.subtract(normal));
				addPoint(point.add(normal));
			}
			if (cap === 'square')
				point = point.add(normal.rotate(loc.getParameter() === 0 ? -90 : 90));
			addPoint(point.add(normal));
			addPoint(point.subtract(normal));
		},

		getHandleBounds: function(segments, closed, style, matrix, strokePadding,
				joinPadding) {
			var coords = new Array(6),
				x1 = Infinity,
				x2 = -x1,
				y1 = x1,
				y2 = x2;
			for (var i = 0, l = segments.length; i < l; i++) {
				var segment = segments[i];
				segment._transformCoordinates(matrix, coords, false);
				for (var j = 0; j < 6; j += 2) {
					var padding = j === 0 ? joinPadding : strokePadding,
						paddingX = padding ? padding[0] : 0,
						paddingY = padding ? padding[1] : 0,
						x = coords[j],
						y = coords[j + 1],
						xn = x - paddingX,
						xx = x + paddingX,
						yn = y - paddingY,
						yx = y + paddingY;
					if (xn < x1) x1 = xn;
					if (xx > x2) x2 = xx;
					if (yn < y1) y1 = yn;
					if (yx > y2) y2 = yx;
				}
			}
			return new Rectangle(x1, y1, x2 - x1, y2 - y1);
		},

		getRoughBounds: function(segments, closed, style, matrix) {
			var strokeRadius = style.hasStroke() ? style.getStrokeWidth() / 2 : 0,
				joinRadius = strokeRadius;
			if (strokeRadius > 0) {
				if (style.getStrokeJoin() === 'miter')
					joinRadius = strokeRadius * style.getMiterLimit();
				if (style.getStrokeCap() === 'square')
					joinRadius = Math.max(joinRadius, strokeRadius * Math.sqrt(2));
			}
			return Path.getHandleBounds(segments, closed, style, matrix,
					Path._getPenPadding(strokeRadius, matrix),
					Path._getPenPadding(joinRadius, matrix));
		}
	}});

	Path.inject({ statics: new function() {

		var kappa = 0.5522847498307936,
			ellipseSegments = [
				new Segment([-1, 0], [0, kappa ], [0, -kappa]),
				new Segment([0, -1], [-kappa, 0], [kappa, 0 ]),
				new Segment([1, 0], [0, -kappa], [0, kappa ]),
				new Segment([0, 1], [kappa, 0 ], [-kappa, 0])
			];

		function createPath(segments, closed, args) {
			var props = Base.getNamed(args),
				path = new Path(props && props.insert === false && Item.NO_INSERT);
			path._add(segments);
			path._closed = closed;
			return path.set(props);
		}

		function createEllipse(center, radius, args) {
			var segments = new Array(4);
			for (var i = 0; i < 4; i++) {
				var segment = ellipseSegments[i];
				segments[i] = new Segment(
					segment._point.multiply(radius).add(center),
					segment._handleIn.multiply(radius),
					segment._handleOut.multiply(radius)
				);
			}
			return createPath(segments, true, args);
		}

		return {
			Line: function() {
				return createPath([
					new Segment(Point.readNamed(arguments, 'from')),
					new Segment(Point.readNamed(arguments, 'to'))
				], false, arguments);
			},

			Circle: function() {
				var center = Point.readNamed(arguments, 'center'),
					radius = Base.readNamed(arguments, 'radius');
				return createEllipse(center, new Size(radius), arguments);
			},

			Rectangle: function() {
				var rect = Rectangle.readNamed(arguments, 'rectangle'),
					radius = Size.readNamed(arguments, 'radius', 0,
							{ readNull: true }),
					bl = rect.getBottomLeft(true),
					tl = rect.getTopLeft(true),
					tr = rect.getTopRight(true),
					br = rect.getBottomRight(true),
					segments;
				if (!radius || radius.isZero()) {
					segments = [
						new Segment(bl),
						new Segment(tl),
						new Segment(tr),
						new Segment(br)
					];
				} else {
					radius = Size.min(radius, rect.getSize(true).divide(2));
					var rx = radius.width,
						ry = radius.height,
						hx = rx * kappa,
						hy = ry * kappa;
					segments = [
						new Segment(bl.add(rx, 0), null, [-hx, 0]),
						new Segment(bl.subtract(0, ry), [0, hy]),
						new Segment(tl.add(0, ry), null, [0, -hy]),
						new Segment(tl.add(rx, 0), [-hx, 0], null),
						new Segment(tr.subtract(rx, 0), null, [hx, 0]),
						new Segment(tr.add(0, ry), [0, -hy], null),
						new Segment(br.subtract(0, ry), null, [0, hy]),
						new Segment(br.subtract(rx, 0), [hx, 0])
					];
				}
				return createPath(segments, true, arguments);
			},

			RoundRectangle: '#Rectangle',

			Ellipse: function() {
				var ellipse = Shape._readEllipse(arguments);
				return createEllipse(ellipse.center, ellipse.radius, arguments);
			},

			Oval: '#Ellipse',

			Arc: function() {
				var from = Point.readNamed(arguments, 'from'),
					through = Point.readNamed(arguments, 'through'),
					to = Point.readNamed(arguments, 'to'),
					props = Base.getNamed(arguments),
					path = new Path(props && props.insert === false
							&& Item.NO_INSERT);
				path.moveTo(from);
				path.arcTo(through, to);
				return path.set(props);
			},

			RegularPolygon: function() {
				var center = Point.readNamed(arguments, 'center'),
					sides = Base.readNamed(arguments, 'sides'),
					radius = Base.readNamed(arguments, 'radius'),
					step = 360 / sides,
					three = !(sides % 3),
					vector = new Point(0, three ? -radius : radius),
					offset = three ? -1 : 0.5,
					segments = new Array(sides);
				for (var i = 0; i < sides; i++)
					segments[i] = new Segment(center.add(
						vector.rotate((i + offset) * step)));
				return createPath(segments, true, arguments);
			},

			Star: function() {
				var center = Point.readNamed(arguments, 'center'),
					points = Base.readNamed(arguments, 'points') * 2,
					radius1 = Base.readNamed(arguments, 'radius1'),
					radius2 = Base.readNamed(arguments, 'radius2'),
					step = 360 / points,
					vector = new Point(0, -1),
					segments = new Array(points);
				for (var i = 0; i < points; i++)
					segments[i] = new Segment(center.add(vector.rotate(step * i)
							.multiply(i % 2 ? radius2 : radius1)));
				return createPath(segments, true, arguments);
			}
		};
	}});

	var CompoundPath = PathItem.extend({
		_class: 'CompoundPath',
		_serializeFields: {
			children: []
		},

		initialize: function CompoundPath(arg) {
			this._children = [];
			this._namedChildren = {};
			if (!this._initialize(arg)) {
				if (typeof arg === 'string') {
					this.setPathData(arg);
				} else {
					this.addChildren(Array.isArray(arg) ? arg : arguments);
				}
			}
		},

		insertChildren: function insertChildren(index, items, _preserve) {
			for (var i = items.length - 1; i >= 0; i--) {
				var item = items[i];
				if (item instanceof CompoundPath) {
					items.splice.apply(items, [i, 1].concat(item.removeChildren()));
					item.remove();
				}
			}
			items = insertChildren.base.call(this, index, items, _preserve, Path);
			for (var i = 0, l = !_preserve && items && items.length; i < l; i++) {
				var item = items[i];
				if (item._clockwise === undefined)
					item.setClockwise(item._index === 0);
			}
			return items;
		},

		reverse: function() {
			var children = this._children;
			for (var i = 0, l = children.length; i < l; i++)
				children[i].reverse();
		},

		smooth: function() {
			for (var i = 0, l = this._children.length; i < l; i++)
				this._children[i].smooth();
		},

		reduce: function reduce() {
			var children = this._children;
			for (var i = children.length - 1; i >= 0; i--) {
				var path = children[i].reduce();
				if (path.isEmpty())
					children.splice(i, 1);
			}
			if (children.length === 0) {
				var path = new Path(Item.NO_INSERT);
				path.insertAbove(this);
				path.setStyle(this._style);
				this.remove();
				return path;
			}
			return reduce.base.call(this);
		},

		isClockwise: function() {
			var child = this.getFirstChild();
			return child && child.isClockwise();
		},

		setClockwise: function(clockwise) {
			if (this.isClockwise() !== !!clockwise)
				this.reverse();
		},

		getFirstSegment: function() {
			var first = this.getFirstChild();
			return first && first.getFirstSegment();
		},

		getLastSegment: function() {
			var last = this.getLastChild();
			return last && last.getLastSegment();
		},

		getCurves: function() {
			var children = this._children,
				curves = [];
			for (var i = 0, l = children.length; i < l; i++)
				curves.push.apply(curves, children[i].getCurves());
			return curves;
		},

		getFirstCurve: function() {
			var first = this.getFirstChild();
			return first && first.getFirstCurve();
		},

		getLastCurve: function() {
			var last = this.getLastChild();
			return last && last.getFirstCurve();
		},

		getArea: function() {
			var children = this._children,
				area = 0;
			for (var i = 0, l = children.length; i < l; i++)
				area += children[i].getArea();
			return area;
		}
	}, {
		beans: true,

		getPathData: function(_matrix, _precision) {
			var children = this._children,
				paths = [];
			for (var i = 0, l = children.length; i < l; i++) {
				var child = children[i],
					mx = child._matrix;
				paths.push(child.getPathData(_matrix && !mx.isIdentity()
						? _matrix.chain(mx) : _matrix, _precision));
			}
			return paths.join(' ');
		}
	}, {
		_getChildHitTestOptions: function(options) {
			return options.class === Path || options.type === 'path'
					? options
					: new Base(options, { fill: false });
		},

		_draw: function(ctx, param, strokeMatrix) {
			var children = this._children;
			if (children.length === 0)
				return;

			if (this._currentPath) {
				ctx.currentPath = this._currentPath;
			} else {
				param = param.extend({ dontStart: true, dontFinish: true });
				ctx.beginPath();
				for (var i = 0, l = children.length; i < l; i++)
					children[i].draw(ctx, param, strokeMatrix);
				this._currentPath = ctx.currentPath;
			}

			if (!param.clip) {
				this._setStyles(ctx);
				var style = this._style;
				if (style.hasFill()) {
					ctx.fill(style.getWindingRule());
					ctx.shadowColor = 'rgba(0,0,0,0)';
				}
				if (style.hasStroke())
					ctx.stroke();
			}
		},

		_drawSelected: function(ctx, matrix, selectedItems) {
			var children = this._children;
			for (var i = 0, l = children.length; i < l; i++) {
				var child = children[i],
					mx = child._matrix;
				if (!selectedItems[child._id])
					child._drawSelected(ctx, mx.isIdentity() ? matrix
							: matrix.chain(mx));
			}
		}
	},
	new function() {
		function getCurrentPath(that, check) {
			var children = that._children;
			if (check && children.length === 0)
				throw new Error('Use a moveTo() command first');
			return children[children.length - 1];
		}

		var fields = {
			moveTo: function() {
				var current = getCurrentPath(this),
					path = current && current.isEmpty() ? current
							: new Path(Item.NO_INSERT);
				if (path !== current)
					this.addChild(path);
				path.moveTo.apply(path, arguments);
			},

			moveBy: function() {
				var current = getCurrentPath(this, true),
					last = current && current.getLastSegment(),
					point = Point.read(arguments);
				this.moveTo(last ? point.add(last._point) : point);
			},

			closePath: function(join) {
				getCurrentPath(this, true).closePath(join);
			}
		};

		Base.each(['lineTo', 'cubicCurveTo', 'quadraticCurveTo', 'curveTo', 'arcTo',
				'lineBy', 'cubicCurveBy', 'quadraticCurveBy', 'curveBy', 'arcBy'],
				function(key) {
					fields[key] = function() {
						var path = getCurrentPath(this, true);
						path[key].apply(path, arguments);
					};
				}
		);

		return fields;
	});

	PathItem.inject(new function() {
		var operators = {
			unite: function(w) {
				return w === 1 || w === 0;
			},

			intersect: function(w) {
				return w === 2;
			},

			subtract: function(w) {
				return w === 1;
			},

			exclude: function(w) {
				return w === 1;
			}
		};

		function preparePath(path, resolve) {
			var res = path.clone(false).reduce().transform(null, true, true);
			return resolve ? res.resolveCrossings().reorient() : res;
		}

		function finishBoolean(ctor, paths, path1, path2, reduce) {
			var result = new ctor(Item.NO_INSERT);
			result.addChildren(paths, true);
			if (reduce)
				result = result.reduce();
			result.insertAbove(path2 && path1.isSibling(path2)
					&& path1.getIndex() < path2.getIndex()
						? path2 : path1);
			result.setStyle(path1._style);
			return result;
		}

		function computeBoolean(path1, path2, operation) {
			if (!path1._children && !path1._closed)
				return computeOpenBoolean(path1, path2, operation);
			var _path1 = preparePath(path1, true),
				_path2 = path2 && path1 !== path2 && preparePath(path2, true);
			if (_path2 && /^(subtract|exclude)$/.test(operation)
					^ (_path2.isClockwise() !== _path1.isClockwise()))
				_path2.reverse();
			var intersections = CurveLocation.expand(
				_path1.getIntersections(_path2, function(inter) {
					return _path2 && inter.isOverlap() || inter.isCrossing();
				})
			);
			divideLocations(intersections);

			var segments = [],
				monoCurves = [];

			function collect(paths) {
				for (var i = 0, l = paths.length; i < l; i++) {
					var path = paths[i];
					segments.push.apply(segments, path._segments);
					monoCurves.push.apply(monoCurves, path._getMonoCurves());
				}
			}

			collect(_path1._children || [_path1]);
			if (_path2)
				collect(_path2._children || [_path2]);
			for (var i = 0, l = intersections.length; i < l; i++) {
				propagateWinding(intersections[i]._segment, _path1, _path2,
						monoCurves, operation);
			}
			for (var i = 0, l = segments.length; i < l; i++) {
				var segment = segments[i];
				if (segment._winding == null) {
					propagateWinding(segment, _path1, _path2, monoCurves,
							operation);
				}
			}
			return finishBoolean(CompoundPath, tracePaths(segments, operation),
					path1, path2, true);
		}

		function computeOpenBoolean(path1, path2, operation) {
			if (!path2 || !path2._children && !path2._closed
					|| !/^(subtract|intersect)$/.test(operation))
				return null;
			var _path1 = preparePath(path1, false),
				_path2 = preparePath(path2, false),
				intersections = _path1.getIntersections(_path2, function(inter) {
					return inter.isOverlap() || inter.isCrossing();
				}),
				sub = operation === 'subtract',
				paths = [];

			function addPath(path) {
				if (_path2.contains(path.getPointAt(path.getLength() / 2)) ^ sub) {
					paths.unshift(path);
					return true;
				}
			}

			for (var i = intersections.length - 1; i >= 0; i--) {
				var path = intersections[i].split();
				if (path) {
					if (addPath(path))
						path.getFirstSegment().setHandleIn(0, 0);
					_path1.getLastSegment().setHandleOut(0, 0);
				}
			}
			addPath(_path1);
			return finishBoolean(Group, paths, path1, path2);
		}

		function linkIntersections(from, to) {
			var prev = from;
			while (prev) {
				if (prev === to)
					return;
				prev = prev._prev;
			}
			while (from._next && from._next !== to)
				from = from._next;
			if (!from._next) {
				while (to._prev)
					to = to._prev;
				from._next = to;
				to._prev = from;
			}
		}

		function divideLocations(locations) {
			var tMin = 4e-7,
				tMax = 1 - tMin,
				noHandles = false,
				clearSegments = [],
				prevCurve,
				prevT;

			for (var i = locations.length - 1; i >= 0; i--) {
				var loc = locations[i],
					curve = loc._curve,
					t = loc._parameter,
					origT = t;
				if (curve !== prevCurve) {
					noHandles = !curve.hasHandles();
				} else if (prevT > 0) {
					t /= prevT;
				}
				var segment;
				if (t < tMin) {
					segment = curve._segment1;
				} else if (t > tMax) {
					segment = curve._segment2;
				} else {
					segment = curve.divide(t, true, true)._segment1;
					if (noHandles)
						clearSegments.push(segment);
				}
				loc._setSegment(segment);
				var inter = segment._intersection,
					dest = loc._intersection;
				if (inter) {
					linkIntersections(inter, dest);
					var other = inter;
					while (other) {
						linkIntersections(other._intersection, inter);
						other = other._next;
					}
				} else {
					segment._intersection = dest;
				}
				prevCurve = curve;
				prevT = origT;
			}
			for (var i = 0, l = clearSegments.length; i < l; i++) {
				clearSegments[i].clearHandles();
			}
		}

		function getWinding(point, curves, horizontal, testContains) {
			var epsilon = 2e-7,
				tMin = 4e-7,
				tMax = 1 - tMin,
				px = point.x,
				py = point.y,
				windLeft = 0,
				windRight = 0,
				roots = [],
				abs = Math.abs;
			if (horizontal) {
				var yTop = -Infinity,
					yBottom = Infinity,
					yBefore = py - epsilon,
					yAfter = py + epsilon;
				for (var i = 0, l = curves.length; i < l; i++) {
					var values = curves[i].values;
					if (Curve.solveCubic(values, 0, px, roots, 0, 1) > 0) {
						for (var j = roots.length - 1; j >= 0; j--) {
							var y = Curve.getPoint(values, roots[j]).y;
							if (y < yBefore && y > yTop) {
								yTop = y;
							} else if (y > yAfter && y < yBottom) {
								yBottom = y;
							}
						}
					}
				}
				yTop = (yTop + py) / 2;
				yBottom = (yBottom + py) / 2;
				if (yTop > -Infinity)
					windLeft = getWinding(new Point(px, yTop), curves, false,
							testContains);
				if (yBottom < Infinity)
					windRight = getWinding(new Point(px, yBottom), curves, false,
							testContains);
			} else {
				var xBefore = px - epsilon,
					xAfter = px + epsilon;
				var startCounted = false,
					prevCurve,
					prevT;
				for (var i = 0, l = curves.length; i < l; i++) {
					var curve = curves[i],
						values = curve.values,
						winding = curve.winding;
					if (winding && (winding === 1
							&& py >= values[1] && py <= values[7]
							|| py >= values[7] && py <= values[1])
						&& Curve.solveCubic(values, 1, py, roots, 0, 1) === 1) {
						var t = roots[0];
						if (!(
							t > tMax && startCounted && curve.next !== curves[i + 1]
							|| t < tMin && prevT > tMax
								&& curve.previous === prevCurve)) {
							var x = Curve.getPoint(values, t).x,
								slope = Curve.getTangent(values, t).y,
								counted = false;
							if (Numerical.isZero(slope) && !Curve.isStraight(values)
									|| t < tMin && slope * Curve.getTangent(
										curve.previous.values, 1).y < 0
									|| t > tMax && slope * Curve.getTangent(
										curve.next.values, 0).y < 0) {
								if (testContains && x >= xBefore && x <= xAfter) {
									++windLeft;
									++windRight;
									counted = true;
								}
							} else if (x <= xBefore) {
								windLeft += winding;
								counted = true;
							} else if (x >= xAfter) {
								windRight += winding;
								counted = true;
							}
							if (curve.previous !== curves[i - 1])
								startCounted = t < tMin && counted;
						}
						prevCurve = curve;
						prevT = t;
					}
				}
			}
			return Math.max(abs(windLeft), abs(windRight));
		}

		function propagateWinding(segment, path1, path2, monoCurves, operation) {
			var epsilon = 2e-7,
				chain = [],
				start = segment,
				totalLength = 0,
				windingSum = 0;
			do {
				var curve = segment.getCurve(),
					length = curve.getLength();
				chain.push({ segment: segment, curve: curve, length: length });
				totalLength += length;
				segment = segment.getNext();
			} while (segment && !segment._intersection && segment !== start);
			for (var i = 0; i < 3; i++) {
				var length = totalLength * (i + 1) / 4;
				for (var k = 0, m = chain.length; k < m; k++) {
					var node = chain[k],
						curveLength = node.length;
					if (length <= curveLength) {
						if (length < epsilon || curveLength - length < epsilon)
							length = curveLength / 2;
						var curve = node.curve,
							path = curve._path,
							parent = path._parent,
							pt = curve.getPointAt(length),
							hor = curve.isHorizontal();
						if (parent instanceof CompoundPath)
							path = parent;
						windingSum += operation === 'subtract' && path2
							&& (path === path1 && path2._getWinding(pt, hor)
							|| path === path2 && !path1._getWinding(pt, hor))
							? 0
							: getWinding(pt, monoCurves, hor);
						break;
					}
					length -= curveLength;
				}
			}
			var winding = Math.round(windingSum / 3);
			for (var j = chain.length - 1; j >= 0; j--)
				chain[j].segment._winding = winding;
		}

		function tracePaths(segments, operation) {
			var paths = [],
				start,
				otherStart,
				operator = operators[operation],
				overlapWinding = {
					unite: { 1: 2 },
					intersect: { 2: 1 }
				}[operation];

			function isValid(seg, adjusted) {
				if (seg._visited)
					return false;
				if (!operator)
					return true;
				var winding = seg._winding,
					inter = seg._intersection;
				if (inter && adjusted && overlapWinding && inter.isOverlap())
					winding = overlapWinding[winding] || winding;
				return operator(winding);
			}

			function isStart(seg) {
				return seg === start || seg === otherStart;
			}

			function findBestIntersection(inter, strict) {
				if (!inter._next)
					return inter;
				while (inter) {
					var seg = inter._segment,
						nextSeg = seg.getNext(),
						nextInter = nextSeg._intersection;
					if (isStart(nextSeg)
						|| !seg._visited && !nextSeg._visited
						&& (!operator
							|| (!strict || isValid(seg))
							&& (!(strict && nextInter && nextInter.isOverlap())
								&& isValid(nextSeg)
								|| !strict && nextInter
								&& isValid(nextInter._segment))
						))
						return inter;
					inter = inter._next;
				}
				return null;
			}

			function findStartSegment(inter, next) {
				while (inter) {
					var seg = inter._segment;
					if (isStart(seg))
						return seg;
					inter = inter[next ? '_next' : '_prev'];
				}
			}

			for (var i = 0, l = segments.length; i < l; i++) {
				var seg = segments[i],
					path = null,
					finished = false;
				if (!isValid(seg, true))
					continue;
				start = otherStart = null;
				while (!finished) {
					var inter = seg._intersection,
						handleIn = path && seg._handleIn;
					inter = inter && (findBestIntersection(inter, true)
							|| findBestIntersection(inter, false)) || inter;
					var other = inter && inter._segment;
					if (other && isValid(other))
						seg = other;
					if (seg._visited) {
						finished = isStart(seg);
						if (!finished && inter) {
							var found = findStartSegment(inter, true)
								|| findStartSegment(inter, false);
							if (found) {
								seg = found;
								finished = true;
							}
						}
						break;
					}
					if (!path) {
						path = new Path(Item.NO_INSERT);
						start = seg;
						otherStart = other;
					}
					path.add(new Segment(seg._point, handleIn, seg._handleOut));
					seg._visited = true;
					seg = seg.getNext();
					finished = isStart(seg);
				}
				if (finished) {
					path.firstSegment.setHandleIn(seg._handleIn);
					path.setClosed(true);
				} else if (path) {
					console.error('Boolean operation resulted in open path',
							'segments =', path._segments.length,
							'length =', path.getLength());
					path = null;
				}
				if (path && (path._segments.length > 8
						|| !Numerical.isZero(path.getArea()))) {
					paths.push(path);
					path = null;
				}
			}
			return paths;
		}

		return {
			_getWinding: function(point, horizontal, testContains) {
				return getWinding(point, this._getMonoCurves(),
						horizontal, testContains);
			},

			unite: function(path) {
				return computeBoolean(this, path, 'unite');
			},

			intersect: function(path) {
				return computeBoolean(this, path, 'intersect');
			},

			subtract: function(path) {
				return computeBoolean(this, path, 'subtract');
			},

			exclude: function(path) {
				return computeBoolean(this, path, 'exclude');
			},

			divide: function(path) {
				return finishBoolean(Group,
						[this.subtract(path), this.intersect(path)],
						this, path, true);
			},

			resolveCrossings: function() {
				var crossings = this.getCrossings();
				if (!crossings.length)
					return this;
				divideLocations(CurveLocation.expand(crossings));
				var paths = this._children || [this],
					segments = [];
				for (var i = 0, l = paths.length; i < l; i++) {
					segments.push.apply(segments, paths[i]._segments);
				}
				return finishBoolean(CompoundPath, tracePaths(segments),
						this, null, false);
			}
		};
	});

	Path.inject({
		_getMonoCurves: function() {
			var monoCurves = this._monoCurves,
				prevCurve;

			function insertCurve(v) {
				var y0 = v[1],
					y1 = v[7],
					curve = {
						values: v,
						winding: y0 === y1
							? 0
							: y0 > y1
								? -1
								: 1,
						previous: prevCurve,
						next: null
					};
				if (prevCurve)
					prevCurve.next = curve;
				monoCurves.push(curve);
				prevCurve = curve;
			}

			function handleCurve(v) {
				if (Curve.getLength(v) === 0)
					return;
				var y0 = v[1],
					y1 = v[3],
					y2 = v[5],
					y3 = v[7];
				if (Curve.isStraight(v)) {
					insertCurve(v);
				} else {
					var a = 3 * (y1 - y2) - y0 + y3,
						b = 2 * (y0 + y2) - 4 * y1,
						c = y1 - y0,
						tMin = 4e-7,
						tMax = 1 - tMin,
						roots = [],
						n = Numerical.solveQuadratic(a, b, c, roots, tMin, tMax);
					if (n === 0) {
						insertCurve(v);
					} else {
						roots.sort();
						var t = roots[0],
							parts = Curve.subdivide(v, t);
						insertCurve(parts[0]);
						if (n > 1) {
							t = (roots[1] - t) / (1 - t);
							parts = Curve.subdivide(parts[1], t);
							insertCurve(parts[0]);
						}
						insertCurve(parts[1]);
					}
				}
			}

			if (!monoCurves) {
				monoCurves = this._monoCurves = [];
				var curves = this.getCurves(),
					segments = this._segments;
				for (var i = 0, l = curves.length; i < l; i++)
					handleCurve(curves[i].getValues());
				if (!this._closed && segments.length > 1) {
					var p1 = segments[segments.length - 1]._point,
						p2 = segments[0]._point,
						p1x = p1._x, p1y = p1._y,
						p2x = p2._x, p2y = p2._y;
					handleCurve([p1x, p1y, p1x, p1y, p2x, p2y, p2x, p2y]);
				}
				if (monoCurves.length > 0) {
					var first = monoCurves[0],
						last = monoCurves[monoCurves.length - 1];
					first.previous = last;
					last.next = first;
				}
			}
			return monoCurves;
		},

		getInteriorPoint: function() {
			var bounds = this.getBounds(),
				point = bounds.getCenter(true);
			if (!this.contains(point)) {
				var curves = this._getMonoCurves(),
					roots = [],
					y = point.y,
					xIntercepts = [];
				for (var i = 0, l = curves.length; i < l; i++) {
					var values = curves[i].values;
					if ((curves[i].winding === 1
							&& y >= values[1] && y <= values[7]
							|| y >= values[7] && y <= values[1])
							&& Curve.solveCubic(values, 1, y, roots, 0, 1) > 0) {
						for (var j = roots.length - 1; j >= 0; j--)
							xIntercepts.push(Curve.getPoint(values, roots[j]).x);
					}
					if (xIntercepts.length > 1)
						break;
				}
				point.x = (xIntercepts[0] + xIntercepts[1]) / 2;
			}
			return point;
		},

		reorient: function() {
			this.setClockwise(true);
			return this;
		}
	});

	CompoundPath.inject({
		_getMonoCurves: function() {
			var children = this._children,
				monoCurves = [];
			for (var i = 0, l = children.length; i < l; i++)
				monoCurves.push.apply(monoCurves, children[i]._getMonoCurves());
			return monoCurves;
		},

		reorient: function() {
			var children = this.removeChildren().sort(function(a, b) {
				return b.getBounds().getArea() - a.getBounds().getArea();
			});
			if (children.length > 0) {
				this.addChildren(children);
				var clockwise = children[0].isClockwise();
				for (var i = 1, l = children.length; i < l; i++) {
					var point = children[i].getInteriorPoint(),
						counters = 0;
					for (var j = i - 1; j >= 0; j--) {
						if (children[j].contains(point))
							counters++;
					}
					children[i].setClockwise(counters % 2 === 0 && clockwise);
				}
			}
			return this;
		}
	});

	var PathIterator = Base.extend({
		_class: 'PathIterator',

		initialize: function(path, maxRecursion, tolerance, matrix) {
			var curves = [],
				parts = [],
				length = 0,
				minDifference = 1 / (maxRecursion || 32),
				segments = path._segments,
				segment1 = segments[0],
				segment2;

			function addCurve(segment1, segment2) {
				var curve = Curve.getValues(segment1, segment2, matrix);
				curves.push(curve);
				computeParts(curve, segment1._index, 0, 1);
			}

			function computeParts(curve, index, minT, maxT) {
				if ((maxT - minT) > minDifference
						&& !Curve.isFlatEnough(curve, tolerance || 0.25)) {
					var split = Curve.subdivide(curve, 0.5),
						halfT = (minT + maxT) / 2;
					computeParts(split[0], index, minT, halfT);
					computeParts(split[1], index, halfT, maxT);
				} else {
					var x = curve[6] - curve[0],
						y = curve[7] - curve[1],
						dist = Math.sqrt(x * x + y * y);
					if (dist > 1e-6) {
						length += dist;
						parts.push({
							offset: length,
							value: maxT,
							index: index
						});
					}
				}
			}

			for (var i = 1, l = segments.length; i < l; i++) {
				segment2 = segments[i];
				addCurve(segment1, segment2);
				segment1 = segment2;
			}
			if (path._closed)
				addCurve(segment2, segments[0]);

			this.curves = curves;
			this.parts = parts;
			this.length = length;
			this.index = 0;
		},

		getParameterAt: function(offset) {
			var i, j = this.index;
			for (;;) {
				i = j;
				if (j == 0 || this.parts[--j].offset < offset)
					break;
			}
			for (var l = this.parts.length; i < l; i++) {
				var part = this.parts[i];
				if (part.offset >= offset) {
					this.index = i;
					var prev = this.parts[i - 1];
					var prevVal = prev && prev.index == part.index ? prev.value : 0,
						prevLen = prev ? prev.offset : 0;
					return {
						value: prevVal + (part.value - prevVal)
							* (offset - prevLen) / (part.offset - prevLen),
						index: part.index
					};
				}
			}
			var part = this.parts[this.parts.length - 1];
			return {
				value: 1,
				index: part.index
			};
		},

		drawPart: function(ctx, from, to) {
			from = this.getParameterAt(from);
			to = this.getParameterAt(to);
			for (var i = from.index; i <= to.index; i++) {
				var curve = Curve.getPart(this.curves[i],
						i == from.index ? from.value : 0,
						i == to.index ? to.value : 1);
				if (i == from.index)
					ctx.moveTo(curve[0], curve[1]);
				ctx.bezierCurveTo.apply(ctx, curve.slice(2));
			}
		}
	}, Base.each(Curve.evaluateMethods,
		function(name) {
			this[name + 'At'] = function(offset, weighted) {
				var param = this.getParameterAt(offset);
				return Curve[name](this.curves[param.index], param.value, weighted);
			};
		}, {})
	);

	var PathFitter = Base.extend({
		initialize: function(path, error) {
			var points = this.points = [],
				segments = path._segments,
				prev;
			for (var i = 0, l = segments.length; i < l; i++) {
				var point = segments[i].point.clone();
				if (!prev || !prev.equals(point)) {
					points.push(point);
					prev = point;
				}
			}

			if (path._closed) {
				this.closed = true;
				points.unshift(points[points.length - 1]);
				points.push(points[1]);
			}

			this.error = error;
		},

		fit: function() {
			var points = this.points,
				length = points.length,
				segments = this.segments = length > 0
						? [new Segment(points[0])] : [];
			if (length > 1)
				this.fitCubic(0, length - 1,
					points[1].subtract(points[0]).normalize(),
					points[length - 2].subtract(points[length - 1]).normalize());

			if (this.closed) {
				segments.shift();
				segments.pop();
			}

			return segments;
		},

		fitCubic: function(first, last, tan1, tan2) {
			if (last - first == 1) {
				var pt1 = this.points[first],
					pt2 = this.points[last],
					dist = pt1.getDistance(pt2) / 3;
				this.addCurve([pt1, pt1.add(tan1.normalize(dist)),
						pt2.add(tan2.normalize(dist)), pt2]);
				return;
			}
			var uPrime = this.chordLengthParameterize(first, last),
				maxError = Math.max(this.error, this.error * this.error),
				split,
				parametersInOrder = true;
			for (var i = 0; i <= 4; i++) {
				var curve = this.generateBezier(first, last, uPrime, tan1, tan2);
				var max = this.findMaxError(first, last, curve, uPrime);
				if (max.error < this.error && parametersInOrder) {
					this.addCurve(curve);
					return;
				}
				split = max.index;
				if (max.error >= maxError)
					break;
				parametersInOrder = this.reparameterize(first, last, uPrime, curve);
				maxError = max.error;
			}
			var V1 = this.points[split - 1].subtract(this.points[split]),
				V2 = this.points[split].subtract(this.points[split + 1]),
				tanCenter = V1.add(V2).divide(2).normalize();
			this.fitCubic(first, split, tan1, tanCenter);
			this.fitCubic(split, last, tanCenter.negate(), tan2);
		},

		addCurve: function(curve) {
			var prev = this.segments[this.segments.length - 1];
			prev.setHandleOut(curve[1].subtract(curve[0]));
			this.segments.push(
					new Segment(curve[3], curve[2].subtract(curve[3])));
		},

		generateBezier: function(first, last, uPrime, tan1, tan2) {
			var epsilon = 1e-12,
				pt1 = this.points[first],
				pt2 = this.points[last],
				C = [[0, 0], [0, 0]],
				X = [0, 0];

			for (var i = 0, l = last - first + 1; i < l; i++) {
				var u = uPrime[i],
					t = 1 - u,
					b = 3 * u * t,
					b0 = t * t * t,
					b1 = b * t,
					b2 = b * u,
					b3 = u * u * u,
					a1 = tan1.normalize(b1),
					a2 = tan2.normalize(b2),
					tmp = this.points[first + i]
						.subtract(pt1.multiply(b0 + b1))
						.subtract(pt2.multiply(b2 + b3));
				C[0][0] += a1.dot(a1);
				C[0][1] += a1.dot(a2);
				C[1][0] = C[0][1];
				C[1][1] += a2.dot(a2);
				X[0] += a1.dot(tmp);
				X[1] += a2.dot(tmp);
			}

			var detC0C1 = C[0][0] * C[1][1] - C[1][0] * C[0][1],
				alpha1, alpha2;
			if (Math.abs(detC0C1) > epsilon) {
				var detC0X	= C[0][0] * X[1]	- C[1][0] * X[0],
					detXC1	= X[0]	  * C[1][1] - X[1]	  * C[0][1];
				alpha1 = detXC1 / detC0C1;
				alpha2 = detC0X / detC0C1;
			} else {
				var c0 = C[0][0] + C[0][1],
					c1 = C[1][0] + C[1][1];
				if (Math.abs(c0) > epsilon) {
					alpha1 = alpha2 = X[0] / c0;
				} else if (Math.abs(c1) > epsilon) {
					alpha1 = alpha2 = X[1] / c1;
				} else {
					alpha1 = alpha2 = 0;
				}
			}

			var segLength = pt2.getDistance(pt1),
				eps = epsilon * segLength,
				handle1,
				handle2;
			if (alpha1 < eps || alpha2 < eps) {
				alpha1 = alpha2 = segLength / 3;
			} else {
				var line = pt2.subtract(pt1);
				handle1 = tan1.normalize(alpha1);
				handle2 = tan2.normalize(alpha2);
				if (handle1.dot(line) - handle2.dot(line) > segLength * segLength) {
					alpha1 = alpha2 = segLength / 3;
					handle1 = handle2 = null;
				}
			}

			return [pt1, pt1.add(handle1 || tan1.normalize(alpha1)),
					pt2.add(handle2 || tan2.normalize(alpha2)), pt2];
		},

		reparameterize: function(first, last, u, curve) {
			for (var i = first; i <= last; i++) {
				u[i - first] = this.findRoot(curve, this.points[i], u[i - first]);
			}
			for (var i = 1, l = u.length; i < l; i++) {
				if (u[i] <= u[i - 1])
					return false;
			}
			return true;
		},

		findRoot: function(curve, point, u) {
			var curve1 = [],
				curve2 = [];
			for (var i = 0; i <= 2; i++) {
				curve1[i] = curve[i + 1].subtract(curve[i]).multiply(3);
			}
			for (var i = 0; i <= 1; i++) {
				curve2[i] = curve1[i + 1].subtract(curve1[i]).multiply(2);
			}
			var pt = this.evaluate(3, curve, u),
				pt1 = this.evaluate(2, curve1, u),
				pt2 = this.evaluate(1, curve2, u),
				diff = pt.subtract(point),
				df = pt1.dot(pt1) + diff.dot(pt2);
			if (Math.abs(df) < 1e-6)
				return u;
			return u - diff.dot(pt1) / df;
		},

		evaluate: function(degree, curve, t) {
			var tmp = curve.slice();
			for (var i = 1; i <= degree; i++) {
				for (var j = 0; j <= degree - i; j++) {
					tmp[j] = tmp[j].multiply(1 - t).add(tmp[j + 1].multiply(t));
				}
			}
			return tmp[0];
		},

		chordLengthParameterize: function(first, last) {
			var u = [0];
			for (var i = first + 1; i <= last; i++) {
				u[i - first] = u[i - first - 1]
						+ this.points[i].getDistance(this.points[i - 1]);
			}
			for (var i = 1, m = last - first; i <= m; i++) {
				u[i] /= u[m];
			}
			return u;
		},

		findMaxError: function(first, last, curve, u) {
			var index = Math.floor((last - first + 1) / 2),
				maxDist = 0;
			for (var i = first + 1; i < last; i++) {
				var P = this.evaluate(3, curve, u[i - first]);
				var v = P.subtract(this.points[i]);
				var dist = v.x * v.x + v.y * v.y;
				if (dist >= maxDist) {
					maxDist = dist;
					index = i;
				}
			}
			return {
				error: maxDist,
				index: index
			};
		}
	});

	var TextItem = Item.extend({
		_class: 'TextItem',
		_boundsSelected: true,
		_applyMatrix: false,
		_canApplyMatrix: false,
		_serializeFields: {
			content: null
		},
		_boundsGetter: 'getBounds',

		initialize: function TextItem(arg) {
			this._content = '';
			this._lines = [];
			var hasProps = arg && Base.isPlainObject(arg)
					&& arg.x === undefined && arg.y === undefined;
			this._initialize(hasProps && arg, !hasProps && Point.read(arguments));
		},

		_equals: function(item) {
			return this._content === item._content;
		},

		_clone: function _clone(copy, insert, includeMatrix) {
			copy.setContent(this._content);
			return _clone.base.call(this, copy, insert, includeMatrix);
		},

		getContent: function() {
			return this._content;
		},

		setContent: function(content) {
			this._content = '' + content;
			this._lines = this._content.split(/\r\n|\n|\r/mg);
			this._changed(265);
		},

		isEmpty: function() {
			return !this._content;
		},

		getCharacterStyle: '#getStyle',
		setCharacterStyle: '#setStyle',

		getParagraphStyle: '#getStyle',
		setParagraphStyle: '#setStyle'
	});

	var PointText = TextItem.extend({
		_class: 'PointText',

		initialize: function PointText() {
			TextItem.apply(this, arguments);
		},

		clone: function(insert) {
			return this._clone(new PointText(Item.NO_INSERT), insert);
		},

		getPoint: function() {
			var point = this._matrix.getTranslation();
			return new LinkedPoint(point.x, point.y, this, 'setPoint');
		},

		setPoint: function() {
			var point = Point.read(arguments);
			this.translate(point.subtract(this._matrix.getTranslation()));
		},

		_draw: function(ctx) {
			if (!this._content)
				return;
			this._setStyles(ctx);
			var style = this._style,
				lines = this._lines,
				leading = style.getLeading(),
				shadowColor = ctx.shadowColor;
			ctx.font = style.getFontStyle();
			ctx.textAlign = style.getJustification();
			for (var i = 0, l = lines.length; i < l; i++) {
				ctx.shadowColor = shadowColor;
				var line = lines[i];
				if (style.hasFill()) {
					ctx.fillText(line, 0, 0);
					ctx.shadowColor = 'rgba(0,0,0,0)';
				}
				if (style.hasStroke())
					ctx.strokeText(line, 0, 0);
				ctx.translate(0, leading);
			}
		},

		_getBounds: function(getter, matrix) {
			var style = this._style,
				lines = this._lines,
				numLines = lines.length,
				justification = style.getJustification(),
				leading = style.getLeading(),
				width = this.getView().getTextWidth(style.getFontStyle(), lines),
				x = 0;
			if (justification !== 'left')
				x -= width / (justification === 'center' ? 2: 1);
			var bounds = new Rectangle(x,
						numLines ? - 0.75 * leading : 0,
						width, numLines * leading);
			return matrix ? matrix._transformBounds(bounds, bounds) : bounds;
		}
	});

	var Color = Base.extend(new function() {
		var types = {
			gray: ['gray'],
			rgb: ['red', 'green', 'blue'],
			hsb: ['hue', 'saturation', 'brightness'],
			hsl: ['hue', 'saturation', 'lightness'],
			gradient: ['gradient', 'origin', 'destination', 'highlight']
		};

		var componentParsers = {},
			colorCache = {},
			colorCtx;

		function fromCSS(string) {
			var match = string.match(/^#(\w{1,2})(\w{1,2})(\w{1,2})$/),
				components;
			if (match) {
				components = [0, 0, 0];
				for (var i = 0; i < 3; i++) {
					var value = match[i + 1];
					components[i] = parseInt(value.length == 1
							? value + value : value, 16) / 255;
				}
			} else if (match = string.match(/^rgba?\((.*)\)$/)) {
				components = match[1].split(',');
				for (var i = 0, l = components.length; i < l; i++) {
					var value = +components[i];
					components[i] = i < 3 ? value / 255 : value;
				}
			} else {
				var cached = colorCache[string];
				if (!cached) {
					if (!colorCtx) {
						colorCtx = CanvasProvider.getContext(1, 1);
						colorCtx.globalCompositeOperation = 'copy';
					}
					colorCtx.fillStyle = 'rgba(0,0,0,0)';
					colorCtx.fillStyle = string;
					colorCtx.fillRect(0, 0, 1, 1);
					var data = colorCtx.getImageData(0, 0, 1, 1).data;
					cached = colorCache[string] = [
						data[0] / 255,
						data[1] / 255,
						data[2] / 255
					];
				}
				components = cached.slice();
			}
			return components;
		}

		var hsbIndices = [
			[0, 3, 1],
			[2, 0, 1],
			[1, 0, 3],
			[1, 2, 0],
			[3, 1, 0],
			[0, 1, 2]
		];

		var converters = {
			'rgb-hsb': function(r, g, b) {
				var max = Math.max(r, g, b),
					min = Math.min(r, g, b),
					delta = max - min,
					h = delta === 0 ? 0
						:	( max == r ? (g - b) / delta + (g < b ? 6 : 0)
							: max == g ? (b - r) / delta + 2
							:			 (r - g) / delta + 4) * 60;
				return [h, max === 0 ? 0 : delta / max, max];
			},

			'hsb-rgb': function(h, s, b) {
				h = (((h / 60) % 6) + 6) % 6;
				var i = Math.floor(h),
					f = h - i,
					i = hsbIndices[i],
					v = [
						b,
						b * (1 - s),
						b * (1 - s * f),
						b * (1 - s * (1 - f))
					];
				return [v[i[0]], v[i[1]], v[i[2]]];
			},

			'rgb-hsl': function(r, g, b) {
				var max = Math.max(r, g, b),
					min = Math.min(r, g, b),
					delta = max - min,
					achromatic = delta === 0,
					h = achromatic ? 0
						:	( max == r ? (g - b) / delta + (g < b ? 6 : 0)
							: max == g ? (b - r) / delta + 2
							:			 (r - g) / delta + 4) * 60,
					l = (max + min) / 2,
					s = achromatic ? 0 : l < 0.5
							? delta / (max + min)
							: delta / (2 - max - min);
				return [h, s, l];
			},

			'hsl-rgb': function(h, s, l) {
				h = (((h / 360) % 1) + 1) % 1;
				if (s === 0)
					return [l, l, l];
				var t3s = [ h + 1 / 3, h, h - 1 / 3 ],
					t2 = l < 0.5 ? l * (1 + s) : l + s - l * s,
					t1 = 2 * l - t2,
					c = [];
				for (var i = 0; i < 3; i++) {
					var t3 = t3s[i];
					if (t3 < 0) t3 += 1;
					if (t3 > 1) t3 -= 1;
					c[i] = 6 * t3 < 1
						? t1 + (t2 - t1) * 6 * t3
						: 2 * t3 < 1
							? t2
							: 3 * t3 < 2
								? t1 + (t2 - t1) * ((2 / 3) - t3) * 6
								: t1;
				}
				return c;
			},

			'rgb-gray': function(r, g, b) {
				return [r * 0.2989 + g * 0.587 + b * 0.114];
			},

			'gray-rgb': function(g) {
				return [g, g, g];
			},

			'gray-hsb': function(g) {
				return [0, 0, g];
			},

			'gray-hsl': function(g) {
				return [0, 0, g];
			},

			'gradient-rgb': function() {
				return [];
			},

			'rgb-gradient': function() {
				return [];
			}

		};

		return Base.each(types, function(properties, type) {
			componentParsers[type] = [];
			Base.each(properties, function(name, index) {
				var part = Base.capitalize(name),
					hasOverlap = /^(hue|saturation)$/.test(name),
					parser = componentParsers[type][index] = name === 'gradient'
						? function(value) {
							var current = this._components[0];
							value = Gradient.read(Array.isArray(value) ? value
									: arguments, 0, { readNull: true });
							if (current !== value) {
								if (current)
									current._removeOwner(this);
								if (value)
									value._addOwner(this);
							}
							return value;
						}
						: type === 'gradient'
							? function() {
								return Point.read(arguments, 0, {
										readNull: name === 'highlight',
										clone: true
								});
							}
							: function(value) {
								return value == null || isNaN(value) ? 0 : value;
							};

				this['get' + part] = function() {
					return this._type === type
						|| hasOverlap && /^hs[bl]$/.test(this._type)
							? this._components[index]
							: this._convert(type)[index];
				};

				this['set' + part] = function(value) {
					if (this._type !== type
							&& !(hasOverlap && /^hs[bl]$/.test(this._type))) {
						this._components = this._convert(type);
						this._properties = types[type];
						this._type = type;
					}
					this._components[index] = parser.call(this, value);
					this._changed();
				};
			}, this);
		}, {
			_class: 'Color',
			_readIndex: true,

			initialize: function Color(arg) {
				var slice = Array.prototype.slice,
					args = arguments,
					read = 0,
					type,
					components,
					alpha,
					values;
				if (Array.isArray(arg)) {
					args = arg;
					arg = args[0];
				}
				var argType = arg != null && typeof arg;
				if (argType === 'string' && arg in types) {
					type = arg;
					arg = args[1];
					if (Array.isArray(arg)) {
						components = arg;
						alpha = args[2];
					} else {
						if (this.__read)
							read = 1;
						args = slice.call(args, 1);
						argType = typeof arg;
					}
				}
				if (!components) {
					values = argType === 'number'
							? args
							: argType === 'object' && arg.length != null
								? arg
								: null;
					if (values) {
						if (!type)
							type = values.length >= 3
									? 'rgb'
									: 'gray';
						var length = types[type].length;
						alpha = values[length];
						if (this.__read)
							read += values === arguments
								? length + (alpha != null ? 1 : 0)
								: 1;
						if (values.length > length)
							values = slice.call(values, 0, length);
					} else if (argType === 'string') {
						type = 'rgb';
						components = fromCSS(arg);
						if (components.length === 4) {
							alpha = components[3];
							components.length--;
						}
					} else if (argType === 'object') {
						if (arg.constructor === Color) {
							type = arg._type;
							components = arg._components.slice();
							alpha = arg._alpha;
							if (type === 'gradient') {
								for (var i = 1, l = components.length; i < l; i++) {
									var point = components[i];
									if (point)
										components[i] = point.clone();
								}
							}
						} else if (arg.constructor === Gradient) {
							type = 'gradient';
							values = args;
						} else {
							type = 'hue' in arg
								? 'lightness' in arg
									? 'hsl'
									: 'hsb'
								: 'gradient' in arg || 'stops' in arg
										|| 'radial' in arg
									? 'gradient'
									: 'gray' in arg
										? 'gray'
										: 'rgb';
							var properties = types[type],
								parsers = componentParsers[type];
							this._components = components = [];
							for (var i = 0, l = properties.length; i < l; i++) {
								var value = arg[properties[i]];
								if (value == null && i === 0 && type === 'gradient'
										&& 'stops' in arg) {
									value = {
										stops: arg.stops,
										radial: arg.radial
									};
								}
								value = parsers[i].call(this, value);
								if (value != null)
									components[i] = value;
							}
							alpha = arg.alpha;
						}
					}
					if (this.__read && type)
						read = 1;
				}
				this._type = type || 'rgb';
				this._id = UID.get(Color);
				if (!components) {
					this._components = components = [];
					var parsers = componentParsers[this._type];
					for (var i = 0, l = parsers.length; i < l; i++) {
						var value = parsers[i].call(this, values && values[i]);
						if (value != null)
							components[i] = value;
					}
				}
				this._components = components;
				this._properties = types[this._type];
				this._alpha = alpha;
				if (this.__read)
					this.__read = read;
			},

			_serialize: function(options, dictionary) {
				var components = this.getComponents();
				return Base.serialize(
						/^(gray|rgb)$/.test(this._type)
							? components
							: [this._type].concat(components),
						options, true, dictionary);
			},

			_changed: function() {
				this._canvasStyle = null;
				if (this._owner)
					this._owner._changed(65);
			},

			_convert: function(type) {
				var converter;
				return this._type === type
						? this._components.slice()
						: (converter = converters[this._type + '-' + type])
							? converter.apply(this, this._components)
							: converters['rgb-' + type].apply(this,
								converters[this._type + '-rgb'].apply(this,
									this._components));
			},

			convert: function(type) {
				return new Color(type, this._convert(type), this._alpha);
			},

			getType: function() {
				return this._type;
			},

			setType: function(type) {
				this._components = this._convert(type);
				this._properties = types[type];
				this._type = type;
			},

			getComponents: function() {
				var components = this._components.slice();
				if (this._alpha != null)
					components.push(this._alpha);
				return components;
			},

			getAlpha: function() {
				return this._alpha != null ? this._alpha : 1;
			},

			setAlpha: function(alpha) {
				this._alpha = alpha == null ? null : Math.min(Math.max(alpha, 0), 1);
				this._changed();
			},

			hasAlpha: function() {
				return this._alpha != null;
			},

			equals: function(color) {
				var col = Base.isPlainValue(color, true)
						? Color.read(arguments)
						: color;
				return col === this || col && this._class === col._class
						&& this._type === col._type
						&& this._alpha === col._alpha
						&& Base.equals(this._components, col._components)
						|| false;
			},

			toString: function() {
				var properties = this._properties,
					parts = [],
					isGradient = this._type === 'gradient',
					f = Formatter.instance;
				for (var i = 0, l = properties.length; i < l; i++) {
					var value = this._components[i];
					if (value != null)
						parts.push(properties[i] + ': '
								+ (isGradient ? value : f.number(value)));
				}
				if (this._alpha != null)
					parts.push('alpha: ' + f.number(this._alpha));
				return '{ ' + parts.join(', ') + ' }';
			},

			toCSS: function(hex) {
				var components = this._convert('rgb'),
					alpha = hex || this._alpha == null ? 1 : this._alpha;
				function convert(val) {
					return Math.round((val < 0 ? 0 : val > 1 ? 1 : val) * 255);
				}
				components = [
					convert(components[0]),
					convert(components[1]),
					convert(components[2])
				];
				if (alpha < 1)
					components.push(alpha < 0 ? 0 : alpha);
				return hex
						? '#' + ((1 << 24) + (components[0] << 16)
							+ (components[1] << 8)
							+ components[2]).toString(16).slice(1)
						: (components.length == 4 ? 'rgba(' : 'rgb(')
							+ components.join(',') + ')';
			},

			toCanvasStyle: function(ctx) {
				if (this._canvasStyle)
					return this._canvasStyle;
				if (this._type !== 'gradient')
					return this._canvasStyle = this.toCSS();
				var components = this._components,
					gradient = components[0],
					stops = gradient._stops,
					origin = components[1],
					destination = components[2],
					canvasGradient;
				if (gradient._radial) {
					var radius = destination.getDistance(origin),
						highlight = components[3];
					if (highlight) {
						var vector = highlight.subtract(origin);
						if (vector.getLength() > radius)
							highlight = origin.add(vector.normalize(radius - 0.1));
					}
					var start = highlight || origin;
					canvasGradient = ctx.createRadialGradient(start.x, start.y,
							0, origin.x, origin.y, radius);
				} else {
					canvasGradient = ctx.createLinearGradient(origin.x, origin.y,
							destination.x, destination.y);
				}
				for (var i = 0, l = stops.length; i < l; i++) {
					var stop = stops[i];
					canvasGradient.addColorStop(stop._rampPoint,
							stop._color.toCanvasStyle());
				}
				return this._canvasStyle = canvasGradient;
			},

			transform: function(matrix) {
				if (this._type === 'gradient') {
					var components = this._components;
					for (var i = 1, l = components.length; i < l; i++) {
						var point = components[i];
						matrix._transformPoint(point, point, true);
					}
					this._changed();
				}
			},

			statics: {
				_types: types,

				random: function() {
					var random = Math.random;
					return new Color(random(), random(), random());
				}
			}
		});
	},
	new function() {
		var operators = {
			add: function(a, b) {
				return a + b;
			},

			subtract: function(a, b) {
				return a - b;
			},

			multiply: function(a, b) {
				return a * b;
			},

			divide: function(a, b) {
				return a / b;
			}
		};

		return Base.each(operators, function(operator, name) {
			this[name] = function(color) {
				color = Color.read(arguments);
				var type = this._type,
					components1 = this._components,
					components2 = color._convert(type);
				for (var i = 0, l = components1.length; i < l; i++)
					components2[i] = operator(components1[i], components2[i]);
				return new Color(type, components2,
						this._alpha != null
								? operator(this._alpha, color.getAlpha())
								: null);
			};
		}, {
		});
	});

	var Gradient = Base.extend({
		_class: 'Gradient',

		initialize: function Gradient(stops, radial) {
			this._id = UID.get();
			if (stops && this._set(stops))
				stops = radial = null;
			if (!this._stops)
				this.setStops(stops || ['white', 'black']);
			if (this._radial == null)
				this.setRadial(typeof radial === 'string' && radial === 'radial'
						|| radial || false);
		},

		_serialize: function(options, dictionary) {
			return dictionary.add(this, function() {
				return Base.serialize([this._stops, this._radial],
						options, true, dictionary);
			});
		},

		_changed: function() {
			for (var i = 0, l = this._owners && this._owners.length; i < l; i++)
				this._owners[i]._changed();
		},

		_addOwner: function(color) {
			if (!this._owners)
				this._owners = [];
			this._owners.push(color);
		},

		_removeOwner: function(color) {
			var index = this._owners ? this._owners.indexOf(color) : -1;
			if (index != -1) {
				this._owners.splice(index, 1);
				if (this._owners.length === 0)
					this._owners = undefined;
			}
		},

		clone: function() {
			var stops = [];
			for (var i = 0, l = this._stops.length; i < l; i++)
				stops[i] = this._stops[i].clone();
			return new Gradient(stops, this._radial);
		},

		getStops: function() {
			return this._stops;
		},

		setStops: function(stops) {
			if (this.stops) {
				for (var i = 0, l = this._stops.length; i < l; i++)
					this._stops[i]._owner = undefined;
			}
			if (stops.length < 2)
				throw new Error(
						'Gradient stop list needs to contain at least two stops.');
			this._stops = GradientStop.readAll(stops, 0, { clone: true });
			for (var i = 0, l = this._stops.length; i < l; i++) {
				var stop = this._stops[i];
				stop._owner = this;
				if (stop._defaultRamp)
					stop.setRampPoint(i / (l - 1));
			}
			this._changed();
		},

		getRadial: function() {
			return this._radial;
		},

		setRadial: function(radial) {
			this._radial = radial;
			this._changed();
		},

		equals: function(gradient) {
			if (gradient === this)
				return true;
			if (gradient && this._class === gradient._class
					&& this._stops.length === gradient._stops.length) {
				for (var i = 0, l = this._stops.length; i < l; i++) {
					if (!this._stops[i].equals(gradient._stops[i]))
						return false;
				}
				return true;
			}
			return false;
		}
	});

	var GradientStop = Base.extend({
		_class: 'GradientStop',

		initialize: function GradientStop(arg0, arg1) {
			if (arg0) {
				var color, rampPoint;
				if (arg1 === undefined && Array.isArray(arg0)) {
					color = arg0[0];
					rampPoint = arg0[1];
				} else if (arg0.color) {
					color = arg0.color;
					rampPoint = arg0.rampPoint;
				} else {
					color = arg0;
					rampPoint = arg1;
				}
				this.setColor(color);
				this.setRampPoint(rampPoint);
			}
		},

		clone: function() {
			return new GradientStop(this._color.clone(), this._rampPoint);
		},

		_serialize: function(options, dictionary) {
			return Base.serialize([this._color, this._rampPoint], options, true,
					dictionary);
		},

		_changed: function() {
			if (this._owner)
				this._owner._changed(65);
		},

		getRampPoint: function() {
			return this._rampPoint;
		},

		setRampPoint: function(rampPoint) {
			this._defaultRamp = rampPoint == null;
			this._rampPoint = rampPoint || 0;
			this._changed();
		},

		getColor: function() {
			return this._color;
		},

		setColor: function(color) {
			this._color = Color.read(arguments);
			if (this._color === color)
				this._color = color.clone();
			this._color._owner = this;
			this._changed();
		},

		equals: function(stop) {
			return stop === this || stop && this._class === stop._class
					&& this._color.equals(stop._color)
					&& this._rampPoint == stop._rampPoint
					|| false;
		}
	});

	var Style = Base.extend(new function() {
		var defaults = {
			fillColor: undefined,
			strokeColor: undefined,
			strokeWidth: 1,
			strokeCap: 'butt',
			strokeJoin: 'miter',
			strokeScaling: true,
			miterLimit: 10,
			dashOffset: 0,
			dashArray: [],
			windingRule: 'nonzero',
			shadowColor: undefined,
			shadowBlur: 0,
			shadowOffset: new Point(),
			selectedColor: undefined,
			fontFamily: 'sans-serif',
			fontWeight: 'normal',
			fontSize: 12,
			font: 'sans-serif',
			leading: null,
			justification: 'left'
		};

		var flags = {
			strokeWidth: 97,
			strokeCap: 97,
			strokeJoin: 97,
			strokeScaling: 105,
			miterLimit: 97,
			fontFamily: 9,
			fontWeight: 9,
			fontSize: 9,
			font: 9,
			leading: 9,
			justification: 9
		};

		var item = { beans: true },
			fields = {
				_defaults: defaults,
				_textDefaults: new Base(defaults, {
					fillColor: new Color()
				}),
				beans: true
			};

		Base.each(defaults, function(value, key) {
			var isColor = /Color$/.test(key),
				isPoint = key === 'shadowOffset',
				part = Base.capitalize(key),
				flag = flags[key],
				set = 'set' + part,
				get = 'get' + part;

			fields[set] = function(value) {
				var owner = this._owner,
					children = owner && owner._children;
				if (children && children.length > 0
						&& !(owner instanceof CompoundPath)) {
					for (var i = 0, l = children.length; i < l; i++)
						children[i]._style[set](value);
				} else {
					var old = this._values[key];
					if (old !== value) {
						if (isColor) {
							if (old)
								old._owner = undefined;
							if (value && value.constructor === Color) {
								if (value._owner)
									value = value.clone();
								value._owner = owner;
							}
						}
						this._values[key] = value;
						if (owner)
							owner._changed(flag || 65);
					}
				}
			};

			fields[get] = function(_dontMerge) {
				var owner = this._owner,
					children = owner && owner._children,
					value;
				if (!children || children.length === 0 || _dontMerge
						|| owner instanceof CompoundPath) {
					var value = this._values[key];
					if (value === undefined) {
						value = this._defaults[key];
						if (value && value.clone)
							value = value.clone();
					} else {
						var ctor = isColor ? Color : isPoint ? Point : null;
						if (ctor && !(value && value.constructor === ctor)) {
							this._values[key] = value = ctor.read([value], 0,
									{ readNull: true, clone: true });
							if (value && isColor)
								value._owner = owner;
						}
					}
					return value;
				}
				for (var i = 0, l = children.length; i < l; i++) {
					var childValue = children[i]._style[get]();
					if (i === 0) {
						value = childValue;
					} else if (!Base.equals(value, childValue)) {
						return undefined;
					}
				}
				return value;
			};

			item[get] = function(_dontMerge) {
				return this._style[get](_dontMerge);
			};

			item[set] = function(value) {
				this._style[set](value);
			};
		});

		Item.inject(item);
		return fields;
	}, {
		_class: 'Style',

		initialize: function Style(style, _owner, _project) {
			this._values = {};
			this._owner = _owner;
			this._project = _owner && _owner._project || _project || paper.project;
			if (_owner instanceof TextItem)
				this._defaults = this._textDefaults;
			if (style)
				this.set(style);
		},

		set: function(style) {
			var isStyle = style instanceof Style,
				values = isStyle ? style._values : style;
			if (values) {
				for (var key in values) {
					if (key in this._defaults) {
						var value = values[key];
						this[key] = value && isStyle && value.clone
								? value.clone() : value;
					}
				}
			}
		},

		equals: function(style) {
			return style === this || style && this._class === style._class
					&& Base.equals(this._values, style._values)
					|| false;
		},

		hasFill: function() {
			return !!this.getFillColor();
		},

		hasStroke: function() {
			return !!this.getStrokeColor() && this.getStrokeWidth() > 0;
		},

		hasShadow: function() {
			return !!this.getShadowColor() && this.getShadowBlur() > 0;
		},

		getView: function() {
			return this._project.getView();
		},

		getFontStyle: function() {
			var fontSize = this.getFontSize();
			return this.getFontWeight()
					+ ' ' + fontSize + (/[a-z]/i.test(fontSize + '') ? ' ' : 'px ')
					+ this.getFontFamily();
		},

		getFont: '#getFontFamily',
		setFont: '#setFontFamily',

		getLeading: function getLeading() {
			var leading = getLeading.base.call(this),
				fontSize = this.getFontSize();
			if (/pt|em|%|px/.test(fontSize))
				fontSize = this.getView().getPixelSize(fontSize);
			return leading != null ? leading : fontSize * 1.2;
		}

	});

	var DomElement = new function() {
		function handlePrefix(el, name, set, value) {
			var prefixes = ['', 'webkit', 'moz', 'Moz', 'ms', 'o'],
				suffix = name[0].toUpperCase() + name.substring(1);
			for (var i = 0; i < 6; i++) {
				var prefix = prefixes[i],
					key = prefix ? prefix + suffix : name;
				if (key in el) {
					if (set) {
						el[key] = value;
					} else {
						return el[key];
					}
					break;
				}
			}
		}

		return {
			getStyles: function(el) {
				var doc = el && el.nodeType !== 9 ? el.ownerDocument : el,
					view = doc && doc.defaultView;
				return view && view.getComputedStyle(el, '');
			},

			getBounds: function(el, viewport) {
				var doc = el.ownerDocument,
					body = doc.body,
					html = doc.documentElement,
					rect;
				try {
					rect = el.getBoundingClientRect();
				} catch (e) {
					rect = { left: 0, top: 0, width: 0, height: 0 };
				}
				var x = rect.left - (html.clientLeft || body.clientLeft || 0),
					y = rect.top - (html.clientTop || body.clientTop || 0);
				if (!viewport) {
					var view = doc.defaultView;
					x += view.pageXOffset || html.scrollLeft || body.scrollLeft;
					y += view.pageYOffset || html.scrollTop || body.scrollTop;
				}
				return new Rectangle(x, y, rect.width, rect.height);
			},

			getViewportBounds: function(el) {
				var doc = el.ownerDocument,
					view = doc.defaultView,
					html = doc.documentElement;
				return new Rectangle(0, 0,
					view.innerWidth || html.clientWidth,
					view.innerHeight || html.clientHeight
				);
			},

			getOffset: function(el, viewport) {
				return DomElement.getBounds(el, viewport).getPoint();
			},

			getSize: function(el) {
				return DomElement.getBounds(el, true).getSize();
			},

			isInvisible: function(el) {
				return DomElement.getSize(el).equals(new Size(0, 0));
			},

			isInView: function(el) {
				return !DomElement.isInvisible(el)
						&& DomElement.getViewportBounds(el).intersects(
							DomElement.getBounds(el, true));
			},

			getPrefixed: function(el, name) {
				return handlePrefix(el, name);
			},

			setPrefixed: function(el, name, value) {
				if (typeof name === 'object') {
					for (var key in name)
						handlePrefix(el, key, true, name[key]);
				} else {
					handlePrefix(el, name, true, value);
				}
			}
		};
	};

	var DomEvent = {
		add: function(el, events) {
			for (var type in events) {
				var func = events[type],
					parts = type.split(/[\s,]+/g);
				for (var i = 0, l = parts.length; i < l; i++)
					el.addEventListener(parts[i], func, false);
			}
		},

		remove: function(el, events) {
			for (var type in events) {
				var func = events[type],
					parts = type.split(/[\s,]+/g);
				for (var i = 0, l = parts.length; i < l; i++)
					el.removeEventListener(parts[i], func, false);
			}
		},

		getPoint: function(event) {
			var pos = event.targetTouches
					? event.targetTouches.length
						? event.targetTouches[0]
						: event.changedTouches[0]
					: event;
			return new Point(
				pos.pageX || pos.clientX + document.documentElement.scrollLeft,
				pos.pageY || pos.clientY + document.documentElement.scrollTop
			);
		},

		getTarget: function(event) {
			return event.target || event.srcElement;
		},

		getRelatedTarget: function(event) {
			return event.relatedTarget || event.toElement;
		},

		getOffset: function(event, target) {
			return DomEvent.getPoint(event).subtract(DomElement.getOffset(
					target || DomEvent.getTarget(event)));
		},

		stop: function(event) {
			event.stopPropagation();
			event.preventDefault();
		}
	};

	DomEvent.requestAnimationFrame = new function() {
		var nativeRequest = DomElement.getPrefixed(window, 'requestAnimationFrame'),
			requested = false,
			callbacks = [],
			focused = true,
			timer;

		DomEvent.add(window, {
			focus: function() {
				focused = true;
			},
			blur: function() {
				focused = false;
			}
		});

		function handleCallbacks() {
			for (var i = callbacks.length - 1; i >= 0; i--) {
				var entry = callbacks[i],
					func = entry[0],
					el = entry[1];
				if (!el || (PaperScope.getAttribute(el, 'keepalive') == 'true'
						|| focused) && DomElement.isInView(el)) {
					callbacks.splice(i, 1);
					func();
				}
			}
			if (nativeRequest) {
				if (callbacks.length) {
					nativeRequest(handleCallbacks);
				} else {
					requested = false;
				}
			}
		}

		return function(callback, element) {
			callbacks.push([callback, element]);
			if (nativeRequest) {
				if (!requested) {
					nativeRequest(handleCallbacks);
					requested = true;
				}
			} else if (!timer) {
				timer = setInterval(handleCallbacks, 1000 / 60);
			}
		};
	};

	var View = Base.extend(Emitter, {
		_class: 'View',

		initialize: function View(project, element) {
			this._project = project;
			this._scope = project._scope;
			this._element = element;
			var size;
			if (!this._pixelRatio)
				this._pixelRatio = window.devicePixelRatio || 1;
			this._id = element.getAttribute('id');
			if (this._id == null)
				element.setAttribute('id', this._id = 'view-' + View._id++);
			DomEvent.add(element, this._viewEvents);
			var none = 'none';
			DomElement.setPrefixed(element.style, {
				userSelect: none,
				touchAction: none,
				touchCallout: none,
				contentZooming: none,
				userDrag: none,
				tapHighlightColor: 'rgba(0,0,0,0)'
			});

			function getSize(name) {
				return element[name] || parseInt(element.getAttribute(name), 10);
			};

			function getCanvasSize() {
				var size = DomElement.getSize(element);
				return size.isNaN() || size.isZero()
						? new Size(getSize('width'), getSize('height'))
						: size;
			};

			if (PaperScope.hasAttribute(element, 'resize')) {
				var that = this;
				DomEvent.add(window, this._windowEvents = {
					resize: function() {
						that.setViewSize(getCanvasSize());
					}
				});
			}
			this._setViewSize(size = getCanvasSize());
			if (PaperScope.hasAttribute(element, 'stats')
					&& typeof Stats !== 'undefined') {
				this._stats = new Stats();
				var stats = this._stats.domElement,
					style = stats.style,
					offset = DomElement.getOffset(element);
				style.position = 'absolute';
				style.left = offset.x + 'px';
				style.top = offset.y + 'px';
				document.body.appendChild(stats);
			}
			View._views.push(this);
			View._viewsById[this._id] = this;
			this._viewSize = size;
			(this._matrix = new Matrix())._owner = this;
			this._zoom = 1;
			if (!View._focused)
				View._focused = this;
			this._frameItems = {};
			this._frameItemCount = 0;
		},

		remove: function() {
			if (!this._project)
				return false;
			if (View._focused === this)
				View._focused = null;
			View._views.splice(View._views.indexOf(this), 1);
			delete View._viewsById[this._id];
			if (this._project._view === this)
				this._project._view = null;
			DomEvent.remove(this._element, this._viewEvents);
			DomEvent.remove(window, this._windowEvents);
			this._element = this._project = null;
			this.off('frame');
			this._animate = false;
			this._frameItems = {};
			return true;
		},

		_events: Base.each(['onResize', 'onMouseDown', 'onMouseUp', 'onMouseMove'],
			function(name) {
				this[name] = {
					install: function(type) {
						this._installEvent(type);
					},

					uninstall: function(type) {
						this._uninstallEvent(type);
					}
				};
			}, {
				onFrame: {
					install: function() {
						this.play();
					},

					uninstall: function() {
						this.pause();
					}
				}
			}
		),

		_animate: false,
		_time: 0,
		_count: 0,

		_requestFrame: function() {
			var that = this;
			DomEvent.requestAnimationFrame(function() {
				that._requested = false;
				if (!that._animate)
					return;
				that._requestFrame();
				that._handleFrame();
			}, this._element);
			this._requested = true;
		},

		_handleFrame: function() {
			paper = this._scope;
			var now = Date.now() / 1000,
				delta = this._before ? now - this._before : 0;
			this._before = now;
			this._handlingFrame = true;
			this.emit('frame', new Base({
				delta: delta,
				time: this._time += delta,
				count: this._count++
			}));
			if (this._stats)
				this._stats.update();
			this._handlingFrame = false;
			this.update();
		},

		_animateItem: function(item, animate) {
			var items = this._frameItems;
			if (animate) {
				items[item._id] = {
					item: item,
					time: 0,
					count: 0
				};
				if (++this._frameItemCount === 1)
					this.on('frame', this._handleFrameItems);
			} else {
				delete items[item._id];
				if (--this._frameItemCount === 0) {
					this.off('frame', this._handleFrameItems);
				}
			}
		},

		_handleFrameItems: function(event) {
			for (var i in this._frameItems) {
				var entry = this._frameItems[i];
				entry.item.emit('frame', new Base(event, {
					time: entry.time += event.delta,
					count: entry.count++
				}));
			}
		},

		_update: function() {
			this._project._needsUpdate = true;
			if (this._handlingFrame)
				return;
			if (this._animate) {
				this._handleFrame();
			} else {
				this.update();
			}
		},

		_changed: function(flags) {
			if (flags & 1)
				this._project._needsUpdate = true;
		},

		_transform: function(matrix) {
			this._matrix.concatenate(matrix);
			this._bounds = null;
			this._update();
		},

		getElement: function() {
			return this._element;
		},

		getPixelRatio: function() {
			return this._pixelRatio;
		},

		getResolution: function() {
			return this._pixelRatio * 72;
		},

		getViewSize: function() {
			var size = this._viewSize;
			return new LinkedSize(size.width, size.height, this, 'setViewSize');
		},

		setViewSize: function() {
			var size = Size.read(arguments),
				delta = size.subtract(this._viewSize);
			if (delta.isZero())
				return;
			this._viewSize.set(size.width, size.height);
			this._setViewSize(size);
			this._bounds = null;
			this.emit('resize', {
				size: size,
				delta: delta
			});
			this._update();
		},

		_setViewSize: function(size) {
			var element = this._element;
			element.width = size.width;
			element.height = size.height;
		},

		getBounds: function() {
			if (!this._bounds)
				this._bounds = this._matrix.inverted()._transformBounds(
						new Rectangle(new Point(), this._viewSize));
			return this._bounds;
		},

		getSize: function() {
			return this.getBounds().getSize();
		},

		getCenter: function() {
			return this.getBounds().getCenter();
		},

		setCenter: function() {
			var center = Point.read(arguments);
			this.scrollBy(center.subtract(this.getCenter()));
		},

		getZoom: function() {
			return this._zoom;
		},

		setZoom: function(zoom) {
			this._transform(new Matrix().scale(zoom / this._zoom,
				this.getCenter()));
			this._zoom = zoom;
		},

		isVisible: function() {
			return DomElement.isInView(this._element);
		},

		scrollBy: function() {
			this._transform(new Matrix().translate(Point.read(arguments).negate()));
		},

		play: function() {
			this._animate = true;
			if (!this._requested)
				this._requestFrame();
		},

		pause: function() {
			this._animate = false;
		},

		draw: function() {
			this.update();
		},

		projectToView: function() {
			return this._matrix._transformPoint(Point.read(arguments));
		},

		viewToProject: function() {
			return this._matrix._inverseTransform(Point.read(arguments));
		}

	}, {
		statics: {
			_views: [],
			_viewsById: {},
			_id: 0,

			create: function(project, element) {
				if (typeof element === 'string')
					element = document.getElementById(element);
				return new CanvasView(project, element);
			}
		}
	},
	new function() {
		var tool,
			prevFocus,
			tempFocus,
			dragging = false;

		function getView(event) {
			var target = DomEvent.getTarget(event);
			return target.getAttribute && View._viewsById[target.getAttribute('id')];
		}

		function viewToProject(view, event) {
			return view.viewToProject(DomEvent.getOffset(event, view._element));
		}

		function updateFocus() {
			if (!View._focused || !View._focused.isVisible()) {
				for (var i = 0, l = View._views.length; i < l; i++) {
					var view = View._views[i];
					if (view && view.isVisible()) {
						View._focused = tempFocus = view;
						break;
					}
				}
			}
		}

		function handleMouseMove(view, point, event) {
			view._handleEvent('mousemove', point, event);
			var tool = view._scope.tool;
			if (tool) {
				tool._handleEvent(dragging && tool.responds('mousedrag')
						? 'mousedrag' : 'mousemove', point, event);
			}
			view.update();
			return tool;
		}

		var navigator = window.navigator,
			mousedown, mousemove, mouseup;
		if (navigator.pointerEnabled || navigator.msPointerEnabled) {
			mousedown = 'pointerdown MSPointerDown';
			mousemove = 'pointermove MSPointerMove';
			mouseup = 'pointerup pointercancel MSPointerUp MSPointerCancel';
		} else {
			mousedown = 'touchstart';
			mousemove = 'touchmove';
			mouseup = 'touchend touchcancel';
			if (!('ontouchstart' in window && navigator.userAgent.match(
					/mobile|tablet|ip(ad|hone|od)|android|silk/i))) {
				mousedown += ' mousedown';
				mousemove += ' mousemove';
				mouseup += ' mouseup';
			}
		}

		var viewEvents = {
			'selectstart dragstart': function(event) {
				if (dragging)
					event.preventDefault();
			}
		};

		var docEvents = {
			mouseout: function(event) {
				var view = View._focused,
					target = DomEvent.getRelatedTarget(event);
				if (view && (!target || target.nodeName === 'HTML'))
					handleMouseMove(view, viewToProject(view, event), event);
			},

			scroll: updateFocus
		};

		viewEvents[mousedown] = function(event) {
			var view = View._focused = getView(event),
				point = viewToProject(view, event);
			dragging = true;
			view._handleEvent('mousedown', point, event);
			if (tool = view._scope.tool)
				tool._handleEvent('mousedown', point, event);
			view.update();
		};

		docEvents[mousemove] = function(event) {
			var view = View._focused;
			if (!dragging) {
				var target = getView(event);
				if (target) {
					if (view !== target)
						handleMouseMove(view, viewToProject(view, event), event);
					prevFocus = view;
					view = View._focused = tempFocus = target;
				} else if (tempFocus && tempFocus === view) {
					view = View._focused = prevFocus;
					updateFocus();
				}
			}
			if (view) {
				var point = viewToProject(view, event);
				if (dragging || view.getBounds().contains(point))
					tool = handleMouseMove(view, point, event);
			}
		};

		docEvents[mouseup] = function(event) {
			var view = View._focused;
			if (!view || !dragging)
				return;
			var point = viewToProject(view, event);
			dragging = false;
			view._handleEvent('mouseup', point, event);
			if (tool)
				tool._handleEvent('mouseup', point, event);
			view.update();
		};

		DomEvent.add(document, docEvents);

		DomEvent.add(window, {
			load: updateFocus
		});

		var mouseFlags = {
			mousedown: {
				mousedown: 1,
				mousedrag: 1,
				click: 1,
				doubleclick: 1
			},
			mouseup: {
				mouseup: 1,
				mousedrag: 1,
				click: 1,
				doubleclick: 1
			},
			mousemove: {
				mousedrag: 1,
				mousemove: 1,
				mouseenter: 1,
				mouseleave: 1
			}
		};

		return {
			_viewEvents: viewEvents,

			_handleEvent: function() {},

			_installEvent: function(type) {
				var counters = this._eventCounters;
				if (counters) {
					for (var key in mouseFlags) {
						counters[key] = (counters[key] || 0)
								+ (mouseFlags[key][type] || 0);
					}
				}
			},

			_uninstallEvent: function(type) {
				var counters = this._eventCounters;
				if (counters) {
					for (var key in mouseFlags)
						counters[key] -= mouseFlags[key][type] || 0;
				}
			},

			statics: {
				updateFocus: updateFocus
			}
		};
	});

	var CanvasView = View.extend({
		_class: 'CanvasView',

		initialize: function CanvasView(project, canvas) {
			if (!(canvas instanceof HTMLCanvasElement)) {
				var size = Size.read(arguments, 1);
				if (size.isZero())
					throw new Error(
							'Cannot create CanvasView with the provided argument: '
							+ [].slice.call(arguments, 1));
				canvas = CanvasProvider.getCanvas(size);
			}
			this._context = canvas.getContext('2d');
			this._eventCounters = {};
			this._pixelRatio = 1;
			if (!/^off|false$/.test(PaperScope.getAttribute(canvas, 'hidpi'))) {
				var deviceRatio = window.devicePixelRatio || 1,
					backingStoreRatio = DomElement.getPrefixed(this._context,
							'backingStorePixelRatio') || 1;
				this._pixelRatio = deviceRatio / backingStoreRatio;
			}
			View.call(this, project, canvas);
		},

		_setViewSize: function(size) {
			var element = this._element,
				pixelRatio = this._pixelRatio,
				width = size.width,
				height = size.height;
			element.width = width * pixelRatio;
			element.height = height * pixelRatio;
			if (pixelRatio !== 1) {
				if (!PaperScope.hasAttribute(element, 'resize')) {
					var style = element.style;
					style.width = width + 'px';
					style.height = height + 'px';
				}
				this._context.scale(pixelRatio, pixelRatio);
			}
		},

		getPixelSize: function(size) {
			var browser = paper.browser,
				pixels;
			if (browser && browser.firefox) {
				var parent = this._element.parentNode,
					temp = document.createElement('div');
				temp.style.fontSize = size;
				parent.appendChild(temp);
				pixels = parseFloat(DomElement.getStyles(temp).fontSize);
				parent.removeChild(temp);
			} else {
				var ctx = this._context,
					prevFont = ctx.font;
				ctx.font = size + ' serif';
				pixels = parseFloat(ctx.font);
				ctx.font = prevFont;
			}
			return pixels;
		},

		getTextWidth: function(font, lines) {
			var ctx = this._context,
				prevFont = ctx.font,
				width = 0;
			ctx.font = font;
			for (var i = 0, l = lines.length; i < l; i++)
				width = Math.max(width, ctx.measureText(lines[i]).width);
			ctx.font = prevFont;
			return width;
		},

		update: function(force) {
			var project = this._project;
			if (!project || !force && !project._needsUpdate)
				return false;
			var ctx = this._context,
				size = this._viewSize;
			ctx.clearRect(0, 0, size.width + 1, size.height + 1);
			project.draw(ctx, this._matrix, this._pixelRatio);
			project._needsUpdate = false;
			return true;
		}
	},
	new function() {
		var downPoint,
			lastPoint,
			overPoint,
			downItem,
			lastItem,
			overItem,
			dragItem,
			dblClick,
			clickTime;

		function callEvent(view, type, event, point, target, lastPoint) {
			var item = target,
				mouseEvent;

			function call(obj) {
				if (obj.responds(type)) {
					if (!mouseEvent) {
						mouseEvent = new MouseEvent(type, event, point, target,
								lastPoint ? point.subtract(lastPoint) : null);
					}
					if (obj.emit(type, mouseEvent) && mouseEvent.isStopped) {
						event.preventDefault();
						return true;
					}
				}
			}

			while (item) {
				if (call(item))
					return true;
				item = item.getParent();
			}
			if (call(view))
				return true;
			return false;
		}

		return {
			_handleEvent: function(type, point, event) {
				if (!this._eventCounters[type])
					return;
				var project = this._project,
					hit = project.hitTest(point, {
						tolerance: 0,
						fill: true,
						stroke: true
					}),
					item = hit && hit.item,
					stopped = false;
				switch (type) {
				case 'mousedown':
					stopped = callEvent(this, type, event, point, item);
					dblClick = lastItem == item && (Date.now() - clickTime < 300);
					downItem = lastItem = item;
					downPoint = lastPoint = overPoint = point;
					dragItem = !stopped && item;
					while (dragItem && !dragItem.responds('mousedrag'))
						dragItem = dragItem._parent;
					break;
				case 'mouseup':
					stopped = callEvent(this, type, event, point, item, downPoint);
					if (dragItem) {
						if (lastPoint && !lastPoint.equals(point))
							callEvent(this, 'mousedrag', event, point, dragItem,
									lastPoint);
						if (item !== dragItem) {
							overPoint = point;
							callEvent(this, 'mousemove', event, point, item,
									overPoint);
						}
					}
					if (!stopped && item && item === downItem) {
						clickTime = Date.now();
						callEvent(this, dblClick && downItem.responds('doubleclick')
								? 'doubleclick' : 'click', event, downPoint, item);
						dblClick = false;
					}
					downItem = dragItem = null;
					break;
				case 'mousemove':
					if (dragItem)
						stopped = callEvent(this, 'mousedrag', event, point,
								dragItem, lastPoint);
					if (!stopped) {
						if (item !== overItem)
							overPoint = point;
						stopped = callEvent(this, type, event, point, item,
								overPoint);
					}
					lastPoint = overPoint = point;
					if (item !== overItem) {
						callEvent(this, 'mouseleave', event, point, overItem);
						overItem = item;
						callEvent(this, 'mouseenter', event, point, item);
					}
					break;
				}
				return stopped;
			}
		};
	});

	var Event = Base.extend({
		_class: 'Event',

		initialize: function Event(event) {
			this.event = event;
		},

		isPrevented: false,
		isStopped: false,

		preventDefault: function() {
			this.isPrevented = true;
			this.event.preventDefault();
		},

		stopPropagation: function() {
			this.isStopped = true;
			this.event.stopPropagation();
		},

		stop: function() {
			this.stopPropagation();
			this.preventDefault();
		},

		getModifiers: function() {
			return Key.modifiers;
		}
	});

	var KeyEvent = Event.extend({
		_class: 'KeyEvent',

		initialize: function KeyEvent(down, key, character, event) {
			Event.call(this, event);
			this.type = down ? 'keydown' : 'keyup';
			this.key = key;
			this.character = character;
		},

		toString: function() {
			return "{ type: '" + this.type
					+ "', key: '" + this.key
					+ "', character: '" + this.character
					+ "', modifiers: " + this.getModifiers()
					+ " }";
		}
	});

	var Key = new function() {

		var specialKeys = {
			8: 'backspace',
			9: 'tab',
			13: 'enter',
			16: 'shift',
			17: 'control',
			18: 'option',
			19: 'pause',
			20: 'caps-lock',
			27: 'escape',
			32: 'space',
			35: 'end',
			36: 'home',
			37: 'left',
			38: 'up',
			39: 'right',
			40: 'down',
			46: 'delete',
			91: 'command',
			93: 'command',
			224: 'command'
		},

		specialChars = {
			9: true,
			13: true,
			32: true
		},

		modifiers = new Base({
			shift: false,
			control: false,
			option: false,
			command: false,
			capsLock: false,
			space: false
		}),

		charCodeMap = {},
		keyMap = {},
		commandFixMap,
		downCode;

		function handleKey(down, keyCode, charCode, event) {
			var character = charCode ? String.fromCharCode(charCode) : '',
				specialKey = specialKeys[keyCode],
				key = specialKey || character.toLowerCase(),
				type = down ? 'keydown' : 'keyup',
				view = View._focused,
				scope = view && view.isVisible() && view._scope,
				tool = scope && scope.tool,
				name;
			keyMap[key] = down;
			if (down) {
				charCodeMap[keyCode] = charCode;
			} else {
				delete charCodeMap[keyCode];
			}
			if (specialKey && (name = Base.camelize(specialKey)) in modifiers) {
				modifiers[name] = down;
				var browser = paper.browser;
				if (name === 'command' && browser && browser.mac) {
					if (down) {
						commandFixMap = {};
					} else {
						for (var code in commandFixMap) {
							if (code in charCodeMap)
								handleKey(false, code, commandFixMap[code], event);
						}
						commandFixMap = null;
					}
				}
			} else if (down && commandFixMap) {
				commandFixMap[keyCode] = charCode;
			}
			if (tool && tool.responds(type)) {
				paper = scope;
				tool.emit(type, new KeyEvent(down, key, character, event));
				if (view)
					view.update();
			}
		}

		DomEvent.add(document, {
			keydown: function(event) {
				var code = event.which || event.keyCode;
				if (code in specialKeys || modifiers.command) {
					handleKey(true, code,
							code in specialChars || modifiers.command ? code : 0,
							event);
				} else {
					downCode = code;
				}
			},

			keypress: function(event) {
				if (downCode != null) {
					handleKey(true, downCode, event.which || event.keyCode, event);
					downCode = null;
				}
			},

			keyup: function(event) {
				var code = event.which || event.keyCode;
				if (code in charCodeMap)
					handleKey(false, code, charCodeMap[code], event);
			}
		});

		DomEvent.add(window, {
			blur: function(event) {
				for (var code in charCodeMap)
					handleKey(false, code, charCodeMap[code], event);
			}
		});

		return {
			modifiers: modifiers,

			isDown: function(key) {
				return !!keyMap[key];
			}
		};
	};

	var MouseEvent = Event.extend({
		_class: 'MouseEvent',

		initialize: function MouseEvent(type, event, point, target, delta) {
			Event.call(this, event);
			this.type = type;
			this.point = point;
			this.target = target;
			this.delta = delta;
		},

		toString: function() {
			return "{ type: '" + this.type
					+ "', point: " + this.point
					+ ', target: ' + this.target
					+ (this.delta ? ', delta: ' + this.delta : '')
					+ ', modifiers: ' + this.getModifiers()
					+ ' }';
		}
	});

	var ToolEvent = Event.extend({
		_class: 'ToolEvent',
		_item: null,

		initialize: function ToolEvent(tool, type, event) {
			this.tool = tool;
			this.type = type;
			this.event = event;
		},

		_choosePoint: function(point, toolPoint) {
			return point ? point : toolPoint ? toolPoint.clone() : null;
		},

		getPoint: function() {
			return this._choosePoint(this._point, this.tool._point);
		},

		setPoint: function(point) {
			this._point = point;
		},

		getLastPoint: function() {
			return this._choosePoint(this._lastPoint, this.tool._lastPoint);
		},

		setLastPoint: function(lastPoint) {
			this._lastPoint = lastPoint;
		},

		getDownPoint: function() {
			return this._choosePoint(this._downPoint, this.tool._downPoint);
		},

		setDownPoint: function(downPoint) {
			this._downPoint = downPoint;
		},

		getMiddlePoint: function() {
			if (!this._middlePoint && this.tool._lastPoint) {
				return this.tool._point.add(this.tool._lastPoint).divide(2);
			}
			return this._middlePoint;
		},

		setMiddlePoint: function(middlePoint) {
			this._middlePoint = middlePoint;
		},

		getDelta: function() {
			return !this._delta && this.tool._lastPoint
					? this.tool._point.subtract(this.tool._lastPoint)
					: this._delta;
		},

		setDelta: function(delta) {
			this._delta = delta;
		},

		getCount: function() {
			return /^mouse(down|up)$/.test(this.type)
					? this.tool._downCount
					: this.tool._count;
		},

		setCount: function(count) {
			this.tool[/^mouse(down|up)$/.test(this.type) ? 'downCount' : 'count']
				= count;
		},

		getItem: function() {
			if (!this._item) {
				var result = this.tool._scope.project.hitTest(this.getPoint());
				if (result) {
					var item = result.item,
						parent = item._parent;
					while (/^(Group|CompoundPath)$/.test(parent._class)) {
						item = parent;
						parent = parent._parent;
					}
					this._item = item;
				}
			}
			return this._item;
		},

		setItem: function(item) {
			this._item = item;
		},

		toString: function() {
			return '{ type: ' + this.type
					+ ', point: ' + this.getPoint()
					+ ', count: ' + this.getCount()
					+ ', modifiers: ' + this.getModifiers()
					+ ' }';
		}
	});

	var Tool = PaperScopeItem.extend({
		_class: 'Tool',
		_list: 'tools',
		_reference: 'tool',
		_events: [ 'onActivate', 'onDeactivate', 'onEditOptions',
				'onMouseDown', 'onMouseUp', 'onMouseDrag', 'onMouseMove',
				'onKeyDown', 'onKeyUp' ],

		initialize: function Tool(props) {
			PaperScopeItem.call(this);
			this._firstMove = true;
			this._count = 0;
			this._downCount = 0;
			this._set(props);
		},

		getMinDistance: function() {
			return this._minDistance;
		},

		setMinDistance: function(minDistance) {
			this._minDistance = minDistance;
			if (minDistance != null && this._maxDistance != null
					&& minDistance > this._maxDistance) {
				this._maxDistance = minDistance;
			}
		},

		getMaxDistance: function() {
			return this._maxDistance;
		},

		setMaxDistance: function(maxDistance) {
			this._maxDistance = maxDistance;
			if (this._minDistance != null && maxDistance != null
					&& maxDistance < this._minDistance) {
				this._minDistance = maxDistance;
			}
		},

		getFixedDistance: function() {
			return this._minDistance == this._maxDistance
				? this._minDistance : null;
		},

		setFixedDistance: function(distance) {
			this._minDistance = this._maxDistance = distance;
		},

		_updateEvent: function(type, point, minDistance, maxDistance, start,
				needsChange, matchMaxDistance) {
			if (!start) {
				if (minDistance != null || maxDistance != null) {
					var minDist = minDistance != null ? minDistance : 0,
						vector = point.subtract(this._point),
						distance = vector.getLength();
					if (distance < minDist)
						return false;
					if (maxDistance != null && maxDistance != 0) {
						if (distance > maxDistance) {
							point = this._point.add(vector.normalize(maxDistance));
						} else if (matchMaxDistance) {
							return false;
						}
					}
				}
				if (needsChange && point.equals(this._point))
					return false;
			}
			this._lastPoint = start && type == 'mousemove' ? point : this._point;
			this._point = point;
			switch (type) {
			case 'mousedown':
				this._lastPoint = this._downPoint;
				this._downPoint = this._point;
				this._downCount++;
				break;
			case 'mouseup':
				this._lastPoint = this._downPoint;
				break;
			}
			this._count = start ? 0 : this._count + 1;
			return true;
		},

		_fireEvent: function(type, event) {
			var sets = paper.project._removeSets;
			if (sets) {
				if (type === 'mouseup')
					sets.mousedrag = null;
				var set = sets[type];
				if (set) {
					for (var id in set) {
						var item = set[id];
						for (var key in sets) {
							var other = sets[key];
							if (other && other != set)
								delete other[item._id];
						}
						item.remove();
					}
					sets[type] = null;
				}
			}
			return this.responds(type)
					&& this.emit(type, new ToolEvent(this, type, event));
		},

		_handleEvent: function(type, point, event) {
			paper = this._scope;
			var called = false;
			switch (type) {
			case 'mousedown':
				this._updateEvent(type, point, null, null, true, false, false);
				called = this._fireEvent(type, event);
				break;
			case 'mousedrag':
				var needsChange = false,
					matchMaxDistance = false;
				while (this._updateEvent(type, point, this.minDistance,
						this.maxDistance, false, needsChange, matchMaxDistance)) {
					called = this._fireEvent(type, event) || called;
					needsChange = true;
					matchMaxDistance = true;
				}
				break;
			case 'mouseup':
				if (!point.equals(this._point)
						&& this._updateEvent('mousedrag', point, this.minDistance,
								this.maxDistance, false, false, false)) {
					called = this._fireEvent('mousedrag', event);
				}
				this._updateEvent(type, point, null, this.maxDistance, false,
						false, false);
				called = this._fireEvent(type, event) || called;
				this._updateEvent(type, point, null, null, true, false, false);
				this._firstMove = true;
				break;
			case 'mousemove':
				while (this._updateEvent(type, point, this.minDistance,
						this.maxDistance, this._firstMove, true, false)) {
					called = this._fireEvent(type, event) || called;
					this._firstMove = false;
				}
				break;
			}
			if (called)
				event.preventDefault();
			return called;
		}

	});

	var Http = {
		request: function(method, url, callback, async) {
			async = (async === undefined) ? true : async;
			var xhr = new (window.ActiveXObject || XMLHttpRequest)(
						'Microsoft.XMLHTTP');
			xhr.open(method.toUpperCase(), url, async);
			if ('overrideMimeType' in xhr)
				xhr.overrideMimeType('text/plain');
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					var status = xhr.status;
					if (status === 0 || status === 200) {
						callback.call(xhr, xhr.responseText);
					} else {
						throw new Error('Could not load ' + url + ' (Error '
								+ status + ')');
					}
				}
			};
			return xhr.send(null);
		}
	};

	var CanvasProvider = {
		canvases: [],

		getCanvas: function(width, height) {
			var canvas,
				clear = true;
			if (typeof width === 'object') {
				height = width.height;
				width = width.width;
			}
			if (this.canvases.length) {
				canvas = this.canvases.pop();
			} else {
				canvas = document.createElement('canvas');
			}
			var ctx = canvas.getContext('2d');
			if (canvas.width === width && canvas.height === height) {
				if (clear)
					ctx.clearRect(0, 0, width + 1, height + 1);
			} else {
				canvas.width = width;
				canvas.height = height;
			}
			ctx.save();
			return canvas;
		},

		getContext: function(width, height) {
			return this.getCanvas(width, height).getContext('2d');
		},

		release: function(obj) {
			var canvas = obj.canvas ? obj.canvas : obj;
			canvas.getContext('2d').restore();
			this.canvases.push(canvas);
		}
	};

	var BlendMode = new function() {
		var min = Math.min,
			max = Math.max,
			abs = Math.abs,
			sr, sg, sb, sa,
			br, bg, bb, ba,
			dr, dg, db;

		function getLum(r, g, b) {
			return 0.2989 * r + 0.587 * g + 0.114 * b;
		}

		function setLum(r, g, b, l) {
			var d = l - getLum(r, g, b);
			dr = r + d;
			dg = g + d;
			db = b + d;
			var l = getLum(dr, dg, db),
				mn = min(dr, dg, db),
				mx = max(dr, dg, db);
			if (mn < 0) {
				var lmn = l - mn;
				dr = l + (dr - l) * l / lmn;
				dg = l + (dg - l) * l / lmn;
				db = l + (db - l) * l / lmn;
			}
			if (mx > 255) {
				var ln = 255 - l,
					mxl = mx - l;
				dr = l + (dr - l) * ln / mxl;
				dg = l + (dg - l) * ln / mxl;
				db = l + (db - l) * ln / mxl;
			}
		}

		function getSat(r, g, b) {
			return max(r, g, b) - min(r, g, b);
		}

		function setSat(r, g, b, s) {
			var col = [r, g, b],
				mx = max(r, g, b),
				mn = min(r, g, b),
				md;
			mn = mn === r ? 0 : mn === g ? 1 : 2;
			mx = mx === r ? 0 : mx === g ? 1 : 2;
			md = min(mn, mx) === 0 ? max(mn, mx) === 1 ? 2 : 1 : 0;
			if (col[mx] > col[mn]) {
				col[md] = (col[md] - col[mn]) * s / (col[mx] - col[mn]);
				col[mx] = s;
			} else {
				col[md] = col[mx] = 0;
			}
			col[mn] = 0;
			dr = col[0];
			dg = col[1];
			db = col[2];
		}

		var modes = {
			multiply: function() {
				dr = br * sr / 255;
				dg = bg * sg / 255;
				db = bb * sb / 255;
			},

			screen: function() {
				dr = br + sr - (br * sr / 255);
				dg = bg + sg - (bg * sg / 255);
				db = bb + sb - (bb * sb / 255);
			},

			overlay: function() {
				dr = br < 128 ? 2 * br * sr / 255 : 255 - 2 * (255 - br) * (255 - sr) / 255;
				dg = bg < 128 ? 2 * bg * sg / 255 : 255 - 2 * (255 - bg) * (255 - sg) / 255;
				db = bb < 128 ? 2 * bb * sb / 255 : 255 - 2 * (255 - bb) * (255 - sb) / 255;
			},

			'soft-light': function() {
				var t = sr * br / 255;
				dr = t + br * (255 - (255 - br) * (255 - sr) / 255 - t) / 255;
				t = sg * bg / 255;
				dg = t + bg * (255 - (255 - bg) * (255 - sg) / 255 - t) / 255;
				t = sb * bb / 255;
				db = t + bb * (255 - (255 - bb) * (255 - sb) / 255 - t) / 255;
			},

			'hard-light': function() {
				dr = sr < 128 ? 2 * sr * br / 255 : 255 - 2 * (255 - sr) * (255 - br) / 255;
				dg = sg < 128 ? 2 * sg * bg / 255 : 255 - 2 * (255 - sg) * (255 - bg) / 255;
				db = sb < 128 ? 2 * sb * bb / 255 : 255 - 2 * (255 - sb) * (255 - bb) / 255;
			},

			'color-dodge': function() {
				dr = br === 0 ? 0 : sr === 255 ? 255 : min(255, 255 * br / (255 - sr));
				dg = bg === 0 ? 0 : sg === 255 ? 255 : min(255, 255 * bg / (255 - sg));
				db = bb === 0 ? 0 : sb === 255 ? 255 : min(255, 255 * bb / (255 - sb));
			},

			'color-burn': function() {
				dr = br === 255 ? 255 : sr === 0 ? 0 : max(0, 255 - (255 - br) * 255 / sr);
				dg = bg === 255 ? 255 : sg === 0 ? 0 : max(0, 255 - (255 - bg) * 255 / sg);
				db = bb === 255 ? 255 : sb === 0 ? 0 : max(0, 255 - (255 - bb) * 255 / sb);
			},

			darken: function() {
				dr = br < sr ? br : sr;
				dg = bg < sg ? bg : sg;
				db = bb < sb ? bb : sb;
			},

			lighten: function() {
				dr = br > sr ? br : sr;
				dg = bg > sg ? bg : sg;
				db = bb > sb ? bb : sb;
			},

			difference: function() {
				dr = br - sr;
				if (dr < 0)
					dr = -dr;
				dg = bg - sg;
				if (dg < 0)
					dg = -dg;
				db = bb - sb;
				if (db < 0)
					db = -db;
			},

			exclusion: function() {
				dr = br + sr * (255 - br - br) / 255;
				dg = bg + sg * (255 - bg - bg) / 255;
				db = bb + sb * (255 - bb - bb) / 255;
			},

			hue: function() {
				setSat(sr, sg, sb, getSat(br, bg, bb));
				setLum(dr, dg, db, getLum(br, bg, bb));
			},

			saturation: function() {
				setSat(br, bg, bb, getSat(sr, sg, sb));
				setLum(dr, dg, db, getLum(br, bg, bb));
			},

			luminosity: function() {
				setLum(br, bg, bb, getLum(sr, sg, sb));
			},

			color: function() {
				setLum(sr, sg, sb, getLum(br, bg, bb));
			},

			add: function() {
				dr = min(br + sr, 255);
				dg = min(bg + sg, 255);
				db = min(bb + sb, 255);
			},

			subtract: function() {
				dr = max(br - sr, 0);
				dg = max(bg - sg, 0);
				db = max(bb - sb, 0);
			},

			average: function() {
				dr = (br + sr) / 2;
				dg = (bg + sg) / 2;
				db = (bb + sb) / 2;
			},

			negation: function() {
				dr = 255 - abs(255 - sr - br);
				dg = 255 - abs(255 - sg - bg);
				db = 255 - abs(255 - sb - bb);
			}
		};

		var nativeModes = this.nativeModes = Base.each([
			'source-over', 'source-in', 'source-out', 'source-atop',
			'destination-over', 'destination-in', 'destination-out',
			'destination-atop', 'lighter', 'darker', 'copy', 'xor'
		], function(mode) {
			this[mode] = true;
		}, {});

		var ctx = CanvasProvider.getContext(1, 1);
		Base.each(modes, function(func, mode) {
			var darken = mode === 'darken',
				ok = false;
			ctx.save();
			try {
				ctx.fillStyle = darken ? '#300' : '#a00';
				ctx.fillRect(0, 0, 1, 1);
				ctx.globalCompositeOperation = mode;
				if (ctx.globalCompositeOperation === mode) {
					ctx.fillStyle = darken ? '#a00' : '#300';
					ctx.fillRect(0, 0, 1, 1);
					ok = ctx.getImageData(0, 0, 1, 1).data[0] !== darken ? 170 : 51;
				}
			} catch (e) {}
			ctx.restore();
			nativeModes[mode] = ok;
		});
		CanvasProvider.release(ctx);

		this.process = function(mode, srcContext, dstContext, alpha, offset) {
			var srcCanvas = srcContext.canvas,
				normal = mode === 'normal';
			if (normal || nativeModes[mode]) {
				dstContext.save();
				dstContext.setTransform(1, 0, 0, 1, 0, 0);
				dstContext.globalAlpha = alpha;
				if (!normal)
					dstContext.globalCompositeOperation = mode;
				dstContext.drawImage(srcCanvas, offset.x, offset.y);
				dstContext.restore();
			} else {
				var process = modes[mode];
				if (!process)
					return;
				var dstData = dstContext.getImageData(offset.x, offset.y,
						srcCanvas.width, srcCanvas.height),
					dst = dstData.data,
					src = srcContext.getImageData(0, 0,
						srcCanvas.width, srcCanvas.height).data;
				for (var i = 0, l = dst.length; i < l; i += 4) {
					sr = src[i];
					br = dst[i];
					sg = src[i + 1];
					bg = dst[i + 1];
					sb = src[i + 2];
					bb = dst[i + 2];
					sa = src[i + 3];
					ba = dst[i + 3];
					process();
					var a1 = sa * alpha / 255,
						a2 = 1 - a1;
					dst[i] = a1 * dr + a2 * br;
					dst[i + 1] = a1 * dg + a2 * bg;
					dst[i + 2] = a1 * db + a2 * bb;
					dst[i + 3] = sa * alpha + a2 * ba;
				}
				dstContext.putImageData(dstData, offset.x, offset.y);
			}
		};
	};

	var SVGStyles = Base.each({
		fillColor: ['fill', 'color'],
		strokeColor: ['stroke', 'color'],
		strokeWidth: ['stroke-width', 'number'],
		strokeCap: ['stroke-linecap', 'string'],
		strokeJoin: ['stroke-linejoin', 'string'],
		strokeScaling: ['vector-effect', 'lookup', {
			true: 'none',
			false: 'non-scaling-stroke'
		}, function(item, value) {
			return !value
					&& (item instanceof PathItem
						|| item instanceof Shape
						|| item instanceof TextItem);
		}],
		miterLimit: ['stroke-miterlimit', 'number'],
		dashArray: ['stroke-dasharray', 'array'],
		dashOffset: ['stroke-dashoffset', 'number'],
		fontFamily: ['font-family', 'string'],
		fontWeight: ['font-weight', 'string'],
		fontSize: ['font-size', 'number'],
		justification: ['text-anchor', 'lookup', {
			left: 'start',
			center: 'middle',
			right: 'end'
		}],
		opacity: ['opacity', 'number'],
		blendMode: ['mix-blend-mode', 'string']
	}, function(entry, key) {
		var part = Base.capitalize(key),
			lookup = entry[2];
		this[key] = {
			type: entry[1],
			property: key,
			attribute: entry[0],
			toSVG: lookup,
			fromSVG: lookup && Base.each(lookup, function(value, name) {
				this[value] = name;
			}, {}),
			exportFilter: entry[3],
			get: 'get' + part,
			set: 'set' + part
		};
	}, {});

	var SVGNamespaces = {
		href: 'http://www.w3.org/1999/xlink',
		xlink: 'http://www.w3.org/2000/xmlns'
	};

	new function() {
		var formatter;

		function setAttributes(node, attrs) {
			for (var key in attrs) {
				var val = attrs[key],
					namespace = SVGNamespaces[key];
				if (typeof val === 'number')
					val = formatter.number(val);
				if (namespace) {
					node.setAttributeNS(namespace, key, val);
				} else {
					node.setAttribute(key, val);
				}
			}
			return node;
		}

		function createElement(tag, attrs) {
			return setAttributes(
				document.createElementNS('http://www.w3.org/2000/svg', tag), attrs);
		}

		function getTransform(matrix, coordinates, center) {
			var attrs = new Base(),
				trans = matrix.getTranslation();
			if (coordinates) {
				matrix = matrix.shiftless();
				var point = matrix._inverseTransform(trans);
				attrs[center ? 'cx' : 'x'] = point.x;
				attrs[center ? 'cy' : 'y'] = point.y;
				trans = null;
			}
			if (!matrix.isIdentity()) {
				var decomposed = matrix.decompose();
				if (decomposed && !decomposed.shearing) {
					var parts = [],
						angle = decomposed.rotation,
						scale = decomposed.scaling;
					if (trans && !trans.isZero())
						parts.push('translate(' + formatter.point(trans) + ')');
					if (!Numerical.isZero(scale.x - 1)
							|| !Numerical.isZero(scale.y - 1))
						parts.push('scale(' + formatter.point(scale) +')');
					if (angle)
						parts.push('rotate(' + formatter.number(angle) + ')');
					attrs.transform = parts.join(' ');
				} else {
					attrs.transform = 'matrix(' + matrix.getValues().join(',') + ')';
				}
			}
			return attrs;
		}

		function exportGroup(item, options) {
			var attrs = getTransform(item._matrix),
				children = item._children;
			var node = createElement('g', attrs);
			for (var i = 0, l = children.length; i < l; i++) {
				var child = children[i];
				var childNode = exportSVG(child, options);
				if (childNode) {
					if (child.isClipMask()) {
						var clip = createElement('clipPath');
						clip.appendChild(childNode);
						setDefinition(child, clip, 'clip');
						setAttributes(node, {
							'clip-path': 'url(#' + clip.id + ')'
						});
					} else {
						node.appendChild(childNode);
					}
				}
			}
			return node;
		}

		function exportRaster(item, options) {
			var attrs = getTransform(item._matrix, true),
				size = item.getSize(),
				image = item.getImage();
			attrs.x -= size.width / 2;
			attrs.y -= size.height / 2;
			attrs.width = size.width;
			attrs.height = size.height;
			attrs.href = options.embedImages === false && image && image.src
					|| item.toDataURL();
			return createElement('image', attrs);
		}

		function exportPath(item, options) {
			var matchShapes = options.matchShapes;
			if (matchShapes) {
				var shape = item.toShape(false);
				if (shape)
					return exportShape(shape, options);
			}
			var segments = item._segments,
				type,
				attrs = getTransform(item._matrix);
			if (segments.length === 0)
				return null;
			if (matchShapes && !item.hasHandles()) {
				if (segments.length >= 3) {
					type = item._closed ? 'polygon' : 'polyline';
					var parts = [];
					for(var i = 0, l = segments.length; i < l; i++)
						parts.push(formatter.point(segments[i]._point));
					attrs.points = parts.join(' ');
				} else {
					type = 'line';
					var first = segments[0]._point,
						last = segments[segments.length - 1]._point;
					attrs.set({
						x1: first.x,
						y1: first.y,
						x2: last.x,
						y2: last.y
					});
				}
			} else {
				type = 'path';
				attrs.d = item.getPathData(null, options.precision);
			}
			return createElement(type, attrs);
		}

		function exportShape(item) {
			var type = item._type,
				radius = item._radius,
				attrs = getTransform(item._matrix, true, type !== 'rectangle');
			if (type === 'rectangle') {
				type = 'rect';
				var size = item._size,
					width = size.width,
					height = size.height;
				attrs.x -= width / 2;
				attrs.y -= height / 2;
				attrs.width = width;
				attrs.height = height;
				if (radius.isZero())
					radius = null;
			}
			if (radius) {
				if (type === 'circle') {
					attrs.r = radius;
				} else {
					attrs.rx = radius.width;
					attrs.ry = radius.height;
				}
			}
			return createElement(type, attrs);
		}

		function exportCompoundPath(item, options) {
			var attrs = getTransform(item._matrix);
			var data = item.getPathData(null, options.precision);
			if (data)
				attrs.d = data;
			return createElement('path', attrs);
		}

		function exportPlacedSymbol(item, options) {
			var attrs = getTransform(item._matrix, true),
				symbol = item.getSymbol(),
				symbolNode = getDefinition(symbol, 'symbol'),
				definition = symbol.getDefinition(),
				bounds = definition.getBounds();
			if (!symbolNode) {
				symbolNode = createElement('symbol', {
					viewBox: formatter.rectangle(bounds)
				});
				symbolNode.appendChild(exportSVG(definition, options));
				setDefinition(symbol, symbolNode, 'symbol');
			}
			attrs.href = '#' + symbolNode.id;
			attrs.x += bounds.x;
			attrs.y += bounds.y;
			attrs.width = formatter.number(bounds.width);
			attrs.height = formatter.number(bounds.height);
			attrs.overflow = 'visible';
			return createElement('use', attrs);
		}

		function exportGradient(color) {
			var gradientNode = getDefinition(color, 'color');
			if (!gradientNode) {
				var gradient = color.getGradient(),
					radial = gradient._radial,
					origin = color.getOrigin().transform(),
					destination = color.getDestination().transform(),
					attrs;
				if (radial) {
					attrs = {
						cx: origin.x,
						cy: origin.y,
						r: origin.getDistance(destination)
					};
					var highlight = color.getHighlight();
					if (highlight) {
						highlight = highlight.transform();
						attrs.fx = highlight.x;
						attrs.fy = highlight.y;
					}
				} else {
					attrs = {
						x1: origin.x,
						y1: origin.y,
						x2: destination.x,
						y2: destination.y
					};
				}
				attrs.gradientUnits = 'userSpaceOnUse';
				gradientNode = createElement(
						(radial ? 'radial' : 'linear') + 'Gradient', attrs);
				var stops = gradient._stops;
				for (var i = 0, l = stops.length; i < l; i++) {
					var stop = stops[i],
						stopColor = stop._color,
						alpha = stopColor.getAlpha();
					attrs = {
						offset: stop._rampPoint,
						'stop-color': stopColor.toCSS(true)
					};
					if (alpha < 1)
						attrs['stop-opacity'] = alpha;
					gradientNode.appendChild(createElement('stop', attrs));
				}
				setDefinition(color, gradientNode, 'color');
			}
			return 'url(#' + gradientNode.id + ')';
		}

		function exportText(item) {
			var node = createElement('text', getTransform(item._matrix, true));
			node.textContent = item._content;
			return node;
		}

		var exporters = {
			Group: exportGroup,
			Layer: exportGroup,
			Raster: exportRaster,
			Path: exportPath,
			Shape: exportShape,
			CompoundPath: exportCompoundPath,
			PlacedSymbol: exportPlacedSymbol,
			PointText: exportText
		};

		function applyStyle(item, node, isRoot) {
			var attrs = {},
				parent = !isRoot && item.getParent();

			if (item._name != null)
				attrs.id = item._name;

			Base.each(SVGStyles, function(entry) {
				var get = entry.get,
					type = entry.type,
					value = item[get]();
				if (entry.exportFilter
						? entry.exportFilter(item, value)
						: !parent || !Base.equals(parent[get](), value)) {
					if (type === 'color' && value != null) {
						var alpha = value.getAlpha();
						if (alpha < 1)
							attrs[entry.attribute + '-opacity'] = alpha;
					}
					attrs[entry.attribute] = value == null
						? 'none'
						: type === 'number'
							? formatter.number(value)
							: type === 'color'
								? value.gradient
									? exportGradient(value, item)
									: value.toCSS(true)
								: type === 'array'
									? value.join(',')
									: type === 'lookup'
										? entry.toSVG[value]
										: value;
				}
			});

			if (attrs.opacity === 1)
				delete attrs.opacity;

			if (!item._visible)
				attrs.visibility = 'hidden';

			return setAttributes(node, attrs);
		}

		var definitions;
		function getDefinition(item, type) {
			if (!definitions)
				definitions = { ids: {}, svgs: {} };
			return item && definitions.svgs[type + '-' + item._id];
		}

		function setDefinition(item, node, type) {
			if (!definitions)
				getDefinition();
			var id = definitions.ids[type] = (definitions.ids[type] || 0) + 1;
			node.id = type + '-' + id;
			definitions.svgs[type + '-' + item._id] = node;
		}

		function exportDefinitions(node, options) {
			var svg = node,
				defs = null;
			if (definitions) {
				svg = node.nodeName.toLowerCase() === 'svg' && node;
				for (var i in definitions.svgs) {
					if (!defs) {
						if (!svg) {
							svg = createElement('svg');
							svg.appendChild(node);
						}
						defs = svg.insertBefore(createElement('defs'),
								svg.firstChild);
					}
					defs.appendChild(definitions.svgs[i]);
				}
				definitions = null;
			}
			return options.asString
					? new XMLSerializer().serializeToString(svg)
					: svg;
		}

		function exportSVG(item, options, isRoot) {
			var exporter = exporters[item._class],
				node = exporter && exporter(item, options);
			if (node) {
				var onExport = options.onExport;
				if (onExport)
					node = onExport(item, node, options) || node;
				var data = JSON.stringify(item._data);
				if (data && data !== '{}' && data !== 'null')
					node.setAttribute('data-paper-data', data);
			}
			return node && applyStyle(item, node, isRoot);
		}

		function setOptions(options) {
			if (!options)
				options = {};
			formatter = new Formatter(options.precision);
			return options;
		}

		Item.inject({
			exportSVG: function(options) {
				options = setOptions(options);
				return exportDefinitions(exportSVG(this, options, true), options);
			}
		});

		Project.inject({
			exportSVG: function(options) {
				options = setOptions(options);
				var layers = this.layers,
					view = this.getView(),
					size = view.getViewSize(),
					node = createElement('svg', {
						x: 0,
						y: 0,
						width: size.width,
						height: size.height,
						version: '1.1',
						xmlns: 'http://www.w3.org/2000/svg',
						'xmlns:xlink': 'http://www.w3.org/1999/xlink'
					}),
					parent = node,
					matrix = view._matrix;
				if (!matrix.isIdentity())
					parent = node.appendChild(
							createElement('g', getTransform(matrix)));
				for (var i = 0, l = layers.length; i < l; i++)
					parent.appendChild(exportSVG(layers[i], options, true));
				return exportDefinitions(node, options);
			}
		});
	};

	new function() {

		function getValue(node, name, isString, allowNull) {
			var namespace = SVGNamespaces[name],
				value = namespace
					? node.getAttributeNS(namespace, name)
					: node.getAttribute(name);
			if (value === 'null')
				value = null;
			return value == null
					? allowNull
						? null
						: isString
							? ''
							: 0
					: isString
						? value
						: parseFloat(value);
		}

		function getPoint(node, x, y, allowNull) {
			x = getValue(node, x, false, allowNull);
			y = getValue(node, y, false, allowNull);
			return allowNull && (x == null || y == null) ? null
					: new Point(x, y);
		}

		function getSize(node, w, h, allowNull) {
			w = getValue(node, w, false, allowNull);
			h = getValue(node, h, false, allowNull);
			return allowNull && (w == null || h == null) ? null
					: new Size(w, h);
		}

		function convertValue(value, type, lookup) {
			return value === 'none'
					? null
					: type === 'number'
						? parseFloat(value)
						: type === 'array'
							? value ? value.split(/[\s,]+/g).map(parseFloat) : []
							: type === 'color'
								? getDefinition(value) || value
								: type === 'lookup'
									? lookup[value]
									: value;
		}

		function importGroup(node, type, options, isRoot) {
			var nodes = node.childNodes,
				isClip = type === 'clippath',
				item = new Group(),
				project = item._project,
				currentStyle = project._currentStyle,
				children = [];
			if (!isClip) {
				item = applyAttributes(item, node, isRoot);
				project._currentStyle = item._style.clone();
			}
			if (isRoot) {
				var defs = node.querySelectorAll('defs');
				for (var i = 0, l = defs.length; i < l; i++) {
					importSVG(defs[i], options, false);
				}
			}
			for (var i = 0, l = nodes.length; i < l; i++) {
				var childNode = nodes[i],
					child;
				if (childNode.nodeType === 1
						&& childNode.nodeName.toLowerCase() !== 'defs'
						&& (child = importSVG(childNode, options, false))
						&& !(child instanceof Symbol))
					children.push(child);
			}
			item.addChildren(children);
			if (isClip)
				item = applyAttributes(item.reduce(), node, isRoot);
			project._currentStyle = currentStyle;
			if (isClip || type === 'defs') {
				item.remove();
				item = null;
			}
			return item;
		}

		function importPoly(node, type) {
			var coords = node.getAttribute('points').match(
						/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g),
				points = [];
			for (var i = 0, l = coords.length; i < l; i += 2)
				points.push(new Point(
						parseFloat(coords[i]),
						parseFloat(coords[i + 1])));
			var path = new Path(points);
			if (type === 'polygon')
				path.closePath();
			return path;
		}

		function importPath(node) {
			var data = node.getAttribute('d'),
				param = { pathData: data };
			return (data.match(/m/gi) || []).length > 1 || /z\S+/i.test(data)
					? new CompoundPath(param)
					: new Path(param);
		}

		function importGradient(node, type) {
			var id = (getValue(node, 'href', true) || '').substring(1),
				isRadial = type === 'radialgradient',
				gradient;
			if (id) {
				gradient = definitions[id].getGradient();
			} else {
				var nodes = node.childNodes,
					stops = [];
				for (var i = 0, l = nodes.length; i < l; i++) {
					var child = nodes[i];
					if (child.nodeType === 1)
						stops.push(applyAttributes(new GradientStop(), child));
				}
				gradient = new Gradient(stops, isRadial);
			}
			var origin, destination, highlight;
			if (isRadial) {
				origin = getPoint(node, 'cx', 'cy');
				destination = origin.add(getValue(node, 'r'), 0);
				highlight = getPoint(node, 'fx', 'fy', true);
			} else {
				origin = getPoint(node, 'x1', 'y1');
				destination = getPoint(node, 'x2', 'y2');
			}
			applyAttributes(
				new Color(gradient, origin, destination, highlight), node);
			return null;
		}

		var importers = {
			'#document': function (node, type, options, isRoot) {
				var nodes = node.childNodes;
				for (var i = 0, l = nodes.length; i < l; i++) {
					var child = nodes[i];
					if (child.nodeType === 1) {
						var next = child.nextSibling;
						document.body.appendChild(child);
						var item = importSVG(child, options, isRoot);
						if (next) {
							node.insertBefore(child, next);
						} else {
							node.appendChild(child);
						}
						return item;
					}
				}
			},
			g: importGroup,
			svg: importGroup,
			clippath: importGroup,
			polygon: importPoly,
			polyline: importPoly,
			path: importPath,
			lineargradient: importGradient,
			radialgradient: importGradient,

			image: function (node) {
				var raster = new Raster(getValue(node, 'href', true));
				raster.on('load', function() {
					var size = getSize(node, 'width', 'height');
					this.setSize(size);
					var center = this._matrix._transformPoint(
							getPoint(node, 'x', 'y').add(size.divide(2)));
					this.translate(center);
				});
				return raster;
			},

			symbol: function(node, type, options, isRoot) {
				return new Symbol(importGroup(node, type, options, isRoot), true);
			},

			defs: importGroup,

			use: function(node) {
				var id = (getValue(node, 'href', true) || '').substring(1),
					definition = definitions[id],
					point = getPoint(node, 'x', 'y');
				return definition
						? definition instanceof Symbol
							? definition.place(point)
							: definition.clone().translate(point)
						: null;
			},

			circle: function(node) {
				return new Shape.Circle(getPoint(node, 'cx', 'cy'),
						getValue(node, 'r'));
			},

			ellipse: function(node) {
				return new Shape.Ellipse({
					center: getPoint(node, 'cx', 'cy'),
					radius: getSize(node, 'rx', 'ry')
				});
			},

			rect: function(node) {
				var point = getPoint(node, 'x', 'y'),
					size = getSize(node, 'width', 'height'),
					radius = getSize(node, 'rx', 'ry');
				return new Shape.Rectangle(new Rectangle(point, size), radius);
			},

			line: function(node) {
				return new Path.Line(getPoint(node, 'x1', 'y1'),
						getPoint(node, 'x2', 'y2'));
			},

			text: function(node) {
				var text = new PointText(getPoint(node, 'x', 'y')
						.add(getPoint(node, 'dx', 'dy')));
				text.setContent(node.textContent.trim() || '');
				return text;
			}
		};

		function applyTransform(item, value, name, node) {
			var transforms = (node.getAttribute(name) || '').split(/\)\s*/g),
				matrix = new Matrix();
			for (var i = 0, l = transforms.length; i < l; i++) {
				var transform = transforms[i];
				if (!transform)
					break;
				var parts = transform.split(/\(\s*/),
					command = parts[0],
					v = parts[1].split(/[\s,]+/g);
				for (var j = 0, m = v.length; j < m; j++)
					v[j] = parseFloat(v[j]);
				switch (command) {
				case 'matrix':
					matrix.concatenate(
							new Matrix(v[0], v[1], v[2], v[3], v[4], v[5]));
					break;
				case 'rotate':
					matrix.rotate(v[0], v[1], v[2]);
					break;
				case 'translate':
					matrix.translate(v[0], v[1]);
					break;
				case 'scale':
					matrix.scale(v);
					break;
				case 'skewX':
					matrix.skew(v[0], 0);
					break;
				case 'skewY':
					matrix.skew(0, v[0]);
					break;
				}
			}
			item.transform(matrix);
		}

		function applyOpacity(item, value, name) {
			var color = item[name === 'fill-opacity' ? 'getFillColor'
					: 'getStrokeColor']();
			if (color)
				color.setAlpha(parseFloat(value));
		}

		var attributes = Base.set(Base.each(SVGStyles, function(entry) {
			this[entry.attribute] = function(item, value) {
				item[entry.set](convertValue(value, entry.type, entry.fromSVG));
				if (entry.type === 'color' && item instanceof Shape) {
					var color = item[entry.get]();
					if (color)
						color.transform(new Matrix().translate(
								item.getPosition(true).negate()));
				}
			};
		}, {}), {
			id: function(item, value) {
				definitions[value] = item;
				if (item.setName)
					item.setName(value);
			},

			'clip-path': function(item, value) {
				var clip = getDefinition(value);
				if (clip) {
					clip = clip.clone();
					clip.setClipMask(true);
					if (item instanceof Group) {
						item.insertChild(0, clip);
					} else {
						return new Group(clip, item);
					}
				}
			},

			gradientTransform: applyTransform,
			transform: applyTransform,

			'fill-opacity': applyOpacity,
			'stroke-opacity': applyOpacity,

			visibility: function(item, value) {
				item.setVisible(value === 'visible');
			},

			display: function(item, value) {
				item.setVisible(value !== null);
			},

			'stop-color': function(item, value) {
				if (item.setColor)
					item.setColor(value);
			},

			'stop-opacity': function(item, value) {
				if (item._color)
					item._color.setAlpha(parseFloat(value));
			},

			offset: function(item, value) {
				var percentage = value.match(/(.*)%$/);
				item.setRampPoint(percentage
						? percentage[1] / 100
						: parseFloat(value));
			},

			viewBox: function(item, value, name, node, styles) {
				var rect = new Rectangle(convertValue(value, 'array')),
					size = getSize(node, 'width', 'height', true);
				if (item instanceof Group) {
					var scale = size ? rect.getSize().divide(size) : 1,
						matrix = new Matrix().translate(rect.getPoint()).scale(scale);
					item.transform(matrix.inverted());
				} else if (item instanceof Symbol) {
					if (size)
						rect.setSize(size);
					var clip = getAttribute(node, 'overflow', styles) != 'visible',
						group = item._definition;
					if (clip && !rect.contains(group.getBounds())) {
						clip = new Shape.Rectangle(rect).transform(group._matrix);
						clip.setClipMask(true);
						group.addChild(clip);
					}
				}
			}
		});

		function getAttribute(node, name, styles) {
			var attr = node.attributes[name],
				value = attr && attr.value;
			if (!value) {
				var style = Base.camelize(name);
				value = node.style[style];
				if (!value && styles.node[style] !== styles.parent[style])
					value = styles.node[style];
			}
			return !value
					? undefined
					: value === 'none'
						? null
						: value;
		}

		function applyAttributes(item, node, isRoot) {
			var styles = {
				node: DomElement.getStyles(node) || {},
				parent: !isRoot && DomElement.getStyles(node.parentNode) || {}
			};
			Base.each(attributes, function(apply, name) {
				var value = getAttribute(node, name, styles);
				if (value !== undefined)
					item = Base.pick(apply(item, value, name, node, styles), item);
			});
			return item;
		}

		var definitions = {};
		function getDefinition(value) {
			var match = value && value.match(/\((?:#|)([^)']+)/);
			return match && definitions[match[1]];
		}

		function importSVG(source, options, isRoot) {
			if (!source)
				return null;
			if (!options) {
				options = {};
			} else if (typeof options === 'function') {
				options = { onLoad: options };
			}

			var node = source,
				scope = paper;

			function onLoadCallback(svg) {
				paper = scope;
				var item = importSVG(svg, options, isRoot),
					onLoad = options.onLoad,
					view = scope.project && scope.getView();
				if (onLoad)
					onLoad.call(this, item);
				view.update();
			}

			if (isRoot) {
				if (typeof source === 'string' && !/^.*</.test(source)) {
					node = document.getElementById(source);
					if (node) {
						source = null;
					} else {
						return Http.request('get', source, onLoadCallback);
					}
				} else if (typeof File !== 'undefined' && source instanceof File) {
					var reader = new FileReader();
					reader.onload = function() {
						onLoadCallback(reader.result);
					};
					return reader.readAsText(source);
				}
			}

			if (typeof source === 'string')
				node = new DOMParser().parseFromString(source, 'image/svg+xml');
			if (!node.nodeName)
				throw new Error('Unsupported SVG source: ' + source);
			var type = node.nodeName.toLowerCase(),
				importer = importers[type],
				item,
				data = node.getAttribute && node.getAttribute('data-paper-data'),
				settings = scope.settings,
				applyMatrix = settings.applyMatrix;
			settings.applyMatrix = false;
			item = importer && importer(node, type, options, isRoot) || null;
			settings.applyMatrix = applyMatrix;
			if (item) {
				if (type !== '#document' && !(item instanceof Group))
					item = applyAttributes(item, node, isRoot);
				var onImport = options.onImport;
				if (onImport)
					item = onImport(node, item, options) || item;
				if (options.expandShapes && item instanceof Shape) {
					item.remove();
					item = item.toPath();
				}
				if (data)
					item._data = JSON.parse(data);
			}
			if (isRoot) {
				definitions = {};
				if (item && Base.pick(options.applyMatrix, applyMatrix))
					item.matrix.apply(true, true);
			}
			return item;
		}

		Item.inject({
			importSVG: function(node, options) {
				return this.addChild(importSVG(node, options, true));
			}
		});

		Project.inject({
			importSVG: function(node, options) {
				this.activate();
				return importSVG(node, options, true);
			}
		});
	};

	paper = new (PaperScope.inject(Base.exports, {
		enumerable: true,
		Base: Base,
		Numerical: Numerical,
		Key: Key
	}))();

	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (paper), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module === 'object' && module) {
		module.exports = paper;
	}

	return paper;
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);

	var SectionHeader = React.createClass({
	  displayName: "SectionHeader",

	  render: function render() {
	    return React.createElement(
	      "h2",
	      { "data-num": this.props.number },
	      React.createElement(
	        "a",
	        { href: '#' + this.props.name },
	        this.props.title
	      )
	    );
	  }
	});

	module.exports = SectionHeader;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var Whatis = React.createClass({
	  displayName: "Whatis",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "So what makes a Bézier Curve?"
	    };
	  },

	  setup: function setup(api) {
	    api.setPanelCount(3);
	    var curve = api.getDefaultQuadratic();
	    api.setCurve(curve);
	    api.step = 25;
	  },

	  draw: function draw(api, curve) {
	    var dim = api.getPanelWidth(),
	        pts = curve.points,
	        p1 = pts[0],
	        p2 = pts[1],
	        p3 = pts[2],
	        p1e,
	        p2e,
	        m,
	        t,
	        i,
	        offset = { x: 0, y: 0 },
	        d,
	        v,
	        tvp;

	    api.reset();

	    api.setColor("black");
	    api.setFill("black");
	    api.drawSkeleton(curve, offset);
	    api.text("First linear interpolation at " + api.step + "% steps", { x: 5, y: 15 }, offset);

	    offset.x += dim;
	    api.drawLine({ x: 0, y: 0 }, { x: 0, y: this.dim }, offset);
	    api.drawSkeleton(curve, offset);
	    api.text("Second interpolation at " + api.step + "% steps", { x: 5, y: 15 }, offset);

	    offset.x += dim;
	    api.drawLine({ x: 0, y: 0 }, { x: 0, y: this.dim }, offset);
	    api.drawSkeleton(curve, offset);
	    api.text("Curve points generated this way", { x: 5, y: 15 }, offset);

	    api.setColor("lightgrey");
	    for (t = 1, d = 20, v, tvp; t < d; t++) {
	      v = t / d;
	      tvp = curve.get(v);
	      api.drawCircle(tvp, 2, offset);
	    }

	    for (i = 3 * api.step; i > 0; i -= api.step) {
	      t = i / 100;
	      if (t > 1) continue;
	      api.setRandomColor();

	      p1e = {
	        x: p1.x + t * (p2.x - p1.x),
	        y: p1.y + t * (p2.y - p1.y)
	      };

	      p2e = {
	        x: p2.x + t * (p3.x - p2.x),
	        y: p2.y + t * (p3.y - p2.y)
	      };

	      m = {
	        x: p1e.x + t * (p2e.x - p1e.x),
	        y: p1e.y + t * (p2e.y - p1e.y)
	      };

	      offset = { x: 0, y: 0 };
	      api.drawCircle(p1e, 3, offset);
	      api.drawCircle(p2e, 3, offset);
	      api.setWeight(0.5);
	      api.drawLine(p1e, p2e, offset);
	      api.setWeight(1.5);
	      api.drawLine(p1, p1e, offset);
	      api.drawLine(p2, p2e, offset);
	      api.setWeight(1);

	      offset.x += dim;
	      api.drawCircle(p1e, 3, offset);
	      api.drawCircle(p2e, 3, offset);
	      api.setWeight(0.5);
	      api.drawLine(p1e, p2e, offset);
	      api.setWeight(1.5);
	      api.drawLine(p1e, m, offset);
	      api.setWeight(1);
	      api.drawCircle(m, 3, offset);

	      offset.x += dim;
	      api.drawCircle(m, 3, offset);

	      api.text(i + "%, or t = " + api.utils.round(t, 2), { x: m.x + 10 + offset.x, y: m.y + 10 + offset.y });
	    }
	  },

	  values: {
	    "38": 1, // up arrow
	    "40": -1 // down arrow
	  },

	  onKeyDown: function onKeyDown(e, api) {
	    var v = this.values[e.keyCode];
	    if (v) {
	      e.preventDefault();
	      api.step += v;
	      if (api.step < 1) {
	        api.step = 1;
	      }
	    }
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "Playing with the points for curves may have given you a feel for how Bézier curves behaves, but what ",
	        React.createElement(
	          "em",
	          null,
	          "are"
	        ),
	        " Bézier curves, really? There are two ways to explain what a Bézier curve is, and they turn out to be the entirely equivalent, but one of them uses complicated maths, and the other uses really simple maths. So... let's start with the simple explanation:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Bezier curves are the result of ",
	        React.createElement(
	          "a",
	          { href: "https://en.wikipedia.org/wiki/Linear_interpolation" },
	          "linear interpolations"
	        ),
	        ". That sounds complicated but you've been doing linear interpolation since you were very young: any time you had to point at something between two other things, you've been applying linear interpolation. It's simply \"picking a point between two, points\"."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "If we know the distance between those two points, and we want a new point that is, say, 20% the distance away from the first point (and thus 80% the distance away from the second point) then we can compute that really easily:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/75bb049d813d8ee084b076531823f2109cc1660f.svg", style: { width: "36.750150000000005rem", height: "6.37515rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So let's look at that in action: the following graphic is interactive in that you can use your up and down arrow keys to increase or decrease the interpolation distance, to see what happens. We start with three points, which gives us two lines. Linear interpolation over those lines gives use two points, between which we can again perform linear interpolation, yielding a single point. And that point —and all points we can form in this way for all distances taken together— form our Bézier curve:"
	      ),
	      React.createElement(Graphic, { title: "Linear Interpolation leading to Bézier curves", setup: this.setup, draw: this.draw, onKeyDown: this.onKeyDown }),
	      React.createElement(
	        "p",
	        null,
	        "And that brings us to the complicated maths: calculus."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "While it doesn't look like that's what we've just done, we actually just drew a quadratic curve, in steps, rather than in a single go. One of the fascinating parts about Bézier curves is that they can both be described in terms of polynomial functions, as well as in terms of very simple interpolations of interpolations of [...]. That, in turn, means we can look at what these curves can do based on both \"real maths\" (by examining the functions, their derivatives, and all that stuff), as well as by looking at the \"mechanical\" composition (which tells us that a curve will never extend beyond the points we used to construct it, for instance)"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So let's start looking at Bézier curves a bit more in depth. Their mathematical expressions, the properties we can derive from those, and the various things we can do to, and with, Bézier curves."
	      )
	    );
	  }
	});

	module.exports = Whatis;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);
	var keyHandling = __webpack_require__(18);

	var Explanation = React.createClass({
	  displayName: "Explanation",

	  statics: {
	    keyHandlingOptions: {
	      propName: "step",
	      values: {
	        "38": 0.1, // up arrow
	        "40": -0.1 // down arrow
	      },
	      controller: function controller(api) {
	        if (api.step < 0.1) {
	          api.step = 0.1;
	        }
	      }
	    }
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "The mathematics of Bézier curves"
	    };
	  },

	  setup: function setup(api) {
	    api.step = 5;
	  },

	  draw: function draw(api, curve) {
	    var dim = api.getPanelWidth(),
	        w = dim,
	        h = dim,
	        w2 = w / 2,
	        h2 = h / 2,
	        w4 = w2 / 2,
	        h4 = h2 / 2;

	    api.reset();
	    api.setColor("black");
	    api.drawLine({ x: 0, y: h2 }, { x: w, y: h2 });
	    api.drawLine({ x: w2, y: 0 }, { x: w2, y: h });

	    var offset = { x: w2, y: h2 };
	    for (var t = 0, p; t <= api.step; t += 0.1) {
	      p = {
	        x: w4 * Math.cos(t),
	        y: h4 * Math.sin(t)
	      };
	      api.drawPoint(p, offset);
	      var modulo = t % 1;
	      if (modulo < 0.05 || modulo > 0.95) {
	        api.text("t = " + Math.round(t), {
	          x: offset.x + 1.25 * w4 * Math.cos(t) - 10,
	          y: offset.y + 1.25 * h4 * Math.sin(t) + 5
	        });
	        api.drawCircle(p, 2, offset);
	      }
	    }
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "Bézier curves are a form of \"parametric\" function. Mathematically speaking, parametric functions are cheats: a \"function\" is actually a well defined term representing a mapping from any number of inputs to a ",
	        React.createElement(
	          "strong",
	          null,
	          "single"
	        ),
	        " output. Numbers go in, a single number comes out. Change the numbers that go in, and the number that comes out is still a single number. Parametric functions cheat. They basically say \"alright, well, we want multiple values coming out, so we'll just use more than one function\". An illustration: Let's say we have a function that maps some value, let's call it ",
	        React.createElement(
	          "i",
	          null,
	          "x"
	        ),
	        ", to some other value, using some kind of number manipulation:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/785e792c343b71d4e674ac94d8800940b30917ac.svg", style: { width: "6.22485rem", height: "1.125rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The notation ",
	        React.createElement(
	          "i",
	          null,
	          "f(x)"
	        ),
	        " is the standard way to show that it's a function (by convention called ",
	        React.createElement(
	          "i",
	          null,
	          "f"
	        ),
	        " if we're only listing one) and its output changes based on one variable (in this case, ",
	        React.createElement(
	          "i",
	          null,
	          "x"
	        ),
	        "). Change ",
	        React.createElement(
	          "i",
	          null,
	          "x"
	        ),
	        ", and the output for ",
	        React.createElement(
	          "i",
	          null,
	          "f(x)"
	        ),
	        " changes."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So far so good. Now, let's look at parametric functions, and how they cheat. Let's take the following two functions:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/0dfe7562b43441e72201ff4cdd2e8b6e2e3ecb2d.svg", style: { width: "6.525rem", height: "2.6248500000000003rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "There's nothing really remarkable about them, they're just a sine and cosine function, but you'll notice the inputs have different names. If we change the value for ",
	        React.createElement(
	          "i",
	          null,
	          "a"
	        ),
	        ", we're not going to change the output value for ",
	        React.createElement(
	          "i",
	          null,
	          "f(b)"
	        ),
	        ", since ",
	        React.createElement(
	          "i",
	          null,
	          "a"
	        ),
	        " isn't used in that function. Parametric functions cheat by changing that. In a parametric function all the different functions share a variable, like this:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/ed6f533530199d1e99b3319ba137c1327b0459c0.svg", style: { width: "7.349849999999999rem", height: "2.6248500000000003rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Multiple functions, but only one variable. If we change the value for ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        ", we change the outcome of both ",
	        React.createElement(
	          "i",
	          null,
	          "f",
	          React.createElement(
	            "sub",
	            null,
	            "a"
	          ),
	          "(t)"
	        ),
	        " and ",
	        React.createElement(
	          "i",
	          null,
	          "f",
	          React.createElement(
	            "sub",
	            null,
	            "b"
	          ),
	          "(t)"
	        ),
	        ". You might wonder how that's useful, and the answer is actually pretty simple: if we change the labels ",
	        React.createElement(
	          "i",
	          null,
	          "f",
	          React.createElement(
	            "sub",
	            null,
	            "a"
	          ),
	          "(t)"
	        ),
	        " and ",
	        React.createElement(
	          "i",
	          null,
	          "f",
	          React.createElement(
	            "sub",
	            null,
	            "b"
	          ),
	          "(t)"
	        ),
	        " with what we usually mean with them for parametric curves, things might be a lot more obvious:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/ea632ea75d6a2aeb6fe69c07feb6e76f81884746.svg", style: { width: "5.77485rem", height: "2.6248500000000003rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "There we go. ",
	        React.createElement(
	          "i",
	          null,
	          "x"
	        ),
	        "/",
	        React.createElement(
	          "i",
	          null,
	          "y"
	        ),
	        " coordinates, linked through some mystery value ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        "."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So, parametric curves don't define a ",
	        React.createElement(
	          "i",
	          null,
	          "y"
	        ),
	        " coordinate in terms of an ",
	        React.createElement(
	          "i",
	          null,
	          "x"
	        ),
	        " coordinate, like normal functions do, but they instead link the values to a \"control\" variable. If we vary the value of ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        ", then with every change we get ",
	        React.createElement(
	          "strong",
	          null,
	          "two"
	        ),
	        " values, which we can use as (",
	        React.createElement(
	          "i",
	          null,
	          "x"
	        ),
	        ",",
	        React.createElement(
	          "i",
	          null,
	          "y"
	        ),
	        ") coordinates in a graph. The above set of functions, for instance, generates points on a circle: We can range ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " from negative to positive infinity, and the resulting (",
	        React.createElement(
	          "i",
	          null,
	          "x"
	        ),
	        ",",
	        React.createElement(
	          "i",
	          null,
	          "y"
	        ),
	        ") coordinates will always lie on a circle with radius 1 around the origin (0,0). If we plot it for ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " from 0 to 5, we get this (use your up and down arrow keys to change the plot end value):"
	      ),
	      React.createElement(Graphic, { preset: "empty", title: "A (partial) circle: x=sin(t), y=cos(t)", "static": true, setup: this.setup, draw: this.draw, onKeyDown: this.props.onKeyDown }),
	      React.createElement(
	        "p",
	        null,
	        "Bézier curves are (one in many classes of) parametric functions, and are characterised by using the same base function for all its dimensions. Unlike the above example, where the ",
	        React.createElement(
	          "i",
	          null,
	          "x"
	        ),
	        " and ",
	        React.createElement(
	          "i",
	          null,
	          "y"
	        ),
	        " values use different functions (one uses a sine, the other a cosine), Bézier curves use the \"binomial polynomial\" for both ",
	        React.createElement(
	          "i",
	          null,
	          "x"
	        ),
	        " and ",
	        React.createElement(
	          "i",
	          null,
	          "y"
	        ),
	        ". So what are binomial polynomials?"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "You may remember polynomials from high school, where they're those sums that look like:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/3e8b26cf8833db7089d65e9c6b3953a3140bb19f.svg", style: { width: "14.32485rem", height: "1.20015rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "If they have a highest order term ",
	        React.createElement(
	          "i",
	          null,
	          "x³"
	        ),
	        " they're called \"cubic\" polynomials, if it's",
	        React.createElement(
	          "i",
	          null,
	          "x²"
	        ),
	        " it's a \"square\" polynomial, if it's just ",
	        React.createElement(
	          "i",
	          null,
	          "x"
	        ),
	        " it's a line (and if there aren't even any terms with ",
	        React.createElement(
	          "i",
	          null,
	          "x"
	        ),
	        " it's not a polynomial!)"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Bézier curves are polynomials of ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        ", rather than ",
	        React.createElement(
	          "i",
	          null,
	          "x"
	        ),
	        ", with the value for ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        "fixed being between 0 and 1, with coefficients ",
	        React.createElement(
	          "i",
	          null,
	          "a"
	        ),
	        ", ",
	        React.createElement(
	          "i",
	          null,
	          "b"
	        ),
	        " etc. taking the \"binomial\" form, which sounds fancy but is actually a pretty simple description for mixing values:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/24e915ab4c69b85951f1ea9018b0ece9e52a10dd.svg", style: { width: "24.89985rem", height: "4.1998500000000005rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "I know what you're thinking: that doesn't look too simple, but if we remove ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " and add in \"times one\", things suddenly look pretty easy. Check out these binomial terms:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/448d10d21afd49135055cf685fedf6c494984b53.svg", style: { width: "14.475150000000001rem", height: "5.175rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Notice that 2 is the same as 1+1, and 3 is 2+1 and 1+2, and 6 is 3+3... As you can see, each time we go up a dimension, we simply start and end with 1, and everything in between is just \"the two numbers above it, added together\". Now ",
	        React.createElement(
	          "i",
	          null,
	          "that's"
	        ),
	        " easy to remember."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "There's an equally simple way to figure out how the polynomial terms work: if we rename ",
	        React.createElement(
	          "i",
	          null,
	          "(1-t)"
	        ),
	        " to ",
	        React.createElement(
	          "i",
	          null,
	          "a"
	        ),
	        " and ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " to ",
	        React.createElement(
	          "i",
	          null,
	          "b"
	        ),
	        ", and remove the weights for a moment, we get this:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/87c7f5294b902def4ea56e8f6cf24265a37143b6.svg", style: { width: "20.84985rem", height: "3.825rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "It's basically just a sum of \"every combination of ",
	        React.createElement(
	          "i",
	          null,
	          "a"
	        ),
	        " and ",
	        React.createElement(
	          "i",
	          null,
	          "b"
	        ),
	        "\", progressively replacing ",
	        React.createElement(
	          "i",
	          null,
	          "a"
	        ),
	        "'s with ",
	        React.createElement(
	          "i",
	          null,
	          "b"
	        ),
	        "'s after every + sign. So that's actually pretty simple too. So now you know binomial polynomials, and just for completeness I'm going to show you the generic function for this:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/d79bf595a0911c17e2ac86d8806a0a8ab6ba7dfe.svg", style: { width: "20.39985rem", height: "3.90015rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "And that's the full description for Bézier curves. Σ in this function indicates that this is a series of additions (using the variable listed below the Σ, starting at ...=<value> and ending at the value listed on top of the Σ)."
	      ),
	      React.createElement(
	        "div",
	        { className: "howtocode" },
	        React.createElement(
	          "h3",
	          null,
	          "How to implement the basis function"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "We could naively implement the basis function as a mathematical construct, using the function as our guide, like this:"
	        ),
	        React.createElement(
	          "pre",
	          null,
	          "function Bezier(n,t):",
	          '\n',
	          "  sum = 0",
	          '\n',
	          "  for(k=0; k<n; k++):",
	          '\n',
	          "    sum += n!/(k!*(n-k)!) * (1-t)^(n-k) * t^(k)",
	          '\n',
	          "  return sum"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "I say we could, because we're not going to: the factorial function is ",
	          React.createElement(
	            "em",
	            null,
	            "incredibly"
	          ),
	          "expensive. And, as we can see from the above explanation, we can actually create Pascal's triangle quite easily without it: just start at [1], then [1,1], then [1,2,1], then [1,3,3,1], and so on, with each next row fitting 1 more number than the previous row, starting and ending with \"1\", with all the numbers in between being the sum of the previous row's elements on either side \"above\" the one we're computing."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "We can generate this as a list of lists lightning fast, and then never have to compute the binomial terms because we have a lookup table:"
	        ),
	        React.createElement(
	          "pre",
	          null,
	          "lut = [      [1],           // n=0",
	          '\n',
	          "            [1,1],          // n=1",
	          '\n',
	          "           [1,2,1],         // n=2",
	          '\n',
	          "          [1,3,3,1],        // n=3",
	          '\n',
	          "         [1,4,6,4,1],       // n=4",
	          '\n',
	          "        [1,5,10,10,5,1],    // n=5",
	          '\n',
	          "       [1,6,15,20,15,6,1]]  // n=6",
	          '\n',
	          '\n',
	          "binomial(n,k):",
	          '\n',
	          "  while(n >= lut.length):",
	          '\n',
	          "    s = lut.length",
	          '\n',
	          "    nextRow = new array(size=s+1)",
	          '\n',
	          "    nextRow[0] = 1",
	          '\n',
	          "    for(i=1, prev=s-1; i&ltprev; i++):",
	          '\n',
	          "      nextRow[i] = lut[prev][i-1] + lut[prev][i]",
	          '\n',
	          "    nextRow[s] = 1",
	          '\n',
	          "    lut.add(nextRow)",
	          '\n',
	          "  return lut[n][k]"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "So what's going on here? First, we declare a lookup table with a size that's reasonably large enough to accommodate most lookups. Then, we declare a function to get us the values we need, and we make sure that if an n/k pair is requested that isn't in the LUT yet, we expand it first. Our basis function now looks like this:"
	        ),
	        React.createElement(
	          "pre",
	          null,
	          "function Bezier(n,t):",
	          '\n',
	          "  sum = 0",
	          '\n',
	          "  for(k=0; k<n; k++):",
	          '\n',
	          "    sum += binomial(n,k) * (1-t)^(n-k) * t^(k)",
	          '\n',
	          "  return sum"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Perfect. Of course, we can optimize further. For most computer graphics purposes, we don't need arbitrary curves. We need quadratic and  cubic curves (this primer actually does do arbitrary curves, so you'll find code similar to shown here), which means we can drastically simplify the code:"
	        ),
	        React.createElement(
	          "pre",
	          null,
	          "function Bezier(2,t):",
	          '\n',
	          "  t2 = t * t",
	          '\n',
	          "  mt = 1-t",
	          '\n',
	          "  mt2 = mt * mt",
	          '\n',
	          "  return mt2 + 2*mt*t + t2",
	          '\n',
	          '\n',
	          "function Bezier(3,t):",
	          '\n',
	          "  t2 = t * t",
	          '\n',
	          "  t3 = t2 * t",
	          '\n',
	          "  mt = 1-t",
	          '\n',
	          "  mt2 = mt * mt",
	          '\n',
	          "  mt3 = mt2 * mt",
	          '\n',
	          "  return mt3 + 3*mt2*t + 3*mt*t2 + t3"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "And now we know how to program the basis function. Exellent."
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So, now we know what the base function(s) look(s) like, time to add in the magic that makes Bézier curves so special: control points."
	      )
	    );
	  }
	});

	module.exports = keyHandling(Explanation);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);
	var noop = __webpack_require__(19);

	module.exports = function (Component) {
	  var options = Component.keyHandlingOptions,
	      propName = options.propName || "",
	      values = options.values || {},
	      controller = options.controller || noop,
	      getDefaultProps = Component.getDefaultProps,
	      ref = "wrappedComponent";

	  return React.createClass({
	    values: values,

	    getDefaultProps: getDefaultProps,

	    onKeyDown: function onKeyDown(event, api) {
	      var v = this.values[event.keyCode];
	      if (v) {
	        event.preventDefault();
	        if (typeof v === "function") {
	          v(api);
	        } else {
	          api[propName] += v;
	          controller(api);
	        }
	      }
	    },

	    getComponent: function getComponent() {
	      var wrappedComponent = this.refs[ref];
	      if (wrappedComponent.getComponent) {
	        return wrappedComponent.getComponent();
	      }
	      return wrappedComponent;
	    },

	    render: function render() {
	      return React.createElement(Component, _extends({}, this.props, { onKeyDown: this.onKeyDown, ref: ref }));
	    }
	  });
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(){};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var Control = React.createClass({
	  displayName: "Control",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Controlling Bézier curvatures"
	    };
	  },

	  drawCubic: function drawCubic(api) {
	    var curve = api.getDefaultCubic();
	    api.setCurve(curve);
	  },

	  drawCurve: function drawCurve(api, curve) {
	    api.reset();
	    api.drawSkeleton(curve);
	    api.drawCurve(curve);
	  },

	  drawFunction: function drawFunction(api, label, where, generator) {
	    api.setRandomColor();
	    api.drawFunction(generator);
	    api.setFill(api.getColor());
	    if (label) api.text(label, where);
	  },

	  drawLerpBox: function drawLerpBox(api, dim, pad, p) {
	    api.noColor();
	    api.setFill("rgba(0,0,100,0.2)");
	    var p1 = { x: p.x - 5, y: pad },
	        p2 = { x: p.x + 5, y: dim };
	    api.drawRect(p1, p2);
	    api.setColor("black");
	  },

	  drawLerpPoint: function drawLerpPoint(api, tf, pad, fwh, p) {
	    p.y = pad + tf * fwh;
	    api.drawCircle(p, 3);
	    api.setFill("black");
	    api.text((tf * 10000 | 0) / 100 + "%", { x: p.x + 10, y: p.y + 4 });
	    api.noFill();
	  },

	  drawQuadraticLerp: function drawQuadraticLerp(api) {
	    api.reset();

	    var dim = api.getPanelWidth(),
	        pad = 20,
	        fwh = dim - pad * 2;

	    api.drawAxes(pad, "t", 0, 1, "S", "0%", "100%");

	    var p = api.hover;
	    if (p && p.x >= pad && p.x <= dim - pad) {
	      this.drawLerpBox(api, dim, pad, p);
	      var t = (p.x - pad) / fwh;
	      this.drawLerpPoint(api, (1 - t) * (1 - t), pad, fwh, p);
	      this.drawLerpPoint(api, 2 * (1 - t) * t, pad, fwh, p);
	      this.drawLerpPoint(api, t * t, pad, fwh, p);
	    }

	    this.drawFunction(api, "first term", { x: pad * 2, y: fwh }, function (t) {
	      return {
	        x: pad + t * fwh,
	        y: pad + fwh * (1 - t) * (1 - t)
	      };
	    });
	    this.drawFunction(api, "second term", { x: dim / 2 - 1.5 * pad, y: dim / 2 + pad }, function (t) {
	      return {
	        x: pad + t * fwh,
	        y: pad + fwh * 2 * (1 - t) * t
	      };
	    });
	    this.drawFunction(api, "third term", { x: fwh - pad * 2.5, y: fwh }, function (t) {
	      return {
	        x: pad + t * fwh,
	        y: pad + fwh * t * t
	      };
	    });
	  },

	  drawCubicLerp: function drawCubicLerp(api) {
	    api.reset();

	    var dim = api.getPanelWidth(),
	        pad = 20,
	        fwh = dim - pad * 2;

	    api.drawAxes(pad, "t", 0, 1, "S", "0%", "100%");

	    var p = api.hover;
	    if (p && p.x >= pad && p.x <= dim - pad) {
	      this.drawLerpBox(api, dim, pad, p);
	      var t = (p.x - pad) / fwh;
	      this.drawLerpPoint(api, (1 - t) * (1 - t) * (1 - t), pad, fwh, p);
	      this.drawLerpPoint(api, 2 * (1 - t) * (1 - t) * t, pad, fwh, p);
	      this.drawLerpPoint(api, 3 * (1 - t) * t * t, pad, fwh, p);
	      this.drawLerpPoint(api, t * t * t, pad, fwh, p);
	    }

	    this.drawFunction(api, "first term", { x: pad * 2, y: fwh }, function (t) {
	      return {
	        x: pad + t * fwh,
	        y: pad + fwh * (1 - t) * (1 - t) * (1 - t)
	      };
	    });
	    this.drawFunction(api, "second term", { x: dim / 2 - 4 * pad, y: dim / 2 }, function (t) {
	      return {
	        x: pad + t * fwh,
	        y: pad + fwh * 3 * (1 - t) * (1 - t) * t
	      };
	    });
	    this.drawFunction(api, "third term", { x: dim / 2 + 2 * pad, y: dim / 2 }, function (t) {
	      return {
	        x: pad + t * fwh,
	        y: pad + fwh * 3 * (1 - t) * t * t
	      };
	    });
	    this.drawFunction(api, "fourth term", { x: fwh - pad * 2.5, y: fwh }, function (t) {
	      return {
	        x: pad + t * fwh,
	        y: pad + fwh * t * t * t
	      };
	    });
	  },

	  draw15thLerp: function draw15thLerp(api) {
	    api.reset();

	    var dim = api.getPanelWidth(),
	        pad = 20,
	        fwh = dim - pad * 2;

	    api.drawAxes(pad, "t", 0, 1, "S", "0%", "100%");

	    var factors = [1, 15, 105, 455, 1365, 3003, 5005, 6435, 6435, 5005, 3003, 1365, 455, 105, 15, 1];

	    var p = api.hover,
	        n;
	    if (p && p.x >= pad && p.x <= dim - pad) {
	      this.drawLerpBox(api, dim, pad, p);
	      for (n = 0; n <= 15; n++) {
	        var t = (p.x - pad) / fwh,
	            tf = factors[n] * Math.pow(1 - t, 15 - n) * Math.pow(t, n);
	        this.drawLerpPoint(api, tf, pad, fwh, p);
	      }
	    }

	    for (n = 0; n <= 15; n++) {
	      var label = false,
	          position = false;
	      if (n === 0) {
	        label = "first term";
	        position = { x: pad + 5, y: fwh };
	      }
	      if (n === 15) {
	        label = "last term";
	        position = { x: dim - 3.5 * pad, y: fwh };
	      }
	      this.drawFunction(api, label, position, function (t) {
	        return {
	          x: pad + t * fwh,
	          y: pad + fwh * factors[n] * Math.pow(1 - t, 15 - n) * Math.pow(t, n)
	        };
	      });
	    }
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "Bézier curves are (like all \"splines\") interpolation functions, meaning they take a set of points, and generate values somewhere \"between\" those points. (One of the consequences of this is that you'll never be able to generate a point that lies outside the outline for the control points, commonly called the \"hull\" for the curve. Useful information!). In fact, we can visualize how each point contributes to the value generated by the function, so we can see which points are important, where, in the curve."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The following graphs show the interpolation functions for quadratic and cubic curves, with \"S\" being the strength of a point's contribution to the total sum of the Bézier function. Click or click-drag to see the interpolation percentages for each curve-defining point at a specific ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value."
	      ),
	      React.createElement(
	        "div",
	        { className: "figure" },
	        React.createElement(Graphic, { inline: true, preset: "simple", title: "Quadratic interpolations", draw: this.drawQuadraticLerp }),
	        React.createElement(Graphic, { inline: true, preset: "simple", title: "Cubic interpolations", draw: this.drawCubicLerp }),
	        React.createElement(Graphic, { inline: true, preset: "simple", title: "15th order interpolations", draw: this.draw15thLerp })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Also shown is the interpolation function for a 15",
	        React.createElement(
	          "sup",
	          null,
	          "th"
	        ),
	        " order Bézier function. As you can see, the start and end point contribute considerably more to the curve's shape than any other point in the control point set."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "If we want to change the curve, we need to change the weights of each point, effectively changing the interpolations. The way to do this is about as straight forward as possible: just multiply each point with a value that changes its strength. These values are conventionally called \"Weights\", and we can add them to our original Bézier function:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/b98618f8061e9e58289abccc06a624a14561d40f.svg", style: { width: "23.70015rem", height: "3.90015rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "That looks complicated, but as it so happens, the \"weights\" are actually just the coordinate values we want our curve to have: for an ",
	        React.createElement(
	          "i",
	          null,
	          "n",
	          React.createElement(
	            "sup",
	            null,
	            "th"
	          )
	        ),
	        " order curve, w",
	        React.createElement(
	          "sub",
	          null,
	          "0"
	        ),
	        " is our start coordinate, w",
	        React.createElement(
	          "sub",
	          null,
	          "n"
	        ),
	        " is our last coordinate, and everything in between is a controlling coordinate. Say we want a cubic curve that starts at (120,160), is controlled by (35,200) and (220,260) and ends at (220,40), we use this Bézier curve:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/853858526831a7ef3eb170efe49de397bb4913a1.svg", style: { width: "32.025150000000004rem", height: "2.77515rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Which gives us the curve we saw at the top of the article:"
	      ),
	      React.createElement(Graphic, { preset: "simple", title: "Our cubic Bézier curve", setup: this.drawCubic, draw: this.drawCurve }),
	      React.createElement(
	        "p",
	        null,
	        "What else can we do with Bézier curves? Quite a lot, actually. The rest of this article covers a multitude of possible operations and algorithms that we can apply, and the tasks they achieve."
	      ),
	      React.createElement(
	        "div",
	        { className: "howtocode" },
	        React.createElement(
	          "h3",
	          null,
	          "How to implement the weighted basis function"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Given that we already know how to implement basis function, adding in the control points is remarkably easy:"
	        ),
	        React.createElement(
	          "pre",
	          null,
	          "function Bezier(n,t,w[]):",
	          '\n',
	          "  sum = 0",
	          '\n',
	          "  for(k=0; k<n; k++):",
	          '\n',
	          "    sum += w[k] * binomial(n,k) * (1-t)^(n-k) * t^(k)",
	          '\n',
	          "  return sum"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "And for the extremely optimized versions:"
	        ),
	        React.createElement(
	          "pre",
	          null,
	          "function Bezier(2,t,w[]):",
	          '\n',
	          "  t2 = t * t",
	          '\n',
	          "  mt = 1-t",
	          '\n',
	          "  mt2 = mt * mt",
	          '\n',
	          "  return w[0]*mt2 + w[1]*2*mt*t + w[2]*t2",
	          '\n',
	          '\n',
	          "function Bezier(3,t,w[]):",
	          '\n',
	          "  t2 = t * t",
	          '\n',
	          "  t3 = t2 * t",
	          '\n',
	          "  mt = 1-t",
	          '\n',
	          "  mt2 = mt * mt",
	          '\n',
	          "  mt3 = mt2 * mt",
	          '\n',
	          "  return w[0]*mt3 + 3*w[1]*mt2*t + 3*w[2]*mt*t2 + w[3]*t3"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "And now we know how to program the weighted basis function."
	        )
	      )
	    );
	  }
	});

	module.exports = Control;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var SectionHeader = __webpack_require__(15);

	var Matrix = React.createClass({
	  displayName: "Matrix",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Bézier curvatures as matrix operations"
	    };
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "We can also represent Bézier as matrix operations, by expressing the Bézier formula as a polynomial basis function, the weight matrix, and the actual coordinates as matrix. Let's look at what this means for the cubic curve :"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/d961171d6d1dfc22bb1756901e79102147914360.svg", style: { width: "31.12515rem", height: "1.20015rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Disregarding our actual coordinates for a moment, we have:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/f925c339011e6c38e47b9c3a571e02fca80eb5c3.svg", style: { width: "23.475150000000003rem", height: "1.20015rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We can write this as a sum of four expressions:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/30d76165668bf15f62986503bea100f39c5b9fec.svg", style: { width: "10.42515rem", height: "5.8500000000000005rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "And we can expand these expressions:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/7ca5abe1124ba1e51b7f12e0469cb4b1407593b8.svg", style: { width: "27.82485rem", height: "5.8500000000000005rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Furthermore, we can make all the 1 and 0 factors explicit:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/bccbb94942e3ff79579e4719106f4701c157727e.svg", style: { width: "15.67485rem", height: "5.625rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "And ",
	        React.createElement(
	          "em",
	          null,
	          "that"
	        ),
	        ", we can view as a series of four matrix operations:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/d5f85d80fbbc62e1e8d58621b76f3d0224876b62.svg", style: { width: "45.225rem", height: "5.47515rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "If we compact this into a single matrix operation, we get:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/7140be48f45b2e7190fa8dffef5c05c47c038ab0.svg", style: { width: "16.875rem", height: "5.47515rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "This kind of polynomial basis representation is generally written with the bases in increasing order, which means we need to flip our ",
	        React.createElement(
	          "em",
	          null,
	          "t"
	        ),
	        " matrix horizontally, and our big \"mixing\" matrix upside down:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/4e1849950a5c13f5135aa3412e0ee634cdc67301.svg", style: { width: "16.875rem", height: "5.47515rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "And then finally, we can add in our original coordinates as a single third matrix:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/5910e25a46d9e86ab34513017f1274628a40e5a7.svg", style: { width: "23.925150000000002rem", height: "5.47515rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We can perform the same trick for the quadratic curve, in which case we end up with:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/e56e78e406d625c2a5ec584216f79a5fee00d8ea.svg", style: { width: "19.65015rem", height: "3.97485rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "If we plug in a ",
	        React.createElement(
	          "em",
	          null,
	          "t"
	        ),
	        " value, and then multiply the matrices, we will get exactly the same values as when we evaluate the original polynomial function, or as when we evaluate the curve using progessive linear interpolation."
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement(
	          "strong",
	          null,
	          "So: why would we bother with matrices?"
	        ),
	        " Matrix representations allow us to discover things about functions that would otherwise be hard to tell. It turns out that the curves form ",
	        React.createElement(
	          "a",
	          { href: "https://en.wikipedia.org/wiki/Triangular_matrix" },
	          "triangular matrices"
	        ),
	        ", and they have a determinant equal to the product of the actual coordinates we use for our curve. It's also invertible, which means there's",
	        React.createElement(
	          "a",
	          { href: "https://en.wikipedia.org/wiki/Invertible_matrix#The_invertible_matrix_theorem" },
	          "a ton of properties"
	        ),
	        " that are all satisfied. Of course, the main question is: \"Why is this useful to us, now?\", and the answer to that is that it's not immediately useful, but you'll be seeing some instances where certain curve properties can be either computed via function manipulation, or via clever use of matrices, and sometimes the matrix approach can be (drastically) faster."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So for now, just remember that we can represent curves this way, and let's move on."
	      )
	    );
	  }
	});

	module.exports = Matrix;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var deCasteljau = React.createClass({
	  displayName: "deCasteljau",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "de Casteljau's algorithm"
	    };
	  },

	  setup: function setup(api) {
	    var points = [{ x: 90, y: 110 }, { x: 25, y: 40 }, { x: 230, y: 40 }, { x: 150, y: 240 }];
	    api.setCurve(new api.Bezier(points));
	  },

	  draw: function draw(api, curve) {
	    api.reset();
	    api.drawSkeleton(curve);
	    api.drawCurve(curve);

	    if (api.hover) {
	      api.setColor("rgb(200,100,100)");
	      var dim = api.getPanelWidth();
	      var t = api.hover.x / dim;
	      var hull = api.drawHull(curve, t);

	      for (var i = 4; i <= 8; i++) {
	        api.drawCircle(hull[i], 3);
	      }

	      var p = curve.get(t);
	      api.drawCircle(p, 5);
	      api.setFill("black");
	      api.drawCircle(p, 3);
	      var perc = t * 100 | 0;
	      t = perc / 100;
	      api.text("Sequential interpolation for " + perc + "% (t=" + t + ")", { x: 10, y: 15 });
	    }
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "If we want to draw Bézier curves we can run through all values of ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " from 0 to 1 and then compute the weighted basis function, getting the ",
	        React.createElement(
	          "i",
	          null,
	          "x"
	        ),
	        "/",
	        React.createElement(
	          "i",
	          null,
	          "y"
	        ),
	        " values we need to plot, but the more complex the curve gets, the more expensive this becomes. Instead, we can use \"de Casteljau's algorithm\" to draw curves, which is a geometric approach to drawing curves, and really easy to implement. So easy, in fact, you can do it by hand with a pencil and ruler."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Rather than using our calculus function to find ",
	        React.createElement(
	          "i",
	          null,
	          "x"
	        ),
	        "/",
	        React.createElement(
	          "i",
	          null,
	          "y"
	        ),
	        " values for ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        ", let's do this instead:"
	      ),
	      React.createElement(
	        "ul",
	        null,
	        React.createElement(
	          "li",
	          null,
	          "treat ",
	          React.createElement(
	            "i",
	            null,
	            "t"
	          ),
	          " as a ratio (which it is). t=0 is 0% along a line, t=1 is 100% along a line."
	        ),
	        React.createElement(
	          "li",
	          null,
	          "Take all lines between the curve's defining points. For an order ",
	          React.createElement(
	            "i",
	            null,
	            "n"
	          ),
	          " curve, that's ",
	          React.createElement(
	            "i",
	            null,
	            "n"
	          ),
	          " lines."
	        ),
	        React.createElement(
	          "li",
	          null,
	          "Place markers along each of these line, at distance ",
	          React.createElement(
	            "i",
	            null,
	            "t"
	          ),
	          ". So if ",
	          React.createElement(
	            "i",
	            null,
	            "t"
	          ),
	          " is 0.2, place the mark at 20% from the start, 80% from the end."
	        ),
	        React.createElement(
	          "li",
	          null,
	          "Now form lines between ",
	          React.createElement(
	            "i",
	            null,
	            "those"
	          ),
	          " points. This gives ",
	          React.createElement(
	            "i",
	            null,
	            "n-1"
	          ),
	          " lines."
	        ),
	        React.createElement(
	          "li",
	          null,
	          "Place markers along each of these line at distance ",
	          React.createElement(
	            "i",
	            null,
	            "t"
	          ),
	          "."
	        ),
	        React.createElement(
	          "li",
	          null,
	          "Form lines between ",
	          React.createElement(
	            "i",
	            null,
	            "those"
	          ),
	          " points. This'll be ",
	          React.createElement(
	            "i",
	            null,
	            "n-2"
	          ),
	          " lines."
	        ),
	        React.createElement(
	          "li",
	          null,
	          "place markers, form lines, place markers, etc."
	        ),
	        React.createElement(
	          "li",
	          null,
	          "repeat this until you have only one line left. The point ",
	          React.createElement(
	            "i",
	            null,
	            "t"
	          ),
	          " on that line coincides with the original curve point at ",
	          React.createElement(
	            "i",
	            null,
	            "t"
	          ),
	          "."
	        )
	      ),
	      React.createElement(
	        "div",
	        { className: "howtocode" },
	        React.createElement(
	          "h3",
	          null,
	          "How to implement de Casteljau's algorithm"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Let's just use the algorithm we just specified, and implement that:"
	        ),
	        React.createElement(
	          "pre",
	          null,
	          "function drawCurve(points[], t):",
	          '\n',
	          "  if(points.length==1):",
	          '\n',
	          "    draw(points[0])",
	          '\n',
	          "  else:",
	          '\n',
	          "    newpoints=array(points.size-1)",
	          '\n',
	          "    for(i=0; i<newpoints.length; i++):",
	          '\n',
	          "      newpoints[i] = (1-t) * points[i] + t * points[i+1]",
	          '\n',
	          "    drawCurve(newpoints, t)"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "And done, that's the algorithm implemented. Except usually you don't get the luxury of overloading the \"+\" operator, so let's also give the code for when you need to work with",
	          React.createElement(
	            "i",
	            null,
	            "x"
	          ),
	          " and ",
	          React.createElement(
	            "i",
	            null,
	            "y"
	          ),
	          " values:"
	        ),
	        React.createElement(
	          "pre",
	          null,
	          "function drawCurve(points[], t):",
	          '\n',
	          "  if(points.length==1):",
	          '\n',
	          "    draw(points[0])",
	          '\n',
	          "  else:",
	          '\n',
	          "    newpoints=array(points.size-1)",
	          '\n',
	          "    for(i=0; i<newpoints.length; i++):",
	          '\n',
	          "      x = (1-t) * points[i].x + t * points[i+1].x",
	          '\n',
	          "      y = (1-t) * points[i].y + t * points[i+1].y",
	          '\n',
	          "      newpoints[i] = new point(x,y)",
	          '\n',
	          "    drawCurve(newpoints, t)"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "So what does this do? This draws a point, if the passed list of points is only 1 point long. Otherwise it will create a new list of points that sit at the ",
	          React.createElement(
	            "i",
	            null,
	            "t"
	          ),
	          " ratios (i.e. the \"markers\" outlined in the above algorithm), and then call the draw function for this new list."
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "To see this in action, mouse-over the following sketch. Moving the mouse changes which curve point is explicitly evaluated using de Casteljau's algorithm, moving the cursor left-to-right (or, of course, right-to-left), shows you how a curve is generated using this approach."
	      ),
	      React.createElement(Graphic, { preset: "simple", title: "Traversing a curve using de Casteljau's algorithm", setup: this.setup, draw: this.draw })
	    );
	  }
	});

	module.exports = deCasteljau;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);
	var keyHandling = __webpack_require__(18);

	var Flattening = React.createClass({
	  displayName: "Flattening",

	  statics: {
	    keyHandlingOptions: {
	      propName: "steps",
	      values: {
	        "38": 1, // up arrow
	        "40": -1 // down arrow
	      },
	      controller: function controller(api) {
	        if (api.steps < 1) {
	          api.steps = 1;
	        }
	      }
	    }
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Simplified drawing"
	    };
	  },

	  setupQuadratic: function setupQuadratic(api) {
	    var curve = api.getDefaultQuadratic();
	    api.setCurve(curve);
	    api.steps = 3;
	  },

	  setupCubic: function setupCubic(api) {
	    var curve = api.getDefaultCubic();
	    api.setCurve(curve);
	    api.steps = 5;
	  },

	  drawFlattened: function drawFlattened(api, curve) {
	    api.reset();
	    api.setColor("#DDD");
	    api.drawSkeleton(curve);
	    api.setColor("#DDD");
	    api.drawCurve(curve);
	    var step = 1 / api.steps;
	    var p0 = curve.points[0],
	        pc;
	    for (var t = step; t < 1.0 + step; t += step) {
	      pc = curve.get(Math.min(t, 1));
	      api.setColor("red");
	      api.drawLine(p0, pc);
	      p0 = pc;
	    }
	    api.setFill("black");
	    api.text("Curve approximation using " + api.steps + " segments", { x: 10, y: 15 });
	  },

	  values: {
	    "38": 1, // up arrow
	    "40": -1 // down arrow
	  },

	  onKeyDown: function onKeyDown(e, api) {
	    var v = this.values[e.keyCode];
	    if (v) {
	      e.preventDefault();
	      api.steps += v;
	      if (api.steps < 1) {
	        api.steps = 1;
	      }
	    }
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "We can also simplify the drawing process by \"sampling\" the curve at certain points, and then joining those points up with straight lines, a process known as \"flattening\", as we are reducing a curve to a simple sequence of straight, \"flat\" lines."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We can do this is by saying \"we want X segments\", and then sampling the curve at intervals that are spaced such that we end up with the number of segments we wanted. The advantage of this method is that it's fast: instead of evaluating 100 or even 1000 curve coordinates, we can sample a much lower number and still end up with a curve that sort-of-kind-of looks good enough. The disadvantage of course is that we lose the precision of working with \"the real curve\", so we usually can't use the flattened for for doing true intersection detection, or curvature alignment."
	      ),
	      React.createElement(Graphic, { preset: "twopanel", title: "Flattening a quadratic curve", setup: this.setupQuadratic, draw: this.drawFlattened, onKeyDown: this.onKeyDown }),
	      React.createElement(Graphic, { preset: "twopanel", title: "Flattening a cubic curve", setup: this.setupCubic, draw: this.drawFlattened, onKeyDown: this.onKeyDown }),
	      React.createElement(
	        "p",
	        null,
	        "Try clicking on the sketch and using your up and down arrow keys to lower the number of segments for both the quadratic and cubic curve. You'll notice that for certain curvatures, a low number of segments works quite well, but for more complex curvatures (try this for the cubic curve), a higher number is required to capture the curvature changes properly."
	      ),
	      React.createElement(
	        "div",
	        { className: "howtocode" },
	        React.createElement(
	          "h3",
	          null,
	          "How to implement curve flattening"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Let's just use the algorithm we just specified, and implement that:"
	        ),
	        React.createElement(
	          "pre",
	          null,
	          "function flattenCurve(curve, segmentCount):",
	          '\n',
	          "  step = 1/segmentCount;",
	          '\n',
	          "  coordinates = [curve.getXValue(0), curve.getYValue(0)]",
	          '\n',
	          "  for(i=1; i <= segmentCount; i++):",
	          '\n',
	          "    t = i*step;",
	          '\n',
	          "    coordinates.push[curve.getXValue(t), curve.getYValue(t)]",
	          '\n',
	          "  return coordinates;"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "And done, that's the algorithm implemented. That just leaves drawing the resulting \"curve\" as a sequence of lines:"
	        ),
	        React.createElement(
	          "pre",
	          null,
	          "function drawFlattenedCurve(curve, segmentCount):",
	          '\n',
	          "  coordinates = flattenCurve(curve, segmentCount)",
	          '\n',
	          "  coord = coordinates[0], _coords;",
	          '\n',
	          "  for(i=1; i < coordinates.length; i++):",
	          '\n',
	          "    _coords = coordinates[i]",
	          '\n',
	          "    line(coords, _coords)",
	          '\n',
	          "    coords = _coords"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "We start with the first coordinate as reference point, and then just draw lines between each point and its next point."
	        )
	      )
	    );
	  }
	});

	module.exports = keyHandling(Flattening);

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var Splitting = React.createClass({
	  displayName: "Splitting",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Splitting curves"
	    };
	  },

	  setupCubic: function setupCubic(api) {
	    var curve = api.getDefaultCubic();
	    api.setCurve(curve);
	    api.forward = true;
	  },

	  drawSplit: function drawSplit(api, curve) {
	    api.setPanelCount(2);
	    api.reset();
	    api.drawSkeleton(curve);
	    api.drawCurve(curve);

	    var offset = { x: 0, y: 0 };
	    var t = 0.5;
	    var pt = curve.get(0.5);
	    var split = curve.split(t);
	    api.drawCurve(split.left);
	    api.drawCurve(split.right);
	    api.setColor("red");
	    api.drawCircle(pt, 3);

	    api.setColor("black");
	    offset.x = api.getPanelWidth();
	    api.drawLine({ x: 0, y: 0 }, { x: 0, y: api.getPanelHeight() }, offset);

	    api.setColor("lightgrey");
	    api.drawCurve(curve, offset);
	    api.drawCircle(pt, 4);

	    offset.x -= 20;
	    offset.y -= 20;
	    api.drawSkeleton(split.left, offset, true);
	    api.drawCurve(split.left, offset);

	    offset.x += 40;
	    offset.y += 40;
	    api.drawSkeleton(split.right, offset, true);
	    api.drawCurve(split.right, offset);
	  },

	  drawAnimated: function drawAnimated(api, curve) {
	    api.setPanelCount(3);
	    api.reset();

	    var frame = api.getFrame();
	    var interval = 5 * api.getPlayInterval();
	    var t = frame % interval / interval;
	    var forward = frame % (2 * interval) < interval;
	    if (forward) {
	      t = t % 1;
	    } else {
	      t = 1 - t % 1;
	    }
	    var offset = { x: 0, y: 0 };

	    api.setColor("lightblue");
	    api.drawHull(curve, t);
	    api.drawSkeleton(curve);
	    api.drawCurve(curve);
	    var pt = curve.get(t);
	    api.drawCircle(pt, 4);

	    api.setColor("black");
	    offset.x += api.getPanelWidth();
	    api.drawLine({ x: 0, y: 0 }, { x: 0, y: api.getPanelHeight() }, offset);

	    var split = curve.split(t);

	    api.setColor("lightgrey");
	    api.drawCurve(curve, offset);
	    api.drawHull(curve, t, offset);
	    api.setColor("black");
	    api.drawCurve(split.left, offset);
	    api.drawPoints(split.left.points, offset);
	    api.setFill("black");
	    api.text("Left side of curve split at t = " + (100 * t | 0) / 100, { x: 10 + offset.x, y: 15 + offset.y });

	    offset.x += api.getPanelWidth();
	    api.drawLine({ x: 0, y: 0 }, { x: 0, y: api.getPanelHeight() }, offset);

	    api.setColor("lightgrey");
	    api.drawCurve(curve, offset);
	    api.drawHull(curve, t, offset);
	    api.setColor("black");
	    api.drawCurve(split.right, offset);
	    api.drawPoints(split.right.points, offset);
	    api.setFill("black");
	    api.text("Right side of curve split at t = " + (100 * t | 0) / 100, { x: 10 + offset.x, y: 15 + offset.y });
	  },

	  togglePlay: function togglePlay(evt, api) {
	    if (api.playing) {
	      api.pause();
	    } else {
	      api.play();
	    }
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "With de Casteljau's algorithm we also find all the points we need to split up a Bézier curve into two, smaller curves, which taken together form the original curve. When we construct de Casteljau's skeleton for some value",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        ", the procedure gives us all the points we need to split a curve at that ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value: one curve is defined by all the inside skeleton points found prior to our on-curve point, with the other curve being defined by all the inside skeleton points after our on-curve point."
	      ),
	      React.createElement(Graphic, { title: "Splitting a curve", setup: this.setupCubic, draw: this.drawSplit }),
	      React.createElement(
	        "div",
	        { className: "howtocode" },
	        React.createElement(
	          "h3",
	          null,
	          "implementing curve splitting"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "We can implement curve splitting by bolting some extra logging onto the de Casteljau function:"
	        ),
	        React.createElement(
	          "pre",
	          null,
	          "left=[]",
	          '\n',
	          "right=[]",
	          '\n',
	          "function drawCurve(points[], t):",
	          '\n',
	          "  if(points.length==1):",
	          '\n',
	          "    left.add(points[0])",
	          '\n',
	          "    right.add(points[0])",
	          '\n',
	          "    draw(points[0])",
	          '\n',
	          "  else:",
	          '\n',
	          "    newpoints=array(points.size-1)",
	          '\n',
	          "    for(i=0; i<newpoints.length; i++):",
	          '\n',
	          "      if(i==0):",
	          '\n',
	          "        left.add(points[i])",
	          '\n',
	          "      if(i==newpoints.length-1):",
	          '\n',
	          "        right.add(points[i+1])",
	          '\n',
	          "      newpoints[i] = (1-t) * points[i] + t * points[i+1]",
	          '\n',
	          "    drawCurve(newpoints, t)"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "After running this function for some value ",
	          React.createElement(
	            "i",
	            null,
	            "t"
	          ),
	          ", the ",
	          React.createElement(
	            "i",
	            null,
	            "left"
	          ),
	          " and ",
	          React.createElement(
	            "i",
	            null,
	            "right"
	          ),
	          " arrays will contain all the coordinates for two new curves - one to the \"left\" of our ",
	          React.createElement(
	            "i",
	            null,
	            "t"
	          ),
	          " value, the other on the \"right\", of the same order as the original curve, and overlayed exactly on the original curve."
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "This is best illustrated with an animated graphic (click to play/pause):"
	      ),
	      React.createElement(Graphic, { preset: "threepanel", title: "Bézier curve splitting", setup: this.setupCubic, draw: this.drawAnimated, onClick: this.togglePlay })
	    );
	  }
	});

	module.exports = Splitting;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var SectionHeader = __webpack_require__(15);

	var MatrixSplit = React.createClass({
	  displayName: "MatrixSplit",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Splitting curves using matrices"
	    };
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "Another way to split curves is to exploit the matrix representation of a Bézier curve. In ",
	        React.createElement(
	          "a",
	          { href: "#matrix" },
	          "the section on matrices"
	        ),
	        " we saw that we can represent curves as matrix multiplications. Specifically, we saw these two forms for the quadratic, and cubic curves, respectively (using the reversed Bézier coefficients vector for legibility):"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/e56e78e406d625c2a5ec584216f79a5fee00d8ea.svg", style: { width: "19.65015rem", height: "3.97485rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "and"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/01ea4f74c4785a19bedf18034b51510c5ce2ad8f.svg", style: { width: "23.925150000000002rem", height: "5.47515rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Let's say we want to split the curve at some point ",
	        React.createElement(
	          "em",
	          null,
	          "t = z"
	        ),
	        ", forming two new (obviously smaller) Bézier curves. To find the coordinates for these two Bézier curves, we can use the matrix representation and some linear algebra. First, we split out the the actual \"point on the curve\" information as a new matrix multiplication:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/d6fa091a86782480968c232ef86513c578030004.svg", style: { width: "48.07485rem", height: "4.05rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "and"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/d487e1e0181420995be49b25bc6595c9d0360435.svg", style: { width: "60.82515rem", height: "5.54985rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "If we could compact these matrices back to a form ",
	        React.createElement(
	          "strong",
	          null,
	          "[t values] · [bezier matrix] · [column matrix]"
	        ),
	        ", with the first two staying the same, then that column matrix on the right would be the coordinates of a new Bézier curve that describes the first segment, from ",
	        React.createElement(
	          "em",
	          null,
	          "t = 0"
	        ),
	        " to ",
	        React.createElement(
	          "em",
	          null,
	          "t = z"
	        ),
	        ". As it turns out, we can do this quite easily, by exploiting some simple rules of linear algebra (and if you don't care about the derivations, just skip to the end of the box for the results!)."
	      ),
	      React.createElement(
	        "div",
	        { className: "note" },
	        React.createElement(
	          "h2",
	          null,
	          "Deriving new hull coordinates"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Deriving the two segments upon splitting a curve takes a few steps, and the higher the curve order, the more work it is, so let's look at the quadratic curve first:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/d4b8355c3f1f80aacfc2766423a30151c5180a02.svg", style: { width: "26.24985rem", height: "4.05rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/fe5f623585a9bbb836f54164aecaadd3fc4ec953.svg", style: { width: "17.62515rem", height: "3.97485rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/1eb9833685c9189c64d9cbdfdbb24a94e70e493f.svg", style: { width: "17.69985rem", height: "3.97485rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/bc85dbb857222546bd30ea559a452fe9f36c8090.svg", style: { width: "17.69985rem", height: "4.05rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "We do this, because [",
	          React.createElement(
	            "em",
	            null,
	            "M · M",
	            React.createElement(
	              "sup",
	              null,
	              "-1"
	            )
	          ),
	          "] is the identity matrix (a bit like multiplying something by x/x in calculus. It doesn't do anything to the function, but it does allow you to rewrite it to something that may be easier to work with, or can be broken up differently). Adding that as matrix multiplication has no effect on the total formula, but it does allow us to change the matrix sequence [",
	          React.createElement(
	            "em",
	            null,
	            "something · M"
	          ),
	          "] to a sequence [",
	          React.createElement(
	            "em",
	            null,
	            "M · something"
	          ),
	          "], and that makes a world of difference: if we know what [",
	          React.createElement(
	            "em",
	            null,
	            "M",
	            React.createElement(
	              "sup",
	              null,
	              "-1"
	            ),
	            " · Z · M"
	          ),
	          "] is, we can apply that to our coordinates, and be left with a proper matrix representation of a quadratic Bézier curve (which is [",
	          React.createElement(
	            "em",
	            null,
	            "T · M · P"
	          ),
	          "]), with a new set of coordinates that represent the curve from",
	          React.createElement(
	            "em",
	            null,
	            "t = 0"
	          ),
	          " to ",
	          React.createElement(
	            "em",
	            null,
	            "t = z"
	          ),
	          ". So let's get computing:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/1dbabc115128a85389cbbcc75fbced48e5a2ca25.svg", style: { width: "45.9rem", height: "4.35015rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Excellent! Now we can form our new quadratic curve:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/2972cd74dab6560ea68189c2e53f247287cbefae.svg", style: { width: "30.45015rem", height: "3.97485rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/39b64e07c41ef6d734064f017036f6391321e924.svg", style: { width: "35.17515rem", height: "4.1998500000000005rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/d615960f862664749c54858520c364efeb4a4c5a.svg", style: { width: "34.79985rem", height: "4.1998500000000005rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement(
	            "strong",
	            null,
	            React.createElement(
	              "em",
	              null,
	              "Brilliant"
	            )
	          ),
	          ": if we want a subcurve from ",
	          React.createElement(
	            "em",
	            null,
	            "t = 0"
	          ),
	          "to ",
	          React.createElement(
	            "em",
	            null,
	            "t = z"
	          ),
	          ", we can keep the first coordinate the same (which makes sense), our control point becomes a z-ratio mixture of the original control point and the start point, and the new end point is a mixture that looks oddly similar to a bernstein polynomial of degree two, except it uses (z-1) rather than (1-z)... These new coordinates are actually really easy to compute directly!"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Of course, that's only one of the two curves. Getting the section from ",
	          React.createElement(
	            "em",
	            null,
	            "t = z"
	          ),
	          "to ",
	          React.createElement(
	            "em",
	            null,
	            "t = 1"
	          ),
	          " requires doing this again. We first observe what what we just did is actually evaluate the general interval [0,",
	          React.createElement(
	            "em",
	            null,
	            "z"
	          ),
	          "], which we wrote down simplified becuase of that zero, but we actually evaluated this:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/a51e64df3cb31acf32d0ad5814c8c6cff41ae611.svg", style: { width: "27.45rem", height: "3.97485rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/0b50cdfed6656e681d5885a14a3af3e67efa4ccb.svg", style: { width: "23.99985rem", height: "4.05rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "If we want the interval [",
	          React.createElement(
	            "em",
	            null,
	            "z"
	          ),
	          ",1], we will be evaluating this instead:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/eca8cfda9b7a3f0819ec38acc53f95af67bb26bb.svg", style: { width: "32.625rem", height: "3.97485rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/e8c983a3efd47356c971fe46add4d0cdf103cced.svg", style: { width: "30.45015rem", height: "4.1998500000000005rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "We're going to do the same trick, to turn ",
	          React.createElement(
	            "em",
	            null,
	            "[something · M]"
	          ),
	          " into ",
	          React.createElement(
	            "em",
	            null,
	            "[M · something]"
	          ),
	          ":"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/a28b6dcc1335de19a065b6a04d8bb45d86122bb7.svg", style: { width: "52.72515rem", height: "4.35015rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "So, our final second curve looks like:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/5851c9191acb59456e3706a8f6f1a0f85e691eda.svg", style: { width: "30.74985rem", height: "3.97485rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/0333e63f50b3d43067dc299280f70e9eb98711bb.svg", style: { width: "34.875rem", height: "4.1998500000000005rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/00a133860115d7a4db4ddf62781b5ae2bffef088.svg", style: { width: "34.79985rem", height: "4.1998500000000005rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement(
	            "strong",
	            null,
	            React.createElement(
	              "em",
	              null,
	              "Nice"
	            )
	          ),
	          ": we see the same as before; can keep the last coordinate the same (which makes sense), our control point becomes a z-ratio mixture of the original control point and the end point, and the new start point is a mixture that looks oddly similar to a bernstein polynomial of degree two, except it uses (z-1) rather than (1-z). These new coordinates are ",
	          React.createElement(
	            "em",
	            null,
	            "also"
	          ),
	          "really easy to compute directly!"
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So, using linear algebra rather than de Casteljau's algorithm, we have determined that for any quadratic curve split at some value ",
	        React.createElement(
	          "em",
	          null,
	          "t = z"
	        ),
	        ", we get two subcurves that are described as Bézier curves with simple-to-derive coordinates."
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/5769f44aea3344c32c497a3a77d236f524222b95.svg", style: { width: "40.57515rem", height: "4.1998500000000005rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "and"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/1fdde935dc357642358bdf5e632d6539c9d4debd.svg", style: { width: "40.275rem", height: "4.1998500000000005rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We can do the same for cubic curves. However, I'll spare you the actual derivation (don't let that stop you from writing that out yourself, though) and simply show you the resulting new coordinate sets:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/44db09290062827525a9b23cbaf91e65063d86d7.svg", style: { width: "58.87485rem", height: "5.70015rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "and"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/d6b1abe72bac1b55d184f2c4254769404371d06f.svg", style: { width: "59.025150000000004rem", height: "5.70015rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So, looking at our matrices, did we really need to compute the second segment matrix? No, we didn't. Actually having one segment's matrix means we implicitly have the other: push the values of each row in the matrix ",
	        React.createElement(
	          "strong",
	          null,
	          React.createElement(
	            "em",
	            null,
	            "Q"
	          )
	        ),
	        " to the right, with zeroes getting pushed off the right edge and appearing back on the left, and then flip the matrix vertically. Presto, you just \"calculated\" ",
	        React.createElement(
	          "strong",
	          null,
	          React.createElement(
	            "em",
	            null,
	            "Q'"
	          )
	        ),
	        "."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Implementing curve splitting this way requires less recursion, and is just straight arithmetic with cached values, so can be cheaper on systems were recursion is expensive. If you're doing computation with devices that are good at matrix multiplication, chopping up a Bézier curve with this method will be a lot faster than applying de Casteljau."
	      )
	    );
	  }
	});

	module.exports = MatrixSplit;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);
	var keyHandling = __webpack_require__(18);

	var Reordering = React.createClass({
	  displayName: "Reordering",

	  statics: {
	    // Improve this based on http://www.sirver.net/blog/2011/08/23/degree-reduction-of-bezier-curves/
	    lower: function lower(curve) {
	      var pts = curve.points,
	          q = [],
	          n = pts.length;
	      pts.forEach(function (p, k) {
	        if (!k) {
	          return q[k] = p;
	        }
	        var f1 = k / n,
	            f2 = 1 - f1;
	        q[k] = {
	          x: f1 * p.x + f2 * pts[k - 1].x,
	          y: f1 * p.y + f2 * pts[k - 1].y
	        };
	      });
	      q.splice(n - 1, 1);
	      q[n - 2] = pts[n - 1];
	      curve.points = q;
	      return curve;
	    },

	    keyHandlingOptions: {
	      values: {
	        "38": function _(api) {
	          api.setCurve(api.curve.raise());
	        },
	        "40": function _(api) {
	          api.setCurve(Reordering.lower(api.curve));
	        }
	      }
	    }
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Lowering and elevating curve order"
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      order: 0
	    };
	  },

	  setup: function setup(api) {
	    var points = [];
	    var w = api.getPanelWidth(),
	        h = api.getPanelHeight();
	    for (var i = 0; i < 10; i++) {
	      points.push({
	        x: w / 2 + Math.random() * 20 + Math.cos(Math.PI * 2 * i / 10) * (w / 2 - 40),
	        y: h / 2 + Math.random() * 20 + Math.sin(Math.PI * 2 * i / 10) * (h / 2 - 40)
	      });
	    }
	    var curve = new api.Bezier(points);
	    api.setCurve(curve);
	  },

	  draw: function draw(api, curve) {
	    api.reset();
	    var pts = curve.points;

	    this.setState({
	      order: pts.length
	    });

	    var p0 = pts[0];

	    // we can't "just draw" this curve, since it'll be an arbitrary order,
	    // And the canvas only does 2nd and 3rd - we use de Casteljau's algorithm:
	    for (var t = 0; t <= 1; t += 0.01) {
	      var q = JSON.parse(JSON.stringify(pts));
	      while (q.length > 1) {
	        for (var i = 0; i < q.length - 1; i++) {
	          q[i] = {
	            x: q[i].x + (q[i + 1].x - q[i].x) * t,
	            y: q[i].y + (q[i + 1].y - q[i].y) * t
	          };
	        }
	        q.splice(q.length - 1, 1);
	      }
	      api.drawLine(p0, q[0]);
	      p0 = q[0];
	    }

	    p0 = pts[0];
	    api.setColor("black");
	    api.drawCircle(p0, 3);
	    pts.forEach(function (p) {
	      if (p === p0) return;
	      api.setColor("#DDD");
	      api.drawLine(p0, p);
	      api.setColor("black");
	      api.drawCircle(p, 3);
	      p0 = p;
	    });
	  },

	  getOrder: function getOrder() {
	    var order = this.state.order;
	    if (order % 10 === 1 && order !== 11) {
	      order += "st";
	    } else if (order % 10 === 2 && order !== 12) {
	      order += "nd";
	    } else if (order % 10 === 3 && order !== 13) {
	      order += "rd";
	    } else {
	      order += "th";
	    }
	    return order;
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "One interesting property of Bézier curves is that an ",
	        React.createElement(
	          "i",
	          null,
	          "n",
	          React.createElement(
	            "sup",
	            null,
	            "th"
	          )
	        ),
	        " order curve can always be perfectly represented by an ",
	        React.createElement(
	          "i",
	          null,
	          "(n+1)",
	          React.createElement(
	            "sup",
	            null,
	            "th"
	          )
	        ),
	        " order curve, by giving the higher order curve specific control points."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "If we have a curve with three points, then we can create a four point curve that exactly reproduce the original curve as long as we give it the same start and end points, and for its two control points we pick \"1/3",
	        React.createElement(
	          "sup",
	          null,
	          "rd"
	        ),
	        " start + 2/3",
	        React.createElement(
	          "sup",
	          null,
	          "rd"
	        ),
	        " control\" and \"2/3",
	        React.createElement(
	          "sup",
	          null,
	          "rd"
	        ),
	        " control + 1/3",
	        React.createElement(
	          "sup",
	          null,
	          "rd"
	        ),
	        " end\", and now we have exactly the same curve as before, except represented as a cubic curve, rather than a quadratic curve."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The general rule for raising an ",
	        React.createElement(
	          "i",
	          null,
	          "n",
	          React.createElement(
	            "sup",
	            null,
	            "th"
	          )
	        ),
	        " order curve to an ",
	        React.createElement(
	          "i",
	          null,
	          "(n+1)",
	          React.createElement(
	            "sup",
	            null,
	            "th"
	          )
	        ),
	        "order curve is as follows (observing that the start and end weights are the same as the start and end weights for the old curve):"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/15574d1e7629e5900fdfdd67ff9b82d761910368.svg", style: { width: "41.025150000000004rem", height: "4.42485rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "However, this rule also has as direct consequence that you ",
	        React.createElement(
	          "strong",
	          null,
	          "cannot"
	        ),
	        " generally safely lower a curve from ",
	        React.createElement(
	          "i",
	          null,
	          "n",
	          React.createElement(
	            "sup",
	            null,
	            "th"
	          )
	        ),
	        " order to ",
	        React.createElement(
	          "i",
	          null,
	          "(n-1)",
	          React.createElement(
	            "sup",
	            null,
	            "th"
	          )
	        ),
	        " order, because the control points cannot be \"pulled apart\" cleanly. We can try to, but the resulting curve will not be identical to the original, and may in fact look completely different."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We can apply this to a (semi) random curve, as is done in the following graphic. Select the sketch and press your up and down arrow keys to elevate or lower the curve order."
	      ),
	      React.createElement(Graphic, { preset: "simple", title: "A " + this.getOrder() + " order Bézier curve", setup: this.setup, draw: this.draw, onKeyDown: this.props.onKeyDown }),
	      React.createElement(
	        "p",
	        null,
	        "There is a good, if mathematical, explanation on the matrices necessary for optimal reduction over on ",
	        React.createElement(
	          "a",
	          { href: "http://www.sirver.net/blog/2011/08/23/degree-reduction-of-bezier-curves/" },
	          "Sirver's Castle"
	        ),
	        ", which given time will find its way in a more direct description into this article."
	      )
	    );
	  }
	});

	module.exports = keyHandling(Reordering);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var SectionHeader = __webpack_require__(15);

	var Derivatives = React.createClass({
	  displayName: "Derivatives",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Derivatives"
	    };
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "There's a number of useful things that you can do with Bézier curves based on their derivative, and one of the more amusing observations about Bézier curves is that their derivatives are, in fact, also Bézier curves. In fact, the derivation of a Bézier curve is relatively straight forward, although we do need a bit of math. First, let's look at the derivative rule for Bézier curves, which is:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/ff6d9fc6f1697ca0b1e599a4e8ce43f9bd1f17da.svg", style: { width: "23.09985rem", height: "3.15rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "which we can also write (observing that ",
	        React.createElement(
	          "i",
	          null,
	          "b"
	        ),
	        " in this formula is the same as our ",
	        React.createElement(
	          "i",
	          null,
	          "w"
	        ),
	        " weights, and that ",
	        React.createElement(
	          "i",
	          null,
	          "n"
	        ),
	        " times a summation is the same as a summation where each term is multiplied by ",
	        React.createElement(
	          "i",
	          null,
	          "n"
	        ),
	        ") as:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/3437e732e8a61ec6badcfe292b6258f6ea6535c9.svg", style: { width: "23.85rem", height: "3.15rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Or, in plain text: the derivative of an n",
	        React.createElement(
	          "sup",
	          null,
	          "th"
	        ),
	        " degree Bézier curve is an (n-1)",
	        React.createElement(
	          "sup",
	          null,
	          "th"
	        ),
	        "degree Bézier curve, with one fewer term, and new weights w'",
	        React.createElement(
	          "sub",
	          null,
	          "0"
	        ),
	        "...w'",
	        React.createElement(
	          "sub",
	          null,
	          "n-1"
	        ),
	        " derived from the original weights as n(w",
	        React.createElement(
	          "sub",
	          null,
	          "i+1"
	        ),
	        " - w",
	        React.createElement(
	          "sub",
	          null,
	          "i"
	        ),
	        "), so for a 3rd degree curve, with four weights, the derivative has three new weights w'",
	        React.createElement(
	          "sub",
	          null,
	          "0"
	        ),
	        " = 3(w",
	        React.createElement(
	          "sub",
	          null,
	          "1"
	        ),
	        "-w",
	        React.createElement(
	          "sub",
	          null,
	          "0"
	        ),
	        "), w'",
	        React.createElement(
	          "sub",
	          null,
	          "1"
	        ),
	        " = 3(w",
	        React.createElement(
	          "sub",
	          null,
	          "2"
	        ),
	        "-w",
	        React.createElement(
	          "sub",
	          null,
	          "1"
	        ),
	        ") and w'",
	        React.createElement(
	          "sub",
	          null,
	          "2"
	        ),
	        " = 3(w",
	        React.createElement(
	          "sub",
	          null,
	          "3"
	        ),
	        "-w",
	        React.createElement(
	          "sub",
	          null,
	          "2"
	        ),
	        ")."
	      ),
	      React.createElement(
	        "div",
	        { className: "note" },
	        React.createElement(
	          "h3",
	          null,
	          "\"Slow down, why is that true?\""
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Sometimes just being told \"this is the derivative\" is nice, but you might want to see why this is indeed the case. As such, let's have a look at the proof for this derivative. First off, the weights are independent of the full Bézier function, so the derivative involves only the derivative of the polynomial basis function. So, let's find that:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/1f8148ecaac6af494a8bb96d2f96f7a96f85d9e0.svg", style: { width: "14.625rem", height: "2.32515rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Applying the ",
	          React.createElement(
	            "a",
	            { href: "http://en.wikipedia.org/wiki/Product_rule" },
	            "product"
	          ),
	          " and",
	          React.createElement(
	            "a",
	            { href: "http://en.wikipedia.org/wiki/Chain_rule" },
	            "chain"
	          ),
	          " rules gives us:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/02ecde09cea052e99e92b062e70cd724467f0e38.svg", style: { width: "28.425150000000002rem", height: "1.27485rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Which is hard to work with, so let's expand that properly:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/c67d5c6165c04b4bba3e9c8f7b8362300153d00d.svg", style: { width: "24.075rem", height: "1.94985rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Now, the trick is to turn this expression into something that has binomial coefficients again, so we want to end up with things that look like \"x! over y!(x-y)!\". If we can do that in a way that involves terms of ",
	          React.createElement(
	            "i",
	            null,
	            "n-1"
	          ),
	          " and ",
	          React.createElement(
	            "i",
	            null,
	            "k-1"
	          ),
	          ", we'll be on the right track."
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/cf675f8434c96397a548f91aae8150d99d8587a2.svg", style: { width: "36.525150000000004rem", height: "6.60015rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "And that's the first part done: the two components inside the parentheses are actually regular, lower order Bezier expressions:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/33bbfd279ee71b319a9a93598607c687b00636af.svg", style: { width: "37.42515rem", height: "3.6rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Now to apply this to our weighted Bezier curves. We'll write out the plain curve formula that we saw earlier, and then work our way through to its derivative:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/88bc44a562fcdfb6b263970c252d149d7b473a39.svg", style: { width: "36.14985rem", height: "9.225rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "If we expand this (with some color to show how terms line up), and reorder the terms by increasing values for ",
	          React.createElement(
	            "i",
	            null,
	            "k"
	          ),
	          "we see the following:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/833a6e9be84cd27fdaff1a7a3757411f8a356c95.svg", style: { width: "20.62485rem", height: "8.850150000000001rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Two of these terms fall way: the first term falls away because there is no -1",
	          React.createElement(
	            "sup",
	            null,
	            "st"
	          ),
	          " term in a summation. As such, it always contributes \"nothing\", so we can safely completely ignore it for the purpose of finding the derivative function. The other term is the very last term in this expansion: one involving ",
	          React.createElement(
	            "i",
	            null,
	            "B",
	            React.createElement(
	              "sub",
	              null,
	              "n-1,n"
	            )
	          ),
	          ". This term would have a binomial coefficient of [",
	          React.createElement(
	            "i",
	            null,
	            "i"
	          ),
	          " choose ",
	          React.createElement(
	            "i",
	            null,
	            "i+1"
	          ),
	          "], which is a non-existent binomial coefficient. Again, this term would contribute \"nothing\", so we can ignore it, too. This means we're left with:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/eac65797eafbe2732babcfc335733cbdf363693a.svg", style: { width: "20.39985rem", height: "5.77485rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "And that's just a summation of lower order curves:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/7cfbe72b898fcbf054564e8b0813acb0e5d7c26d.svg", style: { width: "48.15rem", height: "2.25rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "We can rewrite this as a normal summation, and we're done:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/418b48749012978b0f3e58cbb56c1049b977270e.svg", style: { width: "36.525150000000004rem", height: "3.67515rem" } })
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Let's rewrite that in a form similar to our original formula, so we can see the difference. We will first list our original formula for Bézier curves, and then the derivative:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/b98618f8061e9e58289abccc06a624a14561d40f.svg", style: { width: "23.70015rem", height: "3.90015rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/52947a49ac9e3a189ed56b89a018eff6288435f5.svg", style: { width: "36.45rem", height: "4.05rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "What are the differences? In terms of the actual Bézier curve, virtually nothing! We lowered the order (rather than ",
	        React.createElement(
	          "i",
	          null,
	          "n"
	        ),
	        ", it's now ",
	        React.createElement(
	          "i",
	          null,
	          "n-1"
	        ),
	        "), but it's still the same Bézier function. The only real difference is in how the weights change when we derive the curve's function. If we have four points A, B, C, and D, then the derivative will have three points, the second derivative two, and the third derivative one:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/6df1b35ac11dc089a02db4f6d04bc3fa17f03e39.svg", style: { width: "37.125rem", height: "5.99985rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We can keep performing this trick for as long as we have more than one weight. Once we have one weight left, the next step will see ",
	        React.createElement(
	          "i",
	          null,
	          "k = 0"
	        ),
	        ", and the result of our \"Bézier function\" summation is zero, because we're not adding anything at all. As such, a quadratic curve has no second derivative, a cubic curve has no third derivative, and generalized: an ",
	        React.createElement(
	          "i",
	          null,
	          "n",
	          React.createElement(
	            "sup",
	            null,
	            "th"
	          )
	        ),
	        " order curve has ",
	        React.createElement(
	          "i",
	          null,
	          "n-1"
	        ),
	        " (meaningful) derivatives, with any further derivative being zero."
	      )
	    );
	  }
	});

	module.exports = Derivatives;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var PointVectors = React.createClass({
	  displayName: "PointVectors",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Tangents and normals"
	    };
	  },

	  setupQuadratic: function setupQuadratic(api) {
	    var curve = api.getDefaultQuadratic();
	    api.setCurve(curve);
	  },

	  setupCubic: function setupCubic(api) {
	    var curve = api.getDefaultCubic();
	    api.setCurve(curve);
	  },

	  draw: function draw(api, curve) {
	    api.reset();
	    api.drawSkeleton(curve);

	    var i,
	        t,
	        p,
	        tg,
	        n,
	        m,
	        nd = 20;
	    for (i = 0; i <= 10; i++) {
	      t = i / 10.0;
	      p = curve.get(t);
	      tg = curve.derivative(t);
	      m = Math.sqrt(tg.x * tg.x + tg.y * tg.y);
	      tg = { x: tg.x / m, y: tg.y / m };
	      n = curve.normal(t);
	      api.setColor("blue");
	      api.drawLine(p, { x: p.x + tg.x * nd, y: p.y + tg.y * nd });
	      api.setColor("red");
	      api.drawLine(p, { x: p.x + n.x * nd, y: p.y + n.y * nd });
	      api.setColor("black");
	      api.drawCircle(p, 3);
	    }
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "If you want to move objects along a curve, or \"away from\" a curve, the two vectors you're most interested in are the tangent vector and normal vector for curve points. These are actually really easy to find. For moving, and orienting, along a curve we use the tangent, which indicates the direction travel at specific points, and is literally just the first derivative of our curve:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/2271ae26977a681a1695d14ea8255564e716916e.svg", style: { width: "10.35rem", height: "2.77515rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "This gives us the directional vector we want. We can normalize it to give us uniform directional vectors (having a length of 1.0) at each point, and then do whatever it is we want to do based on those directions:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/3cb2c4f5806142e83c66e1312520d0783d15201c.svg", style: { width: "17.62515rem", height: "2.025rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/72826b8f5053c299dbb2082678191e3564bb50a6.svg", style: { width: "20.62485rem", height: "4.7250000000000005rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The tangent is very useful for moving along a line, but what if we want to move away from the curve instead, perpendicular to the curve at some point ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        "? In that case we want the \"normal\" vector. This vector runs at a right angle to the direction of the curve, and is typically of length 1.0, so all we have to do is rotate the normalized directional vector and we're done:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/6cb29c325e059e236343bdd448c149ecc6d8795f.svg", style: { width: "22.800150000000002rem", height: "4.57515rem" } })
	      ),
	      React.createElement(
	        "div",
	        { className: "note" },
	        React.createElement(
	          "p",
	          null,
	          "Rotating coordinates is actually very easy, if you know the rule for it. You might find it explained as \"applying a ",
	          React.createElement(
	            "a",
	            { href: "https://en.wikipedia.org/wiki/Rotation_matrix" },
	            "rotation matrix"
	          ),
	          "\", which is what we'll look at here, too. Essentially, the idea is to take the circles over which we can rotate, and simply \"sliding the coordinates\" over those circles by the desired angle. If we want a quarter circle turn, we take the coordinate, slide it along the cirle by a quarter turn, and done."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "To turn any point ",
	          React.createElement(
	            "i",
	            null,
	            "(x,y)"
	          ),
	          " into a rotated point ",
	          React.createElement(
	            "i",
	            null,
	            "(x',y')"
	          ),
	          " (over 0,0) by some angle φ, we apply this nicely easy computation:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/d3932ac925ad9f238029d888dc5432f6678f6491.svg", style: { width: "12.225150000000001rem", height: "2.84985rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Which is the \"long\" version of the following matrix transformation:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/7297632eb150a8f5f37178612f71e5d0f2c367b1.svg", style: { width: "15.150150000000002rem", height: "2.77515rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "And that's all we need to rotate any coordinate. Note that for quarter, half and three quarter turns these functions become even easier, since ",
	          React.createElement(
	            "i",
	            null,
	            "sin"
	          ),
	          " and",
	          React.createElement(
	            "i",
	            null,
	            "cos"
	          ),
	          " for these angles are, respectively: 0 and 1, -1 and 0, and 0 and -1."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "But ",
	          React.createElement(
	            "strong",
	            null,
	            React.createElement(
	              "em",
	              null,
	              "why"
	            )
	          ),
	          " does this work? Why this matrix multiplication?",
	          React.createElement(
	            "a",
	            { href: "http://en.wikipedia.org/wiki/Rotation_matrix#Decomposition_into_shears" },
	            "wikipedia"
	          ),
	          "(Technically, Thomas Herter and Klaus Lott) tells us that a rotation matrix can be treated as a sequence of three (elementary) shear operations. When we combine this into a single matrix operation (because all matrix multiplications can be collapsed), we get the matrix that you see above.",
	          React.createElement(
	            "a",
	            { href: "http://datagenetics.com/blog/august32013/index.html" },
	            "DataGenetics"
	          ),
	          " have an excellent article about this very thing: it's really quite cool, and I strongly recommend taking a quick break from this primer to read that article."
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The following two graphics show the tangent and normal along a quadratic and cubic curve, with the direction vector coloured blue, and the normal vector coloured red (the markers are spaced out evenly as ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        "-intervals, not spaced equidistant)."
	      ),
	      React.createElement(
	        "div",
	        { className: "figure" },
	        React.createElement(Graphic, { preset: "simple", title: "Quadratic Bézier tangents and normals", inline: true, setup: this.setupQuadratic, draw: this.draw }),
	        React.createElement(Graphic, { preset: "simple", title: "Cubic Bézier tangents and normals", inline: true, setup: this.setupCubic, draw: this.draw })
	      )
	    );
	  }
	});

	module.exports = PointVectors;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var Components = React.createClass({
	  displayName: "Components",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Component functions"
	    };
	  },

	  setupQuadratic: function setupQuadratic(api) {
	    var curve = api.getDefaultQuadratic();
	    curve.points[2].x = 210;
	    api.setCurve(curve);
	  },

	  setupCubic: function setupCubic(api) {
	    var curve = api.getDefaultCubic();
	    api.setCurve(curve);
	  },

	  draw: function draw(api, curve) {
	    api.setPanelCount(3);
	    api.reset();
	    api.drawSkeleton(curve);
	    api.drawCurve(curve);

	    var tf = curve.order + 1,
	        pad = 20,
	        pts = curve.points,
	        w = api.getPanelWidth(),
	        h = api.getPanelHeight(),
	        offset = { x: w, y: 0 };

	    var x_pts = JSON.parse(JSON.stringify(pts)).map(function (p, t) {
	      return { x: w * t / tf, y: p.x };
	    });
	    api.drawLine({ x: 0, y: 0 }, { x: 0, y: h }, offset);
	    api.drawAxes(pad, "t", 0, 1, "x", 0, w, offset);
	    offset.x += pad;
	    api.drawCurve(new api.Bezier(x_pts), offset);

	    offset.x += w - pad;
	    var y_pts = JSON.parse(JSON.stringify(pts)).map(function (p, t) {
	      return { x: w * t / tf, y: p.y };
	    });
	    api.drawLine({ x: 0, y: 0 }, { x: 0, y: h }, offset);
	    api.drawAxes(pad, "t", 0, 1, "y", 0, w, offset);
	    offset.x += pad;
	    api.drawCurve(new api.Bezier(y_pts), offset);
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "One of the first things people run into when they start using Bézier curves in their own programs is \"I know how to draw the curve, but how do I determine the bounding box?\". It's actually reasonably straight forward to do so, but it requires having some knowledge on exploiting math to get the values we need. For bounding boxes, we aren't actually interested in the curve itself, but only in its \"extremities\": the minimum and maximum values the curve has for its x- and y-axis values. If you remember your calculus (provided you ever took calculus, otherwise it's going to be hard to remember) we can determine function extremities using the first derivative of that function, but this poses a problem, since our function is parametric: every axis has its own function."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The solution: compute the derivative for each axis separately, and then fit them back together in the same way we do for the original."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Let's look at how a parametric Bézier curve \"splits up\" into two normal functions, one for the x-axis and one for the y-axis. Note the left-most figure is again an interactive curve, without labeled axes (you get coordinates in the graph instead).  The center and right-most figures are the component functions for computing the x-axis value, given a value for ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " (between 0 and 1 inclusive), and the y-axis value, respectively."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "If you move points in a curve sideways, you should only see the middle graph change; likely, moving points vertically should only show a change in the right graph."
	      ),
	      React.createElement(Graphic, { preset: "simple", title: "Quadratic Bézier curve components", setup: this.setupQuadratic, draw: this.draw }),
	      React.createElement(Graphic, { preset: "simple", title: "Cubic Bézier curve components", setup: this.setupCubic, draw: this.draw })
	    );
	  }
	});

	module.exports = Components;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var Extremities = React.createClass({
	  displayName: "Extremities",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Finding extremities: root finding"
	    };
	  },

	  setupQuadratic: function setupQuadratic(api) {
	    var curve = api.getDefaultQuadratic();
	    curve.points[2].x = 210;
	    api.setCurve(curve);
	  },

	  setupCubic: function setupCubic(api) {
	    var curve = api.getDefaultCubic();
	    api.setCurve(curve);
	  },

	  draw: function draw(api, curve) {
	    api.setPanelCount(3);
	    api.reset();
	    api.drawSkeleton(curve);
	    api.drawCurve(curve);

	    var tf = curve.order + 1,
	        pad = 20,
	        pts = curve.points,
	        w = api.getPanelWidth(),
	        h = api.getPanelHeight(),
	        offset = { x: w, y: 0 };

	    var x_pts = JSON.parse(JSON.stringify(pts)).map(function (p, t) {
	      return { x: w * t / tf, y: p.x };
	    });
	    api.setColor("black");
	    api.drawLine({ x: 0, y: 0 }, { x: 0, y: h }, offset);
	    api.drawAxes(pad, "t", 0, 1, "x", 0, w, offset);
	    offset.x += pad;
	    var xcurve = new api.Bezier(x_pts);
	    api.drawCurve(xcurve, offset);
	    api.setColor("red");
	    xcurve.inflections().y.forEach(function (t) {
	      var p = xcurve.get(t);
	      api.drawCircle(p, 3, offset);
	    });

	    offset.x += w - pad;
	    var y_pts = JSON.parse(JSON.stringify(pts)).map(function (p, t) {
	      return { x: w * t / tf, y: p.y };
	    });
	    api.setColor("black");
	    api.drawLine({ x: 0, y: 0 }, { x: 0, y: h }, offset);
	    api.drawAxes(pad, "t", 0, 1, "y", 0, w, offset);
	    offset.x += pad;
	    var ycurve = new api.Bezier(y_pts);
	    api.drawCurve(ycurve, offset);
	    api.setColor("red");
	    ycurve.inflections().y.forEach(function (t) {
	      var p = ycurve.get(t);
	      api.drawCircle(p, 3, offset);
	    });
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "Now that we understand (well, superficially anyway) the component functions, we can find the extremities of our Bézier curve by finding maxima and minima on the component functions, by solving the equations B'(t) = 0 and B''(t) = 0. Although, in the case of quadratic curves there is no B''(t), so we only need to compute B'(t) = 0. So, how do we compute the first and second derivatives? Fairly easily, actually, until our derivatives are 4th order or higher... then things get really hard. But let's start simple:"
	      ),
	      React.createElement(
	        "h3",
	        null,
	        "Quadratic curves: linear derivatives."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Finding the solution for \"where is this line 0\" should be trivial:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/9929fd19d54366db382b7d453491d90f894352a7.svg", style: { width: "9.450000000000001rem", height: "6.37515rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Done. And quadratic curves have no meaningful second derivative, so we're ",
	        React.createElement(
	          "em",
	          null,
	          "really"
	        ),
	        " done."
	      ),
	      React.createElement(
	        "h3",
	        null,
	        "Cubic curves: the quadratic formula."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The derivative of a cubic curve is a quadratic curve, and finding the roots for a quadratic Bézier curve means we can apply the ",
	        React.createElement(
	          "a",
	          { href: "https://en.wikipedia.org/wiki/Quadratic_formula" },
	          "Quadratic formulat"
	        ),
	        ". If you've seen it before, you'll remember it, and if you haven't, it looks like this:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/d5882cc83b002196c8e701ad273ced103e2b4484.svg", style: { width: "28.72485rem", height: "2.475rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So, if we can express a Bézier component function as a plain polynomial, we're done: we just plug in the values into the quadratic formula, check if that square root is negative or not (if it is, there are no roots) and then just compute the two values that come out (because of that plus/minus sign we get two). Any value between 0 and 1 is a root that matters for Bézier curves, anything below or above that is irrelevant (because Bézier curves are only defined over the interval [0,1]). So, how do we convert?"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "First we turn our cubic Bézier function into a quadratic one, by following the rule mentioned at the end of the ",
	        React.createElement(
	          "a",
	          { href: "#derivatives" },
	          "derivatives section"
	        ),
	        ":"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/d904e86a3967e7e5bdba8a5f6b943a8fde3ad458.svg", style: { width: "45rem", height: "2.77515rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "And then, using these ",
	        React.createElement(
	          "em",
	          null,
	          "v"
	        ),
	        " values, we can find out what our ",
	        React.createElement(
	          "em",
	          null,
	          "a"
	        ),
	        ", ",
	        React.createElement(
	          "em",
	          null,
	          "b"
	        ),
	        ", and ",
	        React.createElement(
	          "em",
	          null,
	          "c"
	        ),
	        " should be:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/c638a85a950ffb535fbf2056958bed5f44be5067.svg", style: { width: "21.375rem", height: "7.2rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So we can find the roots by using:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/076b74a0f2bcb43a3b2d39fdc52c58c6f89ce33a.svg", style: { width: "20.84985rem", height: "3.97485rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Easy peasy. We also note that the second derivative of a cubic curve means computing the first derivative of a quadratic curve, and we just saw how to do that in the section above."
	      ),
	      React.createElement(
	        "h3",
	        null,
	        "Quartic curves: Cardano's algorithm."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Quartic—fourth degree—curves have a cubic function as derivative. Now, cubic functions are a bit of a problem because they're really hard to solve. But, way back in the 16",
	        React.createElement(
	          "sup",
	          null,
	          "th"
	        ),
	        " century, ",
	        React.createElement(
	          "a",
	          { href: "https://en.wikipedia.org/wiki/Gerolamo_Cardano" },
	          "Gerolamo Cardano"
	        ),
	        " figured out that even if the general cubic function is really hard to solve, it can be rewritten to a form for which finding the roots is \"easy\", and then the only hard part is figuring out how to go from that form to the generic form. So:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/a16a0da87e138b1307973397275c296eb475b1b1.svg", style: { width: "45rem", height: "2.77515rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "This is easier because for the \"easier formula\" we can use ",
	        React.createElement(
	          "a",
	          { href: "http://www.wolframalpha.com/input/?i=t^3+%2B+pt+%2B+q" },
	          "regular calculus"
	        ),
	        " to find the roots (as a cubic function, however, it can have up to three roots, but two of those can be complex. For the purpose of Bézier curve extremities, we can completely ignore those complex roots, since our ",
	        React.createElement(
	          "em",
	          null,
	          "t"
	        ),
	        " is a plain real number from 0 to 1)."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So, the trick is to figure out how to turn the first formula into the second formula, and to then work out the maths that gives us the roots. This is explained in detail over at ",
	        React.createElement(
	          "a",
	          { href: "http://www.trans4mind.com/personal_development/mathematics/polynomials/cubicAlgebra.htm" },
	          "Ken J. Ward's page"
	        ),
	        " for solving the cubic equation, so instead of showing the maths, I'm simply going to show the programming code for solving the cubic equation, with the complex roots getting totally ignored."
	      ),
	      React.createElement(
	        "div",
	        { className: "howtocode" },
	        React.createElement(
	          "h3",
	          null,
	          "Implementing Cardano's algorithm for finding all real roots"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "The \"real roots\" part is fairly important, because while you cannot take a square, cube, etc. root of a negative number in the \"real\" number space (denoted with ℝ), this is perfectly fine in the ",
	          React.createElement(
	            "a",
	            {
	              href: "https://en.wikipedia.org/wiki/Complex_number" },
	            "\"complex\" number"
	          ),
	          " space (denoted with ℂ). And, as it so happens, Cardano is also attributed as the first mathematician in history to have made use of complex numbers in his calculations. For this very algorithm!"
	        ),
	        React.createElement(
	          "pre",
	          null,
	          "// A helper function to filter for values in the [0,1] interval:",
	          '\n',
	          "function accept(t) ",
	          '{',
	          '\n',
	          "  return 0<=t && t <=1;",
	          '\n',
	          '}',
	          '\n',
	          '\n',
	          "// A real-cuberoots-only function:",
	          '\n',
	          "function crt(v) ",
	          '{',
	          '\n',
	          "  if(v<0) return -Math.pow(-v,1/3);",
	          '\n',
	          "  return Math.pow(v,1/3);",
	          '\n',
	          '}',
	          '\n',
	          '\n',
	          "// Now then: given cubic coordinates ",
	          '{',
	          "pa, pb, pc, pd",
	          '}',
	          " find all roots.",
	          '\n',
	          "function getCubicRoots(pa, pb, pc, pd) ",
	          '{',
	          '\n',
	          "  var d = (-pa + 3*pb - 3*pc + pd),",
	          '\n',
	          "      a = (3*pa - 6*pb + 3*pc) / d,",
	          '\n',
	          "      b = (-3*pa + 3*pb) / d,",
	          '\n',
	          "      c = pa / d;",
	          '\n',
	          '\n',
	          "  var p = (3*b - a*a)/3,",
	          '\n',
	          "      p3 = p/3,",
	          '\n',
	          "      q = (2*a*a*a - 9*a*b + 27*c)/27,",
	          '\n',
	          "      q2 = q/2,",
	          '\n',
	          "      discriminant = q2*q2 + p3*p3*p3;",
	          '\n',
	          '\n',
	          "  // and some variables we're going to use later on:",
	          '\n',
	          "  var u1,v1,root1,root2,root3;",
	          '\n',
	          '\n',
	          "  // three possible real roots:",
	          '\n',
	          "  if (discriminant < 0) ",
	          '{',
	          '\n',
	          "    var mp3  = -p/3,",
	          '\n',
	          "        mp33 = mp3*mp3*mp3,",
	          '\n',
	          "        r    = sqrt( mp33 ),",
	          '\n',
	          "        t    = -q / (2*r),",
	          '\n',
	          "        cosphi = t<-1 ? -1 : t>1 ? 1 : t,",
	          '\n',
	          "        phi  = acos(cosphi),",
	          '\n',
	          "        crtr = cuberoot(r),",
	          '\n',
	          "        t1   = 2*crtr;",
	          '\n',
	          "    root1 = t1 * cos(phi/3) - a/3;",
	          '\n',
	          "    root2 = t1 * cos((phi+2*pi)/3) - a/3;",
	          '\n',
	          "    root3 = t1 * cos((phi+4*pi)/3) - a/3;",
	          '\n',
	          "    return [root1, root2, root3].filter(accept);",
	          '\n',
	          "  ",
	          '}',
	          '\n',
	          '\n',
	          "  // three real roots, but two of them are equal:",
	          '\n',
	          "  else if(discriminant === 0) ",
	          '{',
	          '\n',
	          "    u1 = q2 < 0 ? cuberoot(-q2) : -cuberoot(q2);",
	          '\n',
	          "    root1 = 2*u1 - a/3;",
	          '\n',
	          "    root2 = -u1 - a/3;",
	          '\n',
	          "    return [root1, root2].filter(accept);",
	          '\n',
	          "  ",
	          '}',
	          '\n',
	          '\n',
	          "  // one real root, two complex roots",
	          '\n',
	          "  else ",
	          '{',
	          '\n',
	          "    var sd = sqrt(discriminant);",
	          '\n',
	          "    u1 = cuberoot(sd - q2);",
	          '\n',
	          "    v1 = cuberoot(sd + q2);",
	          '\n',
	          "    root1 = u1 - v1 - a/3;",
	          '\n',
	          "    return [root1].filter(accept);",
	          '\n',
	          "  ",
	          '}',
	          '\n',
	          '}'
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "And that's it. The maths is complicated, but the code is pretty much just \"follow the maths, while caching as many values as we can to reduce recomputing things as much as possible\" and now we have a way to find all roots for a cubic function and can just move on with using that to find extremities of our curves."
	      ),
	      React.createElement(
	        "h3",
	        null,
	        "Quintic and higher order curves: finding numerical solutions"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The problem with this is that as the order of the curve goes up, we can't actually solve those equations the normal way. We can't take the function, and then work out what the solutions are. Not to mention that even solving a third order derivative (for a fourth order curve) is already a royal pain in the backside. We need a better solution. We need numerical approaches."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "That's a fancy word for saying \"rather than solve the function, treat the problem as a sequence of identical operations, the performing of which gets us closer and closer to the real answer\". As it turns out, there is a really nice numerical root finding algorithm, called the ",
	        React.createElement(
	          "a",
	          { href: "http://en.wikipedia.org/wiki/Newton-Raphson" },
	          "Newton-Raphson"
	        ),
	        " root finding method (yes, after ",
	        React.createElement(
	          "em",
	          null,
	          React.createElement(
	            "a",
	            { href: "https://en.wikipedia.org/wiki/Isaac_Newton" },
	            "that"
	          )
	        ),
	        " Newton), which we can make use of."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The Newton-Raphson approach consists of picking a value ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " (any will do), and getting the corresponding value at that ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value. For normal functions, we can treat that value as a height. If the height is zero, we're done, we have found a root. If it's not, we take the tangent of the curve at that point, and extend it until it passes the x-axis, which will be at some new point ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        ". We then repeat the procedure with this new value, and we keep doing this until we find our root."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Mathematically, this means that for some ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        ", at step ",
	        React.createElement(
	          "i",
	          null,
	          "n=1"
	        ),
	        ", we perform the following calculation until ",
	        React.createElement(
	          "i",
	          null,
	          "f",
	          React.createElement(
	            "sub",
	            null,
	            "y"
	          )
	        ),
	        "(",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        ") is zero, so that the next ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " is the same as the one we already have:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/b563256be7016370365935944308cf878cdbc29c.svg", style: { width: "8.625150000000001rem", height: "2.9250000000000003rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "(The wikipedia article has a decent animation for this process, so I'm not adding a sketch for that here)"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Now, this works well only if we can pick good starting points, and our curve is continuously differentiable and doesn't have oscillations. Glossing over the exact meaning of those terms, the curves we're dealing with conform to those constraints, so as long as we pick good starting points, this will work. So the question is: which starting points do we pick?"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "As it turns out, Newton-Raphson is so blindingly fast, so we could get away with just not picking: we simply run the algorithm from ",
	        React.createElement(
	          "i",
	          null,
	          "t=0"
	        ),
	        " to ",
	        React.createElement(
	          "i",
	          null,
	          "t=1"
	        ),
	        " at small steps (say, 1/200",
	        React.createElement(
	          "sup",
	          null,
	          "th"
	        ),
	        ") and the result will be all the roots we want. Of course, this may pose problems for high order Bézier curves: 200 steps for a 200",
	        React.createElement(
	          "sup",
	          null,
	          "th"
	        ),
	        " order Bézier curve is going to go wrong, but that's okay: there is no reason, ever, to use Bézier curves of crazy high orders. You might use a fifth order curve to get the \"nicest still remotely workable\" approximation of a full circle with a single Bézier curve, that's pretty much as high as you'll ever need to go."
	      ),
	      React.createElement(
	        "h3",
	        null,
	        "In conclusion:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So now that we know how to do root finding, we can determine the first and second derivative roots for our Bézier curves, and show those roots overlaid on the previous graphics:"
	      ),
	      React.createElement(Graphic, { preset: "simple", title: "Quadratic Bézier curve extremities", setup: this.setupQuadratic, draw: this.draw }),
	      React.createElement(Graphic, { preset: "simple", title: "Cubic Bézier curve extremities", setup: this.setupCubic, draw: this.draw })
	    );
	  }
	});

	module.exports = Extremities;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var BoundingBox = React.createClass({
	  displayName: "BoundingBox",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Bounding boxes"
	    };
	  },

	  setupQuadratic: function setupQuadratic(api) {
	    var curve = api.getDefaultQuadratic();
	    api.setCurve(curve);
	  },

	  setupCubic: function setupCubic(api) {
	    var curve = api.getDefaultCubic();
	    api.setCurve(curve);
	  },

	  draw: function draw(api, curve) {
	    api.reset();
	    api.setColor("#00FF00");
	    api.drawbbox(curve.bbox());
	    api.setColor("black");
	    api.drawSkeleton(curve);
	    api.drawCurve(curve);
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "If we have the extremities, and the start/end points, a simple for loop that tests for min/max values for x and y means we have the four values we need to box in our curve:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement(
	          "i",
	          null,
	          "Computing the bounding box for a Bézier curve"
	        ),
	        ":"
	      ),
	      React.createElement(
	        "ol",
	        null,
	        React.createElement(
	          "li",
	          null,
	          "Find all ",
	          React.createElement(
	            "i",
	            null,
	            "t"
	          ),
	          " value(s) for the curve derivative's x- and y-roots."
	        ),
	        React.createElement(
	          "li",
	          null,
	          "Discard any ",
	          React.createElement(
	            "i",
	            null,
	            "t"
	          ),
	          " value that's lower than 0 or higher than 1, because Bézier curves only use the interval [0,1]."
	        ),
	        React.createElement(
	          "li",
	          null,
	          "Determine the lowest and highest value when plugging the values ",
	          React.createElement(
	            "i",
	            null,
	            "t=0"
	          ),
	          ", ",
	          React.createElement(
	            "i",
	            null,
	            "t=1"
	          ),
	          " and each of the found roots into the original functions: the lowest value is the lower bound, and the highest value is the upper bound for the bounding box we want to construct."
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Applying this approach to our previous root finding, we get the following bounding boxes (with curve extremities coloured the same as in the root finding graphics):"
	      ),
	      React.createElement(Graphic, { preset: "simple", title: "Quadratic Bézier bounding box", setup: this.setupQuadratic, draw: this.draw }),
	      React.createElement(Graphic, { preset: "simple", title: "Cubic Bézier bounding box", setup: this.setupCubic, draw: this.draw }),
	      React.createElement(
	        "p",
	        null,
	        "We can construct even nicer boxes by aligning them along our curve, rather than along the x- and y-axis, but in order to do so we first need to look at how aligning works."
	      )
	    );
	  }
	});

	module.exports = BoundingBox;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var Aligning = React.createClass({
	  displayName: "Aligning",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Aligning curves"
	    };
	  },

	  setupQuadratic: function setupQuadratic(api) {
	    var curve = api.getDefaultQuadratic();
	    api.setCurve(curve);
	  },

	  setupCubic: function setupCubic(api) {
	    var curve = api.getDefaultCubic();
	    api.setCurve(curve);
	  },

	  align: function align(points, line) {
	    var tx = line.p1.x,
	        ty = line.p1.y,
	        a = -Math.atan2(line.p2.y - ty, line.p2.x - tx),
	        cos = Math.cos,
	        sin = Math.sin,
	        d = function d(v) {
	      return {
	        x: (v.x - tx) * cos(a) - (v.y - ty) * sin(a),
	        y: (v.x - tx) * sin(a) + (v.y - ty) * cos(a)
	      };
	    };
	    return points.map(d);
	  },

	  draw: function draw(api, curve) {
	    api.setPanelCount(2);
	    api.reset();
	    api.drawSkeleton(curve);
	    api.drawCurve(curve);

	    var pts = curve.points;
	    var line = { p1: pts[0], p2: pts[pts.length - 1] };
	    var apts = this.align(pts, line);
	    var aligned = new api.Bezier(apts);
	    var w = api.getPanelWidth();
	    var h = api.getPanelHeight();

	    var offset = { x: w, y: 0 };
	    api.setColor("black");
	    api.drawLine({ x: 0, y: 0 }, { x: 0, y: h }, offset);
	    offset.x += w / 4;
	    offset.y += h / 2;
	    api.setColor("grey");
	    api.drawLine({ x: 0, y: -h / 2 }, { x: 0, y: h / 2 }, offset);
	    api.drawLine({ x: -w / 4, y: 0 }, { x: w, y: 0 }, offset);
	    api.setFill("grey");

	    api.setColor("black");
	    api.drawSkeleton(aligned, offset);
	    api.drawCurve(aligned, offset);
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "While there are an incredible number of curves we can define by varying the x- and y-coordinates for the control points, not all curves are actually distinct. For instance, if we define a curve, and then rotate it 90 degrees, it's still the same curve, and we'll find its extremities in the same spots, just at different draw coordinates. As such, one way to make sure we're working with a \"unique\" curve is to \"axis-align\" it."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Aligning also simplifies a curve's functions. We can translate (move) the curve so that the first point lies on (0,0), which turns our ",
	        React.createElement(
	          "i",
	          null,
	          "n"
	        ),
	        " term polynomial functions into ",
	        React.createElement(
	          "i",
	          null,
	          "n-1"
	        ),
	        " term functions. The order stays the same, but we have less terms. Then, we can rotate the curves so that the last point always lies on the x-axis, too, making its coordinate (...,0). This further simplifies the function for the y-component to an ",
	        React.createElement(
	          "i",
	          null,
	          "n-2"
	        ),
	        " term function. For instance, if we have a cubic curve such as this:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/d253dc7ff011a8ae46f3351975f1d4beedd7a794.svg", style: { width: "34.12485rem", height: "2.77515rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Then translating it so that the first coordinate lies on (0,0), moving all ",
	        React.createElement(
	          "i",
	          null,
	          "x"
	        ),
	        " coordinates by -120, and all ",
	        React.createElement(
	          "i",
	          null,
	          "y"
	        ),
	        " coordinates by -160, gives us:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/b3ec747086a146c1b2c682afea6b1eae016c9a7a.svg", style: { width: "33.075rem", height: "2.77515rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "If we then rotate the curve so that its end point lies on the x-axis, the coordinates (integer-rounded for illustrative purposes here) become:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/fd82fad845da25b074dff33bbc4aa563d5f367a7.svg", style: { width: "32.54985rem", height: "2.77515rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "If we drop all the zero-terms, this gives us:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/b4d6e220358b2d00f0cf516f433fbe5ecb58f25d.svg", style: { width: "25.79985rem", height: "2.77515rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We can see that our original curve definition has been simplified considerably. The following graphics illustrate the result of aligning our example curves to the x-axis, with the cubic case using the coordinates that were just used in the example formulae:"
	      ),
	      React.createElement(Graphic, { preset: "twopanel", title: "Aligning a quadratic curve", setup: this.setupQuadratic, draw: this.draw }),
	      React.createElement(Graphic, { preset: "twopanel", title: "Aligning a cubic curve", setup: this.setupCubic, draw: this.draw })
	    );
	  }
	});

	module.exports = Aligning;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var TightBounds = React.createClass({
	  displayName: "TightBounds",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Tight boxes"
	    };
	  },

	  setupQuadratic: function setupQuadratic(api) {
	    var curve = api.getDefaultQuadratic();
	    api.setCurve(curve);
	  },

	  setupCubic: function setupCubic(api) {
	    var curve = api.getDefaultCubic();
	    api.setCurve(curve);
	  },

	  align: function align(points, line) {
	    var tx = line.p1.x,
	        ty = line.p1.y,
	        a = -Math.atan2(line.p2.y - ty, line.p2.x - tx),
	        cos = Math.cos,
	        sin = Math.sin,
	        d = function d(v) {
	      return {
	        x: (v.x - tx) * cos(a) - (v.y - ty) * sin(a),
	        y: (v.x - tx) * sin(a) + (v.y - ty) * cos(a),
	        a: a
	      };
	    };
	    return points.map(d);
	  },

	  // FIXME: I'm not satisfied with needing to turn a bbox[] into a point[],
	  //        this needs a bezier.js solution, really, with a  call curve.tightbbox()
	  transpose: function transpose(points, angle, offset) {
	    var tx = offset.x,
	        ty = offset.y,
	        cos = Math.cos,
	        sin = Math.sin,
	        v = [points.x.min, points.y.min, points.x.max, points.y.max];
	    return [{ x: v[0], y: v[1] }, { x: v[2], y: v[1] }, { x: v[2], y: v[3] }, { x: v[0], y: v[3] }].map(function (p) {
	      var x = p.x,
	          y = p.y;
	      return {
	        x: x * cos(angle) - y * sin(angle) + tx,
	        y: x * sin(angle) + y * cos(angle) + ty
	      };
	    });
	  },

	  draw: function draw(api, curve) {
	    api.reset();

	    var pts = curve.points;
	    var line = { p1: pts[0], p2: pts[pts.length - 1] };
	    var apts = this.align(pts, line);
	    var angle = -apts[0].a;
	    var aligned = new api.Bezier(apts);
	    var bbox = aligned.bbox();
	    var tpts = this.transpose(bbox, angle, pts[0]);

	    api.setColor("#00FF00");
	    api.drawLine(tpts[0], tpts[1]);
	    api.drawLine(tpts[1], tpts[2]);
	    api.drawLine(tpts[2], tpts[3]);
	    api.drawLine(tpts[3], tpts[0]);

	    api.setColor("black");
	    api.drawSkeleton(curve);
	    api.drawCurve(curve);
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "With our knowledge of bounding boxes, and curve alignment, We can now form the \"tight\" bounding box for curves. We first align  our curve, recording the translation we performed, \"T\", and the rotation angle we used, \"R\". We then determine the aligned curve's normal bounding box. Once we have that, we can map that bounding box back to our original curve by rotating it by -R, and then translating it by -T. We now have nice tight bounding boxes for our curves:"
	      ),
	      React.createElement(Graphic, { preset: "twopanel", title: "Aligning a quadratic curve", setup: this.setupQuadratic, draw: this.draw }),
	      React.createElement(Graphic, { preset: "twopanel", title: "Aligning a cubic curve", setup: this.setupCubic, draw: this.draw }),
	      React.createElement(
	        "p",
	        null,
	        "These are, strictly speaking, not necessarily the tightest possible bounding boxes. It is possible to compute the optimal bounding box by determining which spanning lines we need to effect a minimal box area, but because of the parametric nature of Bézier curves this is actually a rather costly operation, and the gain in bounding precision is often not worth it. If there is high demand for it, I'll add a section on how to precisely compute the best fit bounding box, but the maths is fairly gruelling and just not really worth spending time on."
	      )
	    );
	  }
	});

	module.exports = TightBounds;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var Canonical = React.createClass({
	  displayName: "Canonical",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Canonical form (for cubic curves)"
	    };
	  },

	  setup: function setup(api) {
	    var curve = api.getDefaultCubic();
	    api.setCurve(curve);
	    api.reset();
	    api._map_loaded = false;
	  },

	  draw: function draw(api, curve) {
	    var w = 400,
	        h = w,
	        unit = this.unit,
	        center = { x: w / 2, y: h / 2 };

	    api.setSize(w, h);
	    api.setPanelCount(2);
	    api.reset();

	    api.drawSkeleton(curve);
	    api.drawCurve(curve);

	    api.offset.x += 400;

	    if (api._map_loaded) {
	      api.image(api._map_image);
	    } else {
	      setTimeout(function () {
	        this.drawBase(api, curve);
	        this.draw(api, curve);
	      }.bind(this), 100);
	    }

	    api.drawLine({ x: 0, y: 0 }, { x: 0, y: h });

	    var npts = [{ x: 0, y: 0 }, { x: 0, y: unit }, { x: unit, y: unit }, this.forwardTransform(curve.points, unit)];

	    var canonical = new api.Bezier(npts);
	    api.setColor("blue");
	    api.drawCurve(canonical, center);
	    api.drawCircle(npts[3], 3, center);
	  },

	  forwardTransform: function forwardTransform(pts, s) {
	    s = s || 1;
	    var p1 = pts[0],
	        p2 = pts[1],
	        p3 = pts[2],
	        p4 = pts[3];

	    var xn = -p1.x + p4.x - (-p1.x + p2.x) * (-p1.y + p4.y) / (-p1.y + p2.y);
	    var xd = -p1.x + p3.x - (-p1.x + p2.x) * (-p1.y + p3.y) / (-p1.y + p2.y);
	    var np4x = s * xn / xd;

	    var yt1 = s * (-p1.y + p4.y) / (-p1.y + p2.y);
	    var yt2 = s - s * (-p1.y + p3.y) / (-p1.y + p2.y);
	    var yp = yt2 * xn / xd;
	    var np4y = yt1 + yp;

	    return { x: np4x, y: np4y };
	  },

	  drawBase: function drawBase(api, curve) {
	    api.reset();

	    var w = 400,
	        h = w,
	        unit = this.unit = w / 5,
	        center = { x: w / 2, y: h / 2 };

	    api.setSize(w, h);

	    // axes + gridlines
	    api.setColor("lightgrey");
	    for (var x = 0; x < w; x += unit / 2) {
	      api.drawLine({ x: x, y: 0 }, { x: x, y: h });
	    }
	    for (var y = 0; y < h; y += unit / 2) {
	      api.drawLine({ x: 0, y: y }, { x: w, y: y });
	    }
	    api.setColor("black");
	    api.drawLine({ x: w / 2, y: 0 }, { x: w / 2, y: h });
	    api.drawLine({ x: 0, y: h / 2 }, { x: w, y: h / 2 });

	    // Inflection border:
	    api.setColor("green");
	    api.drawLine({ x: -w / 2, y: unit }, { x: w / 2, y: unit }, center);

	    // the three stable points
	    api.setColor("black");
	    api.setFill("black");
	    api.drawCircle({ x: 0, y: 0 }, 4, center);
	    api.text("(0,0)", { x: 5 + center.x, y: 15 + center.y });
	    api.drawCircle({ x: 0, y: unit }, 4, center);
	    api.text("(0,1)", { x: 5 + center.x, y: unit + 15 + center.y });
	    api.drawCircle({ x: unit, y: unit }, 4, center);
	    api.text("(1,1)", { x: unit + 5 + center.x, y: unit + 15 + center.y });

	    // cusp parabola:
	    api.setWeight(1.5);
	    api.setColor("#FF0000");
	    api.setFill(api.getColor());
	    var pts = [];
	    var px = 1,
	        py = 1;
	    for (x = -10; x <= 1; x += 0.01) {
	      y = (-x * x + 2 * x + 3) / 4;
	      if (x > -10) {
	        pts.push({ x: unit * px, y: unit * py });
	        api.drawLine({ x: unit * px, y: unit * py }, { x: unit * x, y: unit * y }, center);
	      }
	      px = x;
	      py = y;
	    }
	    pts.push({ x: unit * px, y: unit * py });
	    api.text("Curve form has cusp →", { x: w / 2 - unit * 2, y: h / 2 + unit / 2.5 });

	    // loop/arch transition boundary, elliptical section
	    api.setColor("#FF00FF");
	    api.setFill(api.getColor());
	    var sqrt = Math.sqrt;
	    for (x = 1; x >= 0; x -= 0.005) {
	      pts.push({ x: unit * px, y: unit * py });
	      y = 0.5 * (sqrt(3) * sqrt(4 * x - x * x) - x);
	      api.drawLine({ x: unit * px, y: unit * py }, { x: unit * x, y: unit * y }, center);
	      px = x;
	      py = y;
	    }
	    pts.push({ x: unit * px, y: unit * py });
	    api.text("← Curve forms a loop at t = 1", { x: w / 2 + unit / 4, y: h / 2 + unit / 1.5 });

	    // loop/arch transition boundary, parabolic section
	    api.setColor("#3300FF");
	    api.setFill(api.getColor());
	    for (x = 0; x > -w; x -= 0.01) {
	      pts.push({ x: unit * px, y: unit * py });
	      y = (-x * x + 3 * x) / 3;
	      api.drawLine({ x: unit * px, y: unit * py }, { x: unit * x, y: unit * y }, center);
	      px = x;
	      py = y;
	    }
	    pts.push({ x: unit * px, y: unit * py });
	    api.text("← Curve forms a loop at t = 0", { x: w / 2 - unit + 10, y: h / 2 - unit * 1.25 });

	    // shape fill
	    api.setColor("transparent");
	    api.setFill("rgba(255,120,100,0.2)");
	    api.drawPath(pts, center);
	    pts = [{ x: -w / 2, y: unit }, { x: w / 2, y: unit }, { x: w / 2, y: h }, { x: -w / 2, y: h }];
	    api.setFill("rgba(0,200,0,0.2)");
	    api.drawPath(pts, center);

	    // further labels
	    api.setColor("black");
	    api.setFill(api.getColor());
	    api.text("← Curve form has one inflection →", { x: w / 2 - unit, y: h / 2 + unit * 1.75 });
	    api.text("← Plain curve ↕", { x: w / 2 + unit / 2, y: h / 6 });
	    api.text("↕ Double inflection", { x: 10, y: h / 2 - 10 });

	    api._map_image = api.toImage();
	    api._map_loaded = true;
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "While quadratic curves are relatively simple curves to analyze, the same cannot be said of the cubic curve. As a curvature controlled by more than one control points, it exhibits all kinds of features like loops, cusps, odd colinear features, and up to two inflection points because the curvature can change direction up to three times. Now, knowing what kind of curve we're dealing with means that some algorithms can be run more efficiently than if we have to implement them as generic solvers, so is there a way to determine the curve type without lots of work?"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "As it so happens, the answer is yes and the solution we're going to look at was presented by Maureen C. Stone from Xerox PARC and Tony D. deRose from the University of Washington in their joint paper",
	        React.createElement(
	          "a",
	          { href: "http://graphics.pixar.com/people/derose/publications/CubicClassification/paper.pdf" },
	          "\"A Geometric Characterization of Parametric Cubic curves\""
	        ),
	        ". It was published in 1989, and defines curves as having a \"canonical\" form (i.e. a form that all curves can be reduced to) from which we can immediately tell which features a curve will have. So how does it work?"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The first observation that makes things work is that if we have a cubic curve with four points, we can apply a linear transformation to these points such that three of the points end up on (0,0), (0,1) and (1,1), with the last point then being \"somewhere\". After applying that transformation, the location of that last point can then tell us what kind of curve we're dealing with. Specifically, we see the following breakdown:"
	      ),
	      React.createElement(Graphic, { "static": true, preset: "simple", title: "The canonical curve map", setup: this.setup, draw: this.drawBase }),
	      React.createElement(
	        "p",
	        null,
	        "This is a fairly funky image, so let's see how it breaks down. We see the three fixed points at (0,0), (0,1) and (1,1), and then the fourth point is somewhere. Depending on where it is, our curve will have certain features. Namely, if the fourth point is..."
	      ),
	      React.createElement(
	        "ol",
	        null,
	        React.createElement(
	          "li",
	          null,
	          "anywhere on and in the red zone, the curve will be self-intersecting, yielding either a cusp or a loop. Anywhere inside the the red zone, this will be a loop. We won't know ",
	          React.createElement(
	            "i",
	            null,
	            "where"
	          ),
	          " that loop is (in terms of ",
	          React.createElement(
	            "i",
	            null,
	            "t"
	          ),
	          " values), but we are guaranteed that there is one."
	        ),
	        React.createElement(
	          "li",
	          null,
	          "on the left (red) edge, the curve will have a cusp. We again don't know ",
	          React.createElement(
	            "em",
	            null,
	            "where"
	          ),
	          ", just that it has one. This edge is described by the function: ",
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/ae5a63e86bb367e6266a394962387344d0a92b10.svg", style: { width: "12.45015rem", height: "2.3998500000000003rem" } })
	        ),
	        React.createElement(
	          "li",
	          null,
	          "on the lower right (pink) edge, the curve will have a loop at t=1, so we know the end coordinate of the curve also lies ",
	          React.createElement(
	            "em",
	            null,
	            "on"
	          ),
	          " the curve. This edge is described by the function: ",
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/d389fcde05a773be99f84db5fc9ed7ef043bf406.svg", style: { width: "16.050150000000002rem", height: "2.6248500000000003rem" } })
	        ),
	        React.createElement(
	          "li",
	          null,
	          "on the top (blue) edge, the curve will have a loop at t=0, so we know the start coordinate of the curve also lies ",
	          React.createElement(
	            "em",
	            null,
	            "on"
	          ),
	          " the curve. This edge is described by the function: ",
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/d97181a9d0ada19862a0ff2cebb08bdee00868d7.svg", style: { width: "10.650150000000002rem", height: "2.3998500000000003rem" } })
	        ),
	        React.createElement(
	          "li",
	          null,
	          "inside the green zone, the curve will have a single inflection, switching concave/convex once."
	        ),
	        React.createElement(
	          "li",
	          null,
	          "between the red and green zones, the curve has two inflections, meaning its curvature switches between concave/convex form twice."
	        ),
	        React.createElement(
	          "li",
	          null,
	          "anywhere on the right of the red zone, the curve will have no inflections. It'll just be a well-behaved arch."
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Of course, this map is fairly small, but the regions extend to infinity, with well defined boundaries."
	      ),
	      React.createElement(
	        "div",
	        { className: "note" },
	        React.createElement(
	          "h3",
	          null,
	          "Wait, where do those lines come from?"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Without repeating the paper mentioned at the top of this section, the loop-boundaries come from rewriting the curve into canonical form, and then solving the formulae for which constraints must hold for which possible curve properties. In the paper these functions yield formulae for where you will find cusp points, or loops where we know t=0 or t=1, but those functions are derived for the full cubic expression, meaning they apply to t=-∞ to t=∞... For Bézier curves we only care about the \"clipped interval\" t=0 to t=1, so some of the properties that apply when you look at the curve over an infinite interval simply don't apply to the Bézier curve interval."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "The right bound for the loop region, indicating where the curve switches from \"having inflections\" to \"having a loop\", for the general cubic curve, is actually mirrored over x=1, but for Bézier curves this right half doesn't apply, so we don't need to pay attention to it. Similarly, the boundaries for t=0 and t=1 loops are also nice clean curves but get \"cut off\" when we only look at what the general curve does over the interval t=0 to t=1."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "For the full details, head over to the paper and read through sections 3 and 4. If you still remember your high school precalculus, you can probably follow along with this paper, although you might have to read it a few times before all the bits \"click\"."
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So now the question becomes: how do we manipulate our curve so that it fits this canonical form, with three fixed points, and one \"free\" point? Enter linear algerba. Don't worry, I'll be doing all the math for you, as well as show you what the effect is on our curves, but basically we're going to be using linear algebra, rather than calculus, because \"it's way easier\". Sometimes a calculus approach is very hard to work with, when the equivalent geometrical solution is super obvious."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The approach is going to start with a curve that doesn't have all-colinear points (so we need to make sure the points don't all fall on a straight line), and then applying four graphics operations that you will probably have heard of: translation (moving all points by some fixed x- and y-distance), scaling (multiplying all points by some x and y scale factor), and shearing (an operation that turns rectangles into parallelograms)."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Step 1: we translate any curve by -p1.x and -p1.y, so that the curve starts at (0,0). We're going to make use of an interesting trick here, by pretending our 2D coordinates are 3D, with the ",
	        React.createElement(
	          "i",
	          null,
	          "z"
	        ),
	        "coordinate simply always being 1. This is an old trick in graphics to overcome the limitations of 2D transformations: without it, we can only turn (x,y) coordinates into new coordinates of the form (ax + by, cx + dy), which means we can't do translation, since that requires we end up with some kind of (x + a, y + b). If we add a bogus ",
	        React.createElement(
	          "i",
	          null,
	          "z"
	        ),
	        " coordinate that is always 1, then we can suddenly add arbitrary values. For example:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/cc3850bd6d6ab81fa414e81f54d4d4e53bcf69c8.svg", style: { width: "34.05015rem", height: "4.05rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Sweet! ",
	        React.createElement(
	          "i",
	          null,
	          "z"
	        ),
	        " stays 1, so we can effectively ignore it entirely, but we added some plain values to our x and y coordinates. So, if we want to subtract p1.x and p1.y, we use:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/031d2c01553905f6ab97a7e54543f66b9fd427f0.svg", style: { width: "32.09985rem", height: "4.1998500000000005rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Running all our coordinates through this transformation gives a new set of coordinates, let's call those ",
	        React.createElement(
	          "b",
	          null,
	          "U"
	        ),
	        ", where the first coordinate lies on (0,0), and the rest is still somewhat free. Our next job is to make sure point 2 ends up lying on the ",
	        React.createElement(
	          "i",
	          null,
	          "x=0"
	        ),
	        " line, so what we want is a transformation matrix that, when we run it, subtracts ",
	        React.createElement(
	          "i",
	          null,
	          "x"
	        ),
	        " from whatever ",
	        React.createElement(
	          "i",
	          null,
	          "x"
	        ),
	        " we currently have. This is called ",
	        React.createElement(
	          "a",
	          { href: "https://en.wikipedia.org/wiki/Shear_matrix" },
	          "shearing"
	        ),
	        ", and the typical x-shear matrix and its transformation looks like this:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/8e98c870c9d5b60bccf196d29e290f9de6657ce7.svg", style: { width: "15.67485rem", height: "4.05rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So we want some shearing value that, when multiplied by ",
	        React.createElement(
	          "i",
	          null,
	          "y"
	        ),
	        ", yields ",
	        React.createElement(
	          "i",
	          null,
	          "-x"
	        ),
	        ", so our x coordinate becomes zero. That value is simpy ",
	        React.createElement(
	          "i",
	          null,
	          "-x/y"
	        ),
	        ", because ",
	        React.createElement(
	          "i",
	          null,
	          "-x/y * y = -x"
	        ),
	        ". Done:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/585fa88864a98008c15225bdbeb0eb26a4653dab.svg", style: { width: "9.9rem", height: "4.87485rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Now, running this on all our points generates a new set of coordinates, let's call those V, which now have point 1 on (0,0) and point 2 on (0, some-value), and we wanted it at (0,1), so we need to [do some scaling](https://en.wikipedia.org/wiki/Scaling_%28geometry%29) to make sure it ends up at (0,1). Additionally, we want point 3 to end up on (1,1), so we can also scale x to make sure its x-coordinate will be 1 after we run the transform. That means we'll be x-scaling by 1/point3",
	        React.createElement(
	          "sub",
	          null,
	          "x"
	        ),
	        ", and y-scaling by point2",
	        React.createElement(
	          "sub",
	          null,
	          "y"
	        ),
	        ". This is really easy:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/bf9c60b59e6247de3fece63638a8333bdcd068a4.svg", style: { width: "10.04985rem", height: "5.3248500000000005rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Then, finally, this generates a new set of coordinates, let's call those W, of which point 1 lies on (0,0), point 2 lies on (0,1), and point three lies on (1, ...) so all that's left is to make sure point 3 ends up at (1,1) - but we can't scale! Point 2 is already in the right place, and y-scaling would move it out of (0,1) again, so our only option is to y-shear point three, just like how we x-sheared point 2 earlier. In this case, we do the same trick, but with `y/x` rather than `x/y` because we're not x-shearing but y-shearing. Additionally, we don't actually want to end up at zero (which is what we did before) so we need to shear towards an offset, in this case 1:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/af412fd7df7faf35973314095ec6bf1cb28a8e34.svg", style: { width: "10.125rem", height: "4.95rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "And this generates our final set of four coordinates. Of these, we already know that points 1 through 3 are (0,0), (0,1) and (1,1), and only the last coordinate is \"free\". In fact, given any four starting coordinates, the resulting \"transformation mapped\" coordinate will be:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/66e084e9ee396b8cc40de3d0df9c4658dcd10e14.svg", style: { width: "31.57515rem", height: "8.1rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "That looks very complex, but notice that every coordinate value is being offset by the initial translation, and a lot of terms in there repeat: it's pretty easy to calculate this fast, since there's so much we can cache and reuse while we compute this mapped coordinate!"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "First, let's just do that translation step as a \"preprocessing\" operation so we don't have to subtract the values all the time. What does that leave?"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/d2dc58a4a6951ff27e5b83fb9be239e2fbe0f7ce.svg", style: { width: "24.67485rem", height: "4.05rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Suddenly things look a lot simpler: the mapped x is fairly straight forward to compute, and we see that the mapped y actually contains the mapped x in its entirety, so we'll have that part already available when we need to evaluate it. In fact, let's pull out all those common factors to see just how simple this is:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/ebaea590e50dfce555e8ad2c63682fe9e6285f06.svg", style: { width: "29.100150000000003rem", height: "2.6248500000000003rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "That's kind of super-simple to write out in code, I think you'll agree. Coding math tends to be easier than the formulae initially make it look!"
	      ),
	      React.createElement(
	        "div",
	        { className: "note" },
	        React.createElement(
	          "h3",
	          null,
	          "How do you track all that?"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Doing maths can be a pain, so whenever possible, I like to make computers do the work for me. Especially for things like this, I simply use ",
	          React.createElement(
	            "a",
	            { href: "http://www.wolfram.com/mathematica" },
	            "Mathematica"
	          ),
	          ". Tracking all this math by hand is insane, and we invented computers, literally, to do this for us. I have no reason to use pen and paper when I can write out what I want to do in a program, and have the program do the math for me. And real math, too, with symbols, not with numbers. In fact, ",
	          React.createElement(
	            "a",
	            { href: "http://pomax.github.io/gh-weblog/downloads/canonical-curve.nb" },
	            "here's"
	          ),
	          " the Mathematica notebook if you want to see how this works for yourself."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Now, I know, you're thinking \"but Mathematica is super expensive!\" and that's true, it's ",
	          React.createElement(
	            "a",
	            { href: "http://www.wolfram.com/mathematica-home-edition" },
	            "$295 for home use"
	          ),
	          ", but it's ",
	          React.createElement(
	            "strong",
	            null,
	            "also"
	          ),
	          " ",
	          React.createElement(
	            "a",
	            { href: "http://www.wolfram.com/raspberry-pi" },
	            "free when you buy a $35 raspberry pi"
	          ),
	          ". Obviously, I bought a raspberry pi, and I encourage you to do the same. With that, as long as you know what you want to ",
	          React.createElement(
	            "em",
	            null,
	            "do"
	          ),
	          ", Mathematica can just do it for you. And we don't have to be geniusses to work out what the maths looks like. That's what we have computers for."
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So, let's write up a sketch that'll show us the canonical form for any curve drawn in blue, overlaid on our canonical map, so that we can immediately tell which features our curve must have, based on where the fourth coordinate is located on the map:"
	      ),
	      React.createElement(Graphic, { preset: "simple", title: "A cubic curve mapped to canonical form", setup: this.setup, draw: this.draw })
	    );
	  }
	});

	module.exports = Canonical;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var sin = Math.sin;
	var tau = Math.PI * 2;

	var Arclength = React.createClass({
	  displayName: "Arclength",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Arc length"
	    };
	  },

	  setup: function setup(api) {
	    var w = api.getPanelWidth();
	    var h = api.getPanelHeight();
	    var generator;
	    if (!this.generator) {
	      generator = function (v, scale) {
	        scale = scale || 1;
	        return {
	          x: v * w / tau,
	          y: scale * sin(v)
	        };
	      };
	      generator.start = 0;
	      generator.end = tau;
	      generator.step = 0.1;
	      generator.scale = h / 3;
	      this.generator = generator;
	    }
	  },

	  drawSine: function drawSine(api, dheight) {
	    var w = api.getPanelWidth();
	    var h = api.getPanelHeight();
	    var generator = this.generator;
	    generator.dheight = dheight;

	    api.setColor("black");
	    api.drawLine({ x: 0, y: h / 2 }, { x: w, y: h / 2 });
	    api.drawFunction(generator, { x: 0, y: h / 2 });
	  },

	  drawSlices: function drawSlices(api, steps) {
	    var w = api.getPanelWidth();
	    var h = api.getPanelHeight();
	    var f = w / tau;
	    var area = 0;
	    var c = steps <= 25 ? 1 : 0;
	    api.reset();
	    api.setColor("transparent");
	    api.setFill("rgba(150,150,255, 0.4)");
	    for (var step = tau / steps, i = step / 2, v, p1, p2; i < tau + step / 2; i += step) {
	      v = this.generator(i);
	      p1 = { x: v.x - f * step / 2 + c, y: 0 };
	      p2 = { x: v.x + f * step / 2 - c, y: v.y * this.generator.scale };

	      if (!c) {
	        api.setFill("rgba(150,150,255," + (0.4 + 0.3 * Math.random()) + ")");
	      }
	      api.drawRect(p1, p2, { x: 0, y: h / 2 });
	      area += step * Math.abs(v.y * this.generator.scale);
	    }
	    api.setFill("black");
	    var trueArea = (100 * 4 * h / 3 | 0) / 100;
	    var currArea = (100 * area | 0) / 100;
	    api.text("Approximating with " + steps + " strips (true area: " + trueArea + "): " + currArea, { x: 10, y: h - 15 });
	  },

	  drawCoarseIntegral: function drawCoarseIntegral(api) {
	    api.reset();
	    this.drawSlices(api, 10);
	    this.drawSine(api);
	  },

	  drawFineIntegral: function drawFineIntegral(api) {
	    api.reset();
	    this.drawSlices(api, 24);
	    this.drawSine(api);
	  },

	  drawSuperFineIntegral: function drawSuperFineIntegral(api) {
	    api.reset();
	    this.drawSlices(api, 99);
	    this.drawSine(api);
	  },

	  setupCurve: function setupCurve(api) {
	    var curve = api.getDefaultCubic();
	    api.setCurve(curve);
	  },

	  drawCurve: function drawCurve(api, curve) {
	    api.reset();
	    api.drawSkeleton(curve);
	    api.drawCurve(curve);
	    var len = curve.length();
	    api.setFill("black");
	    api.text("Curve length: " + len + " pixels", { x: 10, y: 15 });
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "How long is a Bézier curve? As it turns out, that's not actually an easy question, because the answer requires maths that —much like root finding— cannot generally be solved the traditional way. If we have a parametric curve with ",
	        React.createElement(
	          "i",
	          null,
	          "f",
	          React.createElement(
	            "sub",
	            null,
	            "x"
	          ),
	          "(t)"
	        ),
	        " and ",
	        React.createElement(
	          "i",
	          null,
	          "f",
	          React.createElement(
	            "sub",
	            null,
	            "y"
	          ),
	          "(t)"
	        ),
	        ", then the length of the curve, measured from start point to some point ",
	        React.createElement(
	          "i",
	          null,
	          "t = z"
	        ),
	        ", is computed using the following seemingly straight forward (if a bit overwhelming) formula:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/16e3f81dfc12c526ca53b477b2aa67ef7b56bfe2.svg", style: { width: "10.42515rem", height: "2.475rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "or, more commonly written using Leibnitz notation as:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/8e2857c32b23969bca67b0ead318493a3e61dc4a.svg", style: { width: "17.1rem", height: "2.475rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "This formula says that the length of a parametric curve is in fact equal to the ",
	        React.createElement(
	          "b",
	          null,
	          "area"
	        ),
	        " underneath a function that looks a remarkable amount like Pythagoras' rule for computing the diagonal of a straight angled triangle. This sounds pretty simple, right? Sadly, it's far from simple... cutting straight to after the chase is over: for quadratic curves, this formula generates an ",
	        React.createElement(
	          "a",
	          { href: "http://www.wolframalpha.com/input/?i=antiderivative+for+sqrt((2*(1-t)*t*B+%2b+t^2*C)'^2+%2b+(2*(1-t)*t*E)'^2)&incParTime=true" },
	          "unwieldy computation"
	        ),
	        ", and we're simply not going to implement things that way. For cubic Bézier curves, things get even more fun, because there is no \"closed form\" solution, meaning that due to the way calculus works, there is no generic formula that allows you to calculate the arc length. Let me just repeat this, because it's fairly crucial: ",
	        React.createElement(
	          "strong",
	          null,
	          React.createElement(
	            "em",
	            null,
	            "for cubic and higher Bézier curves, there is no way to solve this function if you want to use it \"for all possible coordinates\"."
	          )
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Seriously: ",
	        React.createElement(
	          "a",
	          { href: "https://en.wikipedia.org/wiki/Abel%E2%80%93Ruffini_theorem" },
	          "It cannot be done."
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So we turn to numerical approaches again. The method we'll look at here is the",
	        React.createElement(
	          "a",
	          { href: "http://www.youtube.com/watch?v=unWguclP-Ds&feature=BFa&list=PLC8FC40C714F5E60F&index=1" },
	          "Gauss quadrature"
	        ),
	        ". This approximation is a really neat trick, because for any ",
	        React.createElement(
	          "i",
	          null,
	          "n",
	          React.createElement(
	            "sup",
	            null,
	            "th"
	          )
	        ),
	        " degree polynomial it finds approximated values for an integral really efficiently. Explaining this procedure in length is way beyond the scope of this page, so if you're interested in finding out why it works, I can recommend the University of South Florida video lecture on the procedure, linked in this very paragraph. The general solution we're looking for is the following:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/e6a8d7d5f1742bb926c0c992d2b89c71090edbf4.svg", style: { width: "37.800000000000004rem", height: "5.175rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "In plain text: an integral function can always be treated as the sum of an (infinite) number of (infinitely thin) rectangular strips sitting \"under\" the function's plotted graph. To illustrate this idea, the following graph shows the integral for a sinoid function. The more strips we use (and of course the more we use, the thinner they get) the closer we get to the true area under the curve, and thus the better the approximation:"
	      ),
	      React.createElement(
	        "div",
	        { className: "figure" },
	        React.createElement(Graphic, { inline: true, "static": true, preset: "empty", title: "A function's approximated integral", setup: this.setup, draw: this.drawCoarseIntegral }),
	        React.createElement(Graphic, { inline: true, "static": true, preset: "empty", title: "A better approximation", setup: this.setup, draw: this.drawFineIntegral }),
	        React.createElement(Graphic, { inline: true, "static": true, preset: "empty", title: "An even better approximation", setup: this.setup, draw: this.drawSuperFineIntegral })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Now, infinitely many terms to sum and infinitely thin rectangles are not something that computers can work with, so instead we're going to approximate the infinite summation by using a sum of a finite number of \"just thin\" rectangular strips. As long as we use a high enough number of thin enough rectangular strips, this will give us an approximation that is pretty close to what the real value is."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So, the trick is to come up with useful rectangular strips. A naive way is to simply create ",
	        React.createElement(
	          "i",
	          null,
	          "n"
	        ),
	        " strips, all with the same width, but there is a far better way using special values for ",
	        React.createElement(
	          "i",
	          null,
	          "C"
	        ),
	        " and ",
	        React.createElement(
	          "i",
	          null,
	          "f(t)"
	        ),
	        " depending on the value of ",
	        React.createElement(
	          "i",
	          null,
	          "n"
	        ),
	        ", which indicates how many strips we'll use, and it's called the Legendre-Gauss quadrature."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "This approach uses strips that are ",
	        React.createElement(
	          "em",
	          null,
	          "not"
	        ),
	        " spaced evenly, but instead spaces them in a special way that works remarkably well. If you look at the earlier sinoid graphic, you could imagine that we could probably get a result similar to the one with 99 strips if we used fewer strips, but spaced them so that the steeper the curve is, the thinner we make the strip, and conversely, the flatter the curve is (especially near the tops of the function), the wider we make the strip. That's akin to how the Legendre values work."
	      ),
	      React.createElement(
	        "div",
	        { className: "note" },
	        React.createElement(
	          "p",
	          null,
	          "Note that one requirement for the approach we'll use is that the integral must run from -1 to 1. That's no good, because we're dealing with Bézier curves, and the length of a section of curve applies to values which run from 0 to \"some value smaller than or equal to 1\" (let's call that value ",
	          React.createElement(
	            "i",
	            null,
	            "z"
	          ),
	          "). Thankfully, we can quite easily transform any integral interval to any other integral interval, by shifting and scaling the inputs. Doing so, we get the following:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/631e6396082d9621472546b87c2e27065990d568.svg", style: { width: "24.15015rem", height: "5.92515rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "That may look a bit more complicated, but the fraction involving ",
	          React.createElement(
	            "i",
	            null,
	            "z"
	          ),
	          " is a fixed number, so the summation, and the evaluation of the ",
	          React.createElement(
	            "i",
	            null,
	            "f(t)"
	          ),
	          " values are still pretty simple."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "So, what do we need to perform this calculation? For one, we'll need an explicit formula for ",
	          React.createElement(
	            "i",
	            null,
	            "f(t)"
	          ),
	          ", because that derivative notation is handy on paper, but not when we have to implement it. We'll also need to know what these ",
	          React.createElement(
	            "i",
	            null,
	            "C",
	            React.createElement(
	              "sub",
	              null,
	              "i"
	            )
	          ),
	          " and ",
	          React.createElement(
	            "i",
	            null,
	            "t",
	            React.createElement(
	              "sub",
	              null,
	              "i"
	            )
	          ),
	          " values should be. Luckily, that's less work because there are actually many tables available that give these values, for any ",
	          React.createElement(
	            "i",
	            null,
	            "n"
	          ),
	          ", so if we want to approximate our integral with only two terms (which is a bit low, really) then ",
	          React.createElement(
	            "a",
	            { href: "legendre-gauss.html" },
	            "these tables"
	          ),
	          " would tell us that for ",
	          React.createElement(
	            "i",
	            null,
	            "n=2"
	          ),
	          " we must use the following values:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/6dc4299695f03c27c362e7faf47ae4474794809e.svg", style: { width: "4.80015rem", height: "6.82515rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Which means that in order for us to approximate the integral, we must plug these values into the approximate function, which gives us:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/fe54606651e308caf83a65e53bc4d6104f8a4ee1.svg", style: { width: "34.95015rem", height: "3.15rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "We can program that pretty easily, provided we have that ",
	          React.createElement(
	            "i",
	            null,
	            "f(t)"
	          ),
	          " available, which we do, as we know the full description for the Bézier curve functions B",
	          React.createElement(
	            "sub",
	            null,
	            "x"
	          ),
	          "(t) and B",
	          React.createElement(
	            "sub",
	            null,
	            "y"
	          ),
	          "(t)."
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "If we use the Legendre-Gauss values for our ",
	        React.createElement(
	          "i",
	          null,
	          "C"
	        ),
	        " values (thickness for each strip) and ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " values (location of each strip), we can determine the approximate length of a Bézier curve by computing the Legendre-Gauss sum. The following graphic shows a cubic curve, with its computed lengths; Go ahead and change the curve, to see how its length changes. One thing worth trying is to see if you can make a straight line, and see if the length matches what you'd expect. What if you form a line with the control points on the outside, and the start/end points on the inside?"
	      ),
	      React.createElement(Graphic, { preset: "simple", title: "Arc length for a Bézier curve", setup: this.setupCurve, draw: this.drawCurve })
	    );
	  }
	});

	module.exports = Arclength;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);
	var keyHandling = __webpack_require__(18);

	var ArclengthApprox = React.createClass({
	  displayName: "ArclengthApprox",

	  statics: {
	    keyHandlingOptions: {
	      propName: "steps",
	      values: {
	        "38": 1, // up arrow
	        "40": -1 // down arrow
	      },
	      controller: function controller(api) {
	        if (api.steps < 1) {
	          api.steps = 1;
	        }
	      }
	    }
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Approximated arc length"
	    };
	  },

	  setupQuadratic: function setupQuadratic(api) {
	    var curve = api.getDefaultQuadratic();
	    api.setCurve(curve);
	    api.steps = 10;
	  },

	  setupCubic: function setupCubic(api) {
	    var curve = api.getDefaultCubic();
	    api.setCurve(curve);
	    api.steps = 16;
	  },

	  draw: function draw(api, curve) {
	    api.reset();
	    api.drawSkeleton(curve);

	    var pts = curve.getLUT(api.steps);

	    var step = 1 / api.steps;
	    var p0 = curve.points[0],
	        pc;
	    for (var t = step; t < 1.0 + step; t += step) {
	      pc = curve.get(Math.min(t, 1));
	      api.setColor("red");
	      api.drawLine(p0, pc);
	      p0 = pc;
	    }

	    var len = curve.length();
	    var alen = 0;
	    for (var i = 0, p1, dx, dy; i < pts.length - 1; i++) {
	      p0 = pts[i];
	      p1 = pts[i + 1];
	      dx = p1.x - p0.x;
	      dy = p1.y - p0.y;
	      alen += Math.sqrt(dx * dx + dy * dy);
	    }
	    alen = (100 * alen | 0) / 100;
	    len = (100 * len | 0) / 100;

	    api.text("Approximate length, " + api.steps + " steps: " + alen + " (true: " + len + ")", { x: 10, y: 15 });
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "Sometimes, we don't actually need the precision of a true arc length, and we can get away with simply computing the approximate arc length instead. The by far fastest way to do this is to flatten the curve and then simply calculate the linear distance from point to point. This will come with an error, but this can be made arbitrarily small by increasing the segment count."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "If we combine the work done in the previous sections on curve flattening and arc length computation, we can implement these with minimal effort:"
	      ),
	      React.createElement(Graphic, { preset: "twopanel", title: "Approximate quadratic curve arc length", setup: this.setupQuadratic, draw: this.draw, onKeyDown: this.props.onKeyDown }),
	      React.createElement(Graphic, { preset: "twopanel", title: "Approximate cubic curve arc length", setup: this.setupCubic, draw: this.draw, onKeyDown: this.props.onKeyDown }),
	      React.createElement(
	        "p",
	        null,
	        "Try clicking on the sketch and using your up and down arrow keys to lower the number of segments for both the quadratic and cubic curve. You may notice that the error in length is actually pretty significant, even if the percentage is fairly low: if the number of segments used yields an error of 0.1% or higher, the flattened curve already looks fairly obviously flattened. And of course, the longer the curve, the more significant the error will be."
	      )
	    );
	  }
	});

	module.exports = keyHandling(ArclengthApprox);

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);
	var keyHandling = __webpack_require__(18);

	var Tracing = React.createClass({
	  displayName: "Tracing",

	  statics: {
	    keyHandlingOptions: {
	      propName: "steps",
	      values: {
	        "38": 1, // up arrow
	        "40": -1 // down arrow
	      },
	      controller: function controller(api) {
	        if (api.steps < 1) {
	          api.steps = 1;
	        }
	      }
	    }
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Tracing a curve at fixed distance intervals"
	    };
	  },

	  setup: function setup(api) {
	    var curve = api.getDefaultCubic();
	    api.setCurve(curve);
	    api.steps = 8;
	  },

	  generate: function generate(api, curve, offset, pad, fwh) {
	    offset.x += pad;
	    offset.y += pad;
	    var len = curve.length();
	    var pts = [{ x: 0, y: 0, d: 0 }];
	    for (var v = 1, t, d; v <= 100; v++) {
	      t = v / 100;
	      d = curve.split(t).left.length();
	      pts.push({
	        x: api.utils.map(t, 0, 1, 0, fwh),
	        y: api.utils.map(d, 0, len, 0, fwh),
	        d: d,
	        t: t
	      });
	    }
	    return pts;
	  },

	  draw: function draw(api, curve, offset) {
	    api.reset();
	    api.drawSkeleton(curve);
	    api.drawCurve(curve);

	    var len = curve.length();
	    var w = api.getPanelWidth();
	    var h = api.getPanelHeight();
	    var pad = 20;
	    var fwh = w - 2 * pad;

	    offset.x += w;
	    api.drawLine({ x: 0, y: 0 }, { x: 0, y: h }, offset);
	    api.drawAxes(pad, "t", 0, 1, "d", 0, len, offset);

	    return this.generate(api, curve, offset, pad, fwh);
	  },

	  plotOnly: function plotOnly(api, curve) {
	    api.setPanelCount(2);
	    var offset = { x: 0, y: 0 };
	    var pts = this.draw(api, curve, offset);
	    for (var i = 0; i < pts.length - 1; i++) {
	      api.drawLine(pts[i], pts[i + 1], offset);
	    }
	  },

	  drawColoured: function drawColoured(api, curve) {
	    api.setPanelCount(3);
	    var w = api.getPanelWidth();
	    var h = api.getPanelHeight();
	    var pad = 20;
	    var fwh = w - 2 * pad;

	    var offset = { x: 0, y: 0 };
	    var len = curve.length();
	    var pts = this.draw(api, curve, offset);
	    var s = api.steps,
	        i,
	        p,
	        ts = [];
	    for (i = 0; i <= s; i++) {
	      var target = i * len / s;
	      // find the t nearest our target distance
	      for (p = 0; p < pts.length; p++) {
	        if (pts[p].d > target) {
	          p--;
	          break;
	        }
	      }
	      if (p < 0) p = 0;
	      if (p === pts.length) p = pts.length - 1;
	      ts.push(pts[p]);
	    }

	    for (i = 0; i < pts.length - 1; i++) {
	      api.drawLine(pts[i], pts[i + 1], offset);
	    }

	    ts.forEach(function (p) {
	      var pt = { x: api.utils.map(p.t, 0, 1, 0, fwh), y: 0 };
	      var pd = { x: 0, y: api.utils.map(p.d, 0, len, 0, fwh) };
	      api.setColor("black");
	      api.drawCircle(pt, 3, offset);
	      api.drawCircle(pd, 3, offset);
	      api.setColor("lightgrey");
	      api.drawLine(pt, { x: pt.x, y: pd.y }, offset);
	      api.drawLine(pd, { x: pt.x, y: pd.y }, offset);
	    });

	    offset = { x: 2 * w, y: 0 };
	    api.drawLine({ x: 0, y: 0 }, { x: 0, y: h }, offset);

	    var idx = 0,
	        colors = ["rgb(240,0,200)", "rgb(0,40,200)"];
	    api.setColor(colors[idx]);
	    var p0 = curve.get(pts[0].t),
	        p1;
	    api.drawCircle(curve.get(0), 4, offset);

	    for (i = 1, p1; i < pts.length; i++) {
	      p1 = curve.get(pts[i].t);
	      api.drawLine(p0, p1, offset);
	      if (ts.indexOf(pts[i]) !== -1) {
	        api.setColor(colors[++idx % colors.length]);
	        api.drawCircle(p1, 4, offset);
	      }
	      p0 = p1;
	    }
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "Say you want to draw a curve with a dashed line, rather than a solid line, or you want to move something along the curve at fixed distance intervals over time, like a train along a track, and you want to use Bézier curves."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Now you have a problem."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The reason you have a problem is that Bézier curves are parametric functions with non-linear behaviour, whereas moving a train along a track is about as close to a practical example of linear behaviour as you can get. The problem we're faced with is that we can't just pick ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " values at some fixed interval and expect the Bézier functions to generate points that are spaced a fixed distance apart. In fact, let's look at the relation between \"distance long a curve\" and \"",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value\", by plotting them against one another."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The following graphic shows a particularly illustrative curve, and it's length-to-t plot. For linear traversal, this line needs to be straight, running from (0,0) to (length,1). This is, it's safe to say, not what we'll see, we'll see something wobbly instead. To make matters even worse, the length-to-",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " function is also of a much higher order than our curve is: while the curve we're using for this exercise is a cubic curve, which can switch concave/convex form once at best, the plot shows that the distance function along the curve is able to switch forms three times (to see this, try creating an S curve with the start/end close together, but the control points far apart)."
	      ),
	      React.createElement(Graphic, { preset: "twopanel", title: "The t-for-distance function", setup: this.setup, draw: this.plotOnly }),
	      React.createElement(
	        "p",
	        null,
	        "We see a function that might be invertible, but we won't be able to do so, symbolically. You may remember from the section on arc length that we cannot actually compute the true arc length function as an expression of ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        ", which means we also can't compute the true inverted function that gives ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " as an expression of length. So how do we fix this?"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "One way is to do what the graphic does: simply run through the curve, determine its",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        "-for-length values as a set of discrete values at some high resolution (the graphic uses 100 discrete points), and then use those as a basis for finding an appropriate ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value, given a distance along the curve. This works quite well, actually, and is fairly fast."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We can use some colour to show the difference between distance-based and time based intervals: the following graph is similar to the previous one, except it segments the curve in terms of equal-distance intervals. This shows as regular colour intervals going down the graph, but the mapping to ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " values is not linear, so there will be (highly) irregular intervals along the horizontal axis. It also shows the curve in an alternating colouring based on the t-for-distance values we find our LUT:"
	      ),
	      React.createElement(Graphic, { preset: "threepanel", title: "Fixed-interval coloring a curve", setup: this.setup, draw: this.drawColoured, onKeyDown: this.props.onKeyDown }),
	      React.createElement(
	        "p",
	        null,
	        "Use your up and down arrow keys to increase or decrease the number of equidistant segments used to colour the curve."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "However, are there better ways? One such way is discussed in \"",
	        React.createElement(
	          "a",
	          { href: "http://www.geometrictools.com/Documentation/MovingAlongCurveSpecifiedSpeed.pdf" },
	          "Moving Along a Curve with Specified Speed"
	        ),
	        "\" by David Eberly of Geometric Tools, LLC, but basically because we have no explicit length function (or rather, one we don't have to constantly compute for different intervals), you may simply be better off with a traditional lookup table (LUT)."
	      )
	    );
	  }
	});

	module.exports = keyHandling(Tracing);

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var min = Math.min,
	    max = Math.max;

	var Intersections = React.createClass({
	  displayName: "Intersections",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Intersections"
	    };
	  },

	  setupLines: function setupLines(api) {
	    var curve1 = new api.Bezier([50, 50, 150, 110]);
	    var curve2 = new api.Bezier([50, 250, 170, 170]);
	    api.setCurve(curve1, curve2);
	  },

	  drawLineIntersection: function drawLineIntersection(api, curves) {
	    api.reset();

	    var lli = api.utils.lli4;
	    var p = lli(curves[0].points[0], curves[0].points[1], curves[1].points[0], curves[1].points[1]);

	    var mark = 0;
	    curves.forEach(function (curve) {
	      api.drawSkeleton(curve);
	      api.setColor("black");
	      if (p) {
	        var pts = curve.points,
	            mx = min(pts[0].x, pts[1].x),
	            my = min(pts[0].y, pts[1].y),
	            Mx = max(pts[0].x, pts[1].x),
	            My = max(pts[0].y, pts[1].y);
	        if (mx <= p.x && my <= p.y && Mx >= p.x && My >= p.y) {
	          api.setColor("#00FF00");
	          mark++;
	        }
	      }
	      api.drawCurve(curve);
	    });

	    if (p) {
	      api.setColor(mark < 2 ? "red" : "#00FF00");
	      api.drawCircle(p, 3);
	    }
	  },

	  setupQuadratic: function setupQuadratic(api) {
	    var curve1 = api.getDefaultQuadratic();
	    var curve2 = new api.Bezier([15, 250, 220, 20]);
	    api.setCurve(curve1, curve2);
	  },

	  setupCubic: function setupCubic(api) {
	    var curve1 = new api.Bezier([100, 240, 30, 60, 210, 230, 160, 30]);
	    var curve2 = new api.Bezier([25, 260, 230, 20]);
	    api.setCurve(curve1, curve2);
	  },

	  draw: function draw(api, curves) {
	    api.reset();
	    curves.forEach(function (curve) {
	      api.drawSkeleton(curve);
	      api.drawCurve(curve);
	    });

	    var utils = api.utils;
	    var line = { p1: curves[1].points[0], p2: curves[1].points[1] };
	    var acpts = utils.align(curves[0].points, line);
	    var nB = new api.Bezier(acpts);
	    var roots = utils.roots(nB.points);
	    roots.forEach(function (t) {
	      var p = curves[0].get(t);
	      api.drawCircle(p, 3);
	      api.text("t = " + t, { x: p.x + 5, y: p.y + 10 });
	    });
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "Let's look at some more things we will want to do with Bézier curves. Almost immediately after figuring out how to get bounding boxes to work, people tend to run into the problem that even though the minimal bounding box (based on rotation) is tight, it's not sufficient to perform true collision detection. It's a good first step to make sure there ",
	        React.createElement(
	          "em",
	          null,
	          "might"
	        ),
	        " be a collision (if there is no bounding box overlap, there can't be one), but in order to do real collision detection we need to know whether or not there's an intersection on the actual curve."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We'll do this in steps, because it's a bit of a journey to get to curve/curve intersection checking. First, let's start simple, by implementing a line-line intersection checker. While we can solve this the traditional calculus way (determine the functions for both lines, then compute the intersection by equating them and solving for two unknowns), linear algebra actually offers a nicer solution."
	      ),
	      React.createElement(
	        "h3",
	        null,
	        "Line-line intersections"
	      ),
	      React.createElement(
	        "p",
	        { id: "intersection_ll" },
	        "if we have two line segments with two coordinates each, segments A-B and C-D, we can find the intersection of the lines these segments are an intervals on by linear algebra, using the procedure outlined in this ",
	        React.createElement(
	          "a",
	          { href: "http://www.topcoder.com/tc?module=Static&d1=tutorials&d2=geometry2#line_line_intersection" },
	          "top coder"
	        ),
	        " article. Of course, we need to make sure that the intersection isn't just on the lines our line segments lie on, but also on our line segments themselves, so after we find the intersection we need to verify it lies without the bounds of our original line segments."
	      ),
	      React.createElement("p", null),
	      React.createElement(
	        "p",
	        null,
	        "The following graphic implements this intersection detection, showing a red point for an intersection on the lines our segments lie on (thus being a virtual intersection point), and a green point for an intersection that lies on both segments (being a real intersection point)."
	      ),
	      React.createElement(Graphic, { preset: "simple", title: "Line/line intersections", setup: this.setupLines, draw: this.drawLineIntersection }),
	      React.createElement(
	        "div",
	        { className: "howtocode" },
	        React.createElement(
	          "h3",
	          null,
	          "Implementing line-line intersections"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Let's have a look at how to implement a line-line intersection checking function. The basics are covered in the article mentioned above, but sometimes you need more function signatures, because you might not want to call your function with eight distinct parameters. Maybe you're using point structs or the line. Let's get coding:"
	        ),
	        React.createElement(
	          "pre",
	          null,
	          "lli8 = function(x1,y1,x2,y2,x3,y3,x4,y4):",
	          '\n',
	          "  var nx=(x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4),",
	          '\n',
	          "      ny=(x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4),",
	          '\n',
	          "      d=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);",
	          '\n',
	          "  if d=0:",
	          '\n',
	          "    return false",
	          '\n',
	          "  return point(nx/d, ny/d)",
	          '\n',
	          '\n',
	          "lli4 = function(p1, p2, p3, p4):",
	          '\n',
	          "  var x1 = p1.x, y1 = p1.y,",
	          '\n',
	          "      x2 = p2.x, y2 = p2.y,",
	          '\n',
	          "      x3 = p3.x, y3 = p3.y,",
	          '\n',
	          "      x4 = p4.x, y4 = p4.y;",
	          '\n',
	          "  return lli8(x1,y1,x2,y2,x3,y3,x4,y4)",
	          '\n',
	          '\n',
	          "lli = function(line1, line2):",
	          '\n',
	          "  return lli4(line1.p1, line1.p2, line2.p1, line2.p2)"
	        )
	      ),
	      React.createElement(
	        "h3",
	        null,
	        "What about curve-line intersections?"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Curve/line intersection is more work, but we've already seen the techniques we need to use in order to perform it: first we translate/rotate both the line and curve together, in such a way that the line coincides with the x-axis. This will position the curve in a way that makes it cross the line at points where its y-function is zero. By doing this, the problem of finding intersections between a curve and a line has now become the problem of performing root finding on our translated/rotated curve, as we already covered in the section on finding extremities."
	      ),
	      React.createElement(Graphic, { preset: "simple", title: "Quadratic curve/line intersections", setup: this.setupQuadratic, draw: this.draw }),
	      React.createElement(Graphic, { preset: "simple", title: "Cubic curve/line intersections", setup: this.setupCubic, draw: this.draw }),
	      React.createElement(
	        "p",
	        null,
	        "Curve/curve intersection, however, is more complicated. Since we have no straight line to align to, we can't simply align one of the curves and be left with a simple procedure. Instead, we'll need to apply two techniques we've not covered yet: de Casteljau's algorithm, and curve splitting."
	      )
	    );
	  }
	});

	module.exports = Intersections;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var abs = Math.abs;

	var CurveIntersections = React.createClass({
	  displayName: "CurveIntersections",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Curve/curve intersection"
	    };
	  },

	  setup: function setup(api) {
	    this.api = api;
	    api.setPanelCount(3);
	    var curve1 = new api.Bezier(10, 100, 90, 30, 40, 140, 220, 220);
	    var curve2 = new api.Bezier(5, 150, 180, 20, 80, 250, 210, 190);
	    api.setCurve(curve1, curve2);
	    this.pairReset();
	  },

	  pairReset: function pairReset() {
	    this.prevstep = 0;
	    this.step = 0;
	  },

	  draw: function draw(api, curves) {
	    var _this = this;

	    api.reset();
	    var offset = { x: 0, y: 0 };
	    curves.forEach(function (curve) {
	      api.drawSkeleton(curve);
	      api.drawCurve(curve);
	    });

	    // next panel: iterations
	    var w = api.getPanelWidth();
	    var h = api.getPanelHeight();
	    offset.x += w;
	    api.drawLine({ x: 0, y: 0 }, { x: 0, y: h }, offset);

	    if (this.step === 0) {
	      this.pairs = [{ c1: curves[0], c2: curves[1] }];
	    }

	    if (this.step !== this.prevstep) {
	      var pairs = this.pairs;
	      this.pairs = [];
	      this.finals = [];
	      pairs.forEach(function (p) {

	        if (p.c1.length() < 0.6 && p.c2.length() < 0.6) {
	          return _this.finals.push(p);
	        }

	        var s1 = p.c1.split(0.5);
	        api.setColor("black");
	        api.drawCurve(p.c1, offset);
	        api.setColor("red");
	        api.drawbbox(s1.left.bbox(), offset);
	        api.drawbbox(s1.right.bbox(), offset);

	        var s2 = p.c2.split(0.5);
	        api.setColor("black");
	        api.drawCurve(p.c2, offset);
	        api.setColor("blue");
	        api.drawbbox(s2.left.bbox(), offset);
	        api.drawbbox(s2.right.bbox(), offset);

	        if (s1.left.overlaps(s2.left)) {
	          _this.pairs.push({ c1: s1.left, c2: s2.left });
	        }
	        if (s1.left.overlaps(s2.right)) {
	          _this.pairs.push({ c1: s1.left, c2: s2.right });
	        }
	        if (s1.right.overlaps(s2.left)) {
	          _this.pairs.push({ c1: s1.right, c2: s2.left });
	        }
	        if (s1.right.overlaps(s2.right)) {
	          _this.pairs.push({ c1: s1.right, c2: s2.right });
	        }
	      });
	      this.prevstep = this.step;
	    } else {
	      this.pairs.forEach(function (p) {
	        api.setColor("black");
	        api.drawCurve(p.c1, offset);
	        api.drawCurve(p.c2, offset);
	        api.setColor("red");
	        api.drawbbox(p.c1.bbox(), offset);
	        api.setColor("blue");
	        api.drawbbox(p.c2.bbox(), offset);
	      });
	    }

	    if (this.pairs.length === 0) {
	      this.pairReset();
	      this.draw(api, curves);
	    }

	    // next panel: results
	    offset.x += w;
	    api.setColor("black");
	    api.drawLine({ x: 0, y: 0 }, { x: 0, y: h }, offset);

	    // get intersections as coordinates
	    var results = curves[0].intersects(curves[1]).map(function (s) {
	      var tvals = s.split('/').map(function (v) {
	        return parseFloat(v);
	      });
	      return { t1: tvals[0], t2: tvals[1] };
	    });

	    // filter out likely duplicates
	    var curr = results[0],
	        _,
	        i,
	        same = function same(a, b) {
	      return abs(a.t1 - b.t1) < 0.01 && abs(a.t2 - b.t2) < 0.01;
	    };
	    for (i = 1; i < results.length; i++) {
	      _ = results[i];
	      if (same(curr, _)) {
	        results.splice(i--, 1);
	      } else {
	        curr = _;
	      }
	    }

	    api.setColor("lightblue");
	    api.drawCurve(curves[0], offset);
	    api.drawCurve(curves[1], offset);

	    api.setColor("blue");
	    results.forEach(function (tvals) {
	      api.drawCircle(curves[0].get(tvals.t1), 3, offset);
	    });
	  },

	  stepUp: function stepUp() {
	    this.step++;
	    this.api.redraw();
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "Using de Casteljau's algorithm to split the curve we can now implement curve/curve intersection finding using a \"divide and conquer\" technique:"
	      ),
	      React.createElement(
	        "ul",
	        null,
	        React.createElement(
	          "li",
	          null,
	          "Take two curves ",
	          React.createElement(
	            "i",
	            null,
	            "C",
	            React.createElement(
	              "sub",
	              null,
	              "1"
	            )
	          ),
	          " and ",
	          React.createElement(
	            "i",
	            null,
	            "C",
	            React.createElement(
	              "sub",
	              null,
	              "2"
	            )
	          ),
	          ", and treat them as a pair."
	        ),
	        React.createElement(
	          "li",
	          null,
	          "If their bounding boxes overlap, split up each curve into two sub-curves"
	        ),
	        React.createElement(
	          "li",
	          null,
	          "With ",
	          React.createElement(
	            "i",
	            null,
	            "C",
	            React.createElement(
	              "sub",
	              null,
	              "1.1"
	            )
	          ),
	          ", ",
	          React.createElement(
	            "i",
	            null,
	            "C",
	            React.createElement(
	              "sub",
	              null,
	              "1.2"
	            )
	          ),
	          ", ",
	          React.createElement(
	            "i",
	            null,
	            "C",
	            React.createElement(
	              "sub",
	              null,
	              "2.1"
	            )
	          ),
	          " and ",
	          React.createElement(
	            "i",
	            null,
	            "C",
	            React.createElement(
	              "sub",
	              null,
	              "2.2"
	            )
	          ),
	          ", form four new pairs (",
	          React.createElement(
	            "i",
	            null,
	            "C",
	            React.createElement(
	              "sub",
	              null,
	              "1.1"
	            )
	          ),
	          ",",
	          React.createElement(
	            "i",
	            null,
	            "C",
	            React.createElement(
	              "sub",
	              null,
	              "2.1"
	            )
	          ),
	          "), (",
	          React.createElement(
	            "i",
	            null,
	            "C",
	            React.createElement(
	              "sub",
	              null,
	              "1.1"
	            )
	          ),
	          ", ",
	          React.createElement(
	            "i",
	            null,
	            "C",
	            React.createElement(
	              "sub",
	              null,
	              "2.2"
	            )
	          ),
	          "), (",
	          React.createElement(
	            "i",
	            null,
	            "C",
	            React.createElement(
	              "sub",
	              null,
	              "1.2"
	            )
	          ),
	          ",",
	          React.createElement(
	            "i",
	            null,
	            "C",
	            React.createElement(
	              "sub",
	              null,
	              "2.1"
	            )
	          ),
	          "), and (",
	          React.createElement(
	            "i",
	            null,
	            "C",
	            React.createElement(
	              "sub",
	              null,
	              "1.2"
	            )
	          ),
	          ",",
	          React.createElement(
	            "i",
	            null,
	            "C",
	            React.createElement(
	              "sub",
	              null,
	              "2.2"
	            )
	          ),
	          ")."
	        ),
	        React.createElement(
	          "li",
	          null,
	          "For each pair, check whether their bounding boxes overlap.",
	          React.createElement(
	            "ul",
	            null,
	            React.createElement(
	              "li",
	              null,
	              "If their bounding boxes do not overlap, discard the pair, as there is no intersection between this pair of curves."
	            ),
	            React.createElement(
	              "li",
	              null,
	              "If there ",
	              React.createElement(
	                "em",
	                null,
	                "is"
	              ),
	              " overlap, rerun all steps for this pair."
	            )
	          )
	        ),
	        React.createElement(
	          "li",
	          null,
	          "Once the sub-curves we form are so small that they effectively occupy sub-pixel areas, we consider an intersection found."
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "This algorithm will start with a single pair, \"balloon\" until it runs in parallel for a large number of potential sub-pairs, and then taper back down as it homes in on intersection coordinates, ending up with as many pairs as there are intersections."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The following graphic applies this algorithm to a pair of cubic curves, one step at a time, so you can see the algorithm in action. Click the button to run a single step in the algorithm, after setting up your curves in some creative arrangement. The algorithm resets once it's found a solution, so you can try this with lots of different curves (can you find the configuration that yields the maximum number of intersections between two cubic curves? Nine intersections!)"
	      ),
	      React.createElement(
	        Graphic,
	        { preset: "clipping", title: "Curve/curve intersections", setup: this.setup, draw: this.draw },
	        React.createElement(
	          "button",
	          { onClick: this.stepUp },
	          "advance one step"
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Self-intersection is dealt with in the same way, except we turn a curve into two or more curves first based on the inflection points. We then form all possible curve pairs with the resultant segments, and run exactly the same algorithm. All non-overlapping curve pairs will be removed after the first iteration, and the remaining steps home in on the curve's self-intersection points."
	      )
	    );
	  }
	});

	module.exports = CurveIntersections;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var ABC = React.createClass({
	  displayName: "ABC",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "The projection identity"
	    };
	  },

	  onClick: function onClick(evt, api) {
	    api.t = api.curve.on({ x: evt.offsetX, y: evt.offsetY }, 7);
	    if (api.t < 0.05 || api.t > 0.95) api.t = false;
	    api.redraw();
	  },

	  setupQuadratic: function setupQuadratic(api) {
	    var curve = api.getDefaultQuadratic();
	    curve.points[0].y -= 10;
	    api.setCurve(curve);
	  },

	  setupCubic: function setupCubic(api) {
	    var curve = api.getDefaultCubic();
	    curve.points[2].y -= 20;
	    api.setCurve(curve);
	    api.lut = curve.getLUT(100);
	  },

	  draw: function draw(api, curve) {
	    api.reset();
	    api.drawSkeleton(curve);
	    api.drawCurve(curve);

	    var h = api.getPanelHeight();

	    api.setColor("black");
	    if (api.t) {
	      api.drawCircle(api.curve.get(api.t), 3);
	      api.setColor("lightgrey");
	      var hull = api.drawHull(curve, api.t);
	      var utils = api.utils;

	      var A, B, C;

	      if (hull.length === 6) {
	        A = curve.points[1];
	        B = hull[5];
	        C = utils.lli4(A, B, curve.points[0], curve.points[2]);
	        api.setColor("lightgrey");
	        api.drawLine(curve.points[0], curve.points[2]);
	      } else if (hull.length === 10) {
	        A = hull[5];
	        B = hull[9];
	        C = utils.lli4(A, B, curve.points[0], curve.points[3]);
	        api.setColor("lightgrey");
	        api.drawLine(curve.points[0], curve.points[3]);
	      }

	      api.setColor("#00FF00");
	      api.drawLine(A, B);
	      api.setColor("red");
	      api.drawLine(B, C);
	      api.setColor("black");
	      api.drawCircle(C, 3);

	      api.setFill("black");
	      api.text("A", { x: 10 + A.x, y: A.y });
	      api.text("B (t = " + api.utils.round(api.t, 2) + ")", { x: 10 + B.x, y: B.y });
	      api.text("C", { x: 10 + C.x, y: C.y });

	      var d1 = utils.dist(A, B);
	      var d2 = utils.dist(B, C);
	      var ratio = d1 / d2;

	      api.text("d1 (A-B): " + utils.round(d1, 2) + ", d2 (B-C): " + utils.round(d2, 2) + ", ratio (d1/d2): " + utils.round(ratio, 4), { x: 10, y: h - 7 });
	    }
	  },

	  setCT: function setCT(evt, api) {
	    api.t = evt.offsetX / api.getPanelWidth();
	  },

	  drawCTgraph: function drawCTgraph(api) {
	    api.reset();
	    api.setColor("black");
	    var w = api.getPanelWidth();
	    var pad = 20;
	    var fwh = w - 2 * pad;
	    api.drawAxes(pad, "t", 0, 1, "u", 0, 1);
	    api.setColor("blue");
	    var uPoint = function uPoint(t) {
	      var value = api.u(t),
	          res = { x: pad + t * fwh, y: pad + value * fwh };
	      return res;
	    };
	    api.drawFunction(uPoint);
	    if (api.t) {
	      var v = api.u(api.t),
	          v1 = api.utils.round(v, 3),
	          v2 = api.utils.round(1 - v, 3),
	          up = uPoint(api.t);
	      api.drawLine({ x: up.x, y: pad }, up);
	      api.drawLine({ x: pad, y: up.y }, up);
	      api.drawCircle(up, 3);
	      api.setFill("blue");
	      api.text("    t = " + api.utils.round(api.t, 3), { x: up.x + 10, y: up.y - 7 });
	      api.text("u(t) = " + api.utils.round(v, 3), { x: up.x + 10, y: up.y + 7 });
	      api.setFill("black");
	      api.text("C = " + v1 + " * start + " + v2 + " * end", { x: w / 2 - pad, y: pad + fwh });
	    }
	  },

	  drawQCT: function drawQCT(api) {
	    api.u = api.u || function (t) {
	      var top = (t - 1) * (t - 1),
	          bottom = 2 * t * t - 2 * t + 1;
	      return top / bottom;
	    };
	    this.drawCTgraph(api);
	  },

	  drawCCT: function drawCCT(api) {
	    api.u = api.u || function (t) {
	      var top = (1 - t) * (1 - t) * (1 - t),
	          bottom = t * t * t + top;
	      return top / bottom;
	    };
	    this.drawCTgraph(api);
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "De Casteljau's algorithm is the pivotal algorithm when it comes to Bézier curves. You can use it not just to split curves, but also to draw them efficiently (especially for high-order Bézier curves), as well as to come up with curves based on three points and a tangent. Particularly this last thing is really useful because it lets us \"mould\" a curve, by picking it up at some point, and dragging that point around to change the curve's shape."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "How does that work? Succinctly: we run de Casteljau's algorithm in reverse!"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "In order to run de Casteljau's algorithm in reverse, we need a few basic things: a start and end point, a point on the curve that want to be moving around, which has an associated ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value, and a point we've not explicitly talked about before, and as far as I know has no explicit name, but lives one iteration higher in the de Casteljau process then our on-curve point does. I like to call it \"A\" for reasons that will become obvious."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So let's use graphics instead of text to see where this \"A\" is, because text only gets us so far: in the following graphic, click anywhere on the curves to see the identity information that we'll be using to run de Casteljau in reverse (you can manipulate the curve even after picking a point. Note the \"ratio\" value when you do so: does it change?):"
	      ),
	      React.createElement(
	        "div",
	        { className: "figure" },
	        React.createElement(Graphic, { inline: true, preset: "abc", title: "Projections in a quadratic Bézier curve",
	          setup: this.setupQuadratic, draw: this.draw, onClick: this.onClick }),
	        React.createElement(Graphic, { inline: true, preset: "abc", title: "Projections in a cubic Bézier curve",
	          setup: this.setupCubic, draw: this.draw, onClick: this.onClick })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Clicking anywhere on the curves shows us three things:"
	      ),
	      React.createElement(
	        "ol",
	        null,
	        React.createElement(
	          "li",
	          null,
	          "our on-curve point; let's call that ",
	          React.createElement(
	            "b",
	            null,
	            "B"
	          ),
	          ","
	        ),
	        React.createElement(
	          "li",
	          null,
	          "a point at the tip of B's \"hat\", on de Casteljau step up; let's call that ",
	          React.createElement(
	            "b",
	            null,
	            "A"
	          ),
	          ", and"
	        ),
	        React.createElement(
	          "li",
	          null,
	          "a point that we get by projecting B onto the start--end baseline; let's call that ",
	          React.createElement(
	            "b",
	            null,
	            "C"
	          ),
	          "."
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "These three values ABC hide an important identity formula for quadratic and cubic Bézier curves: for any point on the curve with some ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value, the ratio distance of C along baseline is fixed: if some ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value sets up a C that is 20% away from the start and 80% away from the end, then it doesn't matter where the start, end, or control points are: for that ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value, C will ",
	        React.createElement(
	          "em",
	          null,
	          "always"
	        ),
	        " lie at 20% from the start and 80% from the end point. Go ahead, pick an on-curve point in either graphic and then move all the other points around: if you only move the control points, start and end won't move, and so neither will C, and if you move either start or end point, C will move but its relative position will not change. The following function stays true:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/f48f095d9c37c079ff6a5f71b3047397aa7dfc6b.svg", style: { width: "13.19985rem", height: "1.125rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So that just leaves finding A."
	      ),
	      React.createElement(
	        "div",
	        { className: "note" },
	        React.createElement(
	          "p",
	          null,
	          "While that relation is fixed, the function ",
	          React.createElement(
	            "i",
	            null,
	            "u(t)"
	          ),
	          " differs depending on whether we're working with quadratic or cubic curves:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/b2db06c0139cd2c346ce764393f5c7252a16b5f2.svg", style: { width: "12.524849999999999rem", height: "5.70015rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "So, if we know the start and end coordinates, and we know the ",
	          React.createElement(
	            "i",
	            null,
	            "t"
	          ),
	          " value, we know C:"
	        ),
	        React.createElement(
	          "div",
	          { className: "figure" },
	          React.createElement(Graphic, { inline: true, preset: "abc", title: "Quadratic value of C for t", draw: this.drawQCT, onMouseMove: this.setCT }),
	          React.createElement(Graphic, { inline: true, preset: "abc", title: "Cubic value of C for t", draw: this.drawCCT, onMouseMove: this.setCT })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Mouse-over the graphs to see the expression for C, given the ",
	          React.createElement(
	            "i",
	            null,
	            "t"
	          ),
	          " value at the mouse pointer."
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "There's also another important bit of information that is inherent to the ABC values: while the distances between A and B, and B and C, are dynamic (based on where we put B), the ",
	        React.createElement(
	          "em",
	          null,
	          "ratio"
	        ),
	        " between the two distances is stable: given some ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value, the following always holds:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/6cb3e94fe9164128a25570a32abed15baa726f17.svg", style: { width: "17.92485rem", height: "2.7rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "This leads to a pretty powerful bit of knowledge: merely by knowing the ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value of some on curve point, we know where C has to be (as per the above note), and because we know B and C, and thus have the distance between them, we know where A has to be:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/1dffb79b42799c95c899e689b074361f662ec807.svg", style: { width: "15.525rem", height: "2.55015rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "And that's it, all values found."
	      ),
	      React.createElement(
	        "div",
	        { className: "note" },
	        React.createElement(
	          "p",
	          null,
	          "Much like the ",
	          React.createElement(
	            "i",
	            null,
	            "u(t)"
	          ),
	          " function in the above note, the ",
	          React.createElement(
	            "i",
	            null,
	            "ratio(t)"
	          ),
	          " function depends on whether we're looking at quadratic or cubic curves. Their form is intrinsically related to the ",
	          React.createElement(
	            "i",
	            null,
	            "u(t)"
	          ),
	          " function in that they both come rolling out of the same function evalution, explained over on ",
	          React.createElement(
	            "a",
	            { href: "http://mathoverflow.net/questions/122257/finding-the-formula-for-Bézier-curve-ratios-hull-point-point-baseline" },
	            "MathOverflow"
	          ),
	          " by Boris Zbarsky and myself. The ratio functions are the \"s(t)\" functions from the answers there, while the \"u(t)\" functions have the same name both here and on MathOverflow."
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/51ecfbffec979f90ab93a54a5de8cbeb83e150ad.svg", style: { width: "14.475150000000001rem", height: "2.7rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/5f2bb71795c615637d632da70b722938cb103b03.svg", style: { width: "15.075000000000001rem", height: "2.77515rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Unfortunately, this trick only works for quadratic and cubic curves. Once we hit higher order curves, things become a lot less predictable; the \"fixed point ",
	          React.createElement(
	            "i",
	            null,
	            "C"
	          ),
	          "\" is no longer fixed, moving around as we move the control points, and projections of ",
	          React.createElement(
	            "i",
	            null,
	            "B"
	          ),
	          " onto the line between start and end may actually lie on that line before the start, or after the end, and there are no simple ratios that we can exploit."
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So: if we know B and its corresponding ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value, then we know all the ABC values, which —together with a start and end coordinate— gives us the necessary information to reconstruct a curve's \"de Casteljau skeleton\", which means that two points and a value between 0 and 1, we can come up with a curve. And that opens up possibilities: curve manipulation by dragging an on-curve point, curve fitting of \"a bunch of coordinates\", these are useful things, and we'll look at both in the next sections."
	      )
	    );
	  }
	});

	module.exports = ABC;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var abs = Math.abs;

	var Moulding = React.createClass({
	  displayName: "Moulding",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Manipulating a curve"
	    };
	  },

	  setupQuadratic: function setupQuadratic(api) {
	    api.setPanelCount(3);
	    var curve = api.getDefaultQuadratic();
	    curve.points[2].x -= 30;
	    api.setCurve(curve);
	  },

	  setupCubic: function setupCubic(api) {
	    api.setPanelCount(3);
	    var curve = new api.Bezier([100, 230, 30, 160, 200, 50, 210, 160]);
	    curve.points[2].y -= 20;
	    api.setCurve(curve);
	    api.lut = curve.getLUT(100);
	  },

	  saveCurve: function saveCurve(evt, api) {
	    if (!api.t) return;
	    api.setCurve(api.newcurve);
	    api.t = false;
	    api.redraw();
	  },

	  findTValue: function findTValue(evt, api) {
	    var t = api.curve.on({ x: evt.offsetX, y: evt.offsetY }, 7);
	    if (t < 0.05 || t > 0.95) return false;
	    return t;
	  },

	  markQB: function markQB(evt, api) {
	    api.t = this.findTValue(evt, api);
	    if (api.t) {
	      var t = api.t,
	          t2 = 2 * t,
	          top = t2 * t - t2,
	          bottom = top + 1,
	          ratio = abs(top / bottom),
	          curve = api.curve,
	          A = api.A = curve.points[1],
	          B = api.B = curve.get(t);
	      api.C = api.utils.lli4(A, B, curve.points[0], curve.points[2]);
	      api.ratio = ratio;
	    }
	  },

	  markCB: function markCB(evt, api) {
	    api.t = this.findTValue(evt, api);
	    if (api.t) {
	      var t = api.t,
	          mt = 1 - t,
	          t3 = t * t * t,
	          mt3 = mt * mt * mt,
	          bottom = t3 + mt3,
	          top = bottom - 1,
	          ratio = abs(top / bottom),
	          curve = api.curve,
	          hull = curve.hull(t),
	          A = api.A = hull[5],
	          B = api.B = curve.get(t);
	      api.db = curve.derivative(t);
	      api.C = api.utils.lli4(A, B, curve.points[0], curve.points[3]);
	      api.ratio = ratio;
	    }
	  },

	  drag: function drag(evt, api) {
	    if (!api.t) return;

	    var newB = api.newB = {
	      x: evt.offsetX,
	      y: evt.offsetY
	    };

	    // now that we know A, B, C and the AB:BC ratio, we can compute the new A' based on the desired B'
	    api.newA = {
	      x: newB.x - (api.C.x - newB.x) / api.ratio,
	      y: newB.y - (api.C.y - newB.y) / api.ratio
	    };
	  },

	  dragQB: function dragQB(evt, api) {
	    if (!api.t) return;
	    this.drag(evt, api);
	    api.update = [api.newA];
	  },

	  dragCB: function dragCB(evt, api) {
	    if (!api.t) return;
	    this.drag(evt, api);

	    // preserve struts for B when repositioning
	    var curve = api.curve,
	        hull = curve.hull(api.t),
	        B = api.B,
	        Bl = hull[7],
	        Br = hull[8],
	        dbl = { x: Bl.x - B.x, y: Bl.y - B.y },
	        dbr = { x: Br.x - B.x, y: Br.y - B.y },
	        pts = curve.points,

	    // find new point on s--c1
	    p1 = { x: api.newB.x + dbl.x, y: api.newB.y + dbl.y },
	        sc1 = {
	      x: api.newA.x - (api.newA.x - p1.x) / (1 - api.t),
	      y: api.newA.y - (api.newA.y - p1.y) / (1 - api.t)
	    },

	    // find new point on c2--e
	    p2 = { x: api.newB.x + dbr.x, y: api.newB.y + dbr.y },
	        sc2 = {
	      x: api.newA.x + (p2.x - api.newA.x) / api.t,
	      y: api.newA.y + (p2.y - api.newA.y) / api.t
	    },

	    // construct new c1` based on the fact that s--sc1 is s--c1 * t
	    nc1 = {
	      x: pts[0].x + (sc1.x - pts[0].x) / api.t,
	      y: pts[0].y + (sc1.y - pts[0].y) / api.t
	    },

	    // construct new c2` based on the fact that e--sc2 is e--c2 * (1-t)
	    nc2 = {
	      x: pts[3].x - (pts[3].x - sc2.x) / (1 - api.t),
	      y: pts[3].y - (pts[3].y - sc2.y) / (1 - api.t)
	    };

	    api.p1 = p1;
	    api.p2 = p2;
	    api.sc1 = sc1;
	    api.sc2 = sc2;
	    api.nc1 = nc1;
	    api.nc2 = nc2;

	    api.update = [nc1, nc2];
	  },

	  drawMould: function drawMould(api, curve) {
	    api.reset();
	    api.drawSkeleton(curve);
	    api.drawCurve(curve);

	    var w = api.getPanelWidth(),
	        h = api.getPanelHeight(),
	        offset = { x: w, y: 0 },
	        round = api.utils.round;

	    api.setColor("black");
	    api.drawLine({ x: 0, y: 0 }, { x: 0, y: h }, offset);
	    api.drawLine({ x: w, y: 0 }, { x: w, y: h }, offset);

	    if (api.t) {
	      api.drawCircle(curve.get(api.t), 3);
	      api.npts = [curve.points[0]].concat(api.update).concat([curve.points.slice(-1)[0]]);
	      api.newcurve = new api.Bezier(api.npts);

	      api.setColor("lightgrey");
	      api.drawCurve(api.newcurve);
	      var newhull = api.drawHull(api.newcurve, api.t, offset);
	      api.drawLine(api.npts[0], api.npts.slice(-1)[0], offset);
	      api.drawLine(api.newA, api.newB, offset);

	      api.setColor("grey");
	      api.drawCircle(api.newA, 3, offset);
	      api.setColor("blue");
	      api.drawCircle(api.B, 3, offset);
	      api.drawCircle(api.C, 3, offset);
	      api.drawCircle(api.newB, 3, offset);
	      api.drawLine(api.B, api.C, offset);
	      api.drawLine(api.newB, api.C, offset);

	      api.setFill("black");
	      api.text("A'", api.newA, { x: offset.x + 7, y: offset.y + 1 });
	      api.text("start", curve.get(0), { x: offset.x + 7, y: offset.y + 1 });
	      api.text("end", curve.get(1), { x: offset.x + 7, y: offset.y + 1 });
	      api.setFill("blue");
	      api.text("B'", api.newB, { x: offset.x + 7, y: offset.y + 1 });
	      api.text("B, at t = " + round(api.t, 2), api.B, { x: offset.x + 7, y: offset.y + 1 });
	      api.text("C", api.C, { x: offset.x + 7, y: offset.y + 1 });

	      if (curve.order === 3) {
	        var hull = curve.hull(api.t);
	        api.drawLine(hull[7], hull[8], offset);
	        api.drawLine(newhull[7], newhull[8], offset);
	        api.drawCircle(newhull[7], 3, offset);
	        api.drawCircle(newhull[8], 3, offset);
	        api.text("e1", newhull[7], { x: offset.x + 7, y: offset.y + 1 });
	        api.text("e2", newhull[8], { x: offset.x + 7, y: offset.y + 1 });
	      }

	      offset.x += w;

	      api.setColor("lightgrey");
	      api.drawSkeleton(api.newcurve, offset);
	      api.setColor("black");
	      api.drawCurve(api.newcurve, offset);
	    } else {
	      offset.x += w;
	      api.drawCurve(curve, offset);
	    }
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "Armed with knowledge of the \"ABC\" relation, we can now update a curve interactively, by letting people click anywhere on the curve, find the ",
	        React.createElement(
	          "em",
	          null,
	          "t"
	        ),
	        "-value matching that coordinate, and then letting them drag that point around. With every drag update we'll have a new point \"B\", which we can combine with the fixed point \"C\" to find our new point A. Once we have those, we can reconstruct the de Casteljau skeleton and thus construct a new curve with the same start/end points as the original curve, passing through the user-selected point B, with correct new control points."
	      ),
	      React.createElement(Graphic, { preset: "moulding", title: "Moulding a quadratic Bézier curve",
	        setup: this.setupQuadratic, draw: this.drawMould,
	        onClick: this.placeMouldPoint, onMouseDown: this.markQB, onMouseDrag: this.dragQB, onMouseUp: this.saveCurve }),
	      React.createElement(
	        "p",
	        null,
	        React.createElement(
	          "strong",
	          null,
	          "Click-dragging the curve itself"
	        ),
	        " shows what we're using to compute the new coordinates: while dragging you will see the original points B and its corresponding ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        "-value, the original point C for that ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        "-value, as well as the new point B' based on the mouse cursor. Since we know the ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        "-value for this configuration, we can compute the ABC ratio for this configuration, and we know that our new point A' should like at a distance:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/e361e1235c94bbe87e95834c7fcfb6ab96e028b9.svg", style: { width: "15.600150000000001rem", height: "2.3998500000000003rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "For quadratic curves, this means we're done, since the new point A' is equivalent to the new quadratic control point. For cubic curves, we need to do a little more work:"
	      ),
	      React.createElement(Graphic, { preset: "moulding", title: "Moulding a cubic Bézier curve",
	        setup: this.setupCubic, draw: this.drawMould,
	        onClick: this.placeMouldPoint, onMouseDown: this.markCB, onMouseDrag: this.dragCB, onMouseUp: this.saveCurve }),
	      React.createElement(
	        "p",
	        null,
	        "To help understand what's going on, the cubic graphic shows the full de Casteljau construction \"hull\" when repositioning point B. We compute A` in exactly the same way as before, but we also record the final strut line that forms B in the original curve. Given A', B', and the endpoints e1 and e2 of the strut line relative to B', we can now compute where the new control points should be. Remember that B' lies on line e1--e2 at a distance ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        ", because that's how Bézier curves work. In the same manner, we know the distance A--e1 is only line-interval [0,t] of the full segment, and A--e2 is only line-interval [t,1], so constructing the new control points is fairly easy."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "First, we construct the one-level-of-de-Casteljau-up points:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/f813a7d607787329d242bfbfa28570c88c3e30f5.svg", style: { width: "9.975150000000001rem", height: "5.09985rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "And then we can compute the new control points:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/4ec5f4148752a3d332a922048700d2c71918342f.svg", style: { width: "11.700000000000001rem", height: "4.64985rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "And that's cubic curve manipulation."
	      )
	    );
	  }
	});

	module.exports = Moulding;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var abs = Math.abs;

	var PointCurves = React.createClass({
	  displayName: "PointCurves",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Creating a curve from three points"
	    };
	  },

	  setup: function setup(api) {
	    api.lpts = [{ x: 56, y: 153 }, { x: 144, y: 83 }, { x: 188, y: 185 }];
	  },

	  onClick: function onClick(evt, api) {
	    if (api.lpts.length == 3) {
	      api.lpts = [];
	    }
	    api.lpts.push({
	      x: evt.offsetX,
	      y: evt.offsetY
	    });
	    api.redraw();
	  },

	  getQRatio: function getQRatio(t) {
	    var t2 = 2 * t,
	        top = t2 * t - t2,
	        bottom = top + 1;
	    return abs(top / bottom);
	  },

	  getCRatio: function getCRatio(t) {
	    var mt = 1 - t,
	        t3 = t * t * t,
	        mt3 = mt * mt * mt,
	        bottom = t3 + mt3,
	        top = bottom - 1;
	    return abs(top / bottom);
	  },

	  drawQuadratic: function drawQuadratic(api, curve) {
	    var labels = ["start", "t=0.5", "end"];

	    api.reset();

	    api.setColor("lightblue");
	    api.drawGrid(10, 10);

	    api.setFill("black");
	    api.setColor("black");
	    api.lpts.forEach(function (p, i) {
	      api.drawCircle(p, 3);
	      api.text(labels[i], p, { x: 5, y: 2 });
	    });

	    if (api.lpts.length === 3) {
	      var S = api.lpts[0],
	          E = api.lpts[2],
	          B = api.lpts[1],
	          C = {
	        x: (S.x + E.x) / 2,
	        y: (S.y + E.y) / 2
	      };
	      api.setColor("blue");
	      api.drawLine(S, E);
	      api.drawLine(B, C);
	      api.drawCircle(C, 3);
	      var ratio = this.getQRatio(0.5),
	          A = {
	        x: B.x + (B.x - C.x) / ratio,
	        y: B.y + (B.y - C.y) / ratio
	      };
	      curve = new api.Bezier([S, A, E]);
	      api.setColor("lightgrey");
	      api.drawLine(A, B);
	      api.drawLine(A, S);
	      api.drawLine(A, E);
	      api.setColor("black");
	      api.drawCircle(A, 1);
	      api.drawCurve(curve);
	    }
	  },

	  drawCubic: function drawCubic(api, curve) {
	    var labels = ["start", "t=0.5", "end"];

	    api.reset();

	    api.setFill("black");
	    api.setColor("black");
	    api.lpts.forEach(function (p, i) {
	      api.drawCircle(p, 3);
	      api.text(labels[i], p, { x: 5, y: 2 });
	    });

	    api.setColor("lightblue");
	    api.drawGrid(10, 10);

	    if (api.lpts.length === 3) {
	      var S = api.lpts[0],
	          E = api.lpts[2],
	          B = api.lpts[1],
	          C = {
	        x: (S.x + E.x) / 2,
	        y: (S.y + E.y) / 2
	      };

	      api.setColor("blue");
	      api.drawLine(S, E);
	      api.drawLine(B, C);
	      api.drawCircle(C, 1);

	      var ratio = this.getCRatio(0.5),
	          A = {
	        x: B.x + (B.x - C.x) / ratio,
	        y: B.y + (B.y - C.y) / ratio
	      },
	          selen = api.utils.dist(S, E),
	          bclen_min = selen / 8,
	          bclen = api.utils.dist(B, C),
	          aesthetics = 4,
	          be12dist = bclen_min + bclen / aesthetics,
	          bx = be12dist * (E.x - S.x) / selen,
	          by = be12dist * (E.y - S.y) / selen,
	          e1 = {
	        x: B.x - bx,
	        y: B.y - by
	      },
	          e2 = {
	        x: B.x + bx,
	        y: B.y + by
	      },
	          v1 = {
	        x: A.x + (e1.x - A.x) * 2,
	        y: A.y + (e1.y - A.y) * 2
	      },
	          v2 = {
	        x: A.x + (e2.x - A.x) * 2,
	        y: A.y + (e2.y - A.y) * 2
	      },
	          nc1 = {
	        x: S.x + (v1.x - S.x) * 2,
	        y: S.y + (v1.y - S.y) * 2
	      },
	          nc2 = {
	        x: E.x + (v2.x - E.x) * 2,
	        y: E.y + (v2.y - E.y) * 2
	      };

	      curve = new api.Bezier([S, nc1, nc2, E]);
	      api.drawLine(e1, e2);
	      api.setColor("lightgrey");
	      api.drawLine(A, C);
	      api.drawLine(A, v1);
	      api.drawLine(A, v2);
	      api.drawLine(S, nc1);
	      api.drawLine(E, nc2);
	      api.drawLine(nc1, nc2);
	      api.setColor("black");
	      api.drawCircle(A, 1);
	      api.drawCircle(nc1, 1);
	      api.drawCircle(nc2, 1);
	      api.drawCurve(curve);
	    }
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "Given the preceding section on curve manipulation, we can also generate quadratic and cubic curves from any three points. However, unlike circle-fitting, which requires just three points, Bézier curve fitting requires three points, as well as a ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value, so we can figure out where point 'C' needs to be."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The following graphic lets you place three points, and will use the preceding sections on the ABC ratio and curve construction to form a quadratic curve through them. You can move the points you've placed around by click-dragging, or try a new curve by drawing new points with pure clicks. (There's some freedom here, so for illustrative purposes we clamped ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " to simply be 0.5, lets us bypass some maths, since a ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value of 0.5 always puts C in the middle of the start--end line segment)"
	      ),
	      React.createElement(Graphic, { preset: "generate", title: "Fitting a quadratic Bézier curve", setup: this.setup, draw: this.drawQuadratic,
	        onClick: this.onClick }),
	      React.createElement(
	        "p",
	        null,
	        "For cubic curves we also need some values to construct the \"de Casteljau line through B\" with, and that gives us quite a bit of choice. Since we've clamped ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " to 0.5, we'll set up a line through B parallel to the line start--end, with a length that is proportional to the length of the line B--C: the further away from the baseline B is, the wider its construction line will be, and so the more \"bulby\" the curve will look. This still gives us some freedom in terms of exactly how to scale the length of the construction line as we move B closer or further away from the baseline, so I simply picked some values that sort-of-kind-of look right in that if a circle through (start,B,end) forms a perfect hemisphere, the cubic curve constructed forms something close to a hemisphere, too, and if the points lie on a line, then the curve constructed has the control points very close to B, while still lying between B and the correct curve end point:"
	      ),
	      React.createElement(Graphic, { preset: "generate", title: "Fitting a cubic Bézier curve", setup: this.setup, draw: this.drawCubic,
	        onClick: this.onClick }),
	      React.createElement(
	        "p",
	        null,
	        "In each graphic, the blue parts are the values that we \"just have\" simply by setting up our three points, combined with our decision on which ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value to use (and construction line orientation and length for cubic curves). There are of course many ways to determine a combination of ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " and tangent values that lead to a more \"æsthetic\" curve, but this will be left as an exercise to the reader, since there are many, and æsthetics are often quite personal."
	      )
	    );
	  }
	});

	module.exports = PointCurves;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var SectionHeader = __webpack_require__(15);

	var CatmullRomConversion = React.createClass({
	  displayName: "CatmullRomConversion",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Bézier curves and Catmull-Rom curves"
	    };
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "Taking an excursion to different splines, the other common design curve is the ",
	        React.createElement(
	          "a",
	          { href: "https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Catmull.E2.80.93Rom_spline" },
	          "Catmull-Rom spline"
	        ),
	        ". Now, a Catmull-Rom spline is a form of cubic Hermite spline, and as it so happens the cubic Bézier curve is also a cubic Hermite spline, so maybe... maybe we can convert one into the other, and back, with some simple substitutions?"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Unlike Bézier curves, Catmull-Rom splines pass through each point used to define the curve, except the first and last, which makes sense if you read the \"natural language\" description for how a Catmull-Rom spline works: a Catmull-Rom spline is a curve that, at each point P",
	        React.createElement(
	          "sub",
	          null,
	          "x"
	        ),
	        ", has a tangent along the line P",
	        React.createElement(
	          "sub",
	          null,
	          "x-1"
	        ),
	        " to P",
	        React.createElement(
	          "sub",
	          null,
	          "x+1"
	        ),
	        ". The curve runs from points P",
	        React.createElement(
	          "sub",
	          null,
	          "2"
	        ),
	        " to  P",
	        React.createElement(
	          "sub",
	          null,
	          "n-1"
	        ),
	        ", and has a \"tension\" that determines how fast the curve passes through each point. The lower the tension, the faster the curve goes through each point, and the bigger its local tangent is."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "I'll be showing the conversion to and from Catmull-Rom curves for the tension that the Processing language uses for its Catmull-Rom algorithm."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We start with showing the Catmull-Rom matrix form:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/5fc1c44e623f2a9fbeefdaa204557479e3debf5a.svg", style: { width: "30.150000000000002rem", height: "5.70015rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "However, there's something funny going on here: the coordinate column matrix looks weird. The reason is that Catmull-Rom curves are actually curve segments that are described by two points, and two tangents; the curve leaves a point V1 (if we have four coordinates instead, this is coordinate 2), arriving at a point V2 (coordinate 3), with the curve departing V1 with a tangent vector V'1 (equal to the tangent from coordinate 1 to coordinate 3) and arriving at V2 with tangent vector V'2 (equal to the tangent from coordinate 2 to coordinate 4). So if we want to express this as a matrix form based on four coordinates, we get this representation instead:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/40b9ca9b5755a4be49517ddfa630fef7b8e23067.svg", style: { width: "29.475rem", height: "6.525rem" } })
	      ),
	      React.createElement(
	        "div",
	        { className: "note" },
	        React.createElement(
	          "h2",
	          null,
	          "Where did that 2 come from?"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Catmull-Rom splines are based on the concept of tension: the higher the tensions, the shorter the tangents at the departure and arrival points. The basic Catmull-Rom curve arrives and departs with tangents equal to half the distance between the two adjacent points, so that's where that 2 came from."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "However, the \"real\" matrix is this:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/7bf9b5e971866babedd991ccdde5c4ab104297e5.svg", style: { width: "24.75rem", height: "6.60015rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "This bakes in the tension factor τ explicitly."
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Plugging this into the \"two coordinates and two tangent vectors\" matrix form, we get:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/4818f8797c35f23c2b9883aa986b1129b2fa151a.svg", style: { width: "21.45015rem", height: "5.70015rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/08f77989369f664cbc0fb7526791efd4c5299d70.svg", style: { width: "35.47485rem", height: "5.47515rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/c7ae769c5370469b16523bab6f34abf0dd6749be.svg", style: { width: "28.425150000000002rem", height: "5.54985rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So let's find out which transformation matrix we need in order to convert from Catmull-Rom to Bézier:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/7250f1c57e2bd66ec4349e4e88db4d5d74401a06.svg", style: { width: "50.85rem", height: "5.54985rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The difference is somewhere in the actual hermite matrix, since the ",
	        React.createElement(
	          "em",
	          null,
	          "t"
	        ),
	        " and coordinate values are identical, so let's solve that matrix equasion:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/8a42b24fca3aaf6b8ec08e84b7e91c43e26e8acf.svg", style: { width: "28.575rem", height: "5.54985rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We left-multiply both sides by the inverse of the Bézier matrix, to get rid of the Bézier matrix on the right side of the equals sign:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/0e111d6e846f4d7204dec484005f74993e66c6c9.svg", style: { width: "58.19985rem", height: "5.70015rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Which gives us:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/f94b80113772d90a4fbc93d4495cb5767e5c8123.svg", style: { width: "12.6rem", height: "5.47515rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Multiplying this ",
	        React.createElement(
	          "strong",
	          null,
	          React.createElement(
	            "em",
	            null,
	            "A"
	          )
	        ),
	        " with our coordinates will give us a proper Bézier matrix expression again:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/d088274e440ceeac2916a0f32176682d776c1c57.svg", style: { width: "31.725rem", height: "5.47515rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/9e68f80b270d3445d9f9cb28ff2c5aed219aa9d2.svg", style: { width: "25.650000000000002rem", height: "6.60015rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So a Catmull-Rom to Bézier conversion, based on coordinates, requires turning the Catmull-Rom coordinates on the left into the Bézier coordinates on the right (with τ being our tension factor):"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/f0c5a707b590eaf8899a927ce39fd186a6acecf3.svg", style: { width: "18.07515rem", height: "6.67485rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "And the other way around, a Bézier to Catmull-Rom conversion requires turning the Bézier coordinates on the left this time into the Catmull-Rom coordinates on the right. Note that there is no tension this time, because Bézier curves don't have any. Converting from Bézier to Catmull-Rom is simply a default-tension Catmull-Rom curve:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/51da95daf2645abd9903a4e28749a6d01826625c.svg", style: { width: "21.150000000000002rem", height: "5.625rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Done. We can now draw the curves we want using either Bézier curves or Catmull-Rom splines, the choice mostly being which drawing algorithms we have natively available."
	      )
	    );
	  }
	});

	module.exports = CatmullRomConversion;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);
	var keyHandling = __webpack_require__(18);

	var CatmullRomMoulding = React.createClass({
	  displayName: "CatmullRomMoulding",

	  statics: {
	    keyHandlingOptions: {
	      propName: "distance",
	      values: {
	        "38": 1, // up arrow
	        "40": -1 // down arrow
	      }
	    }
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Creating a Catmull-Rom curve from three points"
	    };
	  },

	  setup: function setup(api) {
	    api.setPanelCount(3);
	    api.lpts = [{ x: 56, y: 153 }, { x: 144, y: 83 }, { x: 188, y: 185 }];
	    api.distance = 0;
	  },

	  convert: function convert(p1, p2, p3, p4) {
	    var t = 0.5;
	    return [p2, {
	      x: p2.x + (p3.x - p1.x) / (6 * t),
	      y: p2.y + (p3.y - p1.y) / (6 * t)
	    }, {
	      x: p3.x - (p4.x - p2.x) / (6 * t),
	      y: p3.y - (p4.y - p2.y) / (6 * t)
	    }, p3];
	  },

	  draw: function draw(api) {
	    api.reset();
	    api.setColor("lightblue");
	    api.drawGrid(10, 10);

	    var pts = api.lpts;
	    api.setColor("black");
	    api.setFill("black");
	    pts.forEach(function (p, pos) {
	      api.drawCircle(p, 3);
	      api.text("point " + (pos + 1), p, { x: 10, y: 7 });
	    });

	    var w = api.getPanelWidth();
	    var h = api.getPanelHeight();
	    var offset = { x: w, y: 0 };
	    api.setColor("lightblue");
	    api.drawGrid(10, 10, offset);
	    api.setColor("black");
	    api.drawLine({ x: 0, y: 0 }, { x: 0, y: h }, offset);

	    pts.forEach(function (p, pos) {
	      api.drawCircle(p, 3, offset);
	    });
	    var p1 = pts[0],
	        p2 = pts[1],
	        p3 = pts[2];
	    var dx = p3.x - p1.x,
	        dy = p3.y - p1.y,
	        m = Math.sqrt(dx * dx + dy * dy);
	    dx /= m;
	    dy /= m;
	    api.drawLine(p1, p3, offset);

	    var p0 = {
	      x: p1.x + (p3.x - p2.x) - api.distance * dx,
	      y: p1.y + (p3.y - p2.y) - api.distance * dy
	    };
	    var p4 = {
	      x: p1.x + (p3.x - p2.x) + api.distance * dx,
	      y: p1.y + (p3.y - p2.y) + api.distance * dy
	    };
	    var center = api.utils.lli4(p1, p3, p2, {
	      x: (p0.x + p4.x) / 2,
	      y: (p0.y + p4.y) / 2
	    });
	    api.setColor("blue");
	    api.drawCircle(center, 3, offset);
	    api.drawLine(pts[1], center, offset);
	    api.setColor("#666");
	    api.drawLine(center, p0, offset);
	    api.drawLine(center, p4, offset);

	    api.setFill("blue");
	    api.text("p0", p0, { x: -20 + offset.x, y: offset.y + 2 });
	    api.text("p4", p4, { x: +10 + offset.x, y: offset.y + 2 });

	    // virtual point p0
	    api.setColor("red");
	    api.drawCircle(p0, 3, offset);
	    api.drawLine(p2, p0, offset);
	    api.drawLine(p1, {
	      x: p1.x + (p2.x - p0.x) / 5,
	      y: p1.y + (p2.y - p0.y) / 5
	    }, offset);

	    // virtual point p4
	    api.setColor("#00FF00");
	    api.drawCircle(p4, 3, offset);
	    api.drawLine(p2, p4, offset);
	    api.drawLine(p3, {
	      x: p3.x + (p4.x - p2.x) / 5,
	      y: p3.y + (p4.y - p2.y) / 5
	    }, offset);

	    // Catmull-Rom curve for p0-p1-p2-p3-p4
	    var c1 = new api.Bezier(this.convert(p0, p1, p2, p3)),
	        c2 = new api.Bezier(this.convert(p1, p2, p3, p4));
	    api.setColor("lightgrey");
	    api.drawCurve(c1, offset);
	    api.drawCurve(c2, offset);

	    offset.x += w;
	    api.setColor("lightblue");
	    api.drawGrid(10, 10, offset);
	    api.setColor("black");
	    api.drawLine({ x: 0, y: 0 }, { x: 0, y: h }, offset);

	    api.drawCurve(c1, offset);
	    api.drawCurve(c2, offset);
	    api.drawPoints(c1.points, offset);
	    api.drawPoints(c2.points, offset);
	    api.setColor("lightgrey");
	    api.drawLine(c1.points[0], c1.points[1], offset);
	    api.drawLine(c1.points[2], c2.points[1], offset);
	    api.drawLine(c2.points[2], c2.points[3], offset);
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "Now, we saw how to fit a Bézier curve to three points, but if Catmull-Rom curves go through points, why can't we just use those to do curve fitting, instead?"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "As a matter of fact, we can, but there's a difference between the kind of curve fitting we did in the previous section, and the kind of curve fitting that we can do with Catmull-Rom curves. In the previous section we came up with a single curve that goes through three points. There was a decent amount of maths and computation involved, and the end result was three or four coordinates that described a single curve, depending on whether we were fitting a quadratic or cubic curve."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Using Catmull-Rom curves, we need virtually no computation, but even though we end up with one Catmull-Rom curve of ",
	        React.createElement(
	          "i",
	          null,
	          "n"
	        ),
	        " points, in order to draw the equivalent curve using cubic Bézier curves we need a massive ",
	        React.createElement(
	          "i",
	          null,
	          "3n-1"
	        ),
	        " points (and that's without double-counting points that are shared by consecutive cubic curves)."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "In the following graphic, on the left we see three points that we want to draw a Catmull-Rom curve through (which we can move around freely, by the way), with in the second panel some of the \"interesting\" Catmull-Rom information: in black there's the baseline start--end, which will act as tangent orientation for the curve at point p2. We also see a virtual point p0 and p4, which are initially just point p2 reflected over the baseline. However, by using the up and down cursor key we can offset these points parallel to the baseline. Why would we want to do this? Because the line p0--p2 acts as departure tangent at p1, and the line p2--p4 acts as arrival tangent at p3. Play around with the graphic a bit to get an idea of what all of that meant:"
	      ),
	      React.createElement(Graphic, { preset: "threepanel", title: "Catmull-Rom curve fitting", setup: this.setup, draw: this.draw, onKeyDown: this.props.onKeyDown }),
	      React.createElement(
	        "p",
	        null,
	        "As should be obvious by now, Catmull-Rom curves are great for \"fitting a curvature to some points\", but if we want to convert that curve to Bézier form we're going to end up with a lot of separate (but visually joined) Bézier curves. Depending on what we want to do, that'll be either unnecessary work, or exactly what we want: which it is depends entirely on you."
	      )
	    );
	  }
	});

	module.exports = keyHandling(CatmullRomMoulding);

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var atan2 = Math.atan2,
	    sqrt = Math.sqrt,
	    sin = Math.sin,
	    cos = Math.cos;

	var PolyBezier = React.createClass({
	  displayName: "PolyBezier",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Forming poly-Bézier curves"
	    };
	  },

	  setupQuadratic: function setupQuadratic(api) {
	    var w = api.getPanelWidth(),
	        h = api.getPanelHeight(),
	        cx = w / 2,
	        cy = h / 2,
	        pad = 40,
	        pts = [
	    // first curve:
	    { x: cx, y: pad }, { x: w - pad, y: pad }, { x: w - pad, y: cy },
	    // subsequent curve
	    { x: w - pad, y: h - pad }, { x: cx, y: h - pad },
	    // subsequent curve
	    { x: pad, y: h - pad }, { x: pad, y: cy },
	    // final curve control point
	    { x: pad, y: pad }];
	    api.lpts = pts;
	  },

	  setupCubic: function setupCubic(api) {
	    var w = api.getPanelWidth(),
	        h = api.getPanelHeight(),
	        cx = w / 2,
	        cy = h / 2,
	        pad = 40,
	        r = (w - 2 * pad) / 2,
	        k = 0.55228,
	        kr = k * r,
	        pts = [
	    // first curve:
	    { x: cx, y: pad }, { x: cx + kr, y: pad }, { x: w - pad, y: cy - kr }, { x: w - pad, y: cy },
	    // subsequent curve
	    { x: w - pad, y: cy + kr }, { x: cx + kr, y: h - pad }, { x: cx, y: h - pad },
	    // subsequent curve
	    { x: cx - kr, y: h - pad }, { x: pad, y: cy + kr }, { x: pad, y: cy },
	    // final curve control point
	    { x: pad, y: cy - kr }, { x: cx - kr, y: pad }];
	    api.lpts = pts;
	  },

	  movePointsQuadraticLD: function movePointsQuadraticLD(api, i) {
	    // ...we need to move _everything_
	    var anchor, fixed, toMove;
	    for (var p = 1; p < 4; p++) {
	      anchor = i + (2 * p - 2) + api.lpts.length;
	      anchor = api.lpts[anchor % api.lpts.length];
	      fixed = i + (2 * p - 1);
	      fixed = api.lpts[fixed % api.lpts.length];
	      toMove = i + 2 * p;
	      toMove = api.lpts[toMove % api.lpts.length];

	      toMove.x = fixed.x + (fixed.x - anchor.x);
	      toMove.y = fixed.y + (fixed.y - anchor.y);
	    }
	    // then, the furthest point cannot be computed properly!
	    toMove = i + 6;
	    toMove = api.lpts[toMove % api.lpts.length];
	    api.problem = toMove;
	  },

	  movePointsCubicLD: function movePointsCubicLD(api, i) {
	    var toMove, fixed;
	    if (i % 3 === 1) {
	      fixed = i - 1;
	      fixed += fixed < 0 ? api.lpts.length : 0;
	      toMove = i - 2;
	      toMove += toMove < 0 ? api.lpts.length : 0;
	    } else {
	      fixed = (i + 1) % api.lpts.length;
	      toMove = (i + 2) % api.lpts.length;
	    }
	    fixed = api.lpts[fixed];
	    toMove = api.lpts[toMove];
	    toMove.x = fixed.x + (fixed.x - api.mp.x);
	    toMove.y = fixed.y + (fixed.y - api.mp.y);
	  },

	  linkDerivatives: function linkDerivatives(evt, api) {
	    if (api.mp) {
	      var quad = api.lpts.length === 8;
	      var i = api.mp_idx;
	      if (quad) {
	        if (i % 2 !== 0) {
	          this.movePointsQuadraticLD(api, i);
	        }
	      } else {
	        if (i % 3 !== 0) {
	          this.movePointsCubicLD(api, i);
	        }
	      }
	    }
	  },

	  movePointsQuadraticDirOnly: function movePointsQuadraticDirOnly(api, i) {
	    // ...we need to move _everything_  ...again
	    var anchor, fixed, toMove;

	    // move left and right
	    [-1, 1].forEach(function (v) {
	      anchor = api.mp;
	      fixed = i + v + api.lpts.length;
	      fixed = api.lpts[fixed % api.lpts.length];
	      toMove = i + 2 * v + api.lpts.length;
	      toMove = api.lpts[toMove % api.lpts.length];
	      var a = atan2(fixed.y - anchor.y, fixed.x - anchor.x),
	          dx = toMove.x - fixed.x,
	          dy = toMove.y - fixed.y,
	          d = sqrt(dx * dx + dy * dy);
	      toMove.x = fixed.x + d * cos(a);
	      toMove.y = fixed.y + d * sin(a);
	    });

	    // then, the furthest point cannot be computed properly!
	    toMove = i + 4;
	    toMove = api.lpts[toMove % api.lpts.length];
	    api.problem = toMove;
	  },

	  movePointsCubicDirOnly: function movePointsCubicDirOnly(api, i) {
	    var toMove, fixed;
	    if (i % 3 === 1) {
	      fixed = i - 1;
	      fixed += fixed < 0 ? api.lpts.length : 0;
	      toMove = i - 2;
	      toMove += toMove < 0 ? api.lpts.length : 0;
	    } else {
	      fixed = (i + 1) % api.lpts.length;
	      toMove = (i + 2) % api.lpts.length;
	    }
	    fixed = api.lpts[fixed];
	    toMove = api.lpts[toMove];
	    var a = atan2(fixed.y - api.mp.y, fixed.x - api.mp.x),
	        dx = toMove.x - fixed.x,
	        dy = toMove.y - fixed.y,
	        d = sqrt(dx * dx + dy * dy);
	    toMove.x = fixed.x + d * cos(a);
	    toMove.y = fixed.y + d * sin(a);
	  },

	  linkDirection: function linkDirection(evt, api) {
	    if (api.mp) {
	      var quad = api.lpts.length === 8;
	      var i = api.mp_idx;
	      if (quad) {
	        if (i % 2 !== 0) {
	          this.movePointsQuadraticDirOnly(api, i);
	        }
	      } else {
	        if (i % 3 !== 0) {
	          this.movePointsCubicDirOnly(api, i);
	        }
	      }
	    }
	  },

	  bufferPoints: function bufferPoints(evt, api) {
	    api.bpts = JSON.parse(JSON.stringify(api.lpts));
	  },

	  moveQuadraticPoint: function moveQuadraticPoint(api, i) {
	    this.moveCubicPoint(api, i);

	    // then move the other control points
	    [-1, 1].forEach(function (v) {
	      var anchor = i - v + api.lpts.length;
	      anchor = api.lpts[anchor % api.lpts.length];
	      var fixed = i - 2 * v + api.lpts.length;
	      fixed = api.lpts[fixed % api.lpts.length];
	      var toMove = i - 3 * v + api.lpts.length;
	      toMove = api.lpts[toMove % api.lpts.length];
	      var a = atan2(fixed.y - anchor.y, fixed.x - anchor.x),
	          dx = toMove.x - fixed.x,
	          dy = toMove.y - fixed.y,
	          d = sqrt(dx * dx + dy * dy);
	      toMove.x = fixed.x + d * cos(a);
	      toMove.y = fixed.y + d * sin(a);
	    });

	    // then signal a problem
	    var toMove = i + 4;
	    toMove = api.lpts[toMove % api.lpts.length];
	    api.problem = toMove;
	  },

	  moveCubicPoint: function moveCubicPoint(api, i) {
	    var op = api.bpts[i],
	        np = api.lpts[i],
	        dx = np.x - op.x,
	        dy = np.y - op.y,
	        len = api.lpts.length,
	        l = i - 1 + len,
	        r = i + 1,

	    // original left and right
	    ol = api.bpts[l % len],
	        or = api.bpts[r % len],

	    // current left and right
	    nl = api.lpts[l % len],
	        nr = api.lpts[r % len];
	    // update current left
	    nl.x = ol.x + dx;
	    nl.y = ol.y + dy;
	    // update current right
	    nr.x = or.x + dx;
	    nr.y = or.y + dy;
	    return { x: dx, y: dy };
	  },

	  modelCurve: function modelCurve(evt, api) {
	    if (api.mp) {
	      var quad = api.lpts.length === 8;
	      var i = api.mp_idx;
	      if (quad) {
	        if (i % 2 !== 0) {
	          this.movePointsQuadraticDirOnly(api, i);
	        } else {
	          this.moveQuadraticPoint(api, i);
	        }
	      } else {
	        if (i % 3 !== 0) {
	          this.movePointsCubicDirOnly(api, i);
	        } else {
	          this.moveCubicPoint(api, i);
	        }
	      }
	    }
	  },

	  draw: function draw(api, curves) {
	    api.reset();
	    var pts = api.lpts;
	    var quad = pts.length === 8;

	    var c1 = quad ? new api.Bezier(pts[0], pts[1], pts[2]) : new api.Bezier(pts[0], pts[1], pts[2], pts[3]);
	    api.drawSkeleton(c1, false, true);
	    api.drawCurve(c1);

	    var c2 = quad ? new api.Bezier(pts[2], pts[3], pts[4]) : new api.Bezier(pts[3], pts[4], pts[5], pts[6]);
	    api.drawSkeleton(c2, false, true);
	    api.drawCurve(c2);

	    var c3 = quad ? new api.Bezier(pts[4], pts[5], pts[6]) : new api.Bezier(pts[6], pts[7], pts[8], pts[9]);
	    api.drawSkeleton(c3, false, true);
	    api.drawCurve(c3);

	    var c4 = quad ? new api.Bezier(pts[6], pts[7], pts[0]) : new api.Bezier(pts[9], pts[10], pts[11], pts[0]);
	    api.drawSkeleton(c4, false, true);
	    api.drawCurve(c4);

	    if (api.problem) {
	      api.setColor("red");
	      api.drawCircle(api.problem, 5);
	    }
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "Much like lines can be chained together to form polygons, Bézier curves can be chained together to form poly-Béziers, and the only trick required is to make sure that:"
	      ),
	      React.createElement(
	        "ol",
	        null,
	        React.createElement(
	          "li",
	          null,
	          "the end point of each section is the starting point of the following section, and"
	        ),
	        React.createElement(
	          "li",
	          null,
	          "the derivatives across that dual point line up."
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Unless, of course, you want discontinuities; then you don't even need 2."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We'll cover three forms of poly-Bézier curves in this section. First, we'll look at the kind that just follows point 1. where the end point of a segment is the same point as the start point of the next segment. This leads to poly-Béziers that are pretty hard to work with, but they're the easiest to implement:"
	      ),
	      React.createElement(Graphic, { preset: "poly", title: "Unlinked quadratic poly-Bézier", setup: this.setupQuadratic, draw: this.draw }),
	      React.createElement(Graphic, { preset: "poly", title: "Unlinked cubic poly-Bézier", setup: this.setupCubic, draw: this.draw }),
	      React.createElement(
	        "p",
	        null,
	        "Dragging the control points around only affects the curve segments that the control point belongs to, and moving an on-curve point leaves the control points where they are, which is not the most useful for practical modelling purposes. So, let's add in the logic we need to make things a little better. We'll start by linking up control points by ensuring that the \"incoming\" derivative at an on-curve point is the same as it's \"outgoing\" derivative:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/37740bb1a0b7b1ff48bf3454e52295fc717cacbb.svg", style: { width: "8.400150000000002rem", height: "1.27485rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We can effect this quite easily, because we know that the vector from a curve's last control point to its last on-curve point is equal to the derivative vector. If we want to ensure that the first control point of the next curve matches that, all we have to do is mirror that last control point through the last on-curve point. And mirroring any point A through any point B is really simple:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/ce6e3939608c4ed0598107b06543c2301b91bb7f.svg", style: { width: "21.97485rem", height: "2.7rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So let's implement that and see what it gets us. The following two graphics show a quadratic and a cubic poly-Bézier curve again, but this time moving the control points around moves others, too. However, you might see something unexpected going on for quadratic curves..."
	      ),
	      React.createElement(Graphic, { preset: "poly", title: "Loosely connected quadratic poly-Bézier", setup: this.setupQuadratic, draw: this.draw,
	        onMouseMove: this.linkDerivatives }),
	      React.createElement(Graphic, { preset: "poly", title: "Loosely connected cubic poly-Bézier", setup: this.setupCubic, draw: this.draw,
	        onMouseMove: this.linkDerivatives }),
	      React.createElement(
	        "p",
	        null,
	        "As you can see, quadratic curves are particularly ill-suited for poly-Bézier curves, as all the control points are effectively linked. Move one of them, and you move all of them. Not only that, but if we move the on-curve points, it's possible to get a situation where a control point's positions is different depending on whether it's the reflection of its left or right neighbouring control point: we can't even form a proper rule-conforming curve! This means that we cannot use quadratic poly-Béziers for anything other than really, really simple shapes. And even then, they're probably the wrong choice. Cubic curves are pretty decent, but the fact that the derivatives are linked means we can't manipulate curves as well as we might if we relaxed the constraints a little."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So: let's relax the requirement a little."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We can change the constraint so that we still preserve the ",
	        React.createElement(
	          "em",
	          null,
	          "angle"
	        ),
	        " of the derivatives across sections (so transitions from one section to the next will still look natural), but give up the requirement that they should also have the same ",
	        React.createElement(
	          "em",
	          null,
	          "vector length"
	        ),
	        ". Doing so will give us a much more useful kind of poly-Bézier curve:"
	      ),
	      React.createElement(Graphic, { preset: "poly", title: "Loosely connected quadratic poly-Bézier", setup: this.setupQuadratic, draw: this.draw, onMouseMove: this.linkDirection }),
	      React.createElement(Graphic, { preset: "poly", title: "Loosely connected cubic poly-Bézier", setup: this.setupCubic, draw: this.draw, onMouseMove: this.linkDirection }),
	      React.createElement(
	        "p",
	        null,
	        "Cubic curves are now better behaved when it comes to dragging control points around, but the quadratic poly-Bézier still has the problem that moving one control points will move the control points and may ending up defining \"the next\" control point in a way that doesn't work. Quadratic curves really aren't very useful to work with..."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Finally, we also want to make sure that moving the on-curve coordinates preserves the relative positions of the associated control points. With that, we get to the kind of curve control that you might be familiar with from applications like Photoshop, Inkscape, Blender, etc."
	      ),
	      React.createElement(Graphic, { preset: "poly", title: "Loosely connected quadratic poly-Bézier", setup: this.setupQuadratic, draw: this.draw,
	        onMouseDown: this.bufferPoints, onMouseMove: this.modelCurve }),
	      React.createElement(Graphic, { preset: "poly", title: "Loosely connected cubic poly-Bézier", setup: this.setupCubic, draw: this.draw,
	        onMouseDown: this.bufferPoints, onMouseMove: this.modelCurve }),
	      React.createElement(
	        "p",
	        null,
	        "Again, we see that cubic curves are now rather nice to work with, but quadratic curves have a new, very serious problem: we can move an on-curve point in such a way that we can't compute what needs to \"happen next\". Move the top point down, below the left and right points, for instance. There is no way to preserve correct control points without a kink at the bottom point. Quadratic curves: just not that good..."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "A final improvement is to offer fine-level control over which points behave which, so that you can have \"kinks\" or individually controlled segments when you need them, with nicely well-behaved curves for the rest of the path. Implementing that, is left as an excercise for the reader."
	      )
	    );
	  }
	});

	module.exports = PolyBezier;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var modes = ["unite", "intersect", "exclude", "subtract"];

	var Shapes = React.createClass({
	  displayName: "Shapes",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Boolean shape operations"
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      mode: modes[0]
	    };
	  },

	  setMode: function setMode(mode) {
	    this.setState({ mode: mode });
	  },

	  formPath: function formPath(api, mx, my, w, h) {
	    mx = mx || 0;
	    my = my || 0;
	    var unit = 30;
	    var unit2 = unit / 2;
	    w = w || 8 * unit;
	    h = h || 4 * unit;
	    var w2 = w / 2;
	    var h2 = h / 2;
	    var ow3 = w2 / 3;
	    var oh3 = h2 / 3;

	    var Paper = api.Paper;
	    var Path = Paper.Path;
	    var Point = Paper.Point;
	    var path = new Path();

	    path.moveTo(new Point(mx - w2 + unit * 2, my - h2));
	    path.cubicCurveTo(new Point(mx - w2 + unit2, my - h2 + unit2), new Point(mx - w2 + unit2, my + h2 - unit2), new Point(mx - w2 + unit * 2, my + h2));
	    path.cubicCurveTo(new Point(mx - ow3, my + oh3), new Point(mx + ow3, my + oh3), new Point(mx + w2 - unit * 2, my + h2));
	    path.cubicCurveTo(new Point(mx + w2 - unit2, my + h2 - unit2), new Point(mx + w2 - unit2, my - h2 + unit2), new Point(mx + w2 - unit * 2, my - h2));
	    path.cubicCurveTo(new Point(mx + ow3, my - oh3), new Point(mx - ow3, my - oh3), new Point(mx - w2 + unit * 2, my - h2));
	    path.closePath(true);
	    path.strokeColor = "rgb(100,100,255)";
	    return path;
	  },

	  setup: function setup(api) {
	    var dim = api.getPanelWidth();
	    var pad = 40;
	    var cx = dim / 2;
	    var cy = dim / 2;
	    api.c1 = this.formPath(api, cx, cy);
	    cx += pad;
	    cy += pad;
	    api.c2 = this.formPath(api, cx, cy);
	    this.state.mode = modes[0];
	  },

	  onMouseMove: function onMouseMove(evt, api) {
	    var cx = evt.offsetX;
	    var cy = evt.offsetY;
	    api.c2.position = { x: cx, y: cy };
	  },

	  draw: function draw(api) {
	    if (api.c3) {
	      api.c3.remove();
	    }
	    var c1 = api.c1,
	        c2 = api.c2,
	        fn = c1[this.state.mode].bind(c1),
	        c3 = api.c3 = fn(c2);

	    c3.strokeColor = "red";
	    c3.fillColor = "rgba(255,100,100,0.4)";
	    api.Paper.view.draw();
	  },

	  render: function render() {
	    var _this = this;

	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "We can apply the topics covered so far in this primer to effect boolean shape operations: getting the union, intersection, or exclusion, between two or more shapes that involve Bézier curves. For simplicity (well.. sort of, more homogeneity), we'll be looking at Poly-Bézier shapes only, but a shape that consists of a mix of lines and Bézier curves is technically a simplification (although it does mean we need to write a definition for the class of shapes that mix lines and Bézier curves. Since poly-Bézier curves are a superset, we'll be using those in the following examples)"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The procedure for performing boolean operations consists, broadly, of four steps:"
	      ),
	      React.createElement(
	        "ol",
	        null,
	        React.createElement(
	          "li",
	          null,
	          "Find the intersection points between both shapes,"
	        ),
	        React.createElement(
	          "li",
	          null,
	          "cut up the shapes into multiple sections between these intersections,"
	        ),
	        React.createElement(
	          "li",
	          null,
	          "discard any section that isn't part of the desired operation's resultant shape, and"
	        ),
	        React.createElement(
	          "li",
	          null,
	          "link up the remaining sections to form the new shape."
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Finding all intersections between two poly-Bézier curves, or any poly-line-section shape, is similar to the iterative algorithm discussed in the section on curve/curve intersection. For each segment in the poly-Bézier curve we check whether its bounding box overlaps with any of the segment bounding boxes in the other poly-Bézier curve. If so, we run normal intersection detection."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "After we found all intersection points, we split up our poly-Bézier curves, making sure to record which of the newly formed poly-Bézier curves might potentially link up at the points we split the originals up at. This will let us quickly glue poly-Bézier curves back together after the next step."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Once we have all the new poly-Bézier curves, we run the first step of the desired boolean operation."
	      ),
	      React.createElement(
	        "ul",
	        null,
	        React.createElement(
	          "li",
	          null,
	          "Union: discard all poly-Bézier curves that lie \"inside\" our union of our shapes. E.g. if we want the union of two overlapping circles, the resulting shape is the outline."
	        ),
	        React.createElement(
	          "li",
	          null,
	          "Intersection: discard all poly-Bézier curves that lie \"outside\" the intersection of the two shapes. E.g. if we want the intersection of two overlapping circles, the resulting shape is the tapered ellipse where they overlap."
	        ),
	        React.createElement(
	          "li",
	          null,
	          "Exclusion: none of the sections are discarded, but we will need to link the shapes back up in a special way. Flip any section that would qualify for removal under UNION rules."
	        )
	      ),
	      React.createElement(
	        "table",
	        { className: "sketch" },
	        React.createElement(
	          "tbody",
	          null,
	          React.createElement(
	            "tr",
	            null,
	            React.createElement(
	              "td",
	              { className: "labeled-image" },
	              React.createElement("img", { src: "images/op_base.gif", height: "169px" }),
	              React.createElement(
	                "p",
	                null,
	                "Two overlapping shapes."
	              )
	            ),
	            React.createElement(
	              "td",
	              { className: "labeled-image" },
	              React.createElement("img", { src: "images/op_union.gif", height: "169px" }),
	              React.createElement(
	                "p",
	                null,
	                "The unified region."
	              )
	            ),
	            React.createElement(
	              "td",
	              { className: "labeled-image" },
	              React.createElement("img", { src: "images/op_intersection.gif", height: "169px" }),
	              React.createElement(
	                "p",
	                null,
	                "Their intersection."
	              )
	            ),
	            React.createElement(
	              "td",
	              { className: "labeled-image" },
	              React.createElement("img", { src: "images/op_exclusion.gif", height: "169px" }),
	              React.createElement(
	                "p",
	                null,
	                "Their exclusion regions."
	              )
	            )
	          )
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The main complication in the outlined procedure here is determining how sections qualify in terms of being \"inside\" and \"outside\" of our shapes. For this, we need to be able to perform point-in-shape detection, for which we'll use a classic algorithm: getting the \"crossing number\" by using ray casting, and then testing for \"insidedness\" by applying the ",
	        React.createElement(
	          "a",
	          { href: "http://folk.uio.no/bjornw/doc/bifrost-ref/bifrost-ref-12.html" },
	          "even-odd rule"
	        ),
	        ": For any point and any shape, we can cast a ray from our point, to some point that we know lies outside of the shape (such as a corner of our drawing surface). We then count how many times that line crosses our shape (remember that we can perform line/curve intersection detection quite easily). If the number of times it crosses the shape's outline is even, the point did not actually lie inside our shape. If the number of intersections is odd, our point did lie inside out shape. With that knowledge, we can decide whether to treat a section that such a point lies on \"needs removal\" (under union rules), \"needs preserving\" (under intersection rules), or \"needs flipping\" (under exclusion rules)."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "These operations are expensive, and implementing your own code for this is generally a bad idea if there is already a geometry package available for your language of choice. In this case, for JavaScript the most excellent ",
	        React.createElement(
	          "a",
	          { href: "http://paperjs.org" },
	          "Paper.js"
	        ),
	        " already comes with all the code in place to perform efficient boolean shape operations, so rather that implement an inferior version here, I can strongly recommend the Paper.js library if you intend to do any boolean shape work."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The following graphic shows Paper.js doing its thing for two shapes: one static, and one that is linked to your mouse pointer. If you move the mouse around, you'll see how the shape intersections are resolved. The base shapes are outlined in blue, and the boolean result is coloured red."
	      ),
	      React.createElement(
	        Graphic,
	        { preset: "simple", title: "Boolean shape operations with Paper.js", paperjs: true,
	          setup: this.setup, draw: this.draw, onMouseMove: this.onMouseMove },
	        React.createElement("br", null),
	        modes.map(function (mode) {
	          var className = _this.state.mode === mode ? "selected" : null;
	          return React.createElement(
	            "button",
	            { className: className, key: mode, onClick: function () {
	                this.setMode(mode);
	              }.bind(_this) },
	            mode
	          );
	        })
	      )
	    );
	  }
	});

	module.exports = Shapes;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var Projections = React.createClass({
	  displayName: "Projections",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Projecting a point onto a Bézier curve"
	    };
	  },

	  setup: function setup(api) {
	    api.setSize(320, 320);
	    var curve = new api.Bezier([{ x: 248, y: 188 }, { x: 218, y: 294 }, { x: 45, y: 290 }, { x: 12, y: 236 }, { x: 14, y: 82 }, { x: 186, y: 177 }, { x: 221, y: 90 }, { x: 18, y: 156 }, { x: 34, y: 57 }, { x: 198, y: 18 }]);
	    api.setCurve(curve);
	    api._lut = curve.getLUT();
	  },

	  findClosest: function findClosest(LUT, p, dist) {
	    var i,
	        end = LUT.length,
	        d,
	        dd = dist(LUT[0], p),
	        f = 0;
	    for (i = 1; i < end; i++) {
	      d = dist(LUT[i], p);
	      if (d < dd) {
	        f = i;dd = d;
	      }
	    }
	    return f / (end - 1);
	  },

	  draw: function draw(api, curve) {
	    api.reset();
	    api.drawSkeleton(curve);
	    api.drawCurve(curve);
	    if (api.mousePt) {
	      api.setColor("red");
	      api.setFill("red");
	      api.drawCircle(api.mousePt, 3);
	      // naive t value
	      var t = this.findClosest(api._lut, api.mousePt, api.utils.dist);
	      // no real point in refining for illustration purposes
	      var p = curve.get(t);
	      api.drawLine(p, api.mousePt);
	      api.drawCircle(p, 3);
	      api.text("t = " + api.utils.round(t, 2), p, { x: 10, y: 3 });
	    }
	  },

	  onMouseMove: function onMouseMove(evt, api) {
	    api.mousePt = { x: evt.offsetX, y: evt.offsetY };
	    api._lut = api.curve.getLUT();
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "Say we have a Bézier curve and some point, not on the curve, of which we want to know which ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value on the curve gives us an on-curve point closest to our off-curve point. Or: say we want to find the projection of a random point onto a curve. How do we do that?"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "If the Bézier curve is of low enough order, we might be able to ",
	        React.createElement(
	          "a",
	          { href: "http://jazzros.blogspot.ca/2011/03/projecting-point-on-bezier-curve.html" },
	          "work out the maths for how to do this"
	        ),
	        ", and get a perfect ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value back, but in general this is an incredibly hard problem and the easiest solution is, really, a numerical approach again. We'll be finding our ideal ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value using a ",
	        React.createElement(
	          "a",
	          { href: "https://en.wikipedia.org/wiki/Binary_search_algorithm" },
	          "binary search"
	        ),
	        ". First, we do a coarse distance-check based on ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " values associated with the curve's \"to draw\" coordinates (using a lookup table, or LUT). This is pretty fast. Then we run this algorithm:"
	      ),
	      React.createElement(
	        "ol",
	        null,
	        React.createElement(
	          "li",
	          null,
	          "with the ",
	          React.createElement(
	            "i",
	            null,
	            "t"
	          ),
	          " value we found, start with some small interval around ",
	          React.createElement(
	            "i",
	            null,
	            "t"
	          ),
	          " (1/length_of_LUT on either side is a reasonable start),"
	        ),
	        React.createElement(
	          "li",
	          null,
	          "if the distance to ",
	          React.createElement(
	            "i",
	            null,
	            "t ± interval/2"
	          ),
	          " is larger than the distance to ",
	          React.createElement(
	            "i",
	            null,
	            "t"
	          ),
	          ", try again with the interval reduced to half its original length."
	        ),
	        React.createElement(
	          "li",
	          null,
	          "if the distance to ",
	          React.createElement(
	            "i",
	            null,
	            "t ± interval/2"
	          ),
	          " is smaller than the distance to ",
	          React.createElement(
	            "i",
	            null,
	            "t"
	          ),
	          ", replace ",
	          React.createElement(
	            "i",
	            null,
	            "t"
	          ),
	          " with the smaller-distance value."
	        ),
	        React.createElement(
	          "li",
	          null,
	          "after reducing the interval, or changing ",
	          React.createElement(
	            "i",
	            null,
	            "t"
	          ),
	          ", go back to step 1."
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We keep repeating this process until the interval is small enough to claim the difference in precision found is irrelevant for the purpose we're trying to find ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " for. In this case, I'm arbitrarily fixing it at 0.0001."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The following graphic demonstrates the result of this procedure.Simply move the cursor around, and if it does not lie on top of the curve, you will see a line that projects the cursor onto the curve based on an iteratively found \"ideal\" ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value."
	      ),
	      React.createElement(Graphic, { preset: "simple", title: "Projecting a point onto a Bézier curve", setup: this.setup, draw: this.draw, onMouseMove: this.onMouseMove })
	    );
	  }
	});

	module.exports = Projections;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);
	var keyHandling = __webpack_require__(18);

	var Offsetting = React.createClass({
	  displayName: "Offsetting",

	  statics: {
	    keyHandlingOptions: {
	      propName: "distance",
	      values: {
	        "38": 1, // up arrow
	        "40": -1 // down arrow
	      }
	    }
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Curve offsetting"
	    };
	  },

	  setup: function setup(api, curve) {
	    api.setCurve(curve);
	    api.distance = 20;
	  },

	  setupQuadratic: function setupQuadratic(api) {
	    var curve = api.getDefaultQuadratic();
	    this.setup(api, curve);
	  },

	  setupCubic: function setupCubic(api) {
	    var curve = api.getDefaultCubic();
	    this.setup(api, curve);
	  },

	  draw: function draw(api, curve) {
	    api.reset();
	    api.drawSkeleton(curve);

	    var reduced = curve.reduce();
	    reduced.forEach(function (c) {
	      api.setRandomColor();
	      api.drawCurve(c);
	      api.drawCircle(c.points[0], 1);
	    });
	    var last = reduced.slice(-1)[0];
	    api.drawPoint(last.points[3] || last.points[2]);

	    api.setColor("red");
	    var offset = curve.offset(api.distance);
	    offset.forEach(function (c) {
	      api.drawPoint(c.points[0]);
	      api.drawCurve(c);
	    });
	    last = offset.slice(-1)[0];
	    api.drawPoint(last.points[3] || last.points[2]);

	    api.setColor("blue");
	    offset = curve.offset(-api.distance);
	    offset.forEach(function (c) {
	      api.drawPoint(c.points[0]);
	      api.drawCurve(c);
	    });
	    last = offset.slice(-1)[0];
	    api.drawPoint(last.points[3] || last.points[2]);
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "Perhaps you are like me, and you've been writing various small programs that use Bézier curves in some way or another, and at some point you make the step to implementing path extrusion. But you don't want to do it pixel based, you want to stay in the vector world. You find that extruding lines is relatively easy, and tracing outlines is coming along nicely (although junction caps and fillets are a bit of a hassle), and then decide to do things properly and add Bézier curves to the mix. Now you have a problem."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Unlike lines, you can't simply extrude a Bézier curve by taking a copy and moving it around, because of the curvatures; rather than a uniform thickness you get an extrusion that looks too thin in places, if you're lucky, but more likely will self-intersect. The trick, then, is to scale the curve, rather than simply copying it. But how do you scale a Bézier curve?"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Bottom line: ",
	        React.createElement(
	          "strong",
	          null,
	          "you can't"
	        ),
	        ". So you cheat. We're not going to do true curve scaling, or rather curve offsetting, because that's impossible. Instead we're going to try to generate 'looks good enough' offset curves."
	      ),
	      React.createElement(
	        "div",
	        { className: "note" },
	        React.createElement(
	          "h2",
	          null,
	          "\"What do you mean, you can't. Prove it.\""
	        ),
	        React.createElement(
	          "p",
	          null,
	          "First off, when I say \"you can't\" what I really mean is \"you can't offset a Bézier curve with another Bézier curve\". not even by using a really high order curve. You can find the function that describes the offset curve, but it won't be a polynomial, and as such it cannot be represented as a Bézier curve, which",
	          React.createElement(
	            "strong",
	            null,
	            "has"
	          ),
	          " to be a polynomial. Let's look at why this is:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "From a mathematical point of view, an offset curve ",
	          React.createElement(
	            "i",
	            null,
	            "O(t)"
	          ),
	          " is a curve such that, given our original curve",
	          React.createElement(
	            "i",
	            null,
	            "B(t)"
	          ),
	          ", any point on ",
	          React.createElement(
	            "i",
	            null,
	            "O(t)"
	          ),
	          " is a fixed distance ",
	          React.createElement(
	            "i",
	            null,
	            "d"
	          ),
	          " away from coordinate ",
	          React.createElement(
	            "i",
	            null,
	            "B(t)"
	          ),
	          ". So let's math that:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/3aff5cef0028337bbb48ae64ad30000c4d5e238f.svg", style: { width: "7.275150000000001rem", height: "1.125rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "However, we're working in 2D, and ",
	          React.createElement(
	            "i",
	            null,
	            "d"
	          ),
	          " is a single value, so we want to turn it into a vector. If we want a point distance ",
	          React.createElement(
	            "i",
	            null,
	            "d"
	          ),
	          " \"away\" from the curve ",
	          React.createElement(
	            "i",
	            null,
	            "B(t)"
	          ),
	          " then what we really mean is that we want a point at ",
	          React.createElement(
	            "i",
	            null,
	            "d"
	          ),
	          " times the \"normal vector\" from point ",
	          React.createElement(
	            "i",
	            null,
	            "B(t)"
	          ),
	          ", where the \"normal\" is a vector that runs perpendicular (\"at a right angle\") to the tangent at ",
	          React.createElement(
	            "i",
	            null,
	            "B(t)"
	          ),
	          ". Easy enough:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/2cf48e2f8525258a3fa0fe4f10ec2acef67104b3.svg", style: { width: "10.125rem", height: "1.125rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Now this still isn't very useful unless we know what the formula for ",
	          React.createElement(
	            "i",
	            null,
	            "N(t)"
	          ),
	          " is, so let's find out.",
	          React.createElement(
	            "i",
	            null,
	            "N(t)"
	          ),
	          " runs perpendicular to the original curve tangent, and we know that the tangent is simply",
	          React.createElement(
	            "i",
	            null,
	            "B'(t)"
	          ),
	          ", so we could just rotate that 90 degrees and be done with it. However, we need to ensure that ",
	          React.createElement(
	            "i",
	            null,
	            "N(t)"
	          ),
	          " has the same magnitude for every ",
	          React.createElement(
	            "i",
	            null,
	            "t"
	          ),
	          ", or the offset curve won't be at a uniform distance, thus not being an offset curve at all. The easiest way to guarantee this is to make sure",
	          React.createElement(
	            "i",
	            null,
	            "N(t)"
	          ),
	          " always has length 1, which we can achieve by dividing ",
	          React.createElement(
	            "i",
	            null,
	            "B'(t)"
	          ),
	          " by its magnitude:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/664fba98ea17b358941b579115bf063edf87ae17.svg", style: { width: "9.450000000000001rem", height: "3.15rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Determining the length requires computing an arc length, and this is where things get Tricky with a capital T. First off, to compute arc length from some start ",
	          React.createElement(
	            "i",
	            null,
	            "a"
	          ),
	          " to end ",
	          React.createElement(
	            "i",
	            null,
	            "b"
	          ),
	          ", we must use the formula we saw earlier. Noting that \"length\" is usually denoted with double vertical bars:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/f6d8c2965b02363e092acb00bbc1398cfbb170a4.svg", style: { width: "12.45015rem", height: "2.6248500000000003rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "So if we want the length of the tangent, we plug in ",
	          React.createElement(
	            "i",
	            null,
	            "B'(t)"
	          ),
	          ", with ",
	          React.createElement(
	            "i",
	            null,
	            "t = 0"
	          ),
	          " as start and",
	          React.createElement(
	            "i",
	            null,
	            "t = 1"
	          ),
	          " as end:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/1f024282044316a9e4b3de2c855d2ceb96aff056.svg", style: { width: "15.150150000000002rem", height: "2.6248500000000003rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "And that's where things go wrong. It doesn't even really matter what the second derivative for ",
	          React.createElement(
	            "i",
	            null,
	            "B(t)"
	          ),
	          "is, that square root is screwing everything up, because it turns our nice polynomials into things that are no longer polynomials."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "There is a small class of polynomials where the square root is also a polynomial, but they're utterly useless to us: any polynomial with unweighted binomial coefficients has a square root that is also a polynomial. Now, you might think that Bézier curves are just fine because they do, but they don't; remember that only the ",
	          React.createElement(
	            "strong",
	            null,
	            "base"
	          ),
	          " function has binomial coefficients. That's before we factor in our coordinates, which turn it into a non-binomial polygon. The only way to make sure the functions stay binomial is to make all our coordinates have the same value. And that's not a curve, that's a point. We can already create offset curves for points, we call them circles, and they have much simpler functions than Bézier curves."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "So, since the tangent length isn't a polynomial, the normalised tangent won't be a polynomial either, which means ",
	          React.createElement(
	            "i",
	            null,
	            "N(t)"
	          ),
	          " won't be a polynomial, which means that ",
	          React.createElement(
	            "i",
	            null,
	            "d"
	          ),
	          " times ",
	          React.createElement(
	            "i",
	            null,
	            "N(t)"
	          ),
	          " won't be a polynomial, which means that, ultimately, ",
	          React.createElement(
	            "i",
	            null,
	            "O(t)"
	          ),
	          " won't be a polynomial, which means that even if we can determine the function for ",
	          React.createElement(
	            "i",
	            null,
	            "O(t)"
	          ),
	          " just fine (and that's far from trivial!), it simply cannot be represented as a Bézier curve."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "And that's one reason why Bézier curves are tricky: there are actually a ",
	          React.createElement(
	            "i",
	            null,
	            "lot"
	          ),
	          " of curves that cannot be represent as a Bézier curve at all. They can't even model their own offset curves. They're weird that way. So how do all those other programs do it? Well, much like we're about to do, they cheat. We're going to approximate an offset curve in a way that will look relatively close to what the real offset curve would look like, if we could compute it."
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So, you cannot offset a Bézier curve perfectly with another Bézier curve, no matter how high-order you make that other Bézier curve. However, we can chop up a curve into \"safe\" sub-curves (where safe means that all the control points are always on a single side of the baseline, and the midpoint of the curve at ",
	        React.createElement(
	          "i",
	          null,
	          "t=0.5"
	        ),
	        " is roughly in the centre of the polygon defined by the curve coordinates) and then point-scale those sub-curves with respect to the curve's scaling origin (which is the intersection of the point normals at the start and end points)."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "A good way to do this reduction is to first find the curve's extreme points, as explained in the earlier section on curve extremities, and use these as initial splitting points. After this initial split, we can check each individual segment to see if it's \"safe enough\" based on where the center of the curve is. If the on-curve point for ",
	        React.createElement(
	          "i",
	          null,
	          "t=0.5"
	        ),
	        " is too far off from the center, we simply split the segment down the middle. Generally this is more than enough to end up with safe segments."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The following graphics show off curve offsetting, and you can use your up and down arrow keys to control the distance at which the curve gets offset. The curve first gets reduced to safe segments, each of which is then offset at the desired distance. Especially for simple curves, particularly easily set up for quadratic curves, no reduction is necessary, but the more twisty the curve gets, the more the curve needs to be reduced in order to get segments that can safely be scaled."
	      ),
	      React.createElement(Graphic, { preset: "simple", title: "Offsetting a quadratic Bézier curve", setup: this.setupQuadratic, draw: this.draw, onKeyDown: this.props.onKeyDown }),
	      React.createElement(Graphic, { preset: "simple", title: "Offsetting a cubic Bézier curve", setup: this.setupCubic, draw: this.draw, onKeyDown: this.props.onKeyDown }),
	      React.createElement(
	        "p",
	        null,
	        "You may notice that this may still lead to small 'jumps' in the sub-curves when moving the curve around. This is caused by the fact that we're still performing a naive form of offsetting, moving the control points the same distance as the start and end points. If the curve is large enough, this may still lead to incorrect offsets."
	      )
	    );
	  }
	});

	module.exports = keyHandling(Offsetting);

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);
	var keyHandling = __webpack_require__(18);

	var GraduatedOffsetting = React.createClass({
	  displayName: "GraduatedOffsetting",

	  statics: {
	    keyHandlingOptions: {
	      propName: "distance",
	      values: {
	        "38": 1, // up arrow
	        "40": -1 // down arrow
	      }
	    }
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Graduated curve offsetting"
	    };
	  },

	  setup: function setup(api, curve) {
	    api.setCurve(curve);
	    api.distance = 20;
	  },

	  setupQuadratic: function setupQuadratic(api) {
	    var curve = api.getDefaultQuadratic();
	    this.setup(api, curve);
	  },

	  setupCubic: function setupCubic(api) {
	    var curve = api.getDefaultCubic();
	    this.setup(api, curve);
	  },

	  draw: function draw(api, curve) {
	    api.reset();
	    api.drawSkeleton(curve);
	    api.drawCurve(curve);

	    api.setColor("blue");
	    var outline = curve.outline(0, 0, api.distance, api.distance);
	    outline.curves.forEach(function (c) {
	      return api.drawCurve(c);
	    });
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "What if we want to do graduated offsetting, starting at some distance ",
	        React.createElement(
	          "i",
	          null,
	          "s"
	        ),
	        " but ending at some other distance ",
	        React.createElement(
	          "i",
	          null,
	          "e"
	        ),
	        "? well, if we can compute the length of a curve (which we can if we use the Legendre-Gauss quadrature approach) then we can also determine how far \"along the line\" any point on the curve is. With that knowledge, we can offset a curve so that its offset curve is not uniformly wide, but graduated between with two different offset widths at the start and end."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Like normal offsetting we cut up our curve in sub-curves, and then check at which distance along the original curve each sub-curve starts and ends, as well as to which point on the curve each of the control points map. This gives us the distance-along-the-curve for each interesting point in the sub-curve. If we call the total length of all sub-curves seen prior to seeing \"the\\ current\" sub-curve ",
	        React.createElement(
	          "i",
	          null,
	          "S"
	        ),
	        " (and if the current sub-curve is the first one, ",
	        React.createElement(
	          "i",
	          null,
	          "S"
	        ),
	        " is zero), and we call the full length of our original curve ",
	        React.createElement(
	          "i",
	          null,
	          "L"
	        ),
	        ", then we get the following graduation values:"
	      ),
	      React.createElement(
	        "ul",
	        null,
	        React.createElement(
	          "li",
	          null,
	          "start: map ",
	          React.createElement(
	            "i",
	            null,
	            "S"
	          ),
	          " from interval (",
	          React.createElement(
	            "i",
	            null,
	            "0,L"
	          ),
	          ") to interval ",
	          React.createElement(
	            "i",
	            null,
	            "(s,e)"
	          )
	        ),
	        React.createElement(
	          "li",
	          null,
	          "c1: ",
	          React.createElement(
	            "i",
	            null,
	            "map(",
	            React.createElement(
	              "strong",
	              null,
	              "S+d1"
	            ),
	            ", 0,L, s,e)"
	          ),
	          ", d1 = distance along curve to projection of c1"
	        ),
	        React.createElement(
	          "li",
	          null,
	          "c2: ",
	          React.createElement(
	            "i",
	            null,
	            "map(",
	            React.createElement(
	              "strong",
	              null,
	              "S+d2"
	            ),
	            ", 0,L, s,e)"
	          ),
	          ", d2 = distance along curve to projection of c2"
	        ),
	        React.createElement(
	          "li",
	          null,
	          "..."
	        ),
	        React.createElement(
	          "li",
	          null,
	          "end: ",
	          React.createElement(
	            "i",
	            null,
	            "map(",
	            React.createElement(
	              "strong",
	              null,
	              "S+length(subcurve)"
	            ),
	            ", 0,L, s,e)"
	          )
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "At each of the relevant points (start, end, and the projections of the control points onto the curve) we know the curve's normal, so offsetting is simply a matter of taking our original point, and moving it along the normal vector by the offset distance for each point. Doing so will give us the following result (these have with a starting width of 0, and an end width of 40 pixels, but can be controlled with your up and down arrow keys):"
	      ),
	      React.createElement(Graphic, { preset: "simple", title: "Offsetting a quadratic Bézier curve", setup: this.setupQuadratic, draw: this.draw, onKeyDown: this.props.onKeyDown }),
	      React.createElement(Graphic, { preset: "simple", title: "Offsetting a cubic Bézier curve", setup: this.setupCubic, draw: this.draw, onKeyDown: this.props.onKeyDown })
	    );
	  }
	});

	module.exports = keyHandling(GraduatedOffsetting);

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var sin = Math.sin,
	    cos = Math.cos;

	var Circles = React.createClass({
	  displayName: "Circles",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Circles and quadratic Bézier curves"
	    };
	  },

	  setup: function setup(api) {
	    api.w = api.getPanelWidth();
	    api.h = api.getPanelHeight();
	    api.pad = 20;
	    api.r = api.w / 2 - api.pad;
	    api.mousePt = false;
	    api.angle = 0;
	    var spt = { x: api.w - api.pad, y: api.h / 2 };
	    api.setCurve(new api.Bezier(spt, spt, spt));
	  },

	  draw: function draw(api, curve) {
	    api.reset();
	    api.setColor("lightgrey");
	    api.drawGrid(1, 1);
	    api.setColor("red");
	    api.drawCircle({ x: api.w / 2, y: api.h / 2 }, api.r);
	    api.setColor("transparent");
	    api.setFill("rgba(100,255,100,0.4)");
	    var p = {
	      x: api.w / 2,
	      y: api.h / 2,
	      r: api.r,
	      s: api.angle < 0 ? api.angle : 0,
	      e: api.angle < 0 ? 0 : api.angle
	    };
	    api.drawArc(p);
	    api.setColor("black");
	    api.drawSkeleton(curve);
	    api.drawCurve(curve);
	  },

	  onMouseMove: function onMouseMove(evt, api) {
	    var x = evt.offsetX - api.w / 2,
	        y = evt.offsetY - api.h / 2;
	    var angle = Math.atan2(y, x);
	    var pts = api.curve.points;
	    // new control
	    var r = api.r,
	        b = (cos(angle) - 1) / sin(angle);
	    pts[1] = {
	      x: api.w / 2 + r * (cos(angle) - b * sin(angle)),
	      y: api.w / 2 + r * (sin(angle) + b * cos(angle))
	    };
	    // new endpoint
	    pts[2] = {
	      x: api.w / 2 + api.r * cos(angle),
	      y: api.w / 2 + api.r * sin(angle)
	    };
	    api.setCurve(new api.Bezier(pts));
	    api.angle = angle;
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "Circles and Bézier curves are very different beasts, and circles are infinitely easier to work with than Bézier curves. Their formula is much simpler, and they can be drawn more efficiently. But, sometimes you don't have the luxury of using circles, or ellipses, or arcs. Sometimes, all you have are Bézier curves. For instance, if you're doing font design, fonts have no concept of geometric shapes, they only know straight lines, and Bézier curves. OpenType fonts with TrueType outlines only know quadratic Bézier curves, and OpenType fonts with Type 2 outlines only know cubic Bézier curves. So how do you draw a circle, or an ellipse, or an arc?"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "You approximate."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We already know that Bézier curves cannot model all curves that we can think of, and this includes perfect circles, as well as ellipses, and their arc counterparts. However, we can certainly approximate them to a degree that is visually acceptable. Quadratic and cubic curves offer us different curvature control, so in order to approximate a circle we will first need to figure out what the error is if we try to approximate arcs of increasing degree with quadratic and cubic curves, and where the coordinates even lie."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Since arcs are mid-point-symmetrical, we need the control points to set up a symmetrical curve. For quadratic curves this means that the control point will be somewhere on a line that intersects the baseline at a right angle. And we don't get any choice on where that will be, since the derivatives at the start and end point have to line up, so our control point will lie at the intersection of the tangents at the start and end point."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "First, let's try to fit the quadratic curve onto a circular arc. In the following sketch you can move the mouse around over a unit circle, to see how well, or poorly, a quadratic curve can approximate the arc from (1,0) to where your mouse cursor is:"
	      ),
	      React.createElement(Graphic, { preset: "arcfitting", title: "Quadratic Bézier arc approximation", setup: this.setup, draw: this.draw, onMouseMove: this.onMouseMove }),
	      React.createElement(
	        "p",
	        null,
	        "As you can see, things go horribly wrong quite quickly; even trying to approximate a quarter circle using a quadratic curve is a bad idea. An eighth of a turns might look okay, but how okay is okay? Let's apply some maths and find out. What we're interested in is how far off our on-curve coordinates are with respect to a circular arc, given a specific start and end angle. We'll be looking at how much space there is between the circular arc, and the quadratic curve's midpoint."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We start out with our start and end point, and for convenience we will place them on a unit circle (a circle around 0,0 with radius 1), at some angle ",
	        React.createElement(
	          "i",
	          null,
	          "φ"
	        ),
	        ":"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/ef34ab8f466ed3294895135a346b55ada05d779d.svg", style: { width: "13.275rem", height: "2.6248500000000003rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "What we want to find is the intersection of the tangents, so we want a point C such that:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/5660e8512b07dbac7fcf04633de8002fa25aa962.svg", style: { width: "20.77515rem", height: "2.6248500000000003rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "i.e. we want a point that lies on the vertical line through A (at some distance ",
	        React.createElement(
	          "i",
	          null,
	          "a"
	        ),
	        "from A) and also lies on the tangent line through B (at some distance ",
	        React.createElement(
	          "i",
	          null,
	          "b"
	        ),
	        " from B). Solving this gives us:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/d16e7a1c1e9686e1afb82f4ffcec07078d264565.svg", style: { width: "14.99985rem", height: "2.7rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "First we solve for ",
	        React.createElement(
	          "i",
	          null,
	          "b"
	        ),
	        ":"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/3128b31a874166ebe4479d3002d70f280de375a1.svg", style: { width: "39.07485rem", height: "1.125rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "which yields:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/02b158f9ef2191b970dc2fe69c0903eba2b1f8b5.svg", style: { width: "6.9750000000000005rem", height: "2.7rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "which we can then substitute in the expression for ",
	        React.createElement(
	          "i",
	          null,
	          "a"
	        ),
	        ":"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/e940f26afcd5f80371b6b72a8f52e217da64721d.svg", style: { width: "16.50015rem", height: "13.275rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "A quick check shows that plugging these values for ",
	        React.createElement(
	          "i",
	          null,
	          "a"
	        ),
	        " and ",
	        React.createElement(
	          "i",
	          null,
	          "b"
	        ),
	        " into the expressions for C",
	        React.createElement(
	          "sub",
	          null,
	          "x"
	        ),
	        " and C",
	        React.createElement(
	          "sub",
	          null,
	          "y"
	        ),
	        " give the same x/y coordinates for both \"",
	        React.createElement(
	          "i",
	          null,
	          "a"
	        ),
	        " away from A\" and \"",
	        React.createElement(
	          "i",
	          null,
	          "b"
	        ),
	        " away from B\", so let's continue: now that we know the coordinate values for C, we know where our on-curve point T for ",
	        React.createElement(
	          "i",
	          null,
	          "t=0.5"
	        ),
	        " (or angle φ/2) is, because we can just evaluate the Bézier polynomial, and we know where the circle arc's actual point P is for angle φ/2:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/0b80423188012451e0400f473c19729eb2bad654.svg", style: { width: "13.350150000000001rem", height: "2.025rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We compute T, observing that if ",
	        React.createElement(
	          "i",
	          null,
	          "t=0.5"
	        ),
	        ", the polynomial values (1-t)², 2(1-t)t, and t² are 0.25, 0.5, and 0.25 respectively:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/bc50559ff8bd9062694a449aae5f6f85f91de909.svg", style: { width: "18.225rem", height: "2.17485rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Which, worked out for the x and y components, gives:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/6e512d83529089b2294b45659b826bb24a598356.svg", style: { width: "29.025000000000002rem", height: "5.175rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "And the distance between these two is the standard Euclidean distance:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/d13ad085587983ba3fa6fe9051dcc2f6a3d0917c.svg", style: { width: "27.675rem", height: "9.525150000000002rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So, what does this distance function look like when we plot it for a number of ranges for the angle φ, such as a half circle, quarter circle and eighth circle?"
	      ),
	      React.createElement(
	        "table",
	        null,
	        React.createElement(
	          "tbody",
	          null,
	          React.createElement(
	            "tr",
	            null,
	            React.createElement(
	              "td",
	              null,
	              React.createElement(
	                "p",
	                null,
	                React.createElement("img", { src: "images/arc-q-pi.gif" })
	              ),
	              React.createElement(
	                "p",
	                null,
	                "plotted for 0 ≤ φ ≤ π:"
	              )
	            ),
	            React.createElement(
	              "td",
	              null,
	              React.createElement(
	                "p",
	                null,
	                React.createElement("img", { src: "images/arc-q-pi2.gif" })
	              ),
	              React.createElement(
	                "p",
	                null,
	                "plotted for 0 ≤ φ ≤ ½π:"
	              )
	            ),
	            React.createElement(
	              "td",
	              null,
	              this.props.showhref ? "http://www.wolframalpha.com/input/?i=plot+sqrt%28%281%2F4+*+%28sin%28x%29+%2B+2tan%28x%2F2%29%29+-+sin%28x%2F2%29%29%5E2+%2B+%282sin%5E4%28x%2F4%29%29%5E2%29+for+0+%3C%3D+x+%3C%3D+pi%2F4" : null,
	              React.createElement(
	                "p",
	                null,
	                React.createElement("img", { src: "images/arc-q-pi4.gif" })
	              ),
	              React.createElement(
	                "p",
	                null,
	                "plotted for 0 ≤ φ ≤ ¼π:"
	              )
	            )
	          )
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We now see why the eighth circle arc looks decent, but the quarter circle arc doesn't: an error of roughly 0.06 at ",
	        React.createElement(
	          "i",
	          null,
	          "t=0.5"
	        ),
	        " means we're 6% off the mark... we will already be off by one pixel on a circle with pixel radius 17. Any decent sized quarter circle arc, say with radius 100px, will be way off if approximated by a quadratic curve! For the eighth circle arc, however, the error is only roughly 0.003, or 0.3%, which explains why it looks so close to the actual eighth circle arc. In fact, if we want a truly tiny error, like 0.001, we'll have to contend with an angle of (rounded) 0.593667, which equates to roughly 34 degrees. We'd need 11 quadratic curves to form a full circle with that precision! (technically, 10 and ten seventeenth, but we can't do partial curves, so we have to round up). That's a whole lot of curves just to get a shape that can be drawn using a simple function!"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "In fact, let's flip the function around, so that if we plug in the precision error, labelled ε, we get back the maximum angle for that precision:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/61a938fa10b77e8c41c3c064ed39bd1145d6bbcc.svg", style: { width: "18.225rem", height: "4.5rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "And frankly, things are starting to look a bit ridiculous at this point, we're doing way more maths than we've ever done, but thankfully this is as far as we need the maths to take us: If we plug in the precisions 0.1, 0.01, 0.001 and 0.0001 we get the radians values 1.748, 1.038, 0.594 and 0.3356; in degrees, that means we can cover roughly 100 degrees (requiring four curves), 59.5 degrees (requiring six curves), 34 degrees (requiring 11 curves), and 19.2 degrees (requiring a whopping nineteen curves). "
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The bottom line? ",
	        React.createElement(
	          "strong",
	          null,
	          "Quadratic curves are kind of lousy"
	        ),
	        " if you want circular (or elliptical, which are circles that have been squashed in one dimension) curves. We can do better, even if it's just by raising the order of our curve once. So let's try the same thing for cubic curves."
	      )
	    );
	  }
	});

	module.exports = Circles;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);

	var sin = Math.sin,
	    cos = Math.cos,
	    tan = Math.tan;

	var CirclesCubic = React.createClass({
	  displayName: "CirclesCubic",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Circles and cubic Bézier curves"
	    };
	  },

	  setup: function setup(api) {
	    api.setSize(400, 400);
	    api.w = api.getPanelWidth();
	    api.h = api.getPanelHeight();
	    api.pad = 80;
	    api.r = api.w / 2 - api.pad;
	    api.mousePt = false;
	    api.angle = 0;
	    var spt = { x: api.w - api.pad, y: api.h / 2 };
	    api.setCurve(new api.Bezier(spt, spt, spt, spt));
	  },

	  guessCurve: function guessCurve(S, B, E) {
	    var C = {
	      x: (S.x + E.x) / 2,
	      y: (S.y + E.y) / 2
	    },
	        A = {
	      x: B.x + (B.x - C.x) / 3, // cubic ratio at t=0.5 is 1/3
	      y: B.y + (B.y - C.y) / 3
	    },
	        bx = (E.x - S.x) / 4,
	        by = (E.y - S.y) / 4,
	        e1 = {
	      x: B.x - bx,
	      y: B.y - by
	    },
	        e2 = {
	      x: B.x + bx,
	      y: B.y + by
	    },
	        v1 = {
	      x: A.x + (e1.x - A.x) * 2,
	      y: A.y + (e1.y - A.y) * 2
	    },
	        v2 = {
	      x: A.x + (e2.x - A.x) * 2,
	      y: A.y + (e2.y - A.y) * 2
	    },
	        nc1 = {
	      x: S.x + (v1.x - S.x) * 2,
	      y: S.y + (v1.y - S.y) * 2
	    },
	        nc2 = {
	      x: E.x + (v2.x - E.x) * 2,
	      y: E.y + (v2.y - E.y) * 2
	    };
	    return [nc1, nc2];
	  },

	  draw: function draw(api, curve) {
	    api.reset();

	    api.setColor("lightgrey");
	    api.drawGrid(1, 1);
	    api.setColor("rgba(255,0,0,0.4)");
	    api.drawCircle({ x: api.w / 2, y: api.h / 2 }, api.r);
	    api.setColor("transparent");
	    api.setFill("rgba(100,255,100,0.4)");
	    var p = {
	      x: api.w / 2,
	      y: api.h / 2,
	      r: api.r,
	      s: api.angle < 0 ? api.angle : 0,
	      e: api.angle < 0 ? 0 : api.angle
	    };
	    api.drawArc(p);

	    // guessed curve
	    var B = {
	      x: api.w / 2 + api.r * cos(api.angle / 2),
	      y: api.w / 2 + api.r * sin(api.angle / 2)
	    };
	    var S = curve.points[0],
	        E = curve.points[3],
	        nc = this.guessCurve(S, B, E);
	    var guess = new api.Bezier([S, nc[0], nc[1], E]);
	    api.setColor("rgb(140,140,255)");
	    api.drawLine(guess.points[0], guess.points[1]);
	    api.drawLine(guess.points[1], guess.points[2]);
	    api.drawLine(guess.points[2], guess.points[3]);
	    api.setColor("blue");
	    api.drawCurve(guess);
	    api.drawCircle(guess.points[1], 3);
	    api.drawCircle(guess.points[2], 3);

	    // real curve
	    api.drawSkeleton(curve);
	    api.setColor("black");
	    api.drawLine(curve.points[1], curve.points[2]);
	    api.drawCurve(curve);
	  },

	  onMouseMove: function onMouseMove(evt, api) {
	    var x = evt.offsetX - api.w / 2,
	        y = evt.offsetY - api.h / 2;
	    if (x > api.w / 2) return;

	    var angle = Math.atan2(y, x);
	    if (angle < 0) {
	      angle = 2 * Math.PI + angle;
	    }
	    var pts = api.curve.points;
	    // new control 1
	    var r = api.r,
	        f = 4 * tan(angle / 4) / 3;
	    pts[1] = {
	      x: api.w / 2 + r,
	      y: api.w / 2 + r * f
	    };
	    // new control 2
	    pts[2] = {
	      x: api.w / 2 + api.r * (cos(angle) + f * sin(angle)),
	      y: api.w / 2 + api.r * (sin(angle) - f * cos(angle))
	    };
	    // new endpoint
	    pts[3] = {
	      x: api.w / 2 + api.r * cos(angle),
	      y: api.w / 2 + api.r * sin(angle)
	    };
	    api.setCurve(new api.Bezier(pts));
	    api.angle = angle;
	  },

	  drawCircle: function drawCircle(api) {
	    api.setSize(325, 325);
	    api.reset();

	    var w = api.getPanelWidth(),
	        h = api.getPanelHeight(),
	        pad = 60,
	        r = w / 2 - pad,
	        k = 0.55228,
	        offset = { x: -pad / 2, y: -pad / 4 };

	    var curve = new api.Bezier([{ x: w / 2 + r, y: h / 2 }, { x: w / 2 + r, y: h / 2 + k * r }, { x: w / 2 + k * r, y: h / 2 + r }, { x: w / 2, y: h / 2 + r }]);

	    api.setColor("lightgrey");
	    api.drawLine({ x: 0, y: h / 2 }, { x: w + pad, y: h / 2 }, offset);
	    api.drawLine({ x: w / 2, y: 0 }, { x: w / 2, y: h + pad }, offset);

	    var pts = curve.points;

	    api.setColor("red");
	    api.drawPoint(pts[0], offset);
	    api.drawPoint(pts[1], offset);
	    api.drawPoint(pts[2], offset);
	    api.drawPoint(pts[3], offset);
	    api.drawCurve(curve, offset);
	    api.setColor("rgb(255,160,160)");
	    api.drawLine(pts[0], pts[1], offset);
	    api.drawLine(pts[1], pts[2], offset);
	    api.drawLine(pts[2], pts[3], offset);

	    api.setFill("red");
	    api.text(pts[0].x - w / 2 + "," + (pts[0].y - h / 2), { x: pts[0].x + 7, y: pts[0].y + 3 }, offset);
	    api.text(pts[1].x - w / 2 + "," + (pts[1].y - h / 2), { x: pts[1].x + 7, y: pts[1].y + 3 }, offset);
	    api.text(pts[2].x - w / 2 + "," + (pts[2].y - h / 2), { x: pts[2].x + 7, y: pts[2].y + 7 }, offset);
	    api.text(pts[3].x - w / 2 + "," + (pts[3].y - h / 2), { x: pts[3].x, y: pts[3].y + 13 }, offset);

	    pts.forEach(function (p) {
	      p.x = -(p.x - w);
	    });
	    api.setColor("blue");
	    api.drawCurve(curve, offset);
	    api.drawLine(pts[2], pts[3], offset);
	    api.drawPoint(pts[2], offset);
	    api.setFill("blue");
	    api.text("reflected", { x: pts[2].x - pad / 2, y: pts[2].y + 13 }, offset);
	    api.setColor("rgb(200,200,255)");
	    api.drawLine(pts[1], pts[0], offset);
	    api.drawPoint(pts[1], offset);

	    pts.forEach(function (p) {
	      p.y = -(p.y - h);
	    });
	    api.setColor("green");
	    api.drawCurve(curve, offset);

	    pts.forEach(function (p) {
	      p.x = -(p.x - w);
	    });
	    api.setColor("purple");
	    api.drawCurve(curve, offset);
	    api.drawLine(pts[1], pts[0], offset);
	    api.drawPoint(pts[1], offset);
	    api.setFill("purple");
	    api.text("reflected", { x: pts[1].x + 10, y: pts[1].y + 3 }, offset);
	    api.setColor("rgb(200,200,255)");
	    api.drawLine(pts[2], pts[3], offset);
	    api.drawPoint(pts[2], offset);

	    api.setColor("black");
	    api.setFill("black");
	    api.drawLine({ x: w / 2, y: h / 2 }, { x: w / 2 + r - 2, y: h / 2 }, offset);
	    api.drawLine({ x: w / 2, y: h / 2 }, { x: w / 2, y: h / 2 + r - 2 }, offset);
	    api.text("r = " + r, { x: w / 2 + r / 3, y: h / 2 + 10 }, offset);
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "In the previous section we tried to approximate a circular arc with a quadratic curve, and it mostly made us unhappy. Cubic curves are much better suited to this task, so what do we need to do?"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "For cubic curves, we basically want the curve to pass through three points on the circle: the start point, the mid point at \"angle/2\", and the end point at \"angle\". We then also need to make sure the control points are such that the start and end tangent lines line up with the circle's tangent lines at the start and end point."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The first thing we can do is \"guess\" what the curve should look like, based on the previously outlined curve-through-three-points procedure. This will give use a curve with correct start, mid and end points, but possibly incorrect derivatives at the start and end, because the control points might not be in the right spot. We can then slide the control points along the lines that connect them to their respective end point, until they effect the corrected derivative at the start and end points.  However, if you look back at the section on fitting curves through three points, the rules used were such that they optimized for a near perfect hemisphere, so using the same guess won't be all that useful: guessing the solution based on knowing the solution is not really guessing."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So have a graphical look at a \"bad\" guess versus the true fit, where we'll be using the bad guess and the description in the second paragraph to derive the maths for the true fit:"
	      ),
	      React.createElement(Graphic, { preset: "arcfitting", title: "Cubic Bézier arc approximation", setup: this.setup, draw: this.draw, onMouseMove: this.onMouseMove }),
	      React.createElement(
	        "p",
	        null,
	        "We see two curves here; in blue, our \"guessed\" curve and its control points, and in grey/black, the true curve fit, with proper control points that were shifted in, along line between our guessed control points, such that the derivatives at the start and end points are correct."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We can already seethat cubic curves are a lot better than quadratic curves, and don't look all that wrong until we go well past a quarter circle; ⅜th starts to hint at problems, and half a circle has an obvious \"gap\" between the real circle and the cubic approximation. Anything past that just looks plain ridiculous... but quarter curves actually look pretty okay!"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So, maths time again: how okay is \"okay\"? Let's apply some more maths to find out."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Unlike for the quadratic curve, we can't use ",
	        React.createElement(
	          "i",
	          null,
	          "t=0.5"
	        ),
	        " as our reference point because by its very nature it's one of the three points that are actually guaranteed to lie on the circular curve. Instead, we need a different ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value. If we run some analysis on the curve we find that the actual ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value at which the curve is furthest from what it should be is 0.211325 (rounded), but we don't know \"why\", since finding this value involves root-finding, and is nearly impossible to do symbolically without pages and pages of math just to express one of the possible solutions."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So instead of walking you through the derivation for that value, let's simply take that ",
	        React.createElement(
	          "i",
	          null,
	          "t"
	        ),
	        " value and see what the error is for circular arcs with an angle ranging from 0 to 2π:"
	      ),
	      React.createElement(
	        "table",
	        null,
	        React.createElement(
	          "tbody",
	          null,
	          React.createElement(
	            "tr",
	            null,
	            React.createElement(
	              "td",
	              null,
	              React.createElement(
	                "p",
	                null,
	                React.createElement("img", { src: "images/arc-c-2pi.gif" })
	              ),
	              React.createElement(
	                "p",
	                null,
	                "plotted for 0 ≤ φ ≤ 2π:"
	              )
	            ),
	            React.createElement(
	              "td",
	              null,
	              React.createElement(
	                "p",
	                null,
	                React.createElement("img", { src: "images/arc-c-pi.gif" })
	              ),
	              React.createElement(
	                "p",
	                null,
	                "plotted for 0 ≤ φ ≤ π:"
	              )
	            ),
	            React.createElement(
	              "td",
	              null,
	              React.createElement(
	                "p",
	                null,
	                React.createElement("img", { src: "images/arc-c-pi2.gif" })
	              ),
	              React.createElement(
	                "p",
	                null,
	                "plotted for 0 ≤ φ ≤ ½π:"
	              )
	            )
	          )
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We see that cubic Bézier curves are much better when it comes to approximating circular arcs, with an error of less than 0.027 at the two \"bulge\" points for a quarter circle (which had an error of 0.06 for quadratic curves at the mid point), and an error near 0.001 for an eighth of a circle, so we're getting less than half the error for a quarter circle, or: at a slightly lower error, we're getting twice the arc. This makes cubic curves quite useful!"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "In fact, the precision of a cubic curve at a quarter circle is considered \"good enough\" by so many people that it's generally considered \"just fine\" to use four cubic Bézier curves to fake a full circle when no circle primitives are available; generally, people won't notice that it's not a real circle unless you also happen to overlay an actual circle, so that the difference becomes obvious."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So with the error analysis out of the way, how do we actually compute the coordinates needed to get that \"true fit\" cubic curve? The first observation is that we already know the start and end points, because they're the same as for the quadratic attempt:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/ef34ab8f466ed3294895135a346b55ada05d779d.svg", style: { width: "13.275rem", height: "2.6248500000000003rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "But we now need to find two control points, rather than one. If we want the derivatives at the start and end point to match the circle, then the first control point can only lie somewhere on the vertical line through S, and the second control point can only lie somewhere on the line tangent to point E, which means:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/4df65dae78bc5a0e6c5f23a2faae9a9d7a8b39b3.svg", style: { width: "8.325000000000001rem", height: "2.55015rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "where \"a\" is some scaling factor, and:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/cb32f8f9c3ae2b264a48003c237a798d02dc8935.svg", style: { width: "11.62485rem", height: "2.6248500000000003rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "where \"b\" is also some scaling factor."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Starting with this information, we slowly maths our way to success, but I won't lie: the maths for this is pretty trig-heavy, and it's easy to get lost if you remember (or know!) some of the core trigonoetric identities, so if you just want to see the final result just skip past the next section!"
	      ),
	      React.createElement(
	        "div",
	        { className: "note" },
	        React.createElement(
	          "h2",
	          null,
	          "Let's do this thing."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Unlike for the quadratic case, we need some more information in order to compute ",
	          React.createElement(
	            "i",
	            null,
	            "a"
	          ),
	          " and ",
	          React.createElement(
	            "i",
	            null,
	            "b"
	          ),
	          ", since they're no longer dependent variables. First, we observe that the curve is symmetrical, so whatever values we end up finding for C",
	          React.createElement(
	            "sub",
	            null,
	            "1"
	          ),
	          " will apply to C",
	          React.createElement(
	            "sub",
	            null,
	            "2"
	          ),
	          " as well (rotated along its tangent), so we'll focus on finding the location of C",
	          React.createElement(
	            "sub",
	            null,
	            "1"
	          ),
	          " only. So here's where we do something that you might not expect: we're going to ignore for a moment, because we're going to have a much easier time if we just solve this problem with geometry first, then move to calculus to solve a much simpler problem."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "If we look at the triangle that is formed between our starting point, or initial guess C",
	          React.createElement(
	            "sub",
	            null,
	            "1"
	          ),
	          "and our real C",
	          React.createElement(
	            "sub",
	            null,
	            "1"
	          ),
	          ", there's something funny going on: if we treat the line ",
	          '{',
	          "start,guess",
	          '}',
	          " as our opposite side, the line ",
	          '{',
	          "guess,real",
	          '}',
	          " as our adjacent side, with ",
	          '{',
	          "start,real",
	          '}',
	          " our hypothenuse, then the angle for the corner hypothenuse/adjacent is half that of the arc we're covering. Try it: if you place the end point at a quarter circle (pi/2, or 90 degrees), the angle in our triangle is half a quarter (pi/4, or 45 degrees). With that knowledge, and a knowledge of what the length of any of our lines segments are (as a function), we can determine where our control points are, and thus have everything we need to find the error distance function. Of the three lines, the one we can easiest determine is ",
	          '{',
	          "start,guess",
	          '}',
	          ", so let's find out what the guessed control point is. Again geometrically, because we have the benefit of an on-curve ",
	          React.createElement(
	            "i",
	            null,
	            "t=0.5"
	          ),
	          " value."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "The distance from our guessed point to the start point is exactly the same as the projection distance we looked at earlier. Using ",
	          React.createElement(
	            "i",
	            null,
	            "t=0.5"
	          ),
	          " as our point \"B\" in the \"A,B,C\" projection, then we know the length of the line segment ",
	          '{',
	          "C,A",
	          '}',
	          ", since it's d",
	          React.createElement(
	            "sub",
	            null,
	            "1"
	          ),
	          " = ",
	          '{',
	          "A,B",
	          '}',
	          " + d",
	          React.createElement(
	            "sub",
	            null,
	            "2"
	          ),
	          " = ",
	          '{',
	          "B,C",
	          '}',
	          ":"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/b15a274c1e0a6aeeaf517b5d2c8ee0a7997dd617.svg", style: { width: "27.675rem", height: "2.32515rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "So that just leaves us to find the distance from ",
	          React.createElement(
	            "i",
	            null,
	            "t=0.5"
	          ),
	          " to the baseline for an arbitrary angle φ, which is the distance from the centre of the circle to our ",
	          React.createElement(
	            "i",
	            null,
	            "t=0.5"
	          ),
	          " point, minus the distance from the centre to the line that runs from start point to end point. The first is the same as the point P we found for the quadratic curve:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/0b80423188012451e0400f473c19729eb2bad654.svg", style: { width: "13.350150000000001rem", height: "2.025rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "And the distance from the origin to the line start/end is another application of angles, since the triangle ",
	          '{',
	          "origin,start,C",
	          '}',
	          " has known angles, and two known sides. We can find the length of the line ",
	          '{',
	          "origin,C",
	          '}',
	          ", which lets us trivially compute the coordinate for C:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/9be55fb38d5d30bbc6c7140afb1c7bc097bc044e.svg", style: { width: "18.675rem", height: "5.3248500000000005rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "With the coordinate C, and knowledge of coordinate B, we can determine coordinate A, and get a vector that is identical to the vector ",
	          '{',
	          "start,guess",
	          '}',
	          ":"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/262f2eca63105779f30a0a5445cf76f60786039a.svg", style: { width: "27.675rem", height: "3.67515rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/0e83ebbac13a84ef6036bf4be57b3d1b6cb316f8.svg", style: { width: "14.99985rem", height: "3.29985rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Which means we can now determine the distance ",
	          '{',
	          "start,guessed",
	          '}',
	          ", which is the same as the distance",
	          '{',
	          "C,A",
	          '}',
	          ", and use that to determine the vertical distance from our start point to our C",
	          React.createElement(
	            "sub",
	            null,
	            "1"
	          ),
	          ":"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/c87e454fb11ef7f15c7386e83ca1ce41a004d8a7.svg", style: { width: "17.850150000000003rem", height: "4.64985rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "And after this tedious detour to find the coordinate for C",
	          React.createElement(
	            "sub",
	            null,
	            "1"
	          ),
	          ", we can find C",
	          React.createElement(
	            "sub",
	            null,
	            "2"
	          ),
	          " fairly simply, since it's lies at distance -C",
	          React.createElement(
	            "sub",
	            null,
	            "1y"
	          ),
	          " along the end point's tangent:"
	        ),
	        React.createElement(
	          "p",
	          null,
	          React.createElement("img", { className: "LaTeX SVG", src: "images/latex/25f027074b6af8ca7b640e27636e3bf89c28afdb.svg", style: { width: "36.675000000000004rem", height: "6.89985rem" } })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "And that's it, we have all four points now for an approximation of an arbitrary circular arc with angle φ."
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So, to recap, given an angle φ, the new control coordinates are:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/c4d82e44d1c67dda8ba26aa6da0f406d05eba618.svg", style: { width: "15.075000000000001rem", height: "2.55015rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "and"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/3a4b1ee00eebb7697e5513ef9df673928913252e.svg", style: { width: "23.02515rem", height: "2.6248500000000003rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "And, because the \"quarter curve\" special case comes up so incredibly often, let's look at what these new control points mean for the curve coordinates of a quarter curve, by simply filling in φ = π/2:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/63e0936b4849d4cdbb9a2e0909181259be951e4d.svg", style: { width: "28.65015rem", height: "1.94985rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Which, in decimal values, rounded to six significant digits, is:"
	      ),
	      React.createElement(
	        "p",
	        null,
	        React.createElement("img", { className: "LaTeX SVG", src: "images/latex/fd12e65204a31319b66355c6ff99e6b3d9603b05.svg", style: { width: "28.65015rem", height: "1.125rem" } })
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Of course, this is for a circle with radius 1, so if you have a different radius circle, simply multiply the coordinate by the radius you need. And then finally, forming a full curve is now a simple a matter of mirroring these coordinates about the origin:"
	      ),
	      React.createElement(Graphic, { preset: "simple", title: "Cubic Bézier circle approximation", draw: this.drawCircle, "static": true })
	    );
	  }
	});

	module.exports = CirclesCubic;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Graphic = __webpack_require__(11);
	var SectionHeader = __webpack_require__(15);
	var keyHandling = __webpack_require__(18);
	var atan2 = Math.atan2,
	    PI = Math.PI,
	    TAU = 2 * PI,
	    cos = Math.cos,
	    sin = Math.sin;

	var Introduction = React.createClass({
	  displayName: "Introduction",

	  statics: {
	    keyHandlingOptions: {
	      propName: "error",
	      values: {
	        "38": 0.1, // up arrow
	        "40": -0.1 // down arrow
	      },
	      controller: function controller(api) {
	        if (api.error < 0.1) {
	          api.error = 0.1;
	        }
	      }
	    }
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      title: "Approximating Bézier curves with circular arcs"
	    };
	  },

	  setupCircle: function setupCircle(api) {
	    var curve = new api.Bezier(70, 70, 140, 40, 240, 130);
	    api.setCurve(curve);
	  },

	  setupQuadratic: function setupQuadratic(api) {
	    var curve = api.getDefaultQuadratic();
	    api.setCurve(curve);
	  },

	  setupCubic: function setupCubic(api) {
	    var curve = api.getDefaultCubic();
	    api.setCurve(curve);
	    api.error = 0.5;
	  },

	  getCCenter: function getCCenter(api, p1, p2, p3) {
	    // deltas
	    var dx1 = p2.x - p1.x,
	        dy1 = p2.y - p1.y,
	        dx2 = p3.x - p2.x,
	        dy2 = p3.y - p2.y;

	    // perpendiculars (quarter circle turned)
	    var dx1p = dx1 * cos(PI / 2) - dy1 * sin(PI / 2),
	        dy1p = dx1 * sin(PI / 2) + dy1 * cos(PI / 2),
	        dx2p = dx2 * cos(PI / 2) - dy2 * sin(PI / 2),
	        dy2p = dx2 * sin(PI / 2) + dy2 * cos(PI / 2);

	    // chord midpoints
	    var mx1 = (p1.x + p2.x) / 2,
	        my1 = (p1.y + p2.y) / 2,
	        mx2 = (p2.x + p3.x) / 2,
	        my2 = (p2.y + p3.y) / 2;

	    // midpoint offsets
	    var mx1n = mx1 + dx1p,
	        my1n = my1 + dy1p,
	        mx2n = mx2 + dx2p,
	        my2n = my2 + dy2p;

	    // intersection of these lines:
	    var i = api.utils.lli8(mx1, my1, mx1n, my1n, mx2, my2, mx2n, my2n);
	    var r = api.utils.dist(i, p1);

	    // arc start/end values, over mid point
	    var s = atan2(p1.y - i.y, p1.x - i.x),
	        m = atan2(p2.y - i.y, p2.x - i.x),
	        e = atan2(p3.y - i.y, p3.x - i.x);

	    // determine arc direction (cw/ccw correction)
	    var __;
	    if (s < e) {
	      // if s<m<e, arc(s, e)
	      // if m<s<e, arc(e, s + TAU)
	      // if s<e<m, arc(e, s + TAU)
	      if (s > m || m > e) {
	        s += TAU;
	      }
	      if (s > e) {
	        __ = e;e = s;s = __;
	      }
	    } else {
	      // if e<m<s, arc(e, s)
	      // if m<e<s, arc(s, e + TAU)
	      // if e<s<m, arc(s, e + TAU)
	      if (e < m && m < s) {
	        __ = e;e = s;s = __;
	      } else {
	        e += TAU;
	      }
	    }

	    // assign and done.
	    i.s = s;
	    i.e = e;
	    i.r = r;
	    return i;
	  },

	  drawCircle: function drawCircle(api, curve) {
	    api.reset();
	    var pts = curve.points;

	    // get center
	    var C = this.getCCenter(api, pts[0], pts[1], pts[2]);
	    // outer circle
	    api.setColor("grey");
	    api.drawCircle(C, api.utils.dist(C, pts[0]));

	    // controllable points
	    api.setColor("black");
	    pts.forEach(function (p) {
	      return api.drawCircle(p, 3);
	    });

	    // chords and perpendicular lines
	    var m;

	    api.setColor("blue");
	    api.drawLine(pts[0], pts[1]);
	    m = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
	    api.drawLine(m, { x: C.x + (C.x - m.x), y: C.y + (C.y - m.y) });

	    api.setColor("red");
	    api.drawLine(pts[1], pts[2]);
	    m = { x: (pts[1].x + pts[2].x) / 2, y: (pts[1].y + pts[2].y) / 2 };
	    api.drawLine(m, { x: C.x + (C.x - m.x), y: C.y + (C.y - m.y) });

	    api.setColor("green");
	    api.drawLine(pts[2], pts[0]);
	    m = { x: (pts[2].x + pts[0].x) / 2, y: (pts[2].y + pts[0].y) / 2 };
	    api.drawLine(m, { x: C.x + (C.x - m.x), y: C.y + (C.y - m.y) });

	    // center
	    api.setColor("black");
	    api.drawPoint(C);
	    api.setFill("black");
	    api.text("Intersection point", C, { x: -25, y: 10 });
	  },

	  drawSingleArc: function drawSingleArc(api, curve) {
	    api.reset();
	    var arcs = curve.arcs(api.error);
	    api.drawSkeleton(curve);
	    api.drawCurve(curve);

	    var a = arcs[0];
	    api.setColor("red");
	    api.setFill("rgba(255,0,0,0.2)");
	    api.debug = true;
	    api.drawArc(a);

	    api.setFill("black");
	    api.text("Arc approximation with total error " + api.utils.round(api.error, 1), { x: 10, y: 15 });
	  },

	  drawArcs: function drawArcs(api, curve) {
	    api.reset();
	    var arcs = curve.arcs(api.error);
	    api.drawSkeleton(curve);
	    api.drawCurve(curve);
	    arcs.forEach(function (a) {
	      api.setRandomColor(0.3);
	      api.setFill(api.getColor());
	      api.drawArc(a);
	    });

	    api.setFill("black");
	    api.text("Arc approximation with total error " + api.utils.round(api.error, 1) + " per arc segment", { x: 10, y: 15 });
	  },

	  render: function render() {
	    return React.createElement(
	      "section",
	      null,
	      React.createElement(SectionHeader, this.props),
	      React.createElement(
	        "p",
	        null,
	        "Let's look at doing the exact opposite of the previous section: rather than approximating circular arc using Bézier curves, let's approximate Bézier curves using circular arcs."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "We already saw in the section on circle approximation that this will never yield a perfect equivalent, but sometimes you need circular arcs, such as when you're working with fabrication machinery, or simple vector languages that understand lines and circles, but not much else."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The approach is fairly simple: pick a starting point on the curve, and pick two points that are further along the curve. Determine the circle that goes through those three points, and see if it fits the part of the curve we're trying to approximate. Decent fit? Try spacing the points further apart. Bad fit? Try spacing the points closer together. Keep doing this until you've found the \"good approximation/bad approximation\" boundary, record the \"good\" arc, and then move the starting point up to overlap the end point we previously found. Rinse and repeat until we've covered the entire curve."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So: step 1, how do we find a circle through three points? That part is actually really simple. You may remember (if you ever learned it!) that a line between two points on a circle is called a ",
	        React.createElement(
	          "a",
	          { href: "https://en.wikipedia.org/wiki/Chord_%28geometry%29" },
	          "chord"
	        ),
	        ", and one property of chords is that the line from the center of any chord, perpendicular to that chord, passes through the center of the circle."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So: if we have have three points, we have three (different) chords, and consequently, three (different) lines that go from those chords through the center of the circle. So we find the centers of the chords, find the perpendicular lines, find the intersection of those lines, and thus find the center of the circle."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The following graphic shows this procedure with a different colour for each chord and its associated perpendicular through the center. You can move the points around as much as you like, those lines will always meet!"
	      ),
	      React.createElement(Graphic, { preset: "simple", title: "Finding a circle through three points", setup: this.setupCircle, draw: this.drawCircle }),
	      React.createElement(
	        "p",
	        null,
	        "So, with the procedure on how to find a circle through three points, finding the arc through those points is straight-forward: pick one of the three points as start point, pick another as an end point, and the arc has to necessarily go from the start point, over the remaining point, to the end point."
	      ),
	      React.createElement(
	        "p",
	        null,
	        "So how can we convert a Bezier curve into a (sequence of) circular arc(s)?"
	      ),
	      React.createElement(
	        "ul",
	        null,
	        React.createElement(
	          "li",
	          null,
	          "Start at ",
	          React.createElement(
	            "em",
	            null,
	            "t=0"
	          )
	        ),
	        React.createElement(
	          "li",
	          null,
	          "Pick two points further down the curve at some value ",
	          React.createElement(
	            "em",
	            null,
	            "m = t + n"
	          ),
	          " and ",
	          React.createElement(
	            "em",
	            null,
	            "e = t + 2n"
	          )
	        ),
	        React.createElement(
	          "li",
	          null,
	          "Find the arc that these points define"
	        ),
	        React.createElement(
	          "li",
	          null,
	          "Determine how close the found arc is to the curve:",
	          React.createElement(
	            "ul",
	            null,
	            React.createElement(
	              "li",
	              null,
	              "Pick two additional points ",
	              React.createElement(
	                "em",
	                null,
	                "e1 = t + n/2"
	              ),
	              " and ",
	              React.createElement(
	                "em",
	                null,
	                "e2 = t + n + n/2"
	              ),
	              "."
	            ),
	            React.createElement(
	              "li",
	              null,
	              "These points, if the arc is a good approximation of the curve interval chosen, should lie ",
	              React.createElement(
	                "em",
	                null,
	                "on"
	              ),
	              " the circle, so their distance to the center of the circle should be the same as the distance from any of the three other points to the center."
	            ),
	            React.createElement(
	              "li",
	              null,
	              "For point points, determine the (absolute) error between the radius of the circle, and the",
	              React.createElement(
	                "em",
	                null,
	                "actual"
	              ),
	              " distance from the center of the circle to the point on the curve."
	            ),
	            React.createElement(
	              "li",
	              null,
	              "If this error is too high, we consider the arc bad, and try a smaller interval."
	            )
	          )
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The result of this is shown in the next graphic: we start at a guaranteed failure: s=0, e=1. That's the entire curve. The midpoint is simply at ",
	        React.createElement(
	          "em",
	          null,
	          "t=0.5"
	        ),
	        ", and then we start performing a ",
	        React.createElement(
	          "a",
	          { href: "https://en.wikipedia.org/wiki/Binary_search_algorithm" },
	          "Binary Search"
	        ),
	        "."
	      ),
	      React.createElement(
	        "ol",
	        null,
	        React.createElement(
	          "li",
	          null,
	          "We start with ",
	          (0, 0.5, 1)
	        ),
	        React.createElement(
	          "li",
	          null,
	          "That'll fail, so we retry with the interval halved: ",
	          (0, 0.25, 0.5)
	        ),
	        React.createElement(
	          "ul",
	          null,
	          React.createElement(
	            "li",
	            null,
	            "If that arc's good, we move back up by half distance: ",
	            (0, 0.375, 0.75),
	            "."
	          ),
	          React.createElement(
	            "li",
	            null,
	            "However, if the arc was still bad, we move ",
	            React.createElement(
	              "em",
	              null,
	              "down"
	            ),
	            " by half the distance: ",
	            (0, 0.125, 0.25),
	            "."
	          )
	        ),
	        React.createElement(
	          "li",
	          null,
	          "We keep doing this over and over until we have two arcs found in sequence of which the first arc is good, and the second arc is bad. When we find that pair, we've found the boundary between a good approximation and a bad approximation, and we pick the former"
	        )
	      ),
	      React.createElement(
	        "p",
	        null,
	        "The following graphic shows the result of this approach, with a default error threshold of 0.5, meaning that if an arc is off by a ",
	        React.createElement(
	          "em",
	          null,
	          "combined"
	        ),
	        " half pixel over both verification points, then we treat the arc as bad. This is an extremely simple error policy, but already works really well. Note that the graphic is still interactive, and you can use your up and down arrow keys keys to increase or decrease the error threshold, to see what the effect of a smaller or larger error threshold is."
	      ),
	      React.createElement(Graphic, { preset: "simple", title: "Arc approximation of a Bézier curve", setup: this.setupCubic, draw: this.drawSingleArc, onKeyDown: this.props.onKeyDown }),
	      React.createElement(
	        "p",
	        null,
	        "With that in place, all that's left now is to \"restart\" the procedure by treating the found arc's end point as the new to-be-determined arc's starting point, and using points further down the curve. We keep trying this until the found end point is for ",
	        React.createElement(
	          "em",
	          null,
	          "t=1"
	        ),
	        ", at which point we are done. Again, the following graphic allows for up and down arrow key input to increase or decrease the error threshold, so you can see how picking a different threshold changes the number of arcs that are necessary to reasonably approximate a curve:"
	      ),
	      React.createElement(Graphic, { preset: "simple", title: "Arc approximation of a Bézier curve", setup: this.setupCubic, draw: this.drawArcs, onKeyDown: this.props.onKeyDown }),
	      React.createElement(
	        "p",
	        null,
	        "So... what is this good for? Obviously, If you're working with technologies that can't do curves, but can do lines and circles, then the answer is pretty straight-forward, but what else? There are some reasons why you might need this technique: using circular arcs means you can determine whether a coordinate lies \"on\" your curve really easily: simply compute the distance to each circular arc center, and if any of those are close to the arc radii, at an angle betwee the arc start and end: bingo, this point can be treated as lying \"on the curve\". Another benefit is that this approximation is \"linear\": you can almost trivially travel along the arcs at fixed speed. You can also trivially compute the arc length of the approximated curve (it's a bit like curve flattening). The only thing to bear in mind is that this is a lossy equivalence: things that you compute based on the approximation are guaranteed \"off\" by some small value, and depending on how much precision you need, arc approximation is either going to be super useful, or completely useless. It's up to you to decide which, based on your application!"
	      )
	    );
	  }
	});

	module.exports = keyHandling(Introduction);

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var ReactRouter = __webpack_require__(3);
	var Link = ReactRouter.Link;

	var sections = __webpack_require__(8);
	var sectionPages = Object.keys(sections);

	var Navigation = React.createClass({
	  displayName: 'Navigation',

	  generateNavItem: function generateNavItem(name, entry) {
	    var Type = sections[name];
	    var title = Type.getDefaultProps().title;
	    var link = React.createElement(
	      'a',
	      { href: '#' + name },
	      title
	    );
	    if (this.props.fullNav) {
	      link = React.createElement(
	        Link,
	        { to: name },
	        title
	      );
	    }
	    return React.createElement(
	      'li',
	      { key: name, 'data-number': entry },
	      link
	    );
	  },

	  generateNav: function generateNav() {
	    if (this.props.compact) return null;
	    return React.createElement(
	      'div',
	      { ref: 'navigation' },
	      React.createElement(
	        'navigation',
	        { className: this.props.compact ? "compact" : null },
	        React.createElement(
	          'ul',
	          { className: 'navigation' },
	          sectionPages.map(this.generateNavItem)
	        )
	      )
	    );
	  },

	  render: function render() {
	    return this.generateNav();
	  }
	});

	module.exports = Navigation;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);

	var Footer = React.createClass({
	  displayName: "Footer",

	  render: function render() {
	    return React.createElement(
	      "footer",
	      { className: "copyright" },
	      "This article is © 2011-2016 to me, Mike \"Pomax\" Kamermans, but the text, code, and images are ",
	      React.createElement(
	        "a",
	        { href: "https://github.com/Pomax/bezierinfo/blob/gh-pages/LICENSE.md" },
	        "almost no rights reserved"
	      ),
	      ". Go do something cool with it!"
	    );
	  }

	});

	module.exports = Footer;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var sections = __webpack_require__(8);
	var Page = __webpack_require__(4);

	module.exports = function generateSingleSection(name) {
	  var Type, entry;

	  var buildComponent = function buildComponent(name, content, compact, entry) {
	    return React.createClass({
	      render: function render() {
	        return React.createElement(
	          Page,
	          { name: name, compact: compact, prev: entry - 1, next: entry + 1 },
	          content
	        );
	      }
	    });
	  };

	  // The root has no "section content".
	  if (name === false) {
	    /*
	    var noticeStyle = require('../../stylesheets/singleton.less');
	    */
	    var notice = React.createElement(
	      'p',
	      { className: 'single-notice' },
	      'This is the one-page-per-section version of the primer, to view the regular version, please click ',
	      React.createElement(
	        'a',
	        { href: '..' },
	        'here'
	      ),
	      '.'
	    );
	    return buildComponent('/', notice, true, -1);
	  }

	  Object.keys(sections).map(function (n, idx) {
	    if (name !== n) return;
	    entry = idx;
	    Type = sections[name];
	  });

	  var section = React.createElement(Type, { key: name, name: name, number: entry }),
	      content = section,
	      SingleSection = buildComponent(name, content, true, entry);

	  return SingleSection;
	};

/***/ }
/******/ ]);