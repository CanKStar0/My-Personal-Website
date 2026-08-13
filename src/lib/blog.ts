export type BlogSection = { title: string; paragraphs: string[]; items?: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt: string;
  category: string;
  readingTime: string;
  serviceHref: string;
  serviceAnchor: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "web-scraping-nedir",
    title: "Web Scraping Nedir? Nasıl Çalışır?",
    description: "Web scraping'in ne olduğunu, hangi veri toplama problemlerinde kullanıldığını ve sürdürülebilir bir sistemin hangi katmanlardan oluştuğunu öğrenin.",
    publishedAt: "2026-08-13",
    modifiedAt: "2026-08-13",
    category: "Web Scraping",
    readingTime: "6 dk",
    serviceHref: "/hizmetler/web-scraping",
    serviceAnchor: "Web scraping hizmeti ve veri toplama çözümlerini inceleyin",
    sections: [
      { title: "Web scraping ne demek?", paragraphs: ["Web scraping, web sayfalarındaki kamuya açık bilgilerin yazılım aracılığıyla alınması ve yapılandırılmış veriye dönüştürülmesidir. Bir insanın ürün adı, fiyat veya haber başlığı kopyaladığı işi otomatikleştirir.", "Asıl değer yalnızca sayfayı okumakta değil; veriyi düzenli biçimde toplamak, temizlemek, tekrarları ayıklamak ve başka bir sistemin kullanabileceği hale getirmektedir."] },
      { title: "Temel çalışma akışı", paragraphs: ["Sistem hedef sayfayı talep eder, gerekli alanları seçer, kayıtları doğrular ve tanımlanan hedefe aktarır. JavaScript ile sonradan yüklenen sayfalarda Playwright gibi gerçek tarayıcı davranışı sağlayan araçlar gerekebilir."], items: ["Kaynağı ve erişim koşullarını analiz etme", "Gerekli alanları çıkarma", "Veriyi temizleme ve standardize etme", "API veya veritabanına aktarma", "Hata ve kaynak değişikliklerini izleme"] },
      { title: "Web scraping ile API arasındaki fark", paragraphs: ["API, veri sahibinin tanımladığı resmi ve yapılandırılmış erişim yoludur. Uygun bir API varsa çoğu zaman ilk tercih odur. Web scraping ise API sunulmayan veya ihtiyacı karşılamayan kamuya açık sayfalarda devreye girer.", "Üretim sistemlerinde seçim; kullanım koşulları, veri güncelliği, bakım maliyeti ve hata toleransı birlikte değerlendirilerek yapılmalıdır."] },
      { title: "Sürdürülebilir sistem neden önemlidir?", paragraphs: ["Sayfa yapıları değişebilir, ağ hataları oluşabilir ve aynı kayıt birden fazla kez görülebilir. Bu nedenle zamanlama, yeniden deneme, kayıt tutma, önbellek ve veri doğrulama katmanları tek seferlik bir script ile üretim sistemi arasındaki temel farktır."] },
    ],
  },
  {
    slug: "ai-otomasyon-nedir",
    title: "AI Otomasyon Nedir? İş Süreçlerinde Nasıl Kullanılır?",
    description: "AI otomasyonun klasik otomasyondan farkını, uygun kullanım alanlarını ve güvenilir bir LLM entegrasyonunda dikkat edilmesi gerekenleri öğrenin.",
    publishedAt: "2026-08-13",
    modifiedAt: "2026-08-13",
    category: "AI Otomasyon",
    readingTime: "7 dk",
    serviceHref: "/hizmetler/yapay-zeka-otomasyon",
    serviceAnchor: "Yapay zekâ otomasyon hizmeti ve entegrasyon yaklaşımını inceleyin",
    sections: [
      { title: "AI otomasyon neyi değiştirir?", paragraphs: ["Klasik otomasyon açık kurallarla tekrarlanan adımları yürütür. AI otomasyon ise metin, doküman veya serbest biçimli kullanıcı talebi gibi kesin kurallarla ifade edilmesi zor girdileri yorumlama katmanı ekler.", "İyi bir çözüm klasik yazılım kurallarını ortadan kaldırmaz; modelin esnekliğini doğrulama, yetki ve iş kurallarıyla sınırlar."] },
      { title: "Uygun kullanım alanları", paragraphs: ["En iyi adaylar yüksek tekrar içeren, insan emeği alan ve çıktı kalitesinin ölçülebildiği süreçlerdir."], items: ["Talep ve doküman sınıflandırma", "Özetleme ve rapor taslağı hazırlama", "Veri zenginleştirme", "Bilgi tabanı üzerinde soru yanıtlama", "Operasyon ekipleri için kontrollü yardımcı akışlar"] },
      { title: "AI agent ve klasik akış farkı", paragraphs: ["Klasik akışta adımlar önceden tanımlıdır. Bir AI agent ise hedefe göre araç seçebilir ve birden fazla adımı planlayabilir. Bu esneklik, daha sıkı yetki sınırları ve gözlemlenebilirlik gerektirir.", "Her otomasyonun agent olması gerekmez. Tahmin edilebilir bir iş için basit ve denetlenebilir iş akışı genellikle daha güvenlidir."] },
      { title: "Güvenilir entegrasyonun katmanları", paragraphs: ["Model seçimi kadar veri erişimi, kişisel bilgi politikası, hata halinde geri dönüş, maliyet takibi ve insan onayı da önemlidir. AI özelliği, ürünün backend ve kullanıcı deneyimiyle birlikte tasarlanmalıdır."] },
    ],
  },
  {
    slug: "rest-api-nedir",
    title: "REST API Nedir? Backend Sistemlerinde Nasıl Çalışır?",
    description: "REST API'nin temel mantığını, istemci-backend iletişimini ve güvenilir bir API tasarımında önemli olan sözleşmeleri anlaşılır biçimde inceleyin.",
    publishedAt: "2026-08-13",
    modifiedAt: "2026-08-13",
    category: "API & Backend",
    readingTime: "6 dk",
    serviceHref: "/hizmetler/api-gelistirme",
    serviceAnchor: "API geliştirme ve sistem entegrasyonu hizmetini inceleyin",
    sections: [
      { title: "API ne işe yarar?", paragraphs: ["API, iki yazılım bileşeninin hangi istek ve yanıt biçimleriyle iletişim kuracağını tanımlar. Web arayüzü, mobil uygulama, ödeme sağlayıcısı veya veri servisi bu sözleşme üzerinden güvenilir biçimde veri alışverişi yapar."] },
      { title: "REST yaklaşımı", paragraphs: ["REST API'lerde veriler kaynaklar olarak modellenir ve HTTP yöntemleriyle okunur veya değiştirilir. URL yapısı, durum kodları ve yanıt biçimleri tutarlı olduğunda farklı ekipler entegrasyonu daha kolay sürdürebilir."], items: ["GET: kaynak okuma", "POST: yeni işlem veya kaynak oluşturma", "PUT/PATCH: güncelleme", "DELETE: kaynak silme", "HTTP durum kodları: sonucun açıkça bildirilmesi"] },
      { title: "Backend tarafında neler olur?", paragraphs: ["İstek alındığında veri doğrulanır, erişim yetkisi kontrol edilir, iş kuralları çalıştırılır ve veritabanı ya da başka servislerle iletişim kurulur. Sonuç, istemcinin anlayacağı kararlı bir yapıyla döndürülür."] },
      { title: "İyi API tasarımının ölçütleri", paragraphs: ["Güvenlik, performans ve dokümantasyon sonradan eklenen ayrıntılar değildir. Tutarlı hata yönetimi, yetkilendirme, oran sınırlama, önbellek ve izlenebilirlik sistemin kullanım biçimine göre baştan değerlendirilir."] },
    ],
  },
];

export const blogPostBySlug = Object.fromEntries(blogPosts.map((post) => [post.slug, post])) as Record<string, BlogPost>;

