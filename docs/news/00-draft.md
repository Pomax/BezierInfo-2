# Writing a web page

## Let's talk about React

- React vs HTML: web apps are not web pages

## Let's talk about web pages

- web pages are not web sites
- lazy loading your assets
- HTML vs "don't even write HTML"
- the modern web: distrust as a baseline.
    - why should people trust your JS?
        - will it drain their battery?
        - will it mine crypto?
        - will it break if someone doesn't trust Google?
        - etc.
    - pregenerate everything that can be generated. You're building a web page, not a web page builder. It should work immediately.

## Let's talk about modern JS

- modern JS
    `const`, `let`, `...`, `??`, `Object.fromEntries`/`Object.entries`, `async`+`await`
    `async` and `defer` attributes
    esmodules (remember `type="module"`!)
    custom elements
        - not quite react
        - let's invent a new framework!
            - mutation observer for attribute and child changes

