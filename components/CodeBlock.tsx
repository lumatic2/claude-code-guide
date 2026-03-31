"use client";

import { ReactNode, isValidElement, useEffect, useMemo, useState } from "react";

type CodeBlockProps = {
  className?: string;
  children: ReactNode;
};

function textFromNode(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(textFromNode).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textFromNode(node.props.children as ReactNode);
  }

  return "";
}

export default function CodeBlock({ className, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const { code, codeClassName, language } = useMemo(() => {
    if (
      isValidElement<{ className?: string; children?: ReactNode }>(children) &&
      children.type === "code"
    ) {
      const childClassName = (children.props.className as string | undefined) ?? className;
      const childCode = textFromNode(children.props.children as ReactNode).trimEnd();

      return {
        code: childCode,
        codeClassName: childClassName,
        language: childClassName?.replace("language-", "") ?? "text",
      };
    }

    const plainCode = textFromNode(children).trimEnd();
    return {
      code: plainCode,
      codeClassName: className,
      language: className?.replace("language-", "") ?? "text",
    };
  }, [children, className]);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = code;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2 text-xs text-zinc-400">
        <span>{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded border border-zinc-700 px-2 py-1 text-zinc-200 transition hover:bg-zinc-800"
        >
          {copied ? "복사됨 ✓" : "복사"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-100">
        <code className={codeClassName}>{code}</code>
      </pre>
    </div>
  );
}
