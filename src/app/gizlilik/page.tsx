import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { createMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL, CONTACT_EMAIL } from "@/lib/site";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "Gizlilik Politikası ve Kullanım Koşulları",
  description:
    "Canpolat Kaya web sitesi gizlilik politikası, çerezler, KVKK / GDPR aydınlatma metni ve kullanım koşulları.",
  path: "/gizlilik",
});

export default function PrivacyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Gizlilik Politikası ve Kullanım Koşulları",
    url: `${SITE_URL}/gizlilik`,
    description: "Kişisel verilerin korunması, analitik çerezler ve web sitesi kullanım ilkeleri.",
    publisher: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
    },
    inLanguage: "tr-TR",
  };

  return (
    <>
      <JsonLd data={schema} />
      <Navbar />
      <main className="flex-1 bg-background px-6 pb-24 pt-14 md:px-12 md:pt-20">
        <article className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Gizlilik Politikası ve Koşullar", href: "/gizlilik" },
            ]}
          />

          <header className="border-b border-border/40 pb-8 pt-4">
            <div className="flex items-center gap-3 text-brand-red dark:text-rose-400 mb-3">
              <ShieldCheck className="h-6 w-6" />
              <span className="text-xs font-bold uppercase tracking-widest">Şeffaflık & Güven</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl font-jakarta text-foreground">
              Gizlilik Politikası ve Kullanım Koşulları
            </h1>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Son güncelleme: 1 Ocak 2026. Kişisel verilerinizin gizliliği, haklarınız ve bu web sitesini kullanırken geçerli olan ilkeler hakkında şeffaf bilgilendirme.
            </p>
          </header>

          <div className="prose prose-zinc dark:prose-invert mt-12 max-w-none space-y-10 text-muted-foreground leading-relaxed">
            <section className="space-y-4">
              <h2 className="flex items-center gap-2.5 text-xl font-bold text-foreground sm:text-2xl font-jakarta">
                <Lock className="h-5 w-5 text-brand-red dark:text-rose-400" />
                1. Genel Bakış ve Veri Sorumlusu
              </h2>
              <p>
                Bu web sitesi (<strong>{SITE_URL}</strong>), bağımsız yazılım mühendisi ve Full-Stack Developer <strong>Canpolat Kaya</strong> tarafından işletilmektedir. Ziyaretçilerimizin mahremiyetine ve 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ile Genel Veri Koruma Tüzüğü (GDPR) prensiplerine tam saygı duyulmaktadır.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="flex items-center gap-2.5 text-xl font-bold text-foreground sm:text-2xl font-jakarta">
                <Eye className="h-5 w-5 text-brand-red dark:text-rose-400" />
                2. Toplanan Veriler ve Çerezler
              </h2>
              <p>
                Sitemizde gereksiz kişisel veri toplanmaz ve verileriniz asla ticari amaçla üçüncü taraflara satılmaz. Yalnızca aşağıdaki veriler işlenmektedir:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Teknik ve Analitik Veriler:</strong> Ziyaret edilen sayfalar, cihaz türü, ekran çözünürlüğü ve AI yönlendirme kaynakları (ChatGPT, Perplexity vb.) Google Analytics 4 (GA4) aracılığıyla anonimleştirilmiş IP ile ölçülür.
                </li>
                <li>
                  <strong>İletişim Talepleri:</strong> E-posta bağlantıları üzerinden doğrudan ilettiğiniz e-posta adresi ve mesaj içeriği, yalnızca iş görüşmesi ve teklif hazırlama amacıyla saklanır.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="flex items-center gap-2.5 text-xl font-bold text-foreground sm:text-2xl font-jakarta">
                <FileText className="h-5 w-5 text-brand-red dark:text-rose-400" />
                3. Fikri Mülkiyet ve Kullanım Koşulları
              </h2>
              <p>
                Bu sitede yayımlanan teknik blog yazıları, mimari açıklamalar, kaynak kod demoları ve içerikler aksi belirtilmedikçe Canpolat Kaya&apos;ya aittir. Açık kaynak lisanslı projeler kendi depo lisans şartlarına (MIT/Apache vb.) tabidir.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground sm:text-2xl font-jakarta">
                4. İletişim ve Veri Sahibi Hakları
              </h2>
              <p>
                Kişisel verilerinizle ilgili her türlü soru, silme talebi veya düzeltme isteği için doğrudan aşağıdaki e-posta adresinden iletişime geçebilirsiniz:
              </p>
              <p className="font-mono text-sm text-foreground bg-muted/40 p-4 rounded-xl border border-border/40 inline-block">
                E-posta: <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-red hover:underline">{CONTACT_EMAIL}</a>
              </p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
