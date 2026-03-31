import { cn } from "@/lib/utils";

type CalloutProps = {
  type?: "tip" | "warn" | "info";
  title?: string;
  children: React.ReactNode;
};

const palette: Record<NonNullable<CalloutProps["type"]>, string> = {
  tip: "border-emerald-500/40 bg-emerald-500/10 text-emerald-100",
  warn: "border-amber-500/40 bg-amber-500/10 text-amber-100",
  info: "border-sky-500/40 bg-sky-500/10 text-sky-100",
};

export default function Callout({ type = "info", title, children }: CalloutProps) {
  return (
    <aside className={cn("my-4 rounded-lg border p-4", palette[type])}>
      {title ? <p className="mb-2 text-sm font-semibold">{title}</p> : null}
      <div className="text-sm leading-7">{children}</div>
    </aside>
  );
}
