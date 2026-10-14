# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static personal portfolio site for Jonh Ryan Coranes, an outbound sales and lead generation professional. Deployed on Vercel at `https://jonh-ryan-coranes.vercel.app/`. No build system, no bundler — just HTML, CSS, vanilla JS, and Bootstrap 5 loaded from CDN.

## Running tests

```
node tests/static-checks.mjs
```

Tests are file-content assertions using Node's built-in `assert` module. They validate that the HTML structure, CSS design tokens, and JS patterns match the agreed baseline. Run them after any change to `index.html`, `assets/css/style.css`, or `assets/js/main.js`.

## Architecture

**Single-page layout** — `index.html` is the entire site. One CSS file (`assets/css/style.css`), one JS file (`assets/js/main.js`). `404.html` handles Vercel's not-found route.

**JavaScript is progressive enhancement only.** `main.js` adds three behaviors via `IntersectionObserver`: scroll-reveal for `[data-reveal]` and `[data-timeline-reveal]` elements, active nav-link tracking by section, and email copy-to-clipboard. No `fetch`, no `localStorage`, no `sessionStorage`. If JS is absent or disabled, the page is fully readable.

**CSS design system — "Executive Precision" (light only).** Core tokens:

| Token | Value |
|---|---|
| Primary navy | `#001227` |
| Container navy | `#0F2742` |
| Teal | `#167D8D` |
| Teal accent | `#97EDFF` |
| Background | `#F8F9FB` |
| Ink | `#191C1E` |
| Slate | `#44474D` |
| Border | `#C4C6CE` |

Container max-width is `1100px` (`--container-max`). Section gap is `120px` (`--section-gap`). Font is Inter (Google Fonts). No dark mode — there is no theme toggle and the tests assert its absence.

**Scroll animation pattern:** elements tagged `[data-reveal]` start hidden, gain `is-visible` when intersected. Timeline items use `[data-timeline-reveal]`. If `prefers-reduced-motion` is set or `IntersectionObserver` is unavailable, all items are made visible immediately.

## Hard constraints (tested)

The test suite enforces these — break them and `node tests/static-checks.mjs` will fail:

- No `<form>` elements.
- No Calendly, scheduler, booking, or database references.
- No unsupported metrics (percentages, quota claims, "Top Performer").
- No residential address or personal references.
- No dark-mode CSS (`darkMode`, `theme toggle`, `tailwindcss` strings are banned).
- No `fetch`, `XMLHttpRequest`, `localStorage`, or `sessionStorage` in `assets/js/main.js`.
- No `.capability-card:hover` or `@keyframes capability-hover-lift` in CSS.
- No `background-clip: text` in CSS.
- Design tokens (`#001227`, `--container-max: 1100px`, `--section-gap: 120px`, `font-family: Inter`, etc.) must be present in the CSS.

## Content source

`CONTENT.md` is the authoritative copy source. `DESIGN.md` documents the visual direction (Stitch project "Executive Precision"). When editing copy, update `index.html` directly; `CONTENT.md` and `DESIGN.md` are reference documents, not templates that get compiled.

## Deploying

Push to `main` — Vercel deploys automatically. No build step required.
