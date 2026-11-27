import { z } from "zod";
import { CONTACT_EMAIL } from "@/lib/site";
import {
  deliveryMeta,
  getServiceConfig,
  type ComplexityId,
  type DeliveryId,
} from "@/lib/calculator-configs";

export const BUDGET_OPTIONS = [
  "under_1k",
  "1k_3k",
  "3k_7k",
  "7k_plus",
  "undecided",
] as const;

export const TIMELINE_OPTIONS = [
  "asap",
  "this_month",
  "flexible",
] as const;

export const ContactBriefSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Ad en az 2 karakter olmalıdır / Name must be at least 2 characters.")
      .max(100, "Ad en fazla 100 karakter olabilir / Name cannot exceed 100 characters."),
    email: z
      .string()
      .trim()
      .email("Geçerli bir e-posta adresi girin / Please enter a valid email address.")
      .max(160, "E-posta en fazla 160 karakter olabilir."),
    company: z
      .string()
      .trim()
      .max(120, "Şirket/proje adı en fazla 120 karakter olabilir.")
      .optional()
      .default(""),
    service: z
      .string()
      .trim()
      .min(1, "Lütfen bir hizmet seçin / Please select a service.")
      .max(80),
    method: z.string().trim().max(80).optional().default(""),
    complexity: z.enum(["standard", "advanced", "enterprise"]).optional(),
    delivery: z.enum(["database", "api", "dashboard"]).optional(),
    budgetRange: z.enum(BUDGET_OPTIONS),
    timeline: z.enum(TIMELINE_OPTIONS),
    message: z
      .string()
      .trim()
      .min(15, "Proje özeti en az 15 karakter olmalıdır / Project brief must be at least 15 characters.")
      .max(3000, "Proje özeti en fazla 3000 karakter olabilir."),
    locale: z.enum(["tr", "en"]).default("tr"),
    website: z.string().max(200).optional().default(""),
  })
  .strict();

export type ContactBriefDTO = z.infer<typeof ContactBriefSchema>;
export type BudgetOption = (typeof BUDGET_OPTIONS)[number];
export type TimelineOption = (typeof TIMELINE_OPTIONS)[number];

const budgetLabels: Record<BudgetOption, { tr: string; en: string }> = {
  under_1k: { tr: "$1.000 altı / Küçük MVP", en: "Under $1,000 / Lean MVP" },
  "1k_3k": { tr: "$1.000 - $3.000", en: "$1,000 - $3,000" },
  "3k_7k": { tr: "$3.000 - $7.000", en: "$3,000 - $7,000" },
  "7k_plus": { tr: "$7.000+ / Kapsamlı Sistem", en: "$7,000+ / Full System" },
  undecided: { tr: "Kapsam sonrası netleşecek", en: "To be scoped together" },
};

const timelineLabels: Record<TimelineOption, { tr: string; en: string }> = {
  asap: { tr: "Acil (1-2 hafta içinde başlangıç)", en: "ASAP (Start within 1-2 weeks)" },
  this_month: { tr: "Bu ay içinde", en: "Within this month" },
  flexible: { tr: "Esnek zaman planı", en: "Flexible timeline" },
};

const complexityLabels: Record<ComplexityId, { tr: string; en: string }> = {
  standard: { tr: "MVP / Standart", en: "MVP / Standard" },
  advanced: { tr: "İleri Seviye", en: "Advanced" },
  enterprise: { tr: "Kurumsal / Yüksek Ölçek", en: "Enterprise / High Scale" },
};

export function getBudgetLabel(option: BudgetOption, locale: "tr" | "en") {
  return budgetLabels[option][locale];
}

export function getTimelineLabel(option: TimelineOption, locale: "tr" | "en") {
  return timelineLabels[option][locale];
}

export function getComplexityLabel(complexity: ComplexityId, locale: "tr" | "en") {
  return complexityLabels[complexity][locale];
}

export function resolveScopeSummary(input: {
  service: string;
  method?: string;
  complexity?: ComplexityId;
  delivery?: DeliveryId;
  locale: "tr" | "en";
}) {
  const isEn = input.locale === "en";
  const serviceConfig = getServiceConfig(input.service);
  const method = input.method
    ? serviceConfig.methods.find((m) => m.id === input.method)
    : undefined;
  const delivery = input.delivery ? deliveryMeta[input.delivery] : undefined;
  const estimate =
    method && input.complexity && input.delivery
      ? method.timelines[input.complexity][input.delivery][input.locale]
      : undefined;

  return {
    serviceTitle: isEn ? serviceConfig.serviceNameEN : serviceConfig.serviceNameTR,
    methodTitle: method ? (isEn ? method.labelEN : method.labelTR) : undefined,
    complexityTitle: input.complexity ? getComplexityLabel(input.complexity, input.locale) : undefined,
    deliveryTitle: delivery ? (isEn ? delivery.labelEN : delivery.labelTR) : undefined,
    estimatedTimeline: estimate,
  };
}

export function buildContactBriefText(data: ContactBriefDTO): {
  subject: string;
  body: string;
  mailtoUrl: string;
} {
  const isEn = data.locale === "en";
  const scope = resolveScopeSummary({
    service: data.service,
    method: data.method,
    complexity: data.complexity,
    delivery: data.delivery,
    locale: data.locale,
  });

  const subject = isEn
    ? `[Project Brief] ${scope.serviceTitle} — ${data.name}`
    : `[Proje Talebi] ${scope.serviceTitle} — ${data.name}`;

  const lines = [
    isEn ? `Name: ${data.name}` : `Ad Soyad: ${data.name}`,
    `Email: ${data.email}`,
    ...(data.company ? [isEn ? `Company / Project: ${data.company}` : `Şirket / Proje: ${data.company}`] : []),
    isEn ? `Service: ${scope.serviceTitle}` : `Hizmet: ${scope.serviceTitle}`,
    ...(scope.methodTitle ? [isEn ? `Architecture: ${scope.methodTitle}` : `Mimari Yaklaşım: ${scope.methodTitle}`] : []),
    ...(scope.complexityTitle ? [isEn ? `Scope Tier: ${scope.complexityTitle}` : `Kapsam Seviyesi: ${scope.complexityTitle}`] : []),
    ...(scope.deliveryTitle ? [isEn ? `Delivery Layer: ${scope.deliveryTitle}` : `Teslimat Katmanı: ${scope.deliveryTitle}`] : []),
    ...(scope.estimatedTimeline ? [isEn ? `Estimated Window: ${scope.estimatedTimeline}` : `Tahmini Süre: ${scope.estimatedTimeline}`] : []),
    isEn
      ? `Budget Range: ${getBudgetLabel(data.budgetRange, "en")}`
      : `Bütçe Aralığı: ${getBudgetLabel(data.budgetRange, "tr")}`,
    isEn
      ? `Target Start: ${getTimelineLabel(data.timeline, "en")}`
      : `Başlangıç Zamanı: ${getTimelineLabel(data.timeline, "tr")}`,
    "",
    isEn ? "Project Brief:" : "Proje Detayları:",
    data.message,
  ];

  const body = lines.join("\n");
  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return { subject, body, mailtoUrl };
}
