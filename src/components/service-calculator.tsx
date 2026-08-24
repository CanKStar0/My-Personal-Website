"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, Layers, Cpu, ShieldCheck, Sparkles, CheckCircle } from "lucide-react";
import type { Locale } from "@/lib/translations";

interface ServiceCalculatorProps {
  locale?: Locale;
  defaultCategory?: string;
}

export function ServiceCalculator({ locale = "tr", defaultCategory }: ServiceCalculatorProps) {
  const isEn = locale === "en";

  const categories = [
    {
      id: "scraping",
      label: isEn ? "Web Scraping & Data Pipeline" : "Web Scraping & Veri Toplama",
      icon: Layers,
    },
    {
      id: "ai",
      label: isEn ? "AI Automation & RAG Workflows" : "Yapay Zekâ & AI Otomasyon",
      icon: Sparkles,
    },
    {
      id: "api",
      label: isEn ? "Custom API & Backend" : "Özel API & Backend Mimarisi",
      icon: Cpu,
    },
    {
      id: "fullstack",
      label: isEn ? "Next.js Full-Stack Web App" : "Next.js Web Uygulaması / SaaS",
      icon: ShieldCheck,
    },
  ];

  const [category, setCategory] = useState<string>(() => {
    if (defaultCategory?.includes("scraping")) return "scraping";
    if (defaultCategory?.includes("zeka") || defaultCategory?.includes("ai")) return "ai";
    if (defaultCategory?.includes("api")) return "api";
    if (defaultCategory?.includes("nextjs") || defaultCategory?.includes("yazilim")) return "fullstack";
    return "scraping";
  });

  const [complexity, setComplexity] = useState<"standard" | "advanced" | "enterprise">("advanced");
  const [delivery, setDelivery] = useState<"database" | "api" | "dashboard">("api");

  // Calculations based on options
  const estimates = {
    scraping: {
      standard: {
        time: isEn ? "3 - 7 Days" : "3 - 7 Gün",
        level: isEn ? "Standard Extraction" : "Standart Veri Çekimi",
        tech: ["Node.js / Python", "Cheerio / Playwright", "JSON / PostgreSQL"],
        summary: isEn
          ? "Targeting static or lightly dynamic sites, scheduled daily/weekly runs."
          : "Statik veya hafif dinamik siteler, günlük/haftalık zamanlanmış veri çekimi.",
      },
      advanced: {
        time: isEn ? "1 - 2 Weeks" : "1 - 2 Hafta",
        level: isEn ? "Advanced Stealth & Anti-Bot" : "İleri Seviye Stealth & Anti-Bot",
        tech: ["Playwright Stealth", "Residential Proxy Rotation", "Redis Queue", "MongoDB / Postgres"],
        summary: isEn
          ? "Cloudflare bypass, dynamic JavaScript rendering, high-frequency continuous queues."
          : "Cloudflare aşımı, dinamik JS rendering, yüksek frekanslı kuyruk yönetimi.",
      },
      enterprise: {
        time: isEn ? "2 - 4 Weeks" : "2 - 4 Hafta",
        level: isEn ? "High-Scale Multi-Source Pipeline" : "Büyük Ölçekli Çoklu Kaynak Hattı",
        tech: ["Distributed Cluster", "WAF Bypass", "Redis / Celery", "Real-Time API & Webhooks"],
        summary: isEn
          ? "Tens of target platforms, real-time change detection, continuous health monitoring."
          : "Onlarca hedef platform, anlık değişiklik tespiti, otomatik alarm mekanizmaları.",
      },
    },
    ai: {
      standard: {
        time: isEn ? "1 - 2 Weeks" : "1 - 2 Hafta",
        level: isEn ? "LLM Task Automation" : "LLM Görev Otomasyonu",
        tech: ["OpenAI / Anthropic API", "FastAPI / Node.js", "Zod Validation"],
        summary: isEn
          ? "Document summarization, automated categorization, and email/ticket processing."
          : "Doküman özetleme, otomatik sınıflandırma ve müşteri talep işleme akışları.",
      },
      advanced: {
        time: isEn ? "2 - 3 Weeks" : "2 - 3 Hafta",
        level: isEn ? "Custom RAG & Vector Search" : "Özel RAG & Vektör Arama",
        tech: ["PGVector / Pinecone", "FastAPI", "Hybrid Search", "Guardrails"],
        summary: isEn
          ? "Question-answering over private company documents with strict data privacy."
          : "Şirket içi özel belgeler üzerinden halüsinasyonsuz akıllı soru-cevap asistanı.",
      },
      enterprise: {
        time: isEn ? "3 - 5 Weeks" : "3 - 5 Hafta",
        level: isEn ? "Autonomous Multi-Agent System" : "Otonom Çoklu Ajan Mimarisi",
        tech: ["LangGraph / Multi-Agent", "Local LLMs", "Tool Calling", "Human-in-the-Loop UI"],
        summary: isEn
          ? "Self-healing complex workflows with tool execution, approval steps, and audit logs."
          : "Araç çalıştırabilen, onay adımlı ve tam izlenebilir otonom AI ajanları.",
      },
    },
    api: {
      standard: {
        time: isEn ? "1 Week" : "1 Hafta",
        level: isEn ? "REST API & Microservice" : "REST API & Mikroservis",
        tech: ["FastAPI / Express", "PostgreSQL", "Swagger OpenAPI"],
        summary: isEn
          ? "Core CRUD endpoints, authentication, and structured validation."
          : "Temel CRUD uç noktaları, JWT kimlik doğrulama ve veri şeması doğrulaması.",
      },
      advanced: {
        time: isEn ? "2 - 3 Weeks" : "2 - 3 Hafta",
        level: isEn ? "High-Throughput API Architecture" : "Yüksek Trafikli API Mimarisi",
        tech: ["Redis Caching", "PostgreSQL Connection Pooling", "Rate Limiting", "Webhooks"],
        summary: isEn
          ? "Sub-50ms latency, third-party integrations, background task queues."
          : "50ms altı yanıt süreleri, harici servis entegrasyonları, arka plan kuyrukları.",
      },
      enterprise: {
        time: isEn ? "3 - 5 Weeks" : "3 - 5 Hafta",
        level: isEn ? "Enterprise Backend & Event Stream" : "Kurumsal Backend & Event Akışı",
        tech: ["Kafka / Redis Streams", "Microservices", "Role-Based ACL", "Prometheus Metrics"],
        summary: isEn
          ? "Multi-tenant architecture, event-driven pipelines, and high availability."
          : "Çoklu kiracılı (multi-tenant) yapı, olay güdümlü akışlar ve yüksek erişilebilirlik.",
      },
    },
    fullstack: {
      standard: {
        time: isEn ? "2 Weeks" : "2 Hafta",
        level: isEn ? "Modern MVP & Dashboard" : "Modern MVP & Yönetim Paneli",
        tech: ["Next.js 16", "Tailwind CSS v4", "Supabase / Postgres", "NextAuth"],
        summary: isEn
          ? "High performance, SEO-optimized web application with responsive UI."
          : "Yüksek performanslı, SEO uyumlu ve responsive arayüzlü web uygulaması.",
      },
      advanced: {
        time: isEn ? "3 - 4 Weeks" : "3 - 4 Hafta",
        level: isEn ? "Full-Featured SaaS / Platform" : "Kapsamlı SaaS & Platform",
        tech: ["Next.js App Router", "Server Components", "Stripe / Iyzico", "FastAPI / Postgres"],
        summary: isEn
          ? "Subscription billing, analytics dashboard, role management, and i18n."
          : "Abonelik ve ödeme altyapısı, analiz paneli, çoklu dil ve yetkilendirme.",
      },
      enterprise: {
        time: isEn ? "4 - 8 Weeks" : "4 - 8 Hafta",
        level: isEn ? "Custom Enterprise Web Platform" : "Kurumsal Özel Web Platformu",
        tech: ["Distributed Architecture", "Real-Time WebSockets", "Micro-Frontends", "CI/CD"],
        summary: isEn
          ? "Complex data visualization, real-time feeds, and custom business logic."
          : "Karmaşık veri görselleştirme, anlık akışlar ve şirkete özel iş kuralları.",
      },
    },
  };

  const selectedCategory = estimates[category as keyof typeof estimates] || estimates.scraping;
  const currentEst = selectedCategory[complexity];

  const contactUrl = isEn
    ? `/en/contact?service=${category}&complexity=${complexity}&delivery=${delivery}`
    : `/iletisim?service=${category}&complexity=${complexity}&delivery=${delivery}`;

  return (
    <section className="my-16 rounded-3xl border border-brand-red/30 bg-card/60 p-6 backdrop-blur-md md:p-10 shadow-[0_0_50px_rgba(220,38,38,0.05)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red dark:bg-rose-500/10 dark:text-rose-400">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-jakarta text-2xl font-bold tracking-tight text-foreground">
              {isEn ? "Interactive Scope & Timeline Estimator" : "İnteraktif Kapsam & Süre Hesaplayıcı"}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isEn
                ? "Configure your project specifications to calculate architecture scope and delivery timeline."
                : "Projenizin özelliklerini seçerek tahmini mimari kapsamı ve geliştirme süresini hesaplayın."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* Controls */}
        <div className="space-y-6 lg:col-span-7">
          {/* Category */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {isEn ? "1. Project Category" : "1. Proje Türü"}
            </label>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-2">
              {categories.map((c) => {
                const Icon = c.icon;
                const active = category === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={`flex items-center gap-2.5 rounded-xl border p-3 text-left text-xs font-semibold transition-all ${
                      active
                        ? "border-brand-red bg-brand-red/10 text-brand-red dark:border-rose-500 dark:bg-rose-950/20 dark:text-rose-400 shadow-[0_0_15px_rgba(220,38,38,0.15)]"
                        : "border-border/60 bg-background/50 text-foreground hover:border-border hover:bg-card"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Complexity */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {isEn ? "2. Scale & Complexity" : "2. Ölçek & Karmaşıklık"}
            </label>
            <div className="mt-3 grid grid-cols-3 gap-2.5">
              {(["standard", "advanced", "enterprise"] as const).map((level) => {
                const active = complexity === level;
                const labels = {
                  standard: isEn ? "MVP / Standard" : "MVP / Standart",
                  advanced: isEn ? "Advanced" : "İleri Seviye",
                  enterprise: isEn ? "Enterprise" : "Kurumsal",
                };
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setComplexity(level)}
                    className={`rounded-xl border p-3 text-center text-xs font-semibold capitalize transition-all ${
                      active
                        ? "border-brand-red bg-brand-red/10 text-brand-red dark:border-rose-500 dark:bg-rose-950/20 dark:text-rose-400"
                        : "border-border/60 bg-background/50 text-foreground hover:border-border hover:bg-card"
                    }`}
                  >
                    {labels[level]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Delivery Target */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {isEn ? "3. Delivery & Integration Target" : "3. Teslim & Entegrasyon Hedefi"}
            </label>
            <div className="mt-3 grid grid-cols-3 gap-2.5">
              {[
                { id: "database", label: isEn ? "Database & Queue" : "Veritabanı & Kuyruk" },
                { id: "api", label: isEn ? "REST API / Webhook" : "REST API / Webhook" },
                { id: "dashboard", label: isEn ? "Next.js UI Panel" : "Next.js Yönetim Paneli" },
              ].map((d) => {
                const active = delivery === d.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDelivery(d.id as typeof delivery)}
                    className={`rounded-xl border p-3 text-center text-xs font-semibold transition-all ${
                      active
                        ? "border-brand-red bg-brand-red/10 text-brand-red dark:border-rose-500 dark:bg-rose-950/20 dark:text-rose-400"
                        : "border-border/60 bg-background/50 text-foreground hover:border-border hover:bg-card"
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-border/80 bg-background/80 p-6 backdrop-blur-sm lg:col-span-5">
          <div>
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {isEn ? "Architecture Spec" : "Mimari Kapsam"}
              </span>
              <span className="rounded-full bg-brand-red/10 px-2.5 py-0.5 text-xs font-semibold text-brand-red dark:text-rose-400">
                {currentEst.level}
              </span>
            </div>

            <div className="mt-5">
              <span className="text-xs text-muted-foreground">{isEn ? "Est. Timeline:" : "Tahmini Süre:"}</span>
              <div className="font-jakarta text-3xl font-extrabold text-foreground">{currentEst.time}</div>
            </div>

            <p className="mt-3 text-xs leading-5 text-muted-foreground">{currentEst.summary}</p>

            <div className="mt-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {isEn ? "Recommended Stack:" : "Önerilen Teknoloji Yığını:"}
              </span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {currentEst.tech.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-card px-2 py-1 text-[11px] text-foreground"
                  >
                    <CheckCircle className="h-3 w-3 text-brand-red" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border/50">
            <Link
              href={contactUrl}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red px-5 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-brand-red/20"
            >
              <span>{isEn ? "Discuss This Scope" : "Bu Kapsamla Projeyi Başlatın"}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
