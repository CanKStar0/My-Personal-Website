# Canpolat Kaya — Personal Portfolio

Personal portfolio and technical showcase for Canpolat Kaya, a full-stack developer focused on custom software, web scraping, AI automation, API development, and Next.js applications.

Live site: [canpolatkaya.com](https://canpolatkaya.com)

## What this project includes

- Turkish and English routes with URL-based locale switching
- Service pages for custom software, web scraping, AI automation, APIs, and Next.js
- Technical blog and project case studies
- Responsive dark/light interface with Framer Motion transitions
- Dynamic Open Graph images for service and blog pages
- JSON-LD structured data, canonical URLs, hreflang alternates, sitemap, and robots rules
- Google Analytics 4 event tracking, enabled when a measurement ID is configured
- GitHub repository showcase with client-side loading and fallback content
- Interactive Splash Cursor effect on the home page

## Technology

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React
- next-themes
- Sonner
- Next.js Metadata API and `ImageResponse`

## Routes

| Area | Turkish | English |
| --- | --- | --- |
| Home | `/` | `/en` |
| About | `/hakkimda` | `/en/about` |
| Services | `/hizmetler` | `/en/services` |
| Projects | `/projeler` | `/en/projects` |
| Blog | `/blog` | `/en/blog` |
| Contact | `/iletisim` | `/en/contact` |

Individual service, project, and blog routes use their localized slugs. Private-repository and unavailable-demo pages are intentionally marked `noindex` and excluded from the sitemap.

## Local development

Requirements: Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful commands:

```bash
npm run lint       # ESLint
npm run build      # Production build
npm start          # Serve the production build
```

## Environment variables

Copy `.env.example` to `.env.local` when needed:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-search-console-token
```

Analytics scripts load only in production. Search Console verification is optional and should be set only with the token supplied by Google.

## SEO and indexing

The application exposes:

- `https://canpolatkaya.com/sitemap.xml`
- `https://canpolatkaya.com/robots.txt`
- Canonical and `tr` / `en` / `x-default` hreflang links
- Page-specific metadata and social images
- `Person`, `Service`, `Article`, `BlogPosting`, `CreativeWork`, and `BreadcrumbList` JSON-LD where relevant

The sitemap contains public, indexable pages only. After deployment, verify the domain in Google Search Console and submit the production sitemap URL.

## Project structure

```text
src/
├── app/           # Routes, metadata, sitemap, robots, and Open Graph handlers
├── components/    # Navigation, localized page sections, analytics, and effects
└── lib/           # Content models, translations, route pairs, SEO helpers, and site config
public/            # Static images and project assets
```

## Featured case studies

### News Portal

Automated news collection and delivery system using Next.js, Node.js, MongoDB, Redis, and Playwright. The case study documents collection, cleaning, caching, search, and delivery layers.

### BIST AI

Financial analytics dashboard using Python, FastAPI, Redis, Node.js, Next.js, Playwright, Supabase, PostgreSQL, Docker, and Tailwind CSS.

## Author

**Canpolat Kaya** — Full-Stack Developer

- Website: [canpolatkaya.com](https://canpolatkaya.com)
- GitHub: [@CanKStar0](https://github.com/CanKStar0)
- LinkedIn: [canpolat-kaya](https://www.linkedin.com/in/canpolat-kaya/)
- Email: [canpolatkaya4@gmail.com](mailto:canpolatkaya4@gmail.com)
