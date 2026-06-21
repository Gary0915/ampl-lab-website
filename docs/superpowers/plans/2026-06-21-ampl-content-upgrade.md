# AMPL Content Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the static AMPL site into a bilingual, professor-review-ready academic website with reusable content models and non-fabricated pending states.

**Architecture:** Replace the existing mixed `src/content.ts` with typed locale-specific content modules. Refactor pages around shared hero, heading, PI, research, facility, news, publication, and pending-information components. Preserve Astro static output and the existing motion system, then verify routes and viewport layout with Playwright.

**Tech Stack:** Astro, TypeScript, CSS, Playwright.

---

### Task 1: Add content-model route tests

**Files:**
- Modify: `tests/routes.spec.ts`

- [ ] Add a failing test that asserts `/en/research` contains English research titles and does not include the Chinese card title `綠色合成與循環經濟`.
- [ ] Add a failing test that asserts `/members`, `/publications`, `/facilities`, and `/news` contain no bracketed raw placeholders.
- [ ] Run `npm.cmd test -- tests/routes.spec.ts --project=chromium`; confirm red failures before implementation.

### Task 2: Create typed bilingual content modules

**Files:**
- Create: `src/content/site.ts`
- Create: `src/content/research.ts`
- Create: `src/content/pages.ts`
- Create: `src/content/pending.ts`
- Create: `src/content/facilities.ts`
- Create: `src/content/news.ts`
- Remove: `src/content.ts`

- [ ] Define `Locale`, `LocalizedString`, shared lab identity, routes, and locale navigation in `site.ts`.
- [ ] Define six locale-specific research records in `research.ts`, covering verified agricultural/fishery waste reuse, rice-straw cellulose/lignin/silicon/trace metals, chitosan, nanomaterials, biopolymer composites, surfaces, tribology, biomedical/environmental/sensing applications, and simulation-assisted optimization.
- [ ] Define page copy and formal pending-card records in separate modules without square-bracket marker strings.
- [ ] Define only facility category records; do not add equipment names or photos.
- [ ] Run `npm.cmd run build`; confirm type check passes.

### Task 3: Build shared academic presentation components

**Files:**
- Create: `src/components/PageHero.astro`
- Create: `src/components/SectionHeading.astro`
- Create: `src/components/PendingInformationCard.astro`
- Create: `src/components/PrincipalInvestigatorCard.astro`
- Create: `src/components/FacilityCategoryCard.astro`
- Create: `src/components/NewsCategoryCard.astro`
- Create: `src/components/PublicationPlaceholder.astro`
- Modify: `src/components/ResearchCard.astro`
- Modify: `src/styles/global.css`

- [ ] Render `ResearchCard` from the chosen locale, with two-sentence description, tags, and material motif.
- [ ] Render `PendingInformationCard` with status label, title, description, and information-request cue instead of raw placeholders.
- [ ] Render the PI card with only verified name, affiliation, email, and themes, without a portrait.
- [ ] Add keyboard-visible focus, card hover lift, responsive equal-height grid behavior, and reduced-motion-safe transitions.
- [ ] Re-run the failing route tests; confirm green.

### Task 4: Refactor Chinese pages around shared data and components

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/[page].astro`
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/components/Pipeline.astro`

- [ ] Render Home’s AMPL-specific narrative and five-stage waste-to-applications pipeline.
- [ ] Render About with profile, PI, philosophy, and mission.
- [ ] Render Members, Publications, Facilities, and News with dedicated formal states and cards.
- [ ] Render Join Us and Contact with verified academic guidance and contact data.
- [ ] Confirm every Chinese route supplies one visible `main h1` and no raw pending brackets.

### Task 5: Refactor English routes from English-only source records

**Files:**
- Modify: `src/pages/en/index.astro`
- Modify: `src/pages/en/[page].astro`
- Modify: `tests/routes.spec.ts`

- [ ] Render the English home research grid from `research.en`, preserving Chinese only as the lab-name secondary identity.
- [ ] Render each English subpage from English content records and matching shared components.
- [ ] Add English route test coverage for page headings and language consistency.
- [ ] Run `npm.cmd test -- tests/routes.spec.ts --project=chromium`; confirm all route tests pass.

### Task 6: Visual QA, responsive corrections, and delivery validation

**Files:**
- Modify: `tests/visual.spec.ts`
- Modify: `tests/routes.spec.ts`
- Create: `artifacts/qa/content-upgrade-*.png`

- [ ] Capture Home desktop/mobile, Research English desktop, Members mobile, Publications desktop, Facilities desktop, and News mobile.
- [ ] Assert no horizontal overflow at 1440, 1024, 768, 430, 390, and 360px.
- [ ] Inspect capture output and correct any mixed-language strings, empty raw states, nav/footer defects, low contrast, card-height issues, or mobile overlap.
- [ ] Run `npm.cmd run build && npm.cmd test`; require zero test failures before delivery.

## Plan self-review

- Coverage: Tasks 1–6 cover all requested data modules, shared components, Chinese and English routes, static-architecture boundary, verified-content policy, animations, and required visual QA.
- Placeholder scan: no raw square-bracket placeholder is introduced; pending data is represented by a named component and records.
- Consistency: locale data is read through `Locale` and shared components consume the same record shapes across pages.
