import Link from "next/link";

export type Tool = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  entryHref: string;
  entryLabel: string;
  status: "ready" | "soon";
};

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={tool.entryHref}
      className="group flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 text-left transition hover:border-emerald-500/50 hover:bg-zinc-900/70"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-xl font-bold text-zinc-50">{tool.title}</h2>
        {tool.status === "soon" && (
          <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
            준비 중
          </span>
        )}
      </div>
      <p className="text-sm font-medium text-emerald-300/90">{tool.tagline}</p>
      <p className="text-sm text-zinc-400 leading-relaxed">{tool.description}</p>
      <div className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-200 transition group-hover:text-emerald-300">
        {tool.entryLabel}
        <span className="transition group-hover:translate-x-0.5">→</span>
      </div>
    </Link>
  );
}

export const tools: Tool[] = [
  {
    slug: "claude",
    title: "Claude Code",
    tagline: "대화로 컴퓨터를 움직이는 AI 에이전트",
    description:
      "Claude 앱에서 채팅으로 파일·코드·디자인·글을 직접 만들고 수정합니다. 설치부터 5단계 학습 트랙까지.",
    entryHref: "/tools/claude/setup",
    entryLabel: "Claude Code 시작",
    status: "ready",
  },
  {
    slug: "ms365",
    title: "Microsoft 365",
    tagline: "Excel · Word · PowerPoint 안에서 Claude 쓰기",
    description:
      "Office 사이드바에 Claude를 띄워 워크북·문서·슬라이드를 직접 편집합니다. 공식 add-in 설치 가이드.",
    entryHref: "/tools/ms365/intro",
    entryLabel: "MS365 트랙 시작",
    status: "ready",
  },
  {
    slug: "chatgpt",
    title: "ChatGPT",
    tagline: "OpenAI의 대표 챗봇·GPT 빌더",
    description:
      "데스크톱 앱·웹·모바일·맞춤 GPT 만들기까지. 입문자용 가이드 콘텐츠를 작성 중입니다.",
    entryHref: "/tools/chatgpt",
    entryLabel: "준비 중",
    status: "soon",
  },
  {
    slug: "gemini",
    title: "Gemini",
    tagline: "Google의 AI · Workspace 통합",
    description:
      "Gemini 웹·Workspace 통합·NotebookLM·Code Assist까지. 입문자용 가이드 콘텐츠를 작성 중입니다.",
    entryHref: "/tools/gemini",
    entryLabel: "준비 중",
    status: "soon",
  },
];
