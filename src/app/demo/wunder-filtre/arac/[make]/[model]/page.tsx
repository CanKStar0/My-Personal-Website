import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { BrandLogo } from "@/components/demo/brand-logo";
import { DemoShellHeader } from "@/components/demo/demo-shell-header";
import { ModelFiltersClient } from "@/components/demo/model-filters-client";
import {
  getBrandBySlug,
  getEnginesForModel,
  getModelNodeBySlug,
  getProductsForModel,
} from "@/lib/wunder-demo";

type PageProps = {
  params: Promise<{ make: string; model: string }>;
};

export default async function ModelFiltersPage({ params }: PageProps) {
  const { make, model } = await params;
  const brand = getBrandBySlug(make);
  const modelNode = getModelNodeBySlug(make, model);
  if (!brand || !modelNode) notFound();

  const engines = getEnginesForModel(make, model);
  const matches = getProductsForModel(make, model);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <DemoShellHeader
        backHref={`/demo/wunder-filtre/arac/${brand.slug}`}
        backLabel={`${brand.displayName} Modelleri`}
      />

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
        {/* Breadcrumb Taxonomy */}
        <nav
          aria-label="Araç seçim adımları"
          className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
        >
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
          <span className="font-semibold text-foreground">
            {modelNode.modelSeries}
          </span>
        </nav>

        {/* Header */}
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
                {brand.displayName} {modelNode.modelSeries} — WUNDER Filtreleri
              </h1>
              <p className="mt-1 text-sm text-muted-foreground tabular-nums">
                {matches.length} WUNDER filtresi · {engines.length} motor / yıl seçeneği
              </p>
            </div>
          </div>

          <Link
            href={`/demo/wunder-filtre/arac/${brand.slug}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-brand-red"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Model Değiştir
          </Link>
        </header>

        <ModelFiltersClient engines={engines} matches={matches} />
      </main>
    </div>
  );
}
