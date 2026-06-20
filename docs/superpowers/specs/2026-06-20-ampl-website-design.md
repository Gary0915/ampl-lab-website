# AMPL Academic Laboratory Website — Design Specification

## Purpose

Build the official bilingual website for Prof. Shih-Chen Shi's Advanced Material and Processing Lab (AMPL), Department of Mechanical Engineering, National Cheng Kung University. The site is a fast, static-first academic presence that communicates research credibility without inventing unverified content.

## Approved Direction

- Use Astro, TypeScript, and Tailwind CSS.
- Make Traditional Chinese the default locale at `/` and English available at `/en/`.
- Use equivalent pages and navigation in both locales.
- Design around an asymmetric, left-aligned hero with a right-side abstract SVG material lattice. Avoid a generic centered startup landing page.
- Use an off-white surface, deep navy, muted blue, graphite, with restrained green and muted gold accents.
- Use Noto Sans TC/system sans-serif typography for Chinese readability, with matching Latin system fallbacks.
- Use only verified supplied details: AMPL, Prof. Shih-Chen Shi, the stated affiliation, research themes, and the supplied email when shown. All other non-verified facts are explicit bilingual placeholders.

## Information Architecture

Both locales provide these static routes:

- Home
- About
- Research
- Members
- Publications
- Facilities
- News
- Join Us
- Contact

The primary navigation is sticky. On smaller screens it becomes an accessible, animated drawer controlled by an ARIA-labelled button.

## Components and Content

- `BaseLayout`: locale metadata, document structure, shared header and footer.
- `Header`: locale switcher, desktop navigation, mobile drawer, scroll-state presentation.
- `Footer`: affiliation, supplied contact detail, route links, and explicit placeholders for unverified location details.
- `HeroLattice`: an inline SVG particle network with layered material contours. It is decorative and hidden from assistive technologies.
- `ResearchCard`: research area with bilingual title, short verified-theme description, tags, and abstract line illustration.
- `Pipeline`: Waste / Biomass → Nanomaterials → Processing & Coating → Characterization / Simulation → Applications; horizontal on desktop and vertical on mobile.
- `PublicationItem`: a clearly marked pending-content item with a readable year/title/venue structure and hover affordance, never a fabricated citation.
- `PlaceholderPanel`: intentionally designed empty states for members, facilities, publications, news, and visual assets.

Locale-specific content lives in typed data modules. Pages consume data rather than embed repeated strings.

## Interaction and Motion

The experience uses CSS transitions plus a small, progressively enhanced `IntersectionObserver` scroll-reveal helper. All movement animates opacity and transform only.

- Header shifts from transparent to a lightly blurred, bordered surface after scrolling.
- Hero copy enters with a brief fade-up cascade.
- Lattice nodes and layers float slowly and independently.
- Cards lift subtly; links and CTAs move one or two pixels at most.
- Pipeline connectors animate gently as a visual guide.
- Publication rows gain an accent rule and background tint on hover/focus.
- The mobile navigation fades and translates into view.
- Anchors use smooth scroll where supported.
- `prefers-reduced-motion: reduce` disables entrance, float, connector, and menu movement while keeping all content accessible.

## Responsive and Accessibility Requirements

- Semantic landmark structure and one H1 per page.
- High contrast text, visible keyboard focus, button/link names, and ARIA for the mobile menu.
- No layout relies on a fixed viewport height.
- Desktop layout is tested at 1440, 1280, and 1024px; responsive layouts at 768, 430, 390, and 360px.
- All grids collapse predictably; no horizontal overflow is permitted.

## Validation

- Build the Astro project successfully.
- Run the production or development site locally.
- Use a browser automation workflow to capture and inspect Home desktop/mobile, Research desktop, Members mobile, and Publications desktop.
- Inspect navigation, spacing, text wrapping, focus states, card rhythm, placeholder presentation, contrast, and viewport overflow. Fix findings and re-capture when needed.

## Assumptions and Explicit Exclusions

- This release has no CMS, backend, lab photos, member list beyond the PI, equipment inventory, publication bibliography, awards, grants, office address, logo asset, or map coordinate.
- Those unknown items use bilingual placeholders and are not inferred.
- The workspace has no existing project or Git repository. Project scaffolding will be created in the workspace; a Git commit cannot be created unless a repository is initialized separately.
