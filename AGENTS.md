# AGENTS.md

Instructions for coding agents working in this repository. Keep this file short,
current, and operational; put detailed, task-specific guidance next to the code
it governs.

## Project

React 19 + TypeScript + Vite portfolio with two view modes:

- `os` (default): Windows 95-style desktop with draggable windows, taskbar, and
  start menu.
- `website`: modern portfolio view rendered by `src/views/website/`.

The mode is selected in `src/App.tsx` from the `?mode=` query parameter or
`localStorage["design-mode"]`, then persisted through `src/viewMode.ts`.

## Quick start

```bash
npm install
npm run dev       # local Vite server
npm run dev:lan  # Vite server on the LAN
```

## Working loop

1. Inspect `git status --short` and the relevant source, configuration, and
   assets before editing. Preserve unrelated user changes.
2. Establish the current baseline with the applicable checks before changing
   code. Treat failures in unrelated files as baseline failures and report them.
3. Make the smallest scoped change that satisfies the request. Do not rewrite
   unrelated files or infer new product behavior.
4. Run the full verification suite below after implementation.
5. Review `git diff`, run `git diff --check`, and hand off changed paths,
   verification results, and any remaining baseline failures.

## Hard constraints

- Use function components. New components use the repository's existing
  `ReactElement` pattern and explicit `*Props` interfaces.
- Use local React state and lift shared state to existing owners; do not add a
  state-management library.
- Use Tailwind classes only for component styling; do not add CSS modules,
  styled-components, a UI kit, or raw hex colors in components.
- Use the existing `95-*` tokens for Windows 95 chrome and `website-*` tokens
  for website mode. Extend the theme when a token is missing.
- Reference static assets from `/assets/...` in `public/assets`; do not import
  them as modules.
- Keep TypeScript strict. Do not add `any`, suppressions, or compiler/linter
  bypasses to make a check pass.
- Preserve existing Taglish comments when editing nearby code; do not translate
  comments wholesale.
- Add focused JSDoc to newly created functions, components, hooks, and exported
  helpers when their behavior or constraints are not self-evident.
- Keep website visual effects accessible and performant. Add richer
  shader/WebGL/SVG-filter treatments incrementally, not as ad hoc replacements.
- Do not commit changes unless the user explicitly asks for a commit.

## Verification

All four commands must pass before declaring a change complete:

```bash
npm run typecheck     # tsc --noEmit
npm run lint          # eslint .
npm run format:check  # prettier --check .
npm run build         # typecheck, Vite build, and prerender
```

Use `npm run format` to apply Prettier formatting. If verification is blocked by
an existing failure, do not claim success: identify the exact file and error,
and distinguish it from failures caused by the current change.

## Maintenance

Remove stale or duplicated rules when the codebase changes. Add a rule here only
when it is global, frequently needed, and not better expressed by code,
configuration, or a focused topic document.
