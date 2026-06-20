# AMPL Academic Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a polished, bilingual (繁中 default / English alternate), responsive Astro website for NCKU's Advanced Material and Processing Lab.

**Architecture:** Astro file-based pages render typed locale data through shared layout and presentation components. A small inline client script controls the scroll header, accessible mobile menu, and reveal-state classes; all persistent visual motion uses CSS and honors reduced-motion preferences. Unknown lab facts remain explicit bilingual placeholder panels rather than fabricated records.

**Tech Stack:** Astro, TypeScript, Tailwind CSS, plain CSS, Playwright.

---

## File structure

- `package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.mjs`, `src/styles/global.css`: build and design-system setup.
- `src/content/site.ts`, `src/content/research.ts`, `src/content/placeholders.ts`: typed bilingual, verified content and placeholders.
- `src/layouts/BaseLayout.astro`: locale metadata and common document shell.
- `src/components/*.astro`: shared header/footer, scientific visual, cards, pipeline, and empty-state components.
- `src/pages/*.astro` and `src/pages/en/*.astro`: nine routes per locale.
- `src/scripts/site-ui.ts`: mobile menu, header state, and reveal behavior.
- `tests/routes.spec.ts`: route, navigation, locale, and viewport smoke tests.
- `tests/visual.spec.ts`: screenshot coverage for required QA views.
- `README.md`: install/run/test instructions and known content gaps.

### Task 1: Scaffold the reproducible Astro project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `tailwind.config.mjs`
- Create: `src/env.d.ts`

- [ ] **Step 1: Create the package manifest with exact scripts and pinned major tooling**

```json
{
  "name": "ampl-academic-lab-website",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "test": "playwright test"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.4",
    "@astrojs/tailwind": "^5.1.4",
    "@playwright/test": "^1.54.2",
    "astro": "^5.12.8",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.3"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`

Expected: exit code 0 and a generated `package-lock.json`.

- [ ] **Step 3: Add Astro and TypeScript configuration**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
export default defineConfig({ integrations: [tailwind({ applyBaseStyles: false })] });
```

```json
// tsconfig.json
{ "extends": "astro/tsconfigs/strict", "include": [".astro/types.d.ts", "src"] }
```

- [ ] **Step 4: Verify the scaffold**

Run: `npx astro check`

Expected: exit code 0 after the base page is added in Task 2.

### Task 2: Establish global tokens, base shell, and accessible site behavior

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/scripts/site-ui.ts`
- Test: `tests/routes.spec.ts`

- [ ] **Step 1: Write a failing home-route and reduced-motion test**

```ts
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
```

- [ ] **Step 2: Run the test to establish the red state**

Run: `npx playwright test tests/routes.spec.ts`

Expected: FAIL because no server or route exists.

- [ ] **Step 3: Add tokens and layout shell**

Implement CSS custom properties `--navy: #0B1F3A`, `--blue: #123C69`, `--graphite: #1F2933`, `--paper: #F8FAFC`, `--green: #4F8A5B`, `--gold: #B7791F`; apply a visible `:focus-visible` outline; use `scroll-behavior: smooth`; and set all animation durations to `0.01ms` in `@media (prefers-reduced-motion: reduce)`.

`BaseLayout.astro` receives `title`, `description`, and `lang`, renders `<html lang={lang}>`, imports `global.css`, renders a skip link, header slot, `main`, footer slot, and `<script src="/src/scripts/site-ui.ts"></script>`.

`site-ui.ts` toggles `[data-menu-open]`, `aria-expanded`, and a `is-scrolled` class; an `IntersectionObserver` adds `.is-revealed` to `[data-reveal]` elements.

- [ ] **Step 4: Re-run type checking and the test**

Run: `npx astro check && npx playwright test tests/routes.spec.ts`

Expected: type check passes; route test remains red until Task 5 supplies home content.

### Task 3: Create typed bilingual content with only supplied or placeholder facts

**Files:**
- Create: `src/content/site.ts`
- Create: `src/content/research.ts`
- Create: `src/content/placeholders.ts`

- [ ] **Step 1: Define locale and content types**

