// R01, R09, R10, R14, R15 – Spielstand, Spieler, Modi
const { test, expect } = require('@playwright/test');
const { KEY, openGame, player, finishLevel } = require('./helpers');

test('R01 beschädigter Spielstand → Standardzustand + Hinweis', async ({ page }) => {
  const errors = [];
  await openGame(page, { save: '{kaputt', errors });
  const S = await page.evaluate(() => window.__WR.S);
  expect(S.maxCleared).toBe(0);
  expect(S.skills).toEqual({ aim: 0, line: 0, stand: 0 });
  await expect(page.locator('#toast')).toContainText('beschädigt');
  // defekte Daten werden für die Fehlersuche aufgehoben
  expect(await page.evaluate(k => localStorage.getItem(k + '_defekt'), KEY)).toBe('{kaputt');
  expect(errors).toEqual([]);
});

test('R14 ungültige Werte werden begrenzt', async ({ page }) => {
  const bad = player('Lena', { mode: 'hacker', maxCleared: 999, points: -5, total: 'viel', skills: { aim: 99, line: -3, stand: '2' }, stars: 1e9, inv: { bar: 'x', ring: 500, whistle: -1 } },
    { hs: [{ name: '<b>X</b>', level: 77, score: -10 }, { name: '', level: 3 }, 'müll'] });
  await openGame(page, { save: bad });
  const S = await page.evaluate(() => window.__WR.S);
  expect(S.mode).toBe('normal');
  expect(S.maxCleared).toBe(29);
  expect(S.points).toBe(0);
  expect(S.total).toBe(0);
  expect(S.skills).toEqual({ aim: 5, line: 0, stand: 2 });
  expect(S.stars).toBe(999);
  expect(S.inv).toEqual({ bar: 0, ring: 99, whistle: 0 });
  expect(S.hs).toHaveLength(1);
  expect(S.hs[0]).toMatchObject({ level: 30, score: 0 });
  // Name wird beim Anzeigen maskiert, nicht als HTML ausgeführt
  await expect(page.locator('#menuhs')).toContainText('<b>X</b>');
});

test('R15 Fortschritt übersteht Neuladen', async ({ page }) => {
  await openGame(page, { save: player('Lena') });
  await page.click('#cont');
  await finishLevel(page);
  await page.reload();
  await page.waitForFunction(() => !!window.__WR);
  expect(await page.evaluate(() => window.__WR.S.maxCleared)).toBe(1);
  await expect(page.locator('#cont')).toContainText('Level 2');
});

test('R09 Spielerwechsel ordnet Fortschritt richtig zu', async ({ page }) => {
  await openGame(page, { save: player('Lena', { maxCleared: 4, total: 1800 }) });
  await page.fill('#pname', 'Moritz');
  await page.click('#cont');
  expect(await page.evaluate(() => [window.__WR.S.current, window.__WR.S.maxCleared])).toEqual(['Moritz', 0]);
  const hs = await page.evaluate(() => window.__WR.S.hs.map(e => [e.name, e.level]));
  expect(hs).toContainEqual(['Lena', 5]);   // Lena kam beim Wechsel in die Bestenliste
  await page.evaluate(() => window.__WR.toMenu());
  await page.click('[data-p="Lena"]');
  await page.click('#cont');
  expect(await page.evaluate(() => [window.__WR.S.current, window.__WR.G.L, window.__WR.S.total])).toEqual(['Lena', 5, 1800]);
});

test('R10 Moduswechsel trennt die Bestenlisten', async ({ page }) => {
  await openGame(page, { save: player('Lena', { maxCleared: 6, total: 2000 }) });
  await page.click('[data-m="pro"]');
  await expect(page.locator('#cont')).toContainText('neuer Einsatz – Profi');
  await page.click('#cont');
  const W = await page.evaluate(() => ({ mode: window.__WR.S.mode, L: window.__WR.G.L, hs: window.__WR.S.hs.map(e => [e.name, e.mode, e.level]) }));
  expect(W.mode).toBe('pro');
  expect(W.L).toBe(1);
  expect(W.hs).toContainEqual(['Lena', 'normal', 7]);
  await page.evaluate(() => window.__WR.toMenu());
  await page.click('#hstabs [data-h="pro"]');
  await expect(page.locator('#menuhs')).toContainText('Noch keine Einträge');
  await page.click('#hstabs [data-h="normal"]');
  await expect(page.locator('#menuhs')).toContainText('Lena');
});
