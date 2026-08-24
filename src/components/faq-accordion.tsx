"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import type { ServiceFaq } from "@/lib/services";

interface FAQAccordionProps {
  faqs: ServiceFaq[];
  title?: string;
}

export function FAQAccordion({ faqs, title = "Sıkça Sorulan Sorular" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="mt-16 rounded-3xl border border-border/70 bg-card/40 p-6 md:p-10">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red dark:bg-rose-500/10 dark:text-rose-400">
          <HelpCircle className="h-5 w-5" />
        </div>
        <h2 className="font-jakarta text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {title}
        </h2>
      </div>

      <div className="mt-8 space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.question}
              className={`rounded-2xl border transition-all duration-200 ${
                isOpen
                  ? "border-brand-red/40 bg-brand-red/[0.03] dark:border-rose-500/30 dark:bg-rose-950/10"
                  : "border-border/60 bg-background/60 hover:border-border"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium text-foreground transition-colors"
              >
                <span className="text-base font-semibold md:text-lg">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-brand-red dark:text-rose-400" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm font-light leading-7 text-muted-foreground md:text-base">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
