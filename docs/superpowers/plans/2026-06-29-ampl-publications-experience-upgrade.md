# AMPL Publications Experience Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the Publications experience so AMPL can present confirmed 2026 and 2025 official journal records without making the page feel too long or database-like.

**Architecture:** Keep the Astro static site and existing AMPL design system. Expand the publications content model, keep Home as a compact preview, and add a client-side publication explorer with real filtering and progressive disclosure on the Publications page.

**Tech Stack:** Astro, TypeScript content modules, existing CSS in `src/styles/global.css`, Playwright route and visual tests.

---

## Phase Gate

Do not begin implementation until the user confirms the Phase 1 extraction list. The default implementation set should include only confirmed 2026 and 2025 records from the official NCKU faculty profile.

Records with conflicting official date year and citation year must remain excluded or be explicitly marked as review-only until the user approves how to classify them.

## File Structure

- Modify: `src/content/publications.ts`
  - Add a full recent-publications data set for confirmed 2026 and 2025 records.
  - Keep bilingual UI copy separate from bibliographic metadata.
  - Preserve official English titles, authors, and journal names.
- Modify: `src/components/SelectedPublications.astro`
  - Keep Home preview at 3 records.
  - Keep Publications featured section at 5 records.
- Modify: `src/components/PublicationCard.astro`
  - Support the featured card style without turning all records into large cards.
- Create: `src/components/PublicationRow.astro`
  - Render compact rows for the explorer.
- Create: `src/components/PublicationExplorer.astro`
  - Render year chips, topic chips, visible count, and progressive disclosure.
  - Implement real client-side filtering if filters are displayed.
- Modify: `src/pages/[page].astro`
  - Use `PublicationExplorer` on the Chinese Publications page.
- Modify: `src/pages/en/[page].astro`
  - Use `PublicationExplorer` on the English Publications page.
- Modify: `src/pages/index.astro`
  - Only if Home preview wiring needs to point to the updated selected records.
- Modify: `src/pages/en/index.astro`
  - Only if English Home preview wiring needs to point to the updated selected records.
- Modify: `src/styles/global.css`
  - Add restrained explorer and row styling, responsive behavior, focus-visible states, and no-overflow safeguards.
- Modify: `tests/routes.spec.ts`
  - Add tests for Home count, publication filters, show more, no raw placeholders, and no overflow.
- Modify: `tests/visual.spec.ts`
  - Add or update screenshots for `/publications/` and `/en/publications/` at desktop and mobile widths.

## Task 1: Confirm and Model Publication Data

**Files:**
- Modify: `src/content/publications.ts`

- [ ] **Step 1: Add a confirmed records array**

Add a typed array named `recentJournalPublications` using only the user-approved Phase 1 records. Preserve title, authors, journal, and citation text exactly as confirmed from the official source.

Expected shape:

```ts
export interface PublicationRecord {
  year: string;
  date: string;
  title: string;
  authors: string;
  journal: string;
  citation: string;
  indexStatus?: string;
  professorRole?: Localized<string>;
  tags: Localized<string[]>;
  sourceNote?: Localized<string>;
  needsReview?: boolean;
}

export const recentJournalPublications: PublicationRecord[] = [
  {
    year: '2026',
    date: '2026/06/30',
    title: 'AI-Driven Intelligent Grinding Automation for Precision Motorcycle Camshaft Manufacturing',
    authors: 'Shih-Chen Shi*, Jun-Han Lin, Guan-Yu Chen',
    journal: 'Journal of the Chinese Society of Mechanical Engineers',
    citation: '2026, 47 (3), 221-226',
    indexStatus: 'SCI',
    professorRole: {
      'zh-Hant': '施士塵為第一作者及通訊作者。',
      en: 'Prof. Shih-Chen Shi is listed as first author and corresponding author.',
    },
    tags: {
      'zh-Hant': ['智慧製造', '製程最佳化', '工程應用'],
      en: ['Sustainable Manufacturing', 'Process Optimization', 'Engineering Applications'],
    },
    sourceNote: {
      'zh-Hant': '資料來自成大機械系官方教師頁。',
      en: 'Source: official NCKU Department of Mechanical Engineering faculty profile.',
    },
  },
];
```

- [ ] **Step 2: Keep selected records derived from the recent list**

Set Home and Featured records from the confirmed list so the newest 3 and newest 5 stay consistent:

```ts
export const selectedPublications = recentJournalPublications.slice(0, 5);
```

