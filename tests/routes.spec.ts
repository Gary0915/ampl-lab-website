import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { expect, test, type Page } from '@playwright/test';
import type { Locale } from '../src/content/site';
import { getAbsoluteUrl, getRoutePath, seoConfig, seoPages, type SeoRoute } from '../src/content/seo';

const seoRouteCases: Array<{ path: string; lang: Locale; route: SeoRoute }> = [
  { path: '/', lang: 'zh-Hant', route: 'home' },
  { path: '/about/', lang: 'zh-Hant', route: 'about' },
  { path: '/research/', lang: 'zh-Hant', route: 'research' },
  { path: '/projects/', lang: 'zh-Hant', route: 'projects' },
  { path: '/publications/', lang: 'zh-Hant', route: 'publications' },
  { path: '/facilities/', lang: 'zh-Hant', route: 'facilities' },
  { path: '/members/', lang: 'zh-Hant', route: 'members' },
  { path: '/join-us/', lang: 'zh-Hant', route: 'join-us' },
  { path: '/contact/', lang: 'zh-Hant', route: 'contact' },
  { path: '/news/', lang: 'zh-Hant', route: 'news' },
  { path: '/en/', lang: 'en', route: 'home' },
  { path: '/en/about/', lang: 'en', route: 'about' },
  { path: '/en/research/', lang: 'en', route: 'research' },
  { path: '/en/projects/', lang: 'en', route: 'projects' },
  { path: '/en/publications/', lang: 'en', route: 'publications' },
  { path: '/en/facilities/', lang: 'en', route: 'facilities' },
  { path: '/en/members/', lang: 'en', route: 'members' },
  { path: '/en/join-us/', lang: 'en', route: 'join-us' },
  { path: '/en/contact/', lang: 'en', route: 'contact' },
  { path: '/en/news/', lang: 'en', route: 'news' },
];

async function measureTransparentPng(page: Page, filename: string, size: number) {
  const image = readFileSync(path.join(process.cwd(), 'public', filename));
  const encoded = image.toString('base64');
  return page.evaluate(async ({ encoded, size }) => {
    const img = new Image();
    img.src = `data:image/png;base64,${encoded}`;
    await img.decode();
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context unavailable');
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
    const data = ctx.getImageData(0, 0, size, size).data;
    let minX = size;
    let minY = size;
    let maxX = -1;
    let maxY = -1;
    let checkerPixels = 0;
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const index = (y * size + x) * 4;
        const red = data[index];
        const green = data[index + 1];
        const blue = data[index + 2];
        const alpha = data[index + 3];
        if (alpha > 8) {
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
        const isWhite = red > 245 && green > 245 && blue > 245;
        const isCheckerGray = red >= 190 && red <= 215 && green >= 190 && green <= 215 && blue >= 190 && blue <= 215;
        if (alpha === 255 && (isWhite || isCheckerGray)) checkerPixels += 1;
      }
    }
    const width = maxX >= 0 ? maxX - minX + 1 : 0;
    const height = maxY >= 0 ? maxY - minY + 1 : 0;
    const corners = [
      [0, 0],
      [size - 1, 0],
      [0, size - 1],
      [size - 1, size - 1],
    ].map(([x, y]) => Array.from(ctx.getImageData(x, y, 1, 1).data));
    return {
      width,
      height,
      widthRatio: width / size,
      heightRatio: height / size,
      maxRatio: Math.max(width, height) / size,
      corners,
      checkerPixels,
    };
  }, { encoded, size });
}

