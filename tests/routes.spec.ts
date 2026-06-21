import { expect, test } from '@playwright/test';

test('traditional Chinese home exposes a named main landmark', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hant');
});

test('reduced motion removes continuous animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.lattice-node').first()).toHaveCSS('animation-name', 'none');
});

test('English research page has English-only research descriptions', async ({ page }) => {
  await page.goto('/en/research');
  await expect(page.getByText('Green Synthesis & Circular Economy')).toBeVisible();
  await expect(page.locator('main')).not.toContainText('綠色合成與循環經濟');
});

test('information pages use formal pending states instead of raw markers', async ({ page }) => {
  for (const path of ['/members', '/publications', '/facilities', '/news']) {
    await page.goto(path);
    await expect(page.locator('main')).not.toContainText('[待提供');
    await expect(page.locator('main')).not.toContainText('[待確認');
    await expect(page.locator('main')).not.toContainText('[Pending');
  }
});

test('all Chinese and English routes expose a visible page heading', async ({ page }) => {
  for (const path of ['/', '/about', '/research', '/members', '/publications', '/facilities', '/news', '/join-us', '/contact', '/en/', '/en/about', '/en/research', '/en/members', '/en/publications', '/en/facilities', '/en/news', '/en/join-us', '/en/contact']) {
    await page.goto(path);
    await expect(page.locator('main h1')).toBeVisible();
  }
});

test('mobile navigation opens accessibly', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const button = page.getByRole('button', { name: 'Open navigation' });
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobile-navigation')).toBeVisible();
});

for (const width of [1440, 1280, 1024, 768, 430, 390, 360]) {
  test(`home has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const sizes = await page.locator('html').evaluate((element) => ({ scrollWidth: element.scrollWidth, clientWidth: element.clientWidth }));
    expect(sizes.scrollWidth).toBeLessThanOrEqual(sizes.clientWidth);
  });
}
