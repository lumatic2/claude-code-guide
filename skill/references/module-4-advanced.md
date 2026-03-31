# 모듈 4: 고급 설정

이 모듈은 CLAUDE.md, Hooks, Skills, Permissions를 배운다.
Claude Code를 팀에서 활용하거나 자동화할 때 필요한 설정들이다.

---

## Mission 1 (m1): CLAUDE.md 작성 실습

### Teach

> **CLAUDE.md**는 프로젝트별 AI 지침서입니다. Claude Code가 세션을 시작할 때 자동으로 읽어요.
>
> 3가지 범위가 있습니다:
> - **글로벌**: `~/.claude/CLAUDE.md` — 모든 프로젝트에 적용
> - **프로젝트**: 프로젝트 루트의 `CLAUDE.md` — 이 프로젝트만 (git에 포함)
> - **로컬**: `.claude/CLAUDE.md` — 개인 설정 (git에 미포함)
>
> **팁**: 글로벌에는 추상적 원칙을, 프로젝트에는 구체적 규칙을 넣으세요.

### Challenge

AskUserQuestion으로 물어본다:

> **미션**: 샌드박스 프로젝트에 CLAUDE.md를 만들겠습니다. 어떤 규칙을 넣고 싶으세요?

선택지:
- "TypeScript만 사용한다"
- "모든 함수에 JSDoc 주석을 작성한다"
- "한국어로 주석을 작성한다"
- (Other: 직접 입력)

### 실행

사용자의 선택에 따라 `/tmp/claude-study-sandbox/my-project/CLAUDE.md`를 생성한다.

예시 (TypeScript 선택 시):
```markdown
# Project Rules

## 코드 규칙
- TypeScript만 사용한다. JavaScript 파일(.js)을 생성하지 않는다.
- 모든 함수에 타입을 명시한다.
- any 타입 사용을 금지한다.

## 테스트
- 새 기능 추가 시 반드시 테스트를 함께 작성한다.
```

### Feedback

생성된 파일을 Read 도구로 읽어서 보여준다.

> 이렇게 구체적이고 실행 가능한 규칙이 좋습니다.
> "코드를 잘 작성한다" (❌ 모호) vs "TypeScript만 사용하고 any를 금지한다" (✅ 구체적)

---

## Mission 2 (m2): Hooks 매칭 퀴즈

### Teach

> **Hooks**는 Claude Code의 동작에 끼워넣는 자동화입니다.
> 특정 시점에 스크립트를 자동 실행할 수 있어요.
>
> | Hook | 시점 | 용도 예시 |
> |------|------|-----------|
> | SessionStart | 세션 시작 | 환경 확인, 브랜치 체크 |
> | PreToolUse | 도구 실행 전 | 위험 명령 차단, 인자 검증 |
> | PostToolUse | 도구 실행 후 | 결과 로깅, 실패 감지 |
> | Notification | 알림 시점 | Slack, 데스크톱 알림 |
> | Stop | 세션 종료 | 요약 저장, 정리 작업 |

### Challenge

AskUserQuestion으로 4문항 퀴즈. 한 문제씩 진행한다.

**Q1**: "세션 시작할 때 현재 git 브랜치를 확인하고 싶다"
- 선택지: SessionStart, PreToolUse, PostToolUse, Stop
- 정답: **SessionStart**

**Q2**: "`rm -rf` 같은 위험한 명령을 자동으로 차단하고 싶다"
- 선택지: SessionStart, PreToolUse, PostToolUse, Notification
- 정답: **PreToolUse**

**Q3**: "파일을 수정할 때마다 변경 내용을 로그 파일에 기록하고 싶다"
- 선택지: SessionStart, PreToolUse, PostToolUse, Stop
- 정답: **PostToolUse**

**Q4**: "Claude가 작업을 완료하면 Slack으로 알림을 보내고 싶다"
- 선택지: PreToolUse, PostToolUse, Notification, Stop
- 정답: **Notification**

각 문항 후 정답 여부와 설명을 보여준다.

### 참고

Hooks 설정 예시를 보여준다:
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "bash check-safety.sh"
        }]
      }
    ]
  }
}
```

---

## Mission 3 (m3): Skills 탐색

### 실행

```bash
ls ~/.claude/commands/ 2>/dev/null | head -20
```

결과를 보여주며 설명한다.

> **스킬(Skills)**은 Claude Code에게 새로운 능력을 추가하는 재사용 가능한 명령입니다.
> `/명령어`로 실행하며, 지금 실행 중인 `/claude-study`도 스킬이에요!

### Teach

스킬의 구조를 설명한다:

> 스킬 = YAML 프론트매터 + 마크다운 본문
> ```yaml
> ---
> name: my-skill
> description: 이 스킬이 하는 일
> allowed-tools:
>   - Read
>   - Write
>   - Bash
> ---
> # 스킬 본문 (Claude가 따를 지침)
> ```

### 선택적 실습

AskUserQuestion: "설치된 스킬 중 하나를 열어볼까요?"
- "네, 하나 골라서 보여주세요" → 목록에서 하나 골라 첫 20줄을 Read로 보여줌
- "아니요, 다음으로" → 넘어감

---

## Mission 4 (m4): Permissions 퀴즈

### Teach

> Claude Code의 권한은 3단계입니다:
>
> 1. **샌드박스** — 안전한 읽기 + 제한된 쓰기만 가능
> 2. **승인 모드** — 도구 실행마다 사용자 확인 필요 (기본값)
> 3. **전체 허용** — 모든 도구 자동 승인 (신뢰 환경용)
>
> `Shift+Tab`으로 모드를 전환할 수 있습니다.

### Challenge

AskUserQuestion 퀴즈:

**Q1**: "Claude Code를 처음 사용할 때 가장 안전한 권한 설정은?"
- 선택지: 샌드박스, 승인 모드, 전체 허용
- 정답: **승인 모드**
- 설명: 승인 모드는 매번 확인을 거치면서도 모든 기능을 사용할 수 있어 학습에 가장 적합합니다.

**Q2**: "권한 모드를 빠르게 전환하는 단축키는?"
- 선택지: Ctrl+Tab, Shift+Tab, Alt+P, /permissions
- 정답: **Shift+Tab**

---

## 모듈 완료

"모듈 4 완료! CLAUDE.md, Hooks, Skills, Permissions — Claude Code를 깊이 활용할 준비가 되었습니다."
진행도 저장: module 4 status → "completed", missions_done → ["m1", "m2", "m3", "m4"]
