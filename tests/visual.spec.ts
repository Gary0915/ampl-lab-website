import { test } from '@playwright/test';

const captures = [
  ['/', 'home-desktop', { width: 1440, height: 1000 }],
  ['/research', 'research-desktop', { width: 1280, height: 1000 }],
  ['/research', 'research-wide-desktop', { width: 1440, height: 1000 }],
  ['/research', 'research-tablet', { width: 1024, height: 1000 }],
  ['/research', 'research-mobile', { width: 390, height: 844 }],
  ['/en/research', 'research-english-desktop', { width: 1280, height: 1000 }],
  ['/about', 'about-professor-desktop', { width: 1280, height: 1000 }],
  ['/publications', 'publications-desktop', { width: 1280, height: 1000 }],
  ['/publications', 'publications-mobile', { width: 390, height: 844 }],
  ['/en/publications', 'publications-english-desktop', { width: 1280, height: 1000 }],
  ['/facilities', 'facilities-desktop', { width: 1280, height: 1000 }],
  ['/facilities', 'facilities-mobile', { width: 390, height: 844 }],
  ['/en/facilities', 'facilities-english-desktop', { width: 1280, height: 1000 }],
  ['/contact', 'contact-desktop', { width: 1280, height: 1000 }],
  ['/', 'home-mobile', { width: 390, height: 844 }],
  ['/members', 'members-mobile', { width: 390, height: 844 }],
  ['/contact', 'contact-mobile', { width: 390, height: 844 }],
] as const;

for (const [path, name, viewport] of captures) {
  test(`capture ${name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    if (name.startsWith('research')) await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(path);
    await page.screenshot({ path: `artifacts/qa/${name}.png`, fullPage: true });
  });
}
