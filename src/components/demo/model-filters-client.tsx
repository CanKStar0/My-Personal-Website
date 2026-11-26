"use client";

import React, { useId, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Filter } from "lucide-react";
import type { EngineNode, ModelFilterMatch } from "@/lib/wunder-demo";

interface Props {
  engines: EngineNode[];
  matches: ModelFilterMatch[];
}

export function ModelFiltersClient({ engines, matches }: Props) {
  const [selectedEngineSlug, setSelectedEngineSlug] = useState("ALL");
  const selectId = useId();

  const visibleMatches = useMemo(() => {
    if (selectedEngineSlug === "ALL") return matches;
    return matches.filter((m) =>
      m.matchingEngines.some((e) => e.slug === selectedEngineSlug)
    );
  }, [matches, selectedEngineSlug]);

  return (
    <div className="space-y-6">
      {/* Optional Engine / Year narrow filter */}
      {engines.length > 1 && (
        <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
            <label
              htmlFor={selectId}
              className="text-sm font-semibold text-foreground whitespace-nowrap"
            >
              Motor / Yıl Filtrele (İsteğe Bağlı):
            </label>
            <select
              id={selectId}
              value={selectedEngineSlug}
              onChange={(e) => setSelectedEngineSlug(e.target.value)}
              className="min-h-11 w-full rounded-lg border border-input bg-background px-3 text-sm font-medium text-foreground sm:max-w-md"
            >
              <option value="ALL">
                Tüm Motor Seçenekleri ({engines.length})
              </option>
              {engines.map((eng) => (
                <option key={eng.slug} value={eng.slug}>
                  {eng.engine}
                  {eng.engineCode ? ` (${eng.engineCode})` : ""}
                  {eng.years ? ` · ${eng.years}` : ""}
                </option>
              ))}
            </select>
          </div>
          <div className="text-xs font-medium text-muted-foreground tabular-nums">
            {visibleMatches.length} WUNDER filtresi listeleniyor
          </div>
        </div>
      )}

      {/* Matching WUNDER Filter Cards */}
      <div className="space-y-5">
        {visibleMatches.map(({ summary, topOems, topRivals, matchingEngines }) => {
          const dimList = Object.entries(summary.dimensions || {});
          const shownEngines =
            selectedEngineSlug === "ALL"
              ? matchingEngines
              : matchingEngines.filter((e) => e.slug === selectedEngineSlug);

          return (
            <article
              key={summary.slug}
              className="grid gap-6 rounded-xl border border-border bg-card p-5 sm:p-6 lg:grid-cols-12"
            >
              {/* Product Image */}
              <div className="flex items-center justify-center rounded-lg border border-border bg-white p-4 lg:col-span-3">
                {summary.local_image ? (
                  <Image
                    src={summary.local_image}
                    alt={`WUNDER ${summary.wunder_code}`}
                    width={150}
                    height={150}
                    className="max-h-36 w-auto object-contain"
                  />
                ) : (
                  <Filter
                    className="size-10 text-muted-foreground"
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* WUNDER Header + Matching Engines + OEM + Rivals */}
              <div className="flex flex-col justify-between gap-5 lg:col-span-9">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <div className="mb-1.5 flex flex-wrap items-center gap-2 text-xs font-semibold">
                      <span className="rounded bg-brand-red px-2.5 py-1 text-white">
                        WUNDER
                      </span>
                      <span className="rounded border border-border bg-muted px-2.5 py-1 text-foreground">
                        {summary.filter_type}
                      </span>
                    </div>
                    <h2 className="font-jakarta text-2xl font-extrabold text-foreground sm:text-3xl">
                      WUNDER{" "}
                      <span className="text-brand-red">
                        {summary.wunder_code}
                      </span>
                    </h2>
                  </div>

                  <Link
                    href={`/demo/wunder-filtre/urun/${summary.slug}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-red px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    <span>Tüm OEM ve Rakip Listesi</span>
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>

                {/* Matching Engines for this Model */}
                <div>
                  <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground tabular-nums">
                    Bu Modelde Uyumlu Motorlar ({shownEngines.length})
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {shownEngines.slice(0, 6).map((eng) => (
                      <span
                        key={eng.slug}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground tabular-nums"
                      >
                        <strong className="font-semibold">{eng.engine}</strong>
                        {eng.engineCode && (
                          <span className="font-mono text-muted-foreground">
                            ({eng.engineCode})
                          </span>
                        )}
                        {eng.years && (
                          <span className="text-muted-foreground">
                            · {eng.years}
                          </span>
                        )}
                      </span>
                    ))}
                    {shownEngines.length > 6 && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-muted-foreground tabular-nums">
                        +{shownEngines.length - 6} motor daha
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground tabular-nums">
                      OEM Numaraları ({summary.oem_count})
                    </div>
                    <ul className="space-y-1 text-xs">
                      {topOems.map((oem, i) => (
                        <li
                          key={`${oem.manufacturer}-${oem.oem_number}-${i}`}
                          className="flex justify-between gap-2 border-b border-border/60 py-1"
                        >
                          <span className="font-mono font-bold text-foreground">
                            {oem.oem_number}
                          </span>
                          <span className="truncate text-muted-foreground">
                            {oem.manufacturer}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground tabular-nums">
                      Rakip Karşılıkları ({summary.rival_count})
                    </div>
                    <ul className="space-y-1 text-xs">
                      {topRivals.map((riv, i) => (
                        <li
                          key={`${riv.brand}-${riv.rival_code}-${i}`}
                          className="flex justify-between gap-2 border-b border-border/60 py-1"
                        >
                          <span className="font-mono font-bold text-foreground">
                            {riv.rival_code}
                          </span>
                          <span className="truncate text-muted-foreground">
                            {riv.brand}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Ölçüler (mm)
                    </div>
                    {dimList.length > 0 ? (
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                        {dimList.map(([k, v]) => (
                          <div
                            key={k}
                            className="flex justify-between border-b border-border/60 py-1"
                          >
                            <dt className="text-muted-foreground">{k}</dt>
                            <dd className="font-bold text-foreground tabular-nums">
                              {v}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Standart ölçüler ürün detayında.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
