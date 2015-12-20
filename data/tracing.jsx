        <p>Say you want to draw a curve with a dashed line, rather than a solid line,
        or you want to move something along the curve at fixed distance intervals over
        time, like a train along a track, and you want to use Bézier curves. Now you
        have a problem.</p>

        <p>The reason you have a problem is that Bézier curves are parametric functions
        with non-linear behaviour, whereas moving a train along a track is about as
        close to a practical example of linear behaviour as you can get. The problem
        we're faced with is that we can't just pick <i>t</i> values at some fixed interval
        and expect the Bézier functions to generate points that are spaced a fixed distance
        apart. In fact, let's look at the relation between "distance long a curve" and
        "<i>t</i> value", by plotting them against one another.</p>

        <p>The following graphic shows a particularly illustrative curve, and it's length/<i>t</i>
        plot. While the curve itself is a cubic curve, the plot shows that the distance function
        along the curve is actually a function of a much higher order than the curve itself.</p>

        <textarea class="sketch-code" data-sketch-preset="twopanel" data-sketch-title="The t-for-distance function">
        HashMap<Float,Float> values = new HashMap<Float,Float>();
        ArrayList<Float> keys = new ArrayList<Float>();

        void setupCurve() {
          curves.add(new BezierCurve( new Point[]{
            new Point(150,140),
            new Point(215,35),
            new Point(25,275),
            new Point(145,160)
          }));
        }

        float lD=0, D, d, x, y;
        void drawCurve(BezierCurve curve) {
          additionals();
          curve.draw();
          D = curve.getCurveLength();

          noAdditionals();
          usePanelPadding();
          nextPanel();
          drawAxes("t",0,1, "d",0,D);

          if(lD!=D) {
            lD = D;
            values.clear();
            keys.clear();
            for(float t=0.001; t<=1.0; t+=0.001) {
              d = comp.getArcLength(t, curve.x_values, curve.y_values);
              x = map(t,0,1,0,panelDim);
              y = map(d,0,D,0,panelDim);
              values.put(x,y);
              keys.add(x);
            }
          }

          stroke(100);
          for(float x: keys) {
            point(x, values.get(x));
          }
        }</textarea>

        <p>We see a function that might be invertible, but we won't be able to do so, symbolically.
        You may remember from the section on arc length that we cannot actually compute the true
        arc length function as an expression of <i>t</i>, which means we also can't compute the true
        inverted function that gives <i>t</i> as an expression of length. So how do we fix this?</p>

        <p>One way is to do what the graphic does: simply run through the curve, determine its
        <i>t</i>-for-length values as a set of discrete values at some high resolution (the graphic
        uses 1000 discrete points), and then use those as a basis for finding an appropriate <i>t</i>
        value, given a distance along the curve. This works quite well, actually, and is fairly fast
        (you can move the curve around without noticeable lag on a 2 year old computer, for instance).</p>

        <p>We can use some colour to show the difference between distance-based and time based intervals:
        the following graph is similar to the previous one, except it segments the curve in terms of
        equal-distance intervals. This shows as regular colour intervals going down the graph, but
        the mapping to <i>t</i> values is not linear, so there will be (highly) irregular intervals
        along the horizontal axis. It also shows the curve in an alternating colouring based on the
        t-for-distance values we find our LUT:</p>

        <textarea class="sketch-code" data-sketch-preset="threepanel" data-sketch-title="Fixed-interval coloring a curve">
        HashMap<Float,Float> values = new HashMap<Float,Float>();
        HashMap<Float,Float> inverted = new HashMap<Float,Float>();
        ArrayList<Float> t_keys = new ArrayList<Float>();
        ArrayList<Float> d_keys = new ArrayList<Float>();

        void setupCurve() {
          curves.add(new BezierCurve( new Point[]{
            new Point(150,140),
            new Point(215,35),
            new Point(25,275),
            new Point(145,160)
          }));
        }

        float lD=0, D, d, x, y;
        void drawCurve(BezierCurve curve) {
          additionals();
          curve.draw();
          D = curve.getCurveLength();
          float section = 15;

          noAdditionals();
          usePanelPadding();
          nextPanel();
          drawAxes("t",0,1, "d",0,D);

          if(lD!=D) {
            lD = D;
            // clear everything
            values.clear();
            inverted.clear();
            t_keys.clear();
            d_keys.clear();
            // rebuild;
            for(float t=0.001; t<=1.0; t+=0.001) {
              d = comp.getArcLength(t, curve.x_values, curve.y_values);
              values.put(t,d);
              inverted.put(d,t);
              t_keys.add(t);
              d_keys.add(d);
            }
          }

          float x, y, ly=0;

          ArrayList<Float> markers = new ArrayList<Float>();
          color lc=0, c;
          for(float d: d_keys) {
            y = int(map(d,0,D,0,panelDim));
            x = map(inverted.get(d),0,1,0,panelDim);
            if(y%section==0 && ly != y) {
              ly = y;
              stroke(0,0,200,100);
              line(0,y,x,y);
              stroke(0,100,0,100);
              line(x,0,x,y);
              markers.add(inverted.get(d));
            }
          }

          stroke(0);
          for(float t: t_keys) {
            x = map(t,0,1,0,panelDim);
            y = map(values.get(t),0,D,0,panelDim);
            point(x, y);
          }

          nextPanel();
          additionals();
          curve.draw();
          noAdditionals();
          for(int m=1, last=markers.size(); m<last; m++) {
            BezierCurve segment = curve.split(markers.get(m-1), markers.get(m));
            c = (m%2==0 ? color(0,255,120) : color(0,0,255));
            segment.draw(c);
          }

        }</textarea>

        <p>However, are there better ways? One such way is discussed in "<a href="http://www.geometrictools.com/Documentation/MovingAlongCurveSpecifiedSpeed.pdf"
        >Moving Along a Curve with Specified Speed</a>" by David Eberly of Geometric Tools, LLC, but
        basically because we have no explicit length function (or rather, one we don't have to
        constantly compute for different intervals), you may simply be better off with a traditional
        lookup table (LUT).</p>

<!--
        <p>That said, this is an area of Bézier curves that I've not really investigated in any
        depth, so if you think I'm missing something obvious and think I should have a look at
        [<i>whatever thing you think I need to have a look at</i>], get in touch and I shall
        try to update this section with new information.</p>
-->