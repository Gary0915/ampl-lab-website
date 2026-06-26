# AMPL Visual Refinement and Research Rhythm Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine AMPL’s Research page rhythm and add a restrained capability summary while preserving the existing academic visual identity.

**Architecture:** Keep verified bilingual research content in `src/content/research.ts`, create one focused `ResearchCapabilitySummary` component, and render it only on Chinese and English Research routes. CSS remains in the existing global stylesheet and uses scoped class names to avoid redesigning other pages.

**Tech Stack:** Astro 5, TypeScript, CSS, Playwright.

---

### Task 1: Add localized capability data

**Files:**
- Modify: `src/content/research.ts`

- [ ] Add a `researchCapabilities` export with six localized categories.
- [ ] Keep descriptions factual, abstract, and free of unverified outcomes or metrics.
- [ ] Verify each category has English and Traditional Chinese content.

### Task 2: Create capability summary component

**Files:**
- Create: `src/components/ResearchCapabilitySummary.astro`

- [ ] Import `researchCapabilities` and `Locale`.
- [ ] Render a semantic list with six items.
- [ ] Use existing `data-reveal` behavior only.
- [ ] Keep labels and descriptions visible as text.

### Task 3: Render capability summary on Research routes

**Files:**
- Modify: `src/pages/[page].astro`
- Modify: `src/pages/en/[page].astro`

- [ ] Import `ResearchCapabilitySummary`.
- [ ] Place it after Research cards and before the pathway.
- [ ] Add localized `SectionHeading` copy.
- [ ] Do not change other routes.

### Task 4: Add restrained layout styling

**Files:**
- Modify: `src/styles/global.css`

- [ ] Add a breathable `.capability-summary` grid.
- [ ] Use 3 columns at wide desktop, 2 columns at tablet/normal desktop, and 1 column at mobile.
- [ ] Increase spacing around the summary without making the page feel empty.
- [ ] Preserve reduced-motion behavior and existing hover/focus patterns.

### Task 5: Extend route and visual QA

**Files:**
- Modify: `tests/routes.spec.ts`
- Modify: `tests/visual.spec.ts`

- [ ] Add a route test that verifies six capability items on `/research` and `/en/research`.
- [ ] Add overflow checks for Research at 1440, 1280, 1024, 768, 430, and 390px.
- [ ] Keep screenshot coverage for Research desktop, tablet, and mobile.

### Task 6: Final verification

**Files:**
- Verify: `src/`
- Verify: `tests/`
- Verify: `artifacts/qa/`

- [ ] Run placeholder scan:

```bash
rg -n "\\[待提供\\]|\\[待確認\\]|\\[Pending\\]|待提供：|待確認：" src
```

- [ ] Run static build:

```bash
cmd.exe /d /c "set ASTRO_TELEMETRY_DISABLED=1&& npm.cmd run build"
```

- [ ] Run full QA:

```bash
npm.cmd test
```

- [ ] Inspect generated Research screenshots at desktop, tablet, and mobile sizes.
