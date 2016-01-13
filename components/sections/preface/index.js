var React = require("react");

var Preface = React.createClass({
  getDefaultProps: function() {
    return {
      title: "Preface"
    };
  },

  render: function() {
    return (
      <section>
        <h2>{this.props.title}</h2>

        <p>In order to draw things in 2D, we usually rely on lines, which typically get classified
        into two categories: straight lines, and curves. The first of these are as easy to draw as they
        are easy to make a computer draw. Give a computer the first and last point in the line, and
        BAM! straight line. No questions asked.</p>

        <p>Curves, however, are a much bigger problem. While we can draw curves with ridiculous ease
        freehand, computers are a bit handicapped in that they can't draw curves unless there is a
        mathematical function that describes how it should be drawn. In fact, they even need this for
        straight lines, but the function is ridiculously easy, so we tend to ignore that as far as
        computers are concerned, all lines are "functions", regardless of whether they're straight
        or curves. However, that does mean that we need to come up with fast-to-compute functions that
        lead to nice looking curves on a computer. There's a number of these, and in this article
        we'll focus on a particular function that has received quite a bit of attention, and is used
        in pretty much anything that can draw curves: "Bézier" curves</p>

        <p>They're named after <a href="https://en.wikipedia.org/wiki/Pierre_B%C3%A9zier">Pierre
        Bézier</a>, who is principally responsible for getting them known to the world as a curve
        well-suited for design work (working for Renault and publishing his investigations in 1962),
        although he was not the first, or only one, to "invent" these type of curves.
        One might be tempted to say that the mathematician <a href="https://en.wikipedia.org/wiki/Paul_de_Casteljau">Paul
        de Casteljau</a> was first, investigating the nature of these curves in 1959 while working at
        Citroën, coming up with a really elegant way of figuring out how to draw them. However, de
        Casteljau did not publish his work, making the question "who was first" hard to answer in
        any absolute sense. Or is it? Bézier curves are, at their core, "Bernstein polynomials", a family
        of mathematical functions investigated
        by <a href="https://en.wikipedia.org/wiki/Sergei_Natanovich_Bernstein">Sergei Natanovich Bernstein</a>,
        with publications on them at least as far back as 1912. Anyway, that's mostly trivia, what
        you are more likely to care about is that these curves are handy: you can link up multiple
        Bézier curves so that the combination looks like a single curve. If you've ever drawn Photoshop
        "paths" or worked with vector drawing programs like Flash, Illustrator or Inkscape, those curves
        you've been drawing are Bézier curves.</p>

        <p>So, what if you need to program them yourself? What are the pitfalls? How do you draw them?
        What are the bounding boxes, how do you determine intersections, how can you extrude a curve,
        in short: how do you do everything that you might want when you do with these curves? That's
        what this page is for. Prepare to be mathed!</p>

        <p>—Pomax (or in the tweetworld, <a href="https://twitter.com/TheRealPomax">@TheRealPomax</a>)</p>

        <div className="note">
          <h2>Note: All Bézier graphics are interactive.</h2>

          <p>This page uses interactive examples, relying heavily on <a href="http://pomax.github.io/bezierjs/">Bezier.js</a>,
          as well as "real" maths (in LaTeX form) which is typeset using the most excellent <a href="http://MathJax.org">MathJax</a> library.
          The page is generated offline as a React application, using Webpack, which has made adding
          "view source" options considerably more challenging. I'm still trying to figure out how to
          add them back in, but it didn't feel like it should hold up deploying this update compared
          to the previous years' version.</p>

          <h2>How complicated is the maths going to be?</h2>

          <p>Most of the mathematics in this Primer are early high school maths. If you understand basic
          arithmetic, and you know how to read English, you should be able to get by just fine. There
          will at times be <em>far</em> more complicated maths, but if you don't feel like digesting
          them, you can safely skip over them by either skipping over the "detail boxes" in section
          or by just jumping to the end of a section with maths that looks too involving. The end of
          sections typically simply list the conclusions so you can just work with those values directly.</p>

          <h2>Questions, comments:</h2>

          If you have suggestions for new sections, hit up the <a href="https://github.com/pomax/bezierinfo/issues">github
          issue tracker</a> (also reachable from the repo linked to in the upper right). If you have
          questions about the material, there's currently no comment section while I'm doing the rewrite,
          but you can use the issue tracker for that as well. Once the rewrite is done, I'll add a general
          comment section back in, and maybe a more topical "select this section of text and hit the
          'question' button to ask a question about it" system. We'll see.
        </div>
      </section>
    );
  }
});

module.exports = Preface;
