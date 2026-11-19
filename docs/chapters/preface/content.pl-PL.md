# Przedmowa

Aby rysować rzeczy w 2D, zwykle polegamy na liniach, które zazwyczaj dzielą się na dwie kategorie: linie proste i krzywe. Pierwsze z nich są równie łatwe do narysowania, jak łatwe do narysowania przez komputer. Daj komputerowi pierwszy i ostatni punkt w linii, i BAM! linia prosta. Brak pytań.

Krzywe to jednak znacznie większy problem. Chociaż możemy rysować krzywe z absurdalną łatwością odręcznie, komputery są nieco upośledzone, ponieważ nie mogą rysować krzywych, chyba że istnieje funkcja matematyczna opisująca sposób ich rysowania. Faktycznie potrzebują tego nawet do linii prostych, ale funkcja jest śmiesznie łatwa, więc mamy tendencję do ignorowania tego, jeśli chodzi o komputery; wszystkie linie są "funkcjami”, niezależnie od tego, czy są proste, czy krzywe. Oznacza to jednak, że musimy wymyślić szybkie do obliczenia funkcje, które prowadzą do ładnie wyglądających krzywych na komputerze. Jest ich wiele, a w tym artykule skupimy się na konkretnej funkcji, której poświęcono sporo uwagi i jest używana w prawie wszystkim, co może rysować krzywe: krzywe Béziera.

