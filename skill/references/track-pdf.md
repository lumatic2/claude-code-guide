# Track: PDF 문서

Lv 1 트랙 중 하나. 바탕화면에 완성된 PDF 한 장을 남긴다.
Typst 설치가 필요하다 — 없으면 BLOCKED로 종료한다.

## 1. Collect

AskUserQuestion:

- 문서 종류 — A) 이력서 B) 포트폴리오 소개서 C) 보고서/제안서 D) 자유
- 이력서 선택 시: 이름, 연락처, 학력(학교·전공·졸업연도), 경력/활동, 보유 기술, 한 줄 자기소개
- 다른 문서: 목적과 주요 내용을 자유 입력

## 2. Prepare

```bash
typst --version
```

에러나면 OS별 안내 후 **BLOCKED**로 종료:

- macOS: `brew install typst`
- Windows: `winget install typst.typst`
- Linux: `snap install typst` 또는 https://typst.app/docs/

Close Protocol로 BLOCKED 보고. 사용자가 설치 후 `/claude-guide` 재호출하면 Phase 1에서 이어간다.

성공 시:

```bash
mkdir -p ~/Desktop/my-document
```

## 3. Create

`~/Desktop/my-document/document.typ` 작성. 이력서 기본 구조:

```typst
#set page(margin: 1.5cm)
#set text(font: "Pretendard", size: 11pt)

#align(center)[
  #text(24pt, weight: "bold")[{이름}]
  #v(0.3em)
  {이메일} · {전화번호}
]

#line(length: 100%, stroke: 0.5pt)

= 학력
- {학교} · {전공} · {졸업연도}

= 경력
- {회사/단체} · {기간} · {역할}

= 보유 기술
{기술 나열}

= 자기소개
{한 줄 자기소개}
```

Pretendard 폰트 없으면 `"Noto Sans KR"` 또는 시스템 기본으로 대체.

## 4. Verify

```bash
cd ~/Desktop/my-document && typst compile document.typ document.pdf
```

출력:

```
document.pdf 생성됐어요.
- Mac: open document.pdf
- Windows: start document.pdf
- Linux: xdg-open document.pdf

내용 수정하고 싶으면 말씀해주세요. 다시 컴파일해드릴게요.
```

수정 요청 시 `.typ` 파일만 Edit한 뒤 재컴파일.

## 5. Extend (선택)

AskUserQuestion: "PDF 한 가지 더 해볼까요?"

- A) 같은 내용 영어 버전 만들기
- B) 컬러 테마 바꾸기 (보수적 → 모던)
- C) 한 장 포트폴리오 요약으로 축약
- D) 그만

---

완료 후 Close Protocol.
`artifacts`에 `~/Desktop/my-document/document.pdf` 추가.
