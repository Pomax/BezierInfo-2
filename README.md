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
- pdfcrop (available through [TeXLive](https://www.tug.org/texlive) on unix/linux/OSX and [MiKTeX](https://miktex.org) on Windows)
- The [`pdf2svg`](http://www.cityinthesky.co.uk/opensource/pdf2svg) utility

### Fonts required for proper LaTeX typesetting
- en-GB LaTeX fonts: TeX Gyre Pagella and TeX Gyre Pagella Math fonts (installable through TeXLive and MiKTeX)
- ja-JP LaTeX font: IPAex Mincho (installable through TeXLive and MiKTeX)
- zh-CN LaTeX font: Arhpic gbsn (installable through TeXLive and MiKTeX)

All fonts come with TeXLive and MiKTeX, and should be easy to install. Note that you will need the modern OpenType (otf/ttf) fonts, not the obsolete type1 fonts.

## Main site location

- Main repository: https://github.com/Pomax/BezierInfo
- Main site: https://Pomax.github.io/BezierInfo

## Localization

Interested in (helping with) localizing the Primer to your own language? That's awesome! Please read [the instructions on how to start localizing](https://github.com/Pomax/BezierInfo-2/wiki/localize) and please file issues if anything is unclear.

## Additional information

Interested in the actual architecture and tech stack? Read the blog post on how Webpack's sync processing and MathJAx's async processing were made to work together:

http://pomax.github.io/1451617530567/react-with-latex-without-needing-client-side-mathjax
