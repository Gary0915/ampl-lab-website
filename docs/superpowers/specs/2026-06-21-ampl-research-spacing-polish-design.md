# AMPL Research Spacing Polish Design

## Purpose

Refine the Research page so its content reads as a calm academic overview rather than a dense card catalogue. The existing navy, warm-white, muted green, gold accents, motifs, animation behavior, and route structure remain unchanged.

## Layout

- Use a two-column ResearchCard grid from 601px through 1439px.
- Use three equal columns only at `min-width: 1440px`.
- Preserve one column at `max-width: 600px`.
- Remove the asymmetric 12-column card spans on the Research page. Card height remains visually consistent through flex layout and bottom-aligned tags.
- Add deliberate vertical separation between the introductory section heading and cards, cards and the pathway heading, and the pathway and Methods × Applications heading.

## Research cards

- Keep the six established research themes, titles, motifs, and scientific meaning.
- Rewrite each Chinese and English card description as one concise sentence, with an optional short supporting sentence only where necessary.
- Keep at most three tags for each card. Tags remain content-driven and sit consistently at the bottom of every card.
- Increase desktop card padding and minimum height slightly so the two-column composition feels measured rather than compressed.

## Methods × Applications

- Keep the three existing method records and their application categories.
- Increase row padding and inter-column gap.
- Keep the method number, title, scope, and application grouping visually separated.
- Replace compact multi-line chip clusters with a clean wrapped tag row using more breathing room.
- At tablet widths, retain a readable method column with applications below it. At mobile widths, stack all row content cleanly.

## Responsive and accessibility behavior

- Check Research at 1440, 1280, 1024, 768, 430, and 390px.
- No horizontal overflow at every target width.
- Preserve keyboard focus, reduced-motion behavior, and existing semantic headings.
- Keep English descriptions fully English and Chinese descriptions fully Chinese.

## Verification

- Add route-level checks covering Research card density and horizontal overflow at all target widths.
- Run the Astro build and Playwright route and visual QA.
- Capture Research desktop, tablet, and mobile screenshots for visual review.