- [ ] **Step 3: Run a TypeScript content check**

Run:

```powershell
npm.cmd run build
```

Expected: Astro check reports 0 errors and the static build completes.

## Task 2: Add Compact Publication Rows

**Files:**
- Create: `src/components/PublicationRow.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Create the row component**

Create `PublicationRow.astro`:

```astro
---
import type { Locale } from '../content/site';
import type { PublicationRecord } from '../content/publications';

interface Props {
  publication: PublicationRecord;
  lang: Locale;
}

const { publication, lang } = Astro.props;
const tags = publication.tags[lang].slice(0, 3);
const role = publication.professorRole?.[lang];
---

<article class="publication-row" data-year={publication.year} data-tags={tags.join('|')}>
  <div class="publication-row__date">{publication.date}</div>
  <div class="publication-row__body">
    <h3>{publication.title}</h3>
    <p class="publication-row__authors">{publication.authors}</p>
    <p class="publication-row__journal">
      <span>{publication.journal}</span>
      <span>{publication.citation}</span>
      {publication.indexStatus && <span>{publication.indexStatus}</span>}
    </p>
    {role && <p class="publication-row__role">{role}</p>}
    <ul class="tag-list publication-row__tags" aria-label={lang === 'zh-Hant' ? '研究標籤' : 'Research tags'}>
      {tags.map((tag) => <li>{tag}</li>)}
    </ul>
  </div>
</article>
```

- [ ] **Step 2: Add row styles**

Add CSS that keeps rows readable and prevents overflow:

```css
.publication-row {
  display: grid;
  grid-template-columns: minmax(7.5rem, 9rem) minmax(0, 1fr);
  gap: clamp(1rem, 2vw, 1.75rem);
  padding: clamp(1.25rem, 2vw, 1.65rem) 0;
  border-top: 1px solid rgba(10, 31, 59, 0.12);
}

