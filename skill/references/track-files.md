# 트랙: 파일 정리 & 자동화

이 파일은 claude-study 스킬의 파일 정리 트랙 가이드다.

## 1단계: 정리할 대상 파악

AskUserQuestion으로 한 번에 물어본다:
- 어느 폴더를 정리하고 싶으신가요? (예: 바탕화면, 다운로드 폴더)
- 어떻게 정리하고 싶으신가요?
  - A) 종류별로 — 사진/문서/영상/기타로 나누기
  - B) 날짜별로 — 연도/월 폴더로 나누기
  - C) 이름 규칙 통일 — 파일 이름을 일정한 형식으로 바꾸기
  - D) 오래된 파일 정리 — 오래된 파일만 따로 모으기

> 정리 방법이 헷갈리면 A(종류별)가 가장 무난해요. 사진은 사진끼리, 문서는 문서끼리 모이는 방식이에요.

## 2단계: 현재 상태 확인

폴더 안 파일 목록과 개수를 먼저 파악한다:

    ls -la {대상 폴더} 2>/dev/null || dir "{대상 폴더}"

파악 후 사용자에게 요약 보고:

"[폴더명] 안에 파일이 총 N개 있어요.
사진 X개, 문서 Y개, 기타 Z개 정도예요.
[선택한 방식]으로 정리하면 이렇게 됩니다: ..."

## 3단계: 계획 확인 (중요)

실행 전 반드시 /plan으로 계획을 먼저 보여주고 확인받는다:

"실행 전에 어떻게 할지 보여드릴게요:

  📁 사진/ → jpg, png, heic, gif 파일 (N개)
  📁 문서/ → pdf, docx, xlsx, pptx, txt 파일 (N개)
  📁 영상/ → mp4, mov, avi 파일 (N개)
  📁 기타/ → 나머지 파일 (N개)

총 N개 파일이 이동됩니다.
진행할까요?"

사용자가 OK하면 4단계로 이동.

> 파일을 이동하면 되돌리기 어려워요. 꼭 계획을 먼저 확인하세요.

## 4단계: 실행

선택한 방식에 따라 처리한다.

### A) 종류별 정리

확장자 기준으로 분류하는 스크립트를 작성하고 실행:

```python
import os, shutil
from pathlib import Path

target = Path("{대상 폴더}").expanduser()
rules = {
    "사진": [".jpg", ".jpeg", ".png", ".heic", ".gif", ".webp", ".bmp"],
    "문서": [".pdf", ".docx", ".doc", ".xlsx", ".xls", ".pptx", ".ppt", ".txt", ".hwp"],
    "영상": [".mp4", ".mov", ".avi", ".mkv", ".wmv"],
    "음악": [".mp3", ".wav", ".flac", ".m4a", ".aac"],
}

moved = 0
for file in target.iterdir():
    if not file.is_file():
        continue
    dest_name = "기타"
    for folder, exts in rules.items():
        if file.suffix.lower() in exts:
            dest_name = folder
            break
    dest = target / dest_name
    dest.mkdir(exist_ok=True)
    shutil.move(str(file), str(dest / file.name))
    moved += 1

print(f"완료: {moved}개 파일 정리됨")
```

### B) 날짜별 정리

파일의 수정 날짜 기준으로 연도/월 폴더로 분류:

```python
import os, shutil
from pathlib import Path
from datetime import datetime

target = Path("{대상 폴더}").expanduser()
moved = 0
for file in target.iterdir():
    if not file.is_file():
        continue
    mtime = datetime.fromtimestamp(file.stat().st_mtime)
    dest = target / str(mtime.year) / f"{mtime.month:02d}월"
    dest.mkdir(parents=True, exist_ok=True)
    shutil.move(str(file), str(dest / file.name))
    moved += 1

print(f"완료: {moved}개 파일 정리됨")
```

### C) 이름 규칙 통일

원하는 이름 형식을 확인 후 일괄 변경:

AskUserQuestion: "파일 이름을 어떤 형식으로 바꿀까요?"
- A) 날짜 앞에 붙이기 — 20260405_원래이름.jpg
- B) 공백을 밑줄로 — 내 사진.jpg → 내_사진.jpg
- C) 소문자로 통일 — MyPhoto.JPG → myphoto.jpg
- D) 번호 붙이기 — 001_파일명, 002_파일명...

선택에 따라 스크립트 작성 후 실행.

### D) 오래된 파일 정리

기준 날짜(기본: 1년 이상)보다 오래된 파일을 Archive 폴더로 이동:

```python
import os, shutil
from pathlib import Path
from datetime import datetime, timedelta

target = Path("{대상 폴더}").expanduser()
archive = target / "Archive"
archive.mkdir(exist_ok=True)
cutoff = datetime.now() - timedelta(days=365)
moved = 0
for file in target.iterdir():
    if not file.is_file():
        continue
    mtime = datetime.fromtimestamp(file.stat().st_mtime)
    if mtime < cutoff:
        shutil.move(str(file), str(archive / file.name))
        moved += 1

print(f"완료: {moved}개 오래된 파일 → Archive/")
```

## 5단계: 결과 보고

실행 후 결과 요약:

"정리 완료! 🎉

  ✓ 사진/ N개
  ✓ 문서/ N개
  ✓ 영상/ N개
  ✓ 기타/ N개

폴더를 열어서 확인해보세요.
마음에 안 드는 부분이 있으면 말씀해주세요."

문제가 생겼을 때:
- 같은 이름 파일 충돌 → 자동으로 _(1), _(2) 붙여서 처리
- 권한 오류 → 원인 설명 후 해결 시도
- 실수로 잘못 이동 → 되돌리는 스크립트 즉시 제공

## 6단계: 자동화 (선택)

AskUserQuestion: "이 정리를 앞으로 자동으로 하고 싶으신가요?"

Yes인 경우 — 정리 스크립트를 파일로 저장:

"정리 스크립트를 ~/projects/file-organizer/organize.py 로 저장했어요.
다음에 정리하고 싶을 때 Claude Code에게 '파일 정리 스크립트 실행해줘'라고 하면 됩니다."

---

## 다음에 해볼 것

파일 정리를 완료했어요! 더 해보고 싶다면:

**바로 이어서**
- "이 폴더도 같은 방식으로 정리해줘" → 다른 폴더에 적용
- "정리 기준을 바꿔줘" → 방식 변경

**다른 트랙 도전**
- 웹사이트 트랙: 정리한 사진들로 갤러리 페이지 만들기
- PDF 트랙: 문서들을 하나의 PDF로 합치기

**Claude Code 더 알아보기**
- `/help` 입력 → Claude Code의 모든 기능 보기
- https://guide.askewly.com → 개념 정리 가이드
