import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Filter } from "lucide-react";
import { BrandLogo } from "@/components/demo/brand-logo";
import { CodeSearchBar } from "@/components/demo/code-search-bar";
import { DemoShellHeader } from "@/components/demo/demo-shell-header";
import {
  getAllBrands,
  getWunderStats,
  getWunderSummaries,
} from "@/lib/wunder-demo";

export default function WunderFiltreHomePage() {
  const brands = getAllBrands();
  const summaries = getWunderSummaries();
  const stats = getWunderStats();

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <DemoShellHeader />

      <main className="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:px-6 sm:py-10">
        {/* Hero Headline + Stats */}
        <section className="space-y-6">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl space-y-2">
              <h1 className="font-jakarta text-3xl font-extrabold leading-tight tracking-tight text-foreground text-balance sm:text-4xl">
                WUNDER Filtre Çapraz Referans ve Araç Kataloğu
              </h1>
              <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                OEM veya rakip filtre kodunu yazın ya da araç markası logosuna tıklayıp
                model ve motor seçerek uyumlu{" "}
                <strong className="text-foreground">WUNDER</strong> filtrelerine ulaşın.
              </p>
            </div>

            <dl className="flex flex-wrap gap-6 border-t border-border pt-4 lg:border-t-0 lg:pt-0">
              <div>
                <dt className="text-xs text-muted-foreground">WUNDER Ürünü</dt>
                <dd className="text-xl font-bold text-brand-red tabular-nums">
                  {stats.total_products}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">OEM Kodu</dt>
                <dd className="text-xl font-bold text-foreground tabular-nums">
                  {stats.total_oem_refs}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Rakip Referans</dt>
                <dd className="text-xl font-bold text-foreground tabular-nums">
                  {stats.total_rival_refs}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Araç Kaydı</dt>
                <dd className="text-xl font-bold text-foreground tabular-nums">
                  {stats.total_applications.toLocaleString("tr-TR")}
                </dd>
              </div>
            </dl>
          </div>

          {/* Code Search Entry Point */}
          <CodeSearchBar />
        </section>

        {/* Step 1: Brand Logos Grid */}
        <section aria-labelledby="brands-heading" className="space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2
              id="brands-heading"
              className="font-jakarta text-xl font-bold tracking-tight text-foreground text-balance sm:text-2xl"
            >
              Araç Markası Seçin
            </h2>
            <span className="text-sm text-muted-foreground tabular-nums">
              {brands.length} marka · Logoya tıklayarak modellere geçin
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/demo/wunder-filtre/arac/${brand.slug}`}
                className="group flex flex-col items-center justify-between gap-3 rounded-xl border border-border bg-card p-5 text-center transition-colors hover:border-brand-red"
              >
                <BrandLogo
                  displayName={brand.displayName}
                  logoPath={brand.logoPath}
                  sizeClass="size-12"
                />
                <div className="space-y-1">
                  <div className="font-jakarta text-sm font-bold text-foreground group-hover:text-brand-red">
                    {brand.displayName}
                  </div>
                  <div className="text-xs text-muted-foreground tabular-nums">
                    {brand.modelCount} seri · {brand.productCount} filtre
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Direct 10 Demo Filters Shelf */}
        <section
          aria-labelledby="products-heading"
          className="space-y-4 border-t border-border pt-8"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2
              id="products-heading"
              className="font-jakarta text-xl font-bold tracking-tight text-foreground text-balance"
            >
              Demodaki 10 WUNDER Ürünü
            </h2>
            <span className="text-sm text-muted-foreground">
              Doğrudan ürün kartı, OEM ve rakip kodlarını inceleyin
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {summaries.map((item) => (
              <Link
                key={item.slug}
                href={`/demo/wunder-filtre/urun/${item.slug}`}
                className="group flex flex-col justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand-red"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground">
                      WUNDER
                    </div>
                    <div className="font-jakarta text-lg font-extrabold text-brand-red">
                      {item.wunder_code}
                    </div>
                  </div>
                  {item.local_image ? (
                    <Image
                      src={item.local_image}
                      alt={`WUNDER ${item.wunder_code}`}
                      width={44}
                      height={44}
                      className="size-11 rounded-lg border border-border bg-white object-contain p-1"
                    />
                  ) : (
                    <div className="flex size-11 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
                      <Filter className="size-5" aria-hidden="true" />
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="line-clamp-1 text-xs font-semibold text-foreground">
                    {item.filter_type}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground tabular-nums">
                    <span>
                      {item.oem_count} OEM · {item.rival_count} Rakip
                    </span>
                    <ChevronRight
                      className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-red"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
