# AMPL Navigation, Editorial Layout & Motion Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct route-preserving bilingual navigation and refine affected interior pages into a calmer editorial hierarchy with restrained native cross-page motion.

**Architecture:** Keep Astro static routing and the existing content model. Add a focused locale-route utility, pass current pathname into the shared Header, consolidate About professor content in the existing profile component, add PageHero density variants, restyle the two secondary Research systems, and opt into native CSS cross-document View Transitions.

**Tech Stack:** Astro 5, TypeScript, existing component/content architecture, global CSS, Playwright.

---

## File structure

- Create `src/utils/localizedRoutes.ts`: normalize pathnames, resolve route keys, build localized paths, and generate alternate-language paths.
- Modify `src/content/site.ts`: remove Contact from `primaryRoutes` while retaining it in all routes and labels.
- Modify `src/components/Header.astro`: shared alternate-language target, active states, separate desktop Contact CTA, and mobile Contact item.
- Modify `src/layouts/BaseLayout.astro`: pass the actual pathname to Header and give `main` the stable page-content transition identity.
- Modify `src/components/PageHero.astro`: add `editorial` and `compact` density variants.
- Modify `src/components/ProfessorProfile.astro`: consolidate About identity, links, and profile details into one section.
- Modify `src/components/ResearchCapabilitySummary.astro`: add stable capability selectors while preserving all six records.
- Modify `src/components/MethodsApplications.astro`: group method information for a 34/66 editorial row layout.
- Modify `src/content/projects.ts`, `src/content/facilities.ts`, and `src/content/news.ts`: replace maintenance-oriented public copy with formal visitor-facing language.
- Modify `src/pages/[page].astro` and `src/pages/en/[page].astro`: assign Hero density, consolidate About, remove public pending cards, and render a neutral News state.
- Modify `src/styles/global.css`: navigation state, Professor layout, Hero density, compact capability matrix, editorial methods rows, motion tokens, View Transition, and responsive/reduced-motion rules.
- Modify `tests/routes.spec.ts`: behavioral, content-integrity, structure, transition, and overflow tests.
- Modify `tests/visual.spec.ts`: capture only the affected page/viewport matrix.

## Task 1: Lock navigation behavior with failing tests

**Files:**
- Modify: `tests/routes.spec.ts`

- [ ] Add table-driven tests for locale switches on `/`, `/research/`, `/publications/`, `/facilities/`, `/projects/`, `/join-us/`, `/contact/` and their English equivalents. Locate `[data-locale-switch]` and assert exact trailing-slash destinations.
- [ ] Add desktop navigation assertions that `[data-desktop-nav]` contains no Contact item, `[data-contact-cta]` exists once, and only the route-matched control exposes `aria-current="page"`.
- [ ] Add mobile assertions that opening the menu exposes Contact and the route-preserving locale switch.
- [ ] Run `npm test -- --grep "language switch|navigation active"` and confirm failures are caused by the current home-only switch and missing selectors/active state.

## Task 2: Implement centralized localized routes and navigation

