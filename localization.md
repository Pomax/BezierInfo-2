# Localization is a group effort

I know, that seems like an obvious statement, but I want to dig a little deeper because just because you have a "web thing" that people might want to see translated or even fully localized, that doesn't mean that they can, or even if they can, that it's easy for them to do so.

As such, this is a story of a project that was blessed with two independent users wanting to translate content to Chinese and Japanese, and a codebase that was **absolutely not ready for that**. As of this blog post, it most definitely is, and that's been a few weeks worth of journey.

Let me take you through the travel log.

## Once upon a time...

there was a Primer on Bezier curves. Or rather, there was a Processing.js based exploration of the basics of Bezier curves because I was working on font generation and wanted to understand the intricacies of Bezier curves for the purposes of drawing curve outlines. Obviously I had to reinvent the wheel because that's what we do (right?) and so I wanted to understand the maths by implementing it in an interactive fashion.

As I learned more and more I kept updating that one short page until it was a long page instead, and once Google picked up on it I started taking "making sure it was sort of usable" more seriously. Jumping from 2011 to 2017, I thought I had a pretty good setup:

- the Primer is a React-managed single page.. err... page.
- each section is a separate JSX file wrapping both the JS functionality and the web content, with the `render()` function simply housing a big block of almost-HTML code with virtually no templating, so it reads like normal webpages (for the most part).
- the article as a whole loads all the sections, mines them for title data, uses that to build a ToC, and then just renders the entire article.


It even has clever code for dealing with "I just want to write about maths, not program about maths", so sections can contain code that isn't legal JSX in the slightest, but that's okay: babel loaders do some preprocessing and when the code actually gets to the "convert react to plain JS" step, everything is perfectly fine:

- LaTeX blocks get extracted and replaced with `<img src={LaTeXcontentHash.svg}>`
- example code gets safified so that I can write `i < 0` rather than having to bother with remembering to use `i &lt; 0`. Which is good: having to remember HTML entities is dumb.
- `<SectionHeader>` components ensure that each section ends up being a link for easy `index.html#navigation` navigation and bookmarking.

It gets even better because for the longest time the LaTeX would simply be parsed client-side using MathJax but that made the article load really slowly, necessitating progressive content loading and all kinds of other tricks that solved symptoms, not problems: the problem that LaTeX should be presented as normal maths.

So instead, the latex-loader was made to extract LaTeX code, run it offline through MathJax at build time, save the result as SVG file, and then include the SVGs in the article itself. Yes, it's over 150 SVG files but the speed boost from not needing to do LaTeX parsing of 150+ blocks is tremendous.  

So all in all it's pretty sweet!

## And then contributors show up

I've pretty much been working on the Primer on my own since 2011, with some help from people in terms of advice or suggestions, but never in the sense that they took the code, changes something radically, and then filed a PR and discussed the changes to get them landed.

In February of 2017, that changes. In the span of a week two people contacted me because they wanted to translate the article to their own language. Specifically: Chinese and Japanese. And this  is where, if you're an English content creator, things get interesting because that's not just translation: that's localization. While of course translation is involved, things like how maths statement are organized also changes.

I really wanted to take these folks up on their offer: getting the Primer translated so that the content would be more meaningful for Chinese and Japanese audiences is huge! But my code base was written by one person, for one person, for one language, and so I did the only thing I could think of:

**I told them I was super interested in having them help out, but would need a little time to make sure they could work on the code**.

This, I think, is the only way to respond when the world shows up at your doorstep asking to help you: you make it some tea, express your deepest gratitude and then you work your ass off to make sure it doesn't leave disappointed.

## Code base changes: let's talk about failures

I've worked with localized code bases before and there are some nice solutions out there for websites and apps. I figured I'd see if Transifex and Mozilla's Pontoon could be used, because that's what I've used in the past, but this is where traditional localization solutions break down.

Transifex is a translation service that lets you define your project in terms of key-value mappings, where you use the keys in your own content, and then you do a replacement for the values based on the locale data that you get from the transifex servers. This works really well for web apps, and general UI, but things get tricky for content like articles. In articles, where the content is structured in paragraphs and the ordering matters for the tone of the text, asking localizers to translate paragraphs or even single sentences fully detached from what comes before or after is almost guaranteed to give weird translations.

