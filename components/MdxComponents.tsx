import type { ComponentPropsWithoutRef, ReactNode } from "react";
import StepCard from "@/components/StepCard";
import Callout from "@/components/Callout";
import CodeBlock from "@/components/CodeBlock";
import ZoomImage from "@/components/ZoomImage";

function Table({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="my-6 overflow-x-auto">
      <table
        className={`w-full border-collapse text-sm ${className ?? ""}`.trim()}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

function Pre({ children }: { children: ReactNode }) {
  return <CodeBlock>{children}</CodeBlock>;
}

export const baseComponents = {
  table: Table,
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead className="bg-zinc-800/50" {...props} />
  ),
  tbody: (props: ComponentPropsWithoutRef<"tbody">) => (
    <tbody className="divide-y divide-zinc-800" {...props} />
  ),
  tr: (props: ComponentPropsWithoutRef<"tr">) => (
    <tr className="transition-colors hover:bg-zinc-800/30" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-b border-zinc-700 px-4 py-2.5 text-left font-semibold text-zinc-300"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="px-4 py-2.5 text-zinc-400" {...props} />
  ),
  StepCard,
  Callout,
  CodeBlock,
  ZoomImage,
  pre: Pre,
};
