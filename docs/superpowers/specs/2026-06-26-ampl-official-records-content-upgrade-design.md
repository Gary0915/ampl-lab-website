# AMPL Official Records Content Upgrade Design

## Objective

Upgrade the AMPL website with verified official records from Prof. Shih-Chen Shi's NCKU Mechanical Engineering faculty profile while preserving the current academic visual system. This is a content architecture and credibility upgrade, not a redesign, animation pass, faculty CV dump, or database build.

Official source:

- NCKU Department of Mechanical Engineering faculty profile for Prof. Shih-Chen Shi: `https://www.me.ncku.edu.tw/content_teacher_detail.php?teacher_rkey=Y48CKD4137`

## Source analysis

The official faculty profile contains many categories: professor profile, expertise, publications, projects, industry collaborations, patents, equipment, lab products, service records, honors, student competition honors, conferences, talks, courses, and a 91603 public instrument room notice.

This upgrade imports only content that strengthens the official AMPL laboratory website:

- First five listed recent journal publications from the `期刊論文` section.
- Directional project and collaboration themes from the `計畫與產學合作` section.
- Official equipment names from the `(A) 實驗室設備` section.
- Official lab product / material platform names from the `(B) Lab product` section.

This upgrade intentionally excludes:

- Full service records.
- Personal honors.
- Student competition honors.
- Conference attendance lists.
- Talks and course lists.
- Patent / technology transfer lists.
- Full project-title database.
- 91603 public instrument room manual and rules.
- Any claimed numbers, metrics, photos, DOI values, awards, or outcomes not explicitly used in the source sections above.

## Information architecture

### Publications

Publications become verified, readable research records rather than a pending placeholder.

Home page:

- Add a compact `Selected Recent Publications` preview.
- Show exactly three publication cards.
- No autoplay, marquee, fake filter, fake search, or infinite scroll.
- Desktop uses a calm 3-card grid.
- Mobile stacks cards naturally.
- CTA links to `/publications/`.

Publications page:

- Add `OfficialProfileLinks`.
- Add `Selected Recent Publications` grouped by year.
- Include the first five journal publications listed on the official page.
- Add a formal note that complete bibliographic records will continue to be organized and verified using official sources.
- Keep journal records clear and citation-oriented, not decorative.

Publication card fields:

- `year`
- `date`
- `title`
- `authors`
- `journal`
- `citation`
- `indexStatus`
- `professorRole`
- `tags` with one to three relevance tags

No DOI will be added because the requested five records do not require DOI import from outside the official source.

### Facilities

Facilities page becomes a formal equipment category page.

Equipment groups:

1. Simulation & Analysis
   - Abaqus
2. Thermal / Processing
   - Thermal CVD
   - High temperature RTA
   - High-temperature oven
   - Hot plate & Magnetic stirrer
   - Freeze dryer
3. Spectroscopy / Characterization
   - Raman
   - FTIR
   - Micro/nano hardness tester
4. Electrochemical / Sensing
   - Potentiostat
   - EIS
5. Lab Preparation
   - Degausser
   - Ultrasonic cleaner
   - Adjustable Applicator
   - Constant Temperature and Humidity Machine
   - Incubator

Official typo normalization:

- `Adjustable Applicat0R` becomes `Adjustable Applicator`.
- `Incubat0R` becomes `Incubator`.

The page will not use equipment photos or raw pending placeholders.

### Material Platforms / Lab Products

Official Lab product names are reframed as material platforms, not commercialized products.

Groups:

1. Biomass-derived cellulose materials
   - Cellulose
   - Cellulose nanocrystal (CNC)
   - Cellulose nanofiber (CNF)
   - Dialdehyde cellulose nanocrystal (DACNC)
   - Erythrosine-functional DACNC (Ery-DACNC)
2. Graphene-based nanomaterials
   - Graphene
   - Graphene quantum dot (GQD)
   - Carboxyl-functional GQD (CfGQD)
   - Amino-functional GQD (AfGQD)
3. Chitosan derivatives
   - Chitosan
   - Carboxylated Chitosan (CARCTS)
   - Aminated Chitosan (AMICTS)
4. Polymer composite systems
   - EVA
   - EVA-PLA
   - CNC-EVA-PLA

