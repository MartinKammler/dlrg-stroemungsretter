// R04, R05, R08, R11 und Wurf-Feedback (U2)
const { test, expect } = require('@playwright/test');
const { openGame, player, finishLevel, placeSwimmer } = require('./helpers');

test.beforeEach(async ({ page }) => {
  await openGame(page, { save: player('Test') });
  await page.click('#cont');
  await page.evaluate(() => { const G = window.__WR.G; G.victims = []; G.spawnT = 999; });
});

test('R04 Größenänderung während eines Wurfs', async ({ page }) => {
  await placeSwimmer(page, 600, 0.5);
  await page.evaluate(() => { const W = window.__WR; W.throwBall(W.aimFromPointer({ cx: 600, cy: W.topAt(600) + 150, touch: false })); });
  await page.waitForTimeout(150);
  await page.setViewportSize({ width: 700, height: 900 });   // „Drehen“
  await page.waitForTimeout(300);
  const r = await page.evaluate(() => {
    const W = window.__WR, v = W.G.victims[0], B = W.B;
    return { vx: v.x, vy: v.y, top: W.topAt(v.x), bot: W.botAt(v.x), bx: B.x, by: B.y, w: innerWidth, h: innerHeight };
  });
  for (const k of ['vx', 'vy', 'bx', 'by']) expect(Number.isFinite(r[k])).toBe(true);
  expect(r.vx).toBeGreaterThan(0); expect(r.vx).toBeLessThan(r.w);
  expect(r.vy).toBeGreaterThan(r.top); expect(r.vy).toBeLessThan(r.bot);
  expect(r.bx).toBeLessThan(r.w); expect(r.by).toBeLessThan(r.h);
});

test('R05 Hintergrund → automatische Pause', async ({ page }) => {
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { value: true, configurable: true }); document.dispatchEvent(new Event('visibilitychange')); });
  expect(await page.evaluate(() => window.__WR.paused)).toBe(true);
  await expect(page.locator('#pov')).toBeVisible();
});

test('R08 Ring und Ball auf dieselbe Person → nur einmal gerettet', async ({ page }) => {
  await page.evaluate(() => { const S = window.__WR.S; S.inv.ring = 1; });
  await placeSwimmer(page, 600, 0.5);
  // Ball liegt direkt bei der Person → sie greift
  await page.evaluate(() => { const W = window.__WR, B = W.B, v = W.G.victims[0]; B.state = 'floating'; B.x = v.x; B.y = v.y; B.f = v.f; B.t = 0; });
  await page.waitForFunction(() => window.__WR.G.victims[0].state === 'grabbed');
  await page.evaluate(() => window.__WR.useGoodie('ring'));      // niemand mehr in Gefahr → Ring wird nicht verbraucht
  expect(await page.evaluate(() => window.__WR.S.inv.ring)).toBe(1);
  await page.waitForFunction(() => window.__WR.G.saved >= 1, null, { timeout: 10_000 });
  await page.waitForTimeout(800);
  expect(await page.evaluate(() => window.__WR.G.saved)).toBe(1);
});

test('U2 Fehlwurf-Meldungen passen zur Lage', async ({ page }) => {
  const cases = await page.evaluate(() => {
    const W = window.__WR, B = W.B, cr = W.fx.catchR(), out = {};
    const t = (dx, dy, d) => { B.miss = { dx, dy, d }; return W.missText(); };
    out.knapp = t(cr, 0, cr * 1.2);
    out.spaet = t(cr * 4, 0, cr * 3);
    out.vor = t(-cr * 4, 0, cr * 3);
    out.weit = t(0, cr * 4, cr * 3);
    out.kurz = t(0, -cr * 4, cr * 3);
    out.weg = t(0, 0, cr * 10);
    return out;
  });
  expect(cases).toEqual({ knapp: 'Knapp verfehlt!', spaet: 'Zu spät – weiter vorhalten!', vor: 'Zu weit vorgehalten', weit: 'Zu weit geworfen', kurz: 'Zu kurz geworfen', weg: 'Daneben' });
});

test('R11 30 Levelwechsel ohne wachsende Listen', async ({ page }) => {
  for (let i = 0; i < 30; i++) {
    await page.evaluate(() => { const G = window.__WR.G; G.victims = []; G.spawnT = 999; });
    await finishLevel(page);
    const st = await page.evaluate(() => window.__WR.G.state);
    if (st === 'won') break;
    await page.click('#nextL');
    await page.waitForFunction(() => window.__WR.G.state === 'play');
  }
  const sizes = await page.evaluate(() => { const G = window.__WR.G; return [G.victims.length, G.ripples.length, G.pops.length, (G.rings || []).length, G.lostBalls.length, G.boats.length]; });
  for (const n of sizes) expect(n).toBeLessThan(15);
  expect(await page.evaluate(() => window.__WR.G.state)).toBe('won');
  await expect(page.locator('#overcard')).toContainText('Alle 30 Level geschafft');
});

test('Fehlwurf ohne Chance → Ball wird sofort eingeholt', async ({ page }) => {
  await placeSwimmer(page, 200, 0.8);                       // Person weit weg in anderer Bahn
  await page.evaluate(() => { const W = window.__WR, B = W.B, x = 700, f = 0.25, y = W.topAt(x) + (W.botAt(x) - W.topAt(x)) * f;
    B.state = 'flying'; B.sx = B.x = W.hand().x; B.sy = B.y = W.hand().y; B.tx = x; B.ty = y; B.t = 0; B.T = 0.05; });
  await page.waitForFunction(() => window.__WR.B.state === 'retrieving', null, { timeout: 2000 });
  const t = await page.evaluate(() => window.__WR.G.t);
  expect(t).toBeGreaterThan(0);
});

test('Ball vor einer Person in ihrer Bahn → wartet, Person greift zu', async ({ page }) => {
  const x = 520, f = 0.5;
  await placeSwimmer(page, x - 65, f, { sf: 1 });           // Person treibt in ihrer Bahn auf den Ball zu
  await page.evaluate(([x, f]) => { const W = window.__WR, B = W.B, y = W.topAt(x) + (W.botAt(x) - W.topAt(x)) * f;
    B.state = 'flying'; B.sx = B.x = W.hand().x; B.sy = B.y = W.hand().y; B.tx = x; B.ty = y; B.t = 0; B.T = 0.05; }, [x, f]);
  await page.waitForFunction(() => ['pulling', 'retrieving'].includes(window.__WR.B.state), null, { timeout: 4000 });
  expect(await page.evaluate(() => window.__WR.B.state)).toBe('pulling');
});
