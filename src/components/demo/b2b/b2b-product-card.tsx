"use client";

import React, { useState } from "react";
import { Check, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import type { B2BWunderProduct } from "@/lib/wunder-demo";

interface B2BProductCardProps {
  product: B2BWunderProduct;
  isFavorite: boolean;
  onToggleFavorite: (slug: string) => void;
  onAddToCart: (product: B2BWunderProduct, qty: number) => void;
  onOpenDetail?: (product: B2BWunderProduct) => void;
}

function formatTRY(amount: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function B2BProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onOpenDetail,
}: B2BProductCardProps) {
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const inStock = product.stock_count > 0;

  function handleAdd() {
    if (!inStock) return;
    onAddToCart(product, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <article className="flex min-w-0 flex-col justify-between rounded-xl border border-border bg-card p-3 transition-colors hover:border-brand-red/50 sm:p-4">
      {/* Top Row: Brand + Favorite */}
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="truncate text-xs font-bold text-brand-red">
          WUNDER
        </span>
        <button
          type="button"
          onClick={() => onToggleFavorite(product.slug)}
          aria-label={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
          aria-pressed={isFavorite}
          className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-brand-red"
        >
          <Heart
            className={`size-4 ${isFavorite ? "fill-brand-red text-brand-red" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Product Image */}
      <div className="mb-3 flex h-28 items-center justify-center rounded-lg bg-white p-2.5 sm:h-36 sm:p-3">
        {product.local_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.local_image}
            alt={`WUNDER ${product.wunder_code}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="max-h-24 w-auto object-contain sm:max-h-28"
          />
        ) : (
          <span className="font-jakarta text-xs font-bold tracking-wider text-zinc-400">
            WUNDER {product.wunder_code}
          </span>
        )}
      </div>

      {/* Title, Category & Stock */}
      <div className="space-y-1">
        <div className="text-xs font-medium text-muted-foreground">
          {product.category_label}
        </div>
        <h3 className="font-jakarta text-base font-extrabold tracking-tight text-foreground sm:text-lg">
          {product.wunder_code}
        </h3>
        <p className="line-clamp-1 text-xs text-muted-foreground">
          {product.subtitle}
        </p>

        {onOpenDetail && (
          <button
            type="button"
            onClick={() => onOpenDetail(product)}
            className="mt-1 inline-flex items-center rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[11px] font-semibold text-foreground transition-colors hover:border-brand-red hover:text-brand-red"
          >
            OEM &amp; Çapraz Kodlar
          </button>
        )}

        <div className="pt-0.5 text-xs font-semibold tabular-nums">
          {inStock ? (
            <span className="text-emerald-600 dark:text-emerald-400">
              ● Stokta · {product.stock_count} adet
            </span>
          ) : (
            <span className="text-muted-foreground">○ Stokta yok</span>
          )}
        </div>
      </div>

      {/* Pricing & Discount */}
      <div className="mt-3 space-y-1 border-t border-border pt-2.5 text-xs tabular-nums">
        <div className="flex items-center justify-between gap-2 text-muted-foreground">
          <span>Liste</span>
          <span className="line-through">{formatTRY(product.list_price)}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground">İskonto</span>
          <span className="rounded bg-brand-red/10 px-1.5 py-0.5 font-bold text-brand-red">
            %{product.discount_percent}
          </span>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-1 pt-1">
          <span className="text-xs font-medium text-muted-foreground">
            Net fiyat
          </span>
          <span className="font-jakarta text-base font-extrabold text-foreground sm:text-lg">
            {formatTRY(product.net_price)}
          </span>
        </div>
      </div>

      {/* Quantity + Add to Cart (stacked cleanly on mobile, inline on sm+) */}
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex items-center justify-between rounded-lg border border-border bg-background sm:justify-start">
          <button
            type="button"
            disabled={!inStock || qty <= 1}
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Adet azalt"
            className="flex size-9 items-center justify-center text-foreground disabled:opacity-40"
          >
            <Minus className="size-3.5" aria-hidden="true" />
          </button>
          <span className="w-8 text-center text-xs font-bold tabular-nums">
            {qty}
          </span>
          <button
            type="button"
            disabled={!inStock}
            onClick={() => setQty((q) => q + 1)}
            aria-label="Adet artır"
            className="flex size-9 items-center justify-center text-foreground disabled:opacity-40"
          >
            <Plus className="size-3.5" aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          disabled={!inStock}
          onClick={handleAdd}
          className={`flex min-h-10 w-full flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-45 ${
            justAdded ? "bg-emerald-600" : "bg-brand-red hover:opacity-90"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="size-3.5 shrink-0" aria-hidden="true" />
              <span>Eklendi</span>
            </>
          ) : (
            <>
              <ShoppingCart className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">Sepete Ekle</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
