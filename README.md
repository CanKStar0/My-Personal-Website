# Canpolat Kaya - Kişisel Portfolio 🌌

Sinematik, gizemli ve yüksek estetikli bir kişisel portfolio websitesi. Interstellar filminden ilham alan açılış animasyonu ve gaming tarzı başarım sistemi ile benzersiz bir kullanıcı deneyimi sunar.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)

## 🚀 Teknolojiler

- **Framework:** Next.js 14 (App Router)
- **Dil:** TypeScript
- **Stil:** Tailwind CSS + Özel CSS Animasyonları
- **Canvas:** Canvas API (2D) - Yıldız alanı, kozmik gözler
- **State Yönetimi:** Zustand (localStorage persist)
- **Ses:** Web Audio API (başarım sesleri)

## ✨ Özellikler

### 🎬 Açılış Sekansı (Interstellar Tarzı)
- Warp speed yıldız alanı efekti
- Harflerin tek tek belirmesi ("C-a-n-p-o-l-a-t K-a-y-a")
- Sinematik üst/alt çerçeve
- Glow efektli geçiş animasyonu
- "Full Stack Developer" alt yazısı

### 🏠 Ana Sayfa
- Dinamik yıldız arka planı (nebula efekti)
- Gizemli kozmik gözler (kullanıcıyı takip eder)
- Sosyal medya linkleri (GitHub, LinkedIn, Email)
- 3 ana bölüm: Hakkımda, Teknolojiler, Projeler

### 💻 Teknolojiler Bölümü
- **Backend:** Node.js, PHP, Laravel, MySQL, MongoDB, Redis
- **Frontend:** React, Next.js, TypeScript, Bootstrap, Three.js, GSAP
- **Araçlar:** Git, Docker, AWS, Railway, VS Code
- Hover efektleri ve Türkçe açıklamalar
- Teknoloji takip sistemi (başarım için)

### 🚀 Projeler Bölümü
- **Haber Portalı API Showcase** - RESTful API tasarımı
- **Akakçe Scraper** - E-ticaret fiyat karşılaştırma aracı
- **Cosmic Explorer** - İnteraktif uzay keşfi deneyimi
- Detaylı proje açıklamaları ve kullanılan teknolojiler

### 👤 Hakkımda Bölümü
- Profil bilgileri ve hikaye
- Animasyonlu paragraflar
- Zaman takip sistemi (başarım için)

## 🏆 Başarım Sistemi (Achievement System)

7 farklı başarım ile gamification deneyimi:

| Başarım | İkon | Açıklama | Nasıl Açılır |
|---------|------|----------|--------------|
| İlk Temas | 🔭 | Siteye ilk giriş | Otomatik |
| Kod Avcısı | 🐛 | Geliştirici konsolunu açtın | F12 / DevTools |
| Hızlı Okuyucu | 📖 | Hakkımda'da 1 dakika | Bölümde bekle |
| Tam Teşhis | 🔧 | Tüm teknolojileri inceldin | Hover yap |
| Arşiv Uzmanı | 🌀 | 3 projenin detayına baktın | Projeleri tıkla |
| Kral Modu | 👑 | Gizli kodu girdin | Konami Code |
| Gezgin | 🚀 | Tüm dış linklere tıkladın | GitHub + LinkedIn |

### Başarım Özellikleri
- 🔊 Level up ses efekti (Web Audio API)
- 🎨 Altın temalı bildirim animasyonu
- 💾 LocalStorage ile kalıcı kayıt
- 🏆 Başarım paneli (sağ üst köşe)

## 🎭 Easter Eggs

### Bölüm Dönüş Mesajları
Her bölümden ana sayfaya döndüğünüzde:
- **Hakkımda →** "Hikayem bu şekildeydi..." (Mor tema)
- **Teknolojiler →** "Yeterli mi?" (Cyan tema)
- **Projeler →** "Beğendin mi?" (Amber tema)

### Ekran Sarsılması
Bölümlerden dönüşte ve Konami Code girildiğinde ekran titrer.

### Konami Code
`↑ ↑ ↓ ↓ ← → ← → B A` tuşlarını sırayla basarak "Kral Modu" başarımını açın!

### DevTools Tepkisi
- Console'da özel mesaj: "Kodlar mı lazımdı?"
- Gözler alert moduna geçer
- Ekran titreşimi efekti

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Production'ı çalıştır
npm start
```

## 🌐 Dağıtım

Vercel üzerinde barındırılmak üzere optimize edilmiştir:

```bash
# Vercel CLI ile dağıtım
npx vercel
```

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── globals.css           # Global stiller ve animasyonlar
│   ├── layout.tsx            # Ana layout
│   └── page.tsx              # Ana sayfa
├── components/
│   ├── IntroSequence.tsx     # Interstellar tarzı açılış animasyonu
│   ├── HomePage.tsx          # Ana sayfa içeriği
│   ├── StarField.tsx         # Dinamik yıldız arka planı
│   ├── CosmicEyes.tsx        # Gizemli takip eden gözler
│   ├── TechnologiesSection.tsx    # Teknolojiler bölümü
│   ├── ProjectsSection.tsx        # Projeler bölümü
│   ├── AboutSection.tsx           # Hakkımda bölümü
│   ├── DevToolsDetector.tsx       # DevTools algılama
│   ├── AchievementPanel.tsx       # Başarım paneli UI
│   ├── AchievementNotification.tsx     # Easter egg bildirimleri
│   └── AchievementUnlockNotification.tsx  # Başarım açılış bildirimi + ses
└── store/
    └── index.ts              # Zustand store'ları (persist middleware)
```

## 🎨 Tema Renkleri

| Renk | Hex | Kullanım |
|------|-----|----------|
| Cosmic Black | `#000000` | Ana arka plan |
| Cosmic Dark | `#0a0a0f` | Panel arka planları |
| Cosmic Purple | `#1a1a2e` | Kartlar, vurgular |
| Cosmic Blue | `#16213e` | Gradientler |
| Cosmic Accent | `#4a90a4` | Ana vurgu rengi |
| Cosmic Light | `#e8e8e8` | Metin |
| Cosmic Gold | `#c9a227` | Başarımlar |

## 🔧 Özelleştirme

### Kişisel Bilgileri Değiştirme
`src/components/HomePage.tsx` dosyasında:
```typescript
const socialLinks = {
  github: 'https://github.com/YOUR_USERNAME',
  linkedin: 'https://linkedin.com/in/YOUR_USERNAME',
  email: 'your@email.com',
};
```

### Projeleri Düzenleme
`src/components/ProjectsSection.tsx` dosyasındaki `projects` dizisini düzenleyin.

### Teknolojileri Düzenleme
`src/components/TechnologiesSection.tsx` dosyasındaki `techGroups` dizisini düzenleyin.

## 📱 Responsive Tasarım

- ✅ Mobil (< 640px)
- ✅ Tablet (640px - 1024px)
- ✅ Desktop (> 1024px)

## 📄 Lisans

MIT License

---

<p align="center">
  Canpolat Kaya tarafından 🌌 ile geliştirildi
  <br>
  <sub>Interstellar'dan ilham alınmıştır</sub>
</p>
