import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import SideNav from "@/components/SideNav";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "AI 학습 허브",
  description: "처음 시작하는 사람을 위한 도구별 AI 입문 가이드 — Claude Code · Microsoft 365",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} dark h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900">
          <SideNav />
          <main className="md:pl-72">
            <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-8 sm:py-10">
              {children}
            </div>
            <footer className="mx-auto w-full max-w-4xl border-t border-zinc-800 px-4 py-6 sm:px-8">
              <p className="text-xs text-zinc-500">
                AI 학습 허브 · Claude Code · Microsoft 365
                · <a href="https://github.com/lumatic2/claude-code-guide" className="inline-block min-h-[44px] leading-[44px] hover:text-zinc-300 transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a>
              </p>
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}
