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
- The [`pdf2svg`](http://www.cityinthesky.co.uk/opensource/pdf2svg/) utility

### Fonts required for proper LaTeX typesetting

All fonts come with TeXLive and MiKTeX, and should be easy to install. Note that you will need the modern OpenType (otf/ttf) fonts, not the obsolete type1 fonts.

- en-GB fonts: TeX Gyre Pagella from the `tex-gyre` package
- ja-JP font: IPAex Mincho from the `ipaex` package (_not_ `ipaex-type1`)
- zh-CN font: Arhpic gbsn from the `arphic-ttf` package (_not_ `arphic`)
- maths fonts: TeX Gyre Pagella Math fonts from the `tex-gyre-math` package

### Running a build

As mentioned up top, run a build using `npm run build`.

If you have all the prerequisites installed, this should "just work", although I can't make any guarantees on how long it will take: on my rather beefy workstation it takes around 85 seconds to run a build for all locales (`en-GB`, `zh-CN`, and `ja-JP`) when there are no new SVG images to generate.

## Main site location

- Main repository: https://github.com/Pomax/BezierInfo
- Main site: https://Pomax.github.io/BezierInfo

## Localization

Interested in (helping with) localizing the Primer to your own language? That's awesome! Please read [the instructions on how to start localizing](https://github.com/Pomax/BezierInfo-2/wiki/localize) and please file issues if anything is unclear.

## Additional information

Interested in the actual architecture and tech stack? Read the blog post on how Webpack's sync processing and MathJAx's async processing were made to work together:

http://pomax.github.io/1451617530567/react-with-latex-without-needing-client-side-mathjax

And read about the tech choices made to enable localization in:

http://pomax.github.io/1489108158510/localization-is-hard

Finally, a fair number of people have helped by filing PRs for fixes for typos small and large over the years, all of whom are listed on the [contributors](https://github.com/Pomax/BezierInfo-2/graphs/contributors) page for this project. And a special thanks goes out to Simon Cozens who [went through the entire book](https://github.com/Pomax/BezierInfo-2/pulls?utf8=%E2%9C%93&q=is%3Apr+author%3Asimoncozens) to fix typos and phrasing.
