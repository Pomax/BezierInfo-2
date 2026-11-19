# Ciasne ramki ograniczające

Dzięki naszej wiedzy na temat ramek ograniczających i wyrównywania krzywych, możemy teraz utworzyć "ciasne” ramki ograniczające dla krzywych. Najpierw wyrównujemy naszą krzywą, 
rejestrując wykonaną translację, `T` i kąt obrotu, którego użyliśmy, `R`. 
Następnie określamy normalną ramkę ograniczającą wyrównanej krzywej. Kiedy już to mamy, możemy odwzorować tę ramkę ograniczającą z powrotem na naszą pierwotną krzywą, obracając ją o -R, a następnie przesuwając ją o -T.

Mamy teraz ładne, ciasne ramki ograniczające dla naszych krzywych:

<div class="figure">
<graphics-element title="Wyrównywanie krzywej kwadratowej" src="./tightbounds.js" data-type="quadratic"></graphics-element>
<graphics-element title="Wyrównywanie krzywej sześciennej" src="./tightbounds.js" data-type="cubic"></graphics-element>
</div>

Ściśle mówiąc, niekoniecznie są to możliwie najciaśniejsze ramki ograniczające. Możliwe jest obliczenie optymalnej ramki ograniczającej poprzez określenie, które linie rozpinające są potrzebne, aby uzyskać minimalny obszar ramki, ale ze względu na parametryczny charakter krzywych Béziera jest to w rzeczywistości dość kosztowna operacja, a zwiększenie precyzji ograniczania często nie jest warte tego.