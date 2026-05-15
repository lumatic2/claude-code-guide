"use client";
import Link from "next/link";
import TerminalDemo from "@/components/TerminalDemo";
import ToolCard, { tools } from "@/components/ToolCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-12 py-12 sm:gap-20 sm:py-20">

      {/* Hero */}
      <section className="flex flex-col items-center gap-5 text-center">
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
          <img src="/claude-icon.svg" alt="AI 학습 허브" width={96} height={96} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
          AI 학습 허브
        </h1>
        <p className="max-w-xl text-base sm:text-lg text-zinc-400 leading-relaxed px-4 sm:px-0">
          처음 시작하는 사람을 위한 도구별 입문 가이드.<br className="hidden sm:block" />
          <span className="sm:hidden"> </span>아래에서 자주 쓰는 환경의 트랙을 골라 시작하세요.
        </p>
      </section>

      {/* Tool Catalog */}
      <section className="w-full">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              도구별 트랙
            </p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-50 sm:text-3xl">
              어떤 도구로 시작할까요?
            </h2>
          </div>
          <Link
            href="/tools"
            className="hidden sm:inline-flex items-center gap-1 text-sm text-zinc-400 transition hover:text-zinc-100"
          >
            전체 카탈로그 →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {tools.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>

      {/* Terminal Demo */}
      <section className="w-full max-w-3xl">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            맛보기
          </p>
          <h2 className="mt-2 text-2xl font-bold text-zinc-50 sm:text-3xl">
            Claude Code는 이렇게 동작합니다
          </h2>
        </div>
        <TerminalDemo />
      </section>

    </div>
  );
}
