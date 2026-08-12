# static-mockup

프레임워크 없이 HTML·CSS·JavaScript로 빠른 화면 목업, 랜딩 페이지, 데모를 만들거나 수정하는 Codex용 스킬입니다.

디자인 관련 스킬은 이미 다양하므로, 이 스킬은 범용 디자인 시스템을 대신하지 않습니다. 간단한 정적 파일을 바로 생성하거나 수정해야 할 때에만 사용하는 가벼운 기본 규칙 모음입니다.

별도 지시가 없으면 `index.html`, `styles.css`, `script.js`를 분리해 작성합니다. 기본 언어는 한국어이고, 모바일 퍼스트 반응형 레이아웃을 사용합니다. 색상·간격·글꼴 크기·반경 등 디자인 값은 CSS 변수로 공통 관리합니다.

CSS는 특정 요소에만 묶인 규칙을 과도하게 만들기보다, 나중에 Tailwind CSS로 옮기기 쉬운 작은 유틸리티 성격의 클래스를 우선합니다.

## 디자인 컨텍스트

목업을 만들거나 수정하기 전, 프로젝트 루트 또는 적용되는 상위 경로의 `DESIGN.md`를 확인합니다. 관련 문서가 있으면 디자인 토큰, 컴포넌트 규칙, 접근성 제약, 시각적 원칙을 읽고 따릅니다.

디자인 규칙을 새로 정하거나 변경하라는 요청이 있거나, 재사용할 디자인 결정을 새로 만들었다면 기존 `DESIGN.md`도 필요한 범위에서 갱신합니다. 관련 문서가 없으면 이 스킬의 기본 CSS 변수 규칙을 사용하며, 요청이나 명확한 필요 없이 `DESIGN.md`를 새로 만들지는 않습니다.

사용자가 새 `DESIGN.md` 생성을 요청하면 Google Labs가 공개한 현재 alpha 사양을 기본 구조로 사용합니다. 상단에는 YAML front matter로 토큰을, 본문에는 Markdown으로 이유와 사용 규칙을 기록합니다. 기본 섹션은 `Overview`, `Colors`, `Typography`, `Layout`, `Elevation & Depth`, `Shapes`, `Components`, `Do's and Don'ts` 순서이며, 필요한 섹션만 남깁니다. 추가 섹션은 가능하지만 이 기본 구조와 순서를 깨지 않습니다.

가능한 환경에서는 아래 명령으로 사양 검증도 수행합니다. 프로젝트 의존성이나 잠금 파일을 추가하지는 않습니다.

```bash
npx -p @google/design.md designmd lint DESIGN.md
```

## 기본 메타데이터

별도 지시가 없으면 모든 페이지의 `<head>`에 문자 인코딩, 뷰포트, 페이지별 고유 제목, 페이지별 고유 설명을 넣습니다.

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>페이지를 설명하는 고유한 제목</title>
<meta name="description" content="페이지 내용과 목적을 짧고 고유하게 설명합니다.">
```

호스트 주소가 지정된 목업이라면 페이지의 의도한 절대 URL을 가리키는 canonical 태그를 `<head>`에 추가합니다. 호스트 주소가 없으면 임의로 만들지 않습니다.

```html
<link rel="canonical" href="https://example.com/about/">
```

호스트 주소와 공유용 이미지가 모두 있으면 Open Graph와 Twitter 카드 태그도 절대 URL로 작성합니다. 실제 콘텐츠와 값이 있는 경우에만 JSON-LD 구조화 데이터와 다국어 페이지용 `hreflang`을 추가합니다. 로컬 목업만 요청된 경우에는 `robots.txt`, `sitemap.xml` 같은 배포 설정을 임의로 만들지 않습니다.

## 검색 엔진 색인

별도 SEO 지시가 없으면 목록·아카이브·내부 검색 결과·404 페이지에는 아래 태그를 추가합니다.

```html
<meta name="robots" content="noindex, follow">
```

그 밖의 페이지에는 다음 태그를 추가합니다.

```html
<meta name="robots" content="index, follow">
```

한 페이지에 상충하는 robots 태그를 함께 넣지 않습니다.

## 캐시 무효화

연결된 CSS와 JavaScript 파일에는 파일 내용의 짧은 MD5 해시를 `v` 파라미터로 붙입니다.

```bash
node scripts/hash-assets.js styles.css script.js
```

스크립트는 HTML을 수정하지 않고 파일별 MD5 앞 10자를 JSON으로 출력합니다. Codex가 이 값을 사용해 해당 자산을 참조하는 모든 HTML 파일의 `?v=` 값을 갱신합니다.

```bash
{
  "styles.css": "a1b2c3d4e5",
  "script.js": "f6e7d8c9b0"
}
```

필요하면 `--length 16`처럼 출력 길이를 지정할 수 있습니다. MD5는 보안 목적이 아니라 브라우저 캐시를 갱신하기 위한 파일 내용 식별자로만 사용합니다.
