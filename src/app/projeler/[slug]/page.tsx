"use client";

import { Navbar } from "@/components/navbar";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-context";
import { translations } from "@/lib/translations";
import { trackEvent } from "@/lib/analytics";
import { SiteFooter } from "@/components/site-footer";
import { getLocalizedPath, localizedServicePath } from "@/lib/i18n";
import {
  ProjectEngineeringCaseStudy,
  HABER_PORTALI_ENGINEERING_DATA,
  BIST_AI_ENGINEERING_DATA,
  FREE_API_ENGINEERING_DATA,
} from "@/components/project-engineering-case-study";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface ProjectFeature {
  titleKey: { tr: string; en: string };
  descKey: { tr: string; en: string };
  imagePath: string | { tr: string; en: string };
}

interface ProjectData {
  slug: string;
  titleKey: { tr: string; en: string };
  summaryKey: { tr: string; en: string };
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  features: ProjectFeature[];
  caseStudy: {
    problem: { tr: string; en: string };
    solution: { tr: string; en: string };
    architecture: { tr: string; en: string };
    dataFlow: { tr: string; en: string };
  };
  relatedServices: { label: { tr: string; en: string }; href: string }[];
}

const PROJECTS_DATA: ProjectData[] = [
  {
    slug: "free-api",
    titleKey: translations.projects.freeapiTitle,
    summaryKey: translations.projects.freeapiDesc,
    techStack: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "Serverless Edge",
      "Anti-Scraping Shield",
      "REST API",
      "Lucide React",
      "Railway Cloud",
      "i18n Multi-Language",
      "SSRF Guard"
    ],
    liveUrl: "https://api.canpolatkaya.com",
    githubUrl: "https://github.com/CanKStar0/Free-API",
    features: [
      {
        titleKey: {
          tr: "01 - IDE Syntax Highlighting & Canlı Terminal Sandbox",
          en: "01 - IDE Syntax Highlighting & Live Terminal Sandbox",
        },
        descKey: {
          tr: "Geliştiricilerin sayfadan ayrılmadan API endpoint'lerini test edebilmesi için macOS/Linux terminal görünümünde inşa edilen interaktif kod konsolu. Renkli sözdizimi vurgulaması (Syntax Highlighting), anlık JSON yanıt gösterimi ve tek tıkla kopyalanabilir cURL, Fetch (JS/TS) ve Python kod blokları sunar.",
          en: "An interactive code console styled like a macOS/Linux terminal, allowing developers to test API endpoints without leaving the page. Features colored syntax highlighting, instant live JSON response preview, and one-click copyable cURL, Fetch (JS/TS), and Python snippets.",
        },
        imagePath: {
          tr: "/images/freeapi-1.png",
          en: "/images/freeapi-1-en.png",
        },
      },
      {
        titleKey: {
          tr: "02 - 46 Çift Dilli Kategori & Bento Metrik Matrisi",
          en: "02 - 46 Bilingual Categories & Bento Metrics Matrix",
        },
        descKey: {
          tr: "Hava Durumu, Finans, Kripto, Yapay Zekâ ve Siber Güvenlik dahil 46 farklı kategoride yapılandırılmış kapsamlı dizin. Canlı metrik rozetleri, anlık arama senkronizasyonu ve yaylı kayan kırmızı hap (Language Toggle) anahtarıyla tam TR/EN dil desteği sağlar.",
          en: "A structured directory spanning 46 distinct categories including Weather, Finance, Crypto, AI, and Cybersecurity. Features live metric badges, instant search synchronization, and seamless TR/EN language switching via a spring-physics red pill toggle.",
        },
        imagePath: {
          tr: "/images/freeapi-2.png",
          en: "/images/freeapi-2-en.png",
        },
      },
      {
        titleKey: {
          tr: "03 - 500+ Doğrulanmış REST API & Canlı Sandbox Çekmecesi",
          en: "03 - 500+ Verified REST APIs & Live Sandbox Drawer",
        },
        descKey: {
          tr: "Her API kartı için rate limit rozetleri, Zero-Auth (kayıtsız kullanım) işaretleri ve detaylı dokümantasyon bağlantıları. Kart bazında açılan alt çekmece sayesinde doğrudan çağrılabilir REST endpoint'leriyle hızlı prototipleme imkanı tanır.",
          en: "Every API card includes rate limit badges, Zero-Auth indicators, and direct documentation links. Slide-out bottom code drawers enable immediate prototyping with live callable REST endpoints.",
        },
        imagePath: {
          tr: "/images/freeapi-3.png",
          en: "/images/freeapi-3-en.png",
        },
      },
      {
        titleKey: {
          tr: "04 - Topluluk API Önerme & 5 Katmanlı Askeri Anti-Scraping Kalkanı",
          en: "04 - Community API Submission & 5-Layer Military Anti-Scraping Shield",
        },
        descKey: {
          tr: "Geliştiricilerin yeni API önerebildiği Discord Webhook entegreli lüks cam modal formu. Veri hırsızlığına karşı; gizli Honeypot tuzakları, Edge Middleware IP rate-limiting, AI bot engelleme (robots.txt noai) ve bot User-Agent filtreleme katmanlarıyla askeri düzeyde koruma sağlar.",
          en: "A glassmorphism modal with Discord webhook pipeline for community API submissions. Protected by a military-grade 5-layer defense shield including invisible Honeypot traps, Edge Middleware rate limiting, AI crawler blocks, and scraper User-Agent filtering.",
        },
        imagePath: {
          tr: "/images/freeapi-4.png",
          en: "/images/freeapi-4-en.png",
        },
      },
    ],
    caseStudy: {
      problem: {
        tr: "Geliştiricilerin hızlı prototip ve üretim aşamasında ihtiyaç duyduğu açık/ücretsiz API'ler internette dağınık, kırık linklerle dolu ve test etmesi zahmetli bir haldeydi. Ayrıca derlenen listelerin botlar tarafından çalınması ciddi bir güvenlik açığı oluşturuyordu.",
        en: "Public and free APIs required by developers during prototyping were scattered, riddled with dead links, and tedious to test. Furthermore, curated catalogs were vulnerable to automated scraper theft.",
      },
      solution: {
        tr: "500+ doğrulanmış API'yi 46 çift dilli kategoride toplayan, tarayıcı üzerinden doğrudan çağrı yapabilen terminal sandbox konsolu ve veritabanını scraper'lara karşı koruyan 5 katmanlı Anti-Scraping Kalkanı içeren modern bir Next.js 15 platformu inşa ettim.",
        en: "I built a modern Next.js 15 platform organizing 500+ verified APIs across 46 bilingual categories, equipped with a browser-executable terminal sandbox and a 5-layer Anti-Scraping Shield protecting the data assets.",
      },
      architecture: {
        tr: "Next.js 15 App Router → Edge Middleware (Bot & Honeypot Guard) → Serverless Proxy Gateway & Health Checker → Dynamic i18n & Search Engine → Framer Motion Glassmorphism UI.",
        en: "Next.js 15 App Router → Edge Middleware (Bot & Honeypot Guard) → Serverless Proxy Gateway & Health Checker → Dynamic i18n & Search Engine → Framer Motion Glassmorphism UI.",
      },
      dataFlow: {
        tr: "İstemci istekleri Edge güvenlik süzgecinden geçer, çift dilli arama motoruyla eşleştirilir, terminal üzerinden yapılan canlı testler CORS-free proxy gateway üzerinden güvenle iletilir.",
        en: "Client requests pass through the Edge security filter, match against the bilingual search engine, and live sandbox calls resolve securely via the CORS-free serverless proxy.",
      },
    },
    relatedServices: [
      { label: { tr: "API Geliştirme", en: "API Development" }, href: "/hizmetler/api-gelistirme" },
      { label: { tr: "Özel Yazılım Geliştirme", en: "Custom Software Development" }, href: "/hizmetler/ozel-yazilim-gelistirme" },
    ],
  },
  {
    slug: "haber-portali",

    titleKey: translations.projects.haberTitle,
    summaryKey: translations.projects.haberDesc,
    techStack: [
      "Next.js 15",
      "TypeScript",
      "React 19",
      "Tailwind CSS v4",
      "MongoDB Atlas",
      "Mongoose Connection Pooling",
      "Playwright",
      "Cheerio",
      "Telegram Bot API",
      "Vercel Serverless",
      "Google News JSON-LD SEO",
      "Lucide React"
    ],
    liveUrl: "https://haber-portali.up.railway.app/",
    githubUrl: "/gizli-repo",
    features: [
      {
        titleKey: {
          tr: "01 - Asimetrik Bento Grid Vitrini & Crimson Glassmorphism",
          en: "01 - Asymmetric Bento Grid Showcase & Crimson Glassmorphism",
        },
        descKey: {
          tr: "Next.js 15, React 19 ve Tailwind CSS v4 ile inşa edilen ana sayfa; The Verge tarzı modern asimetrik Bento Grid düzeniyle en sıcak haberleri 2x2 vitrin kartında toplar. Derin antrasit zemin (#080c14) ve asil kırmızı vurgular, kullanıcının görsel hiyerarşide kaybolmadan en önemli gelişmelere odaklanmasını sağlar.",
          en: "Built with Next.js 15, React 19, and Tailwind CSS v4, the homepage gathers breaking headlines in a modern The Verge-inspired asymmetric 2x2 Bento Grid showcase. Deep anthracite surfaces (#080c14) paired with crimson accents ensure seamless visual hierarchy and high readability.",
        },
        imagePath: {
          tr: "/images/haber-cover-v2.png",
          en: "/images/haber-cover-v2-en.png",
        },
      },
      {
        titleKey: {
          tr: "02 - 30 Saniyelik AI Hap Bilgi & Google News JSON-LD SEO",
          en: "02 - 30-Second AI Quick Summary & Google News JSON-LD SEO",
        },
        descKey: {
          tr: "Haber detay sayfalarında okuma verimliliğini maksimize etmek için geliştirilen LLM destekli '30 Saniyelik AI Hap Bilgi' kutusu, uzun haber metinlerini 3 kilit maddeye indirger. Sayfa bazında dinamik enjekte edilen Google News NewsArticle ve BreadcrumbList JSON-LD şemaları sayesinde arama motorlarında ve Keşfet panellerinde anında indekslenme kabiliyeti sunar.",
          en: "Designed to maximize reading efficiency, the LLM-powered '30-Second AI Quick Summary' box distills long news articles into 3 key takeaways. Page-level dynamic Google News NewsArticle and BreadcrumbList JSON-LD schemas enable instantaneous indexing across search engines and Google Discover feeds.",
        },
        imagePath: {
          tr: "/images/haber-1-v2.png",
          en: "/images/haber-1-v2-en.png",
        },
      },
      {
        titleKey: {
          tr: "03 - Çok Kanallı Kategori Akışı & Serverless SSR",
          en: "03 - Multi-Channel Category Feed & Serverless SSR",
        },
        descKey: {
          tr: "Gündem, Ekonomi, Teknoloji, Kripto ve Spor gibi dikey kategorilerde çalışan veri filtreleme katmanı, Vercel Serverless ve Mongoose Connection Pooling altyapısı ile MongoDB'den sıfır gecikmeyle veri çeker. Sayfalar 60 saniyelik ISR (Incremental Static Regeneration) ile hem sunucu yükünü minimumda tutar hem de anlık güncellik sağlar.",
          en: "Operating across vertical categories including Politics, Economy, Tech, Crypto, and Sports, the filtering layer fetches data with zero latency from MongoDB Atlas via Vercel Serverless and Mongoose Connection Pooling. 60-second ISR (Incremental Static Regeneration) guarantees near real-time freshness while minimizing server overhead.",
        },
        imagePath: {
          tr: "/images/haber-2-v2.png",
          en: "/images/haber-2-v2-en.png",
        },
      },
      {
        titleKey: {
          tr: "04 - Anlık İndeksleme & Reaktif Arama Motoru",
          en: "04 - Instant Indexing & Reactive Search Engine",
        },
        descKey: {
          tr: "Regex tabanlı optimize edilmiş MongoDB arama katmanı, binlerce haber metni ve başlığı arasında 30ms'nin altında filtreleme gerçekleştirir. Mobil ve masaüstünde akıcı arama çekmecesi ve 'noindex' SEO kurallarıyla temiz bir dizinleme hiyerarşisi oluşturur.",
          en: "An optimized regex-powered MongoDB search layer performs sub-30ms filtering across thousands of news articles and headlines. A responsive slide-out search drawer paired with strict 'noindex' SEO rules preserves clean crawl hierarchy.",
        },
        imagePath: {
          tr: "/images/haber-3-v2.png",
          en: "/images/haber-3-v2-en.png",
        },
      },
      {
        titleKey: {
          tr: "05 - Otonom Telegram Bot Yedekleme & KVKK/5651 Uyumu",
          en: "05 - Autonomous Telegram Bot Archival & Legal Compliance",
        },
        descKey: {
          tr: "Sistemin sürdürülebilirliğini korumak için 14 günden eski haberler otomatik olarak .json veri kümesine dönüştürülüp Telegram Bot API (sendDocument) üzerinden geliştiricinin Telegram hesabına arşivlenir ve veritabanı temizlenir. 5651 Sayılı Yer Sağlayıcı Bildirimi ve KVKK aydınlatma metinleriyle kurumsal bir yayıncılık altyapısı sunar.",
          en: "To maintain sustainable database sizing, news records older than 14 days are automatically converted into .json datasets, backed up to the developer's Telegram account via Telegram Bot API (sendDocument), and pruned from the primary database. Full compliance with data privacy regulations provides enterprise-grade publishing reliability.",
        },
        imagePath: {
          tr: "/images/haber-4-v2.png",
          en: "/images/haber-4-v2-en.png",
        },
      },
    ],
    caseStudy: {
      problem: { tr: "Farklı haber kaynaklarındaki güncel içeriklerin elle takip edilmesi yavaş, tekrar eden ve tutarsız bir süreçti. Kaynak yapıları değişirken veri akışının sürdürülebilir kalması gerekiyordu.", en: "Manually tracking current content across different news sources was slow, repetitive, and inconsistent. The data flow also needed to remain maintainable as source structures changed." },
      solution: { tr: "Node.js, Cheerio ve Playwright tabanlı toplama katmanı; zamanlanmış görevler, tekrar kontrolü, MongoDB depolama ve Redis önbellekleme ile tek bir veri hattında birleştirildi.", en: "A Node.js, Cheerio, and Playwright collection layer was combined with scheduled jobs, duplicate checks, MongoDB storage, and Redis caching in one data pipeline." },
      architecture: { tr: "Kaynak seçimi → scraping katmanı → doğrulama ve temizleme → MongoDB → Redis önbellek → Next.js sunum katmanı.", en: "Source selection → scraping layer → validation and cleaning → MongoDB → Redis cache → Next.js presentation layer." },
      dataFlow: { tr: "Toplanan kayıtlar normalize edilir, mükerrer URL'ler ayıklanır, kategorize edilir ve arayüzün ya da başka bir API tüketicisinin kullanabileceği yapıya dönüştürülür.", en: "Collected records are normalized, duplicate URLs are removed, records are categorized, and transformed into a structure consumable by the interface or another API client." },
    },
    relatedServices: [
      { label: { tr: "Web Scraping Hizmeti", en: "Web Scraping Service" }, href: "/hizmetler/web-scraping" },
      { label: { tr: "API Geliştirme", en: "API Development" }, href: "/hizmetler/api-gelistirme" },
    ],
  },
  {
    slug: "bist-ai",
    titleKey: translations.projects.bistTitle,
    summaryKey: translations.projects.bistDesc,
    techStack: ["Python", "FastAPI", "Redis", "Node.js", "Next.js", "React", "Playwright", "Recharts", "Supabase", "PostgreSQL", "Docker", "Tailwind CSS"],
    liveUrl: "/canli-yok",
    githubUrl: "/gizli-repo",
    features: [
      {
        titleKey: translations.projectDetail.bistFeature1Title,
        descKey: translations.projectDetail.bistFeature1Desc,
        imagePath: {
          tr: "/images/bist-ai-1.png",
          en: "/images/bist-ai-1-en.png",
        },
      },
      {
        titleKey: translations.projectDetail.bistFeature2Title,
        descKey: translations.projectDetail.bistFeature2Desc,
        imagePath: {
          tr: "/images/bist-ai-2.png",
          en: "/images/bist-ai-2-en.png",
        },
      },
      {
        titleKey: translations.projectDetail.bistFeature3Title,
        descKey: translations.projectDetail.bistFeature3Desc,
        imagePath: {
          tr: "/images/bist-ai-3.png",
          en: "/images/bist-ai-3-en.png",
        },
      },
      {
        titleKey: translations.projectDetail.bistFeature4Title,
        descKey: translations.projectDetail.bistFeature4Desc,
        imagePath: {
          tr: "/images/bist-ai-4.png",
          en: "/images/bist-ai-4-en.png",
        },
      },
    ],
    caseStudy: {
      problem: translations.projectDetail.bistProblem,
      solution: { tr: "Python ve FastAPI veri hattı; PostgreSQL veri katmanı, Redis önbellek, arka plan görevleri ve Next.js arayüzüyle birleştirildi. Analiz sonuçları arayüzün kullanabileceği API sözleşmeleriyle sunuldu.", en: "A Python and FastAPI data pipeline was combined with PostgreSQL, Redis caching, background jobs, and a Next.js interface. Analysis results were delivered through API contracts consumable by the frontend." },
      architecture: { tr: "Playwright veri kaynakları → Python/FastAPI işleme → PostgreSQL kalıcı veri → Redis önbellek → API → Next.js analiz paneli.", en: "Playwright data sources → Python/FastAPI processing → PostgreSQL persistent data → Redis cache → API → Next.js analytics dashboard." },
      dataFlow: { tr: "Finansal kayıtlar kaynaklardan alınır, doğrulanır, analitik hesaplamalardan geçirilir ve istemciye uygun özet modellere dönüştürülür.", en: "Financial records are collected from sources, validated, processed through analytical calculations, and transformed into summary models for the client." },
    },
    relatedServices: [
      { label: { tr: "API Geliştirme", en: "API Development" }, href: "/hizmetler/api-gelistirme" },
      { label: { tr: "Yapay Zekâ Otomasyon", en: "AI Automation" }, href: "/hizmetler/yapay-zeka-otomasyon" },
      { label: { tr: "Özel Yazılım Geliştirme", en: "Custom Software Development" }, href: "/hizmetler/ozel-yazilim-gelistirme" },
    ],
  },
];

