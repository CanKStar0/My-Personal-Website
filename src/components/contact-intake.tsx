"use client";

import { useId, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  RotateCcw,
  Send,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";
import {
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
  buildContactBriefText,
  getBudgetLabel,
  getTimelineLabel,
  resolveScopeSummary,
  type BudgetOption,
  type TimelineOption,
} from "@/lib/contact-schema";
import {
  serviceConfigs,
  type ComplexityId,
  type DeliveryId,
} from "@/lib/calculator-configs";
import { CONTACT_EMAIL } from "@/lib/site";
import type { Locale } from "@/lib/translations";

interface ContactIntakeProps {
  locale: Locale;
}

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | {
      status: "success";
      delivery: "dispatched" | "mailto_fallback" | "accepted";
      referenceId: string;
      subject: string;
      summaryText: string;
      mailtoUrl: string;
    }
  | { status: "error"; message: string; mailtoUrl: string };

const VALID_COMPLEXITIES = new Set<ComplexityId>(["standard", "advanced", "enterprise"]);
const VALID_DELIVERIES = new Set<DeliveryId>(["database", "api", "dashboard"]);

export function ContactIntake({ locale }: ContactIntakeProps) {
  const searchParams = useSearchParams();
  const paramKey = searchParams.toString();

  return (
    <ContactIntakeForm
      key={paramKey}
      locale={locale}
      serviceParam={searchParams.get("service") ?? ""}
      methodParam={searchParams.get("method") ?? ""}
      complexityParam={searchParams.get("complexity") ?? ""}
      deliveryParam={searchParams.get("delivery") ?? ""}
    />
  );
}

interface ContactIntakeFormProps {
  locale: Locale;
  serviceParam: string;
  methodParam: string;
  complexityParam: string;
  deliveryParam: string;
}

function ContactIntakeForm({
  locale,
  serviceParam,
  methodParam,
  complexityParam,
  deliveryParam,
}: ContactIntakeFormProps) {
  const isEn = locale === "en";
  const formId = useId();

  const initialService =
    serviceParam && serviceConfigs[serviceParam]
      ? serviceParam
      : "ozel-yazilim-gelistirme";

  const initialComplexity: ComplexityId | undefined = VALID_COMPLEXITIES.has(
    complexityParam as ComplexityId
  )
    ? (complexityParam as ComplexityId)
    : undefined;

  const initialDelivery: DeliveryId | undefined = VALID_DELIVERIES.has(
    deliveryParam as DeliveryId
  )
    ? (deliveryParam as DeliveryId)
    : undefined;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState(initialService);
  const [method, setMethod] = useState(methodParam);
  const [complexity, setComplexity] = useState<ComplexityId | undefined>(initialComplexity);
  const [delivery, setDelivery] = useState<DeliveryId | undefined>(initialDelivery);
  const [budgetRange, setBudgetRange] = useState<BudgetOption>("1k_3k");
  const [timeline, setTimeline] = useState<TimelineOption>("this_month");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const [copiedBrief, setCopiedBrief] = useState(false);

  const serviceOptions = useMemo(() => Object.values(serviceConfigs), []);

  const activeScope = useMemo(
    () =>
      resolveScopeSummary({
        service,
        method: method || undefined,
        complexity,
        delivery,
        locale,
      }),
    [service, method, complexity, delivery, locale]
  );

  const hasCalculatorPreset = Boolean(method || complexity || delivery);

  const clearCalculatorPreset = () => {
    setMethod("");
    setComplexity(undefined);
    setDelivery(undefined);
  };

  const handleServiceChange = (nextService: string) => {
    setService(nextService);
    if (nextService !== service) {
      setMethod("");
      setComplexity(undefined);
      setDelivery(undefined);
    }
  };

  const buildFallbackMailto = () => {
    return buildContactBriefText({
      name: name.trim() || (isEn ? "Prospective Client" : "Potansiyel Müşteri"),
      email: email.trim() || CONTACT_EMAIL,
      company: company.trim(),
      service,
      method,
      complexity,
      delivery,
      budgetRange,
      timeline,
      message: message.trim() || (isEn ? "Project inquiry" : "Proje talebi"),
      locale,
      website: "",
    }).mailtoUrl;
  };

  const validateLocally = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (name.trim().length < 2) {
      errors.name = isEn
        ? "Please enter at least 2 characters."
        : "Lütfen en az 2 karakter girin.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = isEn
        ? "Please enter a valid email address."
        : "Lütfen geçerli bir e-posta adresi girin.";
    }
    if (message.trim().length < 15) {
      errors.message = isEn
        ? "Please describe your project in at least 15 characters."
        : "Lütfen projenizi en az 15 karakterle özetleyin.";
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const localErrors = validateLocally();
    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors);
      return;
    }

    setFieldErrors({});
    setSubmitState({ status: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          service,
          method,
          complexity,
          delivery,
          budgetRange,
          timeline,
          message: message.trim(),
          locale,
          website,
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload?.success) {
        if (response.status === 422 && Array.isArray(payload?.error?.details)) {
          const serverErrors: Record<string, string> = {};
          for (const item of payload.error.details) {
            if (item?.field && item?.issue) {
              serverErrors[item.field] = item.issue;
            }
          }
          setFieldErrors(serverErrors);
          setSubmitState({ status: "idle" });
          return;
        }

        setSubmitState({
          status: "error",
          message: isEn
            ? "Could not reach the delivery service right now. You can retry or send your pre-filled brief directly via email."
            : "İletim servisine şu an ulaşılamadı. Tekrar deneyebilir veya hazır proje özetini doğrudan e-posta ile gönderebilirsiniz.",
          mailtoUrl: buildFallbackMailto(),
        });
        return;
      }

      trackEvent("contact_brief_submit", {
        service,
        budgetRange,
        timeline,
        deliveryMode: payload.data.delivery,
        locale,
      });

      setSubmitState({
        status: "success",
        delivery: payload.data.delivery,
        referenceId: payload.data.referenceId,
        subject: payload.data.subject ?? "",
        summaryText: payload.data.summaryText ?? "",
        mailtoUrl: payload.data.mailtoUrl ?? buildFallbackMailto(),
      });
    } catch {
      setSubmitState({
        status: "error",
        message: isEn
          ? "Network error while preparing your brief. Please retry or use direct email."
          : "Bağlantı hatası oluştu. Lütfen tekrar deneyin veya doğrudan e-posta seçeneğini kullanın.",
        mailtoUrl: buildFallbackMailto(),
      });
    }
  };

  const handleCopyBrief = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedBrief(true);
      trackEvent("contact_brief_copy", { service, locale });
      toast.success(
        isEn ? "Project brief copied to clipboard." : "Proje özeti panoya kopyalandı."
      );
      setTimeout(() => setCopiedBrief(false), 2500);
    } catch {
      toast.error(
        isEn ? "Could not access clipboard." : "Panoya kopyalanamadı."
      );
    }
  };

  const resetForm = () => {
    setSubmitState({ status: "idle" });
    setFieldErrors({});
  };

  if (submitState.status === "success") {
    const isDirectDispatched = submitState.delivery === "dispatched";

    return (
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <CheckCircle2
            className="mt-0.5 size-6 shrink-0 text-emerald-600 dark:text-emerald-400"
            aria-hidden="true"
          />
          <div>
            <h2 className="font-jakarta text-xl font-bold tracking-tight text-foreground text-balance sm:text-2xl">
              {isDirectDispatched
                ? isEn
                  ? "Project brief received"
                  : "Proje özetiniz ulaştı"
                : isEn
                  ? "Your project brief is ready to send"
                  : "Proje özetiniz gönderime hazır"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
              {isDirectDispatched
                ? isEn
                  ? "Thank you. I have received your scope details and will respond within 24 hours."
                  : "Teşekkürler. Kapsam detaylarınız bana ulaştı; 24 saat içinde teknik değerlendirmeyle dönüş yapacağım."
                : isEn
                  ? "Direct email delivery is the fastest channel right now. Open your mail app with this pre-filled brief or copy it to send from any client."
                  : "Özetiniz yapılandırıldı. Aşağıdaki butonla e-posta uygulamanızda tek tıkla gönderebilir veya metni kopyalayıp istediğiniz kanaldan iletebilirsiniz."}
            </p>
            <p className="mt-3 text-xs font-mono text-muted-foreground tabular-nums">
              {isEn ? "Reference ID:" : "Referans Kodu:"} {submitState.referenceId}
            </p>
          </div>
        </div>

        {submitState.summaryText && (
          <pre className="mt-6 max-h-64 overflow-y-auto whitespace-pre-wrap rounded-xl border border-border bg-background p-4 text-xs leading-relaxed text-foreground font-mono">
            {submitState.summaryText}
          </pre>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={submitState.mailtoUrl}
            onClick={() => trackEvent("contact_email_click", { location: "brief_summary" })}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-red px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Mail className="size-4" aria-hidden="true" />
            <span>{isEn ? "Open in Email App" : "E-posta Uygulamasında Aç"}</span>
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>

          {submitState.summaryText && (
            <button
              type="button"
              onClick={() => handleCopyBrief(submitState.summaryText)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              {copiedBrief ? (
                <Check className="size-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              ) : (
                <Copy className="size-4" aria-hidden="true" />
              )}
              <span>
                {copiedBrief
                  ? isEn
                    ? "Copied"
                    : "Kopyalandı"
                  : isEn
                    ? "Copy Brief"
                    : "Özeti Kopyala"}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={resetForm}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            <span>{isEn ? "Edit Brief" : "Bilgileri Düzenle"}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
      aria-labelledby={`${formId}-heading`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4">
        <h2
          id={`${formId}-heading`}
          className="font-jakarta text-xl font-bold tracking-tight text-foreground text-balance"
        >
          {isEn ? "Project Scope & Brief" : "Proje Kapsamı & Teklif Özeti"}
        </h2>
        <span className="text-xs font-medium text-muted-foreground tabular-nums">
          {isEn ? "~2 min to fill" : "Yaklaşık 2 dk"}
        </span>
      </div>

      {/* Preserved Scope Banner from Service Calculator */}
      {hasCalculatorPreset && (
        <div className="mt-5 rounded-xl border border-border bg-background p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-foreground">
                {isEn ? "Imported from Scope Calculator" : "Hizmet Hesaplayıcıdan Aktarılan Kapsam"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground text-pretty">
                {[
                  activeScope.serviceTitle,
                  activeScope.methodTitle,
                  activeScope.complexityTitle,
                  activeScope.deliveryTitle,
                ]
                  .filter(Boolean)
                  .join(" • ")}
              </p>
              {activeScope.estimatedTimeline && (
                <p className="mt-1.5 text-xs font-medium text-brand-red tabular-nums">
                  {isEn ? "Estimated delivery:" : "Tahmini teslimat:"}{" "}
                  {activeScope.estimatedTimeline}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={clearCalculatorPreset}
              className="inline-flex min-h-8 shrink-0 items-center rounded-lg px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {isEn ? "Clear" : "Sıfırla"}
            </button>
          </div>
        </div>
      )}

      {/* Error State Banner */}
      {submitState.status === "error" && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-destructive/40 bg-destructive/5 p-4"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
            <div className="text-sm text-foreground">
              <p className="text-pretty">{submitState.message}</p>
              <a
                href={submitState.mailtoUrl}
                className="mt-2 inline-flex items-center gap-1.5 font-semibold text-brand-red underline-offset-4 hover:underline"
              >
                <Mail className="size-4" aria-hidden="true" />
                <span>{isEn ? "Send directly via email app" : "Doğrudan e-posta ile gönder"}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Honeypot field */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="mt-6 space-y-5">
        {/* Name & Email */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor={`${formId}-name`}
              className="block text-sm font-medium text-foreground"
            >
              {isEn ? "Full Name" : "Ad Soyad"} <span className="text-brand-red">*</span>
            </label>
            <input
              id={`${formId}-name`}
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? `${formId}-name-error` : undefined}
              placeholder={isEn ? "Jane Doe" : "Ahmet Yılmaz"}
              className="mt-1.5 w-full min-h-11 rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
            />
            {fieldErrors.name && (
              <p id={`${formId}-name-error`} className="mt-1.5 text-xs text-destructive">
                {fieldErrors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={`${formId}-email`}
              className="block text-sm font-medium text-foreground"
            >
              {isEn ? "Email Address" : "E-posta Adresi"} <span className="text-brand-red">*</span>
            </label>
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? `${formId}-email-error` : undefined}
              placeholder="name@company.com"
              className="mt-1.5 w-full min-h-11 rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
            />
            {fieldErrors.email && (
              <p id={`${formId}-email-error`} className="mt-1.5 text-xs text-destructive">
                {fieldErrors.email}
              </p>
            )}
          </div>
        </div>

        {/* Company & Service */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor={`${formId}-company`}
              className="block text-sm font-medium text-foreground"
            >
              {isEn ? "Company or Project (Optional)" : "Şirket veya Proje Adı (Opsiyonel)"}
            </label>
            <input
              id={`${formId}-company`}
              name="company"
              type="text"
              autoComplete="organization"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder={isEn ? "Acme Commerce" : "Örn: Kaya E-Ticaret"}
              className="mt-1.5 w-full min-h-11 rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
            />
          </div>

          <div>
            <label
              htmlFor={`${formId}-service`}
              className="block text-sm font-medium text-foreground"
            >
              {isEn ? "Primary Service" : "Hizmet Alanı"}
            </label>
            <select
              id={`${formId}-service`}
              name="service"
              value={service}
              onChange={(e) => handleServiceChange(e.target.value)}
              className="mt-1.5 w-full min-h-11 rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
            >
              {serviceOptions.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {isEn ? item.serviceNameEN : item.serviceNameTR}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Budget Range */}
        <fieldset>
          <legend className="text-sm font-medium text-foreground">
            {isEn ? "Estimated Budget" : "Tahmini Bütçe Aralığı"}
          </legend>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {BUDGET_OPTIONS.map((option) => {
              const active = budgetRange === option;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setBudgetRange(option)}
                  className={`min-h-11 rounded-xl border px-3 py-2 text-left text-xs font-medium transition-colors tabular-nums ${
                    active
                      ? "border-brand-red bg-brand-red/10 text-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {getBudgetLabel(option, locale)}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Timeline */}
        <fieldset>
          <legend className="text-sm font-medium text-foreground">
            {isEn ? "Target Start" : "Hedeflenen Başlangıç"}
          </legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {TIMELINE_OPTIONS.map((option) => {
              const active = timeline === option;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setTimeline(option)}
                  className={`min-h-11 rounded-xl border px-3 py-2 text-left text-xs font-medium transition-colors ${
                    active
                      ? "border-brand-red bg-brand-red/10 text-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {getTimelineLabel(option, locale)}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Message */}
        <div>
          <label
            htmlFor={`${formId}-message`}
            className="block text-sm font-medium text-foreground"
          >
            {isEn ? "Project Details" : "Proje Detayları"} <span className="text-brand-red">*</span>
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? `${formId}-message-error` : undefined}
            placeholder={
              isEn
                ? "Briefly describe your goal, target websites/APIs, or workflow bottlenecks..."
                : "Hedefinizi, veri çekilecek/entegre edilecek sistemleri veya çözmek istediğiniz darboğazı kısaca yazın..."
            }
            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
          />
          {fieldErrors.message && (
            <p id={`${formId}-message-error`} className="mt-1.5 text-xs text-destructive">
              {fieldErrors.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={submitState.status === "submitting"}
            className="inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-red px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitState.status === "submitting" ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                <span>{isEn ? "Preparing Brief..." : "Proje Özeti Hazırlanıyor..."}</span>
              </>
            ) : (
              <>
                <Send className="size-4" aria-hidden="true" />
                <span>{isEn ? "Send Project Brief" : "Proje Özetini Gönder"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
