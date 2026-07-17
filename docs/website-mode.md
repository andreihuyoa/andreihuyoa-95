# Website Mode

## 1. Purpose

Website Mode is the conventional, responsive portfolio interface shown when the application is switched away from its Windows-inspired desktop mode. It presents Andrei's introduction, experience, projects, stack, and contact information as a focused editorial page while preserving the ability to return to desktop mode.

## 2. Current Goal

The immediate goal is to implement and stabilize the selected Website Mode Figma design before beginning the larger portfolio restructuring, content architecture, SEO, blog, certification, or case-study work.

## 3. Sources of Truth

Use sources in this priority order:

1. The user's latest explicit instruction
2. The selected Figma frame: <https://www.figma.com/design/H5L9oVpoubFP3TR62QuJf0/Portfolio-Stuff?node-id=21-2&m=dev>
3. `docs/website-mode.md`
4. Root `AGENTS.md`
5. Existing design-system rules
6. Existing implementation
7. The external reference website: <https://bryllim.com/>

The reference website is inspiration only. Do not copy its code, branding, text, or exact implementation.

## 4. Design Direction

- Layout: a full-width masthead followed by a centered 966px editorial grid with a 250px utility rail and a 716px content column.
- Typography: the custom `andreihuyoa .` SVG is the dominant display element. Departure Mono handles navigation, labels, metadata, and compact interface copy; Instrument Sans handles body content.
- Spacing: the Figma frame uses a compact 5/10/15/20/40px rhythm. Major content is deliberately dense rather than card-heavy.
- Color: warm paper (`#F7F2E9`) with charcoal (`#2F332F`) and muted olive-gray (`#747870`). Muted paper surfaces remain available for controls.
- Hierarchy: oversized masthead, portrait-led introduction, divided stats strip, then numbered ruled content sections.
- Cards and rules: content is separated by thin horizontal rules, dotted rules, and sparse vertical dividers instead of elevated cards or large radii.
- Navigation: desktop navigation lives in a narrow utility rail; on mobile it reflows into wrapped horizontal groups above the main content.
- Images: the portrait is a transparent cutout, rendered in grayscale/luminosity against the paper background. The custom logo remains an SVG.
- Tone: personal, editorial, slightly tactile, monochrome, and technically precise.

## 5. Website Mode Structure

1. Masthead — large identity mark with no header-side mode switch, matching the selected frame. Component: `WebsiteHeader`.
2. Utility rail — Figma-matched section buttons, service links, shortcuts, presence/community controls, display controls, and email. Component: `WebsiteSidebar`. It stays visible while the right content column scrolls on desktop and becomes a normal, wrapped block on mobile.
3. Section view — `WebsiteMode` owns the active section and replaces the right column when a rail button is selected. Experience, projects, and stack reuse the current content; certifications, recommendations, affiliations, and resources have typed placeholder scaffolds for later content.
4. Hero — portrait, identity mark, short introduction, and social links within the default experience view. Component: `HeroSection`.
5. Stats — four concise proof points within the default experience view. Component: `StatsSection`.

## 6. Component Map

- `src/views/WebsiteMode.tsx` — active-section state, right-panel switching, placeholder scaffolds, and current content arrays.
- `src/components/website/WebsiteHeader.tsx` — masthead identity.
- `src/components/website/WebsiteSidebar.tsx` — typed section buttons, active state, utility controls, shortcuts, and contact.
- `src/components/website/HeroSection.tsx` — portrait, introduction, and social links.
- `src/components/website/StatsSection.tsx` — four-cell proof-point strip.
- `src/components/website/ContentListSection.tsx` — reusable numbered, ruled list section used by experience, projects, and stack.
- `src/components/website/MotionReveal.tsx` — smallest animation boundary for scroll entrance effects.
- `src/components/website/motion.ts` — shared Motion variants and transition defaults.
- `src/styles/website-mode.css` — Website Mode layout, component, responsive, focus, and reduced-motion styles.
- `src/components/website/index.ts` — Website Mode component exports.

Legacy `Badge`, `ButtonLink`, `Panel`, and `Row` components remain available but are not used by the current Figma-based composition.

## 7. Design Tokens

Tokens live under `:root[data-mode="website"]` in `src/index.css`; Tailwind aliases live in `tailwind.config.js`.

- Colors: `--website-text: #2F332F`, `--website-text-muted: #747870`, `--website-text-soft: #565B54`, `--website-background: #F7F2E9`, `--website-surface-muted: #ECE5D9`, `--website-surface-soft: #FBF7F0`, plus existing green/status and orange accent values.
- Typography: `Instrument Sans` for body copy and locally vendored `Departure Mono` for UI/meta copy. Instrument Sans is loaded through `src/lib/fonts.ts`; Departure Mono is declared with `@font-face` in `src/index.css`.
- Spacing: `--website-space-1` through `--website-space-5` map to 5, 10, 15, 20, and 40px.
- Border radius: `--website-radius-sm: 2px`; most editorial surfaces intentionally have no radius.
- Shadows: `--website-shadow` remains available, but the Figma implementation is flat and does not use card shadows.
- Container widths: `--website-container: 966px`, `--website-sidebar: 250px`, `--website-content: 716px`.
- Breakpoints: 1024px for compressed desktop/tablet layout and 760px for the single-column mobile layout.
- Z-index: `--website-layer-header: 30`, `--website-layer-content: 1`.

## 8. Animation Architecture

