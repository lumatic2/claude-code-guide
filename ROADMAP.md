# AI Guide (구 Claude Code Guide) — Roadmap

> AI 교육 허브(`learn.askewly.com`)로 확장 중. Claude Code 가이드는 `/tools/claude/*` 트랙으로 편입.
> 마지막 업데이트: 2026-05-15 (Phase 2 완료)

## 현재 상태

- 사이트: Vercel 프로덕션 배포
  - 신규 도메인 `learn.askewly.com` (허브)
  - 기존 `guide.askewly.com` → `learn.askewly.com/tools/claude` 308 redirect (Vercel domain redirect, 인프라 작업 별도)
- 트리: `/tools/claude/{intro,setup,basics,advanced,workflows,tips,cheatsheet}` 7개 MDX
- 스킬: `/claude-guide` 5단계 온보딩 (Lv 1 트랙 4개 → Lv 2 CLAUDE.md 감각 → Lv 3 터미널 전환 → Lv 4 git/GitHub → Lv 5 나만의 스킬). CURRENT_MAX_LEVEL=5

## AI 교육 허브 마이그레이션 (2026-05-11)

전체 기획: Claude Code 단일 가이드 → AI 종합 교육 허브로 확장. 하위 트랙으로 LLM 기초·프롬프트/컨텍스트/하네스 엔지니어링·도구별(Claude/ChatGPT/Gemini).

### Phase 1 — 트리 재배치 (진행 중, 2026-05-11)
- [x] `app/guide/*`, `app/cheatsheet` → `app/tools/claude/*`로 git mv
- [x] `content/*.mdx` → `content/tools/claude/*.mdx`
- [x] 각 page.tsx의 readFileSync 경로 + DocNav `current` prop 갱신
- [x] SideNav, DocNav, 랜딩의 `/guide/*`·`/cheatsheet` href 갱신
- [x] MDX 내부 링크 3건 갱신 (setup·basics·advanced)
- [x] `next.config.ts`에 `/guide/:path*` → `/tools/claude/:path*` + `/cheatsheet` 308 redirect (백업용 internal)
- [x] 외부 문서 도메인 갱신 (README, install.sh, skill/SKILL.md, level-3-skill.md)
- [x] 빌드 검증 (`pnpm build` 통과, 11페이지 정적 생성, commit `1653935`)
- [ ] 인프라 (사용자 작업): Cloudflare DNS `learn` CNAME → vercel-dns + Vercel Domains에 `learn.askewly.com` 추가, 기존 `guide.askewly.com`은 `learn.askewly.com/tools/claude`로 redirect 설정
- [ ] 레포 rename (`claude-code-guide` → `ai-guide`) — 인프라 안정화 후 (로컬 폴더는 2026-05-17 변경 완료)

### Phase 2 — 허브 골격 (2026-05-15 완료)
- [x] **MS365 트랙 신설 (2026-05-15, `2234649` + `e5b44dc`)** — `/tools/ms365/{intro,setup,basics,cheatsheet}` 4페이지. Excel/Word/PPT 묶음 add-in 설치·로그인·첫 프롬프트. Marketplace vs claude.ai/downloads 구분 명시. DocNav을 `pages` prop으로 일반화
- [x] **`app/tools/page.tsx` 카탈로그 (`a3a27d7`)** — Claude/MS365/ChatGPT/Gemini 4카드, ready/soon 상태
- [x] **SideNav 2단 구조 (`a3a27d7`)** — Claude Code / Microsoft 365 섹션 헤더, `[MS365]` 임시 prefix 제거
- [x] **빈 트랙 placeholder (`6a3b5f5`)** — `/tools/chatgpt`, `/tools/gemini` 준비중 페이지
- [x] **랜딩 재설계 (`006e6eb`)** — hero 아래 4카드 직접 노출, ToolCard 컴포넌트 분리로 카탈로그·랜딩 공유. 푸터·layout metadata "AI 학습 허브"로 정리

### Phase 3 — 콘텐츠 이식 (예정)
- [ ] foundations / prompt-engineering / context-engineering / harness-engineering MDX
- [ ] 4주 과외·3시간 강의 콘텐츠를 트랙에 매핑

## SKKU RISE 세미나 (2026-05-17 제안)

> 제안서: `docs/seminars/skku-rise/proposal.md` · 본 사업단 담당자 결재 대기

### 다음 할 일 — 제안서 송부 후
- [ ] 세미나 형식·일정·운영비 사업단과 협의 → 확정
- [ ] 학생 사전 안내문 1쪽 작성 (proposal 부록 형식 따라)
- [ ] follow-up 설문(1주 후) 양식 준비

