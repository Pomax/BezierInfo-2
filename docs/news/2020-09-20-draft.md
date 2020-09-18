# Rewriting the tech stack

- started in 2011 as simple webpage with some Processing.js
- complete rewrite to React in 2016
- web's caught up, and there is no reason to keep things React. This content should work even without JS.

- progressive enhancement: it should work, JS should make it work better.
    - generate "a finished page"
        - html + css
    - load it with JS that "makes it better", not "makes it work"

- start with markdown
    - convert to HTML
        - index.template.html
            - nunjucks, like Django/Jinja/Mustache
        - extract latex
            - build using actual `xelatex`
            - convert TeX to SVG
                - xelatex, pdfcrop, pdf2svg, svgo
            - replace with `<img src="svg">`
    - extract `<graphics-element>` custom elements
        - extract .scr, load in node, _actually run_
            - run single frame, export to `.png` image
        - ammend HTML markup
            - fill in missing width/height attributes
            - add `<fallback-image>`
                - link in exported image
- each section into the larger HTML file (based on `toc` order)
- localization!