test('main routes expose centralized SEO, Open Graph, Twitter card, and hreflang metadata', async ({ page }) => {
  for (const item of seoRouteCases) {
    await page.goto(item.path);
    const expected = seoPages[item.lang][item.route];
    const expectedCanonical = getAbsoluteUrl(getRoutePath(item.route, item.lang));
    const expectedOgImage = getAbsoluteUrl(seoConfig.defaultOgImagePath);
    const expectedZhAlternate = getAbsoluteUrl(getRoutePath(item.route, 'zh-Hant'));
    const expectedEnAlternate = getAbsoluteUrl(getRoutePath(item.route, 'en'));

    await expect(page).toHaveTitle(expected.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', expected.description);
    await expect(page.locator('link[rel="icon"][href="/favicon.ico"]')).toHaveAttribute('sizes', 'any');
    await expect(page.locator('link[rel="icon"][href="/favicon.svg"]')).toHaveAttribute('type', 'image/svg+xml');
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href', '/apple-touch-icon.png');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', expectedCanonical);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', expected.title);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', expected.description);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', expectedCanonical);
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', seoConfig.siteName);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', expectedOgImage);
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', String(seoConfig.ogImageWidth));
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', String(seoConfig.ogImageHeight));
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute('content', seoConfig.ogImageAlt[item.lang]);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', item.lang === 'zh-Hant' ? 'zh_TW' : 'en_US');
    await expect(page.locator('meta[property="og:locale:alternate"]')).toHaveAttribute('content', item.lang === 'zh-Hant' ? 'en_US' : 'zh_TW');
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', expected.title);
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute('content', expected.description);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', expectedOgImage);
    await expect(page.locator('meta[name="twitter:image:alt"]')).toHaveAttribute('content', seoConfig.ogImageAlt[item.lang]);
    await expect(page.locator('link[rel="alternate"][hreflang="zh-Hant"]')).toHaveAttribute('href', expectedZhAlternate);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', expectedEnAlternate);
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute('href', expectedZhAlternate);

    const headHtml = await page.locator('head').evaluate((head) => head.innerHTML);
    for (const marker of ['[待提供]', '[待確認]', '[Pending]', '待提供：', '待確認：']) {
      expect(headHtml).not.toContain(marker);
    }
  }
});

test('branded Open Graph image exists as a 1200 by 630 PNG', () => {
  const ogImagePath = path.join(process.cwd(), 'public', 'og-image.png');
  expect(existsSync(ogImagePath)).toBe(true);
  const image = readFileSync(ogImagePath);
  expect(image.subarray(1, 4).toString('ascii')).toBe('PNG');
  expect(image.readUInt32BE(16)).toBe(1200);
  expect(image.readUInt32BE(20)).toBe(630);
});

test('favicon and app icon assets are optically sized from vector source', async ({ page }) => {
  const publicPath = path.join(process.cwd(), 'public');
  const svg = readFileSync(path.join(publicPath, 'favicon.svg'), 'utf8');
  expect(svg).toContain('<svg');
  expect(svg).not.toMatch(/<image|base64|data:image/i);

  for (const [filename, width, height] of [
    ['favicon-16x16.png', 16, 16],
    ['favicon-32x32.png', 32, 32],
    ['apple-touch-icon.png', 180, 180],
    ['icon-192.png', 192, 192],
    ['icon-512.png', 512, 512],
  ] as const) {
    const image = readFileSync(path.join(publicPath, filename));
    expect(image.subarray(1, 4).toString('ascii')).toBe('PNG');
    expect(image.readUInt32BE(16)).toBe(width);
    expect(image.readUInt32BE(20)).toBe(height);
    expect(image[25]).toBe(6);
  }

  const app512 = await measureTransparentPng(page, 'icon-512.png', 512);
  expect(app512.maxRatio).toBeGreaterThanOrEqual(0.88);
  expect(app512.maxRatio).toBeLessThanOrEqual(0.92);
  expect(app512.checkerPixels).toBe(0);
  expect(app512.corners.every((pixel) => pixel[3] === 0)).toBe(true);

  const app192 = await measureTransparentPng(page, 'icon-192.png', 192);
  expect(app192.maxRatio).toBeGreaterThanOrEqual(0.88);
  expect(app192.maxRatio).toBeLessThanOrEqual(0.93);
  expect(app192.checkerPixels).toBe(0);
  expect(app192.corners.every((pixel) => pixel[3] === 0)).toBe(true);

  const favicon32 = await measureTransparentPng(page, 'favicon-32x32.png', 32);
  expect(favicon32.widthRatio).toBeGreaterThanOrEqual(0.8);
  expect(favicon32.maxRatio).toBeGreaterThanOrEqual(0.9);
  expect(favicon32.checkerPixels).toBe(0);
  expect(favicon32.corners.every((pixel) => pixel[3] === 0)).toBe(true);

  const favicon16 = await measureTransparentPng(page, 'favicon-16x16.png', 16);
  expect(favicon16.widthRatio).toBeGreaterThanOrEqual(0.85);
  expect(favicon16.maxRatio).toBeGreaterThanOrEqual(0.9);
  expect(favicon16.checkerPixels).toBe(0);
  expect(favicon16.corners.every((pixel) => pixel[3] === 0)).toBe(true);

  const ico = readFileSync(path.join(publicPath, 'favicon.ico'));
  expect(ico.readUInt16LE(0)).toBe(0);
  expect(ico.readUInt16LE(2)).toBe(1);
  expect(ico.readUInt16LE(4)).toBe(2);
});

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
  for (const path of ['/', '/about', '/research', '/projects', '/members', '/publications', '/facilities', '/news', '/join-us', '/contact', '/en/', '/en/about', '/en/research', '/en/projects', '/en/members', '/en/publications', '/en/facilities', '/en/news', '/en/join-us', '/en/contact']) {
    await page.goto(path);
    await expect(page.locator('main')).not.toContainText('待提供：');
    await expect(page.locator('main')).not.toContainText('待確認：');
    await expect(page.locator('main')).not.toContainText('[Pending]');
    await expect(page.locator('main')).not.toContainText('needsReview');
    await expect(page.locator('main')).not.toContainText('review pending');
    await expect(page.locator('main')).not.toContainText('待審');
  }
});

