import { NextRequest, NextResponse } from "next/server";
import {
  getVehicleModelsAndMatches,
  getWunderProductBySlug,
  searchByCode,
} from "@/lib/wunder-demo";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action") ?? "product";

  if (action === "search") {
    const q = searchParams.get("q") ?? "";
    const hits = searchByCode(q);
    return NextResponse.json({ query: q, hits });
  }

  if (action === "vehicles") {
    const make = searchParams.get("make") ?? "";
    const model = searchParams.get("model") ?? "";
    const engine = searchParams.get("engine") ?? "";
    if (!make) {
      return NextResponse.json({ models: [], engines: [], products: [] });
    }
    const result = getVehicleModelsAndMatches(
      make,
      model || undefined,
      engine || undefined
    );
    return NextResponse.json(result);
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
