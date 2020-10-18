# Writing a web page

Lets talk about writing a web page, and perhaps more specifically, let's talk about not writing web _applications_.

At their core, web pages are a way to make information publicly available, in a navigable and discoverable manner. Things like wikipedia or a news website are collections of webpages, and they use the web stack - HTML, CSS, and JS - to get that information in front of readers' eyes, ideally under all circumstances: if your browser's broken and JS or even CSS doesn't work, the information is still there. It'll just look less polished than intended.

Web applications, on the other hand, are software that "let people do things", with the only thing distinguishing them from any other software being that they're built using the web stack, and presented using the browser as user interface library. These applications can only work if the tech stack works, and not having the correct styling or event handling means the software is considered broken.

Sometimes it's obvious to say what is which: wikipedia is clearly a (collection of) web page(s), and a browser based game is clearly a web app. But what about things in between? A weather website, or your bank, or even a communications platform like gmail or facebook? All of these have an information aspect to them that is based entirely around how web pages work: what's the current weather and the short forecast? No "software use" should be required. What is your current balance and transaction history? Again, plain information. Even basic web mail itself (a list of emails, that you can click to read) or facebook (a list X messages posted to the platform) are informational. But the functionality _around_ that information is more software-like in nature, so we end up with systems that need to balance "being a web page" with "also being a web app", or depending on the service, "being a web app" while also trying to "be a web page" when the web stack fails.

And the web stack essentially fails by default these days: the exploitation of people on the web through underhanded practices got so bad that your browser is more than likely to have a script blocker installed, as well as something will filter out all the advertisement spam, as well as an extension that tries to ensure your privacy on the web overall. Which means that most of the things that web apps rely on are disabled by default: no cookies, no tab-associated storage, not even JS by default. So if you're writing a web app, you need to also write a web page, which you can run your web app "on top of".

So back in 2016, somewhere around 0.14/0.15, after I was tasked with investigating if it was a useful technology for things that my employer was creating at the time, I was quite taken by this technology: this was a real webapp framework: it didn't care that it happened to run in the browser, everything it did, _it did_, and the fact that it happened to use a browser to render itself was essentially a bonus, but also entirely irrelevant. For software development, it was _fantastic_.

For web pages, not so much, and after a while React came with a way to "render" pages in an offline context, yielding static HTML that your server could serve up, which would then load React, which would then hook up that HTML to the React application that had generated that HTML. This was _very cool_ but meant you needed a server to generate that static content. It also meant you were serving _really large_ HTML files, because in order to hook everything up, React generated HTML with lots of additional markup that told it which elements corresponded to which parts of the UI. It was "cheaper" to just not serve pregenerated pages and instead say "you need JS to run this website".

And that's what the Primer for Bezier curves did, too. I loved React, and the idea that you needed JS anyway made sense: how are you going to use interactive graphics if you don't have JS enabled?

And for a while that was fine, but after a year or two it became obvious that in many ways, the older, more cumbersome to maintain web page was in fact superior as far as user experience went: at its core, the primer is an information source, and it shouldn't matter whether you're loading it in a state of the art browser, or using [lynx](https://en.wikipedia.org/wiki/Lynx_(web_browser)).

For a while this stayed at a realisation: the technology simply made it way too much work to cleanly pregenerate the primer and then have React cleanly hook back into things, but as with all things 2020, I found myself with some time off and a strong itch to finally fix this situation. Had I had that itch half a year earlier, I wouldn't have been able to do this rewrite, but in August 2020, everything had lined up: every browser except for IE11 has modern JS support, Node.js v14 has native ES module support, the `node-canvas` package is far enough along to support (almost!) everything I needed. The only real problem was Firefox on Android, which was still stuck on an ancient version, but amazingly while I was working on the rewrite a new version came out that got it on par with everything else, and so this rewrite was a go: it was time to make a web page.

Of course the days of "firing up Dreamweaver" are long gone, and these days if you want to make a web page, what you'll actually be doing is _assembling_ a web page. In my case, all the content was in Markdown format, and I had no intention of changing that: Markdown is super convenient for writing long stretches of text. But of course, my markdown is peppered with LaTeX and interactive graphics, so that needs to work too.





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
    - pregenerate everything that can be generated. You're building a web page, not an in-browser page builder. It should work immediately.

## Let's talk about modern JS

- modern JS
    `const`, `let`, `...`, `??`, `Object.fromEntries`/`Object.entries`, `async`+`await`
    `async` and `defer` attributes
    esmodules (remember `type="module"`!)
    custom elements
        - not quite react
        - let's invent a new framework!
            - mutation observer for attribute and child changes