test('all Chinese and English routes expose a visible page heading', async ({ page }) => {
  for (const path of ['/', '/about', '/research', '/projects', '/members', '/publications', '/facilities', '/news', '/join-us', '/contact', '/en/', '/en/about', '/en/research', '/en/projects', '/en/members', '/en/publications', '/en/facilities', '/en/news', '/en/join-us', '/en/contact']) {
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

test('refinement language switch preserves the current localized route', async ({ page }) => {
  const cases = [
    ['/', '/en/'],
    ['/research/', '/en/research/'],
    ['/publications/', '/en/publications/'],
    ['/facilities/', '/en/facilities/'],
    ['/projects/', '/en/projects/'],
    ['/join-us/', '/en/join-us/'],
    ['/contact/', '/en/contact/'],
    ['/en/', '/'],
    ['/en/research/', '/research/'],
    ['/en/publications/', '/publications/'],
    ['/en/facilities/', '/facilities/'],
    ['/en/projects/', '/projects/'],
    ['/en/join-us/', '/join-us/'],
    ['/en/contact/', '/contact/'],
  ] as const;

  for (const [pathname, alternate] of cases) {
    await page.goto(pathname);
    await expect(page.locator('[data-locale-switch]').first(), pathname).toHaveAttribute('href', alternate);
  }
});

test('refinement navigation separates the desktop Contact CTA and exposes one active route', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });

  for (const [pathname, activeLabel] of [
    ['/about/', '關於實驗室'],
    ['/research/', '研究領域'],
    ['/projects/', '計畫合作'],
    ['/publications/', '出版品'],
    ['/facilities/', '實驗設施'],
    ['/members/', '成員'],
    ['/join-us/', '加入我們'],
    ['/en/publications/', 'Publications'],
  ] as const) {
    await page.goto(pathname);
    await expect(page.locator('[data-desktop-nav]')).not.toContainText(/聯絡資訊|Contact/);
    await expect(page.locator('[data-contact-cta]')).toHaveCount(1);
    await expect(page.locator('[data-desktop-nav] [aria-current="page"]')).toHaveCount(1);
    await expect(page.locator('[data-desktop-nav] [aria-current="page"]')).toHaveText(activeLabel);
  }

  await page.goto('/contact/');
  await expect(page.locator('[data-desktop-nav] [aria-current="page"]')).toHaveCount(0);
  await expect(page.locator('[data-contact-cta]')).toHaveAttribute('aria-current', 'page');
});

