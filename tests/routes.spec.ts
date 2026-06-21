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

test('Contact page presents verified office details and external official links', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.locator('main')).toContainText('7樓720室');
  await expect(page.locator('main')).toContainText('10樓A06室');
  await expect(page.locator('main')).toContainText('9樓908B室');
  await expect(page.locator('main')).toContainText('62176');
  await expect(page.locator('main')).toContainText('62159-72');
  await expect(page.getByRole('link', { name: /官方校園地圖/i })).toHaveAttribute('href', 'https://nckumap.ncku.edu.tw/map.php');
});

test('public pages do not expose internal pending markers', async ({ page }) => {
  for (const path of ['/', '/about', '/research', '/members', '/publications', '/facilities', '/news', '/join-us', '/contact', '/en/', '/en/about', '/en/research', '/en/members', '/en/publications', '/en/facilities', '/en/news', '/en/join-us', '/en/contact']) {
    await page.goto(path);
    await expect(page.locator('main')).not.toContainText('待提供：');
    await expect(page.locator('main')).not.toContainText('待確認：');
    await expect(page.locator('main')).not.toContainText('[Pending]');
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

test('Research cards use a calm responsive grid and retain at most three tags', async ({ page }) => {
  for (const [width, expectedColumns] of [[1440, 3], [1280, 2], [1024, 2], [768, 2], [430, 1], [390, 1]] as const) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/research');
    const columnCount = await page.locator('.page-content .research-grid').evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length);
    expect(columnCount).toBe(expectedColumns);
    const sizes = await page.locator('html').evaluate((element) => ({ scrollWidth: element.scrollWidth, clientWidth: element.clientWidth }));
    expect(sizes.scrollWidth).toBeLessThanOrEqual(sizes.clientWidth);
    const tagCounts = await page.locator('.research-card').evaluateAll((cards) => cards.map((card) => card.querySelectorAll('.tag-list span').length));
    expect(tagCounts).toEqual([3, 3, 3, 3, 3, 3]);
  }
});

test('Research card descriptions remain concise in both locales', async ({ page }) => {
  for (const path of ['/research', '/en/research']) {
    await page.goto(path);
    const lengths = await page.locator('.research-card > p').evaluateAll((items) => items.map((item) => item.textContent?.trim().length ?? 0));
    expect(lengths).toHaveLength(6);
    expect(Math.max(...lengths)).toBeLessThan(155);
  }
});

for (const width of [1440, 1280, 1024, 768, 430, 390, 360]) {
  test(`home has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const sizes = await page.locator('html').evaluate((element) => ({ scrollWidth: element.scrollWidth, clientWidth: element.clientWidth }));
    expect(sizes.scrollWidth).toBeLessThanOrEqual(sizes.clientWidth);
  });
}
