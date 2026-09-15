"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  ArrowRight,
  Layers,
  Cpu,
  ShieldCheck,
  Sparkles,
  CheckCircle,
  Database,
  Network,
  LayoutDashboard,
} from "lucide-react";
import type { Locale } from "@/lib/translations";

interface ServiceCalculatorProps {
  locale?: Locale;
  defaultCategory?: string;
}

type CategoryId = "scraping" | "ai" | "api" | "fullstack";
type ComplexityId = "standard" | "advanced" | "enterprise";
type DeliveryId = "database" | "api" | "dashboard";

export function ServiceCalculator({ locale = "tr", defaultCategory }: ServiceCalculatorProps) {
  const isEn = locale === "en";

  const categories: { id: CategoryId; label: string; sub: string; icon: typeof Layers }[] = [
    {
      id: "scraping",
      label: isEn ? "Web Scraping & Data Pipeline" : "Web Scraping & Veri Toplama",
      sub: isEn ? "Dynamic extraction, anti-bot & queues" : "Dinamik çekim, anti-bot & kuyruk",
      icon: Layers,
    },
    {
      id: "ai",
      label: isEn ? "AI Automation & RAG Workflows" : "Yapay Zekâ & AI Otomasyon",
      sub: isEn ? "Vector search, LLM agents & guards" : "Vektör arama, LLM ajanları & denetim",
      icon: Sparkles,
    },
    {
      id: "api",
      label: isEn ? "Custom API & Backend" : "Özel API & Backend Mimarisi",
      sub: isEn ? "High-throughput, auth & microservices" : "Yüksek trafik, yetki & mikroservis",
      icon: Cpu,
    },
    {
      id: "fullstack",
      label: isEn ? "Next.js Web App / SaaS" : "Next.js Web Uygulaması / SaaS",
      sub: isEn ? "App Router, SSR, billing & portals" : "App Router, SSR, ödeme & paneller",
      icon: ShieldCheck,
    },
  ];

  const complexities: { id: ComplexityId; label: string; sub: string }[] = [
    {
      id: "standard",
      label: isEn ? "MVP / Standard" : "MVP / Standart",
      sub: isEn ? "Rapid Launch & Core Specs" : "Hızlı Çekirdek Başlangıç",
    },
    {
      id: "advanced",
      label: isEn ? "Advanced" : "İleri Seviye",
      sub: isEn ? "High Resilience & Queues" : "Yüksek Dayanıklılık & Kuyruk",
    },
    {
      id: "enterprise",
      label: isEn ? "Enterprise" : "Kurumsal",
      sub: isEn ? "Distributed & High Scale" : "Büyük Ölçek & Dağıtık Yapı",
    },
  ];

  const deliveries: { id: DeliveryId; label: string; sub: string; icon: typeof Database }[] = [
    {
      id: "database",
      label: isEn ? "Database & Queue" : "Veritabanı & Kuyruk",
      sub: isEn ? "PostgreSQL / Redis / Pipeline" : "Postgres / Redis / Pipeline",
      icon: Database,
    },
    {
      id: "api",
      label: isEn ? "REST API & Webhooks" : "REST API & Webhook",
      sub: isEn ? "Secure Endpoints & Events" : "Güvenli Uç Noktalar & Event",
      icon: Network,
    },
    {
      id: "dashboard",
      label: isEn ? "Next.js Admin UI" : "Next.js Yönetim Paneli",
      sub: isEn ? "Control Console & Telemetry" : "Modern Arayüz & Canlı Panel",
      icon: LayoutDashboard,
    },
  ];

  const [category, setCategory] = useState<CategoryId>(() => {
    const d = defaultCategory?.toLowerCase() || "";
    if (d.includes("scraping") || d.includes("fiyat") || d.includes("aktarim")) return "scraping";
    if (d.includes("zeka") || d.includes("ai")) return "ai";
    if (d.includes("api")) return "api";
    if (d.includes("nextjs") || d.includes("yazilim")) return "fullstack";
    return "scraping";
  });

  const [complexity, setComplexity] = useState<ComplexityId>("advanced");
  const [delivery, setDelivery] = useState<DeliveryId>("api");

  // Dynamic calculation reacting to Category + Complexity + Delivery Target
  const calculateEstimate = (cat: CategoryId, comp: ComplexityId, del: DeliveryId) => {
    const deliveryMeta = {
      database: {
        labelTR: "Veritabanı Hattı",
        labelEN: "Database Pipeline",
        tech: ["PostgreSQL / MongoDB", "Redis Queue"],
        descTR: "veritabanı katmanına doğrudan normalize aktarım ve asenkron kuyruk yönetimi.",
        descEN: "direct normalized database ingestion and asynchronous queue management.",
      },
      api: {
        labelTR: "REST API & Webhook",
        labelEN: "REST API & Webhooks",
        tech: ["FastAPI / Express API", "Webhook Dispatcher", "API Key Auth"],
        descTR: "güvenli REST uç noktaları, API anahtarı yetkilendirmesi ve anlık olay webhook entegrasyonu.",
        descEN: "secure REST endpoints, API authentication, and real-time event webhooks.",
      },
      dashboard: {
        labelTR: "Yönetim Paneli",
        labelEN: "Admin UI Console",
        tech: ["Next.js 16 App Router", "Tailwind CSS v4", "Admin Control UI"],
        descTR: "özel Next.js yönetim paneli, operasyonel durum izleme ve yönetim kontrolleri.",
        descEN: "custom Next.js administrative dashboard with operational telemetry and controls.",
      },
    };

    const dInfo = deliveryMeta[del];

    // Timeline calculation based on 3-axis matrix
    const timelineMatrix: Record<CategoryId, Record<ComplexityId, Record<DeliveryId, { tr: string; en: string }>>> = {
      scraping: {
        standard: {
          database: { tr: "3 - 5 Gün", en: "3 - 5 Days" },
          api: { tr: "5 - 7 Gün", en: "5 - 7 Days" },
          dashboard: { tr: "1 - 2 Hafta", en: "1 - 2 Weeks" },
        },
        advanced: {
          database: { tr: "1 - 2 Hafta", en: "1 - 2 Weeks" },
          api: { tr: "2 Hafta", en: "2 Weeks" },
          dashboard: { tr: "2 - 3 Hafta", en: "2 - 3 Weeks" },
        },
        enterprise: {
          database: { tr: "2 - 3 Hafta", en: "2 - 3 Weeks" },
          api: { tr: "3 - 4 Hafta", en: "3 - 4 Weeks" },
          dashboard: { tr: "4 - 5 Hafta", en: "4 - 5 Weeks" },
        },
      },
      ai: {
        standard: {
          database: { tr: "1 Hafta", en: "1 Week" },
          api: { tr: "1 - 2 Hafta", en: "1 - 2 Weeks" },
          dashboard: { tr: "2 Hafta", en: "2 Weeks" },
        },
        advanced: {
          database: { tr: "2 Hafta", en: "2 Weeks" },
          api: { tr: "2 - 3 Hafta", en: "2 - 3 Weeks" },
          dashboard: { tr: "3 - 4 Hafta", en: "3 - 4 Weeks" },
        },
        enterprise: {
          database: { tr: "3 - 4 Hafta", en: "3 - 4 Weeks" },
          api: { tr: "4 - 5 Hafta", en: "4 - 5 Weeks" },
          dashboard: { tr: "5 - 7 Hafta", en: "5 - 7 Weeks" },
        },
      },
      api: {
        standard: {
          database: { tr: "4 - 6 Gün", en: "4 - 6 Days" },
          api: { tr: "1 Hafta", en: "1 Week" },
          dashboard: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
        },
        advanced: {
          database: { tr: "1.5 - 2 Hafta", en: "1.5 - 2 Weeks" },
          api: { tr: "2 - 3 Hafta", en: "2 - 3 Weeks" },
          dashboard: { tr: "3 - 4 Hafta", en: "3 - 4 Weeks" },
        },
        enterprise: {
          database: { tr: "3 Hafta", en: "3 Weeks" },
          api: { tr: "3 - 5 Hafta", en: "3 - 5 Weeks" },
          dashboard: { tr: "5 - 7 Hafta", en: "5 - 7 Weeks" },
        },
      },
      fullstack: {
        standard: {
          database: { tr: "1 - 2 Hafta", en: "1 - 2 Weeks" },
          api: { tr: "2 Hafta", en: "2 Weeks" },
          dashboard: { tr: "2 - 3 Hafta", en: "2 - 3 Weeks" },
        },
        advanced: {
          database: { tr: "2 - 3 Hafta", en: "2 - 3 Weeks" },
          api: { tr: "3 Hafta", en: "3 Weeks" },
          dashboard: { tr: "3 - 5 Hafta", en: "3 - 5 Weeks" },
        },
        enterprise: {
          database: { tr: "4 - 5 Hafta", en: "4 - 5 Weeks" },
          api: { tr: "5 - 6 Hafta", en: "5 - 6 Weeks" },
          dashboard: { tr: "6 - 8 Hafta", en: "6 - 8 Weeks" },
        },
      },
    };

    const categoryBase = {
      scraping: {
        standard: {
          levelTR: `Standart Veri Çekimi + ${dInfo.labelTR}`,
          levelEN: `Standard Extraction + ${dInfo.labelEN}`,
          coreTech: ["Playwright / Cheerio", "Node.js Automation", "Data Normalization"],
          summaryTR: `Statik veya hafif dinamik web kaynaklarından zamanlanmış veri toplama ve ${dInfo.descTR}`,
          summaryEN: `Scheduled data collection from static or lightly dynamic web sources with ${dInfo.descEN}`,
        },
        advanced: {
          levelTR: `Dayanıklı Veri Hattı + ${dInfo.labelTR}`,
          levelEN: `Resilient Pipeline + ${dInfo.labelEN}`,
          coreTech: ["Playwright Automation", "Smart Proxy & Rotation", "DOM Change Detection"],
          summaryTR: `Dinamik JavaScript rendering, korumalı web kaynakları için akıllı proxy rotasyonu ve ${dInfo.descTR}`,
          summaryEN: `Dynamic JavaScript rendering, anti-bot smart proxy rotation for protected targets, and ${dInfo.descEN}`,
        },
        enterprise: {
          levelTR: `Dağıtık Veri Kümesi + ${dInfo.labelTR}`,
          levelEN: `Distributed Cluster + ${dInfo.labelEN}`,
          coreTech: ["Distributed Worker Cluster", "Resilient Scraping Architecture", "Real-Time Health Monitoring"],
          summaryTR: `Onlarca hedef platformdan yüksek frekanslı eşzamanlı veri çekimi, otomatik anomali alarmları ve ${dInfo.descTR}`,
          summaryEN: `High-frequency concurrent scraping across dozens of target platforms, anomaly alerts, and ${dInfo.descEN}`,
        },
      },
      ai: {
        standard: {
          levelTR: `LLM Görev Otomasyonu + ${dInfo.labelTR}`,
          levelEN: `LLM Task Automation + ${dInfo.labelEN}`,
          coreTech: ["OpenAI / Anthropic API", "FastAPI / Node.js", "Zod Validation"],
          summaryTR: `Doküman özetleme, otomatik sınıflandırma, operasyonel metin işleme akışları ve ${dInfo.descTR}`,
          summaryEN: `Document summarization, categorization, automated operational text flows, and ${dInfo.descEN}`,
        },
        advanced: {
          levelTR: `Özel RAG & Vektör Arama + ${dInfo.labelTR}`,
          levelEN: `Custom RAG & Vectors + ${dInfo.labelEN}`,
          coreTech: ["PGVector / Pinecone", "Hybrid Search", "Guardrails & Anti-Hallucination"],
          summaryTR: `Şirket içi özel belgeler üzerinden halüsinasyonsuz akıllı soru-cevap asistanı ve ${dInfo.descTR}`,
          summaryEN: `Hallucination-free Q&A assistant over private company documents, reinforced with ${dInfo.descEN}`,
        },
        enterprise: {
          levelTR: `Otonom Çoklu Ajan + ${dInfo.labelTR}`,
          levelEN: `Multi-Agent System + ${dInfo.labelEN}`,
          coreTech: ["LangGraph / Multi-Agent", "Tool Calling & Functions", "Human-in-the-Loop UI"],
          summaryTR: `Araç çalıştırabilen, onay adımlı ve tam denetlenebilir otonom AI ajan zincirleri ile ${dInfo.descTR}`,
          summaryEN: `Autonomous AI agent chains with tool execution, approval gates, audit trails, and ${dInfo.descEN}`,
        },
      },
      api: {
        standard: {
          levelTR: `REST API & Mikroservis + ${dInfo.labelTR}`,
          levelEN: `REST API & Service + ${dInfo.labelEN}`,
          coreTech: ["FastAPI / Express", "PostgreSQL", "Swagger OpenAPI"],
          summaryTR: `Temel CRUD uç noktaları, JWT kimlik doğrulama, veri şeması doğrulaması ve ${dInfo.descTR}`,
          summaryEN: `Core CRUD endpoints, JWT authentication, request schema validation, and ${dInfo.descEN}`,
        },
        advanced: {
          levelTR: `Yüksek Trafikli API + ${dInfo.labelTR}`,
          levelEN: `High-Throughput API + ${dInfo.labelEN}`,
          coreTech: ["Redis Caching", "PostgreSQL Pooling", "Rate Limiting"],
          summaryTR: `50ms altı yanıt süreleri, harici servis entegrasyonları, rate limiting korumaları ve ${dInfo.descTR}`,
          summaryEN: `Sub-50ms response latency, third-party service integrations, rate limiting, and ${dInfo.descEN}`,
        },
        enterprise: {
          levelTR: `Kurumsal Event Backend + ${dInfo.labelTR}`,
          levelEN: `Enterprise Event Stream + ${dInfo.labelEN}`,
          coreTech: ["Kafka / Redis Streams", "Microservices", "Role-Based ACL", "Prometheus Metrics"],
          summaryTR: `Çoklu kiracılı (multi-tenant) yapı, olay güdümlü asenkron veri akışları, yüksek erişilebilirlik ve ${dInfo.descTR}`,
          summaryEN: `Multi-tenant event-driven architecture, high availability clustering, and ${dInfo.descEN}`,
        },
      },
      fullstack: {
        standard: {
          levelTR: `Modern MVP & Platform + ${dInfo.labelTR}`,
          levelEN: `Modern MVP Platform + ${dInfo.labelEN}`,
          coreTech: ["Next.js 16 App Router", "Tailwind CSS v4", "Supabase / Postgres", "NextAuth"],
          summaryTR: `Yüksek performanslı, SEO uyumlu ve responsive arayüzlü web uygulaması ile ${dInfo.descTR}`,
          summaryEN: `High-performance, SEO-optimized, responsive web application backed by ${dInfo.descEN}`,
        },
        advanced: {
          levelTR: `Kapsamlı SaaS & Portal + ${dInfo.labelTR}`,
          levelEN: `Full-Featured SaaS + ${dInfo.labelEN}`,
          coreTech: ["Next.js App Router", "Server Components", "Stripe / Iyzico", "FastAPI / Postgres"],
          summaryTR: `Abonelik ve ödeme altyapısı, analiz paneli, çoklu dil ve rol bazlı yetkilendirme ile ${dInfo.descTR}`,
          summaryEN: `Subscription billing, analytics panel, role management, internationalization, and ${dInfo.descEN}`,
        },
        enterprise: {
          levelTR: `Kurumsal Web Platformu + ${dInfo.labelTR}`,
          levelEN: `Custom Enterprise Platform + ${dInfo.labelEN}`,
          coreTech: ["Distributed Architecture", "Real-Time WebSockets", "Micro-Frontends", "CI/CD"],
          summaryTR: `Karmaşık veri görselleştirme, anlık akışlar, şirkete özel iş kuralları ve ${dInfo.descTR}`,
          summaryEN: `Complex data visualization, real-time telemetry feeds, custom business logic, and ${dInfo.descEN}`,
        },
      },
    };

    const base = categoryBase[cat][comp];
    const time = isEn ? timelineMatrix[cat][comp][del].en : timelineMatrix[cat][comp][del].tr;
    const level = isEn ? base.levelEN : base.levelTR;
    const summary = isEn ? base.summaryEN : base.summaryTR;

    const combinedTech = Array.from(new Set([...base.coreTech, ...dInfo.tech]));

    return { time, level, summary, tech: combinedTech };
  };

  const currentEst = calculateEstimate(category, complexity, delivery);

  const contactUrl = isEn
    ? `/en/contact?service=${category}&complexity=${complexity}&delivery=${delivery}`
    : `/iletisim?service=${category}&complexity=${complexity}&delivery=${delivery}`;

  return (
    <div className="rounded-3xl border border-border/80 bg-card/70 p-6 md:p-10 shadow-sm backdrop-blur-md">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red dark:bg-rose-500/10 dark:text-rose-400">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-jakarta text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {isEn ? "Interactive Scope & Timeline Estimator" : "İnteraktif Kapsam & Süre Hesaplayıcı"}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground md:text-sm">
              {isEn
                ? "Configure project parameters to calculate technical scope, delivery model, and timeline."
                : "Projenizin özelliklerini seçerek mimari kapsamı, teslimat modelini ve geliştirme süresini hesaplayın."}
            </p>
          </div>
        </div>
        <div className="self-start md:self-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 px-3.5 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            {isEn ? "Live Architecture Simulator" : "Dinamik Mimari Simülatörü"}
          </span>
        </div>
      </div>

      {/* Grid Layout: Controls (7 cols) & Results Card (5 cols) */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Controls Column */}
        <div className="space-y-7 lg:col-span-7">
          {/* Step 1: Category */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {isEn ? "1. Project Category" : "1. Proje Türü"}
              </label>
              <span className="text-[11px] text-muted-foreground">
                {isEn ? "Select domain" : "Uzmanlık alanı"}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((c) => {
                const Icon = c.icon;
                const active = category === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={`group relative flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-all ${
                      active
                        ? "border-brand-red bg-brand-red/[0.08] text-foreground ring-1 ring-brand-red/30 dark:border-rose-500/80 dark:bg-rose-950/25 dark:ring-rose-500/30 shadow-xs"
                        : "border-border/60 bg-background/50 text-muted-foreground hover:border-border hover:bg-card hover:text-foreground"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        active
                          ? "bg-brand-red text-white dark:bg-rose-500"
                          : "bg-muted text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-foreground leading-snug">
                        {c.label}
                      </div>
                      <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                        {c.sub}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Complexity */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {isEn ? "2. Scale & Complexity" : "2. Ölçek & Karmaşıklık"}
              </label>
              <span className="text-[11px] text-muted-foreground">
                {isEn ? "Select architectural tier" : "Mimari seviye"}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {complexities.map((item) => {
                const active = complexity === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setComplexity(item.id)}
                    className={`flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all ${
                      active
                        ? "border-brand-red bg-brand-red/[0.08] text-foreground ring-1 ring-brand-red/30 dark:border-rose-500/80 dark:bg-rose-950/25 dark:ring-rose-500/30 shadow-xs"
                        : "border-border/60 bg-background/50 text-muted-foreground hover:border-border hover:bg-card hover:text-foreground"
                    }`}
                  >
                    <span className="text-sm font-bold text-foreground">{item.label}</span>
                    <span className="text-[11px] text-muted-foreground mt-1">{item.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Delivery Target */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {isEn ? "3. Delivery & Integration Model" : "3. Teslim & Entegrasyon Hedefi"}
              </label>
              <span className="text-[11px] text-muted-foreground">
                {isEn ? "Select output target" : "Çıktı modeli"}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {deliveries.map((item) => {
                const active = delivery === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDelivery(item.id)}
                    className={`flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all ${
                      active
                        ? "border-brand-red bg-brand-red/[0.08] text-foreground ring-1 ring-brand-red/30 dark:border-rose-500/80 dark:bg-rose-950/25 dark:ring-rose-500/30 shadow-xs"
                        : "border-border/60 bg-background/50 text-muted-foreground hover:border-border hover:bg-card hover:text-foreground"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 mb-2 transition-colors ${
                        active ? "text-brand-red dark:text-rose-400" : "text-muted-foreground"
                      }`}
                    />
                    <span className="text-sm font-bold text-foreground">{item.label}</span>
                    <span className="text-[11px] text-muted-foreground mt-1">{item.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Card (Right Column) */}
        <div className="flex flex-col justify-between rounded-2xl border border-border/80 bg-background/95 p-6 md:p-8 backdrop-blur-sm shadow-sm lg:col-span-5">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {isEn ? "Architecture Spec" : "Mimari Kapsam"}
              </span>
              <span className="inline-flex items-center rounded-full bg-brand-red/10 px-3 py-1 text-xs font-semibold text-brand-red dark:bg-rose-500/15 dark:text-rose-300 max-w-full text-center leading-normal">
                {currentEst.level}
              </span>
            </div>

            <div className="mt-6">
              <span className="text-xs font-medium text-muted-foreground">
                {isEn ? "Estimated Timeline:" : "Tahmini Teslim Süresi:"}
              </span>
              <div className="mt-1 font-jakarta text-3xl font-extrabold text-foreground md:text-4xl tracking-tight">
                {currentEst.time}
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {isEn
                  ? "Dynamic estimate including selected delivery & integration model"
                  : "Seçilen teslimat ve entegrasyon modeli dahil dinamik tahmin"}
              </p>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {currentEst.summary}
            </p>

            <div className="mt-6 border-t border-border/50 pt-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {isEn ? "Recommended Stack:" : "Önerilen Teknoloji Yığını:"}
              </span>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {currentEst.tech.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-card px-2.5 py-1 text-xs font-medium text-foreground"
                  >
                    <CheckCircle className="h-3.5 w-3.5 text-brand-red dark:text-rose-400 shrink-0" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-border/60 pt-5">
            <Link
              href={contactUrl}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red px-5 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-red-700 hover:shadow-brand-red/20 active:scale-[0.99]"
            >
              <span>{isEn ? "Discuss This Scope" : "Bu Kapsamla Projeyi Başlatın"}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
