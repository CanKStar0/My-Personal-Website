export type Locale = "tr" | "en";

type TranslationValue = { tr: string; en: string };

export const translations = {
  // ─── Navbar ──────────────────────────────────────────
  navbar: {
    home: { tr: "Ana Sayfa", en: "Home" } as TranslationValue,
    about: { tr: "Hakkımda", en: "About" } as TranslationValue,
    services: { tr: "Hizmetler", en: "Services" } as TranslationValue,
    blog: { tr: "Blog", en: "Blog" } as TranslationValue,
    tools: { tr: "Araçlar", en: "Tools" } as TranslationValue,
    projects: { tr: "Projeler", en: "Projects" } as TranslationValue,
    contact: { tr: "İletişim", en: "Contact" } as TranslationValue,
    themeToggle: { tr: "Karanlık/Aydınlık mod geçişi", en: "Dark/Light mode toggle" } as TranslationValue,
    menuToggle: { tr: "Menüyü Aç/Kapat", en: "Toggle Menu" } as TranslationValue,
  },

  // ─── Hero ────────────────────────────────────────────
  hero: {
    availability: { tr: "Freelance & Özel Projeler İçin Müsait", en: "Available for Freelance & Custom Projects" } as TranslationValue,
    subtitle: { tr: "Fullstack Developer & AI Otomasyon Uzmanı", en: "Fullstack Developer & AI Automation Expert" } as TranslationValue,
    cta: { tr: "Çalışmaları Keşfet", en: "Explore My Work" } as TranslationValue,
    ctaSecondary: { tr: "Hizmetleri İncele", en: "Explore Services" } as TranslationValue,
    tagScraping: { tr: "Web Scraping", en: "Web Scraping" } as TranslationValue,
    tagAi: { tr: "AI Otomasyon", en: "AI Automation" } as TranslationValue,
    tagSaas: { tr: "SaaS & ERP", en: "SaaS & ERP" } as TranslationValue,
    tagApi: { tr: "Yüksek Hızlı API", en: "High-Speed APIs" } as TranslationValue,
    tagNextjs: { tr: "Next.js 16 & React 19", en: "Next.js 16 & React 19" } as TranslationValue,
  },

  // ─── Manifesto ───────────────────────────────────────
  manifesto: {
    headingPart1: { tr: "Sadece Kod Yazmıyor,", en: "I Don't Just Write Code," } as TranslationValue,
    headingPart2: { tr: "Sistem İnşa Ediyorum.", en: "I Build Systems." } as TranslationValue,
    description: {
      tr: 'Kodlar herkes tarafından kopyalanabilir, ancak bir <vision>vizyon</vision> kopyalanamaz. Karmaşık fikirleri sürdürülebilir dijital ürünlere dönüştürürken estetiği <highlight>sağlam mühendislikle</highlight> birleştiriyorum. Amacım yalnızca çalışan bir çıktı üretmek değil; izlenebilir, geliştirilebilir ve operasyon yükünü azaltan <highlight>otonom sistemler</highlight> kurmak.',
      en: 'Code can be copied by anyone, but a <vision>vision</vision> cannot. I turn complex ideas into maintainable digital products by combining aesthetics with <highlight>sound engineering</highlight>. My goal is not only to ship working software, but to build observable, extensible <highlight>autonomous systems</highlight> that reduce operational work.',
    } as TranslationValue,
  },

  // ─── Bento Grid ──────────────────────────────────────
  bento: {
    aiTitle: { tr: "Yapay Zeka & Otomasyon", en: "AI & Automation" } as TranslationValue,
    aiDesc: {
      tr: "Zaman alan manuel süreçleri botlar, web scraping akışları ve kontrollü otomasyonlarla azaltıyorum. LLM entegrasyonlarını doğrulama, izleme ve insan kontrolüyle birlikte kullanarak sürdürülebilir sistemler geliştiriyorum.",
      en: "I reduce time-consuming manual work with bots, web scraping pipelines, and controlled automation. I combine LLM integrations with validation, monitoring, and human oversight to build maintainable systems.",
    } as TranslationValue,
    frontendTitle: { tr: "Frontend Mimarisi", en: "Frontend Architecture" } as TranslationValue,
    backendTitle: { tr: "Backend Gücü", en: "Backend Power" } as TranslationValue,
    dataTitle: { tr: "Veri & Altyapı Yönetimi", en: "Data & Infrastructure" } as TranslationValue,
    dataDesc: {
      tr: "Uygulamaların kalbi veridir. Yüksek hacimli işlemleri güvenilir biçimde yürütmek için PostgreSQL ve MongoDB odaklı, ölçeklenebilir ve güvenlik merkezli bulut veritabanı mimarileri tasarlıyorum.",
      en: "Data is the heart of applications. I design scalable, security-focused cloud database architectures centered on PostgreSQL and MongoDB for reliable high-volume processing.",
    } as TranslationValue,
  },

  // ─── Projects Section ────────────────────────────────
  projects: {
    eyebrow: { tr: "Portfolyo", en: "Portfolio" } as TranslationValue,
    heading: { tr: "Öne Çıkan Çalışmalar", en: "Featured Work" } as TranslationValue,
    subheading: {
      tr: "Esnaflar ve işletmeler için yüksek dönüşümlü somut fayda; yazılım ekipleri ve İK uzmanları için temiz kod ve sürdürülebilir mimari.",
      en: "High-impact, tangible value for businesses; clean code and sustainable architecture for engineering teams and HR professionals.",
    } as TranslationValue,
    openSourceHeading: { tr: "Açık Kaynak & Repolar", en: "Open Source & Repos" } as TranslationValue,
    openSourceSubheading: {
      tr: "Geliştirici topluluğuna sunduğum açık kaynaklı projeler, kütüphaneler ve hazır entegrasyonlar.",
      en: "Open source projects, libraries, and ready-to-use integrations I've built for the developer community.",
    } as TranslationValue,
    imagePreparing: { tr: "Görsel Hazırlanıyor", en: "Image Preparing" } as TranslationValue,
    // Project cards
    fethiyesporTitle: { tr: "Fethiyespor Kulüp & E-Ticaret Ekosistemi", en: "Fethiyespor Club & E-Commerce Ecosystem" } as TranslationValue,
    fethiyesporDesc: {
      tr: "Otonom Mackolik/Transfermarkt spor verisi senkronizasyonu, DeepL AI çeviri hattı ve İyzico entegreli resmi FanShop içeren kurumsal dijital platform.",
      en: "Enterprise sports platform featuring autonomous Mackolik/Transfermarkt sync, DeepL AI translation pipeline, and an İyzico-powered official FanShop.",
    } as TranslationValue,
    mybusinessbossTitle: { tr: "MyBusinessBoss SaaS ERP & CRM", en: "MyBusinessBoss SaaS ERP & CRM" } as TranslationValue,
    mybusinessbossDesc: {
      tr: "POS, stok, barkod, CRM, tamirhane servis takibi, akıllı randevu ve finans süreçlerini tek çatı altında toplayan devasa All-in-One Kurumsal SaaS platformu.",
      en: "A massive All-in-One Enterprise SaaS platform unifying POS, inventory, barcode, CRM, repair work orders, smart calendar, and cashflow under one roof.",
    } as TranslationValue,
    freeapiTitle: { tr: "FindFreeAPI Directory", en: "FindFreeAPI Directory" } as TranslationValue,
    freeapiDesc: {
      tr: "1038+ doğrulanmış ücretsiz REST API, 47 dikey kategori, canlı terminal sandbox konsolu ve askeri düzeyde anti-scraping koruması sunan küresel geliştirici platformu.",
      en: "A global developer directory featuring 1038+ curated public REST APIs across 47 categories, live terminal sandbox playground, and edge anti-scraping shield.",
    } as TranslationValue,
    haberTitle: { tr: "Haber Portalı TR (DaaS)", en: "Haber Portali TR (DaaS)" } as TranslationValue,
    haberDesc: {
      tr: "Yapay zekâ destekli niş filtreleme, tık tuzağı (clickbait) arındırma motoru, 3 maddelik LLM özeti ve yüksek performanslı Data-as-a-Service (DaaS) haber istihbarat platformu.",
      en: "AI-powered niche filtering, anti-clickbait sanitization engine, 3-point LLM summaries, and high-performance Data-as-a-Service (DaaS) news intelligence platform.",
    } as TranslationValue,
    bistTitle: { tr: "BIST AI", en: "BIST AI" } as TranslationValue,
    bistDesc: {
      tr: "Finansal verileri doğrulama katmanlarıyla işleyen analiz sistemi.",
      en: "An analytics system that processes financial data through validation layers.",
    } as TranslationValue,
  },

  // ─── Contact Page ────────────────────────────────────
  contact: {
    eyebrow: { tr: "İletişim", en: "Contact" } as TranslationValue,
    heading: { tr: "Projenizi birlikte hayata geçirelim.", en: "Let's build your next system." } as TranslationValue,
    subtitle: {
      tr: "Tam zamanlı freelance olarak özel yazılım, web scraping, AI otomasyon ve Next.js projeleri alıyorum. Kısa proje özetinizi paylaşın, 24 saat içinde teknik yaklaşım ve tahmini takvimle dönüş yapayım.",
      en: "I take on full-time freelance work in custom software, web scraping, AI automation, and Next.js. Share a short project brief and I will reply within 24 hours with a technical approach and timeline.",
    } as TranslationValue,
    toast: { tr: "E-posta adresi panoya kopyalandı.", en: "Email address copied to clipboard." } as TranslationValue,
    briefCopiedToast: { tr: "Proje özeti panoya kopyalandı.", en: "Project brief copied to clipboard." } as TranslationValue,
    availabilityLabel: { tr: "Yeni freelance projeler için müsait", en: "Available for new freelance projects" } as TranslationValue,
    responseTimeLabel: { tr: "Ortalama yanıt süresi: 24 saat içi", en: "Typical response time: within 24 hours" } as TranslationValue,
  },

  // ─── Canli Yok Page ──────────────────────────────────
  canliYok: {
    title: { tr: "Sunucular Kahve Molasında", en: "Servers Are On a Coffee Break" } as TranslationValue,
    description: {
      tr: "Bu projenin canlı ortam fişi şimdilik çekilmiş durumda veya sunucular dinleniyor. Ancak merak etmeyin, kodlar arkada sapasağlam.",
      en: "This project's live environment is currently unplugged or the servers are resting. But don't worry, the code is rock-solid behind the scenes.",
    } as TranslationValue,
    backButton: { tr: "Portfolyoya Geri Dön", en: "Back to Portfolio" } as TranslationValue,
  },

  // ─── Gizli Repo Page ────────────────────────────────
  gizliRepo: {
    title: { tr: "Top Secret // Gizli Repo", en: "Top Secret // Private Repo" } as TranslationValue,
    description: {
      tr: "Bazı mimariler açık kaynak yapılamayacak kadar değerlidir veya ticari sırlar (NDA) içerir. Bu projenin kaynak kodları dijital bir kasanın içinde kilitli.",
      en: "Some architectures are too valuable to open-source or contain trade secrets (NDA). This project's source code is locked inside a digital vault.",
    } as TranslationValue,
    backButton: { tr: "Portfolyoya Geri Dön", en: "Back to Portfolio" } as TranslationValue,
  },

  // ─── GitHub Repos ────────────────────────────────────
  github: {
    noDescription: { tr: "Açıklama bulunmuyor.", en: "No description available." } as TranslationValue,
    fetchError: { tr: "Şu an GitHub repolarına ulaşılamıyor.", en: "Unable to reach GitHub repos at this time." } as TranslationValue,
    viewAll: { tr: "Tüm Repoları GitHub'da Gör", en: "View All Repositories on GitHub" } as TranslationValue,
    liveBadge: { tr: "Canlı GitHub Senkronizasyonu", en: "Live GitHub Sync" } as TranslationValue,
  },

  // ─── Project Detail Page ─────────────────────────────
  projectDetail: {
    backLink: { tr: "Tüm Projelere Dön", en: "Back to All Projects" } as TranslationValue,
    techHeading: { tr: "Kullanılan Teknolojiler", en: "Technologies Used" } as TranslationValue,
    liveProject: { tr: "Canlı Proje", en: "Live Project" } as TranslationValue,
    githubRepo: { tr: "GitHub Repo", en: "GitHub Repo" } as TranslationValue,
    // Haber Portalı features
    haberFeature1Title: { tr: "Data-as-a-Service (DaaS) & Otonom Scraping", en: "Data-as-a-Service (DaaS) & Autonomous Ingestion" } as TranslationValue,
    haberFeature1Desc: {
      tr: "150+ ulusal ve yerel haber kaynağından kesintisiz veri toplayan, Cloudflare/WAF zırhlarını Playwright Stealth ile aşan ve toplanan veriyi harici API ve platformlara anında aktarabilen bağımsız DaaS mimarisi.",
      en: "An autonomous ingestion pipeline continuously monitoring 150+ news sources, bypassing WAF protections via Playwright Stealth, and dispatching cleansed data to external systems and APIs via DaaS endpoints.",
    } as TranslationValue,
    haberFeature2Title: { tr: "AI Niş Filtreleme & Sektörel Sınıflandırma", en: "AI Niche Filtering & Semantic Classification" } as TranslationValue,
    haberFeature2Desc: {
      tr: "Teknoloji, Kripto, Finans, Savunma ve Sağlık gibi dikey sektörlere özel yapay zekâ filtreleme motoru. Ham haber akışını anlamsal olarak ayrıştırıp gürültüsüz, hedefe odaklı niş istihbarat akışına dönüştürür.",
      en: "Domain-specific AI filtering across Technology, Crypto, Finance, Defense, and Healthcare verticals. Semantically dissects raw streams into laser-focused, noise-free niche intelligence feeds.",
    } as TranslationValue,
    haberFeature3Title: { tr: "30 Saniyelik AI Hap Bilgi & Anti-Clickbait", en: "30-Second AI Quick Summary & Anti-Clickbait" } as TranslationValue,
    haberFeature3Desc: {
      tr: "Tık tuzaklarını ve şişirilmiş magazinel başlıkları eleyen, haberi 30 saniyede kavranabilir 3 somut maddeye indirgeyen yerel LLM özetleme ve Google News JSON-LD SEO entegrasyonu.",
      en: "Strips clickbait headlines and editorial filler, condensing full-length reports into 3 actionable bullet points via LLM distillation alongside Google News JSON-LD SEO schemas.",
    } as TranslationValue,
    haberFeature4Title: { tr: "Ultra Optimize BSON Depolama & Reaktif Keşfet", en: "Ultra-Lean BSON Storage & Reactive Discovery" } as TranslationValue,
    haberFeature4Desc: {
      tr: "Kısaltılmış şema anahtarları ve optimize BSON tipleriyle 60.000+ zengin haberi sadece 200MB alanda saklayan, <50ms bileşik ters indeksli arama ve dinamik piyasa bilgi çubuğu sunan Next.js 15 mimarisi.",
      en: "Shortened schema keys and lean BSON typing store 60,000+ rich articles in just 200MB, delivering sub-50ms compound reverse-indexed search and a dynamic market ticker on Next.js 15.",
    } as TranslationValue,
    // BIST AI features
    bistFeature1Title: { tr: "Otonom Veri Akışı ve Dashboard Merkezi", en: "Autonomous Data Flow & Dashboard Hub" } as TranslationValue,
    bistFeature1Desc: {
      tr: "Standart finans uygulamalarındaki statik verileri unutun. Arka planda çalışan otonom botlar (Playwright) ve iş kuyruklarıyla (BullMQ) Borsa İstanbul'un nabzını tutan, Next.js ile render edilmiş yüksek performanslı bir komuta merkezi.",
      en: "Forget the static data in standard finance apps. A high-performance command center rendered with Next.js, powered by autonomous bots (Playwright) and job queues (BullMQ) that track the pulse of Borsa Istanbul.",
    } as TranslationValue,
    bistFeature2Title: { tr: "Acımasız Portföy Algoritmaları", en: "Ruthless Portfolio Algorithms" } as TranslationValue,
    bistFeature2Desc: {
      tr: "Duygusal ve amatör kararları ortadan kaldıran analitik bir yargıç. PostgreSQL üzerinde koşan karmaşık hesaplamalar sayesinde; varlık dağılımınızı, sektörel yığılmaları ve portföy sağlığınızı anında analiz ederek sizi olası çöküşlere karşı uyarır.",
      en: "An analytical judge that eliminates emotional and amateur decisions. Thanks to complex calculations running on PostgreSQL, it instantly analyzes your asset allocation, sector concentrations, and portfolio health, warning you against potential crashes.",
    } as TranslationValue,
    bistFeature3Title: { tr: "Dinamik Sentetik Bültenler", en: "Dynamic Synthetic Reports" } as TranslationValue,
    bistFeature3Desc: {
      tr: "Momentum, RSI ve hareketli ortalamalar gibi kritik metrikleri sistematik biçimde tarayıp hedef ve risk seviyelerini görünür hale getiren analiz raporları sunar.",
      en: "It systematically scans metrics such as momentum, RSI, and moving averages to present analysis reports with visible target and risk levels.",
    } as TranslationValue,
    bistFeature4Title: { tr: "Ölçeklenebilir SaaS Altyapısı", en: "Scalable SaaS Infrastructure" } as TranslationValue,
    bistFeature4Desc: {
      tr: "Bu sadece bir arayüz değil; Supabase ve TypeScript tabanlı sağlam bir abonelik ekosistemi. Farklı kullanıcı profillerinin API limitlerini, veritabanı yükünü ve arka plan işlem güçlerini pürüzsüzce yöneten tam teşekküllü bir B2B/B2C altyapısı.",
      en: "This is not just an interface; it's a robust subscription ecosystem based on Supabase and TypeScript. A full-fledged B2B/B2C infrastructure that seamlessly manages API limits, database loads, and background processing power for different user profiles.",
    } as TranslationValue,
    // MyBusinessBoss ERP & CRM features
    mybusinessbossFeature1Title: { tr: "01 - Ürün & Stok Yönetimi ve Dinamik Hareket Takibi", en: "01 - Inventory & Stock Movement Analytics" } as TranslationValue,
    mybusinessbossFeature1Desc: {
      tr: "Stok girişleri, çıkışları, kritik stok uyarıları, kategori ve tedarikçi bazlı filtreleme ile işletmenin tüm envanter hareketlerini anlık denetleyen akıllı stok motoru.",
      en: "Smart inventory engine monitoring stock entries, exits, threshold alerts, supplier workflows, and multi-category filtering in real time.",
    } as TranslationValue,
    mybusinessbossFeature2Title: { tr: "02 - Tamirhane & Servis İş Emirleri Yönetimi", en: "02 - Repair & Service Work Order Engine" } as TranslationValue,
    mybusinessbossFeature2Desc: {
      tr: "Müşteri cihaz/varlık kaydı, servis kabul, arıza teşhisi, parça/işçilik maliyetlendirmesi ve teslim durumunu aşama aşama yöneten tam teşekküllü tamirhane modülü.",
      en: "Full-lifecycle repair management tracking customer assets, service intake, diagnostics, spare parts/labor costing, and dispatch readiness.",
    } as TranslationValue,
    mybusinessbossFeature3Title: { tr: "03 - Operasyonel Planlama & Akıllı Randevu Takvimi", en: "03 - Operations Planning & Smart Appointment Calendar" } as TranslationValue,
    mybusinessbossFeature3Desc: {
      tr: "Aylık, haftalık ve günlük dinamik takvim ızgarası, saha randevuları planlaması ve personelin mobil cihazlarıyla canlı senkronize olan Akıllı Takvim (ICS) altyapısı.",
      en: "Dynamic monthly, weekly, and daily scheduling grid for field appointments with live ICS calendar sync across staff mobile devices.",
    } as TranslationValue,
    mybusinessbossFeature4Title: { tr: "04 - Kurumsal Sistem Yönetimi & Performans İzleme", en: "04 - Enterprise System Manager & Performance Diagnostics" } as TranslationValue,
    mybusinessbossFeature4Desc: {
      tr: "Veritabanı migration motoru, tek tıkla otomatik SQL yedekleme, sürüm önbelleği ve OPcache performans analizleriyle kesintisiz SaaS operasyon kontrol merkezi.",
      en: "Comprehensive SaaS operations cockpit offering database schema migrations, automated SQL backups, cache versioning, and OPcache performance diagnostics.",
    } as TranslationValue,
    mybusinessbossProblem: {
      tr: "İşletmeler ve servisler; stok için ayrı Excel, randevu için kağıt defter, satış için eski tip hantal POS ve müşteri takibi için bağımsız programlar kullanarak devasa bir veri karmaşası, müşteri kaybı ve operasyonel verimsizlik yaşıyordu.",
      en: "Businesses and repair centers suffered from severe operational chaos and lost revenue by juggling fragmented tools: Excel for stock, paper planners for appointments, legacy POS terminals, and disconnected CRMs.",
    } as TranslationValue,
    mybusinessbossSolution: {
      tr: "Tüm bu karmaşayı tek bir yüksek performanslı mimaride birleştiren MyBusinessBoss SaaS platformunu geliştirdim. Donanım bağımsız barkod tarama, akıllı mobil takvim akışı, RBAC güvenlik duvarı ve PWA çevrimdışı çalışma kabiliyetiyle işletmelere eksiksiz bir dijital omurga kazandırdım.",
      en: "I engineered MyBusinessBoss, an all-in-one high-performance SaaS platform unifying every workflow. With hardware-independent barcode scanning, live mobile calendar feeds, RBAC security, and PWA offline capabilities, it delivers an enterprise-grade digital backbone.",
    } as TranslationValue,
    // BIST AI specific
    bistProblem: {
      tr: "Borsa İstanbul'daki şirketlerin anlık temel ve teknik analiz verilerinin, dağınık kaynaklardan çekilip saniyeler içinde işlenmesi gerekiyordu. Mevcut yapılar yavaş ve maliyetliydi.",
      en: "Real-time fundamental and technical analysis data from Borsa Istanbul companies needed to be pulled from scattered sources and processed in seconds. Existing solutions were slow and expensive.",
    } as TranslationValue,
    bistSolution: {
      tr: "Python ve FastAPI ile bir veri hattı kurdum. İşlenen kayıtlar Redis ile önbelleğe alınarak frontend tarafına kontrollü API yanıtlarıyla aktarıldı; analiz katmanında trend sinyallerini değerlendiren modeller kullanıldı.",
      en: "I built a data pipeline with Python and FastAPI. Processed records were cached with Redis and delivered to the frontend through controlled API responses, with models evaluating trend signals in the analytics layer.",
    } as TranslationValue,
    // High-converting CRO Lead Card
    leadCardBadge: { tr: "Özel Yazılım & Mühendislik", en: "Custom Software & Engineering" } as TranslationValue,
    leadCardTitle: {
      tr: "Benzer Bir Mimari veya Sistem mi Geliştirmek İstiyorsunuz?",
      en: "Looking to Build a Similar Architecture or System?",
    } as TranslationValue,
    leadCardSubtitle: {
      tr: "Fikrinizi yüksek performanslı ve sürdürülebilir bir dijital ürüne dönüştürelim; otonom scraping sistemleri, ölçeklenebilir SaaS platformları ve sağlam API mimarileri için hemen görüşelim.",
      en: "Let's turn your idea into a high-performance, sustainable digital product; get in touch for autonomous scraping pipelines, scalable SaaS platforms, and resilient API architectures.",
    } as TranslationValue,
    leadCardCtaPrimary: { tr: "Projenizi Başlatın & Teklif Alın", en: "Start Your Project & Request a Quote" } as TranslationValue,
    leadCardCtaSecondary: { tr: "Tüm Hizmetleri İncele", en: "Explore All Services" } as TranslationValue,
  },

  // ─── Footer ──────────────────────────────────────────
  footer: {
    rights: { tr: "Tüm Hakları Saklıdır.", en: "All Rights Reserved." } as TranslationValue,
    privacy: { tr: "Gizlilik ve Şartlar", en: "Privacy & Terms" } as TranslationValue,
  },
};

/**
 * Non-hook translation utility for server components.
 * Usage: getTranslation(translations.navbar.home, "en")
 */
export function getTranslation(value: TranslationValue, locale: Locale): string {
  return value[locale];
}
