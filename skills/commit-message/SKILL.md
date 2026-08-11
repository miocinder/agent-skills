---
name: commit-message
description: Analyze Git changes and write Korean Conventional Commit messages with a required body. Use when the user asks for a commit-message recommendation, commit plan, staging, or commit.
---

# Commit Message

Create focused commits whose messages describe the actual changes. Write the subject and body in Korean; write the type and optional scope in lowercase English.

## Authority and scope

1. Read repository instructions and inspect `git status --short`, unstaged changes, staged changes, and relevant untracked files. Do not assume every worktree change belongs to the request.
2. Do not change Git state unless the user explicitly asks to `stage`, `commit`, `스테이징`, or `커밋`. Otherwise, only recommend a message that matches the changes.
3. A staging request authorizes index changes only. A commit request authorizes staging only the changes needed for that commit and creating one new commit.
4. Recommend separate commits when independent intents can be safely separated.
5. Before committing, run checks appropriate to the repository instructions. Do not bypass hooks or checks.
6. When authorized, stage explicit paths or hunks, run `git diff --cached --check`, inspect the complete staged diff, and commit only when it matches the message.
7. Do not amend, rebase, reset, discard changes, tag, push, or publish unless separately and explicitly requested.

## Message format

```text
<type>[(scope)]: <Korean summary>

<Korean body explaining what changed and why>
<Add one line for impact or verification when useful>
```

- Write a concise one-line Korean subject without a final period.
- Always include a body. Explain the change and its reason in one to three sentences; do not repeat a list of filenames.
- Add impact, compatibility, or verification details in the body when useful.
- Do not use footers.
- Use a scope only when a stable component name adds context, such as `readme`, `github-social-preview`, or `ci`. Omit it for repository-wide changes.
- Preserve canonical identifiers, paths, filenames, commands, and API names.

## Types

When the repository has no additional rules, choose the type that best matches the primary intent.

| Type | Use when |
| --- | --- |
| `feat` | Adding a new capability, behavior, API, or skill |
| `fix` | Correcting incorrect behavior, a defect, security issue, or regression |
| `docs` | Changing documentation only, with no code or behavior change |
| `style` | Changing formatting, whitespace, or punctuation without behavior changes |
| `refactor` | Restructuring implementation without adding a feature or fixing behavior |
| `perf` | Improving performance without changing intended behavior |
| `test` | Adding or correcting tests without changing production behavior |
| `build` | Changing the build system, packaging, dependencies, or lockfiles |
| `ci` | Changing CI configuration, workflows, or CI-only automation |
| `chore` | Repository maintenance that fits no more specific type |
| `revert` | Intentionally reverting an earlier commit |

- Choose by intent, not by file extension.
- Prefer `feat` for a new user-visible behavior or skill.
- Prefer `fix` over `refactor` when correcting observable incorrect behavior.
- Do not use `chore` as a default.

## Recommendations and completion reports

- For a message-only request, provide the complete ready-to-use message in one code block and clearly state that Git state was not changed.
- After staging or committing, report the checks run, commit hash, subject, and remaining changes concisely.
- If existing staged changes and the requested scope are mixed, clarify the boundary before changing the index.
