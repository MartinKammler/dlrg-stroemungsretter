# Wasserrettung – DLRG Strömungsretter

> **Programmiert von Martin Kammler, Mitglied der DLRG.**
>
> Privat entstanden und der DLRG **kostenlos** zur Verfügung gestellt – zur freien
> Verwendung in der **DLRG-Jugendarbeit und in der Ausbildung**, in allen Gliederungen,
> ohne Lizenzgebühren.
>
> Programmcode, Idee und Grafiken stammen von Martin Kammler und stehen unter der
> [MIT-Lizenz](LICENSE); die Grafiken sind KI-generiert und enthalten kein DLRG-Material.
> **Name, Wortmarken und Logos der DLRG** sind davon ausgenommen und bleiben bei der DLRG,
> die **Audiodateien** stammen von Pixabay. Das Spiel ist ein privates Projekt und kein
> offizielles Angebot der DLRG.

Browser-Spiel für die DLRG-Jugend: Im Fluss treiben Personen vorbei und rufen um Hilfe. Mit dem Wurfball an der Leine zielen, treffen, an Land ziehen.

## Spielen

**Online spielen:** https://martinkammler.github.io/dlrg-stroemungsretter/

Läuft im Browser auf PC, Tablet und Handy – auch offline.

### Als App installieren

- **Android / Chrome:** Seite öffnen, im Menü „App installieren“ bzw. „Zum Startbildschirm hinzufügen“
- **iPad / iPhone (Safari):** Teilen-Knopf → „Zum Home-Bildschirm“
- **PC (Chrome/Edge):** Installieren-Symbol in der Adressleiste

Nach der Installation läuft das Spiel im Vollbild und ohne Internet. Beim Installieren werden rund 6,5 MB geladen (Grafiken und Töne), danach braucht das Spiel kein Netz mehr.

### Updates

Die App sucht beim Öffnen und alle 30 Minuten nach einer neuen Version. Ist eine da, wird sie im Hintergrund geladen und aktiviert, sobald das Menü angezeigt wird – ein laufendes Level wird nie unterbrochen. Die aktuelle Version steht unten im Menü.

## Spielprinzip

- **Zielen:** auf die Stelle im Wasser zeigen, wo der Ball landen soll (am Handy erscheint der Zielkreis über dem Finger), loslassen = Wurf. Zurück aufs eigene Ufer ziehen = abbrechen. Vorhalten nicht vergessen!
- **Greifen:** Berührt der gelbe Kreis um den Ball den Schwimmer (Hände, Kopf, Körper), hält er sich fest und wird automatisch an Land gezogen.
- **Level:** 30 Level, pro Level max. 10 Personen. Mit jedem Level fließt das Wasser schneller (ab Level 20 etwas flacher ansteigend). Wer Level 30 schafft, bekommt Konfettiregen und den Verdienstorden der Strömungsrettung. Alle 5 Level wird der Fluss wilder (gerade → wellig → kurvig → Wildwasser); in Kurven ändert sich die Fließgeschwindigkeit.
- **Scheitern:** 3 Personen abgetrieben → Level wiederholen oder Einsatz beenden.
- **Spieler:** Name eingeben, Fortschritt wird pro Name gespeichert. Beim Beenden oder Spielerwechsel kommt der Stand in die Bestenliste (Top 5, lokal im Browser).

## Schwierigkeitsgrade

| Modus | Personen pro Level | Strömung (Zeit über den Bildschirm, Level 1 → 30) |
|---|---|---|
| Einfach | 3 … max. 8 | 12 s → 6 s |
| Normal | 3 … max. 10 | 12 s → 4,3 s |
| Profi | 4 … 10 (ab Level 8) | 9 s → 3,2 s |

Jeder Modus hat seine eigene Bestenliste. Pro Spieler läuft ein Einsatz; wer den Modus wechselt, beendet den laufenden Einsatz (er kommt in die Bestenliste).

## Training (Punkte nach jedem Level; Stufen kosten 1, 2, 3, 3, 4 Punkte – alles voll mit 39 Punkten, ca. Level 25–28)

| Training | Stufen | Wirkung |
|---|---|---|
| Zieltraining | 5 | Trefferkreis +15 % je Stufe |
| Leinentraining | 5 | Einholen 10 % schneller je Stufe |
| Standfestigkeit | 5 | Ball hält länger; ab Stufe 3 zwei, ab Stufe 5 drei Personen pro Wurf |

## Sterne & Goodies

Sterne gibt es für: über 80 % Trefferquote (1 ★), 100 % Trefferquote (2 ★), jede Doppelrettung (1 ★), jede Dreifachrettung (2 ★). Sind alle Trainings voll, werden Trainingspunkte zu Sternen. Bonussterne gibt es erst, wenn das Level geschafft ist. Tauschen nach dem Level:

