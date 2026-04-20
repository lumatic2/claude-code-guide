# Claude Code Guide — Roadmap

> 가이드 사이트(`guide.askewly.com`)와 `/claude-guide` 스킬의 유지·개선 작업 추적.
> 마지막 업데이트: 2026-04-20

## 현재 상태

- 사이트: Vercel 프로덕션 배포, Cloudflare 서브도메인 `guide.askewly.com` 연결
- 콘텐츠: `intro`, `setup`, `basics`, `workflows`, `advanced`, `tips`, `cheatsheet` 7개 MDX
- 스킬: `/claude-guide` 3단계 온보딩 (Lv 1 트랙 4개 + Lv 2 샌드박스 + Lv 3 나만의 스킬)

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

## 다음에 할 일

- [ ] AskUserQuestion에서 사용자가 "명확화" 요청 시 재질문 플로우 정돈
- [ ] 실제 강의 1회 예행 후 수강자 피드백 반영
- [ ] Lv 2/3 reference 실사용 후 부족한 지점 보강
- [ ] 템플릿 실전 사용 후 편차 큰 분위기(과감한/개성있는) 추가 고려
- [ ] 모바일 TerminalDemo 일시정지 UX 실사용 피드백 확인 후 다듬기
- [ ] SideNav 햄버거 드로어 사용 데이터 수집 → 필요 시 하단 탭바로 재평가

## 이어서 할 일

- 모바일 최적화 1차 완료. 실사용자(모바일)에게 URL 공유 후 피드백 수집 → `/guide/setup`, `/guide/basics` 등에서 병목 추가 발굴.
- 또는 강의 예행용 스크립트 준비(Lv 1 시연 흐름) 시작 가능.
