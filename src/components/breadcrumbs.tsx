import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

export type BreadcrumbItem = { label: string; href: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: new URL(item.href, SITE_URL).toString(),
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Sayfa yolu" className="mb-10 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === items.length - 1 ? (
                <span aria-current="page" className="text-foreground">{item.label}</span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-foreground">{item.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

