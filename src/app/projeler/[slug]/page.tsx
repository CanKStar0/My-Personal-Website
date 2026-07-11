import { Navbar } from "@/components/navbar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjeDetayPage({ params }: PageProps) {
  const { slug } = await params;

  const displayTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] px-6 text-center bg-background">
        <span className="text-xs font-bold tracking-[0.2em] text-brand-red uppercase block mb-3 font-sans">
          Proje Detayı
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight font-jakarta text-foreground sm:text-4xl">
          {displayTitle}
        </h1>
        <p className="mt-4 text-sm md:text-base text-muted-foreground/80 font-sans font-light max-w-md leading-relaxed">
          {slug} projesine ait teknik dökümantasyon, mimari şema ve canlı demo detayları yakında bu sayfada sergilenecektir.
        </p>
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
