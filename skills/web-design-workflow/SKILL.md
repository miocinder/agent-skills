---
name: web-design-workflow
description: Create, review, and improve web interfaces across framework and framework-free projects. Use when the user asks to design or implement a web page, product UI, landing page, or mockup; review an existing web interface; or explicitly fix its hierarchy, content, interaction, accessibility, responsive behavior, or states. For review-only requests, evaluate without editing. Do not use for backend-only, non-web, or image-only tasks.
---

# Web Design Workflow

Create, audit, and improve deliberate, usable web interfaces in the project's existing implementation stack. Respect explicit user requirements, applicable project instructions, and the established design system over every default in this skill.

## Authority and modes

Choose the mode from the user's requested action.

- **Review mode:** A request for review, audit, assessment, diagnosis, feedback, or suggestions authorizes evaluation only. Read the applicable design context, inspect the rendered interface and relevant implementation, then report evidence-backed findings without modifying code, copy, design files, assets, or configuration.
- **Create or edit mode:** A request to create, design, implement, edit, fix, or apply changes authorizes modifications only within the requested scope. Preserve the existing framework, build system, component library, and project conventions unless the user asks to change them. Verify the requested outcome and affected behavior, but do not expand the task into an unrelated full-interface audit or redesign.
- **Full workflow mode:** When the user asks to create or revise an interface and also audit, improve, or verify its overall quality, establish context, implement the interface, apply the full audit rubric, fix in-scope findings, and verify again.

Do not infer or claim that an interface was made by AI. Treat “AI slop” as shorthand for observable quality problems, not a provenance judgment.

## Start with design context

Before judging or changing an interface, identify:

- the primary user and the one task they need to complete;
- the page or product goal, conversion event, and success criteria;
- the real content, functionality, data, constraints, and implementation scope;
- the target viewport(s), supported devices, brand guidance, and existing design system.

Before reviewing, creating, or editing an interface, locate and read the applicable `DESIGN.md` before making visual judgments or decisions. Also inspect relevant project instructions, product briefs, component libraries, and existing UI patterns.

- Follow the applicable `DESIGN.md` tokens, rationale, component rules, accessibility requirements, and negative constraints.
- Preserve intentional brand and implementation choices. More specific project rules and explicit user requirements take precedence.
- For each target file or page, search its directory and ancestor directories up to the repository root. The closest scoped `DESIGN.md` governs that subtree; broader files fill only gaps. For work spanning multiple subtrees, resolve the applicable file separately for each target.
- Follow authoritative design files explicitly named by applicable `AGENTS.md` or `README.md`. If two applicable sources conflict and their scope or project hierarchy does not resolve the conflict, do not guess: report the conflict in review mode or request direction before implementing the affected decision.
- Modify an existing `DESIGN.md` only when the user explicitly requests a design-document change or the authorized task expressly includes synchronizing design-system documentation under applicable project instructions. Otherwise report a durable new design decision as a documentation candidate without editing the file.
- If no applicable `DESIGN.md` is found, inspect the applicable `README.md` and `AGENTS.md` files for references to design rules, a style guide, brand guidance, UI documentation, or another authoritative file. Read any referenced guidance before making visual decisions.
- If those files do not identify further design guidance, reuse the project's established patterns. When no established pattern covers a required decision, use a small, coherent set of tokens and state assumptions; do not invent a brand system or create `DESIGN.md` merely because it is absent.
- If the user asks to create `DESIGN.md`, follow the current official [DESIGN.md specification](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md). The specification is alpha and evolving, so verify the current schema and CLI before writing version-specific rules.

A new `DESIGN.md` uses optional YAML front matter for machine-readable tokens and Markdown for rationale. Include only applicable sections, preserving the official order: Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, and Do's and Don'ts. Preserve unknown valid sections when editing an existing file.

When the CLI is available or its use is authorized, validate a new or changed file without adding project dependencies or lockfiles solely for validation:

```bash
npx @google/design.md lint DESIGN.md
```

## Implement in the existing stack

For create or edit mode:

1. Confirm the requested pages, content, interactions, states, responsive targets, and definition of done.
2. Follow the applicable `DESIGN.md` and reuse existing components, tokens, styles, and application patterns before adding new ones.
3. Implement only behavior supported by the requested scope and real product requirements. Do not add a framework, replace the current stack, introduce deployment configuration, or invent backend behavior without authorization.
4. Keep presentation, interaction, and state responsibilities clear in the conventions of the current stack.
5. Render the result when possible and verify the requested behavior and affected states. In full workflow mode, apply the audit rubric, correct in-scope findings, and verify again. In create or edit mode, fix regressions caused by the change but do not expand into unrelated audit findings.

