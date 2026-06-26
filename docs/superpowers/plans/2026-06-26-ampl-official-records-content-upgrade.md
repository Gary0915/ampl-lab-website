# AMPL Official Records Content Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add verified publications, equipment, material platforms, and conservative project/collaboration summaries from the official NCKU faculty profile to the static AMPL website.

**Architecture:** Keep the Astro static site and existing visual system. Add bilingual content modules under `src/content/`, introduce focused presentation components, then wire them into Home, Research, Publications, and Facilities without adding backend features, fake filters, auto marquees, photos, DOI guessing, or unverified records.

**Tech Stack:** Astro 5, TypeScript content modules, existing global CSS, Playwright route and visual tests.

---

### Task 1: Add official-record route tests first

**Files:**
- Modify: `tests/routes.spec.ts`

- [ ] Add a test for `/publications` and `/en/publications` asserting:
  - five publication cards exist on each page;
  - no fake search/filter controls are visible;
  - the official profile links exist;
  - the first record contains `Laser Sintering of Ceramic Coatings on 304 Stainless Steel`.

- [ ] Add a test for `/facilities` and `/en/facilities` asserting:
  - grouped equipment sections exist;
  - `Abaqus`, `Thermal CVD`, `Raman`, `Potentiostat`, and `Incubator` are visible;
  - typo forms `Applicat0R` and `Incubat0R` are absent.

- [ ] Add a test for `/research` and `/en/research` asserting:
  - Material Platforms section exists;
  - Projects & Collaboration Summary exists;
  - no company-name-heavy project list or grant-number dump is exposed.

- [ ] Extend responsive overflow coverage to `/publications`, `/facilities`, `/en/publications`, and `/en/facilities` at 1440, 1280, 1024, 768, 430, and 390px.

### Task 2: Create publication content module

**Files:**
- Create: `src/content/publications.ts`

- [ ] Define `PublicationRecord`, `OfficialProfileLink`, and localized copy types.

- [ ] Add the first five official journal records only:
  1. `Laser Sintering of Ceramic Coatings on 304 Stainless Steel: Effects of Energy Input on Microstructure, Hardness, and Wear`
  2. `AI-enabled Welding Defect Detection and Resistivity Validation for Sustainable Manufacturing`
  3. `Bio-based Multi-filler Poly(methyl methacrylate) Composites for Sustainable UV-protective and Low-loss Microwave Sensor Applications`
  4. `Ni–Fe Layered Double Hydroxide @ Nickel Foam Electrode with Electrochemical Impedance Spectroscopy-based Performance Monitoring for Efficient Water Splitting`
  5. `Functionalized porous PVA/SiO₂ composite films for multi-gas adsorption and selective SO₂ and HCHO sensing`

- [ ] Store full authors, date, year, journal, citation text, SCI status, professor role, and one to three relevance tags.

- [ ] Add localized section copy:
  - Home preview title and CTA.
  - Publications page title, introduction, complete-records note.
  - Official profile link labels.

### Task 3: Expand facilities content module

**Files:**
- Modify: `src/content/facilities.ts`

- [ ] Keep existing `facilityCategories` export for compatibility if still used.

- [ ] Add `equipmentGroups` localized data with five groups:
  - Simulation & Analysis
  - Thermal / Processing
  - Spectroscopy / Characterization
  - Electrochemical / Sensing
  - Lab Preparation

- [ ] Use normalized names:
  - `Adjustable Applicator`
  - `Incubator`

- [ ] Add localized Facilities section copy that explains equipment is listed from the official faculty profile and no photos/specifications are added.

### Task 4: Create lab products content module

**Files:**
- Create: `src/content/labProducts.ts`

- [ ] Define four material platform groups:
  - Biomass-derived cellulose materials
  - Graphene-based nanomaterials
  - Chitosan derivatives
  - Polymer composite systems

- [ ] Add localized group descriptions without commercial claims.

- [ ] Use exact official material names, with `Ery-DACNC` shortened label and full name available in text.

### Task 5: Create project/collaboration content module

**Files:**
- Create: `src/content/projects.ts`

- [ ] Define three summary groups:
  - Public Research Projects
  - Industry Collaboration
  - International & Student Research

- [ ] Add theme bullets only, not complete project titles.

- [ ] Add a short source note that detailed project titles and company references require professor confirmation before public expansion.

### Task 6: Create official profile links component

**Files:**
- Create: `src/components/OfficialProfileLinks.astro`

- [ ] Render two external links:
  - Official NCKU Faculty Profile
  - Professor Website

