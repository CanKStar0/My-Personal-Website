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

export interface BrandNode {
  make: string;
  displayName: string;
  slug: string;
  logoPath: string | null;
  modelCount: number;
  engineCount: number;
  productCount: number;
}

export interface ModelSeriesNode {
  modelSeries: string;
  slug: string;
  engineCount: number;
  productCount: number;
  yearHints: string;
}

export interface EngineNode {
  slug: string;
  engine: string;
  engineCode: string;
  kw: string;
  hp: string;
  years: string;
  productCount: number;
  productSlugs: string[];
}

export interface WunderDemoStats {
  total_products: number;
  total_oem_refs: number;
  total_rival_refs: number;
  total_applications: number;
  unique_makes: number;
}

const BRAND_LOGO_MAP: Record<string, { display: string; logo: string | null }> = {
  AUDI: { display: "Audi", logo: "/images/brands/audi.svg" },
  "ALFA ROMEO": { display: "Alfa Romeo", logo: "/images/brands/alfaromeo.svg" },
  CHRYSLER: { display: "Chrysler", logo: "/images/brands/chrysler.svg" },
  DACIA: { display: "Dacia", logo: "/images/brands/dacia.svg" },
  FIAT: { display: "Fiat", logo: "/images/brands/fiat.svg" },
  JEEP: { display: "Jeep", logo: "/images/brands/jeep.svg" },
  LANCIA: { display: "Lancia", logo: "/images/brands/lancia.png" },
  "MERCEDES-BENZ": { display: "Mercedes-Benz", logo: "/images/brands/mercedes.svg" },
  MITSUBISHI: { display: "Mitsubishi", logo: "/images/brands/mitsubishi.svg" },
  NISSAN: { display: "Nissan", logo: "/images/brands/nissan.svg" },
  OPEL: { display: "Opel", logo: "/images/brands/opel.svg" },
  RENAULT: { display: "Renault", logo: "/images/brands/renault.svg" },
  ROVER: { display: "Rover", logo: "/images/brands/landrover.svg" },
  SEAT: { display: "SEAT", logo: "/images/brands/seat.svg" },
  SKODA: { display: "Škoda", logo: "/images/brands/skoda.svg" },
  "SMART (DAIMLER AG)": { display: "Smart", logo: "/images/brands/smart.svg" },
  SUZUKI: { display: "Suzuki", logo: "/images/brands/suzuki.svg" },
  "VW(VOLKSWAGEN)": { display: "Volkswagen", logo: "/images/brands/volkswagen.svg" },
};

let cachedProducts: RawWunderProduct[] | null = null;

interface VehicleTree {
  brands: BrandNode[];
  brandBySlug: Map<string, BrandNode>;
  modelsByBrandSlug: Map<string, ModelSeriesNode[]>;
  enginesByBrandModelSlug: Map<string, EngineNode[]>;
}

let cachedTree: VehicleTree | null = null;

export function slugifySegment(text: string): string {
  const trMap: Record<string, string> = {
    ç: "c",
    ğ: "g",
    ı: "i",
    ö: "o",
    ş: "s",
    ü: "u",
    Ç: "c",
    Ğ: "g",
    İ: "i",
    Ö: "o",
    Ş: "s",
    Ü: "u",
  };
  const replaced = (text || "")
    .split("")
    .map((ch) => trMap[ch] ?? ch)
    .join("");
  return (
    replaced
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "standart"
  );
}

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

