# Preface

In order to draw things in 2D, we usually rely on lines, which typically get classified into two categories: straight lines, and curves. The first of these are as easy to draw as they are easy to make a computer draw. Give a computer the first and last point in the line, and BAM! straight line. No questions asked.

Curves, however, are a much bigger problem. While we can draw curves with ridiculous ease freehand, computers are a bit handicapped in that they can't draw curves unless there is a mathematical function that describes how it should be drawn. In fact, they even need this for straight lines, but the function is ridiculously easy, so we tend to ignore that as far as computers are concerned; all lines are "functions", regardless of whether they're straight or curves. However, that does mean that we need to come up with fast-to-compute functions that lead to nice looking curves on a computer. There are a number of these, and in this article we'll focus on a particular function that has received quite a bit of attention and is used in pretty much anything that can draw curves: Bézier curves.

They're named after [Pierre Bézier](https://en.wikipedia.org/wiki/Pierre_B%C3%A9zier), who is principally responsible for making them known to the world as a curve well-suited for design work (publishing his investigations in 1962 while working for Renault), although he was not the first, or only one, to "invent" these type of curves. One might be tempted to say that the mathematician [Paul de Casteljau](https://en.wikipedia.org/wiki/Paul_de_Casteljau) was first, as he began investigating the nature of these curves in 1959 while working at Citroën, and came up with a really elegant way of figuring out how to draw them. However, de Casteljau did not publish his work, making the question "who was first" hard to answer in any absolute sense. Or is it? Bézier curves are, at their core, "Bernstein polynomials", a family of mathematical functions investigated by [Sergei Natanovich Bernstein](https://en.wikipedia.org/wiki/Sergei_Natanovich_Bernstein), whose publications on them date back at least as far as 1912.

Anyway, that's mostly trivia, what you are more likely to care about is that these curves are handy: you can link up multiple Bézier curves so that the combination looks like a single curve. If you've ever drawn Photoshop "paths" or worked with vector drawing programs like Flash, Illustrator or Inkscape, those curves you've been drawing are Bézier curves.

But what if you need to program them yourself? What are the pitfalls? How do you draw them? What are the bounding boxes, how do you determine intersections, how can you extrude a curve, in short: how do you do everything that you might want to do with these curves? That's what this page is for. Prepare to be mathed!

<div class="print">

## PS: buy me a coffee?

If you enjoyed this book enough to print it out, you might be wondering if there is some way to give something back. To answer that question: you can always buy me a coffee, however-much a coffee is where you live. Or, if you want to pay a fair price for this book, you can buy me a really expensive coffee =)

This book has grown over the years from a short primer to a 100+ print-page-equivalent ebook on the subject of Bézier curves, and a lot of coffee went into the making of it. I don't regret a minute I spent on writing it, but I can always do with some more coffee to keep on writing! Please visit https://pomax.github.io/bezierinfo/ and click on the link in the "Help support the book" preface section to donate some coffee money.

</div>

—Pomax (or in the tweetworld, [@TheRealPomax](https://twitter.com/TheRealPomax))

<div class="note">

## Virtually all Bézier graphics are interactive.

This page uses interactive examples, relying heavily on [Bezier.js](https://pomax.github.io/bezierjs/), as well as maths formulae which are typeset into SVG using the [XeLaTeX](https://ctan.org/pkg/xetex) typesetting system and [pdf2svg](https://github.com/dawbarton/pdf2svg) by [David Barton](https://cityinthesky.co.uk/).

## This book is open source.

This book is an open source software project, and lives on two github repositories. The first is [https://github.com/pomax/bezierinfo](https://github.com/pomax/bezierinfo) and is the purely-for-presentation version you are viewing right now. The other repository is [https://github.com/pomax/BezierInfo-2](https://github.com/pomax/BezierInfo-2), which is the development version, housing all the code that gets turned _into_ the web version, and is also where you should file issues if you find bugs or have ideas on what to change or add to the primer.

## How complicated is the maths going to be?

Most of the mathematics in this Primer are early high school maths. If you understand basic arithmetic, and you know how to read English, you should be able to get by just fine. There will at times be *far* more complicated maths, but if you don't feel like digesting them, you can safely skip over them by either skipping over the "detail boxes" in section or by just jumping to the end of a section with maths that looks too involving. The end of sections typically simply list the conclusions so you can just work with those values directly.

## Questions, comments:

If you have suggestions for new sections, hit up the [Github issue tracker](https://github.com/pomax/BezierInfo-2/issues) (also reachable from the repo linked to in the upper right). If you have questions about the material, there's currently no comment section while I'm doing the rewrite, but you can use the issue tracker for that as well. Once the rewrite is done, I'll add a general comment section back in, and maybe a more topical "select this section of text and hit the 'question' button to ask a question about it" system. We'll see.

## Help support the book!

If you enjoyed this book, or you simply found it useful for something you were trying to get done, and you were wondering how to let me know you appreciated this book, you have two options: you can either head on over to the [Patreon page](https://www.patreon.com/bezierinfo) for this book, or if you prefer to make a one-time donation, head on over to the [buy Pomax a coffee](https://www.paypal.com/donate/?token=4OeU2bI9WLfex_fYcraxmooLUcJ_WDTn8AofsN1WYchMI7RB5Jq6CSZuAWNQTekJGyOh3G) page. This work has grown from a small primer to a 100-plus print-page-equivalent reader on the subject of Bézier curves over the years, and a lot of coffee went into the making of it. I don't regret a minute I spent on writing it, but I can always do with some more coffee to keep on writing!

</div>
