import marked from "marked";

const CHANGELOG = Object.fromEntries(
  Object.entries({
    "August-September 2020": [
      `Completely overhauled the site: the Primer is now a normal web page that works fine with JS disabled, but obviously better with JS turned on.`,
    ],

    "June 2020": [`Added automatic CI/CD using Github Actions`],

    "January 2020": [
      `Added reset buttons to all graphics`,
      `Updated to preface to correctly describe the on-page maths`,
      `Fixed the Catmull-Rom section because it had glaring maths errors`,
    ],

    "August 2019": [`Added a section on (plain) rational Bezier curves`, `Improved the Graphic component to allow for sliders`],

    "December 2018": [
      `Added a section on curvature and calculating kappa.`,
      `Added a Patreon page! Head on over to [patreon.com/bezierinfo](https://www.patreon.com/bezierinfo) to help support this site!`,
    ],

    "August 2018": [`Added a section on finding a curve's y, if all you have is the x coordinate.`],

    "July 2018": [
      `Rewrote the 3D normals section, implementing and explaining Rotation Minimising Frames.`,
      `Updated the section on curve order raising/lowering, showing how to get a least-squares optimized lower order curve.`,
      `(Finally) updated 'npm test' so that it automatically rebuilds when files are changed while the dev server is running.`,
    ],

    "June 2018": [`Added a section on direct curve fitting.`, `Added source links for all graphics.`, `Added this "What\'s new?" section.`],

    "April 2017": [
      `Added a section on 3d normals.`,
      `Added live-updating for the social link buttons, so they always link to the specific section you're reading.`,
    ],

    "February 2017": [`Finished rewriting the entire codebase for localization.`],

    "January 2016": [`Added a section to explain the Bezier interval.`, `Rewrote the Primer as a React application.`],

    "December 2015": [
      `Set up the split repository between BezierInfo-2 as development repository, and bezierinfo as live page.`,
      `Removed the need for client-side LaTeX parsing entirely, so the site doesn't take a full minute or more to load all the graphics.`,
    ],

    "May 2015": [
      `Switched over to pure JS rather than Processing-through-Processing.js`,
      `Added Cardano's algorithm for finding the roots of a cubic polynomial.`,
    ],

    "April 2015": [`Added a section on arc length approximations.`],

    "February 2015": [`Added a section on the canonical cubic Bezier form.`],

    "November 2014": [`Switched to HTTPS.`],

    "July 2014": [`Added the section on arc approximation.`],

    "April 2014": [`Added the section on Catmull-Rom fitting.`],

    "November 2013": [`Added the section on Catmull-Rom / Bezier conversion.`, `Added the section on Bezier cuves as matrices.`],

    "April 2013": [`Added a section on poly-Beziers.`, `Added a section on boolean shape operations.`],

    "March 2013": [
      `First drastic rewrite.`,
      `Added sections on circle approximations.`,
      `Added a section on projecting a point onto a curve.`,
      `Added a section on tangents and normals.`,
      `Added Legendre-Gauss numerical data tables.`,
    ],

    "October 2011": [
      `First commit for the [bezierinfo](https://pomax.github.io/bezierinfo) site, based on the pre-Primer webpage that covered the basics of Bezier curves in HTML with Processing.js examples.`,
    ],
  }).map((p) => [p[0], p[1].map((v) => marked(v))])
);

export default CHANGELOG;
