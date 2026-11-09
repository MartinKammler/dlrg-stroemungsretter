// R06, R12, R13 – Offline, fehlende Töne und Bilder
const { test, expect } = require('@playwright/test');
const { openGame, player } = require('./helpers');

test('R12 fehlende Audiodateien → Spiel bleibt bedienbar', async ({ page }) => {
  const errors = [];
  await page.route('**/assets/snd/**', r => r.abort());
  await openGame(page, { save: player('Test'), errors });
  await page.click('#cont');
  await page.waitForTimeout(500);
  await page.mouse.click(500, 300);
  expect(await page.evaluate(() => window.__WR.G.state)).toBe('play');
  expect(errors).toEqual([]);
});

test('R13 fehlende Bilder → Ersatzgrafik, keine Fehler', async ({ page }) => {
  const errors = [];
  await page.route(/assets\/(sh\d|ss\d|body|head|kladde).*\.png$/, r => r.abort());
  await openGame(page, { save: player('Test'), errors });
  await page.click('#cont');
  await page.waitForTimeout(2500);
  expect(await page.evaluate(() => window.__WR.G.state)).toBe('play');
  expect(errors).toEqual([]);
});

test('R06 Offline-Start nach erstem Besuch', async ({ page, context }) => {
  await openGame(page, { save: player('Test') });
  await page.evaluate(async () => { const reg = await navigator.serviceWorker.ready; return !!reg.active; });
  // warten, bis der Offline-Speicher gefüllt ist
  await page.waitForFunction(async () => { const ks = await caches.keys(); if (!ks.length) return false; const c = await caches.open(ks.find(k => k.startsWith('wasserrettung-'))); return (await c.keys()).length > 50; }, null, { timeout: 30_000 });
  await context.setOffline(true);
  await page.reload();
  await page.waitForFunction(() => !!window.__WR);
  await page.click('#cont');
  await page.waitForTimeout(1500);
  // Bilder kommen aus dem Offline-Speicher
  expect(await page.evaluate(() => fetch('assets/bg0.jpg').then(r => r.ok))).toBe(true);
  expect(await page.evaluate(() => window.__WR.G.state)).toBe('play');
  await context.setOffline(false);
});