To make things easier in that respect, Mozilla's Pontoon project is an "on-page translation" localization system, where you load a .js file that turns all your on-page content into "double click and translate, and pontoon saves that translation for you", and while that sounds really nice, it turns out that setting it up for "not mozilla sites" is a little bit of work (and you want to, because your translations are not for a mozilla project, so you need to run your own copy of pontoon on something like a heroku app). However, even if you get that to work, you still have the problem that transifex has too: your localizers might have an easier time, but as an author you're still stuck being unable to write text yourself without then having to convert it to a weird, unreadable "mess" of `getText('section1-paragraph1')`, so you have no idea what you wrote.

Worse, and all key/value localization systems suffer from this: changing the text in the authoritative locale (in this case, en-GB) invalidates all localizations of that text. What do you do? 

The problems that come with these kinds of localization systems well too much. Either it didn't work for the localizers, or it didn't work for me as author, or it didn't work for the nature of the content, or any combination of those. So the traditional solutions for adding localization to a site were out. Not because they're unsuitable as localization solutions, but because for this project, they introduced more problems than they solved.

## Code base changes that work: Markdown 
 
And so after about a week of trying to make localization "easy" with string based localization services, instead I figured I'd roll my own solution because I was keeping people waiting for a week at this point and they had every reason to just go "well this Pomax guy's clearly not interested in getting help, time to look for something else to help out on". 

This is, by the way, your single biggest challenge in Open Source: if you thought it was hard to find contributors, it's ten times harder to make sure **you** respond in a timely fashion and make sure there is something for them to get started on. Don't have anything? Take a paid-time-off or vacation day and *make sure there are things for them to start on*. Or lose your contributor forever. If you leave a contributor hanging for more than a day, your project is not worth helping out on.

So I had to make this work, and the solution to the problem was super obvious in hindsight: just detach the content from the code. This is programming, we can make integration work in like, at least seven different ways, but the base case should be "here is the section as natural, flowing text, with embedded LaTeX where necessary and code blocks to illustrate how to program stuff. Just translate that" and so that's what I set out to achieve.

- I decided on a content format: sections would be an `index.js` for the JSX code, and a `content.en-GB.md` for my own English content.
- content would be pulled back into the JSX by... wait...

How do you pull markdown content into a JSX file? Unlike `js` or `jsx` or `json`, markdown content can't just be imported. And this is where things go a little different than you would expect: instead of solving this problem so that I had a working "full circle", solving this problem first would prevent translations from happening. Consequenlty **I stepped away from the problem and went back to my contributors**: I had a solution *for them*, and that came first.

Yes, it's nice to solve these things as they pop up, but the most important part is still to make sure contributors can start doing what they wanted to help you with and once I figured out how to at least split up the JSX into "JSX for the skeleton" and "Markdown for the content", that was it: I had a solution that unblocked my contributors so that *they* could now at least get started translating and making progress, even if the system for rebuilding the content wasn't done yet and I wouldn't be able to immediately deploy whatever PR they were going to throw my way.

And so that's what happened: their needs came first. Once I figured out how to at least split the content as JSX and Markdown, I split up the article preface and first three sections as `content.en-GB.md` and told the hopefully-still-willing-to-be-contributors that if they were still interested in helping out they could now start on these files. All they had to do was copy it to `content.zh-CN.md` or `content.ja-JP.md` and then modify that as best they knew how to.

And while they were doing that, I'd have some time to implement getting the Markdown loaded back into the JSX files to generate a site that, for visitors, was identical to the monolithic English one.    

The take-away here is primarily: **unblock your contributors before you unblock yourself**
     
## Reintegrating sections based on JSX and Markdown

While the contributors were working on their translations, I got back to work integrating Markdown into the JSX, and after a bit of thinking the solution to how to achieve that integration was remarkably simple: *you don't*.

I know, that sounds a bit silly, but it's not silly as you might first imagine; I solved this problem using the classic problem solving approach of "if X is hard, which Y is easy, and how do you turn X into Y". This is a general life skill when it comes to problem solving and I honestly don't practice it enough, but I practiced it here:

- Pulling markdown into JSX is hard,
- pulling JSX into JSX is trivial,
- how do I convert markdown into JSX?

Well, I'm good at programming, and both markdown and JSX are, at their code, just string data in a file. And converting string data into other string data is a pretty easy thing if you know how to program. So I wrote a script called `make-locales.js` which runs through the `./components/sections` directories looking for `content.*.md` files, filters the list of locales it finds that way, turning it into a list of unique locales, and then for each locale in that list does something like:

