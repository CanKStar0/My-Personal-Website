import fs from "node:fs";
import path from "node:path";

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

export interface B2BProductDetail {
  product: B2BWunderProduct;
  oems: { brand: string; code: string }[];
  rivals: { brand: string; code: string }[];
}

interface CompactProduct {
  s: string;
  w: string;
  c: "yag" | "hava" | "kabin" | "yakit";
  cl: string;
  img: string | null;
  sub: string;
  lp: number;
  d: number;
  np: number;
  stk: number;
  o: [string, string][];
  r: [string, string][];
  t: string[];
}

// brand -> model_series -> [years, engine_label, slugs[]]
type CompactVehicleTree = Record<
  string,
  Record<string, [string, string, string[]][]>
>;

let cachedCompact: CompactProduct[] | null = null;
let cachedB2BMap: Map<string, B2BWunderProduct> | null = null;
let cachedCompactMap: Map<string, CompactProduct> | null = null;
let cachedSearchIndex: Map<string, Set<string>> | null = null;
let cachedVehicleTree: CompactVehicleTree | null = null;

export function normalizeCodeLoose(value: string): string {
  return (value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function loadCompactProducts(): CompactProduct[] {
  if (cachedCompact) return cachedCompact;
  const jsonPath = path.join(process.cwd(), "src", "data", "wunder-master-b2b.json");
  const raw = fs.readFileSync(jsonPath, "utf-8");
  cachedCompact = JSON.parse(raw) as CompactProduct[];
  return cachedCompact;
}

function toB2B(p: CompactProduct): B2BWunderProduct {
  return {
    slug: p.s,
    wunder_code: p.w,
    filter_type: p.cl,
    category: p.c,
    category_label: p.cl,
    local_image: p.img,
    subtitle: p.sub,
    stock_count: p.stk,
    list_price: p.lp,
    discount_percent: p.d,
    net_price: p.np,
  };
}

function getMaps(): {
  b2bMap: Map<string, B2BWunderProduct>;
  compactMap: Map<string, CompactProduct>;
} {
  if (cachedB2BMap && cachedCompactMap) {
    return { b2bMap: cachedB2BMap, compactMap: cachedCompactMap };
  }
  const b2bMap = new Map<string, B2BWunderProduct>();
  const compactMap = new Map<string, CompactProduct>();
  for (const p of loadCompactProducts()) {
    b2bMap.set(p.s, toB2B(p));
    compactMap.set(p.s, p);
  }
  cachedB2BMap = b2bMap;
  cachedCompactMap = compactMap;
  return { b2bMap, compactMap };
}

function loadVehicleTree(): CompactVehicleTree {
  if (cachedVehicleTree) return cachedVehicleTree;
  const jsonPath = path.join(process.cwd(), "src", "data", "wunder-vehicles-b2b.json");
  const raw = fs.readFileSync(jsonPath, "utf-8");
  cachedVehicleTree = JSON.parse(raw) as CompactVehicleTree;
  return cachedVehicleTree;
}

export interface B2BCatalogStats {
  totalProducts: number;
  totalSearchCodes: number;
  totalVehicleBrands: number;
  totalVehicles: number;
  categoryCounts: {
    all: number;
    yag: number;
    hava: number;
    kabin: number;
    yakit: number;
  };
}

export function getB2BCatalogStats(): B2BCatalogStats {
  const all = loadCompactProducts();
  const tree = loadVehicleTree();
  let totalVehicles = 0;
  for (const models of Object.values(tree)) {
    for (const rows of Object.values(models)) {
      totalVehicles += rows.length;
    }
  }
  const uniqueTokens = new Set<string>();
  const counts = { all: all.length, yag: 0, hava: 0, kabin: 0, yakit: 0 };
  for (const p of all) {
    counts[p.c] += 1;
    for (const t of p.t) uniqueTokens.add(t);
  }
  return {
    totalProducts: all.length,
    totalSearchCodes: uniqueTokens.size,
    totalVehicleBrands: Object.keys(tree).length,
    totalVehicles,
    categoryCounts: counts,
  };
}

export function getB2BProducts(limit = 48): B2BWunderProduct[] {
  const all = loadCompactProducts();
  // Prioritize products with dedicated clean studio / local photos first
  const localStudio = all.filter((p) => p.img?.startsWith("/images/demo/wunder/") && p.stk > 0);
  const rest = all.filter((p) => !(p.img?.startsWith("/images/demo/wunder/") && p.stk > 0));
  return [...localStudio, ...rest].slice(0, limit).map(toB2B);
}

export function getB2BCategoryProducts(
  category: string,
  page = 1,
  limit = 48
): { products: B2BWunderProduct[]; total: number; page: number; hasMore: boolean } {
  const all = loadCompactProducts();
  const filtered =
    category && category !== "all"
      ? all.filter((p) => p.c === category)
      : all;
  const prioritized = [
    ...filtered.filter((p) => p.img?.startsWith("/images/demo/wunder/") && p.stk > 0),
    ...filtered.filter((p) => !p.img?.startsWith("/images/demo/wunder/") && p.stk > 0),
    ...filtered.filter((p) => p.stk === 0),
  ];
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * limit;
  const end = start + limit;
  return {
    products: prioritized.slice(start, end).map(toB2B),
    total: filtered.length,
    page: safePage,
    hasMore: end < filtered.length,
  };
}

export function getB2BProductDetail(slug: string): B2BProductDetail | null {
  const { b2bMap, compactMap } = getMaps();
  const b2b = b2bMap.get(slug);
  const raw = compactMap.get(slug);
  if (!b2b || !raw) return null;
  return {
    product: b2b,
    oems: raw.o.map(([brand, code]) => ({ brand, code })),
    rivals: raw.r.map(([brand, code]) => ({ brand, code })),
  };
}

function getUnifiedSearchIndex(): Map<string, Set<string>> {
  if (cachedSearchIndex) return cachedSearchIndex;
  const idx = new Map<string, Set<string>>();
  for (const p of loadCompactProducts()) {
    for (const token of p.t) {
      if (!token) continue;
      let set = idx.get(token);
      if (!set) {
        set = new Set<string>();
        idx.set(token, set);
      }
      set.add(p.s);
    }
  }
  cachedSearchIndex = idx;
  return idx;
}

export function searchB2BProductsByCode(query: string): B2BWunderProduct[] {
  const qLoose = normalizeCodeLoose(query);
  if (qLoose.length < 2) return [];

  const idx = getUnifiedSearchIndex();
  const { b2bMap } = getMaps();
  const matchedSlugs = new Set<string>(idx.get(qLoose) ?? []);

  if (matchedSlugs.size === 0 && qLoose.length >= 3) {
    for (const [token, slugs] of idx.entries()) {
      if (token.includes(qLoose)) {
        for (const s of slugs) {
          matchedSlugs.add(s);
          if (matchedSlugs.size >= 40) break;
        }
      }
      if (matchedSlugs.size >= 40) break;
    }
  }

  const out: B2BWunderProduct[] = [];
  for (const slug of matchedSlugs) {
    const p = b2bMap.get(slug);
    if (p) out.push(p);
  }
  return out;
}

export function getB2BVehiclesIndex(): {
  makes: { make: string; displayName: string }[];
} {
  const tree = loadVehicleTree();
  const makes = Object.keys(tree)
    .map((make) => ({ make, displayName: make }))
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
  const tree = loadVehicleTree();
  const makeNode = tree[make];
  if (!makeNode) {
    return { models: [], years: [], engines: [], products: [] };
  }

  const models = Object.keys(makeNode).sort((a, b) => a.localeCompare(b, "tr"));
  const yearsSet = new Set<string>();
  const enginesSet = new Set<string>();
  const matchedSlugs = new Set<string>();

  if (model && makeNode[model]) {
    for (const [appYear, engLabel, slugs] of makeNode[model]) {
      yearsSet.add(appYear);
      if (year && appYear !== year) continue;
      enginesSet.add(engLabel);
      if (engine && engLabel !== engine) continue;
      for (const s of slugs) matchedSlugs.add(s);
    }
  }

  const { b2bMap } = getMaps();
  const products: B2BWunderProduct[] = [];
  for (const slug of matchedSlugs) {
    const p = b2bMap.get(slug);
    if (p) products.push(p);
  }

  return {
    models,
    years: [...yearsSet].sort((a, b) => a.localeCompare(b, "tr")),
    engines: [...enginesSet].sort((a, b) => a.localeCompare(b, "tr")),
    products,
  };
}