| Goodie | Preis | Wirkung |
|---|---|---|
| Powerriegel | 3 ★ | 10 s lang Werfen und Einholen doppelt so schnell |
| Rettungsring | 5 ★ | automatischer Wurf zur gefährdetsten Person, trifft immer; großer Fangbereich – mit Zieltraining 3 halten sich 2, mit Stufe 5 bis zu 3 Personen fest |
| Trillerpfeife | 10 ★ | 10 s lang rettet ein Helfer automatisch |

Im Spiel per Knopf oder Taste 1 / 2 / 3.

## Sound

Hintergrundmusik „Brandung in Aufruhr“, Flussrauschen (ruhig bzw. kräftig ab den Kurven-Leveln), Platschen beim Aufschlag, Pfeife bei der Trillerpfeife. Startet nach dem ersten Antippen (Browser-Vorgabe). Musik und Geräusche getrennt schaltbar im Menü und in der Pause, 🔊-Knopf im Spiel schaltet alles. Geräusche: Pixabay (universfield, loswin23, jonathanslattermusic).

## Test-Adressen

- `index.html#level-12` – startet direkt Level 12
- `index.html#level-12-held` – mit vollem Training
- `index.html#level-12-goodies` – mit je 2 Goodies

## Technik

Eine `index.html` (Canvas + Vanilla JS, keine externen Abhängigkeiten), Grafiken in `assets/`, Töne in `assets/snd/`, Schrift „Kalam“ lokal in `assets/fonts/` (SIL Open Font License, siehe `assets/fonts/OFL.txt`). Kajak-Grafiken sind vorhanden, Kajaks aktuell deaktiviert (`boats:null` in `levelSpec`).

PWA: `manifest.webmanifest`, `sw.js` (Cache + Offline-Betrieb) und `icons/`. Der Service Worker lädt beim Installieren die Pflichtdateien (`CORE`) und danach alle Dateien aus `FILES` einzeln vor – fehlt eine optionale Datei, wird die neue Version trotzdem installiert (das Spiel hat Ersatzgrafiken bzw. bleibt ohne den Ton).

Spielstände werden beim Laden geprüft (Schema-Version, Typen, Grenzen); ein beschädigter Speicher wird zurückgesetzt und unter `wurfball_save_v2_defekt` aufgehoben. Fehlerprotokoll in der Konsole einschalten: `localStorage.setItem('wasserrettung-debug','1')`.

**Nach jeder Änderung** an Spiel, Grafiken oder Tönen:

1. Version in `version.js` hochzählen – das ist die einzige Stelle (Spiel und Service Worker lesen sie beide)
2. neue oder umbenannte Dateien in die Liste `FILES` in `sw.js` eintragen

Ohne neue Version sehen bereits installierte Apps die Änderung nicht.

Lokal testen:

```
python3 -m http.server 8000
```

→ http://localhost:8000 (Service Worker braucht `http://`, als `file://` geöffnet läuft nur das Spiel selbst)

## Automatische Tests

Playwright-Tests für die Regressionsfälle aus dem Code-Review liegen in `tests/` (Details in `tests/README.md`):

```
cd tests
npm install
npx playwright install chromium
npm test
```

## Urheberrecht und Lizenz

**Programmcode** (HTML, CSS, JavaScript) und **Grafiken** in `assets/` – Autor: **Martin Kammler**, 2026.
Lizenziert unter der [MIT-Lizenz](LICENSE). Die Grafiken sind KI-generierte Darstellungen;
es wurde kein DLRG-Material (keine Fotos, keine DLRG-Dateien, keine Logos) übernommen.

**Name, Wortmarken und Logos der DLRG** sind von der MIT-Lizenz **ausdrücklich ausgenommen**:

- „DLRG“ ist eine geschützte Marke der Deutschen Lebens-Rettungs-Gesellschaft. Alle Rechte
  daran liegen bei der DLRG und werden durch die MIT-Lizenz weder übertragen noch eingeräumt.
- Die Nennung im Projekt- und Repository-Namen beschreibt nur den Einsatzzweck des Spiels in
  der DLRG-Ausbildung.
- Für eine Nutzung der DLRG-Marke – etwa in abgeleiteten Werken oder bei einer Veröffentlichung
  außerhalb der DLRG-Arbeit – sind die Rechte vorab mit der DLRG zu klären.

**Audiodateien** in `assets/snd/` sind ebenfalls von der MIT-Lizenz ausgenommen: Sie stammen
von [Pixabay](https://pixabay.com) (universfield, loswin23, jonathanslattermusic) und stehen
unter der Pixabay Content License. Sie dürfen hier mitgeliefert und verwendet werden, aber
nicht als eigenes Audio-Material weitergegeben oder verkauft werden.

Dieses Projekt ist ein privates Hilfsmittel und kein offizielles Angebot der DLRG.
