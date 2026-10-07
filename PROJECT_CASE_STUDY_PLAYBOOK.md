# 🛸 Universal Project Onboarding SOP (Evrensel Proje Ekleme Kılavuzu)

> **Bu Dosyanın Amacı:** Canpolat Kaya yeni bir proje verip *"Kral ben şu projeyi yaptım (dosya yolu, canlı URL veya repo burada), `PROJECT_CASE_STUDY_PLAYBOOK.md` kılavuzunu takip et ve projeyi siteye ekle"* dediğinde, yapay zekânın **sıfır tahmin ve sıfır soruyla** baştan sona eksiksiz bir vaka analizi ve portfolyo vitrini üretmesini sağlayan standart operasyon prosedürüdür (SOP).

---

## ⚡ 1. Modern Anlatım Sözleşmesi (Tone & Positioning)

Portfolyodaki projeler bir yazılımcının "ödevi" gibi değil; **"Yapay zekâ ve otonom sistemleri işin merkezine koyan kıdemli bir sistem mimarının eseri"** gibi anlatılır.

- **Yasaklı Dil (Eski Usul / Amelelik):** 
  - *"Array.filter yerine SQLite B-tree kullandık...", "for döngüsünden kaçındık...", "PHP ve CSS ile güzel bir tema yaptık..."* (Eski, akademik, gereksiz mikro kod ameleliği).
- **Zorunlu Dil (Yeni Nesil / AI & Otonom Mimar):** 
  - *"İnsan eforunu sıfırlayan otonom AI boru hatları..."*
  - *"DeepL / LLM destekli anlık çok dilli içerik motoru..."*
  - *"Dağınık dış verileri sıfır gecikmeyle toplayıp kendi kendine eşleyen otonom kazıma mimarisi..."*
  - *"Sıfır hata ve kesintisiz ödeme/satış sağlayan deterministik altyapı..."*

---

## 🛠️ 2. Bir Projeyi Alınca Otomatik İzlenecek 5 Aşamalı Hat (Pipeline)

Canpolat bir proje verdiğinde AI sırasıyla şu 5 aşamayı tek başına yürütür:

