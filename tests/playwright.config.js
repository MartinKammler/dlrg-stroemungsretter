// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const PORT = 4173;
module.exports = defineConfig({
  testDir: '.',
  testMatch: /.*\.spec\.js/,
  timeout: 60_000,
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}/`,
    launchOptions: process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1000, height: 700 } }, testIgnore: /mobile\.spec\.js/ },
    { name: 'handy', use: { ...devices['Pixel 7'] }, testMatch: /mobile\.spec\.js/ },
  ],
  webServer: { command: 'node serve.mjs', port: PORT, reuseExistingServer: true, env: { PORT: String(PORT) } },
});
