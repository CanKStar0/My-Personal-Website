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

export interface B2BWunderProduct {
  slug: string;
  wunder_code: string;
  filter_type: string;
  category: "yag" | "hava" | "kabin" | "yakit";
  category_label: string;
  local_image: string | null;
  subtitle: string;
  stock_count: number;
  list_price: number;
  discount_percent: number;
  net_price: number;
}

export interface B2BVehicleOption {
  make: string;
  makeSlug: string;
  displayName: string;
  models: {
    modelSeries: string;
    years: string[];
    engines: {
      label: string;
      year: string;
      productSlugs: string[];
    }[];
  }[];
}

// Deterministic demo B2B pricing & stock per product slug
const B2B_PRICING_MAP: Record<
  string,
  { listPrice: number; discount: number; stock: number; subtitle: string }
> = {
  "wy-500": { listPrice: 480, discount: 45, stock: 64, subtitle: "Fiat / Opel / Alfa 1.3 Multijet" },
  "wy-800": { listPrice: 390, discount: 45, stock: 120, subtitle: "VAG / Renault / Dacia / Nissan" },
  "wh-800": { listPrice: 540, discount: 40, stock: 38, subtitle: "Renault Clio / Kangoo / Megane" },
  "wh-303": { listPrice: 620, discount: 45, stock: 25, subtitle: "Fiat / Alfa / Opel Hava Grubu" },
  "wpk-109": { listPrice: 510, discount: 45, stock: 44, subtitle: "Aktif Karbonlu Polen Filtresi" },
  "wb-708": { listPrice: 890, discount: 40, stock: 19, subtitle: "Mercedes / Smart Dizel Yakıt" },
  "wy-100": { listPrice: 410, discount: 45, stock: 85, subtitle: "VAG / Audi / Seat / Skoda" },
  "wy-101": { listPrice: 445, discount: 45, stock: 52, subtitle: "VAG / Mitsubishi / Smart" },
  "wy-304": { listPrice: 460, discount: 45, stock: 0, subtitle: "Chrysler / Mercedes / Rover" },
  "wy-102": { listPrice: 530, discount: 40, stock: 31, subtitle: "Audi / VW / Seat / Skoda" },
};

const BRAND_DISPLAY_MAP: Record<string, string> = {
  AUDI: "Audi",
  "ALFA ROMEO": "Alfa Romeo",
  CHRYSLER: "Chrysler",
  DACIA: "Dacia",
  FIAT: "Fiat",
  JEEP: "Jeep",
  LANCIA: "Lancia",
  "MERCEDES-BENZ": "Mercedes-Benz",
  MITSUBISHI: "Mitsubishi",
  NISSAN: "Nissan",
  OPEL: "Opel",
  RENAULT: "Renault",
  ROVER: "Rover",
  SEAT: "SEAT",
  SKODA: "Škoda",
  "SMART (DAIMLER AG)": "Smart",
  SUZUKI: "Suzuki",
  "VW(VOLKSWAGEN)": "Volkswagen",
};

let cachedProducts: RawWunderProduct[] | null = null;
let cachedSearchIndex: Map<string, Set<string>> | null = null;

export function normalizeCodeStrict(value: string): string {
  return (value || "").toUpperCase().replace(/[\s\-_.]+/g, "");
}

export function normalizeCodeLoose(value: string): string {
  return (value || "").toUpperCase().replace(/[\s\-_./]+/g, "");
}

function classifyFilter(filterType: string): {
  category: "yag" | "hava" | "kabin" | "yakit";
  label: string;
} {
  const lower = (filterType || "").toLocaleLowerCase("tr-TR");
  if (lower.includes("hava")) return { category: "hava", label: "Hava Filtresi" };
  if (lower.includes("kabin") || lower.includes("polen")) {
    return { category: "kabin", label: "Polen Filtresi" };
  }
  if (lower.includes("yakıt") || lower.includes("yakit")) {
    return { category: "yakit", label: "Yakıt Filtresi" };
  }
  return { category: "yag", label: "Yağ Filtresi" };
}

export function loadWunderProducts(): RawWunderProduct[] {
  if (cachedProducts) return cachedProducts;
  const jsonPath = path.join(process.cwd(), "src", "data", "wunder-demo.json");
  const raw = fs.readFileSync(jsonPath, "utf-8");
  cachedProducts = JSON.parse(raw) as RawWunderProduct[];
  return cachedProducts;
}

