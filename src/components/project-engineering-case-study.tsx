"use client";

import { motion } from "framer-motion";
import { Database, Zap, Search, ShieldCheck, Server, RefreshCw, Cpu, Layers, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/translations";

export interface EngineeringMetric {
  value: string;
  label: { tr: string; en: string };
  subtext: { tr: string; en: string };
  icon: typeof Zap;
  color: "red" | "emerald" | "blue" | "amber" | "purple";
}

export interface ArchitectureStep {
  step: string;
  title: { tr: string; en: string };
  desc: { tr: string; en: string };
  badge: { tr: string; en: string };
}

export interface DeepWarStory {
  title: { tr: string; en: string };
  subtitle: { tr: string; en: string };
  problem: { tr: string; en: string };
  solution: { tr: string; en: string };
  impact: { tr: string; en: string };
}

export interface EngineeringCaseStudyData {
  metrics: EngineeringMetric[];
  architectureSteps: ArchitectureStep[];
  warStories: DeepWarStory[];
}

export const HABER_PORTALI_ENGINEERING_DATA: EngineeringCaseStudyData = {
  metrics: [
    {
      value: "150+",
      label: { tr: "Eşzamanlı Veri Kaynağı", en: "Simultaneous News Sources" },
      subtext: { tr: "7/24 Kesintisiz Çoklu İşçi Protokolü", en: "Zero-Downtime Multi-Worker Ingestion" },
      icon: Layers,
      color: "red",
    },
    {
      value: "200 MB",
      label: { tr: "60.000+ Zengin Haber", en: "60,000+ Full Articles" },
      subtext: { tr: "Ultra Optimize BSON & Şema Sıkıştırma", en: "Ultra-Lean BSON & Schema Compression" },
      icon: Database,
      color: "emerald",
    },
    {
      value: "<50 ms",
      label: { tr: "Tek Kelime Hızlı Arama", en: "Full-Text Search Latency" },
      subtext: { tr: "Bileşik Ters İndeksleme Mimarisi", en: "Compound Reverse Indexing Engine" },
      icon: Search,
      color: "blue",
    },
    {
      value: "5 Dk",
      label: { tr: "Otonom Akış Döngüsü", en: "Autonomous Sync Cycle" },
      subtext: { tr: "Hedef Siteden Önce Düşen Akış", en: "Pre-Hydration Protocol Interception" },
      icon: RefreshCw,
      color: "amber",
    },
    {
      value: "$0",
      label: { tr: "Ek Altyapı Maliyeti", en: "Bloated Server Spend" },
      subtext: { tr: "Hafif & Yüksek Verimli Hat", en: "High-Efficiency Protocol Pipeline" },
      icon: ShieldCheck,
      color: "purple",
    },
  ],
  architectureSteps: [
    {
      step: "01",
      title: { tr: "150+ Dinamik Hedef Kaynak", en: "150+ Dynamic Target Sources" },
      desc: {
        tr: "Ulusal ve yerel 150'den fazla haber portalının API, RSS ve dinamik DOM yapıları eşzamanlı izlenir.",
        en: "Simultaneously monitoring APIs, RSS streams, and dynamic DOM feeds across 150+ national/local news outlets.",
      },
      badge: { tr: "Veri Girişi", en: "Ingestion" },
    },
    {
      step: "02",
      title: { tr: "Hafif Protokol & Stealth Scraper", en: "Lightweight Protocol & Stealth Scraper" },
      desc: {
        tr: "Gereksiz tarayıcı yükünü sıfırlayan hafif HTTP istemcisi; Cloudflare/WAF korumalı sitelerde izole Playwright Stealth motoru.",
        en: "High-speed HTTP client for raw protocol interception, backed by isolated Playwright Stealth for WAF challenges.",
      },
      badge: { tr: "Bypass & Kazıma", en: "Scraping" },
    },
    {
      step: "03",
      title: { tr: "Arındırma, Hash & Mükerrer Kontrolü", en: "Sanitization & Deduplication Pipeline" },
      desc: {
        tr: "HTML çöplerinden arındırılan veri, URL ve başlık hash'leri üzerinden milisaniyeler içinde tekilleştirilir.",
        en: "Raw HTML bloat is stripped; unique URL/title hashing guarantees zero duplicate entries across pipelines.",
      },
      badge: { tr: "Normalizasyon", en: "Sanitization" },
    },
    {
      step: "04",
      title: { tr: "200MB Lean MongoDB & Bileşik İndeks", en: "200MB Lean MongoDB & Compound Index" },
      desc: {
        tr: "Kısaltılmış alan adları ve optimize BSON tipleriyle 60.000 dopdolu haber yalnızca 200MB alanda saklanır.",
        en: "Shortened schema keys and lean BSON typing store 60,000 rich articles inside a strict 200MB footprint.",
      },
      badge: { tr: "Ultra Sıkıştırma", en: "Storage Opt" },
    },
    {
      step: "05",
      title: { tr: "Serverless ISR & Reaktif Arama", en: "Serverless ISR & Reactive Search" },
      desc: {
        tr: "Tek bir kelimeden <50ms'de sonuç getiren ters tam metin araması ve 60 saniyelik reaktif ISR önbellek sunumu.",
        en: "Sub-50ms full-text keyword retrieval powered by compound indexes and 60-second Incremental Static Regeneration.",
      },
      badge: { tr: "Canlı Sunum", en: "Delivery" },
    },
  ],
  warStories: [
    {
      title: {
        tr: "200 MB Alanda 60.000 Zengin Haberi Saklama Sanatı",
        en: "The 200MB Storage Feat: 60,000 Rich Articles in Ultra-Lean MongoDB",
      },
      subtitle: {
        tr: "Veritabanı Şişkinliğini Sıfırlayan BSON Optimizasyonu",
        en: "Eliminating Database Bloat via Schema & Index Engineering",
      },
      problem: {
        tr: "Geleneksel CMS ve scraping sistemlerinde 10.000 tam sayfa haber depolandığında veritabanı boyutu 2-5 GB'a fırlar, RAM kilitlenir ve sunucu maliyetleri katlanır.",
        en: "Traditional CMS and scraping architectures balloon to 2-5 GB after merely 10,000 articles, saturating RAM and inflating cloud database tiers.",
      },
      solution: {
        tr: "Şema seviyesinde gereksiz DOM meta verileri budandı, alan adları optimize edildi ve yalnızca arama için kritik bileşik (compound) indeksler tutuldu. 14 günden eski veriler ise otomatik olarak Telegram Bot API üzerinden sıkıştırılmış .json olarak arşivlenip ana depolama hafifletildi.",
        en: "Stripped redundant DOM metadata, engineered short schema keys, and tuned compound index sizes. Articles older than 14 days are automatically exported to Telegram Bot API as compressed JSON document archives, keeping primary storage ultra-lean.",
      },
      impact: {
        tr: "200 MB gibi kısıtlı bir kotada 60.000 dopdolu haber sıfır bellek darboğazı ve $0 ek altyapı faturasıyla 7/24 çalışır hale getirildi.",
        en: "Accomplished 60,000 full-page records in a strict 200MB tier with zero memory bottlenecks and $0 bloated database upgrades.",
      },
    },
    {
      title: {
        tr: "150+ Kaynaktan Eşzamanlı ve Sıfır Kopmalı Veri Akışı",
        en: "150+ Concurrent News Sources with Zero Downtime",
      },
      subtitle: {
        tr: "Farklı DOM Mimarilerini Yöneten İzole İşçi Kuyrukları",
        en: "Isolated Worker Architecture Across Diverse Target Structures",
      },
      problem: {
        tr: "150 farklı sitenin her birinde farklı HTML etiketleri, anti-bot filtreleri ve anlık çökme riskleri vardır. Tek bir sitenin yapısı değiştiğinde tüm kazıma hattının çökmesi sık görülen bir problemdir.",
        en: "150 independent outlets present completely different DOM structures, WAF anti-bot barriers, and transient timeouts. A breaking change on one site often crashes standard monolithic crawlers.",
      },
      solution: {
        tr: "Her kaynak için izole çalışan hata toleranslı (fault-tolerant) asenkron işçiler kurgulandı. Ağır siteler için hafif HTTP protokol dinleyicileri, Cloudflare korumalı zorlu hedefler için ise dinamik Playwright Stealth devreye sokuldu.",
        en: "Built isolated, fault-tolerant async worker pipelines with exponential backoff. Lightweight HTTP listeners handle raw streams, dynamically promoting to Playwright Stealth only when WAF challenges are detected.",
      },
      impact: {
        tr: "150'den fazla kaynak aynı anda taranırken sıfır kesinti, otomatik kendini onarma (self-healing) ve 5 dakikalık taze veri döngüsü sağlandı.",
        en: "Continuous, non-blocking ingestion across 150+ simultaneous publishers with self-healing recovery and a 5-minute freshness cycle.",
      },
    },
    {
      title: {
        tr: "Pre-Hydration Hız Üstünlüğü: Haberi Kaynak Siteden Önce Yakalamak",
        en: "Pre-Hydration Speed Supremacy: Intercepting News Ahead of Publisher Frontends",
      },
      subtitle: {
        tr: "Ağır JavaScript Yüklemesini Beklemeyen Doğrudan Veri Akışı",
        en: "Direct Protocol Streaming Beating Client-Side Client Hydration",
      },
      problem: {
        tr: "Geleneksel botlar sayfaların yüklenmesini, JavaScript render edilmesini ve reklamların açılmasını beklerken saniyeler kaybeder.",
        en: "Conventional browser bots waste precious seconds waiting for full-page renders, JavaScript client hydration, and advertising trackers.",
      },
      solution: {
        tr: "Kaynak sitelerin arka uç veri yayınlarını ve API akışlarını doğrudan protokol seviyesinde yakalayan akıllı bir dinleyici mimarisi inşa edildi. Sayfa arayüzü çizilmeden önce ham içerik çekilip işlendi.",
        en: "Constructed direct protocol-level stream listeners that intercept raw publisher data pipelines at the network layer before frontend DOM hydration occurs.",
      },
      impact: {
        tr: "Haber henüz yayıncının kendi son kullanıcı arayüzünde tam görünmeden bizim sistemimizde filtrelenip yayına hazır hale getirildi.",
        en: "Articles are ingested, sanitized, and ready for query before the target publisher's own web UI completes rendering.",
      },
    },
    {
      title: {
        tr: "Tek Kelimeyle 60.000 Haberi <50ms'de Tarayan Ters İndeks Arama",
        en: "Sub-50ms Full-Text Keyword Search Across 60,000 Articles",
      },
      subtitle: {
        tr: "Pahalı Arama Kümelerine İhtiyaç Duymayan Optimize Arama Katmanı",
        en: "ElasticSearch-Level Search Velocity with Zero External Cluster Overhead",
      },
      problem: {
        tr: "Büyük veri kümelerinde tam metin arama yapmak için genelde pahalı harici ElasticSearch veya Algolia kümeleri gerekir.",
        en: "Performing instantaneous full-text searches over tens of thousands of articles traditionally requires costly dedicated ElasticSearch or Algolia clusters.",
      },
      solution: {
        tr: "MongoDB üzerinde özel bileşik ters indeksler (Compound Text Indexes) ve optimize edilmiş regex sorgu yürütücüsü kurgulandı. Arama kutusuna tek bir kelime yazıldığı anda indeks tablosu üzerinden doğrudan hedefe ulaşıldı.",
        en: "Engineered compound text indexes and lean regex query execution directly on the primary database, performing direct index-tree lookups from single-word queries.",
      },
      impact: {
        tr: "60.000 kayıt arasında 50 milisaniyenin altında akıcı, anlık arama deneyimi; sıfır harici servis maliyeti.",
        en: "Sub-50ms query response times across 60,000 records with zero external SaaS fees or infrastructure overhead.",
      },
    },
  ],
};

export const BIST_AI_ENGINEERING_DATA: EngineeringCaseStudyData = {
  metrics: [
    {
      value: "500+",
      label: { tr: "BIST Hisse Kapsamı", en: "Tracked Equities" },
      subtext: { tr: "Tüm Borsa İstanbul Hisselerinde Anlık İzleme", en: "Real-Time Market Data Across All BIST Equities" },
      icon: Layers,
      color: "blue",
    },
    {
      value: "<20 ms",
      label: { tr: "API Yanıt Süresi", en: "API Latency" },
      subtext: { tr: "Redis Bellek İçi Hot-Cache Mimarisi", en: "Redis In-Memory Hot Cache Layer" },
      icon: Zap,
      color: "emerald",
    },
    {
      value: "10+",
      label: { tr: "Teknik İndikatör", en: "Technical Indicators" },
      subtext: { tr: "RSI, MACD, Bollinger, EMA, SMA, Stochastic", en: "Vectorized Multi-Period Mathematical Engine" },
      icon: Cpu,
      color: "amber",
    },
    {
      value: "0%",
      label: { tr: "LLM Halüsinasyon Riski", en: "LLM Hallucination Rate" },
      subtext: { tr: "Deterministik Finansal Oran ve JSON Guardrail", en: "Deterministic Financial Guardrails & Strict JSON" },
      icon: ShieldCheck,
      color: "purple",
    },
    {
      value: "100%",
      label: { tr: "Otonom Bilanço Ayrıştırma", en: "Autonomous Balance Parsing" },
      subtext: { tr: "KAP ve Çeyreklik Finansal Rapor Motoru", en: "Automated Quarterly Financial Statement Parser" },
      icon: Database,
      color: "red",
    },
  ],
  architectureSteps: [
    {
      step: "01",
      title: { tr: "Anlık Piyasa & KAP Veri Girişi", en: "Live Market & Disclosure Ingestion" },
      desc: {
        tr: "500'den fazla hissenin fiyat akışları, derinlik verileri ve KAP bildirimleri asenkron tarayıcı ve API protokolleriyle toplanır.",
        en: "Asynchronous stream ingestion pulling price feeds, market depth, and corporate disclosures across 500+ equities.",
      },
      badge: { tr: "Veri Girişi", en: "Market Feed" },
    },
    {
      step: "02",
      title: { tr: "Python / FastAPI Analitik Motoru", en: "Python / FastAPI Analytics Engine" },
      desc: {
        tr: "Vektörize matematiksel dizilerle (NumPy/Pandas) RSI, MACD ve hareketli ortalamalar milisaniyeler içinde hesaplanır.",
        en: "Vectorized mathematical processing computing RSI, MACD, Bollinger Bands, and moving averages in milliseconds.",
      },
      badge: { tr: "Hesaplama", en: "Vector Engine" },
    },
    {
      step: "03",
      title: { tr: "Deterministik Oranlar & LLM Bilanço Analizi", en: "Deterministic Ratios & LLM Analysis" },
      desc: {
        tr: "Tüm finansal rasyolar (F/K, PD/DD, FAVÖK) matematiksel olarak doğrulanır; yapılandırılmış JSON istemleriyle LLM yorumu üretilir.",
        en: "Deterministic validation of all financial ratios (P/E, P/B, EBITDA) fed into structured JSON schemas for AI commentary.",
      },
      badge: { tr: "AI & Analiz", en: "AI Reasoning" },
    },
    {
      step: "04",
      title: { tr: "PostgreSQL & Redis Hot-Cache", en: "PostgreSQL & Redis Hot-Cache" },
      desc: {
        tr: "Geçmiş veri PostgreSQL'de saklanırken, anlık finansal göstergeler Redis üzerinde <20ms erişim için önbelleklenir.",
        en: "Historical time-series persisted in PostgreSQL; hot analytical snapshots cached in Redis for <20ms query velocity.",
      },
      badge: { tr: "Hibrit Bellek", en: "Storage & Cache" },
    },
    {
      step: "05",
      title: { tr: "Reaktif Next.js Finans Terminali", en: "Reactive Next.js Financial Terminal" },
      desc: {
        tr: "Recharts ve dinamik veri bağlama ile hisse filtreleme, teknik puanlama ve görsel analizler sıfır gecikmeyle sunulur.",
        en: "Dynamic Recharts charting, instant stock screening, and interactive financial scorecards delivered with zero UI lag.",
      },
      badge: { tr: "Canlı Terminal", en: "Terminal UI" },
    },
  ],
  warStories: [
    {
      title: {
        tr: "Redis Hot-Cache ile 500+ Hissede <20ms API Yanıt Süresi",
        en: "Sub-20ms API Response via Redis Hot Cache Across 500+ Equities",
      },
      subtitle: {
        tr: "Piyasa Saatlerinde SQL Darboğazını Sıfırlayan Önbellek Mimarisi",
        en: "Eliminating Database Bottlenecks During Peak Trading Hours",
      },
      problem: {
        tr: "Piyasa açıkken 500'den fazla hissenin anlık teknik göstergelerini doğrudan veritabanından hesaplamak 800ms'lik gecikmelere ve CPU kilitlenmelerine yol açıyordu.",
        en: "Calculating real-time indicators directly from relational SQL queries during market hours caused 800ms+ latency spikes and severe CPU bottlenecks.",
      },
      solution: {
        tr: "Redis üzerinde çok katmanlı TTL önbellekleme kurgulandı. Önceden hesaplanan teknik özetler serialize edilmiş bellek içi arabelleklerde (in-memory buffer) tutuldu ve sadece veri değiştiğinde geçersiz kılındı.",
        en: "Engineered a tiered Redis TTL caching strategy. Pre-computed analytical snapshots are stored in memory, invalidating only upon verified new tick intervals.",
      },
      impact: {
        tr: "API yanıt süreleri 800ms'den 20ms'nin altına indirildi (%97.5 hızlanma); binlerce eşzamanlı sorgu sıfır sunucu yorgunluğuyla karşılandı.",
        en: "Slashed API response times from 800ms to under 20ms (97.5% improvement), handling concurrent requests effortlessly.",
      },
    },
    {
      title: {
        tr: "Vektörize Analitik Motoru: 10+ Teknik Göstergeyi Milisaniyede Hesaplama",
        en: "Vectorized Indicator Pipeline: 10+ Technical Indicators in Milliseconds",
      },
      subtitle: {
        tr: "Python Döngü Yavaşlığını Ortadan Kaldıran Matematiksel Mimari",
        en: "Bypassing Python Loop Overhead via Vectorized Math Arrays",
      },
      problem: {
        tr: "Geleneksel Python for-loop döngüleriyle RSI, MACD, Bollinger ve hareketli ortalamaları 500 hisse için hesaplamak saniyeler sürüyordu.",
        en: "Traditional Python iterative loops computing multi-period RSI, MACD, and Bollinger Bands took several seconds across large ticker universes.",
      },
      solution: {
        tr: "Hesaplama motoru vektörize matematiksel matrisler (NumPy/Pandas) üzerine yeniden inşa edildi ve asenkron FastAPI uç noktalarıyla birleştirildi.",
        en: "Rebuilt the calculation pipeline utilizing vectorized array operations (NumPy/Pandas) integrated into non-blocking asynchronous FastAPI endpoints.",
      },
      impact: {
        tr: "10'dan fazla karmaşık teknik indikatör tüm BIST hisseleri için tek haneli milisaniyelerde hesaplandı.",
        en: "Computed 10+ complex technical indicators across the entire market universe in single-digit milliseconds.",
      },
    },
    {
      title: {
        tr: "Sıfır Halüsinasyon: Deterministik Guardrail ile Güvenilir Bilanço Analizi",
        en: "Zero-Hallucination AI: Deterministic Guardrails for Financial Statements",
      },
      subtitle: {
        tr: "Yapay Zekânın Yanılsamasını Engelleyen İki Aşamalı Finansal Doğrulama",
        en: "Two-Stage Pipeline Guaranteeing Audit-Grade Balance Sheet Scoring",
      },
      problem: {
        tr: "Ham finansal tablolar doğrudan genel LLM modellerine verildiğinde kâr rakamlarını uydurma, rasyoları yanlış hesaplama ve kritik finansal yanılsamalar (hallucination) yaşanır.",
        en: "Feeding raw balance sheets directly into generic LLMs frequently causes fabricated financial ratios, distorted EBITDA calculations, and dangerous hallucinations.",
      },
      solution: {
        tr: "İki aşamalı hibrit bir boru hattı kuruldu: Önce deterministik Python motoru tüm rasyoları (F/K, PD/DD, Net Borç/FAVÖK) matematiksel olarak hesaplar; ardından bu doğrulanmış kesin sayılar yapılandırılmış katı JSON şemasıyla LLM'e sadece yorumlatılır.",
        en: "Constructed a strict two-stage pipeline: a deterministic mathematical engine first computes exact financial metrics, then feeds verified structured JSON payloads to the LLM solely for qualitative executive synthesis.",
      },
      impact: {
        tr: "Bilanço puanlamasında %0 halüsinasyon oranı sağlandı; yatırımcıya ve analiste güvenilir, kurumsal düzeyde özetler üretildi.",
        en: "Achieved a 0% hallucination rate in balance sheet scoring, delivering enterprise-grade financial summaries.",
      },
    },
    {
      title: {
        tr: "Otonom KAP Bildirimi ve Çeyreklik Bilanço Çıkarım Motoru",
        en: "Autonomous Corporate Disclosure & Quarterly Statement Parser",
      },
      subtitle: {
        tr: "Karmaşık Finansal Tabloları Standartlaştıran Otomasyon",
        en: "Automating Unstructured Financial Table Normalization",
      },
      problem: {
        tr: "Farklı şirketlerin çeyreklik finansal raporları, dipnotları ve KAP bildirimleri standart olmayan karmaşık tablo yapılarında yayınlanır.",
        en: "Public disclosure reports arrive with inconsistent accounting item naming, nested table layouts, and irregular publishing schedules.",
      },
      solution: {
        tr: "Düzensiz finansal kalemleri eşleştiren, dönemsel karşılaştırmaları (YoY ve QoQ) otomatik çıkaran ve veritabanına normalize edilmiş şemayla yazan otonom bir ayrıştırma motoru geliştirildi.",
        en: "Engineered an intelligent parser that reconciles disparate accounting line items, calculates year-over-year (YoY) and quarter-over-quarter (QoQ) deltas, and stores normalized models.",
      },
      impact: {
        tr: "Çeyreklik bilançolar yayınlandığı anda sıfır insan müdahalesiyle dakikalar içinde işlenip puanlandı.",
        en: "Quarterly statements are ingested, parsed, and scored within minutes of publication with 100% autonomy.",
      },
    },
  ],
};

export const FREE_API_ENGINEERING_DATA: EngineeringCaseStudyData = {
  metrics: [
    {
      value: "500+",
      label: { tr: "Doğrulanmış REST API", en: "Verified REST APIs" },
      subtext: { tr: "46 Dikey Kategoride 7/24 İzlenen Dizin", en: "Continuously Monitored Across 46 Categories" },
      icon: Layers,
      color: "blue",
    },
    {
      value: "<30 ms",
      label: { tr: "Canlı Sandbox Yanıtı", en: "Sandbox Execution Latency" },
      subtext: { tr: "İnteraktif Terminal & Canlı JSON Konsolu", en: "In-Browser Interactive Terminal & JSON Viewer" },
      icon: Zap,
      color: "emerald",
    },
    {
      value: "46",
      label: { tr: "Çift Dilli Kategori", en: "Bilingual Categories" },
      subtext: { tr: "Finans, AI, Siber Güvenlik, Hava Durumu, Kripto", en: "Finance, AI, Cybersecurity, Weather, Crypto" },
      icon: Database,
      color: "purple",
    },
    {
      value: "100%",
      label: { tr: "SSRF & Bot Koruması", en: "SSRF & Bot Shielding" },
      subtext: { tr: "İzole Sunucu Tarafı Güvenlik Duvarı", en: "Isolated Serverless Edge Security Firewall" },
      icon: ShieldCheck,
      color: "red",
    },
    {
      value: "3 Dilde",
      label: { tr: "Anlık Kod Üretimi", en: "Multi-Language Snippets" },
      subtext: { tr: "Tek Tıkla cURL, TypeScript, Python Kod Blokları", en: "One-Click Copyable cURL, JS/TS & Python Code" },
      icon: Cpu,
      color: "amber",
    },
  ],
  architectureSteps: [
    {
      step: "01",
      title: { tr: "500+ API Otomasyonu & Sağlık Kontrolü", en: "500+ API Health & Ingestion Engine" },
      desc: {
        tr: "46 kategorideki yüzlerce endpoint'in erişilebilirliği, auth tipleri ve yanıt kodları periyodik olarak doğrulanır.",
        en: "Periodic automated validation checking uptime, authentication headers, and response formats across hundreds of endpoints.",
      },
      badge: { tr: "Sağlık Takibi", en: "Health Check" },
    },
    {
      step: "02",
      title: { tr: "Güvenli Edge Sandbox & SSRF Kalkanı", en: "Secure Edge Sandbox & SSRF Guard" },
      desc: {
        tr: "Kullanıcı istekleri yerel ağ erişimlerini (127.0.0.1, 10.0.0.0/8) engelleyen izole serverless proxy katmanından geçirilir.",
        en: "User-triggered API test runs are routed through an isolated serverless proxy with strict CIDR IP blacklists preventing SSRF attacks.",
      },
      badge: { tr: "Güvenlik Duvarı", en: "SSRF Guard" },
    },
    {
      step: "03",
      title: { tr: "46 Dikey Kategori & Çift Dilli Taksonomi", en: "46 Bilingual Categories & Search Matrix" },
      desc: {
        tr: "Hava durumu, yapay zekâ, finans ve kripto gibi dikey kategorilerde yay mekanizmalı hızlı dil değişimi ve anlık arama senkronizasyonu.",
        en: "Instant category filtering and search synchronization across 46 vertical categories with seamless TR/EN parity.",
      },
      badge: { tr: "Dizinleme", en: "Taxonomy" },
    },
    {
      step: "04",
      title: { tr: "Dinamik Çoklu Dil Kod Sentezi", en: "Dynamic Polyglot Code Synthesis" },
      desc: {
        tr: "Kullanıcının girdiği parametreler ve header bilgileri anında cURL, JavaScript/Fetch ve Python/Requests kod bloklarına dönüştürülür.",
        en: "Parameters, query strings, and headers are dynamically compiled into production-ready cURL, JS/TS Fetch, and Python snippets.",
      },
      badge: { tr: "Kod Üretimi", en: "Code Generator" },
    },
    {
      step: "05",
      title: { tr: "Canlı macOS/Linux Terminal Konsolu", en: "Live macOS/Linux Terminal Console" },
      desc: {
        tr: "Renkli syntax highlighting, durum kodları ve kopyalanabilir JSON yanıtları ile sayfadan çıkmadan test imkânı.",
        en: "In-browser terminal interface rendering colored syntax highlighting, status indicators, and formatted JSON in sub-30ms.",
      },
      badge: { tr: "Geliştirici UI", en: "Terminal UI" },
    },
  ],
  warStories: [
    {
      title: {
        tr: "Edge Sandbox Mimarisi & SSRF Güvenlik Duvarı",
        en: "Edge Sandbox Architecture & SSRF Security Firewall",
      },
      subtitle: {
        tr: "Kullanıcı İsteklerini Yerel Ağdan İzole Eden Güvenli Proxy",
        en: "Zero-Trust Outbound Request Routing & IP Blacklisting",
      },
      problem: {
        tr: "Kullanıcıların tarayıcı üzerinden diledikleri rastgele bir API'ye istek atmasına izin vermek; yerel sunucu ağını tarama (SSRF), IP karalisteye girme ve CORS engelleri doğurur.",
        en: "Permitting users to execute arbitrary HTTP requests directly from an in-browser sandbox opens severe SSRF risks, local IP probing, and CORS blocking.",
      },
      solution: {
        tr: "Yerel IP aralıklarını (127.0.0.1, 10.0.0.0/8, 192.168.0.0/16) ve AWS/Cloud meta veri adreslerini (169.254.169.254) kesin olarak engelleyen, hız sınırlamalı (Rate-Limiting) izole bir Edge Proxy kurgulandı.",
        en: "Built a hardened serverless edge proxy enforcing strict CIDR IP blacklisting, blocking all internal loopbacks, private subnets, and cloud metadata endpoints.",
      },
      impact: {
        tr: "Kullanıcılar tüm harici API'leri CORS hatası almadan test edebilirken, sunucu altyapısı %100 siber güvenlik standartlarında korundu.",
        en: "Developers test external APIs with zero CORS friction while server infrastructure maintains 100% immunity against SSRF exploits.",
      },
    },
    {
      title: {
        tr: "Canlı macOS/Linux Terminal Sandbox & <30ms JSON Çıktısı",
        en: "Live Terminal Sandbox & Sub-30ms Formatted JSON Response",
      },
      subtitle: {
        tr: "Geliştiriciyi Sayfada Tutan İnteraktif IDE Deneyimi",
        en: "In-Browser IDE Terminal Eliminating Context Switching",
      },
      problem: {
        tr: "Geliştiriciler bir API'yi test etmek için sayfayı terk edip Postman veya yerel terminale geçmek zorunda kalır; büyük JSON çıktılarında arayüz kilitlenir.",
        en: "Developers typically abandon documentation to test endpoints in external tools like Postman, while large JSON payloads frequently freeze web interfaces.",
      },
      solution: {
        tr: "Sözdizimi vurgulamalı (Syntax Highlighting), renk kodlu HTTP durum rozetlerine sahip ve tek tıkla kopyalanabilen hafif, sanallaştırılmış bir terminal emülatörü geliştirildi.",
        en: "Engineered a lightweight, virtualized terminal component featuring color-coded HTTP status badges, collapsible JSON nodes, and sub-30ms render velocity.",
      },
      impact: {
        tr: "Kullanıcılar 500'den fazla API'yi sayfadan ayrılmadan, 30 milisaniyenin altında akıcı bir terminal deneyimiyle anında test edebilir hale geldi.",
        en: "Developers test and debug any endpoint directly within the browser in under 30 milliseconds with zero context switching.",
      },
    },
    {
      title: {
        tr: "46 Dikey Kategori & Çift Dilli Anlık Taksonomi",
        en: "46 Bilingual Categories & Instant Reactive Search",
      },
      subtitle: {
        tr: "Yüzlerce API'yi Yük Süresi Olmadan Sınıflandıran Hafif Şema",
        en: "Zero-Latency Client-Side Taxonomy with Complete TR/EN Parity",
      },
      problem: {
        tr: "500'den fazla API'yi Hava Durumu, Kripto, Finans ve Yapay Zekâ gibi 46 kategoride çift dilli (TR/EN) sunmak yüksek bundle boyutuna ve filtreleme yavaşlığına yol açabilir.",
        en: "Categorizing 500+ diverse APIs across 46 bilingual domains can bloat client JavaScript bundles and introduce search latency.",
      },
      solution: {
        tr: "Sıkıştırılmış taksonomi veri modelleri, yay fiziğine sahip dinamik dil anahtarı (Spring-physics Language Toggle) ve istemci tarafında çalışan milisaniyelik bulanık arama (Fuzzy Search) inşa edildi.",
        en: "Engineered a compressed metadata taxonomy with a fluid spring-physics language toggle and instant client-side fuzzy search across all endpoints.",
      },
      impact: {
        tr: "Kategoriler arasında sıfır gecikmeyle geçiş yapılırken Türkçe ve İngilizce rotalar arasında %100 içerik eşitliği sağlandı.",
        en: "Instant zero-lag category filtering with complete reciprocal SEO parity between Turkish and English routes.",
      },
    },
    {
      title: {
        tr: "Tek Tıkla Çoklu Dilde (cURL, JS, Python) Üretime Hazır Kod",
        en: "One-Click Polyglot Code Synthesis (cURL, JS/TS, Python)",
      },
      subtitle: {
        tr: "Entegrasyon Süresini Dakikalardan Saniyelere İndiren Kod Üretimi",
        en: "Slashing Third-Party API Integration Friction to Zero",
      },
      problem: {
        tr: "Farklı programlama dillerinde API çağrısı yaparken header, query parametresi ve JSON gövde formatlarını manuel yazmak geliştirici hatasına ve zaman kaybına sebep olur.",
        en: "Manually formatting HTTP headers, authentication tokens, and payload bodies across different programming languages causes integration bugs and wasted time.",
      },
      solution: {
        tr: "Kullanıcının terminalde girdiği tüm parametreleri otomatik olarak cURL komutuna, TypeScript/Fetch bloğuna ve Python/Requests betiğine dönüştüren reaktif bir kod sentezleyici yazıldı.",
        en: "Built a dynamic code synthesis engine that compiles live user inputs into copy-pasteable cURL, TypeScript Fetch, and Python Requests snippets.",
      },
      impact: {
        tr: "Geliştiriciler test ettikleri çalışan bir API'nin kodunu tek tıkla kopyalayıp kendi projelerine saniyeler içinde entegre edebilir hale geldi.",
        en: "Slashed API adoption time from minutes of manual boilerplate coding to a single one-click copy-paste action.",
      },
    },
  ],
};

export const MY_BUSINESS_BOSS_ENGINEERING_DATA: EngineeringCaseStudyData = {
  metrics: [
    {
      value: "10+ Modül",
      label: { tr: "All-in-One SaaS Çözümü", en: "Unified SaaS Architecture" },
      subtext: { tr: "POS, CRM, Stok, Servis & Kasa", en: "POS, CRM, Stock, Repairs & Finance" },
      icon: Layers,
      color: "red",
    },
    {
      value: "<30 ms",
      label: { tr: "Sunucu & ETag 304 Yanıtı", en: "Server & ETag 304 Latency" },
      subtext: { tr: "Redis Destekli Sıfır DB Yükü", en: "Redis In-Memory Cache Optimization" },
      icon: Zap,
      color: "emerald",
    },
    {
      value: "%100 PWA",
      label: { tr: "Çevrimdışı Çalışma Kabiliyeti", en: "Offline Progressive Shell" },
      subtext: { tr: "Service Worker Shell Cache", en: "Service Worker In-Browser Cache" },
      icon: RefreshCw,
      color: "blue",
    },
    {
      value: "0 Veri Kaybı",
      label: { tr: "Tam Denetim & İşlem Güvencesi", en: "Zero Data Loss & Audit Trail" },
      subtext: { tr: "ACID Uyumlu MySQL & Audit Logger", en: "ACID MySQL + Enterprise Audit Log" },
      icon: ShieldCheck,
      color: "amber",
    },
    {
      value: "3 Dil",
      label: { tr: "Dinamik Çoklu Dil Sistemi", en: "Dynamic Tri-Lingual Support" },
      subtext: { tr: "TR / EN / NL Eşzamanlı Parite", en: "TR / EN / NL Real-Time Parity" },
      icon: Cpu,
      color: "purple",
    },
  ],
  architectureSteps: [
    {
      step: "01",
      title: { tr: "Modüler SaaS Çekirdeği & RBAC İzin Matrisi", en: "Modular SaaS Core & Granular RBAC Matrix" },
      desc: {
        tr: "Rol ve yetki matrisiyle izole edilen kullanıcı oturumları; yönetici, muhasebe, usta ve kasiyer için güvenli veri erişim duvarı sağlar.",
        en: "Session isolation and fine-grained permissions protect every route, securing sensitive actions across admins, cashiers, and technicians.",
      },
      badge: { tr: "Yetkilendirme", en: "Security & RBAC" },
    },
    {
      step: "02",
      title: { tr: "Hızlı POS & Kamera Barkod Tarama Motoru", en: "High-Speed POS & Camera Barcode Scanner" },
      desc: {
        tr: "ZXing web kamera entegrasyonu ve optik barkod okuyucu desteği ile donanım bağımsız anlık sepet ve stok düşümü.",
        en: "Hardware-free barcode recognition using camera feeds, instant cart calculations, and atomic inventory reduction.",
      },
      badge: { tr: "Satış & POS", en: "POS Engine" },
    },
    {
      step: "03",
      title: { tr: "Servis & Tamirhane İş Emri Durum Makinesi", en: "Repair & Service Work Order State Machine" },
      desc: {
        tr: "Müşteri cihaz/varlık kaydı, yedek parça maliyetleri ve aşamalı iş emri durum geçişleriyle tamir süreçlerinin takibi.",
        en: "Customer asset registry, spare parts costing, and deterministic state transitions tracking the entire repair lifecycle.",
      },
      badge: { tr: "Servis Operasyonu", en: "Work Orders" },
    },
    {
      step: "04",
      title: { tr: "Akıllı Randevu & CalDAV/ICS Mobil Takvim", en: "Smart Calendar & CalDAV/ICS Mobile Sync" },
      desc: {
        tr: "İnteraktif randevu ajandası ve saha personelinin cep telefonundaki Apple/Google takvimine canlı akan ICS aboneliği.",
        en: "Interactive appointment grid and real-time ICS subscription feeds streaming directly to field staff's mobile calendars.",
      },
      badge: { tr: "Planlama", en: "Calendar Sync" },
    },
    {
      step: "05",
      title: { tr: "ETag & Redis Destekli Müşteri Online Kataloğu", en: "ETag & Redis-Backed Customer Online Catalogue" },
      desc: {
        tr: "Müşterilerin şifresiz eriştiği dijital vitrin; ETag ve Redis önbellekleme sayesinde 304 Not Modified dönerek ana DB yükünü sıfırlar.",
        en: "Public-facing digital storefront leveraging ETag conditional headers and Redis caching to return 304 Not Modified responses with zero DB load.",
      },
      badge: { tr: "Önbellek & Vitrin", en: "Public Delivery" },
    },
  ],
  warStories: [
    {
      title: {
        tr: "5 Farklı Dağınık Yazılımı Tek Bir SaaS Ekosisteminde Birleştirme",
        en: "Unifying 5 Fragmented Tools into One Enterprise SaaS Ecosystem",
      },
      subtitle: {
        tr: "Operasyonel Körlüğü Bitiren All-in-One ERP & CRM Mimarisi",
        en: "Eliminating Data Silos via a Unified Progressive Cloud Panel",
      },
      problem: {
        tr: "İşletmeler ve servis merkezleri; stok için ayrı Excel tabloları, randevu için kağıt ajanda, satış için eski tip hantal POS ve müşteri takibi için bağımsız yazılımlar kullanarak devasa bir veri karmaşası, müşteri kaybı ve operasyonel verimsizlik yaşıyordu.",
        en: "Businesses struggled with severe operational blind spots and lost revenue by juggling disjointed tools: Excel sheets for stock, paper agendas for appointments, outdated POS terminals, and isolated CRM software.",
      },
      solution: {
        tr: "Tüm operasyonel iş akışlarını (POS, CRM, Stok, Servis İş Emirleri, Kasa/Nakit Akışı, Randevular ve Personel) tek bir çatı altında toplayan, Progressive Enhancement mimarisiyle sıfır bekleme süresi sunan modüler bir ERP SaaS platformu inşa edildi.",
        en: "Engineered a unified, progressive server-rendered ERP SaaS platform consolidating POS, CRM, multi-variant inventory, repair work orders, cashflow, and appointments into a single cohesive cockpit.",
      },
      impact: {
        tr: "İşletmelerin operasyonel işlem süreleri %65 kısaldı, çift kayıt ve veri kaybı riski sıfırlandı ve tüm ekip tek bir platformdan anlık senkronize çalışır hale geldi.",
        en: "Reduced business administrative overhead by 65%, eliminated duplicate entry errors, and empowered cross-functional teams with real-time operational synchronization.",
      },
    },
    {
      title: {
        tr: "Donanım Bağımsız Web Kamera Barkod Tarama & Kesintisiz POS Terminali",
        en: "Hardware-Free Camera Barcode Scanning & Instant POS Checkout",
      },
      subtitle: {
        tr: "Pahalı El Terminallerini Tarihe Karıştıran Tarayıcı İçi Görüntü İşleme",
        en: "Browser-Based ZXing Optical Recognition Slashing Hardware Costs",
      },
      problem: {
        tr: "Geleneksel POS ve stok sistemleri pahalı el terminalleri ve özel donanım sürücüleri gerektirir. Donanım arızalandığında veya personelin yanında olmadığında satış ve stok sayımı tamamen kilitlenir.",
        en: "Traditional inventory systems rely on expensive handheld hardware scanners and custom driver setups. Any hardware failure halts sales operations and stock counts.",
      },
      solution: {
        tr: "Tarayıcı üzerinde çalışan ZXing optik barkod motoru entegre edildi. Herhangi bir akıllı telefon veya dizüstü kamerası üzerinden anlık EAN-13/Code-128 barkod taraması, otomatik sepet hesaplaması ve anlık stok düşümü sağlandı.",
        en: "Integrated in-browser ZXing optical decoding allowing any standard smartphone or webcam to scan barcodes instantly with zero driver configuration, executing atomic inventory deductions.",
      },
      impact: {
        tr: "İşletmeler binlerce dolarlık donanım maliyetinden kurtuldu; herhangi bir telefon veya tablet 2 saniyede tam donanımlı bir POS terminaline dönüştü.",
        en: "Eliminated thousands of dollars in hardware scanner investments, turning any tablet or mobile device into a high-speed POS terminal.",
      },
    },
    {
      title: {
        tr: "ETag & Redis Destekli Sıfır Yüklü Herkese Açık Online Katalog",
        en: "Zero-Database-Load Public Catalogue via ETag & Redis Caching",
      },
      subtitle: {
        tr: "Binlerce Müşteri Ziyaretinde Ana Veritabanını Koruyan Akıllı Önbellek",
        en: "Conditional 304 Not Modified Caching Absorbing High Traffic Spikes",
      },
      problem: {
        tr: "Müşterilerin işletmenin ürün ve hizmetlerini incelediği herkese açık online katalog yüksek trafik aldığında, ana ERP veritabanı yorulur ve yönetim panelinde çalışan personelin işlemleri yavaşlar.",
        en: "Public customer catalogues experiencing sudden traffic surges frequently bottleneck primary ERP databases, degrading internal staff operational speed.",
      },
      solution: {
        tr: "Katalog verisi için içerik özetine (payload hash) dayalı ETag ve Redis önbellek katmanı inşa edildi. Değişiklik olmayan tüm isteklerde sunucu veritabanına hiç dokunmadan HTTP 304 (Not Modified) dönecek şekilde optimize edildi.",
        en: "Designed a payload hash-based ETag and Redis caching architecture. Unaltered requests return instant HTTP 304 Not Modified responses without touching the underlying MySQL database.",
      },
      impact: {
        tr: "Kamuya açık katalog isteklerinde yanıt süresi <30 ms seviyesine indirildi ve veritabanı okuma yükü %90 oranında hafifletildi.",
        en: "Achieved sub-30ms public catalog response latency and absorbed over 90% of redundant database read queries.",
      },
    },
  ],
};

interface Props {
  data: EngineeringCaseStudyData;
  locale?: Locale;
}

export function ProjectEngineeringCaseStudy({ data, locale = "tr" }: Props) {
  const isEn = locale === "en";

  return (
    <section className="space-y-20 my-16">
      {/* 1. Bento Metrics Flex Bar */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red dark:bg-rose-500/10 dark:text-rose-400">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-jakarta text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {isEn ? "Engineering Flex & Production Metrics" : "Mühendislik Başarısı & Üretim Metrikleri"}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isEn
                ? "Empirical benchmark numbers achieved in high-concurrency production."
                : "Canlı üretim ortamında kanıtlanmış somut performans ve ölçek rakamları."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {data.metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`group relative overflow-hidden rounded-3xl border border-border/70 bg-card/40 p-6 backdrop-blur-xs transition-all duration-300 hover:border-brand-red/40 hover:bg-card/70 hover:shadow-[0_0_25px_rgba(220,38,38,0.08)] ${
                  idx === 0 ? "col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red dark:bg-rose-500/10 dark:text-rose-400 group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    METRIC #{idx + 1}
                  </span>
                </div>

                <div className="mt-5">
                  <div className="font-jakarta text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl group-hover:text-brand-red transition-colors">
                    {m.value}
                  </div>
                  <h3 className="mt-1 font-semibold text-sm text-foreground/90">
                    {isEn ? m.label.en : m.label.tr}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {isEn ? m.subtext.en : m.subtext.tr}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Architecture Flow */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red dark:bg-rose-500/10 dark:text-rose-400">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-jakarta text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {isEn ? "End-to-End System Architecture Flow" : "Uçtan Uca Sistem Mimarisi & Veri Hattı"}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isEn
                ? "From raw target DOMs to sub-50ms reactive delivery."
                : "Ham hedef kaynaklardan milisaniyelik reaktif sunuma kadar veri yolculuğu."}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-5 relative">
          {data.architectureSteps.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative rounded-3xl border border-border/70 bg-card/40 p-6 backdrop-blur-xs hover:border-brand-red/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-brand-red dark:text-rose-400">
                    STEP {step.step}
                  </span>
                  <span className="rounded-full bg-foreground/5 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground border border-border/50">
                    {isEn ? step.badge.en : step.badge.tr}
                  </span>
                </div>
                <h3 className="font-jakarta text-base font-bold text-foreground">
                  {isEn ? step.title.en : step.title.tr}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {isEn ? step.desc.en : step.desc.tr}
                </p>
              </div>

              {idx < data.architectureSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border/80 bg-background shadow-md text-muted-foreground">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. Deep Engineering War Stories & Challenge Breakdowns */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red dark:bg-rose-500/10 dark:text-rose-400">
            <Server className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-jakarta text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {isEn ? "Deep Engineering Case Studies" : "Derinlemesine Mühendislik Vaka Analizleri"}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isEn
                ? "How architectural challenges were solved with algorithmic precision."
                : "Kritik mühendislik problemlerinin algoritma ve mimari düzeyde çözümü."}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {data.warStories.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl border border-border/70 bg-card/40 p-8 backdrop-blur-xs transition-all hover:border-brand-red/30 hover:bg-card/60 flex flex-col justify-between space-y-6"
            >
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-red dark:text-rose-400">
                  {isEn ? story.subtitle.en : story.subtitle.tr}
                </span>
                <h3 className="mt-2 font-jakarta text-xl font-bold text-foreground">
                  {isEn ? story.title.en : story.title.tr}
                </h3>

                <div className="mt-6 space-y-4 text-sm">
                  <div className="rounded-2xl bg-destructive/10 p-4 border border-destructive/20">
                    <p className="text-xs font-bold text-destructive uppercase tracking-wider mb-1">
                      {isEn ? "The Critical Challenge" : "Kritik Problem & Zorluk"}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {isEn ? story.problem.en : story.problem.tr}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-brand-red/5 p-4 border border-brand-red/20">
                    <p className="text-xs font-bold text-brand-red dark:text-rose-400 uppercase tracking-wider mb-1">
                      {isEn ? "Implemented Solution" : "Uygulanan Mimari Çözüm"}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {isEn ? story.solution.en : story.solution.tr}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-emerald-500/10 p-4 border border-emerald-500/20">
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                  {isEn ? "Verified Engineering Impact" : "Doğrulanmış Mühendislik Başarısı"}
                </p>
                <p className="text-xs text-foreground font-medium leading-relaxed">
                  {isEn ? story.impact.en : story.impact.tr}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
