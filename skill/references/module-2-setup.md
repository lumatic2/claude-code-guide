# 모듈 2: 설치 확인

이 모듈은 Claude Code가 제대로 설치되었는지 확인하고, 실습 환경(샌드박스)을 준비한다.

---

## Mission 1 (m1): 설치 상태 확인

### 진행 방법

아래 3가지를 Bash 도구로 순서대로 확인한다. 결과를 사용자에게 보여주며 설명한다.

### 확인 항목

**1. Claude Code 설치 확인**
```bash
which claude && claude --version
```
- 성공: 경로와 버전이 표시되면 "Claude Code 설치 확인!"
- 실패: 설치 안내
  ```bash
  npm install -g @anthropic-ai/claude-code
  ```

**2. Node.js 버전 확인**
```bash
node --version
```
- v18 이상이면 통과
- 미만이면: "Node.js 18 이상이 필요합니다. https://nodejs.org 에서 최신 LTS를 설치하세요."

**3. 결과 종합**
모두 통과하면:
> 설치 상태 양호! 다음 미션으로 넘어갑니다.

하나라도 실패하면 해결 방법을 안내하고, 해결 후 다시 확인할 수 있게 한다.

---

## Mission 2 (m2): API 키 확인

### 중요: API 키 값을 절대 화면에 출력하지 않는다!

### 진행 방법

```bash
echo $ANTHROPIC_API_KEY | wc -c
```

- 결과가 2 이상이면 (줄바꿈 포함): "API 키가 설정되어 있습니다!"
- 결과가 1이면 (빈 값): 설정 안내를 진행한다

### 미설정 시 안내

> API 키가 설정되지 않았습니다. 아래 방법으로 설정하세요:
>
> **임시 설정** (현재 세션만):
> ```bash
> export ANTHROPIC_API_KEY=sk-ant-your-key-here
> ```
>
> **영구 설정** (권장):
> ```bash
> echo 'export ANTHROPIC_API_KEY=sk-ant-your-key-here' >> ~/.zshrc
> source ~/.zshrc
> ```
>
> API 키는 https://console.anthropic.com 에서 발급받을 수 있습니다.

설정 후 다시 확인 명령어를 실행해서 결과를 보여준다.

---

## Mission 3 (m3): 샌드박스 생성

### Teach

> Claude Code는 **프로젝트 디렉토리 안에서 실행**해야 제대로 동작합니다.
> 디렉토리 구조, 파일 내용, package.json 등을 읽어서 프로젝트를 이해하기 때문이에요.
>
> 앞으로의 실습은 샌드박스 디렉토리에서 진행합니다. 여러분의 실제 프로젝트는 건드리지 않아요.

### 샌드박스 생성

아래 순서로 디렉토리와 시드 파일을 생성한다:

```bash
mkdir -p /tmp/claude-study-sandbox/my-project/src
```

**package.json**:
```json
{
  "name": "claude-study-practice",
  "version": "1.0.0",
  "description": "Claude Code 학습용 프로젝트",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js"
  }
}
```
→ Write 도구로 `/tmp/claude-study-sandbox/my-project/package.json`에 저장

**src/index.js**:
```javascript
console.log("Hello, Claude Code!");
console.log("이 파일은 학습용 샌드박스 프로젝트입니다.");
```
→ Write 도구로 `/tmp/claude-study-sandbox/my-project/src/index.js`에 저장

### 검증

생성한 파일들을 Read 도구로 읽어서 사용자에게 보여준다:
> 샌드박스 프로젝트가 준비되었습니다!
> - 위치: `/tmp/claude-study-sandbox/my-project/`
> - 파일: `package.json`, `src/index.js`

```bash
node /tmp/claude-study-sandbox/my-project/src/index.js
```
실행 결과를 보여준다: "Hello, Claude Code!"

---

## 모듈 완료

"모듈 2 완료! 개발 환경이 준비되었습니다. 다음 모듈에서 본격적으로 실습합니다."
진행도 저장: module 2 status → "completed", missions_done → ["m1", "m2", "m3"]
