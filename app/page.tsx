import Link from "next/link";

const features = [
  {
    title: "빠른 설치",
    desc: "npm 한 줄로 설치 완료. API 키만 있으면 바로 시작할 수 있습니다.",
    href: "/guide/setup",
  },
  {
    title: "핵심 명령어",
    desc: "자주 쓰는 슬래시 명령어와 프롬프트 패턴을 한눈에 정리했습니다.",
    href: "/cheatsheet",
  },
  {
    title: "실전 워크플로",
    desc: "파일 생성, 버그 수정, 코드 리뷰까지 실제 예제로 익힙니다.",
    href: "/guide/basics",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-12">
      {/* Hero */}
      <section className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl" style={{textWrap: "balance"}}>
          Claude Code <span className="text-zinc-400">완벽 가이드</span>
        </h1>
        <p className="max-w-xl text-lg text-zinc-400 leading-relaxed">
          AI 코딩 어시스턴트를 처음부터 실무까지.
          설치부터 핵심 명령어, 실전 워크플로까지 한 번에 익히세요.
        </p>
        <div>
          <Link
            href="/guide/intro"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-50 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
          >
            시작하기 →
          </Link>
        </div>
      </section>

      {/* 설치 섹션 */}
      <section className="py-12 px-6 bg-gray-950 border-t border-b border-gray-800 -mx-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-white mb-2">지금 바로 시작하기</h2>
          <p className="text-gray-400 mb-6 text-sm">터미널에 아래 명령어를 붙여넣으세요</p>
          <div className="relative bg-gray-900 rounded-lg border border-gray-700 px-6 py-4 text-left">
            <code className="text-green-400 text-sm font-mono break-all">
              curl -fsSL https://raw.githubusercontent.com/lumatic2/claude-code-guide/master/install.sh | bash
            </code>
          </div>
          <p className="text-gray-500 text-xs mt-3">설치 후 Claude Code에서 /claude-study 를 입력하세요</p>
        </div>
      </section>

      {/* Feature cards */}
      <section className="grid gap-4 sm:grid-cols-3">
        {features.map((f, i) => (
          <Link
            key={f.href}
            href={f.href}
            className={
              i === 0
                ? "rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-6 transition hover:border-emerald-400/60 hover:bg-emerald-500/15"
                : "rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-600 hover:bg-zinc-800"
            }
          >
            <h2 className={`mb-2 text-base font-semibold ${i === 0 ? "text-emerald-100" : "text-zinc-50"}`}>{f.title}</h2>
            <p className={`text-sm leading-relaxed ${i === 0 ? "text-emerald-200/70" : "text-zinc-400"}`}>{f.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
