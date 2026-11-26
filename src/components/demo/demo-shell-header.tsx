"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Car, Moon, Search, Sun } from "lucide-react";
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
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isHomeDemo = pathname === "/demo/wunder-filtre";

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href={backHref}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{backLabel}</span>
            </Link>
            <span className="hidden text-sm font-bold tracking-tight text-foreground sm:inline">
              WUNDER Filtre Kataloğu
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isHomeDemo && (
              <Link
                href="/demo/wunder-filtre"
                className="hidden min-h-11 items-center rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-brand-red md:inline-flex"
              >
                Tüm Markalar
              </Link>
            )}
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

      {/* Dedicated Mobile Bottom Bar for WUNDER Demo */}
      <nav
        aria-label="Katalog mobil menü"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
          <Link
            href={backHref}
            className="flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-lg text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span>{isHomeDemo ? "Ana Site" : "Geri"}</span>
          </Link>
          <Link
            href="/demo/wunder-filtre"
            className={`flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-lg text-xs font-semibold transition-colors ${
              isHomeDemo
                ? "bg-brand-red/10 text-brand-red"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <Car className="size-4" aria-hidden="true" />
            <span>Markalar</span>
          </Link>
          <Link
            href="/demo/wunder-filtre#kod-ara"
            className="flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-lg text-xs font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Search className="size-4" aria-hidden="true" />
            <span>Kod Ara</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
