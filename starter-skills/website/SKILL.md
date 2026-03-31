---
name: website
description: 나만의 소개 웹사이트를 만들고 Vercel로 배포한다. 코딩 몰라도 됨.
---

# /website — 나만의 웹사이트 만들기

코딩을 몰라도 됩니다. Claude가 다 만들어드립니다.

## Step 1: 정보 수집

AskUserQuestion으로 아래를 한 번에 질문한다:
- 이름 / 닉네임
- 한 줄 소개 (예: "디자이너", "글 쓰는 사람", "고양이 집사")
- 원하는 분위기 (미니멀 / 따뜻한 / 전문적 / 개성있는)
- 넣고 싶은 섹션 (소개글 / 작업물 / 연락처 / 블로그)

## Step 2: Node.js & pnpm 확인

node --version 과 pnpm --version 을 확인한다.
없으면 안내:
- Node.js: https://nodejs.org (LTS 버전)
- pnpm: npm install -g pnpm

## Step 3: 프로젝트 생성

~/projects/{이름}-site/ 에 Next.js + Tailwind 프로젝트 생성:

    mkdir -p ~/projects/{name}-site
    cd ~/projects/{name}-site
    pnpm create next-app . --typescript --tailwind --app --no-eslint --yes

## Step 4: 사이트 내용 작성

수집한 정보를 바탕으로 app/page.tsx 를 완성도 있게 작성한다.
한국어 폰트(Pretendard) CDN 포함. 모바일 반응형 필수.

## Step 5: 로컬 미리보기

    cd ~/projects/{name}-site && pnpm dev

"브라우저에서 http://localhost:3000 을 열어보세요!" 안내.

## Step 6: Vercel 배포 (선택)

AskUserQuestion: "인터넷에 공개할까요?"
- Yes → vercel CLI 확인 후 vercel --yes 실행, URL 전달
- No → "나중에 배포하려면 vercel 명령어를 실행하세요"
