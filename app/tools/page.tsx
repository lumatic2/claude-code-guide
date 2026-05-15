import ToolCard, { tools } from "@/components/ToolCard";

export default function ToolsCatalogPage() {
  return (
    <div className="py-10 sm:py-14">
      <header className="mb-10 sm:mb-14">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          도구별 트랙
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          어떤 도구로 시작할까요?
        </h1>
        <p className="mt-4 max-w-2xl text-base text-zinc-400 leading-relaxed">
          AI 도구별 입문 가이드. 평소 쓰는 환경에 맞춰 선택하면 됩니다. 모든 트랙은 처음 사용자를 기준으로 설치 → 첫 사용 → 치트시트 순서로 구성.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {tools.map((t) => (
          <ToolCard key={t.slug} tool={t} />
        ))}
      </div>
    </div>
  );
}
