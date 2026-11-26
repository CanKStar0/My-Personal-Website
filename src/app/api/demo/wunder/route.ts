import { NextRequest, NextResponse } from "next/server";
import { getWunderProductBySlug, searchByCode } from "@/lib/wunder-demo";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action") ?? "search";

  if (action === "search") {
    const q = searchParams.get("q") ?? "";
    const hits = searchByCode(q);
    return NextResponse.json({ query: q, hits });
  }

  if (action === "product") {
    const slug = searchParams.get("slug") ?? "wy-500";
    const product = getWunderProductBySlug(slug);
    if (!product) {
      return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    }
    return NextResponse.json({ product });
  }

  return NextResponse.json({ error: "Geçersiz işlem" }, { status: 400 });
}
