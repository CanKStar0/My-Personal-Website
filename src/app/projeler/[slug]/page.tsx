"use client";

import { Navbar } from "@/components/navbar";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ArrowLeft, ExternalLink, ArrowRight, Sparkles } from "lucide-react";
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
  MY_BUSINESS_BOSS_ENGINEERING_DATA,
  FETHIYESPOR_ENGINEERING_DATA,
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
  liveUrl?: string;
  githubUrl?: string;
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
    slug: "fethiyespor",
    titleKey: translations.projects.fethiyesporTitle,
    summaryKey: translations.projects.fethiyesporDesc,
    techStack: [
      "Custom PHP MVC Architecture",
      "MySQL Enterprise",
      "Tailwind CSS",
      "DeepL AI Translation Engine",
      "İyzico 3D Secure Gateway",
      "Autonomous Sports Scraper",
      "Mackolik & Transfermarkt API",
      "DomPDF Receipt Engine",
      "Granular RBAC Security",
      "Audit Trail & Logging",
      "WebKit / iOS Safari Hardening",
      "RESTful API & Caching",
    ],
    liveUrl: "https://fethiyespor.org",
    githubUrl: "/gizli-repo",
    features: [
      {
        titleKey: {
          tr: "01 - Canlı Maç Merkezi & Otonom Puan Durumu",
          en: "01 - Live Match Center & Autonomous Standings",
        },
        descKey: {
          tr: "Mackolik ve spor platformlarından maç sonuçlarını, fikstürleri ve lig puan durumunu otomatik çeken akıllı veri hattı. Takım isimlerini ve rakip logolarını yerel depoda normalize ederek sıfır kırık görsel ve anlık canlı skor deneyimi sunar.",
          en: "Intelligent sports pipeline ingesting match results, upcoming fixtures, and league standings autonomously from Mackolik. Reconciles team identities and caches competitor crests locally with zero broken assets.",
        },
        imagePath: {
          tr: "/images/fethiyespor-1.png",
          en: "/images/fethiyespor-1-en.png",
        },
      },
      {
        titleKey: {
          tr: "02 - A Takımı Kadro & Transfermarkt Senkronizasyonu",
          en: "02 - First Team Squad & Transfermarkt Valuation Sync",
        },
        descKey: {
          tr: "A Takımı kadrosu, oyuncu mevki dağılımları ve Transfermarkt üzerinden otonom senkronize edilen güncel piyasa değerleri. Oyuncu detay kartları, sözleşme süreleri ve kulüp veritabanına otomatik işlenen dinamik sporcu profilleri sunar.",
          en: "First-team squad roster, positional breakdowns, and live player market valuations synchronized autonomously from Transfermarkt. Features comprehensive player detail profiles, contract terms, and dynamic database-backed player cards.",
        },
        imagePath: {
          tr: "/images/fethiyespor-2.png",
          en: "/images/fethiyespor-2-en.png",
        },
      },
      {
        titleKey: {
          tr: "03 - DeepL Yapay Zekâ Destekli Çift Dilli Basın Portalı",
          en: "03 - DeepL AI-Powered Bilingual News Hub",
        },
        descKey: {
          tr: "Kulüp duyuruları ve maç haberleri girildiği anda arka plan kuyruğunda DeepL AI ile bağlamsal doğruluğu yüksek profesyonel İngilizceye çevrilir. Yabancı basına ve turist taraftarlara sıfır gecikmeyle global erişim imkanı tanır.",
          en: "Domestic football articles and press releases are dispatched to background DeepL AI queues for immediate English translation, giving international press and visiting fans instant real-time access.",
        },
        imagePath: {
          tr: "/images/fethiyespor-3.png",
          en: "/images/fethiyespor-3-en.png",
        },
      },
      {
        titleKey: {
          tr: "04 - BenimFethiyem Topluluğu & Dinamik Kulüp Başvuruları",
          en: "04 - BenimFethiyem Fan Hub & Dynamic Club Applications",
        },
        descKey: {
          tr: "Altyapı seçmeleri, kulüp üyelikleri ve taraftar topluluğu için inşa edilen esnek form motoru. Brute-force kalkanı, matematiksel güvenlik doğrulaması (Captcha) ve iOS Safari WebKit zırhı ile mobilde pürüzsüz başvuru akışı sunar.",
          en: "Flexible form and application engine powering youth academy registrations, club memberships, and the fan community. Fortified with brute-force rate limiters, anti-bot captchas, and iOS WebKit scroll-lock hardening.",
        },
        imagePath: {
          tr: "/images/fethiyespor-4.png",
          en: "/images/fethiyespor-4-en.png",
        },
      },
    ],
    caseStudy: {
      problem: {
        tr: "Geleneksel spor kulübü siteleri hantal hazır CMS'ler (WordPress), manuel maç verisi girişi, kopuk harici e-ticaret linkleri ve gecikmeli çeviri süreçleri yüzünden ciddi operasyonel yük ve güvenlik açıkları yaratıyordu.",
        en: "Traditional sports club portals struggle with bloated CMS platforms (WordPress), manual score entry overhead, disconnected third-party e-commerce stores, and delayed translation workflows.",
      },
      solution: {
        tr: "Mackolik'ten canlı veri toplayan otonom bir scraper, İyzico entegreli resmi FanShop, DeepL destekli AI çeviri kuyruğu ve taraftar topluluğunu bir araya getiren sıfır bağımlılıklı özel bir PHP MVC ekosistemi geliştirdim.",
        en: "I engineered a custom PHP MVC ecosystem integrating autonomous Mackolik scraping, a native İyzico FanShop, DeepL AI translation jobs, and a unified fan community with zero external CMS bloat.",
      },
      architecture: {
        tr: "Custom PHP MVC Architecture → Autonomous Background Scheduler (Mackolik / Transfermarkt Sync) → DeepL & Google Cloud AI Translation Pipeline → İyzico 3D Secure Gateway & DomPDF → Tailwind CSS & iOS WebKit Hardened UI.",
        en: "Custom PHP MVC Architecture → Autonomous Background Scheduler (Mackolik / Transfermarkt Sync) → DeepL & Google Cloud AI Translation Pipeline → İyzico 3D Secure Gateway & DomPDF → Tailwind CSS & iOS WebKit Hardened UI.",
      },
      dataFlow: {
        tr: "Maç sonuçları ve fikstürler otonom zamanlayıcıyla çekilip yerel veritabanında normalize edilir; mağaza siparişleri atomik sepet ve İyzico 3D Secure callback'leri üzerinden doğrulanır; Türkçe girilen haberler DeepL API ile anında İngilizceye dönüştürülür.",
        en: "Match data is collected autonomously and normalized in local MySQL; FanShop orders verify through atomic stock holds and İyzico 3D Secure callbacks; Turkish news translates into publication-ready English via DeepL.",
      },
    },
    relatedServices: [
      { label: { tr: "Özel Yazılım Geliştirme", en: "Custom Software Development" }, href: "/hizmetler/ozel-yazilim-gelistirme" },
      { label: { tr: "Web Scraping ve Otomasyon", en: "Web Scraping & Automation" }, href: "/hizmetler/web-scraping-ve-otomasyon" },
    ],
  },
  {
    slug: "mybusinessboss",
    titleKey: translations.projects.mybusinessbossTitle,
    summaryKey: translations.projects.mybusinessbossDesc,
    techStack: [
      "PHP MVC Architecture",
      "MySQL Enterprise",
      "Progressive Web App (PWA)",
      "Service Worker Cache",
      "Redis Caching (ETag 304)",
      "ZXing Camera Barcode",
      "CalDAV / ICS Calendar Feed",
      "RBAC Zero-Trust Matrix",
      "Dynamic PDF Document Engine",
      "i18n (TR / EN / NL)",
      "Audit Trail & Logging",
      "RESTful API Endpoints"
    ],
    liveUrl: "/canli-yok",
    githubUrl: "/gizli-repo",
    features: [
      {
        titleKey: translations.projectDetail.mybusinessbossFeature1Title,
        descKey: translations.projectDetail.mybusinessbossFeature1Desc,
        imagePath: {
          tr: "/images/mybusinessboss-1.png",
          en: "/images/mybusinessboss-1-en.png",
        },
      },
      {
        titleKey: translations.projectDetail.mybusinessbossFeature2Title,
        descKey: translations.projectDetail.mybusinessbossFeature2Desc,
        imagePath: {
          tr: "/images/mybusinessboss-2.png",
          en: "/images/mybusinessboss-2-en.png",
        },
      },
      {
        titleKey: translations.projectDetail.mybusinessbossFeature3Title,
        descKey: translations.projectDetail.mybusinessbossFeature3Desc,
        imagePath: {
          tr: "/images/mybusinessboss-3.png",
          en: "/images/mybusinessboss-3-en.png",
        },
      },
      {
        titleKey: translations.projectDetail.mybusinessbossFeature4Title,
        descKey: translations.projectDetail.mybusinessbossFeature4Desc,
        imagePath: {
          tr: "/images/mybusinessboss-4.png",
          en: "/images/mybusinessboss-4-en.png",
        },
      },
    ],
    caseStudy: {
      problem: translations.projectDetail.mybusinessbossProblem,
      solution: translations.projectDetail.mybusinessbossSolution,
      architecture: {
        tr: "PHP MVC sunucu tabanlı render omurgası, MySQL ACID veri tabanı, istemci tarafında progressive enhancement (Vanilla JS / Server UI packs), donanım bağımsız ZXing barkod motoru ve Redis önbellek katmanı.",
        en: "Server-rendered PHP MVC backbone, MySQL ACID transaction store, lightweight client-side progressive enhancement (Vanilla JS / Server UI packs), hardware-free ZXing barcode engine, and Redis caching layer.",
      },
      dataFlow: {
        tr: "Kullanıcı/Kasiyer Girişi -> RBAC İzin Doğrulama -> POS/İş Emri/Stok Hareketleri -> Atomik MySQL İşlemi -> ICS Akıllı Takvim & Audit Trail Kaydı -> ETag/Redis Önbellek Güncellemesi.",
        en: "User/Operator Auth -> RBAC Policy Enforcement -> POS/Work Order/Stock Mutation -> Atomic MySQL Commit -> Live ICS Calendar & Audit Trail Stream -> ETag/Redis Invalidation.",
      },
    },
    relatedServices: [
      {
        label: { tr: "Özel Yazılım Geliştirme", en: "Custom Software Development" },
        href: "/hizmetler/ozel-yazilim-gelistirme",
      },
      {
        label: { tr: "API Geliştirme ve Entegrasyon", en: "API Development & Integration" },
        href: "/hizmetler/api-gelistirme",
      },
      {
        label: { tr: "Yapay Zekâ Otomasyon", en: "AI Automation Solutions" },
        href: "/hizmetler/yapay-zeka-otomasyon",
      },
    ],
  },
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
      "SQLite B-Tree (535x)",
      "Anti-Scraping Shield",
      "REST API",
      "Lucide React",
      "Vercel Cloud",
      "i18n Multi-Language",
      "SSRF Guard"
    ],
    liveUrl: "https://findfreeapi.com",
    features: [
      {
        titleKey: {
          tr: "01 - Canlı Test Konsolu & Hızlı İstek Sandbox'ı",
          en: "01 - Live Test Console & Interactive Sandbox",
        },
        descKey: {
          tr: "Geliştiricilerin sayfadan ayrılmadan API endpoint'lerini test edebilmesi için tasarlanan interaktif test alanı. Canlı parametre girişleri, anlık JSON yanıt gösterimi ve tek tıkla kopyalanabilir cURL, JavaScript ve Python kod blokları sunar.",
          en: "An interactive console allowing developers to test API endpoints directly on the page. Features instant parameter configuration, live JSON response preview, and one-click copyable cURL, JavaScript, and Python code snippets.",
        },
        imagePath: {
          tr: "/images/freeapi-1.png",
          en: "/images/freeapi-1-en.png",
        },
      },
      {
        titleKey: {
          tr: "02 - 47 Çift Dilli Kategori & API Explorer",
          en: "02 - 47 Bilingual Categories & API Explorer",
        },
        descKey: {
          tr: "Hava Durumu, Finans, Kripto, Yapay Zekâ ve Siber Güvenlik dahil 47 dikey kategoride yapılandırılmış kapsamlı dizin. Canlı metrik rozetleri, anlık arama senkronizasyonu ve yaylı kayan kırmızı hap (Language Toggle) anahtarıyla tam TR/EN dil desteği sağlar.",
          en: "A structured directory spanning 47 distinct categories including Weather, Finance, Crypto, AI, and Cybersecurity. Features live metric badges, instant search synchronization, and seamless TR/EN language switching.",
        },
        imagePath: {
          tr: "/images/freeapi-2.png",
          en: "/images/freeapi-2-en.png",
        },
      },
      {
        titleKey: {
          tr: "03 - Özenle Hazırlanmış Geliştirici API Paketleri (Stacks)",
          en: "03 - Curated Developer API Stacks & Architecture Hub",
        },
        descKey: {
          tr: "Farklı proje tipleri (Fintech, AI Asistan, E-Ticaret, SaaS) için bir araya getirilmiş hazır API demetleri. Mimari uyumluluğu doğrulanmış ve tek çatı altında optimize edilmiş entegrasyon rehberleri sunar.",
          en: "Pre-bundled API combinations tailored for modern architectures (Fintech, AI Assistant, E-Commerce, SaaS), offering vetted compatibility and streamlined integration blueprints.",
        },
        imagePath: {
          tr: "/images/freeapi-3.png",
          en: "/images/freeapi-3-en.png",
        },
      },
      {
        titleKey: {
          tr: "04 - Topluluk API Önerme & 5 Katmanlı Anti-Scraping Kalkanı",
          en: "04 - Community API Submission & 5-Layer Anti-Scraping Shield",
        },
        descKey: {
          tr: "Geliştiricilerin yeni API önerebildiği şeffaf başvuru motoru. Veri hırsızlığına karşı; gizli Honeypot tuzakları, Edge Middleware IP rate-limiting, AI bot engelleme ve bot User-Agent filtreleme katmanlarıyla askeri düzeyde koruma sağlar.",
          en: "A community pipeline for submitting verified APIs. Protected by a 5-layer defense shield including invisible Honeypot traps, Edge Middleware rate limiting, AI crawler blocks, and scraper User-Agent filtering.",
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
        tr: "1038+ doğrulanmış API'yi 47 çift dilli kategoride toplayan, tarayıcı üzerinden doğrudan çağrı yapabilen canlı sandbox konsolu, SQLite B-Tree indeksleme optimizasyonu ve veritabanını scraper'lara karşı koruyan 5 katmanlı Anti-Scraping Kalkanı içeren modern bir Next.js 15 platformu inşa ettim.",
        en: "I built a modern Next.js 15 platform organizing 1038+ verified APIs across 47 bilingual categories, equipped with an in-browser live sandbox, SQLite B-Tree indexing optimization, and a 5-layer Anti-Scraping Shield protecting data assets.",
      },
      architecture: {
        tr: "Next.js 15 App Router → Edge Middleware (Bot & Honeypot Guard) → Serverless Proxy Gateway & Health Checker → Dynamic i18n & Search Engine → Framer Motion UI.",
        en: "Next.js 15 App Router → Edge Middleware (Bot & Honeypot Guard) → Serverless Proxy Gateway & Health Checker → Dynamic i18n & Search Engine → Framer Motion UI.",
      },
      dataFlow: {
        tr: "İstemci istekleri Edge güvenlik süzgecinden geçer, çift dilli arama motoruyla eşleştirilir, terminal ve test konsolu üzerinden yapılan canlı testler CORS-free proxy gateway üzerinden güvenle iletilir.",
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
      "Data-as-a-Service (DaaS)",
      "AI Niche Classifier",
      "Anti-Clickbait Sanitizer",
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "MongoDB Atlas (200MB Lean)",
      "Playwright Stealth",
      "Telegram Bot API",
      "Vercel Serverless",
      "Google News JSON-LD SEO"
    ],
    liveUrl: "https://haberportalitr.com",
    githubUrl: "/gizli-repo",
    features: [
      {
        titleKey: {
          tr: "01 - DaaS Haber Vitrini & Asimetrik Bento Grid",
          en: "01 - DaaS News Showcase & Asymmetric Bento Grid",
        },
        descKey: {
          tr: "Next.js 15, React 19 ve Tailwind CSS v4 ile inşa edilen ana vitrin; yüzlerce kaynaktan eşzamanlı toplanıp tekilleştirilen en sıcak gelişmeleri The Verge tarzı modern asimetrik Bento Grid düzeninde sunar. Canlı piyasa bandı ve sade arayüzüyle gürültüsüz bir bilgi akışı sağlar.",
          en: "Built with Next.js 15, React 19, and Tailwind CSS v4, the main showcase aggregates breaking news across hundreds of vetted sources in a modern The Verge-inspired asymmetric Bento Grid layout with zero visual clutter.",
        },
        imagePath: {
          tr: "/images/haber-cover-v2.png",
          en: "/images/haber-cover-v2-en.png",
        },
      },
      {
        titleKey: {
          tr: "02 - 30 Saniyelik AI Hap Bilgi & Anti-Clickbait Motoru",
          en: "02 - 30-Second AI Quick Summary & Anti-Clickbait Engine",
        },
        descKey: {
          tr: "Haber detay sayfalarında okuma süresini ve verimliliği maksimize eden LLM destekli 30 Saniyelik AI Hap Bilgi kutusu. Tık tuzaklarını (clickbait) ve içi boş magazinel dolguları filtreleyerek uzun haber metinlerini 3 somut maddeye indirger, sesli dinleme ve anında paylaşım olanakları sunar.",
          en: "An LLM-driven 30-second quick summary engine placed at the top of article details. Eliminates clickbait and fluff by condensing verbose reporting into 3 actionable bullets, accompanied by text-to-speech audio narration and 1-click sharing.",
        },
        imagePath: {
          tr: "/images/haber-1-v2.png",
          en: "/images/haber-1-v2-en.png",
        },
      },
      {
        titleKey: {
          tr: "03 - AI Niş Filtreleme & Dikey Sektörel Akışlar",
          en: "03 - AI Niche Filtering & Vertical Sector Streams",
        },
        descKey: {
          tr: "Teknoloji, Kripto, Ekonomi, Savunma ve Küresel Politika gibi niş dikeylerde özelleştirilmiş AI sınıflandırma süzgeci. Ham veri havuzundan sektörel sinyalleri yakalayarak kullanıcı ve işletmeler için temiz, odaklı haber istihbarat akışları üretir.",
          en: "Specialized AI classification filtering tailored to vertical niches including Technology, Crypto, Finance, Defense, and Global Affairs. Extracts high-signal industry events from raw streams into laser-focused intelligence feeds.",
        },
        imagePath: {
          tr: "/images/haber-2-v2.png",
          en: "/images/haber-2-v2-en.png",
        },
      },
      {
        titleKey: {
          tr: "04 - Reaktif Ters İndeksleme & Milisaniyelik Arama İstihbaratı",
          en: "04 - Reactive Reverse Indexing & Sub-50ms Search Intelligence",
        },
        descKey: {
          tr: "Bileşik ters indeksleme ve MongoDB optimizasyonlarıyla desteklenen arama katmanı, on binlerce haber arasında 50ms'nin altında anlık filtreleme yapar. Konu, şirket ve anahtar kelime bazlı hızlı istihbarat sorgulamalarına olanak tanır.",
          en: "Powered by compound reverse indexing and MongoDB schema tuning, the search pipeline resolves queries across tens of thousands of articles in sub-50ms, enabling instantaneous keyword, topic, and entity intelligence.",
        },
        imagePath: {
          tr: "/images/haber-3-v2.png",
          en: "/images/haber-3-v2-en.png",
        },
      },
      {
        titleKey: {
          tr: "05 - Data-as-a-Service (DaaS) Dağıtımı & Otonom Arşivleme",
          en: "05 - Data-as-a-Service (DaaS) Pipeline & Autonomous Archival",
        },
        descKey: {
          tr: "Toplanan, arındırılan ve sınıflandırılan haber verisini dış platformlara, bültenlere ve API tüketicilerine sunan ölçeklenebilir DaaS altyapısı. 14 günden eski kayıtları otomatik JSON kümeleri olarak Telegram Bot API üzerinden arşivleyerek MongoDB boyutunu 200MB bandında sabit tutar.",
          en: "A scalable DaaS backbone exposing cleansed, classified news streams to third-party platforms, newsletters, and API consumers. Automatically exports articles older than 14 days as JSON archives via Telegram Bot API, maintaining an ultra-lean 200MB database footprint.",
        },
        imagePath: {
          tr: "/images/haber-4-v2.png",
          en: "/images/haber-4-v2-en.png",
        },
      },
    ],
    caseStudy: {
      problem: {
        tr: "Geleneksel medya siteleri tık tuzakları, yanıltıcı başlıklar, ağır reklam çöplükleri ve manipülatif içeriklerle dolu; üstelik kurumsal veya sektörel takip yapmak isteyenlerin temiz, filtrelenmiş veriye DaaS formatında erişmesi imkansızdı.",
        en: "Traditional media platforms suffer from clickbait clutter, deceptive headlines, intrusive ad networks, and repetitive noise, leaving businesses without clean, structured DaaS feeds for vertical news monitoring.",
      },
      solution: {
        tr: "150+ haber kaynağından Playwright Stealth ve akıllı ayrıştırıcılarla otonom veri toplayan, LLM ile tık tuzaklarını arındırıp 3 maddelik özete dönüştüren, sektörel niş filtreleme ve harici sistemler için DaaS veri servis katmanı sunan modern bir ekosistem geliştirdim.",
        en: "I engineered a modern ecosystem autonomously aggregating 150+ sources via Playwright Stealth, sanitizing clickbait into 3-point LLM summaries, and offering vertical niche filtering alongside a turnkey DaaS delivery layer for external consumers.",
      },
      architecture: {
        tr: "150+ Hedef Kaynak → Playwright Stealth & Protocol Scraper → Anti-Clickbait & AI Niş Filtreleme → 200MB Lean MongoDB BSON Depolama → Next.js 15 Serverless SSR & DaaS API Çıktısı.",
        en: "150+ Target Sources → Playwright Stealth & Protocol Scraper → Anti-Clickbait & AI Niche Classifier → 200MB Lean MongoDB BSON Storage → Next.js 15 Serverless SSR & DaaS Delivery Pipeline.",
      },
      dataFlow: {
        tr: "Eşzamanlı işçiler kaynakları tarar, mükerrer kayıtlar SHA hash ile elenir; içerikler AI süzgecinden geçirilerek niş kategorilere ayrılır ve 30 saniyelik özet üretilir; temiz veri MongoDB'ye yazılıp hem web portalına hem de DaaS istemcilerine servis edilir.",
        en: "Concurrent workers scan news feeds, duplicates are filtered via SHA hashes, content passes through AI niche classifiers for 30-second distillation, and cleansed data is stored in MongoDB to power both the web frontend and external DaaS clients.",
      },
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
          <nav aria-label={t({ tr: "Sayfa yolu", en: "Breadcrumb" })} className="mb-6 sm:mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link href={homeHref} className="hover:text-foreground">{t({ tr: "Ana Sayfa", en: "Home" })}</Link><span aria-hidden="true">/</span><Link href={projectsHref} className="hover:text-foreground">{t({ tr: "Projeler", en: "Projects" })}</Link><span aria-hidden="true">/</span><span className="text-foreground" aria-current="page">{t(project.titleKey)}</span>
          </nav>
          <Link href={projectsHref} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            {t(translations.projectDetail.backLink)}
          </Link>
        </div>

        {/* Hero Section */}
        <ScrollReveal className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-16">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-jakarta text-foreground mb-3 sm:mb-4 leading-tight">
            {t(project.titleKey)}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground/80 font-light font-sans max-w-2xl mx-auto leading-relaxed">
            {t(project.summaryKey)}
          </p>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">

          {/* Özellikler ve Görseller (Üst Vitrin) */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-10 sm:space-y-20 lg:space-y-32 py-2 sm:py-6 max-w-6xl mx-auto">
              {project.features.map((feature, index) => {
                const isEven = index % 2 === 0;
                return (
                  <ScrollReveal key={index} className={`flex flex-col lg:flex-row gap-5 sm:gap-10 lg:gap-24 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
                    {/* Görsel Sütunu */}
                    <div className="w-full lg:w-[60%] flex items-center justify-center relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-zinc-200/40 dark:border-zinc-800/50 overflow-hidden bg-zinc-100 dark:bg-zinc-900/50">
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
                      <span className="text-brand-red dark:text-rose-400 font-mono text-xs sm:text-sm font-bold tracking-widest block mb-1.5 sm:mb-2">
                        FEATURE {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-jakarta text-foreground mb-2 sm:mb-4 leading-snug break-words">
                        {t(feature.titleKey)}
                      </h3>
                      <p className="text-xs sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light break-words">
                        {t(feature.descKey)}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}

          {/* Mühendislik Başarısı, Metrikler & Mimari Vaka Analizi */}
          {project.slug === "fethiyespor" ? (
            <ProjectEngineeringCaseStudy
              data={FETHIYESPOR_ENGINEERING_DATA}
              locale={locale}
            />
          ) : project.slug === "mybusinessboss" ? (
            <ProjectEngineeringCaseStudy
              data={MY_BUSINESS_BOSS_ENGINEERING_DATA}
              locale={locale}
            />
          ) : project.slug === "haber-portali" ? (
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
            <h2 className="text-lg sm:text-xl font-bold font-jakarta text-foreground mb-4 sm:mb-6">{t(translations.projectDetail.techHeading)}</h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium bg-zinc-100 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-800/50 break-words">
                  {tech}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal className="rounded-2xl sm:rounded-3xl border border-brand-red/20 bg-brand-red/[0.04] p-5 sm:p-7">
            <h2 className="text-lg sm:text-xl font-bold font-jakarta text-foreground">{t({ tr: "İlgili hizmetler", en: "Related services" })}</h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground">{t({ tr: "Bu projede kullanılan yaklaşımın hizmet kapsamlarını inceleyin.", en: "Explore the service areas demonstrated by this project." })}</p>
            <div className="mt-4 sm:mt-5 flex flex-wrap gap-2 sm:gap-3">
              {project.relatedServices.map((service) => <Link key={service.href} href={localizedServicePath(service.href.split("/").pop()!, locale)} className="rounded-full border border-brand-red/30 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-foreground hover:bg-brand-red hover:text-white transition-colors">{t(service.label)}</Link>)}
            </div>
          </ScrollReveal>

          {/* Action Links */}
          <ScrollReveal className="pt-8 sm:pt-12 border-t border-zinc-200/40 dark:border-zinc-800/40 flex flex-col sm:flex-row gap-3 sm:gap-4">
            {project.liveUrl && (
              <Link
                href={project.liveUrl.startsWith("/") ? getLocalizedPath(project.liveUrl, locale) : project.liveUrl}
                target={project.liveUrl.startsWith("http") ? "_blank" : undefined}
                rel={project.liveUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => trackEvent("project_external_link_click", { type: "live", project: project.slug })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-xs sm:text-sm font-semibold hover:bg-foreground/90 transition-colors relative z-10 cursor-pointer w-full sm:w-auto text-center"
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 text-foreground text-xs sm:text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors relative z-10 cursor-pointer w-full sm:w-auto text-center"
              >
                {t(translations.projectDetail.githubRepo)} <GithubIcon className="w-4 h-4" />
              </Link>
            )}
          </ScrollReveal>

          {/* High-Converting Engineering & Lead Generation Card */}
          <ScrollReveal className="my-10 sm:my-16 overflow-hidden rounded-2xl sm:rounded-3xl border border-brand-red/30 bg-gradient-to-br from-brand-red/[0.08] via-card/80 to-background p-5 sm:p-8 md:p-12 backdrop-blur-md relative shadow-xl dark:shadow-[0_0_50px_rgba(220,38,38,0.1)]">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-red/10 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-start md:items-center text-left md:text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/10 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-bold text-brand-red dark:text-rose-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                {t(translations.projectDetail.leadCardBadge)}
              </div>

              <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold font-jakarta text-foreground tracking-tight leading-tight break-words">
                {t(translations.projectDetail.leadCardTitle)}
              </h2>

              <p className="text-xs sm:text-base text-muted-foreground leading-relaxed font-light break-words">
                {t(translations.projectDetail.leadCardSubtitle)}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start md:justify-center gap-3 sm:gap-4 pt-2 w-full">
                <Link
                  href={locale === "en" ? "/en/contact" : "/iletisim"}
                  onClick={() => trackEvent("project_lead_cta_click", { project: project.slug, type: "primary" })}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-brand-red text-white font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-red-700 transition-all duration-300 shadow-lg shadow-brand-red/25 hover:shadow-brand-red/40 hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto text-center"
                >
                  <span>{t(translations.projectDetail.leadCardCtaPrimary)}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={locale === "en" ? "/en/services" : "/hizmetler"}
                  onClick={() => trackEvent("project_lead_services_click", { project: project.slug, type: "secondary" })}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 sm:py-4 rounded-full border border-zinc-300 dark:border-zinc-800 bg-background/60 text-foreground font-semibold text-xs sm:text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer w-full sm:w-auto text-center"
                >
                  <span>{t(translations.projectDetail.leadCardCtaSecondary)}</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </main>

      <SiteFooter />
    </>
  );
}
