"use client";

import React, { useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Check, Copy, Filter } from "lucide-react";
import type { RawWunderProduct } from "@/lib/wunder-demo";
import styles from "./wunder-catalog.module.css";

interface Props {
  product: RawWunderProduct;
  matchedFrom?: string;
  matchedCode?: string;
  defaultTab?: "uygulama" | "oem" | "rakip";
}

type ActiveTab = "uygulama" | "oem" | "rakip";

function norm(s: string): string {
  return (s || "").toUpperCase().replace(/[\s\-_./]+/g, "");
}

export function WunderProductDetailClient({
  product,
  matchedFrom,
  matchedCode,
  defaultTab = "uygulama",
}: Props) {
  const [activeTab, setActiveTab] = useState<ActiveTab>(defaultTab);
  const tabRefs = useRef<Record<ActiveTab, HTMLButtonElement | null>>({
    uygulama: null,
    oem: null,
    rakip: null,
  });

  const [appMakeFilter, setAppMakeFilter] = useState("ALL");
  const [appTextFilter, setAppTextFilter] = useState("");
  const [appLimit, setAppLimit] = useState(50);
  const [oemFilter, setOemFilter] = useState("");
  const [rivalFilter, setRivalFilter] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const appsCaptionId = useId();
  const oemCaptionId = useId();
  const rivalCaptionId = useId();

  async function copyCode(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1600);
    } catch {
      // Ignore clipboard failure
    }
  }

  const productMakes = useMemo(() => {
    const counts = new Map<string, number>();
    for (const app of product.applications) {
      counts.set(app.make, (counts.get(app.make) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0], "tr"));
  }, [product]);

  const filteredApplications = useMemo(() => {
    const q = appTextFilter.trim().toLocaleLowerCase("tr-TR");
    return product.applications.filter((app) => {
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
  }, [product, appMakeFilter, appTextFilter]);

  const visibleApplications = useMemo(
    () => filteredApplications.slice(0, appLimit),
    [filteredApplications, appLimit]
  );

  const filteredOems = useMemo(() => {
    const q = norm(oemFilter);
    const qText = oemFilter.trim().toLocaleLowerCase("tr-TR");
    if (!q && !qText) return product.oem_numbers;
    return product.oem_numbers.filter(
      (o) =>
        norm(o.oem_number).includes(q) ||
        o.manufacturer.toLocaleLowerCase("tr-TR").includes(qText)
    );
  }, [product, oemFilter]);

  const filteredRivals = useMemo(() => {
    const q = norm(rivalFilter);
    const qText = rivalFilter.trim().toLocaleLowerCase("tr-TR");
    if (!q && !qText) return product.rival_numbers;
    return product.rival_numbers.filter(
      (r) =>
        r.brand.toUpperCase().startsWith("WUNDER") ||
        norm(r.rival_code).includes(q) ||
        r.brand.toLocaleLowerCase("tr-TR").includes(qText)
    );
  }, [product, rivalFilter]);

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

  const dimEntries = Object.entries(product.dimensions || {});
  const specEntries = Object.entries(product.specs || {});
  const specLabels: Record<string, string> = {
    bypass_valve: "ByPass Valf",
    anti_drain_valve: "Boşalmayı Önleyici Valf",
    anti_siphon_valve: "Anti Sifon Valf",
    notes: "Açıklamalar",
  };

  return (
    <div className="space-y-8">
      {/* Match notice if user came from Rival / OEM lookup */}
      {matchedFrom && matchedCode && (
        <div
          role="status"
          className="rounded-xl border border-brand-red/30 bg-brand-red/10 px-5 py-3.5 text-sm text-foreground"
        >
          Aradığınız{" "}
          <strong>
            {matchedFrom} ({matchedCode})
          </strong>{" "}
          kodunun WUNDER karşılığı:{" "}
          <strong className="text-brand-red">WUNDER {product.wunder_code}</strong>
        </div>
      )}

      {/* Primary Hero Section: WUNDER at the top */}
      <section className="grid gap-6 rounded-xl border border-border bg-card p-5 sm:p-7 lg:grid-cols-12">
        <div className="flex items-center justify-center rounded-lg border border-border bg-white p-4 lg:col-span-3">
          {product.local_image ? (
            <Image
              src={product.local_image}
              alt={`WUNDER ${product.wunder_code} - ${product.filter_type}`}
              width={180}
              height={180}
              className="max-h-44 w-auto object-contain"
            />
          ) : (
            <div className="flex h-40 flex-col items-center justify-center gap-2 text-muted-foreground">
              <Filter className="size-10" aria-hidden="true" />
              <span className="text-xs font-medium">Görsel Hazırlanıyor</span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-6 lg:col-span-9">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="rounded-md bg-brand-red px-2.5 py-1 text-white">
                  ANA ÜRÜN · WUNDER
                </span>
                <span className="rounded-md border border-border bg-muted px-2.5 py-1 text-foreground">
                  {product.filter_type}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-jakarta text-3xl font-extrabold leading-tight tracking-tight text-foreground text-balance sm:text-4xl">
                  WUNDER{" "}
                  <span className="text-brand-red">{product.wunder_code}</span>
                </h1>
                <button
                  type="button"
                  onClick={() =>
                    copyCode(`WUNDER ${product.wunder_code}`, "hero-wunder")
                  }
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-brand-red"
                >
                  {copiedKey === "hero-wunder" ? (
                    <>
                      <Check className="size-3.5" aria-hidden="true" />
                      <span>Kopyalandı</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" aria-hidden="true" />
                      <span>Kodu Kopyala</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <dl className="flex flex-wrap gap-6 text-left">
              <div>
                <dt className="text-xs text-muted-foreground">Uyumlu Araç</dt>
                <dd className="text-xl font-bold text-foreground tabular-nums">
                  {product.applications.length.toLocaleString("tr-TR")}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">OEM Kodu</dt>
                <dd className="text-xl font-bold text-foreground tabular-nums">
                  {product.oem_numbers.length}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Rakip Kodu</dt>
                <dd className="text-xl font-bold text-foreground tabular-nums">
                  {product.rival_numbers.length}
                </dd>
              </div>
            </dl>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Teknik Ölçüler (mm)
              </h2>
              {dimEntries.length > 0 ? (
                <dl className="grid grid-cols-4 gap-3 sm:grid-cols-5">
                  {dimEntries.map(([k, v]) => (
                    <div
                      key={k}
                      className="border-b border-border pb-1.5 text-left"
                    >
                      <dt className="text-xs text-muted-foreground">{k}</dt>
                      <dd className="text-sm font-bold text-foreground tabular-nums">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Ölçü bilgisi bulunmuyor.
                </p>
              )}
            </div>

            <div>
              <h2 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Teknik Özellikler
              </h2>
              {specEntries.length > 0 ? (
                <dl className="space-y-1.5 text-sm">
                  {specEntries.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3">
                      <dt className="text-muted-foreground">
                        {specLabels[k] ?? k}
                      </dt>
                      <dd className="font-semibold text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Standart OEM uyumlu spesifikasyon.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Accessible Tabbed Section */}
      <section className="rounded-xl border border-border bg-card">
        <div
          role="tablist"
          aria-label="Filtre çapraz referans ve araç sekmeleri"
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
            className={`${styles.tabButton} tabular-nums`}
          >
            Uygulama ({product.applications.length.toLocaleString("tr-TR")})
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
            className={`${styles.tabButton} tabular-nums`}
          >
            OEM Numaraları ({product.oem_numbers.length})
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
            className={`${styles.tabButton} tabular-nums`}
          >
            Rakip Numaraları ({product.rival_numbers.length})
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
                  className="min-h-11 rounded-lg border border-input bg-background px-3 text-sm font-medium text-foreground"
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
                  className="min-h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground sm:w-64"
                />
              </div>
              <div className="text-xs font-medium text-muted-foreground tabular-nums">
                Gösterilen: {visibleApplications.length} /{" "}
                {filteredApplications.length.toLocaleString("tr-TR")}
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
                  WUNDER {product.wunder_code} uyumlu araç listesi
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
                      <td className="tabular-nums">
                        {app.kw || "-"} kW / {app.hp || "-"} BG
                      </td>
                      <td className="whitespace-nowrap tabular-nums">
                        {app.years || "-"}
                      </td>
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
                  className="min-h-11 rounded-lg border border-border bg-background px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-red tabular-nums"
                >
                  100 Araç Daha Göster (Kalan:{" "}
                  {(filteredApplications.length - appLimit).toLocaleString("tr-TR")})
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
                placeholder="OEM numarası veya üretici ara..."
                className="min-h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground sm:w-80"
              />
              <div className="text-xs font-medium text-muted-foreground tabular-nums">
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
                  WUNDER {product.wunder_code} orijinal OEM numaraları
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
                          onClick={() => copyCode(oem.oem_number, `oem-${i}`)}
                          className="inline-flex min-h-8 items-center gap-2 font-mono text-sm font-bold hover:text-brand-red"
                        >
                          <span>{oem.oem_number}</span>
                          {copiedKey === `oem-${i}` ? (
                            <Check className="size-3.5" aria-hidden="true" />
                          ) : (
                            <Copy className="size-3 opacity-50" aria-hidden="true" />
                          )}
                        </button>
                      </th>
                      <td>{oem.manufacturer}</td>
                      <td className="font-bold text-brand-red">
                        WUNDER {product.wunder_code}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Panel 3: Rakip Numaraları (WUNDER Pinned First) */}
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
                className="min-h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground sm:w-96"
              />
              <div className="text-xs font-medium text-muted-foreground tabular-nums">
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
                  WUNDER {product.wunder_code} rakip marka çapraz referansları
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
                    const isWunder = riv.brand.toUpperCase().startsWith("WUNDER");
                    return (
                      <tr
                        key={`${riv.brand}-${riv.rival_code}-${i}`}
                        className={isWunder ? styles.wunderRow : undefined}
                      >
                        <th scope="row">
                          <button
                            type="button"
                            onClick={() => copyCode(riv.rival_code, `riv-${i}`)}
                            className="inline-flex min-h-8 items-center gap-2 font-mono text-sm font-bold hover:text-brand-red"
                          >
                            <span>{riv.rival_code}</span>
                            {copiedKey === `riv-${i}` ? (
                              <Check className="size-3.5" aria-hidden="true" />
                            ) : (
                              <Copy className="size-3 opacity-50" aria-hidden="true" />
                            )}
                          </button>
                        </th>
                        <td>
                          <span className="inline-flex items-center gap-2 font-semibold">
                            <span>{riv.brand}</span>
                            {isWunder && (
                              <span className="rounded bg-brand-red px-2 py-0.5 text-xs font-bold text-white">
                                ANA ÜRÜN
                              </span>
                            )}
                          </span>
                        </td>
                        <td className="font-bold text-brand-red">
                          WUNDER {product.wunder_code}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
