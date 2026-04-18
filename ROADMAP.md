# Claude Code Guide — Roadmap

> 가이드 사이트(`guide.askewly.com`)와 `/claude-guide` 스킬의 유지·개선 작업 추적.

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

## 다음에 할 일

- [ ] `/claude-guide` 실제 세션 돌려보며 UX 점검 (Lv 1 완주)
- [ ] AskUserQuestion에서 사용자가 "명확화" 요청 시 재질문 플로우 정돈 — 이번 세션에서 피곤해서 중단한 케이스 발견
- [ ] 실제 강의 1회 예행 후 수강자 피드백 반영
- [ ] Lv 2/3 reference 실사용 후 부족한 지점 보강

## 이어서 할 일

- 다음 세션: 충분히 쉰 뒤 `/claude-guide` 재호출해서 웹사이트 트랙 완주. progress.json이 생성되는지, Close Protocol이 실제로 동작하는지 확인.
