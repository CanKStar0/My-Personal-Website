import { Navbar } from "@/components/navbar";

export default function IletisimPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] px-6 text-center bg-background">
        <h1 className="text-3xl font-extrabold tracking-tight font-jakarta text-foreground sm:text-4xl">
          İletişim Sayfası Yapım Aşamasında
        </h1>
        <p className="mt-4 text-sm md:text-base text-muted-foreground/80 font-sans font-light max-w-md leading-relaxed">
          Bu sayfa tasarım aşamasındadır. Yakında profesyonel iletişim kanalları ve randevu formları ile güncellenecektir.
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
