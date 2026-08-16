---
name: commit-message
description: Analyze Git changes, run public-repository pre-commit checks, and write Korean Conventional Commit messages with a required body. Use when the user asks for a commit-message recommendation, commit plan, staging, or commit.
---

# Commit Message

Create focused commits whose messages describe the actual changes. Write the subject and body in Korean; write the type and optional scope in lowercase English. Before staging or committing, protect the public repository from sensitive, out-of-scope, or unsuitable files.

## Authority and scope

1. Read repository instructions and inspect `git status --short`, unstaged changes, staged changes, and relevant untracked files. Do not assume every worktree change belongs to the request.
2. Do not change Git state unless the user explicitly asks to `stage`, `commit`, `스테이징`, or `커밋`. Otherwise, only recommend a message that matches the changes.
3. A staging request authorizes index changes only. A commit request authorizes staging only the changes needed for that commit and creating one new commit.
4. Recommend separate commits when independent intents can be safely separated.
5. Before committing, run checks appropriate to the repository instructions, including the public repository pre-commit audit. Do not bypass hooks or checks.
6. When authorized, stage explicit paths or hunks, run `git diff --cached --check`, inspect the complete staged diff, repeat the public repository pre-commit audit, and commit only when it matches the message.
7. Do not amend, rebase, reset, discard changes, tag, push, or publish unless separately and explicitly requested.
8. Create, replace, or repair an `AGENTS.md`/`CLAUDE.md` symbolic link only when the user explicitly requests it. Treat this as an index change; do not overwrite an existing regular file or unrelated staged change without explicit authorization.

## Agent instruction symbolic links

When a user explicitly asks to make `CLAUDE.md` point to `AGENTS.md`, use a Git symbolic-link entry rather than duplicating the instructions. First confirm that the target exists at the requested relative path and inspect the current index and worktree entries for `CLAUDE.md`. If `CLAUDE.md` is an existing regular file, stop and ask whether replacing it is intended.

On Windows, creating an operating-system symbolic link can require permissions. It is acceptable to write the link directly to Git's index instead. In `cmd.exe`, store the exact target-path bytes (without a trailing newline) as a blob, then register it with mode `120000`:

```text
<nul set /p "=AGENTS.md" | git hash-object -w --stdin
git update-index --add --cacheinfo 120000,<blob-id>,CLAUDE.md
```

Use the blob ID printed by the first command in the second command. The blob content must be the relative target path, such as `AGENTS.md`, not that file's contents. Verify the staged entry with `git ls-files -s -- CLAUDE.md` and confirm it has mode `120000`; inspect the complete staged diff before committing. The link does not need updating when `AGENTS.md`'s contents change, but it must be updated if the target is renamed or moved.

## Public repository pre-commit audit

Before staging or committing, inspect the exact files in scope. Before committing, repeat the audit against the complete staged diff. Check for:

- API keys, tokens, passwords, private keys, credentials, and connection strings;
- user names, account details, email addresses, phone numbers, and other personal or contact information;
- local absolute paths, internal domains, private URLs, hostnames, system names, and other internal information;
- generated temporary files, dependency directories, build output, oversized artifacts, and other files that do not belong in the repository;
- third-party images, fonts, code, or other assets whose license, attribution, or permission is unknown;
- changes outside the user's requested scope, including unrelated staged changes.

Use focused pattern checks and manual diff inspection; do not treat an absence of pattern matches as sufficient evidence by itself. Inspect the surrounding context of every potential match so ordinary documentation terms such as `token` or `key` are not reported as secrets.

If the audit finds sensitive or publicly unsuitable content, do not stage or commit that content. Report its file and location, explain the risk, and wait for the user's direction. Do not redact, delete, relocate, or otherwise alter the content unless the user explicitly asks. If existing staged changes are mixed with the requested scope, clarify the boundary before changing the index.

## Message format

```text
<type>[(scope)]: <Korean summary>

<첫 번째 한국어 Body 문장>
<두 번째 한국어 Body 문장>
<필요하면 영향 또는 검증을 설명하는 한 문장>
```

- Write a concise one-line Korean subject without a final period.
- Always include a body. Explain the change and its reason in one to three sentences; do not repeat a list of filenames.
- Put each Body sentence on its own line. Never join multiple sentences into one long Body line.
- Add impact, compatibility, or verification details as a separate Body line when useful.
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
