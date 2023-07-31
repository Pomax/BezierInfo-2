# Approximated arc length

Czasami tak naprawdę nie potrzebujemy precyzji rzeczywistej długości łuku i zamiast tego możemy po prostu obliczyć przybliżoną długość łuku. Zdecydowanie najszybszym sposobem na to jest spłaszczenie krzywej, a następnie po prostu obliczenie odległości liniowej od punktu do punktu. Spowoduje to błąd, ale można go dowolnie zmniejszyć, zwiększając liczbę segmentów.

Jeśli połączymy pracę wykonaną w poprzednich sekcjach na temat spłaszczania krzywych i obliczania długości łuku, możemy je wdrożyć przy minimalnym wysiłku:

<div class="figure">

<graphics-element title="Approximate quadratic curve arc length" src="./approximate.js" data-type="quadratic">
    <input type="range" min="2" max="24" step="1" value="4" class="slide-control">
</graphics-element>

<graphics-element title="Approximate cubic curve arc length" src="./approximate.js" data-type="cubic">
    <input type="range" min="2" max="32" step="1" value="8" class="slide-control">
</graphics-element>

</div>

Możesz zauważyć, że chociaż błąd długości jest w rzeczywistości dość znaczny w wartościach bezwzględnych,
otrzymujemy, nawet przy niewielkiej liczbie segmentów, długość, która zgadza się z rzeczywistą długością, 
jeśli chodzi tylko o całkowitą część długości łuku. Dość często przybliżenia mogą drastycznie przyspieszyć działanie!
