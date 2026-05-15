# AI Curriculum (구 Claude Code Guide)

> **AI 교육 허브** (`learn.askewly.com`) — 도구별·역량별 입문 트랙 모음.
> Claude Code 가이드에서 출발해 ChatGPT·Gemini·MS365 등 도구 트랙 + LLM 기초·프롬프트·컨텍스트·하네스 엔지니어링 역량 트랙으로 확장 중.
>
> 마이그레이션·다음 단계 상세는 `ROADMAP.md` (source of truth).

## 기술 스택

| 영역 | 기술 |
|---|---|
| 프레임워크 | Next.js 14 (App Router) |
| 콘텐츠 | MDX |
| 스타일링 | Tailwind CSS + shadcn/ui |
| 배포 | Vercel |
| 패키지 관리 | pnpm |

## 목표 / 완성 기준

실제 강의를 1회 진행할 수 있는 수준의 콘텐츠와 UI 완성.
수강자가 웹사이트 링크 하나로 강의를 따라가고 이후 참고 자료로 재방문 가능.

## PRD / TRD

- vault: `30-projects/claude-code-guide/PRD.md`
- vault: `30-projects/claude-code-guide/TRD.md`

## 프로젝트 구조

```
/app
  /                   → 허브 랜딩 (Phase 2에서 트랙 카탈로그로 재설계 예정)
  /tools/claude/*     → Claude Code 트랙 (intro·setup·basics·advanced·workflows·tips·cheatsheet)
  /tools/ms365/*      → MS365 add-in 트랙 (intro·setup·basics·cheatsheet) — 2026-05-15 신설
  /tools/page.tsx     → (Phase 2 예정) 도구별 카드 카탈로그
/content/tools/{track}/*.mdx  → 트랙별 MDX
/components           → CodeBlock, StepCard, Callout, SideNav, DocNav, ZoomImage
```

**트랙 추가 패턴**: `app/tools/{track}/{page}/page.tsx` + `content/tools/{track}/{page}.mdx` + `app/tools/{track}/pages.ts` (DocNav prev/next 목록). SideNav 항목은 `components/SideNav.tsx`에 수동 추가 (Phase 2 자동화 예정).

레거시 `/guide/:path*` 경로는 `next.config.ts`에서 `/tools/claude/:path*`로 308 redirect.

## 개발 명령어

```bash
# 설치
pnpm install

# 실행
pnpm dev

# 빌드
pnpm build
```

## 작업 방식

- 새 기능 → 항상 계획 먼저, 구현 나중