export default function ProjeDetayPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { t, locale } = useLanguage();
  const projectsHref = locale === "en" ? "/en/projects" : "/projeler";
  const homeHref = locale === "en" ? "/en" : "/";

  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background pt-12 pb-32">

        {/* Back Link */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <nav aria-label={t({ tr: "Sayfa yolu", en: "Breadcrumb" })} className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link href={homeHref} className="hover:text-foreground">{t({ tr: "Ana Sayfa", en: "Home" })}</Link><span aria-hidden="true">/</span><Link href={projectsHref} className="hover:text-foreground">{t({ tr: "Projeler", en: "Projects" })}</Link><span aria-hidden="true">/</span><span className="text-foreground" aria-current="page">{t(project.titleKey)}</span>
          </nav>
          <Link href={projectsHref} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            {t(translations.projectDetail.backLink)}
          </Link>
        </div>

        {/* Hero Section */}
        <ScrollReveal className="max-w-4xl mx-auto px-6 text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-jakarta text-foreground mb-4 leading-tight">
            {t(project.titleKey)}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground/80 font-light font-sans max-w-2xl mx-auto leading-relaxed">
            {t(project.summaryKey)}
          </p>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto px-6 space-y-16">

          {/* Özellikler ve Görseller (Üst Vitrin) */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-32 py-6 max-w-6xl mx-auto">
              {project.features.map((feature, index) => {
                const isEven = index % 2 === 0;
                return (
                  <ScrollReveal key={index} className={`flex flex-col lg:flex-row gap-16 lg:gap-32 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
                    {/* Görsel Sütunu */}
                    <div className="w-full lg:w-[60%] flex items-center justify-center relative aspect-[4/3] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-zinc-200/40 dark:border-zinc-800/50 overflow-hidden bg-zinc-100 dark:bg-zinc-900/50">
                      {(() => {
                        const currentImagePath = typeof feature.imagePath === "object"
                          ? (feature.imagePath[locale] || feature.imagePath.tr)
                          : feature.imagePath;

                        return (
                          <Image
                            src={currentImagePath}
                            alt={t(feature.titleKey)}
                            fill
                            priority={index === 0}
                            className="object-contain"
                            sizes="(max-width: 1024px) 100vw, 60vw"
                          />
                        );
                      })()}
                    </div>
                    {/* Metin Sütunu */}
                    <div className="w-full lg:w-[40%] flex flex-col justify-center text-left">
                      <span className="text-zinc-500 font-mono text-sm tracking-widest block mb-2">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold font-jakarta text-foreground mb-4">
                        {t(feature.titleKey)}
                      </h3>
                      <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                        {t(feature.descKey)}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}

          {/* Mühendislik Başarısı, Metrikler & Mimari Vaka Analizi */}
          {project.slug === "haber-portali" ? (
            <ProjectEngineeringCaseStudy
              data={HABER_PORTALI_ENGINEERING_DATA}
              locale={locale}
            />
          ) : project.slug === "bist-ai" ? (
            <ProjectEngineeringCaseStudy
              data={BIST_AI_ENGINEERING_DATA}
              locale={locale}
            />
          ) : project.slug === "free-api" ? (
            <ProjectEngineeringCaseStudy
              data={FREE_API_ENGINEERING_DATA}
              locale={locale}
            />
          ) : (
            <ScrollReveal className="grid gap-5 md:grid-cols-2">
              <section className="rounded-2xl border border-zinc-200/50 bg-zinc-50/60 p-6 dark:border-zinc-800/50 dark:bg-zinc-900/30">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-red dark:text-rose-400">{t({ tr: "Problem", en: "Problem" })}</p>
                <h2 className="font-jakarta text-xl font-bold text-foreground">{t({ tr: "Çözülmesi gereken ihtiyaç", en: "The challenge" })}</h2>
                <p className="mt-4 leading-7 text-muted-foreground">{t(project.caseStudy.problem)}</p>
              </section>
              <section className="rounded-2xl border border-zinc-200/50 bg-zinc-50/60 p-6 dark:border-zinc-800/50 dark:bg-zinc-900/30">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-red dark:text-rose-400">{t({ tr: "Çözüm", en: "Solution" })}</p>
                <h2 className="font-jakarta text-xl font-bold text-foreground">{t({ tr: "Uygulanan yaklaşım", en: "Implemented approach" })}</h2>
                <p className="mt-4 leading-7 text-muted-foreground">{t(project.caseStudy.solution)}</p>
              </section>
              <section className="rounded-2xl border border-zinc-200/50 bg-zinc-50/60 p-6 dark:border-zinc-800/50 dark:bg-zinc-900/30">
                <h2 className="font-jakarta text-xl font-bold text-foreground">{t({ tr: "Teknik mimari", en: "Technical architecture" })}</h2>
                <p className="mt-4 leading-7 text-muted-foreground">{t(project.caseStudy.architecture)}</p>
              </section>
              <section className="rounded-2xl border border-zinc-200/50 bg-zinc-50/60 p-6 dark:border-zinc-800/50 dark:bg-zinc-900/30">
                <h2 className="font-jakarta text-xl font-bold text-foreground">{t({ tr: "Veri akışı", en: "Data flow" })}</h2>
                <p className="mt-4 leading-7 text-muted-foreground">{t(project.caseStudy.dataFlow)}</p>
              </section>
            </ScrollReveal>
          )}

          {/* Teknoloji Yığını */}
          <ScrollReveal>
            <h2 className="text-xl font-bold font-jakarta text-foreground mb-6">{t(translations.projectDetail.techHeading)}</h2>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-lg text-sm font-medium bg-zinc-100 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-800/50">
                  {tech}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal className="rounded-2xl border border-brand-red/20 bg-brand-red/[0.04] p-7">
            <h2 className="text-xl font-bold font-jakarta text-foreground">{t({ tr: "İlgili hizmetler", en: "Related services" })}</h2>
            <p className="mt-3 text-muted-foreground">{t({ tr: "Bu projede kullanılan yaklaşımın hizmet kapsamlarını inceleyin.", en: "Explore the service areas demonstrated by this project." })}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {project.relatedServices.map((service) => <Link key={service.href} href={localizedServicePath(service.href.split("/").pop()!, locale)} className="rounded-full border border-brand-red/30 px-4 py-2 text-sm font-semibold text-foreground hover:bg-brand-red hover:text-white">{t(service.label)}</Link>)}
            </div>
          </ScrollReveal>

          {/* Action Links */}
          <ScrollReveal className="pt-12 border-t border-zinc-200/40 dark:border-zinc-800/40 flex flex-wrap gap-4">
            {project.liveUrl && (
              <Link
                href={project.liveUrl.startsWith("/") ? getLocalizedPath(project.liveUrl, locale) : project.liveUrl}
                target={project.liveUrl.startsWith("http") ? "_blank" : undefined}
                rel={project.liveUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => trackEvent("project_external_link_click", { type: "live", project: project.slug })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors relative z-10 cursor-pointer"
              >
                {t(translations.projectDetail.liveProject)} <ExternalLink className="w-4 h-4" />
              </Link>
            )}
            {project.githubUrl && (
              <Link
                href={project.githubUrl.startsWith("/") ? getLocalizedPath(project.githubUrl, locale) : project.githubUrl}
                target={project.githubUrl.startsWith("http") ? "_blank" : undefined}
                rel={project.githubUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => trackEvent("project_external_link_click", { type: "github", project: project.slug })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 text-foreground font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors relative z-10 cursor-pointer"
              >
                {t(translations.projectDetail.githubRepo)} <GithubIcon className="w-4 h-4" />
              </Link>
            )}
          </ScrollReveal>

          {/* Bottom CTA */}
          <ScrollReveal className="pt-16 pb-8 text-center flex flex-col items-center">
            <p className="text-muted-foreground mb-6 font-light">
              {t({ tr: "Bu proje ilginizi çekti mi? Birlikte çalışalım.", en: "Interested in this project? Let's work together." })}
            </p>
            <Link
              href={locale === "en" ? "/en/contact" : "/iletisim"}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-red text-white font-bold hover:bg-red-700 transition-colors shadow-lg hover:shadow-brand-red/25 relative z-10 cursor-pointer"
            >
              {t(translations.navbar.contact)}
            </Link>
          </ScrollReveal>

        </div>
      </main>

      <SiteFooter />
    </>
  );
}
