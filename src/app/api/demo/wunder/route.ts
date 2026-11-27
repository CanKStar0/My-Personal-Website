import { NextRequest, NextResponse } from "next/server";
import {
  getB2BCategoryProducts,
  getB2BProductDetail,
  queryB2BVehicleCascade,
  searchB2BProductsByCode,
} from "@/lib/wunder-demo";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action") ?? "search";

  if (action === "search") {
    const q = searchParams.get("q") ?? "";
    const products = searchB2BProductsByCode(q);
    return NextResponse.json({ query: q, products });
  }

  if (action === "catalog") {
    const category = searchParams.get("category") ?? "all";
    const page = Math.max(1, Number(searchParams.get("page") ?? 1) || 1);
    const limit = Math.min(Number(searchParams.get("limit") ?? 48) || 48, 96);
    return NextResponse.json(getB2BCategoryProducts(category, page, limit));
  }

  if (action === "detail") {
    const slug = searchParams.get("slug") ?? "";
    const detail = getB2BProductDetail(slug);
    if (!detail) {
      return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    }
    return NextResponse.json(detail);
  }

  if (action === "vehicle-filters") {
    const make = searchParams.get("make") ?? "";
    const model = searchParams.get("model") ?? "";
    const year = searchParams.get("year") ?? "";
    const engine = searchParams.get("engine") ?? "";
    if (!make) {
      return NextResponse.json({
        models: [],
        years: [],
        engines: [],
        products: [],
      });
    }
    const result = queryB2BVehicleCascade(
      make,
      model || undefined,
      year || undefined,
      engine || undefined
    );
    return NextResponse.json(result);
  }

  return NextResponse.json({ error: "Geçersiz işlem" }, { status: 400 });
}
