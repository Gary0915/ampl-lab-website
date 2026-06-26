# AMPL Information Architecture Rebalance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebalance AMPL website information architecture so Research stays focused, Facilities carries material platforms, and Projects has its own conservative collaboration page.

**Architecture:** Keep the existing Astro static architecture and localized content modules. Add `projects` to the route model, reuse `ProjectCollaborationSummary`, move full Material Platforms and Projects summaries out of Research, and update tests/visual captures to cover the new architecture.

**Tech Stack:** Astro static site, TypeScript content modules, vanilla CSS, Playwright tests via existing `scripts/run-playwright.cjs`.

---

## File structure

- Modify `src/content/site.ts`: add `projects` route, localized labels, and primary navigation ordering.
- Modify `src/content/pages.ts`: add localized page hero copy for `projects`.
- Modify `src/content/projects.ts`: add CTA copy for collaboration contact.
- Modify `src/components/Header.astro`: render primary navigation without `news`, keep mobile navigation aligned, and keep News available outside primary nav if needed.
- Modify `src/components/Footer.astro`: add secondary links including News and Projects while preserving the academic footer style.
- Modify `src/pages/[page].astro`: remove `LabProducts` and `ProjectCollaborationSummary` from Research; add Projects page content and CTA.
- Modify `src/pages/en/[page].astro`: mirror the Chinese route behavior in English.
- Modify `src/styles/global.css`: add restrained CTA/footer/nav styles only if needed.
- Modify `tests/routes.spec.ts`: add behavior tests for Projects routes, Research slimming, nav order, content integrity, and responsive overflow.
- Modify `tests/visual.spec.ts`: add Projects desktop/mobile/English captures if needed.

## Task 1: Write failing IA route tests

**Files:**
- Modify: `tests/routes.spec.ts`

- [ ] **Step 1: Add tests for Projects routes and Research slimming**

Add tests that verify:

```ts
test('Information architecture rebalance adds localized Projects pages', async ({ page }) => {
  await page.goto('/projects');
  await expect(page.locator('main h1')).toHaveText('計畫與合作');
  await expect(page.locator('.project-summary-card')).toHaveCount(3);
  await expect(page.getByRole('link', { name: /聯絡資訊|聯繫討論/ })).toHaveAttribute('href', '/contact');
  await expect(page.locator('main')).not.toContainText('NSTC');
  await expect(page.locator('main')).not.toContainText('台積電');

  await page.goto('/en/projects');
  await expect(page.locator('main h1')).toHaveText('Projects & Collaboration');
  await expect(page.locator('.project-summary-card')).toHaveCount(3);
  await expect(page.getByRole('link', { name: /Contact|Discuss collaboration/i })).toHaveAttribute('href', '/en/contact');
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
  }
});
```

- [ ] **Step 2: Add tests for primary nav and overflow**

Add tests that verify Projects is in primary navigation, News is not in primary navigation, News is available in footer, and target pages have no horizontal overflow at the required widths.

- [ ] **Step 3: Run targeted tests to confirm RED**

Run:

```bash
node scripts\run-playwright.cjs tests\routes.spec.ts --grep "Information architecture rebalance" --workers=1 --reporter=line
```

Expected: fail because `/projects` does not exist and Research still contains Material Platforms / Projects summary.

## Task 2: Add route and content model support

**Files:**
- Modify: `src/content/site.ts`
- Modify: `src/content/pages.ts`
- Modify: `src/content/projects.ts`

- [ ] **Step 1: Add `projects` route and labels**

Update `routes` to include `projects` between `research` and `publications`, and labels:

```ts
'zh-Hant': { projects: '計畫合作' }
en: { projects: 'Projects' }
```

Move `news` out of primary route rendering by adding a separate `primaryRoutes` export or by filtering in `Header.astro`.

- [ ] **Step 2: Add Projects page intro copy**

Add to `pageIntro`:

```ts
projects: {
  title: '計畫與合作',
  description: '以方向性摘要呈現公共研究、產學合作與學生研究脈絡。'
}
```

and English:

```ts
projects: {
  title: 'Projects & Collaboration',
  description: 'A concise summary of public research, industry collaboration, and student research directions.'
}
```

- [ ] **Step 3: Add Projects CTA copy**

Add localized CTA copy to `projectCopy`:

```ts
ctaTitle: string;
ctaDescription: string;
ctaLabel: string;
```

## Task 3: Implement IA page changes

**Files:**
- Modify: `src/pages/[page].astro`
- Modify: `src/pages/en/[page].astro`
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Remove data-heavy sections from Research**

Remove these components from the Research conditional block in both locales:

```astro
<LabProducts lang={lang} />
<ProjectCollaborationSummary lang={lang} />
```

- [ ] **Step 2: Add Projects route rendering**

Add a `page === 'projects'` conditional block in both locale files:

```astro
{page === 'projects' && <>
  <ProjectCollaborationSummary lang={lang} />
  <div class="contact-callout project-contact-cta">
    <h2>{projectCopy[lang].ctaTitle}</h2>
    <p>{projectCopy[lang].ctaDescription}</p>
    <a class="button primary" href={lang === 'zh-Hant' ? '/contact' : '/en/contact'}>{projectCopy[lang].ctaLabel}</a>
  </div>
</>}
```

- [ ] **Step 3: Keep Facilities as official equipment + full Material Platforms**

Confirm Facilities still renders:

```astro
<FacilityEquipmentGroups lang={lang} />
<LabProducts lang={lang} />
```

- [ ] **Step 4: Update navigation and footer**

Primary nav order should include Projects and exclude News. Footer should expose News as a secondary link so the page remains discoverable.

- [ ] **Step 5: Add restrained style support**

Add styles only if needed for `.project-contact-cta` and footer link lists, using existing navy/green/gold tokens.

## Task 4: Update visual captures and run full QA

**Files:**
- Modify: `tests/visual.spec.ts`

- [ ] **Step 1: Add Projects captures**

Add:

```ts
['/projects', 'projects-desktop', { width: 1280, height: 1000 }],
['/projects', 'projects-mobile', { width: 390, height: 844 }],
['/en/projects', 'projects-english-desktop', { width: 1280, height: 1000 }],
```

- [ ] **Step 2: Run build**

Run:

```bash
npm run build
```

Expected: 0 errors and 0 warnings.

- [ ] **Step 3: Run tests**

Run:

```bash
npm test
```

Expected: all Playwright route and visual tests pass.

- [ ] **Step 4: Inspect key screenshots**

Inspect:

- `artifacts/qa/research-desktop.png`
- `artifacts/qa/projects-desktop.png`
- `artifacts/qa/projects-mobile.png`
- `artifacts/qa/facilities-desktop.png`
- `artifacts/qa/publications-desktop.png`

Confirm Research is shorter, Projects is formal and not crowded, Facilities carries Material Platforms, and mobile layouts do not overflow.

## Self-review checklist

- [ ] Research contains no `.lab-products` or `.project-summary`.
- [ ] Projects routes exist in both locales.
- [ ] Projects page uses the three conservative project groups only.
- [ ] Facilities retains equipment groups and full Material Platforms.
- [ ] Home and About do not receive new Projects or Material Platforms sections.
- [ ] Publications keeps official links, five selected publications, and complete-records note.
- [ ] News is not in primary nav but remains available in footer.
- [ ] No raw placeholders are exposed.
- [ ] Build and tests pass.
