import { Navbar } from "@/components/navbar";
import { notFound } from "next/navigation";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

const PROJECTS_DATA = [
  {
    slug: "berber-otomasyonu",
    title: "Berber Otomasyonu",
    summary: "Telefon trafiğini bitiren, 7/24 otonom randevu ve müşteri yönetim sistemi.",
    problem: "Yerel esnaflar, özellikle berberler ve kuaförler, gün içinde sürekli çalan telefonlar yüzünden işlerine odaklanamıyor ve randevu çakışmaları yaşıyorlardı. Manuel defter tutma sistemi müşteri kayıplarına yol açıyordu.",
    solution: "Müşterilerin 7/24 online randevu alabildiği, boş saatleri otomatik hesaplayan ve WhatsApp üzerinden hatırlatma SMS'leri gönderen otonom bir sistem inşa ettim. Esnaf paneli sayesinde tüm dükkanın geliri ve müşteri istatistikleri tek ekrandan yönetilebilir hale geldi.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/CanKStar0",
  },
  {
    slug: "bist-ai",
    title: "BIST AI",
    summary: "Milyonlarca finansal veriyi sıfır hatayla işleyen analiz sistemi.",
    problem: "Borsa İstanbul'daki şirketlerin anlık temel ve teknik analiz verilerinin, dağınık kaynaklardan çekilip saniyeler içinde işlenmesi gerekiyordu. Mevcut yapılar yavaş ve maliyetliydi.",
    solution: "Python ve FastAPI kullanarak yüksek performanslı bir veri hattı (pipeline) kurdum. Milyonlarca satır veri Redis ile önbelleğe alınarak sıfır gecikme ile frontend tarafına aktarıldı. Makine öğrenmesi algoritmaları ile trend tahminleri eklendi.",
    techStack: ["Python", "FastAPI", "Redis", "PostgreSQL", "Docker", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/CanKStar0",
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
        <ScrollReveal className="max-w-4xl mx-auto px-6 text-center mb-24">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-jakarta text-foreground mb-6 leading-tight">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground/80 font-light font-sans max-w-2xl mx-auto leading-relaxed">
            {project.summary}
          </p>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto px-6 space-y-20">
          
          {/* Meydan Okuma (Problem) */}
          <ScrollReveal>
            <h2 className="text-2xl font-bold font-jakarta text-foreground mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red/10 text-brand-red text-sm font-bold">1</span>
              Meydan Okuma
            </h2>
            <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
              {project.problem}
            </p>
          </ScrollReveal>

          {/* Çözüm ve Mimari */}
          <ScrollReveal>
            <h2 className="text-2xl font-bold font-jakarta text-foreground mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red/10 text-brand-red text-sm font-bold">2</span>
              Mimari ve Çözüm
            </h2>
            <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
              {project.solution}
            </p>
          </ScrollReveal>

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
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors"
              >
                Canlı Proje <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 text-foreground font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                GitHub Repo <GithubIcon className="w-4 h-4" />
              </a>
            )}
          </ScrollReveal>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/10 bg-background/50">
        <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 flex items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Canpolat Kaya. Tüm Hakları Saklıdır.</p>
          <p>Next.js & Tailwind v4 ile geliştirilmiştir.</p>
        </div>
      </footer>
    </>
  );
}
