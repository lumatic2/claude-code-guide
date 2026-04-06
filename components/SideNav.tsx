"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/guide/setup", label: "설치 가이드" },
  { href: "/guide/intro", label: "입문 소개" },
  { href: "/guide/basics", label: "기본 사용법" },
  { href: "/guide/advanced", label: "고급 설정" },
  { href: "/guide/workflows", label: "실전 워크플로우" },
  { href: "/cheatsheet", label: "치트시트" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SideNav() {
  const pathname = usePathname();

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur md:hidden">
        <div className="overflow-x-auto px-3 py-3">
          <div className="flex min-w-max gap-2">
            {navItems.map((item) => item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md px-3 py-1.5 text-sm transition-colors text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  isActive(pathname, item.href)
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-zinc-800/80 bg-zinc-950/80 p-6 md:block">
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            Claude Code Guide
          </p>
          <p className="mt-2 text-xl font-bold text-zinc-100">입문자 문서</p>
        </div>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg px-3 py-2 text-sm transition-colors text-zinc-300 hover:bg-zinc-800 hover:text-white"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive(pathname, item.href)
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
