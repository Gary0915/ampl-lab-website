# AMPL Content Upgrade and Component Architecture Design

## Objective

Upgrade the existing static AMPL website into a professor-review-ready bilingual academic site without introducing a CMS, backend, invented facts, or raw placeholder syntax.

## Architecture

All verified content and presentational pending states will move into typed bilingual modules under `src/content/`. Each module exposes a Chinese and English record rather than mixing translations inside a single UI string. Shared components consume those records so Home, About, Research, Members, Publications, Facilities, News, Join Us, and Contact present the same language, tone, and empty-state treatment.

The site remains Astro static output. There are no accounts, databases, forms that store data, or dynamic content services.

## Data Model

- `site.ts`: lab identity, navigation, affiliation, verified PI/email, locale copy, and CTA labels.
- `research.ts`: six bilingual research-area records, detailed descriptions, material-science motifs, and tags; the AMPL waste-to-applications narrative and pipeline stages.
- `pages.ts`: bilingual lab profile, philosophy, Join Us copy, contact structure, and page introductions.
- `pending.ts`: formal bilingual pending-information cards for members, alumni, publication records, facility inventory/photos, news, lab location, and lab logo.
- `facilities.ts`: five verified category-level facility areas only; no equipment names.
- `news.ts`: formal empty states for Lab News, Publications, Student Achievements, and Events without fictitious dates or articles.

## Shared Components

- `PageHero`: consistent page title, bilingual secondary identity, and academic context.
- `PendingInformationCard`: polished empty state with category, purpose, verification status, and next-information cue; never exposes `[待提供]` or `[Pending]` syntax.
- `PrincipalInvestigatorCard`: verified Prof. Shih-Chen Shi name, affiliation, email, and research-focus summary without a fabricated portrait.
- `ResearchCard`: bilingual title, two-sentence locale-specific description, tags, and a subtle materials motif.
- `SectionHeading`: repeated section hierarchy and supporting text.
- `FacilityCategoryCard`, `NewsCategoryCard`, and `PublicationPlaceholder`: intentional non-fabricated content states.

## Page Plan

- **Home:** strengthen hero and lattice, add AMPL-specific research identity, improve pipeline hierarchy, and use a selected-publications pending state.
- **About:** lab profile, PI card, research philosophy, and AMPL’s sustainable materials-to-application position.
- **Research:** six expanded areas and the full agricultural/fishery waste → nanomaterials/biocomposites → surfaces/tribology → characterization/simulation → applications pipeline.
- **Members:** PI section plus separate formal Current Members and Alumni information states.
- **Publications:** selected-publications frame, non-functional presentational filters/search surface only if it is clear no data is being filtered, and verified-record update note.
- **Facilities:** five intentional category cards with photo/equipment detail status.
- **News:** four topic-category empty states with no fabricated events.
- **Join Us:** applicant profile, research topics, developing skills, and verified contact path.
- **Contact:** structured PI, department, lab, email, and location-pending cards.
- **English:** full English source records and page copy. Chinese appears only as the lab’s intentional secondary identity.

## Visual and Interaction System

Preserve deep navy, off-white, graphite, restrained green/gold accents, sticky header, lattice visual, reveal system, card hover/focus states, smooth anchors, and reduced-motion behavior. Strengthen hierarchy with calibrated card heights, material motifs, responsive pipeline states, and a more deliberate mobile navigation layout.

## Verification

- Build and type-check successfully.
- Exercise all Chinese and English routes, locale switching, mobile navigation, and reduced-motion behavior.
- Inspect screenshots at 1440, 1024, 768, 430, 390, and 360px.
- Correct horizontal overflow, language mixing, card-height inconsistencies, raw placeholders, low contrast, unreadable mobile wrapping, and footer/nav problems before delivery.

## Content Boundaries

The remaining factual inputs needed from the laboratory are: current member and alumni records, verified publications, facility inventory/photos, laboratory logo, verified office/lab location, and news items. No other names, photos, equipment, awards, grants, or records are introduced.
