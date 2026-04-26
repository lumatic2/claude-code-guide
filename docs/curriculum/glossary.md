# 필수 용어집

> 강의·과외 중 청중이 막힐 만한 용어들을 한 줄로 답할 수 있게 정리.
> 깊이 들어가지 말 것 — 이 페이지는 "막혔을 때 1초 컷" 용도.

## AI 기초

**LLM (Large Language Model)**
거대 언어 모델. 인터넷 텍스트로 훈련된 다음 단어 예측기. ChatGPT, Claude, Gemini 모두 이 카테고리.

**토큰 (Token)**
모델이 텍스트를 자르는 기본 단위. 한국어는 보통 1글자 ≈ 1~2토큰, 영어는 1단어 ≈ 1~1.3토큰. 비용·길이 다 토큰 단위로 잰다.

**컨텍스트 윈도우 (Context Window)**
모델이 한 번에 볼 수 있는 토큰의 최대치. Claude 4.7 Opus는 1M까지, GPT는 모델마다 다름. **크다고 다 잘 보는 건 아님** — 가운데가 흐려지는 "lost in the middle" 현상이 흔함.

**환각 (Hallucination)**
모델이 자신 있게 사실 아닌 답을 하는 현상. 버그가 아니라 **다음 토큰 예측의 자연스러운 결과**. 검증 없이 신뢰하면 안 됨.

**확률적 생성 (Stochastic Generation)**
모델은 매번 똑같이 답하지 않는다. 같은 입력에 약간씩 다른 답 — 다음 토큰 후보 중 확률로 뽑기 때문. `temperature` 파라미터로 무작위성 조절.

**추론 (Reasoning / Extended Thinking)**
모델이 답하기 전에 중간 사고 과정을 길게 펼치는 것. Claude의 Extended Thinking, OpenAI o1/o3 시리즈가 대표. 더 정확하지만 느리고 비싸다.

**모델 가족 (Opus / Sonnet / Haiku)**
Anthropic의 Claude 모델 라인. Opus = 최강·최고가·느림 / Sonnet = 균형 / Haiku = 빠름·저가·단순작업용. 작업 성격에 맞춰 골라야 비용·속도 최적화.

**지식 단절일 (Knowledge Cutoff)**
모델이 훈련될 때 본 데이터의 마지막 시점. 그 이후 사건은 모름. 최신 정보가 필요하면 웹검색·RAG로 보충해야 함.

---

## 프롬프트 / 컨텍스트

**프롬프트 (Prompt)**
모델에게 주는 입력 전체. 사용자 질문만이 아니라 시스템 지시·첨부 파일·이전 대화 다 포함.

**시스템 프롬프트 (System Prompt)**
대화마다 자동으로 들어가는 영구 지시. "당신은 ○○입니다", "이런 규칙으로 답하세요" 같은 거. 사용자 메시지보다 우선시됨.

**프롬프트 엔지니어링 (Prompt Engineering)**
"어떻게 물어볼까"를 설계하는 일. 역할·구조·예시·반례 4요소가 기본.

**컨텍스트 엔지니어링 (Context Engineering)**
"물어볼 때 모델이 무엇을 보고 있어야 할까"를 설계하는 일. 실무에선 프롬프트 엔지니어링보다 더 중요.

**RAG (Retrieval Augmented Generation)**
검색 + 생성을 합친 패턴. 질문 받으면 → 관련 문서를 검색해서 → 컨텍스트에 넣고 → 모델이 그걸 보고 답함. 사내 챗봇·문서 Q&A의 표준 구조.

**임베딩 (Embedding)**
텍스트를 의미 벡터로 바꾼 것. RAG에서 "비슷한 의미의 문서 찾기"를 가능하게 함. OpenAI, Voyage 같은 회사가 임베딩 모델 제공.

**Few-shot / Zero-shot**
- Zero-shot: 예시 없이 바로 시키는 것
- Few-shot: 예시 1~5개를 주고 시키는 것 — 거의 항상 더 정확

**Chain of Thought (CoT)**
"단계별로 생각해줘"라고 시켜서 모델이 추론 과정을 펼치게 하는 기법. 복잡한 문제에 효과적.

---

## 에이전트 / 하네스

**에이전트 (Agent)**
LLM + 도구 + 루프. 목표를 받으면 계획 → 도구 호출 → 결과 관찰 → 다음 행동을 자율적으로 도는 시스템. Claude Code, Cursor, Devin이 대표.

