# Processing LaTeX in Markdown. Using LaTeX

extract blocks, replace with templating identifier
    - hash filename based on latex code
    - wrap in (locale-appropriate) LaTeX preamble
    - send over to `xelatex`
    - send that over to `pdfcrop`
    - send that over to `pdf2svg`
    - send that over to `svgo`
    - put that in `images/chapters/.../` or `images/news/.../`

replace the template identifier with lazy-loading `<img>` pointing at the generated `.svg` image.

have JS in place that strips lazy-loading and replaces it with longer-distance IntersectionObserver for better lazy-loading.
