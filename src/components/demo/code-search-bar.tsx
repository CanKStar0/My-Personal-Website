"use client";

import React, { useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, RotateCcw, Search, X } from "lucide-react";
import type { CodeMatchHit } from "@/lib/wunder-demo";

const SAMPLE_CODES = [
  { code: "WY 500", label: "WUNDER" },
  { code: "W 75/3", label: "MANN" },
  { code: "55261437", label: "FIAT OEM" },
  { code: "OP 643/3", label: "MOTOEC" },
  { code: "K 1111A", label: "POLEN" },
];

export function CodeSearchBar() {
  const router = useRouter();
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hits, setHits] = useState<CodeMatchHit[] | null>(null);

  async function executeSearch(raw: string, autoNavigateSingle = false) {
    const trimmed = raw.trim();
    if (!trimmed) {
      setHits(null);
      setErrorMsg(null);
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(
        `/api/demo/wunder?action=search&q=${encodeURIComponent(trimmed)}`
      );
      if (!res.ok) {
        throw new Error("Arama servisi yanıt vermedi.");
      }
      const data = await res.json();
      const found: CodeMatchHit[] = data.hits ?? [];
      setHits(found);

      if (autoNavigateSingle && found.length === 1) {
        const hit = found[0];
        router.push(
          `/demo/wunder-filtre/urun/${hit.slug}?from=${encodeURIComponent(hit.matched_brand)}&code=${encodeURIComponent(hit.matched_code)}`
        );
      }
    } catch {
      setErrorMsg("Arama sırasında bağlantı hatası oluştu.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    executeSearch(query, true);
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
      <search>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor={inputId}
              className="block text-sm font-semibold text-foreground"
            >
              OEM, Rakip veya WUNDER Kodu ile Ara
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <input
                  id={inputId}
                  name="q"
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (!e.target.value.trim()) {
                      setHits(null);
                      setErrorMsg(null);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.nativeEvent.isComposing) {
                      e.preventDefault();
                    }
                  }}
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  enterKeyHint="search"
                  placeholder="Örn: W 75/3, 55261437, WY 500, OP 643/3..."
                  className="min-h-12 w-full rounded-lg border border-input bg-background px-4 pr-11 text-base font-medium text-foreground placeholder:text-muted-foreground"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setHits(null);
                      setErrorMsg(null);
                    }}
                    aria-label="Aramayı temizle"
                    className="absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand-red px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                <Search className="size-4" aria-hidden="true" />
                <span>{loading ? "Aranıyor..." : "WUNDER Bul"}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Örnek kodlar:
            </span>
            {SAMPLE_CODES.map((sample) => (
              <button
                key={sample.code}
                type="button"
                onClick={() => {
                  setQuery(sample.code);
                  executeSearch(sample.code, false);
                }}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-brand-red"
              >
                <span className="font-bold">{sample.code}</span>
                <span className="text-muted-foreground">{sample.label}</span>
              </button>
            ))}
          </div>
        </form>
      </search>

      {/* Error State */}
      {errorMsg && (
        <div
          role="alert"
          className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground"
        >
          <span>{errorMsg}</span>
          <button
            type="button"
            onClick={() => executeSearch(query, false)}
            className="inline-flex items-center gap-1.5 font-semibold text-brand-red hover:underline"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Tekrar Dene
          </button>
        </div>
      )}

      {/* Results & Empty States */}
      {hits !== null && !errorMsg && (
        <div role="status" aria-live="polite" className="mt-4 border-t border-border pt-4">
          {hits.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Bu 10 filtreli demoda{" "}
              <strong className="text-foreground">&ldquo;{query}&rdquo;</strong> için
              eşleşme bulunamadı. Aşağıdan araç markası seçerek ilerleyebilirsiniz.
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground tabular-nums">
                {hits.length} WUNDER ürünü eşleşti:
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {hits.map((hit) => (
                  <Link
                    key={hit.slug}
                    href={`/demo/wunder-filtre/urun/${hit.slug}?from=${encodeURIComponent(hit.matched_brand)}&code=${encodeURIComponent(hit.matched_code)}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-4 py-3 transition-colors hover:border-brand-red"
                  >
                    <div>
                      <div className="font-jakarta text-base font-bold text-brand-red">
                        WUNDER {hit.wunder_code}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {hit.filter_type} · Eşleşen: {hit.matched_brand} ({hit.matched_code})
                      </div>
                    </div>
                    <ArrowRight
                      className="size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
