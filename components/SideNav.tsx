"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string; external?: boolean };

const navItems: NavItem[] = [
  { href: "/", label: "홈" },
  { href: "/guide/setup", label: "설치 가이드" },
  { href: "/guide/intro", label: "입문 소개" },
  { href: "/guide/basics", label: "기본 사용법" },
  { href: "/guide/advanced", label: "고급 설정" },
  { href: "/guide/workflows", label: "실전 워크플로우" },
  { href: "/guide/tips", label: "실전 팁 · FAQ" },
  { href: "/cheatsheet", label: "치트시트" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  onNavigate?: () => void;
}) {
  const className = cn(
    "block rounded-lg px-4 py-3 text-base transition-colors",
    isActive(pathname, item.href)
      ? "bg-emerald-500/20 text-emerald-300"
      : "text-zinc-300 hover:bg-zinc-800 hover:text-white",
  );

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} onClick={onNavigate}>
      {item.label}
    </Link>
  );
}

export default function SideNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const activeLabel =
    navItems.find((item) => isActive(pathname, item.href))?.label ?? "메뉴";

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950/95 px-4 py-3 backdrop-blur md:hidden">
        <Link href="/" className="text-sm font-semibold text-zinc-100">
          Claude Code Guide
        </Link>
        <button
          type="button"
          aria-label="메뉴 열기"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-zinc-200 hover:bg-zinc-800 active:bg-zinc-700"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/60 transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        {/* Panel */}
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="사이트 메뉴"
          className={cn(
            "absolute inset-y-0 left-0 flex w-[82%] max-w-sm flex-col border-r border-zinc-800 bg-zinc-950 shadow-2xl transition-transform duration-200 ease-out",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-zinc-800/80 px-5 py-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Claude Code Guide
              </p>
              <p className="mt-1 text-lg font-bold text-zinc-100">
                {activeLabel}
              </p>
            </div>
            <button
              type="button"
              aria-label="메뉴 닫기"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-zinc-200 hover:bg-zinc-800 active:bg-zinc-700"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink item={item} pathname={pathname} onNavigate={() => setOpen(false)} />
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>

      {/* Desktop sidebar */}
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
