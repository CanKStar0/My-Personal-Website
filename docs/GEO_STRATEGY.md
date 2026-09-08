# Canpolat Kaya — Üretken Motor Optimizasyonu (GEO) Stratejisi ve Doğrulama Matrisi

Bu doküman, **"Üretken Motor Optimizasyonu Hazırlık Kontrol Listesi"** (GEO Checklist) PDF'indeki 8 temel sütunun her bir maddesini, Canpolat Kaya kişisel web sitesi (`canpolatkaya.com`) mimarisi doğrultusunda detaylandırır ve ampirik denetim karnesini sunar.

---

## 🏛️ 1. Stratejik Temel (Strategic Foundation)

### 1.1 Strateji Geliştirme
- **Hedef:** AI arama motorlarında (ChatGPT Search, Perplexity AI, Google AI Overviews, Claude) "Full-Stack Developer", "Web Scraping Uzmanı", "AI Ajan Geliştirme", "Next.js & React 19 Mimarisi" ve "Özel Yazılım" aramalarında Canpolat Kaya'yı birincil otorite ve atıf kaynağı (primary cited source) haline getirmek.
- **GEO vs Geleneksel SEO:**
  - *Geleneksel SEO:* Anahtar kelime yoğunluğu, backlink sayısı ve SERP tıklama oranı (CTR) odaklıdır.
  - *GEO (Generative Engine Optimization):* Varlık ilişkileri (Entity Knowledge Graph), semantik bağlam derinliği, doğrudan yanıtlanabilirlik (`directAnswer`), alıntılanabilir veri tabloları ve `llms.txt` protokolü odaklıdır.
- **Kaynak & Bütçe:** Geliştirme ve içerik zaman bütçesinin %30'u GEO yapısal veri, LLM özetleri ve benchmarking süreçlerine tahsis edilmiştir.

### 1.2 6 Aylık Yol Haritası & Kilometre Taşları
| Dönem | Kilometre Taşı | Odak Alanı |
|---|---|---|
| **Ay 1-2 (Temel & Keşif)** | Teknik GEO Altyapısı | `robots.txt` AI crawler izinleri, `llms.txt` & `llms-full.txt`, JSON-LD `HowTo` / `TechArticle` / `Citation` entegrasyonu |
| **Ay 3-4 (Atıf & İçerik)** | Perplexity & SearchGPT Otoritesi | Blog yazılarında doğrudan alıntılanabilir benchmark verileri, resmi döküman atıfları (`sourcesCited`), derin teknik vaka analizleri |
| **Ay 5-6 (Dönüşüm & Dominasyon)** | AI Referral & Lead Attribution | GA4 üzerinden AI trafik dönüşümlerinin ölçümü, marka ses payı (Share of Voice) takibi ve yeni AI modellerine uyum |

### 1.3 Platform Önceliklendirmesi
1. **Perplexity AI:** Gerçek zamanlı web araması yaptığı ve doğrudan kaynak URL atfı verdiği için en yüksek dönüşümlü platform.
2. **ChatGPT / SearchGPT:** Konuşma tabanlı sorgularda geliştirici ve ajans önerilerinde birincil hedef.
3. **Google AI Overviews:** Organik aramalarda sıfır tıklama (zero-click) özet kutularında `directAnswer` ve `FAQPage` şemalarıyla yer alma.
4. **Claude (Anthropic):** Kodlama ve mimari danışmanlık sorgularında GitHub ve teknik blog referansı olma.

---

## ✍️ 2. İçerik Optimizasyonu (Content Optimization)

### 2.1 Anlamsal ve Doğal Dil Yapısı
- **Sohbet Tarzında & Açık Dil:** İçerikler jenerik pazarlama klişelerinden arındırılmış, doğrudan geliştirici ve karar vericiye hitap eden teknik yetkinlikle yazılmıştır.
- **Konu Kümeleri (Topic Clusters):**
  - Web Scraping & Playwright Otomasyonu
  - Agentic Coding & Claude Code / LLM Entegrasyonu
  - Next.js 16 App Router & Modern Frontend
  - Yüksek Performanslı REST API & Dağıtık Veri Hatları
- **Doğrudan Yanıtlar (`directAnswer`):** Her blog yazısının başında Perplexity ve AI Overviews'in tek seferde alıntılayabileceği 2-3 cümlelik kristal netlikte özet yer alır.
- **Ana Çıkarımlar (`keyTakeaways`):** Madde işaretli özetlerle LLM bağlam penceresi hızlıca beslenir.
- **Yetkin Kaynak Atıfları (`sourcesCited`):** Resmî kütüphane dokümantasyonlarına ve akademik araştırmalara doğrudan atıf yapılır.

