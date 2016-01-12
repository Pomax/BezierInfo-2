var React = require("react");
var SectionHeader = require("../../SectionHeader.jsx");

var Derivatives = React.createClass({
  getDefaultProps: function() {
    return {
      title: "Derivatives"
    };
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>There's a number of useful things that you can do with Bézier curves based on their derivative,
        and one of the more amusing observations about Bézier curves is that their derivatives are, in fact,
        also Bézier curves. In fact, the derivation of a Bézier curve is relatively straight forward, although
        we do need a bit of math. First, let's look at the derivative rule for Bézier curves, which is:</p>

        <p>\[
          Bézier'(n,t) = n \cdot \sum_{i=0}^{n-1} (b_{i+1}-b_i) \cdot Bézier(n-1,t)_i
        \]</p>

        <p>which we can also write (observing that <i>b</i> in this formula is the same as our <i>w</i> weights,
        and that <i>n</i> times a summation is the same as a summation where each term is multiplied by <i>n</i>)
        as:</p>

        <p>\[
          Bézier'(n,t) = \sum_{i=0}^{n-1} Bézier(n-1,t)_i \cdot n \cdot (w_{i+1}-w_i)
        \]</p>

        <p>Or, in plain text: the derivative of an n<sup>th</sup> degree Bézier curve is an (n-1)<sup>th</sup>
        degree Bézier curve, with one fewer term, and new weights w'<sub>0</sub>...w'<sub>n-1</sub> derived
        from the original weights as n(w<sub>i+1</sub> - w<sub>i</sub>), so for a 3rd degree curve, with four weights,
        the derivative has three new weights w'<sub>0</sub> = 3(w<sub>1</sub>-w<sub>0</sub>),
        w'<sub>1</sub> = 3(w<sub>2</sub>-w<sub>1</sub>) and w'<sub>2</sub> = 3(w<sub>3</sub>-w<sub>2</sub>).</p>

        <div className="note">
          <h3>"Slow down, why is that true?"</h3>

          <p>Sometimes just being told "this is the derivative" is nice, but you might want to see why
          this is indeed the case. As such, let's have a look at the proof for this derivative. First off,
          the weights are independent of the full Bézier function, so the derivative involves only the
          derivative of the polynomial basis function. So, let's find that:</p>

          <p>\[
            B_{n,k}(t) \frac{d}{dt} = {n \choose k} t^k (1-t)^{n-k} \frac{d}{dt}
          \]</p>

          <p>Applying the <a href="http://en.wikipedia.org/wiki/Product_rule">product</a> and
          <a href="http://en.wikipedia.org/wiki/Chain_rule">chain</a> rules gives us:</p>

          <p>\[\begin{array}{l}
            ... &= {n \choose k} \left (
              k \cdot t^{k-1} (1-t)^{n-k} + t^k \cdot (1-t)^{n-k-1} \cdot (n-k) \cdot -1
            \right )
          \end{array}\]</p>

          <p>Which is hard to work with, so let's expand that properly:</p>

          <p>\[\begin{array}{l}
            ... &= \frac{kn!}{k!(n-k)!} t^{k-1} (1-t)^{n-k} - \frac{(n-k)n!}{k!(n-k)!} t^k (1-t)^{n-1-k}
          \end{array}\]</p>

          <p>Now, the trick is to turn this expression into something that has binomial
          coefficients again, so we want to end up with things that look like "x! over y!(x-y)!".
          If we can do that in a way that involves terms of <i>n-1</i> and <i>k-1</i>, we'll
          be on the right track.</p>

          <p>\[\begin{array}{l}
            ... &= \frac{n!}{(k-1)!(n-k)!} t^{k-1} (1-t)^{n-k} - \frac{(n-k)n!}{k!(n-k)!} t^k (1-t)^{n-1-k} \\

            ... &= n \left (
              \frac{(n-1)!}{(k-1)!(n-k)!} t^{k-1} (1-t)^{n-k} - \frac{(n-k)(n-1)!}{k!(n-k)!} t^k (1-t)^{n-1-k}
            \right ) \\

            ... &= n \left (
              \frac{(n-1)!}{(k-1)!((n-1)-(k-1))!} t^{(k-1)} (1-t)^{(n-1)-(k-1)} - \frac{(n-1)!}{k!((n-1)-k)!} t^k (1-t)^{(n-1)-k}
            \right )
          \end{array}\]</p>

          <p>And that's the first part done: the two components inside the parentheses are actually
          regular, lower order Bezier expressions:</p>

          <p>\[\begin{array}{l}
            ... &= n \left (
              \frac{x!}{y!(x-y)!} t^{y} (1-t)^{x-y} - \frac{x!}{k!(x-k)!} t^k (1-t)^{x-k}
            \right )
            \ ,\ with\ x=n-1,\ y=k-1
            \\


            ... &= n \left ( B_{(n-1),(k-1)}(t) - B_{(n-1),k}(t) \right )
          \end{array}\]</p>

          <p>Now to apply this to our weighted Bezier curves. We'll write out the plain curve formula that
          we saw earlier, and then work our way through to its derivative:</p>

          <p>\[\begin{array}{l}
            Bézier_{n,k}(t) &=& B_{n,0}(t) \cdot w_0 + B_{n,1}(t) \cdot w_1 + B_{n,2}(t) \cdot w_2 + B_{n,3}(t) \cdot w_3 + ... \\
            Bézier_{n,k}(t) \frac{d}{dt} &=& n \cdot (B_{n-1,-1}(t) - B_{n-1,0}(t)) \cdot w_0 + \\
                                         & & n \cdot (B_{n-1,0}(t) - B_{n-1,1}(t)) \cdot w_1 + \\
                                         & & n \cdot (B_{n-1,1}(t) - B_{n-1,2}(t)) \cdot w_2 + \\
                                         & & n \cdot (B_{n-1,2}(t) - B_{n-1,3}(t)) \cdot w_3 + \\
                                         & & ...
          \end{array}\]</p>

          <p>If we expand this (with some color to show how terms line up), and reorder the terms by increasing values for <i>k</i>
            we see the following:</p>

          <p>\[\begin{array}{l}
            n \cdot B_{n-1,-1}(t) \cdot w_0 &+& & \\
            n \cdot B_{n-1,BLUE[0]}(t) \cdot w_1 &-& n \cdot B_{n-1,BLUE[0]}(t) \cdot w_0 & + \\
            n \cdot B_{n-1,RED[1]}(t) \cdot w_2 &-& n \cdot B_{n-1,RED[1]}(t) \cdot w_1 & + \\
            n \cdot B_{n-1,MAGENTA[2]}(t) \cdot w_3 &-& n \cdot B_{n-1,MAGENTA[2]}(t) \cdot w_2 & + \\
            ... &-& n \cdot B_{n-1,3}(t) \cdot w_3 & + \\
            ... & & &
          \end{array}\]</p>

          <p>Two of these terms fall way: the first term falls away because there is no
          -1<sup>st</sup> term in a summation. As such, it always contributes "nothing", so
          we can safely completely ignore it for the purpose of finding the derivative function.
          The other term is the very last term in this expansion: one involving <i>B<sub>n-1,n</sub></i>.
          This term would have a binomial coefficient of [<i>i</i> choose <i>i+1</i>], which is
          a non-existent binomial coefficient. Again, this term would contribute "nothing", so we
          can ignore it, too. This means we're left with:</p>

          <p>\[\begin{array}{l}
            n \cdot B_{n-1,BLUE[0]}(t) \cdot w_1 &-& n \cdot B_{n-1,BLUE[0]}(t) \cdot w_0 &+ \\
            n \cdot B_{n-1,RED[1]}(t) \cdot w_2 &-& \ n \cdot B_{n-1,RED[1]}(t) \cdot w_1 &+ \\
            n \cdot B_{n-1,MAGENTA[2]}(t) \cdot w_3 &-& n \cdot B_{n-1,MAGENTA[2]}(t) \cdot w_2 &+ \\
            ...
          \end{array}\]</p>

          <p>And that's just a summation of lower order curves:</p>

          <p>\[
            Bézier_{n,k}(t) \frac{d}{dt} = n \cdot B_{(n-1),BLUE[0]}(t) \cdot (w_1 - w_0)
                                      + n \cdot B_{(n-1),RED[1]}(t) \cdot (w_2 - w_1)
                                      + n \cdot B_{(n-1),MAGENTA[2]}(t) \cdot (w_3 - w_2)
                                      \ + \ ...
          \]</p>

          <p>We can rewrite this as a normal summation, and we're done:</p>
          <p>\[
            Bézier_{n,k}(t) \frac{d}{dt} = \sum_{k=0}^{n-1} n \cdot B_{n-1,k}(t) \cdot (w_{k+1} - w_k)
                                         = \sum_{k=0}^{n-1} B_{n-1,k}(t) \cdot \underset{derivative\ weights}
                                           {\underbrace{n \cdot (w_{k+1} - w_k)}}
          \]</p>
        </div>

        <p>Let's rewrite that in a form similar to our original formula, so we can see the difference. We will
        first list our original formula for Bézier curves, and then the derivative:</p>

        <p>\[
          Bézier(n,t) = \sum_{i=0}^{n}
                        \underset{binomial\ term}{\underbrace{\binom{n}{i}}}
                        \cdot\
                        \underset{polynomial\ term}{\underbrace{(1-t)^{n-i} \cdot t^{i}}}
                        \cdot\
                        \underset{weight}{\underbrace{w_i}}
        \]</p>

        <p>\[
          Bézier'(n,t) = \sum_{i=0}^{k}
                        \underset{binomial\ term}{\underbrace{\binom{k}{i}}}
                        \cdot\
                        \underset{polynomial\ term}{\underbrace{(1-t)^{k-i} \cdot t^{i}}}
                        \cdot\
                        \underset{derivative\ weight}{\underbrace{n \cdot (w_{i+1} - w_i)}}
                        {\ , \ with \ k=n-1}
        \]</p>


        <p>What are the differences? In terms of the actual Bézier curve, virtually nothing!
        We lowered the order (rather than <i>n</i>, it's now <i>n-1</i>), but it's still the
        same Bézier function. The only real difference is in how the weights change when we
        derive the curve's function. If we have four points A, B, C, and D, then the derivative
        will have three points, the second derivative two, and the third derivative one:</p>

        <p>\[ \begin{array}{l}
          B(n,t),    &        & w = \{A,B,C,D\} \\
          B'(n,t),   & n = 3, & w' = \{A',B',C'\}    &= \{3 \cdot (B-A), {\ } 3 \cdot (C-B), {\ } 3 \cdot (D-C)\} \\
          B''(n,t),  & n = 2, & w'' = \{A'',B''\}    &= \{2 \cdot (B'-A'), {\ } 2 \cdot (C'-B')\} \\
          B'''(n,t), & n = 1, & w''' = \{A'''\} &= \{1 \cdot (B''-A'')\}
        \end{array} \]</p>

        <p>We can keep performing this trick for as long as we have more than one weight. Once
        we have one weight left, the next step will see <i>k = 0</i>, and the result of our
        "Bézier function" summation is zero, because we're not adding anything at all. As such,
        a quadratic curve has no second derivative, a cubic curve has no third derivative, and
        generalized: an <i>n<sup>th</sup></i> order curve has <i>n-1</i> (meaningful) derivatives,
        with any further derivative being zero.</p>

      </section>
    );
  }
});

module.exports = Derivatives;
