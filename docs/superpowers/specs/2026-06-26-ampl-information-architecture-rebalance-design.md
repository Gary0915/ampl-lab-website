# AMPL Information Architecture Rebalance Design

## Purpose

This round rebalances the AMPL website information architecture after the Official Records Content Upgrade. It is not a redesign and must not remove verified official records. The goal is to move official-record taxonomy content to the pages where it belongs so the Research page remains clean, academic, and fast to understand.

## Problem

The Research page currently contains several correct but competing information layers:

- Six Research Areas
- Research Capability Summary
- Material Platforms / Lab Products
- Projects & Collaboration Summary
- Research Pathway
- Methods × Applications

This makes the Research page feel like a comprehensive records overview. Research should explain research direction, capability, workflow, methods, and application logic. Facilities should hold infrastructure and material platforms. Projects should have its own conservative collaboration page.

## Target architecture

### Research

Keep only research-body content:

- Six Research Areas
- Research Capability Summary
- Research Pathway
- Methods × Applications

Remove from Research:

- full Material Platforms section
- compact Material Platforms preview
- Material Platforms CTA
- full Projects & Collaboration card section

Do not add new data-heavy blocks to Research.

### Facilities

Facilities becomes the main page for laboratory infrastructure and material platforms:

- PageHero
- Official Equipment / 實驗室設備
- Material Platforms / 材料平台與實驗室產物
- source and verification notes

The page keeps official equipment groups and the full Material Platforms taxonomy. It does not add fake photos, unofficial equipment, extra materials, model numbers, or unverified specifications. Official typos remain normalized for public presentation, including `Applicat0R` to `Applicator` and `Incubat0R` to `Incubator`.

### Projects

Add independent pages:

- `/projects/`
- `/en/projects/`

Localized page naming:

- zh-Hant nav label: `計畫合作`
- zh-Hant page title: `計畫與合作`
- en nav label: `Projects`
- en page title: `Projects & Collaboration`

Projects page structure:

- PageHero
- Public Research Projects
- Industry Collaboration
- International & Student Research
- Collaboration CTA linking to Contact

Projects content must remain directional and low-sensitive. Do not list complete project titles, company names, grant numbers, funding, contract details, unverified outcomes, or metrics.

### Navigation

Primary navigation order:

- 關於實驗室 / About
- 研究領域 / Research
- 計畫合作 / Projects
- 出版品 / Publications
- 實驗設施 / Facilities
- 成員 / Members
- 加入我們 / Join
- 聯絡資訊 / Contact

Move News out of primary navigation to reduce density. Keep the News page available as a formal page and surface it in the footer as a secondary link.

Mobile navigation must remain keyboard accessible and must not overflow.

### Home

Keep the current home structure:

- Hero
- Research identity
- Research areas preview
- Research pathway
- Selected Recent Publications preview
- Join CTA

Do not add Material Platforms or Projects Summary to Home.

### Publications

Keep the current official records structure:

- Official profile links
- Selected Recent Publications, first five records
- Complete-records note

Do not add fake search, fake filter, carousel, marquee, DOI guessing, or a full publication database.

### About

No architecture change. Keep:

- Lab profile
- PI card
- Professor Profile
- Education
- Selected Experience
- Expertise
- Philosophy / Mission

Do not add Projects or Material Platforms to About.

## Content integrity rules

Do not add:

- fake data
- fake filters
- fake search
- fake photos
- invented DOI
- unverified metrics
- company-name promotion
- grant-number database
- complete CV dump

Do not expose raw placeholders:

- `[待提供]`
- `[待確認]`
- `[Pending]`
- `待提供：`
- `待確認：`

## Design rules

Maintain the existing AMPL visual system:

- deep navy
- warm white
- muted green
- restrained gold
- academic rhythm
- restrained motion
- hero lattice
- current page spacing style

Do not add a UI library, large animation dependency, marquee, counter, or redesign.

## QA scope

Commands:

- `npm run build`
- `npm test`

Pages:

- `/`
- `/research/`
- `/projects/`
- `/facilities/`
- `/publications/`
- `/en/research/`
- `/en/projects/`
- `/en/facilities/`
- `/en/publications/`

Widths:

- 1440px
- 1280px
- 1024px
- 768px
- 430px
- 390px

Acceptance:

1. Research page is shorter and focused.
2. Research page only covers research areas, capability, pathway, methods, and applications.
3. Facilities page carries equipment and Material Platforms.
4. Projects page carries collaboration summaries.
5. Primary navigation includes Projects and does not feel crowded.
6. Mobile navigation works without overflow.
7. Chinese pages do not mix English descriptions, except official material/equipment names.
8. English pages do not mix Chinese descriptions, except secondary identity where already intended.
9. No horizontal overflow.
10. No raw placeholders.
11. Build and tests pass.
