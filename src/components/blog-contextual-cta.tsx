import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/translations";

interface BlogContextualCTAProps {
  category: string;
  locale?: Locale;
}

export function BlogContextualCTA({ category, locale = "tr" }: BlogContextualCTAProps) {
  const isEn = locale === "en";
  const catLower = category.toLowerCase();

  let target = {
    title: isEn ? "Custom Software Development" : "Özel Yazılım Geliştirme",
    desc: isEn
      ? "Need a tailor-made digital solution or enterprise automation designed around your workflow?"
      : "İş süreçlerinize özel, sürdürülebilir bir web uygulaması veya yazılım mimarisine mi ihtiyacınız var?",
    href: isEn ? "/en/services/custom-software-development" : "/hizmetler/ozel-yazilim-gelistirme",
    cta: isEn ? "Explore Custom Software" : "Özel Yazılım Hizmetini İnceleyin",
  };

  if (catLower.includes("scraping") || catLower.includes("veri") || catLower.includes("bot")) {
    target = {
      title: isEn ? "Web Scraping & Data Pipeline Services" : "Web Scraping & Veri Toplama Çözümleri",
      desc: isEn
        ? "Build robust, anti-bot resilient scraping pipelines that reliably deliver structured data to your databases."
        : "Anti-bot korumalarına dayanıklı, otomatik veri çeken ve API/veritabanınıza aktaran otonom scraping sistemleri kurun.",
      href: isEn ? "/en/services/web-scraping" : "/hizmetler/web-scraping",
      cta: isEn ? "Explore Scraping Services" : "Web Scraping Hizmetini İnceleyin",
    };
  } else if (catLower.includes("yapay zeka") || catLower.includes("ai") || catLower.includes("llm") || catLower.includes("rag")) {
    target = {
      title: isEn ? "AI & Intelligent Workflow Automation" : "Yapay Zekâ & AI Otomasyon Hizmeti",
      desc: isEn
        ? "Integrate LLMs, private RAG pipelines, and automated multi-agent workflows into your core business operations."
        : "Şirket verilerinizi güvenli RAG ve LLM iş akışlarıyla birleştirerek operasyonel iş yükünüzü sıfıra indirin.",
      href: isEn ? "/en/services/ai-automation" : "/hizmetler/yapay-zeka-otomasyon",
      cta: isEn ? "Explore AI Solutions" : "AI Otomasyon Hizmetini İnceleyin",
    };
  } else if (catLower.includes("api") || catLower.includes("backend") || catLower.includes("fastapi")) {
    target = {
      title: isEn ? "High-Performance REST API Architecture" : "API Geliştirme & Sistem Entegrasyonu",
      desc: isEn
        ? "Design sub-50ms latency REST APIs, caching layers, and microservices built for scalability."
        : "Yüksek trafik altında milisaniye seviyesinde yanıt veren, güvenli ve ölçeklenebilir REST API altyapıları oluşturun.",
      href: isEn ? "/en/services/api-development" : "/hizmetler/api-gelistirme",
      cta: isEn ? "Explore API Architecture" : "API Geliştirme Hizmetini İnceleyin",
    };
  } else if (catLower.includes("next.js") || catLower.includes("react") || catLower.includes("frontend")) {
    target = {
      title: isEn ? "Modern Next.js 16 Web Development" : "Next.js Web Uygulama Geliştirme",
      desc: isEn
        ? "Launch lightning-fast, SEO-optimized React 19 web applications with 90+ Core Web Vitals scores."
        : "React 19 ve App Router ile ultra hızlı, SEO uyumlu ve modern Next.js web platformları hayata geçirin.",
      href: isEn ? "/en/services/nextjs-development" : "/hizmetler/nextjs-gelistirme",
      cta: isEn ? "Explore Next.js Services" : "Next.js Hizmetini İnceleyin",
    };
  }

  return (
    <aside
      aria-label="Contextual service recommendation"
      className="my-12 rounded-3xl border border-brand-red/30 bg-gradient-to-br from-brand-red/[0.06] via-card to-background p-6 md:p-8 backdrop-blur-sm shadow-[0_0_30px_rgba(220,38,38,0.05)]"
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-red dark:text-rose-400">
        <Sparkles className="h-4 w-4" />
        <span>{isEn ? "Recommended Service" : "İlgili Profesyonel Hizmet"}</span>
      </div>
      <h3 className="mt-3 font-jakarta text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {target.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
        {target.desc}
      </p>
      <div className="mt-6">
        <Link
          href={target.href}
          className="inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-red-700 hover:shadow-brand-red/20"
        >
          <span>{target.cta}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}
