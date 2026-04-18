# Level 3: 나만의 스킬

Claude Code를 **확장**하는 경험. 사용자가 직접 `/my-session-end` 스킬을 작성해서 매일 쓰게 된다.

**왜 /session-end**: 세션 끝날 때 오늘 뭘 했는지 요약해주는 도구. 매일 쓰게 될 가능성이 큼. 그리고 "스킬이 뭔지" 만들어보는 게 백 마디 설명보다 강함.

**철학**: Claude가 대신 안 써준다. **같이 쓴다**. 사용자가 파일 내용을 이해하고 넘어간다.

## 1. Collect

AskUserQuestion:

- 이 스킬이 뭘 요약해주면 좋겠는지 — A) 오늘 만든 파일 목록 B) git 변경 요약 C) 사용자가 자유 입력한 메모 D) A+B+C 전부
- 저장 위치 — A) `~/Desktop/session-logs/{날짜}.md` B) `~/projects/sandbox/logs/{날짜}.md` C) 그냥 화면에 출력만

> 추천: D + B. 나중에 "지난 주 뭐 했지?" 볼 때 제일 유용해요.

## 2. Prepare

스킬이 어디에 위치하는지 먼저 설명:

```
Claude Code 스킬은 ~/.claude/skills/{이름}/SKILL.md 형태로 존재해요.
이 폴더 안에 SKILL.md 파일 하나만 있으면 /{이름} 으로 호출할 수 있어요.

오늘은 이걸 같이 만들어요:
  ~/.claude/skills/my-session-end/SKILL.md
```

```bash
mkdir -p ~/.claude/skills/my-session-end
```

## 3. Create

### 3-1. SKILL.md 구조 설명 후 작성

먼저 **frontmatter**가 뭔지 설명:

```
YAML frontmatter (--- 사이에 있는 부분)는 스킬의 메타정보예요.
  name: 슬래시 명령어 이름
  description: 언제 이 스킬을 쓰는지 — Claude가 자동 호출 판단할 때 봄
```

`~/.claude/skills/my-session-end/SKILL.md` 작성 (사용자 선택을 반영):

```markdown
---
name: my-session-end
description: |
  오늘 작업 세션 요약. 만든 파일, git 변경, 내 메모를 하나의 로그로 저장한다.
  사용자가 "/my-session-end", "세션 마무리", "오늘 뭐 했지" 같은 표현을
  쓸 때 이 스킬을 사용한다.
allowed-tools:
  - Bash
  - Read
  - Write
  - AskUserQuestion
---

# 세션 마무리

1. 오늘 날짜를 구한다: `date +%Y-%m-%d`
2. 아래 정보를 수집한다:
   - 오늘 Desktop 및 ~/projects/sandbox에서 생긴/수정된 파일 (find ... -mtime -1)
   - 현재 폴더의 git 변경 요약 (git diff --stat && git log --oneline -5)
3. AskUserQuestion으로 사용자에게 묻는다:
   - 오늘 배운 것 (한 줄)
   - 내일 이어서 할 일 (한 줄)
4. 다음 경로에 저장한다: {선택한 경로 형식}

## 저장 포맷

```markdown
# {날짜}

## 만든/고친 파일
- {목록}

## git 변경
{diff --stat 결과}

## 최근 커밋
{log --oneline 결과}

## 오늘 배운 것
{사용자 입력}

## 내일
{사용자 입력}
```

파일 저장 후 경로를 출력하고 종료한다.
```

### 3-2. 작성하면서 사용자에게 설명할 포인트

각 섹션 쓸 때 한 줄씩 짚어준다:

- `name:` — "이 줄이 `/my-session-end`의 이름이에요"
- `description:` — "사용자가 이 말을 쓰면 Claude가 이 스킬을 떠올려요"
- `allowed-tools:` — "이 스킬이 쓸 수 있는 도구 목록"
- 본문 — "이게 사실 Claude에게 주는 프롬프트예요. 자연어로 절차를 적으면 돼요"

## 4. Verify

### 4-1. 파일 존재 확인

```bash
cat ~/.claude/skills/my-session-end/SKILL.md | head -20
ls -la ~/.claude/skills/my-session-end/
```

### 4-2. 실제 호출 안내

```
스킬이 설치됐어요.

지금 바로 테스트해보세요:
  입력창에 /my-session-end 입력

Claude Code가 자동으로 파일 변경을 감지해서 스킬 목록에 추가됐을 거예요.
(목록에 없으면 Claude 앱을 한 번 껐다가 켜주세요)

이 스킬은 이제 언제든 /my-session-end 로 쓸 수 있어요.
```

## 5. Extend (선택)

AskUserQuestion: "스킬 더 만들어볼까요?"

- A) `/daily-plan` — 아침에 오늘 할 일 정리
- B) `/journal` — 개인 일기 스킬
- C) 지금 만든 `/my-session-end`를 개선 (포맷 바꾸기, 저장 위치 바꾸기)
- D) 그만 — 나중에 필요할 때 같은 방식으로 만들면 됨

A/B 선택 시 같은 패턴(Collect → Prepare → Create → Verify)으로 진행하되 더 짧게.

---

완료 후 Close Protocol.
`progress.json`의 `level`을 `3`으로 갱신.
`artifacts`에 `~/.claude/skills/my-session-end/SKILL.md` 추가.

Lv 3가 온보딩의 끝이다. 출력:

```
Lv 3 완료. Claude Code 온보딩 끝났어요.

이제 {user_name}님은:
  · 결과물을 직접 만들 수 있고
  · 내 작업 공간(샌드박스)이 있고
  · 필요한 도구를 스스로 만들 수 있어요

다음은 본인이 하고 싶은 프로젝트로 자유롭게 가세요.
  · 더 배우고 싶으면: https://guide.askewly.com
  · 공식 문서: https://code.claude.com/docs
```
