"use client";

import React, { useId, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Car,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  Home,
  Minus,
  Moon,
  Package,
  Plus,
  Search,
  ShoppingCart,
  Sun,
  Trash2,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import type { B2BWunderProduct } from "@/lib/wunder-demo";
import { B2BProductCard } from "./b2b-product-card";

interface Props {
  initialProducts: B2BWunderProduct[];
  vehicleMakes: { make: string; displayName: string }[];
}

type NavSection = "home" | "products" | "orders" | "account";
type CategoryTab = "all" | "yag" | "hava" | "kabin" | "yakit";

interface CartItem {
  product: B2BWunderProduct;
  qty: number;
}

interface OrderRecord {
  id: string;
  date: string;
  itemCount: number;
  total: number;
  status: "Teslim Edildi" | "Kargoda" | "Hazırlanıyor";
}

const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: "WND-2026-1042",
    date: "24.11.2026",
    itemCount: 18,
    total: 4862.5,
    status: "Teslim Edildi",
  },
  {
    id: "WND-2026-1089",
    date: "25.11.2026",
    itemCount: 10,
    total: 2695.0,
    status: "Kargoda",
  },
];

const QUICK_SEARCH_CODES = ["W 75/3", "55261437", "WY 500", "C 2555/2", "K 1111A"];

const emptySubscribe = () => () => {};

