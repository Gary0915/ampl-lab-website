# AMPL Publications Experience Upgrade Design

## Purpose

Prof. Shih-Chen Shi's AMPL website should present the most recent official journal publications in a way that feels complete, credible, and readable without turning the Publications page into a long database dump. This upgrade focuses on the official NCKU faculty profile's journal publication records for calendar years 2026 and 2025 only.

This is not a site redesign. It preserves the current AMPL visual identity, information architecture, header, hero system, restrained motion language, and static Astro architecture.

## Source of Record

- Official NCKU faculty profile: `https://www.me.ncku.edu.tw/content_teacher_detail.php?teacher_rkey=Y48CKD4137`
- Source section: `期刊論文`
- Calendar-year scope for this round: 2026 and 2025
- Calendar-year interpretation for Phase 1 extraction: the official record `date` year is the primary inclusion criterion. Records with conflicting date year and citation year must be marked for review before implementation.

## Content Scope

### Include

- Journal publication records dated 2026.
- Journal publication records dated 2025.
- Officially listed bibliographic fields only:
  - year
  - date
  - title
  - authors
  - journal
  - official citation text when present
  - index/status when present, such as SCI, Q1, or EI
  - professor role when explicitly listed
  - conservative AMPL relevance tags
  - source note indicating the official NCKU faculty profile

### Exclude

- 2024 or earlier records unless explicitly approved later.
- Service records.
- Personal honors.
- Student competition honors.
- Conference attendance.
- Talks.
- Courses.
- Patents or technology transfer records.
- Projects and industry collaboration records.
- Facilities records.
- Lab product records.
- Any DOI, abstract, impact factor, citation count, photo, metric, or publication detail not explicitly listed in the official profile.

## Home Page Decision

The Home page keeps the existing `Selected Recent Publications` preview.

- Show only the newest 3 publications.
- Do not place all 2026 and 2025 records on Home.
- Do not add auto carousel behavior.
- Do not add marquee or infinite scrolling.
- Do not add fake search.
- Do not add fake filters.
- Keep the section compact so it does not compete with the hero, lattice visual, research identity, or pipeline.

## Publications Page Decision

Use a `Featured + Publication Explorer + Progressive Disclosure` model.

### Page Structure

1. `PageHero`
2. `Official Profiles`
3. `Featured Recent Publications`
   - Display 5 records.
   - Use larger, more polished publication cards.
   - Default source: the first 5 official journal publication records after the confirmed extraction list is approved.
4. `Recent Journal Publications`
   - Contain confirmed 2026 and 2025 records.
   - Use compact citation rows instead of rendering every record as a large card.
   - Provide year chips: `All`, `2026`, `2025`.
   - Provide topic chips generated from relevance tags.
   - Provide progressive disclosure with default 10 visible rows and `Show more` increasing by 10, or a clear `Show all`.
   - Optional client-side search is allowed only if it performs real filtering.
5. `Complete Records Note`
   - Explain that complete bibliographic records continue to be organized and verified using official sources.

## Designs Not Used

This round explicitly avoids:

- Rendering 28-40 publications as large cards in one continuous page.
- Putting all records inside a fixed-height scroll window.
- Auto-scrolling publications.
- Infinite marquee.
- Fake search UI.
- Fake filter UI.
- A database, CMS, backend, login, or dynamic content service.
- Large UI libraries.
- Framer Motion, GSAP, Three.js, or other major animation dependencies.
- Unverified DOI, abstracts, impact factors, citation counts, photos, counters, metrics, or outcomes.

## Publication Explorer Design

### Compact Row Fields

Each compact row should support:

- `date`
- `title`
- `authors`
- `journal`
- `indexStatus` when listed
- `professorRole` when listed
- relevance tags, maximum 3
- source note in the data model, not necessarily exposed in every row

### Desktop Behavior

- Rows must be quickly scannable.
- The title should remain readable and should not be aggressively truncated.
- Metadata should align consistently.
- Tags should not form cramped chip clusters.

### Mobile Behavior

- Rows stack cleanly.
- Metadata and tags wrap without horizontal overflow.
- 390px and 430px widths must remain readable.
- No horizontal page overflow is allowed.

### Filtering and Progressive Disclosure

- Default visible count: 10 records.
- `Show more` increases the visible count by 10.
- `Show all` is acceptable if clearer than repeated increments.
- Year and topic chips must change the displayed results.
- If filters are active, the displayed count and empty state must be clear.
- Search is optional. If implemented, it must filter title, authors, journal, and tags client-side.
- If search is not implemented, no search UI should be shown.

## Visual Style

The publications experience must remain aligned with the current AMPL design system:

- deep navy
- warm white
- muted green
- restrained gold
- academic
- calm
- credible
- readable
- material-science-oriented

The explorer should feel like a formal academic record interface, not a commercial product listing, startup dashboard, or database admin table.

## Accessibility Requirements

- Search input, if present, must have a visible or programmatic label.
- Filter chips must expose selected state.
- `Show more` and `Show all` buttons must be keyboard operable.
- Focus-visible states must be clear.
- No auto-moving content.
- No keyboard trap.
- Reduced motion should not leave unnecessary animation.
- No horizontal overflow.

## Content Integrity Rules

The site must not display:

- `[待提供]`
- `[待確認]`
- `[Pending]`
- `待提供：`
- `待確認：`

The upgrade must not add unverified:

- DOI
- abstract
- impact factor
- citation count
- photo
- numerical counter
- unconfirmed tag
- unconfirmed research outcome

## Phase 1 Extraction Notes

Phase 1 extracts and reviews data only. It does not modify website pages or publication components.

The extracted official records should be reviewed by the user before Phase 2 implementation. Records with inconsistent date year and citation year should remain excluded from the default implementation set unless the user explicitly approves inclusion.

## Phase 2 Implementation Boundary

Phase 2 may modify:

- `src/content/publications.ts`
- `src/components/SelectedPublications.astro`
- `src/components/PublicationCard.astro`
- `src/components/PublicationExplorer.astro`
- `src/components/PublicationRow.astro`
- `src/pages/index.astro`
- `src/pages/en/index.astro`
- `src/pages/[page].astro`
- `src/pages/en/[page].astro`
- `src/styles/global.css`
- `tests/routes.spec.ts`
- `tests/visual.spec.ts`

Phase 2 must wait until the Phase 1 extraction list is confirmed.
