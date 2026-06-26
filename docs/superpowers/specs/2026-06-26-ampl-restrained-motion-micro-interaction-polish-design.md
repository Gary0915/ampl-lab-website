# AMPL Restrained Motion and Micro-Interaction Polish Design

## Design objective

Add a very restrained layer of motion to make AMPL feel more alive as a materials research website while preserving an academic, calm, credible, and refined character. This is a micro-interaction pass, not a redesign and not a new animation system.

## Motion principles

- Motion should suggest material microstructure, process flow, and research rhythm.
- Motion must be slow, subtle, and low contrast.
- Motion must not distract from reading or make the site feel like a startup, event site, or sales page.
- All nonessential motion must stop or reduce to instant states under `prefers-reduced-motion`.
- No GSAP, Framer Motion, Three.js, counters, keyword marquee, glassmorphism, fake filters, or new dependencies.

## Priority implementation

### 1. Research pathway flow animation

- Add sequential step reveal on pathway items using 60–90ms delays.
- Add a very faint moving gradient on each pathway line.
- Add hover and keyboard focus states that slightly brighten the active step line and arrow.
- Keep arrows calm; no blinking or rapid movement.
- Preserve the current pathway content and layout.

### 2. Hero lattice microstructure refinement

- Preserve the existing SVG lattice.
- Refine node motion into a slow, tiny breathing effect.
- Add very slight line opacity modulation.
- Add desktop-only pointer parallax using CSS custom properties and a small native script.
- Keep mobile static or nearly static; no parallax below tablet/desktop widths.

### 3. Research card hover/focus polish

- Make hover/focus lift softer and shorter.
- Add a subtle top-line/motif highlight.
- Slightly deepen tag backgrounds on hover/focus.
- Make informational cards keyboard-focusable so focus-visible has the same design quality as hover.
- Under reduced motion, remove displacement and keep color/outline state only.

### 4. Research Capability Summary interaction

- Keep the capability cards text-only; no icons and no metrics.
- Add staggered reveal delays.
- On hover/focus, shift the number toward gold and subtly strengthen the top rule.
- Keep the cards academic rather than corporate.

### 5. PageHero and Footer minor polish

- Add a subtle fade-up entrance to PageHero content by reusing the existing reveal system.
- Replace the hard PageHero divider with a faint left-to-right gradient rule.
- Add a restrained Footer top rule.
- Add a small footer link underline motion.
- Do not change footer layout.

## Accessibility requirements

- Maintain visible focus states.
- Do not rely on hover-only meaning.
- Keep focusable card states clear and restrained.
- Respect `prefers-reduced-motion` globally.
- Ensure mobile layouts remain stable and do not introduce horizontal overflow.

## Content integrity rules

- Do not add or imply new research achievements, students, equipment, publications, images, awards, metrics, or project claims.
- Do not change verified professor or contact content.
- Do not expose raw placeholder markers:
  - `[待提供]`
  - `[待確認]`
  - `[Pending]`
  - `待提供：`
  - `待確認：`

## QA plan

- Run `npm run build`.
- Run `npm test`.
- Check `/`, `/research/`, `/en/research/`, `/about/`, and `/contact/`.
- Check 1440, 1280, 1024, 768, 430, and 390px via Playwright overflow assertions.
- Confirm reduced-motion disables decorative animations.
- Inspect Research and Home screenshots for calm motion hooks and no layout regression.

## Deferred items

- Keyword marquee remains deferred because it risks pushing the site toward an event-site visual tone.
- Numeric counters remain excluded because verified metrics are not available.
- Large animation libraries remain excluded because CSS and small native JavaScript are sufficient.
