# Tworzenie krzywej Catmull-Rom z trzech punktów

Znacznie krócej niż w poprzedniej sekcji: widzieliśmy, że krzywe Catmull-Rom potrzebują co najmniej 4 punktów, aby narysować cokolwiek sensownego, więc jak utworzyć krzywą Catmull-Rom z trzech punktów?

Krótko i słodko: nie możemy.

Przeprowadzamy działania matematyczne, które pozwalają nam [utworzyć sześcienną krzywą Béziera](#pointcurves), a następnie przekonwertować jej współrzędne na postać Catmull-Rom przy użyciu wzorów konwersji, które widzieliśmy powyżej.