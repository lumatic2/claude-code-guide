# Claude Code Guide — Roadmap

> 가이드 사이트(`guide.askewly.com`)와 `/claude-guide` 스킬의 유지·개선 작업 추적.

## 현재 상태

- 사이트: Vercel 프로덕션 배포, Cloudflare 서브도메인 `guide.askewly.com` 연결
- 콘텐츠: `intro`, `setup`, `basics`, `workflows`, `advanced`, `cheatsheet` 6개 MDX
- 스킬: `skill/SKILL.md` + `skill/references/{track-website,track-writing,track-pdf,track-files}.md`

## P0 — 정확성 (잘못된 정보 수정)

- [ ] `workflows.mdx`의 `/plan` 슬래시 명령 예시 제거·수정 → Shift+Tab 플랜 모드로 교체
- [ ] `advanced.mdx` 권한 모드명과 `/permissions set` 문법 공식 문서 기준으로 검증·보정
- [ ] `cheatsheet.mdx`에서 gstack 전용 스킬(`/browse`, `/qa`, `/review`, `/learn`, `/careful`) 내장 명령어 섹션에서 분리 또는 제거
- [ ] `cheatsheet.mdx` `/fast`에 "Opus 4.6 전용" 조건 병기
- [ ] `cheatsheet.mdx` `/effort`, `Ctrl+B`, `Ctrl+L` 등 실재 여부 검증 (문서 근거 확보 후 유지/삭제)

## P1 — 일관성

- [ ] `app/page.tsx` 히어로 문구 "터미널에서 대화하는" → 앱 기준 표현으로 교체 (커밋 9eb27b7 방향과 정합)
- [ ] `basics.mdx` 슬래시 명령어·단축키 표를 치트시트와 동일 범위로 확장
- [ ] `setup.mdx` 스킬 설치 스크립트에 `track-pdf.md`, `track-files.md` 추가 (B분기 4트랙 완전 지원)
- [ ] `SKILL.md` C-D에서 소개하는 스킬(`/drawing`, `/writing`, `/music`, `/creative`)을 가이드 사이트에서도 링크/설명

## P2 — 추가 콘텐츠

- [ ] FAQ/실전 팁 페이지 신설: 비용 관리(`/cost`·모델 선택), 컨텍스트 관리(`/compact`·`/clear`), 막혔을 때 디버깅 루틴
- [ ] 공식 문서(`docs.claude.com/docs/claude-code`) 딥링크 보강 (각 개념 페이지 하단 "더 읽기")
- [ ] MCP 개념 소개 섹션(advanced 또는 별도 페이지)
- [ ] 실제 강의 1회 예행 후 수강자 피드백 반영

## 이어서 할 일

- P0 항목부터 착수. 우선 `workflows.mdx`의 `/plan` 예시 교체 — 공식 플랜 모드 동작(Shift+Tab)으로 스크린샷 또는 대화 예시 재작성.
- `/fast`, `/effort`, 권한 모드 문법 검증은 공식 문서 fetch 한 번으로 묶어 처리.
