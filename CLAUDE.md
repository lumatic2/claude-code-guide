# Claude Code Guide

> Claude Code 입문자를 위한 개념 설명·실습 예제·치트시트 가이드 웹사이트

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
  /             → 랜딩
  /guide/intro  → Claude Code란?
  /guide/setup  → 설치 & 첫 실행
  /guide/basics → 핵심 사용법 + 실습
  /cheatsheet   → 한 장 치트시트
/content        → MDX 파일
/components     → CodeBlock, StepCard, Callout, SideNav
```

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
- 50줄+ 코드 작성 → Codex 위임
- 복잡 리서치 → Gemini 위임
