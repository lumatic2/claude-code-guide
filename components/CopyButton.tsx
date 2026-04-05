'use client'

import { useState } from 'react'

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors px-2 py-1 rounded border border-white/10 hover:border-white/20"
    >
      {copied ? '✓ 복사됨' : '복사'}
    </button>
  )
}
