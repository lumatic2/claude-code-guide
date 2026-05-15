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
          AI 학습 허브
        </h1>
        <p className="max-w-xl text-base sm:text-lg text-zinc-400 leading-relaxed px-4 sm:px-0">
          처음 시작하는 사람을 위한 도구별 입문 가이드.<br className="hidden sm:block" />
          <span className="sm:hidden"> </span>Claude Code · Microsoft 365
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-50 px-7 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
          >
            도구 카탈로그 보기 →
          </Link>
          <Link
            href="/tools/claude/setup"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-7 py-3 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-white"
          >
            Claude Code 바로 시작
          </Link>
        </div>
      </section>

      {/* Terminal Demo */}
      <section className="w-full max-w-3xl">
        <TerminalDemo />
      </section>


    </div>
  );
}
