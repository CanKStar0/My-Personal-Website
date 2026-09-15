export type ComplexityId = "standard" | "advanced" | "enterprise";
export type DeliveryId = "database" | "api" | "dashboard";

export interface MethodConfig {
  id: string;
  labelTR: string;
  labelEN: string;
  subTR: string;
  subEN: string;
  levelTR: string;
  levelEN: string;
  coreTech: string[];
  summaryTR: string;
  summaryEN: string;
  timelines: Record<ComplexityId, Record<DeliveryId, { tr: string; en: string }>>;
}

export interface ServiceCalculatorData {
  slug: string;
  serviceNameTR: string;
  serviceNameEN: string;
  methods: MethodConfig[];
}

export const deliveryMeta: Record<DeliveryId, {
  labelTR: string;
  labelEN: string;
  subTR: string;
  subEN: string;
  tech: string[];
  descTR: string;
  descEN: string;
}> = {
  database: {
    labelTR: "Veritabanı & Kuyruk",
    labelEN: "Database & Queue",
    subTR: "PostgreSQL / Redis / Pipeline",
    subEN: "PostgreSQL / Redis / Pipeline",
    tech: ["PostgreSQL / MongoDB", "Redis Queue (BullMQ)"],
    descTR: "veritabanı katmanına doğrudan normalize aktarım ve asenkron kuyruk yönetimi.",
    descEN: "direct normalized database ingestion and asynchronous queue management.",
  },
  api: {
    labelTR: "REST API & Webhook",
    labelEN: "REST API & Webhooks",
    subTR: "Güvenli Uç Noktalar & Event",
    subEN: "Secure Endpoints & Events",
    tech: ["FastAPI / Express API", "Webhook Dispatcher", "JWT / API Key Auth"],
    descTR: "güvenli REST uç noktaları, API anahtarı yetkilendirmesi ve anlık olay webhook entegrasyonu.",
    descEN: "secure REST endpoints, API authentication, and real-time event webhooks.",
  },
  dashboard: {
    labelTR: "Next.js Yönetim Paneli",
    labelEN: "Next.js Admin UI",
    subTR: "Modern Arayüz & Canlı Panel",
    subEN: "Control Console & Telemetry",
    tech: ["Next.js 16 App Router", "Tailwind CSS v4", "Admin Control Console"],
    descTR: "özel Next.js yönetim paneli, operasyonel durum izleme ve yönetim kontrolleri.",
    descEN: "custom Next.js administrative dashboard with operational telemetry and controls.",
  },
};

