"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = "typescript", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative my-6 overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-950 font-mono text-sm shadow-xl dark:border-zinc-800/80">
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-4 py-2.5 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          {filename ? (
            <span className="ml-2 font-medium text-zinc-300">{filename}</span>
          ) : (
            <span className="ml-2 flex items-center gap-1 text-zinc-400">
              <Terminal className="h-3.5 w-3.5 text-brand-red" />
              {language}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
          aria-label="Kodu kopyala"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Kopyalandı</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Kopyala</span>
            </>
          )}
        </button>
      </div>

      {/* Code Container */}
      <div className="overflow-x-auto p-4 text-zinc-100 selection:bg-brand-red/30">
        <pre className="text-xs leading-relaxed sm:text-sm">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
