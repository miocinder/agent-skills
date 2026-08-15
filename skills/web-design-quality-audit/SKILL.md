---
name: web-design-quality-audit
description: Audit and improve web interfaces that feel generic, AI-generated, or "AI slop." Use when reviewing a landing page, product UI, or mockup for weak hierarchy, generic visual conventions, vague copy, inaccessible interactions, or incomplete responsive and state design.
---

# Web Design Quality Audit

Turn a superficially polished web interface into a deliberate, usable one. Do not infer or claim that a design was made by AI. Treat "AI slop" as a shorthand for observable quality problems, not a provenance judgment.

## Default authority

Unless the user explicitly asks to create, edit, fix, or implement changes, perform an evaluation only. Inspect the rendered interface and relevant implementation, report evidence-backed findings with priorities and recommendations, and do not modify code, copy, design files, assets, or project configuration. A request for review, audit, assessment, diagnosis, feedback, or suggestions does not authorize edits.

## Start with context

Before judging or editing, identify:

- the primary user and the one task they need to complete;
- the page or product goal, conversion event, and success criteria;
- the product's real content, constraints, brand guidance, and existing design system;
- the target viewport(s), supported devices, and implementation scope.

Read an applicable `DESIGN.md`, product brief, component library, and existing UI patterns before proposing a new visual direction. Preserve intentional brand choices. If essential context is missing, state the assumption and make reversible, low-risk improvements rather than inventing a brand or product strategy.

## Audit the rendered interface

Inspect the running interface or supplied screenshots at a narrow mobile viewport and a wide desktop viewport. Review the implementation too when it is in scope. Record findings with evidence: element or screen, observed problem, user impact, severity, and recommended change.

Use this rubric. A single trendy visual treatment is not a defect by itself; it is a concern only when it obscures purpose, hierarchy, or usability.

| Area | Look for | Improve toward |
| --- | --- | --- |
| Purpose and hierarchy | unclear page purpose, competing headings, equally weighted cards, primary action buried below decoration | one clear page promise, scannable sections, visible primary action |
| Content and copy | generic claims, placeholder-like text, repeated buzzwords, controls labeled only “Learn more” or “Get started” | specific claims, meaningful labels, concise task-oriented calls to action |
| Brand and differentiation | interchangeable gradients, stock-like imagery, decorative 3D objects, visual motifs unrelated to the product | product-relevant content, a restrained visual system, distinctive choices backed by the brand |
| Layout and typography | oversized hero copy, excessive empty space, long line lengths, weak grouping, inconsistent spacing or type scale | readable measure, intentional density, consistent rhythm, clear grouping |
| Visual signals | accent colors, icons, badges, callouts, or emphasis applied so broadly that priority and meaning become unclear | a limited, consistent signal system in which emphasis communicates a defined purpose or state |
| Service disclosures | when a Korean-facing service draft is in scope, relevant business identity, terms, privacy, subscription, cancellation, or refund information removed, hidden, misleading, or absent | accessible disclosures and flows that match the service's actual market, data handling, and sales model |
| Interaction and states | decorative controls, unclear affordances, missing hover/focus/disabled/loading/empty/error states | predictable controls and complete states for the paths users can take |
| Accessibility | insufficient contrast, icon-only ambiguity, missing names/labels, keyboard traps, focus not visible, motion without reduction | semantic controls, keyboard operation, visible focus, adequate contrast, reduced-motion support |
| Responsive behavior | desktop layout merely shrunk, clipped content, horizontal overflow, touch targets too small, changed reading order | mobile-first priority, no unintended overflow, comfortable targets, stable reading order |
| Performance and resilience | oversized assets, unnecessary animation, layout shift, crucial content dependent on an image or script | purposeful assets, restrained motion, stable layout, useful content and fallback states |

## Prioritize before editing

Classify every finding:

1. **Blocker** — prevents task completion, comprehension, keyboard access, or essential content access.
2. **High** — materially damages trust, comprehension, conversion, or mobile usability.
3. **Medium** — weakens clarity, consistency, or perceived quality.
4. **Low** — polish that does not change task success.

Fix blockers and high-impact structural issues before color, shadows, gradients, illustration style, or micro-animation. Do not replace the whole design merely to make it look less familiar. Keep changes tied to a recorded finding.

