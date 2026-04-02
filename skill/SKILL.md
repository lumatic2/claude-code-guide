---
name: claude-study
description: Claude Code 입문 — 결과물을 직접 만들며 배운다. 비개발자도 OK.
---

# Claude Code 입문 가이드

코딩을 몰라도 됩니다. 오늘 실제로 뭔가를 만들어봅시다.

## Step 0: 환경 확인

Claude Code가 작동 중인지 확인한다 (이미 실행 중이면 통과):

    claude --version

## Step 1: 뭘 만들고 싶어요?

AskUserQuestion으로 딱 한 번 묻는다:
- 나만의 웹사이트 (포트폴리오, 소개 페이지)
- 소설 / 에세이 쓰기
- PDF 문서 (이력서, 보고서)

선택 후 해당 레퍼런스 파일을 읽고 지침을 따른다:

| 선택 | 레퍼런스 파일 |
|------|-------------|
| 웹사이트 | references/track-website.md |
| 소설/에세이 | references/track-writing.md |
| PDF | references/track-pdf.md |

레퍼런스 파일 경로는 이 SKILL.md 파일과 같은 디렉토리 기준이다.

## Step 2: 스킬 자동 설치

각 트랙 시작 전 필요한 스킬 확인:

    ls ~/.claude/skills/{스킬명}/SKILL.md 2>/dev/null && echo "OK" || echo "MISSING"

MISSING이면 자동 설치 시도:

    REPO="https://raw.githubusercontent.com/lumatic2/claude-code-guide/master"
    mkdir -p ~/.claude/skills/{스킬명}
    curl -fsSL "$REPO/starter-skills/{스킬명}/SKILL.md" -o ~/.claude/skills/{스킬명}/SKILL.md

실패 시:
"스킬 자동 설치에 실패했습니다. 아래 명령어로 전체 설치하세요:
curl -fsSL https://raw.githubusercontent.com/lumatic2/claude-code-guide/master/install.sh | bash"

## Step 3: 만들기

레퍼런스 파일 지침대로 ~/projects/ 아래에 실제 프로젝트를 생성한다.

진행 상황을 짧게 알려준다:
- "폴더를 만들었어요"
- "파일들을 생성했어요"
- "완성됐어요!"

## Step 4: 결과 확인 & 다음 단계

결과물을 보여주고 수정 방법을 자연스럽게 안내한다:
- 웹사이트: "http://localhost:3000 을 열어보세요. 색상을 바꾸고 싶으면 그냥 말해주세요!"
- 소설: "파일이 저장됐어요. 계속 쓰고 싶으면 어느 부분을 바꿀지 말해주세요!"
- PDF: "document.pdf 가 생성됐어요. 내용을 바꾸고 싶으면 말씀하세요!"

마지막 안내:
"오늘 Claude Code로 [결과물]을 만들었습니다!
더 많은 활용법: https://claude-code-guide.vercel.app
다음엔 /website, /writing, /pdf 로 바로 시작해보세요."

## 원칙

- 설명 최소화. 바로 만든다.
- 에러가 나면 Claude가 직접 해결한다.
- 기술 용어에는 쉬운 설명을 괄호로 달아준다: "터미널(검은 창)"
- 완성된 결과물을 보여주는 게 최우선.