```ts
export type Locale = 'zh-Hant' | 'en';
export type Localized = { 'zh-Hant': string; en: string };
export type ResearchArea = { title: Localized; description: Localized; tags: Localized[]; motif: 'leaf' | 'lattice' | 'layers' | 'wave' | 'grid' | 'bio' };
```

- [ ] **Step 2: Enter the six verified research themes and route labels**

Include green synthesis/circular economy, nanomaterials/biopolymer composites, tribology/surface engineering, biomedical/environmental materials, sensing/functional coatings, and simulation/process optimization. Use explanatory language tied only to these supplied themes.

- [ ] **Step 3: Define pending panels exactly**

```ts
export const pending = {
  members: { 'zh-Hant': '[待提供：現任成員名單與研究主題]', en: '[Pending: current member list and research topics]' },
  publications: { 'zh-Hant': '[待確認：代表論文與完整書目資料]', en: '[Pending: selected publications and verified bibliographic details]' },
  facilities: { 'zh-Hant': '[待提供：設備清單與照片]', en: '[Pending: facility inventory and photographs]' },
  news: { 'zh-Hant': '[待提供：實驗室消息]', en: '[Pending: laboratory news]' }
} as const;
```

- [ ] **Step 4: Verify content contains no invented facts**

Run: `rg -n "Student|Professor|Publication|Award|Equipment" src/content`

Expected: the only person record is Prof. Shih-Chen Shi; non-verified records are pending panels.

### Task 4: Build reusable visual components

**Files:**
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/HeroLattice.astro`
- Create: `src/components/ResearchCard.astro`
- Create: `src/components/Pipeline.astro`
- Create: `src/components/PlaceholderPanel.astro`
- Create: `src/components/PublicationItem.astro`

- [ ] **Step 1: Add the Header with locale-aware links and a keyboard-friendly mobile button**

Header markup must contain a `<button aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-navigation">`, a `<nav id="mobile-navigation">`, and a `data-menu-toggle` hook. It must show `/en/` on Chinese routes and the corresponding non-`/en/` URL on English routes.

- [ ] **Step 2: Add HeroLattice as an accessible decorative SVG**

Use `<svg aria-hidden="true" focusable="false">` with 18 circles (`class="lattice-node"`) and connecting `<path>` elements. CSS animates transforms/opacity only, at 12–18 second durations.

- [ ] **Step 3: Implement card, pipeline, publication, and placeholder primitives**

`ResearchCard` uses an `<article>` with a top accent rule and tag list. `Pipeline` uses an ordered list to communicate sequence semantically. `PublicationItem` has a visible `[待確認]` marker, never an author/citation. `PlaceholderPanel` exposes a clear status label but is not an image placeholder.

- [ ] **Step 4: Test keyboard menu interaction**

Add this test to `tests/routes.spec.ts`:

```ts
test('mobile navigation opens from its button', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const button = page.getByRole('button', { name: /open navigation/i });
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobile-navigation')).toBeVisible();
});
```