## Improve deliberately

- Make the information architecture and primary action clear before styling details.
- Make deliberate visual choices: each use of emphasis, color, type, spacing, imagery, iconography, or motion should have a clear role in hierarchy, task completion, state communication, or the approved brand system.
- Establish hierarchy with grouping, spacing, size, and weight before relying on color or typeface changes. Do not use color alone to communicate importance or meaning.
- Assign accent color a limited, repeatable role. Preserve distinct, accessible semantic colors for states such as success, warning, and error, and respect an approved brand system.
- Remove or merge elements before adding new decoration. Retain a decorative element only when it orients the user, explains content, communicates state, or supports the task.
- Replace vague copy with product-true, user-oriented language that identifies the concrete capability, condition, or user outcome when known. Never invent statistics, customer quotes, pricing, integrations, certifications, or guarantees.
- Avoid unsupported jargon and superlatives such as “innovative,” “AI-powered,” “enterprise-grade,” “next-generation,” “perfect security,” or precise performance claims. Use them only when the product capability and supporting evidence are available; otherwise describe the concrete user outcome or mechanism in plain language.
- For Korean-language interfaces, write visible navigation, buttons, form labels, status messages, and help text in natural Korean by default. Keep English only for established product names, proper nouns, code, or terminology whose English form is clearer for the intended users. Do not mix Korean and English merely for a fashionable tone.
- For interfaces intended for Korean users, present dates, times, time zones, currency, numbers, and measurement units in Korean conventions and the product's real context. Make the displayed time zone explicit when it matters, preserve the source data's time zone correctly, and do not silently convert or relabel dates and amounts. Use a different locale only when the user's preference, content, or product requirement calls for it.
- When creating, reviewing, or revising a Korean-facing service draft that may handle personal data, create accounts, sell directly to consumers, or use recurring billing, read and follow [Korean service disclosures](references/korean-service-disclosures.md).
- Reduce visual noise: avoid repeating the same emphasis through color, badges, icons, callouts, or animation once its meaning is already clear.
- When no brand, product, or user direction calls for another treatment, use a neutral white- or black-based page background. Do not introduce a colored, textured, or gradient page background merely to create visual interest. Respect an existing design system and support both light and dark backgrounds only when the product requires them.
- Use gradients only when they serve a specific role in the brand system, information grouping, state communication, or depth and lighting. Do not use them as default background decoration, CTA emphasis, card differentiation, or merely to make a page appear modern. When a gradient is used, verify text contrast, legibility, dark-mode behavior when supported, and rendering on target devices.
- Use a small token set for color, type, spacing, radii, and elevation. Reuse existing tokens when available.
- For Korean-language interfaces without an existing font decision, use a Korean webfont licensed for the project's intended use and delivered in a way that fits the project, such as a CDN, a package, or local self-hosting. Before adding it, verify the font license, delivery terms, character coverage, weight availability, external-request constraints, and performance impact. Use a complete system-font fallback stack and load only the required weights and subsets. Do not replace a project-supplied licensed font without a reason.
- Prefer product screenshots, real data, and meaningful empty/loading/error content over generic decorative imagery.
- Do not invent social proof. Customer quotes, company logos, ratings, review counts, customer totals, case-study outcomes, awards, and live-activity notices require a supplied, approved, and supportable source. If no such proof is available, omit the section or use a clearly identified placeholder only when the user asks for a draft.
- Do not manufacture urgency. Countdown timers, deadline notices, limited-stock claims, visitor counts, and “people are viewing this” messages require a real, current, and supportable basis. Do not use them solely to pressure action; when a genuine deadline or availability constraint exists, explain it accurately.
- Do not add feature-card grids, FAQs, newsletter sign-ups, testimonial sections, logo walls, comparison tables, or blog previews merely because they are common landing-page sections. Include each only when it serves a documented user question, decision, or next action in the current page.
- Do not create decorative product screenshots, admin dashboards, notifications, chat threads, code editors, or analytics panels that imply capabilities, workflows, or data the product does not have. Use supplied product captures or implement only screens that match documented functionality. Mark illustrative concepts clearly when they are intentionally non-functional.
- Design honest empty states before filling space with sample content. When real data is absent, explain the state in plain language, say what will appear there, and offer a relevant next action when one exists. Do not disguise an empty state with fabricated rows, alerts, activity, metrics, or charts. Clearly label seed, demo, and sample data whenever it is intentionally shown.
- Do not present search fields, filters, sort controls, tabs, pagination, or view toggles as interactive when they do not work in the delivered scope. Either implement their documented behavior, present them as clearly non-interactive in an explicitly labeled concept, or omit them.
- Do not add charts, metrics, trend lines, or dashboard sections merely to make an interface appear data-driven. Add a visualization only when supplied or genuinely available data answers a defined user question or supports a real decision in the product. Tie every chart to its metric definition, time range, source, and intended action. When designing an example or demo, label sample data clearly and do not imply that it is live, customer, or product data. If no real data use case exists, omit the chart and use the space for relevant content, a meaningful empty state, or nothing.
- Request device or browser permissions such as notifications, location, camera, microphone, or contacts only after the user initiates the feature that needs them. Before the system prompt, explain what the permission enables and offer a meaningful alternative when feasible. Do not request unrelated permissions on page load or repeatedly pressure a user who declined.
- Reduce form burden: ask only for information necessary for the current task; mark required and optional fields clearly; use appropriate input types, labels, autocomplete, and examples; and explain validation errors beside the affected field in actionable language. Do not create fields merely to make a form appear complete.
- When generating images for a Korean-language webpage, prompt for images without Korean text, lettering, labels, signs, or UI copy whenever possible. Put Korean copy in semantic HTML/CSS instead, so it remains accurate, selectable, localizable, accessible, and responsive. If text must be part of an image (for example, an archival source or a fixed brand asset), use an approved source asset or add the exact text in a separate deterministic typesetting step; visually verify the final Korean rendering before use.
- Preserve semantic HTML and native controls where possible. Do not solve accessibility with visual-only changes.
- Respect `prefers-reduced-motion`; avoid continuous or attention-seeking animation unless it communicates changing state.
- Make saving behavior visible. Tell users whether changes save automatically or require an explicit action, indicate unsaved changes and in-progress saves when relevant, and show a clear success or failure result. Do not imply that data is saved before the write succeeds; preserve or offer recovery for unsaved input when feasible.
- Protect consequential actions such as deleting data, canceling a subscription, publishing, submitting payment, or changing permissions. State the target and consequence clearly before confirmation; provide an appropriate confirmation, undo, or recovery path where feasible; and show an unambiguous success or failure result. Avoid confirmation dialogs for harmless, reversible actions.
- When changing layout, verify content at realistic lengths rather than only placeholder copy.
- Give every page section a clear job: answer a user question, provide evidence needed for a decision, or advance a relevant next action. Merge or remove sections that cannot meet one of these purposes instead of retaining them as visual filler.

