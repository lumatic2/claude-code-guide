import Link from "next/link";

const pages = [
  { href: "/guide/setup", label: "설치 가이드" },
  { href: "/guide/intro", label: "입문 소개" },
  { href: "/guide/basics", label: "기본 사용법" },
  { href: "/guide/advanced", label: "고급 설정" },
  { href: "/guide/workflows", label: "실전 워크플로우" },
  { href: "/cheatsheet", label: "치트시트" },
];

export default function DocNav({ current }: { current: string }) {
  const idx = pages.findIndex((p) => p.href === current);
  const prev = idx > 0 ? pages[idx - 1] : null;
  const next = idx < pages.length - 1 ? pages[idx + 1] : null;

  return (
    <nav className="mt-12 flex items-center justify-between border-t border-zinc-800 pt-6">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex items-center gap-2 text-sm text-zinc-400 transition hover:text-zinc-100"
        >
          <span className="text-zinc-600 transition group-hover:text-zinc-300">←</span>
          <span>{prev.label}</span>
        </Link>
      ) : <span />}
      {next ? (
        <Link
          href={next.href}
          className="group flex items-center gap-2 text-sm text-zinc-400 transition hover:text-zinc-100"
        >
          <span>{next.label}</span>
          <span className="text-zinc-600 transition group-hover:text-zinc-300">→</span>
        </Link>
      ) : <span />}
    </nav>
  );
}
