# AMPL Research Spacing Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Research page calmer and easier to scan with stable responsive card columns, concise bilingual summaries, and generous sectional spacing.

**Architecture:** Keep Research content in `src/content/research.ts`, preserve the existing components and routes, and add Research-scoped CSS overrides in `src/styles/global.css`. Playwright route tests assert content and overflow behavior; visual tests capture the revised page at wide desktop, tablet, and mobile sizes.

**Tech Stack:** Astro 5, TypeScript, CSS, Playwright.

---

### Task 1: Add failing Research density tests

**Files:**
- Modify: `tests/routes.spec.ts`

- [ ] **Step 1: Add a responsive card-grid assertion**

```ts
test('Research cards use a calm responsive grid and retain at most three tags', async ({ page }) => {
  for (const [width, expectedColumns] of [[1440, 3], [1280, 2], [1024, 2], [768, 2], [430, 1], [390, 1]] as const) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/research');
    const columnCount = await page.locator('.page-content .research-grid').evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length);
    expect(columnCount).toBe(expectedColumns);
    const tagCounts = await page.locator('.research-card').evaluateAll((cards) => cards.map((card) => card.querySelectorAll('.tag-list span').length));
    expect(tagCounts).toEqual([3, 3, 3, 3, 3, 3]);
  }
});
```

- [ ] **Step 2: Run the grid test before CSS changes**

Run: `npx.cmd playwright test tests/routes.spec.ts --grep "calm responsive grid" --workers=1 --reporter=line`

Expected: FAIL at 1280px because the current Research grid uses asymmetric 12-column spans.

- [ ] **Step 3: Add a concise bilingual-description assertion**

```ts
test('Research card descriptions remain concise in both locales', async ({ page }) => {
  for (const path of ['/research', '/en/research']) {
    await page.goto(path);
    const lengths = await page.locator('.research-card > p').evaluateAll((items) => items.map((item) => item.textContent?.trim().length ?? 0));
    expect(lengths).toHaveLength(6);
    expect(Math.max(...lengths)).toBeLessThan(155);
  }
});
```

- [ ] **Step 4: Run the concise-content test before text changes**

Run: `npx.cmd playwright test tests/routes.spec.ts --grep "descriptions remain concise" --workers=1 --reporter=line`

Expected: FAIL because current Research descriptions are longer than the concise limit.

### Task 2: Condense Research data without changing scientific meaning

**Files:**
- Modify: `src/content/research.ts`

- [ ] **Step 1: Replace six English card descriptions with concise equivalents**

```ts
const conciseEnglish = [
  'AMPL studies agricultural and fishery by-products as resources for lower-impact material processing.',
  'Nanostructures and biopolymers are combined to examine composition, interfaces, and composite performance.',
  'Friction, wear, corrosion, coatings, and surface modification are studied as connected interface challenges.',
  'Functional material design connects sustainable feedstocks with biomedical and environmental application contexts.',
  'Material surfaces and structures are translated into sensing responses and functional coating concepts.',
  'Molecular dynamics, stress analysis, and fluid analysis support more informed material and process decisions.',
];
```

- [ ] **Step 2: Replace the matching Chinese descriptions with concise equivalents**

```ts
const conciseChinese = [
  '探討農漁業副產物作為低環境負荷材料製程的資源起點。',
  '結合奈米結構與生物高分子，研究組成、界面與複合材料性能。',
  '從摩擦、磨耗、腐蝕到塗層與表面改質，探討介面工程挑戰。',
  '以永續材料來源連結生醫與環境應用所需的功能材料設計。',
  '將材料表面與結構設計轉化為感測響應與功能性塗層概念。',
  '結合分子動力學、應力與流體分析，支援材料及製程設計決策。',
];
```

- [ ] **Step 3: Preserve each existing three-item tag array**

Do not add claims, people, equipment, publications, or outcomes. Keep exactly three thematic tags per research area.

- [ ] **Step 4: Verify concise text**

Run: `npx.cmd playwright test tests/routes.spec.ts --grep "descriptions remain concise" --workers=1 --reporter=line`

Expected: PASS.

### Task 3: Apply Research-specific grid and spacing rules

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Add stable responsive card-grid styling**

