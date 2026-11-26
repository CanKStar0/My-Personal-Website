import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { BrandLogo } from "@/components/demo/brand-logo";
import { DemoShellHeader } from "@/components/demo/demo-shell-header";
import {
  getBrandBySlug,
  getEnginesForModel,
  getModelNodeBySlug,
} from "@/lib/wunder-demo";

type PageProps = {
  params: Promise<{ make: string; model: string }>;
};

export default async function ModelEnginesPage({ params }: PageProps) {
  const { make, model } = await params;
  const brand = getBrandBySlug(make);
  const modelNode = getModelNodeBySlug(make, model);
  if (!brand || !modelNode) notFound();

  const engines = getEnginesForModel(make, model);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <DemoShellHeader
        backHref={`/demo/wunder-filtre/arac/${brand.slug}`}
        backLabel={`${brand.displayName} Modelleri`}
      />

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
        {/* Breadcrumb Taxonomy */}
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
                {brand.displayName} {modelNode.modelSeries} — Motor Seçin
              </h1>
              <p className="mt-1 text-sm text-muted-foreground tabular-nums">
                {engines.length} motor / yıl seçeneği listeleniyor
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

        {/* Engine Selection List */}
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <ul className="divide-y divide-border">
            {engines.map((eng) => (
              <li key={eng.slug}>
                <Link
                  href={`/demo/wunder-filtre/arac/${brand.slug}/${modelNode.slug}/${eng.slug}`}
                  className="group flex flex-col justify-between gap-3 px-5 py-4 transition-colors hover:bg-muted/60 sm:flex-row sm:items-center"
                >
                  <div className="space-y-1">
                    <div className="font-jakarta text-base font-bold text-foreground group-hover:text-brand-red">
                      {eng.engine}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground tabular-nums">
                      {eng.engineCode && (
                        <span>
                          Motor Kodu:{" "}
                          <strong className="font-mono text-foreground">
                            {eng.engineCode}
                          </strong>
                        </span>
                      )}
                      {(eng.kw || eng.hp) && (
                        <span>
                          Güç: {eng.kw || "-"} kW / {eng.hp || "-"} BG
                        </span>
                      )}
                      {eng.years && <span>Yıl: {eng.years}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-bold text-brand-red tabular-nums">
                      {eng.productCount} WUNDER Filtresi
                    </span>
                    <ChevronRight
                      className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand-red"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
