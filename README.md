# Wurfball-Rettung – DLRG Strömungsretter

Browser-Spiel für die DLRG-Jugend: Im Fluss treiben Personen vorbei und rufen um Hilfe. Mit dem Wurfball an der Leine zielen, treffen, an Land ziehen.

Läuft komplett im Browser (PC, Tablet, Handy) – einfach `index.html` öffnen oder über einen beliebigen Webserver ausliefern (z. B. GitHub Pages).

## Spielprinzip

- **Zielen:** auf die Stelle im Wasser zeigen, wo der Ball landen soll (am Handy erscheint der Zielkreis über dem Finger), loslassen = Wurf. Zurück aufs eigene Ufer ziehen = abbrechen. Vorhalten nicht vergessen!
- **Greifen:** Berührt der gelbe Kreis um den Ball den Schwimmer (Hände, Kopf, Körper), hält er sich fest und wird automatisch an Land gezogen.
- **Level:** endlos, pro Level max. 10 Personen. Mit jedem Level fließt das Wasser schneller. Alle 5 Level wird der Fluss wilder (gerade → wellig → kurvig → Wildwasser); in Kurven ändert sich die Fließgeschwindigkeit.
- **Scheitern:** 3 Personen abgetrieben → Level wiederholen oder Einsatz beenden.
- **Spieler:** Name eingeben, Fortschritt wird pro Name gespeichert. Beim Beenden oder Spielerwechsel kommt der Stand in die Bestenliste (Top 5, lokal im Browser).

## Training (Punkte nach jedem Level, Stufe k kostet k Punkte)

| Training | Stufen | Wirkung |
|---|---|---|
| Zieltraining | 5 | Trefferkreis +15 % je Stufe |
| Leinentraining | 5 | Einholen 10 % schneller je Stufe |
| Standfestigkeit | 5 | Ball hält länger; ab Stufe 3 zwei, ab Stufe 5 drei Personen pro Wurf |

## Sterne & Goodies

Über 80 % Trefferquote in einem Level = 1 Stern. Tauschen nach dem Level:

| Goodie | Preis | Wirkung |
|---|---|---|
| Powerriegel | 3 ★ | 20 s lang Werfen und Einholen doppelt so schnell |
| Rettungsring | 5 ★ | automatischer Wurf zur gefährdetsten Person, trifft immer |
| Trillerpfeife | 10 ★ | 10 s lang rettet ein Helfer automatisch |

Im Spiel per Knopf oder Taste 1 / 2 / 3.

## Test-Adressen

- `index.html#level-12` – startet direkt Level 12
- `index.html#level-12-held` – mit vollem Training
- `index.html#level-12-goodies` – mit je 2 Goodies

## Technik

Eine einzige `index.html` (Canvas + Vanilla JS, keine Abhängigkeiten außer Google Font „Kalam“), Grafiken in `assets/`. Kajak-Grafiken sind vorhanden, Kajaks aktuell deaktiviert (`boats:null` in `levelSpec`).
