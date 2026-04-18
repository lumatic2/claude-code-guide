# Claude Code 가이드

Claude Code 입문자를 위한 가이드 웹사이트 + 인터랙티브 학습 스킬.

**가이드 사이트**: https://guide.askewly.com

---

## 빠른 시작

Claude Code를 설치한 후, 터미널에서 실행하세요:

```bash
curl -fsSL https://raw.githubusercontent.com/Mod41529/claude-code-guide/master/install.sh | bash
```

설치 완료 후 Claude Code를 열고:

```
/claude-study
```

코딩을 몰라도 됩니다. 웹사이트, 소설, PDF 중 하나를 골라 직접 만들면서 Claude Code를 배웁니다.

---

## 포함된 것

### 가이드 사이트 (`/app`, `/content`)
- Claude Code 소개, 설치, 핵심 사용법, 고급 설정, 워크플로우, 치트시트

### 학습 스킬 (`/skill`)
- `/claude-study` — 결과물을 만들며 배우는 입문 스킬
  - 웹사이트 트랙 (Next.js + Vercel)
  - 소설/에세이 트랙
  - PDF 문서 트랙 (Typst)

### 스타터 스킬 (`/starter-skills`)
- `/writing` — 한국어 글쓰기
- `/website` — 웹사이트 만들기
- `/pdf` — PDF 문서 만들기

---

## 개발

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # 빌드 확인
```

---

## 라이선스

MIT
