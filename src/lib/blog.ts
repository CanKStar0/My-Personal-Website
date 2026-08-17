export type CodeSnippet = {
  language: string;
  code: string;
  filename?: string;
};

export type BlogSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
  codeSnippet?: CodeSnippet;
  callout?: {
    type?: "tip" | "info" | "warning";
    title?: string;
    text: string;
  };
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt: string;
  category: string;
  readingTime: string;
  serviceHref: string;
  serviceAnchor: string;
  sections: BlogSection[];
  faqs?: FAQItem[];
};

export const blogPosts: BlogPost[] = [
  // ==========================================
  // ADIM 1: AGENTIC CODING & TERMINAL AJANLARI
  // ==========================================
  {
    slug: "claude-code-cli-rehberi",
    title: "Claude Code CLI ile Terminal Odaklı Agentic Coding: Kurulum ve Best Practices",
    description: "Anthropic'in yeni nesil terminal ajanı Claude Code'un nasıl çalıştığını, kod tabanını bağımsız analiz etme yeteneklerini ve geliştirici verimliliğini artıran pratikleri öğrenin.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "Agentic Coding",
    readingTime: "8 dk",
    serviceHref: "/hizmetler/yapay-zeka-otomasyon",
    serviceAnchor: "AI ajan entegrasyonu ve otomasyon çözümlerini inceleyin",
    sections: [
      {
        title: "Claude Code Nedir ve Klasik Chatbot'lardan Neden Farklıdır?",
        paragraphs: [
          "Claude Code, tarayıcı tabanlı sohbet arayüzlerinin aksine doğrudan geliştiricinin terminalinde (CLI) çalışan, tüm yerel git deposunu, dosya ağacını ve bağımlılıkları bağlam (context) olarak okuyabilen otonom bir kodlama ajanıdır.",
          "Sadece kod önermekle kalmaz; terminal komutlarını çalıştırır, testleri yürütür, derleme hatalarını (build errors) analiz eder ve git diff oluşturup commit atabilir."
        ],
        callout: {
          type: "tip",
          title: "Ajanik Davranış",
          text: "Claude Code, tek adımlı bir tamamlayıcı değil; problem çözülene kadar dosyaları okuyan, düzenleyen ve test eden döngüsel bir ajandır."
        }
      },
      {
        title: "Kurulum ve İlk Başlatma",
        paragraphs: [
          "Claude Code'u sisteminize kurmak için global npm paketini yükleyebilir ve doğrudan proje dizininizde başlatabilirsiniz:"
        ],
        codeSnippet: {
          language: "bash",
          filename: "terminal",
          code: `# Claude Code CLI'ı global olarak yükleyin
npm install -g @anthropic-ai/claude-code

# Proje dizininize gidin ve ajanı başlatın
cd /path/to/my-project
claude`
        },
        items: [
          "ANTHROPIC_API_KEY ortam değişkenini otomatik okur.",
          "Projedeki .gitignore ve mimari kuralları analiz eder.",
          "Geniş kod tabanlarında maliyet optimizasyonu için akıllı bağlam daraltma uygular."
        ]
      },
      {
        title: "Gelişmiş Görev Senaryoları ve Pratik Kullanımlar",
        paragraphs: [
          "Büyük bir Next.js veya FastAPI projesinde hata ayıklarken Claude Code'a hedef odaklı talimatlar verebilirsiniz. Örneğin, testleri çalıştırıp başarısız olanları otomatik düzeltmesini isteyebilirsiniz:"
        ],
        codeSnippet: {
          language: "bash",
          filename: "claude-prompt-example",
          code: `# Testleri çalıştır ve hata veren uç noktaları düzelt
claude "npm run test:e2e komutunu çalıştır, kırılan sepet akışını analiz et ve src/lib/cart.ts dosyasını onar"`
        }
      },
      {
        title: "Üretkenlik İçin Best Practices",
        paragraphs: [
          "Agentic araçların başarısı, projenizdeki bağlam belgelerine doğrudan bağlıdır. Depo kök dizininde bir CLAUDE.md veya AGENTS.md dosyası bulundurarak mimari sınırları netleştirin."
        ],
        items: [
          "Projeye özel mimari kuralları AGENTS.md içinde tanımlayın.",
          "Kritik veritabanı veya üretim komutları için onay mekanizmalarını aktif tutun.",
          "Git branch'leri üzerinde çalışarak ajan değişikliklerini izole edin."
        ]
      }
    ],
    faqs: [
      {
        question: "Claude Code internet erişimine sahip mi?",
        answer: "Evet, araştırma ve güncel kütüphane dokümantasyonlarını okumak için kontrollü arama araçlarını kullanabilir."
      },
      {
        question: "Cursor veya Copilot'tan farkı nedir?",
        answer: "IDE eklentisi olmak yerine doğrudan terminal ortamınızda otonom görevler (test çalıştırma, git yönetimi, dosya refactor) yürüten bir agentic CLI olmasıdır."
      }
    ]
  },
  {
    slug: "gemini-flash-3-7-ozellikleri-ve-projeler",
    title: "Gemini 3.7 Flash & 2.0 Flash ile Neler Yapılabilir? Uzmanlık Alanları ve Projeler",
    description: "Google'ın ultra hızlı ve akıl yürütme (reasoning) yetenekli Gemini Flash modellerinin mimari uzmanlıklarını, gerçek zamanlı API projelerini ve maliyet avantajlarını keşfedin.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "LLM & AI Modelleri",
    readingTime: "9 dk",
    serviceHref: "/hizmetler/yapay-zeka-otomasyon",
    serviceAnchor: "Gemini ve LLM model entegrasyonu hizmetlerimizi keşfedin",
    sections: [
      {
        title: "Gemini Flash Modellerinin Evrimi: Hız ve Akıl Yürütme Dengesi",
        paragraphs: [
          "Gemini 2.0 Flash ve yeni nesil Gemini 3.7 Flash; düşük gecikme (ultra-low latency), devasa bağlam penceresi (1M+ token) ve multimodal (metin, ses, görüntü, video) anlama yetenekleriyle öne çıkar.",
          "Geleneksel olarak hızlı modeller akıl yürütmede zayıfken, Gemini Flash serisi 'Thinking Mode' (akıl yürütme bütçesi) sayesinde karmaşık algoritma analizi ve mimari planlama görevlerinde üst segment modellerle yarışır."
        ]
      },
      {
        title: "Gemini Flash Nelerin Uzmanıdır?",
        paragraphs: [
          "Bu modeller özellikle şu alanlarda sektör standardı haline gelmiştir:"
        ],
        items: [
          "Gerçek Zamanlı Canlı Asistanlar & Sesli API Akışları (Multimodal Live API)",
          "Büyük Kod Tabanı Analizi (1M token bağlam içine tüm repoyu yükleme)",
          "Yüksek Hacimli Veri Sınıflandırma ve Yapılandırılmış JSON Üretimi",
          "Ultra Düşük Maliyetli Çoklu Ajan (Multi-Agent Swarm) Pipeline'ları"
        ]
      },
      {
        title: "Uygulamalı Proje: Python ile Canlı Doküman ve Kod Denetim Pipeline'ı",
        paragraphs: [
          "Google GenAI SDK kullanarak Gemini Flash üzerinden tip kontrollü Pydantic çıktıları almak ve kod denetimi yapmak oldukça basittir:"
        ],
        codeSnippet: {
          language: "python",
          filename: "gemini_analyzer.py",
          code: `from google import genai
from google.genai import types
from pydantic import BaseModel, Field

class CodeAuditResult(BaseModel):
    security_score: int = Field(ge=0, le=100)
    vulnerabilities: list[str]
    suggested_refactor: str

client = genai.Client()

response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents="Aşağıdaki FastAPI endpoint'ini güvenlik açıkları için denetle: ...",
    config=types.GenerateContentConfig(
        response_mime_type="application/json",
        response_schema=CodeAuditResult,
        temperature=0.1
    ),
)

audit: CodeAuditResult = response.parsed
print(f"Güvenlik Skoru: {audit.security_score}/100")`
        }
      },
      {
        title: "Hangi Projelerde Tercih Edilmeli?",
        paragraphs: [
          "Eğer uygulamanız saniyede onlarca API isteği alıyorsa ve yanıt süresinin 500ms altında kalması gerekiyorsa, Gemini Flash maliyet/performans oranında en güçlü adaydır."
        ]
      }
    ],
    faqs: [
      {
        question: "Gemini Flash token maliyeti nasıldır?",
        answer: "Gemini Flash modelleri, GPT-4o ve Claude Sonnet modellerine kıyasla yaklaşık 5 ila 10 kat daha uygun maliyetlidir."
      }
    ]
  },
  {
    slug: "model-context-protocol-mcp-nedir",
    title: "Model Context Protocol (MCP) Nedir? Özel Araçlar ve IDE Entegrasyonu Rehberi",
    description: "Anthropic tarafından açık kaynak olarak duyurulan Model Context Protocol (MCP) standardının ne olduğunu, LLM'leri yerel veritabanlarına ve araçlara nasıl bağladığını öğrenin.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "AI Mimarisi",
    readingTime: "7 dk",
    serviceHref: "/hizmetler/api-gelistirme",
    serviceAnchor: "Özel API ve protokol entegrasyonu çözümlerimizi inceleyin",
    sections: [
      {
        title: "MCP Standardı Neden Geliştirildi?",
        paragraphs: [
          "Daha önce her AI aracının (Cursor, Claude Desktop, yerel ajanlar) veritabanlarına, dosya sistemlerine veya GitHub'a bağlanmak için kendi özel eklenti yapısı vardı.",
          "Model Context Protocol (MCP), LLM istemcileri ile veri kaynakları arasında USB standardı gibi evrensel bir protokol sunarak entegrasyon karmaşasını ortadan kaldırır."
        ]
      },
      {
        title: "TypeScript ile Basit Bir MCP Server Geliştirme",
        paragraphs: [
          "Aşağıda yerel bir SQLite veya PostgreSQL veritabanını Claude ve diğer MCP istemcilerine açan örnek bir araç sunucusu yer almaktadır:"
        ],
        codeSnippet: {
          language: "typescript",
          filename: "mcp-server.ts",
          code: `import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server({ name: "db-mcp-server", version: "1.0.0" }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: "run_sql_query",
    description: "Veritabanında güvenli okuma sorguları çalıştırır",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string", description: "Çalıştırılacak SQL SELECT sorgusu" } },
      required: ["query"]
    }
  }]
}));

const transport = new StdioServerTransport();
await server.connect(transport);`
        }
      }
    ],
    faqs: [
      {
        question: "Hangi IDE'ler ve araçlar MCP destekliyor?",
        answer: "Claude Desktop, Cursor, Zed, Windsurf ve Claude Code gibi modern geliştirici araçlarının tamamı MCP standardını desteklemektedir."
      }
    ]
  },
  {
    slug: "claude-code-vs-cursor-karsilastirma",
    title: "Claude Code vs Cursor Agent: Hangi Geliştirici Aracını Seçmelisiniz? (2026)",
    description: "Terminal tabanlı otonom ajan Claude Code ile tam teşekküllü AI IDE Cursor Agent arasındaki farklar, performans testleri ve doğru kullanım senaryoları.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "Karşılaştırma",
    readingTime: "8 dk",
    serviceHref: "/hizmetler/yapay-zeka-otomasyon",
    serviceAnchor: "Geliştirici verimliliği ve AI danışmanlığı hizmetlerimizi inceleyin",
    sections: [
      {
        title: "Temel Mimari Farkı: CLI vs Görsel IDE",
        paragraphs: [
          "Cursor, VS Code tabanlı görsel bir arayüzde satır içi tamamlama (inline tab), çoklu dosya düzenleme (Composer) ve görsel diff inceleme konusunda liderdir.",
          "Claude Code ise doğrudan Unix terminali üzerinde çalışan; CI/CD, ssh oturumları, git otomasyonu ve komut çalıştırma yetenekleriyle saf agentic bir geliştirici deneyimi sunar."
        ]
      },
      {
        title: "Detaylı Özellik Karşılaştırması",
        paragraphs: [
          "İki aracın güçlü olduğu alanlar:"
        ],
        items: [
          "Cursor: Görsel arayüz, hızlı kod yazımı, tek tıkla kabul et/reddet mekanizması.",
          "Claude Code: Terminalden bağımsız otonom döngü, bash komutları, büyük dosya analizleri ve uzak sunucu yönetimi.",
          "Maliyet: Cursor aylık sabit abonelik sunarken, Claude Code doğrudan Anthropic API kullanımına göre faturalandırılır."
        ]
      }
    ]
  },
  {
    slug: "gemini-api-ve-fastapi-ile-gercek-zamanli-streaming",
    title: "FastAPI ve Gemini 3.7 API ile Gerçek Zamanlı Streaming ve Function Calling",
    description: "Python FastAPI backend kullanarak Google Gemini API ile Server-Sent Events (SSE) tabanlı gerçek zamanlı yapay zekâ streaming ve araç çağırma (function calling) mimarisi.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "API & Backend",
    readingTime: "10 dk",
    serviceHref: "/hizmetler/api-gelistirme",
    serviceAnchor: "FastAPI ve AI API geliştirme hizmetlerimizi inceleyin",
    sections: [
      {
        title: "Modern Streaming Mimarisi",
        paragraphs: [
          "Kullanıcıya yanıt üretirken modelin tüm çıktısını beklemek yerine ilk token'ları milisaniyeler içinde iletmek modern web uygulamalarının vazgeçilmezidir.",
          "FastAPI'nin `StreamingResponse` bileşeni ve Server-Sent Events (SSE) standardı ile kesintisiz bir veri akışı sağlayabilirsiniz."
        ],
        codeSnippet: {
          language: "python",
          filename: "main.py",
          code: `from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from google import genai

app = FastAPI()
client = genai.Client()

@app.get("/api/stream")
async def stream_ai_response(prompt: str):
    async def event_generator():
        response = client.models.generate_content_stream(
            model="gemini-2.0-flash",
            contents=prompt,
        )
        for chunk in response:
            if chunk.text:
                yield f"data: {chunk.text}\\n\\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")`
        }
      }
    ]
  },
  {
    slug: "agentic-coding-nedir-ve-nasil-calisir",
    title: "Agentic Coding Nedir? Kod Tabanını Bağımsız Yöneten Ajan Mimarileri",
    description: "Sadece kod tamamlayan asistanlardan, projenin tamamını anlayıp test eden ve hata ayıklayan otonom ajan sistemlerine geçişin teknik anatomisi.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "Agentic Coding",
    readingTime: "7 dk",
    serviceHref: "/hizmetler/yapay-zeka-otomasyon",
    serviceAnchor: "Otonom yazılım ajanları çözümlerimizi inceleyin",
    sections: [
      {
        title: "Copilot'tan Agentic Çağa Geçiş",
        paragraphs: [
          "Geleneksel AI araçları siz yazarken sonraki 3 satırı tahmin ederdi. Agentic Coding ise bir hedefe odaklanır: 'Kullanıcı girişine 2FA ekle'.",
          "Ajan; dosya arar, bağımlılıkları inceler, şemayı günceller, testi yazar ve derleyici hatalarını kendi kendine düzeltene kadar döngüyü sürdürür."
        ]
      }
    ]
  },
  {
    slug: "openai-o3-mini-ve-codex-ajan-mimarisi",
    title: "OpenAI o3-mini ve Reasoning Modelleri ile Karmaşık Kod Tabanı Refactor Stratejisi",
    description: "Düşünme zinciri (Chain of Thought) kullanan akıl yürütme modellerinin yazılım mimarisi oluşturma, karmaşık algoritma optimizasyonu ve refactor süreçlerindeki gücü.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "LLM & AI Modelleri",
    readingTime: "8 dk",
    serviceHref: "/hizmetler/ozel-yazilim-gelistirme",
    serviceAnchor: "Özel yazılım mimarisi ve refactor hizmetlerimizi inceleyin",
    sections: [
      {
        title: "Reasoning Modelleri Neden Fark Yaratır?",
        paragraphs: [
          "Standart modeller karmaşık bir matematik veya mimari problemi çözerken ilk aklına gelen token'ı üretir. o3-mini gibi reasoning modelleri ise cevap vermeden önce 'düşünür', olası hata yollarını eler ve en optimum mimariyi seçer."
        ]
      }
    ]
  },
  {
    slug: "playwright-ve-ai-ile-akilli-web-kazima",
    title: "Playwright ve AI Vision ile Dinamik Web Kazıma ve Anti-Bot Korumalarını Aşma",
    description: "Geleneksel CSS seçicilerinin kırıldığı dinamik sitelerde Playwright, LLM'ler ve Vision modelleriyle kendi kendine adapte olan akıllı scraping sistemleri.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "Web Scraping",
    readingTime: "9 dk",
    serviceHref: "/hizmetler/web-scraping",
    serviceAnchor: "İleri düzey veri toplama ve scraping hizmetlerimizi inceleyin",
    sections: [
      {
        title: "Görsel (Vision) Destekli Akıllı Seçiciler",
        paragraphs: [
          "Siteler HTML yapılarını veya class isimlerini sık intermittent olarak değiştirir. AI destekli scraping yaklaşımı, ekran görüntüsünü ve erişilebilirlik ağacını (AOM) analiz ederek insan gibi butonları ve tabloları tespit eder."
        ],
        codeSnippet: {
          language: "python",
          filename: "vision_scraper.py",
          code: `import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto("https://example.com/products")
        screenshot = await page.screenshot()
        # Ekran görüntüsü vision modeline gönderilir...
        await browser.close()

asyncio.run(run())`
        }
      }
    ]
  },
  {
    slug: "nextjs-15-ai-sdk-ile-agentic-ui",
    title: "Next.js 15 App Router ve Vercel AI SDK ile Generative UI / Agentic Arayüz Geliştirme",
    description: "Kullanıcıya sadece metin cevabı vermek yerine dinamik React bileşenleri (Generative UI) render eden modern yapay zekâ web uygulamaları inşa edin.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "Full-Stack Web",
    readingTime: "8 dk",
    serviceHref: "/hizmetler/modern-web-gelistirme",
    serviceAnchor: "Next.js ve modern frontend çözümlerimizi inceleyin",
    sections: [
      {
        title: "Generative UI Nedir?",
        paragraphs: [
          "Chatbot bir hisse senedi fiyatı söylediğinde metin yerine interaktif bir grafik bileşeni döndürmesi Generative UI konseptidir.",
          "Vercel AI SDK ile Next.js Server Actions kullanarak istemci tarafında zengin React bileşenleri akıtabilirsiniz."
        ]
      }
    ]
  },
  {
    slug: "crewai-ve-langgraph-ile-multi-agent-sistemleri",
    title: "CrewAI vs LangGraph: Çoklu Ajan (Multi-Agent) Mimarileri Nasıl Kurulur?",
    description: "Birden fazla AI ajanının (araştırmacı, yazar, denetçi, kodlayıcı) senkronize çalışarak karmaşık iş süreçlerini otonom tamamlamasını sağlayan kütüphanelerin analizi.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "AI Otomasyon",
    readingTime: "10 dk",
    serviceHref: "/hizmetler/yapay-zeka-otomasyon",
    serviceAnchor: "Çoklu ajan iş akışları ve AI entegrasyonu hizmetlerimizi keşfedin",
    sections: [
      {
        title: "Multi-Agent Sisteminin Çalışma Mantığı",
        paragraphs: [
          "Tek bir büyük prompt yerine görevleri uzmanlaşmış rollere bölmek başarı oranını radikal biçimde artırır.",
          "Örneğin bir yazılım pipeline'ında: Agent A (Gereksinim Analisti), Agent B (FastAPI Geliştiricisi), Agent C (Test Mühendisi) olarak bir graf üzerinde sıralı veya döngüsel çalışır."
        ]
      }
    ]
  },

  // ==============================================================
  // ADIM 2: SON NESİL MODELLER & GELİŞTİRİCİ MİMARİLERİ (REASONING)
  // ==============================================================
  {
    slug: "gemini-thinking-mode-ve-akil-yurutme",
    title: "Gemini Thinking Mode Nedir? Akıl Yürütme Bütçesi ile Karmaşık Algoritmalar Çözme",
    description: "Google Gemini 2.0 ve 3.7 modellerinde sunulan Thinking Mode akıl yürütme bütçesinin (budget) nasıl çalıştığını ve zorlu algoritmik problemlerde nasıl kullanıldığını öğrenin.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "LLM & AI Modelleri",
    readingTime: "8 dk",
    serviceHref: "/hizmetler/yapay-zeka-otomasyon",
    serviceAnchor: "Gemini ve akıl yürütme modelleri entegrasyonu çözümlerimizi inceleyin",
    sections: [
      {
        title: "Thinking Budget (Düşünme Bütçesi) Nedir?",
        paragraphs: [
          "Klasik LLM'ler her gelen istekte anında token üretmeye başlar. Thinking Mode ise modelin kullanıcıya nihai cevabı vermeden önce dahili bir akıl yürütme zinciri (hidden thinking tokens) kurmasına olanak tanır.",
          "Geliştirici olarak `thinking_budget` parametresini belirleyerek (örneğin 0 ile 8192 token arası) modelin problem üzerinde ne kadar derin düşüneceğini siz yönetirsiniz."
        ],
        codeSnippet: {
          language: "python",
          filename: "gemini_thinking.py",
          code: `from google import genai
from google.genai import types

client = genai.Client()

response = client.models.generate_content(
    model="gemini-2.0-flash-thinking-exp",
    contents="Verilen dağıtık veritabanı loglarındaki yarış durumunu (race condition) analiz et ve deadlock senaryosunu kanıtla: ...",
    config=types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(thinking_budget=4096),
        temperature=0.7
    )
)

print(response.text)`
        }
      }
    ],
    faqs: [
      {
        question: "Thinking mode ne zaman kapatılmalıdır?",
        answer: "Hızlı sınıflandırma, basit metin çevirisi veya temel özetleme gibi düşük gecikme gerektiren işlerde thinking_budget=0 yapılarak maksimum hız elde edilir."
      }
    ]
  },
  {
    slug: "claude-3-7-sonnet-hybrid-reasoning",
    title: "Claude 3.7 Sonnet Hybrid Reasoning: Hızlı Çıktı ve Derin Düşünme Dengesi",
    description: "Anthropic'in ilk hibrit akıl yürütme modeli Claude 3.7 Sonnet'in standart mod ve thinking mod arasındaki esnek geçiş mimarisi.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "LLM & AI Modelleri",
    readingTime: "9 dk",
    serviceHref: "/hizmetler/yapay-zeka-otomasyon",
    serviceAnchor: "Claude API ve akıllı iş akışları danışmanlığı",
    sections: [
      {
        title: "Hibrit Akıl Yürütme Paradigması",
        paragraphs: [
          "Geliştiriciler artık hızlı yanıt veren modeller ile derin akıl yürüten modeller arasında seçim yapmak zorunda değildir.",
          "Claude 3.7 Sonnet tek bir model üzerinde API çağrısı sırasında thinking parametresi tanımlayarak duruma göre hız veya derin analiz seçeneği sunar."
        ]
      }
    ]
  },
  {
    slug: "deepseek-r1-ve-acik-kaynak-reasoning",
    title: "DeepSeek-R1 ve Açık Kaynak Reasoning Modellerini Yerelde Çalıştırma (Ollama & vLLM)",
    description: "DeepSeek-R1 ve damıtılmış (distilled) açık kaynak modelleri kendi sunucunuzda vLLM veya Ollama ile sıfır API maliyetiyle nasıl çalıştıracağınızı öğrenin.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "AI Altyapısı",
    readingTime: "11 dk",
    serviceHref: "/hizmetler/ozel-yazilim-gelistirme",
    serviceAnchor: "Özel sunucu ve açık kaynak AI altyapı kurulumu çözümlerimiz",
    sections: [
      {
        title: "Açık Kaynak Akıl Yürütme Devrimi",
        paragraphs: [
          "DeepSeek-R1, kapalı kaynak reasoning modellerinin performansını açık ağırlıklı (open-weights) olarak sunarak yerel geliştirme ortamlarında çığır açmıştır.",
          "Ollama ile tek bir komutla 7B, 14B veya 32B boyutundaki damıtılmış modelleri çalıştırabilirsiniz:"
        ],
        codeSnippet: {
          language: "bash",
          filename: "terminal",
          code: `# Ollama ile DeepSeek-R1 14B modelini yerelde çalıştırın
ollama run deepseek-r1:14b

# vLLM ile yüksek throughput'lu OpenAI uyumlu sunucu başlatın
python3 -m vllm.entrypoints.openai.api_server --model deepseek-ai/DeepSeek-R1-Distill-Qwen-14B --port 8000`
        }
      }
    ]
  },
  {
    slug: "llm-structured-outputs-pydantic-v2",
    title: "LLM Structured Outputs: Pydantic v2 ve JSON Schema ile Sıfır Hatalı Çıktı Üretimi",
    description: "LLM çıktılarının kırılmasını önlemek için Pydantic v2, Instructor ve yerel JSON Schema modları ile %100 tip güvenli veri çıkarma rehberi.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "API & Backend",
    readingTime: "8 dk",
    serviceHref: "/hizmetler/api-gelistirme",
    serviceAnchor: "Tip güvenli API ve veri doğrulama çözümlerimiz",
    sections: [
      {
        title: "Neden Normal Regex veya String Parser Yetmez?",
        paragraphs: [
          "LLM'ler bazen JSON'ın başına tırnak ekler veya eksik virgül bırakır. 'Structured Outputs' özelliği, modelin gramer tabanlı örnekleme (grammar-constrained sampling) ile sadece şemaya uyan token'ları üretmesini garanti eder."
        ],
        codeSnippet: {
          language: "python",
          filename: "structured_output.py",
          code: `from pydantic import BaseModel, Field
import instructor
from openai import OpenAI

class InvoiceItem(BaseModel):
    name: str
    price: float = Field(gt=0)
    quantity: int = Field(default=1)

class InvoiceExtraction(BaseModel):
    vendor: str
    items: list[InvoiceItem]
    total: float

client = instructor.from_openai(OpenAI())

invoice = client.chat.completions.create(
    model="gpt-4o-mini",
    response_model=InvoiceExtraction,
    messages=[{"role": "user", "content": "Fatura metni: Acme Corp 2 adet sunucu USD 500, 1 adet domain USD 20"}],
)

print(f"Satıcı: {invoice.vendor}, Toplam: USD {invoice.total}")`
        }
      }
    ]
  },
  {
    slug: "prompt-caching-ile-maliyet-dusurme",
    title: "Prompt Caching Mimarisi: Anthropic ve Gemini API Maliyetlerini %90 Düşürme",
    description: "Tekrarlanan sistem promptları, uzun API dokümantasyonları ve kod tabanı yüklemelerinde Prompt Caching kullanarak faturaları ve gecikmeyi radikal şekilde azaltın.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "AI Mimarisi",
    readingTime: "7 dk",
    serviceHref: "/hizmetler/yapay-zeka-otomasyon",
    serviceAnchor: "AI maliyet optimizasyonu ve üretim danışmanlığı",
    sections: [
      {
        title: "Prompt Caching Nasıl Çalışır?",
        paragraphs: [
          "Büyük bir kod tabanını (örneğin 50.000 token) her kullanıcı sorusunda baştan iletmek hem maliyetli hem de yavaştır.",
          "Prompt Caching ile ilk istekte sunucu tarafında işlenen KV-cache bellekte tutulur ve sonraki isteklerde %90 indirimli fiyatla ve neredeyse anında okunur."
        ]
      }
    ]
  },
  {
    slug: "litellm-ile-coklu-model-yonetimi",
    title: "LiteLLM ile 100+ LLM Modelini Tek Bir OpenAI Uyumlu Proxy ile Yönetme",
    description: "OpenAI, Anthropic, Gemini, Bedrock ve yerel modelleri tek bir standart API formatında birleştiren, otomatik fallback ve rate-limit yönetimi sunan LiteLLM rehberi.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "AI Altyapısı",
    readingTime: "8 dk",
    serviceHref: "/hizmetler/api-gelistirme",
    serviceAnchor: "Çoklu model ve proxy mimarisi geliştirme hizmetlerimiz",
    sections: [
      {
        title: "Tedarikçi Bağımlılığından (Vendor Lock-in) Kurtulma",
        paragraphs: [
          "Her sağlayıcının kendi kütüphanesini öğrenmek yerine `litellm.completion()` çağrısıyla `claude-3-7-sonnet`, `gemini/gemini-2.0-flash` veya `ollama/qwen` modellerini aynı arayüzle çağırabilirsiniz."
        ]
      }
    ]
  },
  {
    slug: "function-calling-ve-tool-use-mimarisi",
    title: "Function Calling ve Tool Use: LLM'leri Harici API'ler ve Veritabanlarıyla Buluşturma",
    description: "Büyük dil modellerine veritabanı sorgulama, hava durumu öğrenme veya e-posta gönderme araçları tanımlama ve döngüsel çalıştırma (agent loop) prensipleri.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "AI Mimarisi",
    readingTime: "9 dk",
    serviceHref: "/hizmetler/api-gelistirme",
    serviceAnchor: "Function calling ve araç entegrasyonu çözümlerimiz",
    sections: [
      {
        title: "Ajan Döngüsünün (Agent Loop) Temel Mantığı",
        paragraphs: [
          "LLM'ler fonksiyonu doğrudan çalıştırmaz; fonksiyonun adını ve JSON argümanlarını üretir. Geliştirici backend'de bu fonksiyonu çalıştırır ve sonucunu 'tool' rolüyle tekrar modele iletir."
        ]
      }
    ]
  },
  {
    slug: "rag-vs-long-context-karsilastirmasi",
    title: "RAG mı Yoksa 2M Token Long-Context mi? Hangi Senaryoda Hangisi Seçilmeli?",
    description: "Vektör veritabanı tabanlı RAG (Retrieval-Augmented Generation) mimarisi ile Gemini'nin 2M token'lık devasa bağlam pencerelerinin maliyet, doğruluk ve hız karşılaştırması.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "Karşılaştırma",
    readingTime: "8 dk",
    serviceHref: "/hizmetler/yapay-zeka-otomasyon",
    serviceAnchor: "RAG ve bilgi tabanı sistemleri danışmanlığı",
    sections: [
      {
        title: "Karşılaştırma Kriterleri",
        paragraphs: [
          "Milyonlarca dokümanlık devasa kütüphanelerde RAG hala en ucuz ve en hızlı yaklaşımdır. Ancak 5-10 PDF'lik bir analiz veya tek bir git reposu denetiminde Long-Context doğrudan tüm bağlamı kavrayarak 'Needle in a Haystack' başarısını maksimize eder."
        ]
      }
    ]
  },
  {
    slug: "ai-agent-memory-ve-session-yonetimi",
    title: "AI Ajanlarında Bellek Mimarisi: Kısa Süreli, Uzun Süreli ve Epizodik Hafıza",
    description: "Sohbetler arası kullanıcı tercihlerini hatırlayan, geçmiş başarıları ve hataları hafızasında tutan otonom AI bellek mimarisi kurulumu.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "AI Mimarisi",
    readingTime: "9 dk",
    serviceHref: "/hizmetler/yapay-zeka-otomasyon",
    serviceAnchor: "Kişiselleştirilmiş AI asistan ve bellek çözümleri",
    sections: [
      {
        title: "Bellek Katmanları",
        paragraphs: [
          "1. Çalışma Belleği (Working Memory): Mevcut context penceresi.",
          "2. Epizodik Bellek (Episodic Memory): Geçmiş olayların özetleri.",
          "3. Semantik Bellek (Semantic Memory): Vektör veritabanında saklanan genel bilgi havuzu."
        ]
      }
    ]
  },
  {
    slug: "llm-evals-ve-sentetik-test-surecleri",
    title: "LLM Evals: Üretimdeki AI Çıktılarını Otomatik Değerlendirme ve Skorlama",
    description: "Prompt değişikliklerinin kaliteyi bozup bozmadığını anlamak için Ragas, DeepEval ve sentetik veri setleriyle otomatik LLM test süreçleri kurma.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "AI Altyapısı",
    readingTime: "10 dk",
    serviceHref: "/hizmetler/yapay-zeka-otomasyon",
    serviceAnchor: "AI kalite kontrol ve değerlendirme altyapısı çözümlerimiz",
    sections: [
      {
        title: "Üretime AI Çıkarken Test Güvenliği",
        paragraphs: [
          "Geleneksel birim (unit) testleri deterministik fonksiyonlar için çalışırken, LLM çıktılarının halüsinasyon veya alaka oranını ölçmek için 'LLM-as-a-Judge' tabanlı Eval çerçeveleri kullanılmalıdır."
        ]
      }
    ]
  },

  // ==============================================================
  // ADIM 3: MODERN PYTHON & ASYNC AI API MİMARİLERİ (FASTAPI)
  // ==============================================================
  {
    slug: "fastapi-async-mimarisi-ve-event-loop",
    title: "FastAPI Async Mimarisi: Asyncio Event Loop ve Yüksek Eşzamanlılık (Concurrency)",
    description: "FastAPI'de async def ve def fonksiyonlarının nasıl çalıştığını, threadpool tuzaklarını ve saniyede on binlerce isteği bloklanmadan yönetme tekniklerini öğrenin.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "API & Backend",
    readingTime: "9 dk",
    serviceHref: "/hizmetler/api-gelistirme",
    serviceAnchor: "Yüksek performanslı FastAPI backend çözümlerimizi inceleyin",
    sections: [
      {
        title: "async def vs def: En Yaygın Hata",
        paragraphs: [
          "Birçok geliştirici FastAPI'de her endpoint'in başına düşünmeden `async def` yazar. Eğer fonksiyon içinde bloklayıcı bir işlem (örneğin `time.sleep` veya senkron `requests.get`) yaparsanız, asyncio Event Loop kilitlenir ve tüm sunucu donar.",
          "FastAPI, senkron `def` fonksiyonlarını otomatik olarak harici bir AnyIO Threadpool üzerinde çalıştırarak Event Loop'u korur."
        ],
        codeSnippet: {
          language: "python",
          filename: "concurrency_example.py",
          code: `import httpx
from fastapi import FastAPI

app = FastAPI()

# DOĞRU: Asenkron non-blocking HTTP isteği
@app.get("/async-fetch")
async def async_fetch():
    async with httpx.AsyncClient() as client:
        res = await client.get("https://api.example.com/data")
        return res.json()

# DOĞRU: Senkron CPU-heavy veya bloklayıcı işlem (FastAPI threadpool'a atar)
@app.get("/sync-compute")
def sync_compute():
    import time
    time.sleep(1) # Threadpool'da çalışır, Event Loop'u kilitlemez
    return {"status": "ok"}`
        }
      }
    ],
    faqs: [
      {
        question: "uvloop nedir ve FastAPI'yi nasıl hızlandırır?",
        answer: "uvloop, Node.js libuv üzerine yazılmış ultra hızlı bir asyncio event loop kütüphanesidir ve FastAPI performansını 2 ila 4 kat artırır."
      }
    ]
  },
  {
    slug: "fastapi-dependency-injection-sistemi",
    title: "FastAPI Dependency Injection (DI) ile Temiz ve Test Edilebilir Mimari Kurulumu",
    description: "FastAPI'nin Depends mekanizmasını kullanarak veritabanı oturumlarını, kimlik doğrulama katmanlarını ve servis bağımlılıklarını izole etme rehberi.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "API & Backend",
    readingTime: "8 dk",
    serviceHref: "/hizmetler/api-gelistirme",
    serviceAnchor: "Modüler API mimarisi ve refactor danışmanlığı",
    sections: [
      {
        title: "Depends() ile Bağımlılık Yönetimi",
        paragraphs: [
          "Kod tekrarını önlemek ve birim testlerinde veritabanını kolayca mock'layabilmek için FastAPI'nin Dependency Injection sistemi kullanılır."
        ],
        codeSnippet: {
          language: "python",
          filename: "dependencies.py",
          code: `from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

app = FastAPI()
security = HTTPBearer()

async def get_current_user(creds: HTTPAuthorizationCredentials = Depends(security)):
    token = creds.credentials
    if token != "secret-token":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Geçersiz Token")
    return {"user_id": "usr_123", "role": "admin"}

@app.get("/protected-dashboard")
async def dashboard(user: dict = Depends(get_current_user)):
    return {"message": f"Hoş geldiniz {user['user_id']}"}`
        }
      }
    ]
  },
  {
    slug: "pydantic-v2-performans-ve-validator-rehberi",
    title: "Pydantic v2 ile Rust Destekli Validasyon ve Custom Validator Teknikleri",
    description: "Pydantic v2'nin Rust tabanlı pydantic-core çekirdeği ile 20 kata varan hız artışları, @field_validator ve model_validator kullanım desenleri.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "API & Backend",
    readingTime: "8 dk",
    serviceHref: "/hizmetler/api-gelistirme",
    serviceAnchor: "Python veri doğrulama ve şema tasarımı çözümlerimiz",
    sections: [
      {
        title: "Pydantic v2'deki Kritik Değişiklikler",
        paragraphs: [
          "Eski `@validator` dekoratörü yerine `@field_validator(mode='before'|'after')` ve tüm modeli doğrulayan `@model_validator` gelmiştir."
        ],
        codeSnippet: {
          language: "python",
          filename: "schema.py",
          code: `from pydantic import BaseModel, field_validator, model_validator

class UserRegisterSchema(BaseModel):
    username: str
    password: str
    confirm_password: str

    @field_validator("username")
    @classmethod
    def validate_username(cls, v: str) -> str:
        if not v.isalnum():
            raise ValueError("Kullanıcı adı sadece alfanümerik olmalıdır")
        return v.lower()

    @model_validator(mode="after")
    def check_passwords_match(self) -> "UserRegisterSchema":
        if self.password != self.confirm_password:
            raise ValueError("Şifreler birbiriyle eşleşmiyor")
        return self`
        }
      }
    ]
  },
  {
    slug: "fastapi-ve-redis-ile-rate-limiting",
    title: "FastAPI ve Redis ile Token Bucket / Leaky Bucket Rate Limiting Mimarisi",
    description: "API uç noktalarınızı DDoS saldırılarına ve maliyet patlamalarına karşı korumak için Redis destekli kayan pencere (sliding window) rate limiting kurulumu.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "API & Backend",
    readingTime: "9 dk",
    serviceHref: "/hizmetler/api-gelistirme",
    serviceAnchor: "API güvenlik ve altyapı koruma çözümlerimiz",
    sections: [
      {
        title: "Neden Bellek İçi (In-Memory) Rate Limiter Yetmez?",
        paragraphs: [
          "Çoklu sunucu (multi-instance) veya Kubernetes ortamında istekler farklı pod'lara dağılır. Ortak bir Redis havuzu olmadan tutarlı rate limit uygulanamaz."
        ]
      }
    ]
  },
  {
    slug: "fastapi-background-tasks-vs-celery",
    title: "FastAPI Background Tasks vs Celery: Arka Plan İşleri Ne Zaman Hangi Araçla Yapılmalı?",
    description: "E-posta gönderimi ve hafif veri loglama için dahili BackgroundTasks ile ağır video işleme ve scraping kuyrukları için Celery/Redis karşılaştırması.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "Karşılaştırma",
    readingTime: "8 dk",
    serviceHref: "/hizmetler/ozel-yazilim-gelistirme",
    serviceAnchor: "Dağıtık arka plan kuyrukları ve asenkron mimari kurulumu",
    sections: [
      {
        title: "Doğru Aracı Seçme Kılavuzu",
        paragraphs: [
          "FastAPI `BackgroundTasks`: Sıfır bağımlılık, aynı işlem içinde çalışır, sunucu çökerse iş kaybolur. (Kullanım: E-posta, audit log).",
          "Celery + Redis/RabbitMQ: Dağıtık kuyruk, hata durumunda tekrar deneme (retry), iş garantisi. (Kullanım: AI model eğitimi, PDF/Video işleme, web kazıma)."
        ]
      }
    ]
  },
  {
    slug: "server-sent-events-sse-vs-websockets-fastapi",
    title: "FastAPI ile SSE vs WebSockets: Gerçek Zamanlı AI ve Veri İletişiminde Hangisi?",
    description: "LLM streaming çıktıları ve finansal veri akışları için Server-Sent Events (SSE) ile çift yönlü WebSockets protokollerinin performans ve karmaşıklık analizi.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "API & Backend",
    readingTime: "9 dk",
    serviceHref: "/hizmetler/api-gelistirme",
    serviceAnchor: "Gerçek zamanlı websocket ve SSE akış sistemleri",
    sections: [
      {
        title: "Neden LLM Streaming İçin SSE Tercih Edilir?",
        paragraphs: [
          "SSE standart HTTP/2 üzerinden çalışır, özel proxy veya firewall yapılandırması gerektirmez, dahili yeniden bağlanma (reconnection) desteği vardır ve tek yönlü veri akışı için WebSockets'e göre çok daha hafiftir."
        ]
      }
    ]
  },
  {
    slug: "fastapi-ile-jwt-ve-oauth2-guvenlik-mimarisi",
    title: "FastAPI ile JWT ve OAuth2: Güvenli Yetkilendirme ve Token Refresh Mimarisi",
    description: "Access token ve Refresh token rotasyonu ile güvenli, çalınmaya karşı korumalı ve statik oturum yönetimi sunan modern kimlik doğrulama mimarisi.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "API & Backend",
    readingTime: "10 dk",
    serviceHref: "/hizmetler/api-gelistirme",
    serviceAnchor: "Kurumsal seviyede API güvenlik ve kimlik doğrulama mimarisi",
    sections: [
      {
        title: "Token Rotasyonu (Token Rotation) Prensibi",
        paragraphs: [
          "Kısa ömürlü Access Token (15 dk) ve veritabanında tek kullanımlık olarak tutulan Refresh Token (7 gün) kombinasyonu ile en yüksek güvenlik sağlanır."
        ]
      }
    ]
  },
  {
    slug: "sqlalchemy-2-async-ve-alembic-migrasyon",
    title: "SQLAlchemy 2.0 Async Session ve Alembic ile Sıfır Kesintili Veritabanı Migrasyonu",
    description: "SQLAlchemy 2.0'ın modern select() sözdizimi, AsyncEngine bağlantı havuzu yönetimi ve Alembic ile otomatik şema migrasyonu rehberi.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "API & Backend",
    readingTime: "9 dk",
    serviceHref: "/hizmetler/ozel-yazilim-gelistirme",
    serviceAnchor: "Asenkron veritabanı mimarisi ve PostgreSQL optimizasyonu",
    sections: [
      {
        title: "SQLAlchemy 2.0 Async Sözdizimi",
        paragraphs: [
          "`async_sessionmaker` ve `asyncpg` sürücüsü kullanarak sorguları bloklanmadan çalıştırma:"
        ],
        codeSnippet: {
          language: "python",
          filename: "db.py",
          code: `from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker

engine = create_async_engine("postgresql+asyncpg://user:pass@localhost/app_db", pool_size=20)
AsyncSessionFactory = async_sessionmaker(engine, expire_on_commit=False)

async def get_user_by_email(session: AsyncSession, email: str):
    stmt = select(User).where(User.email == email)
    result = await session.execute(stmt)
    return result.scalar_one_or_none()`
        }
      }
    ]
  },
  {
    slug: "fastapi-ve-docker-production-deployment",
    title: "FastAPI ve Docker: Gunicorn Uvicorn Workerları ile Production Dağıtım Mimarisi",
    description: "FastAPI uygulamalarını multi-stage Dockerfile, non-root kullanıcı ve Gunicorn worker process yöneticisi ile güvenli ve ölçeklenebilir şekilde sunucuya alma.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "DevOps & Altyapı",
    readingTime: "8 dk",
    serviceHref: "/hizmetler/ozel-yazilim-gelistirme",
    serviceAnchor: "Docker, CI/CD ve bulut sunucu dağıtım danışmanlığı",
    sections: [
      {
        title: "Production Dockerfile Standardı",
        paragraphs: [
          "Hafif ve güvenli bir Docker imajı için multi-stage build ve non-root kullanıcı tanımlaması:"
        ],
        codeSnippet: {
          language: "dockerfile",
          filename: "Dockerfile",
          code: `FROM python:3.12-slim as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.12-slim
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY . .
RUN useradd -m appuser && chown -R appuser /app
USER appuser

CMD ["gunicorn", "main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000"]`
        }
      }
    ]
  },
  {
    slug: "fastapi-open-telemetry-ve-observability",
    title: "FastAPI ve OpenTelemetry: Dağıtık İzleme (Tracing), Prometheus Metrikleri ve Grafana",
    description: "API gecikmelerini ve SQL darboğazlarını milisaniyelik hassasiyetle tespit etmek için OpenTelemetry, Prometheus ve Grafana entegrasyonu.",
    publishedAt: "2026-08-17",
    modifiedAt: "2026-08-17",
    category: "DevOps & Altyapı",
    readingTime: "10 dk",
    serviceHref: "/hizmetler/api-gelistirme",
    serviceAnchor: "Sistem gözlemlenebilirliği (observability) ve performans analizi",
    sections: [
      {
        title: "Observability Neden Şarttır?",
        paragraphs: [
          "Bir API isteği 3 saniye sürdüğünde problemin LLM çağrısında mı, PostgreSQL sorgusunda mı yoksa Redis kilidinde mi olduğunu OpenTelemetry distributed tracing (span) şeması anında gösterir."
        ]
      }
    ]
  },

  // ==========================================
  // ORİJİNAL İÇERİKLER
  // ==========================================
  {
    slug: "web-scraping-nedir",
    title: "Web Scraping Nedir? Nasıl Çalışır?",
    description: "Web scraping'in ne olduğunu, hangi veri toplama problemlerinde kullanıldığını ve sürdürülebilir bir sistemin hangi katmanlardan oluştuğunu öğrenin.",
    publishedAt: "2026-08-13",
    modifiedAt: "2026-08-17",
    category: "Web Scraping",
    readingTime: "6 dk",
    serviceHref: "/hizmetler/web-scraping",
    serviceAnchor: "Web scraping hizmeti ve veri toplama çözümlerini inceleyin",
    sections: [
      { title: "Web scraping ne demek?", paragraphs: ["Web scraping, web sayfalarındaki kamuya açık bilgilerin yazılım aracılığıyla alınması ve yapılandırılmış veriye dönüştürülmesidir. Bir insanın ürün adı, fiyat veya haber başlığı kopyaladığı işi otomatikleştirir.", "Asıl değer yalnızca sayfayı okumakta değil; veriyi düzenli biçimde toplamak, temizlemek, tekrarları ayıklamak ve başka bir sistemin kullanabileceği hale getirmektedir."] },
      { title: "Temel çalışma akışı", paragraphs: ["Sistem hedef sayfayı talep eder, gerekli alanları seçer, kayıtları doğrular ve tanımlanan hedefe aktarır. JavaScript ile sonradan yüklenen sayfalarda Playwright gibi gerçek tarayıcı davranışı sağlayan araçlar gerekebilir."], items: ["Kaynağı ve erişim koşullarını analiz etme", "Gerekli alanları çıkarma", "Veriyi temizleme ve standardize etme", "API veya veritabanına aktarma", "Hata ve kaynak değişikliklerini izleme"] },
      { title: "Web scraping ile API arasındaki fark", paragraphs: ["API, veri sahibinin tanımladığı resmi ve yapılandırılmış erişim yoludur. Uygun bir API varsa çoğu zaman ilk tercih odur. Web scraping ise API sunulmayan veya ihtiyacı karşılamayan kamuya açık sayfalarda devreye girer.", "Üretim sistemlerinde seçim; kullanım koşulları, veri güncelliği, bakım maliyeti ve hata toleransı birlikte değerlendirilerek yapılmalıdır."] },
      { title: "Sürdürülebilir sistem neden önemlidir?", paragraphs: ["Sayfa yapıları değişebilir, ağ hataları oluşabilir ve aynı kayıt birden fazla kez görülebilir. Bu nedenle zamanlama, yeniden deneme, kayıt tutma, önbellek ve veri doğrulama katmanları tek seferlik bir script ile üretim sistemi arasındaki temel farktır."] },
    ],
  },
  {
    slug: "ai-otomasyon-nedir",
    title: "AI Otomasyon Nedir? İş Süreçlerinde Nasıl Kullanılır?",
    description: "AI otomasyonun klasik otomasyondan farkını, uygun kullanım alanlarını ve güvenilir bir LLM entegrasyonunda dikkat edilmesi gerekenleri öğrenin.",
    publishedAt: "2026-08-13",
    modifiedAt: "2026-08-17",
    category: "AI Otomasyon",
    readingTime: "7 dk",
    serviceHref: "/hizmetler/yapay-zeka-otomasyon",
    serviceAnchor: "Yapay zekâ otomasyon hizmeti ve entegrasyon yaklaşımını inceleyin",
    sections: [
      { title: "AI otomasyon neyi değiştirir?", paragraphs: ["Klasik otomasyon açık kurallarla tekrarlanan adımları yürütür. AI otomasyon ise metin, doküman veya serbest biçimli kullanıcı talebi gibi kesin kurallarla ifade edilmesi zor girdileri yorumlama katmanı ekler.", "İyi bir çözüm klasik yazılım kurallarını ortadan kaldırmaz; modelin esnekliğini doğrulama, yetki ve iş kurallarıyla sınırlar."] },
      { title: "Uygun kullanım alanları", paragraphs: ["En iyi adaylar yüksek tekrar içeren, insan emeği alan ve çıktı kalitesinin ölçülebildiği süreçlerdir."], items: ["Talep ve doküman sınıflandırma", "Özetleme ve rapor taslağı hazırlama", "Veri zenginleştirme", "Bilgi tabanı üzerinde soru yanıtlama", "Operasyon ekipleri için kontrollü yardımcı akışlar"] },
      { title: "AI agent ve klasik akış farkı", paragraphs: ["Klasik akışta adımlar önceden tanımlıdır. Bir AI agent ise hedefe göre araç seçebilir ve birden fazla adımı planlayabilir. Bu esneklik, daha sıkı yetki sınırları ve gözlemlenebilirlik gerektirir.", "Her otomasyonun agent olması gerekmez. Tahmin edilebilir bir iş için basit ve denetlenebilir iş akışı genellikle daha güvenlidir."] },
      { title: "Güvenilir entegrasyonun katmanları", paragraphs: ["Model seçimi kadar veri erişimi, kişisel bilgi politikası, hata halinde geri dönüş, maliyet takibi ve insan onayı da önemlidir. AI özelliği, ürünün backend ve kullanıcı deneyimiyle birlikte tasarlanmalıdır."] },
    ],
  },
  {
    slug: "rest-api-nedir",
    title: "REST API Nedir? Backend Sistemlerinde Nasıl Çalışır?",
    description: "REST API'nin temel mantığını, istemci-backend iletişimini ve güvenilir bir API tasarımında önemli olan sözleşmeleri anlaşılır biçimde inceleyin.",
    publishedAt: "2026-08-13",
    modifiedAt: "2026-08-17",
    category: "API & Backend",
    readingTime: "6 dk",
    serviceHref: "/hizmetler/api-gelistirme",
    serviceAnchor: "API geliştirme ve sistem entegrasyonu hizmetini inceleyin",
    sections: [
      { title: "API ne işe yarar?", paragraphs: ["API, iki yazılım bileşeninin hangi istek ve yanıt biçimleriyle iletişim kuracağını tanımlar. Web arayüzü, mobil uygulama, ödeme sağlayıcısı veya veri servisi bu sözleşme üzerinden güvenilir biçimde veri alışverişi yapar."] },
      { title: "REST yaklaşımı", paragraphs: ["REST API'lerde veriler kaynaklar olarak modellenir ve HTTP yöntemleriyle okunur veya değiştirilir. URL yapısı, durum kodları ve yanıt biçimleri tutarlı olduğunda farklı ekipler entegrasyonu daha kolay sürdürebilir."], items: ["GET: kaynak okuma", "POST: yeni işlem veya kaynak oluşturma", "PUT/PATCH: güncelleme", "DELETE: kaynak silme", "HTTP durum kodları: sonucun açıkça bildirilmesi"] },
      { title: "Backend tarafında neler olur?", paragraphs: ["İstek alındığında veri doğrulanır, erişim yetkisi kontrol edilir, iş kuralları çalıştırılır ve veritabanı ya da başka servislerle iletişim kurulur. Sonuç, istemcinin anlayacağı kararlı bir yapıyla döndürülür."] },
      { title: "İyi API tasarımının ölçütleri", paragraphs: ["Güvenlik, performans ve dokümantasyon sonradan eklenen ayrıntılar değildir. Tutarlı hata yönetimi, yetkilendirme, oran sınırlama, önbellek ve izlenebilirlik sistemin kullanım biçimine göre baştan değerlendirilir."] },
    ],
  },
];

export const blogPostBySlug = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post])
) as Record<string, BlogPost>;