### 다음 할 일 — 모듈별 자료·라이브 시나리오 구체화

각 모듈에 들어갈 캡처·공식 URL·라이브 시나리오를 사전 픽스. proposal 본문은 골격까지만 잡혀 있음.

**A1. Office 문서를 AI로 만들기**
- [ ] Claude for Office (Marketplace) add-in 설치 화면 캡처 + Word·Excel·PPT 각 사이드패널 작동 캡처 3장
- [ ] Claude Code Skills 경로 (`/pdf`, `/generate-asset` 등) 실행 결과 PDF 1개
- [ ] 공통 입력 데이터 1개 픽스 (예: 시장조사 노트 → 3개 포맷 동시 변환)
- [ ] 공식 URL — Marketplace 링크 + Claude Code skills 문서

**A2. 일상 도구 묶음 (Slack·Notion + LLM 3종)**
- [ ] Notion AI Ask / Slack에서 Claude 호출 스크린샷 본인 워크플로우 캡처
- [ ] LLM 3종 비교 — 같은 질문 3개 카테고리(사실조회·창작·코드) 미리 픽스
- [ ] Gemini Deep Research vs ChatGPT Deep Research 결과 1쌍 캡처
- [ ] A2 분량(35분) 안의 세부 구성 결정 (모듈 내용 좀 묽음 — 후보 5개 중 선별 필요)

**B1. LLM 작동 원리**
- [ ] OpenAI tokenizer 결과 캡처
- [ ] Karpathy "Intro to LLMs" YouTube 링크 + 1~2분 클립 결정
- [ ] 컨텍스트 윈도우 비교 표 — Claude / GPT / Gemini 최신 수치 (강의 직전 갱신)

**B2. 영역별 AI 활용 케이스 — 마케팅 라이브**
- [ ] 마케팅 라이브 시나리오 1개 픽스 (예: 신제품 인스타 광고 카피 3종 + A/B 안)
- [ ] 나머지 3영역(전략·재무·생산) 1줄 케이스 — tax-agent을 재무 케이스로

**B3. 프롬프트 엔지니어링**
- [ ] v1→v5 진화 예시 미리 작성 (자기소개서/이메일/리포트 중 1개 인문계 친화 주제)
- [ ] 나쁜 답 vs 좋은 답 캡처 2쌍 (라이브 망가질 때 백업)

**B4. 컨텍스트 엔지니어링**
- [ ] 페이크 회사 정책 PDF 1개 작성 → "첨부 전 vs 후" 결과 캡처
- [ ] `learn.askewly.com`의 CLAUDE.md 트랙 페이지 활용 — 본인 작품 시연

**B5. 하네스 엔지니어링 + 에이전트**
- [ ] Claude Code 라이브 데모 시나리오 1개 픽스 (본인 프로젝트에서 작은 변경)
- [ ] Anthropic "Building Effective Agents" 블로그 링크
- [ ] 에이전트 vs 챗봇 한 장 비교 다이어그램

**B6. Git·GitHub**
- [ ] 본인 GitHub 프로필 캡처
- [ ] 공개 레포 1개의 README/커밋 히스토리 캡처
- [ ] 이력서·포트폴리오에 GitHub URL 들어간 예시 (본인 또는 가상)

### 다음 할 일 — 샘플 산출물 (제안서 동봉)
- [ ] 샘플 노션 안내 페이지 작성 → 공개 링크
- [ ] AI로 만든 샘플 PPT 1개 (Claude/Codex 라이브 결과물) — 포맷 결정 (HTML·skill·Typst)
- [ ] 데모 영상 1분 — 기존 보유 영상 큐레이션

## 완료

### 가이드 사이트 정확성·일관성 (2026-04-18, `491a084`)
- [x] `workflows.mdx` `/plan` 예시 → Plan Mode 공식 동작으로 교체
- [x] `advanced.mdx` 권한 모드 `auto`/`dontAsk` 추가, 잘못된 `/permissions set` 구문 제거
- [x] `cheatsheet.mdx` gstack 전용 스킬 분리·제거 (`/review`는 내장이라 유지)
- [x] `cheatsheet.mdx` `/fast` Opus 4.6 전용 표기
- [x] `cheatsheet.mdx` Ctrl+L 설명 정확화 ("프롬프트 입력 지우기 + 재그리기")
- [x] 랜딩 히어로 "터미널에서" → "Claude 앱에서"
- [x] `basics.mdx` 슬래시·단축키 표 치트시트와 동기화
- [x] `setup.mdx` 스킬 설치 스크립트 4트랙 완전 지원
- [x] `/drawing`·`/writing`·`/music`·`/creative` advanced.mdx에 연계
- [x] `/guide/tips` 페이지 신설 (비용·컨텍스트·막혔을 때 루틴 + FAQ)
- [x] 각 MDX 하단 공식 문서 딥링크
- [x] MCP 개념 섹션 추가

