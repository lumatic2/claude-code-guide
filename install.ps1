# Claude Code 스타터 팩 설치 스크립트 (Windows PowerShell)
# 사용법: irm https://raw.githubusercontent.com/lumatic2/claude-code-guide/master/install.ps1 | iex

$REPO = "https://raw.githubusercontent.com/lumatic2/claude-code-guide/master"
$SKILLS_DIR = "$env:USERPROFILE\.claude\skills"

Write-Host ""
Write-Host "╔══════════════════════════════════════╗"
Write-Host "║   Claude Code 스타터 팩 설치 중...   ║"
Write-Host "╚══════════════════════════════════════╝"
Write-Host ""

# claude-study 스킬 설치
Write-Host "📦 claude-study 설치 중..."
New-Item -ItemType Directory -Force -Path "$SKILLS_DIR\claude-study\references" | Out-Null
Invoke-WebRequest "$REPO/skill/SKILL.md" -OutFile "$SKILLS_DIR\claude-study\SKILL.md" -UseBasicParsing
Write-Host "  ✓ SKILL.md"

foreach ($ref in @("track-website", "track-writing", "track-pdf", "track-files")) {
    try {
        Invoke-WebRequest "$REPO/skill/references/$ref.md" -OutFile "$SKILLS_DIR\claude-study\references\$ref.md" -UseBasicParsing
        Write-Host "  ✓ references/$ref.md"
    } catch { Write-Host "  ⚠️  $ref.md 다운로드 실패" }
}

# 스타터 스킬 설치
foreach ($skill in @("writing", "website", "pdf")) {
    Write-Host "📦 $skill 스킬 설치 중..."
    New-Item -ItemType Directory -Force -Path "$SKILLS_DIR\$skill" | Out-Null
    try {
        Invoke-WebRequest "$REPO/starter-skills/$skill/SKILL.md" -OutFile "$SKILLS_DIR\$skill\SKILL.md" -UseBasicParsing
        Write-Host "  ✓ $skill 완료"
    } catch { Write-Host "  ⚠️  $skill 다운로드 실패" }
}

Write-Host ""
Write-Host "╔══════════════════════════════════════╗"
Write-Host "║          설치 완료! 🎉               ║"
Write-Host "╚══════════════════════════════════════╝"
Write-Host ""
Write-Host "Claude Code를 열고 /claude-study 를 입력해서 시작하세요."
Write-Host ""