- [ ] Use localized labels from `publications.ts` or `site.ts`.

- [ ] Preserve focus-visible and external-link styling.

### Task 7: Create publication card and selected publications components

**Files:**
- Create: `src/components/PublicationCard.astro`
- Create: `src/components/SelectedPublications.astro`

- [ ] `PublicationCard` renders year/date, title, authors, journal/citation, SCI/status, professor role, and tags.

- [ ] `SelectedPublications` supports:
  - `variant="preview"` for Home with first three cards and CTA;
  - `variant="full"` for Publications page with five records grouped by year.

- [ ] Do not add search, filters, auto-scroll, or marquee.

### Task 8: Create equipment and material platform components

**Files:**
- Create: `src/components/FacilityEquipmentGroups.astro`
- Create: `src/components/LabProducts.astro`

- [ ] `FacilityEquipmentGroups` renders equipment category cards with grouped lists.

- [ ] `LabProducts` renders material platform taxonomy cards with official names and neutral descriptions.

- [ ] Both components use existing visual language: white cards, soft borders, deep navy headings, muted green and gold accents.

### Task 9: Create projects summary component

**Files:**
- Create: `src/components/ProjectCollaborationSummary.astro`

- [ ] Render three summary cards from `projects.ts`.

- [ ] Include a restrained note about detailed project names and industry references requiring confirmation before expansion.

- [ ] Avoid company-logo, metric, grant-number, or long-title presentation.

### Task 10: Wire components into Home

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/en/index.astro`

- [ ] Import `SelectedPublications`.

- [ ] Add the compact preview after research pathway / research identity and before Join CTA, keeping the home page calm.

- [ ] Show exactly three publication cards.

### Task 11: Wire components into Publications page

**Files:**
- Modify: `src/pages/[page].astro`
- Modify: `src/pages/en/[page].astro`

- [ ] Replace `PublicationPlaceholder` on `page === 'publications'` with:
  - `OfficialProfileLinks`
  - `SelectedPublications variant="full"`
  - complete-records note

- [ ] Remove pending publication card from the public Publications page.

### Task 12: Wire components into Facilities page

**Files:**
- Modify: `src/pages/[page].astro`
- Modify: `src/pages/en/[page].astro`

- [ ] Replace public Facilities pending card with:
  - `FacilityEquipmentGroups`
  - `LabProducts`

- [ ] Keep existing capability categories only if they do not make the page feel redundant; otherwise use equipment groups as the primary Facilities content.

### Task 13: Wire components into Research page

**Files:**
- Modify: `src/pages/[page].astro`
- Modify: `src/pages/en/[page].astro`

- [ ] Add `LabProducts` as `Material Platforms` after the research capability summary.

- [ ] Add `ProjectCollaborationSummary` after Material Platforms and before Methods & Applications unless visual spacing is better after Methods & Applications.

- [ ] Preserve existing six research cards, pathway, capability summary, and Methods × Applications layout.

### Task 14: Add CSS for new sections

**Files:**
- Modify: `src/styles/global.css`

- [ ] Add styles for:
  - publication preview grid;
  - year-grouped publication list;
  - official profile links;
  - equipment group cards;
  - material platform taxonomy;
  - project collaboration summary.

- [ ] Ensure mobile layouts are one column, no page-level horizontal overflow, and publication titles are not aggressively truncated.

### Task 15: Regenerate visual QA screenshots

**Files:**
- Modify: `tests/visual.spec.ts` if screenshot coverage needs new names.
- Verify: `artifacts/qa/`

- [ ] Ensure screenshots cover:
  - home desktop/mobile;
  - research desktop/mobile;
  - publications desktop/mobile;
  - facilities desktop/mobile;
  - English research/publications/facilities where practical.

### Task 16: Final verification

**Files:**
- Verify: `src/`
- Verify: `tests/`
- Verify: `artifacts/qa/`

- [ ] Scan source for raw placeholders:

```bash
rg -n "\[待提供\]|\[待確認\]|\[Pending\]|待提供：|待確認：" src
```

- [ ] Run build:

```bash
cmd.exe /d /c "set ASTRO_TELEMETRY_DISABLED=1&& npm.cmd run build"
```

- [ ] Run tests:

```bash
npm.cmd test
```

- [ ] Inspect screenshots for:
  - Home publications preview rhythm;
  - readable Publications page;
  - non-placeholder Facilities page;
  - clear Lab Products taxonomy;
  - conservative Projects summary;
  - no horizontal overflow.