test('refinement mobile navigation keeps Contact, active state, and route-preserving language switch', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/en/research/');
  await page.locator('[data-menu-toggle]').click();

  await expect(page.locator('[data-menu] [data-mobile-nav-item="contact"]')).toHaveText('Contact');
  await expect(page.locator('[data-menu] [aria-current="page"]')).toHaveCount(1);
  await expect(page.locator('[data-menu] [aria-current="page"]')).toHaveText('Research');
  await expect(page.locator('[data-menu] [data-locale-switch]')).toHaveAttribute('href', '/research/');
});

test('refinement public pages omit internal maintenance language', async ({ page }) => {
  const forbidden = [
    '建議教授確認後',
    '資料整理中',
    '待提供',
    '待確認',
    'Pending',
    'requires professor confirmation',
    'pending verification',
  ];

  for (const pathname of [
    '/', '/about/', '/research/', '/projects/', '/members/', '/publications/', '/facilities/', '/news/', '/join-us/', '/contact/',
    '/en/', '/en/about/', '/en/research/', '/en/projects/', '/en/members/', '/en/publications/', '/en/facilities/', '/en/news/', '/en/join-us/', '/en/contact/',
  ]) {
    await page.goto(pathname);
    const content = await page.locator('main').innerText();
    for (const phrase of forbidden) expect(content, `${pathname} exposes ${phrase}`).not.toContain(phrase);
  }

  await page.goto('/members/');
  await expect(page.locator('.pi-card')).toHaveCount(1);
  await expect(page.locator('.pending-card')).toHaveCount(0);

  await page.goto('/news/');
  await expect(page.locator('[data-news-empty-state]')).toHaveCount(1);
  await expect(page.locator('.pending-card')).toHaveCount(0);
});

test('refinement About presents one consolidated professor profile with verified detail groups', async ({ page }) => {
  for (const pathname of ['/about/', '/en/about/']) {
    await page.goto(pathname);
    const profile = page.locator('[data-professor-profile]');
    await expect(profile).toHaveCount(1);
    await expect(profile.locator('[data-profile-group="education"]')).toHaveCount(1);
    await expect(profile.locator('[data-profile-group="experience"]')).toHaveCount(1);
    await expect(profile.locator('[data-profile-group="expertise"]')).toHaveCount(1);
    await expect(page.locator('main .pi-card')).toHaveCount(0);
  }
});

test('refinement interior pages use editorial and compact hero density variants', async ({ page }) => {
  for (const pathname of ['/about/', '/research/', '/facilities/', '/en/about/', '/en/research/', '/en/facilities/']) {
    await page.goto(pathname);
    await expect(page.locator('[data-hero-density]')).toHaveAttribute('data-hero-density', 'editorial');
  }

  for (const pathname of ['/projects/', '/publications/', '/members/', '/news/', '/join-us/', '/contact/', '/en/projects/', '/en/contact/']) {
    await page.goto(pathname);
    await expect(page.locator('[data-hero-density]')).toHaveAttribute('data-hero-density', 'compact');
  }
});

test('refinement Research keeps its records while using capability matrix and editorial method rows', async ({ page }) => {
  for (const pathname of ['/research/', '/en/research/']) {
    await page.goto(pathname);
    await expect(page.locator('.research-card')).toHaveCount(6);
    await expect(page.locator('[data-capability-item]')).toHaveCount(6);
    await expect(page.locator('[data-method-row]')).toHaveCount(3);
    await expect(page.locator('.pipeline li')).toHaveCount(5);
  }
});

