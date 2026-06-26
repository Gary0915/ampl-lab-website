# AMPL Visual Refinement and Research Rhythm Polish

## Audit summary

### Current issues

- The Research page previously carried the highest density: six cards, pathway, and method rows appeared in a single linear stack with limited rhythm between sections.
- Card descriptions were long enough to make the research grid feel like a compact catalogue instead of a calm academic overview.
- The original asymmetric 12-column card spans made normal desktop widths feel compressed and uneven.
- Methods × Applications needed more row padding, cleaner chip wrapping, and clearer separation between method text and application tags.
- The site’s verified professor, contact, pending-state, and bilingual content architecture is solid and should be preserved.

### Reference-site takeaways

- ConceptCI is useful for workflow rhythm, whitespace, and step-by-step process framing. AMPL should translate that into research workflow language, not sales conversion blocks.
- Circles Conference is useful for section identity and subtle motion cues. AMPL should keep any kinetic typography extremely restrained and avoid event-site energy.
- Vardhman is useful for capability architecture and credibility framing. AMPL can use a small Research Capability Summary without adopting corporate ESG language or unverified metrics.

### Proposed AMPL-specific improvements

- Keep the existing deep navy, warm white, muted green, gold accent, lattice hero, and academic typography.
- Prioritize Research page rhythm: stable card grid, shorter descriptions, bottom-aligned tags, and larger section intervals.
- Add one concise Research Capability Summary to connect research themes into capability categories: Resource Circularity, Material Synthesis, Surface Engineering, Tribology & Corrosion, Simulation-Assisted Design, and Application Translation.
- Keep Methods × Applications breathable with more padding and clean wrapping at tablet/mobile widths.
- Defer keyword marquee because it risks adding motion noise to a professor-review academic site.

### What not to change

- Do not redesign the homepage hero or remove the material lattice visual.
- Do not change the established color system or route structure.
- Do not add fake students, equipment, publications, awards, photos, statistics, filters, or search.
- Do not turn the site into a commercial sales page, event conference site, or corporate sustainability site.

## Design objective

Refine AMPL’s visual rhythm so the site feels more spacious, scholarly, and credible while preserving the established academic materials-science identity. The Research page receives the main treatment because it carries the densest content.

## Reference interpretation

- ConceptCI → AMPL workflow and process spacing: source, synthesize/process, characterize/simulate, apply.
- Circles → restrained section identity and micro-interaction discipline, with keyword marquee deferred.
- Vardhman → capability summary architecture translated into academic research categories without corporate claims or metrics.

## Pages affected

- `/research/`
- `/en/research/`
- Shared Research content and components used by both locales.
- QA coverage for `/`, `/about/`, `/contact/`, `/research/`, and `/en/research/`.

## Pages not affected

- Homepage core layout and hero composition.
- About professor content, contact data, publications pending state, facilities pending state, and news pending state remain structurally unchanged except for global spacing rules that already apply.

## Layout changes

- Research cards use a stable academic grid:
  - `max-width: 600px`: 1 column
  - `601px–1439px`: 2 columns
  - `min-width: 1440px`: 3 columns
- Remove asymmetric Research card spans on the page-content Research grid.
- Keep card descriptions to one concise sentence, with tags capped at three and aligned at the card bottom.
- Add Research Capability Summary between research cards and pathway as a low-density 3/2/1 responsive grid.
- Increase section rhythm between cards, capability summary, pathway, and Methods × Applications.

## Motion changes

- Preserve existing scroll reveal, hover lift, CTA hover, mobile menu transition, sticky header transition, and reduced-motion behavior.
- Do not add a keyword marquee in this pass; keep it as a deferred idea.
- Capability summary uses existing reveal behavior only, with no new animation library.

## Responsive breakpoints

- Check 1440, 1280, 1024, 768, 430, and 390px.
- Research cards must remain readable at 1024 and 768.
- Mobile widths must be clean single column with no horizontal overflow.
- Capability summary should be 3 columns on wide desktop, 2 columns on tablet/normal desktop, and 1 column on mobile.

## Accessibility requirements

- Preserve semantic section headings and list structures.
- Maintain visible focus states and reduced-motion behavior.
- Avoid hover-only meaning.
- Ensure capability labels and descriptions are plain text, not icon-only affordances.

## QA plan

- Run `npm run build`.
- Run `npm test`.
- Use Playwright route tests to verify Research grid column counts, concise descriptions, capability summary content, and no horizontal overflow.
- Capture visual screenshots for desktop, tablet, and mobile Research states.
- Scan `src/` for raw public placeholders:
  - `[待提供]`
  - `[待確認]`
  - `[Pending]`
  - `待提供：`
  - `待確認：`

## Content integrity rules

- Keep Chinese and English research content separately localized.
- Do not mix Chinese research descriptions into English pages.
- Do not add unverifiable member, equipment, publication, news, award, grant, photo, metric, or logo claims.
- Pending areas must keep formal public-facing copy rather than internal TODO language.
