import Link from "next/link";

export default function GeminiComingSoonPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-block rounded-full bg-zinc-800 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
          준비 중
        </span>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          Gemini 트랙
        </h1>
        <p className="mt-4 text-base text-zinc-400 leading-relaxed">
          Gemini(웹·Workspace 통합·NotebookLM·Gemini Code Assist)를 처음 사용하는 사람을 위한 입문 가이드. 콘텐츠 작성 중이며, 곧 공개됩니다.
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          그동안 이미 공개된 트랙을 둘러보세요.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-6 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-white"
          >
            도구 카탈로그
          </Link>
          <Link
            href="/tools/claude/setup"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-50 px-6 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
          >
            Claude Code 트랙 →
          </Link>
        </div>
      </div>
    </div>
  );
}
