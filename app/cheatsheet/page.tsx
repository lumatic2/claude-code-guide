import { MDXRemote } from "next-mdx-remote/rsc";
import { readFileSync } from "fs";
import path from "path";
import remarkGfm from "remark-gfm";
import Callout from "@/components/Callout";
import { baseComponents } from "@/components/MdxComponents";
import PrintButton from "@/components/PrintButton";

const components = { ...baseComponents, Callout };

export default function CheatsheetPage() {
  const filePath = path.join(process.cwd(), "content", "cheatsheet.mdx");
  const source = readFileSync(filePath, "utf-8");
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <PrintButton />
      </div>
      <article className="prose prose-invert max-w-none prose-table:overflow-x-auto">
        <MDXRemote
          source={source}
          components={components}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </article>
    </div>
  );
}
