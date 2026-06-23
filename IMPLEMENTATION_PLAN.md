# Static Portfolio Implementation Plan

> For the next implementation pass, use the linked Stitch project as the source of visual truth. Do not revive the discarded first implementation unless a specific detail is intentionally copied into the new design.

Primary Stitch reference:

- Project: `projects/5442602754643667478`
- Title: `Outbound Sales Professional Portfolio`
- Screen: `Jonh Ryan Coranes | Portfolio (Vertical Timeline)`
- Screen resource: `projects/5442602754643667478/screens/371775dd46ae447fb3d6f971daad94ac`
- Design system: `Executive Precision`

## Goal

Build a one-page static portfolio for Jonh Ryan Coranes by closely replicating the linked Stitch `Executive Precision` / Vertical Timeline screen using HTML, CSS, vanilla JavaScript, and Bootstrap 5 CDN. Defer configuration and design tailoring until after the faithful baseline is working.

## Architecture

The website will be a static file set deployed on Vercel. Essential content must be present in HTML and readable without JavaScript. JavaScript is limited to progressive enhancement for navigation, active section state, and reduced-motion-safe reveal behavior.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Bootstrap 5 via CDN
- Bootstrap Icons via CDN when useful
- Vercel static hosting

## Stitch-Derived Design Tokens

- Container max width: `1200px`
- Desktop page margin: `64px`
- Mobile page margin: `20px`
- Grid gutter: `24px`
- Section gap: `80px`
- Primary: `#001227`
- Primary container: `#0F2742`
- Secondary: `#006876`
- Secondary container: `#97EDFF`
- Background: `#F8F9FB`
- Surface: `#FFFFFF`
- Text: `#191C1E`
- Muted text: `#44474D`
- Border: `#C4C6CE`
- Body font: Inter, system UI fallback
- Card radius: `12px`
- Button radius: `4px`
- Ambient shadow: `0 4px 12px rgba(15, 39, 66, 0.05)`

## Files To Create During Implementation

- `index.html`: one-page portfolio and semantic content.
- `assets/css/style.css`: design tokens, layout, responsive behavior, motion, and Stitch-derived visual styling.
- `assets/js/main.js`: progressive enhancement only.
- `assets/img/`: future headshot and social preview image.
- `assets/resume/jonh-ryan-coranes-resume.pdf`: sanitized resume PDF.
- `404.html`: simple branded static error page.
- `robots.txt`: crawl instructions.
- `sitemap.xml`: production URL map.
- `tests/static-checks.mjs`: static checks for required files, sections, links, and no-backend constraints.

## Implementation Sequence

1. Read `PRODUCT.md`, `DESIGN.md`, and `CONTENT.md`.
2. Use the Stitch Vertical Timeline screen as the only visual reference for the initial setup.
3. Replicate the Stitch layout, palette, typography, spacing, cards, timeline, and CTA treatments as closely as static HTML/CSS allows.
4. Do not use deleted, hidden, secondary, or dark-mode prototypes. Build light mode only, with no dark theme CSS and no theme toggle.
5. Defer all configuration and design tailoring until after the faithful baseline is implemented and reviewed.
6. Create the static file structure.
7. Write static tests first for required files, sections, CTAs, sanitization rules, and no-backend constraints.
8. Implement `index.html` from `CONTENT.md` and the Stitch screen.
9. Implement `assets/css/style.css` using Stitch-derived tokens and pixel-faithful responsive rules.
10. Implement `assets/js/main.js` only for progressive enhancement.
11. Add `404.html`, `robots.txt`, and `sitemap.xml`.
12. Add placeholder or final assets, clearly marking anything not production-ready.
13. Run static tests.
14. Run local browser checks at 320px, 375px, 768px, 1024px, and desktop.
15. Compare the local page against the Stitch screen before making any configuration changes.
16. Replace placeholder contact, LinkedIn, resume, headshot, and canonical URL before publishing.

## Required Sections

- Hero
- About
- Sales Capabilities
- Experience
- Sales Approach
- Leadership Advantage
- Skills and Tools
- Education and Languages
- Contact

## Non-Negotiables

- No forms.
- No backend.
- No database.
- No CMS.
- No scheduler.
- No invented metrics.
- No private address or references.
- No horizontal overflow on mobile.
- No content hidden when JavaScript fails.
- `prefers-reduced-motion: reduce` must be supported.

## Verification Checklist

- Static checks pass.
- Browser renders the first viewport cleanly.
- Mobile widths from 320px upward have no horizontal overflow.
- Navigation is keyboard accessible.
- Focus states are visible.
- Resume, LinkedIn, and email actions are present.
- Essential content is semantic and crawlable.
- Initial implementation closely replicates the single remaining Stitch Vertical Timeline screen before any later configuration pass.
