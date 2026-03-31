"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-md bg-zinc-700 px-4 py-2 text-sm text-zinc-100 hover:bg-zinc-600"
    >
      인쇄
    </button>
  );
}