```
for (locale in locales) {
  giantMarkdownCollection = getAllContentFilesBelongingTo(locale)
  sectionAndContentMap = convertMarkdown(giantMarkdownCollection)
  convertedToJS = JSON.stringify(sectionAndContentMap)
  filesystem.write(`./locales/${locale}/content.js`, convertedToJS);
}
``` 

Running this script builds a `content.js` file that takes a form that matches the one necessary for any Node script (which JSX files are in my codebase) to trivially import with a single `require('content')` statement. By further making sure the data inside `content.js` is keyed in the same way as the original code base organised sections, I basically had a markdown-to-JSX conversion that the original code base didn't even notice was different. Everything basically worked the same as far as it was concerned.

### Further challenges: I'm not using *true* markdown

Of course, while the `get all content` and `stringify` operations are pretty easy, the crucial function to get right was that `convertMarkdown` function, to turn the markdown syntax into JSX syntax instead. Thankfully, JSX syntax is basically JavaScript with embedded "HTML that follows XML rules", and converting markdown to HTML is super easy: just pick any of twenty or so libraries to do so, and you're essentially done.

I picked the `marked` library to do things for me, but there was one real challenge that needed to be tackled: the content I write is a mix of "mostly normal text", "some LaTeX, sometimes", "some divs with specific classes to mark bits as notes, how-to-code, and figures, sometimes" and some JSX for each interactive graphic... also sometimes. And being a pure markdown converter, except for the "normal text" parts `marked` kind of didn't like any of that, so how would one make `marked` convert things properly? 

Same problem solution process: 

- Converting mixed Markdown content is hard,
- converting just plain markdown is trivial,
- only convert plain markdown and leave the other bits alone.

The crucial observation was that in the build system I already had, things like "LaTeX", "divs with classes for notes and howtos" and "JSX" already worked. So really the only thing that *needed* additional work was turning the markdown string sections into html string sections. 

Easy-peasy: I know how to write tokenizers, lexers and grammar parsers in general so I wrote a simple chained chunker that takes a markdown file, and then runs a super simple "chop it up, if I know how to chop it up" action.

Start with:

```
data = a full markdown file,
chunks = empty list to fill with data chunks,
chunkers = a list of latex, div, JSX, and BadMarkDown chunkers.
``` 

define a function to act as recursion point:

```
function performChunking(data, chunks, chunker, moreChunkers) {
  if no chunker:
    if data isn't empty:
      chunks.push({ convert: true, data: data })
    return;

  // otherwise, if there is a chunker:
  chunker(data, chunks, moreChunkers);
}
```

and then finally, you just start blindly running through the data:

```
function chunkLatex(data, chunks, chunkMore) {
  // run through the data looking for LaTeX blocks
  while there is data left to examine:
    if there is no latex left:
	  performChunking(data.substring(p), chunks, next, otherChunkers);
	  exit the chunkLatex function

    if there is, get the start of the latex block.
    Then, parse the non-LaTeX data prior to it using the rest of the chunkers:
	    performChunking(data.substring(...), chunks, next=chunkMore[0], chunkMore=chunkMore[1,...])

    And then capture the LaTeX block itself as a "don't convert" block
    chunks.push({ convert: false, type: "latex", start:..., end:..., data:...});
  }
}

function chunkDiv(data, chunks, chunkMore) {
  Same as above, except for <div> and </div> delimiters
}

function chunkJSX(data, chunks, chunkMore) {
  Same as above, except for <Graphic..../> lines
}

...
```

And so forth. This system ensures that a block that has no latex gets further analysed by the "div" code. Any divs are extracted, any non-div code is handed on to the JSX code, and so on and so on until there is no function left to examine with. At that point, we know it's just plain markdown and we record it as a "convert? yes!" data block.

At the end of this process (which actually runs *really* quickly), we end up with an object that looks like this:

```
chunked = [
  {
    start: 0,
    end: 312,
    type: "text"
    convert: true,
    data: "# section title\nThis is regular markdown..."
  },
  {
    start: 313
    end: 417,
    type: "LaTeX",
    convert: false,
    data: "\\[\nB(t) = (1-t)^3 + 3 \cdot (1-t)^2t + ... " 
  },
  ...
]
```

