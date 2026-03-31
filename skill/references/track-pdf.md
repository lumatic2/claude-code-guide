# 트랙: PDF 문서 만들기

이 파일은 claude-study 스킬의 PDF 트랙 가이드다.

## 1단계: 문서 종류 확인

AskUserQuestion:
- 이력서 / CV
- 포트폴리오 소개서
- 보고서 / 제안서
- 기타 자유 형식

## 2단계: 내용 수집

이력서/CV인 경우 AskUserQuestion으로:
- 이름, 연락처
- 학력 (학교, 전공, 졸업연도)
- 경력 또는 활동 (회사/단체, 기간, 역할)
- 보유 기술 / 자격증
- 자기소개 한 줄

다른 문서는 목적과 주요 내용을 자유롭게 받는다.

## 3단계: Typst 확인

    typst --version

없으면 OS 확인 후 안내:

macOS:

    brew install typst

Windows:

    winget install typst.typst

Linux:

    snap install typst

또는 공식 사이트: https://typst.app/docs/

"설치 완료 후 다시 진행해요!"

## 4단계: .typ 파일 작성

~/projects/my-document/document.typ 에 작성한다.

이력서 기본 구조:
- 이름 크게 (상단 중앙)
- 연락처 (이메일, 전화번호)
- 구분선
- 학력 섹션
- 경력/활동 섹션
- 기술 섹션
- 자기소개

Typst 기본 문법:
- 제목: = 제목
- 소제목: == 소제목
- 굵게: *텍스트*
- 목록: - 항목

## 5단계: 컴파일

    cd ~/projects/my-document
    typst compile document.typ document.pdf

## 6단계: 결과 안내

"document.pdf 가 생성됐어요!
- Mac: open document.pdf
- Windows: start document.pdf

내용을 수정하고 싶으면 말씀해주세요. 다시 컴파일해드릴게요."