### 스킬 리네이밍·재설계 (2026-04-18, `1804857`)
- [x] `/claude-study` → `/claude-guide` 전역 리네이밍
- [x] 3단계 레벨 구조: Lv 1 첫 결과물 → Lv 2 샌드박스 → Lv 3 나만의 스킬
- [x] `progress.json`(`~/.claude-guide/`) 기반 복귀자 분기
- [x] `track-*.md` 4개 Collect/Prepare/Create/Verify/Extend 스키마 통일
- [x] `level-2-sandbox.md`, `level-3-skill.md` 신설
- [x] AskUserQuestion 포맷 규약 + Close Protocol(DONE/BLOCKED/NEEDS_CONTEXT)
- [x] install.sh / install.ps1 / setup.mdx 설치 스크립트 동기화

### /claude-guide Lv 1 실사용 & 1차 개선 (2026-04-19, custom-skills 레포)
- [x] Lv 1 웹사이트 트랙 완주 — progress.json 생성·Close Protocol 동작 확인 (`~/Desktop/yusung-site/index.html`)
- [x] source(`custom-skills/claude-study`) → `claude-guide`로 재정렬, deployed 기준 sync
- [x] 웹사이트 트랙 첫 질문 "어떤 웹사이트?" 용도 분기 (포트폴리오/링크/게임/이벤트)
- [x] Extend 단계 안내 보강 (Netlify Drop 유지시간·공유 테스트·Vercel/Cloudflare 대안)
- [x] 스킬 진입 인트로 파트 추가 (유성 1인칭 + Claude Code 설명)
- [x] AskUserQuestion 사용 규약 2개 — 자유입력은 자연 대화로, 한글 `\uXXXX` 이스케이프 금지

### Lv 1 디자인 템플릿화 (2026-04-19, custom-skills 레포)
- [x] Stitch MCP(Gemini 3 Pro)로 포트폴리오 초안 1종 생성 → 플레이스홀더 주입
- [x] 포트폴리오 3종 (`portfolio-minimal` / `portfolio-warm` / `portfolio-dark`) — 완전 black 다크, 공통 placeholders: `__NAME__` / `__TAGLINE__` / `__LOCATION__` / `__EMAIL__` / `__ABOUT__` / `__SKILLS__` / `__WORKS__`
- [x] 포트폴리오 디테일 보강 — 은은한 그리드 hero 배경, 스크롤 인디케이터(바운스), 스킬 마퀴(가로 무한 스크롤), Work 카드 CSS 그라데이션 썸네일(4종), 대형 이메일 CTA
- [x] 링크 모음 4종 (`links-minimal` / `links-dark` / `links-colorful` / `links-retro`) — 아바타(이니셜)+링크 버튼 스택, retro는 neobrutalist 전용 버튼 마크업
- [x] 이벤트 랜딩 2종 (`event-minimal` / `event-warm`) — 실시간 D-day 카운트다운, 이벤트 종료 시 감사 메시지 자동 전환
- [x] `track-website.md` Create 섹션 재작성 — A/B/D 용도별 "템플릿 사용" 절 추가, 분위기-파일 매핑, 토큰 치환 워크플로우. C(게임)는 템플릿 없이 재량으로 명시
- [x] 샘플 데이터로 렌더 프리뷰 후 브라우저 육안 확인

### 모바일 최적화 + 스킬 설치 단순화 (2026-04-20)
- [x] 스킬 설치 블록 7 URL 나열 → 단일 `git clone` 5줄 멱등 명령 (`916b630`, `57e20c2`)
- [x] `skill/VERSION` 파일 + SKILL.md Step 0에 원격 VERSION 비교·업데이트 안내 로직 추가 (`916b630`)
- [x] 모바일 네비 가로 스크롤 바 → 햄버거 드로어 (44px 탭타깃, Esc/백드롭 닫기, body 스크롤 락) (`39ae209`)
- [x] 터미널 데모 결과 패널 모바일은 오버레이로 터미널 전체 덮기 (`723996c`)
- [x] 설치 가이드 이미지를 `ZoomImage` 컴포넌트로 교체 — 모바일 풀폭, 탭 시 풀스크린 확대 (`21c28b6`)
- [x] `setup.mdx` 쿠폰 문구 → 유료 플랜(Pro/Max) 필수 안내 (`21c28b6`)
- [x] 본문 상단 여백 `py-6` → `py-8`, 터미널 데모 ⏸/▶ 버튼, 결과 패널 `resultOpen` 시점 지연 마운트로 SSR 플래시·iframe 선로딩 해결 (`30438be`)
- [x] step2·step3 스크린샷 재촬영(저해상도 원본) + 여백 크롭 + 2× 업스케일 (`18dfa8b`)