export const serviceConfigs: Record<string, ServiceCalculatorData> = {
  "web-scraping": {
    slug: "web-scraping",
    serviceNameTR: "Web Scraping ve Veri Toplama",
    serviceNameEN: "Web Scraping & Data Collection",
    methods: [
      {
        id: "static-api",
        labelTR: "Statik HTML & Hızlı API Çekimi",
        labelEN: "Static HTML & Fast API Extraction",
        subTR: "HTTP istemcileri, sıfır tarayıcı maliyeti, JSON",
        subEN: "Lightweight HTTP clients, zero browser overhead",
        levelTR: "Statik / API Veri Çekimi",
        levelEN: "Static / API Data Extraction",
        coreTech: ["Node.js / Python", "Cheerio / Axios", "JSON Normalization"],
        summaryTR: "Statik veya hafif API kaynaklarından minimal kaynak tüketimiyle hızlı ve periyodik veri toplama hattı.",
        summaryEN: "Fast, scheduled data collection pipeline from static or lightweight API web sources.",
        timelines: {
          standard: {
            database: { tr: "1 - 2 Gün", en: "1 - 2 Days" },
            api: { tr: "2 - 3 Gün", en: "2 - 3 Days" },
            dashboard: { tr: "4 - 5 Gün", en: "4 - 5 Days" },
          },
          advanced: {
            database: { tr: "2 - 3 Gün", en: "2 - 3 Days" },
            api: { tr: "3 - 4 Gün", en: "3 - 4 Days" },
            dashboard: { tr: "5 - 7 Gün", en: "5 - 7 Days" },
          },
          enterprise: {
            database: { tr: "3 - 5 Gün", en: "3 - 5 Days" },
            api: { tr: "4 - 6 Gün", en: "4 - 6 Days" },
            dashboard: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
          },
        },
      },
      {
        id: "dynamic-browser",
        labelTR: "Dinamik JS & Headless Tarayıcı",
        labelEN: "Dynamic JS & Headless Browser",
        subTR: "Playwright otomasyonu, SPA siteler, buton tıklama",
        subEN: "Playwright automation, SPA apps, interactive clicks",
        levelTR: "Dinamik Tarayıcı Otomasyonu",
        levelEN: "Dynamic Browser Automation",
        coreTech: ["Playwright Automation", "Chromium Headless", "Session Management"],
        summaryTR: "JavaScript ile render edilen içerikler, sonsuz kaydırma (infinite scroll) ve form etkileşimleri içeren kaynaklar.",
        summaryEN: "JavaScript-rendered pages, infinite scrolling, and interaction-driven flows via headless browser.",
        timelines: {
          standard: {
            database: { tr: "2 - 3 Gün", en: "2 - 3 Days" },
            api: { tr: "3 - 4 Gün", en: "3 - 4 Days" },
            dashboard: { tr: "5 - 7 Gün", en: "5 - 7 Days" },
          },
          advanced: {
            database: { tr: "3 - 5 Gün", en: "3 - 5 Days" },
            api: { tr: "4 - 6 Gün", en: "4 - 6 Days" },
            dashboard: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
          },
          enterprise: {
            database: { tr: "5 - 7 Gün", en: "5 - 7 Days" },
            api: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            dashboard: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
          },
        },
      },
      {
        id: "anti-bot",
        labelTR: "Anti-Bot & Akıllı Proxy Rotasyonu",
        labelEN: "Anti-Bot Bypass & Smart Proxy Pool",
        subTR: "Cloudflare, Akamai bypass, residential proxy",
        subEN: "Cloudflare / Akamai bypass, rotating proxy pool",
        levelTR: "Dayanıklı Korumalı Pipeline",
        levelEN: "Resilient Protected Pipeline",
        coreTech: ["Smart Proxy Rotation", "Browser Fingerprinting", "Captcha Solver & Resilient Headers"],
        summaryTR: "Bot korumalı zorlu kaynaklardan kesintisiz veri çekmek için parmak izi maskeleme ve akıllı IP rotasyonu.",
        summaryEN: "Anti-bot evasion, fingerprint masking, and residential proxy orchestration for protected targets.",
        timelines: {
          standard: {
            database: { tr: "3 - 5 Gün", en: "3 - 5 Days" },
            api: { tr: "4 - 6 Gün", en: "4 - 6 Days" },
            dashboard: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
          },
          advanced: {
            database: { tr: "4 - 7 Gün", en: "4 - 7 Days" },
            api: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            dashboard: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
          },
          enterprise: {
            database: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            api: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            dashboard: { tr: "2 - 2.5 Hafta", en: "2 - 2.5 Weeks" },
          },
        },
      },
      {
        id: "distributed-cluster",
        labelTR: "Dağıtık Kuyruk & Anlık Değişim",
        labelEN: "Distributed Cluster & Change Detection",
        subTR: "Redis kuyrukları, cluster worker, anomali alarmı",
        subEN: "Redis queues, cluster workers, anomaly alerting",
        levelTR: "Büyük Ölçekli Dağıtık Veri Kümesi",
        levelEN: "Distributed High-Scale Cluster",
        coreTech: ["Distributed Worker Cluster", "Redis Queue (BullMQ)", "Real-Time Change Detection"],
        summaryTR: "Yüz binlerce sayfayı paralel işleyen, anlık fiyat/stok değişikliklerini milisaniyeler içinde yakalayan kurumsal hat.",
        summaryEN: "High-scale parallel worker cluster detecting real-time changes across thousands of pages.",
        timelines: {
          standard: {
            database: { tr: "4 - 7 Gün", en: "4 - 7 Days" },
            api: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            dashboard: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
          },
          advanced: {
            database: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            api: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            dashboard: { tr: "2 - 2.5 Hafta", en: "2 - 2.5 Weeks" },
          },
          enterprise: {
            database: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            api: { tr: "2 - 2.5 Hafta", en: "2 - 2.5 Weeks" },
            dashboard: { tr: "2.5 - 3.5 Hafta", en: "2.5 - 3.5 Weeks" },
          },
        },
      },
    ],
  },
  "rakip-fiyat-takip-sistemi": {
    slug: "rakip-fiyat-takip-sistemi",
    serviceNameTR: "Rakip Fiyat ve Stok Takibi",
    serviceNameEN: "Competitor Price & Stock Tracking",
    methods: [
      {
        id: "marketplaces",
        labelTR: "Pazaryeri & Akakçe / Cimri Takibi",
        labelEN: "Marketplaces & Comparison Engines",
        subTR: "Trendyol, Hepsiburada, Amazon, Akakçe",
        subEN: "Trendyol, Amazon, Akakçe periodic monitoring",
        levelTR: "Pazaryeri & Buybox Takibi",
        levelEN: "Marketplace & Buybox Tracker",
        coreTech: ["Playwright Scraper", "Marketplace DOM Parsers", "PostgreSQL Price History"],
        summaryTR: "Pazaryerlerinde rakip satıcıların fiyat kırılmalarını ve Buybox değişimlerini periyodik izleme.",
        summaryEN: "Automated tracking of competitor pricing, discounts, and Buybox shifts across marketplaces.",
        timelines: {
          standard: {
            database: { tr: "2 - 3 Gün", en: "2 - 3 Days" },
            api: { tr: "3 - 5 Gün", en: "3 - 5 Days" },
            dashboard: { tr: "5 - 7 Gün", en: "5 - 7 Days" },
          },
          advanced: {
            database: { tr: "3 - 5 Gün", en: "3 - 5 Days" },
            api: { tr: "5 - 7 Gün", en: "5 - 7 Days" },
            dashboard: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
          },
          enterprise: {
            database: { tr: "5 - 7 Gün", en: "5 - 7 Days" },
            api: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            dashboard: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
          },
        },
      },
      {
        id: "b2b-portals",
        labelTR: "Rakip Web Siteleri & B2B Portalları",
        labelEN: "Direct Web Stores & B2B Portals",
        subTR: "Özel rakip siteleri ve şifreli B2B bayi portalları",
        subEN: "Direct web stores and authenticated dealer portals",
        levelTR: "B2B & Özel E-Ticaret Takibi",
        levelEN: "B2B & Direct Store Tracker",
        coreTech: ["Session Auth Scraper", "B2B Portal Crawler", "Encrypted Credential Vault"],
        summaryTR: "Rakip özel e-ticaret siteleri ve giriş gerektiren toptancı B2B panellerinden anlık fiyat/stok çekimi.",
        summaryEN: "Automated extraction of dealer pricing, stock tiers, and discounts behind authenticated B2B portals.",
        timelines: {
          standard: {
            database: { tr: "2 - 4 Gün", en: "2 - 4 Days" },
            api: { tr: "4 - 6 Gün", en: "4 - 6 Days" },
            dashboard: { tr: "1 Hafta", en: "1 Week" },
          },
          advanced: {
            database: { tr: "4 - 6 Gün", en: "4 - 6 Days" },
            api: { tr: "1 Hafta", en: "1 Week" },
            dashboard: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
          },
          enterprise: {
            database: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            api: { tr: "1.5 Hafta", en: "1.5 Weeks" },
            dashboard: { tr: "2 Hafta", en: "2 Weeks" },
          },
        },
      },
      {
        id: "alert-bots",
        labelTR: "Anlık Fiyat Alarmları & Bot Bildirimi",
        labelEN: "Instant Price Alerts & Bot Notifier",
        subTR: "Fiyat düşüşünde WhatsApp/Telegram anlık alarm",
        subEN: "Real-time WhatsApp / Telegram drop notifications",
        levelTR: "Anlık Fiyat Alarm Sistemi",
        levelEN: "Real-Time Price Alert Engine",
        coreTech: ["Telegram Bot API", "WhatsApp Business API", "Redis Alarm Queue"],
        summaryTR: "Kritik ürünlerde fiyat eşiği aşıldığında saniyeler içinde ekibinize WhatsApp, Telegram veya e-posta bildirimi.",
        summaryEN: "High-frequency checking with instant alert dispatching to WhatsApp, Telegram, or Webhooks.",
        timelines: {
          standard: {
            database: { tr: "3 - 5 Gün", en: "3 - 5 Days" },
            api: { tr: "4 - 6 Gün", en: "4 - 6 Days" },
            dashboard: { tr: "1 Hafta", en: "1 Week" },
          },
          advanced: {
            database: { tr: "4 - 7 Gün", en: "4 - 7 Days" },
            api: { tr: "1 Hafta", en: "1 Week" },
            dashboard: { tr: "1.5 Hafta", en: "1.5 Weeks" },
          },
          enterprise: {
            database: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            api: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            dashboard: { tr: "2 - 2.5 Hafta", en: "2 - 2.5 Weeks" },
          },
        },
      },
      {
        id: "repricing",
        labelTR: "Dinamik Fiyatlandırma (Repricing)",
        labelEN: "Autonomous Dynamic Repricing",
        subTR: "Kural bazlı WooCommerce/Shopify otomatik fiyatlama",
        subEN: "Rule-based store pricing engine (WooCommerce / Shopify)",
        levelTR: "Otonom Repricing Motoru",
        levelEN: "Autonomous Repricing Engine",
        coreTech: ["Shopify / WooCommerce API", "Dynamic Margin Rules", "Audit Trail & Fallback Safeguard"],
        summaryTR: "Rakip fiyatını referans alıp kâr marjınızı koruyarak mağazanızdaki satış fiyatını otomatik güncelleyen otonom döngü.",
        summaryEN: "Closed-loop dynamic pricing updating your store inventory based on competitor benchmarks and profit margin guards.",
        timelines: {
          standard: {
            database: { tr: "4 - 7 Gün", en: "4 - 7 Days" },
            api: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            dashboard: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
          },
          advanced: {
            database: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            api: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            dashboard: { tr: "2 - 2.5 Hafta", en: "2 - 2.5 Weeks" },
          },
          enterprise: {
            database: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            api: { tr: "2 - 2.5 Hafta", en: "2 - 2.5 Weeks" },
            dashboard: { tr: "2.5 - 3.5 Hafta", en: "2.5 - 3.5 Weeks" },
          },
        },
      },
    ],
  },
  "e-ticaret-urun-veri-aktarimi": {
    slug: "e-ticaret-urun-veri-aktarimi",
    serviceNameTR: "E-Ticaret Ürün ve Katalog Aktarımı",
    serviceNameEN: "E-Commerce Product & Catalog Migration",
    methods: [
      {
        id: "catalog-dump",
        labelTR: "Tek Seferlik Katalog Çekimi & Temizleme",
        labelEN: "One-Time Catalog Extract & Clean",
        subTR: "Tüm ürün, varyant ve görsellerin CSV/XML çıktısı",
        subEN: "Extract all items, variants, images to CSV/JSON",
        levelTR: "Katalog Çıkarma & Temizleme",
        levelEN: "Catalog Extraction & Cleaning",
        coreTech: ["High-Speed Parser", "Sharp (WebP Image Optimizer)", "CSV / JSON Export"],
        summaryTR: "Kaynak siteden on binlerce ürünü varyantları, özellikleri ve optimize edilmiş resimleriyle çekip temizleme.",
        summaryEN: "Batch extraction of thousands of products with variant hierarchies and WebP-optimized images.",
        timelines: {
          standard: {
            database: { tr: "1 - 3 Gün", en: "1 - 3 Days" },
            api: { tr: "2 - 4 Gün", en: "2 - 4 Days" },
            dashboard: { tr: "4 - 6 Gün", en: "4 - 6 Days" },
          },
          advanced: {
            database: { tr: "2 - 4 Gün", en: "2 - 4 Days" },
            api: { tr: "3 - 5 Gün", en: "3 - 5 Days" },
            dashboard: { tr: "5 - 7 Gün", en: "5 - 7 Days" },
          },
          enterprise: {
            database: { tr: "3 - 5 Gün", en: "3 - 5 Days" },
            api: { tr: "5 - 7 Gün", en: "5 - 7 Days" },
            dashboard: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
          },
        },
      },
      {
        id: "store-api",
        labelTR: "WooCommerce / Shopify Doğrudan Aktarım",
        labelEN: "WooCommerce / Shopify Direct Ingestion",
        subTR: "REST/GraphQL API ile mağazaya hatasız yükleme",
        subEN: "Direct API injection into Shopify or WooCommerce",
        levelTR: "Mağaza API Aktarım Hattı",
        levelEN: "Store API Ingestion Pipeline",
        coreTech: ["Shopify GraphQL", "WooCommerce REST API", "Batch Mutation Engine"],
        summaryTR: "Ürünlerin varyantları, kategorileri ve SEO açıklamalarıyla mağazanıza API üzerinden hatasız ve doğrudan aktarımı.",
        summaryEN: "Automated direct API migration into your store catalog with variant mapping and taxonomy trees.",
        timelines: {
          standard: {
            database: { tr: "2 - 4 Gün", en: "2 - 4 Days" },
            api: { tr: "3 - 5 Gün", en: "3 - 5 Days" },
            dashboard: { tr: "1 Hafta", en: "1 Week" },
          },
          advanced: {
            database: { tr: "3 - 5 Gün", en: "3 - 5 Days" },
            api: { tr: "4 - 6 Gün", en: "4 - 6 Days" },
            dashboard: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
          },
          enterprise: {
            database: { tr: "5 - 7 Gün", en: "5 - 7 Days" },
            api: { tr: "1 Hafta", en: "1 Week" },
            dashboard: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
          },
        },
      },
      {
        id: "periodic-sync",
        labelTR: "Periyodik Stok & Fiyat Senkronizasyonu",
        labelEN: "Periodic Inventory & Price Sync",
        subTR: "Tedarikçideki tükenmeleri ve zamları eşitleme",
        subEN: "Scheduled inventory checks and price sync",
        levelTR: "Otomatik Senkronizasyon Servisi",
        levelEN: "Automated Sync Service",
        coreTech: ["CRON Scheduler", "SKU Matching Engine", "Automated Inventory Sync"],
        summaryTR: "Tedarikçideki stok değişimlerini ve fiyat güncellemelerini düzenli tarayarak mağazanızı senkron tutan arka plan servisi.",
        summaryEN: "Continuous sync service monitoring source inventory levels and updating your store in real-time.",
        timelines: {
          standard: {
            database: { tr: "3 - 5 Gün", en: "3 - 5 Days" },
            api: { tr: "4 - 6 Gün", en: "4 - 6 Days" },
            dashboard: { tr: "1 Hafta", en: "1 Week" },
          },
          advanced: {
            database: { tr: "4 - 6 Gün", en: "4 - 6 Days" },
            api: { tr: "1 Hafta", en: "1 Week" },
            dashboard: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
          },
          enterprise: {
            database: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            api: { tr: "1.5 Hafta", en: "1.5 Weeks" },
            dashboard: { tr: "2 Hafta", en: "2 Weeks" },
          },
        },
      },
      {
        id: "multi-supplier",
        labelTR: "Çoklu Tedarikçi & Kâr Marjı Motoru",
        labelEN: "Multi-Vendor Consolidation & Markup",
        subTR: "Farklı kaynakları birleştirme, döviz & kâr kuralı",
        subEN: "Multi-supplier feeds, automated markup formulas",
        levelTR: "Çok Kaynaklı Katalog Konsolidasyonu",
        levelEN: "Multi-Source Catalog Consolidation",
        coreTech: ["Multi-Source Pipeline", "Dynamic Markup Engine", "Rule-Based Deduplication"],
        summaryTR: "Birden fazla tedarikçiden gelen ürünleri tekilleştirip kâr marjı ve kur kurallarıyla mağazaya dağıtan kurumsal hat.",
        summaryEN: "Consolidation engine merging disparate supplier catalogs with custom price markup formulas and deduplication.",
        timelines: {
          standard: {
            database: { tr: "4 - 7 Gün", en: "4 - 7 Days" },
            api: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            dashboard: { tr: "1.5 Hafta", en: "1.5 Weeks" },
          },
          advanced: {
            database: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            api: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            dashboard: { tr: "2 - 2.5 Hafta", en: "2 - 2.5 Weeks" },
          },
          enterprise: {
            database: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            api: { tr: "2 - 2.5 Hafta", en: "2 - 2.5 Weeks" },
            dashboard: { tr: "2.5 - 3.5 Hafta", en: "2.5 - 3.5 Weeks" },
          },
        },
      },
    ],
  },
  "yapay-zeka-otomasyon": {
    slug: "yapay-zeka-otomasyon",
    serviceNameTR: "Yapay Zekâ ve AI Otomasyon",
    serviceNameEN: "AI Automation & LLM Workflows",
    methods: [
      {
        id: "doc-extraction",
        labelTR: "LLM Doküman İşleme & Veri Ayrıştırma",
        labelEN: "LLM Document Extraction & Structuring",
        subTR: "Fatura, sözleşme, e-posta yapılandırılmış JSON",
        subEN: "Invoices, contracts, emails parsed into typed JSON",
        levelTR: "LLM Görev Otomasyonu",
        levelEN: "LLM Task Automation",
        coreTech: ["OpenAI / Anthropic API", "Zod Schema Validation", "Python / FastAPI"],
        summaryTR: "Karmaşık belgeleri, talepleri ve faturaları hatasız şemalarla yapılandırılmış veri modellerine dönüştürme.",
        summaryEN: "Structured extraction transforming unstructured documents and tickets into validated JSON schemas.",
        timelines: {
          standard: {
            database: { tr: "2 - 4 Gün", en: "2 - 4 Days" },
            api: { tr: "3 - 5 Gün", en: "3 - 5 Days" },
            dashboard: { tr: "1 Hafta", en: "1 Week" },
          },
          advanced: {
            database: { tr: "4 - 6 Gün", en: "4 - 6 Days" },
            api: { tr: "1 Hafta", en: "1 Week" },
            dashboard: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
          },
          enterprise: {
            database: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            api: { tr: "1.5 Hafta", en: "1.5 Weeks" },
            dashboard: { tr: "2 Hafta", en: "2 Weeks" },
          },
        },
      },
      {
        id: "custom-rag",
        labelTR: "Özel RAG & Şirket İçi Vektör Arama",
        labelEN: "Private RAG & Vector Search",
        subTR: "Şirket belgelerinden halüsinasyonsuz soru-cevap",
        subEN: "Hallucination-free Q&A over internal documents",
        levelTR: "Özel RAG & Vektör Asistanı",
        levelEN: "Custom RAG & Vector Assistant",
        coreTech: ["PGVector / Pinecone", "Hybrid Search", "Deterministic Guardrails"],
        summaryTR: "Şirket içi özel belgeler üzerinden halüsinasyonsuz, kaynak gösteren ve gizlilik odaklı akıllı soru-cevap sistemi.",
        summaryEN: "Internal document Q&A assistant utilizing vector embeddings and anti-hallucination guardrails.",
        timelines: {
          standard: {
            database: { tr: "4 - 7 Gün", en: "4 - 7 Days" },
            api: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            dashboard: { tr: "1.5 Hafta", en: "1.5 Weeks" },
          },
          advanced: {
            database: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            api: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            dashboard: { tr: "2 - 2.5 Hafta", en: "2 - 2.5 Weeks" },
          },
          enterprise: {
            database: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            api: { tr: "2 - 2.5 Hafta", en: "2 - 2.5 Weeks" },
            dashboard: { tr: "2.5 - 3.5 Hafta", en: "2.5 - 3.5 Weeks" },
          },
        },
      },
      {
        id: "tool-agent",
        labelTR: "Çoklu Araç Çalıştıran AI Ajanı",
        labelEN: "Tool-Calling Autonomous Agent",
        subTR: "API çağıran, SQL sorgulayan otonom iş ajanı",
        subEN: "Autonomous agent executing API calls and SQL queries",
        levelTR: "Otonom Araç Çalıştırıcı Ajan",
        levelEN: "Autonomous Tool-Calling Agent",
        coreTech: ["LangGraph / Multi-Agent", "Function Calling", "Audit Logging"],
        summaryTR: "Harici API'lara bağlanan, veritabanı sorgulayan ve operasyonel iş adımlarını kendi yürüten otonom ajan zinciri.",
        summaryEN: "Agentic workflow capable of querying databases, invoking external APIs, and executing multi-step tasks.",
        timelines: {
          standard: {
            database: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            api: { tr: "1.5 Hafta", en: "1.5 Weeks" },
            dashboard: { tr: "2 Hafta", en: "2 Weeks" },
          },
          advanced: {
            database: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            api: { tr: "2 - 2.5 Hafta", en: "2 - 2.5 Weeks" },
            dashboard: { tr: "2.5 - 3 Hafta", en: "2.5 - 3 Weeks" },
          },
          enterprise: {
            database: { tr: "2 - 2.5 Hafta", en: "2 - 2.5 Weeks" },
            api: { tr: "2.5 - 3 Hafta", en: "2.5 - 3 Weeks" },
            dashboard: { tr: "3 - 4 Hafta", en: "3 - 4 Weeks" },
          },
        },
      },
      {
        id: "human-loop",
        labelTR: "Onay Mekanizmalı Kurumsal Ajan",
        labelEN: "Human-in-the-Loop Enterprise Agent",
        subTR: "Kritik adımlarda insan onayı, rollback & denetim",
        subEN: "Human approval gates, rollback safety & audit logs",
        levelTR: "Kurumsal Kontrollü Ajan Mimarisi",
        levelEN: "Enterprise Supervised Agent System",
        coreTech: ["LangGraph State Machine", "Human Approval UI", "Role-Based Access Control"],
        summaryTR: "Kritik karar noktalarında insan onayı bekleyen, rollback güvenlikli ve tam izlenebilir kurumsal çoklu ajan kümesi.",
        summaryEN: "Mission-critical agent architecture featuring human-in-the-loop review checkpoints, state rollbacks, and compliance audits.",
        timelines: {
          standard: {
            database: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            api: { tr: "2 Hafta", en: "2 Weeks" },
            dashboard: { tr: "2.5 Hafta", en: "2.5 Weeks" },
          },
          advanced: {
            database: { tr: "2 - 2.5 Hafta", en: "2 - 2.5 Weeks" },
            api: { tr: "2.5 - 3 Hafta", en: "2.5 - 3 Weeks" },
            dashboard: { tr: "3 - 3.5 Hafta", en: "3 - 3.5 Weeks" },
          },
          enterprise: {
            database: { tr: "2.5 - 3.5 Hafta", en: "2.5 - 3.5 Weeks" },
            api: { tr: "3 - 4 Hafta", en: "3 - 4 Weeks" },
            dashboard: { tr: "4 - 5 Hafta", en: "4 - 5 Weeks" },
          },
        },
      },
    ],
  },
  "api-gelistirme": {
    slug: "api-gelistirme",
    serviceNameTR: "API Geliştirme ve Entegrasyon",
    serviceNameEN: "API Development & Integration",
    methods: [
      {
        id: "rest-crud",
        labelTR: "Hızlı REST API & Mikroservis",
        labelEN: "High-Speed REST API & Microservice",
        subTR: "FastAPI/Express, JWT koruma, Swagger dokümantasyon",
        subEN: "FastAPI / Express, JWT auth, Swagger docs",
        levelTR: "REST API & Mikroservis",
        levelEN: "REST API & Microservice",
        coreTech: ["FastAPI / Express", "PostgreSQL / Supabase", "OpenAPI Swagger"],
        summaryTR: "Temel CRUD uç noktaları, JWT kimlik doğrulama, şema validasyonu ve tam OpenAPI dokümantasyonu.",
        summaryEN: "Core CRUD endpoints, JWT authentication, typed schemas, and interactive Swagger documentation.",
        timelines: {
          standard: {
            database: { tr: "2 - 3 Gün", en: "2 - 3 Days" },
            api: { tr: "3 - 4 Gün", en: "3 - 4 Days" },
            dashboard: { tr: "5 - 7 Gün", en: "5 - 7 Days" },
          },
          advanced: {
            database: { tr: "3 - 5 Gün", en: "3 - 5 Days" },
            api: { tr: "4 - 6 Gün", en: "4 - 6 Days" },
            dashboard: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
          },
          enterprise: {
            database: { tr: "5 - 7 Gün", en: "5 - 7 Days" },
            api: { tr: "1 Hafta", en: "1 Week" },
            dashboard: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
          },
        },
      },
      {
        id: "integrations",
        labelTR: "Third-Party Servis & Webhook Entegrasyonu",
        labelEN: "Third-Party Services & Webhooks",
        subTR: "İyzico, Stripe, kargo, ERP ve SMS entegrasyonları",
        subEN: "Stripe, Iyzico, logistics, SMS & ERP integrations",
        levelTR: "Harici Servis Entegrasyon Hattı",
        levelEN: "External Integration Pipeline",
        coreTech: ["Stripe / Iyzico SDK", "Webhook Signature Verification", "Retry & Dead-Letter Queue"],
        summaryTR: "Ödeme, kargo, fatura veya operasyon araçlarını hatasız ve asenkron retry mekanizmalarıyla bağlayan entegrasyon.",
        summaryEN: "Resilient connection of external APIs and payment gateways with signature checks and retry queues.",
        timelines: {
          standard: {
            database: { tr: "3 - 5 Gün", en: "3 - 5 Days" },
            api: { tr: "4 - 6 Gün", en: "4 - 6 Days" },
            dashboard: { tr: "1 Hafta", en: "1 Week" },
          },
          advanced: {
            database: { tr: "4 - 6 Gün", en: "4 - 6 Days" },
            api: { tr: "1 Hafta", en: "1 Week" },
            dashboard: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
          },
          enterprise: {
            database: { tr: "1 Hafta", en: "1 Week" },
            api: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            dashboard: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
          },
        },
      },
      {
        id: "high-throughput",
        labelTR: "Yüksek Trafikli & Önbellekli Mimari",
        labelEN: "High-Throughput Caching Architecture",
        subTR: "Redis önbellek, rate limiting, sub-50ms yanıt",
        subEN: "Redis caching, rate limiting, sub-50ms latency",
        levelTR: "Yüksek Performanslı API Mimarisi",
        levelEN: "High-Throughput API Architecture",
        coreTech: ["Redis Caching", "PostgreSQL Connection Pooling", "Rate Limiting & CORS"],
        summaryTR: "Yüksek eşzamanlı istek hacmi altında 50ms altı yanıt süreleri sağlayan önbellekli ve dayanıklı API katmanı.",
        summaryEN: "High-concurrency API optimized with connection pooling and caching layers for sub-50ms response times.",
        timelines: {
          standard: {
            database: { tr: "4 - 7 Gün", en: "4 - 7 Days" },
            api: { tr: "1 Hafta", en: "1 Week" },
            dashboard: { tr: "1.5 Hafta", en: "1.5 Weeks" },
          },
          advanced: {
            database: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            api: { tr: "1.5 Hafta", en: "1.5 Weeks" },
            dashboard: { tr: "2 Hafta", en: "2 Weeks" },
          },
          enterprise: {
            database: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            api: { tr: "2 Hafta", en: "2 Weeks" },
            dashboard: { tr: "2.5 - 3 Hafta", en: "2.5 - 3 Weeks" },
          },
        },
      },
      {
        id: "event-stream",
        labelTR: "Olay Güdümlü Dağıtık Event Stream",
        labelEN: "Event-Driven Distributed Stream",
        subTR: "Kafka/Redis Streams, multi-tenant, asenkron kuyruk",
        subEN: "Kafka / Redis Streams, multi-tenant, event pipelines",
        levelTR: "Dağıtık Event Stream & Mikroservis",
        levelEN: "Distributed Event Stream Architecture",
        coreTech: ["Kafka / Redis Streams", "Microservices", "Prometheus Telemetry"],
        summaryTR: "Büyük veri hacimlerini asenkron işleyen, çoklu kiracılı (multi-tenant) kurumsal olay güdümlü mimari.",
        summaryEN: "Enterprise event-driven infrastructure decoupling message publishers and consumers with high fault tolerance.",
        timelines: {
          standard: {
            database: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            api: { tr: "1.5 Hafta", en: "1.5 Weeks" },
            dashboard: { tr: "2 Hafta", en: "2 Weeks" },
          },
          advanced: {
            database: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            api: { tr: "2 - 2.5 Hafta", en: "2 - 2.5 Weeks" },
            dashboard: { tr: "2.5 - 3 Hafta", en: "2.5 - 3 Weeks" },
          },
          enterprise: {
            database: { tr: "2 - 3 Hafta", en: "2 - 3 Weeks" },
            api: { tr: "2.5 - 3.5 Hafta", en: "2.5 - 3.5 Weeks" },
            dashboard: { tr: "3 - 4 Hafta", en: "3 - 4 Weeks" },
          },
        },
      },
    ],
  },
  "nextjs-gelistirme": {
    slug: "nextjs-gelistirme",
    serviceNameTR: "Next.js Web Uygulama Geliştirme",
    serviceNameEN: "Next.js Web App Development",
    methods: [
      {
        id: "landing-corporate",
        labelTR: "Hızlı Landing & Kurumsal Web Sitesi",
        labelEN: "High-Performance Landing & Corporate Web",
        subTR: "Next.js 16, Tailwind v4, 95+ Core Web Vitals",
        subEN: "Next.js 16, Tailwind v4, 95+ Core Web Vitals",
        levelTR: "Modern Kurumsal Web Arayüzü",
        levelEN: "Modern Corporate Web Interface",
        coreTech: ["Next.js 16 App Router", "Tailwind CSS v4", "Lucide React", "SEO Metadata"],
        summaryTR: "Ultra hızlı açılan, SEO puanları mükemmel ve her cihazda kusursuz çalışan kurumsal web deneyimi.",
        summaryEN: "Blazing-fast responsive corporate website engineered with Next.js 16 and top Core Web Vitals ratings.",
        timelines: {
          standard: {
            database: { tr: "2 - 4 Gün", en: "2 - 4 Days" },
            api: { tr: "3 - 5 Gün", en: "3 - 5 Days" },
            dashboard: { tr: "1 Hafta", en: "1 Week" },
          },
          advanced: {
            database: { tr: "3 - 5 Gün", en: "3 - 5 Days" },
            api: { tr: "5 - 7 Gün", en: "5 - 7 Days" },
            dashboard: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
          },
          enterprise: {
            database: { tr: "5 - 7 Gün", en: "5 - 7 Days" },
            api: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            dashboard: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
          },
        },
      },
      {
        id: "seo-content",
        labelTR: "SEO Odaklı Dinamik İçerik / Blog",
        labelEN: "SEO-First Dynamic Content & Blog",
        subTR: "Dinamik rotalar, JSON-LD, otomatik OG kartları",
        subEN: "Dynamic routes, JSON-LD schema, dynamic OG cards",
        levelTR: "Dinamik SEO İçerik Platformu",
        levelEN: "Dynamic SEO Content Platform",
        coreTech: ["Next.js Dynamic Routes", "ImageResponse OpenGraph", "Schema JSON-LD"],
        summaryTR: "Binlerce içeriği hızla indeksleten, otomatik sosyal medya görselleri üreten yüksek trafikli içerik platformu.",
        summaryEN: "Scalable content architecture featuring programmatic SEO routes and automatic metadata cards.",
        timelines: {
          standard: {
            database: { tr: "4 - 6 Gün", en: "4 - 6 Days" },
            api: { tr: "1 Hafta", en: "1 Week" },
            dashboard: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
          },
          advanced: {
            database: { tr: "1 Hafta", en: "1 Week" },
            api: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            dashboard: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
          },
          enterprise: {
            database: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            api: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            dashboard: { tr: "2 - 2.5 Hafta", en: "2 - 2.5 Weeks" },
          },
        },
      },
      {
        id: "dashboard-panel",
        labelTR: "Kapsamlı Dashboard & Yönetim Paneli",
        labelEN: "Full Admin Dashboard & Analytics",
        subTR: "Rol bazlı yetki (RBAC), canlı grafikler, tablolar",
        subEN: "Role-based ACL, real-time charts, data grids",
        levelTR: "Özel Yönetim & Analiz Paneli",
        levelEN: "Custom Admin & Analytics Dashboard",
        coreTech: ["NextAuth / JWT", "TanStack Table / Charts", "Server Actions"],
        summaryTR: "İşletmenizin tüm verilerini yönetebileceğiniz, rol yetkilendirmeli ve interaktif filtrelemeli yönetim konsolu.",
        summaryEN: "Role-protected administrative console with data filters, charts, and real-time management actions.",
        timelines: {
          standard: {
            database: { tr: "1 Hafta", en: "1 Week" },
            api: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            dashboard: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
          },
          advanced: {
            database: { tr: "1.5 Hafta", en: "1.5 Weeks" },
            api: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            dashboard: { tr: "2 - 2.5 Hafta", en: "2 - 2.5 Weeks" },
          },
          enterprise: {
            database: { tr: "2 Hafta", en: "2 Weeks" },
            api: { tr: "2 - 2.5 Hafta", en: "2 - 2.5 Weeks" },
            dashboard: { tr: "2.5 - 3.5 Hafta", en: "2.5 - 3.5 Weeks" },
          },
        },
      },
      {
        id: "saas-platform",
        labelTR: "Uçtan Uca SaaS & Abonelik Platformu",
        labelEN: "End-to-End SaaS & Subscription Platform",
        subTR: "Stripe/İyzico ödeme, üyelik, i18n, e-posta",
        subEN: "Stripe / Iyzico billing, customer portals, i18n",
        levelTR: "Kapsamlı SaaS Platformu",
        levelEN: "Full-Featured SaaS Platform",
        coreTech: ["Next.js 16", "Stripe Checkout / Webhooks", "i18n Localization", "Resend Email"],
        summaryTR: "Abonelik ödemeleri, müşteri portalı, çoklu dil ve otomatik faturalandırma içeren anahtar teslim SaaS ürünü.",
        summaryEN: "Complete production-ready SaaS application with billing subscriptions, multi-tenancy, and internationalization.",
        timelines: {
          standard: {
            database: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            api: { tr: "2 Hafta", en: "2 Weeks" },
            dashboard: { tr: "2.5 Hafta", en: "2.5 Weeks" },
          },
          advanced: {
            database: { tr: "2 - 2.5 Hafta", en: "2 - 2.5 Weeks" },
            api: { tr: "2.5 - 3 Hafta", en: "2.5 - 3 Weeks" },
            dashboard: { tr: "3 - 3.5 Hafta", en: "3 - 3.5 Weeks" },
          },
          enterprise: {
            database: { tr: "2.5 - 3.5 Hafta", en: "2.5 - 3.5 Weeks" },
            api: { tr: "3.5 - 4.5 Hafta", en: "3.5 - 4.5 Weeks" },
            dashboard: { tr: "4 - 6 Hafta", en: "4 - 6 Weeks" },
          },
        },
      },
    ],
  },
  "ozel-yazilim-gelistirme": {
    slug: "ozel-yazilim-gelistirme",
    serviceNameTR: "Özel Yazılım Geliştirme",
    serviceNameEN: "Custom Software Development",
    methods: [
      {
        id: "internal-tool",
        labelTR: "Odaklanmış İç Operasyon Aracı",
        labelEN: "Focused Internal Tool & Automation",
        subTR: "Manuel Excel ve karmaşık tabloları bitiren çözüm",
        subEN: "Replaces manual spreadsheets and scattered workflows",
        levelTR: "Özel Operasyon & İş Akışı Aracı",
        levelEN: "Custom Workflow Tool",
        coreTech: ["Next.js / Node.js", "PostgreSQL", "Workflow Automation"],
        summaryTR: "İşletmenizin tekrarlayan manuel iş yüklerini sıfırlayan, hızlı ve hedefe yönelik özel iç uygulama.",
        summaryEN: "Focused internal application eliminating manual spreadsheet friction and automating repetitive data entry.",
        timelines: {
          standard: {
            database: { tr: "3 - 5 Gün", en: "3 - 5 Days" },
            api: { tr: "4 - 6 Gün", en: "4 - 6 Days" },
            dashboard: { tr: "1 Hafta", en: "1 Week" },
          },
          advanced: {
            database: { tr: "1 Hafta", en: "1 Week" },
            api: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            dashboard: { tr: "1.5 Hafta", en: "1.5 Weeks" },
          },
          enterprise: {
            database: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            api: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            dashboard: { tr: "2 Hafta", en: "2 Weeks" },
          },
        },
      },
      {
        id: "reporting-portal",
        labelTR: "Özel Veri & Raporlama Portalı",
        labelEN: "Custom Data & Reporting Portal",
        subTR: "Farklı kaynakları birleştiren analitik arayüzü",
        subEN: "Unified analytics dashboard across disparate data sources",
        levelTR: "Veri Konsolidasyon & Raporlama",
        levelEN: "Data Reporting Portal",
        coreTech: ["FastAPI / Node.js", "Redis Caching", "Data Analytics UI"],
        summaryTR: "Farklı yazılımlarınızdaki verileri tek bir merkezde toplayıp anlamlı iş zekası raporlarına dönüştüren portal.",
        summaryEN: "Centralized business intelligence portal consolidating metrics from multiple external tools.",
        timelines: {
          standard: {
            database: { tr: "4 - 7 Gün", en: "4 - 7 Days" },
            api: { tr: "1 Hafta", en: "1 Week" },
            dashboard: { tr: "1.5 Hafta", en: "1.5 Weeks" },
          },
          advanced: {
            database: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            api: { tr: "1.5 Hafta", en: "1.5 Weeks" },
            dashboard: { tr: "2 Hafta", en: "2 Weeks" },
          },
          enterprise: {
            database: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            api: { tr: "2 Hafta", en: "2 Weeks" },
            dashboard: { tr: "2.5 - 3 Hafta", en: "2.5 - 3 Weeks" },
          },
        },
      },
      {
        id: "b2b-saas",
        labelTR: "Kapsamlı B2B / SaaS İşletme Yazılımı",
        labelEN: "Full-Scale B2B / SaaS Business System",
        subTR: "Çok kullanıcılı, yetkilendirmeli, uçtan uca ürün",
        subEN: "Multi-tenant, role-isolated, end-to-end platform",
        levelTR: "Uçtan Uca B2B / SaaS Yazılımı",
        levelEN: "End-to-End B2B Platform",
        coreTech: ["Next.js 16 App Router", "PostgreSQL / Redis", "Stripe / Iyzico", "RBAC Auth"],
        summaryTR: "Müşterilerinizin veya bayilerinizin doğrudan kullanabileceği, ödeme ve yetki altyapısı hazır anahtar teslim ürün.",
        summaryEN: "Scalable B2B web application ready for commercial deployment with billing, tenant isolation, and custom business logic.",
        timelines: {
          standard: {
            database: { tr: "1 - 1.5 Hafta", en: "1 - 1.5 Weeks" },
            api: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            dashboard: { tr: "2 Hafta", en: "2 Weeks" },
          },
          advanced: {
            database: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            api: { tr: "2 - 2.5 Hafta", en: "2 - 2.5 Weeks" },
            dashboard: { tr: "2.5 - 3 Hafta", en: "2.5 - 3 Weeks" },
          },
          enterprise: {
            database: { tr: "2 - 3 Hafta", en: "2 - 3 Weeks" },
            api: { tr: "2.5 - 3.5 Hafta", en: "2.5 - 3.5 Weeks" },
            dashboard: { tr: "3.5 - 5 Hafta", en: "3.5 - 5 Weeks" },
          },
        },
      },
      {
        id: "enterprise-platform",
        labelTR: "Kurumsal Entegrasyon & Özel Platform",
        labelEN: "Enterprise Custom Platform Architecture",
        subTR: "Dağıtık mikroservisler, yüksek güvenlik & ölçek",
        subEN: "Distributed microservices, enterprise security & scale",
        levelTR: "Kurumsal Özel Platform Mimarisi",
        levelEN: "Enterprise Platform Architecture",
        coreTech: ["Distributed Microservices", "Kafka / Celery", "Prometheus / Docker", "CI/CD"],
        summaryTR: "Kurumsal güvenlik standartlarına uygun, yüksek hacimli işlemleri kesintisiz yürüten dağıtık özel yazılım mimarisi.",
        summaryEN: "Enterprise-grade distributed system tailored to strict proprietary business rules and high-availability SLAs.",
        timelines: {
          standard: {
            database: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
            api: { tr: "2 - 2.5 Hafta", en: "2 - 2.5 Weeks" },
            dashboard: { tr: "2.5 - 3 Hafta", en: "2.5 - 3 Weeks" },
          },
          advanced: {
            database: { tr: "2 - 3 Hafta", en: "2 - 3 Weeks" },
            api: { tr: "2.5 - 3.5 Hafta", en: "2.5 - 3.5 Weeks" },
            dashboard: { tr: "3.5 - 4.5 Hafta", en: "3.5 - 4.5 Weeks" },
          },
          enterprise: {
            database: { tr: "3 - 4 Hafta", en: "3 - 4 Weeks" },
            api: { tr: "3.5 - 5 Hafta", en: "3.5 - 5 Weeks" },
            dashboard: { tr: "5 - 7 Hafta", en: "5 - 7 Weeks" },
          },
        },
      },
    ],
  },
};

export function getServiceConfig(slug?: string): ServiceCalculatorData {
  if (!slug) return serviceConfigs["web-scraping"];
  const clean = slug.toLowerCase();
  if (serviceConfigs[clean]) return serviceConfigs[clean];
  if (clean.includes("scraping")) return serviceConfigs["web-scraping"];
  if (clean.includes("fiyat") || clean.includes("competitor") || clean.includes("price")) return serviceConfigs["rakip-fiyat-takip-sistemi"];
  if (clean.includes("aktarim") || clean.includes("migration") || clean.includes("catalog")) return serviceConfigs["e-ticaret-urun-veri-aktarimi"];
  if (clean.includes("zeka") || clean.includes("ai")) return serviceConfigs["yapay-zeka-otomasyon"];
  if (clean.includes("api")) return serviceConfigs["api-gelistirme"];
  if (clean.includes("nextjs")) return serviceConfigs["nextjs-gelistirme"];
  if (clean.includes("ozel") || clean.includes("yazilim") || clean.includes("custom")) return serviceConfigs["ozel-yazilim-gelistirme"];
  return serviceConfigs["web-scraping"];
}