function formatTRY(amount: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function B2BStoreClient({ initialProducts, vehicleMakes }: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Navigation & Cart Drawer
  const [activeNav, setActiveNav] = useState<NavSection>("home");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>(INITIAL_ORDERS);
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);

  // Hidden-index code search
  const [codeQuery, setCodeQuery] = useState("");
  const [codeResults, setCodeResults] = useState<B2BWunderProduct[] | null>(null);
  const [searchingCode, setSearchingCode] = useState(false);

  // MANN-style Vehicle Cascade (Make -> Model -> Year -> Engine -> Search)
  const [make, setMake] = useState("");
  const [models, setModels] = useState<string[]>([]);
  const [model, setModel] = useState("");
  const [years, setYears] = useState<string[]>([]);
  const [year, setYear] = useState("");
  const [engines, setEngines] = useState<string[]>([]);
  const [engine, setEngine] = useState("");
  const [vehicleResults, setVehicleResults] = useState<B2BWunderProduct[] | null>(
    null
  );
  const [searchingVehicle, setSearchingVehicle] = useState(false);

  // Product catalog category filter
  const [categoryTab, setCategoryTab] = useState<CategoryTab>("all");

  const codeInputId = useId();
  const makeId = useId();
  const modelId = useId();
  const yearId = useId();
  const engineId = useId();

  async function runCodeSearch(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) {
      setCodeResults(null);
      return;
    }
    setSearchingCode(true);
    try {
      const res = await fetch(
        `/api/demo/wunder?action=search&q=${encodeURIComponent(trimmed)}`
      );
      if (res.ok) {
        const data = await res.json();
        setCodeResults(data.products ?? []);
      }
    } finally {
      setSearchingCode(false);
    }
  }

  function handleCodeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    runCodeSearch(codeQuery);
  }

  async function fetchCascade(
    nextMake: string,
    nextModel = "",
    nextYear = "",
    nextEngine = ""
  ) {
    if (!nextMake) return null;
    setSearchingVehicle(true);
    try {
      const params = new URLSearchParams({
        action: "vehicle-filters",
        make: nextMake,
      });
      if (nextModel) params.set("model", nextModel);
      if (nextYear) params.set("year", nextYear);
      if (nextEngine) params.set("engine", nextEngine);
      const res = await fetch(`/api/demo/wunder?${params.toString()}`);
      if (!res.ok) return null;
      return (await res.json()) as {
        models: string[];
        years: string[];
        engines: string[];
        products: B2BWunderProduct[];
      };
    } finally {
      setSearchingVehicle(false);
    }
  }

  async function onMakeChange(val: string) {
    setMake(val);
    setModel("");
    setYear("");
    setEngine("");
    setYears([]);
    setEngines([]);
    setVehicleResults(null);
    if (!val) {
      setModels([]);
      return;
    }
    const data = await fetchCascade(val);
    if (data) setModels(data.models);
  }

  async function onModelChange(val: string) {
    setModel(val);
    setYear("");
    setEngine("");
    setVehicleResults(null);
    if (!val) {
      setYears([]);
      setEngines([]);
      return;
    }
    const data = await fetchCascade(make, val);
    if (data) {
      setYears(data.years);
      setEngines(data.engines);
    }
  }

  async function onYearChange(val: string) {
    setYear(val);
    setEngine("");
    const data = await fetchCascade(make, model, val);
    if (data) setEngines(data.engines);
  }

  async function onVehicleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!make) return;
    const data = await fetchCascade(make, model, year, engine);
    if (data) {
      setVehicleResults(data.products);
    }
  }

  function addToCart(product: B2BWunderProduct, qty: number) {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.slug === product.slug);
      if (existing) {
        return prev.map((i) =>
          i.product.slug === product.slug ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { product, qty }];
    });
  }

  function updateCartQty(slug: string, delta: number) {
    setCart((prev) =>
      prev
        .map((i) =>
          i.product.slug === slug ? { ...i, qty: i.qty + delta } : i
        )
        .filter((i) => i.qty > 0)
    );
  }

  function removeFromCart(slug: string) {
    setCart((prev) => prev.filter((i) => i.product.slug !== slug));
  }

  function toggleFavorite(slug: string) {
    setFavorites((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  function completeDemoOrder() {
    if (cart.length === 0) return;
    const totalCount = cart.reduce((acc, i) => acc + i.qty, 0);
    const totalPrice = cart.reduce(
      (acc, i) => acc + i.product.net_price * i.qty,
      0
    );
    const newId = `WND-2026-${1090 + orders.length}`;
    setOrders((prev) => [
      {
        id: newId,
        date: "26.11.2026",
        itemCount: totalCount,
        total: totalPrice * 1.2,
        status: "Hazırlanıyor",
      },
      ...prev,
    ]);
    setCart([]);
    setOrderSuccessId(newId);
    setTimeout(() => {
      setOrderSuccessId(null);
      setCartOpen(false);
      setActiveNav("orders");
    }, 1400);
  }

  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.qty, 0),
    [cart]
  );
  const cartSubtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.product.net_price * item.qty, 0),
    [cart]
  );

  const catalogProducts = useMemo(() => {
    if (categoryTab === "all") return initialProducts;
    return initialProducts.filter((p) => p.category === categoryTab);
  }, [initialProducts, categoryTab]);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* B2B Dealer Top Bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              aria-label="canpolatkaya.com ana sitesine dön"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Link>
            <div className="flex items-center gap-2">
              <span className="font-jakarta text-lg font-black tracking-tight text-brand-red">
                WUNDER
              </span>
              <span className="hidden text-xs font-semibold text-muted-foreground sm:inline">
                B2B Bayi Portalı
              </span>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav
              aria-label="B2B portal menüsü"
              className="hidden items-center gap-1 md:flex"
            >
              {(
                [
                  ["home", "Ana Sayfa", Home],
                  ["products", "Ürünler", Package],
                  ["orders", "Siparişlerim", ClipboardList],
                  ["account", "Cari Hesap", CreditCard],
                ] as const
              ).map(([id, label, Icon]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveNav(id)}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                    activeNav === id
                      ? "bg-brand-red/10 text-brand-red"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-brand-red px-3.5 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90 sm:text-sm"
            >
              <ShoppingCart className="size-4" aria-hidden="true" />
              <span>Sepet</span>
              <span className="rounded bg-white/20 px-1.5 py-0.5 text-xs tabular-nums">
                {cartCount}
              </span>
            </button>

            {mounted && (
              <button
                type="button"
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                aria-label="Tema değiştir"
                className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-muted"
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

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 pb-24 sm:px-6 sm:py-8 md:pb-12">
        {/* HOME & PRODUCTS: Search + Vehicle Lookup + Product Grid */}
        {(activeNav === "home" || activeNav === "products") && (
          <>
            {activeNav === "home" && (
              <section className="grid gap-4 lg:grid-cols-12">
                {/* 1. Hidden-Index Code Search */}
                <div className="rounded-xl border border-border bg-card p-4 sm:p-5 lg:col-span-5">
                  <search>
                    <form onSubmit={handleCodeSubmit} className="space-y-3">
                      <label
                        htmlFor={codeInputId}
                        className="flex items-center gap-2 text-sm font-bold text-foreground"
                      >
                        <Search
                          className="size-4 text-brand-red"
                          aria-hidden="true"
                        />
                        Parça Kodu ile Ara
                      </label>
                      <div className="flex gap-2">
                        <input
                          id={codeInputId}
                          type="search"
                          value={codeQuery}
                          onChange={(e) => {
                            setCodeQuery(e.target.value);
                            if (!e.target.value.trim()) setCodeResults(null);
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
                          placeholder="Rakip, OEM veya WUNDER kodu..."
                          className="min-h-11 flex-1 rounded-lg border border-input bg-background px-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground"
                        />
                        <button
                          type="submit"
                          disabled={searchingCode}
                          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand-red px-4 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                        >
                          {searchingCode ? "..." : "Bul"}
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs text-muted-foreground">
                          Dene:
                        </span>
                        {QUICK_SEARCH_CODES.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => {
                              setCodeQuery(c);
                              runCodeSearch(c);
                            }}
                            className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground transition-colors hover:border-brand-red"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </form>
                  </search>
                </div>

                {/* 2. MANN-style Vehicle Lookup: Marka -> Model -> Yil -> Motor -> Ara */}
                <div className="rounded-xl border border-border bg-card p-4 sm:p-5 lg:col-span-7">
                  <form onSubmit={onVehicleSearchSubmit} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm font-bold text-foreground">
                        <Car
                          className="size-4 text-brand-red"
                          aria-hidden="true"
                        />
                        Araç ile Filtre Bul
                      </span>
                      {searchingVehicle && (
                        <span className="text-xs text-muted-foreground">
                          Yükleniyor...
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      <div>
                        <label
                          htmlFor={makeId}
                          className="mb-1 block text-xs font-medium text-muted-foreground"
                        >
                          Marka
                        </label>
                        <select
                          id={makeId}
                          value={make}
                          onChange={(e) => onMakeChange(e.target.value)}
                          className="min-h-11 w-full rounded-lg border border-input bg-background px-2.5 text-sm font-medium text-foreground"
                        >
                          <option value="">Seçin</option>
                          {vehicleMakes.map((m) => (
                            <option key={m.make} value={m.make}>
                              {m.displayName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor={modelId}
                          className="mb-1 block text-xs font-medium text-muted-foreground"
                        >
                          Model
                        </label>
                        <select
                          id={modelId}
                          value={model}
                          disabled={!make}
                          onChange={(e) => onModelChange(e.target.value)}
                          className="min-h-11 w-full rounded-lg border border-input bg-background px-2.5 text-sm font-medium text-foreground disabled:opacity-50"
                        >
                          <option value="">Seçin</option>
                          {models.map((mod) => (
                            <option key={mod} value={mod}>
                              {mod}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor={yearId}
                          className="mb-1 block text-xs font-medium text-muted-foreground"
                        >
                          Yıl
                        </label>
                        <select
                          id={yearId}
                          value={year}
                          disabled={!model}
                          onChange={(e) => onYearChange(e.target.value)}
                          className="min-h-11 w-full rounded-lg border border-input bg-background px-2.5 text-sm font-medium text-foreground disabled:opacity-50"
                        >
                          <option value="">Tümü</option>
                          {years.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor={engineId}
                          className="mb-1 block text-xs font-medium text-muted-foreground"
                        >
                          Motor
                        </label>
                        <select
                          id={engineId}
                          value={engine}
                          disabled={!model}
                          onChange={(e) => setEngine(e.target.value)}
                          className="min-h-11 w-full rounded-lg border border-input bg-background px-2.5 text-sm font-medium text-foreground disabled:opacity-50"
                        >
                          <option value="">Tümü</option>
                          {engines.map((eng) => (
                            <option key={eng} value={eng}>
                              {eng}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={!make || searchingVehicle}
                        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-foreground px-6 text-sm font-bold text-background transition-opacity hover:opacity-90 disabled:opacity-45 sm:w-auto"
                      >
                        <Search className="size-4" aria-hidden="true" />
                        <span>Araç Filtrelerini Getir</span>
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            )}

            {/* Active Search Results (Code or Vehicle) */}
            {activeNav === "home" && codeResults !== null && (
              <section className="space-y-3 rounded-xl border border-brand-red/30 bg-card p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-jakarta text-base font-bold text-foreground text-balance">
                    &ldquo;{codeQuery}&rdquo; Arama Sonucu ({codeResults.length} ürün)
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      setCodeQuery("");
                      setCodeResults(null);
                    }}
                    className="text-xs font-semibold text-muted-foreground hover:text-foreground"
                  >
                    Temizle
                  </button>
                </div>

                {codeResults.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Bu kodla eşleşen WUNDER ürünü bulunamadı.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {codeResults.map((p) => (
                      <B2BProductCard
                        key={p.slug}
                        product={p}
                        isFavorite={favorites.includes(p.slug)}
                        onToggleFavorite={toggleFavorite}
                        onAddToCart={addToCart}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeNav === "home" && vehicleResults !== null && (
              <section className="space-y-3 rounded-xl border border-border bg-card p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-jakarta text-base font-bold text-foreground text-balance">
                    Seçilen Araç İçin WUNDER Filtreleri ({vehicleResults.length})
                  </h2>
                  <button
                    type="button"
                    onClick={() => setVehicleResults(null)}
                    className="text-xs font-semibold text-muted-foreground hover:text-foreground"
                  >
                    Kapat
                  </button>
                </div>

                {vehicleResults.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Bu araç seçimi için demoda ürün bulunamadı.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {vehicleResults.map((p) => (
                      <B2BProductCard
                        key={p.slug}
                        product={p}
                        isFavorite={favorites.includes(p.slug)}
                        onToggleFavorite={toggleFavorite}
                        onAddToCart={addToCart}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Main Product Catalog Grid */}
            <section className="space-y-4">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h1 className="font-jakarta text-xl font-extrabold tracking-tight text-foreground text-balance sm:text-2xl">
                    Ürün Kataloğu
                  </h1>
                  <p className="text-xs text-muted-foreground tabular-nums sm:text-sm">
                    {catalogProducts.length} WUNDER ürünü listeleniyor
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {(
                    [
                      ["all", "Tümü"],
                      ["yag", "Yağ"],
                      ["hava", "Hava"],
                      ["kabin", "Polen"],
                      ["yakit", "Yakıt"],
                    ] as const
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setCategoryTab(key)}
                      className={`min-h-9 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                        categoryTab === key
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-card text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {catalogProducts.map((product) => (
                  <B2BProductCard
                    key={product.slug}
                    product={product}
                    isFavorite={favorites.includes(product.slug)}
                    onToggleFavorite={toggleFavorite}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {/* ORDERS VIEW */}
        {activeNav === "orders" && (
          <section className="space-y-4">
            <h1 className="font-jakarta text-xl font-extrabold tracking-tight text-foreground text-balance sm:text-2xl">
              Siparişlerim
            </h1>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="divide-y divide-border">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="flex flex-col justify-between gap-3 p-4 sm:flex-row sm:items-center sm:p-5"
                  >
                    <div className="space-y-1">
                      <div className="font-jakarta text-base font-bold text-foreground">
                        {ord.id}
                      </div>
                      <div className="text-xs text-muted-foreground tabular-nums">
                        {ord.date} · {ord.itemCount} adet ürün
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <span className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-semibold text-foreground">
                        {ord.status}
                      </span>
                      <span className="font-jakarta text-base font-extrabold text-foreground tabular-nums">
                        {formatTRY(ord.total)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ACCOUNT VIEW */}
        {activeNav === "account" && (
          <section className="space-y-5">
            <h1 className="font-jakarta text-xl font-extrabold tracking-tight text-foreground text-balance sm:text-2xl">
              Cari Hesap Özeti
            </h1>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="text-xs text-muted-foreground">Güncel Bakiye</div>
                <div className="mt-1 font-jakarta text-2xl font-extrabold text-foreground tabular-nums">
                  {formatTRY(14250)}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="text-xs text-muted-foreground">Açık Hesap Limiti</div>
                <div className="mt-1 font-jakarta text-2xl font-extrabold text-foreground tabular-nums">
                  {formatTRY(150000)}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="text-xs text-muted-foreground">Tanımlı Bayi İskontosu</div>
                <div className="mt-1 font-jakarta text-2xl font-extrabold text-brand-red tabular-nums">
                  %45
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Mobile Bottom Navigation for B2B Portal */}
      <nav
        aria-label="Mobil B2B menü"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 px-2 py-1.5 pb-[max(0.4rem,env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
          {(
            [
              ["home", "Ana Sayfa", Home],
              ["products", "Ürünler", Package],
              ["orders", "Siparişler", ClipboardList],
              ["account", "Cari Hesap", CreditCard],
            ] as const
          ).map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveNav(id)}
              className={`flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-lg text-xs font-semibold transition-colors ${
                activeNav === id
                  ? "bg-brand-red/10 text-brand-red"
                  : "text-muted-foreground"
              }`}
            >
              <Icon className="size-4" aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Slide-over Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Alışveriş Sepeti"
            className="flex h-dvh w-full max-w-md flex-col border-l border-border bg-card"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-jakarta text-lg font-bold text-foreground">
                Sepetim ({cartCount} adet)
              </h2>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Sepeti kapat"
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {orderSuccessId ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2
                    className="mb-3 size-12 text-emerald-500"
                    aria-hidden="true"
                  />
                  <div className="font-jakarta text-lg font-bold text-foreground">
                    Sipariş Alındı ({orderSuccessId})
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Siparişlerim sekmesine yönlendiriliyorsunuz...
                  </p>
                </div>
              ) : cart.length === 0 ? (
                <p className="py-12 text-center text-sm text-muted-foreground">
                  Sepetiniz boş. Ürün kartlarından sepete filtre ekleyebilirsiniz.
                </p>
              ) : (
                <ul className="divide-y divide-border">
                  {cart.map(({ product, qty }) => (
                    <li
                      key={product.slug}
                      className="flex items-center justify-between gap-3 py-3.5"
                    >
                      <div className="min-w-0">
                        <div className="font-jakarta text-sm font-bold text-foreground">
                          WUNDER {product.wunder_code}
                        </div>
                        <div className="text-xs text-muted-foreground tabular-nums">
                          {formatTRY(product.net_price)} × {qty}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-lg border border-border bg-background">
                          <button
                            type="button"
                            onClick={() => updateCartQty(product.slug, -1)}
                            aria-label="Azalt"
                            className="flex size-8 items-center justify-center"
                          >
                            <Minus className="size-3" aria-hidden="true" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold tabular-nums">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQty(product.slug, 1)}
                            aria-label="Artır"
                            className="flex size-8 items-center justify-center"
                          >
                            <Plus className="size-3" aria-hidden="true" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.slug)}
                          aria-label="Ürünü sil"
                          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && !orderSuccessId && (
              <div className="space-y-3 border-t border-border p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
                  <span>Ara Toplam</span>
                  <span>{formatTRY(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
                  <span>KDV (%20)</span>
                  <span>{formatTRY(cartSubtotal * 0.2)}</span>
                </div>
                <div className="flex justify-between font-jakarta text-base font-extrabold text-foreground tabular-nums">
                  <span>Genel Toplam</span>
                  <span>{formatTRY(cartSubtotal * 1.2)}</span>
                </div>
                <button
                  type="button"
                  onClick={completeDemoOrder}
                  className="min-h-12 w-full rounded-xl bg-brand-red text-sm font-bold text-white transition-opacity hover:opacity-90"
                >
                  Siparişi Tamamla (Demo)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
