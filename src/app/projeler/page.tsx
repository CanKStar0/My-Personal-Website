import { Navbar } from "@/components/navbar";
import { ProjectsSection } from "@/components/projects-section";

export default function ProjelerPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-12">
        <ProjectsSection />
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
