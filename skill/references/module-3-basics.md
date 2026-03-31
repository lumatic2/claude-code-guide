# 모듈 3: 핵심 사용법

이 모듈은 Claude Code의 핵심 명령어와 효과적인 프롬프트 작성법을 실습한다.
가장 중요한 모듈이며, 5개 미션으로 구성되어 있다.

---

## Mission 1 (m1): 파일 생성 요청

### Teach

> Claude Code에게 파일을 만들어달라고 할 때는 **위치 + 파일명 + 내용**을 명시하면 좋습니다.
> 모호한 요청보다 구체적인 요청이 훨씬 정확한 결과를 만들어요.

### Challenge

사용자에게 미션을 제시한다:

> **미션**: sandbox의 my-project에 `hello.py` 파일을 만드는 프롬프트를 작성해보세요.
> "Hello, World!"를 출력하는 Python 스크립트여야 합니다.

AskUserQuestion으로 자유 입력을 받는다.

### Feedback

사용자의 프롬프트를 다음 기준으로 평가한다:

| 기준 | 확인 |
|------|------|
| 파일 경로 명시 | `/tmp/claude-study-sandbox/my-project/hello.py` 또는 유사 경로 포함? |
| 파일 내용/목적 명시 | "Hello World 출력", "Python 스크립트" 등 포함? |
| 구체성 | 모호한 표현 없이 명확한가? |

각 항목에 대해 ✅/❌로 체크하고 개선 포인트를 알려준다.

**모범 답안 예시**:
> `/tmp/claude-study-sandbox/my-project/hello.py 파일을 만들어줘. "Hello, World!"를 출력하는 Python 스크립트로.`

그런 다음, 실제로 파일을 생성하고 검증한다:
```bash
python3 /tmp/claude-study-sandbox/my-project/hello.py
```

---

## Mission 2 (m2): 버그 수정

### 시드 파일 생성

먼저 버그가 포함된 파일을 생성한다. Write 도구로 `/tmp/claude-study-sandbox/my-project/src/app.js`에 저장:

```javascript
const users = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
];

function getOldestUser(data) {
  return data.users.sort((a, b) => b.age - a.age)[0];
}

console.log(getOldestUser(users));
```

버그: `data.users`라고 썼지만, `data`는 이미 배열이므로 `data.sort(...)`이어야 한다.

### Teach

> 버그를 고칠 때 **에러 메시지를 프롬프트에 포함**하면 Claude가 훨씬 빠르게 원인을 찾습니다.
> 또한 `@파일경로`로 파일을 직접 참조하면 전체 코드를 컨텍스트에 포함시킬 수 있어요.

### Challenge

에러 메시지를 보여준다:
```
TypeError: Cannot read properties of undefined (reading 'sort')
```

> **미션**: 이 버그를 고치려면 Claude Code에게 어떻게 요청하시겠어요?
> 프롬프트를 작성해보세요.

AskUserQuestion으로 자유 입력을 받는다.

### Feedback

평가 기준:

| 기준 | 확인 |
|------|------|
| 에러 메시지 포함 | TypeError 내용이 들어있는가? (가장 중요!) |
| 파일 참조 | `@` 문법이나 파일 경로를 명시했는가? |
| 구체적 요청 | "고쳐줘"만이 아니라 맥락이 있는가? |

**개선된 프롬프트 예시**:
> `@src/app.js 이 파일에서 TypeError: Cannot read properties of undefined (reading 'sort') 에러가 납니다. 고쳐줘.`

그런 다음 실제로 버그를 수정한다:
- `data.users.sort(...)` → `data.sort(...)`로 변경
- 수정 후 실행해서 검증:
```bash
node /tmp/claude-study-sandbox/my-project/src/app.js
```
예상 출력: `{ name: 'Alice', age: 30 }`

---

## Mission 3 (m3): 슬래시 명령어 퀴즈

### Teach

주요 슬래시 명령어를 간단히 소개한다:

| 명령어 | 기능 |
|--------|------|
| `/compact` | 대화 압축 (토큰 절약) |
| `/clear` | 컨텍스트 완전 초기화 |
| `/cost` | 토큰 사용량 확인 |
| `/model` | 사용할 모델 변경 |
| `/effort` | 추론 깊이 조절 (low/medium/high) |

### Challenge

AskUserQuestion으로 상황별 매칭 퀴즈를 낸다. 한 문제씩 진행한다.

**Q1**: "대화가 너무 길어져서 토큰이 부족할 때 어떤 명령어를 쓸까요?"
- 선택지: `/clear`, `/compact`, `/cost`, `/effort`
- 정답: `/compact`
- 설명: `/compact`은 대화 내용을 요약해서 토큰을 절약합니다. `/clear`는 아예 다 지우는 거예요.

