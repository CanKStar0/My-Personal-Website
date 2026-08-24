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