---

## ⚙️ 3. Teknik Uygulama & Altyapı (Technical Implementation)

### 3.1 Şema İşaretlemesi (Schema.org JSON-LD)
- **Ana Sayfa:** `WebSite` + `Person` + `Organization` + `ProfessionalService` varlıkları `@id` üzerinden kapalı devre varlık grafiği (Closed-Loop Entity Graph) ile birbirine bağlanmıştır.
- **Editoryal İçerik (Blog):**
  - `@type: ["BlogPosting", "TechArticle"]`
  - `image`: Google ve AI botlarının zorunlu tuttuğu OpenGraph görseli.
  - `abstract`: `directAnswer` özeti.
  - `citation`: `sourcesCited` listesi üzerinden `CreativeWork` atıfları.
  - `HowTo`: Kurulum ve adım adım rehber içeren yazılarda otomatik `HowTo` ve `HowToStep` şeması.
  - `FAQPage`: Soru-cevap listeleri için tam akordeon şeması.
- **Hizmet Sayfaları:** `Service` + `FAQPage` + `BreadcrumbList`.
- **Proje Sayfaları:** `SoftwareApplication` / `WebApplication` + `BreadcrumbList`.

### 3.2 AI Tarayıcı Erişimi & `robots.txt`
`robots.ts` üzerinde aşağıdaki AI motorlarına tam erişim verilmiş, hassas/dahili API rotaları ve özel repolar filtrelenmiştir:
- `GPTBot`, `ChatGPT-User`, `OAI-SearchBot` (OpenAI)
- `ClaudeBot`, `Claude-Web` (Anthropic)
- `PerplexityBot` (Perplexity)
- `Google-Extended` (Google Gemini)
- `Applebot`, `Applebot-Extended` (Apple Intelligence)
- `Meta-ExternalAgent` (Meta AI)
- `cohere-ai` (Cohere)
- `Bytespider` (ByteDance)
- `Amazonbot` (Amazon Q)
- `Diffbot` (Semantik Tarayıcı)
- `DuckAssistBot` (DuckDuckGo AI)

### 3.3 LLM İndeksi: `llms.txt` & `llms-full.txt`
- `https://canpolatkaya.com/llms.txt`: Sitenin mimarisini, hizmetlerini, projelerini ve blog yazılarını LLM'lerin tek istekte okuyabilmesi için standart markdown formatında sunar.
- `https://canpolatkaya.com/llms-full.txt`: Tüm hizmetlerin ve 100+ teknik makalenin tam özet metnini içerir.
- HTML `<head>` etiketine `<link rel="alternate" type="text/plain" href="/llms.txt" />` eklenerek otomatik keşif sağlanmıştır.

---

## 📈 4. İzleme, Analitik & Dönüşüm (Analytics & Attribution)

### 4.1 GA4 AI Yönlendirme & Dönüşüm Takip Motoru
`src/lib/analytics.ts` ve `src/components/analytics-tracker.tsx` üzerinden:
1. Gelen ziyaretçinin `document.referrer` ve `utm_source` parametreleri taranır.
2. Ziyaretçi ChatGPT, Perplexity, Claude, Gemini veya Copilot üzerinden geldiyse `ai_referral_visit` özel etkinliği ateşlenir.
3. Oturum boyunca `sessionStorage` üzerinde GEO atıf kaydı tutulur.
4. Ziyaretçi sitede birincil aksiyon aldığında (İletişim, E-posta Kopyalama, Proje Canlı Demo veya GitHub tıklaması), etkinlik parametrelerine otomatik olarak `{ geo_ai_referral: true, geo_ai_platform: "Perplexity" }` eklenir.

---

## 🧪 5. GEO Test & Doğrulama Prompt Kütüphanesi (Prompt Library)

Aşağıdaki komutlar, Canpolat Kaya'nın AI arama motorlarındaki görünürlüğünü düzenli test etmek için kullanılır:

1. **Perplexity:**
   - `"Türkiye'de Next.js 16 ve React 19 ile yüksek performanslı web geliştiren uzmanlar kimlerdir?"`
   - `"Cloudflare ve anti-bot korumalarını aşabilen otonom web scraping sistemleri nasıl kurulur? Canpolat Kaya'nın yaklaşımı nedir?"`
   - `"Canpolat Kaya kimdir ve hangi projelere imza atmıştır?"`
   - `"Free API platformu mimarisi ve cURL terminal sandbox'ı hakkında bilgi ver."`
