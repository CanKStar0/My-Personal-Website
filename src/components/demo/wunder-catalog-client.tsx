"use client";

import React, {
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Car,
  Check,
  Copy,
  Database,
  Filter,
  Layers,
  Moon,
  Search,
  Sparkles,
  Sun,
  Wrench,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import type {
  CodeMatchHit,
  RawWunderProduct,
  VehicleApplicationRow,
  WunderDemoStats,
  WunderProductSummary,
} from "@/lib/wunder-demo";
import styles from "./wunder-catalog.module.css";

interface Props {
  initialSummaries: WunderProductSummary[];
  initialProduct: RawWunderProduct;
  vehicleMakes: { make: string; count: number }[];
  stats: WunderDemoStats;
}

type ActiveTab = "uygulama" | "oem" | "rakip";
type CategoryFilter = "all" | "yag" | "hava" | "kabin" | "yakit";

const QUICK_CHIPS = [
  { label: "WY 500", sub: "WUNDER" },
  { label: "W 75/3", sub: "MANN" },
  { label: "55261437", sub: "FIAT OEM" },
  { label: "OP 643/3", sub: "MOTOEC" },
  { label: "K 1111A", sub: "POLEN" },
  { label: "PP 841/6", sub: "YAKIT" },
];

const POPULAR_MAKES = [
  "FIAT",
  "OPEL",
  "RENAULT",
  "VOLKSWAGEN",
  "FORD",
  "HYUNDAI",
  "PEUGEOT",
  "CITROEN",
];

function norm(s: string): string {
  return (s || "").toUpperCase().replace(/[\s\-_./]+/g, "");
}

const emptySubscribe = () => () => {};

export function WunderCatalogClient({
  initialSummaries,
  initialProduct,
  vehicleMakes,
  stats,
}: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Selected product & match banner
  const [selectedProduct, setSelectedProduct] =
    useState<RawWunderProduct>(initialProduct);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [matchBanner, setMatchBanner] = useState<CodeMatchHit | null>(null);

  // Code Search state
  const [codeQuery, setCodeQuery] = useState("");
  const [codeHits, setCodeHits] = useState<CodeMatchHit[] | null>(null);
  const [searchingCode, setSearchingCode] = useState(false);

  // Vehicle Cascade state
  const [selectedMake, setSelectedMake] = useState("");
  const [modelsList, setModelsList] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [enginesList, setEnginesList] = useState<string[]>([]);
  const [selectedEngine, setSelectedEngine] = useState("");
  const [vehicleMatches, setVehicleMatches] = useState<
    {
      slug: string;
      wunder_code: string;
      filter_type: string;
      local_image: string | null;
      matched_apps: VehicleApplicationRow[];
    }[]
  >([]);
  const [searchingVehicle, setSearchingVehicle] = useState(false);

  // Catalog shelf category filter
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  // Tabs inside product detail
  const [activeTab, setActiveTab] = useState<ActiveTab>("uygulama");
  const tabRefs = useRef<Record<ActiveTab, HTMLButtonElement | null>>({
    uygulama: null,
    oem: null,
    rakip: null,
  });

  // Per-tab table filters
  const [appMakeFilter, setAppMakeFilter] = useState("ALL");
  const [appTextFilter, setAppTextFilter] = useState("");
  const [appLimit, setAppLimit] = useState(50);
  const [oemFilter, setOemFilter] = useState("");
  const [rivalFilter, setRivalFilter] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const codeInputId = useId();
  const makeSelectId = useId();
  const modelSelectId = useId();
  const engineSelectId = useId();
  const appsCaptionId = useId();
  const oemCaptionId = useId();
  const rivalCaptionId = useId();

  async function selectProductBySlug(slug: string, hit?: CodeMatchHit | null) {
    setLoadingProduct(true);
    try {
      const res = await fetch(
        `/api/demo/wunder?action=product&slug=${encodeURIComponent(slug)}`
      );
      if (res.ok) {
        const data = await res.json();
        setSelectedProduct(data.product);
        setMatchBanner(hit ?? null);
        setAppMakeFilter("ALL");
        setAppTextFilter("");
        setAppLimit(50);
        setOemFilter("");
        setRivalFilter("");
      }
    } finally {
      setLoadingProduct(false);
    }
  }

  async function runCodeSearch(queryStr: string) {
    const trimmed = queryStr.trim();
    if (!trimmed) {
      setCodeHits(null);
      setMatchBanner(null);
      return;
    }
    setSearchingCode(true);
    try {
      const res = await fetch(
        `/api/demo/wunder?action=search&q=${encodeURIComponent(trimmed)}`
      );
      if (res.ok) {
        const data = await res.json();
        const hits: CodeMatchHit[] = data.hits ?? [];
        setCodeHits(hits);
        if (hits.length > 0) {
          await selectProductBySlug(hits[0].slug, hits[0]);
          if (hits[0].match_source === "OEM") setActiveTab("oem");
          else if (hits[0].match_source === "RAKIP") setActiveTab("rakip");
          else setActiveTab("uygulama");
        }
      }
    } finally {
      setSearchingCode(false);
    }
  }

  function handleCodeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    runCodeSearch(codeQuery);
  }

  async function handleMakeChange(make: string) {
    setSelectedMake(make);
    setSelectedModel("");
    setSelectedEngine("");
    setEnginesList([]);
    if (!make) {
      setModelsList([]);
      setVehicleMatches([]);
      return;
    }
    setSearchingVehicle(true);
    try {
      const res = await fetch(
        `/api/demo/wunder?action=vehicles&make=${encodeURIComponent(make)}`
      );
      if (res.ok) {
        const data = await res.json();
        setModelsList(data.models ?? []);
        setVehicleMatches(data.products ?? []);
      }
    } finally {
      setSearchingVehicle(false);
    }
  }

  async function handleModelChange(model: string) {
    setSelectedModel(model);
    setSelectedEngine("");
    if (!selectedMake) return;
    setSearchingVehicle(true);
    try {
      const res = await fetch(
        `/api/demo/wunder?action=vehicles&make=${encodeURIComponent(selectedMake)}&model=${encodeURIComponent(model)}`
      );
      if (res.ok) {
        const data = await res.json();
        setEnginesList(data.engines ?? []);
        setVehicleMatches(data.products ?? []);
      }
    } finally {
      setSearchingVehicle(false);
    }
  }

  async function handleEngineChange(engine: string) {
    setSelectedEngine(engine);
    if (!selectedMake) return;
    setSearchingVehicle(true);
    try {
      const res = await fetch(
        `/api/demo/wunder?action=vehicles&make=${encodeURIComponent(selectedMake)}&model=${encodeURIComponent(selectedModel)}&engine=${encodeURIComponent(engine)}`
      );
      if (res.ok) {
        const data = await res.json();
        setVehicleMatches(data.products ?? []);
        if (data.products?.length > 0) {
          await selectProductBySlug(data.products[0].slug, null);
          setActiveTab("uygulama");
          setAppMakeFilter(selectedMake);
        }
      }
    } finally {
      setSearchingVehicle(false);
    }
  }

  function handleVehicleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (vehicleMatches.length > 0) {
      selectProductBySlug(vehicleMatches[0].slug, null);
      setActiveTab("uygulama");
      if (selectedMake) setAppMakeFilter(selectedMake);
    }
  }

  async function copyCode(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1600);
    } catch {
      // Clipboard fallback ignored if blocked
    }
  }

  // Shelf summaries filtered by category
  const filteredSummaries = useMemo(() => {
    if (categoryFilter === "all") return initialSummaries;
    return initialSummaries.filter((item) => item.category === categoryFilter);
  }, [initialSummaries, categoryFilter]);

  // Unique makes inside currently selected product
  const productMakes = useMemo(() => {
    const counts = new Map<string, number>();
    for (const app of selectedProduct.applications) {
      counts.set(app.make, (counts.get(app.make) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0], "tr"));
  }, [selectedProduct]);

  const filteredApplications = useMemo(() => {
    const q = appTextFilter.trim().toLocaleLowerCase("tr-TR");
    return selectedProduct.applications.filter((app) => {
      if (appMakeFilter !== "ALL" && app.make !== appMakeFilter) return false;
      if (!q) return true;
      return (
        app.make.toLocaleLowerCase("tr-TR").includes(q) ||
        app.model_series.toLocaleLowerCase("tr-TR").includes(q) ||
        app.engine.toLocaleLowerCase("tr-TR").includes(q) ||
        app.engine_code.toLocaleLowerCase("tr-TR").includes(q) ||
        app.years.toLocaleLowerCase("tr-TR").includes(q)
      );
    });
  }, [selectedProduct, appMakeFilter, appTextFilter]);

  const visibleApplications = useMemo(
    () => filteredApplications.slice(0, appLimit),
    [filteredApplications, appLimit]
  );

  const filteredOems = useMemo(() => {
    const q = norm(oemFilter);
    const qText = oemFilter.trim().toLocaleLowerCase("tr-TR");
    if (!q && !qText) return selectedProduct.oem_numbers;
    return selectedProduct.oem_numbers.filter(
      (o) =>
        norm(o.oem_number).includes(q) ||
        o.manufacturer.toLocaleLowerCase("tr-TR").includes(qText)
    );
  }, [selectedProduct, oemFilter]);

  const filteredRivals = useMemo(() => {
    const q = norm(rivalFilter);
    const qText = rivalFilter.trim().toLocaleLowerCase("tr-TR");
    if (!q && !qText) return selectedProduct.rival_numbers;
    return selectedProduct.rival_numbers.filter(
      (r) =>
        r.brand.toUpperCase().startsWith("WUNDER") ||
        norm(r.rival_code).includes(q) ||
        r.brand.toLocaleLowerCase("tr-TR").includes(qText)
    );
  }, [selectedProduct, rivalFilter]);

  // Keyboard navigation on tablist (ArrowLeft / ArrowRight / Home / End)
  function handleTabKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const order: ActiveTab[] = ["uygulama", "oem", "rakip"];
    const idx = order.indexOf(activeTab);
    let nextIdx = -1;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % order.length;
    else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + order.length) % order.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = order.length - 1;

    if (nextIdx >= 0) {
      e.preventDefault();
      const target = order[nextIdx];
      setActiveTab(target);
      tabRefs.current[target]?.focus();
      tabRefs.current[target]?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
      });
    }
  }

  const dimEntries = Object.entries(selectedProduct.dimensions || {});
  const specEntries = Object.entries(selectedProduct.specs || {});
  const specLabels: Record<string, string> = {
    bypass_valve: "ByPass Valf",
    anti_drain_valve: "Boşalmayı Önleyici Valf",
    anti_siphon_valve: "Anti Sifon Valf",
    notes: "Açıklamalar",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Unlisted Demo Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              canpolatkaya.com
            </Link>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="inline-flex items-center rounded-md bg-[var(--brand-red)] px-2 py-0.5 text-[11px] font-bold tracking-wider text-white">
                WUNDER DEMO
              </span>
              <span className="text-sm font-semibold text-foreground">
                B2B Filtre Çapraz Referans & Araç Kataloğu
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground md:inline-flex">
              {stats.total_products} WUNDER · {stats.total_oem_refs} OEM ·{" "}
              {stats.total_rival_refs} Rakip · {stats.total_applications.toLocaleString("tr-TR")} Araç
            </span>
            {mounted && (
              <button
                type="button"
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                aria-label="Tema değiştir"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 sm:py-8">
        {/* Hero Intro + Dual Search Console */}
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex flex-col justify-between gap-4 border-b border-border pb-5 lg:flex-row lg:items-end">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-foreground">
                <Sparkles className="h-3.5 w-3.5 text-[var(--brand-red)]" />
                Özel Demo · 10 Aktif WUNDER Filtresi & Canlı Çapraz Eşleştirme
              </div>
              <h1 className="font-jakarta text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                Rakip Kodu, OEM veya Araç Seçin — En Üstte{" "}
                <span className="text-[var(--brand-red)]">WUNDER</span> Çıksın
              </h1>
              <p className="mt-1.5 max-w-3xl text-sm text-muted-foreground">
                Müşteriniz elindeki MANN, Filtron, Mahle, Bosch kodunu veya orijinal araç OEM
                numarasını yazsın; sistem otomatik olarak karşılığı olan{" "}
                <strong className="text-foreground">WUNDER ürününü en üstte</strong> getirsin.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center sm:grid-cols-4">
              <div className="rounded-xl border border-border bg-background px-3 py-2">
                <div className="text-lg font-extrabold text-[var(--brand-red)]">
                  {stats.total_products}
                </div>
                <div className="text-[11px] font-medium text-muted-foreground">
                  WUNDER Ürünü
                </div>
              </div>
              <div className="rounded-xl border border-border bg-background px-3 py-2">
                <div className="text-lg font-extrabold text-foreground">
                  {stats.total_oem_refs}
                </div>
                <div className="text-[11px] font-medium text-muted-foreground">
                  OEM Kodu
                </div>
              </div>
              <div className="rounded-xl border border-border bg-background px-3 py-2">
                <div className="text-lg font-extrabold text-foreground">
                  {stats.total_rival_refs}
                </div>
                <div className="text-[11px] font-medium text-muted-foreground">
                  Rakip Kodu
                </div>
              </div>
              <div className="rounded-xl border border-border bg-background px-3 py-2">
                <div className="text-lg font-extrabold text-foreground">
                  {stats.total_applications.toLocaleString("tr-TR")}
                </div>
                <div className="text-[11px] font-medium text-muted-foreground">
                  Araç Eşleşmesi
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left: Smart Code Search (OEM + Rival + WUNDER) */}
            <div className="rounded-xl border border-border bg-background p-4 sm:p-5 lg:col-span-6">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
                <Search className="h-4 w-4 text-[var(--brand-red)]" />
                1. Kod ile Ara (WUNDER / OEM / MANN / Rakip)
              </div>
              <search>
                <form onSubmit={handleCodeSubmit} className="space-y-3">
                  <div>
                    <label
                      htmlFor={codeInputId}
                      className="mb-1.5 block text-xs font-medium text-muted-foreground"
                    >
                      Boşluklu veya bitişik yazabilirsiniz (ör. W 75/3, W753, 55261437, WY 500)
                    </label>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <div className="relative flex-1">
                        <input
                          id={codeInputId}
                          name="code_query"
                          type="search"
                          value={codeQuery}
                          onChange={(e) => setCodeQuery(e.target.value)}
                          onKeyDown={(e) => {
                            if (
                              e.key === "Enter" &&
                              e.nativeEvent.isComposing
                            ) {
                              e.preventDefault();
                            }
                          }}
                          autoCorrect="off"
                          autoCapitalize="none"
                          spellCheck={false}
                          enterKeyHint="search"
                          placeholder="Filtre veya OEM numarası yazın..."
                          className="min-h-[48px] w-full rounded-xl border border-input bg-card px-4 pr-10 text-base font-medium text-foreground placeholder:text-muted-foreground"
                        />
                        {codeQuery && (
                          <button
                            type="button"
                            onClick={() => {
                              setCodeQuery("");
                              setCodeHits(null);
                              setMatchBanner(null);
                            }}
                            aria-label="Aramayı temizle"
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <button
                        type="submit"
                        disabled={searchingCode}
                        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[var(--brand-red)] px-5 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                      >
                        <Search className="h-4 w-4" />
                        {searchingCode ? "Aranıyor..." : "WUNDER Bul"}
                      </button>
                    </div>
                  </div>

                  {/* Quick sample chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Hızlı Dene:
                    </span>
                    {QUICK_CHIPS.map((chip) => (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => {
                          setCodeQuery(chip.label);
                          runCodeSearch(chip.label);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-[var(--brand-red)]"
                      >
                        <span className="font-bold">{chip.label}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {chip.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </form>
              </search>

              {/* Search results feedback */}
              {codeHits !== null && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-3 rounded-xl border border-border bg-card p-3"
                >
                  {codeHits.length === 0 ? (
                    <p className="text-xs text-muted-foreground">
                      Bu 10 filtreli demoda{" "}
                      <strong className="text-foreground">&ldquo;{codeQuery}&rdquo;</strong>{" "}
                      için eşleşme bulunamadı. Hızlı deneme kodlarından birini seçebilirsiniz.
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="text-xs font-semibold text-muted-foreground">
                        {codeHits.length} WUNDER eşleşmesi bulundu:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {codeHits.map((hit) => (
                          <button
                            key={hit.slug}
                            type="button"
                            onClick={() => selectProductBySlug(hit.slug, hit)}
                            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-left text-xs transition-colors ${
                              selectedProduct.slug === hit.slug
                                ? "border-[var(--brand-red)] bg-[var(--brand-red)]/10"
                                : "border-border bg-background hover:border-[var(--brand-red)]"
                            }`}
                          >
                            <span className="font-extrabold text-[var(--brand-red)]">
                              WUNDER {hit.wunder_code}
                            </span>
                            <span className="text-muted-foreground">
                              ← {hit.matched_brand}: {hit.matched_code}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right: Cascading Vehicle Search */}
            <div className="rounded-xl border border-border bg-background p-4 sm:p-5 lg:col-span-6">
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <Car className="h-4 w-4 text-[var(--brand-red)]" />
                  2. Araç ile Ara (Marka → Model → Motor / Yıl)
                </div>
                {searchingVehicle && (
                  <span className="text-xs text-muted-foreground">
                    Yükleniyor...
                  </span>
                )}
              </div>

              {/* Popular Make quick buttons */}
              <div className="mb-3 flex flex-wrap gap-1.5">
                {POPULAR_MAKES.map((mk) => (
                  <button
                    key={mk}
                    type="button"
                    onClick={() => handleMakeChange(mk)}
                    className={`rounded-lg border px-2.5 py-1 text-[11px] font-bold transition-colors ${
                      selectedMake === mk
                        ? "border-[var(--brand-red)] bg-[var(--brand-red)] text-white"
                        : "border-border bg-card text-foreground hover:border-[var(--brand-red)]"
                    }`}
                  >
                    {mk}
                  </button>
                ))}
              </div>

              <form onSubmit={handleVehicleSubmit} className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor={makeSelectId}
                    className="mb-1 block text-xs font-medium text-muted-foreground"
                  >
                    Marka ({vehicleMakes.length})
                  </label>
                  <select
                    id={makeSelectId}
                    name="make"
                    value={selectedMake}
                    onChange={(e) => handleMakeChange(e.target.value)}
                    className="min-h-[48px] w-full rounded-xl border border-input bg-card px-3 text-sm font-medium text-foreground"
                  >
                    <option value="">Marka Seçin...</option>
                    {vehicleMakes.map((m) => (
                      <option key={m.make} value={m.make}>
                        {m.make} ({m.count})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={modelSelectId}
                    className="mb-1 block text-xs font-medium text-muted-foreground"
                  >
                    Model Serisi
                  </label>
                  <select
                    id={modelSelectId}
                    name="model"
                    value={selectedModel}
                    disabled={!selectedMake}
                    onChange={(e) => handleModelChange(e.target.value)}
                    className="min-h-[48px] w-full rounded-xl border border-input bg-card px-3 text-sm font-medium text-foreground disabled:opacity-50"
                  >
                    <option value="">Model Seçin...</option>
                    {modelsList.map((mod) => (
                      <option key={mod} value={mod}>
                        {mod}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={engineSelectId}
                    className="mb-1 block text-xs font-medium text-muted-foreground"
                  >
                    Motor / Yıl
                  </label>
                  <select
                    id={engineSelectId}
                    name="engine"
                    value={selectedEngine}
                    disabled={!selectedModel}
                    onChange={(e) => handleEngineChange(e.target.value)}
                    className="min-h-[48px] w-full rounded-xl border border-input bg-card px-3 text-sm font-medium text-foreground disabled:opacity-50"
                  >
                    <option value="">Tümü ({enginesList.length})</option>
                    {enginesList.map((eng) => (
                      <option key={eng} value={eng}>
                        {eng}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedMake && vehicleMatches.length > 0 && (
                  <div className="sm:col-span-3 rounded-xl border border-border bg-card p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground">
                        {selectedMake} {selectedModel} için uygun WUNDER filtreleri (
                        {vehicleMatches.length}):
                      </span>
                      <button
                        type="submit"
                        className="text-xs font-bold text-[var(--brand-red)] hover:underline"
                      >
                        İlk Eşleşeni Aç →
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {vehicleMatches.map((vm) => (
                        <button
                          key={vm.slug}
                          type="button"
                          onClick={() => {
                            selectProductBySlug(vm.slug, null);
                            setActiveTab("uygulama");
                            setAppMakeFilter(selectedMake);
                          }}
                          className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                            selectedProduct.slug === vm.slug
                              ? "border-[var(--brand-red)] bg-[var(--brand-red)]/10"
                              : "border-border bg-background hover:border-[var(--brand-red)]"
                          }`}
                        >
                          <span className="font-extrabold text-[var(--brand-red)]">
                            WUNDER {vm.wunder_code}
                          </span>
                          <span className="text-muted-foreground">
                            {vm.filter_type}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* 10 WUNDER Products Quick Shelf */}
        <section aria-label="Demo ürün listesi" className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-jakarta flex items-center gap-2 text-base font-bold text-foreground">
              <Layers className="h-4 w-4 text-[var(--brand-red)]" />
              Demo Katalogdaki 10 WUNDER Filtresi
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  ["all", "Tümü (10)"],
                  ["yag", "Yağ (6)"],
                  ["hava", "Hava (2)"],
                  ["kabin", "Kabin / Polen (1)"],
                  ["yakit", "Yakıt (1)"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCategoryFilter(key)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    categoryFilter === key
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {filteredSummaries.map((item) => {
              const active = selectedProduct.slug === item.slug;
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => selectProductBySlug(item.slug, null)}
                  className={`group flex flex-col justify-between rounded-xl border p-3 text-left transition-all ${
                    active
                      ? "border-[var(--brand-red)] bg-card ring-2 ring-[var(--brand-red)]/25"
                      : "border-border bg-card hover:border-[var(--brand-red)]/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        WUNDER
                      </div>
                      <div className="font-jakarta text-lg font-extrabold text-[var(--brand-red)]">
                        {item.wunder_code}
                      </div>
                    </div>
                    {item.local_image ? (
                      <Image
                        src={item.local_image}
                        alt={`WUNDER ${item.wunder_code}`}
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-lg border border-border bg-white object-contain p-1"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
                        <Filter className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <div className="mt-2.5">
                    <div className="line-clamp-1 text-xs font-semibold text-foreground">
                      {item.filter_type}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span>{item.oem_count} OEM</span>
                      <span>·</span>
                      <span>{item.rival_count} Rakip</span>
                      <span>·</span>
                      <span>{item.app_count} Araç</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Main WUNDER Product Detail Card */}
        <section
          aria-live="polite"
          className={`rounded-2xl border border-border bg-card shadow-sm transition-opacity ${
            loadingProduct ? "opacity-60" : "opacity-100"
          }`}
        >
          {/* Match Highlight Callout when found via Competitor or OEM */}
          {matchBanner && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-2xl border-b border-border bg-[var(--brand-red)]/10 px-5 py-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[var(--brand-red)] px-2 py-0.5 text-[11px] font-bold text-white">
                  ÇAPRAZ EŞLEŞME
                </span>
                <span className="text-foreground">
                  Aradığınız{" "}
                  <strong>
                    {matchBanner.matched_brand} ({matchBanner.matched_code})
                  </strong>{" "}
                  kodunun WUNDER karşılığı:{" "}
                  <strong className="text-[var(--brand-red)]">
                    WUNDER {selectedProduct.wunder_code}
                  </strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMatchBanner(null)}
                className="text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                Kapat
              </button>
            </div>
          )}

          {/* Product Hero Area: WUNDER FIRST */}
          <div className="grid gap-6 border-b border-border p-5 sm:p-7 lg:grid-cols-12">
            {/* Image box */}
            <div className="flex items-center justify-center rounded-xl border border-border bg-white p-4 lg:col-span-3">
              {selectedProduct.local_image ? (
                <Image
                  src={selectedProduct.local_image}
                  alt={`WUNDER ${selectedProduct.wunder_code} - ${selectedProduct.filter_type}`}
                  width={180}
                  height={180}
                  className="max-h-44 w-auto object-contain"
                />
              ) : (
                <div className="flex h-40 flex-col items-center justify-center gap-2 text-zinc-400">
                  <Filter className="h-12 w-12" />
                  <span className="text-xs font-medium">Görsel Hazırlanıyor</span>
                </div>
              )}
            </div>

            {/* WUNDER Identity + Dimensions + Technical Notes */}
            <div className="flex flex-col justify-between gap-5 lg:col-span-9">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-[var(--brand-red)] px-2.5 py-0.5 text-xs font-extrabold tracking-wide text-white">
                      ANA ÜRÜN · WUNDER
                    </span>
                    <span className="inline-flex items-center rounded-md border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground">
                      {selectedProduct.filter_type}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Ref: {selectedProduct.motoec_code}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-jakarta text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                      WUNDER{" "}
                      <span className="text-[var(--brand-red)]">
                        {selectedProduct.wunder_code}
                      </span>
                    </h2>
                    <button
                      type="button"
                      onClick={() =>
                        copyCode(
                          `WUNDER ${selectedProduct.wunder_code}`,
                          "hero-wunder"
                        )
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-[var(--brand-red)]"
                    >
                      {copiedKey === "hero-wunder" ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                          Kopyalandı
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Kodu Kopyala
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Summary Badges */}
                <div className="flex flex-wrap gap-2">
                  <div className="rounded-xl border border-border bg-background px-3.5 py-2 text-center">
                    <div className="text-sm font-extrabold text-foreground">
                      {selectedProduct.applications.length.toLocaleString("tr-TR")}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      Uyumlu Araç
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-background px-3.5 py-2 text-center">
                    <div className="text-sm font-extrabold text-foreground">
                      {selectedProduct.oem_numbers.length}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      OEM Numarası
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-background px-3.5 py-2 text-center">
                    <div className="text-sm font-extrabold text-foreground">
                      {selectedProduct.rival_numbers.length}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      Rakip Kodu
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Dimensions Grid */}
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-background p-3.5">
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <Wrench className="h-3.5 w-3.5" />
                    Teknik Ölçüler (mm)
                  </div>
                  {dimEntries.length > 0 ? (
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                      {dimEntries.map(([k, v]) => (
                        <div
                          key={k}
                          className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-center"
                        >
                          <div className="text-[10px] font-bold text-muted-foreground">
                            {k}
                          </div>
                          <div className="text-sm font-bold text-foreground">
                            {v}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Ölçü bilgisi bulunmuyor.
                    </p>
                  )}
                </div>

                <div className="rounded-xl border border-border bg-background p-3.5">
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <Database className="h-3.5 w-3.5" />
                    Valf & Teknik Notlar
                  </div>
                  {specEntries.length > 0 ? (
                    <dl className="space-y-1 text-xs">
                      {specEntries.map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-2">
                          <dt className="font-medium text-muted-foreground">
                            {specLabels[k] ?? k}:
                          </dt>
                          <dd className="font-semibold text-foreground">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Standart OEM uyumlu spesifikasyon.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 3 Accessible Tabs: Uygulama | OEM Numaraları | Rakip Numaraları */}
          <div>
            <div
              role="tablist"
              aria-label="Filtre detay sekmeleri"
              onKeyDown={handleTabKeyDown}
              className={`${styles.tabList} px-4 sm:px-6`}
            >
              <button
                ref={(el) => {
                  tabRefs.current.uygulama = el;
                }}
                type="button"
                role="tab"
                id="tab-uygulama"
                aria-selected={activeTab === "uygulama"}
                tabIndex={activeTab === "uygulama" ? 0 : -1}
                onClick={() => setActiveTab("uygulama")}
                className={styles.tabButton}
              >
                Uygulama ({selectedProduct.applications.length.toLocaleString("tr-TR")})
              </button>
              <button
                ref={(el) => {
                  tabRefs.current.oem = el;
                }}
                type="button"
                role="tab"
                id="tab-oem"
                aria-selected={activeTab === "oem"}
                tabIndex={activeTab === "oem" ? 0 : -1}
                onClick={() => setActiveTab("oem")}
                className={styles.tabButton}
              >
                OEM Numaraları ({selectedProduct.oem_numbers.length})
              </button>
              <button
                ref={(el) => {
                  tabRefs.current.rakip = el;
                }}
                type="button"
                role="tab"
                id="tab-rakip"
                aria-selected={activeTab === "rakip"}
                tabIndex={activeTab === "rakip" ? 0 : -1}
                onClick={() => setActiveTab("rakip")}
                className={styles.tabButton}
              >
                Rakip Numaraları ({selectedProduct.rival_numbers.length})
              </button>
            </div>

            {/* Panel 1: Uygulama */}
            <div
              role="tabpanel"
              aria-labelledby="tab-uygulama"
              hidden={activeTab !== "uygulama"}
              tabIndex={activeTab === "uygulama" ? 0 : undefined}
            >
              <div className="space-y-4 p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      aria-label="Araç markasına göre filtrele"
                      value={appMakeFilter}
                      onChange={(e) => {
                        setAppMakeFilter(e.target.value);
                        setAppLimit(50);
                      }}
                      className="min-h-[42px] rounded-lg border border-input bg-background px-3 text-sm font-medium text-foreground"
                    >
                      <option value="ALL">
                        Tüm Markalar ({productMakes.length})
                      </option>
                      {productMakes.map(([make, cnt]) => (
                        <option key={make} value={make}>
                          {make} ({cnt})
                        </option>
                      ))}
                    </select>
                    <input
                      type="search"
                      aria-label="Araç tablosunda ara"
                      value={appTextFilter}
                      onChange={(e) => {
                        setAppTextFilter(e.target.value);
                        setAppLimit(50);
                      }}
                      placeholder="Model, motor kodu veya yıl ara..."
                      className="min-h-[42px] w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground sm:w-64"
                    />
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                    Gösterilen: {visibleApplications.length} /{" "}
                    {filteredApplications.length.toLocaleString("tr-TR")} araç
                  </div>
                </div>

                <div
                  tabIndex={0}
                  role="region"
                  aria-labelledby={appsCaptionId}
                  className={styles.tableWrapper}
                >
                  <table className={`${styles.dataTable} ${styles.appsTable}`}>
                    <caption id={appsCaptionId} className="sr-only">
                      WUNDER {selectedProduct.wunder_code} uyumlu araç listesi
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Marka</th>
                        <th scope="col">Model Serisi</th>
                        <th scope="col">Motor</th>
                        <th scope="col">Motor Kodu</th>
                        <th scope="col">kW / BG</th>
                        <th scope="col">Üretim Yılı</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleApplications.map((app, i) => (
                        <tr
                          key={`${app.make}-${app.model_series}-${app.engine}-${app.engine_code}-${i}`}
                        >
                          <th scope="row">{app.make}</th>
                          <td>{app.model_series || "-"}</td>
                          <td>{app.engine}</td>
                          <td className="font-mono text-xs">
                            {app.engine_code || "-"}
                          </td>
                          <td>
                            {app.kw || "-"} kW / {app.hp || "-"} BG
                          </td>
                          <td className="whitespace-nowrap">{app.years || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredApplications.length > appLimit && (
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => setAppLimit((prev) => prev + 100)}
                      className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-[var(--brand-red)]"
                    >
                      100 Araç Daha Göster (Kalan:{" "}
                      {(filteredApplications.length - appLimit).toLocaleString("tr-TR")}
                      )
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Panel 2: OEM Numaraları */}
            <div
              role="tabpanel"
              aria-labelledby="tab-oem"
              hidden={activeTab !== "oem"}
              tabIndex={activeTab === "oem" ? 0 : undefined}
            >
              <div className="space-y-4 p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <input
                    type="search"
                    aria-label="OEM tablosunda ara"
                    value={oemFilter}
                    onChange={(e) => setOemFilter(e.target.value)}
                    placeholder="OEM numarası veya araç üreticisi ara..."
                    className="min-h-[42px] w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground sm:w-80"
                  />
                  <div className="text-xs font-medium text-muted-foreground">
                    Toplam {filteredOems.length} OEM numarası
                  </div>
                </div>

                <div
                  tabIndex={0}
                  role="region"
                  aria-labelledby={oemCaptionId}
                  className={styles.tableWrapper}
                >
                  <table className={`${styles.dataTable} ${styles.refTable}`}>
                    <caption id={oemCaptionId} className="sr-only">
                      WUNDER {selectedProduct.wunder_code} orijinal OEM numaraları
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">OEM Numarası</th>
                        <th scope="col">Üretici Firma</th>
                        <th scope="col">WUNDER Karşılığı</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOems.map((oem, i) => (
                        <tr key={`${oem.manufacturer}-${oem.oem_number}-${i}`}>
                          <th scope="row">
                            <button
                              type="button"
                              onClick={() =>
                                copyCode(oem.oem_number, `oem-${i}`)
                              }
                              className="inline-flex items-center gap-2 font-mono text-sm font-bold hover:text-[var(--brand-red)]"
                            >
                              {oem.oem_number}
                              {copiedKey === `oem-${i}` ? (
                                <Check className="h-3.5 w-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="h-3 w-3 opacity-40" />
                              )}
                            </button>
                          </th>
                          <td>{oem.manufacturer}</td>
                          <td className="font-bold text-[var(--brand-red)]">
                            WUNDER {selectedProduct.wunder_code}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Panel 3: Rakip Numaraları (WUNDER Pinned at Top) */}
            <div
              role="tabpanel"
              aria-labelledby="tab-rakip"
              hidden={activeTab !== "rakip"}
              tabIndex={activeTab === "rakip" ? 0 : undefined}
            >
              <div className="space-y-4 p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <input
                    type="search"
                    aria-label="Rakip kodlarda ara"
                    value={rivalFilter}
                    onChange={(e) => setRivalFilter(e.target.value)}
                    placeholder="Rakip kodu veya marka ara (MANN, FILTRON, BOSCH...)"
                    className="min-h-[42px] w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground sm:w-96"
                  />
                  <div className="text-xs font-medium text-muted-foreground">
                    Toplam {filteredRivals.length} çapraz referans (WUNDER en üstte sabit)
                  </div>
                </div>

                <div
                  tabIndex={0}
                  role="region"
                  aria-labelledby={rivalCaptionId}
                  className={styles.tableWrapper}
                >
                  <table className={`${styles.dataTable} ${styles.refTable}`}>
                    <caption id={rivalCaptionId} className="sr-only">
                      WUNDER {selectedProduct.wunder_code} rakip marka çapraz referansları
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Ürün Numarası</th>
                        <th scope="col">Marka</th>
                        <th scope="col">WUNDER Karşılığı</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRivals.map((riv, i) => {
                        const isWunder = riv.brand
                          .toUpperCase()
                          .startsWith("WUNDER");
                        return (
                          <tr
                            key={`${riv.brand}-${riv.rival_code}-${i}`}
                            className={isWunder ? styles.wunderRow : undefined}
                          >
                            <th scope="row">
                              <button
                                type="button"
                                onClick={() =>
                                  copyCode(riv.rival_code, `riv-${i}`)
                                }
                                className="inline-flex items-center gap-2 font-mono text-sm font-bold hover:text-[var(--brand-red)]"
                              >
                                {riv.rival_code}
                                {copiedKey === `riv-${i}` ? (
                                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                                ) : (
                                  <Copy className="h-3 w-3 opacity-40" />
                                )}
                              </button>
                            </th>
                            <td>
                              <span className="inline-flex items-center gap-2 font-semibold">
                                {riv.brand}
                                {isWunder && (
                                  <span className="rounded bg-[var(--brand-red)] px-1.5 py-0.5 text-[10px] font-bold text-white">
                                    ANA ÜRÜN
                                  </span>
                                )}
                              </span>
                            </td>
                            <td className="font-bold text-[var(--brand-red)]">
                              WUNDER {selectedProduct.wunder_code}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