Read and follow [Page metadata and indexing](references/page-metadata-and-indexing.md) when the task does any of the following:

- creates or replaces a page, route, document shell, or public landing page;
- changes its title, description, document language, canonical or public URL, social preview, structured data, locale alternatives, public or authenticated status, or crawler directives;
- includes SEO, discoverability, sharing, indexing, or page-level release-readiness review.

Apply that reference through the project's existing framework, router, document-shell, response-header, or HTML conventions. Do not load it for an isolated component change with no page-level effect or for a visual review that excludes page metadata and discoverability.

When the task uses framework-free static HTML, CSS, and JavaScript, read and follow [Static web implementation](references/static-web.md). Do not load that reference for framework-based implementation or review-only work where its file-specific rules do not apply.

## Audit the rendered interface

In review mode and full workflow mode, inspect the running interface at a narrow mobile viewport and a wide desktop viewport. Supplied screenshots may be used when a running interface is unavailable. Review implementation details when they are in scope. Record each finding with the affected element or screen, observed problem, user impact, severity, and recommended change.

If the interface cannot run, inspect the available screenshots and implementation, identify which runtime behavior could not be observed, and do not claim those checks passed. If only one viewport is available, limit conclusions to that viewport and report the other as unverified. If no rendered evidence is available, provide an implementation-based review with explicit limitations and request additional artifacts only when they are necessary to answer the user's request.

| Area | Look for | Improve toward |
| --- | --- | --- |
| Purpose and hierarchy | unclear purpose, competing headings, equally weighted sections, buried primary action | one clear promise, scannable sections, visible primary action |
| Content and copy | vague claims, placeholder-like text, repeated buzzwords, generic control labels | specific claims, meaningful labels, task-oriented actions |
| Brand and differentiation | interchangeable visual treatments, unrelated imagery, decorative product fiction | product-relevant content, restrained systems, choices grounded in the brand |
| Layout and typography | excessive empty space, long measures, weak grouping, inconsistent type or spacing | readable measure, intentional density, consistent rhythm and grouping |
| Interaction and states | decorative controls, unclear affordances, missing hover, focus, disabled, loading, empty, or error states | predictable controls and complete states for real user paths |
| Accessibility | insufficient contrast, ambiguous icons, missing labels, keyboard traps, invisible focus, excessive motion | semantic controls, keyboard operation, visible focus, adequate contrast, reduced motion |
| Responsive behavior | desktop layout merely shrunk, clipped content, overflow, small targets, broken reading order | mobile-first priority, comfortable targets, stable order, no unintended overflow |
| Performance and resilience | oversized assets, unnecessary animation, layout shift, crucial content dependent on decoration | purposeful assets, restrained motion, stable layout, useful fallbacks |

Use these severities:

1. **Blocker** — prevents task completion, comprehension, keyboard access, or essential content access.
2. **High** — materially damages trust, comprehension, conversion, or mobile usability.
3. **Medium** — weakens clarity, consistency, or perceived quality.
4. **Low** — polish that does not change task success.

In review mode, prioritize blocker and high-impact structural findings before visual polish. In a mode that authorizes changes, fix those issues before colors, shadows, gradients, illustration style, or micro-animation. Keep every change tied to an observed finding.

## Content integrity

- Make the information architecture, concrete capability, conditions, and primary action clear before styling details.
- Every section must answer a user question, provide evidence needed for a decision, or advance a relevant next action. Merge or remove sections that do none of these.
- Do not add feature grids, FAQs, newsletters, testimonials, logo walls, comparison tables, or blog previews merely because they are common page patterns.
- Do not invent statistics, customer quotes, company logos, ratings, customer totals, case-study outcomes, awards, pricing, integrations, certifications, guarantees, or live-activity notices.
- Do not manufacture urgency with unsupported deadlines, stock claims, countdowns, visitor counts, or similar pressure devices.
- Do not create decorative dashboards, notifications, chats, code editors, analytics panels, or product screenshots that imply capabilities, workflows, or data the product does not have.
- Use supplied or genuinely available data for metrics, charts, and trend lines. Connect each visualization to a metric definition, time range, source, and intended decision. Clearly label demo, sample, or seed data.
- When real data is absent, design an honest empty state that explains what will appear and offers a relevant next action instead of fabricating rows, alerts, metrics, or charts.
- Avoid unsupported jargon and superlatives. Describe the concrete mechanism or user outcome in plain language.

