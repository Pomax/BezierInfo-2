        <p>Bézier curves are a form of "parametric" function. Mathematically speaking, parametric
        functions are cheats: a "function" is actually a well defined term representing a mapping
        from any number of inputs to a <strong>single</strong> output. Numbers go in, a single
        number comes out. Change the numbers that go in, and the number that comes out is still
        a single number. Parametric functions cheat. They basically say "alright, well, we want
        multiple values coming out, so we'll just use more than one function". An illustration:
        Let's say we have a function that maps some value, let's call it <i>x</i>, to
        some other value, using some kind of number manipulation:</p>

        <p>\[
          f(x) = \sin(x)
        \]</p>

        <p>The notation <i>f(x)</i> is the standard way to show that it's a function (by convention
        called <i>f</i> if we're only listing one) and its output changes based on one variable
        (in this case, <i>x</i>). Change <i>x</i>, and the output for <i>f(x)</i> changes.</p>

        <p>So far so good. Now, let's look at parametric functions, and how they cheat.
        Let's take the following two functions:</p>

        <p>\[\begin{matrix}
          f(a) = \sin(a) \\
          f(b) = \cos(b)
        \end{matrix}\]</p>

        <p>There's nothing really remarkable about them, they're just a sine and cosine function,
        but you'll notice the inputs have different names. If we change the value for <i>a</i>,
        we're not going to change the output value for <i>f(b)</i>, since <i>a</i> isn't used
        in that function. Parametric functions cheat by changing that. In a parametric function
        all the different functions share a variable, like this:</p>

        <p>\[
        \left \{ \begin{matrix}
          f_a(t) = \sin(t) \\
          f_b(t) = \cos(t)
        \end{matrix} \right. \]</p>

        <p>Multiple functions, but only one variable. If we change the value for <i>t</i>,
        we change the outcome of both <i>f<sub>a</sub>(t)</i> and <i>f<sub>b</sub>(t)</i>.
        You might wonder how that's useful, and the answer is actually pretty simple: if
        we change the labels <i>f<sub>a</sub>(t)</i> and <i>f<sub>b</sub>(t)</i> with what
        we usually mean with them for parametric curves, things might be a lot more obvious:</p>

        <p>\[
        \left \{ \begin{matrix}
          x = \sin(t) \\
          y = \cos(t)
        \end{matrix} \right. \]</p>

        <p>There we go. <i>x</i>/<i>y</i> coordinates, linked through some mystery value <i>t</i>.</p>

        <p>So, parametric curves don't define a <i>y</i> coordinate in terms of an <i>x</i> coordinate,
        like normal functions do, but they instead link the values to a "control" variable.
        If we vary the value of <i>t</i>, then with every change we get <strong>two</strong> values,
        which we can use as (<i>x</i>,<i>y</i>) coordinates in a graph. The above set of functions,
        for instance, generates points on a circle: We can range <i>t</i> from negative to positive
        infinity, and the resulting (<i>x</i>,<i>y</i>) coordinates will always lie on a circle with
        radius 1 around the origin (0,0). If we plot it for <i>t</i> from 0 to 5, we get this:</p>

        <textarea class="sketch-code" data-sketch-preset="empty" data-sketch-title="A (partial) circle: x=sin(t), y=cos(t)">
        void drawFunction() {
          pushStyle();
          translate(dim/2,dim/2);
          stroke(150);
          line(-dim,0,dim,0);
          line(0,-dim,0,dim);

          stroke(0);
          float r = dim/3;
          for(float t=0; t<=5; t+=0.01) {
            point(r * sin(t), -r * cos(t));
          }

          fill(0);

          for(float i=0; i<=5; i+=0.5) {
            ellipse(r * sin(i), -r * cos(i),3,3);
          }

          textAlign(CENTER,CENTER);

          float x=0, y=-r*1.2, nx, ny;
          for(float i=0; i<=5; i+=0.5) {
            nx = x*cos(i) - y*sin(i);
            ny = x*sin(i) + y*cos(i);
            text("t="+i, nx, ny);
          }

          fill(150);
          text("0,0",-10,10);
          text("1",r+10,15);
          text("-1",-10,r+10);
          text("-1",-r-10,15);
          text("1",-10,-r-10);
          popStyle();
        }</textarea>

        <p>Bézier curves are (one in many classes of) parametric functions, and are characterised
        by using the same base function for all its dimensions. Unlike the above example,
        where the <i>x</i> and <i>y</i> values use different functions (one uses a sine, the other
        a cosine), Bézier curves use the "binomial polynomial" for both <i>x</i> and <i>y</i>.
        So what are binomial polynomials?</p>

        <p>You may remember polynomials from high school, where they're those sums that look like:</p>

        <p>\[
          f(x) = a \cdot x^3 + b \cdot x^2 + c \cdot x + d
        \]</p>

        <p>If they have a highest order term <i>x³</i> they're called "cubic" polynomials, if it's
        <i>x²</i> it's a "square" polynomial, if it's just <i>x</i> it's a line (and if there aren't
        even any terms with <i>x</i> it's not a polynomial!)</p>

        <p>Bézier curves are polynomials of <i>t</i>, rather than <i>x</i>, with the value for <i>t</i>
        fixed being between 0 and 1, with coefficients <i>a</i>, <i>b</i> etc. taking the "binomial"
        form, which sounds fancy but is actually a pretty simple description for mixing values:</p>

        <p>\[ \begin{align*}
          linear &= (1-t) + t \\
          square &= (1-t)^2 + 2 \cdot (1-t) \cdot t + t^2 \\
          cubic &= (1-t)^3 + 3 \cdot (1-t)^2 \cdot t + 3 \cdot (1-t) \cdot t^2 + t^3
        \end{align*} \]</p>

        <p>I know what you're thinking: that doesn't look too simple, but if we remove <i>t</i> and
        add in "times one", things suddenly look pretty easy. Check out these binomial terms:</p>

        <p>\[ \begin{align*}
          linear &= \hskip{2.5em} 1 + 1 \\
          square &= \hskip{1.7em} 1 + 2 + 1\\
          cubic &= \hskip{0.85em} 1 + 3 + 3 + 1\\
          hypercubic &= 1 + 4 + 6 + 4 + 1
        \end{align*} \]</p>

        <p>Notice that 2 is the same as 1+1, and 3 is 2+1 and 1+2, and 6 is 3+3... As you
        can see, each time we go up a dimension, we simply start and end with 1, and everything
        in between is just "the two numbers above it, added together". Now <i>that's</i> easy
        to remember.</p>

        <p>There's an equally simple way to figure out how the polynomial terms work:
        if we rename <i>(1-t)</i> to <i>a</i> and <i>t</i> to <i>b</i>, and remove the weights
        for a moment, we get this:</p>

        <p>\[ \begin{align*}
          linear &= BLUE[a] + RED[b] \\
          square &= BLUE[a] \cdot BLUE[a] + BLUE[a] \cdot RED[b] + RED[b] \cdot RED[b] \\
          cubic &= BLUE[a] \cdot BLUE[a] \cdot BLUE[a] + BLUE[a] \cdot BLUE[a] \cdot RED[b] + BLUE[a] \cdot RED[b] \cdot RED[b] + RED[b] \cdot RED[b] \cdot RED[b]\\
        \end{align*} \]</p>

        <p>It's basically just a sum of "every combination of <i>a</i> and <i>b</i>", progressively
        replacing <i>a</i>'s with <i>b</i>'s after every + sign. So that's actually pretty simple
        too. So now you know binomial polynomials, and just for completeness I'm going to show
        you the generic function for this:</p>

        <p>\[
          Bézier(n,t) = \sum_{i=0}^{n}
                        \underset{binomial\ term}{\underbrace{\binom{n}{i}}}
                        \cdot\
                        \underset{polynomial\ term}{\underbrace{(1-t)^{n-i} \cdot t^{i}}}
        \]</p>

        <p>And that's the full description for Bézier curves. Σ in this function indicates that this is
        a series of additions (using the variable listed below the Σ, starting at ...=<value> and ending
        at the value listed on top of the Σ).</p>

        <div class="howtocode">
          <h3>How to implement the basis function</h3>

          <p>We could naively implement the basis function as a mathematical construct,
          using the function as our guide, like this:</p>

<pre>function Bezier(n,t):
  sum = 0
  for(k=0; k&lt;n; k++):
    sum += n!/(k!*(n-k)!) * (1-t)^(n-k) * t^(k)
  return sum</pre>

          <p>I say we could, because we're not going to: the factorial function is <em>incredibly</em>
          expensive. And, as we can see from the above explanation, we can actually create Pascal's
          triangle quite easily without it: just start at [1], then [1,1], then [1,2,1], then [1,3,3,1],
          and so on, with each next row fitting 1 more number than the previous row, starting and
          ending with "1", with all the numbers in between being the sum of the previous row's
          elements on either side "above" the one we're computing.</p>

          <p>We can generate this as a list of lists lightning fast, and then never have to compute
          the binomial terms because we have a lookup table:</p>

<pre>lut = [      [1],           // n=0
            [1,1],          // n=1
           [1,2,1],         // n=2
          [1,3,3,1],        // n=3
         [1,4,6,4,1],       // n=4
        [1,5,10,10,5,1],    // n=5
       [1,6,15,20,15,6,1]]  // n=6

binomial(n,k):
  while(n &gt;= lut.length):
    s = lut.length
    nextRow = new array(size=s+1)
    nextRow[0] = 1
    for(i=1, prev=s-1; i&ltprev; i++):
      nextRow[i] = lut[prev][i-1] + lut[prev][i]
    nextRow[s] = 1
    lut.add(nextRow)
  return lut[n][k]</pre>

          <p>So what's going on here? First, we declare a lookup table with a size that's reasonably
          large enough to accommodate most lookups. Then, we declare a function to get us the values
          we need, and we make sure that if an n/k pair is requested that isn't in the LUT yet, we
          expand it first. Our basis function now looks like this:</p>

<pre>function Bezier(n,t):
  sum = 0
  for(k=0; k&lt;n; k++):
    sum += binomial(n,k) * (1-t)^(n-k) * t^(k)
  return sum</pre>

          <p>Perfect. Of course, we can optimize further. For most computer graphics purposes, we
          don't need arbitrary curves. We need quadratic and  cubic curves (this primer actually
          does do arbitrary curves, so you'll find code similar to shown here), which means we can
          drastically simplify the code:</p>

<pre>function Bezier(2,t):
  t2 = t * t
  mt = 1-t
  mt2 = mt * mt
  return mt2 + 2*mt*t + t2

function Bezier(3,t):
  t2 = t * t
  t3 = t2 * t
  mt = 1-t
  mt2 = mt * mt
  mt3 = mt2 * mt
  return mt3 + 3*mt2*t + 3*mt*t2 + t3</pre>

          <p>And now we know how to program the basis function. Exellent.</p>
        </div>

        <p>So, now we know what the base function(s) look(s) like, time to add in the magic that makes
        Bézier curves so special: control points.<p>
