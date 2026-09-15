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
import {
  getServiceConfig,
  deliveryMeta,
  type ComplexityId,
  type DeliveryId,
} from "@/lib/calculator-configs";

interface ServiceCalculatorProps {
  locale?: Locale;
  serviceSlug?: string;
  defaultCategory?: string;
}

export function ServiceCalculator({
  locale = "tr",
  serviceSlug,
  defaultCategory,
}: ServiceCalculatorProps) {
  const isEn = locale === "en";

  const config = getServiceConfig(serviceSlug || defaultCategory);

  const [selectedMethodId, setSelectedMethodId] = useState<string>(
    config.methods[0]?.id || "static-api"
  );
  const [complexity, setComplexity] = useState<ComplexityId>("standard");
  const [delivery, setDelivery] = useState<DeliveryId>("database");

  // Keep method valid if service changes
  const activeMethod =
    config.methods.find((m) => m.id === selectedMethodId) || config.methods[0];

  const currentDeliveryMeta = deliveryMeta[delivery];

  // Calculate dynamic outputs
  const time = isEn
    ? activeMethod.timelines[complexity][delivery].en
    : activeMethod.timelines[complexity][delivery].tr;

  const levelBadge = isEn
    ? `${activeMethod.levelEN} + ${currentDeliveryMeta.labelEN}`
    : `${activeMethod.levelTR} + ${currentDeliveryMeta.labelTR}`;

  const summary = isEn
    ? `${activeMethod.summaryEN} Integrated with ${currentDeliveryMeta.descEN}`
    : `${activeMethod.summaryTR} ${currentDeliveryMeta.descTR}`;

  const techStack = Array.from(
    new Set([...activeMethod.coreTech, ...currentDeliveryMeta.tech])
  );

  const contactUrl = isEn
    ? `/en/contact?service=${config.slug}&method=${activeMethod.id}&complexity=${complexity}&delivery=${delivery}`
    : `/iletisim?service=${config.slug}&method=${activeMethod.id}&complexity=${complexity}&delivery=${delivery}`;

  const methodIcons = [Layers, Cpu, ShieldCheck, Sparkles];

  const complexities: { id: ComplexityId; label: string; sub: string }[] = [
    {
      id: "standard",
      label: isEn ? "MVP / Standard" : "MVP / Standart",
      sub: isEn ? "Core Fast Scope" : "Hızlı Çekirdek Kapsam",
    },
    {
      id: "advanced",
      label: isEn ? "Advanced" : "İleri Seviye",
      sub: isEn ? "Resilient & Queues" : "Gelişmiş & Dayanıklı",
    },
    {
      id: "enterprise",
      label: isEn ? "Enterprise" : "Kurumsal",
      sub: isEn ? "High Scale & Cluster" : "Büyük Ölçek & Dağıtık",
    },
  ];

  const deliveries: { id: DeliveryId; label: string; sub: string; icon: typeof Database }[] = [
    {
      id: "database",
      label: isEn ? deliveryMeta.database.labelEN : deliveryMeta.database.labelTR,
      sub: isEn ? deliveryMeta.database.subEN : deliveryMeta.database.subTR,
      icon: Database,
    },
    {
      id: "api",
      label: isEn ? deliveryMeta.api.labelEN : deliveryMeta.api.labelTR,
      sub: isEn ? deliveryMeta.api.subEN : deliveryMeta.api.subTR,
      icon: Network,
    },
    {
      id: "dashboard",
      label: isEn ? deliveryMeta.dashboard.labelEN : deliveryMeta.dashboard.labelTR,
      sub: isEn ? deliveryMeta.dashboard.subEN : deliveryMeta.dashboard.subTR,
      icon: LayoutDashboard,
    },
  ];

  return (
    <div className="rounded-3xl border border-border/80 bg-card/75 p-6 md:p-10 shadow-sm backdrop-blur-md">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red dark:bg-rose-500/10 dark:text-rose-400">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-red dark:text-rose-400">
                {isEn ? "Interactive Scope Estimator" : "İnteraktif Kapsam Simülatörü"}
              </span>
            </div>
            <h3 className="font-jakarta text-2xl font-bold tracking-tight text-foreground md:text-3xl mt-0.5">
              {isEn ? `${config.serviceNameEN} Scope & Timeline` : `${config.serviceNameTR} Kapsam & Süre`}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground md:text-sm">
              {isEn
                ? "Select specific technical methods and delivery formats to see realistic turnaround time and architecture."
                : "Hizmete özel teknik yöntemleri ve teslimat modelini seçerek gerçekçi geliştirme süresini ve mimariyi hesaplayın."}
            </p>
          </div>
        </div>
        <div className="self-start md:self-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/90 px-3.5 py-1 text-xs font-medium text-muted-foreground shadow-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            {isEn ? "Live Architecture Simulator" : "Dinamik Mimari Simülatörü"}
          </span>
        </div>
      </div>

      {/* Main Grid: Controls (7 cols) & Live Results (5 cols) */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Controls Column */}
        <div className="space-y-7 lg:col-span-7">
          {/* Step 1: Technical Methods tailored to this service */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {isEn ? "1. Technical Method & Architecture" : "1. Yöntem & Mimari Yaklaşım"}
              </label>
              <span className="text-[11px] text-muted-foreground">
                {isEn ? "4 Specialized Methods" : "4 Uzmanlık Yöntemi"}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {config.methods.map((method, idx) => {
                const Icon = methodIcons[idx % methodIcons.length];
                const active = activeMethod.id === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedMethodId(method.id)}
                    className={`group relative flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all ${
                      active
                        ? "border-brand-red bg-brand-red/[0.08] text-foreground ring-1 ring-brand-red/30 dark:border-rose-500/80 dark:bg-rose-950/25 dark:ring-rose-500/30 shadow-xs"
                        : "border-border/60 bg-background/50 text-muted-foreground hover:border-border hover:bg-card hover:text-foreground"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors mt-0.5 ${
                        active
                          ? "bg-brand-red text-white dark:bg-rose-500"
                          : "bg-muted text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-foreground leading-snug">
                        {isEn ? method.labelEN : method.labelTR}
                      </div>
                      <div className="text-[11px] text-muted-foreground leading-tight mt-1">
                        {isEn ? method.subEN : method.subTR}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Scale & Complexity */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {isEn ? "2. Scale & Complexity" : "2. Ölçek & Karmaşıklık"}
              </label>
              <span className="text-[11px] text-muted-foreground">
                {isEn ? "Tier level" : "Mimari seviye"}
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
                {isEn ? "Output format" : "Çıktı modeli"}
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

        {/* Live Architecture Results Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-border/80 bg-background/95 p-6 md:p-8 backdrop-blur-sm shadow-sm lg:col-span-5">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {isEn ? "Architecture Spec" : "Mimari Kapsam"}
              </span>
              <span className="inline-flex items-center rounded-full bg-brand-red/10 px-3 py-1 text-xs font-semibold text-brand-red dark:bg-rose-500/15 dark:text-rose-300 max-w-full text-center leading-normal">
                {levelBadge}
              </span>
            </div>

            <div className="mt-6">
              <span className="text-xs font-medium text-muted-foreground">
                {isEn ? "Estimated Turnaround:" : "Tahmini Teslim Süresi:"}
              </span>
              <div className="mt-1 font-jakarta text-3xl font-extrabold text-foreground md:text-4xl tracking-tight text-emerald-600 dark:text-emerald-400">
                {time}
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {isEn
                  ? "Turnaround time tailored to selected method, scale, and delivery model"
                  : "Seçilen yöntem, karmaşıklık ve teslimat formatına göre optimize edilmiş gerçekçi süre"}
              </p>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {summary}
            </p>

            <div className="mt-6 border-t border-border/50 pt-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {isEn ? "Recommended Stack:" : "Önerilen Teknoloji Yığını:"}
              </span>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {techStack.map((t) => (
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
