---
name: pdf
description: 이력서, 포트폴리오, 보고서를 PDF로 만든다. Typst 기반.
---

# /pdf — PDF 문서 만들기

이력서, 포트폴리오, 소개서, 보고서를 깔끔한 PDF로 만들어드립니다.

## Step 1: 문서 종류 확인

AskUserQuestion: 어떤 문서를 만들건가요?
- 이력서 / CV
- 포트폴리오 소개서
- 보고서 / 제안서
- 기타 (자유 형식)

## Step 2: 내용 수집

선택에 따라 필요한 정보를 AskUserQuestion으로 수집한다.

## Step 3: Typst 설치 확인

    typst --version

없으면:
- macOS: brew install typst
- Windows: winget install typst.typst
- 공식 사이트: https://typst.app

## Step 4: 문서 작성 & 컴파일

~/projects/my-document/document.typ 에 내용 작성 후:

    typst compile document.typ document.pdf

## Step 5: 결과 안내

"document.pdf 가 생성되었습니다! Finder(Mac) 또는 탐색기(Windows)에서 열어보세요."
