---
name: static-mockup
description: Create or edit framework-free static HTML, CSS, and JavaScript mockups for quick UI prototypes, demos, and landing pages. Use when a lightweight responsive mockup is more appropriate than a framework project.
---

# Static Mockup

Build lightweight static mockups without a framework. Respect explicit user requirements over every default in this skill.

## Design context

Before creating or editing a static mockup, check whether a relevant `DESIGN.md` exists in the project root or an applicable parent directory.

- Read it when it is relevant to the requested page, and follow its design tokens, component rules, accessibility requirements, and visual constraints.
- Update it when the user asks to establish or change design rules, or when the work introduces reusable design decisions that belong in the existing design system. Keep the update limited to decisions actually made; do not invent a design system.
- When the user asks to create a `DESIGN.md`, follow the current Google Labs DESIGN.md alpha specification as the base format. Extensions are allowed, but do not replace or reorder its base structure.
- When no relevant `DESIGN.md` exists, use the styling-system defaults in this skill. Do not create one unless the user requests it or the design work clearly requires durable shared rules.

### New DESIGN.md files

Use YAML front matter for machine-readable tokens, followed by Markdown rationale. Use the alpha base schema fields that apply: `version`, `name`, `description`, `omitted`, `colors`, `typography`, `rounded`, `spacing`, and `components`.

```md
---
version: alpha
name: Example System
colors:
  primary: "#1A1C1E"
typography:
  body-md:
    fontFamily: "Noto Sans KR"
    fontSize: 1rem
rounded:
  md: 8px
spacing:
  md: 16px
---

## Overview

## Colors

## Typography

## Layout

## Elevation & Depth

## Shapes

## Components

## Do's and Don'ts
```

- Omit unused sections rather than adding placeholder content. Preserve this order for sections that are present: Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts.
- Keep exact values in YAML and explain their intended use, constraints, and exceptions in Markdown.
- Add extension sections after the applicable base sections; preserve unknown existing sections when editing.
- When the Google CLI is available or the user authorizes its use, validate a new or changed file with `npx -p @google/design.md designmd lint DESIGN.md`. Do not add the package or lockfiles to the project solely for validation.

## Default structure

Unless the user asks otherwise, create separate files:

```text
mockup/
  index.html
  styles.css
  script.js
```

- Do not put CSS or JavaScript inline in one HTML file by default.
- Set `<html lang="ko">` and write visible copy in Korean by default.
- Use mobile-first CSS: base rules target narrow screens, then add `min-width` media queries.
- Use semantic HTML, accessible labels, and native controls before custom JavaScript.
- Keep JavaScript limited to necessary interaction and state; do not reproduce layout rules in JavaScript.
- When the user provides a public host URL, add an absolute canonical tag in `<head>` for the page's intended URL. Do not invent a host or add a canonical tag when no host is specified.

## Document metadata

Unless the user gives different requirements, add these elements to every page's valid `<head>`:

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>페이지를 설명하는 고유한 제목</title>
<meta name="description" content="페이지 내용과 목적을 짧고 고유하게 설명합니다.">
```

- Give every page a unique, descriptive title and description. Do not reuse generic copy across unrelated pages.
- Add a canonical tag only when a public host is provided.
- Add Open Graph and Twitter card tags only when a public host and an appropriate share image are available. Use absolute URLs for `og:url` and `og:image`.
- Add JSON-LD structured data only when the page has a matching, user-visible content type and accurate values. Do not fabricate an `Article`, `Product`, `FAQPage`, `Organization`, or other schema type.
- Add `hreflang` only when equivalent localized versions of the page actually exist.
- When deployment files are in scope, include or update `robots.txt` and `sitemap.xml` for public indexable pages. Do not create deployment configuration when the user only asks for a local mockup.

```html
<link rel="canonical" href="https://example.com/about/">
```

## Search indexing defaults

Unless the user gives different SEO instructions, add one robots meta tag in `<head>`:

- List, archive, internal search-results, and 404 pages: `noindex, follow`.
- All other pages: `index, follow`.

```html
<!-- List, archive, internal search-results, or 404 page -->
<meta name="robots" content="noindex, follow">

<!-- Other page -->
<meta name="robots" content="index, follow">
```

Do not emit conflicting robots tags. A host-specific canonical tag and the robots directive may both be present when their conditions apply.

## Styling system

Create a small design-token layer before styling components. Keep tokens shared within a single visual design.

```css
:root {
  --color-bg: #ffffff;
  --color-surface: #f8fafc;
  --color-text: #172033;
  --color-muted: #64748b;
  --color-primary: #2563eb;
  --color-border: #e2e8f0;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --radius-md: 0.75rem;
}
```

- Avoid repeatedly hard-coding the same colors, spacing, typography, radii, or shadows.
- Prefer small, composable utility-like classes with clear responsibilities over one-off deeply nested selectors.
- Name classes so that a future migration to Tailwind remains straightforward: layout, spacing, alignment, typography, and state should be distinguishable.
- Use component classes only for reusable visual units, not for every single element.

## Asset cache hashes

Reference local CSS and JavaScript assets with a `v` query parameter.

```html
<link rel="stylesheet" href="./styles.css?v=placeholder">
<script src="./script.js?v=placeholder" defer></script>
```

After modifying linked CSS or JavaScript, calculate their MD5 content hashes:

```bash
node scripts/hash-assets.js styles.css script.js
```

The script prints a JSON mapping of each supplied file to its ten-character MD5 value. It does not edit HTML. Use the result to update every local HTML reference to the changed asset, including references from multiple pages:

```bash
{
  "styles.css": "a1b2c3d4e5",
  "script.js": "f6e7d8c9b0"
}
```

Use `--length <1-32>` only when a different hash length is required. MD5 is used only as a short cache-busting content identifier, never as a security or integrity guarantee.

## Verification

1. Run the asset-hash script after changing linked CSS or JavaScript, then update every affected local HTML reference.
2. Open the HTML in a browser and inspect mobile width first, then a wider desktop width.
3. Verify text, navigation, controls, overflow, focus behavior, and visible states.
4. Do not add a framework, package manifest, dependency directory, or build setup unless the user requests one.
