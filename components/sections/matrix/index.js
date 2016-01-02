var React = require("react");
var SectionHeader = require("../../SectionHeader.jsx");

var Matrix = React.createClass({
  getDefaultProps: function() {
    return {
      title: "Bézier curvatures as matrix operations"
    };
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>We can also represent Bézier as matrix operations, by expressing the Bézier formula
        as a polynomial basis function, the weight matrix, and the actual coordinates as matrix.
        Let's look at what this means for the cubic curve :</p>

        <p>\[
          B(t) = P_1 \cdot (1-t)^3 + P_2 \cdot 3 \cdot (1-t)^2 \cdot t + P_3 \cdot 3 \cdot (1-t) \cdot t^2 + P_4 \cdot t^3
        \]</p>

        <p>Disregarding our actual coordinates for a moment, we have:</p>

        <p>\[
          B(t) = (1-t)^3 + 3 \cdot (1-t)^2 \cdot t + 3 \cdot (1-t) \cdot t^2 + t^3
        \]</p>

        <p>We can write this as a sum of four expressions:</p>

        <p>\[
          \begin{matrix}
           ... & = & (1-t)^3 \\
             & + & 3 \cdot (1-t)^2 \cdot t \\
             & + & 3 \cdot (1-t) \cdot t^2 \\
             & + & t^3 \\
          \end{matrix}
        \]</p>

        <p>And we can expand these expressions:</p>

        <p>\[
          \begin{matrix}
           ... & = & (1-t) \cdot (1-t) \cdot (1-t) & = & -t^3 + 3 \cdot t^2 - 3 \cdot t + 1 \\
             & + & 3 \cdot (1-t) \cdot (1-t) \cdot t & = & 3 \cdot t^3 - 6 \cdot t^2 + 3 \cdot t \\
             & + & 3 \cdot (1-t) \cdot t \cdot t & = & -3 \cdot t^3 + 3 \cdot t^2 \\
             & + & t \cdot t \cdot t & = & t^3 \\
          \end{matrix}
        \]</p>

        <p>Furthermore, we can make all the 1 and 0 factors explicit:</p>

        <p>\[
          \begin{matrix}
           ... & = & -1 \cdot t^3 + 3 \cdot t^2 - 3 \cdot t + 1 \\
             & + & +3 \cdot t^3 - 6 \cdot t^2 + 3 \cdot t + 0 \\
             & + & -3 \cdot t^3 + 3 \cdot t^2 + 0 \cdot t + 0 \\
             & + & +1 \cdot t^3 + 0 \cdot t^2 + 0 \cdot t + 0 \\
          \end{matrix}
        \]</p>

        <p>And <em>that</em>, we can view as a series of four matrix operations:</p>

        <p>\[
          \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}-1 \\ 3 \\ -3 \\ 1\end{bmatrix}
          + \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}3 \\ -6 \\ 3 \\ 0\end{bmatrix}
          + \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}-3 \\ 3 \\ 0 \\ 0\end{bmatrix}
          + \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}1 \\ 0 \\ 0 \\ 0\end{bmatrix}
        \]</p>

        <p>If we compact this into a single matrix operation, we get:</p>

        <p>\[
          \begin{bmatrix}t^3 & t^2 & t & 1\end{bmatrix} \cdot \begin{bmatrix}
              -1 &  3 & -3 & 1 \\
               3 & -6 &  3 & 0 \\
              -3 &  3 &  0 & 0 \\
               1 &  0 &  0 & 0
            \end{bmatrix}
        \]</p>

        <p>This kind of polynomial basis representation is generally written with the bases in
        increasing order, which means we need to flip our <em>t</em> matrix horizontally, and our
        big "mixing" matrix upside down:</p>

        <p>\[
          \begin{bmatrix}1 & t & t^2 & t^3\end{bmatrix} \cdot \begin{bmatrix}
               1 &  0 &  0 & 0 \\
              -3 &  3 &  0 & 0 \\
               3 & -6 &  3 & 0 \\
              -1 &  3 & -3 & 1
            \end{bmatrix}
        \]</p>

        <p>And then finally, we can add in our original coordinates as a single third matrix:</p>

        <p>\[
          B(t) = \begin{bmatrix}
          1 & t & t^2 & t^3
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
           1 &  0 &  0 & 0 \\
          -3 &  3 &  0 & 0 \\
           3 & -6 &  3 & 0 \\
          -1 &  3 & -3 & 1
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
          P_1 \\ P_2 \\ P_3 \\ P_4
          \end{bmatrix}
        \]</p>

        <p>We can perform the same trick for the quadratic curve, in which case we end up with:</p>

        <p>\[
          B(t) = \begin{bmatrix}
          1 & t & t^2
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
           1 &  0 & 0 \\
          -2 &  2 & 0 \\
           1 & -2 & 1
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
          P_1 \\ P_2 \\ P_3
          \end{bmatrix}
        \]</p>

        <p>If we plug in a <em>t</em> value, and then multiply the matrices, we will
        get exactly the same values as when we evaluate the original polynomial function,
        or as when we evaluate the curve using progessive linear interpolation.</p>

        <p><strong>So: why would we bother with matrices?</strong> Matrix representations
        allow us to discover things about functions that would otherwise be hard to tell.
        It turns out that the curves form <a href="https://en.wikipedia.org/wiki/Triangular_matrix">triangular
        matrices</a>, and they have a determinant equal to the product of the actual
        coordinates we use for our curve. It's also invertible, which means there's
        <a href="https://en.wikipedia.org/wiki/Invertible_matrix#The_invertible_matrix_theorem">a
        ton of properties</a> that are all satisfied. Of course, the main question is:
        "Why is this useful to us, now?", and the answer to that is that it's not
        immediately useful, but you'll be seeing some instances where certain curve
        properties can be either computed via function manipulation, or via clever
        use of matrices, and sometimes the matrix approach can be (drastically) faster.</p>

        <p>So for now, just remember that we can represent curves this way, and let's move on.</p>
      </section>
    );
  }
});

module.exports = Matrix;