### Task 5: Build the Chinese page routes and homepage narrative

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/about.astro`
- Create: `src/pages/research.astro`
- Create: `src/pages/members.astro`
- Create: `src/pages/publications.astro`
- Create: `src/pages/facilities.astro`
- Create: `src/pages/news.astro`
- Create: `src/pages/join-us.astro`
- Create: `src/pages/contact.astro`

- [ ] **Step 1: Add a failing route coverage test**

```ts
test('all Chinese routes return a visible h1', async ({ page }) => {
  for (const path of ['/', '/about', '/research', '/members', '/publications', '/facilities', '/news', '/join-us', '/contact']) {
    await page.goto(path);
    await expect(page.locator('h1')).toBeVisible();
  }
});
```

- [ ] **Step 2: Implement the home page**

Render the exact hero identity: `尖端材料及製程實驗室`, `Advanced Material and Processing Lab`, `AMPL`, and `Green Synthesis · Circular Economy · Nanomaterials · Surface Engineering`. Follow with research identity, six research cards, the five-step pipeline, selected-publication pending panel, capability statement, and Join Us CTA.

- [ ] **Step 3: Implement the eight remaining routes**

Each route must use `BaseLayout`, have one H1, provide a useful short bilingual-content-ready introduction, and use `PlaceholderPanel` for unknown members, facilities, publications, news, office, and map details. About identifies Prof. Shih-Chen Shi and the stated NCKU Mechanical Engineering affiliation; Contact shows the supplied email only.

- [ ] **Step 4: Run route and build checks**

Run: `npm run build && npx playwright test tests/routes.spec.ts`

Expected: PASS.

### Task 6: Add English routes with parallel content and correct locale switching

**Files:**
- Create: `src/pages/en/index.astro`
- Create: `src/pages/en/about.astro`
- Create: `src/pages/en/research.astro`
- Create: `src/pages/en/members.astro`
- Create: `src/pages/en/publications.astro`
- Create: `src/pages/en/facilities.astro`
- Create: `src/pages/en/news.astro`
- Create: `src/pages/en/join-us.astro`
- Create: `src/pages/en/contact.astro`
- Modify: `tests/routes.spec.ts`

- [ ] **Step 1: Add an English locale test**

```ts
test('English home sets the locale and supplies a Chinese switch', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('link', { name: '繁中' })).toHaveAttribute('href', '/');
});
```

- [ ] **Step 2: Implement the nine matching pages**

Reuse the same components and typed English data. Do not translate a fact beyond the supplied scope, and retain `[Pending: ...]` panels for every unknown record.

- [ ] **Step 3: Verify all locale routes**

Run: `npm run build && npx playwright test tests/routes.spec.ts`

Expected: PASS.

### Task 7: Add visual regression coverage and complete responsive QA

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/visual.spec.ts`
- Create: `artifacts/qa/.gitkeep`

- [ ] **Step 1: Define local server configuration**

```ts
import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://127.0.0.1:4321' },
  webServer: { command: 'npm run dev -- --host 127.0.0.1', url: 'http://127.0.0.1:4321', reuseExistingServer: true },
  projects: [{ name: 'desktop', use: { ...devices['Desktop Chrome'] } }, { name: 'mobile', use: { ...devices['Pixel 5'] } }]
});
```

- [ ] **Step 2: Capture required pages**

```ts
test('required QA screenshots', async ({ page }, testInfo) => {
  const targets = testInfo.project.name === 'mobile'
    ? [['/', 'home-mobile'], ['/members', 'members-mobile']]
    : [['/', 'home-desktop'], ['/research', 'research-desktop'], ['/publications', 'publications-desktop']];
  for (const [path, name] of targets) {
    await page.goto(path);
    await page.screenshot({ path: `artifacts/qa/${name}.png`, fullPage: true });
  }
});
```

- [ ] **Step 3: Add no-horizontal-overflow coverage at every required width**

```ts
for (const width of [1440, 1280, 1024, 768, 430, 390, 360]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('html')).toEvaluate((el) => el.scrollWidth <= el.clientWidth).toBeTruthy();
  });
}
```

- [ ] **Step 4: Execute, inspect, fix, and re-run**

Run: `npm run build && npx playwright test`

Expected: PASS with five screenshots in `artifacts/qa/`. Inspect the captures and correct any overflow, wrapping, nav, contrast, spacing, or card-height defects before running the command again.

### Task 8: Document operation and the content handoff

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write the exact operation instructions**

Include `npm install`, `npm run dev`, `npm run build`, and `npm test`, plus the local URL `http://localhost:4321`.

- [ ] **Step 2: Record the route matrix and handoff requirements**

List all nine Chinese and English routes. Explicitly request the real member list, verified publications, facility inventory/photos, lab logo, office/location/map information, and news items.

- [ ] **Step 3: Final verification**

Run: `npm run build && npm test`

Expected: both commands pass with the screenshot artifacts present.

## Plan self-review

- Spec coverage: Tasks 2–7 cover the shared design system, all 18 localized page routes, interaction requirements, verified-content policy, accessibility, reduced motion, and all required QA widths/screenshots.
- Placeholder scan: the plan contains no implementation TODO/TBD items; every unknown laboratory fact is expressly a user-facing pending panel by requirement.
- Type consistency: locale uses `zh-Hant | en`; all typed localized records use the same `Localized` interface; components consume these records without a separate competing content type.
- Repository note: the workspace has no Git repository, so task-level commits cannot be performed. Do not initialize or publish a repository without explicit user authority.
