---
name: obsidian-cli
description: Read from or write to an Obsidian vault through the official Obsidian CLI. Use when the user asks to operate an Obsidian vault, or when applicable project instructions explicitly require recording task information in Obsidian.
---

# Obsidian CLI

Use the official `obsidian` CLI to read, search, create, or append notes in an Obsidian vault. This skill is appropriate only when the user explicitly requests Obsidian work or an applicable project instruction clearly requires a record in Obsidian.

## Authority and boundaries

1. Treat a project instruction such as “record the final decision in Obsidian” as authorization only for the stated record. It does not authorize browsing, summarizing, or modifying unrelated notes.
2. Before writing, identify the target vault and target directory (a vault-root-relative path) from the user request or project instructions. If no vault is provided, run `obsidian vaults` to list known vault names, present those names as candidates, and ask the user to choose one. Do not use `verbose`, which can reveal local paths, and never select a candidate yourself. If the target directory is missing, ask the user to provide it. Do not infer either value from the active vault, Obsidian defaults, or similarly named folders.
3. Record only the necessary, task-relevant content. Never write credentials, tokens, passwords, private keys, personal contact details, or other sensitive data unless the user specifically requests it and has provided a safe destination.
4. Preserve the user’s existing note structure and frontmatter. Append to an existing note unless the instruction explicitly calls for a new note or a replacement.
5. Do not use `overwrite` unless the user explicitly asks to replace the existing note. Do not use `eval` or developer commands for ordinary note work.
6. Read-only requests do not authorize writes. Report the result without changing the vault.

## Prerequisites

The official CLI requires an Obsidian 1.12.7+ installer and a running Obsidian desktop app. The first CLI command attempts to launch Obsidian when it is not already running, but this can fail; when the CLI reports that it cannot find Obsidian, ask the user to open the desktop app and its intended vault before retrying. Do not substitute direct filesystem editing.

1. In Obsidian, enable **Settings → General → Command line interface**, complete CLI registration, and restart the terminal.
2. Verify availability before the first operation in a session:

   ```powershell
   obsidian version
   obsidian help
   ```

3. In a sandboxed agent environment, `obsidian version` can report that it cannot find Obsidian even when the desktop app is running. This indicates that the sandbox may block the CLI’s connection to the GUI app. Retry the same command outside the sandbox with the required user approval before treating the app as unavailable.
4. If the command still cannot find Obsidian outside the sandbox, ask the user to open the desktop app and its intended vault. Do not silently edit Markdown files as a substitute, unless the user explicitly authorizes direct filesystem editing.

## Targeting a vault and file

Always pass the vault explicitly for automation initiated by instructions. `vault=<name-or-id>` must be the first parameter. Prefer an exact `path` from the vault root over `file`, which resolves like a wikilink and can be ambiguous.

```powershell
# Read an exact note
obsidian vault="Personal" read path="Projects/Alpha/decision-log.md"

# Search only the named vault
obsidian vault="Personal" search query="Alpha launch"
```

When a project instruction provides a vault name, keep it in that project’s `AGENTS.md`; do not add a personal vault name to this reusable skill.

## Safe write workflow

1. Verify the intended vault and target directory. If no vault was supplied, list candidates with `obsidian vaults` and obtain the user's selection. If the directory was not explicitly supplied, stop and ask the user before composing or writing a note.
2. For an existing note, read it first when preserving its structure or avoiding duplicate entries matters.
3. Compose concise Markdown with a clear heading, date when relevant, and source/context sufficient to understand the record later.
4. Append or create with an explicit vault and path.
5. Read the affected note again and verify that the expected content is present.
6. Report the vault, note path, and the type of change made. Do not expose unrelated note contents.

### Append to an existing note

```powershell
obsidian vault="Personal" append path="Projects/Alpha/decision-log.md" content='\n## 2026-08-15 — 배포 결정\n\n- 승인: 운영 환경 배포 진행\n- 근거: 회귀 테스트 통과\n'
```

### Create a new note

```powershell
obsidian vault="Personal" create path="Projects/Alpha/2026-08-15-release.md" content='# 배포 기록\n\n- 상태: 완료\n'
```

## Windows multiline content

The CLI accepts literal `\n` as a newline. In PowerShell, wrap a multiline `content` value in single quotes so the literal backslash reaches the CLI, which then converts it to a newline. Quote parameter values whenever they contain spaces or Markdown punctuation that the shell could interpret.

Do not pass multiline content through `cmd.exe /c`. Its quoting and escaping can corrupt `\n` and result in a note containing only a backslash. Use PowerShell directly, then read the note immediately after writing to verify the rendered Markdown.

## Project-instruction pattern

Use a precise project-level rule to decide *when* this skill applies. For example:

```markdown
## Obsidian 기록

- 사용자가 “기록해”, “회고 남겨”라고 요청하거나 작업에서 확정된 의사결정·후속 할 일이 생기면, 완료 보고 전에 `obsidian-cli` 스킬을 사용해 `Work/Project Alpha/log.md`에 요약을 추가한다.
- 기록 전에는 `vault="Personal"`과 대상 경로를 명시하고, 기록 후에는 해당 노트를 다시 읽어 반영 여부를 확인한다.
- 비밀값, 개인식별정보, 원문 대화 전문은 기록하지 않는다.
```

Adjust the trigger, vault, target path, and record format for each project. Keep the trigger narrow enough that routine implementation details do not create unwanted notes.

## Troubleshooting

- Run `obsidian help <command>` for the exact parameters supported by the installed version.
- If the wrong vault would be selected, stop and request the exact vault name or ID.
- If Obsidian starts but the command fails, wait for the app to finish launching and retry once; then report the error rather than guessing.
- Use `--copy` on read or search commands only when copying the result to the local clipboard is requested.
