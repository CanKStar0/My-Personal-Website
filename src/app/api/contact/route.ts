import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { CONTACT_EMAIL } from "@/lib/site";
import { buildContactBriefText, ContactBriefSchema } from "@/lib/contact-schema";

const ContactServerEnvSchema = z.object({
  CONTACT_WEBHOOK_URL: z.string().url().optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_FROM_EMAIL: z.string().email().optional(),
});

function getServerTransportConfig() {
  const parsed = ContactServerEnvSchema.safeParse({
    CONTACT_WEBHOOK_URL: process.env.CONTACT_WEBHOOK_URL || undefined,
    RESEND_API_KEY: process.env.RESEND_API_KEY || undefined,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL || undefined,
  });

  if (!parsed.success) {
    console.error("[api/contact] Invalid contact transport env configuration:", parsed.error.flatten());
    return {};
  }
  return parsed.data;
}

function makeEnvelopeMeta() {
  return {
    timestamp: new Date().toISOString(),
    requestId: `req_${crypto.randomUUID().slice(0, 12)}`,
  };
}

export async function POST(request: NextRequest) {
  const meta = makeEnvelopeMeta();

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        statusCode: 400,
        error: {
          code: "INVALID_JSON",
          message: "Malformed JSON request body.",
        },
        meta,
      },
      { status: 400 }
    );
  }

  const parsed = ContactBriefSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        statusCode: 422,
        error: {
          code: "VALIDATION_FAILED",
          message: "Payload validation failed.",
          details: parsed.error.issues.map((issue) => ({
            field: issue.path.join(".") || "body",
            issue: issue.message,
          })),
        },
        meta,
      },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Honeypot field check: discard automated spam without leaking detection rules
  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json(
      {
        success: true,
        statusCode: 200,
        data: {
          delivery: "accepted",
          referenceId: meta.requestId,
        },
        meta,
      },
      { status: 200 }
    );
  }

  const { subject, body, mailtoUrl } = buildContactBriefText(data);
  const env = getServerTransportConfig();

  const hasWebhook = Boolean(env.CONTACT_WEBHOOK_URL);
  const hasResend = Boolean(env.RESEND_API_KEY);

  if (!hasWebhook && !hasResend) {
    return NextResponse.json(
      {
        success: true,
        statusCode: 200,
        data: {
          delivery: "mailto_fallback",
          referenceId: meta.requestId,
          subject,
          summaryText: body,
          mailtoUrl,
        },
        meta,
      },
      { status: 200 }
    );
  }

  const deliveryErrors: string[] = [];

  if (env.CONTACT_WEBHOOK_URL) {
    try {
      const webhookRes = await fetch(env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referenceId: meta.requestId,
          subject,
          text: body,
          content: `**${subject}**\n\`\`\`\n${body}\n\`\`\``,
          brief: data,
        }),
        signal: AbortSignal.timeout(8000),
      });

      if (!webhookRes.ok) {
        deliveryErrors.push(`webhook_http_${webhookRes.status}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "unknown_webhook_error";
      console.error("[api/contact] Webhook delivery failed:", msg);
      deliveryErrors.push("webhook_unreachable");
    }
  }

  if (env.RESEND_API_KEY) {
    try {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.CONTACT_FROM_EMAIL ?? "Portfolio Brief <onboarding@resend.dev>",
          to: [CONTACT_EMAIL],
          reply_to: data.email,
          subject,
          text: body,
        }),
        signal: AbortSignal.timeout(8000),
      });

      if (!resendRes.ok) {
        deliveryErrors.push(`resend_http_${resendRes.status}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "unknown_resend_error";
      console.error("[api/contact] Resend delivery failed:", msg);
      deliveryErrors.push("resend_unreachable");
    }
  }

  const attemptedCount = Number(hasWebhook) + Number(hasResend);
  if (deliveryErrors.length >= attemptedCount) {
    return NextResponse.json(
      {
        success: false,
        statusCode: 502,
        error: {
          code: "DELIVERY_UNAVAILABLE",
          message: "Automated delivery transport failed; please use direct email fallback.",
          details: [{ field: "transport", issue: "Upstream notification service unavailable." }],
        },
        meta,
      },
      { status: 502 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      statusCode: 201,
      data: {
        delivery: "dispatched",
        referenceId: meta.requestId,
        subject,
        summaryText: body,
        mailtoUrl,
      },
      meta,
    },
    { status: 201 }
  );
}
