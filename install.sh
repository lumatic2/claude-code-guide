#!/bin/bash
# Claude Code 스타터 팩 설치 스크립트
# 사용법: curl -fsSL https://raw.githubusercontent.com/lumatic2/claude-code-guide/master/install.sh | bash

set -e

REPO="https://raw.githubusercontent.com/lumatic2/claude-code-guide/master"
SKILLS_DIR="$HOME/.claude/skills"

echo ""
echo "╔══════════════════════════════════════╗"
echo "║   Claude Code 스타터 팩 설치 중...   ║"
echo "╚══════════════════════════════════════╝"
echo ""

mkdir -p "$SKILLS_DIR"

# claude-study 스킬 설치
echo "📦 claude-study 설치 중..."
mkdir -p "$SKILLS_DIR/claude-study/references"
curl -fsSL "$REPO/skill/SKILL.md" -o "$SKILLS_DIR/claude-study/SKILL.md" 2>/dev/null && echo "  ✓ SKILL.md" || echo "  ⚠️  다운로드 실패"
for ref in track-website track-writing track-pdf track-files; do
  curl -fsSL "$REPO/skill/references/$ref.md" -o "$SKILLS_DIR/claude-study/references/$ref.md" 2>/dev/null && echo "  ✓ references/$ref.md" || true
done

# 스타터 스킬 설치
for skill in writing website pdf; do
  echo "📦 $skill 스킬 설치 중..."
  mkdir -p "$SKILLS_DIR/$skill"
  curl -fsSL "$REPO/starter-skills/$skill/SKILL.md" -o "$SKILLS_DIR/$skill/SKILL.md" 2>/dev/null && echo "  ✓ $skill 완료" || echo "  ⚠️  $skill 다운로드 실패"
done

echo ""
echo "🔍 환경 확인 중..."
if command -v node &>/dev/null; then
  echo "  ✓ Node.js $(node --version)"
else
  echo "  ⚠️  Node.js 미설치 — https://nodejs.org 에서 LTS 버전을 설치하세요"
fi
if command -v pnpm &>/dev/null; then
  echo "  ✓ pnpm $(pnpm --version)"
else
  echo "  ⚠️  pnpm 미설치 — 설치: npm install -g pnpm"
fi

echo ""
echo "╔══════════════════════════════════════╗"
echo "║          설치 완료! 🎉               ║"
echo "╚══════════════════════════════════════╝"
echo ""
echo "Claude Code를 열고 /claude-study 를 입력해서 시작하세요."
echo "가이드 사이트: https://claude-code-guide-yusongs-projects-c6e6da7f.vercel.app"
echo ""