test('refinement native cross-document transition is progressive and reduced-motion aware', () => {
  const layout = readFileSync(path.join(process.cwd(), 'src', 'layouts', 'BaseLayout.astro'), 'utf8');
  const css = readFileSync(path.join(process.cwd(), 'src', 'styles', 'global.css'), 'utf8');

  expect(layout).toContain('page-transition-content');
  expect(layout).not.toContain('ClientRouter');
  expect(css).toContain('@view-transition');
  expect(css).toContain('view-transition-name:page-content');
  expect(css).toContain('::view-transition-old(page-content)');
  expect(css).toContain('::view-transition-new(page-content)');
  expect(css).toContain('@media(prefers-reduced-motion:reduce)');
  const transitionAnimations = [...css.matchAll(/@keyframes page-transition-(?:out|in)\{[^}]*\}/g)].map((match) => match[0]).join('');
  expect(transitionAnimations).not.toContain('scale(');
  expect(transitionAnimations).not.toContain('blur(');
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

  for (const [width, expectedColumns] of [[1440, 3], [1280, 3], [1024, 2], [768, 2], [430, 1], [390, 1]] as const) {
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

test('navigation and editorial refinement routes have no horizontal overflow at all QA widths', async ({ page }) => {
  const paths = [
    '/', '/about/', '/research/', '/projects/', '/publications/', '/facilities/', '/members/', '/join-us/', '/contact/',
    '/en/about/', '/en/research/', '/en/contact/',
  ] as const;

  for (const width of [1440, 1280, 1024, 768, 430, 390, 360] as const) {
    await page.setViewportSize({ width, height: 900 });
    for (const pathname of paths) {
      await page.goto(pathname);
      const sizes = await page.locator('html').evaluate((element) => ({ scrollWidth: element.scrollWidth, clientWidth: element.clientWidth }));
      expect(sizes.scrollWidth, `${pathname} at ${width}px`).toBeLessThanOrEqual(sizes.clientWidth);
    }
  }
});

test('Official publications records replace placeholder-only publication pages', async ({ page }) => {
  for (const path of ['/publications', '/en/publications'] as const) {
    await page.goto(path);
    await expect(page.locator('[data-publication-card]')).toHaveCount(5);
    await expect(page.locator('[data-publication-card]').first()).toContainText('AI-Driven Intelligent Grinding Automation for Precision Motorcycle Camshaft Manufacturing');
    await expect(page.locator('[data-publication-explorer]')).toBeVisible();
    await expect(page.locator('[data-publication-item]')).toHaveCount(30);
    await expect(page.getByRole('link', { name: /Official NCKU|官方教師頁/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Professor Website|個人網站/i })).toBeVisible();
    await expect(page.locator('main')).not.toContainText('Search');
    await expect(page.locator('main')).not.toContainText('搜尋');
    await expect(page.locator('[data-filter-group="year"]')).toBeVisible();
    await expect(page.locator('[data-filter-group="topic"]')).toBeVisible();
  }
});

test('Home keeps selected publications preview compact', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.selected-publications--preview [data-publication-card]')).toHaveCount(3);
  await expect(page.locator('.selected-publications--preview')).toContainText('AI-Driven Intelligent Grinding Automation for Precision Motorcycle Camshaft Manufacturing');
});

test('Publications explorer uses progressive disclosure', async ({ page }) => {
  await page.goto('/publications/');
  await expect(page.locator('[data-publication-item]:visible')).toHaveCount(10);
  await expect(page.locator('[data-publication-count]')).toContainText('顯示 10 / 30 筆');

  await page.locator('[data-show-more]').click();
  await expect(page.locator('[data-publication-item]:visible')).toHaveCount(20);
  await expect(page.locator('[data-publication-count]')).toContainText('顯示 20 / 30 筆');

  await page.locator('[data-show-all]').click();
  await expect(page.locator('[data-publication-item]:visible')).toHaveCount(30);
  await expect(page.locator('[data-publication-count]')).toContainText('顯示 30 / 30 筆');
});

test('Publication year filter changes visible records', async ({ page }) => {
  await page.goto('/publications/');
  const chip = page.locator('[data-filter-group="year"] button[data-filter-value="2025"]');
  await chip.click();

  const visibleRows = page.locator('[data-publication-item]:visible');
  await expect(visibleRows).toHaveCount(10);
  await expect(chip).toHaveAttribute('aria-pressed', 'true');

  const visibleYears = await visibleRows.evaluateAll((items) => items.map((item) => item.getAttribute('data-year')));
  expect(new Set(visibleYears)).toEqual(new Set(['2025']));
  await expect(page.locator('[data-publication-count]')).toContainText('顯示 10 / 17 筆');
});

test('Publication topic filter changes visible records', async ({ page }) => {
  await page.goto('/en/publications/');
  const chip = page.locator('[data-filter-group="topic"] button[data-filter-value="Sensing Materials"]');
  await chip.click();

  const visibleRows = page.locator('[data-publication-item]:visible');
  await expect(visibleRows.first()).toBeVisible();
  await expect(chip).toHaveAttribute('aria-pressed', 'true');

  const visibleTopics = await visibleRows.evaluateAll((items) => items.map((item) => item.getAttribute('data-topics') || ''));
  expect(visibleTopics.every((topics) => topics.includes('Sensing Materials'))).toBe(true);
});

test('Official facilities equipment groups use normalized public equipment names', async ({ page }) => {
  for (const path of ['/facilities', '/en/facilities'] as const) {
    await page.goto(path);
    await expect(page.locator('.equipment-groups article')).toHaveCount(5);
    for (const item of ['Abaqus', 'Thermal CVD', 'Raman', 'Potentiostat', 'Incubator']) {
      await expect(page.locator('main')).toContainText(item);
    }
    await expect(page.locator('main')).not.toContainText('Applicat0R');
    await expect(page.locator('main')).not.toContainText('Incubat0R');
  }
});

test('Information architecture rebalance keeps Research focused', async ({ page }) => {
  for (const path of ['/research', '/en/research'] as const) {
    await page.goto(path);
    await expect(page.locator('.research-card')).toHaveCount(6);
    await expect(page.locator('.capability-summary li')).toHaveCount(6);
    await expect(page.locator('.pipeline li')).toHaveCount(5);
    await expect(page.locator('.methods-row')).toHaveCount(3);
    await expect(page.locator('.lab-products')).toHaveCount(0);
    await expect(page.locator('.project-summary')).toHaveCount(0);
    await expect(page.locator('main')).not.toContainText('Cellulose nanocrystal');
    await expect(page.locator('main')).not.toContainText('NSTC 113-2221-E-006');
    await expect(page.locator('main')).not.toContainText('台積電');
    await expect(page.locator('main')).not.toContainText('台達電');
  }
});

test('Information architecture rebalance adds localized Projects pages', async ({ page }) => {
  await page.goto('/projects');
  await expect(page.locator('main h1')).toHaveText('計畫與合作');
  await expect(page.locator('.project-summary-card')).toHaveCount(3);
  await expect(page.locator('main')).toContainText('公共研究計畫');
  await expect(page.locator('main')).toContainText('產學合作');
  await expect(page.locator('main')).toContainText('國際與學生研究');
  await expect(page.getByRole('link', { name: '聯繫討論' })).toHaveAttribute('href', '/contact');
  await expect(page.locator('main')).not.toContainText('NSTC');
  await expect(page.locator('main')).not.toContainText('台積電');
  await expect(page.locator('main')).not.toContainText('台達電');

  await page.goto('/en/projects');
  await expect(page.locator('main h1')).toHaveText('Projects & Collaboration');
  await expect(page.locator('.project-summary-card')).toHaveCount(3);
  await expect(page.locator('main')).toContainText('Public Research Projects');
  await expect(page.locator('main')).toContainText('Industry Collaboration');
  await expect(page.locator('main')).toContainText('International & Student Research');
  await expect(page.getByRole('link', { name: 'Discuss collaboration' })).toHaveAttribute('href', '/en/contact');
  await expect(page.locator('main')).not.toContainText('NSTC');
});

test('Information architecture rebalance updates primary navigation without crowding', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.desktop-nav')).toContainText('計畫合作');
  await expect(page.locator('.desktop-nav')).not.toContainText('最新消息');
  await expect(page.locator('footer')).toContainText('最新消息');

  await page.goto('/en/');
  await expect(page.locator('.desktop-nav')).toContainText('Projects');
  await expect(page.locator('.desktop-nav')).not.toContainText('News');
  await expect(page.locator('footer')).toContainText('News');
});

test('official records target pages have no horizontal overflow at QA widths', async ({ page }) => {
  for (const width of [1440, 1280, 1024, 768, 430, 390] as const) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/publications', '/facilities', '/projects', '/en/publications', '/en/facilities', '/en/projects'] as const) {
      await page.goto(path);
      const sizes = await page.locator('html').evaluate((element) => ({ scrollWidth: element.scrollWidth, clientWidth: element.clientWidth }));
      expect(sizes.scrollWidth, `${path} at ${width}px`).toBeLessThanOrEqual(sizes.clientWidth);
    }
  }
});
