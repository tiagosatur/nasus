"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useTranslations, useLocale } from "next-intl";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { BookButton } from "@/components/ui/BookButton";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WA_DIAGNOSTIC } from "@/lib/whatsapp";

type Step = { num: string; title: string; body: string };

export function Process() {
  const t = useTranslations("process");
  const isEn = useLocale() === "en";
  const sectionRef = useRef<HTMLElement>(null);
  const steps = t.raw("steps") as Step[];

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const header = sectionRef.current!.querySelector("[data-header]");
      gsap.from(header, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      const stepEls = sectionRef.current!.querySelectorAll("[data-step]");
      gsap.from(stepEls, {
        opacity: 0,
        y: 36,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-bg-primary"
    >
      <div className="max-w-6xl mx-auto">
        <div data-header className="mb-16">
          <p className="text-sm uppercase tracking-[0.12em] text-text-muted font-mono mb-5">
            {t("sectionLabel")}
          </p>
          <h2
            className="font-sans font-bold text-text-primary leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            {t("headline")}{" "}
            <span className="font-display italic text-accent">{t("headlineAccent")}</span>
            {t("headlineEnd")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8 border-t border-border pt-12">
          {steps.map((step) => (
            <div key={step.num} data-step className="flex items-start gap-5 md:block">
              <div
                className="font-mono font-bold text-border leading-none shrink-0 md:mb-8 select-none"
                style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
                aria-hidden="true"
              >
                {step.num}
              </div>
              <div className="pt-1 md:pt-0">
                <h3 className="font-sans font-bold text-xl text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-border flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {isEn ? (
            <BookButton variant="dark" className="w-full sm:w-auto">
              {t("cta")}
            </BookButton>
          ) : (
            <Button variant="dark" href={WA_DIAGNOSTIC} external className="w-full sm:w-auto">
              <WhatsAppIcon />
              {t("cta")}
            </Button>
          )}
          <p className="text-sm text-text-muted">{t("ctaFootnote")}</p>
        </div>
      </div>
    </section>
  );
}
