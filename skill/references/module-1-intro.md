# 모듈 1: Claude Code가 뭐야?

이 모듈은 Claude Code의 핵심 개념을 퀴즈로 확인하고, 효과적으로 사용하기 위한 3단계 프레임워크를 배운다.

---

## Mission 1 (m1): 개념 확인 O/X 퀴즈

Claude Code에 대한 흔한 오해를 바로잡는 퀴즈다. AskUserQuestion으로 한 문제씩 진행한다.

### 진행 방법

아래 5개 문항을 순서대로 출제한다. 각 문항마다:
1. 문제를 보여준다
2. AskUserQuestion으로 O/X 선택을 받는다
3. 정답 여부와 함께 간단한 설명을 제공한다

### 문항

**Q1**: "Claude Code는 VS Code 같은 IDE이다"
- 정답: **X**
- 설명: Claude Code는 IDE가 아니라 **터미널 기반 AI 코딩 에이전트**입니다. 터미널에서 실행되며, 대화를 통해 코드를 읽고 수정합니다.

**Q2**: "Claude Code는 직접 파일을 읽고 수정할 수 있다"
- 정답: **O**
- 설명: 맞습니다. Claude Code는 Read, Write, Edit 같은 도구로 실제 파일을 직접 조작합니다. 제안만 하는 게 아니라 실제로 변경합니다.

**Q3**: "Claude Code는 터미널 명령어를 실행할 수 있다"
- 정답: **O**
- 설명: Bash 도구로 `npm install`, `git commit`, `python script.py` 같은 명령어를 직접 실행합니다.

**Q4**: "Claude Code는 인터넷 검색을 기본으로 지원한다"
- 정답: **X**
- 설명: 기본 상태에서는 인터넷 검색이 안 됩니다. WebSearch나 MCP를 연결해야 외부 검색이 가능합니다.

**Q5**: "Claude Code와의 대화가 끝나면 변경 사항이 사라진다"
- 정답: **X**
- 설명: Claude Code는 **실제 파일을 수정**하므로 대화가 끝나도 변경 사항이 그대로 남습니다. 이것이 챗봇과의 가장 큰 차이점입니다.

### 마무리

전체 점수를 보여준다: "5문제 중 N개 정답!"

---

## Mission 2 (m2): 3단계 학습 프레임워크

Claude Code를 효과적으로 사용하기 위한 3단계 프레임워크를 가르친다.

### Teach

다음 내용을 간결하게 설명한다:

> Claude Code를 잘 쓰려면 3단계만 기억하세요:
>
> **STEP 1: 작업 디렉토리 준비** — `cd my-project && claude`로 프로젝트 폴더에서 시작
> **STEP 2: 작업 목표 명확히** — 목표, 범위, 제약, 완료 기준을 명시
> **STEP 3: 검증 먼저** — 변경 후 빌드/테스트를 실행해서 확인

### Challenge

AskUserQuestion으로 시나리오 매칭 퀴즈를 낸다. 3개 시나리오를 한 번에 제시하고 각각 어떤 STEP에 해당하는지 물어본다.

**시나리오 A**: "프로젝트 루트가 아니라 하위 폴더에서 Claude를 실행했더니 파일을 못 찾는다"
- 정답: STEP 1 (작업 디렉토리 준비)

**시나리오 B**: "'이거 고쳐줘'라고만 말했더니 엉뚱한 부분을 수정했다"
- 정답: STEP 2 (작업 목표 명확히)

**시나리오 C**: "코드를 수정했는데 나중에 보니 빌드가 깨져 있었다"
- 정답: STEP 3 (검증 먼저)

### Feedback

각 시나리오에 대해 왜 그 STEP인지 설명한다.

마지막에 웹 가이드 링크를 안내한다:
> 더 자세한 소개: https://claude-code-guide.vercel.app/guide/intro

---

## 모듈 완료

"모듈 1 완료! Claude Code의 핵심 개념을 이해했습니다."
진행도를 저장한다: module 1 status → "completed", missions_done → ["m1", "m2"]
