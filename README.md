# Canpolat Kaya — Personal Portfolio

> A premium, performant personal portfolio built with Next.js 16, React 19, and Tailwind CSS v4. Features a "Crimson-Noir" design system, full TR/EN i18n, dark/light theming, and Google Analytics integration.

**Live:** [canpolatkaya.com](https://canpolatkaya.com)

---

## Tech Stack

### Core Framework
| Technology | Version | Role |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.2.10 | App Router, SSR, file-based routing, metadata API |
| [React](https://react.dev) | 19.2.4 | UI rendering, client components |
| [TypeScript](https://www.typescriptlang.org) | ^5 | Static typing across the entire codebase |

### Styling
| Technology | Version | Role |
|---|---|---|
| [Tailwind CSS](https://tailwindcss.com) | ^4 | Utility-first styling via `@theme` CSS custom properties |
| [PostCSS](https://postcss.org) | — | Tailwind compilation pipeline |
| CSS Custom Properties | — | Design token system (`--brand-red`, `--background`, etc.) |

### UI & Animation
| Technology | Version | Role |
|---|---|---|
| [Framer Motion](https://www.framer.com/motion/) | ^12 | Hero letter stagger, scroll-linked animations, layout transitions |
| [Lucide React](https://lucide.dev) | ^1.24 | Icon system (Star, Mail, ArrowLeft, etc.) |
| [next-themes](https://github.com/pacocoursey/next-themes) | ^0.4.6 | Flicker-free dark/light mode with `ThemeProvider` |
| [Sonner](https://sonner.emilkowal.ski) | ^2.0.7 | Toast notifications (email copy confirmation) |

### Fonts
| Font | Usage |
|---|---|
| [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) | Headings, brand name (`font-jakarta`) |
| [Inter](https://fonts.google.com/specimen/Inter) | Body text, UI elements (`font-sans`) |

### Analytics & SEO
- **Google Analytics 4** (tag `G-JLWJFQ732B`) via `next/script` with `afterInteractive` strategy
- Custom `trackEvent()` helper for granular event tracking (CTA clicks, email copies, project link clicks)
- **Next.js Metadata API** — dynamic `<title>` templates, OpenGraph, Twitter Card tags
- `sitemap.ts` — auto-generated XML sitemap for `/`, `/projeler`, `/iletisim`
- `robots.ts` — crawl directives for search engine bots

### External APIs
- **GitHub REST API** (`/users/CanKStar0/repos`) — fetched client-side with `AbortController`, displays top 4 non-forked repos sorted by stars

---

## Architecture

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout: fonts, ThemeProvider, LanguageProvider, GA
│   ├── template.tsx              # Route-level transition wrapper
│   ├── page.tsx                  # Home page (/, with ?scrollTo= deep-link logic)
│   ├── globals.css               # Design tokens + Tailwind v4 @theme block
│   ├── sitemap.ts                # Dynamic XML sitemap
│   ├── robots.ts                 # robots.txt rules
│   ├── iletisim/
│   │   └── page.tsx              # Contact page — email copy with Sonner toast
│   ├── projeler/
│   │   ├── page.tsx              # Projects listing — GitHub repos + featured projects
│   │   └── [slug]/
│   │       ├── layout.tsx        # Slug-level layout
│   │       └── page.tsx          # Dynamic project detail page
│   ├── canli-yok/                # "No live demo" placeholder route
│   └── gizli-repo/               # "Private repo" placeholder route
│
├── components/
│   ├── navbar.tsx                # Sticky navbar — scroll-aware styling, mobile drawer,
│   │                             #   ?scrollTo= cross-page deep-linking, TR/EN toggle
│   ├── hero-animation.tsx        # Hero section — Framer Motion letter stagger, glow FX
│   ├── bento-grid.tsx            # Skills/tools grid (#araclar section)
│   ├── manifesto-section.tsx     # About section (#hakkimda section)
│   ├── marquee-section.tsx       # Competencies ticker / marquee
│   ├── projects-section.tsx      # Featured project cards
│   ├── github-repos.tsx          # Live GitHub repos (client-side fetch, skeleton loader)
│   ├── scroll-reveal.tsx         # IntersectionObserver-based fade-in wrapper
│   ├── spotlight-button.tsx      # Magnetic spotlight hover CTA button
│   ├── language-context.tsx      # React Context — TR/EN locale state + t() helper
│   └── theme-provider.tsx        # next-themes wrapper
│
└── lib/
    ├── translations.ts           # Full TR/EN string map for all UI text
    └── analytics.ts              # trackEvent() wrapper around gtag()
```

---

## Key Features

### 🎨 "Crimson-Noir" Design System
A custom dual-mode design system defined entirely in CSS custom properties:
- **Light mode:** Off-white paper background (`#F9F9F6`), slate-dark text (`#1c1917`), noble crimson (`#9e0a2b`)
- **Dark mode:** Pure black (`#09090b`), clean white, brighter crimson (`#e11d48`)
- Tailwind v4 `@theme` block maps CSS vars to utility classes (`bg-brand-red`, `text-foreground`, etc.)

### 🌍 Bilingual (TR / EN) i18n
Custom i18n — no external library:
- `LanguageContext` provides `locale` state + `t(key)` helper globally
- All UI strings stored in `src/lib/translations.ts` as `{ tr: string; en: string }` objects
- Animated TR/EN toggle pill in the navbar uses Framer Motion `layout` spring transition
- `localStorage` persistence for user preference

### 🔗 Cross-Page Section Deep-Linking
Navbar "Hakkımda" and "Araçlar" links work correctly from any page:
- **Same page:** `scrollIntoView({ behavior: "smooth" })`
- **Different page:** Navigates to `/?scrollTo=sectionId`, homepage reads the param on mount and calls `scrollIntoView({ behavior: "instant" })`, then cleans the URL with `history.replaceState`

### ✨ Scroll-Reveal Animations
`<ScrollReveal>` wraps the native `IntersectionObserver` API — elements fade + slide in as they enter the viewport. Configurable `delay` prop for staggered grids. No external scroll library needed.

### 🔭 SpotlightButton
A "magnetic spotlight" CTA component: a radial gradient follows the mouse cursor across the button surface using `onMouseMove` + CSS `background` update. Supports both `href` (Link) and `onClick` modes.

### 📊 GitHub Repos (Live)
`GithubRepos` client component:
1. Fetches on mount with `AbortController` (cleans up on unmount)
2. Shows 4 skeleton pulse placeholders while loading
3. Filters forks, sorts by stars, shows top 4 public repos

### 📱 Mobile-First Navbar
- Scroll-aware: transparent → frosted glass (`backdrop-blur`) on scroll
- Animated entry: 2s delay on home page only, instant on other pages
- Full-screen drawer for mobile with slide-in animation
- All interactive elements use `useRouter` (no native `<a>` anchor conflicts with Framer Motion)

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# → http://localhost:3000

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

> **Node.js 18+** required.

---

## Project Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, Marquee, About (`#hakkimda`), Tools (`#araclar`) |
| `/projeler` | Projects — Featured cards + live GitHub repos |
| `/projeler/haber-portali` | News Portal project detail |
| `/projeler/bist-ai` | BIST AI Finance dashboard project detail |
| `/iletisim` | Contact — Click-to-copy email with toast |
| `/sitemap.xml` | Auto-generated by `sitemap.ts` |
| `/robots.txt` | Auto-generated by `robots.ts` |

---

## Featured Projects

### Haber Portalı
Automated news aggregator built with Next.js, Node.js, MongoDB, Redis, and Playwright. Scrapes, processes, and serves news articles with full-text search and session-based caching. Deployed on Railway.

**Stack:** Next.js · TypeScript · Node.js · MongoDB · Mongoose · Redis · Playwright · node-cron · axios · cheerio · helmet · GZIP

### BIST AI
Financial analytics dashboard for Borsa Istanbul. Integrates real-time data scraping, quantitative scoring, technical indicator generation, and interactive charting.

**Stack:** Python · FastAPI · Redis · Node.js · Next.js · React · Playwright · Recharts · Supabase · PostgreSQL · Docker · Tailwind CSS

---

## SEO Configuration

- **Metadata:** Title templates, descriptions, keywords in `layout.tsx`
- **OpenGraph:** `opengraph-image.jpg` (1200×630) auto-served by Next.js
- **Twitter Card:** `twitter-image.jpg` for `summary_large_image`
- **Sitemap:** `/sitemap.xml` — generated at request time by `sitemap.ts`
- **Robots:** `/robots.txt` — generated by `robots.ts`

---

## Author

**Canpolat Kaya** — Full-Stack Developer & Entrepreneur

- Website: [canpolatkaya.com](https://canpolatkaya.com)
- GitHub: [@CanKStar0](https://github.com/CanKStar0)
- LinkedIn: [canpolat-kaya](https://www.linkedin.com/in/canpolat-kaya/)
- Email: canpolatkaya4@gmail.com
