import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { DemoShellHeader } from "@/components/demo/demo-shell-header";
import { WunderProductDetailClient } from "@/components/demo/wunder-product-detail-client";
import { getWunderProductBySlug } from "@/lib/wunder-demo";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string; code?: string }>;
};

export default async function WunderProductDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { from, code } = await searchParams;
  const product = getWunderProductBySlug(slug);
  if (!product) notFound();

  const defaultTab = from
    ? from.toUpperCase() === "WUNDER"
      ? "uygulama"
      : "rakip"
    : "uygulama";

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <DemoShellHeader
        backHref="/demo/wunder-filtre"
        backLabel="Markalara Dön"
      />

      <main className="mx-auto max-w-6xl space-y-5 px-4 py-6 pb-24 sm:space-y-6 sm:px-6 sm:py-8 md:pb-10">
        <nav aria-label="Sayfa konumu" className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/demo/wunder-filtre" className="hover:text-foreground">
            Katalog
          </Link>
          <ChevronRight className="size-4" aria-hidden="true" />
          <span className="font-semibold text-foreground">
            WUNDER {product.wunder_code}
          </span>
        </nav>

        <WunderProductDetailClient
          product={product}
          matchedFrom={from}
          matchedCode={code}
          defaultTab={defaultTab}
        />
      </main>
    </div>
  );
}
