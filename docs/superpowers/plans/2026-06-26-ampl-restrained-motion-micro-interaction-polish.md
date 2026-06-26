# AMPL Restrained Motion and Micro-Interaction Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add restrained, accessible micro-interactions to AMPL’s pathway, lattice, research cards, capability cards, PageHero, and footer without redesigning the site or adding dependencies.

**Architecture:** Use existing Astro components for semantic hooks and `src/styles/global.css` for CSS-only animation states. Use one small native script inside `HeroLattice.astro` for desktop pointer parallax guarded by `prefers-reduced-motion` and viewport width.

**Tech Stack:** Astro 5, TypeScript-friendly Astro components, CSS animations, native browser APIs, Playwright.

---

### Task 1: Add motion hooks and failing checks

**Files:**
- Modify: `tests/routes.spec.ts`

- [ ] Add a route test that verifies pathway step delay hooks, focusable pathway steps, focusable research cards, and focusable capability cards.
- [ ] Add a reduced-motion test that verifies decorative pipeline animation is disabled when `prefers-reduced-motion: reduce` is emulated.

### Task 2: Refine semantic component hooks

**Files:**
- Modify: `src/components/Pipeline.astro`
- Modify: `src/components/ResearchCard.astro`
- Modify: `src/components/ResearchCapabilitySummary.astro`
- Modify: `src/components/PageHero.astro`

- [ ] Add stagger delay custom properties to pathway and capability items.
- [ ] Add keyboard focusability and aria labels to informational cards and pathway steps.
- [ ] Reuse existing `data-reveal` for PageHero.
- [ ] Do not change visible copy.

### Task 3: Refine Hero lattice motion

**Files:**
- Modify: `src/components/HeroLattice.astro`
- Modify: `src/styles/global.css`

- [ ] Add `data-lattice` to the hero lattice wrapper.
- [ ] Add a small pointer parallax script using CSS variables.
- [ ] Guard pointer parallax with reduced-motion and desktop viewport checks.
- [ ] Refine node and line motion through CSS only.

### Task 4: Add restrained CSS polish

**Files:**
- Modify: `src/styles/global.css`

- [ ] Add pathway line shimmer, sequential step entrance, and hover/focus states.
- [ ] Refine Research card hover/focus states and tag/motif transitions.
- [ ] Add capability card top-rule and number-state interactions.
- [ ] Add PageHero gradient divider and Footer underline/top rule.
- [ ] Add reduced-motion overrides for the new motion states.

### Task 5: Visual and responsive QA

**Files:**
- Modify: `tests/visual.spec.ts` if additional screenshots are needed.
- Verify: `artifacts/qa/`

- [ ] Regenerate existing screenshots through `npm test`.
- [ ] Inspect home desktop/mobile and research desktop/tablet/mobile.
- [ ] Confirm no horizontal overflow at the required widths through route tests.

### Task 6: Final verification

**Files:**
- Verify: `src/`
- Verify: `tests/`

- [ ] Scan source for raw placeholders:

```bash
rg -n "\\[待提供\\]|\\[待確認\\]|\\[Pending\\]|待提供：|待確認：" src
```

- [ ] Run static build:

```bash
cmd.exe /d /c "set ASTRO_TELEMETRY_DISABLED=1&& npm.cmd run build"
```

- [ ] Run full tests:

```bash
npm.cmd test
```