And so we simply run through this through a quick `map` function where any data that is marked as "convert? no!" is left alone, any data that is marked as "convert? yes!" is converted by `marked` from markdown to HTML data. Then we simply join all the blocks back up, and we actually have the kind of JSX that the original monolithic English article was already using. 

Winner!

### One last thing: JavaScript still needs to work

While the above procedure works *really* well, it left one problem: sections have interactive graphics, which are tied to individual React components. While components were single JSX files that was not a problem, but by pulling the content out I needed a way to make sure that JSX code like `<Graphics setup={this.setup} draw={this.draw}/>` still had a correct understanding of which JavaScript object was supposed to be used when it made calls for `this.something()`.

The solution to this is actually the simplest, borderline trivial,  a bit silly, but super effective: as each mapped chunk is strictly speaking already valid JSX I just took the string data and wrapped it in more string data that just turned it into a function call, wrapping it in `function(handler) { return <section>` at the start and `</section>; }` at the end, and making sure the JSX chunker replaced any `this` with the word `handler` instead. The result: code like this:

```
content = [
  "whatis": function(handler) {
    return <section>
     ...
     <Graphics setup={handler.setup} draw={handler.draw} />
     ...
    </section>;
  }
  ...
];
```  

And there you have it. Rather than importing this and then using it directly, a component can now import this and then call the function, passing itself in as the "handler":

```
var React = require("react");

var Locale = require("../../../lib/locale");
var locale = new Locale(__dirname);

return React.createClass({
  getDefaultProps() {
    return {
      title: locale.getTitle()
    };
  },
  setup() {
    ...
  }
  draw() {
    ...
  }
  render() {
    return locale.getContent(this);
  }
});
```

Sorted: suddenly we have a code base that is super easy to localize. Just change the `content.{local}.md` file, and the `make-locales.js` script will take care of the rest. In fact, with an `npm` task that watches for changes in `.md` files so that `make-locales.js` gets retriggered, and a webpack task for `js` files in general, live development didn't even need any changing: it just works.

## So what about that LaTeX? Is maths notation universal?

### spoilers: not if there's English in it

Here's the thing about localisation: you need to update *all* the content to work for a specific locale. Translating all the English text to something like Chinese is great and all but if the graphics still have English in them, things get weird. And while at this point the contributors were being quite productive and translating sections at a time, the LaTeX blocks still had English in them. 

Wouldn't it be nice if in a Japanese-localiazed Primer, this:

