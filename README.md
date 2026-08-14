# 개인용 Agent Skills

이 저장소는 다양한 반복 업무에 사용하기 위해 관리하는 개인용 에이전트 스킬 모음입니다. **한국어를 기본 언어로 관리**하고, **Codex를 주 실행 환경으로 사용**합니다. 필요에 따라 공개하지만 특정 팀이나 범용 제품을 위한 공식 스킬 컬렉션은 아닙니다.

## 면책 안내

이 저장소의 스킬과 예시는 별도의 품질 보증 없이 제공됩니다. 사용자는 자신의 환경과 목적에 맞는지 직접 검토하고, 실행·수정·배포에 따른 위험과 책임을 부담합니다. 이 저장소의 작성자는 스킬 사용 또는 사용 불가로 발생할 수 있는 직간접적 손해에 대해 책임을 지지 않습니다.

## 설치

```bash
# 포함된 스킬 목록 보기
npx skills add miocinder/agent-skills --list

# Codex에 전역 설치
npx skills add miocinder/agent-skills --agent codex --global
```

## 업데이트

`npx skills`로 설치한 스킬은 원본 저장소와 스킬 경로를 추적할 수 있을 때 업데이트할 수 있습니다.

```bash
npx skills update <skill-name>  # 특정 스킬만 업데이트
npx skills update               # 설치된 스킬 전체 업데이트
npx skills update -g            # 전역 설치 스킬만 업데이트
npx skills update -p            # 프로젝트 설치 스킬만 업데이트
```
