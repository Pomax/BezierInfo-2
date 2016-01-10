var React = require("react");
var SectionHeader = require("../../SectionHeader.jsx");

var MatrixSplit = React.createClass({
  getDefaultProps: function() {
    return {
      title: "Splitting curves using matrices"
    };
  },

  render: function() {
    return (
      <section>
        <SectionHeader {...this.props} />

        <p>Another way to split curves is to exploit the matrix representation of
        a Bézier curve. In <a href="#matrix">the section on matrices</a> we saw that
        we can represent curves as matrix multiplications. Specifically, we saw these
        two forms for the quadratic, and cubic curves, respectively (using the reversed
        Bézier coefficients vector for legibility):</p>

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

        <p>and</p>

        <p>\[
          B(t) = \begin{bmatrix}
          1 & t & t^2 & t^3
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
           1 &  0 &  0 & 0\\
          -3 &  3 &  0 & 0\\
           3 & -6 &  3 & 0\\
          -1 &  3 & -3 & 1
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
          P_1 \\ P_2 \\ P_3 \\ P_4
          \end{bmatrix}
        \]</p>

        <p>Let's say we want to split the curve at some point <em>t = z</em>, forming
        two new (obviously smaller) Bézier curves. To find the coordinates for these
        two Bézier curves, we can use the matrix representation and some linear algebra.
        First, we split out the the actual "point on the curve" information as a new matrix
        multiplication:</p>

        <p>\[
          B(t) =
          \begin{bmatrix}
          1 & (z \cdot t) & (z \cdot t)^2
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
          =
          \begin{bmatrix}
          1 & t & t^2
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
          1 & 0 & 0 \\
          0 & z & 0 \\
          0 & 0 & z^2
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

        <p>and</p>

        <p>\[
          B(t) =
          \begin{bmatrix}
          1 & (z \cdot t) & (z \cdot t)^2 & (z \cdot t)^3
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
          =
          \begin{bmatrix}
          1 & t & t^2 & t^3
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
          1 & 0 & 0   & 0\\
          0 & z & 0   & 0\\
          0 & 0 & z^2 & 0\\
          0 & 0 & 0   & z^3
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

        <p>If we could compact these matrices back to a form <strong>[t values] · [bezier matrix] · [column matrix]</strong>,
        with the first two staying the same, then that column matrix on the right would be the coordinates
        of a new Bézier curve that describes the first segment, from <em>t = 0</em> to <em>t = z</em>.
        As it turns out, we can do this quite easily, by exploiting some simple rules of linear algebra
        (and if you don't care about the derivations, just skip to the end of the box for the results!).</p>

        <div className="note">
          <h2>Deriving new hull coordinates</h2>

          <p>Deriving the two segments upon splitting a curve takes a few steps, and the higher
          the curve order, the more work it is, so let's look at the quadratic curve first:</p>

          <p>\[
            B(t) =
            \begin{bmatrix}
            1 & t & t^2
            \end{bmatrix}
            \cdot
            \begin{bmatrix}
            1 & 0 & 0 \\
            0 & z & 0 \\
            0 & 0 & z^2
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

          <p>\[
            =
            \begin{bmatrix}
            1 & t & t^2
            \end{bmatrix}
            \cdot
            \underset{we\ turn\ this...}{\underbrace{\kern 2.25em Z \cdot M \kern 2.25em}}
            \cdot
            \begin{bmatrix}
            P_1 \\ P_2 \\ P_3
            \end{bmatrix}
          \]</p>

          <p>\[
            =
            \begin{bmatrix}
            1 & t & t^2
            \end{bmatrix}
            \cdot
            \underset{...into\ this...}{\underbrace{ M \cdot M^{-1} \cdot Z \cdot M }}
            \cdot
            \begin{bmatrix}
            P_1 \\ P_2 \\ P_3
            \end{bmatrix}
          \]</p>

          <p>\[
            =
            \begin{bmatrix}
            1 & t & t^2
            \end{bmatrix}
            \cdot
            M
            \underset{...to\ get\ \ this!}{\underbrace{ \kern 1.25em \cdot \kern 1.25em Q \kern 1.25em \cdot \kern 1.25em}}
            \begin{bmatrix}
            P_1 \\ P_2 \\ P_3
            \end{bmatrix}
          \]</p>

          <p>We do this, because [<em>M · M<sup>-1</sup></em>] is the identity matrix (a bit like
          multiplying something by x/x in calculus. It doesn't do anything to the function, but it
          does allow you to rewrite it to something that may be easier to work with, or can be
          broken up differently). Adding that as matrix multiplication has no effect on the total
          formula, but it does allow us to change the matrix sequence [<em>something · M</em>] to
          a sequence [<em>M · something</em>], and that makes a world of difference: if we know
          what [<em>M<sup>-1</sup> · Z · M</em>] is, we can apply that to our coordinates, and be
          left with a proper matrix representation of a quadratic Bézier curve (which is
          [<em>T · M · P</em>]), with a new set of coordinates that represent the curve from
          <em>t = 0</em> to <em>t = z</em>. So let's get computing:</p>

          <p>\[
            Q = M^{-1} \cdot Z \cdot M =
            \begin{bmatrix}
            1 & 0 & 0 \\
            1 & \frac{1}{2} & 0 \\
            1 & 1 & 1
            \end{bmatrix}
            \cdot
            \begin{bmatrix}
            1 & 0 & 0 \\
            0 & z & 0 \\
            0 & 0 & z^2
            \end{bmatrix}
            \cdot
            \begin{bmatrix}
             1 &  0 & 0 \\
            -2 &  2 & 0 \\
             1 & -2 & 1
            \end{bmatrix}
            =
            \begin{bmatrix}
            1 & 0 & 0 \\
            -(z-1) & z & 0 \\
            (z - 1)^2 & -2 \cdot (z-1) \cdot z & z^2
            \end{bmatrix}
          \]</p>

          <p>Excellent! Now we can form our new quadratic curve:</p>

          <p>\[
            B(t) =
            \begin{bmatrix}
            1 & t & t^2
            \end{bmatrix}
            \cdot M \cdot Q \cdot
            \begin{bmatrix}
            P_1 \\ P_2 \\ P_3
            \end{bmatrix}
            =
            \begin{bmatrix}
            1 & t & t^2
            \end{bmatrix}
            \cdot
            M
            \cdot
            \left (
            Q
            \cdot
            \begin{bmatrix}
            P_1 \\ P_2 \\ P_3
            \end{bmatrix}
            \right )
          \]</p>

          <p>\[
            =
            \begin{bmatrix}
            1 & t & t^2
            \end{bmatrix}
            \cdot
            \begin{bmatrix}
             1 &  0 & 0 \\
            -2 &  2 & 0 \\
             1 & -2 & 1
            \end{bmatrix}
            \cdot
            \left (
            \begin{bmatrix}
            1 & 0 & 0 \\
            -(z-1) & z & 0 \\
            (z - 1)^2 & -2 \cdot (z-1) \cdot z & z^2
            \end{bmatrix}
            \cdot
            \begin{bmatrix}
            P_1 \\ P_2 \\ P_3
            \end{bmatrix}
            \right )
          \]</p>

          <p>\[
            =
            \begin{bmatrix}
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
              P_1 \\
              z \cdot P_2 - (z-1) \cdot P_1 \\
              z^2 \cdot P_3 - 2 \cdot z \cdot (z-1) \cdot P_2 + (z - 1)^2 \cdot P_1
            \end{bmatrix}
          \]</p>

          <p><strong><em>Brilliant</em></strong>: if we want a subcurve from <em>t = 0</em>
          to <em>t = z</em>, we can keep the first coordinate the same (which makes sense),
          our control point becomes a z-ratio mixture of the original control point and the start
          point, and the new end point is a mixture that looks oddly similar to a bernstein
          polynomial of degree two, except it uses (z-1) rather than (1-z)... These new
          coordinates are actually really easy to compute directly!</p>

          <p>Of course, that's only one of the two curves. Getting the section from <em>t = z</em>
          to <em>t = 1</em> requires doing this again. We first observe what what we just did is
          actually evaluate the general interval [0,<em>z</em>], which we wrote down simplified
          becuase of that zero, but we actually evaluated this:</p>

          <p>\[
            B(t) =
            \begin{bmatrix}
            1 & ( 0 + z \cdot t) & ( 0 + z \cdot t)^2
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

          <p>\[
            =
            \begin{bmatrix}
            1 & t & t^2
            \end{bmatrix}
            \cdot
            \begin{bmatrix}
            1 & 0 & 0 \\
            0 & z & 0 \\
            0 & 0 & z^2
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

          <p>If we want the interval [<em>z</em>,1], we will be evaluating this instead:</p>

          <p>\[
            B(t) =
            \begin{bmatrix}
            1 & ( z + (1-z) \cdot t) & ( z + (1-z) \cdot t)^2
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

          <p>\[
            =
            \begin{bmatrix}
            1 & t & t^2
            \end{bmatrix}
            \cdot
            \begin{bmatrix}
            1 & z & z^2 \\
            0 & 1-z & 2 \cdot z \cdot (1-z) \\
            0 & 0 & (1-z)^2
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

          <p>We're going to do the same trick, to turn <em>[something · M]</em> into <em>[M · something]</em>:</p>

          <p>\[
            Q' = M^{-1} \cdot Z' \cdot M =
            \begin{bmatrix}
            1 & 0 & 0 \\
            1 & \frac{1}{2} & 0 \\
            1 & 1 & 1
            \end{bmatrix}
            \cdot
            \begin{bmatrix}
            1 & z & z^2 \\
            0 & 1-z & 2 \cdot z \cdot (1-z) \\
            0 & 0 & (1-z)^2
            \end{bmatrix}
            \cdot
            \begin{bmatrix}
             1 &  0 & 0 \\
            -2 &  2 & 0 \\
             1 & -2 & 1
            \end{bmatrix}
            =
            \begin{bmatrix}
            (z-1)^2 & -2 \cdot z \cdot (z-1) & z^2 \\
            0 & -(z-1) & z \\
            0 & 0 & 1
            \end{bmatrix}
          \]</p>

          <p>So, our final second curve looks like:</p>

          <p>\[
            B(t) =
            \begin{bmatrix}
            1 & t & t^2
            \end{bmatrix}
            \cdot M \cdot Q \cdot
            \begin{bmatrix}
            P_1 \\ P_2 \\ P_3
            \end{bmatrix}
            =
            \begin{bmatrix}
            1 & t & t^2
            \end{bmatrix}
            \cdot
            M
            \cdot
            \left (
            Q'
            \cdot
            \begin{bmatrix}
            P_1 \\ P_2 \\ P_3
            \end{bmatrix}
            \right )
          \]</p>

          <p>\[
            =
            \begin{bmatrix}
            1 & t & t^2
            \end{bmatrix}
            \cdot
            \begin{bmatrix}
             1 &  0 & 0 \\
            -2 &  2 & 0 \\
             1 & -2 & 1
            \end{bmatrix}
            \cdot
            \left (
            \begin{bmatrix}
            (z-1)^2 & -2 \cdot z \cdot (z-1) & z^2 \\
            0 & -(z-1) & z \\
            0 & 0 & 1
            \end{bmatrix}
            \cdot
            \begin{bmatrix}
            P_1 \\ P_2 \\ P_3
            \end{bmatrix}
            \right )
          \]</p>

          <p>\[
            =
            \begin{bmatrix}
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
              z^2 \cdot P_3 - 2 \cdot z \cdot (z-1) \cdot P_2 + (z-1)^2 \cdot P_1 \\
              z \cdot P_3  - (z-1) \cdot P_2 \\
              P_3
            \end{bmatrix}
          \]</p>

          <p><strong><em>Nice</em></strong>: we see the same as before; can keep the last
          coordinate the same (which makes sense), our control point becomes a z-ratio
          mixture of the original control point and the end point, and the new start point
          is a mixture that looks oddly similar to a bernstein polynomial of degree two,
          except it uses (z-1) rather than (1-z). These new coordinates are <em>also</em>
          really easy to compute directly!</p>
        </div>

        <p>So, using linear algebra rather than de Casteljau's algorithm, we have determined
        that for any quadratic curve split at some value <em>t = z</em>, we get two subcurves
        that are described as Bézier curves with simple-to-derive coordinates.</p>

        <p>\[
          \begin{bmatrix}
          1 & 0 & 0 \\
          -(z-1) & z & 0 \\
          (z - 1)^2 & -2 \cdot (z-1) \cdot z & z^2
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
          P_1 \\ P_2 \\ P_3
          \end{bmatrix}
          =
          \begin{bmatrix}
            P_1 \\
            z \cdot P_2 - (z-1) \cdot P_1 \\
            z^2 \cdot P_3 - 2 \cdot z \cdot (z-1) \cdot P_2 + (z - 1)^2 \cdot P_1
          \end{bmatrix}
        \]</p>

        <p>and</p>

        <p>\[
          \begin{bmatrix}
          (z-1)^2 & -2 \cdot z \cdot (z-1) & z^2 \\
          0 & -(z-1) & z \\
          0 & 0 & 1
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
          P_1 \\ P_2 \\ P_3
          \end{bmatrix}
          =
          \begin{bmatrix}
            z^2 \cdot P_3 - 2 \cdot z \cdot (z-1) \cdot P_2 + (z-1)^2 \cdot P_1 \\
            z \cdot P_3  - (z-1) \cdot P_2 \\
            P_3
          \end{bmatrix}
        \]</p>

        <p>We can do the same for cubic curves. However, I'll spare you the actual derivation
        (don't let that stop you from writing that out yourself, though) and simply show you
        the resulting new coordinate sets:</p>

        <p>\[
          \begin{bmatrix}
            1 & 0 & 0 & 0 \\
            -(z-1) & z & 0 & 0 \\
            (z-1)^2 & -2 \cdot (z-1) \cdot z & z^2 & 0 \\
            -(z-1)^3 & 3 \cdot (z-1)^2 \cdot z & -3 \cdot (z-1) \cdot z^2 & z^3
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
           P_1 \\ P_2 \\ P_3 \\ P_4
          \end{bmatrix}
          =
          \begin{bmatrix}
            P_1 \\
            z \cdot P_2 - (z-1) \cdot P_1 \\
            z^2 \cdot P_3 - 2 \cdot z \cdot (z-1) \cdot P_2 + (z-1)^2 \cdot P_1 \\
            z^3 \cdot P_4 - 3 \cdot z^2 \cdot (z-1) \cdot P_3 + 3 \cdot z \cdot (z-1)^2 \cdot P_2 - (z-1)^3 \cdot P_1
          \end{bmatrix}
        \]</p>

        <p>and</p>

        <p>\[
          \begin{bmatrix}
            -(z-1)^3 & 3 \cdot (z-1)^2 \cdot z & -3 \cdot (z-1)^3 \cdot z^2 & z^3 \\
            0 & (z-1)^2 & -2 \cdot (z-1) \cdot z & z^2 \\
            0 & 0 & -(z-1) & z \\
            0 & 0 & 0 & 1
          \end{bmatrix}
          \cdot
          \begin{bmatrix}
           P_1 \\ P_2 \\ P_3 \\ P_4
          \end{bmatrix}
          =
          \begin{bmatrix}
            z^3 \cdot P_4 - 3 \cdot z^2 \cdot (z-1) \cdot P_3 + 3 \cdot z \cdot (z-1)^2 \cdot P_2 - (z-1)^3 \cdot P_1 \\
            z^2 \cdot P_4 - 2 \cdot z \cdot (z-1) \cdot P_3 + (z-1)^2 \cdot P_2 \\
            z \cdot P_4 - (z-1) \cdot P_3 \\
            P_4
          \end{bmatrix}
        \]</p>

        <p>So, looking at our matrices, did we really need to compute the second segment matrix?
        No, we didn't. Actually having one segment's matrix means we implicitly have the other:
        push the values of each row in the matrix <strong><em>Q</em></strong> to the right, with
        zeroes getting pushed off the right edge and appearing back on the left, and then flip
        the matrix vertically. Presto, you just "calculated" <strong><em>Q'</em></strong>.</p>

        <p>Implementing curve splitting this way requires less recursion, and is just straight
        arithmetic with cached values, so can be cheaper on systems were recursion is expensive.
        If you're doing computation with devices that are good at matrix multiplication, chopping
        up a Bézier curve with this method will be a lot faster than applying de Casteljau.</p>
      </section>
    );
  }
});

module.exports = MatrixSplit;
