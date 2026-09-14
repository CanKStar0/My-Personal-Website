export type ServiceSection = {
  title: string;
  body: string;
  items?: string[];
};

export type ServiceFaq = {
  question: string;
  answer: string;
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
  faqs?: ServiceFaq[];
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
    faqs: [
      {
        question: "Web scraping sistemleri dinamik ve korumalı kaynaklarda kesintisiz çalışır mı?",
        answer: "Evet; Playwright tabanlı tarayıcı otomasyonu, akıllı oturum ve proxy yönetimi, rate-limit dengelemesi ve otomatik hata kurtarma katmanları sayesinde dinamik koruma mekanizmalarına sahip web kaynaklarından sürdürülebilir ve kesintisiz veri akışı sağlanır.",
      },
      {
        question: "Çekilen veriler hangi formatta ve nereye teslim edilir?",
        answer: "İhtiyacınıza göre PostgreSQL, MongoDB, MySQL veritabanlarına doğrudan yazılabilir, REST API veya webhook endpoint'lerine iletilebilir ya da JSON, CSV, Excel formatında periyodik olarak sunulabilir.",
      },
      {
        question: "Hedef web sitesinin tasarımı veya HTML yapısı değişirse ne olur?",
        answer: "Geliştirdiğim scraping sistemleri hata yakalama, loglama ve anlık bildirim mekanizmalarıyla donatılır. Seçici (selector) veya DOM değişikliklerinde anında tespit edilerek kolayca güncellenir.",
      },
      {
        question: "Veri çekme işlemleri ne sıklıkla çalıştırılabilir?",
        answer: "CRON görevleri ve Redis kuyrukları sayesinde veriler ihtiyacınıza göre dakikalık, saatlik, günlük veya gerçek zamanlı event tetiklemeli olarak zamanlanabilir.",
      },
    ],
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
    faqs: [
      {
        question: "Hangi LLM modelleri ve sağlayıcıları ile çalışıyorsunuz?",
        answer: "OpenAI (GPT-4o), Anthropic (Claude 3.5), Google (Gemini 1.5/2.0), DeepSeek ve yerel açık kaynak modelleri (Ollama / Llama 3 / Mistral) ile kurumsal ihtiyaç ve veri gizliliği standartlarına göre çalışıyorum.",
      },
      {
        question: "Şirketimizin özel verileri ve belgeleri yapay zekaya nasıl entegre edilir?",
        answer: "RAG (Retrieval-Augmented Generation) mimarisi ve vektör veritabanları (Pinecone, PGVector, Qdrant) kullanarak verileriniz dışarı sızmadan, güncel şirket belgeleriniz üzerinden yanıt veren sistemler kurguluyorum.",
      },
      {
        question: "AI modellerinin halüsinasyon (yanlış bilgi) üretmesi nasıl engellenir?",
        answer: "Sıkı sistem promptları, şema doğrulaması (Zod / Pydantic), çıktı denetim katmanları (Guardrails) ve gerektiğinde insan onay adımları (Human-in-the-loop) eklenerek hata riski minimize edilir.",
      },
    ],
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
    faqs: [
      {
        question: "Özel yazılım geliştirme süreci ne kadar sürer?",
        answer: "Projenin kapsamına bağlı olarak MVP (Minimum Uygulanabilir Ürün) veya odaklanmış otomasyonlar genellikle 2 ila 4 hafta içinde canlıya alınır; daha büyük ölçekli SaaS sistemleri aşamalı teslim edilir.",
      },
      {
        question: "Geliştirilen yazılımın kaynak kodları kime ait olur?",
        answer: "Teslim edilen tüm kaynak kodları, mimari dokümanlar ve veritabanı şemaları tamamen müşteriye aittir. Vendor lock-in (bağımlılık) olmadan başka geliştiricilerin de devralabileceği temiz bir kod tabanı sunulur.",
      },
      {
        question: "Proje teslim edildikten sonra bakım ve destek sağlanıyor mu?",
        answer: "Evet, sunucu yönetimi, güvenlik güncellemeleri, performans takibi ve yeni özellik geliştirmeleri için periyodik bakım ve teknik destek hizmeti sağlanmaktadır.",
      },
    ],
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
    faqs: [
      {
        question: "API'lerde hangi güvenlik ve kimlik doğrulama standartları kullanılıyor?",
        answer: "JWT (JSON Web Tokens), API Key rotasyonu, OAuth2, Rate Limiting (istek sınırlandırma), CORS ve OWASP API güvenlik yönergelerine uygun yetkilendirme katmanları uygulanır.",
      },
      {
        question: "API dokümantasyonu nasıl sağlanıyor?",
        answer: "FastAPI veya OpenAPI (Swagger) ve Postman koleksiyonları ile interaktif, test edilebilir ve her endpoint'in request/response modellerini açıkça gösteren dokümantasyon üretilir.",
      },
      {
        question: "Yüksek trafik altında API performansı nasıl korunur?",
        answer: "Redis önbellek (caching) katmanları, veritabanı indeksleme, connection pooling ve asenkron (async/await) mimari ile milisaniye seviyesinde yanıt süreleri elde edilir.",
      },
    ],
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
    faqs: [
      {
        question: "Next.js App Router ve React 19 mimarisi ne gibi avantajlar sunar?",
        answer: "React Server Components (RSC) ile istemciye gönderilen JavaScript boyutu minimuma iner, sayfa yükleme hızları (LCP) artar ve arama motorları içeriği anında eksiksiz indeksler.",
      },
      {
        question: "Core Web Vitals ve sayfa hızı garantisi veriyor musunuz?",
        answer: "Evet, Tailwind CSS v4, optimize font yüklemeleri, lazy load ve modern resim formatları (WebP/AVIF) ile Google PageSpeed ve Core Web Vitals metriklerinde yeşil (90+) skorlar hedeflenir.",
      },
      {
        question: "Çok dilli (i18n) Next.js yapılandırması nasıl çalışıyor?",
        answer: "URL tabanlı dinamik rota yönetimi, hreflang etiketleri, eşleştirilmiş meta etiketleri ve çeviri paritesi ile uluslararası SEO kurallarına %100 uyumlu çok dilli altyapı kurulur.",
      },
    ],
  },
  {
    slug: "rakip-fiyat-takip-sistemi",
    shortTitle: "Rakip Fiyat Takibi",
    title: "Otomatik Rakip Fiyat ve Stok Takip Sistemi",
    metadataTitle: "Rakip Fiyat Takip Sistemi ve Fiyat Alarm Yazılımı",
    description: "E-ticaret ve pazaryeri satıcıları için 7/24 otomatik rakip fiyat, stok ve indirim takibi. Fiyat kırılmalarında anında WhatsApp/E-posta alarmı ve kâr marjı koruma.",
    eyebrow: "E-Ticaret Veri Otomasyonu",
    intro: "Rakiplerinizin fiyat hamlelerini manuel takip ederek saatlerinizi ve satışlarınızı kaybetmeyin. Hedef pazar yerlerini ve rakip e-ticaret sitelerini periyodik tarayan, fiyat değişikliklerini anında bildiren ve dinamik kâr marjınızı koruyan özel fiyat takip altyapıları kuruyorum.",
    sections: [
      {
        title: "Manuel fiyat takibinin maliyeti nedir?",
        body: "Günde yüzlerce ürünün rakip fiyatlarını elle kontrol etmek sürdürülemez. Rakipler gece veya hafta sonu fiyat kırdığında saatlerce geç fark etmek, Buybox kayıplarına ve ciro erimesine yol açar.",
      },
      {
        title: "Hangi platformlardan fiyat ve stok çekilebilir?",
        body: "Hedeflediğiniz tüm dijital satış kanalları taranabilir ve tek bir merkezde konsolide edilir.",
        items: [
          "Trendyol, Hepsiburada, Amazon TR pazaryerleri",
          "Akakçe, Cimri gibi fiyat karşılaştırma motorları",
          "Rakiplerinizin doğrudan kendi e-ticaret siteleri",
          "Yetkili satıcı ve toptancı B2B bayi portalları",
        ],
      },
      {
        title: "Anlık fiyat alarmları ve bildirim mekanizmaları",
        body: "Rakibiniz fiyatı düşürdüğünde veya stoku tükendiğinde beklemeden haberdar olun. Telegram botu, WhatsApp API bildirimleri, acil e-posta alarmları veya kendi sisteminize iletilen webhook çağrıları kurulur.",
      },
      {
        title: "Veri teslimi ve entegrasyon seçenekleri",
        body: "Toplanan fiyat geçmişi ve anlık veriler; Google Sheets, canlı Excel, REST API veya doğrudan WooCommerce/Shopify mağazanıza bağlanarak otomatik fiyat güncellemesi (repricing) sağlayabilir.",
      },
      {
        title: "Kesintisiz çalışma ve dayanıklı mimari",
        body: "Akıllı oturum yönetimi, dağıtık proxy dengelemesi ve DOM değişiklik tespit altyapısıyla sistem kaynak güncellense bile aksamadan çalışmaya devam eder.",
      },
    ],
    technologies: ["Node.js", "Playwright", "PostgreSQL", "Redis", "Telegram/WhatsApp API", "REST API", "Google Sheets API"],
    relatedServices: ["web-scraping", "e-ticaret-urun-veri-aktarimi", "api-gelistirme"],
    project: {
      title: "Akakçe Fiyat Takip & Scraper Motoru",
      description: "E-ticaret fiyat geçmişi ve ürün verilerini yüksek frekansla toplayan açık kaynaklı fiyat takip mimarisini inceleyin.",
      href: "/projeler/haber-portali",
      anchor: "Fiyat takip ve scraping mimarisi detaylarını inceleyin",
    },
    faqs: [
      {
        question: "Rakip web siteleri yapısını değiştirdiğinde sistem bozulur mu?",
        answer: "Geliştirdiğim sistem otomatik anomali tespiti ve loglama katmanıyla donatılır. Seçici (selector) veya DOM değişikliklerinde anında alarm üretilerek sistem kesintiye uğramadan güncellenir.",
      },
      {
        question: "Fiyat bildirimleri ne kadar hızlı gelir?",
        answer: "İhtiyacınıza göre dakikalık, saatlik veya belirli periyotlarda tarama yapılır. Fiyat eşiği aşıldığında veya değişim tespit edildiğinde saniyeler içinde WhatsApp veya Telegram mesajı iletilir.",
      },
      {
        question: "Kendi e-ticaret panelimizdeki fiyatları otomatik güncelleyebilir mi?",
        answer: "Evet, belirlediğiniz kâr marjı kurallarına göre (örneğin 'Rakibin 2 TL altına in ama 250 TL'nin altına düşme') WooCommerce, Shopify veya özel ERP sisteminize REST API ile dinamik fiyatlama bağlanabilir.",
      },
      {
        question: "Fiyat takibi yapmak hukuki açıdan uygun mudur?",
        answer: "Kamuya açık olan fiyat ve stok verilerinin toplanması ve analiz edilmesi genel piyasa araştırması kapsamında yasal standartlara uygun biçimde, hedef sitelerin sunucu yükünü zorlamayan kurumsal kurallarla yürütülür.",
      },
    ],
  },
  {
    slug: "e-ticaret-urun-veri-aktarimi",
    shortTitle: "Ürün Veri Aktarımı",
    title: "E-Ticaret Toplu Ürün ve Katalog Veri Aktarımı",
    metadataTitle: "E-Ticaret Ürün Çekme ve WooCommerce / Shopify Aktarımı",
    description: "Tedarikçi ve rakip sitelerden on binlerce ürünü varyantları, görselleri, açıklamaları ve stoklarıyla toplayıp WooCommerce, Shopify veya özel sisteminize hatasız aktarma.",
    eyebrow: "Katalog & Entegrasyon Çözümleri",
    intro: "Tedarikçiniz XML vermiyor mu ya da mevcut veri kaynağınız eksik ve biçimsiz mi? Kaynak sitelerdeki ürünleri, kategorileri, varyant seçeneklerini ve yüksek çözünürlüklü görselleri temizleyerek mağazanıza eksiksiz aktarıyor ve stok senkronizasyonu kuruyorum.",
    sections: [
      {
        title: "Manuel ürün girişine son verin",
        body: "Binlerce ürünü elle sitenize eklemek haftalarca iş gücü ve yüksek personel maliyeti demektir. Otomatik aktarım motorları ile tüm katalog dakikalar içinde mağazanıza yüklenir.",
      },
      {
        title: "Varyant, görsel ve açıklama standardizasyonu",
        body: "Renk, beden, model gibi karmaşık varyant yapıları doğru hiyerarşiyle eşleştirilir. Görseller optimize edilerek kendi sunucunuza aktarılır, HTML açıklamaları SEO uyumlu şekilde temizlenir.",
      },
      {
        title: "Desteklenen e-ticaret altyapıları",
        body: "Mağazanız hangi teknolojiyi kullanırsa kullansın doğrudan entegrasyon sağlanır.",
        items: [
          "WooCommerce (WordPress) REST API & CLI aktarımı",
          "Shopify REST & GraphQL katalog aktarımı",
          "Ticimax, İdeaSoft, İkas veya özel yazılım veri tabanları",
          "Pazaryeri entegratörleri için özel XML/CSV çıktısı",
        ],
      },
      {
        title: "Periyodik stok ve fiyat senkronizasyonu",
        body: "Yalnızca bir defalık ürün yüklemek yetmez; kaynak sitedeki stok tükenmelerini ve fiyat artışlarını düzenli aralıklarla kontrol eden ve mağazanızı güncel tutan arka plan servisleri kurulur.",
      },
      {
        title: "Kâr marjı ve kur dönüştürme kuralları",
        body: "Tedarikçiden gelen alış fiyatlarının üzerine otomatik kâr marjı, KDV oranı veya döviz kuru formülleri uygulanarak satış fiyatları otomatik hesaplanır.",
      },
    ],
    technologies: ["Node.js", "Python", "WooCommerce REST API", "Shopify API", "PostgreSQL", "Playwright", "Sharp (Image Processing)"],
    relatedServices: ["rakip-fiyat-takip-sistemi", "web-scraping", "api-gelistirme"],
    project: {
      title: "Otomatik Haber & İçerik Portalı",
      description: "Çoklu kaynaktan yüksek hacimli veriyi ayrıştırıp yapılandırılmış olarak sunan içerik ve veri hattı mimarisi.",
      href: "/projeler/haber-portali",
      anchor: "Büyük ölçekli veri toplama ve aktarma mimarisini inceleyin",
    },
    faqs: [
      {
        question: "XML feed vermeyen tedarikçilerden ürün çekilebilir mi?",
        answer: "Evet, tedarikçinizin yalnızca web sitesi veya B2B bayilik ekranı olması yeterlidir. Otomasyon araçlarıyla sayfalar taranarak tüm ürün ve stok verileri yapılandırılmış kataloğa dönüştürülür.",
      },
      {
        question: "Ürün resimleri kendi sunucumuza optimize edilerek indirilir mi?",
        answer: "Evet, harici link vermek yerine tüm ürün görselleri indirilir, WebP/AVIF formatına optimize edilir ve kendi medya kütüphanenize yüklenerek sitenizin hızlı açılması sağlanır.",
      },
      {
        question: "Mevcut ürünlerimizin veya kategorilerimizin üzerine yazılır mı?",
        answer: "Hayır. Sistem SKU (Stok Kodu) veya barkod kontrolüyle çalışır. Mağazanızda zaten var olan ürünlerin yalnızca stok ve fiyatı güncellenir, açıklama ve görselleriniz korunur.",
      },
      {
        question: "Aktarım ne kadar sürer?",
        answer: "Ürün hacmine ve görsel sayısına bağlı olarak 10.000 ürünlük bir katalog genellikle birkaç saat içinde temizlenip mağazanıza eksiksiz yüklenir.",
      },
    ],
  },
];

export const serviceBySlug = Object.fromEntries(
  services.map((service) => [service.slug, service]),
) as Record<string, Service>;
