import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight, Filter } from "lucide-react";
import { BrandLogo } from "@/components/demo/brand-logo";
import { DemoShellHeader } from "@/components/demo/demo-shell-header";
import {
  getBrandBySlug,
  getEngineNodeBySlug,
  getModelNodeBySlug,
  getProductsForEngine,
} from "@/lib/wunder-demo";

type PageProps = {
  params: Promise<{ make: string; model: string; engine: string }>;
};

export default async function VehicleFiltersResultPage({ params }: PageProps) {
  const { make, model, engine } = await params;
  const brand = getBrandBySlug(make);
  const modelNode = getModelNodeBySlug(make, model);
  const engineNode = getEngineNodeBySlug(make, model, engine);
  if (!brand || !modelNode || !engineNode) notFound();

  const matchingFilters = getProductsForEngine(engineNode);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <DemoShellHeader
        backHref={`/demo/wunder-filtre/arac/${brand.slug}/${modelNode.slug}`}
        backLabel={`${modelNode.modelSeries} Motorları`}
      />

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
        {/* Breadcrumb */}
        <nav aria-label="Araç seçim adımları" className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/demo/wunder-filtre" className="hover:text-foreground">
            Markalar
          </Link>
          <ChevronRight className="size-4" aria-hidden="true" />
          <Link
            href={`/demo/wunder-filtre/arac/${brand.slug}`}
            className="hover:text-foreground"
          >
            {brand.displayName}
          </Link>
          <ChevronRight className="size-4" aria-hidden="true" />
          <Link
            href={`/demo/wunder-filtre/arac/${brand.slug}/${modelNode.slug}`}
            className="hover:text-foreground"
          >
            {modelNode.modelSeries}
          </Link>
          <ChevronRight className="size-4" aria-hidden="true" />
          <span className="font-semibold text-foreground">
            {engineNode.engine}
          </span>
        </nav>

        {/* Vehicle Summary Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-xl border border-border bg-card p-3">
              <BrandLogo
                displayName={brand.displayName}
                logoPath={brand.logoPath}
                sizeClass="size-10"
              />
            </div>
            <div>
              <h1 className="font-jakarta text-2xl font-extrabold leading-tight tracking-tight text-foreground text-balance sm:text-3xl">
                {brand.displayName} {modelNode.modelSeries} — {engineNode.engine}
              </h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground tabular-nums">
                {engineNode.engineCode && (
                  <span>
                    Motor Kodu:{" "}
                    <strong className="font-mono text-foreground">
                      {engineNode.engineCode}
                    </strong>
                  </span>
                )}
                {(engineNode.kw || engineNode.hp) && (
                  <span>
                    {engineNode.kw || "-"} kW / {engineNode.hp || "-"} BG
                  </span>
                )}
                {engineNode.years && <span>Üretim Yılı: {engineNode.years}</span>}
              </div>
            </div>
          </div>

          <Link
            href={`/demo/wunder-filtre/arac/${brand.slug}/${modelNode.slug}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-brand-red"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Motor Değiştir
          </Link>
        </header>

        {/* Recommended WUNDER Filters for This Vehicle */}
        <section aria-labelledby="matched-filters-heading" className="space-y-4">
          <h2
            id="matched-filters-heading"
            className="font-jakarta text-xl font-bold text-foreground text-balance"
          >
            Bu Araç İçin Uygun WUNDER Filtreleri ({matchingFilters.length})
          </h2>

          <div className="space-y-5">
            {matchingFilters.map(({ summary, topOems, topRivals }) => {
              const dimList = Object.entries(summary.dimensions || {});
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

                  {/* WUNDER Prominent Details + OEM + Rivals Preview */}
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
                        <h3 className="font-jakarta text-2xl font-extrabold text-foreground sm:text-3xl">
                          WUNDER{" "}
                          <span className="text-brand-red">
                            {summary.wunder_code}
                          </span>
                        </h3>
                      </div>

                      <Link
                        href={`/demo/wunder-filtre/urun/${summary.slug}`}
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-red px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      >
                        <span>Tüm OEM ve Rakip Listesi</span>
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                      {/* OEM Preview */}
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

                      {/* Rival Preview */}
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

                      {/* Dimensions */}
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
        </section>
      </main>
    </div>
  );
}
