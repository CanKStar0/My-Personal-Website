import { Navbar } from "@/components/navbar";
import { notFound } from "next/navigation";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

const PROJECTS_DATA = [
  {
    slug: "haber-portali",
    title: "Haber Portalı",
    summary: "Bulut tabanlı otonom haber toplama motoru ve yüksek performanslı veri sunum (DaaS) platformu.",
    techStack: ["Next.js", "TypeScript", "Node.js", "axios", "cheerio", "Playwright", "node-cron", "helmet", "MongoDB", "Mongoose", "Redis", "GZIP", "FetchAPI", "Session Storage"],
    liveUrl: "https://haber-portali.up.railway.app/",
    githubUrl: "/gizli-repo",
    features: [
      {
        title: "Otonom Scraping Mimarisi",
        description: "Sunucu tarafında (server-side) çalışan, bulut ortamlarına tam entegre otonom web kazıma motoru. Kesintisiz veri akışı sağlarken IP engellemeleri ve zaman aşımı (timeout) gibi kronik sorunları aşmak için özel olarak tasarlandı.",
        imagePath: "/images/haber-1.png"
      },
      {
        title: "In-Memory Caching ile Sıfır Darboğaz",
        description: "Mükerrer URL'leri ve anlık trafik dalgalanmalarını veritabanına yansıtmadan sönümleyen bellek içi (in-memory) önbellekleme mekanizması. Veritabanı üzerindeki okuma/yazma yükünü ve darboğazları (bottleneck) ortadan kaldıran mühendislik çözümü.",
        imagePath: "/images/haber-2.png"
      },
      {
        title: "Maksimum Frontend Performansı",
        description: "Devasa metin ve medya içeriklerinin tarayıcıyı dondurmasını engellemek için uygulanan GZIP sıkıştırması ve Lazy Loading (tembel yükleme) stratejileri. Kullanıcı tarafında pürüzsüz ve sıfır gecikmeli bir okuma deneyimi.",
        imagePath: "/images/haber-3.png"
      },
      {
        title: "Data-as-a-Service (DaaS) Altyapısı",
        description: "Toplanan, temizlenen ve kategorize edilen binlerce satır güncel haber verisinin, istenilen başka bir platforma veya API'ye anında servis edilebileceği, ölçeklenebilir ve bağımsız veri mimarisi.",
        imagePath: "/images/haber-4.png"
      }
    ]
  },
  {
    slug: "bist-ai",
    title: "BIST AI",
    summary: "Milyonlarca finansal veriyi sıfır hatayla işleyen analiz sistemi.",
    coverImage: "/images/bist-ai-cover.png",
    problem: "Borsa İstanbul'daki şirketlerin anlık temel ve teknik analiz verilerinin, dağınık kaynaklardan çekilip saniyeler içinde işlenmesi gerekiyordu. Mevcut yapılar yavaş ve maliyetliydi.",
    solution: "Python ve FastAPI kullanarak yüksek performanslı bir veri hattı (pipeline) kurdum. Milyonlarca satır veri Redis ile önbelleğe alınarak sıfır gecikme ile frontend tarafına aktarıldı. Makine öğrenmesi algoritmaları ile trend tahminleri eklendi.",
    techStack: ["Python", "FastAPI", "Redis", "NodeJS", "NextJS", "React", "Playwright", "Recharts", "Supabase", "PostreSQL", "Docker", "Tailwind CSS "],
    liveUrl: "/canli-yok",
    githubUrl: "/gizli-repo",
    features: [
      {
        title: "Gelişmiş Analiz ve Karar Destek",
        description: "Borsa İstanbul verilerini yapay zeka ile analiz ederek rasyonel kararlar almanızı sağlayan detaylı Dashboard ekranı.",
        imagePath: "/images/bist-ai-1.png"
      },
      {
        title: "Akıllı Portföy Yönetimi",
        description: "Varlıklarınızın sektörel dağılımını, yapay zeka sağlık skorunu ve risk oranlarını tek bir ekrandan yönetin.",
        imagePath: "/images/bist-ai-2.png"
      },
      {
        title: "Teknik ve Temel Analiz Birleşimi",
        description: "Hisse senedi özelinde hedef fiyat, stop-loss ve RSI momentum değerlerini içeren kapsamlı finansal bültenler.",
        imagePath: "/images/bist-ai-3.png"
      },
      {
        title: "Şeffaf Fiyatlandırma Modeli",
        description: "Farklı yatırımcı profillerine uygun, gizli ücret içermeyen bireysel ve kurumsal abonelik paketleri.",
        imagePath: "/images/bist-ai-4.png"
      }
    ]
  }
];

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjeDetayPage({ params }: PageProps) {
  const { slug } = await params;

  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background pt-12 pb-32">

        {/* Back Link */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <Link href="/projeler" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Tüm Projelere Dön
          </Link>
        </div>

        {/* Hero Section */}
        <ScrollReveal className="max-w-4xl mx-auto px-6 text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-jakarta text-foreground mb-4 leading-tight">
            {project.title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground/80 font-light font-sans max-w-2xl mx-auto leading-relaxed">
            {project.summary}
          </p>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto px-6 space-y-16">

          {/* Adım 1 ve 2 Kaldırıldı */}

          {/* Özellikler ve Görseller (Alternatif Düzen) */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-32 py-10 max-w-6xl mx-auto">
              {project.features.map((feature, index) => {
                const isEven = index % 2 === 0; // Çift indeksler: Görsel Solda, Metin Sağda
                return (
                  <ScrollReveal key={index} className={`flex flex-col lg:flex-row gap-16 lg:gap-32 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>

                    {/* Görsel Sütunu */}
                    <div className="w-full lg:w-[60%] flex items-center justify-center">
                      <img
                        src={feature.imagePath}
                        alt={feature.title}
                        className="w-full h-auto rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-zinc-200/40 dark:border-zinc-800/50"
                        style={{ objectFit: "contain" }}
                      />
                    </div>

                    {/* Metin Sütunu */}
                    <div className="w-full lg:w-[40%] flex flex-col justify-center text-left">
                      <span className="text-zinc-500 font-mono text-sm tracking-widest block mb-2">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold font-jakarta text-foreground mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                        {feature.description}
                      </p>
                    </div>

                  </ScrollReveal>
                );
              })}
            </div>
          )}

          {/* Teknoloji Yığını */}
          <ScrollReveal>
            <h2 className="text-xl font-bold font-jakarta text-foreground mb-6">Kullanılan Teknolojiler</h2>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-zinc-100 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-800/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* Action Links */}
          <ScrollReveal className="pt-12 border-t border-zinc-200/40 dark:border-zinc-800/40 flex flex-wrap gap-4">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target={project.liveUrl.startsWith("http") ? "_blank" : undefined}
                rel={project.liveUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors"
              >
                Canlı Proje <ExternalLink className="w-4 h-4" />
              </Link>
            )}
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target={project.githubUrl.startsWith("http") ? "_blank" : undefined}
                rel={project.githubUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 text-foreground font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                GitHub Repo <GithubIcon className="w-4 h-4" />
              </Link>
            )}
          </ScrollReveal>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/10 bg-background/50">
        <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 flex items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Canpolat Kaya. Tüm Hakları Saklıdır.</p>

        </div>
      </footer>
    </>
  );
}
