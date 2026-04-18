# Level 2: 내 샌드박스

Lv 1에서 만든 결과물을 **`~/projects/sandbox/`**로 이사시키고, 기본 CLAUDE.md를 두어 앞으로의 모든 Claude Code 작업 기본 공간으로 만든다.

**목표**: 세션 끝나면 `~/projects/sandbox/` 안에 "내 공간" 감각이 생긴다. 다음 세션부터는 이 폴더를 작업 폴더로 선택해서 쓴다.

## 1. Collect

AskUserQuestion 한 번:

- Lv 1 결과물 이사할지 — A) 이사 B) 그냥 새로 시작 (결과물은 바탕화면에 유지)
- 이 샌드박스에 쓸 기본 규칙 — A) 한국어 존댓말 답변 B) 반말 C) 영어로 답해도 OK
- 작업 시작 전 계획 먼저 보여주기 — A) 항상 B) 필요할 때만

`progress.json`의 `artifacts` 배열을 읽어 이사 대상 경로를 파악한다.

## 2. Prepare

```bash
mkdir -p ~/projects/sandbox
cd ~/projects/sandbox
```

## 3. Create

### 3-1. CLAUDE.md 작성

`~/projects/sandbox/CLAUDE.md`에 사용자 선택을 반영해서 기록:

```markdown
# 내 샌드박스

자유롭게 뭐든 해보는 공간.

## 답변 규칙
- {선택한 언어/말투}
- {계획 선호}

## 금지
- 확인 없이 중요한 파일 덮어쓰기 금지
- 파일 삭제 전에 한 번 더 물어보기

## 메모
- 이 폴더 안에서 실험하고 실수해도 OK
```

### 3-2. Lv 1 결과물 이사 (A 선택 시)

```bash
mv ~/Desktop/{slug}-site ~/projects/sandbox/{slug}-site  # 웹사이트
# 또는
mv ~/Desktop/my-writing ~/projects/sandbox/my-writing    # 글쓰기
# 또는 해당하는 경로
```

복수면 전부 이사.

### 3-3. 간단한 README 하나

`~/projects/sandbox/README.md`:

```markdown
# {user_name}의 샌드박스

{first_session}에 시작.

## 안에 있는 것
- {이사한 결과물 1}
- {이사한 결과물 2}
```

## 4. Verify

출력:

```
샌드박스 만들었어요.

~/projects/sandbox/
├── CLAUDE.md       ← 내 작업 규칙
├── README.md       ← 안에 뭐가 있는지
└── {이사한 결과물들}

다음 세션부터는:
  1. Claude 앱 열기
  2. 상단 "코드" 탭
  3. 작업 폴더로 ~/projects/sandbox 선택

이렇게 하면 CLAUDE.md가 자동으로 읽혀서 내 규칙대로 답해줘요.
```

## 5. Extend (선택)

AskUserQuestion: "전역 규칙도 지금 만들까요?"

- A) 네 — `~/.claude/CLAUDE.md`에도 비슷한 규칙 기본값 넣기
- B) 나중에

**A 선택 시** — `~/.claude/CLAUDE.md` 파일이 있으면 건드리지 말고 사용자에게 보여준 뒤 추가만 제안. 없으면 샌드박스 CLAUDE.md를 베이스로 최소 버전 생성:

```markdown
# 전역 규칙

## 답변 규칙
- {선택한 언어/말투}

## 기본 작업 폴더
- ~/projects/
```

---

완료 후 Close Protocol.
`progress.json`의 `level`을 `2`로 갱신.
`artifacts`에 `~/projects/sandbox/CLAUDE.md` 추가.
