# Drawing Bézier paths

- draw with a mouse, stylus, or finger
- RDP to reduce the number of points along the path
- abstract curve through points:
  - high order Bézier, split and reduced
  - fit compound Bézier
  - catmull-rom

<div class="figure">
  <Graphic title="Fitting a Bézier curve" setup={this.setup} draw={this.draw} onClick={this.onClick}>
    <button onClick={this.toggle}>toggle</button>
    <button onClick={this.reset}>reset</button>
    <SliderSet ref={ set => (this.sliders=set) } onChange={this.processTimeUpdate} />
  </Graphic>
</div>