```css
.page-content .research-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:1.65rem;margin-top:3.25rem;margin-bottom:6.5rem}.page-content .research-card,.page-content .research-card:nth-child(n){grid-column:auto;min-height:330px;padding:1.9rem}.page-content .research-card .tag-list{padding-top:1.5rem;gap:.5rem}.page-content .pipeline{margin:3.25rem 0 7rem}.page-content .methods-applications{margin-top:3.25rem;margin-bottom:5rem}@media(min-width:1440px){.page-content .research-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:1.5rem}}@media(max-width:600px){.page-content .research-grid{grid-template-columns:1fr;gap:1rem;margin-top:2.25rem;margin-bottom:4.5rem}.page-content .research-card,.page-content .research-card:nth-child(n){min-height:285px;padding:1.5rem}.page-content .pipeline{margin:2.5rem 0 4.75rem}}
```

- [ ] **Step 2: Make Methods × Applications more breathable**

```css
.methods-row{grid-template-columns:64px minmax(0,1fr) minmax(220px,.75fr);gap:2rem;padding:2.25rem 0}.methods-row p{max-width:52ch;line-height:1.75}.application-list{padding-left:2rem}.application-list ul{gap:.55rem;margin-top:.8rem}.application-list li{padding:.32rem .55rem;line-height:1.45}@media(max-width:900px){.methods-row{grid-template-columns:48px minmax(0,1fr);gap:1.25rem;padding:2rem 0}.application-list{padding:1.25rem 0 0}.application-list ul{gap:.5rem}}@media(max-width:600px){.methods-row{gap:.85rem;padding:1.7rem 0}.application-list ul{gap:.45rem}}
```

- [ ] **Step 3: Verify responsive card columns**

Run: `npx.cmd playwright test tests/routes.spec.ts --grep "calm responsive grid" --workers=1 --reporter=line`

Expected: PASS at 1440, 1280, 1024, 768, 430, and 390px.

### Task 4: Capture focused visual evidence

**Files:**
- Modify: `tests/visual.spec.ts`

- [ ] **Step 1: Add three Research capture definitions**

```ts
['/research', 'research-wide-desktop', { width: 1440, height: 1000 }],
['/research', 'research-tablet', { width: 1024, height: 1000 }],
['/research', 'research-mobile', { width: 390, height: 844 }],
```

- [ ] **Step 2: Capture the three views**

Run: `npx.cmd playwright test tests/visual.spec.ts --grep "research-wide-desktop|research-tablet|research-mobile" --workers=1 --reporter=line`

Expected: PASS and screenshots in `artifacts/qa/`.

### Task 5: Final verification

**Files:**
- Verify: `src/content/research.ts`
- Verify: `src/styles/global.css`
- Verify: `tests/routes.spec.ts`
- Verify: `tests/visual.spec.ts`

- [ ] **Step 1: Scan source for raw public placeholders**

Run: `rg -n "\\[待提供\\]|\\[待確認\\]|\\[Pending\\]|待提供：|待確認：" src`

Expected: no matches.

- [ ] **Step 2: Build the static site**

Run: `cmd.exe /d /c "set ASTRO_TELEMETRY_DISABLED=1&& npm.cmd run build"`

Expected: Astro reports `0 errors`, `0 warnings`, and 18 generated pages.

- [ ] **Step 3: Run route QA**

Run: `npx.cmd playwright test tests/routes.spec.ts --workers=1 --reporter=line`

Expected: all route tests pass.

- [ ] **Step 4: Run visual QA**

Run: `npx.cmd playwright test tests/visual.spec.ts --workers=1 --reporter=line`

Expected: all visual captures pass.

- [ ] **Step 5: Commit focused Research polish files**

```bash
git add src/content/research.ts src/styles/global.css tests/routes.spec.ts tests/visual.spec.ts artifacts/qa/research-wide-desktop.png artifacts/qa/research-tablet.png artifacts/qa/research-mobile.png docs/superpowers/specs/2026-06-21-ampl-research-spacing-polish-design.md docs/superpowers/plans/2026-06-21-ampl-research-spacing-polish.md
git commit -m "Refine Research page spacing and card rhythm"
```
