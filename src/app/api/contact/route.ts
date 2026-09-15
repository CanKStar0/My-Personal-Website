import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

// In-memory rate limiting map: ip -> timestamps
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;

  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

const ContactPayloadSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters / İsim en az 2 karakter olmalıdır.").max(100),
  email: z.string().trim().email("Please provide a valid email address / Geçerli bir e-posta adresi giriniz.").max(100),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  service: z.string().trim().max(100).default("General Consultation"),
  message: z.string().trim().min(10, "Please provide at least 10 characters of project details / Lütfen en az 10 karakterlik bir açıklama yazınız.").max(3000),
  locale: z.enum(["tr", "en"]).optional().default("tr"),
  honeypot: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again in 10 minutes or reach out directly via email / Çok fazla istek gönderildi. Lütfen 10 dakika sonra tekrar deneyin.",
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request payload / Geçersiz istek." }, { status: 400 });
    }

    const parseResult = ContactPayloadSchema.safeParse(body);
    if (!parseResult.success) {
      const issue = parseResult.error.issues[0]?.message || "Validation error / Doğrulama hatası.";
      return NextResponse.json({ error: issue }, { status: 422 });
    }

    const { name, email, phone, service, message, locale, honeypot } = parseResult.data;
    const isEn = locale === "en";

    // Honeypot spam bot check
    if (honeypot && honeypot.trim().length > 0) {
      // Silently succeed to fool spam bots
      return NextResponse.json({ success: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "canpolatkaya4@gmail.com";
    const senderEmail = process.env.RESEND_FROM_EMAIL || "Canpolat Kaya Portfolio <onboarding@resend.dev>";

    if (!apiKey) {
      console.warn(
        `[Contact API] RESEND_API_KEY is not set in environment. Simulated lead from ${name} (${email}): ${service} - "${message}"`
      );
      return NextResponse.json({
        success: true,
        message: isEn
          ? "Your project inquiry was received. (Development environment: simulated email)"
          : "Talebiniz başarıyla alındı. (Geliştirme ortamı: API anahtarı yapılandırıldığında gerçek e-posta iletilecektir)",
      });
    }

    const resend = new Resend(apiKey);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0d0e; color: #f4f4f5; margin: 0; padding: 30px 15px; }
            .container { max-width: 580px; margin: 0 auto; background: #18181b; border: 1px solid #27272a; border-radius: 12px; overflow: hidden; }
            .header { background: #dc2626; padding: 20px 24px; color: #ffffff; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
            .content { padding: 24px; }
            .field { margin-bottom: 18px; }
            .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #a1a1aa; font-weight: 600; margin-bottom: 4px; }
            .value { font-size: 15px; color: #ffffff; line-height: 1.5; }
            .message-box { background: #09090b; border: 1px solid #27272a; border-radius: 8px; padding: 14px; font-size: 14px; color: #e4e4e7; line-height: 1.6; white-space: pre-wrap; }
            .footer { padding: 16px 24px; border-top: 1px solid #27272a; font-size: 12px; color: #71717a; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 ${isEn ? "New Project & Service Inquiry" : "Yeni Proje & Hizmet Talebi"}</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">${isEn ? "Client / Contact Person" : "Müşteri / İletişim Kişisi"}</div>
                <div class="value"><strong>${name}</strong></div>
              </div>
              <div class="field">
                <div class="label">${isEn ? "Email Address" : "E-posta Adresi"}</div>
                <div class="value"><a href="mailto:${email}" style="color: #f87171; text-decoration: none;">${email}</a></div>
              </div>
              ${
                phone
                  ? `
              <div class="field">
                <div class="label">${isEn ? "Phone / WhatsApp" : "Telefon / WhatsApp"}</div>
                <div class="value"><a href="tel:${phone}" style="color: #f87171; text-decoration: none;">${phone}</a></div>
              </div>`
                  : ""
              }
              <div class="field">
                <div class="label">${isEn ? "Requested Solution" : "Talep Edilen Hizmet / Çözüm"}</div>
                <div class="value" style="display: inline-block; background: rgba(220,38,38,0.15); color: #f87171; padding: 4px 10px; border-radius: 6px; font-weight: 600;">${service}</div>
              </div>
              <div class="field">
                <div class="label">${isEn ? "Project Scope & Target Sources" : "Proje Detayları & Hedef Kaynaklar"}</div>
                <div class="message-box">${message}</div>
              </div>
            </div>
            <div class="footer">
              ${isEn ? "This inquiry was submitted via canpolatkaya.com contact form." : "Bu talep canpolatkaya.com B2B İletişim Formu üzerinden gönderilmiştir."}
            </div>
          </div>
        </body>
      </html>
    `;

    const sendResult = await resend.emails.send({
      from: senderEmail,
      to: receiverEmail,
      replyTo: email,
      subject: isEn ? `[New Project Inquiry] ${name} — ${service}` : `[Yeni Proje Talebi] ${name} — ${service}`,
      html: emailHtml,
    });

    if (sendResult.error) {
      console.error("[Contact API] Resend error:", sendResult.error);
      return NextResponse.json(
        {
          error: isEn
            ? "An error occurred while dispatching the email. Please reach out directly."
            : "E-posta iletimi sırasında harici bir hata oluştu. Lütfen doğrudan e-posta ile ulaşın.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: isEn
        ? "Your project inquiry was successfully sent. I will review and reply shortly."
        : "Proje talebiniz başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğim.",
    });
  } catch (error) {
    console.error("[Contact API] Unexpected error:", error);
    return NextResponse.json(
      { error: "Sunucu tarafında beklenmedik bir hata oluştu. Lütfen doğrudan e-posta ile ulaşın." },
      { status: 500 }
    );
  }
}