function buildVehicleTree(): VehicleTree {
  if (cachedTree) return cachedTree;

  const products = loadWunderProducts();
  type TempEngine = {
    engine: string;
    engineCode: string;
    kw: string;
    hp: string;
    years: string;
    productSlugs: Set<string>;
  };
  type TempModel = {
    modelSeries: string;
    engines: Map<string, TempEngine>;
    productSlugs: Set<string>;
    yearsList: Set<string>;
  };
  type TempBrand = {
    make: string;
    models: Map<string, TempModel>;
    productSlugs: Set<string>;
  };

  const brandMap = new Map<string, TempBrand>();

  for (const p of products) {
    for (const app of p.applications) {
      const make = (app.make || "").trim();
      const modelSeries = (app.model_series || "Genel Seri").trim();
      if (!make) continue;

      let bNode = brandMap.get(make);
      if (!bNode) {
        bNode = { make, models: new Map(), productSlugs: new Set() };
        brandMap.set(make, bNode);
      }
      bNode.productSlugs.add(p.slug);

      let mNode = bNode.models.get(modelSeries);
      if (!mNode) {
        mNode = {
          modelSeries,
          engines: new Map(),
          productSlugs: new Set(),
          yearsList: new Set(),
        };
        bNode.models.set(modelSeries, mNode);
      }
      mNode.productSlugs.add(p.slug);
      if (app.years) mNode.yearsList.add(app.years);

      const engKey = `${app.engine}|${app.engine_code}|${app.kw}|${app.hp}|${app.years}`;
      let eNode = mNode.engines.get(engKey);
      if (!eNode) {
        eNode = {
          engine: app.engine,
          engineCode: app.engine_code,
          kw: app.kw,
          hp: app.hp,
          years: app.years,
          productSlugs: new Set(),
        };
        mNode.engines.set(engKey, eNode);
      }
      eNode.productSlugs.add(p.slug);
    }
  }

  const brands: BrandNode[] = [];
  const brandBySlug = new Map<string, BrandNode>();
  const modelsByBrandSlug = new Map<string, ModelSeriesNode[]>();
  const enginesByBrandModelSlug = new Map<string, EngineNode[]>();

  const usedBrandSlugs = new Set<string>();
  for (const b of [...brandMap.values()].sort((a, c) =>
    (BRAND_LOGO_MAP[a.make]?.display ?? a.make).localeCompare(
      BRAND_LOGO_MAP[c.make]?.display ?? c.make,
      "tr"
    )
  )) {
    const meta = BRAND_LOGO_MAP[b.make];
    const displayName = meta?.display ?? b.make;
    let bSlug = slugifySegment(displayName);
    if (usedBrandSlugs.has(bSlug)) bSlug = `${bSlug}-${usedBrandSlugs.size}`;
    usedBrandSlugs.add(bSlug);

    let totalEngines = 0;
    const modelNodes: ModelSeriesNode[] = [];
    const usedModelSlugs = new Set<string>();

    for (const m of [...b.models.values()].sort((a, c) =>
      a.modelSeries.localeCompare(c.modelSeries, "tr")
    )) {
      let mSlug = slugifySegment(m.modelSeries);
      if (usedModelSlugs.has(mSlug)) {
        mSlug = `${mSlug}-${usedModelSlugs.size}`;
      }
      usedModelSlugs.add(mSlug);

      const engineNodes: EngineNode[] = [];
      const usedEngineSlugs = new Set<string>();
      for (const e of [...m.engines.values()].sort((a, c) =>
        a.engine.localeCompare(c.engine, "tr")
      )) {
        let eSlug = slugifySegment(`${e.engine}-${e.engineCode}-${e.kw}-${e.years}`);
        if (usedEngineSlugs.has(eSlug)) {
          eSlug = `${eSlug}-${usedEngineSlugs.size}`;
        }
        usedEngineSlugs.add(eSlug);
        engineNodes.push({
          slug: eSlug,
          engine: e.engine,
          engineCode: e.engineCode,
          kw: e.kw,
          hp: e.hp,
          years: e.years,
          productCount: e.productSlugs.size,
          productSlugs: [...e.productSlugs],
        });
      }

      totalEngines += engineNodes.length;
      enginesByBrandModelSlug.set(`${bSlug}::${mSlug}`, engineNodes);

      const yearsArr = [...m.yearsList].slice(0, 2);
      modelNodes.push({
        modelSeries: m.modelSeries,
        slug: mSlug,
        engineCount: engineNodes.length,
        productCount: m.productSlugs.size,
        yearHints: yearsArr.join(", "),
      });
    }

    const brandNode: BrandNode = {
      make: b.make,
      displayName,
      slug: bSlug,
      logoPath: meta?.logo ?? null,
      modelCount: modelNodes.length,
      engineCount: totalEngines,
      productCount: b.productSlugs.size,
    };

    brands.push(brandNode);
    brandBySlug.set(bSlug, brandNode);
    modelsByBrandSlug.set(bSlug, modelNodes);
  }

  cachedTree = {
    brands,
    brandBySlug,
    modelsByBrandSlug,
    enginesByBrandModelSlug,
  };
  return cachedTree;
}

export function getAllBrands(): BrandNode[] {
  return buildVehicleTree().brands;
}

export function getBrandBySlug(brandSlug: string): BrandNode | null {
  return buildVehicleTree().brandBySlug.get(brandSlug) ?? null;
}

export function getModelsForBrand(brandSlug: string): ModelSeriesNode[] {
  return buildVehicleTree().modelsByBrandSlug.get(brandSlug) ?? [];
}

