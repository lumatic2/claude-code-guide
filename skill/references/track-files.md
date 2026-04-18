# Track: 파일 정리

Lv 1 트랙 중 하나. 지저분한 폴더 하나를 정리하고 그 스크립트를 파일로 남긴다.

## 1. Collect

AskUserQuestion:

- 어느 폴더? — A) 바탕화면 B) 다운로드 C) 직접 입력
- 어떻게? — A) 종류별(사진/문서/영상/기타) B) 날짜별(연/월) C) 이름 규칙 통일 D) 오래된 파일만 Archive로

> 헷갈리면 A(종류별)가 가장 무난해요.

## 2. Prepare

대상 폴더 파일 목록·개수 파악:

```bash
ls -la "{대상}" 2>/dev/null || dir "{대상}"
```

결과 요약 후 실행 계획을 Plan Mode처럼 보여주고 확인받는다:

```
{폴더}에 파일 N개 있어요.
  사진 X개, 문서 Y개, 기타 Z개

{선택 방식}으로 정리하면:
  📁 사진/ → jpg, png, heic (N개)
  📁 문서/ → pdf, docx, xlsx (N개)
  📁 기타/ → 나머지 (N개)

진행할까요?
```

사용자 OK 받기 전엔 3단계 진입 금지.

## 3. Create

스크립트를 파일로 먼저 저장한 뒤 실행한다.

```bash
mkdir -p ~/Desktop/file-organizer
```

선택별 스크립트를 `~/Desktop/file-organizer/organize.py`에 저장 (사용자가 나중에 재실행 가능하도록):

### A) 종류별

```python
import shutil
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
print(f"완료: {moved}개 이동")
```

### B) 날짜별

```python
import shutil
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
print(f"완료: {moved}개 이동")
```

### C) 이름 규칙

추가 AskUserQuestion으로 형식 확정:
- A) 날짜 prefix — `20260418_원래이름.jpg`
- B) 공백 → 언더스코어
- C) 전부 소문자
- D) 번호 prefix — `001_파일명`

### D) 오래된 파일 Archive

```python
import shutil
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
    if datetime.fromtimestamp(file.stat().st_mtime) < cutoff:
        shutil.move(str(file), str(archive / file.name))
        moved += 1
print(f"완료: {moved}개 Archive/로 이동")
```

저장 후 실행:

```bash
python ~/Desktop/file-organizer/organize.py
```

## 4. Verify

결과 요약:

```
정리 완료!

  ✓ 사진/ N개
  ✓ 문서/ N개
  ✓ 기타/ N개

폴더를 열어서 확인해보세요.
이상하면 바로 알려주세요 — 되돌리는 스크립트 만들어드릴게요.
```

충돌 처리:
- 같은 이름 충돌 → `_(1)`, `_(2)` 자동 접미사
- 권한 오류 → 원인 설명 후 해결 시도

## 5. Extend (선택)

AskUserQuestion: "이 정리를 자동으로 반복하고 싶으세요?"

- A) 일회성이면 OK (그만)
- B) 스크립트 바탕화면에 단축키로 만들기
- C) 다른 폴더에도 같은 방식 적용
- D) 자동 실행은 안 하지만 스크립트만 `~/projects/`로 옮겨두기

---

완료 후 Close Protocol.
`artifacts`에 `~/Desktop/file-organizer/organize.py` 추가.
