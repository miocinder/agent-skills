# image-processing

Codex가 생성한 이미지 또는 기존 이미지를 Sharp로 리사이즈, 크롭, 변환, 압축, 메타데이터 제거하는 범용 이미지 처리 스킬입니다.

프리셋에 의존하지 않고 필요한 옵션을 직접 지정할 수 있습니다. 기본적으로는 새 파일을 덮어쓰지 않으며, 결과 파일의 크기·치수·포맷·메타데이터 상태를 검증합니다.

```bash
node scripts/process-image.js \
  --input source.png \
  --output result.webp \
  --width 1600 \
  --height 900 \
  --fit cover \
  --format webp \
  --quality 82 \
  --target-bytes 500000
```

빠르게 시작할 때는 `thumbnail`, `web-share`, `avatar` 프리셋을 사용할 수 있으며, 직접 지정한 옵션이 프리셋 값을 항상 덮어씁니다.

```bash
node scripts/process-image.js --input source.png --output card.webp --preset thumbnail --width 800
```

주요 옵션:

- `--width`, `--height`, `--fit`, `--position`: 크기 조절과 자동 크롭
- `--left`, `--top`, `--extract-width`, `--extract-height`: 정확한 영역 크롭
- `--format`, `--quality`, `--target-bytes`, `--palette`: 변환과 압축
- `--preset`: `thumbnail`, `web-share`, `avatar` 빠른 시작 구성
- `--rotate`, `--background`, `--without-enlargement`: 출력 제어
- `--keep-metadata`, `--overwrite`: 기본 안전 정책 변경

Sharp는 실행 대상 프로젝트에 `npm i sharp`로 설치합니다. 이 스킬에는 의존성·글꼴 파일을 포함하지 않습니다.
