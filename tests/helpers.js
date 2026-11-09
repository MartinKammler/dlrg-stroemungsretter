// Gemeinsame Hilfen für die Tests
const KEY = 'wurfball_save_v2';

/** Seite öffnen; optional vorher einen Spielstand (Objekt oder roher String) hinterlegen. */
async function openGame(page, { save, hash = '', errors } = {}) {
  if (errors) page.on('pageerror', e => errors.push(String(e)));
  if (save !== undefined) {
    const raw = typeof save === 'string' ? save : JSON.stringify(save);
    // nur beim ersten Laden setzen, damit Reload-Tests den gespeicherten Stand sehen
    await page.addInitScript(([k, v]) => {
      if (!sessionStorage.getItem('__seeded')) { localStorage.clear(); localStorage.setItem(k, v); sessionStorage.setItem('__seeded', '1'); }
    }, [KEY, raw]);
  }
  await page.goto('index.html?e2e' + hash);
  await page.waitForFunction(() => !!window.__WR);
}

/** Spielstand-Grundgerüst für einen Spieler. */
function player(name, run = {}, extra = {}) {
  const r = Object.assign({ mode: 'normal', maxCleared: 0, points: 0, total: 0, skills: { aim: 0, line: 0, stand: 0 }, stars: 0, inv: { bar: 0, ring: 0, whistle: 0 } }, run);
  return Object.assign({ schema: 2, current: name, hs: [], players: { [name.toLowerCase()]: Object.assign({ name }, r) } }, r, extra);
}

/** Level sofort als geschafft markieren (wartet auf den Level-Ende-Bildschirm). */
async function finishLevel(page) {
  await page.evaluate(() => { const G = window.__WR.G; G.saved = G.spec.target; });
  await page.waitForFunction(() => window.__WR.G.state !== 'play');
}

/** Level scheitern lassen (3 Personen abgetrieben). */
async function failLevel(page) {
  await page.evaluate(() => { window.__WR.G.lives = 1; });
  await page.evaluate(() => { const W = window.__WR, G = W.G; G.spawnT = 0; });
  await page.waitForFunction(() => window.__WR.G.state === 'failed', null, { timeout: 30_000 });
}

/** Einen Schwimmer an eine Stelle setzen (x, Anteil Flussbreite f). */
async function placeSwimmer(page, x, f, extra = {}) {
  return page.evaluate(([x, f, extra]) => {
    const W = window.__WR, G = W.G;
    const y = W.topAt(x) + (W.botAt(x) - W.topAt(x)) * f;
    const v = Object.assign({ x, y, y0: y, f, ph: 0, state: 'swim', head: 1, shirt: 1, sf: 0, t: 0, a: 1, ox: 0, oy: 0, cap: '#ff0' }, extra);
    G.victims.push(v); return G.victims.length - 1;
  }, [x, f, extra]);
}

module.exports = { KEY, openGame, player, finishLevel, failLevel, placeSwimmer };
