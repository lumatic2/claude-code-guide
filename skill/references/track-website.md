# 트랙: 웹사이트 만들기

이 파일은 claude-study 스킬의 웹사이트 트랙 가이드다.

## 1단계: 정보 수집

AskUserQuestion으로 한 번에 물어본다:
- 이름 또는 닉네임이 뭔가요?
- 한 줄로 자신을 소개한다면? (예: "사진 찍는 사람", "요리 연구가")
- 원하는 분위기: 미니멀 / 따뜻한 / 전문적 / 개성있는
- 넣고 싶은 내용: 소개글 / 연락처 / 작업물 / 블로그

## 2단계: 환경 확인

아래를 순서대로 확인한다.

Node.js 확인:

    node --version

없으면: "Node.js가 필요해요. https://nodejs.org 에서 LTS 버전을 설치하고 돌아오세요!"
설치 완료를 확인한 후 진행.

pnpm 확인:

    pnpm --version

없으면:

    npm install -g pnpm

## 3단계: 프로젝트 생성

    mkdir -p ~/projects/{이름}-site
    cd ~/projects/{이름}-site
    pnpm create next-app . --typescript --tailwind --app --no-eslint --yes

"파일들을 만들고 있어요... 1~2분 걸립니다" 안내.

## 4단계: 페이지 작성

app/page.tsx 를 수집한 정보로 채운다.

반드시 포함:
- 한국어 Pretendard 폰트 (CDN: https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css)
- 이름/닉네임 크게 표시
- 한 줄 소개
- 선택한 섹션들
- 모바일 반응형 (Tailwind 반응형 클래스 사용)

디자인은 선택한 분위기에 맞게 색상/폰트 크기 조정.

## 5단계: 미리보기

    cd ~/projects/{이름}-site && pnpm dev

"브라우저에서 http://localhost:3000 을 열어보세요!
마음에 드시나요? 색상, 글자, 내용 중 바꾸고 싶은 게 있으면 말씀해주세요."

## 6단계: 배포 (선택)

AskUserQuestion: "인터넷에 올려서 링크를 받고 싶으신가요?"

Yes인 경우:

Vercel CLI 확인:

    vercel --version

없으면:

    npm install -g vercel

배포:

    cd ~/projects/{이름}-site && vercel --yes

완료 후 URL 알려주기: "🎉 배포 완료! 주소: https://..."

No인 경우: "나중에 올리고 싶으면 터미널에서 vercel 을 입력하세요."
