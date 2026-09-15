"use client";

import { useState, useId, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Send, Loader2, AlertCircle, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import type { Locale } from "@/lib/translations";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/components/language-context";
import { trackEvent } from "@/lib/analytics";

interface ContactFormInnerProps {
  locale?: Locale;
}

const SERVICE_OPTIONS = {
  tr: [
    { value: "rakip-fiyat-takip-sistemi", label: "Rakip Fiyat & Stok Takip Sistemi" },
    { value: "e-ticaret-urun-veri-aktarimi", label: "E-Ticaret Ürün & Katalog Aktarımı" },
    { value: "web-scraping", label: "Özel Web Scraping & Veri Hattı" },
    { value: "yapay-zeka-otomasyon", label: "Yapay Zekâ & Süreç Otomasyonu" },
    { value: "api-gelistirme", label: "Özel REST API & Backend Mimarisi" },
    { value: "nextjs-gelistirme", label: "Next.js Web Uygulaması / SaaS" },
    { value: "ozel-yazilim-gelistirme", label: "İşletmelere Özel Yazılım Geliştirme" },
    { value: "diger", label: "Diğer / Özel Proje Danışmanlığı" },
  ],
  en: [
    { value: "rakip-fiyat-takip-sistemi", label: "Competitor Price & Stock Tracking" },
    { value: "e-ticaret-urun-veri-aktarimi", label: "E-Commerce Product & Catalog Migration" },
    { value: "web-scraping", label: "Custom Web Scraping & Data Pipeline" },
    { value: "yapay-zeka-otomasyon", label: "AI Automation & Workflows" },
    { value: "api-gelistirme", label: "Custom REST API & Backend Architecture" },
    { value: "nextjs-gelistirme", label: "Next.js Web App / SaaS Development" },
    { value: "ozel-yazilim-gelistirme", label: "Custom Software Development" },
    { value: "diger", label: "Other / Custom Consultation" },
  ],
};

function ContactFormInner({ locale = "tr" }: ContactFormInnerProps) {
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const isEn = locale === "en";

  const formId = useId();

  // Parse preselected service from query params
  const initialServiceQuery = searchParams.get("service") || "";
  const initialService = (() => {
    if (initialServiceQuery.includes("fiyat") || initialServiceQuery.includes("price")) return "rakip-fiyat-takip-sistemi";
    if (initialServiceQuery.includes("urun") || initialServiceQuery.includes("product") || initialServiceQuery.includes("aktarim") || initialServiceQuery.includes("catalog")) return "e-ticaret-urun-veri-aktarimi";
    if (initialServiceQuery.includes("scraping")) return "web-scraping";
    if (initialServiceQuery.includes("ai") || initialServiceQuery.includes("zeka")) return "yapay-zeka-otomasyon";
    if (initialServiceQuery.includes("api")) return "api-gelistirme";
    if (initialServiceQuery.includes("nextjs") || initialServiceQuery.includes("fullstack")) return "nextjs-gelistirme";
    if (initialServiceQuery.includes("ozel") || initialServiceQuery.includes("yazilim") || initialServiceQuery.includes("custom")) return "ozel-yazilim-gelistirme";
    return "rakip-fiyat-takip-sistemi";
  })();

  const initialMethod = searchParams.get("method") || "";
  const initialComplexity = searchParams.get("complexity") || "";
  const initialDelivery = searchParams.get("delivery") || "";

  const initialMessage = (() => {
    if (!initialMethod && !initialComplexity && !initialDelivery) return "";
    const matchedService = SERVICE_OPTIONS[isEn ? "en" : "tr"].find((s) => s.value === initialService)?.label || initialService;
    if (isEn) {
      return `Hello Canpolat, I would like to initiate a project under "${matchedService}" scope with the parameters I selected on your calculator (Method: ${initialMethod}, Scale: ${initialComplexity}, Delivery: ${initialDelivery}). Let's discuss details and kickoff timeline.`;
    }
    return `Merhaba Canpolat Bey, hesaplayıcıda seçtiğim mimari kapsam dahilinde ("${matchedService}", Yöntem: ${initialMethod}, Ölçek: ${initialComplexity}, Teslimat: ${initialDelivery}) bir proje başlatmak istiyorum. Detayları ve başlama tarihini görüşebilir miyiz?`;
  })();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(initialService);
  const [message, setMessage] = useState(initialMessage);
  const [honeypot, setHoneypot] = useState("");

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const whatsappText = isEn
    ? `Hello%20Canpolat,%20I'm%20reaching%20out%20from%20your%20website%20regarding%20${encodeURIComponent(initialService)}.`
    : `Merhaba%20Canpolat%20Bey,%20web%20sitenizden%20${encodeURIComponent(initialService)}%20projesi%20i%C3%A7in%20ula%C5%9F%C4%B1yorum.`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error(isEn ? "Please fill in all required fields." : "Lütfen zorunlu alanları eksiksiz doldurun.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const selectedOption = SERVICE_OPTIONS[isEn ? "en" : "tr"].find((s) => s.value === service);
      const serviceLabel = selectedOption ? selectedOption.label : service;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          service: serviceLabel,
          message: message.trim(),
          locale,
          honeypot,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || (isEn ? "Failed to send message." : "Mesaj iletilemedi."));
      }

      setStatus("success");
      trackEvent("generate_lead", {
        service,
        locale,
        location: "contact_form",
      });
      toast.success(isEn ? "Inquiry sent successfully!" : "Proje talebiniz başarıyla iletildi!");
    } catch (err: unknown) {
      console.error("Contact form error:", err);
      const msg = err instanceof Error ? err.message : (isEn ? "Something went wrong." : "Bir hata oluştu.");
      setStatus("error");
      setErrorMessage(msg);
      toast.error(msg);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setStatus("idle");
    setErrorMessage("");
  };

  if (status === "success") {
    return (
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-emerald-500/30 bg-card/90 p-8 text-center backdrop-blur-md shadow-[0_0_40px_rgba(16,185,129,0.1)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h3 className="mt-5 font-jakarta text-2xl font-extrabold text-foreground">
          {t(translations.contact.formSuccessTitle)}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {t(translations.contact.formSuccessDesc)}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto rounded-xl border border-border/80 bg-background/80 px-5 py-2.5 text-xs font-semibold text-foreground transition-all hover:bg-card hover:border-foreground/30"
          >
            {t(translations.contact.formSendAnother)}
          </button>
          <a
            href={`https://wa.me/905436214152?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-emerald-500 shadow-md"
          >
            <MessageCircle className="h-4 w-4" />
            {t(translations.contact.whatsappButton)}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-xl rounded-3xl border border-border/70 bg-card/60 p-6 sm:p-8 backdrop-blur-md shadow-xl text-left"
    >
      {/* Honeypot hidden input */}
      <input
        type="text"
        name="website_url"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {status === "error" && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-500 dark:text-rose-400">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{isEn ? "Submission Error" : "Gönderim Hatası"}</p>
            <p className="mt-0.5 text-muted-foreground">{errorMessage || t(translations.contact.formErrorDesc)}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor={`${formId}-name`} className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {t(translations.contact.formName)} <span className="text-brand-red">*</span>
          </label>
          <input
            id={`${formId}-name`}
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isEn ? "e.g. John Doe" : "Örn: Can Kaya"}
            className="mt-1.5 w-full rounded-xl border border-border/80 bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
          />
        </div>

        {/* Email & Phone Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-email`} className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t(translations.contact.formEmail)} <span className="text-brand-red">*</span>
            </label>
            <input
              id={`${formId}-email`}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isEn ? "john@company.com" : "adiniz@sirketiniz.com"}
              className="mt-1.5 w-full rounded-xl border border-border/80 bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
            />
          </div>

          <div>
            <label htmlFor={`${formId}-phone`} className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t(translations.contact.formPhone)}
            </label>
            <input
              id={`${formId}-phone`}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={isEn ? "+1 (555) 000-0000" : "+90 5XX XXX XX XX"}
              className="mt-1.5 w-full rounded-xl border border-border/80 bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
            />
          </div>
        </div>

        {/* Service Selector */}
        <div>
          <label htmlFor={`${formId}-service`} className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {t(translations.contact.formService)}
          </label>
          <div className="relative mt-1.5">
            <select
              id={`${formId}-service`}
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full appearance-none rounded-xl border border-border/80 bg-background/80 px-4 py-3 text-sm text-foreground transition-all focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
            >
              {SERVICE_OPTIONS[isEn ? "en" : "tr"].map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
              ▼
            </div>
          </div>
        </div>

        {/* Message / Project Details */}
        <div>
          <label htmlFor={`${formId}-message`} className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {t(translations.contact.formMessage)} <span className="text-brand-red">*</span>
          </label>
          <textarea
            id={`${formId}-message`}
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              isEn
                ? "Briefly outline target platforms, expected data scale, or system requirements..."
                : "Hedeflediğiniz kaynaklar, tahmini ürün/veri hacmi ve beklentilerinizi kısaca özetleyin..."
            }
            className="mt-1.5 w-full resize-y rounded-xl border border-border/80 bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red py-3.5 px-6 text-sm font-bold text-white shadow-lg transition-all hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-brand-red/25"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{t(translations.contact.formSubmitting)}</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            <span>{t(translations.contact.formSubmit)}</span>
          </>
        )}
      </button>

      {/* Direct WhatsApp Alternative */}
      <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4 text-xs text-muted-foreground">
        <span>{isEn ? "Prefer direct instant chat?" : "Doğrudan hızlı mesajlaşmak ister misiniz?"}</span>
        <a
          href={`https://wa.me/905436214152?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </form>
  );
}

export function ContactForm({ locale = "tr" }: ContactFormInnerProps) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-xl rounded-3xl border border-border/70 bg-card/60 p-8 backdrop-blur-md animate-pulse h-96 flex items-center justify-center text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      }
    >
      <ContactFormInner locale={locale} />
    </Suspense>
  );
}
