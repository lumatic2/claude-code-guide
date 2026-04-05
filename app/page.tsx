"use client";
import Link from "next/link";
import TerminalDemo from "@/components/TerminalDemo";
import CopyButton from "@/components/CopyButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-10 py-12 sm:gap-16 sm:py-20 text-center">

      {/* Hero */}
      <section className="flex flex-col items-center gap-5">
        <div
          style={{
            animation: "float 3.5s ease-in-out infinite, glowPulse 3.5s ease-in-out infinite",
            display: "inline-block",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
            (e.currentTarget as HTMLElement).style.transform = "scale(1.15) translateY(-4px)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.animationPlayState = "running";
            (e.currentTarget as HTMLElement).style.transform = "";
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/claude-icon.svg" alt="Claude Code" width={96} height={96} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
          Claude Code
        </h1>
        <p className="max-w-lg text-base sm:text-lg text-zinc-400 leading-relaxed px-4 sm:px-0">
          Claude Code는 터미널에서 대화하는 AI 에이전트입니다.<br className="hidden sm:block" />
          <span className="sm:hidden"> </span>글쓰기 · 디자인 · 음악 · 시스템 설계
        </p>
        <Link
          href="/guide/intro"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-zinc-50 px-7 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
        >
          입문 가이드 시작하기 →
        </Link>
      </section>

      {/* Terminal Demo */}
      <section className="w-full max-w-3xl">
        <TerminalDemo />
      </section>

      {/* 스킬 설치 */}
      <section className="w-full max-w-2xl flex flex-col items-center gap-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-zinc-100 mb-2">스킬 설치하기</h2>
          <p className="text-sm text-zinc-400">터미널에 아래 명령어를 붙여넣으면 <code className="text-emerald-400">/claude-study</code> 스킬이 설치됩니다.</p>
        </div>

        <div className="w-full rounded-xl border border-white/10 overflow-hidden" style={{ background: '#0d1117', fontFamily: 'Cascadia Code, Consolas, monospace' }}>
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2">
            <span className="text-xs text-zinc-500">Terminal</span>
            <CopyButton text="curl -fsSL https://raw.githubusercontent.com/lumatic2/claude-code-guide/master/install.sh | bash" />
          </div>
          <div className="px-5 py-4 text-sm text-emerald-300 overflow-x-auto whitespace-nowrap">
            curl -fsSL https://raw.githubusercontent.com/lumatic2/claude-code-guide/master/install.sh | bash
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 text-sm text-zinc-400 text-left w-full">
          <div className="flex-1 rounded-lg border border-white/10 px-4 py-3 bg-white/[0.02]">
            <p className="text-zinc-300 font-medium mb-1">설치 후</p>
            <p>Claude Code를 열고 <code className="text-emerald-400">/claude-study</code>를 입력하세요.</p>
          </div>
          <div className="flex-1 rounded-lg border border-white/10 px-4 py-3 bg-white/[0.02]">
            <p className="text-zinc-300 font-medium mb-1">처음이라면</p>
            <p><Link href="/guide/setup" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">설치 가이드</Link>에서 Claude Code 설치부터 시작하세요.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
