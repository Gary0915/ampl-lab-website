# AMPL Navigation, Editorial Layout & Motion Refinement Design

## Purpose

This round refines navigation accuracy, public-facing editorial tone, interior-page density, and restrained motion without redesigning the AMPL website. It preserves the existing content architecture, deep navy and warm-white visual identity, typography, Home hero and lattice, Publications Explorer, verified research records, SEO metadata, OG image, and favicon assets.

## Repository Audit

The implementation is based on the current `main` after PR #11.

- `Header.astro` currently derives language-switch links as `/` or `/en/`, so inner routes lose their page context.
- `primaryRoutes` currently contains `contact`, while the desktop header also renders a Contact CTA.
- Header links do not expose `aria-current="page"` or an active visual state.
- Mobile navigation is generated from the same primary list and currently contains Contact, but uses the same home-only language switch.
- Members and News render `PendingInformationCard` components with maintenance-oriented language.
- Projects and Facilities source notes include internal editorial decisions such as professor confirmation and omitted unverified assets.
- About renders `PrincipalInvestigatorCard` and a separate `ProfessorProfile`, repeating the professor identity and section heading.
- Every interior route uses the same `PageHero` spacing.
- Research Capability is a six-item card grid with lift/shadow behavior similar to the main Research Areas.
- Methods × Applications already uses three row records, but its index, method, and application columns read like another card system rather than a 35/65 editorial comparison.
- Reveal animations use `IntersectionObserver`, and global CSS already disables motion under `prefers-reduced-motion: reduce`.
- Astro 5 is installed. Native cross-document View Transitions can be enabled with CSS progressive enhancement; no Astro `ClientRouter` or third-party router is required.

No unrelated dirty files were present when the branch was created.

## Architecture

### Localized route helper

Create one small route utility that:

- normalizes trailing slashes;
- resolves a pathname to `home` or an existing `Route`;
- generates localized paths from a route key;
- returns the equivalent route in the opposite locale;
- falls back to the target-language home only when the current route cannot be resolved.

`BaseLayout` passes the actual pathname to `Header`. Desktop and mobile language switches use the same helper output.

### Navigation model

`primaryRoutes` contains About, Research, Projects, Publications, Facilities, Members, and Join Us. Contact is removed from the desktop primary list and remains a dedicated CTA. Mobile renders Home, all primary routes, and Contact explicitly.

The current route is exposed with `aria-current="page"`. Desktop primary links use a restrained underline/indicator, the Contact CTA uses a subtle active treatment on Contact, and mobile links use the same route state without a large pill or heavy background.

### Public editorial copy

Public pages show only visitor-facing language:

- Members renders the verified PI only; empty member and alumni cards are omitted.
- News renders a concise public empty state without maintenance workflow language or fabricated news.
- Projects and Facilities retain formal official-source notes, but remove internal approval and omission commentary.
- Pending content data may remain in the repository for legacy components, but it is not rendered on the public routes addressed by this round.

### Professor profile consolidation

`ProfessorProfile.astro` becomes the single About professor section. Its first tier contains the existing SS monogram, verified identity, affiliation, concise research overview, email, official faculty profile, and personal website. Its second tier presents Education, Selected Experience, and Research Expertise as flat editorial columns with dividers.

`PrincipalInvestigatorCard.astro` remains available for the Members page, where it is not duplicated by the detailed profile.

### PageHero density

`PageHero` receives a reusable `density` prop:

- `editorial`: About, Research, Facilities.
- `compact`: Projects, Publications, Members, News, Join Us, Contact.

The visual language, divider, text, and texture remain unchanged. The variant adjusts only asymmetric vertical spacing so content begins sooner on compact pages and no viewport receives excessive blank space.

### Research hierarchy

Research retains all existing content and its four sections.

- Six Research Areas remain the primary card system.
- Research Capability becomes a compact 3×2 matrix on desktop, 2 columns on tablet, and 1 column on mobile. It keeps index, title, and description but removes lift and shadow. Interaction is limited to an index color change and a transform-based top-rule extension.
- Methods × Applications becomes three full-width editorial rows. Each row uses a method block at approximately 34% and an applications block at approximately 66%, then stacks on mobile. Existing text and labels are unchanged.

### Cross-document motion

Use native CSS cross-document View Transitions:

- opt in with `@view-transition { navigation: auto; }`;
- assign a stable transition name to `main` only;
- disable the root crossfade so the Header remains visually stable;
- animate old main content over about 190ms with opacity and `translateY(-4px)`;
- animate new main content over about 230ms with opacity and `translateY(6px)`;
- use `cubic-bezier(.22, 1, .36, 1)`;
- disable translation and reduce duration under reduced motion.

Browsers without cross-document View Transition support continue normal full-page navigation.

## Motion tokens

Extend the existing root variables with a single reusable set:

- `--motion-fast: 180ms`
- `--motion-ui: 220ms`
- `--motion-section: 520ms`
- `--ease-out-expo: cubic-bezier(.22, 1, .36, 1)`

New interactions use opacity and transform. Existing Hero lattice and Research Pathway motion are not changed.

## Accessibility

- Current links expose `aria-current="page"`.
- Desktop and mobile locale links have stable selectors and route-preserving destinations.
- Contact remains reachable in both desktop CTA and mobile menu.
- Focus-visible remains explicit for active and interactive elements.
- Native navigation remains functional without JavaScript or View Transition support.
- Reduced motion disables transition movement.
- No mobile horizontal overflow is permitted.

## Test strategy

Playwright route tests cover:

- route-preserving language switches for Home, Research, Publications, Facilities, Projects, Join Us, and Contact;
- desktop Contact de-duplication and mobile Contact presence;
- active states and `aria-current` limits;
- public-copy scans for internal markers;
- one consolidated About professor section with Education, Experience, and Expertise;
- six Research Areas, six capability items, and three method rows;
- editorial/compact PageHero variants;
- View Transition and reduced-motion CSS presence;
- horizontal overflow at 1440, 1280, 1024, 768, 430, 390, and 360px.

Visual QA focuses only on affected pages and sizes. Existing unrelated screenshots are not regenerated without need.

## Scope boundaries

This round does not modify Home hero content or motion, Publications records or Explorer behavior, Facilities records, Projects research data, SEO metadata, OG image, favicon assets, routes, fonts, brand colors, navigation architecture beyond Contact de-duplication, or any backend/CMS capability. It does not add photos, fabricated members, metrics, research outcomes, dependencies, client routers, or large animation libraries.