**Q2**: "완전히 새로운 작업을 시작하고 싶을 때"
- 선택지: `/compact`, `/clear`, `/help`, `/exit`
- 정답: `/clear`
- 설명: `/clear`로 이전 대화를 모두 초기화하고 새로 시작할 수 있습니다.

**Q3**: "현재까지 API 비용을 확인하고 싶을 때"
- 선택지: `/model`, `/cost`, `/effort`, `/help`
- 정답: `/cost`
- 설명: `/cost`로 현재 세션의 토큰 사용량과 비용을 확인합니다.

**Q4**: "간단한 작업인데 Claude가 너무 깊이 생각하면서 느릴 때"
- 선택지: `/fast`, `/effort low`, `/compact`, `/clear`
- 정답: `/effort low`
- 설명: `/effort low`로 추론 깊이를 낮추면 간단한 작업에서 속도를 높일 수 있습니다. `/fast`도 좋은 선택이에요.

점수를 보여준다: "4문제 중 N개 정답!"

---

## Mission 4 (m4): 효과적인 프롬프트 패턴

### Teach

> 좋은 프롬프트에는 4가지 요소가 있습니다:
>
> 1. **목표** — 무엇을 하고 싶은지
> 2. **파일** — 어떤 파일을 대상으로
> 3. **범위/제약** — 어디까지 수정할지, 어떤 방식으로
> 4. **완료 기준** — 어떻게 되면 완성인지
>
> 템플릿: `[파일]에서 [기능] 추가해줘. [제약]. 완료 조건: [기준]`

### Challenge

시나리오를 제시한다:

> **시나리오**: sandbox의 `src/index.js`에 사용자 이름을 입력받아 인사하는 기능을 추가하고 싶습니다.
> - readline 모듈을 사용할 것
> - 이름 입력 후 "안녕하세요, [이름]님!" 출력
> - 빈 입력 시 기본값 "World" 사용
>
> 이 시나리오를 위한 프롬프트를 작성해보세요.

AskUserQuestion으로 자유 입력을 받는다.

### Feedback

4요소 체크리스트로 평가한다:

- ✅/❌ **목표**: 인사 기능 추가 언급?
- ✅/❌ **파일**: src/index.js 또는 경로 지정?
- ✅/❌ **범위/제약**: readline 사용, 빈 입력 처리 등?
- ✅/❌ **완료 기준**: 동작 방식 명시?

**모범 답안 예시**:
> `src/index.js에 readline으로 이름을 입력받아 "안녕하세요, [이름]님!"을 출력하는 기능 추가해줘. 빈 입력이면 "World"를 기본값으로. 실행하면 프롬프트가 뜨고, 이름 입력 후 인사가 출력되면 완성.`

---

## Mission 5 (m5): 단축키 퀴즈

### Teach

핵심 단축키와 문법을 소개한다:

| 문법/단축키 | 기능 | 예시 |
|-------------|------|------|
| `!command` | 셸 명령어 직접 실행 | `!git status`, `!npm test` |
| `@filepath` | 파일을 컨텍스트에 포함 | `@src/index.js 이 파일 설명해줘` |
| `Shift+Tab` | 권한 모드 토글 | 도구 실행 전 자동 허용/확인 전환 |
| `Ctrl+C` | 실행 중인 작업 중단 | Claude가 너무 오래 걸릴 때 |
| `Esc × 2` | 이전 상태로 롤백 | 파일 수정 되돌리기 |

### Challenge

AskUserQuestion으로 3문항 퀴즈:

**Q1**: "Claude Code 안에서 git status를 확인하려면?"
- 선택지: `!git status`, `@git status`, `/git status`, `git status`
- 정답: `!git status`
- 설명: `!` 접두사로 셸 명령어를 직접 실행합니다.

**Q2**: "README.md 파일 내용을 Claude에게 보여주려면?"
- 선택지: `!README.md`, `@README.md`, `/README.md`, `#README.md`
- 정답: `@README.md`
- 설명: `@` 접두사로 파일을 컨텍스트에 포함시킵니다.

**Q3**: "방금 Claude가 수정한 파일을 되돌리고 싶을 때?"
- 선택지: `Ctrl+Z`, `Esc × 2`, `/undo`, `!git checkout .`
- 정답: `Esc × 2`
- 설명: Esc를 두 번 누르면 체크포인트로 롤백합니다. git checkout도 가능하지만 체크포인트가 더 안전합니다.

### Safety Tip

> **큰 변경 전에는 반드시 커밋하세요!**
> `!git add -A && git commit -m "checkpoint"` — 이 습관이 여러분을 구합니다.

---

## 모듈 완료

"모듈 3 완료! Claude Code의 핵심 사용법을 익혔습니다. 이것만으로도 실전에서 충분히 활용할 수 있어요."
진행도 저장: module 3 status → "completed", missions_done → ["m1", "m2", "m3", "m4", "m5"]
