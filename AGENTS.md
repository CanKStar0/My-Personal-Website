# Developer Instructions (Proje Geliştirici & AI Anayasası)

<!-- DCM_GLOBAL_GUIDELINES_ROOT: C:\Users\canpo\OneDrive\Desktop\GUIDELINES -->

<!-- BEGIN:nextjs-agent-rules -->
> ⚠️ **Next.js 16 & React 19 Breaking Changes:**
> Bu projede Next.js 16 (App Router) ve React 19 kullanılmaktadır. API'lar, async request parametreleri ve component hiyerarşisi eski sürümlerden farklıdır. `use client` sınırlarına ve Server/Client component ayrımına dikkat ediniz.
<!-- END:nextjs-agent-rules -->

## 📌 Kapsam & Proje Tanımı
- **Proje:** Canpolat Kaya — Personal Portfolio & Technical Showcase
- **Kök Dizin:** `c:\Users\canpo\OneDrive\Desktop\Personal Website`
- **Proje Amacı:** Canpolat Kaya'nın özel yazılım geliştirme, web scraping, yapay zeka otomasyonu, API mimarisi ve Next.js projelerini sergilediği iki dilli (Türkçe & İngilizce), yüksek performanslı, modern portfolyo ve teknik blog platformu.

---

## 🏛️ Merkezi DCM Yetenek & Kural Referansı (SSOT)

Bu projede çalışırken tüm temel kurallar ve uzmanlıklar aşağıdaki merkezi kütüphaneden okunur. Proje içinde gereksiz yerel skill klasörleri (.codex, .agents/skills vb.) barındırılmaz.

- **Merkezi Anayasa:** `C:\Users\canpo\OneDrive\Desktop\GUIDELINES\MASTER_AGENT_CONSTITUTION.md`
- **Global Yetenekler:** `C:\Users\canpo\OneDrive\Desktop\GUIDELINES\skills\`

### Proje İhtiyacına Göre Devreye Alınacak Başlıca Global Yetenekler:
- **👑 Yetenek Dağıtımı & Orkestrasyon** ➔ `C:\Users\canpo\OneDrive\Desktop\GUIDELINES\skills\skill-router\SKILL.md`
- **🎨 Frontend & Modern UI/UX** ➔ `C:\Users\canpo\OneDrive\Desktop\GUIDELINES\skills\frontend-design-master\SKILL.md`
- **🔍 Teknik SEO & JSON-LD & OG Görselleri** ➔ `C:\Users\canpo\OneDrive\Desktop\GUIDELINES\skills\seo-specialist\SKILL.md`
- **🌍 Çoklu Dil (i18n) & Çeviri Eşitliği** ➔ `C:\Users\canpo\OneDrive\Desktop\GUIDELINES\skills\i18n-sync-validator\SKILL.md`
- **📈 CRO, Analitik (GA4) & İkna Edici İçerik** ➔ `C:\Users\canpo\OneDrive\Desktop\GUIDELINES\skills\marketing-growth-strategist\SKILL.md`
- **🛡️ Güvenlik Denetimi & OWASP** ➔ `C:\Users\canpo\OneDrive\Desktop\GUIDELINES\skills\security-auditor\SKILL.md`
- **👁️ Görsel Denetim & Web App QA** ➔ `C:\Users\canpo\OneDrive\Desktop\GUIDELINES\skills\web-app-audit\SKILL.md`
- **🚀 Sıfır Tahmin & Doğrulama Standartları** ➔ `C:\Users\canpo\OneDrive\Desktop\GUIDELINES\skills\superpowers\SKILL.md`
- **🧠 Hermes Hata Belleği** ➔ `C:\Users\canpo\OneDrive\Desktop\GUIDELINES\skills\hermes-agent\SKILL.md`

---

## 🛠️ Doğrulanmış Teknoloji Yığını (Tech Stack)

- **Dil / Çalışma Zamanı:** TypeScript 5, Node.js (>= 18)
- **Framework / Platform:** Next.js 16 (App Router), React 19
- **UI & Stil:** Tailwind CSS v4, Framer Motion, next-themes (Dark/Light), Lucide React, Sonner (Toast bildirimleri)
- **Çoklu Dil (i18n):** Özel URL tabanlı yerelleştirme (`/` [TR], `/en` [EN]), `src/lib/translations.ts`, `src/lib/blog-en.ts`, `src/lib/services-en.ts`
- **SEO & Metadata:** Next.js Metadata API, `ImageResponse` (Dinamik OpenGraph/Twitter kartları), Schema.org JSON-LD, `sitemap.ts`, `robots.ts`
- **Analitik:** Google Analytics 4 entegrasyonu (`src/lib/analytics.ts`, `analytics-tracker.tsx`)
- **Paket & Derleme:** npm, Next.js Compiler
- **Linter & Test Araçları:** ESLint 9 (`eslint-config-next`), Puppeteer-core

---

## 🔒 Güvenlik & Mimari Kuralları

- **Next.js 16 & React 19 Uyum:** `use client` direktifini yalnızca browser API'ları, state ve event handler gerektiren componentlerde kullanın. Server component avantajlarını (SEO, bundle boyutu) koruyun.
- **i18n Paritesi & Rota Tutarlılığı:** Türkçe ve İngilizce rotalar arasındaki slug eşleşmelerini ve içerik eşitliğini koruyun. Hardcoded metin yerine `src/lib/translations.ts` yapısını kullanın.
- **Noindex & Gizlilik:** Özel repo (`/gizli-repo`) ve canlı demosu olmayan (`/canli-yok`) durum sayfaları `noindex` kalmalı ve sitemap'e eklenmemelidir.
- **Hassas Veri Güvenliği:** Gizli anahtarları ve token'ları asla kaynak koda veya loglara yazmayın; `.env.local` kullanın.
- **Sıfır Çöplük Politikası:** Proje kökünde `.codex/` veya `.agents/skills/` gibi yerel kopyalar oluşturmayın; tüm kurallar merkezi `C:\Users\canpo\OneDrive\Desktop\GUIDELINES` üzerinden referans alınır.

---

## ⚡ Doğrulama Komutları (Verification Commands)

Yapılan değişikliklerden sonra çalıştırılacak ampirik test ve build komutları:

```bash
# Kod kalite ve lint kontrolü
npm run lint

# Tip ve üretim derleme kontrolü
npm run build

# Yerel geliştirme ortamı (http://localhost:3000)
npm run dev
```

