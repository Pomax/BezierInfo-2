# BezierInfo-2

Dev repository for https://Pomax.github.io/bezierinfo

## Working on the code

- To run this dev version: `npm start`, then view in the browser on [http://localhost:8080](http://localhost:8080)
- To compile for production: `npm run build`.

Both operations run continuous linting. Also note that there are specific requirements for development, see the section on dev requirements below.

## Dev location

- Dev repository: https://github.com/Pomax/BezierInfo-2
- Dev preview: https://Pomax.github.io/BezierInfo-2

### Dev requirements

- [Node.js](https://nodejs.org)
- XeLaTeX (available through [TeXLive](https://www.tug.org/texlive) on unix/linux/OSX and [MiKTeX](https://miktex.org) on Windows)
- The [`pdf2svg`](http://www.cityinthesky.co.uk/opensource/pdf2svg) utility

### Fonts required for proper LaTeX typesetting
- en-GB LaTeX fonts: TeX Gyre and TeX Gyre Math fonts (installable through TeXLive and MiKTeX)
- zh-CN LaTeX font: SimSun (supplied with Windows)
- ja-JP LaTeX font: MS Mincho (supplied with Windows)

## Main site location

- Main repository: https://github.com/Pomax/BezierInfo
- Main site: https://Pomax.github.io/BezierInfo

## Additional information

Blog entry on how Webpack's sync processing and MathJAx's async processing were
made to work together:

http://pomax.github.io/1451617530567/react-with-latex-without-needing-client-side-mathjax
