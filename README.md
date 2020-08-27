# BezierInfo-2: a dev repository

This is the development repository for ["A Primer on Bézier Curves"](https://pomax.github.io.bezierinfo).

The primer is currently being rewritten from a React application to a pure HTML/CSS/Vanilla-JS tech stack.

React is nice, Webpack is convenient, but there's just very little need to serve the Primer as "a React app". Simply convert the various parts to HTML directly, and then assemble it as "a page" that _just works_, rather than as "an application" that won't even show content without JS enabled.

### Current progress:

- [x] create an HTML custom element for the graphics (also see https://github.com/pomax/custom-graphics-element)
- [x] use bezier.js in the custom element's `Bezier` class
  - [x] requires converting bezier.js to "ES6-enough" (see https://github.com/Pomax/bezierjs/issues/127#issuecomment-670325260)
- [x] convert .md to HTML
- [x] autogenerate fallback images and associated markup for `<graphics-element>`
  - [x] base images on their source hash, so that we don't regenerate every single image every single time.
- [x] generate SVG images and associated markup for LaTeX blocks
- [ ] figure out a way to mark up parts of text as "for web" vs. "for print" (easy in HTML using a CSS class, no there's no predefined solution in markdown. I guess more divs?)
- [ ] consider making sections update "in place" while file-watching, using more targeted chokidar rules (see a change to an `.md` file, regenerate that section _and only that section_, replacing only the `<section id=...>` parts in the various index.html files)
- [ ] verify all localized copy still makes sense, which is already guaranteed not the case.
  - [ ] ja-JP
  - [ ] zh-CN
- [x] Figure out why pages scroll on focus in Firefox (https://github.com/Pomax/BezierInfo-2/issues/262)
- [x] ~Firefox for Android does not support static class fields (nightly does). Should I care, or will it not matter a month from now?~ Mozilla released a new Firefox for Android that's finally up to date wrt modern JS, so this is no longer an issue.
- [x] now that github supports gh-pages from not just the root dir, move all the code into a `src` dir, and all the content into a `docs` dir. It's a stupid name, but GH doesn't support `public`. Hopefully "yet" but who knows how they work.
- [x] implement custom lazy loading that kicks in when images are about 2 screens away from being in screen. The standard browser `loading="lazy"` distance is entirely useless.
- [x] scope LaTeX images to each section (similar to the placeholder images) so that it's easier to redo just one section's latex code, rather than clearing and regenerating all ~250 latex blocks.
- [x] capture LaTeX error logs and work them into the build log as clean output, for faster debugging.
- [x] Add a `setSlider(qs, handler)` API function so that sketches can hook into locally scoped HTML UI elements (like `<input type="range">`
- [ ] figure out how to force `graphics-element` elements to preallocate their bounding box, so that progressive page loading doesn't cause reflow.
- [ ] consider swammping out the `perform-code-surgery.js` regex approach to a dedicated DFA lexer, with scope tracking.
- [x] add data-attributes to sketches for same-sketch, different-parameters runs, in a way that works with the placeholder generation.

### Section conversion:

- [x] preface
- [x] introduction
- [x] whatis
- [x] explanation
- [x] control
- [x] weightcontrol
- [x] extended
- [x] matrix
- [x] decasteljau
- [x] flattening
- [x] splitting
- [x] matrixsplit
- [x] reordering
- [x] derivatives
- [x] pointvectors
- [x] pointvectors3d
- [x] components
- [x] extremities
- [x] boundingbox
- [x] aligning
- [x] tightbounds
- [x] inflections
- [x] canonical
- [x] yforx
- [ ] arclength
- [ ] arclengthapprox
- [ ] curvature
- [ ] tracing
- [ ] intersections
- [ ] curveintersection
- [ ] abc
- [ ] moulding
- [ ] pointcurves
- [ ] curvefitting
- [ ] catmullconv
- [ ] catmullmoulding
- [ ] polybezier
- [ ] shapes
- [ ] projections
- [ ] offsetting
- [ ] graduatedoffset
- [ ] circles
- [ ] circles_cubic
- [ ] arcapproximation
- [ ] bsplines
  
