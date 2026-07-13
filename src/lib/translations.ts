export type Locale = "tr" | "en";

type TranslationValue = { tr: string; en: string };

export const translations = {
  // ─── Navbar ──────────────────────────────────────────
  navbar: {
    home: { tr: "Ana Sayfa", en: "Home" } as TranslationValue,
    about: { tr: "Hakkımda", en: "About" } as TranslationValue,
    tools: { tr: "Araçlar", en: "Tools" } as TranslationValue,
    projects: { tr: "Projeler", en: "Projects" } as TranslationValue,
    contact: { tr: "İletişim", en: "Contact" } as TranslationValue,
    themeToggle: { tr: "Karanlık/Aydınlık mod geçişi", en: "Dark/Light mode toggle" } as TranslationValue,
    menuToggle: { tr: "Menüyü Aç/Kapat", en: "Toggle Menu" } as TranslationValue,
  },

  // ─── Hero ────────────────────────────────────────────
  hero: {
    subtitle: { tr: "Fullstack Developer & AI Otomasyon Uzmanı", en: "Fullstack Developer & AI Automation Expert" } as TranslationValue,
    cta: { tr: "Çalışmaları Keşfet", en: "Explore My Work" } as TranslationValue,
  },

  // ─── Manifesto ───────────────────────────────────────
  manifesto: {
    headingPart1: { tr: "Sadece Kod Yazmıyor,", en: "I Don't Just Write Code," } as TranslationValue,
    headingPart2: { tr: "Sistem İnşa Ediyorum.", en: "I Build Systems." } as TranslationValue,
    description: {
      tr: 'Kodlar herkes tarafından kopyalanabilir, ancak bir <vision>vizyon</vision> kopyalanamaz. Ben, karmaşık fikirleri alıp onları kusursuz işleyen dijital ürünlere dönüştüren bir mekanizmayım. Estetiği, <highlight>ağır mühendislikle</highlight> birleştiriyorum. Amacım sadece "çalışan" bir şeyler yapmak değil; piyasaya çıktığı an kendi başının çaresine bakabilen, güçlü ve <highlight>otonom sistemler</highlight> yaratmak.',
      en: 'Code can be copied by anyone, but a <vision>vision</vision> cannot. I am a mechanism that takes complex ideas and transforms them into flawlessly functioning digital products. I merge aesthetics with <highlight>heavy engineering</highlight>. My goal is not just to build something that "works"; it\'s to create powerful and <highlight>autonomous systems</highlight> that can fend for themselves the moment they hit the market.',
    } as TranslationValue,
  },

  // ─── Bento Grid ──────────────────────────────────────
  bento: {
    aiTitle: { tr: "Yapay Zeka & Otomasyon", en: "AI & Automation" } as TranslationValue,
    aiDesc: {
      tr: "Zaman alan manuel süreçleri botlar ve veri kazıma (scraping) algoritmalarıyla sıfıra indiriyorum. LLM entegrasyonları ile sadece işleyen değil, düşünen ve kendi kararını alabilen otonom sistemler inşa ediyorum.",
      en: "I eliminate time-consuming manual processes with bots and web scraping algorithms. With LLM integrations, I build autonomous systems that don't just run — they think and make their own decisions.",
    } as TranslationValue,
    frontendTitle: { tr: "Frontend Mimarisi", en: "Frontend Architecture" } as TranslationValue,
    backendTitle: { tr: "Backend Gücü", en: "Backend Power" } as TranslationValue,
    dataTitle: { tr: "Veri & Altyapı Yönetimi", en: "Data & Infrastructure" } as TranslationValue,
    dataDesc: {
      tr: "Uygulamaların kalbi veridir. Milyonlarca satırlık işlemleri darboğazsız yürütmek için PostgreSQL ve MongoDB odaklı, ölçeklenebilir ve güvenlik merkezli bulut veritabanı mimarileri tasarlıyorum.",
      en: "Data is the heart of applications. I design scalable, security-focused cloud database architectures centered on PostgreSQL and MongoDB to run millions of operations without bottlenecks.",
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
    haberTitle: { tr: "Haber Portalı", en: "News Portal" } as TranslationValue,
    haberDesc: {
      tr: "Bulut tabanlı otonom haber toplama motoru ve yüksek performanslı veri sunum (DaaS) platformu.",
      en: "Cloud-based autonomous news aggregation engine and high-performance Data-as-a-Service (DaaS) platform.",
    } as TranslationValue,
    bistTitle: { tr: "BIST AI", en: "BIST AI" } as TranslationValue,
    bistDesc: {
      tr: "Milyonlarca finansal veriyi sıfır hatayla işleyen analiz sistemi.",
      en: "An analysis system that processes millions of financial data points with zero errors.",
    } as TranslationValue,
  },

  // ─── GitHub Repos ────────────────────────────────────
  github: {
    noDescription: { tr: "Açıklama bulunmuyor.", en: "No description available." } as TranslationValue,
    fetchError: { tr: "Şu an GitHub repolarına ulaşılamıyor.", en: "Unable to reach GitHub repos at this time." } as TranslationValue,
  },

  // ─── Contact Page ────────────────────────────────────
  contact: {
    eyebrow: { tr: "İletişim", en: "Contact" } as TranslationValue,
    heading: { tr: "Yeni bir projeniz\nmi var?", en: "Have a new\nproject?" } as TranslationValue,
    subtitle: {
      tr: "Detayları konuşmak, fiyat teklifi almak veya sadece merhaba demek için bana ulaşın.",
      en: "Reach out to discuss details, get a quote, or simply say hello.",
    } as TranslationValue,
    toast: { tr: "E-posta adresi panoya kopyalandı.", en: "Email address copied to clipboard." } as TranslationValue,
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

  // ─── Project Detail Page ─────────────────────────────
  projectDetail: {
    backLink: { tr: "Tüm Projelere Dön", en: "Back to All Projects" } as TranslationValue,
    techHeading: { tr: "Kullanılan Teknolojiler", en: "Technologies Used" } as TranslationValue,
    liveProject: { tr: "Canlı Proje", en: "Live Project" } as TranslationValue,
    githubRepo: { tr: "GitHub Repo", en: "GitHub Repo" } as TranslationValue,
    // Haber Portalı features
    haberFeature1Title: { tr: "Otonom Scraping Mimarisi", en: "Autonomous Scraping Architecture" } as TranslationValue,
    haberFeature1Desc: {
      tr: "Sunucu tarafında (server-side) çalışan, bulut ortamlarına tam entegre otonom web kazıma motoru. Kesintisiz veri akışı sağlarken IP engellemeleri ve zaman aşımı (timeout) gibi kronik sorunları aşmak için özel olarak tasarlandı.",
      en: "A server-side autonomous web scraping engine fully integrated with cloud environments. Specially designed to overcome chronic issues like IP blocks and timeouts while ensuring uninterrupted data flow.",
    } as TranslationValue,
    haberFeature2Title: { tr: "In-Memory Caching ile Sıfır Darboğaz", en: "Zero Bottleneck with In-Memory Caching" } as TranslationValue,
    haberFeature2Desc: {
      tr: "Mükerrer URL'leri ve anlık trafik dalgalanmalarını veritabanına yansıtmadan sönümleyen bellek içi (in-memory) önbellekleme mekanizması. Veritabanı üzerindeki okuma/yazma yükünü ve darboğazları (bottleneck) ortadan kaldıran mühendislik çözümü.",
      en: "An in-memory caching mechanism that absorbs duplicate URLs and instant traffic spikes without reflecting them to the database. An engineering solution that eliminates read/write load and bottlenecks on the database.",
    } as TranslationValue,
    haberFeature3Title: { tr: "Maksimum Frontend Performansı", en: "Maximum Frontend Performance" } as TranslationValue,
    haberFeature3Desc: {
      tr: "Devasa metin ve medya içeriklerinin tarayıcıyı dondurmasını engellemek için uygulanan GZIP sıkıştırması ve Lazy Loading (tembel yükleme) stratejileri. Kullanıcı tarafında pürüzsüz ve sıfır gecikmeli bir okuma deneyimi.",
      en: "GZIP compression and lazy loading strategies implemented to prevent massive text and media content from freezing the browser. A smooth, zero-latency reading experience on the user side.",
    } as TranslationValue,
    haberFeature4Title: { tr: "Data-as-a-Service (DaaS) Altyapısı", en: "Data-as-a-Service (DaaS) Infrastructure" } as TranslationValue,
    haberFeature4Desc: {
      tr: "Toplanan, temizlenen ve kategorize edilen binlerce satır güncel haber verisinin, istenilen başka bir platforma veya API'ye anında servis edilebileceği, ölçeklenebilir ve bağımsız veri mimarisi.",
      en: "A scalable and independent data architecture where thousands of rows of collected, cleaned, and categorized news data can be instantly served to any desired platform or API.",
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
      tr: "Her hisse için manuel grafik çizme ameleliğine son. Momentum, RSI ve hareketli ortalamalar gibi kritik metrikleri milisaniyeler içinde tarayıp, hedefleri ve stop-loss noktaları net bir şekilde çizilmiş mühendislik raporları sunar.",
      en: "No more manual chart drawing for every stock. Scans critical metrics like Momentum, RSI, and moving averages in milliseconds, delivering engineering reports with clearly drawn targets and stop-loss points.",
    } as TranslationValue,
    bistFeature4Title: { tr: "Ölçeklenebilir SaaS Altyapısı", en: "Scalable SaaS Infrastructure" } as TranslationValue,
    bistFeature4Desc: {
      tr: "Bu sadece bir arayüz değil; Supabase ve TypeScript tabanlı sağlam bir abonelik ekosistemi. Farklı kullanıcı profillerinin API limitlerini, veritabanı yükünü ve arka plan işlem güçlerini pürüzsüzce yöneten tam teşekküllü bir B2B/B2C altyapısı.",
      en: "This is not just an interface; it's a robust subscription ecosystem based on Supabase and TypeScript. A full-fledged B2B/B2C infrastructure that seamlessly manages API limits, database loads, and background processing power for different user profiles.",
    } as TranslationValue,
    // BIST AI specific
    bistProblem: {
      tr: "Borsa İstanbul'daki şirketlerin anlık temel ve teknik analiz verilerinin, dağınık kaynaklardan çekilip saniyeler içinde işlenmesi gerekiyordu. Mevcut yapılar yavaş ve maliyetliydi.",
      en: "Real-time fundamental and technical analysis data from Borsa Istanbul companies needed to be pulled from scattered sources and processed in seconds. Existing solutions were slow and expensive.",
    } as TranslationValue,
    bistSolution: {
      tr: "Python ve FastAPI kullanarak yüksek performanslı bir veri hattı (pipeline) kurdum. Milyonlarca satır veri Redis ile önbelleğe alınarak sıfır gecikme ile frontend tarafına aktarıldı. Makine öğrenmesi algoritmaları ile trend tahminleri eklendi.",
      en: "I built a high-performance data pipeline using Python and FastAPI. Millions of data rows were cached with Redis and delivered to the frontend with zero latency. Machine learning algorithms were added for trend predictions.",
    } as TranslationValue,
  },

  // ─── Footer ──────────────────────────────────────────
  footer: {
    rights: { tr: "Tüm Hakları Saklıdır.", en: "All Rights Reserved." } as TranslationValue,
  },
};

/**
 * Non-hook translation utility for server components.
 * Usage: getTranslation(translations.navbar.home, "en")
 */
export function getTranslation(value: TranslationValue, locale: Locale): string {
  return value[locale];
}
