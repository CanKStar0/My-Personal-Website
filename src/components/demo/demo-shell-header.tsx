"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const emptySubscribe = () => () => {};

interface DemoShellHeaderProps {
  backHref?: string;
  backLabel?: string;
}

export function DemoShellHeader({
  backHref = "/",
  backLabel = "canpolatkaya.com",
}: DemoShellHeaderProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            href={backHref}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span>{backLabel}</span>
          </Link>
          <span className="hidden text-sm font-bold tracking-tight text-foreground sm:inline">
            WUNDER Filtre Katalog Demosu
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/demo/wunder-filtre"
            className="inline-flex min-h-11 items-center rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-brand-red"
          >
            Tüm Markalar
          </Link>
          {mounted && (
            <button
              type="button"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              aria-label="Tema değiştir"
              className="inline-flex size-11 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="size-4" aria-hidden="true" />
              ) : (
                <Moon className="size-4" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
