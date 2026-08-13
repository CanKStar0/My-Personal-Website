export type ServiceSection = {
  title: string;
  body: string;
  items?: string[];
};

export type Service = {
  slug: string;
  shortTitle: string;
  title: string;
  metadataTitle: string;
  description: string;
  eyebrow: string;
  intro: string;
  sections: ServiceSection[];
  technologies: string[];
  relatedServices: string[];
  project?: {
    title: string;
    description: string;
    href: string;
    anchor: string;
  };
};

export const services: Service[] = [
  {
    slug: "web-scraping",
    shortTitle: "Web Scraping",
    title: "Web Scraping ve Otomatik Veri Toplama Hizmeti",
    metadataTitle: "Web Scraping Hizmeti ve Veri Toplama",
    description: "Dinamik web sitelerinden güvenilir veri toplama, temizleme, zamanlama ve API ya da veritabanına aktarım için özel web scraping sistemleri.",
    eyebrow: "Veri toplama sistemleri",
    intro: "Kamuya açık web verilerini düzenli, kullanılabilir ve sürdürülebilir bir akışa dönüştüren özel sistemler geliştiriyorum. Çözüm; hedef sitenin yapısına, veri hacmine ve teslim biçimine göre tasarlanır.",
    sections: [
      {
        title: "Web scraping hangi problemi çözer?",
        body: "Web scraping, farklı sayfalara dağılmış kamuya açık bilgileri elle kopyalamak yerine otomatik olarak toplar. Amaç yalnızca veri çekmek değil; değişikliklere dayanıklı, izlenebilir ve iş süreçlerine bağlanabilen bir veri hattı kurmaktır.",
      },
      {
        title: "Hangi veriler toplanabilir?",
        body: "Kaynağın erişim koşulları ve kullanım amacı değerlendirilerek farklı veri türleri yapılandırılabilir.",
        items: ["Ürün, fiyat ve stok bilgileri", "Haber ve kategori akışları", "Listeleme ve katalog verileri", "Araştırma için kamuya açık web verileri"],
      },
      {
        title: "Dinamik siteler ve tarayıcı otomasyonu",
        body: "JavaScript ile yüklenen içerikler ve kullanıcı etkileşimi gerektiren akışlarda Playwright tabanlı tarayıcı otomasyonu kullanılabilir. Daha basit kaynaklarda gereksiz tarayıcı maliyeti oluşturmayan hafif istemciler tercih edilir.",
      },
      {
        title: "Temizleme, standardizasyon ve teslim",
        body: "Ham kayıtlar tekrar, eksik alan ve biçim farkları açısından işlenir. Sonuçlar ihtiyaca göre API, PostgreSQL, MongoDB veya başka bir uygulamanın tüketebileceği yapılandırılmış çıktı olarak sunulur.",
      },
      {
        title: "Zamanlanmış ve sürdürülebilir çalışma",
        body: "Periyodik görevler, hata kayıtları, yeniden deneme ve önbellek katmanlarıyla otomatik veri toplama sisteminin yalnızca ilk gün değil, kaynak değiştikçe de yönetilebilir kalması hedeflenir.",
      },
    ],
    technologies: ["Playwright", "Node.js", "Python", "MongoDB", "Redis", "PostgreSQL", "REST API"],
    relatedServices: ["api-gelistirme", "ozel-yazilim-gelistirme"],
    project: {
      title: "Haber Portalı",
      description: "Otonom haber toplama, önbellekleme, temizleme ve veri sunum katmanlarını gerçek bir ürün üzerinde inceleyin.",
      href: "/projeler/haber-portali",
      anchor: "Haber Portalı web scraping mimarisini inceleyin",
    },
  },
  {
    slug: "yapay-zeka-otomasyon",
    shortTitle: "AI Otomasyon",
    title: "Yapay Zekâ ve AI Otomasyon Çözümleri",
    metadataTitle: "Yapay Zeka Otomasyon Hizmeti",
    description: "İş süreçlerini LLM entegrasyonları, özel AI akışları ve API bağlantılarıyla otomatikleştiren ölçülebilir yapay zekâ çözümleri.",
    eyebrow: "Akıllı iş akışları",
    intro: "Tekrarlanan karar ve içerik işlerini, insan kontrolünün nerede gerekli olduğunu gözeten yapay zekâ akışlarına dönüştürüyorum. Sistemler mevcut araçlara API üzerinden bağlanır ve iş sonucuna göre tasarlanır.",
    sections: [
      { title: "AI otomasyon nedir?", body: "AI otomasyon; metin, belge veya yapılandırılmış veriyi yorumlama gerektiren adımları LLM ve klasik yazılım kurallarıyla birleştirir. Her probleme AI eklemek yerine, faydanın ve hata maliyetinin net olduğu adımlar seçilir." },
      { title: "İş süreçlerinin otomasyonu", body: "Sınıflandırma, özetleme, veri zenginleştirme, rapor hazırlama ve farklı sistemler arasında bilgi taşıma gibi tekrarlı akışlar otomatikleştirilebilir." },
      { title: "LLM entegrasyonları ve AI agent sistemleri", body: "Model sağlayıcıları, şirket verisi ve harici araçlar kontrollü API katmanlarıyla bir araya getirilir. Yetki sınırları, doğrulama ve insan onayı gerektiren noktalar mimarinin parçasıdır." },
      { title: "API + AI mimarisi", body: "AI özelliği tek başına bırakılmaz; veri kaynağı, backend, önbellek, gözlemlenebilirlik ve kullanıcı arayüzüyle birlikte çalışan bir ürün bileşeni olarak geliştirilir." },
      { title: "Gerçekçi kullanım senaryoları", body: "İç operasyon asistanları, doküman işleme, raporlama, veri analizi, müşteri talebi sınıflandırma ve mevcut ürüne AI özelliği ekleme gibi senaryolar proje kapsamına göre ele alınabilir." },
    ],
    technologies: ["Python", "FastAPI", "Node.js", "LLM API", "Redis", "PostgreSQL", "Next.js"],
    relatedServices: ["ozel-yazilim-gelistirme", "api-gelistirme"],
    project: {
      title: "BIST AI",
      description: "Veri işleme, backend ve analiz katmanlarının bir ürün içinde nasıl birleştiğini görün.",
      href: "/projeler/bist-ai",
      anchor: "BIST AI veri ve analiz mimarisini inceleyin",
    },
  },
  {
    slug: "ozel-yazilim-gelistirme",
    shortTitle: "Özel Yazılım",
    title: "İşletmelere Özel Yazılım Geliştirme",
    metadataTitle: "Özel Yazılım Geliştirme",
    description: "Hazır araçların karşılamadığı iş ihtiyaçları için sürdürülebilir web uygulamaları, otomasyonlar, API sistemleri ve özel backend çözümleri.",
    eyebrow: "Ana hizmet",
    intro: "Hazır yazılımların iş akışınıza uymadığı noktada, problemi ve mevcut sistemleri analiz ederek size özel bir çözüm geliştiriyorum. Hedef; yalnızca çalışan kod değil, işletmenin gerçek sürecine oturan sürdürülebilir bir ürün ortaya çıkarmaktır.",
    sections: [
      { title: "Hangi yazılımları geliştiriyorum?", body: "İhtiyaca göre uçtan uca ürün veya mevcut sisteme bağlanan belirli bir katman geliştirilebilir.", items: ["Web uygulamaları ve SaaS ürünleri", "Yönetim panelleri ve özel backend sistemleri", "API ve sistem entegrasyonları", "Veri toplama ve otomasyon sistemleri", "AI destekli uygulamalar"] },
      { title: "Hangi problemleri çözüyorum?", body: "Manuel iş yükü, birbirinden kopuk araçlar, tekrar eden veri girişi, ölçeklenmeyen süreçler ve hazır ürünlerin karşılamadığı özel kurallar teknik çözüme dönüştürülür." },
      { title: "Teknik yaklaşım", body: "React ve Next.js arayüzleri; Node.js veya Python/FastAPI backend'leri; PostgreSQL, MongoDB ve Redis veri katmanları proje gereksinimine göre birlikte kullanılır." },
      { title: "Geliştirme süreci", body: "Analiz → mimari → geliştirme → test → yayın → iyileştirme. Kapsam, kritik kullanıcı akışları ve başarı ölçütleri geliştirmeden önce netleştirilir." },
      { title: "Mevcut sisteme uyum", body: "Her proje sıfırdan kurulmak zorunda değildir. Var olan API'lere, veri kaynaklarına veya operasyon araçlarına bağlanan daha küçük ve kontrollü çözümler de geliştirilebilir." },
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Redis"],
    relatedServices: ["web-scraping", "yapay-zeka-otomasyon", "api-gelistirme", "nextjs-gelistirme"],
    project: {
      title: "Gerçek proje kanıtları",
      description: "Veri toplama ve finansal analiz sistemlerinde kullanılan yaklaşımı case study sayfalarında görün.",
      href: "/projeler",
      anchor: "Öne çıkan özel yazılım projelerini inceleyin",
    },
  },
  {
    slug: "api-gelistirme",
    shortTitle: "API Geliştirme",
    title: "API Geliştirme ve Sistem Entegrasyonu",
    metadataTitle: "API Geliştirme ve Entegrasyon",
    description: "Web, mobil ve veri sistemleri için güvenilir REST API geliştirme; üçüncü taraf servis, veritabanı ve mevcut sistem entegrasyonları.",
    eyebrow: "Backend ve entegrasyon",
    intro: "Uygulamaların güvenilir biçimde veri paylaşmasını sağlayan API ve backend katmanları geliştiriyorum. Mimari; istemci ihtiyaçları, veri modeli, erişim kuralları ve beklenen yük birlikte değerlendirilerek kurulur.",
    sections: [
      { title: "REST API geliştirme", body: "Net kaynak modelleri, tutarlı hata yanıtları ve sürdürülebilir endpoint yapısıyla web veya mobil istemcilerin tüketebileceği özel API'ler geliştirilir." },
      { title: "Backend sistemleri", body: "İş kuralları, veri doğrulama, arka plan görevleri ve uygulama servisleri arayüzden ayrıştırılarak test edilebilir bir backend katmanında yönetilir." },
      { title: "Sistem ve third-party API entegrasyonu", body: "Ödeme, veri sağlayıcı, bildirim veya operasyon araçları gibi harici servisler mevcut ürüne kontrollü hata yönetimiyle bağlanır." },
      { title: "Veritabanı, erişim ve performans", body: "PostgreSQL, MongoDB veya Supabase entegrasyonları; ihtiyaca göre kimlik doğrulama, yetkilendirme ve Redis önbellek katmanlarıyla birlikte ele alınır." },
      { title: "Dokümantasyon ve devralınabilirlik", body: "Endpoint sözleşmeleri ve kritik akışlar ekiplerin entegrasyonu sürdürebileceği şekilde açık tutulur; proje yalnızca geliştirene bağlı kalmaz." },
    ],
    technologies: ["FastAPI", "Node.js", "REST", "PostgreSQL", "MongoDB", "Redis", "Supabase"],
    relatedServices: ["yapay-zeka-otomasyon", "ozel-yazilim-gelistirme"],
    project: {
      title: "BIST AI",
      description: "Python, FastAPI, Redis ve PostgreSQL katmanlarının veri odaklı bir üründe kullanımını inceleyin.",
      href: "/projeler/bist-ai",
      anchor: "BIST AI backend mimarisini inceleyin",
    },
  },
  {
    slug: "nextjs-gelistirme",
    shortTitle: "Next.js Geliştirme",
    title: "Next.js Web Uygulama Geliştirme",
    metadataTitle: "Next.js Geliştirme Hizmeti",
    description: "React ve TypeScript ile hızlı, erişilebilir, SEO uyumlu Next.js web siteleri ve modern web uygulamaları geliştirme.",
    eyebrow: "Modern web geliştirme",
    intro: "Next.js ile pazarlama sitelerinden veri yoğun web uygulamalarına kadar performanslı ve sürdürülebilir arayüzler geliştiriyorum. Render stratejisi, SEO ve kullanıcı deneyimi ürünün ihtiyacına göre birlikte ele alınır.",
    sections: [
      { title: "Next.js ile neler geliştiriyorum?", body: "Kurumsal ve kişisel siteler, SaaS arayüzleri, yönetim panelleri, içerik platformları ve API destekli web uygulamaları geliştirilebilir." },
      { title: "Server-side rendering ve içerik keşfi", body: "Önemli içeriklerin yalnızca tarayıcı tarafındaki JavaScript'e bağlı kalmaması için Server Components, statik üretim ve gerektiğinde server-side rendering kullanılır." },
      { title: "Performans ve Core Web Vitals", body: "Görsel boyutlandırma, font yükleme, kod bölme ve istemci bileşeni sınırları LCP, INP ve CLS risklerini azaltacak biçimde ele alınır." },
      { title: "SEO uyumlu Next.js geliştirme", body: "Benzersiz metadata, canonical, sitemap, robots, structured data ve doğru durum kodları uygulamanın route mimarisiyle birlikte kurulur." },
      { title: "API ve backend entegrasyonları", body: "Next.js arayüzü; FastAPI, Node.js veya üçüncü taraf servislerle güvenli ve sürdürülebilir sözleşmeler üzerinden bağlanır." },
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "REST API"],
    relatedServices: ["ozel-yazilim-gelistirme", "api-gelistirme"],
    project: {
      title: "Next.js proje örnekleri",
      description: "Haber Portalı ve BIST AI arayüzlerinde kullanılan ürün yaklaşımını inceleyin.",
      href: "/projeler",
      anchor: "Next.js ile geliştirilen projeleri inceleyin",
    },
  },
];

export const serviceBySlug = Object.fromEntries(
  services.map((service) => [service.slug, service]),
) as Record<string, Service>;

