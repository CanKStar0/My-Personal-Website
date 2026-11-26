"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import type { B2BWunderProduct } from "@/lib/wunder-demo";

interface B2BProductCardProps {
  product: B2BWunderProduct;
  isFavorite: boolean;
  onToggleFavorite: (slug: string) => void;
  onAddToCart: (product: B2BWunderProduct, qty: number) => void;
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
    <article className="flex flex-col justify-between rounded-xl border border-border bg-card p-3.5 transition-colors hover:border-brand-red/50 sm:p-4">
      {/* Top Row: Brand + Favorite */}
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-brand-red">WUNDER</span>
          <span className="text-xs text-muted-foreground">
            · {product.category_label}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onToggleFavorite(product.slug)}
          aria-label={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
          aria-pressed={isFavorite}
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-brand-red"
        >
          <Heart
            className={`size-4 ${isFavorite ? "fill-brand-red text-brand-red" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Product Image */}
      <div className="mb-3 flex h-32 items-center justify-center rounded-lg bg-white p-3 sm:h-36">
        {product.local_image ? (
          <Image
            src={product.local_image}
            alt={`WUNDER ${product.wunder_code}`}
            width={130}
            height={130}
            className="max-h-28 w-auto object-contain"
          />
        ) : null}
      </div>

      {/* Title & Stock */}
      <div className="space-y-1.5">
        <h3 className="font-jakarta text-base font-extrabold tracking-tight text-foreground sm:text-lg">
          {product.wunder_code}
        </h3>
        <p className="line-clamp-1 text-xs text-muted-foreground">
          {product.subtitle}
        </p>

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
      <div className="mt-3 space-y-1.5 border-t border-border pt-3 text-xs tabular-nums">
        <div className="flex items-center justify-between gap-2 text-muted-foreground">
          <span>Liste fiyatı</span>
          <span className="line-through">{formatTRY(product.list_price)}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground">Bayi iskontonuz</span>
          <span className="rounded bg-brand-red/10 px-1.5 py-0.5 font-bold text-brand-red">
            %{product.discount_percent}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-2 pt-1">
          <span className="text-xs font-medium text-muted-foreground">
            Size özel fiyat
          </span>
          <span className="font-jakarta text-lg font-extrabold text-foreground">
            {formatTRY(product.net_price)}
          </span>
        </div>
      </div>

      {/* Quantity + Add to Cart */}
      <div className="mt-3 flex items-center gap-2">
        <div className="flex items-center rounded-lg border border-border bg-background">
          <button
            type="button"
            disabled={!inStock || qty <= 1}
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Adet azalt"
            className="flex size-9 items-center justify-center text-foreground disabled:opacity-40"
          >
            <Minus className="size-3.5" aria-hidden="true" />
          </button>
          <span className="w-7 text-center text-xs font-bold tabular-nums">
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
          className={`flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-45 ${
            justAdded ? "bg-emerald-600" : "bg-brand-red hover:opacity-90"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="size-3.5" aria-hidden="true" />
              <span>Eklendi</span>
            </>
          ) : (
            <>
              <ShoppingCart className="size-3.5" aria-hidden="true" />
              <span>Sepete Ekle</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