```
┌────────────────────────────────────────────────────────────────────────┐
│               OTOMATİK PROJE EKLEME AKIŞI (PIPELINE)                   │
├────────────────────────────────────────────────────────────────────────┤
│ Aşama 1: Proje Röntgeni (Codebase & Live Scan)                         │
│ Aşama 2: Vaka Analizi Verisini Üretme (Sözleşmeye Uygun JSON Modeli)   │
│ Aşama 3: Ekran Görüntüleri & Görsel Varlık Üretimi (Public Assets)     │
│ Aşama 4: Kod Entegrasyonu (4 Temel Dosyaya Enjeksiyon)                 │
│ Aşama 5: Tip, Lint ve Derleme Doğrulaması (Build Verification)         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🧩 3. Veri Sözleşmesi (Data Contract & Şablon)

Her proje sitedeki şu 5 bileşeni eksiksiz doldurmak zorundadır:

### A. Temel Bilgiler & Özet
- **Slug:** URL dostu benzersiz kimlik (örn. `fethiyespor`, `mybusinessboss`).
- **Başlık (TR/EN):** İddialı, vurucu başlık.
- **Kısa Özet (TR/EN):** Projenin işe yararlılığını ve AI/otonom gücünü vurgulayan 2 cümle.
- **Tech Stack:** 8-12 adet modern etiket (örn. `PHP MVC`, `Tailwind CSS v4`, `DeepL AI Engine`, `İyzico Gateway`, `Autonomous Scraper`).
- **Bağlantılar:** `liveUrl` (varsa URL, yoksa `/canli-yok`), `githubUrl` (varsa repo, gizliyse `/gizli-repo`).
- **İlgili Hizmetler (Related Services):** Projenin sunduğu 2 adet site içi hizmet linki (örn. `/hizmetler/ozel-yazilim-gelistirme`).

### B. 5 Büyük Mühendislik Metriği (`metrics`)
Her projede tam 5 adet büyük sayı/oran olmalıdır:
1. **Otonomluk / AI Oranı:** Örn. `%100 Otonom Senkronizasyon` veya `500+ AI Endpoint`
2. **Hız & Yanıt Süresi:** Örn. `<30 ms TTFB` veya `<50 ms Ters Arama`
3. **Ölçek / Veri Hacmi:** Örn. `60.000+ Zengin İçerik` veya `10+ Entegre Modül`
4. **Güvenlik & Sıfır Hata:** Örn. `0 Veri Kaybı (ACID)` veya `%100 3D Secure Tahsilat`
5. **Global Erişim / Dil:** Örn. `2 Dil (AI Çeviri)` veya `3 Dil Paritesi`

### C. 5 Adımlı Uçtan Uca Mimari Akışı (`architectureSteps`)
Verinin girişinden son kullanıcıya ulaşmasına kadar 5 mantıksal adım:
- **01 - Giriş / Toplama (Ingestion / Scraping / Input):** Veri nereden geliyor?
- **02 - Güvenlik & Normalizasyon (Sanitization / Guard):** Veri nasıl temizleniyor?
- **03 - Çekirdek & AI / İş Mantığı (Core Engine & AI):** Yapay zekâ veya sistem motoru neyi hesaplıyor?
- **04 - Saklama & Önbellekleme (Storage & Caching):** Veri nerede ve nasıl saklanıyor?
- **05 - Canlı Arayüz & Uçbirim Sunumu (Delivery & Reactive UI):** Kullanıcı ekranına nasıl yansıyor?

### D. 3-4 Vurucu Savaş Hikayesi (`warStories`)
Her hikaye katı bir 3'lü formatta yazılır:
- **Başlık & Alt Başlık:** Merak uyandıran, teknik başarı içeren başlık.
- **Problem:** Eski usulde veya ilk aşamada yaşanan tıkanıklık, veri kargaşası, yavaşlık veya insan eforu maliyeti.
- **Çözüm:** AI motoru, otonom kuyruk veya akıllı mimari kararla sorunun nasıl kökten çözüldüğü.
- **Etki / Sonuç:** Somut kazanım, hız artışı, maliyet düşüşü veya sıfır hata güvencesi.

### E. 4 Öne Çıkan Özellik Kartı (`features`)
Proje detay sayfasında sergilenen 4 kritik ekran/özellik:
- **01 - Başlık, Açıklama (TR/EN), Görsel**
- **02 - Başlık, Açıklama (TR/EN), Görsel**
- **03 - Başlık, Açıklama (TR/EN), Görsel**
- **04 - Başlık, Açıklama (TR/EN), Görsel**

---

## 📸 4. Ekran Görüntüleri & Görsel Varlık Standartları

Her yeni proje için `public/images/` dizini altına şu dosyalar hazırlanmalıdır:

```
public/images/
├── <slug>-cover.png        # Türkçe Vitrin Kapak Görseli (16:9 veya 1200x675)
├── <slug>-cover-en.png     # İngilizce Vitrin Kapak Görseli
├── <slug>-1.png            # Özellik 1 (TR)
├── <slug>-1-en.png         # Özellik 1 (EN)
├── <slug>-2.png            # Özellik 2 (TR)
├── <slug>-2-en.png         # Özellik 2 (EN)
├── <slug>-3.png            # Özellik 3 (TR)
├── <slug>-3-en.png         # Özellik 3 (EN)
├── <slug>-4.png            # Özellik 4 (TR)
└── <slug>-4-en.png         # Özellik 4 (EN)
```

### Ekran Görüntüsü Alma Yöntemi:
1. **Canlı Site Varsa:** Tarayıcı (Puppeteer / Playwright betiği veya browser aracı) üzerinden temiz, yüksek çözünürlüklü ekran görüntüleri alınır.
2. **Yerel Kaynak Kod Varsa:** Projenin ilgili view/arayüz dosyalarından veya yerel sunucudan kritik dashboard, checkout, maç merkezi veya form ekranları taranıp görselleştirilir.
3. **Placeholder Yasaktır:** Görseller gerçek arayüzü yansıtmalı, net ve temiz olmalıdır.

---

## 📂 5. Güncellenecek Kod Dosyaları Listesi (Code Injection Points)

Yeni bir proje eklendiğinde AI şu 4 dosyayı günceller:

### 1. `src/lib/translations.ts`
`translations.projects` altına yeni projenin başlık ve özet anahtarları eklenir:
```typescript
<slug>Title: {
  tr: "...",
  en: "..."
},
<slug>Desc: {
  tr: "...",
  en: "..."
},
```

### 2. `src/components/projects-section.tsx`
`projects` dizisine yeni proje objesi eklenir:
```typescript
{
  titleKey: translations.projects.<slug>Title,
  descriptionKey: translations.projects.<slug>Desc,
  technologies: ["Tech 1", "Tech 2", ...],
  slug: "<slug>",
  imagePath: {
    tr: "/images/<slug>-cover.png",
    en: "/images/<slug>-cover-en.png",
  },
}
```

### 3. `src/components/project-engineering-case-study.tsx`
`<SLUG>_ENGINEERING_DATA: EngineeringCaseStudyData` objesi oluşturulur (5 Metrics, 5 Architecture Steps, 3-4 War Stories).

### 4. `src/app/projeler/[slug]/page.tsx`
- Dosya başındaki import listesine yeni oluşturulan `<SLUG>_ENGINEERING_DATA` eklenir.
- `PROJECTS_DATA: Record<string, ProjectData>` haritasına yeni projenin tüm detayları (`features`, `caseStudy`, `techStack`, `relatedServices`) eklenir.
- `engineeringDataMap` içine `<slug>: <SLUG>_ENGINEERING_DATA` atanır.

---

## ✅ 6. Otomatik Doğrulama & Kontrol Kapısı (Verification Gates)

Tüm kod ve görseller eklendikten sonra şu komutlar çalıştırılmalı ve sıfır hata onaylanmalıdır:

```bash
# 1. Kod Kalitesi & Lint Denetimi
npm run lint

# 2. Tip Güvenliği & Üretim Derleme Denetimi
npm run build
```

Eğer derleme hatası, eksik i18n çevirisi veya kırık görsel bağlantısı varsa anında otonom olarak düzeltilir.

---

## 🎯 Özet Talimat (AI İçin Çalışma Prensibi)

Kullanıcı sana:
> *"Kral ben [X Projesini] yaptım, [bağlantı/klasör] burada. `PROJECT_CASE_STUDY_PLAYBOOK.md`ye göre siteye ekle"*

dediğinde:
1. Bu kılavuzdaki **Veri Sözleşmesini** al.
2. Verilen projeyi tara; AI, otonomluk, hız ve iş değerini öne çıkaran 5 Metrik, 5 Adımlı Mimari ve 3-4 Savaş Hikayesini hazırla.
3. Ekran görüntülerini üret ve `public/images/` altına koy.
4. İlgili 4 koda enjeksiyonu yap.
5. `npm run build` ile doğrula ve bitir!
