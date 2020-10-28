# BezierInfo-2: a dev repository

This is the development repository for ["A Primer on Bézier Curves"](https://pomax.github.io/bezierinfo), itself hosted as https://pomax.github.io/BezierInfo-2/

This is the new codebased for the primer, being a pure HTML/CSS/Vanilla-JS tech stack - the old version can be found on the [2016-react](https://github.com/Pomax/BezierInfo-2/tree/2016-react) branch

Work is still underway on this new version, see https://github.com/Pomax/BezierInfo-2/issues/257 for the current task list.

## Building everything

Use the latest Node (currently v14), with all the project dependencies installed via `npm install`. Note that [node-canvas](https://github.com/Automattic/node-canva) has [special instructions for Windows users](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows) because it's going to have to compile itself (GTK is _required_. However, JPEG support is not).

Also note that you will need a TeX installation with several dependencies: on Windows, install [MiKTeX](https://miktex.org/download) and set it up so that it automatically installs things as needed. On Linux/Unix/etc, you'll need to install the following packages:

- xzdec
- libpoppler-glib-dev
- texlive
- texlive-xetex
- texlive-extra-utils

You'll also need [pdf2svg](https://github.com/dawbarton/pdf2svg/), which on linux can be installed just like everything else, but on Windows means that you'll need t run the build yourself, after which you'll need to put the .exe file somewhere sensible (like `C:\Program Files (x86)\pdf2svg`) add then add that dir to your PATH, so that `pdf2svg` can be invoked like any other CLI command.

To make life easier, if your distro uses apt-get, just run this:

```
> sudo apt-get update && sudo apt-get install xzdec libpoppler-glib-dev texlive texlive-xetex texlive-extra-utils pdf2svg
```

With all the dependencies in place, you can now test everything using:

```
> npm test
```

Which will start the build run in "watch" mode, opening a browser with the compiled project, and recompiling as you update and save files.


#### Specialised commands:

- `npm run regenerate` runs a build followed by running `prettier` on the final .html files, as well as `link-checker` to make sure there are no dead links in the content.
- `npm run deploy` runs `regenerate` and then copies the content of the `docs` directory over to `../bezierinfo`, which is where the actual webview repo lives on my filesystem.

#### Even more specialized commands:

Please see the package.json `"scripts"` section for the full list of commands. Most of these are just build chain steps, and running them on their own basically makes no sense.

## Weird personal dependencies?

There are a number of dependencies that are pulled from my own forks of projects, because my versions include patches (either by myself or others) that fix problems or shortcomings that have not been merged into upstream (yet?), or _have_ been merged in but have not had a new release (yet?).
