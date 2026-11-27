"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  options: SelectOption[];
  onChange: (value: string) => void;
  searchable?: boolean;
}

export function SearchableSelect({
  id,
  label,
  value,
  placeholder = "Seçin",
  disabled = false,
  options,
  onChange,
  searchable = true,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedLabel = useMemo(() => {
    if (!value) return placeholder;
    return options.find((o) => o.value === value)?.label ?? value;
  }, [options, placeholder, value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr-TR");
    if (!q) return options;
    return options.filter((o) =>
      o.label.toLocaleLowerCase("tr-TR").includes(q)
    );
  }, [options, query]);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  useEffect(() => {
    if (open && searchable && options.length > 6) {
      setTimeout(() => searchInputRef.current?.focus(), 20);
    }
    if (!open) setQuery("");
  }, [open, searchable, options.length]);

  return (
    <div ref={containerRef} className="relative">
      <label
        htmlFor={id}
        className="mb-1 block text-xs font-medium text-muted-foreground"
      >
        {label}
      </label>
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => !disabled && setOpen((o) => !o)}
        className="flex min-h-11 w-full items-center justify-between gap-2 rounded-lg border border-input bg-background px-2.5 text-left text-sm font-medium text-foreground transition-colors hover:border-brand-red/60 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className={`truncate ${!value ? "text-muted-foreground" : ""}`}>
          {selectedLabel}
        </span>
        <ChevronDown
          className={`size-4 shrink-0 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 z-40 mt-1.5 overflow-hidden rounded-xl border border-border bg-card shadow-xl sm:min-w-[220px]"
        >
          {searchable && options.length > 6 && (
            <div className="border-b border-border p-2">
              <div className="flex items-center gap-1.5 rounded-lg border border-input bg-background px-2.5 py-1.5">
                <Search
                  className="size-3.5 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ara..."
                  className="w-full bg-transparent text-xs font-medium text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>
          )}

          <div className="max-h-60 overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <div className="px-3 py-2.5 text-xs text-muted-foreground">
                Sonuç bulunamadı
              </div>
            ) : (
              filtered.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value || "__empty__"}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium transition-colors ${
                      isSelected
                        ? "bg-brand-red/10 font-bold text-brand-red"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && (
                      <Check className="size-3.5 shrink-0" aria-hidden="true" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
