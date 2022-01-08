# BezierInfo-2: a dev repository

This is the development repository for ["A Primer on Bézier Curves"](https://pomax.github.io/bezierinfo), itself hosted as https://pomax.github.io/BezierInfo-2/

This is the new codebased for the primer, being a pure HTML/CSS/Vanilla-JS tech stack - the old version can be found on the [2016-react](https://github.com/Pomax/BezierInfo-2/tree/2016-react) branch

Work is still underway on this new version, see https://github.com/Pomax/BezierInfo-2/issues/257 for the current task list.

## Building everything

Use the active Node LTS (currently v16) or higher, with all the project dependencies installed via `npm install`. Note that [node-canvas](https://github.com/Automattic/node-canva) will need you to [install some Cairo libs/headers](https://github.com/Automattic/node-canvas#compiling) using your OS's package manager, with [special instructions for Windows users](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows) because Windows doesn't come with the same kind of package management that Unixy systems do. To successfully compile, GTK is _required_, but JPEG support is not (this repo's code only generates PNG images).

Also note that you will need a TeX installation with several dependencies: on Windows, install [MiKTeX](https://miktex.org/download) and set it up so that it automatically installs things as needed. On Linux/Unix/etc, you'll need to install the following packages :

- xzdec
- libpoppler-glib-dev

And for the LaTeX work you will need:

- texlive
- texlive-xetex
- texlive-extra-utils
- fonts-unfonts-core
- pdf2svg

To make life easier, if your distro uses apt-get, just run this:

```
> sudo apt-get update && sudo apt-get install xzdec libpoppler-glib-dev texlive texlive-xetex texlive-extra-utils pdf2svg
```

If you're using a different package installation method, note that for LaTeX you will need `xetex`, `pdfcrop`, and the following fonts (installed using a TeX distribution manager):

- Linux Libertine
- XITS Math
- TeX Gyre
- TeX Gyre Math
- Arphic-ttf
- IPAex (_not_ type1)
- UnBatang

Note: [pdf2svg](https://github.com/dawbarton/pdf2svg/), can be installed just like everything else on Linux, but on Windows requires you to build the tool yourself, after which you will have to put the pdf2svg.exe file somewhere sensible (like `C:\Program Files (x86)\pdf2svg`) add then manually add its directory to your PATH environment variable, so that windows knows where to look when the `pdf2svg` command gets issued.

With all the dependencies in place, you can now continuous-test everything using:

```
> npm test
```

Which will start the build run in "watch" mode, opening a browser with the compiled project, and recompiling as you update and save files.

To run a single, full build, rather than continuous building, use:

```
> npm start
```

Note that for dev work, you typically want to run `npm test` for as long as you're working on that code. Once you're ready to form a commit for PR purposes, run `npm start` to do a "real" build rather than a dev build, and then form your commit, so that you're pushing "final" code rather than intermediate dev code.

#### Specialised commands:

- `npm run regenerate` runs a build followed by running `prettier` on the final .html files, as well as `link-checker` to make sure there are no dead links in the content.
- `npm run deploy` runs `regenerate` and then copies the content of the `docs` directory over to `../bezierinfo`, which is where the actual webview repo lives on my filesystem.

#### Even more specialized commands:

Please see the package.json `"scripts"` section for the full list of commands. Most of these are just build chain steps, and running them on their own basically makes no sense.

## Weird personal dependencies?

There are a number of dependencies that are pulled from my own forks of projects, because my versions include patches (either by myself or others) that fix problems or shortcomings that have not been merged into upstream (yet?), or _have_ been merged in but have not had a new release (yet?).
