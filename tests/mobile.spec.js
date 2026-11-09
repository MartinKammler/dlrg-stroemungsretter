// Handy: Touch-Zielen (Zielpunkt über dem Finger) und Bedienelemente
const { test, expect } = require('@playwright/test');
const { openGame, player } = require('./helpers');

test('Touch: Zielkreis liegt über dem Finger, Wurf landet dort', async ({ page }) => {
  await openGame(page, { save: player('Test') });
  await page.tap('#cont');
  await page.evaluate(() => { const G = window.__WR.G; G.victims = []; G.spawnT = 999; });
  const vp = page.viewportSize();
  const x = vp.width * 0.6, y = vp.height * 0.45;
  const fire = (type, x, y) => page.evaluate(([type, x, y]) => document.getElementById('c').dispatchEvent(new PointerEvent(type, { pointerId: 3, pointerType: 'touch', clientX: x, clientY: y, bubbles: true })), [type, x, y]);
  await fire('pointerdown', x, y + 30); await fire('pointermove', x, y); await fire('pointerup', x, y);
  const r = await page.evaluate(() => ({ tx: window.__WR.B.tx, ty: window.__WR.B.ty, off: Math.max(60, innerHeight * .08), state: window.__WR.B.state }));
  expect(r.state).toBe('flying');
  expect(Math.abs(r.tx - x)).toBeLessThan(3);
  expect(Math.abs(r.ty - (y - r.off))).toBeLessThan(3);
});

test('Touch: Bonus-Knöpfe sind groß genug (min. 44 px)', async ({ page }) => {
  await openGame(page, { save: player('Test', { inv: { bar: 1, ring: 1, whistle: 1 } }) });
  await page.tap('#cont');
  for (const id of ['#gBar', '#gRing', '#gWhistle']) {
    const b = await page.locator(id).boundingBox();
    expect(b.width).toBeGreaterThanOrEqual(44); expect(b.height).toBeGreaterThanOrEqual(44);
  }
});
