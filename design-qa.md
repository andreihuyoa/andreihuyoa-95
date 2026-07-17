# Website Mode Design QA

- Source visual truth: `docs/qa/website-mode-figma.png` (Figma node `21:2`, 1440×1325)
- Implementation screenshot: `docs/qa/website-mode-sidebar-fixed.png` (1440×1325)
- Side-by-side comparison: `docs/qa/website-mode-sidebar-comparison.png` (2880×1325)
- Scroll-state evidence: `docs/qa/website-mode-sidebar-scroll.png`
- State: Website Mode, desktop viewport, reduced-motion preference enabled for deterministic capture

**Findings**

- No actionable P0, P1, or P2 mismatches remain for the requested sidebar/header change.
- [P3] The four round utility icons use the closest Solar Icon equivalents rather than the source's exact glyph artwork.
  Location: lower utility cluster in `WebsiteSidebar`.
  Evidence: size, circular outline, order, and spacing match; the internal glyph shapes differ slightly.
  Impact: minor icon-level drift at small scale.
  Fix: replace only if exact source icons become available as approved assets.
- [P3] The right column retains the owner's real portfolio sections and populated stats instead of the Figma placeholder blog content and empty stat cells.
  Location: main content column.
  Evidence: the comparison image shows the same frame geometry with intentionally different content.
  Impact: none to the requested sidebar fidelity or fixed-rail behavior.
  Fix: no change; this is an existing product-content decision.

**Full-view comparison evidence**

- The final side-by-side image shows matching 162px masthead geometry, centered 966px grid, 250px utility rail, sidebar x-position, label order, separators, shortcut keycaps, presence/community rows, icon row, contact copy, and email baseline.
- The header now contains only the identity mark, matching the selected Figma frame; no header button is rendered.
- The sidebar's lower utility cluster was expanded in the final iteration to match the Figma's vertical rhythm and email position.

**Focused region comparison evidence**

- The sidebar is large enough to read in the full-resolution 2880px comparison, so a separate crop was not required.
- Typography uses Departure Mono at the same compact scale and tracking; the warm paper, charcoal, muted gray, 1px rules, dotted rules, and 2px keycap radii remain token-aligned.
- The custom logo SVG and portrait asset remain exact Figma exports. No placeholder or code-drawn visual asset was introduced.
- Sidebar copy now follows the source: `experience`, `projects`, `certifications`, `stack`, `recommendations`, `affiliations`, `collabs`, `consulting`, `shop`, `blog`, `gear`, `resources`, `ask anything`, `typing test`, `31 people viewing right now`, and `community chat`.

**Interaction and scroll evidence**

- Browser metrics at page top: `windowScrollY: 0`, `bodyScrollHeight: 1325`, `viewportHeight: 1325`, `contentScrollTop: 0`, `contentScrollHeight: 1198`, `contentClientHeight: 1158`, `sidebarTop: 168`, `headerButton: false`.
- After commanding a right-column scroll: `windowScrollY` stayed `0`, `.website-content.scrollTop` reached its maximum `40`, and `sidebarTop` stayed `168`. This verifies the document/header/sidebar remain stationary while `.website-content` is the scroll container.
- Existing anchor links, external links, mail links, and the footer's Desktop Mode escape hatch remain available. Source-only controls without an implemented destination are rendered as buttons with a `coming soon` title.

**Required fidelity surfaces**

- Fonts and typography: passed; Departure Mono and Instrument Sans retain their established roles, sizes, line heights, tracking, and hierarchy.
- Spacing and layout rhythm: passed; the requested rail now matches the source's label groups, separators, shortcut blocks, and bottom contact alignment.
- Colors and tokens: passed; the implementation continues to use the Website Mode paper, charcoal, muted-gray, border, and surface tokens.
- Image quality and asset fidelity: passed; exact logo/portrait assets are preserved and Solar Icons are used for interface glyphs.
- Copy and content: passed for the sidebar; right-column portfolio copy intentionally remains owner-specific.

**Comparison history**

1. Earlier implementation drift: the rail replaced several Figma labels and utilities with adapted portfolio links, and the header exposed a Desktop Mode button.
2. Fix: restored the Figma sidebar label/control structure, removed the header button, constrained Website Mode to the viewport, and made `.website-content` independently scrollable.
3. First comparison finding: the lower utility cluster was vertically compressed, placing the email above the source baseline.
4. Fix: increased the rail and lower-cluster rhythm while keeping its start position stable.
5. Post-fix evidence: `docs/qa/website-mode-sidebar-comparison.png` shows the corrected lower cluster and email alignment; browser metrics verify the fixed rail and independent content scroll.

**Implementation Checklist**

- [x] Match the Figma sidebar text and group order.
- [x] Match separators, shortcuts, utility controls, contact copy, and bottom alignment.
- [x] Keep the desktop sidebar visible while only the right column scrolls.
- [x] Preserve the mobile single-column reflow.
- [x] Remove the Desktop Mode button from the header.
- [x] Preserve the footer Desktop Mode action.
- [x] Pass typecheck, lint, build, and formatting checks.

**Follow-up Polish**

- Replace the four lower utility glyphs only if exact exported source icons are supplied.

final result: passed