![English LaTeX](https://pomax.github.io/BezierInfo-2/images/latex/8090904d6448ed0c8e6151aecf62f361d51ead96.svg)

looked like this instead?

![Japanese LaTeX](https://pomax.github.io/BezierInfo-2/images/latex/98885bce8eeabb5a9bdddd12cd6cb4382115ad5c.svg)   

Of course the answer is "yes, that would be lovely actually" but unfortunately this ran into a wall: MathJax, for all the love I have for it, is English. It does not understand, and in fact breaks down incredibly, when you try to feed it anything other than English. So I had two options

- figure out how to make MathJax work with "any language"
- drop MathJax

To be clear: I tried option 1 first, but based on the response for questions around making MathJax deal with different fonts and languages I got from the MathJax devs, this very soon became a no-go. It is too hard, and too fragile, so that left option 2.

And as it so happens, I love XeLaTeX, the XeTeX version of LaTeX. That's two words you probably don't know so: if TeX is the system that lets you do beautiful typesetting for English, XeTeX is the completely from-the-ground-up rewrite of TeX that lets you do beautiful typestting in any language, with any font.

Needless to say I like XeLaTeX. And as I was already using MathJax as part of the build, in an offline setting, switching that over to just calling XeLaTeX instead was essentially trivial. As a result the only thing I had to do was write a small script to call XeLaTeX, and then call that in my `npm` scripts, replacing:

```
"latex": "node run lib/mathjax --latex ... --hash ..."
```
with
```
"latex": "node run lib/tex-to-svg --latex ... --hash ..."
```
What does this `tex-2-svg` do? Basically the same as before: it gets a block of LaTeX (base64 encoded), unpacks it, and runs it through conversion, but the way it does it is more fun: rather than just passing the LaTeX code to mathjax in a node.js context, it literally builds a `.tex` file on disk (in a dir that never gets committed to version control):

- `tex-2-svg.js` gets a `latex` string in Base64 encoding, and unpacks it
- it then wraps this in a bit of preamble and a document closer so that it's a legal .tex document that XeLaTeX will accept as legal input.
- it then calls what is effectively `execSync("xelatex thefileIjustmade.tex")`
	- `xelatex` converts to the .tex to .pdf,
- it then calls what is effectively `execSync("pdfcrop resultantPDF.pdf")`
	- `pdfcrop` crops the .pdf to fit the content exactly without any padding, 
- it then calls what is effectively `execSync("pdf2svg croppedPDF.pdf")`
	- `pdf2svg` converts the .pdf to .svg,
- finally, it calls what is effectively `execSync("svgo croppedPDF.svg")`
	- `svgo` optimizes the .svg by removing comments, compacting def/use etc.

And then we're done, the execSync calls stop, we return execution to the latex-loader, and it can consult the .svg file on disk to get the SVG width and height. Those matter because we need to know the exact height the SVG file will take up on the page, so that we can write an `<img src="..." width="..." height="..."/>` tag that will preallocate that space. If we didn't, the page would constantly be resizing as images get loaded in, and as we're dealing with 150+ images, that would be a horrendous experience. 

Of course if we had to run this every single time we ran `npm run dev` or `npm start`, that would be impossibly slow, so there is a shortcut in that any image for which the content hash already exists as `.svg` file skips the whole conversion process. Instead the latex-loader immediately grabs the `.svg` file for the width/height information and moves on.

## So how do we switch languages?

The page is hosted on github through the gh-pages functionality, and so some of the traditional ways to switch locales are not actually as appealing. Putting the locale in the URL, for instance, is not quite as easy when you'd literally have to make a dir by that name and put a file in there.

So initially I figured I'd just use a URL query argument: `index.html?locale=en-GB` would make a bit of script in the index file load the appropriate app bundle, and this would be sufficient for effecting different locales. That works really well, but one of the nice things about the Primer is that if you want an offline copy, you can literally just say "file -> save" and just save the page to your desktop. Done, you can now run it from file:// in the browser and it just works, and using query argument parsing to selectively load `article.{locale}.js` would remove that ability.

So directories it is: it's not clean from a dir structure perspective, but ultimate it's not the repo dir structure that *readers* care about. If their needs are not met, then it doesn't matter how clean the dir structure is.

Of course, you also need to be able to *switch* locales on the site, so I wrote a small component that offers users a compellingly simple choice:

> Read this in your own language: | **English** | **日本語** | **中文** |
> *Don't see your language listed? [Help translate this content!](https://github.com/Pomax/BezierInfo-2/wiki/localize)*

A simple list of languages that people can read if it's theirs, and a call-out to anyone who *wants* localized content but can't find it: this is an Open Source project, come help out!

## Finally: document everything

So now the code base can be localized! Hurray!

Last question: can people read up on how to do that without needing to ask questions, and just *do it*? If not, you're not done. Yes, it's great to have everything in place but unless you also write the documentation that explains how to do what people want to do, they're going to need help, and you probably won't have time to spend on helping them, so: write the docs that take you out of the equation.

I ended up documenting [the steps necessary to do localization](https://github.com/Pomax/BezierInfo-2/wiki/localize) on the github repo wiki, with links to the docs from the README.md, so that anyone visiting the repo --linked prominently on the Primer itself-- will immediately be able to find out what is involved and how they can make that work for them.

## So what's left?

There is still one area of localization left that's untackled: localizing the actual interactive graphics. The problem with these is that text for these comes from the browser, which requires having access to a font to draw text with. For English, that's no big deal because fonts are only a few tens of kilobytes, and you can pick any number of webfonts to make sure everyone sees the same graphic, but for Chinese or Japanese this gets considerably harder. As langauges with thousands of "letters" (glossing over what they really are for a moment) the fonts for these languages run in the megabytes each, and it is impossible to serve these up in an acceptable way, unless you use something like the `woff2` format with exact unicode ranges specifically for the text that needs to be typeset. That requires mining the graphics instructions for string calls and checking which exact "letters" are being used, so everyone else can be pruned from a common open source font (say, Noto Sans CJK) and the webfont literally only covers the text used on the site and nothing else.

That's quite a bit of work, and not a thing I've gotten to yet.   
