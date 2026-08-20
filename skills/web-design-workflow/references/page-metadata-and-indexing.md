# Page Metadata and Indexing

Read this reference when the task creates or replaces a page, route, document shell, or public landing page; changes page-level metadata, public URLs, locale alternatives, access or crawler state; or explicitly includes SEO, discoverability, sharing, indexing, or page-level release readiness. Apply the rules through the project's existing metadata API, router, head component, document shell, response headers, or direct HTML. Do not replace established framework conventions with raw markup. Do not load this reference for isolated component work with no page-level effect or a visual review that excludes metadata and discoverability.

## Establish the page intent

Before changing metadata or indexing, determine whether the page is:

- public and intended for search discovery;
- public but intentionally excluded from search;
- authenticated or otherwise private;
- a preview, staging, error, internal search, or other non-production surface.

Confirm the real public origin, route, locale variants, share image, content type, and product or SEO requirements. Do not invent a host, canonical URL, translated route, organization, product, article, or other entity to complete metadata.

## Document metadata

- Use the correct document language and give every page a unique, descriptive title and description grounded in its visible content.
- Ensure character encoding and viewport configuration exist at the document-shell level when the stack does not already provide them.
- Add a canonical URL only when the intended public origin and canonical route are known. Generate it through the project's existing URL and routing conventions.
- Add Open Graph or social-card metadata only when the public URL and suitable share content are known. Use absolute URLs where the target platform requires them.
- Add structured data only for a matching user-visible content type with accurate values. Do not fabricate entities, products, articles, FAQs, reviews, offers, or organizations.
- Add language-alternate metadata only when equivalent localized pages actually exist and their URLs are known.
- Keep route-specific metadata at the route or page owner. Put shared defaults at the established document-shell or application level.

## Crawler indexing

- Decide indexing from page intent and real content value. Do not apply one blanket directive to every route.
- Public pages intended for discovery may be indexable. Authenticated, private, preview, staging, error, and internal search-result pages should not be exposed as ordinary indexable content.
- Evaluate list and archive pages individually. Index them only when they provide distinct, useful public navigation or content; do not assume every list or archive belongs in either category.
- Keep robots metadata and any `X-Robots-Tag` response header consistent. Do not emit conflicting crawler directives from different layers.
- Treat canonical and indexing directives as separate decisions. A canonical URL does not replace an intentional indexing directive.
- Treat `robots.txt` and `noindex` as crawler controls, not access control. Protect private content with the application's real authorization mechanism.
- Add or change `robots.txt` and sitemap output only when public deployment or search configuration is in scope. Include only real, intended URLs and use the project's existing generation mechanism when one exists.

## Verification

1. Inspect the rendered document head and relevant response headers for each affected route, including dynamic and localized variants.
2. Confirm titles, descriptions, language, canonical URLs, social metadata, structured data, and crawler directives match visible content and page intent.
3. Check that URLs use the real public origin, route parameters resolve correctly, and no placeholder or local development address remains.
4. Confirm framework defaults, nested layouts, plugins, middleware, hosting configuration, and raw markup do not produce duplicates or conflicts.
5. When sitemap or robots output changes, inspect the generated or deployed result rather than only its source configuration.
