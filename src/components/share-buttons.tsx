"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import type { Locale } from "@/lib/translations";

interface ShareButtonsProps {
  title: string;
  url: string;
  locale?: Locale;
}

export function ShareButtons({ title, url, locale = "tr" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const isEn = locale === "en";

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        toast.success(isEn ? "Link copied to clipboard!" : "Bağlantı panoya kopyalandı!");
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      toast.error(isEn ? "Failed to copy link" : "Bağlantı kopyalanamadı");
    }
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">
        <Share2 className="h-3.5 w-3.5 text-brand-red dark:text-rose-400" />
        {isEn ? "Share:" : "Paylaş:"}
      </span>

      {/* X / Twitter */}
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isEn ? "Share on X (Twitter)" : "X (Twitter)'da paylaş"}
        className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 text-xs font-medium text-foreground transition-colors hover:border-brand-red/50 hover:bg-brand-red/[0.06] hover:text-brand-red dark:border-border/50 dark:hover:border-rose-500/50 dark:hover:text-rose-400"
      >
        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span>X</span>
      </a>

      {/* LinkedIn */}
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isEn ? "Share on LinkedIn" : "LinkedIn'de paylaş"}
        className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 text-xs font-medium text-foreground transition-colors hover:border-brand-red/50 hover:bg-brand-red/[0.06] hover:text-brand-red dark:border-border/50 dark:hover:border-rose-500/50 dark:hover:text-rose-400"
      >
        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
        </svg>
        <span>LinkedIn</span>
      </a>

      {/* Copy Link */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={isEn ? "Copy article link" : "Makale bağlantısını kopyala"}
        className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 text-xs font-medium text-foreground transition-colors hover:border-brand-red/50 hover:bg-brand-red/[0.06] hover:text-brand-red dark:border-border/50 dark:hover:border-rose-500/50 dark:hover:text-rose-400"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-emerald-500 font-semibold">{isEn ? "Copied" : "Kopyalandı"}</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span>{isEn ? "Copy Link" : "Kopyala"}</span>
          </>
        )}
      </button>
    </div>
  );
}