.publication-row__date {
  color: var(--color-green);
  font-family: var(--font-label);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.publication-row h3 {
  margin: 0;
  max-width: 68rem;
  color: var(--color-navy);
  font-size: clamp(1.05rem, 1.4vw, 1.28rem);
  line-height: 1.45;
}

.publication-row__authors,
.publication-row__journal,
.publication-row__role {
  margin: 0.55rem 0 0;
  color: var(--color-muted);
  line-height: 1.65;
}

.publication-row__journal {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem 0.75rem;
}

.publication-row__tags {
  margin-top: 0.85rem;
}

@media (max-width: 600px) {
  .publication-row {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Verify row component compiles**

Run:

```powershell
npm.cmd run build
```

Expected: build succeeds without Astro component errors.

## Task 3: Add Publication Explorer

**Files:**
- Create: `src/components/PublicationExplorer.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Create the explorer component**

Create `PublicationExplorer.astro` with real year/topic filtering and progressive disclosure:

```astro
---
import PublicationRow from './PublicationRow.astro';
import SectionHeading from './SectionHeading.astro';
import type { Locale } from '../content/site';
import type { PublicationRecord } from '../content/publications';

interface Props {
  lang: Locale;
  publications: PublicationRecord[];
}

const { lang, publications } = Astro.props;
const copy = {
  'zh-Hant': {
    eyebrow: 'Recent Journal Publications',
    title: '近兩年期刊論文',
    description: '依官方教師頁整理 2026 與 2025 期刊論文，使用精簡列式呈現以維持閱讀節奏。',
    all: '全部',
    showMore: '顯示更多',
    showAll: '顯示全部',
    noResults: '目前沒有符合條件的論文紀錄。',
  },
  en: {
    eyebrow: 'Recent Journal Publications',
    title: 'Recent Journal Publications',
    description: 'Official 2026 and 2025 journal records are presented as compact citation rows for easier scanning.',
    all: 'All',
    showMore: 'Show more',
    showAll: 'Show all',
    noResults: 'No publication records match the selected filters.',
  },
}[lang];

const years = Array.from(new Set(publications.map((publication) => publication.year))).sort((a, b) => Number(b) - Number(a));
const topics = Array.from(new Set(publications.flatMap((publication) => publication.tags[lang]))).sort();
const initialCount = 10;
---

<section class="publication-explorer" data-publication-explorer data-initial-count={initialCount}>
  <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

  <div class="publication-explorer__filters" aria-label={lang === 'zh-Hant' ? '論文篩選' : 'Publication filters'}>
    <div class="chip-group" data-filter-group="year">
      <button class="filter-chip is-active" type="button" data-filter-value="all" aria-pressed="true">{copy.all}</button>
      {years.map((year) => (
        <button class="filter-chip" type="button" data-filter-value={year} aria-pressed="false">{year}</button>
      ))}
    </div>
    <div class="chip-group" data-filter-group="topic">
      <button class="filter-chip is-active" type="button" data-filter-value="all" aria-pressed="true">{copy.all}</button>
      {topics.map((topic) => (
        <button class="filter-chip" type="button" data-filter-value={topic} aria-pressed="false">{topic}</button>
      ))}
    </div>
  </div>

  <div class="publication-explorer__list" data-publication-list>
    {publications.map((publication, index) => (
      <div data-publication-item data-index={index} data-year={publication.year} data-topics={publication.tags[lang].join('|')}>
        <PublicationRow publication={publication} lang={lang} />
      </div>
    ))}
  </div>

  <p class="publication-explorer__empty" data-publication-empty hidden>{copy.noResults}</p>

  <div class="publication-explorer__actions">
    <button class="button secondary" type="button" data-show-more>{copy.showMore}</button>
    <button class="button ghost" type="button" data-show-all>{copy.showAll}</button>
  </div>
</section>

<script>
  document.querySelectorAll('[data-publication-explorer]').forEach((explorer) => {
    const initialCount = Number(explorer.getAttribute('data-initial-count') || '10');
    const items = Array.from(explorer.querySelectorAll('[data-publication-item]'));
    const showMore = explorer.querySelector('[data-show-more]');
    const showAll = explorer.querySelector('[data-show-all]');
    const empty = explorer.querySelector('[data-publication-empty]');
    let visibleCount = initialCount;
    let activeYear = 'all';
    let activeTopic = 'all';

    const update = () => {
      const filtered = items.filter((item) => {
        const yearMatches = activeYear === 'all' || item.getAttribute('data-year') === activeYear;
        const topics = (item.getAttribute('data-topics') || '').split('|');
        const topicMatches = activeTopic === 'all' || topics.includes(activeTopic);
        return yearMatches && topicMatches;
      });

      items.forEach((item) => {
        item.hidden = true;
      });

      filtered.slice(0, visibleCount).forEach((item) => {
        item.hidden = false;
      });

      if (empty) empty.hidden = filtered.length > 0;
      if (showMore) showMore.hidden = visibleCount >= filtered.length;
      if (showAll) showAll.hidden = visibleCount >= filtered.length;
    };

    explorer.querySelectorAll('[data-filter-group]').forEach((group) => {
      group.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLButtonElement)) return;
        const value = target.getAttribute('data-filter-value') || 'all';
        const type = group.getAttribute('data-filter-group');

        group.querySelectorAll('button').forEach((button) => {
          button.classList.toggle('is-active', button === target);
          button.setAttribute('aria-pressed', button === target ? 'true' : 'false');
        });

        if (type === 'year') activeYear = value;
        if (type === 'topic') activeTopic = value;
        visibleCount = initialCount;
        update();
      });
    });

    showMore?.addEventListener('click', () => {
      visibleCount += 10;
      update();
    });

    showAll?.addEventListener('click', () => {
      visibleCount = items.length;
      update();
    });

    update();
  });
</script>
```

- [ ] **Step 2: Add explorer styles**

Add compact, academic styles:

```css
.publication-explorer {
  margin-top: clamp(4rem, 7vw, 6.5rem);
}

.publication-explorer__filters {
  display: grid;
  gap: 1rem;
  margin: clamp(1.75rem, 3vw, 2.5rem) 0;
}

.chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.filter-chip {
  border: 1px solid rgba(10, 31, 59, 0.16);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: var(--color-navy);
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  padding: 0.55rem 0.85rem;
}

.filter-chip:hover,
.filter-chip:focus-visible,
.filter-chip.is-active {
  border-color: rgba(43, 123, 83, 0.48);
  background: rgba(43, 123, 83, 0.1);
}

.publication-explorer__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 1.75rem;
}

