# 모듈 5: 실전 워크플로우

이 모듈은 실제 개발에서 쓰는 핵심 워크플로우를 배운다:
체크포인트, Git 연동, GitHub Actions, MCP.

---

## Mission 1 (m1): Checkpointing 이해

### Teach

> Claude Code는 파일을 수정하기 전에 **자동으로 체크포인트를 생성**합니다.
> 뭔가 잘못됐으면 `Esc × 2` 또는 `/rewind`로 이전 상태로 돌아갈 수 있어요.
>
> 단, 되돌릴 수 있는 건 **파일 시스템 변경**뿐입니다.
> 외부 시스템에 일어난 일(API 호출, DB 변경)은 되돌릴 수 없어요.

### Challenge

AskUserQuestion 퀴즈. "다음 중 롤백이 **가능한** 것을 모두 고르세요" (multiSelect):

선택지:
- "파일 내용 수정" → ✅ 가능
- "새 파일 생성" → ✅ 가능
- "외부 API 호출 (Slack 메시지 전송)" → ❌ 불가능
- "데이터베이스 레코드 삭제" → ❌ 불가능

### Feedback

> **핵심 원칙**: 파일 시스템 변경 = 롤백 가능 / 외부 시스템 변경 = 롤백 불가능
>
> 그래서 외부 API나 DB를 다루는 작업 전에는 반드시 확인 단계를 두는 것이 좋습니다.
> Claude Code의 승인 모드가 이런 상황에서 안전장치 역할을 합니다.

---

## Mission 2 (m2): Git 연동 실습

### 실행

샌드박스에 git 저장소를 초기화한다:

```bash
cd /tmp/claude-study-sandbox/my-project && git init && git add -A && git commit -m "initial commit"
```

### Teach

> **Claude Code + Git = 안전한 개발**
>
> 권장 워크플로우:
> 1. `!git commit -m "checkpoint"` — 큰 변경 전에 커밋
> 2. Claude에게 변경 요청
> 3. 결과 확인 (`!git diff`)
> 4. 만족하면 커밋, 아니면 `!git checkout .`으로 되돌리기
>
> Claude Code 안에서 `!` 접두사로 git 명령어를 바로 쓸 수 있습니다.

### 실습

git log를 보여준다:
```bash
cd /tmp/claude-study-sandbox/my-project && git log --oneline
```

> 지금 "initial commit" 하나가 보이죠? 앞으로 변경할 때마다 이렇게 커밋 히스토리가 쌓입니다.
> 언제든 이전 커밋으로 돌아갈 수 있어요.

---

## Mission 3 (m3): GitHub Actions 개념

### Teach

> **GitHub Actions**로 Claude Code를 자동화할 수 있습니다.
> 대표적인 사용 사례: PR이 열리면 자동으로 코드 리뷰.

예시 워크플로우 YAML을 보여준다:

```yaml
name: Claude Code Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

각 부분을 간단히 설명한다:
- `on: pull_request` — PR이 열리거나 업데이트되면 실행
- `anthropics/claude-code-action` — Anthropic의 공식 GitHub Action
- `secrets.ANTHROPIC_API_KEY` — GitHub Secrets에 저장한 API 키

> 이건 개념만 이해하고 넘어갑니다. 실제 설정은 GitHub 레포가 필요해요.
> 자세한 설정법: https://claude-code-guide.vercel.app/guide/workflows

---

## Mission 4 (m4): MCP 소개

### 실행

현재 연결된 MCP 서버를 확인한다:
```bash
claude mcp list 2>/dev/null || echo "MCP 서버가 없거나 claude CLI에서 지원하지 않습니다"
```

### Teach

> **MCP (Model Context Protocol)** = 외부 도구를 Claude Code에 연결하는 프로토콜
>
> 연결 가능한 도구 예시:
> - **GitHub** — 이슈, PR 관리
> - **Slack** — 메시지 전송
> - **Obsidian** — 노트 읽기/쓰기
> - **데이터베이스** — 쿼리 실행
>
> 추가 명령어:
> ```
> claude mcp add --transport stdio <이름> -s <범위> -- <명령어>
> ```
>
> 범위(scope):
> - `user` — 모든 프로젝트에서 사용
> - `project` — 현재 프로젝트만
> - `local` — 개인 설정 (git에 미포함)

> MCP로 Claude Code의 능력을 무한히 확장할 수 있습니다. 필요한 외부 도구가 있으면 MCP로 연결하세요!

---

## 모듈 완료

"모듈 5 완료! 체크포인트, Git 연동, GitHub Actions, MCP — 실전 워크플로우를 배웠습니다."
진행도 저장: module 5 status → "completed", missions_done → ["m1", "m2", "m3", "m4"]
