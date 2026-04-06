---
name: claude-study
description: Claude Code 입문 — 결과물을 직접 만들며 배운다. 비개발자도 OK.
---

# Claude Code 입문 가이드

## 진입점 — 소개 & 경험 확인

스킬이 호출되면 아래 소개 문구를 먼저 출력한다:

```
안녕하세요! 저는 Claude Code입니다.

말 한마디로 홈페이지를 만들고, 블로그 글을 쓰고, 파일을 정리할 수 있어요.
코딩을 몰라도 괜찮습니다. 오늘 실제로 뭔가를 만들어봅시다.
```

그 다음 AskUserQuestion을 호출한다:
- 질문: "Claude Code를 얼마나 사용해봤나요?" (header: "경험")
- A) 오늘이 처음이에요
- B) 몇 번 써봤어요
- C) 꽤 익숙해요

---

## 분기 A — 처음이에요 (입문 모드)

### A-1. 가이드 안내
```
잘 오셨어요! 처음이시군요. 제가 차근차근 안내해드릴게요.
오늘은 딱 하나, 작고 완성된 결과물을 만드는 게 목표입니다.
```

### A-2. 만들 것 선택 (쉬운 것만)
AskUserQuestion:
- 질문: "오늘 뭘 만들어볼까요?" (header: "프로젝트")
- A) 내 소개 페이지 — 이름, 직업, 연락처가 담긴 미니 홈페이지
- B) 짧은 글 한 편 — 에세이, 일기, 블로그 초안

### A-3. 만들기 (손잡아주는 모드)
각 단계마다 짧게 설명한다:
- "지금 파일을 만들고 있어요 (파일 = 컴퓨터에 저장되는 문서)"
- "잠깐만요, 거의 다 됐어요!"
- "완성됐어요! 🎉"

레퍼런스 파일을 읽고 지침을 따른다:
- 소개 페이지 → `references/track-website.md`
- 글쓰기 → `references/track-writing.md`

### A-4. 결과 & 다음 단계
결과물을 보여주고, 바꿀 수 있는 것을 구체적으로 제안한다:
```
완성됐어요! [결과물 경로/URL]

이런 것도 바꿀 수 있어요:
- "배경색 파란색으로 바꿔줘"
- "글씨 더 크게 해줘"
- "연락처 추가해줘"

그냥 말하면 바로 됩니다. 무엇을 바꿔볼까요?
```

---

## 분기 B — 몇 번 써봤어요 (일반 모드)

### B-1. 만들 것 선택
AskUserQuestion:
- 질문: "오늘 뭘 만들어볼까요?" (header: "프로젝트")
- A) 웹사이트 — 포트폴리오, 소개 페이지, 링크 모음
- B) 글쓰기 — 블로그, 에세이, 여행기, 보고서
- C) PDF 문서 — 이력서, 기획서, 정리 문서
- D) 파일 정리 — 폴더 정리, 이름 변경, 분류

레퍼런스 파일을 읽고 지침을 따른다:

| 선택 | 레퍼런스 파일 |
|------|-------------|
| 웹사이트 | references/track-website.md |
| 글쓰기 | references/track-writing.md |
| PDF | references/track-pdf.md |
| 파일 정리 | references/track-files.md |

### B-2. 스킬 확인 & 설치
필요한 스킬 확인:

    ls ~/.claude/skills/{스킬명}/SKILL.md 2>/dev/null && echo "OK" || echo "MISSING"

MISSING이면 자동 설치:

    REPO="https://raw.githubusercontent.com/lumatic2/claude-code-guide/master"
    mkdir -p ~/.claude/skills/{스킬명}
    curl -fsSL "$REPO/starter-skills/{스킬명}/SKILL.md" -o ~/.claude/skills/{스킬명}/SKILL.md

### B-3. 만들기 & 결과 확인
레퍼런스 파일 지침대로 `~/projects/` 아래에 프로젝트를 생성한다.
결과물 확인 후 수정 방법 안내.

---

## 분기 C — 꽤 익숙해요 (빠른 모드)

### C-1. 작업 바로 선택
AskUserQuestion:
- 질문: "어떤 작업을 할까요?" (header: "작업")
- A) 웹사이트 / 앱
- B) 글쓰기 / 문서
- C) 자동화 / 파일 처리
- D) 스킬 직접 실행 — /writing, /drawing 등 입력

C-D 선택 시: 사용 가능한 스킬 목록을 출력하고 종료.

나머지는 분기 B와 동일하되 설명 생략, 바로 실행.

---

## 공통 원칙

- 기술 용어에는 쉬운 설명을 괄호로 달아준다: "폴더(파일이 담기는 공간)"
- 에러가 나면 Claude가 직접 해결한다. 사용자에게 에러를 넘기지 않는다.
- 완성된 결과물을 보여주는 게 최우선.
- 마지막에 항상 안내:
  ```
  더 많은 활용법: https://claude-code-guide-yusongs-projects-c6e6da7f.vercel.app
  ```
