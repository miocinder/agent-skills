# obsidian-cli

Obsidian 데스크톱 앱의 공식 CLI를 이용해 볼트의 노트를 읽고, 검색하고, 만들고, 기존 노트에 내용을 추가하는 공통 스킬입니다.

사용자가 Obsidian 작업을 직접 요청했거나 프로젝트의 `AGENTS.md`가 특정 결과를 Obsidian에 남기도록 정한 경우에 사용합니다. 볼트가 빠졌다면 `obsidian vaults`로 알려진 볼트의 이름만 후보로 제시하고 사용자에게 선택을 요청합니다. 후보 중 하나를 임의로 선택하지 않으며, 로컬 경로를 노출하는 `verbose` 옵션도 쓰지 않습니다. 저장 디렉터리(볼트 루트 기준 경로)가 빠졌다면 활성 볼트나 기본 위치를 추정하지 않고 명시적으로 물어봅니다. 기본 동작은 기존 노트에 추가하는 방식이며, 기존 내용을 덮어쓰거나 관련 없는 노트를 탐색하지 않습니다.

## 준비

Obsidian 1.12.7 이상 설치본에서 **Settings → General → Command line interface**를 켠 뒤, 화면 안내에 따라 CLI를 등록합니다. 등록 뒤 터미널을 다시 열고 아래 명령으로 확인합니다.

```powershell
obsidian version
obsidian help
```

Obsidian 앱은 실행 중이어야 합니다. 앱이 꺼져 있다면 첫 CLI 명령이 앱을 열 수 있습니다.

에이전트 실행 환경의 샌드박스가 Obsidian 데스크톱 앱과 CLI의 연결을 차단할 수 있습니다. 앱이 실행 중인데도 `The CLI is unable to find Obsidian` 오류가 난다면, 사용자 승인을 받은 뒤 동일 명령을 샌드박스 밖에서 다시 실행해 확인합니다. 그래도 실패하면 사용자가 앱과 대상 볼트를 열어야 하며, 직접 파일 편집으로 우회하지 않습니다.

## 프로젝트 지시문 예시

프로젝트별 `AGENTS.md`에는 언제 기록할지를 구체적으로 적습니다.

```markdown
## Obsidian 기록

- 사용자가 “기록해”, “회고 남겨”라고 요청하거나 작업에서 확정된 의사결정·후속 할 일이 생기면, 완료 보고 전에 `obsidian-cli` 스킬을 사용해 `Work/Project Alpha/log.md`에 요약을 추가한다.
- 기록 전에는 `vault="Personal"`과 대상 경로를 명시하고, 기록 후에는 해당 노트를 다시 읽어 반영 여부를 확인한다.
- 비밀값, 개인식별정보, 원문 대화 전문은 기록하지 않는다.
```

위 예시의 볼트 이름과 경로는 실제 환경에 맞게 바꿔야 합니다. 재사용 스킬 자체에는 개인 볼트 이름이나 절대 경로를 넣지 않습니다.

## 기본 명령 예시

```powershell
# 정확한 경로의 노트 읽기
obsidian vault="Personal" read path="Projects/Alpha/log.md"

# 기존 노트에 요약 추가
obsidian vault="Personal" append path="Projects/Alpha/log.md" content='\n## 2026-08-15\n\n- 결정: 배포 진행\n'

# 새 노트 만들기
obsidian vault="Personal" create path="Projects/Alpha/release.md" content='# 배포 기록\n'
```

자동화에서는 활성 볼트에 의존하지 말고 `vault=<이름 또는 ID>`와 `path=<볼트 루트 기준 경로>`를 명시하는 것을 권장합니다.

## Windows의 여러 줄 내용

여러 줄은 CLI가 해석하는 문자 `\n`으로 전달합니다. PowerShell에서는 `content` 값을 작은따옴표로 감싸야 `\n`이 그대로 CLI에 전달됩니다.

```powershell
obsidian vault="Personal" create path="Projects/Alpha/release.md" content='# 배포 기록\n\n- 상태: 완료\n'
```

`cmd.exe /c`로 여러 줄 내용을 전달하면 인용·이스케이프 과정에서 `\n`이 손상될 수 있으므로 사용하지 않습니다. 기록 뒤에는 반드시 해당 노트를 다시 읽어 저장 내용을 확인합니다.
