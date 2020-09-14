# BezierInfo-2: a dev repository

This is the development repository for ["A Primer on Bézier Curves"](https://pomax.github.io.bezierinfo), itself hosted as https://pomax.github.io/BezierInfo-2/

The primer is currently being rewritten from a React application to a pure HTML/CSS/Vanilla-JS tech stack.

React is nice, Webpack is convenient, but there's just very little need to serve the Primer as "a React app". Simply convert the various parts to HTML directly, and then assemble it as "a page" that _just works_, rather than as "an application" that won't even show content without JS enabled.

See https://github.com/Pomax/BezierInfo-2/issues/257 for the current rewrite status

## Building everything

- The general single-build-pass command is simply `npm start`
- Continuous development is `npm test`

Specialised commands:

- `pretty` runs prettier over the resultant HTML files
- `link-checker` runs link checking on the resultant HTML files
- `polish` runs `pretty` followed by `link-checker`
- `svgo:pretty` runs a script that reformats the SVG files to an easier-for-humans form (**note: might be broken?)**
- `clean` cleans up the timing file and temp directory
- `lint:tools` runs prettier on all javascript in the `src` dir
- `lint:lib` runs prettier on all site javascript (including the custom element code)

## Weird personal dependencies?

There are a number of dependencies that are pulled from my own forks of projects, because they included patches (either by myself or others) that fix problems or shortcomings that have not been merged into upstream yet, or have been merged in but not released as a version that can be pulled down from npm yet.
