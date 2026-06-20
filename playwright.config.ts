import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://127.0.0.1:4321',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