export function getB2BProducts(): B2BWunderProduct[] {
  return loadWunderProducts().map((p) => {
    const cls = classifyFilter(p.filter_type);
    const pricing = B2B_PRICING_MAP[p.slug] ?? {
      listPrice: 450,
      discount: 45,
      stock: 20,
      subtitle: p.filter_type,
    };
    const netPrice = Number(
      (pricing.listPrice * (1 - pricing.discount / 100)).toFixed(2)
    );

    return {
      slug: p.slug,
      wunder_code: p.wunder_code,
      filter_type: p.filter_type,
      category: cls.category,
      category_label: cls.label,
      local_image: p.local_image,
      subtitle: pricing.subtitle,
      stock_count: pricing.stock,
      list_price: pricing.listPrice,
      discount_percent: pricing.discount,
      net_price: netPrice,
    };
  });
}

// Unified hidden background index merging WUNDER + OEM + Rival + MotoEC codes
function getUnifiedSearchIndex(): Map<string, Set<string>> {
  if (cachedSearchIndex) return cachedSearchIndex;
  const idx = new Map<string, Set<string>>();

  const addToken = (rawCode: string, slug: string) => {
    const loose = normalizeCodeLoose(rawCode);
    if (!loose) return;
    const set = idx.get(loose) ?? new Set<string>();
    set.add(slug);
    idx.set(loose, set);
  };

  for (const p of loadWunderProducts()) {
    addToken(p.wunder_code, p.slug);
    addToken(p.motoec_code, p.slug);
    for (const o of p.oem_numbers) addToken(o.oem_number, p.slug);
    for (const r of p.rival_numbers) addToken(r.rival_code, p.slug);
  }

  cachedSearchIndex = idx;
  return idx;
}

export function searchB2BProductsByCode(query: string): B2BWunderProduct[] {
  const qLoose = normalizeCodeLoose(query);
  if (qLoose.length < 2) return [];

  const idx = getUnifiedSearchIndex();
  const exactSlugs = idx.get(qLoose);
  const matchedSlugs = new Set<string>(exactSlugs ?? []);

  if (matchedSlugs.size === 0) {
    for (const [token, slugs] of idx.entries()) {
      if (token.includes(qLoose)) {
        for (const s of slugs) matchedSlugs.add(s);
      }
    }
  }

  const allB2B = getB2BProducts();
  return allB2B.filter((p) => matchedSlugs.has(p.slug));
}

export function getB2BVehiclesIndex(): {
  makes: { make: string; displayName: string }[];
} {
  const seen = new Set<string>();
  for (const p of loadWunderProducts()) {
    for (const app of p.applications) {
      if (app.make) seen.add(app.make.trim());
    }
  }
  const makes = [...seen]
    .map((make) => ({
      make,
      displayName: BRAND_DISPLAY_MAP[make] ?? make,
    }))
    .sort((a, b) => a.displayName.localeCompare(b.displayName, "tr"));

  return { makes };
}

export function queryB2BVehicleCascade(
  make: string,
  model?: string,
  year?: string,
  engine?: string
): {
  models: string[];
  years: string[];
  engines: string[];
  products: B2BWunderProduct[];
} {
  const products = loadWunderProducts();
  const modelsSet = new Set<string>();
  const yearsSet = new Set<string>();
  const enginesSet = new Set<string>();
  const matchedSlugs = new Set<string>();

  for (const p of products) {
    for (const app of p.applications) {
      if (app.make !== make) continue;
      if (app.model_series) modelsSet.add(app.model_series);
      if (model && app.model_series !== model) continue;

      const appYear = app.years || "Tüm Yıllar";
      if (model) yearsSet.add(appYear);
      if (year && appYear !== year) continue;

      const engLabel = `${app.engine}${app.engine_code ? ` (${app.engine_code})` : ""}${app.hp ? ` · ${app.hp} BG` : ""}`;
      if (model) enginesSet.add(engLabel);
      if (engine && engLabel !== engine) continue;

      matchedSlugs.add(p.slug);
    }
  }

  const allB2B = getB2BProducts();
  return {
    models: [...modelsSet].sort((a, b) => a.localeCompare(b, "tr")),
    years: [...yearsSet].sort((a, b) => a.localeCompare(b, "tr")),
    engines: [...enginesSet].sort((a, b) => a.localeCompare(b, "tr")),
    products: allB2B.filter((p) => matchedSlugs.has(p.slug)),
  };
}
