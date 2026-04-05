"use client";
import Link from "next/link";
import TerminalDemo from "@/components/TerminalDemo";

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
          href="/guide/setup"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-zinc-50 px-7 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
        >
          입문 가이드 시작하기 →
        </Link>
      </section>

      {/* Terminal Demo */}
      <section className="w-full max-w-3xl">
        <TerminalDemo />
      </section>


    </div>
  );
}