.publication-explorer__empty {
  border: 1px solid rgba(10, 31, 59, 0.12);
  background: rgba(255, 255, 255, 0.62);
  color: var(--color-muted);
  padding: 1.25rem;
}
```

- [ ] **Step 3: Verify filtering is not fake UI**

Run the app locally:

```powershell
npm.cmd run dev -- --host 127.0.0.1
```

Open `/publications/`, click year and topic chips, and confirm visible rows change.

## Task 4: Wire Publications Pages

**Files:**
- Modify: `src/pages/[page].astro`
- Modify: `src/pages/en/[page].astro`
- Modify: `src/components/SelectedPublications.astro`

- [ ] **Step 1: Import `PublicationExplorer` and full records**

In both route files, import:

```ts
import PublicationExplorer from '../components/PublicationExplorer.astro';
import { recentJournalPublications } from '../content/publications';
```

Use the correct relative path in `src/pages/en/[page].astro`:

```ts
import PublicationExplorer from '../../components/PublicationExplorer.astro';
import { recentJournalPublications } from '../../content/publications';
```

- [ ] **Step 2: Render explorer only on Publications pages**

After the featured selected publications section, render:

```astro
{page.id === 'publications' && (
  <PublicationExplorer lang={lang} publications={recentJournalPublications} />
)}
```

- [ ] **Step 3: Keep Home preview compact**

Confirm `SelectedPublications` still uses:

```ts
const records = variant === 'preview' ? selectedPublications.slice(0, 3) : selectedPublications;
```

Expected: Home displays 3 records; Publications featured displays 5 records.

## Task 5: Add Route and Interaction Tests

**Files:**
- Modify: `tests/routes.spec.ts`

- [ ] **Step 1: Test Home preview count**

Add a test that verifies Home does not show more than 3 preview cards:

```ts
test('Home keeps selected publications preview compact', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.selected-publications--preview .publication-card')).toHaveCount(3);
});
```

- [ ] **Step 2: Test Publications explorer default count and show more**

Add:

```ts
test('Publications explorer uses progressive disclosure', async ({ page }) => {
  await page.goto('/publications/');
  await expect(page.locator('[data-publication-item]:visible')).toHaveCount(10);
  await page.locator('[data-show-more]').click();
  await expect(page.locator('[data-publication-item]:visible')).toHaveCount(20);
});
```

- [ ] **Step 3: Test filters are real**

Add:

```ts
test('Publication year filter changes visible records', async ({ page }) => {
  await page.goto('/publications/');
  await page.locator('[data-filter-group="year"] button[data-filter-value="2025"]').click();
  const visibleRows = page.locator('[data-publication-item]:visible');
  await expect(visibleRows.first()).toHaveAttribute('data-year', '2025');
  await expect(page.locator('[data-filter-group="year"] button[data-filter-value="2025"]')).toHaveAttribute('aria-pressed', 'true');
});
```

- [ ] **Step 4: Test no raw placeholders**

Extend the existing placeholder scan to cover `/publications/` and `/en/publications/`.

Expected: no `[待提供]`, `[待確認]`, `[Pending]`, `待提供：`, or `待確認：`.

## Task 6: Add Visual QA

**Files:**
- Modify: `tests/visual.spec.ts`

- [ ] **Step 1: Capture publications desktop and mobile**

Ensure the matrix includes:

```ts
{ name: 'publications-desktop', path: '/publications/', width: 1440, height: 1600 },
{ name: 'publications-mobile', path: '/publications/', width: 390, height: 1600 },
{ name: 'publications-english-desktop', path: '/en/publications/', width: 1440, height: 1600 },
```

- [ ] **Step 2: Run visual captures**

Run:

```powershell
npm.cmd test
```

Expected: all Playwright tests pass and screenshots show no horizontal overflow or cramped rows.

## Task 7: Final Verification

**Files:**
- No new files beyond implementation scope.

- [ ] **Step 1: Build**

Run:

```powershell
npm.cmd run build
```

Expected:

```text
Result (... files):
- 0 errors
- 0 warnings
- 0 hints
```

- [ ] **Step 2: Test**

Run:

```powershell
npm.cmd test
```

Expected: all tests pass.

- [ ] **Step 3: Manual responsive QA**

Check:

- `/`
- `/publications/`
- `/en/publications/`

At:

- 1440px
- 1280px
- 1024px
- 768px
- 430px
- 390px

Confirm:

- Home still shows 3 publications.
- Publications page has clear Featured and Explorer hierarchy.
- Explorer rows are readable and compact.
- Year/topic chips change results.
- Show more works.
- No search UI appears unless real search has been implemented.
- No horizontal overflow.
- No raw placeholders.
- Chinese and English pages do not mix UI languages.
