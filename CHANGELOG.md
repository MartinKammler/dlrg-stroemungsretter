# Änderungen

## 1.3.3
- Dokumentation überarbeitet: README, „So geht's“ im Spiel und Test-Doku passen zum aktuellen Spiel; neue `CHANGELOG.md`.

## 1.3.2
- Fehlwürfe kosten weniger Zeit: Kann niemand den Ball mehr erreichen, wird er sofort eingeholt; treibt jemand in seiner Bahn darauf zu, wartet er.
- Liegezeit des Balls 0,8 s (Standfestigkeit +0,25 s je Stufe 1–2), Einholen nach Fehlwurf 1,4 s (Leinentraining −10 % je Stufe).

## 1.3.1
- Gerettete hängen beim Zurückziehen fest am Ball bzw. an der Leine und gleiten nicht mehr hinterher.

## 1.3.0 – Maßnahmen aus dem Code-Review
- Spielstand wird beim Laden geprüft und begrenzt, Schema-Version, Hinweis bei beschädigtem Speicher oder wenn nicht gespeichert werden kann.
- Spielobjekte werden beim Drehen bzw. bei Größenänderung mitskaliert.
- Service Worker: fehlende optionale Dateien blockieren kein Update mehr; Version nur noch in `version.js`; kein Neuladen mehr beim ersten Installieren.
- Genaueres Feedback bei Fehlwürfen.
- Schrift „Kalam“ lokal statt über Google Fonts.
- Ungenutzte Tastatursteuerung entfernt; `P`/`Esc`/`1`–`3` lösen bei der Namenseingabe nichts mehr aus.
- Playwright-Regressionstests in `tests/`.

## 1.2.0
- Sound: Hintergrundmusik, Flussrauschen, Platschen, Pfeife, Knuspern; Ton blendet auf der Kladde aus.
- PWA-Einbindung wiederhergestellt.

## 1.1.1
- Spiel heißt „Wasserrettung“.

## 1.1.0
- Drei Schwierigkeitsgrade (Einfach, Normal, Profi) mit eigenen Bestenlisten.
- PWA-Einbindung wiederhergestellt.

## PWA
- Manifest, Service Worker, Icons und Offline-Betrieb.

## Finale
- Level 30 als Finale mit Konfetti und Verdienstorden; Bonussterne für 100 % Trefferquote und Mehrfachrettungen.

## Erstes Release
- Wurfball an der Leine, vier Flusslandschaften, Training, Sterne und Goodies, Spielernamen und lokale Bestenliste.