- Package: `motion` 12.42.2, imported from `motion/react`.
- Utilities: `src/components/website/motion.ts`.
- Available variants: `fadeIn`, `fadeUp`, `staggerContainer`, `staggerItem`, and `scaleOnHover`; shared viewport and transition settings are also exported.
- Client boundaries: this Vite application is client-rendered. `MotionReveal` is the focused Motion boundary; content components remain plain React components.
- Reduced motion: `useReducedMotion()` disables reveal initialization/animation, and CSS under `prefers-reduced-motion: reduce` removes residual animation and transition duration.
- Future rules: animate only representative sections or interactions, avoid layout animation and scroll-jacking, keep durations short, preserve keyboard behavior, and never make content depend on animation completion.

## 9. Asset Map

- `public/assets/WebsiteMode/andreihuyoa dot.svg` — exact Figma identity mark used in the masthead and hero.
- `public/assets/WebsiteMode/andrei-portrait-cutout.png` — transparent Figma portrait used in the hero.
- `public/assets/WebsiteMode/andrei.svg` — older Website Mode logo retained for compatibility but not used by the current composition.
- `public/assets/fonts/DepartureMono-Regular.woff2` — official Departure Mono v1.500 webfont used by Website Mode controls and metadata.
- `public/assets/fonts/DepartureMono-LICENSE.txt` — bundled SIL Open Font License for Departure Mono.
- Solar interface icons come from `@solar-icons/react` 1.1.1 and inherit the Figma text colors.

## 10. Responsive Rules

- Desktop (>1024px): exact 966px centered grid when space allows, 250px fixed-in-view utility rail, independently scrolling 716px content column, 242px portrait, four-column stats.
- Tablet (761–1024px): fluid outer width, 220px rail, flexible content, smaller hero media column, same editorial hierarchy.
- Mobile (≤760px): single column, wrapped navigation/action groups, stacked hero, centered portrait capped at 330px, 2×2 stats, stacked dates above list content, and stacked footer actions.
- All widths are capped with fluid `min()`/`calc()` values to avoid horizontal overflow.

## 11. Accessibility Rules

- Preserve `header`, `main`, `aside`, `nav`, `section`, `article`, and `footer` landmarks.
- Maintain one text-equivalent `h1` through the hero logo's alt text and ordered section `h2` headings.
- Links must describe destinations; external links open in a new tab with `rel="noreferrer"`.
- Focus styles use a visible 2px charcoal outline with a 4px offset.
- Solar icons used beside text are decorative and hidden from assistive technology.
- The portrait has descriptive alt text; decorative rules have `aria-hidden="true"`.
- Website Mode restores text selection, overriding the desktop shell's global no-selection behavior.
- Motion respects operating-system reduced-motion preferences.

## 12. Current Decisions

| Decision                                                        | Reason                                                                   | Tradeoff                                        | Reconsider when                                          |
| --------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------- | -------------------------------------------------------- |
| Figma is the main visual source of truth                        | It contains the selected Website Mode frame and measurable layout values | Unspecified interactions must be inferred       | A newer selected frame is provided                       |
| Website Mode precedes the wider restructure                     | Keeps this phase reviewable and prevents unrelated architecture churn    | Some content remains colocated in the view      | The user explicitly starts the restructuring phase       |
| Motion is scaffolded before complex animation                   | Establishes reusable, accessible primitives without distracting motion   | The first pass is intentionally restrained      | A dedicated motion pass is requested                     |
| Existing tokens are reused and corrected before adding new ones | Keeps Website Mode consistent and centrally maintainable                 | Some legacy aliases remain unused               | The whole design system is reworked                      |
| The large Figma frame is adapted to real existing content       | Preserves functionality and avoids placeholder/copycat content           | Row heights can exceed the Figma placeholders   | Final portfolio copy is approved                         |
| Blog and certifications are not implemented in this phase       | The explicit phase restrictions defer those systems                      | Those Figma navigation/content areas are absent | The user requests the blog or certification phase        |
| Bryllim is inspiration only                                     | Prevents copying branding, text, code, or an exact visual implementation | Some interaction ideas remain deferred          | Never reconsider without explicit rights and instruction |

## 13. Known Gaps

- The selected Figma frame has no explicit tablet or mobile frames; the responsive rules are inferred from its hierarchy.
- The Figma stats cells are structurally present but visually empty; the implementation fills them with existing portfolio evidence.
- Figma includes blog and certification references. They are intentionally omitted under the current phase restrictions.
- Source-only sidebar destinations without an implemented feature remain visually faithful buttons labeled as coming soon; existing portfolio, contact, résumé, and social destinations stay functional.
- Exact copy, dates, and final project destinations may change in the future content-architecture phase.
- Chrome visual evidence is preserved under `docs/qa/`, with the latest comparison report in `design-qa.md`.

## 14. Future Work

- Full motion and interaction pass
- Blog integration
- Certifications section and verification links
- SEO restructuring
- Project case studies
- Content architecture changes
- Broader portfolio restructuring
- Optional dark theme, command palette, and richer Website Mode utilities after their behavior is designed

## 15. Validation Commands

- Development: `npm run dev`
- Linting: `npm run lint`
- Type checking: `npm run typecheck`
- Testing: no automated test script is defined in `package.json`
- Production build: `npm run build`
- Formatting check: `npm run format:check`

Latest validation results are updated at the end of each completed Website Mode implementation pass.

### Latest results (2026-07-17)

- `npm run typecheck`: passed
- `npm run lint`: passed
- `npm run build`: passed; Vite emitted a non-blocking warning that the main JavaScript chunk exceeds 500kB after minification
- `npm run format:check`: passed after formatting the changed files
- Automated tests: not run because the repository has no test script
- Chrome desktop capture: verified at 1440×1325
- Chrome mobile capture: verified at a true 390×844 emulated viewport; document width and scroll width both measured 390px
- Browser console: no page console errors after reload
- Interactions: desktop-mode switch and `#projects` navigation verified
- Visual comparison: `design-qa.md` reports `final result: passed`
