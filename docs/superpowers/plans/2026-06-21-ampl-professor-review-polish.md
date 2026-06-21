# AMPL Professor-Review Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply small, verified-data professor-review polish improvements to the existing static AMPL website.

**Architecture:** Extend existing locale content modules with only user-supplied official faculty facts. Reuse the current page/component structure, add a compact Professor Profile and Methods × Applications sections, replace contact and pending presentation, and retain the existing visual system and animation behavior.

**Tech Stack:** Astro, TypeScript, CSS, Playwright.

---

### Task 1: Add professor-polish route tests

**Files:**
- Modify: `tests/routes.spec.ts`

- [ ] Add a failing Contact-page test for `7樓720室`, `10樓A06室`, `9樓908B室`, `62176`, `62159-72`, the professor website URL, and the official NCKU map URL.
- [ ] Add a failing public-page scan that rejects `[待提供]`, `[待確認]`, `[Pending]`, `待提供：`, and `待確認：` across both locale route sets.
- [ ] Run `npm.cmd test -- tests/routes.spec.ts --project=chromium` and verify the missing Contact facts or raw marker failure.

### Task 2: Add verified localized faculty and public-state content

**Files:**
- Modify: `src/content/site.ts`
- Modify: `src/content/pages.ts`
- Modify: `src/content/pending.ts`
- Modify: `src/content/research.ts`

- [ ] Add verified Chinese and English professor name, role, education, selected experience, expertise, rooms, phones, personal website, faculty profile URL, and campus-map URL records.
- [ ] Change all public pending request copy to confirmation-based public wording without internal TODO markers.
- [ ] Add localized facility status labels and verified Methods × Applications records.
- [ ] Run `npm.cmd run build` and confirm type check passes.

### Task 3: Polish shared components and page surfaces

**Files:**
- Modify: `src/components/PrincipalInvestigatorCard.astro`
- Modify: `src/components/PendingInformationCard.astro`
- Modify: `src/components/PublicationPlaceholder.astro`
- Create: `src/components/ProfessorProfile.astro`
- Create: `src/components/MethodsApplications.astro`
- Modify: `src/styles/global.css`

- [ ] Add Professor Profile cards for Education, Selected Experience, and Research Expertise.
- [ ] Add accessible external-link buttons for the faculty profile, personal website, and campus map.
- [ ] Localize facility status and remove any remaining internal-language presentation.
- [ ] Reduce desktop-only hero H1 scale and tune subtitle/CTA hover/focus without replacing the layout or lattice.
- [ ] Re-run targeted route tests and verify green.

### Task 4: Apply page-level polish

**Files:**
- Modify: `src/pages/[page].astro`
- Modify: `src/pages/en/[page].astro`

- [ ] Keep About’s existing profile, philosophy, and mission; insert the compact Professor Profile section.
- [ ] Replace Contact location pending state with verified contact cards and external map link.
- [ ] Add faculty/profile links to Publications without adding publication records.
- [ ] Add Methods × Applications after Research cards and pipeline without changing the six research areas.
- [ ] Verify English pages use English fact records and Chinese pages show 施士塵教授 plus Chinese department data.

### Task 5: Full QA and delivery checks

**Files:**
- Modify: `tests/visual.spec.ts`
- Create: `artifacts/qa/professor-polish-*.png`

- [ ] Capture Contact desktop, About desktop, Research desktop, Publications desktop, Facilities desktop, and mobile Contact.
- [ ] Verify 1440, 1024, 768, 430, 390, and 360px with no horizontal overflow and working mobile navigation.
- [ ] Run `npm.cmd run build && npm.cmd test` and require 0 type errors, 0 warnings, and 0 test failures.

## Plan self-review

- Coverage: the plan covers verified faculty facts, public-facing pending tone, localized facilities, external links, research expansion, restrained hero changes, and all requested QA.
- Content boundary: no unverified publication, equipment, photo, award, service, honor, student competition, or conference record is introduced.
- Consistency: all official data is locale-specific and all public-page raw marker checks use the same five forbidden strings.
