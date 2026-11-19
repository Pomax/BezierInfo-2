# Drawing Bézier paths

- rysuj myszką, rysikiem lub palcem
- RDP, aby zmniejszyć liczbę punktów na ścieżce
- abstrakcyjna krzywa przechodząca przez punkty:
  - Bézier wysokiego rzędu, podzielony i zredukowany
  - dopasowany złożony Bézier
  - catmull-rom

<div class="figure">
  <Graphic title="Dopasowanie krzywej Béziera" setup={this.setup} draw={this.draw} onClick={this.onClick}>
    <button onClick={this.toggle}>toggle</button>
    <button onClick={this.reset}>reset</button>
    <SliderSet ref={ set => (this.sliders=set) } onChange={this.processTimeUpdate} />
  </Graphic>
</div>