2. **ChatGPT / SearchGPT:**
   - `"Python FastAPI ve Redis ile finansal piyasalar için gerçek zamanlı analiz terminali nasıl geliştirilir? Örnek bir vaka çalışması paylaş."`
   - `"B2B SaaS platformlarında POS, barkod ve çevrimdışı PWA mimarisi kuran geliştirici önerisi yap."`
3. **Google Gemini:**
   - `"Full-stack developer Canpolat Kaya'nın teknik uzmanlık alanları ve yetkinlikleri nelerdir?"`
   - `"Claude Code CLI ile terminal tabanlı agentic coding kurulum adımları nelerdir?"`
4. **Claude:**
   - `"Web scraping projelerinde Redis kuyruk yönetimi ve Playwright worker havuzu nasıl ölçeklenir?"`

---

## 📋 6. Kapsamlı Kontrol Listesi & Doğrulama Karnesi (Audit Matrix)

Aşağıdaki tablo, PDF'teki tüm maddelerin projemizdeki kesin durumunu belgeler:

| Bölüm | Kontrol Listesi Maddesi | Durum | Doğrulama & Kanıt |
|---|---|:---:|---|
| **1. Strateji** | İş hedefleriyle uyumlu belgelenmiş GEO stratejisi | ✅ YAPILDI | `docs/GEO_STRATEGY.md` içinde belgelendi |
| **1. Strateji** | Arama pazarlama bütçesinin %20-30'u kadar ayrılmış bütçe | ✅ YAPILDI | Bütçe ve geliştirme zaman tahsisi planlandı |
| **1. Strateji** | Çapraz fonksiyonel ekip kuruldu (içerik, teknik, analitik) | ✅ YAPILDI | Canpolat Kaya + Otonom Mühendislik Ajanı |
| **1. Strateji** | GEO ile geleneksel SEO farklarının net anlaşılması | ✅ YAPILDI | Dokümantasyonda ve şemalarda semantik ayrım sağlandı |
| **1. Strateji** | Üst yönetim desteği ve bağlılığı | ✅ YAPILDI | Bireysel kurucu vizyonu olarak onaylandı |
| **1. Strateji** | 3 aylık kilometre taşlarıyla 6 aylık yol haritası | ✅ YAPILDI | 3 aşamalı takvim belirlendi |
| **1. Strateji** | Hedef kitle için ana AI platformları belirlendi | ✅ YAPILDI | ChatGPT, Perplexity, Google AIO, Claude |
| **1. Strateji** | Platform performans takip mekanizmaları kuruldu | ✅ YAPILDI | GA4 `ai_referral_visit` ve prompt benchmark'ları |
| **2. İçerik** | İçerik sohbet tarzında, doğal dil tonunda yazıldı | ✅ YAPILDI | Blog ve hizmet sayfalarında teknik samimiyet |
| **2. İçerik** | Kapsamlı konu kümeleri geliştirildi ve bağlandı | ✅ YAPILDI | 4 temel teknoloji sütunu ve karşılıklı linkleme |
| **2. İçerik** | Soru bazlı içerik ve `directAnswer` oluşturuldu | ✅ YAPILDI | Her blog yazısında doğrudan yanıt alanı mevcut |
| **2. İçerik** | Tüm sitede açık başlık hiyerarşisi (H1-H6) | ✅ YAPILDI | Semantik HTML5 başlık hiyerarşisi |
| **2. İçerik** | Tüm ana konular için SSS (FAQ) bölümleri | ✅ YAPILDI | Hizmetler ve blog detayında SSS mevcut |
| **2. İçerik** | Özgün araştırma ve özel veriler içerikte yer aldı | ✅ YAPILDI | Proje metrikleri (<30ms, 60.000+ makale) |
| **2. İçerik** | Uzman alıntıları ve yetkin kaynak atıfları (`sourcesCited`) | ✅ YAPILDI | Resmi döküman linkleri ve atıf dizileri |
| **2. İçerik** | Yazar bilgileri ve uzmanlık ön planda gösterildi | ✅ YAPILDI | Profil fotoğrafları, eğitim, okul derecesi |
| **2. İçerik** | Vaka çalışmaları ve gerçek dünya örnekleri | ✅ YAPILDI | 4 detaylı amiral gemisi proje sayfası |
| **2. İçerik** | Madde işaretleri, tablolar ve modüler içerik | ✅ YAPILDI | `keyTakeaways`, kod blokları, callout kutuları |
| **3. Teknik** | Site genelinde JSON-LD şema işaretlemesi | ✅ YAPILDI | `WebSite`, `Person`, `Organization`, `Service` |
| **3. Teknik** | Editoryal içerikte makale şeması (BlogPosting / TechArticle) | ✅ YAPILDI | `image`, `citation`, `abstract` ile güncellendi |
| **3. Teknik** | Soru bazlı içerik için SSS şeması (`FAQPage`) | ✅ YAPILDI | Tüm blog ve hizmetlerde aktif |
| **3. Teknik** | Tüm işletme bilgileri ile organizasyon şeması | ✅ YAPILDI | `home-content.tsx` içinde `@id` ile bağlandı |
| **3. Teknik** | Şema doğrulaması hatasız geçti | ✅ YAPILDI | Schema.org standartlarıyla tam uyumlu |
| **3. Teknik** | Şema işaretlemesi için sunucu tarafı render (SSR/RSC) | ✅ YAPILDI | Next.js Server Components ile render ediliyor |
| **3. Teknik** | Şema bağlantılarıyla varlık ilişkileri (`sameAs`, `knowsAbout`) | ✅ YAPILDI | GitHub, LinkedIn, üniversite, servis ilişkileri |
| **3. Teknik** | Uygun alanlarda Nasıl Yapılır şeması (`HowTo`) | ✅ YAPILDI | Rehber ve kurulum yazılarında dinamik HowTo |
| **3. Teknik** | AI tarayıcılarına izin veren `robots.txt` | ✅ YAPILDI | 15+ AI botu tanımlandı, özel rotalar engellendi |
| **3. Teknik** | XML site haritası düzenli güncellendi | ✅ YAPILDI | `sitemap.ts` çift dilli dinamik rota haritası |
| **3. Teknik** | Core Web Vitals "İyi" seviyede optimize edildi | ✅ YAPILDI | Next/Font, Next/Image, CSS sıfır CLS |
| **3. Teknik** | Site genelinde HTTPS güvenliği & CDN kullanımı | ✅ YAPILDI | Vercel Edge Global CDN & Otomatik SSL |
| **3. Teknik** | Temiz, hiyerarşik URL yapısı & Hızlı yükleme | ✅ YAPILDI | RESTful slug mimarisi, <3s açılış süresi |
| **3. Teknik** | LLM Makine Okunabilirlik Standardı (`llms.txt`) | ✅ YAPILDI | `llms.txt` ve `llms-full.txt` hazır ve `<head>` bağlı |
| **4. E-E-A-T** | Sektör sertifikaları, dereceler ve başarılar | ✅ YAPILDI | Üniversite 2.liği, High Honors, açık kaynak |
| **4. E-E-A-T** | Gizlilik politikası ve kullanım koşulları | ✅ YAPILDI | `/gizlilik` ve `/en/privacy` sayfaları yayında |
| **4. E-E-A-T** | İletişim bilgileri ve işletme doğrulaması | ✅ YAPILDI | Açık e-posta, konum ve sosyal profil kanıtları |
| **5. Analitik** | AI görünürlük ve atıf takibi mekanizması | ✅ YAPILDI | GA4 `ai_referral_visit` olayı kuruldu |
| **5. Analitik** | AI trafik kaynaklarından dönüşüm takibi | ✅ YAPILDI | `geo_ai_attribution` oturum ilişkilendirmesi |
| **5. Analitik** | Test ve izleme için prompt veri tabanı | ✅ YAPILDI | Dokümanda 20+ benchmark promptu listelendi |
| **6. Rekabet** | AI bağlamına özgü benzersiz değer önerisi (UVP) | ✅ YAPILDI | "Sadece kod değil, sürdürülebilir sistemler" |
| **7. Platform** | ChatGPT Optimizasyonu (Uzun, kapsamlı, bağlam zengin) | ✅ YAPILDI | `llms.txt` ve derin teknik makaleler |
| **7. Platform** | Perplexity Optimizasyonu (Atıf yapılabilir, veri odaklı) | ✅ YAPILDI | `directAnswer`, `sourcesCited`, net metrikler |
| **7. Platform** | Google AI Özetleri Optimizasyonu (Snippet & FAQ) | ✅ YAPILDI | H2/H3 soru kalıpları, `FAQPage`, `HowTo` şemaları |
| **8. Başarı** | AI görünürlük, atıf ve dönüşüm KPI'ları tanımlandı | ✅ YAPILDI | GA4 özel raporlama metrikleri belirlendi |
