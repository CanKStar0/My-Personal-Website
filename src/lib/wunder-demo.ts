import fs from "node:fs";
import path from "node:path";

export interface OemNumberRow {
  oem_number: string;
  manufacturer: string;
  motoec_code: string;
}

export interface RivalNumberRow {
  rival_code: string;
  brand: string;
  motoec_code: string;
}

export interface VehicleApplicationRow {
  make: string;
  model_series: string;
  engine: string;
  engine_code: string;
  kw: string;
  hp: string;
  years: string;
  related_motoec_codes: string;
}

export interface RawWunderProduct {
  slug: string;
  motoec_code: string;
  wunder_code: string;
  filter_type: string;
  image_url: string | null;
  local_image: string | null;
  dimensions: Record<string, string>;
  specs: Record<string, string>;
  oem_numbers: OemNumberRow[];
  rival_numbers: RivalNumberRow[];
  applications: VehicleApplicationRow[];
}

export interface WunderProductSummary {
  slug: string;
  wunder_code: string;
  motoec_code: string;
  filter_type: string;
  category: "yag" | "hava" | "kabin" | "yakit";
  local_image: string | null;
  dimensions: Record<string, string>;
  specs: Record<string, string>;
  oem_count: number;
  rival_count: number;
  app_count: number;
  top_makes: string[];
  top_rivals: string[];
}

export interface CodeMatchHit {
  slug: string;
  wunder_code: string;
  filter_type: string;
  local_image: string | null;
  match_source: "WUNDER" | "OEM" | "RAKIP" | "MOTOEC";
  matched_brand: string;
  matched_code: string;
  oem_count: number;
  rival_count: number;
  app_count: number;
}

export interface WunderDemoStats {
  total_products: number;
  total_oem_refs: number;
  total_rival_refs: number;
  total_applications: number;
  unique_makes: number;
}

let cachedProducts: RawWunderProduct[] | null = null;

export function normalizeCodeStrict(value: string): string {
  return (value || "").toUpperCase().replace(/[\s\-_.]+/g, "");
}

export function normalizeCodeLoose(value: string): string {
  return (value || "").toUpperCase().replace(/[\s\-_./]+/g, "");
}

function classifyFilterType(filterType: string): "yag" | "hava" | "kabin" | "yakit" {
  const lower = (filterType || "").toLocaleLowerCase("tr-TR");
  if (lower.includes("hava")) return "hava";
  if (lower.includes("kabin") || lower.includes("polen")) return "kabin";
  if (lower.includes("yakıt") || lower.includes("yakit")) return "yakit";
  return "yag";
}

export function loadWunderProducts(): RawWunderProduct[] {
  if (cachedProducts) return cachedProducts;
  const jsonPath = path.join(process.cwd(), "src", "data", "wunder-demo.json");
  const raw = fs.readFileSync(jsonPath, "utf-8");
  cachedProducts = JSON.parse(raw) as RawWunderProduct[];
  return cachedProducts;
}

export function getWunderStats(): WunderDemoStats {
  const products = loadWunderProducts();
  const makes = new Set<string>();
  let totalOem = 0;
  let totalRival = 0;
  let totalApps = 0;

  for (const p of products) {
    totalOem += p.oem_numbers.length;
    totalRival += p.rival_numbers.length;
    totalApps += p.applications.length;
    for (const app of p.applications) {
      if (app.make) makes.add(app.make);
    }
  }

  return {
    total_products: products.length,
    total_oem_refs: totalOem,
    total_rival_refs: totalRival,
    total_applications: totalApps,
    unique_makes: makes.size,
  };
}

export function getWunderSummaries(): WunderProductSummary[] {
  return loadWunderProducts().map((p) => {
    const makeCounts = new Map<string, number>();
    for (const app of p.applications) {
      makeCounts.set(app.make, (makeCounts.get(app.make) ?? 0) + 1);
    }
    const topMakes = [...makeCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([m]) => m);

    const priorityBrands = ["MANN-FILTER", "FILTRON", "MAHLE", "BOSCH", "UFI", "SAMPİYON", "ŞAMPİYON"];
    const topRivals: string[] = [];
    for (const pb of priorityBrands) {
      const hit = p.rival_numbers.find((r) => r.brand.toUpperCase().includes(pb));
      if (hit && topRivals.length < 4) {
        topRivals.push(`${hit.brand}: ${hit.rival_code}`);
      }
    }

    return {
      slug: p.slug,
      wunder_code: p.wunder_code,
      motoec_code: p.motoec_code,
      filter_type: p.filter_type,
      category: classifyFilterType(p.filter_type),
      local_image: p.local_image,
      dimensions: p.dimensions,
      specs: p.specs,
      oem_count: p.oem_numbers.length,
      rival_count: p.rival_numbers.length,
      app_count: p.applications.length,
      top_makes: topMakes,
      top_rivals: topRivals,
    };
  });
}

export function getWunderProductBySlug(slug: string): RawWunderProduct | null {
  const products = loadWunderProducts();
  const found = products.find((p) => p.slug === slug);
  if (!found) return null;

  // Sort rivals so WUNDER is always at the very top
  const sortedRivals = [...found.rival_numbers].sort((a, b) => {
    const aWunder = a.brand.toUpperCase().startsWith("WUNDER") ? 0 : 1;
    const bWunder = b.brand.toUpperCase().startsWith("WUNDER") ? 0 : 1;
    if (aWunder !== bWunder) return aWunder - bWunder;
    return a.brand.localeCompare(b.brand, "tr");
  });

  return {
    ...found,
    rival_numbers: sortedRivals,
  };
}