export function getEnginesForModel(
  brandSlug: string,
  modelSlug: string
): EngineNode[] {
  return buildVehicleTree().enginesByBrandModelSlug.get(`${brandSlug}::${modelSlug}`) ?? [];
}

export function getModelNodeBySlug(
  brandSlug: string,
  modelSlug: string
): ModelSeriesNode | null {
  return getModelsForBrand(brandSlug).find((m) => m.slug === modelSlug) ?? null;
}

export function getEngineNodeBySlug(
  brandSlug: string,
  modelSlug: string,
  engineSlug: string
): EngineNode | null {
  return (
    getEnginesForModel(brandSlug, modelSlug).find((e) => e.slug === engineSlug) ??
    null
  );
}

export interface ModelFilterMatch {
  summary: WunderProductSummary;
  topOems: OemNumberRow[];
  topRivals: RivalNumberRow[];
  matchingEngines: EngineNode[];
}

export function getProductsForModel(
  brandSlug: string,
  modelSlug: string
): ModelFilterMatch[] {
  const engines = getEnginesForModel(brandSlug, modelSlug);
  const all = loadWunderProducts();
  const summaries = new Map(getWunderSummaries().map((s) => [s.slug, s]));
  const priority = ["MANN", "FILTRON", "MAHLE", "BOSCH", "UFI", "PURFLUX", "MOTOEC"];

  const byProductSlug = new Map<string, EngineNode[]>();
  for (const eng of engines) {
    for (const slug of eng.productSlugs) {
      const list = byProductSlug.get(slug) ?? [];
      list.push(eng);
      byProductSlug.set(slug, list);
    }
  }

  const out: ModelFilterMatch[] = [];
  for (const [slug, matchedEngines] of byProductSlug.entries()) {
    const prod = all.find((p) => p.slug === slug);
    const sum = summaries.get(slug);
    if (!prod || !sum) continue;
    const topRivals = [...prod.rival_numbers]
      .sort((a, b) => {
        const ai = priority.findIndex((pb) => a.brand.toUpperCase().includes(pb));
        const bi = priority.findIndex((pb) => b.brand.toUpperCase().includes(pb));
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      })
      .filter((r) => !r.brand.toUpperCase().startsWith("WUNDER"))
      .slice(0, 6);

    out.push({
      summary: sum,
      topOems: prod.oem_numbers.slice(0, 6),
      topRivals,
      matchingEngines: matchedEngines,
    });
  }

  return out.sort((a, b) =>
    a.summary.wunder_code.localeCompare(b.summary.wunder_code, "tr")
  );
}

export function getProductsForEngine(engineNode: EngineNode): {
  summary: WunderProductSummary;
  topOems: OemNumberRow[];
  topRivals: RivalNumberRow[];
}[] {
  const all = loadWunderProducts();
  const summaries = new Map(getWunderSummaries().map((s) => [s.slug, s]));
  const out: {
    summary: WunderProductSummary;
    topOems: OemNumberRow[];
    topRivals: RivalNumberRow[];
  }[] = [];

  for (const slug of engineNode.productSlugs) {
    const prod = all.find((p) => p.slug === slug);
    const sum = summaries.get(slug);
    if (!prod || !sum) continue;
    const priority = ["MANN", "FILTRON", "MAHLE", "BOSCH", "UFI", "PURFLUX", "MOTOEC"];
    const topRivals = [...prod.rival_numbers]
      .sort((a, b) => {
        const ai = priority.findIndex((pb) => a.brand.toUpperCase().includes(pb));
        const bi = priority.findIndex((pb) => b.brand.toUpperCase().includes(pb));
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      })
      .filter((r) => !r.brand.toUpperCase().startsWith("WUNDER"))
      .slice(0, 6);

    out.push({
      summary: sum,
      topOems: prod.oem_numbers.slice(0, 6),
      topRivals,
    });
  }

  return out;
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
  return loadWunderProducts().map((p) => ({
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
  }));
}

export function getWunderProductBySlug(slug: string): RawWunderProduct | null {
  const products = loadWunderProducts();
  const found = products.find((p) => p.slug === slug);
  if (!found) return null;

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

    if (bestHit) hits.push(bestHit);
  }

  return hits.sort((a, b) => {
    const aExact = normalizeCodeLoose(a.matched_code) === qLoose ? 0 : 1;
    const bExact = normalizeCodeLoose(b.matched_code) === qLoose ? 0 : 1;
    if (aExact !== bExact) return aExact - bExact;
    return a.wunder_code.localeCompare(b.wunder_code, "tr");
  });
}