**Files:**
- Create: `src/utils/localizedRoutes.ts`
- Modify: `src/content/site.ts`
- Modify: `src/components/Header.astro`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`

- [ ] Implement `normalizePathname(pathname)`, `getRouteFromPath(pathname)`, `getLocalizedPath(route, lang)`, and `getAlternateLocalePath(pathname, targetLang)` using the existing `routes` tuple. Unknown paths return the target-language home.
- [ ] Remove `contact` from `primaryRoutes`; do not remove it from `routes` or labels.
- [ ] Pass `Astro.url.pathname` from BaseLayout to Header.
- [ ] Generate all Header links with `getLocalizedPath`, and the locale switch with `getAlternateLocalePath`.
- [ ] Render desktop primary routes without Contact, render Contact as the dedicated CTA, and append Contact explicitly to mobile navigation.
- [ ] Add `aria-current="page"`, `data-nav-item`, `data-contact-cta`, `data-mobile-nav-item`, and `data-locale-switch` selectors.
- [ ] Add restrained transform-based underline and active indicator styles using the shared motion tokens.
- [ ] Run the focused navigation tests and confirm they pass.

## Task 3: Lock public copy and About consolidation with failing tests

**Files:**
- Modify: `tests/routes.spec.ts`

- [ ] Expand the public-copy scan across Chinese and English routes for `建議教授確認後`, `資料整理中`, `待提供`, `待確認`, `Pending`, `requires professor confirmation`, and `pending verification`.
- [ ] Assert Members renders one verified PI card and no pending cards.
- [ ] Assert News renders no pending card and contains one neutral public empty-state region.
- [ ] Assert About renders exactly one `[data-professor-profile]`, one professor name in that section, and visible Education, Selected Experience, and Research Expertise groups.
- [ ] Run the focused tests and confirm failures match the current pending copy and duplicate About composition.

## Task 4: Consolidate Professor profile and remove internal public copy

**Files:**
- Modify: `src/components/ProfessorProfile.astro`
- Modify: `src/content/projects.ts`
- Modify: `src/content/facilities.ts`
- Modify: `src/content/news.ts`
- Modify: `src/pages/[page].astro`
- Modify: `src/pages/en/[page].astro`
- Modify: `src/styles/global.css`

- [ ] Expand `ProfessorProfile.astro` into one `[data-professor-profile]` section with the existing SS monogram, verified professor identity, department, research overview, email, official faculty profile, personal website, and flat Education/Experience/Expertise columns.
- [ ] Remove the separate PI card and duplicate professor heading from About only. Retain the PI card on Members.
- [ ] Remove Members pending member/alumni cards and use a neutral verified-team heading.
- [ ] Replace News category/pending framework with one localized neutral empty state stating that no public updates are currently listed.
- [ ] Replace Projects source note with the approved official-source summary and remove internal approval language.
- [ ] Replace Facilities description/source note with the approved official-source summary and remove references to omitted unverified photos/specifications.
- [ ] Run the public-copy and About tests and confirm they pass.

## Task 5: Lock Hero and Research hierarchy with failing tests

**Files:**
- Modify: `tests/routes.spec.ts`

- [ ] Assert About, Research, and Facilities use `[data-hero-density="editorial"]`.
- [ ] Assert Projects, Publications, Members, News, Join Us, and Contact use `[data-hero-density="compact"]`.
- [ ] Assert Research still contains six `.research-card` elements, six `[data-capability-item]` elements, and three `[data-method-row]` elements.
- [ ] Assert the capability list and methods container expose their new structural classes without changing localized record counts.
- [ ] Run the focused tests and confirm they fail before the component variants/selectors exist.

## Task 6: Implement PageHero density and Research editorial hierarchy

**Files:**
- Modify: `src/components/PageHero.astro`
- Modify: `src/components/ResearchCapabilitySummary.astro`
- Modify: `src/components/MethodsApplications.astro`
- Modify: `src/pages/[page].astro`
- Modify: `src/pages/en/[page].astro`
- Modify: `src/styles/global.css`

- [ ] Add `density?: 'editorial' | 'compact'` to PageHero and render class/data attributes from the prop.
- [ ] Derive density from the route in each localized page file and pass it to PageHero.
- [ ] Keep six capability records, add `data-capability-item`, and restyle the list to 3 columns on desktop, 2 on tablet, and 1 on mobile with reduced height/padding and no lift/shadow.
- [ ] Replace width-changing hover with a transform-scaled top rule; change only index/top-rule color on hover/focus.
- [ ] Group each method index/title/scope in a left method block, retain applications in the right block, and add `data-method-row`.
- [ ] Restyle methods as three full-width 34/66 editorial rows with subtle separators, clean chip wrapping, and mobile stacking.
- [ ] Preserve existing Research text, six Research Areas, Pipeline, and all three Methods records.
- [ ] Run the Hero/Research tests and confirm they pass.

## Task 7: Lock and implement native View Transition behavior

**Files:**
- Modify: `tests/routes.spec.ts`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`

- [ ] Add a source-level test confirming `@view-transition`, the `page-content` transition name, old/new main animations, and a reduced-motion override exist without `ClientRouter`, third-party routers, scale, or blur.
- [ ] Run the focused test and verify it fails before the CSS opt-in exists.
- [ ] Add `class="page-transition-content"` to the shared `main` landmark.
- [ ] Add native `@view-transition { navigation: auto; }`, disable root animation, and define main-only old/new opacity/translate animations at approximately 190ms/230ms using `--ease-out-expo`.
- [ ] Add reduced-motion rules that remove translation and reduce transition duration.
- [ ] Run the transition test and the existing reduced-motion tests.

## Task 8: Responsive and visual QA

**Files:**
- Modify: `tests/routes.spec.ts`
- Modify: `tests/visual.spec.ts`

- [ ] Add overflow coverage at 1440, 1280, 1024, 768, 430, 390, and 360px for the required Chinese and English routes.
- [ ] Keep visual captures limited to About desktop/mobile, Research desktop/tablet/mobile, Projects desktop, Publications desktop, Members desktop, Contact mobile, English About, and English Research.
- [ ] Run `npm test` and inspect the generated screenshots for Header spacing, Hero density, About duplication, Research hierarchy, active navigation, mobile menu, locale links, and overflow.
- [ ] Restore or exclude unrelated screenshot changes so this round retains only purposeful QA artifacts if artifacts are committed by repository convention.

## Task 9: Final verification

**Files:**
- No additional files.

- [ ] Run `npm run build` and confirm Astro check reports zero errors, warnings, and hints and all 20 routes build.
- [ ] Run `npm test` and confirm the entire Playwright suite passes.
- [ ] Run a source scan for forbidden public-copy phrases and confirm no affected public route renders them.
- [ ] Run `git status --short` and `git diff --stat` to confirm no Home Hero, Publications Explorer/data, SEO metadata, OG image, favicon, route architecture, or unrelated assets changed.

