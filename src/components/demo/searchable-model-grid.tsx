"use client";

import React, { useId, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import type { ModelSeriesNode } from "@/lib/wunder-demo";

interface Props {
  brandSlug: string;
  brandName: string;
  models: ModelSeriesNode[];
}

export function SearchableModelGrid({ brandSlug, brandName, models }: Props) {
  const [filterText, setFilterText] = useState("");
  const inputId = useId();

  const filtered = useMemo(() => {
    const q = filterText.trim().toLocaleLowerCase("tr-TR");
    if (!q) return models;
    return models.filter(
      (m) =>
        m.modelSeries.toLocaleLowerCase("tr-TR").includes(q) ||
        m.yearHints.toLocaleLowerCase("tr-TR").includes(q)
    );
  }, [models, filterText]);

  return (
    <div className="space-y-5">
      {models.length > 6 && (
        <div className="max-w-md">
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-xs font-semibold text-muted-foreground"
          >
            {brandName} modelleri içinde ara
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id={inputId}
              type="search"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              autoCorrect="off"
              spellCheck={false}
              placeholder="Örn: Doblo, Clio, Golf, A3..."
              className="min-h-11 w-full rounded-lg border border-input bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
          &ldquo;{filterText}&rdquo; ile eşleşen model bulunamadı.{" "}
          <button
            type="button"
            onClick={() => setFilterText("")}
            className="font-semibold text-brand-red hover:underline"
          >
            Tüm modelleri göster
          </button>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <Link
              key={m.slug}
              href={`/demo/wunder-filtre/arac/${brandSlug}/${m.slug}`}
              className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-brand-red"
            >
              <div className="min-w-0 space-y-1">
                <div className="truncate font-jakarta text-base font-bold text-foreground group-hover:text-brand-red">
                  {m.modelSeries}
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground tabular-nums">
                  <span>{m.engineCount} motor seçeneği</span>
                  <span>·</span>
                  <span>{m.productCount} WUNDER filtresi</span>
                </div>
              </div>
              <ChevronRight
                className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand-red"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
