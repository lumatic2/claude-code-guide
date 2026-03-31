import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import SideNav from "@/components/SideNav";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Claude Code 입문 가이드",
  description: "Claude Code를 빠르게 익히기 위한 한국어 가이드",
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
            <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-8 sm:py-10">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
