# Automatische Tests

18 Browser-Tests mit [Playwright](https://playwright.dev) für die Regressionsfälle aus dem Code-Review und spätere Spieländerungen (Desktop-Profil 1000×700 und Handy-Profil Pixel 7).

```bash
cd tests
npm install
npx playwright install chromium   # einmalig
npm test
```

Ein kleiner eingebauter Webserver (`serve.mjs`) liefert das Spiel unter `http://localhost:4173` aus. Die Tests öffnen das Spiel mit `?e2e`; nur dann stellt das Spiel unter `window.__WR` eine Testschnittstelle bereit.

| Datei | Fälle |
|---|---|
| `storage.spec.js` | R01 beschädigter Speicher, R14 ungültige Werte, R15 Neuladen, R09 Spielerwechsel, R10 Moduswechsel |
| `gameplay.spec.js` | R04 Drehen während des Wurfs, R05 Hintergrund → Pause, R08 Ring + Ball, R11 30 Level, Fehlwurf-Meldungen, sofortiges Einholen bei aussichtslosem Fehlwurf, Warten auf eine heranschwimmende Person, Ton aus auf der Kladde |
| `robustness.spec.js` | R06 Offline-Start, R12 fehlende Töne, R13 fehlende Bilder |
| `mobile.spec.js` | Touch-Zielen, Größe der Bonus-Knöpfe (Pixel-7-Profil) |

Neue Spielregeln bitte mit einem Test absichern – Hilfsfunktionen (Spielstand anlegen, Level beenden, Schwimmer setzen) stehen in `helpers.js`.

Bewusst noch offen: R02/R03 (Level-Grenzen der Test-Links, kommt mit dem Abschalten der Test-Links) und R07 (PWA-Update während eines Levels – nur von Hand prüfbar).