## CSS baseline

When implementing a new interface or normalizing global styles, first check for an existing framework reset, design-system baseline, or project convention. Do not layer a second global reset over one that already exists. If the project has no suitable baseline, use the [CSS baseline reset](references/css-reset.md). It resets list markers intentionally, so restore meaningful ordered and unordered lists explicitly within content scopes such as `.prose`.

## Verify and report

After edits, inspect the rendered result again at the target mobile and desktop widths. Verify the main task, reading order, keyboard navigation, visible focus, contrast, text overflow, touch targets, and all states affected by the change. For Korean-language interfaces, also check Korean line breaks, punctuation, mixed-script rendering, that English UI labels have not replaced clear Korean equivalents, dates, time zones, currency, numbers, and units, and that generated images contain no unintended or garbled Korean text. When the interface is a service draft within the scope of [Korean service disclosures](references/korean-service-disclosures.md), confirm that applicable disclosures were preserved and that any concept placeholders are clearly labeled and non-deceptive. Run the project's existing lint, test, or build checks when relevant.

Report concisely:

1. the highest-impact issues found, with evidence;
2. what changed and the user problem each change addresses;
3. checks performed and any remaining risks or assumptions.

Do not call a design "fixed" solely because it is more visually distinctive. It is successful when its purpose, content, interaction, accessibility, and responsive behavior are coherent for the intended user.
