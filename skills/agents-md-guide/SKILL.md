---
name: agents-md-guide
description: Create, review, or improve a repository-root AGENTS.md and proactively identify durable project rules worth recording. Use when the user asks for agent instructions, AGENTS.md guidance, or a distinction between project instructions and reusable skills, and when project work reveals a persistent repository-specific rule that future agent sessions should know.
---

# AGENTS.md Guide

Help maintain concise, repository-specific instructions that make future agent sessions safer and more consistent. Treat `AGENTS.md` as a short entry point for durable rules, not as a complete project manual.

## Authority and write boundary

1. Proactively identify durable project knowledge during relevant work, but do not change `AGENTS.md`, linked documents, or directories unless the user explicitly asks to create, edit, update, or add them.
2. A request that conflicts with an existing project rule is a task-scoped exception when the user explicitly requests it. Do not record that exception as a lasting rule or assume it supersedes the existing documentation.
3. If a requested exception creates a security, legal, privacy, or data-loss risk, explain the conflict and request direction before proceeding.
4. When only reviewing, analyzing, or recommending, report findings without modifying files.

## Root-only discovery

Inspect only the repository root by default. Look for the root `AGENTS.md`, `README.md`, directly linked root-level documents, and root-level configuration that establishes durable project conventions.

- Do not recursively search subdirectories for instructions, documentation, or configuration.
- Do not propose or create nested `AGENTS.md` files unless the user explicitly identifies the relevant path or asks for a subdirectory review.
- Follow the root document's existing links, paths, terminology, and document structure when they are relevant.

## What belongs in AGENTS.md

Recommend concise rules that future agents need across sessions, such as:

- repository purpose, supported environment, and durable technical constraints;
- canonical setup, development, test, build, lint, and verification commands;
- code, documentation, and language conventions;
- Git, review, release, security, privacy, licensing, and approval boundaries;
- project-specific pitfalls, prohibited actions, and scope boundaries;
- pointers to detailed project documentation.

Do not recommend one-off task context, temporary status, volatile ownership information, secrets, personal data, local absolute paths, or lengthy material that is already maintained elsewhere.

## Separate detailed documentation and reusable skills

Keep `AGENTS.md` concise. When a rule needs substantial explanation, background, examples, or a multi-step operational procedure, place the details in an existing referenced document and link to it from `AGENTS.md`.

- Preserve an established documentation location and linking style when one exists.
- If no suitable location exists, recommend a location that fits the root's existing documentation structure. Do not invent a new directory or create files without explicit authorization.
- Recommend a reusable skill rather than project documentation when the procedure is portable across repositories and applies only to a particular type of task.
- Do not duplicate rules already documented in the root instructions or their referenced documentation. A candidate is worth reporting only when it is absent, materially incomplete, or placed where future agents are unlikely to find it.

## Proactive recommendations

When work reveals a durable, repository-specific rule that is not already documented, include a short final-report section named `지속 지식 후보` with:

- **후보 규칙:** the concise rule to retain;
- **근거:** why future agent sessions need it.

Do not include this section when there is no new candidate. Do not propose a file change merely because a related document exists; suggest only missing, durable information.

## Language and content

Use the language of the repository's existing root documentation. If there is no established documentation language, explain the practical trade-offs of Korean and English and ask the user to choose before drafting or changing persistent instructions.

Write rules as concrete, verifiable directions. Prefer commands, paths relative to the repository, explicit scope, and clear approval boundaries. Avoid generic advice that does not affect how an agent acts in this repository.

## Creation and review workflow

1. Determine whether the user requested review, recommendations, creation, or editing.
2. Inspect the allowed root-level sources and identify existing durable rules and documentation conventions.
3. Classify new findings: retain in `AGENTS.md`, place in detailed documentation, make a reusable skill, or leave undocumented because they are temporary or already covered.
4. For a review or recommendation, report only the findings and `지속 지식 후보` where applicable.
5. For an authorized creation or edit, make the smallest coherent change. Keep `AGENTS.md` scannable and link to details rather than copying them.
6. Before completing an authorized change, verify Markdown structure, every added relative link or path, and that no sensitive or publicly unsuitable information was added. Check for credentials, personal or contact information, local absolute paths, internal domains or URLs, hostnames, and unnecessary generated content.
