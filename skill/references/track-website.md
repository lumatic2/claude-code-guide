# Track: 웹사이트

Lv 1 트랙 중 하나. 한 장짜리 자기소개 페이지를 바탕화면에 완성한다.

## 1. Collect

AskUserQuestion 한 번에 수집:

- 닉네임 또는 이름
- 한 줄 소개 (예: "사진 찍는 사람", "요리 연구가")
- 분위기 — A) 미니멀 B) 따뜻한 C) 전문적 D) 개성있는
- 넣고 싶은 섹션 — A) 소개만 B) 소개 + 연락처 C) 소개 + 작업물 D) 전부

## 2. Prepare

```bash
mkdir -p ~/Desktop/{slug}-site
```

`{slug}`는 사용자 이름에서 공백을 하이픈으로 바꾼 소문자. 예: `민지-site`, `alex-site`.

> "폴더를 만들었어요. 여기 안에 웹사이트 파일이 생겨요."

## 3. Create

`~/Desktop/{slug}-site/index.html` 한 파일로 완결한다. 반드시 포함:

- Pretendard CDN (`https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css`)
- 이름 큼직하게 + 한 줄 소개
- 선택한 섹션만
- 인라인 `<style>`로 CSS 전부 해결
- 모바일 반응형 (flexbox + `@media (max-width: 640px)`)

분위기별 색상 가이드 (임의):
- 미니멀: 흰 배경, 검정 텍스트, 얇은 선
- 따뜻한: `#FFF8F0` 배경, `#8B4513` 포인트
- 전문적: `#0F172A` 배경, 흰 텍스트, `#3B82F6` 링크
- 개성있는: 대비 강한 색조합 자유

## 4. Verify

파일 생성 후 출력:

```
파일이 바탕화면에 저장됐어요.
바탕화면 > {slug}-site > index.html 파일을 더블클릭하면 브라우저에서 열립니다.

마음에 드시나요? 색상, 글자, 내용 중 바꾸고 싶은 게 있으면 말씀해주세요.
예: "배경 파란색으로", "연락처 섹션 추가", "글씨 더 크게"
```

수정 요청이 오면 해당 부분만 Edit로 고친다.

## 5. Extend (선택)

AskUserQuestion: "인터넷에 올려서 링크 만들고 싶으세요? (무료)"

**Yes** → Netlify Drop 안내:
```
1. https://app.netlify.com/drop 접속
2. {slug}-site 폴더를 드래그앤드롭
3. 링크가 생겨요

계정 없어도 24시간 유지. 계정 만들면 영구 유지.
```

**No** → "나중에 하고 싶으면 위 주소에 폴더만 끌어다 놓으면 돼요."

---

완료 후 호출 측(SKILL.md)의 Close Protocol로 돌아간다.
`artifacts`에 `~/Desktop/{slug}-site/index.html` 추가.
