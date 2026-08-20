# Static Web Implementation

Read this reference only when creating or editing framework-free static HTML, CSS, and JavaScript. Do not apply these file-specific defaults to a framework project or to review-only work.

Page-level metadata and crawler indexing are cross-stack concerns. When they are relevant, follow [Page metadata and indexing](page-metadata-and-indexing.md) and implement its outcomes with valid HTML or in-scope static deployment files. This reference contains only static-file-specific defaults.

## Default structure

Respect the requested destination and any existing project structure. For a new isolated mockup with no specified layout, use separate files:

```text
mockup/
  index.html
  styles.css
  script.js
```

- Do not put CSS or JavaScript inline in one HTML file by default.
- Set the correct `lang` value. Use `<html lang="ko">` and natural Korean copy when the project and user context are Korean.
- Use mobile-first CSS, semantic HTML, accessible labels, and native controls before custom JavaScript.
- Keep JavaScript limited to necessary interaction and state. Do not reproduce layout or visual rules in JavaScript.
- Do not add a framework, package manifest, dependency directory, build setup, or deployment configuration unless the user requests it.

## CSS organization

- Follow the applicable `DESIGN.md` and existing stylesheet organization before introducing new patterns.
- Keep a small shared token layer for repeated colors, typography, spacing, radii, and elevation when the project does not already provide one.
- Prefer small composable classes with clear layout, spacing, alignment, typography, component, or state responsibilities over deeply nested one-off selectors.
- Use component classes for reusable visual units, not for every element.

## Asset cache hashes

For local CSS and JavaScript assets in a delivered static site, reference the content hash with a `v` query parameter when cache invalidation is needed:

```html
<link rel="stylesheet" href="./styles.css?v=placeholder">
<script src="./script.js?v=placeholder" defer></script>
```

After modifying linked assets, run the bundled script while the current working directory is the project directory that the input paths are relative to. Resolve the skill script's actual path; do not change to the skill directory unless the asset paths are also written relative to that directory.

```bash
node "<resolved-skill-directory>/scripts/hash-assets.js" styles.css script.js
```

Input paths are resolved from the command's current working directory and may also be absolute. The script prints a JSON mapping to the first ten MD5 characters and does not modify HTML. Update every local HTML reference to each changed asset.

```json
{
  "styles.css": "a1b2c3d4e5",
  "script.js": "f6e7d8c9b0"
}
```

Use `--length <1-32>` only when another length is required. MD5 is a cache-busting content identifier here, never a security or integrity mechanism.

## Verification

1. Run the asset-hash script after changing linked CSS or JavaScript and update every affected HTML reference.
2. Open each affected page in a browser at narrow mobile and wider desktop widths.
3. Verify applicable shared page metadata and indexing rules, content order, navigation, controls, overflow, focus behavior, asset loading, and visible states.
4. Confirm that there are no unintended framework, dependency, build, or deployment files.
