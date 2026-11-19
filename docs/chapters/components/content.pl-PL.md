# Funkcje składowe

Jedną z pierwszych rzeczy, na które napotykają ludzie, kiedy zaczynają używać krzywych Béziera we własnych programach, jest
"wiem, jak narysować krzywą, ale jak określić boks ograniczający?”. Faktycznie jest to dość proste, ale wymaga pewnej wiedzy na temat wykorzystania matematyki, aby uzyskać potrzebne wartości. W przypadku prostokątów ograniczających nie jesteśmy tak naprawdę zainteresowani samą krzywą, ale tylko jej "końcami”: minimalnymi i maksymalnymi wartościami, jakie krzywa ma dla wartości na osiach x i y. Jeśli pamiętasz swój rachunek różniczkowy (o ile kiedykolwiek miałeś do czynienia z rachunkiem różniczkowym, w przeciwnym razie trudno będzie zapamiętać) możemy określić końce funkcji za pomocą pierwszej pochodnej tej funkcji, ale jest to problem, ponieważ nasza funkcja jest parametryczna: każda oś ma swoją własną funkcję.

Rozwiązanie: oblicz pochodną dla każdej osi osobno, a następnie dopasuj je do siebie w taki sam sposób, jak w przypadku oryginału.

Przyjrzyjmy się, jak parametryczna krzywa Béziera "dzieli się” na dwie funkcje normalne, jedną dla osi x i jedną dla osi y. Zwróć uwagę, że obrazek z lewej strony
jest znowu interaktywną krzywą bez oznaczonych osi (zamiast tego otrzymujesz współrzędne na wykresie). 
Środkowy i prawy wykres to funkcje składowe do obliczania wartości <i>t</i> (od 0 do 1 włącznie)
odpowiednio na osi x i na osi y.

Jeśli przesuniesz punkty na krzywej w bok, powinieneś zobaczyć zmianę tylko środkowego wykresu; podobnie przesuwanie punktów w pionie powinno pokazywać zmianę tylko na prawym wykresie.

<graphics-element title="Składniki kwadratowej krzywej Béziera" width="825" src="./components.js" data-type="quadratic"></graphics-element>

&nbsp;

<graphics-element title="Sześcienne komponenty krzywej Béziera" width="825" src="./components.js" data-type="cubic"></graphics-element>