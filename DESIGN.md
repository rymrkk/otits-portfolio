# Jonh Ryan Coranes Portfolio Design Direction

## Design Source

Use the linked Stitch project as the primary design source. The initial setup must replicate the single remaining Stitch screen as closely as static HTML/CSS allows. The previous Lovable-inspired/local implementation should be treated as discarded reference only. Do not recreate it directly.

Stitch project:

- Project ID: `5442602754643667478`
- Full resource name: `projects/5442602754643667478`
- Title: `Outbound Sales Professional Portfolio`
- Design system: `Executive Precision`

Use this Stitch screen as the primary implementation reference:

- `Jonh Ryan Coranes | Portfolio (Vertical Timeline)`
- Screen resource: `projects/5442602754643667478/screens/371775dd46ae447fb3d6f971daad94ac`
- Device: desktop
- Width: `2560`
- Height: `9926`

Prototype scope:

- Only follow `Jonh Ryan Coranes | Portfolio (Vertical Timeline)`.
- Do not use deleted or hidden prototypes.
- Do not use dark-mode designs, dark-mode CSS, or a theme toggle.
- Do not reinterpret the design during the initial setup. Replicate first, configure later.

## Brand Position

Jonh is an outbound sales and lead generation professional with technical support depth and leadership awareness. The design should make him feel organized, prepared, responsive, and trustworthy.

Brand voice words:

- Prepared
- Conversational
- Accountable

Avoid:

- Flashy sales cliches.
- Stock-photo business theatrics.
- Generic blue SaaS landing-page patterns.
- Overly decorative cards and icons.
- Dense resume walls.

## Visual Direction

Follow the linked Stitch project's `Executive Precision` direction: modern minimalism, disciplined recruiter scanning, soft container shapes, precise typography, and quiet confidence.

The design should use:

- A crisp top navigation with name or initials, section links, and resume CTA.
- A strong first viewport with target role, short value proposition, and direct actions.
- A professional portrait area that can support a real headshot later, with a refined placeholder state for now.
- Clear section pacing: hero, profile, capabilities, experience, approach, leadership, skills, education, contact.
- The Stitch vertical timeline treatment for experience and career progression.
- A restrained visual motif related to outbound conversation, pipeline discipline, or follow-through.

## Palette Direction

Use the Stitch project's light `Executive Precision` palette as the source of truth.

Core implementation tokens:

- Primary navy: `#001227`
- Primary container navy: `#0F2742`
- Secondary teal: `#006876`
- Teal accent container: `#97EDFF`
- Off-white background: `#F8F9FB`
- Surface: `#FFFFFF`
- Ink text: `#191C1E`
- Slate text: `#44474D`
- Border: `#C4C6CE`
- Warm focus accent: `#B86B2C`

The previous navy `#0F2742` and teal `#167D8D` may remain as compatibility accents only when they visibly match the Stitch design. Body text and links must pass WCAG AA contrast.

## Typography Direction

Use the Stitch typography system.

Preferred approach:

- Primary: Inter.
- Fallback: system UI sans-serif.
- Headline XL desktop: `48px`, weight `700`, line-height `1.1`, letter-spacing `-0.02em`.
- Headline XL mobile: `32px`, weight `700`, line-height `1.2`, letter-spacing `-0.01em`.
- Headline LG: `32px`, weight `700`, line-height `1.2`.
- Headline MD: `24px`, weight `600`, line-height `1.3`.
- Body LG: `18px`, weight `400`, line-height `1.6`.
- Body MD: `16px`, weight `400`, line-height `1.6`.
- Body line lengths capped around 65 to 75 characters.
- No ultra-tight letter spacing.
- No repeated tiny uppercase labels above every section. One or two can be used deliberately, not as a page-wide scaffold.

## Layout Principles

- First viewport should clearly signal Jonh's name, target role, remote availability, and CTAs.
- Desktop hero can use a two-column composition when it matches the Stitch screen.
- Mobile layout must become single-column with CTA buttons stacked.
- Desktop uses a centered `1200px` max-width content container.
- Desktop margins should feel close to Stitch's `64px` margin and `24px` gutters.
- Mobile margins should use about `20px`.
- Section rhythm should use about `80px` vertical gaps.
- Cards should be used sparingly for real grouped information only.
- Avoid nested cards.
- Avoid huge soft shadow plus border combinations.
- Cards and panels use about `12px` radius.
- Buttons use about `4px` radius.
- Page should feel spacious, but not empty.

## Motion Principles

Use restrained motion inspired by Emil Kowalski's animation guidance:

- Motion should help orientation, not decorate everything.
- Use ease-out entrances and quick feedback.
- Avoid bounce, elastic, and slow ease-in entrances.
- Scroll reveal should never hide essential content if JavaScript fails.
- Add `prefers-reduced-motion: reduce` support.

Motion intensity: `3/10`.

## Stitch Tailoring Notes

The initial implementation must copy the Stitch visual direction closely. Tailoring and configuration changes happen later, after the baseline is working.

Keep:

- Executive Precision light theme.
- Vertical timeline treatment for career progression.
- Structured information density for recruiter scanning.
- Navy primary actions and teal supporting accents.
- Soft 12px containers and 4px buttons.

Allowed initial adaptations:

- Preserve public-safety constraints: no forms, no private address, no references, no invented metrics.
- If the Stitch screen contains unsafe or unverified content, replace it with the closest approved copy from `CONTENT.md`.
- Do not redesign layout, palette, type scale, section rhythm, or component styling during the initial setup.

Content sections:

1. Navigation
2. Hero
3. About
4. Sales Capabilities
5. Experience
6. Sales Approach
7. Leadership Advantage
8. Skills and Tools
9. Education and Languages
10. Contact
11. Footer

Primary CTA:

- Download Resume

Secondary CTAs:

- Connect on LinkedIn
- Email Jonh

Do not include:

- Contact forms
- Calendar embeds
- Pricing
- Testimonials
- Blog cards
- Client logos
- Unsupported statistics

## Design Acceptance Criteria

- Closely replicates the single remaining Stitch Vertical Timeline screen and its `Executive Precision` system.
- Does not resemble a generic Bootstrap template.
- First viewport is polished at desktop and mobile sizes.
- Contact actions are obvious without feeling like a sales funnel page.
- Works with a future real headshot, but looks acceptable with a placeholder.
- Can be implemented with static HTML, CSS, vanilla JS, and Bootstrap 5 CDN.