**도구 사용 (Tool Use / Function Calling)**
모델이 "이 함수를 이 인자로 불러줘"라는 텍스트를 출력하면 → 외부 시스템이 실제로 실행하고 → 결과를 모델에게 돌려주는 패턴. 모델이 파일 읽기·웹검색·DB 쿼리를 할 수 있게 됨.

**하네스 (Harness)**
에이전트가 살아 움직이는 실행 환경. Claude Code가 그 자체로 하네스. 모델이 같아도 어떤 하네스에서 돌리느냐에 따라 결과 품질이 천지차이.

**서브에이전트 (Subagent)**
큰 작업을 작은 에이전트들에게 분배하는 패턴. 병렬 실행으로 빠르고, 격리돼서 메인 컨텍스트가 안 더러워짐. Claude Code의 `Agent` 도구가 대표.

**슬래시 커맨드 (Slash Command)**
`/foo` 형태로 자주 하는 작업을 한 줄 명령으로 만든 것. Claude Code, Cursor 등 대부분의 에이전트 하네스가 지원.

**훅 (Hook)**
특정 이벤트(파일 저장, 커밋, 세션 시작 등) 시 자동 실행되는 명령. "매번 커밋 전에 린터 돌려라" 같은 자동화에 씀.

**MCP (Model Context Protocol)**
모델이 외부 시스템(GitHub, DB, Notion 등)에 표준 방식으로 접근하기 위한 프로토콜. Anthropic이 만들었지만 OpenAI도 지원하기 시작. 한 번 만들어두면 여러 모델·하네스에서 재사용.

**권한 모드 (Permission Mode)**
에이전트가 위험한 행동(파일 삭제, 명령어 실행)을 할 때 사람 승인을 받을지 자동으로 할지 결정하는 설정. Claude Code에선 `default`/`auto`/`bypassPermissions` 등.

**Plan Mode**
실행 전에 계획만 먼저 세우는 모드. 큰 작업이나 위험한 작업 전에 사람이 검토할 수 있게 함.

---

## 워크플로우 / 실무

**위임 (Delegation)**
작업을 AI에 맡기는 것. 반복적이고 검증 쉬운 작업이 1순위 후보.

**교차검증 (Cross-validation)**
다른 모델(예: Codex, Gemini)에게 결과를 한 번 더 검토시키는 패턴. 같은 모델은 같은 식으로 틀리니까. 고위험 작업(migration, auth, 배포)에선 거의 필수.

**컨텍스트 오염 (Context Pollution)**
긴 대화에서 잘못된 정보·관련 없는 정보가 쌓여 모델 판단이 흐려지는 현상. 해결책: 새 세션 시작, 메모리 청소.

**체크포인트 (Checkpoint)**
긴 작업 중간에 진행 상태를 저장해두는 것. 컨텍스트 오염되면 새 세션에서 체크포인트부터 재개. Claude Code의 `/checkpoint` 같은 게 대표.

**자가 평가 루프 (Self-evaluation Loop)**
모델이 자기 결과를 다시 자기가 평가·개선하는 패턴. 정확도 올리는 데 효과적이지만 비용이 늘어남.

---

## 모델별 한 줄 요약

| 모델군 | 만든 곳 | 특징 |
|---|---|---|
| **Claude** (Opus/Sonnet/Haiku) | Anthropic | 코딩·긴 문서·에이전트 워크로드에 강함. 1M 컨텍스트 지원 |
| **GPT** (4.x/5.x, o1/o3) | OpenAI | 범용 1위. 추론 모델(o-시리즈) 별도 라인 |
| **Gemini** (2.x/3.x) | Google | 2M+ 컨텍스트, 구글 검색 통합, 멀티모달 강함 |
| **Llama / Qwen / Mistral 등 오픈소스** | 각각 다름 | 자체 호스팅 가능. 보안·비용 통제 필요 시 |

---

## 자주 나오는 약어

- **API**: Application Programming Interface — 프로그램이 다른 프로그램을 부르는 약속
- **SDK**: Software Development Kit — 특정 언어로 API 쓰기 쉽게 묶은 라이브러리
- **CLI**: Command Line Interface — 터미널에서 텍스트로 명령하는 인터페이스
- **IDE**: Integrated Development Environment — VS Code, JetBrains 같은 편집기
- **TTHW**: Time To Hello World — 처음 켜서 첫 결과까지 걸리는 시간 (DX 지표)
- **EOS**: End of Service / End of Support — 모델 지원 종료
