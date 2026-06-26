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

test('Research capability summary stays localized and responsive', async ({ page }) => {
  await page.goto('/research');
  await expect(page.locator('.capability-summary li')).toHaveCount(6);
  await expect(page.locator('main')).toContainText('研究能力架構');
  await expect(page.locator('main')).toContainText('從農漁業副產物與生質來源思考材料循環');

  await page.goto('/en/research');
  await expect(page.locator('.capability-summary li')).toHaveCount(6);
  await expect(page.locator('main')).toContainText('Research capability framework');
  await expect(page.locator('main')).toContainText('Agricultural, fishery, and biomass resources');
  await expect(page.locator('main')).not.toContainText('研究能力架構');

  for (const [width, expectedColumns] of [[1440, 3], [1280, 2], [1024, 2], [768, 2], [430, 1], [390, 1]] as const) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/research');
    const columns = await page.locator('.capability-summary').evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length);
    expect(columns).toBe(expectedColumns);
    const sizes = await page.locator('html').evaluate((element) => ({ scrollWidth: element.scrollWidth, clientWidth: element.clientWidth }));
    expect(sizes.scrollWidth).toBeLessThanOrEqual(sizes.clientWidth);
  }
});

test('Chinese Research lead heading keeps its final character on the same desktop line', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/research');
  const heading = page.getByRole('heading', { name: '從材料來源到應用場域的六項研究主軸' });
  const box = await heading.boundingBox();
  expect(box?.height).toBeLessThan(75);
});

test('Research motion hooks stay restrained and keyboard reachable', async ({ page }) => {
  await page.goto('/research');
  const pathwayDelays = await page.locator('.pipeline li').evaluateAll((items) => items.map((item) => ({
    delay: (item as HTMLElement).style.getPropertyValue('--step-delay'),
    tabIndex: item.getAttribute('tabindex'),
    aria: item.getAttribute('aria-label'),
  })));
  expect(pathwayDelays).toHaveLength(5);
  expect(pathwayDelays.map((item) => item.delay)).toEqual(['0ms', '80ms', '160ms', '240ms', '320ms']);
  expect(pathwayDelays.every((item) => item.tabIndex === '0')).toBe(true);
  expect(pathwayDelays[0].aria).toContain('農漁業副產物');

  await expect(page.locator('.research-card').first()).toHaveAttribute('tabindex', '0');
  await expect(page.locator('.capability-summary li').first()).toHaveAttribute('tabindex', '0');
  const capabilityDelay = await page.locator('.capability-summary li').nth(2).evaluate((element) => (element as HTMLElement).style.getPropertyValue('--cap-delay'));
  expect(capabilityDelay).toBe('140ms');
});

test('reduced motion disables decorative pipeline animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/research');
  await expect(page.locator('.pipeline li').first()).toHaveCSS('animation-name', 'none');
  await page.goto('/');
  await expect(page.locator('.lattice-node').first()).toHaveCSS('animation-name', 'none');
});

for (const width of [1440, 1280, 1024, 768, 430, 390, 360]) {
  test(`home has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const sizes = await page.locator('html').evaluate((element) => ({ scrollWidth: element.scrollWidth, clientWidth: element.clientWidth }));
    expect(sizes.scrollWidth).toBeLessThanOrEqual(sizes.clientWidth);
  });
}

test('visual refinement target pages have no horizontal overflow at QA widths', async ({ page }) => {
  for (const width of [1440, 1280, 1024, 768, 430, 390] as const) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/research', '/en/research', '/about', '/contact'] as const) {
      await page.goto(path);
      const sizes = await page.locator('html').evaluate((element) => ({ scrollWidth: element.scrollWidth, clientWidth: element.clientWidth }));
      expect(sizes.scrollWidth, `${path} at ${width}px`).toBeLessThanOrEqual(sizes.clientWidth);
    }
  }
});