## Interaction, accessibility, and responsive behavior

- Use semantic controls and native behavior where possible. Do not solve accessibility with visual-only changes.
- Do not present search, filters, sorting, tabs, pagination, or view toggles as interactive unless their documented behavior works in the delivered scope. Otherwise label the concept clearly or omit the control.
- Request notifications, location, camera, microphone, contacts, or similar permissions only after the user initiates the feature that needs them. Explain the purpose and provide an alternative when feasible.
- Ask forms only for information needed by the current task. Mark required and optional fields, use appropriate types and autocomplete, and provide actionable inline errors.
- Make automatic or manual saving behavior visible. Show unsaved, saving, success, and failure states accurately and preserve user input when feasible.
- Protect consequential actions such as deletion, cancellation, publishing, payment, or permission changes with clear consequences and appropriate confirmation, undo, recovery, and result feedback.
- Preserve keyboard operation, visible focus, adequate contrast, readable order, comfortable touch targets, and `prefers-reduced-motion`.
- Test realistic content lengths and complete loading, empty, error, disabled, and success states rather than only an ideal placeholder state.

## Visual quality and localization

- Establish hierarchy with grouping, spacing, size, and weight before relying on color or typeface changes. Never use color alone to communicate meaning.
- Give accent colors, icons, badges, callouts, elevation, imagery, and motion a limited, repeatable role tied to hierarchy, task completion, state, or the approved brand system.
- Remove or merge elements before adding decoration. Do not repeat the same emphasis through several visual devices.
- Respect the existing design system. Without a brand or product reason for another treatment, prefer a neutral white- or black-based page background over decorative color, texture, or gradients.
- Use gradients only when they serve a defined brand, grouping, state, depth, or lighting role. Verify text contrast, legibility, supported color modes, and target-device rendering.
- Reuse existing tokens. When none exist, create a small consistent set for color, typography, spacing, radii, and elevation within the authorized implementation.
- Before adding a font, verify its license, delivery terms, character coverage, weights, external-request constraints, and performance impact. Keep an appropriate system-font fallback.
- Prefer real product captures, content, and meaningful states over generic decorative imagery.
- For Korean-language interfaces, write navigation, buttons, labels, status messages, and help text in natural Korean. Keep English for proper nouns, code, established product names, or terms that are clearer for the intended users.
- Present dates, times, time zones, currency, numbers, and units in the user's locale and the product's real context. Do not silently convert or relabel source values.
- When generating images for a Korean interface, avoid embedded Korean text when possible. Put exact copy in semantic UI text; if image text is unavoidable, use an approved source or deterministic typesetting and inspect the final rendering.
- Read and follow [Korean service disclosures](references/korean-service-disclosures.md) when the current task affects a Korean-facing service's data collection or consent, account creation or deletion, checkout or purchase, subscription, cancellation or refund, footer or policy navigation, or release-readiness review, and the service may handle personal data, create accounts, sell directly to consumers, or use recurring billing. Do not load it for an unrelated marketing, visual, or component change that does not affect those flows or the visibility of their disclosures.

## CSS baseline

Before adding or changing global styles, check for an existing framework reset, design-system baseline, component-library baseline, or CMS stylesheet. Do not layer another global reset over one that already exists. If no suitable baseline exists and a reset is in scope, use [CSS baseline reset](references/css-reset.md) and restore meaningful list markers within content scopes.

## Verify and report

After edits, inspect the rendered result at the target mobile and desktop widths when the environment and available artifacts permit it. Verify the main task, reading order, keyboard navigation, visible focus, contrast, text overflow, touch targets, and all states affected by the change. For Korean interfaces, also check line breaks, punctuation, mixed-script rendering, locale formatting, and generated-image text. Run the project's relevant lint, test, build, or browser checks. If a check cannot run because the executable environment, required data, or viewport evidence is unavailable, name the omitted check and remaining risk instead of implying success.

Report concisely:

1. the highest-impact findings, with evidence;
2. in review mode, the recommended changes and expected user impact; in a mode that authorizes changes, what changed and the user problem each change addresses;
3. checks performed and remaining risks or assumptions.

Do not call an interface complete merely because it is more visually distinctive. It is complete when its purpose, content, interaction, accessibility, responsive behavior, and implementation are coherent for the intended user.