export function searchByCode(query: string): CodeMatchHit[] {
  const qStrict = normalizeCodeStrict(query);
  const qLoose = normalizeCodeLoose(query);
  if (qLoose.length < 2) return [];

  const products = loadWunderProducts();
  const hits: CodeMatchHit[] = [];

  for (const p of products) {
    let bestHit: CodeMatchHit | null = null;

    // 1. Direct WUNDER match
    if (normalizeCodeLoose(p.wunder_code).includes(qLoose)) {
      bestHit = {
        slug: p.slug,
        wunder_code: p.wunder_code,
        filter_type: p.filter_type,
        local_image: p.local_image,
        match_source: "WUNDER",
        matched_brand: "WUNDER",
        matched_code: p.wunder_code,
        oem_count: p.oem_numbers.length,
        rival_count: p.rival_numbers.length,
        app_count: p.applications.length,
      };
    }

    // 2. Rival match (check WUNDER vs competitors)
    if (!bestHit) {
      const rivalHit =
        p.rival_numbers.find((r) => normalizeCodeStrict(r.rival_code) === qStrict) ??
        p.rival_numbers.find((r) => normalizeCodeLoose(r.rival_code).includes(qLoose));
      if (rivalHit) {
        bestHit = {
          slug: p.slug,
          wunder_code: p.wunder_code,
          filter_type: p.filter_type,
          local_image: p.local_image,
          match_source: rivalHit.brand.toUpperCase().startsWith("WUNDER") ? "WUNDER" : "RAKIP",
          matched_brand: rivalHit.brand,
          matched_code: rivalHit.rival_code,
          oem_count: p.oem_numbers.length,
          rival_count: p.rival_numbers.length,
          app_count: p.applications.length,
        };
      }
    }

    // 3. OEM match
    if (!bestHit) {
      const oemHit =
        p.oem_numbers.find((o) => normalizeCodeStrict(o.oem_number) === qStrict) ??
        p.oem_numbers.find((o) => normalizeCodeLoose(o.oem_number).includes(qLoose));
      if (oemHit) {
        bestHit = {
          slug: p.slug,
          wunder_code: p.wunder_code,
          filter_type: p.filter_type,
          local_image: p.local_image,
          match_source: "OEM",
          matched_brand: oemHit.manufacturer,
          matched_code: oemHit.oem_number,
          oem_count: p.oem_numbers.length,
          rival_count: p.rival_numbers.length,
          app_count: p.applications.length,
        };
      }
    }

    // 4. MotoEC reference match
    if (!bestHit && normalizeCodeLoose(p.motoec_code).includes(qLoose)) {
      bestHit = {
        slug: p.slug,
        wunder_code: p.wunder_code,
        filter_type: p.filter_type,
        local_image: p.local_image,
        match_source: "MOTOEC",
        matched_brand: "MOTOEC",
        matched_code: p.motoec_code,
        oem_count: p.oem_numbers.length,
        rival_count: p.rival_numbers.length,
        app_count: p.applications.length,
      };
    }

    if (bestHit) {
      hits.push(bestHit);
    }
  }

  // Prefer exact code matches first, then WUNDER, then OEM, then RAKIP
  return hits.sort((a, b) => {
    const aExact = normalizeCodeLoose(a.matched_code) === qLoose ? 0 : 1;
    const bExact = normalizeCodeLoose(b.matched_code) === qLoose ? 0 : 1;
    if (aExact !== bExact) return aExact - bExact;
    return a.wunder_code.localeCompare(b.wunder_code, "tr");
  });
}

export function getVehicleMakes(): { make: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of loadWunderProducts()) {
    for (const app of p.applications) {
      if (app.make) counts.set(app.make, (counts.get(app.make) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([make, count]) => ({ make, count }))
    .sort((a, b) => a.make.localeCompare(b.make, "tr"));
}

export function getVehicleModelsAndMatches(make: string, modelSeries?: string, engine?: string) {
  const products = loadWunderProducts();
  const modelsSet = new Set<string>();
  const enginesSet = new Set<string>();
  const matchingProducts: {
    slug: string;
    wunder_code: string;
    filter_type: string;
    local_image: string | null;
    matched_apps: VehicleApplicationRow[];
  }[] = [];

  for (const p of products) {
    const matchedApps: VehicleApplicationRow[] = [];
    for (const app of p.applications) {
      if (app.make !== make) continue;
      if (app.model_series) modelsSet.add(app.model_series);
      if (modelSeries && app.model_series !== modelSeries) continue;

      const engineLabel = `${app.engine}${app.engine_code ? ` (${app.engine_code})` : ""}${app.years ? ` · ${app.years}` : ""}`;
      if (modelSeries) enginesSet.add(engineLabel);

      if (engine && engineLabel !== engine) continue;
      matchedApps.push(app);
    }

    if (matchedApps.length > 0) {
      matchingProducts.push({
        slug: p.slug,
        wunder_code: p.wunder_code,
        filter_type: p.filter_type,
        local_image: p.local_image,
        matched_apps: matchedApps.slice(0, 20),
      });
    }
  }

  return {
    models: [...modelsSet].sort((a, b) => a.localeCompare(b, "tr")),
    engines: [...enginesSet].sort((a, b) => a.localeCompare(b, "tr")),
    products: matchingProducts,
  };
}
