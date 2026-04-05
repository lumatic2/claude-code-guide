import { MDXRemote } from "next-mdx-remote/rsc";
import { readFileSync } from "fs";
import path from "path";
import remarkGfm from "remark-gfm";
import StepCard from "@/components/StepCard";
import Callout from "@/components/Callout";
import CodeBlock from "@/components/CodeBlock";
import DocNav from "@/components/DocNav";
import { baseComponents } from "@/components/MdxComponents";

const components = {
  ...baseComponents,
  StepCard,
  Callout,
  CodeBlock,
  pre: ({ children }: any) => <CodeBlock>{children}</CodeBlock>,
};

export default function SetupPage() {
  const filePath = path.join(process.cwd(), "content", "setup.mdx");
  const source = readFileSync(filePath, "utf-8");
  return (
    <>
    <article className="prose prose-invert max-w-none prose-table:overflow-x-auto">
      <MDXRemote
        source={source}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </article>
    <DocNav current="/guide/setup" />
    </>
  );
}
