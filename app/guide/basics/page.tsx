import { MDXRemote } from "next-mdx-remote/rsc";
import { readFileSync } from "fs";
import path from "path";
import StepCard from "@/components/StepCard";
import Callout from "@/components/Callout";
import CodeBlock from "@/components/CodeBlock";

const components = {
  StepCard,
  Callout,
  CodeBlock,
  pre: ({ children }: any) => <CodeBlock>{children}</CodeBlock>,
};

export default function BasicsPage() {
  const filePath = path.join(process.cwd(), "content", "basics.mdx");
  const source = readFileSync(filePath, "utf-8");
  return (
    <article className="prose prose-invert max-w-none">
      <MDXRemote source={source} components={components} />
    </article>
  );
}