### AI 실무 커리큘럼 v1 작성 (2026-04-26)
- [x] `docs/curriculum/` 디렉토리 신설 — 외부 강의·개인 과외용 단일 소스
- [x] **두 트랙 분리 설계** — 3시간 강의(콘텐츠 전수: 감각·충격·첫 시도)와 4주 과외(메타-스킬 전수: 학습 시스템 자체)는 목적이 다르므로 골격도 다름. 압축본 관계 아님
- [x] `README.md` — 두 트랙 목적 차이 + 공유 자산(용어집·데모 자산·1차 출처) + 트랙별 차시 구조
- [x] `4-week-tutoring.md` — **메타-스킬 중심 재설계**. 4주 = 첫 모델 잡기 → 정보 시스템 → 평가 프레임워크 → 통합 사이클. 코칭형 4단 구조(이번 주 질문 / 함께 탐색 / 혼자 한 번 더 / 자기 사이클)
- [x] `3-hour-lecture.md` — 감각 전수형 3단 구조(개념 10분 / 데모 30분 / 액션+Q&A 10분). "자주 하는 실수" 섹션 제거
- [x] `glossary.md` — 4파트 용어집 + 모델별 한 줄 요약 + 약어 (두 트랙 공유 자산)
- [x] **Notion 업로드 (2026-04-26)** — "허브" 페이지 아래 4개 페이지 트리 publish:
  - 인덱스: https://www.notion.so/AI-34eab03d352581f98893d285c6af2c4b
  - 4주 과외: https://www.notion.so/4-34eab03d352581b0a7b4d4c537b72f14
  - 3시간 강의: https://www.notion.so/3-34eab03d3525818b81e9e4fc6612a26c
  - 용어집: https://www.notion.so/34eab03d3525817f8b3bd9daa08146d2

## 다음에 할 일

- [ ] **커리큘럼 1차 예행**: 3시간 강의 트랙으로 자체 리허설 1회 → 부족한 데모/넘치는 분량 식별 → `## 강의 노트` 섹션에 누적
- [ ] **커리큘럼 사이트 통합 검토**: 2~3회 실제 강의 후 사이트 `/curriculum` 새 섹션으로 추가 여부 결정 (현재는 MD only)
- [ ] AskUserQuestion에서 사용자가 "명확화" 요청 시 재질문 플로우 정돈
- [ ] 실제 강의 1회 예행 후 수강자 피드백 반영
- [x] **레벨 재설계 (2026-04-20)** — 3단계 → 5단계(+확장)로 확장. `CURRICULUM.md` 기준:
  - [x] Lv 2 재작성: `level-2-sandbox.md` → `level-2-claude-md.md` (앱만으로 완수, CLAUDE.md 감각 집중)
  - [x] Lv 3 신설: `level-3-terminal.md` (proj 함수 + ROADMAP.md + 터미널 전환, ai-usage-widget/workspace-pulse-dashboard 소개)
  - [x] Lv 4 신설: `level-4-git.md` (git init + GitHub 푸시)
  - [x] Lv 5: `level-3-skill.md` → `level-5-skill.md` 개명
  - [x] SKILL.md에 `CURRENT_MAX_LEVEL` 도입, Phase 2-RETURNING 분기 갱신
  - [x] 공통 프로토콜에 progress.json 자동 청소 + 가정 모드(dry-run) 추가
- [ ] Lv 2 실사용 테스트에서 발견된 엣지 개선 잔여 — Lv 1 artifact 존재 확인 로직을 Lv 1 트랙에도 선반영, `CURRENT_MAX_LEVEL` 기반 소개 문구 동적화
- [ ] 템플릿 실전 사용 후 편차 큰 분위기(과감한/개성있는) 추가 고려
- [ ] 모바일 TerminalDemo 일시정지 UX 실사용 피드백 확인 후 다듬기
- [ ] SideNav 햄버거 드로어 사용 데이터 수집 → 필요 시 하단 탭바로 재평가

