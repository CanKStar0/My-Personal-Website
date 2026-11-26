import { NextRequest, NextResponse } from "next/server";
import {
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
