(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["BezierArticle"] = factory();
	else
		root["BezierArticle"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 116);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var Locale = __webpack_require__(3);
var locale = new Locale();

module.exports = function generateBase(page, handler) {

  // the basic class just has a title and basic content.
  var componentClass = {
    getDefaultProps: function getDefaultProps() {
      return {
        title: locale.getTitle(page)
      };
    },

    render: function render() {
      return locale.getContent(page, this);
    }
  };

  // if the content requires code bindings, ensure those exist:
  if (handler) {
    Object.keys(handler).forEach(function (key) {
      componentClass[key] = handler[key];
    });
  }

  // then build the actual React class
  return React.createClass(componentClass);
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_proptypes__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_proptypes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_proptypes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_preact__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "PropTypes", function() { return __WEBPACK_IMPORTED_MODULE_0_proptypes___default.a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOM", function() { return DOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return Children; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createClass", function() { return createClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFactory", function() { return createFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidElement", function() { return isValidElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findDOMNode", function() { return findDOMNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unmountComponentAtNode", function() { return unmountComponentAtNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PureComponent", function() { return PureComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unstable_renderSubtreeIntoContainer", function() { return renderSubtreeIntoContainer; });



var version = '15.1.0'; // trick libraries to think we are react

var ELEMENTS = 'a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan'.split(' ');

var REACT_ELEMENT_TYPE = (typeof Symbol!=='undefined' && Symbol.for && Symbol.for('react.element')) || 0xeac7;

var COMPONENT_WRAPPER_KEY = typeof Symbol!=='undefined' ? Symbol.for('__preactCompatWrapper') : '__preactCompatWrapper';

// don't autobind these methods since they already have guaranteed context.
var AUTOBIND_BLACKLIST = {
	constructor: 1,
	render: 1,
	shouldComponentUpdate: 1,
	componentWillReceiveProps: 1,
	componentWillUpdate: 1,
	componentDidUpdate: 1,
	componentWillMount: 1,
	componentDidMount: 1,
	componentWillUnmount: 1,
	componentDidUnmount: 1
};


var CAMEL_PROPS = /^(?:accent|alignment|arabic|baseline|cap|clip|color|fill|flood|font|glyph|horiz|marker|overline|paint|stop|strikethrough|stroke|text|underline|unicode|units|v|vert|word|writing|x)[A-Z]/;


var BYPASS_HOOK = {};

/*global process*/
var DEV = typeof process==='undefined' || !process.env || process.env.NODE_ENV!=='production';

// a component that renders nothing. Used to replace components for unmountComponentAtNode.
function EmptyComponent() { return null; }



// make react think we're react.
var VNode = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])('a', null).constructor;
VNode.prototype.$$typeof = REACT_ELEMENT_TYPE;
VNode.prototype.preactCompatUpgraded = false;
VNode.prototype.preactCompatNormalized = false;

Object.defineProperty(VNode.prototype, 'type', {
	get: function() { return this.nodeName; },
	set: function(v) { this.nodeName = v; },
	configurable:true
});

Object.defineProperty(VNode.prototype, 'props', {
	get: function() { return this.attributes; },
	set: function(v) { this.attributes = v; },
	configurable:true
});



var oldEventHook = __WEBPACK_IMPORTED_MODULE_1_preact__["options"].event;
__WEBPACK_IMPORTED_MODULE_1_preact__["options"].event = function (e) {
	if (oldEventHook) { e = oldEventHook(e); }
	e.persist = Object;
	e.nativeEvent = e;
	return e;
};


var oldVnodeHook = __WEBPACK_IMPORTED_MODULE_1_preact__["options"].vnode;
__WEBPACK_IMPORTED_MODULE_1_preact__["options"].vnode = function (vnode) {
	if (!vnode.preactCompatUpgraded) {
		vnode.preactCompatUpgraded = true;

		var tag = vnode.nodeName,
			attrs = vnode.attributes = extend({}, vnode.attributes);

		if (typeof tag==='function') {
			if (tag[COMPONENT_WRAPPER_KEY]===true || (tag.prototype && 'isReactComponent' in tag.prototype)) {
				if (vnode.children && !vnode.children.length) { vnode.children = undefined; }
				if (vnode.children) { attrs.children = vnode.children; }

				if (!vnode.preactCompatNormalized) {
					normalizeVNode(vnode);
				}
				handleComponentVNode(vnode);
			}
		}
		else {
			if (vnode.children && !vnode.children.length) { vnode.children = undefined; }
			if (vnode.children) { attrs.children = vnode.children; }

			if (attrs.defaultValue) {
				if (!attrs.value && attrs.value!==0) {
					attrs.value = attrs.defaultValue;
				}
				delete attrs.defaultValue;
			}

			handleElementVNode(vnode, attrs);
		}
	}

	if (oldVnodeHook) { oldVnodeHook(vnode); }
};

function handleComponentVNode(vnode) {
	var tag = vnode.nodeName,
		a = vnode.attributes;

	vnode.attributes = {};
	if (tag.defaultProps) { extend(vnode.attributes, tag.defaultProps); }
	if (a) { extend(vnode.attributes, a); }
}

function handleElementVNode(vnode, a) {
	var shouldSanitize, attrs, i;
	if (a) {
		for (i in a) { if ((shouldSanitize = CAMEL_PROPS.test(i))) { break; } }
		if (shouldSanitize) {
			attrs = vnode.attributes = {};
			for (i in a) {
				if (a.hasOwnProperty(i)) {
					attrs[ CAMEL_PROPS.test(i) ? i.replace(/([A-Z0-9])/, '-$1').toLowerCase() : i ] = a[i];
				}
			}
		}
	}
}



// proxy render() since React returns a Component reference.
function render$1(vnode, parent, callback) {
	var prev = parent && parent._preactCompatRendered && parent._preactCompatRendered.base;

	// ignore impossible previous renders
	if (prev && prev.parentNode!==parent) { prev = null; }

	// default to first Element child
	if (!prev) { prev = parent.children[0]; }

	// remove unaffected siblings
	for (var i=parent.childNodes.length; i--; ) {
		if (parent.childNodes[i]!==prev) {
			parent.removeChild(parent.childNodes[i]);
		}
	}

	var out = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["render"])(vnode, parent, prev);
	if (parent) { parent._preactCompatRendered = out && (out._component || { base: out }); }
	if (typeof callback==='function') { callback(); }
	return out && out._component || out;
}


var ContextProvider = function () {};

ContextProvider.prototype.getChildContext = function () {
	return this.props.context;
};
ContextProvider.prototype.render = function (props) {
	return props.children[0];
};

function renderSubtreeIntoContainer(parentComponent, vnode, container, callback) {
	var wrap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(ContextProvider, { context: parentComponent.context }, vnode);
	var c = render$1(wrap, container);
	if (callback) { callback(c); }
	return c._component || c.base;
}


function unmountComponentAtNode(container) {
	var existing = container._preactCompatRendered && container._preactCompatRendered.base;
	if (existing && existing.parentNode===container) {
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["render"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(EmptyComponent), container, existing);
		return true;
	}
	return false;
}



var ARR = [];

// This API is completely unnecessary for Preact, so it's basically passthrough.
var Children = {
	map: function(children, fn, ctx) {
		if (children == null) { return null; }
		children = Children.toArray(children);
		if (ctx && ctx!==children) { fn = fn.bind(ctx); }
		return children.map(fn);
	},
	forEach: function(children, fn, ctx) {
		if (children == null) { return null; }
		children = Children.toArray(children);
		if (ctx && ctx!==children) { fn = fn.bind(ctx); }
		children.forEach(fn);
	},
	count: function(children) {
		return children && children.length || 0;
	},
	only: function(children) {
		children = Children.toArray(children);
		if (children.length!==1) { throw new Error('Children.only() expects only one child.'); }
		return children[0];
	},
	toArray: function(children) {
		return Array.isArray && Array.isArray(children) ? children : ARR.concat(children);
	}
};


/** Track current render() component for ref assignment */
var currentComponent;


function createFactory(type) {
	return createElement.bind(null, type);
}


var DOM = {};
for (var i=ELEMENTS.length; i--; ) {
	DOM[ELEMENTS[i]] = createFactory(ELEMENTS[i]);
}

function upgradeToVNodes(arr, offset) {
	for (var i=offset || 0; i<arr.length; i++) {
		var obj = arr[i];
		if (Array.isArray(obj)) {
			upgradeToVNodes(obj);
		}
		else if (obj && typeof obj==='object' && !isValidElement(obj) && ((obj.props && obj.type) || (obj.attributes && obj.nodeName) || obj.children)) {
			arr[i] = createElement(obj.type || obj.nodeName, obj.props || obj.attributes, obj.children);
		}
	}
}

function isStatelessComponent(c) {
	return typeof c==='function' && !(c.prototype && c.prototype.render);
}


// wraps stateless functional components in a PropTypes validator
function wrapStatelessComponent(WrappedComponent) {
	return createClass({
		displayName: WrappedComponent.displayName || WrappedComponent.name,
		render: function() {
			return WrappedComponent(this.props, this.context);
		}
	});
}


function statelessComponentHook(Ctor) {
	var Wrapped = Ctor[COMPONENT_WRAPPER_KEY];
	if (Wrapped) { return Wrapped===true ? Ctor : Wrapped; }

	Wrapped = wrapStatelessComponent(Ctor);

	Object.defineProperty(Wrapped, COMPONENT_WRAPPER_KEY, { configurable:true, value:true });
	Wrapped.displayName = Ctor.displayName;
	Wrapped.propTypes = Ctor.propTypes;
	Wrapped.defaultProps = Ctor.defaultProps;

	Object.defineProperty(Ctor, COMPONENT_WRAPPER_KEY, { configurable:true, value:Wrapped });

	return Wrapped;
}


function createElement() {
	var args = [], len = arguments.length;
	while ( len-- ) args[ len ] = arguments[ len ];

	upgradeToVNodes(args, 2);
	return normalizeVNode(__WEBPACK_IMPORTED_MODULE_1_preact__["h"].apply(void 0, args));
}


function normalizeVNode(vnode) {
	vnode.preactCompatNormalized = true;

	applyClassName(vnode);

	if (isStatelessComponent(vnode.nodeName)) {
		vnode.nodeName = statelessComponentHook(vnode.nodeName);
	}

	var ref = vnode.attributes.ref,
		type = ref && typeof ref;
	if (currentComponent && (type==='string' || type==='number')) {
		vnode.attributes.ref = createStringRefProxy(ref, currentComponent);
	}

	applyEventNormalization(vnode);

	return vnode;
}


function cloneElement$1(element, props) {
	var children = [], len = arguments.length - 2;
	while ( len-- > 0 ) children[ len ] = arguments[ len + 2 ];

	if (!isValidElement(element)) { return element; }
	var elementProps = element.attributes || element.props;
	var node = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(
		element.nodeName || element.type,
		elementProps,
		element.children || elementProps && elementProps.children
	);
	// Only provide the 3rd argument if needed.
	// Arguments 3+ overwrite element.children in preactCloneElement
	var cloneArgs = [node, props];
	if (children && children.length) {
		cloneArgs.push(children);
	}
	else if (props && props.children) {
		cloneArgs.push(props.children);
	}
	return normalizeVNode(__WEBPACK_IMPORTED_MODULE_1_preact__["cloneElement"].apply(void 0, cloneArgs));
}


function isValidElement(element) {
	return element && ((element instanceof VNode) || element.$$typeof===REACT_ELEMENT_TYPE);
}


function createStringRefProxy(name, component) {
	return component._refProxies[name] || (component._refProxies[name] = function (resolved) {
		if (component && component.refs) {
			component.refs[name] = resolved;
			if (resolved===null) {
				delete component._refProxies[name];
				component = null;
			}
		}
	});
}


function applyEventNormalization(ref) {
	var nodeName = ref.nodeName;
	var attributes = ref.attributes;

	if (!attributes || typeof nodeName!=='string') { return; }
	var props = {};
	for (var i in attributes) {
		props[i.toLowerCase()] = i;
	}
	if (props.ondoubleclick) {
		attributes.ondblclick = attributes[props.ondoubleclick];
		delete attributes[props.ondoubleclick];
	}
	// for *textual inputs* (incl textarea), normalize `onChange` -> `onInput`:
	if (props.onchange && (nodeName==='textarea' || (nodeName.toLowerCase()==='input' && !/^fil|che|rad/i.test(attributes.type)))) {
		var normalized = props.oninput || 'oninput';
		if (!attributes[normalized]) {
			attributes[normalized] = multihook([attributes[normalized], attributes[props.onchange]]);
			delete attributes[props.onchange];
		}
	}
}


function applyClassName(ref) {
	var attributes = ref.attributes;

	if (!attributes) { return; }
	var cl = attributes.className || attributes.class;
	if (cl) { attributes.className = cl; }
}


function extend(base, props) {
	for (var key in props) {
		if (props.hasOwnProperty(key)) {
			base[key] = props[key];
		}
	}
	return base;
}


function shallowDiffers(a, b) {
	for (var i in a) { if (!(i in b)) { return true; } }
	for (var i$1 in b) { if (a[i$1]!==b[i$1]) { return true; } }
	return false;
}


function findDOMNode(component) {
	return component && component.base || component;
}


function F(){}

function createClass(obj) {
	function cl(props, context) {
		bindAll(this);
		Component$1.call(this, props, context, BYPASS_HOOK);
		newComponentHook.call(this, props, context);
	}

	obj = extend({ constructor: cl }, obj);

	// We need to apply mixins here so that getDefaultProps is correctly mixed
	if (obj.mixins) {
		applyMixins(obj, collateMixins(obj.mixins));
	}
	if (obj.statics) {
		extend(cl, obj.statics);
	}
	if (obj.propTypes) {
		cl.propTypes = obj.propTypes;
	}
	if (obj.defaultProps) {
		cl.defaultProps = obj.defaultProps;
	}
	if (obj.getDefaultProps) {
		cl.defaultProps = obj.getDefaultProps();
	}

	F.prototype = Component$1.prototype;
	cl.prototype = extend(new F(), obj);

	cl.displayName = obj.displayName || 'Component';

	return cl;
}


// Flatten an Array of mixins to a map of method name to mixin implementations
function collateMixins(mixins) {
	var keyed = {};
	for (var i=0; i<mixins.length; i++) {
		var mixin = mixins[i];
		for (var key in mixin) {
			if (mixin.hasOwnProperty(key) && typeof mixin[key]==='function') {
				(keyed[key] || (keyed[key]=[])).push(mixin[key]);
			}
		}
	}
	return keyed;
}


// apply a mapping of Arrays of mixin methods to a component prototype
function applyMixins(proto, mixins) {
	for (var key in mixins) { if (mixins.hasOwnProperty(key)) {
		proto[key] = multihook(
			mixins[key].concat(proto[key] || ARR),
			key==='getDefaultProps' || key==='getInitialState' || key==='getChildContext'
		);
	} }
}


function bindAll(ctx) {
	for (var i in ctx) {
		var v = ctx[i];
		if (typeof v==='function' && !v.__bound && !AUTOBIND_BLACKLIST.hasOwnProperty(i)) {
			(ctx[i] = v.bind(ctx)).__bound = true;
		}
	}
}


function callMethod(ctx, m, args) {
	if (typeof m==='string') {
		m = ctx.constructor.prototype[m];
	}
	if (typeof m==='function') {
		return m.apply(ctx, args);
	}
}

function multihook(hooks, skipDuplicates) {
	return function() {
		var arguments$1 = arguments;
		var this$1 = this;

		var ret;
		for (var i=0; i<hooks.length; i++) {
			var r = callMethod(this$1, hooks[i], arguments$1);

			if (skipDuplicates && r!=null) {
				if (!ret) { ret = {}; }
				for (var key in r) { if (r.hasOwnProperty(key)) {
					ret[key] = r[key];
				} }
			}
			else if (typeof r!=='undefined') { ret = r; }
		}
		return ret;
	};
}


function newComponentHook(props, context) {
	propsHook.call(this, props, context);
	this.componentWillReceiveProps = multihook([propsHook, this.componentWillReceiveProps || 'componentWillReceiveProps']);
	this.render = multihook([propsHook, beforeRender, this.render || 'render', afterRender]);
}


function propsHook(props, context) {
	var this$1 = this;

	if (!props) { return; }

	// React annoyingly special-cases single children, and some react components are ridiculously strict about this.
	var c = props.children;
	if (c && Array.isArray(c) && c.length===1) {
		props.children = c[0];

		// but its totally still going to be an Array.
		if (props.children && typeof props.children==='object') {
			props.children.length = 1;
			props.children[0] = props.children;
		}
	}

	// add proptype checking
	if (DEV) {
		var ctor = typeof this==='function' ? this : this.constructor,
			propTypes = this.propTypes || ctor.propTypes;
		if (propTypes) {
			for (var prop in propTypes) {
				if (propTypes.hasOwnProperty(prop) && typeof propTypes[prop]==='function') {
					var displayName = this$1.displayName || ctor.name;
					var err = propTypes[prop](props, prop, displayName, 'prop');
					if (err) { console.error(new Error(err.message || err)); }
				}
			}
		}
	}
}


function beforeRender(props) {
	currentComponent = this;
}

function afterRender() {
	if (currentComponent===this) {
		currentComponent = null;
	}
}



function Component$1(props, context, opts) {
	__WEBPACK_IMPORTED_MODULE_1_preact__["Component"].call(this, props, context);
	this.state = this.getInitialState ? this.getInitialState() : {};
	this.refs = {};
	this._refProxies = {};
	if (opts!==BYPASS_HOOK) {
		newComponentHook.call(this, props, context);
	}
}
extend(Component$1.prototype = new __WEBPACK_IMPORTED_MODULE_1_preact__["Component"](), {
	constructor: Component$1,

	isReactComponent: {},

	replaceState: function(state, callback) {
		var this$1 = this;

		this.setState(state, callback);
		for (var i in this$1.state) {
			if (!(i in state)) {
				delete this$1.state[i];
			}
		}
	},

	getDOMNode: function() {
		return this.base;
	},

	isMounted: function() {
		return !!this.base;
	}
});



function PureComponent(props, context) {
	Component$1.call(this, props, context);
}
F.prototype = Component$1.prototype;
PureComponent.prototype = new F();
PureComponent.prototype.shouldComponentUpdate = function(props, state) {
	return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
};



var index = {
	version: version,
	DOM: DOM,
	PropTypes: __WEBPACK_IMPORTED_MODULE_0_proptypes___default.a,
	Children: Children,
	render: render$1,
	createClass: createClass,
	createFactory: createFactory,
	createElement: createElement,
	cloneElement: cloneElement$1,
	isValidElement: isValidElement,
	findDOMNode: findDOMNode,
	unmountComponentAtNode: unmountComponentAtNode,
	Component: Component$1,
	PureComponent: PureComponent,
	unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer
};

/* harmony default export */ __webpack_exports__["default"] = index;
//# sourceMappingURL=preact-compat.es.js.map

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(113)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = __webpack_require__(1);
var noop = __webpack_require__(9);

module.exports = function (Component) {
  var options = Component.keyHandlingOptions,
      propName = options.propName || "",
      values = options.values || {},
      controller = options.controller || noop,
      defaultProps = Component.defaultProps,
      getDefaultProps = Component.getDefaultProps,
      ref = "wrappedComponent";

  return React.createClass({
    values: values,

    defaultProps: defaultProps,
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var data = __webpack_require__(108);

var Locale = function() {
  this.data = {};
  this.data = data;
};

Locale.prototype = {
  getSectionLocale: function(key) {
    return this.data[key].locale;
  },

  getContent: function(key, handler) {
    return this.data[key].getContent(handler);
  },

  getTitle: function(key) {
    return this.data[key].title;
  }
};

module.exports = Locale;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);

var SectionHeader = React.createClass({
  displayName: "SectionHeader",

  statics: {
    locale: ''
  },

  render: function render() {
    var locale = SectionHeader.locale;
    if (typeof window !== "undefined" && window.location.toString().indexOf(locale) === -1) {
      locale = '';
    }
    var fragmentid = (locale ? './' + locale + '/' : '.') + "#" + this.props.name;
    return React.createElement(
      "h2",
      { id: this.props.name, "data-num": this.props.number },
      React.createElement(
        "a",
        { href: fragmentid },
        this.props.title
      )
    );
  },
  componentDidMount: function componentDidMount() {
    if (typeof window !== "undefined" && window.location) {
      var h = window.location.hash;
      if (h) {
        window.location = window.location.hash;
      }
    }
  }
});

module.exports = SectionHeader;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This is an ordered list of all sections used in the Bezier primer.
 *
 * The ordering you see here reflects the ordering in which sections
 * are present on the Primer page: do not change them unless there is
 * a REALLY good reason to =)
 *
 */
module.exports = {
  preface: __webpack_require__(93),

  // the basic topic(s) introduction(s)
  introduction: __webpack_require__(80),
  whatis: __webpack_require__(107),
  explanation: __webpack_require__(66),
  control: __webpack_require__(59),
  extended: __webpack_require__(68),

  // basic operations
  matrix: __webpack_require__(81),
  decasteljau: __webpack_require__(63),
  flattening: __webpack_require__(72),
  splitting: __webpack_require__(101),
  matrixsplit: __webpack_require__(82),
  reordering: __webpack_require__(97),

  // information that can be obtained through analysis
  derivatives: __webpack_require__(64),
  pointvectors: __webpack_require__(90),
  components: __webpack_require__(57),
  extremities: __webpack_require__(70),
  boundingbox: __webpack_require__(36),
  aligning: __webpack_require__(28),
  tightbounds: __webpack_require__(103),
  inflections: __webpack_require__(76),
  canonical: __webpack_require__(46),

  // accurate arc length is hard, yo
  arclength: __webpack_require__(32),
  arclengthapprox: __webpack_require__(34),
  tracing: __webpack_require__(105),

  // curve intersections
  intersections: __webpack_require__(78),
  curveintersection: __webpack_require__(61),

  // curve manipulation
  abc: __webpack_require__(26),
  moulding: __webpack_require__(84),
  pointcurves: __webpack_require__(88),

  // A quick foray into Catmull-Rom splines
  catmullconv: __webpack_require__(47),
  catmullmoulding: __webpack_require__(49),

  // "things made of more than on curve"
  polybezier: __webpack_require__(92),
  shapes: __webpack_require__(99),

  // curve offsetting
  projections: __webpack_require__(95),
  offsetting: __webpack_require__(86),
  graduatedoffset: __webpack_require__(74),

  // circle and arc approximation
  circles: __webpack_require__(51),
  circles_cubic: __webpack_require__(53),
  arcapproximation: __webpack_require__(30),

  // A quick foray in to B-Spline land
  bsplines: __webpack_require__(40),

  // comments come last for obvious reasons
  comments: __webpack_require__(55)
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/**
  A javascript Bezier curve library by Pomax.

  Based on http://pomax.github.io/bezierinfo

  This code is MIT licensed.
**/
(function() {
  "use strict";

  // math-inlining.
  var abs = Math.abs,
      min = Math.min,
      max = Math.max,
      acos = Math.acos,
      sqrt = Math.sqrt,
      pi = Math.PI,
      // a zero coordinate, which is surprisingly useful
      ZERO = {x:0,y:0,z:0};

  // quite needed
  var utils = __webpack_require__(7);

  // not quite needed, but eventually this'll be useful...
  var PolyBezier = __webpack_require__(110);

  /**
   * Bezier curve constructor. The constructor argument can be one of three things:
   *
   * 1. array/4 of {x:..., y:..., z:...}, z optional
   * 2. numerical array/8 ordered x1,y1,x2,y2,x3,y3,x4,y4
   * 3. numerical array/12 ordered x1,y1,z1,x2,y2,z2,x3,y3,z3,x4,y4,z4
   *
   */
  var Bezier = function(coords) {
    var args = (coords && coords.forEach) ? coords : [].slice.call(arguments);
    var coordlen = false;
    if(typeof args[0] === "object") {
      coordlen = args.length;
      var newargs = [];
      args.forEach(function(point) {
        ['x','y','z'].forEach(function(d) {
          if(typeof point[d] !== "undefined") {
            newargs.push(point[d]);
          }
        });
      });
      args = newargs;
    }
    var higher = false;
    var len = args.length;
    if (coordlen) {
      if(coordlen>4) {
        if (arguments.length !== 1) {
          throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");
        }
        higher = true;
      }
    } else {
      if(len!==6 && len!==8 && len!==9 && len!==12) {
        if (arguments.length !== 1) {
          throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");
        }
      }
    }
    var _3d = (!higher && (len === 9 || len === 12)) || (coords && coords[0] && typeof coords[0].z !== "undefined");
    this._3d = _3d;
    var points = [];
    for(var idx=0, step=(_3d ? 3 : 2); idx<len; idx+=step) {
      var point = {
        x: args[idx],
        y: args[idx+1]
      };
      if(_3d) { point.z = args[idx+2] };
      points.push(point);
    }
    this.order = points.length - 1;
    this.points = points;
    var dims = ['x','y'];
    if(_3d) dims.push('z');
    this.dims = dims;
    this.dimlen = dims.length;

    (function(curve) {
      var order = curve.order;
      var points = curve.points;
      var a = utils.align(points, {p1:points[0], p2:points[order]});
      for(var i=0; i<a.length; i++) {
        if(abs(a[i].y) > 0.0001) {
          curve._linear = false;
          return;
        }
      }
      curve._linear = true;
    }(this));

    this._t1 = 0;
    this._t2 = 1;
    this.update();
  };

  Bezier.fromSVG = function(svgString) {
    var list = svgString.match(/[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g).map(parseFloat);
    var relative = /[cq]/.test(svgString);
    if(!relative) return new Bezier(list);
    list = list.map(function(v,i) {
      return i < 2 ? v : v + list[i % 2];
    });
    return new Bezier(list);
  };

  function getABC(n,S,B,E,t) {
    if(typeof t === "undefined") { t = 0.5; }
    var u = utils.projectionratio(t,n),
        um = 1-u,
        C = {
          x: u*S.x + um*E.x,
          y: u*S.y + um*E.y
        },
        s = utils.abcratio(t,n),
        A = {
          x: B.x + (B.x-C.x)/s,
          y: B.y + (B.y-C.y)/s
        };
    return { A:A, B:B, C:C };
  }

  Bezier.quadraticFromPoints = function(p1,p2,p3, t) {
    if(typeof t === "undefined") { t = 0.5; }
    // shortcuts, although they're really dumb
    if(t===0) { return new Bezier(p2,p2,p3); }
    if(t===1) { return new Bezier(p1,p2,p2); }
    // real fitting.
    var abc = getABC(2,p1,p2,p3,t);
    return new Bezier(p1, abc.A, p3);
  };

  Bezier.cubicFromPoints = function(S,B,E, t,d1) {
    if(typeof t === "undefined") { t = 0.5; }
    var abc = getABC(3,S,B,E,t);
    if(typeof d1 === "undefined") { d1 = utils.dist(B,abc.C); }
    var d2 = d1 * (1-t)/t;

    var selen = utils.dist(S,E),
        lx = (E.x-S.x)/selen,
        ly = (E.y-S.y)/selen,
        bx1 = d1 * lx,
        by1 = d1 * ly,
        bx2 = d2 * lx,
        by2 = d2 * ly;
    // derivation of new hull coordinates
    var e1  = { x: B.x - bx1, y: B.y - by1 },
        e2  = { x: B.x + bx2, y: B.y + by2 },
        A = abc.A,
        v1  = { x: A.x + (e1.x-A.x)/(1-t), y: A.y + (e1.y-A.y)/(1-t) },
        v2  = { x: A.x + (e2.x-A.x)/(t), y: A.y + (e2.y-A.y)/(t) },
        nc1 = { x: S.x + (v1.x-S.x)/(t), y: S.y + (v1.y-S.y)/(t) },
        nc2 = { x: E.x + (v2.x-E.x)/(1-t), y: E.y + (v2.y-E.y)/(1-t) };
    // ...done
    return new Bezier(S,nc1,nc2,E);
  };

  var getUtils = function() {
    return utils;
  };

  Bezier.getUtils = getUtils;

  Bezier.prototype = {
    getUtils: getUtils,
    valueOf: function() {
      return this.toString();
    },
    toString: function() {
      return utils.pointsToString(this.points);
    },
    toSVG: function(relative) {
      if(this._3d) return false;
      var p = this.points,
          x = p[0].x,
          y = p[0].y,
          s = ["M", x, y, (this.order===2 ? "Q":"C")];
      for(var i=1, last=p.length; i<last; i++) {
        s.push(p[i].x);
        s.push(p[i].y);
      }
      return s.join(" ");
    },
    update: function() {
      // one-time compute derivative coordinates
      this.dpoints = [];
      for(var p=this.points, d=p.length, c=d-1; d>1; d--, c--) {
        var list = [];
        for(var j=0, dpt; j<c; j++) {
          dpt = {
            x: c * (p[j+1].x - p[j].x),
            y: c * (p[j+1].y - p[j].y)
          };
          if(this._3d) {
            dpt.z = c * (p[j+1].z - p[j].z);
          }
          list.push(dpt);
        }
        this.dpoints.push(list);
        p = list;
      };
      this.computedirection();
    },
    computedirection: function() {
      var points = this.points;
      var angle = utils.angle(points[0], points[this.order], points[1]);
      this.clockwise = angle > 0;
    },
    length: function() {
      return utils.length(this.derivative.bind(this));
    },
    _lut: [],
    getLUT: function(steps) {
      steps = steps || 100;
      if (this._lut.length === steps) { return this._lut; }
      this._lut = [];
      for(var t=0; t<=steps; t++) {
        this._lut.push(this.compute(t/steps));
      }
      return this._lut;
    },
    on: function(point, error) {
      error = error || 5;
      var lut = this.getLUT(), hits = [], c, t=0;
      for(var i=0; i<lut.length; i++) {
        c = lut[i];
        if (utils.dist(c,point) < error) {
          hits.push(c)
          t += i / lut.length;
        }
      }
      if(!hits.length) return false;
      return t /= hits.length;
    },
    project: function(point) {
      // step 1: coarse check
      var LUT = this.getLUT(), l = LUT.length-1,
          closest = utils.closest(LUT, point),
          mdist = closest.mdist,
          mpos = closest.mpos;
      if (mpos===0 || mpos===l) {
        var t = mpos/l, pt = this.compute(t);
        pt.t = t;
        pt.d = mdist;
        return pt;
      }

      // step 2: fine check
      var ft, t, p, d,
          t1 = (mpos-1)/l,
          t2 = (mpos+1)/l,
          step = 0.1/l;
      mdist += 1;
      for(t=t1,ft=t; t<t2+step; t+=step) {
        p = this.compute(t);
        d = utils.dist(point, p);
        if (d<mdist) {
          mdist = d;
          ft = t;
        }
      }
      p = this.compute(ft);
      p.t = ft;
      p.d = mdist;
      return p;
    },
    get: function(t) {
      return this.compute(t);
    },
    point: function(idx) {
      return this.points[idx];
    },
    compute: function(t) {
      // shortcuts
      if(t===0) { return this.points[0]; }
      if(t===1) { return this.points[this.order]; }

      var p = this.points;
      var mt = 1-t;

      // linear?
      if(this.order===1) {
        ret = {
          x: mt*p[0].x + t*p[1].x,
          y: mt*p[0].y + t*p[1].y
        };
        if (this._3d) { ret.z = mt*p[0].z + t*p[1].z; }
        return ret;
      }

      // quadratic/cubic curve?
      if(this.order<4) {
        var mt2 = mt*mt,
            t2 = t*t,
            a,b,c,d = 0;
        if(this.order===2) {
          p = [p[0], p[1], p[2], ZERO];
          a = mt2;
          b = mt*t*2;
          c = t2;
        }
        else if(this.order===3) {
          a = mt2*mt;
          b = mt2*t*3;
          c = mt*t2*3;
          d = t*t2;
        }
        var ret = {
          x: a*p[0].x + b*p[1].x + c*p[2].x + d*p[3].x,
          y: a*p[0].y + b*p[1].y + c*p[2].y + d*p[3].y
        };
        if(this._3d) {
          ret.z = a*p[0].z + b*p[1].z + c*p[2].z + d*p[3].z;
        }
        return ret;
      }

      // higher order curves: use de Casteljau's computation
      var dCpts = JSON.parse(JSON.stringify(this.points));
      while(dCpts.length > 1) {
        for (var i=0; i<dCpts.length-1; i++) {
          dCpts[i] = {
            x: dCpts[i].x + (dCpts[i+1].x - dCpts[i].x) * t,
            y: dCpts[i].y + (dCpts[i+1].y - dCpts[i].y) * t
          };
          if (typeof dCpts[i].z !== "undefined") {
            dCpts[i] = dCpts[i].z + (dCpts[i+1].z - dCpts[i].z) * t
          }
        }
        dCpts.splice(dCpts.length-1, 1);
      }
      return dCpts[0];
    },
    raise: function() {
      var p = this.points, np = [p[0]], i, k=p.length, pi, pim;
      for (var i=1; i<k; i++) {
        pi = p[i];
        pim = p[i-1];
        np[i] = {
          x: (k-i)/k * pi.x + i/k * pim.x,
          y: (k-i)/k * pi.y + i/k * pim.y
        };
      }
      np[k] = p[k-1];
      return new Bezier(np);
    },
    derivative: function(t) {
      var mt = 1-t,
          a,b,c=0,
          p = this.dpoints[0];
      if(this.order===2) { p = [p[0], p[1], ZERO]; a = mt; b = t; }
      if(this.order===3) { a = mt*mt; b = mt*t*2; c = t*t; }
      var ret = {
        x: a*p[0].x + b*p[1].x + c*p[2].x,
        y: a*p[0].y + b*p[1].y + c*p[2].y
      };
      if(this._3d) {
        ret.z = a*p[0].z + b*p[1].z + c*p[2].z;
      }
      return ret;
    },
    inflections: function() {
      return utils.inflections(this.points);
    },
    normal: function(t) {
      return this._3d ? this.__normal3(t) : this.__normal2(t);
    },
    __normal2: function(t) {
      var d = this.derivative(t);
      var q = sqrt(d.x*d.x + d.y*d.y)
      return { x: -d.y/q, y: d.x/q };
    },
    __normal3: function(t) {
      // see http://stackoverflow.com/questions/25453159
      var r1 = this.derivative(t),
          r2 = this.derivative(t+0.01),
          q1 = sqrt(r1.x*r1.x + r1.y*r1.y + r1.z*r1.z),
          q2 = sqrt(r2.x*r2.x + r2.y*r2.y + r2.z*r2.z);
      r1.x /= q1; r1.y /= q1; r1.z /= q1;
      r2.x /= q2; r2.y /= q2; r2.z /= q2;
      // cross product
      var c = {
        x: r2.y*r1.z - r2.z*r1.y,
        y: r2.z*r1.x - r2.x*r1.z,
        z: r2.x*r1.y - r2.y*r1.x
      };
      var m = sqrt(c.x*c.x + c.y*c.y + c.z*c.z);
      c.x /= m; c.y /= m; c.z /= m;
      // rotation matrix
      var R = [   c.x*c.x,   c.x*c.y-c.z, c.x*c.z+c.y,
                c.x*c.y+c.z,   c.y*c.y,   c.y*c.z-c.x,
                c.x*c.z-c.y, c.y*c.z+c.x,   c.z*c.z    ];
      // normal vector:
      var n = {
        x: R[0] * r1.x + R[1] * r1.y + R[2] * r1.z,
        y: R[3] * r1.x + R[4] * r1.y + R[5] * r1.z,
        z: R[6] * r1.x + R[7] * r1.y + R[8] * r1.z
      };
      return n;
    },
    hull: function(t) {
      var p = this.points,
          _p = [],
          pt,
          q = [],
          idx = 0,
          i=0,
          l=0;
      q[idx++] = p[0];
      q[idx++] = p[1];
      q[idx++] = p[2];
      if(this.order === 3) { q[idx++] = p[3]; }
      // we lerp between all points at each iteration, until we have 1 point left.
      while(p.length>1) {
        _p = [];
        for(i=0, l=p.length-1; i<l; i++) {
          pt = utils.lerp(t,p[i],p[i+1]);
          q[idx++] = pt;
          _p.push(pt);
        }
        p = _p;
      }
      return q;
    },
    split: function(t1, t2) {
      // shortcuts
      if(t1===0 && !!t2) { return this.split(t2).left; }
      if(t2===1) { return this.split(t1).right; }

      // no shortcut: use "de Casteljau" iteration.
      var q = this.hull(t1);
      var result = {
        left: this.order === 2 ? new Bezier([q[0],q[3],q[5]]) : new Bezier([q[0],q[4],q[7],q[9]]),
        right: this.order === 2 ? new Bezier([q[5],q[4],q[2]]) : new Bezier([q[9],q[8],q[6],q[3]]),
        span: q
      };

      // make sure we bind _t1/_t2 information!
      result.left._t1  = utils.map(0,  0,1, this._t1,this._t2);
      result.left._t2  = utils.map(t1, 0,1, this._t1,this._t2);
      result.right._t1 = utils.map(t1, 0,1, this._t1,this._t2);
      result.right._t2 = utils.map(1,  0,1, this._t1,this._t2);

      // if we have no t2, we're done
      if(!t2) { return result; }

      // if we have a t2, split again:
      t2 = utils.map(t2,t1,1,0,1);
      var subsplit = result.right.split(t2);
      return subsplit.left;
    },
    extrema: function() {
      var dims = this.dims,
          result={},
          roots=[],
          p, mfn;
      dims.forEach(function(dim) {
        mfn = function(v) { return v[dim]; };
        p = this.dpoints[0].map(mfn);
        result[dim] = utils.droots(p);
        if(this.order === 3) {
          p = this.dpoints[1].map(mfn);
          result[dim] = result[dim].concat(utils.droots(p));
        }
        result[dim] = result[dim].filter(function(t) { return (t>=0 && t<=1); });
        roots = roots.concat(result[dim].sort());
      }.bind(this));
      roots = roots.sort().filter(function(v,idx) { return (roots.indexOf(v) === idx); });
      result.values = roots;
      return result;
    },
    bbox: function() {
      var extrema = this.extrema(), result = {};
      this.dims.forEach(function(d) {
        result[d] = utils.getminmax(this, d, extrema[d]);
      }.bind(this));
      return result;
    },
    overlaps: function(curve) {
      var lbbox = this.bbox(),
          tbbox = curve.bbox();
      return utils.bboxoverlap(lbbox,tbbox);
    },
    offset: function(t, d) {
      if(typeof d !== "undefined") {
        var c = this.get(t);
        var n = this.normal(t);
        var ret = {
          c: c,
          n: n,
          x: c.x + n.x * d,
          y: c.y + n.y * d
        };
        if(this._3d) {
          ret.z = c.z + n.z * d;
        };
        return ret;
      }
      if(this._linear) {
        var nv = this.normal(0);
        var coords = this.points.map(function(p) {
          var ret = {
            x: p.x + t * nv.x,
            y: p.y + t * nv.y
          };
          if(p.z && n.z) { ret.z = p.z + t * nv.z; }
          return ret;
        });
        return [new Bezier(coords)];
      }
      var reduced = this.reduce();
      return reduced.map(function(s) {
        return s.scale(t);
      });
    },
    simple: function() {
      if(this.order===3) {
        var a1 = utils.angle(this.points[0], this.points[3], this.points[1]);
        var a2 = utils.angle(this.points[0], this.points[3], this.points[2]);
        if(a1>0 && a2<0 || a1<0 && a2>0) return false;
      }
      var n1 = this.normal(0);
      var n2 = this.normal(1);
      var s = n1.x*n2.x + n1.y*n2.y;
      if(this._3d) { s += n1.z*n2.z; }
      var angle = abs(acos(s));
      return angle < pi/3;
    },
    reduce: function() {
      var i, t1=0, t2=0, step=0.01, segment, pass1=[], pass2=[];
      // first pass: split on extrema
      var extrema = this.extrema().values;
      if(extrema.indexOf(0)===-1) { extrema = [0].concat(extrema); }
      if(extrema.indexOf(1)===-1) { extrema.push(1); }

      for(t1=extrema[0], i=1; i<extrema.length; i++) {
        t2 = extrema[i];
        segment = this.split(t1,t2);
        segment._t1 = t1;
        segment._t2 = t2;
        pass1.push(segment);
        t1 = t2;
      }

      // second pass: further reduce these segments to simple segments
      pass1.forEach(function(p1) {
        t1=0;
        t2=0;
        while(t2 <= 1) {
          for(t2=t1+step; t2<=1+step; t2+=step) {
            segment = p1.split(t1,t2);
            if(!segment.simple()) {
              t2 -= step;
              if(abs(t1-t2)<step) {
                // we can never form a reduction
                return [];
              }
              segment = p1.split(t1,t2);
              segment._t1 = utils.map(t1,0,1,p1._t1,p1._t2);
              segment._t2 = utils.map(t2,0,1,p1._t1,p1._t2);
              pass2.push(segment);
              t1 = t2;
              break;
            }
          }
        }
        if(t1<1) {
          segment = p1.split(t1,1);
          segment._t1 = utils.map(t1,0,1,p1._t1,p1._t2);
          segment._t2 = p1._t2;
          pass2.push(segment);
        }
      });
      return pass2;
    },
    scale: function(d) {
      var order = this.order;
      var distanceFn = false
      if(typeof d === "function") { distanceFn = d; }
      if(distanceFn && order === 2) { return this.raise().scale(distanceFn); }

      // TODO: add special handling for degenerate (=linear) curves.
      var clockwise = this.clockwise;
      var r1 = distanceFn ? distanceFn(0) : d;
      var r2 = distanceFn ? distanceFn(1) : d;
      var v = [ this.offset(0,10), this.offset(1,10) ];
      var o = utils.lli4(v[0], v[0].c, v[1], v[1].c);
      if(!o) { throw new Error("cannot scale this curve. Try reducing it first."); }
      // move all points by distance 'd' wrt the origin 'o'
      var points=this.points, np=[];

      // move end points by fixed distance along normal.
      [0,1].forEach(function(t) {
        var p = np[t*order] = utils.copy(points[t*order]);
        p.x += (t?r2:r1) * v[t].n.x;
        p.y += (t?r2:r1) * v[t].n.y;
      }.bind(this));

      if (!distanceFn) {
        // move control points to lie on the intersection of the offset
        // derivative vector, and the origin-through-control vector
        [0,1].forEach(function(t) {
          if(this.order===2 && !!t) return;
          var p = np[t*order];
          var d = this.derivative(t);
          var p2 = { x: p.x + d.x, y: p.y + d.y };
          np[t+1] = utils.lli4(p, p2, o, points[t+1]);
        }.bind(this));
        return new Bezier(np);
      }

      // move control points by "however much necessary to
      // ensure the correct tangent to endpoint".
      [0,1].forEach(function(t) {
        if(this.order===2 && !!t) return;
        var p = points[t+1];
        var ov = {
          x: p.x - o.x,
          y: p.y - o.y
        };
        var rc = distanceFn ? distanceFn((t+1)/order) : d;
        if(distanceFn && !clockwise) rc = -rc;
        var m = sqrt(ov.x*ov.x + ov.y*ov.y);
        ov.x /= m;
        ov.y /= m;
        np[t+1] = {
          x: p.x + rc*ov.x,
          y: p.y + rc*ov.y
        }
      }.bind(this));
      return new Bezier(np);
    },
    outline: function(d1, d2, d3, d4) {
      d2 = (typeof d2 === "undefined") ? d1 : d2;
      var reduced = this.reduce(),
          len = reduced.length,
          fcurves = [],
          bcurves = [],
          p,
          alen = 0,
          tlen = this.length();

      var graduated = (typeof d3 !== "undefined" && typeof d4 !== "undefined");

      function linearDistanceFunction(s,e, tlen,alen,slen) {
        return function (v) {
          var f1 = alen/tlen, f2 = (alen+slen)/tlen, d = e-s;
          return utils.map(v, 0,1, s+f1*d, s+f2*d);
        };
      };

      // form curve oulines
      reduced.forEach(function(segment) {
        slen = segment.length();
        if (graduated) {
          fcurves.push(segment.scale(  linearDistanceFunction( d1, d3, tlen,alen,slen)  ));
          bcurves.push(segment.scale(  linearDistanceFunction(-d2,-d4, tlen,alen,slen)  ));
        } else {
          fcurves.push(segment.scale( d1));
          bcurves.push(segment.scale(-d2));
        }
        alen += slen;
      });

      // reverse the "return" outline
      bcurves = bcurves.map(function(s) {
        p = s.points;
        if(p[3]) { s.points = [p[3],p[2],p[1],p[0]]; }
        else { s.points = [p[2],p[1],p[0]]; }
        return s;
      }).reverse();

      // form the endcaps as lines
      var fs = fcurves[0].points[0],
          fe = fcurves[len-1].points[fcurves[len-1].points.length-1],
          bs = bcurves[len-1].points[bcurves[len-1].points.length-1],
          be = bcurves[0].points[0],
          ls = utils.makeline(bs,fs),
          le = utils.makeline(fe,be),
          segments = [ls].concat(fcurves).concat([le]).concat(bcurves),
          slen = segments.length;

      return new PolyBezier(segments);
    },
    outlineshapes: function(d1, d2, curveIntersectionThreshold) {
      d2 = d2 || d1;
      var outline = this.outline(d1,d2).curves;
      var shapes = [];
      for(var i=1, len=outline.length; i < len/2; i++) {
        var shape = utils.makeshape(outline[i], outline[len-i], curveIntersectionThreshold);
        shape.startcap.virtual = (i > 1);
        shape.endcap.virtual = (i < len/2-1);
        shapes.push(shape);
      }
      return shapes;
    },
    intersects: function(curve, curveIntersectionThreshold) {
      if(!curve) return this.selfintersects(curveIntersectionThreshold);
      if(curve.p1 && curve.p2) {
        return this.lineIntersects(curve);
      }
      if(curve instanceof Bezier) { curve = curve.reduce(); }
      return this.curveintersects(this.reduce(), curve, curveIntersectionThreshold);
    },
    lineIntersects: function(line) {
      var mx = min(line.p1.x, line.p2.x),
          my = min(line.p1.y, line.p2.y),
          MX = max(line.p1.x, line.p2.x),
          MY = max(line.p1.y, line.p2.y),
          self=this;
      return utils.roots(this.points, line).filter(function(t) {
        var p = self.get(t);
        return utils.between(p.x, mx, MX) && utils.between(p.y, my, MY);
      });
    },
    selfintersects: function(curveIntersectionThreshold) {
      var reduced = this.reduce();
      // "simple" curves cannot intersect with their direct
      // neighbour, so for each segment X we check whether
      // it intersects [0:x-2][x+2:last].
      var i,len=reduced.length-2,results=[],result,left,right;
      for(i=0; i<len; i++) {
        left = reduced.slice(i,i+1);
        right = reduced.slice(i+2);
        result = this.curveintersects(left, right, curveIntersectionThreshold);
        results = results.concat( result );
      }
      return results;
    },
    curveintersects: function(c1, c2, curveIntersectionThreshold) {
      var pairs = [];
      // step 1: pair off any overlapping segments
      c1.forEach(function(l) {
        c2.forEach(function(r) {
          if(l.overlaps(r)) {
            pairs.push({ left: l, right: r });
          }
        });
      });
      // step 2: for each pairing, run through the convergence algorithm.
      var intersections = [];
      pairs.forEach(function(pair) {
        var result = utils.pairiteration(pair.left, pair.right, curveIntersectionThreshold);
        if(result.length > 0) {
          intersections = intersections.concat(result);
        }
      });
      return intersections;
    },
    arcs: function(errorThreshold) {
      errorThreshold = errorThreshold || 0.5;
      var circles = [];
      return this._iterate(errorThreshold, circles);
    },
    _error: function(pc, np1, s, e) {
      var q = (e - s) / 4,
          c1 = this.get(s + q),
          c2 = this.get(e - q),
          ref = utils.dist(pc, np1),
          d1  = utils.dist(pc, c1),
          d2  = utils.dist(pc, c2);
      return abs(d1-ref) + abs(d2-ref);
    },
    _iterate: function(errorThreshold, circles) {
      var s = 0, e = 1, safety;
      // we do a binary search to find the "good `t` closest to no-longer-good"
      do {
        safety=0;

        // step 1: start with the maximum possible arc
        e = 1;

        // points:
        var np1 = this.get(s), np2, np3, arc, prev_arc;

        // booleans:
        var curr_good = false, prev_good = false, done;

        // numbers:
        var m = e, prev_e = 1, step = 0;

        // step 2: find the best possible arc
        do {
          prev_good = curr_good;
          prev_arc = arc;
          m = (s + e)/2;
          step++;

          np2 = this.get(m);
          np3 = this.get(e);

          arc = utils.getccenter(np1, np2, np3);
          
          //also save the t values
          arc.interval = {
            start: s,
            end: e
          };

          var error = this._error(arc, np1, s, e);
          curr_good = (error <= errorThreshold);

          done = prev_good && !curr_good;
          if(!done) prev_e = e;

          // this arc is fine: we can move 'e' up to see if we can find a wider arc
          if(curr_good) {
            // if e is already at max, then we're done for this arc.
            if (e >= 1) {
              prev_e = 1;
              prev_arc = arc;
              break;
            }
            // if not, move it up by half the iteration distance
            e = e + (e-s)/2;
          }

          // this is a bad arc: we need to move 'e' down to find a good arc
          else {
            e = m;
          }
        }
        while(!done && safety++<100);

        if(safety>=100) {
          console.error("arc abstraction somehow failed...");
          break;
        }

        // console.log("[F] arc found", s, prev_e, prev_arc.x, prev_arc.y, prev_arc.s, prev_arc.e);

        prev_arc = (prev_arc ? prev_arc : arc);
        circles.push(prev_arc);
        s = prev_e;
      }
      while(e < 1);
      return circles;
    }
  };

  module.exports = Bezier;

}());


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  "use strict";

  // math-inlining.
  var abs = Math.abs,
      cos = Math.cos,
      sin = Math.sin,
      acos = Math.acos,
      atan2 = Math.atan2,
      sqrt = Math.sqrt,
      pow = Math.pow,
      // cube root function yielding real roots
      crt = function(v) { return (v<0) ? -pow(-v,1/3) : pow(v,1/3); },
      // trig constants
      pi = Math.PI,
      tau = 2*pi,
      quart = pi/2,
      // float precision significant decimal
      epsilon = 0.000001;

  // Bezier utility functions
  var utils = {
    // Legendre-Gauss abscissae with n=24 (x_i values, defined at i=n as the roots of the nth order Legendre polynomial Pn(x))
    Tvalues: [
      -0.0640568928626056260850430826247450385909,
       0.0640568928626056260850430826247450385909,
      -0.1911188674736163091586398207570696318404,
       0.1911188674736163091586398207570696318404,
      -0.3150426796961633743867932913198102407864,
       0.3150426796961633743867932913198102407864,
      -0.4337935076260451384870842319133497124524,
       0.4337935076260451384870842319133497124524,
      -0.5454214713888395356583756172183723700107,
       0.5454214713888395356583756172183723700107,
      -0.6480936519369755692524957869107476266696,
       0.6480936519369755692524957869107476266696,
      -0.7401241915785543642438281030999784255232,
       0.7401241915785543642438281030999784255232,
      -0.8200019859739029219539498726697452080761,
       0.8200019859739029219539498726697452080761,
      -0.8864155270044010342131543419821967550873,
       0.8864155270044010342131543419821967550873,
      -0.9382745520027327585236490017087214496548,
       0.9382745520027327585236490017087214496548,
      -0.9747285559713094981983919930081690617411,
       0.9747285559713094981983919930081690617411,
      -0.9951872199970213601799974097007368118745,
       0.9951872199970213601799974097007368118745
    ],

    // Legendre-Gauss weights with n=24 (w_i values, defined by a function linked to in the Bezier primer article)
    Cvalues: [
      0.1279381953467521569740561652246953718517,
      0.1279381953467521569740561652246953718517,
      0.1258374563468282961213753825111836887264,
      0.1258374563468282961213753825111836887264,
      0.1216704729278033912044631534762624256070,
      0.1216704729278033912044631534762624256070,
      0.1155056680537256013533444839067835598622,
      0.1155056680537256013533444839067835598622,
      0.1074442701159656347825773424466062227946,
      0.1074442701159656347825773424466062227946,
      0.0976186521041138882698806644642471544279,
      0.0976186521041138882698806644642471544279,
      0.0861901615319532759171852029837426671850,
      0.0861901615319532759171852029837426671850,
      0.0733464814110803057340336152531165181193,
      0.0733464814110803057340336152531165181193,
      0.0592985849154367807463677585001085845412,
      0.0592985849154367807463677585001085845412,
      0.0442774388174198061686027482113382288593,
      0.0442774388174198061686027482113382288593,
      0.0285313886289336631813078159518782864491,
      0.0285313886289336631813078159518782864491,
      0.0123412297999871995468056670700372915759,
      0.0123412297999871995468056670700372915759
    ],

    arcfn: function(t, derivativeFn) {
      var d = derivativeFn(t);
      var l = d.x*d.x + d.y*d.y;
      if(typeof d.z !== "undefined") {
        l += d.z*d.z;
      }
      return sqrt(l);
    },

    between: function(v, m, M) {
      return (m <= v && v <= M) || utils.approximately(v, m) || utils.approximately(v, M);
    },

    approximately: function(a,b,precision) {
      return abs(a-b) <= (precision || epsilon);
    },

    length: function(derivativeFn) {
      var z=0.5,sum=0,len=utils.Tvalues.length,i,t;
      for(i=0; i<len; i++) {
        t = z * utils.Tvalues[i] + z;
        sum += utils.Cvalues[i] * utils.arcfn(t,derivativeFn);
      }
      return z * sum;
    },

    map: function(v, ds,de, ts,te) {
      var d1 = de-ds, d2 = te-ts, v2 =  v-ds, r = v2/d1;
      return ts + d2*r;
    },

    lerp: function(r, v1, v2) {
      var ret = {
        x: v1.x + r*(v2.x-v1.x),
        y: v1.y + r*(v2.y-v1.y)
      };
      if(!!v1.z && !!v2.z) {
        ret.z =  v1.z + r*(v2.z-v1.z);
      }
      return ret;
    },

    pointToString: function(p) {
      var s = p.x+"/"+p.y;
      if(typeof p.z !== "undefined") {
        s += "/"+p.z;
      }
      return s;
    },

    pointsToString: function(points) {
      return "[" + points.map(utils.pointToString).join(", ") + "]";
    },

    copy: function(obj) {
      return JSON.parse(JSON.stringify(obj));
    },

    angle: function(o,v1,v2) {
      var dx1 = v1.x - o.x,
          dy1 = v1.y - o.y,
          dx2 = v2.x - o.x,
          dy2 = v2.y - o.y,
          cross = dx1*dy2 - dy1*dx2,
          m1 = sqrt(dx1*dx1+dy1*dy1),
          m2 = sqrt(dx2*dx2+dy2*dy2),
          dot;
      dx1/=m1; dy1/=m1; dx2/=m2; dy2/=m2;
      dot = dx1*dx2 + dy1*dy2;
      return atan2(cross, dot);
    },

    // round as string, to avoid rounding errors
    round: function(v, d) {
      var s = '' + v;
      var pos = s.indexOf(".");
      return parseFloat(s.substring(0,pos+1+d));
    },

    dist: function(p1, p2) {
      var dx = p1.x - p2.x,
          dy = p1.y - p2.y;
      return sqrt(dx*dx+dy*dy);
    },

    closest: function(LUT, point) {
      var mdist = pow(2,63), mpos, d;
      LUT.forEach(function(p, idx) {
        d = utils.dist(point, p);
        if (d<mdist) {
          mdist = d;
          mpos = idx;
        }
      });
      return { mdist:mdist, mpos:mpos };
    },

    abcratio: function(t, n) {
      // see ratio(t) note on http://pomax.github.io/bezierinfo/#abc
      if (n!==2 && n!==3) {
        return false;
      }
      if (typeof t === "undefined") {
        t = 0.5;
      } else if (t===0 || t===1) {
        return t;
      }
      var bottom = pow(t,n) + pow(1-t,n), top = bottom - 1;
      return abs(top/bottom);
    },

    projectionratio: function(t, n) {
      // see u(t) note on http://pomax.github.io/bezierinfo/#abc
      if (n!==2 && n!==3) {
        return false;
      }
      if (typeof t === "undefined") {
        t = 0.5;
      } else if (t===0 || t===1) {
        return t;
      }
      var top = pow(1-t, n), bottom = pow(t,n) + top;
      return top/bottom;
    },

    lli8: function(x1,y1,x2,y2,x3,y3,x4,y4) {
      var nx=(x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4),
          ny=(x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4),
          d=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
      if(d==0) { return false; }
      return { x: nx/d, y: ny/d };
    },

    lli4: function(p1,p2,p3,p4) {
      var x1 = p1.x, y1 = p1.y,
          x2 = p2.x, y2 = p2.y,
          x3 = p3.x, y3 = p3.y,
          x4 = p4.x, y4 = p4.y;
      return utils.lli8(x1,y1,x2,y2,x3,y3,x4,y4);
    },

    lli: function(v1, v2) {
      return utils.lli4(v1,v1.c,v2,v2.c);
    },

    makeline: function(p1,p2) {
      var Bezier = __webpack_require__(6);
      var x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y, dx = (x2-x1)/3, dy = (y2-y1)/3;
      return new Bezier(x1, y1, x1+dx, y1+dy, x1+2*dx, y1+2*dy, x2, y2);
    },

    findbbox: function(sections) {
      var mx=99999999,my=mx,MX=-mx,MY=MX;
      sections.forEach(function(s) {
        var bbox = s.bbox();
        if(mx > bbox.x.min) mx = bbox.x.min;
        if(my > bbox.y.min) my = bbox.y.min;
        if(MX < bbox.x.max) MX = bbox.x.max;
        if(MY < bbox.y.max) MY = bbox.y.max;
      });
      return {
        x: { min: mx, mid:(mx+MX)/2, max: MX, size:MX-mx },
        y: { min: my, mid:(my+MY)/2, max: MY, size:MY-my }
      }
    },

    shapeintersections: function(s1, bbox1, s2, bbox2, curveIntersectionThreshold) {
      if(!utils.bboxoverlap(bbox1, bbox2)) return [];
      var intersections = [];
      var a1 = [s1.startcap, s1.forward, s1.back, s1.endcap];
      var a2 = [s2.startcap, s2.forward, s2.back, s2.endcap];
      a1.forEach(function(l1) {
        if(l1.virtual) return;
        a2.forEach(function(l2) {
          if(l2.virtual) return;
          var iss = l1.intersects(l2, curveIntersectionThreshold);
          if(iss.length>0) {
            iss.c1 = l1;
            iss.c2 = l2;
            iss.s1 = s1;
            iss.s2 = s2;
            intersections.push(iss);
          }
        });
      });
      return intersections;
    },

    makeshape: function(forward, back, curveIntersectionThreshold) {
      var bpl = back.points.length;
      var fpl = forward.points.length;
      var start  = utils.makeline(back.points[bpl-1], forward.points[0]);
      var end    = utils.makeline(forward.points[fpl-1], back.points[0]);
      var shape  = {
        startcap: start,
        forward: forward,
        back: back,
        endcap: end,
        bbox: utils.findbbox([start, forward, back, end])
      };
      var self = utils;
      shape.intersections = function(s2) {
        return self.shapeintersections(shape,shape.bbox,s2,s2.bbox, curveIntersectionThreshold);
      };
      return shape;
    },

    getminmax: function(curve, d, list) {
      if(!list) return { min:0, max:0 };
      var min=0xFFFFFFFFFFFFFFFF, max=-min,t,c;
      if(list.indexOf(0)===-1) { list = [0].concat(list); }
      if(list.indexOf(1)===-1) { list.push(1); }
      for(var i=0,len=list.length; i<len; i++) {
        t = list[i];
        c = curve.get(t);
        if(c[d] < min) { min = c[d]; }
        if(c[d] > max) { max = c[d]; }
      }
      return { min:min, mid:(min+max)/2, max:max, size:max-min };
    },

    align: function(points, line) {
      var tx = line.p1.x,
          ty = line.p1.y,
          a = -atan2(line.p2.y-ty, line.p2.x-tx),
          d = function(v) {
            return {
              x: (v.x-tx)*cos(a) - (v.y-ty)*sin(a),
              y: (v.x-tx)*sin(a) + (v.y-ty)*cos(a)
            };
          };
      return points.map(d);
    },

    roots: function(points, line) {
      line = line || {p1:{x:0,y:0},p2:{x:1,y:0}};
      var order = points.length - 1;
      var p = utils.align(points, line);
      var reduce = function(t) { return 0<=t && t <=1; };

      if (order === 2) {
        var a = p[0].y,
            b = p[1].y,
            c = p[2].y,
            d = a - 2*b + c;
        if(d!==0) {
          var m1 = -sqrt(b*b-a*c),
              m2 = -a+b,
              v1 = -( m1+m2)/d,
              v2 = -(-m1+m2)/d;
          return [v1, v2].filter(reduce);
        }
        else if(b!==c && d===0) {
          return [ (2*b-c)/2*(b-c) ].filter(reduce);
        }
        return [];
      }

      // see http://www.trans4mind.com/personal_development/mathematics/polynomials/cubicAlgebra.htm
      var pa = p[0].y,
          pb = p[1].y,
          pc = p[2].y,
          pd = p[3].y,
          d = (-pa + 3*pb - 3*pc + pd),
          a = (3*pa - 6*pb + 3*pc) / d,
          b = (-3*pa + 3*pb) / d,
          c = pa / d,
          p = (3*b - a*a)/3,
          p3 = p/3,
          q = (2*a*a*a - 9*a*b + 27*c)/27,
          q2 = q/2,
          discriminant = q2*q2 + p3*p3*p3,
          u1,v1,x1,x2,x3;
       if (discriminant < 0) {
        var mp3 = -p/3,
            mp33 = mp3*mp3*mp3,
            r = sqrt( mp33 ),
            t = -q/(2*r),
            cosphi = t<-1 ? -1 : t>1 ? 1 : t,
            phi = acos(cosphi),
            crtr = crt(r),
            t1 = 2*crtr;
        x1 = t1 * cos(phi/3) - a/3;
        x2 = t1 * cos((phi+tau)/3) - a/3;
        x3 = t1 * cos((phi+2*tau)/3) - a/3;
        return [x1, x2, x3].filter(reduce);
      } else if(discriminant === 0) {
        u1 = q2 < 0 ? crt(-q2) : -crt(q2);
        x1 = 2*u1-a/3;
        x2 = -u1 - a/3;
        return [x1,x2].filter(reduce);
      } else {
        var sd = sqrt(discriminant);
        u1 = crt(-q2+sd);
        v1 = crt(q2+sd);
        return [u1-v1-a/3].filter(reduce);;
      }
    },

    droots: function(p) {
      // quadratic roots are easy
      if(p.length === 3) {
        var a = p[0],
            b = p[1],
            c = p[2],
            d = a - 2*b + c;
        if(d!==0) {
          var m1 = -sqrt(b*b-a*c),
              m2 = -a+b,
              v1 = -( m1+m2)/d,
              v2 = -(-m1+m2)/d;
          return [v1, v2];
        }
        else if(b!==c && d===0) {
          return [(2*b-c)/(2*(b-c))];
        }
        return [];
      }

      // linear roots are even easier
      if(p.length === 2) {
        var a = p[0], b = p[1];
        if(a!==b) {
          return [a/(a-b)];
        }
        return [];
      }
    },

    inflections: function(points) {
      if (points.length<4) return [];

      // FIXME: TODO: add in inflection abstraction for quartic+ curves?

      var p = utils.align(points, { p1: points[0], p2: points.slice(-1)[0] }),
          a = p[2].x * p[1].y,
          b = p[3].x * p[1].y,
          c = p[1].x * p[2].y,
          d = p[3].x * p[2].y,
          v1 = 18 * (-3*a + 2*b + 3*c - d),
          v2 = 18 * (3*a - b - 3*c),
          v3 = 18 * (c - a);

      if (utils.approximately(v1,0)) return [];

      var trm = v2*v2 - 4*v1*v3,
          sq = Math.sqrt(trm),
          d = 2 * v1;

      if (utils.approximately(d,0)) return [];

      return [(sq-v2)/d, -(v2+sq)/d].filter(function(r) {
        return (0 <= r && r <= 1);
      });
    },

    bboxoverlap: function(b1,b2) {
      var dims=['x','y'],len=dims.length,i,dim,l,t,d
      for(i=0; i<len; i++) {
        dim = dims[i];
        l = b1[dim].mid;
        t = b2[dim].mid;
        d = (b1[dim].size + b2[dim].size)/2;
        if(abs(l-t) >= d) return false;
      }
      return true;
    },

    expandbox: function(bbox, _bbox) {
      if(_bbox.x.min < bbox.x.min) { bbox.x.min = _bbox.x.min; }
      if(_bbox.y.min < bbox.y.min) { bbox.y.min = _bbox.y.min; }
      if(_bbox.z && _bbox.z.min < bbox.z.min) { bbox.z.min = _bbox.z.min; }
      if(_bbox.x.max > bbox.x.max) { bbox.x.max = _bbox.x.max; }
      if(_bbox.y.max > bbox.y.max) { bbox.y.max = _bbox.y.max; }
      if(_bbox.z && _bbox.z.max > bbox.z.max) { bbox.z.max = _bbox.z.max; }
      bbox.x.mid = (bbox.x.min + bbox.x.max)/2;
      bbox.y.mid = (bbox.y.min + bbox.y.max)/2;
      if(bbox.z) { bbox.z.mid = (bbox.z.min + bbox.z.max)/2; }
      bbox.x.size = bbox.x.max - bbox.x.min;
      bbox.y.size = bbox.y.max - bbox.y.min;
      if(bbox.z) { bbox.z.size = bbox.z.max - bbox.z.min; }
    },

    pairiteration: function(c1, c2, curveIntersectionThreshold) {
      var c1b = c1.bbox(),
          c2b = c2.bbox(),
          r = 100000,
          threshold = curveIntersectionThreshold || 0.5;
      if(c1b.x.size + c1b.y.size < threshold && c2b.x.size + c2b.y.size < threshold) {
        return [ ((r * (c1._t1+c1._t2)/2)|0)/r + "/" + ((r * (c2._t1+c2._t2)/2)|0)/r ];
      }
      var cc1 = c1.split(0.5),
          cc2 = c2.split(0.5),
          pairs = [
            {left: cc1.left, right: cc2.left },
            {left: cc1.left, right: cc2.right },
            {left: cc1.right, right: cc2.right },
            {left: cc1.right, right: cc2.left }];
      pairs = pairs.filter(function(pair) {
        return utils.bboxoverlap(pair.left.bbox(),pair.right.bbox());
      });
      var results = [];
      if(pairs.length === 0) return results;
      pairs.forEach(function(pair) {
        results = results.concat(
          utils.pairiteration(pair.left, pair.right, threshold)
        );
      })
      results = results.filter(function(v,i) {
        return results.indexOf(v) === i;
      });
      return results;
    },

    getccenter: function(p1,p2,p3) {
      var dx1 = (p2.x - p1.x),
          dy1 = (p2.y - p1.y),
          dx2 = (p3.x - p2.x),
          dy2 = (p3.y - p2.y);
      var dx1p = dx1 * cos(quart) - dy1 * sin(quart),
          dy1p = dx1 * sin(quart) + dy1 * cos(quart),
          dx2p = dx2 * cos(quart) - dy2 * sin(quart),
          dy2p = dx2 * sin(quart) + dy2 * cos(quart);
      // chord midpoints
      var mx1 = (p1.x + p2.x)/2,
          my1 = (p1.y + p2.y)/2,
          mx2 = (p2.x + p3.x)/2,
          my2 = (p2.y + p3.y)/2;
      // midpoint offsets
      var mx1n = mx1 + dx1p,
          my1n = my1 + dy1p,
          mx2n = mx2 + dx2p,
          my2n = my2 + dy2p;
      // intersection of these lines:
      var arc = utils.lli8(mx1,my1,mx1n,my1n, mx2,my2,mx2n,my2n),
          r = utils.dist(arc,p1),
          // arc start/end values, over mid point:
          s = atan2(p1.y - arc.y, p1.x - arc.x),
          m = atan2(p2.y - arc.y, p2.x - arc.x),
          e = atan2(p3.y - arc.y, p3.x - arc.x),
          _;
      // determine arc direction (cw/ccw correction)
      if (s<e) {
        // if s<m<e, arc(s, e)
        // if m<s<e, arc(e, s + tau)
        // if s<e<m, arc(e, s + tau)
        if (s>m || m>e) { s += tau; }
        if (s>e) { _=e; e=s; s=_; }
      } else {
        // if e<m<s, arc(e, s)
        // if m<e<s, arc(s, e + tau)
        // if e<s<m, arc(s, e + tau)
        if (e<m && m<s) { _=e; e=s; s=_; } else { e += tau; }
      }
      // assign and done.
      arc.s = s;
      arc.e = e;
      arc.r = r;
      return arc;
    }
  };

  module.exports = utils;
}());


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(1);
var FullArticle = __webpack_require__(14);

// in the browser, do:
if (typeof document !== "undefined") {
  ReactDOM.render(React.createElement(FullArticle, null), document.getElementById("article"));
}

// in not-the browser, do:
module.exports = { FullArticle: FullArticle };

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function(){};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

// https://github.com/thibauts/b-spline
module.exports = function interpolate(t, degree, points, knots, weights, result, scaled) {
  
  var i,j,s,l;              // function-scoped iteration variables
  var n = points.length;    // points count
  var d = points[0].length; // point dimensionality

  if(degree < 1) throw new Error('degree must be at least 1 (linear)');
  if(degree > (n-1)) throw new Error('degree must be less than or equal to point count - 1');

  if(!weights) {
    // build weight vector of length [n]
    weights = [];
    for(i=0; i<n; i++) {
      weights[i] = 1;
    }
  }

  if(!knots) {
    // build knot vector of length [n + degree + 1]
    var knots = [];
    for(i=0; i<n+degree+1; i++) {
      knots[i] = i;
    }
  } else {
    if(knots.length !== n+degree+1) throw new Error('bad knot vector length');
  }

  var domain = [
    degree,
    knots.length-1 - degree
  ];

  var low  = knots[domain[0]];
  var high = knots[domain[1]];
  
  // remap t to the domain where the spline is defined
  if (!scaled) {
    t = t * (high - low) + low;
  }

  if(t < low || t > high) throw new Error('out of bounds');

  // find s (the spline segment) for the [t] value provided
  for(s=domain[0]; s<domain[1]; s++) {
    if(t >= knots[s] && t <= knots[s+1]) {
      break;
    }
  }

  // convert points to homogeneous coordinates
  var v = [];
  for(i=0; i<n; i++) {
    v[i] = [];
    for(j=0; j<d; j++) {
      v[i][j] = points[i][j] * weights[i];
    }
    v[i][d] = weights[i];
  }

  // l (level) goes from 1 to the curve degree + 1
  var alpha;
  for(l=1; l<=degree+1; l++) {
    // build level l of the pyramid
    for(i=s; i>s-degree-1+l; i--) {
      alpha = (t - knots[i]) / (knots[i+degree+1-l] - knots[i]);

      // interpolate each component
      for(j=0; j<d+1; j++) {
        v[i][j] = (1 - alpha) * v[i-1][j] + alpha * v[i][j];
      }
    }
  }

  // convert back to cartesian and return
  var result = result || [];
  for(i=0; i<d; i++) {
    result[i] = v[s][i] / v[s][d];
  }

  return result;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

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
	!(__WEBPACK_AMD_DEFINE_FACTORY__ = (paper),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module === 'object' && module) {
	module.exports = paper;
}

return paper;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);

var interpolate = __webpack_require__(10);

var BSplineGraphic = React.createClass({
  displayName: "BSplineGraphic",
  componentWillMount: function componentWillMount() {
    var _this = this;

    // lots of instance binding, because we want instance binding, not proto/class binding.
    this.cvs = undefined;
    this.ctx = undefined;
    this.key = undefined;
    this.keyCode = undefined;
    this.mouseX = undefined;
    this.mouseY = undefined;
    this.isMouseDown = undefined;
    this.width = 0;
    this.height = 0;
    this.activeDistance = 9;
    this.points = [];
    this.knots = [];
    this.weights = [];
    this.nodes = [];
    this.cp = undefined;
    this.dx = undefined;
    this.dy = undefined;
    // and sketch value binding.
    var sketch = this.props.sketch;
    Object.keys(sketch).forEach(function (fn) {
      _this[fn] = sketch[fn];
      // rebind "this" if we're dealing with a function
      if (typeof _this[fn] === "function") {
        _this[fn] = _this[fn].bind(_this);
      }
    });
  },


  render: function render() {
    return React.createElement("canvas", { className: "bspline-graphic", ref: "sketch" });
  },

  keydownlisten: function keydownlisten(e) {
    this.setKeyboardValues(e);this.keyDown();
  },
  keyuplisten: function keyuplisten(e) {
    this.setKeyboardValues(e);this.keyUp();
  },
  keypresslisten: function keypresslisten(e) {
    this.setKeyboardValues(e);this.keyPressed();
  },
  mousedownlisten: function mousedownlisten(e) {
    this.setMouseValues(e);this.mouseDown();
  },
  mouseuplisten: function mouseuplisten(e) {
    this.setMouseValues(e);this.mouseUp();
  },
  mousemovelisten: function mousemovelisten(e) {
    this.setMouseValues(e);this.mouseMove();if (this.isMouseDown && this.mouseDrag) {
      this.mouseDrag();
    }
  },
  wheellissten: function wheellissten(e) {
    e.preventDefault();this.scrolled(e.deltaY < 0 ? 1 : -1);
  },
  componentDidMount: function componentDidMount() {
    var cvs = this.cvs = this.refs.sketch;
    // Keyboard event handling
    cvs.addEventListener("keydown", this.keydownlisten);
    cvs.addEventListener("keyup", this.keyuplisten);
    cvs.addEventListener("keypress", this.keypresslisten);
    // Mouse event handling
    cvs.addEventListener("mousedown", this.mousedownlisten);
    cvs.addEventListener("mouseup", this.mouseuplisten);
    cvs.addEventListener("mousemove", this.mousemovelisten);
    // Scroll event handling
    if (this.props.scrolling) {
      cvs.addEventListener("wheel", this.wheellissten);
    }
    // Boom let's go
    this.setup();
  },
  componentWillUnmount: function componentWillUnmount() {
    var cvs = this.cvs = this.refs.sketch;
    cvs.removeEventListener("keydown", this.keydownlisten);
    cvs.removeEventListener("keyup", this.keyuplisten);
    cvs.removeEventListener("keypress", this.keypresslisten);
    cvs.removeEventListener("mousedown", this.mousedownlisten);
    cvs.removeEventListener("mouseup", this.mouseuplisten);
    cvs.removeEventListener("mousemove", this.mousemovelisten);
    if (this.props.scrolling) {
      cvs.removeEventListener("wheel", this.wheellissten);
    }
  },


  // base API

  drawCurve: function drawCurve(points) {
    points = points || this.points;
    var ctx = this.ctx;
    var weights = this.weights.length > 0 ? this.weights : false;
    ctx.beginPath();
    var p = interpolate(0, this.degree, points, this.knots, weights);
    ctx.moveTo(p[0], p[1]);
    for (var t = 0.01; t < 1; t += 0.01) {
      p = interpolate(t, this.degree, points, this.knots, weights);
      ctx.lineTo(p[0], p[1]);
    }
    p = interpolate(1, this.degree, points, this.knots, weights);
    ctx.lineTo(p[0], p[1]);
    ctx.stroke();
    ctx.closePath();
  },
  drawKnots: function drawKnots(points) {
    var _this2 = this;

    var knots = this.knots;
    var weights = this.weights.length > 0 ? this.weights : false;
    knots.forEach(function (knot, i) {
      if (i < _this2.degree) return;
      if (i > knots.length - 1 - _this2.degree) return;
      var p = interpolate(knot, _this2.degree, points, knots, weights, false, true);
      _this2.circle(p[0], p[1], 3);
    });
  },


  // FIXME: TODO: these do not seem correct using uniform knots
  drawNodes: function drawNodes(points) {
    var _this3 = this;

    var i = 0,
        p;
    this.stroke(150);
    this.nodes.forEach(function (node, i) {
      try {
        p = interpolate(node, _this3.degree, points, _this3.knots, false, false, true);
        _this3.line(p[0], p[1], points[i][0], points[i++][1]);
      } catch (e) {
        console.error(e);
      }
    });
  },


  // FIXME: this doesn't work with a degree change
  formKnots: function formKnots(points, open) {
    open = open === true ? true : false;
    if (!open) return this.formUniformKnots(points);

    var l = points.length,
        knots = [],
        m = l - this.degree,
        i;

    // form the open-uniform knot vector
    for (i = 1; i < l - this.degree; i++) {
      knots.push(i + this.degree);
    }
    // add [degree] zeroes at the front
    for (i = 0; i <= this.degree; i++) {
      knots = [this.degree].concat(knots);
    }
    // add [degree] max-values to the back
    for (i = 0; i <= this.degree; i++) {
      knots.push(m + this.degree);
    }

    return knots;
  },
  formUniformKnots: function formUniformKnots(points) {
    var knots = [];
    for (var i = this.points.length + this.degree; i >= 0; i--) {
      knots.push(i);
    }
    return knots.reverse();
  },
  formNodes: function formNodes(knots, points) {
    var domain = [this.degree, knots.length - 1 - this.degree];
    var nodes = [],
        node,
        k,
        offset;
    for (k = 0; k < this.points.length; k++) {
      node = 0;
      for (offset = 1; offset <= this.degree; offset++) {
        node += knots[k + offset];
      }
      node /= this.degree;
      if (node < knots[domain[0]]) continue;
      if (node > knots[domain[1]]) continue;
      nodes.push(node);
    }
    return nodes;
  },
  formWeights: function formWeights(points) {
    var weights = [];
    points.forEach(function (p) {
      return weights.push(1);
    });
    return weights;
  },
  setDegree: function setDegree(d) {
    this.degree += d;
    this.knots = this.formKnots(this.points);
    this.nodes = this.formNodes(this.knots, this.points);
  },
  near: function near(p, x, y) {
    var dx = p.x - x,
        dy = p.y - y,
        d = Math.sqrt(dx * dx + dy * dy);
    return d < this.activeDistance;
  },
  getCurrentPoint: function getCurrentPoint(x, y) {
    for (var i = 0; i < this.points.length; i++) {
      if (this.near(this.points[i], x, y)) {
        return this.points[i];
      }
    }
  },


  // Interaction stuffs

  keyDown: function keyDown() {
    if (this.key === 'ArrowUp') {
      this.setDegree(1);
    }
    if (this.key === 'ArrowDown') {
      if (this.degree > 1) {
        this.setDegree(-1);
      }
    }
    this.redraw();
  },
  keyUp: function keyUp() {
    // ... do nothing?
  },
  keyPressed: function keyPressed() {
    // ... do nothing?
  },
  mouseDown: function mouseDown() {
    this.isMouseDown = true;
    this.cp = this.getCurrentPoint(this.mouseX, this.mouseY);
    if (!this.cp) {
      this.points.push({ x: this.mouseX, y: this.mouseY });
      this.knots = this.formKnots(this.points);
      this.nodes = this.formNodes(this.knots, this.points);
    }
    this.redraw();
  },
  mouseUp: function mouseUp() {
    this.isMouseDown = false;
    this.cp = false;
    this.redraw();
  },
  mouseDrag: function mouseDrag() {
    if (this.cp) {
      this.cp.x = this.mouseX;
      this.cp.y = this.mouseY;
      this.redraw();
    }
  },
  mouseMove: function mouseMove() {
    // ... do nothing?
  },
  scrolled: function scrolled(direction) {
    this.cp = this.getCurrentPoint(this.mouseX, this.mouseY);
    if (!this.cp) return;
    // base case
    var pos = this.points.indexOf(this.cp);
    if (this.weights.length > pos) {
      this.weights[pos] += direction * 0.1;
      if (this.weights[pos] < 0) {
        this.weights[pos] = 0;
      }
    }
    // possible multiplicity due to "closed" curves
    pos = this.points.indexOf(this.cp, pos + 1);
    if (pos !== -1 && this.weights.length > pos) {
      this.weights[pos] += direction * 0.1;
      if (this.weights[pos] < 0) {
        this.weights[pos] = 0;
      }
    }
    this.redraw();
  },


  // keyboard events
  setKeyboardValues: function setKeyboardValues(e) {
    if (!e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
    }
    this.key = e.key;
    this.keyCode = e.code;
  },


  // mouse events
  setMouseValues: function setMouseValues(e) {
    var brect = this.cvs.getBoundingClientRect();
    this.mouseX = e.clientX - brect.left;
    this.mouseY = e.clientY - brect.top;
  },


  // API stuffs

  size: function size(w, h) {
    this.width = w | 0;
    this.height = (h || w) | 0;
    this.cvs.width = this.width;
    this.cvs.height = this.height;
    this.ctx = this.cvs.getContext("2d");
  },
  redraw: function redraw() {
    this.draw();
  },
  clear: function clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },
  grid: function grid(spacing) {
    spacing = ((spacing || 10) | 0) + 0.5;
    this.stroke(200, 200, 220);
    for (var x = spacing; x < this.width - 1; x += spacing) {
      this.line(x, 0, x, this.height);
    }
    for (var y = spacing; y < this.height - 1; y += spacing) {
      this.line(0, y, this.width, y);
    }
  },
  circle: function circle(x, y, r) {
    var hr = r / 2;
    var ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  },
  line: function line(a, b, c, d) {
    var ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(a, b);
    ctx.lineTo(c, d);
    ctx.stroke();
    ctx.closePath();
  },
  stroke: function stroke(r, g, b, a) {
    if (typeof r === "string") {
      return this.ctx.strokeStyle = r;
    }
    if (g === undefined) {
      g = r;b = r;
    }
    if (a === undefined) {
      a = 1;
    }
    this.ctx.strokeStyle = this.rgba(r, g, b, a);
  },
  noStroke: function noStroke() {
    this.ctx.strokeStyle = "none";
  },
  fill: function fill(r, g, b, a) {
    if (typeof r === "string") {
      return this.ctx.fillStyle = r;
    }
    if (g === undefined) {
      g = r;b = r;
    }
    if (a === undefined) {
      a = 1;
    }
    this.ctx.fillStyle = this.rgba(r, g, b, a);
  },
  noFill: function noFill() {
    this.ctx.fillStyle = "none";
  },
  rgba: function rgba(r, g, b, a) {
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  },
  beginPath: function beginPath() {
    this.ctx.beginPath();this.bp = true;
  },
  vertex: function vertex(x, y) {
    if (!this.bp) {
      return this.ctx.lineTo(x, y);
    }
    this.ctx.moveTo(x, y);
    this.bp = false;
  },
  endPath: function endPath() {
    this.ctx.stroke();
    this.ctx.closePath();
  }
});

module.exports = BSplineGraphic;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);

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

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var Page = __webpack_require__(19);

var sectionList = __webpack_require__(5),
    sectionMap = function sectionMap(mapping) {
  return Object.keys(sectionList).map(mapping);
},
    allSections = sectionMap(function (name, entry) {
  var Type = sectionList[name];
  return React.createElement(Type, { key: name, name: name, number: entry });
});

var FullArticle = React.createClass({
  displayName: "FullArticle",

  render: function render() {
    return React.createElement(
      Page,
      null,
      allSections
    );
  }
});

module.exports = FullArticle;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);

var baseClass = {
  render: function render() {
    return React.createElement(
      "figure",
      { className: this.props.inline ? "inline" : false },
      React.createElement("canvas", { ref: "canvas",
        tabIndex: "0",
        style: {
          width: this.panelCount * this.defaultWidth + "px",
          height: this.defaultHeight + "px"
        },
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
    var dpr = this.getPixelRatio();
    cvs.width = this.defaultWidth * dpr;
    cvs.height = this.defaultHeight * dpr;
    this.cvs = cvs;
    var ctx = cvs.getContext("2d");
    this.ctx = ctx;
    this.ctx.scale(dpr, dpr);

    if (this.props.paperjs) {
      var Paper = this.Paper = __webpack_require__(11);
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
var gfxObject = __webpack_require__(22);
Object.keys(gfxObject).forEach(function (fname) {
  baseClass[fname] = gfxObject[fname];
});

module.exports = React.createClass(baseClass);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);

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

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);

var KnotController = React.createClass({
  displayName: 'KnotController',
  getInitialState: function getInitialState() {
    return {
      owner: false,
      knots: []
    };
  },
  bindKnots: function bindKnots(owner, knots) {
    this.setState({ owner: owner, knots: knots });
  },
  render: function render() {
    var _this = this;

    var type = 'range';
    var min = 0;
    var max = this.state.knots.length;
    var step = 1;
    return React.createElement(
      'section',
      { className: 'knot-controls' },
      React.createElement(
        'h2',
        null,
        'knot values'
      ),
      this.state.knots.map(function (value, position) {
        var props = {
          type: type, min: min, max: max, step: step,
          value: value,
          onChange: function onChange(e) {
            var k = _this.state.knots;
            k[position] = e.target.value;
            _this.setState({ knots: k }, function () {
              _this.state.owner.redraw();
            });
          }
        };
        return React.createElement(
          'div',
          { key: 'knot' + position },
          min,
          React.createElement('input', props),
          max,
          ' (= ',
          value,
          ')'
        );
      })
    );
  }
});

module.exports = KnotController;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var sections = __webpack_require__(5);
var sectionPages = Object.keys(sections);
var SectionHeader = __webpack_require__(4);

var Navigation = React.createClass({
  displayName: "Navigation",

  generateNavItem: function generateNavItem(name, entry) {
    var Type = sections[name];
    var title = Type.defaultProps.title;
    var locale = SectionHeader.locale;
    if (typeof window !== "undefined" && window.location.toString().indexOf(locale) === -1) {
      locale = '';
    }
    var fragmentid = (locale ? './' + locale + '/' : '.') + "#" + name;
    var link = React.createElement(
      "a",
      { href: fragmentid },
      title
    );
    var last = sectionPages.length - 1;
    if (entry === last) entry = null;
    return React.createElement(
      "li",
      { key: name, "data-number": entry },
      link
    );
  },

  generateNav: function generateNav() {
    return React.createElement(
      "div",
      { ref: "navigation" },
      React.createElement(
        "navigation",
        null,
        React.createElement(
          "ul",
          { className: "navigation" },
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

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);

var Ribbon = __webpack_require__(20);
var Header = __webpack_require__(16);
var LocaleSwitcher = __webpack_require__(24).LocaleSwitcher;
var Navigation = __webpack_require__(18);
var Footer = __webpack_require__(13);

var Page = React.createClass({
  displayName: "Page",

  renderPageContent: function renderPageContent(nav) {
    return React.createElement(
      "div",
      null,
      React.createElement(LocaleSwitcher, null),
      React.createElement(Navigation, null),
      this.props.children
    );
  },

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(Ribbon, null),
      React.createElement(Header, null),
      this.renderPageContent(),
      React.createElement(Footer, null)
    );
  }
});

module.exports = Page;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);

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
      React.createElement("img", { src: "images/ribbon.png", alt: "This page on GitHub", style: { border: "none" }, useMap: "#githubmap", width: "200", height: "149" }),
      React.createElement(
        "map",
        { name: "githubmap" },
        React.createElement("area", { shape: "poly", coords: "30,0, 200,0, 200,114", href: this.state.href, alt: "This page on GitHub" })
      )
    );
  }
});

module.exports = Ribbon;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);

var WeightController = React.createClass({
  displayName: 'WeightController',
  getInitialState: function getInitialState() {
    return {
      owner: false,
      weights: [],
      closed: false
    };
  },
  bindWeights: function bindWeights(owner, weights, closed) {
    this.setState({ owner: owner, weights: weights, closed: closed });
  },
  render: function render() {
    var _this = this;

    var type = 'range';
    var min = 0;
    var max = this.state.weights.length;
    var step = 1;

    var overlap = this.state.closed;
    var baselength = this.state.weights.length;
    if (overlap !== false) {
      baselength -= overlap;
    }

    return React.createElement(
      'section',
      { className: 'knot-controls' },
      React.createElement(
        'h2',
        null,
        'weight values'
      ),
      this.state.weights.map(function (value, position) {
        if (overlap && position >= baselength) {
          return null;
        }
        var props = {
          type: type, min: min, max: max, step: step,
          value: value,
          onChange: function onChange(e) {
            var k = _this.state.weights;
            k[position] = e.target.value;
            if (overlap && position < overlap) {
              k[position + baselength] = e.target.value;
            }
            _this.setState({ weights: k }, function () {
              _this.state.owner.redraw();
            });
          }
        };
        return React.createElement(
          'div',
          { key: 'knot' + position },
          min,
          React.createElement('input', props),
          max,
          ' (= ',
          value,
          ')'
        );
      })
    );
  }
});

module.exports = WeightController;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasWindow = typeof window !== "undefined";
var chroma = hasWindow && window.chroma ? window.chroma : __webpack_require__(111);
var Bezier = hasWindow && window.Bezier ? window.Bezier : __webpack_require__(109);

var API = {
  Paper: false,

  defaultWidth: 275,
  defaultHeight: 275,
  panelCount: 1,

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

  mouseDown: function mouseDown(evt) {
    var _this = this;

    this.mx = evt.fixedOffsetX;
    this.my = evt.fixedOffsetY;

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

    if ('setCapture' in evt.target) {
      evt.target.setCapture();
    }
  },

  mouseMove: function mouseMove(evt) {
    if (!this.props.static) {

      if (this.down) {
        this.dragging = true;
      }

      var found = false;
      this.lpts.forEach(function (p) {
        var mx = evt.fixedOffsetX;
        var my = evt.fixedOffsetY;
        if (Math.abs(mx - p.x) < 10 && Math.abs(my - p.y) < 10) {
          found = found || true;
        }
      });
      this.cvs.style.cursor = found ? "pointer" : "default";

      this.hover = {
        x: evt.fixedOffsetX,
        y: evt.fixedOffsetY
      };

      if (this.movingPoint) {
        this.ox = evt.fixedOffsetX - this.mx;
        this.oy = evt.fixedOffsetY - this.my;
        this.mp.x = Math.max(0, Math.min(this.defaultWidth, this.cx + this.ox));
        this.mp.y = Math.max(0, Math.min(this.defaultHeight, this.cy + this.oy));
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
    this.mx = evt.fixedOffsetX;
    this.my = evt.fixedOffsetY;
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
    var dpr = this.getPixelRatio();
    this.ctx.scale(dpr, dpr);
    this.offset = { x: 0, y: 0 };
    this.colorSeed = 0;
  },

  setSize: function setSize(w, h) {
    this.defaultWidth = w;
    this.defaultHeight = h;

    var cvs = this.refs.canvas;
    cvs.style.width = this.panelCount * w + "px";
    cvs.style.height = h + "px";

    var dpr = this.getPixelRatio();
    cvs.width = this.panelCount * w * dpr;
    cvs.height = h * dpr;
    this.ctx.scale(dpr, dpr);
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

  getPixelRatio: function getPixelRatio() {
    return window.devicePixelRatio || 1;
  },

  toImage: function toImage() {
    var dataURL = this.refs.canvas.toDataURL();
    var img = new Image();
    img.src = dataURL;
    img.devicePixelRatio = this.getPixelRatio();
    return img;
  },

  setPanelCount: function setPanelCount(c) {
    this.panelCount = c;
    var cvs = this.refs.canvas;
    cvs.width = c * this.defaultWidth * this.getPixelRatio();
    cvs.style.width = c * this.defaultWidth + "px";
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
    var dpr = _image.devicePixelRatio || 1;
    if (_image.loaded) {
      this.ctx.drawImage(_image, offset.x, offset.y, _image.width / dpr, _image.height / dpr);
    } else {
      _image.onload = function () {
        _image.loaded = true;
        _this5.ctx.drawImage(_image, offset.x, offset.y, _image.width / dpr, _image.height / dpr);
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
};

if (hasWindow) {
  window["Bezier Graphics API"] = API;
}
if (true) {
  module.exports = API;
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);

var Locale = __webpack_require__(3);
var locale = new Locale();
var page = "locale-switcher";

module.exports = function (props) {
  return React.createElement(
    "div",
    { className: "locale-switcher" },
    locale.getContent(page, this)
  );
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "LocaleSwitcher": __webpack_require__(23)
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
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
  }
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(25);
var generateBase = __webpack_require__(0);
module.exports = generateBase("abc", handler);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
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
  }
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(27);
var generateBase = __webpack_require__(0);
module.exports = generateBase("aligning", handler);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var atan2 = Math.atan2,
    PI = Math.PI,
    TAU = 2 * PI,
    cos = Math.cos,
    sin = Math.sin;

module.exports = {
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
  }
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(29);
var generateBase = __webpack_require__(0);
var keyHandling = __webpack_require__(2);
module.exports = keyHandling(generateBase("arcapproximation", handler));

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sin = Math.sin;
var tau = Math.PI * 2;

module.exports = {
  setup: function setup(api) {
    var w = api.getPanelWidth();
    var h = api.getPanelHeight();
    var generator;
    if (!this.generator) {
      generator = function generator(v, scale) {
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
  }
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(31);
var generateBase = __webpack_require__(0);
module.exports = generateBase("arclength", handler);

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
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
  }
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(33);
var generateBase = __webpack_require__(0);
var keyHandling = __webpack_require__(2);
module.exports = keyHandling(generateBase("arclengthapprox", handler));

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
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
    api.setColor("red");
    curve.extrema().values.forEach(function (t) {
      api.drawCircle(curve.get(t), 3);
    });
  }
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(35);
var generateBase = __webpack_require__(0);
module.exports = generateBase("boundingbox", handler);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  degree: 3,
  activeDistance: 9,

  setup: function setup() {
    this.size(600, 300);
    this.draw();
  },
  draw: function draw() {
    var _this = this;

    this.clear();
    this.grid(25);
    var p = this.points[0];
    this.points.forEach(function (n) {
      _this.stroke(200);
      _this.line(n.x, n.y, p.x, p.y);
      p = n;
      _this.stroke(0);
      _this.circle(p.x, p.y, 4);
    });
    this.drawSplineData();
  },
  drawSplineData: function drawSplineData() {
    if (this.points.length <= this.degree) return;
    var mapped = this.points.map(function (p) {
      return [p.x, p.y];
    });
    this.drawCurve(mapped);
    this.drawKnots(mapped);
  }
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  degree: 3,
  activeDistance: 9,

  setup: function setup() {
    this.size(400, 400);

    var TAU = Math.PI * 2;
    for (var i = 0; i < TAU; i += TAU / 9) {
      this.points.push({
        x: this.width / 2 + 100 * Math.cos(i),
        y: this.height / 2 + 100 * Math.sin(i)
      });
    }

    this.knots = this.formKnots(this.points);
    var m = Math.round(this.points.length / 2) | 0;
    this.knots[m + 0] = this.knots[m];
    this.knots[m + 1] = this.knots[m];
    this.knots[m + 2] = this.knots[m];
    for (var _i = m + 3; _i < this.knots.length; _i++) {
      this.knots[_i] = this.knots[_i - 1] + 1;
    }

    if (this.props.controller) {
      this.props.controller(this, this.knots);
    }

    this.draw();
  },
  draw: function draw() {
    var _this = this;

    this.clear();
    this.grid(25);
    var p = this.points[0];
    this.points.forEach(function (n) {
      _this.stroke(200);
      _this.line(n.x, n.y, p.x, p.y);
      p = n;
      _this.stroke(0);
      _this.circle(p.x, p.y, 4);
    });
    this.drawSplineData();
  },
  drawSplineData: function drawSplineData() {
    if (this.points.length <= this.degree) return;
    var mapped = this.points.map(function (p) {
      return [p.x, p.y];
    });
    this.drawCurve(mapped);
    this.drawKnots(mapped);
  }
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  basicSketch: __webpack_require__(37),
  interpolationGraph: __webpack_require__(41),
  uniformBSpline: __webpack_require__(44),
  centerCutBSpline: __webpack_require__(38),
  openUniformBSpline: __webpack_require__(42),
  rationalUniformBSpline: __webpack_require__(43),

  bindKnots: function bindKnots(owner, knots, ref) {
    this.refs[ref].bindKnots(owner, knots);
  },

  bindWeights: function bindWeights(owner, weights, closed, ref) {
    this.refs[ref].bindWeights(owner, weights, closed);
  }
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(39);
var generateBase = __webpack_require__(0);
module.exports = generateBase("bsplines", handler);

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var colors = ['#C00', '#CC0', '#0C0', '#0CC', '#00C', '#C0C', '#600', '#660', '#060', '#066', '#006', '#606'];

module.exports = {
  degree: 3,
  activeDistance: 9,
  cache: { N: [] },

  setup: function setup() {
    this.size(600, 300);
    this.points = [{ x: 0, y: 0 }, { x: 100, y: -100 }, { x: 200, y: 100 }, { x: 300, y: -100 }, { x: 400, y: 100 }, { x: 500, y: 0 }];
    this.knots = this.formKnots(this.points);
    if (this.props.controller) {
      this.props.controller(this, this.knots);
    }
    this.draw();
  },
  draw: function draw() {
    this.clear();
    var pad = 25;
    this.grid(pad);
    this.stroke(0);
    this.line(pad, 0, pad, this.height);
    var y = this.height - pad;
    this.line(0, y, this.width, y);

    var k = this.degree;
    var n = this.points.length || 4;

    for (var i = 0; i < n + 1 + k; i++) {
      this.drawN(i, k, pad, (this.width - pad) / (2 * (n + 2)), this.height - 2 * pad);
    }
  },
  drawN: function drawN(i, k, pad, w, h) {
    this.stroke(colors[i]);
    var knots = this.knots;
    this.beginPath();
    for (var start = i - 1, t = start, step = 0.1, end = i + k + 1; t < end; t += step) {
      var x = pad + i * w + t * w;
      var y = this.height - pad - this.N(i, k, t) * h;
      this.vertex(x, y);
    }
    this.endPath();
  },
  N: function N(i, k, t) {
    var t_i = this.knots[i];
    var t_i1 = this.knots[i + 1];
    var t_ik1 = this.knots[i + k - 1];
    var t_ik = this.knots[i + k];

    if (k === 1) {
      return t_i <= t && t <= t_i1 ? 1 : 0;
    }

    var n1 = t - t_i;
    var d1 = t_ik1 - t_i;
    var a1 = d1 === 0 ? 0 : n1 / d1;

    var n2 = t_ik - t;
    var d2 = t_ik - t_i1;
    var a2 = d2 === 0 ? 0 : n2 / d2;

    var N1 = 0;
    if (a1 !== 0) {
      var n1v = this.ensureN(i, k - 1, t);
      N1 = n1v === undefined ? this.N(i, k - 1, t) : n1v;
    }

    var N2 = 0;
    if (a2 !== 0) {
      var n2v = this.ensureN(i + 1, k - 1, t);
      N2 = n2v === undefined ? this.N(i + 1, k - 1, t) : n2v;
    }

    this.cacheN(i, k, t, a1 * N1 + a2 * N2);
    return this.cache.N[i][k][t];
  },
  ensureN: function ensureN(i, k, t) {
    if (!this.cache.N) {
      this.cache.N = [];
    }
    var N = this.cache.N;
    if (!N[i]) {
      N[i] = [];
    }
    if (!N[i][k]) {
      N[i][k] = [];
    }
    return N[i][k][t];
  },
  cacheN: function cacheN(i, k, t, value) {
    this.ensureN(i, k, t);
    this.cache.N[i][k][t] = value;
  }
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  degree: 3,
  activeDistance: 9,

  setup: function setup() {
    this.size(400, 400);

    var TAU = Math.PI * 2;
    for (var i = 0; i < TAU; i += TAU / 10) {
      this.points.push({
        x: this.width / 2 + 100 * Math.cos(i),
        y: this.height / 2 + 100 * Math.sin(i)
      });
    }

    this.knots = this.formKnots(this.points, true);

    if (this.props.controller) {
      this.props.controller(this, this.knots);
    }

    this.draw();
  },
  draw: function draw() {
    var _this = this;

    this.clear();
    this.grid(25);
    var p = this.points[0];
    this.points.forEach(function (n) {
      _this.stroke(200);
      _this.line(n.x, n.y, p.x, p.y);
      p = n;
      _this.stroke(0);
      _this.circle(p.x, p.y, 4);
    });
    this.drawSplineData();
  },
  drawSplineData: function drawSplineData() {
    if (this.points.length <= this.degree) return;
    var mapped = this.points.map(function (p) {
      return [p.x, p.y];
    });
    this.drawCurve(mapped);
    this.drawKnots(mapped);
  }
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  degree: 3,
  activeDistance: 9,
  weights: [],

  setup: function setup() {
    this.size(400, 400);

    var TAU = Math.PI * 2;
    var r = this.width / 3;
    for (var i = 0; i < 6; i++) {
      this.points.push({
        x: this.width / 2 + r * Math.cos(i / 6 * TAU),
        y: this.height / 2 + r * Math.sin(i / 6 * TAU)
      });
    }
    this.points = this.points.concat(this.points.slice(0, 3));
    this.closed = this.degree;

    this.knots = this.formKnots(this.points);
    this.weights = this.formWeights(this.points);

    if (this.props.controller) {
      this.props.controller(this, this.knots, this.weights, this.closed);
    }

    this.draw();
  },
  draw: function draw() {
    var _this = this;

    this.clear();
    this.grid(25);
    var p = this.points[0];
    this.points.forEach(function (n) {
      _this.stroke(200);
      _this.line(n.x, n.y, p.x, p.y);
      p = n;
      _this.stroke(0);
      _this.circle(p.x, p.y, 4);
    });
    this.drawSplineData();
  },
  drawSplineData: function drawSplineData() {
    if (this.points.length <= this.degree) return;
    var mapped = this.points.map(function (p) {
      return [p.x, p.y];
    });
    this.drawCurve(mapped);
    this.drawKnots(mapped);
  }
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  degree: 3,
  activeDistance: 9,

  setup: function setup() {
    this.size(400, 400);

    var TAU = Math.PI * 2;
    for (var i = 0; i < TAU; i += TAU / 10) {
      this.points.push({
        x: this.width / 2 + 100 * Math.cos(i),
        y: this.height / 2 + 100 * Math.sin(i)
      });
    }

    this.knots = this.formKnots(this.points);
    if (this.props.controller) {
      this.props.controller(this, this.knots);
    }
    this.draw();
  },
  draw: function draw() {
    var _this = this;

    this.clear();
    this.grid(25);
    var p = this.points[0];
    this.points.forEach(function (n) {
      _this.stroke(200);
      _this.line(n.x, n.y, p.x, p.y);
      p = n;
      _this.stroke(0);
      _this.circle(p.x, p.y, 4);
    });
    this.drawSplineData();
  },
  drawSplineData: function drawSplineData() {
    if (this.points.length <= this.degree) return;
    var mapped = this.points.map(function (p) {
      return [p.x, p.y];
    });
    this.drawCurve(mapped);
    this.drawKnots(mapped);
  }
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
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
  }
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(45);
var generateBase = __webpack_require__(0);
module.exports = generateBase("canonical", handler);

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var generateBase = __webpack_require__(0);
module.exports = generateBase("catmullconv");

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  statics: {
    keyHandlingOptions: {
      propName: "distance",
      values: {
        "38": 1, // up arrow
        "40": -1 // down arrow
      }
    }
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
  }
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(48);
var generateBase = __webpack_require__(0);
var keyHandling = __webpack_require__(2);
module.exports = keyHandling(generateBase("catmullmoulding", handler));

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sin = Math.sin,
    cos = Math.cos;

module.exports = {
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
  }
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(50);
var generateBase = __webpack_require__(0);
module.exports = generateBase("circles", handler);

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sin = Math.sin,
    cos = Math.cos,
    tan = Math.tan;

module.exports = {
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
  }
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(52);
var generateBase = __webpack_require__(0);
module.exports = generateBase("circles_cubic", handler);

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  componentDidMount: function componentDidMount() {
    if (typeof document !== "undefined") {
      var script = document.createElement("script");
      script.src = "lib/site/disqus.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(54);
var generateBase = __webpack_require__(0);
module.exports = generateBase("comments", handler);

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
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

    var tf = curve.order,
        pad = 20,
        pts = curve.points,
        w = api.getPanelWidth(),
        wp = w - 2 * pad,
        h = api.getPanelHeight(),
        offset = { x: w, y: 0 };

    var x_pts = JSON.parse(JSON.stringify(pts)).map(function (p, t) {
      return { x: wp * t / tf, y: p.x };
    });
    api.drawLine({ x: 0, y: 0 }, { x: 0, y: h }, offset);
    api.drawAxes(pad, "t", 0, 1, "x", 0, w, offset);
    offset.x += pad;
    api.drawCurve(new api.Bezier(x_pts), offset);

    offset.x += w - pad;
    var y_pts = JSON.parse(JSON.stringify(pts)).map(function (p, t) {
      return { x: wp * t / tf, y: p.y };
    });
    api.drawLine({ x: 0, y: 0 }, { x: 0, y: h }, offset);
    api.drawAxes(pad, "t", 0, 1, "y", 0, w, offset);
    offset.x += pad;
    api.drawCurve(new api.Bezier(y_pts), offset);
  }
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(56);
var generateBase = __webpack_require__(0);
module.exports = generateBase("components", handler);

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
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
      this.drawLerpPoint(api, 3 * (1 - t) * (1 - t) * t, pad, fwh, p);
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
  }
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(58);
var generateBase = __webpack_require__(0);
module.exports = generateBase("control", handler);

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var abs = Math.abs;

module.exports = {
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
  }
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(60);
var generateBase = __webpack_require__(0);
module.exports = generateBase("curveintersection", handler);

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
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
  }
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(62);
var generateBase = __webpack_require__(0);
module.exports = generateBase("decasteljau", handler);

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var generateBase = __webpack_require__(0);
module.exports = generateBase("derivatives");

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
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
  }
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(65);
var generateBase = __webpack_require__(0);
var keyHandling = __webpack_require__(2);
module.exports = keyHandling(generateBase("explanation", handler));

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  setupQuadratic: function setupQuadratic(api) {
    var curve = new api.Bezier(70, 155, 20, 110, 100, 75);
    api.setCurve(curve);
  },

  setupCubic: function setupCubic(api) {
    var curve = new api.Bezier(60, 105, 75, 30, 215, 115, 140, 160);
    api.setCurve(curve);
  },

  draw: function draw(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);
    api.setColor("lightgrey");

    var t,
        step = 0.05,
        min = -10;
    var pt = curve.get(min - step),
        pn;
    for (t = min; t <= step; t += step) {
      pn = curve.get(t);
      api.drawLine(pt, pn);
      pt = pn;
    }

    pt = curve.get(1);
    var max = 10;
    for (t = 1 + step; t <= max; t += step) {
      pn = curve.get(t);
      api.drawLine(pt, pn);
      pt = pn;
    }
  }
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(67);
var generateBase = __webpack_require__(0);
module.exports = generateBase("extended", handler);

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
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
    xcurve.extrema().y.forEach(function (t) {
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
    ycurve.extrema().y.forEach(function (t) {
      var p = ycurve.get(t);
      api.drawCircle(p, 3, offset);
    });
  }
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(69);
var generateBase = __webpack_require__(0);
module.exports = generateBase("extremities", handler);

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
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
  }
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(71);
var generateBase = __webpack_require__(0);
var keyHandling = __webpack_require__(2);
module.exports = keyHandling(generateBase("flattening", handler));

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  statics: {
    keyHandlingOptions: {
      propName: "distance",
      values: {
        "38": 1, // up arrow
        "40": -1 // down arrow
      }
    }
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
  }
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(73);
var generateBase = __webpack_require__(0);
var keyHandling = __webpack_require__(2);
module.exports = keyHandling(generateBase("graduatedoffset", handler));

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  setupCubic: function setupCubic(api) {
    var curve = new api.Bezier(135, 25, 25, 135, 215, 75, 215, 240);
    api.setCurve(curve);
  },

  draw: function draw(api, curve) {
    api.reset();
    api.drawSkeleton(curve);
    api.drawCurve(curve);

    api.setColor("red");
    curve.inflections().forEach(function (t) {
      api.drawCircle(curve.get(t), 5);
    });
  }
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(75);
var generateBase = __webpack_require__(0);
module.exports = generateBase("inflections", handler);

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var min = Math.min,
    max = Math.max;

module.exports = {
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
  }
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(77);
var generateBase = __webpack_require__(0);
module.exports = generateBase("intersections", handler);

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
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
  }
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(79);
var generateBase = __webpack_require__(0);
module.exports = generateBase("introduction", handler);

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var generateBase = __webpack_require__(0);
module.exports = generateBase("matrix");

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var generateBase = __webpack_require__(0);
module.exports = generateBase("matrixsplit");

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var abs = Math.abs;

module.exports = {
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
  }
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(83);
var generateBase = __webpack_require__(0);
module.exports = generateBase("moulding", handler);

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  statics: {
    keyHandlingOptions: {
      propName: "distance",
      values: {
        "38": 1, // up arrow
        "40": -1 // down arrow
      }
    }
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
  }
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(85);
var generateBase = __webpack_require__(0);
var keyHandling = __webpack_require__(2);
module.exports = keyHandling(generateBase("offsetting", handler));

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var abs = Math.abs;

module.exports = {
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
  }
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(87);
var generateBase = __webpack_require__(0);
module.exports = generateBase("pointcurves", handler);

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
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
  }
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(89);
var generateBase = __webpack_require__(0);
module.exports = generateBase("pointvectors", handler);

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var atan2 = Math.atan2,
    sqrt = Math.sqrt,
    sin = Math.sin,
    cos = Math.cos;

module.exports = {
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
  }
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(91);
var generateBase = __webpack_require__(0);
module.exports = generateBase("polybezier", handler);

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var generateBase = __webpack_require__(0);
module.exports = generateBase("preface");

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
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
  }
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(94);
var generateBase = __webpack_require__(0);
module.exports = generateBase("projections", handler);

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Reordering = {
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
  }
};

module.exports = Reordering;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(96);
var generateBase = __webpack_require__(0);
var keyHandling = __webpack_require__(2);
module.exports = keyHandling(generateBase("reordering", handler));

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var modes;

module.exports = {
  getInitialState: function getInitialState() {
    modes = this.modes = ["unite", "intersect", "exclude", "subtract"];
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
  }
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(98);
var generateBase = __webpack_require__(0);
module.exports = generateBase("shapes", handler);

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
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
  }
};

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(100);
var generateBase = __webpack_require__(0);
module.exports = generateBase("splitting", handler);

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
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
  }
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(102);
var generateBase = __webpack_require__(0);
module.exports = generateBase("tightbounds", handler);

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
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
  }
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(104);
var generateBase = __webpack_require__(0);
var keyHandling = __webpack_require__(2);
module.exports = keyHandling(generateBase("tracing", handler));

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
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
  }
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handler = __webpack_require__(106);
var generateBase = __webpack_require__(0);
module.exports = generateBase("whatis", handler);

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var React=__webpack_require__(1);var Graphic=__webpack_require__(15);var SectionHeader=__webpack_require__(4);var BSplineGraphic=__webpack_require__(12);var KnotController=__webpack_require__(17);var WeightController=__webpack_require__(21);SectionHeader.locale="en-GB";module.exports={"locale":"en-GB","preface":{"locale":"en-GB","title":"Preface","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"preface",title:"Preface"}),React.createElement("p",null,"In order to draw things in 2D, we usually rely on lines, which typically get classified into two categories: straight lines, and curves. The first of these are as easy to draw as they are easy to make a computer draw. Give a computer the first and last point in the line, and BAM! straight line. No questions asked."),React.createElement("p",null,"Curves, however, are a much bigger problem. While we can draw curves with ridiculous ease freehand, computers are a bit handicapped in that they can't draw curves unless there is a mathematical function that describes how it should be drawn. In fact, they even need this for straight lines, but the function is ridiculously easy, so we tend to ignore that as far as computers are concerned, all lines are \"functions\", regardless of whether they're straight or curves. However, that does mean that we need to come up with fast-to-compute functions that lead to nice looking curves on a computer. There's a number of these, and in this article we'll focus on a particular function that has received quite a bit of attention, and is used in pretty much anything that can draw curves: \"Bézier\" curves"),React.createElement("p",null,"They're named after ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/Pierre_B%C3%A9zier"},"Pierre Bézier"),", who is principally responsible for getting them known to the world as a curve well-suited for design work (working for Renault and publishing his investigations in 1962), although he was not the first, or only one, to \"invent\" these type of curves. One might be tempted to say that the mathematician ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/Paul_de_Casteljau"},"Paul de Casteljau")," was first, investigating the nature of these curves in 1959 while working at Citroën, coming up with a really elegant way of figuring out how to draw them. However, de Casteljau did not publish his work, making the question \"who was first\" hard to answer in any absolute sense. Or is it? Bézier curves are, at their core, \"Bernstein polynomials\", a family of mathematical functions investigated by ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/Sergei_Natanovich_Bernstein"},"Sergei Natanovich Bernstein"),", with publications on them at least as far back as 1912. Anyway, that's mostly trivia, what you are more likely to care about is that these curves are handy: you can link up multiple Bézier curves so that the combination looks like a single curve. If you've ever drawn Photoshop \"paths\" or worked with vector drawing programs like Flash, Illustrator or nkscape, those curves you've been drawing are Bézier curves."),React.createElement("p",null,"So, what if you need to program them yourself? What are the pitfalls? How do you draw them? What are the bounding boxes, how do you determine intersections, how can you extrude a curve, in short: how do you do everything that you might want when you do with these curves? That's what this page is for. Prepare to be mathed!"),React.createElement("p",null,"—Pomax (or in the tweetworld, ",React.createElement("a",{href:"https://twitter.com/TheRealPomax"},"@TheRealPomax"),")"),React.createElement("div",{className:"note"},React.createElement("h2",{id:"note-virtually-all-b-zier-graphics-are-interactive-"},"Note: virtually all Bézier graphics are interactive."),React.createElement("p",null,"This page uses interactive examples, relying heavily on ",React.createElement("a",{href:"http://pomax.github.io/bezierjs"},"Bezier.js"),", as well as \"real\" maths (in LaTeX form) which is typeset using the most excellent ",React.createElement("a",{href:"http://MathJax.org"},"MathJax")," library. The page is generated offline as a React application, using Webpack, which has made adding \"view source\" options considerably more challenging. I'm still trying to figure out how to add them back in, but it didn't feel like it should hold up deploying this update compared to the previous years' version."),React.createElement("h2",{id:"this-book-is-open-source-"},"This book is open source."),React.createElement("p",null,"This book is an open source software project, and lives on two github repositorites. The first is ",React.createElement("a",{href:"https://github.com/pomax/bezierinfo"},"https://github.com/pomax/bezierinfo")," and is the purely-for-presentation version you are viewing right now. The other repository is ",React.createElement("a",{href:"https://github.com/pomax/BezierInfo-2"},"https://github.com/pomax/BezierInfo-2"),", which is the development version, housing all the html, javascript, and css. You can fork either of these, and pretty much do with them as you please, except for passing it off as your own work wholesale, of course =)"),React.createElement("h2",{id:"how-complicated-is-the-maths-going-to-be-"},"How complicated is the maths going to be?"),React.createElement("p",null,"Most of the mathematics in this Primer are early high school maths. If you understand basic arithmetic, and you know how to read English, you should be able to get by just fine. There will at times be ",React.createElement("em",null,"far")," more complicated maths, but if you don't feel like digesting them, you can safely skip over them by either skipping over the \"detail boxes\" in section or by just jumping to the end of a section with maths that looks too involving. The end of sections typically simply list the conclusions so you can just work with those values directly."),React.createElement("h2",{id:"questions-comments-"},"Questions, comments:"),React.createElement("p",null,"If you have suggestions for new sections, hit up the ",React.createElement("a",{href:"https://github.com/pomax/BezierInfo-2/issues"},"Github issue tracker")," (also reachable from the repo linked to in the upper right). If you have questions about the material, there's currently no comment section while I'm doing the rewrite, but you can use the issue tracker for that as well. Once the rewrite is done, I'll add a general comment section back in, and maybe a more topical \"select this section of text and hit the 'question' button to ask a question about it\" system. We'll see."),React.createElement("h2",{id:"buy-me-a-coffee-"},"Buy me a coffee?"),React.createElement("p",null,"If you enjoyed this book, or you simply found it useful for something you were trying to get done, and you were wondering how to let me know you appreciated this book, you can always ",React.createElement("a",{href:"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QPRDLNGDANJSW"},"buy me a coffee"),", however-much a coffee is where you live. This work has grown over the years, from a small primer to a 70ish print-page-equivalent reader on the subject of Bézier curves, and a lot of coffee went into the making of it. I don't regret a minute I spent on writing it, but I can always do with some more coffee to keep on writing!")));}},"introduction":{"locale":"en-GB","title":"A lightning introduction","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"introduction",title:"A lightning introduction",number:"1"}),React.createElement("p",null,"Let's start with the good stuff: when we're talking about Bézier curves, we're talking about the things that you can see in the following graphics. They run from some start point to some end point, with their curvature influenced by one or more \"intermediate\" control points. Now, because all the graphics on this page are interactive, go manipulate those curves a bit: click-drag the points, and see how their shape changes based on what you do."),React.createElement("div",{className:"figure"},React.createElement(Graphic,{inline:true,title:"Quadratic Bézier curves",setup:handler.drawQuadratic,draw:handler.drawCurve}),React.createElement(Graphic,{inline:true,title:"Cubic Bézier curves",setup:handler.drawCubic,draw:handler.drawCurve})),React.createElement("p",null,"These curves are used a lot in computer aided design and computer aided manufacturing (CAD/CAM) applications, as well as in graphic design programs like Adobe Illustrator and Photoshop, Inkscape, the Gimp, etc. and in graphic technologies like scalable vector graphics (SVG) and OpenType fonts (ttf/otf). A lot of things use Bézier curves, so if you want to learn more about them... prepare to get your learn on!"));}},"whatis":{"locale":"en-GB","title":"So what makes a Bézier Curve?","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"whatis",title:"So what makes a Bézier Curve?",number:"2"}),React.createElement("p",null,"Playing with the points for curves may have given you a feel for how Bézier curves behave, but what ",React.createElement("em",null,"are")," Bézier curves, really? There are two ways to explain what a Bézier curve is, and they turn out to be the entirely equivalent, but one of them uses complicated maths, and the other uses really simple maths. So... let's start with the simple explanation:"),React.createElement("p",null,"Bezier curves are the result of ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/Linear_interpolation"},"linear interpolations"),". That sounds complicated but you've been doing linear interpolation since you were very young: any time you had to point at something between two other things, you've been applying linear interpolation. It's simply \"picking a point between two points\"."),React.createElement("p",null,"If we know the distance between those two points, and we want a new point that is, say, 20% the distance away from the first point (and thus 80% the distance away from the second point) then we can compute that really easily:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/8090904d6448ed0c8e6151aecf62f361d51ead96.svg",width:"526.4",height:"107.8"}),React.createElement("p",null,"So let's look at that in action: the following graphic is interactive in that you can use your up and down arrow keys to increase or decrease the interpolation ratio, to see what happens. We start with three points, which gives us two lines. Linear interpolation over those lines gives use two points, between which we can again perform linear interpolation, yielding a single point. And that point —and all points we can form in this way for all ratios taken together— form our Bézier curve:"),React.createElement(Graphic,{title:"Linear Interpolation leading to Bézier curves",setup:handler.setup,draw:handler.draw,onKeyDown:handler.onKeyDown}),React.createElement("p",null,"And that brings us to the complicated maths: calculus."),React.createElement("p",null,"While it doesn't look like that's what we've just done, we actually just drew a quadratic curve, in steps, rather than in a single go. One of the fascinating parts about Bézier curves is that they can both be described in terms of polynomial functions, as well as in terms of very simple interpolations of interpolations of [...]. That, in turn, means we can look at what these curves can do based on both \"real maths\" (by examining the functions, their derivatives, and all that stuff), as well as by looking at the \"mechanical\" composition (which tells us that a curve will never extend beyond the points we used to construct it, for instance)"),React.createElement("p",null,"So let's start looking at Bézier curves a bit more in depth. Their mathematical expressions, the properties we can derive from those, and the various things we can do to, and with, Bézier curves."));}},"explanation":{"locale":"en-GB","title":"The mathematics of Bézier curves","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"explanation",title:"The mathematics of Bézier curves",number:"3"}),React.createElement("p",null,"Bézier curves are a form of \"parametric\" function. Mathematically speaking, parametric functions are cheats: a \"function\" is actually a well defined term representing a mapping from any number of inputs to a ",React.createElement("strong",null,"single")," output. Numbers go in, a single number comes out. Change the numbers that go in, and the number that comes out is still a single number. Parametric functions cheat. They basically say \"alright, well, we want multiple values coming out, so we'll just use more than one function\". An illustration: Let's say we have a function that maps some value, let's call it ",React.createElement("i",null,"x"),", to some other value, using some kind of number manipulation:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/785e792c343b71d4e674ac94d8800940b30917ac.svg",width:"100.8",height:"18.2"}),React.createElement("p",null,"The notation ",React.createElement("i",null,"f(x)")," is the standard way to show that it's a function (by convention called ",React.createElement("i",null,"f")," if we're only listing one) and its output changes based on one variable (in this case, ",React.createElement("i",null,"x"),"). Change ",React.createElement("i",null,"x"),", and the output for ",React.createElement("i",null,"f(x)")," changes."),React.createElement("p",null,"So far so good. Now, let's look at parametric functions, and how they cheat. Let's take the following two functions:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/0dfe7562b43441e72201ff4cdd2e8b6e2e3ecb2d.svg",width:"98",height:"37.8"}),React.createElement("p",null,"There's nothing really remarkable about them, they're just a sine and cosine function, but you'll notice the inputs have different names. If we change the value for ",React.createElement("i",null,"a"),", we're not going to change the output value for ",React.createElement("i",null,"f(b)"),", since ",React.createElement("i",null,"a")," isn't used in that function. Parametric functions cheat by changing that. In a parametric function all the different functions share a variable, like this:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/ed6f533530199d1e99b3319ba137c1327b0459c0.svg",width:"105",height:"42"}),React.createElement("p",null,"Multiple functions, but only one variable. If we change the value for ",React.createElement("i",null,"t"),", we change the outcome of both ",React.createElement("i",null,"f",React.createElement("sub",null,"a"),"(t)")," and ",React.createElement("i",null,"f",React.createElement("sub",null,"b"),"(t)"),". You might wonder how that's useful, and the answer is actually pretty simple: if we change the labels ",React.createElement("i",null,"f",React.createElement("sub",null,"a"),"(t)")," and ",React.createElement("i",null,"f",React.createElement("sub",null,"b"),"(t)")," with what we usually mean with them for parametric curves, things might be a lot more obvious:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/ea632ea75d6a2aeb6fe69c07feb6e76f81884746.svg",width:"81.19999999999999",height:"42"}),React.createElement("p",null,"There we go. ",React.createElement("i",null,"x"),"/",React.createElement("i",null,"y")," coordinates, linked through some mystery value ",React.createElement("i",null,"t"),"."),React.createElement("p",null,"So, parametric curves don't define a ",React.createElement("i",null,"y")," coordinate in terms of an ",React.createElement("i",null,"x")," coordinate, like normal functions do, but they instead link the values to a \"control\" variable. If we vary the value of ",React.createElement("i",null,"t"),", then with every change we get ",React.createElement("strong",null,"two")," values, which we can use as (",React.createElement("i",null,"x"),",",React.createElement("i",null,"y"),") coordinates in a graph. The above set of functions, for instance, generates points on a circle: We can range ",React.createElement("i",null,"t")," from negative to positive infinity, and the resulting (",React.createElement("i",null,"x"),",",React.createElement("i",null,"y"),") coordinates will always lie on a circle with radius 1 around the origin (0,0). If we plot it for ",React.createElement("i",null,"t")," from 0 to 5, we get this (use your up and down arrow keys to change the plot end value):"),React.createElement(Graphic,{preset:"empty",title:"A (partial) circle: x=sin(t), y=cos(t)","static":true,setup:handler.setup,draw:handler.draw,onKeyDown:handler.props.onKeyDown}),React.createElement("p",null,"Bézier curves are (one in many classes of) parametric functions, and are characterised by using the same base function for all its dimensions. Unlike the above example, where the ",React.createElement("i",null,"x")," and ",React.createElement("i",null,"y")," values use different functions (one uses a sine, the other a cosine), Bézier curves use the \"binomial polynomial\" for both ",React.createElement("i",null,"x")," and ",React.createElement("i",null,"y"),". So what are binomial polynomials?"),React.createElement("p",null,"You may remember polynomials from high school, where they're those sums that look like:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/3e8b26cf8833db7089d65e9c6b3953a3140bb19f.svg",width:"224",height:"21"}),React.createElement("p",null,"If they have a highest order term ",React.createElement("i",null,"x³")," they're called \"cubic\" polynomials, if it's ",React.createElement("i",null,"x²")," it's a \"square\" polynomial, if it's just ",React.createElement("i",null,"x")," it's a line (and if there aren't even any terms with ",React.createElement("i",null,"x")," it's not a polynomial!)"),React.createElement("p",null,"Bézier curves are polynomials of ",React.createElement("i",null,"t"),", rather than ",React.createElement("i",null,"x"),", with the value for ",React.createElement("i",null,"t")," fixed being between 0 and 1, with coefficients ",React.createElement("i",null,"a"),", ",React.createElement("i",null,"b")," etc. taking the \"binomial\" form, which sounds fancy but is actually a pretty simple description for mixing values:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/565d935cab46bc995f53190102dadfdd1afc08f6.svg",width:"385",height:"68.6"}),React.createElement("p",null,"I know what you're thinking: that doesn't look too simple, but if we remove ",React.createElement("i",null,"t")," and add in \"times one\", things suddenly look pretty easy. Check out these binomial terms:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/8c618738924e53a313a31fa407b3d91155525ee1.svg",width:"219.79999999999998",height:"91"}),React.createElement("p",null,"Notice that 2 is the same as 1+1, and 3 is 2+1 and 1+2, and 6 is 3+3... As you can see, each time we go up a dimension, we simply start and end with 1, and everything in between is just \"the two numbers above it, added together\". Now ",React.createElement("i",null,"that's")," easy to remember."),React.createElement("p",null,"There's an equally simple way to figure out how the polynomial terms work: if we rename ",React.createElement("i",null,"(1-t)")," to ",React.createElement("i",null,"a")," and ",React.createElement("i",null,"t")," to ",React.createElement("i",null,"b"),", and remove the weights for a moment, we get this:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/c8740a3a9a63b592e1480883a54024ebdaffaf05.svg",width:"316.4",height:"62.99999999999999"}),React.createElement("p",null,"It's basically just a sum of \"every combination of ",React.createElement("i",null,"a")," and ",React.createElement("i",null,"b"),"\", progressively replacing ",React.createElement("i",null,"a"),"'s with ",React.createElement("i",null,"b"),"'s after every + sign. So that's actually pretty simple too. So now you know binomial polynomials, and just for completeness I'm going to show you the generic function for this:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/444a01611e5709f702c36f6ca17aa2761c0877a9.svg",width:"315",height:"57.4"}),React.createElement("p",null,"And that's the full description for Bézier curves. Σ in this function indicates that this is a series of additions (using the variable listed below the Σ, starting at ...=<value> and ending at the value listed on top of the Σ)."),React.createElement("div",{className:"howtocode"},React.createElement("h3",{id:"how-to-implement-the-basis-function"},"How to implement the basis function"),React.createElement("p",null,"We could naively implement the basis function as a mathematical construct, using the function as our guide, like this:"),React.createElement("pre",null,"function Bezier(n,t):\n  sum = 0\n  for(k=0; k<n; k++):\n    sum += n!/(k!*(n-k)!) * (1-t)^(n-k) * t^(k)\n  return sum\n"),React.createElement("p",null,"I say we could, because we're not going to: the factorial function is ",React.createElement("em",null,"incredibly")," expensive. And, as we can see from the above explanation, we can actually create Pascal's triangle quite easily without it: just start at [1], then [1,1], then [1,2,1], then [1,3,3,1], and so on, with each next row fitting 1 more number than the previous row, starting and ending with \"1\", with all the numbers in between being the sum of the previous row's elements on either side \"above\" the one we're computing."),React.createElement("p",null,"We can generate this as a list of lists lightning fast, and then never have to compute the binomial terms because we have a lookup table:"),React.createElement("pre",null,"lut = [      [1],           // n=0\n            [1,1],          // n=1\n           [1,2,1],         // n=2\n          [1,3,3,1],        // n=3\n         [1,4,6,4,1],       // n=4\n        [1,5,10,10,5,1],    // n=5\n       [1,6,15,20,15,6,1]]  // n=6\n\nbinomial(n,k):\n  while(n >= lut.length):\n    s = lut.length\n    nextRow = new array(size=s+1)\n    nextRow[0] = 1\n    for(i=1, prev=s-1; i<prev; i++):\n      nextRow[i] = lut[prev][i-1] + lut[prev][i]\n    nextRow[s] = 1\n    lut.add(nextRow)\n  return lut[n][k]\n"),React.createElement("p",null,"So what's going on here? First, we declare a lookup table with a size that's reasonably large enough to accommodate most lookups. Then, we declare a function to get us the values we need, and we make sure that if an n/k pair is requested that isn't in the LUT yet, we expand it first. Our basis function now looks like this:"),React.createElement("pre",null,"function Bezier(n,t):\n  sum = 0\n  for(k=0; k<=n; k++):\n    sum += binomial(n,k) * (1-t)^(n-k) * t^(k)\n  return sum\n"),React.createElement("p",null,"Perfect. Of course, we can optimize further. For most computer graphics purposes, we don't need arbitrary curves. We need quadratic and  cubic curves (this primer actually does do arbitrary curves, so you'll find code similar to shown here), which means we can drastically simplify the code:"),React.createElement("pre",null,"function Bezier(2,t):\n  t2 = t * t\n  mt = 1-t\n  mt2 = mt * mt\n  return mt2 + 2*mt*t + t2\n\nfunction Bezier(3,t):\n  t2 = t * t\n  t3 = t2 * t\n  mt = 1-t\n  mt2 = mt * mt\n  mt3 = mt2 * mt\n  return mt3 + 3*mt2*t + 3*mt*t2 + t3\n"),React.createElement("p",null,"And now we know how to program the basis function. Exellent.")),React.createElement("p",null,"So, now we know what the base function(s) look(s) like, time to add in the magic that makes Bézier curves so special: control points."));}},"control":{"locale":"en-GB","title":"Controlling Bézier curvatures","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"control",title:"Controlling Bézier curvatures",number:"4"}),React.createElement("p",null,"Bézier curves are (like all \"splines\") interpolation functions, meaning they take a set of points, and generate values somewhere \"between\" those points. (One of the consequences of this is that you'll never be able to generate a point that lies outside the outline for the control points, commonly called the \"hull\" for the curve. Useful information!). In fact, we can visualize how each point contributes to the value generated by the function, so we can see which points are important, where, in the curve."),React.createElement("p",null,"The following graphs show the interpolation functions for quadratic and cubic curves, with \"S\" being the strength of a point's contribution to the total sum of the Bézier function. Click or click-drag to see the interpolation percentages for each curve-defining point at a specific ",React.createElement("i",null,"t")," value."),React.createElement("div",{className:"figure"},React.createElement(Graphic,{inline:true,preset:"simple",title:"Quadratic interpolations",draw:handler.drawQuadraticLerp}),React.createElement(Graphic,{inline:true,preset:"simple",title:"Cubic interpolations",draw:handler.drawCubicLerp}),React.createElement(Graphic,{inline:true,preset:"simple",title:"15th order interpolations",draw:handler.draw15thLerp})),React.createElement("p",null,"Also shown is the interpolation function for a 15",React.createElement("sup",null,"th")," order Bézier function. As you can see, the start and end point contribute considerably more to the curve's shape than any other point in the control point set."),React.createElement("p",null,"If we want to change the curve, we need to change the weights of each point, effectively changing the interpolations. The way to do this is about as straight forward as possible: just multiply each point with a value that changes its strength. These values are conventionally called \"Weights\", and we can add them to our original Bézier function:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/cc82da74955e71db3f5f0ab77dcc4664c0387bec.svg",width:"369.59999999999997",height:"57.4"}),React.createElement("p",null,"That looks complicated, but as it so happens, the \"weights\" are actually just the coordinate values we want our curve to have: for an ",React.createElement("i",null,"n",React.createElement("sup",null,"th"))," order curve, w",React.createElement("sub",null,"0")," is our start coordinate, w",React.createElement("sub",null,"n")," is our last coordinate, and everything in between is a controlling coordinate. Say we want a cubic curve that starts at (120,160), is controlled by (35,200) and (220,260) and ends at (220,40), we use this Bézier curve:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/853858526831a7ef3eb170efe49de397bb4913a1.svg",width:"496.99999999999994",height:"42"}),React.createElement("p",null,"Which gives us the curve we saw at the top of the article:"),React.createElement(Graphic,{preset:"simple",title:"Our cubic Bézier curve",setup:handler.drawCubic,draw:handler.drawCurve}),React.createElement("p",null,"What else can we do with Bézier curves? Quite a lot, actually. The rest of this article covers a multitude of possible operations and algorithms that we can apply, and the tasks they achieve."),React.createElement("div",{className:"howtocode"},React.createElement("h3",{id:"how-to-implement-the-weighted-basis-function"},"How to implement the weighted basis function"),React.createElement("p",null,"Given that we already know how to implement basis function, adding in the control points is remarkably easy:"),React.createElement("pre",null,"function Bezier(n,t,w[]):\n  sum = 0\n  for(k=0; k<n; k++):\n    sum += w[k] * binomial(n,k) * (1-t)^(n-k) * t^(k)\n  return sum\n"),React.createElement("p",null,"And for the extremely optimized versions:"),React.createElement("pre",null,"function Bezier(2,t,w[]):\n  t2 = t * t\n  mt = 1-t\n  mt2 = mt * mt\n  return w[0]*mt2 + w[1]*2*mt*t + w[2]*t2\n\nfunction Bezier(3,t,w[]):\n  t2 = t * t\n  t3 = t2 * t\n  mt = 1-t\n  mt2 = mt * mt\n  mt3 = mt2 * mt\n  return w[0]*mt3 + 3*w[1]*mt2*t + 3*w[2]*mt*t2 + w[3]*t3\n"),React.createElement("p",null,"And now we know how to program the weighted basis function.")));}},"extended":{"locale":"en-GB","title":"The Bézier interval [0,1]","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"extended",title:"The Bézier interval [0,1]",number:"5"}),React.createElement("p",null,"Now that we know the mathematics behind Bézier curves, there's one curious thing that you may have noticed: they always run from ",React.createElement("code",null,"t=0")," to ",React.createElement("code",null,"t=1"),". Why that particular interval?"),React.createElement("p",null,"It all has to do with how we run from \"the start\" of our curve to \"the end\" of our curve. If we have a value that is a mixture of two other values, then the general formula for this is:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/7f5ebb8489a8d04beb28f47c8aac2632b78ae764.svg",width:"225.39999999999998",height:"16.799999999999997"}),React.createElement("p",null,"The obvious start and end values here need to be ",React.createElement("code",null,"a=1, b=0"),", so that the mixed value is 100% value 1, and 0% value 2, and ",React.createElement("code",null,"a=0, b=1"),", so that the mixed value is 0% value 1 and 100% value 2. Additionally, we don't want \"a\" and \"b\" to be independent: if they are, then we could just pick whatever values we like, and end up with a mixed value that is, for example, 100% value 1 ",React.createElement("strong",null,"and")," 100% value 2. In principle that's fine, but for Bézier curves we always want mixed values ",React.createElement("em",null,"between")," the start and end point, so we need to make sure we can never set \"a\" and \"b\" to some values that lead to a mix value that sums to more than 100%. And that's easy:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/d326c8f323ccd2da00d998b533ac26a1c04fcfba.svg",width:"225.39999999999998",height:"16.799999999999997"}),React.createElement("p",null,"With this we can guarantee that we never sum above 100%. By restricting ",React.createElement("code",null,"a")," to values in the interval [0,1], we will always be somewhere between our two values (inclusively), and we will always sum to a 100% mix."),React.createElement("p",null,"But... what if we use this form, used in the assumption that we will only ever use values between 0 and 1, and instead use values outside of that interval? Do things go horribly wrong? Well... not really, but we get to \"see more\"."),React.createElement("p",null,"In the case of Bézier curves, extending the interval simply makes our curve \"keep going\". Bézier curves are simply segments on some polynomial curve, so if we pick a wider interval we simply get to see more of the curve. So what do they look like?"),React.createElement("p",null,"The following two graphics show you Bézier curves rendered \"the usual way\", as well as the curves they \"lie on\" if we were to extend the ",React.createElement("code",null,"t")," values much further. As you can see, there's a lot more \"shape\" hidden in the rest of the curve, and we can model those parts by moving the curve points around."),React.createElement(Graphic,{preset:"simple",title:"Quadratic infinite interval Bézier curve",setup:handler.setupQuadratic,draw:handler.draw}),React.createElement(Graphic,{preset:"simple",title:"Cubic infinite interval Bézier curve",setup:handler.setupCubic,draw:handler.draw}),React.createElement("p",null,"In fact, there are curves used in graphics design and computer modelling that do the opposite of Bézier curves, where rather than fixing the interval, and giving you free coordinates, they fix the coordinates, but give you freedom over the interval. A great example of this is the ",React.createElement("a",{href:"http://levien.com/phd/phd.html"},"\"Spiro\" curve"),", which is a curve based on part of a ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/Euler_spiral"},"Cornu Spiral, also known as Euler's Spiral"),". It's a very aesthetically pleasing curve and you'll find it in quite a few graphics packages like ",React.createElement("a",{href:"https://fontforge.github.io"},"FontForge")," and ",React.createElement("a",{href:"https://inkscape.org"},"Inkscape"),", having even been used in font design (such as for the Inconsolata font)."));}},"matrix":{"locale":"en-GB","title":"Bézier curvatures as matrix operations","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"matrix",title:"Bézier curvatures as matrix operations",number:"6"}),React.createElement("p",null,"We can also represent Bézier as matrix operations, by expressing the Bézier formula as a polynomial basis function and a coefficients matrix, and the actual coordinates as matrix. Let's look at what this means for the cubic curve:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/d961171d6d1dfc22bb1756901e79102147914360.svg",width:"491.4",height:"21"}),React.createElement("p",null,"Disregarding our actual coordinates for a moment, we have:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/f925c339011e6c38e47b9c3a571e02fca80eb5c3.svg",width:"371",height:"19.599999999999998"}),React.createElement("p",null,"We can write this as a sum of four expressions:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/30d76165668bf15f62986503bea100f39c5b9fec.svg",width:"147",height:"78.39999999999999"}),React.createElement("p",null,"And we can expand these expressions:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/7ca5abe1124ba1e51b7f12e0469cb4b1407593b8.svg",width:"417.2",height:"78.39999999999999"}),React.createElement("p",null,"Furthermore, we can make all the 1 and 0 factors explicit:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/bccbb94942e3ff79579e4719106f4701c157727e.svg",width:"228.2",height:"78.39999999999999"}),React.createElement("p",null,"And ",React.createElement("em",null,"that"),", we can view as a series of four matrix operations:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/d5f85d80fbbc62e1e8d58621b76f3d0224876b62.svg",width:"637",height:"75.6"}),React.createElement("p",null,"If we compact this into a single matrix operation, we get:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/7140be48f45b2e7190fa8dffef5c05c47c038ab0.svg",width:"237.99999999999997",height:"75.6"}),React.createElement("p",null,"This kind of polynomial basis representation is generally written with the bases in increasing order, which means we need to flip our ",React.createElement("code",null,"t")," matrix horizontally, and our big \"mixing\" matrix upside down:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/4e1849950a5c13f5135aa3412e0ee634cdc67301.svg",width:"237.99999999999997",height:"75.6"}),React.createElement("p",null,"And then finally, we can add in our original coordinates as a single third matrix:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/5910e25a46d9e86ab34513017f1274628a40e5a7.svg",width:"338.79999999999995",height:"77"}),React.createElement("p",null,"We can perform the same trick for the quadratic curve, in which case we end up with:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/e56e78e406d625c2a5ec584216f79a5fee00d8ea.svg",width:"275.79999999999995",height:"57.4"}),React.createElement("p",null,"If we plug in a ",React.createElement("code",null,"t")," value, and then multiply the matrices, we will get exactly the same values as when we evaluate the original polynomial function, or as when we evaluate the curve using progessive linear interpolation."),React.createElement("p",null,React.createElement("strong",null,"So: why would we bother with matrices?")," Matrix representations allow us to discover things about functions that would otherwise be hard to tell. It turns out that the curves form ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/Triangular_matrix"},"triangular matrices"),", and they have a determinant equal to the product of the actual coordinates we use for our curve. It's also invertible, which means there's ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/Invertible_matrix#The_invertible_matrix_theorem"},"a ton of properties")," that are all satisfied. Of course, the main question is: \"Why is this useful to us, now?\", and the answer to that is that it's not immediately useful, but you'll be seeing some instances where certain curve properties can be either computed via function manipulation, or via clever use of matrices, and sometimes the matrix approach can be (drastically) faster."),React.createElement("p",null,"So for now, just remember that we can represent curves this way, and let's move on."));}},"decasteljau":{"locale":"en-GB","title":"de Casteljau's algorithm","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"decasteljau",title:"de Casteljau's algorithm",number:"7"}),React.createElement("p",null,"If we want to draw Bézier curves we can run through all values of ",React.createElement("code",null,"t")," from 0 to 1 and then compute the weighted basis function, getting the ",React.createElement("code",null,"x/y")," values we need to plot, but the more complex the curve gets, the more expensive this becomes. Instead, we can use \"de Casteljau's algorithm\" to draw curves, which is a geometric approach to drawing curves, and really easy to implement. So easy, in fact, you can do it by hand with a pencil and ruler."),React.createElement("p",null,"Rather than using our calculus function to find ",React.createElement("code",null,"x/y")," values for ",React.createElement("code",null,"t"),", let's do this instead:"),React.createElement("ul",null,React.createElement("li",null,"treat ",React.createElement("code",null,"t")," as a ratio (which it is). t=0 is 0% along a line, t=1 is 100% along a line."),React.createElement("li",null,"Take all lines between the curve's defining points. For an order ",React.createElement("code",null,"n")," curve, that's ",React.createElement("code",null,"n")," lines."),React.createElement("li",null,"Place markers along each of these line, at distance ",React.createElement("code",null,"t"),". So if ",React.createElement("code",null,"t")," is 0.2, place the mark at 20% from the start, 80% from the end."),React.createElement("li",null,"Now form lines between ",React.createElement("code",null,"those")," points. This gives ",React.createElement("code",null,"n-1")," lines."),React.createElement("li",null,"Place markers along each of these line at distance ",React.createElement("code",null,"t"),"."),React.createElement("li",null,"Form lines between ",React.createElement("code",null,"those")," points. This'll be ",React.createElement("code",null,"n-2")," lines."),React.createElement("li",null,"place markers, form lines, place markers, etc."),React.createElement("li",null,"repeat this until you have only one line left. The point ",React.createElement("code",null,"t")," on that line coincides with the original curve point at ",React.createElement("code",null,"t"),".")),React.createElement("div",{className:"howtocode"},React.createElement("h3",{id:"how-to-implement-de-casteljau-s-algorithm"},"How to implement de Casteljau's algorithm"),React.createElement("p",null,"Let's just use the algorithm we just specified, and implement that:"),React.createElement("pre",null,"function drawCurve(points[], t):\n  if(points.length==1):\n    draw(points[0])\n  else:\n    newpoints=array(points.size-1)\n    for(i=0; i<newpoints.length; i++):\n      newpoints[i] = (1-t) * points[i] + t * points[i+1]\n    drawCurve(newpoints, t)\n"),React.createElement("p",null,"And done, that's the algorithm implemented. Except usually you don't get the luxury of overloading the \"+\" operator, so let's also give the code for when you need to work with ",React.createElement("code",null,"x")," and ",React.createElement("code",null,"y")," values:"),React.createElement("pre",null,"function drawCurve(points[], t):\n  if(points.length==1):\n    draw(points[0])\n  else:\n    newpoints=array(points.size-1)\n    for(i=0; i<newpoints.length; i++):\n      x = (1-t) * points[i].x + t * points[i+1].x\n      y = (1-t) * points[i].y + t * points[i+1].y\n      newpoints[i] = new point(x,y)\n    drawCurve(newpoints, t)\n"),React.createElement("p",null,"So what does this do? This draws a point, if the passed list of points is only 1 point long. Otherwise it will create a new list of points that sit at the ",React.createElement("i",null,"t")," ratios (i.e. the \"markers\" outlined in the above algorithm), and then call the draw function for this new list.")),React.createElement("p",null,"To see this in action, mouse-over the following sketch. Moving the mouse changes which curve point is explicitly evaluated using de Casteljau's algorithm, moving the cursor left-to-right (or, of course, right-to-left), shows you how a curve is generated using this approach."),React.createElement(Graphic,{preset:"simple",title:"Traversing a curve using de Casteljau's algorithm",setup:handler.setup,draw:handler.draw}));}},"flattening":{"locale":"en-GB","title":"Simplified drawing","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"flattening",title:"Simplified drawing",number:"8"}),React.createElement("p",null,"We can also simplify the drawing process by \"sampling\" the curve at certain points, and then joining those points up with straight lines, a process known as \"flattening\", as we are reducing a curve to a simple sequence of straight, \"flat\" lines."),React.createElement("p",null,"We can do this is by saying \"we want X segments\", and then sampling the curve at intervals that are spaced such that we end up with the number of segments we wanted. The advantage of this method is that it's fast: instead of evaluating 100 or even 1000 curve coordinates, we can sample a much lower number and still end up with a curve that sort-of-kind-of looks good enough. The disadvantage of course is that we lose the precision of working with \"the real curve\", so we usually can't use the flattened for for doing true intersection detection, or curvature alignment."),React.createElement(Graphic,{preset:"twopanel",title:"Flattening a quadratic curve",setup:handler.setupQuadratic,draw:handler.drawFlattened,onKeyDown:handler.onKeyDown}),React.createElement(Graphic,{preset:"twopanel",title:"Flattening a cubic curve",setup:handler.setupCubic,draw:handler.drawFlattened,onKeyDown:handler.onKeyDown}),React.createElement("p",null,"Try clicking on the sketch and using your up and down arrow keys to lower the number of segments for both the quadratic and cubic curve. You'll notice that for certain curvatures, a low number of segments works quite well, but for more complex curvatures (try this for the cubic curve), a higher number is required to capture the curvature changes properly."),React.createElement("div",{className:"howtocode"},React.createElement("h3",{id:"how-to-implement-curve-flattening"},"How to implement curve flattening"),React.createElement("p",null,"Let's just use the algorithm we just specified, and implement that:"),React.createElement("pre",null,"function flattenCurve(curve, segmentCount):\n  step = 1/segmentCount;\n  coordinates = [curve.getXValue(0), curve.getYValue(0)]\n  for(i=1; i <= segmentCount; i++):\n    t = i*step;\n    coordinates.push[curve.getXValue(t), curve.getYValue(t)]\n  return coordinates;\n"),React.createElement("p",null,"And done, that's the algorithm implemented. That just leaves drawing the resulting \"curve\" as a sequence of lines:"),React.createElement("pre",null,"function drawFlattenedCurve(curve, segmentCount):\n  coordinates = flattenCurve(curve, segmentCount)\n  coord = coordinates[0], _coords;\n  for(i=1; i < coordinates.length; i++):\n    _coords = coordinates[i]\n    line(coords, _coords)\n    coords = _coords\n"),React.createElement("p",null,"We start with the first coordinate as reference point, and then just draw lines between each point and its next point.")));}},"splitting":{"locale":"en-GB","title":"Splitting curves","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"splitting",title:"Splitting curves",number:"9"}),React.createElement("p",null,"With de Casteljau's algorithm we also find all the points we need to split up a Bézier curve into two, smaller curves, which taken together form the original curve. When we construct de Casteljau's skeleton for some value ",React.createElement("code",null,"t"),", the procedure gives us all the points we need to split a curve at that ",React.createElement("code",null,"t")," value: one curve is defined by all the inside skeleton points found prior to our on-curve point, with the other curve being defined by all the inside skeleton points after our on-curve point."),React.createElement(Graphic,{title:"Splitting a curve",setup:handler.setupCubic,draw:handler.drawSplit}),React.createElement("div",{className:"howtocode"},React.createElement("h3",{id:"implementing-curve-splitting"},"implementing curve splitting"),React.createElement("p",null,"We can implement curve splitting by bolting some extra logging onto the de Casteljau function:"),React.createElement("pre",null,"left=[]\nright=[]\nfunction drawCurve(points[], t):\n  if(points.length==1):\n    left.add(points[0])\n    right.add(points[0])\n    draw(points[0])\n  else:\n    newpoints=array(points.size-1)\n    for(i=0; i<newpoints.length; i++):\n      if(i==0):\n        left.add(points[i])\n      if(i==newpoints.length-1):\n        right.add(points[i+1])\n      newpoints[i] = (1-t) * points[i] + t * points[i+1]\n    drawCurve(newpoints, t)\n"),React.createElement("p",null,"After running this function for some value ",React.createElement("code",null,"t"),", the ",React.createElement("code",null,"left")," and ",React.createElement("code",null,"right")," arrays will contain all the coordinates for two new curves - one to the \"left\" of our ",React.createElement("code",null,"t")," value, the other on the \"right\", of the same order as the original curve, and overlayed exactly on the original curve.")),React.createElement("p",null,"This is best illustrated with an animated graphic (click to play/pause):"),React.createElement(Graphic,{preset:"threepanel",title:"Bézier curve splitting",setup:handler.setupCubic,draw:handler.drawAnimated,onClick:handler.togglePlay}));}},"matrixsplit":{"locale":"en-GB","title":"Splitting curves using matrices","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"matrixsplit",title:"Splitting curves using matrices",number:"10"}),React.createElement("p",null,"Another way to split curves is to exploit the matrix representation of a Bézier curve. In ",React.createElement("a",{href:"#matrix"},"the section on matrices")," we saw that we can represent curves as matrix multiplications. Specifically, we saw these two forms for the quadratic, and cubic curves, respectively (using the reversed Bézier coefficients vector for legibility):"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/e56e78e406d625c2a5ec584216f79a5fee00d8ea.svg",width:"275.79999999999995",height:"57.4"}),React.createElement("p",null,"and"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/01ea4f74c4785a19bedf18034b51510c5ce2ad8f.svg",width:"338.79999999999995",height:"77"}),React.createElement("p",null,"Let's say we want to split the curve at some point ",React.createElement("code",null,"t = z"),", forming two new (obviously smaller) Bézier curves. To find the coordinates for these two Bézier curves, we can use the matrix representation and some linear algebra. First, we split out the the actual \"point on the curve\" information as a new matrix multiplication:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/d6fa091a86782480968c232ef86513c578030004.svg",width:"680.4",height:"57.4"}),React.createElement("p",null,"and"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/d487e1e0181420995be49b25bc6595c9d0360435.svg",width:"845.5999999999999",height:"78.39999999999999"}),React.createElement("p",null,"If we could compact these matrices back to a form ",React.createElement("strong",null,"[t values] · [bezier matrix] · [column matrix]"),", with the first two staying the same, then that column matrix on the right would be the coordinates of a new Bézier curve that describes the first segment, from ",React.createElement("code",null,"t = 0")," to ",React.createElement("code",null,"t = z"),". As it turns out, we can do this quite easily, by exploiting some simple rules of linear algebra (and if you don't care about the derivations, just skip to the end of the box for the results!)."),React.createElement("div",{className:"note"},React.createElement("h2",{id:"deriving-new-hull-coordinates"},"Deriving new hull coordinates"),React.createElement("p",null,"Deriving the two segments upon splitting a curve takes a few steps, and the higher the curve order, the more work it is, so let's look at the quadratic curve first:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/d4b8355c3f1f80aacfc2766423a30151c5180a02.svg",width:"365.4",height:"57.4"}),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/fe5f623585a9bbb836f54164aecaadd3fc4ec953.svg",width:"259",height:"57.4"}),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/1eb9833685c9189c64d9cbdfdbb24a94e70e493f.svg",width:"259",height:"57.4"}),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/55f9d31b32a3e8855f2d28c3253201c8963eefd1.svg",width:"257.59999999999997",height:"57.4"}),React.createElement("p",null,"We do this, because [",React.createElement("em",null,"M · M",React.createElement("sup",null,"-1")),"] is the identity matrix (a bit like multiplying something by x/x in calculus. It doesn't do anything to the function, but it does allow you to rewrite it to something that may be easier to work with, or can be broken up differently). Adding that as matrix multiplication has no effect on the total formula, but it does allow us to change the matrix sequence [",React.createElement("em",null,"something · M"),"] to a sequence [",React.createElement("em",null,"M · something"),"], and that makes a world of difference: if we know what [",React.createElement("em",null,"M",React.createElement("sup",null,"-1")," · Z · M"),"] is, we can apply that to our coordinates, and be left with a proper matrix representation of a quadratic Bézier curve (which is [",React.createElement("em",null,"T · M · P"),"]), with a new set of coordinates that represent the curve from ",React.createElement("em",null,"t = 0")," to ",React.createElement("em",null,"t = z"),". So let's get computing:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/1dbabc115128a85389cbbcc75fbced48e5a2ca25.svg",width:"658",height:"58.8"}),React.createElement("p",null,"Excellent! Now we can form our new quadratic curve:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/2972cd74dab6560ea68189c2e53f247287cbefae.svg",width:"438.2",height:"57.4"}),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/39b64e07c41ef6d734064f017036f6391321e924.svg",width:"502.59999999999997",height:"57.4"}),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/d615960f862664749c54858520c364efeb4a4c5a.svg",width:"516.6",height:"57.4"}),React.createElement("p",null,React.createElement("strong",null,React.createElement("em",null,"Brilliant")),": if we want a subcurve from ",React.createElement("code",null,"t = 0")," to ",React.createElement("code",null,"t = z"),", we can keep the first coordinate the same (which makes sense), our control point becomes a z-ratio mixture of the original control point and the start point, and the new end point is a mixture that looks oddly similar to a bernstein polynomial of degree two, except it uses (z-1) rather than (1-z)... These new coordinates are actually really easy to compute directly!"),React.createElement("p",null,"Of course, that's only one of the two curves. Getting the section from ",React.createElement("code",null,"t = z")," to ",React.createElement("code",null,"t = 1")," requires doing this again. We first observe what what we just did is actually evaluate the general interval [0,",React.createElement("code",null,"z"),"], which we wrote down simplified becuase of that zero, but we actually evaluated this:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/a51e64df3cb31acf32d0ad5814c8c6cff41ae611.svg",width:"400.4",height:"57.4"}),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/0b50cdfed6656e681d5885a14a3af3e67efa4ccb.svg",width:"329",height:"57.4"}),React.createElement("p",null,"If we want the interval [",React.createElement("em",null,"z"),",1], we will be evaluating this instead:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/eca8cfda9b7a3f0819ec38acc53f95af67bb26bb.svg",width:"484.4",height:"57.4"}),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/e8c983a3efd47356c971fe46add4d0cdf103cced.svg",width:"432.59999999999997",height:"60.199999999999996"}),React.createElement("p",null,"We're going to do the same trick, to turn ",React.createElement("code",null,"[something · M]")," into ",React.createElement("code",null,"[M · something]"),":"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/a28b6dcc1335de19a065b6a04d8bb45d86122bb7.svg",width:"765.8",height:"60.199999999999996"}),React.createElement("p",null,"So, our final second curve looks like:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/5851c9191acb59456e3706a8f6f1a0f85e691eda.svg",width:"442.4",height:"57.4"}),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/0333e63f50b3d43067dc299280f70e9eb98711bb.svg",width:"496.99999999999994",height:"60.199999999999996"}),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/00a133860115d7a4db4ddf62781b5ae2bffef088.svg",width:"516.6",height:"60.199999999999996"}),React.createElement("p",null,React.createElement("strong",null,React.createElement("em",null,"Nice")),": we see the same as before; can keep the last coordinate the same (which makes sense), our control point becomes a z-ratio mixture of the original control point and the end point, and the new start point is a mixture that looks oddly similar to a bernstein polynomial of degree two, except it uses (z-1) rather than (1-z). These new coordinates are ",React.createElement("em",null,"also")," really easy to compute directly!")),React.createElement("p",null,"So, using linear algebra rather than de Casteljau's algorithm, we have determined that for any quadratic curve split at some value ",React.createElement("code",null,"t = z"),", we get two subcurves that are described as Bézier curves with simple-to-derive coordinates."),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/5769f44aea3344c32c497a3a77d236f524222b95.svg",width:"604.8",height:"57.4"}),React.createElement("p",null,"and"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/1fdde935dc357642358bdf5e632d6539c9d4debd.svg",width:"599.1999999999999",height:"60.199999999999996"}),React.createElement("p",null,"We can do the same for cubic curves. However, I'll spare you the actual derivation (don't let that stop you from writing that out yourself, though) and simply show you the resulting new coordinate sets:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/44db09290062827525a9b23cbaf91e65063d86d7.svg",width:"883.4",height:"78.39999999999999"}),React.createElement("p",null,"and"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/d6b1abe72bac1b55d184f2c4254769404371d06f.svg",width:"886.1999999999999",height:"81.19999999999999"}),React.createElement("p",null,"So, looking at our matrices, did we really need to compute the second segment matrix? No, we didn't. Actually having one segment's matrix means we implicitly have the other: push the values of each row in the matrix ",React.createElement("strong",null,React.createElement("em",null,"Q"))," to the right, with zeroes getting pushed off the right edge and appearing back on the left, and then flip the matrix vertically. Presto, you just \"calculated\" ",React.createElement("strong",null,React.createElement("em",null,"Q'")),"."),React.createElement("p",null,"Implementing curve splitting this way requires less recursion, and is just straight arithmetic with cached values, so can be cheaper on systems were recursion is expensive. If you're doing computation with devices that are good at matrix multiplication, chopping up a Bézier curve with this method will be a lot faster than applying de Casteljau."));}},"reordering":{"locale":"en-GB","title":"Lowering and elevating curve order","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"reordering",title:"Lowering and elevating curve order",number:"11"}),React.createElement("p",null,"One interesting property of Bézier curves is that an ",React.createElement("em",null,"n",React.createElement("sup",null,"th"))," order curve can always be perfectly represented by an ",React.createElement("em",null,"(n+1)",React.createElement("sup",null,"th"))," order curve, by giving the higher order curve specific control points."),React.createElement("p",null,"If we have a curve with three points, then we can create a four point curve that exactly reproduce the original curve as long as we give it the same start and end points, and for its two control points we pick \"1/3",React.createElement("sup",null,"rd")," start + 2/3",React.createElement("sup",null,"rd")," control\" and \"2/3",React.createElement("sup",null,"rd")," control + 1/3",React.createElement("sup",null,"rd")," end\", and now we have exactly the same curve as before, except represented as a cubic curve, rather than a quadratic curve."),React.createElement("p",null,"The general rule for raising an ",React.createElement("em",null,"n",React.createElement("sup",null,"th"))," order curve to an ",React.createElement("em",null,"(n+1)",React.createElement("sup",null,"th"))," order curve is as follows (observing that the start and end weights are the same as the start and end weights for the old curve):"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/c69c811b7fa790fbc7d082f29855b6f66243b454.svg",width:"803.5999999999999",height:"64.39999999999999"}),React.createElement("p",null,"However, this rule also has as direct consequence that you ",React.createElement("strong",null,"cannot")," generally safely lower a curve from ",React.createElement("em",null,"n",React.createElement("sup",null,"th"))," order to ",React.createElement("em",null,"(n-1)",React.createElement("sup",null,"th"))," order, because the control points cannot be \"pulled apart\" cleanly. We can try to, but the resulting curve will not be identical to the original, and may in fact look completely different."),React.createElement("p",null,"We can apply this to a (semi) random curve, as is done in the following graphic. Select the sketch and press your up and down arrow keys to elevate or lower the curve order."),React.createElement(Graphic,{preset:"simple",title:"A "+handler.getOrder()+" order Bézier curve",setup:handler.setup,draw:handler.draw,onKeyDown:handler.props.onKeyDown}),React.createElement("p",null,"There is a good, if mathematical, explanation on the matrices necessary for optimal reduction over on ",React.createElement("a",{href:"http://www.sirver.net/blog/2011/08/23/degree-reduction-of-bezier-curves"},"Sirver's Castle"),", which given time will find its way in a more direct description into this article."));}},"derivatives":{"locale":"en-GB","title":"Derivatives","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"derivatives",title:"Derivatives",number:"12"}),React.createElement("p",null,"There's a number of useful things that you can do with Bézier curves based on their derivative, and one of the more amusing observations about Bézier curves is that their derivatives are, in fact, also Bézier curves. In fact, the derivation of a Bézier curve is relatively straight forward, although we do need a bit of math. First, let's look at the derivative rule for Bézier curves, which is:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/17c8e825e1d2ae198cd7c33427870a3cf8ff31a1.svg",width:"350",height:"46.199999999999996"}),React.createElement("p",null,"which we can also write (observing that ",React.createElement("i",null,"b")," in this formula is the same as our ",React.createElement("i",null,"w")," weights, and that ",React.createElement("i",null,"n")," times a summation is the same as a summation where each term is multiplied by ",React.createElement("i",null,"n"),") as:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/a3a62e074a592e2c6497046261452ef89d1893d3.svg",width:"359.79999999999995",height:"46.199999999999996"}),React.createElement("p",null,"Or, in plain text: the derivative of an n",React.createElement("sup",null,"th")," degree Bézier curve is an (n-1)",React.createElement("sup",null,"th")," degree Bézier curve, with one fewer term, and new weights w'",React.createElement("sub",null,"0"),"...w'",React.createElement("sub",null,"n-1")," derived from the original weights as n(w",React.createElement("sub",null,"i+1")," - w",React.createElement("sub",null,"i"),"), so for a 3rd degree curve, with four weights, the derivative has three new weights w'",React.createElement("sub",null,"0")," = 3(w",React.createElement("sub",null,"1"),"-w",React.createElement("sub",null,"0"),"), w'",React.createElement("sub",null,"1")," = 3(w",React.createElement("sub",null,"2"),"-w",React.createElement("sub",null,"1"),") and w'",React.createElement("sub",null,"2")," = 3(w",React.createElement("sub",null,"3"),"-w",React.createElement("sub",null,"2"),")."),React.createElement("div",{className:"note"},React.createElement("h3",{id:"-slow-down-why-is-that-true-"},"\"Slow down, why is that true?\""),React.createElement("p",null,"Sometimes just being told \"this is the derivative\" is nice, but you might want to see why this is indeed the case. As such, let's have a look at the proof for this derivative. First off, the weights are independent of the full Bézier function, so the derivative involves only the derivative of the polynomial basis function. So, let's find that:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/1f8148ecaac6af494a8bb96d2f96f7a96f85d9e0.svg",width:"219.79999999999998",height:"37.8"}),React.createElement("p",null,"Applying the ",React.createElement("a",{href:"http://en.wikipedia.org/wiki/Product_rule"},"product")," and ",React.createElement("a",{href:"http://en.wikipedia.org/wiki/Chain_rule"},"chain")," rules gives us:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/5dbfaadcef0cb26159cedb26c9c7c54ac008064d.svg",width:"432.59999999999997",height:"29.4"}),React.createElement("p",null,"Which is hard to work with, so let's expand that properly:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/ebfac729364de2cfd10ba3b8b4a6a6c44e7b4578.svg",width:"361.2",height:"28"}),React.createElement("p",null,"Now, the trick is to turn this expression into something that has binomial coefficients again, so we want to end up with things that look like \"x! over y!(x-y)!\". If we can do that in a way that involves terms of ",React.createElement("i",null,"n-1")," and ",React.createElement("i",null,"k-1"),", we'll be on the right track."),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/b2a6fe8fe85ddf02a05f618b9ab12d65cc60cb3c.svg",width:"574",height:"79.8"}),React.createElement("p",null,"And that's the first part done: the two components inside the parentheses are actually regular, lower order Bezier expressions:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/222b5aafd8b8fca6dcfc04ca7ac4248f652752fd.svg",width:"560",height:"50.4"}),React.createElement("p",null,"Now to apply this to our weighted Bezier curves. We'll write out the plain curve formula that we saw earlier, and then work our way through to its derivative:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/e2f7ff20e5f540af4cb96cae56a241f3ea3f52f0.svg",width:"553",height:"117.6"}),React.createElement("p",null,"If we expand this (with some color to show how terms line up), and reorder the terms by increasing values for ",React.createElement("i",null,"k")," we see the following:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/2505458c9422a6a1dcc59ad2f5b134c1daf0c860.svg",width:"315",height:"114.8"}),React.createElement("p",null,"Two of these terms fall way: the first term falls away because there is no -1",React.createElement("sup",null,"st")," term in a summation. As such, it always contributes \"nothing\", so we can safely completely ignore it for the purpose of finding the derivative function. The other term is the very last term in this expansion: one involving ",React.createElement("i",null,"B",React.createElement("sub",null,"n-1,n")),". This term would have a binomial coefficient of [",React.createElement("i",null,"i")," choose ",React.createElement("i",null,"i+1"),"], which is a non-existent binomial coefficient. Again, this term would contribute \"nothing\", so we can ignore it, too. This means we're left with:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/f058419c1a80d98e6f74ceaf385a1c4e1fc3c645.svg",width:"309.4",height:"74.19999999999999"}),React.createElement("p",null,"And that's just a summation of lower order curves:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/08a399ed22fbf888982020848612ab348e4cbfc3.svg",width:"751.8",height:"37.8"}),React.createElement("p",null,"We can rewrite this as a normal summation, and we're done:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/b66421144e6848bbbe434a23b3a7b311ce9ff770.svg",width:"572.5999999999999",height:"53.199999999999996"})),React.createElement("p",null,"Let's rewrite that in a form similar to our original formula, so we can see the difference. We will first list our original formula for Bézier curves, and then the derivative:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/cc82da74955e71db3f5f0ab77dcc4664c0387bec.svg",width:"369.59999999999997",height:"57.4"}),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/6c95e389e593152cd24eb52e891db7c7b37c4e97.svg",width:"560",height:"61.599999999999994"}),React.createElement("p",null,"What are the differences? In terms of the actual Bézier curve, virtually nothing! We lowered the order (rather than ",React.createElement("i",null,"n"),", it's now ",React.createElement("i",null,"n-1"),"), but it's still the same Bézier function. The only real difference is in how the weights change when we derive the curve's function. If we have four points A, B, C, and D, then the derivative will have three points, the second derivative two, and the third derivative one:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/34e8aadefa9d0ee443efe27a1fc76210eedb373c.svg",width:"548.8",height:"77"}),React.createElement("p",null,"We can keep performing this trick for as long as we have more than one weight. Once we have one weight left, the next step will see ",React.createElement("i",null,"k = 0"),", and the result of our \"Bézier function\" summation is zero, because we're not adding anything at all. As such, a quadratic curve has no second derivative, a cubic curve has no third derivative, and generalized: an ",React.createElement("i",null,"n",React.createElement("sup",null,"th"))," order curve has ",React.createElement("i",null,"n-1")," (meaningful) derivatives, with any further derivative being zero."));}},"pointvectors":{"locale":"en-GB","title":"Tangents and normals","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"pointvectors",title:"Tangents and normals",number:"13"}),React.createElement("p",null,"If you want to move objects along a curve, or \"away from\" a curve, the two vectors you're most interested in are the tangent vector and normal vector for curve points. These are actually really easy to find. For moving, and orienting, along a curve we use the tangent, which indicates the direction travel at specific points, and is literally just the first derivative of our curve:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/2271ae26977a681a1695d14ea8255564e716916e.svg",width:"148.39999999999998",height:"42"}),React.createElement("p",null,"This gives us the directional vector we want. We can normalize it to give us uniform directional vectors (having a length of 1.0) at each point, and then do whatever it is we want to do based on those directions:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/3cb2c4f5806142e83c66e1312520d0783d15201c.svg",width:"263.2",height:"26.599999999999998"}),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/72826b8f5053c299dbb2082678191e3564bb50a6.svg",width:"303.79999999999995",height:"60.199999999999996"}),React.createElement("p",null,"The tangent is very useful for moving along a line, but what if we want to move away from the curve instead, perpendicular to the curve at some point ",React.createElement("i",null,"t"),"? In that case we want the \"normal\" vector. This vector runs at a right angle to the direction of the curve, and is typically of length 1.0, so all we have to do is rotate the normalized directional vector and we're done:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/6cb29c325e059e236343bdd448c149ecc6d8795f.svg",width:"355.59999999999997",height:"62.99999999999999"}),React.createElement("div",{className:"note"},React.createElement("p",null,"Rotating coordinates is actually very easy, if you know the rule for it. You might find it explained as \"applying a ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/Rotation_matrix"},"rotation matrix"),", which is what we'll look at here, too. Essentially, the idea is to take the circles over which we can rotate, and simply \"sliding the coordinates\" over these circles by the desired angle. If we want a quarter circle turn, we take the coordinate, slide it along the cirle by a quarter turn, and done."),React.createElement("p",null,"To turn any point ",React.createElement("i",null,"(x,y)")," into a rotated point ",React.createElement("i",null,"(x',y')")," (over 0,0) by some angle φ, we apply this nicely easy computation:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/d3932ac925ad9f238029d888dc5432f6678f6491.svg",width:"191.79999999999998",height:"39.199999999999996"}),React.createElement("p",null,"Which is the \"long\" version of the following matrix transformation:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/7297632eb150a8f5f37178612f71e5d0f2c367b1.svg",width:"221.2",height:"42"}),React.createElement("p",null,"And that's all we need to rotate any coordinate. Note that for quarter, half and three quarter turns these functions become even easier, since ",React.createElement("em",null,"sin")," and ",React.createElement("em",null,"cos")," for these angles are, respectively: 0 and 1, -1 and 0, and 0 and -1."),React.createElement("p",null,"But ",React.createElement("strong",null,React.createElement("em",null,"why"))," does this work? Why this matrix multiplication? ",React.createElement("a",{href:"http://en.wikipedia.org/wiki/Rotation_matrix#Decomposition_into_shears"},"Wikipedia")," (Technically, Thomas Herter and Klaus Lott) tells us that a rotation matrix can be treated as a sequence of three (elementary) shear operations. When we combine this into a single matrix operation (because all matrix multiplications can be collapsed), we get the matrix that you see above. ",React.createElement("a",{href:"http://datagenetics.com/blog/august32013/index.html"},"DataGenetics")," have an excellent article about this very thing: it's really quite cool, and I strongly recommend taking a quick break from this primer to read that article.")),React.createElement("p",null,"The following two graphics show the tangent and normal along a quadratic and cubic curve, with the direction vector coloured blue, and the normal vector coloured red (the markers are spaced out evenly as ",React.createElement("em",null,"t"),"-intervals, not spaced equidistant)."),React.createElement("div",{className:"figure"},React.createElement(Graphic,{preset:"simple",title:"Quadratic Bézier tangents and normals",inline:true,setup:handler.setupQuadratic,draw:handler.draw}),React.createElement(Graphic,{preset:"simple",title:"Cubic Bézier tangents and normals",inline:true,setup:handler.setupCubic,draw:handler.draw})));}},"components":{"locale":"en-GB","title":"Component functions","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"components",title:"Component functions",number:"14"}),React.createElement("p",null,"One of the first things people run into when they start using Bézier curves in their own programs is \"I know how to draw the curve, but how do I determine the bounding box?\". It's actually reasonably straight forward to do so, but it requires having some knowledge on exploiting math to get the values we need. For bounding boxes, we aren't actually interested in the curve itself, but only in its \"extremities\": the minimum and maximum values the curve has for its x- and y-axis values. If you remember your calculus (provided you ever took calculus, otherwise it's going to be hard to remember) we can determine function extremities using the first derivative of that function, but this poses a problem, since our function is parametric: every axis has its own function."),React.createElement("p",null,"The solution: compute the derivative for each axis separately, and then fit them back together in the same way we do for the original."),React.createElement("p",null,"Let's look at how a parametric Bézier curve \"splits up\" into two normal functions, one for the x-axis and one for the y-axis. Note the left-most figure is again an interactive curve, without labeled axes (you get coordinates in the graph instead).  The center and right-most figures are the component functions for computing the x-axis value, given a value for ",React.createElement("i",null,"t")," (between 0 and 1 inclusive), and the y-axis value, respectively."),React.createElement("p",null,"If you move points in a curve sideways, you should only see the middle graph change; likely, moving points vertically should only show a change in the right graph."),React.createElement(Graphic,{preset:"simple",title:"Quadratic Bézier curve components",setup:handler.setupQuadratic,draw:handler.draw}),React.createElement(Graphic,{preset:"simple",title:"Cubic Bézier curve components",setup:handler.setupCubic,draw:handler.draw}));}},"extremities":{"locale":"en-GB","title":"Finding extremities: root finding","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"extremities",title:"Finding extremities: root finding",number:"15"}),React.createElement("p",null,"Now that we understand (well, superficially anyway) the component functions, we can find the extremities of our Bézier curve by finding maxima and minima on the component functions, by solving the equations B'(t) = 0 and B''(t) = 0. Although, in the case of quadratic curves there is no B''(t), so we only need to compute B'(t) = 0. So, how do we compute the first and second derivatives? Fairly easily, actually, until our derivatives are 4th order or higher... then things get really hard. But let's start simple:"),React.createElement("h3",{id:"quadratic-curves-linear-derivatives-"},"Quadratic curves: linear derivatives."),React.createElement("p",null,"Finding the solution for \"where is this line 0\" should be trivial:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/baa66be2d93813bf9ef4aef1dbfac3db772e30e2.svg",width:"138.6",height:"109.19999999999999"}),React.createElement("p",null,"Done. And quadratic curves have no meaningful second derivative, so we're ",React.createElement("em",null,"really")," done."),React.createElement("h3",{id:"cubic-curves-the-quadratic-formula-"},"Cubic curves: the quadratic formula."),React.createElement("p",null,"The derivative of a cubic curve is a quadratic curve, and finding the roots for a quadratic Bézier curve means we can apply the ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/Quadratic_formula"},"Quadratic formula"),". If you've seen it before, you'll remember it, and if you haven't, it looks like this:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/d5882cc83b002196c8e701ad273ced103e2b4484.svg",width:"431.2",height:"42"}),React.createElement("p",null,"So, if we can express a Bézier component function as a plain polynomial, we're done: we just plug in the values into the quadratic formula, check if that square root is negative or not (if it is, there are no roots) and then just compute the two values that come out (because of that plus/minus sign we get two). Any value between 0 and 1 is a root that matters for Bézier curves, anything below or above that is irrelevant (because Bézier curves are only defined over the interval [0,1]). So, how do we convert?"),React.createElement("p",null,"First we turn our cubic Bézier function into a quadratic one, by following the rule mentioned at the end of the ",React.createElement("a",{href:"#derivatives"},"derivatives section"),":"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/d38fc2ce8c5af65b94b56897b8ae8d304c84a4b7.svg",width:"561.4",height:"37.8"}),React.createElement("p",null,"And then, using these ",React.createElement("em",null,"v")," values, we can find out what our ",React.createElement("em",null,"a"),", ",React.createElement("em",null,"b"),", and ",React.createElement("em",null,"c")," should be:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/292b2b9178aca5486da7e1a596e66091ba2ed282.svg",width:"330.4",height:"124.6"}),React.createElement("p",null,"This gives us thee coefficients ",React.createElement("em",null,"a"),", ",React.createElement("em",null,"b"),", and ",React.createElement("em",null,"c")," that are expressed in terms of ",React.createElement("em",null,"v")," values, where the ",React.createElement("em",null,"v")," values are just convenient expressions of our original ",React.createElement("em",null,"p")," values, so we can do some trivial substitution to get:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/2de779b7b9c6aa130b9aeadbb8c46878b94920a1.svg",width:"323.4",height:"65.8"}),React.createElement("p",null,"Easy peasy. We can now almost trivially find the roots by plugging those values into the quadratic formula. We also note that the second derivative of a cubic curve means computing the first derivative of a quadratic curve, and we just saw how to do that in the section above."),React.createElement("h3",{id:"quartic-curves-cardano-s-algorithm-"},"Quartic curves: Cardano's algorithm."),React.createElement("p",null,"Quartic—fourth degree—curves have a cubic function as derivative. Now, cubic functions are a bit of a problem because they're really hard to solve. But, way back in the 16",React.createElement("sup",null,"th")," century, ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/Gerolamo_Cardano"},"Gerolamo Cardano")," figured out that even if the general cubic function is really hard to solve, it can be rewritten to a form for which finding the roots is \"easy\", and then the only hard part is figuring out how to go from that form to the generic form. So:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/a16a0da87e138b1307973397275c296eb475b1b1.svg",width:"478.79999999999995",height:"21"}),React.createElement("p",null,"This is easier because for the \"easier formula\" we can use ",React.createElement("a",{href:"http://www.wolframalpha.com/input/?i=t^3+%2B+pt+%2B+q"},"regular calculus")," to find the roots (as a cubic function, however, it can have up to three roots, but two of those can be complex. For the purpose of Bézier curve extremities, we can completely ignore those complex roots, since our ",React.createElement("em",null,"t")," is a plain real number from 0 to 1)."),React.createElement("p",null,"So, the trick is to figure out how to turn the first formula into the second formula, and to then work out the maths that gives us the roots. This is explained in detail over at ",React.createElement("a",{href:"http://www.trans4mind.com/personal_development/mathematics/polynomials/cubicAlgebra.htm"},"Ken J. Ward's page")," for solving the cubic equation, so instead of showing the maths, I'm simply going to show the programming code for solving the cubic equation, with the complex roots getting totally ignored."),React.createElement("div",{className:"howtocode"},React.createElement("h3",{id:"implementing-cardano-s-algorithm-for-finding-all-real-roots"},"Implementing Cardano's algorithm for finding all real roots"),React.createElement("p",null,"The \"real roots\" part is fairly important, because while you cannot take a square, cube, etc. root of a negative number in the \"real\" number space (denoted with ℝ), this is perfectly fine in the ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/Complex_number"},"\"complex\" number")," space (denoted with ℂ). And, as it so happens, Cardano is also attributed as the first mathematician in history to have made use of complex numbers in his calculations. For this very algorithm!"),React.createElement("pre",null,"// A helper function to filter for values in the [0,1] interval:\nfunction accept(t) {\n  return 0<=t && t <=1;\n}\n\n// A real-cuberoots-only function:\nfunction crt(v) {\n  if(v<0) return -Math.pow(-v,1/3);\n  return Math.pow(v,1/3);\n}\n\n// Now then: given cubic coordinates {pa, pb, pc, pd} find all roots.\nfunction getCubicRoots(pa, pb, pc, pd) {\n  var d = (-pa + 3*pb - 3*pc + pd),\n  a = (3*pa - 6*pb + 3*pc) / d,\n  b = (-3*pa + 3*pb) / d,\n  c = pa / d;\n\n  var p = (3*b - a*a)/3,\n  p3 = p/3,\n  q = (2*a*a*a - 9*a*b + 27*c)/27,\n  q2 = q/2,\n  discriminant = q2*q2 + p3*p3*p3;\n\n  // and some variables we're going to use later on:\n  var u1,v1,root1,root2,root3;\n\n  // three possible real roots:\n  if (discriminant < 0) {\n    var mp3  = -p/3,\n    mp33 = mp3*mp3*mp3,\n    r    = sqrt( mp33 ),\n    t    = -q / (2*r),\n    cosphi = t<-1 ? -1 : t>1 ? 1 : t,\n    phi  = acos(cosphi),\n    crtr = cuberoot(r),\n    t1   = 2*crtr;\n    root1 = t1 * cos(phi/3) - a/3;\n    root2 = t1 * cos((phi+2*pi)/3) - a/3;\n    root3 = t1 * cos((phi+4*pi)/3) - a/3;\n    return [root1, root2, root3].filter(accept);\n  }\n\n  // three real roots, but two of them are equal:\n  if(discriminant === 0) {\n    u1 = q2 < 0 ? cuberoot(-q2) : -cuberoot(q2);\n    root1 = 2*u1 - a/3;\n    root2 = -u1 - a/3;\n    return [root1, root2].filter(accept);\n  }\n\n  // one real root, two complex roots\n  var sd = sqrt(discriminant);\n  u1 = cuberoot(sd - q2);\n  v1 = cuberoot(sd + q2);\n  root1 = u1 - v1 - a/3;\n  return [root1].filter(accept);\n}\n")),React.createElement("p",null,"And that's it. The maths is complicated, but the code is pretty much just \"follow the maths, while caching as many values as we can to reduce recomputing things as much as possible\" and now we have a way to find all roots for a cubic function and can just move on with using that to find extremities of our curves."),React.createElement("h3",{id:"quintic-and-higher-order-curves-finding-numerical-solutions"},"Quintic and higher order curves: finding numerical solutions"),React.createElement("p",null,"The problem with this is that as the order of the curve goes up, we can't actually solve those equations the normal way. We can't take the function, and then work out what the solutions are. Not to mention that even solving a third order derivative (for a fourth order curve) is already a royal pain in the backside. We need a better solution. We need numerical approaches."),React.createElement("p",null,"That's a fancy word for saying \"rather than solve the function, treat the problem as a sequence of identical operations, the performing of which gets us closer and closer to the real answer\". As it turns out, there is a really nice numerical root finding algorithm, called the ",React.createElement("a",{href:"http://en.wikipedia.org/wiki/Newton-Raphson"},"Newton-Raphson")," root finding method (yes, after ",React.createElement("em",null,React.createElement("a",{href:"https://en.wikipedia.org/wiki/Isaac_Newton"},"that"))," Newton), which we can make use of."),React.createElement("p",null,"The Newton-Raphson approach consists of picking a value ",React.createElement("em",null,"t")," (any will do), and getting the corresponding value at that ",React.createElement("em",null,"t")," value. For normal functions, we can treat that value as a height. If the height is zero, we're done, we have found a root. If it's not, we take the tangent of the curve at that point, and extend it until it passes the x-axis, which will be at some new point ",React.createElement("em",null,"t"),". We then repeat the procedure with this new value, and we keep doing this until we find our root."),React.createElement("p",null,"Mathematically, this means that for some ",React.createElement("em",null,"t"),", at step ",React.createElement("em",null,"n=1"),", we perform the following calculation until ",React.createElement("em",null,"f",React.createElement("sub",null,"y")),"(",React.createElement("em",null,"t"),") is zero, so that the next ",React.createElement("em",null,"t")," is the same as the one we already have:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/b563256be7016370365935944308cf878cdbc29c.svg",width:"130.2",height:"47.599999999999994"}),React.createElement("p",null,"(The wikipedia article has a decent animation for this process, so I'm not adding a sketch for that here unless there are requests for it)"),React.createElement("p",null,"Now, this works well only if we can pick good starting points, and our curve is continuously differentiable and doesn't have oscillations. Glossing over the exact meaning of those terms, the curves we're dealing with conform to those constraints, so as long as we pick good starting points, this will work. So the question is: which starting points do we pick?"),React.createElement("p",null,"As it turns out, Newton-Raphson is so blindingly fast, so we could get away with just not picking: we simply run the algorithm from ",React.createElement("em",null,"t=0")," to ",React.createElement("em",null,"t=1")," at small steps (say, 1/200",React.createElement("sup",null,"th"),") and the result will be all the roots we want. Of course, this may pose problems for high order Bézier curves: 200 steps for a 200",React.createElement("sup",null,"th")," order Bézier curve is going to go wrong, but that's okay: there is no reason, ever, to use Bézier curves of crazy high orders. You might use a fifth order curve to get the \"nicest still remotely workable\" approximation of a full circle with a single Bézier curve, that's pretty much as high as you'll ever need to go."),React.createElement("h3",{id:"in-conclusion-"},"In conclusion:"),React.createElement("p",null,"So now that we know how to do root finding, we can determine the first and second derivative roots for our Bézier curves, and show those roots overlaid on the previous graphics:"),React.createElement(Graphic,{preset:"simple",title:"Quadratic Bézier curve extremities",setup:handler.setupQuadratic,draw:handler.draw}),React.createElement(Graphic,{preset:"simple",title:"Cubic Bézier curve extremities",setup:handler.setupCubic,draw:handler.draw}));}},"boundingbox":{"locale":"en-GB","title":"Bounding boxes","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"boundingbox",title:"Bounding boxes",number:"16"}),React.createElement("p",null,"If we have the extremities, and the start/end points, a simple for loop that tests for min/max values for x and y means we have the four values we need to box in our curve:"),React.createElement("p",null,React.createElement("em",null,"Computing the bounding box for a Bézier curve"),":"),React.createElement("ol",null,React.createElement("li",null,"Find all ",React.createElement("em",null,"t")," value(s) for the curve derivative's x- and y-roots."),React.createElement("li",null,"Discard any ",React.createElement("em",null,"t")," value that's lower than 0 or higher than 1, because Bézier curves only use the interval [0,1]."),React.createElement("li",null,"Determine the lowest and highest value when plugging the values ",React.createElement("em",null,"t=0"),", ",React.createElement("em",null,"t=1")," and each of the found roots into the original functions: the lowest value is the lower bound, and the highest value is the upper bound for the bounding box we want to construct.")),React.createElement("p",null,"Applying this approach to our previous root finding, we get the following bounding boxes (with all curve extremity points shown on the curve):"),React.createElement(Graphic,{preset:"simple",title:"Quadratic Bézier bounding box",setup:handler.setupQuadratic,draw:handler.draw}),React.createElement(Graphic,{preset:"simple",title:"Cubic Bézier bounding box",setup:handler.setupCubic,draw:handler.draw}),React.createElement("p",null,"We can construct even nicer boxes by aligning them along our curve, rather than along the x- and y-axis, but in order to do so we first need to look at how aligning works."));}},"aligning":{"locale":"en-GB","title":"Aligning curves","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"aligning",title:"Aligning curves",number:"17"}),React.createElement("p",null,"While there are an incredible number of curves we can define by varying the x- and y-coordinates for the control points, not all curves are actually distinct. For instance, if we define a curve, and then rotate it 90 degrees, it's still the same curve, and we'll find its extremities in the same spots, just at different draw coordinates. As such, one way to make sure we're working with a \"unique\" curve is to \"axis-align\" it."),React.createElement("p",null,"Aligning also simplifies a curve's functions. We can translate (move) the curve so that the first point lies on (0,0), which turns our ",React.createElement("em",null,"n")," term polynomial functions into ",React.createElement("em",null,"n-1")," term functions. The order stays the same, but we have less terms. Then, we can rotate the curves so that the last point always lies on the x-axis, too, making its coordinate (...,0). This further simplifies the function for the y-component to an ",React.createElement("em",null,"n-2")," term function. For instance, if we have a cubic curve such as this:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/d253dc7ff011a8ae46f3351975f1d4beedd7a794.svg",width:"499.79999999999995",height:"42"}),React.createElement("p",null,"Then translating it so that the first coordinate lies on (0,0), moving all ",React.createElement("em",null,"x")," coordinates by -120, and all ",React.createElement("em",null,"y")," coordinates by -160, gives us:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/b3ec747086a146c1b2c682afea6b1eae016c9a7a.svg",width:"482.99999999999994",height:"42"}),React.createElement("p",null,"If we then rotate the curve so that its end point lies on the x-axis, the coordinates (integer-rounded for illustrative purposes here) become:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/fd82fad845da25b074dff33bbc4aa563d5f367a7.svg",width:"474.59999999999997",height:"42"}),React.createElement("p",null,"If we drop all the zero-terms, this gives us:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/b4d6e220358b2d00f0cf516f433fbe5ecb58f25d.svg",width:"386.4",height:"42"}),React.createElement("p",null,"We can see that our original curve definition has been simplified considerably. The following graphics illustrate the result of aligning our example curves to the x-axis, with the cubic case using the coordinates that were just used in the example formulae:"),React.createElement(Graphic,{preset:"twopanel",title:"Aligning a quadratic curve",setup:handler.setupQuadratic,draw:handler.draw}),React.createElement(Graphic,{preset:"twopanel",title:"Aligning a cubic curve",setup:handler.setupCubic,draw:handler.draw}));}},"tightbounds":{"locale":"en-GB","title":"Tight boxes","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"tightbounds",title:"Tight boxes",number:"18"}),React.createElement("p",null,"With our knowledge of bounding boxes, and curve alignment, We can now form the \"tight\" bounding box for curves. We first align  our curve, recording the translation we performed, \"T\", and the rotation angle we used, \"R\". We then determine the aligned curve's normal bounding box. Once we have that, we can map that bounding box back to our original curve by rotating it by -R, and then translating it by -T. We now have nice tight bounding boxes for our curves:"),React.createElement(Graphic,{preset:"twopanel",title:"Aligning a quadratic curve",setup:handler.setupQuadratic,draw:handler.draw}),React.createElement(Graphic,{preset:"twopanel",title:"Aligning a cubic curve",setup:handler.setupCubic,draw:handler.draw}),React.createElement("p",null,"These are, strictly speaking, not necessarily the tightest possible bounding boxes. It is possible to compute the optimal bounding box by determining which spanning lines we need to effect a minimal box area, but because of the parametric nature of Bézier curves this is actually a rather costly operation, and the gain in bounding precision is often not worth it. If there is high demand for it, I'll add a section on how to precisely compute the best fit bounding box, but the maths is fairly gruelling and just not really worth spending time on."));}},"inflections":{"locale":"en-GB","title":"Curve inflections","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"inflections",title:"Curve inflections",number:"19"}),React.createElement("p",null,"Now that we know how to align a curve, there's one more thing we can calculate: inflection points. Imagine we have a variable size circle that we can slide up against our curve. We place it against the curve and adjust its radius so that where it touches the curve, the curvatures of the curve and the circle are the same, and then we start to slide the circle along the curve - for quadratic curves, we can always do this without the circle behaving oddly: we might have to change the radius of the circle as we slide it along, but it'll always sit against the same side of the curve."),React.createElement("p",null,"But what happens with cubic curves? Imagine we have an S curve and we place our circle at the start of the curve, and start sliding it along. For a while we can simply adjust the radius and things will be fine, but once we get to the midpoint of that S, something odd happens: the circle \"flips\" from one side of the curve to the other side, in order for the curvatures to keep matching. This is called an inflection, and we can find out where those happen relatively easily."),React.createElement("p",null,"What we need to do is solve a simple equation:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/b039194e01b6081628efaf4aa169a4c50fa4aae4.svg",width:"61.599999999999994",height:"16.799999999999997"}),React.createElement("p",null,"What we're saying here is that given the curvature function ",React.createElement("em",null,"C(t)"),", we want to know for which values of ",React.createElement("em",null,"t")," this function is zero, meaning there is no \"curvature\", which will be exactly at the point between our circle being on one side of the curve, and our circle being on the other side of the curve. So what does ",React.createElement("em",null,"C(t)")," look like? Actually something that seems not too hard:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/297d1e13000b19d351e5884a40909652a2ee83e2.svg",width:"404.59999999999997",height:"22.4"}),React.createElement("p",null,"So the function ",React.createElement("em",null,"C(t)")," is wholly defined by the first and second derivative functions for the parametric dimensions of our curve. And as already shown, derivatives of Bézier curves are just simpler Bézier curves, with very easy to compute new coefficients, so this should be pretty easy."),React.createElement("p",null,"However as we've seen in the section on aligning, aligning lets us simplify things ",React.createElement("em",null,"a lot"),", by completely removing the contributions of the first coordinate from most mathematical evaluations, and removing the last ",React.createElement("em",null,"y")," coordinate as well by virtue of the last point lying on the x-axis. So, while we can evaluate ",React.createElement("em",null,"C(t) = 0")," for our curve, it'll be much easier to first axis-align the curve and ",React.createElement("em",null,"then")," evalutating the curvature function."),React.createElement("div",{className:"note"},React.createElement("h3",{id:"let-s-derive-the-full-formula-anyway"},"Let's derive the full formula anyway"),React.createElement("p",null,"Of course, before we do our aligned check, let's see what happens if we compute the curvature function without axis-aligning. We start with the first and second derivatives, given our basis functions:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/e522d174844a5a31f585cc04cab944a3c4593781.svg",width:"631.4",height:"74.19999999999999"}),React.createElement("p",null,"And of course the same functions for ",React.createElement("em",null,"y"),":"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/57d857282b8c91da5caf94dcfbe85145dbd760a8.svg",width:"418.59999999999997",height:"72.8"}),React.createElement("p",null,"Asking a computer to now compose the ",React.createElement("em",null,"C(t)")," function for us (and to expand it to a readable form of simple terms) gives us this rather overly complicated set of arithmetic expressions:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/0e69d797dc67f0bd2d826fcf8c48c22ff5decf23.svg",width:"579.5999999999999",height:"102.19999999999999"}),React.createElement("p",null,"That is... unwieldy. So, we note that there are a lot of terms that involve multiplications involving x1, y1, and y4, which would all disappear if we axis-align our curve, which is why aligning is a great idea.")),React.createElement("p",null,"Aligning our curve so that three of the eight coefficients become zero, we end up with the following simple term function for ",React.createElement("em",null,"C(t)"),":"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/f61c01094f0de8ca4c7f26a229f0206d54b13930.svg",width:"589.4",height:"22.4"}),React.createElement("p",null,"That's a lot easier to work with: we see a fair number of terms that we can compute and then cache, giving us the following simplification:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/c1e427616a8a2502abf3cf46415971d0df9a273c.svg",width:"534.8",height:"77"}),React.createElement("p",null,"This is a plain quadratic curve, and we know how to solve ",React.createElement("em",null,"C(t) = 0"),"; we use the quadratic formula:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/368099657b735b0d17becbbe7be915e88e8c04c5.svg",width:"456.4",height:"57.4"}),React.createElement("p",null,"We can easily compute this value ",React.createElement("em",null,"if")," the descriminator isn't a negative number (because we only want real roots, not complex roots), and ",React.createElement("em",null,"if")," ",React.createElement("em",null,"x")," is not zero, because divisions by zero are rather useless."),React.createElement("p",null,"Taking that into account, we compute ",React.createElement("em",null,"t"),", we disregard any ",React.createElement("em",null,"t")," value that isn't in the Bézier interval [0,1], and we now know at which ",React.createElement("em",null,"t")," value(s) our curve will inflect."),React.createElement(Graphic,{title:"Finding cubic Bézier curve inflections",setup:handler.setupCubic,draw:handler.draw}));}},"canonical":{"locale":"en-GB","title":"Canonical form (for cubic curves)","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"canonical",title:"Canonical form (for cubic curves)",number:"20"}),React.createElement("p",null,"While quadratic curves are relatively simple curves to analyze, the same cannot be said of the cubic curve. As a curvature controlled by more than one control points, it exhibits all kinds of features like loops, cusps, odd colinear features, and up to two inflection points because the curvature can change direction up to three times. Now, knowing what kind of curve we're dealing with means that some algorithms can be run more efficiently than if we have to implement them as generic solvers, so is there a way to determine the curve type without lots of work?"),React.createElement("p",null,"As it so happens, the answer is yes and the solution we're going to look at was presented by Maureen C. Stone from Xerox PARC and Tony D. deRose from the University of Washington in their joint paper ",React.createElement("a",{href:"http://graphics.pixar.com/people/derose/publications/CubicClassification/paper.pdf"},"\"A Geometric Characterization of Parametric Cubic curves\""),". It was published in 1989, and defines curves as having a \"canonical\" form (i.e. a form that all curves can be reduced to) from which we can immediately tell which features a curve will have. So how does it work?"),React.createElement("p",null,"The first observation that makes things work is that if we have a cubic curve with four points, we can apply a linear transformation to these points such that three of the points end up on (0,0), (0,1) and (1,1), with the last point then being \"somewhere\". After applying that transformation, the location of that last point can then tell us what kind of curve we're dealing with. Specifically, we see the following breakdown:"),React.createElement(Graphic,{"static":true,preset:"simple",title:"The canonical curve map",setup:handler.setup,draw:handler.drawBase}),React.createElement("p",null,"This is a fairly funky image, so let's see how it breaks down. We see the three fixed points at (0,0), (0,1) and (1,1), and then the fourth point is somewhere. Depending on where it is, our curve will have certain features. Namely, if the fourth point is..."),React.createElement("ol",null,React.createElement("li",null,"anywhere on and in the red zone, the curve will be self-intersecting, yielding either a cusp or a loop. Anywhere inside the the red zone, this will be a loop. We won't know ",React.createElement("i",null,"where")," that loop is (in terms of ",React.createElement("i",null,"t")," values), but we are guaranteed that there is one."),React.createElement("li",null,"on the left (red) edge, the curve will have a cusp. We again don't know ",React.createElement("em",null,"where"),", just that it has one. This edge is described by the function:")),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/ae5a63e86bb367e6266a394962387344d0a92b10.svg",width:"189",height:"39.199999999999996"}),React.createElement("ol",null,React.createElement("li",null,"on the lower right (pink) edge, the curve will have a loop at t=1, so we know the end coordinate of the curve also lies ",React.createElement("em",null,"on")," the curve. This edge is described by the function:")),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/d389fcde05a773be99f84db5fc9ed7ef043bf406.svg",width:"242.2",height:"40.599999999999994"}),React.createElement("ol",null,React.createElement("li",null,"on the top (blue) edge, the curve will have a loop at t=0, so we know the start coordinate of the curve also lies ",React.createElement("em",null,"on")," the curve. This edge is described by the function:")),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/d97181a9d0ada19862a0ff2cebb08bdee00868d7.svg",width:"161",height:"39.199999999999996"}),React.createElement("ol",null,React.createElement("li",null,"inside the green zone, the curve will have a single inflection, switching concave/convex once."),React.createElement("li",null,"between the red and green zones, the curve has two inflections, meaning its curvature switches between concave/convex form twice."),React.createElement("li",null,"anywhere on the right of the red zone, the curve will have no inflections. It'll just be a well-behaved arch.")),React.createElement("p",null,"Of course, this map is fairly small, but the regions extend to infinity, with well defined boundaries."),React.createElement("div",{className:"note"},React.createElement("h3",{id:"wait-where-do-those-lines-come-from-"},"Wait, where do those lines come from?"),React.createElement("p",null,"Without repeating the paper mentioned at the top of this section, the loop-boundaries come from rewriting the curve into canonical form, and then solving the formulae for which constraints must hold for which possible curve properties. In the paper these functions yield formulae for where you will find cusp points, or loops where we know t=0 or t=1, but those functions are derived for the full cubic expression, meaning they apply to t=-∞ to t=∞... For Bézier curves we only care about the \"clipped interval\" t=0 to t=1, so some of the properties that apply when you look at the curve over an infinite interval simply don't apply to the Bézier curve interval."),React.createElement("p",null,"The right bound for the loop region, indicating where the curve switches from \"having inflections\" to \"having a loop\", for the general cubic curve, is actually mirrored over x=1, but for Bézier curves this right half doesn't apply, so we don't need to pay attention to it. Similarly, the boundaries for t=0 and t=1 loops are also nice clean curves but get \"cut off\" when we only look at what the general curve does over the interval t=0 to t=1."),React.createElement("p",null,"For the full details, head over to the paper and read through sections 3 and 4. If you still remember your high school precalculus, you can probably follow along with this paper, although you might have to read it a few times before all the bits \"click\".")),React.createElement("p",null,"So now the question becomes: how do we manipulate our curve so that it fits this canonical form, with three fixed points, and one \"free\" point? Enter linear algerba. Don't worry, I'll be doing all the math for you, as well as show you what the effect is on our curves, but basically we're going to be using linear algebra, rather than calculus, because \"it's way easier\". Sometimes a calculus approach is very hard to work with, when the equivalent geometrical solution is super obvious."),React.createElement("p",null,"The approach is going to start with a curve that doesn't have all-colinear points (so we need to make sure the points don't all fall on a straight line), and then applying four graphics operations that you will probably have heard of: translation (moving all points by some fixed x- and y-distance), scaling (multiplying all points by some x and y scale factor), and shearing (an operation that turns rectangles into parallelograms)."),React.createElement("p",null,"Step 1: we translate any curve by -p1.x and -p1.y, so that the curve starts at (0,0). We're going to make use of an interesting trick here, by pretending our 2D coordinates are 3D, with the ",React.createElement("i",null,"z")," coordinate simply always being 1. This is an old trick in graphics to overcome the limitations of 2D transformations: without it, we can only turn (x,y) coordinates into new coordinates of the form (ax + by, cx + dy), which means we can't do translation, since that requires we end up with some kind of (x + a, y + b). If we add a bogus ",React.createElement("i",null,"z")," coordinate that is always 1, then we can suddenly add arbitrary values. For example:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/00ca2970fccea8f0883af6db4fbc3a60efd2539d.svg",width:"495.59999999999997",height:"57.4"}),React.createElement("p",null,"Sweet! ",React.createElement("i",null,"z")," stays 1, so we can effectively ignore it entirely, but we added some plain values to our x and y coordinates. So, if we want to subtract p1.x and p1.y, we use:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/1a48a27661f19f066ddd591fb4fc0d553b34c944.svg",width:"477.4",height:"60.199999999999996"}),React.createElement("p",null,"Running all our coordinates through this transformation gives a new set of coordinates, let's call those ",React.createElement("b",null,"U"),", where the first coordinate lies on (0,0), and the rest is still somewhat free. Our next job is to make sure point 2 ends up lying on the ",React.createElement("i",null,"x=0")," line, so what we want is a transformation matrix that, when we run it, subtracts ",React.createElement("i",null,"x")," from whatever ",React.createElement("i",null,"x")," we currently have. This is called ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/Shear_matrix"},"shearing"),", and the typical x-shear matrix and its transformation looks like this:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/8e98c870c9d5b60bccf196d29e290f9de6657ce7.svg",width:"204.39999999999998",height:"56"}),React.createElement("p",null,"So we want some shearing value that, when multiplied by ",React.createElement("i",null,"y"),", yields ",React.createElement("i",null,"-x"),", so our x coordinate becomes zero. That value is simpy ",React.createElement("i",null,"-x/y"),", because ",React.createElement("i",null,"-x/y * y = -x"),". Done:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/585fa88864a98008c15225bdbeb0eb26a4653dab.svg",width:"140",height:"70"}),React.createElement("p",null,"Now, running this on all our points generates a new set of coordinates, let's call those V, which now have point 1 on (0,0) and point 2 on (0, some-value), and we wanted it at (0,1), so we need to ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/Scaling_%28geometry%29"},"do some scaling")," to make sure it ends up at (0,1). Additionally, we want point 3 to end up on (1,1), so we can also scale x to make sure its x-coordinate will be 1 after we run the transform. That means we'll be x-scaling by 1/point3",React.createElement("sub",null,"x"),", and y-scaling by point2",React.createElement("sub",null,"y"),". This is really easy:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/bf9c60b59e6247de3fece63638a8333bdcd068a4.svg",width:"144.2",height:"74.19999999999999"}),React.createElement("p",null,"Then, finally, this generates a new set of coordinates, let's call those W, of which point 1 lies on (0,0), point 2 lies on (0,1), and point three lies on (1, ...) so all that's left is to make sure point 3 ends up at (1,1) - but we can't scale! Point 2 is already in the right place, and y-scaling would move it out of (0,1) again, so our only option is to y-shear point three, just like how we x-sheared point 2 earlier. In this case, we do the same trick, but with ",React.createElement("code",null,"y/x")," rather than ",React.createElement("code",null,"x/y")," because we're not x-shearing but y-shearing. Additionally, we don't actually want to end up at zero (which is what we did before) so we need to shear towards an offset, in this case 1:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/af412fd7df7faf35973314095ec6bf1cb28a8e34.svg",width:"147",height:"68.6"}),React.createElement("p",null,"And this generates our final set of four coordinates. Of these, we already know that points 1 through 3 are (0,0), (0,1) and (1,1), and only the last coordinate is \"free\". In fact, given any four starting coordinates, the resulting \"transformation mapped\" coordinate will be:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/66e084e9ee396b8cc40de3d0df9c4658dcd10e14.svg",width:"477.4",height:"95.19999999999999"}),React.createElement("p",null,"That looks very complex, but notice that every coordinate value is being offset by the initial translation, and a lot of terms in there repeat: it's pretty easy to calculate this fast, since there's so much we can cache and reuse while we compute this mapped coordinate!"),React.createElement("p",null,"First, let's just do that translation step as a \"preprocessing\" operation so we don't have to subtract the values all the time. What does that leave?"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/d2dc58a4a6951ff27e5b83fb9be239e2fbe0f7ce.svg",width:"371",height:"61.599999999999994"}),React.createElement("p",null,"Suddenly things look a lot simpler: the mapped x is fairly straight forward to compute, and we see that the mapped y actually contains the mapped x in its entirety, so we'll have that part already available when we need to evaluate it. In fact, let's pull out all those common factors to see just how simple this is:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/ebaea590e50dfce555e8ad2c63682fe9e6285f06.svg",width:"428.4",height:"42"}),React.createElement("p",null,"That's kind of super-simple to write out in code, I think you'll agree. Coding math tends to be easier than the formulae initially make it look!"),React.createElement("div",{className:"note"},React.createElement("h3",{id:"how-do-you-track-all-that-"},"How do you track all that?"),React.createElement("p",null,"Doing maths can be a pain, so whenever possible, I like to make computers do the work for me. Especially for things like this, I simply use ",React.createElement("a",{href:"http://www.wolfram.com/mathematica"},"Mathematica"),". Tracking all this math by hand is insane, and we invented computers, literally, to do this for us. I have no reason to use pen and paper when I can write out what I want to do in a program, and have the program do the math for me. And real math, too, with symbols, not with numbers. In fact, ",React.createElement("a",{href:"http://pomax.github.io/gh-weblog/downloads/canonical-curve.nb"},"here's")," the Mathematica notebook if you want to see how this works for yourself."),React.createElement("p",null,"Now, I know, you're thinking \"but Mathematica is super expensive!\" and that's true, it's ",React.createElement("a",{href:"http://www.wolfram.com/mathematica-home-edition"},"$295 for home use"),", but it's ",React.createElement("strong",null,"also")," ",React.createElement("a",{href:"http://www.wolfram.com/raspberry-pi"},"free when you buy a $35 raspberry pi"),". Obviously, I bought a raspberry pi, and I encourage you to do the same. With that, as long as you know what you want to ",React.createElement("em",null,"do"),", Mathematica can just do it for you. And we don't have to be geniusses to work out what the maths looks like. That's what we have computers for.")),React.createElement("p",null,"So, let's write up a sketch that'll show us the canonical form for any curve drawn in blue, overlaid on our canonical map, so that we can immediately tell which features our curve must have, based on where the fourth coordinate is located on the map:"),React.createElement(Graphic,{preset:"simple",title:"A cubic curve mapped to canonical form",setup:handler.setup,draw:handler.draw}));}},"arclength":{"locale":"en-GB","title":"Arc length","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"arclength",title:"Arc length",number:"21"}),React.createElement("p",null,"How long is a Bézier curve? As it turns out, that's not actually an easy question, because the answer requires maths that —much like root finding— cannot generally be solved the traditional way. If we have a parametric curve with ",React.createElement("em",null,"f",React.createElement("sub",null,"x"),"(t)")," and ",React.createElement("em",null,"f",React.createElement("sub",null,"y"),"(t)"),", then the length of the curve, measured from start point to some point ",React.createElement("em",null,"t = z"),", is computed using the following seemingly straight forward (if a bit overwhelming) formula:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/16e3f81dfc12c526ca53b477b2aa67ef7b56bfe2.svg",width:"147",height:"35"}),React.createElement("p",null,"or, more commonly written using Leibnitz notation as:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/8e2857c32b23969bca67b0ead318493a3e61dc4a.svg",width:"257.59999999999997",height:"36.4"}),React.createElement("p",null,"This formula says that the length of a parametric curve is in fact equal to the ",React.createElement("strong",null,"area")," underneath a function that looks a remarkable amount like Pythagoras' rule for computing the diagonal of a straight angled triangle. This sounds pretty simple, right? Sadly, it's far from simple... cutting straight to after the chase is over: for quadratic curves, this formula generates an ",React.createElement("a",{href:"http://www.wolframalpha.com/input/?i=antiderivative+for+sqrt%28%282*%281-t%29*t*B+%2B+t%5E2*C%29%27%5E2+%2B+%282*%281-t%29*t*E%29%27%5E2%29&incParTime=true"},"unwieldy computation"),", and we're simply not going to implement things that way. For cubic Bézier curves, things get even more fun, because there is no \"closed form\" solution, meaning that due to the way calculus works, there is no generic formula that allows you to calculate the arc length. Let me just repeat this, because it's fairly crucial: ",React.createElement("strong",null,React.createElement("em",null,"for cubic and higher Bézier curves, there is no way to solve this function if you want to use it \"for all possible coordinates\"")),"."),React.createElement("p",null,"Seriously: ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/Abel%E2%80%93Ruffini_theorem"},"It cannot be done"),"."),React.createElement("p",null,"So we turn to numerical approaches again. The method we'll look at here is the ",React.createElement("a",{href:"http://www.youtube.com/watch?v=unWguclP-Ds&feature=BFa&list=PLC8FC40C714F5E60F&index=1"},"Gauss quadrature"),". This approximation is a really neat trick, because for any ",React.createElement("em",null,"n",React.createElement("sup",null,"th"))," degree polynomial it finds approximated values for an integral really efficiently. Explaining this procedure in length is way beyond the scope of this page, so if you're interested in finding out why it works, I can recommend the University of South Florida video lecture on the procedure, linked in this very paragraph. The general solution we're looking for is the following:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/e6a8d7d5f1742bb926c0c992d2b89c71090edbf4.svg",width:"576.8",height:"74.19999999999999"}),React.createElement("p",null,"In plain text: an integral function can always be treated as the sum of an (infinite) number of (infinitely thin) rectangular strips sitting \"under\" the function's plotted graph. To illustrate this idea, the following graph shows the integral for a sinoid function. The more strips we use (and of course the more we use, the thinner they get) the closer we get to the true area under the curve, and thus the better the approximation:"),React.createElement("div",{className:"figure"},React.createElement(Graphic,{inline:true,"static":true,preset:"empty",title:"A function's approximated integral",setup:handler.setup,draw:handler.drawCoarseIntegral}),React.createElement(Graphic,{inline:true,"static":true,preset:"empty",title:"A better approximation",setup:handler.setup,draw:handler.drawFineIntegral}),React.createElement(Graphic,{inline:true,"static":true,preset:"empty",title:"An even better approximation",setup:handler.setup,draw:handler.drawSuperFineIntegral})),React.createElement("p",null,"Now, infinitely many terms to sum and infinitely thin rectangles are not something that computers can work with, so instead we're going to approximate the infinite summation by using a sum of a finite number of \"just thin\" rectangular strips. As long as we use a high enough number of thin enough rectangular strips, this will give us an approximation that is pretty close to what the real value is."),React.createElement("p",null,"So, the trick is to come up with useful rectangular strips. A naive way is to simply create ",React.createElement("em",null,"n")," strips, all with the same width, but there is a far better way using special values for ",React.createElement("em",null,"C")," and ",React.createElement("em",null,"f(t)")," depending on the value of ",React.createElement("em",null,"n"),", which indicates how many strips we'll use, and it's called the Legendre-Gauss quadrature."),React.createElement("p",null,"This approach uses strips that are ",React.createElement("em",null,"not")," spaced evenly, but instead spaces them in a special way that works remarkably well. If you look at the earlier sinoid graphic, you could imagine that we could probably get a result similar to the one with 99 strips if we used fewer strips, but spaced them so that the steeper the curve is, the thinner we make the strip, and conversely, the flatter the curve is (especially near the tops of the function), the wider we make the strip. That's akin to how the Legendre values work."),React.createElement("div",{className:"note"},React.createElement("p",null,"Note that one requirement for the approach we'll use is that the integral must run from -1 to 1. That's no good, because we're dealing with Bézier curves, and the length of a section of curve applies to values which run from 0 to \"some value smaller than or equal to 1\" (let's call that value ",React.createElement("em",null,"z"),"). Thankfully, we can quite easily transform any integral interval to any other integral interval, by shifting and scaling the inputs. Doing so, we get the following:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/631e6396082d9621472546b87c2e27065990d568.svg",width:"358.4",height:"75.6"}),React.createElement("p",null,"That may look a bit more complicated, but the fraction involving ",React.createElement("em",null,"z")," is a fixed number, so the summation, and the evaluation of the ",React.createElement("em",null,"f(t)")," values are still pretty simple."),React.createElement("p",null,"So, what do we need to perform this calculation? For one, we'll need an explicit formula for ",React.createElement("em",null,"f(t)"),", because that derivative notation is handy on paper, but not when we have to implement it. We'll also need to know what these ",React.createElement("em",null,"C",React.createElement("sub",null,"i"))," and ",React.createElement("em",null,"t",React.createElement("sub",null,"i"))," values should be. Luckily, that's less work because there are actually many tables available that give these values, for any ",React.createElement("em",null,"n"),", so if we want to approximate our integral with only two terms (which is a bit low, really) then ",React.createElement("a",{href:"legendre-gauss.html"},"these tables")," would tell us that for ",React.createElement("em",null,"n=2")," we must use the following values:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/6dc4299695f03c27c362e7faf47ae4474794809e.svg",width:"65.8",height:"98"}),React.createElement("p",null,"Which means that in order for us to approximate the integral, we must plug these values into the approximate function, which gives us:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/fe54606651e308caf83a65e53bc4d6104f8a4ee1.svg",width:"499.79999999999995",height:"46.199999999999996"}),React.createElement("p",null,"We can program that pretty easily, provided we have that ",React.createElement("em",null,"f(t)")," available, which we do, as we know the full description for the Bézier curve functions B",React.createElement("sub",null,"x"),"(t) and B",React.createElement("sub",null,"y"),"(t).")),React.createElement("p",null,"If we use the Legendre-Gauss values for our ",React.createElement("em",null,"C")," values (thickness for each strip) and ",React.createElement("em",null,"t")," values (location of each strip), we can determine the approximate length of a Bézier curve by computing the Legendre-Gauss sum. The following graphic shows a cubic curve, with its computed lengths; Go ahead and change the curve, to see how its length changes. One thing worth trying is to see if you can make a straight line, and see if the length matches what you'd expect. What if you form a line with the control points on the outside, and the start/end points on the inside?"),React.createElement(Graphic,{preset:"simple",title:"Arc length for a Bézier curve",setup:handler.setupCurve,draw:handler.drawCurve}));}},"arclengthapprox":{"locale":"en-GB","title":"Approximated arc length","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"arclengthapprox",title:"Approximated arc length",number:"22"}),React.createElement("p",null,"Sometimes, we don't actually need the precision of a true arc length, and we can get away with simply computing the approximate arc length instead. The by far fastest way to do this is to flatten the curve and then simply calculate the linear distance from point to point. This will come with an error, but this can be made arbitrarily small by increasing the segment count."),React.createElement("p",null,"If we combine the work done in the previous sections on curve flattening and arc length computation, we can implement these with minimal effort:"),React.createElement(Graphic,{preset:"twopanel",title:"Approximate quadratic curve arc length",setup:handler.setupQuadratic,draw:handler.draw,onKeyDown:handler.props.onKeyDown}),React.createElement(Graphic,{preset:"twopanel",title:"Approximate cubic curve arc length",setup:handler.setupCubic,draw:handler.draw,onKeyDown:handler.props.onKeyDown}),React.createElement("p",null,"Try clicking on the sketch and using your up and down arrow keys to lower the number of segments for both the quadratic and cubic curve. You may notice that the error in length is actually pretty significant, even if the percentage is fairly low: if the number of segments used yields an error of 0.1% or higher, the flattened curve already looks fairly obviously flattened. And of course, the longer the curve, the more significant the error will be."));}},"tracing":{"locale":"en-GB","title":"Tracing a curve at fixed distance intervals","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"tracing",title:"Tracing a curve at fixed distance intervals",number:"23"}),React.createElement("p",null,"Say you want to draw a curve with a dashed line, rather than a solid line, or you want to move something along the curve at fixed distance intervals over time, like a train along a track, and you want to use Bézier curves."),React.createElement("p",null,"Now you have a problem."),React.createElement("p",null,"The reason you have a problem is that Bézier curves are parametric functions with non-linear behaviour, whereas moving a train along a track is about as close to a practical example of linear behaviour as you can get. The problem we're faced with is that we can't just pick ",React.createElement("em",null,"t")," values at some fixed interval and expect the Bézier functions to generate points that are spaced a fixed distance apart. In fact, let's look at the relation between \"distance long a curve\" and \"",React.createElement("em",null,"t")," value\", by plotting them against one another."),React.createElement("p",null,"The following graphic shows a particularly illustrative curve, and it's length-to-t plot. For linear traversal, this line needs to be straight, running from (0,0) to (length,1). This is, it's safe to say, not what we'll see, we'll see something wobbly instead. To make matters even worse, the length-to-",React.createElement("em",null,"t")," function is also of a much higher order than our curve is: while the curve we're using for this exercise is a cubic curve, which can switch concave/convex form once at best, the plot shows that the distance function along the curve is able to switch forms three times (to see this, try creating an S curve with the start/end close together, but the control points far apart)."),React.createElement(Graphic,{preset:"twopanel",title:"The t-for-distance function",setup:handler.setup,draw:handler.plotOnly}),React.createElement("p",null,"We see a function that might be invertible, but we won't be able to do so, symbolically. You may remember from the section on arc length that we cannot actually compute the true arc length function as an expression of ",React.createElement("em",null,"t"),", which means we also can't compute the true inverted function that gives ",React.createElement("em",null,"t")," as an expression of length. So how do we fix this?"),React.createElement("p",null,"One way is to do what the graphic does: simply run through the curve, determine its ",React.createElement("em",null,"t"),"-for-length values as a set of discrete values at some high resolution (the graphic uses 100 discrete points), and then use those as a basis for finding an appropriate ",React.createElement("em",null,"t")," value, given a distance along the curve. This works quite well, actually, and is fairly fast."),React.createElement("p",null,"We can use some colour to show the difference between distance-based and time based intervals: the following graph is similar to the previous one, except it segments the curve in terms of equal-distance intervals. This shows as regular colour intervals going down the graph, but the mapping to ",React.createElement("em",null,"t")," values is not linear, so there will be (highly) irregular intervals along the horizontal axis. It also shows the curve in an alternating colouring based on the t-for-distance values we find our LUT:"),React.createElement(Graphic,{preset:"threepanel",title:"Fixed-interval coloring a curve",setup:handler.setup,draw:handler.drawColoured,onKeyDown:handler.props.onKeyDown}),React.createElement("p",null,"Use your up and down arrow keys to increase or decrease the number of equidistant segments used to colour the curve."),React.createElement("p",null,"However, are there better ways? One such way is discussed in \"",React.createElement("a",{href:"http://www.geometrictools.com/Documentation/MovingAlongCurveSpecifiedSpeed.pdf"},"Moving Along a Curve with Specified Speed"),"\" by David Eberly of Geometric Tools, LLC, but basically because we have no explicit length function (or rather, one we don't have to constantly compute for different intervals), you may simply be better off with a traditional lookup table (LUT)."));}},"intersections":{"locale":"en-GB","title":"Intersections","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"intersections",title:"Intersections",number:"24"}),React.createElement("p",null,"Let's look at some more things we will want to do with Bézier curves. Almost immediately after figuring out how to get bounding boxes to work, people tend to run into the problem that even though the minimal bounding box (based on rotation) is tight, it's not sufficient to perform true collision detection. It's a good first step to make sure there ",React.createElement("em",null,"might")," be a collision (if there is no bounding box overlap, there can't be one), but in order to do real collision detection we need to know whether or not there's an intersection on the actual curve."),React.createElement("p",null,"We'll do this in steps, because it's a bit of a journey to get to curve/curve intersection checking. First, let's start simple, by implementing a line-line intersection checker. While we can solve this the traditional calculus way (determine the functions for both lines, then compute the intersection by equating them and solving for two unknowns), linear algebra actually offers a nicer solution."),React.createElement("h3",{id:"line-line-intersections"},"Line-line intersections"),React.createElement("p",null,"if we have two line segments with two coordinates each, segments A-B and C-D, we can find the intersection of the lines these segments are an intervals on by linear algebra, using the procedure outlined in this ",React.createElement("a",{href:"http://www.topcoder.com/tc?module=Static&d1=tutorials&d2=geometry2#line_line_intersection"},"top coder")," article. Of course, we need to make sure that the intersection isn't just on the lines our line segments lie on, but also on our line segments themselves, so after we find the intersection we need to verify it lies without the bounds of our original line segments."),React.createElement("p",null,"The following graphic implements this intersection detection, showing a red point for an intersection on the lines our segments lie on (thus being a virtual intersection point), and a green point for an intersection that lies on both segments (being a real intersection point)."),React.createElement(Graphic,{preset:"simple",title:"Line/line intersections",setup:handler.setupLines,draw:handler.drawLineIntersection}),React.createElement("div",{className:"howtocode"},React.createElement("h3",{id:"implementing-line-line-intersections"},"Implementing line-line intersections"),React.createElement("p",null,"Let's have a look at how to implement a line-line intersection checking function. The basics are covered in the article mentioned above, but sometimes you need more function signatures, because you might not want to call your function with eight distinct parameters. Maybe you're using point structs or the line. Let's get coding:"),React.createElement("pre",null,"lli8 = function(x1,y1,x2,y2,x3,y3,x4,y4):\n  var nx=(x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4),\n      ny=(x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4),\n      d=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);\n  if d=0:\n    return false\n  return point(nx/d, ny/d)\n\nlli4 = function(p1, p2, p3, p4):\n  var x1 = p1.x, y1 = p1.y,\n      x2 = p2.x, y2 = p2.y,\n      x3 = p3.x, y3 = p3.y,\n      x4 = p4.x, y4 = p4.y;\n  return lli8(x1,y1,x2,y2,x3,y3,x4,y4)\n\nlli = function(line1, line2):\n  return lli4(line1.p1, line1.p2, line2.p1, line2.p2)\n")),React.createElement("h3",{id:"what-about-curve-line-intersections-"},"What about curve-line intersections?"),React.createElement("p",null,"Curve/line intersection is more work, but we've already seen the techniques we need to use in order to perform it: first we translate/rotate both the line and curve together, in such a way that the line coincides with the x-axis. This will position the curve in a way that makes it cross the line at points where its y-function is zero. By doing this, the problem of finding intersections between a curve and a line has now become the problem of performing root finding on our translated/rotated curve, as we already covered in the section on finding extremities."),React.createElement(Graphic,{preset:"simple",title:"Quadratic curve/line intersections",setup:handler.setupQuadratic,draw:handler.draw}),React.createElement(Graphic,{preset:"simple",title:"Cubic curve/line intersections",setup:handler.setupCubic,draw:handler.draw}),React.createElement("p",null,"Curve/curve intersection, however, is more complicated. Since we have no straight line to align to, we can't simply align one of the curves and be left with a simple procedure. Instead, we'll need to apply two techniques we've not covered yet: de Casteljau's algorithm, and curve splitting."));}},"curveintersection":{"locale":"en-GB","title":"Curve/curve intersection","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"curveintersection",title:"Curve/curve intersection",number:"25"}),React.createElement("p",null,"Using de Casteljau's algorithm to split the curve we can now implement curve/curve intersection finding using a \"divide and conquer\" technique:"),React.createElement("ul",null,React.createElement("li",null,"Take two curves ",React.createElement("em",null,"C",React.createElement("sub",null,"1"))," and ",React.createElement("em",null,"C",React.createElement("sub",null,"2")),", and treat them as a pair."),React.createElement("li",null,"If their bounding boxes overlap, split up each curve into two sub-curves"),React.createElement("li",null,"With ",React.createElement("em",null,"C",React.createElement("sub",null,"1.1")),", ",React.createElement("em",null,"C",React.createElement("sub",null,"1.2")),", ",React.createElement("em",null,"C",React.createElement("sub",null,"2.1"))," and ",React.createElement("em",null,"C",React.createElement("sub",null,"2.2")),", form four new pairs (",React.createElement("em",null,"C",React.createElement("sub",null,"1.1")),",",React.createElement("em",null,"C",React.createElement("sub",null,"2.1")),"), (",React.createElement("em",null,"C",React.createElement("sub",null,"1.1")),", ",React.createElement("em",null,"C",React.createElement("sub",null,"2.2")),"), (",React.createElement("em",null,"C",React.createElement("sub",null,"1.2")),",",React.createElement("em",null,"C",React.createElement("sub",null,"2.1")),"), and (",React.createElement("em",null,"C",React.createElement("sub",null,"1.2")),",",React.createElement("em",null,"C",React.createElement("sub",null,"2.2")),")."),React.createElement("li",null,"For each pair, check whether their bounding boxes overlap.",React.createElement("ul",null,React.createElement("li",null,"If their bounding boxes do not overlap, discard the pair, as there is no intersection between this pair of curves."),React.createElement("li",null,"If there ",React.createElement("em",null,"is")," overlap, rerun all steps for this pair."))),React.createElement("li",null,"Once the sub-curves we form are so small that they effectively occupy sub-pixel areas, we consider an intersection found.")),React.createElement("p",null,"This algorithm will start with a single pair, \"balloon\" until it runs in parallel for a large number of potential sub-pairs, and then taper back down as it homes in on intersection coordinates, ending up with as many pairs as there are intersections."),React.createElement("p",null,"The following graphic applies this algorithm to a pair of cubic curves, one step at a time, so you can see the algorithm in action. Click the button to run a single step in the algorithm, after setting up your curves in some creative arrangement. The algorithm resets once it's found a solution, so you can try this with lots of different curves (can you find the configuration that yields the maximum number of intersections between two cubic curves? Nine intersections!)"),React.createElement(Graphic,{preset:"clipping",title:"Curve/curve intersections",setup:handler.setup,draw:handler.draw},"\\t",React.createElement("button",{onClick:handler.stepUp},"advance one step")),React.createElement("p",null,"Self-intersection is dealt with in the same way, except we turn a curve into two or more curves first based on the inflection points. We then form all possible curve pairs with the resultant segments, and run exactly the same algorithm. All non-overlapping curve pairs will be removed after the first iteration, and the remaining steps home in on the curve's self-intersection points."));}},"abc":{"locale":"en-GB","title":"The projection identity","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"abc",title:"The projection identity",number:"26"}),React.createElement("p",null,"De Casteljau's algorithm is the pivotal algorithm when it comes to Bézier curves. You can use it not just to split curves, but also to draw them efficiently (especially for high-order Bézier curves), as well as to come up with curves based on three points and a tangent. Particularly this last thing is really useful because it lets us \"mould\" a curve, by picking it up at some point, and dragging that point around to change the curve's shape."),React.createElement("p",null,"How does that work? Succinctly: we run de Casteljau's algorithm in reverse!"),React.createElement("p",null,"In order to run de Casteljau's algorithm in reverse, we need a few basic things: a start and end point, a point on the curve that want to be moving around, which has an associated ",React.createElement("em",null,"t")," value, and a point we've not explicitly talked about before, and as far as I know has no explicit name, but lives one iteration higher in the de Casteljau process then our on-curve point does. I like to call it \"A\" for reasons that will become obvious."),React.createElement("p",null,"So let's use graphics instead of text to see where this \"A\" is, because text only gets us so far: in the following graphic, click anywhere on the curves to see the identity information that we'll be using to run de Casteljau in reverse (you can manipulate the curve even after picking a point. Note the \"ratio\" value when you do so: does it change?):"),React.createElement("div",{className:"figure"},React.createElement(Graphic,{inline:true,preset:"abc",title:"Projections in a quadratic Bézier curve",setup:handler.setupQuadratic,draw:handler.draw,onClick:handler.onClick}),React.createElement(Graphic,{inline:true,preset:"abc",title:"Projections in a cubic Bézier curve",setup:handler.setupCubic,draw:handler.draw,onClick:handler.onClick})),React.createElement("p",null,"Clicking anywhere on the curves shows us three things:"),React.createElement("ol",null,React.createElement("li",null,"our on-curve point; let's call that ",React.createElement("b",null,"B"),","),React.createElement("li",null,"a point at the tip of B's \"hat\", on de Casteljau step up; let's call that ",React.createElement("b",null,"A"),", and"),React.createElement("li",null,"a point that we get by projecting B onto the start--end baseline; let's call that ",React.createElement("b",null,"C"),".")),React.createElement("p",null,"These three values ABC hide an important identity formula for quadratic and cubic Bézier curves: for any point on the curve with some ",React.createElement("em",null,"t")," value, the ratio distance of C along baseline is fixed: if some ",React.createElement("em",null,"t")," value sets up a C that is 20% away from the start and 80% away from the end, then it doesn't matter where the start, end, or control points are: for that ",React.createElement("em",null,"t")," value, C will ",React.createElement("em",null,"always")," lie at 20% from the start and 80% from the end point. Go ahead, pick an on-curve point in either graphic and then move all the other points around: if you only move the control points, start and end won't move, and so neither will C, and if you move either start or end point, C will move but its relative position will not change. The following function stays true:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/f48f095d9c37c079ff6a5f71b3047397aa7dfc6b.svg",width:"207.2",height:"16.799999999999997"}),React.createElement("p",null,"So that just leaves finding A."),React.createElement("div",{className:"note"},React.createElement("p",null,"While that relation is fixed, the function ",React.createElement("em",null,"u(t)")," differs depending on whether we're working with quadratic or cubic curves:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/cb35e42bf53bfc2b96f959e78256da01f8b91dbc.svg",width:"207.2",height:"91"}),React.createElement("p",null,"So, if we know the start and end coordinates, and we know the ",React.createElement("em",null,"t")," value, we know C:"),React.createElement("div",{className:"figure"},React.createElement(Graphic,{inline:true,preset:"abc",title:"Quadratic value of C for t",draw:handler.drawQCT,onMouseMove:handler.setCT}),React.createElement(Graphic,{inline:true,preset:"abc",title:"Cubic value of C for t",draw:handler.drawCCT,onMouseMove:handler.setCT})),React.createElement("p",null,"Mouse-over the graphs to see the expression for C, given the ",React.createElement("em",null,"t")," value at the mouse pointer.")),React.createElement("p",null,"There's also another important bit of information that is inherent to the ABC values: while the distances between A and B, and B and C, are dynamic (based on where we put B), the ",React.createElement("em",null,"ratio")," between the two distances is stable: given some ",React.createElement("em",null,"t")," value, the following always holds:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/6cb3e94fe9164128a25570a32abed15baa726f17.svg",width:"263.2",height:"40.599999999999994"}),React.createElement("p",null,"This leads to a pretty powerful bit of knowledge: merely by knowing the ",React.createElement("em",null,"t")," value of some on curve point, we know where C has to be (as per the above note), and because we know B and C, and thus have the distance between them, we know where A has to be:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/1dffb79b42799c95c899e689b074361f662ec807.svg",width:"228.2",height:"39.199999999999996"}),React.createElement("p",null,"And that's it, all values found."),React.createElement("div",{className:"note"},React.createElement("p",null,"Much like the ",React.createElement("em",null,"u(t)")," function in the above note, the ",React.createElement("em",null,"ratio(t)")," function depends on whether we're looking at quadratic or cubic curves. Their form is intrinsically related to the ",React.createElement("em",null,"u(t)")," function in that they both come rolling out of the same function evalution, explained over on ",React.createElement("a",{href:"http://mathoverflow.net/questions/122257/finding-the-formula-for-Bézier-curve-ratios-hull-point-point-baseline"},"MathOverflow")," by Boris Zbarsky and myself. The ratio functions are the \"s(t)\" functions from the answers there, while the \"u(t)\" functions have the same name both here and on MathOverflow."),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/7ef64890f95db9e48258edb46a3d52d5ed143155.svg",width:"257.59999999999997",height:"43.4"}),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/5f2bb71795c615637d632da70b722938cb103b03.svg",width:"233.79999999999998",height:"43.4"}),React.createElement("p",null,"Unfortunately, this trick only works for quadratic and cubic curves. Once we hit higher order curves, things become a lot less predictable; the \"fixed point ",React.createElement("em",null,"C"),"\" is no longer fixed, moving around as we move the control points, and projections of ",React.createElement("em",null,"B")," onto the line between start and end may actually lie on that line before the start, or after the end, and there are no simple ratios that we can exploit.")),React.createElement("p",null,"So: if we know B and its corresponding ",React.createElement("em",null,"t")," value, then we know all the ABC values, which —together with a start and end coordinate— gives us the necessary information to reconstruct a curve's \"de Casteljau skeleton\", which means that two points and a value between 0 and 1, we can come up with a curve. And that opens up possibilities: curve manipulation by dragging an on-curve point, curve fitting of \"a bunch of coordinates\", these are useful things, and we'll look at both in the next sections."));}},"moulding":{"locale":"en-GB","title":"Manipulating a curve","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"moulding",title:"Manipulating a curve",number:"27"}),React.createElement("p",null,"Armed with knowledge of the \"ABC\" relation, we can now update a curve interactively, by letting people click anywhere on the curve, find the ",React.createElement("em",null,"t"),"-value matching that coordinate, and then letting them drag that point around. With every drag update we'll have a new point \"B\", which we can combine with the fixed point \"C\" to find our new point A. Once we have those, we can reconstruct the de Casteljau skeleton and thus construct a new curve with the same start/end points as the original curve, passing through the user-selected point B, with correct new control points."),React.createElement(Graphic,{preset:"moulding",title:"Moulding a quadratic Bézier curve",setup:handler.setupQuadratic,draw:handler.drawMould,onClick:handler.placeMouldPoint,onMouseDown:handler.markQB,onMouseDrag:handler.dragQB,onMouseUp:handler.saveCurve}),React.createElement("p",null,React.createElement("strong",null,"Click-dragging the curve itself")," shows what we're using to compute the new coordinates: while dragging you will see the original points B and its corresponding ",React.createElement("i",null,"t"),"-value, the original point C for that ",React.createElement("i",null,"t"),"-value, as well as the new point B' based on the mouse cursor. Since we know the ",React.createElement("i",null,"t"),"-value for this configuration, we can compute the ABC ratio for this configuration, and we know that our new point A' should like at a distance:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/e361e1235c94bbe87e95834c7fcfb6ab96e028b9.svg",width:"226.79999999999998",height:"37.8"}),React.createElement("p",null,"For quadratic curves, this means we're done, since the new point A' is equivalent to the new quadratic control point. For cubic curves, we need to do a little more work:"),React.createElement(Graphic,{preset:"moulding",title:"Moulding a cubic Bézier curve",setup:handler.setupCubic,draw:handler.drawMould,onClick:handler.placeMouldPoint,onMouseDown:handler.markCB,onMouseDrag:handler.dragCB,onMouseUp:handler.saveCurve}),React.createElement("p",null,"To help understand what's going on, the cubic graphic shows the full de Casteljau construction \"hull\" when repositioning point B. We compute A` in exactly the same way as before, but we also record the final strut line that forms B in the original curve. Given A', B', and the endpoints e1 and e2 of the strut line relative to B', we can now compute where the new control points should be. Remember that B' lies on line e1--e2 at a distance ",React.createElement("i",null,"t"),", because that's how Bézier curves work. In the same manner, we know the distance A--e1 is only line-interval [0,t] of the full segment, and A--e2 is only line-interval [t,1], so constructing the new control points is fairly easy."),React.createElement("p",null,"First, we construct the one-level-of-de-Casteljau-up points:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/1833383a4800c495451abcacc2ada34e5601995d.svg",width:"140",height:"78.39999999999999"}),React.createElement("p",null,"And then we can compute the new control points:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/d53cad094fddaacbb047c9d7c465a5011e3bfbfd.svg",width:"163.79999999999998",height:"78.39999999999999"}),React.createElement("p",null,"And that's cubic curve manipulation."));}},"pointcurves":{"locale":"en-GB","title":"Creating a curve from three points","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"pointcurves",title:"Creating a curve from three points",number:"28"}),React.createElement("p",null,"Given the preceding section on curve manipulation, we can also generate quadratic and cubic curves from any three points. However, unlike circle-fitting, which requires just three points, Bézier curve fitting requires three points, as well as a ",React.createElement("em",null,"t")," value, so we can figure out where point 'C' needs to be."),React.createElement("p",null,"The following graphic lets you place three points, and will use the preceding sections on the ABC ratio and curve construction to form a quadratic curve through them. You can move the points you've placed around by click-dragging, or try a new curve by drawing new points with pure clicks. (There's some freedom here, so for illustrative purposes we clamped ",React.createElement("em",null,"t")," to simply be 0.5, lets us bypass some maths, since a ",React.createElement("em",null,"t")," value of 0.5 always puts C in the middle of the start--end line segment)"),React.createElement(Graphic,{preset:"generate",title:"Fitting a quadratic Bézier curve",setup:handler.setup,draw:handler.drawQuadratic,onClick:handler.onClick}),React.createElement("p",null,"For cubic curves we also need some values to construct the \"de Casteljau line through B\" with, and that gives us quite a bit of choice. Since we've clamped ",React.createElement("em",null,"t")," to 0.5, we'll set up a line through B parallel to the line start--end, with a length that is proportional to the length of the line B--C: the further away from the baseline B is, the wider its construction line will be, and so the more \"bulby\" the curve will look. This still gives us some freedom in terms of exactly how to scale the length of the construction line as we move B closer or further away from the baseline, so I simply picked some values that sort-of-kind-of look right in that if a circle through (start,B,end) forms a perfect hemisphere, the cubic curve constructed forms something close to a hemisphere, too, and if the points lie on a line, then the curve constructed has the control points very close to B, while still lying between B and the correct curve end point:"),React.createElement(Graphic,{preset:"generate",title:"Fitting a cubic Bézier curve",setup:handler.setup,draw:handler.drawCubic,onClick:handler.onClick}),React.createElement("p",null,"In each graphic, the blue parts are the values that we \"just have\" simply by setting up our three points, combined with our decision on which ",React.createElement("em",null,"t")," value to use (and construction line orientation and length for cubic curves). There are of course many ways to determine a combination of ",React.createElement("em",null,"t")," and tangent values that lead to a more \"æsthetic\" curve, but this will be left as an exercise to the reader, since there are many, and æsthetics are often quite personal."));}},"catmullconv":{"locale":"en-GB","title":"Bézier curves and Catmull-Rom curves","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"catmullconv",title:"Bézier curves and Catmull-Rom curves",number:"29"}),React.createElement("p",null,"Taking an excursion to different splines, the other common design curve is the ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Catmull.E2.80.93Rom_spline"},"Catmull-Rom spline"),". Now, a Catmull-Rom spline is a form of cubic Hermite spline, and as it so happens the cubic Bézier curve is also a cubic Hermite spline, so maybe... maybe we can convert one into the other, and back, with some simple substitutions?"),React.createElement("p",null,"Unlike Bézier curves, Catmull-Rom splines pass through each point used to define the curve, except the first and last, which makes sense if you read the \"natural language\" descriptionfor how a Catmull-Rom spline works: a Catmull-Rom spline is a curve that, at each point  P",React.createElement("sub",null,"x"),", has a tangent along the line P",React.createElement("sub",null,"x-1")," to P",React.createElement("sub",null,"x+1"),". The curve runs from points P",React.createElement("sub",null,"2")," to P",React.createElement("sub",null,"n-1"),", and has a \"tension\" that determines how fast the curve passes through each point. The lower the tension, the faster the curve  goes through each point, and the bigger its local tangent is."),React.createElement("p",null,"I'll be showing the conversion to and from Catmull-Rom curves for the tension that the Processing language uses for its Catmull-Rom algorithm."),React.createElement("p",null,"We start with showing the Catmull-Rom matrix form:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/5fc1c44e623f2a9fbeefdaa204557479e3debf5a.svg",width:"429.79999999999995",height:"78.39999999999999"}),React.createElement("p",null,"However, there's something funny going on here: the coordinate column matrix looks weird. The reason is that Catmull-Rom curves are actually curve segments that are described by two points, and two tangents; the curve leaves a point V1 (if we have four coordinates instead, this is coordinate 2), arriving at a point V2 (coordinate 3), with the curve departing V1 with a tangent vector V'1 (equal to the tangent from coordinate 1 to coordinate 3) and arriving at V2 with tangent vector V'2 (equal to the tangent from coordinate 2 to coordinate 4). So if we want to express this as a matrix form based on four coordinates, we get this representation instead:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/40b9ca9b5755a4be49517ddfa630fef7b8e23067.svg",width:"406",height:"86.8"}),React.createElement("div",{className:"note"},React.createElement("h2",{id:"where-did-that-2-come-from-"},"Where did that 2 come from?"),React.createElement("p",null,"Catmull-Rom splines are based on the concept of tension: the higher the tensions, the shorter the tangents at the departure and arrival points. The basic Catmull-Rom curve arrives and departs with tangents equal to half the distance between the two adjacent points, so that's where that 2 came from."),React.createElement("p",null,"However, the \"real\" matrix is this:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/7bf9b5e971866babedd991ccdde5c4ab104297e5.svg",width:"351.4",height:"88.19999999999999"}),React.createElement("p",null,"This bakes in the tension factor τ explicitly.")),React.createElement("p",null,"Plugging this into the \"two coordinates and two tangent vectors\" matrix form, we get:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/4818f8797c35f23c2b9883aa986b1129b2fa151a.svg",width:"299.59999999999997",height:"78.39999999999999"}),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/08f77989369f664cbc0fb7526791efd4c5299d70.svg",width:"499.79999999999995",height:"77"}),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/c7ae769c5370469b16523bab6f34abf0dd6749be.svg",width:"414.4",height:"77"}),React.createElement("p",null,"So let's find out which transformation matrix we need in order to convert from Catmull-Rom to Bézier:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/7250f1c57e2bd66ec4349e4e88db4d5d74401a06.svg",width:"730.8",height:"77"}),React.createElement("p",null,"The difference is somewhere in the actual hermite matrix, since the ",React.createElement("em",null,"t")," and coordinate values are identical, so let's solve that matrix equasion:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/8a42b24fca3aaf6b8ec08e84b7e91c43e26e8acf.svg",width:"418.59999999999997",height:"75.6"}),React.createElement("p",null,"We left-multiply both sides by the inverse of the Bézier matrix, to get rid of the Bézier matrix on the right side of the equals sign:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/0e111d6e846f4d7204dec484005f74993e66c6c9.svg",width:"841.4",height:"84"}),React.createElement("p",null,"Which gives us:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/f94b80113772d90a4fbc93d4495cb5767e5c8123.svg",width:"183.39999999999998",height:"75.6"}),React.createElement("p",null,"Multiplying this ",React.createElement("strong",null,React.createElement("em",null,"A"))," with our coordinates will give us a proper Bézier matrix expression again:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/d088274e440ceeac2916a0f32176682d776c1c57.svg",width:"448",height:"77"}),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/9e68f80b270d3445d9f9cb28ff2c5aed219aa9d2.svg",width:"365.4",height:"85.39999999999999"}),React.createElement("p",null,"So a Catmull-Rom to Bézier conversion, based on coordinates, requires turning the Catmull-Rom coordinates on the left into the Bézier coordinates on the right (with τ being our tension factor):"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/92a34d777899da97f1907e6b093db28872f02c3a.svg",width:"261.8",height:"89.6"}),React.createElement("p",null,"And the other way around, a Bézier to Catmull-Rom conversion requires turning the Bézier coordinates on the left this time into the Catmull-Rom coordinates on the right. Note that there is no tension this time, because Bézier curves don't have any. Converting from Bézier to Catmull-Rom is simply a default-tension Catmull-Rom curve:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/ee3d3d219a18596dc403c0392d44bc585d738e6c.svg",width:"309.4",height:"81.19999999999999"}),React.createElement("p",null,"Done. We can now draw the curves we want using either Bézier curves or Catmull-Rom splines, the choice mostly being which drawing algorithms we have natively available."));}},"catmullmoulding":{"locale":"en-GB","title":"Creating a Catmull-Rom curve from three points","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"catmullmoulding",title:"Creating a Catmull-Rom curve from three points",number:"30"}),React.createElement("p",null,"Now, we saw how to fit a Bézier curve to three points, but if Catmull-Rom curves go through points, why can't we just use those to do curve fitting, instead?"),React.createElement("p",null,"As a matter of fact, we can, but there's a difference between the kind of curve fitting we did in the previous section, and the kind of curve fitting that we can do with Catmull-Rom curves. In the previous section we came up with a single curve that goes through three points. There was a decent amount of maths and computation involved, and the end result was three or four coordinates that described a single curve, depending on whether we were fitting a quadratic or cubic curve."),React.createElement("p",null,"Using Catmull-Rom curves, we need virtually no computation, but even though we end up with one Catmull-Rom curve of ",React.createElement("i",null,"n")," points, in order to draw the equivalent curve using cubic Bézier curves we need a massive ",React.createElement("i",null,"3n-2")," points (and that's without double-counting points that are shared by consecutive cubic curves)."),React.createElement("p",null,"In the following graphic, on the left we see three points that we want to draw a Catmull-Rom curve through (which we can move around freely, by the way), with in the second panel some of the \"interesting\" Catmull-Rom information: in black there's the baseline start--end, which will act as tangent orientation for the curve at point p2. We also see a virtual point p0 and p4, which are initially just point p2 reflected over the baseline. However, by using the up and down cursor key we can offset these points parallel to the baseline. Why would we want to do this? Because the line p0--p2 acts as departure tangent at p1, and the line p2--p4 acts as arrival tangent at p3. Play around with the graphic a bit to get an idea of what all of that meant:"),React.createElement(Graphic,{preset:"threepanel",title:"Catmull-Rom curve fitting",setup:handler.setup,draw:handler.draw,onKeyDown:handler.props.onKeyDown}),React.createElement("p",null,"As should be obvious by now, Catmull-Rom curves are great for \"fitting a curvature to some points\", but if we want to convert that curve to Bézier form we're going to end up with a lot of separate (but visually joined) Bézier curves. Depending on what we want to do, that'll be either unnecessary work, or exactly what we want: which it is depends entirely on you."));}},"polybezier":{"locale":"en-GB","title":"Forming poly-Bézier curves","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"polybezier",title:"Forming poly-Bézier curves",number:"31"}),React.createElement("p",null,"Much like lines can be chained together to form polygons, Bézier curves can be chained together to form poly-Béziers, and the only trick required is to make sure that:"),React.createElement("ol",null,React.createElement("li",null,"the end point of each section is the starting point of the following section, and"),React.createElement("li",null,"the derivatives across that dual point line up.")),React.createElement("p",null,"Unless, of course, you want discontinuities; then you don't even need 2."),React.createElement("p",null,"We'll cover three forms of poly-Bézier curves in this section. First, we'll look at the kind that just follows point 1. where the end point of a segment is the same point as the start point of the next segment. This leads to poly-Béziers that are pretty hard to work with, but they're the easiest to implement:"),React.createElement(Graphic,{preset:"poly",title:"Unlinked quadratic poly-Bézier",setup:handler.setupQuadratic,draw:handler.draw}),React.createElement(Graphic,{preset:"poly",title:"Unlinked cubic poly-Bézier",setup:handler.setupCubic,draw:handler.draw}),React.createElement("p",null,"Dragging the control points around only affects the curve segments that the control point belongs to, and moving an on-curve point leaves the control points where they are, which is not the most useful for practical modelling purposes. So, let's add in the logic we need to make things a little better. We'll start by linking up control points by ensuring that the \"incoming\" derivative at an on-curve point is the same as it's \"outgoing\" derivative:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/37740bb1a0b7b1ff48bf3454e52295fc717cacbb.svg",width:"130.2",height:"18.2"}),React.createElement("p",null,"We can effect this quite easily, because we know that the vector from a curve's last control point to its last on-curve point is equal to the derivative vector. If we want to ensure that the first control point of the next curve matches that, all we have to do is mirror that last control point through the last on-curve point. And mirroring any point A through any point B is really simple:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/ce6e3939608c4ed0598107b06543c2301b91bb7f.svg",width:"319.2",height:"42"}),React.createElement("p",null,"So let's implement that and see what it gets us. The following two graphics show a quadratic and a cubic poly-Bézier curve again, but this time moving the control points around moves others, too. However, you might see something unexpected going on for quadratic curves..."),React.createElement(Graphic,{preset:"poly",title:"Loosely connected quadratic poly-Bézier",setup:handler.setupQuadratic,draw:handler.draw,onMouseMove:handler.linkDerivatives}),React.createElement(Graphic,{preset:"poly",title:"Loosely connected cubic poly-Bézier",setup:handler.setupCubic,draw:handler.draw,onMouseMove:handler.linkDerivatives}),React.createElement("p",null,"As you can see, quadratic curves are particularly ill-suited for poly-Bézier curves, as all the control points are effectively linked. Move one of them, and you move all of them. Not only that, but if we move the on-curve points, it's possible to get a situation where a control point's positions is different depending on whether it's the reflection of its left or right neighbouring control point: we can't even form a proper rule-conforming curve! This means that we cannot use quadratic poly-Béziers for anything other than really, really simple shapes. And even then, they're probably the wrong choice. Cubic curves are pretty decent, but the fact that the derivatives are linked means we can't manipulate curves as well as we might if we relaxed the constraints a little."),React.createElement("p",null,"So: let's relax the requirement a little."),React.createElement("p",null,"We can change the constraint so that we still preserve the ",React.createElement("em",null,"angle")," of the derivatives across sections (so transitions from one section to the next will still look natural), but give up the requirement that they should also have the same ",React.createElement("em",null,"vector length"),". Doing so will give us a much more useful kind of poly-Bézier curve:"),React.createElement(Graphic,{preset:"poly",title:"Loosely connected quadratic poly-Bézier",setup:handler.setupQuadratic,draw:handler.draw,onMouseMove:handler.linkDirection}),React.createElement(Graphic,{preset:"poly",title:"Loosely connected cubic poly-Bézier",setup:handler.setupCubic,draw:handler.draw,onMouseMove:handler.linkDirection}),React.createElement("p",null,"Cubic curves are now better behaved when it comes to dragging control points around, but the quadratic poly-Bézier still has the problem that moving one control points will move the control points and may ending up defining \"the next\" control point in a way that doesn't work. Quadratic curves really aren't very useful to work with..."),React.createElement("p",null,"Finally, we also want to make sure that moving the on-curve coordinates preserves the relative positions of the associated control points. With that, we get to the kind of curve control that you might be familiar with from applications like Photoshop, Inkscape, Blender, etc."),React.createElement(Graphic,{preset:"poly",title:"Loosely connected quadratic poly-Bézier",setup:handler.setupQuadratic,draw:handler.draw,onMouseDown:handler.bufferPoints,onMouseMove:handler.modelCurve}),React.createElement(Graphic,{preset:"poly",title:"Loosely connected cubic poly-Bézier",setup:handler.setupCubic,draw:handler.draw,onMouseDown:handler.bufferPoints,onMouseMove:handler.modelCurve}),React.createElement("p",null,"Again, we see that cubic curves are now rather nice to work with, but quadratic curves have a new, very serious problem: we can move an on-curve point in such a way that we can't compute what needs to \"happen next\". Move the top point down, below the left and right points, for instance. There is no way to preserve correct control points without a kink at the bottom point. Quadratic curves: just not that good..."),React.createElement("p",null,"A final improvement is to offer fine-level control over which points behave which, so that you can have \"kinks\" or individually controlled segments when you need them, with nicely well-behaved curves for the rest of the path. Implementing that, is left as an excercise for the reader."));}},"shapes":{"locale":"en-GB","title":"Boolean shape operations","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"shapes",title:"Boolean shape operations",number:"32"}),React.createElement("p",null,"We can apply the topics covered so far in this primer to effect boolean shape operations: getting the union, intersection, or exclusion, between two or more shapes that involve Bézier curves. For simplicity (well.. sort of, more homogeneity), we'll be looking at Poly-Bézier shapes only, but a shape that consists of a mix of lines and Bézier curves is technically a simplification (although it does mean we need to write a definition for the class of shapes that mix lines and Bézier curves. Since poly-Bézier curves are a superset, we'll be using those in the following examples)"),React.createElement("p",null,"The procedure for performing boolean operations consists, broadly, of four steps:"),React.createElement("ol",null,React.createElement("li",null,"Find the intersection points between both shapes,"),React.createElement("li",null,"cut up the shapes into multiple sections between these intersections,"),React.createElement("li",null,"discard any section that isn't part of the desired operation's resultant shape, and"),React.createElement("li",null,"link up the remaining sections to form the new shape.")),React.createElement("p",null,"Finding all intersections between two poly-Bézier curves, or any poly-line-section shape, is similar to the iterative algorithm discussed in the section on curve/curve intersection. For each segment in the poly-Bézier curve we check whether its bounding box overlaps with any of the segment bounding boxes in the other poly-Bézier curve. If so, we run normal intersection detection."),React.createElement("p",null,"After we found all intersection points, we split up our poly-Bézier curves, making sure to record which of the newly formed poly-Bézier curves might potentially link up at the points we split the originals up at. This will let us quickly glue poly-Bézier curves back together after the next step."),React.createElement("p",null,"Once we have all the new poly-Bézier curves, we run the first step of the desired boolean operation."),React.createElement("ul",null,React.createElement("li",null,"Union: discard all poly-Bézier curves that lie \"inside\" our union of our shapes. E.g. if we want the union of two overlapping circles, the resulting shape is the outline."),React.createElement("li",null,"Intersection: discard all poly-Bézier curves that lie \"outside\" the intersection of the two shapes. E.g. if we want the intersection of two overlapping circles, the resulting shape is the tapered ellipse where they overlap."),React.createElement("li",null,"Exclusion: none of the sections are discarded, but we will need to link the shapes back up in a special way. Flip any section that would qualify for removal under UNION rules.")),React.createElement("table",{className:"sketch"},React.createElement("tbody",null,React.createElement("tr",null,React.createElement("td",{className:"labeled-image"},React.createElement("img",{src:"images/op_base.gif",height:"169"}),"Two overlapping shapes."),React.createElement("td",{className:"labeled-image"},React.createElement("img",{src:"images/op_union.gif",height:"169"}),"The unified region."),React.createElement("td",{className:"labeled-image"},React.createElement("img",{src:"images/op_intersection.gif",height:"169"}),"Their intersection."),React.createElement("td",{className:"labeled-image"},React.createElement("img",{src:"images/op_exclusion.gif",height:"169"}),"Their exclusion regions.")))),React.createElement("p",null,"The main complication in the outlined procedure here is determining how sections qualify in terms of being \"inside\" and \"outside\" of our shapes. For this, we need to be able to perform point-in-shape detection, for which we'll use a classic algorithm: getting the \"crossing number\" by using ray casting, and then testing for \"insidedness\" by applying the ",React.createElement("a",{href:"http://folk.uio.no/bjornw/doc/bifrost-ref/bifrost-ref-12.html"},"even-odd rule"),": For any point and any shape, we can cast a ray from our point, to some point that we know lies outside of the shape (such as a corner of our drawing surface). We then count how many times that line crosses our shape (remember that we can perform line/curve intersection detection quite easily). If the number of times it crosses the shape's outline is even, the point did not actually lie inside our shape. If the number of intersections is odd, our point did lie inside out shape. With that knowledge, we can decide whether to treat a section that such a point lies on \"needs removal\" (under union rules), \"needs preserving\" (under intersection rules), or \"needs flipping\" (under exclusion rules)."),React.createElement("p",null,"These operations are expensive, and implementing your own code for this is generally a bad idea if there is already a geometry package available for your language of choice. In this case, for JavaScript the most excellent ",React.createElement("a",{href:"http://paperjs.org"},"Paper.js")," already comes with all the code in place to perform efficient boolean shape operations, so rather that implement an inferior version here, I can strongly recommend the Paper.js library if you intend to do any boolean shape work."),React.createElement("p",null,"The following graphic shows Paper.js doing its thing for two shapes: one static, and one that is linked to your mouse pointer. If you move the mouse around, you'll see how the shape intersections are resolved. The base shapes are outlined in blue, and the boolean result is coloured red."),React.createElement(Graphic,{preset:"simple",title:"Boolean shape operations with Paper.js",paperjs:true,setup:handler.setup,draw:handler.draw,onMouseMove:handler.onMouseMove},React.createElement("br",null),handler.modes.map(function(mode){var className=handler.state.mode===mode?"selected":null;return React.createElement("button",{className:className,key:mode,onClick:function onClick(){return handler.setMode(mode);}},mode);})));}},"projections":{"locale":"en-GB","title":"Projecting a point onto a Bézier curve","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"projections",title:"Projecting a point onto a Bézier curve",number:"33"}),React.createElement("p",null,"Say we have a Bézier curve and some point, not on the curve, of which we want to know which ",React.createElement("code",null,"t")," value on the curve gives us an on-curve point closest to our off-curve point. Or: say we want to find the projection of a random point onto a curve. How do we do that?"),React.createElement("p",null,"If the Bézier curve is of low enough order, we might be able to ",React.createElement("a",{href:"http://jazzros.blogspot.ca/2011/03/projecting-point-on-bezier-curve.html"},"work out the maths for how to do this"),", and get a perfect ",React.createElement("code",null,"t")," value back, but in general this is an incredibly hard problem and the easiest solution is, really, a numerical approach again. We'll be finding our ideal ",React.createElement("code",null,"t")," value using a ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/Binary_search_algorithm"},"binary search"),". First, we do a coarse distance-check based on ",React.createElement("code",null,"t")," values associated with the curve's \"to draw\" coordinates (using a lookup table, or LUT). This is pretty fast. Then we run this algorithm:"),React.createElement("ol",null,React.createElement("li",null,"with the ",React.createElement("code",null,"t")," value we found, start with some small interval around ",React.createElement("code",null,"t")," (1/length_of_LUT on either side is a reasonable start),"),React.createElement("li",null,"if the distance to ",React.createElement("code",null,"t ± interval/2")," is larger than the distance to ",React.createElement("code",null,"t"),", try again with the interval reduced to half its original length."),React.createElement("li",null,"if the distance to ",React.createElement("code",null,"t ± interval/2")," is smaller than the distance to ",React.createElement("code",null,"t"),", replace ",React.createElement("code",null,"t")," with the smaller-distance value."),React.createElement("li",null,"after reducing the interval, or changing ",React.createElement("code",null,"t"),", go back to step 1.")),React.createElement("p",null,"We keep repeating this process until the interval is small enough to claim the difference in precision found is irrelevant for the purpose we're trying to find ",React.createElement("code",null,"t")," for. In this case, I'm arbitrarily fixing it at 0.0001."),React.createElement("p",null,"The following graphic demonstrates the result of this procedure.Simply move the cursor around, and if it does not lie on top of the curve, you will see a line that projects the cursor onto the curve based on an iteratively found \"ideal\" ",React.createElement("code",null,"t")," value."),React.createElement(Graphic,{preset:"simple",title:"Projecting a point onto a Bézier curve",setup:handler.setup,draw:handler.draw,onMouseMove:handler.onMouseMove}));}},"offsetting":{"locale":"en-GB","title":"Curve offsetting","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"offsetting",title:"Curve offsetting",number:"34"}),React.createElement("p",null,"Perhaps you are like me, and you've been writing various small programs that use Bézier curves in some way or another, and at some point you make the step to implementing path extrusion. But you don't want to do it pixel based, you want to stay in the vector world. You find that extruding lines is relatively easy, and tracing outlines is coming along nicely (although junction caps and fillets are a bit of a hassle), and then decide to do things properly and add Bézier curves to the mix. Now you have a problem."),React.createElement("p",null,"Unlike lines, you can't simply extrude a Bézier curve by taking a copy and moving it around, because of the curvatures; rather than a uniform thickness you get an extrusion that looks too thin in places, if you're lucky, but more likely will self-intersect. The trick, then, is to scale the curve, rather than simply copying it. But how do you scale a Bézier curve?"),React.createElement("p",null,"Bottom line: ",React.createElement("strong",null,"you can't"),". So you cheat. We're not going to do true curve scaling, or rather curve offsetting, because that's impossible. Instead we're going to try to generate 'looks good enough' offset curves."),React.createElement("div",{className:"note"},React.createElement("h3",{id:"-what-do-you-mean-you-can-t-prove-it-"},"\"What do you mean, you can't. Prove it.\""),React.createElement("p",null,"First off, when I say \"you can't\" what I really mean is \"you can't offset a Bézier curve with another Bézier curve\". not even by using a really high order curve. You can find the function that describes the offset curve, but it won't be a polynomial, and as such it cannot be represented as a Bézier curve, which ",React.createElement("strong",null,"has")," to be a polynomial. Let's look at why this is:"),React.createElement("p",null,"From a mathematical point of view, an offset curve ",React.createElement("code",null,"O(t)")," is a curve such that, given our original curve ",React.createElement("code",null,"B(t)"),", any point on ",React.createElement("code",null,"O(t)")," is a fixed distance ",React.createElement("code",null,"d")," away from coordinate ",React.createElement("code",null,"B(t)"),". So let's math that:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/3aff5cef0028337bbb48ae64ad30000c4d5e238f.svg",width:"113.39999999999999",height:"16.799999999999997"}),React.createElement("p",null,"However, we're working in 2D, and ",React.createElement("code",null,"d")," is a single value, so we want to turn it into a vector. If we want a point distance ",React.createElement("code",null,"d")," \"away\" from the curve ",React.createElement("code",null,"B(t)")," then what we really mean is that we want a point at ",React.createElement("code",null,"d")," times the \"normal vector\" from point ",React.createElement("code",null,"B(t)"),", where the \"normal\" is a vector that runs perpendicular (\"at a right angle\") to the tangent at ",React.createElement("code",null,"B(t)"),". Easy enough:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/2cf48e2f8525258a3fa0fe4f10ec2acef67104b3.svg",width:"158.2",height:"16.799999999999997"}),React.createElement("p",null,"Now this still isn't very useful unless we know what the formula for ",React.createElement("code",null,"N(t)")," is, so let's find out. ",React.createElement("code",null,"N(t)")," runs perpendicular to the original curve tangent, and we know that the tangent is simply ",React.createElement("code",null,"B'(t)"),", so we could just rotate that 90 degrees and be done with it. However, we need to ensure that ",React.createElement("code",null,"N(t)")," has the same magnitude for every ",React.createElement("code",null,"t"),", or the offset curve won't be at a uniform distance, thus not being an offset curve at all. The easiest way to guarantee this is to make sure ",React.createElement("code",null,"N(t)")," always has length 1, which we can achieve by dividing ",React.createElement("code",null,"B'(t)")," by its magnitude:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/4941ecbff4c50732ba66fec53307456fc605f032.svg",width:"125.99999999999999",height:"42"}),React.createElement("p",null,"Determining the length requires computing an arc length, and this is where things get Tricky with a capital T. First off, to compute arc length from some start ",React.createElement("code",null,"a")," to end ",React.createElement("code",null,"b"),", we must use the formula we saw earlier. Noting that \"length\" is usually denoted with double vertical bars:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/f6d8c2965b02363e092acb00bbc1398cfbb170a4.svg",width:"177.79999999999998",height:"37.8"}),React.createElement("p",null,"So if we want the length of the tangent, we plug in ",React.createElement("code",null,"B'(t)"),", with ",React.createElement("code",null,"t = 0")," as start and",React.createElement("code",null,"t = 1")," as end:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/1f024282044316a9e4b3de2c855d2ceb96aff056.svg",width:"219.79999999999998",height:"37.8"}),React.createElement("p",null,"And that's where things go wrong. It doesn't even really matter what the second derivative for ",React.createElement("code",null,"B(t)")," is, that square root is screwing everything up, because it turns our nice polynomials into things that are no longer polynomials."),React.createElement("p",null,"There is a small class of polynomials where the square root is also a polynomial, but they're utterly useless to us: any polynomial with unweighted binomial coefficients has a square root that is also a polynomial. Now, you might think that Bézier curves are just fine because they do, but they don't; remember that only the ",React.createElement("strong",null,"base")," function has binomial coefficients. That's before we factor in our coordinates, which turn it into a non-binomial polygon. The only way to make sure the functions stay binomial is to make all our coordinates have the same value. And that's not a curve, that's a point. We can already create offset curves for points, we call them circles, and they have much simpler functions than Bézier curves."),React.createElement("p",null,"So, since the tangent length isn't a polynomial, the normalised tangent won't be a polynomial either, which means ",React.createElement("code",null,"N(t)")," won't be a polynomial, which means that ",React.createElement("code",null,"d")," times ",React.createElement("code",null,"N(t)")," won't be a polynomial, which means that, ultimately, ",React.createElement("code",null,"O(t)")," won't be a polynomial, which means that even if we can determine the function for ",React.createElement("code",null,"O(t)")," just fine (and that's far from trivial!), it simply cannot be represented as a Bézier curve."),React.createElement("p",null,"And that's one reason why Bézier curves are tricky: there are actually a ",React.createElement("code",null,"lot")," of curves that cannot be represent as a Bézier curve at all. They can't even model their own offset curves. They're weird that way. So how do all those other programs do it? Well, much like we're about to do, they cheat. We're going to approximate an offset curve in a way that will look relatively close to what the real offset curve would look like, if we could compute it.")),React.createElement("p",null,"So, you cannot offset a Bézier curve perfectly with another Bézier curve, no matter how high-order you make that other Bézier curve. However, we can chop up a curve into \"safe\" sub-curves (where safe means that all the control points are always on a single side of the baseline, and the midpoint of the curve at ",React.createElement("code",null,"t=0.5")," is roughly in the centre of the polygon defined by the curve coordinates) and then point-scale each sub-curve with respect to its scaling origin (which is the intersection of the point normals at the start and end points)."),React.createElement("p",null,"A good way to do this reduction is to first find the curve's extreme points, as explained in the earlier section on curve extremities, and use these as initial splitting points. After this initial split, we can check each individual segment to see if it's \"safe enough\" based on where the center of the curve is. If the on-curve point for ",React.createElement("code",null,"t=0.5")," is too far off from the center, we simply split the segment down the middle. Generally this is more than enough to end up with safe segments."),React.createElement("p",null,"The following graphics show off curve offsetting, and you can use your up and down arrow keys to control the distance at which the curve gets offset. The curve first gets reduced to safe segments, each of which is then offset at the desired distance. Especially for simple curves, particularly easily set up for quadratic curves, no reduction is necessary, but the more twisty the curve gets, the more the curve needs to be reduced in order to get segments that can safely be scaled."),React.createElement(Graphic,{preset:"simple",title:"Offsetting a quadratic Bézier curve",setup:handler.setupQuadratic,draw:handler.draw,onKeyDown:handler.props.onKeyDown}),React.createElement(Graphic,{preset:"simple",title:"Offsetting a cubic Bézier curve",setup:handler.setupCubic,draw:handler.draw,onKeyDown:handler.props.onKeyDown}),React.createElement("p",null,"You may notice that this may still lead to small 'jumps' in the sub-curves when moving the curve around. This is caused by the fact that we're still performing a naive form of offsetting, moving the control points the same distance as the start and end points. If the curve is large enough, this may still lead to incorrect offsets."));}},"graduatedoffset":{"locale":"en-GB","title":"Graduated curve offsetting","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"graduatedoffset",title:"Graduated curve offsetting",number:"35"}),React.createElement("p",null,"What if we want to do graduated offsetting, starting at some distance ",React.createElement("code",null,"s")," but ending at some other distance ",React.createElement("code",null,"e"),"? well, if we can compute the length of a curve (which we can if we use the Legendre-Gauss quadrature approach) then we can also determine how far \"along the line\" any point on the curve is. With that knowledge, we can offset a curve so that its offset curve is not uniformly wide, but graduated between with two different offset widths at the start and end."),React.createElement("p",null,"Like normal offsetting we cut up our curve in sub-curves, and then check at which distance along the original curve each sub-curve starts and ends, as well as to which point on the curve each of the control points map. This gives us the distance-along-the-curve for each interesting point in the sub-curve. If we call the total length of all sub-curves seen prior to seeing \"the current\" sub-curve ",React.createElement("code",null,"S")," (and if the current sub-curve is the first one, ",React.createElement("code",null,"S")," is zero), and we call the full length of our original curve ",React.createElement("code",null,"L"),", then we get the following graduation values:"),React.createElement("ul",null,React.createElement("li",null,"start: map ",React.createElement("code",null,"S")," from interval (",React.createElement("code",null,"0,L"),") to interval ",React.createElement("code",null,"(s,e)")),React.createElement("li",null,"c1: ",React.createElement("code",null,"map(<strong>S+d1</strong>, 0,L, s,e)"),", d1 = distance along curve to projection of c1"),React.createElement("li",null,"c2: ",React.createElement("code",null,"map(<strong>S+d2</strong>, 0,L, s,e)"),", d2 = distance along curve to projection of c2"),React.createElement("li",null,"..."),React.createElement("li",null,"end: ",React.createElement("code",null,"map(<strong>S+length(subcurve)</strong>, 0,L, s,e)"))),React.createElement("p",null,"At each of the relevant points (start, end, and the projections of the control points onto the curve) we know the curve's normal, so offsetting is simply a matter of taking our original point, and moving it along the normal vector by the offset distance for each point. Doing so will give us the following result (these have with a starting width of 0, and an end width of 40 pixels, but can be controlled with your up and down arrow keys):"),React.createElement(Graphic,{preset:"simple",title:"Offsetting a quadratic Bézier curve",setup:handler.setupQuadratic,draw:handler.draw,onKeyDown:handler.props.onKeyDown}),React.createElement(Graphic,{preset:"simple",title:"Offsetting a cubic Bézier curve",setup:handler.setupCubic,draw:handler.draw,onKeyDown:handler.props.onKeyDown}));}},"circles":{"locale":"en-GB","title":"Circles and quadratic Bézier curves","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"circles",title:"Circles and quadratic Bézier curves",number:"36"}),React.createElement("p",null,"Circles and Bézier curves are very different beasts, and circles are infinitely easier to work with than Bézier curves. Their formula is much simpler, and they can be drawn more efficiently. But, sometimes you don't have the luxury of using circles, or ellipses, or arcs. Sometimes, all you have are Bézier curves. For instance, if you're doing font design, fonts have no concept of geometric shapes, they only know straight lines, and Bézier curves. OpenType fonts with TrueType outlines only know quadratic Bézier curves, and OpenType fonts with Type 2 outlines only know cubic Bézier curves. So how do you draw a circle, or an ellipse, or an arc?"),React.createElement("p",null,"You approximate."),React.createElement("p",null,"We already know that Bézier curves cannot model all curves that we can think of, and this includes perfect circles, as well as ellipses, and their arc counterparts. However, we can certainly approximate them to a degree that is visually acceptable. Quadratic and cubic curves offer us different curvature control, so in order to approximate a circle we will first need to figure out what the error is if we try to approximate arcs of increasing degree with quadratic and cubic curves, and where the coordinates even lie."),React.createElement("p",null,"Since arcs are mid-point-symmetrical, we need the control points to set up a symmetrical curve. For quadratic curves this means that the control point will be somewhere on a line that intersects the baseline at a right angle. And we don't get any choice on where that will be, since the derivatives at the start and end point have to line up, so our control point will lie at the intersection of the tangents at the start and end point."),React.createElement("p",null,"First, let's try to fit the quadratic curve onto a circular arc. In the following sketch you can move the mouse around over a unit circle, to see how well, or poorly, a quadratic curve can approximate the arc from (1,0) to where your mouse cursor is:"),React.createElement(Graphic,{preset:"arcfitting",title:"Quadratic Bézier arc approximation",setup:handler.setup,draw:handler.draw,onMouseMove:handler.onMouseMove}),React.createElement("p",null,"As you can see, things go horribly wrong quite quickly; even trying to approximate a quarter circle using a quadratic curve is a bad idea. An eighth of a turns might look okay, but how okay is okay? Let's apply some maths and find out. What we're interested in is how far off our on-curve coordinates are with respect to a circular arc, given a specific start and end angle. We'll be looking at how much space there is between the circular arc, and the quadratic curve's midpoint."),React.createElement("p",null,"We start out with our start and end point, and for convenience we will place them on a unit circle (a circle around 0,0 with radius 1), at some angle ",React.createElement("em",null,"φ"),":"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/ef34ab8f466ed3294895135a346b55ada05d779d.svg",width:"183.39999999999998",height:"42"}),React.createElement("p",null,"What we want to find is the intersection of the tangents, so we want a point C such that:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/5660e8512b07dbac7fcf04633de8002fa25aa962.svg",width:"298.2",height:"42"}),React.createElement("p",null,"i.e. we want a point that lies on the vertical line through S (at some distance ",React.createElement("em",null,"a")," from S) and also lies on the tangent line through E (at some distance ",React.createElement("em",null,"b")," from E). Solving this gives us:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/d16e7a1c1e9686e1afb82f4ffcec07078d264565.svg",width:"229.6",height:"42"}),React.createElement("p",null,"First we solve for ",React.createElement("em",null,"b"),":"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/3128b31a874166ebe4479d3002d70f280de375a1.svg",width:"588",height:"18.2"}),React.createElement("p",null,"which yields:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/02b158f9ef2191b970dc2fe69c0903eba2b1f8b5.svg",width:"106.39999999999999",height:"40.599999999999994"}),React.createElement("p",null,"which we can then substitute in the expression for ",React.createElement("em",null,"a"),":"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/3bd9c2d6740ff530aabcbe60252742032af816e9.svg",width:"242.2",height:"204.39999999999998"}),React.createElement("p",null,"A quick check shows that plugging these values for ",React.createElement("em",null,"a")," and ",React.createElement("em",null,"b")," into the expressions for C",React.createElement("sub",null,"x")," and C",React.createElement("sub",null,"y")," give the same x/y coordinates for both \"",React.createElement("em",null,"a")," away from A\" and \"",React.createElement("em",null,"b")," away from B\", so let's continue: now that we know the coordinate values for C, we know where our on-curve point T for ",React.createElement("em",null,"t=0.5")," (or angle φ/2) is, because we can just evaluate the Bézier polynomial, and we know where the circle arc's actual point P is for angle φ/2:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/0b80423188012451e0400f473c19729eb2bad654.svg",width:"197.39999999999998",height:"33.599999999999994"}),React.createElement("p",null,"We compute T, observing that if ",React.createElement("em",null,"t=0.5"),", the polynomial values (1-t)², 2(1-t)t, and t² are 0.25, 0.5, and 0.25 respectively:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/bc50559ff8bd9062694a449aae5f6f85f91de909.svg",width:"264.59999999999997",height:"36.4"}),React.createElement("p",null,"Which, worked out for the x and y components, gives:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/c7fca7664a3acb855eeaaf412aa2331202f41097.svg",width:"428.4",height:"81.19999999999999"}),React.createElement("p",null,"And the distance between these two is the standard Euclidean distance:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/3251cd91a1cffc27a1695ece4c13cc651d7007fb.svg",width:"418.59999999999997",height:"161"}),React.createElement("p",null,"So, what does this distance function look like when we plot it for a number of ranges for the angle φ, such as a half circle, quarter circle and eighth circle?"),React.createElement("table",null,React.createElement("tbody",null,React.createElement("tr",null,React.createElement("td",null,React.createElement("img",{src:"images/arc-q-pi.gif",height:"190"}),"plotted for 0 ≤ φ ≤ π:"),React.createElement("td",null,React.createElement("img",{src:"images/arc-q-pi2.gif",height:"187"}),"plotted for 0 ≤ φ ≤ ½π:"),React.createElement("td",null,handler.props.showhref?"http://www.wolframalpha.com/input/?i=plot+sqrt%28%281%2F4+*+%28sin%28x%29+%2B+2tan%28x%2F2%29%29+-+sin%28x%2F2%29%29%5E2+%2B+%282sin%5E4%28x%2F4%29%29%5E2%29+for+0+%3C%3D+x+%3C%3D+pi%2F4":null,React.createElement("img",{src:"images/arc-q-pi4.gif",height:"174"}),"plotted for 0 ≤ φ ≤ ¼π:")))),React.createElement("p",null,"We now see why the eighth circle arc looks decent, but the quarter circle arc doesn't: an error of roughly 0.06 at ",React.createElement("em",null,"t=0.5")," means we're 6% off the mark... we will already be off by one pixel on a circle with pixel radius 17. Any decent sized quarter circle arc, say with radius 100px, will be way off if approximated by a quadratic curve! For the eighth circle arc, however, the error is only roughly 0.003, or 0.3%, which explains why it looks so close to the actual eighth circle arc. In fact, if we want a truly tiny error, like 0.001, we'll have to contend with an angle of (rounded) 0.593667, which equates to roughly 34 degrees. We'd need 11 quadratic curves to form a full circle with that precision! (technically, 10 and ten seventeenth, but we can't do partial curves, so we have to round up). That's a whole lot of curves just to get a shape that can be drawn using a simple function!"),React.createElement("p",null,"In fact, let's flip the function around, so that if we plug in the precision error, labelled ε, we get back the maximum angle for that precision:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/61a938fa10b77e8c41c3c064ed39bd1145d6bbcc.svg",width:"259",height:"56"}),React.createElement("p",null,"And frankly, things are starting to look a bit ridiculous at this point, we're doing way more maths than we've ever done, but thankfully this is as far as we need the maths to take us: If we plug in the precisions 0.1, 0.01, 0.001 and 0.0001 we get the radians values 1.748, 1.038, 0.594 and 0.3356; in degrees, that means we can cover roughly 100 degrees (requiring four curves), 59.5 degrees (requiring six curves), 34 degrees (requiring 11 curves), and 19.2 degrees (requiring a whopping nineteen curves)."),React.createElement("p",null,"The bottom line? ",React.createElement("strong",null,"Quadratic curves are kind of lousy")," if you want circular (or elliptical, which are circles that have been squashed in one dimension) curves. We can do better, even if it's just by raising the order of our curve once. So let's try the same thing for cubic curves."));}},"circles_cubic":{"locale":"en-GB","title":"Circles and cubic Bézier curves","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"circles_cubic",title:"Circles and cubic Bézier curves",number:"37"}),React.createElement("p",null,"In the previous section we tried to approximate a circular arc with a quadratic curve, and it mostly made us unhappy. Cubic curves are much better suited to this task, so what do we need to do?"),React.createElement("p",null,"For cubic curves, we basically want the curve to pass through three points on the circle: the start point, the mid point at \"angle/2\", and the end point at \"angle\". We then also need to make sure the control points are such that the start and end tangent lines line up with the circle's tangent lines at the start and end point."),React.createElement("p",null,"The first thing we can do is \"guess\" what the curve should look like, based on the previously outlined curve-through-three-points procedure. This will give use a curve with correct start, mid and end points, but possibly incorrect derivatives at the start and end, because the control points might not be in the right spot. We can then slide the control points along the lines that connect them to their respective end point, until they effect the corrected derivative at the start and end points.  However, if you look back at the section on fitting curves through three points, the rules used were such that they optimized for a near perfect hemisphere, so using the same guess won't be all that useful: guessing the solution based on knowing the solution is not really guessing."),React.createElement("p",null,"So have a graphical look at a \"bad\" guess versus the true fit, where we'll be using the bad guess and the description in the second paragraph to derive the maths for the true fit:"),React.createElement(Graphic,{preset:"arcfitting",title:"Cubic Bézier arc approximation",setup:handler.setup,draw:handler.draw,onMouseMove:handler.onMouseMove}),React.createElement("p",null,"We see two curves here; in blue, our \"guessed\" curve and its control points, and in grey/black, the true curve fit, with proper control points that were shifted in, along line between our guessed control points, such that the derivatives at the start and end points are correct."),React.createElement("p",null,"We can already seethat cubic curves are a lot better than quadratic curves, and don't look all that wrong until we go well past a quarter circle; ⅜th starts to hint at problems, and half a circle has an obvious \"gap\" between the real circle and the cubic approximation. Anything past that just looks plain ridiculous... but quarter curves actually look pretty okay!"),React.createElement("p",null,"So, maths time again: how okay is \"okay\"? Let's apply some more maths to find out."),React.createElement("p",null,"Unlike for the quadratic curve, we can't use ",React.createElement("i",null,"t=0.5")," as our reference point because by its very nature it's one of the three points that are actually guaranteed to lie on the circular curve. Instead, we need a different ",React.createElement("i",null,"t")," value. If we run some analysis on the curve we find that the actual ",React.createElement("i",null,"t")," value at which the curve is furthest from what it should be is 0.211325 (rounded), but we don't know \"why\", since finding this value involves root-finding, and is nearly impossible to do symbolically without pages and pages of math just to express one of the possible solutions."),React.createElement("p",null,"So instead of walking you through the derivation for that value, let's simply take that ",React.createElement("i",null,"t")," value and see what the error is for circular arcs with an angle ranging from 0 to 2π:"),React.createElement("table",null,React.createElement("tbody",null,React.createElement("tr",null,React.createElement("td",null,React.createElement("img",{src:"images/arc-c-2pi.gif",height:"187"}),"plotted for 0 ≤ φ ≤ 2π:"),React.createElement("td",null,React.createElement("img",{src:"images/arc-c-pi.gif",height:"187"}),"plotted for 0 ≤ φ ≤ π:"),React.createElement("td",null,React.createElement("img",{src:"images/arc-c-pi2.gif",height:"187"}),"plotted for 0 ≤ φ ≤ ½π:")))),React.createElement("p",null,"We see that cubic Bézier curves are much better when it comes to approximating circular arcs, with an error of less than 0.027 at the two \"bulge\" points for a quarter circle (which had an error of 0.06 for quadratic curves at the mid point), and an error near 0.001 for an eighth of a circle, so we're getting less than half the error for a quarter circle, or: at a slightly lower error, we're getting twice the arc. This makes cubic curves quite useful!"),React.createElement("p",null,"In fact, the precision of a cubic curve at a quarter circle is considered \"good enough\" by so many people that it's generally considered \"just fine\" to use four cubic Bézier curves to fake a full circle when no circle primitives are available; generally, people won't notice that it's not a real circle unless you also happen to overlay an actual circle, so that the difference becomes obvious."),React.createElement("p",null,"So with the error analysis out of the way, how do we actually compute the coordinates needed to get that \"true fit\" cubic curve? The first observation is that we already know the start and end points, because they're the same as for the quadratic attempt:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/ef34ab8f466ed3294895135a346b55ada05d779d.svg",width:"183.39999999999998",height:"42"}),React.createElement("p",null,"But we now need to find two control points, rather than one. If we want the derivatives at the start and end point to match the circle, then the first control point can only lie somewhere on the vertical line through S, and the second control point can only lie somewhere on the line tangent to point E, which means:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/4df65dae78bc5a0e6c5f23a2faae9a9d7a8b39b3.svg",width:"118.99999999999999",height:"42"}),React.createElement("p",null,"where \"a\" is some scaling factor, and:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/cb32f8f9c3ae2b264a48003c237a798d02dc8935.svg",width:"170.79999999999998",height:"42"}),React.createElement("p",null,"where \"b\" is also some scaling factor."),React.createElement("p",null,"Starting with this information, we slowly maths our way to success, but I won't lie: the maths for this is pretty trig-heavy, and it's easy to get lost if you remember (or know!) some of the core trigonoetric identities, so if you just want to see the final result just skip past the next section!"),React.createElement("div",{className:"note"},React.createElement("h2",{id:"let-s-do-this-thing-"},"Let's do this thing."),React.createElement("p",null,"Unlike for the quadratic case, we need some more information in order to compute ",React.createElement("i",null,"a")," and ",React.createElement("i",null,"b"),", since they're no longer dependent variables. First, we observe that the curve is symmetrical, so whatever values we end up finding for C",React.createElement("sub",null,"1")," will apply to C",React.createElement("sub",null,"2")," as well (rotated along its tangent), so we'll focus on finding the location of C",React.createElement("sub",null,"1")," only. So here's where we do something that you might not expect: we're going to ignore for a moment, because we're going to have a much easier time if we just solve this problem with geometry first, then move to calculus to solve a much simpler problem."),React.createElement("p",null,"If we look at the triangle that is formed between our starting point, or initial guess C",React.createElement("sub",null,"1")," and our real C",React.createElement("sub",null,"1"),", there's something funny going on: if we treat the line ",'{',"start,guess",'}'," as our opposite side, the line ",'{',"guess,real",'}'," as our adjacent side, with ",'{',"start,real",'}'," our hypothenuse, then the angle for the corner hypothenuse/adjacent is half that of the arc we're covering. Try it: if you place the end point at a quarter circle (pi/2, or 90 degrees), the angle in our triangle is half a quarter (pi/4, or 45 degrees). With that knowledge, and a knowledge of what the length of any of our lines segments are (as a function), we can determine where our control points are, and thus have everything we need to find the error distance function. Of the three lines, the one we can easiest determine is ",'{',"start,guess",'}',", so let's find out what the guessed control point is. Again geometrically, because we have the benefit of an on-curve ",React.createElement("i",null,"t=0.5")," value."),React.createElement("p",null,"The distance from our guessed point to the start point is exactly the same as the projection distance we looked at earlier. Using ",React.createElement("i",null,"t=0.5")," as our point \"B\" in the \"A,B,C\" projection, then we know the length of the line segment ",'{',"C,A",'}',", since it's d",React.createElement("sub",null,"1")," = ",'{',"A,B",'}'," + d",React.createElement("sub",null,"2")," = ",'{',"B,C",'}',":"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/b15a274c1e0a6aeeaf517b5d2c8ee0a7997dd617.svg",width:"417.2",height:"42"}),React.createElement("p",null,"So that just leaves us to find the distance from ",React.createElement("i",null,"t=0.5")," to the baseline for an arbitrary angle φ, which is the distance from the centre of the circle to our ",React.createElement("i",null,"t=0.5")," point, minus the distance from the centre to the line that runs from start point to end point. The first is the same as the point P we found for the quadratic curve:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/0b80423188012451e0400f473c19729eb2bad654.svg",width:"197.39999999999998",height:"33.599999999999994"}),React.createElement("p",null,"And the distance from the origin to the line start/end is another application of angles, since the triangle ",'{',"origin,start,C",'}'," has known angles, and two known sides. We can find the length of the line ",'{',"origin,C",'}',", which lets us trivially compute the coordinate for C:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/9be55fb38d5d30bbc6c7140afb1c7bc097bc044e.svg",width:"274.4",height:"70"}),React.createElement("p",null,"With the coordinate C, and knowledge of coordinate B, we can determine coordinate A, and get a vector that is identical to the vector ",'{',"start,guess",'}',":"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/262f2eca63105779f30a0a5445cf76f60786039a.svg",width:"417.2",height:"50.4"}),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/0e83ebbac13a84ef6036bf4be57b3d1b6cb316f8.svg",width:"221.2",height:"49"}),React.createElement("p",null,"Which means we can now determine the distance ",'{',"start,guessed",'}',", which is the same as the distance ",'{',"C,A",'}',", and use that to determine the vertical distance from our start point to our C",React.createElement("sub",null,"1"),":"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/c87e454fb11ef7f15c7386e83ca1ce41a004d8a7.svg",width:"264.59999999999997",height:"58.8"}),React.createElement("p",null,"And after this tedious detour to find the coordinate for C",React.createElement("sub",null,"1"),", we can find C",React.createElement("sub",null,"2")," fairly simply, since it's lies at distance -C",React.createElement("sub",null,"1y")," along the end point's tangent:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/25f027074b6af8ca7b640e27636e3bf89c28afdb.svg",width:"550.1999999999999",height:"82.6"}),React.createElement("p",null,"And that's it, we have all four points now for an approximation of an arbitrary circular arc with angle φ.")),React.createElement("p",null,"So, to recap, given an angle φ, the new control coordinates are:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/c4d82e44d1c67dda8ba26aa6da0f406d05eba618.svg",width:"215.6",height:"42"}),React.createElement("p",null,"and"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/3a4b1ee00eebb7697e5513ef9df673928913252e.svg",width:"337.4",height:"42"}),React.createElement("p",null,"And, because the \"quarter curve\" special case comes up so incredibly often, let's look at what these new control points mean for the curve coordinates of a quarter curve, by simply filling in φ = π/2:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/63e0936b4849d4cdbb9a2e0909181259be951e4d.svg",width:"432.59999999999997",height:"35"}),React.createElement("p",null,"Which, in decimal values, rounded to six significant digits, is:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/fd12e65204a31319b66355c6ff99e6b3d9603b05.svg",width:"432.59999999999997",height:"16.799999999999997"}),React.createElement("p",null,"Of course, this is for a circle with radius 1, so if you have a different radius circle, simply multiply the coordinate by the radius you need. And then finally, forming a full curve is now a simple a matter of mirroring these coordinates about the origin:"),React.createElement(Graphic,{preset:"simple",title:"Cubic Bézier circle approximation",draw:handler.drawCircle,"static":true}));}},"arcapproximation":{"locale":"en-GB","title":"Approximating Bézier curves with circular arcs","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"arcapproximation",title:"Approximating Bézier curves with circular arcs",number:"38"}),React.createElement("p",null,"Let's look at doing the exact opposite of the previous section: rather than approximating circular arc using Bézier curves, let's approximate Bézier curves using circular arcs."),React.createElement("p",null,"We already saw in the section on circle approximation that this will never yield a perfect equivalent, but sometimes you need circular arcs, such as when you're working with fabrication machinery, or simple vector languages that understand lines and circles, but not much else."),React.createElement("p",null,"The approach is fairly simple: pick a starting point on the curve, and pick two points that are further along the curve. Determine the circle that goes through those three points, and see if it fits the part of the curve we're trying to approximate. Decent fit? Try spacing the points further apart. Bad fit? Try spacing the points closer together. Keep doing this until you've found the \"good approximation/bad approximation\" boundary, record the \"good\" arc, and then move the starting point up to overlap the end point we previously found. Rinse and repeat until we've covered the entire curve."),React.createElement("p",null,"So: step 1, how do we find a circle through three points? That part is actually really simple. You may remember (if you ever learned it!) that a line between two points on a circle is called a ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/Chord_%28geometry%29"},"chord"),", and one property of chords is that the line from the center of any chord, perpendicular to that chord, passes through the center of the circle."),React.createElement("p",null,"So: if we have have three points, we have three (different) chords, and consequently, three (different) lines that go from those chords through the center of the circle. So we find the centers of the chords, find the perpendicular lines, find the intersection of those lines, and thus find the center of the circle."),React.createElement("p",null,"The following graphic shows this procedure with a different colour for each chord and its associated perpendicular through the center. You can move the points around as much as you like, those lines will always meet!"),React.createElement(Graphic,{preset:"simple",title:"Finding a circle through three points",setup:handler.setupCircle,draw:handler.drawCircle}),React.createElement("p",null,"So, with the procedure on how to find a circle through three points, finding the arc through those points is straight-forward: pick one of the three points as start point, pick another as an end point, and the arc has to necessarily go from the start point, over the remaining point, to the end point."),React.createElement("p",null,"So how can we convert a Bezier curve into a (sequence of) circular arc(s)?"),React.createElement("ul",null,React.createElement("li",null,"Start at ",React.createElement("em",null,"t=0")),React.createElement("li",null,"Pick two points further down the curve at some value ",React.createElement("em",null,"m = t + n")," and ",React.createElement("em",null,"e = t + 2n")),React.createElement("li",null,"Find the arc that these points define"),React.createElement("li",null,"Determine how close the found arc is to the curve:",React.createElement("ul",null,React.createElement("li",null,"Pick two additional points ",React.createElement("em",null,"e1 = t + n/2")," and ",React.createElement("em",null,"e2 = t + n + n/2"),"."),React.createElement("li",null,"These points, if the arc is a good approximation of the curve interval chosen, should lie ",React.createElement("em",null,"on")," the circle, so their distance to the center of the circle should be the same as the distance from any of the three other points to the center."),React.createElement("li",null,"For point points, determine the (absolute) error between the radius of the circle, and the",React.createElement("em",null,"actual")," distance from the center of the circle to the point on the curve."),React.createElement("li",null,"If this error is too high, we consider the arc bad, and try a smaller interval.")))),React.createElement("p",null,"The result of this is shown in the next graphic: we start at a guaranteed failure: s=0, e=1. That's the entire curve. The midpoint is simply at ",React.createElement("em",null,"t=0.5"),", and then we start performing a ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/Binary_search_algorithm"},"Binary Search"),"."),React.createElement("ol",null,React.createElement("li",null,"We start with ",(0,0.5,1)),React.createElement("li",null,"That'll fail, so we retry with the interval halved: ",(0,0.25,0.5),React.createElement("ul",null,React.createElement("li",null,"If that arc's good, we move back up by half distance: ",(0,0.375,0.75),"."),React.createElement("li",null,"However, if the arc was still bad, we move ",React.createElement("em",null,"down")," by half the distance: ",(0,0.125,0.25),"."))),React.createElement("li",null,"We keep doing this over and over until we have two arcs found in sequence of which the first arc is good, and the second arc is bad. When we find that pair, we've found the boundary between a good approximation and a bad approximation, and we pick the former.")),React.createElement("p",null,"The following graphic shows the result of this approach, with a default error threshold of 0.5, meaning that if an arc is off by a ",React.createElement("em",null,"combined")," half pixel over both verification points, then we treat the arc as bad. This is an extremely simple error policy, but already works really well. Note that the graphic is still interactive, and you can use your up and down arrow keys keys to increase or decrease the error threshold, to see what the effect of a smaller or larger error threshold is."),React.createElement(Graphic,{preset:"simple",title:"Arc approximation of a Bézier curve",setup:handler.setupCubic,draw:handler.drawSingleArc,onKeyDown:handler.props.onKeyDown}),React.createElement("p",null,"With that in place, all that's left now is to \"restart\" the procedure by treating the found arc's end point as the new to-be-determined arc's starting point, and using points further down the curve. We keep trying this until the found end point is for ",React.createElement("em",null,"t=1"),", at which point we are done. Again, the following graphic allows for up and down arrow key input to increase or decrease the error threshold, so you can see how picking a different threshold changes the number of arcs that are necessary to reasonably approximate a curve:"),React.createElement(Graphic,{preset:"simple",title:"Arc approximation of a Bézier curve",setup:handler.setupCubic,draw:handler.drawArcs,onKeyDown:handler.props.onKeyDown}),React.createElement("p",null,"So... what is this good for? Obviously, If you're working with technologies that can't do curves, but can do lines and circles, then the answer is pretty straight-forward, but what else? There are some reasons why you might need this technique: using circular arcs means you can determine whether a coordinate lies \"on\" your curve really easily: simply compute the distance to each circular arc center, and if any of those are close to the arc radii, at an angle betwee the arc start and end: bingo, this point can be treated as lying \"on the curve\". Another benefit is that this approximation is \"linear\": you can almost trivially travel along the arcs at fixed speed. You can also trivially compute the arc length of the approximated curve (it's a bit like curve flattening). The only thing to bear in mind is that this is a lossy equivalence: things that you compute based on the approximation are guaranteed \"off\" by some small value, and depending on how much precision you need, arc approximation is either going to be super useful, or completely useless. It's up to you to decide which, based on your application!"));}},"bsplines":{"locale":"en-GB","title":"B-Splines","getContent":function getContent(handler){return React.createElement("section",null,React.createElement(SectionHeader,{name:"bsplines",title:"B-Splines",number:"39"}),React.createElement("p",null,"No discussion on Bézier curves is complete without also giving mention of that other beast in the curve design space: B-Splines. Easily confused to mean Bézier splines, that's not actually what they are; they are \"basis function\" splines, which makes a lot of difference, which we'll be looking at in this section. We're not going to dive as deep into B-Splines as we have for Bézier curves (that would be an entire primer on its own) but we'll be looking at how B-Splines work, what kind of maths is involved in computing them, and how to draw them based on a number of parameters that you can pick for individual B-Splines."),React.createElement("p",null,"First off: B-Splines are ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/Piecewise"},"piecewise polynomial interpolation curves"),", where the \"single curve\" is built by performing polynomial interpolation over a set of points, using a sliding window of a fixed number of points. For instance, a \"cubic\" B-Spline defined by twelve points will have its curve built by evaluating the polynomial interpolation of four points, and the curve can be treated as a lot of different sections, each controlled by four points at a time, such that the full curve consists of smoothly connected sections defined by points ",'{',"1,2,3,4",'}',", ",'{',"2,3,4,5",'}',", ..., ",'{',"8,9,10,11",'}',", and finally ",'{',"9,10,11,12",'}',", for eight sections."),React.createElement("p",null,"What do they look like? They look like this! .. okay that's an empty graph, but simply click to place some point, with the stipulation that you need at least four point to see any curve. More than four points simply draws a longer B-Spline curve:"),React.createElement(BSplineGraphic,{sketch:handler.basicSketch}),React.createElement("p",null,"The important part to notice here is that we are ",React.createElement("strong",null,"not")," doing the same thing with B-Splines that we do for poly-Béziers or Catmull-Rom curves: both of the latter simply define new sections as literally \"new sections based on new points\", so a 12 point cubic poly-Bézier curve is actually impossible, because we start with a four point curve, and then add three more points for each section that follows, so we can only have 4, 7, 10, 13, 16, etc point Poly-Béziers. Similarly, while Catmull-Rom curves can grow by adding single points, this addition of a single point introduces three implicit Bézier points. Cubic B-Splines, on the other hand, are smooth interpolations of ",React.createElement("em",null,"each possible curve involving four consecutive points"),", such that at any point along the curve except for our start and end points, our on-curve coordinate is defined by four control points."),React.createElement("p",null,"Consider the difference to be this:"),React.createElement("ul",null,React.createElement("li",null,"for Bézier curves, the curve is defined as an interpolation of points, but:"),React.createElement("li",null,"for B-Splines, the curve is defined as an interpolation of ",React.createElement("em",null,"curves"),".")),React.createElement("p",null,"In order to make this interpolation of curves work, the maths is necessarily more complex than the maths for Bézier curves, so let's have a look at how things work."),React.createElement("h2",{id:"how-to-compute-a-b-spline-curve-some-maths"},"How to compute a B-Spline curve: some maths"),React.createElement("p",null,"Given a B-Spline of degree ",React.createElement("code",null,"d")," and thus order ",React.createElement("code",null,"k=d+1")," (so a quadratic B-Spline is degree 2 and order 3, a cubic B-Spline is degree 3 and order 4, etc) and ",React.createElement("code",null,"n")," control points ",React.createElement("code",null,"P<sub>0</sub>")," through ",React.createElement("code",null,"P<sub>n-1</sub>"),", we can compute a point on the curve for some value ",React.createElement("code",null,"t")," in the interval [0,1] (where 0 is the start of the curve, and 1 the end, just like for Bézier curves), by evaluting the following function:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/329da80e737b0005f4dbe4c84ff868bde5dfaee0.svg",width:"177.79999999999998",height:"43.4"}),React.createElement("p",null,"Which, honestly, doesn't tell us all that much. All we can see is that a point on a B-Spline curve is defined as \"a mix of all the control points, weighted somehow\", where the weighting is achieved through the ",React.createElement("em",null,"N(...)")," function, subscipted with an obvious parameter ",React.createElement("code",null,"i"),", which comes from our summation, and some magical parameter ",React.createElement("code",null,"k"),". So we need to know two things: 1. what does N(t) do, and 2. what is that ",React.createElement("code",null,"k"),"? Let's cover both, in reverse order."),React.createElement("p",null,"The parameter ",React.createElement("code",null,"k")," represents the \"knot interval\" over which a section of curve is defined. As we learned earlier, a B-Spline curve is itself an interpoliation of curves, and we can treat each transition where a control point starts or tops influencing the total curvature as a \"knot on the curve\". Doing so for a degree ",React.createElement("code",null,"d")," B-Spline with ",React.createElement("code",null,"n")," control point gives us ",React.createElement("code",null,"d + n + 1")," knots, defining ",React.createElement("code",null,"d + n")," intervals along the curve, and it is these intervals that the above ",React.createElement("code",null,"k")," subscript to the N() function applies to."),React.createElement("p",null,"Then the N() function itself. What does it look like?"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/c10575fb591062784484357356796a4c0be4f83e.svg",width:"588",height:"44.8"}),React.createElement("p",null,"So this is where we see the interpolation: N(t) for an (i,k) pair (that is, for a step in the above summation, on a specific knot interval) is a mix between N(t) for (i,k-1) and N(t) for (i+1,k-1), so we see that this is a recursive iteration where ",React.createElement("code",null,"i")," goes up, and ",React.createElement("code",null,"k")," goes down, so it seem reasonable to expect that this recursion has to stop at some point; obviously, it does, and specifically it does so for the following ",React.createElement("code",null,"i"),"/",React.createElement("code",null,"k")," values:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/6664a4fc5832059bbc68eaa8068a4b2577e1d96a.svg",width:"251.99999999999997",height:"42"}),React.createElement("p",null,"And this function finally has a straight up evaluation: if a ",React.createElement("code",null,"t")," value lies within a knot-specific interval once we reach a ",React.createElement("code",null,"k=1")," value, it \"counts\", otherwise it doesn't. We did cheat a little, though, because for all these values we need to scale our ",React.createElement("code",null,"t")," value first, so that it lies in the interval bounded by ",React.createElement("code",null,"knots[d]")," and ",React.createElement("code",null,"knots[n]"),", which are the start point and end point where curvature is controlled by exactly ",React.createElement("code",null,"order")," control points. For instance, for degree 3 (=order 4) and 7 control points, with knot vector [1,2,3,4,5,6,7,8,9,10,11], we map ",React.createElement("code",null,"t")," from [the interval 0,1] to the interval [4,8], and then use that value in the functions above, instead."),React.createElement("h2",{id:"can-we-simplify-that-"},"Can we simplify that?"),React.createElement("p",null,"We can, yes."),React.createElement("p",null,"People far smarter than us have looked at this work, and two in particular — ",React.createElement("a",{href:"http://www.npl.co.uk/people/maurice-cox"},"Maurice Cox")," and ",React.createElement("a",{href:"https://en.wikipedia.org/wiki/Carl_R._de_Boor"},"Carl de Boor")," — came to a mathematically pleasing solution: to compute a point P(t), we can compute this point by evaluating ",React.createElement("em",null,"d(t)")," on a curve section between knots ",React.createElement("em",null,"i")," and ",React.createElement("em",null,"i+1"),":"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/3780a420cd9b1bc59bec2c49bbd29f5e58497a3c.svg",width:"295.4",height:"22.4"}),React.createElement("p",null,"This is another recursive function, with ",React.createElement("em",null,"k")," values decreasing from the curve order to 1, and the value ",React.createElement("em",null,"α")," (alpha) defined by:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/ba3b25cd54993b4601d8f415bc4cde73af4fc460.svg",width:"267.4",height:"40.599999999999994"}),React.createElement("p",null,"That looks complicated, but it's not. Computing alpha is just a fraction involving known, plain numbers and once we have our alpha value, computing (1-alpha) is literally just \"computing one minus alpha\". Computing this d() function is thus simply a matter of \"computing simple arithmetics but with recursion\", which might be computationally expensive because we're doing \"a lot of\" steps, but is also computationally cheap because each step only involves very simple maths. Of course as before the recursion has to stop:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/1405067abebab73574934e3e69d7a7158106c744.svg",width:"387.79999999999995",height:"42"}),React.createElement("p",null,"So, we see two stopping conditions: either ",React.createElement("code",null,"i")," becomes 0, in which case d() is zero, or ",React.createElement("code",null,"k")," becomes zero, in which case we get the same \"either 1 or 0\" that we saw in the N() function above."),React.createElement("p",null,"Thanks to Cox and de Boor, we can compute points on a B-Spline pretty easily: we just need to compute a triangle of interconnected values. For instance, d() for i=3, k=3 yields the following triangle:"),React.createElement("img",{className:"LaTeX SVG",src:"images/latex/a0a1069b001c75a1fab7f40ffa8bc403e1408f0d.svg",width:"438.2",height:"242.2"}),React.createElement("p",null,"That is, we compute d(3,3) as a mixture of d(2,3) and d(2,2): d(3,3) = a(3,3) x d(2,3) + (1-a(3,3)) x d(2,2)... and we simply keep expanding our triangle until we reach the terminating function parameters. Done deal!"),React.createElement("p",null,"One thing we need to keep in mind is that we're working with a spline that is contrained by its control points, so even though the ",React.createElement("code",null,"d(..., k)")," values are zero or one at the lowest level, they are really \"zero or one, times their respective control point\", so in the next section you'll see the algorithm for running through the computation in a way that starts with a copy of the control point vector and then works its way up to that single point: that's pretty essential!"),React.createElement("p",null,"If we run this computation \"down\", starting at d(3,3), then without special code in place we would be computing quite a few terms multiple times at each step. On the other hand, we can also start with that last \"column\", we can generate the terminating d() values first, then compute the a() constants, perform our multiplcations, generate the previous step's d() values, compute their a() constants, do the multiplications, etc. until we end up all the way back at the top. If we run our computation this way, we don't need any explicit caching, we can just \"recycle\" the list of numbers we start with and simply update them as we move up the triangle. So, let's implement that!"),React.createElement("h2",{id:"cool-cool-but-i-don-t-know-what-to-do-with-that-information"},"Cool, cool... but I don't know what to do with that information"),React.createElement("p",null,"I know, this is pretty mathy, so let's have a look at what happens when we change parameters here. We can't change the maths for the interpolation functions, so that gives us only one way to control what happens here: the knot vector itself. As such, let's look at the graph that shows the interpolation functions for a cubic B-Spline with seven points with a uniform knot vector (so we see seven identical functions), representing how much each point (represented by one function each) influences the total curvature, given our knot values. And, because exploration is the key to discovery, let's make the knot vector a thing we can actually manipulate. Normally a proper knot vector has a constraint that any value is strictly equal to, or larger than the previous ones, but screw it this is programming, let's ignore that hard restriction and just mess with the knots however we like."),React.createElement("div",{className:"two-column"},React.createElement(KnotController,{ref:"interpolation-graph"}),React.createElement(BSplineGraphic,{sketch:handler.interpolationGraph,controller:function controller(owner,knots){return handler.bindKnots(owner,knots,"interpolation-graph");}})),React.createElement("p",null,"Changing the values in the knot vector changes how much each point influences the total curvature (with some clever knot value manipulation, we can even make the influence of certain points disappear entirely!), so we can see that while the control points define the hull inside of which we're going to be drawing a curve, it is actually the knot vector that determines the actual ",React.createElement("em",null,"shape")," of the curve inside that hull."),React.createElement("p",null,"After reading the rest of this section you may want to come back here to try some specific knot vectors, and see if the resulting interpolation landscape makes sense given what you will now think should happen!"),React.createElement("h2",{id:"running-the-computation"},"Running the computation"),React.createElement("p",null,"Unlike the de Casteljau algorithm, where the ",React.createElement("code",null,"t")," value stays the same at every iteration, for B-Splines that is not the case, and so we end having to (for each point we evaluate) run a fairly involving bit of recursive computation. The algorithm is discussed on ",React.createElement("a",{href:"http://www.cs.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/de-Boor.html"},"this Michigan Tech")," page, but an easier to read version is implemented by ",React.createElement("a",{href:"https://github.com/thibauts/b-spline/blob/master/index.js#L59-L71"},"b-spline.js"),", so we'll look at its code."),React.createElement("p",null,"Given an input value ",React.createElement("code",null,"t"),", we first map the input to a value from the domain [0,1] to the domain [knots[degree], knots[knots.length - 1 - degree]. Then, we find the section number ",React.createElement("code",null,"s")," that this mapped ",React.createElement("code",null,"t")," value lies on:"),React.createElement("pre",null,"for(s=domain[0]; s < domain[1]; s++) {\n  if(knots[s] <= t && t <= knots[s+1]) break;\n}\n"),React.createElement("p",null,"after running this code, ",React.createElement("code",null,"s")," is the index for the section the point will lie on. We then run the algorithm mentioned on the MU page (updated to use this description's variable names):"),React.createElement("pre",null,"let v = copy of control points\n\nfor(let L = 1; L <= order; L++) {\n  for(let i=s; i > s + L - order; i--) {\n    let numerator = t - knots[i]\n    let denominator = knots[i - L + order] - knots[i]\n    let alpha = numerator / denominator\n    let v[i] = alpha * v[i] + (1-alpha) * v[i-1]\n  }\n}\n"),React.createElement("p",null,"(A nice bit of behaviour in this code is that we work the interpolation \"backwards\", starting at ",React.createElement("code",null,"i=s")," at each level of the interpolation, and we stop when ",React.createElement("code",null,"i = s - order + level"),", so we always end up with a value for ",React.createElement("code",null,"i")," such that those ",React.createElement("code",null,"v[i-1]")," don't try to use an array index that doesn't exist)"),React.createElement("h2",{id:"open-vs-closed-paths"},"Open vs. closed paths"),React.createElement("p",null,"Much like poly-Béziers, B-Splines can be either open, running from the first point to the last point, or closed, where the first and last point are ",React.createElement("em",null,"the same point"),". However, because B-Splines are an interpolation of curves, not just point, we can't simply make the first and last point the same, we need to link a few point point: for an order ",React.createElement("code",null,"d")," B-Spline, we need to make the last ",React.createElement("code",null,"d")," point the same as the first ",React.createElement("code",null,"d")," points. And the easiest way to do this is to simply append ",React.createElement("code",null,"points.splice(0,d)")," to ",React.createElement("code",null,"points"),". Done!"),React.createElement("p",null,"Of course if we want to manipulate these kind of curves we need to make sure to mark them as \"closed\" so that we know the coordinate for ",React.createElement("code",null,"points[0]")," and ",React.createElement("code",null,"points[n-k]")," etc. are the same coordinate, and manipulating one will equally manipulate the other, but programming generally makes this really easy by storing references to coordinates (or other linked values such as coordinate weights, discussed in the NURBS section) rather than separate coordinate objects."),React.createElement("h2",{id:"manipulating-the-curve-through-the-knot-vector"},"Manipulating the curve through the knot vector"),React.createElement("p",null,"The most important thing to understand when it comes to B-Splines is that they work ",React.createElement("em",null,"because")," of the concept of a knot vector. As mentioned above, knots represent \"where individual control points start/stop influencing the curve\", but we never looked at the ",React.createElement("em",null,"values")," that go in the knot vector. If you look back at the N() and a() functions, you see that interpolations are based on intervals in the knot vector, rather than the actual values in the knot vector, and we can exploit this to do some pretty interesting things with clever manipulation of the knot vector. Specifically there are four things we can do that are worth looking at:"),React.createElement("ol",null,React.createElement("li",null,"we can use a uniform knot vector, with equally spaced intervals,"),React.createElement("li",null,"we can use a non-uniform knot vector, without enforcing equally spaced internvals,"),React.createElement("li",null,"we can collapse sequential knots to the same value, locally lowering curve complexity using \"null\" intervals, and"),React.createElement("li",null,"we can form a special case non-uniform vector, by combining (1) and (3) to for a vector with collapsed start and end knots, with a uniform vector in between.")),React.createElement("h3",{id:"uniform-b-splines"},"Uniform B-Splines"),React.createElement("p",null,"The most straightforward type of B-Spline is the uniform spline. In a uniform spline, the knots are distributed uniformly over the entire curve interval. For instance, if we have a knot vector of length twelve, then a uniform knot vector would be [0,1,2,3,...,9,10,11]. Or [4,5,6,...,13,14,15], which defines ",React.createElement("em",null,"the same intervals"),", or even [0,2,3,...,18,20,22], which also defines ",React.createElement("em",null,"the same intervals"),", just scaled by a constant factor, which becomes normalised during interpolation and so does not contribute to the curvature."),React.createElement("div",{className:"two-column"},React.createElement(KnotController,{ref:"uniform-spline"}),React.createElement(BSplineGraphic,{sketch:handler.uniformBSpline,controller:function controller(owner,knots){return handler.bindKnots(owner,knots,"uniform-spline");}})),React.createElement("p",null,"This is an important point: the intervals that the knot vector defines are ",React.createElement("em",null,"relative")," intervals, so it doesn't matter if every interval is size 1, or size 100 - the relative differences between the intervals is what shapes any particular curve."),React.createElement("p",null,"The problem with uniform knot vectors is that, as we need ",React.createElement("code",null,"order")," control points before we have any curve with which we can perform interpolation, the curve does not \"start\" at the first point, nor \"ends\" at the last point. Instead there are \"gaps\". We can get rid of these, by being clever about how we apply the following uniformity-breaking approach instead..."),React.createElement("h3",{id:"reducing-local-curve-complexity-by-collapsing-intervals"},"Reducing local curve complexity by collapsing intervals"),React.createElement("p",null,"By collapsing knot intervals by making two or more consecutive knots have the same value, we can reduce the curve complexity in the sections that are affected by the knots involved. This can have drastic effects: for ever interval collapse, the curve order goes down, and curve continuity goes down, to the point where collapsing ",React.createElement("code",null,"order")," knots creates a situation where all continuity is lost and the curve \"kinks\"."),React.createElement("div",{className:"two-column"},React.createElement(KnotController,{ref:"center-cut-bspline"}),React.createElement(BSplineGraphic,{sketch:handler.centerCutBSpline,controller:function controller(owner,knots){return handler.bindKnots(owner,knots,"center-cut-bspline");}})),React.createElement("h3",{id:"open-uniform-b-splines"},"Open-Uniform B-Splines"),React.createElement("p",null,"By combining knot interval collapsing at the start and end of the curve, with uniform knots in between, we can overcome the problem of the curve not starting and ending where we'd kind of like it to:"),React.createElement("p",null,"For any curve of degree ",React.createElement("code",null,"D")," with control points ",React.createElement("code",null,"N"),", we can define a knot vector of length ",React.createElement("code",null,"N+D+1")," in which the values ",React.createElement("code",null,"0 ... D+1")," are the same, the values ",React.createElement("code",null,"D+1 ... N+1")," follow the \"uniform\" pattern, and the values ",React.createElement("code",null,"N+1 ... N+D+1")," are the same again. For example, a cubic B-Spline with 7 control points can have a knot vector [0,0,0,0,1,2,3,4,4,4,4], or it might have the \"identical\" knot vector [0,0,0,0,2,4,6,8,8,8,8], etc. Again, it is the relative differences that determine the curve shape."),React.createElement("div",{className:"two-column"},React.createElement(KnotController,{ref:"open-uniform-bspline"}),React.createElement(BSplineGraphic,{sketch:handler.openUniformBSpline,controller:function controller(owner,knots){return handler.bindKnots(owner,knots,"open-uniform-bspline");}})),React.createElement("h3",{id:"non-uniform-b-splines"},"Non-uniform B-Splines"),React.createElement("p",null,"This is essentialy the \"free form\" version of a B-Spline, and also the least interesting to look at, as without any specific reason to pick specific knot intervals, there is nothing particularly interesting going on. There is one constraint to the knot vector, and that is that any value ",React.createElement("code",null,"knots[k+1]")," should be equal to, or greater than ",React.createElement("code",null,"knots[k]"),"."),React.createElement("h2",{id:"one-last-thing-rational-b-splines"},"One last thing: Rational B-Splines"),React.createElement("p",null,"While it is true that this section on B-Splines is running quite long already, there is one more thing we need to talk about, and that's \"Rational\" splines, where the rationality applies to the \"ratio\", or relative weights, of the control points themselves. By introducing a ratio vector with weights to apply to each control point, we greatly increase our influence over the final curve shape: the more weight a control point carries, the close to that point the spline curve will lie, a bit like turning up the gravity of a control point."),React.createElement("div",{className:"two-column"},React.createElement(WeightController,{ref:"rational-uniform-bspline-weights"}),React.createElement(BSplineGraphic,{scrolling:true,sketch:handler.rationalUniformBSpline,controller:function controller(owner,knots,weights,closed){// handler.bindKnots(owner, knots, "rational-uniform-bspline");
handler.bindWeights(owner,weights,closed,"rational-uniform-bspline-weights");}})),React.createElement("p",null,"Of course this brings us to the final topic that any text on B-Splines must touch on before calling it a day: the NURBS, or Non-Uniform Rational B-Spline (NURBS is not a plural, the capital S actually just stands for \"spline\", but a lot of people mistakenly treat it as if it is, so now you know better). NURBS are an important type of curve in computer-facilitated design, used a lot in 3D modelling (as NURBS surfaces) as well as in arbitrary-precision 2D design due to the level of control a NURBS curve offers designers."),React.createElement("p",null,"While a true non-uniform rational B-Spline would be hard to work with, when we talk about NURBS we typically mean the Open-Uniform Rational B-Spline, or OURBS, but that doesn't roll off the tongue nearly as nicely, and so remember that when people talk about NURBS, they typically mean open-uniform, which has the useful property of starting the curve at the first control point, and ending it at the last."),React.createElement("h2",{id:"extending-our-implementation-to-cover-rational-splines"},"Extending our implementation to cover rational splines"),React.createElement("p",null,"The algorithm for working with Rational B-Splines is virtually identical to the regular algorithm, and the extension to work in the control point weights is fairly simple: we extend each control point from a point in its original number of dimensions (2D, 3D, etc) to one dimension higher, scaling the original dimensions by the control point's weight, and then assigning that weight as its value for the extended dimension."),React.createElement("p",null,"For example, a 2D point ",React.createElement("code",null,"(x,y)")," with weight ",React.createElement("code",null,"w")," becomes a 3D point ",React.createElement("code",null,"(w * x, w * y, w)"),"."),React.createElement("p",null,"We then run the same algorithm as before, which will automatically perform weight interpolation in addition to regular coordinate interpolation, because all we've done is pretended we have coordinates in a higher dimension. The algorithm doesn't really care about how many dimensions it needs to interpolate."),React.createElement("p",null,"In order to recover our \"real\" curve point, we take the final result of the point generation algorithm, and \"unweigh\" it: we take the final point's derived weight ",React.createElement("code",null,"w'")," and divide all the regular coordinate dimensions by it, then throw away the weight information."),React.createElement("p",null,"Based on our previous example, we take the final 3D point ",React.createElement("code",null,"(x', y', w')"),", which we then turn back into a 2D point by computing ",React.createElement("code",null,"(x'/w', y'/w')"),". And that's it, we're done!"));}},"comments":{"locale":"en-GB","title":"Comments and questions","getContent":function getContent(handler){return React.createElement("section",null,React.createElement("script",null,"/* ----------------------------------------------------------------------------- * * *                    PLEASE DO NOT LOCALISE THIS FILE * * I can't respond to questions that aren't asked in English, so this is one of * the few cases where there is a content.en-GB.md but you shouldn't change it. * * ----------------------------------------------------------------------------- */"),React.createElement(SectionHeader,{name:"comments",title:"Comments and questions",number:"40"}),React.createElement("p",null,"If you enjoyed this book, or you simply found it useful for something you were trying to get done, and you were wondering how to let me know you appreciated this book, you can always ",React.createElement("a",{href:"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QPRDLNGDANJSW"},"buy me a coffee"),", however much a coffee is where you live. This work has grown over the years, from a small primer to a 70ish print-page-equivalent reader on the subject of Bézier curves, and a lot of coffee went into the making of it. I don't regret a minute I spent on writing it, but I can always do with some more coffee to keep on writing!"),React.createElement("div",{id:"disqus_thread"}));}},"locale-switcher":{"locale":"en-GB","title":"locale-switcher","getContent":function getContent(handler){return React.createElement("section",null,React.createElement("p",null,"Read this in your own language:"),React.createElement("ul",null,React.createElement("li",null,React.createElement("a",{href:"./en-GB"},"English")),React.createElement("li",null,React.createElement("a",{href:"./ja-JP"},"日本語")),React.createElement("li",null,React.createElement("a",{href:"./zh-CN"},"中文"))),React.createElement("p",null,"Don't see your language listed? ",React.createElement("a",{href:"https://github.com/Pomax/BezierInfo-2/wiki/localize"},"Help translate this content!")));}}};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  "use strict";

  var utils = __webpack_require__(7);

  /**
   * Poly Bezier
   * @param {[type]} curves [description]
   */
  var PolyBezier = function(curves) {
    this.curves = [];
    this._3d = false;
    if(!!curves) {
      this.curves = curves;
      this._3d = this.curves[0]._3d;
    }
  }

  PolyBezier.prototype = {
    valueOf: function() {
      return this.toString();
    },
    toString: function() {
      return utils.pointsToString(this.points);
    },
    addCurve: function(curve) {
      this.curves.push(curve);
      this._3d = this._3d || curve._3d;
    },
    length: function() {
      return this.curves.map(function(v) { return v.length(); }).reduce(function(a,b) { return a+b; });
    },
    curve: function(idx) {
      return this.curves[idx];
    },
    bbox: function() {
      var c = this.curves;
      var bbox = c[0].bbox();
      for(var i=1; i<c.length; i++) {
        utils.expandbox(bbox, c[i].bbox());
      }
      return bbox;
    },
    offset: function(d) {
      var offset = [];
      this.curves.forEach(function(v) {
        offset = offset.concat(v.offset(d));
      });
      return new PolyBezier(offset);
    }
  };

  module.exports = PolyBezier;
}());


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
/**
 * @license
 *
 * chroma.js - JavaScript library for color conversions
 * 
 * Copyright (c) 2011-2015, Gregor Aisch
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 * 
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 *    derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

(function() {
  var Color, DEG2RAD, LAB_CONSTANTS, PI, PITHIRD, RAD2DEG, TWOPI, _guess_formats, _guess_formats_sorted, _input, _interpolators, abs, atan2, bezier, blend, blend_f, brewer, burn, chroma, clip_rgb, cmyk2rgb, colors, cos, css2rgb, darken, dodge, each, floor, hex2rgb, hsi2rgb, hsl2css, hsl2rgb, hsv2rgb, interpolate, interpolate_hsx, interpolate_lab, interpolate_num, interpolate_rgb, lab2lch, lab2rgb, lab_xyz, lch2lab, lch2rgb, lighten, limit, log, luminance_x, m, max, multiply, normal, num2rgb, overlay, pow, rgb2cmyk, rgb2css, rgb2hex, rgb2hsi, rgb2hsl, rgb2hsv, rgb2lab, rgb2lch, rgb2luminance, rgb2num, rgb2temperature, rgb2xyz, rgb_xyz, rnd, root, round, screen, sin, sqrt, temperature2rgb, type, unpack, w3cx11, xyz_lab, xyz_rgb,
    slice = [].slice;

  type = (function() {

    /*
    for browser-safe type checking+
    ported from jQuery's $.type
     */
    var classToType, len, name, o, ref;
    classToType = {};
    ref = "Boolean Number String Function Array Date RegExp Undefined Null".split(" ");
    for (o = 0, len = ref.length; o < len; o++) {
      name = ref[o];
      classToType["[object " + name + "]"] = name.toLowerCase();
    }
    return function(obj) {
      var strType;
      strType = Object.prototype.toString.call(obj);
      return classToType[strType] || "object";
    };
  })();

  limit = function(x, min, max) {
    if (min == null) {
      min = 0;
    }
    if (max == null) {
      max = 1;
    }
    if (x < min) {
      x = min;
    }
    if (x > max) {
      x = max;
    }
    return x;
  };

  unpack = function(args) {
    if (args.length >= 3) {
      return [].slice.call(args);
    } else {
      return args[0];
    }
  };

  clip_rgb = function(rgb) {
    var i;
    for (i in rgb) {
      if (i < 3) {
        if (rgb[i] < 0) {
          rgb[i] = 0;
        }
        if (rgb[i] > 255) {
          rgb[i] = 255;
        }
      } else if (i === 3) {
        if (rgb[i] < 0) {
          rgb[i] = 0;
        }
        if (rgb[i] > 1) {
          rgb[i] = 1;
        }
      }
    }
    return rgb;
  };

  PI = Math.PI, round = Math.round, cos = Math.cos, floor = Math.floor, pow = Math.pow, log = Math.log, sin = Math.sin, sqrt = Math.sqrt, atan2 = Math.atan2, max = Math.max, abs = Math.abs;

  TWOPI = PI * 2;

  PITHIRD = PI / 3;

  DEG2RAD = PI / 180;

  RAD2DEG = 180 / PI;

  chroma = function() {
    if (arguments[0] instanceof Color) {
      return arguments[0];
    }
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, arguments, function(){});
  };

  _interpolators = [];

  if ((typeof module !== "undefined" && module !== null) && (module.exports != null)) {
    module.exports = chroma;
  }

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return chroma;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    root.chroma = chroma;
  }

  chroma.version = '1.1.1';


  /**
      chroma.js
  
      Copyright (c) 2011-2013, Gregor Aisch
      All rights reserved.
  
      Redistribution and use in source and binary forms, with or without
      modification, are permitted provided that the following conditions are met:
  
      * Redistributions of source code must retain the above copyright notice, this
        list of conditions and the following disclaimer.
  
      * Redistributions in binary form must reproduce the above copyright notice,
        this list of conditions and the following disclaimer in the documentation
        and/or other materials provided with the distribution.
  
      * The name Gregor Aisch may not be used to endorse or promote products
        derived from this software without specific prior written permission.
  
      THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
      AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
      IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
      DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
      INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
      BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
      DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
      OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
      NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
      EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  
      @source: https://github.com/gka/chroma.js
   */

  _input = {};

  _guess_formats = [];

  _guess_formats_sorted = false;

  Color = (function() {
    function Color() {
      var arg, args, chk, len, len1, me, mode, o, w;
      me = this;
      args = [];
      for (o = 0, len = arguments.length; o < len; o++) {
        arg = arguments[o];
        if (arg != null) {
          args.push(arg);
        }
      }
      mode = args[args.length - 1];
      if (_input[mode] != null) {
        me._rgb = clip_rgb(_input[mode](unpack(args.slice(0, -1))));
      } else {
        if (!_guess_formats_sorted) {
          _guess_formats = _guess_formats.sort(function(a, b) {
            return b.p - a.p;
          });
          _guess_formats_sorted = true;
        }
        for (w = 0, len1 = _guess_formats.length; w < len1; w++) {
          chk = _guess_formats[w];
          mode = chk.test.apply(chk, args);
          if (mode) {
            break;
          }
        }
        if (mode) {
          me._rgb = clip_rgb(_input[mode].apply(_input, args));
        }
      }
      if (me._rgb == null) {
        console.warn('unknown format: ' + args);
      }
      if (me._rgb == null) {
        me._rgb = [0, 0, 0];
      }
      if (me._rgb.length === 3) {
        me._rgb.push(1);
      }
    }

    Color.prototype.alpha = function(alpha) {
      if (arguments.length) {
        this._rgb[3] = alpha;
        return this;
      }
      return this._rgb[3];
    };

    Color.prototype.toString = function() {
      return this.name();
    };

    return Color;

  })();

  chroma._input = _input;


  /**
  	ColorBrewer colors for chroma.js
  
  	Copyright (c) 2002 Cynthia Brewer, Mark Harrower, and The 
  	Pennsylvania State University.
  
  	Licensed under the Apache License, Version 2.0 (the "License"); 
  	you may not use this file except in compliance with the License.
  	You may obtain a copy of the License at	
  	http://www.apache.org/licenses/LICENSE-2.0
  
  	Unless required by applicable law or agreed to in writing, software distributed
  	under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
  	CONDITIONS OF ANY KIND, either express or implied. See the License for the
  	specific language governing permissions and limitations under the License.
  
      @preserve
   */

  chroma.brewer = brewer = {
    OrRd: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
    PuBu: ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'],
    BuPu: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'],
    Oranges: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'],
    BuGn: ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'],
    YlOrBr: ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
    YlGn: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
    Reds: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
    RdPu: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'],
    Greens: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
    YlGnBu: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
    Purples: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
    GnBu: ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'],
    Greys: ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'],
    YlOrRd: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
    PuRd: ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'],
    Blues: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
    PuBuGn: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'],
    Spectral: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'],
    RdYlGn: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'],
    RdBu: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'],
    PiYG: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'],
    PRGn: ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b'],
    RdYlBu: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
    BrBG: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30'],
    RdGy: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'],
    PuOr: ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'],
    Set2: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'],
    Accent: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'],
    Set1: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'],
    Set3: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'],
    Dark2: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'],
    Paired: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'],
    Pastel2: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc'],
    Pastel1: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2']
  };


  /**
  	X11 color names
  
  	http://www.w3.org/TR/css3-color/#svg-color
   */

  w3cx11 = {
    indigo: "#4b0082",
    gold: "#ffd700",
    hotpink: "#ff69b4",
    firebrick: "#b22222",
    indianred: "#cd5c5c",
    yellow: "#ffff00",
    mistyrose: "#ffe4e1",
    darkolivegreen: "#556b2f",
    olive: "#808000",
    darkseagreen: "#8fbc8f",
    pink: "#ffc0cb",
    tomato: "#ff6347",
    lightcoral: "#f08080",
    orangered: "#ff4500",
    navajowhite: "#ffdead",
    lime: "#00ff00",
    palegreen: "#98fb98",
    darkslategrey: "#2f4f4f",
    greenyellow: "#adff2f",
    burlywood: "#deb887",
    seashell: "#fff5ee",
    mediumspringgreen: "#00fa9a",
    fuchsia: "#ff00ff",
    papayawhip: "#ffefd5",
    blanchedalmond: "#ffebcd",
    chartreuse: "#7fff00",
    dimgray: "#696969",
    black: "#000000",
    peachpuff: "#ffdab9",
    springgreen: "#00ff7f",
    aquamarine: "#7fffd4",
    white: "#ffffff",
    orange: "#ffa500",
    lightsalmon: "#ffa07a",
    darkslategray: "#2f4f4f",
    brown: "#a52a2a",
    ivory: "#fffff0",
    dodgerblue: "#1e90ff",
    peru: "#cd853f",
    lawngreen: "#7cfc00",
    chocolate: "#d2691e",
    crimson: "#dc143c",
    forestgreen: "#228b22",
    darkgrey: "#a9a9a9",
    lightseagreen: "#20b2aa",
    cyan: "#00ffff",
    mintcream: "#f5fffa",
    silver: "#c0c0c0",
    antiquewhite: "#faebd7",
    mediumorchid: "#ba55d3",
    skyblue: "#87ceeb",
    gray: "#808080",
    darkturquoise: "#00ced1",
    goldenrod: "#daa520",
    darkgreen: "#006400",
    floralwhite: "#fffaf0",
    darkviolet: "#9400d3",
    darkgray: "#a9a9a9",
    moccasin: "#ffe4b5",
    saddlebrown: "#8b4513",
    grey: "#808080",
    darkslateblue: "#483d8b",
    lightskyblue: "#87cefa",
    lightpink: "#ffb6c1",
    mediumvioletred: "#c71585",
    slategrey: "#708090",
    red: "#ff0000",
    deeppink: "#ff1493",
    limegreen: "#32cd32",
    darkmagenta: "#8b008b",
    palegoldenrod: "#eee8aa",
    plum: "#dda0dd",
    turquoise: "#40e0d0",
    lightgrey: "#d3d3d3",
    lightgoldenrodyellow: "#fafad2",
    darkgoldenrod: "#b8860b",
    lavender: "#e6e6fa",
    maroon: "#800000",
    yellowgreen: "#9acd32",
    sandybrown: "#f4a460",
    thistle: "#d8bfd8",
    violet: "#ee82ee",
    navy: "#000080",
    magenta: "#ff00ff",
    dimgrey: "#696969",
    tan: "#d2b48c",
    rosybrown: "#bc8f8f",
    olivedrab: "#6b8e23",
    blue: "#0000ff",
    lightblue: "#add8e6",
    ghostwhite: "#f8f8ff",
    honeydew: "#f0fff0",
    cornflowerblue: "#6495ed",
    slateblue: "#6a5acd",
    linen: "#faf0e6",
    darkblue: "#00008b",
    powderblue: "#b0e0e6",
    seagreen: "#2e8b57",
    darkkhaki: "#bdb76b",
    snow: "#fffafa",
    sienna: "#a0522d",
    mediumblue: "#0000cd",
    royalblue: "#4169e1",
    lightcyan: "#e0ffff",
    green: "#008000",
    mediumpurple: "#9370db",
    midnightblue: "#191970",
    cornsilk: "#fff8dc",
    paleturquoise: "#afeeee",
    bisque: "#ffe4c4",
    slategray: "#708090",
    darkcyan: "#008b8b",
    khaki: "#f0e68c",
    wheat: "#f5deb3",
    teal: "#008080",
    darkorchid: "#9932cc",
    deepskyblue: "#00bfff",
    salmon: "#fa8072",
    darkred: "#8b0000",
    steelblue: "#4682b4",
    palevioletred: "#db7093",
    lightslategray: "#778899",
    aliceblue: "#f0f8ff",
    lightslategrey: "#778899",
    lightgreen: "#90ee90",
    orchid: "#da70d6",
    gainsboro: "#dcdcdc",
    mediumseagreen: "#3cb371",
    lightgray: "#d3d3d3",
    mediumturquoise: "#48d1cc",
    lemonchiffon: "#fffacd",
    cadetblue: "#5f9ea0",
    lightyellow: "#ffffe0",
    lavenderblush: "#fff0f5",
    coral: "#ff7f50",
    purple: "#800080",
    aqua: "#00ffff",
    whitesmoke: "#f5f5f5",
    mediumslateblue: "#7b68ee",
    darkorange: "#ff8c00",
    mediumaquamarine: "#66cdaa",
    darksalmon: "#e9967a",
    beige: "#f5f5dc",
    blueviolet: "#8a2be2",
    azure: "#f0ffff",
    lightsteelblue: "#b0c4de",
    oldlace: "#fdf5e6",
    rebeccapurple: "#663399"
  };

  chroma.colors = colors = w3cx11;

  lab2rgb = function() {
    var a, args, b, g, l, r, x, y, z;
    args = unpack(arguments);
    l = args[0], a = args[1], b = args[2];
    y = (l + 16) / 116;
    x = isNaN(a) ? y : y + a / 500;
    z = isNaN(b) ? y : y - b / 200;
    y = LAB_CONSTANTS.Yn * lab_xyz(y);
    x = LAB_CONSTANTS.Xn * lab_xyz(x);
    z = LAB_CONSTANTS.Zn * lab_xyz(z);
    r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);
    g = xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z);
    b = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);
    r = limit(r, 0, 255);
    g = limit(g, 0, 255);
    b = limit(b, 0, 255);
    return [r, g, b, args.length > 3 ? args[3] : 1];
  };

  xyz_rgb = function(r) {
    return round(255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow(r, 1 / 2.4) - 0.055));
  };

  lab_xyz = function(t) {
    if (t > LAB_CONSTANTS.t1) {
      return t * t * t;
    } else {
      return LAB_CONSTANTS.t2 * (t - LAB_CONSTANTS.t0);
    }
  };

  LAB_CONSTANTS = {
    Kn: 18,
    Xn: 0.950470,
    Yn: 1,
    Zn: 1.088830,
    t0: 0.137931034,
    t1: 0.206896552,
    t2: 0.12841855,
    t3: 0.008856452
  };

  rgb2lab = function() {
    var b, g, r, ref, ref1, x, y, z;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    ref1 = rgb2xyz(r, g, b), x = ref1[0], y = ref1[1], z = ref1[2];
    return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
  };

  rgb_xyz = function(r) {
    if ((r /= 255) <= 0.04045) {
      return r / 12.92;
    } else {
      return pow((r + 0.055) / 1.055, 2.4);
    }
  };

  xyz_lab = function(t) {
    if (t > LAB_CONSTANTS.t3) {
      return pow(t, 1 / 3);
    } else {
      return t / LAB_CONSTANTS.t2 + LAB_CONSTANTS.t0;
    }
  };

  rgb2xyz = function() {
    var b, g, r, ref, x, y, z;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    r = rgb_xyz(r);
    g = rgb_xyz(g);
    b = rgb_xyz(b);
    x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / LAB_CONSTANTS.Xn);
    y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / LAB_CONSTANTS.Yn);
    z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / LAB_CONSTANTS.Zn);
    return [x, y, z];
  };

  chroma.lab = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['lab']), function(){});
  };

  _input.lab = lab2rgb;

  Color.prototype.lab = function() {
    return rgb2lab(this._rgb);
  };

  bezier = function(colors) {
    var I, I0, I1, c, lab0, lab1, lab2, lab3, ref, ref1, ref2;
    colors = (function() {
      var len, o, results;
      results = [];
      for (o = 0, len = colors.length; o < len; o++) {
        c = colors[o];
        results.push(chroma(c));
      }
      return results;
    })();
    if (colors.length === 2) {
      ref = (function() {
        var len, o, results;
        results = [];
        for (o = 0, len = colors.length; o < len; o++) {
          c = colors[o];
          results.push(c.lab());
        }
        return results;
      })(), lab0 = ref[0], lab1 = ref[1];
      I = function(t) {
        var i, lab;
        lab = (function() {
          var o, results;
          results = [];
          for (i = o = 0; o <= 2; i = ++o) {
            results.push(lab0[i] + t * (lab1[i] - lab0[i]));
          }
          return results;
        })();
        return chroma.lab.apply(chroma, lab);
      };
    } else if (colors.length === 3) {
      ref1 = (function() {
        var len, o, results;
        results = [];
        for (o = 0, len = colors.length; o < len; o++) {
          c = colors[o];
          results.push(c.lab());
        }
        return results;
      })(), lab0 = ref1[0], lab1 = ref1[1], lab2 = ref1[2];
      I = function(t) {
        var i, lab;
        lab = (function() {
          var o, results;
          results = [];
          for (i = o = 0; o <= 2; i = ++o) {
            results.push((1 - t) * (1 - t) * lab0[i] + 2 * (1 - t) * t * lab1[i] + t * t * lab2[i]);
          }
          return results;
        })();
        return chroma.lab.apply(chroma, lab);
      };
    } else if (colors.length === 4) {
      ref2 = (function() {
        var len, o, results;
        results = [];
        for (o = 0, len = colors.length; o < len; o++) {
          c = colors[o];
          results.push(c.lab());
        }
        return results;
      })(), lab0 = ref2[0], lab1 = ref2[1], lab2 = ref2[2], lab3 = ref2[3];
      I = function(t) {
        var i, lab;
        lab = (function() {
          var o, results;
          results = [];
          for (i = o = 0; o <= 2; i = ++o) {
            results.push((1 - t) * (1 - t) * (1 - t) * lab0[i] + 3 * (1 - t) * (1 - t) * t * lab1[i] + 3 * (1 - t) * t * t * lab2[i] + t * t * t * lab3[i]);
          }
          return results;
        })();
        return chroma.lab.apply(chroma, lab);
      };
    } else if (colors.length === 5) {
      I0 = bezier(colors.slice(0, 3));
      I1 = bezier(colors.slice(2, 5));
      I = function(t) {
        if (t < 0.5) {
          return I0(t * 2);
        } else {
          return I1((t - 0.5) * 2);
        }
      };
    }
    return I;
  };

  chroma.bezier = function(colors) {
    var f;
    f = bezier(colors);
    f.scale = function() {
      return chroma.scale(f);
    };
    return f;
  };


  /*
      chroma.js
  
      Copyright (c) 2011-2013, Gregor Aisch
      All rights reserved.
  
      Redistribution and use in source and binary forms, with or without
      modification, are permitted provided that the following conditions are met:
  
      * Redistributions of source code must retain the above copyright notice, this
        list of conditions and the following disclaimer.
  
      * Redistributions in binary form must reproduce the above copyright notice,
        this list of conditions and the following disclaimer in the documentation
        and/or other materials provided with the distribution.
  
      * The name Gregor Aisch may not be used to endorse or promote products
        derived from this software without specific prior written permission.
  
      THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
      AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
      IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
      DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
      INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
      BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
      DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
      OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
      NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
      EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  
      @source: https://github.com/gka/chroma.js
   */

  chroma.cubehelix = function(start, rotations, hue, gamma, lightness) {
    var dh, dl, f;
    if (start == null) {
      start = 300;
    }
    if (rotations == null) {
      rotations = -1.5;
    }
    if (hue == null) {
      hue = 1;
    }
    if (gamma == null) {
      gamma = 1;
    }
    if (lightness == null) {
      lightness = [0, 1];
    }
    dl = lightness[1] - lightness[0];
    dh = 0;
    f = function(fract) {
      var a, amp, b, cos_a, g, h, l, r, sin_a;
      a = TWOPI * ((start + 120) / 360 + rotations * fract);
      l = pow(lightness[0] + dl * fract, gamma);
      h = dh !== 0 ? hue[0] + fract * dh : hue;
      amp = h * l * (1 - l) / 2;
      cos_a = cos(a);
      sin_a = sin(a);
      r = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
      g = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
      b = l + amp * (+1.97294 * cos_a);
      return chroma(clip_rgb([r * 255, g * 255, b * 255]));
    };
    f.start = function(s) {
      if (s == null) {
        return start;
      }
      start = s;
      return f;
    };
    f.rotations = function(r) {
      if (r == null) {
        return rotations;
      }
      rotations = r;
      return f;
    };
    f.gamma = function(g) {
      if (g == null) {
        return gamma;
      }
      gamma = g;
      return f;
    };
    f.hue = function(h) {
      if (h == null) {
        return hue;
      }
      hue = h;
      if (type(hue) === 'array') {
        dh = hue[1] - hue[0];
        if (dh === 0) {
          hue = hue[1];
        }
      } else {
        dh = 0;
      }
      return f;
    };
    f.lightness = function(h) {
      if (h == null) {
        return lightness;
      }
      lightness = h;
      if (type(lightness) === 'array') {
        dl = lightness[1] - lightness[0];
        if (dl === 0) {
          lightness = lightness[1];
        }
      } else {
        dl = 0;
      }
      return f;
    };
    f.scale = function() {
      return chroma.scale(f);
    };
    f.hue(hue);
    return f;
  };

  chroma.random = function() {
    var code, digits, i, o;
    digits = '0123456789abcdef';
    code = '#';
    for (i = o = 0; o < 6; i = ++o) {
      code += digits.charAt(floor(Math.random() * 16));
    }
    return new Color(code);
  };

  chroma.average = function(colors) {
    var a, b, c, g, l, len, o, r, rgba;
    r = g = b = a = 0;
    l = colors.length;
    for (o = 0, len = colors.length; o < len; o++) {
      c = colors[o];
      rgba = chroma(c).rgba();
      r += rgba[0];
      g += rgba[1];
      b += rgba[2];
      a += rgba[3];
    }
    return new Color(r / l, g / l, b / l, a / l);
  };

  _input.rgb = function() {
    var k, ref, results, v;
    ref = unpack(arguments);
    results = [];
    for (k in ref) {
      v = ref[k];
      results.push(v);
    }
    return results;
  };

  chroma.rgb = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['rgb']), function(){});
  };

  Color.prototype.rgb = function() {
    return this._rgb.slice(0, 3);
  };

  Color.prototype.rgba = function() {
    return this._rgb;
  };

  _guess_formats.push({
    p: 15,
    test: function(n) {
      var a;
      a = unpack(arguments);
      if (type(a) === 'array' && a.length === 3) {
        return 'rgb';
      }
      if (a.length === 4 && type(a[3]) === "number" && a[3] >= 0 && a[3] <= 1) {
        return 'rgb';
      }
    }
  });

  hex2rgb = function(hex) {
    var a, b, g, r, rgb, u;
    if (hex.match(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      if (hex.length === 4 || hex.length === 7) {
        hex = hex.substr(1);
      }
      if (hex.length === 3) {
        hex = hex.split("");
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      u = parseInt(hex, 16);
      r = u >> 16;
      g = u >> 8 & 0xFF;
      b = u & 0xFF;
      return [r, g, b, 1];
    }
    if (hex.match(/^#?([A-Fa-f0-9]{8})$/)) {
      if (hex.length === 9) {
        hex = hex.substr(1);
      }
      u = parseInt(hex, 16);
      r = u >> 24 & 0xFF;
      g = u >> 16 & 0xFF;
      b = u >> 8 & 0xFF;
      a = round((u & 0xFF) / 0xFF * 100) / 100;
      return [r, g, b, a];
    }
    if ((_input.css != null) && (rgb = _input.css(hex))) {
      return rgb;
    }
    throw "unknown color: " + hex;
  };

  rgb2hex = function(channels, mode) {
    var a, b, g, hxa, r, str, u;
    if (mode == null) {
      mode = 'rgb';
    }
    r = channels[0], g = channels[1], b = channels[2], a = channels[3];
    u = r << 16 | g << 8 | b;
    str = "000000" + u.toString(16);
    str = str.substr(str.length - 6);
    hxa = '0' + round(a * 255).toString(16);
    hxa = hxa.substr(hxa.length - 2);
    return "#" + (function() {
      switch (mode.toLowerCase()) {
        case 'rgba':
          return str + hxa;
        case 'argb':
          return hxa + str;
        default:
          return str;
      }
    })();
  };

  _input.hex = function(h) {
    return hex2rgb(h);
  };

  chroma.hex = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['hex']), function(){});
  };

  Color.prototype.hex = function(mode) {
    if (mode == null) {
      mode = 'rgb';
    }
    return rgb2hex(this._rgb, mode);
  };

  _guess_formats.push({
    p: 10,
    test: function(n) {
      if (arguments.length === 1 && type(n) === "string") {
        return 'hex';
      }
    }
  });

  hsl2rgb = function() {
    var args, b, c, g, h, i, l, o, r, ref, s, t1, t2, t3;
    args = unpack(arguments);
    h = args[0], s = args[1], l = args[2];
    if (s === 0) {
      r = g = b = l * 255;
    } else {
      t3 = [0, 0, 0];
      c = [0, 0, 0];
      t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
      t1 = 2 * l - t2;
      h /= 360;
      t3[0] = h + 1 / 3;
      t3[1] = h;
      t3[2] = h - 1 / 3;
      for (i = o = 0; o <= 2; i = ++o) {
        if (t3[i] < 0) {
          t3[i] += 1;
        }
        if (t3[i] > 1) {
          t3[i] -= 1;
        }
        if (6 * t3[i] < 1) {
          c[i] = t1 + (t2 - t1) * 6 * t3[i];
        } else if (2 * t3[i] < 1) {
          c[i] = t2;
        } else if (3 * t3[i] < 2) {
          c[i] = t1 + (t2 - t1) * ((2 / 3) - t3[i]) * 6;
        } else {
          c[i] = t1;
        }
      }
      ref = [round(c[0] * 255), round(c[1] * 255), round(c[2] * 255)], r = ref[0], g = ref[1], b = ref[2];
    }
    if (args.length > 3) {
      return [r, g, b, args[3]];
    } else {
      return [r, g, b];
    }
  };

  rgb2hsl = function(r, g, b) {
    var h, l, min, ref, s;
    if (r !== void 0 && r.length >= 3) {
      ref = r, r = ref[0], g = ref[1], b = ref[2];
    }
    r /= 255;
    g /= 255;
    b /= 255;
    min = Math.min(r, g, b);
    max = Math.max(r, g, b);
    l = (max + min) / 2;
    if (max === min) {
      s = 0;
      h = Number.NaN;
    } else {
      s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
    }
    if (r === max) {
      h = (g - b) / (max - min);
    } else if (g === max) {
      h = 2 + (b - r) / (max - min);
    } else if (b === max) {
      h = 4 + (r - g) / (max - min);
    }
    h *= 60;
    if (h < 0) {
      h += 360;
    }
    return [h, s, l];
  };

  chroma.hsl = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['hsl']), function(){});
  };

  _input.hsl = hsl2rgb;

  Color.prototype.hsl = function() {
    return rgb2hsl(this._rgb);
  };

  hsv2rgb = function() {
    var args, b, f, g, h, i, p, q, r, ref, ref1, ref2, ref3, ref4, ref5, s, t, v;
    args = unpack(arguments);
    h = args[0], s = args[1], v = args[2];
    v *= 255;
    if (s === 0) {
      r = g = b = v;
    } else {
      if (h === 360) {
        h = 0;
      }
      if (h > 360) {
        h -= 360;
      }
      if (h < 0) {
        h += 360;
      }
      h /= 60;
      i = floor(h);
      f = h - i;
      p = v * (1 - s);
      q = v * (1 - s * f);
      t = v * (1 - s * (1 - f));
      switch (i) {
        case 0:
          ref = [v, t, p], r = ref[0], g = ref[1], b = ref[2];
          break;
        case 1:
          ref1 = [q, v, p], r = ref1[0], g = ref1[1], b = ref1[2];
          break;
        case 2:
          ref2 = [p, v, t], r = ref2[0], g = ref2[1], b = ref2[2];
          break;
        case 3:
          ref3 = [p, q, v], r = ref3[0], g = ref3[1], b = ref3[2];
          break;
        case 4:
          ref4 = [t, p, v], r = ref4[0], g = ref4[1], b = ref4[2];
          break;
        case 5:
          ref5 = [v, p, q], r = ref5[0], g = ref5[1], b = ref5[2];
      }
    }
    r = round(r);
    g = round(g);
    b = round(b);
    return [r, g, b, args.length > 3 ? args[3] : 1];
  };

  rgb2hsv = function() {
    var b, delta, g, h, min, r, ref, s, v;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    min = Math.min(r, g, b);
    max = Math.max(r, g, b);
    delta = max - min;
    v = max / 255.0;
    if (max === 0) {
      h = Number.NaN;
      s = 0;
    } else {
      s = delta / max;
      if (r === max) {
        h = (g - b) / delta;
      }
      if (g === max) {
        h = 2 + (b - r) / delta;
      }
      if (b === max) {
        h = 4 + (r - g) / delta;
      }
      h *= 60;
      if (h < 0) {
        h += 360;
      }
    }
    return [h, s, v];
  };

  chroma.hsv = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['hsv']), function(){});
  };

  _input.hsv = hsv2rgb;

  Color.prototype.hsv = function() {
    return rgb2hsv(this._rgb);
  };

  num2rgb = function(num) {
    var b, g, r;
    if (type(num) === "number" && num >= 0 && num <= 0xFFFFFF) {
      r = num >> 16;
      g = (num >> 8) & 0xFF;
      b = num & 0xFF;
      return [r, g, b, 1];
    }
    console.warn("unknown num color: " + num);
    return [0, 0, 0, 1];
  };

  rgb2num = function() {
    var b, g, r, ref;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    return (r << 16) + (g << 8) + b;
  };

  chroma.num = function(num) {
    return new Color(num, 'num');
  };

  Color.prototype.num = function(mode) {
    if (mode == null) {
      mode = 'rgb';
    }
    return rgb2num(this._rgb, mode);
  };

  _input.num = num2rgb;

  _guess_formats.push({
    p: 10,
    test: function(n) {
      if (arguments.length === 1 && type(n) === "number" && n >= 0 && n <= 0xFFFFFF) {
        return 'num';
      }
    }
  });

  css2rgb = function(css) {
    var aa, ab, hsl, i, m, o, rgb, w;
    css = css.toLowerCase();
    if ((chroma.colors != null) && chroma.colors[css]) {
      return hex2rgb(chroma.colors[css]);
    }
    if (m = css.match(/rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/)) {
      rgb = m.slice(1, 4);
      for (i = o = 0; o <= 2; i = ++o) {
        rgb[i] = +rgb[i];
      }
      rgb[3] = 1;
    } else if (m = css.match(/rgba\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*([01]|[01]?\.\d+)\)/)) {
      rgb = m.slice(1, 5);
      for (i = w = 0; w <= 3; i = ++w) {
        rgb[i] = +rgb[i];
      }
    } else if (m = css.match(/rgb\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/)) {
      rgb = m.slice(1, 4);
      for (i = aa = 0; aa <= 2; i = ++aa) {
        rgb[i] = round(rgb[i] * 2.55);
      }
      rgb[3] = 1;
    } else if (m = css.match(/rgba\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/)) {
      rgb = m.slice(1, 5);
      for (i = ab = 0; ab <= 2; i = ++ab) {
        rgb[i] = round(rgb[i] * 2.55);
      }
      rgb[3] = +rgb[3];
    } else if (m = css.match(/hsl\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/)) {
      hsl = m.slice(1, 4);
      hsl[1] *= 0.01;
      hsl[2] *= 0.01;
      rgb = hsl2rgb(hsl);
      rgb[3] = 1;
    } else if (m = css.match(/hsla\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/)) {
      hsl = m.slice(1, 4);
      hsl[1] *= 0.01;
      hsl[2] *= 0.01;
      rgb = hsl2rgb(hsl);
      rgb[3] = +m[4];
    }
    return rgb;
  };

  rgb2css = function(rgba) {
    var mode;
    mode = rgba[3] < 1 ? 'rgba' : 'rgb';
    if (mode === 'rgb') {
      return mode + '(' + rgba.slice(0, 3).map(round).join(',') + ')';
    } else if (mode === 'rgba') {
      return mode + '(' + rgba.slice(0, 3).map(round).join(',') + ',' + rgba[3] + ')';
    } else {

    }
  };

  rnd = function(a) {
    return round(a * 100) / 100;
  };

  hsl2css = function(hsl, alpha) {
    var mode;
    mode = alpha < 1 ? 'hsla' : 'hsl';
    hsl[0] = rnd(hsl[0] || 0);
    hsl[1] = rnd(hsl[1] * 100) + '%';
    hsl[2] = rnd(hsl[2] * 100) + '%';
    if (mode === 'hsla') {
      hsl[3] = alpha;
    }
    return mode + '(' + hsl.join(',') + ')';
  };

  _input.css = function(h) {
    return css2rgb(h);
  };

  chroma.css = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['css']), function(){});
  };

  Color.prototype.css = function(mode) {
    if (mode == null) {
      mode = 'rgb';
    }
    if (mode.slice(0, 3) === 'rgb') {
      return rgb2css(this._rgb);
    } else if (mode.slice(0, 3) === 'hsl') {
      return hsl2css(this.hsl(), this.alpha());
    }
  };

  _input.named = function(name) {
    return hex2rgb(w3cx11[name]);
  };

  _guess_formats.push({
    p: 20,
    test: function(n) {
      if (arguments.length === 1 && (w3cx11[n] != null)) {
        return 'named';
      }
    }
  });

  Color.prototype.name = function(n) {
    var h, k;
    if (arguments.length) {
      if (w3cx11[n]) {
        this._rgb = hex2rgb(w3cx11[n]);
      }
      this._rgb[3] = 1;
      this;
    }
    h = this.hex();
    for (k in w3cx11) {
      if (h === w3cx11[k]) {
        return k;
      }
    }
    return h;
  };

  lch2lab = function() {

    /*
    Convert from a qualitative parameter h and a quantitative parameter l to a 24-bit pixel.
    These formulas were invented by David Dalrymple to obtain maximum contrast without going
    out of gamut if the parameters are in the range 0-1.
    
    A saturation multiplier was added by Gregor Aisch
     */
    var c, h, l, ref;
    ref = unpack(arguments), l = ref[0], c = ref[1], h = ref[2];
    h = h * DEG2RAD;
    return [l, cos(h) * c, sin(h) * c];
  };

  lch2rgb = function() {
    var L, a, args, b, c, g, h, l, r, ref, ref1;
    args = unpack(arguments);
    l = args[0], c = args[1], h = args[2];
    ref = lch2lab(l, c, h), L = ref[0], a = ref[1], b = ref[2];
    ref1 = lab2rgb(L, a, b), r = ref1[0], g = ref1[1], b = ref1[2];
    return [limit(r, 0, 255), limit(g, 0, 255), limit(b, 0, 255), args.length > 3 ? args[3] : 1];
  };

  lab2lch = function() {
    var a, b, c, h, l, ref;
    ref = unpack(arguments), l = ref[0], a = ref[1], b = ref[2];
    c = sqrt(a * a + b * b);
    h = (atan2(b, a) * RAD2DEG + 360) % 360;
    if (round(c * 10000) === 0) {
      h = Number.NaN;
    }
    return [l, c, h];
  };

  rgb2lch = function() {
    var a, b, g, l, r, ref, ref1;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    ref1 = rgb2lab(r, g, b), l = ref1[0], a = ref1[1], b = ref1[2];
    return lab2lch(l, a, b);
  };

  chroma.lch = function() {
    var args;
    args = unpack(arguments);
    return new Color(args, 'lch');
  };

  chroma.hcl = function() {
    var args;
    args = unpack(arguments);
    return new Color(args, 'hcl');
  };

  _input.lch = lch2rgb;

  _input.hcl = function() {
    var c, h, l, ref;
    ref = unpack(arguments), h = ref[0], c = ref[1], l = ref[2];
    return lch2rgb([l, c, h]);
  };

  Color.prototype.lch = function() {
    return rgb2lch(this._rgb);
  };

  Color.prototype.hcl = function() {
    return rgb2lch(this._rgb).reverse();
  };

  rgb2cmyk = function(mode) {
    var b, c, f, g, k, m, r, ref, y;
    if (mode == null) {
      mode = 'rgb';
    }
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    r = r / 255;
    g = g / 255;
    b = b / 255;
    k = 1 - Math.max(r, Math.max(g, b));
    f = k < 1 ? 1 / (1 - k) : 0;
    c = (1 - r - k) * f;
    m = (1 - g - k) * f;
    y = (1 - b - k) * f;
    return [c, m, y, k];
  };

  cmyk2rgb = function() {
    var alpha, args, b, c, g, k, m, r, y;
    args = unpack(arguments);
    c = args[0], m = args[1], y = args[2], k = args[3];
    alpha = args.length > 4 ? args[4] : 1;
    if (k === 1) {
      return [0, 0, 0, alpha];
    }
    r = c >= 1 ? 0 : round(255 * (1 - c) * (1 - k));
    g = m >= 1 ? 0 : round(255 * (1 - m) * (1 - k));
    b = y >= 1 ? 0 : round(255 * (1 - y) * (1 - k));
    return [r, g, b, alpha];
  };

  _input.cmyk = function() {
    return cmyk2rgb(unpack(arguments));
  };

  chroma.cmyk = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['cmyk']), function(){});
  };

  Color.prototype.cmyk = function() {
    return rgb2cmyk(this._rgb);
  };

  _input.gl = function() {
    var i, k, o, rgb, v;
    rgb = (function() {
      var ref, results;
      ref = unpack(arguments);
      results = [];
      for (k in ref) {
        v = ref[k];
        results.push(v);
      }
      return results;
    }).apply(this, arguments);
    for (i = o = 0; o <= 2; i = ++o) {
      rgb[i] *= 255;
    }
    return rgb;
  };

  chroma.gl = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['gl']), function(){});
  };

  Color.prototype.gl = function() {
    var rgb;
    rgb = this._rgb;
    return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, rgb[3]];
  };

  rgb2luminance = function(r, g, b) {
    var ref;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    r = luminance_x(r);
    g = luminance_x(g);
    b = luminance_x(b);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  luminance_x = function(x) {
    x /= 255;
    if (x <= 0.03928) {
      return x / 12.92;
    } else {
      return pow((x + 0.055) / 1.055, 2.4);
    }
  };

  _interpolators = [];

  interpolate = function(col1, col2, f, m) {
    var interpol, len, o, res;
    if (f == null) {
      f = 0.5;
    }
    if (m == null) {
      m = 'rgb';
    }

    /*
    interpolates between colors
    f = 0 --> me
    f = 1 --> col
     */
    if (type(col1) !== 'object') {
      col1 = chroma(col1);
    }
    if (type(col2) !== 'object') {
      col2 = chroma(col2);
    }
    for (o = 0, len = _interpolators.length; o < len; o++) {
      interpol = _interpolators[o];
      if (m === interpol[0]) {
        res = interpol[1](col1, col2, f, m);
        break;
      }
    }
    if (res == null) {
      throw "color mode " + m + " is not supported";
    }
    res.alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
    return res;
  };

  chroma.interpolate = interpolate;

  Color.prototype.interpolate = function(col2, f, m) {
    return interpolate(this, col2, f, m);
  };

  chroma.mix = interpolate;

  Color.prototype.mix = Color.prototype.interpolate;

  interpolate_rgb = function(col1, col2, f, m) {
    var xyz0, xyz1;
    xyz0 = col1._rgb;
    xyz1 = col2._rgb;
    return new Color(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), m);
  };

  _interpolators.push(['rgb', interpolate_rgb]);

  Color.prototype.luminance = function(lum, mode) {
    var cur_lum, eps, max_iter, test;
    if (mode == null) {
      mode = 'rgb';
    }
    if (!arguments.length) {
      return rgb2luminance(this._rgb);
    }
    if (lum === 0) {
      this._rgb = [0, 0, 0, this._rgb[3]];
    } else if (lum === 1) {
      this._rgb = [255, 255, 255, this._rgb[3]];
    } else {
      eps = 1e-7;
      max_iter = 20;
      test = function(l, h) {
        var lm, m;
        m = l.interpolate(h, 0.5, mode);
        lm = m.luminance();
        if (Math.abs(lum - lm) < eps || !max_iter--) {
          return m;
        }
        if (lm > lum) {
          return test(l, m);
        }
        return test(m, h);
      };
      cur_lum = rgb2luminance(this._rgb);
      this._rgb = (cur_lum > lum ? test(chroma('black'), this) : test(this, chroma('white'))).rgba();
    }
    return this;
  };

  temperature2rgb = function(kelvin) {
    var b, g, r, temp;
    temp = kelvin / 100;
    if (temp < 66) {
      r = 255;
      g = -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log(g);
      b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log(b);
    } else {
      r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log(r);
      g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log(g);
      b = 255;
    }
    return clip_rgb([r, g, b]);
  };

  rgb2temperature = function() {
    var b, eps, g, maxTemp, minTemp, r, ref, rgb, temp;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    minTemp = 1000;
    maxTemp = 40000;
    eps = 0.4;
    while (maxTemp - minTemp > eps) {
      temp = (maxTemp + minTemp) * 0.5;
      rgb = temperature2rgb(temp);
      if ((rgb[2] / rgb[0]) >= (b / r)) {
        maxTemp = temp;
      } else {
        minTemp = temp;
      }
    }
    return round(temp);
  };

  chroma.temperature = chroma.kelvin = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['temperature']), function(){});
  };

  _input.temperature = _input.kelvin = _input.K = temperature2rgb;

  Color.prototype.temperature = function() {
    return rgb2temperature(this._rgb);
  };

  Color.prototype.kelvin = Color.prototype.temperature;

  chroma.contrast = function(a, b) {
    var l1, l2, ref, ref1;
    if ((ref = type(a)) === 'string' || ref === 'number') {
      a = new Color(a);
    }
    if ((ref1 = type(b)) === 'string' || ref1 === 'number') {
      b = new Color(b);
    }
    l1 = a.luminance();
    l2 = b.luminance();
    if (l1 > l2) {
      return (l1 + 0.05) / (l2 + 0.05);
    } else {
      return (l2 + 0.05) / (l1 + 0.05);
    }
  };

  Color.prototype.get = function(modechan) {
    var channel, i, me, mode, ref, src;
    me = this;
    ref = modechan.split('.'), mode = ref[0], channel = ref[1];
    src = me[mode]();
    if (channel) {
      i = mode.indexOf(channel);
      if (i > -1) {
        return src[i];
      } else {
        return console.warn('unknown channel ' + channel + ' in mode ' + mode);
      }
    } else {
      return src;
    }
  };

  Color.prototype.set = function(modechan, value) {
    var channel, i, me, mode, ref, src;
    me = this;
    ref = modechan.split('.'), mode = ref[0], channel = ref[1];
    if (channel) {
      src = me[mode]();
      i = mode.indexOf(channel);
      if (i > -1) {
        if (type(value) === 'string') {
          switch (value.charAt(0)) {
            case '+':
              src[i] += +value;
              break;
            case '-':
              src[i] += +value;
              break;
            case '*':
              src[i] *= +(value.substr(1));
              break;
            case '/':
              src[i] /= +(value.substr(1));
              break;
            default:
              src[i] = +value;
          }
        } else {
          src[i] = value;
        }
      } else {
        console.warn('unknown channel ' + channel + ' in mode ' + mode);
      }
    } else {
      src = value;
    }
    me._rgb = chroma(src, mode).alpha(me.alpha())._rgb;
    return me;
  };

  Color.prototype.darken = function(amount) {
    var lab, me;
    if (amount == null) {
      amount = 1;
    }
    me = this;
    lab = me.lab();
    lab[0] -= LAB_CONSTANTS.Kn * amount;
    return chroma.lab(lab).alpha(me.alpha());
  };

  Color.prototype.brighten = function(amount) {
    if (amount == null) {
      amount = 1;
    }
    return this.darken(-amount);
  };

  Color.prototype.darker = Color.prototype.darken;

  Color.prototype.brighter = Color.prototype.brighten;

  Color.prototype.saturate = function(amount) {
    var lch, me;
    if (amount == null) {
      amount = 1;
    }
    me = this;
    lch = me.lch();
    lch[1] += amount * LAB_CONSTANTS.Kn;
    if (lch[1] < 0) {
      lch[1] = 0;
    }
    return chroma.lch(lch).alpha(me.alpha());
  };

  Color.prototype.desaturate = function(amount) {
    if (amount == null) {
      amount = 1;
    }
    return this.saturate(-amount);
  };

  Color.prototype.premultiply = function() {
    var a, rgb;
    rgb = this.rgb();
    a = this.alpha();
    return chroma(rgb[0] * a, rgb[1] * a, rgb[2] * a, a);
  };

  blend = function(bottom, top, mode) {
    if (!blend[mode]) {
      throw 'unknown blend mode ' + mode;
    }
    return blend[mode](bottom, top);
  };

  blend_f = function(f) {
    return function(bottom, top) {
      var c0, c1;
      c0 = chroma(top).rgb();
      c1 = chroma(bottom).rgb();
      return chroma(f(c0, c1), 'rgb');
    };
  };

  each = function(f) {
    return function(c0, c1) {
      var i, o, out;
      out = [];
      for (i = o = 0; o <= 3; i = ++o) {
        out[i] = f(c0[i], c1[i]);
      }
      return out;
    };
  };

  normal = function(a, b) {
    return a;
  };

  multiply = function(a, b) {
    return a * b / 255;
  };

  darken = function(a, b) {
    if (a > b) {
      return b;
    } else {
      return a;
    }
  };

  lighten = function(a, b) {
    if (a > b) {
      return a;
    } else {
      return b;
    }
  };

  screen = function(a, b) {
    return 255 * (1 - (1 - a / 255) * (1 - b / 255));
  };

  overlay = function(a, b) {
    if (b < 128) {
      return 2 * a * b / 255;
    } else {
      return 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255));
    }
  };

  burn = function(a, b) {
    return 255 * (1 - (1 - b / 255) / (a / 255));
  };

  dodge = function(a, b) {
    if (a === 255) {
      return 255;
    }
    a = 255 * (b / 255) / (1 - a / 255);
    if (a > 255) {
      return 255;
    } else {
      return a;
    }
  };

  blend.normal = blend_f(each(normal));

  blend.multiply = blend_f(each(multiply));

  blend.screen = blend_f(each(screen));

  blend.overlay = blend_f(each(overlay));

  blend.darken = blend_f(each(darken));

  blend.lighten = blend_f(each(lighten));

  blend.dodge = blend_f(each(dodge));

  blend.burn = blend_f(each(burn));

  chroma.blend = blend;

  chroma.analyze = function(data) {
    var len, o, r, val;
    r = {
      min: Number.MAX_VALUE,
      max: Number.MAX_VALUE * -1,
      sum: 0,
      values: [],
      count: 0
    };
    for (o = 0, len = data.length; o < len; o++) {
      val = data[o];
      if ((val != null) && !isNaN(val)) {
        r.values.push(val);
        r.sum += val;
        if (val < r.min) {
          r.min = val;
        }
        if (val > r.max) {
          r.max = val;
        }
        r.count += 1;
      }
    }
    r.domain = [r.min, r.max];
    r.limits = function(mode, num) {
      return chroma.limits(r, mode, num);
    };
    return r;
  };

  chroma.scale = function(colors, positions) {
    var _classes, _colorCache, _colors, _correctLightness, _domain, _fixed, _max, _min, _mode, _nacol, _out, _padding, _pos, _spread, classifyValue, f, getClass, getColor, resetCache, setColors, tmap;
    _mode = 'rgb';
    _nacol = chroma('#ccc');
    _spread = 0;
    _fixed = false;
    _domain = [0, 1];
    _pos = [];
    _padding = [0, 0];
    _classes = false;
    _colors = [];
    _out = false;
    _min = 0;
    _max = 1;
    _correctLightness = false;
    _colorCache = {};
    setColors = function(colors) {
      var c, col, o, ref, ref1, ref2, w;
      if (colors == null) {
        colors = ['#fff', '#000'];
      }
      if ((colors != null) && type(colors) === 'string' && (((ref = chroma.brewer) != null ? ref[colors] : void 0) != null)) {
        colors = chroma.brewer[colors];
      }
      if (type(colors) === 'array') {
        colors = colors.slice(0);
        for (c = o = 0, ref1 = colors.length - 1; 0 <= ref1 ? o <= ref1 : o >= ref1; c = 0 <= ref1 ? ++o : --o) {
          col = colors[c];
          if (type(col) === "string") {
            colors[c] = chroma(col);
          }
        }
        _pos.length = 0;
        for (c = w = 0, ref2 = colors.length - 1; 0 <= ref2 ? w <= ref2 : w >= ref2; c = 0 <= ref2 ? ++w : --w) {
          _pos.push(c / (colors.length - 1));
        }
      }
      resetCache();
      return _colors = colors;
    };
    getClass = function(value) {
      var i, n;
      if (_classes != null) {
        n = _classes.length - 1;
        i = 0;
        while (i < n && value >= _classes[i]) {
          i++;
        }
        return i - 1;
      }
      return 0;
    };
    tmap = function(t) {
      return t;
    };
    classifyValue = function(value) {
      var i, maxc, minc, n, val;
      val = value;
      if (_classes.length > 2) {
        n = _classes.length - 1;
        i = getClass(value);
        minc = _classes[0] + (_classes[1] - _classes[0]) * (0 + _spread * 0.5);
        maxc = _classes[n - 1] + (_classes[n] - _classes[n - 1]) * (1 - _spread * 0.5);
        val = _min + ((_classes[i] + (_classes[i + 1] - _classes[i]) * 0.5 - minc) / (maxc - minc)) * (_max - _min);
      }
      return val;
    };
    getColor = function(val, bypassMap) {
      var c, col, i, k, o, p, ref, t;
      if (bypassMap == null) {
        bypassMap = false;
      }
      if (isNaN(val)) {
        return _nacol;
      }
      if (!bypassMap) {
        if (_classes && _classes.length > 2) {
          c = getClass(val);
          t = c / (_classes.length - 2);
          t = _padding[0] + (t * (1 - _padding[0] - _padding[1]));
        } else if (_max !== _min) {
          t = (val - _min) / (_max - _min);
          t = _padding[0] + (t * (1 - _padding[0] - _padding[1]));
          t = Math.min(1, Math.max(0, t));
        } else {
          t = 1;
        }
      } else {
        t = val;
      }
      if (!bypassMap) {
        t = tmap(t);
      }
      k = Math.floor(t * 10000);
      if (_colorCache[k]) {
        col = _colorCache[k];
      } else {
        if (type(_colors) === 'array') {
          for (i = o = 0, ref = _pos.length - 1; 0 <= ref ? o <= ref : o >= ref; i = 0 <= ref ? ++o : --o) {
            p = _pos[i];
            if (t <= p) {
              col = _colors[i];
              break;
            }
            if (t >= p && i === _pos.length - 1) {
              col = _colors[i];
              break;
            }
            if (t > p && t < _pos[i + 1]) {
              t = (t - p) / (_pos[i + 1] - p);
              col = chroma.interpolate(_colors[i], _colors[i + 1], t, _mode);
              break;
            }
          }
        } else if (type(_colors) === 'function') {
          col = _colors(t);
        }
        _colorCache[k] = col;
      }
      return col;
    };
    resetCache = function() {
      return _colorCache = {};
    };
    setColors(colors);
    f = function(v) {
      var c;
      c = chroma(getColor(v));
      if (_out && c[_out]) {
        return c[_out]();
      } else {
        return c;
      }
    };
    f.classes = function(classes) {
      var d;
      if (classes != null) {
        if (type(classes) === 'array') {
          _classes = classes;
          _domain = [classes[0], classes[classes.length - 1]];
        } else {
          d = chroma.analyze(_domain);
          if (classes === 0) {
            _classes = [d.min, d.max];
          } else {
            _classes = chroma.limits(d, 'e', classes);
          }
        }
        return f;
      }
      return _classes;
    };
    f.domain = function(domain) {
      var c, d, k, len, o, ref, w;
      if (!arguments.length) {
        return _domain;
      }
      _min = domain[0];
      _max = domain[domain.length - 1];
      _pos = [];
      k = _colors.length;
      if (domain.length === k && _min !== _max) {
        for (o = 0, len = domain.length; o < len; o++) {
          d = domain[o];
          _pos.push((d - _min) / (_max - _min));
        }
      } else {
        for (c = w = 0, ref = k - 1; 0 <= ref ? w <= ref : w >= ref; c = 0 <= ref ? ++w : --w) {
          _pos.push(c / (k - 1));
        }
      }
      _domain = [_min, _max];
      return f;
    };
    f.mode = function(_m) {
      if (!arguments.length) {
        return _mode;
      }
      _mode = _m;
      resetCache();
      return f;
    };
    f.range = function(colors, _pos) {
      setColors(colors, _pos);
      return f;
    };
    f.out = function(_o) {
      _out = _o;
      return f;
    };
    f.spread = function(val) {
      if (!arguments.length) {
        return _spread;
      }
      _spread = val;
      return f;
    };
    f.correctLightness = function(v) {
      if (v == null) {
        v = true;
      }
      _correctLightness = v;
      resetCache();
      if (_correctLightness) {
        tmap = function(t) {
          var L0, L1, L_actual, L_diff, L_ideal, max_iter, pol, t0, t1;
          L0 = getColor(0, true).lab()[0];
          L1 = getColor(1, true).lab()[0];
          pol = L0 > L1;
          L_actual = getColor(t, true).lab()[0];
          L_ideal = L0 + (L1 - L0) * t;
          L_diff = L_actual - L_ideal;
          t0 = 0;
          t1 = 1;
          max_iter = 20;
          while (Math.abs(L_diff) > 1e-2 && max_iter-- > 0) {
            (function() {
              if (pol) {
                L_diff *= -1;
              }
              if (L_diff < 0) {
                t0 = t;
                t += (t1 - t) * 0.5;
              } else {
                t1 = t;
                t += (t0 - t) * 0.5;
              }
              L_actual = getColor(t, true).lab()[0];
              return L_diff = L_actual - L_ideal;
            })();
          }
          return t;
        };
      } else {
        tmap = function(t) {
          return t;
        };
      }
      return f;
    };
    f.padding = function(p) {
      if (p != null) {
        if (type(p) === 'number') {
          p = [p, p];
        }
        _padding = p;
        return f;
      } else {
        return _padding;
      }
    };
    f.colors = function() {
      var dd, dm, i, numColors, o, out, ref, results, samples, w;
      numColors = 0;
      out = 'hex';
      if (arguments.length === 1) {
        if (type(arguments[0]) === 'string') {
          out = arguments[0];
        } else {
          numColors = arguments[0];
        }
      }
      if (arguments.length === 2) {
        numColors = arguments[0], out = arguments[1];
      }
      if (numColors) {
        dm = _domain[0];
        dd = _domain[1] - dm;
        return (function() {
          results = [];
          for (var o = 0; 0 <= numColors ? o < numColors : o > numColors; 0 <= numColors ? o++ : o--){ results.push(o); }
          return results;
        }).apply(this).map(function(i) {
          return f(dm + i / (numColors - 1) * dd)[out]();
        });
      }
      colors = [];
      samples = [];
      if (_classes && _classes.length > 2) {
        for (i = w = 1, ref = _classes.length; 1 <= ref ? w < ref : w > ref; i = 1 <= ref ? ++w : --w) {
          samples.push((_classes[i - 1] + _classes[i]) * 0.5);
        }
      } else {
        samples = _domain;
      }
      return samples.map(function(v) {
        return f(v)[out]();
      });
    };
    return f;
  };

  if (chroma.scales == null) {
    chroma.scales = {};
  }

  chroma.scales.cool = function() {
    return chroma.scale([chroma.hsl(180, 1, .9), chroma.hsl(250, .7, .4)]);
  };

  chroma.scales.hot = function() {
    return chroma.scale(['#000', '#f00', '#ff0', '#fff'], [0, .25, .75, 1]).mode('rgb');
  };

  chroma.analyze = function(data, key, filter) {
    var add, k, len, o, r, val, visit;
    r = {
      min: Number.MAX_VALUE,
      max: Number.MAX_VALUE * -1,
      sum: 0,
      values: [],
      count: 0
    };
    if (filter == null) {
      filter = function() {
        return true;
      };
    }
    add = function(val) {
      if ((val != null) && !isNaN(val)) {
        r.values.push(val);
        r.sum += val;
        if (val < r.min) {
          r.min = val;
        }
        if (val > r.max) {
          r.max = val;
        }
        r.count += 1;
      }
    };
    visit = function(val, k) {
      if (filter(val, k)) {
        if ((key != null) && type(key) === 'function') {
          return add(key(val));
        } else if ((key != null) && type(key) === 'string' || type(key) === 'number') {
          return add(val[key]);
        } else {
          return add(val);
        }
      }
    };
    if (type(data) === 'array') {
      for (o = 0, len = data.length; o < len; o++) {
        val = data[o];
        visit(val);
      }
    } else {
      for (k in data) {
        val = data[k];
        visit(val, k);
      }
    }
    r.domain = [r.min, r.max];
    r.limits = function(mode, num) {
      return chroma.limits(r, mode, num);
    };
    return r;
  };

  chroma.limits = function(data, mode, num) {
    var aa, ab, ac, ad, ae, af, ag, ah, ai, aj, ak, al, am, assignments, best, centroids, cluster, clusterSizes, dist, i, j, kClusters, limits, max_log, min, min_log, mindist, n, nb_iters, newCentroids, o, p, pb, pr, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, repeat, sum, tmpKMeansBreaks, value, values, w;
    if (mode == null) {
      mode = 'equal';
    }
    if (num == null) {
      num = 7;
    }
    if (type(data) === 'array') {
      data = chroma.analyze(data);
    }
    min = data.min;
    max = data.max;
    sum = data.sum;
    values = data.values.sort(function(a, b) {
      return a - b;
    });
    limits = [];
    if (mode.substr(0, 1) === 'c') {
      limits.push(min);
      limits.push(max);
    }
    if (mode.substr(0, 1) === 'e') {
      limits.push(min);
      for (i = o = 1, ref = num - 1; 1 <= ref ? o <= ref : o >= ref; i = 1 <= ref ? ++o : --o) {
        limits.push(min + (i / num) * (max - min));
      }
      limits.push(max);
    } else if (mode.substr(0, 1) === 'l') {
      if (min <= 0) {
        throw 'Logarithmic scales are only possible for values > 0';
      }
      min_log = Math.LOG10E * log(min);
      max_log = Math.LOG10E * log(max);
      limits.push(min);
      for (i = w = 1, ref1 = num - 1; 1 <= ref1 ? w <= ref1 : w >= ref1; i = 1 <= ref1 ? ++w : --w) {
        limits.push(pow(10, min_log + (i / num) * (max_log - min_log)));
      }
      limits.push(max);
    } else if (mode.substr(0, 1) === 'q') {
      limits.push(min);
      for (i = aa = 1, ref2 = num - 1; 1 <= ref2 ? aa <= ref2 : aa >= ref2; i = 1 <= ref2 ? ++aa : --aa) {
        p = values.length * i / num;
        pb = floor(p);
        if (pb === p) {
          limits.push(values[pb]);
        } else {
          pr = p - pb;
          limits.push(values[pb] * pr + values[pb + 1] * (1 - pr));
        }
      }
      limits.push(max);
    } else if (mode.substr(0, 1) === 'k') {

      /*
      implementation based on
      http://code.google.com/p/figue/source/browse/trunk/figue.js#336
      simplified for 1-d input values
       */
      n = values.length;
      assignments = new Array(n);
      clusterSizes = new Array(num);
      repeat = true;
      nb_iters = 0;
      centroids = null;
      centroids = [];
      centroids.push(min);
      for (i = ab = 1, ref3 = num - 1; 1 <= ref3 ? ab <= ref3 : ab >= ref3; i = 1 <= ref3 ? ++ab : --ab) {
        centroids.push(min + (i / num) * (max - min));
      }
      centroids.push(max);
      while (repeat) {
        for (j = ac = 0, ref4 = num - 1; 0 <= ref4 ? ac <= ref4 : ac >= ref4; j = 0 <= ref4 ? ++ac : --ac) {
          clusterSizes[j] = 0;
        }
        for (i = ad = 0, ref5 = n - 1; 0 <= ref5 ? ad <= ref5 : ad >= ref5; i = 0 <= ref5 ? ++ad : --ad) {
          value = values[i];
          mindist = Number.MAX_VALUE;
          for (j = ae = 0, ref6 = num - 1; 0 <= ref6 ? ae <= ref6 : ae >= ref6; j = 0 <= ref6 ? ++ae : --ae) {
            dist = abs(centroids[j] - value);
            if (dist < mindist) {
              mindist = dist;
              best = j;
            }
          }
          clusterSizes[best]++;
          assignments[i] = best;
        }
        newCentroids = new Array(num);
        for (j = af = 0, ref7 = num - 1; 0 <= ref7 ? af <= ref7 : af >= ref7; j = 0 <= ref7 ? ++af : --af) {
          newCentroids[j] = null;
        }
        for (i = ag = 0, ref8 = n - 1; 0 <= ref8 ? ag <= ref8 : ag >= ref8; i = 0 <= ref8 ? ++ag : --ag) {
          cluster = assignments[i];
          if (newCentroids[cluster] === null) {
            newCentroids[cluster] = values[i];
          } else {
            newCentroids[cluster] += values[i];
          }
        }
        for (j = ah = 0, ref9 = num - 1; 0 <= ref9 ? ah <= ref9 : ah >= ref9; j = 0 <= ref9 ? ++ah : --ah) {
          newCentroids[j] *= 1 / clusterSizes[j];
        }
        repeat = false;
        for (j = ai = 0, ref10 = num - 1; 0 <= ref10 ? ai <= ref10 : ai >= ref10; j = 0 <= ref10 ? ++ai : --ai) {
          if (newCentroids[j] !== centroids[i]) {
            repeat = true;
            break;
          }
        }
        centroids = newCentroids;
        nb_iters++;
        if (nb_iters > 200) {
          repeat = false;
        }
      }
      kClusters = {};
      for (j = aj = 0, ref11 = num - 1; 0 <= ref11 ? aj <= ref11 : aj >= ref11; j = 0 <= ref11 ? ++aj : --aj) {
        kClusters[j] = [];
      }
      for (i = ak = 0, ref12 = n - 1; 0 <= ref12 ? ak <= ref12 : ak >= ref12; i = 0 <= ref12 ? ++ak : --ak) {
        cluster = assignments[i];
        kClusters[cluster].push(values[i]);
      }
      tmpKMeansBreaks = [];
      for (j = al = 0, ref13 = num - 1; 0 <= ref13 ? al <= ref13 : al >= ref13; j = 0 <= ref13 ? ++al : --al) {
        tmpKMeansBreaks.push(kClusters[j][0]);
        tmpKMeansBreaks.push(kClusters[j][kClusters[j].length - 1]);
      }
      tmpKMeansBreaks = tmpKMeansBreaks.sort(function(a, b) {
        return a - b;
      });
      limits.push(tmpKMeansBreaks[0]);
      for (i = am = 1, ref14 = tmpKMeansBreaks.length - 1; am <= ref14; i = am += 2) {
        if (!isNaN(tmpKMeansBreaks[i])) {
          limits.push(tmpKMeansBreaks[i]);
        }
      }
    }
    return limits;
  };

  hsi2rgb = function(h, s, i) {

    /*
    borrowed from here:
    http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/hsi2rgb.cpp
     */
    var args, b, g, r;
    args = unpack(arguments);
    h = args[0], s = args[1], i = args[2];
    h /= 360;
    if (h < 1 / 3) {
      b = (1 - s) / 3;
      r = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
      g = 1 - (b + r);
    } else if (h < 2 / 3) {
      h -= 1 / 3;
      r = (1 - s) / 3;
      g = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
      b = 1 - (r + g);
    } else {
      h -= 2 / 3;
      g = (1 - s) / 3;
      b = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
      r = 1 - (g + b);
    }
    r = limit(i * r * 3);
    g = limit(i * g * 3);
    b = limit(i * b * 3);
    return [r * 255, g * 255, b * 255, args.length > 3 ? args[3] : 1];
  };

  rgb2hsi = function() {

    /*
    borrowed from here:
    http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/rgb2hsi.cpp
     */
    var b, g, h, i, min, r, ref, s;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    TWOPI = Math.PI * 2;
    r /= 255;
    g /= 255;
    b /= 255;
    min = Math.min(r, g, b);
    i = (r + g + b) / 3;
    s = 1 - min / i;
    if (s === 0) {
      h = 0;
    } else {
      h = ((r - g) + (r - b)) / 2;
      h /= Math.sqrt((r - g) * (r - g) + (r - b) * (g - b));
      h = Math.acos(h);
      if (b > g) {
        h = TWOPI - h;
      }
      h /= TWOPI;
    }
    return [h * 360, s, i];
  };

  chroma.hsi = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['hsi']), function(){});
  };

  _input.hsi = hsi2rgb;

  Color.prototype.hsi = function() {
    return rgb2hsi(this._rgb);
  };

  interpolate_hsx = function(col1, col2, f, m) {
    var dh, hue, hue0, hue1, lbv, lbv0, lbv1, res, sat, sat0, sat1, xyz0, xyz1;
    if (m === 'hsl') {
      xyz0 = col1.hsl();
      xyz1 = col2.hsl();
    } else if (m === 'hsv') {
      xyz0 = col1.hsv();
      xyz1 = col2.hsv();
    } else if (m === 'hsi') {
      xyz0 = col1.hsi();
      xyz1 = col2.hsi();
    } else if (m === 'lch' || m === 'hcl') {
      m = 'hcl';
      xyz0 = col1.hcl();
      xyz1 = col2.hcl();
    }
    if (m.substr(0, 1) === 'h') {
      hue0 = xyz0[0], sat0 = xyz0[1], lbv0 = xyz0[2];
      hue1 = xyz1[0], sat1 = xyz1[1], lbv1 = xyz1[2];
    }
    if (!isNaN(hue0) && !isNaN(hue1)) {
      if (hue1 > hue0 && hue1 - hue0 > 180) {
        dh = hue1 - (hue0 + 360);
      } else if (hue1 < hue0 && hue0 - hue1 > 180) {
        dh = hue1 + 360 - hue0;
      } else {
        dh = hue1 - hue0;
      }
      hue = hue0 + f * dh;
    } else if (!isNaN(hue0)) {
      hue = hue0;
      if ((lbv1 === 1 || lbv1 === 0) && m !== 'hsv') {
        sat = sat0;
      }
    } else if (!isNaN(hue1)) {
      hue = hue1;
      if ((lbv0 === 1 || lbv0 === 0) && m !== 'hsv') {
        sat = sat1;
      }
    } else {
      hue = Number.NaN;
    }
    if (sat == null) {
      sat = sat0 + f * (sat1 - sat0);
    }
    lbv = lbv0 + f * (lbv1 - lbv0);
    return res = chroma[m](hue, sat, lbv);
  };

  _interpolators = _interpolators.concat((function() {
    var len, o, ref, results;
    ref = ['hsv', 'hsl', 'hsi', 'hcl', 'lch'];
    results = [];
    for (o = 0, len = ref.length; o < len; o++) {
      m = ref[o];
      results.push([m, interpolate_hsx]);
    }
    return results;
  })());

  interpolate_num = function(col1, col2, f, m) {
    var n1, n2;
    n1 = col1.num();
    n2 = col2.num();
    return chroma.num(n1 + (n2 - n1) * f, 'num');
  };

  _interpolators.push(['num', interpolate_num]);

  interpolate_lab = function(col1, col2, f, m) {
    var res, xyz0, xyz1;
    xyz0 = col1.lab();
    xyz1 = col2.lab();
    return res = new Color(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), m);
  };

  _interpolators.push(['lab', interpolate_lab]);

}).call(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(115)(module)))

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

!function(global, factory) {
     true ? factory(exports) : 'function' == typeof define && define.amd ? define([ 'exports' ], factory) : factory(global.preact = global.preact || {});
}(this, function(exports) {
    function VNode(nodeName, attributes, children) {
        this.nodeName = nodeName;
        this.attributes = attributes;
        this.children = children;
        this.key = attributes && attributes.key;
    }
    function h(nodeName, attributes) {
        var children, lastSimple, child, simple, i;
        for (i = arguments.length; i-- > 2; ) stack.push(arguments[i]);
        if (attributes && attributes.children) {
            if (!stack.length) stack.push(attributes.children);
            delete attributes.children;
        }
        while (stack.length) if ((child = stack.pop()) instanceof Array) for (i = child.length; i--; ) stack.push(child[i]); else if (null != child && child !== !0 && child !== !1) {
            if ('number' == typeof child) child = String(child);
            simple = 'string' == typeof child;
            if (simple && lastSimple) children[children.length - 1] += child; else {
                (children || (children = [])).push(child);
                lastSimple = simple;
            }
        }
        var p = new VNode(nodeName, attributes || void 0, children || EMPTY_CHILDREN);
        if (options.vnode) options.vnode(p);
        return p;
    }
    function extend(obj, props) {
        if (props) for (var i in props) obj[i] = props[i];
        return obj;
    }
    function clone(obj) {
        return extend({}, obj);
    }
    function delve(obj, key) {
        for (var p = key.split('.'), i = 0; i < p.length && obj; i++) obj = obj[p[i]];
        return obj;
    }
    function isFunction(obj) {
        return 'function' == typeof obj;
    }
    function isString(obj) {
        return 'string' == typeof obj;
    }
    function hashToClassName(c) {
        var str = '';
        for (var prop in c) if (c[prop]) {
            if (str) str += ' ';
            str += prop;
        }
        return str;
    }
    function cloneElement(vnode, props) {
        return h(vnode.nodeName, extend(clone(vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
    }
    function createLinkedState(component, key, eventPath) {
        var path = key.split('.');
        return function(e) {
            var t = e && e.target || this, state = {}, obj = state, v = isString(eventPath) ? delve(e, eventPath) : t.nodeName ? t.type.match(/^che|rad/) ? t.checked : t.value : e, i = 0;
            for (;i < path.length - 1; i++) obj = obj[path[i]] || (obj[path[i]] = !i && component.state[path[i]] || {});
            obj[path[i]] = v;
            component.setState(state);
        };
    }
    function enqueueRender(component) {
        if (!component._dirty && (component._dirty = !0) && 1 == items.push(component)) (options.debounceRendering || defer)(rerender);
    }
    function rerender() {
        var p, list = items;
        items = [];
        while (p = list.pop()) if (p._dirty) renderComponent(p);
    }
    function isFunctionalComponent(vnode) {
        var nodeName = vnode && vnode.nodeName;
        return nodeName && isFunction(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
    }
    function buildFunctionalComponent(vnode, context) {
        return vnode.nodeName(getNodeProps(vnode), context || EMPTY);
    }
    function isSameNodeType(node, vnode) {
        if (isString(vnode)) return node instanceof Text;
        if (isString(vnode.nodeName)) return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
        if (isFunction(vnode.nodeName)) return (node._componentConstructor ? node._componentConstructor === vnode.nodeName : !0) || isFunctionalComponent(vnode); else return;
    }
    function isNamedNode(node, nodeName) {
        return node.normalizedNodeName === nodeName || toLowerCase(node.nodeName) === toLowerCase(nodeName);
    }
    function getNodeProps(vnode) {
        var props = clone(vnode.attributes);
        props.children = vnode.children;
        var defaultProps = vnode.nodeName.defaultProps;
        if (defaultProps) for (var i in defaultProps) if (void 0 === props[i]) props[i] = defaultProps[i];
        return props;
    }
    function removeNode(node) {
        var p = node.parentNode;
        if (p) p.removeChild(node);
    }
    function setAccessor(node, name, old, value, isSvg) {
        if ('className' === name) name = 'class';
        if ('class' === name && value && 'object' == typeof value) value = hashToClassName(value);
        if ('key' === name) ; else if ('class' === name && !isSvg) node.className = value || ''; else if ('style' === name) {
            if (!value || isString(value) || isString(old)) node.style.cssText = value || '';
            if (value && 'object' == typeof value) {
                if (!isString(old)) for (var i in old) if (!(i in value)) node.style[i] = '';
                for (var i in value) node.style[i] = 'number' == typeof value[i] && !NON_DIMENSION_PROPS[i] ? value[i] + 'px' : value[i];
            }
        } else if ('dangerouslySetInnerHTML' === name) {
            if (value) node.innerHTML = value.__html || '';
        } else if ('o' == name[0] && 'n' == name[1]) {
            var l = node._listeners || (node._listeners = {});
            name = toLowerCase(name.substring(2));
            if (value) {
                if (!l[name]) node.addEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
            } else if (l[name]) node.removeEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
            l[name] = value;
        } else if ('list' !== name && 'type' !== name && !isSvg && name in node) {
            setProperty(node, name, null == value ? '' : value);
            if (null == value || value === !1) node.removeAttribute(name);
        } else {
            var ns = isSvg && name.match(/^xlink\:?(.+)/);
            if (null == value || value === !1) if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1])); else node.removeAttribute(name); else if ('object' != typeof value && !isFunction(value)) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1]), value); else node.setAttribute(name, value);
        }
    }
    function setProperty(node, name, value) {
        try {
            node[name] = value;
        } catch (e) {}
    }
    function eventProxy(e) {
        return this._listeners[e.type](options.event && options.event(e) || e);
    }
    function collectNode(node) {
        removeNode(node);
        if (node instanceof Element) {
            node._component = node._componentConstructor = null;
            var _name = node.normalizedNodeName || toLowerCase(node.nodeName);
            (nodes[_name] || (nodes[_name] = [])).push(node);
        }
    }
    function createNode(nodeName, isSvg) {
        var name = toLowerCase(nodeName), node = nodes[name] && nodes[name].pop() || (isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName));
        node.normalizedNodeName = name;
        return node;
    }
    function flushMounts() {
        var c;
        while (c = mounts.pop()) {
            if (options.afterMount) options.afterMount(c);
            if (c.componentDidMount) c.componentDidMount();
        }
    }
    function diff(dom, vnode, context, mountAll, parent, componentRoot) {
        if (!diffLevel++) {
            isSvgMode = parent && void 0 !== parent.ownerSVGElement;
            hydrating = dom && !(ATTR_KEY in dom);
        }
        var ret = idiff(dom, vnode, context, mountAll);
        if (parent && ret.parentNode !== parent) parent.appendChild(ret);
        if (!--diffLevel) {
            hydrating = !1;
            if (!componentRoot) flushMounts();
        }
        return ret;
    }
    function idiff(dom, vnode, context, mountAll) {
        var ref = vnode && vnode.attributes && vnode.attributes.ref;
        while (isFunctionalComponent(vnode)) vnode = buildFunctionalComponent(vnode, context);
        if (null == vnode) vnode = '';
        if (isString(vnode)) {
            if (dom && dom instanceof Text && dom.parentNode) {
                if (dom.nodeValue != vnode) dom.nodeValue = vnode;
            } else {
                if (dom) recollectNodeTree(dom);
                dom = document.createTextNode(vnode);
            }
            return dom;
        }
        if (isFunction(vnode.nodeName)) return buildComponentFromVNode(dom, vnode, context, mountAll);
        var out = dom, nodeName = String(vnode.nodeName), prevSvgMode = isSvgMode, vchildren = vnode.children;
        isSvgMode = 'svg' === nodeName ? !0 : 'foreignObject' === nodeName ? !1 : isSvgMode;
        if (!dom) out = createNode(nodeName, isSvgMode); else if (!isNamedNode(dom, nodeName)) {
            out = createNode(nodeName, isSvgMode);
            while (dom.firstChild) out.appendChild(dom.firstChild);
            if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
            recollectNodeTree(dom);
        }
        var fc = out.firstChild, props = out[ATTR_KEY];
        if (!props) {
            out[ATTR_KEY] = props = {};
            for (var a = out.attributes, i = a.length; i--; ) props[a[i].name] = a[i].value;
        }
        if (!hydrating && vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && fc && fc instanceof Text && !fc.nextSibling) {
            if (fc.nodeValue != vchildren[0]) fc.nodeValue = vchildren[0];
        } else if (vchildren && vchildren.length || fc) innerDiffNode(out, vchildren, context, mountAll, !!props.dangerouslySetInnerHTML);
        diffAttributes(out, vnode.attributes, props);
        if (ref) (props.ref = ref)(out);
        isSvgMode = prevSvgMode;
        return out;
    }
    function innerDiffNode(dom, vchildren, context, mountAll, absorb) {
        var j, c, vchild, child, originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren && vchildren.length;
        if (len) for (var i = 0; i < len; i++) {
            var _child = originalChildren[i], props = _child[ATTR_KEY], key = vlen ? (c = _child._component) ? c.__key : props ? props.key : null : null;
            if (null != key) {
                keyedLen++;
                keyed[key] = _child;
            } else if (hydrating || absorb || props || _child instanceof Text) children[childrenLen++] = _child;
        }
        if (vlen) for (var i = 0; i < vlen; i++) {
            vchild = vchildren[i];
            child = null;
            var key = vchild.key;
            if (null != key) {
                if (keyedLen && key in keyed) {
                    child = keyed[key];
                    keyed[key] = void 0;
                    keyedLen--;
                }
            } else if (!child && min < childrenLen) for (j = min; j < childrenLen; j++) {
                c = children[j];
                if (c && isSameNodeType(c, vchild)) {
                    child = c;
                    children[j] = void 0;
                    if (j === childrenLen - 1) childrenLen--;
                    if (j === min) min++;
                    break;
                }
            }
            child = idiff(child, vchild, context, mountAll);
            if (child && child !== dom) if (i >= len) dom.appendChild(child); else if (child !== originalChildren[i]) {
                if (child === originalChildren[i + 1]) removeNode(originalChildren[i]);
                dom.insertBefore(child, originalChildren[i] || null);
            }
        }
        if (keyedLen) for (var i in keyed) if (keyed[i]) recollectNodeTree(keyed[i]);
        while (min <= childrenLen) {
            child = children[childrenLen--];
            if (child) recollectNodeTree(child);
        }
    }
    function recollectNodeTree(node, unmountOnly) {
        var component = node._component;
        if (component) unmountComponent(component, !unmountOnly); else {
            if (node[ATTR_KEY] && node[ATTR_KEY].ref) node[ATTR_KEY].ref(null);
            if (!unmountOnly) collectNode(node);
            var c;
            while (c = node.lastChild) recollectNodeTree(c, unmountOnly);
        }
    }
    function diffAttributes(dom, attrs, old) {
        var name;
        for (name in old) if (!(attrs && name in attrs) && null != old[name]) setAccessor(dom, name, old[name], old[name] = void 0, isSvgMode);
        if (attrs) for (name in attrs) if (!('children' === name || 'innerHTML' === name || name in old && attrs[name] === ('value' === name || 'checked' === name ? dom[name] : old[name]))) setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
    }
    function collectComponent(component) {
        var name = component.constructor.name, list = components[name];
        if (list) list.push(component); else components[name] = [ component ];
    }
    function createComponent(Ctor, props, context) {
        var inst = new Ctor(props, context), list = components[Ctor.name];
        Component.call(inst, props, context);
        if (list) for (var i = list.length; i--; ) if (list[i].constructor === Ctor) {
            inst.nextBase = list[i].nextBase;
            list.splice(i, 1);
            break;
        }
        return inst;
    }
    function setComponentProps(component, props, opts, context, mountAll) {
        if (!component._disable) {
            component._disable = !0;
            if (component.__ref = props.ref) delete props.ref;
            if (component.__key = props.key) delete props.key;
            if (!component.base || mountAll) {
                if (component.componentWillMount) component.componentWillMount();
            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);
            if (context && context !== component.context) {
                if (!component.prevContext) component.prevContext = component.context;
                component.context = context;
            }
            if (!component.prevProps) component.prevProps = component.props;
            component.props = props;
            component._disable = !1;
            if (0 !== opts) if (1 === opts || options.syncComponentUpdates !== !1 || !component.base) renderComponent(component, 1, mountAll); else enqueueRender(component);
            if (component.__ref) component.__ref(component);
        }
    }
    function renderComponent(component, opts, mountAll, isChild) {
        if (!component._disable) {
            var skip, rendered, inst, cbase, props = component.props, state = component.state, context = component.context, previousProps = component.prevProps || props, previousState = component.prevState || state, previousContext = component.prevContext || context, isUpdate = component.base, nextBase = component.nextBase, initialBase = isUpdate || nextBase, initialChildComponent = component._component;
            if (isUpdate) {
                component.props = previousProps;
                component.state = previousState;
                component.context = previousContext;
                if (2 !== opts && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === !1) skip = !0; else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
                component.props = props;
                component.state = state;
                component.context = context;
            }
            component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
            component._dirty = !1;
            if (!skip) {
                if (component.render) rendered = component.render(props, state, context);
                if (component.getChildContext) context = extend(clone(context), component.getChildContext());
                while (isFunctionalComponent(rendered)) rendered = buildFunctionalComponent(rendered, context);
                var toUnmount, base, childComponent = rendered && rendered.nodeName;
                if (isFunction(childComponent)) {
                    var childProps = getNodeProps(rendered);
                    inst = initialChildComponent;
                    if (inst && inst.constructor === childComponent && childProps.key == inst.__key) setComponentProps(inst, childProps, 1, context); else {
                        toUnmount = inst;
                        inst = createComponent(childComponent, childProps, context);
                        inst.nextBase = inst.nextBase || nextBase;
                        inst._parentComponent = component;
                        component._component = inst;
                        setComponentProps(inst, childProps, 0, context);
                        renderComponent(inst, 1, mountAll, !0);
                    }
                    base = inst.base;
                } else {
                    cbase = initialBase;
                    toUnmount = initialChildComponent;
                    if (toUnmount) cbase = component._component = null;
                    if (initialBase || 1 === opts) {
                        if (cbase) cbase._component = null;
                        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0);
                    }
                }
                if (initialBase && base !== initialBase && inst !== initialChildComponent) {
                    var baseParent = initialBase.parentNode;
                    if (baseParent && base !== baseParent) {
                        baseParent.replaceChild(base, initialBase);
                        if (!toUnmount) {
                            initialBase._component = null;
                            recollectNodeTree(initialBase);
                        }
                    }
                }
                if (toUnmount) unmountComponent(toUnmount, base !== initialBase);
                component.base = base;
                if (base && !isChild) {
                    var componentRef = component, t = component;
                    while (t = t._parentComponent) (componentRef = t).base = base;
                    base._component = componentRef;
                    base._componentConstructor = componentRef.constructor;
                }
            }
            if (!isUpdate || mountAll) mounts.unshift(component); else if (!skip) {
                if (component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, previousContext);
                if (options.afterUpdate) options.afterUpdate(component);
            }
            var fn, cb = component._renderCallbacks;
            if (cb) while (fn = cb.pop()) fn.call(component);
            if (!diffLevel && !isChild) flushMounts();
        }
    }
    function buildComponentFromVNode(dom, vnode, context, mountAll) {
        var c = dom && dom._component, originalComponent = c, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = getNodeProps(vnode);
        while (c && !isOwner && (c = c._parentComponent)) isOwner = c.constructor === vnode.nodeName;
        if (c && isOwner && (!mountAll || c._component)) {
            setComponentProps(c, props, 3, context, mountAll);
            dom = c.base;
        } else {
            if (originalComponent && !isDirectOwner) {
                unmountComponent(originalComponent, !0);
                dom = oldDom = null;
            }
            c = createComponent(vnode.nodeName, props, context);
            if (dom && !c.nextBase) {
                c.nextBase = dom;
                oldDom = null;
            }
            setComponentProps(c, props, 1, context, mountAll);
            dom = c.base;
            if (oldDom && dom !== oldDom) {
                oldDom._component = null;
                recollectNodeTree(oldDom);
            }
        }
        return dom;
    }
    function unmountComponent(component, remove) {
        if (options.beforeUnmount) options.beforeUnmount(component);
        var base = component.base;
        component._disable = !0;
        if (component.componentWillUnmount) component.componentWillUnmount();
        component.base = null;
        var inner = component._component;
        if (inner) unmountComponent(inner, remove); else if (base) {
            if (base[ATTR_KEY] && base[ATTR_KEY].ref) base[ATTR_KEY].ref(null);
            component.nextBase = base;
            if (remove) {
                removeNode(base);
                collectComponent(component);
            }
            var c;
            while (c = base.lastChild) recollectNodeTree(c, !remove);
        }
        if (component.__ref) component.__ref(null);
        if (component.componentDidUnmount) component.componentDidUnmount();
    }
    function Component(props, context) {
        this._dirty = !0;
        this.context = context;
        this.props = props;
        if (!this.state) this.state = {};
    }
    function render(vnode, parent, merge) {
        return diff(merge, vnode, {}, !1, parent);
    }
    var options = {};
    var stack = [];
    var EMPTY_CHILDREN = [];
    var lcCache = {};
    var toLowerCase = function(s) {
        return lcCache[s] || (lcCache[s] = s.toLowerCase());
    };
    var resolved = 'undefined' != typeof Promise && Promise.resolve();
    var defer = resolved ? function(f) {
        resolved.then(f);
    } : setTimeout;
    var EMPTY = {};
    var ATTR_KEY = 'undefined' != typeof Symbol ? Symbol.for('preactattr') : '__preactattr_';
    var NON_DIMENSION_PROPS = {
        boxFlex: 1,
        boxFlexGroup: 1,
        columnCount: 1,
        fillOpacity: 1,
        flex: 1,
        flexGrow: 1,
        flexPositive: 1,
        flexShrink: 1,
        flexNegative: 1,
        fontWeight: 1,
        lineClamp: 1,
        lineHeight: 1,
        opacity: 1,
        order: 1,
        orphans: 1,
        strokeOpacity: 1,
        widows: 1,
        zIndex: 1,
        zoom: 1
    };
    var NON_BUBBLING_EVENTS = {
        blur: 1,
        error: 1,
        focus: 1,
        load: 1,
        resize: 1,
        scroll: 1
    };
    var items = [];
    var nodes = {};
    var mounts = [];
    var diffLevel = 0;
    var isSvgMode = !1;
    var hydrating = !1;
    var components = {};
    extend(Component.prototype, {
        linkState: function(key, eventPath) {
            var c = this._linkedStates || (this._linkedStates = {});
            return c[key + eventPath] || (c[key + eventPath] = createLinkedState(this, key, eventPath));
        },
        setState: function(state, callback) {
            var s = this.state;
            if (!this.prevState) this.prevState = clone(s);
            extend(s, isFunction(state) ? state(s, this.props) : state);
            if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
            enqueueRender(this);
        },
        forceUpdate: function() {
            renderComponent(this, 2);
        },
        render: function() {}
    });
    exports.h = h;
    exports.cloneElement = cloneElement;
    exports.Component = Component;
    exports.render = render;
    exports.rerender = rerender;
    exports.options = options;
});
//# sourceMappingURL=preact.js.map

/***/ }),
/* 113 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.PropTypes = mod.exports;
  }
})(this, function (exports, module) {

  'use strict';

  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

  var ReactElement = {};

  ReactElement.isValidElement = function (object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  };

  var ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };

  var emptyFunction = {
    thatReturns: function thatReturns(what) {
      return function () {
        return what;
      };
    }
  };

  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  var ANONYMOUS = '<<anonymous>>';

  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName, location, propFullName) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;
      if (props[propName] == null) {
        var locationName = ReactPropTypeLocationNames[location];
        if (isRequired) {
          return new Error('Required ' + locationName + ' `' + propFullName + '` was not specified in ' + ('`' + componentName + '`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        var locationName = ReactPropTypeLocationNames[location];

        var preciseType = getPreciseType(propValue);

        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturns(null));
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var locationName = ReactPropTypeLocationNames[location];
        var propType = getPropType(propValue);
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']');
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!ReactElement.isValidElement(props[propName])) {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var locationName = ReactPropTypeLocationNames[location];
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      return createChainableTypeChecker(function () {
        return new Error('Invalid argument supplied to oneOf, expected an instance of array.');
      });
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (propValue === expectedValues[i]) {
          return null;
        }
      }

      var locationName = ReactPropTypeLocationNames[location];
      var valuesString = JSON.stringify(expectedValues);
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      return createChainableTypeChecker(function () {
        return new Error('Invalid argument supplied to oneOfType, expected an instance of array.');
      });
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName) == null) {
          return null;
        }
      }

      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || ReactElement.isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    if (propType === 'symbol') {
      return true;
    }

    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  module.exports = ReactPropTypes;
});

//# sourceMappingURL=index.js.map

/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ })
/******/ ]);
});