Zostały nazwane na cześć [Pierre'a Béziera](https://en.wikipedia.org/wiki/Pierre_B%C3%A9zier), który jest głównie odpowiedzialny za to, by stały się znane światu jako krzywe doskonale nadające się do prac projektowych ( publikując swoje badania w 1962 roku podczas pracy dla Renault), chociaż nie był pierwszym ani jedynym, który "wymyślił” tego typu krzywe. Można pokusić się o stwierdzenie, że matematyk [Paul de Casteljau](https://en.wikipedia.org/wiki/Paul_de_Casteljau) był pierwszy, kiedy zaczął badać naturę tych krzywych w 1959 roku, pracując w Citroënie, i wymyślił naprawdę elegancki sposób jak je narysować. Jednak de Casteljau nie opublikował swojej pracy, przez co trudno jest odpowiedzieć na pytanie "kto był pierwszy” w jakimkolwiek sensie absolutnym. A może jednak? Krzywe Béziera są w swej istocie "wielomianami Bernsteina”, rodziną funkcji matematycznych badanych przez [Sergei Natanovich Bernstein] (https://en.wikipedia.org/wiki/Sergei_Natanovich_Bernstein), którego publikacje na ich temat sięgają co najmniej aż do 1912 r.

W każdym razie to głównie ciekawostki, bardziej prawdopodobne jest, że te krzywe są przydatne: możesz połączyć wiele krzywych Béziera, aby kombinacja wyglądała jak pojedyncza krzywa. Jeśli kiedykolwiek rysowałeś "ścieżki” w Photoshopie lub pracowałeś z programami do rysowania wektorowego, takimi jak Flash, Illustrator lub Inkscape, te krzywe, które rysowałeś, to krzywe Béziera.

Ale co, jeśli musisz sam je zaprogramować? Jakie są pułapki? Jak je rysujesz? Czym są ramki ograniczające, jak określasz przecięcia, jak wyciskasz krzywą, w skrócie: jak robisz wszystko, co chcesz zrobić z tymi krzywymi? Po to jest ta strona. Przygotuj się na matematykę!

<div class="note">

## Praktycznie wszystkie grafiki Béziera są interaktywne.

Ta strona wykorzystuje interaktywne przykłady, w dużym stopniu opierające się na [Bezier.js](https://pomax.github.io/bezierjs/), a także formuły matematyczne, które są składane w SVG przy użyciu [XeLaTeX](https://ctan.org/pkg/xetex) i [pdf2svg](https://github.com/dawbarton/pdf2svg) autorstwa [David Barton](https://cityinthesky.co.uk/).

## Ta książka jest open source.

Ta książka jest projektem oprogramowania typu open source i egzystuje w dwóch repozytoriach github. Pierwsza to [https://github.com/pomax/bezierinfo](https://github.com/pomax/bezierinfo) i jest to wersja przeznaczona wyłącznie do prezentacji, którą teraz przeglądasz. Drugim repozytorium jest [https://github.com/pomax/BezierInfo-2](https://github.com/pomax/BezierInfo-2), które jest wersją rozwojową zawierającą cały kod, który zostaje przekształcony w wersja internetowa, a także miejsce, w którym należy zgłaszać problemy, jeśli znajdziesz błędy lub masz pomysły, co zmienić lub dodać do elementarza.

## Jak skomplikowana będzie matematyka?

Większość matematyki w tym elementarzu to matematyka na poziomie wczesnej szkoły średniej. Jeśli rozumiesz podstawy arytmetyki i wiesz, jak czytać po angielsku, powinieneś sobie poradzić. Czasami będą *o wiele* bardziej skomplikowane obliczenia matematyczne, ale jeśli nie masz ochoty ich trawić, możesz je bezpiecznie pominąć, pomijając "pola szczegółów” w sekcji lub po prostu przeskakując na koniec sekcji z matematyką, która wygląda na zbyt wciągającą. Na końcu sekcji zazwyczaj po prostu wymienia się wnioski, dzięki czemu można bezpośrednio pracować z tymi wartościami.

## W jakim języku jest cały ten przykładowy kod?

Istnieje zbyt wiele języków programowania, aby faworyzować jeden z nich, więc cały przykładowy kod w tym Primerze wykorzystuje formę pseudokodu, który wykorzystuje składnię, która jest wystarczająco zbliżona do nowoczesnych języków skryptowych, takich jak JS, Python itp. Oznacza to, że nie będziesz w stanie skopiować i wkleić żadnego z nich bez zastanowienia, ale jest to zamierzone: jeśli czytasz ten elementarz, prawdopodobnie chcesz się _nauczyć_, a nie uczysz się przez kopiowanie - wklejanie. Uczysz się, robiąc coś samemu, _popełniając błędy_, a następnie naprawiając te błędy. Teraz oczywiście, nie dodałem celowo błędów w przykładowym kodzie tylko po to, by skłonić cię do popełnienia błędów (to byłoby okropne!), ale celowo powstrzymałem kod przed faworyzowaniem jednego języka programowania nad innym. Nie martw się jednak, jeśli znasz choć jeden język programowania proceduralnego, powinieneś być w stanie przeczytać przykłady bez żadnych trudności.

## Pytania, uwagi:

Jeśli masz sugestie dotyczące nowych sekcji, kliknij [Github issue tracker](https://github.com/pomax/BezierInfo-2/issues) (dostępny również z repozytorium, do którego link znajduje się w prawym górnym rogu). Jeśli masz pytania dotyczące materiału, obecnie nie ma sekcji komentarzy, kiedy robię przepisywanie, ale możesz również użyć narzędzia do śledzenia problemów. Po zakończeniu przepisywania dodam z powrotem sekcję ogólnych komentarzy i być może bardziej aktualny system "wybierz tę sekcję tekstu i naciśnij przycisk" pytanie ”, aby zadać pytanie na jej temat”. Zobaczymy.

## Wesprzyj książkę!

Jeśli podobała Ci się ta książka lub po prostu uznałeś ją za przydatną do czegoś, co próbowałeś zrobić, i zastanawiałeś się, jak dać mi znać, że Ci się podobała, masz dwie możliwości: możesz przejść do [Patreon page](https://www.patreon.com/bezierinfo) tej książki, a jeśli wolisz przekazać jednorazową darowiznę, przejdź do [kup kawę Pomax](https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=3BNHGHZAS3DP6&locale.x=en_CA). Ta praca rozrosła się z małego elementarza do podręcznika o wartości ponad 100 stron na temat krzywych Béziera na przestrzeni lat, a do jej powstania poszło dużo kawy. Nie żałuję ani minuty spędzonej na jej pisaniu, ale zawsze mogę wypić jeszcze trochę kawy, żeby pisać dalej!

</div>