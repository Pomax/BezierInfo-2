# TA SEKCJA NIE JEST OBECNIE CZĘŚCIĄ GŁÓWNEGO DOKUMENTU, PONIEWAŻ NIE UCZY W RZECZYWISTOŚCI NIC PRZYDATNEGO.

# Operacje na kształtach boolowskich

Możemy zastosować tematy omówione do tej pory w tym elementarzu, aby wykonać operacje na kształtach boolowskich: uzyskanie sumy, przecięcia lub wykluczenia między dwoma lub więcej kształtami, które obejmują krzywe Béziera. Dla uproszczenia (cóż... w pewnym sensie większej jednorodności) będziemy patrzeć tylko na kształty poli-Béziera, ale kształt składający się z kombinacji linii i krzywych Béziera jest technicznie uproszczeniem. (Chociaż oznacza to, że musimy napisać definicję klasy kształtów, która łączy linie i krzywe Béziera. Ponieważ krzywe poli-Béziera są nadzbiorem, będziemy ich używać w poniższych przykładach).

Procedura wykonywania operacji boolowskich składa się zasadniczo z czterech kroków:

1. Znajdź punkty przecięcia obu kształtów,
2. pociąć kształty na wiele sekcji między tymi przecięciami,
3. odrzucić każdą sekcję, która nie jest częścią kształtu wynikowego pożądanej operacji, oraz
4. Połącz pozostałe sekcje, aby utworzyć nowy kształt.

Znajdowanie wszystkich przecięć między dwiema krzywymi polilinii Béziera lub dowolnym kształtem przekroju polilinii jest podobne do algorytmu iteracyjnego omówionego w części poświęconej przecięciu krzywej/krzywej. Dla każdego segmentu krzywej poli-Béziera sprawdzamy, czy jego ramka graniczna pokrywa się z którąkolwiek z ramek ograniczających segmentu na drugiej krzywej poli-Béziera. Jeśli tak, uruchamiamy normalne wykrywanie przecięcia.

Po znalezieniu wszystkich punktów przecięcia dzielimy nasze krzywe poli-Béziera i pamiętajmy, aby zapisać, które z nowo utworzonych krzywych poli-Béziera mogą potencjalnie łączyć się w punktach, w których podzieliliśmy oryginały. To pozwoli nam szybko skleić krzywe poli-Béziera z powrotem po następnym kroku.

Kiedy już mamy wszystkie nowe krzywe poli-Béziera, uruchamiamy pierwszy krok żądanej operacji boolowskiej.

- Suma: odrzuć wszystkie krzywe poli-Béziera, które leżą "wewnątrz” naszego połączenia naszych kształtów. Np. jeśli chcemy połączenia dwóch nakładających się okręgów, wynikowy kształt jest konturem.
- Przecięcie: odrzuć wszystkie krzywe poli-Béziera, które leżą "poza” przecięciem dwóch kształtów. Np. jeśli chcemy przecięcia dwóch nakładających się okręgów, wynikowym kształtem jest zwężająca się elipsa w miejscu, w którym się nakładają.
- Wykluczenie: żadna sekcja nie zostanie odrzucona, ale będziemy musieli połączyć kształty z powrotem w specjalny sposób. Odwróć dowolną sekcję, która kwalifikowałaby się do usunięcia zgodnie z zasadami "związkowymi”.

<div class="grid">
  <figure>
    <img src="images/op_base.gif" height="169"/>
    <figcaption>Two overlapping shapes</figcaption>
  </figure>
  <figure class="labeled-image">
    <img src="images/op_union.gif" height="169"/>
    <figcaption>Their union</figcaption>
  </figure>
  <figure class="labeled-image">
    <img src="images/op_intersection.gif" height="169"/>
    <figcaption>Their intersection</figcaption>
  </figure>
  <figure class="labeled-image">
    <img src="images/op_exclusion.gif" height="169"/>
    <figcaption>Their exclusion (union minus intersection)</figcaption>
  </figure>
</div>

Główną komplikacją opisanej tutaj procedury jest określenie, w jaki sposób sekcje kwalifikują się pod względem bycia "wewnątrz” i "na zewnątrz” naszych kształtów. W tym celu musimy być w stanie przeprowadzić wykrywanie punktu w kształcie, do którego użyjemy klasycznego algorytmu: uzyskanie "liczby przecięcia” za pomocą rzutowania promieniowego, a następnie przetestowanie "wewnętrzności” przez zastosowanie [parzystej -dziwna reguła](https://folk.uio.no/bjornw/doc/bifrost-ref/bifrost-ref-12.html): Dla dowolnego punktu i dowolnego kształtu możemy rzucić promień z naszego punktu do jakiegoś punkt, o którym wiemy, że leży poza kształtem (na przykład róg naszej powierzchni do rysowania). Następnie liczymy, ile razy ta linia przecina nasz kształt (pamiętaj, że wykrywanie przecięcia linii z krzywą możemy dość łatwo przeprowadzić). Jeśli liczba przejść przez kontur kształtu jest parzysta, oznacza to, że punkt tak naprawdę nie leżał wewnątrz naszego kształtu. Jeśli liczba przecięć jest nieparzysta, nasz punkt widzenia leżał na odwróconym kształcie. Mając tę ​​wiedzę, możemy zdecydować, czy potraktować sekcję, w której taki punkt leży, "wymaga usunięcia” (zgodnie z zasadami związkowymi), "wymaga zachowania” (zgodnie z zasadami przecinania) lub "wymaga odwrócenia” (zgodnie z zasadami wykluczenia).

Operacje te są drogie, a implementacja własnego kodu jest generalnie złym pomysłem, jeśli jest już dostępny pakiet geometrii dla wybranego języka. W tym przypadku dla JavaScript najdoskonalszy [Paper.js](https://paperjs.org) jest już dostarczany z całym kodem do wykonywania wydajnych operacji na kształtach boolowskich, więc mogę zdecydowanie zaimplementować tutaj gorszą wersję polecam bibliotekę Paper.js, jeśli zamierzasz wykonać jakąkolwiek pracę z kształtami boolowskimi.

(Oczywiście, jako ogólna biblioteka geometrii, Paper.js ma mniej więcej rozmiar całego tego elementu, więc dla celów ilustracyjnych poniższa grafika implementuje własne operacje boolowskie i może nie działać właściwie we wszystkich przypadkach krawędziowych!)

<graphics-element title="Operacje logiczne na kształtach" src="./boolean.js"></graphics-element>