Placement:

- Research page: full `Material Platforms` section.
- Facilities page: equipment first, material platforms after equipment.
- Home page: no full product taxonomy; keep focus on selected publications preview.

### Projects & Collaboration

Official projects are summarized directionally instead of copied as a long grant and industry list.

Groups:

1. Public Research Projects
   - green / negative-carbon materials
   - biopolymer composites
   - sensors
   - thermoelectric materials
   - tribology and corrosion
   - functional films and coatings
2. Industry Collaboration
   - materials characterization
   - ceramic fracture modeling
   - welding process analysis
   - motor core structural and simulation analysis
   - coating and dispersion verification
3. International & Student Research
   - cellulose extraction
   - student research projects
   - materials and process exploration

Placement:

- Research page after Material Platforms, before or after Methods & Applications depending on spacing.
- The section avoids company-name emphasis, grant-number lists, budget values, and outcome claims.

## Content modules

Create or extend:

- `src/content/publications.ts`
- `src/content/projects.ts`
- `src/content/facilities.ts`
- `src/content/labProducts.ts`

All modules must support `zh-Hant` and `en` separately. English pages must not show Chinese descriptions. Chinese pages may retain official English equipment/product names where those names are the official equipment or material names.

## Components

Create or extend:

- `SelectedPublications.astro`
- `PublicationCard.astro`
- `OfficialProfileLinks.astro`
- `ProjectCollaborationSummary.astro`
- `FacilityEquipmentGroups.astro`
- `LabProducts.astro`

Existing components should be reused where they fit. Do not duplicate generic section heading or card behavior unnecessarily.

## Page changes

Home:

- Add compact selected-publications preview showing three cards and a `View publications` CTA.
- Preserve hero, lattice, research flow, and join CTA rhythm.

Research:

- Keep current research cards, capability summary, pathway, and methods/applications.
- Add Material Platforms.
- Add Projects & Collaboration Summary with conservative language.

Publications:

- Replace the pending placeholder with official profile links, five selected recent publications, and a complete-records note.

Facilities:

- Replace pending equipment state with grouped official equipment.
- Add Material Platforms after equipment.

English routes:

- Mirror the same verified facts in English.
- Keep Chinese only as secondary identity if already used by the site, not inside English descriptions.

## Visual direction

- Keep deep navy, warm white, muted green, restrained gold accents.
- Use calm academic cards and lists.
- Publications should feel readable and citable.
- Facilities should feel like research capability infrastructure.
- Material Platforms may use a slightly more active taxonomy layout while staying academic.
- Projects should feel directional and low-sensitive, not like a grant database.

## Accessibility and UX

- No autoplay or scrolling marquee.
- No fake search or fake filters.
- If any horizontal card rail is used, it must be keyboard reachable and must not cause horizontal page overflow.
- Publication titles must remain readable and not be aggressively truncated.
- All cards and links need visible focus states.
- Mobile layouts must not overflow at 430px and 390px.

## QA requirements

Run:

- `npm run build`
- `npm test`

Check:

- `/`
- `/research/`
- `/publications/`
- `/facilities/`
- `/en/research/`
- `/en/publications/`
- `/en/facilities/`

Widths:

- 1440px
- 1280px
- 1024px
- 768px
- 430px
- 390px

Required assertions:

- Home publications preview does not dominate the home page.
- Publications page reads like a curated record list, not a data dump.
- Facilities page is no longer empty or placeholder-heavy.
- Material Platforms taxonomy is clear.
- Projects summary avoids sensitive over-detail.
- Chinese pages do not mix English descriptions except official equipment/material names.
- English pages do not mix Chinese descriptions.
- No horizontal overflow.
- No raw placeholder markers:
  - `[待提供]`
  - `[待確認]`
  - `[Pending]`
  - `待提供：`
  - `待確認：`
- No fake filter, fake search, fake photos, invented DOI, or invented data.

## Deferred for professor confirmation

- Full project titles and company names as public-facing records.
- Full grant numbers.
- Complete publication database beyond the first five official recent journal records.
- Patents and technology transfer list.
- 91603 public instrument room details beyond a possible small external note.
- Any photos or equipment specifications.
