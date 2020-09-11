# The Bézier interval [0,1]

Now that we know the mathematics behind Bézier curves, there's one curious thing that you may have noticed: they always run from `t=0` to `t=1`. Why that particular interval?

It all has to do with how we run from "the start" of our curve to "the end" of our curve. If we have a value that is a mixture of two other values, then the general formula for this is:

\[
  mixture = a \cdot value_1 + b \cdot value_2
\]

The obvious start and end values here need to be `a=1, b=0`, so that the mixed value is 100% value 1, and 0% value 2, and `a=0, b=1`, so that the mixed value is 0% value 1 and 100% value 2. Additionally, we don't want "a" and "b" to be independent: if they are, then we could just pick whatever values we like, and end up with a mixed value that is, for example, 100% value 1 **and** 100% value 2. In principle that's fine, but for Bézier curves we always want mixed values *between* the start and end point, so we need to make sure we can never set "a" and "b" to some values that lead to a mix value that sums to more than 100%. And that's easy:

\[
  m = a \cdot value_1 + (1 - a) \cdot value_2
\]

With this we can guarantee that we never sum above 100%. By restricting `a` to values in the interval [0,1], we will always be somewhere between our two values (inclusively), and we will always sum to a 100% mix.

But... what if we use this form, which is based on the assumption that we will only ever use values between 0 and 1, and instead use values outside of that interval? Do things go horribly wrong? Well... not really, but we get to "see more".

In the case of Bézier curves, extending the interval simply makes our curve "keep going". Bézier curves are simply segments of some polynomial curve, so if we pick a wider interval we simply get to see more of the curve. So what do they look like?

The following two graphics show you Bézier curves rendered "the usual way", as well as the curves they "lie on" if we were to extend the `t` values much further. As you can see, there's a lot more "shape" hidden in the rest of the curve, and we can model those parts by moving the curve points around.

<div class="figure">
<graphics-element title="Quadratic infinite interval Bézier curve" src="./extended.js" data-type="quadratic"></graphics-element>
<graphics-element title="Cubic infinite interval Bézier curve" src="./extended.js" data-type="cubic"></graphics-element>
</div>

In fact, there are curves used in graphics design and computer modelling that do the opposite of Bézier curves; rather than fixing the interval, and giving you freedom to choose the coordinates, they fix the coordinates, but give you freedom over the interval. A great example of this is the ["Spiro" curve](https://levien.com/phd/phd.html), which is a curve based on part of a [Cornu Spiral, also known as Euler's Spiral](https://en.wikipedia.org/wiki/Euler_spiral). It's a very aesthetically pleasing curve and you'll find it in quite a few graphics packages like [FontForge](https://fontforge.org/en-US/) and [Inkscape](https://inkscape.org). It has even been used in font design, for example for the Inconsolata typeface.
